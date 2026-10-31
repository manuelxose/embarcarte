import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
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
  assert.match(result.stdout, /Summary: 32 checks run, 32 passed, 0 failed/);
});

test('--json reports a machine-readable PASS with at least 20 checks', async () => {
  const result = await runValidator(REPO_ROOT, ['--json']);
  assert.equal(result.code, 0, result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.result, 'PASS');
  assert.ok(report.checks.length >= 20, 'the validator must run at least 20 checks');
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
