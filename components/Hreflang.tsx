"use client";

import { usePathname } from "next/navigation";
import { SITE_URL } from "@/lib/site";

export default function Hreflang() {
  const pathname = usePathname();
  const url = `${SITE_URL}${pathname}`;

  return (
    <>
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </>
  );
}