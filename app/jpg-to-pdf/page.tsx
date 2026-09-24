import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import JpgToPdf from "./JpgToPdf";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/jpg-to-pdf"),
  title: "JPG to PDF - Combine Images into One PDF",
  description:
    "Combine image files into a PDF, choose the page size and orientation, and download the result from your browser.",
};

const seoTitle = "JPG to PDF: combine photos and scans into a document";
const seoText = `## What this tool does

JPG to PDF places one or more images onto PDF pages and combines them into a single document. It is useful for phone scans, photographed notes, image-based forms, portfolios and sets of pictures that are easier to share as one file.

## How to use it

Add your images, arrange the files you want to include, choose a page size and orientation, then generate the PDF. The current interface includes common page-size options so the result can be prepared for normal document sharing or printing.

## Image quality and page layout

The source image determines how much detail the resulting PDF page can contain. A small or heavily compressed photo will not gain detail just because it is placed in a PDF. Check orientation and cropping before using the result for printing or formal submission.

## Processing and privacy

Image-to-PDF generation takes place in the browser, so the selected images do not need to be uploaded to QuicTools for document creation. A large number of high-resolution photos can require substantial memory; reducing image size first can make very large jobs easier to process.`;

export default function JpgToPdfPage() {
  const description =
    "Combine one or more images into a PDF with adjustable page size and orientation.";

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
