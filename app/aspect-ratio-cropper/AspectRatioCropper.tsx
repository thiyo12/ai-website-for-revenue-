"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";

const RATIOS: Record<string, string> = {
  "1:1": "1:1",
  "4:5": "4/5",
  "3:2": "3/2",
  "2:3": "2/3",
  "16:9": "16/9",
  "9:16": "9/16",
  "3:4": "3/4",
};

const RATIO_KEYS = Object.keys(RATIOS);

export default function AspectRatioCropper() {
  const [ratioKey, setRatioKey] = useState<string>(RATIO_KEYS[0]);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [preview, setPreview] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [displayW, setDisplayW] = useState(0);
  const [displayH, setDisplayH] = useState(0);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [offset, setOffset] = useState({ x: 0.5, y: 0.5 });

  const ratio = RATIOS[ratioKey];

  const handleFile = (f: File) => {
    setError("");
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    const img = new Image();
    img.onload = () => {
      setImage(img);
      setPreview(URL.createObjectURL(f));
      setResultUrl("");
      const maxW = 600;
      const maxH = 500;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      setDisplayW(img.width * scale);
      setDisplayH(img.height * scale);
    };
    img.onerror = () => setError("Could not load that image.");
    img.src = URL.createObjectURL(f);
  };

  const process = () => {
    if (!image) {
      setError("Upload an image first.");
      return;
    }
    setError("");
    setProcessing(true);
    requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        setError("Your browser does not support canvas.");
        setProcessing(false);
        return;
      }
      const [rw, rh] = ratio.split("/").map(Number);
      const outRatio = rw / rh;
      const imgRatio = image.width / image.height;
      let cropW: number, cropH: number;
      if (imgRatio > outRatio) {
        cropH = image.height;
        cropW = cropH * outRatio;
      } else {
        cropW = image.width;
        cropH = cropW / outRatio;
      }
      const sx = (image.width - cropW) * offset.x;
      const sy = (image.height - cropH) * offset.y;
      canvas.width = cropW;
      canvas.height = cropH;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, sx, sy, cropW, cropH, 0, 0, cropW, cropH);
      setResultUrl(canvas.toDataURL("image/jpeg", 0.92));
      setProcessing(false);
    });
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Aspect ratio
        </label>
        <div className="flex flex-wrap gap-2">
          {RATIO_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => setRatioKey(key)}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                ratioKey === key
                  ? "border-accent-600 bg-accent-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {image && (
        <p className="text-sm text-gray-500">
          Use the sliders below to fine-tune which part of the image is kept.
        </p>
      )}

      {resultUrl ? (
        <img
          src={resultUrl}
          alt="Cropped"
          className="mx-auto max-h-80 rounded-lg border border-gray-200 object-contain"
        />
      ) : preview ? (
        <img
          src={preview}
          alt="Original"
          style={{ width: displayW, height: displayH }}
          className="mx-auto rounded-lg border border-gray-200 bg-gray-100 object-cover"
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-base font-medium text-gray-800">
            Click to upload an image
          </p>
          <p className="mt-1 text-sm text-gray-500">
            JPG or PNG · cropped to any aspect ratio
          </p>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }} />
        </label>
      )}

      {image && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Horizontal position
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(offset.x * 100)}
              onChange={(e) => setOffset((o) => ({ ...o, x: Number(e.target.value) / 100 }))}
              className="w-full accent-accent-600"
            />
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Vertical position
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(offset.y * 100)}
              onChange={(e) => setOffset((o) => ({ ...o, y: Number(e.target.value) / 100 }))}
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

      {image && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={process}
            disabled={processing}
            className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-50"
          >
            {processing ? "Cropping…" : `Crop to ${ratioKey}`}
          </button>
          {resultUrl && (
            <AdGate
              onAction={() => {
                const a = document.createElement("a");
                a.href = resultUrl;
                a.download = `cropped-${ratioKey.replace(":", "x")}.jpg`;
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
