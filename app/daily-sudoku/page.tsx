import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import DailySudoku from "./DailySudoku";

export const metadata: Metadata = {
  title: "Free Daily Sudoku Puzzle Online - A New Puzzle Every Day",
  description:
    "Play a fresh Sudoku puzzle every day with our free online solver. Choose your difficulty, use helpful hints, and race the stopwatch. No sign-up.",
  alternates: { canonical: "/daily-sudoku" },
};

const seoTitle = "Free Online Daily Sudoku - Relax with a Fresh Puzzle";
const seoText = `The Daily Sudoku serves up a brand-new, fully solved-and-verifiable puzzle every single day. Choose an easy, medium, or hard challenge and fill in the 9×9 grid so that every row, column, and 3×3 box contains the numbers 1 through 9 exactly once.
 
Sudoku is a fantastic mental workout that improves logic, concentration, and pattern recognition. This version includes helpful features — you can pencil in candidate numbers, highlight mistakes so you never get stuck, and use hints when you need a nudge in the right direction. A stopwatch tracks your time so you can try to beat your personal best.
 
Because each puzzle is generated for the date, everyone sees the same grid that day, which makes it fun to compare solving times with friends.
 
It runs entirely in your browser with no downloads and no account. Your best times are saved privately, and the game is completely free. Clear your mind, pick a difficulty, and solve today's Sudoku.`;

export default function DailySudokuPage() {
  const description =
    "A fresh, fully generated Sudoku puzzle every day with difficulty levels, hints, and a stopwatch. Runs in your browser.";

  return (
    <GameLayout
      title="Daily Sudoku"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Daily Sudoku"
        description={description}
        genre="Puzzle"
      />
      <DailySudoku />
    </GameLayout>
  );
}
