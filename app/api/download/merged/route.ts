import { NextRequest } from "next/server";
import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promises as dns } from "node:dns";
import { PassThrough } from "node:stream";
import { isPrivateIpAddress, RateLimiter, getClientIp } from "../../lib/rate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 600;

const limiter = new RateLimiter(20, 60_000);
const MAX_DOWNLOAD_BYTES = 2 * 1024 * 1024 * 1024;

async function assertPublicHost(hostname: string): Promise<void> {
  const addresses = await dns.lookup(hostname, { all: true, verbatim: true });
  if (!addresses.length) throw new Error("unresolvable");
  for (const addr of addresses) {
    if (isPrivateIpAddress(addr.address)) throw new Error("private");
  }
}

async function fetchFile(
  target: URL,
  headers: Record<string, string>,
  dest: string,
  signal: AbortSignal
): Promise<void> {
  await assertPublicHost(target.hostname);
  const res = await fetch(target, { headers, redirect: "follow", signal });
  if (!res.ok && res.status !== 206) {
    throw new Error(`upstream status ${res.status}`);
  }
  if (!res.body) throw new Error("empty body");
  const size = Number(res.headers.get("content-length") ?? 0);
  if (size > MAX_DOWNLOAD_BYTES) throw new Error("too large");
  const file = await fs.open(dest, "w");
  try {
    const buf = new Uint8Array(128 * 1024);
    for await (const chunk of res.body as unknown as AsyncIterable<Uint8Array>) {
      if (signal.aborted) throw new Error("aborted");
      const c = chunk as Uint8Array;
      for (let i = 0; i < c.length; i += buf.length) {
        const part = c.subarray(i, i + buf.length);
        await file.write(part);
      }
    }
  } finally {
    await file.close();
  }
}

function sanitizeFilename(name: string, ext: string): string {
  const clean = name.replace(/[^\w.\- ]+/g, "_").trim().replace(/\s+/g, "_").slice(0, 80);
  return `${clean || "video"}.${ext}`;
}

function runFfmpegMerge(video: string, audio: string | null, output: string): Promise<{ code: number; stderr: string }> {
  return new Promise((resolve) => {
    // Re-encode to H.264 + AAC so the MP4 plays everywhere on mobile,
    // including older iOS Safari and Android. Blind "-c:v copy" would keep
    // an unplayable source codec (HEVC/VP9) in an .mp4 container.
    const args = audio
      ? [
          "-y",
          "-i", video,
          "-i", audio,
          "-vf", "format=yuv420p",
          "-c:v", "libx264",
          "-profile:v", "baseline",
          "-level", "3.0",
          "-preset", "medium",
          "-crf", "22",
          "-pix_fmt", "yuv420p",
          "-c:a", "aac",
          "-b:a", "192k",
          "-shortest",
          "-movflags", "+faststart",
          "-max_muxing_queue_size", "2048",
          output,
        ]
      : [
          "-y",
          "-i", video,
          "-vf", "format=yuv420p",
          "-c:v", "libx264",
          "-profile:v", "baseline",
          "-level", "3.0",
          "-preset", "medium",
          "-crf", "22",
          "-pix_fmt", "yuv420p",
          "-c:a", "aac",
          "-b:a", "192k",
          "-movflags", "+faststart",
          output,
        ];
    const child = spawn("ffmpeg", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (d: Buffer) => {
      if (stderr.length < 64_000) stderr += d.toString("utf8");
    });
    child.on("error", () => resolve({ code: 1, stderr: "ffmpeg not available" }));
    child.on("close", (code) => resolve({ code: code ?? 1, stderr }));
  });
}

export async function GET(req: NextRequest): Promise<Response> {
  const ip = getClientIp(req);
  if (limiter.isLimited(ip)) {
    return new Response("Too many requests. Please wait a minute.", { status: 429 });
  }

  const videoRaw = req.nextUrl.searchParams.get("url")?.trim() ?? "";
  const audioRaw = req.nextUrl.searchParams.get("audio")?.trim() ?? "";
  if (!videoRaw) {
    return new Response("Missing url parameter.", { status: 400 });
  }

  const videoTitle = req.nextUrl.searchParams.get("title")?.trim() ?? "";

  let video: URL;
  let audio: URL | null = null;
  try {
    video = new URL(videoRaw);
    if (audioRaw) audio = new URL(audioRaw);
  } catch {
    return new Response("Invalid link.", { status: 400 });
  }

  if (video.protocol !== "https:" && video.protocol !== "http:") {
    return new Response("Only http(s) targets are supported.", { status: 400 });
  }
  if (audio && audio.protocol !== "https:" && audio.protocol !== "http:") {
    return new Response("Only http(s) audio targets are supported.", { status: 400 });
  }

  const range = req.headers.get("range");

  // Range requests come from in-page players that need byte seeking, which a
  // re-encode cannot satisfy, so passthrough the original stream for those.
  if (range) {
    try {
      await assertPublicHost(video.hostname);
    } catch {
      return new Response("This link points to a restricted address.", { status: 403 });
    }
    const upstreamHeaders: Record<string, string> = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      Accept: "*/*",
    };
    upstreamHeaders.Range = range;
    const upstream = await fetch(video, { headers: upstreamHeaders, redirect: "follow" });
    if (!upstream.ok && upstream.status !== 206) {
      return new Response("The source rejected the request.", { status: 502 });
    }
    const out = new Headers();
    out.set("Content-Disposition", `attachment; filename="${sanitizeFilename(videoTitle, "mp4")}"`);
    out.set("Accept-Ranges", "bytes");
    const ct = upstream.headers.get("content-type");
    if (ct) out.set("Content-Type", ct);
    const cl = upstream.headers.get("content-length");
    if (cl) out.set("Content-Length", cl);
    return new Response(upstream.body, { status: upstream.status, headers: out });
  }

  // Merge/re-encode path: always re-encode to H.264/AAC so the saved MP4 plays
  // on mobile. Uses two inputs (video + audio) when audio is provided, or one
  // input (combined source) otherwise.
  const dir = await mkdtemp(path.join(os.tmpdir(), "qt-merge-"));
  const videoFile = path.join(dir, "v" + path.extname(video.pathname).slice(0, 8) || ".mp4");
  const audioFile = audio ? path.join(dir, "a" + path.extname(audio.pathname).slice(0, 8) || ".m4a") : null;
  const output = path.join(dir, "out.mp4");

  try {
    await assertPublicHost(video.hostname);
    const fetchVideo = fetchFile(
      video,
      { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36", Accept: "*/*" },
      videoFile,
      AbortSignal.timeout(120_000)
    );
    let fetchAudio: Promise<void> | null = null;
    if (audio && audioFile) {
      await assertPublicHost(audio.hostname);
      fetchAudio = fetchFile(
        audio,
        { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36", Accept: "*/*" },
        audioFile,
        AbortSignal.timeout(120_000)
      );
    }
    await Promise.all([fetchVideo, fetchAudio].filter((p): p is Promise<void> => !!p));

    const { code, stderr } = await runFfmpegMerge(videoFile, audio ? audioFile : null, output);
    if (code !== 0) {
      console.error("ffmpeg merge failed:", stderr.slice(-500));
      return new Response("The source media could not be combined. Try downloading video and audio separately.", { status: 502 });
    }

    const stat = await fs.stat(output);
    const pass = new PassThrough();
    const rs = await fs.open(output);
    const stream = rs.createReadStream();
    stream.pipe(pass);

    const cleanup = () => {
      rs.close().catch(() => {});
      rm(dir, { recursive: true, force: true }).catch(() => {});
    };
    const timer = setTimeout(cleanup, 120_000);
    stream.on("end", () => {
      clearTimeout(timer);
      pass.end();
    });
    stream.on("error", () => {
      clearTimeout(timer);
      pass.destroy();
    });
    pass.on("close", () => {
      clearTimeout(timer);
      cleanup();
    });

    const out = new Headers();
    out.set("Content-Type", "video/mp4");
    out.set("Content-Length", String(stat.size));
    out.set("Content-Disposition", `attachment; filename="${sanitizeFilename(videoTitle, "mp4")}"`);

    return new Response(pass as unknown as BodyInit, { status: 200, headers: out });
  } catch (e) {
    rm(dir, { recursive: true, force: true }).catch(() => {});
    const msg = e instanceof Error ? e.message : "";
    if (msg === "too large") {
      return new Response("The source file is too large to process.", { status: 413 });
    }
    if (msg === "aborted") {
      return new Response("The download timed out.", { status: 504 });
    }
    return new Response("The source media could not be merged. Try again in a moment.", { status: 502 });
  }
}