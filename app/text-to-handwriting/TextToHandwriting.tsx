"use client";

import { useRef, useState } from "react";
import { Caveat, Dancing_Script, Pacifico } from "next/font/google";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";
import { exportElementAsPdf } from "@/lib/exportPdf";
import Link from "next/link";

type PaperType = "lined" | "grid" | "plain";

const caveat = Caveat({ subsets: ["latin"], weight: "600" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const FONTS: Record<string, string> = {
  Caveat: caveat.style.fontFamily,
  DancingScript: dancing.style.fontFamily,
  Pacifico: pacifico.style.fontFamily,
};

export default function TextToHandwriting() {
  const [text, setText] = useState("Dear diary,\n\nToday I built a handwriting tool that runs entirely in the browser. It is fast, private, and fun to use.\n\nBest,\nAlex");
  const [font, setFont] = useState("Caveat");
  const [paper, setPaper] = useState<PaperType>("lined");
  const [ink, setInk] = useState("#1f2937");
  const [size, setSize] = useState(22);
  const renderRef = useRef<HTMLDivElement>(null);

  const downloadPng = () => exportElementAsPng(renderRef.current, "handwriting.png", 2);
  const downloadPdf = () => exportElementAsPdf(renderRef.current, "handwriting.pdf", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Your text</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
        />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Handwriting font</label>
            <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
              <option value="Caveat">Caveat</option>
              <option value="DancingScript">Dancing Script</option>
              <option value="Pacifico">Pacifico</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Paper style</label>
            <select value={paper} onChange={(e) => setPaper(e.target.value as PaperType)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
              <option value="lined">Lined</option>
              <option value="grid">Grid</option>
              <option value="plain">Plain</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Ink color</label>
            <input type="color" value={ink} onChange={(e) => setInk(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Text size: {size}px</label>
            <input type="range" min={16} max={40} value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div
          ref={renderRef}
          className={`mx-auto w-full max-w-[800px] rounded-lg p-8 shadow-sm ${paper === "plain" ? "bg-white" : "bg-white"}`}
          style={paper === "lined" ? { backgroundImage: "repeating-linear-gradient(transparent, transparent 32px, #dbe3f0 33px)" } : paper === "grid" ? { backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)", backgroundSize: "28px 28px" } : {}}
        >
          <p
            className="whitespace-pre-wrap leading-[1.45]"
            style={{ fontFamily: `${FONTS[font]}, cursive`, color: ink, fontSize: size }}
          >
            {text || " "}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-gray-500">
          Converted with QuicTools —{" "}
          <Link href="/terms-of-service" className="font-medium text-accent-600 underline">Terms of Service</Link>.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
          <AdGate
            onAction={downloadPng}
            buttonLabel="Download PNG"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
          >
            Download PNG
          </AdGate>
          <AdGate
            onAction={downloadPdf}
            buttonLabel="Download PDF"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Download PDF
          </AdGate>
        </div>
      </div>
    </div>
  );
}