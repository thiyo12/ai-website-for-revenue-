import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ReceiptGenerator from "./ReceiptGenerator";

export const metadata: Metadata = {
  title: "Receipt Generator - Create Mock Receipts",
  description:
    "Create a realistic-looking thermal-print-style receipt mockup online for free. Add store, items, prices and total, then download as a PNG. For entertainment only.",
};

const seoTitle = "Free Receipt Generator";
const seoText = `Create a realistic-looking receipt with our free receipt generator. Add a store name, address, the date, your list of items with prices, tax, and a total, then download the receipt as a PNG image.

The result looks like a thermal-print sales receipt with itemized lines, a subtotal, tax, and a total. It is perfect for design mockups, templates, and entertainment.

Important: this is a simulated receipt and is not a valid receipt or proof of purchase. It must not be used for expense reimbursement, tax filing, warranty, or refund claims, which may constitute fraud.

Everything runs in your browser — nothing is uploaded or stored.

How to use it: enter the store and item details, add line items, choose a payment method, then click the download button to export your receipt.`;

export default function ReceiptGeneratorPage() {
  const description =
    "Create a realistic thermal-print-style receipt mockup with items, tax and total, then download it as a PNG. For entertainment only.";

  return (
    <ToolLayout
      title="Receipt Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <ReceiptGenerator />
    </ToolLayout>
  );
}