import { expect, test } from '@playwright/test';
import { OTHER, PRODUCT, addProduct, fillCheckout, login, register, uniqueEmail } from './helpers';

test('catalogue, cart, checkout, account and order ownership', async ({
  page,
  browser,
  baseURL,
}) => {
  await register(page, uniqueEmail('buyer'));

  await page.goto('/en/shop');
  await expect(page.getByRole('heading', { name: 'Test Hub' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Solo español' })).toBeVisible();
  await expect(page.getByText('Out of stock')).toBeVisible();

  await addProduct(page);
  await page.goto('/en/cart');
  await expect(page.getByRole('heading', { name: 'Basket' })).toBeVisible();
  await expect(page.locator('dd.price')).toHaveText(PRODUCT.priceEn);
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.locator('dd.price')).toHaveText('€40.00');

  // Cart state, identity and totals survive the language switch.
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/carrito');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByText(PRODUCT.nameEs)).toBeVisible();
  await expect(page.locator('dd.price')).toHaveText('40,00 €');
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL('/en/cart');
  await expect(page.getByText(PRODUCT.nameEn)).toBeVisible();
  await expect(page.locator('dd.price')).toHaveText('€40.00');

  // Remove and re-add: the server remains the source of price and stock.
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('Your basket is empty.')).toBeVisible();
  await addProduct(page);
  await page.goto('/en/cart');
  await page.getByRole('button', { name: 'Increase quantity' }).click();
  await expect(page.locator('dd.price')).toHaveText('€40.00');

  await fillCheckout(page);
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/en\/account\/orders\/\d+\?nuevo=1/);
  const orderId = Number(page.url().match(/orders\/(\d+)/)?.[1]);
  expect(orderId).toBeGreaterThan(0);
  await expect(page.getByText('Thank you for your order!')).toBeVisible();
  await expect(page.locator('app-status-badge')).toContainText('Pending');
  const englishTotal = await page.locator('table.data tbody tr').last().innerText();
  expect(englishTotal).toContain('€40.00');

  // Order identity survives both directions of the language switch.
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL(`/cuenta/pedidos/${orderId}?nuevo=1`);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('h1')).toContainText(`Pedido #${orderId}`);
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL(`/en/account/orders/${orderId}?nuevo=1`);

  await page.goto('/en/account');
  await expect(page.getByRole('heading', { name: /Hello,/ })).toBeVisible();
  await expect(page.locator('table.data tbody tr')).toHaveCount(1);
  await page.locator('table.data tbody tr a').first().click();
  await expect(page).toHaveURL(new RegExp(`/en/account/orders/${orderId}$`));
  await expect(page.locator('h1')).toContainText(`Order #${orderId}`);

  // Account page keeps the session across the language switch.
  await page.goto('/en/account');
  await page.locator('header a[hreflang="es"]').click();
  await expect(page).toHaveURL('/cuenta');
  await expect(page.getByRole('heading', { name: /Hola,/ })).toBeVisible();
  await page.locator('header a[hreflang="en"]').click();
  await expect(page).toHaveURL('/en/account');
  await expect(page.getByRole('heading', { name: /Hello,/ })).toBeVisible();

  // Another customer must not be able to retrieve the order, even knowing its id.
  const otherContext = await browser.newContext({ baseURL });
  const otherPage = await otherContext.newPage();
  await login(otherPage, OTHER.email, OTHER.password);
  await otherPage.goto(`/en/account/orders/${orderId}`);
  await expect(otherPage.getByText('We could not find this order.')).toBeVisible();
  await otherContext.close();
});
