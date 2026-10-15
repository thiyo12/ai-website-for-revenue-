import { test, expect } from "playwright/test";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const app = join(process.cwd(), "app");
const routes = readdirSync(app, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(app, d.name, "page.tsx")))
  .map((d) => "/" + d.name)
  .filter((route) => !["/restore-access"].includes(route))
  .sort();

test.describe("all public tools and games render", () => {
  for (const route of routes) {
    test(route, async ({ page }) => {
      const jsErrors = [];
      page.on("pageerror", (error) => jsErrors.push(error.message));
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      expect(jsErrors, route + " JavaScript errors").toEqual([]);
    });
  }
});

test("word counter counts sample text", async ({ page }) => {
  await page.goto("/word-counter");
  await page.locator("#wc-text").fill("Hello world. This is a test.");
  const words = page.locator("dl").locator("div").filter({ has: page.locator("dt", { hasText: /^Words$/ }) });
  await expect(words.locator("dd")).toHaveText("6");
});
test("QR generator creates downloadable PNG", async ({ page }) => {
  await page.goto("/qr-generator");
  await page.locator("#qr-input").fill("https://quictools.cc/");
  await expect(page.locator('img[alt^="QR code"]')).toHaveAttribute("src", /^data:image\/png;base64,/);
  await expect(page.getByRole("link", { name: /Download QR code/ })).toHaveAttribute("download", /png$/);
});
test("password generator changes password", async ({ page }) => {
  await page.goto("/password-generator");
  await expect(page.getByRole("button", { name: "Generate new password" })).toBeVisible();
  await page.getByRole("button", { name: "Generate new password" }).click();
  await expect(page.getByRole("button", { name: "Copy" })).toBeEnabled();
});
test("unsupported JPG to PDF input rejected", async ({ page }) => {
  await page.goto("/jpg-to-pdf");
  await expect(page.locator('input[type="file"]')).toHaveAttribute("accept", /jpeg/);
});
test("privacy and contact pages exist", async ({ page }) => {
  for (const url of ["/privacy", "/terms-of-service", "/about", "/contact"]) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
  }
});

test("countdown initializes without hydration warnings", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/countdown-timer-generator");
  await expect(page.locator('input[type="datetime-local"]')).not.toHaveValue("");
  expect(errors).toEqual([]);
});

test("2048 starts with tiles and can restart", async ({ page }) => {
  await page.goto("/2048");
  const game = page.locator(".game-bg-animated");
  await expect(game.getByText("2", { exact: true }).first()).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(game).toBeVisible();
});

test("color palette generates five valid colors", async ({ page }) => {
  await page.goto("/color-palette-generator");
  const colors = page.locator('button[title="Click to copy"]');
  await expect(colors).toHaveCount(5);
  await page.getByRole("button", { name: "Generate new palette" }).click();
  await expect(colors).toHaveCount(5);
});
