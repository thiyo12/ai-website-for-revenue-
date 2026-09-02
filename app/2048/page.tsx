import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import Game2048 from "./Game2048";

export const metadata: Metadata = {
  title: "Play 2048 Online Free - Slide & Merge Tiles",
  description:
    "Play the addictive 2048 puzzle game online for free. Slide number tiles and combine them to reach 2048. No downloads, no sign-up.",
  alternates: { canonical: "/2048" },
};

const seoTitle = "Free Online 2048 - Addictive Number Puzzle Game";
const seoText = `2048 is a simple but addictive puzzle game. Slide tiles on a 4×4 grid in four directions — up, down, left, and right — and tiles with the same number merge when they touch. Combine 2s into 4s, 4s into 8s, and keep going until you create the legendary 2048 tile.
 
The rules take seconds to learn but the game is deceptively tricky to master. You need a strategy to keep your highest-value tiles cornered and avoid filling up the board too fast. It is the perfect game for a short break, a commute, or a quick mental reset.
 
Your best score is saved privately in your browser so you can keep chasing your personal high score every time you return. The controls work on both keyboard and touch, so it feels great on any device.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Think ahead, plan your moves, and see if you can beat 2048 — and then try for an even higher score.`;

export default function Game2048Page() {
  const description =
    "Slide numbered tiles and combine them to reach 2048. Play online, save your high score, and beat your best.";

  return (
    <GameLayout
      title="2048"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="2048"
        description={description}
        genre="Puzzle"
      />
      <Game2048 />
    </GameLayout>
  );
}
