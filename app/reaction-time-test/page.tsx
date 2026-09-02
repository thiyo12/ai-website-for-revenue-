import type { Metadata } from "next";
import JsonLdGame from "@/components/JsonLdGame";
import GameLayout from "@/components/GameLayout";
import ReactionTimeTest from "./ReactionTimeTest";

export const metadata: Metadata = {
  title: "Free Reaction Time Test Online - Measure Your Reflexes",
  description:
    "Test your reflexes with our free online reaction time test. Click the moment the color changes, get your score, and share it. No downloads.",
  alternates: { canonical: "/reaction-time-test" },
};

const seoTitle = "Free Online Reaction Time Test - How Fast Are Your Reflexes?";
const seoText = `Our Reaction Time Test measures how quickly you can respond to a visual signal. Wait for the screen to turn green, then click or tap as fast as you can — the time between the color change and your click is your reaction time in milliseconds.
 
Take part in five measured rounds to get the most reliable result, with your fastest, slowest, and average times shown clearly. Most people score somewhere between 200 and 300 milliseconds, but with practice you can genuinely improve. Athletes, gamers, and busy professionals all use reaction time tests to gauge their focus and reflexes.
 
Because it uses an unpredictable delay before changing color, you can't cheat the test by anticipating the click — you have to genuinely react.
 
It runs entirely in your browser with no downloads and no account. Compare your score against the average, track improvements over time, and use the share button to show your friends how quick your reflexes really are. Fun, fast, and completely free.`;

export default function ReactionTimeTestPage() {
  const description =
    "Click the moment the color changes and see your reaction time in milliseconds. Share your best score.";

  return (
    <GameLayout
      title="Reaction Time Test"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JsonLdGame
        name="Reaction Time Test"
        description={description}
        genre="Skill"
      />
      <ReactionTimeTest />
    </GameLayout>
  );
}
