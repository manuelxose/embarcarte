import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
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
 * Negative-mutation tests for scripts/check-marea-customer-research.mjs
 * (MC-10 / D24).
 *
 * Every case invokes the real CLI (the gate used by `npm run test:research`)
 * against a throwaway fixture tree through its `--root` flag: a copy of the MC-10
 * customer-discovery package, the frozen MC-09 registry and governance records,
 * the MC-09 assessments, the canonical product/bundle contracts and the two
 * validator scripts.
 *
 * The fixture tree is completed with clearly synthetic `testingFixture`
 * placeholders for any deliverable that has not landed yet (in particular the
 * independent review D25, the delivery record D28 and — while their owners are
 * still working — other Agent documents). Those placeholders never enter the
 * real repository; they exist only in the temporary directory and are replaced
 * by the real files as soon as those files exist.
 *
 * Each case first proves the expected check PASSES on the unmutated fixture and
 * then proves that one mutation makes exactly that check fail. The real
 * repository tree is the positive control, with the pending D25/D28 deliverables
 * reported explicitly rather than hidden.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const SCRIPT = join(SCRIPT_DIR, 'check-marea-customer-research.mjs');

const CD = 'docs/marea/customer-discovery';
const DATA = `${CD}/data`;
const REVIEW = `${CD}/review`;
const PLAN = 'docs/marea/market-validation/buyers/MC09-MC10-CUSTOMER-DISCOVERY-PLAN.md';

const FIXTURE_PATHS = [
  CD,
  PLAN,
  'docs/marea/market-validation/data/validation-experiments.json',
  'docs/marea/market-validation/data/governance-status.json',
  'docs/marea/market-validation/data/product-assessments.json',
  'docs/marea/market-validation/data/bundle-assessments.json',
  'docs/marea/products/product-definitions.batch-01.json',
  'docs/marea/products/product-definitions.batch-02.json',
  'docs/marea/products/product-definitions.batch-03.json',
  'docs/marea/bundles/bundle-definitions.json',
  'scripts/check-marea-customer-research.mjs',
  'scripts/check-marea-customer-research.test.mjs',
];

const DELIVERABLES = [
  `${CD}/MC10-RESEARCH-SCOPE.md`,
  `${CD}/MC10-FIELDWORK-AUTHORIZATION.md`,
  `${CD}/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md`,
  `${CD}/methodology/MC10-RESEARCH-PROTOCOL.md`,
  `${CD}/methodology/MC10-INSTRUMENT-VERSIONS.md`,
  `${CD}/recruitment/MC10-RECRUITMENT-PLAN.md`,
  `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md`,
  `${CD}/owners/MC10-OWNER-DISCOVERY.md`,
  `${CD}/professionals/MC10-INSTALLER-DISCOVERY.md`,
  `${CD}/professionals/MC10-CHANNEL-AND-FLEET-DISCOVERY.md`,
  `${CD}/methodology/MC10-QUALITATIVE-ANALYSIS.md`,
  `${CD}/pricing/MC10-SUBSCRIPTION-ATTITUDES.md`,
  `${CD}/pricing/MC10-GABOR-GRANGER.md`,
  `${CD}/pricing/MC10-VAN-WESTENDORP.md`,
  `${CD}/MC10-CONCEPT-COMPREHENSION.md`,
  `${CD}/MC10-BUYER-OBJECTIONS.md`,
  `${CD}/MC10-EXPERIMENT-RESULTS.md`,
  `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md`,
  `${CD}/MC10-BUNDLE-PRIMARY-EVIDENCE.md`,
  `${CD}/MC10-POSITIONING-RECOMMENDATIONS.md`,
  `${CD}/MC10-DECISION-REGISTER.md`,
  `${CD}/data-contract/MC10-DATA-CONTRACT.md`,
  'scripts/check-marea-customer-research.mjs',
  'scripts/check-marea-customer-research.test.mjs',
  `${REVIEW}/MC-10-REVIEW.md`,
  `${CD}/MC10-EXECUTIVE-REPORT.md`,
  `${CD}/MC10-MC11-HANDOFF.md`,
  `${CD}/MC-10-DELIVERY.md`,
];

const GENERIC_PLACEHOLDER = `# Synthetic fixture placeholder — testingFixture

STATUS: NOT_EXECUTED — FIELDWORK BLOCKED (AUTH-MC10-001 NOT_GRANTED).

This synthetic placeholder exists only inside a temporary negative-mutation
fixture tree created by scripts/check-marea-customer-research.test.mjs. It is
never copied into the repository and is never counted in any total.

It records no participant, no interview, no price response and no finding.
Every experiment stays NOT_EXECUTED because no outreach authorization exists.
No product is available, no price is approved and no distribution, pilot or
trial is agreed.
`;

const SPANISH_PLACEHOLDER = `# Informe ejecutivo sintético — testingFixture

Estado: BLOQUEADO. Se registran 0 entrevistas y 0 participantes.
No se emite PASS de investigación primaria porque no se ejecutó trabajo de campo.
`;

const HANDOFF_PLACEHOLDER = `# Synthetic MC-11 handoff — testingFixture

Customer questions remain BLOCKED behind AUTH-MC10-001 (NOT_GRANTED).
MC-11 may research hardware questions internally but may not claim customer
evidence and may not agree a pilot or trial.
`;

const DELIVERY_PLACEHOLDER = `# Synthetic delivery record — testingFixture

Milestone MC-10: BLOCKED (primary-research scope). Fieldwork: NOT_EXECUTED.
Validator: node scripts/check-marea-customer-research.mjs.
Base commit: 9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3.
Independent review D25: pending synthetic fixture only.
`;

const DECISION_PLACEHOLDER = `# Synthetic decision register — testingFixture

D-029 IN_FORCE: milestone reports BLOCKED.
D-030 IN_FORCE: no product readiness change; all NOT_TESTED.
D-031 IN_FORCE: thresholds frozen.
D-032 IN_FORCE: no commercial restriction weakened.
D-033 IN_FORCE: MC-11 cannot inherit customer evidence; NOT_EXECUTED.
`;

const REVIEW_PLACEHOLDER = `# Synthetic independent review — testingFixture

STATUS: BLOCKED — this file exists only inside the temporary negative-mutation
fixture tree. It is not the real independent review and it is never committed.

VERDICT: BLOCKED for the Wave-0 preparation scope, and no PASS is issued for
primary customer research because none was executed.

The synthetic reviewer checked the fixture data contract, the authorization
gate, the frozen thresholds, the personal-data scan, the commercial invariants
and the negative-mutation suite. The fixture is internally consistent: every
count is zero, every experiment is NOT_EXECUTED, every product and bundle is
NOT_TESTED and every commercial restriction is unchanged.

No participant was interviewed in this fixture. No price was approved. No
product was sold, published or distributed. The synthetic review records that
the fieldwork is blocked behind AUTH-MC10-001 and that no primary-research
result can be claimed. It recommends that the reviewer re-run the validator and
the negative suite after any change and that the milestone remain BLOCKED until
the authorization, controller, legal-review and storage preconditions exist.

This paragraph is padding so that the synthetic review has a realistic length
and so that the length guard in check CR-40 is exercised by the fixture rather
than by the real review. The negative-mutation suite needs a valid review to
prove that the review checks fail only when a real review defect is introduced.
No claim in this file describes real research activity of any kind. It is a
fixture, tagged testingFixture, and it disappears with the temporary directory.
`;

const REVIEW_FINDINGS_PLACEHOLDER = {
  contractId: 'MAREA-MC10-CUSTOMER-DISCOVERY-CONTRACT',
  milestone: 'MC-10',
  verdict: 'BLOCKED',
  testingFixture: true,
  findings: [
    {
      findingId: 'F-01',
      severity: 'INFORMATIONAL',
      status: 'CLOSED',
      evidence: 'Synthetic fixture evidence only; not a real audit finding.',
      remediation: 'None; the synthetic review is replaced by the real D25 review.',
    },
  ],
};

const INSTRUMENT_IDS = [
  'SCREEN-01',
  'CONSENT-01',
  'GUIDE-01',
  'PRICE-01',
  'NOTE-01',
  'SCHEMA-01',
  'ANA-01',
];

function hashFixtureSource(root) {
  return createHash('sha256')
    .update(readFileSync(join(root, PLAN)))
    .digest('hex');
}

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

function editText(root, relativePath, mutate) {
  writeText(root, relativePath, mutate(readText(root, relativePath)));
}

function ensureFixtureInventory(root) {
  for (const relativePath of DELIVERABLES) {
    if (existsSync(join(root, relativePath))) continue;
    if (relativePath.startsWith('scripts/')) continue;
    let content = GENERIC_PLACEHOLDER;
    if (relativePath.endsWith('MC10-EXECUTIVE-REPORT.md')) content = SPANISH_PLACEHOLDER;
    else if (relativePath.endsWith('MC10-MC11-HANDOFF.md')) content = HANDOFF_PLACEHOLDER;
    else if (relativePath.endsWith('MC-10-DELIVERY.md')) content = DELIVERY_PLACEHOLDER;
    else if (relativePath.endsWith('MC10-DECISION-REGISTER.md')) content = DECISION_PLACEHOLDER;
    else if (relativePath.endsWith('MC-10-REVIEW.md')) content = REVIEW_PLACEHOLDER;
    writeText(root, relativePath, content);
  }
  if (!existsSync(join(root, `${REVIEW}/review-findings.json`))) {
    writeJson(root, `${REVIEW}/review-findings.json`, REVIEW_FINDINGS_PLACEHOLDER);
  }
  const instrumentsPath = `${CD}/methodology/instruments.json`;
  if (!existsSync(join(root, instrumentsPath))) {
    const sourceSha256 = hashFixtureSource(root);
    writeJson(root, instrumentsPath, {
      contractId: 'MAREA-MC10-CUSTOMER-DISCOVERY-CONTRACT',
      contractVersion: '1.0.0',
      milestone: 'MC-10',
      owner: 'agent-a-methodologist',
      frozenAt: '2026-11-01',
      sourceDocument: PLAN,
      sourceSha256,
      freezeRule:
        'Synthetic fixture freeze record; replaces the real instrument register only in tests.',
      instruments: INSTRUMENT_IDS.map((instrumentId) => ({
        instrumentId,
        title: instrumentId,
        version: '1.0.0',
        languages: ['ES', 'EN'],
        portugueseStatus: 'NOT_PRODUCED',
        status: 'FROZEN_PENDING_AUTHORIZATION',
        sourcePath: PLAN,
        sourceSha256,
        review: {
          structuralReview: 'COMPLETE',
          qualifiedTranslationSignOff: 'NOT_OBTAINED',
          equivalenceClaim: 'NOT_ESTABLISHED',
        },
      })),
    });
  }
  const templatesPath = `${CD}/recruitment/MC10-OUTREACH-TEMPLATES.md`;
  if (!existsSync(join(root, templatesPath))) {
    writeText(
      root,
      templatesPath,
      `# Synthetic outreach templates — testingFixture

Every template is NOT_APPROVED — NOT_SENT and cannot be used until AUTH-MC10-001
is GRANTED. This synthetic fixture contains no real recipient and no contact data.
`,
    );
  }
}

function makeFixture() {
  const root = mkdtempSync(join(tmpdir(), 'embarcarte-mc10-research-'));
  for (const relativePath of FIXTURE_PATHS) {
    cpSync(join(REPO_ROOT, relativePath), join(root, relativePath), { recursive: true });
  }
  ensureFixtureInventory(root);
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

function expectCheckFailure(expectedCheckId, mutate) {
  const root = makeFixture();
  try {
    const baseline = runValidator(root);
    assert.ok(baseline.payload, `validator produced no JSON summary: ${baseline.result.stderr}`);
    assert.ok(
      !baseline.failed.includes(expectedCheckId),
      `fixture baseline already fails ${expectedCheckId}: ${baseline.failed.join(', ')}\n${baseline.result.stderr}`.slice(
        0,
        1600,
      ),
    );
    mutate(root);
    const { result, payload, failed } = runValidator(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    assert.ok(
      failed.includes(expectedCheckId),
      `expected ${expectedCheckId} to fail after the mutation.\nfailed: ${failed.join(', ')}\n${result.stderr}`.slice(
        0,
        1600,
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

/**
 * The complementary assertion: an honest, negated statement must NOT trip the
 * claim scanners. The listed checks must still pass after the mutation.
 */
function expectChecksPass(checkIds, mutate) {
  const root = makeFixture();
  try {
    mutate(root);
    const { result, payload, failed } = runValidator(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    const offending = checkIds.filter((id) => failed.includes(id));
    assert.deepEqual(
      offending,
      [],
      `expected ${checkIds.join(', ')} to accept the honest negated statement, but these failed: ${offending.join(', ')}\n${result.stderr}`.slice(
        0,
        1600,
      ),
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function validParticipant(overrides = {}) {
  return {
    participantId: 'P-MC10-001',
    segmentId: 'SEG-01',
    role: 'owner',
    country: 'ES',
    language: 'ES',
    acquisitionSource: 'YACHT_CLUB_MEDIATED',
    consent: { participate: true, record: true, quote: true, followUp: false },
    withdrawalDate: null,
    ...overrides,
  };
}

function validInterview(overrides = {}) {
  return {
    interviewId: 'INT-MC10-001',
    participantId: 'P-MC10-001',
    segmentId: 'SEG-01',
    experimentIds: ['EXP-MC10-01'],
    interviewDate: '2026-11-02',
    acquisitionSource: 'YACHT_CLUB_MEDIATED',
    interviewerId: 'INTV-01',
    language: 'ES',
    eligibilityConfirmed: true,
    consentRecorded: true,
    consentDate: '2026-11-01',
    recordingPermission: true,
    quotationPermission: true,
    completionStatus: 'COMPLETED',
    analysisEligible: true,
    ...overrides,
  };
}

function installRecords(root, participants, interviews) {
  const bySegment = {
    'SEG-01': 0,
    'SEG-02': 0,
    'SEG-03': 0,
    'SEG-04': 0,
    'SEG-05': 0,
    'SEG-06': 0,
    'SEG-07': 0,
    'SEG-08': 0,
  };
  for (const participant of participants) bySegment[participant.segmentId] += 1;
  writeJson(root, `${DATA}/participants.json`, {
    ...readJson(root, `${DATA}/participants.json`),
    participants,
    aggregate: {
      total: participants.length,
      bySegment,
      consented: participants.filter((participant) => participant.consent?.participate).length,
      withdrawn: participants.filter((participant) => participant.withdrawalDate !== null).length,
    },
  });
  const interviewFile = readJson(root, `${DATA}/interview-records.json`);
  const aggregateBySegment = {
    'SEG-01': 0,
    'SEG-02': 0,
    'SEG-03': 0,
    'SEG-04': 0,
    'SEG-05': 0,
    'SEG-06': 0,
    'SEG-07': 0,
    'SEG-08': 0,
  };
  for (const interview of interviews) aggregateBySegment[interview.segmentId] += 1;
  writeJson(root, `${DATA}/interview-records.json`, {
    ...interviewFile,
    interviews,
    aggregate: interviews.length,
    aggregateBySegment,
  });
}

test('positive control: the real tree passes every check not pending on D25/D28', () => {
  const { result, payload, failed } = runValidator(REPO_ROOT);
  assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
  const documentedPending = new Set();
  if (!existsSync(join(REPO_ROOT, `${REVIEW}/MC-10-REVIEW.md`))) {
    for (const id of ['CR-01', 'CR-40', 'CR-41', 'CR-42']) documentedPending.add(id);
  }
  if (!existsSync(join(REPO_ROOT, `${CD}/MC-10-DELIVERY.md`))) {
    for (const id of ['CR-01', 'CR-43', 'CR-61']) documentedPending.add(id);
  }
  const unexpected = failed.filter((id) => !documentedPending.has(id));
  assert.deepEqual(
    unexpected,
    [],
    `unexpected real-tree failures: ${unexpected.join(', ')}\n${result.stderr}`.slice(0, 1600),
  );
  if (documentedPending.size === 0) {
    assert.equal(failed.length, 0, `real tree fails: ${failed.join(', ')}`);
    assert.equal(result.status, 0);
  } else {
    assert.equal(result.status, 1, 'a pending required deliverable must fail the gate');
  }
});

test('fixture control: a complete inventory (with synthetic review/delivery) passes every check', () => {
  const root = makeFixture();
  try {
    const { result, payload, failed } = runValidator(root);
    assert.ok(payload, `validator produced no JSON summary: ${result.stderr}`);
    assert.equal(
      failed.length,
      0,
      `fixture fails: ${failed.join(', ')}\n${result.stderr}`.slice(0, 1600),
    );
    assert.equal(result.status, 0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('CR-01 rejects a missing required deliverable', () => {
  expectCheckFailure('CR-01', (root) => {
    rmSync(join(root, `${CD}/MC10-EXPERIMENT-RESULTS.md`));
  });
});

test('CR-02 rejects an unparsable data file', () => {
  expectCheckFailure('CR-02', (root) => {
    writeText(root, `${DATA}/coding.json`, '{ "codedUnits": 0, ');
  });
});

test('CR-03 rejects a manifest entry for a file that does not exist', () => {
  expectCheckFailure('CR-03', (root) => {
    editJson(root, `${DATA}/manifest.json`, (manifest) => {
      manifest.files.push({
        path: 'data/ghost.json',
        owner: 'lead',
        purpose: 'fixture',
        recordCount: 0,
      });
    });
  });
});

test('CR-03 rejects a data file that the manifest does not index', () => {
  expectCheckFailure('CR-03', (root) => {
    editJson(root, `${DATA}/manifest.json`, (manifest) => {
      manifest.files = manifest.files.filter((entry) => entry.path !== 'data/barriers.json');
    });
  });
});

test('CR-04 rejects a manifest recordCount that does not match the file', () => {
  expectCheckFailure('CR-04', (root) => {
    editJson(root, `${DATA}/manifest.json`, (manifest) => {
      const entry = manifest.files.find((candidate) => candidate.path === 'data/experiments.json');
      entry.recordCount = 9;
    });
  });
});

test('CR-05 rejects a data contract that omits the three-layer model', () => {
  expectCheckFailure('CR-05', (root) => {
    editText(root, `${CD}/data-contract/MC10-DATA-CONTRACT.md`, (text) =>
      text.replaceAll('Layer A', 'Layer X'),
    );
  });
});

test('CR-06 rejects an authorization record marked GRANTED without evidence', () => {
  expectCheckFailure('CR-06', (root) => {
    editJson(root, `${DATA}/fieldwork-authorization.json`, (auth) => {
      auth.authorizationStatus = 'GRANTED';
    });
  });
});

test('CR-06 rejects a NOT_GRANTED record that carries an authorizer and a date', () => {
  expectCheckFailure('CR-06', (root) => {
    editJson(root, `${DATA}/fieldwork-authorization.json`, (auth) => {
      auth.authorizer = 'Fixture Programme Owner';
      auth.authorizationDate = '2026-11-01';
    });
  });
});

test('CR-07 rejects fieldwork marked complete while the gate is closed', () => {
  expectCheckFailure('CR-07', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.fieldworkStatus = 'COMPLETE';
    });
  });
});

test('CR-07 rejects a milestone PASS while the gate is closed', () => {
  expectCheckFailure('CR-07', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.milestoneStatus = 'PASS';
    });
  });
});

test('CR-08 rejects a non-zero participant count while the gate is closed', () => {
  expectCheckFailure('CR-08', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.participantCounts.consented = 1;
    });
  });
});

test('CR-09 rejects an experiment marked executed while the gate is closed', () => {
  expectCheckFailure('CR-09', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments[0].executionStatus = 'EXECUTED';
    });
  });
});

test('CR-09 rejects an experiment result verdict of PASS while the gate is closed', () => {
  expectCheckFailure('CR-09', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments[0].resultStatus = 'PASS';
    });
  });
});

test('CR-10 rejects a pricing module administered while the gate is closed', () => {
  expectCheckFailure('CR-10', (root) => {
    editJson(root, `${DATA}/pricing-responses.json`, (file) => {
      file.administered = true;
    });
  });
});

test('CR-10 rejects a price-response count while the gate is closed', () => {
  expectCheckFailure('CR-10', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.pricing.priceResponsesRecorded = 1;
    });
  });
});

test('CR-11 rejects a controller-required checklist item marked COMPLETE', () => {
  expectCheckFailure('CR-11', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      const item = status.wave0Checklist.find((candidate) => candidate.itemId === 'W0-05');
      item.status = 'COMPLETE';
    });
  });
});

test('CR-11 rejects a pre-fieldwork checklist with a missing item', () => {
  expectCheckFailure('CR-11', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.wave0Checklist = status.wave0Checklist.filter((item) => item.itemId !== 'W0-17');
    });
  });
});

test('CR-12 rejects a participant register with a record while the gate is closed', () => {
  expectCheckFailure('CR-12', (root) => {
    editJson(root, `${DATA}/participants.json`, (file) => {
      file.participants.push({ participantId: 'P-MC10-001' });
    });
  });
});

test('CR-13 rejects a duplicated experiment', () => {
  expectCheckFailure('CR-13', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments.push({ ...file.experiments[0] });
    });
  });
});

test('CR-14 rejects a tampered frozen threshold SHA-256', () => {
  expectCheckFailure('CR-14', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments[0].thresholdSha256 = '0'.repeat(64);
    });
  });
});

test('CR-14 rejects a post-hoc change to the MC-09 registry threshold', () => {
  expectCheckFailure('CR-14', (root) => {
    editJson(root, 'docs/marea/market-validation/data/validation-experiments.json', (registry) => {
      registry.experiments[0].decisionThreshold += ' The threshold may be relaxed after fielding.';
    });
  });
});

test('CR-15 rejects an experiment hypothesis that differs from the MC-09 registry', () => {
  expectCheckFailure('CR-15', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments[0].hypothesis = 'A reworded hypothesis that was never registered.';
    });
  });
});

test('CR-16 rejects an unknown blocker code', () => {
  expectCheckFailure('CR-16', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      file.experiments[0].blockerCodes.push('BLK-MC10-99');
    });
  });
});

test('CR-17 rejects a PASS result field in any data record', () => {
  expectCheckFailure('CR-17', (root) => {
    editJson(root, `${DATA}/findings.json`, (file) => {
      file.result = 'PASS';
    });
  });
});

test('CR-18 rejects an experiment file without the canonicalization algorithm', () => {
  expectCheckFailure('CR-18', (root) => {
    editJson(root, `${DATA}/experiments.json`, (file) => {
      delete file.canonicalization;
    });
  });
});

test('CR-19 rejects a finding without a traceable interview record', () => {
  expectCheckFailure('CR-19', (root) => {
    editJson(root, `${DATA}/findings.json`, (file) => {
      file.findings.push({
        findingId: 'FND-MC10-001',
        experimentId: 'EXP-MC10-01',
        claim: 'Fabricated finding created by a negative test.',
        evidenceInterviewIds: ['INT-MC10-999'],
        denominator: 5,
      });
    });
  });
});

test('CR-20 rejects an interview record without the mandatory evidence fields', () => {
  expectCheckFailure('CR-20', (root) => {
    editJson(root, `${DATA}/participants.json`, (file) => {
      file.participants.push(validParticipant());
      file.aggregate.total = 1;
      file.aggregate.bySegment['SEG-01'] = 1;
    });
    editJson(root, `${DATA}/interview-records.json`, (file) => {
      file.interviews.push({ interviewId: 'INT-MC10-001', participantId: 'P-MC10-001' });
      file.aggregate = 1;
    });
  });
});

test('CR-21 rejects duplicate participant identifiers', () => {
  expectCheckFailure('CR-21', (root) => {
    editJson(root, `${DATA}/participants.json`, (file) => {
      file.participants.push(validParticipant(), validParticipant());
      file.aggregate.total = 2;
      file.aggregate.bySegment['SEG-01'] = 2;
    });
  });
});

test('CR-22 rejects an analysis-eligible interview for a withdrawn participant', () => {
  expectCheckFailure('CR-22', (root) => {
    installRecords(
      root,
      [validParticipant({ withdrawalDate: '2026-11-03' })],
      [validInterview({ analysisEligible: true })],
    );
  });
});

test('CR-22 rejects a fabricated interview for a participant without consent', () => {
  expectCheckFailure('CR-22', (root) => {
    installRecords(
      root,
      [
        validParticipant({
          consent: { participate: false, record: false, quote: false, followUp: false },
        }),
      ],
      [validInterview()],
    );
  });
});

test('CR-23 rejects duplicate interviews', () => {
  expectCheckFailure('CR-23', (root) => {
    installRecords(
      root,
      [validParticipant()],
      [
        validInterview({ interviewId: 'INT-MC10-001' }),
        validInterview({ interviewId: 'INT-MC10-002' }),
      ],
    );
  });
});

test('CR-24 rejects a status count that does not reconcile with the interview register', () => {
  expectCheckFailure('CR-24', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.sample.completedInterviews = 1;
    });
  });
});

test('CR-25 rejects a price response without currency', () => {
  expectCheckFailure('CR-25', (root) => {
    editJson(root, `${DATA}/pricing-responses.json`, (file) => {
      file.administered = true;
      file.responses.push({
        responseId: 'PRS-MC10-001',
        participantId: 'P-MC10-001',
        constructId: 'CONSTRUCT-01',
        method: 'GABOR_GRANGER',
        pointIndex: 1,
        amount: 49,
        currency: '',
        vatTreatment: 'VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS',
        intentScale: 'PROBABLY_WOULD_BUY',
        responseTimeSeconds: 90,
        ladderVersion: '1.0.0',
        responseDate: '2026-11-02',
      });
    });
  });
});

test('CR-25 rejects an unknown amount coerced to zero', () => {
  expectCheckFailure('CR-25', (root) => {
    editJson(root, `${DATA}/pricing-responses.json`, (file) => {
      file.administered = true;
      file.responses.push({
        responseId: 'PRS-MC10-001',
        participantId: 'P-MC10-001',
        constructId: 'CONSTRUCT-01',
        method: 'GABOR_GRANGER',
        pointIndex: 1,
        amount: 0,
        amountStatus: 'KNOWN',
        currency: 'EUR',
        vatTreatment: 'VAT_INCLUDED_CONSUMER_RETAIL_HYPOTHESIS',
        intentScale: 'PROBABLY_WOULD_BUY',
        responseTimeSeconds: 90,
        ladderVersion: '1.0.0',
        responseDate: '2026-11-02',
      });
    });
  });
});

test('CR-25 rejects a price response without VAT treatment', () => {
  expectCheckFailure('CR-25', (root) => {
    editJson(root, `${DATA}/pricing-responses.json`, (file) => {
      file.administered = true;
      file.responses.push({
        responseId: 'PRS-MC10-001',
        participantId: 'P-MC10-001',
        constructId: 'CONSTRUCT-01',
        method: 'GABOR_GRANGER',
        pointIndex: 1,
        amount: 49,
        currency: 'EUR',
        vatTreatment: '',
        intentScale: 'PROBABLY_WOULD_BUY',
        responseTimeSeconds: 90,
        ladderVersion: '1.0.0',
        responseDate: '2026-11-02',
      });
    });
  });
});

test('CR-26 rejects a concept reported as tested with a zero denominator', () => {
  expectCheckFailure('CR-26', (root) => {
    editJson(root, `${DATA}/concept-comprehension.json`, (file) => {
      file.concepts[0].participantsTested = 5;
    });
  });
});

test('CR-27 rejects a qualitative sample reported as a population estimate', () => {
  expectCheckFailure('CR-27', (root) => {
    editText(
      root,
      `${CD}/MC10-EXPERIMENT-RESULTS.md`,
      (text) => `${text}\n62% of all owners would buy it.\n`,
    );
  });
});

test('CR-28 rejects an attributed participant quotation in a document', () => {
  expectCheckFailure('CR-28', (root) => {
    editText(
      root,
      `${CD}/owners/MC10-OWNER-DISCOVERY.md`,
      (text) => `${text}\nOne owner said the alert was useless.\n`,
    );
  });
});

test('CR-29 rejects a computed kappa when no unit was coded', () => {
  expectCheckFailure('CR-29', (root) => {
    editJson(root, `${DATA}/coding.json`, (file) => {
      file.cohensKappa = 0.81;
      file.kappaStatus = 'COMPUTED';
    });
  });
});

test('CR-30 rejects a concept marked EXECUTED', () => {
  expectCheckFailure('CR-30', (root) => {
    editJson(root, `${DATA}/concept-comprehension.json`, (file) => {
      file.concepts[0].status = 'EXECUTED';
    });
  });
});

test('CR-31 rejects a barrier reported as ranked by participants', () => {
  expectCheckFailure('CR-31', (root) => {
    editJson(root, `${DATA}/barriers.json`, (file) => {
      file.barriers[0].participantsRanking = 3;
    });
  });
});

test('CR-32 rejects a false PII-scan claim', () => {
  expectCheckFailure('CR-32', (root) => {
    editJson(root, `${DATA}/data-quality.json`, (file) => {
      file.piiScan = 'PII_FOUND';
    });
  });
});

test('CR-33 rejects a changed planned quota', () => {
  expectCheckFailure('CR-33', (root) => {
    editJson(root, `${DATA}/recruitment-funnel.json`, (file) => {
      file.segments[0].plannedMin = 6;
    });
  });
});

test('CR-33 rejects a quota/total mismatch that is no longer recorded', () => {
  expectCheckFailure('CR-33', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      delete status.planningInconsistencies;
    });
  });
});

test('CR-34 rejects a weakened governance invariant', () => {
  expectCheckFailure('CR-34', (root) => {
    editJson(root, `${DATA}/governance-status.json`, (file) => {
      file.statuses.productSales = 'OPEN';
    });
  });
});

test('CR-35 rejects product evidence that breaks the MC-09 order', () => {
  expectCheckFailure('CR-35', (root) => {
    editJson(root, `${DATA}/product-evidence.json`, (file) => {
      const first = file.products[0];
      file.products[0] = file.products[1];
      file.products[1] = first;
    });
  });
});

test('CR-36 rejects a bundle readiness upgrade', () => {
  expectCheckFailure('CR-36', (root) => {
    editJson(root, `${DATA}/bundle-evidence.json`, (file) => {
      file.bundles[0].readinessUnchanged = false;
    });
  });
});

test('CR-37 rejects a commercial call-to-action in a document', () => {
  expectCheckFailure('CR-37', (root) => {
    editText(
      root,
      `${CD}/MC10-POSITIONING-RECOMMENDATIONS.md`,
      (text) => `${text}\nAdd to cart now.\n`,
    );
  });
});

test('CR-38 rejects a price-approval claim', () => {
  expectCheckFailure('CR-38', (root) => {
    editText(
      root,
      `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md`,
      (text) => `${text}\nThe COMPLETE bundle price is approved.\n`,
    );
  });
});

test('CR-39 rejects a fixed offer price', () => {
  expectCheckFailure('CR-39', (root) => {
    editText(
      root,
      `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md`,
      (text) => `${text}\nMAREA NAV sells for EUR 499.\n`,
    );
  });
});

test('CR-40 rejects a missing independent review', () => {
  expectCheckFailure('CR-40', (root) => {
    rmSync(join(root, `${REVIEW}/MC-10-REVIEW.md`));
  });
});

test('CR-41 rejects malformed machine-readable review findings', () => {
  expectCheckFailure('CR-41', (root) => {
    editJson(root, `${REVIEW}/review-findings.json`, (file) => {
      file.findings[0].severity = 'SEVERE';
    });
  });
});

test('CR-42 rejects a review that issues a primary-research PASS', () => {
  expectCheckFailure('CR-42', (root) => {
    writeText(
      root,
      `${REVIEW}/MC-10-REVIEW.md`,
      `# Fixture review\n\nPASS — primary customer research was completed successfully.\n`.repeat(
        20,
      ),
    );
  });
});

test('CR-43 rejects a results document without the blocked banner', () => {
  expectCheckFailure('CR-43', (root) => {
    writeText(
      root,
      `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md`,
      '# Recruitment results\n\nA neutral fixture document with no state banner.\n',
    );
  });
});

test('CR-44 rejects a document that states a positive participant count', () => {
  expectCheckFailure('CR-44', (root) => {
    editText(
      root,
      `${CD}/owners/MC10-OWNER-DISCOVERY.md`,
      (text) => `${text}\nWe interviewed 12 owners in Vigo.\n`,
    );
  });
});

test('CR-45 rejects an unreviewed translation-equivalence claim', () => {
  expectCheckFailure('CR-45', (root) => {
    editText(
      root,
      `${CD}/methodology/MC10-INSTRUMENT-VERSIONS.md`,
      (text) => `${text}\nTranslation equivalence is established for ES and EN.\n`,
    );
  });
});

test('CR-46 rejects a personal email address in the repository', () => {
  expectCheckFailure('CR-46', (root) => {
    editText(
      root,
      `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md`,
      (text) => `${text}\nContact participant.one@example.com.\n`,
    );
  });
});

test('CR-47 rejects participant content in a neutrally named application file', () => {
  expectCheckFailure('CR-47', (root) => {
    writeText(
      root,
      'src/app/site-telemetry.json',
      `${JSON.stringify(
        {
          participantId: 'P-MC10-001',
          segmentId: 'SEG-01',
          consentRecorded: true,
          quotationPermission: true,
        },
        null,
        2,
      )}\n`,
    );
  });
});

test('CR-48 rejects a fixture record in the real data layer', () => {
  expectCheckFailure('CR-48', (root) => {
    editJson(root, `${DATA}/data-quality.json`, (file) => {
      file.testingFixture = true;
    });
  });
});

test('CR-62 rejects a blockquoted fabricated quotation attributed to a pseudonymous participant', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) =>
        `${text}\n> "The marina staff never answer and I would pay for an alert." — P-MC10-001\n`,
    );
  });
});

test('CR-62 rejects a blockquoted fabricated quotation attributed to an owner', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n> "I would sign up tomorrow for a bilge alert." — an owner in Vigo\n`,
    );
  });
});

test('CR-62 rejects a quantifier-less fabricated observation claim', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\nOwners reported they would pay a subscription for monitoring.\n`,
    );
  });
});

test('CR-62 rejects an unresolvable pseudonymous participant reference', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\nParticipant P-MC10-042 confirmed the monitoring need.\n`,
    );
  });
});

test('CR-62 rejects an unresolvable participant reference hidden in inline code', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\nEvidence cited as \`P-MC10-042\` in the narrative.\n`,
    );
  });
});

test('CR-62 rejects a fabricated quotation hidden in a fenced code block', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n\`\`\`\n> "I would pay for the alert." — P-MC10-001\n\`\`\`\n`,
    );
  });
});

test('CR-62 rejects an inline hyphen quotation attributed to an indefinite article role', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"The alert is useless." - an owner\n`,
    );
  });
});

test('CR-62 rejects an inline em-dash quotation attributed to a definite article role', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"The alert is useless." — the owner\n`,
    );
  });
});

test('CR-62 rejects an inline hyphen quotation attributed to a retailer', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that." - a retailer\n`,
    );
  });
});

test('CR-62 rejects a reverse-order quotation attribution without a comma', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that." said an owner\n`,
    );
  });
});

test('CR-62 rejects a reverse-order quotation attribution with a comma', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that.", said an owner\n`,
    );
  });
});

test('CR-62 rejects a parenthetical quotation attribution', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that." (an owner)\n`,
    );
  });
});

test('CR-62 rejects a reverse-order quotation attributed to a pseudonymous ID', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that." said P-MC10-001\n`,
    );
  });
});

test('CR-62 rejects a parenthetical quotation attributed to a pseudonymous ID', () => {
  expectCheckFailure('CR-62', (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\n"I would pay for that." (P-MC10-001)\n`,
    );
  });
});

test('CR-49 rejects a milestone that reports PASS', () => {
  expectCheckFailure('CR-49', (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.milestoneStatus = 'PASS';
    });
  });
});

test('CR-50 rejects a decision register that omits a decision', () => {
  expectCheckFailure('CR-50', (root) => {
    editJson(root, `${DATA}/decisions.json`, (file) => {
      file.decisions.pop();
    });
  });
});

test('CR-51 rejects an MC-09 registry that claims execution', () => {
  expectCheckFailure('CR-51', (root) => {
    editJson(root, 'docs/marea/market-validation/data/validation-experiments.json', (registry) => {
      registry.experiments[0].executed = true;
    });
  });
});

test('CR-52 rejects a canonical product made available', () => {
  expectCheckFailure('CR-52', (root) => {
    editJson(root, 'docs/marea/products/product-definitions.batch-01.json', (contract) => {
      contract.products[0].readiness.availability = 'IN_STOCK';
    });
  });
});

test('CR-53 rejects a broken instrument source hash', () => {
  expectCheckFailure('CR-53', (root) => {
    editJson(root, `${CD}/methodology/instruments.json`, (file) => {
      file.sourceSha256 = '0'.repeat(64);
    });
  });
});

test('CR-54 rejects a price ladder that is not strictly ascending', () => {
  expectCheckFailure('CR-54', (root) => {
    editJson(root, `${DATA}/pricing-ladders.json`, (file) => {
      file.constructs[0].ladder[1].amount = 10;
    });
  });
});

test('CR-55 rejects a pricing-response reference that does not match the freeze', () => {
  expectCheckFailure('CR-55', (root) => {
    editJson(root, `${DATA}/pricing-responses.json`, (file) => {
      file.ladderReference.frozenAt = '2026-10-31';
    });
  });
});

test('CR-56 rejects an outreach template marked approved', () => {
  expectCheckFailure('CR-56', (root) => {
    editText(root, `${CD}/recruitment/MC10-OUTREACH-TEMPLATES.md`, (text) =>
      text.replaceAll('NOT_APPROVED', 'APPROVED'),
    );
  });
});

test('CR-57 rejects a data contract that omits a data file schema', () => {
  expectCheckFailure('CR-57', (root) => {
    editText(root, `${CD}/data-contract/MC10-DATA-CONTRACT.md`, (text) =>
      text.replaceAll('barriers.json', 'barrier-taxonomy.json'),
    );
  });
});

test('CR-58 rejects a review owned by an implementation author', () => {
  expectCheckFailure('CR-58', (root) => {
    editJson(root, `${DATA}/manifest.json`, (manifest) => {
      const deliverable = manifest.deliverables.find((entry) => entry.id === 'D25');
      deliverable.owner = 'lead';
    });
  });
});

test('CR-59 rejects a Spanish executive report that claims a primary-research PASS', () => {
  expectCheckFailure('CR-59', (root) => {
    editText(
      root,
      `${CD}/MC10-EXECUTIVE-REPORT.md`,
      (text) => `${text}\nMC-10 obtiene PASS de investigación primaria.\n`,
    );
  });
});

test('CR-60 rejects a handoff that claims an agreed pilot', () => {
  expectCheckFailure('CR-60', (root) => {
    editText(
      root,
      `${CD}/MC10-MC11-HANDOFF.md`,
      (text) => `${text}\nA pilot is agreed with three marinas.\n`,
    );
  });
});

test('CR-61 rejects a delivery record without the validator evidence', () => {
  expectCheckFailure('CR-61', (root) => {
    editText(root, `${CD}/MC-10-DELIVERY.md`, (text) =>
      text.replaceAll('check-marea-customer-research', 'the validator'),
    );
  });
});

// ---------------------------------------------------------------- acceptance
// The scanners must prefer an honest negated statement over a false positive.

test('acceptance: negated commercial statements are not flagged', () => {
  expectChecksPass(['CR-37', 'CR-38', 'CR-39'], (root) => {
    editText(
      root,
      `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md`,
      (text) =>
        `${text}\nNo approved price exists; nothing is for sale, there is no availability, and a guaranteed alert is not claimed.\n`,
    );
  });
});

test('acceptance: a negated population limitation is not flagged', () => {
  expectChecksPass(['CR-27'], (root) => {
    editText(
      root,
      `${CD}/MC10-EXPERIMENT-RESULTS.md`,
      (text) => `${text}\nThis is not a representative sample and no margin of error is claimed.\n`,
    );
  });
});

test('acceptance: a negated translation claim is not flagged', () => {
  expectChecksPass(['CR-45'], (root) => {
    editText(
      root,
      `${CD}/methodology/MC10-INSTRUMENT-VERSIONS.md`,
      (text) => `${text}\nTranslation equivalence is not established for ES and EN.\n`,
    );
  });
});

test('acceptance: zero counts and negated participation are not flagged', () => {
  expectChecksPass(['CR-44'], (root) => {
    editText(
      root,
      `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md`,
      (text) => `${text}\nNo participant was interviewed; 0 interviews were completed.\n`,
    );
  });
});

test('acceptance: recorded planning inconsistencies keep the honest plan valid', () => {
  expectChecksPass(['CR-33', 'CR-48'], (root) => {
    editJson(root, `${DATA}/research-status.json`, (status) => {
      status.planningInconsistencies = [
        {
          id: 'PI-01',
          description:
            'Segment quota minima sum to 37 while the total planned minimum is 40; recorded as an honest MC-09 plan defect.',
        },
      ];
    });
  });
});

test('acceptance: prepared instrument wording is not narrative fabrication', () => {
  expectChecksPass(['CR-62'], (root) => {
    editText(
      root,
      `${CD}/owners/MC10-OWNER-DISCOVERY.md`,
      (text) =>
        `${text}\n> "As the owner, how much would you pay?" — prepared instrument wording, read aloud by the interviewer; never asked in MC-10.\n`,
    );
  });
});

test('acceptance: a negated observation claim is not fabrication', () => {
  expectChecksPass(['CR-62'], (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) => `${text}\nNo owner reported a working bilge alert in MC-10.\n`,
    );
  });
});

test('acceptance: an MC-09 desk-research observation is not primary evidence', () => {
  expectChecksPass(['CR-62'], (root) => {
    editText(
      root,
      `${CD}/MC10-BUYER-OBJECTIONS.md`,
      (text) =>
        `${text}\nOwners reported the same fragmentation problem in MC-09 desk research, not in MC-10 fieldwork.\n`,
    );
  });
});
