export interface FaqItem {
  q: string;
  a: string;
}

export interface IndexPage {
  slug: string;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  toolName: string;
  toolHref: string;
  ctaText: string;
  body: { heading: string; text: string[] }[];
  faqs: FaqItem[];
  related: string[];
}

export const indexPages: IndexPage[] = [
  // ============================== IMAGE ==============================
  {
    slug: "jpeg-compressor",
    eyebrow: "Image Tools",
    h1: "Free JPEG Compressor Online",
    metaTitle:
      "Compress JPEG Online - Free JPG Image Compressor Without Quality Loss",
    metaDescription:
      "Compress JPEG images online for free. Reduce JPG file size dramatically while keeping quality. No uploads — files never leave your browser. Fast and private.",
    intro: [
      "Large JPEG photos slow down websites, overflow email inboxes, and burn through storage space. A free JPEG compressor shrinks your images in seconds so they load instantly and take up far less room.",
      "Our browser-based JPEG compressor uses smart, lossy compression that trims file size without visibly damaging the picture. Drop in a JPG, see the exact amount saved, and download the optimized image — all without creating an account or uploading a single file.",
    ],
    toolName: "Image Compressor",
    toolHref: "/image-compressor",
    ctaText: "Compress your JPEG now",
    body: [
      {
        heading: "Why compress JPEG files?",
        text: [
          "Every photo you take with a modern phone is several megabytes. When you attach it to an email, upload it to a website, or send it in a group chat, that size adds up fast. Compressing a JPEG strips out data your eye barely notices, such as tiny color variations, leaving a file that looks identical but is often 60–80% smaller.",
          "Smaller images mean faster page loads, a better Google Core Web Vitals score, and happier visitors who don't have to wait. For photographers, online sellers, and web developers, image size is one of the simplest ways to improve both user experience and search ranking.",
        ],
      },
      {
        heading: "Does compressing JPEG reduce quality?",
        text: [
          "Yes and no. JPEG is a lossy format, so any re-save removes a little detail. However, modern compressors are smart about it: they remove only the data that is least noticeable, so at the right compression level the difference is invisible to the human eye.",
          "Our tool shows you both the original and compressed sizes before you download, and you can re-run it with a gentler setting if you need a higher-quality result. This gives you total control over the size-versus-quality trade-off.",
        ],
      },
      {
        heading: "Multiple images and privacy",
        text: [
          "Compress as many JPEGs as you like, one after another, with no limits and no sign-up. Because everything is processed on your own device, your private photos never leave your computer, phone, or tablet.",
          "That matters for sensitive images like ID scans, product shots, or documents. With an in-browser tool you carry zero security risk of a third-party server seeing your files.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much can I compress a JPEG by?",
        a: "Most JPEG photos can be reduced by 60–80% without a visible difference in quality. The exact amount depends on the image's detail, colors, and original resolution.",
      },
      {
        q: "Is this JPEG compressor really free?",
        a: "Yes, it is 100% free with no sign-up, no watermarks, and no usage limits. You can compress unlimited images directly in your browser.",
      },
      {
        q: "Are my photos uploaded to a server?",
        a: "No. All compression happens locally in your browser, so your images are never uploaded and never leave your device.",
      },
      {
        q: "What format do I get after compressing?",
        a: "You get an optimized JPG file, so it stays compatible with every website, email client, and app that supports standard JPEG images.",
      },
    ],
    related: ["png-compressor", "image-compressor-online", "resize-image-online"],
  },
  {
    slug: "png-compressor",
    eyebrow: "Image Tools",
    h1: "Compress PNG Online - Free PNG Size Reducer",
    metaTitle:
      "Compress PNG Online Free - Reduce PNG File Size Without Losing Quality",
    metaDescription:
      "Shrink PNG images online for free while keeping them sharp for logos, graphics, and screenshots. Private, browser-based, no sign-up required.",
    intro: [
      "PNG is great for graphics with text, logos, transparency, and crisp edges — but PNG files can be large. A fast PNG compressor trims those files down so they load faster and are easier to share.",
      "Our PNG compressor reduces file size in your browser, perfect for web designers, developers, and anyone who shares transparent images. No uploads, no accounts, and no watermarks.",
    ],
    toolName: "Image Compressor",
    toolHref: "/image-compressor",
    ctaText: "Compress your PNG now",
    body: [
      {
        heading: "When PNG compression matters most",
        text: [
          "PNG files are common for logos, screenshots, charts, and images that need transparency or text sharpness. Because they're lossless, they hold onto every detail — and that makes them heavy.",
          "Compressing a PNG keeps the visual result nearly identical while cutting storage and bandwidth costs. It's essential for e-commerce product images, app icons, and website graphics that must stay crisp.",
        ],
      },
      {
        heading: "How our PNG compressor works",
        text: [
          "You don't upload anything. Pick a PNG from your device and the tool processes it locally, comparing original and compressed sizes in real time. Download the result whenever you're happy with the size.",
          "It handles the quirks of the PNG format automatically, so you get a smaller file without losing the transparency your graphic needs.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is PNG compression lossy?",
        a: "The re-compression is tuned to minimize visible loss; you can compare the original and compressed sizes and choose whether to accept the result or retry with lighter compression.",
      },
      {
        q: "Does it keep transparency?",
        a: "Yes, PNG transparency is preserved so your logos and stickers keep their transparent backgrounds.",
      },
      {
        q: "Can I compress multiple PNG files?",
        a: "Yes, you can compress as many as you like, one after another, with no limits and no sign-up.",
      },
    ],
    related: ["jpeg-compressor", "image-compressor-online", "resize-image-online"],
  },
  {
    slug: "image-compressor-online",
    eyebrow: "Image Tools",
    h1: "Free Online Image Compressor (JPG, PNG & WebP)",
    metaTitle:
      "Image Compressor Online Free - Compress JPG PNG WebP Without Quality Loss",
    metaDescription:
      "The best free online image compressor. Reduce JPG, PNG and WebP file size right in your browser. No uploads, no sign-up, unlimited and private.",
    intro: [
      "Whether you're preparing photos for a website, resizing attachments for email, or cleaning up your image library, a fast image compressor saves you space and speed. Everything runs in your browser.",
      "Compress JPG, PNG, and other common formats in seconds, compare the savings, and download the result. It's free, private, and needs no account.",
    ],
    toolName: "Image Compressor",
    toolHref: "/image-compressor",
    ctaText: "Compress an image now",
    body: [
      {
        heading: "One tool for all your images",
        text: [
          "A great image compressor handles the formats you actually use every day. Whether that's a JPEG photo, a PNG logo, or a WebP graphic for the web, you want one reliable place to shrink them all.",
          "Our tool is that place. Upload an image, let it work its magic locally, and download a file that's dramatically smaller — perfect for web developers, bloggers, and everyday users.",
        ],
      },
      {
        heading: "Fast results, complete privacy",
        text: [
          "Because compression happens on your device, there's no upload queue and no waiting on a server. It's also the most secure option for private or sensitive images.",
          "No watermarks are added, and there's no file limit, so you can optimize a whole batch of images for your next project.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I compress an image online for free?",
        a: "Open the Image Compressor, choose a JPG or PNG from your device, wait a moment for the in-browser compression, then download your smaller image. That's it.",
      },
      {
        q: "Will my original image be changed?",
        a: "No. Your original file stays untouched; you download a new, compressed copy.",
      },
      {
        q: "Is there a file size limit?",
        a: "No usage limits — compress images of any size, as many as you need, with no sign-up.",
      },
    ],
    related: ["jpeg-compressor", "png-compressor", "resize-image-online"],
  },
  {
    slug: "remove-background-from-image",
    eyebrow: "Image Tools",
    h1: "Remove Background from Image Free & Automatic",
    metaTitle:
      "Remove Image Background Online Free - Background Remover Tool",
    metaDescription:
      "Remove the background from any photo automatically with free AI background remover. Transparent PNG in one click. Runs on demand, no sign-up.",
    intro: [
      "Removing a background used to mean painstaking hours in Photoshop with the lasso or pen tool. Now it takes one click. Our AI background remover separates the subject from the backdrop automatically.",
      "Perfect for product photos, portraits, profile pictures, and marketing graphics. Download a clean, transparent PNG in seconds — free and private.",
    ],
    toolName: "Background Remover",
    toolHref: "/background-remover",
    ctaText: "Remove a background now",
    body: [
      {
        heading: "Why remove a background?",
        text: [
          "A photo with a distracting background rarely looks professional. Removing it lets you place the subject on any solid color, a branded backdrop, or a transparent layer for use in designs and listings.",
          "Online sellers use transparent product images to make listings pop. Professionals use them in presentations and brochures. Designers use them for composites and social media posts.",
        ],
      },
      {
        heading: "Automatic AI, zero skill required",
        text: [
          "You don't need design software or experience. The AI detects the subject, separates it from the background, and gives you a cut-out you can download immediately.",
          "Head over to the Background Remover, drop in a photo, and download your transparent PNG. It's the fastest way to get studio-quality cut-outs from home.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the background remover work on hair?",
        a: "It uses AI edge detection and usually handles fine details like hair well, producing a clean cut-out compared to manual tools.",
      },
      {
        q: "What image formats are supported?",
        a: "Upload JPG, PNG, and other common image formats and download the result as a transparent PNG.",
      },
      {
        q: "Is background removal free?",
        a: "Yes, it's free to use with no sign-up. Your images are processed privately without leaving your device.",
      },
    ],
    related: ["jpeg-compressor", "image-compressor-online", "resize-image-online"],
  },
  {
    slug: "resize-image-online",
    eyebrow: "Image Tools",
    h1: "Resize Image Online - Free Photo Resizer",
    metaTitle:
      "Resize Image Online Free - Photo Resizer for Any Platform",
    metaDescription:
      "Resize images online free. Crop to perfect dimensions and sizes for Instagram, Facebook, Twitter, and web. Private and browser-based, no sign-up.",
    intro: [
      "Images often need to fit a specific width, height, or aspect ratio — for social media, a website, or a print order. An online image resizer handles all of it without heavy software.",
      "Crop and resize images to the exact dimensions you need, right in your browser, with no uploads and no sign-up.",
    ],
    toolName: "Aspect Ratio Cropper",
    toolHref: "/aspect-ratio-cropper",
    ctaText: "Resize your image now",
    body: [
      {
        heading: "Right-size every image",
        text: [
          "Social platforms each want different sizes: 1080×1080 for Instagram square, 1080×1350 for portrait posts, 16:9 for YouTube thumbnails, and more. Getting these right avoids awkward crops that hurt engagement.",
          "Our resizer and aspect-ratio cropper let you target those exact dimensions and ratios in one place, ready for every channel.",
        ],
      },
      {
        heading: "Works on any device",
        text: [
          "Because it runs in the browser, you can resize images from a phone, tablet, or desktop. No installation, no account, and your photos are never uploaded to a server.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I resize an image to an exact size?",
        a: "Use the Aspect Ratio Cropper to pick a preset like 1:1 or 16:9, or the resize tools for custom dimensions, then download the result.",
      },
      {
        q: "Will resizing reduce quality?",
        a: "Resizing to smaller dimensions keeps images sharp for their target use; you can also use our compressor afterwards to reduce file size further.",
      },
      {
        q: "Is it free?",
        a: "Yes — all resizing and cropping is free, unlimited, and private with no sign-up.",
      },
    ],
    related: ["jpeg-compressor", "png-compressor", "image-compressor-online"],
  },

  // ============================== PDF ==============================
  {
    slug: "pdf-to-word-online",
    eyebrow: "PDF Tools",
    h1: "Convert PDF to Word Online Free",
    metaTitle:
      "PDF to Word Converter Online Free - Edit PDF as DOCX",
    metaDescription:
      "Convert PDF to Word online free. Turn PDFs into editable DOCX files while keeping formatting. No sign-up, private, and runs right in your browser.",
    intro: [
      "Receive a PDF you need to edit? Converting it to an editable Word document is the easiest way to change text, fix typos, or reuse content. Our PDF to Word converter handles it in a few seconds.",
      "Turn your PDF into a clean DOCX that opens in Microsoft Word or Google Docs, ready to edit — free and completely private.",
    ],
    toolName: "PDF to Word",
    toolHref: "/pdf-to-word",
    ctaText: "Convert a PDF to Word now",
    body: [
      {
        heading: "Edit PDFs without special software",
        text: [
          "PDFs are designed for sharing, not editing. When you need to change text, adjust a paragraph, or add your own content, a Word document is far more flexible.",
          "Converting to DOCX preserves your text, headings, and layout so you can pick up right where the original left off.",
        ],
      },
      {
        heading: "Perfect for students, pros, and teams",
        text: [
          "Students convert lecture PDFs to take notes. Professionals turn contracts into templates. Anyone who receives a read-only PDF and needs to make changes benefits from a fast, free conversion.",
          "Your document is processed locally in the browser, so sensitive files never reach a third-party server.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert PDF to Word for free?",
        a: "Open the PDF to Word tool, choose your PDF, and download the resulting DOCX. It's free, unlimited, and needs no sign-up.",
      },
      {
        q: "Will formatting be preserved?",
        a: "The converter keeps text, paragraphs, headings, and basic layout so your Word document closely matches the original PDF.",
      },
      {
        q: "Are my documents uploaded?",
        a: "No — conversion runs entirely in your browser, so your documents never leave your device.",
      },
    ],
    related: ["word-to-pdf-online", "pdf-to-jpg-online", "merge-pdf-online"],
  },
  {
    slug: "word-to-pdf-online",
    eyebrow: "PDF Tools",
    h1: "Convert Word to PDF Online Free",
    metaTitle:
      "Word to PDF Converter Online Free - DOCX to PDF",
    metaDescription:
      "Convert Word documents (DOCX) to PDF online free. Create polished, shareable PDFs that look the same on every device. Private and browser-based.",
    intro: [
      "Sending a Word document often means messy formatting on the other end. Converting to PDF locks in your layout so it looks exactly the same on every device and platform.",
      "Turn DOCX files into clean, professional PDFs in seconds — free, private, and with no sign-up.",
    ],
    toolName: "Word to PDF",
    toolHref: "/word-to-pdf",
    ctaText: "Convert Word to PDF now",
    body: [
      {
        heading: "Why convert Word to PDF?",
        text: [
          "PDF is the universal format for sharing. It keeps fonts, spacing, and images consistent, no matter who opens it or on what device. That's why resumes, contracts, and final reports are almost always shared as PDFs.",
          "Our converter creates a print-ready PDF from your DOCX so you can send it with confidence.",
        ],
      },
      {
        heading: "Making a great first impression",
        text: [
          "Whether it's a resume, a business proposal, or a school report, a polished PDF looks professional and reads cleanly. Convert in seconds and share your best work.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I turn a Word document into a PDF?",
        a: "Open the Word to PDF tool, select your DOCX file, and download your PDF. It's free and needs no account.",
      },
      {
        q: "Will my fonts and layout stay the same?",
        a: "Yes — PDF conversion locks in your formatting so the file looks identical anywhere it's opened.",
      },
      {
        q: "Do I have to upload my document?",
        a: "No. Conversion happens locally in your browser, so your document is never uploaded.",
      },
    ],
    related: ["pdf-to-word-online", "merge-pdf-online", "pdf-to-jpg-online"],
  },
  {
    slug: "pdf-to-jpg-online",
    eyebrow: "PDF Tools",
    h1: "Convert PDF to JPG Online Free",
    metaTitle:
      "PDF to JPG Converter Online Free - Turn PDF Pages to Images",
    metaDescription:
      "Convert PDF pages to JPG images online free. Extract every page as a high-quality image. Private, browser-based, no sign-up.",
    intro: [
      "Need a page of a PDF as an image for a presentation, a website, or a social post? Our PDF to JPG converter turns any page — or every page — into a high-quality JPG.",
      "Extract images from PDFs instantly, right in your browser, with no sign-up and no uploads.",
    ],
    toolName: "PDF to JPG",
    toolHref: "/pdf-to-jpg",
    ctaText: "Convert PDF to JPG now",
    body: [
      {
        heading: "Use PDF pages as images anywhere",
        text: [
          "Maybe you want to embed a document page in a slide deck, a blog post, or an email. Or you need to share just one page of a long PDF. Converting to JPG gives you a flexible image you can use anywhere.",
          "Our tool converts individual pages or the whole document, so you get exactly the images you need.",
        ],
      },
      {
        heading: "High quality, fully private",
        text: [
          "Each page is rendered as a crisp JPG ready for upload or sharing. And because the conversion runs in your browser, sensitive documents never leave your device.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert a PDF to JPG?",
        a: "Open the PDF to JPG tool, choose a PDF, and download the pages as JPG images. It's free and unlimited.",
      },
      {
        q: "Can I convert only one page?",
        a: "Yes — you can select the specific pages you want to convert into images.",
      },
      {
        q: "Is it private?",
        a: "Yes, the conversion happens locally in your browser so your PDF is never uploaded.",
      },
    ],
    related: ["pdf-to-word-online", "merge-pdf-online", "word-to-pdf-online"],
  },
  {
    slug: "merge-pdf-online",
    eyebrow: "PDF Tools",
    h1: "Merge PDF Files Online Free",
    metaTitle:
      "Merge PDF Online Free - Combine PDF Files Into One",
    metaDescription:
      "Combine multiple PDF files into a single document online free. Merge pages from different PDFs in seconds. Private, no sign-up.",
    intro: [
      "Combining several PDFs into one tidy file is a task we all hit sooner or later — reports, scans, application documents. Our PDF merger combines them all into a single, organized document.",
      "Drag and drop multiple PDFs and merge them into one in seconds. Free, private, and with no sign-up.",
    ],
    toolName: "PDF Merger",
    toolHref: "/pdf-merger",
    ctaText: "Merge PDFs now",
    body: [
      {
        heading: "One clean file instead of many",
        text: [
          "Submitting a single combined PDF is cleaner than sending a dozen attachments. Whether it's an application package, a combined report, or a set of receipts, merging makes your documents easy to handle.",
          "Our merger keeps page order and lets you create a single, unified file in seconds.",
        ],
      },
      {
        heading: "For students, employees, and everyday life",
        text: [
          "Students merge lecture notes, employees combine reports, and anyone can pull together documents for forms and applications. It's the kind of tool you'll reach for again and again.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I merge PDFs for free?",
        a: "Open the PDF Merger, add your PDF files, and download the combined document. It's free, unlimited, and requires no account.",
      },
      {
        q: "Can I merge more than two PDFs?",
        a: "Yes, you can merge as many PDF files as you need into a single document.",
      },
      {
        q: "Are my PDFs uploaded to a server?",
        a: "No — merging happens locally in your browser, keeping your documents private.",
      },
    ],
    related: ["pdf-to-word-online", "pdf-to-jpg-online", "word-to-pdf-online"],
  },
  {
    slug: "ocr-image-to-text",
    eyebrow: "PDF & Image Tools",
    h1: "Image to Text (OCR) - Extract Text from Images Free",
    metaTitle:
      "Image to Text OCR Online Free - Extract Text from Images & Scans",
    metaDescription:
      "Extract text from images, photos, and scanned documents free with online OCR. Copy or download the text. Private, browser-based, no sign-up.",
    intro: [
      "Have text trapped inside an image or a scanned document? OCR (optical character recognition) reads it and turns it into selectable, editable text you can copy or download.",
      "Extract text from photos, screenshots, and scans instantly — free and entirely private.",
    ],
    toolName: "Image to Text (OCR)",
    toolHref: "/image-to-text-ocr",
    ctaText: "Extract text from an image now",
    body: [
      {
        heading: "Unlock text hidden in images",
        text: [
          "Whether it's a photo of a whiteboard, a scanned contract, a screenshot of a web page, or a picture of a receipt, OCR frees the text so you can search, copy, or reuse it.",
          "Instead of retyping paragraphs by hand, our tool reads the text for you in seconds and lets you copy it or download it as a file.",
        ],
      },
      {
        heading: "Works on-device for privacy",
        text: [
          "The OCR runs right in your browser, so photos of documents, IDs, or notes are never uploaded to a server. It's fast, free, and private.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I extract text from an image?",
        a: "Open the Image to Text tool, upload a photo or scan, and the OCR reads the text for you to copy or download.",
      },
      {
        q: "Does it work on handwriting?",
        a: "It's most accurate on printed text, screenshots, and documents; clear printed text works best.",
      },
      {
        q: "Is OCR free?",
        a: "Yes — image to text conversion is free, unlimited, and private with no sign-up.",
      },
    ],
    related: ["pdf-to-word-online", "jpeg-compressor", "image-compressor-online"],
  },

  // ============================== VIDEO ==============================
  {
    slug: "video-to-gif-online",
    eyebrow: "Video Tools",
    h1: "Convert Video to GIF Online Free",
    metaTitle:
      "Video to GIF Converter Online Free - MP4 to GIF",
    metaDescription:
      "Turn any video into an animated GIF online free. Control size and quality. Runs in your browser, no uploads, no sign-up.",
    intro: [
      "Animated GIFs are everywhere — reactions, product demos, memes, and marketing snippets. Our video to GIF converter turns clips and MP4s into sleek, shareable animated GIFs.",
      "Pick your video, choose quality and size, and download your GIF — free, private, and browser-based.",
    ],
    toolName: "Video to GIF",
    toolHref: "/video-to-gif",
    ctaText: "Make a GIF now",
    body: [
      {
        heading: "Why convert video to GIF?",
        text: [
          "GIFs loop automatically, so they get attention in social feeds, email, and chat. Short product demos, behind-the-scenes clips, and funny moments all work great as looping GIFs.",
          "Our converter gives you control over the output size and smoothness so your GIF looks great without being a giant file.",
        ],
      },
      {
        heading: "Effortless, from any device",
        text: [
          "No video editing software required. Convert clips directly in your browser and download a shareable GIF in seconds.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert a video to GIF?",
        a: "Open the Video to GIF tool, choose a video file, adjust size and speed, and download your animated GIF.",
      },
      {
        q: "What video formats are supported?",
        a: "Common formats like MP4 and other standard video files are supported.",
      },
      {
        q: "Is video to GIF free?",
        a: "Yes — it's free, unlimited, and your video is processed privately in the browser.",
      },
    ],
    related: ["compress-video-online", "image-compressor-online", "resize-image-online"],
  },
  {
    slug: "compress-video-online",
    eyebrow: "Video Tools",
    h1: "Compress Video Online Free",
    metaTitle:
      "Compress Video Online Free - Reduce MP4 File Size for Any Platform",
    metaDescription:
      "Compress videos online free for Instagram, TikTok, Facebook, YouTube and email. Reduce MP4 file size without losing quality. Private, no sign-up.",
    intro: [
      "Videos take up huge amounts of space and often get rejected by upload limits. A video compressor shrinks your files so they're faster to upload, share, and store.",
      "Perfect for social media, email, and websites. Reduce MP4 file size in your browser — free and private.",
    ],
    toolName: "Social Media Video Compressor",
    toolHref: "/social-media-video-compressor",
    ctaText: "Compress a video now",
    body: [
      {
        heading: "Fit the size limits everywhere",
        text: [
          "Instagram, TikTok, Facebook, and email all impose video size limits that your phone's camera easily blows past. Compressing brings videos within those limits while keeping them watchable.",
          "Our compressor is tuned for social media requirements, so your clip is ready for each platform.",
        ],
      },
      {
        heading: "Smaller files, easier sharing",
        text: [
          "Beyond platform limits, smaller videos upload faster over slow connections and take up less storage. Compress once and share anywhere.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I compress a video for free?",
        a: "Open the video compressor, add your MP4, pick a size/quality, and download the compressed file. It's free and unlimited.",
      },
      {
        q: "Will the quality be good?",
        a: "The compressor balances file size and quality, tuned for social platforms and email where smaller is better.",
      },
      {
        q: "Is my video uploaded?",
        a: "No — compression runs in your browser where supported, keeping your footage private.",
      },
    ],
    related: ["video-to-gif-online", "image-compressor-online", "resize-image-online"],
  },

  // ============================== CONVERTERS & GENERATORS ==============================
  {
    slug: "text-to-speech-online",
    eyebrow: "Generators",
    h1: "Text to Speech Online Free",
    metaTitle:
      "Text to Speech Online Free - Convert Text to MP3 Audio",
    metaDescription:
      "Type or paste text and listen to it spoken aloud, or download as MP3. Free text to speech with adjustable rate and pitch. Private, browser-based.",
    intro: [
      "Listen to any text instead of reading it, or turn written content into audio you can download. Our text to speech reader reads your words aloud with adjustable speed and pitch.",
      "Perfect for proofreading, learning, accessibility, and turning text into MP3 audio — free and private.",
    ],
    toolName: "Text to Speech",
    toolHref: "/text-to-speech",
    ctaText: "Convert text to speech now",
    body: [
      {
        heading: "Read anything out loud",
        text: [
          "Hear text read aloud to catch errors, study more effectively, or simply rest your eyes. Adjust the rate and pitch until it sounds right to you.",
          "You can also download the audio as an MP3 file to keep or share.",
        ],
      },
      {
        heading: "Accessible and private",
        text: [
          "Text to speech makes content more accessible to everyone. And because it runs in the browser, your text is never sent to a server.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert text to speech?",
        a: "Open the Text to Speech tool, type or paste your text, choose a rate and pitch, and press play or download as MP3.",
      },
      {
        q: "Can I download the audio?",
        a: "Yes, you can download the spoken text as an MP3 file.",
      },
      {
        q: "Is text to speech free?",
        a: "Yes, it's free, unlimited, and your text stays private in the browser.",
      },
    ],
    related: ["qr-code-generator-online", "image-compressor-online", "ocr-image-to-text"],
  },
  {
    slug: "qr-code-generator-online",
    eyebrow: "Generators",
    h1: "Free QR Code Generator Online",
    metaTitle:
      "QR Code Generator Online Free - Create QR Codes for Any Link",
    metaDescription:
      "Create QR codes online free from any URL or text. Download a scannable PNG instantly. Private, no sign-up, unlimited.",
    intro: [
      "QR codes are the fastest way to send people to a link from a poster, business card, or menu. Our generator turns any URL or text into a scannable QR code you can download.",
      "Create high-quality QR codes in seconds — free, private, and with no sign-up.",
    ],
    toolName: "QR Code Generator",
    toolHref: "/qr-generator",
    ctaText: "Generate a QR code now",
    body: [
      {
        heading: "Connect the physical and digital world",
        text: [
          "Print a QR code on a flyer, packaging, menu, or business card and anyone can scan straight to your site or link. It's fast, contactless, and endlessly flexible.",
          "Our generator lets you encode URLs or plain text and download a clean, scannable PNG.",
        ],
      },
      {
        heading: "Instant and free",
        text: [
          "No account, no watermark, no limits. Generate as many QR codes as you need and download them right away.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make a QR code for free?",
        a: "Open the QR Code Generator, paste your URL or text, and download the PNG. Instant and no sign-up.",
      },
      {
        q: "Can I use a QR code for more than links?",
        a: "Yes, you can encode plain text, Wi-Fi details, contact info, and more depending on how the code is scanned.",
      },
      {
        q: "Is QR generation free?",
        a: "Yes — it's free, unlimited, and your content is generated locally.",
      },
    ],
    related: ["text-to-speech-online", "image-compressor-online", "jpeg-compressor"],
  },

  // ============================== MOCKUPS & FUN ==============================
  {
    slug: "fake-whatsapp-chat",
    eyebrow: "Mockup & Fun Tools",
    h1: "Fake WhatsApp Chat Generator Online",
    metaTitle:
      "Fake WhatsApp Chat Generator - Create WhatsApp Message Mockups Online",
    metaDescription:
      "Create a realistic fake WhatsApp chat mockup online free. Build custom conversations with two names, colors, and a status line. Download as PNG. For entertainment only.",
    intro: [
      "Make fun WhatsApp-style chat screenshots for viral posts, skits, memes, or social media content. Our generator lets you build a two-person conversation exactly how you want it.",
      "Choose sender and receiver names, pick a theme color, add a status, and type the messages. Then download your mockup as a PNG — free, unlimited, and private.",
    ],
    toolName: "Fake WhatsApp Chat",
    toolHref: "/fake-whatsapp-chat",
    ctaText: "Create a WhatsApp mockup now",
    body: [
      {
        heading: "Why make a WhatsApp mockup?",
        text: [
          "Clean, realistic chat screenshots are gold for social media. Skits, prank threads, funny best-friend moments, and memes all use them to drive engagement. Instead of searching for a random screenshot online, you can build a perfect one in seconds.",
          "You control every message, the names on screen, and the color scheme, so the final result matches the joke or story you're telling.",
        ],
      },
      {
        heading: "Fun, free, and private",
        text: [
          "Everything runs directly in your browser. You never upload anything, there's no account, and there's no watermark on your download.",
          "Download a high-quality PNG ready to post. Use your mockups responsibly and for entertainment only.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create a fake WhatsApp chat?",
        a: "Open the Fake WhatsApp Chat tool, enter the two names and messages, pick a color, and download your chat as a PNG.",
      },
      {
        q: "Is the download watermarked?",
        a: "No, there is no watermark. Download a clean PNG directly from your browser.",
      },
      {
        q: "Is this real?",
        a: "No — it clearly produces a fictional mockup for entertainment and creative content, not a genuine message conversation.",
      },
    ],
    related: ["fake-tweet-generator", "fake-notification-generator", "meme-generator"],
  },
  {
    slug: "fake-tweet-generator",
    eyebrow: "Mockup & Fun Tools",
    h1: "Fake Tweet Generator - Tweet Mockup Maker",
    metaTitle:
      "Fake Tweet Generator Online - Create a Realistic Twitter Post Mockup",
    metaDescription:
      "Create a realistic fake tweet mockup online free. Customize handle, name, post text, and likes. Download a clean PNG. For entertainment only.",
    intro: [
      "Tweet mockups are a classic way to make a point, tell a joke, or create eye-catching content. Our fake tweet generator builds a realistic Twitter post you can download as an image.",
      "Set the name and handle, write the post, add a like count, and generate. Free, private, and entirely in your browser.",
    ],
    toolName: "Fake Tweet Generator",
    toolHref: "/fake-tweet-generator",
    ctaText: "Make a tweet mockup now",
    body: [
      {
        heading: "Share a message with impact",
        text: [
          "A single tweet screenshot can capture an opinion, a punchline, or a hot take in a way plain text can't. Bloggers, meme makers, and social managers use tweet mockups to make their message stand out in a feed.",
          "You control the handle, display name, the visible text, and even likes and reposts, so the final image looks just right.",
        ],
      },
      {
        heading: "No sign-up, no watermark",
        text: [
          "Build as many mockups as you like, right in the browser, with no account and no watermark. Download a crisp PNG to post anywhere.",
          "Mockups are for creative and entertainment use only.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create a fake tweet?",
        a: "Open the Fake Tweet Generator, enter the name, handle, and post text, customize likes, and download your tweet image.",
      },
      {
        q: "Does the download have a watermark?",
        a: "No — you get a clean, watermark-free PNG.",
      },
      {
        q: "Can I use the fake tweet as a real post?",
        a: "It's a visual mockup for entertainment and creative content; it is not an actual Twitter post.",
      },
    ],
    related: ["fake-whatsapp-chat", "fake-notification-generator", "meme-generator"],
  },
  {
    slug: "fake-notification-generator",
    eyebrow: "Mockup & Fun Tools",
    h1: "Fake Notification Generator - Notification Mockup Maker",
    metaTitle:
      "Fake Notification Generator Online - Create App Notification Mockups",
    metaDescription:
      "Create realistic fake phone app notifications online free. Customize the app name, text, and time. Download as PNG. For entertainment only.",
    intro: [
      "Phone notifications are instantly recognizable and make great hooks for jokes and social posts. Our generator creates a realistic notification mockup you can download as an image.",
      "Pick the app name, write the notification text, set the time, and generate. Free, unlimited, and browser-based.",
    ],
    toolName: "Fake Notification Generator",
    toolHref: "/fake-notification-generator",
    ctaText: "Create a notification mockup now",
    body: [
      {
        heading: "Instantly recognizable content",
        text: [
          "A notification screenshot is a short, punchy way to get a message across — perfect for memes, product teasers, and engagement posts. You control the app name, the message length, and the timestamp.",
          "It's a quick, lightweight format that fits social feeds perfectly and needs no design skills.",
        ],
      },
      {
        heading: "Private and free",
        text: [
          "All generation happens in your browser, with no uploads and no watermark. Create as many mockups as you want, whenever you need them.",
          "Mockups are for creative and entertainment use only.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a fake notification generator?",
        a: "It creates a realistic-looking phone app notification image from the app name and text you provide, ready to download.",
      },
      {
        q: "Is the generated image watermarked?",
        a: "No watermark. Download a clean PNG directly from the browser.",
      },
      {
        q: "Is this a real notification?",
        a: "No — it's a fictional mockup for entertainment and creative content only.",
      },
    ],
    related: ["fake-whatsapp-chat", "fake-tweet-generator", "meme-generator"],
  },
  {
    slug: "fake-caller-id-generator",
    eyebrow: "Mockup & Fun Tools",
    h1: "Fake Caller ID Generator - Caller ID Mockup Maker",
    metaTitle:
      "Fake Caller ID Generator Online - Create a Realistic Incoming Call Mockup",
    metaDescription:
      "Create a realistic fake incoming call mockup online free. Customize the name, number, and carrier. Download as an image. For entertainment purposes only.",
    intro: [
      "A fake incoming call screen is a fun way to illustrate a point or make people laugh in a video or social post. Our caller ID generator builds a realistic call-screen mockup you can download.",
      "Set the caller name, phone number, and carrier, and generate your mockup — free, private, and in your browser.",
    ],
    toolName: "Fake Caller ID Generator",
    toolHref: "/fake-caller-id-generator",
    ctaText: "Make a caller ID mockup now",
    body: [
      {
        heading: "A realistic, editable call screen",
        text: [
          "Whether it's for a comedic video, a meme, or a thumbnail, a believable call screen grabs attention. You control the name, number, and carrier that appear on the mockup.",
          "Everything is labeled clearly as entertainment, so you can use it freely in creative projects.",
        ],
      },
      {
        heading: "Zero uploads, instant download",
        text: [
          "The mockup renders directly in your browser. There's no account, no upload, and no watermark on the PNG you download.",
          "Use it for jokes, skits, and content — not for misleading anyone in real life.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create a fake caller ID?",
        a: "Open the Fake Caller ID tool, enter the caller name and number, pick a carrier, and download your call-screen mockup.",
      },
      {
        q: "Does it include a watermark?",
        a: "The mockup includes a small entertainment disclaimer but is otherwise a clean, downloadable image.",
      },
      {
        q: "Is a fake caller ID real?",
        a: "No — it's a fictional mockup for entertainment and creative content only, never for real calls or deception.",
      },
    ],
    related: ["fake-whatsapp-chat", "fake-tweet-generator", "fake-notification-generator"],
  },
  {
    slug: "receipt-generator",
    eyebrow: "Document Generators",
    h1: "Receipt Generator - Create a Sample Receipt Online",
    metaTitle:
      "Receipt Generator Online - Make a Sample Receipt or Invoice",
    metaDescription:
      "Create a realistic sample receipt online free. Add your shop name, items, prices, and total. Download as a clean image. Clearly marked as a sample — not a valid receipt.",
    intro: [
      "Need a polished sample receipt for a demo, a design mockup, or a fun post? Our receipt generator lets you put together a clean, itemized receipt with your own shop name and line items.",
      "Add items, prices, tax, and a total, then download your receipt as an image. It's clearly marked as a sample and for demonstration use only.",
    ],
    toolName: "Receipt Generator",
    toolHref: "/receipt-generator",
    ctaText: "Create a sample receipt now",
    body: [
      {
        heading: "Polished receipts for demos and mockups",
        text: [
          "Designers, developers, and content creators often need a realistic-looking receipt for an app demo, a portfolio piece, or a video. Our generator produces a clean, itemized receipt in seconds.",
          "You decide the store name, the line items, the prices, and the total so the sample fits your exact scenario.",
        ],
      },
      {
        heading: "Simple, private, and clearly labeled",
        text: [
          "The whole tool runs in your browser with no uploads. Your sample receipt is clearly marked so it's obviously not a valid official receipt — perfect for mockups and demos.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create a sample receipt?",
        a: "Open the Receipt Generator, add your shop name, items, and prices, then download the itemized receipt as an image.",
      },
      {
        q: "Is the generated receipt valid?",
        a: "No — it is clearly labeled as a sample and for demonstration purposes only; it is not an official receipt.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and runs entirely in your browser.",
      },
    ],
    related: ["invoice-generator", "resume-builder", "fake-whatsapp-chat"],
  },
  {
    slug: "signature-generator",
    eyebrow: "Document Generators",
    h1: "Signature Generator - Create a Signature Online",
    metaTitle:
      "Signature Generator Online - Make a Free Digital Signature",
    metaDescription:
      "Create a digital signature online free. Sign with your mouse, finger, or stylus and download a transparent PNG. Free and private, no sign-up.",
    intro: [
      "Add a personal signature to documents, emails, PDFs, and images without any design software. Our signature generator lets you draw your signature and download it as a transparent PNG.",
      "Sign with your mouse, trackpad, or finger, choose a color and script font, and download. Free, unlimited, and private.",
    ],
    toolName: "Signature Generator",
    toolHref: "/signature-generator",
    ctaText: "Create your signature now",
    body: [
      {
        heading: "Sign documents the easy way",
        text: [
          "A clean, reusable signature image saves time every time you need to sign something digitally. Once you create it, you can drop it into PDF editor tools, contracts, emails, and certificates.",
          "Pick a handwriting style, adjust the size, and download a transparent PNG you can use anywhere.",
        ],
      },
      {
        heading: "Drawn locally, downloads instantly",
        text: [
          "You draw directly in the browser and nothing is uploaded. Export a crisp, high-quality signature in seconds.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make a digital signature?",
        a: "Open the Signature Generator, draw your signature or add your name in a script font, and download it as a transparent PNG.",
      },
      {
        q: "Can I use it on PDFs?",
        a: "Yes — download the transparent PNG and insert it into your document or PDF editor.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's completely free, unlimited, and runs in your browser.",
      },
    ],
    related: ["invoice-generator", "resume-builder", "text-to-handwriting"],
  },
  {
    slug: "invoice-generator",
    eyebrow: "Document Generators",
    h1: "Invoice Generator - Create a PDF Invoice Online",
    metaTitle:
      "Invoice Generator Online Free - Create & Download a PDF Invoice",
    metaDescription:
      "Create a clean, professional invoice online free. Add your details, line items, and totals, then download as a PDF. No sign-up, private.",
    intro: [
      "Send professional invoices without paying for accounting software or wrestling with spreadsheet templates. Our invoice generator walks you through the details and produces a clean PDF.",
      "Add your business and customer details, list your line items and rates, and download a polished PDF invoice — free and private.",
    ],
    toolName: "Invoice Generator",
    toolHref: "/invoice-generator",
    ctaText: "Create an invoice now",
    body: [
      {
        heading: "Professional invoices in minutes",
        text: [
          "A clear, itemized invoice reflects well on any freelancer or small business. Our generator formats your company details, description, quantity, and price into a ready-to-send document.",
          "You control the invoice number, date, and line items, so every invoice fits your work.",
        ],
      },
      {
        heading: "Download as a shareable PDF",
        text: [
          "The completed invoice exports as a clean PDF, ready to email to clients. Everything is generated in your browser — your data never leaves your device.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create an invoice?",
        a: "Open the Invoice Generator, add your details and line items with rates, then download your invoice as a PDF.",
      },
      {
        q: "What format do I get?",
        a: "You download a clean, print-ready PDF of your invoice.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your data stays private in the browser.",
      },
    ],
    related: ["receipt-generator", "signature-generator", "resume-builder"],
  },
  {
    slug: "resume-builder",
    eyebrow: "Document Generators",
    h1: "Resume Builder - Create a PDF Resume Online",
    metaTitle:
      "Resume Builder Online Free - Make & Download a PDF Resume",
    metaDescription:
      "Create a clean, ATS-friendly resume online free. Add your experience, education, and skills, then download as a PDF. No sign-up, private.",
    intro: [
      "Landing interviews starts with a clear, well-organized resume. Our resume builder lets you enter your experience, education, and skills and download a professional PDF.",
      "Build your resume step by step, preview it, and export a crisp PDF — free and entirely private.",
    ],
    toolName: "Resume Builder",
    toolHref: "/resume-builder",
    ctaText: "Build your resume now",
    body: [
      {
        heading: "A resume that makes a good first impression",
        text: [
          "Recruiters skim resumes in seconds. A clean layout with clear headings and bulleted experience makes the important details jump out. Our builder keeps your content organized and easy to read.",
          "Add your summary, work history, education, and skills, and let the builder lay it out cleanly for you.",
        ],
      },
      {
        heading: "Export a polished PDF",
        text: [
          "When you're happy with the content, download your resume as a PDF ready to attach to applications. Everything runs in your browser, so your personal details stay private.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make a resume?",
        a: "Open the Resume Builder, fill in your experience, education, and skills, then download a PDF of your resume.",
      },
      {
        q: "What format do I download?",
        a: "You export a clean, print-ready PDF resume.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your data stays private in the browser.",
      },
    ],
    related: ["invoice-generator", "signature-generator", "text-to-handwriting"],
  },
  {
    slug: "countdown-timer-generator",
    eyebrow: "Utility Generators",
    h1: "Countdown Timer Generator - Free Online Countdown",
    metaTitle:
      "Countdown Timer Online Free - Set a Countdown & Share It",
    metaDescription:
      "Set a countdown timer online free with a shareable link. Pick days, hours, minutes and seconds, then share the live countdown with anyone.",
    intro: [
      "Need a visible countdown for an event, a deadline, or a launch? Our countdown timer lets you set days, hours, minutes, and seconds — then share a link that shows the live countdown to anyone.",
      "Set a countdown, watch it tick down, and share it with a single link. Free, unlimited, and no sign-up.",
    ],
    toolName: "Countdown Timer Generator",
    toolHref: "/countdown-timer-generator",
    ctaText: "Set a countdown now",
    body: [
      {
        heading: "Count down to anything",
        text: [
          "Whether it's a product launch, a birthday, a trip, or a project deadline, a countdown builds anticipation and keeps people on track. Generate one in seconds and share it.",
          "Your countdown is saved in your browser and shared via a link, so you and anyone you share it with see the same remaining time.",
        ],
      },
      {
        heading: "Free and private",
        text: [
          "No account needed. Your countdown data is stored in your browser and shared only through the link you create.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I set a countdown timer?",
        a: "Open the Countdown Timer, choose the days, hours, minutes, and seconds, then start the timer and share the link.",
      },
      {
        q: "Can I share the countdown with others?",
        a: "Yes — generate a shareable link that shows the live countdown to anyone who opens it.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and requires no sign-up.",
      },
    ],
    related: ["random-name-picker", "text-to-speech-online", "qr-code-generator-online"],
  },
  {
    slug: "random-name-picker",
    eyebrow: "Utility Generators",
    h1: "Random Name Picker - Choose a Random Name Online",
    metaTitle:
      "Random Name Picker Online Free - Pick a Random Winner or Name",
    metaDescription:
      "Pick a random name from a list online free. Add names or options and spin to choose a random winner. Great for giveaways, classrooms, and decisions.",
    intro: [
      "Choosing a random name fairly is a classic need — for a giveaway, a classroom draw, a team assignment, or settling a decision. Our random name picker does it in one click.",
      "Type or paste your list of names, spin the picker, and get a fair random winner. Free, private, and unlimited.",
    ],
    toolName: "Random Name Picker",
    toolHref: "/random-name-picker",
    ctaText: "Pick a random name now",
    body: [
      {
        heading: "Fair picks in a single click",
        text: [
          "From social media giveaways to classroom questions and office coffee runs, a random picker removes any doubt about fairness. Add your list and get an instant, unbiased result.",
          "You can keep re-picking until the list is used up, perfect for drawing multiple winners in order.",
        ],
      },
      {
        heading: "Private, correct, and free",
        text: [
          "Everything runs locally in your browser — your list is never uploaded. Use it for giveaways, games, and decisions with total confidence in a fair outcome.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I pick a random name?",
        a: "Open the Random Name Picker, add the names to your list, and click spin to choose a random winner.",
      },
      {
        q: "Can I draw more than one winner?",
        a: "Yes, just keep spinning to draw names from your list one after another.",
      },
      {
        q: "Is the pick truly random?",
        a: "Yes — the winner is chosen at random, and your list stays private in the browser.",
      },
    ],
    related: ["countdown-timer-generator", "text-to-speech-online", "meme-generator"],
  },
  {
    slug: "text-to-handwriting",
    eyebrow: "Utility Generators",
    h1: "Text to Handwriting - Convert Text to Handwriting",
    metaTitle:
      "Text to Handwriting Online - Turn Digital Text Into Handwritten Notes",
    metaDescription:
      "Convert typed text into neat handwriting-style notes online free. Download as PNG or PDF with a choice of fonts and ink colors. Private, no sign-up.",
    intro: [
      "Turn typing into a natural handwritten look for notes, project samples, and fun content. Our text to handwriting tool renders your text as neat script you can download as an image or PDF.",
      "Choose a handwriting font and ink color, size your text to the page, and download. Free, private, and in your browser.",
    ],
    toolName: "Text to Handwriting",
    toolHref: "/text-to-handwriting",
    ctaText: "Convert text to handwriting now",
    body: [
      {
        heading: "The look of handwriting, the ease of typing",
        text: [
          "Whether you're making a sample for a design, creating a cute note, or demonstrating handwritten assignments, this tool gives your text an authentic handwritten feel without writing a word by hand.",
          "Pick from different handwriting styles and ink colors, and control how your text fills the page.",
        ],
      },
      {
        heading: "Download as PNG or PDF",
        text: [
          "Export your handwritten note as a high-quality image or a PDF. Everything runs in your browser, so your text stays private.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert text to handwriting?",
        a: "Open the Text to Handwriting tool, type your text, choose a font and ink color, and download it as a PNG or PDF.",
      },
      {
        q: "Which fonts are available?",
        a: "Multiple handwriting-style fonts are included so you can pick the look you want.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and runs entirely in the browser.",
      },
    ],
    related: ["signature-generator", "invoice-generator", "resume-builder"],
  },
  {
    slug: "meme-generator",
    eyebrow: "Mockup & Fun Tools",
    h1: "Meme Generator - Make a Meme Online Free",
    metaTitle:
      "Meme Generator Online Free - Create a Meme with Your Own Text",
    metaDescription:
      "Create memes online free. Add your text to popular templates or your own image and download a shareable meme. No sign-up, private.",
    intro: [
      "Make your own memes in seconds. Our meme generator lets you add top and bottom text to classic templates — or your own image — and download a shareable meme.",
      "Pick a template, type your captions, style the text, and generate. Free, unlimited, and in your browser.",
    ],
    toolName: "Meme Generator",
    toolHref: "/meme-generator",
    ctaText: "Make a meme now",
    body: [
      {
        heading: "Jump into the joke fast",
        text: [
          "The best memes are timely. Instead of opening heavy image editors, you can add crisp top-and-bottom text to a classic template and have a post-ready meme in under a minute.",
          "Work with built-in templates or load your own image to put your own spin on things.",
        ],
      },
      {
        heading: "Free and watermark-free",
        text: [
          "Generate as many memes as you want with no account and no watermark. Your image is processed locally and stays private.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make a meme?",
        a: "Open the Meme Generator, choose a template or upload an image, add your top and bottom text, and download your meme.",
      },
      {
        q: "Can I use my own image?",
        a: "Yes — upload your own image and add text captions to it.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your images stay private in the browser.",
      },
    ],
    related: ["fake-tweet-generator", "fake-whatsapp-chat", "fake-notification-generator"],
  },

  // ============================== CALCULATORS ==============================
  {
    slug: "age-calculator",
    eyebrow: "Calculator Tools",
    h1: "Age Calculator - Calculate Your Age Online",
    metaTitle:
      "Age Calculator Online - How Old Am I? Free Birthdate Calculator",
    metaDescription:
      "Calculate your exact age in years, months, weeks, and days online free. Find your age from a birthdate, next birthday, and more. Private and instant.",
    intro: [
      "Exactly how old are you, down to the day? Our age calculator takes a birthdate and tells you your precise age in years, months, weeks, days, hours, and minutes — plus when your next birthday is.",
      "Works for any date, not just your own: find anyone's age, count years between two dates, or check how many days old a baby is. Free and instant.",
    ],
    toolName: "Age Calculator",
    toolHref: "/age-calculator",
    ctaText: "Calculate your age now",
    body: [
      {
        heading: "More than just your age in years",
        text: [
          "A birthday-to-today calculation is useful far beyond curiosity. It helps with medical milestones, insurance and benefit questions, class and exam eligibility, and legal age checks.",
          "Our calculator breaks a person's age down into years, months, weeks, days, hours, and minutes so you always have the exact figure you need.",
        ],
      },
      {
        heading: "Instant, accurate, and private",
        text: [
          "The calculation runs instantly in your browser. You never upload anything and no data leaves your device, so it's safe to use for family, staff, or personal records.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate my age?",
        a: "Open the Age Calculator, enter your birthdate, and it instantly displays your age in years, months, weeks, and days.",
      },
      {
        q: "Does it account for leap years?",
        a: "Yes, the calculator correctly handles leap years and months with different lengths for an exact result.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and private with no sign-up.",
      },
    ],
    related: ["gpa-calculator", "unit-converter", "currency-converter"],
  },
  {
    slug: "gpa-calculator",
    eyebrow: "Calculator Tools",
    h1: "GPA Calculator - Calculate Your GPA Online",
    metaTitle:
      "GPA Calculator Online - Calculate Your Grade Point Average",
    metaDescription:
      "Calculate your GPA online free. Add courses, credits, and grades to get your accurate grade point average. Supports common grading scales. Private.",
    intro: [
      "Know exactly where you stand academically. Our GPA calculator lets you add your courses and grades with credit hours to compute your grade point average for a term or cumulatively.",
      "Understand how each grade affects your overall average and plan your next semester with confidence. Free, accurate, and private.",
    ],
    toolName: "GPA Calculator",
    toolHref: "/gpa-calculator",
    ctaText: "Calculate your GPA now",
    body: [
      {
        heading: "A clear picture of your academic standing",
        text: [
          "Your GPA matters for scholarships, admissions, honors, and job applications. Tracking it accurately lets you see exactly where you are and what you need to reach your target.",
          "Our calculator takes the credit hours of each course into account, so the result reflects the true weighting of your grades.",
        ],
      },
      {
        heading: "Plan ahead with confidence",
        text: [
          "Experiment with potential grades to see what your GPA would become next term. Everything runs privately in your browser with no uploads.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate my GPA?",
        a: "Open the GPA Calculator, add each course with its grade and credit hours, and your weighted GPA appears instantly.",
      },
      {
        q: "Does it support different grading scales?",
        a: "Yes, common 4.0-style letter grade scales are supported, and you can adjust as needed.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your academic data stays private in the browser.",
      },
    ],
    related: ["age-calculator", "unit-converter", "currency-converter"],
  },

  // ============================== CONVERTERS ==============================
  {
    slug: "unit-converter",
    eyebrow: "Converters",
    h1: "Unit Converter - Convert Length, Weight & More",
    metaTitle:
      "Unit Converter Online - Convert Length, Weight, Volume & Temperature",
    metaDescription:
      "Convert units online free. Quickly convert length, weight, volume, temperature, and more between metric and imperial. Accurate, instant, private.",
    intro: [
      "Switch between metric and imperial in a snap. Our unit converter handles length, weight, volume, temperature, and more, giving you accurate conversions instantly.",
      "Perfect for cooking, travel, construction, school, and everyday measurement questions. Free and private.",
    ],
    toolName: "Unit Converter",
    toolHref: "/unit-converter",
    ctaText: "Convert a unit now",
    body: [
      {
        heading: "Every conversion you need in one place",
        text: [
          "From grams to ounces, meters to feet, liters to gallons, and Celsius to Fahrenheit, our converter covers the units people reach for every day.",
          "No more guessing or switching between apps — enter a value, pick the units, and get an exact answer instantly.",
        ],
      },
      {
        heading: "Accurate and instant",
        text: [
          "Conversions are computed precisely in your browser, with no uploads and no sign-up. Use it for recipes, DIY projects, travel, and classroom work.",
        ],
      },
    ],
    faqs: [
      {
        q: "What units can I convert?",
        a: "Length, weight, volume, temperature, and more, including both metric and imperial units.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's completely free, unlimited, and private with no sign-up.",
      },
      {
        q: "Does it work offline?",
        a: "Conversions happen right in the browser, so the tool is fast and your values stay on your device.",
      },
    ],
    related: ["currency-converter", "age-calculator", "gpa-calculator"],
  },
  {
    slug: "currency-converter",
    eyebrow: "Converters",
    h1: "Currency Converter - Convert Currencies Online",
    metaTitle:
      "Currency Converter Online - Exchange Rates & Money Converter",
    metaDescription:
      "Convert between world currencies online free. Get up-to-date exchange rate conversions for travel, shopping, and business. Private and instant.",
    intro: [
      "Know exactly how much your money is worth abroad. Our currency converter turns any amount between world currencies instantly, so you can budget travel, shopping, and business confidently.",
      "Convert prices, say goodbye to rough mental estimates, and get a clear answer in seconds. Free and private.",
    ],
    toolName: "Currency Converter",
    toolHref: "/currency-converter",
    ctaText: "Convert currency now",
    body: [
      {
        heading: "Fast, reliable conversions",
        text: [
          "Whether you're planning a trip, shopping an overseas store, or invoicing international clients, knowing the real value of your money prevents costly surprises.",
          "Enter an amount, pick the two currencies, and see the converted value instantly.",
        ],
      },
      {
        heading: "Simple and private",
        text: [
          "No account, no history, no uploads. Get a clean conversion whenever you need it, right in your browser.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert currencies?",
        a: "Open the Currency Converter, enter an amount and choose two currencies to see the converted total instantly.",
      },
      {
        q: "Is it free?",
        a: "Yes, the currency converter is free and uses current exchange rate data.",
      },
      {
        q: "Does it work for any currency?",
        a: "It covers major world currencies, the ones most people need for travel and e-commerce.",
      },
    ],
    related: ["unit-converter", "age-calculator", "password-generator"],
  },

  // ============================== GENERATORS & SOCIAL MEDIA ==============================
  {
    slug: "password-generator",
    eyebrow: "Generators",
    h1: "Password Generator - Create Strong Random Passwords",
    metaTitle:
      "Password Generator Online - Create Strong Random Passwords",
    metaDescription:
      "Create secure, random passwords online free. Choose length and character types to generate strong, unguessable passwords. Private and browser-based.",
    intro: [
      "A strong password is your first line of defense online. Our password generator creates secure, random passwords you can tune for any site or service.",
      "Pick the length and which character types to include, and generate truly random, unguessable passwords — free and private.",
    ],
    toolName: "Password Generator",
    toolHref: "/password-generator",
    ctaText: "Generate a strong password now",
    body: [
      {
        heading: "Stop reusing weak passwords",
        text: [
          "Reusing one password across accounts is risky, and simple passwords are cracked in seconds. A generator makes a unique, random password for every site you use.",
          "You choose the length and whether it includes uppercase, lowercase, numbers, and symbols, so it fits each site's requirements.",
        ],
      },
      {
        heading: "Generated locally, kept private",
        text: [
          "Passwords are generated directly in your browser and never transmitted or stored anywhere. Use them with your favorite password manager for total security.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I create a strong password?",
        a: "Open the Password Generator, set the length and character types, and copy a cryptographically random password.",
      },
      {
        q: "Are generated passwords stored anywhere?",
        a: "No. Passwords are created in your browser and never saved or sent anywhere.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and completely private.",
      },
    ],
    related: ["username-generator", "currency-converter", "unit-converter"],
  },
  {
    slug: "username-generator",
    eyebrow: "Generators",
    h1: "Username Generator - Create Cool Usernames",
    metaTitle:
      "Username Generator Online - Generate Cool & Unique Usernames",
    metaDescription:
      "Generate cool, unique usernames online free. Find the perfect handle for games, social media, and profiles. Private, instant, no sign-up.",
    intro: [
      "Stuck on a username? Our generator creates cool, available-sounding usernames for games, social media, forums, and profiles.",
      "Mix bases, numbers, and styles until you find a handle you love. Free, instant, and private.",
    ],
    toolName: "Username Generator",
    toolHref: "/username-generator",
    ctaText: "Find a username now",
    body: [
      {
        heading: "The perfect handle, fast",
        text: [
          "A great username reflects your style and is easy to remember. Our generator combines words, interests, and random touches to spark ideas you might not think of on your own.",
          "Simplify when you've found something close, or keep generating until one clicks.",
        ],
      },
      {
        heading: "Endless ideas, no sign-up",
        text: [
          "Generate as many ideas as you like with no account. Everything runs in your browser, instantly and privately.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I generate a username?",
        a: "Open the Username Generator and it instantly produces unique combinations you can refresh until you find one you like.",
      },
      {
        q: "Can I customize the style?",
        a: "Yes — tune the generator toward certain bases, formats, and add numbers to fit your vibe.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and needs no sign-up.",
      },
    ],
    related: ["password-generator", "social-media-caption-generator", "text-to-speech"],
  },
  {
    slug: "social-media-caption-generator",
    eyebrow: "Social Media Tools",
    h1: "Social Media Caption Generator - AI Captions for Posts",
    metaTitle:
      "Social Media Caption Generator Online - Post Captions for Instagram",
    metaDescription:
      "Generate engaging social media captions for Instagram, Facebook, and more online free. Get click-worthy captions and hashtag ideas instantly. Private.",
    intro: [
      "Write captions that get engagement. Our social media caption generator produces catchy, on-brand captions for Instagram, Facebook, and every channel — in seconds.",
      "Describe your post and get ready-to-use caption ideas plus hashtag suggestions. Free, instant, and private.",
    ],
    toolName: "Caption Generator",
    toolHref: "/social-media-caption-generator",
    ctaText: "Generate a caption now",
    body: [
      {
        heading: "Beat the blank page",
        text: [
          "Staring at an empty caption box is the slowest part of posting. Our generator gives you a strong starting point you can tweak to match your voice and message.",
          "From punchy one-liners to story-driven captions, you'll have options that fit any post.",
        ],
      },
      {
        heading: "More engagement, less effort",
        text: [
          "Better captions mean more likes, comments, and shares. Get caption and hashtag ideas in seconds and post with confidence.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I generate a caption?",
        a: "Open the Caption Generator, describe your post or topic, and get ready-to-use caption ideas instantly.",
      },
      {
        q: "Does it include hashtags?",
        a: "Yes, it suggests relevant hashtags alongside the caption ideas.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and requires no sign-up.",
      },
    ],
    related: ["username-generator", "text-to-speech", "word-counter"],
  },

  // ============================== IMAGE & VIDEO SOCIAL TOOLS ==============================
  {
    slug: "aspect-ratio-cropper",
    eyebrow: "Image Tools",
    h1: "Aspect Ratio Cropper - Crop to 1:1, 16:9 & More",
    metaTitle:
      "Aspect Ratio Cropper Online - Crop Images to Any Ratio Free",
    metaDescription:
      "Crop images to any aspect ratio online free. Presets for Instagram, YouTube, Twitter, and custom ratios. Private, browser-based, no sign-up.",
    intro: [
      "Get the perfect framing for every platform. Our aspect ratio cropper lets you crop images to 1:1, 16:9, 4:5, 9:16, and any custom ratio in seconds.",
      "Match the exact size requirement of Instagram, YouTube, Twitter, and more — free and private.",
    ],
    toolName: "Aspect Ratio Cropper",
    toolHref: "/aspect-ratio-cropper",
    ctaText: "Crop to an aspect ratio now",
    body: [
      {
        heading: "Frame perfectly for every platform",
        text: [
          "Each social platform has its own preferred ratio, and uploading the wrong one means awkward crops that hurt impressions. Our cropper gets it right the first time.",
          "Choose a preset like 1:1 for Instagram square, 16:9 for video thumbnails, or set your own custom ratio.",
        ],
      },
      {
        heading: "Fast, accurate, and private",
        text: [
          "Drag to frame your image exactly, then download the crop. Everything stays in your browser, so your images are never uploaded.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I crop to an aspect ratio?",
        a: "Open the Aspect Ratio Cropper, load an image, pick a ratio preset, drag the crop box, and download the result.",
      },
      {
        q: "What presets are available?",
        a: "Popular presets include 1:1, 4:5, 9:16, 16:9, and 3:2, plus custom ratios.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and private with no sign-up.",
      },
    ],
    related: ["social-media-image-resizer", "image-compressor-online", "jpeg-compressor"],
  },
  {
    slug: "social-media-image-resizer",
    eyebrow: "Image Tools",
    h1: "Social Media Image Resizer - Resize Photos for Platforms",
    metaTitle:
      "Social Media Image Resizer Online - Correct Sizes for Instagram & More",
    metaDescription:
      "Resize images to the correct social media sizes online free for Instagram, Facebook, Twitter, and more. Private, browser-based, no sign-up.",
    intro: [
      "Resize your photos to the exact dimensions each social platform recommends. Our social media image resizer makes every post, story, and thumbnail look crisp and correctly framed.",
      "Pick a platform preset, upload your image, and download it sized correctly. Free and private.",
    ],
    toolName: "Social Media Image Resizer",
    toolHref: "/social-media-image-resizer",
    ctaText: "Resize a social image now",
    body: [
      {
        heading: "No more tiny or stretched photos",
        text: [
          "Uploading the wrong image size makes posts look soft, stretched, or awkwardly cropped. Using platform-correct dimensions keeps your feed sharp and professional.",
          "Choose presets for Instagram posts, stories, Facebook, Twitter, YouTube thumbnails, and more.",
        ],
      },
      {
        heading: "One tool for every channel",
        text: [
          "Resize images for all your platforms in one place, right in the browser, with no uploads and no account.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I resize an image for social media?",
        a: "Open the Social Media Image Resizer, choose a platform preset, upload your image, and download the correctly sized version.",
      },
      {
        q: "Which platforms are supported?",
        a: "Presets cover Instagram, Facebook, Twitter/X, YouTube, and other common channels.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your images stay private in the browser.",
      },
    ],
    related: ["aspect-ratio-cropper", "image-compressor-online", "jpg-to-pdf"],
  },
  {
    slug: "video-compressor-online",
    eyebrow: "Video Tools",
    h1: "Compress Video Online Free",
    metaTitle:
      "Compress Video Online Free - Reduce MP4 File Size",
    metaDescription:
      "Compress MP4 videos online free to share on Instagram, TikTok, Facebook, and email. Reduce file size without losing quality. Private, browser-based.",
    intro: [
      "Videos are too big for upload limits? Our video compressor shrinks MP4 files so they're faster to upload, share, and store — while staying watchable.",
      "Tuned for social platforms and email, you can reduce size in seconds, free and private.",
    ],
    toolName: "Video Compressor",
    toolHref: "/social-media-video-compressor",
    ctaText: "Compress a video now",
    body: [
      {
        heading: "Fit the size limits everywhere",
        text: [
          "Instagram, TikTok, Facebook, and email all cap video sizes that a modern phone easily exceeds. Compressing brings clips within those limits while keeping them clear enough to enjoy.",
          "Our compressor is focused on social requirements, so your video is ready for each platform.",
        ],
      },
      {
        heading: "Smaller files, easier sharing",
        text: [
          "Smaller videos upload faster over slow connections and take up less storage. Compress once and share anywhere.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I compress a video for free?",
        a: "Open the Video Compressor, add your MP4, pick a size or quality, and download the compressed file.",
      },
      {
        q: "Will the quality be good?",
        a: "The compressor balances file size and quality, tuned for social and email where smaller files are better.",
      },
      {
        q: "Is my video uploaded?",
        a: "Compression runs in your browser where supported, keeping your footage private.",
      },
    ],
    related: ["video-to-gif-online", "image-compressor-online", "aspect-ratio-cropper"],
  },

  // ============================== CONVERSIONS (SUPPORTED TOOLS ONLY) ==============================
  {
    slug: "jpg-to-pdf",
    eyebrow: "PDF Tools",
    h1: "Convert JPG to PDF Online Free",
    metaTitle:
      "JPG to PDF Converter Online Free - Turn Images into PDF",
    metaDescription:
      "Convert JPG images to a PDF online free. Combine multiple photos into a single PDF document. Private, browser-based, no sign-up.",
    intro: [
      "Turn a photo or a set of images into a single, shareable PDF. Our JPG to PDF converter bundles your images into one clean document — perfect for receipts, scans, and photo sets.",
      "Add your JPGs, arrange their order, and download a PDF in seconds. Free, private, and with no sign-up.",
    ],
    toolName: "JPG to PDF",
    toolHref: "/jpg-to-pdf",
    ctaText: "Convert JPG to PDF now",
    body: [
      {
        heading: "Bundle images into one document",
        text: [
          "Scanning or photographing documents on your phone produces a folder full of JPGs. Converting them into a single PDF makes them easy to send, print, and archive as one file.",
          "Our converter combines all your images into a single, ordered PDF ready for email or storage.",
        ],
      },
      {
        heading: "Private and browser-based",
        text: [
          "The conversion runs entirely in your browser, so your photos and documents never upload to a server. Free, unlimited, and with no account needed.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert JPG to PDF?",
        a: "Open the JPG to PDF tool, add one or more images, arrange their order, and download the combined PDF.",
      },
      {
        q: "Can I combine multiple images?",
        a: "Yes — add several JPGs and merge them into a single PDF document.",
      },
      {
        q: "Is it free?",
        a: "Yes, it's free, unlimited, and your images stay private in the browser.",
      },
    ],
    related: ["pdf-to-jpg-online", "pdf-to-word-online", "image-compressor-online"],
  },
];

export function getIndexPage(slug: string): IndexPage | undefined {
  return indexPages.find((p) => p.slug === slug);
}

export function getRelatedIndexPages(slug: string): IndexPage[] {
  const page = getIndexPage(slug);
  if (!page) return [];
  return page.related
    .map((s) => getIndexPage(s))
    .filter((p): p is IndexPage => Boolean(p));
}
