import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import Snake from "./Snake";

export const metadata: Metadata = {
  title: "Play Snake Online Free - Classic Snake Game",
  description:
    "Play the classic Snake game online for free. Grow your snake by eating food without hitting the walls or yourself. No downloads, no sign-up.",
  alternates: { canonical: "/snake" },
};

const seoTitle = "Free Online Snake - Play the Classic Arcade Game";
const seoText = `Snake is the timeless arcade classic where you control a growing snake as it slithers across the board. Eat food to grow longer, and try not to run into the walls or into your own ever-lengthening body. The longer you survive, the higher your score climbs.
 
The concept is simple but the challenge ramps up quickly. As your snake grows, the game becomes a careful balancing act — you need quick reflexes and careful planning to weave through the board without trapping yourself. It is the perfect quick break for any moment.
 
Control the snake with your arrow keys on desktop or an on-screen D-pad on mobile. Pause anytime, and your best score is saved privately in your browser so you always have a target to beat.
 
It runs entirely in your browser with no downloads and no account, and it is completely free. Guide your snake, chain together food pickups, and chase the highest score you can. Classic, fun, and endlessly replayable.`;

export default function SnakePage() {
  const description =
    "Grow your snake by eating food without hitting walls or yourself. Classic arcade fun in your browser.";

  return (
    <GameLayout
      title="Snake"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Snake"
        description={description}
        genre="Arcade"
      />
      <Snake />
    </GameLayout>
  );
}
