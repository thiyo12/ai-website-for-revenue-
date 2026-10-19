import { test, expect } from "playwright/test";
import { getClientIp, isPrivateIpAddress, RateLimiter } from "../app/api/lib/rate";
import { isAllowedVideoCdnUrl } from "../app/api/lib/video-cdn";

test("network guard rejects internal and reserved IPv4 / IPv6 addresses", () => {
  for (const address of [
    "127.0.0.1", "10.0.0.3", "172.16.1.2", "192.168.1.8",
    "169.254.169.254", "100.64.0.1", "198.18.0.1", "203.0.113.10",
    "::1", "::", "::ffff:127.0.0.1", "fc00::1", "fd12::8",
    "fe80::1", "fec0::1", "ff02::1", "2001:db8::1",
    "not-an-ip", "256.0.0.1"
  ]) {
    expect(isPrivateIpAddress(address), address).toBe(true);
  }
  for (const address of ["8.8.8.8", "1.1.1.1", "2606:4700:4700::1111"]) {
    expect(isPrivateIpAddress(address), address).toBe(false);
  }
});

test("media proxy accepts only HTTPS googlevideo CDN hosts", () => {
  for (const url of [
    "https://rr1---sn-5hneknee.googlevideo.com/videoplayback",
    "https://googlevideo.com/videoplayback"
  ]) {
    expect(isAllowedVideoCdnUrl(new URL(url)), url).toBe(true);
  }
  for (const url of [
    "https://evilgooglevideo.com/x", "http://rr1.googlevideo.com/x",
    "https://googlevideo.com.evil.example/x", "https://localhost/x",
    "https://user:pass@googlevideo.com/x", "https://googlevideo.com:8443/x"
  ]) {
    expect(isAllowedVideoCdnUrl(new URL(url)), url).toBe(false);
  }
});

test("in-memory throttling caps identities, expires old ones, and limits repeat callers", async () => {
  const limiter = new RateLimiter(2, 20, 2);
  expect(limiter.isLimited("client-a")).toBe(false);
  expect(limiter.isLimited("client-a")).toBe(false);
  expect(limiter.isLimited("client-a")).toBe(true);
  expect(limiter.isLimited("client-b")).toBe(false);
  expect(limiter.isLimited("client-c")).toBe(true);
  await new Promise((resolve) => setTimeout(resolve, 30));
  expect(limiter.isLimited("client-c")).toBe(false);
});

test("nearest proxy hop is selected rather than spoofable leftmost forwarded IP", () => {
  const request = { headers: new Headers({
    "x-forwarded-for": "192.0.2.111, 198.51.100.25, 203.0.113.8",
    "x-real-ip": "203.0.113.8"
  }) } as Parameters<typeof getClientIp>[0];
  expect(getClientIp(request)).toBe("203.0.113.8");

  const bad = { headers: new Headers({ "x-forwarded-for": "anything-invalid" }) } as Parameters<typeof getClientIp>[0];
  expect(getClientIp(bad)).toBe("untrusted-default");
});
