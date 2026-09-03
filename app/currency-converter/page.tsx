import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CurrencyConverter from "./CurrencyConverter";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/currency-converter"),
  title: "Free Currency Converter Online - Live Exchange Rates",
  description:
    "Convert between world currencies with live, up-to-date exchange rates. USD, EUR, GBP, JPY, INR, LKR and more. Free, fast, and easy to use.",
};

const seoTitle = "Free Online Currency Converter - Live Exchange Rates";
const seoText = `Convert between world currencies instantly with our free online currency converter. Supporting major currencies including US Dollar, Euro, British Pound, Japanese Yen, Indian Rupee, Sri Lankan Rupee, Australian Dollar, and Canadian Dollar, the tool uses up-to-date exchange rates so you always get an accurate result.
 
Simply choose the currency you are converting from, the currency you want to convert to, and enter the amount. The converted value appears immediately, and you can swap the two currencies with a single tap. It is perfect for travel planning, online shopping in foreign currencies, sending money abroad, or checking how the markets have moved.
 
Exchange rates are fetched through a secure server endpoint and refreshed regularly, so the numbers you see are current. Because the conversion happens for a single amount you enter, your use is simple and free — no sign-up, no account, and no limits.
 
Whether you are budgeting a trip to Europe, comparing prices on international marketplaces, or tracking the value of your remittances, this currency converter gives you clear, reliable results in seconds, on any device.`;

export default function CurrencyConverterPage() {
  const description =
    "Convert between world currencies with live, up-to-date exchange rates. Fast and easy to use.";

  return (
    <ToolLayout
      title="Currency Converter"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
