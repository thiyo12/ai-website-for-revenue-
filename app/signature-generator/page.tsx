import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SignatureGenerator from "./SignatureGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/signature-generator"),
  title: "Signature Generator - Draw or Type a Signature PNG",
  description:
    "Draw a signature on a canvas or create a typed signature style and download it as a PNG image.",
};

const seoTitle = "Signature Generator: drawing, typed styles and appropriate use";
const seoText = `## Two ways to create a signature image

Use Draw mode to sign directly on the canvas with a mouse, trackpad, stylus or touch input. Use Type mode to render text in one of the available handwriting-style fonts. Color and pen width can be adjusted before downloading.

## PNG output

The signature is downloaded as a PNG generated from the browser canvas. A transparent-background signature image can be useful when placing your own signature into documents or designs that you are authorized to sign.

## Electronic-signature limitations

A signature image by itself does not establish identity, intent, consent or legal validity in every situation. Formal electronic-signature laws and business processes can require authentication, audit trails or approved signing systems. Use the tool only where an image signature is appropriate.

## Privacy

Drawing and rendering take place in the browser canvas. The signature does not need to be uploaded to QuicTools for PNG generation.`;

export default function SignatureGeneratorPage() {
  return (
    <ToolLayout
      title="Signature Generator"
      description="Draw or type a signature and download the result as a PNG image."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <SignatureGenerator />
    </ToolLayout>
  );
}
