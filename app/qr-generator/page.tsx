import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import QrGenerator from "./QrGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online - Create QR Codes as PNG",
  description:
    "Generate QR codes from any text or URL online for free. Create scannable QR codes instantly and download them as high-quality PNG images.",
};

const seoTitle = "Free Online QR Code Generator - Create Scannable QR Codes";
const seoText = `Create a QR code in seconds with our free online QR code generator. Simply type any text, URL, or Wi-Fi information and a scannable QR code appears instantly. Pointing a phone camera at the code opens the link or shows the text you entered.

QR codes have never been more useful. They connect print advertising to websites, power contactless menus in restaurants, share Wi-Fi passwords, and link product packaging to online stores. With this tool you can generate a fresh code for any purpose in less than a minute.

The generator works completely in your browser, so the text you enter never leaves your device. There is no account, no watermarks, and no waiting. As you type, the QR code updates in real time so you can preview exactly what your customers, readers, or guests will scan.

Once you are happy with your code, download it as a crisp, high-resolution PNG image ready for posters, business cards, flyers, emails, and websites. Clear the field and generate a new code whenever you like — it is completely free, forever.`;

export default function QrGeneratorPage() {
  const description =
    "Turn any text or URL into a scannable QR code and download it as a high-quality PNG. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="QR Code Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <QrGenerator />
    </ToolLayout>
  );
}