import { expect, test } from '@playwright/test';
import {
  PAGES,
  SECTION_HOSTS,
  VIEWPORT_WIDTHS,
  expectNoHorizontalOverflow,
  gotoPage,
  measuredAt,
  viewportHeight,
  writeEvidence,
} from './helpers';

/**
 * AC-07 — responsive layout from 320 to 1440 CSS pixels, with no page-level
 * horizontal overflow and no hidden section.
 */

const measurements: Record<string, unknown>[] = [];

test.afterAll(() => {
  writeEvidence('responsive-evidence.json', {
    contractId: 'MC19-RESPONSIVE-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    widths: [...VIEWPORT_WIDTHS],
    pages: PAGES.length,
    measurements,
  });
});

for (const width of VIEWPORT_WIDTHS) {
  test(`layout is stable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: viewportHeight(width) });
    for (const target of PAGES) {
      await gotoPage(page, target);
      await expectNoHorizontalOverflow(page, `${target.path} @ ${width}`);
      await expect(page.locator('h1')).toBeVisible();
      for (const host of SECTION_HOSTS) {
        await expect(page.locator(`[data-marea-segment-section="${host}"]`)).toBeAttached();
      }
      measurements.push({
        path: target.path,
        width,
        overflow: false,
        sections: SECTION_HOSTS.length,
      });
    }
  });
}

test('the mobile navigation opens, closes with Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await gotoPage(page, PAGES[0]);
  const nav = page.locator('header nav').first();
  const toggle = nav.locator('button.toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();

  const desktop = page.locator('header .section-nav button.toggle');
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(desktop).toBeHidden();
});
