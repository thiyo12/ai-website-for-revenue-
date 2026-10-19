"use client";

import { useCallback, useRef, useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import AdGate from "@/components/AdGate";
import PaywallModal from "@/components/PaywallModal";

const MARGIN = 60;
const FONT_SIZE = 12;
const LINE_HEIGHT = 18;

const MAX_DOCX_BYTES = 25 * 1024 * 1024;
const MAX_DOCUMENT_XML_BYTES = 12 * 1024 * 1024;

async function readDocxText(file: File): Promise<string> {
  if (file.size > MAX_DOCX_BYTES) throw new Error("too-large");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const u16 = (at: number) => view.getUint16(at, true);
  const u32 = (at: number) => view.getUint32(at, true);

  // Use the ZIP *central directory*. Reading only local file headers fails
  // for valid Word files that store their sizes in trailing data descriptors.
  const firstEOCD = Math.max(0, bytes.length - 65_557);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= firstEOCD; i--) {
    if (u32(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error("not-a-docx");
  const count = u16(eocd + 10);
  const directorySize = u32(eocd + 12);
  const directoryStart = u32(eocd + 16);
  if (count === 0xffff || directoryStart === 0xffffffff ||
      directorySize === 0xffffffff ||
      directoryStart + directorySize > eocd) throw new Error("not-a-docx");

  let pos = directoryStart;
  let compressed: Uint8Array | null = null;
  let method = 0;
  let expectedBytes = 0;
  for (let entry = 0; entry < count; entry++) {
    if (pos + 46 > bytes.length || u32(pos) !== 0x02014b50) throw new Error("not-a-docx");
    const flags = u16(pos + 8);
    const itemMethod = u16(pos + 10);
    const compSize = u32(pos + 20);
    const rawSize = u32(pos + 24);
    const nameLength = u16(pos + 28);
    const extraLength = u16(pos + 30);
    const commentLength = u16(pos + 32);
    const localOffset = u32(pos + 42);
    const next = pos + 46 + nameLength + extraLength + commentLength;
    if (next > bytes.length || next > directoryStart + directorySize) throw new Error("not-a-docx");
    const name = new TextDecoder().decode(bytes.subarray(pos + 46, pos + 46 + nameLength));
    pos = next;
    if (name !== "word/document.xml") continue;
    if ((flags & 1) || compSize > MAX_DOCX_BYTES || rawSize > MAX_DOCUMENT_XML_BYTES ||
        localOffset + 30 > bytes.length || u32(localOffset) !== 0x04034b50) {
      throw new Error("not-a-docx");
    }
    const localNameLength = u16(localOffset + 26);
    const localExtraLength = u16(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    if (dataStart + compSize > bytes.length) throw new Error("not-a-docx");
    compressed = bytes.subarray(dataStart, dataStart + compSize);
    method = itemMethod;
    expectedBytes = rawSize;
    break;
  }
  if (!compressed) throw new Error("not-a-docx");

  let stream: ReadableStream<Uint8Array>;
  if (method === 0) {
    stream = new Blob([compressed.slice()]).stream();
  } else if (method === 8 && typeof DecompressionStream !== "undefined") {
    stream = new Blob([compressed.slice()]).stream()
      .pipeThrough(new DecompressionStream("deflate-raw"));
  } else {
    throw new Error("no-inflate");
  }

  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_DOCUMENT_XML_BYTES) {
        await reader.cancel();
        throw new Error("too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  if (total !== expectedBytes) throw new Error("not-a-docx");
  const xml = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    xml.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(xml);
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
    if (f.size > MAX_DOCX_BYTES) {
      setFile(null);
      setError("Please choose a Word file smaller than 25 MB.");
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
          ? "Your browser cannot decompress this Word document. Try a recent version of Chrome, Firefox, Edge or Safari."
          : err instanceof Error && err.message === "too-large"
            ? "This document is too large to convert safely. Use a file smaller than 25 MB."
            : "Could not convert the text in this Word document. Complex formatting or unsupported characters may require a desktop converter."
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
