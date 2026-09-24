import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VideoToGif from "./VideoToGif";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/video-to-gif"),
  title: "Video to GIF - Convert a Video Clip in Your Browser",
  description:
    "Convert a video to GIF with browser-based FFmpeg. Adjust output width and frame rate before downloading.",
};

const seoTitle = "Video to GIF: control size, frame rate and browser processing";
const seoText = `## What the converter does

Video to GIF turns a video clip into an animated GIF. It is useful for short demonstrations, reactions, product examples and simple animations that need to work without a video player.

## Output controls

You can adjust the output width from 240 to 960 pixels and the frame rate from 5 to 25 FPS. A larger width and higher frame rate usually create a smoother, sharper animation but also increase file size. Lower settings are better when quick loading matters.

## Browser-based conversion

The conversion uses FFmpeg compiled for the browser. The video is read and processed on the device rather than uploaded to QuicTools for conversion. The FFmpeg runtime itself must load before the first conversion.

## Practical limits

GIF is inefficient for long, high-resolution video. A short clip usually works better and produces a more manageable file. Conversion speed depends heavily on the device, video duration and chosen output settings. If a conversion fails, try a shorter clip, lower width or lower frame rate.`;

export default function VideoToGifPage() {
  const description =
    "Convert a video clip into GIF and control the output width and frame rate.";

  return (
    <ToolLayout
      title="Video to GIF"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <VideoToGif />
    </ToolLayout>
  );
}
