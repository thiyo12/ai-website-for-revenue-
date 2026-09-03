"use client";

import { useRef, useState } from "react";

interface ExtractData {
  platform?: string;
  title?: string;
  thumbnail?: string;
  author?: string;
  duration?: number;
  downloadUrl?: string | null;
  audioUrl?: string | null;
  videoOnly?: boolean;
  format?: string;
}

interface ExtractResponse {
  error?: string;
  platformLimited?: boolean;
  platform?: string;
  title?: string;
  thumbnail?: string;
  author?: string;
  duration?: number;
  downloadUrl?: string | null;
  audioUrl?: string | null;
  videoOnly?: boolean;
  format?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter / X",
  reddit: "Reddit",
  pinterest: "Pinterest",
  snapchat: "Snapchat",
  vk: "VK",
  tumblr: "Tumblr",
  peertube: "PeerTube",
  dailymotion: "Dailymotion",
  twitch: "Twitch",
  soundcloud: "SoundCloud",
};

function formatDuration(sec?: number): string {
  if (!sec || sec <= 0) return "";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Route downloads through the server so the browser receives the file as an
// attachment (real download) instead of opening the remote media in a new tab.
// All video downloads go through /api/download/merged, which re-encodes to
// H.264/AAC so the saved MP4 plays everywhere on mobile (old iOS Safari and
// Android), even when the source ships with an unplayable codec like VP9/HEVC
// or as separate video+audio streams (common on Instagram reels).
function proxyHref(downloadUrl: string, audioUrl?: string | null, title?: string, videoOnly?: boolean): string {
  const q = new URLSearchParams({ url: downloadUrl });
  if (audioUrl && videoOnly) q.set("audio", audioUrl);
  if (title) q.set("title", title);
  return `/api/download/merged?${q.toString()}`;
}

export default function SocialMediaVideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ExtractData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [limited, setLimited] = useState(false);

  async function handleExtract() {
    const trimmed = url.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setData(null);
    setCopied(false);
    setLimited(false);

    try {
      const res = await fetch(`/api/extract?url=${encodeURIComponent(trimmed)}`);
      const json = (await res.json()) as ExtractResponse;

      if (!res.ok) {
        setLimited(!!json.platformLimited);
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setData(json);
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !loading) handleExtract();
  }

  async function copyLink(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const platformLabel = data?.platform
    ? ERROR_MESSAGES[data.platform] ?? data.platform
    : "";

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <label
          htmlFor="media-url"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Paste a video link
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="media-url"
            type="url"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste any public video link (YouTube, Instagram, X, Facebook…)"
            className="w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
          <button
            type="button"
            onClick={handleExtract}
            disabled={loading || !url.trim()}
            className="rounded-lg bg-accent-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Getting link…" : "Get Video"}
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Paste a public video link to download it. Works for YouTube and most
          social platforms. Instagram may show a notice when it&rsquo;s
          temporarily refusing the download server.
        </p>
      </div>

      {error && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            limited
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <div className="flex items-start gap-2">
            {limited && (
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            )}
            <div>
              <p className="font-semibold">
                {limited ? "This platform is temporarily unavailable" : "Something went wrong"}
              </p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="mt-6 flex flex-col items-center gap-3 py-8 text-gray-500">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" />
          <p className="text-sm">Extracting video…</p>
        </div>
      )}

      {data && !loading && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {data.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.thumbnail}
              alt={data.title || "Video thumbnail"}
              className="aspect-video w-full object-cover"
            />
          )}
          <div className="p-5">
            {platformLabel && (
              <span className="mb-2 inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-600">
                {platformLabel}
              </span>
            )}
            <h2 className="text-lg font-bold text-gray-900">
              {data.title || "Your video is ready"}
            </h2>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              {data.author && <span>by {data.author}</span>}
              {data.format && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                  {data.format}
                </span>
              )}
              {formatDuration(data.duration) && (
                <span>{formatDuration(data.duration)}</span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {data.downloadUrl && (
                <a
                  href={proxyHref(data.downloadUrl, data.audioUrl, data.title, data.videoOnly)}
                  download
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Video
                </a>
              )}
              {data.audioUrl && (
                <a
                  href={proxyHref(data.audioUrl as string)}
                  download
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                  </svg>
                  Download MP3
                </a>
              )}
            </div>

            {data.downloadUrl && (
              <button
                type="button"
                onClick={() => copyLink(proxyHref(data.downloadUrl as string, data.audioUrl, data.title, data.videoOnly))}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
              >
                {copied ? (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy link
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
