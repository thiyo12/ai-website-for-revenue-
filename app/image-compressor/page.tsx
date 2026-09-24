import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImageCompressor from "./ImageCompressor";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/image-compressor"),
  title: "Image Compressor - Compress JPG, PNG & WebP Online",
  description:
    "Compress JPG, PNG and WebP images in your browser. See the original and compressed file size, then download the optimized image.",
};

const seoTitle = "Image Compressor: how it works, supported files and limits";
const seoText = `## What this image compressor does

QuicTools accepts JPG, PNG and WebP images and creates a smaller copy in your browser. The tool shows the original file size, the compressed size and the percentage saved so you can judge whether the result is useful before downloading it.

## How to use it

Choose or drag an image into the upload area. Compression starts automatically. When the result is ready, compare the original and compressed previews and download the new file. You can then select another image without creating an account.

## Compression settings

The current compressor targets a file size of about 1 MB and limits the longest image dimension to 1920 pixels. Those settings are useful for websites, email attachments and everyday sharing, but they are not intended to preserve a full-resolution archival original. Keep your source file if you may need maximum detail later.

## Privacy and practical limits

The image data is processed with browser-side JavaScript and a web worker rather than being sent to QuicTools for compression. Very large images can still use significant memory on a phone or older computer, and the amount saved varies with the image format, dimensions and existing compression. Some already-optimized images may only become slightly smaller.`;

export default function ImageCompressorPage() {
  const description =
    "Compress JPG, PNG and WebP images and compare the size reduction before downloading.";

  return (
    <ToolLayout
      title="Image Compressor"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ImageCompressor />
    </ToolLayout>
  );
}
