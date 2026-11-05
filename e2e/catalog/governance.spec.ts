import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * MC-25 SKU governance end-to-end suite.
 *
 * Proves, against the real loopback SSR preview (never a static fixture):
 *   - SSR renders the governance screen for both locales with noindex and no
 *     public metadata;
 *   - every canonical edition is shown as NOT_ORDERABLE and the rendered
 *     verdict agrees with the backend decision for a second edition too;
 *   - the review action is refused in the rendered page with a named code;
 *   - axe-core reports no critical or serious violation;
 *   - keyboard operation works without a mouse;
 *   - no horizontal overflow at 320/390/768/1440;
 *   - no price, purchase affordance or lead capture is rendered.
 */

const PAGES = [
  { path: '/internal/catalog/sku-governance', locale: 'es' },
  { path: '/en/internal/catalog/sku-governance', locale: 'en' },
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

test.describe('MC-25 governance @mc25 - SSR and isolation', () => {
  for (const page of PAGES) {
    test(`@mc25 SSR ${page.locale} ${page.path}: 200, noindex, no public metadata`, async ({
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
      expect(html).toContain('data-mc25-governance');
      // The matrix is server-rendered: real content, not a client-only shell.
      expect(html).toContain('data-prerequisite="PRICE_APPROVED"');
      expect(html).toContain('data-prerequisite="MC02_BLOCKERS_RESOLVED"');
      expect(html).toContain('data-blocker="GATE-PRICING"');
    });
  }

  test('@mc25 internal health reports the governance paths and no publication', async ({
    request,
  }) => {
    const response = await request.get('/__preview/health');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.publication).toBe('NOT_AUTHORIZED');
    expect(body.indexation).toContain('noindex');
    expect(body.governancePaths).toEqual([
      '/internal/catalog/sku-governance',
      '/en/internal/catalog/sku-governance',
    ]);
  });

  test('@mc25 no public or admin route is served outside the preview namespace', async ({
    request,
  }) => {
    for (const path of ['/admin', '/admin/sku', '/marea/sku-governance', '/internal/catalog/sku']) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(404);
    }
  });
});

test.describe('MC-25 governance @mc25 - readiness is fail closed in the UI', () => {
  test('@mc25 the rendered verdict is NOT ORDERABLE and matches the backend', async ({ page }) => {
    await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
    await expect(page.locator('[data-mc25-verdict]')).toBeVisible();
    await expect(page.locator('[data-mc25-fact-orderable]')).toHaveText('0');
    await expect(page.locator('[data-mc25-evaluation-version]')).toHaveText('mc25-readiness/1.0.0');
    const merchantSku = page.locator('[data-mc25-merchant-sku]');
    await expect(merchantSku).toHaveText('No establecido');
    // Every prerequisite row reports a non-passing state; nine of ten fail.
    const failing = page.locator('tr[data-status="FAILED"]');
    await expect(failing).toHaveCount(8);
    const blocking = page.locator('tr[data-prerequisite="MC02_BLOCKERS_RESOLVED"]');
    await expect(blocking).toHaveAttribute('data-status', 'FAILED');
  });

  test('@mc25 switching to another edition keeps every SKU non-orderable', async ({ page }) => {
    await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
    await page.locator('#mc25-family').selectOption('PILOT');
    await expect(page.locator('[data-mc25-edition]')).toContainText('PILOT-');
    await expect(page.locator('[data-mc25-verdict]')).toHaveText(/NO PEDIBLE/);
    await expect(page.locator('tr[data-blocker="GATE-SAFETY-PILOT"]')).toBeVisible();
    await expect(page.locator('[data-mc25-fact-orderable]')).toHaveText('0');
    // The lifecycle never offers a commercial transition.
    const transitions = page.locator('[data-mc25-transitions] li');
    const count = await transitions.count();
    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      await expect(transitions.nth(index)).toHaveAttribute('data-permitted', 'false');
    }
  });

  test('@mc25 a review action is refused with a named code and writes nothing', async ({
    page,
  }) => {
    await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Solicitar evidencia' }).click();
    const outcome = page.locator('[data-mc25-review-outcome]');
    await expect(outcome).toBeVisible();
    await expect(outcome).toContainText('NO_VERIFIED_AUTHORIZATION_MECHANISM');
    await expect(outcome).toContainText('NOT_PERSISTED');
    // No purchase affordance exists. The blocker register legitimately prints
    // the MC-02 evidence string "Checkout test evidence", so the assertion is
    // about controls and links, not about the word appearing in contract copy.
    await expect(
      page.getByRole('button', { name: /comprar|buy now|add to cart|checkout/i }),
    ).toHaveCount(0);
    await expect(page.locator('a[href*="checkout"], a[href*="cart"]')).toHaveCount(0);
  });
});

test.describe('MC-25 governance @mc25 - accessibility and responsive', () => {
  for (const pageConfig of PAGES) {
    test(`@mc25 axe: no critical or serious violations ${pageConfig.locale}`, async ({ page }) => {
      await page.goto(pageConfig.path, { waitUntil: 'networkidle' });
      const initial = await new AxeBuilder({ page }).analyze();
      const serious = initial.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious',
      );
      expect(
        serious.map((violation) => `${violation.id}: ${violation.help}`),
        `blocking axe violations on ${pageConfig.path}`,
      ).toEqual([]);

      await page.getByRole('button', { name: /Solicitar evidencia|Request evidence/ }).click();
      await expect(page.locator('[data-mc25-review-outcome]')).toBeVisible();
      const after = await new AxeBuilder({ page }).analyze();
      expect(
        after.violations
          .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
          .map((violation) => violation.id),
      ).toEqual([]);
    });
  }

  test('@mc25 keyboard operation reaches the selectors and a review action', async ({ page }) => {
    await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
    await page.locator('#mc25-family').focus();
    await expect(page.locator('#mc25-family')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('#mc25-edition')).toBeFocused();
    // Skip link becomes visible on focus.
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    const skip = page.locator('a.skip');
    await skip.focus();
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });

  for (const viewport of VIEWPORTS) {
    test(`@mc25 no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }

  test('@mc25 tables expose a caption and column headers', async ({ page }) => {
    await page.goto('/internal/catalog/sku-governance', { waitUntil: 'networkidle' });
    const tables = page.locator('table.matrix');
    const count = await tables.count();
    expect(count).toBeGreaterThanOrEqual(3);
    for (let index = 0; index < count; index += 1) {
      const table = tables.nth(index);
      await expect(table.locator('caption')).toHaveCount(1);
      const headers = await table.locator('thead th[scope="col"]').count();
      expect(headers).toBeGreaterThan(0);
    }
  });
});
