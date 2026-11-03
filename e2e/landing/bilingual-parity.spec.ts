import { expect, test } from '@playwright/test';
import { LOCALES, gotoLanding, normalizeText } from './helpers';

/**
 * MC-18 bilingual parity.
 *
 * ES is the default locale and EN is served alongside it. Both render the same
 * component tree and the same section order; sampled headings and leads are
 * different and non-empty in each language, and no known ES string leaks into
 * the EN document.
 */

interface SectionCopy {
  readonly id: string;
  readonly heading: string;
  readonly lead: string;
}

interface LandingStructure {
  readonly htmlLang: string;
  readonly hero: string;
  readonly sections: readonly SectionCopy[];
  readonly families: number;
  readonly bundles: number;
  readonly nav: readonly string[];
  readonly limitationsHeading: string;
}

async function readStructure(page: import('@playwright/test').Page): Promise<LandingStructure> {
  return page.evaluate(() => {
    const text = (element: Element | null): string =>
      normalize((element?.textContent ?? '') as string);
    const sections = Array.from(document.querySelectorAll('section[id]')).map((section) => ({
      id: section.id,
      heading: text(section.querySelector('h2')),
      lead: text(section.querySelector('.lead')),
    }));
    return {
      htmlLang: document.documentElement.lang,
      hero: text(document.querySelector('h1')),
      sections,
      families: document.querySelectorAll('[data-landing-family]').length,
      bundles: document.querySelectorAll('[data-landing-bundle]').length,
      nav: Array.from(document.querySelectorAll('marea-responsive-nav .link')).map((link) =>
        text(link),
      ),
      limitationsHeading: text(document.querySelector('[data-landing-family] .limits-heading')),
    };

    function normalize(value: string): string {
      return value.replace(/\s+/g, ' ').trim();
    }
  });
}

/** Unique ES strings that must not survive on the EN document. */
const SPANISH_SPOT_CHECKS = [
  'Nueve familias, cada una con su alcance declarado',
  'Limitaciones materiales',
  'Seis conceptos de solución definidos internamente',
  'Esta vista no es una oferta',
  'Saltar al contenido',
  'Documentación de definición, sin aprobación de publicación',
  'Estado interno registrado',
  'Cada familia se registra con su estado de ciclo de vida',
  'Inicio',
  'Disponibilidad',
  'Cierre',
] as const;

test.describe('bilingual parity ES/EN', () => {
  test('section order, card counts and sampled copy differ per locale without ES leftovers', async ({
    page,
  }) => {
    await gotoLanding(page, LOCALES[0]);
    const es = await readStructure(page);
    const esBody = await page.evaluate(() => document.body.innerText);
    const esLocaleSwitch = await page
      .getByRole('link', { name: 'Ver esta vista interna en inglés' })
      .count();
    expect(esLocaleSwitch, 'ES locale switch accessible name').toBe(1);

    await gotoLanding(page, LOCALES[1]);
    const en = await readStructure(page);
    const enBody = await page.evaluate(() => document.body.innerText);
    const enLocaleSwitch = await page
      .getByRole('link', { name: 'View this internal view in Spanish' })
      .count();
    expect(enLocaleSwitch, 'EN locale switch accessible name').toBe(1);

    // Document language is declared per route.
    expect(es.htmlLang).toBe('es-ES');
    expect(en.htmlLang).toBe('en');

    // Same section order and same number of family/bundle cards.
    expect(es.sections.map((section) => section.id)).toEqual(
      en.sections.map((section) => section.id),
    );
    expect(es.sections.length, 'expected nine framed sections').toBe(9);
    expect(en.sections.length, 'expected nine framed sections').toBe(9);
    expect(es.families).toBe(9);
    expect(en.families).toBe(9);
    expect(es.bundles).toBe(6);
    expect(en.bundles).toBe(6);

    // Hero h1 is translated and non-empty.
    expect(es.hero.length).toBeGreaterThan(20);
    expect(en.hero.length).toBeGreaterThan(20);
    expect(normalizeText(en.hero)).not.toBe(normalizeText(es.hero));

    // Every sampled section heading and lead differs and is non-empty.
    for (const [index, esSection] of es.sections.entries()) {
      const enSection = en.sections[index];
      expect(enSection.id).toBe(esSection.id);
      expect(esSection.heading.length, `${esSection.id}: empty ES heading`).toBeGreaterThan(0);
      expect(enSection.heading.length, `${enSection.id}: empty EN heading`).toBeGreaterThan(0);
      expect(
        normalizeText(enSection.heading),
        `${esSection.id}: EN heading equals ES heading`,
      ).not.toBe(normalizeText(esSection.heading));
      expect(esSection.lead.length, `${esSection.id}: empty ES lead`).toBeGreaterThan(0);
      expect(enSection.lead.length, `${esSection.id}: empty EN lead`).toBeGreaterThan(0);
      expect(normalizeText(enSection.lead), `${esSection.id}: EN lead equals ES lead`).not.toBe(
        normalizeText(esSection.lead),
      );
    }

    // Navigation labels are translated (the locale switch keeps ES/EN initials).
    expect(es.nav.length).toBe(10);
    expect(en.nav.length).toBe(10);
    for (const [index, esLabel] of es.nav.entries()) {
      expect(en.nav[index].length).toBeGreaterThan(0);
      expect(normalizeText(en.nav[index]), `nav label ${index} not translated`).not.toBe(
        normalizeText(esLabel),
      );
    }

    // Material-limitations heading is translated.
    expect(es.limitationsHeading).toBe('Limitaciones materiales');
    expect(en.limitationsHeading).toBe('Material limitations');

    // Every known ES sample exists in ES and is absent from EN. Comparisons are
    // case-insensitive because CSS text-transform changes innerText casing.
    const esBodyLower = esBody.toLowerCase();
    const enBodyLower = enBody.toLowerCase();
    for (const sample of SPANISH_SPOT_CHECKS) {
      expect(esBodyLower, `ES sanity: missing sample "${sample}"`).toContain(sample.toLowerCase());
      expect(enBodyLower, `untranslated Spanish string on EN: "${sample}"`).not.toContain(
        sample.toLowerCase(),
      );
    }
  });
});
