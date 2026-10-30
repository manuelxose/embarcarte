#!/usr/bin/env node
/**
 * Independent re-computation of the author's contrast matrix (D-07/D-08 evidence).
 * Re-implements the WCAG 2.x relative-luminance formula from the raw colour values in
 * evidence/contrast/contrast-matrix.json and compares every recomputed ratio with the
 * claimed ratio and re-derives the AA / internal pass classification and the summary.
 * Does not import or run scripts/check-contrast.mjs.
 * Writes docs/marea/brand/evidence/review/raw/contrast-independent.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'contrast-independent.json');
const matrixPath = join(ROOT, 'docs/marea/brand/evidence/contrast/contrast-matrix.json');
const tokenPath = join(ROOT, 'docs/marea/brand/tokens/marea-instrument-tokens.proposed.json');
const matrix = JSON.parse(readFileSync(matrixPath, 'utf8'));
const tokens = JSON.parse(readFileSync(tokenPath, 'utf8'));

function parseColor(value) {
  if (value === null || value === undefined) return null;
  const v = String(value).trim();
  if (v.startsWith('#')) {
    let hex = v.slice(1);
    if (hex.length === 3) hex = [...hex].map((c) => c + c).join('');
    if (hex.length === 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: 1,
      };
    }
    if (hex.length === 8) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
        a: parseInt(hex.slice(6, 8), 16) / 255,
      };
    }
  }
  const m = v.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/i);
  if (m) {
    return {
      r: Number(m[1]),
      g: Number(m[2]),
      b: Number(m[3]),
      a: m[4] === undefined ? 1 : Number(m[4]),
    };
  }
  return null;
}
const composite = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});
const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const luminance = (c) => 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);
const ratio = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
};

const issues = [];
const rows = [];
let aaMisses = 0;
let internalMisses = 0;
let pairCount = 0;
for (const mode of matrix.modes) {
  for (const pair of mode.pairs) {
    pairCount += 1;
    const fgRaw = parseColor(pair.fg);
    const bgRaw = parseColor(pair.bg);
    if (!fgRaw || !bgRaw) {
      issues.push({ id: pair.id, issue: 'unparseable colour', fg: pair.fg, bg: pair.bg });
      continue;
    }
    const bg = bgRaw.a < 1 ? composite(bgRaw, { r: 255, g: 255, b: 255, a: 1 }) : bgRaw;
    const fg = fgRaw.a < 1 ? composite(fgRaw, bg) : fgRaw;
    const computed = Math.round(ratio(fg, bg) * 10000) / 10000;
    const claimed = pair.ratio;
    const delta = Math.abs(computed - claimed);
    const aaPass = pair.aaThreshold === null ? null : computed >= pair.aaThreshold - 1e-9;
    const internalPass = pair.internalThreshold === null ? null : computed >= pair.internalThreshold - 1e-9;
    if (delta > 0.0002) {
      issues.push({ id: pair.id, issue: 'ratio mismatch', embedded: claimed, recomputed: computed, delta: Math.round(delta * 10000) / 10000 });
    }
    if (aaPass !== pair.aaPass) {
      issues.push({ id: pair.id, issue: 'aaPass mismatch', embedded: pair.aaPass, recomputed: aaPass, ratio: computed, threshold: pair.aaThreshold });
    }
    if (internalPass !== pair.internalPass) {
      issues.push({ id: pair.id, issue: 'internalPass mismatch', embedded: pair.internalPass, recomputed: internalPass, ratio: computed, threshold: pair.internalThreshold });
    }
    if (aaPass === false) aaMisses += 1;
    if (internalPass === false) internalMisses += 1;
    rows.push({
      id: pair.id,
      mode: pair.mode,
      kind: pair.kind,
      fg: pair.fg,
      bg: pair.bg,
      claimed,
      recomputed: computed,
      aaThreshold: pair.aaThreshold,
      aaPass,
      internalThreshold: pair.internalThreshold,
      internalPass,
    });
  }
}

// Cross-check the token file: every token value used by the matrix must appear in the mode tokens.
const tokenIssues = [];
for (const mode of matrix.modes) {
  const modeTokens = tokens.modes[mode.name]?.tokens ?? {};
  const values = new Set(Object.values(modeTokens).filter((v) => typeof v === 'string'));
  for (const pair of mode.pairs) {
    for (const [role, value] of [
      ['fg', pair.fg],
      ['bg', pair.bg],
    ]) {
      if (typeof value === 'string' && value.startsWith('#') && !values.has(value) && value !== '#ffffff' && value !== '#000000') {
        // Only report when the pair names a role that should map to the token file
        tokenIssues.push({ mode: mode.name, pair: pair.id, side: role, value, inTokenFile: false });
      }
    }
  }
}

const summary = {
  modes: matrix.modes.length,
  pairs: pairCount,
  aaMissesComputed: aaMisses,
  internalMissesComputed: internalMisses,
  aaMissesEmbedded: matrix.summary?.aaMisses,
  internalMissesEmbedded: matrix.summary?.internalMisses,
  pairsEmbedded: matrix.summary?.pairs,
  arithmeticMismatches: issues.filter((i) => i.issue === 'ratio mismatch').length,
  classificationMismatches: issues.filter((i) => i.issue.endsWith('mismatch') && i.issue !== 'ratio mismatch').length,
  otherIssues: issues.filter((i) => i.issue === 'unparseable colour').length,
  maxAbsDelta: rows.reduce((m, r) => Math.max(m, Math.abs(r.recomputed - r.claimed)), 0),
};

// Web-light focus-ring finding (F-1) check: what value does the token file propose for the
// website surface, and is a compliant candidate present anywhere?
const webLight = tokens.modes['web-light'];
const f1 = {
  webLightFocusRing: webLight?.tokens?.focusRing ?? null,
  webLightFocusRingPairs: rows.filter((r) => r.id.includes('focusRing') && r.mode === 'web-light'),
  compliantCandidateInInstrumentModes: Object.fromEntries(
    Object.entries(tokens.modes).map(([name, mode]) => [name, mode?.tokens?.focusRing ?? null]),
  ),
};

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/contrast-independent.mjs',
  generatedAt: new Date().toISOString(),
  formula: 'WCAG 2.x relative luminance, sRGB 0.03928 knee; ratio=(L1+0.05)/(L2+0.05); source-over alpha',
  matrixPath: 'docs/marea/brand/evidence/contrast/contrast-matrix.json',
  tokenPath: 'docs/marea/brand/tokens/marea-instrument-tokens.proposed.json',
  summary,
  issues,
  tokenValueTraceIssues: tokenIssues,
  f1,
  rows,
};
writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');

console.log('pairs embedded/recomputed:', summary.pairsEmbedded, '/', summary.pairs);
console.log('AA misses embedded/recomputed:', summary.aaMissesEmbedded, '/', summary.aaMissesComputed);
console.log('internal misses embedded/recomputed:', summary.internalMissesEmbedded, '/', summary.internalMissesComputed);
console.log('arithmetic mismatches:', summary.arithmeticMismatches, 'max delta:', summary.maxAbsDelta);
console.log('classification mismatches:', summary.classificationMismatches);
console.log('issues:', JSON.stringify(issues.slice(0, 10), null, 1));
console.log('token trace issues (distinct values):', [...new Set(tokenIssues.map((t) => `${t.mode}:${t.value}`))].slice(0, 20));
console.log('F-1 web-light focusRing:', f1.webLightFocusRing, '| instrument modes:', JSON.stringify(f1.compliantCandidateInInstrumentModes));
