import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UnitConverter from "./UnitConverter";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/unit-converter"),
  title: "Unit Converter - Length, Weight, Temperature & Data",
  description:
    "Convert common length, weight, temperature and digital storage units directly in your browser.",
};

const seoTitle = "Unit Converter: supported categories and calculation notes";
const seoText = `## Supported conversion categories

The current converter covers length, weight, temperature and digital data size. It includes common metric and imperial units such as millimeters, meters, kilometers, inches, feet, miles, grams, kilograms, pounds and stone, plus Celsius, Fahrenheit and Kelvin.

## How to use it

Choose a category, select the source and destination units, and enter a value. The converted result updates immediately. You can also swap the two units when you want to reverse a conversion.

## Data-size convention

Digital storage conversions in this tool use 1024-based steps between bytes, KB, MB, GB and TB. Some storage manufacturers use decimal 1000-based units instead, so displayed values can differ from product packaging that follows the decimal convention.

## Privacy and accuracy

All conversion formulas run locally in the browser. Results are calculated with JavaScript floating-point arithmetic, which is suitable for everyday conversions but should not replace specialist measurement or engineering software where regulated precision is required.`;

export default function UnitConverterPage() {
  return (
    <ToolLayout
      title="Unit Converter"
      description="Convert common length, weight, temperature and data-size units."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <UnitConverter />
    </ToolLayout>
  );
}
