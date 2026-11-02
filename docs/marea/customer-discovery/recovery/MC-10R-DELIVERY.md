# MC-10R — Delivery record (D35)

| Field | Value |
| --- | --- |
| Document ID | MC-10R / D35 / `MC-10R-DELIVERY` |
| Programme | EMBARCARTE / MAREA |
| Milestone | MC-10R — recovery sub-stage of MC-10 (programme milestone count remains 36) |
| Date | 2026-11-01 |
| Status | `DELIVERED` — final delivery record; remote branch and PR evidence completed in §7 after push |
| Owner | `lead` |
| Branch | `feature/marea-mc10r-fieldwork-recovery` |
| Base commit | `d1ac69a4873222fbde93dcf69c360a5e0ca1542d` (verified MC-10 HEAD) |
| Implementation commit | `b0a8c1229d860514988d5c9a8958f82e179a899f` |
| Audit-correction commit | `ea80ea5927fa5b0df376bbbe71567ad8d86a3853` |
| Delivery commit | The commit that introduces this record (branch HEAD after the delivery commit) |
| Reviewed commit | `ea80ea5927fa5b0df376bbbe71567ad8d86a3853` — independently re-verified by D33 |
| Stacked PR | Draft PR against `feature/marea-mc10-primary-customer-discovery`; URL and PR metadata recorded in the final registry-update commit and in §7 |
| Recovery verdict | `PASS — INTERNAL PREPARATION SCOPE` (D33), no blocking/major finding open |
| MC-10 primary research | `BLOCKED / NOT_EXECUTED` |
| Authorization | `AUTH-MC10-001 = NOT_GRANTED` |
| Fieldwork | `FIELDWORK_STATUS = BLOCKED`; `FIELDWORK_READINESS = PARTIALLY_READY` |

> **Banner.** This delivery record reports the internal recovery preparation. It is not a
> primary-research PASS, not legal sign-off, not authorization, not a provisioned store and not a
> trained interviewer. No participant was contacted and no interview occurred.

## 1. What was delivered

MC-10R removes the internal planning, governance, instrument, infrastructure and operational defects
that prevented legitimate MC-10 fieldwork from being executable once a real authorization exists. It
does not manufacture that authorization.

| Block | Deliverables | Result |
| --- | --- | --- |
| Baseline and governance | D1 baseline and scope, D2 execution plan with canonical registration, D3 blocker register, D4 decision register | Baseline verified by command; 12 freeze hashes recomputed; scope and blockers recorded |
| Planning corrections | D5 PI-01 sampling reconciliation, D6 PI-02 segment-quota contract, D7 PI-03 pricing feasibility, D8 protocol amendment | 37/57 authoritative; 40–80 preserved as historical aspiration; staged waves; pricing `n>=8` retained and unreachable cells classified |
| Instrument corrections | D9 IV-01…IV-09 amendment package, D10 version register, D11 ES/EN candidate source, D12 PT review package | Nine dated amendments, candidate v1.1.0 `REVIEW_REQUIRED`; v1.0.0 and its SHA-256 retained; no translation claimed reviewed |
| Authorization and privacy | D13 AUTH-MC10-001 rev 2 draft, D14 authorization gate, D15 legal-review package, D16 privacy/consent package | 30 numbered fields / 31 flat keys, `DRAFT_PREPARED` / `NOT_GRANTED`; fail-closed gate; `DRAFT_FOR_LEGAL_REVIEW` materials |
| Secure infrastructure | D17 architecture, D18 data contract, D19 access/retention/deletion, D20 implementation evidence, D27-D30 recovery records | `ARCHITECTURE_DEFINED` + `LOCAL_SYNTHETIC_TESTS_PASS`; `PROVISIONED`/`ACCESS_REVIEWED`/`OPERATIONALLY_APPROVED` false |
| Human fieldwork operations | D21 operating model, D22 training, D23 operations kit, D24 ES/EN templates, D25 Wave 1 plan, D26 checklist | Roles `UNASSIGNED`, interviewers `UNTRAINED`, templates `NOT_APPROVED`/`NOT_SENT`, zero sessions |
| Automated validation | D31 recovery gate, D32 adversarial suite, additive CR-62 extension, package.json scripts | 32 CRR checks and 82 adversarial tests; research gate preserved at 62 checks with 111 tests |
| Audit and handoff | D33 independent review, D34 Spanish executive report, D35 delivery record, D36 authorized-fieldwork handoff | PASS for the internal preparation scope only; handoff complete |

The full machine-readable inventory is in `data/mc10r-recovery.contract.json` (`deliverables`, D1-D36
with canonical paths and owners).

## 2. Real test evidence (final integrated tree)

| Command | Real result |
| --- | --- |
| `node scripts/check-marea-customer-research.mjs` | `62/62 checks passed`, exit 0 |
| `node --test scripts/check-marea-customer-research.test.mjs` | 111 tests, 111 pass, 0 fail (the original 96 preserved + 15 MC-10R CR-62 tests) |
| `node scripts/check-marea-customer-recovery.mjs` | `32/32 checks passed`, exit 0 |
| `node --test scripts/check-marea-customer-recovery.test.mjs` | 82 tests, 82 pass, 0 fail (74 initial + 8 audit-correction cases) |
| `npm run test:market` / `test:market:unit` | 40/40 checks; 43/43 tests |
| `npm run test:products` / `test:products:unit` | 52/52 checks; 106/106 tests |
| `npm run test:bundles` / `test:bundles:unit` | 35/35 checks; 60/60 tests |
| `npm run test:brand` / `test:brand:unit` | 21/21 checks; 13/13 tests |
| `npm run test:i18n` / `test:commerce` / `test:seo` / `test:backup` | PASS; SEO 101 sitemap URLs |
| `npm run build` | PASS (Angular SSR/prerender build) |
| `npm run test:e2e` | 15/15 Playwright tests passed |
| `npm run format:check` | All matched files use Prettier code style |
| `npm audit --omit=dev --audit-level=high` | 0 vulnerabilities |
| `git diff --check` | no whitespace errors |

Freeze integrity: the ten experiment threshold hashes, the pricing-ladder `constructs` self-freeze
`bfa09ebc904a66ba65961864d5e026638e3756a41a0611f0c3fdf1e83bb5be8c` and the instrument-source hash
`cbe7f9fe4634c44a7344a4b9817827368a284efdcfb4ec8e80e11252ba1a120d` all recompute unchanged. The
independent auditor reproduced them again at `ea80ea5`.

## 3. Independent review

`review/MC-10R-REVIEW.md` (D33) reviewed `b0a8c12` and re-audited the corrective commit `ea80ea5`:

- Initial verdict: `PARTIAL` — one MAJOR (CRR-25 string-typed branches were dead code) and three MINOR
  findings (stale field-count language; D1 freeze-recipe description; recovery-gate heuristics narrower
  than CR-62), plus two informational residuals.
- All five non-informational findings are **CLOSED** with re-verification evidence at `ea80ea5`
  (MC10R-F01…F05). MC10R-F06 (offline-unverifiable remote/PR state) remains an external limitation that
  this delivery record closes by recording the pushed branch and PR metadata in §7.
- Final verdict: **PASS — for the internal preparation scope only.** The auditor explicitly refuses a
  primary-research PASS, a customer-validation PASS and any legal sign-off.

## 4. Scope containment

The change set against `d1ac69a` is limited to: `docs/marea/customer-discovery/recovery/**` (D1-D36),
`scripts/check-marea-customer-recovery.mjs` and its test, additive changes to
`scripts/check-marea-customer-research.mjs` and its test, an additive MC-10R addendum to
`docs/marea/customer-discovery/data-contract/MC10-DATA-CONTRACT.md`, `package.json` (two npm scripts and
the Prettier lists), and additive entries in `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` and
`docs/marea/execution/DECISION-LOG.md`. No `src/`, `public/`, `deploy/`, product/bundle contract, price,
indexed route, i18n dictionary, dependency or deployment change. PR #16 is untouched.

## 5. Prohibitions observed

No external contact of any kind; no participant, candidate or contact data collected or stored; no
invented participant, quotation, interview, authorizer, controller, privacy contact, legal opinion,
interviewer, training completion, appointment, store, deployment, price approval or research result; no
incentive, spending, advertising or payment; no sale, publication, pre-order or public commercial claim;
no merge, force-push or deployment; no MC-11 advance and no milestone renumbering. No threshold, quota,
consent requirement or commercial restriction was weakened.

## 6. Residual limitations and risks

1. Every external approval (authorization, controller, privacy contact, legal review, participant
   information, store provisioning, access review, operational approval, interviewer appointment and
   training, instrument/sampling approvals, channels, fieldwork period) is still missing; see D36 §3.
2. The secure store exists only as architecture and synthetic tests; encryption-at-rest, backup/restore,
   audit-log and export controls are `NOT_EXECUTED` against a real service.
3. CR-62 and the recovery-gate narrative scans are deterministic heuristics with documented lexical
   limits; they do not prove the absence of fabricated evidence, and human independent review remains
   mandatory.
4. Candidate instrument hashes are candidate-source hashes, not effective freezes; any edit to D11
   requires re-issuing D9/D10 before approval.
5. The 40–80 sampling figure cannot be reached under the preserved quota maxima; moving to it requires
   an approved quota-expansion amendment.
6. The independent audit could not verify remote/PR state offline; §7 records the Lead's post-push
   verification.

## 7. Remote verification (post-push)

Verified with `git ls-remote` and `gh pr view` after pushing the branch and opening the stacked draft
PR. This closes MC10R-F06 (the offline-unverifiable remote/PR limitation) with real remote evidence:

- **Remote branch:** `origin/feature/marea-mc10r-fieldwork-recovery` exists; at the delivery push its
  head equalled local HEAD `7361f83ce9dad759855f9c63516879e0ed5ae02e`. The final evidence commit (this
  registry/PR update) is pushed on top and its hash is the head commit published on the PR.
- **Stacked draft PR:** [#17](https://github.com/manuelxose/embarcarte/pull/17) — title "MC-10R:
  fieldwork recovery, ungranted AUTH rev2 and dual research-integrity gates (fieldwork BLOCKED)",
  state `OPEN`, `isDraft = true`, base `feature/marea-mc10-primary-customer-discovery`, head
  `feature/marea-mc10r-fieldwork-recovery`, `mergeable = MERGEABLE`, `mergedAt = null`.
- **PR #16 untouched:** `OPEN`, draft, base `feature/marea-mc09-market-competitive-intelligence`, head
  `d1ac69a4873222fbde93dcf69c360a5e0ca1542d`, not merged.
- **No merge, force-push or deployment occurred.** No CI/check state is claimed beyond what GitHub
  reports; the deterministic gates were executed locally and independently reproduced by the auditor.

## 8. Verdict separation

- **MC-10R internal recovery:** `PASS — INTERNAL PREPARATION SCOPE`.
- **MC-10 primary real research:** `BLOCKED / NOT_EXECUTED` — zero participants, zero interviews, zero
  price responses, zero experiments executed, nine products and six bundles untested,
  `AUTH-MC10-001 = NOT_GRANTED`, no customer demand or willingness-to-pay validation, nothing for sale.
