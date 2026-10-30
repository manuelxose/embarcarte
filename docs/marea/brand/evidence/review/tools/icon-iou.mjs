#!/usr/bin/env node
/**
 * Independent distinctness measurement for the 57 MC-04 UI icons.
 * Rasterises each master at 16/24/32 px in Chromium (canvas ImageData, black ink),
 * then computes pairwise IoU of the ink masks. Two icons with different meanings
 * that are near-identical at 16 px are a small-size distinctness risk (brief §9.2:
 * one metaphor per meaning, test at 16 px; §5.6 shape redundancy).
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT =
  process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'icon-iou.json');
const files = readdirSync(DIR).filter((f) => f.endsWith('.svg')).sort();
const icons = files.map((f) => {
  const text = readFileSync(join(DIR, f), 'utf8');
  const inner = text
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/, '');
  return { name: f.replace('.svg', ''), inner };
});

const browser = await chromium.launch({ headless: true });
let masks;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  masks = await page.evaluate(async ({ icons, sizes }) => {
    const out = {};
    for (const size of sizes) out[size] = {};
    for (const icon of icons) {
      const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" ` +
        `stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icon.inner}</svg>`;
      const url = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
      const img = new Image();
      img.width = 24;
      img.height = 24;
      await new Promise((res, rej) => {
        img.onload = res;
        img.onerror = rej;
        img.src = url;
      });
      for (const size of sizes) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        const mask = [];
        for (let i = 0; i < data.length; i += 4) {
          // ink = dark pixel (strict: separates antialiased dash gaps from ink)
          mask.push(data[i] < 128 || data[i + 1] < 128 || data[i + 2] < 128 ? 1 : 0);
        }
        out[size][icon.name] = mask;
      }
    }
    return out;
  }, { icons, sizes: [16, 24, 32] });
} finally {
  await browser.close();
}

const names = icons.map((i) => i.name);
const report = { generatedBy: 'docs/marea/brand/evidence/review/tools/icon-iou.mjs', generatedAt: new Date().toISOString(), sizes: {} };
for (const size of ['16', '24', '32']) {
  const m = masks[size];
  const pairs = [];
  for (let i = 0; i < names.length; i += 1) {
    for (let j = i + 1; j < names.length; j += 1) {
      const a = m[names[i]];
      const b = m[names[j]];
      let inter = 0;
      let union = 0;
      for (let k = 0; k < a.length; k += 1) {
        if (a[k] || b[k]) union += 1;
        if (a[k] && b[k]) inter += 1;
      }
      const iou = union ? inter / union : 0;
      if (iou >= 0.5) pairs.push({ a: names[i], b: names[j], iou: Math.round(iou * 1000) / 1000, xor: Math.round((1 - iou) * 1000) / 1000 });
    }
  }
  pairs.sort((x, y) => y.iou - x.iou);
  const ink = names.map((n) => ({ name: n, inkPx: m[n].reduce((s, v) => s + v, 0) }));
  report.sizes[size] = {
    pairCountAtLeast050: pairs.length,
    topPairs: pairs.slice(0, 25),
    inkCoverage: ink.sort((a, b) => a.inkPx - b.inkPx),
    blankIcons: ink.filter((x) => x.inkPx === 0).map((x) => x.name),
    minInk: ink[0]?.inkPx ?? null,
    maxInk: ink[ink.length - 1]?.inkPx ?? null,
  };
  console.log(`\n=== ${size} px: ${pairs.length} pairs with IoU >= 0.50 ===`);
  for (const p of pairs.slice(0, 15)) console.log(`  ${p.iou.toFixed(3)}  ${p.a} <> ${p.b}`);
  console.log(`  min ink px ${ink[0]?.inkPx} (${ink[0]?.name}) max ${ink[ink.length - 1]?.inkPx} (${ink[ink.length - 1]?.name})`);
  console.log(`  blank icons: ${JSON.stringify(report.sizes[size].blankIcons)}`);
}
writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');
