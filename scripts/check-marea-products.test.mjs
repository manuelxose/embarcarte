import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Proves that scripts/check-marea-products.mjs actually fails when the MC-05
 * product contract, a dossier, the edition authority, a copy draft or a claim
 * breaks a governance rule, and that it tolerates the legitimate negative
 * examples the internal documents must quote.
 *
 * Every case invokes the real CLI in a throwaway fixture tree through its
 * `--root` flag, so the tested code path is exactly the one the milestone gate
 * runs. One case runs the validator against the real repository tree.
 */

const SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), 'check-marea-products.mjs');
const REPO_ROOT = resolve(dirname(SCRIPT), '..');

const PRODUCTS_DIR = join('docs', 'marea', 'products');
const JSON_REL = join(PRODUCTS_DIR, 'product-definitions.batch-01.json');
const EDITIONS_REL = join(PRODUCTS_DIR, 'PRODUCT-EDITIONS-NAV-HUB-AIS.md');
const COMPATIBILITY_REL = join(PRODUCTS_DIR, 'PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md');
const PRICING_REL = join(PRODUCTS_DIR, 'PRODUCT-PRICING-AND-CHANNEL-MODEL.md');
const ASSETS_REL = join(PRODUCTS_DIR, 'PRODUCT-ASSET-REQUIREMENTS.md');
const JOURNEYS_REL = join(PRODUCTS_DIR, 'CUSTOMER-JOURNEYS-NAV-HUB-AIS.md');
const NAV_REL = join(PRODUCTS_DIR, 'MAREA-NAV-COMMERCIAL-SPEC.md');
const HUB_REL = join(PRODUCTS_DIR, 'MAREA-HUB-COMMERCIAL-SPEC.md');
const AIS_REL = join(PRODUCTS_DIR, 'MAREA-AIS-COMMERCIAL-SPEC.md');
const COPY_DIR = join(PRODUCTS_DIR, 'copy');
const COPY_REL = {
  navEs: join(COPY_DIR, 'nav.es.md'),
  navEn: join(COPY_DIR, 'nav.en.md'),
  hubEs: join(COPY_DIR, 'hub.es.md'),
  hubEn: join(COPY_DIR, 'hub.en.md'),
  aisEs: join(COPY_DIR, 'ais.es.md'),
  aisEn: join(COPY_DIR, 'ais.en.md'),
};

const REQUIRED_FILES = [
  JSON_REL,
  NAV_REL,
  HUB_REL,
  AIS_REL,
  EDITIONS_REL,
  COMPATIBILITY_REL,
  PRICING_REL,
  ASSETS_REL,
  JOURNEYS_REL,
  ...Object.values(COPY_REL),
];

const ASSET_REFERENCE =
  /docs\/marea\/[A-Za-z0-9_][A-Za-z0-9_./-]*\.(?:png|jpe?g|gif|svg|webp|avif)/g;

/**
 * The validator resolves referenced docs/marea asset files against the
 * validation root, so the fixture tree must contain the real referenced files
 * (they exist in the repository; the real-tree baseline test proves it).
 */
function copyReferencedAssets(root) {
  for (const relativePath of REQUIRED_FILES) {
    const text = readFileSync(join(REPO_ROOT, relativePath), 'utf8');
    for (const match of text.matchAll(ASSET_REFERENCE)) {
      const candidate = match[0].replace(/[.,;:)]+$/, '');
      const source = join(REPO_ROOT, candidate);
      if (!existsSync(source)) continue;
      const target = join(root, candidate);
      mkdirSync(dirname(target), { recursive: true });
      copyFileSync(source, target);
    }
  }
}

function realJson() {
  return JSON.parse(readFileSync(join(REPO_ROOT, JSON_REL), 'utf8'));
}

/**
 * Copies the real scoped MC-05 files into a temporary root, then applies one
 * mutation so a single rule fails.
 */
function makeFixture({ mutateJson, edit = {}, remove = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-products-'));
  for (const relativePath of REQUIRED_FILES) {
    const source = join(REPO_ROOT, relativePath);
    const target = join(root, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
  if (typeof mutateJson === 'function') {
    const contract = realJson();
    mutateJson(contract);
    writeFileSync(join(root, JSON_REL), `${JSON.stringify(contract, null, 2)}\n`);
  }
  for (const [relativePath, transform] of Object.entries(edit)) {
    const target = join(root, relativePath);
    writeFileSync(target, transform(readFileSync(target, 'utf8')));
  }
  for (const relativePath of remove) rmSync(join(root, relativePath));
  copyReferencedAssets(root);
  return root;
}

function runValidator(root, extraArgs = []) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [SCRIPT, '--root', root, ...extraArgs], {
      cwd: REPO_ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => (stdout += chunk));
    child.stderr.on('data', (chunk) => (stderr += chunk));
    child.on('close', (code) => resolveRun({ code, stdout, stderr }));
  });
}

async function withFixture(options, assertions) {
  const root = makeFixture(options);
  try {
    const result = await runValidator(root);
    assertions(result);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function findProduct(contract, id) {
  const product = contract.products.find((entry) => entry.id === id);
  assert.ok(product, `the fixture contract must contain product ${id}`);
  return product;
}

function assertFails(result, checkId, pattern) {
  assert.equal(result.code, 1, `the validator exits 1\n${result.stdout}`);
  assert.match(
    result.stdout,
    new RegExp(`FAIL\\s+${checkId.replace(/\./g, '\\.')}`),
    result.stdout,
  );
  assert.match(result.stdout, pattern, result.stdout);
}

// --- The baseline ----------------------------------------------------------

test('the real MC-05 tree passes (baseline for every mutation case)', async () => {
  const result = await runValidator(REPO_ROOT);
  assert.equal(result.code, 0, result.stdout);
  assert.match(result.stdout, /RESULT: PASS/);
  assert.match(result.stdout, /Summary: \d+ checks run, \d+ passed, 0 failed/);
});

test('--json reports a machine-readable PASS for the real tree', async () => {
  const result = await runValidator(REPO_ROOT, ['--json']);
  assert.equal(result.code, 0, result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.result, 'PASS');
  assert.ok(report.checks.length >= 20);
  assert.ok(report.checks.every((entry) => entry.status === 'PASS'));
});

// --- Category 1: missing product or edition --------------------------------

test('category 1 — a missing product is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        contract.products = contract.products.filter((product) => product.id !== 'AIS');
      },
    },
    (result) => {
      assertFails(result, 'json.products', /product AIS is missing from the contract/);
    },
  );
});

test('category 1 — a missing edition is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'HUB').editions.pop();
      },
    },
    (result) => {
      assertFails(result, 'json.editions', /edition HUB-PRO is missing/);
    },
  );
});

// --- Category 2: missing one of the 24 fields ------------------------------

test('category 2 — a dossier without an F-heading is rejected', async () => {
  await withFixture(
    {
      edit: {
        [NAV_REL]: (text) =>
          text.replace(/^#### F17 .*$/m, '#### Sales arguments (heading removed by fixture)'),
      },
    },
    (result) => {
      assertFails(
        result,
        'dossiers.fields',
        /MAREA-NAV-COMMERCIAL-SPEC\.md is missing the F-heading\(s\): F17/,
      );
    },
  );
});

test('category 2 — a JSON contract missing one of the 24 fields is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        delete findProduct(contract, 'AIS').fields.faq;
      },
    },
    (result) => {
      assertFails(result, 'json.fields', /the 24-field contract is missing field "faq"/);
    },
  );
});

// --- Category 3: edition comparison and edition authority -------------------

test('category 3 — an edition missing from the D4 comparison is rejected', async () => {
  await withFixture(
    {
      edit: {
        [EDITIONS_REL]: (text) => text.replaceAll('MAREA AIS Connected', 'MAREA AIS Link'),
      },
    },
    (result) => {
      assertFails(result, 'editions.comparison', /edition MAREA AIS Connected is missing/);
    },
  );
});

test('category 3 — an unknown seventh edition id in D4 is rejected', async () => {
  await withFixture(
    {
      edit: {
        [EDITIONS_REL]: (text) => text.replace('`NAV-ESSENTIAL`', '`NAV-ESSENTIAL-EXTRA`'),
      },
    },
    (result) => {
      assertFails(
        result,
        'editions.comparison',
        /unknown edition id NAV-ESSENTIAL-EXTRA|edition id NAV-ESSENTIAL does not appear/,
      );
    },
  );
});

// --- Category 4: copy language pair and structural parity ------------------

test('category 4 — a missing EN copy file is rejected', async () => {
  await withFixture({ remove: [COPY_REL.hubEn] }, (result) => {
    assertFails(result, 'files.required', /copy[\\/]hub\.en\.md is missing/);
  });
});

test('category 4 — an ES/EN pair with different section counts is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.navEn]: (text) => text.replace(/^## 7\. .*$/m, ''),
      },
    },
    (result) => {
      assertFails(
        result,
        'copy.pairs',
        /not structurally parallel: \d+ ES sections vs \d+ EN sections/,
      );
    },
  );
});

// --- Category 5: conflicting family names ----------------------------------

test('category 5 — a hyphenated displayName in the JSON is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'NAV').displayName = 'MAREA-NAV';
      },
    },
    (result) => {
      assertFails(result, 'json.products', /displayName must be exactly "MAREA NAV"/);
    },
  );
});

test('category 5 — a hyphenated family name in a document is rejected', async () => {
  await withFixture(
    {
      edit: {
        [EDITIONS_REL]: (text) => `${text}\n\nEl nombre comercial es MAREA-HUB en este párrafo.\n`,
      },
    },
    (result) => {
      assertFails(result, 'names', /hyphenated family name is prohibited/);
    },
  );
});

// --- Category 6: lifecycle ------------------------------------------------

test('category 6 — a non-DEFINED lifecycle state is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'AIS').lifecycleState = 'RELEASED';
      },
    },
    (result) => {
      assertFails(result, 'lifecycle', /lifecycleState must be "DEFINED"/);
    },
  );
});

test('category 6 — a READY-style boolean is rejected', async () => {
  await withFixture(
    {
      edit: {
        [PRICING_REL]: (text) => `${text}\n\nproductReady: true\n`,
      },
    },
    (result) => {
      assertFails(result, 'lifecycle', /READY-style boolean is prohibited/);
    },
  );
});

test('category 6 — the lifecycle decision must be D-007', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        contract.lifecycleDecision = 'D-999';
      },
    },
    (result) => {
      assertFails(result, 'json.contract', /lifecycleDecision must be "D-007"/);
    },
  );
});

// --- Category 7: active purchase status ------------------------------------

test('category 7 — a sale-enabling CTA in customer-facing copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.navEs]: (text) => `${text}\n\nComprar ahora en la tienda.\n`,
      },
    },
    (result) => {
      assertFails(result, 'availability', /CTA "comprar ahora" está prohibida/);
    },
  );
});

test('category 7 — an availability status other than NOT_FOR_SALE is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'NAV').readiness.availability = 'FOR_SALE';
      },
    },
    (result) => {
      assertFails(result, 'availability', /must be "NOT_FOR_SALE"/);
    },
  );
});

// --- Category 8: unapproved prices ----------------------------------------

test('category 8 — a price in customer-facing copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.navEn]: (text) => `${text}\n\nThe launch price is EUR 99.\n`,
      },
    },
    (result) => {
      assertFails(result, 'pricing', /a price does not belong in customer-facing copy/);
    },
  );
});

test('category 8 — an APPROVED price hypothesis is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'NAV').editions[0].priceHypothesis.status = 'APPROVED';
      },
    },
    (result) => {
      assertFails(result, 'pricing', /priceHypothesis\.status must be "HYPOTHESIS_UNAPPROVED"/);
    },
  );
});

// --- Category 9: legal clearance ------------------------------------------

test('category 9 — a granted trademark clearance is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        contract.globalRestrictions.trademarkLegalClearance = 'GRANTED';
      },
    },
    (result) => {
      assertFails(result, 'clearance', /must be "NOT_GRANTED"/);
    },
  );
});

test('category 9 — copy asserting a registered trademark is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.hubEn]: (text) => `${text}\n\nMAREA is a registered trademark.\n`,
      },
    },
    (result) => {
      assertFails(result, 'clearance', /presented as a registered trademark/);
    },
  );
});

// --- Category 10: AIS transmission claims ---------------------------------

test('category 10 — an AIS transmission claim in AIS copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.aisEn]: (text) =>
          `${text}\n\nMAREA AIS transmits your position to nearby vessels.\n`,
      },
    },
    (result) => {
      assertFails(result, 'ais', /AIS transmission claim is prohibited/);
    },
  );
});

// --- Category 11: unapproved NMEA 2000 claims ------------------------------

test('category 11 — an NMEA 2000 certification claim in a dossier is rejected', async () => {
  await withFixture(
    {
      edit: {
        [HUB_REL]: (text) =>
          `${text}\n\n## Claim\n\nThe gateway is NMEA 2000 certified and compatible con todos los equipos.\n`,
      },
    },
    (result) => {
      assertFails(result, 'nmea', /NMEA 2000 certification claim is prohibited/);
    },
  );
});

// --- Category 12: NAV chart rights and ECDIS ------------------------------

test('category 12 — "official charts included" in NAV copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.navEs]: (text) => `${text}\n\nCartas oficiales incluidas en tu suscripción.\n`,
      },
    },
    (result) => {
      assertFails(result, 'charts', /cartas oficiales presentadas como incluidas/);
    },
  );
});

test('category 12 — an ECDIS claim in the NAV dossier is rejected', async () => {
  await withFixture(
    {
      edit: {
        [NAV_REL]: (text) => `${text}\n\n## Claim\n\nMAREA NAV is a certified ECDIS.\n`,
      },
    },
    (result) => {
      assertFails(result, 'charts', /ECDIS claim is prohibited/);
    },
  );
});

// --- Category 13: asset references ---------------------------------------

test('category 13 — a product referencing an undeclared asset is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'NAV').assets[0] = { assetId: 'AST-NOT-DECLARED' };
      },
    },
    (result) => {
      assertFails(
        result,
        'assets',
        /assetId AST-NOT-DECLARED is not declared in the contract assets list/,
      );
    },
  );
});

test('category 13 — an asset with a published status is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        contract.assets[0].status = 'PUBLISHED';
      },
    },
    (result) => {
      assertFails(result, 'assets', /status must be CONCEPT or BLOCKED_ON_IMAGE_GENERATION/);
    },
  );
});

// --- Category 14: misleading compatibility --------------------------------

test('category 14 — a blanket compatibility assertion is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COMPATIBILITY_REL]: (text) => `${text}\n\nThe gateway works with any boat.\n`,
      },
    },
    (result) => {
      assertFails(result, 'compatibility', /blanket compatibility claim is prohibited/);
    },
  );
});

// --- Category 15: disclaimers --------------------------------------------

test('category 15 — a copy file without the approved navigation disclaimer is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.navEs]: (text) =>
          text.replace(
            /Este producto es una ayuda a la navegación[^\n]*/g,
            'Este producto es una ayuda a la navegación.',
          ),
      },
    },
    (result) => {
      assertFails(
        result,
        'disclaimers',
        /does not carry the approved navigation disclaimer \(ES\)/,
      );
    },
  );
});

test('category 15 — an AIS copy without the approved receive-only disclaimer is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.aisEn]: (text) =>
          text.replace(/AIS reception is receive-only:[^\n]*/g, 'AIS reception is receive-only.'),
      },
    },
    (result) => {
      assertFails(
        result,
        'disclaimers',
        /does not carry the approved aisReceiveOnly disclaimer \(EN\)/,
      );
    },
  );
});

// --- Category 16: empty entries, missing labels and TBD --------------------

test('category 16 — an empty field summary is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'NAV').fields.identity.summary = '';
      },
    },
    (result) => {
      assertFails(result, 'json.fields', /fields\.identity\.summary is missing or empty/);
    },
  );
});

test('category 16 — a field missing evidenceClass, ownerFunction and readinessDimension is rejected', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        const field = findProduct(contract, 'NAV').fields.differentiation;
        delete field.evidenceClass;
        delete field.ownerFunction;
        delete field.readinessDimension;
      },
    },
    (result) => {
      assert.equal(result.code, 1, result.stdout);
      assert.match(result.stdout, /FAIL\s+json\.fields/);
      assert.match(result.stdout, /fields\.differentiation\.evidenceClass must be one of/);
      assert.match(result.stdout, /fields\.differentiation\.ownerFunction is missing/);
      assert.match(result.stdout, /fields\.differentiation\.readinessDimension must name one of/);
    },
  );
});

test('category 16 — a TBD placeholder is rejected', async () => {
  await withFixture(
    {
      edit: {
        [PRICING_REL]: (text) => `${text}\n\nChannel margin: TBD\n`,
      },
    },
    (result) => {
      assertFails(result, 'placeholders', /contains the prohibited placeholder "TBD"/);
    },
  );
});

// --- AIS Connected verdict (edition authority rule) -----------------------

test('the AIS-CONNECTED verdict cannot be flattened to approved', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        const connected = findProduct(contract, 'AIS').editions.find(
          (edition) => edition.id === 'AIS-CONNECTED',
        );
        connected.editionVerdict.status = 'APPROVED';
        connected.editionVerdict.verdict = 'JUSTIFIED';
      },
    },
    (result) => {
      assert.equal(result.code, 1, result.stdout);
      assert.match(result.stdout, /FAIL\s+json\.editions/);
      assert.match(result.stdout, /editionVerdict\.status must be "CONDITIONAL"/);
      assert.match(result.stdout, /must not be presented as JUSTIFIED/);
    },
  );
});

test('a retained edition cannot be marked conditional or made publishable', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        const essential = findProduct(contract, 'NAV').editions.find(
          (edition) => edition.id === 'NAV-ESSENTIAL',
        );
        essential.editionVerdict.status = 'CONDITIONAL';
        essential.editionVerdict.publicationConditional = false;
      },
    },
    (result) => {
      assert.equal(result.code, 1, result.stdout);
      assert.match(result.stdout, /FAIL\s+json\.editions/);
      assert.match(result.stdout, /editionVerdict\.status must be "DEFINED"/);
      assert.match(result.stdout, /publicationConditional must be true/);
    },
  );
});

test('the NAV software-only hardware readiness value is accepted, HUB is not', async () => {
  await withFixture(
    {
      mutateJson: (contract) => {
        findProduct(contract, 'HUB').readiness.hardware = 'NOT_APPLICABLE_SOFTWARE_PRODUCT';
      },
    },
    (result) => {
      assertFails(
        result,
        'json.products',
        /a hardware product must carry a hardware-specific readiness value/,
      );
    },
  );
});

// --- Negative-context tolerance (internal documents only) -----------------

test('prohibited phrases quoted in an explicit limitations table do not fail the internal documents', async () => {
  await withFixture(
    {
      edit: {
        [HUB_REL]: (text) =>
          [
            text,
            '',
            '## Prohibited claims and limitations table (internal governance)',
            '',
            '| Prohibited claim | Reason |',
            '| --- | --- |',
            '| NMEA 2000 certified | H-04: no licence or certification exists |',
            '| available now | The product is NOT_FOR_SALE |',
            '| buy now / add to cart | No SKU is orderable |',
            '| ECDIS | NAV is a navigational aid, not ECDIS |',
            '| transmits your position | AIS is receive-only |',
            '| price from EUR 99 | Price hypotheses are HYPOTHESIS_UNAPPROVED |',
            '| MAREA-HUB | Canonical form is MAREA HUB |',
            '',
            'These strings are quoted only to be prohibited; they must never appear in copy.',
          ].join('\n'),
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});

test('the same prohibited phrases in a copy file still fail', async () => {
  await withFixture(
    {
      edit: {
        [COPY_REL.hubEn]: (text) =>
          `${text}\n\nNMEA 2000 certified. Available now. Add to cart. Official charts included.\n`,
      },
    },
    (result) => {
      assert.equal(result.code, 1, result.stdout);
      assert.match(result.stdout, /FAIL\s+nmea/);
      assert.match(result.stdout, /FAIL\s+availability/);
      assert.match(result.stdout, /FAIL\s+charts/);
    },
  );
});
