import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaVideoDownloader from "./SocialMediaVideoDownloader";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/social-media-video-downloader"),
  title: "Free YouTube Video Downloader - Save YouTube MP4 Online",
  description:
    "Download eligible public YouTube videos as MP4 files. Download content you own or have permission to save. Some links may be unavailable.",
};

const seoTitle = "Free Online Video Downloader";
const seoText = `Download YouTube videos for free with our online YouTube downloader. Just paste the public video link, and the server attempts to prepare a mobile-friendly MP4 — no account required. Downloads are subject to server limits and upstream restrictions.
  
You can download the full video as MP4 or grab just the audio as MP3 for music, podcasts, voiceovers, and sound effects. Video downloads are transcoded to a mobile-friendly format when supported. MP3 conversion requires a compatible audio stream. Only use content you own or have permission to save.

This is perfect for preserving tutorials and recipes to watch later, collecting reference footage, or downloading music and audio for personal projects. Processing time varies with file size and server load; no installation is required.

All processing happens on our server using an open media extractor, so you never have to install anything or grant permissions. Paste an eligible link and download the result when available.

Note: this downloader only works on public YouTube videos — we never access private videos or content that requires a login. YouTube deploys strong anti-bot measures, so downloads may occasionally fail or be rate-limited.`;

export default function SocialMediaVideoDownloaderPage() {
  const description =
    "Download eligible YouTube videos or extract MP3 audio when supported, subject to source and server restrictions.";

  return (
    <ToolLayout
      title="Video Downloader"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
      adsEnabled={false}
    >
      <SocialMediaVideoDownloader />
    </ToolLayout>
  );
}
