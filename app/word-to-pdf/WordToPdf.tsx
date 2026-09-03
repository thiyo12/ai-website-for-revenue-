"use client";

import { useCallback, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import AdGate from "@/components/AdGate";
import PaywallModal from "@/components/PaywallModal";

const MARGIN = 60;
const FONT_SIZE = 12;
const LINE_HEIGHT = 18;

async function readDocxText(file: File): Promise<string> {
  const u8 = new Uint8Array(await file.arrayBuffer());

  // --- Scan the ZIP central directory without a dependency ---
  // Try local file headers first (many docx are small single-stream).
  const entries: { name: string; compressed: Uint8Array; method: number }[] = [];

  let off = 0;
  while (off < u8.length - 4) {
    if (u8[off] === 0x50 && u8[off + 1] === 0x4b && u8[off + 2] === 0x03 && u8[off + 3] === 0x04) {
      const compMethod = ((u8[off + 8] | (u8[off + 9] << 8)) & 0xffff);
      const compSize = ((u8[off + 18] | (u8[off + 19] << 8) | (u8[off + 20] << 16) | (u8[off + 21] << 24)) >>> 0);
      const nameLen = ((u8[off + 26] | (u8[off + 27] << 8)) & 0xffff);
      const extraLen = ((u8[off + 28] | (u8[off + 29] << 8)) & 0xffff);
      const name = new TextDecoder().decode(u8.slice(off + 30, off + 30 + nameLen));
      const dataStart = off + 30 + nameLen + extraLen;
      const data = u8.slice(dataStart, dataStart + compSize);
      entries.push({ name, compressed: data, method: compMethod });
      off = dataStart + compSize;
      if (off > u8.length) break;
    } else {
      off++;
    }
  }

  const target = entries.find((e) => e.name === "word/document.xml");
  if (!target) throw new Error("not-a-docx");

  let raw: Uint8Array;
  if (target.method === 0) {
    raw = target.compressed;
  } else if (target.method === 8 && typeof DecompressionStream !== "undefined") {
    const ds = new DecompressionStream("deflate-raw");
    const stream = new Blob([target.compressed.slice()]).stream().pipeThrough(ds);
    raw = new Uint8Array(await new Response(stream).arrayBuffer());
  } else {
    throw new Error("no-inflate");
  }

  const xml = new TextDecoder().decode(raw);
  return xml;
}

function stripXml(xml: string): string {
  const cleaned = xml
    .replace(/<w:tab[^>]*\/>/g, "\t")
    .replace(/<w:br[^>]*\/>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'");
  return cleaned.replace(/\n{3,}/g, "\n\n");
}

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setError("");
    setSuccess("");
    if (!f.name.toLowerCase().endsWith(".docx")) {
      setError("Please choose a Word (.docx) file.");
      return;
    }
    setFile(f);
  }, []);

  const convert = useCallback(async () => {
    if (!file) return;
    setError("");
    setSuccess("");
    setConverting(true);
    try {
      const xml = await readDocxText(file);
      const text = stripXml(xml);
      if (!text.trim()) throw new Error("empty");

      const pdf = await PDFDocument.create();
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      const width = 612;
      const height = 792;
      let page = pdf.addPage([width, height]);
      let y = height - MARGIN;

      const flushLine = (line: string) => {
        if (y < MARGIN + LINE_HEIGHT) {
          page = pdf.addPage([width, height]);
          y = height - MARGIN;
        }
        page.drawText(line, { x: MARGIN, y, size: FONT_SIZE, font, color: rgb(0, 0, 0) });
        y -= LINE_HEIGHT;
      };

      const paragraphs = text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
      for (const para of paragraphs) {
        const words = para.split(/\s+/);
        let line = "";
        for (const word of words) {
          const test = line ? line + " " + word : word;
          if (font.widthOfTextAtSize(test, FONT_SIZE) > width - MARGIN * 2) {
            if (line) flushLine(line);
            let piece = "";
            for (const ch of word) {
              if (font.widthOfTextAtSize(piece + ch, FONT_SIZE) > width - MARGIN * 2) {
                flushLine(piece);
                piece = "";
              }
              piece += ch;
            }
            line = piece;
          } else {
            line = test;
          }
        }
        if (line) flushLine(line);
        y -= 8;
      }

      const bytes = await pdf.save();
      const buffer = new ArrayBuffer(bytes.length);
      new Uint8Array(buffer).set(bytes);
      const blob = new Blob([buffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.docx$/i, "") + ".pdf";
      a.click();
      URL.revokeObjectURL(url);
      setSuccess("Converted to PDF — download started automatically.");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message === "no-inflate"
          ? "This .docx file is compressed, and your browser doesn't support the decompression API needed to read it. Try updating your browser or using a recent version of Chrome, Firefox, Edge, or Safari."
          : "Could not convert this file. Please make sure it is a valid Word (.docx) document."
      );
    } finally {
      setConverting(false);
    }
  }, [file]);

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
          Click to choose a Word (.docx) file
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Your document is processed locally in your browser
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".docx"
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
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setFile(null);
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

      <div
        className={!file || converting ? "pointer-events-none opacity-50" : ""}
      >
        <AdGate
          onAction={convert}
          buttonLabel="Convert"
          className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
        >
          {converting ? "Converting…" : "Convert to PDF"}
        </AdGate>
      </div>
    </div>
  );
}
