import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title: "Free Unit Converter Online - Length, Weight, Temperature & Data",
  description:
    "Convert length, weight, temperature, and data size units instantly with our free online unit converter. Fast, accurate, and 100% private — runs in your browser.",
};

const seoTitle = "Free Online Unit Converter - Length, Weight, Temperature & Data";
const seoText = `Convert between length, weight, temperature, and data size units in an instant with our free online unit converter. Choose a category, pick the unit you are starting from, and the conversion updates live as you type — no buttons to press, no waiting.

Pick from four handy categories. Length covers millimeters to miles, including meters, centimeters, kilometers, inches, feet, and yards. Weight converts grams, kilograms, tons, pounds, ounces, and more. Temperature switches between Celsius, Fahrenheit, and Kelvin with precise formulas. Data size converts bytes, kilobytes, megabytes, gigabytes, and terabytes, perfect for checking file sizes, storage plans, and download limits.

The converter is a hard-working companion for travel, cooking, DIY projects, school work, engineering, fitness, and everyday tech tasks. If a recipe calls for ounces but your scale only reads grams, a road sign shows kilometers but you think in miles, or a download limit is quoted in gigabytes, this tool has the answer in seconds.

It runs entirely in your browser, so there is nothing to install, no account to create, and no data sent anywhere. Both the "from" and "to" inputs stay in sync, so you can enter a value on either side and watch the other update instantly — even on your phone.`;

export default function UnitConverterPage() {
  const description =
    "Convert length, weight, temperature, and data size units instantly with synced input fields. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Unit Converter"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <UnitConverter />
    </ToolLayout>
  );
}