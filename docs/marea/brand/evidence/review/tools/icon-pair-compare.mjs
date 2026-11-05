#!/usr/bin/env node
/** Reviewer evidence: native 16 px and 24 px rasterisation of selected icon pairs
 * that the IoU measurement flags as near-identical, at DPR 8, so the difference is
 * visible on screen without scaling artefacts. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw');
mkdirSync(OUT, { recursive: true });
const pairs = [
  ['ais-target', 'ais-target-lost'],
  ['device-hub', 'device-display'],
  ['nav-heading', 'position-marker'],
  ['wind-true', 'wind-apparent'],
  ['alert-caution', 'alert-warning'],
  ['offline', 'wifi'],
];
const inner = (n) =>
  readFileSync(join(DIR, n + '.svg'), 'utf8')
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '');
const cell = (n) =>
  `<div class="c"><div class="lab">${n}</div><div class="row"><span class="s16"><svg viewBox="0 0 24 24">${inner(n)}</svg></span><span class="s24"><svg viewBox="0 0 24 24">${inner(n)}</svg></span><span class="s48"><svg viewBox="0 0 24 24">${inner(n)}</svg></span></div><div class="lbl">16 px · 24 px · 48 px</div></div>`;
const html = `<!doctype html><meta charset="utf-8"><style>
body{font:12px "Segoe UI",system-ui,sans-serif;color:#17365d;margin:0;padding:10px;background:#fff}
.pair{display:flex;gap:18px;border-bottom:1px solid #dbe7f0;padding:6px 0}
.c{min-width:260px}.lab{font-weight:700;font-size:12px;margin-bottom:2px}
.row{display:flex;align-items:center;gap:10px}
.s16 svg{width:16px;height:16px;display:block}.s24 svg{width:24px;height:24px;display:block}.s48 svg{width:48px;height:48px;display:block}
.lbl{font-size:9px;color:#57708a}
</style>${pairs.map((p) => `<div class="pair">${p.map(cell).join('')}</div>`).join('')}`;
const f = join(OUT, 'icon-pair-compare.html');
writeFileSync(f, html, 'utf8');
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 600, height: 900 }, deviceScaleFactor: 8 });
const page = await ctx.newPage();
await page.goto('file:///' + f.replace(/\\/g, '/'));
await page.waitForTimeout(200);
await page.screenshot({ path: join(OUT, 'icon-pair-compare-16px-dpr8.png'), fullPage: true });
await browser.close();
console.log('ok');
