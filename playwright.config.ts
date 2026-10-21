import { defineConfig, devices } from '@playwright/test';

// Not Astro's default port, so a running dev server is never mistaken for the
// production build
const PORT = 4322;

export default defineConfig({
  testDir: './e2e',
  outputDir: 'e2e-results/artifacts',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'e2e-results/html', open: 'never' }],
  ],
  use: {
    baseURL: `http://localhost:${PORT}`,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // The Netlify adapter doesn't support `astro preview`, so the static build
  // output is served directly. Server-rendered routes (`/api/*`,
  // `/unsubscribe`) are therefore not available and get mocked where needed.
  webServer: {
    command: `npm run build && serve dist --listen ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
