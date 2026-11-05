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
// Fixed evidence the validator reads from the root: the MC-02 blocker register, the
// conventions README and the approved-disclaimer policy.
const BLOCKERS_REL = join('docs', 'marea', 'compliance', 'MC-02-BLOCKERS-AND-DECISIONS.md');
const CONVENTIONS_REL = join(PRODUCTS_DIR, 'README.md');
const CLAIMS_POLICY_REL = join('docs', 'marea', 'brand', 'COMMERCIAL-BRAND-CLAIMS-POLICY.md');
const ROOT_EVIDENCE_FILES = [BLOCKERS_REL, CONVENTIONS_REL, CLAIMS_POLICY_REL];
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

// --- Batch 02 (MC-06): PILOT, SENSE, WATCH ---------------------------------

const JSON2_REL = join(PRODUCTS_DIR, 'product-definitions.batch-02.json');
const PILOT_REL = join(PRODUCTS_DIR, 'MAREA-PILOT-COMMERCIAL-SPEC.md');
const SENSE_REL = join(PRODUCTS_DIR, 'MAREA-SENSE-COMMERCIAL-SPEC.md');
const WATCH_REL = join(PRODUCTS_DIR, 'MAREA-WATCH-COMMERCIAL-SPEC.md');
const PILOT_SAFETY_REL = join(PRODUCTS_DIR, 'PILOT-SAFETY-CASE-OUTLINE.md');
const SENSE_PLAN_REL = join(PRODUCTS_DIR, 'SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md');
const WATCH_CONTRACT_REL = join(PRODUCTS_DIR, 'WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md');
const EDITIONS2_REL = join(PRODUCTS_DIR, 'PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md');
const COMPATIBILITY2_REL = join(PRODUCTS_DIR, 'PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md');
const PRICING2_REL = join(PRODUCTS_DIR, 'PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md');
const JOURNEYS2_REL = join(PRODUCTS_DIR, 'CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md');
const ASSETS2_REL = join(PRODUCTS_DIR, 'PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md');
const COPY2_REL = {
  pilotEs: join(COPY_DIR, 'pilot.es.md'),
  pilotEn: join(COPY_DIR, 'pilot.en.md'),
  senseEs: join(COPY_DIR, 'sense.es.md'),
  senseEn: join(COPY_DIR, 'sense.en.md'),
  watchEs: join(COPY_DIR, 'watch.es.md'),
  watchEn: join(COPY_DIR, 'watch.en.md'),
};

// --- Batch 03 (MC-07): DISPLAY, WEATHER, FLEET -----------------------------

const JSON3_REL = join(PRODUCTS_DIR, 'product-definitions.batch-03.json');
const DISPLAY_REL = join(PRODUCTS_DIR, 'MAREA-DISPLAY-COMMERCIAL-SPEC.md');
const WEATHER_REL = join(PRODUCTS_DIR, 'MAREA-WEATHER-COMMERCIAL-SPEC.md');
const FLEET_REL = join(PRODUCTS_DIR, 'MAREA-FLEET-COMMERCIAL-SPEC.md');
const DISPLAY_ANNEX_REL = join(PRODUCTS_DIR, 'DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md');
const WEATHER_ANNEX_REL = join(PRODUCTS_DIR, 'WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md');
const FLEET_ANNEX_REL = join(PRODUCTS_DIR, 'FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md');
const EDITIONS3_REL = join(PRODUCTS_DIR, 'PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md');
const COMPATIBILITY3_REL = join(PRODUCTS_DIR, 'PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md');
const PRICING3_REL = join(PRODUCTS_DIR, 'PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md');
const JOURNEYS3_REL = join(PRODUCTS_DIR, 'CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md');
const ASSETS3_REL = join(PRODUCTS_DIR, 'PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md');
const COPY3_REL = {
  displayEs: join(COPY_DIR, 'display.es.md'),
  displayEn: join(COPY_DIR, 'display.en.md'),
  weatherEs: join(COPY_DIR, 'weather.es.md'),
  weatherEn: join(COPY_DIR, 'weather.en.md'),
  fleetEs: join(COPY_DIR, 'fleet.es.md'),
  fleetEn: join(COPY_DIR, 'fleet.en.md'),
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
  JSON2_REL,
  PILOT_REL,
  SENSE_REL,
  WATCH_REL,
  PILOT_SAFETY_REL,
  SENSE_PLAN_REL,
  WATCH_CONTRACT_REL,
  EDITIONS2_REL,
  COMPATIBILITY2_REL,
  PRICING2_REL,
  JOURNEYS2_REL,
  ASSETS2_REL,
  ...Object.values(COPY2_REL),
  JSON3_REL,
  DISPLAY_REL,
  WEATHER_REL,
  FLEET_REL,
  DISPLAY_ANNEX_REL,
  WEATHER_ANNEX_REL,
  FLEET_ANNEX_REL,
  EDITIONS3_REL,
  COMPATIBILITY3_REL,
  PRICING3_REL,
  JOURNEYS3_REL,
  ASSETS3_REL,
  ...Object.values(COPY3_REL),
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

function realJson(relativePath = JSON_REL) {
  return JSON.parse(readFileSync(join(REPO_ROOT, relativePath), 'utf8'));
}

/**
 * Copies the real scoped MC-05/MC-06 files into a temporary root, then applies one
 * mutation so a single rule fails.
 */
function makeFixture({ mutateJson, mutateJson2, mutateJson3, edit = {}, remove = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-products-'));
  for (const relativePath of REQUIRED_FILES) {
    const source = join(REPO_ROOT, relativePath);
    const target = join(root, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(source, target);
  }
  // The validator resolves MC-02 blocker ids and source documents against fixed
  // evidence outside the product directory.
  for (const relativePath of ROOT_EVIDENCE_FILES) {
    const target = join(root, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(REPO_ROOT, relativePath), target);
  }
  if (typeof mutateJson === 'function') {
    const contract = realJson(JSON_REL);
    mutateJson(contract);
    writeFileSync(join(root, JSON_REL), `${JSON.stringify(contract, null, 2)}\n`);
  }
  if (typeof mutateJson2 === 'function') {
    const contract = realJson(JSON2_REL);
    mutateJson2(contract);
    writeFileSync(join(root, JSON2_REL), `${JSON.stringify(contract, null, 2)}\n`);
  }
  if (typeof mutateJson3 === 'function') {
    const contract = realJson(JSON3_REL);
    mutateJson3(contract);
    writeFileSync(join(root, JSON3_REL), `${JSON.stringify(contract, null, 2)}\n`);
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

// --- Batch 02 (MC-06): structural and claim mutations ----------------------

test('batch 02 — PILOT promoted to FOR_SALE is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'PILOT').readiness.availability = 'FOR_SALE';
      },
    },
    (result) => {
      assertFails(result, 'availability', /must be "NOT_FOR_SALE"/);
      assert.match(result.stdout, /FAIL\s+json\.products/, result.stdout);
    },
  );
});

test('batch 02 — a WATCH copy claiming remote steering is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.watchEn]: (text) =>
          `${text}\n\nYou can steer the boat from the app while ashore.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.prohibitions', /a remote steering-control path is prohibited/);
    },
  );
});

test('batch 02 — SENSE claimed as accuracy-verified without evidence is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'SENSE').accuracyVerified = true;
      },
    },
    (result) => {
      assertFails(result, 'batch02.invariants', /accuracyVerified must be false/);
    },
  );
});

test('batch 02 — a WATCH instant-delivery guarantee is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WATCH_REL]: (text) =>
          `${text}\n\nAlerts are delivered instantly when the monitoring rule matches.\n`,
      },
    },
    (result) => {
      assertFails(
        result,
        'batch02.watch',
        /an instant-alert promise is prohibited: provider acceptance is not delivery/,
      );
    },
  );
});

test('batch 02 — a completed PILOT sea-trial claim is rejected', async () => {
  await withFixture(
    {
      edit: {
        [PILOT_REL]: (text) => `${text}\n\nThe supervised sea trials were completed last season.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.safety', /a completed sea-trial claim is prohibited/);
    },
  );
});

test('batch 02 — an SENSE NMEA 2000 certification claim is rejected', async () => {
  await withFixture(
    {
      edit: {
        [SENSE_REL]: (text) => `${text}\n\nMAREA SENSE is NMEA 2000 certified on every vessel.\n`,
      },
    },
    (result) => {
      assertFails(result, 'nmea', /NMEA 2000 certification claim is prohibited/);
    },
  );
});

test('batch 02 — a missing ES or EN copy file is rejected', async () => {
  await withFixture({ remove: [COPY2_REL.pilotEn] }, (result) => {
    assertFails(result, 'files.required', /copy[\\/]pilot\.en\.md is missing/);
  });
});

test('batch 02 — an APPROVED price without costing is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const core = findProduct(contract, 'WATCH').editions.find(
          (edition) => edition.id === 'WATCH-CORE',
        );
        core.priceHypothesis.status = 'APPROVED';
      },
    },
    (result) => {
      assertFails(result, 'pricing', /priceHypothesis\.status must be "HYPOTHESIS_UNAPPROVED"/);
    },
  );
});

test('batch 02 — bundled WATCH connectivity without a contract is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WATCH_REL]: (text) => `${text}\n\nConnectivity is included with every WATCH purchase.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.watch', /bundled connectivity is prohibited/);
    },
  );
});

test('batch 02 — a product with fewer than 24 fields is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        delete findProduct(contract, 'PILOT').fields.faq;
      },
    },
    (result) => {
      assertFails(result, 'json.fields', /the 24-field contract is missing field "faq"/);
    },
  );
});

test('batch 02 — a PILOT contract without the physical E-stop blocker is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const pilot = findProduct(contract, 'PILOT');
        pilot.mc02Blockers = pilot.mc02Blockers.filter((blocker) => blocker !== 'H-10');
      },
    },
    (result) => {
      assertFails(result, 'json.products', /missing the mandatory blocker H-10/);
    },
  );
});

test('batch 02 — provider acceptance treated as delivery is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WATCH_CONTRACT_REL]: (text) =>
          `${text}\n\nPROVIDER_ACCEPTED confirms DELIVERED_WHEN_CONFIRMED for every alert.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.notification', /provider acceptance treated as delivery/);
    },
  );
});

test('batch 02 — an invented SENSE module inside a kit is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'SENSE').kits[0].modules.push('SENSE-FUEL');
      },
    },
    (result) => {
      assertFails(result, 'batch02.invariants', /invented module "SENSE-FUEL"/);
    },
  );
});

test('batch 02 — a WATCH-PLUS price is rejected while its benefits are not costed', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const plus = findProduct(contract, 'WATCH').editions.find(
          (edition) => edition.id === 'WATCH-PLUS',
        );
        plus.priceState = 'HYPOTHESIS_UNAPPROVED';
        plus.priceHypothesis = {
          amount: 399,
          currency: 'EUR',
          period: 'ONE_OFF',
          status: 'HYPOTHESIS_UNAPPROVED',
          validationRequired: true,
          vatBasis: 'VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS',
          blockers: ['X-05'],
        };
      },
    },
    (result) => {
      assertFails(result, 'batch02.editions', /must not carry a price hypothesis/);
    },
  );
});

test('batch 02 — a compatibility table with an extra column is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COMPATIBILITY2_REL]: (text) =>
          text.replace(/^(\| Integration \| Required product \|[^\n]*\|)\s*$/m, '$1 Notes |'),
      },
    },
    (result) => {
      assertFails(
        result,
        'batch02.compatibility',
        /compatibility table must have exactly the columns/,
      );
    },
  );
});

test('batch 02 — a journey blueprint missing a canonical stage is rejected', async () => {
  await withFixture(
    {
      edit: {
        [JOURNEYS2_REL]: (text) => text.replaceAll('End-of-life', 'Closing'),
      },
    },
    (result) => {
      assertFails(result, 'batch02.journeys', /missing the stage End-of-life|17-stage blueprint/);
    },
  );
});

test('batch 02 — a drifted notification state vocabulary is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WATCH_REL]: (text) => text.replaceAll('DELIVERY_UNKNOWN', 'UNKNOWN_DELIVERY'),
      },
    },
    (result) => {
      assertFails(result, 'batch02.notification', /canonical notification state DELIVERY_UNKNOWN/);
    },
  );
});

test('batch 02 — a contract that does not identify batch 2 is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        contract.batch = 1;
        contract.milestone = 'MC-05';
      },
    },
    (result) => {
      assertFails(result, 'batch02.contract', /batch must be 2/);
    },
  );
});

test('batch 02 — a price outside the README §17 list is rejected', async () => {
  await withFixture(
    {
      edit: {
        [PRICING2_REL]: (text) =>
          `${text}\n\nA later planning note quoted PILOT Coastal at EUR 1,490 for discussion.\n`,
      },
    },
    (result) => {
      assertFails(
        result,
        'batch02.pricing',
        /not among the allowed batch-02 hypotheses of README §17/,
      );
    },
  );
});

test('batch 02 — a copy file without the approved PILOT disclaimer is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.pilotEn]: (text) =>
          text.replace(
            /The steering system is assisted and supervised:[^\n]*/g,
            'The steering system is assisted and supervised.',
          ),
      },
    },
    (result) => {
      assertFails(
        result,
        'disclaimers',
        /does not carry the approved pilotSteering disclaimer \(EN\)/,
      );
    },
  );
});

test('batch 02 — a dossier without an F-heading is rejected', async () => {
  await withFixture(
    {
      edit: {
        [SENSE_REL]: (text) =>
          text.replace(/^#### F17 .*$/m, '#### Sales arguments (heading removed by fixture)'),
      },
    },
    (result) => {
      assertFails(
        result,
        'dossiers.fields',
        /MAREA-SENSE-COMMERCIAL-SPEC\.md is missing the F-heading\(s\): F17/,
      );
    },
  );
});

test('batch 02 — an asset id missing from the asset document is rejected', async () => {
  await withFixture(
    {
      edit: {
        [ASSETS2_REL]: (text) => text.replaceAll('PILOT-HERO-01', 'PILOT-HERO-99'),
      },
    },
    (result) => {
      assertFails(result, 'batch02.assets', /does not declare the asset id PILOT-HERO-01/);
    },
  );
});

test('batch 02 — a purchase CTA in SENSE/WATCH copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.watchEs]: (text) => `${text}\n\nComprar ahora en la tienda.\n`,
      },
    },
    (result) => {
      assertFails(result, 'availability', /CTA "comprar ahora" está prohibida/);
    },
  );
});

test('batch 02 — a price in PILOT customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.pilotEn]: (text) => `${text}\n\nFrom EUR 1,290 today.\n`,
      },
    },
    (result) => {
      assertFails(result, 'pricing', /a price does not belong in customer-facing copy/);
    },
  );
});

test('batch 02 — an edition verdict flattened to APPROVED is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const sail = findProduct(contract, 'PILOT').editions.find(
          (edition) => edition.id === 'PILOT-SAIL',
        );
        sail.editionVerdict.status = 'APPROVED';
      },
    },
    (result) => {
      assertFails(result, 'json.editions', /editionVerdict\.status must be "CONDITIONAL"/);
    },
  );
});

test('batch 02 — an SENSE accuracy figure in a document is rejected', async () => {
  await withFixture(
    {
      edit: {
        [SENSE_PLAN_REL]: (text) =>
          `${text}\n\nThe module achieves an accuracy of ±0.5 kn in field conditions.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.sense', /accuracy figure is prohibited/);
    },
  );
});

test('batch 02 — a numeric accuracy claim in SENSE customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.senseEn]: (text) =>
          `${text}\n\nMAREA SENSE measures wind within ±0.5 kn in all conditions.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch02.sense', /accuracy figure is prohibited/);
    },
  );
});

test('batch 02 — explicitly PROPOSED internal validation targets are tolerated', async () => {
  await withFixture(
    {
      edit: {
        [SENSE_PLAN_REL]: (text) =>
          `${text}\n\n| A08 | Intended accuracy requirement | \`PROPOSED\` validation target only: wind speed ±1 kn or ±5% of reading after calibration; not an achieved figure. |\n`,
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});

test('batch 02 — a kit whose composition drifts from the dossier is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const systems = findProduct(contract, 'SENSE').kits.find(
          (kit) => kit.id === 'SENSE-SYSTEMS',
        );
        systems.modules = systems.modules.filter((moduleId) => moduleId !== 'SENSE-BILGE');
      },
    },
    (result) => {
      assertFails(result, 'batch02.invariants', /composition must match the SENSE dossier/);
    },
  );
});

test('batch 02 — a kit containing another product instead of a module is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'SENSE').kits[0].modules.push('WATCH-CORE');
      },
    },
    (result) => {
      assertFails(result, 'batch02.invariants', /a kit contains SENSE modules only/);
    },
  );
});

// --- Independent-review regressions (BLK-01, MAJ-02, MAJ-03, MIN-06, MIN-07) ---

test('BLK-01 — a forbidden WATCH price is rejected even on a HYPOTHESIS_UNAPPROVED line', async () => {
  await withFixture(
    {
      edit: {
        [WATCH_REL]: (text) => text.replace('EUR 299', 'EUR 349'),
      },
    },
    (result) => {
      assertFails(
        result,
        'batch02.pricing',
        /not among the allowed batch-02 hypotheses of README §17/,
      );
    },
  );
});

test('BLK-01 — a prohibited claim co-located with HYPOTHESIS_UNAPPROVED is rejected', async () => {
  await withFixture(
    {
      edit: {
        [PILOT_REL]: (text) =>
          `${text}\n\nThe steering unit is NMEA 2000 certified and certified for unattended use, offered as HYPOTHESIS_UNAPPROVED.\n`,
      },
    },
    (result) => {
      assertFails(result, 'nmea', /NMEA 2000 certification claim is prohibited/);
    },
  );
});

test('MAJ-02 — an asset status that contradicts the D9 coverage matrix is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        const reused = contract.assets.find((asset) => asset.assetId === 'PILOT-OVR-03');
        reused.status = 'BLOCKED_ON_IMAGE_GENERATION';
      },
    },
    (result) => {
      assertFails(result, 'assets', /status must be CONCEPT per the D9 coverage matrix/);
    },
  );
});

test('MAJ-02 — a D9 coverage-matrix total that drifts is rejected', async () => {
  await withFixture(
    {
      edit: {
        [ASSETS2_REL]: (text) =>
          text.replace('| **Total** | **30** | **12** |', '| **Total** | **30** | **13** |'),
      },
    },
    (result) => {
      assertFails(result, 'assets', /coverage matrix total blocked must be 12/);
    },
  );
});

test('MAJ-03 — a kit composition mismatch in customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.senseEs]: (text) =>
          text.replace('Power + Bilge + Tanks + Environment', 'Power + Tanks + Environment'),
      },
    },
    (result) => {
      assertFails(result, 'batch02.kits', /composition in customer copy .* does not match D2 §7/);
    },
  );
});

test('MAJ-03 — a kit composition mismatch in D4 is rejected', async () => {
  await withFixture(
    {
      edit: {
        [EDITIONS2_REL]: (text) =>
          text.replace(
            '`SENSE-POWER` (S02), `SENSE-BILGE` (S03), `SENSE-TANKS` (S04) and `SENSE-ENV` (S05)',
            '`SENSE-POWER` (S02), `SENSE-TANKS` (S04) and `SENSE-ENV` (S05)',
          ),
      },
    },
    (result) => {
      assertFails(result, 'batch02.kits', /does not match D2 §7\.3 and the JSON contract/);
    },
  );
});

test('MIN-06 — a SENSE module claiming direct remote alerting is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'SENSE').modules[0].directRemoteAlerts = true;
      },
    },
    (result) => {
      assertFails(result, 'batch02.invariants', /directRemoteAlerts must be false/);
    },
  );
});

test('MIN-06 — a module dependency enumeration contradicting D2 §5.3 is rejected', async () => {
  await withFixture(
    {
      mutateJson2: (contract) => {
        findProduct(contract, 'SENSE').modules[0].hubDependency = 'OPTIONAL';
      },
    },
    (result) => {
      assertFails(
        result,
        'batch02.invariants',
        /hubDependency must be REQUIRED_FOR_MAREA_CONSOLIDATED_VIEW/,
      );
    },
  );
});

test('MIN-07 — an imperative buy-the-device CTA in copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY2_REL.watchEn]: (text) => `${text}\n\nBuy the device and choose the edition.\n`,
      },
    },
    (result) => {
      assertFails(result, 'availability', /imperative purchase CTA is prohibited/);
    },
  );
});
// --- Batch 03 (MC-07): DISPLAY, WEATHER, FLEET negative cases --------------

test('batch 03 — a certified sunlight-performance claim without evidence is rejected', async () => {
  await withFixture(
    {
      edit: {
        [DISPLAY_REL]: (text) =>
          `${text}\n\nThe display is certified sunlight readable and verified for direct sunlight.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /certified or measured sunlight-performance/);
    },
  );
});

test('batch 03 — an IP rating invented for the DISPLAY is rejected', async () => {
  await withFixture(
    {
      edit: {
        [DISPLAY_REL]: (text) => `${text}\n\nIngress protection is IP67 on every unit.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /IP rating is prohibited/);
    },
  );
});

test('batch 03 — unrestricted chart licences in DISPLAY copy are rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.displayEn]: (text) =>
          `${text}\n\nThe display includes unlimited charts for every region.\n`,
      },
    },
    (result) => {
      assertFails(result, 'charts', /unlimited charts are prohibited/);
    },
  );
});

test('batch 03 — an approved PILOT control authority on the DISPLAY is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'DISPLAY').pilotControlAuthority = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /pilotControlAuthority must be false/);
    },
  );
});

test('batch 03 — a frozen final screen size without hardware evidence is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'DISPLAY').screenSizesFrozen = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /screenSizesFrozen must be false/);
    },
  );
});

test('batch 03 — a free non-commercial API approved for a paid weather service is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WEATHER_ANNEX_REL]: (text) =>
          `${text}\n\nThe free non-commercial API tier is approved for our paid service.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /free non-commercial data tier/);
    },
  );
});

test('batch 03 — GRANTED weather data rights without provider evidence are rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'WEATHER').readiness.dataRights = 'GRANTED_PER_TERRITORY';
      },
    },
    (result) => {
      assertFails(result, 'json.products', /readiness\.dataRights must be NOT_GRANTED/);
    },
  );
});

test('batch 03 — an offline entitlement without matching source permission is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'WEATHER').offlineAllowed = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /offlineAllowed must be false/);
    },
  );
});

test('batch 03 — a guaranteed forecast accuracy is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WEATHER_REL]: (text) =>
          `${text}\n\nForecasts are guaranteed and reach 95% accuracy on every route.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /forecast guarantee|forecast accuracy percentage/);
    },
  );
});

test('batch 03 — double billing the same NAV and WEATHER entitlement is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'WEATHER').navDoubleBillingAllowed = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /navDoubleBillingAllowed must be false/);
    },
  );
});

test('batch 03 — accepted cross-tenant access is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'FLEET').crossTenantAccessAllowed = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /crossTenantAccessAllowed must be false/);
    },
  );
});

test('batch 03 — a missing tenant authorization requirement is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'FLEET').tenancy.authorizationRequired = false;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /tenancy\.authorizationRequired must be true/);
    },
  );
});

test('batch 03 — a permissive default role granting all vessel positions is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'FLEET').tenancy.defaultRole = 'ORGANIZATION_OWNER';
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /tenancy\.defaultRole must be "NO_ACCESS"/);
    },
  );
});

test('batch 03 — remote vessel steering offered by FLEET is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        findProduct(contract, 'FLEET').remoteSteeringAllowed = true;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /remoteSteeringAllowed must be false/);
    },
  );
});

test('batch 03 — a guaranteed SLA without measurement evidence is rejected', async () => {
  await withFixture(
    {
      edit: {
        [FLEET_REL]: (text) => `${text}\n\nWe guarantee 99.9% uptime under the MAREA FLEET SLA.\n`,
      },
    },
    (result) => {
      assertFails(
        result,
        'batch03.claims',
        /guaranteed SLA or uptime|guaranteed uptime percentage/,
      );
    },
  );
});

test('batch 03 — an unsupported security certification is rejected', async () => {
  await withFixture(
    {
      edit: {
        [FLEET_REL]: (text) => `${text}\n\nMAREA FLEET is certified to ISO 27001.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /unsupported security certification/);
    },
  );
});

test('batch 03 — a missing privacy and data-export policy is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        delete findProduct(contract, 'FLEET').tenancy.privacyPolicyRequired;
      },
    },
    (result) => {
      assertFails(result, 'batch03.invariants', /tenancy\.privacyPolicyRequired must be true/);
    },
  );
});

test('batch 03 — a missing copy file is rejected', async () => {
  await withFixture({ remove: [COPY3_REL.fleetEn] }, (result) => {
    assertFails(result, 'files.required', /copy[\\/]fleet\.en\.md is missing/);
  });
});

test('batch 03 — an asset status contradicting the D9 partition is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        contract.assets[0].status = 'CONCEPT';
      },
    },
    (result) => {
      assertFails(result, 'assets', /status must be BLOCKED_ON_IMAGE_GENERATION/);
    },
  );
});

test('batch 03 — a drifted D9 reconciliation total is rejected', async () => {
  await withFixture(
    {
      edit: {
        [ASSETS3_REL]: (text) =>
          text.replace('| **Total** | **30** | **12** |', '| **Total** | **30** | **11** |'),
      },
    },
    (result) => {
      assertFails(result, 'assets', /coverage matrix total blocked must be 12/);
    },
  );
});

test('batch 03 — a contract without the batch-02 link is rejected', async () => {
  await withFixture(
    {
      mutateJson3: (contract) => {
        contract.batch02Contract = 'docs/marea/products/product-definitions.batch-02.json.bak';
      },
    },
    (result) => {
      assertFails(result, 'batch03.contract', /batch02Contract must reference/);
    },
  );
});
// --- Review round R1: declarative claim probes (BLK-01, BLK-02, BLK-03) ----

test('BLK-01 — "You can control the vessel remotely from the app" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.fleetEn]: (text) =>
          `${text}\n\nYou can control the vessel remotely from the app.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /remote or display-based steering-control path/);
    },
  );
});

test('BLK-01 — "Control the vessel remotely from the app" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.fleetEn]: (text) => `${text}\n\nControl the vessel remotely from the app.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /remote or display-based steering-control path/);
    },
  );
});

test('BLK-01 — "FLEET lets you steer your boat from your phone" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.fleetEn]: (text) =>
          `${text}\n\nFLEET lets you steer your boat from your phone.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /remote or display-based steering-control path/);
    },
  );
});

test('BLK-01 — "Engage PILOT from the display" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.displayEn]: (text) => `${text}\n\nEngage PILOT from the display.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /remote or display-based steering-control path/);
    },
  );
});

test('BLK-01 — "The display can steer the vessel" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.displayEn]: (text) => `${text}\n\nThe display can steer the vessel.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /display- or app-based steering-control claim/);
    },
  );
});

test('BLK-01 — "PILOT can be controlled from the display" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [DISPLAY_REL]: (text) => `${text}\n\nPILOT can be controlled from the display.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /PILOT control is prohibited/);
    },
  );
});

test('BLK-02 — "Forecasts are 95% accurate" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [WEATHER_REL]: (text) => `${text}\n\nForecasts are 95% accurate.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /forecast accuracy percentage/);
    },
  );
});

test('BLK-03 — "Organization administrators can access cross-tenant data" is rejected', async () => {
  await withFixture(
    {
      edit: {
        [COPY3_REL.fleetEn]: (text) =>
          `${text}\n\nOrganization administrators can access cross-tenant data.\n`,
      },
    },
    (result) => {
      assertFails(result, 'batch03.claims', /cross-tenant access is prohibited/);
    },
  );
});
