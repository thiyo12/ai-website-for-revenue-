import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InvoiceGenerator from "./InvoiceGenerator";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/invoice-generator"),
  title: "Invoice Generator - Create and Download a PDF Invoice",
  description:
    "Build an invoice with business details, client information, line items, tax and notes, then export it as PDF.",
};

const seoTitle = "Invoice Generator: what it includes and what to review before sending";
const seoText = `## What the invoice builder includes

Add your business details, client information, invoice number, issue and due dates, line items, quantities, rates, tax and notes. You can also add a logo and preview the finished document before exporting it.

## How totals are calculated

The subtotal is calculated from each line-item quantity multiplied by its rate. The selected tax percentage is then applied to the subtotal to produce the total shown in the invoice preview. Review all values before sending the document to a customer.

## PDF export

The current exporter renders the invoice preview into a PDF in the browser. Complex logos, very long invoices or unusual browser zoom settings can affect the final layout, so open the downloaded PDF and check page breaks, totals and contact information before using it professionally.

## Responsibility and privacy

The invoice generator is a formatting tool, not accounting, tax or legal advice. You are responsible for numbering, taxes, required business information and local invoicing rules. Form data and the PDF-rendering workflow are handled in the browser for this tool.`;

export default function InvoiceGeneratorPage() {
  return (
    <ToolLayout
      title="Invoice Generator"
      description="Create an itemized invoice, calculate totals and export the result as PDF."
      seoTitle={seoTitle}
      seoText={seoText}
    >
      <InvoiceGenerator />
    </ToolLayout>
  );
}
