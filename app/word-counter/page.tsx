import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WordCounter from "./WordCounter";

export const metadata: Metadata = {
  title: "Free Word Counter Online - Count Words, Characters & Sentences",
  description:
    "Count words, characters, sentences, and paragraphs instantly with our free online word counter. Get estimated reading time as you type. 100% private.",
};

const seoTitle = "Free Online Word Counter - Count Words & Reading Time";
const seoText = `Our free word counter gives you instant, accurate word, character, sentence, and paragraph counts as you type. It is the perfect companion for writers, students, bloggers, and professionals who need to meet word limits or keep their content concise.

Paste or type your text into the box and the counter updates live with every keystroke. You will see the total word count, the number of characters (with and without spaces), the sentence count, and the paragraph count all at once. The tool also estimates how long it takes the average person to read your text, which is incredibly useful when writing blog posts, emails, essays, or social media captions.

Because everything happens in your browser, your writing stays completely private — nothing you paste is ever sent to a server, uploaded, or stored. There is no sign-up, no login, and no limits on how much text you can check.

Whether you are hitting a 500-word college essay, a 150-word meta description, or a 2-minute video script, this word counter helps you reach your word count goals quickly and accurately, on any device.`;

export default function WordCounterPage() {
  const description =
    "Count words, characters, sentences, and paragraphs, and get estimated reading time as you type. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Word Counter"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <WordCounter />
    </ToolLayout>
  );
}