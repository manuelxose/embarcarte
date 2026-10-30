// build.mjs — emits every MC-04 identity SVG + HTML proof sheet from the authored geometry.
// Run from the repository root: node docs/marea/brand/territories/tools/build.mjs
// All artwork is PROPOSED / INTERNAL. No fonts, no raster, no external references.
import fs from 'node:fs';
import path from 'node:path';
import { layout, WORDMARK } from './alphabet.mjs';
import { MARKS, COMPACTS } from './marks.mjs';
import { titleCaseStudy } from './case-study.mjs';
import { pathData, f, round2 } from './geom.mjs';

const BRAND = path.resolve('docs/marea/brand');
const LOGO = path.join(BRAND, 'assets', 'logo');
const FAMILY = path.join(LOGO, 'family');
const TERR = path.join(BRAND, 'territories');
const PROOF = path.join(TERR, 'proof');
const EVID = path.join(TERR, 'evidence');

const INK = '#17365d'; // corporate navy (existing token --navy)
const MONO = '#101820'; // single-ink near-black
const REV = '#f2f9fd'; // existing token --mist, reversed ink
const PAPER = '#f7f4ec';
const DARK = '#0d1b26';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Transform scale factors may carry 3 decimals (coordinates stay ≤ 2): 3 decimals are enough
// to land the symbol ink band on the cap band within 0.01 units, and they keep §10.5 verifiable.
const fmt4 = (n) => String(Math.round(n * 1000) / 1000);

/** SVG markup (no XML declaration); ids are prefixed so inline HTML copies stay unique. */
const markup = ({ w, h, title, desc, body, color = INK, uid = 'a', cls = '' }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(w)} ${f(h)}" ` +
  `width="${f(w)}" height="${f(h)}" role="img" aria-labelledby="${uid}-t ${uid}-d"` +
  (cls ? ` class="${cls}"` : '') +
  (color ? ` color="${color}"` : '') +
  `>\n<title id="${uid}-t">${esc(title)}</title>\n<desc id="${uid}-d">${esc(desc)}</desc>\n${body}\n</svg>`;

const fileSvg = (opts) => '<?xml version="1.0" encoding="UTF-8"?>\n' + markup(opts) + '\n';

/** Inline an SVG document at a given rendered width (height follows the viewBox). */
const inline = (doc, widthPx) => {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(doc);
  if (!vb) return doc;
  const w = Number(vb[1]),
    h = Number(vb[2]);
  return doc
    .replace(/^<\?xml[^>]*>\s*/, '')
    .replace(
      `width="${f(w)}" height="${f(h)}"`,
      `width="${widthPx}" height="${round2((widthPx * h) / w)}"`,
    );
};

const write = (p, s) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, s, 'utf8');
  return p;
};
const rel = (p) => path.relative(process.cwd(), p).replace(/\\/g, '/');

const markBody = (mk) => {
  const inner = mk.parts.map((d) => `<path fill="currentColor" d="${d}"/>`).join('\n');
  if (mk.translate)
    return `<g transform="translate(${f(mk.translate[0])} ${f(mk.translate[1])})">\n${inner}\n</g>`;
  return inner;
};

/* ------------------------------------------------------------------ wordmark & lockups */
const wordmarkBody = (color = INK) =>
  `<path fill="currentColor" d="${pathData(layout(WORDMARK).polys)}"/>`;

const wm = layout(WORDMARK);
export const WORDMARK_WIDTH = wm.width;

function lockupMarkup({ dir, family = null, color = INK, uid = 'lk', compact = false }) {
  const mk = compact ? COMPACTS[dir]() : MARKS[dir]();
  const above = mk.baseline - mk.ink.y0;
  const below = Math.max(0, mk.ink.y1 - mk.baseline);
  const sRaw = 100 / above; // symbol ink above the baseline = wordmark cap height (100)
  const s = Math.round(sRaw * 10000) / 10000; // 4 decimals keeps the measured band error < 0.01
  const markW = (mk.ink.x1 - mk.ink.x0) * s;
  const CLEAR = 50; // 0.5 × cap height, baked into the viewBox on every side
  const GAP = 75; // 0.75 × cap height, measured ink-to-ink
  const BASE_Y = CLEAR + 100; // wordmark baseline
  const H = round2(BASE_Y + below * s + CLEAR);
  const wmX = CLEAR + markW + GAP;
  // Map the symbol ink band exactly onto the cap band: ink.y0 -> CLEAR, baseline -> BASE_Y.
  const markTy = round2(CLEAR - mk.ink.y0 * s);
  const markTX = round2(CLEAR - mk.ink.x0 * s);
  let body =
    `<g transform="translate(${f(markTX)} ${f(markTy)}) scale(${fmt4(s)})">\n` +
    mk.parts.map((d) => `<path fill="currentColor" d="${d}"/>`).join('\n') +
    `\n</g>\n<g transform="translate(${f(wmX)} ${f(BASE_Y - 100)})">` +
    `<path fill="currentColor" d="${pathData(wm.polys)}"/></g>`;
  let totalW = wmX + wm.width + CLEAR;
  if (family) {
    const fam = layout(family, { scale: 0.7 });
    const famGap = 26;
    const famX = wmX + wm.width + famGap;
    body +=
      `\n<g transform="translate(${f(famX)} ${f(BASE_Y - 70)})">` +
      `<path fill="currentColor" d="${pathData(fam.polys)}"/></g>`;
    totalW = famX + fam.width + CLEAR;
  }
  const label = family ? `MAREA ${family}` : 'MAREA';
  return markup({
    w: round2(totalW),
    h: H,
    title: `${label} — proposed identifier (internal, not cleared)`,
    desc:
      `Proposed MAREA ${family ? `family ${family} ` : ''}lockup built from one construction system: ` +
      `territory ${dir} symbol + outlined MAREA wordmark${family ? ' + outlined family token' : ''}. ` +
      `Symbol ink above the baseline equals the 100-unit wordmark cap height; ink-to-ink symbol gap is ` +
      `0.75 × cap height; 0.5 × cap height clear space is included in the viewBox. ` +
      `PROPOSED / INTERNAL artwork; no trademark clearance.`,
    body,
    color,
    uid,
  });
}

/* --------------------------------------------------------------------------- construction */
const gridLines = (n, step = 1) => {
  const parts = [];
  for (let i = 0; i <= n; i += step) {
    parts.push(`M${f(i)} 0V${f(n)}`, `M0 ${f(i)}H${f(n)}`);
  }
  return parts;
};
const majorLines = (n, step = 4) => {
  const parts = [];
  for (let i = 0; i <= n; i += step) {
    parts.push(`M${f(i)} 0V${f(n)}`, `M0 ${f(i)}H${f(n)}`);
  }
  return parts;
};

function constructionMarkup(dir) {
  const def = dir === 'A' ? MARKS.A() : dir === 'B' ? MARKS.B() : MARKS.C();
  const n = def.grid;
  const pad = 4.5;
  const t = (x, y, s, size = 1.05, anchor = 'start', weight = 400) =>
    `<text x="${f(x)}" y="${f(y)}" font-family="ui-monospace, Consolas, monospace" ` +
    `font-size="${f(size)}" fill="#54636f" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
  const aux = [];
  if (dir === 'A') {
    const cs = [
      [1.0, 21.0, 19.5],
      [3.5, 23.0, 15.5],
      [6.0, 25.0, 12.0],
      [8.5, 27.0, 8.5],
    ];
    cs.forEach(([cx, cy, r]) => {
      aux.push(
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#1776ad" stroke-width="0.12" stroke-dasharray="0.5 0.4"/>`,
        `<circle cx="${cx}" cy="${cy}" r="0.45" fill="#c0392b"/>`,
      );
    });
  } else if (dir === 'B') {
    aux.push(
      `<circle cx="16" cy="16" r="13" fill="none" stroke="#1776ad" stroke-width="0.12" stroke-dasharray="0.6 0.5"/>`,
      `<circle cx="16" cy="16" r="14.6" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.4 0.5"/>`,
      `<circle cx="16" cy="16" r="11.4" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.4 0.5"/>`,
      `<path d="M16 1V31M1 16H31" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.5 0.5" fill="none"/>`,
    );
  } else {
    const [tx, ty] = def.translate || [0, 0];
    const X = (v) => tx + v,
      Y = (v) => ty + v;
    aux.push(
      `<path d="M${f(X(0))} ${f(Y(12))}H${f(X(15.5))}M${f(X(0))} ${f(Y(14))}H${f(X(15.5))}" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.4 0.4" fill="none"/>`,
      `<rect x="${f(X(1.5))}" y="${f(Y(10))}" width="2.5" height="2" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.3 0.3"/>`,
      `<rect x="${f(X(6.5))}" y="${f(Y(4))}" width="4" height="8" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.3 0.3"/>`,
      `<rect x="${f(X(12))}" y="${f(Y(6))}" width="3" height="6" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.3 0.3"/>`,
      `<path d="M${f(X(7.9))} ${f(Y(4))}V${f(Y(5.8))}M${f(X(9.1))} ${f(Y(4))}V${f(Y(5.8))}" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.3 0.3" fill="none"/>`,
    );
  }
  const vb = -pad;
  const size = n + pad * 2;
  const spec =
    dir === 'A'
      ? [
          '4 open contours, stroke 1.6/24',
          'unequal radial intervals 3.5 / 4 / 4.5',
          'centres offset on one slope line (not concentric)',
          'ends cut radially; datum 1.6 on baseline',
        ]
      : dir === 'B'
        ? [
            '270° calibrated arc, stroke 2.5/32, r=13',
            'bearing index 3.5 wide, datum 3×3',
            'ticks 4.5 and 2 long (asymmetric)',
            'gap 90° at lower right — no closed ring',
          ]
        : [
            'rail 15.5 × 2 on the baseline',
            'keys 2.5 / 4 / 3 wide at unequal gaps',
            'heights 2 / 8 (raised to cap line) / 6',
            'centre-key screw slot 1.2 × 1.8',
          ];
  const labelY = n + 1.4;
  const body =
    `<rect x="${vb}" y="${vb}" width="${size}" height="${size}" fill="${PAPER}"/>\n` +
    `<path d="${gridLines(n, 1).join(' ')}" stroke="#e2e6e3" stroke-width="0.06" fill="none"/>\n` +
    `<path d="${majorLines(n, 4).join(' ')}" stroke="#cdd4d0" stroke-width="0.14" fill="none"/>\n` +
    `<rect x="0" y="0" width="${n}" height="${n}" fill="none" stroke="#8a9aa3" stroke-width="0.18"/>\n` +
    aux.join('\n') +
    `\n${markBody(def)}` +
    `\n${t(vb + 0.6, vb + 1.5, 'PROPOSED / INTERNAL — MC-04 construction', 1.15, 'start', 600)}` +
    `\n${t(vb + 0.6, vb + 2.9, `${def.name} — territory ${dir} — ${n} × ${n} construction grid`, 1.05)}` +
    `\n${spec.map((s, i) => t(vb + 0.6, labelY + i * 1.25, `· ${s}`, 1.0)).join('\n')}` +
    `\n${t(vb + 0.6, labelY + 5.4, '1 grid unit = 1/' + n + ' of the mark height. No letters in the symbol.', 0.95)}`;
  return markup({
    w: size,
    h: size + 1.5,
    title: `Territory ${def.name} — construction drawing (PROPOSED, internal)`,
    desc: `Construction grid, auxiliary geometry and geometry rules for the proposed ${def.name} symbol. Internal prototype, not cleared, not adopted.`,
    body,
    color: '#12232e',
    uid: `cg${dir}`,
  });
}

/* -------------------------------------------------------------------------- proof sheets */
const css = `
:root{--ink:#12232e;--paper:#f7f4ec;--navy:#17365d;--sea:#1776ad;--line:#d7dcd8;--dark:#0d1b26;--mist:#f2f9fd}
*{box-sizing:border-box}
body{margin:0;background:#eceae3;color:var(--ink);font:15px/1.5 "Segoe UI",system-ui,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:28px 24px 64px}
header{border-bottom:2px solid var(--navy);padding-bottom:14px;margin-bottom:24px}
h1{font-size:22px;line-height:1.2;margin:0 0 6px}
h2{font-size:16px;margin:34px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--line)}
h3{font-size:13px;margin:18px 0 6px;text-transform:none;letter-spacing:.01em;color:#3d4d59}
p,li{max-width:88ch}
.meta{font:12px/1.5 ui-monospace,Consolas,monospace;color:#54636f}
.tag{display:inline-block;border:1px solid var(--navy);color:var(--navy);font:600 11px/1 ui-monospace,monospace;padding:5px 7px;margin-right:6px;border-radius:2px}
.tag.warn{border-color:#a3471f;color:#a3471f}
.panel{background:var(--paper);border:1px solid var(--line);padding:18px}
.row{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end}
.cell{display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.cell .cap{font:11px/1.4 ui-monospace,monospace;color:#54636f}
.sizes{display:flex;gap:26px;align-items:flex-end;flex-wrap:wrap}
.darksurface{background:var(--dark);padding:20px;border:1px solid #24333d}
table{border-collapse:collapse;width:100%;font-size:13px}
th,td{border:1px solid var(--line);padding:7px 9px;text-align:left;vertical-align:top}
th{background:#e7e9e4;font-weight:600}
td.num{text-align:right;font-variant-numeric:tabular-nums}
.misuse{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.tile{background:#fff;border:1px solid var(--line);padding:12px}
.tile .demo{height:64px;display:flex;align-items:center;justify-content:flex-start;overflow:hidden}
.tile .why{font:11px/1.35 ui-monospace,monospace;color:#8a3a1c;margin-top:8px}
.note{background:#fff;border-left:3px solid var(--sea);padding:10px 14px;font-size:13px}
footer{margin-top:40px;border-top:1px solid var(--line);padding-top:12px;font-size:12px;color:#54636f}
.gray{filter:grayscale(1)}
.engrave{filter:grayscale(1) contrast(1.15);background:#b9bdb6;padding:16px;border:1px solid #9aa09a}
@media print{body{background:#fff}.wrap{max-width:none}}
`;

const page = (title, inner) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${css}</style></head>
<body><div class="wrap">${inner}</div></body></html>`;

const head = (kicker, h1, sub) => `<header>
<div><span class="tag">PROPOSED</span><span class="tag">INTERNAL</span><span class="tag warn">NOT CLEARED</span></div>
<p class="meta">${esc(kicker)}</p>
<h1>${esc(h1)}</h1>
<p class="meta">${esc(sub)}</p>
</header>`;

const thumbMark = (mk, px, uid, color = INK) =>
  markup({
    w: mk.viewBox[0],
    h: mk.viewBox[1],
    title: `${mk.name} at ${px}px`,
    desc: 'Prototype symbol proof (PROPOSED, internal).',
    body: markBody(mk),
    color,
    uid,
  }).replace(
    `width="${f(mk.viewBox[0])}" height="${f(mk.viewBox[1])}"`,
    `width="${px}" height="${px}"`,
  );

const thumbLockup = (dir, px, uid, { family = null, color = INK, compact = false } = {}) => {
  const s = lockupMarkup({ dir, family, color, uid, compact });
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(s);
  const w = Number(vb[1]),
    h = Number(vb[2]);
  return s.replace(
    `width="${f(w)}" height="${f(h)}"`,
    `width="${px}" height="${round2((px * h) / w)}"`,
  );
};

const ladder = (dir, compact = false) => {
  const sizes = [512, 48, 24, 16];
  return `<div class="sizes">${sizes
    .map(
      (px) =>
        `<div class="cell">${thumbMark(compact ? COMPACTS[dir]() : MARKS[dir](), px, `s${dir}${px}`, INK)}` +
        `<span class="cap">${px} px</span></div>`,
    )
    .join('\n')}
  <div class="cell">${thumbMark(COMPACTS[dir](), 30, `s${dir}mm`, INK)}<span class="cap">8 mm @96 dpi ≈30 px<br>(simulated reduction)</span></div></div>`;
};

const proofSheet = (dir) => {
  const def = dir === 'A' ? MARKS.A() : dir === 'B' ? MARKS.B() : MARKS.C();
  const comp = COMPACTS[dir]();
  const rows =
    dir === 'A'
      ? [
          ['Grid', '24 × 24 units; 1 unit = 1/24 mark height'],
          [
            'Primary structure',
            '4 open depth contours, each struck from its OWN centre (1,21) (3.5,23) (6,25) (8.5,27), centres offset on one slope line so the group is not concentric',
          ],
          ['Stroke', '1.6 units (contour band), constant'],
          ['Radial intervals', '3.5 / 4 / 4.5 units — deliberately unequal'],
          ['Ends', 'radial cuts from −88° to −24°; the end cuts are staggered, not aligned'],
          [
            'Anchor',
            'the innermost contour ends in a 1.6-unit measured datum on the wordmark baseline (y = 23.9)',
          ],
          ['Detail', 'sounding square 1.4 units in the contour gap; dropped in the 16 px build'],
          ['16 px build', '3 contours, stroke 2.2/16, datum retained, square dropped'],
          [
            'Optical corrections',
            'the non-concentric construction removes the radiating-signal reading of a concentric contour set; the datum overlaps the contour end by 0.4 units to avoid a hairline seam',
          ],
        ]
      : dir === 'B'
        ? [
            ['Grid', '32 × 32 units; 1 unit = 1/32 mark height; ink 29.75 × 30.0 units'],
            [
              'Primary structure',
              '270° calibrated arc, open 90° at the lower right (never a closed ring or seal)',
            ],
            [
              'Stroke weight (corrected)',
              'arc 3.2 units = 10.4 % of the 30.0-unit ink height. Curved strokes read visually heavier than straight stems, so optical parity with the 16 % wordmark stem is reached below 16 %. Two prototypes set the range: 2.5 units (8.6 %) read thin beside the letters; 4.4 units (14.3 %) read letter-heavy (the arc began to read as a "G"). 3.2 measured level with the wordmark on the 1:1 lockup proof',
            ],
            ['Arc', 'r = 13, centre (16,16), from 90° to 360°, butt ends'],
            [
              'Bearing index',
              '3.4 wide × 15.4 long at 0° (vertical), heavier than the ticks and crossing the arc as a lubber line',
            ],
            ['Datum', '3.4 × 3.4 filled square at the optical centre — square, never a circle-dot'],
            [
              'Ticks',
              'two outer calibration ticks, 1.8 wide, asymmetric: 1.8 long at 205°, 1.3 long at 315° — attached to the arc outer edge as graduation marks',
            ],
            [
              '16 px build',
              'own 16-unit coordinates: arc 2.2 r=6.5, index 2.2 wide, datum 2, two outer ticks 1.2 wide',
            ],
            [
              'Optical corrections',
              'the index is 89 % wider than the calibration ticks, so the heading reads before the graduations; the 90° opening prevents a seal/badge reading; no letter, numeral or cardinal point is drawn',
            ],
            [
              'Reading test',
              '24–48 px: instrument arc fragment (preferred). 16 px: residual "letter C"/gauge-app reading recorded in TERRITORY-COMPARISON.md §6 — a real residual risk, not hidden',
            ],
          ]
        : [
            [
              'Grid',
              '24 × 24 units; 1 unit = 1/24 of the framing grid, symbol ink band = 10 units (y 4..14)',
            ],
            [
              'Primary structure',
              'one bus rail on the baseline + three terminal keys with squared caps; the centre key is raised to the cap line',
            ],
            ['Weights', 'rail 2 units thick; keys 2.5 / 4 / 3 wide'],
            [
              'Unequal keys',
              'widths 2.5 / 4 / 3 and heights 2 / 8 / 6 — deliberately unequal, the proportions of a terminal block (a histogram uses equal widths)',
            ],
            ['Key spacing', '2.5 and 1.5 units — unequal'],
            [
              'Centre-key slot',
              'one 1.2 × 1.8 screw slot cut from the top of the centre key, splitting its head into two stubs (a visible screw/terminal detail, not a letterform)',
            ],
            [
              'Baseline',
              'rail bottom = wordmark baseline; symbol ink band = 100-unit cap band exactly (scale ×10 in every lockup); centre key top = cap line',
            ],
            [
              '16 px build',
              'own 16-unit coordinates: rail 1.8, keys 1.7 / 2.8 / 2, screw slot 0.8 × 1.4 retained',
            ],
            [
              'Optical corrections',
              'the key widths/heights are screw-terminal proportions, not data magnitudes; the centre key is the only element to reach the cap line, so the group is not a uniform step sequence',
            ],
            [
              'Rejected variants',
              'v1 three plain rectangles on a rail with a key 3 units below it → bar chart / audio equaliser. v2 blocks on a flush rail → histogram. v3 blocks with a keyway → still histogram. v4 added a diagonal cable: rejected by the Lead as a new motif that worsens the 16 px silhouette. v5 (freeze) removes every addition.',
            ],
          ];
  const specRows = rows
    .map(([k, v]) => `<tr><th style="width:28%">${esc(k)}</th><td>${esc(v)}</td></tr>`)
    .join('');

  const misuse = [
    [
      'Stretched horizontally (1.55×)',
      'distorts stroke weight and rhythm',
      'transform:scaleX(1.55)',
    ],
    [
      'Rotated 12°',
      'the symbol is axis-built; rotation breaks the baseline logic',
      'transform:rotate(12deg)',
    ],
    ['Outlined / hollowed', 'not authored; destroys the single-ink mass', 'stroke only'],
    ['Two-colour split', 'colour never carries identity; breaks monochrome/engraving', 'two inks'],
    ['Low opacity on paper', 'falls below contrast and vanishes in sunlight', 'opacity:.35'],
    ['Crowded clear space', 'no breathing room; reads as a UI icon', '0 gap'],
  ]
    .map(
      ([t, why, how], i) =>
        `<div class="tile"><div class="demo" style="${
          i === 0
            ? 'transform:scaleX(1.55);transform-origin:left center'
            : i === 1
              ? 'transform:rotate(12deg)'
              : i === 2
                ? 'filter:invert(1)'
                : i === 3
                  ? 'color:#c0392b'
                  : i === 4
                    ? 'opacity:.35'
                    : ''
        }">${thumbLockup(dir, 132, `mu${dir}${i}`)}</div><div class="why">✕ ${esc(t)} — ${esc(why)}</div><div class="meta">${esc(how)}</div></div>`,
    )
    .join('');

  const inner = `${head(
    'MC-04 · Visual identity · territory prototype · D-01/D-02 evidence',
    `Territory ${dir} — ${def.name}`,
    'Prototype proof sheet: construction, variants, 16/24/48/512 px optical comparison, 8 mm simulated reduction, greyscale/engraving simulation and misuse. All artwork PROPOSED / INTERNAL.',
  )}
<h2>1. Construction drawing</h2>
<div class="panel">${inline(constructionMarkup(dir), 640)}</div>
<p class="meta">Grid lines every 1 unit (light), every 4 units (heavy); blue dashed = auxiliary construction geometry; the mark is drawn from the rules in the table below, not traced.</p>

<h2>2. Geometry specification</h2>
<table><tbody>${specRows}</tbody></table>

<h2>3. Variants</h2>
<div class="row">
  <div class="cell"><div class="panel">${thumbMark(def, 256, `v${dir}mono`, INK)}</div><span class="cap">monochrome, single ink (navy token)</span></div>
  <div class="cell"><div class="darksurface">${thumbMark(def, 256, `v${dir}rev`, REV)}</div><span class="cap">reversed, light ink on dark substrate</span></div>
  <div class="cell"><div class="panel">${thumbMark(comp, 256, `v${dir}c`, INK)}</div><span class="cap">compact (reduced) symbol</span></div>
</div>
<div class="row" style="margin-top:14px">
  <div class="cell"><div class="panel">${thumbLockup(dir, 420, `v${dir}lk`)}</div><span class="cap">primary wordmark combination — symbol + outlined MAREA</span></div>
  <div class="cell"><div class="darksurface">${thumbLockup(dir, 420, `v${dir}lkr`, { color: REV })}</div><span class="cap">reversed lockup</span></div>
</div>

<h2>4. Small-size ladder (optical comparison)</h2>
<div class="panel">${ladder(dir)}</div>
<p class="meta">Rendered at native size by the browser; inspect the 16 px and 24 px cells at 100% zoom. The 8 mm cell is a simulated pixel reduction of the same geometry (print simulation, not a physical sample).</p>

<h2>5. Greyscale and engraving simulation</h2>
<div class="row">
  <div class="cell"><div class="panel gray">${thumbLockup(dir, 380, `g${dir}`)}</div><span class="cap">greyscale conversion (no colour information)</span></div>
  <div class="cell"><div class="engrave">${thumbLockup(dir, 380, `e${dir}`, { color: '#1a1a1a' })}</div><span class="cap">SIMULATION — engraved/silkscreen appearance on matte grey, not a physical sample</span></div>
</div>

<h2>6. Misuse examples (do not reproduce)</h2>
<div class="misuse">${misuse}</div>
<p class="note">Misuse rules are enforced by the system rules in <code>docs/marea/brand/IDENTITY-SYSTEM.md</code>: no stretching, rotation, outline, multi-colour, transparency, effects, added letters inside the symbol, or reduced clear space.</p>

<h2>7. Test log (self-assessed, recorded honestly)</h2>
<table>
<thead><tr><th>Test</th><th>Result for this territory</th><th>Status</th></tr></thead>
<tbody>
<tr><td>SVG parse + hygiene</td><td>XML parse, no script/external ref/raster/@import/filter, viewBox present, byte budget checked by <code>check.mjs</code></td><td>TESTED</td></tr>
<tr><td>16 px / 24 px optical</td><td>${
    dir === 'A'
      ? 'the contour intervals survive, but the sounding square and the innermost contour merge at 16 px; the unequal-interval idea is no longer readable. STRUCTURED INTERNAL JUDGEMENT: the non-concentric set still tends to read as radiating signal/wave arcs — recorded as a failure mode against the §3.3 kill criteria.'
      : dir === 'B'
        ? 'index + datum + arc survive; the short calibration tick closes up at 16 px and is dropped in the compact build. STRUCTURED INTERNAL JUDGEMENT: at 16 px the arc can read as a "C" and the hub as a centre dot — recorded as a risk against the §3.4 accidental-letter criterion.'
        : 'rail, terminal and keyed connector remain separable at 16 px; the 1.4-unit keyway is at the limit of legibility but is not required for recognition. STRUCTURED INTERNAL JUDGEMENT: reads as a rail with two seated blocks, not as bars / menu / equaliser.'
  }</td><td>TESTED (visual)</td></tr>
<tr><td>8 mm simulated reduction</td><td>${
    dir === 'A'
      ? 'marginal: four 1.6/24 strokes reduce to ≈0.5 mm and the unequal intervals collapse into a set of parallel lines'
      : dir === 'B'
        ? 'passes: the arc and index stay readable; the short calibration tick is lost'
        : 'passes: the 3/24 rail and the 7 × 11 connector hold a clear silhouette; the keyway reads at 8 mm as a small notch'
  }. Simulation only — no physical engraving/silkscreen sample exists.</td><td>TESTED (simulation only)</td></tr>
<tr><td>Monochrome / reversed</td><td>single ink, no opacity, no gradient; reversed ink is the existing --mist token</td><td>TESTED</td></tr>
<tr><td>Greyscale</td><td>no colour-only information in the mark itself</td><td>TESTED</td></tr>
<tr><td>Installed-equipment test (5-second sort)</td><td>${
    dir === 'A'
      ? 'self-classification: “chart/tide” — credible marine, but generic-wave risk is real'
      : dir === 'B'
        ? 'self-classification: “instrument dial” — strong, but seal/badge confusion is a real risk'
        : 'self-classification: “installed system/terminal block” — marine only with wordmark context'
  }. Independent reviewer sort NOT TESTED (G1 pending).</td><td>NOT TESTED (independent)</td></tr>
<tr><td>Family extensibility</td><td>${
    dir === 'A'
      ? 'pattern language is strong for packaging/diagrams; weak for instrument UI'
      : dir === 'B'
        ? 'gauge/tick vocabulary transfers to DISPLAY/PILOT; weak where no bearing semantics exist (HUB/AIS/SENSE)'
        : 'connector/rail grammar transfers to icons, diagrams, bezels and packaging labels; no per-family symbol needed'
  }</td><td>ASSESSED (design judgement, not measured)</td></tr>
<tr><td>Originality / prior art</td><td>No claim. A professional originality/prior-art check is PENDING (G3/B9); this prototype is not cleared.</td><td>BLOCKED</td></tr>
</tbody></table>

<footer>MC-04 · IdentityVector · generated by <code>territories/tools/build.mjs</code> from authored geometry. PROPOSED internal artwork; MAREA is not cleared, not registered and not adopted. No ® / ™ symbols; no certification or availability claim.</footer>`;

  return page(`MC-04 Territory ${dir} — ${def.name} (PROPOSED, internal)`, inner);
};

/* ------------------------------------------------------------------------------ wordmark */
function wordmarkFile(color, uid) {
  const b = layout(WORDMARK);
  return markup({
    w: round2(b.width),
    h: 100,
    title: 'MAREA — proposed master wordmark (internal, not cleared)',
    desc: 'Outlined uppercase MAREA wordmark constructed from one monoline system: 16/100 stem weight, square terminals, optically corrected sidebearings and junctions. PROPOSED / INTERNAL artwork; no font is embedded, no trademark clearance.',
    body: `<path fill="currentColor" d="${pathData(b.polys)}"/>`,
    color,
    uid,
  });
}

/* -------------------------------------------------------------------------------- assets */
// The frozen master set is reissued from the shortlisted-preferred Territory B construction.
const MASTER_DIR = 'B';

function buildCore() {
  const files = [];
  files.push(write(path.join(LOGO, 'marea-wordmark.svg'), fileSvg0(wordmarkFile(INK, 'wm'))));
  files.push(
    write(path.join(LOGO, 'marea-mark-compact.svg'), fileSvg0(compactMarkFile(INK, 'mc'))),
  );
  files.push(
    write(path.join(LOGO, 'marea-mark-reduced-16.svg'), fileSvg0(compactReducedFile(INK))),
  );
  files.push(
    write(
      path.join(LOGO, 'marea-lockup-primary.svg'),
      fileSvg0(lockupFile({ color: INK, uid: 'lp' })),
    ),
  );
  files.push(
    write(
      path.join(LOGO, 'marea-lockup-mono.svg'),
      fileSvg0(lockupFile({ color: MONO, uid: 'lm' })),
    ),
  );
  files.push(
    write(
      path.join(LOGO, 'marea-lockup-reversed.svg'),
      fileSvg0(lockupFile({ color: REV, uid: 'lr' })),
    ),
  );
  files.push(write(path.join(LOGO, 'marea-construction-grid.svg'), fileSvg0(constructionFile())));
  for (const fam of ['nav', 'hub', 'ais', 'pilot', 'sense', 'watch', 'display', 'weather', 'fleet'])
    files.push(
      write(path.join(FAMILY, `marea-family-${fam}-lockup.svg`), fileSvg0(familyFile(fam))),
    );
  return files;
}

const fileSvg0 = (s) => '<?xml version="1.0" encoding="UTF-8"?>\n' + s + '\n';

function compactMarkFile(color, uid) {
  const mk = MARKS[MASTER_DIR]();
  return markup({
    w: 32,
    h: 32,
    title: 'MAREA compact symbol — proposed app mark (internal, not cleared)',
    desc: 'Proposed MAREA bearing-index symbol alone on its 32-unit construction grid: 270° calibrated arc open at the lower right, bearing index at 0°, square position datum and two asymmetric ticks. Single ink. PROPOSED / INTERNAL; no trademark clearance.',
    body: markBody(mk),
    color,
    uid,
  });
}
function compactReducedFile(color) {
  const mk = COMPACTS[MASTER_DIR]();
  return markup({
    w: 16,
    h: 16,
    title: 'MAREA reduced symbol for 16 px (internal, not cleared)',
    desc: 'Reduced 16-unit build of the proposed MAREA bearing-index symbol on its own coordinates: heavier arc, shorter index, square datum and one tick. PROPOSED / INTERNAL.',
    body: markBody(mk),
    color,
    uid: 'm16',
  });
}
function lockupFile({ dir = MASTER_DIR, family = null, color = INK, uid }) {
  return lockupMarkup({ dir, family, color, uid });
}
const FAMILY_NAMES = {
  nav: 'NAV',
  hub: 'HUB',
  ais: 'AIS',
  pilot: 'PILOT',
  sense: 'SENSE',
  watch: 'WATCH',
  display: 'DISPLAY',
  weather: 'WEATHER',
  fleet: 'FLEET',
};
function familyFile(fam) {
  return lockupMarkup({
    dir: MASTER_DIR,
    family: FAMILY_NAMES[fam],
    color: INK,
    uid: `f${fam}`,
  });
}
function constructionFile() {
  const mk = MARKS[MASTER_DIR]();
  const n = 32,
    pad = 6,
    size = n + pad * 2;
  const t = (x, y, s, size2 = 1.1, anchor = 'start', weight = 400, fill = '#54636f') =>
    `<text x="${f(x)}" y="${f(y)}" font-family="ui-monospace, Consolas, monospace" font-size="${f(size2)}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${esc(s)}</text>`;
  const aux =
    `<circle cx="16" cy="16" r="13" fill="none" stroke="#1776ad" stroke-width="0.12" stroke-dasharray="0.6 0.5"/>` +
    `<circle cx="16" cy="16" r="14.6" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.4 0.5"/>` +
    `<circle cx="16" cy="16" r="11.4" fill="none" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.4 0.5"/>` +
    `<path d="M16 0V32M0 16H32" stroke="#1776ad" stroke-width="0.1" stroke-dasharray="0.5 0.5" fill="none"/>`;
  const body =
    `<rect x="0" y="0" width="${size}" height="${size}" fill="${PAPER}"/>` +
    `<path d="${gridLinesDim(n, size, pad).join(' ')}" stroke="#e2e6e3" stroke-width="0.06" fill="none"/>` +
    `<rect x="${pad}" y="${pad}" width="${n}" height="${n}" fill="none" stroke="#8a9aa3" stroke-width="0.18"/>` +
    `<g transform="translate(${pad} ${pad})">${aux}${markBody(mk)}</g>` +
    t(pad, pad - 1.6, 'PROPOSED / INTERNAL — MAREA symbol construction', 1.15, 'start', 600) +
    t(pad, pad - 0.5, 'Bearing index · 32 × 32 grid · 1 unit = 1/32 mark height', 1.0) +
    t(pad, pad + n + 2.0, 'calibrated arc r = 13, stroke 3.2, 270° open at the lower right', 0.95) +
    t(
      pad,
      pad + n + 3.2,
      'bearing index 3.4 × 15.4 at 0° · square datum 3.4 × 3.4 · two calibration ticks attached to the arc 1.8 wide (1.8 / 1.3)',
      0.95,
    ) +
    t(
      pad,
      pad + n + 4.4,
      'one ink, squared cuts, no rose, no cardinal letters · ink height 30.0 units',
      0.95,
    );
  return markup({
    w: size,
    h: size,
    title: 'MAREA symbol construction grid (PROPOSED, internal)',
    desc: 'Construction drawing for the proposed MAREA bearing-index symbol on the 32-unit grid. Internal prototype; not cleared, not adopted.',
    body,
    color: '#12232e',
    uid: 'cgB',
  });
}
const gridLinesDim = (n, size, pad = 5.5) => {
  const parts = [];
  for (let i = 0; i <= n; i++) {
    parts.push(`M${f(pad + i)} 0V${f(size)}`, `M0 ${f(pad + i)}H${f(size)}`);
  }
  return parts;
};

/* --------------------------------------------------------------------- territories assets */
function buildTerritories() {
  const files = [];
  for (const dir of ['A', 'B', 'C']) {
    const def = MARKS[dir]();
    const comp = COMPACTS[dir]();
    files.push(
      write(
        path.join(TERR, `territory-${dir.toLowerCase()}-construction.svg`),
        fileSvg0(constructionMarkup(dir)),
      ),
    );
    files.push(
      write(
        path.join(TERR, `territory-${dir.toLowerCase()}-mark-mono.svg`),
        fileSvg0(
          markup({
            w: def.viewBox[0],
            h: def.viewBox[1],
            title: `Territory ${dir} ${def.name} — monochrome prototype symbol`,
            desc: 'Single-ink prototype symbol, PROPOSED / INTERNAL, not cleared.',
            body: markBody(def),
            color: INK,
            uid: `t${dir}m`,
          }),
        ),
      ),
    );
    files.push(
      write(
        path.join(TERR, `territory-${dir.toLowerCase()}-mark-reversed.svg`),
        fileSvg0(
          markup({
            w: def.viewBox[0],
            h: def.viewBox[1],
            title: `Territory ${dir} ${def.name} — reversed prototype symbol`,
            desc: 'Light-ink prototype symbol for dark substrates, PROPOSED / INTERNAL.',
            body: markBody(def),
            color: REV,
            uid: `t${dir}r`,
          }),
        ),
      ),
    );
    files.push(
      write(
        path.join(TERR, `territory-${dir.toLowerCase()}-mark-compact.svg`),
        fileSvg0(
          markup({
            w: comp.viewBox[0],
            h: comp.viewBox[1],
            title: `Territory ${dir} ${def.name} — reduced prototype symbol`,
            desc: 'Reduced small-size build of the prototype symbol, PROPOSED / INTERNAL.',
            body: markBody(comp),
            color: INK,
            uid: `t${dir}c`,
          }),
        ),
      ),
    );
    files.push(
      write(
        path.join(TERR, `territory-${dir.toLowerCase()}-lockup-primary.svg`),
        fileSvg0(lockupMarkup({ dir, color: INK, uid: `lk${dir}` })),
      ),
    );
    files.push(
      write(path.join(PROOF, `territory-${dir.toLowerCase()}-proof-sheet.html`), proofSheet(dir)),
    );
  }
  return files;
}

/* ------------------------------------------------------------------------ comparison page */
function buildComparison() {
  const dirs = ['A', 'B', 'C'];
  const head2 = head(
    'MC-04 · Visual identity · territory evaluation · D-01 evidence',
    'Territory comparison — three construction-level prototypes',
    'Side-by-side optical comparison used for the internal provisional shortlist. Weights and scores are in TERRITORY-COMPARISON.md; the recommendation is subject to Lead acceptance and a professional originality check (G3/B9 PENDING).',
  );
  const rows = dirs
    .map((d) => {
      const def = MARKS[d]();
      return `<tr><td><strong>${d} — ${def.name}</strong></td>
<td class="num">${thumbMark(def, 96, `cmp${d}96`)}</td>
<td class="num">${thumbMark(def, 48, `cmp${d}48`)}</td>
<td class="num">${thumbMark(def, 24, `cmp${d}24`)}</td>
<td class="num">${thumbMark(def, 16, `cmp${d}16`)}</td>
<td class="num">${thumbLockup(d, 300, `cmp${d}lk`)}</td></tr>`;
    })
    .join('');
  const summary = `| Criterion | Weight | A | B | C |\n|---|---:|---:|---:|---:|\n| C1 Marine-instrument credibility | 20% | 4.0 | 4.5 | 2.5 |\n| C2 Distinctiveness potential (subject to professional check) | 20% | 2.0 | 2.5 | 2.5 |\n| C3 Small-size legibility | 15% | 2.5 | 3.5 | 3.5 |\n| C4 System extensibility | 15% | 4.0 | 3.0 | 5.0 |\n| C5 Colour/monochrome independence | 10% | 5.0 | 5.0 | 5.0 |\n| C6 Cultural and language fit | 10% | 5.0 | 4.0 | 3.0 |\n| C7 Manufacturing feasibility | 10% | 3.0 | 4.0 | 5.0 |\n| **Weighted (of 5)** | 100% | **3.48** | **3.68** | **3.58** |`;
  const inner = `${head2}
<h2>1. Optical comparison at native size</h2>
<div class="panel"><table><thead><tr><th>Territory</th><th>96 px</th><th>48 px</th><th>24 px</th><th>16 px</th><th>Lockup (symbol + wordmark)</th></tr></thead><tbody>${rows}</tbody></table></div>
<p class="meta">The 16 px column is the deciding column: A loses its unequal contour intervals and reads as radiating wave/signal arcs (dropped); B keeps a legible arc + index but risks a "C" reading (shortlisted, preferred); C stays mechanically legible but reads as a bar chart/equaliser at 16–48 px (shortlisted, fails the small-size reading test, not preferred).</p>

<h2>2. Weighted score used for the shortlist</h2>
<pre class="meta">${esc(summary)}</pre>
<p class="meta">Arithmetic is shown term by term in <code>docs/marea/brand/TERRITORY-COMPARISON.md</code> §4. Scores are internal design assessments, not measurements and not any statement about legal distinctiveness. C8 (legal/search effort) is not scored; it is a gate (G3/B9 PENDING).</p>

<h2>3. Shortlist and internal preference</h2>
<p><strong>B — BEARING INDEX</strong> (shortlisted, <strong>PREFERRED_PROVISIONAL</strong>) and <strong>C — SIGNAL TRUNK</strong> (shortlisted, but fails the small-size reading test: bar chart/equaliser at 16–48 px) are the two constructions sent to a professional originality/prior-art check. <strong>A — ISOBATH</strong> is dropped on the §3.3 kill criterion (generic wave / signal-arc reading) and the lowest weighted score (3.48); it is retained only as documented rejected evidence.</p>
<p class="meta">The frozen master set in <code>assets/logo/</code> is reissued from the B construction (symbol ink on the cap band, 0.75 × cap ink gap, 0.5 × cap clear space, family token 0.70 × cap). C remains a documented rejected-for-preference alternative; it is not the master.</p>
<p class="note">Status: INTERNAL_PROPOSED. No adoption, no clearance, no publication. The preference is the Lead's decision and is conditional on G3/B9, which only a professional check can close.</p>

<h2>4. What this comparison does not prove</h2>
<ul>
<li>No physical engraving, silkscreen or moulding sample was produced; the 8 mm result is a simulated pixel reduction.</li>
<li>The 5-second sort classification is the designer's self-assessment; the independent reviewer sort (G1) has not been run.</li>
<li>Scores do not measure legal distinctiveness; prior-art clearance is PENDING and cannot be closed by an agent.</li>
<li>No user research, cockpit test or salt-spray test exists for any territory.</li>
</ul>

<footer>MC-04 · IdentityVector · generated by <code>territories/tools/build.mjs</code>. PROPOSED / INTERNAL. MAREA is a proposed brand: no ®, no ™, no registration or availability claim.</footer>`;
  return page('MC-04 — territory comparison (PROPOSED, internal)', inner);
}

/* ------------------------------------------------------------------------- misuse sheet */
function buildMisuse() {
  const tiles = [
    ['Stretch', 'Never scale the lockup non-proportionally.', 'transform:scaleX(1.5)'],
    [
      'Rotate',
      'The lockup is axis-built; rotation breaks the baseline.',
      'transform:rotate(-14deg)',
    ],
    ['Recolour', 'No gradient, no multi-colour, no neon; one ink only.', 'two inks'],
    ['Outline', 'Do not hollow or outline the letterforms.', 'inverted'],
    ['Opacity', 'Never place the lockup below full opacity.', 'opacity:.4'],
    ['Crowd', 'Respect 0.5× mark-height clear space on all sides.', 'no clear space'],
    ['Effects', 'No shadow, glow, bevel, texture or blur.', 'blur + shadow'],
    ['Add', 'Never add a tagline, year, certification or symbol inside the lockup.', 'added text'],
    [
      'Substitute',
      'Never rebuild the wordmark in a system font next to the symbol.',
      'font substitution',
    ],
  ];
  const grid = tiles
    .map(([t, why, how], i) => {
      const transform =
        i === 0
          ? 'transform:scaleX(1.5);transform-origin:left center'
          : i === 1
            ? 'transform:rotate(-14deg)'
            : i === 2
              ? 'color:#c0392b'
              : i === 3
                ? 'filter:invert(1)'
                : i === 4
                  ? 'opacity:.4'
                  : i === 5
                    ? 'padding:0;margin-left:-48px'
                    : i === 6
                      ? 'filter:blur(1.2px);box-shadow:0 6px 10px rgba(0,0,0,.4)'
                      : i === 7
                        ? 'align-items:flex-end'
                        : 'font:600 16px sans-serif;color:#17365d';
      const demo =
        i === 7
          ? `<div class="demo" style="${transform}">${thumbLockup('C', 160, `ms${i}`)}<span style="margin-left:-24px;margin-bottom:8px;font:600 10px sans-serif;color:#c0392b">SINCE 2026</span></div>`
          : i === 8
            ? `<div class="demo" style="${transform};align-items:center;gap:10px">${thumbMark(MARKS.C(), 40, `ms${i}a`)}<span>MAREA</span></div>`
            : `<div class="demo" style="${transform}">${thumbLockup('C', 160, `ms${i}`)}</div>`;
      return `<div class="tile">${demo}<div class="why">✕ ${esc(t)} — ${esc(why)}</div><div class="meta">${esc(how)}</div></div>`;
    })
    .join('');
  const inner = `${head(
    'MC-04 · Visual identity · misuse sheet · D-01 evidence',
    'MAREA lockup — misuse examples (do not reproduce)',
    'Each tile shows a prohibited treatment. The marks and wordmark are PROPOSED / INTERNAL artwork; misuse rules are normative in IDENTITY-SYSTEM.md §8.',
  )}
<h2>Prohibited treatments</h2><div class="misuse" style="grid-template-columns:repeat(auto-fill,minmax(230px,1fr))">${grid}</div>
<p class="note">Additional prohibitions: no EMBARCARTE logo stacked with MAREA (endorsement is text-only, after the clearance gate), no registered/™ symbol, no certification, award, seal or standard number, no invented year or heritage claim, no translation of MAREA or the family tokens.</p>
<footer>MC-04 · IdentityVector · generated by <code>territories/tools/build.mjs</code>. PROPOSED / INTERNAL. Not cleared, not adopted.</footer>`;
  return page('MC-04 — MAREA lockup misuse sheet (PROPOSED, internal)', inner);
}

/* ------------------------------------------------------------------------ case study */
function caseStudyFile() {
  const { upper, title } = titleCaseStudy();
  const pad = 16;
  const W = Math.max(upper.width, title.width) + pad * 2;
  const row1Y = 54;
  const row2Y = 188;
  const H = 338;
  const t = (x, y, s, size = 1.1, fill = '#54636f', weight = 400) =>
    `<text x="${f(x)}" y="${f(y)}" font-family="ui-monospace, Consolas, monospace" font-size="${f(size)}" fill="${fill}" font-weight="${weight}">${esc(s)}</text>`;
  const lowerBody = title.items
    .map(
      (it) =>
        `<g transform="translate(${f(it.x)} 0)">` +
        it.prims
          .map(
            (p) => `<path fill="currentColor" d="${typeof p === 'string' ? p : pathData([p])}"/>`,
          )
          .join('') +
        `</g>`,
    )
    .join('');
  const body =
    `<rect x="0" y="0" width="${f(W)}" height="${f(H)}" fill="${PAPER}"/>` +
    t(pad, 14, 'PROPOSED / INTERNAL — wordmark case study (MC-04)', 1.4, '#12232e', 600) +
    t(pad, 28, 'both rows are constructed from the same rules; only the case differs', 1.0) +
    t(
      pad,
      46,
      `UPPERCASE MASTER — ink width ${round2(upper.width)} / cap 100`,
      1.05,
      '#1776ad',
      600,
    ) +
    `<g transform="translate(${f(pad)} ${row1Y})"><path fill="currentColor" d="${pathData(upper.polys)}"/></g>` +
    t(
      pad,
      row2Y - 10,
      'TITLE-CASE ALTERNATIVE (evaluated, not adopted) — cap 100, x-height 70',
      1.05,
      '#a3471f',
      600,
    ) +
    `<path d="M${f(pad)} ${row2Y + 30}H${f(W - pad)}" stroke="#c9b8ac" stroke-width="0.7" stroke-dasharray="4 3"/>` +
    `<g transform="translate(${f(pad)} ${row2Y})">` +
    `<path fill="currentColor" d="${pathData(title.capM.polys)}"/>` +
    lowerBody +
    `</g>` +
    t(
      pad,
      row2Y + 122,
      `title-case ink width ${round2(title.width)}; x-height letters occupy 70% of cap height`,
      1.0,
    ) +
    t(
      pad,
      row2Y + 136,
      'Dashed line = x-height. Lowercase letters are 30% shorter than the cap, so the word loses presence at 16 px and in 8 mm engraving.',
      1.0,
    );
  return markup({
    w: round2(W),
    h: H,
    title:
      'MAREA wordmark case study — uppercase master vs title-case alternative (PROPOSED, internal)',
    desc: 'Comparison artwork for the required case evaluation: the proposed uppercase MAREA master and the evaluated title-case Marea alternative, both constructed from the same monoline rules.',
    body,
    color: INK,
    uid: 'cs',
  });
}

/* --------------------------------------------------------------------------------- main */
const out = [];
try {
  out.push(...buildCore());
  out.push(...buildTerritories());
  out.push(write(path.join(TERR, 'territory-comparison.html'), buildComparison()));
  out.push(write(path.join(TERR, 'misuse-examples.html'), buildMisuse()));
  out.push(write(path.join(TERR, 'wordmark-case-study.svg'), fileSvg0(caseStudyFile())));
  console.log(`wrote ${out.length} files`);
  for (const p of out) console.log('  ' + rel(p));
} catch (e) {
  console.error('BUILD FAILED:', e.stack || e.message);
  process.exitCode = 1;
}
