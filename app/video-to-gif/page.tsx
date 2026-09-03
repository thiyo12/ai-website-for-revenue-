import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VideoToGif from "./VideoToGif";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/video-to-gif"),
  title: "Free Video to GIF Converter - Make Animated GIFs Online",
  description:
    "Convert any video to a GIF online for free. Upload a video, set the width and frames-per-second, and download your animated GIF. Runs in your browser.",
};

const seoTitle = "Free Online Video to GIF Converter";
const seoText = `Turn any video clip into a shareable animated GIF with our free video to GIF converter. Upload a video file, choose how large and smooth you want the GIF to be, and download your animation in seconds.
 
You can adjust the output width to control file size and quality, and set the frames-per-second (FPS) to balance smoothness against file size. Lower widths and FPS values produce smaller GIFs that load quickly, while higher values give crisper, smoother animations.
 
This is perfect for creating reaction GIFs from clips, showing product features, adding short animations to blog posts, or making shareable content for social media and messaging apps.
 
The conversion happens entirely in your browser using WebAssembly, so your video is never uploaded to any server. Your footage stays private. There is no account, no watermark, and no limit on how many videos you can convert.`;
 
export default function VideoToGifPage() {
  const description =
    "Convert any video to an animated GIF and download it. You control the size and smoothness. Runs 100% in your browser.";

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
