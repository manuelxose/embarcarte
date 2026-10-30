#!/usr/bin/env node
/**
 * Independent geometry audit of the frozen D-02/D-03 identity artwork (reviewer-authored).
 *
 * Measures, with Chromium getBBox() + the element's consolidated transform (translate/scale only):
 *  - viewBox, ink bbox of each group (symbol / wordmark / family token);
 *  - symbol ink height vs wordmark cap height; symbol band alignment (top/bottom);
 *  - rail on the baseline; symbol-to-wordmark ink gap; 0.5x cap clear space on every side;
 *  - clipping (ink inside the viewBox);
 *  - compact and 16 px reduced mark centring;
 *  - the nine family lockups as ONE rule: identical symbol+wordmark geometry, only the family
 *    token differs, consistent token scale/gap, family names from the canonical nine.
 * Writes JSON to argv[2].
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const LOGO = join(ROOT, 'docs/marea/brand/assets/logo');
const OUT =
  process.argv[2] ??
  join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'identity-audit.json');

const rootSvgs = ['marea-lockup-primary.svg', 'marea-lockup-mono.svg', 'marea-lockup-reversed.svg', 'marea-wordmark.svg', 'marea-mark-compact.svg', 'marea-mark-reduced-16.svg', 'marea-construction-grid.svg'];
const familyDir = join(LOGO, 'family');
const familySvgs = readdirSync(familyDir).filter((f) => f.endsWith('.svg')).sort();
const files = [
  ...rootSvgs.map((f) => ({ rel: 'docs/marea/brand/assets/logo/' + f, file: join(LOGO, f) })),
  ...familySvgs.map((f) => ({ rel: 'docs/marea/brand/assets/logo/family/' + f, file: join(familyDir, f) })),
];
const inputs = files.map((f) => ({ rel: f.rel, text: readFileSync(f.file, 'utf8') }));

const browser = await chromium.launch({ headless: true });
let measured;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  measured = await page.evaluate((items) => {
    const out = [];
    for (const item of items) {
      const doc = new DOMParser().parseFromString(item.text, 'image/svg+xml');
      const ser = new XMLSerializer().serializeToString(doc.documentElement);
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;left:-9999px;top:0';
      host.innerHTML = ser;
      document.body.appendChild(host);
      const svg = host.querySelector('svg');
      const vb = svg.getAttribute('viewBox').split(/[\s,]+/).map(Number);
      const groups = [...svg.querySelectorAll(':scope > g')].map((g) => {
        const b = g.getBBox();
        const m = g.transform.baseVal.consolidate()?.matrix;
        const apply = (x, y) => {
          if (!m) return { x, y };
          return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f };
        };
        const p1 = apply(b.x, b.y);
        const p2 = apply(b.x + b.width, b.y + b.height);
        return {
          minX: Math.min(p1.x, p2.x),
          maxX: Math.max(p1.x, p2.x),
          minY: Math.min(p1.y, p2.y),
          maxY: Math.max(p1.y, p2.y),
          transform: m ? { a: m.a, d: m.d, e: m.e, f: m.f } : null,
          pathData: [...g.querySelectorAll('path')].map((p) => p.getAttribute('d')).join('|'),
        };
      });
      const ink = groups.reduce(
        (acc, g) => ({
          minX: Math.min(acc.minX, g.minX),
          maxX: Math.max(acc.maxX, g.maxX),
          minY: Math.min(acc.minY, g.minY),
          maxY: Math.max(acc.maxY, g.maxY),
        }),
        { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
      );
      const desc = doc.querySelector('desc')?.textContent ?? null;
      const title = doc.querySelector('title')?.textContent ?? null;
      out.push({
        rel: item.rel,
        viewBox: vb,
        title,
        desc,
        groupCount: groups.length,
        groups: groups.map((g, i) => ({ index: i, transform: g.transform, minX: g.minX, maxX: g.maxX, minY: g.minY, maxY: g.maxY, width: g.maxX - g.minX, height: g.maxY - g.minY, pathHash: hash(g.pathData) })),
        ink,
      });
      host.remove();
      function hash(s) {
        let h = 0;
        for (let i = 0; i < s.length; i += 1) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
        return (h >>> 0).toString(16);
      }
    }
    return out;
  }, inputs);
} finally {
  await browser.close();
}

const primary = measured.find((m) => m.rel.endsWith('marea-lockup-primary.svg'));
const wordmarkOnly = measured.find((m) => m.rel.endsWith('marea-wordmark.svg'));
const capH = primary.groups[1] ? primary.groups[1].height : null;

const records = measured.map((m) => {
  const [symbol, wordmark, token] = m.groups;
  const vbW = m.viewBox[2];
  const vbH = m.viewBox[3];
  const clear = {
    left: m.ink.minX,
    right: vbW - m.ink.maxX,
    top: m.ink.minY,
    bottom: vbH - m.ink.maxY,
  };
  const rec = {
    file: m.rel,
    viewBox: m.viewBox,
    title: m.title,
    desc: m.desc,
    groupCount: m.groupCount,
    ink: {
      x: round(m.ink.minX),
      y: round(m.ink.minY),
      width: round(m.ink.maxX - m.ink.minX),
      height: round(m.ink.maxY - m.ink.minY),
    },
    clearSpace: Object.fromEntries(Object.entries(clear).map(([k, v]) => [k, round(v)])),
    clipped: m.ink.minX < -0.01 || m.ink.minY < -0.01 || m.ink.maxX > vbW + 0.01 || m.ink.maxY > vbH + 0.01,
  };
  if (symbol && wordmark) {
    rec.symbol = { width: round(symbol.width), height: round(symbol.height), top: round(symbol.minY), bottom: round(symbol.maxY), pathHash: symbol.pathHash };
    rec.wordmark = { width: round(wordmark.width), height: round(wordmark.height), top: round(wordmark.minY), bottom: round(wordmark.maxY), pathHash: wordmark.pathHash };
    rec.gapSymbolWordmark = round(wordmark.minX - symbol.maxX);
    rec.symbolBandAligned = Math.abs(symbol.minY - wordmark.minY) < 0.01 && Math.abs(symbol.maxY - wordmark.maxY) < 0.01;
    rec.railOnBaseline = Math.abs(symbol.maxY - wordmark.maxY) < 0.01;
  }
  if (token) {
    rec.familyToken = { width: round(token.width), height: round(token.height), top: round(token.minY), bottom: round(token.maxY), pathHash: token.pathHash, scale: token.transform?.a ?? null };
    rec.gapWordmarkToken = round(token.minX - wordmark.maxX);
  }
  return rec;
});

// Family rule: identical symbol+wordmark path hashes across all family lockups, token differs, one token scale.
const family = records.filter((r) => r.file.includes('/family/'));
const symbolHashes = [...new Set(family.map((r) => r.symbol?.pathHash))];
const wordmarkHashes = [...new Set(family.map((r) => r.wordmark?.pathHash))];
const tokenHashes = [...new Set(family.map((r) => r.familyToken?.pathHash))];
const tokenScales = [...new Set(family.map((r) => r.familyToken?.scale))];
const tokenGaps = [...new Set(family.map((r) => r.gapWordmarkToken))];
const tokenHeights = [...new Set(family.map((r) => r.familyToken?.height))];

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/identity-audit.mjs',
  generatedAt: new Date().toISOString(),
  method: 'Chromium SVGGeometryElement.getBBox() + consolidated transform (translate/scale); ink in viewBox user units',
  capHeight: capH,
  primary: records.find((r) => r.file.endsWith('marea-lockup-primary.svg')),
  wordmarkOnly: records.find((r) => r.file.endsWith('marea-wordmark.svg')),
  familyRule: {
    familyCount: family.length,
    symbolPathVariants: symbolHashes.length,
    wordmarkPathVariants: wordmarkHashes.length,
    distinctFamilyTokens: tokenHashes.length,
    tokenScales,
    tokenGapValues: tokenGaps,
    tokenHeights,
    oneSymbol: symbolHashes.length === 1,
    oneWordmark: wordmarkHashes.length === 1,
    oneTokenScale: tokenScales.length === 1,
    oneTokenGap: tokenGaps.length === 1,
    allTokensDistinct: tokenHashes.length === family.length,
    allWithinViewBox: family.every((r) => !r.clipped),
    allHave50ClearSpace: family.every((r) => r.clearSpace.left >= 49.99 && r.clearSpace.right >= 49.99 && r.clearSpace.top >= 49.99),
  },
  files: records,
};
writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');

function round(v) {
  return Number.isFinite(v) ? Math.round(v * 100) / 100 : null;
}

console.log('cap height (wordmark):', report.capHeight);
console.log('primary:', JSON.stringify({ ink: report.primary?.ink, clear: report.primary?.clearSpace, gap: report.primary?.gapSymbolWordmark, band: report.primary?.symbolBandAligned, rail: report.primary?.railOnBaseline, clipped: report.primary?.clipped }));
console.log('wordmark-only:', JSON.stringify({ ink: report.wordmarkOnly?.ink, vb: report.wordmarkOnly?.viewBox }));
console.log('family rule:', JSON.stringify(report.familyRule));
for (const f of family) {
  console.log(`  ${f.file.split('/').pop()} vb=${f.viewBox[2]}x${f.viewBox[3]} ink=${JSON.stringify(f.ink)} rightClear=${f.clearSpace.right} gapToken=${f.gapWordmarkToken} tokenH=${f.familyToken?.height}`);
}
