// render.mjs — INTERNAL visual-check renders (not deliverable assets; AssetProduction owns
// the packaged raster pipeline and manifest). Renders our own inline SVG/HTML deterministically
//   node docs/marea/brand/territories/tools/render.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BRAND = path.resolve('docs/marea/brand');
const OUT = path.join(BRAND, 'territories', 'evidence', 'visual-check');
fs.mkdirSync(OUT, { recursive: true });

const read = (p) => fs.readFileSync(path.join(BRAND, p), 'utf8').replace(/^<\?xml[^>]*>\s*/, '');

const word = read('assets/logo/marea-wordmark.svg');
const mark = read('assets/logo/marea-mark-compact.svg');
const mark16 = read('assets/logo/marea-mark-reduced-16.svg');
const lock = read('assets/logo/marea-lockup-primary.svg');
const mono = read('assets/logo/marea-lockup-mono.svg');
const fams = ['nav', 'hub', 'ais', 'pilot', 'sense', 'watch', 'display', 'weather', 'fleet'].map(
  (f) => [f, read(`assets/logo/family/marea-family-${f}-lockup.svg`)],
);
const ta = read('territories/territory-a-mark-mono.svg');
const tb = read('territories/territory-b-mark-mono.svg');
const tc = read('territories/territory-c-mark-mono.svg');
const la = read('territories/territory-a-lockup-primary.svg');
const lb = read('territories/territory-b-lockup-primary.svg');
const lc = read('territories/territory-c-lockup-primary.svg');
const caseStudy = read('territories/wordmark-case-study.svg');

// size helper: strip fixed width/height and set CSS size
const at = (svg, px, extra = '') =>
  svg.replace(/width="[^"]*" height="[^"]*"/, `width="${px}" ${extra}`);

const shell = (
  title,
  body,
) => `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
body{background:#f7f4ec;color:#12232e;font:14px/1.5 "Segoe UI",sans-serif;margin:24px}
h2{font:600 13px ui-monospace,monospace;color:#54636f;margin:26px 0 8px;border-bottom:1px solid #d7dcd8}
.row{display:flex;gap:28px;align-items:flex-end;flex-wrap:wrap}
.cell{display:flex;flex-direction:column;gap:6px}
.cap{font:11px ui-monospace,monospace;color:#54636f}
.dark{background:#0d1b26;padding:16px}
.small{display:flex;gap:28px;align-items:flex-end;margin-top:10px}
</style></head><body><h1 style="font:600 18px sans-serif">MC-04 internal visual check — PROPOSED / INTERNAL</h1>${body}</body></html>`;

const body = `
<h2>Wordmark — MAREA (outlined)</h2>
<div class="row"><div class="cell">${at(word, 760)}<span class="cap">760 px wide</span></div></div>
<div class="small">${[16, 24, 48, 96, 200]
  .map((capPx) => {
    const w = Math.round((capPx / 100) * 448);
    return `<div class="cell">${at(word, w)}<span class="cap">cap ${capPx}px (${w}px wide)</span></div>`;
  })
  .join('')}</div>

<h2>Case study — uppercase vs title case</h2>
<div class="row"><div class="cell">${at(caseStudy, 620)}<span class="cap">case study</span></div></div>

<h2>Territory marks (mono) at 256 / 48 / 24 / 16</h2>
${[
  ['A', ta],
  ['B', tb],
  ['C', tc],
]
  .map(
    ([n, s]) =>
      `<h2>${n}</h2><div class="small">${[256, 48, 24, 16].map((p) => `<div class="cell">${at(s, p)}<span class="cap">${p}px</span></div>`).join('')}</div>`,
  )
  .join('')}

<h2>Territory lockups</h2>
<div class="row">${[
  ['A', la],
  ['B', lb],
  ['C', lc],
]
  .map(([n, s]) => `<div class="cell">${at(s, 420)}<span class="cap">${n}</span></div>`)
  .join('')}</div>

<h2>Final lockups (primary / mono / reversed on dark)</h2>
<div class="row"><div class="cell">${at(lock, 520)}<span class="cap">primary</span></div><div class="cell">${at(mono, 520)}<span class="cap">mono</span></div><div class="cell dark">${at(read('assets/logo/marea-lockup-reversed.svg'), 520)}<span class="cap" style="color:#9fb0bb">reversed</span></div></div>

<h2>Compact mark (24 grid) and reduced 16</h2>
<div class="small"><div class="cell">${at(mark, 200)}<span class="cap">compact, 200px</span></div><div class="cell">${at(mark16, 160)}<span class="cap">reduced 16 build</span></div><div class="cell"><div style="width:16px;height:16px">${at(mark16, 16)}</div><span class="cap">favicon 16px</span></div></div>

<h2>Nine family lockups</h2>
<div class="row">${fams.map(([n, s]) => `<div class="cell">${at(s, 430)}<span class="cap">MAREA ${n.toUpperCase()}</span></div>`).join('')}</div>
`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1400, height: 1000 },
  deviceScaleFactor: 2,
});
await page.setContent(shell('MC-04 visual check', body), { waitUntil: 'load' });
await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });

// individual large renders for close inspection
const shots = [
  ['wordmark', word, 900, 300],
  ['mark-compact', mark, 600, 300],
  ['mark-reduced-16', mark16, 600, 300],
  ['lockup-primary', lock, 900, 300],
  ['territory-a-mark', ta, 500, 300],
  ['territory-b-mark', tb, 500, 300],
  ['territory-c-mark', tc, 500, 300],
  ['territory-a-lockup', la, 900, 300],
  ['territory-b-lockup', lb, 900, 300],
  ['territory-c-lockup', lc, 900, 300],
  ['case-study', caseStudy, 900, 400],
];
for (const [name, svg, w, h] of shots) {
  await page.setContent(shell(name, `<div class="cell">${at(svg, w)}</div>`), {
    waitUntil: 'load',
  });
  // Element screenshots are for close inspection only; a flaky capture must not fail the run.
  try {
    const el = await page.$('svg');
    if (el) await el.screenshot({ path: path.join(OUT, `${name}.png`) });
  } catch (e) {
    console.warn('element screenshot skipped:', name, '-', String(e.message).split('\n')[0]);
  }
}
await browser.close();
console.log('rendered visual checks to', path.relative(process.cwd(), OUT));
