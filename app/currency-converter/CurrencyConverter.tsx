"use client";

import { useEffect, useMemo, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "INR", "LKR", "AUD", "CAD", "CNY", "CHF", "NZD", "SGD"];

const SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  INR: "₹",
  LKR: "Rs",
  AUD: "A$",
  CAD: "C$",
  CNY: "¥",
  CHF: "Fr",
  NZD: "NZ$",
  SGD: "S$",
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("LKR");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [base, setBase] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/exchange-rate?base=${from}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (cancelled) return;
        setRates(data.rates ?? {});
        setBase(data.base ?? from);
      } catch {
        if (!cancelled) setError("Could not load exchange rates. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [from]);

  const parsedAmount = parseFloat(amount) || 0;

  const converted = useMemo(() => {
    if (from === to) return parsedAmount;
    const rateFrom = from === base ? 1 : rates[from];
    const rateTo = to === base ? 1 : rates[to];
    if (typeof rateFrom !== "number" || typeof rateTo !== "number") return null;
    return (parsedAmount / rateFrom) * rateTo;
  }, [parsedAmount, from, to, rates, base]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const rateText = useMemo(() => {
    if (from === to) return "1.00";
    const rateFrom = from === base ? 1 : rates[from];
    const rateTo = to === base ? 1 : rates[to];
    if (typeof rateFrom !== "number" || typeof rateTo !== "number") return null;
    return ((1 / rateFrom) * rateTo).toFixed(4);
  }, [from, to, rates, base]);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <div>
          <label htmlFor="cc-amount" className="mb-1 block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="cc-amount"
            type="number"
            min={0}
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>

        <div>
          <label htmlFor="cc-from" className="mb-1 block text-sm font-medium text-gray-700">
            From
          </label>
          <select
            id="cc-from"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end justify-center py-1">
          <button
            type="button"
            onClick={swap}
            className="rounded-lg bg-accent-50 p-3 text-accent-700 transition-colors hover:bg-accent-100"
            aria-label="Swap currencies"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h13m0 0l-3-3m3 3l-3 3M17 17H4m0 0l3 3m-3-3l3-3" />
            </svg>
          </button>
        </div>

        <div>
          <label htmlFor="cc-to" className="mb-1 block text-sm font-medium text-gray-700">
            To
          </label>
          <select
            id="cc-to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      ) : loading ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
          Loading exchange rates…
        </div>
      ) : (
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-6 text-center">
          <p className="text-sm text-gray-500">
            {parsedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {SYMBOLS[from]} {from} =
          </p>
          <p className="mt-1 text-3xl font-bold text-accent-700">
            {converted !== null
              ? `${SYMBOLS[to]} ${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`
              : "—"}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            {from === to ? "" : `1 ${from} = ${rateText ?? "—"} ${to}`}
          </p>
        </div>
      )}

      <p className="text-center text-xs text-gray-400">
        Exchange rates are indicative and may not be real-time market rates. Always verify before sending money.
      </p>
    </div>
  );
}
