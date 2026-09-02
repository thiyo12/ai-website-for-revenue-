"use client";

import { useCallback, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import PaywallModal from "@/components/PaywallModal";

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
}

export default function ImageCompressor() {
  const [original, setOriginal] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressed, setCompressed] = useState<File | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [preview, setPreview] = useState("");
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    setError("");
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      setError("Please choose a JPG, PNG, or WebP image.");
      return;
    }

    setOriginal(file);
    setOriginalSize(file.size);
    setCompressed(null);
    setCompressedSize(0);

    setPreview(URL.createObjectURL(file));
    setCompressing(true);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });
      setCompressed(compressedFile);
      setCompressedSize(compressedFile.size);
    } catch {
      setError("Compression failed. Please try a different image.");
    } finally {
      setCompressing(false);
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      e.target.value = "";
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const savings =
    original && compressed
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <PaywallModal />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-accent-300 bg-accent-50/50 px-6 py-12 text-center transition-colors hover:border-accent-400 hover:bg-accent-50"
      >
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
          Drag & drop an image here
        </p>
        <p className="mt-1 text-sm text-gray-500">
          or click to browse · JPG, PNG, WebP supported
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {(original || compressing) && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Original image
            </p>
            <img
              src={preview}
              alt="Original"
              loading="lazy"
              decoding="async"
              className="h-48 w-full rounded-lg border border-gray-200 object-contain bg-gray-50"
            />
            <p className="mt-2 text-sm text-gray-500">
              Size: <span className="font-medium text-gray-800">{formatBytes(originalSize)}</span>
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              {compressing ? "Compressing…" : "Compressed image"}
            </p>
            {compressed ? (
              <>
                <img
                  src={compressed ? URL.createObjectURL(compressed) : ""}
                  alt="Compressed"
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full rounded-lg border border-gray-200 object-contain bg-gray-50"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Size:{" "}
                  <span className="font-medium text-accent-600">
                    {formatBytes(compressedSize)}
                  </span>{" "}
                  ({savings}% smaller)
                </p>
              </>
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-200 border-t-accent-600" />
              </div>
            )}
          </div>
        </div>
      )}

      {compressed && (
        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <a
            href={URL.createObjectURL(compressed)}
            download={`compressed-${compressed.name}`}
            className="w-full rounded-lg bg-accent-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-700 sm:w-auto"
          >
            Download compressed image
          </a>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:w-auto"
          >
            Compress another image
          </button>
        </div>
      )}
    </div>
  );
}
