"use client";

import { useMemo, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

interface Stats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
}

function analyze(text: string): Stats {
  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).filter(Boolean).length;
  const characters = text.length;
  const charactersNoSpaces = [...text].filter((c) => !/\s/.test(c)).length;
  const sentences = trimmed === "" ? 0 : (trimmed.match(/[.!?…]+(\s|$)/g) ?? []).length;
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim() !== "").length;
  const readingMinutes = words / 200;

  return {
    words,
    characters,
    charactersNoSpaces,
    sentences,
    paragraphs,
    readingMinutes,
  };
}

function formatReadingTime(minutes: number): string {
  if (minutes === 0) return "0 min read";
  if (minutes < 1) return "Less than a minute read";
  if (minutes < 60) return `${Math.ceil(minutes)} min read`;
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return m > 0 ? `${h} hr ${m} min read` : `${h} hr read`;
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => analyze(text), [text]);

  const cards = [
    { label: "Words", value: stats.words.toLocaleString() },
    { label: "Characters", value: stats.characters.toLocaleString() },
    { label: "Characters (no spaces)", value: stats.charactersNoSpaces.toLocaleString() },
    { label: "Sentences", value: stats.sentences.toLocaleString() },
    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
    { label: "Reading time", value: formatReadingTime(stats.readingMinutes) },
  ];

  return (
    <div className="space-y-6">
      <PaywallModal />
      <div>
        <label htmlFor="wc-text" className="sr-only">
          Your text
        </label>
        <textarea
          id="wc-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here…"
          rows={10}
          className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
        />
      </div>

      <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center"
          >
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              {card.label}
            </dt>
            <dd className="mt-1 text-xl font-bold text-gray-900">
              {card.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}