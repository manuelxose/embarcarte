import { defineConfig, devices } from '@playwright/test';

/**
 * E2E del catálogo interno del sistema de diseño (MC-17).
 *
 * El catálogo es un proyecto Angular aislado (`marea-design-system-catalogue`,
 * fuente en `preview/`) que se compila aparte en `dist/marea-ds-catalogue/browser`
 * y se sirve con un servidor estático propio. NO forma parte de la aplicación
 * pública, de su build ni de `playwright.config.ts`.
 *
 * Requisitos previos:
 *   npm run build:design-system-preview
 *   npm run test:design-system:visual
 *
 * Un solo worker: las evidencias (axe, capturas responsive y baselines visuales)
 * se escriben en rutas compartidas y deben ser deterministas.
 */
export default defineConfig({
  testDir: './e2e/design-system',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 240_000,
  outputDir: 'test-results/design-system/artifacts',
  expect: { timeout: 10_000 },
  reporter: [['list'], ['json', { outputFile: 'test-results/design-system/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4301',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node scripts/marea-ds-preview-server.mjs',
    url: 'http://127.0.0.1:4301',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
