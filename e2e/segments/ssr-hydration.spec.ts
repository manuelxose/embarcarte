import { expect, test } from '@playwright/test';
import { PAGES, SECTION_HOSTS, gotoPage, measuredAt, rawSsr, writeEvidence } from './helpers';

/**
 * AC-05 / AC-07 — SSR output and hydration agree, and the internal pages emit no
 * public/indexable surface.
 *
 * The raw request proves what the server sends without JavaScript. The browser
 * request proves the same page hydrates and keeps the same heading.
 */

const FORBIDDEN_HTML = [
  '<form',
  '<input',
  '<select',
  '<textarea',
  'rel="canonical"',
  'hreflang=',
  'property="og:',
  'name="twitter:',
  'application/ld+json',
];

test('SSR emits the real page, no indexable metadata and no interactive form', async ({
  request,
}) => {
  const results = [];
  for (const target of PAGES) {
    const { status, body, headers } = await rawSsr(request, target);
    expect(status, `SSR status for ${target.path}`).toBe(200);
    expect(headers['x-robots-tag']).toContain('noindex');
    expect(headers['content-security-policy']).toContain("form-action 'none'");
    expect(body).toContain('name="robots" content="noindex, nofollow, noarchive"');
    expect(body).toContain(target.heading);

    const h1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((match) =>
      match[1].replace(/<[^>]+>/g, '').trim(),
    );
    expect(h1.length, `exactly one h1 on ${target.path}`).toBe(1);
    expect(h1[0]).toBe(target.heading);

    for (const host of SECTION_HOSTS) {
      expect(body, `section ${host} on ${target.path}`).toContain(
        `data-marea-segment-section="${host}"`,
      );
    }

    const presentForbidden = FORBIDDEN_HTML.filter((marker) => body.includes(marker));
    expect(presentForbidden, `forbidden markers on ${target.path}`).toEqual([]);

    const expectedLang = target.locale === 'es' ? 'es-ES' : 'en';
    expect(body).toContain(`lang="${expectedLang}"`);

    results.push({
      path: target.path,
      segmentId: target.segmentId,
      locale: target.locale,
      status,
      bytes: body.length,
      h1: h1[0],
      sections: SECTION_HOSTS.length,
      robots: headers['x-robots-tag'],
      forbiddenMarkers: presentForbidden,
    });
  }
  writeEvidence('ssr-hydration-evidence.json', {
    contractId: 'MC19-SSR-HYDRATION-EVIDENCE',
    milestone: 'MC-19',
    measuredAt: measuredAt(),
    publicationStatus: 'NOT_AUTHORIZED',
    pages: results,
    summary: { pages: results.length, ssrFailures: 0 },
  });
});

test('the page hydrates without console errors and keeps the same heading', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));

  for (const target of PAGES) {
    const status = await gotoPage(page, target);
    expect(status).toBe(200);
    await expect(page.locator('h1')).toHaveText(target.heading);
    await expect(page.locator('[data-marea-segment-main]')).toBeVisible();
    for (const host of SECTION_HOSTS) {
      await expect(page.locator(`[data-marea-segment-section="${host}"]`)).toBeVisible();
    }
  }
  expect(consoleErrors).toEqual([]);
});

test('the locale switch links to the same audience in the other locale', async ({ page }) => {
  for (const target of PAGES) {
    await gotoPage(page, target);
    const other = target.locale === 'es' ? 'en' : 'es';
    const expectedPath = target.path.replace(
      other === 'en' ? /^\/internal\// : /^\/en\/internal\//,
      other === 'en' ? '/en/internal/' : '/internal/',
    );
    await expect(page.locator('.locale')).toHaveAttribute('href', expectedPath);
  }
});
