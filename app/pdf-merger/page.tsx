import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfMerger from "./PdfMerger";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-merger"),
  title: "PDF Merger - Combine Multiple PDF Files Online",
  description:
    "Add two or more PDFs, arrange their order and combine all pages into one downloadable PDF in your browser.",
};

const seoTitle = "PDF Merger: combine documents in the order you choose";
const seoText = `## What the PDF merger does

The merger combines the pages from two or more PDF files into one new PDF. It is useful for joining scanned pages, reports, forms, invoices, chapters or related documents that you want to keep and share as a single file.

## How to use it

Add your PDF files, check their order and move or remove files as needed. When the order is correct, start the merge. The new document contains the pages from each source PDF in the sequence shown on screen.

## What is preserved

This tool copies PDF pages into a new document. It is designed for combining files, not for rewriting text, editing page content or performing OCR. If a source PDF is scanned as images, those pages remain image-based after merging.

## Privacy and performance

PDF merging is performed in the browser using a PDF library. The source documents do not need to be uploaded to QuicTools for the merge operation. Very large PDFs or a large number of pages can require substantial browser memory, so splitting an unusually large job into smaller batches may work better on limited devices.`;

export default function PdfMergerPage() {
  const description =
    "Combine two or more PDF files into one document and control their order before downloading.";

  return (
    <ToolLayout
      title="PDF Merger"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <PdfMerger />
    </ToolLayout>
  );
}
