#!/usr/bin/env node
/**
 * MC-19 scope-proposal unit and adversarial tests.
 *
 * The adversarial cases mutate the real proposal contract and assert that the
 * validator rejects the mutation. They test the guard functions directly; no
 * synthetic copy of the contract is trusted as the positive control.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  changedFileProblems,
  governanceProblems,
  implementationProblems,
  mc20Problems,
  porcelainPaths,
  proposalProblems,
  reviewProblems,
  riskSummaryProblems,
  routeGapProblems,
} from './check-mc19-scope.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const proposal = JSON.parse(
  readFileSync(resolve(root, 'docs/marea/segments/data/mc19-scope-proposal.json'), 'utf8'),
);
const handoff = JSON.parse(
  readFileSync(resolve(root, 'docs/marea/segments/data/mc19-mc20-handoff-inputs.json'), 'utf8'),
);
const routes = JSON.parse(
  readFileSync(
    resolve(root, 'docs/marea/information-architecture/data/proposed-routes.json'),
    'utf8',
  ),
).items;
const clone = () => structuredClone(proposal);

test('positive control: the real proposal contract passes every guard', () => {
  assert.deepEqual(proposalProblems(proposal), []);
  assert.deepEqual(routeGapProblems(routes), []);
  assert.deepEqual(mc20Problems(handoff), []);
});

test('rejects a wrong contract id', () => {
  const mutated = clone();
  mutated.contractId = 'MC19-SOMETHING-ELSE';
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('contractId')));
});

test('rejects a non-BLOCKED status', () => {
  const mutated = clone();
  mutated.status = 'READY_FOR_IMPLEMENTATION';
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('status')));
});

test('rejects an implementation that has started', () => {
  const mutated = clone();
  mutated.mc19ExecutionState.implementationStarted = true;
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('implementationStarted')));
});

test('rejects a claim that the Master Prompt is recorded or supplied', () => {
  const mutated = clone();
  mutated.mc19ExecutionState.masterPromptRecordedOrSupplied = true;
  assert.ok(
    proposalProblems(mutated).some((problem) => problem.includes('masterPromptRecordedOrSupplied')),
  );
});

test('rejects a claim that the scope is sufficient for implementation', () => {
  const mutated = clone();
  mutated.definitionAssessment.sufficientForImplementation = true;
  assert.ok(
    proposalProblems(mutated).some((problem) => problem.includes('sufficientForImplementation')),
  );
});

test('rejects a missing privacy prerequisite', () => {
  const mutated = clone();
  mutated.prerequisites = mutated.prerequisites.filter((item) => item.id !== 'P03');
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('P03')));
});

test('rejects an implementation blocker list that omits the IA decision', () => {
  const mutated = clone();
  mutated.implementationBlockers = mutated.implementationBlockers.filter((id) => id !== 'P02');
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('P02')));
});

test('rejects a scope with fewer than three options', () => {
  const mutated = clone();
  mutated.options = mutated.options.slice(0, 2);
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('3 scope options')));
});

test('rejects a recommendation that is not option A', () => {
  const mutated = clone();
  mutated.recommendedOption = 'C';
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('recommendedOption')));
});

test('rejects duplicate acceptance-criterion ids', () => {
  const mutated = clone();
  mutated.proposedAcceptanceCriteria[1].id = mutated.proposedAcceptanceCriteria[0].id;
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('unique')));
});

test('rejects a changed MAREA public-use flag', () => {
  const mutated = clone();
  mutated.governance.mareaPublicUse = 'GO';
  assert.ok(
    governanceProblems(mutated.governance).some((problem) => problem.includes('mareaPublicUse')),
  );
});

test('rejects changed legal counts', () => {
  const mutated = clone();
  mutated.legalCommercialState.releaseGates = 12;
  assert.ok(
    proposalProblems(mutated).some((problem) =>
      problem.includes('legalCommercialState.releaseGates'),
    ),
  );
});

test('rejects a PASS verdict block', () => {
  const mutated = clone();
  mutated.verdictBlock.MC19_VERDICT = 'PASS';
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('MC19_VERDICT')));
});

test('rejects a stop statement that does not record the no-implementation state', () => {
  const mutated = clone();
  mutated.stopStatement = 'Implementation is approved.';
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('stopStatement')));
});

test('rejects a deleted deferred enquiry task', () => {
  const mutated = clone();
  mutated.proposedTaskDag = mutated.proposedTaskDag.filter((task) => task.id !== 'T09');
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('T09')));
});

test('rejects an IA registry that already contains an owners route', () => {
  const mutated = structuredClone(routes);
  mutated.push({
    routeId: 'mareaSegmentOwners',
    pageType: 'SEGMENT',
    status: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE',
    publicationAuthorized: false,
  });
  assert.ok(routeGapProblems(mutated).some((problem) => problem.includes('owners route')));
});

test('rejects a proposed route that becomes publication-authorized', () => {
  const mutated = structuredClone(routes);
  mutated[0].publicationAuthorized = true;
  assert.ok(
    routeGapProblems(mutated).some((problem) => problem.includes('publication-authorized')),
  );
});

test('rejects a completed review with an open blocking finding', () => {
  const mutated = {
    status: 'COMPLETE',
    reviewer: 'independent reviewer',
    reviewedCommit: 'abc123',
    findings: [
      {
        id: 'F-01',
        severity: 'BLOCKING',
        status: 'OPEN',
        problem: 'scope invented',
        requiredFix: 'stop',
      },
    ],
  };
  assert.ok(reviewProblems(mutated).some((problem) => problem.includes('open blocking')));
});

test('accepts a pending review and a completed clean review', () => {
  assert.deepEqual(reviewProblems({ status: 'PENDING_INDEPENDENT_REVIEW' }), []);
  assert.deepEqual(
    reviewProblems({
      status: 'COMPLETE',
      reviewer: 'independent reviewer',
      reviewedCommit: 'abc123',
      findings: [{ id: 'F-01', severity: 'MINOR', status: 'CLOSED' }],
    }),
    [],
  );
});

test('rejects an MC-20 handoff that starts MC-20 or depends on MC-19', () => {
  const mutated = structuredClone(handoff);
  mutated.mc20Started = true;
  mutated.mc20DependencyOnMc19Implementation = true;
  assert.ok(mc20Problems(mutated).some((problem) => problem.includes('mc20Started')));
  assert.ok(mc20Problems(mutated).some((problem) => problem.includes('mc20Dependency')));
});

test('rejects P03 listed as an implementation blocker of option A', () => {
  const mutated = clone();
  mutated.implementationBlockers.push('P03');
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('P03')));
});

test('rejects a missing enquiry-flow blocker', () => {
  const mutated = clone();
  mutated.enquiryFlowBlockers = [];
  assert.ok(proposalProblems(mutated).some((problem) => problem.includes('enquiryFlowBlockers')));
});

test('accepts the real proposal package paths and rejects an out-of-path implementation file', () => {
  assert.deepEqual(
    changedFileProblems([
      'docs/marea/segments/MC19-SCOPE-PROPOSAL.md',
      'docs/marea/segments/data/mc19-scope-proposal.json',
      'scripts/check-mc19-scope.mjs',
      'scripts/check-mc19-scope.test.mjs',
      'package.json',
      'docs/marea/execution/DECISION-LOG.md',
      'docs/marea/execution/MASTER-PROMPT-REGISTRY.md',
    ]),
    [],
  );
  assert.ok(
    changedFileProblems(['src/server/enquiry.ts']).some((problem) =>
      problem.includes('src/server/enquiry.ts'),
    ),
  );
  assert.ok(
    changedFileProblems(['e2e/segments/owners.spec.ts']).some((problem) =>
      problem.includes('e2e/segments'),
    ),
  );
});

test('rejects an untracked public or unknown file', () => {
  assert.ok(
    changedFileProblems(['public/marea-hero.svg']).some((problem) =>
      problem.includes('public/marea-hero.svg'),
    ),
  );
  assert.ok(changedFileProblems(['notes.txt']).some((problem) => problem.includes('notes.txt')));
});

test('implementationProblems catches a changed implementation path', () => {
  assert.deepEqual(
    implementationProblems({
      implementationChanged: ['src/app/marea-landing/segments/owners.ts'],
      publicChanged: [],
    }).length,
    1,
  );
  assert.deepEqual(implementationProblems(), []);
});

test('parses leading-space, untracked and renamed porcelain paths', () => {
  const output =
    ' M docs/marea/segments/MC19-SCOPE-PROPOSAL.md\n?? src/server/enquiry.ts\nR  old.ts -> new.ts\n';
  assert.deepEqual(porcelainPaths(output), [
    'docs/marea/segments/MC19-SCOPE-PROPOSAL.md',
    'src/server/enquiry.ts',
    'new.ts',
  ]);
});

test('rejects a risk summary that does not match the risk entries', () => {
  const risks = [
    { id: 'R01', impact: 'HIGH', status: 'OPEN' },
    { id: 'R02', impact: 'HIGH', status: 'OPEN' },
    { id: 'R03', impact: 'BLOCKER', status: 'OPEN' },
    { id: 'R04', impact: 'MEDIUM', status: 'OPEN' },
  ];
  assert.deepEqual(
    riskSummaryProblems(risks, { total: 4, blocker: 1, high: 2, medium: 1, closed: 0 }),
    [],
  );
  assert.ok(
    riskSummaryProblems(risks, { total: 4, blocker: 1, high: 3, medium: 1, closed: 0 }).some(
      (problem) => problem.includes('risk summary high'),
    ),
  );
});
