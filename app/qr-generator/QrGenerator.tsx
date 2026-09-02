"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import PaywallModal from "@/components/PaywallModal";

export default function QrGenerator() {
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(512);
  const [dataUrl, setDataUrl] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const trimmed = text.trim();
    if (!trimmed) {
      if (!cancelled) {
        setDataUrl("");
        setError("Enter some text or a URL to generate a QR code.");
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    QRCode.toDataURL(trimmed, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "H",
    })
      .then((url) => {
        if (!cancelled) {
          setDataUrl(url);
          setError("");
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Could not generate a QR code for that text.");
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [text, size]);

  return (
    <div className="space-y-6">
      <PaywallModal />
      <div>
        <label
          htmlFor="qr-input"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Text or URL
        </label>
        <textarea
          id="qr-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Paste a URL or type any text…"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
        <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          {loading ? (
            <div className="flex h-[300px] w-[300px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent-200 border-t-accent-600" />
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt={`QR code for ${text}`}
              width={size}
              height={size}
              className="h-[300px] w-[300px]"
            />
          ) : (
            <div className="flex h-[300px] w-[300px] items-center justify-center text-sm text-gray-400">
              No QR code yet
            </div>
          )}
        </div>

        <div className="w-full max-w-[300px] space-y-4">
          <div>
            <label
              htmlFor="qr-size"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Size: {size}px
            </label>
            <input
              id="qr-size"
              type="range"
              min={128}
              max={1024}
              step={64}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full accent-accent-600"
            />
          </div>

          <a
            href={dataUrl || undefined}
            download={`qr-code-${size}px.png`}
            aria-disabled={!dataUrl}
            className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors ${
              dataUrl
                ? "bg-accent-600 text-white hover:bg-accent-700"
                : "pointer-events-none bg-gray-200 text-gray-400"
            }`}
          >
            Download QR code (PNG)
          </a>
        </div>
      </div>
    </div>
  );
}