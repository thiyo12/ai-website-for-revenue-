import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ColorPaletteGenerator from "./ColorPaletteGenerator";

export const metadata: Metadata = {
  title: "Free Color Palette Generator - Create Color Schemes",
  description:
    "Generate beautiful color palettes online for free. Create harmonious color schemes with one click and copy hex codes instantly. Runs in your browser.",
};

const seoTitle = "Free Online Color Palette Generator";
const seoText = `Create stunning color palettes in seconds with our free color palette generator. With a single click you get a harmonious set of five colors, complete with their hex codes, ready to copy and paste into your designs.
 
This tool is perfect for web designers, UI/UX designers, brand creators, digital artists, and anyone who needs a fresh color scheme fast. Each palette is generated with a balanced mix of hues so the colors work together beautifully.
 
Click the like button to keep a palette you love, copy any individual color code, or copy the whole palette as a CSS-friendly list. When you find a combination you want to keep, copy all five codes and use them in your project.
 
Everything runs in your browser, so there are no account requirements, no watermarks, and no limits. Generate as many palettes as you like, completely free.`;
 
export default function ColorPaletteGeneratorPage() {
  const description =
    "Generate harmonious color palettes with one click and copy hex codes instantly. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Color Palette Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ColorPaletteGenerator />
    </ToolLayout>
  );
}
