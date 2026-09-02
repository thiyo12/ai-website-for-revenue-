import { NextRequest } from "next/server";
import { promises as dns } from "node:dns";
import { isPrivateIpAddress, RateLimiter, getClientIp } from "../lib/rate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 600;

const limiter = new RateLimiter(30, 60_000);

async function assertPublicHost(hostname: string): Promise<void> {
  const addresses = await dns.lookup(hostname, { all: true, verbatim: true });
  if (!addresses.length) throw new Error("unresolvable");
  for (const addr of addresses) {
    if (isPrivateIpAddress(addr.address)) {
      throw new Error("private");
    }
  }
}

function fileNameFromUrl(u: URL): string {
  const base = u.pathname.split("/").pop()?.split("?")[0] ?? "video";
  const sanitized = base.replace(/[^\w.\-]+/g, "_").slice(-80) || "video";
  return sanitized.endsWith(".mp4") || sanitized.endsWith(".webm") || sanitized.endsWith(".mov") || sanitized.endsWith(".m4a") || sanitized.endsWith(".mp3")
    ? sanitized
    : `${sanitized}.mp4`;
}

export async function GET(req: NextRequest): Promise<Response> {
  const ip = getClientIp(req);
  if (limiter.isLimited(ip)) {
    return new Response("Too many requests. Please wait a minute.", { status: 429 });
  }

  const raw = req.nextUrl.searchParams.get("url")?.trim() ?? "";
  if (!raw) {
    return new Response("Missing url parameter.", { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return new Response("Invalid link.", { status: 400 });
  }

  if (target.protocol !== "https:" && target.protocol !== "http:") {
    return new Response("Only http(s) targets are supported.", { status: 400 });
  }
  if (target.username || target.password) {
    return new Response("Links with credentials are not supported.", { status: 400 });
  }

  try {
    await assertPublicHost(target.hostname);
  } catch {
    return new Response(
      "This link points to a private or restricted address and cannot be fetched.",
      { status: 403 }
    );
  }

  const range = req.headers.get("range");
  const upstreamHeaders: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    Accept: "*/*",
  };
  if (range) upstreamHeaders.Range = range;

  let upstream: globalThis.Response;
  try {
    upstream = await fetch(target, {
      headers: upstreamHeaders,
      redirect: "follow",
      signal: AbortSignal.timeout(120_000),
    });
  } catch {
    return new Response("The source did not respond. Try again in a moment.", { status: 502 });
  }

  if (!upstream.ok && upstream.status !== 206) {
    return new Response("The source rejected the request.", { status: 502 });
  }

  const out = new Headers();
  out.set("Content-Disposition", `attachment; filename="${fileNameFromUrl(target)}"`);
  out.set("Accept-Ranges", "bytes");
  const ct = upstream.headers.get("content-type");
  if (ct) out.set("Content-Type", ct);
  const cl = upstream.headers.get("content-length");
  if (cl) out.set("Content-Length", cl);
  const cr = upstream.headers.get("content-range");
  if (cr) out.set("Content-Range", cr);

  return new Response(upstream.body, { status: upstream.status, headers: out });
}