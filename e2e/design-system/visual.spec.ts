import { expect, test, type Page } from '@playwright/test';
import {
  ALL_MODES,
  assertCatalogueBuilt,
  gotoCatalogue,
  setLocale,
  setMode,
  waitForPaint,
} from './helpers';

/**
 * Baselines visuales del catálogo interno MC-17.
 *
 * IMPORTANTE (generación de baselines):
 * - Este spec NO escribe baselines falsos ni compara contra una captura generada
 *   en la misma ejecución. En la primera ejecución Playwright crea las imágenes
 *   de referencia y la prueba falla con "snapshot doesn't exist"; una segunda
 *   ejecución es la que compara.
 * - Las baselines se congelan en el commit revisado y las vuelve a ejecutar el
 *   auditor independiente. No se actualizan con `--update-snapshots` sin revisión.
 * - Se fija locale=es y se desactivan animaciones; cualquier diferencia real de
 *   layout/color debe revisarse, no enmascararse subiendo el umbral.
 */

const GALLERIES = [
  { key: 'foundation', selector: 'marea-foundation-gallery' },
  { key: 'structured', selector: 'marea-structured-gallery' },
  { key: 'commerce', selector: 'marea-commerce-gallery' },
  { key: 'instrument', selector: 'marea-instrument-gallery' },
] as const;

const SCREENSHOT_OPTIONS = {
  maxDiffPixelRatio: 0.002,
  animations: 'disabled',
  fullPage: false,
  caret: 'hide',
  scale: 'css',
} as const;

test.beforeAll(async () => {
  await assertCatalogueBuilt();
});

test.describe('visual baselines', () => {
  for (const mode of ALL_MODES) {
    test(`all galleries at 1440x900 in ${mode}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await gotoCatalogue(page);
      await setLocale(page, 'es');
      await setMode(page, mode);

      for (const gallery of GALLERIES) {
        await captureGallery(page, gallery.selector, `${gallery.key}-1440x900-${mode}.png`);
      }
    });
  }

  test('all galleries at 320x812 in web-light and instrument-night', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 812 });

    for (const mode of ['web-light', 'instrument-night'] as const) {
      await gotoCatalogue(page);
      await setLocale(page, 'es');
      await setMode(page, mode);

      for (const gallery of GALLERIES) {
        await captureGallery(page, gallery.selector, `${gallery.key}-320x812-${mode}.png`);
      }
    }
  });

  test('foundation gallery ES vs EN pair at 1440x900', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await gotoCatalogue(page);
    await setMode(page, 'web-light');

    await setLocale(page, 'es');
    await captureGallery(
      page,
      'marea-foundation-gallery',
      'foundation-1440x900-web-light-locale-es.png',
    );

    await setLocale(page, 'en');
    await captureGallery(
      page,
      'marea-foundation-gallery',
      'foundation-1440x900-web-light-locale-en.png',
    );
  });
});

/**
 * Captura el primer viewport de la galería solicitada.
 *
 * La captura es de página con `fullPage:false` (el requisito del contrato) y se
 * ancla desplazando la galería al borde superior, de modo que el nombre del
 * snapshot identifique la galería aunque el viewport sólo muestre su inicio.
 */
async function captureGallery(page: Page, selector: string, snapshotName: string): Promise<void> {
  const gallery = page.locator(selector).first();
  await expect(gallery, `No se encontró la galería ${selector}`).toBeVisible();
  await gallery.evaluate((element) => {
    const top = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: 'instant' });
  });
  await waitForPaint(page);
  await expect(page).toHaveScreenshot(snapshotName, SCREENSHOT_OPTIONS);
}
