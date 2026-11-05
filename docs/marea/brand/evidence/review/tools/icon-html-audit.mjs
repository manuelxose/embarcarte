#!/usr/bin/env node
/**
 * Independent MC-04 icon proof-sheet audit (reviewer-authored).
 * Verifies, against the master SVGs on disk:
 *  - index.html inlines exactly the 57 masters, with matching geometry (not a stale copy)
 *  - every card carries ES/EN captions; SVG glyphs are aria-hidden
 *  - the byte total / max-byte claim in the document metadata
 *  - reduction-proof.html: which sizes are actually rendered, and whether the
 *    "reduced" variants are the same geometry scaled or genuinely simplified.
 * Reads only; writes JSON to argv[2].
 */
import { readFileSync, readdirSync, writeFileSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const DIR = join(ROOT, 'docs/marea/brand/assets/icons/ui');
const OUT =
  process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'icon-html-audit.json');

const files = readdirSync(DIR).filter((f) => f.endsWith('.svg')).sort();
const masterSizes = files.map((f) => statSync(join(DIR, f)).size);
const masterBytes = masterSizes.reduce((a, b) => a + b, 0);

// canonical geometry signature: element tag + sorted attribute map, ignoring presentation
// attributes that legitimately differ between master (role/title) and inline (aria-hidden).
const norm = (tag, attrs) => {
  const skip = new Set(['role', 'title', 'aria-hidden', 'focusable', 'xmlns', 'width', 'height']);
  const keys = Object.keys(attrs)
    .filter((k) => !skip.has(k))
    .sort();
  return `${tag}:${keys.map((k) => `${k}=${attrs[k]}`).join(';')}`;
};

function extractSvgGeometry(svgText) {
  const inner = svgText
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const elems = [];
  for (const m of inner.matchAll(/<([a-zA-Z][\w-]*)\s*([^>]*?)\/?>/g)) {
    const tag = m[1].toLowerCase();
    const attrs = {};
    for (const a of m[2].matchAll(/([\w:-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
    elems.push(norm(tag, attrs));
  }
  return elems.join('|');
}

const masters = new Map();
for (const f of files) {
  masters.set(f, extractSvgGeometry(readFileSync(join(DIR, f), 'utf8')));
}

function auditIndex() {
  const text = readFileSync(join(DIR, 'index.html'), 'utf8');
  const cards = [];
  const cardRe = /<figure class="icon-card">([\s\S]*?)<\/figure>/g;
  for (const m of text.matchAll(cardRe)) {
    const body = m[1];
    const svgMatch = body.match(/<svg[\s\S]*?<\/svg>/);
    const codeMatch = body.match(/<code>([^<]+)<\/code>/);
    const esMatch = body.match(/<span class="es"[^>]*>([^<]*)<\/span>/);
    const enMatch = body.match(/<span class="en"[^>]*>([^<]*)<\/span>/);
    cards.push({
      file: codeMatch ? codeMatch[1].trim() : null,
      es: esMatch ? esMatch[1].trim() : null,
      en: enMatch ? enMatch[1].trim() : null,
      svgAriaHidden: /aria-hidden="true"/.test(svgMatch?.[0] ?? ''),
      geometry: svgMatch ? extractSvgGeometry(svgMatch[0]) : null,
      note: (body.match(/<p class="note">[\s\S]*?<\/p>/)?.[0] ?? '').replace(/<[^>]+>/g, ' ').trim(),
    });
  }

  const missingMasters = cards.filter((c) => !c.file || !files.includes(c.file)).map((c) => c.file);
  const geometryMismatch = cards
    .filter((c) => c.file && masters.has(c.file) && masters.get(c.file) !== c.geometry)
    .map((c) => c.file);
  const cardFiles = new Set(cards.map((c) => c.file));
  const mastersWithoutCard = files.filter((f) => !cardFiles.has(f));
  const missingEs = cards.filter((c) => !c.es).map((c) => c.file);
  const missingEn = cards.filter((c) => !c.en).map((c) => c.file);
  const notAriaHidden = cards.filter((c) => !c.svgAriaHidden).map((c) => c.file);

  const declaredTotal = (text.match(/(\d[\d.]*)\s*B en total/) ?? [])[1] ?? null;
  const declaredMax = (text.match(/m[aá]x\.\s*(\d+)\s*B\/icono/) ?? [])[1] ?? null;

  // claim / status vocabulary scan
  const prose = text
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');
  const forbidden = {
    registeredSymbols: (text.match(/[®™]/g) ?? []).length,
    registeredWords: (prose.match(/registrad[ao]s?|marca registrada|registered (?:trade ?mark|brand)/gi) ?? []).length,
    certifiedWords: (prose.match(/certificad[ao]s?|\bcertified\b|\bapproved\b|\baprobad[ao]\b|\bCLEARED\b/g) ?? []).length,
    availabilityWords: (prose.match(/\bdisponible\b|\bcomprar\b|for sale|\ben venta\b|\bprecio\b|\bprice\b/gi) ?? []).length,
    ecdiClaims: (prose.match(/\bECDIS\b|S-52|ENC\b/g) ?? []).length,
    collisionAvoidance: (prose.match(/evitaci[oó]n de colisiones|collision[- ]avoidance/gi) ?? []).length,
    performanceFigures: (prose.match(/±\s?0[.,]\d|\bexactitud\b|\baccuracy\b|\btolerancia\b/gi) ?? []).length,
    userResearch: (prose.match(/prueba de usuario|user (?:test|research|study)|probado con usuarios|usuarios reales/gi) ?? []).length,
    safetyGuarantee: (prose.match(/navegaci[oó]n segura|garantiza|guaranteed|never miss/gi) ?? []).length,
    sinceYear: (prose.match(/desde 20\d\d|since 20\d\d|est\.\s*m{0,2}(?:xx|\d{2,4})/gi) ?? []).length,
  };

  const disclaimersPresent = {
    navigationES: /no sustituye a la carta náutica oficial/i.test(text),
    navigationEN: /does not replace official nautical charts/i.test(text),
    aisES: /recepción AIS es únicamente de escucha|no todos los buques emiten AIS/i.test(text),
    aisEN: /AIS reception is receive-only|not every vessel transmits AIS/i.test(text),
    pilotES: /asistido y supervisado|toma de control manual/i.test(text),
    pilotEN: /assisted and supervised|take manual control at all times/i.test(text),
    weatherES: /previsiones son probabilísticas|pueden desviarse de las condiciones/i.test(text),
    weatherEN: /Forecasts are probabilistic|may differ from actual local conditions/i.test(text),
  };

  return {
    bytes: Buffer.byteLength(text),
    cardCount: cards.length,
    iconsOnDisk: files.length,
    missingMasters,
    mastersWithoutCard,
    geometryMismatch,
    missingEs,
    missingEn,
    notAriaHidden,
    declaredTotal,
    actualTotal: masterBytes,
    declaredMax,
    actualMax: Math.max(...masterSizes),
    totalMatches: Number(declaredTotal) === masterBytes,
    maxMatches: Number(declaredMax) === Math.max(...masterSizes),
    flags: (text.match(/class="flag">([^<]*)</g) ?? []).map((s) =>
      s.replace('class="flag">', '').replace(/>$/, '').replace(/<$/, ''),
    ),
    forbidden,
    disclaimersPresent,
    bannedPatternsInCss: /gradient|backdrop-filter|box-shadow/.test(
      text.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? '',
    ),
    gradientCss: (text.match(/gradient\(/g) ?? []).length,
    langSwitches: (text.match(/lang="(es|en)"/g) ?? []).length,
    notes: cards.filter((c) => c.note).length,
  };
}

function auditReduction() {
  const text = readFileSync(join(DIR, 'reduction-proof.html'), 'utf8');
  const body = text;
  const prose = body
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ');

  // Inline variants: collect every <svg> with its ancestor size class if any.
  const svgBlocks = [...body.matchAll(/<svg[\s\S]*?<\/svg>/g)].map((m) => m[0]);
  const geoms = svgBlocks.map((s) => extractSvgGeometry(s));
  const distinctGeoms = new Set(geoms);

  // size labels actually rendered: parse width/height declarations on the svg or wrappers
  const sizes = [...new Set((body.match(/(?:width|height)\s*:\s*(\d+)px/g) ?? []).map((s) => +s.replace(/\D/g, '')))].sort(
    (a, b) => a - b,
  );
  // scale transforms / viewBox render size
  const renderSizes = [...new Set((body.match(/data-size="(\d+)"/g) ?? []).map((s) => +s.replace(/\D/g, '')))].sort(
    (a, b) => a - b,
  );
  const steps = [...new Set((body.match(/paso|step|reducci[oó]n|reduction/gi) ?? []))].length;

  // Does each master have a dedicated reduced variant (different geometry)?
  const masterGeomSet = new Set([...masters.values()]);
  const variantGeoms = [...distinctGeoms];
  const identicalToMaster = variantGeoms.filter((g) => masterGeomSet.has(g)).length;
  const simplifiedVariants = variantGeoms.filter((g) => !masterGeomSet.has(g)).length;

  return {
    bytes: Buffer.byteLength(text),
    svgCount: svgBlocks.length,
    distinctGeometries: distinctGeoms.size,
    identicalToMasterGeometry: identicalToMaster,
    simplifiedGeometries: simplifiedVariants,
    cssPxSizes: sizes,
    dataSizes: renderSizes,
    has16: sizes.includes(16) || renderSizes.includes(16),
    has24: sizes.includes(24) || renderSizes.includes(24),
    has32: sizes.includes(32) || renderSizes.includes(32),
    has48: sizes.includes(48) || renderSizes.includes(48),
    // Count explicit "16 px variant" descriptions
    variantMentions: (prose.match(/variante|variant/gi) ?? []).length,
    hasThickerStrokeVariant: /stroke-width="(?:2\.5|3)/.test(body),
    strokeWidthsPresent: [...new Set((body.match(/stroke-width="([\d.]+)"/g) ?? []).map((s) => s.replace(/\D/g, '')))],
    flags: (text.match(/class="flag">([^<]*)</g) ?? []).map((s) =>
      s.replace('class="flag">', '').replace(/>$/, '').replace(/<$/, ''),
    ),
    forbidden: {
      registeredSymbols: (text.match(/[®™]/g) ?? []).length,
      certifiedWords: (prose.match(/certificad[ao]s?|\bcertified\b|\bapproved\b|\bCLEARED\b/g) ?? []).length,
      userResearch: (prose.match(/prueba de usuario|user test|user research/gi) ?? []).length,
      ecdiClaims: (prose.match(/\bECDIS\b|S-52/g) ?? []).length,
    },
    hasInternalProposed: /INTERNO[\s\S]{0,12}PROPUESTO/.test(text),
    embedsExternalRefs: /(?:src|href)="https?:/.test(text),
  };
}

const result = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/icon-html-audit.mjs',
  generatedAt: new Date().toISOString(),
  masterIconCount: files.length,
  masterBytes,
  masterMaxBytes: Math.max(...masterSizes),
  index: auditIndex(),
  reductionProof: auditReduction(),
};
writeFileSync(OUT, JSON.stringify(result, null, 2), 'utf8');
console.log(JSON.stringify(result, null, 1));
