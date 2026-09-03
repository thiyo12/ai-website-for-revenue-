import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AspectRatioCropper from "./AspectRatioCropper";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/aspect-ratio-cropper"),
  title: "Free Aspect Ratio Cropper - Crop Images to Any Ratio",
  description:
    "Crop images to the perfect aspect ratio online for free — 16:9, 9:16, 1:1, 4:5 and more. Download the cropped result instantly. 100% private.",
};

const seoTitle = "Free Online Aspect Ratio Cropper";
const seoText = `Crop any image to the exact aspect ratio your platform needs with our free aspect ratio cropper. Choose from popular ratios like 16:9 (widescreen), 9:16 (vertical), 1:1 (square), 4:5 (portrait), 3:2, and 2:3, or enter a custom ratio.
 
Select your ratio, drag the crop window over the part of the image you want to keep, and download the perfectly cropped result. The tool keeps the highest quality possible and outputs a JPG you can use on Instagram, Facebook, YouTube thumbnails, banners, and more.
 
Everything runs entirely in your browser, so your image never leaves your device — no upload, no sign-up, and no watermark. It is the fastest way to get the precise crop you need without opening heavyweight photo software.`;
 
export default function AspectRatioCropperPage() {
  const description =
    "Crop images to the perfect aspect ratio — 16:9, 9:16, 1:1, 4:5 and more. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Aspect Ratio Cropper"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <AspectRatioCropper />
    </ToolLayout>
  );
}
