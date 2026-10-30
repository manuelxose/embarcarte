import { expect, test } from '@playwright/test';
import {
  addProduct,
  fillCheckout,
  login,
  register,
  uniqueEmail,
  waitForHydration,
} from './helpers';

test('empty catalogue and catalogue network failures stay usable', async ({ page }) => {
  await page.goto('/en');
  await page.route('**/api/shop/products', (route) => route.fulfill({ json: [] }));
  await page.locator('header a', { hasText: 'Shop' }).click();
  await expect(page.getByRole('heading', { name: 'Coming soon' })).toBeVisible();

  await page.goto('/en');
  await page.route('**/api/shop/products', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'server_error' }),
    }),
  );
  await page.locator('header a', { hasText: 'Shop' }).click();
  await expect(
    page.getByText('We could not load the catalogue. Please try again in a few minutes.'),
  ).toBeVisible();
});

test('a product API error is not turned into a 404', async ({ page }) => {
  await page.goto('/en/shop');
  await waitForHydration(page);
  await page.route('**/api/shop/products/e2e-hub', (route) =>
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'server_error' }),
    }),
  );
  await page.getByRole('link', { name: 'Test Hub' }).click();
  await expect(page.getByText('We could not complete the request.')).toBeVisible();
  await expect(page.getByText('is not available.')).not.toBeVisible();
});

test('unavailable product, unknown URL and session expiry', async ({ page }) => {
  const unavailable = await page.goto('/en/shop/no-existe');
  expect(unavailable?.status()).toBe(404);
  await expect(page.getByText('This product')).toBeVisible();
  await expect(page.getByText('is not available.')).toBeVisible();

  const unknown = await page.goto('/en/no-existe');
  expect(unknown?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page');

  await login(page);
  await page.context().clearCookies();
  await page.goto('/en/account');
  await expect(page).toHaveURL(/\/en\/login\?volver=/);
  await expect(page.getByLabel('Email')).toBeVisible();
});

test('checkout failures are reported without creating a live payment', async ({ page }) => {
  await register(page, uniqueEmail('failure'));
  await addProduct(page);
  await page.goto('/en/cart');
  await fillCheckout(page);

  await page.route('**/api/orders', (route) =>
    route.fulfill({
      status: 409,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'out_of_stock' }),
    }),
  );
  await page.locator('form button[type="submit"]').click();
  await expect(page.getByRole('alert')).toContainText('no longer has enough stock');

  // The server rejects a price modified in the browser: prices are authoritative.
  await page.unroute('**/api/orders');
  await page.evaluate(() => {
    const items = JSON.parse(localStorage.getItem('emb_cart') || '[]');
    items[0].price_cents = 100;
    localStorage.setItem('emb_cart', JSON.stringify(items));
  });
  await page.reload();
  await expect(page.locator('dd.price')).toHaveText('€1.00');
  await fillCheckout(page);
  await page.locator('form button[type="submit"]').click();
  await expect(page.getByRole('alert')).toContainText('A price has changed');
  await expect(page).not.toHaveURL(/\/account\/orders/);
});

test('private API endpoints reject unauthenticated access', async ({ request }) => {
  expect((await request.get('/api/orders')).status()).toBe(401);
  expect((await request.get('/api/orders/1')).status()).toBe(401);
  expect((await request.get('/api/admin/stats')).status()).toBe(401);
});
