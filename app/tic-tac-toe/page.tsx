import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import TicTacToe from "./TicTacToe";

export const metadata: Metadata = {
  title: "Play Tic Tac Toe Online Free - X's and O's",
  description:
    "Play classic Tic Tac Toe online for free against the computer or a friend. Simple, fast, and fun. No downloads, no sign-up.",
  alternates: { canonical: "/tic-tac-toe" },
};

const seoTitle = "Free Online Tic Tac Toe - vs Computer or a Friend";
const seoText = `Tic Tac Toe (Noughts and Crosses) is the timeless head-to-head game everyone knows. Two players take turns marking X's and O's on a 3×3 grid, racing to line up three of their symbols in a row — horizontally, vertically, or diagonally. It is simple enough for children yet endlessly fun to play.
 
Play against a smart computer opponent that never makes silly mistakes, or challenge a friend in two-player mode on the same screen. Every game is quick, which makes it perfect for killing a couple of free minutes.
 
The game never needs a draw on a moment's notice — every result is detected automatically, and you can reset for a fresh round with one tap. It works just as well with a mouse as it does with touch.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Take the first move, outsmart your opponent, and get your three in a row. Simple, quick, and satisfying fun for everyone.`;

export default function TicTacToePage() {
  const description =
    "Play the classic 3-in-a-row game against a smart computer opponent or a friend on the same device.";

  return (
    <GameLayout
      title="Tic Tac Toe"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Tic Tac Toe"
        description={description}
        genre="Arcade"
      />
      <TicTacToe />
    </GameLayout>
  );
}
