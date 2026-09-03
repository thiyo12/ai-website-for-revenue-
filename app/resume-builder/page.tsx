import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ResumeBuilder from "./ResumeBuilder";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/resume-builder"),
  title: "Resume Builder - Create & Download PDF Resume",
  description:
    "Build a professional resume online for free. Choose a template, fill in your experience and skills, preview live, then download as PDF. 100% private.",
};

const seoTitle = "Free Online Resume Builder";
const seoText = `Create a clean, professional resume with our free resume builder. Add your contact details, a professional summary, work experience, education, and skills. Choose from a few ready-made templates and a color theme, then preview the result live as you type.

Everything is laid out automatically so it looks polished and consistent. When you are happy with your resume, download it as a PDF that is ready to send to employers.

Privacy first: your resume runs entirely in your browser. None of your personal information, work history, or details ever leave your device or get stored on a server.

How to use it: fill in your details in the form, pick a template and color, review the live preview, and click the download button to export your PDF resume.`;

export default function ResumeBuilderPage() {
  const description =
    "Build a professional resume from your experience and skills with a custom color, preview it live, and download it as a PDF.";

  return (
    <ToolLayout
      title="Resume Builder"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ResumeBuilder />
    </ToolLayout>
  );
}