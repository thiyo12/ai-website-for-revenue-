import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about QuicTools — a collection of free, private, browser-based tools for everyday tasks. No uploads, no accounts, no sign-ups.",
};

const tools = [
  { href: "/image-compressor", name: "Image Compressor" },
  { href: "/social-media-image-resizer", name: "Social Media Image Resizer" },
  { href: "/aspect-ratio-cropper", name: "Aspect Ratio Cropper" },
  { href: "/pdf-merger", name: "PDF Merger" },
  { href: "/qr-generator", name: "QR Code Generator" },
  { href: "/text-to-speech", name: "Text to Speech" },
  { href: "/color-palette-generator", name: "Color Palette Generator" },
  { href: "/word-counter", name: "Word Counter" },
  { href: "/unit-converter", name: "Unit Converter" },
  { href: "/video-to-gif", name: "Video to GIF" },
  { href: "/social-media-video-compressor", name: "Social Media Video Compressor" },
  { href: "/username-generator", name: "Username Generator" },
  { href: "/social-media-caption-generator", name: "Caption Generator" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        About QuicTools
      </h1>

      <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-gray-600">
        <p>
          QuicTools is a collection of fast, free, and private online
          utilities built for everyday tasks. Our goal is simple: give you
          useful tools that work the moment a page loads, with no sign-up, no
          waiting, and no clutter.
        </p>
        <p>
          Every tool on this site runs <strong>entirely in your browser</strong>.
          Your images, PDFs, and text are never uploaded to a server, never
          stored, and never seen by anyone else. This privacy-first approach is
          what makes QuicTools different from most &quot;online&quot; tools.
        </p>
        <p>Today QuicTools offers these tools:</p>
        <ul className="list-inside list-disc space-y-1">
          {tools.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="font-medium text-accent-600 hover:underline">
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          We are committed to keeping the site fast, simple, and free. If you
          have feedback or a tool you would like to see added, use our{" "}
          <Link href="/contact" className="font-medium text-accent-600 hover:underline">
            contact page
          </Link>{" "}
          to get in touch.
        </p>
      </div>
    </div>
  );
}