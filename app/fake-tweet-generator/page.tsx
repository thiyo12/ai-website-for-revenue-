import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FakeTweet from "./FakeTweet";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/fake-tweet-generator"),
  title: "Fake Tweet Generator - Create Mock Tweets",
  description:
    "Create a realistic-looking tweet mockup online for free. Add name, handle, avatar, text, likes and retweets, then download as a PNG. For entertainment only.",
};

const seoTitle = "Free Fake Tweet Generator";
const seoText = `Make a realistic-looking tweet screenshot with our free fake tweet generator. Enter a name, @handle, avatar, and the tweet text, then fine-tune the engagement numbers for likes, retweets, replies and views. Add a verified checkmark and timestamp to complete the look, then download the mockup as a PNG.

The generator renders an authentic tweet-style card, so the mockup looks exactly like a real social media post. It is perfect for design mockups, presentations, educational demos, memes, or entertainment.

Everything runs in your browser — nothing is uploaded or stored. The result is a simulated post for entertainment and demonstration purposes only and is not an authentic tweet.

How to use it: fill in the profile details and tweet text, adjust the engagement counts, and click the download button to export your PNG.`;

export default function FakeTweetPage() {
  const description =
    "Create a realistic tweet-style mockup with name, handle, avatar, text and engagement counts, then download it as a PNG. For entertainment only.";

  return (
    <ToolLayout
      title="Fake Tweet Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <FakeTweet />
    </ToolLayout>
  );
}