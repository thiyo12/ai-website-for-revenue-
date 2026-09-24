import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WordToPdf from "./WordToPdf";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/word-to-pdf"),
  title: "Word to PDF - Convert a DOCX Document Online",
  description:
    "Turn a DOCX document into a downloadable PDF in your browser. Best for straightforward text-based Word files.",
};

const seoTitle = "Word to PDF: conversion workflow and formatting limitations";
const seoText = `## Why convert Word to PDF

PDF is useful when you want a document to be easy to share, print or submit without expecting the recipient to edit it. This converter takes a DOCX file and builds a downloadable PDF from the document content.

## How to use it

Choose a DOCX file, wait for the document to be read and converted, then download the generated PDF. Review the result before sending or submitting it, especially when the original Word file has complex formatting.

## Formatting limitations

Word documents can contain advanced layout features that are difficult to reproduce in a lightweight browser converter. Complex tables, headers, floating objects, uncommon fonts and page-specific formatting may not look exactly the same in the output. The tool is best suited to straightforward text-focused documents.

## Processing and privacy

The conversion is performed in the browser rather than requiring the DOCX to be uploaded to QuicTools. Browser memory and device performance can affect very large documents, so a smaller or simplified source file may work better if conversion fails.`;

export default function WordToPdfPage() {
  const description =
    "Convert a DOCX document into a downloadable PDF directly in your browser.";

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
