import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import MemoryMatch from "./MemoryMatch";

export const metadata: Metadata = {
  title: "Play Memory Match Online Free - Card Matching Game",
  description:
    "Play the Memory Match card game online for free. Flip cards and find matching pairs before your move counter runs out. No downloads.",
  alternates: { canonical: "/memory-match" },
};

const seoTitle = "Free Online Memory Match - Test Your Recall";
const seoText = `Memory Match is a classic concentration game that exercises your short-term memory. Cards are laid face down on the grid, and you flip two at a time trying to find matching pairs. When you flip two matching cards they stay revealed; if they don't match, they flip back over and you have to remember where they were.
 
The game tracks how many pairs you find versus the number of moves you take, so you can see how sharp your memory really is. With each round the pairs are shuffled, so no two games are ever the same. It is fun for kids and a genuine challenge for adults.
 
Play against the move counter to complete the board in as few flips as possible, and try to beat your best score on every round. Your best results are saved privately in your browser.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Take your time, pay attention, and find every match. A quick, satisfying brain boost ideal for any age.`;

export default function MemoryMatchPage() {
  const description =
    "Flip cards to find matching pairs before your moves run out. A fun way to test and train your memory.";

  return (
    <GameLayout
      title="Memory Match"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Memory Match"
        description={description}
        genre="Puzzle"
      />
      <MemoryMatch />
    </GameLayout>
  );
}
