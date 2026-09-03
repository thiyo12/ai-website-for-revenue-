import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restore Access - QuicTools",
  robots: { index: false, follow: false },
};

export default function RestoreAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}