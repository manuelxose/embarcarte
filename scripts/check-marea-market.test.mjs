import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Negative-mutation tests for scripts/check-marea-market.mjs (MC-09 / D23).
 *
 * Every case invokes the real CLI (the same gate used by `npm run test:market`)
 * against a throwaway fixture tree through its `--root` flag: a copy of the real
 * research data, the research documents, the three product contracts, the bundle
 * contract and the milestone registry. One mutation is applied per case and the
 * specific failing check id is asserted. Synthetic fixtures are tagged
 * `testingFixture` and never appear in research findings.
 *
 * The real repository tree is the positive control.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const SCRIPT = join(SCRIPT_DIR, 'check-marea-market.mjs');

const MV = 'docs/marea/market-validation';
const FIXTURE_PATHS = [
  MV,
  'docs/marea/products/product-definitions.batch-01.json',
  'docs/marea/products/product-definitions.batch-02.json',
  'docs/marea/products/product-definitions.batch-03.json',
  'docs/marea/bundles/bundle-definitions.json',
  'docs/marea/execution/MASTER-PROMPT-REGISTRY.md',
];

function makeFixture() {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-market-'));
  for (const relativePath of FIXTURE_PATHS) {
    cpSync(join(REPO_ROOT, relativePath), join(root, relativePath), { recursive: true });
  }
  return root;
}

function runValidator(root) {
  const result = spawnSync(process.execPath, [SCRIPT, '--root', root, '--json'], {
    encoding: 'utf8',
    maxBuffer: 16 * 1024 * 1024,
  });
  let payload = null;
  try {
    payload = JSON.parse(result.stdout);
  } catch {
    payload = null;
  }
  const failed = payload
    ? payload.checks.filter((entry) => entry.status === 'FAIL').map((entry) => entry.id)
    : [];
  return { result, payload, failed };
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'));
}

function writeJson(root, relativePath, value) {
  writeFileSync(join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

function editJson(root, relativePath, mutate) {
  const value = readJson(root, relativePath);
  mutate(value);
  writeJson(root, relativePath, value);
}

function editText(root, relativePath, mutate) {
  const path = join(root, relativePath);
  writeFileSync(path, mutate(readFileSync(path, 'utf8')));
}

function expectCheckFailure(expectedCheckId, mutate) {
  const root = makeFixture();
  try {
    mutate(root);
    const { result, payload, failed } = runValidator(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    assert.ok(
      failed.includes(expectedCheckId),
      `expected ${expectedCheckId} to fail.\nfailed: ${failed.join(', ')}\n${result.stderr}`.slice(
        0,
        1600,
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('positive control: the real repository passes every MC-09 market check', () => {
  const { result, payload, failed } = runValidator(REPO_ROOT);
  assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
  assert.equal(
    failed.length,
    0,
    `real tree fails: ${failed.join(', ')}\n${result.stderr}`.slice(0, 1600),
  );
  assert.equal(result.status, 0);
});

test('MK-08 rejects a claim without source references', () => {
  expectCheckFailure('MK-08', (root) => {
    editJson(root, `${MV}/data/evidence-market.json`, (contract) => {
      delete contract.claims[0].sourceIds;
    });
  });
});

test('MK-06 rejects duplicate evidence IDs', () => {
  expectCheckFailure('MK-06', (root) => {
    editJson(root, `${MV}/data/evidence-market.json`, (contract) => {
      contract.sources.push({ ...contract.sources[0] });
    });
  });
});

test('MK-08 rejects broken internal source references', () => {
  expectCheckFailure('MK-08', (root) => {
    editJson(root, `${MV}/data/evidence-competitors.json`, (contract) => {
      contract.claims[0].sourceIds = ['SRC-CMP-999'];
    });
  });
});

test('MK-14 rejects an observed price without currency', () => {
  expectCheckFailure('MK-14', (root) => {
    editJson(root, `${MV}/data/price-observations.json`, (contract) => {
      const observed = contract.prices.find((price) => price.observed === true);
      observed.currency = '';
    });
  });
});

test('MK-14 rejects an observed price without disclosed tax treatment', () => {
  expectCheckFailure('MK-14', (root) => {
    editJson(root, `${MV}/data/price-observations.json`, (contract) => {
      const observed = contract.prices.find((price) => price.observed === true);
      observed.vatTreatment = '';
    });
  });
});

test('MK-14 rejects an inferred price represented as an observed offer', () => {
  expectCheckFailure('MK-14', (root) => {
    editJson(root, `${MV}/data/price-observations.json`, (contract) => {
      contract.prices.push({
        priceId: 'PRC-CMP-9001',
        obsId: null,
        vendor: 'Fixture Vendor',
        product: 'Fixture Product',
        amount: 1234,
        currency: 'EUR',
        vatTreatment: 'UNKNOWN',
        priceType: 'RETAILER_OFFER',
        observed: false,
        territory: 'ES',
        capturedAt: '2026-10-31',
        sourceUrl: 'https://example.test/fixture',
        notes: 'testingFixture',
      });
    });
  });
});

test('MK-10 rejects a hypothesis presented as a high-confidence empirical finding', () => {
  expectCheckFailure('MK-10', (root) => {
    editJson(root, `${MV}/data/evidence-mc10.json`, (contract) => {
      const hypothesis = contract.claims.find((claim) => claim.evidenceClass === 'HYPOTHESIS');
      assert.ok(hypothesis, 'fixture requires at least one HYPOTHESIS claim');
      hypothesis.confidence = 'HIGH';
    });
  });
});

test('MK-36 rejects an interview count without real interviews', () => {
  expectCheckFailure('MK-36', (root) => {
    editJson(root, `${MV}/data/buyer-segments.json`, (contract) => {
      contract.interviewCount = 12;
    });
  });
});

test('MK-36 rejects simulated survey responses presented as real', () => {
  expectCheckFailure('MK-36', (root) => {
    editJson(root, `${MV}/data/public-signals.json`, (contract) => {
      contract.surveyResponses = [{ n: 40, answer: 'fixture' }];
    });
  });
});

test('MK-15 rejects an unknown cost treated as zero', () => {
  expectCheckFailure('MK-15', (root) => {
    editJson(root, `${MV}/data/tco-models.json`, (contract) => {
      const component = contract.models[0].components.find((entry) => entry.basis === 'UNKNOWN');
      assert.ok(component, 'fixture requires at least one UNKNOWN TCO component');
      component.amount = 0;
    });
  });
});

test('MK-15 rejects a COMPLETE total that hides an unknown component', () => {
  expectCheckFailure('MK-15', (root) => {
    editJson(root, `${MV}/data/tco-models.json`, (contract) => {
      const component = contract.models[0].components.find((entry) => entry.basis === 'UNKNOWN');
      component.basis = 'ASSUMED';
      component.amount = 0;
      contract.models[0].completeness = 'COMPLETE';
      contract.models[0].year1Total = 0;
    });
  });
});

test('MK-17 rejects an unsourced market-size figure', () => {
  expectCheckFailure('MK-17', (root) => {
    editJson(root, `${MV}/data/market-inputs.json`, (contract) => {
      const input = contract.inputs.find((entry) => entry.derivation === 'OBSERVED');
      assert.ok(input, 'fixture requires at least one OBSERVED market input');
      input.sourceId = null;
    });
  });
});

test('MK-17 rejects a SOM derived from an arbitrary market-share percentage', () => {
  expectCheckFailure('MK-17', (root) => {
    editText(
      root,
      `${MV}/market/MC09-MARKET-SIZING.md`,
      (text) => `${text}\nThe SOM is a market share of 3.5% of TAM.\n`,
    );
  });
});

test('MK-09 rejects a stale source presented as a current high-confidence observation', () => {
  expectCheckFailure('MK-09', (root) => {
    editJson(root, `${MV}/data/evidence-market.json`, (contract) => {
      const highClaim = contract.claims.find((claim) => claim.confidence === 'HIGH');
      assert.ok(highClaim, 'fixture requires at least one HIGH confidence claim');
      const source = contract.sources.find((entry) => entry.sourceId === highClaim.sourceIds[0]);
      source.status = 'STALE';
    });
  });
});

test('MK-24 rejects a product name absent from the canonical contracts', () => {
  expectCheckFailure('MK-24', (root) => {
    editJson(root, `${MV}/data/product-assessments.json`, (contract) => {
      contract.families[0].familyId = 'NAVIGATION';
    });
  });
});

test('MK-25 rejects a bundle assessment set that conflicts with the six MC-08 bundles', () => {
  expectCheckFailure('MK-25', (root) => {
    editJson(root, `${MV}/data/bundle-assessments.json`, (contract) => {
      contract.bundles.pop();
    });
  });
});

test('MK-34 rejects a BLOCKED product represented as available', () => {
  expectCheckFailure('MK-34', (root) => {
    editJson(root, 'docs/marea/products/product-definitions.batch-01.json', (contract) => {
      contract.products[0].readiness.availability = 'IN_STOCK';
    });
  });
});

test('MK-04 rejects trademark clearance represented as granted', () => {
  expectCheckFailure('MK-04', (root) => {
    editJson(root, `${MV}/data/governance-status.json`, (contract) => {
      contract.statuses.trademarkLegalClearance = 'GRANTED';
    });
  });
});

test('MK-04 rejects OPEN-MARINE IP clearance represented as granted', () => {
  expectCheckFailure('MK-04', (root) => {
    editJson(root, `${MV}/data/governance-status.json`, (contract) => {
      contract.statuses.sourceIpClearance = 'CLEARED';
    });
  });
});

test('MK-35 rejects NMEA compatibility represented as tested', () => {
  expectCheckFailure('MK-35', (root) => {
    editJson(root, `${MV}/data/competitor-observations.json`, (contract) => {
      contract.compatibilityStatus = 'TESTED';
    });
  });
});

test('MK-27 rejects a remote pilot steering claim', () => {
  expectCheckFailure('MK-27', (root) => {
    editText(
      root,
      `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
      (text) => `${text}\nUnattended PILOT operation is supported.\n`,
    );
  });
});

test('MK-27 rejects a guaranteed WATCH alert claim', () => {
  expectCheckFailure('MK-27', (root) => {
    editText(
      root,
      `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
      (text) => `${text}\nAlert delivery is guaranteed.\n`,
    );
  });
});

test('MK-27 rejects a trademark-cleared commercial claim in prose', () => {
  expectCheckFailure('MK-27', (root) => {
    editText(
      root,
      `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
      (text) => `${text}\nTrademark clearance is GRANTED.\n`,
    );
  });
});

test('MK-34 rejects FLEET hardware included by default', () => {
  expectCheckFailure('MK-34', (root) => {
    editJson(root, 'docs/marea/bundles/bundle-definitions.json', (contract) => {
      contract.globalRestrictions.hardwareIncludedByDefault = true;
    });
  });
});

test('MK-34 rejects a bundle configuration made commercially available', () => {
  expectCheckFailure('MK-34', (root) => {
    editJson(root, 'docs/marea/bundles/bundle-definitions.json', (contract) => {
      contract.bundles[0].commercialAvailability = 'AVAILABLE';
    });
  });
});

test('MK-37 rejects a fixed SAIL/COMPLETE price presented as a current offer', () => {
  expectCheckFailure('MK-37', (root) => {
    editText(
      root,
      `${MV}/economics/MC09-PRICING-AND-WTP.md`,
      (text) => `${text}\nThe COMPLETE bundle is sold at 3,490 EUR.\n`,
    );
  });
});

test('MK-38 rejects an unapproved price presented as commercial approval', () => {
  expectCheckFailure('MK-38', (root) => {
    editJson(root, `${MV}/data/product-assessments.json`, (contract) => {
      contract.families[0].priceApproved = true;
    });
  });
});

test('MK-39 rejects an untraceable competitor ranking', () => {
  expectCheckFailure('MK-39', (root) => {
    editText(
      root,
      `${MV}/competitors/MC09-COMPETITOR-LANDSCAPE.md`,
      (text) => `${text}\nRanking evidence: OBS-CMP-9999.\n`,
    );
  });
});

test('MK-40 rejects checkout activation in research prose', () => {
  expectCheckFailure('MK-40', (root) => {
    editText(
      root,
      `${MV}/MC09-COMPETITIVE-POSITIONING.md`,
      (text) =>
        `${text}\nThe commercial page settings were reviewed today and documented in this section.\nAdd to cart.\n`,
    );
  });
});

test('MK-32 rejects an executive report that is not in Spanish with the mandated sections', () => {
  expectCheckFailure('MK-32', (root) => {
    editText(root, `${MV}/MC09-EXECUTIVE-REPORT.md`, (text) =>
      text.replace(/Veredicto/gi, 'Verdict').replace(/[áéíóúñ¿¡]/gi, ''),
    );
  });
});

test('MK-33 rejects a registry row left as PLANNED after MC-09 delivery', () => {
  expectCheckFailure('MK-33', (root) => {
    editText(root, 'docs/marea/execution/MASTER-PROMPT-REGISTRY.md', (text) =>
      text.replace(/(\|\s*09\s*\|[^\n]*?)\|\s*(?:IN PROGRESS|PASS)[^\n]*?\|/s, '$1| PLANNED |'),
    );
  });
});

test('MK-03 rejects a manifest that lists a missing file', () => {
  expectCheckFailure('MK-03', (root) => {
    editJson(root, `${MV}/data/manifest.json`, (contract) => {
      contract.files.push({ path: 'data/ghost.json', owner: 'lead', purpose: 'fixture' });
    });
  });
});

test('MK-05 rejects an evidence file without a workstream', () => {
  expectCheckFailure('MK-05', (root) => {
    editJson(root, `${MV}/data/evidence-buyers.json`, (contract) => {
      delete contract.workstream;
    });
  });
});

test('MK-19 rejects a missing buyer segment', () => {
  expectCheckFailure('MK-19', (root) => {
    editJson(root, `${MV}/data/buyer-segments.json`, (contract) => {
      contract.segments = contract.segments.filter((segment) => segment.segmentId !== 'S8');
    });
  });
});

test('MK-21 rejects a missing distribution channel', () => {
  expectCheckFailure('MK-21', (root) => {
    editJson(root, `${MV}/data/channel-assessments.json`, (contract) => {
      contract.channels = contract.channels.filter((channel) => channel.channelId !== 'CHN-F');
    });
  });
});

test('MK-23 rejects an experiment marked as executed in MC-09', () => {
  expectCheckFailure('MK-23', (root) => {
    editJson(root, `${MV}/data/validation-experiments.json`, (contract) => {
      contract.experiments[0].executed = true;
    });
  });
});

test('MK-18 rejects a geographic score that does not recompute from frozen weights', () => {
  expectCheckFailure('MK-18', (root) => {
    editJson(root, `${MV}/data/geo-assessments.json`, (contract) => {
      contract.regions[0].weightedScore = 1.23;
    });
  });
});

test('MK-24 rejects product scores that do not recompute from frozen weights', () => {
  expectCheckFailure('MK-24', (root) => {
    editJson(root, `${MV}/data/product-assessments.json`, (contract) => {
      contract.families[0].commercialScore = 5;
    });
  });
});

test('MK-12 rejects bundle benchmarks that omit a canonical bundle', () => {
  expectCheckFailure('MK-12', (root) => {
    editText(root, `${MV}/competitors/MC09-BUNDLE-BENCHMARKS.md`, (text) =>
      text.replace(/^#{1,4}[^\n]*\bCOMPLETE\b[^\n]*$/m, '## Omitted section'),
    );
  });
});

test('MK-28 rejects a source register that omits a source', () => {
  expectCheckFailure('MK-28', (root) => {
    editText(root, `${MV}/MC09-SOURCE-REGISTER.md`, (text) =>
      text.replace(/SRC-MKT-001/g, 'SRC-OMITTED'),
    );
  });
});

test('MK-16 rejects a willingness-to-pay hypothesis claimed as measured', () => {
  expectCheckFailure('MK-16', (root) => {
    editJson(root, `${MV}/data/wtp-hypotheses.json`, (contract) => {
      contract.hypotheses[0].status = 'MEASURED';
    });
  });
});

test('MK-31 rejects an MC-10 plan that claims interviews were executed', () => {
  expectCheckFailure('MK-31', (root) => {
    editText(
      root,
      `${MV}/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md`,
      (text) => `${text}\nWe interviewed 6 owners.\n`,
    );
  });
});
