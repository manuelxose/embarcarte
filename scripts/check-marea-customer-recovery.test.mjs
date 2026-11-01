import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
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
 * Negative-mutation and adversarial suite for
 * scripts/check-marea-customer-recovery.mjs (MC-10R / D32).
 *
 * Every case copies the recovery package into a throwaway fixture root under the
 * operating system temporary directory, proves that the unmutated fixture passes
 * the gate, then introduces exactly one mutation and proves that the expected
 * CRR check ids fail. Some cases are acceptance controls: a legitimate
 * hypothetical/prepared/synthetic/public-source statement must NOT be rejected.
 *
 * The fixture contains only repository content plus temporary synthetic text;
 * nothing is written back to the repository.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const SCRIPT = join(SCRIPT_DIR, 'check-marea-customer-recovery.mjs');

const CD = 'docs/marea/customer-discovery';
const RECOVERY = `${CD}/recovery`;
const RDATA = `${RECOVERY}/data`;

const D19 = `${RDATA}/MC10R-ACCESS-RETENTION-AND-DELETION.md`;
const D20 = `${RDATA}/MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE.md`;
const D27 = `${RDATA}/mc10r-recovery.contract.json`;
const D28 = `${RDATA}/mc10r-amendments.json`;
const D29 = `${RDATA}/mc10r-authorization-draft.json`;
const D30 = `${RDATA}/mc10r-fieldwork-readiness.json`;

/**
 * The fixture needs the research-data contract AND the recovery package, plus the
 * two validator scripts and the frozen MC-10 zero-data records the gate
 * cross-checks. A whole-customer-discovery copy keeps the peer-owned deliverables
 * and the gate's cross-references coherent without inventing any file.
 */
const FIXTURE_PATHS = [
  CD,
  'scripts/check-marea-customer-recovery.mjs',
  'scripts/check-marea-customer-recovery.test.mjs',
  'scripts/check-marea-customer-research.mjs',
];

const EXPECTED_CRR_MIN = 30;

function writeText(root, relativePath, content) {
  const full = join(root, relativePath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
}

function writeJson(root, relativePath, value) {
  writeText(root, relativePath, `${JSON.stringify(value, null, 2)}\n`);
}

function readJson(root, relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), 'utf8'));
}

function readText(root, relativePath) {
  return readFileSync(join(root, relativePath), 'utf8');
}

function editJson(root, relativePath, mutate) {
  const value = readJson(root, relativePath);
  mutate(value);
  writeJson(root, relativePath, value);
}

function appendText(root, relativePath, text) {
  writeText(root, relativePath, `${readText(root, relativePath)}\n${text}\n`);
}

function replaceText(root, relativePath, from, to) {
  const text = readText(root, relativePath);
  assert.ok(text.includes(from), `fixture precondition: ${relativePath} must contain ${from}`);
  writeText(root, relativePath, text.replace(from, to));
}

function makeFixture() {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-mc10r-recovery-'));
  for (const relativePath of FIXTURE_PATHS) {
    cpSync(join(REPO_ROOT, relativePath), join(root, relativePath), { recursive: true });
  }
  return root;
}

function runGate(root, extraArgs = ['--json']) {
  const result = spawnSync(process.execPath, [SCRIPT, '--root', root, ...extraArgs], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
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

function assertBaselinePasses(root) {
  const baseline = runGate(root);
  assert.ok(baseline.payload, `validator produced no JSON summary: ${baseline.result.stderr}`);
  assert.deepEqual(
    baseline.failed,
    [],
    `fixture baseline fails the gate: ${baseline.failed.join(', ')}\n${baseline.result.stderr}`.slice(
      0,
      2400,
    ),
  );
  assert.ok(
    baseline.payload.total >= EXPECTED_CRR_MIN,
    `the recovery gate must declare at least ${EXPECTED_CRR_MIN} checks`,
  );
  return baseline;
}

function expectChecksFailure(expectedIds, mutate) {
  const root = makeFixture();
  try {
    assertBaselinePasses(root);
    mutate(root);
    const { result, payload, failed } = runGate(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    assert.notEqual(result.status, 0, 'the mutated fixture must exit non-zero');
    const expected = Array.isArray(expectedIds) ? expectedIds : [expectedIds];
    assert.ok(
      expected.some((id) => failed.includes(id)),
      `expected one of ${expected.join('/')} to fail; failed: ${failed.join(', ')}\n${result.stderr}`.slice(
        0,
        2400,
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function expectChecksPass(allowedPassIds, mutate) {
  const root = makeFixture();
  try {
    assertBaselinePasses(root);
    mutate(root);
    const { result, payload, failed } = runGate(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    for (const id of allowedPassIds) {
      assert.ok(!failed.includes(id), `accepted context wrongly failed ${id}: ${result.stderr}`);
    }
    assert.equal(result.status, 0, `accepted context must still pass: ${failed.join(', ')}`);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

// --------------------------------------------------------------------- basics

test('positive control: the unmutated fixture passes the recovery gate', () => {
  const root = makeFixture();
  try {
    const baseline = assertBaselinePasses(root);
    const ids = baseline.payload.checks.map((entry) => entry.id);
    const expected = Array.from(
      { length: ids.length },
      (_, index) => `CRR-${String(index + 1).padStart(2, '0')}`,
    );
    assert.deepEqual(ids, expected, 'check ids must be CRR-01..CRR-N contiguous');
    assert.equal(baseline.payload.failed, 0);
    assert.equal(baseline.payload.passed, baseline.payload.total);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('CLI prints N/N checks passed and exits 0 on a clean fixture', () => {
  const root = makeFixture();
  try {
    const { result } = runGate(root, []);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /^MC-10R recovery validation: \d+\/\d+ checks passed$/m);
    const summary = result.stdout.trim().split('\n').pop();
    const [, passed, total] = summary.match(/(\d+)\/(\d+) checks passed/);
    assert.equal(passed, total);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('CLI prints FAIL lines and exits non-zero on a mutated fixture', () => {
  const root = makeFixture();
  try {
    editJson(root, D29, (draft) => {
      draft.authorizationStatus = 'GRANTED';
    });
    const { result } = runGate(root, []);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /FAIL CRR-\d{2}/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// ------------------------------------------------- authorization and permissions

test('CRR-05/06 reject an authorization flipped GRANTED with null evidence', () => {
  expectChecksFailure(['CRR-05', 'CRR-06', 'CRR-04', 'CRR-25'], (root) => {
    editJson(root, D29, (draft) => {
      draft.authorizationStatus = 'GRANTED';
      draft.currentAuthorizationStatus = 'GRANTED';
    });
  });
});

test('CRR-04/05 reject fieldworkPermission true while the authorization is ungranted', () => {
  expectChecksFailure(['CRR-04', 'CRR-05', 'CRR-25'], (root) => {
    editJson(root, D29, (draft) => {
      draft.fieldworkPermission = true;
    });
  });
});

test('CRR-04/05 reject external contact allowed while ungranted', () => {
  expectChecksFailure(['CRR-04', 'CRR-05', 'CRR-25'], (root) => {
    editJson(root, D29, (draft) => {
      draft.externalContactAllowed = true;
    });
  });
});

test('CRR-06 rejects an invented authorizer / signature while ungranted', () => {
  expectChecksFailure(['CRR-06', 'CRR-07', 'CRR-25'], (root) => {
    editJson(root, D29, (draft) => {
      draft.authorizingPerson = 'Jane Doe';
      draft.approvalEvidence = 'signed 2026-11-01';
    });
  });
});

test('CRR-07/06 reject a missing expiry field in the authorization draft', () => {
  expectChecksFailure(['CRR-05', 'CRR-06', 'CRR-07'], (root) => {
    editJson(root, D29, (draft) => {
      delete draft.expiryDate;
    });
  });
});

test('CRR-07 rejects an authorization draft that diverges from D13', () => {
  expectChecksFailure(['CRR-07'], (root) => {
    editJson(root, D29, (draft) => {
      draft.programme = 'EMBARCARTE / MAREA - a different programme string';
    });
  });
});

test('CRR-02 rejects a binding truth that claims authorization', () => {
  expectChecksFailure(['CRR-02'], (root) => {
    editJson(root, D27, (contract) => {
      contract.bindingTruth.authMc10001 = 'GRANTED';
    });
  });
});

test('CRR-03 rejects a weakened commercial invariant', () => {
  expectChecksFailure(['CRR-03', 'CRR-26'], (root) => {
    editJson(root, D27, (contract) => {
      contract.commercialInvariants.productSales = 'AVAILABLE';
    });
  });
});

test('CRR-26 rejects a newly approved price count', () => {
  expectChecksFailure(['CRR-03', 'CRR-26'], (root) => {
    editJson(root, D27, (contract) => {
      contract.commercialInvariants.approvedPrices = 3;
    });
  });
});

// ----------------------------------------------------- amendments and evidence

test('CRR-11 rejects an amendment marked APPROVED without approval evidence', () => {
  expectChecksFailure(['CRR-11', 'CRR-25'], (root) => {
    editJson(root, D28, (registry) => {
      registry.amendments[0].status = 'APPROVED';
    });
  });
});

test('CRR-11 rejects approval evidence on an amendment', () => {
  expectChecksFailure(['CRR-11', 'CRR-25'], (root) => {
    editJson(root, D28, (registry) => {
      registry.amendments[5].approvalEvidence = 'reviewer approved it';
    });
  });
});

test('CRR-11 rejects an effective date on an amendment', () => {
  expectChecksFailure(['CRR-11', 'CRR-25'], (root) => {
    editJson(root, D28, (registry) => {
      registry.amendments[9].effectiveDate = '2026-11-01';
    });
  });
});

test('CRR-11 rejects a registry that drops an instrument amendment', () => {
  expectChecksFailure(['CRR-11', 'CRR-12'], (root) => {
    editJson(root, D28, (registry) => {
      registry.amendments.pop();
    });
  });
});

test('CRR-12 rejects a D27 amendment block that disagrees with the registry', () => {
  expectChecksFailure(['CRR-12'], (root) => {
    editJson(root, D27, (contract) => {
      contract.amendments.approvedCount = 1;
    });
  });
});

// ------------------------------------------------------------ sampling / quotas

test('CRR-08 rejects a quota total inconsistent with the segment sums', () => {
  expectChecksFailure(['CRR-08'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.totalMinimum = 40;
    });
  });
});

test('CRR-08 rejects a segment maximum raised to fake the 37/57 sums', () => {
  expectChecksFailure(['CRR-08'], (root) => {
    editJson(root, D27, (contract) => {
      const seg04 = contract.sampling.historicalQuotas.find(
        (entry) => entry.segmentId === 'SEG-04',
      );
      seg04.maximum = 8;
    });
  });
});

test('CRR-08 rejects dropping the historical 40-80 aspiration', () => {
  expectChecksFailure(['CRR-08'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.historicalTarget.maximum = 57;
    });
  });
});

test('CRR-09 rejects a Wave 1 presented as the full study', () => {
  expectChecksFailure(['CRR-09'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.waves[0].isFullStudy = true;
    });
  });
});

test('CRR-09 rejects a Wave 1 quota inconsistent with its cohorts', () => {
  expectChecksFailure(['CRR-09'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.waves[0].minimum = 37;
    });
  });
});

test('CRR-24 rejects a readiness Wave 1 presented as complete', () => {
  expectChecksFailure(['CRR-24'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.wave1.isFullStudy = true;
    });
  });
});

test('CRR-24 rejects a Wave 1 quota total changed in the readiness record', () => {
  expectChecksFailure(['CRR-24'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.wave1.quotaMaximum = 37;
    });
  });
});

test('CRR-24 rejects a Portugal scope that is no longer excluded', () => {
  expectChecksFailure(['CRR-24'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.wave1.portugalScope = 'INCLUDED';
    });
  });
});

// -------------------------------------------------------------- pricing matrix

test('CRR-10 rejects a segment maximum raised to fake pricing reachability', () => {
  expectChecksFailure(['CRR-10'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.pricingFeasibility.segments['SEG-04'].plannedMax = 8;
    });
  });
});

test('CRR-10 rejects a BELOW_REGISTERED_MINIMUM segment reclassified as reachable', () => {
  expectChecksFailure(['CRR-10'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.pricingFeasibility.segments['SEG-06'].reachability =
        'REACHABLE_AT_PLANNED_MAX';
    });
  });
});

test('CRR-10 rejects a segment below the minimum added to the eligible cells', () => {
  expectChecksFailure(['CRR-10'], (root) => {
    editJson(root, D27, (contract) => {
      const pricing = contract.sampling.pricingFeasibility;
      pricing.experimentLevelEligibleCells.push('SEG-06__EXP-MC10-04__CONSTRUCT-01');
    });
  });
});

test('CRR-10 rejects a NOT_NAMED population presented as experiment-level eligible', () => {
  expectChecksFailure(['CRR-10'], (root) => {
    editJson(root, D27, (contract) => {
      contract.sampling.pricingFeasibility.segments['SEG-05'].registeredPopulation['EXP-MC10-04'] =
        'NAMED_SUBJECT';
    });
  });
});

test('CRR-24 rejects a Wave 1 pricing cell presented as experiment-level without eligibility', () => {
  expectChecksFailure(['CRR-24'], (root) => {
    editJson(root, D30, (readiness) => {
      const cell = readiness.wave1.pricing.cells.find((entry) => entry.segmentId === 'SEG-06');
      cell.experimentLevelResultPermitted = true;
      cell.intendedInterpretation = 'GG_BAND_AT_N8';
    });
  });
});

// ------------------------------------------------------ consent and withdrawal

test('CRR-19 rejects an invalid consent transition WITHDRAWN->GRANTED', () => {
  expectChecksFailure(['CRR-19'], (root) => {
    editJson(root, D27, (contract) => {
      contract.consentModel.allowedTransitions.push({ from: 'WITHDRAWN', to: 'GRANTED' });
    });
  });
});

test('CRR-19 rejects a refused consent silently upgraded to GRANTED', () => {
  expectChecksFailure(['CRR-19'], (root) => {
    editJson(root, D27, (contract) => {
      contract.consentModel.allowedTransitions.push({ from: 'REFUSED', to: 'GRANTED' });
    });
  });
});

test('CRR-19 rejects a truncated withdrawal propagation chain', () => {
  expectChecksFailure(['CRR-19'], (root) => {
    editJson(root, D27, (contract) => {
      contract.consentModel.withdrawalPropagation.pop();
    });
  });
});

test('CRR-19 rejects a fabricated human in an accountable owner field', () => {
  expectChecksFailure(['CRR-19'], (root) => {
    editJson(root, D27, (contract) => {
      contract.consentModel.accountableOwnerFields.controller = 'Ana Pérez';
    });
  });
});

test('CRR-19 rejects a consent instrument presented as effective', () => {
  expectChecksFailure(['CRR-19'], (root) => {
    editJson(root, D27, (contract) => {
      contract.consentModel.effective = true;
    });
  });
});

// -------------------------------------------------- readiness, roles and store

test('CRR-22 rejects an interviewer marked trained', () => {
  expectChecksFailure(['CRR-22'], (root) => {
    editJson(root, D30, (readiness) => {
      const interviewers = readiness.roles.find((entry) => entry.role === 'interviewers');
      interviewers.status = 'TRAINED';
      interviewers.trained = true;
    });
  });
});

test('CRR-22 rejects an interviewer counted as assigned', () => {
  expectChecksFailure(['CRR-22'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.counts.assignedInterviewers = 2;
    });
  });
});

test('CRR-23/25 reject a storage marked PROVISIONED', () => {
  expectChecksFailure(['CRR-23', 'CRR-25'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.storage.provisioned = true;
    });
  });
});

test('CRR-23 rejects an unprovisioned store claimed in the D27 readiness block', () => {
  expectChecksFailure(['CRR-04', 'CRR-23', 'CRR-25'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.storage.accessReviewed = true;
      readiness.storage.operationallyApproved = true;
    });
  });
});

test('CRR-23 rejects a designated controller fabricated in the readiness record', () => {
  expectChecksFailure(['CRR-23'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.legalPrivacy.controllerIdentity = 'EMBARCARTE S.L.';
    });
  });
});

test('CRR-21 rejects a prerequisite that is not classified', () => {
  expectChecksFailure(['CRR-21'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.prerequisites[0].classification = 'DONE';
    });
  });
});

test('CRR-21 rejects an authorization prerequisite that is no longer BLOCKED', () => {
  expectChecksFailure(['CRR-21'], (root) => {
    editJson(root, D30, (readiness) => {
      const prerequisite = readiness.prerequisites.find((entry) =>
        /authori[sz]ation/i.test(entry.prerequisite),
      );
      prerequisite.classification = 'VERIFIED_COMPLETE';
    });
  });
});

test('CRR-24 rejects a positive participant count in the readiness record', () => {
  expectChecksFailure(['CRR-17', 'CRR-24'], (root) => {
    editJson(root, D30, (readiness) => {
      readiness.counts.participants = 3;
    });
  });
});

// -------------------------------------------------- fabrication and data safety

test('CRR-16 rejects a fabricated attributed quotation in English', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> "The alert is useless and I would pay for it." — an owner');
  });
});

test('CRR-16 rejects a fabricated attributed quotation in Spanish', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> "Pagaría por el aviso." — un armador');
  });
});

test('CRR-16 rejects a fabricated attributed quotation in Portuguese', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> "Eu pagaria pelo aviso." — um instalador');
  });
});

test('CRR-16 rejects a curly-quote attribution to an owner', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> \u201cI would pay for that.\u201d \u2014 an owner');
  });
});

test('CRR-16 rejects a single-quote attribution to a participant', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> \u2018I would pay for that.\u2019 \u2014 a participant');
  });
});

test('CRR-16 rejects a guillemet attribution to a Spanish owner', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '> \u00abPagaría por el aviso.\u00bb \u2014 el dueño');
  });
});

test('CRR-16 rejects a parenthetical attribution', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '"I would pay for that." (a retailer)');
  });
});

test('CRR-16 rejects a reverse-order Spanish attribution', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '"Pagaría por el aviso." dijo un armador');
  });
});

test('CRR-16 rejects a Portuguese reverse-order attribution', () => {
  expectChecksFailure(['CRR-16'], (root) => {
    appendText(root, D20, '"Pagaria pelo aviso." disse um instalador');
  });
});

test('CRR-17 rejects a fabricated completed-interview claim', () => {
  expectChecksFailure(['CRR-17'], (root) => {
    appendText(root, D20, '3 interviews were completed and 2 participants consented.');
  });
});

test('CRR-18 rejects a participant email address in a recovery document', () => {
  expectChecksFailure(['CRR-18'], (root) => {
    appendText(root, D19, 'Contact the owner at owner.name@example.com for follow-up.');
  });
});

test('CRR-18 rejects a participant identity key used with an interaction claim', () => {
  expectChecksFailure(['CRR-18'], (root) => {
    appendText(root, D19, 'Participant P-MC10-042 confirmed the monitoring need.');
  });
});

test('CRR-17 rejects a positive participant count in a recovery data file', () => {
  expectChecksFailure(['CRR-17'], (root) => {
    editJson(root, D27, (contract) => {
      contract.bindingTruth.counts.participants = 4;
    });
  });
});

// ------------------------------------------------------- permission and claims

test('CRR-25 rejects a recovery PASS read as fieldwork permission', () => {
  expectChecksFailure(['CRR-25'], (root) => {
    appendText(
      root,
      D20,
      'The MC-10R PASS grants fieldwork permission and the team may now contact owners.',
    );
  });
});

test('CRR-31 rejects a document claiming the programme has been authorized', () => {
  expectChecksFailure(['CRR-31'], (root) => {
    appendText(root, D20, 'The recovery programme is now authorized to contact participants.');
  });
});

test('CRR-26 rejects a commercial claim of approved prices and availability', () => {
  expectChecksFailure(['CRR-26'], (root) => {
    appendText(root, D20, 'Prices are approved and the product is available for sale.');
  });
});

test('CRR-26 rejects a claimed distribution agreement', () => {
  expectChecksFailure(['CRR-26'], (root) => {
    appendText(root, D20, 'A distribution agreement has been signed with three marinas.');
  });
});

// ------------------------------------------------------- deliverables staging

test('CRR-13 rejects an inventory with the wrong owner', () => {
  expectChecksFailure(['CRR-13'], (root) => {
    editJson(root, D27, (contract) => {
      contract.deliverables.find((entry) => entry.id === 'D13').owner = 'lead';
    });
  });
});

test('CRR-13 rejects an inventory with the wrong deliverable path', () => {
  expectChecksFailure(['CRR-13', 'CRR-14'], (root) => {
    editJson(root, D27, (contract) => {
      contract.deliverables.find((entry) => entry.id === 'D20').path = `${RDATA}/D20.md`;
    });
  });
});

test('CRR-14 rejects a missing staged deliverable at IMPLEMENTATION', () => {
  expectChecksFailure(['CRR-14'], (root) => {
    rmSync(join(root, `${RDATA}/MC10R-ACCESS-RETENTION-AND-DELETION.md`), { force: true });
  });
});

test('CRR-14 rejects a FINAL stage that omits the audit and delivery records', () => {
  expectChecksFailure(['CRR-14'], (root) => {
    editJson(root, D27, (contract) => {
      contract.deliveryStage = 'FINAL';
    });
  });
});

test('CRR-14 rejects a recovery file outside the D27 inventory', () => {
  expectChecksFailure(['CRR-14'], (root) => {
    writeText(root, `${RDATA}/MC10R-UNINVENTORIED-NOTE.md`, '# Uninventoried note\n');
  });
});

test('CRR-15 rejects a deliverable document without the header banner', () => {
  expectChecksFailure(['CRR-15'], (root) => {
    writeText(root, `${RDATA}/MC10R-DATA-CONTRACT.md`, '# D18 without a header table\n');
  });
});

test('CRR-30 rejects a D20 that hides the unprovisioned limitation', () => {
  expectChecksFailure(['CRR-30'], (root) => {
    const text = readText(root, D20).split('`PROVISIONED = false`').join('`PROVISIONED = unknown`');
    writeText(root, D20, text);
  });
});

// ------------------------------------------------------------ acceptance controls

test('acceptance: prepared instrument wording is not fabricated evidence', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      'Prepared wording example, never administered: un armador dijo «¿Cuánto pagaría?» — guion preparado, nunca leído en campo.',
    );
  });
});

test('acceptance: a clearly labelled training synthetic fixture is not evidence', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      '> "I would pay for that." — an owner · TRAINING_SYNTHETIC_NOT_RESEARCH, fixture only.',
    );
  });
});

test('acceptance: a legitimate public-source quotation is not participant evidence', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      'The 2025 port authority annual report states: "Berth occupancy fell by 4 points." (public source, not fieldwork)',
    );
  });
});

test('acceptance: zero counts and negated participation are not fabricated counts', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      'In this milestone 0 interviews were completed, 0 participants were consented, and no owner was interviewed.',
    );
  });
});

test('acceptance: planning quotas are not completed counts', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      'The full study plans a minimum of 37 completed interviews across eight segments (quota, not a result).',
    );
  });
});

test('acceptance: a prohibited-form example inside a guideline is not evidence', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D19,
      'Prohibited example: never write that an owner said "I would pay for it." in an aggregate report.',
    );
  });
});

test('acceptance: a hypothetical interview script is not a real interview', () => {
  expectChecksPass([], (root) => {
    appendText(
      root,
      D20,
      'Hypothetical script example only (not administered): "Would you pay for monitoring?" — a participant might answer yes.',
    );
  });
});
