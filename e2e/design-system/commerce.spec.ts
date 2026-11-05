import { expect, test, type Page } from '@playwright/test';
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

// IR-01 closure: each of the nine family cards must render its own localized
// limitation and its material (safety/licensing/compatibility) restriction chip.
// Every assertion is scoped to that family's own card, never to body text.

interface LocalizedCopy {
  readonly es: string;
  readonly en: string;
}

const COPY = {
  pilotSupervised: {
    es: 'Concepto de pilotaje asistido. Sin navegación autónoma ni control de gobierno en vivo. Puerta de seguridad bloqueada.',
    en: 'Supervised pilot concept. No autonomous navigation and no live steering control. Safety gate blocked.',
  },
  aisReceiveOnly: {
    es: 'Recepción únicamente. Sin transmisión AIS ni promesa de evitación de colisiones.',
    en: 'Receive-only. No AIS transmission and no collision-avoidance promise.',
  },
  watchNoGuarantee: {
    es: 'No se garantizan alertas ni una monitorización remota continua.',
    en: 'Alerts are not guaranteed and continuous remote monitoring is not provided.',
  },
  fleetNoHardware: {
    es: 'Sin hardware por defecto y sin acuerdo de nivel de servicio establecido.',
    en: 'No default hardware and no established service-level agreement.',
  },
  localSafetyIndependent: {
    es: 'Las funciones locales de seguridad no dependen del pago de una suscripción.',
    en: 'Local safety functions do not depend on a subscription payment.',
  },
  navWeatherLicensing: {
    es: 'Los datos de cartas náuticas y meteorología no licenciados no se representan como incluidos.',
    en: 'Unlicensed chart and weather data are not represented as included.',
  },
  senseEssentialsKit: {
    es: 'Un kit que representa POWER + BILGE; los módulos no se cuentan dos veces.',
    en: 'One kit representing POWER + BILGE; modules are not double-counted.',
  },
  displayConditional: {
    es: 'Sin dimensiones, tamaño final ni precio inventados.',
    en: 'No invented dimensions, final size or price.',
  },
  compatibilityUnverified: {
    es: 'Compatibilidad no verificada: 0 filas probadas. No se afirma compatibilidad con equipos de terceros.',
    en: 'Compatibility unverified: 0 tested rows. No compatibility with third-party equipment is claimed.',
  },
  permission: { es: 'Autorización', en: 'Authorisation' },
  provisionalBrand: {
    es: 'Marca propuesta MAREA · identidad no adoptada · uso público NO_GO',
    en: 'MAREA is a proposed brand · identity not adopted · public use NO_GO',
  },
  priceUnavailable: {
    es: 'Importe no establecido. No se muestra ningún precio porque no existe un precio aprobado.',
    en: 'No amount established. No price is shown because no approved price exists.',
  },
} as const satisfies Record<string, LocalizedCopy>;

interface FamilyExpectation {
  readonly familyId: string;
  /** Family-limit paragraph copy from FAMILY_LIMIT_KEYS. */
  readonly limit: LocalizedCopy;
  /** Material restriction that must lead the visible chips (never pushed out). */
  readonly firstChip?: LocalizedCopy;
  readonly kitNote?: LocalizedCopy;
}

const FAMILY_EXPECTATIONS: readonly FamilyExpectation[] = [
  { familyId: 'NAV', limit: COPY.navWeatherLicensing, firstChip: COPY.navWeatherLicensing },
  { familyId: 'PILOT', limit: COPY.pilotSupervised, firstChip: COPY.pilotSupervised },
  { familyId: 'FLEET', limit: COPY.fleetNoHardware, firstChip: COPY.navWeatherLicensing },
  { familyId: 'AIS', limit: COPY.aisReceiveOnly, firstChip: COPY.navWeatherLicensing },
  { familyId: 'WATCH', limit: COPY.watchNoGuarantee, firstChip: COPY.compatibilityUnverified },
  {
    familyId: 'SENSE',
    limit: COPY.localSafetyIndependent,
    firstChip: COPY.compatibilityUnverified,
    kitNote: COPY.senseEssentialsKit,
  },
  { familyId: 'DISPLAY', limit: COPY.displayConditional },
  { familyId: 'WEATHER', limit: COPY.navWeatherLicensing, firstChip: COPY.navWeatherLicensing },
  { familyId: 'HUB', limit: COPY.compatibilityUnverified },
];

function cardFor(page: Page, testId: string) {
  return page.locator(`[data-testid="${testId}"]`);
}

test('each of the nine family cards renders its own localized limitation in ES and EN', async ({
  page,
}) => {
  await gotoCatalogue(page);

  for (const locale of ['es', 'en'] as const) {
    await setLocale(page, locale);
    for (const expectation of FAMILY_EXPECTATIONS) {
      const context = `${expectation.familyId} (${locale})`;
      const card = cardFor(page, `family-card-${expectation.familyId}`);
      await expect(card, `No se renderizó la ficha de familia ${context}`).toBeVisible();

      // The family limit is a dedicated paragraph inside that card, not body text.
      await expect(
        card.locator('p.family-limit').first(),
        `${context}: falta el límite de familia localizado`,
      ).toHaveText(expectation.limit[locale]);

      const chips = await card.locator('li.restriction').allInnerTexts();
      expect(chips.length, `${context}: se esperaban cuatro restricciones visibles`).toBe(4);

      if (expectation.firstChip) {
        expect(chips[0], `${context}: la restricción material no encabeza las etiquetas`).toBe(
          expectation.firstChip[locale],
        );
      }
      if (expectation.kitNote) {
        await expect(
          card.locator('p.kit-note'),
          `${context}: falta la composición del kit SENSE`,
        ).toHaveText(expectation.kitNote[locale]);
      }
    }
  }
});

test('the SENSE kit composition is visible on its family card and in the PROTECT bundle', async ({
  page,
}) => {
  await gotoCatalogue(page);

  const senseCard = cardFor(page, 'family-card-SENSE');
  await expect(senseCard.locator('p.kit-note')).toHaveText(COPY.senseEssentialsKit.es);

  const protect = page
    .locator('marea-bundle-components')
    .filter({ hasText: 'MAREA SENSE ESSENTIALS' });
  await expect(protect, 'El paquete PROTECT no está renderizado').toHaveCount(1);
  await expect(protect).toContainText('Incluye: SENSE-POWER, SENSE-BILGE');
});

test('adversarial family card: a safety restriction listed first is never dropped', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-safety-first');
  await expect(card, 'No se renderizó el caso adversarial safety-first').toBeVisible();
  const chips = await card.locator('li.restriction').allInnerTexts();
  expect(chips, 'La restricción de seguridad desapareció').toContain(COPY.pilotSupervised.es);
});

test('adversarial family card: a safety restriction listed fifth is never dropped', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-safety-fifth');
  await expect(card, 'No se renderizó el caso adversarial safety-fifth').toBeVisible();
  const chips = await card.locator('li.restriction').allInnerTexts();
  expect(chips, 'La restricción de seguridad en quinta posición desapareció').toContain(
    COPY.pilotSupervised.es,
  );
  expect(chips[0], 'La restricción de seguridad no se priorizó al frente').toBe(
    COPY.pilotSupervised.es,
  );
});

test('adversarial family card: duplicate restrictions render once', async ({ page }) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-duplicates');
  await expect(card, 'No se renderizó el caso adversarial duplicates').toBeVisible();
  const chips = await card.locator('li.restriction').allInnerTexts();
  expect(chips, 'Los duplicados no se deduplicaron por clave de copy').toEqual([
    COPY.pilotSupervised.es,
    COPY.provisionalBrand.es,
    COPY.priceUnavailable.es,
  ]);
});

test('adversarial family card: a missing restrictions array renders no chips and does not crash', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-missing-restrictions');
  await expect(card, 'La ficha con restricciones ausentes no se renderizó').toBeVisible();
  await expect(card.locator('ul.restrictions')).toHaveCount(0);
  await expect(card.locator('li.restriction')).toHaveCount(0);
  await expect(card.locator('h3')).toContainText('SYNTHETIC');
});

test('adversarial family card: an unknown restriction kind falls back to the permission copy', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-unknown-kind');
  await expect(card, 'No se renderizó el caso adversarial unknown-kind').toBeVisible();
  const chips = await card.locator('li.restriction').allInnerTexts();
  expect(chips, 'Una restricción desconocida no usó el copy de permiso').toEqual([
    COPY.permission.es,
  ]);
});

test('adversarial family card: two simultaneous blocking restrictions both survive', async ({
  page,
}) => {
  await gotoCatalogue(page);
  const card = cardFor(page, 'family-card-adversarial-dual-blocking');
  await expect(card, 'No se renderizó el caso adversarial dual-blocking').toBeVisible();
  const chips = await card.locator('li.restriction').allInnerTexts();
  expect(chips, 'No sobrevivieron ambas restricciones bloqueantes').toContain(
    COPY.pilotSupervised.es,
  );
  expect(chips).toContain(COPY.navWeatherLicensing.es);
  expect(
    chips.indexOf(COPY.pilotSupervised.es),
    'La seguridad no se ordenó antes que la licencia',
  ).toBeLessThan(chips.indexOf(COPY.navWeatherLicensing.es));
});
