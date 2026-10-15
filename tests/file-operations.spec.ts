import { test, expect } from "playwright/test";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { Document, Packer, Paragraph } from "docx";
import { readFile } from "node:fs/promises";

async function samplePdf(text: string): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([300, 300]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText(text, { x: 20, y: 230, size: 18, font });
  return Buffer.from(await pdf.save());
}

async function captureDownload(page: import("playwright/test").Page, button: RegExp) {
  const downloadPromise = page.waitForEvent("download", { timeout: 20_000 });
  await page.getByRole("button", { name: button }).click();
  const download = await downloadPromise;
  const filepath = await download.path();
  if (!filepath) throw new Error("Download path was unavailable");
  return { filename: download.suggestedFilename(), bytes: await readFile(filepath) };
}

test("PDF merger produces a readable two-page PDF", async ({ page }) => {
  await page.goto("/pdf-merger");
  await page.locator('input[type="file"]').setInputFiles([
    { name: "first.pdf", mimeType: "application/pdf", buffer: await samplePdf("First file") },
    { name: "second.pdf", mimeType: "application/pdf", buffer: await samplePdf("Second file") },
  ]);
  await expect(page.getByText("Ready to merge (2 files)")).toBeVisible();
  const result = await captureDownload(page, /Merge 2 PDFs/);
  expect(result.filename).toBe("merged.pdf");
  const merged = await PDFDocument.load(result.bytes);
  expect(merged.getPageCount()).toBe(2);
});

test("JPG-to-PDF exports a valid one-page PDF", async ({ page }) => {
  await page.goto("/jpg-to-pdf");
  const encoded = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 8; canvas.height = 8;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#2277bb";
    context.fillRect(0, 0, 8, 8);
    return canvas.toDataURL("image/jpeg").split(",")[1];
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "photo.jpg", mimeType: "image/jpeg", buffer: Buffer.from(encoded, "base64")
  });
  const result = await captureDownload(page, /Generate PDF|Create PDF|Convert to PDF/);
  expect(result.filename).toBe("images.pdf");
  const pdf = await PDFDocument.load(result.bytes);
  expect(pdf.getPageCount()).toBe(1);
});

test("PDF-to-Word exports a DOCX ZIP file", async ({ page }) => {
  await page.goto("/pdf-to-word");
  await page.locator('input[type="file"]').setInputFiles({
    name: "document.pdf", mimeType: "application/pdf", buffer: await samplePdf("QuicTools QA")
  });
  await expect(page.getByText("1 page", { exact: true })).toBeVisible({ timeout: 15_000 });
  const result = await captureDownload(page, /Convert to Word/);
  expect(result.filename).toBe("document.docx");
  expect(result.bytes.subarray(0, 2).toString()).toBe("PK");
  expect(result.bytes.length).toBeGreaterThan(500);
});

test("PDF-to-JPG exports an actual JPEG", async ({ page }) => {
  await page.goto("/pdf-to-jpg");
  await page.locator('input[type="file"]').setInputFiles({
    name: "document.pdf", mimeType: "application/pdf", buffer: await samplePdf("Photo conversion")
  });
  await expect(page.getByText("1 page", { exact: true })).toBeVisible({ timeout: 15_000 });
  const result = await captureDownload(page, /Convert 1 pages to JPG/);
  expect(result.filename).toBe("document-page-1.jpg");
  expect(result.bytes[0]).toBe(0xff);
  expect(result.bytes[1]).toBe(0xd8);
});

test("Word-to-PDF exports a readable PDF", async ({ page }) => {
  const doc = new Document({ sections: [{ children: [new Paragraph("QuicTools generated fixture")] }] });
  const fixture = await Packer.toBuffer(doc);
  await page.goto("/word-to-pdf");
  await page.locator('input[type="file"]').setInputFiles({
    name: "sample.docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    buffer: fixture,
  });
  const result = await captureDownload(page, /Convert to PDF/);
  expect(result.filename).toBe("sample.pdf");
  const pdf = await PDFDocument.load(result.bytes);
  expect(pdf.getPageCount()).toBeGreaterThan(0);
});

test("download APIs reject external proxy targets and private networks", async ({ request }) => {
  for (const route of ["/api/download", "/api/download/merged"]) {
    for (const target of ["https://example.com/large.mp4", "http://127.0.0.1:8080/private"]) {
      const response = await request.get(route + "?url=" + encodeURIComponent(target));
      expect(response.status(), route + ": " + target).toBeGreaterThanOrEqual(400);
      expect(response.status(), route + ": " + target).toBeLessThan(500);
    }
  }
});
