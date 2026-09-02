import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaVideoDownloader from "./SocialMediaVideoDownloader";

export const metadata: Metadata = {
  title: "Free Online Video Downloader - Save YouTube & Social Videos",
  description:
    "Download videos from YouTube and social platforms online for free. Paste a public link, get a direct MP4 download instantly. No watermark, no sign-up, unlimited.",
};

const seoTitle = "Free Online Video Downloader";
const seoText = `Download videos from YouTube and social platforms for free with our online video downloader. Just paste the public video link, and we'll give you a direct download in the highest available quality — no account, no watermark, and no limit on how many videos you save.
  
You can download the full video as MP4 or grab just the audio as MP3 for music, podcasts, voiceovers, and sound effects. The download link works on any device, so you can watch your saved videos offline or keep them for editing and reposting.

This is perfect for preserving tutorials and recipes to watch later, collecting reference footage, or downloading music and audio for personal projects. It's fast, free, and requires no installation.

All processing happens on our server using an open media extractor, so you never have to install anything or grant permissions. Just paste, download, and you're done.

Note: this downloader only works on public posts from public accounts — we never access private accounts or content that requires a login. Social platforms like Instagram deploy strict anti-bot measures, so when it is temporarily blocking automated downloads, the tool tells you clearly instead of returning a confusing error. YouTube downloads are available right now.`;

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
