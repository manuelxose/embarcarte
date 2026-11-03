import { expect, test } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import {
  AXE_TAGS,
  EVIDENCE_ENVELOPE,
  GENERATION_COMMANDS,
  LOCALES,
  collectAxe,
  describeViolations,
  gotoLanding,
  impactCounts,
  measuredAt,
  toPosix,
  writeEvidence,
} from './helpers';

/**
 * MC-18 automated accessibility audit (axe-core) and reduced-motion check.
 *
 * Automated rules only: this is NOT a WCAG 2.2 AA conformance claim. Serious and
 * critical impacts fail the suite; moderate/minor impacts are recorded. Manual
 * assistive-technology review, contrast validation across real displays and
 * screen-reader testing are out of scope and listed as limitations.
 */

interface AxeRunRecord {
  readonly locale: string;
  readonly viewport: string;
  readonly url: string;
  readonly violations: { critical: number; serious: number; moderate: number; minor: number };
  readonly passes: number;
  readonly incomplete: number;
  readonly inapplicable: number;
  readonly violationRules: string[];
  readonly incompleteRules: string[];
  readonly engine: string;
}

const axeRuns: AxeRunRecord[] = [];
const blockingViolations: string[] = [];

const reducedMotionResults: Record<string, unknown>[] = [];

let browserVersion = '';

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 390, height: 844 },
] as const;

for (const locale of LOCALES) {
  for (const viewport of VIEWPORTS) {
    test(`axe ${locale.label} ${viewport.width}x${viewport.height}: no serious or critical violations`, async ({
      page,
      browser,
    }) => {
      browserVersion = browser.version();
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLanding(page, locale);
      const results: AxeResults = await collectAxe(page);
      const counts = impactCounts(results);

      axeRuns.push({
        locale: locale.key,
        viewport: `${viewport.width}x${viewport.height}`,
        url: `${locale.path}`,
        violations: counts,
        passes: results.passes.length,
        incomplete: results.incomplete.length,
        inapplicable: results.inapplicable.length,
        violationRules: results.violations.map((violation) => violation.id),
        incompleteRules: results.incomplete.map((rule) => rule.id),
        engine: results.testEngine?.version ?? 'unknown',
      });

      for (const violation of results.violations) {
        if (violation.impact === 'critical' || violation.impact === 'serious') {
          blockingViolations.push(
            `[${locale.key} ${viewport.width}x${viewport.height}] ${violation.id}`,
          );
        }
      }

      const blocking = results.violations.filter(
        (violation) => violation.impact === 'critical' || violation.impact === 'serious',
      );
      expect(
        blocking.map((violation) => `${violation.id} (${violation.impact}): ${violation.help}`),
        `Serious/critical axe violations:\n${describeViolations(results).join('\n')}`,
      ).toEqual([]);
    });
  }
}

test('prefers-reduced-motion: reduce removes long-running CSS animation/transition and keeps the page readable', async ({
  page,
}) => {
  for (const locale of LOCALES) {
    for (const viewport of VIEWPORTS) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await gotoLanding(page, locale);

      const report = await page.evaluate(() => {
        const toMilliseconds = (value: string): number[] =>
          value
            .split(',')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
              const numeric = Number.parseFloat(part);
              if (Number.isNaN(numeric)) return 0;
              return part.endsWith('ms') ? numeric : numeric * 1000;
            });

        const controls = Array.from(
          document.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]'),
        ).map((element) => {
          const style = getComputedStyle(element);
          const animation = toMilliseconds(style.animationDuration);
          const transition = toMilliseconds(style.transitionDuration);
          return {
            tag: element.tagName,
            text: (element.getAttribute('aria-label') ?? element.textContent ?? '')
              .replace(/\s+/g, ' ')
              .trim()
              .slice(0, 60),
            animationName: style.animationName,
            animationMaxMs: animation.length ? Math.max(...animation) : 0,
            transitionMaxMs: transition.length ? Math.max(...transition) : 0,
          };
        });

        const longRunning = controls.filter(
          (control) => control.animationMaxMs > 100 || control.transitionMaxMs > 100,
        );

        const scrollBehaviours = Array.from(
          document.querySelectorAll<HTMLElement>('html, main, section, [data-marea-landing]'),
        ).map((element) => getComputedStyle(element).scrollBehavior);

        return {
          controlCount: controls.length,
          longRunning,
          maxAnimationMs: controls.length
            ? Math.max(...controls.map((control) => control.animationMaxMs))
            : 0,
          maxTransitionMs: controls.length
            ? Math.max(...controls.map((control) => control.transitionMaxMs))
            : 0,
          scrollBehaviours: Array.from(new Set(scrollBehaviours)),
          bodyTextLength: document.body.innerText.length,
          h1Count: document.querySelectorAll('h1').length,
          bannerVisible: (() => {
            const element = document.querySelector('[data-landing-internal-banner]');
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })(),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      reducedMotionResults.push({
        locale: locale.key,
        viewport: `${viewport.width}x${viewport.height}`,
        ...report,
      });

      expect(
        report.longRunning,
        `long-running animation/transition under reduced motion: ${JSON.stringify(report.longRunning)}`,
      ).toEqual([]);
      expect(report.scrollBehaviours, 'smooth scrolling under reduced motion').not.toContain(
        'smooth',
      );
      expect(report.bodyTextLength, 'page readable under reduced motion').toBeGreaterThan(10_000);
      expect(report.h1Count).toBe(1);
      expect(report.bannerVisible, 'internal banner visible under reduced motion').toBe(true);
      expect(report.scrollWidth).toBeLessThanOrEqual(report.clientWidth + 1);
    }
  }
});

test('no serious or critical automated violations in any run', async () => {
  expect(blockingViolations, `blocking axe violations: ${blockingViolations.join(', ')}`).toEqual(
    [],
  );
});

test.afterAll(() => {
  const summary = {
    critical: 0,
    serious: 0,
    moderate: 0,
    minor: 0,
  };
  for (const run of axeRuns) {
    summary.critical += run.violations.critical;
    summary.serious += run.violations.serious;
    summary.moderate += run.violations.moderate;
    summary.minor += run.violations.minor;
  }

  writeEvidence('accessibility-evidence.json', {
    contractId: 'MC18-ACCESSIBILITY-EVIDENCE',
    ...EVIDENCE_ENVELOPE,
    description:
      'Automated axe-core results (WCAG A/AA tag set) for the internal MC-18 landing at 1440x900 and 390x844 in ES and EN, plus a prefers-reduced-motion check. Automated rules only: no WCAG conformance claim.',
    generationMethod: [...GENERATION_COMMANDS],
    measuredAt: measuredAt(),
    browser: { name: 'Chromium', version: browserVersion },
    platform: process.platform,
    knownLimitations: [
      'Automated axe rules only; this is not a WCAG 2.2 AA conformance claim.',
      'No screen reader, switch device, magnifier or real assistive-technology session was executed.',
      'Chromium only; Firefox and Safari were not tested.',
      'Colour contrast is evaluated by axe against computed styles; real displays, glare and device colour profiles are out of scope.',
      'Inherited MC-17 design-system limitation (not an MC-18 defect): Escape closes the mobile nav only when focus is inside the list; Escape on the toggle itself does not close it.',
      'Axe incomplete checks are recorded but not resolved manually in this dataset.',
      'Axe runs after hydration and after finite CSS entrance animations settle; transient styles during the entrance animation are not evaluated.',
    ],
    data: {
      results: axeRuns,
      summary,
      engine: {
        name: 'axe-core',
        version: axeRuns[0]?.engine ?? 'unknown',
        integration: '@axe-core/playwright',
        tags: [...AXE_TAGS],
      },
      conformanceClaim:
        'NONE. Automated coverage is partial; manual WCAG 2.2 AA review remains required before any accessibility claim.',
      reducedMotion: reducedMotionResults,
      evidencePaths: {
        results: toPosix('test-results/landing/results.json'),
        artifacts: toPosix('test-results/landing/artifacts'),
      },
    },
  });
});
