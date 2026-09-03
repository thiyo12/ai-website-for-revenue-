"use client";

import { useEffect, useState } from "react";
import PaywallModal from "@/components/PaywallModal";
import AdGate from "@/components/AdGate";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState<string>("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setError("Your browser does not support speech synthesis.");
      return;
    }
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = () => {
    const trimmed = text.trim();
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
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  const download = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Enter some text to download.");
      return;
    }
    setError("");
    setDownloading(true);
    try {
      const url =
        "https://translate.google.com/translate_tts?ie=UTF-8&q=" +
        encodeURIComponent(trimmed.slice(0, 200)) +
        "&tl=en&client=tw-ob";
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "speech.mp3";
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
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
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={speak}
          className="flex-1 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          {speaking ? "Stop" : "Listen"}
        </button>
        <div className={downloading ? "pointer-events-none opacity-50" : ""}>
          <AdGate
            onAction={download}
            buttonLabel="Download"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {downloading ? "Generating…" : "Download MP3"}
          </AdGate>
        </div>
      </div>
    </div>
  );
}
