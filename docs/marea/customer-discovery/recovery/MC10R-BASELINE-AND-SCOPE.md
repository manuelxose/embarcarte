# MC-10R — Verified baseline and recovery scope (D1)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D1 / `MC10R-BASELINE-AND-SCOPE` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Recovery branch | `feature/marea-mc10r-fieldwork-recovery` |
| Base commit | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` |
| Date | 2026-11-01 |
| Owner | `lead` |
| Baseline status | `VERIFIED` — no material discrepancy against the previously recorded MC-10 baseline |
| MC-10 status at baseline | `BLOCKED` |
| Authorization at baseline | `AUTH-MC10-001 = NOT_GRANTED` |

## 1. Purpose

This document freezes the actual repository, review and runtime state from which MC-10R starts,
before any recovery artifact is written. It records what was verified by command or by reading the
real files, what remains an external claim, and what MC-10R is and is not allowed to change.

## 2. Verification method

All verification was performed in the shared checkout
`C:\Users\Admin\Documents\workspace\embarcarte` on Windows 11 with PowerShell, Node.js `v24.18.0`
and npm `12.0.1`. Git reads were permitted; no Git write occurred before this record. The working
tree was clean at verification time (`git status --porcelain=v1` returned no entries).

## 3. Repository and commit baseline

| Item | Verified value | Evidence |
| --- | --- | --- |
| Repository root | `C:/Users/Admin/Documents/workspace/embarcarte` | `git rev-parse --show-toplevel` |
| Primary remote | `https://github.com/manuelxose/embarcarte.git` (fetch/push) | `git remote -v` |
| Base branch | `feature/marea-mc10-primary-customer-discovery` | `git branch --show-current` |
| Local HEAD | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` | `git rev-parse HEAD` |
| Remote HEAD | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` | `git ls-remote origin feature/marea-mc10-primary-customer-discovery` |
| Working tree | Clean at baseline | `git status --porcelain=v1` (empty) |
| MC-09 ancestor | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` is an ancestor of `d1ac69a` | `git merge-base --is-ancestor` exit 0 |
| Recovery HEAD ancestor | `d1ac69a` is an ancestor of `feature/marea-mc10r-fieldwork-recovery` HEAD | `git merge-base --is-ancestor` exit 0 |
| MC-10 change set vs MC-09 | 53 files, 16,910 insertions, 3 deletions | `git diff --stat 9d206cc d1ac69a` |
| Latest commit | `docs(mc10): independent review PASS for preparation scope, registry closure and final delivery record` | `git log --oneline -1` |

The recovery branch was created from `d1ac69a` and no force-push, rewrite or merge was performed.
`OPEN-MARINE` (`manuelxose/open-marine`) was not cloned, modified or consulted as a source of
implementation during MC-10R; it remains read-only engineering reference material.

## 4. Stacked delivery baseline — PR #16

Verified with the GitHub CLI (`gh pr view 16 --json ...`):

| Field | Verified value |
| --- | --- |
| Number | 16 |
| Title | `MC-10: primary customer discovery preparation, authorization gate and integrity gate (fieldwork BLOCKED)` |
| State | `OPEN` |
| Draft | `true` |
| Base | `feature/marea-mc09-market-competitive-intelligence` |
| Head branch | `feature/marea-mc10-primary-customer-discovery` |
| Head commit | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` |
| Mergeable | `MERGEABLE` (merge state `CLEAN`) |
| Merged at | `null` (not merged) |

PR #16 is a stacked draft. MC-10R does not modify it, does not merge it and does not change its base.
The MC-10R draft PR targets `feature/marea-mc10-primary-customer-discovery` (see D2 §7).

## 5. Baseline gate results (real runs, before any recovery change)

| Command | Real result | Exit |
| --- | --- | --- |
| `node scripts/check-marea-customer-research.mjs` | `MC-10 customer research validation: 62/62 checks passed` | 0 |
| `node --test scripts/check-marea-customer-research.test.mjs` | `tests 96 / pass 96 / fail 0` | 0 |

These are the regression baselines MC-10R must preserve: every one of the 62 checks keeps passing and
every one of the 96 negative tests keeps passing after the additive CR-62 strengthening and the new
recovery gate are integrated. The exact final counts are reported from the actual final runs in
D20 and D35; no count is asserted here for the new work.

## 6. Freeze integrity recomputation (independent, before amendments)

The twelve frozen SHA-256 values were recomputed in a separate Node process using the documented
canonicalisation (`JSON.stringify(sortKeys(value), null, 2)`, UTF-8, SHA-256, lowercase hex) and
Python-independent file hashing:

| Object | Recorded value (first 24 hex) | Recomputation |
| --- | --- | --- |
| MC-09 customer-discovery plan (instrument source) | `cbe7f9fe4634c44a7344a4b9` | Match against the actual 39,322-byte file, as text and bytes |
| EXP-MC10-01 threshold | `199d1707131d0f104481d54c` | Match |
| EXP-MC10-02 threshold | `e4d4c05f1dc710f912476989` | Match |
| EXP-MC10-03 threshold | `46e535074b9e45fb2977362d` | Match |
| EXP-MC10-04 threshold | `9003cbc60cac89b900300466` | Match |
| EXP-MC10-05 threshold | `5d6d71906b77afb0594195c6` | Match |
| EXP-MC10-06 threshold | `ae2528b282482d23fb777f73` | Match |
| EXP-MC10-07 threshold | `c16e255616e83bf6fcdf968f` | Match |
| EXP-MC10-08 threshold | `1600ef293030f7f1ea4e6239` | Match |
| EXP-MC10-09 threshold | `73a403e980513e48cb932d3d` | Match |
| EXP-MC10-10 threshold | `0e5eb0e20b7a6714120aa469` | Match |
| Pricing-ladder self-freeze (`constructs`) | `bfa09ebc904a66ba65961864` | Match |

Note on file-level versus canonical hashes: the byte hash of `data/pricing-ladders.json` is
`63f398f056a2d0de9fff9deb5c154983af5910aa0a32b21566d5269fc436bafb` and of
`data/experiments.json` is `5ba020811b54f54595db6eeec6e1cd55603ce1b2daffab2471ab2d6c2b4a08a4`.
Those differ from the freeze values by design: the freezes hash a canonicalised payload (`constructs`
or the whole MC-09 experiment record), not the container file. The baseline is intact; no post-hoc
threshold or ladder change is present.

## 7. Runtime and Agent Teams verification

| Capability | Verified state |
| --- | --- |
| Working directory | `C:\Users\Admin\Documents\workspace\embarcarte` (shared by all team members) |
| Agent Teams roster limit | 8 members including the Lead; 256 shared tasks; compare-and-set task revisions; advisory write scopes; no filesystem locks |
| Lead-only operations | `spawn_teammate`, `interrupt_agent`, Git writes, integration, final delivery |
| Teammate tools | shared task board, messaging, `wait_agent`; teammates cannot widen permissions |
| Legacy `subagent` / `subagent_fork` | disabled by the Agent Teams bundle (replaced by team tools) |
| `workflow` | available but not used in MC-10R: the team shares one checkout and parallel writers are partitioned by write scope |
| Approval policy | `never` for this session; safety comes from task scoping and Lead review |
| Network outreach tools | none; no email, telephony, messaging or social channel is exposed to the team |
| Shell limitations | PowerShell runs in a confined mode with non-fatal `.NET` startup noise on stderr; cmdlets and Node.js work |

## 8. MC-10 review state read at baseline

`docs/marea/customer-discovery/review/MC-10-REVIEW.md` (MC10-REVIEW-03, round 3) records a `PASS`
for the **Wave-0 preparation scope only** and explicitly refuses a primary-research PASS. It closes
F-01/F-02/F-03/F-06 and leaves four informational residuals relevant to MC-10R:

| Finding | State | Relevance to MC-10R |
| --- | --- | --- |
| F-04 — D28 provisional delivery fields | OPEN (informational) | MC-10R does not modify the MC-10 delivery record; the recovery records its own delivery |
| F-05 — registry row 10 `PLANNED` | OPEN (informational) | MC-10R updates the registry row 10 with the honest BLOCKED state and the recovery evidence |
| F-10 — CR-62 heuristic lexical breadth | OPEN (informational) | Directly addressed by MC-10R workstream J (multilingual CR-62 strengthening + documented limits) |
| F-08 — historical author email strings in decision log | closed/no action | Pre-existing, outside the MC-10 data contract; no new PII may be added |

The review also records the planning defects MC-10R must resolve: PI-01 (quota arithmetic 37/57 vs
40–80), PI-02 (conflicting segment targets), PI-03 (pricing `n>=8` unreachable in SEG-04/05/06/08),
PI-04 (instrument amendments IV-01…IV-06) and PI-05 (GUIDE-01 incident question, exclusions-before-
benefits and concept-ID reconciliation → IV-07…IV-09). The instrument register lists seven frozen
v1.0.0 instruments (SCREEN-01, CONSENT-01, GUIDE-01, PRICE-01, NOTE-01, SCHEMA-01, ANA-01), all
`FROZEN_PENDING_AUTHORIZATION`, with PT `NOT_PRODUCED`.

## 9. Planned and existing defects — recovery scope

| Defect | Recorded source | MC-10R treatment |
| --- | --- | --- |
| PI-01 sampling arithmetic | `data/research-status.json`; MC-09 plan; protocol | Reconciled by a dated, proposed amendment (D5, D8); historical quotas preserved |
| PI-02 inconsistent segment targets | plan, experiment registry, protocol | One authoritative segment-quota contract (D6) |
| PI-03 pricing infeasibility | `data/experiments.json`; `data/pricing-ladders.json` | Feasibility matrix and classifications (D7); no threshold lowered |
| PI-04 instrument amendments IV-01…IV-06 | instrument register; review | Candidate v1.1.0 amendment package (D9–D12) |
| PI-05 owner instrument gaps IV-07…IV-09 | owner/comprehension docs | Candidate v1.1.0 amendment package (D9–D12) |
| CR-62 lexical breadth (F-10) | MC-10 review | Additive multilingual strengthening and honest limit statement (D31, D32, addendum) |
| No authorization | `data/fieldwork-authorization.json` | AUTH-MC10-001 rev 2 prepared `DRAFT_PREPARED`, status `NOT_GRANTED` (D13, D29) |
| No legal/privacy review | `data/research-status.json` blockers | Legal-review-ready package, statuses `DRAFT_FOR_LEGAL_REVIEW` (D15, D16) |
| No secure store | blockers BLK-MC10-05 | Architecture + synthetic tests only, never claimed provisioned (D17–D20) |
| No interviewer panel | blockers BLK-MC10-06 | Operating model, training and kit; zero humans assigned/trained (D21–D26) |

## 10. Discrepancies recorded before proceeding

1. **No material deviation** from the previously verified baseline: branch, HEAD, remote HEAD, PR
   state, clean tree, 62/62 gate, 96/96 negative suite and all 12 freeze hashes match.
2. The MC-10 review's recorded line counts for the validator and test file are not used as evidence
   here; the actual files are longer than the line counts quoted in the review narrative
   (2,811 and 1,400 physical lines at `d1ac69a`). The functional baseline (62 checks, 96 tests) is
   what matters and matches.
3. `data/pricing-ladders.json` and `data/experiments.json` file byte hashes differ from their canonical
   freeze hashes; this is documented and expected, not corruption (see §6).
4. F-04, F-05, F-08, F-10 are informational residuals from MC-10. MC-10R addresses F-05 (registry) and
   F-10 (CR-62 breadth); it does not retroactively edit PR #16's reviewed commit or the MC-10 review.

## 11. Recovery scope

**In scope:** `docs/marea/customer-discovery/recovery/**`; the two new recovery scripts; the additive
CR-62 extension in the existing validator/test and an MC-10R addendum to the data contract; the
`docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 10 update and additive
`DECISION-LOG.md` entries; `package.json` recovery script entries and Prettier lists; Lead-owned
D1–D4 and D34–D36; the independent review D33.

**Out of scope:** any `src/`, `public/`, `deploy/`, product/bundle contract, price, route, i18n
dictionary, dependency or deployment change; any modification of PR #16's commits or base; any
change to MC-09 evidence; any change to MC-10 results or its BLOCKED verdict; any external contact,
spend, advertising, sale, publication or deployment; any advance to MC-11.

## 12. Binding truth preserved

Everything below remains binding for the whole recovery and is enforced by the recovery validator:

```
MC10_STATUS                  = BLOCKED
MC10_WAVE0_PREPARATION       = PASS_INTERNAL_SCOPE
AUTH_MC10_001                = NOT_GRANTED
OUTREACH_AUTHORIZATION       = NOT_GRANTED
FIELDWORK_STATUS             = BLOCKED
PARTICIPANTS                 = 0
INTERVIEWS_COMPLETED         = 0
VALID_ANALYTICAL_CASES       = 0
PRICE_RESPONSES              = 0
EXPERIMENTS_EXECUTED         = 0
PRODUCTS_TESTED              = 0
BUNDLES_TESTED               = 0
TRADEMARK_LEGAL_CLEARANCE    = NOT_GRANTED
SOURCE_IP_CLEARANCE          = NOT_CLEARED
PRODUCT_SALES                = BLOCKED
COMMERCIAL_PUBLICATION       = BLOCKED
PRODUCTION_DEPLOYMENT        = NOT_AUTHORIZED
PROFITABILITY                = NOT_ESTABLISHED
PILOT_SAFETY_GATE            = BLOCKED
COMPATIBILITY_TESTED         = NO
APPROVED_PRICES              = 0
ORDERABLE_PRODUCTS           = 0
```

## 13. Authorities read at baseline

`AGENTS.md`; `docs/marea/execution/AGENT-OPERATING-MODEL.md`; `HARNESS-SETUP.md`;
`MASTER-PROMPT-REGISTRY.md`; `DECISION-LOG.md` (D-029…D-033 tail); the MC-09 executive report,
portfolio prioritisation, customer-discovery plan, validation experiments and delivery/review; the
MC-10 authorization, scope, experiment-results, concept-comprehension and MC-11 handoff documents;
the research protocol, instrument versions and instrument freeze; the recruitment plan, data
contract, all governed `data/*.json`; the research-integrity validator and its negative suite.
