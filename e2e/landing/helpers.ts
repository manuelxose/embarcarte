import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Shared harness for the MC-18 internal landing E2E (e2e/landing).
 *
 * Scope: the isolated SSR preview served on http://127.0.0.1:4302 by
 * `node dist/marea-landing-preview/server/server.mjs`. This suite never touches
 * the public application; production isolation is measured separately.
 *
 * Evidence policy: every number written to docs/marea/landing/data comes from a
 * command executed in this working tree. Automated axe results are rule
 * evidence, never a WCAG conformance claim.
 */

export const PREVIEW_ORIGIN = 'http://127.0.0.1:4302';
export const RESULTS_DIR = join(process.cwd(), 'test-results', 'landing');
export const EVIDENCE_DIR = join(process.cwd(), 'docs', 'marea', 'landing', 'data');
export const COMMITTED_SCREENSHOT_DIR = join(
  process.cwd(),
  'e2e',
  'landing',
  'visual.spec.ts-snapshots',
  'committed',
);

export const LOCALES = [
  { key: 'es', path: '/marea', documentLang: 'es-ES', label: 'ES' },
  { key: 'en', path: '/en/marea', documentLang: 'en', label: 'EN' },
] as const;

export type LandingLocale = (typeof LOCALES)[number];

/** Frozen in-page anchors, in document order. `hero` is the h1 section. */
export const SECTION_IDS = [
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
] as const;

/** Frozen host markers (`data-marea-landing-section`), in document order. */
export const SECTION_HOSTS = [
  'hero',
  'ecosystem',
  'families',
  'architecture',
  'bundles',
  'software-hardware',
  'professionals',
  'documentation',
  'availability',
  'closing',
] as const;

export const FAMILY_IDS = [
  'NAV',
  'HUB',
  'AIS',
  'PILOT',
  'SENSE',
  'WATCH',
  'DISPLAY',
  'WEATHER',
  'FLEET',
] as const;

export const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'] as const;

/** Headings transcribed from the built preview on 2026-11-03 (ES/EN authoring). */
export const HERO_HEADING = {
  es: 'Nueve familias, una arquitectura marina compartida: definida por partes, pendiente de verificación.',
  en: 'Nine families, one shared marine architecture: defined in parts, still to be verified.',
} as const;

/** Material limitation spot-checks (ES), each rendered inside its family card. */
export const FAMILY_LIMITATION_SPOT_CHECKS = {
  NAV: 'Las cartas náuticas no están licenciadas ni se representan como incluidas.',
  AIS: 'La recepción AIS no transmite, no evita colisiones y no sustituye la vigilancia: no todos los buques emiten AIS.',
  WATCH:
    'Las alertas pueden retrasarse o perderse; no hay monitorización remota continua garantizada ni servicio de emergencia.',
} as const;

/** Responsive widths required by MC-18. Height 844 for phones, 900 otherwise. */
export const VIEWPORT_WIDTHS = [320, 360, 390, 768, 1024, 1440] as const;

/** Widths that receive committed screenshots. */
export const SCREENSHOT_WIDTHS = [320, 390, 768, 1440] as const;

export function viewportHeight(width: number): number {
  return width <= 390 ? 844 : 900;
}

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] as const;

export const EVIDENCE_ENVELOPE = {
  contractVersion: '1.0.0' as const,
  milestone: 'MC-18' as const,
  status: 'INTERNAL_PROPOSED' as const,
  owner: 'MC-18 QA' as const,
  publicationStatus: 'NOT_AUTHORIZED' as const,
  relevantCommit: 'docs/marea/landing/MC18-FINAL-DELIVERY-RECORD.md (D23)',
};

export const GENERATION_COMMANDS = [
  'npm run build:landing:preview',
  'npx playwright test -c playwright.landing.config.ts',
] as const;

/** Navigates to a locale and waits for SSR + hydration to settle. */
export async function gotoLanding(
  page: Page,
  locale: LandingLocale,
): Promise<{ status: number; url: string }> {
  const response = await page.goto(`${PREVIEW_ORIGIN}${locale.path}`, { waitUntil: 'load' });
  expect(response, `No response for ${locale.path}`).not.toBeNull();
  expect(response!.status(), `HTTP status for ${locale.path}`).toBe(200);
  await expect(page.locator('[data-marea-landing]')).toBeVisible();
  await waitForHydration(page);
  return { status: response!.status(), url: page.url() };
}

/** Waits until Angular removed the `ngh` hydration markers and fonts are ready. */
export async function waitForHydration(page: Page): Promise<void> {
  try {
    await page.waitForFunction(() => document.querySelector('[ngh]') === null, null, {
      timeout: 30_000,
    });
  } catch {
    throw new Error(
      [
        'Hydration did not complete: `[ngh]` markers are still present after 30s.',
        'On /en/marea this usually means the document base href is missing and assets 404.',
      ].join('\n'),
    );
  }
  await page.evaluate(async () => {
    await document.fonts.ready;
    return true;
  });
  await waitForAnimationsSettled(page);
  await waitForPaint(page);
}

/**
 * Waits for finite CSS entrance animations to finish.
 *
 * Axe must evaluate the settled UI: measuring contrast while a panel is still
 * animating from opacity 0 produces transient, non-representative results.
 * Infinite animations are ignored; the timeout is a safety net.
 */
export async function waitForAnimationsSettled(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () =>
        document.getAnimations().every((animation) => {
          const timing = animation.effect?.getComputedTiming?.();
          const endTime = timing?.endTime;
          if (typeof endTime !== 'number' || endTime === Infinity) return true;
          return animation.playState !== 'running';
        }),
      null,
      { timeout: 5_000 },
    )
    .catch(async () => {
      await page.waitForTimeout(800);
    });
}

/** Waits two animation frames so geometry and styles are settled. */
export async function waitForPaint(page: Page): Promise<void> {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }),
  );
}

/** Asserts no page-level horizontal overflow (scrollWidth <= clientWidth + 1). */
export async function expectNoHorizontalOverflow(page: Page, context: string): Promise<void> {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  expect(
    metrics.scrollWidth,
    `${context}: horizontal overflow (documentElement.scrollWidth=${metrics.scrollWidth}px, clientWidth=${metrics.clientWidth}px, body.scrollWidth=${metrics.bodyScrollWidth}px)`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

/** Runs axe with the WCAG A/AA tag set. Region is not disabled: a <main> exists. */
export async function collectAxe(page: Page): Promise<AxeResults> {
  return new AxeBuilder({ page }).withTags([...AXE_TAGS]).analyze();
}

/** Counts axe violations by impact. */
export function impactCounts(results: AxeResults): {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
} {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const violation of results.violations) {
    const impact = violation.impact ?? 'minor';
    if (
      impact === 'critical' ||
      impact === 'serious' ||
      impact === 'moderate' ||
      impact === 'minor'
    ) {
      counts[impact] += violation.nodes.length;
    }
  }
  return counts;
}

/** Formats violations into actionable lines. */
export function describeViolations(results: AxeResults): string[] {
  return results.violations.map((violation) => {
    const firstTargets = violation.nodes
      .slice(0, 5)
      .map((node) => node.target.join(' '))
      .join(' | ');
    const suffix = violation.nodes.length > 5 ? ' | …' : '';
    return `${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help} → ${violation.nodes.length} node(s): ${firstTargets}${suffix}`;
  });
}

/** Writes pretty JSON to an arbitrary directory, creating it when needed. */
export function writeJsonFile(directory: string, fileName: string, value: unknown): string {
  mkdirSync(directory, { recursive: true });
  const filePath = join(directory, fileName);
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  return filePath;
}

/** Writes an evidence dataset into docs/marea/landing/data. */
export function writeEvidence(fileName: string, payload: unknown): string {
  return writeJsonFile(EVIDENCE_DIR, fileName, payload);
}

/** ISO timestamp for the measurements. */
export function measuredAt(): string {
  return new Date().toISOString();
}

/** SHA-256 of a buffer. */
export function sha256(buffer: Buffer | Uint8Array): string {
  return createHash('sha256').update(buffer).digest('hex');
}

export interface ScreenshotCapture {
  readonly locale: string;
  readonly width: number;
  readonly height: number;
  readonly deviceScaleFactor: number;
  readonly browser: string;
  readonly platform: string;
  readonly mode: 'web-light';
  readonly path: string;
  readonly bytes: number;
  readonly sha256: string;
  readonly secondCaptureSha256: string;
  readonly byteIdentical: boolean;
}

/**
 * Captures the landing into a committed folder and proves repeatability.
 *
 * A second capture of the same viewport is compared byte-for-byte; instability
 * is recorded, never hidden. Screenshots are full-page with animations disabled
 * and caret hidden.
 */
export async function captureCommittedScreenshot(
  page: Page,
  locale: LandingLocale,
  width: number,
  height: number,
  browserVersion: string,
): Promise<ScreenshotCapture> {
  await page.setViewportSize({ width, height });
  await gotoLanding(page, locale);
  return captureCommittedScreenshotHere(page, locale, width, height, browserVersion);
}

/** Captures a screenshot of the already-loaded landing page (no navigation). */
export async function captureCommittedScreenshotHere(
  page: Page,
  locale: LandingLocale,
  width: number,
  height: number,
  browserVersion: string,
): Promise<ScreenshotCapture> {
  mkdirSync(COMMITTED_SCREENSHOT_DIR, { recursive: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await waitForPaint(page);

  const options = {
    fullPage: true,
    animations: 'disabled' as const,
    caret: 'hide' as const,
    scale: 'css' as const,
  };
  const first = await page.screenshot(options);
  await page.waitForTimeout(250);
  await waitForPaint(page);
  const second = await page.screenshot(options);

  const fileName = `landing-${locale.key}-${width}x${height}.png`;
  const filePath = join(COMMITTED_SCREENSHOT_DIR, fileName);
  writeFileSync(filePath, first);

  return {
    locale: locale.key,
    width,
    height,
    deviceScaleFactor: 1,
    browser: browserVersion,
    platform: process.platform,
    mode: 'web-light',
    path: toPosix(relative(process.cwd(), filePath)),
    bytes: first.byteLength,
    sha256: sha256(first),
    secondCaptureSha256: sha256(second),
    byteIdentical: sha256(first) === sha256(second),
  };
}

/** Workspace-relative POSIX path. */
export function toPosix(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

/** Normalizes whitespace for cross-source text comparisons. */
export function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Collects console messages and page errors into a flat list. */
export function collectConsoleMessages(page: Page): { type: string; text: string }[] {
  const messages: { type: string; text: string }[] = [];
  page.on('console', (message) => {
    messages.push({ type: message.type(), text: message.text() });
  });
  page.on('pageerror', (error) => {
    messages.push({ type: 'pageerror', text: error.message });
  });
  return messages;
}
