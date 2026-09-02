import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CaptionGenerator from "./CaptionGenerator";

export const metadata: Metadata = {
  title: "Free Social Media Caption Generator - Captions & Hashtags",
  description:
    "Generate catchy social media captions and ready-to-use hashtags for Instagram, TikTok, Facebook, and more. Free, unlimited, and runs in your browser.",
};

const seoTitle = "Free Online Social Media Caption Generator";
const seoText = `Craft the perfect social media caption in seconds with our free caption generator. Just type in a topic or keyword and it instantly creates three catchy caption options plus a set of matching hashtags, ready to copy and paste.
 
It works for Instagram, TikTok, Facebook, LinkedIn, and X (Twitter). Whether you are promoting a product, sharing behind-the-scenes content, or posting a lifestyle update, the generator gives you a strong starting point that you can tweak to match your brand voice.

The tool runs entirely in your browser — your topic never leaves your device, so there is no sign-up, no tracking, and no limit on how many captions you can generate.

How to use it: enter a topic or keyword, hit Generate, review your caption options, and copy the one you like together with its hashtags. It is that quick. Perfect for content creators, marketers, small business owners, and anyone who posts regularly and wants fresh caption ideas fast.`;
 
export default function CaptionGeneratorPage() {
  const description =
    "Generate catchy social media captions and ready-to-use hashtags for Instagram, TikTok, Facebook, and more. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Social Media Caption Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <CaptionGenerator />
    </ToolLayout>
  );
}
