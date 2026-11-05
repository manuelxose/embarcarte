#!/usr/bin/env node
/**
 * Independent re-measurement of the two typography claims that MC-04 relies on:
 *   (a) installed DM Sans has no working tabular figures; Manrope does;
 *   (b) the required ES/PT/FR/EN glyphs are actually served by the installed faces.
 *
 * Deliberately written from scratch (not importing scripts/check-typography.mjs):
 *  - builds its own @font-face probe from the shipped woff2 files + shipped CSS unicode-ranges;
 *  - measures digit advance widths in Chromium at 100 px for normal / tabular-nums / 'tnum' 1;
 *  - does a glyph-coverage test by rasterising every required character and comparing its mask
 *    with the mask of a private-use codepoint (U+E000) that no face declares: identical masks
 *    mean the browser fell back to .notdef, i.e. the glyph is NOT served.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw');
mkdirSync(OUT, { recursive: true });

const PACKAGES = [
  { id: 'dm-sans', dir: join(ROOT, 'node_modules/@fontsource-variable/dm-sans'), family: 'IndepDM' },
  { id: 'manrope', dir: join(ROOT, 'node_modules/@fontsource-variable/manrope'), family: 'IndepManrope' },
];

// Reuse only the shipped CSS to know which woff2 file serves which unicode range — that is
// an input fact, not the author's measurement.
function facesFor(pkg) {
  const css = readFileSync(join(pkg.dir, 'index.css'), 'utf8');
  const faces = [];
  for (const block of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = block[1];
    const url = body.match(/url\(\s*([^)]+?)\s*\)/)?.[1]?.replace(/['"]/g, '').replace(/^\.\//, '');
    const range = body.match(/unicode-range:\s*([^;]+);/)?.[1];
    const display = body.match(/font-display:\s*([^;]+);/)?.[1]?.trim();
    if (!url || !range) continue;
    faces.push({ file: resolve(pkg.dir, url), unicodeRange: range, fontDisplay: display });
  }
  return faces;
}

const REQUIRED = [
  ...'0123456789:.,°%€−–—·×÷',
  ...'áéíóúüñÁÉÍÓÚÜÑ¿¡',
  ...'âãàêëôõçèîïûùœæ',
  ...'TMNWSEhP a k n',
];
const EXTRA_STRINGS = ['Marea alta', 'Profundidad', 'Babor', 'Estribor', 'Rumbo 045°', '6,4 kn', '18,5 °C', '¿Actualizar?', 'pingüino', 'Maré', 'Profundidade', 'Estibordo', 'Rumo', '6,4 nós', 'Marée', 'Profondeur', 'Bâbord', 'Cap', '6,4 nd', '045° T', '045° M', '1.234,5', '1,234.5', 'STALE 00:12', 'OFFLINE', 'NO DATA', '—', '−0,5', 'Ñandú', 'día', 'año'];

const faces = PACKAGES.map((p) => ({ ...p, faces: facesFor(p) }));
for (const pkg of faces) {
  for (const face of pkg.faces) {
    if (!existsSync(face.file)) throw new Error(`missing woff2 ${face.file}`);
  }
}

const css = faces
  .flatMap((pkg) => pkg.faces.map((f) => `@font-face{font-family:'${pkg.family}';font-style:normal;font-weight:100 1000;font-display:block;src:url("${pathToFileURL(f.file).href}") format("woff2-variations");unicode-range:${f.unicodeRange};}`))
  .join('\n');
const html = `<!doctype html><meta charset="utf-8"><style>${css}</style><body></body>`;
const htmlPath = join(OUT, 'indep-typography-probe.html');
writeFileSync(htmlPath, html, 'utf8');

const browser = await chromium.launch({ headless: true });
let result;
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
  result = await page.evaluate(
    async ({ families, required, strings }) => {
      const loadText = [...required, ...strings, '0123456789', 'U+E000'].join('');
      for (const family of families) {
        // Ensure the face is used
        await document.fonts.load(`700 100px "${family}"`, loadText);
      }
      await document.fonts.ready;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const maskOf = (char, family, size = 64) => {
        const w = size * 2;
        const h = size * 2;
        canvas.width = w;
        canvas.height = h;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#000';
        ctx.font = `700 ${size}px "${family}", serif`;
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(char, size / 2, size * 1.4);
        const data = ctx.getImageData(0, 0, w, h).data;
        const mask = [];
        for (let i = 0; i < data.length; i += 4) mask.push(data[i] < 128 ? 1 : 0);
        return mask;
      };
      const diff = (a, b) => {
        let d = 0;
        for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) d += 1;
        return d;
      };

      const widthAt = (text, family, size, css) => {
        const span = document.createElement('span');
        span.style.cssText = `position:absolute;white-space:pre;font-family:"${family}",serif;font-size:${size}px;font-weight:700;letter-spacing:0;line-height:1;${css}`;
        span.textContent = text;
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        span.remove();
        return width;
      };

      const digits = [...'0123456789'];
      const out = {};
      for (const family of families) {
        const missingMask = maskOf('\uE000', family);
        const coverage = [];
        for (const char of required) {
          const m = maskOf(char, family);
          const d = diff(m, missingMask);
          coverage.push({ char, diffFromNotdef: d, served: d > 12 });
        }
        const stringCoverage = strings.map((s) => {
          const gaps = [...s].filter((c) => {
            const d = diff(maskOf(c, family), missingMask);
            return d <= 12;
          });
          return { value: s, uncovered: [...new Set(gaps)] };
        });
        const variants = {
          normal: 'font-variant-numeric:normal;font-feature-settings:normal;',
          cssTabular: 'font-variant-numeric:tabular-nums;',
          featureTnum: "font-feature-settings:'tnum' 1;",
        };
        const widths = {};
        for (const [name, cssText] of Object.entries(variants)) {
          widths[name] = digits.map((d) => widthAt(d, family, 100, cssText));
        }
        const spreads = Object.fromEntries(
          Object.entries(widths).map(([k, v]) => [k, Math.round((Math.max(...v) - Math.min(...v)) * 1000) / 1000]),
        );
        const cols = [
          ['00:00', '23:59'],
          ['000°', '359°'],
          ['08.4 m', '18.4 m'],
        ].map(([a, b]) => {
          const deltas = [];
          const cssText = variants.cssTabular;
          for (let i = 1; i <= a.length; i += 1) {
            deltas.push(
              Math.abs(
                widthAt(a.slice(0, i), family, 100, cssText) -
                  widthAt(b.slice(0, i), family, 100, cssText),
              ),
            );
          }
          return { a, b, maxColumnDeltaPx: Math.round(Math.max(...deltas) * 1000) / 1000 };
        });
        out[family] = {
          coverageMissing: coverage.filter((c) => !c.served),
          coverageOkCount: coverage.filter((c) => c.served).length,
          coverageTotal: coverage.length,
          stringGaps: stringCoverage.filter((s) => s.uncovered.length),
          digitWidthsAt100: widths,
          digitSpreadPx: spreads,
          columnAlignment: cols,
          loaded: document.fonts.check(`700 100px "${family}"`, '0123456789'),
        };
      }
      return out;
    },
    { families: faces.map((f) => f.family), required: REQUIRED, strings: EXTRA_STRINGS },
  );
} finally {
  await browser.close();
}

// Licence facts read directly from disk (independent of the author script).
const licence = PACKAGES.map((pkg) => {
  const licenseText = readFileSync(join(pkg.dir, 'LICENSE'), 'utf8');
  const pj = JSON.parse(readFileSync(join(pkg.dir, 'package.json'), 'utf8'));
  return {
    id: pkg.id,
    packageVersion: pj.version,
    packageLicenseField: pj.license,
    licenseFirstLine: licenseText.split(/\r?\n/)[0],
    isOfl11: /SIL OPEN FONT LICENSE Version 1\.1/.test(licenseText),
    oflDocumentClausePresent:
      /remain under this license does not apply to any document created\s+using the Font Software/.test(
        licenseText,
      ),
    oflDocumentClauseWording: (
      licenseText.match(/The requirement for fonts to[\s\S]{0,140}?Font Software\./) ?? ['']
    )[0].replace(/\s+/g, ' '),
    reservedFontNameDeclared: /Reserved Font Name/i.test(licenseText.split(/\r?\n/)[0]),
    bytes: Buffer.byteLength(licenseText),
  };
});

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/typography-independent.mjs',
  generatedAt: new Date().toISOString(),
  method:
    'own @font-face from shipped woff2 + shipped unicode-range; Chromium 100px advance widths; notdef-mask coverage test (U+E000)',
  licence,
  measurements: result,
};
writeFileSync(join(OUT, 'typography-independent.json'), JSON.stringify(report, null, 2), 'utf8');
console.log(JSON.stringify({ licence, measurements: result }, null, 1));
