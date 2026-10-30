import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Proves that scripts/check-brand.mjs actually fails when the contract or a
 * governed brand document breaks the brand governance rules, and that it
 * tolerates the legitimate negative examples those documents must quote.
 *
 * Every case invokes the real CLI in a throwaway fixture tree through its
 * `--root` flag, so the tested code path is exactly the one CI runs.
 */

const SCRIPT = resolve(dirname(fileURLToPath(import.meta.url)), 'check-brand.mjs');
const REPO_ROOT = resolve(dirname(SCRIPT), '..');
const BRAND_DIR = join('docs', 'marea', 'brand');
const CONTRACT_FILE = join(BRAND_DIR, 'brand-identity.contract.json');
const POLICY_FILE = join(BRAND_DIR, 'COMMERCIAL-BRAND-CLAIMS-POLICY.md');

const PROHIBITED_CLAIM_EXAMPLES = [
  'NMEA 2000 certified',
  'guaranteed collision avoidance',
  'fully autonomous',
  'most accurate',
  '100% reliable',
  'immediately available',
];

function claimsPolicyFixture(examples = PROHIBITED_CLAIM_EXAMPLES) {
  return ['# Claims policy (fixture)', '', ...examples.map((claim) => `- "${claim}"`), ''].join(
    '\n',
  );
}

/**
 * Writes the real contract (optionally mutated) into a temporary root, plus a
 * claims policy stub and any extra governed documents the case needs.
 */
function makeFixture({ mutate, docs = {}, extraFiles = {} } = {}) {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-brand-'));
  mkdirSync(join(root, BRAND_DIR), { recursive: true });
  const contract = JSON.parse(readFileSync(join(REPO_ROOT, CONTRACT_FILE), 'utf8'));
  mutate?.(contract);
  writeFileSync(join(root, CONTRACT_FILE), `${JSON.stringify(contract, null, 2)}\n`);
  writeFileSync(join(root, POLICY_FILE), docs[POLICY_FILE] ?? claimsPolicyFixture());
  for (const [path, content] of Object.entries(docs)) {
    if (path === POLICY_FILE) continue;
    writeFileSync(join(root, path), content);
  }
  for (const [path, content] of Object.entries(extraFiles)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), content);
  }
  return root;
}

function runValidator(root) {
  return new Promise((resolveRun) => {
    const child = spawn(process.execPath, [SCRIPT, '--root', root], {
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
    assert.equal(result.stderr, '', 'the validator writes nothing to stderr on a parsed contract');
    assertions(result);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('the real contract passes and absent governed files are reported as skipped', async () => {
  await withFixture({}, (result) => {
    assert.equal(result.code, 0, 'the validator exits 0');
    assert.match(result.stdout, /RESULT: PASS/);
    assert.match(result.stdout, /Summary: \d+ checks run, \d+ passed, 0 failed/);
    assert.match(
      result.stdout,
      /skipped\s+docs\/marea\/brand\/MAREA-BRAND-STRATEGY\.md — not found/,
    );
    assert.match(result.stdout, /0 publication copies in scope/);
  });
});

test('a contract with eight product families is rejected', async () => {
  await withFixture(
    {
      mutate: (contract) => {
        contract.productFamilies.pop();
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+contract\.productFamilies/);
      assert.match(result.stdout, /has 8 entries; expected exactly 9/);
    },
  );
});

test('a contract whose trademarkLegalClearance is not NOT_GRANTED is rejected', async () => {
  await withFixture(
    {
      mutate: (contract) => {
        contract.productBrand.trademarkLegalClearance = 'PENDING_REVIEW';
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+contract\.productBrand/);
      assert.match(result.stdout, /trademarkLegalClearance must be "NOT_GRANTED"/);
    },
  );
});

test('a governed document using a registered-trademark glyph with MAREA is rejected', async () => {
  await withFixture(
    {
      docs: {
        [join(BRAND_DIR, 'MAREA-BRAND-STRATEGY.md')]: '# Strategy\n\nBienvenido a MAREA®.\n',
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.docs\.trademarkSymbols/);
      assert.match(result.stdout, /MAREA-BRAND-STRATEGY\.md:3:/);
    },
  );
});

test('a governed document with a wrong product-name casing is rejected', async () => {
  await withFixture(
    {
      docs: {
        [join(BRAND_DIR, 'PRODUCT-NAMING-SYSTEM.md')]:
          '# Naming\n\nLa familia Marea Nav se presenta así.\n',
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.docs\.productNames/);
      assert.match(result.stdout, /PRODUCT-NAMING-SYSTEM\.md:3:/);
    },
  );
});

test('malformed attribution in a governed document is rejected', async () => {
  await withFixture(
    {
      docs: {
        [join(BRAND_DIR, 'MAREA-BRAND-STRATEGY.md')]:
          '# Strategy\n\nEsta línea presenta MAREA by Open Marine como si fuera la marca.\n',
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.docs\.attribution/);
    },
  );
});

test('a clearance contradiction in a governed document is rejected', async () => {
  await withFixture(
    {
      docs: {
        [join(BRAND_DIR, 'WEBSITE-BRAND-MIGRATION.md')]:
          '# Migration\n\nMAREA is a registered trademark and is available for purchase now.\n',
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.docs\.clearanceClaims/);
    },
  );
});

test('negated clearance, symbol discussions and marked negative examples pass', async () => {
  await withFixture(
    {
      docs: {
        [join(BRAND_DIR, 'BRAND-ARCHITECTURE.md')]: [
          '# Architecture',
          '',
          'MAREA is not a registered trademark. Clearance is pending; NOT_GRANTED remains in force.',
          'Cualquier ® o ™ junto a MAREA está prohibido y nunca se usa.',
          '',
          '### Forbidden',
          '',
          '- MAREA by Open Marine as an endorsement line.',
          '',
          '| Forbidden form | Canonical form |',
          '| --- | --- |',
          '| Marea Nav | MAREA NAV |',
          '',
          '```text',
          'MareaNav / MAREA-NAV are illustrative wrong forms',
          '```',
          '',
          'Never write Marea Nav in published copy.',
        ].join('\n'),
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});

test('the claims policy must restate every prohibited claim pattern', async () => {
  await withFixture(
    {
      docs: {
        [POLICY_FILE]: claimsPolicyFixture(
          PROHIBITED_CLAIM_EXAMPLES.filter((claim) => claim !== 'immediately available'),
        ),
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.policyCoverage/);
      assert.match(
        result.stdout,
        /does not restate prohibited claim pattern "immediately available"/,
      );
    },
  );
});

test('prohibited claims and clearance assertions in a listed publication copy are rejected', async () => {
  await withFixture(
    {
      mutate: (contract) => {
        contract.publicationCopies = [join(BRAND_DIR, 'publication-copy.md')];
      },
      extraFiles: {
        [join(BRAND_DIR, 'publication-copy.md')]: 'Our system is NMEA 2000 certified.\n',
      },
    },
    (result) => {
      assert.equal(result.code, 1);
      assert.match(result.stdout, /FAIL\s+brand\.publicationCopies/);
      assert.match(result.stdout, /publication-copy\.md:1:/);
    },
  );
});

test('files outside governedPaths are never scanned', async () => {
  await withFixture(
    {
      extraFiles: {
        [join('docs', 'marea', 'UNRELATED.md')]:
          '# Out of scope\n\nMAREA® must never appear here.\n',
        [join('src', 'app', 'example.ts')]: "export const brand = 'MAREA®';\n",
      },
    },
    (result) => {
      assert.equal(result.code, 0, result.stdout);
      assert.match(result.stdout, /RESULT: PASS/);
    },
  );
});
