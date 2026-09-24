import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BackgroundRemover from "./BackgroundRemover";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/background-remover"),
  title: "Background Remover - Create a Transparent PNG Online",
  description:
    "Remove an image background with browser-based AI and download the result as a transparent PNG.",
};

const seoTitle = "Background Remover: workflow, privacy and best-result tips";
const seoText = `## What the background remover does

This tool separates the main subject of an image from its background and creates a transparent PNG. It is useful for product photos, profile images, thumbnails, simple design work and other situations where you need a cut-out subject without opening a desktop editor.

## How to use it

Choose an image and wait while the AI model loads and processes the file. The page shows the original image and the result side by side. When the cut-out looks right, download the transparent PNG.

## How processing works

The background-removal model is loaded into the browser from its software distribution source and the selected image is processed on the device. The first run can take longer because the model must be downloaded before processing begins.

## Getting a cleaner result

Clear separation between the subject and background usually produces better edges. Fine hair, transparent objects, motion blur, shadows and very busy backgrounds are more difficult for automatic segmentation. If the result is not clean enough, try a higher-resolution source image with better lighting and contrast.`;

export default function BackgroundRemoverPage() {
  const description =
    "Remove an image background with on-device AI and download a transparent PNG.";

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
