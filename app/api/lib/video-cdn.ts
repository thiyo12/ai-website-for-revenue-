import { promises as dns } from "node:dns";
import { isPrivateIpAddress } from "./rate";

// The site's extractor currently supports YouTube only. Do not expose the
// downloader as an unauthenticated proxy for arbitrary Internet resources.
export function isAllowedVideoCdnUrl(url: URL): boolean {
  const host = url.hostname.toLowerCase();
  return (
    url.protocol === "https:" &&
    url.port === "" &&
    !url.username &&
    !url.password &&
    (host === "googlevideo.com" || host.endsWith(".googlevideo.com"))
  );
}

export async function assertAllowedVideoCdnUrl(url: URL): Promise<void> {
  if (!isAllowedVideoCdnUrl(url)) throw new Error("disallowed media host");
  const records = await dns.lookup(url.hostname, { all: true, verbatim: true });
  if (!records.length || records.some((record) => isPrivateIpAddress(record.address))) {
    throw new Error("private or unresolvable media host");
  }
}

// Validate every redirect separately. A one-off DNS check followed by
// redirect:"follow" would let the source redirect us into private networks.
export async function safeVideoCdnFetch(
  initial: URL,
  headers: Record<string, string>,
  signal: AbortSignal
): Promise<Response> {
  let url = initial;
  for (let redirects = 0; redirects <= 4; redirects++) {
    await assertAllowedVideoCdnUrl(url);
    const response = await fetch(url, { headers, signal, redirect: "manual" });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      await response.body?.cancel();
      if (!location || redirects === 4) throw new Error("too many media redirects");
      url = new URL(location, url);
      continue;
    }
    return response;
  }
  throw new Error("too many media redirects");
}
