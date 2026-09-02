"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Sound } from "@/lib/sound";

const PASSAGE =
  "The quick brown fox jumps over the lazy dog near the river bank. Technology continues to change the way we live, work, and connect with one another every single day.";

const BEST_KEY = "qt-typing-best";

type Status = "idle" | "typing" | "done";

export default function TypingSpeedTest() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const stored = Number(localStorage.getItem(BEST_KEY) || "0");
    setBest(stored);
  }, []);

  useEffect(() => {
    if (status === "typing") {
      const started = Date.now();
      timerRef.current = setInterval(() => {
        setElapsed((Date.now() - started) / 1000);
      }, 100);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [status]);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setInput("");
    setStatus("idle");
    setElapsed(0);
    Sound.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    const delta = v.length - input.length;
    if (delta === 1 && v.length - 1 < PASSAGE.length) {
      if (v[v.length - 1] === PASSAGE[v.length - 1]) Sound.keypress();
      else Sound.wrong();
    }
    setInput(v);
    if (status === "idle" && v.length === 1) {
      setStatus("typing");
    }
  };

  const endTest = () => {
    if (status !== "typing") return;
    if (timerRef.current) clearInterval(timerRef.current);
    const seconds = Math.max(elapsed, 0.1);
    setElapsed(seconds);
    setStatus("done");
    Sound.win();
  };

  const words = useMemo(() => {
    const correct = input
      .split("")
      .filter((c, i) => c === PASSAGE[i])
      .join("");
    return correct.trim().split(/\s+/).filter(Boolean).length;
  }, [input]);

  const accuracy = useMemo(() => {
    if (!input.length) return 100;
    const total = input.length;
    const correctChars = input.split("").filter((c, i) => c === PASSAGE[i]).length;
    return Math.round((correctChars / total) * 100);
  }, [input]);

  const wpm = useMemo(() => {
    if (elapsed <= 0) return 0;
    const minutes = elapsed / 60;
    return Math.round(words / minutes);
  }, [words, elapsed]);

  useEffect(() => {
    if (status === "done") {
      setBest((prev) => {
        const next = Math.max(prev, wpm);
        localStorage.setItem(BEST_KEY, String(next));
        return next;
      });
    }
  }, [status, wpm]);

  // Character color rendering: correct = pop, incorrect = red
  const renderText = () => {
    return PASSAGE.split("").map((char, i) => {
      let cls = "text-gray-400";
      if (i < input.length) {
        cls = input[i] === char ? "text-gray-900" : "bg-red-200 text-red-700";
      } else if (i === input.length) {
        cls = "bg-accent-100 text-accent-700";
      }
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <p className="text-lg leading-relaxed">{renderText()}</p>
      </div>

      {status === "done" ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-6 text-center">
          <p className="text-3xl font-bold text-accent-700">{wpm} WPM</p>
          <div className="grid w-full max-w-sm grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-white p-3">
              <p className="text-sm text-gray-500">Accuracy</p>
              <p className="text-lg font-bold text-gray-900">{accuracy}%</p>
            </div>
            <div className="rounded-lg bg-white p-3">
              <p className="text-sm text-gray-500">Words</p>
              <p className="text-lg font-bold text-gray-900">{words}</p>
            </div>
            <div className="rounded-lg bg-white p-3">
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-lg font-bold text-gray-900">{elapsed.toFixed(1)}s</p>
            </div>
          </div>
          {best > 0 && (
            <p className="text-sm text-gray-600">
              Personal best: <span className="font-bold text-gray-900">{best} WPM</span>
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(`⌨️ I type ${wpm} WPM with ${accuracy}% accuracy!`)}
              className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
            >
              Share your score
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-accent-200 px-5 py-2.5 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            value={input}
            onChange={handleChange}
            onPaste={(e) => e.preventDefault()}
            placeholder={status === "idle" ? "Type the text above to begin…" : "Keep typing…"}
            className="h-32 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {status === "idle" ? "Start typing to begin the timer" : `Elapsed: ${elapsed.toFixed(1)}s`}
            </p>
            <div className="flex gap-3">
              {status === "typing" && (
                <button
                  type="button"
                  onClick={endTest}
                  className="rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
                >
                  Finish
                </button>
              )}
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
