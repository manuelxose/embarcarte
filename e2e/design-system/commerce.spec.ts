import { expect, test } from '@playwright/test';
import { assertCatalogueBuilt, gotoCatalogue, setLocale } from './helpers';

/**
 * Invariantes comerciales fail-closed del catálogo interno MC-17.
 *
 * El catálogo renderiza especímenes hostiles: la capa de presentación debe
 * rechazar compra, carrito, precio y disponibilidad, explicarlo con texto y no
 * emitir datos estructurados de producto/oferta.
 */

const AMOUNT_PATTERN = /\d+[.,]\d{2}\s*€/;

test.beforeAll(async () => {
  await assertCatalogueBuilt();
});

test('adversarial invariants force purchase, cart, price and availability off', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const invariants = page.locator('[data-testid="adversarial-invariants"]');
  await expect(invariants, 'No se encontró el bloque adversarial-invariants').toBeVisible();

  const values = await invariants.evaluate((definitionList) => {
    const collected: Record<string, string> = {};
    definitionList.querySelectorAll('dt').forEach((term) => {
      const value = term.nextElementSibling;
      collected[(term.textContent ?? '').trim()] = (value?.textContent ?? '').trim();
    });
    return collected;
  });

  expect(values['purchaseActionAllowed']).toBe('false');
  expect(values['cartAllowed']).toBe('false');
  expect(values['priceVisible']).toBe('false');
  expect(values['availabilityVisible']).toBe('false');
  expect(values['ctaState']).toBe('NOT_AVAILABLE');
  expect(values['blockedSignals']).toBe('BUY_CTA, CART, PRICE_VISIBILITY, AVAILABILITY_VISIBILITY');
});

test('commerce CTA renders no control and no purchase/price copy', async ({ page }) => {
  await gotoCatalogue(page);
  const ctas = page.locator('marea-commercial-cta');
  const count = await ctas.count();
  expect(count, 'No se renderizó ningún marea-commercial-cta').toBeGreaterThan(0);

  const problems = await ctas.evaluateAll((elements) => {
    const found: string[] = [];
    const currency = /€|\bEUR\b|\bUSD\b/;
    const purchase =
      /\b(comprar|buy now|add to cart|añadir al carrito|pre-order|preventa|lista de espera|waiting list)\b/i;
    // Atenuación documentada: una frase que NIEGA explícitamente la compra
    // ("No hay preventa, reserva ni lista de espera") es copy honesto y no un
    // CTA comprable. El resto de frases se evalúa con el regex exigido al pie
    // de la letra. Sin esta exención, sólo se podría pasar borrando la negación.
    const denial = /\b(no hay|no existe|no incluye|no se ofrece|sin|ningún|ninguna)\b/i;
    elements.forEach((element, index) => {
      if (element.querySelector('button, a, [role="button"]')) {
        found.push(`CTA ${index + 1}: contiene un control de acción`);
      }
      const text = (element as HTMLElement).innerText;
      if (currency.test(text)) {
        found.push(`CTA ${index + 1}: contiene moneda/importe → ${text.slice(0, 160)}`);
      }
      const purchaseClaims = text
        .split(/(?<=[.!?])\s+|\n+/)
        .filter((sentence) => purchase.test(sentence) && !denial.test(sentence));
      if (purchaseClaims.length > 0) {
        found.push(
          `CTA ${index + 1}: contiene texto de compra → ${purchaseClaims.join(' / ').slice(0, 160)}`,
        );
      }
    });
    return found;
  });

  expect(problems, problems.join('\n')).toEqual([]);
});

test('the catalogue emits no product/offer structured data', async ({ page }) => {
  await gotoCatalogue(page);

  const jsonLd = await page.locator('script[type="application/ld+json"]').count();
  expect(jsonLd, 'El catálogo interno no debe emitir application/ld+json').toBe(0);

  const microdata = await page
    .locator(
      '[itemtype*="schema.org/Product"], [itemtype*="schema.org/Offer"], [itemprop="price"], [itemprop="availability"]',
    )
    .count();
  expect(microdata, 'El catálogo interno no debe emitir microdatos Product/Offer').toBe(0);
});

test('price and stock panels never render an amount or an availability claim', async ({ page }) => {
  await gotoCatalogue(page);

  const commercial = page.locator(
    'marea-price-unavailable, marea-stock-unavailable, marea-commercial-cta, marea-family-card, marea-adversarial-gallery',
  );
  const commercialText = await commercial.evaluateAll((elements) =>
    elements.map((element) => (element as HTMLElement).innerText).join('\n'),
  );
  expect(commercialText, 'Un panel comercial renderiza un importe').not.toMatch(AMOUNT_PATTERN);

  // Ningún importe con moneda en toda la página del catálogo.
  const pageText = await page.evaluate(() => document.body.innerText);
  expect(pageText, 'La página del catálogo contiene un importe con moneda').not.toMatch(
    AMOUNT_PATTERN,
  );

  // Ningún aria-label debe afirmar disponibilidad o precio. Se busca una
  // afirmación positiva; "Disponibilidad no verificada" no es una afirmación.
  const suspiciousAriaLabels = await page.locator('[aria-label]').evaluateAll((elements) => {
    const positiveAvailability =
      /\b(en stock|in stock|disponible ahora|available now|sold out|agotado|comprar|buy now|add to cart|añadir al carrito)\b/i;
    return elements
      .map((element) => element.getAttribute('aria-label') ?? '')
      .filter((label) => positiveAvailability.test(label));
  });
  expect(
    suspiciousAriaLabels,
    `aria-label que afirma disponibilidad: ${suspiciousAriaLabels.join(' | ')}`,
  ).toEqual([]);

  // Protección adicional: los botones comprables no existen en estas páginas.
  const purchaseControls = await page
    .locator(
      'marea-price-unavailable button, marea-stock-unavailable button, marea-commercial-cta button, marea-commercial-cta a',
    )
    .count();
  expect(purchaseControls, 'Hay controles dentro de paneles de precio/stock/CTA').toBe(0);
});

test('each CTA state explanation is visible prose, not only a badge', async ({ page }) => {
  await gotoCatalogue(page);
  const ctas = page.locator('marea-commercial-cta');
  const count = await ctas.count();
  expect(count, 'No se renderizó ningún marea-commercial-cta').toBeGreaterThan(0);

  const explanations = await ctas.evaluateAll((elements) =>
    elements.map((element) =>
      Array.from(element.querySelectorAll<HTMLElement>('p'))
        .filter((paragraph) => paragraph.getClientRects().length > 0)
        .map((paragraph) => (paragraph.textContent ?? '').trim())
        .filter((text) => text.length > 0),
    ),
  );

  for (const [index, paragraphs] of explanations.entries()) {
    const context = `CTA ${index + 1}`;
    expect(paragraphs.length, `${context}: no hay explicación textual visible`).toBeGreaterThan(0);
    expect(
      paragraphs.some((text) => text.length >= 20),
      `${context}: la explicación visible es demasiado corta (sólo badge/etiqueta): ${JSON.stringify(paragraphs)}`,
    ).toBe(true);
  }
});

test('the internal-use banner is visible in Spanish and English', async ({ page }) => {
  await gotoCatalogue(page);

  await setLocale(page, 'es');
  await expect(
    page.getByText(/Solo uso interno/i).first(),
    'No se ve el aviso interno "Solo uso interno" en ES',
  ).toBeVisible();

  await setLocale(page, 'en');
  await expect(
    page.getByText(/Internal use only/i).first(),
    'No se ve el aviso interno "Internal use only" en EN',
  ).toBeVisible();
});

// IR-01 closure: the catalogue must render the family-specific limitation copy,
// not merely define it. These are the exact ES strings from MAREA_COPY.
test('every family-specific limit is rendered by a family card', async ({ page }) => {
  await gotoCatalogue(page);
  const body = await page.evaluate(() => document.body.innerText);
  const required: ReadonlyArray<readonly [string, string]> = [
    ['PILOT', 'Concepto de pilotaje asistido'],
    ['AIS', 'Recepción únicamente'],
    ['WATCH', 'No se garantizan alertas'],
    ['FLEET', 'Sin hardware por defecto'],
    ['SENSE', 'Las funciones locales de seguridad'],
    ['DISPLAY', 'Sin dimensiones, tamaño final ni precio inventados'],
    ['NAV/WEATHER', 'cartas náuticas y meteorología no licenciados'],
  ];
  const missing = required.filter(([, copy]) => !body.includes(copy)).map(([family]) => family);
  expect(missing, 'Límites familiares no renderizados: ' + missing.join(', ')).toEqual([]);
});
