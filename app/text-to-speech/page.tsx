import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TextToSpeech from "./TextToSpeech";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/text-to-speech"),
  title: "Free Text to Speech Online - Read Text Aloud",
  description:
    "Convert text to speech online for free. Listen to any text read aloud with natural voices, adjust rate and pitch, and download audio. No sign-up required.",
};

const seoTitle = "Free Online Text to Speech - Listen & Download Audio";
const seoText = `Turn any text into natural-sounding speech with our free text to speech tool. Type or paste your text, choose a voice, and listen to it read aloud instantly. You can adjust the speaking rate and pitch to get exactly the sound you want.
 
This is perfect for proofreading your writing, hearing how a script sounds before recording, helping students listen to study material, or just giving your eyes a break from the screen. The tool works completely in your browser using your device's built-in voices.
 
For downloading an audio file, the tool uses Google's text to speech engine to generate an MP3 you can save to your device and use anywhere — in videos, presentations, podcasts, or personal study notes.
 
Everything happens on your device. Your text is never uploaded or stored, so you can safely convert private notes, names, and sensitive content. There is no sign-up and no limits, so you can listen to as much text as you like.`;
 
export default function TextToSpeechPage() {
  const description =
    "Listen to any text read aloud with adjustable rate and pitch, or download it as an MP3. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Text to Speech"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <TextToSpeech />
    </ToolLayout>
  );
}
