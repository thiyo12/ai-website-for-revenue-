import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import QrGenerator from "./QrGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/qr-generator"),
  title: "QR Code Generator - Create a PNG QR Code",
  description:
    "Create a QR code from text or a URL, choose an output size from 128 to 1024 pixels and download it as PNG.",
};

const seoTitle = "QR Code Generator: create, test and download a scannable code";
const seoText = `## What you can put in a QR code

The generator accepts text or a URL and turns that value into a QR code. Common uses include website links, event information, short instructions, contact details and any other text that you want a phone camera or QR reader to retrieve quickly.

## How to use it

Enter the text or URL and the QR preview updates automatically. Choose an output size between 128 and 1024 pixels, then download the code as a PNG image for use in a document, poster, website or other design.

## Reliability tips

Always scan the downloaded code before publishing or printing it. Very long content creates a denser QR pattern, and printing a code too small can make scanning harder. Leave clear space around the code and use strong contrast between the dark modules and the background.

## Privacy

QR generation happens in the browser. The text used to build the code does not need to be sent to QuicTools for generation. Remember that anyone who can scan the finished QR image can read the information encoded inside it, so avoid placing secrets in a QR code that will be publicly visible.`;

export default function QrGeneratorPage() {
  const description =
    "Turn text or a URL into a QR code, choose the size and download a PNG.";

  return (
    <ToolLayout
      title="QR Code Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <QrGenerator />
    </ToolLayout>
  );
}
