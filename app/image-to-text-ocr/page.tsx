import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImageToTextOcr from "./ImageToTextOcr";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/image-to-text-ocr"),
  title: "Image to Text OCR - Extract English Text from Images",
  description:
    "Read English text from photos, screenshots and scans with browser-based OCR, then copy it or download a TXT file.",
};

const seoTitle = "Image to Text OCR: supported content, accuracy and privacy";
const seoText = `## What OCR is useful for

Optical character recognition turns text inside an image into selectable text. Use this tool for screenshots, photographed documents, printed notes, signs and scanned pages when retyping the content manually would be slow.

## How to use it

Choose an image and let the OCR engine analyse it. Recognized text appears below the preview where you can copy it directly or download it as a plain TXT file. The current recognition language is English.

## Accuracy depends on the source

OCR works best with sharp, straight, high-contrast printed text. Small type, handwriting, decorative fonts, curved pages, glare and low-resolution photos can reduce accuracy. Always review important extracted text before relying on it.

## Processing and privacy

The recognition engine runs in the browser. It may download OCR language/model data required for recognition, but the selected image is processed on the device. Larger or more detailed scans can take longer, especially on phones or lower-powered computers.`;

export default function ImageToTextOcrPage() {
  const description =
    "Extract English text from photos, screenshots and scanned pages, then copy or download the result.";

  return (
    <ToolLayout
      title="Image to Text (OCR)"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ImageToTextOcr />
    </ToolLayout>
  );
}
