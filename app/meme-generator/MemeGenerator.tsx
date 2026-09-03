"use client";

import { useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

const TEMPLATES: { id: string; label: string; bg: string; emoji: string }[] = [
  { id: "t1", label: "Surprised", bg: "linear-gradient(135deg,#60a5fa,#3b82f6)", emoji: "😮" },
  { id: "t2", label: "Laughing", bg: "linear-gradient(135deg,#fbbf24,#f59e0b)", emoji: "😂" },
  { id: "t3", label: "Cool", bg: "linear-gradient(135deg,#34d399,#10b981)", emoji: "😎" },
  { id: "t4", label: "Crying", bg: "linear-gradient(135deg,#f472b6,#ec4899)", emoji: "😭" },
  { id: "t5", label: "Thinking", bg: "linear-gradient(135deg,#a78bfa,#8b5cf6)", emoji: "🤔" },
  { id: "t6", label: "Wow", bg: "linear-gradient(135deg,#f87171,#ef4444)", emoji: "🤯" },
];

export default function MemeGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<string>("t1");
  const [top, setTop] = useState("WHEN THE TOOL IS FREE");
  const [bottom, setBottom] = useState("AND WORKS IN YOUR BROWSER");
  const [textColor, setTextColor] = useState("#ffffff");
  const [useTemplate, setUseTemplate] = useState(false);
  const renderRef = useRef<HTMLDivElement>(null);

  const readFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setImage(r.result as string);
    r.readAsDataURL(f);
  };

  const activeTemplate = TEMPLATES.find((t) => t.id === template) || TEMPLATES[0];

  const download = () => exportElementAsPng(renderRef.current, "meme.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Meme image</h2>
        <div className="mb-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">Upload your own image</label>
          <input type="file" accept="image/*" onChange={readFile} className="text-sm" />
        </div>
        <div className="mb-1 text-sm font-medium text-gray-700">Or use a built-in template</div>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => { setTemplate(t.id); setUseTemplate(true); setImage(null); }}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${template === t.id && useTemplate ? "border-accent-600 bg-accent-50 text-accent-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              <span style={{ background: t.bg }} className="inline-flex h-8 w-8 items-center justify-center rounded-md text-lg">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Captions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Top text</label>
            <input value={top} onChange={(e) => setTop(e.target.value.toUpperCase())} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Bottom text</label>
            <input value={bottom} onChange={(e) => setBottom(e.target.value.toUpperCase())} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Text color</label>
            <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div
          ref={renderRef}
          className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-lg"
          style={{
            aspectRatio: "4/3",
            backgroundColor: "#000",
            backgroundImage: image ? `url(${image})` : activeTemplate.bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!image && useTemplate && (
            <div className="absolute inset-0 flex items-center justify-center text-7xl">
              {activeTemplate.emoji}
            </div>
          )}
          <p
            className="absolute left-0 right-0 top-2 px-3 text-center font-black uppercase leading-tight"
            style={{
              color: textColor,
              fontSize: "clamp(20px, 5vw, 40px)",
              fontFamily: "Impact, 'Arial Black', sans-serif",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 6px #000",
              WebkitTextStroke: "1px #000",
              wordBreak: "break-word",
            }}
          >
            {top}
          </p>
          <p
            className="absolute bottom-2 left-0 right-0 px-3 text-center font-black uppercase leading-tight"
            style={{
              color: textColor,
              fontSize: "clamp(20px, 5vw, 40px)",
              fontFamily: "Impact, 'Arial Black', sans-serif",
              textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 6px #000",
              WebkitTextStroke: "1px #000",
              wordBreak: "break-word",
            }}
          >
            {bottom}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Your image and captions stay in your browser. Nothing is uploaded or
        stored.
      </p>

      <AdGate
        onAction={download}
        buttonLabel="Download Meme"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Download Meme
      </AdGate>
    </div>
  );
}