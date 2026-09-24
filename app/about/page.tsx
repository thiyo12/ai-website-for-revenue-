import type { Metadata } from "next";
import Link from "next/link";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/about"),
  title: "About QuicTools",
  description:
    "Learn how QuicTools builds practical online utilities for images, PDFs, text, QR codes, calculations and everyday tasks.",
};

const tools = [
  { href: "/image-compressor", name: "Image Compressor" },
  { href: "/background-remover", name: "Background Remover" },
  { href: "/image-to-text-ocr", name: "Image to Text OCR" },
  { href: "/pdf-merger", name: "PDF Merger" },
  { href: "/pdf-to-word", name: "PDF to Word" },
  { href: "/word-to-pdf", name: "Word to PDF" },
  { href: "/pdf-to-jpg", name: "PDF to JPG" },
  { href: "/jpg-to-pdf", name: "JPG to PDF" },
  { href: "/qr-generator", name: "QR Code Generator" },
  { href: "/word-counter", name: "Word Counter" },
  { href: "/unit-converter", name: "Unit Converter" },
  { href: "/currency-converter", name: "Currency Converter" },
  { href: "/video-to-gif", name: "Video to GIF" },
  { href: "/social-media-video-compressor", name: "Video Compressor" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        About QuicTools
      </h1>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-gray-600">
        <p>
          QuicTools is a collection of practical online utilities built to
          solve small everyday tasks quickly: compressing an image, combining
          PDFs, extracting text, generating a QR code, converting values, and
          more. The goal is to make each tool useful immediately without
          forcing users through unnecessary account creation or complicated
          setup.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Privacy by design
          </h2>
          <p>
            Many QuicTools utilities perform their work directly in your
            browser. Some features require a server or an external data source,
            for example when current online information is needed. We document
            these differences in our{" "}
            <Link href="/privacy" className="font-medium text-accent-600 hover:underline">
              Privacy Policy
            </Link>
            {" "}instead of making a blanket claim that every tool works the same way.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Core tools
          </h2>
          <p className="mb-3">
            We are concentrating development on a smaller group of reliable,
            genuinely useful tools rather than publishing large numbers of
            near-duplicate pages.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {tools.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="font-medium text-accent-600 hover:underline">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Feedback and corrections
          </h2>
          <p>
            If a tool behaves incorrectly, a description is unclear, or you
            have an idea that would make a tool more useful, please use our{" "}
            <Link href="/contact" className="font-medium text-accent-600 hover:underline">
              contact page
            </Link>
            . We use that feedback to improve the product.
          </p>
        </section>
      </div>
    </div>
  );
}
