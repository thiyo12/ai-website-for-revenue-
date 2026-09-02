"use client";

import { useRef, useState } from "react";
import { getFFmpeg, formatBytes } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import PaywallModal from "@/components/PaywallModal";

const PRESETS: Record<string, { label: string; scale: string; crf: string }> = {
  Instagram: { label: "Instagram (1080p)", scale: "1080:-2", crf: "28" },
  Facebook: { label: "Facebook (1080p)", scale: "1080:-2", crf: "28" },
  TikTok: { label: "TikTok (1080p)", scale: "1080:-2", crf: "26" },
  YouTube: { label: "YouTube (720p)", scale: "1280:-2", crf: "28" },
  Twitter: { label: "X/Twitter (720p)", scale: "1280:-2", crf: "30" },
};

const PRESET_KEYS = Object.keys(PRESETS);

export default function SocialMediaVideoCompressor() {
  const [preset, setPreset] = useState<string>(PRESET_KEYS[0]);
  const [quality, setQuality] = useState(28);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const ffRef = useRef<Awaited<ReturnType<typeof getFFmpeg>> | null>(null);

  const handleFile = (f: File) => {
    setError("");
    if (!f.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    setFile(f);
    setOriginalSize(f.size);
    setPreview(URL.createObjectURL(f));
    setResultUrl("");
    setResultSize(0);
  };

  const compress = async () => {
    if (!file) {
      setError("Upload a video first.");
      return;
    }
    setError("");
    setProcessing(true);
    setProgress(0);
    try {
      if (!ffRef.current) {
        setProgress(5);
        ffRef.current = await getFFmpeg();
        ffRef.current.on("progress", ({ progress: p }) => {
          setProgress(Math.round(10 + p * 90));
        });
      }
      const ffmpeg = ffRef.current;
      const presetConfig = PRESETS[preset];
      const input = "input.mp4";
      const output = "output.mp4";
      await ffmpeg.writeFile(input, await fetchFile(file));
      await ffmpeg.exec([
        "-i",
        input,
        "-vf",
        `scale=${presetConfig.scale}`,
        "-c:v",
        "libx264",
        "-crf",
        quality > 30 ? String(quality) : presetConfig.crf,
        "-preset",
        "medium",
        "-movflags",
        "+faststart",
        output,
      ]);
      const data = await ffmpeg.readFile(output);
      const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
      const blob = new Blob([bytes], { type: "video/mp4" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch {
      setError(
        "Compression failed. Please try a shorter or smaller video."
      );
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  const savings = resultSize
    ? Math.round((1 - resultSize / originalSize) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <PaywallModal />

      {preview ? (
        <video
          src={resultUrl || preview}
          className="mx-auto max-h-72 rounded-lg border border-gray-200"
          controls
          muted
        />
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-accent-300 bg-accent-50/50 px-6 py-12 text-center transition-colors hover:border-accent-400 hover:bg-accent-50">
          <svg
            className="mb-3 h-12 w-12 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2"
            />
          </svg>
          <p className="text-base font-medium text-gray-800">
            Click to upload a video
          </p>
          <p className="mt-1 text-sm text-gray-500">
            MP4, WebM supported · compressed locally
          </p>
          <input type="file" accept="video/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }} />
        </label>
      )}

      {file && !resultUrl && (
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Platform
            </label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
            >
              {PRESET_KEYS.map((k) => (
                <option key={k} value={k}>
                  {PRESETS[k].label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Quality: {quality === 28 ? "Balanced" : quality >= 32 ? "Smaller file" : "Higher quality"}
            </span>
            <input
              type="range"
              min={18}
              max={40}
              step={1}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-accent-600"
            />
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {processing && (
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-accent-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-sm text-gray-500">
            Compressing… {progress}%
          </p>
        </div>
      )}

      {file && !resultUrl && (
        <button
          onClick={compress}
          disabled={processing}
          className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
        >
          {processing ? "Compressing…" : "Compress video"}
        </button>
      )}

      {resultUrl && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-gray-500">
            Size:{" "}
            <span className="font-medium text-accent-600">
              {formatBytes(resultSize)}
            </span>{" "}
            from {formatBytes(originalSize)} ({savings}% smaller)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={resultUrl}
              download="compressed.mp4"
              className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Download video
            </a>
            <button
              onClick={() => {
                setFile(null);
                setPreview("");
                setResultUrl("");
                setResultSize(0);
              }}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Compress another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
