import { NextRequest } from "next/server";
import { RateLimiter, getClientIp } from "../lib/rate";
import { assertAllowedVideoCdnUrl, safeVideoCdnFetch } from "../lib/video-cdn";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 180;

const limiter = new RateLimiter(30, 60_000);

const ALLOWED_EXT = new Set([
  "mp4", "webm", "mov", "m4v", "mkv",
  "mp3", "m4a", "aac", "wav", "ogg", "flac",
  "jpg", "jpeg", "png", "gif", "webp",
  "pdf",
]);

function fileNameFromUrl(u: URL): string {
  const base = u.pathname.split("/").pop()?.split("?")[0] ?? "video";
  const sanitized = base.replace(/[^\w.\-]+/g, "_").slice(-80) || "video";
  const ext = sanitized.includes(".") ? sanitized.split(".").pop()!.toLowerCase() : "";
  const final = ALLOWED_EXT.has(ext) ? sanitized : `${sanitized}.mp4`;
  return final;
}

const MAX_PROXY_BYTES = 250 * 1024 * 1024;
const MAX_RANGE_BYTES = 8 * 1024 * 1024;

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



  try {
    await assertAllowedVideoCdnUrl(target);
  } catch {
    return new Response(
      "This link points to a private or restricted address and cannot be fetched.",
      { status: 403 }
    );
  }

  // Byte ranges are needed for seeking but must not bypass the proxy limit.
  const range = req.headers.get("range");
  let safeRange: string | null = null;
  if (range) {
    const match = /^bytes=(\d+)-(\d*)$/.exec(range);
    const start = match ? Number(match[1]) : NaN;
    const end = match && match[2] ? Number(match[2]) : start + MAX_RANGE_BYTES - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) ||
        start < 0 || end < start || end - start + 1 > MAX_RANGE_BYTES) {
      return new Response("Unsupported or oversized byte range.", { status: 416 });
    }
    safeRange = `bytes=${start}-${end}`;
  }
  const upstreamHeaders: Record<string, string> = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    Accept: "*/*",
  };
  if (safeRange) upstreamHeaders.Range = safeRange;

  let upstream: globalThis.Response;
  try {
    upstream = await safeVideoCdnFetch(target, upstreamHeaders, AbortSignal.timeout(120_000));
  } catch {
    return new Response("The source did not respond. Try again in a moment.", { status: 502 });
  }

  if (!upstream.ok || (safeRange && upstream.status !== 206)) {
    await upstream.body?.cancel();
    return new Response("The source rejected the request or did not honor the byte range.", { status: 502 });
  }

  const expectedBytes = Number(upstream.headers.get("content-length") || 0);
  if (expectedBytes > (safeRange ? MAX_RANGE_BYTES : MAX_PROXY_BYTES)) {
    await upstream.body?.cancel();
    return new Response("Media is too large for this service.", { status: 413 });
  }
  let bytesReceived = 0;
  const body = upstream.body?.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      bytesReceived += chunk.byteLength;
      if (bytesReceived > (safeRange ? MAX_RANGE_BYTES : MAX_PROXY_BYTES)) {
        controller.error(new Error("Media exceeds maximum download size"));
      } else {
        controller.enqueue(chunk);
      }
    },
  }));

  const out = new Headers();
  out.set("Content-Disposition", `attachment; filename="${fileNameFromUrl(target)}"`);
  if (safeRange) out.set("Accept-Ranges", "bytes");
  const ct = upstream.headers.get("content-type");
  if (ct) out.set("Content-Type", ct);
  const cl = upstream.headers.get("content-length");
  if (cl) out.set("Content-Length", cl);
  const cr = upstream.headers.get("content-range");
  if (cr) out.set("Content-Range", cr);

  return new Response(body, { status: upstream.status, headers: out });
}