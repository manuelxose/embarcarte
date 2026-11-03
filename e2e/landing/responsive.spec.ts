import { expect, test } from '@playwright/test';
import {
  EVIDENCE_ENVELOPE,
  GENERATION_COMMANDS,
  LOCALES,
  SCREENSHOT_WIDTHS,
  VIEWPORT_WIDTHS,
  captureCommittedScreenshotHere,
  expectNoHorizontalOverflow,
  gotoLanding,
  measuredAt,
  toPosix,
  viewportHeight,
  waitForPaint,
  writeEvidence,
} from './helpers';
import type { ScreenshotCapture } from './helpers';

/**
 * MC-18 responsive contract.
 *
 * Six real widths (320 → 1440) in both locales: no page-level horizontal
 * overflow, banner and hero visible, nine family and six bundle cards present,
 * material limitations not hidden or clipped at 320px, and the architecture
 * diagram confined to a focusable, labelled scroll region that does not push the
 * page wider than the viewport. Committed screenshots at 320/390/768/1440 are
 * hashed and repeat-captured; any byte difference is recorded in
 * summary.unstableCaptures instead of being hidden.
 */

const SOURCE_COMMIT_POLICY =
  'No QA commit; evidence generated from the working tree. relevantCommit = docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md (D23).';
const GENERATION_PROCEDURE =
  'npm run build:landing:preview; npx playwright test -c playwright.landing.config.ts; page.screenshot({fullPage:true, animations:"disabled", caret:"hide", scale:"css"}), deviceScaleFactor 1.';

interface ResponsiveRun {
  width: number;
  height: number;
  locale: string;
  scrollWidth: number;
  clientWidth: number;
  bodyScrollWidth: number;
  overflow: boolean;
  bannerVisible: boolean;
  families: number;
  bundles: number;
  heroHeadingVisible: boolean;
  limitationsVisible: boolean;
  limitationsClipped: number;
  architecture: {
    exists: boolean;
    tabindex: string | null;
    ariaLabelLength: number;
    overflowX: string;
    scrollWidth: number;
    clientWidth: number;
    scrollable: boolean;
    withinViewport: boolean;
  };
  screenshot: string | null;
  sha256: string | null;
  screenshotBytes: number | null;
  byteIdentical: boolean | null;
}

const runs: ResponsiveRun[] = [];
const captures: ScreenshotCapture[] = [];
const unstableCaptures: {
  locale: string;
  width: number;
  height: number;
  sha256: string;
  secondCaptureSha256: string;
}[] = [];
const failures: string[] = [];
let browserVersion = '';

for (const locale of LOCALES) {
  for (const width of VIEWPORT_WIDTHS) {
    test(`responsive ${locale.label} ${width}px: no overflow and frozen regions intact`, async ({
      page,
      browser,
    }) => {
      browserVersion = browser.version();
      const height = viewportHeight(width);
      await page.setViewportSize({ width, height });
      await gotoLanding(page, locale);
      await waitForPaint(page);

      const metrics = await page.evaluate(() => {
        const isVisible = (element: Element | null): boolean => {
          if (!element) return false;
          const style = getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') return false;
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        };
        const limits = Array.from(document.querySelectorAll('[data-landing-family] .limits'));
        const architecture = document.querySelector(
          '[data-marea-landing-section="architecture"] [role="group"]',
        ) as HTMLElement | null;
        let architectureScrollable = false;
        if (architecture) {
          const style = getComputedStyle(architecture);
          if (style.overflowX === 'auto' || style.overflowX === 'scroll') {
            if (architecture.scrollWidth > architecture.clientWidth + 1) {
              const original = architecture.scrollLeft;
              architecture.scrollLeft = 10_000;
              architectureScrollable = architecture.scrollLeft > 0;
              architecture.scrollLeft = original;
            }
          }
        }
        const architectureRect = architecture?.getBoundingClientRect() ?? null;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          bodyScrollWidth: document.body.scrollWidth,
          bannerVisible: isVisible(document.querySelector('[data-landing-internal-banner]')),
          families: document.querySelectorAll('[data-landing-family]').length,
          bundles: document.querySelectorAll('[data-landing-bundle]').length,
          heroHeadingVisible: isVisible(document.querySelector('h1')),
          limitationsVisible: limits.length === 9 && limits.every(isVisible),
          limitationsClipped: limits.filter(
            (element) => element.scrollWidth > element.clientWidth + 1,
          ).length,
          architecture: {
            exists: architecture !== null,
            tabindex: architecture?.getAttribute('tabindex') ?? null,
            ariaLabelLength: (architecture?.getAttribute('aria-label') ?? '').trim().length,
            overflowX: architecture ? getComputedStyle(architecture).overflowX : '',
            scrollWidth: architecture?.scrollWidth ?? 0,
            clientWidth: architecture?.clientWidth ?? 0,
            scrollable: architectureScrollable,
            withinViewport:
              architectureRect !== null &&
              architectureRect.left >= -1 &&
              architectureRect.right <= window.innerWidth + 1,
          },
        };
      });

      const context = `${locale.key} ${width}px`;
      let overflow = false;
      try {
        await expectNoHorizontalOverflow(page, context);
      } catch (error) {
        overflow = true;
        failures.push(context);
        throw error;
      }

      expect(metrics.bannerVisible, `${context}: internal banner must be visible`).toBe(true);
      expect(metrics.families, `${context}: nine family cards`).toBe(9);
      expect(metrics.bundles, `${context}: six bundle cards`).toBe(6);
      expect(metrics.heroHeadingVisible, `${context}: hero h1 must be visible`).toBe(true);
      expect(metrics.limitationsVisible, `${context}: material limitations must be visible`).toBe(
        true,
      );
      expect(metrics.limitationsClipped, `${context}: limitations clipped horizontally`).toBe(0);

      expect(metrics.architecture.exists, `${context}: architecture scroll region`).toBe(true);
      expect(metrics.architecture.tabindex, `${context}: scroll region tabindex`).toBe('0');
      expect(
        metrics.architecture.ariaLabelLength,
        `${context}: scroll region must be named`,
      ).toBeGreaterThan(0);
      expect(['auto', 'scroll'], `${context}: overflow-x`).toContain(
        metrics.architecture.overflowX,
      );
      expect(
        metrics.architecture.withinViewport,
        `${context}: scroll region wider than viewport`,
      ).toBe(true);
      if (metrics.architecture.scrollWidth > metrics.architecture.clientWidth + 1) {
        expect(
          metrics.architecture.scrollable,
          `${context}: declared overflow not scrollable`,
        ).toBe(true);
      }

      const capture = (SCREENSHOT_WIDTHS as readonly number[]).includes(width)
        ? await captureCommittedScreenshotHere(page, locale, width, height, browserVersion)
        : null;
      if (capture) {
        captures.push(capture);
        if (!capture.byteIdentical) {
          unstableCaptures.push({
            locale: locale.key,
            width,
            height,
            sha256: capture.sha256,
            secondCaptureSha256: capture.secondCaptureSha256,
          });
        }
      }

      runs.push({
        width,
        height,
        locale: locale.key,
        scrollWidth: metrics.scrollWidth,
        clientWidth: metrics.clientWidth,
        bodyScrollWidth: metrics.bodyScrollWidth,
        overflow,
        bannerVisible: metrics.bannerVisible,
        families: metrics.families,
        bundles: metrics.bundles,
        heroHeadingVisible: metrics.heroHeadingVisible,
        limitationsVisible: metrics.limitationsVisible,
        limitationsClipped: metrics.limitationsClipped,
        architecture: metrics.architecture,
        screenshot: capture?.path ?? null,
        sha256: capture?.sha256 ?? null,
        screenshotBytes: capture?.bytes ?? null,
        byteIdentical: capture?.byteIdentical ?? null,
      });
    });
  }
}

test.afterAll(() => {
  writeEvidence('responsive-evidence.json', {
    contractId: 'MC18-RESPONSIVE-EVIDENCE',
    ...EVIDENCE_ENVELOPE,
    description:
      'Responsive verification of the internal MC-18 landing at 320/360/390/768/1024/1440 in ES and EN, with committed, hashed screenshots at 320/390/768/1440 and repeat-capture stability records.',
    generationMethod: [...GENERATION_COMMANDS],
    measuredAt: measuredAt(),
    browser: { name: 'Chromium', version: browserVersion },
    platform: process.platform,
    deviceScaleFactor: 1,
    mode: 'web-light',
    sourceCommitPolicy: SOURCE_COMMIT_POLICY,
    generationProcedure: GENERATION_PROCEDURE,
    knownLimitations: [
      'Chromium only; no Firefox/Safari responsive verification was executed.',
      'Screenshots are captured at deviceScaleFactor 1 on the isolated loopback preview (development build, no minification).',
      'Screenshots were generated and hashed by the QA suite; they were not visually reviewed by a second human reviewer.',
      'No real mobile hardware, touch input, virtual keyboard or OS text scaling was tested.',
      'The full-page screenshots capture the whole document; sticky/fixed overlays are not present in this layout.',
      'Repeated full-page captures are compared byte-for-byte. Any non-identical repeat is recorded in summary.unstableCaptures (locale, viewport and both SHA-256 values) instead of being hidden; the committed image is the first capture.',
    ],
    data: {
      viewports: runs.map((run) => ({
        width: run.width,
        height: run.height,
        locale: run.locale,
        scrollWidth: run.scrollWidth,
        clientWidth: run.clientWidth,
        bodyScrollWidth: run.bodyScrollWidth,
        overflow: run.overflow,
        bannerVisible: run.bannerVisible,
        families: run.families,
        bundles: run.bundles,
        heroHeadingVisible: run.heroHeadingVisible,
        limitationsVisible: run.limitationsVisible,
        limitationsClipped: run.limitationsClipped,
        architectureScrollRegion: run.architecture,
        screenshot: run.screenshot,
        sha256: run.sha256,
        screenshotBytes: run.screenshotBytes,
        byteIdentical: run.byteIdentical,
      })),
      summary: {
        overflowFailures: runs.filter((run) => run.overflow).length,
        runs: runs.length,
        screenshots: captures.length,
        unstableCaptures: unstableCaptures.length,
        unstableCaptureDetails: unstableCaptures,
      },
      screenshotsMetadata: {
        directory: toPosix('e2e/landing/visual.spec.ts-snapshots/committed'),
        deviceScaleFactor: 1,
        mode: 'web-light',
        browser: `Chromium ${browserVersion}`,
        platform: process.platform,
        sourceCommitPolicy: SOURCE_COMMIT_POLICY,
        generationProcedure: GENERATION_PROCEDURE,
      },
      evidencePaths: {
        results: toPosix('test-results/landing/results.json'),
        artifacts: toPosix('test-results/landing/artifacts'),
      },
    },
  });
});
