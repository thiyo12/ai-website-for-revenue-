import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UsernameGenerator from "./UsernameGenerator";

export const metadata: Metadata = {
  title: "Free Username Generator - Cool, Unique Usernames",
  description:
    "Generate cool, unique usernames for games, social media, and more. Pick a style, mix in numbers and symbols, and copy the perfect username instantly.",
};

const seoTitle = "Free Online Username Generator";
const seoText = `Find the perfect username in seconds with our free username generator. Pick a base word or let the generator suggest creative handles, then choose whether to add numbers, symbols, and a prefix to make it unique.
 
This is ideal for gaming handles, social media profiles, email addresses, forum accounts, and any place you need a distinctive online identity. The generator combines words and modifiers in fun, memorable ways so your username stands out.
 
If you have a specific word in mind, type it in and the generator will build variations around it. Otherwise pick a style — like cool, cute, or edgy — and get a batch of ready-made handles.
 
Everything runs instantly in your browser. There is no account, no sign-up, and no limit, so you can generate as many usernames as you like until you find the one that fits.`;
 
export default function UsernameGeneratorPage() {
  const description =
    "Generate cool, unique usernames for games, social media and more. Mix in numbers and symbols for a handle that stands out.";

  return (
    <ToolLayout
      title="Username Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <UsernameGenerator />
    </ToolLayout>
  );
}
