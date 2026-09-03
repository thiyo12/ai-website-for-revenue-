import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SignatureGenerator from "./SignatureGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/signature-generator"),
  title: "Signature Generator - Create & Download SVG/PNG Signature",
  description:
    "Draw or type an electronic signature online for free. Choose a handwriting font, color and size, then download as a transparent PNG. 100% private.",
};

const seoTitle = "Free Online Signature Generator";
const seoText = `Create your own electronic signature with our free signature generator. You can draw your signature by hand using your mouse, trackpad, or finger on touch devices, or type your name and pick from a selection of handwriting-style fonts to generate a stylized signature automatically.

Adjust the pen color, stroke width, and canvas size to get the look you want. Your signature is drawn as a clean vector-style stroke and exports as a transparent PNG that you can drop straight into documents, PDFs, and emails.

Everything runs entirely in your browser — your signature never leaves your device, so it stays private and secure.

How to use it: choose the draw or type tab, create your signature, tweak the color and size, and click the download button to save your transparent PNG.`;

export default function SignatureGeneratorPage() {
  const description =
    "Draw or type an electronic signature, adjust the color and size, and download it as a transparent PNG. Runs in your browser.";

  return (
    <ToolLayout
      title="Signature Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <SignatureGenerator />
    </ToolLayout>
  );
}