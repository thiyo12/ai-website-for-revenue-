"use client";

import { useEffect, useRef, useState } from "react";
import AdSlot from "./AdSlot";

export default function AdGate({
  onAction,
  seconds = 5,
  buttonLabel = "Continue",
  className = "",
  children,
}: {
  onAction: () => void;
  seconds?: number;
  buttonLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [remaining, setRemaining] = useState(seconds);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function openGate() {
    setOpen(true);
    setRemaining(seconds);
    timerRef.current = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  function closeGate() {
    if (timerRef.current) clearInterval(timerRef.current);
    setOpen(false);
  }

  function proceed() {
    if (remaining > 0) return;
    closeGate();
    onAction();
  }

  return (
    <>
      <button type="button" onClick={openGate} className={className}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900">
              Please wait while the ad finishes
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your {buttonLabel.toLowerCase()} starts in {remaining}s.
            </p>

            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
              <AdSlot slot="inline" compact label="Advertisement" />
            </div>

            <button
              type="button"
              onClick={proceed}
              disabled={remaining > 0}
              className={`mt-5 w-full rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
                remaining > 0
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "bg-accent-600 text-white hover:bg-accent-700"
              }`}
            >
              {remaining > 0 ? `Wait ${remaining}s…` : buttonLabel}
            </button>

            <button
              type="button"
              onClick={closeGate}
              className="mt-3 text-xs text-gray-400 underline hover:text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}