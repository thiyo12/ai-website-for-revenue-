import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaVideoCompressor from "./SocialMediaVideoCompressor";

export const metadata: Metadata = {
  title: "Free Social Media Video Compressor - Compress Videos Online",
  description:
    "Compress videos for Instagram, Facebook, TikTok, YouTube and more. Reduce video file size without losing quality. Runs in your browser. 100% private.",
};

const seoTitle = "Free Online Social Media Video Compressor";
const seoText = `Compress your videos so they upload faster and take up less space, with our free social media video compressor. Choose a preset sized for Instagram, Facebook, TikTok, YouTube, or X/Twitter, and the tool re-encodes your video to the ideal resolution and bitrate.
 
You can also choose a custom quality level if you want more control over the balance between file size and visual quality. A lower resolution and bitrate produce a smaller file that uploads quickly; a higher setting keeps more detail.
 
Everything is processed entirely in your browser using WebAssembly (FFmpeg), so your video never leaves your device. That makes it safe for private or unpublished footage. There is no upload, no account, no watermark, and no limit on how many videos you compress.
 
The tool is perfect for content creators, small businesses, and anyone who needs to slim down a video before sharing it on social media or sending it in a message.`;
 
export default function SocialMediaVideoCompressorPage() {
  const description =
    "Compress videos for Instagram, Facebook, TikTok, YouTube and more without losing quality. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Social Media Video Compressor"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <SocialMediaVideoCompressor />
    </ToolLayout>
  );
}
