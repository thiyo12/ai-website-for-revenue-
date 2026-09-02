"use client";

import { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

function generatePalette(): string[] {
  const base = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 20);
  const colors = [0, 30, 60, 150, 210].map((offset) => {
    const hue = (base + offset) % 360;
    const l = 45 + Math.floor(Math.random() * 10);
    return hslToHex(hue, s, l);
  });
  return colors;
}

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = useState<string[]>(() => generatePalette());
  const [copied, setCopied] = useState<number | null>(null);

  const regenerate = () => setPalette(generatePalette());

  const copy = async (color: string, index: number) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(palette.join(", "));
      setCopied(-1);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {palette.map((color, i) => (
          <button
            key={color}
            onClick={() => copy(color, i)}
            className="group overflow-hidden rounded-xl border border-gray-200"
            title="Click to copy"
          >
            <div
              className="h-24 w-full"
              style={{ backgroundColor: color }}
            />
            <div className="flex items-center justify-between bg-white px-3 py-2">
              <span className="font-mono text-xs uppercase text-gray-800">
                {color}
              </span>
              {copied === i && (
                <span className="text-[10px] font-semibold text-accent-600">
                  Copied!
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={regenerate}
          className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Generate new palette
        </button>
        <button
          onClick={copyAll}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          {copied === -1 ? "Copied all!" : "Copy all colors"}
        </button>
      </div>
    </div>
  );
}
