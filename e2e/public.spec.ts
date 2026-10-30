import { expect, test } from '@playwright/test';
import { waitForHydration } from './helpers';

const PUBLIC_PAIRS = [
  ['/', '/en'],
  ['/tecnologia', '/en/technology'],
  ['/tecnologia/navegador', '/en/technology/navegador'],
  ['/tienda', '/en/shop'],
  ['/tienda/e2e-hub', '/en/shop/e2e-hub'],
  ['/servicios', '/en/services'],
  ['/contacto', '/en/contact'],
  ['/guias', '/en/guides'],
  ['/guias/que-es-signal-k', '/en/guides/que-es-signal-k'],
  ['/aviso-legal', '/en/legal-notice'],
  ['/privacidad', '/en/privacy'],
  ['/cookies', '/en/cookies'],
  ['/condiciones-de-venta', '/en/terms-of-sale'],
];

test('public bilingual surface renders in both locales', async ({ page }) => {
  for (const [spanish, english] of PUBLIC_PAIRS) {
    for (const [path, locale] of [
      [spanish, 'es'],
      [english, 'en'],
    ] as const) {
      const response = await page.goto(path);
      expect(response?.status(), `${path} status`).toBe(200);
      await expect(page.locator('html'), `${path} lang`).toHaveAttribute('lang', locale);
      await expect(page.locator('h1'), `${path} has one visible h1`).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      const body = await page.locator('body').innerText();
      expect(body, `${path} has no unresolved placeholder`).not.toMatch(
        /\{email\}|\{owner\}|\{title\}|\{product\}|undefined/,
      );
      expect(body, `${path} has no server error`).not.toContain('Internal Server Error');
    }
  }
});

test('language switcher preserves identity, query and fragment', async ({ page }) => {
  await page.goto('/');
  await waitForHydration(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');

  await page.goto('/en/technology/navegador?ref=e2e#specs');
  await waitForHydration(page);
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/tecnologia/navegador?ref=e2e#specs');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Open Marine Navigator');

  await page.goto('/en/guides/que-es-signal-k?ref=e2e#top');
  await waitForHydration(page);
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/guias/que-es-signal-k?ref=e2e#top');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Signal K');

  await page.goto('/en/shop?ref=e2e#catalogue');
  await waitForHydration(page);
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/tienda?ref=e2e#catalogue');

  await page.goto('/en/shop/e2e-hub');
  await waitForHydration(page);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Test Hub');
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/tienda/e2e-hub');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hub de prueba');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
});

test('login exposes the Google sign-in entry point', async ({ page }) => {
  await page.goto('/en/login');
  await waitForHydration(page);
  await expect(page.locator('.google-divider')).toContainText('or');
  await expect(page.locator('.google-button')).toBeVisible();
});

test('mobile navigation opens, navigates and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/en');
  await waitForHydration(page);
  const toggle = page.locator('button.menu-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(toggle).toHaveAccessibleName('Close menu');
  await page.locator('#main-nav a', { hasText: 'Shop' }).click();
  await expect(page).toHaveURL(/\/en\/shop$/);
  await expect(page.locator('button.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
});
