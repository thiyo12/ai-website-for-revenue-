import ToolCard from "@/components/ToolCard";
import GameCard from "@/components/GameCard";
import AdSlot from "@/components/AdSlot";

const tools = [
  {
    href: "/image-compressor",
    name: "Image Compressor",
    description:
      "Compress JPG and PNG images to reduce file size without losing noticeable quality.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/pdf-to-word",
    name: "PDF to Word",
    description:
      "Extract text and layout from a PDF into an editable .docx file, right in your browser.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/word-to-pdf",
    name: "Word to PDF",
    description:
      "Convert an uploaded .docx file into a clean, downloadable PDF in seconds.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2v-8a2 2 0 00-2-2h-4a2 2 0 01-2-2V4a2 2 0 00-2-2H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/image-to-text-ocr",
    name: "Image to Text (OCR)",
    description:
      "Extract text from images and scanned documents using on-device OCR. Copy or download.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    href: "/jpg-to-pdf",
    name: "JPG to PDF",
    description:
      "Combine multiple JPG images into a single PDF document with adjustable page size.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/pdf-to-jpg",
    name: "PDF to JPG",
    description:
      "Convert PDF pages into high-quality JPG images, one page at a time or all at once.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/background-remover",
    name: "Background Remover",
    description:
      "Remove the background from any image instantly with on-device AI. Download a transparent PNG.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM12 3v3m0 12v3M3 12h3m12 0h3" />
      </svg>
    ),
  },
  {
    href: "/social-media-image-resizer",
    name: "Social Media Image Resizer",
    description:
      "Resize images to perfect dimensions for Instagram, Facebook, Twitter, and more.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
      </svg>
    ),
  },
  {
    href: "/aspect-ratio-cropper",
    name: "Aspect Ratio Cropper",
    description:
      "Crop images to the perfect aspect ratio — 16:9, 9:16, 1:1, 4:5 and more.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm4 2h4m-4 4h4m6 0h-2m2 4h-2m-4 0h-4" />
      </svg>
    ),
  },
  {
    href: "/pdf-merger",
    name: "PDF Merger",
    description:
      "Combine multiple PDF files into a single document with a simple drag-and-drop interface.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
      </svg>
    ),
  },
  {
    href: "/qr-generator",
    name: "QR Code Generator",
    description:
      "Turn any text or URL into a scannable QR code and download it as a PNG.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4V1m0 23v-3m6-6h3m-23 0h3M4 4h4v4H4V4zm12 0h4v4h-4V4zM4 16h4v4H4v-4zm12 0h4v4h-4v-4zM12 7a5 5 0 015 5" />
      </svg>
    ),
  },
  {
    href: "/text-to-speech",
    name: "Text to Speech",
    description:
      "Listen to any text read aloud with adjustable rate and pitch, or download it as an MP3.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
      </svg>
    ),
  },
  {
    href: "/color-palette-generator",
    name: "Color Palette Generator",
    description:
      "Generate harmonious color palettes with one click and copy hex codes instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 010 4H5m2 14a4 4 0 004-4V9a2 2 0 012-2h4a2 2 0 010 4H9m4 8a4 4 0 004-4h2a2 2 0 012 2v2a2 2 0 01-4 0" />
      </svg>
    ),
  },
  {
    href: "/word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and estimate reading time as you type.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/unit-converter",
    name: "Unit Converter",
    description:
      "Convert length, weight, temperature, and data size units instantly as you type.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3-3m0 0l3 3M6 3v18M18 6l3-3m0 0l-3-3M21 3v18M3 18l3 3m0 0l3-3M6 21V6" />
      </svg>
    ),
  },
  {
    href: "/currency-converter",
    name: "Currency Converter",
    description:
      "Convert between world currencies with live, up-to-date exchange rates.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/age-calculator",
    name: "Age Calculator",
    description:
      "Find your exact age in years, months, days, and total days lived.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/password-generator",
    name: "Password Generator",
    description:
      "Create strong, secure passwords with custom length and character sets. Generated locally.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    href: "/gpa-calculator",
    name: "GPA Calculator",
    description:
      "Calculate your weighted GPA from your grades and credit hours.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L3.927 10.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    href: "/video-to-gif",
    name: "Video to GIF",
    description:
      "Convert any video to an animated GIF. Control the size and smoothness, then download.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/social-media-video-compressor",
    name: "Social Media Video Compressor",
    description:
      "Compress videos for Instagram, Facebook, TikTok, YouTube and more without losing quality.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2" />
      </svg>
    ),
  },
  {
    href: "/social-media-video-downloader",
    name: "Video Downloader",
    description:
      "Download public videos from YouTube and social platforms. Paste a link and save instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  },
  {
    href: "/username-generator",
    name: "Username Generator",
    description:
      "Generate cool, unique usernames for games, social media and more. Add numbers and symbols.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: "/social-media-caption-generator",
    name: "Caption Generator",
    description:
      "Generate catchy captions and ready-to-use hashtags for Instagram, TikTok, Facebook and more.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
];

const games = [
  {
    href: "/daily-word-game",
    name: "Daily Word Game",
    description:
      "Guess a new 5-letter word every day. A brand-new puzzle worldwide, reset each day.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/daily-sudoku",
    name: "Daily Sudoku",
    description:
      "A fresh Sudoku puzzle every day with difficulty levels and a stopwatch timer.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm6 0v14m8-7h-8m0-7v14" />
      </svg>
    ),
  },
  {
    href: "/2048",
    name: "2048",
    description:
      "Slide numbered tiles and combine them to reach 2048. Addictive and simple.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    href: "/snake",
    name: "Snake",
    description:
      "Grow your snake by eating food without hitting the walls or yourself.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/minesweeper",
    name: "Minesweeper",
    description:
      "Clear the minefield without detonating any mines. Easy, medium, or hard.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1m0-12.8l-2.1 2.1M5.6 18.4l2.1-2.1" />
      </svg>
    ),
  },
  {
    href: "/memory-match",
    name: "Memory Match",
    description:
      "Flip cards to find matching pairs before your moves run out.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
      </svg>
    ),
  },
  {
    href: "/tetris",
    name: "Tetris",
    description:
      "Stack falling blocks and clear lines in this classic arcade puzzle.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h7v7H4V4zm9 0h7v7h-7V4zM4 13h7v7H4v-7zM13 13h7v7h-7v-7z" />
      </svg>
    ),
  },
  {
    href: "/tic-tac-toe",
    name: "Tic Tac Toe",
    description:
      "Play the classic 3-in-a-row game against the computer or a friend.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
  },
  {
    href: "/connect-four",
    name: "Connect Four",
    description:
      "Drop discs and line up four in a row against a challenging AI or a friend.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm3 6h8m-4 4h4m-6 0h1" />
      </svg>
    ),
  },
  {
    href: "/reaction-time-test",
    name: "Reaction Time Test",
    description:
      "Test your reflexes — click the moment the color changes. Share your score.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    href: "/typing-speed-test",
    name: "Typing Speed Test",
    description:
      "Measure your words per minute and accuracy on a timed typing challenge.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M3 15h18M6 12h.01M12 12h.01M18 12h.01M6 18h.01M12 18h.01M18 18h.01" />
      </svg>
    ),
  },
  {
    href: "/daily-trivia",
    name: "Daily Trivia",
    description:
      "Answer 10 general-knowledge questions in a rotating daily quiz. Build a streak.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          <span className="animate-hero-fade-up inline-block">Free Online</span>{" "}
          <span className="animate-hero-fade-up inline-block" style={{ animationDelay: "0.12s" }}>
            Tools That
          </span>{" "}
          <span
            className="animate-hero-fade-up inline-block text-accent-600"
            style={{ animationDelay: "0.24s" }}
          >
            Respect Your Privacy
          </span>
        </h1>
        <p
          className="animate-hero-fade-up mx-auto mt-4 max-w-2xl text-lg text-gray-600"
          style={{ animationDelay: "0.4s" }}
        >
          QuicTools offers fast, free, browser-based utilities and games for
          everyday tasks. No sign-up, no uploads, no servers — everything runs
          directly in your browser, so your files never leave your device.
        </p>
      </section>

      {/* Top ad slot after hero */}
      <AdSlot label="top" className="mb-8" />

      <section
        aria-labelledby="tools-heading"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2
          id="tools-heading"
          className="col-span-full mb-2 text-2xl font-bold tracking-tight text-gray-900"
        >
          Tools
        </h2>
        {tools.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}

        {/* Inline ad inside the tools grid */}
        <AdSlot label="inline" className="col-span-full mt-2" />
      </section>

      {/* Inline ad slot between tools and games */}
      <AdSlot label="middle" className="mt-10" />

      <section
        aria-labelledby="games-heading"
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <h2
          id="games-heading"
          className="col-span-full mb-2 text-2xl font-bold tracking-tight text-gray-900"
        >
          Free Browser Games
        </h2>
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}

        {/* Inline ad inside the games grid */}
        <AdSlot label="inline" className="col-span-full mt-2" />
      </section>

      <AdSlot label="bottom" className="mt-10" />
      <AdSlot label="footer" className="mt-5" />
    </div>
  );
}
