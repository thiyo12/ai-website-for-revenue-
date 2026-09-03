import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfToWord from "./PdfToWord";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-to-word"),
  title: "Free PDF to Word Converter Online - Extract Text to DOCX",
  description:
    "Convert PDF to an editable Word (.docx) file online for free. Extract all text from your PDF into a downloadable DOCX. 100% in your browser, no uploads.",
};

const seoTitle = "Free Online PDF to Word Converter - Turn PDF into Editable DOCX";
const seoText = `Convert a PDF into an editable Microsoft Word (.docx) document with our free online PDF to Word converter. The tool reads the text from every page of your PDF and rebuilds it as a clean, editable Word file that you can open, edit, and format in Word, Google Docs, and other word processors.
 
This is perfect when you have a document as a PDF — a report, an essay, a contract, or meeting notes — and you need to edit the text. Instead of retyping everything, convert it directly and keep the original wording. You can then correct mistakes, add paragraphs, change fonts, or export it again whenever you need.
 
Everything is processed locally in your browser, so your document never leaves your device. Your PDF is not uploaded to any server, which keeps sensitive documents completely private. There is no sign-up, no watermark, and no limit on the number of files you can convert.
 
Note that this tool extracts the text layer of your PDF. Image-only or scanned PDFs contain no searchable text, so for those you may first want to use our Image to Text (OCR) tool. For any standard text-based PDF, this converter gives you an editable Word file in seconds, on any device.`;

export default function PdfToWordPage() {
  const description =
    "Extract text from a PDF and download it as an editable Word (.docx) file. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="PDF to Word"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <PdfToWord />
    </ToolLayout>
  );
}
