import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ResumeBuilder from "./ResumeBuilder";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/resume-builder"),
  title: "Resume Builder - Create and Download a PDF Resume",
  description:
    "Build a resume with contact details, summary, skills, work experience and education, then export it as PDF.",
};

const seoTitle = "Resume Builder: organize your information and review the PDF";
const seoText = `## What you can add

The resume builder includes contact information, job title, professional summary, skills, work experience and education. You can add multiple experience and education entries and choose an accent color for the preview.

## Writing useful content

Keep job descriptions specific and focused on results, responsibilities and relevant skills. A shorter resume with clear evidence is often easier to scan than a document filled with generic claims. Tailor the content to the role instead of using the same wording for every application.

## PDF export

The resume preview is rendered to PDF in the browser. Review the downloaded file before applying, especially page breaks, dates, phone number, email address and links. Automated applicant-tracking systems vary, so no visual resume builder can guarantee how every employer system will parse a PDF.

## Privacy

The resume fields and PDF rendering for this builder are handled in the browser. The tool does not need to send your resume content to QuicTools merely to generate the preview and PDF.`;

export default function ResumeBuilderPage() {
  return (
    <ToolLayout
      title="Resume Builder"
      description="Build a resume from your experience, skills and education and export it as PDF."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ResumeBuilder />
    </ToolLayout>
  );
}
