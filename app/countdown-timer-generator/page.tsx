import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CountdownTimer from "./CountdownTimer";

export const metadata: Metadata = {
  title: "Countdown Timer Generator - Create & Share Countdowns",
  description:
    "Create a live countdown timer to a future event online for free. Customize the target date, color and message, and share it with a link. Runs in your browser.",
};

const seoTitle = "Free Countdown Timer Generator";
const seoText = `Create a beautiful live countdown timer to any future date with our free countdown timer generator. Give your event a name, choose the target date and time, pick an accent color, and write a custom message to display when the countdown finishes.

Your timer is saved in your browser and can be shared with others using a dedicated share link, so friends or collaborators can open the exact same countdown. An embed snippet lets you place the timer on your own website or page.

Everything runs entirely in your browser — there is no database, so your event name and date are never stored on a server. They are kept locally and encoded in the share link.

How to use it: set your event name, pick a date and time, customize the look, then copy the share link or export a screenshot of your timer.`;

export default function CountdownTimerGeneratorPage() {
  const description =
    "Create a live countdown to a future date with a custom color and message, save it in your browser, and share it with a link.";

  return (
    <ToolLayout
      title="Countdown Timer Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <CountdownTimer />
    </ToolLayout>
  );
}