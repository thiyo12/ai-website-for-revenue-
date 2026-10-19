import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TextToSpeech from "./TextToSpeech";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/text-to-speech"),
  title: "Text to Speech - Read Text Aloud in Your Browser",
  description:
    "Listen to text with your browser's speech voices. Change voice, speaking speed, and pitch without uploading your text.",
};

const seoTitle = "Text to Speech: browser voices and local listening controls";
const seoText = `## Listen with your browser's voices

Enter text, choose an available system/browser voice and adjust speaking rate and pitch. Playback uses the browser Speech Synthesis API, so the available voices and languages depend on the operating system and browser.

## Playback controls

Use the Speak button to start reading the text aloud. Pressing it again while speech is active stops playback. Rate and pitch can be adjusted before speaking to make the result easier to understand or better suited to the content.

## Why there is no MP3 download

This tool supports browser-based speech playback, not audio file export. Most browsers cannot save the built-in speech synthesis output as an MP3 directly. We do not advertise downloads through an unsupported external service.

## Privacy and limitations

Playback uses browser-provided voices without sending your typed text to our server. Some operating systems may obtain voices through their own services. Voice quality, pronunciation and language support vary by device. The tool is useful for listening and accessibility support, but generated speech should be reviewed before professional publication or pronunciation-sensitive use.`;

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
