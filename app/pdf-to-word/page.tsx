import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PdfToWord from "./PdfToWord";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/pdf-to-word"),
  title: "PDF to Word - Extract PDF Text into an Editable DOCX",
  description:
    "Extract the text layer from a standard PDF and create an editable Word DOCX file in your browser.",
};

const seoTitle = "PDF to Word: what converts well and when OCR is needed";
const seoText = `## What this converter is designed for

PDF to Word extracts readable text from a standard PDF and creates an editable DOCX document. It is useful when you have a report, notes, an essay or another text-based PDF and need the wording in an editable format.

## How to use it

Choose a PDF, let the converter read its pages and then download the generated Word file. Open the DOCX in Microsoft Word, Google Docs or another compatible editor to review and reformat the extracted content.

## Layout limitations

PDF is a fixed-layout format while Word documents are editable and reflowable. Complex columns, tables, forms, unusual fonts and precise visual positioning may not reproduce exactly. Treat the result as an editable starting point rather than a pixel-perfect copy of the PDF.

## Scanned PDFs and privacy

Image-only scanned PDFs do not contain a normal text layer. For those files, OCR is required before the text can be edited. Standard PDF processing for this tool takes place in the browser, so the document does not need to be uploaded to QuicTools for conversion.`;

export default function PdfToWordPage() {
  const description =
    "Extract text from a standard PDF and create an editable Word DOCX file.";

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
