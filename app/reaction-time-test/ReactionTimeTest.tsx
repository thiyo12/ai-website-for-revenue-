"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sound } from "@/lib/sound";

type Phase = "idle" | "waiting" | "ready" | "result";

export default function ReactionTimeTest() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [results, setResults] = useState<number[]>([]);
  const [timing, setTiming] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPhase("idle");
    setTiming(0);
  }, []);

  const begin = useCallback(() => {
    setPhase("waiting");
    setTiming(0);
    const delay = 1000 + Math.random() * 3500;
    timeoutRef.current = setTimeout(() => {
      setPhase("ready");
      startTimeRef.current = performance.now();
      Sound.go();
    }, delay);
  }, []);

  const saveResult = useCallback((ms: number) => {
    setResults((prev) => {
      const next = [...prev, ms];
      return next.slice(-5);
    });
  }, []);

  const handleClick = useCallback(() => {
    if (phase === "idle") {
      setPhase("waiting");
      begin();
      return;
    }
    if (phase === "waiting") {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setTiming(0);
      setPhase("result");
      Sound.wrong();
      return;
    }
    if (phase === "ready") {
      const ms = Math.round(performance.now() - startTimeRef.current);
      setTiming(ms);
      saveResult(ms);
      setPhase("result");
      Sound.correct();
      return;
    }
    // result
    begin();
    Sound.click();
  }, [phase, begin, saveResult]);

  const average = results.length
    ? Math.round(results.reduce((a, b) => a + b, 0) / results.length)
    : 0;
  const best = results.length ? Math.min(...results) : 0;

  let background = "bg-accent-600 text-white";
  let label = "Reaction Time Test";
  let sub = "Click to start, then click the moment the screen turns green.";

  if (phase === "waiting") {
    background = "bg-red-500 text-white";
    label = "Wait for green…";
    sub = "Don't click yet. Wait until the screen turns green.";
  } else if (phase === "ready") {
    background = "bg-green-500 text-white";
    label = "Click now!";
    sub = "";
  } else if (phase === "result") {
    background = "bg-indigo-600 text-white";
    label = timing > 0 ? `${timing} ms` : "Too soon!";
    sub = "Click to try again";
  }

  // Compute a rating for display alongside results
  const rating = timing > 0 ? (timing < 180 ? "Excellent" : timing < 220 ? "Great" : timing < 300 ? "Average" : "Slow") : "";

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={handleClick}
        className={`flex h-72 w-full flex-col items-center justify-center rounded-2xl p-6 text-center transition-colors ${background}`}
      >
        <span className="text-2xl font-bold">{label}</span>
        {sub && <span className="mt-2 text-sm opacity-90">{sub}</span>}
        {rating && (
          <span className="mt-3 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
            {rating}
          </span>
        )}
      </button>

      {results.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Your results</h3>
            <button type="button" onClick={reset} className="text-sm font-medium text-accent-600 hover:underline">
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {results.map((r, i) => (
              <span
                key={i}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  r < 200 ? "bg-green-100 text-green-700" : r < 300 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                }`}
              >
                {r} ms
              </span>
            ))}
          </div>
          {results.length >= 1 && (
            <div className="flex flex-wrap gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">Best</p>
                <p className="text-xl font-bold text-gray-900">{best} ms</p>
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">Average</p>
                <p className="text-xl font-bold text-gray-900">{average} ms</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(`⚡ My reaction time: ${best} ms (best of ${results.length})`)}
              className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Share your best
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        Average human reaction is around 250 ms. Take 5 tries for a reliable result.
      </p>
    </div>
  );
}
