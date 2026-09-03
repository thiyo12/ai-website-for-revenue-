import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MemeGenerator from "./MemeGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/meme-generator"),
  title: "Meme Generator - Make Your Own Memes",
  description:
    "Create a meme online for free. Upload your own image or use a built-in template, add top and bottom text, then download as PNG. 100% private.",
};

const seoTitle = "Free Online Meme Generator";
const seoText = `Create your own meme with our free meme generator. Upload any image from your device, or pick one of our simple built-in templates, then add classic top and bottom caption text with the bold meme styling.

Adjust the text color, size, and add a white outline and drop shadow so it looks like a real meme, then download the finished image as a PNG you can share anywhere.

Everything runs entirely in your browser — your image and text never leave your device and are never stored on a server.

How to use it: upload an image or choose a template, type your top and bottom captions, and click the download button to export your meme.`;

export default function MemeGeneratorPage() {
  const description =
    "Upload an image or use a built-in template, add classic top and bottom captions, and download your meme as a PNG.";

  return (
    <ToolLayout
      title="Meme Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <MemeGenerator />
    </ToolLayout>
  );
}