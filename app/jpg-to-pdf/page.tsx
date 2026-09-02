import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import JpgToPdf from "./JpgToPdf";

export const metadata: Metadata = {
  title: "Free JPG to PDF Converter Online - Combine Images into PDF",
  description:
    "Convert and combine multiple JPG images into a single PDF document online for free. Choose page size and orientation. 100% in your browser, no uploads.",
};

const seoTitle = "Free Online JPG to PDF Converter - Turn Images into PDF";
const seoText = `Turn one or many JPG images into a polished PDF document with our free online JPG to PDF converter. Upload your images, choose the page size (A4, Letter, or US Legal) and orientation, and the tool arranges every image into a clean, professional PDF you can download instantly.
 
This is perfect for scanning documents with your phone and turning them into a single shareable file, combining receipts for expense claims, submitting photo portfolios, or emailing clean image-based documents to clients and teachers. You can add as many images as you need and reorder them before generating the PDF.
 
Everything happens on your device — the images are never uploaded to any server, so your photos stay completely private. There is no sign-up, no watermarks, and no file size limits. The tool accepts common image formats and converts them all into JPG-ready pages automatically.
 
Whether you need one image as a PDF or dozens combined into a single document, this JPG to PDF converter gives you crisp, print-ready results in seconds, on any device.`;

export default function JpgToPdfPage() {
  const description =
    "Combine multiple JPG images into a single PDF document with adjustable page size. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="JPG to PDF"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <JpgToPdf />
    </ToolLayout>
  );
}
