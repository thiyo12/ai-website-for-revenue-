"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAMES: Record<string, string> = {
  "/image-compressor": "Image Compressor",
  "/pdf-to-word": "PDF to Word",
  "/word-to-pdf": "Word to PDF",
  "/image-to-text-ocr": "Image to Text (OCR)",
  "/jpg-to-pdf": "JPG to PDF",
  "/pdf-to-jpg": "PDF to JPG",
  "/background-remover": "Background Remover",
  "/social-media-image-resizer": "Social Media Image Resizer",
  "/aspect-ratio-cropper": "Aspect Ratio Cropper",
  "/pdf-merger": "PDF Merger",
  "/qr-generator": "QR Code Generator",
  "/text-to-speech": "Text to Speech",
  "/color-palette-generator": "Color Palette Generator",
  "/word-counter": "Word Counter",
  "/unit-converter": "Unit Converter",
  "/currency-converter": "Currency Converter",
  "/age-calculator": "Age Calculator",
  "/password-generator": "Password Generator",
  "/gpa-calculator": "GPA Calculator",
  "/video-to-gif": "Video to GIF",
  "/social-media-video-compressor": "Social Media Video Compressor",
  "/username-generator": "Username Generator",
  "/social-media-caption-generator": "Caption Generator",
  "/signature-generator": "Signature Generator",
  "/invoice-generator": "Invoice Generator",
  "/resume-builder": "Resume Builder",
  "/countdown-timer-generator": "Countdown Timer",
  "/random-name-picker": "Random Name Picker",
  "/text-to-handwriting": "Text to Handwriting",
  "/meme-generator": "Meme Generator",
  "/fake-whatsapp-chat": "Fake WhatsApp Chat",
  "/fake-tweet-generator": "Fake Tweet Generator",
  "/fake-notification-generator": "Fake Notification Generator",
  "/fake-caller-id-generator": "Fake Caller ID",
  "/receipt-generator": "Receipt Generator",
  "/social-media-video-downloader": "Video Downloader",
};

const RELATED: Record<string, string[]> = {
  "/image-compressor": ["/background-remover", "/jpg-to-pdf", "/pdf-to-jpg"],
  "/pdf-to-word": ["/word-to-pdf", "/pdf-merger", "/jpg-to-pdf"],
  "/word-to-pdf": ["/pdf-to-word", "/pdf-merger", "/image-to-text-ocr"],
  "/image-to-text-ocr": ["/word-to-pdf", "/pdf-to-word", "/background-remover"],
  "/jpg-to-pdf": ["/pdf-to-jpg", "/image-compressor", "/pdf-merger"],
  "/pdf-to-jpg": ["/jpg-to-pdf", "/image-to-text-ocr", "/background-remover"],
  "/background-remover": ["/image-to-text-ocr", "/jpg-to-pdf", "/image-compressor"],
  "/social-media-image-resizer": ["/image-compressor", "/aspect-ratio-cropper", "/qr-generator"],
  "/aspect-ratio-cropper": ["/social-media-image-resizer", "/image-compressor", "/qr-generator"],
  "/pdf-merger": ["/pdf-to-word", "/word-to-pdf", "/jpg-to-pdf"],
  "/qr-generator": ["/text-to-speech", "/image-compressor", "/username-generator"],
  "/text-to-speech": ["/word-counter", "/social-media-caption-generator", "/unit-converter"],
  "/color-palette-generator": ["/social-media-image-resizer", "/aspect-ratio-cropper", "/username-generator"],
  "/word-counter": ["/text-to-speech", "/social-media-caption-generator", "/gpa-calculator"],
  "/unit-converter": ["/currency-converter", "/age-calculator", "/gpa-calculator"],
  "/currency-converter": ["/unit-converter", "/age-calculator", "/password-generator"],
  "/age-calculator": ["/gpa-calculator", "/unit-converter", "/currency-converter"],
  "/password-generator": ["/currency-converter", "/unit-converter", "/gpa-calculator"],
  "/gpa-calculator": ["/age-calculator", "/currency-converter", "/unit-converter"],
  "/video-to-gif": ["/social-media-video-compressor", "/aspect-ratio-cropper", "/qr-generator"],
  "/social-media-video-compressor": ["/video-to-gif", "/aspect-ratio-cropper", "/image-compressor"],
  "/username-generator": ["/social-media-caption-generator", "/text-to-speech", "/color-palette-generator"],
  "/social-media-caption-generator": ["/text-to-speech", "/username-generator", "/word-counter"],
  "/signature-generator": ["/text-to-handwriting", "/resume-builder", "/invoice-generator"],
  "/invoice-generator": ["/resume-builder", "/signature-generator", "/countdown-timer-generator"],
  "/resume-builder": ["/invoice-generator", "/signature-generator", "/text-to-handwriting"],
  "/countdown-timer-generator": ["/random-name-picker", "/meme-generator", "/invoice-generator"],
  "/random-name-picker": ["/countdown-timer-generator", "/meme-generator", "/username-generator"],
  "/text-to-handwriting": ["/signature-generator", "/resume-builder", "/text-to-speech"],
  "/meme-generator": ["/fake-tweet-generator", "/random-name-picker", "/fake-notification-generator"],
  "/fake-whatsapp-chat": ["/fake-tweet-generator", "/fake-notification-generator", "/fake-caller-id-generator"],
  "/fake-tweet-generator": ["/fake-whatsapp-chat", "/fake-notification-generator", "/meme-generator"],
  "/fake-notification-generator": ["/fake-whatsapp-chat", "/fake-tweet-generator", "/fake-caller-id-generator"],
  "/fake-caller-id-generator": ["/fake-notification-generator", "/receipt-generator", "/fake-whatsapp-chat"],
  "/receipt-generator": ["/fake-caller-id-generator", "/invoice-generator", "/fake-whatsapp-chat"],
  "/social-media-video-downloader": ["/video-to-gif", "/social-media-video-compressor", "/fake-whatsapp-chat"],
};

export default function RelatedTools() {
  const pathname = usePathname();
  const related = RELATED[pathname] ?? [];
  if (!related.length) return null;

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6"
    >
      <h2
        id="related-tools-heading"
        className="mb-3 text-xl font-bold tracking-tight text-gray-900"
      >
        You might also need…
      </h2>
      <ul className="grid gap-2 sm:grid-cols-3">
        {related.map((path) => (
          <li key={path}>
            <Link
              href={path}
              className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-accent-600 transition-colors hover:border-accent-300 hover:bg-accent-50"
            >
              {NAMES[path]}
              <svg
                className="h-4 w-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
