import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import DailyWordGame from "./DailyWordGame";

export const metadata: Metadata = {
  title: "Free Daily Word Game Online - One New 5-Letter Puzzle a Day",
  description:
    "Play the daily word game: guess the 5-letter word in six tries. A new puzzle every day for everyone worldwide. Free, no sign-up.",
  alternates: { canonical: "/daily-word-game" },
};

const seoTitle = "Free Online Daily Word Game - A New Word Puzzle Every Day";
const seoText = `The Daily Word Game gives everyone in the world the same brand-new word puzzle every single day. You have six tries to guess a hidden 5-letter word, and after each guess the tiles change color to tell you which letters are correct, which are in the word but in the wrong position, and which are not in the word at all.
 
It is a perfect way to start your morning — a little brain warm-up that takes just a couple of minutes. Because the puzzle is the same for everyone, you and your friends can compare results and see who cracked it in the fewest tries. There is no account and no clutter: just one clean puzzle a day.
 
Your statistics — games played, win rate, current streak, and best streak — are saved privately in your browser, so they are always up to date without you needing to sign in.
 
Every game runs entirely in your browser with no downloads and no sign-up. Come back each day for a fresh challenge, and use the share button to let others know how you did. Fun, free, and totally private.`;

export default function DailyWordGamePage() {
  const description =
    "Guess the daily 5-letter word in six tries. A brand-new puzzle for everyone around the world, every day.";

  return (
    <GameLayout
      title="Daily Word Game"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Daily Word Game"
        description={description}
        genre="Word"
      />
      <DailyWordGame />
    </GameLayout>
  );
}
