import { expect, test } from '@playwright/test';
import { addProduct, login, waitForHydration } from './helpers';

const WIDTHS = [360, 390, 768, 1024, 1440];
const PAGES = ['/', '/en', '/en/shop', '/en/shop/e2e-hub', '/en/contact', '/en/login'];

async function expectNoHorizontalOverflow(
  page: import('@playwright/test').Page,
  label: string,
): Promise<void> {
  const dimensions = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));
  expect(
    dimensions.scrollWidth,
    `${label} must not overflow horizontally (${dimensions.scrollWidth} > ${dimensions.innerWidth})`,
  ).toBeLessThanOrEqual(dimensions.innerWidth + 1);
}

test('representative viewports have no horizontal overflow', async ({ page }) => {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of PAGES) {
      await page.goto(path);
      await waitForHydration(page);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('main')).toBeVisible();
      await expectNoHorizontalOverflow(page, `${path} at ${width}px`);

      const toggle = page.locator('button.menu-toggle');
      const nav = page.locator('#main-nav');
      if (width < 1100) {
        await expect(toggle).toBeVisible();
        await expect(nav).not.toBeVisible();
      } else {
        await expect(nav).toBeVisible();
      }
    }
  }
});

test('cart tables and controls fit mobile viewports and keep usable targets', async ({ page }) => {
  await login(page);
  await addProduct(page);
  for (const width of [360, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/en/cart');
    await waitForHydration(page);
    await expect(page.locator('table.data')).toBeVisible();
    await expectNoHorizontalOverflow(page, `/en/cart at ${width}px`);

    const targets = await page
      .locator('.qty button, button[aria-label="Remove"], button.menu-toggle')
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        }),
      );
    for (const target of targets) {
      expect(target.width).toBeGreaterThanOrEqual(24);
      expect(target.height).toBeGreaterThanOrEqual(24);
    }
  }

  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/en/account');
  await expect(page.getByRole('heading', { name: /Hello,/ })).toBeVisible();
  await expectNoHorizontalOverflow(page, '/en/account at 360px');
});
