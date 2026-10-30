import { defineConfig, devices } from '@playwright/test';

/**
 * E2E real de navegador contra el build de producción y una base SQLite temporal.
 * Un solo worker: los pedidos comparten catálogo y stock en el servidor aislado.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { outputFolder: 'artifacts/e2e-report', open: 'never' }]],
  outputDir: 'artifacts/e2e-results',
  use: {
    baseURL: 'http://127.0.0.1:4310',
    locale: 'en-GB',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  webServer: {
    command: 'node scripts/e2e-server.mjs',
    url: 'http://127.0.0.1:4310/healthz',
    reuseExistingServer: false,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
