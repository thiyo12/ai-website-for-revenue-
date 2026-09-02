import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import Tetris from "./Tetris";

export const metadata: Metadata = {
  title: "Play Tetris Online Free - Classic Block Stacking Game",
  description:
    "Play the classic Tetris game online for free. Stack falling blocks and clear lines to score. No downloads, no sign-up.",
  alternates: { canonical: "/tetris" },
};

const seoTitle = "Free Online Tetris - Stack, Clear Lines, Score Big";
const seoText = `Tetris is one of the most beloved puzzle games ever made. Seven differently shaped blocks — the tetrominoes — fall one at a time, and you rotate and slide each one to fit it into a tidy stack at the bottom of the board. When you completely fill a horizontal row, it clears, gives you points, and makes room for more blocks.
 
As the game speeds up, you have to think and react faster, making quick decisions about where each piece should go to keep the stack from reaching the top. Clear multiple rows at once for bonus points and keep your board under control as long as you can.
 
Control the falling blocks with your arrow keys on desktop and on-screen buttons on mobile. Your high score is saved privately in your browser so you can always try to beat it.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Master the classic shapes, clear lines, and chase the highest score you can stack up. Endlessly replayable arcade fun.`;

export default function TetrisPage() {
  const description =
    "Stack falling blocks and clear lines in this classic, endlessly replayable arcade puzzle.";

  return (
    <GameLayout
      title="Tetris"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Tetris"
        description={description}
        genre="Arcade"
      />
      <Tetris />
    </GameLayout>
  );
}
