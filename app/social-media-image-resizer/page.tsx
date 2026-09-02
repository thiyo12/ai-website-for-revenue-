import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SocialMediaImageResizer from "./SocialMediaImageResizer";

export const metadata: Metadata = {
  title: "Free Social Media Image Resizer - Sizes for Every Platform",
  description:
    "Resize images to perfect dimensions for Instagram, Facebook, Twitter, YouTube, TikTok and LinkedIn. Download optimized images instantly. 100% private.",
};

const seoTitle = "Free Online Social Media Image Resizer";
const seoText = `Resize your photos to the exact dimensions each social platform needs with our free social media image resizer. No more guessing and no more awkward crops — pick your platform and get the right size automatically.
 
The tool supports the most common sizes for Instagram (post, story, and square), Facebook (post, cover, and profile), Twitter/X (post and header), YouTube (thumbnail and channel), TikTok, and LinkedIn. You can also enter custom dimensions if you need something specific.
 
Just upload an image, choose your platform or enter a custom size, and download the resized version instantly. The image is centered while being resized so you keep the core of the photo.
 
Everything runs entirely in your browser, so your images never leave your device. There is no upload, no account, and no watermark — your photos stay completely private while you resize them for free.`;
 
export default function SocialMediaImageResizerPage() {
  const description =
    "Resize images to perfect dimensions for Instagram, Facebook, Twitter, YouTube, TikTok and LinkedIn. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Social Media Image Resizer"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <SocialMediaImageResizer />
    </ToolLayout>
  );
}
