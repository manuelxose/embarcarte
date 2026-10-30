#!/usr/bin/env node
/**
 * Independent ink-bounds analysis for the 57 MC-04 UI icons, v2.
 * Uses the installed Chromium SVGGraphicsElement.getBBox() per element (authoritative
 * geometry, no regex parsing of path data), unions the element boxes, then expands by
 * half the element stroke width to get the rendered ink box on the 24x24 grid.
 * Checks the index.html claim of "2 px optical padding" and the brief's 24-grid rule.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT =
  process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'icon-bounds.json');
const files = readdirSync(DIR).filter((f) => f.endsWith('.svg')).sort();
const svgs = files.map((f) => ({ file: f, text: readFileSync(join(DIR, f), 'utf8') }));

const browser = await chromium.launch({ headless: true });
let measured;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  measured = await page.evaluate((inputs) => {
    const out = [];
    for (const input of inputs) {
      const doc = new DOMParser().parseFromString(input.text, 'image/svg+xml');
      const root = doc.documentElement;
      doc.documentElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      // Serialise into the live document so getBBox() works.
      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;left:-9999px;top:0';
      host.innerHTML = new XMLSerializer().serializeToString(root);
      document.body.appendChild(host);
      const svg = host.querySelector('svg');
      let box = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
      let detail = 0;
      const strokes = new Set();
      for (const el of svg.querySelectorAll('path,line,circle,rect,polyline,polygon,ellipse')) {
        let b;
        try {
          b = el.getBBox();
        } catch {
          continue;
        }
        if (!b || (b.width === 0 && b.height === 0 && b.x === 0 && b.y === 0 && el.tagName.toLowerCase() === 'path')) {
          // getBBox can be zero for unrendered elements; still include
        }
        const computed = getComputedStyle(el);
        const swRaw = computed.strokeWidth;
        const sw = swRaw && swRaw !== 'none' ? parseFloat(swRaw) : 0;
        const hasStroke = computed.stroke !== 'none' && Number.isFinite(sw) && sw > 0;
        const half = hasStroke ? sw / 2 : 0;
        if (hasStroke) strokes.add(sw);
        box.minX = Math.min(box.minX, b.x - half);
        box.maxX = Math.max(box.maxX, b.x + b.width + half);
        box.minY = Math.min(box.minY, b.y - half);
        box.maxY = Math.max(box.maxY, b.y + b.height + half);
        detail += 1;
      }
      out.push({
        file: input.file,
        detail,
        strokeWidths: [...strokes],
        minX: box.minX,
        maxX: box.maxX,
        minY: box.minY,
        maxY: box.maxY,
        rootBBox: (() => {
          try {
            const b = svg.getBBox();
            return { x: b.x, y: b.y, w: b.width, h: b.height };
          } catch {
            return null;
          }
        })(),
      });
      host.remove();
    }
    return out;
  }, svgs);
} finally {
  await browser.close();
}

const r = (v) => (Number.isFinite(v) ? Math.round(v * 100) / 100 : null);
const rows = measured.map((m) => ({
  file: m.file,
  elements: m.detail,
  strokeWidths: m.strokeWidths,
  minX: r(m.minX),
  maxX: r(m.maxX),
  minY: r(m.minY),
  maxY: r(m.maxY),
  withinCanvas: m.minX >= -0.01 && m.maxX <= 24.01 && m.minY >= -0.01 && m.maxY <= 24.01,
  paddingViolation: {
    left: m.minX < 1.99,
    right: m.maxX > 22.01,
    top: m.minY < 1.99,
    bottom: m.maxY > 22.01,
  },
  overshoot: {
    left: r(Math.max(0, 2 - m.minX)),
    right: r(Math.max(0, m.maxX - 22)),
    top: r(Math.max(0, 2 - m.minY)),
    bottom: r(Math.max(0, m.maxY - 22)),
  },
}));

const violating = rows.filter(
  (x) => x.paddingViolation.left || x.paddingViolation.right || x.paddingViolation.top || x.paddingViolation.bottom,
);
const result = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/icon-bounds.mjs',
  method: 'Chromium SVGGraphicsElement.getBBox() union + stroke/2; 24x24 grid; 2 px padding claim',
  generatedAt: new Date().toISOString(),
  iconCount: rows.length,
  allWithinCanvas: rows.every((x) => x.withinCanvas),
  paddingViolationCount: violating.length,
  paddingViolations: violating,
  strokeWidthsAcrossSet: [...new Set(rows.flatMap((x) => x.strokeWidths))].sort(),
  rows,
};
writeFileSync(OUT, JSON.stringify(result, null, 2), 'utf8');
console.log(`icons ${rows.length}; all ink within 0..24 canvas: ${result.allWithinCanvas}`);
console.log(`2px optical padding claimed in index.html; violated by ${violating.length}/${rows.length}:`);
for (const v of violating) {
  const p = v.paddingViolation;
  console.log(
    `  ${v.file.padEnd(26)} ink x[${v.minX},${v.maxX}] y[${v.minY},${v.maxY}] ` +
      `${p.left ? 'L' : ''}${p.right ? 'R' : ''}${p.top ? 'T' : ''}${p.bottom ? 'B' : ''} ` +
      `overshoot L${v.overshoot.left} R${v.overshoot.right} T${v.overshoot.top} B${v.overshoot.bottom}`,
  );
}
const sizes = [...new Set(rows.flatMap((x) => x.elements))].sort((a, b) => a - b);
console.log(`detail elements per icon: min ${sizes[0]} max ${sizes[sizes.length - 1]}`);
