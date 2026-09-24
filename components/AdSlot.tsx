"use client";

import { useEffect, useRef } from "react";
import { PUBLIC_ENV } from "@/lib/env.public";

const SLOT_MAP: Record<string, string> = {
  header: PUBLIC_ENV.ADSENSE_SLOT_HEADER,
  top: PUBLIC_ENV.ADSENSE_SLOT_TOP,
  middle: PUBLIC_ENV.ADSENSE_SLOT_MIDDLE,
  bottom: PUBLIC_ENV.ADSENSE_SLOT_BOTTOM,
  inline: PUBLIC_ENV.ADSENSE_SLOT_INLINE,
  footer: PUBLIC_ENV.ADSENSE_SLOT_FOOTER,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({
  slot,
  className = "",
  compact = false,
  label = "Advertisement",
}: {
  slot?: string;
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const slotId = slot ? SLOT_MAP[slot] ?? "" : "";
  const enabled = Boolean(PUBLIC_ENV.ADSENSE_ID && slotId);

  useEffect(() => {
    if (!enabled || !insRef.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An unavailable ad must never break the tool UI.
    }
  }, [enabled, slotId]);

  if (!enabled) return null;

  return (
    <div className={`w-full ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-gray-400">
        {label}
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: compact ? 60 : 90, height: "auto" }}
        data-ad-client={PUBLIC_ENV.ADSENSE_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
