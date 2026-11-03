import { expect, test } from '@playwright/test';
import {
  BUNDLE_IDS,
  FAMILY_IDS,
  FAMILY_LIMITATION_SPOT_CHECKS,
  HERO_HEADING,
  LOCALES,
  SECTION_HOSTS,
  SECTION_IDS,
  collectConsoleMessages,
  gotoLanding,
  normalizeText,
} from './helpers';

/**
 * MC-18 content and semantics contract, both locales.
 *
 * The landing is internal draft copy: exactly one h1, one h2 per framed
 * section, nine family cards, six bundle cards, the persistent internal banner,
 * material limitations visible, and NO price, stock, checkout or purchase
 * affordance of any kind.
 */

const PURCHASE_CONTROL_NAMES =
  /(comprar|añadir al carrito|add to cart|\bbuy\b|\bpurchase\b|checkout|pedir ahora|order now|reservar|book now|suscr[ií]bete|subscribe now)/i;

for (const locale of LOCALES) {
  test.describe(`content and semantics — ${locale.label}`, () => {
    test('loads 200 with the frozen semantic structure and no commercial affordance', async ({
      page,
    }) => {
      const messages = collectConsoleMessages(page);
      const navigation = await gotoLanding(page, locale);
      expect(navigation.status).toBe(200);
      expect(navigation.url).toContain(locale.path);

      // Exactly one h1, owned by the hero section.
      await expect(page.locator('h1')).toHaveCount(1);
      const h1 = page.locator('h1');
      await expect(h1).toHaveAttribute('id', 'hero-heading');
      expect(normalizeText(await h1.innerText())).toBe(HERO_HEADING[locale.key]);

      // Ten section hosts in document order and every frozen in-page anchor resolves.
      const hosts = await page
        .locator('[data-marea-landing-section]')
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('data-marea-landing-section')),
        );
      expect(hosts).toEqual([...SECTION_HOSTS]);

      for (const anchor of SECTION_IDS) {
        await expect(page.locator(`#${anchor}`), `missing in-page anchor #${anchor}`).toHaveCount(
          1,
        );
      }

      // One h2 per framed section; the hero owns the single h1 instead.
      const sectionHeadingCounts = await page
        .locator('[data-marea-landing-section]')
        .evaluateAll((elements) =>
          elements.map((element) => ({
            host: element.getAttribute('data-marea-landing-section'),
            h1: element.querySelectorAll('h1').length,
            h2: element.querySelectorAll('h2').length,
          })),
        );
      expect(sectionHeadingCounts).toHaveLength(10);
      for (const section of sectionHeadingCounts) {
        if (section.host === 'hero') {
          expect(section.h1, 'hero must own the only h1').toBe(1);
          expect(section.h2, 'hero must not add an h2').toBe(0);
        } else {
          expect(section.h2, `${section.host}: expected exactly one h2`).toBe(1);
          expect(section.h1, `${section.host}: unexpected h1`).toBe(0);
        }
      }

      // Navigation is in-page only; the single cross-locale link is the locale switch.
      const navLinks = page.locator('marea-responsive-nav .link');
      await expect(navLinks).toHaveCount(10);
      const hrefs = await navLinks.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute('href')),
      );
      for (const href of hrefs) {
        expect(href, 'nav link must be an in-page anchor').toMatch(/^#/);
        const targetExists = await page.evaluate(
          (selector) => !!document.querySelector(selector),
          href,
        );
        expect(targetExists, `nav href ${href} has no target`).toBe(true);
      }

      const allHrefs = await page
        .locator('a[href]')
        .evaluateAll((elements) => elements.map((element) => element.getAttribute('href') ?? ''));
      for (const href of allHrefs) {
        const allowed = href.startsWith('#') || href === '/en/marea' || href === '/marea';
        expect(allowed, `unexpected public/internal href in preview: ${href}`).toBe(true);
      }

      // Nine families, exact ids and order.
      const familyIds = await page
        .locator('[data-landing-family]')
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('data-landing-family')),
        );
      expect(familyIds).toEqual([...FAMILY_IDS]);

      // Six bundles, exact ids and order.
      const bundleIds = await page
        .locator('[data-landing-bundle]')
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('data-landing-bundle')),
        );
      expect(bundleIds).toEqual([...BUNDLE_IDS]);

      // Persistent internal/provisional banner is visible and named.
      const banner = page.locator('[data-marea-landing-banner]');
      await expect(banner).toBeVisible();
      await expect(banner).toHaveAttribute('role', 'region');
      expect((await banner.getAttribute('aria-label'))?.trim().length ?? 0).toBeGreaterThan(0);
      await expect(page.locator('[data-landing-internal-banner]')).toBeVisible();

      // Material limitations are visible in the affected family cards (ES spot-check).
      if (locale.key === 'es') {
        for (const [familyId, text] of Object.entries(FAMILY_LIMITATION_SPOT_CHECKS)) {
          const card = page.locator(`[data-landing-family="${familyId}"]`);
          await expect(card, `missing family card ${familyId}`).toHaveCount(1);
          await expect(card.getByText(text, { exact: true })).toBeVisible();
        }
      }

      // No purchase/checkout control by accessible name.
      const controls = await page
        .locator('a, button, [role="button"], input[type="submit"], input[type="button"]')
        .evaluateAll((elements) =>
          elements.map((element) => ({
            tag: element.tagName.toLowerCase(),
            name: (element.getAttribute('aria-label') ?? element.textContent ?? '')
              .replace(/\s+/g, ' ')
              .trim(),
          })),
        );
      const purchaseControls = controls.filter((control) =>
        PURCHASE_CONTROL_NAMES.test(control.name),
      );
      expect(
        purchaseControls,
        `purchase/checkout affordances found: ${JSON.stringify(purchaseControls)}`,
      ).toEqual([]);

      // No price amount, currency, or positive stock claim in the rendered text.
      const bodyText = await page.evaluate(() => document.body.innerText);
      expect(bodyText, 'euro symbol found').not.toMatch(/€/);
      expect(bodyText, 'EUR currency code found').not.toMatch(/\bEUR\b/);
      expect(bodyText, 'currency amount found').not.toMatch(
        /\b\d{1,3}(?:[.\s]\d{3})*(?:[.,]\d{2})?\s*(?:€|EUR|euros?)\b/i,
      );
      expect(bodyText, 'positive "en stock" claim found').not.toMatch(/\ben stock\b/i);
      expect(bodyText, 'positive "in stock" claim found').not.toMatch(/\bin stock\b/i);

      // No page errors during load/hydration.
      const errors = messages.filter(
        (message) => message.type === 'error' || message.type === 'pageerror',
      );
      expect(errors, `console/page errors: ${JSON.stringify(errors)}`).toEqual([]);
    });
  });
}
