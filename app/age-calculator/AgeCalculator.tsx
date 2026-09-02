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

function diffToToday(birth: Date, target: Date): AgeResult {
  let years = target.getFullYear() - birth.getFullYear();
  let months = target.getMonth() - birth.getMonth();
  let days = target.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthEnd = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
    days += prevMonthEnd;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor(
    (target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
  );

  let nextBirthday = new Date(
    target.getFullYear(),
    birth.getMonth(),
    birth.getDate()
  );
  if (nextBirthday.getTime() < target.getTime()) {
    nextBirthday = new Date(
      target.getFullYear() + 1,
      birth.getMonth(),
      birth.getDate()
    );
  }
  const nextBirthdayInDays = Math.floor(
    (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    nextBirthdayInDays,
  };
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [hasRun, setHasRun] = useState(false);

  const result = useMemo<AgeResult | null>(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;
    const target = targetDate ? new Date(targetDate) : new Date();
    if (isNaN(target.getTime())) return null;
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
              {result.years} years
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {result.months} months and {result.days} days
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
