import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AgeCalculator from "./AgeCalculator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/age-calculator"),
  title: "Age Calculator - Years, Months, Days & Next Birthday",
  description:
    "Calculate age in years, months and days, total days and weeks, and days until the next birthday.",
};

const seoTitle = "Age Calculator: date calculation details and edge cases";
const seoText = `## What the age calculator shows

Enter a date of birth to calculate age in years, months and days. The tool also reports approximate total days and weeks and the number of days until the next birthday. You can optionally choose a different target date instead of today.

## How the calculation works

Calendar years and months are handled separately before the remaining day difference is calculated. Total-day values are based on the time difference between the selected dates, so timezone and daylight-saving boundaries can sometimes affect edge cases.

## Useful scenarios

The calculator can help with birthday planning, forms that ask for age on a specific date, or quickly checking the elapsed time between a birth date and another date. It is not intended to determine legal eligibility where an official authority uses its own age-calculation rules.

## Privacy

The selected dates are processed locally in the browser. No server request is required for the age calculation.`;

export default function AgeCalculatorPage() {
  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate age in years, months and days and check the next birthday."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <AgeCalculator />
    </ToolLayout>
  );
}
