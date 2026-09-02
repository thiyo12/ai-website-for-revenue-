"use client";

import { useState } from "react";
import PaywallModal from "@/components/PaywallModal";

type Category = "length" | "weight" | "temperature" | "data";

interface Unit {
  id: string;
  label: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const LENGTH: Unit[] = [
  { id: "mm", label: "Millimeters (mm)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: "cm", label: "Centimeters (cm)", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  { id: "m", label: "Meters (m)", toBase: (v) => v, fromBase: (v) => v },
  { id: "km", label: "Kilometers (km)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: "in", label: "Inches (in)", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  { id: "ft", label: "Feet (ft)", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  { id: "yd", label: "Yards (yd)", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  { id: "mi", label: "Miles (mi)", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
];

const WEIGHT: Unit[] = [
  { id: "mg", label: "Milligrams (mg)", toBase: (v) => v / 1_000_000, fromBase: (v) => v * 1_000_000 },
  { id: "g", label: "Grams (g)", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  { id: "kg", label: "Kilograms (kg)", toBase: (v) => v, fromBase: (v) => v },
  { id: "t", label: "Metric tons (t)", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  { id: "oz", label: "Ounces (oz)", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
  { id: "lb", label: "Pounds (lb)", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
  { id: "st", label: "Stone (st)", toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
];

const CELSIUS = { id: "c", label: "Celsius (°C)", toBase: (v: number) => v, fromBase: (v: number) => v };
const FAHRENHEIT: Unit = {
  id: "f",
  label: "Fahrenheit (°F)",
  toBase: (v) => (v - 32) * (5 / 9),
  fromBase: (v) => v * (9 / 5) + 32,
};
const KELVIN: Unit = {
  id: "k",
  label: "Kelvin (K)",
  toBase: (v) => v - 273.15,
  fromBase: (v) => v + 273.15,
};

const TEMPERATURE: Unit[] = [CELSIUS, FAHRENHEIT, KELVIN];

const DATA: Unit[] = [
  { id: "b", label: "Bytes (B)", toBase: (v) => v, fromBase: (v) => v },
  { id: "kb", label: "Kilobytes (KB)", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
  { id: "mb", label: "Megabytes (MB)", toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
  { id: "gb", label: "Gigabytes (GB)", toBase: (v) => v * 1024 ** 3, fromBase: (v) => v / 1024 ** 3 },
  { id: "tb", label: "Terabytes (TB)", toBase: (v) => v * 1024 ** 4, fromBase: (v) => v / 1024 ** 4 },
];

const CATEGORIES: Record<Category, { label: string; units: Unit[] }> = {
  length: { label: "Length", units: LENGTH },
  weight: { label: "Weight", units: WEIGHT },
  temperature: { label: "Temperature", units: TEMPERATURE },
  data: { label: "Data size", units: DATA },
};

function formatNumber(v: number): string {
  if (!isFinite(v)) return "";
  if (Math.abs(v) >= 1_000_000_000 || (Math.abs(v) < 0.000001 && v !== 0)) {
    return v.toExponential(4);
  }
  return String(parseFloat(v.toPrecision(10)));
}

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [lastEdited, setLastEdited] = useState<"from" | "to">("from");

  const units = CATEGORIES[category].units;

  const convert = (value: string, fromId: string, toId: string): string => {
    const input = parseFloat(value);
    if (value.trim() === "" || isNaN(input)) return "";
    const from = units.find((u) => u.id === fromId);
    const to = units.find((u) => u.id === toId);
    if (!from || !to) return "";
    const base = from.toBase(input);
    return formatNumber(to.fromBase(base));
  };

  const handleFromChange = (v: string) => {
    setLastEdited("from");
    setFromValue(v);
    setToValue(convert(v, fromUnit, toUnit));
  };

  const handleToChange = (v: string) => {
    setLastEdited("to");
    setToValue(v);
    setFromValue(convert(v, toUnit, fromUnit));
  };

  const handleUnitChange = (side: "from" | "to", value: string) => {
    if (side === "from") {
      setFromUnit(value);
      setToValue(convert(fromValue, value, toUnit));
    } else {
      setToUnit(value);
      setFromValue(convert(toValue, fromUnit, value));
    }
  };

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    const newUnits = CATEGORIES[c].units;
    setFromUnit(newUnits[0].id);
    setToUnit(newUnits[1].id);
    setFromValue("");
    setToValue("");
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
    setLastEdited(lastEdited === "from" ? "to" : "from");
  };

  return (
    <div className="space-y-6">
      <PaywallModal />
      <div>
        <label htmlFor="uc-category" className="mb-2 block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(CATEGORIES) as Category[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleCategoryChange(c)}
              className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                category === c
                  ? "border-accent-600 bg-accent-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {CATEGORIES[c].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        <div>
          <label htmlFor="uc-convert-from" className="mb-2 block text-sm font-medium text-gray-700">
            Convert from
          </label>
          <select
            id="uc-convert-from"
            value={fromUnit}
            onChange={(e) => handleUnitChange("from", e.target.value)}
            className="mb-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            inputMode="decimal"
            value={fromValue}
            onChange={(e) => handleFromChange(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={swap}
            aria-label="Swap units"
            className="rounded-full border border-gray-300 bg-white p-3 text-accent-600 shadow-sm transition-colors hover:bg-accent-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        <div>
          <label htmlFor="uc-convert-to" className="mb-2 block text-sm font-medium text-gray-700">
            Convert to
          </label>
          <select
            id="uc-convert-to"
            value={toUnit}
            onChange={(e) => handleUnitChange("to", e.target.value)}
            className="mb-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          >
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            inputMode="decimal"
            value={toValue}
            onChange={(e) => handleToChange(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          />
        </div>
      </div>
    </div>
  );
}