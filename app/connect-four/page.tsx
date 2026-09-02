import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import ConnectFour from "./ConnectFour";

export const metadata: Metadata = {
  title: "Play Connect Four Online Free - Drop Discs & Line Up Four",
  description:
    "Play Connect Four online for free. Drop your discs and be the first to line up four in a row against a challenging AI or a friend. No downloads.",
  alternates: { canonical: "/connect-four" },
};

const seoTitle = "Free Online Connect Four - vs AI or a Friend";
const seoText = `Connect Four is the beloved two-player strategy game where you drop colored discs into a seven-column, six-row vertical grid. The first player to connect four of their discs in a row — horizontally, vertically, or diagonally — wins. It takes seconds to learn but has surprising strategic depth.
 
Play against a challenging computer AI that thinks several moves ahead, or challenge a friend on the same device in two-player mode. The key is to build threats in multiple directions at once so your opponent can't block them all.
 
The game automatically detects four-in-a-row the moment it happens, calls out the winner, and lets you reset for an instant rematch. It works beautifully with both mouse and touch.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Think ahead, block your opponent, and claim the winning line. Strategic, fast, and endlessly replayable.`;

export default function ConnectFourPage() {
  const description =
    "Drop discs and line up four in a row against a challenging AI or a friend on the same device.";

  return (
    <GameLayout
      title="Connect Four"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Connect Four"
        description={description}
        genre="Strategy"
      />
      <ConnectFour />
    </GameLayout>
  );
}
