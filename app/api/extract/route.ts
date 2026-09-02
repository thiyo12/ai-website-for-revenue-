import { NextRequest, NextResponse } from "next/server";
import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { RateLimiter, getClientIp } from "../lib/rate";
import { getMediaSession } from "../lib/mediaSession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 40;

interface Format {
  url?: string;
  ext?: string;
  height?: number;
  vcodec?: string;
  acodec?: string;
  video_ext?: string;
  audio_ext?: string;
  abr?: number;
}

interface ExtractResult {
  error?: string;
  status?: number;
  data?: {
    platform: string;
    title?: string;
    thumbnail?: string;
    author?: string;
    duration?: number;
    downloadUrl: string | null;
    audioUrl: string | null;
    videoOnly: boolean;
    format?: string;
  };
}

const ALLOWED_HOSTS: { match: RegExp; platform: string }[] = [
  // YouTube
  { match: /^(www\.|m\.|music\.)?youtube\.com$/i, platform: "youtube" },
  { match: /^youtu\.be$/i, platform: "youtube" },
  // Facebook
  { match: /^(www\.|m\.)?facebook\.com$/i, platform: "facebook" },
  { match: /^(www\.|m\.)?fb\.watch$/i, platform: "facebook" },
  // Instagram
  { match: /^(www\.|m\.|instagram\.)?instagram\.com$/i, platform: "instagram" },
  // Pinterest
  { match: /^(www\.)?pin\.it$/i, platform: "pinterest" },
  { match: /^(www\.|[\w-]+\.)?pinterest\.(com|co\.uk|de|fr|it|es|nl|se|ch|co\.in|br|au|at|cl|jp|ru|ie|ca|mx|nz|pt|ph)$/i, platform: "pinterest" },
  // Twitter / X
  { match: /^(www\.|mobile\.)?twitter\.com$/i, platform: "twitter" },
  { match: /^(www\.|platform\.)?x\.com$/i, platform: "twitter" },
  // Reddit
  { match: /^(www\.|old\.|m\.)?reddit\.com$/i, platform: "reddit" },
  { match: /^v\.redd\.it$/i, platform: "reddit" },
  // Snapchat (public Spotlight / discover)
  { match: /^(www\.)?snapchat\.com$/i, platform: "snapchat" },
  // TikTok-alternative short video
  { match: /^(www\.)?vk\.com$/i, platform: "vk" },
  { match: /^(www\.|m\.)?tumblr\.com$/i, platform: "tumblr" },
  { match: /^(www\.)?peertube\.(tv|org|fr)$/i, platform: "peertube" },
  // Dailymotion
  { match: /^(www\.)?dailymotion\.com$/i, platform: "dailymotion" },
  // Twitch clips / VODs
  { match: /^(www\.|clips\.|go\.)?twitch\.tv$/i, platform: "twitch" },
  // SoundCloud (audio)
  { match: /^(www\.|m\.)?soundcloud\.com$/i, platform: "soundcloud" },
];

interface LimitedPlatform {
  label: string;
  reason: string;
}

const LIMITED_PLATFORMS: Record<string, LimitedPlatform> = {
  instagram: {
    label: "Instagram",
    reason:
      "Instagram is refusing to serve this public video to the download server right now. It normally works from a regular home connection — try again later.",
  },
};

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 6;
const EXTRACT_TIMEOUT_MS = 30_000;
const MAX_STDOUT_BYTES = 8 * 1024 * 1024;
const extractLimiter = new RateLimiter(RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);

let cachedBinary: string | null | undefined;
let cachedCertifi: string | null | undefined;

function binaryCandidates(): string[] {
  const list: string[] = [];
  const fromEnv = process.env.YTDLP_PATH;
  if (fromEnv) list.push(fromEnv);
  const home = os.homedir();
  list.push(
    path.join(home, "Library/Python/3.13/bin/yt-dlp"),
    "/opt/homebrew/bin/yt-dlp",
    "/usr/local/bin/yt-dlp",
    "/usr/bin/yt-dlp"
  );
  return [...new Set(list)];
}

function resolveBinary(): string | null {
  if (cachedBinary !== undefined) return cachedBinary;
  cachedBinary = binaryCandidates().find(existsSync) ?? null;
  return cachedBinary;
}

function resolveCertifi(): string | null {
  if (cachedCertifi !== undefined) return cachedCertifi;
  cachedCertifi = null;
  if (process.env.SSL_CERT_FILE && existsSync(process.env.SSL_CERT_FILE)) {
    cachedCertifi = process.env.SSL_CERT_FILE;
    return cachedCertifi;
  }
  try {
    const res = spawnSync("python3", ["-c", "import certifi; print(certifi.where())"], {
      timeout: 8000,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    if (res.status === 0 && res.stdout?.trim()) {
      const p = res.stdout.trim();
      if (existsSync(p)) cachedCertifi = p;
    }
  } catch {
    cachedCertifi = null;
  }
  return cachedCertifi;
}

function pickFormat(formats: Format[]) {
  const isHttp = (u?: string) => !!u && /^https?:\/\//i.test(u.trim());
  const mp4First = (a: Format, b: Format) =>
    (a.ext === "mp4" ? 1 : 0) - (b.ext === "mp4" ? 1 : 0);
  const hasAudio = (f: Format) =>
    (!!f.acodec && f.acodec !== "none") || (!!f.audio_ext && f.audio_ext !== "none");
  const hasVideo = (f: Format) =>
    (!!f.vcodec && f.vcodec !== "none") || (!!f.video_ext && f.video_ext !== "none");
  const heightOf = (f: Format) => f.height ?? 0;

  const progressive = formats
    .filter((f) => isHttp(f.url) && hasVideo(f) && hasAudio(f))
    .sort((a, b) => heightOf(b) - heightOf(a) || mp4First(a, b));

  const videoOnly = formats
    .filter((f) => isHttp(f.url) && hasVideo(f) && !hasAudio(f))
    .sort((a, b) => heightOf(b) - heightOf(a) || mp4First(a, b));

  const audioOnly = formats
    .filter((f) => isHttp(f.url) && hasAudio(f) && !hasVideo(f))
    .sort((a, b) => (b.abr ?? 0) - (a.abr ?? 0));

  const combined = progressive[0] ?? null;
  const video = combined ?? videoOnly[0] ?? null;
  const audio = audioOnly[0] ?? null;

  return {
    downloadUrl: video?.url ?? null,
    audioUrl: !combined && video ? audio?.url ?? null : null,
    videoOnly: !combined,
    format: (video?.ext ?? "") + (video?.height ? ` ${video.height}p` : ""),
  };
}

interface ExtractOptions {
  cookies?: string | null;
  proxy?: string | null;
}

function runExtract(
  url: string,
  binary: string,
  cert: string | null,
  opts: ExtractOptions = {}
): Promise<ExtractResult> {
  return new Promise((resolve) => {
    const args = [
      "--no-config-locations",
      "--no-cache-dir",
      "--skip-download",
      "--no-playlist",
      "--no-warnings",
      "--socket-timeout",
      "15",
      "--dump-single-json",
    ];
    if (opts.cookies) args.push("--cookies", opts.cookies);
    if (opts.proxy) args.push("--proxy", opts.proxy);
    args.push(url);

    const env: NodeJS.ProcessEnv = { ...process.env };
    if (cert) env.SSL_CERT_FILE = cert;

    const child = spawn(binary, args, { env, stdio: ["ignore", "pipe", "pipe"] });

    let stdout = "";
    let stderr = "";
    let killed = false;

    const timer = setTimeout(() => {
      killed = true;
      child.kill("SIGKILL");
    }, EXTRACT_TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      if (stdout.length < MAX_STDOUT_BYTES) stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk: Buffer) => {
      if (stderr.length < 64_000) stderr += chunk.toString("utf8");
    });

    child.on("error", (err) => {
      clearTimeout(timer);
      const code = (err as NodeJS.ErrnoException).code;
      resolve(
        code === "ENOENT"
          ? { status: 500, error: "The extraction engine is not installed on this server yet (yt-dlp)." }
          : { status: 500, error: "Download engine failed to start." }
      );
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      if (killed) {
        resolve({ status: 504, error: "The platform took too long to respond. Try again in a moment." });
        return;
      }
      if (code !== 0) {
        const line = stderr.split("\n").filter(Boolean).pop()?.trim() ?? "";
        const message = line.replace(/^ERROR:\s*\[?[^\]]*\]?\s*/, "").slice(0, 300);
        // Classify with the engine output but never echo the raw engine text to
        // the client (it may leak internal URLs/IPs). Return fixed friendly text.
        resolve(
          /private|login|sign in|unavailable|content isn't available/i.test(message)
            ? { status: 400, error: "This video is private, removed, or requires a login, so it can't be extracted." }
            : { status: 422, error: "The video could not be extracted. It may be restricted or temporarily unavailable." }
        );
        return;
      }
      try {
        const data = JSON.parse(stdout) as {
          title?: string;
          thumbnail?: string;
          uploader?: string;
          duration?: number;
          formats?: Format[];
        };
        const { downloadUrl, audioUrl, videoOnly, format } = pickFormat(data.formats ?? []);
        if (!downloadUrl) {
          resolve({ status: 422, error: "No downloadable media format was found for this link." });
          return;
        }
        resolve({
          data: {
            platform: "",
            title: data.title,
            thumbnail: data.thumbnail,
            author: data.uploader,
            duration: data.duration,
            downloadUrl,
            audioUrl,
            videoOnly,
            format,
          },
        });
      } catch {
        resolve({ status: 500, error: "The download engine returned an unexpected response." });
      }
    });
  });
}

const PLATFORM_FALLBACKS: Record<string, string> = {
  youtube: "This YouTube video could not be extracted. It may be private, removed, or restricted.",
  instagram:
    "This Instagram post couldn't be extracted. Instagram is refusing to serve the video to the download server right now — make sure it's a public post and try again later.",
  facebook: "This Facebook video could not be extracted. It may be private, removed, or restricted.",
  twitter: "This Twitter/X video could not be extracted. It may be protected, removed, or restricted.",
  reddit: "This Reddit video could not be extracted. It may be removed, NSFW, or restricted.",
  pinterest: "This Pinterest video could not be extracted. It may be private or restricted.",
  snapchat: "This Snapchat video could not be extracted. It may be private or temporary.",
  vk: "This VK video could not be extracted. It may be private or restricted.",
  tumblr: "This Tumblr video could not be extracted. It may be private or restricted.",
  peertube: "This PeerTube video could not be extracted. It may be restricted.",
  dailymotion: "This Dailymotion video could not be extracted. It may be unavailable or restricted.",
  twitch: "This Twitch clip could not be extracted. It may be expired or restricted.",
  soundcloud: "This audio could not be extracted. It may be unavailable or restricted.",
};

function mapExtractError(platform: string): string {
  const limited = LIMITED_PLATFORMS[platform];
  if (limited) return `${limited.label} is currently unavailable. ${limited.reason}`;
  return PLATFORM_FALLBACKS[platform] ?? "This video could not be extracted. It may be unavailable or restricted.";
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req);
  if (extractLimiter.isLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const raw = req.nextUrl.searchParams.get("url")?.trim() ?? "";
  if (!raw) {
    return NextResponse.json({ error: "Missing url parameter." }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return NextResponse.json({ error: "That is not a valid link." }, { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return NextResponse.json({ error: "Only http(s) links are supported." }, { status: 400 });
  }
  if (parsed.username || parsed.password) {
    return NextResponse.json({ error: "Links with login credentials are not supported." }, { status: 400 });
  }

  const hostEntry = ALLOWED_HOSTS.find((h) => h.match.test(parsed.hostname));
  if (!hostEntry) {
    return NextResponse.json(
      { error: "Unsupported link. You can download YouTube videos here." },
      { status: 400 }
    );
  }

  const binary = resolveBinary();
  if (!binary) {
    return NextResponse.json(
      { error: "The extraction engine is not installed on this server yet (yt-dlp)." },
      { status: 500 }
    );
  }
  const cert = resolveCertifi();

  let opts: { cookies: string | null; proxy: string | null } = { cookies: null, proxy: null };
  if (hostEntry.platform === "instagram") {
    try {
      const session = await getMediaSession();
      opts.cookies = session.instagramCookieJar;
      opts.proxy = session.proxy;
    } catch {
      // If the session harvester fails (e.g. browser not available), fall back to no cookies.
      opts = { cookies: null, proxy: null };
    }
  }

  const result = await runExtract(parsed.href, binary, cert, opts);
  if (result.error || result.status || !result.data) {
    const limited = LIMITED_PLATFORMS[hostEntry.platform];
    const friendly = mapExtractError(hostEntry.platform);
    return NextResponse.json(
      {
        error: friendly,
        platformLimited: limited ? true : undefined,
        platform: hostEntry.platform,
      },
      { status: result.status ?? 500 }
    );
  }

  result.data.platform = hostEntry.platform;
  return NextResponse.json(result.data);
}