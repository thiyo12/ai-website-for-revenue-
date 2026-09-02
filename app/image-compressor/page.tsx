import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImageCompressor from "./ImageCompressor";

export const metadata: Metadata = {
  title: "Free Image Compressor Online - Compress JPG & PNG",
  description:
    "Compress JPG and PNG images online for free. Reduce image file size dramatically without visible quality loss. 100% private — files never leave your browser.",
};

const seoTitle = "Free Online Image Compressor for JPG and PNG";
const seoText = `Our free image compressor lets you reduce the file size of JPG and PNG images directly in your browser. Whether you are uploading photos to a website, sending images by email, or trying to stay within a file-size limit, this tool makes it effortless.

Just select an image from your device and the compressor immediately shrinks it using smart, lossy compression that keeps the quality looking great. You will see the original size, the compressed size, and the percentage saved, so you always know exactly how much you have trimmed.

The tool runs entirely on your device — your image is never uploaded to any server, which means your private photos and documents stay completely secure. The whole process takes only a second for most files.

How to use it: click the upload area to choose a JPG or PNG from your computer or phone, wait for the compression to finish, preview the result, and hit the download button to save your optimized image. It is perfect for bloggers, web developers, online sellers, and anyone who wants smaller images fast.`;

export default function ImageCompressorPage() {
  const description =
    "Compress JPG and PNG images to reduce file size without losing noticeable quality. Runs 100% in your browser.";

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
