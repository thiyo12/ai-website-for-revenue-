import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const alt = `${SITE_NAME} - Free Online Tools, Private & Browser-Based`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 44,
            fontWeight: 800,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#4f46e5",
            }}
          >
            Q
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            Quic<span style={{ color: "#a5b4fc" }}>Tools</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            <span>Free Online Tools That</span>
            <span>Respect Your Privacy</span>
          </div>
          <div style={{ fontSize: 26, color: "#cbd5e1" }}>
            Compress, merge, generate, convert, and download — all in your browser.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#94a3b8" }}>{SITE_URL}</div>
      </div>
    ),
    size
  );
}