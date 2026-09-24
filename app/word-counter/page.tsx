import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WordCounter from "./WordCounter";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/word-counter"),
  title: "Word Counter - Count Words, Characters & Reading Time",
  description:
    "Count words, characters, sentences and paragraphs and estimate reading time directly in your browser.",
};

const seoTitle = "Word Counter: what is measured and how reading time is estimated";
const seoText = `## What this counter measures

The tool reports words, total characters, characters without spaces, sentences, paragraphs and an estimated reading time. The values update as you type or paste text.

## How the counts work

Words are separated by whitespace. Paragraphs are identified from blocks separated by blank lines, while sentence counting looks for common sentence-ending punctuation. These rules are useful for everyday writing but may not match the exact counting method used by every school, publisher or platform.

## Reading-time estimate

Reading time is estimated from a pace of about 200 words per minute. Real reading speed varies with language, complexity and the reader, so the result should be treated as a planning estimate rather than a guarantee.

## Privacy

The analysis happens locally in the page as you type. The text does not need to be sent to QuicTools for the counting operation.`;

export default function WordCounterPage() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, paragraphs and estimated reading time."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <WordCounter />
    </ToolLayout>
  );
}
