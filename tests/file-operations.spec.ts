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

test("image compressor accepts JPG and exports a real image", async ({ page }) => {
  await page.goto("/image-compressor");
  const encoded = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 320; canvas.height = 220;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#8b5cf6";
    context.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.9).split(",")[1];
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "test-image.jpg", mimeType: "image/jpeg", buffer: Buffer.from(encoded, "base64"),
  });
  await expect(page.getByRole("button", { name: "Download compressed image" })).toBeVisible({ timeout: 20_000 });
  const result = await captureDownload(page, /Download compressed image/);
  expect(result.bytes.length).toBeGreaterThan(100);
  expect(result.bytes[0]).toBe(0xff);
  expect(result.bytes[1]).toBe(0xd8);
});

test("merged media rejects excessive and malformed byte ranges before proxying", async ({ request }) => {
  const url = "/api/download/merged?url=" + encodeURIComponent("https://rr1---sn.googlevideo.com/videoplayback");
  for (const range of ["bytes=0-20000000", "bytes=0-1,3-4", "bytes=100-50"]) {
    const response = await request.get(url, { headers: { Range: range } });
    expect(response.status(), range).toBe(416);
  }
});

test("aspect-ratio cropper creates a real square JPEG with default 1:1", async ({ page }) => {
  await page.goto("/aspect-ratio-cropper");
  const base64 = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 200; canvas.height = 100;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "rgb(30, 120, 210)";
    ctx.fillRect(0, 0, 200, 100);
    return canvas.toDataURL("image/png").split(",")[1];
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "sample.png", mimeType: "image/png", buffer: Buffer.from(base64, "base64")
  });
  await page.getByRole("button", { name: "Crop to 1:1" }).click();
  const image = page.getByRole("img", { name: "Cropped" });
  await expect(image).toBeVisible();
  await expect.poll(async () => image.evaluate((el: HTMLImageElement) => [el.naturalWidth, el.naturalHeight])).toEqual([100, 100]);
  const result = await captureDownload(page, /Download image/);
  expect(result.filename).toBe("cropped-1x1.jpg");
  expect([...result.bytes.subarray(0, 2)]).toEqual([0xff, 0xd8]);
});

test("social image resizer actually center-crops source and exports correct dimensions", async ({ page }) => {
  await page.goto("/social-media-image-resizer");
  const base64 = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 200; canvas.height = 100;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f00000"; ctx.fillRect(0, 0, 100, 100);
    ctx.fillStyle = "#0000f0"; ctx.fillRect(100, 0, 100, 100);
    return canvas.toDataURL("image/png").split(",")[1];
  });
  await page.locator('input[type="file"]').setInputFiles({
    name: "two-colors.png", mimeType: "image/png", buffer: Buffer.from(base64, "base64")
  });
  await page.getByLabel("Custom size").check();
  await page.getByPlaceholder("Width").fill("120");
  await page.getByPlaceholder("Height").fill("120");
  await page.getByRole("button", { name: "Resize to 120x120" }).click();
  const image = page.getByRole("img", { name: "Resized" });
  await expect(image).toBeVisible();
  const resultPixels = await image.evaluate((el: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = el.naturalWidth; canvas.height = el.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(el, 0, 0);
    return { width: canvas.width, height: canvas.height,
      left: [...ctx.getImageData(10, 60, 1, 1).data],
      right: [...ctx.getImageData(110, 60, 1, 1).data] };
  });
  expect([resultPixels.width, resultPixels.height]).toEqual([120, 120]);
  expect(resultPixels.left[0]).toBeGreaterThan(180);
  expect(resultPixels.right[2]).toBeGreaterThan(180);
  const result = await captureDownload(page, /Download image/);
  expect(result.filename).toBe("resized-120x120.jpg");
  expect([...result.bytes.subarray(0, 2)]).toEqual([0xff, 0xd8]);
});
