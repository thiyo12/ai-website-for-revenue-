import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FakeCallerId from "./FakeCallerId";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/fake-caller-id-generator"),
  title: "Fake Caller ID Generator - Create Incoming Call Screens",
  description:
    "Create a realistic-looking incoming call screen mockup online for free. Add caller name, phone number, avatar and carrier, then download as a PNG. For entertainment only.",
};

const seoTitle = "Free Fake Caller ID Generator";
const seoText = `Create a realistic-looking incoming call screen with our free fake caller ID generator. Add a caller name, phone number, avatar, and your service provider label, then download the mockup as a PNG image.

The result looks like a real phone ringing with an incoming call. It is a completely generic phone screen design — it does not use any operating system or carrier logos or trademarks — and is intended for entertainment, design mockups, and demonstration only.

Everything runs in your browser — nothing is uploaded or stored. The shown caller ID is simulated and does not represent a real telephone call, phone number, or service provider.

How to use it: enter the caller details, choose or upload an avatar, pick an accent color, then click the download button to export your PNG.`;

export default function FakeCallerIdPage() {
  const description =
    "Create a realistic incoming-call screen mockup with caller name, number, avatar and carrier, then download it as a PNG. For entertainment only.";

  return (
    <ToolLayout
      title="Fake Caller ID Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <FakeCallerId />
    </ToolLayout>
  );
}