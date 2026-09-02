"use client";

import { useState } from "react";
import { Sound } from "@/lib/sound";

export default function MuteButton() {
  const [muted, setMuted] = useState(Sound.muted);

  const toggle = () => {
    const next = Sound.toggle();
    setMuted(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      title={muted ? "Unmute sounds" : "Mute sounds"}
      aria-pressed={muted}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
    >
      <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
      <span className="text-xs">{muted ? "Sound off" : "Sound on"}</span>
    </button>
  );
}
