import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60 * 1000, // single test timeout
  globalTimeout: 60 * 60 * 1000, // test run timeout
  expect: {
    timeout: 15 * 1000, // expect timeout
  },
  use: {
    baseURL: 'https://demo.prestashop.com',
    trace: 'on-first-retry',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1200 },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1600, height: 1200 },
      },
    },
  ],
});
