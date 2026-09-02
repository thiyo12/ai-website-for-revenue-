"use client";

import { useMemo, useState } from "react";
import PaywallModal from "@/components/PaywallModal";

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

interface Course {
  grade: string;
  credits: number;
}

function parseCredits(v: string): number {
  const n = parseFloat(v);
  return isNaN(n) || n < 0 ? 0 : n;
}

export default function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([{ grade: "A", credits: 3 }]);

  const totals = useMemo(() => {
    let qualityPoints = 0;
    let totalCredits = 0;
    for (const c of courses) {
      const gp = GRADE_POINTS[c.grade] ?? 0;
      const cr = c.credits;
      qualityPoints += gp * cr;
      totalCredits += cr;
    }
    return {
      qualityPoints,
      totalCredits,
      gpa: totalCredits > 0 ? qualityPoints / totalCredits : 0,
    };
  }, [courses]);

  const addCourse = () => setCourses((prev) => [...prev, { grade: "A", credits: 3 }]);
  const removeCourse = (i: number) =>
    setCourses((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));
  const update = (i: number, patch: Partial<Course>) =>
    setCourses((prev) => prev.map((c, idx) => (idx === i ? { ...c, ...patch } : c)));

  return (
    <div className="space-y-6">
      <PaywallModal />

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Course</th>
              <th className="px-4 py-3 font-medium">Grade</th>
              <th className="px-4 py-3 font-medium">Credit hours</th>
              <th className="w-10 px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-gray-600">
                  Course {i + 1}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={course.grade}
                    onChange={(e) => update(i, { grade: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
                  >
                    {Object.keys(GRADE_POINTS).map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={course.credits}
                    onChange={(e) => update(i, { credits: parseCredits(e.target.value) })}
                    className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => removeCourse(i)}
                    disabled={courses.length === 1}
                    className="text-sm font-medium text-red-500 transition-colors hover:text-red-700 disabled:opacity-30"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addCourse}
        className="rounded-lg border border-accent-200 px-4 py-2 text-sm font-semibold text-accent-700 transition-colors hover:bg-accent-50"
      >
        + Add course
      </button>

      <div className="grid grid-cols-3 gap-4 rounded-xl border border-accent-200 bg-accent-50 p-5 text-center">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">GPA</div>
          <div className="mt-1 text-3xl font-bold text-accent-700">{totals.gpa.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Quality points</div>
          <div className="mt-1 text-3xl font-bold text-gray-900">{totals.qualityPoints.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Credits</div>
          <div className="mt-1 text-3xl font-bold text-gray-900">{totals.totalCredits}</div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Calculated on the standard 4.0 scale (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0).
      </p>
    </div>
  );
}
