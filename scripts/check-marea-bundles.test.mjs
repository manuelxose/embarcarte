import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Unit tests for scripts/check-marea-bundles.mjs (MC-08 / D18).
 *
 * Every case invokes the real CLI against a throwaway fixture tree through its
 * `--root` flag, so the tested code path is exactly the one used by the
 * milestone gate. A fixture is a copy of the real bundle documents, the three
 * product contracts and the canonical evidence documents the validator reads;
 * one mutation is applied per case and the specific failing check id asserted.
 * The real repository tree is also tested as the positive control.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const SCRIPT = join(SCRIPT_DIR, 'check-marea-bundles.mjs');
const BUNDLES_DIR = 'docs/marea/bundles';
const CONTRACT_PATH = `${BUNDLES_DIR}/bundle-definitions.json`;

const PRODUCT_FILES = [
  'docs/marea/products/product-definitions.batch-01.json',
  'docs/marea/products/product-definitions.batch-02.json',
  'docs/marea/products/product-definitions.batch-03.json',
  'docs/marea/products/PRODUCT-EDITIONS-NAV-HUB-AIS.md',
  'docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md',
  'docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md',
  'docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md',
  'docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md',
  'docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md',
  'docs/marea/products/README.md',
  'docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md',
  'docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md',
  'docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md',
];
const ROOT_FILES = [
  'docs/marea/execution/DECISION-LOG.md',
  'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md',
];

function realContract() {
  return JSON.parse(readFileSync(join(REPO_ROOT, CONTRACT_PATH), 'utf8'));
}

function makeFixture({ mutateContract, edit = {}, remove = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-bundles-'));
  cpSync(join(REPO_ROOT, BUNDLES_DIR), join(root, BUNDLES_DIR), { recursive: true });
  for (const relativePath of [...PRODUCT_FILES, ...ROOT_FILES]) {
    cpSync(join(REPO_ROOT, relativePath), join(root, relativePath), { recursive: true });
  }
  if (typeof mutateContract === 'function') {
    const contract = realContract();
    mutateContract(contract);
    writeFileSync(join(root, CONTRACT_PATH), `${JSON.stringify(contract, null, 2)}\n`);
  }
  for (const [relativePath, transform] of Object.entries(edit)) {
    const target = join(root, relativePath);
    writeFileSync(target, transform(readFileSync(target, 'utf8')));
  }
  for (const relativePath of remove) rmSync(join(root, relativePath), { force: true });
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
    assertions(await runValidator(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function assertFails(result, checkId, pattern) {
  assert.equal(result.code, 1, `the validator must exit 1\n${result.stdout}${result.stderr}`);
  assert.match(
    result.stdout,
    new RegExp(`FAIL\\s+${checkId.replace(/\./g, '\\.')}`),
    result.stdout,
  );
  if (pattern) assert.match(result.stdout, pattern, result.stdout);
}

const bundleOf = (contract, id) => {
  const bundle = contract.bundles.find((entry) => entry.id === id);
  assert.ok(bundle, `the fixture contract must contain bundle ${id}`);
  return bundle;
};

const lineOf = (bundle, lineId) => {
  const line = [...bundle.components, ...bundle.optionalComponents].find(
    (component) => component.lineId === lineId,
  );
  assert.ok(line, `the fixture bundle ${bundle.id} must contain line ${lineId}`);
  return line;
};

// --- Positive controls -----------------------------------------------------

test('the real MC-08 tree passes (baseline for every mutation case)', async () => {
  const result = await runValidator(REPO_ROOT);
  assert.equal(result.code, 0, `${result.stdout}${result.stderr}`);
  assert.match(result.stdout, /RESULT: PASS/);
  assert.match(result.stdout, /Summary: 35 checks run, 35 passed, 0 failed/);
});

test('--json reports a machine-readable PASS with the full check set', async () => {
  const result = await runValidator(REPO_ROOT, ['--json']);
  assert.equal(result.code, 0, result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.result, 'PASS');
  assert.ok(report.checks.length >= 35, 'the validator must run the full hardened check set');
  assert.ok(report.checks.every((entry) => entry.status === 'PASS'));
  assert.equal(report.summary.bundles, 6);
  assert.equal(report.summary.assets, 60);
  assert.equal(report.registry.products, 9);
  assert.equal(report.registry.kits.length, 3);
});

// --- The 21 mandated negative mutations -----------------------------------

test('mutation 1 — removing a mandatory component is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const start = bundleOf(contract, 'START');
        start.components = start.components.filter((component) => component.lineId !== 'ST-01');
      },
    },
    (result) =>
      assertFails(result, 'BUNDLE-09', /missing mandatory reference component HUB HUB-STANDARD/),
  );
});

test('mutation 2 — an unknown product edition is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'CRUISE'), 'CR-04').editionId = 'DISPLAY-ULTRA';
      },
    },
    (result) => assertFails(result, 'BUNDLE-06', /does not exist in family DISPLAY/),
  );
});

test('mutation 3 — the same SENSE module counted via kit expansion and loose line is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const protect = bundleOf(contract, 'PROTECT');
        protect.components.push({
          lineId: 'PR-90',
          familyId: 'SENSE',
          editionId: 'SENSE-POWER',
          expandsTo: null,
          quantity: 1,
          role: 'Duplicate loose power module',
          inclusion: 'INCLUDED',
          requiredForOutcome: false,
          dependencies: [],
          subscriptionEntitlement: null,
          compatibility: {
            integrationId: 'I-08',
            status: 'PLANNED',
            evidence: 'none',
            deviceTestRecorded: false,
            releaseGate: 'none',
          },
          evidenceClass: 'VERIFIED_REPO',
          priceStatus: 'NOT_ESTABLISHED',
          priceHypothesisRef: null,
          costStatus: 'NOT_ESTABLISHED',
          installationClassification: 'PROFESSIONAL_REQUIRED',
          releaseBlockers: [],
        });
      },
    },
    (result) => assertFails(result, 'BUNDLE-08', /counts SENSE-POWER twice/),
  );
});

test('mutation 4 — PILOT Pro treated as a fixed retail SKU is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const sail = bundleOf(contract, 'SAIL');
        const pilotPro = lineOf(sail, 'SL-06');
        pilotPro.inclusion = 'INCLUDED';
        pilotPro.priceHypothesisRef = 'PILOT-PRO';
      },
    },
    (result) => assertFails(result, 'BUNDLE-10', /PILOT-PRO/),
  );
});

test('mutation 5 — SAIL approved as a EUR 1,990 turnkey price is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const sail = bundleOf(contract, 'SAIL');
        sail.pricing.fixedTurnkeyPriceApproved = true;
        sail.pricing.totalPriceEstablished = true;
        sail.pricing.verdict = 'APPROVED';
      },
    },
    (result) =>
      assertFails(
        result,
        'BUNDLE-10',
        /fixedTurnkeyPriceApproved must be false|pilotSurveyRequired must be true/,
      ),
  );
});

test('mutation 6 — COMPLETE approved at EUR 3,490 is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        bundleOf(contract, 'COMPLETE').pricing.historicalHypothesis.status = 'APPROVED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-19', /invalid price status|approved price/),
  );
});

test('mutation 7 — an AIS receiver presented as a transponder is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.aisTransmissionOffered = true;
      },
    },
    (result) =>
      assertFails(result, 'BUNDLE-14', /AIS transmission|aisTransmissionOffered must be false/),
  );
});

test('mutation 8 — HUB given steering authority is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'START'), 'ST-01').steeringAuthority = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-18', /steering authority/),
  );
});

test('mutation 9 — chart rights claimed without evidence are rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.chartRightsGranted = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /globalRestrictions/),
  );
});

test('mutation 10 — NAV/WEATHER entitlement charged twice is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const weather = contract.entitlementsMatrix.find(
          (entry) => entry.entitlementId === 'WEATHER_SUBSCRIPTION',
        );
        weather.doubleBillingAllowed = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-12', /doubleBillingAllowed=false/),
  );
});

test('mutation 11 — WATCH without a monitoring subscription declaration is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const protect = bundleOf(contract, 'PROTECT');
        protect.recurringSubscriptions = protect.recurringSubscriptions.filter(
          (subscription) => subscription.entitlement !== 'WATCH_MONITORING_SUBSCRIPTION',
        );
      },
    },
    (result) => assertFails(result, 'BUNDLE-11', /no WATCH_MONITORING_SUBSCRIPTION/),
  );
});

test('mutation 12 — a guaranteed immediate remote alert claim is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.instantAlertGuarantee = true;
        contract.publicationControls.instantAlertGuaranteeAllowed = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-15', /instantAlertGuarantee must be false/),
  );
});

test('mutation 13 — DISPLAY-LARGE presented as an approved physical size is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'CRUISE'), 'CR-07').inclusion = 'INCLUDED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-13', /makes DISPLAY-LARGE-CONDITIONAL selectable/),
  );
});

test('mutation 14 — cross-tenant access granted in the FLEET package is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.tenancyBoundaries.crossTenantAccessAllowed = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-17', /crossTenantAccessAllowed must be false/),
  );
});

test('mutation 15 — FLEET hardware folded into the SaaS subscription is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.hardwareIncludedByDefault = true;
        bundleOf(contract, 'FLEET').hardwareIncludedByDefault = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-16', /hardwareIncludedByDefault must be false/),
  );
});

test('mutation 16 — any bundle marked FOR_SALE is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        bundleOf(contract, 'START').commercialAvailability = 'FOR_SALE';
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /commercialAvailability must be NOT_FOR_SALE/),
  );
});

test('mutation 17 — trademark clearance GRANTED is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.trademarkLegalClearance = 'GRANTED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /globalRestrictions/),
  );
});

test('mutation 18 — OPEN-MARINE source rights CLEARED without evidence are rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.sourceIpClearance = 'CLEARED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /globalRestrictions/),
  );
});

test('mutation 19 — an unapproved price turned into an APPROVED price is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        bundleOf(contract, 'START').pricing.historicalHypothesis.status = 'APPROVED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-19', /invalid price status|approved price/),
  );
});

test('mutation 20 — an invented NMEA 2000 certification is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.globalRestrictions.nmea2000Certified = true;
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /globalRestrictions/),
  );
});

test('mutation 21 — disabling a safety-critical local function for non-payment is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.subscriptionIsolationRules[0].statement =
          'Non-payment disables local steering immediately until the subscription is renewed.';
      },
    },
    (result) => assertFails(result, 'BUNDLE-28', /allows gating a safety function/),
  );
});

// --- Additional adversarial mutations -------------------------------------

test('extra mutation — a price in customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/copy/start.es.md': (text) =>
          `${text}\n\nPrecio de lanzamiento: 499 €\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-23', /currency amount|price pattern/),
  );
});

test('extra mutation — a bundle specification missing B24 is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md': (text) =>
          text.replace(/^#### B24 .*$/m, '#### B24 removed by fixture'),
      },
    },
    (result) => assertFails(result, 'BUNDLE-22', /B24|24 B01-B24 blocks/),
  );
});

test('extra mutation — a missing planned asset is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.assets = contract.assets.filter((asset) => asset.id !== 'START-HERO-01');
      },
    },
    (result) => assertFails(result, 'BUNDLE-24', /exactly 60 assets|START/),
  );
});

test('extra mutation — compatibility labelled SUPPORTED without a device test is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'START'), 'ST-02').compatibility.status = 'SUPPORTED';
      },
    },
    (result) =>
      assertFails(
        result,
        'BUNDLE-31',
        /calls compatibility SUPPORTED without a device test record|reports SUPPORTED/,
      ),
  );
});

test('extra mutation — a tampered SENSE kit expansion is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'PROTECT'), 'PR-02').expandsTo = ['SENSE-WIND'];
      },
    },
    (result) => assertFails(result, 'BUNDLE-06', /expands to \[SENSE-WIND\]/),
  );
});

test('extra mutation — a PUBLIC publication state is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        bundleOf(contract, 'CRUISE').publicationState = 'PUBLIC';
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /publicationState must be INTERNAL_ONLY/),
  );
});

test('extra mutation — the field model must keep exactly the 24 Lead-fixed keys', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.bundleFieldModel.keys[1] = 'bundleType';
      },
    },
    (result) => assertFails(result, 'BUNDLE-29', /24 bundle keys/),
  );
});

test('extra mutation — a mandatory SAL/COMPLETE survey flag cannot be cleared', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        bundleOf(contract, 'COMPLETE').pricing.pilotSurveyRequired = false;
      },
    },
    (result) => assertFails(result, 'BUNDLE-10', /pilotSurveyRequired must be true/),
  );
});

// --- MC-08 review corrections (B-01, B-02, M-01, M-02, m-01, m-02, m-03) ---

test('B-01 — a normal "for sale" sentence in a specification is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md': (text) =>
          `${text}\n\nThis bundle is now for sale.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-32', /positive "for sale \/ orderable" assertion/),
  );
});

test('B-01 — a normal "for sale" sentence in customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/copy/start.en.md': (text) =>
          `${text}\n\nThe package is now purchasable.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-26', /positive "for sale \/ orderable" assertion/),
  );
});

test('B-02 — a guaranteed-immediate-alert claim in customer copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/copy/start.en.md': (text) =>
          `${text}\n\nGuaranteed immediate alerts on every passage.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-15', /claims guaranteed immediate alert delivery/),
  );
});

test('M-01 — promoting a CONDITIONAL reference line to INCLUDED is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'CRUISE'), 'CR-06').inclusion = 'INCLUDED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-34', /inclusion must be CONDITIONAL/),
  );
});

test('M-01 — adding an unpinned INCLUDED component is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const start = bundleOf(contract, 'START');
        start.components.push({
          lineId: 'ST-99',
          familyId: 'AIS',
          editionId: 'AIS-RECEIVER',
          expandsTo: null,
          quantity: 1,
          role: 'Unpinned mandatory addition',
          inclusion: 'INCLUDED',
          requiredForOutcome: true,
          dependencies: [],
          subscriptionEntitlement: null,
          compatibility: {
            integrationId: 'C-02',
            status: 'UNKNOWN_NOT_TESTED',
            evidence: 'none',
            deviceTestRecorded: false,
            releaseGate: 'none',
          },
          evidenceClass: 'VERIFIED_REPO',
          priceStatus: 'HYPOTHESIS_UNAPPROVED',
          priceHypothesisRef: 'AIS-RECEIVER',
          costStatus: 'NOT_ESTABLISHED',
          installationClassification: 'PROFESSIONAL_REQUIRED',
          releaseBlockers: [],
        });
      },
    },
    (result) =>
      assertFails(
        result,
        'BUNDLE-34',
        /is INCLUDED but not in the fixed reference composition|not pinned in the fixed reference composition/,
      ),
  );
});

test('M-02 — a sale/approval token in component.inclusion is rejected at line level', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        lineOf(bundleOf(contract, 'START'), 'ST-03').inclusion = 'APPROVED';
      },
    },
    (result) => assertFails(result, 'BUNDLE-33', /invalid inclusion value APPROVED/),
  );
});

test('m-01 — deleting the DISPLAY-LARGE-CONDITIONAL ineligibility line is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        const cruise = bundleOf(contract, 'CRUISE');
        cruise.components = cruise.components.filter((component) => component.lineId !== 'CR-07');
      },
    },
    (result) => assertFails(result, 'BUNDLE-13', /must retain the DISPLAY-LARGE-CONDITIONAL line/),
  );
});

test('m-02 — a configuration-rule id reusing the CRUISE CR-NN namespace is rejected', async () => {
  await withFixture(
    {
      mutateContract: (contract) => {
        contract.configurationRules[0].id = 'CR-01';
      },
    },
    (result) => assertFails(result, 'BUNDLE-25', /must use the CFG-NN namespace/),
  );
});

test('m-02 — configuration rules use CFG-NN and never collide with component line ids', async () => {
  const contract = realContract();
  const ruleIds = contract.configurationRules.map((rule) => rule.id);
  assert.equal(
    ruleIds.join(','),
    Array.from({ length: 12 }, (_, index) => `CFG-${String(index + 1).padStart(2, '0')}`).join(','),
  );
  const lineIds = new Set(
    contract.bundles
      .flatMap((bundle) => [...bundle.components, ...bundle.optionalComponents])
      .map((component) => component.lineId),
  );
  for (const ruleId of ruleIds)
    assert.ok(!lineIds.has(ruleId), `${ruleId} collides with a line id`);
});

test('m-03 — removing the approved weather disclaimer from a forecast copy surface is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/copy/start.en.md': (text) =>
          text.replace(
            'Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point.',
            '',
          ),
      },
    },
    (result) =>
      assertFails(
        result,
        'BUNDLE-23',
        /missing the approved weather disclaimer for a forecast surface/,
      ),
  );
});

test('m-03 — removing the approved AIS receive-only disclaimer from FLEET copy is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/copy/fleet-package.en.md': (text) =>
          text.replace(
            'AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder.',
            '',
          ),
      },
    },
    (result) => assertFails(result, 'BUNDLE-23', /missing the approved AIS disclaimer/),
  );
});

// --- MC-08 round-3 corrections (R-01, R-02, R-03, R-04 stale rule ids) ----

test('R-01 — a name-subject sale sentence is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md': (text) =>
          `${text}\n\nMAREA START is now for sale.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-32', /subject-agnostic sale/),
  );
});

test('R-01 — a modal sale sentence is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md': (text) =>
          `${text}\n\nThe bundle can be purchased today.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-32', /subject-agnostic sale/),
  );
});

test('R-02 — a quoted governance example is accepted', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md': (text) =>
          `${text}\n\nThe phrase "this bundle is for sale" is prohibited and must never be written.\n`,
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});

test('R-02 — the same sentence without quotation marks is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md': (text) =>
          `${text}\n\nThe phrase this bundle is for sale is prohibited and must never be written.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-32', /subject-agnostic sale/),
  );
});

test('R-04 — a stale CR-NN configuration-rule reference is rejected', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/BUNDLE-ARCHITECTURE.md': (text) =>
          `${text}\n\nSee rule \`CR-07\` for the FLEET reporting boundary.\n`,
      },
    },
    (result) => assertFails(result, 'BUNDLE-35', /configuration rules use CFG-NN/),
  );
});

test('R-04 — a legitimate CR-NN CRUISE line id is still accepted', async () => {
  await withFixture(
    {
      edit: {
        'docs/marea/bundles/BUNDLE-ARCHITECTURE.md': (text) =>
          `${text}\n\nThe CRUISE line \`CR-01\` remains a NAV-ESSENTIAL component line id.\n`,
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});

test('R-03 — the configuration-rules document names the FLEET package AIS surface', () => {
  const rules = readFileSync(
    join(REPO_ROOT, 'docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md'),
    'utf8',
  );
  assert.match(rules, /AIS receive-only \| CRUISE, COMPLETE and FLEET package copy/);
  assert.match(rules, /AIS on CRUISE\/COMPLETE\/FLEET package/);
});

test('R-04 — no bundle document keeps a CR-NN configuration-rule reference', () => {
  const bundleDir = join(REPO_ROOT, 'docs/marea/bundles');
  for (const file of readdirSync(bundleDir).filter((name) => name.endsWith('.md'))) {
    if (file === 'MC-08-REVIEW.md') continue;
    const text = readFileSync(join(bundleDir, file), 'utf8');
    assert.doesNotMatch(
      text,
      /(?:rule|regla)\s*[`"']?\s*CR-\d{2}\b/i,
      `${file} still cites a configuration rule with the CR-NN line-id prefix`,
    );
    assert.doesNotMatch(
      text,
      /§\s*[\d.]+\s*\([^)\n]{0,40}\bCR-\d{2}\b/,
      `${file} still cites a rule reference through CR-NN`,
    );
  }
  const fleetSpec = readFileSync(join(bundleDir, 'MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md'), 'utf8');
  assert.match(fleetSpec, /CFG-07/);
  assert.doesNotMatch(fleetSpec, /rule `CR-07`/);
});
