import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GpaCalculator from "./GpaCalculator";

export const metadata: Metadata = {
  title: "Free GPA Calculator Online - Calculate Your Semester & CGPA",
  description:
    "Calculate your GPA from your grades and credit hours with our free online GPA calculator. Supports letter grades, points, weighted credits, and multiple semesters. 100% private.",
};

const seoTitle = "Free Online GPA Calculator - Calculate Semester & Cumulative GPA";
const seoText = `Our free online GPA calculator makes it easy to work out your Grade Point Average from the grades and credit hours you earn in each course. It supports the standard 4.0 grading scale (A through F), lets you assign each course its own number of credit hours, and calculates both your semester GPA and your cumulative GPA across multiple terms.
 
Using it is simple: add a course, choose its grade, enter how many credit hours it is worth, and the calculator does the rest. Weighted grades, plus/minus letter grades, and courses with different credit values are all handled automatically. This makes it perfect for college and university students who need to track their academic standing, plan for scholarships, or prepare for graduate school applications.
 
Everything is calculated locally in your browser, so your grades and academic information are never sent to a server or stored. There is no sign-up and nothing to install. You can enter as many courses and semesters as you need and see your GPA update instantly.
 
Whether you are keeping an eye on a single semester or your entire college career, this GPA calculator gives you accurate, up-to-date results in seconds, on any device.`;

export default function GpaCalculatorPage() {
  const description =
    "Calculate your weighted GPA from your course grades and credit hours. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="GPA Calculator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <GpaCalculator />
    </ToolLayout>
  );
}
