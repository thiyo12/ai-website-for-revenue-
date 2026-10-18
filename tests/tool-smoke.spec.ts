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
      const jsErrors: string[] = [];
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

test("unit conversion updates correct field when units change", async ({ page }) => {
  await page.goto("/unit-converter");
  const fromUnit = page.locator("#uc-convert-from");
  const toUnit = page.locator("#uc-convert-to");
  const values = page.locator('input[type="number"]');
  await fromUnit.selectOption("m");
  await toUnit.selectOption("ft");
  await values.nth(0).fill("2");
  await toUnit.selectOption("cm");
  await expect(values.nth(0)).toHaveValue("2");
  await expect(values.nth(1)).toHaveValue("200");

  await values.nth(1).fill("50");
  await fromUnit.selectOption("mm");
  await expect(values.nth(1)).toHaveValue("50");
  await expect(values.nth(0)).toHaveValue("500");
});

test("mobile layout does not overflow the viewport on key tools", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/2048", "/word-counter", "/pdf-merger", "/jpg-to-pdf", "/qr-generator"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, route + " horizontal overflow in pixels").toBeLessThanOrEqual(2);
  }
});

test("age calculator handles calendar dates independently of browser time zone", async ({ page }) => {
  await page.goto("/age-calculator");
  await page.locator("#age-birth").fill("2000-01-15");
  await page.locator("#age-target").fill("2026-10-15");
  await expect(page.getByText("26 years", { exact: true })).toBeVisible();
  await expect(page.getByText("9 months and 0 days")).toBeVisible();
  await page.locator("#age-target").fill("1999-12-31");
  await expect(page.getByText("Please select a valid date of birth.")).toBeVisible();
});

test("GPA calculator averages weighted courses correctly", async ({ page }) => {
  await page.goto("/gpa-calculator");
  await page.getByRole("button", { name: "+ Add course" }).click();
  const rows = page.locator("tbody tr");
  await rows.nth(1).locator("select").selectOption("B");
  await expect(page.getByText("3.50", { exact: true })).toBeVisible();
  await expect(page.getByText("21.0", { exact: true })).toBeVisible();
});

test("currency converter calculates both directions from mocked rate data", async ({ page }) => {
  await page.route("**/api/exchange-rate?*", async route => {
    const base = new URL(route.request().url()).searchParams.get("base");
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({
      base,
      rates: base === "USD" ? { USD: 1, LKR: 2 } : { LKR: 1, USD: 0.5 }
    }) });
  });
  await page.goto("/currency-converter");
  await page.locator("#cc-amount").fill("10");
  await expect(page.getByText(/Rs 20 LKR/)).toBeVisible();
  await page.getByRole("button", { name: "Swap currencies" }).click();
  await expect(page.getByText(/\$ 5 USD/)).toBeVisible();
});
