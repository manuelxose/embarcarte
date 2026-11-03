import { expect, test } from '@playwright/test';
import { LOCALES, RESULTS_DIR, measuredAt, toPosix, writeJsonFile } from './helpers';

/**
 * MC-18 lab measurements (local, single run, no field data).
 *
 * Records document counts, SSR HTML bytes, asset transfer bytes, layout-shift
 * entries during load and interaction timing for opening the mobile nav and
 * scrolling to the families section. No performance threshold is asserted: this
 * dataset is descriptive evidence, not a Core Web Vitals field claim.
 */

interface LocaleLabResult {
  locale: string;
  url: string;
  ssrHtmlBytes: number;
  domElements: number;
  domNodes: number;
  bodyTextLength: number;
  assets: {
    path: string;
    responseBodyBytes: number;
    contentEncoding: string | null;
    contentType: string | null;
    resourceTiming: {
      durationMs: number;
      transferSize: number;
      encodedBodySize: number;
      decodedBodySize: number;
    } | null;
  }[];
  navigationTiming: Record<string, number>;
  layoutShift: {
    cls: number;
    entryCount: number;
    maxShift: number;
    shifts: number[];
  };
  loadMs: number;
}

const localeResults: LocaleLabResult[] = [];
const interactionResults: {
  locale: string;
  viewport: string;
  openMobileNavMs: number;
  scrollToFamiliesMs: number;
}[] = [];
let browserVersion = '';

/** Registers a layout-shift observer before any page script runs. */
async function installLayoutShiftObserver(page: import('@playwright/test').Page): Promise<void> {
  await page.addInitScript(() => {
    const globalWindow = window as typeof window & {
      __qaLayoutShifts?: number[];
      __qaCls?: number;
    };
    globalWindow.__qaLayoutShifts = [];
    globalWindow.__qaCls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value?: number;
        hadRecentInput?: boolean;
      })[]) {
        if (entry.hadRecentInput) continue;
        const value = entry.value ?? 0;
        globalWindow.__qaLayoutShifts!.push(value);
        globalWindow.__qaCls = (globalWindow.__qaCls ?? 0) + value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
}

for (const locale of LOCALES) {
  test(`lab metrics ${locale.label}: SSR bytes, DOM counts, assets and CLS`, async ({ page }) => {
    browserVersion = page.context().browser()?.version() ?? '';
    await installLayoutShiftObserver(page);
    await page.setViewportSize({ width: 1440, height: 900 });

    const started = Date.now();
    const response = await page.goto(`${'http://127.0.0.1:4302'}${locale.path}`, {
      waitUntil: 'load',
    });
    expect(response, `no response for ${locale.path}`).not.toBeNull();
    expect(response!.status()).toBe(200);
    const html = await response!.text();
    const loadMs = Date.now() - started;

    await page.waitForFunction(() => document.querySelector('[ngh]') === null, null, {
      timeout: 30_000,
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      return true;
    });

    const documentMetrics = await page.evaluate(() => {
      let domNodes = 0;
      const walker = document.createTreeWalker(document, NodeFilter.SHOW_ALL);
      while (walker.nextNode()) domNodes += 1;
      const shifts = ((window as typeof window & { __qaLayoutShifts?: number[] })
        .__qaLayoutShifts ?? []) as number[];
      const cls = shifts.reduce((total, value) => total + value, 0);
      const navigation = performance.getEntriesByType('navigation')[0] as
        PerformanceNavigationTiming | undefined;
      const resourceEntries = performance
        .getEntriesByType('resource')
        .filter((entry) => /(?:^|\/)(styles\.css|main\.js)(?:\?|$)/.test(entry.name))
        .map((entry) => ({
          name: new URL(entry.name).pathname,
          durationMs: entry.duration,
          transferSize: (entry as PerformanceResourceTiming).transferSize,
          encodedBodySize: (entry as PerformanceResourceTiming).encodedBodySize,
          decodedBodySize: (entry as PerformanceResourceTiming).decodedBodySize,
        }));
      return {
        domElements: document.getElementsByTagName('*').length,
        domNodes,
        bodyTextLength: document.body.innerText.length,
        cls,
        shifts,
        maxShift: shifts.length ? Math.max(...shifts) : 0,
        navigationTiming: {
          responseEndMs: navigation?.responseEnd ?? 0,
          domContentLoadedMs: navigation?.domContentLoadedEventEnd ?? 0,
          loadEventEndMs: navigation?.loadEventEnd ?? 0,
          ttfbMs: navigation?.responseStart ?? 0,
        },
        resourceEntries,
      };
    });

    const assets: LocaleLabResult['assets'] = [];
    for (const path of ['/styles.css', '/main.js']) {
      const assetResponse = await page.request.get(`${'http://127.0.0.1:4302'}${path}`);
      expect(assetResponse.status(), `asset ${path}`).toBe(200);
      const body = await assetResponse.body();
      assets.push({
        path,
        responseBodyBytes: body.byteLength,
        contentEncoding: assetResponse.headers()['content-encoding'] ?? null,
        contentType: assetResponse.headers()['content-type'] ?? null,
        resourceTiming:
          documentMetrics.resourceEntries.find((entry) => entry.name === path) ?? null,
      });
    }

    expect(documentMetrics.domElements).toBeGreaterThan(500);
    expect(documentMetrics.domNodes).toBeGreaterThanOrEqual(documentMetrics.domElements);
    expect(documentMetrics.bodyTextLength).toBeGreaterThan(10_000);
    expect(Buffer.byteLength(html, 'utf8')).toBeGreaterThan(50_000);
    expect(documentMetrics.cls).toBeGreaterThanOrEqual(0);

    localeResults.push({
      locale: locale.key,
      url: locale.path,
      ssrHtmlBytes: Buffer.byteLength(html, 'utf8'),
      domElements: documentMetrics.domElements,
      domNodes: documentMetrics.domNodes,
      bodyTextLength: documentMetrics.bodyTextLength,
      assets,
      navigationTiming: documentMetrics.navigationTiming,
      layoutShift: {
        cls: documentMetrics.cls,
        entryCount: documentMetrics.shifts.length,
        maxShift: documentMetrics.maxShift,
        shifts: documentMetrics.shifts,
      },
      loadMs,
    });
  });
}

for (const locale of LOCALES) {
  test(`interaction timing ${locale.label} at 390x844: open mobile nav and scroll to families`, async ({
    page,
  }) => {
    browserVersion = page.context().browser()?.version() ?? '';
    await page.setViewportSize({ width: 390, height: 844 });

    const response = await page.goto(`${'http://127.0.0.1:4302'}${locale.path}`, {
      waitUntil: 'load',
    });
    expect(response?.status()).toBe(200);
    await page.waitForFunction(() => document.querySelector('[ngh]') === null, null, {
      timeout: 30_000,
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      return true;
    });

    // Measure in-page: click handler + two animation frames.
    const openMobileNavMs = await page.evaluate(async () => {
      const toggle = document.querySelector('marea-responsive-nav button');
      if (!toggle) return -1;
      const started = performance.now();
      (toggle as HTMLButtonElement).click();
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      return performance.now() - started;
    });
    expect(openMobileNavMs).toBeGreaterThanOrEqual(0);

    const navListVisible = await page.locator('marea-responsive-nav .list').isVisible();
    expect(navListVisible, 'mobile nav opened before measuring scroll').toBe(true);

    const scrollToFamiliesMs = await page.evaluate(async () => {
      const target = document.getElementById('familias');
      if (!target) return -1;
      const started = performance.now();
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      );
      return performance.now() - started;
    });
    expect(scrollToFamiliesMs).toBeGreaterThanOrEqual(0);

    const familiesTopAfterScroll = await page.evaluate(() => {
      const target = document.getElementById('familias');
      return target ? Math.round(target.getBoundingClientRect().top) : null;
    });
    expect(familiesTopAfterScroll).not.toBeNull();

    interactionResults.push({
      locale: locale.key,
      viewport: '390x844',
      openMobileNavMs,
      scrollToFamiliesMs,
    });
  });
}

test.afterAll(() => {
  writeJsonFile(RESULTS_DIR, 'performance-browser.json', {
    measuredAt: measuredAt(),
    browser: { name: 'Chromium', version: browserVersion },
    platform: process.platform,
    protocol: {
      mode: 'lab',
      runs: 1,
      throttling: 'none',
      fieldData: false,
      notes: [
        'Single local run, loopback server, no CPU/network throttling.',
        'Asset transfer bytes are HTTP response body bytes from the loopback preview server (no compression configured).',
        'Interaction timings are measured in-page with two animation-frame waits; they include frame latency and are not a benchmark.',
      ],
    },
    locales: localeResults,
    interaction: interactionResults,
    evidencePath: toPosix('test-results/landing/performance-browser.json'),
  });
});
