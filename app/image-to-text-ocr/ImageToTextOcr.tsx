"use client";

import { useCallback, useRef, useState } from "react";
import { createWorker } from "tesseract.js";
import AdGate from "@/components/AdGate";
import PaywallModal from "@/components/PaywallModal";

export default function ImageToTextOcr() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const recognize = useCallback(async (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setImage(objectUrl);
    setRecognizing(true);
    setText("");
    setStatus("Loading the OCR engine…");
    let worker: Awaited<ReturnType<typeof createWorker>> | null = null;
    try {
      worker = await createWorker("eng");
      setStatus("Reading your image…");
      const { data } = await worker.recognize(objectUrl);
      setText(data.text.trim());
      setStatus("");
      if (!data.text.trim()) {
        setStatus("No text detected. Try a clearer, higher-contrast image.");
      }
    } catch {
      setStatus("Recognition failed. Please try a different image.");
    } finally {
      await worker?.terminate();
      setRecognizing(false);
    }
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      e.target.value = "";
      if (f) recognize(f);
    },
    [recognize]
  );

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          Photos, screenshots, and scans · processed in your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {image && (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Uploaded" className="mx-auto max-h-64 rounded-lg object-contain" />
        </div>
      )}

      {status && (
        <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">{status}</p>
      )}

      {recognizing && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-600 border-t-transparent" />
          Recognizing…
        </div>
      )}

      {text && (
        <div className="space-y-3">
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-4">
            <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-900">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={copy}
              className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
            <AdGate
              onAction={download}
              buttonLabel="Download"
              className="rounded-lg border border-accent-200 px-5 py-2.5 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
            >
              Download .txt
            </AdGate>
          </div>
        </div>
      )}
    </div>
  );
}
