import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfToJpg from "./PdfToJpg";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-to-jpg"),
  title: "Free PDF to JPG Converter Online - Extract Pages as Images",
  description:
    "Convert PDF pages into high-quality JPG images online for free. Extract every page as a JPG, or choose a page range. 100% in your browser, no uploads.",
};

const seoTitle = "Free Online PDF to JPG Converter - Turn PDF Pages into Images";
const seoText = `Convert a PDF document into crisp, high-quality JPG images with our free online PDF to JPG converter. Every page of your PDF is turned into a separate JPG image that you can download individually or all at once. You can also pick a specific page range if you only need a few pages.
 
This tool is ideal for turning PDFs into images for social media posts, extracting a single page to share as a picture, converting forms before editing, or making image previews of documents for portfolios and websites. The output preserves the layout and quality of the original PDF.
 
Everything is processed locally in your browser, so your document never leaves your device — there is no upload, no server, and no privacy concern. It works for scanned PDFs, text PDFs, reports, and presentations without any sign-up or watermark.
 
Whether you need a single page as a JPG or an entire document turned into images, this PDF to JPG converter delivers sharp, accurate results in seconds, on any device.`;

export default function PdfToJpgPage() {
  const description =
    "Convert PDF pages into high-quality JPG images, one page at a time or all at once. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="PDF to JPG"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <PdfToJpg />
    </ToolLayout>
  );
}
