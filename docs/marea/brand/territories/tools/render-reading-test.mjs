// render-reading-test.mjs — honest small-size reading test for the final symbols.
// Renders native-pixel evidence (deviceScaleFactor 1) plus a labelled pixel-zoom copy that is
// for inspection only. The classification itself lives in TERRITORY-COMPARISON.md §6.
// Source of truth maintained here so regeneration always states the authoritative shortlist:
// A dropped (3.48), B shortlisted + PREFERRED_PROVISIONAL (3.68), C shortlisted but failing
// the small-size reading test (3.58).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BRAND = path.resolve('docs/marea/brand');
const OUT = path.join(BRAND, 'territories', 'evidence');
const read = (p) => fs.readFileSync(path.join(BRAND, p), 'utf8').replace(/^<\?xml[^>]*>\s*/, '');
const at = (svg, px, extra = '') =>
  svg.replace(/width="[^"]*" height="[^"]*"/, `width="${px}" ${extra}`);

const b = read('territories/territory-b-mark-mono.svg');
const c = read('territories/territory-c-mark-mono.svg');
const c16 = read('territories/territory-c-mark-compact.svg');
const b16 = read('territories/territory-b-mark-compact.svg');
const lock = read('assets/logo/marea-lockup-primary.svg');
const bb = read('assets/logo/marea-mark-compact.svg');
const r16 = read('assets/logo/marea-mark-reduced-16.svg');

const cell = (svg, px, cap) =>
  `<div class="cell"><div class="demo">${at(svg, px)}</div><span class="cap">${cap}</span></div>`;

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>MC-04 reading test (PROPOSED, internal)</title>
<style>
body{background:#f7f4ec;color:#12232e;font:13px/1.5 "Segoe UI",sans-serif;margin:20px;width:980px}
h1{font:600 16px sans-serif;margin:0 0 2px}
.meta{font:11px ui-monospace,monospace;color:#54636f;margin-bottom:14px}
h2{font:600 11px ui-monospace,monospace;color:#54636f;margin:18px 0 4px;border-bottom:1px solid #d7dcd8;padding-bottom:3px}
.row{display:flex;gap:34px;align-items:flex-end;margin:8px 0 14px}
.cell{display:flex;flex-direction:column;align-items:flex-start;gap:4px}
.demo{background:#fff;border:1px solid #e2e1d8;padding:6px;display:flex;align-items:center;justify-content:center}
.cap{font:10px ui-monospace,monospace;color:#54636f}
.gray{filter:grayscale(1)}
.dark{background:#0d1b26;padding:10px}
.note{font:11px ui-monospace,monospace;color:#8a3a1c;margin:6px 0 0}
.ok{color:#1d5c3a}
</style></head><body>
<h1>MC-04 final symbol — small-size reading test (native pixels)</h1>
<p class="meta">PROPOSED / INTERNAL · rasterised from authored SVG at deviceScaleFactor 1 · 2026-10-30 · this is a pixel test, not a physical engraving sample</p>
<p class="meta">Authoritative shortlist: <strong>A dropped</strong> (3.48, §3.3 kill criterion) · <strong>B shortlisted + PREFERRED_PROVISIONAL</strong> (3.68) · <strong>C shortlisted but FAILING this reading test</strong> (3.58). The master set in <code>assets/logo/</code> is reissued from the B construction.</p>

<h2>MASTER — Territory B, BEARING INDEX (shortlisted · PREFERRED_PROVISIONAL)</h2>
<div class="row">${cell(b, 16, '16 px')}${cell(b, 24, '24 px')}${cell(b, 48, '48 px')}${cell(b, 30.2, '8 mm @96dpi ≈30 px')}</div>
<div class="row">${cell(b16, 16, 'reduced 16 px build')}${cell(b16, 24, 'reduced 24 px')}</div>

<h2>Territory C — SIGNAL TRUNK (shortlisted, FAILS the small-size reading test — not preferred)</h2>
<div class="row">${cell(c, 16, '16 px')}${cell(c, 24, '24 px')}${cell(c, 48, '48 px')}${cell(c, 30.2, '8 mm @96dpi ≈30 px')}</div>
<div class="row">${cell(c16, 16, 'reduced 16 px build')}${cell(c16, 24, 'reduced 24 px')}</div>
<p class="note">Observed: C reads as a bar chart / equaliser at 16–48 px. This is the brief §3.5 kill criterion; it is recorded as a failure, not rationalised. C is not the master.</p>

<h2>Territory A — ISOBATH (DROPPED, §3.3 kill criterion)</h2>
<p class="meta">Retained only as documented rejected evidence in <code>territories/territory-a-*</code>: the contour set reads as radiating wi-fi / signal arcs and as a generic wave.</p>

<h2>Master compact mark (marea-mark-compact.svg, B construction) and 16 px reduced build</h2>
<div class="row">${cell(bb, 16, 'compact 16 px')}${cell(bb, 24, 'compact 24 px')}${cell(bb, 32, 'compact 32 px')}${cell(r16, 16, 'reduced-16 at 16 px')}</div>

<h2>Master lockup<br><span style="font-weight:400;font-size:10px;color:#54636f">cap 16 px / 24 px / 48 px</span></h2>
<div class="row">${cell(lock, (16 / 100) * 704.83, 'cap 16 px')}${cell(lock, (24 / 100) * 704.83, 'cap 24 px')}${cell(lock, (48 / 100) * 704.83, 'cap 48 px')}</div>

<h2>Greyscale</h2>
<div class="row gray">${cell(b, 24, 'B 24 px')}${cell(c, 24, 'C 24 px')}${cell(c, 16, 'C 16 px')}${cell(b, 16, 'B 16 px')}</div>

<h2>Reversed on dark</h2>
<div class="dark row" style="color:#f2f9fd">${cell(read('territories/territory-b-mark-reversed.svg'), 24, 'B 24 px')}${cell(read('territories/territory-c-mark-reversed.svg'), 24, 'C 24 px')}</div>

<p class="note">Classification of what the pixels read as is recorded in TERRITORY-COMPARISON.md §6 (structured internal judgement by the design agent; independent human reviewer sort NOT_TESTED). B's residual risk at 16 px: letter-"C"/compass-app reading, recorded, not hidden.</p>
</body></html>`;

fs.writeFileSync(path.join(OUT, 'reading-test.html'), html);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1020, height: 1200 },
  deviceScaleFactor: 1,
});
await page.goto('file://' + path.join(OUT, 'reading-test.html').replace(/\\/g, '/'), {
  waitUntil: 'load',
});
await page.screenshot({ path: path.join(OUT, 'reading-test-native.png'), fullPage: true });

// zoom copy: nearest-neighbour upscale, for inspection only
const zoomHtml = html.replace('</style>', '.row{zoom:5;margin:40px 0 70px;gap:14px}</style>');
await page.setViewportSize({ width: 1600, height: 1400 });
await page.setContent(zoomHtml, { waitUntil: 'load' });
await page.screenshot({ path: path.join(OUT, 'reading-test-zoom.png'), fullPage: true });
await browser.close();
console.log('wrote reading-test.html + native/zoom PNG evidence');
