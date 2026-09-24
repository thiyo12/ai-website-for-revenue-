import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfToJpg from "./PdfToJpg";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-to-jpg"),
  title: "PDF to JPG - Convert PDF Pages into Images",
  description:
    "Render PDF pages as JPG images in your browser. Convert individual pages or create image copies of a document.",
};

const seoTitle = "PDF to JPG: when page images are useful and what to expect";
const seoText = `## What PDF to JPG does

This converter renders PDF pages as JPG images. It is useful when you need a page preview, an image for a presentation or website, or a picture version of a page that can be shared in apps that do not handle PDFs conveniently.

## How to use it

Choose a PDF and let the browser render its pages. Select the pages you need when page selection is available, then download the generated JPG output. The original PDF remains unchanged.

## Image output versus editable content

A JPG is a flat image. Text in the generated image is no longer directly editable or searchable as document text. If your goal is to edit wording rather than create a visual copy of the page, PDF to Word or OCR may be a better choice.

## Privacy and performance

The PDF is rendered in the browser, so it does not need to be uploaded to QuicTools for page conversion. Large documents and high-resolution pages can use significant memory. If a very large PDF struggles on a mobile device, convert fewer pages at a time or use a desktop browser.`;

export default function PdfToJpgPage() {
  const description =
    "Render PDF pages as JPG images for sharing, previews and image-based workflows.";

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
