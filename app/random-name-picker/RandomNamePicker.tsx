"use client";

import { useEffect, useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

export default function RandomNamePicker() {
  const [names, setNames] = useState("Alex\nJamie\nTaylor\nMorgan\nCasey");
  const [pool, setPool] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [spinText, setSpinText] = useState("Spin");
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [removeWinner, setRemoveWinner] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const renderRef = useRef<HTMLDivElement>(null);

  const parseNames = (s: string) => s.split("\n").map((n) => n.trim()).filter(Boolean);

  const syncPool = () => {
    const list = parseNames(names);
    setPool(list);
    setWinner(null);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const spin = () => {
    if (running) return;
    const current = pool.length ? pool : parseNames(names);
    if (!current.length) return;
    setWinner(null);
    setRunning(true);
    let ticks = 0;
    intervalRef.current = setInterval(() => {
      ticks++;
      setSpinText(current[Math.floor(Math.random() * current.length)]);
      if (ticks >= 18) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        const picked = current[Math.floor(Math.random() * current.length)];
        setSpinText(picked);
        setWinner(picked);
        setRunning(false);
        setHistory((h) => [picked, ...h]);
        if (removeWinner) {
          setPool(current.filter((n) => n !== picked));
        }
      }
    }, 80);
  };

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setRunning(false);
    setPool([]);
    setWinner(null);
    setHistory([]);
    setSpinText("Spin");
  };

  const download = () => exportElementAsPng(renderRef.current, "name-picker.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Your names</h2>
        <label className="mb-1 block text-sm font-medium text-gray-700">Enter names, one per line</label>
        <textarea
          value={names}
          onChange={(e) => setNames(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-mono"
        />
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={removeWinner} onChange={(e) => setRemoveWinner(e.target.checked)} className="h-4 w-4 accent-accent-600" />
            Remove each winner
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={syncPool} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Reload list</button>
            <button type="button" onClick={reset} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Reset</button>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500">Names remaining in pool: {pool.length || 0}</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div ref={renderRef} className="mx-auto flex w-full max-w-md flex-col items-center rounded-xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Random pick</p>
          <div
            className={`mt-3 flex h-32 w-full items-center justify-center rounded-2xl px-4 text-center text-2xl font-bold ${winner ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}`}
          >
            {spinText}
          </div>
          {winner && <p className="mt-3 text-sm font-semibold text-green-600">Winner!</p>}
          {history.length > 0 && (
            <div className="mt-4 w-full">
              <p className="text-xs font-semibold uppercase text-gray-400">Picks</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {history.map((h, i) => (
                  <span key={i} className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">{h}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={spin}
        disabled={running}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {running ? "Spinning…" : "Spin"}
      </button>

      <AdGate
        onAction={download}
        buttonLabel="Download Result"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
      >
        Download Result
      </AdGate>
    </div>
  );
}