"use client";

import { useCallback, useEffect, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{};:,.<>?/";

function getRandomBytes(length: number): Uint32Array {
  const arr = new Uint32Array(length);
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < length; i++) arr[i] = Math.floor(Math.random() * 0xffffffff);
  }
  return arr;
}

function generate(length: number, counts: Record<string, boolean>): string {
  const pools: string[] = [];
  if (counts.upper) pools.push(UPPER);
  if (counts.lower) pools.push(LOWER);
  if (counts.numbers) pools.push(NUMBERS);
  if (counts.symbols) pools.push(SYMBOLS);

  const all = pools.join("");
  if (!all) return "";

  const rand = getRandomBytes(Math.max(length, 4));
  let password = "";
  let used = 0;

  const pick = (pool: string, r: number) => pool[r % pool.length];

  pools.forEach((pool) => {
    if (used < length) {
      password += pick(pool, rand[used]);
      used++;
    }
  });

  while (used < length) {
    password += pick(all, rand[used] + used * 7 + 3);
    used++;
  }

  return password
    .split("")
    .sort(() => {
      const ri = new Uint32Array(1);
      if (typeof window !== "undefined" && window.crypto?.getRandomValues)
        window.crypto.getRandomValues(ri);
      else ri[0] = Math.floor(Math.random() * 0xffffffff);
      return ri[0] - 0x7fffffff;
    })
    .join("");
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [counts, setCounts] = useState({
    upper: true,
    lower: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const regenerate = useCallback(() => {
    setPassword(generate(length, counts));
  }, [length, counts]);

  useEffect(() => {
    setPassword(generate(length, counts));
  }, [length, counts]);

  const toggle = (key: keyof typeof counts) => {
    setCounts((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const anyActive = Object.values(next).some(Boolean);
      return anyActive ? next : prev;
    });
  };

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const lengthActive = Object.values(counts).filter(Boolean).length;
  const entropy = length * Math.log2(
    (counts.upper ? UPPER.length : 0) +
      (counts.lower ? LOWER.length : 0) +
      (counts.numbers ? NUMBERS.length : 0) +
      (counts.symbols ? SYMBOLS.length : 0)
  );

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="flex items-stretch gap-3">
        <div className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 font-mono text-lg text-gray-900 break-all">
          {password || "—"}
        </div>
        <button
          type="button"
          onClick={copy}
          disabled={!password}
          className="shrink-0 rounded-lg bg-accent-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700 disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <label htmlFor="pw-length" className="text-sm font-medium text-gray-700">
            Password length: <span className="font-bold text-accent-700">{length}</span>
          </label>
        </div>
        <input
          id="pw-length"
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="mt-3 w-full accent-accent-600"
        />

        <div className="mt-5 grid grid-cols-2 gap-3">
          {(
            [
              ["upper", "Uppercase (A-Z)"],
              ["lower", "Lowercase (a-z)"],
              ["numbers", "Numbers (0-9)"],
              ["symbols", "Symbols (!@#)"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={counts[key]}
                onChange={() => toggle(key)}
                className="h-4 w-4 rounded border-gray-300 text-accent-600 accent-accent-600"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={regenerate}
          className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-700"
        >
          Generate new password
        </button>
        <p className="text-sm text-gray-500">
          {password ? `Estimated strength: ${entropy.toFixed(0)} bits` : ""}
        </p>
      </div>

      <p className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
        <svg
          className="h-4 w-4 text-accent-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Passwords are generated entirely on your device — nothing is ever sent
        to a server or stored.
      </p>
    </div>
  );
}
