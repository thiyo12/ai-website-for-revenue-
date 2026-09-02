import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AgeCalculator from "./AgeCalculator";

export const metadata: Metadata = {
  title: "Free Age Calculator Online - Calculate Exact Age in Years, Months, Days",
  description:
    "Calculate your exact age in years, months, days, hours, and total days lived with our free online age calculator. Instant, accurate, and 100% private.",
};

const seoTitle = "Free Online Age Calculator - Find Your Exact Age";
const seoText = `Our free online age calculator tells you your exact age down to the day. Enter your date of birth and it instantly calculates how many years, months, and days old you are, along with the total number of days you have been alive. It is the perfect tool for birthdays, milestone tracking, retirement planning, and school or work applications that ask for your precise age.
 
The calculator works out the exact difference between your birthday and today (or any date you choose), accounting for leap years, so the result is always accurate to the day. You can also use the "date on" field to find out how old you were on a specific past date — useful for verifying age for records, anniversaries, or historical events.
 
Everything runs in your browser, so your date of birth is never sent to a server, stored, or shared. There is no sign-up and nothing to install. Type in your date and get an answer in a fraction of a second.
 
Whether you are figuring out your age in dog years, checking when your child turns 18, or tracking your own milestones, this age calculator gives you a precise answer every time, on any device.`;

export default function AgeCalculatorPage() {
  const description =
    "Find your exact age in years, months, days, and total days lived. Runs 100% in your browser.";

  return (
    <ToolLayout
      title="Age Calculator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <AgeCalculator />
    </ToolLayout>
  );
}
