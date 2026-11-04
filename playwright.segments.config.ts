import { defineConfig, devices } from '@playwright/test';

/**
 * E2E of the MC-19 internal audience pages (EMBARCARTE / MAREA).
 *
 * The pages are rendered by the isolated Angular SSR project
 * `marea-landing-preview` (source in `preview/landing`), built into
 * `dist/marea-landing-preview` and served only on loopback
 * (http://127.0.0.1:4302). They are NOT part of the public application, its
 * build or `playwright.config.ts`.
 *
 * Prerequisites:
 *   npm run build:landing:preview
 *   npx playwright test -c playwright.segments.config.ts
 *
 * One worker: axe, screenshots and evidence files write to shared paths and must
 * be deterministic. `reuseExistingServer` keeps a manual preview running.
 */
export default defineConfig({
  testDir: './e2e/segments',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 240_000,
  expect: { timeout: 10_000 },
  outputDir: 'test-results/segments/artifacts',
  reporter: [['list'], ['json', { outputFile: 'test-results/segments/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4302',
    locale: 'es-ES',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node dist/marea-landing-preview/server/server.mjs',
    url: 'http://127.0.0.1:4302/__preview/health',
    reuseExistingServer: true,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
