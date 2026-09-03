"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Caveat, Dancing_Script, Pacifico } from "next/font/google";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";

const caveat = Caveat({ subsets: ["latin"], weight: "600" });
const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

type Mode = "draw" | "type";

const FONT_STYLES: Record<string, string> = {
  Caveat: caveat.style.fontFamily,
  DancingScript: dancing.style.fontFamily,
  Pacifico: pacifico.style.fontFamily,
};

export default function SignatureGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("draw");
  const [color, setColor] = useState("#1f2937");
  const [width, setWidth] = useState(4);
  const [font, setFont] = useState("Caveat");
  const [typedText, setTypedText] = useState("Your Signature");
  const [canvasW, setCanvasW] = useState(520);
  const [canvasH, setCanvasH] = useState(200);

  const drawing = useRef(false);

  const clear = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
  }, []);

  const getPos = (e: React.PointerEvent) => {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    const scaleX = c.width / rect.width;
    const scaleY = c.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const start = (e: React.PointerEvent) => {
    if (mode !== "draw") return;
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    drawing.current = true;
    c.setPointerCapture(e.pointerId);
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current || mode !== "draw") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const end = () => {
    drawing.current = false;
  };

  const renderTyped = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = color;
    ctx.font = `${c.height * 0.55}px ${FONT_STYLES[font]}, cursive`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedText || " ", c.width / 2, c.height / 2);
  }, [color, font, typedText]);

  useEffect(() => {
    if (mode === "type") {
      // wait for font to load then render
      requestAnimationFrame(() => renderTyped());
    }
  }, [mode, renderTyped]);

  const download = () => {
    const c = canvasRef.current;
    if (!c) return;
    if (mode === "type") renderTyped();
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "signature.png";
    a.click();
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("draw")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "draw" ? "bg-accent-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Draw
          </button>
          <button
            type="button"
            onClick={() => setMode("type")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "type" ? "bg-accent-600 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Type
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Pen color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
          {mode === "draw" ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Pen width</label>
              <input type="range" min={2} max={14} value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="w-full" />
            </div>
          ) : (
            <>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Font style</label>
                <select value={font} onChange={(e) => setFont(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm">
                  <option value="Caveat">Caveat</option>
                  <option value="DancingScript">Dancing Script</option>
                  <option value="Pacifico">Pacifico</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Your name</label>
                <input value={typedText} onChange={(e) => setTypedText(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
              </div>
            </>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Width</label>
            <input type="range" min={300} max={800} step={20} value={canvasW} onChange={(e) => { const v = parseInt(e.target.value); setCanvasW(v); }} className="w-full" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Height</label>
            <input type="range" min={120} max={320} step={20} value={canvasH} onChange={(e) => { const v = parseInt(e.target.value); setCanvasH(v); }} className="w-full" />
          </div>
          <div className="flex items-end">
            <button type="button" onClick={clear} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <canvas
          ref={canvasRef}
          width={canvasW}
          height={canvasH}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          style={{
            touchAction: "none",
            width: "100%",
            maxWidth: canvasW,
            height: "auto",
            background: "white",
            borderRadius: "12px",
            border: "1px dashed #d1d5db",
            cursor: mode === "draw" ? "crosshair" : "default",
          }}
          className="mx-auto block"
        />
        <p className="mt-2 text-center text-xs text-gray-400">
          {mode === "draw" ? "Draw your signature here" : "Your typed signature appears here"}
        </p>
      </div>

      <AdGate
        onAction={download}
        buttonLabel="Download PNG"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Download PNG
      </AdGate>
    </div>
  );
}