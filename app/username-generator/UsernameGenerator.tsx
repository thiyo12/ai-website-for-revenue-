"use client";

import { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

const ADJECTIVES = [
  "Cool", "Swift", "Mighty", "Neon", "Cosmic", "Lucky", "Shadow", "Turbo",
  "Wild", "Frosty", "Silent", "Brave", "Electric", "Golden", "Mystic", "Quick",
];

const NOUNS = [
  "Fox", "Wolf", "Tiger", "Phoenix", "Falcon", "Panda", "Dragon", "Storm",
  "Ace", "Knight", "Hero", "Light", "Shadow", "Vortex", "Bolt", "Rider",
];

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function UsernameGenerator() {
  const [base, setBase] = useState("");
  const [style, setStyle] = useState<"cool" | "cute" | "edgy">("cool");
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const baseWord = base.trim();
    const list: string[] = [];
    for (let i = 0; i < 8; i++) {
      let name: string;
      if (baseWord) {
        name = baseWord.charAt(0).toUpperCase() + baseWord.slice(1);
        const extras = [rand(ADJECTIVES), rand(NOUNS)];
        name = name + extras[Math.floor(Math.random() * extras.length)];
      } else {
        const adj = rand(ADJECTIVES);
        const noun = rand(NOUNS);
        name = style === "cute" ? `${adj.toLowerCase()}_${noun.toLowerCase()}` : `${adj}${noun}`;
      }
      if (numbers) name += Math.floor(Math.random() * 90 + 10);
      if (symbols) name += rand(["!", "_", ".", "-", "x"]);
      list.push(name);
    }
    setUsernames(list);
    setCopied(null);
  };

  const copy = async (name: string, index: number) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(index);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div>
        <label
          htmlFor="us-base"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Base word (optional)
        </label>
        <input
          id="us-base"
          type="text"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder="e.g. gamer, your name"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Style
        </label>
        <div className="flex flex-wrap gap-2">
          {(["cool", "cute", "edgy"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              disabled={!!base}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                style === s
                  ? "border-accent-600 bg-accent-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className="accent-accent-600"
          />
          Numbers
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className="accent-accent-600"
          />
          Symbols
        </label>
      </div>

      <button
        onClick={generate}
        className="w-full rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
      >
        Generate usernames
      </button>

      {usernames.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {usernames.map((name, i) => (
            <li key={i}>
              <button
                onClick={() => copy(name, i)}
                className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:border-accent-300 hover:bg-accent-50"
              >
                <span className="break-all">{name}</span>
                <span className="ml-2 shrink-0 text-xs font-semibold text-accent-600">
                  {copied === i ? "Copied!" : "Copy"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
