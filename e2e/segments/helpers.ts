import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, type APIRequestContext } from '@playwright/test';
import type { AxeResults } from 'axe-core';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { SEGMENT_CONTENT } from '../../src/app/marea-segments/content';
import {
  SEGMENT_IDENTITIES,
  SEGMENT_IDS,
  segmentPreviewHref,
} from '../../src/app/marea-segments/models/segment-identity';

/**
 * Shared harness for the MC-19 audience-page E2E.
 *
 * Expected paths, headings and section markers are derived from the content
 * source and the identity model, not retyped, so a content change cannot leave
 * a passing test behind. Every number written as evidence comes from a command
 * executed in this working tree.
 */

export const PREVIEW_ORIGIN = 'http://127.0.0.1:4302';
export const EVIDENCE_DIR = join(process.cwd(), 'docs', 'marea', 'segments', 'evidence');

export const LOCALES = ['es', 'en'] as const;
export type SegmentLocale = (typeof LOCALES)[number];

export const SEGMENT_CONTENT_IDS = Object.keys(SEGMENT_CONTENT.segments) as string[];

export const SECTION_HOSTS = [
  'hero',
  'scope',
  'families',
  'capabilities',
  'ecosystem',
  'readiness',
  'documentation',
  'closing',
] as const;

export interface SegmentPageUnderTest {
  readonly segmentId: (typeof SEGMENT_IDS)[number];
  readonly locale: SegmentLocale;
  readonly path: string;
  readonly heading: string;
}

export const PAGES: readonly SegmentPageUnderTest[] = SEGMENT_IDS.flatMap((segmentId) =>
  LOCALES.map((locale) => ({
    segmentId,
    locale,
    path: segmentPreviewHref(segmentId, locale),
    heading: SEGMENT_CONTENT.segments[segmentId].hero.heading.text[locale],
  })),
);

export const IDENTITY_LIST = SEGMENT_IDS.map((segmentId) => SEGMENT_IDENTITIES[segmentId]);

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] as const;

export const VIEWPORT_WIDTHS = [320, 390, 768, 1440] as const;

export function viewportHeight(width: number): number {
  return width <= 390 ? 844 : 900;
}

/** Navigates to one audience page and waits until hydration has settled. */
export async function gotoPage(page: Page, target: SegmentPageUnderTest): Promise<number> {
  const response = await page.goto(`${PREVIEW_ORIGIN}${target.path}`, { waitUntil: 'load' });
  expect(response, `No response for ${target.path}`).not.toBeNull();
  await expect(page.locator('[data-marea-segment]')).toBeVisible();
  await waitForHydration(page);
  return response!.status();
}

/** Waits until Angular removed the `ngh` hydration markers and fonts are ready. */
export async function waitForHydration(page: Page): Promise<void> {
  await page.waitForFunction(() => document.querySelector('[ngh]') === null, null, {
    timeout: 30_000,
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    return true;
  });
}

/** Asserts no page-level horizontal overflow. */
export async function expectNoHorizontalOverflow(page: Page, context: string): Promise<void> {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(
    metrics.scrollWidth,
    `${context}: horizontal overflow (${metrics.scrollWidth}px > ${metrics.clientWidth}px)`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

export async function collectAxe(page: Page): Promise<AxeResults> {
  return new AxeBuilder({ page }).withTags([...AXE_TAGS]).analyze();
}

export function summarizeAxe(results: AxeResults): {
  violations: number;
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  details: string[];
} {
  const counts = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  for (const violation of results.violations) {
    const impact = violation.impact ?? 'minor';
    if (impact in counts) counts[impact as keyof typeof counts] += violation.nodes.length;
  }
  return {
    violations: results.violations.length,
    ...counts,
    details: results.violations.map(
      (violation) =>
        `${violation.id} (${violation.impact ?? 'unknown'}): ${violation.help} → ${violation.nodes.length} node(s)`,
    ),
  };
}

/** Fetches raw SSR HTML without executing JavaScript. */
export async function rawSsr(
  request: APIRequestContext,
  target: SegmentPageUnderTest,
): Promise<{ status: number; body: string; headers: Record<string, string> }> {
  const response = await request.get(`${PREVIEW_ORIGIN}${target.path}`, {
    headers: { accept: 'text/html' },
  });
  return {
    status: response.status(),
    body: await response.text(),
    headers: response.headers(),
  };
}

export function writeEvidence(fileName: string, payload: unknown): string {
  mkdirSync(EVIDENCE_DIR, { recursive: true });
  const filePath = join(EVIDENCE_DIR, fileName);
  writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  return filePath;
}

export function measuredAt(): string {
  return new Date().toISOString();
}
