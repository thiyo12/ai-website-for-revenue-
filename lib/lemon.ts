import { ENV } from "./env";

const BASE = "https://api.lemonsqueezy.com";

async function lemonsqueezyHeaders(): Promise<Record<string, string>> {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${ENV.LEMONSQUEEZY_API_KEY}`,
  };
}

export async function lsGet(path: string): Promise<Response> {
  return fetch(`${BASE}${path}`, { headers: await lemonsqueezyHeaders() });
}

export async function lsPost(path: string, body: unknown): Promise<Response> {
  return fetch(`${BASE}${path}`, {
    method: "POST",
    headers: await lemonsqueezyHeaders(),
    body: JSON.stringify(body),
  });
}

export function checkoutUrl(variant: "LK" | "Global"): string {
  if (variant === "LK") return ENV.LEMONSQUEEZY_CHECKOUT_LK;
  return ENV.LEMONSQUEEZY_CHECKOUT_GLOBAL;
}
