import { expect, test } from '@playwright/test';
import { PAGES, SEGMENT_CONTENT_IDS, gotoPage, measuredAt, rawSsr, writeEvidence } from './helpers';

/**
 * AC-02 / AC-03 / AC-06 — audience identity, bilingual differentiation and the
 * absence of commercial or enquiry interactions.
 */

test('each audience has its own heading in each locale', async ({ request }) => {
  const headings = new Map<string, Set<string>>();
  for (const target of PAGES) {
    const { body } = await rawSsr(request, target);
    const localeKey = target.segmentId;
    const set = headings.get(localeKey) ?? new Set<string>();
    set.add(target.heading);
    headings.set(localeKey, set);
  }
  for (const [segmentId, set] of headings) {
    expect(set.size, `${segmentId} must have a distinct ES and EN heading`).toBe(2);
  }
  const esHeadings = PAGES.filter((page) => page.locale === 'es').map((page) => page.heading);
  expect(new Set(esHeadings).size, 'the three ES headings must differ').toBe(3);
});

test('the audience semantics are rendered, not only implied', async ({ page }) => {
  const expectations = [
    {
      segmentId: 'professionals',
      locale: 'es' as const,
      phrases: ['FLEET', 'instaladores', 'armadores'],
    },
    {
      segmentId: 'installers',
      locale: 'es' as const,
      phrases: ['PILOT', 'DOC-17', 'acreditación'],
    },
    {
      segmentId: 'shipowners',
      locale: 'es' as const,
      phrases: ['armador comercial', 'FLEET, cuando exista', 'GATE-PRIVACY-DPA-DPIA'],
    },
  ];
  for (const expectation of expectations) {
    const target = PAGES.find(
      (page) => page.segmentId === expectation.segmentId && page.locale === expectation.locale,
    )!;
    await gotoPage(page, target);
    const text = await page.locator('body').innerText();
    for (const phrase of expectation.phrases) {
      expect(text, `${expectation.segmentId} must render "${phrase}"`).toContain(phrase);
    }
  }
});

test('the shipowner page excludes the commercial shipowner and the fleet solution', async ({
  page,
}) => {
  const target = PAGES.find((page) => page.segmentId === 'shipowners' && page.locale === 'es')!;
  await gotoPage(page, target);
  const text = await page.locator('body').innerText();
  expect(text).toContain('Armador comercial');
  expect(text).toContain('no son el público de esta identidad');
  expect(text).toContain('no es esta audiencia');
});

test('no price, purchase, form or lead mechanism is rendered', async ({ page }) => {
  const results = [];
  for (const target of PAGES) {
    await gotoPage(page, target);
    const counts = await page.evaluate(() => ({
      forms: document.querySelectorAll('form').length,
      inputs: document.querySelectorAll('input, select, textarea').length,
      mailto: document.querySelectorAll('a[href^="mailto:"]').length,
      disabledCta: document.querySelectorAll('[data-marea-segment-disabled-cta]').length,
    }));
    expect(counts.forms, `forms on ${target.path}`).toBe(0);
    expect(counts.inputs, `inputs on ${target.path}`).toBe(0);
    expect(counts.mailto, `mailto links on ${target.path}`).toBe(0);
    expect(counts.disabledCta, `disabled CTA on ${target.path}`).toBe(1);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('€');
    expect(text.toLowerCase()).not.toContain('añadir al carrito');
    expect(text.toLowerCase()).not.toContain('add to cart');
    results.push({ path: target.path, ...counts });
  }
  writeEvidence('no-interaction-evidence.json', {
    contractId: 'MC19-NO-INTERACTION-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    expectation: { forms: 0, inputs: 0, mailto: 0, disabledCta: 1 },
    pages: results,
  });
});

test('every page carries the internal classification and public-isolation statement', async ({
  page,
}) => {
  for (const target of PAGES) {
    await gotoPage(page, target);
    const text = await page.locator('body').innerText();
    expect(text).toContain('MAREA');
    expect(text).toContain(target.locale === 'es' ? 'NO_GO' : 'NO_GO');
    expect(text).toContain(
      target.locale === 'es'
        ? 'Ninguna de estas tres páginas tiene ruta pública'
        : 'None of these three pages has a public route',
    );
    expect(text).toContain(
      target.locale === 'es'
        ? 'GATE-PRIVACY-DPA-DPIA está bloqueada'
        : 'GATE-PRIVACY-DPA-DPIA is blocked',
    );
  }
});

test('the content source identifiers are stable across the three pages', () => {
  expect(SEGMENT_CONTENT_IDS.length).toBe(3);
  for (const id of SEGMENT_CONTENT_IDS) {
    expect(['professionals', 'installers', 'shipowners']).toContain(id);
  }
});
