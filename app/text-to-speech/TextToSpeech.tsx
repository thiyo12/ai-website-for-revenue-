"use client";

import { useEffect, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      setError("Your browser does not support speech synthesis.");
      return;
    }
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    const trimmed = text.trim();
    if (!supported || typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("Speech playback is not supported in this browser.");
      return;
    }
    if (!trimmed) {
      setError("Enter some text to speak.");
      return;
    }
    setError("");
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(trimmed);
    utterance.rate = rate;
    utterance.pitch = pitch;
    if (voice) {
      const selected = voices.find((v) => v.name === voice);
      if (selected) utterance.voice = selected;
    }
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setError("Your browser could not play this voice. Try another available voice.");
      }
    };
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };


  return (
    <div className="space-y-6">
      <PaywallModal />

      <div>
        <label
          htmlFor="tts-text"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Text to speak
        </label>
        <textarea
          id="tts-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Type or paste the text you want to hear…"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="tts-voice"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Voice
          </label>
          <select
            id="tts-voice"
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            <option value="">Default</option>
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-2 block text-sm font-medium text-gray-700">
            Rate
          </span>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-accent-600"
            />
            <span className="w-10 text-right text-sm font-semibold text-gray-700">
              {rate.toFixed(1)}x
            </span>
          </div>
        </div>
      </div>

      {voices.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Pitch
            </span>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={pitch}
                onChange={(e) => setPitch(Number(e.target.value))}
                className="w-full accent-accent-600"
              />
              <span className="w-10 text-right text-sm font-semibold text-gray-700">
                {pitch.toFixed(1)}x
              </span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <button
          type="button"
          onClick={speak}
          disabled={!supported}
          aria-label={speaking ? "Stop reading text" : "Listen to text"}
          className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {speaking ? "Stop" : "Listen"}
        </button>
        <p className="text-sm text-gray-500">
          Playback uses the voices installed on your device. MP3 export is not available;
          no text is sent to an external speech download service.
        </p>
      </div>
    </div>
  );
}
