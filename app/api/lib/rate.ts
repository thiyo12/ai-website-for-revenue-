import { NextRequest } from "next/server";

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function ipAddressesEqual(a: string, b: string): boolean {
  return a === b;
}

export class RateLimiter {
  private hits = new Map<string, number[]>();

  constructor(
    private readonly max: number,
    private readonly windowMs: number
  ) {}

  isLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (this.hits.get(ip) ?? []).filter(
      (t) => now - t < this.windowMs
    );
    if (recent.length >= this.max) {
      this.hits.set(ip, recent.filter((t) => now - t < this.windowMs));
      return true;
    }
    recent.push(now);
    this.hits.set(ip, recent);
    return false;
  }
}

export function isPrivateIpAddress(ip: string): boolean {
  if (ipAddressesEqual(ip, "::1") || ip === "127.0.0.1") return true;
  if (/^::ffff:/i.test(ip)) return isPrivateIpAddress(ip.slice(7));
  const v4 = ip.includes(".") ? ip : "";
  if (v4) {
    const parts = v4.split(".").map(Number);
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
    const [a, b] = parts;
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
    if (a === 0) return true;
    if (a === 169 && b === 254) return true;
    if (a >= 224) return true;
  }
  return false;
}