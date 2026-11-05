import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * MC-24 configurator end-to-end suite.
 *
 * Proves, against the real loopback SSR preview (never a static fixture):
 *   - SSR renders the classification UI for both locales with noindex and no
 *     public metadata;
 *   - client hydration works and the pure engine produces the fail-closed
 *     outcome from real user interaction;
 *   - `ELIGIBLE_SELF_INSTALL` cannot be reached by clicking through the UI;
 *   - axe-core reports no critical or serious violation on the initial and the
 *     classified state;
 *   - keyboard operation works without a mouse;
 *   - no horizontal overflow at 320/390/768/1440;
 *   - no price, purchase affordance or lead capture is rendered.
 */

const PAGES = [
  { path: '/internal/catalog/configurator', locale: 'es' },
  { path: '/en/internal/catalog/configurator', locale: 'en' },
] as const;

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
  { width: 320, height: 720 },
] as const;

const PUBLIC_METADATA_MARKERS = [
  'rel="canonical"',
  'hreflang=',
  'property="og:',
  'name="twitter:',
  'application/ld+json',
];

test.describe('MC-24 configurator @mc24 - SSR and isolation', () => {
  for (const page of PAGES) {
    test(`@mc24 SSR ${page.locale} ${page.path}: 200, noindex, no public metadata`, async ({
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
      // The server-rendered markup must contain the real configurator, not a placeholder.
      expect(html).toContain('data-mc24-configurator');
      expect(html).toContain('<form');
      // The questionnaire is server-rendered: it is real content, not client-only.
      expect(html).toContain('GQ-01');
    });
  }

  test('@mc24 health endpoint lists the configurator paths', async ({ request }) => {
    const response = await request.get('/__preview/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.configuratorPaths).toEqual([
      '/internal/catalog/configurator',
      '/en/internal/catalog/configurator',
    ]);
    expect(body.publication).toBe('NOT_AUTHORIZED');
  });

  test('@mc24 a proposed public configurator path is not served', async ({ request }) => {
    for (const path of ['/marea/configurador', '/en/marea/configurator', '/configurador']) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });

  test('@mc24 no price or purchase affordance is rendered', async ({ request }) => {
    for (const page of PAGES) {
      const html = await (await request.get(page.path)).text();
      for (const marker of ['añadir al carrito', 'add to cart', 'comprar ahora', 'buy now', '€']) {
        expect(html.toLowerCase(), `${page.path} contains ${marker}`).not.toContain(
          marker.toLowerCase(),
        );
      }
      expect(html).not.toMatch(/type="email"/i);
    }
  });
});

test.describe('MC-24 configurator @mc24 - hydration and real interaction', () => {
  for (const page of PAGES) {
    test(`@mc24 hydration and classification ${page.locale}`, async ({ page: browserPage }) => {
      const errors: string[] = [];
      browserPage.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text());
      });
      browserPage.on('pageerror', (error) => errors.push(String(error)));

      await browserPage.goto(page.path, { waitUntil: 'networkidle' });
      await expect(browserPage.locator('[data-mc24-configurator]')).toBeVisible();

      // Before classification there is no result.
      await expect(browserPage.locator('[data-mc24-outcome]')).toHaveCount(0);

      // Real interaction: classify an empty questionnaire.
      await browserPage.getByRole('button', { name: /clasificar|classify/i }).click();

      // The pure engine must report insufficient information, never eligible.
      const outcome = browserPage.locator('[data-mc24-outcome]');
      await expect(outcome).toBeVisible();
      const outcomeText = (await outcome.textContent()) ?? '';
      expect(outcomeText.length).toBeGreaterThan(0);
      expect(outcomeText).not.toMatch(/instalaci[oó]n propia v[aá]lida|valid self-install/i);

      // Pending answers are announced.
      await expect(browserPage.locator('[data-mc24-fact-questions]')).toBeVisible();

      // Hydration produced no console or page error.
      expect(errors, `console errors: ${errors.join(' | ')}`).toEqual([]);
    });

    test(`@mc24 the eligible outcome stays unreachable through the UI ${page.locale}`, async ({
      page: browserPage,
    }) => {
      await browserPage.goto(page.path, { waitUntil: 'networkidle' });

      // Fill every rendered text input, then classify.
      const inputs = browserPage.locator('input[mareaInput][type="text"]');
      const count = await inputs.count();
      expect(count).toBeGreaterThan(10);
      for (let index = 0; index < count; index += 1) {
        await inputs.nth(index).fill('respuesta');
      }
      await browserPage.getByRole('button', { name: /clasificar|classify/i }).click();

      const outcome = browserPage.locator('[data-mc24-outcome]');
      await expect(outcome).toBeVisible();
      const outcomeText = (await outcome.textContent()) ?? '';
      // INSTALLER_ASSESSMENT_REQUIRED is the expected terminal state because zero
      // compatibility rows are tested.
      expect(outcomeText).not.toMatch(/instalaci[oó]n propia v[aá]lida|valid self-install/i);
      expect(outcomeText).toMatch(/evaluaci[oó]n de instalador|installer assessment/i);
    });

    test(`@mc24 an excluded capability yields not-supported ${page.locale}`, async ({
      page: browserPage,
    }) => {
      await browserPage.goto(page.path, { waitUntil: 'networkidle' });
      const steering = browserPage.getByRole('checkbox').first();
      await steering.check();
      await browserPage.getByRole('button', { name: /clasificar|classify/i }).click();
      const outcome = browserPage.locator('[data-mc24-outcome]');
      await expect(outcome).toBeVisible();
      expect((await outcome.textContent()) ?? '').toMatch(/no soportado|not supported/i);
      // The exclusion notice must be shown, with no implied workaround.
      await expect(browserPage.locator('.excluded')).toBeVisible();
    });
  }

  test('@mc24 the triage never reports a quotation or a price', async ({ page }) => {
    await page.goto('/internal/catalog/configurator', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /clasificar/i }).click();
    await expect(page.locator('[data-mc24-triage]')).toBeVisible();
    const body = (await page.locator('[data-mc24-configurator]').textContent()) ?? '';
    expect(body).not.toMatch(/€|\bEUR\b|\bUSD\b/);
    expect(body).toContain('No se ha generado ninguna cotización');
  });
});

test.describe('MC-24 configurator @mc24 - keyboard operation', () => {
  test('@mc24 the whole flow is operable by keyboard', async ({ page }) => {
    await page.goto('/internal/catalog/configurator', { waitUntil: 'networkidle' });

    // The skip link is the first focusable element and becomes visible on focus.
    await page.keyboard.press('Tab');
    const skip = page.locator('a.skip');
    await expect(skip).toBeFocused();

    // Radio group is reachable and selectable with the keyboard.
    const bundle = page.getByRole('radio').nth(2);
    await bundle.focus();
    await page.keyboard.press('Space');
    await expect(bundle).toBeChecked();

    // Tab into a text field and type.
    const firstInput = page.locator('input[mareaInput][type="text"]').first();
    await firstInput.focus();
    await page.keyboard.type('velero');
    await expect(firstInput).toHaveValue('velero');

    // The classify button is reachable and operable with Enter.
    const submit = page.getByRole('button', { name: /clasificar/i });
    await submit.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-mc24-outcome]')).toBeVisible();
  });
});

test.describe('MC-24 configurator @mc24 - accessibility (automated)', () => {
  for (const pageConfig of PAGES) {
    test(`@mc24 axe: no critical or serious violations ${pageConfig.locale}`, async ({ page }) => {
      await page.goto(pageConfig.path, { waitUntil: 'networkidle' });
      const initial = await new AxeBuilder({ page }).analyze();
      const serious = initial.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious',
      );
      expect(
        serious,
        `serious violations: ${serious.map((violation) => `${violation.id}: ${violation.help}`).join('; ')}`,
      ).toEqual([]);

      // Re-audit the classified state: the result panel must also be clean.
      await page.getByRole('button', { name: /clasificar|classify/i }).click();
      await expect(page.locator('[data-mc24-outcome]')).toBeVisible();
      const classified = await new AxeBuilder({ page }).analyze();
      const seriousAfter = classified.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious',
      );
      expect(
        seriousAfter,
        `serious violations after classification: ${seriousAfter
          .map((violation) => `${violation.id}: ${violation.help}`)
          .join('; ')}`,
      ).toEqual([]);
    });
  }
});

test.describe('MC-24 configurator @mc24 - responsive', () => {
  test('@mc24 no horizontal overflow at 320/390/768/1440', async ({ page }) => {
    for (const viewport of VIEWPORTS) {
      await page.setViewportSize(viewport);
      await page.goto('/internal/catalog/configurator', { waitUntil: 'networkidle' });
      // Also exercise the result panel, which is the densest layout.
      await page.getByRole('button', { name: /clasificar/i }).click();
      await expect(page.locator('[data-mc24-outcome]')).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow ${overflow}px at ${viewport.width}px`).toBeLessThanOrEqual(1);
    }
  });

  test('@mc24 EN and ES render the same structure', async ({ page }) => {
    const structure = async (path: string) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      return {
        fieldsets: await page.locator('fieldset').count(),
        inputs: await page.locator('input[mareaInput][type="text"]').count(),
        radios: await page.getByRole('radio').count(),
        checkboxes: await page.getByRole('checkbox').count(),
        headings: await page.locator('h2, h3, h4').count(),
      };
    };
    const es = await structure('/internal/catalog/configurator');
    const en = await structure('/en/internal/catalog/configurator');
    expect(en).toEqual(es);
    expect(es.inputs).toBeGreaterThan(10);
  });
});
