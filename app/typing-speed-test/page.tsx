import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import TypingSpeedTest from "./TypingSpeedTest";

export const metadata: Metadata = {
  title: "Free Typing Speed Test Online - Measure Your WPM & Accuracy",
  description:
    "Measure your typing speed in words per minute and accuracy with our free online typing test. Timed and instant results. No downloads.",
  alternates: { canonical: "/typing-speed-test" },
};

const seoTitle = "Free Online Typing Speed Test - Find Your WPM & Accuracy";
const seoText = `Our Typing Speed Test measures how fast and how accurately you can type in a timed challenge. A set of text is displayed on screen, you type it out, and at the end you get an exact words-per-minute (WPM) score plus your accuracy as a percentage.
 
Typing is one of the most useful skills you can improve — faster typing saves hours over the course of a year and reduces the frustration of hunting for keys. Knowing your current WPM and accuracy is the first step to getting faster. Most average around 40 WPM; 60–80 is considered fast, and 100+ is exceptional.
 
Typing errors are highlighted as you go so you can keep your accuracy high, and at the end you can see exactly which words tripped you up. Your best results are saved privately in your browser so you can track your progress.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Take the timed test, get your score, and use the share button to challenge your friends to beat your WPM. Simple, accurate, and a great way to improve.`;

export default function TypingSpeedTestPage() {
  const description =
    "Measure your words per minute and accuracy on a timed typing challenge. Save your best scores.";

  return (
    <GameLayout
      title="Typing Speed Test"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Typing Speed Test"
        description={description}
        genre="Skill"
      />
      <TypingSpeedTest />
    </GameLayout>
  );
}
