"use client";

import { useMemo, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  nextBirthdayInDays: number;
}

// Treat date-input values as calendar dates. Clamp month-end birthdays (e.g.
// January 31 -> February 28) instead of allowing Date to overflow into March.
function addCalendarMonths(birth: Date, months: number): Date {
  const first = new Date(Date.UTC(birth.getUTCFullYear(), birth.getUTCMonth() + months, 1));
  const lastDay = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)).getUTCDate();
  return new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), Math.min(birth.getUTCDate(), lastDay)));
}

function diffToToday(birth: Date, target: Date): AgeResult {
  let years = target.getUTCFullYear() - birth.getUTCFullYear();
  if (addCalendarMonths(birth, years * 12).getTime() > target.getTime()) years--;

  let months = 0;
  while (months < 11 && addCalendarMonths(birth, years * 12 + months + 1).getTime() <= target.getTime()) {
    months++;
  }
  const monthsAnchor = addCalendarMonths(birth, years * 12 + months);
  const days = Math.floor((target.getTime() - monthsAnchor.getTime()) / 86400000);
  const totalDays = Math.floor((target.getTime() - birth.getTime()) / 86400000);

  const yearOffset = target.getUTCFullYear() - birth.getUTCFullYear();
  let nextBirthday = addCalendarMonths(birth, yearOffset * 12);
  if (nextBirthday.getTime() < target.getTime()) {
    nextBirthday = addCalendarMonths(birth, (yearOffset + 1) * 12);
  }
  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    nextBirthdayInDays: Math.floor((nextBirthday.getTime() - target.getTime()) / 86400000),
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [hasRun, setHasRun] = useState(false);

  const result = useMemo<AgeResult | null>(() => {
    if (!birthDate) return null;
    // Date input values are calendar dates, not local-time UTC offsets.
    const birth = new Date(`${birthDate}T00:00:00Z`);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    const target = targetDate
      ? new Date(`${targetDate}T00:00:00Z`)
      : new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
    if (isNaN(target.getTime()) || birth.getTime() > target.getTime()) return null;
    return diffToToday(birth, target);
  }, [birthDate, targetDate]);

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="age-birth"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Date of birth
          </label>
          <input
            id="age-birth"
            type="date"
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              setHasRun(true);
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>
        <div>
          <label
            htmlFor="age-target"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Age on date (optional)
          </label>
          <input
            id="age-target"
            type="date"
            value={targetDate}
            onChange={(e) => {
              setTargetDate(e.target.value);
              setHasRun(true);
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>
      </div>

      {hasRun && result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-accent-200 bg-accent-50 p-5 text-center">
            <div className="text-4xl font-bold text-accent-700">
              {result.years} {result.years === 1 ? "year" : "years"}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {result.months} {result.months === 1 ? "month" : "months"} and {result.days} {result.days === 1 ? "day" : "days"}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Total days</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">{result.totalDays.toLocaleString()}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Total weeks</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">{result.totalWeeks.toLocaleString()}</dd>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-center">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Next birthday</dt>
              <dd className="mt-1 text-xl font-bold text-gray-900">{result.nextBirthdayInDays} days</dd>
            </div>
          </dl>
        </div>
      ) : hasRun && !result ? (
        <p className="text-sm text-gray-500">
          Please select a valid date of birth.
        </p>
      ) : null}
    </div>
  );
}
