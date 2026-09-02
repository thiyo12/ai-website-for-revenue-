import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import DailyTrivia from "./DailyTrivia";

export const metadata: Metadata = {
  title: "Free Daily Trivia Quiz Online - 10 Questions a Day",
  description:
    "Answer 10 general-knowledge questions in our rotating daily trivia quiz. Build a streak and test your smarts. Free, no sign-up.",
  alternates: { canonical: "/daily-trivia" },
};

const seoTitle = "Free Online Daily Trivia - Test Your Knowledge Every Day";
const seoText = `Our Daily Trivia quiz gives you ten general-knowledge questions every day, covering topics like history, science, geography, pop culture, and more. Each question has four answers, and every correct answer earns you a point out of ten.
 
Because the questions are chosen and seeded for the date, everyone gets the same quiz that day — so you can compare your score with friends and see who knows more. The stakes are low and the fun is high, and you can even build a daily streak by playing each day.
 
At the end of the quiz you get your score and a streak counter, both saved privately in your browser so you can track your winning run. The answer to each question is revealed as you go, so every quiz teaches you something new.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Learn something new, test your general knowledge, and come back tomorrow for a fresh ten questions. Quick, fun, and endlessly replayable.`;

export default function DailyTriviaPage() {
  const description =
    "Answer 10 general-knowledge questions in a fresh daily quiz. Build a streak and test your smarts.";

  return (
    <GameLayout
      title="Daily Trivia"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Daily Trivia"
        description={description}
        genre="Quiz"
      />
      <DailyTrivia />
    </GameLayout>
  );
}
