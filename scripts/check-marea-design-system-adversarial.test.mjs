/**
 * MC-17 adversarial tests for the REAL fail-closed presentation adapter and
 * one positive control per rule. The adapter is TypeScript with type-only
 * imports, so Node 24 can execute it directly through type stripping.
 *
 * Run: npm run test:design-system:unit
 */
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  deriveCommercialPresentation,
  deriveCtaState,
  restrictionCopyKey,
  sanitizeCtaState,
} from '../src/app/marea-design-system/data/commerce-presentation.adapter.ts';
import {
  analyzeVariantCoverage,
  findIsolationOffenders,
  focusContractProblems,
} from './marea-design-system-guards.mjs';

const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url));
const REGISTRY_PATH = 'docs/marea/design-system/data/component-registry.json';
const registry = JSON.parse(readFileSync(join(REPO_ROOT, REGISTRY_PATH), 'utf8'));

const CLOSED = {
  releaseGateOpen: false,
  buyCtaAllowed: false,
  cartAllowed: false,
  priceVisible: false,
  availabilityVisible: false,
  ctaState: 'DISABLED',
  restrictions: [],
};

test('positive control: a closed gate with a well-formed input stays closed and quiet', () => {
  const result = deriveCommercialPresentation(CLOSED);
  assert.equal(result.purchaseActionAllowed, false);
  assert.equal(result.cartAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  assert.deepEqual(result.blockedSignals, []);
  assert.equal(result.ctaState, 'DISABLED');
});

test('unauthorised purchase signal is inverted and reported', () => {
  const result = deriveCommercialPresentation({ ...CLOSED, buyCtaAllowed: true });
  assert.equal(result.purchaseActionAllowed, false);
  assert.deepEqual(result.blockedSignals, ['BUY_CTA']);
});

test('cart, price and availability signals are all blocked', () => {
  const result = deriveCommercialPresentation({
    ...CLOSED,
    cartAllowed: true,
    priceVisible: true,
    availabilityVisible: true,
  });
  assert.equal(result.cartAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  assert.deepEqual(result.blockedSignals, ['CART', 'PRICE_VISIBILITY', 'AVAILABILITY_VISIBILITY']);
});

test('malformed CTA state fails closed to NOT_AVAILABLE', () => {
  const hostile = { ...CLOSED, ctaState: 'PURCHASE' };
  assert.equal(deriveCommercialPresentation(hostile).ctaState, 'NOT_AVAILABLE');
  assert.equal(
    deriveCommercialPresentation({ ...CLOSED, ctaState: undefined }).ctaState,
    'NOT_AVAILABLE',
  );
  assert.equal(sanitizeCtaState(42), 'NOT_AVAILABLE');
  assert.equal(sanitizeCtaState(null), 'NOT_AVAILABLE');
});

test('an open gate flag cannot create a purchase action in MC-17', () => {
  const result = deriveCommercialPresentation({
    ...CLOSED,
    releaseGateOpen: true,
    buyCtaAllowed: true,
    priceVisible: true,
    availabilityVisible: true,
    ctaState: 'QUOTE_ONLY',
  });
  assert.equal(result.purchaseActionAllowed, false);
  assert.equal(result.priceVisible, false);
  assert.equal(result.availabilityVisible, false);
  // With the gate open the signals are not reported as neutralised, but the invariants still hold.
  assert.deepEqual(result.blockedSignals, []);
  assert.equal(result.ctaState, 'QUOTE_ONLY');
});

test('restrictions are deduplicated and preserved', () => {
  const result = deriveCommercialPresentation({
    ...CLOSED,
    restrictions: ['PRICE_NOT_APPROVED', 'PRICE_NOT_APPROVED', 'PUBLICATION_NOT_AUTHORIZED'],
  });
  assert.deepEqual(result.restrictions, ['PRICE_NOT_APPROVED', 'PUBLICATION_NOT_AUTHORIZED']);
});

test('CTA derivation follows the documented precedence', () => {
  assert.equal(
    deriveCtaState({
      definitionStatus: 'DEFINED',
      editionType: 'SOFTWARE_SUBSCRIPTION',
      requiresQuotation: false,
    }),
    'DISABLED',
  );
  assert.equal(
    deriveCtaState({
      definitionStatus: 'CONDITIONAL',
      editionType: 'HARDWARE_DEVICE',
      requiresQuotation: false,
    }),
    'COMING_SOON',
  );
  assert.equal(
    deriveCtaState({
      definitionStatus: 'INSTALLATION_PACKAGE',
      editionType: 'INSTALLATION_PACKAGE',
      requiresQuotation: true,
    }),
    'QUOTE_ONLY',
  );
  assert.equal(
    deriveCtaState({
      definitionStatus: 'DEFINED',
      editionType: 'HARDWARE_SYSTEM',
      requiresQuotation: false,
      contractedSolution: true,
    }),
    'QUOTE_ONLY',
  );
  assert.equal(
    deriveCtaState({
      definitionStatus: 'DEFINED',
      editionType: 'SOFTWARE_SUBSCRIPTION',
      requiresQuotation: false,
      informational: true,
    }),
    'REQUEST_INFORMATION',
  );
  assert.equal(
    deriveCtaState({ definitionStatus: 'RETIRED', editionType: 'X', requiresQuotation: false }),
    'NOT_AVAILABLE',
  );
  assert.equal(deriveCtaState(null), 'NOT_AVAILABLE');
});

test('safety-blocked entities never derive a purchase state', () => {
  for (const state of [
    'DISABLED',
    'COMING_SOON',
    'REQUEST_INFORMATION',
    'QUOTE_ONLY',
    'NOT_AVAILABLE',
  ]) {
    const result = deriveCommercialPresentation({
      ...CLOSED,
      ctaState: state,
      restrictions: ['SAFETY_GATE_BLOCKED'],
    });
    assert.equal(result.purchaseActionAllowed, false);
    assert.ok(
      ['DISABLED', 'COMING_SOON', 'REQUEST_INFORMATION', 'QUOTE_ONLY', 'NOT_AVAILABLE'].includes(
        result.ctaState,
      ),
    );
  }
});

test('every restriction maps to an existing bilingual copy key', () => {
  const copy = readFileSync(
    new URL('../src/app/marea-design-system/core/i18n.ts', import.meta.url),
    'utf8',
  );
  const kinds = [
    'PUBLICATION_NOT_AUTHORIZED',
    'TRADEMARK_NOT_CLEARED',
    'SAFETY_GATE_BLOCKED',
    'LICENSING_NOT_CLEARED',
    'COMPATIBILITY_UNTESTED',
    'PRICE_NOT_APPROVED',
    'STOCK_NOT_VERIFIED',
    'BRAND_PROVISIONAL',
  ];
  for (const kind of kinds) {
    const key = restrictionCopyKey(kind);
    assert.match(
      copy,
      new RegExp(`\\b${key}:\\s*\\{`),
      `${kind} → ${key} missing from copy dictionary`,
    );
  }
});

test('contracts expose no price or stock amount field', () => {
  const types = readFileSync(
    new URL('../src/app/marea-design-system/core/types.ts', import.meta.url),
    'utf8',
  );
  const forbidden = [
    /priceAmount\s*:/,
    /priceCurrency\s*:/,
    /stockQuantity\s*:/,
    /availabilityCount\s*:/,
    /quantityAvailable\s*:/,
    /deliveryEstimate\s*:/,
    /checkoutUrl\s*:/,
  ];
  for (const pattern of forbidden) assert.ok(!pattern.test(types), `contract leaks ${pattern}`);
  assert.match(types, /readonly priceVisible: boolean/);
  assert.match(types, /readonly availabilityVisible: boolean/);
});

test('commerce CTA component renders no interactive purchase control', () => {
  const cta = readFileSync(
    new URL(
      '../src/app/marea-design-system/components/commerce/marea-commercial-cta.ts',
      import.meta.url,
    ),
    'utf8',
  );
  assert.ok(!/<button|<a\s|role="button"|href=/i.test(cta), 'CTA must not render an action');
  assert.ok(
    !/buyCtaAllowed|cartAllowed|priceVisible|availabilityVisible/.test(cta),
    'CTA must consume the derived presentation, not raw signals',
  );
});

// ---------------------------------------------------------------- MC17-08 isolation guard

function withTempDirectory(build) {
  const root = mkdtempSync(join(tmpdir(), 'marea-guards-'));
  try {
    build(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function writeTree(root, files) {
  for (const [path, content] of Object.entries(files)) {
    const absolutePath = join(root, path);
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, content);
  }
}

function isolationOffenders(files, tsconfig = '{}') {
  let result;
  withTempDirectory((root) => {
    writeTree(root, { 'tsconfig.app.json': tsconfig, ...files });
    result = findIsolationOffenders({ root, entryFiles: ['src/main.ts'] });
  });
  return result;
}

test('isolation guard detects relative, re-exported and dynamic preview imports', () => {
  for (const entry of [
    "import '../preview/main';\n",
    "export * from '../preview/main';\n",
    "const lazy = () => import('../preview/main');\nvoid lazy;\n",
  ]) {
    const { offenders } = isolationOffenders({
      'src/main.ts': entry,
      'preview/main.ts': 'export const specimen = true;\n',
    });
    assert.ok(
      offenders.some((offender) => offender.includes('preview/main.ts')),
      `not detected: ${entry.trim()} -> ${offenders.join(' | ')}`,
    );
  }
});

test('isolation guard resolves tsconfig paths aliases (JSONC) into preview', () => {
  const tsconfig = `/* JSONC comment tolerated */
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@catalogue/*": ["preview/*"] },
  },
}
`;
  const { offenders, aliasPatterns } = isolationOffenders(
    {
      'src/main.ts': "import '@catalogue/main';\n",
      'preview/main.ts': 'export const specimen = true;\n',
    },
    tsconfig,
  );
  assert.equal(aliasPatterns, 1);
  assert.ok(
    offenders.some(
      (offender) => offender.includes('@catalogue/main') && offender.includes('preview/main.ts'),
    ),
    offenders.join(' | '),
  );
});

test('isolation guard follows local transitive bridges into preview', () => {
  const { offenders } = isolationOffenders({
    'src/main.ts': "import './preview-bridge';\n",
    'src/preview-bridge.ts': "export * from '../preview/main';\n",
    'preview/main.ts': 'export const specimen = true;\n',
  });
  assert.ok(
    offenders.some(
      (offender) => offender.includes('preview-bridge.ts') && offender.includes('preview/main.ts'),
    ),
    offenders.join(' | '),
  );
});

test('isolation guard keeps a literal fallback for unresolvable specifiers', () => {
  const { offenders } = isolationOffenders({
    'src/main.ts': "import '../preview/missing';\n",
  });
  assert.ok(
    offenders.some((offender) => offender.includes('unresolved literal')),
    offenders.join(' | '),
  );
});

test('isolation guard passes on the real production entries', () => {
  const { offenders, scanned } = findIsolationOffenders({ root: REPO_ROOT });
  assert.deepEqual(offenders, []);
  assert.ok(scanned > 20, `only ${scanned} local project modules followed`);
});

// ---------------------------------------------------------------- MC17-13 variants

function variantFixture(componentSource, entry, extraFiles = {}) {
  const root = mkdtempSync(join(tmpdir(), 'marea-variants-'));
  const componentPath = entry.implementationPath;
  writeTree(root, { ...extraFiles, [componentPath]: componentSource });
  try {
    return analyzeVariantCoverage({ root, registry: { components: [entry] } });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('variant guard passes on the real registry and implementation', () => {
  const outcome = analyzeVariantCoverage({ root: REPO_ROOT, registry });
  assert.deepEqual(outcome.offenders, []);
  assert.ok(outcome.optionInputs > 20, `only ${outcome.optionInputs} option inputs resolved`);
});

test('variant guard detects an aliased union with an undocumented value', () => {
  const entry = registry.components.find((candidate) => candidate.componentId === 'marea-text');
  const original = readFileSync(join(REPO_ROOT, entry.implementationPath), 'utf8');
  const mutated = original
    .replace(
      'export type MareaTextRole =',
      "export type UndocumentedVariant = 'bogus';\nexport type MareaTextRole =",
    )
    .replace(/input<MareaTextRole>\([^)]*\)/, "input<UndocumentedVariant>('bogus')");
  assert.notEqual(mutated, original, 'aliased-union mutation did not apply');
  const outcome = variantFixture(mutated, entry);
  assert.ok(
    outcome.offenders.some((offender) => offender.includes('bogus')),
    outcome.offenders.join(' | '),
  );
});

test('variant guard detects an enum-valued input with an undocumented value', () => {
  const entry = registry.components.find(
    (candidate) => candidate.componentId === 'marea-status-badge',
  );
  const original = readFileSync(join(REPO_ROOT, entry.implementationPath), 'utf8');
  const mutated = `enum BadgeTone { bogus = 'bogus' }\n${original.replace(
    /input\.required<MareaTone>\(\)/,
    'input<BadgeTone>(BadgeTone.bogus)',
  )}`;
  assert.notEqual(mutated, original, 'enum mutation did not apply');
  const coreTypes = readFileSync(
    join(REPO_ROOT, 'src/app/marea-design-system/core/types.ts'),
    'utf8',
  );
  const outcome = variantFixture(mutated, entry, {
    'src/app/marea-design-system/core/types.ts': coreTypes,
  });
  assert.ok(
    outcome.offenders.some((offender) => offender.includes('bogus')),
    outcome.offenders.join(' | '),
  );
});

test('variant guard resolves default values and compares registry values in both directions', () => {
  const entry = {
    componentId: 'specimen',
    implementationPath: 'src/app/marea-design-system/components/specimen.ts',
    inputs: [{ name: 'variant', type: 'Role' }],
    visualVariants: ['a', 'b'],
  };
  const undocumentedDefault = variantFixture(
    "export type Role = 'a' | 'b';\nexport class Specimen {\n  readonly variant = input<Role>('bogus');\n}\n",
    entry,
  );
  assert.ok(
    undocumentedDefault.offenders.some((offender) => offender.includes('bogus')),
    undocumentedDefault.offenders.join(' | '),
  );

  const missingImplementation = variantFixture(
    "export type Role = 'a' | 'b';\nexport class Specimen {\n  readonly variant = input<Role>('a');\n}\n",
    { ...entry, visualVariants: ['a', 'b', 'c'] },
  );
  assert.ok(
    missingImplementation.offenders.some(
      (offender) => offender.includes('c') && offender.includes('not implemented'),
    ),
    missingImplementation.offenders.join(' | '),
  );
});

test('variant guard fails closed on unresolved constructs', () => {
  const outcome = variantFixture(
    'export class Specimen {\n  readonly variant = input<MissingType>(undefined);\n}\n',
    {
      componentId: 'specimen',
      implementationPath: 'src/app/marea-design-system/components/specimen.ts',
      inputs: [{ name: 'variant', type: 'MissingType' }],
      visualVariants: [],
    },
  );
  assert.ok(
    outcome.offenders.some((offender) => offender.includes('unresolved')),
    outcome.offenders.join(' | '),
  );
});

// ---------------------------------------------------------------- MC17-15 focus

test('focus guard rejects every hidden or transparent focus outline', () => {
  const visible =
    ':host(:focus-visible) { outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring); outline-offset: var(--marea-focus-offset); }';
  assert.deepEqual(focusContractProblems(visible), []);
  for (const rule of [
    ':host(:focus-visible) { outline: none; }',
    ':host(:focus-visible) { outline: 0; }',
    ':host(:focus-visible) { outline-style: none; }',
    ':host(:focus-visible) { outline-color: transparent; }',
    ':host(:focus-visible) { outline: var(--marea-focus-width) solid transparent; }',
  ]) {
    assert.notDeepEqual(focusContractProblems(rule), [], `not rejected: ${rule}`);
  }
  assert.ok(
    focusContractProblems(':host(:focus-visible) { outline: 2px solid red; }').some((problem) =>
      problem.includes('--marea-focus-ring'),
    ),
  );
});

test('focus guard accepts the real components and rejects the transparent mutation', () => {
  const interactive = registry.components.filter(
    (entry) => !String(entry.keyboardContract).startsWith('NOT_APPLICABLE'),
  );
  assert.ok(interactive.length > 5);
  for (const entry of interactive) {
    const source = readFileSync(
      join(
        REPO_ROOT,
        entry.componentId === 'marea-input'
          ? 'src/app/marea-design-system/components/foundation/marea-form-field.ts'
          : entry.implementationPath,
      ),
      'utf8',
    );
    assert.deepEqual(focusContractProblems(source), [], `${entry.componentId} focus contract`);
  }

  const linkPath = 'src/app/marea-design-system/components/foundation/marea-link.ts';
  const link = readFileSync(join(REPO_ROOT, linkPath), 'utf8');
  const transparent = link.replace(
    /(:host\(:focus-visible\)\s*\{[^}]*?outline:\s*var\(--marea-focus-width\)\s+var\(--marea-focus-style\)\s+var\(--marea-focus-ring\);)/,
    '$1 outline-color: transparent;',
  );
  assert.notEqual(transparent, link, 'transparent-focus mutation did not apply');
  assert.ok(focusContractProblems(transparent).some((problem) => problem.includes('transparent')));
});
