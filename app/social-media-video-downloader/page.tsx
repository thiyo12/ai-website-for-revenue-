import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaVideoDownloader from "./SocialMediaVideoDownloader";

export const metadata: Metadata = {
  title: "Free YouTube Video Downloader - Save YouTube MP4 Online",
  description:
    "Download any public YouTube video online for free. Paste a YouTube link, get a mobile-friendly MP4 download instantly after a short ad. No sign-up, no watermark.",
};

const seoTitle = "Free Online Video Downloader";
const seoText = `Download YouTube videos for free with our online YouTube downloader. Just paste the public video link, and after a short ad watch we give you a mobile-friendly MP4 — no account, no watermark, and no limit on how many videos you save.
  
You can download the full video as MP4 or grab just the audio as MP3 for music, podcasts, voiceovers, and sound effects. The download link is re-encoded to play on any device, so you can watch your saved videos offline or keep them for editing and reposting.

This is perfect for preserving tutorials and recipes to watch later, collecting reference footage, or downloading music and audio for personal projects. It's fast, free, and requires no installation.

All processing happens on our server using an open media extractor, so you never have to install anything or grant permissions. Just paste, watch a short ad, and download.

Note: this downloader only works on public YouTube videos — we never access private videos or content that requires a login. YouTube deploys strong anti-bot measures, so a short ad watch is required and downloads can occasionally be rate-limited.`;

export default function SocialMediaVideoDownloaderPage() {
  const description =
    "Download YouTube videos and audio in high quality. Paste a link and save instantly.";

  return (
    <ToolLayout
      title="Video Downloader"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <SocialMediaVideoDownloader />
    </ToolLayout>
  );
}
