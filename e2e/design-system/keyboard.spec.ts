import { expect, test, type Locator } from '@playwright/test';
import { assertCatalogueBuilt, gotoCatalogue, setMode, waitForPaint } from './helpers';

/**
 * Teclado del catálogo interno MC-17.
 *
 * Todo se opera con eventos de teclado reales (Tab, Enter, Space, Escape y
 * flechas). No se usa `.focus()` para alcanzar controles: sólo se usa para
 * situar el punto de partida de una prueba concreta y, aun así, el movimiento
 * posterior se comprueba con Tab/flechas.
 */

const STRUCTURED = 'marea-structured-gallery';

test.beforeAll(async () => {
  await assertCatalogueBuilt();
});

test('tabs expose a roving tabindex, arrow/Home/End navigation and a labelled panel', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const tablist = page.locator(`${STRUCTURED} [role="tablist"]`).first();
  await expect(tablist, 'No se encontró el tablist del catálogo estructurado').toBeVisible();
  const tabs = tablist.getByRole('tab');
  const tabCount = await tabs.count();
  expect(tabCount, 'El tablist necesita al menos dos pestañas').toBeGreaterThan(1);

  // Punto de partida; el resto del recorrido es con teclado.
  await tabs.first().focus();
  await expect(tabs.first()).toHaveAttribute('aria-selected', 'true');
  await expectRovingTabStop(tabs, 0);

  await page.keyboard.press('ArrowRight');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'false');
  await expectRovingTabStop(tabs, 1);

  await page.keyboard.press('ArrowLeft');
  await expect(tabs.nth(0)).toBeFocused();
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('End');
  await expect(tabs.nth(tabCount - 1)).toBeFocused();
  await expect(tabs.nth(tabCount - 1)).toHaveAttribute('aria-selected', 'true');
  await expectRovingTabStop(tabs, tabCount - 1);

  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toBeFocused();
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await expectRovingTabStop(tabs, 0);

  // El panel activo es visible, role=tabpanel y se anuncia con aria-labelledby.
  const activeTabId = await tabs.nth(0).getAttribute('id');
  expect(activeTabId, 'La pestaña activa no tiene id').toBeTruthy();
  const panelId = activeTabId!.replace(/-tab$/, '-panel');
  const panel = page.locator(`#${panelId}`);
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute('role', 'tabpanel');
  await expect(panel).toHaveAttribute('aria-labelledby', activeTabId!);
  await expect(tabs.nth(0)).toHaveAttribute('aria-controls', panelId);
});

test('native accordion and disclosure toggle with Enter/Space and single mode keeps one open', async ({
  page,
}) => {
  await gotoCatalogue(page);

  const accordion = page
    .locator(`${STRUCTURED} marea-accordion`)
    .filter({ has: page.locator('details[name]') })
    .first();
  await expect(
    accordion,
    'No se encontró un marea-accordion en modo single (details con atributo name)',
  ).toBeVisible();
  const items = accordion.locator('details');
  const summaries = accordion.locator('summary');
  const itemCount = await summaries.count();
  expect(itemCount, 'El acordeón single necesita al menos dos elementos').toBeGreaterThan(1);

  await summaries.nth(0).focus();
  await page.keyboard.press('Enter');
  await expect(items.nth(0)).toHaveAttribute('open', '');

  await page.keyboard.press('Space');
  await expect(items.nth(0)).not.toHaveAttribute('open', '');

  // Exclusividad: abrir el segundo cierra el primero.
  await summaries.nth(0).click();
  await expect(items.nth(0)).toHaveAttribute('open', '');
  await summaries.nth(1).click();
  await expect(items.nth(1)).toHaveAttribute('open', '');
  await expect(
    accordion.locator('details[open]'),
    'El acordeón single dejó más de un elemento abierto',
  ).toHaveCount(1);

  const disclosure = page.locator(`${STRUCTURED} marea-disclosure`).first();
  await expect(disclosure, 'No se encontró ningún marea-disclosure').toBeVisible();
  const disclosureDetails = disclosure.locator('details');
  const disclosureSummary = disclosure.locator('summary').first();

  await disclosureSummary.focus();
  await page.keyboard.press('Enter');
  await expect(disclosureDetails).toHaveAttribute('open', '');
  await page.keyboard.press('Space');
  await expect(disclosureDetails).not.toHaveAttribute('open', '');
});

test('responsive navigation opens, closes with Escape returning focus, closes on link click and collapses at 1440', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await gotoCatalogue(page);

  const nav = page.locator(`${STRUCTURED} marea-responsive-nav`).first();
  await expect(
    nav,
    'No se encontró marea-responsive-nav en el catálogo estructurado',
  ).toBeVisible();
  const toggle = nav.locator('button').first();
  const list = nav.locator('ul').first();

  await expect(toggle).toBeVisible();
  await expect(list).toBeHidden();

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(list).toBeVisible();

  // Escape desde un enlace: cierra y devuelve el foco al botón.
  await nav.locator('a').first().focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await expect(list).toBeHidden();

  // Un clic en un enlace también cierra (se evita la navegación para aislar la conducta).
  await toggle.click();
  await expect(list).toBeVisible();
  const link = nav.locator('a').first();
  await link.evaluate((element) => {
    element.addEventListener('click', (event) => event.preventDefault(), { once: true });
  });
  await link.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(list).toBeHidden();

  // A partir de 1024px el botón desaparece y la lista siempre es visible.
  await page.setViewportSize({ width: 1440, height: 900 });
  await waitForPaint(page);
  await expect(toggle).toBeHidden();
  await expect(list).toBeVisible();
});

test('a disabled button with a reason is keyboard reachable, announced and does not fire', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const gallery = page.locator('marea-foundation-gallery');
  const disabled = gallery.getByRole('button', { name: /Deshabilitada con motivo/ });
  const previous = gallery.getByRole('button', { name: /^Grande$/ });

  await expect(disabled).toHaveCount(1);
  await expect(previous).toHaveCount(1);

  // Alcanzable con Tab desde el control anterior.
  await previous.focus();
  await page.keyboard.press('Tab');
  await expect(disabled).toBeFocused();
  await expect(disabled).toHaveAttribute('aria-disabled', 'true');

  const describedBy = await disabled.getAttribute('aria-describedby');
  expect(describedBy, 'El botón deshabilitado no tiene aria-describedby').toBeTruthy();
  const reasonText = await page.evaluate((ids) => {
    return ids
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent?.trim() ?? '')
      .join(' ')
      .trim();
  }, describedBy!);
  expect(reasonText.length, 'El motivo accesible está vacío').toBeGreaterThan(0);

  const live = gallery.getByRole('status').filter({ hasText: 'Última activación' }).first();
  await expect(live).toBeVisible();
  const before = (await live.innerText()).trim();

  await page.keyboard.press('Enter');
  await waitForPaint(page);
  expect((await live.innerText()).trim(), 'Enter activó un botón deshabilitado').toBe(before);

  await page.keyboard.press('Space');
  await waitForPaint(page);
  expect((await live.innerText()).trim(), 'Space activó un botón deshabilitado').toBe(before);
});

test('there is no keyboard trap: Tab always advances and never repeats the same element', async ({
  page,
}) => {
  await gotoCatalogue(page);
  await setMode(page, 'web-light');
  await page.evaluate(() => {
    (document.activeElement as HTMLElement | null)?.blur();
    window.scrollTo(0, 0);
  });

  const fingerprints: string[] = [];
  for (let presses = 0; presses < 40; presses += 1) {
    await page.keyboard.press('Tab');
    const fingerprint = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return 'none';
      return [
        active.tagName,
        active.id,
        active.getAttribute('data-marea-component') ?? '',
        active.getAttribute('href') ?? '',
        (active.textContent ?? '').trim().slice(0, 60),
      ].join('|');
    });
    fingerprints.push(fingerprint);
  }

  const consecutiveRepeats = fingerprints.filter(
    (fingerprint, index) => index > 0 && fingerprint === fingerprints[index - 1],
  );
  expect(
    consecutiveRepeats,
    `El foco se quedó en el mismo elemento dos veces seguidas: ${consecutiveRepeats.join(' / ')}`,
  ).toEqual([]);
  expect(
    new Set(fingerprints).size,
    'El foco apenas se movió entre elementos distintos',
  ).toBeGreaterThan(10);
});

async function expectRovingTabStop(tabs: Locator, activeIndex: number): Promise<void> {
  const tabStops = await tabs.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('tabindex')),
  );
  expect(tabStops[activeIndex], `La pestaña activa ${activeIndex} debería ser tabbable`).toBe('0');
  expect(
    tabStops.filter((value) => value === '0'),
    `Sólo una pestaña debe estar en el orden de tabulación: ${JSON.stringify(tabStops)}`,
  ).toHaveLength(1);
}
