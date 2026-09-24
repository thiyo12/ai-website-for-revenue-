import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PasswordGenerator from "./PasswordGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/password-generator"),
  title: "Password Generator - Create Random Passwords in Your Browser",
  description:
    "Generate a random password with adjustable length and character sets using browser-side randomness.",
};

const seoTitle = "Password Generator: options, randomness and safe-use guidance";
const seoText = `## What you can control

Choose the password length and whether to include uppercase letters, lowercase letters, numbers and symbols. The generator ensures that selected character groups are represented when the chosen length allows it.

## How randomness is generated

In modern browsers the tool uses the Web Crypto API to obtain random values. A fallback is present for environments where that browser API is unavailable, so for important accounts you should use a current browser that supports secure Web Crypto randomness.

## Good password practice

Long, unique passwords are generally more useful than short passwords with minor variations. Do not reuse the same generated password across different services. For important accounts, store unique passwords in a reputable password manager and enable multi-factor authentication where available.

## Privacy

Password generation happens locally in the browser. The generated password does not need to be sent to QuicTools for creation.`;

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Create a random password with adjustable length and character sets."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <PasswordGenerator />
    </ToolLayout>
  );
}
