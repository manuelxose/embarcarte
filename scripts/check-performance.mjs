import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { chromium } from 'playwright';

/**
 * Medición de laboratorio con Chromium real.
 *
 * No es campo (CrUX): usa CPU y red simuladas de forma explícita. El objetivo es
 * comparar antes/después en el mismo entorno y detectar regresiones materiales.
 */
const port = Number(process.env['PERF_PORT'] ?? 4311);
const base = `http://127.0.0.1:${port}`;
const artifacts = join(process.cwd(), 'artifacts/performance');
await mkdir(artifacts, { recursive: true });

const server = spawn(process.execPath, [join(process.cwd(), 'scripts/e2e-server.mjs')], {
  env: { ...process.env, E2E_PORT: String(port) },
  stdio: ['ignore', 'inherit', 'inherit'],
});

const stop = async () => {
  if (server.exitCode === null) {
    const exited = new Promise((resolve) => server.once('exit', resolve));
    server.kill();
    await exited;
  }
};
process.on('SIGINT', async () => {
  await stop();
  process.exit(0);
});

async function waitReady() {
  for (let i = 0; i < 150; i++) {
    try {
      const response = await fetch(`${base}/healthz`);
      if (response.ok) return;
    } catch {}
    await sleep(200);
  }
  throw new Error('performance server did not become ready');
}

const observerScript = () => {
  window.__perf = { lcp: 0, lcpElement: '', cls: 0, longTasks: [], events: [] };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      window.__perf.lcp = entry.startTime;
      const element = entry.element;
      window.__perf.lcpElement = element
        ? `${element.tagName.toLowerCase()}.${element.className || ''}`
        : '';
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries())
      if (!entry.hadRecentInput) window.__perf.cls += entry.value;
  }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__perf.longTasks.push(entry.duration);
  }).observe({ type: 'longtask', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.interactionId)
        window.__perf.events.push({
          name: entry.name,
          duration: entry.duration,
          id: entry.interactionId,
        });
    }
  }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
};

async function measure(browser, { path, mobile }) {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    userAgent: mobile
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Mobile Safari/537.36'
      : undefined,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
  if (mobile) {
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      connectionType: 'cellular3g',
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  await page.addInitScript(observerScript);

  const started = Date.now();
  const response = await page.goto(base + path, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle').catch(() => {});
  await sleep(2_500);
  const wall = Date.now() - started;

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const paints = Object.fromEntries(
      performance.getEntriesByType('paint').map((p) => [p.name, p.startTime]),
    );
    const resources = performance.getEntriesByType('resource');
    const sum = (filter) =>
      resources.filter(filter).reduce((total, resource) => total + (resource.transferSize || 0), 0);
    return {
      ttfb_ms: nav?.responseStart ?? null,
      dom_content_loaded_ms: nav?.domContentLoadedEventEnd ?? null,
      load_ms: nav?.loadEventEnd ?? null,
      fcp_ms: paints['first-contentful-paint'] ?? null,
      lcp_ms: window.__perf.lcp,
      lcp_element: window.__perf.lcpElement,
      cls: window.__perf.cls,
      long_tasks: window.__perf.longTasks.length,
      long_task_ms: Math.round(window.__perf.longTasks.reduce((a, b) => a + b, 0)),
      js_transfer_bytes: sum((r) => r.name.endsWith('.js')),
      css_transfer_bytes: sum((r) => r.name.endsWith('.css')),
      image_transfer_bytes: sum((r) => /\.(png|jpe?g|webp|svg|ico)(\?|$)/.test(r.name)),
      font_transfer_bytes: sum((r) => /\.(woff2?|ttf)(\?|$)/.test(r.name)),
      dom_nodes: document.getElementsByTagName('*').length,
    };
  });

  // Laboratorio, no INP de campo: una interacción real y su duración observada.
  const beforeClick = await page.evaluate(() => performance.now());
  const languageLink = path.startsWith('/en')
    ? 'header a[hreflang="es"]'
    : 'header a[hreflang="en"]';
  await page.locator(languageLink).click();
  await page.waitForLoadState('networkidle').catch(() => {});
  const afterClick = await page.evaluate(() => performance.now());
  const events = await page.evaluate(() => window.__perf.events);
  const observedInteractionMs = events.length
    ? Math.max(...events.map((event) => event.duration))
    : null;

  await context.close();
  return {
    path,
    device: mobile ? 'mobile-390x844-4x-cpu-1.6Mbps' : 'desktop-1440x900',
    status: response?.status() ?? null,
    wall_ms: wall,
    ...metrics,
    language_switch_ms: Math.round(afterClick - beforeClick),
    observed_interaction_ms: observedInteractionMs,
  };
}

try {
  await waitReady();
  const browser = await chromium.launch({ headless: true });
  const results = [];
  for (const mobile of [false, true]) {
    for (const path of ['/', '/en/shop', '/en/shop/e2e-hub']) {
      results.push(await measure(browser, { path, mobile }));
    }
  }
  await browser.close();
  const report = {
    measured_at: new Date().toISOString(),
    method:
      'Playwright Chromium, cold cache via CDP, mobile: 4x CPU + 150ms latency/1.6Mbps down; desktop: unthrottled. Lab measurements, not field data.',
    results,
  };
  await writeFile(join(artifacts, 'm04-performance.json'), JSON.stringify(report, null, 2));
  console.table(
    results.map(
      ({
        path,
        device,
        ttfb_ms,
        fcp_ms,
        lcp_ms,
        cls,
        observed_interaction_ms,
        language_switch_ms,
        js_transfer_bytes,
      }) => ({
        path,
        device,
        ttfb_ms,
        fcp_ms,
        lcp_ms,
        cls,
        observed_interaction_ms,
        language_switch_ms,
        js_transfer_bytes,
      }),
    ),
  );
  console.log(`Performance report written to ${join(artifacts, 'm04-performance.json')}`);
} finally {
  await stop();
}
