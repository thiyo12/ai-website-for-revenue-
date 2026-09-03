import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PasswordGenerator from "./PasswordGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/password-generator"),
  title: "Free Strong Password Generator - Create Secure Random Passwords",
  description:
    "Generate strong, secure, random passwords instantly with our free password generator. Customize length and character sets. 100% local — nothing is sent to any server.",
};

const seoTitle = "Free Online Password Generator - Create Strong Secure Passwords";
const seoText = `Generate strong, unguessable passwords in a single click with our free online password generator. You can choose the password length and decide exactly which character types to include — uppercase letters, lowercase letters, numbers, and symbols — so you get a password that meets the requirements of any website.
 
Weak, reused passwords are the number one cause of hacked accounts. Using a long, random password for every site is the simplest way to protect your online identity. This tool uses your browser's built-in cryptographic random number generator to produce truly random passwords, not predictable ones.
 
Your privacy is our priority: nothing you generate here is ever sent to a server. All password generation happens locally on your device in your browser, so the passwords never leave your computer and there is no way for us or anyone else to see them. There is no sign-up, no account, and nothing is stored.
 
Pair your generated passwords with a password manager to keep them safe and automatically fill them in everywhere. With configurable length and character sets, you can craft the perfect strong password for every account, on any device, completely free.`;

export default function PasswordGeneratorPage() {
  const description =
    "Create strong, secure passwords with custom length and character sets. Generated 100% locally — nothing is sent to any server.";

  return (
    <ToolLayout
      title="Password Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <PasswordGenerator />
    </ToolLayout>
  );
}
