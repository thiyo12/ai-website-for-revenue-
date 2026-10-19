import type { NextRequest } from "next/server";

function isWellFormedIp(value: string): boolean {
  const v = value.trim();
  if (!v || v.length > 45) return false;
  // IPv4
  if (v.includes(".")) {
    const parts = v.split(".");
    if (parts.length !== 4) return false;
    return parts.every((p) => {
      if (!/^\d{1,3}$/.test(p)) return false;
      const n = Number(p);
      return n >= 0 && n <= 255;
    });
  }
  // IPv6 (basic well-formedness: colons and hex)
  if (v.includes(":")) {
    return /^[0-9a-fA-F:.]+$/.test(v);
  }
  return false;
}

// A reverse proxy must overwrite untrusted forwarding headers or append
// the actual connecting IP. The leftmost X-Forwarded-For entry is often
// attacker-controlled; use the rightmost value added by the nearest proxy.
// This remains a process-local throttle, not a substitute for edge rate limits.
export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const chain = forwarded.split(",").map((x) => x.trim());
    const nearest = chain[chain.length - 1];
    if (isWellFormedIp(nearest)) return nearest;
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real && isWellFormedIp(real)) return real;
  return "untrusted-default";
}

function ipAddressesEqual(a: string, b: string): boolean {
  return a === b;
}

export class RateLimiter {
  private hits = new Map<string, number[]>();
  private requests = 0;

  constructor(
    private readonly max: number,
    private readonly windowMs: number,
    private readonly maxTrackedClients = 10_000
  ) {}

  private prune(now: number): void {
    for (const [ip, hits] of this.hits) {
      const live = hits.filter((at) => now - at < this.windowMs);
      if (live.length) this.hits.set(ip, live);
      else this.hits.delete(ip);
    }
  }

  isLimited(ip: string): boolean {
    const now = Date.now();
    // Rate limits are in-memory per process, not a distributed throttle.
    // Prune expired keys and bound cardinality so unique spoofed identities
    // cannot indefinitely consume memory on a long-running process.
    this.requests++;
    if (this.requests % 256 === 0 || this.hits.size >= this.maxTrackedClients) {
      this.prune(now);
    }
    if (!this.hits.has(ip) && this.hits.size >= this.maxTrackedClients) {
      return true;
    }
    const recent = (this.hits.get(ip) ?? []).filter((at) => now - at < this.windowMs);
    if (recent.length >= this.max) {
      this.hits.set(ip, recent);
      return true;
    }
    recent.push(now);
    this.hits.set(ip, recent);
    return false;
  }
}

export function isPrivateIpAddress(ip: string): boolean {
  const address = ip.toLowerCase().split("%")[0];
  // Reject malformed input; only routable IP literals may leave our CDN proxy.
  if (!address || address.length > 45) return true;
  if (address.startsWith("::ffff:")) return isPrivateIpAddress(address.slice(7));

  if (address.includes(":")) {
    // IPv6 loopback, unspecified, unique-local, link-local, deprecated site-local,
    // multicast and documentation ranges must never be contacted by the proxy.
    if (!/^[0-9a-f:.]+$/.test(address)) return true;
    if (address === "::" || address === "::1") return true;
    const first = address.split(":")[0];
    if (!first) return true; // IPv4-compatible/unspecified shorthand
    const prefix = parseInt(first, 16);
    if (!Number.isFinite(prefix) || prefix > 0xffff) return true;
    if ((prefix & 0xfe00) === 0xfc00) return true; // fc00::/7
    if ((prefix & 0xffc0) === 0xfe80) return true; // fe80::/10
    if ((prefix & 0xffc0) === 0xfec0) return true; // fec0::/10
    if ((prefix & 0xff00) === 0xff00) return true; // ff00::/8
    if (address.startsWith("2001:db8:") || address === "2001:db8") return true;
    return false;
  }

  const parts = address.split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) return true;
  const [a, b, third] = parts.map(Number);
  if (parts.some((part) => Number(part) > 255)) return true;
  if (a === 10 || a === 127 || a === 0 || a >= 224) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && (b === 168 || b === 0)) return true;
  if (a === 169 && b === 254) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
  if (a === 198 && (b === 18 || b === 19 || (b === 51 && third === 100))) return true;
  if (a === 203 && b === 0 && third === 113) return true;
  return false;
}
