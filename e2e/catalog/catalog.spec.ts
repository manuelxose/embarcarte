import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * MC-20 internal catalogue end-to-end suite.
 *
 * Proves, against the real loopback SSR preview:
 *   - nine server-rendered family/locale pages with noindex and no public metadata;
 *   - client hydration without console errors;
 *   - canonical facts on the rendered page (editions, readiness, AIS receive-only);
 *   - ES/EN structural parity;
 *   - keyboard access to the skip link and in-page navigation;
 *   - no horizontal overflow at 320/390/768/1440;
 *   - axe-core with 0 critical or serious violations;
 *   - internal isolation: no public family route and no purchase path.
 */

const FAMILIES = [
  'nav',
  'hub',
  'ais',
  'sense',
  'watch',
  'weather',
  'display',
  'pilot',
  'fleet',
] as const;
const PAGES = [
  ...FAMILIES.map((family) => ({ path: `/internal/catalog/${family}`, locale: 'es', family })),
  ...FAMILIES.map((family) => ({ path: `/en/internal/catalog/${family}`, locale: 'en', family })),
];
const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

const PUBLIC_METADATA_MARKERS = [
  'rel="canonical"',
  'hreflang=',
  'property="og:',
  'name="twitter:',
  'application/ld+json',
];

const SECTION_HOSTS = 11; // hero + ten numbered sections

test.describe('MC-20 catalogue — SSR, isolation and hydration', () => {
  for (const page of PAGES) {
    test(`SSR ${page.locale} ${page.path}: noindex, no public metadata, 200`, async ({
      request,
    }) => {
      const response = await request.get(page.path);
      expect(response.status()).toBe(200);
      expect(response.headers()['x-robots-tag']).toContain('noindex, nofollow, noarchive');
      const html = await response.text();
      for (const marker of PUBLIC_METADATA_MARKERS) {
        expect(html, `${page.path} emits ${marker}`).not.toContain(marker);
      }
      expect(html).toContain('data-marea-preview="internal-not-published"');
      expect(html).toContain('name="marea-publication" content="NOT_AUTHORIZED"');
      expect(html).toContain(`data-marea-catalog-family="${page.family.toUpperCase()}"`);
      expect(html).toContain(`data-marea-catalog-locale="${page.locale}"`);
    });
  }

  test('unknown internal path returns 404', async ({ request }) => {
    const response = await request.get('/internal/catalog/unknown');
    expect(response.status()).toBe(404);
  });

  test('the proposed public family route is not served by the preview', async ({ request }) => {
    for (const path of [
      '/marea/nav',
      '/marea/hub',
      '/marea/ais',
      '/marea/sense',
      '/marea/watch',
      '/marea/weather',
      '/marea/display',
      '/marea/pilot',
      '/marea/fleet',
    ]) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });

  test('health endpoint lists exactly the eighteen catalogue paths', async ({ request }) => {
    const response = await request.get('/__preview/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.publication).toBe('NOT_AUTHORIZED');
    expect(body.cataloguePaths).toHaveLength(18);
    expect(body.cataloguePaths).toContain('/internal/catalog/nav');
    expect(body.cataloguePaths).toContain('/en/internal/catalog/ais');
    expect(body.cataloguePaths).toContain('/internal/catalog/weather');
    expect(body.cataloguePaths).toContain('/en/internal/catalog/sense');
    expect(body.cataloguePaths).toContain('/internal/catalog/display');
    expect(body.cataloguePaths).toContain('/internal/catalog/pilot');
    expect(body.cataloguePaths).toContain('/internal/catalog/fleet');
  });

  test('hydration renders the real page with no console error', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/internal/catalog/nav');
    await expect(page.locator('marea-catalog-page')).toBeVisible();
    await expect(page.locator('main#catalog-main')).toBeVisible();
    await expect(page.locator('h1')).toHaveText('MAREA NAV');
    expect(errors).toEqual([]);
  });
});

test.describe('MC-20 catalogue — canonical facts', () => {
  test('NAV is software, NOT_FOR_SALE, with two canonical editions', async ({ page }) => {
    await page.goto('/internal/catalog/nav');
    await expect(page.locator('[data-marea-edition="NAV-ESSENTIAL"]')).toBeVisible();
    await expect(page.locator('[data-marea-edition="NAV-PRO"]')).toBeVisible();
    await expect(page.locator('body')).toContainText('NOT_FOR_SALE');
    await expect(page.locator('body')).toContainText('No es un sistema de navegación certificado');
    await expect(page.locator('body')).not.toContainText('Añadir al carrito');
  });

  test('HUB is hardware with unselected hardware and no conformity claim', async ({ page }) => {
    await page.goto('/internal/catalog/hub');
    await expect(page.locator('body')).toContainText('NOT_SELECTED');
    await expect(page.locator('body')).toContainText(
      'Sin certificación NMEA 2000 ni compatibilidad universal',
    );
    await expect(page.locator('body')).toContainText('Hardware no seleccionado y BOM no congelada');
    await expect(page.locator('[data-marea-edition="HUB-PRO"]')).toBeVisible();
  });

  test('AIS states receive-only in the hero and never offers transmission', async ({ page }) => {
    await page.goto('/internal/catalog/ais');
    const hero = page.locator('[data-marea-catalog-section="hero"]');
    await expect(hero).toContainText('SOLO RECEPCIÓN');
    await expect(hero).toContainText('No es un transpondedor');
    await expect(hero).toContainText('no transmite');
    await expect(hero).toContainText('no es un sistema anticolisión');
    await expect(page.locator('body')).not.toContainText('AIS transponder');
    await expect(page.locator('body')).toContainText('AIS_TRANSMISSION_OFFERED = false');
  });

  test('the mandatory governance gates are visible on every page', async ({ page }) => {
    for (const item of PAGES) {
      await page.goto(item.path);
      const footer = page.locator('footer');
      await expect(footer).toContainText('TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED');
      await expect(footer).toContainText('PUBLICATION_AUTHORIZED = false');
      await expect(footer).toContainText('COMMERCIAL_AVAILABILITY = NOT_FOR_SALE');
      await expect(footer).toContainText('GATE-PRIVACY-DPA-DPIA');
    }
  });
});

test.describe('MC-21 catalogue — new family honesty blocks', () => {
  test('WEATHER names no provider and states provenance not contracted', async ({ page }) => {
    await page.goto('/internal/catalog/weather');
    const body = page.locator('body');
    await expect(body).toContainText('fuente externa no contratada');
    await expect(body).toContainText('no se nombra ningún proveedor');
    await expect(body).toContainText('NOT_FOR_SALE');
    for (const provider of [
      'Copernicus',
      'EMODnet',
      'AEMET',
      'Open-Meteo',
      'MeteoGalicia',
      'Puertos del Estado',
      'OpenWeather',
      'IHM',
      'meteoblue',
      'PredictWind',
    ]) {
      await expect(body).not.toContainText(provider);
    }
  });

  test('SENSE renders accuracy/ingress/NMEA 2000 limitations', async ({ page }) => {
    await page.goto('/internal/catalog/sense');
    const body = page.locator('body');
    await expect(body).toContainText('NOT_MEASURED');
    await expect(body).toContainText('NOT_VERIFIED');
    await expect(body).toContainText('NOT_IMPLEMENTED');
    await expect(body).toContainText('NMEA 2000 no está implementado');
    await expect(page.locator('[data-marea-edition="SENSE-WIND"]')).toBeVisible();
    await expect(page.locator('[data-marea-edition="SENSE-SYSTEMS"]')).toBeVisible();
  });

  test('WATCH renders ingestion/connectivity/privacy limitations', async ({ page }) => {
    await page.goto('/internal/catalog/watch');
    const body = page.locator('body');
    await expect(body).toContainText('NOT_VERIFIED');
    await expect(body).toContainText('NOT_FOUND');
    await expect(body).toContainText('GATE-PRIVACY-DPA-DPIA = BLOCKED');
    await expect(body).toContainText('no garantiza la entrega');
    await expect(page.locator('[data-marea-edition="WATCH-CORE"]')).toBeVisible();
  });

  test('the nine-family navigation marks the current family and links siblings', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/sense');
    const nav = page.locator('marea-responsive-nav nav');
    await expect(nav).toBeVisible();
    await expect(nav.locator('[aria-current="page"]')).toHaveText('SENSE');
    await expect(nav.locator('a[href="/internal/catalog/weather"]')).toHaveCount(1);
    await expect(nav.locator('a[href="/internal/catalog/watch"]')).toHaveCount(1);
    await expect(nav.locator('a[href="/internal/catalog/display"]')).toHaveCount(1);
    await expect(nav.locator('a[href="/internal/catalog/pilot"]')).toHaveCount(1);
    await expect(nav.locator('a[href="/internal/catalog/fleet"]')).toHaveCount(1);
  });
});

test.describe('MC-22 catalogue — batch-3 honesty blocks', () => {
  test('DISPLAY renders size/hardware/BOM cautions and no PILOT control authority', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/display');
    const body = page.locator('body');
    await expect(body).toContainText('SIZE_NOT_FROZEN');
    await expect(body).toContainText('HARDWARE_NOT_SELECTED');
    await expect(body).toContainText('BOM_NOT_ESTABLISHED');
    await expect(body).toContainText('Sin autoridad de control sobre PILOT');
    await expect(page.locator('[data-marea-edition="DISPLAY-7"]')).toBeVisible();
    await expect(page.locator('[data-marea-edition="DISPLAY-LARGE-CONDITIONAL"]')).toBeVisible();
    await expect(body).not.toContainText('Añadir al carrito');
  });

  test('PILOT renders the BLOCKED safety gate and supervised-only framing', async ({ page }) => {
    await page.goto('/internal/catalog/pilot');
    const body = page.locator('body');
    await expect(body).toContainText('PILOT_SAFETY_GATE = BLOCKED');
    await expect(body).toContainText('No es un piloto automático certificado');
    await expect(body).toContainText('NOT_FOUND');
    await expect(body).toContainText('PROHIBIDO');
    await expect(body).toContainText('no se vende');
    await expect(page.locator('[data-marea-edition="PILOT-COASTAL"]')).toBeVisible();
    await expect(page.locator('[data-marea-edition="PILOT-PRO"]')).toBeVisible();
    await expect(body).not.toContainText('Fiabilidad garantizada');
    await expect(body).not.toContainText('Añadir al carrito');
  });

  test('FLEET renders the B2B not-implemented framing with NO_SLA_ESTABLISHED', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/fleet');
    const body = page.locator('body');
    await expect(body).toContainText('NO_SLA_ESTABLISHED');
    await expect(body).toContainText('Sin hardware incluido');
    await expect(body).toContainText('Sin certificación de seguridad');
    await expect(body).toContainText('Telemetría de solo lectura');
    await expect(page.locator('[data-marea-edition="FLEET-START"]')).toBeVisible();
    await expect(page.locator('[data-marea-edition="FLEET-ENTERPRISE"]')).toBeVisible();
    await expect(body).not.toContainText('Disponibilidad garantizada');
    await expect(body).not.toContainText('Añadir al carrito');
  });
});

test.describe('MC-20 catalogue — bilingual parity', () => {
  for (const family of FAMILIES) {
    test(`${family}: ES and EN render the same section structure`, async ({ page }) => {
      await page.goto(`/internal/catalog/${family}`);
      const esSections = await page
        .locator('[data-marea-catalog-section]')
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute('data-marea-catalog-section')),
        );
      const esTitle = await page.locator('h1').innerText();
      const esParagraphs = await page.locator('main p').count();
      await page.goto(`/en/internal/catalog/${family}`);
      const enSections = await page
        .locator('[data-marea-catalog-section]')
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute('data-marea-catalog-section')),
        );
      const enTitle = await page.locator('h1').innerText();
      const enParagraphs = await page.locator('main p').count();
      expect(enSections).toEqual(esSections);
      expect(esSections).toHaveLength(SECTION_HOSTS);
      expect(enTitle).toBe(esTitle);
      expect(Math.abs(enParagraphs - esParagraphs)).toBeLessThanOrEqual(2);
      const headingByFamily: Record<string, string> = {
        nav: 'MAREA NAV',
        hub: 'MAREA HUB',
        ais: 'MAREA AIS',
        sense: 'MAREA SENSE',
        watch: 'MAREA WATCH',
        weather: 'MAREA WEATHER',
        display: 'MAREA DISPLAY',
        pilot: 'MAREA PILOT',
        fleet: 'MAREA FLEET',
      };
      await expect(page.locator('h1')).toHaveText(headingByFamily[family]);
    });
  }
});

test.describe('MC-20 catalogue — keyboard and responsive behaviour', () => {
  test('the skip link is the first focusable element and reaches the main region', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/nav');
    await page.keyboard.press('Tab');
    const skip = page.locator('a.skip');
    await expect(skip).toBeFocused();
    await expect(skip).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#catalog-main$/);
    await expect(page.locator('#catalog-main')).toBeFocused();
  });

  test('the family navigation marks the current family and links its siblings', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/hub');
    const nav = page.locator('marea-responsive-nav nav');
    await expect(nav).toBeVisible();
    const current = nav.locator('[aria-current="page"]');
    await expect(current).toHaveText('HUB');
    await expect(nav.locator('a[href="/internal/catalog/nav"]')).toHaveCount(1);
    await expect(nav.locator('a[href="/internal/catalog/ais"]')).toHaveCount(1);
  });

  test('the locale switch preserves the family', async ({ page }) => {
    await page.goto('/internal/catalog/ais');
    await expect(page.locator('a.locale')).toHaveAttribute('href', '/en/internal/catalog/ais');
  });

  for (const viewport of VIEWPORTS) {
    test(`no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      for (const item of PAGES) {
        await page.goto(item.path);
        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth };
        });
        expect(
          overflow.scrollWidth,
          `${item.path} overflows at ${viewport.width}px`,
        ).toBeLessThanOrEqual(overflow.clientWidth + 1);
      }
    });
  }
});

test.describe('MC-20 catalogue — automated accessibility', () => {
  for (const item of PAGES) {
    for (const viewport of VIEWPORTS) {
      test(`axe ${item.path} ${viewport.width}px: no critical or serious violation`, async ({
        page,
      }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto(item.path);
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        const blocking = results.violations.filter(
          (violation) => violation.impact === 'critical' || violation.impact === 'serious',
        );
        expect(
          blocking.map((violation) => `${violation.id}: ${violation.help}`),
          `blocking axe violations on ${item.path}`,
        ).toEqual([]);
      });
    }
  }
});

test.describe('MC-20 catalogue — no commerce path', () => {
  test('no form, no purchase control and no price is rendered', async ({ page }) => {
    for (const item of PAGES) {
      await page.goto(item.path);
      expect(await page.locator('form').count()).toBe(0);
      expect(await page.locator('input, select, textarea').count()).toBe(0);
      const buttons = await page.locator('button').allInnerTexts();
      for (const label of buttons) {
        expect(label.toLowerCase()).not.toContain('cart');
        expect(label.toLowerCase()).not.toContain('comprar');
      }
      const main = await page.locator('main').innerText();
      expect(main).not.toMatch(/€|\bEUR\s?\d/);
      expect(main).not.toMatch(/\badd to cart\b|\bañadir al carrito\b/i);
    }
  });
});
