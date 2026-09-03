"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/**
 * Captures a DOM element and produces a single-page PDF fitted to A4.
 * Used by the invoice/resume/text-to-handwriting tools.
 */
export async function exportElementAsPdf(
  el: HTMLElement | null,
  filename: string,
  scale = 2
): Promise<boolean> {
  if (!el) return false;
  try {
    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const widthPx = el.offsetWidth || 794;
    const heightPx = el.offsetHeight || 1123;
    const ratio = widthPx / heightPx;

    // Fit the capture onto a single A4-ish page.
    const pageWidth = 794; // px at ~96dpi
    const pageHeight = Math.round(pageWidth / ratio);

    const doc = new jsPDF({
      orientation: ratio > 1 ? "landscape" : "portrait",
      unit: "px",
      format: [pageWidth, pageHeight],
      compress: true,
    });

    doc.addImage(canvas, "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
    doc.save(filename);
    return true;
  } catch {
    return false;
  }
}