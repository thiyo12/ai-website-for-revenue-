import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImageToTextOcr from "./ImageToTextOcr";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/image-to-text-ocr"),
  title: "Free Image to Text (OCR) Converter Online - Extract Text from Images",
  description:
    "Extract text from images and scanned documents with our free online OCR tool. Copy or download the recognized text. 100% in your browser, no uploads.",
};

const seoTitle = "Free Online OCR - Extract Text from Images & Scans";
const seoText = `Extract text from any image with our free online OCR (Optical Character Recognition) tool. Upload a photo, screenshot, or scanned document and the tool reads and recognizes the text so you can copy it, edit it, or download it as a text file.
 
OCR is incredibly useful. Turn photos of signs, menus, and business cards into editable text, copy text out of screenshots, digitize handwritten or printed notes, and pull information out of scanned documents that would otherwise have to be retyped by hand.
 
The recognition runs in your browser using the on-device OCR engine — your image is never uploaded to a server. The first time you use it, the tool may load a small language model, but after that recognition is fast and completely private. There is no sign-up and no watermark.
 
For best results, use clear, well-lit, high-contrast images with straight, readable text. Whether you need to copy a few words or digitize an entire page, this OCR tool gives you accurate, copy-ready text in seconds, on any device.`;

export default function ImageToTextOcrPage() {
  const description =
    "Extract text from images and scanned documents using on-device OCR. Copy or download the text. Runs in your browser.";

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
