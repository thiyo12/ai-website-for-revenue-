import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return [];
}

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeprecatedIndexPage() {
  notFound();
}
