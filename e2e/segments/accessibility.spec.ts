import { expect, test } from '@playwright/test';
import { PAGES, collectAxe, gotoPage, measuredAt, summarizeAxe, writeEvidence } from './helpers';

/**
 * AC-07 / AC-08 — automated accessibility and keyboard evidence.
 *
 * axe is rule evidence, not a WCAG conformance certificate. The narrative limit
 * is recorded in the evidence file and in MC19-ACCESSIBILITY-EVIDENCE.md.
 */

test('axe finds no critical or serious violation on any page', async ({ page }) => {
  const results = [];
  for (const target of PAGES) {
    await gotoPage(page, target);
    const axe = await collectAxe(page);
    const summary = summarizeAxe(axe);
    results.push({
      path: target.path,
      segmentId: target.segmentId,
      locale: target.locale,
      ...summary,
    });
    expect(
      summary.critical + summary.serious,
      `critical/serious axe violations on ${target.path}: ${summary.details.join(' | ')}`,
    ).toBe(0);
  }
  writeEvidence('accessibility-evidence.json', {
    contractId: 'MC19-ACCESSIBILITY-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    tool: '@axe-core/playwright',
    tags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
    automatedOnly: true,
    manualLimits: [
      'Screen-reader announcement order was not tested with a real assistive technology.',
      'Automated contrast checks cover rendered text nodes only.',
      'Zoom and OS-level text scaling were not exercised.',
    ],
    pages: results,
  });
});

test('keyboard order starts at the skip link and reaches the page main', async ({ page }) => {
  const target = PAGES[0];
  await gotoPage(page, target);

  await page.keyboard.press('Tab');
  const skipLink = page.locator('a.skip');
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-marea-segment-main]')).toBeFocused();
});

test('the current audience is marked and the cross-navigation works', async ({ page }) => {
  const target = PAGES[0];
  await gotoPage(page, target);
  const current = page.locator(`a[aria-current="page"]`).first();
  await expect(current).toHaveAttribute('href', target.path);
  const audienceLinks = page.locator('nav a[href*="/internal/segments/"]');
  expect(await audienceLinks.count()).toBeGreaterThanOrEqual(3);
});

test('the disabled CTA is discoverable, describes why and cannot act', async ({ page }) => {
  for (const target of PAGES) {
    await gotoPage(page, target);
    const cta = page.locator('[data-marea-segment-disabled-cta]');
    await expect(cta).toHaveAttribute('aria-disabled', 'true');
    const describedBy = await cta.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const reason = page.locator(`#${describedBy}`);
    await expect(reason).toHaveText(/\S/);

    const before = page.url();
    await cta.focus();
    await expect(cta).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);
    expect(page.url()).toBe(before);
  }
});

test('reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await gotoPage(page, PAGES[0]);
  const reduced = await page.evaluate(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  expect(reduced).toBe(true);
  const running = await page.evaluate(
    () =>
      document.getAnimations().filter((animation) => {
        const timing = animation.effect?.getComputedTiming?.();
        return typeof timing?.endTime === 'number' && animation.playState === 'running';
      }).length,
  );
  expect(running).toBe(0);
});
