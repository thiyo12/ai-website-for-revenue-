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
