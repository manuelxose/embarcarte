#!/usr/bin/env node
/**
 * Deterministic WCAG 2.x contrast verification for MC-04 (D-07/D-08, QA-01/QA-02).
 *
 * Method: WCAG 2.x relative-luminance formula on the sRGB channel values, exactly:
 *   c_srgb = c8 / 255
 *   c_lin  = c_srgb <= 0.03928 ? c_srgb / 12.92 : ((c_srgb + 0.055) / 1.055) ^ 2.4
 *   L      = 0.2126 R_lin + 0.7152 G_lin + 0.0722 B_lin
 *   ratio  = (L_lighter + 0.05) / (L_darker + 0.05)
 * Alpha values are composited source-over before measuring; no ratio is invented.
 *
 * The token file is the single source of truth for values and thresholds:
 *   docs/marea/brand/tokens/marea-instrument-tokens.proposed.json
 * Evidence is written to:
 *   docs/marea/brand/evidence/contrast/contrast-matrix.json
 *   docs/marea/brand/evidence/contrast/contrast-failures.json
 *
 * Gating:
 *   - Proposed instrument modes (day / sunlight / night) must meet BOTH the WCAG 2.2 AA minimum
 *     and the stricter internal MAREA target for every pair actually used.
 *   - The existing web-light baseline is WCAG-AA gated only (it predates MC-04 and no live CSS is
 *     changed here); its known internal-target misses are recorded as findings F-1…F-6.
 * Exit code 0 = no breach beyond the recorded, pre-existing baseline findings; 1 = breach.
 *
 * Usage: node scripts/check-contrast.mjs [--verbose]
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const VERBOSE = process.argv.includes('--verbose');
const TOKEN_RELATIVE = 'docs/marea/brand/tokens/marea-instrument-tokens.proposed.json';
const EVIDENCE_RELATIVE = 'docs/marea/brand/evidence/contrast';
const MATRIX_FILE = `${EVIDENCE_RELATIVE}/contrast-matrix.json`;
const FAILURES_FILE = `${EVIDENCE_RELATIVE}/contrast-failures.json`;

const REQUIRED_INSTRUMENT_ROLES = [
  'canvas',
  'surface',
  'surfaceRaised',
  'overlayScrim',
  'textPrimary',
  'textSecondary',
  'textMeta',
  'textOnAccent',
  'dataPrimary',
  'dataSecondary',
  'chartLine',
  'chartGrid',
  'stateCritical',
  'stateWarning',
  'stateSafe',
  'stateStale',
  'stateInfo',
  'action',
  'actionHover',
  'focusRing',
  'focusRingOnFill',
  'disabled',
];

// Every foreground/background pair the instrument roles are used on. Roles, not hex values.
const INSTRUMENT_PAIRS = [
  { fg: 'textPrimary', bg: 'canvas', kind: 'text-normal' },
  { fg: 'textPrimary', bg: 'surface', kind: 'text-normal' },
  { fg: 'textPrimary', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'textSecondary', bg: 'canvas', kind: 'text-normal' },
  { fg: 'textSecondary', bg: 'surface', kind: 'text-normal' },
  { fg: 'textSecondary', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'textMeta', bg: 'canvas', kind: 'text-normal' },
  { fg: 'textMeta', bg: 'surface', kind: 'text-normal' },
  { fg: 'textMeta', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'textPrimary', bg: 'canvas', kind: 'text-large' },
  { fg: 'dataPrimary', bg: 'canvas', kind: 'cockpit' },
  { fg: 'dataPrimary', bg: 'surface', kind: 'cockpit' },
  { fg: 'dataPrimary', bg: 'surfaceRaised', kind: 'cockpit' },
  { fg: 'dataSecondary', bg: 'canvas', kind: 'text-normal' },
  { fg: 'dataSecondary', bg: 'surface', kind: 'text-normal' },
  { fg: 'chartLine', bg: 'canvas', kind: 'ui-graphic' },
  { fg: 'chartLine', bg: 'surface', kind: 'ui-graphic' },
  { fg: 'chartGrid', bg: 'canvas', kind: 'ui' },
  { fg: 'chartGrid', bg: 'surface', kind: 'ui' },
  { fg: 'chartGrid', bg: 'surfaceRaised', kind: 'ui' },
  { fg: 'stateCritical', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateCritical', bg: 'surface', kind: 'text-normal' },
  { fg: 'stateCritical', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'stateWarning', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateWarning', bg: 'surface', kind: 'text-normal' },
  { fg: 'stateWarning', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'stateSafe', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateSafe', bg: 'surface', kind: 'text-normal' },
  { fg: 'stateSafe', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'stateStale', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateStale', bg: 'surface', kind: 'text-normal' },
  { fg: 'stateStale', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'stateInfo', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateInfo', bg: 'surface', kind: 'text-normal' },
  { fg: 'stateInfo', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'action', bg: 'canvas', kind: 'text-normal' },
  { fg: 'action', bg: 'surface', kind: 'text-normal' },
  { fg: 'action', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'actionHover', bg: 'surface', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'action', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'stateCritical', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'stateWarning', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'stateSafe', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'stateStale', kind: 'text-normal' },
  { fg: 'focusRing', bg: 'canvas', kind: 'focus' },
  { fg: 'focusRing', bg: 'surface', kind: 'focus' },
  { fg: 'focusRing', bg: 'surfaceRaised', kind: 'focus' },
  { fg: 'focusRingOnFill', bg: 'action', kind: 'focus' },
  { fg: 'focusRingOnFill', bg: 'stateCritical', kind: 'focus' },
  { fg: 'disabled', bg: 'canvas', kind: 'disabled' },
  { fg: 'disabled', bg: 'surface', kind: 'disabled' },
  { fg: 'disabled', bg: 'surfaceRaised', kind: 'disabled' },
  // Dimming layer: records the separation of the composited scrim from its canvas. No text or
  // data is ever placed on the scrim (brief §5.8), so this is informational, not gated.
  { fg: 'overlayScrim', bg: 'canvas', kind: 'decorative' },
  { fg: 'overlayScrim', bg: 'surface', kind: 'decorative' },
];

// Existing website tokens and component pairs actually used in src/styles.scss, measured as the
// pre-existing baseline. `expectedFinding` marks a miss already documented in the MC-04 brief and
// must not be reported as an unexpected regression.
const WEB_PAIRS = [
  { fg: 'textPrimary', bg: 'canvas', kind: 'text-normal' },
  { fg: 'textPrimary', bg: 'surface', kind: 'text-normal' },
  { fg: 'textPrimary', bg: 'surfaceRaised', kind: 'text-normal' },
  { fg: 'textSecondary', bg: 'canvas', kind: 'text-normal' },
  { fg: 'textSecondary', bg: 'surface', kind: 'text-normal', expectedFinding: 'F-6' },
  { fg: 'textSecondary', bg: 'surfaceRaised', kind: 'text-normal', expectedFinding: 'F-6' },
  { fg: 'textMeta', bg: 'surface', kind: 'text-normal', expectedFinding: 'F-6' },
  { fg: 'sea', bg: 'canvas', kind: 'text-normal', expectedFinding: 'F-5' },
  { fg: 'sea', bg: 'surface', kind: 'text-normal', expectedFinding: 'F-5' },
  { fg: 'seaStrong', bg: 'canvas', kind: 'text-normal' },
  { fg: 'seaStrong', bg: 'surface', kind: 'text-normal' },
  { fg: 'action', bg: 'surface', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'seaButton', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'navy2', kind: 'text-normal' },
  { fg: 'textOnAccent', bg: 'focusRing', kind: 'decorative' },
  { fg: 'stateCritical', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateSafe', bg: 'canvas', kind: 'text-normal' },
  { fg: 'stateWarning', bg: 'badgeWarningBg', kind: 'text-normal' },
  { fg: 'stateSafe', bg: 'badgeSafeBg', kind: 'text-normal', expectedFinding: 'F-7' },
  { fg: 'stateCritical', bg: 'badgeCriticalBg', kind: 'text-normal', expectedFinding: 'F-7' },
  { fg: 'stateStale', bg: 'badgeOffBg', kind: 'text-normal' },
  { fg: 'stateCritical', bg: 'canvas', kind: 'cockpit', expectedFinding: 'F-4' },
  { fg: 'stateSafe', bg: 'canvas', kind: 'cockpit', expectedFinding: 'F-4' },
  { fg: 'themeColor', bg: 'canvas', kind: 'text-large' },
  { fg: 'focusRing', bg: 'canvas', kind: 'focus', expectedFinding: 'F-1' },
  { fg: 'focusRing', bg: 'surface', kind: 'focus', expectedFinding: 'F-1' },
  { fg: 'focusRing', bg: 'surfaceRaised', kind: 'focus', expectedFinding: 'F-1' },
  { fg: 'line', bg: 'canvas', kind: 'decorative' },
];

const failures = [];
const warnings = [];
const knownFindings = [];
const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const round4 = (value) => Math.round(value * 10000) / 10000;

// --- Colour maths -----------------------------------------------------------

function parseColor(value) {
  if (typeof value !== 'string') throw new Error(`colour must be a string, got ${typeof value}`);
  const text = value.trim();
  const hexMatch = text.match(/^#([0-9a-fA-F]{6})$/);
  if (hexMatch) {
    const int = parseInt(hexMatch[1], 16);
    return {
      r: (int >> 16) & 0xff,
      g: (int >> 8) & 0xff,
      b: int & 0xff,
      a: 1,
      source: text,
    };
  }
  const rgbaMatch = text.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+)\s*)?\)$/,
  );
  if (rgbaMatch) {
    const channel = (raw) => {
      const number = Number(raw);
      if (!Number.isInteger(number) || number < 0 || number > 255) {
        throw new Error(`invalid colour channel ${raw}`);
      }
      return number;
    };
    return {
      r: channel(rgbaMatch[1]),
      g: channel(rgbaMatch[2]),
      b: channel(rgbaMatch[3]),
      a: rgbaMatch[4] === undefined ? 1 : Number(rgbaMatch[4]),
      source: text,
    };
  }
  throw new Error(`unsupported colour value ${JSON.stringify(value)} (expected #rrggbb or rgba())`);
}

const composite = (foreground, background) => {
  const alpha = foreground.a;
  return {
    r: foreground.r * alpha + background.r * (1 - alpha),
    g: foreground.g * alpha + background.g * (1 - alpha),
    b: foreground.b * alpha + background.b * (1 - alpha),
    a: 1,
    source: `composite(${foreground.source} over ${background.source})`,
  };
};

const linearChannel = (channel8) => {
  const value = channel8 / 255;
  return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const relativeLuminance = (color) =>
  0.2126 * linearChannel(color.r) +
  0.7152 * linearChannel(color.g) +
  0.0722 * linearChannel(color.b);

const contrastRatio = (foreground, background) => {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
};

// --- Load and validate the token file --------------------------------------

const tokenAbsolute = join(ROOT, TOKEN_RELATIVE);
const tokenBytes = readFileSync(tokenAbsolute);
const tokens = JSON.parse(tokenBytes.toString('utf8'));
if (!tokens || typeof tokens !== 'object') {
  console.error(`FATAL: ${TOKEN_RELATIVE} is not a JSON object`);
  process.exit(1);
}
const tokenSha256 = sha256(tokenBytes);
const thresholds = tokens.document?.measurement?.thresholds;
if (!thresholds || typeof thresholds !== 'object') {
  failures.push('token file does not declare document.measurement.thresholds');
}
const modes = tokens.modes;
if (!modes || typeof modes !== 'object') {
  failures.push('token file does not declare modes');
}

const getMode = (name) => modes?.[name];
for (const required of ['web-light', 'instrument-day', 'instrument-sunlight', 'instrument-night']) {
  if (!getMode(required)) failures.push(`token file is missing mode ${required}`);
}

// Proposed instrument modes must carry every required role; web-light maps existing tokens instead.
for (const name of ['instrument-day', 'instrument-sunlight', 'instrument-night']) {
  const mode = getMode(name);
  if (!mode?.tokens) {
    failures.push(`${name}: tokens are missing`);
    continue;
  }
  for (const role of REQUIRED_INSTRUMENT_ROLES) {
    if (!(role in mode.tokens)) failures.push(`${name}: required token ${role} is missing`);
  }
  if (name === 'instrument-night') {
    for (const [role, value] of Object.entries(mode.tokens)) {
      if (typeof value === 'string' && ['#000000', '#ffffff'].includes(value.toLowerCase())) {
        failures.push(
          `${name}: token ${role} uses forbidden extreme ${value} (halation rule §5.8)`,
        );
      }
    }
  }
}

// --- Evaluation -------------------------------------------------------------

const evaluatePair = ({ modeName, mode, spec, index }) => {
  const foregroundValue = mode.tokens?.[spec.fg];
  const backgroundValue = mode.tokens?.[spec.bg];
  if (foregroundValue === null || foregroundValue === undefined) {
    return {
      id: `${modeName}:${spec.fg}-on-${spec.bg}:${index}`,
      mode: modeName,
      fgRole: spec.fg,
      bgRole: spec.bg,
      kind: spec.kind,
      skipped: true,
      reason: `token ${spec.fg} is not defined in ${modeName}`,
    };
  }
  if (backgroundValue === null || backgroundValue === undefined) {
    throw new Error(`${modeName}: background token ${spec.bg} must exist`);
  }
  const rawBackground = parseColor(backgroundValue);
  if (rawBackground.a !== 1) {
    throw new Error(`${modeName}: background token ${spec.bg} must be opaque`);
  }
  const rawForeground = parseColor(foregroundValue);
  const background = rawBackground;
  const foreground = rawForeground.a === 1 ? rawForeground : composite(rawForeground, background);
  const ratio = round4(contrastRatio(foreground, background));
  const threshold = thresholds[spec.kind] ?? { wcagAa: null, internal: null };
  const aaThreshold = threshold.wcagAa;
  const internalThreshold = threshold.internal;
  const aaPass = aaThreshold === null ? null : ratio >= aaThreshold;
  const internalPass = internalThreshold === null ? null : ratio >= internalThreshold;
  const compound = rawForeground.a !== 1 ? composite(rawForeground, background) : null;
  return {
    id: `${modeName}:${spec.fg}-on-${spec.bg}:${index}`,
    mode: modeName,
    fgRole: spec.fg,
    bgRole: spec.bg,
    kind: spec.kind,
    fg: foregroundValue,
    bg: backgroundValue,
    effectiveFg: compound
      ? `rgb(${Math.round(foreground.r)}, ${Math.round(foreground.g)}, ${Math.round(foreground.b)})`
      : null,
    ratio,
    aaThreshold,
    aaPass,
    internalThreshold,
    internalPass,
    expectedFinding: spec.expectedFinding ?? null,
    verdict:
      aaThreshold === null && internalThreshold === null
        ? 'RECORD_ONLY'
        : aaPass === false && internalPass === false
          ? 'AA_AND_INTERNAL_FAIL'
          : aaPass === false
            ? 'AA_FAIL'
            : internalPass === false
              ? 'INTERNAL_FAIL'
              : 'PASS',
  };
};

const modeResults = [];
for (const name of ['web-light', 'instrument-day', 'instrument-sunlight', 'instrument-night']) {
  const mode = getMode(name);
  if (!mode?.tokens) continue;
  const specs = name === 'web-light' ? WEB_PAIRS : INSTRUMENT_PAIRS;
  const pairs = specs.map((spec, index) => evaluatePair({ modeName: name, mode, spec, index }));
  const gated = pairs.filter((pair) => !pair.skipped);
  const aaMisses = gated.filter((pair) => pair.aaPass === false);
  const internalMisses = gated.filter((pair) => pair.internalPass === false);
  const gate = name === 'web-light' ? 'aa' : 'aa+internal';
  const modeFailures = [];
  for (const pair of gated) {
    const expected = pair.expectedFinding;
    if (pair.aaPass === false && !expected) {
      modeFailures.push(
        `${pair.id}: ${pair.ratio}:1 below WCAG AA ${pair.aaThreshold}:1 (${pair.kind})`,
      );
    }
    if (pair.aaPass === false && expected) {
      knownFindings.push({
        finding: expected,
        pair: `${pair.fgRole} on ${pair.bgRole}`,
        ratio: pair.ratio,
        threshold: pair.aaThreshold,
        standard: 'wcag-aa',
        mode: name,
      });
    }
    if (pair.internalPass === false) {
      if (expected) {
        knownFindings.push({
          finding: expected,
          pair: `${pair.fgRole} on ${pair.bgRole}`,
          ratio: pair.ratio,
          threshold: pair.internalThreshold,
          standard: 'internal',
          mode: name,
        });
      } else if (gate === 'aa+internal') {
        modeFailures.push(
          `${pair.id}: ${pair.ratio}:1 below internal ${pair.internalThreshold}:1 (${pair.kind})`,
        );
      } else {
        warnings.push(
          `${pair.id} misses the internal target (${pair.ratio}:1 < ${pair.internalThreshold}:1) but is not a WCAG-AA breach; baseline recorded`,
        );
      }
    }
    if (expected && pair.aaPass !== false && pair.internalPass !== false) {
      warnings.push(`${pair.id}: expected finding ${expected} is not reproduced (pair passes)`);
    }
  }
  failures.push(...modeFailures);
  const byKind = {};
  for (const pair of gated) {
    if (pair.verdict === 'RECORD_ONLY') continue;
    byKind[pair.kind] ??= {
      count: 0,
      minRatio: Infinity,
      minPair: null,
      internalThreshold: pair.internalThreshold,
    };
    byKind[pair.kind].count += 1;
    if (pair.ratio < byKind[pair.kind].minRatio) {
      byKind[pair.kind].minRatio = pair.ratio;
      byKind[pair.kind].minPair = `${pair.fgRole} on ${pair.bgRole}`;
    }
  }
  modeResults.push({
    name,
    title: mode.appliesTo ?? name,
    status: mode.status ?? null,
    appliedInRepository: mode.appliedInRepository ?? null,
    gate,
    pairCount: gated.length,
    passCount: gated.filter((pair) => pair.verdict === 'PASS' || pair.verdict === 'RECORD_ONLY')
      .length,
    aaMissCount: aaMisses.length,
    internalMissCount: internalMisses.length,
    kindSummary: byKind,
    pairs,
    failures: modeFailures,
  });
}

// --- Evidence ---------------------------------------------------------------

const environment = {
  node: process.version,
  platform: process.platform,
  checkedAt: new Date().toISOString(),
};
const matrix = {
  documentId: tokens.document?.id ?? 'MC-04 / D-08',
  status: 'INTERNAL_PROPOSED',
  conformanceClaim: 'NONE — measured design-review evidence, not a WCAG conformance claim',
  method: {
    standard:
      'WCAG 2.x relative luminance and contrast ratio (the formula axe/contrast checkers use)',
    formula:
      'L = 0.2126R+0.7152G+0.0722B (sRGB linearised, 0.03928 knee); ratio = (L1+0.05)/(L2+0.05)',
    alpha: 'source-over compositing before measurement',
    rounding: '4 decimal places',
  },
  environment,
  tokenFile: { path: TOKEN_RELATIVE, sha256: tokenSha256, bytes: tokenBytes.length },
  thresholds,
  modes: modeResults,
  knownFindings,
  warnings,
  summary: {
    modes: modeResults.length,
    pairs: modeResults.reduce((total, mode) => total + mode.pairCount, 0),
    aaMisses: modeResults.reduce((total, mode) => total + mode.aaMissCount, 0),
    internalMisses: modeResults.reduce((total, mode) => total + mode.internalMissCount, 0),
    knownFindings: knownFindings.length,
    failures: failures.length,
  },
  result: failures.length === 0 ? 'PASS' : 'FAIL',
};
const failureDocument = {
  documentId: matrix.documentId,
  status: 'INTERNAL_PROPOSED',
  environment,
  tokenFile: matrix.tokenFile,
  method: matrix.method,
  result: matrix.result,
  failures,
  knownFindings,
  warnings,
  summary: matrix.summary,
};

const evidenceDir = join(ROOT, EVIDENCE_RELATIVE);
mkdirSync(evidenceDir, { recursive: true });
writeFileSync(join(ROOT, MATRIX_FILE), `${JSON.stringify(matrix, null, 2)}\n`, 'utf8');
writeFileSync(join(ROOT, FAILURES_FILE), `${JSON.stringify(failureDocument, null, 2)}\n`, 'utf8');

// --- Report -----------------------------------------------------------------

const verdictFor = (pair) => {
  if (pair.skipped) return `SKIP (${pair.reason})`;
  if (pair.verdict === 'PASS') return 'PASS';
  if (pair.expectedFinding) return `${pair.verdict} — KNOWN ${pair.expectedFinding}`;
  return pair.verdict;
};

console.log('MC-04 contrast verification — WCAG 2.x relative luminance');
console.log(`Token file : ${TOKEN_RELATIVE}`);
console.log(`Token sha256: ${tokenSha256}`);
console.log(`Evidence   : ${MATRIX_FILE}, ${FAILURES_FILE}`);
console.log(`Environment: node ${environment.node}, ${environment.platform}`);
console.log('');
console.log('Thresholds (from the token file, §5.5 of the brief):');
for (const [kind, threshold] of Object.entries(thresholds)) {
  console.log(
    `  ${kind.padEnd(12)} AA ${threshold.wcagAa === null ? 'exempt' : `${threshold.wcagAa}:1`}  internal ${threshold.internal === null ? 'exempt' : `${threshold.internal}:1`}`,
  );
}
console.log('');
for (const mode of modeResults) {
  console.log(`## ${mode.name} — ${mode.title}`);
  console.log(
    `   gate=${mode.gate} valueStatus=${mode.status} appliedInRepository=${mode.appliedInRepository}`,
  );
  console.log(
    `   pairs=${mode.pairCount} pass=${mode.passCount} aaMiss=${mode.aaMissCount} internalMiss=${mode.internalMissCount}`,
  );
  for (const [kind, summary] of Object.entries(mode.kindSummary)) {
    console.log(
      `   ${kind.padEnd(12)} n=${String(summary.count).padStart(2)} tightest ${summary.minRatio.toFixed(2)}:1 (internal ${summary.internalThreshold}:1) — ${summary.minPair}`,
    );
  }
  for (const failure of mode.failures) console.log(`   FAIL ${failure}`);
  if (VERBOSE) {
    console.log('   pairs:');
    for (const pair of mode.pairs) {
      console.log(
        `     ${String(pair.ratio).padEnd(7)} ${pair.kind.padEnd(12)} ${pair.fgRole} on ${pair.bgRole} → ${verdictFor(pair)}`,
      );
    }
  }
  console.log('');
}
if (knownFindings.length > 0) {
  console.log('Known pre-existing baseline findings (recorded, not regressions):');
  for (const finding of knownFindings) {
    console.log(
      `  ${finding.finding} ${finding.pair} = ${finding.ratio}:1 (target ${finding.threshold}:1, ${finding.standard}, ${finding.mode})`,
    );
  }
  console.log('');
}
for (const warning of warnings) console.log(`WARN  ${warning}`);
for (const failure of failures) console.log(`FAIL  ${failure}`);
console.log('');
console.log(
  `Summary: ${matrix.summary.pairs} pairs measured across ${matrix.summary.modes} modes; ${matrix.summary.aaMisses} AA miss(es), ${matrix.summary.internalMisses} internal-target miss(es), ${matrix.summary.knownFindings} known baseline finding(s), ${failures.length} failure(s).`,
);
console.log(`RESULT: ${matrix.result}`);

process.exitCode = failures.length === 0 ? 0 : 1;
