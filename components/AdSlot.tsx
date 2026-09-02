"use client";

import { useEffect, useRef } from "react";
import { ENV } from "@/lib/env";

const SLOT_MAP: Record<string, string> = {
  header: ENV.ADSENSE_SLOT_HEADER,
  top: ENV.ADSENSE_SLOT_TOP,
  middle: ENV.ADSENSE_SLOT_MIDDLE,
  bottom: ENV.ADSENSE_SLOT_BOTTOM,
  inline: ENV.ADSENSE_SLOT_INLINE,
  footer: ENV.ADSENSE_SLOT_FOOTER,
};

function loadAdSenseScript() {
  if (typeof window === "undefined") return;
  if (document.getElementById("adsense-script") || !ENV.ADSENSE_ID) return;
  if (window.adsbygoogle) return;
  const s = document.createElement("script");
  s.id = "adsense-script";
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ENV.ADSENSE_ID}`;
  s.crossOrigin = "anonymous";
  document.head.appendChild(s);
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({
  slot,
  className = "",
  compact = false,
  label,
}: {
  slot?: string;
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);
  const slotId = slot ? SLOT_MAP[slot] ?? "" : "";
  const enabled = Boolean(ENV.ADSENSE_ID && slotId);

  useEffect(() => {
    if (!enabled) return;
    loadAdSenseScript();
    try {
      if (window.adsbygoogle && insRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      /* AdSense may throw if an ad fails to load; swallow to avoid breaking the UI */
    }
  }, [enabled, slotId]);

  if (enabled) {
    return (
      <div className={`w-full ${className}`} aria-hidden="true">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: "block", minHeight: compact ? 60 : 90, height: "auto" }}
          data-ad-client={ENV.ADSENSE_ID}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Placeholder shown during development / until AdSense is configured.
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <div
        className={`mx-auto flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-center ${
          compact ? "px-4 py-2" : "px-4 py-3"
        }`}
      >
        <span className="text-xs uppercase tracking-wide text-gray-400">
          {label ?? "Advertisement"}
          {slot && label ? ` - ${slot}` : ""}
        </span>
      </div>
    </div>
  );
}
