import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InvoiceGenerator from "./InvoiceGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/invoice-generator"),
  title: "Invoice Generator - Create & Download PDF Invoice",
  description:
    "Create a professional invoice online for free. Add your business, client, itemized lines and totals, preview live, then download as PDF. 100% private.",
};

const seoTitle = "Free Online Invoice Generator";
const seoText = `Create a clean, professional invoice with our free invoice generator. Add your business name and details, your client's information, and itemized line items with quantities and prices. The tool calculates the subtotal, tax, and grand total automatically.

You can upload your business logo, set an invoice number, issue date, and due date, add payment terms and notes, and pick a currency symbol. A live preview updates as you type, so you always see exactly what the final invoice will look like.

When you are happy, download the invoice as a PDF that you can email directly to your client.

Everything runs entirely in your browser — your business and client data never leaves your device, so it stays private and secure.

How to use it: fill in your details, add line items, review the preview, and click the download button to export your PDF invoice.`;

export default function InvoiceGeneratorPage() {
  const description =
    "Create a professional invoice with itemized lines, totals and a logo, preview it live, and download it as a PDF.";

  return (
    <ToolLayout
      title="Invoice Generator"
      description={description}
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <InvoiceGenerator />
    </ToolLayout>
  );
}