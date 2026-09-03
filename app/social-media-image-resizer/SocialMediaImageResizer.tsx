"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";

const PRESETS: Record<string, { label: string; width: number; height: number }> = {
  "Instagram Post": { label: "Instagram Post (1080x1080)", width: 1080, height: 1080 },
  "Instagram Story": { label: "Instagram Story (1080x1920)", width: 1080, height: 1920 },
  "Instagram Portrait": { label: "Instagram Portrait (1080x1350)", width: 1080, height: 1350 },
  "Facebook Post": { label: "Facebook Post (1200x630)", width: 1200, height: 630 },
  "Facebook Cover": { label: "Facebook Cover (820x312)", width: 820, height: 312 },
  "Twitter Post": { label: "X/Twitter Post (1600x900)", width: 1600, height: 900 },
  "Twitter Header": { label: "X/Twitter Header (1500x500)", width: 1500, height: 500 },
  "YouTube Thumbnail": { label: "YouTube Thumbnail (1280x720)", width: 1280, height: 720 },
  "TikTok Video": { label: "TikTok (1080x1920)", width: 1080, height: 1920 },
  "LinkedIn Post": { label: "LinkedIn Post (1200x627)", width: 1200, height: 627 },
};

const PRESET_KEYS = Object.keys(PRESETS);

export default function SocialMediaImageResizer() {
  const [preset, setPreset] = useState<string>(PRESET_KEYS[0]);
  const [customWidth, setCustomWidth] = useState(0);
  const [customHeight, setCustomHeight] = useState(0);
  const [useCustom, setUseCustom] = useState(false);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const dims = useCustom
    ? { width: customWidth || 0, height: customHeight || 0 }
    : { width: PRESETS[preset].width, height: PRESETS[preset].height };

  const handleFile = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setPreview(objectUrl);
      setResultUrl("");
    };
    img.onerror = () => setError("Could not load that image.");
    img.src = objectUrl;
  };

  const process = () => {
    if (!image) {
      setError("Upload an image first.");
      return;
    }
    if (!dims.width || !dims.height) {
      setError("Enter a valid width and height.");
      return;
    }
    setError("");
    setProcessing(true);
    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setProcessing(false);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Your browser does not support canvas.");
        setProcessing(false);
        return;
      }
      const W = dims.width;
      const H = dims.height;
      const scale = Math.max(W / image.width, H / image.height);
      const srcW = image.width * scale;
      const srcH = image.height * scale;
      const sx = (srcW - W) / 2;
      const sy = (srcH - H) / 2;
      canvas.width = W;
      canvas.height = H;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, sx, sy, srcW, srcH, 0, 0, W, H);
      setResultUrl(canvas.toDataURL("image/jpeg", 0.92));
      setProcessing(false);
    });
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Target size
        </label>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={preset}
            onChange={(e) => {
              setPreset(e.target.value);
              setUseCustom(false);
            }}
            disabled={useCustom}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200 disabled:opacity-50"
          >
            {PRESET_KEYS.map((k) => (
              <option key={k} value={k}>
                {PRESETS[k].label}
              </option>
            ))}
          </select>
          <label className="inline-flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="accent-accent-600"
            />
            Custom size
          </label>
          {useCustom && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customWidth || ""}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                placeholder="Width"
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-accent-500"
              />
              <span className="text-gray-400">x</span>
              <input
                type="number"
                value={customHeight || ""}
                onChange={(e) => setCustomHeight(Number(e.target.value))}
                placeholder="Height"
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-accent-500"
              />
            </div>
          )}
        </div>
      </div>

      {resultUrl ? (
        <img
          src={resultUrl}
          alt="Resized"
          className="mx-auto max-h-80 rounded-lg border border-gray-200 object-contain"
        />
      ) : preview ? (
        <img
          src={preview}
          alt="Original"
          className="mx-auto max-h-80 rounded-lg border border-gray-200 object-contain"
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
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-base font-medium text-gray-800">
            Click to upload an image
          </p>
          <p className="mt-1 text-sm text-gray-500">
            JPG or PNG · resized and centered automatically
          </p>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }} />
        </label>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {image && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={process}
            disabled={processing || !dims.width || !dims.height}
            className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
          >
            {processing ? "Resizing…" : `Resize to ${dims.width}x${dims.height}`}
          </button>
          {resultUrl && (
            <AdGate
              onAction={() => {
                const a = document.createElement("a");
                a.href = resultUrl;
                a.download = `resized-${dims.width}x${dims.height}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
              buttonLabel="Download"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Download image
            </AdGate>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
