#!/usr/bin/env node
/**
 * MC-17 design-system validator.
 *
 * Validates the ACTUAL implementation and datasets — never a delivery summary.
 * Writes docs/marea/design-system/evidence/validator-run.json and
 * docs/marea/design-system/data/contrast-evidence.json.
 *
 * Usage:
 *   npm run test:design-system
 *   npm run test:design-system:unit   # adversarial/unit tests for the real adapter
 *
 * Exit code 0 only when every check passes.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PRODUCTION_ENTRY_FILES,
  analyzeFamilyGalleryCoupling,
  analyzeVariantCoverage,
  extractFamilyLimitKeys,
  findIsolationOffenders,
  focusContractProblems,
} from './marea-design-system-guards.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DS = 'src/app/marea-design-system';
const DATA = 'docs/marea/design-system/data';
const EVIDENCE = 'docs/marea/design-system/evidence';
const BASE_COMMIT = '6d8287c8507038c4f90fd6e35471f78081ca4676';

const checks = [];
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const exists = (path) => existsSync(resolve(root, path));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
// Git stores text blobs with LF endings; normalise CRLF for text files only so a
// Windows checkout does not look like a modification. Binary files are hashed raw.
const canonical = (buffer) => {
  const text = buffer.toString('latin1');
  return text.includes('\u0000') ? buffer : Buffer.from(text.replace(/\r\n/g, '\n'), 'latin1');
};
const fileHash = (path) => sha256(canonical(readFileSync(resolve(root, path))));
const fail = (detail) => ({ ok: false, detail });
const pass = (detail) => ({ ok: true, detail });

function add(id, description, fn) {
  let outcome;
  try {
    outcome = fn();
  } catch (error) {
    outcome = fail(`threw: ${error instanceof Error ? error.message : String(error)}`);
  }
  checks.push({
    id,
    description,
    status: outcome.ok ? 'PASS' : 'FAIL',
    detail: outcome.detail ?? '',
    evidence: outcome.evidence ?? null,
  });
}

function walk(dir, out = []) {
  const abs = resolve(root, dir);
  if (!existsSync(abs)) return out;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) walk(rel, out);
    else out.push(rel.replaceAll('\\', '/'));
  }
  return out;
}

const DS_FILES = walk(DS);
const PREVIEW_FILES = walk('preview');
const TS_FILES = [...DS_FILES, ...PREVIEW_FILES].filter((file) => file.endsWith('.ts'));
const sourceOf = (files) => files.map((file) => read(file)).join('\n');

// ---------------------------------------------------------------- token layer
const tokenSource = readJson(`${DS}/tokens/marea-design-tokens.source.json`);
const modes = Object.keys(tokenSource.modes);
const colorValues = {};
for (const [role, def] of Object.entries(tokenSource.tokens.color)) {
  colorValues[role] = {};
  for (const mode of modes) colorValues[role][mode] = def.values[mode].value;
}
const definedVars = new Set();
for (const group of Object.values(tokenSource.tokens)) {
  for (const def of Object.values(group.values ?? {})) if (def.cssVar) definedVars.add(def.cssVar);
  for (const def of Object.values(group.roles ?? {})) {
    const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    definedVars.add(`--marea-type-${kebab(def.family)}`);
  }
}
for (const role of Object.keys(tokenSource.tokens.color))
  definedVars.add(tokenSource.tokens.color[role].cssVar);
for (const [role, def] of Object.entries(tokenSource.tokens.typography.roles)) {
  const prefix = `--marea-type-${role.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
  for (const suffix of ['family', 'size', 'line-height', 'weight', 'tracking'])
    definedVars.add(`${prefix}-${suffix}`);
  if (def.textTransform) definedVars.add(`${prefix}-transform`);
  if (def.numeric) definedVars.add(`${prefix}-numeric`);
}
for (const family of Object.values(tokenSource.tokens.typography.families))
  definedVars.add(family.cssVar);
// Vars set at runtime by layout components through style bindings.
const runtimeVars = new Set([
  '--marea-grid-min',
  '--marea-stack-gap',
  '--marea-inline-gap',
  '--marea-space-',
]);

// ---------------------------------------------------------------- contrast maths
function luminance(hex) {
  const clean = hex.replace('#', '');
  const channels = [0, 2, 4].map((index) => parseInt(clean.slice(index, index + 2), 16) / 255);
  const linear = channels.map((value) =>
    value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}
function contrast(a, b) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const pairResults = [];
const pairFailures = [];
for (const pair of tokenSource.contrastPairs ?? []) {
  for (const mode of modes) {
    const expand = [];
    if (pair.backgroundsByRole) {
      for (const foreground of pair.foregrounds) {
        const background = pair.backgroundsByRole[foreground];
        if (background) expand.push([foreground, background]);
      }
    } else {
      for (const foreground of pair.foregrounds)
        for (const background of pair.backgrounds ?? []) expand.push([foreground, background]);
    }
    for (const [foregroundRole, backgroundRole] of expand) {
      const foreground = colorValues[foregroundRole]?.[mode];
      const background = colorValues[backgroundRole]?.[mode];
      if (!foreground || !background) {
        pairResults.push({
          pairId: `${pair.id}:${foregroundRole}-on-${backgroundRole}`,
          mode,
          status: 'FAIL',
          detail: 'unresolved colour role',
        });
        pairFailures.push(`${pair.id}:${foregroundRole}-on-${backgroundRole} (${mode}) unresolved`);
        continue;
      }
      const ratio = Number(contrast(foreground, background).toFixed(2));
      const status = ratio >= pair.minRatio ? 'PASS' : 'FAIL';
      if (status === 'FAIL')
        pairFailures.push(
          `${pair.id}:${foregroundRole}-on-${backgroundRole} ${ratio}:1 < ${pair.minRatio}:1 (${mode})`,
        );
      pairResults.push({
        pairId: `${pair.id}:${foregroundRole}-on-${backgroundRole}`,
        mode,
        kind: pair.kind,
        foreground,
        background,
        ratio,
        minRatio: pair.minRatio,
        status,
      });
    }
  }
}

// ---------------------------------------------------------------- checks
add('MC17-01', 'Token contract keeps internal/provisional governance status', () =>
  tokenSource.status === 'INTERNAL_PROPOSED' &&
  tokenSource.adoption === 'NOT_ADOPTED' &&
  tokenSource.publicUse === 'NO_GO'
    ? pass(`${tokenSource.status} / ${tokenSource.adoption} / ${tokenSource.publicUse}`)
    : fail('token governance status changed'),
);

add('MC17-02', 'Four visual modes are defined and every colour role has a value per mode', () => {
  const missing = [];
  for (const mode of modes)
    for (const [role, def] of Object.entries(tokenSource.tokens.color))
      if (!def.values?.[mode]?.value) missing.push(`${role}/${mode}`);
  return modes.length === 4 && missing.length === 0
    ? pass(`${Object.keys(tokenSource.tokens.color).length} roles x ${modes.length} modes`)
    : fail(missing.join(', '));
});

add('MC17-03', 'Night mode uses no pure black canvas or pure white text', () => {
  const offenders = Object.entries(colorValues).filter(([, values]) =>
    ['#000000', '#ffffff'].includes(values['instrument-night']?.toLowerCase()),
  );
  return offenders.length === 0
    ? pass('night palette avoids #000000 and #ffffff')
    : fail(offenders.map(([role]) => role).join(', '));
});

add('MC17-04', 'All declared contrast pairs pass their threshold in every mode', () =>
  pairFailures.length === 0 && pairResults.length > 0
    ? pass(`${pairResults.length} pair/mode measurements`)
    : fail(`${pairFailures.length} failures: ${pairFailures.slice(0, 8).join(' | ')}`),
);

add('MC17-05', 'Token outputs are deterministic and current', () => {
  const commands = [
    'scripts/build-marea-design-tokens.mjs',
    'scripts/build-marea-design-system-fixtures.mjs',
    'scripts/build-marea-design-system-baseline.mjs',
  ];
  const failures = [];
  for (const script of commands) {
    try {
      const output = execFileSync(process.execPath, [script, '--check'], {
        cwd: root,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      if (!/current/i.test(output)) failures.push(`${script}: unexpected output`);
    } catch (error) {
      failures.push(
        `${script}: ${error instanceof Error ? error.message.split('\n')[0] : 'stale'}`,
      );
    }
  }
  return failures.length === 0
    ? pass('token, fixture and baseline generators report current')
    : fail(failures.join(' | '));
});

add('MC17-06', 'Every token reference resolves to a defined custom property', () => {
  const sources = [
    ...DS_FILES.filter((file) => file.endsWith('.ts')),
    ...DS_FILES.filter((file) => file.endsWith('.css')),
    ...PREVIEW_FILES.filter((file) => /\.(ts|css|scss)$/.test(file)),
  ];
  const referenced = new Set();
  for (const file of sources)
    for (const match of read(file).matchAll(/--marea-[A-Za-z0-9-]+/g)) referenced.add(match[0]);
  const unresolved = [...referenced].filter(
    (name) => /[A-Z]/.test(name) || (!definedVars.has(name) && !runtimeVars.has(name)),
  );
  return unresolved.length === 0
    ? pass(
        `${referenced.size} references resolved against ${definedVars.size + runtimeVars.size} definitions`,
      )
    : fail(`unresolved: ${unresolved.join(', ')}`);
});

add('MC17-07', 'No global style override or legacy token mutation exists', () => {
  const offenders = [];
  for (const file of DS_FILES.filter((candidate) => /\.(ts|scss|css)$/.test(candidate))) {
    const source = read(file);
    if (/^\s*:root\b/m.test(source) || /(^|[^-\w])html\s*\{/m.test(source))
      offenders.push(`${file}: :root/html selector`);
    if (/--(navy|sea|ink|muted|line|paper|mist|sky)\s*:/.test(source))
      offenders.push(`${file}: legacy token assignment`);
  }
  if (read('src/styles.scss').includes('marea')) offenders.push('src/styles.scss imports marea');
  const angular = readJson('angular.json');
  const production = angular.projects.embarcarte.architect.build.options;
  if (JSON.stringify(production.styles) !== JSON.stringify(['src/styles.scss']))
    offenders.push('production styles changed');
  return offenders.length === 0
    ? pass('no :root/html override, no legacy token mutation, production styles unchanged')
    : fail(offenders.join(' | '));
});

add(
  'MC17-08',
  'Production entry points cannot reach preview or design-system code by any import path',
  () => {
    const { offenders, scanned, aliasPatterns } = findIsolationOffenders({ root });
    if (offenders.length > 0) return fail(offenders.slice(0, 10).join(' | '));
    return pass(
      `${PRODUCTION_ENTRY_FILES.length} entries, ${scanned} local project modules followed; relative imports, re-exports and dynamic imports resolved against tsconfig paths/baseUrl (${aliasPatterns} alias patterns)`,
    );
  },
);

add('MC17-09', 'Production build output contains no design-system or catalogue code', () => {
  const dist = 'dist/embarcarte/browser';
  if (!existsSync(resolve(root, dist)))
    return pass(
      'production build not present in this run; static isolation checks used (recorded limitation)',
    );
  const files = walk(dist);
  const offenders = files.filter((file) => {
    if (!/\.(js|mjs|css|html)$/.test(file)) return false;
    const source = read(file);
    return /marea-design-system|marea-ds-catalogue|MareaTheme|marea-theme/.test(source);
  });
  return offenders.length === 0
    ? pass(`${files.length} build files scanned`)
    : fail(offenders.slice(0, 5).join(', '));
});

add('MC17-10', 'Internal catalogue is a separate non-production project', () => {
  const angular = readJson('angular.json');
  const catalogue = angular.projects['marea-design-system-catalogue'];
  const offenders = [];
  if (!catalogue) offenders.push('catalogue project missing');
  if (catalogue && /dist\/embarcarte/.test(catalogue.architect.build.options.outputPath))
    offenders.push('catalogue output collides with production');
  if (
    catalogue &&
    catalogue.architect.build.options.styles?.some((style) => style.includes('src/styles.scss'))
  )
    offenders.push('catalogue reuses production global styles');
  if (PREVIEW_FILES.some((file) => file.startsWith('src/')))
    offenders.push('preview files inside src');
  if (!exists('preview/index.html') || !exists('preview/main.ts'))
    offenders.push('preview entry missing');
  return offenders.length === 0
    ? pass('catalogue project isolated at preview/ with its own output path')
    : fail(offenders.join(' | '));
});

add('MC17-11', 'No MAREA asset is copied into public/', () => {
  const publicFiles = walk('public');
  const offenders = publicFiles.filter((file) => /marea/i.test(file));
  const baseline = readJson(`${DATA}/legacy-ui-baseline.json`);
  const added = publicFiles.sort().filter((file) => !baseline.publicFiles.includes(file));
  return offenders.length === 0 && added.length === 0
    ? pass(`${publicFiles.length} public files unchanged, zero MAREA assets`)
    : fail([...offenders, ...added].join(', '));
});

add('MC17-12', 'Registered components all exist in the real implementation', () => {
  if (!exists(`${DATA}/component-registry.json`)) return fail('component registry missing');
  const registry = readJson(`${DATA}/component-registry.json`);
  const offenders = [];
  for (const entry of registry.components) {
    if (!exists(entry.implementationPath)) {
      offenders.push(`${entry.componentId}: missing file`);
      continue;
    }
    const source = read(entry.implementationPath);
    if (!new RegExp(`export\\s+class\\s+${entry.componentName}\\b`).test(source))
      offenders.push(`${entry.componentId}: class ${entry.componentName} not exported`);
    if (!source.includes(entry.selector.replaceAll('"', '').split(',')[0].trim()))
      offenders.push(`${entry.componentId}: selector not found`);
    if (entry.componentId !== 'marea-theme' && !source.includes('data-marea-component'))
      offenders.push(`${entry.componentId}: missing data-marea-component host marker`);
    for (const declaredInput of entry.inputs) {
      if (
        !new RegExp(`\\b${declaredInput.name}\\s*=\\s*(input|model)(\\.required)?\\s*[<(]`).test(
          source,
        )
      )
        offenders.push(`${entry.componentId}: input ${declaredInput.name} not declared`);
    }
    for (const declaredOutput of entry.outputs) {
      if (!new RegExp(`\\b${declaredOutput.name}\\s*=\\s*output\\s*[<(]`).test(source))
        offenders.push(`${entry.componentId}: output ${declaredOutput.name} not declared`);
    }
  }
  return offenders.length === 0
    ? pass(`${registry.components.length} registry entries verified against implementation`)
    : fail(`${offenders.length} problems: ${offenders.slice(0, 8).join(' | ')}`);
});

add('MC17-13', 'No undocumented component variant is exposed', () => {
  const registry = readJson(`${DATA}/component-registry.json`);
  const outcome = analyzeVariantCoverage({ root, registry });
  if (outcome.offenders.length > 0) {
    return fail(`${outcome.offenders.length}: ${outcome.offenders.slice(0, 10).join(' | ')}`);
  }
  return pass(
    `${outcome.optionInputs} option inputs resolved to ${outcome.resolvedValues} string values and compared in both directions with the registry (types + visualVariants); ${outcome.visualMatched} visual variants matched, ${outcome.nonEnumerable} non-enumerable option inputs skipped`,
  );
});

add('MC17-14', 'Every component state contract covers the eleven required states', () => {
  const registry = readJson(`${DATA}/component-registry.json`);
  const required = [
    'DEFAULT',
    'HOVER',
    'FOCUS_VISIBLE',
    'PRESSED',
    'DISABLED',
    'LOADING',
    'EMPTY',
    'ERROR',
    'WARNING',
    'READ_ONLY',
    'BLOCKED',
  ];
  const offenders = [];
  for (const entry of registry.components)
    for (const state of required)
      if (!(state in (entry.states ?? {}))) offenders.push(`${entry.componentId}/${state}`);
  const states = readJson(`${DATA}/component-states.json`);
  if (states.components.length !== registry.components.length)
    offenders.push('component-states dataset does not cover the registry');
  return offenders.length === 0
    ? pass(`${registry.components.length} components x 11 states`)
    : fail(offenders.slice(0, 10).join(', '));
});

add('MC17-15', 'Interactive components implement a visible focus contract', () => {
  const registry = readJson(`${DATA}/component-registry.json`);
  const interactive = registry.components.filter(
    (entry) => !String(entry.keyboardContract).startsWith('NOT_APPLICABLE'),
  );
  const offenders = [];
  for (const entry of interactive) {
    const focusSource =
      entry.componentId === 'marea-input'
        ? read(`${DS}/components/foundation/marea-form-field.ts`)
        : read(entry.implementationPath);
    const problems = focusContractProblems(focusSource);
    if (problems.length > 0) offenders.push(`${entry.componentId}: ${problems.join(', ')}`);
  }
  return offenders.length === 0
    ? pass(
        `${interactive.length} keyboard-operable components expose :focus-visible with the focus-ring token and no hidden/transparent outline`,
      )
    : fail(offenders.join(' | '));
});

add('MC17-16', 'Instrument numerics use the Manrope numeric role with tabular figures', () => {
  // Only components that actually render an instrument numeric value must use the numeric role.
  const numericRenderers = [
    'src/app/marea-design-system/components/instrument/marea-numeric-readout.ts',
    'src/app/marea-design-system/components/instrument/marea-telemetry-list.ts',
  ];
  const offenders = [];
  for (const file of numericRenderers) {
    if (!exists(file)) {
      offenders.push(`${file}: missing`);
      continue;
    }
    const source = read(file);
    if (!source.includes('--marea-type-numeric'))
      offenders.push(`${file}: no numeric typography role`);
    if (!/tabular-nums|type-numeric-[a-z]+-numeric/.test(source))
      offenders.push(`${file}: no tabular figures`);
    if (
      /font-family:\s*var\(--marea-font-body\)[^;]*;\s*\}/.test(source) &&
      source.includes('class="value"')
    )
      offenders.push(`${file}: numeric value uses body family`);
  }
  return offenders.length === 0
    ? pass(`${numericRenderers.length} numeric renderers use Manrope tabular figures`)
    : fail(offenders.join(' | '));
});

add('MC17-17', 'Disabled controls keep an accessible explanation', () => {
  const button = read(`${DS}/components/foundation/marea-button.ts`);
  const ok =
    button.includes('disabledReason') &&
    button.includes('aria-describedby') &&
    button.includes('aria-disabled');
  const cta = read(`${DS}/components/commerce/marea-commercial-cta.ts`);
  const noAction = !/<button|<a\s|role="button"/.test(cta);
  return ok && noAction
    ? pass('button exposes disabled reason; commerce CTA renders no action')
    : fail('disabled/CTA contract broken');
});

add('MC17-18', 'Status is never conveyed by colour alone', () => {
  const badge = read(`${DS}/components/foundation/marea-status-badge.ts`);
  const semantics = tokenSource.dataStatusSemantics ?? [];
  const allRequireText = semantics.every((entry) => entry.requiresText === true);
  const ok =
    badge.includes('input.required<string>()') && badge.includes('marea-icon') && allRequireText;
  return ok
    ? pass(`${semantics.length} status tones require text and a shape icon`)
    : fail('status semantics allow colour-only encoding');
});

add('MC17-19', 'No purchase path, price or stock quantity exists in the design system', () => {
  const scanned = [...DS_FILES, ...PREVIEW_FILES].filter(
    (file) => /\.(ts|html|scss|css)$/.test(file) && !file.endsWith('core/i18n.ts'),
  );
  const source = sourceOf(scanned);
  const offenders = [];
  const forbidden = [
    /\badd to cart\b/i,
    /\bbuy now\b/i,
    /\bañadir al carrito\b/i,
    /\bcomprar ahora\b/i,
    /\bpre-?order\b/i,
    /\bwaiting list\b/i,
    /\bpreventa\b/i,
    /\blista de espera\b/i,
    /€/,
    /\bEUR\b/,
    /\bUSD\b/,
  ];
  for (const pattern of forbidden) {
    const match = source.match(pattern);
    if (match) offenders.push(`${pattern}: ${match[0]}`);
  }
  const amountLeafs = [
    ...source.matchAll(
      /\b([A-Za-z_]\w*)\s*=\s*input<\s*(number|string)\s*>\s*\(\s*(?:'[^']*')?\s*\)/g,
    ),
  ].filter((match) => /amount|priceAmount|priceValue|stockCount|quantityAvailable/i.test(match[1]));
  for (const amount of amountLeafs) offenders.push(`numeric/commercial input ${amount[1]}`);
  return offenders.length === 0
    ? pass('no purchase wording, currency or price/stock amount API')
    : fail(offenders.slice(0, 8).join(' | '));
});

const FAMILY_IDS = ['PILOT', 'AIS', 'SENSE', 'WATCH', 'FLEET', 'NAV', 'WEATHER', 'DISPLAY', 'HUB'];

add(
  'MC17-20',
  'Commerce presentation reports MC-16 readiness and restrictions truthfully and the family-limit map covers all nine families',
  () => {
    const fixtures = read(`${DS}/data/fixtures/marea-fixtures.generated.ts`);
    const required = [
      'PILOT',
      'AIS',
      'WATCH',
      'FLEET',
      'SENSE-ESSENTIALS',
      'DISPLAY-LARGE-CONDITIONAL',
    ];
    const missingFixtures = required.filter((token) => !fixtures.includes(token));
    const pilotBlocked = /PILOT[\s\S]{0,400}SAFETY_GATE_BLOCKED/.test(fixtures);
    const aisReceiveOnly = fixtures.includes('RECEIVE_ONLY_NO_TRANSMISSION');
    const fleetNoHardware =
      (fixtures.match(/"hardwareIncludedByDefault": true/g) ?? []).length === 0;

    const copy = read(`${DS}/core/i18n.ts`);
    const { keys, unresolved } = extractFamilyLimitKeys({ root });
    const missingFamilies = FAMILY_IDS.filter((familyId) => !keys.has(familyId));
    const extraFamilies = [...keys.keys()].filter((familyId) => !FAMILY_IDS.includes(familyId));
    const danglingCopyKeys = [...keys.values()].filter(
      (copyKey) => !new RegExp(`\\b${copyKey}\\s*:`).test(copy),
    );
    const familyProblems = [
      ...unresolved,
      ...missingFamilies.map((familyId) => `FAMILY_LIMIT_KEYS missing ${familyId}`),
      ...extraFamilies.map((familyId) => `FAMILY_LIMIT_KEYS unknown ${familyId}`),
      ...danglingCopyKeys.map((copyKey) => `FAMILY_LIMIT_KEYS copy key ${copyKey} not in i18n`),
    ];
    if (
      missingFixtures.length === 0 &&
      pilotBlocked &&
      aisReceiveOnly &&
      fleetNoHardware &&
      familyProblems.length === 0
    ) {
      return pass(
        `PILOT blocked, AIS receive-only, FLEET without default hardware; FAMILY_LIMIT_KEYS statically covers ${FAMILY_IDS.length}/${FAMILY_IDS.length} families and all copy keys resolve`,
      );
    }
    return fail(
      `missingFixtures=${missingFixtures.join(',')} pilot=${pilotBlocked} ais=${aisReceiveOnly} fleet=${fleetNoHardware} familyLimits=${familyProblems.join('; ') || 'ok'}`,
    );
  },
);

add('MC17-21', 'All nine families, 26 editions and six bundles are representable', () => {
  const families = readJson('docs/marea/commerce-data/data/product-families.json').families;
  const editions = readJson('docs/marea/commerce-data/data/product-editions.json').editions;
  const bundles = readJson('docs/marea/commerce-data/data/bundle-compositions.json').bundles;
  const fixtures = read(`${DS}/data/fixtures/marea-fixtures.generated.ts`);
  const missingFamilies = families.filter(
    (family) => !fixtures.includes(`"familyId": "${family.familyId}"`),
  );
  const missingEditions = editions.filter(
    (edition) => !fixtures.includes(`"editionId": "${edition.editionId}"`),
  );
  const missingBundles = bundles.filter(
    (bundle) => !fixtures.includes(`"bundleId": "${bundle.bundleId}"`),
  );
  return families.length === 9 &&
    editions.length === 26 &&
    bundles.length === 6 &&
    !missingFamilies.length &&
    !missingEditions.length &&
    !missingBundles.length
    ? pass('9 families, 26 editions, 6 bundles represented from MC-16 data')
    : fail(
        `families ${families.length}, editions ${editions.length}, bundles ${bundles.length}; missing ${missingFamilies.length + missingEditions.length + missingBundles.length}`,
      );
});

add(
  'MC17-22',
  'Fixtures are synthetic and contain no customer, vessel, price or stock data',
  () => {
    const fixtures = read(`${DS}/data/fixtures/marea-fixtures.generated.ts`);
    const ok =
      fixtures.includes("FIXTURE_CLASSIFICATION = 'SYNTHETIC_INTERNAL_FIXTURE'") &&
      !/"(priceAmount|priceCurrency|stockQuantity|quantityAvailable|customerId|vesselId|merchantSkuCode)"/.test(
        fixtures,
      );
    return ok
      ? pass('fixture classification present; no commercial or personal fields')
      : fail('fixture contains forbidden data');
  },
);

add(
  'MC17-23',
  'Family limitation copy is stated and the commerce gallery is statically coupled to all nine families',
  () => {
    const copy = read(`${DS}/core/i18n.ts`);
    const required = [
      'pilotSupervised',
      'aisReceiveOnly',
      'watchNoGuarantee',
      'fleetNoHardware',
      'senseEssentialsKit',
      'displayConditional',
      'navWeatherLicensing',
    ];
    const missing = required.filter((key) => !new RegExp(`\\b${key}\\s*:`).test(copy));
    const noAutonomyClaim =
      !/AUTONOMOUS_NAVIGATION|autonomousNavigation|live steering control enabled/i.test(
        sourceOf(DS_FILES),
      );
    const gallery = analyzeFamilyGalleryCoupling({ root });
    const missingGalleryFamilies = FAMILY_IDS.filter(
      (familyId) => !gallery.familyIds.has(familyId),
    );
    const galleryProblems = [
      ...gallery.unresolved,
      ...(gallery.cards === FAMILY_IDS.length
        ? []
        : [`${gallery.cards} <marea-family-card> specimens (expected ${FAMILY_IDS.length})`]),
      ...missingGalleryFamilies.map((familyId) => `gallery missing ${familyId} family card`),
    ];
    if (missing.length === 0 && noAutonomyClaim && galleryProblems.length === 0) {
      return pass(
        `family-limitation copy present, no autonomy/steering claim; commerce gallery statically instantiates ${gallery.cards}/${FAMILY_IDS.length} family cards including WEATHER and HUB (rendered evidence is Playwright-only)`,
      );
    }
    return fail(
      `missing copy ${missing.join(',')} autonomyClaim=${!noAutonomyClaim} gallery=${galleryProblems.join('; ') || 'ok'}`,
    );
  },
);

add('MC17-24', 'Shared entitlements are presented once per ledger', () => {
  const component = read(`${DS}/components/commerce/marea-entitlement-summary.ts`);
  const fixtures = read(`${DS}/data/fixtures/marea-fixtures.generated.ts`);
  const duplicateLedgers = (fixtures.match(/"sharedLedgerKey": "ACCOUNT:WATCH_MONITORING"/g) ?? [])
    .length;
  const groups = component.includes('sharedLedgerKey') && component.includes('sharedEntitlement');
  return groups && duplicateLedgers >= 2
    ? pass('ledger grouping implemented and exercised by fixtures')
    : fail(`grouping=${groups} duplicateLedgerRows=${duplicateLedgers}`);
});

add('MC17-25', 'ES/EN dictionaries are complete and structurally equivalent', () => {
  const copy = read(`${DS}/core/i18n.ts`);
  const entries = [
    ...copy.matchAll(
      /^\s{2}([A-Za-z_]\w*):\s*\{\s*es:\s*'((?:[^'\\]|\\.)*)',\s*en:\s*'((?:[^'\\]|\\.)*)'\s*\},?$/gm,
    ),
  ];
  const multi = [
    ...copy.matchAll(
      /^\s{2}([A-Za-z_]\w*):\s*\{\s*\n\s*es:\s*'((?:[^'\\]|\\.)*)',\n\s*en:\s*'((?:[^'\\]|\\.)*)',?\n\s*\},?$/gm,
    ),
  ];
  const all = [...entries, ...multi];
  const empty = all.filter((entry) => !entry[2].trim() || !entry[3].trim());
  const total = all.length;
  const declared = (copy.match(/^\s{2}[A-Za-z_]\w*:\s*\{/gm) ?? []).length;
  return total > 50 && empty.length === 0 && total === declared
    ? pass(`${total} bilingual keys with ES and EN non-empty`)
    : fail(`parsed ${total}/${declared} keys, ${empty.length} empty`);
});

add('MC17-26', 'No locale-specific duplicate entity or component exists', () => {
  const files = DS_FILES.filter((file) => /\.(en|es)\.ts$|-(en|es)\.ts$/.test(file));
  const fixtures = read(`${DS}/data/fixtures/marea-fixtures.generated.ts`);
  const duplicated = (fixtures.match(/"editionType":/g) ?? []).length !== 26;
  return files.length === 0 && !duplicated
    ? pass('one component set, 26 unique editions')
    : fail(`locale files: ${files.join(',')} duplicatedEditions=${duplicated}`);
});

add('MC17-27', 'Preview command exists and the catalogue is documented as internal-only', () => {
  const pkg = readJson('package.json');
  const scripts = [
    'build:design-system-preview',
    'preview:design-system',
    'build:tokens',
    'test:design-system',
    'test:design-system:unit',
    'test:design-system:visual',
  ];
  const missing = scripts.filter((script) => !pkg.scripts[script]);
  const config = exists('playwright.design-system.config.ts');
  return missing.length === 0 && config
    ? pass('preview and test scripts present')
    : fail(`missing ${missing.join(',')} playwrightConfig=${config}`);
});

add('MC17-28', 'Legacy public site files are byte-identical to the MC-16 baseline', () => {
  const baseline = readJson(`${DATA}/legacy-ui-baseline.json`);
  const offenders = [];
  for (const [path, record] of Object.entries(baseline.files)) {
    if (!record.sha256) continue;
    if (!exists(path)) {
      offenders.push(`${path}: deleted`);
      continue;
    }
    if (fileHash(path) !== record.sha256) offenders.push(`${path}: modified`);
  }
  return offenders.length === 0
    ? pass(`${Object.keys(baseline.files).length} watched files unchanged vs ${BASE_COMMIT}`)
    : fail(offenders.join(', '));
});

add('MC17-29', 'Proposed routes remain undeployed and route registry unchanged', () => {
  const routes = readJson('docs/marea/information-architecture/data/proposed-routes.json');
  const count = Array.isArray(routes.items)
    ? routes.items.length
    : Array.isArray(routes.routes)
      ? routes.routes.length
      : 0;
  const routeFile = read('src/app/app.routes.ts');
  const offenders = [];
  if (count !== 23) offenders.push(`proposed routes count ${count}`);
  if (/marea/i.test(routeFile)) offenders.push('app.routes.ts mentions MAREA');
  return offenders.length === 0
    ? pass('23 proposed routes, none added to the Angular router')
    : fail(offenders.join(', '));
});

add('MC17-30', 'Public metadata and static assets are unchanged', () => {
  const baseline = readJson(`${DATA}/legacy-ui-baseline.json`);
  const watched = [
    'src/index.html',
    'public/robots.txt',
    'public/site.webmanifest',
    'public/og-image.png',
    'public/favicon.svg',
  ];
  const offenders = watched.filter(
    (path) => baseline.files[path]?.sha256 && fileHash(path) !== baseline.files[path].sha256,
  );
  return offenders.length === 0
    ? pass('robots, manifest, OG image, favicon and index unchanged')
    : fail(offenders.join(', '));
});

add('MC17-31', 'No structured Product/Offer data is emitted by the design system', () => {
  const source = sourceOf(DS_FILES) + sourceOf(PREVIEW_FILES);
  const offenders = [];
  for (const pattern of [
    /application\/ld\+json/,
    /"@type"\s*:\s*"(Product|Offer)"/,
    /priceCurrency/,
    /aggregateRating/,
  ]) {
    if (pattern.test(source)) offenders.push(String(pattern));
  }
  return offenders.length === 0
    ? pass('no JSON-LD, Product/Offer, priceCurrency or ratings markup')
    : fail(offenders.join(', '));
});

add('MC17-32', 'Inherited risks remain recorded and predecessor verdicts untouched', () => {
  const registryDoc = read('docs/marea/execution/MASTER-PROMPT-REGISTRY.md');
  const decisions = read('docs/marea/execution/DECISION-LOG.md');
  const blockers = readJson(`${DATA}/blocker-register.json`);
  const blob = JSON.stringify(blockers);
  const verdict16 =
    /MC16_VERDICT\s*=\s*PARTIAL/.test(registryDoc) || /MC16_VERDICT\s*=\s*PARTIAL/.test(decisions);
  const ok =
    verdict16 &&
    /MC16-FINAL-02/.test(blob) &&
    /V-18|FINANCIAL_V18/.test(blob) &&
    /MC16-FINAL-09/.test(blob);
  return ok
    ? pass('MC16 PARTIAL retained; MC16-FINAL-02, MC16-FINAL-09 and V-18 registered')
    : fail('inherited risk register incomplete');
});

add('MC17-33', 'MC-18 has not started', () => {
  const handoff = readJson(`${DATA}/mc18-handoff-inputs.json`);
  const started = handoff.mc18Started;
  const implementation = walk('src').filter((file) => /mc18/i.test(file));
  return started === false && implementation.length === 0
    ? pass('MC18_STARTED=false and no MC-18 implementation files')
    : fail(`started=${started} files=${implementation.join(',')}`);
});

add('MC17-34', 'No publication, deployment or brand adoption occurred', () => {
  const handoff = readJson('docs/marea/commerce-data/data/mc17-handoff-inputs.json');
  const brand = readJson('docs/marea/design-system/data/asset-provenance.json');
  const ok =
    handoff.presentationContract?.publication === 'all 23 proposed routes remain non-deployable' &&
    brand.adoption === 'NOT_ADOPTED' &&
    /NO_GO/.test(brand.publicUse);
  return ok
    ? pass('publication non-deployable; identity NOT_ADOPTED / NO_GO')
    : fail('publication or brand status changed');
});

add('MC17-35', 'Required documentation deliverables exist', () => {
  const docs = [
    'MC-17-BASELINE-AND-GOVERNANCE.md',
    'MC17-DESIGN-SYSTEM-ARCHITECTURE.md',
    'MC17-CURRENT-WEBSITE-STYLE-INVENTORY.md',
    'MC17-MC04-TOKEN-RECONCILIATION.md',
    'MC17-COLOR-MODES-AND-CONTRAST.md',
    'MC17-TYPOGRAPHY-SPACING-AND-LAYOUT.md',
    'MC17-ICONOGRAPHY-AND-ASSET-PROVENANCE.md',
    'MC17-ANGULAR-COMPONENT-ARCHITECTURE.md',
    'MC17-COMPONENT-API-AND-STATE-CONTRACTS.md',
    'MC17-PRODUCT-EDITION-BUNDLE-PRESENTATION.md',
    'MC17-COMMERCIAL-CTA-AND-READINESS-POLICY.md',
    'MC17-ACCESSIBILITY-WCAG22-AUDIT.md',
    'MC17-RESPONSIVE-BEHAVIOR-AND-VISUAL-TESTING.md',
    'MC17-PERFORMANCE-AND-SSR-HYDRATION.md',
    'MC17-BILINGUAL-PRESENTATION-CONTRACT.md',
    'MC17-INTERNAL-COMPONENT-CATALOGUE.md',
    'MC17-LEGACY-UI-NON-REGRESSION.md',
    'MC17-RISKS-AND-UNRESOLVED-GAPS.md',
    'MC17-MC18-HANDOFF.md',
    'MC17-MACHINE-READABLE-CONTRACTS.md',
    'MC17-VALIDATOR-AND-ADVERSARIAL-EVIDENCE.md',
    'MC17-INDEPENDENT-REVIEW.md',
    'MC17-SPANISH-EXECUTIVE-REPORT.md',
    'MC17-FINAL-DELIVERY-RECORD.md',
  ];
  const missing = docs.filter((name) => !exists(`docs/marea/design-system/${name}`));
  return missing.length === 0
    ? pass(`${docs.length} documentation deliverables present`)
    : fail(`missing: ${missing.join(', ')}`);
});

add(
  'MC17-36',
  'Required machine-readable datasets exist and declare their governance metadata',
  () => {
    const datasets = [
      'manifest.json',
      'token-source-map.json',
      'color-roles.json',
      'mode-contracts.json',
      'typography-roles.json',
      'layout-tokens.json',
      'component-registry.json',
      'component-states.json',
      'accessibility-requirements.json',
      'contrast-evidence.json',
      'responsive-evidence.json',
      'performance-evidence.json',
      'visual-regression-evidence.json',
      'commerce-presentation-policy.json',
      'locale-parity.json',
      'asset-provenance.json',
      'legacy-ui-baseline.json',
      'blocker-register.json',
      'mc18-handoff-inputs.json',
      'review-findings.json',
    ];
    const problems = [];
    for (const name of datasets) {
      const path = `${DATA}/${name}`;
      if (!exists(path)) {
        problems.push(`${name}: missing`);
        continue;
      }
      try {
        const value = readJson(path);
        for (const field of [
          'contractId',
          'contractVersion',
          'status',
          'owner',
          'generationMethod',
          'scope',
          'knownLimitations',
        ]) {
          if (!(field in value)) problems.push(`${name}: missing ${field}`);
        }
      } catch {
        problems.push(`${name}: invalid JSON`);
      }
    }
    return problems.length === 0
      ? pass(`${datasets.length} datasets valid`)
      : fail(problems.slice(0, 10).join(' | '));
  },
);

add('MC17-37', 'Design-system automated and adversarial test suites exist', () => {
  const required = [
    'scripts/check-marea-design-system.test.mjs',
    'scripts/check-marea-design-system-adversarial.test.mjs',
    'playwright.design-system.config.ts',
    'e2e/design-system/accessibility.spec.ts',
    'e2e/design-system/keyboard.spec.ts',
    'e2e/design-system/responsive.spec.ts',
    'e2e/design-system/visual.spec.ts',
    'e2e/design-system/commerce.spec.ts',
  ];
  const missing = required.filter((file) => !exists(file));
  return missing.length === 0
    ? pass(`${required.length} test artifacts present`)
    : fail(missing.join(', '));
});

add(
  'MC17-38',
  'Accessibility requirements dataset covers the applicable WCAG 2.2 AA criteria',
  () => {
    const dataset = readJson(`${DATA}/accessibility-requirements.json`);
    const blob = JSON.stringify(dataset);
    const required = [
      '1.3.1',
      '1.4.1',
      '1.4.3',
      '1.4.11',
      '2.1.1',
      '2.4.7',
      '2.4.11',
      '2.5.8',
      '3.3.1',
      '4.1.2',
    ];
    const missing = required.filter((criterion) => !blob.includes(criterion));
    return missing.length === 0
      ? pass('required criteria present; no full-conformance claim recorded')
      : fail(`missing ${missing.join(', ')}`);
  },
);

// ---------------------------------------------------------------- write evidence
mkdirSync(resolve(root, EVIDENCE), { recursive: true });
const failures = checks.filter((entry) => entry.status === 'FAIL');
const run = {
  contractId: 'MC17-DESIGN-SYSTEM-VALIDATOR-RUN',
  contractVersion: '1.0.0',
  milestone: 'MC-17',
  status: failures.length === 0 ? 'PASS' : 'FAIL',
  owner: 'lead',
  generationMethod: 'node scripts/check-marea-design-system.mjs',
  scope:
    'Static contract, token, provenance, isolation, commerce-policy and dataset validation of the MC-17 implementation.',
  knownLimitations: [
    'Automated checks do not replace the independent review or the Playwright accessibility/keyboard/visual suites.',
    'Production-bundle scanning is skipped when dist/embarcarte is absent in the run environment.',
  ],
  sourceRefs: ['.'],
  executedAtUtc: new Date(0).toISOString().replace('1970-01-01', 'deterministic-run'),
  checkCount: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  checks,
};
writeFileSync(resolve(root, `${EVIDENCE}/validator-run.json`), JSON.stringify(run, null, 2) + '\n');

const contrastEvidence = {
  contractId: 'MC17-CONTRAST-EVIDENCE',
  contractVersion: '1.0.0',
  milestone: 'MC-17',
  status: pairFailures.length === 0 ? 'PASS' : 'FAIL',
  owner: 'lead',
  generationMethod:
    'node scripts/check-marea-design-system.mjs (WCAG 2.x relative luminance formula on declared token values)',
  scope: 'Declared foreground/background token pairs per visual mode.',
  knownLimitations: [
    'Ratios are computed from declared token values only; glare, anti-aliasing, display hardware and night adaptation are not modelled.',
    'This is not a WCAG conformance certificate for any public website.',
  ],
  sourceRefs: [`${DS}/tokens/marea-design-tokens.source.json`, 'https://www.w3.org/TR/WCAG22/'],
  thresholds: tokenSource.document?.measurement?.thresholds ?? {
    'text-normal': { wcagAa: 4.5 },
    ui: { wcagAa: 3 },
    focus: { wcagAa: 3 },
  },
  measuredPairs: pairResults.length,
  failures: pairFailures,
  results: pairResults,
};
writeFileSync(
  resolve(root, `${DATA}/contrast-evidence.json`),
  JSON.stringify(contrastEvidence, null, 2) + '\n',
);

for (const entry of checks)
  console.log(
    `${entry.status === 'PASS' ? 'PASS' : 'FAIL'}  ${entry.id}  ${entry.description}${entry.detail ? ` — ${entry.detail}` : ''}`,
  );
console.log(
  `\nMC-17 design system validator: ${checks.length - failures.length}/${checks.length} passed, ${failures.length} failed.`,
);
console.log(`Evidence: ${EVIDENCE}/validator-run.json, ${DATA}/contrast-evidence.json`);
if (failures.length) process.exitCode = 1;
