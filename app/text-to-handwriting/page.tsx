import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TextToHandwriting from "./TextToHandwriting";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/text-to-handwriting"),
  title: "Text to Handwriting - Convert Text to Handwritten Note",
  description:
    "Turn typed text into a realistic handwritten-style note online for free. Choose a handwriting font, paper style and ink color, then download as PNG or PDF.",
};

const seoTitle = "Free Text to Handwriting Converter";
const seoText = `Turn your typed text into a handwriting-style note with our free text-to-handwriting converter. Paste or type any text and it will be rendered as a realistic handwritten page, letting you create study notes, practice pages, letters, or fun notebook-style documents.

Choose from a selection of handwriting-style fonts, pick a notebook or plain paper style, and set the ink color and text size to match the look you want. When you are happy with the result, download it as a PNG image or a multi-page PDF.

Everything runs entirely in your browser — your text never leaves your device and is never stored on a server.

How to use it: paste your text, pick a font, paper style and ink color, preview the handwritten page, then download it as a PNG or PDF.`;

export default function TextToHandwritingPage() {
  const description =
    "Turn typed text into a realistic handwritten-style note, choosing a handwriting font, paper style and ink color, then download it as PNG or PDF.";

  return (
    <ToolLayout
      title="Text to Handwriting"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <TextToHandwriting />
    </ToolLayout>
  );
}