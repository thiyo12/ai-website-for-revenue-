"use client";

import { useCallback, useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

interface ImglyModule {
  removeBackground: (input: Blob) => Promise<Blob>;
  preload: () => Promise<unknown>;
}

export default function BackgroundRemover() {
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setError("");
    setStatus("");
    setResult(null);
    const objectUrl = URL.createObjectURL(f);
    setOriginal(objectUrl);
    setRemoving(true);
    setStatus("Loading the AI model…");
    try {
      const imglyUrl =
        "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/dist/index.mjs";
      const { removeBackground, preload } = (await import(
        /* webpackIgnore: true */
        imglyUrl
      )) as ImglyModule;
      await preload();
      setStatus("Removing background…");
      const blob = await removeBackground(f);
      const resultUrl = URL.createObjectURL(blob);
      setResult(resultUrl);
      setStatus("Done!");
    } catch {
      setError("Background removal failed. Please try a different image.");
    } finally {
      setRemoving(false);
    }
  }, []);

  const download = useCallback(() => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "removed-background.png";
    a.click();
  }, [result]);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-base font-medium text-gray-800">
          Click to choose an image
        </p>
        <p className="mt-1 text-sm text-gray-500">
          On-device AI · your image never leaves your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {(original || result) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {original && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 text-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Original</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={original} alt="Original" className="mx-auto max-h-64 object-contain" />
            </div>
          )}
          {removing ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-500">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" />
              {status}
            </div>
          ) : (
            result && (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-[repeating-conic-gradient(#eee_0%_25%,#fff_0%_50%)] bg-[length:16px_16px] p-3 text-center">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Result</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={result} alt="Background removed" className="mx-auto max-h-64 object-contain" />
                <button
                  type="button"
                  onClick={download}
                  className="mt-3 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  Download PNG
                </button>
              </div>
            )
          )}
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {status && !removing && <p className="text-center text-sm text-green-700">{status}</p>}
    </div>
  );
}
