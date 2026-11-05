#!/usr/bin/env node
/**
 * Independent MC-04 icon audit (reviewer-authored, not an author artifact).
 *
 * What it does:
 *  1. Strict XML parse of every SVG with the installed Chromium DOMParser
 *     (image/svg+xml) — reports parsererror nodes, not a regex guess.
 *  2. SVG hygiene checks against brief §10.5 / §9.2: viewBox, xmlns, no script,
 *     no <image>/embedded raster, no <filter>/<foreignObject>, no external href,
 *     no data: URIs, no event handlers, no <text>, single-ink currentColor only.
 *  3. Content semantics: root role=img, exactly one <title>, bilingual ES/EN title.
 *  4. Geometry: per-file grid bounds, stroke widths, coordinate precision,
 *     optical-padding violations, duplicate-geometry detection across the set.
 *  5. HTML companions: index.html icon/file coverage and reduction-proof.html
 *     claimed reduction variants.
 *
 * Reads only; writes one JSON report to the path given as argv[2].
 * Usage: node icon-audit.mjs <out.json>
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const ICON_DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'icon-audit.json');

const files = readdirSync(ICON_DIR)
  .filter((f) => f.endsWith('.svg'))
  .sort();
const svgs = files.map((file) => {
  const buf = readFileSync(join(ICON_DIR, file));
  const text = buf.toString('utf8');
  return { file, bytes: buf.length, text, validUtf8: !text.includes('\uFFFD') };
});

const browser = await chromium.launch({ headless: true });
let parsed;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  parsed = await page.evaluate((inputs) => {
    const out = [];
    for (const input of inputs) {
      const doc = new DOMParser().parseFromString(input.text, 'image/svg+xml');
      const errors = [...doc.getElementsByTagName('parsererror')].map((n) => n.textContent);
      const root = doc.documentElement;
      const all = [...doc.getElementsByTagName('*')].map((el) => {
        const attrs = {};
        for (const attr of el.attributes) attrs[attr.name] = attr.value;
        return { tag: el.tagName.toLowerCase(), attrs };
      });
      out.push({
        file: input.file,
        parserErrors: errors,
        root: root
          ? {
              tag: root.tagName.toLowerCase(),
              attrs: Object.fromEntries([...root.attributes].map((a) => [a.name, a.value])),
            }
          : null,
        elements: all,
        titleCount: doc.getElementsByTagName('title').length,
        titles: [...doc.getElementsByTagName('title')].map((n) => n.textContent),
      });
    }
    return out;
  }, svgs.map(({ file, text }) => ({ file, text })));
} finally {
  await browser.close();
}

// ---------- analysis helpers ----------
const SVG_NS = 'http://www.w3.org/2000/svg';
const NUM_RE = /-?\d+(?:\.\d+)?/g;
const COORD_ATTRS = [
  'x',
  'y',
  'x1',
  'y1',
  'x2',
  'y2',
  'cx',
  'cy',
  'r',
  'rx',
  'ry',
  'width',
  'height',
];
const COLOR_RE = /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(/;

function numsIn(value) {
  const m = value?.match(NUM_RE);
  return m ? m.map(Number) : [];
}

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/icon-audit.mjs',
  generatedAt: new Date().toISOString(),
  iconDir: 'docs/marea/brand/assets/icons/ui',
  count: svgs.length,
  totals: { parseErrors: 0, hygieneFailures: 0, semanticsFailures: 0, geometryFlags: 0 },
  files: [],
  htmlChecks: {},
};

const signatures = new Map();
for (const icon of parsed) {
  const rec = {
    file: icon.file,
    bytes: svgs.find((s) => s.file === icon.file).bytes,
    validUtf8: svgs.find((s) => s.file === icon.file).validUtf8,
    parserErrors: icon.parserErrors,
    viewBox: icon.root?.attrs?.viewBox ?? null,
    xmlns: icon.root?.attrs?.xmlns ?? null,
    role: icon.root?.attrs?.role ?? null,
    titleCount: icon.titleCount,
    title: icon.titles[0] ?? null,
    bilingualTitle: /\s\/\s/.test(icon.titles[0] ?? ''),
    tags: [...new Set(icon.elements.map((e) => e.tag))],
    forbidden: [],
    colors: [],
    strokeWidths: [],
    coordinateDecimals: [],
    outOfBounds: [],
    outsideOpticalPadding: [],
    hasText: false,
    elementCount: icon.elements.length - 1,
  };

  for (const el of icon.elements) {
    const { tag, attrs } = el;
    if (['script', 'image', 'filter', 'foreignobject', 'style', 'use', 'text', 'feImage'].includes(tag)) {
      if (tag === 'text') rec.hasText = true;
      if (tag === 'use') {
        // internal #ref is acceptable per brief naming conventions; external is not
        const href = attrs.href ?? attrs['xlink:href'] ?? '';
        if (!href.startsWith('#')) rec.forbidden.push(`<use> external ref ${href}`);
        continue;
      }
      rec.forbidden.push(`<${tag}>`);
    }
    for (const [name, value] of Object.entries(attrs)) {
      if (/^on/i.test(name)) rec.forbidden.push(`event handler ${name}`);
      if ((name === 'href' || name === 'xlink:href') && !value.startsWith('#')) {
        rec.forbidden.push(`external href ${value}`);
      }
      if (/url\(\s*['"]?(https?:|data:)/i.test(value)) rec.forbidden.push(`external/data url in ${name}`);
      if (name === 'fill' || name === 'stroke' || name === 'stop-color' || name === 'color') {
        rec.colors.push(value);
      }
      if (name === 'stroke-width') {
        for (const n of numsIn(value)) rec.strokeWidths.push(n);
      }
      if (COORD_ATTRS.includes(name)) {
        for (const n of numsIn(value)) {
          if (!Number.isInteger(n) && Math.abs(n * 100 - Math.round(n * 100)) > 1e-9) {
            rec.coordinateDecimals.push(`${name}=${n}`);
          }
          if (Math.abs(n) > 24) rec.outOfBounds.push(`${name}=${n}`);
          if (n < 2 || n > 22) rec.outsideOpticalPadding.push(`${name}=${n}`);
        }
      }
      if (name === 'points' || name === 'd') {
        for (const n of numsIn(value)) {
          if (Math.abs(n) > 24) rec.outOfBounds.push(`${name}:${n}`);
        }
      }
    }
    if (tag === 'g' || tag === 'svg') {
      // group-level defaults inspected above via attrs
    }
  }

  const colorSet = [...new Set(rec.colors)];
  const badColors = colorSet.filter((c) => !['none', 'currentColor', 'currentcolor'].includes(c) && COLOR_RE.test(c) === false && c !== 'none');
  const hardColors = colorSet.filter((c) => COLOR_RE.test(c));
  if (hardColors.length) rec.forbidden.push(`hard-coded colour ${hardColors.join(',')}`);
  rec.colors = colorSet;

  const strokeWidthSet = [...new Set(rec.strokeWidths)];
  const badStroke = strokeWidthSet.filter((w) => ![2, 1, 1.5, 2.5].includes(w));
  if (badStroke.length) rec.forbidden.push(`unexpected stroke-width ${badStroke.join(',')}`);

  // signature: canonical element/tag/attr multiset for duplicate detection
  const sig = icon.elements
    .slice(1)
    .map((el) => {
      const keys = Object.keys(el.attrs).sort();
      return `${el.tag}:${keys.map((k) => `${k}=${el.attrs[k]}`).join(';')}`;
    })
    .sort()
    .join('|');
  rec.geometrySignature = sig;
  if (signatures.has(sig)) {
    rec.duplicateOf = signatures.get(sig);
  } else {
    signatures.set(sig, icon.file);
  }

  // flags
  rec.flags = [];
  if (!rec.viewBox) rec.flags.push('missing viewBox');
  else if (rec.viewBox !== '0 0 24 24') rec.flags.push(`viewBox ${rec.viewBox}`);
  if (rec.xmlns !== SVG_NS) rec.flags.push('missing/incorrect xmlns');
  if (rec.role !== 'img') rec.flags.push('root role != img');
  if (rec.titleCount !== 1) rec.flags.push(`title count ${rec.titleCount}`);
  if (!rec.bilingualTitle) rec.flags.push('title not bilingual ES/EN');
  if (rec.forbidden.length) rec.flags.push(...rec.forbidden);
  if (rec.duplicateOf) rec.flags.push(`duplicate geometry of ${rec.duplicateOf}`);
  if (rec.hasText) rec.flags.push('contains text');

  if (rec.parserErrors.length) report.totals.parseErrors += 1;
  report.totals.hygieneFailures += rec.forbidden.length > 0 ? 1 : 0;
  if (
    !rec.viewBox ||
    rec.viewBox !== '0 0 24 24' ||
    rec.xmlns !== SVG_NS ||
    rec.role !== 'img' ||
    rec.titleCount !== 1 ||
    !rec.bilingualTitle
  ) {
    report.totals.semanticsFailures += 1;
  }
  if (rec.outOfBounds.length || rec.coordinateDecimals.length) report.totals.geometryFlags += 1;
  report.files.push(rec);
}

// ---------- cross-file geometry stats ----------
const allStrokeWidths = report.files.flatMap((f) => f.strokeWidths);
report.geometry = {
  strokeWidths: [...new Set(allStrokeWidths)].sort((a, b) => a - b),
  strokeWidthCounts: Object.fromEntries(
    [...new Set(allStrokeWidths)].map((w) => [w, allStrokeWidths.filter((x) => x === w).length]),
  ),
  filesWithOutOfBounds: report.files.filter((f) => f.outOfBounds.length).map((f) => ({
    file: f.file,
    outOfBounds: [...new Set(f.outOfBounds)],
  })),
  filesOutsideOpticalPadding: report.files
    .filter((f) => f.outsideOpticalPadding.length)
    .map((f) => ({ file: f.file, values: [...new Set(f.outsideOpticalPadding)] })),
  longDecimalCoordinates: report.files
    .filter((f) => f.coordinateDecimals.length)
    .map((f) => ({ file: f.file, values: [...new Set(f.coordinateDecimals)] })),
  filesWithForbidden: report.files
    .filter((f) => f.forbidden.length)
    .map((f) => ({ file: f.file, forbidden: f.forbidden })),
  duplicateGroups: [...signatures.entries()].length,
  nonBilingualTitles: report.files.filter((f) => !f.bilingualTitle).map((f) => f.title),
};

// ---------- HTML companions ----------
const indexPath = join(ICON_DIR, 'index.html');
const reductionPath = join(ICON_DIR, 'reduction-proof.html');
const indexHtml = readFileSync(indexPath, 'utf8');
const reductionHtml = readFileSync(reductionPath, 'utf8');
const referenced = [...indexHtml.matchAll(/assets\/icons\/ui\/([a-z0-9-]+\.svg)/g)].map((m) => m[1]);
const inlinedTitles = [...indexHtml.matchAll(/<title>([^<]*)<\/title>/g)].map((m) => m[1]);
const fileSet = new Set(files);
report.htmlChecks = {
  indexHtml: {
    bytes: Buffer.byteLength(indexHtml),
    embeddedSvgCount: (indexHtml.match(/<svg\b/g) ?? []).length,
    uniqueTitles: new Set(inlinedTitles).size,
    referencedFileLinks: [...new Set(referenced)],
    referencedLinksMissingOnDisk: [...new Set(referenced)].filter((f) => !fileSet.has(f)),
    iconsOnDiskNotReferenced: files.filter((f) => !referenced.includes(f)),
    flagsFound: (indexHtml.match(/class="flag">([^<]*)</g) ?? []).map((s) =>
      s.replace(/class="flag">/, '').replace(/<$/, ''),
    ),
    hasInternalProposed: /INTERNO[\s\S]{0,12}PROPUESTO/.test(indexHtml),
    hasRegisteredSymbol: /[®™]/.test(indexHtml),
    hasEcdiWord: /\bECDIS\b/i.test(indexHtml),
    hasCollisionAvoidance: /(?:evitaci[oó]n de colisiones|collision[- ]avoidance)/i.test(indexHtml),
    hasCertified: /(?:certificad|approved|certified|CLEARED|APPROVED)/i.test(indexHtml),
    hasUserResearchClaim: /(?:prueba de usuario|user test|usability test|probado con usuarios)/i.test(indexHtml),
    localeSwitches: (indexHtml.match(/lang="(?:es|en)"/g) ?? []).length,
    svgAriaHidden: (indexHtml.match(/aria-hidden="true"/g) ?? []).length,
  },
  reductionProofHtml: {
    bytes: Buffer.byteLength(reductionHtml),
    embeddedSvgCount: (reductionHtml.match(/<svg\b/g) ?? []).length,
    widthDeclarations: [...new Set((reductionHtml.match(/width:\s*\d+px/g) ?? []).map((s) => s.replace(/\s/g, '')))].sort(),
    has16: /(?:^|[^\d])16\s*px/.test(reductionHtml),
    has24: /(?:^|[^\d])24\s*px/.test(reductionHtml),
    has32: /(?:^|[^\d])32\s*px/.test(reductionHtml),
    has48: /(?:^|[^\d])48\s*px/.test(reductionHtml),
    iconsReferenced: [...new Set((reductionHtml.match(/assets\/icons\/ui\/([a-z0-9-]+\.svg)/g) ?? []))].length,
    hasInternalProposed: /INTERNO[\s\S]{0,12}PROPUESTO/.test(reductionHtml),
    hasRegisteredSymbol: /[®™]/.test(reductionHtml),
  },
};

writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');

// ---------- console summary ----------
console.log(`icons: ${report.count}`);
console.log(`parse errors: ${report.totals.parseErrors}`);
console.log(`hygiene failures: ${report.totals.hygieneFailures}`);
console.log(`semantics failures: ${report.totals.semanticsFailures}`);
console.log(`stroke widths: ${JSON.stringify(report.geometry.strokeWidthCounts)}`);
console.log(`out-of-bounds files: ${report.geometry.filesWithOutOfBounds.length}`);
console.log(`outside-2px-optical-padding files: ${report.geometry.filesOutsideOpticalPadding.length}`);
console.log(`long-decimal files: ${report.geometry.longDecimalCoordinates.length}`);
console.log(`forbidden files: ${JSON.stringify(report.geometry.filesWithForbidden)}`);
console.log(`non-bilingual titles: ${JSON.stringify(report.geometry.nonBilingualTitles)}`);
console.log(`duplicate groups: ${report.geometry.duplicateGroups}`);
console.log(`index embedded svg: ${report.htmlChecks.indexHtml.embeddedSvgCount} unique titles: ${report.htmlChecks.indexHtml.uniqueTitles}`);
console.log(`index flag classes: ${JSON.stringify(report.htmlChecks.indexHtml.flagsFound)}`);
console.log(`index referenced svg files present: ${report.htmlChecks.indexHtml.referencedLinksMissingOnDisk.length === 0}`);
console.log(`index icons on disk not referenced: ${report.htmlChecks.indexHtml.iconsOnDiskNotReferenced.length}`);
console.log(`reduction widths: ${JSON.stringify(report.htmlChecks.reductionProofHtml.widthDeclarations)}`);
