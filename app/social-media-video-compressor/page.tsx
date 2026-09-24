import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaVideoCompressor from "./SocialMediaVideoCompressor";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/social-media-video-compressor"),
  title: "Video Compressor - Reduce Video Size for Social Sharing",
  description:
    "Compress a video in your browser with FFmpeg using platform presets and adjustable quality, then download an MP4 result.",
};

const seoTitle = "Video Compressor: presets, quality settings and file-size trade-offs";
const seoText = `## What this compressor does

The video compressor re-encodes a selected video as MP4 using browser-based FFmpeg. Presets provide practical resolutions for common social platforms, while the quality control lets you trade visual detail for a smaller output file.

## Presets and quality

The interface includes presets for Instagram, Facebook, TikTok, YouTube and X/Twitter. These presets choose a target resolution and compression setting; they do not guarantee acceptance by every platform because platform upload rules can change and can also depend on duration, codec, aspect ratio and account type.

## How to reduce file size further

If the result is still too large, choose a smaller-file quality setting or start with a shorter clip. Resolution, duration, motion and source bitrate all influence the final size. Highly detailed or fast-moving video usually needs more data than a simple static scene.

## Processing and device limits

Compression runs in the browser using FFmpeg, so the video does not need to be uploaded to QuicTools for the compression step. Video encoding is demanding work. Long or very large videos can be slow or may exceed available memory, particularly on mobile devices. If that happens, trim or reduce the source before trying again.`;

export default function SocialMediaVideoCompressorPage() {
  const description =
    "Compress a video with platform presets and adjustable quality, then download an MP4.";

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
