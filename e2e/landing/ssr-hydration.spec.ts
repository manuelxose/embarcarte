import { expect, test } from '@playwright/test';
import {
  EVIDENCE_ENVELOPE,
  GENERATION_COMMANDS,
  HERO_HEADING,
  LOCALES,
  collectConsoleMessages,
  gotoLanding,
  measuredAt,
  normalizeText,
  toPosix,
  writeEvidence,
} from './helpers';

/**
 * MC-18 SSR and hydration contract.
 *
 * SSR is proven with raw HTTP requests (no JavaScript): the server-rendered
 * document contains the landing markup, is non-indexable and exposes no
 * canonical/hreflang/Open Graph/Twitter/JSON-LD metadata. Hydration is proven in
 * Chromium: the `ngh` markers are removed, the DOM is not duplicated, the
 * console is clean and keyboard interaction works after hydration.
 */

const SSR_HEADER = 'x-robots-tag';

const ssrResults: Record<
  string,
  {
    status: number;
    htmlBytes: number;
    htmlLang: string;
    heroHeading: string;
    sections: number;
    families: number;
    bundles: number;
    banner: boolean;
    metaRobotsNoindex: boolean;
    noCanonical: boolean;
    noHreflang: boolean;
    noOg: boolean;
    noTwitter: boolean;
    noJsonLd: boolean;
    xRobots: string;
  }
> = {};

let notFoundStatuses: { path: string; status: number; xRobots: string }[] = [];

const hydrationResults: Record<
  string,
  {
    status: 'PASS' | 'FAIL';
    consoleErrors: number;
    consoleWarnings: number;
    duplicateDom: boolean;
    mismatch: boolean;
    ssrSections: number;
    liveSections: number;
    ssrFamilies: number;
    liveFamilies: number;
    ssrBundles: number;
    liveBundles: number;
    ssrH1: number;
    liveH1: number;
    bannerVisible: boolean;
    heroHeadingStable: boolean;
    keyboardAfterHydration: boolean;
    hydrationLog: string | null;
  }
> = {};

let browserVersion = '';
let hydrationOverall: 'PASS' | 'FAIL' = 'FAIL';

/** Reads the raw SSR HTML of a route without executing JavaScript. */
async function fetchSsr(
  request: import('@playwright/test').APIRequestContext,
  path: string,
): Promise<{ response: import('@playwright/test').APIResponse; html: string }> {
  const response = await request.get(path);
  return { response, html: await response.text() };
}

/** Counts non-overlapping literal occurrences. */
function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

/** Extracts the h1 text from raw HTML (tags stripped, whitespace normalized). */
function extractH1Text(html: string): string {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return '';
  return normalizeText(
    match[1]
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' '),
  );
}

test.describe('SSR contract (no JavaScript)', () => {
  for (const locale of LOCALES) {
    test(`raw ${locale.path} renders landing markup and no indexable metadata`, async ({
      request,
    }) => {
      const { response, html } = await fetchSsr(request, locale.path);
      expect(response.status(), `HTTP status ${locale.path}`).toBe(200);

      const header = response.headers()[SSR_HEADER] ?? '';
      expect(header.toLowerCase()).toContain('noindex');

      const htmlLang = html.match(/<html[^>]*lang=["']([^"']*)["']/i)?.[1] ?? '';
      expect(htmlLang).toBe(locale.documentLang);

      const heroHeading = extractH1Text(html);
      expect(normalizeText(heroHeading)).toBe(HERO_HEADING[locale.key]);

      const sections = countOccurrences(html, 'data-marea-landing-section');
      const families = countOccurrences(html, 'data-landing-family=');
      const bundles = countOccurrences(html, 'data-landing-bundle=');
      const banner = html.includes('data-landing-internal-banner');
      const metaRobotsNoindex = /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(
        html,
      );
      const noCanonical = !/rel=["']canonical["']/i.test(html);
      const noHreflang = !/hreflang=/i.test(html);
      const noOg = !/(?:property|name)=["']og:/i.test(html);
      const noTwitter = !/(?:property|name)=["']twitter:/i.test(html);
      const noJsonLd = !/application\/ld\+json/i.test(html);

      expect(sections, 'SSR section hosts').toBeGreaterThanOrEqual(10);
      expect(families, 'SSR family cards').toBe(9);
      expect(bundles, 'SSR bundle cards').toBe(6);
      expect(banner, 'SSR internal banner').toBe(true);
      expect(metaRobotsNoindex, 'meta robots noindex').toBe(true);
      expect(noCanonical, 'canonical link must not exist').toBe(true);
      expect(noHreflang, 'hreflang must not exist').toBe(true);
      expect(noOg, 'og:* meta must not exist').toBe(true);
      expect(noTwitter, 'twitter:* meta must not exist').toBe(true);
      expect(noJsonLd, 'application/ld+json must not exist').toBe(true);

      // Every frozen in-page anchor is server-rendered.
      for (const anchor of [
        'hero',
        'ecosistema',
        'familias',
        'arquitectura',
        'paquetes',
        'software-hardware',
        'profesionales',
        'documentacion',
        'disponibilidad',
        'cierre',
      ]) {
        expect(html, `SSR anchor #${anchor}`).toContain(`id="${anchor}"`);
      }

      ssrResults[locale.key] = {
        status: response.status(),
        htmlBytes: Buffer.byteLength(html, 'utf8'),
        htmlLang,
        heroHeading,
        sections,
        families,
        bundles,
        banner,
        metaRobotsNoindex,
        noCanonical,
        noHreflang,
        noOg,
        noTwitter,
        noJsonLd,
        xRobots: header,
      };
    });
  }

  test('unknown paths return 404 with the noindex header', async ({ request }) => {
    notFoundStatuses = [];
    for (const path of ['/marea/unknown', '/en/marea/unknown', '/unknown']) {
      const response = await request.get(path);
      expect(response.status(), `HTTP status ${path}`).toBe(404);
      const header = (response.headers()[SSR_HEADER] ?? '').toLowerCase();
      expect(header, `X-Robots-Tag on ${path}`).toContain('noindex');
      notFoundStatuses.push({ path, status: response.status(), xRobots: header });
    }
  });
});

test.describe('hydration', () => {
  for (const locale of LOCALES) {
    test(`${locale.path} hydrates without duplication, mismatch or console errors`, async ({
      browser,
      baseURL,
    }) => {
      browserVersion = browser.version();
      const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
      const messages = collectConsoleMessages(page);
      try {
        const ssr = await fetchSsr(page.request, locale.path);
        const ssrH1 = countOccurrences(ssr.html, '<h1');
        const ssrSections = countOccurrences(ssr.html, 'data-marea-landing-section');
        const ssrFamilies = countOccurrences(ssr.html, 'data-landing-family=');
        const ssrBundles = countOccurrences(ssr.html, 'data-landing-bundle=');
        const ssrHero = extractH1Text(ssr.html);

        await gotoLanding(page, locale);

        const live = await page.evaluate(() => ({
          h1: document.querySelectorAll('h1').length,
          sections: document.querySelectorAll('[data-marea-landing-section]').length,
          families: document.querySelectorAll('[data-landing-family]').length,
          bundles: document.querySelectorAll('[data-landing-bundle]').length,
          banner: (() => {
            const element = document.querySelector('[data-landing-internal-banner]');
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })(),
          hero: (document.querySelector('h1')?.textContent ?? '').replace(/\s+/g, ' ').trim(),
          nghRemaining: document.querySelectorAll('[ngh]').length,
        }));

        expect(live.nghRemaining, 'ngh markers after hydration').toBe(0);
        expect(live.h1, 'single h1 after hydration').toBe(1);
        expect(live.sections, 'sections after hydration').toBe(ssrSections);
        expect(live.families, 'families after hydration').toBe(ssrFamilies);
        expect(live.bundles, 'bundles after hydration').toBe(ssrBundles);
        expect(live.banner, 'banner visible after hydration').toBe(true);
        expect(live.hero, 'hero heading stable across hydration').toBe(normalizeText(ssrHero));

        // No console error/warning that indicates a hydration mismatch.
        const hydrationIssuePattern = /NG0(?:5|6)\d\d|hydration/i;
        const errors = messages.filter(
          (message) => message.type === 'error' || message.type === 'pageerror',
        );
        const warnings = messages.filter(
          (message) => message.type === 'warning' && hydrationIssuePattern.test(message.text),
        );
        expect(errors, `console errors: ${JSON.stringify(errors)}`).toEqual([]);
        expect(warnings, `hydration warnings: ${JSON.stringify(warnings)}`).toEqual([]);

        // Keyboard interaction must work after hydration (mobile layout).
        await page.keyboard.press('Tab');
        const firstFocus = await page.evaluate(() => ({
          tag: document.activeElement?.tagName ?? '',
          href: document.activeElement?.getAttribute('href') ?? '',
        }));
        expect(firstFocus.href, 'first Tab reaches the skip link').toBe('#landing-main');

        const toggle = page.locator('marea-responsive-nav button');
        await expect(toggle).toBeVisible();
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await page.locator('marea-responsive-nav .link').first().focus();
        await page.keyboard.press('Escape');
        await expect(toggle, 'Escape closes the mobile nav').toHaveAttribute(
          'aria-expanded',
          'false',
        );
        const focusAfterEscape = await page.evaluate(() => document.activeElement?.tagName);
        expect(focusAfterEscape, 'focus returns to the toggle').toBe('BUTTON');

        const hydrationLog =
          messages.find((message) => /Angular hydrated/i.test(message.text))?.text ?? null;

        hydrationResults[locale.key] = {
          status: 'PASS',
          consoleErrors: errors.length,
          consoleWarnings: warnings.length,
          duplicateDom: live.sections !== ssrSections || live.families !== ssrFamilies,
          mismatch: live.hero !== normalizeText(ssrHero),
          ssrSections,
          liveSections: live.sections,
          ssrFamilies,
          liveFamilies: live.families,
          ssrBundles,
          liveBundles: live.bundles,
          ssrH1,
          liveH1: live.h1,
          bannerVisible: live.banner,
          heroHeadingStable: live.hero === normalizeText(ssrHero),
          keyboardAfterHydration: firstFocus.href === '#landing-main',
          hydrationLog,
        };

        expect(baseURL).toBe('http://127.0.0.1:4302');
      } finally {
        await page.close();
      }
    });
  }

  test('all hydration checks passed', async () => {
    for (const locale of LOCALES) {
      const result = hydrationResults[locale.key];
      expect(result, `missing hydration result for ${locale.key}`).toBeTruthy();
      expect(result.consoleErrors, `${locale.key}: console errors`).toBe(0);
      expect(result.consoleWarnings, `${locale.key}: hydration warnings`).toBe(0);
      expect(result.duplicateDom, `${locale.key}: duplicated DOM`).toBe(false);
      expect(result.mismatch, `${locale.key}: SSR/CSR mismatch`).toBe(false);
      expect(result.heroHeadingStable, `${locale.key}: hero heading changed`).toBe(true);
      expect(result.keyboardAfterHydration, `${locale.key}: keyboard after hydration`).toBe(true);
    }
    hydrationOverall = 'PASS';
  });
});

test.afterAll(() => {
  const ssrData = {
    es: { status: ssrResults.es?.status ?? 0 },
    en: { status: ssrResults.en?.status ?? 0 },
    noCanonical: ssrResults.es?.noCanonical === true && ssrResults.en?.noCanonical === true,
    noHreflang: ssrResults.es?.noHreflang === true && ssrResults.en?.noHreflang === true,
    noJsonLd: ssrResults.es?.noJsonLd === true && ssrResults.en?.noJsonLd === true,
    noOg: ssrResults.es?.noOg === true && ssrResults.en?.noOg === true,
    noTwitter: ssrResults.es?.noTwitter === true && ssrResults.en?.noTwitter === true,
    xRobots: ssrResults.es?.xRobots ?? '',
    metaRobotsNoindex:
      ssrResults.es?.metaRobotsNoindex === true && ssrResults.en?.metaRobotsNoindex === true,
    htmlLang: {
      es: ssrResults.es?.htmlLang ?? '',
      en: ssrResults.en?.htmlLang ?? '',
    },
    heroHeading: {
      es: ssrResults.es?.heroHeading ?? '',
      en: ssrResults.en?.heroHeading ?? '',
    },
    counts: {
      es: {
        sections: ssrResults.es?.sections ?? 0,
        families: ssrResults.es?.families ?? 0,
        bundles: ssrResults.es?.bundles ?? 0,
      },
      en: {
        sections: ssrResults.en?.sections ?? 0,
        families: ssrResults.en?.families ?? 0,
        bundles: ssrResults.en?.bundles ?? 0,
      },
    },
    notFound: notFoundStatuses,
  };

  writeEvidence('ssr-hydration-evidence.json', {
    contractId: 'MC18-SSR-HYDRATION-EVIDENCE',
    ...EVIDENCE_ENVELOPE,
    description:
      'SSR/no-JavaScript contract and Chromium hydration verification for the internal MC-18 landing preview (/marea and /en/marea).',
    generationMethod: [...GENERATION_COMMANDS],
    measuredAt: measuredAt(),
    browser: { name: 'Chromium', version: browserVersion },
    platform: process.platform,
    knownLimitations: [
      'SSR is verified on the isolated loopback preview only; no public host serves these routes.',
      'Hydration is verified in Chromium (Playwright Desktop Chrome) only; Safari and Firefox were not executed.',
      'The preview build is a development configuration (optimization disabled); production bundle behaviour is out of scope for this dataset.',
      'noindex/X-Robots-Tag are defence in depth, not access control: the server binds to 127.0.0.1.',
    ],
    data: {
      previewOrigin: 'http://127.0.0.1:4302',
      ssr: ssrData,
      hydration: {
        status: hydrationOverall,
        consoleErrors:
          (hydrationResults.es?.consoleErrors ?? 0) + (hydrationResults.en?.consoleErrors ?? 0),
        duplicateDom: hydrationResults.es?.duplicateDom ?? true,
        mismatch: hydrationResults.es?.mismatch ?? true,
        perLocale: hydrationResults,
        keyboardAfterHydration:
          hydrationResults.es?.keyboardAfterHydration === true &&
          hydrationResults.en?.keyboardAfterHydration === true,
        heroHeadingStable:
          hydrationResults.es?.heroHeadingStable === true &&
          hydrationResults.en?.heroHeadingStable === true,
      },
      evidencePaths: {
        results: toPosix('test-results/landing/results.json'),
        artifacts: toPosix('test-results/landing/artifacts'),
      },
    },
  });
});
