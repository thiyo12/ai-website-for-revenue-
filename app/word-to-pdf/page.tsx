import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WordToPdf from "./WordToPdf";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/word-to-pdf"),
  title: "Free Word to PDF Converter Online - Convert DOCX to PDF",
  description:
    "Convert a Word (.docx) document to PDF online for free. Upload your DOCX and download a clean PDF in seconds. 100% in your browser, no uploads.",
};

const seoTitle = "Free Online Word to PDF Converter - Turn DOCX into PDF";
const seoText = `Convert a Microsoft Word (.docx) document into a PDF with our free online Word to PDF converter. Upload your file and the tool builds a clean, shareable PDF that keeps your text intact. It is perfect for sending documents that look the same on every device, archiving files, or preparing submissions for portals and applications that only accept PDF.
 
The converter reads the text content from your Word document and creates a tidy, well-formatted PDF with the content laid out page by page. It is ideal for resumes, reports, letters, essays, and any other document you want to turn into a fixed, printable format.
 
Everything is processed locally in your browser, so your document never leaves your device. Your file is not uploaded to any server, keeping your work completely private. There is no sign-up, no watermark, and no limit on how many documents you can convert.
 
Whether you are turning an important contract into a shareable PDF or just prefer reading in a fixed layout, this Word to PDF converter gives you a clean result in seconds, on any device.`;

export default function WordToPdfPage() {
  const description =
    "Convert an uploaded .docx file into a clean, downloadable PDF. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Word to PDF"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <WordToPdf />
    </ToolLayout>
  );
}
