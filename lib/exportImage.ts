"use client";

import html2canvas from "html2canvas";

/**
 * Captures a DOM element as a PNG and triggers a browser download.
 * Shared by the mockup/export tools so we render mockups as normal HTML
 * (no low-level canvas drawing) and capture them with html2canvas.
 */
export async function exportElementAsPng(
  el: HTMLElement | null,
  filename: string,
  scale = 2
): Promise<boolean> {
  if (!el) return false;
  try {
    const canvas = await html2canvas(el, {
      scale,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  } catch {
    return false;
  }
}