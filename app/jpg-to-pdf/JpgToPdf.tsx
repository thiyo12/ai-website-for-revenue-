"use client";

import { useCallback, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import PaywallModal from "@/components/PaywallModal";

interface ImgEntry {
  id: string;
  file: File;
  preview: string;
}

const PAGE_SIZES: Record<string, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
  "US Legal": [612, 1008],
};

export default function JpgToPdf() {
  const [images, setImages] = useState<ImgEntry[]>([]);
  const [pageSize, setPageSize] = useState<keyof typeof PAGE_SIZES>("A4");
  const [landscape, setLandscape] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addImages = useCallback((fileList: FileList | null) => {
    if (!fileList?.length) return;
    const imagesOnly = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (imagesOnly.length === 0) {
      setError("Please choose image files only.");
      return;
    }
    setError("");
    setSuccess("");
    const entries: ImgEntry[] = imagesOnly.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...entries]);
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addImages(e.target.files);
      e.target.value = "";
    },
    [addImages]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      addImages(e.dataTransfer.files);
    },
    [addImages]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const entry = prev.find((i) => i.id === id);
      if (entry) URL.revokeObjectURL(entry.preview);
      return prev.filter((i) => i.id !== id);
    });
    setSuccess("");
  }, []);

  const generate = useCallback(async () => {
    if (images.length === 0) {
      setError("Add at least one image.");
      return;
    }
    setError("");
    setSuccess("");
    setGenerating(true);
    try {
      const pdf = await PDFDocument.create();
      let [pw, ph] = PAGE_SIZES[pageSize];
      if (landscape) [pw, ph] = [ph, pw];

      for (const { file } of images) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8 = new Uint8Array(arrayBuffer);
        let img;
        if (file.type === "image/png") {
          img = await pdf.embedPng(uint8);
        } else {
          img = await pdf.embedJpg(uint8);
        }
        const page = pdf.addPage([pw, ph]);
        const scale = Math.min(pw / img.width, ph / img.height);
        const dw = img.width * scale;
        const dh = img.height * scale;
        page.drawImage(img, {
          x: (pw - dw) / 2,
          y: (ph - dh) / 2,
          width: dw,
          height: dh,
        });
      }

      const bytes = await pdf.save();
      const buffer = new ArrayBuffer(bytes.length);
      new Uint8Array(buffer).set(bytes);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setSuccess(`Created a PDF with ${images.length} page${images.length > 1 ? "s" : ""}.`);
    } catch {
      setError("Could not generate the PDF. Please check your images and try again.");
    } finally {
      setGenerating(false);
    }
  }, [images, pageSize, landscape]);

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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <p className="text-base font-medium text-gray-800">
          Drag & drop your JPG images here
        </p>
        <p className="mt-1 text-sm text-gray-500">
          or click to browse · multiple images supported
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="relative overflow-hidden rounded-lg border border-gray-200"
            >
              <img
                src={img.preview}
                alt={`Image ${i + 1}`}
                className="h-24 w-24 object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                aria-label={`Remove image ${i + 1}`}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="jpg-size" className="mb-1 block text-sm font-medium text-gray-700">
            Page size
          </label>
          <select
            id="jpg-size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as keyof typeof PAGE_SIZES)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            {Object.keys(PAGE_SIZES).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Orientation
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-3">
            <input
              type="checkbox"
              checked={landscape}
              onChange={(e) => setLandscape(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-accent-600 accent-accent-600"
            />
            <span className="text-sm text-gray-700">Landscape</span>
          </label>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
      )}

      <button
        type="button"
        onClick={generate}
        disabled={images.length === 0 || generating}
        className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
      >
        {generating ? "Generating…" : `Create PDF (${images.length || 0} images)`}
      </button>
    </div>
  );
}
