"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";
import { exportElementAsPng } from "@/lib/exportImage";

const STORAGE_KEY = "quictools.countdown";

interface State {
  name: string;
  target: string;
  color: string;
  message: string;
}

function readFromLocation(): Partial<State> | null {
  if (typeof window === "undefined") return null;
  try {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("target");
    if (!t) return null;
    return {
      name: p.get("name") || "Countdown",
      target: t,
      color: p.get("color") || "#2563eb",
      message: p.get("message") || "Time is up!",
    };
  } catch {
    return null;
  }
}

export default function CountdownTimer() {
  const [name, setName] = useState("Product Launch");
  const [target, setTarget] = useState(
    () => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      const p = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      return p;
    }
  );
  const [color, setColor] = useState("#2563eb");
  const [message, setMessage] = useState("It's here! 🎉");
  const [now, setNow] = useState(Date.now());
  const [loaded, setLoaded] = useState(false);
  const renderRef = useRef<HTMLDivElement>(null);

  // Restore from URL or localStorage once.
  useEffect(() => {
    if (loaded) return;
    const fromUrl = readFromLocation();
    if (fromUrl?.target) {
      setName(fromUrl.name || name);
      setTarget(fromUrl.target);
      setColor(fromUrl.color || color);
      setMessage(fromUrl.message || message);
    } else {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw) as State;
          if (s.target) {
            setName(s.name); setTarget(s.target); setColor(s.color); setMessage(s.message);
          }
        }
      } catch { /* ignore */ }
    }
    setLoaded(true);
  }, [loaded, name, color, message]);

  // Save to localStorage on change.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, target, color, message }));
    } catch { /* ignore */ }
  }, [name, target, color, message, loaded]);

  // Tick each second.
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = useMemo(() => {
    const t = new Date(target).getTime();
    return Math.max(0, t - now);
  }, [target, now]);

  const expired = diff <= 0;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = window.location.origin + window.location.pathname;
    const p = new URLSearchParams();
    p.set("name", name);
    p.set("target", target);
    p.set("color", color);
    p.set("message", message);
    return `${base}?${p.toString()}`;
  }, [name, target, color, message]);

  const copyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Share link copied!");
    } catch {
      window.prompt("Copy this share link:", shareUrl);
    }
  };

  const download = () => exportElementAsPng(renderRef.current, "countdown.png", 2);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">Event details</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Event name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Target date & time</label>
            <input type="datetime-local" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Accent color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-full rounded-lg border border-gray-300" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Completion message</label>
            <input value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div
          ref={renderRef}
          className="mx-auto w-full max-w-md rounded-xl bg-white p-6 text-center shadow-sm"
        >
          <p className="text-lg font-bold text-gray-900">{name}</p>
          {expired ? (
            <p className="mt-4 text-2xl font-bold" style={{ color }}>{message}</p>
          ) : (
            <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
              {[
                { v: days, l: "Days" },
                { v: hours, l: "Hours" },
                { v: mins, l: "Minutes" },
                { v: secs, l: "Seconds" },
              ].map((b) => (
                <div key={b.l} className="flex-1 rounded-xl p-2 text-white" style={{ background: color }}>
                  <p className="text-2xl font-bold tabular-nums sm:text-3xl">{String(b.v).padStart(2, "0")}</p>
                  <p className="text-[10px] uppercase tracking-wide opacity-90">{b.l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">Share & export</h2>
        <p className="mb-3 text-sm text-gray-600">
          Your timer is saved locally in your browser only. Share it with anyone using the link below.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input readOnly value={shareUrl} className="w-full flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-xs" />
          <button type="button" onClick={copyShare} className="shrink-0 rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-700">
            Copy share link
          </button>
        </div>
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