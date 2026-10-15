import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  retries: 1,
  workers: 2,
  use: { baseURL: "http://127.0.0.1:3000", ...devices["Desktop Chrome"], trace: "retain-on-failure" },
  webServer: {
    command: "npm run start -- -H 127.0.0.1 -p 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { NEXT_PUBLIC_ENABLE_PRO_PAYWALL: "false" }
  }
});
