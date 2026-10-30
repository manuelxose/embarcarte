import { expect, type Page } from '@playwright/test';

export const PRODUCT = {
  slug: 'e2e-hub',
  nameEs: 'Hub de prueba',
  nameEn: 'Test Hub',
  priceEs: '20,00 €',
  priceEn: '€20.00',
};

export const OWNER = { email: 'e2e-owner@example.test', password: 'e2e-password-123' };
export const OTHER = { email: 'e2e-other@example.test', password: 'e2e-password-123' };

/** Waits until Angular has hydrated, so the first click is not lost in the CSR shell. */
export async function waitForHydration(page: Page): Promise<void> {
  await page.waitForFunction(() => !document.querySelector('[ngh]'), undefined, {
    timeout: 20_000,
  });
}

export async function login(
  page: Page,
  email = OWNER.email,
  password = OWNER.password,
): Promise<void> {
  await page.goto('/en/login');
  await waitForHydration(page);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/en\/account/);
}

export async function register(page: Page, email: string, name = 'E2E Buyer'): Promise<void> {
  await page.goto('/en/login');
  await waitForHydration(page);
  await page.getByRole('tab', { name: 'Create account' }).click();
  await page.getByLabel('Name').fill(name);
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('e2e-password-123');
  await page.locator('form input[type="checkbox"]').check();
  await page.locator('form button[type="submit"]').click();
  await expect(page).toHaveURL(/\/en\/account/);
}

export async function addProduct(page: Page): Promise<void> {
  await page.goto(`/en/shop/${PRODUCT.slug}`);
  await waitForHydration(page);
  await page.getByRole('button', { name: 'Add to basket' }).click();
  await expect(page.getByRole('status')).toContainText('Added');
}

export async function fillCheckout(page: Page): Promise<void> {
  await page.getByLabel('Shipping name').fill('E2E Buyer');
  await page.getByLabel('Phone').fill('+34 600 000 000');
  await page.getByLabel('Shipping address').fill('Muelle de prueba 1, Barcelona');
  await page.locator('form input[type="checkbox"]').check();
}

export function uniqueEmail(prefix = 'e2e'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10_000)}@example.test`;
}
