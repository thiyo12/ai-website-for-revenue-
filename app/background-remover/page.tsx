import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BackgroundRemover from "./BackgroundRemover";

export const metadata: Metadata = {
  title: "Free Background Remover Online - Remove Image Background to PNG",
  description:
    "Remove the background from any image instantly with our free on-device AI background remover. Download a transparent PNG. 100% private, no uploads.",
};

const seoTitle = "Free Online Background Remover - Transparent PNG in Seconds";
const seoText = `Remove the background from any photo or image instantly with our free online background remover. Upload an image, hit remove, and get a clean cutout on a transparent background that you can download as a PNG.
 
This is perfect for product photos on marketplaces, profile pictures and avatars, marketing graphics, logos, thumbnails, and any design project where you need to separate a subject from its background. The AI does the heavy lifting, so you get professional-looking cutouts without spending hours with complex editing tools.
 
The background removal runs entirely in your browser using on-device AI. Your image is never uploaded to a server, which keeps your photos completely private. The first time you use it, a small AI model may be loaded into your browser, after which removal is fast and free, with no sign-up and no watermark.
 
For best results, use a clear image with good contrast between the subject and background. Whether you are cleaning up a product shot or making a fun sticker, this background remover gives you a crisp transparent PNG in seconds, on any device.`;

export default function BackgroundRemoverPage() {
  const description =
    "Remove the background from any image instantly with on-device AI. Download a transparent PNG.";

  return (
    <ToolLayout
      title="Background Remover"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <BackgroundRemover />
    </ToolLayout>
  );
}
