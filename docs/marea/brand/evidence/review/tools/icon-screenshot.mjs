#!/usr/bin/env node
/**
 * Reviewer visual evidence: renders the 57 master icons at 16 px / 24 px / 32 px
 * (and 16 px upscaled 4x via deviceScaleFactor) so the small-size claim can be
 * inspected, plus a night-surface example. Writes PNG evidence under
 * docs/marea/brand/evidence/review/raw/.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw');
mkdirSync(OUT, { recursive: true });
const files = readdirSync(DIR).filter((f) => f.endsWith('.svg')).sort();
const icons = files.map((f) => ({
  name: f.replace('.svg', ''),
  inner: readFileSync(join(DIR, f), 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/, ''),
}));

const cells = icons
  .map(
    (i) => `<figure data-name="${i.name}">
      <div class="row"><span class="s16"><svg viewBox="0 0 24 24" aria-hidden="true">${i.inner}</svg></span>
      <span class="s24"><svg viewBox="0 0 24 24" aria-hidden="true">${i.inner}</svg></span>
      <span class="s32"><svg viewBox="0 0 24 24" aria-hidden="true">${i.inner}</svg></span></div>
      <figcaption>${i.name}</figcaption></figure>`,
  )
  .join('\n');

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><style>
body{margin:0;background:#fff;color:#17365d;font:12px/1.3 "Segoe UI",system-ui,sans-serif}
h1{font-size:14px;margin:10px 14px 4px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:8px 14px 20px}
figure{margin:0;border:1px solid #dbe7f0;padding:6px;display:flex;flex-direction:column;gap:4px}
.row{display:flex;align-items:center;gap:8px}
.s16 svg{width:16px;height:16px;display:block}
.s24 svg{width:24px;height:24px;display:block}
.s32 svg{width:32px;height:32px;display:block}
figcaption{font-size:9px;color:#57708a;word-break:break-all}
.night{background:#0d1b26;color:#8fd3f5;padding:8px 14px 14px}
.night .grid{grid-template-columns:repeat(12,1fr);gap:10px}
.night figure{border-color:#22384a}
.night figcaption{color:#93a6b5}
.night svg{width:24px;height:24px;display:block}
</style></head><body>
<h1>MC-04 reviewer harness — 57 master icons at 16 / 24 / 32 px (native CSS px)</h1>
<div class="grid">${cells}</div>
<h1>Night surface example (#0d1b26 canvas, #8fd3f5 ink) at 24 px</h1>
<div class="night"><div class="grid">${icons
  .map((i) => `<figure><svg viewBox="0 0 24 24" aria-hidden="true">${i.inner}</svg><figcaption>${i.name}</figcaption></figure>`)
  .join('')}</div></div>
</body></html>`;

const harness = join(OUT, 'icon-harness.html');
writeFileSync(harness, html, 'utf8');

// The 16 px sampling is the hard case: render at native 16 px with DPR 4 so the
// screenshot shows the actual 16 px rasterisation, not a scaled vector.
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1180, height: 900 }, deviceScaleFactor: 4 });
const page = await context.newPage();
await page.goto('file:///' + harness.replace(/\\/g, '/'));
await page.waitForTimeout(300);
await page.screenshot({ path: join(OUT, 'icon-harness-16px-dpr4.png'), fullPage: true });
await browser.close();

// Author's own reduction proof, first screen, 2x for legibility.
const authorFile = join(DIR, 'reduction-proof.html');
const browser2 = await chromium.launch({ headless: true });
const ctx2 = await browser2.newContext({ viewport: { width: 1240, height: 1500 }, deviceScaleFactor: 2 });
const p2 = await ctx2.newPage();
await p2.goto('file:///' + authorFile.replace(/\\/g, '/') + '?review=1');
await p2.waitForTimeout(400);
await p2.screenshot({ path: join(OUT, 'author-reduction-proof-top.png'), fullPage: false });
await browser2.close();
console.log('wrote', OUT);
