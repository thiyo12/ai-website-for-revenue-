"use client";

import { useRef, useState } from "react";
import { getFFmpeg, formatBytes } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";

export default function VideoToGif() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [width, setWidth] = useState(480);
  const [fps, setFps] = useState(10);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const ffRef = useRef<Awaited<ReturnType<typeof getFFmpeg>> | null>(null);

  const handleFile = (f: File) => {
    setError("");
    if (!f.type.startsWith("video/")) {
      setError("Please choose a video file.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResultUrl("");
    setResultSize(0);
  };

  const convert = async () => {
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
      const input = "input.mp4";
      const output = "output.gif";
      await ffmpeg.writeFile(input, await fetchFile(file));
      await ffmpeg.exec([
        "-i",
        input,
        "-vf",
        `fps=${fps},scale=${width}:-1:flags=lanczos`,
        output,
      ]);
      const data = await ffmpeg.readFile(output);
      const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
      const blob = new Blob([bytes], { type: "image/gif" });
      setResultUrl(URL.createObjectURL(blob));
      setResultSize(blob.size);
    } catch {
      setError("Conversion failed. Please try a shorter or smaller video.");
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      {preview ? (
        <video
          src={preview}
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <p className="text-base font-medium text-gray-800">
            Click to upload a video
          </p>
          <p className="mt-1 text-sm text-gray-500">
            MP4, WebM supported · processed locally
          </p>
          <input type="file" accept="video/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }} />
        </label>
      )}

      {file && !resultUrl && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Width: {width}px
            </span>
            <input
              type="range"
              min={240}
              max={960}
              step={16}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full accent-accent-600"
            />
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              FPS: {fps}
            </span>
            <input
              type="range"
              min={5}
              max={25}
              step={1}
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
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
            Converting… {progress}%
          </p>
        </div>
      )}

      {file && !resultUrl && (
        <button
          onClick={convert}
          disabled={processing}
          className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
        >
          {processing ? "Converting…" : "Convert to GIF"}
        </button>
      )}

      {resultUrl && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={resultUrl}
            alt="GIF result"
            className="mx-auto max-h-72 rounded-lg border border-gray-200"
          />
          <p className="text-sm text-gray-500">
            Size: <span className="font-medium text-accent-600">{formatBytes(resultSize)}</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <AdGate
              onAction={() => {
                const a = document.createElement("a");
                a.href = resultUrl;
                a.download = "animation.gif";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              buttonLabel="Download"
              className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Download GIF
            </AdGate>
            <button
              onClick={() => {
                setFile(null);
                setPreview("");
                setResultUrl("");
                setResultSize(0);
              }}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Convert another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
