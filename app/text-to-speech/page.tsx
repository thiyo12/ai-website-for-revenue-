import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TextToSpeech from "./TextToSpeech";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/text-to-speech"),
  title: "Text to Speech - Read Text Aloud in Your Browser",
  description:
    "Listen to text with your browser's speech voices, adjust rate and pitch, and optionally download a short MP3.",
};

const seoTitle = "Text to Speech: browser voices, controls and MP3 download behavior";
const seoText = `## Listen with your browser's voices

Enter text, choose an available system/browser voice and adjust speaking rate and pitch. Playback uses the browser Speech Synthesis API, so the available voices and languages depend on the operating system and browser.

## Playback controls

Use the Speak button to start reading the text aloud. Pressing it again while speech is active stops playback. Rate and pitch can be adjusted before speaking to make the result easier to understand or better suited to the content.

## MP3 download behavior

The optional MP3 download uses an external Google text-to-speech endpoint and currently sends only the first 200 characters of the entered text for that download request. This is different from normal browser playback, which uses the browser's speech synthesis capability.

## Privacy and limitations

If privacy is important, use browser playback rather than the external MP3 download option. Voice quality, pronunciation and language support vary by device. The tool is useful for listening and accessibility support, but generated speech should be reviewed before professional publication or pronunciation-sensitive use.`;

export default function TextToSpeechPage() {
  return (
    <ToolLayout
      title="Text to Speech"
      description="Listen to text with browser voices and adjust rate and pitch."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <TextToSpeech />
    </ToolLayout>
  );
}
