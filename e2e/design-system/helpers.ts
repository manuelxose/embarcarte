import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Utilidades compartidas por el E2E del catálogo interno MC-17.
 *
 * El catálogo se compila con `npm run build:design-system-preview` en
 * `dist/marea-ds-catalogue/browser` y se sirve en http://127.0.0.1:4301. No es
 * la aplicación pública: `npm run build` no lo compila y `playwright.config.ts`
 * no lo sirve.
 */

export const CATALOGUE_URL = 'http://127.0.0.1:4301';
export const CATALOGUE_DIST = join(process.cwd(), 'dist', 'marea-ds-catalogue', 'browser');
export const RESULTS_DIR = join(process.cwd(), 'test-results', 'design-system');
export const EVIDENCE_DIR = join(process.cwd(), 'docs', 'marea', 'design-system', 'evidence');

export type CatalogueMode =
  'web-light' | 'instrument-day' | 'instrument-sunlight' | 'instrument-night';

export type CatalogueLocale = 'es' | 'en';

/** Etiquetas reales de los controles del catálogo (marea-ds-catalogue). */
export const MODE_LABELS: Readonly<Record<CatalogueMode, string>> = {
  'web-light': 'Web claro',
  'instrument-day': 'Instrumento · día',
  'instrument-sunlight': 'Instrumento · sol',
  'instrument-night': 'Instrumento · noche',
};

export const ALL_MODES: readonly CatalogueMode[] = [
  'web-light',
  'instrument-day',
  'instrument-sunlight',
  'instrument-night',
];

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] as const;

/**
 * Comprueba que el catálogo está compilado y que el servidor estático responde.
 *
 * Se registra con `test.beforeAll` en cada spec. Si `dist/` no existe, Playwright
 * no debe fallar con un timeout opaco: el mensaje indica el comando exacto.
 */
export async function assertCatalogueBuilt(): Promise<void> {
  const indexFile = join(CATALOGUE_DIST, 'index.html');
  expect(
    existsSync(indexFile),
    [
      `No existe el catálogo compilado: ${indexFile}`,
      'Compílalo antes de ejecutar este E2E: `npm run build:design-system-preview`.',
      'El build público `npm run build` NO compila el catálogo interno a propósito.',
    ].join('\n'),
  ).toBe(true);

  let status: number | null = null;
  try {
    const response = await fetch(`${CATALOGUE_URL}/`, {
      signal: AbortSignal.timeout(10_000),
    });
    status = response.status;
  } catch (error) {
    throw new Error(
      [
        `El servidor del catálogo no responde en ${CATALOGUE_URL}:`,
        error instanceof Error ? error.message : String(error),
        'Arráncalo con `node scripts/marea-ds-preview-server.mjs` o deja que el webServer de Playwright lo haga.',
      ].join('\n'),
    );
  }

  expect(
    status,
    [
      `El servidor del catálogo respondió HTTP ${status} en ${CATALOGUE_URL}/.`,
      'Suele significar que falta `dist/marea-ds-catalogue/browser/index.html`.',
      'Compílalo con `npm run build:design-system-preview`.',
    ].join('\n'),
  ).toBe(200);
}

/** Navega al catálogo y espera a que Angular haya renderizado las galerías base. */
export async function gotoCatalogue(page: Page): Promise<void> {
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.locator('marea-theme')).toBeVisible();
  await expect(page.locator('marea-foundation-gallery')).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
    return true;
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await waitForPaint(page);
}

/** Cambia el modo visual por el botón accesible del catálogo y espera el tema. */
export async function setMode(page: Page, mode: CatalogueMode): Promise<void> {
  const button = page.getByRole('button', { name: MODE_LABELS[mode], exact: true });
  await expect(button, `No existe el botón de modo "${MODE_LABELS[mode]}"`).toBeVisible();
  await button.click();
  await expect(page.locator('marea-theme')).toHaveAttribute('data-marea-mode', mode);
  await waitForPaint(page);
}

/** Cambia el idioma del sistema de diseño con los botones ES / EN. */
export async function setLocale(page: Page, locale: CatalogueLocale): Promise<void> {
  const button = page.getByRole('button', { name: locale === 'es' ? 'ES' : 'EN', exact: true });
  await expect(button, `No existe el botón de idioma "${locale.toUpperCase()}"`).toBeVisible();
  await button.click();
  await expect(page.locator('marea-theme')).toHaveAttribute('lang', locale);
  await waitForPaint(page);
}

/** Espera dos frames: evita leer estilos o geometría a mitad de render. */
export async function waitForPaint(page: Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

/** `document.documentElement.scrollWidth <= innerWidth + 2` con mensaje útil. */
export async function expectNoHorizontalOverflow(page: Page, context: string): Promise<void> {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    metrics.scrollWidth,
    `${context}: desbordamiento horizontal (documentElement.scrollWidth=${metrics.scrollWidth}px, viewport=${metrics.innerWidth}px, body.scrollWidth=${metrics.bodyScrollWidth}px)`,
  ).toBeLessThanOrEqual(metrics.innerWidth + 2);
}

/**
 * Ejecuta axe con las etiquetas WCAG A/AA requeridas.
 *
 * Las reglas de "region"/landmark de axe sólo aplican a nivel de página. El
 * catálogo no declara un landmark `main` (es una herramienta interna, no una
 * página), así que se desactiva `region` en ese caso; nunca se desactivan
 * color-contrast, name-role-value, aria ni reglas de teclado.
 */
export async function collectAxe(page: Page): Promise<AxeResults> {
  const builder = new AxeBuilder({ page }).withTags([...AXE_TAGS]);
  const hasMainLandmark = await page.evaluate(() =>
    Boolean(document.querySelector('main, [role="main"]')),
  );
  if (!hasMainLandmark) {
    builder.disableRules(['region']);
  }
  return builder.analyze();
}

/** Resume las violaciones de axe en líneas accionables (id, impacto, selectores). */
export function describeViolations(results: AxeResults): string[] {
  return results.violations.map((violation) => {
    const firstTargets = violation.nodes
      .slice(0, 5)
      .map((node) => node.target.join(' '))
      .join(' | ');
    const suffix = violation.nodes.length > 5 ? ' | …' : '';
    return `${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help} → ${violation.nodes.length} nodo(s): ${firstTargets}${suffix}`;
  });
}

/** Escribe JSON de evidencia creando el directorio destino. Devuelve la ruta. */
export function writeJsonFile(directory: string, fileName: string, value: unknown): string {
  mkdirSync(directory, { recursive: true });
  const filePath = join(directory, fileName);
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  return filePath;
}
