"use client";

import { useCallback, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Document, Packer, Paragraph, TextRun } from "docx";
import PaywallModal from "@/components/PaywallModal";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setError("");
    setSuccess("");
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setError("Please choose a PDF file.");
      return;
    }
    setFile(f);
    try {
      const doc = await pdfjsLib.getDocument({ data: new Uint8Array(await f.arrayBuffer()) }).promise;
      setPageCount(doc.numPages);
      doc.destroy();
    } catch {
      setPageCount(0);
      setError("Could not read this PDF. Please try another file.");
    }
  }, []);

  const convert = useCallback(async () => {
    if (!file || pageCount === 0) return;
    setError("");
    setSuccess("");
    setConverting(true);
    try {
      const doc = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const paragraphs: Paragraph[] = [];

      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const rawLines: string[] = [];
        let current = "";
        for (const item of textContent.items as { str?: string }[]) {
          if (!item.str) continue;
          current += item.str;
          // Heuristic: items that end a line (newline) break into separate paragraphs
          if (item.str.endsWith("\n")) {
            rawLines.push(current.trim());
            current = "";
          }
        }
        if (current.trim()) rawLines.push(current.trim());
        page.cleanup();

        paragraphs.push(
          new Paragraph({ children: [new TextRun({ text: `Page ${i}`, bold: true, size: 28, color: "4F46E5" })] })
        );
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: "" })] }));
        for (const line of rawLines) {
          if (line) {
            paragraphs.push(new Paragraph({ children: [new TextRun({ text: line })] }));
          }
        }
        paragraphs.push(new Paragraph({ children: [new TextRun({ text: "" })] }));
      }

      doc.destroy();

      const wordDoc = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      });

      const buffer = await Packer.toBlob(wordDoc);
      const url = URL.createObjectURL(buffer);
      const a = document.createElement("a");
      const baseName = file.name.replace(/\.pdf$/i, "");
      a.href = url;
      a.download = `${baseName}.docx`;
      a.click();
      URL.revokeObjectURL(url);

      setSuccess(`Converted ${pageCount} page${pageCount > 1 ? "s" : ""} to Word (.docx).`);
    } catch (err) {
      setError("Conversion failed. Please try again.");
    } finally {
      setConverting(false);
    }
  }, [file, pageCount]);

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
          Click to choose a PDF file
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Your PDF is processed locally in your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {file && (
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-800" title={file.name}>
              {file.name}
            </p>
            <p className="text-xs text-gray-500">
              {pageCount > 0 ? `${pageCount} page${pageCount > 1 ? "s" : ""}` : "Reading…"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFile(null);
              setPageCount(0);
              setSuccess("");
            }}
            className="text-sm font-medium text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      )}
      {success && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
      )}

      <button
        type="button"
        onClick={convert}
        disabled={!file || pageCount === 0 || converting}
        className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
      >
        {converting ? "Converting…" : "Convert to Word"}
      </button>

      <p className="text-xs text-gray-500">
        Tip: For scanned or image-only PDFs, first use the Image to Text (OCR) tool.
      </p>
    </div>
  );
}
