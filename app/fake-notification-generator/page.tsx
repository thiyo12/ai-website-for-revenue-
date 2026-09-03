import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FakeNotification from "./FakeNotification";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/fake-notification-generator"),
  title: "Fake Notification Generator - Create Mock Phone Alerts",
  description:
    "Create a realistic-looking phone notification mockup online for free. Add app name, header, body, icon and timestamp, then download as a PNG. For entertainment only.",
};

const seoTitle = "Free Fake Notification Generator";
const seoText = `Create a realistic-looking smartphone notification screenshot with our free fake notification generator. Add an app name, a header title, the notification body, your own app icon, and a timestamp, then download the mockup as a PNG image.

The result looks like a real push notification sliding in at the top of a phone screen, perfect for app UI previews, design mockups, tutorials, or entertainment. You can customize the accent color to match your style.

Everything runs in your browser — nothing is uploaded or stored. The image is a simulated notification for entertainment and demonstration purposes only and does not represent a real alert.

How to use it: fill in the notification details, pick an icon and color, then click the download button to export your PNG.`;

export default function FakeNotificationPage() {
  const description =
    "Create a realistic phone notification mockup with an app name, header, body, icon and timestamp, then download it as a PNG. For entertainment only.";

  return (
    <ToolLayout
      title="Fake Notification Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <FakeNotification />
    </ToolLayout>
  );
}