import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FakeWhatsappChat from "./FakeWhatsappChat";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/fake-whatsapp-chat"),
  title: "Fake WhatsApp Chat Generator - Create Chat Screenshots",
  description:
    "Create realistic-looking WhatsApp-style chat mockups online for free. Add messages, avatars and colors, then download as a PNG. For entertainment only.",
};

const seoTitle = "Free Fake WhatsApp Chat Generator";
const seoText = `Create a realistic WhatsApp-style chat screenshot with our free fake chat generator. Add a contact name, custom avatars, bubble color, and a full back-and-forth message conversation, then download the result as a PNG image.

The mockup looks like a real messaging conversation, including timestamps, read ticks, and received messages on one side versus sent messages on the other. You can add as many messages as you like, reorder them, and customize the contact details to match the scene you want.

Everything runs in your browser — nothing is uploaded, stored, or transmitted. The image you create is for entertainment and demonstration purposes only and is not an authentic chat log.

How to use it: enter your name and the contact name, choose avatars, then add messages one by one using the input below the chat. When you are happy with the conversation, export it as a PNG and share or save it.`;

export default function FakeWhatsappChatPage() {
  const description =
    "Create a realistic WhatsApp-style chat mockup with messages, avatars and colors, then download it as a PNG. For entertainment only.";

  return (
    <ToolLayout
      title="Fake WhatsApp Chat Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <FakeWhatsappChat />
    </ToolLayout>
  );
}