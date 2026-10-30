import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { login, waitForHydration } from './helpers';

const PAGES = ['/', '/en', '/en/shop', '/en/shop/e2e-hub', '/en/cart', '/en/contact', '/en/login'];

test('key public pages have no serious or critical automated accessibility violations', async ({
  page,
}) => {
  const findings: string[] = [];
  for (const path of PAGES) {
    await page.goto(path);
    await waitForHydration(page);
    await page.waitForLoadState('networkidle');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    for (const violation of results.violations) {
      if (violation.impact === 'critical' || violation.impact === 'serious') {
        findings.push(
          `${path}: ${violation.id} (${violation.impact}) — ${violation.nodes.map((n) => n.target).join(', ')}`,
        );
      }
    }
  }
  expect(findings, findings.join('\n')).toEqual([]);
});

test('keyboard skip link and mobile menu are operable', async ({ page }) => {
  await page.goto('/en');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenido$/);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');
  await waitForHydration(page);
  const toggle = page.locator('button.menu-toggle');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('authenticated account has no serious or critical automated violations', async ({ page }) => {
  await login(page);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  const findings = results.violations
    .filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
    .map((violation) => `${violation.id}: ${violation.nodes.map((n) => n.target).join(', ')}`);
  expect(findings, findings.join('\n')).toEqual([]);
});
