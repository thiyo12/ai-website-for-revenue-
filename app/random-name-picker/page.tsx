import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RandomNamePicker from "./RandomNamePicker";

export const metadata: Metadata = {
  title: "Random Name Picker - Spin a Random Winner",
  description:
    "Pick a random winner or name online for free. Enter a list of names, spin the wheel, and remove each winner. Great for giveaways and classrooms.",
};

const seoTitle = "Free Random Name Picker";
const seoText = `Pick a random name from a list with our free random name picker. Type or paste a list of names, one per line, then press spin to randomly select one. Re-run as many times as you like, and optionally remove each winner so every person gets picked only once.

It is perfect for classroom activities, giveaway winners, team selection, raffles, and any time you need an unbiased random choice.

Everything runs entirely in your browser — your list of names never leaves your device and is never stored on a server.

How to use it: enter your names (one per line), click spin to pick a winner, and use the remove-winner option if you want unique picks. Export a screenshot of the result if you need to share it.`;

export default function RandomNamePickerPage() {
  const description =
    "Enter a list of names, spin to pick a random winner, and remove each pick for fair giveaways and classroom activities.";

  return (
    <ToolLayout
      title="Random Name Picker"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <RandomNamePicker />
    </ToolLayout>
  );
}