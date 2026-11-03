import { defineConfig, devices } from '@playwright/test';

/**
 * E2E del landing corporativo interno MC-18 (EMBARCARTE / MAREA).
 *
 * El landing es un proyecto Angular AISLADO (`marea-landing-preview`, fuente en
 * `preview/landing`) que se compila en `dist/marea-landing-preview` y se sirve
 * sólo en loopback (http://127.0.0.1:4302). NO forma parte de la aplicación
 * pública, de su build ni de `playwright.config.ts`.
 *
 * Requisitos previos:
 *   npm run build:landing:preview
 *   npx playwright test -c playwright.landing.config.ts
 *
 * Un solo worker: axe, capturas responsive y baselines visuales escriben en
 * rutas compartidas y deben ser deterministas. `reuseExistingServer` permite
 * reutilizar un servidor de preview ya arrancado durante la revisión manual.
 */
export default defineConfig({
  testDir: './e2e/landing',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 240_000,
  expect: { timeout: 10_000 },
  outputDir: 'test-results/landing/artifacts',
  reporter: [['list'], ['json', { outputFile: 'test-results/landing/results.json' }]],
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
