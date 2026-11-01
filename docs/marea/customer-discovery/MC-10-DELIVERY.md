# MC-10 — Delivery record

| Field | Value |
| --- | --- |
| Milestone | MC-10 of 36 — primary customer discovery, buyer recruitment and commercial positioning validation |
| Status | `BLOCKED — PRIMARY FIELDWORK NOT EXECUTED (OUTREACH AUTHORIZATION NOT GRANTED)` |
| Wave 0 preparation | Complete, machine-verified, independently audited |
| Base | MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Branch | `feature/marea-mc10-primary-customer-discovery` |
| PR | draft, stacked on `feature/marea-mc09-market-competitive-intelligence` (see §10) |
| Date | 2026-11-01 |

This delivery record is written to be falsifiable. It states what exists, what does not exist, which
commands were actually run and what the independent reviewer verified. The milestone is **BLOCKED**,
not PASS: no participant, interview, quote, observation or price response exists.

## 1. Verdict

| Question | Answer |
| --- | --- |
| Milestone status | `BLOCKED` for the primary-research scope |
| Reason | `AUTH-MC10-001 = NOT_GRANTED`: no external outreach authorization was issued |
| Fieldwork executed | `NO` — `NOT_EXECUTED` |
| Participants identified / contacted / interviewed | 0 / 0 / 0 |
| Interviews completed | 0 |
| Valid analytical cases | 0 |
| Price responses | 0 |
| Experiments executed | 0 of 10 (all `BLOCKED`) |
| Products tested | 0 of 9 (all `NOT_TESTED`) |
| Bundles tested | 0 of 6 (all `NOT_TESTED`) |
| Wave 0 preparation | Complete |
| Commercial restrictions changed | None |
| Price approved / product orderable | None / zero |

A `PASS — PRIMARY QUALITATIVE CUSTOMER DISCOVERY SCOPE` was not available and was not issued. The
acceptance criteria require real authorized fieldwork, real eligible participants, valid consent,
genuine records, coding, quality checks and an independent review; none of the fieldwork conditions
exists.

## 2. Baseline verification (before any change)

| Check | Result |
| --- | --- |
| Repository | `C:\Users\Admin\Documents\workspace\embarcarte` |
| Remote origin | `https://github.com/manuelxose/embarcarte.git` |
| Branch at start | `feature/marea-mc09-market-competitive-intelligence` |
| Local HEAD at start | `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3` |
| Remote MC-09 HEAD | identical (`git fetch` + `git rev-parse`) |
| Working tree | clean |
| PR #15 | OPEN, draft, base `feature/marea-mc08-bundles-commercial-architecture`, head `9d206cc2…`, MERGEABLE |
| MC-09 result | PASS, internal desk-research scope, review round 2 (8/8 findings closed) |
| Existing MC-10 work | none; registry row 10 was `PLANNED` |
| Toolchain | Node v24.18.0, npm 12.0.1 |
| Authorities read | `AGENTS.md`, `AGENT-OPERATING-MODEL.md`, `MASTER-PROMPT-REGISTRY.md`, `DECISION-LOG.md`, MC-09 research authority, product/bundle/brand contracts |

Branch policy: MC-09 is unmerged, so MC-10 was created from the verified MC-09 HEAD and the draft PR
targets the MC-09 branch.

## 3. The authorization gate

```
AUTH-MC10-001           = NOT_GRANTED
OUTREACH_AUTHORIZATION  = NOT_GRANTED
FIELDWORK_STATUS        = BLOCKED
```

`MC10-FIELDWORK-AUTHORIZATION.md` records every required authorization field as absent: no authorizer,
no date, no permitted participant categories, no permitted geography, no permitted contact method, zero
volume, no spending, no incentives, no fieldwork lead. `data/fieldwork-authorization.json` is the
machine-readable record, including the inference guard that the Master Prompt, the PR or a task
assignment do not constitute authorization.

No candidate was identified, no invitation was sent, no club/marina/association/installer/retailer was
contacted. No external contact occurred.

## 4. Team execution

| Member | Role | Deliverables |
| --- | --- | --- |
| `lead` | Research programme director; authorization control; integration; Git; final report | D1, D2, D16–D21, D26–D28, data contract additions, registry/decision log, gates |
| `agent-a-methodologist` | Research methodologist | D3, D4, D5, D11, `instruments.json` |
| `agent-b-recruitment` | Recruitment operations | D6, D7, outreach templates |
| `agent-c-owners` | Owner research specialist | D8, D15 |
| `agent-d-professionals` | Professional channel research | D9, D10 |
| `agent-e-pricing` | Pricing and behavioural economics | D12, D13, D14, `pricing-ladders.json` |
| `agent-f-data` | Research data steward / integrity engineer | D22, D23, D24, machine-readable data layer |
| `agent-g-auditor` | Independent research auditor | D25 (independent of all authors) |

Write scopes were exclusive per member; no two agents wrote the same file. The Lead re-inspected
`git status` and the full diff before committing. All members shared one checkout (no worktree
isolation), so integration was sequential.

## 5. Deliverables (D1–D28)

| ID | Deliverable | Path |
| --- | --- | --- |
| D1 | Research scope and baseline | `MC10-RESEARCH-SCOPE.md` |
| D2 | Fieldwork authorization register | `MC10-FIELDWORK-AUTHORIZATION.md` |
| D3 | Research ethics and data governance | `methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md` |
| D4 | Preregistered research protocol | `methodology/MC10-RESEARCH-PROTOCOL.md` |
| D5 | Instrument version register | `methodology/MC10-INSTRUMENT-VERSIONS.md` |
| D6 | Recruitment strategy and quotas | `recruitment/MC10-RECRUITMENT-PLAN.md` |
| D7 | Aggregate recruitment funnel | `recruitment/MC10-RECRUITMENT-RESULTS.md` |
| D8 | Owner research findings (framework; no data) | `owners/MC10-OWNER-DISCOVERY.md` |
| D9 | Installer findings (framework; no data) | `professionals/MC10-INSTALLER-DISCOVERY.md` |
| D10 | Marina, retail and B2B findings (framework; no data) | `professionals/MC10-CHANNEL-AND-FLEET-DISCOVERY.md` |
| D11 | Interview coding method and results (empty scaffold) | `methodology/MC10-QUALITATIVE-ANALYSIS.md` |
| D12 | Subscription research (design; no data) | `pricing/MC10-SUBSCRIPTION-ATTITUDES.md` |
| D13 | Gabor–Granger (frozen ladders; no data) | `pricing/MC10-GABOR-GRANGER.md` |
| D14 | Van Westendorp (design; no data) | `pricing/MC10-VAN-WESTENDORP.md` |
| D15 | Bundle comprehension (design; no data) | `MC10-CONCEPT-COMPREHENSION.md` |
| D16 | Actual buyer objections (taxonomy; 0 recorded) | `MC10-BUYER-OBJECTIONS.md` |
| D17 | Ten-experiment results (10/10 `BLOCKED`) | `MC10-EXPERIMENT-RESULTS.md` |
| D18 | Product evidence assessment (9/9 `NOT_TESTED`) | `MC10-PRODUCT-PRIMARY-EVIDENCE.md` |
| D19 | Bundle evidence assessment (6/6 `NOT_TESTED`) | `MC10-BUNDLE-PRIMARY-EVIDENCE.md` |
| D20 | Positioning revision proposals (unvalidated) | `MC10-POSITIONING-RECOMMENDATIONS.md` |
| D21 | Decision and risk register (D-029…D-033) | `MC10-DECISION-REGISTER.md` |
| D22 | Data contract and schema | `data-contract/MC10-DATA-CONTRACT.md` |
| D23 | Research integrity validator | `scripts/check-marea-customer-research.mjs` |
| D24 | Negative test suite | `scripts/check-marea-customer-research.test.mjs` |
| D25 | Independent review | `review/MC-10-REVIEW.md` (+ `review/review-findings.json`) |
| D26 | Spanish executive report | `MC10-EXECUTIVE-REPORT.md` |
| D27 | MC-11 decision handoff | `MC10-MC11-HANDOFF.md` |
| D28 | This delivery record | `MC-10-DELIVERY.md` |

Supporting records: `methodology/instruments.json` (instrument freeze), `recruitment/MC10-OUTREACH-TEMPLATES.md`
(16 unapproved ES/EN templates), `data/pricing-ladders.json` (frozen pre-registered ladders), `data/*.json`
(17-file machine-readable layer).

## 6. Research data and privacy

- Three layers: A (restricted operational), B (restricted research), C (repository aggregate). Only
  layer C exists; A/B are not provisioned and their absence is a recorded blocker.
- Repository contains aggregate counts only: `0` everywhere. No participant identity, contact detail,
  email, phone, transcript or audio exists in the repository.
- The validator scans for PII patterns, forbidden participant fields, and participant data in
  `src/`, `public/` and `deploy/`.
- Instruments are frozen at version 1.0.0 with the real SHA-256
  `cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` of the MC-09 discovery plan;
  Portuguese instruments are `NOT_PRODUCED`.
- Experiment thresholds are frozen by SHA-256 of the canonical MC-09 record; the validator recomputes
  them, so a silent post-hoc change fails the gate.

## 7. Commands and results

Executed on the working tree at the implementation commit, Windows 11, Node v24.18.0. The final
command/result table for the reviewed commit is repeated in §9 after the independent re-run.

| Command | Result |
| --- | --- |
| `node scripts/check-marea-customer-research.mjs` | pending independent re-run at the reviewed commit |
| `node --test scripts/check-marea-customer-research.test.mjs` | pending independent re-run at the reviewed commit |
| `npm run test:market` | PASS — 40/40 |
| `npm run test:products` | PASS — 52/52 |
| `npm run test:bundles` | PASS — 35/35 |
| `npm run test:brand` | PASS — 21/21 |
| `npm run build` | PASS (Angular SSR production build) |
| `git diff --check` | PASS — no whitespace errors |

All other gates are re-run by the independent reviewer and recorded in `review/MC-10-REVIEW.md`; this
table is completed with the reviewer's reproduced outputs and the Lead's final gate run.

## 8. Governance preserved

| Restriction | Status after MC-10 |
| --- | --- |
| Trademark legal clearance | `NOT_GRANTED` |
| Source IP clearance | `NOT_CLEARED` |
| Customer demand empirically validated | `NO` |
| Willingness to pay empirically validated | `NO` (`WTP_STATED_PREFERENCE_OBSERVED = false`) |
| Product profitability established | `NO` |
| Commercial publication | `BLOCKED` |
| Product sales | `BLOCKED` |
| Production deployment | `NOT_AUTHORIZED` |
| PILOT safety gate | `BLOCKED` |
| Compatibility rows tested | 0 |
| Approved prices | 0 |
| Orderable products | 0 |
| WATCH alert guarantee | not claimed |
| FLEET hardware included by default | false |
| Fixed SAIL/COMPLETE turnkey offer | not permitted |

No canonical product/bundle contract, public page, `src/`, `deploy/` or indexed URL was modified.

## 9. Independent review

`review/MC-10-REVIEW.md` — verdict recorded at the reviewed commit, plus machine-readable findings in
`review/review-findings.json`. The reviewer is independent of every MC-10 author, inspected the real
diff, re-ran the gates, recomputed the threshold hashes and adversarially probed the validator. The
review explicitly does not issue a primary-research PASS because no primary research was executed.

Final reviewer verdict and reproduced command output: see `review/MC-10-REVIEW.md`. Findings and their
closure are listed there and in `review/review-findings.json`.

## 10. Git and remote evidence

- Branch: `feature/marea-mc10-primary-customer-discovery`
- Base: MC-09 HEAD `9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3`
- Implementation commit and review-correction commit: recorded in the final delivery update
- Draft PR: stacked on `feature/marea-mc09-market-competitive-intelligence`, not merged
- No force-push, no merge, no tag, no deployment, no publication, no sale, no outreach, no spend

## 11. Handoff to MC-11

`MC10-MC11-HANDOFF.md` transfers **no customer evidence**. It lists the customer questions that remain
unanswered (CQ-01…CQ-10), the hardware questions that are open regardless of customer input
(HW-01…HW-10), the supplier questions (SUP-01…SUP-08) and the conformity/legal questions (CON-01…CON-10).
MC-11 requires its own Master Prompt and must carry the blocked-fieldwork dependency explicitly.

## 12. Honesty statement

No participant was invented. No interview, quotation, observation, purchase record, objection or price
response was fabricated. No simulated dialogue was labelled as evidence. The ten experiments are
`NOT_EXECUTED`; the nine families and six bundles are `NOT_TESTED`; the milestone is `BLOCKED`. The
preparation package is real and machine-verified; the customer research is not, because it was not
authorized.
