# MC-10R — Implementation and synthetic test evidence (D20)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D20 / `MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Status | `IMPLEMENTATION_EVIDENCE` — local synthetic evidence only; not operational approval |
| Date | 2026-11-01 |
| Owner | `agent-f-data` (Research Data Security and Integrity Engineer) |
| Scope | What was actually implemented locally for the MC-10R data workstream, the exact commands run and their observed output, the five separate storage evidence states, and the honest limitations. No participant data, no store and no approval exists. |
| Storage evidence states | `ARCHITECTURE_DEFINED = true`; `LOCAL_SYNTHETIC_TESTS_PASS = true`; `PROVISIONED = false`; `ACCESS_REVIEWED = false`; `OPERATIONALLY_APPROVED = false` |

> **STATUS BANNER — MC-10R / D20.** This is local synthetic implementation evidence. It proves
> that deterministic contracts and their validators work on this machine; it does not prove
> that any research store, encryption service, access list, processor or interviewer exists.
> `PROVISIONED = false`, `ACCESS_REVIEWED = false`, `OPERATIONALLY_APPROVED = false`. No
> participant, interview, price response, audio or transcript exists. Fieldwork remains
> `BLOCKED` because `AUTH-MC10-001` is `NOT_GRANTED`.

## 1. What was implemented locally

| Artifact | Path | What it does | Executed locally |
| --- | --- | --- | --- |
| Secure data architecture | `recovery/data/MC10R-SECURE-DATA-ARCHITECTURE.md` (D17) | Three-layer model, access matrix, encryption, retention, deletion, withdrawal, backup, audit, processors, export, breach, synthetic test plan | Design only |
| Research data contract | `recovery/data/MC10R-DATA-CONTRACT.md` (D18) | Record types, required/prohibited fields, pseudonymization, consent state machine, provenance, pricing fields, data-quality flags, Layer C allowlist, PII rules | Design only |
| Access/retention/deletion | `recovery/data/MC10R-ACCESS-RETENTION-AND-DELETION.md` (D19) | Role matrix, least privilege, retention schedule, deletion procedure, withdrawal propagation, backup, audit retention, processors, export, breach, accountable owners, synthetic test procedure | Design only |
| Recovery contract | `recovery/data/mc10r-recovery.contract.json` (D27) | Machine-readable binding truth, sampling, consent model, amendments, authorization, readiness, deliverables, validators, status model, commercial invariants | Validated |
| Amendment registry | `recovery/data/mc10r-amendments.json` (D28) | 14 candidate amendments, none approved | Validated |
| Authorization draft | `recovery/data/mc10r-authorization-draft.json` (D29) | Ungranted AUTH-MC10-001 revision 2 mirror of D13 | Validated |
| Fieldwork readiness | `recovery/data/mc10r-fieldwork-readiness.json` (D30) | PARTIALLY_READY / BLOCKED, 27 prerequisites, seven unassigned roles, storage states, Wave 1 plan | Validated |
| Recovery gate | `scripts/check-marea-customer-recovery.mjs` (D31) | Deterministic `CRR` checks over the recovery package | Executed |
| Adversarial suite | `scripts/check-marea-customer-recovery.test.mjs` (D32) | Negative mutations and acceptance controls against throwaway fixtures | Executed |
| Synthetic fixtures | operating-system temporary directory created by D32 | Copy of the recovery package plus injected mutations and accepted controls | Executed and destroyed |

No schema runtime, database, key, bucket, service, queue, processor, network call or dependency
was created or configured. The only executable artifacts are the two plain-Node scripts.

## 2. What the gate validates

The recovery gate implements CRR check ids; the exact count is whatever the real run reports
(it is never pre-declared in the contract). It enforces at least:

- D27-D30 load as canonical JSON and the binding truth stays `MC10 = BLOCKED`,
  `AUTH_MC10_001 = NOT_GRANTED`, `OUTREACH_AUTHORIZATION = NOT_GRANTED`,
  `FIELDWORK_STATUS = BLOCKED`, every count zero.
- `commercialInvariants` are deep-equal to the frozen MC-10 block.
- A recovery `PASS`/`READY` state can never imply fieldwork permission.
- D29 carries exactly the 31 D13 authorization fields plus the four sibling status keys,
  `inferenceGuard`, `fieldStatus` and `fieldMapNote`; `DRAFT_PREPARED` / `NOT_GRANTED` /
  `false` / `false`; all human, legal, storage and interviewer fields null or empty; and it
  matches D13 field for field.
- Sampling: per-segment minima/maxima sum to 37/57, the 40-80 aspiration is preserved and
  non-derivable, Wave 1 is 18-28 on SEG-01/03/04/06, Wave 2 completes 37/57.
- Pricing: 32 cells over segment × experiment × construct, `n >= 8` never reduced, the
  two-attribute rule (reachability AND registered population) enforced, `BELOW_REGISTERED_MINIMUM`
  and `NOT_NAMED` cells never experiment-level eligible, zero approved prices.
- Amendments: 14 entries, none approved, no approval evidence, no effective date, historical
  instrument `1.0.0` preserved.
- Deliverables: the D1-D36 inventory uses the canonical paths and owners; D1-D32 required at
  `IMPLEMENTATION`, D33-D36 only at `FINAL`; every recovery file is inventoried.
- No fabricated attribution or participant claim in recovery prose (English, Spanish,
  Portuguese heuristics), no positive participant/interview/price count, no PII, no
  participant identity key, no audio or transcript.
- Consent transitions closed; withdrawal is terminal; the eight-step propagation chain and the
  accountable owner fields are present and never filled with an invented person.
- Storage: only `ARCHITECTURE_DEFINED` and `LOCAL_SYNTHETIC_TESTS_PASS` are true; no role is
  trained, appointed or authorized; no recovery content sits under `src/`, `public/` or
  `deploy/`.
- No approval without evidence, no provisioning claim, no authorization-gate bypass, no
  weakened commercial restriction.

## 3. Commands run and observed output

The following commands were run for real on this machine at the recorded working tree. Outputs
are the observed stdout summaries, not aspirations.

### 3.1 Existing MC-10 research-integrity gate (unchanged)

```
node scripts/check-marea-customer-research.mjs
```

Observed: `MC-10 customer research validation: 62/62 checks passed` (exit code 0). The existing
gate keeps exactly 62 checks `CR-01`…`CR-62`; this milestone does not add, remove or weaken a
check.

### 3.2 Existing MC-10 negative suite (preserved)

```
node --test scripts/check-marea-customer-research.test.mjs
```

Observed at the start of this workstream: 96 tests, 96 pass, 0 fail. Those 96 pre-existing
tests are preserved. The 96-test count is not the final suite count: the Lead's MC-10R CR-62
strengthening adds new tests in the same file, and the authoritative final count including that
Lead-owned extension is recorded by the Lead in the delivery record (D35). This document does
not claim a count for the Lead-owned extension.

### 3.3 New MC-10R recovery gate

```
node scripts/check-marea-customer-recovery.mjs
```

Observed: `MC-10R recovery validation: 32/32 checks passed` (exit code 0) after D20 and D32
landed. The check ids are `CRR-01`…`CRR-32` contiguous and the count is the real run output,
not a pre-declared target.

### 3.4 New MC-10R adversarial suite

```
node --test scripts/check-marea-customer-recovery.test.mjs
```

Observed: 74 tests, 74 pass, 0 fail. Each case copies the package into an operating-system
temporary directory, proves the unmutated fixture passes, applies exactly one mutation, and
asserts that the expected `CRR` ids and exit code fail. Seven acceptance controls prove that
prepared instrument wording, labelled training-synthetic fixtures, public-source quotations,
zero counts, planning quotas, prohibited-form examples and hypothetical scripts are NOT
rejected.

### 3.5 Formatting

```
npx --no-install prettier --check scripts/check-marea-customer-recovery.mjs scripts/check-marea-customer-recovery.test.mjs
```

Observed: `All matched files use Prettier code style!` after `prettier --write`.

### 3.6 Whitespace

```
git diff --check
```

Observed: no output (no whitespace errors). This document, D31 and D32 are new files; the Lead
performs the Git writes.

## 4. Five separate storage evidence states

| State | Value | Meaning |
| --- | --- | --- |
| `ARCHITECTURE_DEFINED` | **true** | D17-D19 and the D27-D30 contracts exist and are validated locally |
| `LOCAL_SYNTHETIC_TESTS_PASS` | **true** | D31/D32 pass on this machine against synthetic fixtures only |
| `PROVISIONED` | **false** | No store, account, key, bucket, database, audit service or processor exists |
| `ACCESS_REVIEWED` | **false** | No real access list exists to review |
| `OPERATIONALLY_APPROVED` | **false** | No accountable human has approved operation |

A document is not a store. A validator is not an access review. A synthetic test is not
operational approval.

## 5. Honest limitations

- No real store exists. Nothing was provisioned, configured, encrypted with a real key or
  backed up. `PROVISIONED = false` and must stay false until a named human provisions it.
- No encryption at rest in a real service was tested. Encryption requirements are stated, not
  demonstrated.
- No processor agreement exists and no processor was engaged. No cloud service was selected
  or configured.
- No controller, privacy contact, data steward, fieldwork lead, interviewer, analyst, second
  coder or auditor is appointed. All accountable fields are `OPEN` or `UNASSIGNED`.
- No participant exists: participants, interviews, valid analysis cases, price responses,
  coded units and findings are all 0. No audio and no transcript exists anywhere.
- Access-control, encryption-at-rest, backup/restore, audit-log and export-control security
  tests are `NOT_EXECUTED` because they require a real store; they are specified in D17 §15
  and D19 §13. Reporting them as passing would be false.
- The narrative/PII scans are deterministic heuristics, not semantic classifiers. A clean scan
  is a control that fails loudly on the documented forms; it is not proof that no fabricated
  evidence exists. The documented lexical limits are recorded in D18 and the MC-10R addendum
  to `data-contract/MC10-DATA-CONTRACT.md`.
- The local evidence is reproducible only on this machine and working tree; it makes no claim
  about remote state, CI, deployment or production.
- This document does not authorize fieldwork, contact, spending, publication or approval.
  `AUTH-MC10-001` remains `NOT_GRANTED` and `FIELDWORK_STATUS` remains `BLOCKED`.

## 6. Reproduction

From the repository root, with Node installed and no new dependency:

```
node scripts/check-marea-customer-research.mjs
node --test scripts/check-marea-customer-research.test.mjs
node scripts/check-marea-customer-recovery.mjs
node --test scripts/check-marea-customer-recovery.test.mjs
npx --no-install prettier --check scripts/check-marea-customer-recovery.mjs scripts/check-marea-customer-recovery.test.mjs
git diff --check
```

The recovery gate also accepts `--root <dir>` and `--json`; the adversarial suite uses
`--root` against fixtures under the operating-system temporary directory and never mutates the
repository.
