import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CurrencyConverter from "./CurrencyConverter";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/currency-converter"),
  title: "Currency Converter - Convert Common Currencies Online",
  description:
    "Convert between common currencies using current exchange-rate data fetched through QuicTools.",
};

const seoTitle = "Currency Converter: live-rate usage and important limitations";
const seoText = `## What this converter does

The currency converter supports a focused list of common currencies including USD, EUR, GBP, JPY, INR, LKR, AUD, CAD, CNY, CHF, NZD and SGD. Choose a source currency, destination currency and amount to calculate an estimated conversion.

## Where the rate comes from

When the source currency changes, QuicTools requests current exchange-rate data through its server-side exchange-rate endpoint. The displayed result therefore depends on the latest rate data returned by the upstream rates service.

## Why your bank may show a different amount

Market reference rates are not the same as the final rate offered by a bank, card network, remittance service or exchange counter. Providers can add spreads, fees, commissions and their own timing rules. Use this calculator as an estimate rather than a guaranteed transaction quote.

## Privacy

The browser sends the selected base currency to the QuicTools exchange-rate endpoint to obtain rate data. The amount you type is used locally for the arithmetic after the rates are returned.`;

export default function CurrencyConverterPage() {
  return (
    <ToolLayout
      title="Currency Converter"
      description="Estimate conversions between common currencies using current rate data."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <CurrencyConverter />
    </ToolLayout>
  );
}
