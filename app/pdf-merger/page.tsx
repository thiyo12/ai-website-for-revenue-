import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfMerger from "./PdfMerger";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-merger"),
  title: "Free PDF Merger Online - Combine PDF Files",
  description:
    "Merge multiple PDF files into one document online for free. Drag and drop to combine PDFs in seconds. 100% private — files never leave your browser.",
};

const seoTitle = "Free Online PDF Merger - Combine PDF Files into One";
const seoText = `Our free PDF merger lets you combine multiple PDF files into a single document in just a few clicks. Whether you need to join scanned pages, merge contracts, or put several chapters of a report together, this tool makes it quick and easy.

All you have to do is drag and drop your PDF files into the upload area, arrange them in the order you want, and click the merge button. In moments your combined PDF is ready to download as a single file. You can review and remove any file before merging to make sure the final document is exactly right.

Because the merger runs entirely in your browser, your PDFs are never uploaded to a server. This is especially important for sensitive documents like contracts, bank statements, and personal records — your data stays private and secure on your own device.

It works with any number of files and on any device, including mobile phones and tablets. The result is a merged PDF with the original pages and formatting preserved, ready to share, print, or store.`;

export default function PdfMergerPage() {
  const description =
    "Combine multiple PDF files into a single document with a simple drag-and-drop interface. Runs 100% in your browser.";

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
