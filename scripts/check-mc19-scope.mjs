#!/usr/bin/env node
/**
 * MC-19 scope-proposal validator.
 *
 * The MC-19 contractual scope is not sufficiently defined for implementation.
 * This validator therefore enforces the *proposal* contract and, critically, the
 * absence of an unauthorized implementation:
 *
 *   - the proposal package exists and is internally consistent;
 *   - the baseline is the verified MC-18 head and is preserved;
 *   - no MC-19 segment/solution page, form, endpoint or public route exists;
 *   - every governance flag and inherited debt item is preserved;
 *   - the independent review is recorded when it has happened.
 *
 * It writes docs/marea/segments/evidence/scope-validator-run.json and exits 0
 * only when every check passes.
 *
 * Run:
 *   npm run test:mc19-scope
 *   npm run test:mc19-scope:unit
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = 'docs/marea/segments';
const DATA = `${DOCS}/data`;
const EVIDENCE = `${DOCS}/evidence`;
const BASELINE = '3490c0f71eb6eaa89588b7a6d75bb3b6066cd094';
const MC19_BRANCH = 'feature/marea-mc19-scope-proposal';

export const REQUIRED_DOCS = [
  'MC19-SCOPE-PROPOSAL.md',
  'MC19-SOURCE-VERIFICATION.md',
  'MC19-DEPENDENCIES-AND-BLOCKERS.md',
  'MC19-ACCEPTANCE-CRITERIA.md',
  'MC19-RISK-REGISTER.md',
  'MC19-MC20-HANDOFF-INPUTS.md',
  'MC19-EXECUTIVE-REPORT-ES.md',
];

export const REQUIRED_DATA = [
  'mc19-scope-proposal.json',
  'mc19-source-verification.json',
  'mc19-risk-register.json',
  'mc19-mc20-handoff-inputs.json',
  'mc19-review-findings.json',
  'manifest.json',
];

export const GOVERNANCE = {
  trademarkLegalClearance: 'NOT_GRANTED',
  mareaPublicUse: 'NO_GO',
  sourceIpClearance: 'NOT_CLEARED',
  licensingRightsGranted: false,
  priceApproved: 'NONE',
  commercialAvailability: 'NOT_FOR_SALE',
  pilotSafetyGate: 'BLOCKED',
  testedCompatibilityRows: 0,
  publicationAuthorized: false,
  indexationAuthorized: false,
  deploymentAuthorized: false,
  purchaseFunctionality: false,
  leadCollection: false,
  publicRoutesActivated: 0,
};

export const LEGAL_STATE = {
  releaseGates: 13,
  releaseGatesClosed: 0,
  requiredDocuments: 24,
  documentsExecuted: 0,
  cataloguedClaims: 42,
  claimsPublicAuthorized: 0,
  privacyGateId: 'GATE-PRIVACY-DPA-DPIA',
  privacyGateStatus: 'BLOCKED',
};

const read = (path) => readFileSync(resolve(root, path), 'utf8');
const readJson = (path) => JSON.parse(read(path));
const exists = (path) => existsSync(resolve(root, path));
const gitRaw = (args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const git = (args) => gitRaw(args).split('\n').filter(Boolean);

const problems = (list) => (Array.isArray(list) ? list : []);

/** Contract checks for the main proposal dataset. */
export function proposalProblems(proposal) {
  const out = [];
  if (proposal?.contractId !== 'MC19-SCOPE-PROPOSAL')
    out.push('contractId is not MC19-SCOPE-PROPOSAL');
  if (proposal?.status !== 'BLOCKED_PENDING_SCOPE_APPROVAL')
    out.push('status is not BLOCKED_PENDING_SCOPE_APPROVAL');
  if (proposal?.verdict !== 'BLOCKED') out.push('verdict is not BLOCKED');
  if (proposal?.baseline?.head !== BASELINE) out.push('baseline head differs from the MC-18 head');

  const state = proposal?.mc19ExecutionState ?? {};
  for (const [key, expected] of [
    ['scopeProposalDelivered', true],
    ['implementationStarted', false],
    ['scopeApproved', false],
    ['masterPromptIssued', false],
    ['iaRouteDecisionRecorded', false],
    ['enquiryFlowAuthorized', false],
    ['leadCaptureAuthorized', false],
    ['publicRouteActivated', false],
  ]) {
    if (state[key] !== expected) out.push(`mc19ExecutionState.${key} must be ${expected}`);
  }

  const assessment = proposal?.definitionAssessment ?? {};
  if (assessment.sufficientForImplementation !== false)
    out.push('definitionAssessment.sufficientForImplementation must be false');
  if (!Array.isArray(assessment.undefined) || assessment.undefined.length < 8)
    out.push('definitionAssessment.undefined must list at least 8 gaps');

  const prerequisites = proposal?.prerequisites ?? [];
  const byId = new Map(prerequisites.map((item) => [item.id, item]));
  for (const [id, status] of [
    ['P01', 'ABSENT'],
    ['P02', 'ABSENT'],
    ['P03', 'BLOCKED'],
    ['P10', 'ABSENT'],
  ]) {
    if (byId.get(id)?.status !== status) out.push(`prerequisite ${id} must be ${status}`);
  }
  for (const id of ['P01', 'P02', 'P10']) {
    if (!(proposal?.implementationBlockers ?? []).includes(id))
      out.push(`implementationBlockers must include ${id}`);
  }

  const options = proposal?.options ?? [];
  if (options.length !== 3) out.push('exactly 3 scope options are required');
  if (options.map((option) => option.id).join(',') !== 'A,B,C')
    out.push('option ids must be A,B,C');
  if (proposal?.recommendedOption !== 'A') out.push('recommendedOption must be A');

  const criteria = proposal?.proposedAcceptanceCriteria ?? [];
  if (criteria.length < 10) out.push('at least 10 proposed acceptance criteria are required');
  if (new Set(criteria.map((item) => item.id)).size !== criteria.length)
    out.push('acceptance criterion ids must be unique');

  const dag = proposal?.proposedTaskDag ?? [];
  if (dag.length < 9) out.push('at least 9 proposed tasks are required');
  const deferred = dag.find((task) => task.id === 'T09');
  if (!deferred) out.push('deferred task T09 is required');
  if (deferred && deferred.status !== 'BLOCKED') out.push('T09 must remain BLOCKED');
  if (deferred && !(deferred.prerequisites ?? []).includes('P03'))
    out.push('T09 must depend on P03');

  out.push(...governanceProblems(proposal?.governance));
  for (const [key, expected] of Object.entries(LEGAL_STATE)) {
    if (proposal?.legalCommercialState?.[key] !== expected)
      out.push(`legalCommercialState.${key} must be ${JSON.stringify(expected)}`);
  }

  const verdictBlock = proposal?.verdictBlock ?? {};
  if (verdictBlock.MC19_VERDICT !== 'BLOCKED')
    out.push('verdictBlock.MC19_VERDICT must be BLOCKED');
  if (verdictBlock.MC19_IMPLEMENTATION_STARTED !== false)
    out.push('verdictBlock.MC19_IMPLEMENTATION_STARTED must be false');
  if (verdictBlock.MC19_PUBLIC_ROUTES_ACTIVATED !== 0)
    out.push('verdictBlock.MC19_PUBLIC_ROUTES_ACTIVATED must be 0');
  if (!String(proposal?.stopStatement ?? '').includes('MC19_IMPLEMENTATION_STARTED = false'))
    out.push('stopStatement must record MC19_IMPLEMENTATION_STARTED = false');
  return out;
}

/** Fail-closed governance flags. A single changed flag is a defect. */
export function governanceProblems(governance) {
  const out = [];
  if (!governance || typeof governance !== 'object') return ['governance block missing'];
  for (const [key, expected] of Object.entries(GOVERNANCE)) {
    if (governance[key] !== expected)
      out.push(`governance.${key} must be ${JSON.stringify(expected)}`);
  }
  return out;
}

/** The IA registry must still show the owners gap and the MC-15 route set. */
export function routeGapProblems(routes) {
  const out = [];
  if (!Array.isArray(routes)) return ['proposed routes are not an array'];
  if (routes.length !== 23) out.push(`expected 23 proposed routes, got ${routes.length}`);
  if (routes.some((route) => route.publicationAuthorized !== false))
    out.push('a proposed route is publication-authorized');
  if (routes.some((route) => route.status !== 'PROPOSED_INTERNAL_NOT_DEPLOYABLE'))
    out.push('a proposed route is not PROPOSED_INTERNAL_NOT_DEPLOYABLE');
  const ids = routes.map((route) => route.routeId);
  for (const id of ['professionals', 'installers', 'mareaSolutions', 'mareaSolutionFleet']) {
    if (!ids.includes(id)) out.push(`missing MC-15 route ${id}`);
  }
  if (routes.filter((route) => route.pageType === 'BUNDLE').length !== 6)
    out.push('expected 6 bundle routes');
  if (routes.some((route) => /owner|armador/i.test(JSON.stringify(route))))
    out.push('an owners route exists; the IA decision would already be taken');
  return out;
}

/** Review evidence: pending is allowed, a completed review may not hide a blocker. */
export function reviewProblems(review) {
  const out = [];
  const status = String(review?.status ?? '');
  if (!['PENDING_INDEPENDENT_REVIEW', 'COMPLETE'].includes(status))
    out.push('review status must be PENDING_INDEPENDENT_REVIEW or COMPLETE');
  if (status === 'COMPLETE') {
    if (!review.reviewer) out.push('completed review must name the reviewer');
    if (!review.reviewedCommit) out.push('completed review must record the reviewed commit');
    if (!Array.isArray(review.findings)) out.push('completed review must carry findings');
    const open = (review.findings ?? []).filter(
      (finding) =>
        ['BLOCKING', 'MAJOR'].includes(String(finding.severity).toUpperCase()) &&
        !['CLOSED', 'RESOLVED', 'ACCEPTED'].includes(String(finding.status).toUpperCase()),
    );
    if (open.length > 0) out.push(`${open.length} open blocking/major review finding(s)`);
  }
  return out;
}

/** MC-20 must not be started or made dependent on an unimplemented MC-19. */
export function mc20Problems(handoff) {
  const out = [];
  if (handoff?.contractId !== 'MC19-MC20-HANDOFF-INPUTS') out.push('handoff contractId is wrong');
  if (handoff?.mc20Started !== false) out.push('mc20Started must be false');
  if (handoff?.mc20ScopeApproved !== false) out.push('mc20ScopeApproved must be false');
  if (handoff?.mc20DependencyOnMc19Implementation !== false)
    out.push('mc20DependencyOnMc19Implementation must be false');
  if (!Array.isArray(handoff?.mustNotAssume) || handoff.mustNotAssume.length < 5)
    out.push('mustNotAssume must list at least 5 assumptions');
  const privacy = (handoff?.missingInputs ?? []).find((item) => item.id === 'M05');
  if (privacy?.status !== 'BLOCKED') out.push('missingInputs M05 must remain BLOCKED');
  return out;
}

/** Implementation absence: any changed implementation or public file fails. */
export function implementationProblems({ implementationChanged = [], publicChanged = [] } = {}) {
  const out = [];
  if (implementationChanged.length > 0)
    out.push(`implementation changed: ${implementationChanged.slice(0, 5).join(', ')}`);
  if (publicChanged.length > 0)
    out.push(`public artefact changed: ${publicChanged.slice(0, 5).join(', ')}`);
  return out;
}

function main() {
  const checks = [];
  const add = (id, description, fn) => {
    let outcome;
    try {
      outcome = fn();
    } catch (error) {
      outcome = { ok: false, detail: `threw: ${error instanceof Error ? error.message : error}` };
    }
    const result = {
      id,
      description,
      status: outcome.ok ? 'PASS' : 'FAIL',
      detail: outcome.detail ?? '',
    };
    checks.push(result);
    console.log(
      `${result.status} ${id} · ${description}${result.detail ? ` — ${result.detail}` : ''}`,
    );
    return outcome.ok;
  };
  const pass = (detail) => ({ ok: true, detail });
  const fail = (detail) => ({ ok: false, detail });
  const listProblems = (list, okDetail) =>
    problems(list).length === 0 ? pass(okDetail) : fail(problems(list).slice(0, 6).join(' | '));

  const proposal = readJson(`${DATA}/mc19-scope-proposal.json`);
  const source = readJson(`${DATA}/mc19-source-verification.json`);
  const review = readJson(`${DATA}/mc19-review-findings.json`);
  const handoff = readJson(`${DATA}/mc19-mc20-handoff-inputs.json`);
  const manifest = readJson(`${DATA}/manifest.json`);
  const routes = readJson('docs/marea/information-architecture/data/proposed-routes.json').items;
  const legal = readJson('docs/marea/legal-commercial/data/release-evidence-gates.json');
  const claims = readJson('docs/marea/legal-commercial/data/bilingual-claims.json');

  add('MC19-01', 'the seven proposal documents exist and are substantive', () => {
    const missing = REQUIRED_DOCS.filter((name) => !exists(`${DOCS}/${name}`));
    if (missing.length) return fail(`missing: ${missing.join(', ')}`);
    const thin = REQUIRED_DOCS.filter((name) => read(`${DOCS}/${name}`).trim().length < 800);
    if (thin.length) return fail(`too thin: ${thin.join(', ')}`);
    return pass(`${REQUIRED_DOCS.length} documents present`);
  });

  add('MC19-02', 'the six machine-readable datasets exist and parse', () => {
    const missing = REQUIRED_DATA.filter((name) => !exists(`${DATA}/${name}`));
    if (missing.length) return fail(`missing: ${missing.join(', ')}`);
    for (const name of REQUIRED_DATA) readJson(`${DATA}/${name}`);
    return pass(`${REQUIRED_DATA.length} datasets parse`);
  });

  add('MC19-03', 'the baseline is the verified MC-18 head and its ancestor', () => {
    if (proposal.baseline.head !== BASELINE) return fail('proposal baseline differs');
    try {
      gitRaw(['merge-base', '--is-ancestor', BASELINE, 'HEAD']);
    } catch {
      return fail('baseline is not an ancestor of HEAD');
    }
    return pass(`baseline ${BASELINE.slice(0, 7)} is an ancestor of HEAD`);
  });

  add('MC19-04', 'the working branch is the MC-19 proposal branch', () => {
    const branch = git(['branch', '--show-current'])[0] ?? '';
    return branch === MC19_BRANCH ? pass(branch) : fail(`unexpected branch: ${branch}`);
  });

  add('MC19-05', 'MC-18 implementation, audit and evidence are unchanged', () => {
    const changed = git([
      'diff',
      '--name-only',
      BASELINE,
      '--',
      'docs/marea/landing',
      'src/app/marea-landing',
    ]);
    return listProblems(changed, 'MC-18 landing package unchanged');
  });

  add('MC19-06', 'MC-17 design system and predecessor evidence are unchanged', () => {
    const changed = git([
      'diff',
      '--name-only',
      BASELINE,
      '--',
      'src/app/marea-design-system',
      'docs/marea/design-system',
      'docs/marea/commerce-data',
      'docs/marea/information-architecture',
      'docs/marea/legal-commercial',
    ]);
    return listProblems(changed, 'predecessor evidence unchanged');
  });

  add('MC19-07', 'no public route, sitemap, server or public asset changed', () => {
    const changed = git([
      'diff',
      '--name-only',
      BASELINE,
      '--',
      'src/app/app.routes.ts',
      'src/app/app.routes.server.ts',
      'src/app/core/i18n/locale-routes.ts',
      'src/server.ts',
      'public',
      'deploy',
      'Dockerfile',
    ]);
    return listProblems(changed, 'public surface unchanged');
  });

  add('MC19-08', 'no MC-19 implementation file exists', () => {
    const changed = git([
      'diff',
      '--name-only',
      BASELINE,
      '--',
      'src/app',
      'preview',
      'e2e/landing',
    ]);
    return listProblems(changed, '0 implementation files changed');
  });

  add('MC19-09', 'no new dependency or lockfile change is introduced', () => {
    const base = JSON.parse(gitRaw(['show', `${BASELINE}:package.json`]));
    const current = readJson('package.json');
    for (const key of ['dependencies', 'devDependencies']) {
      if (JSON.stringify(base[key]) !== JSON.stringify(current[key])) return fail(`${key} changed`);
    }
    if (git(['diff', '--name-only', BASELINE, '--', 'package-lock.json']).length !== 0)
      return fail('package-lock.json changed');
    return pass('dependencies unchanged; lockfile unchanged');
  });

  add('MC19-10', 'the proposal contract is internally consistent', () =>
    listProblems(proposalProblems(proposal), 'proposal contract valid'),
  );

  add('MC19-11', 'the IA registry still shows the owners route gap', () =>
    listProblems(routeGapProblems(routes), '23 proposed routes; owners route absent'),
  );

  add('MC19-12', 'the legal and privacy state matches the canonical datasets', () => {
    if (legal.summary.gates !== LEGAL_STATE.releaseGates) return fail('gate count differs');
    if (legal.summary.gatesClosed !== LEGAL_STATE.releaseGatesClosed)
      return fail('closed gate count differs');
    if (legal.summary.documents !== LEGAL_STATE.requiredDocuments)
      return fail('document count differs');
    if (legal.summary.documentsExecuted !== LEGAL_STATE.documentsExecuted)
      return fail('executed document count differs');
    if (legal.gates.find((gate) => gate.gateId === LEGAL_STATE.privacyGateId)?.status !== 'BLOCKED')
      return fail('privacy gate is not BLOCKED');
    if (claims.claims.length !== LEGAL_STATE.cataloguedClaims) return fail('claim count differs');
    if (claims.claims.some((claim) => claim.publicAuthorized === true))
      return fail('a claim is public-authorized');
    return pass('13/0 gates, 24/0 documents, 42/0 claims, privacy BLOCKED');
  });

  add('MC19-13', 'the MC-20 handoff is inputs-only and not a start signal', () =>
    listProblems(mc20Problems(handoff), 'MC-20 not started and not dependent on MC-19'),
  );

  add('MC19-14', 'the independent review is recorded or explicitly pending', () =>
    listProblems(reviewProblems(review), `review status: ${review.status}`),
  );

  add('MC19-15', 'the manifest matches the package counts', () => {
    if (manifest.counts.prerequisites !== 10) return fail('prerequisite count differs');
    if (manifest.counts.acceptanceCriteria !== 10) return fail('acceptance count differs');
    if (manifest.counts.risks !== 14) return fail('risk count differs');
    if (manifest.implementationState.implementationStarted !== false)
      return fail('manifest records implementation started');
    return pass('manifest counts and implementation state valid');
  });

  add('MC19-16', 'no document claims a PASS or a verified implementation', () => {
    const text = REQUIRED_DOCS.map((name) => read(`${DOCS}/${name}`)).join('\n');
    if (/MC19_VERDICT\s*=\s*PASS/.test(text)) return fail('MC19_VERDICT=PASS recorded');
    if (/MC19_IMPLEMENTATION_STARTED\s*=\s*true/.test(text))
      return fail('MC19_IMPLEMENTATION_STARTED=true recorded');
    if (/MC19_ACCEPTANCE_CRITERIA_VERIFIED\s*=\s*[1-9]/.test(text))
      return fail('verified acceptance criteria claimed');
    return pass('BLOCKED verdict and no verified implementation claim');
  });

  add('MC19-17', 'the decision log records the scope-proposal stop', () => {
    const log = read('docs/marea/execution/DECISION-LOG.md');
    if (!/## D-078\b/.test(log)) return fail('D-078 missing');
    if (!/BLOCKED_PENDING_SCOPE_APPROVAL|scope proposal/i.test(log))
      return fail('D-078 does not record the scope proposal');
    return pass('D-078 present');
  });

  add('MC19-18', 'the 36-milestone registry row 19 records BLOCKED', () => {
    const registry = read('docs/marea/execution/MASTER-PROMPT-REGISTRY.md');
    const row = registry.split('\n').find((line) => /^\|\s*19\s*\|/.test(line)) ?? '';
    if (!/BLOCKED/i.test(row)) return fail('row 19 is not BLOCKED');
    if (!/MC19-SCOPE-PROPOSAL|mc19-scope-proposal/.test(row))
      return fail('row 19 does not cite the scope proposal');
    return pass('row 19 records BLOCKED and cites the proposal');
  });

  add('MC19-19', 'no merge, deployment or publication is recorded', () => {
    for (const [key, value] of Object.entries(proposal.verdictBlock)) {
      if (/MERGED|DEPLOYED|PUBLISHED/.test(key) && value !== false)
        return fail(`${key} is not false`);
    }
    return pass('MC19_MERGED/DEPLOYED/PUBLISHED = false');
  });

  add('MC19-20', 'the source-verification dataset records the real baseline commands', () => {
    if (source.contractId !== 'MC19-SOURCE-VERIFICATION') return fail('wrong contractId');
    if (!Array.isArray(source.commands) || source.commands.length < 10)
      return fail('fewer than 10 recorded commands');
    if (!source.commands.some((entry) => entry.command === 'git rev-parse HEAD'))
      return fail('no git rev-parse HEAD record');
    return pass(`${source.commands.length} commands recorded`);
  });

  const failed = checks.filter((check) => check.status === 'FAIL');
  const head = (() => {
    try {
      return git(['rev-parse', 'HEAD'])[0] ?? 'unknown';
    } catch {
      return 'unknown';
    }
  })();
  const record = {
    contractId: 'MC19-SCOPE-VALIDATOR-RUN',
    contractVersion: '1.0.0',
    milestone: 'MC-19',
    generatedAt: new Date().toISOString(),
    head,
    branch: (() => {
      try {
        return git(['branch', '--show-current'])[0] ?? 'unknown';
      } catch {
        return 'unknown';
      }
    })(),
    baseline: BASELINE,
    status: failed.length === 0 ? 'PASS' : 'FAIL',
    total: checks.length,
    passed: checks.length - failed.length,
    failed: failed.length,
    checks,
  };
  mkdirSync(resolve(root, EVIDENCE), { recursive: true });
  writeFileSync(
    resolve(root, `${EVIDENCE}/scope-validator-run.json`),
    `${JSON.stringify(record, null, 2)}\n`,
  );
  console.log(
    `\nMC-19 scope validator: ${record.passed}/${record.total} checks passed · ${record.status}`,
  );
  console.log(`Evidence: ${EVIDENCE}/scope-validator-run.json`);
  process.exit(failed.length === 0 ? 0 : 1);
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
