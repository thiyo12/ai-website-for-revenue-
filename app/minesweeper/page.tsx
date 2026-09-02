import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import Minesweeper from "./Minesweeper";

export const metadata: Metadata = {
  title: "Play Minesweeper Online Free - Classic Minesweeper Game",
  description:
    "Play the classic Minesweeper game online for free. Clear the minefield without detonating any mines. Easy, medium, or hard. No downloads.",
  alternates: { canonical: "/minesweeper" },
};

const seoTitle = "Free Online Minesweeper - Clear the Minefield";
const seoText = `Minesweeper is the classic logic and deduction game that has challenged players for decades. Your goal is to clear a grid of hidden cells without clicking on any of the hidden mines. Numbers on cleared cells tell you how many mines are in the surrounding eight squares, letting you deduce where it is safe to click.
 
Right-click (or long-press on mobile) to flag the cells you believe contain a mine. The opponent is your own deduction — clear cells are never random guesses based on nothing, they are the result of careful logic. Choose easy, medium, or hard to set the board size and number of mines.
 
A timer tracks how fast you clear each board, so you can race against your own best time. Your personal bests are saved privately in your browser.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Sharpen your logic, use the numbers, and sweep the whole minefield without tripping a single mine.`;

export default function MinesweeperPage() {
  const description =
    "Clear the minefield without detonating any mines. Classic logic puzzle with easy, medium, and hard boards.";

  return (
    <GameLayout
      title="Minesweeper"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Minesweeper"
        description={description}
        genre="Logic"
      />
      <Minesweeper />
    </GameLayout>
  );
}
