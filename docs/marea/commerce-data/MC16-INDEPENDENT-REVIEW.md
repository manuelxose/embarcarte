# MC-16 — Independent review (D21)

| Field | Value |
|---|---|
| Milestone | MC-16 / 36 |
| Scope | Isolated internal commerce data contract; no public activation |
| Review type | Final independent audit, evidence-based, non-authoring |
| Reviewed commit | `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e` (`ee4f5d2`, HEAD) |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` (MC-15 delivery) |
| Correction range | `4e67ae2..ee4f5d2`, 4 commits, 22 files, +399 / -67 |
| Full range | `99212a4..ee4f5d2`, 51 files, +17,907 / -3 |
| Fix commit under review | `ee4f5d2` — 2 files, +44 / -8 (LF-normalised D14 hash table, merchant-SKU evidence regression test) |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Auditor | `independent-auditor-final` (did not author the implementation) |
| Verdict | **PASS_INTERNAL_COMMERCE_DATA_SCOPE** — no open BLOCKING/MAJOR defect; 1 open MINOR, 1 open INFORMATIONAL, 1 inherited INFORMATIONAL |
| Commercial effect | None: no merge, deploy, publication, indexation, sale, billing, entitlement, price, stock or MC-17 authorization |

## 1. Method and scope

This audit examined the real commits and diffs, never the delivery summary: the full
`99212a4..HEAD` diff, the `4e67ae2..HEAD` correction diff, the `ee4f5d2` fix commit,
`domain.ts`, `schema.ts`, the validator, the three test scripts, all 21 datasets and
D01–D20. It re-ran every required gate and added two independent probes that do not use
the committed fixtures: a recomputation of the eight legacy file hashes over raw and
LF-normalised bytes, and a disposable SQLite database that exercises the approved-price
trigger field by field.

The working tree carried pre-existing uncommitted drafts of this D21 record and
`data/review-findings.json` from the preceding audit of `981c53f`; both are superseded by
this record. No implementation, dataset, schema, test, route or git state was modified.
The temporary probe script and database were deleted before handoff.

## 2. Commands actually run

| Command | Exit | Observed result |
|---|---:|---|
| `git status --short` | 0 | Only the two authorised D21 record files were modified (pre-existing drafts); no code, schema, test, route or other dataset change. |
| `git diff --check` | 0 | No whitespace or conflict errors (before and after this record). |
| `npx tsc -p tsconfig.app.json --noEmit` | 0 | Clean type-check (TypeScript 5.9.3); no TS2448/TS2454. |
| `npm run build` | 0 | `Application bundle generation complete. [18.233 seconds]`; `Prerendered 96 static routes`; only the four pre-existing CommonJS optimisation warnings. |
| `npm run test:commerce-data` | 0 | `MC-16 commerce data: 1730/1730 checks passed`; `files: 21; families: 9; editions: 26; bundles: 6; routes: 23; gates: 13; approved prices: 0; merchant SKUs: 0; verified inventory: 0`. |
| `npm run test:commerce-data:unit` | 0 | `tests 74`, `pass 74`, `fail 0`, `cancelled 0`, `skipped 0`, `todo 0`; the new merchant-SKU evidence test passes. |
| `npm run test:financial` | 1 | `77 checks - 76 PASS / 1 FAIL`; only `V-18 - No MC-14 execution` (inherited; §9). |

The previous build-breaking defect is gone: `evidenceById` is declared at
`src/server/marea-commerce/domain.ts:683`, before the merchant-SKU block that uses it at
lines 693–697. Type-check and SSR/prerender build both exit 0.

## 3. Commit identity

- `HEAD` is `ee4f5d20bb0613b6a0e3eaff600b93047cd8ea3e`, parent `981c53f`, on the MC-16
  feature branch; the MC-15 base is `99212a4`.
- The correction range contains four commits: `0a30a62` (evidence usability, publication
  guard, validator integrity), `c9ef80e` (residual findings and hash normalisation),
  `981c53f` (build ordering, price trigger, assertions) and `ee4f5d2` (D14 hashes,
  merchant-SKU regression test).
- `ee4f5d2` changes only `docs/marea/commerce-data/MC16-LEGACY-COMMERCE-COMPATIBILITY.md`
  and `scripts/check-marea-commerce-data.test.mjs`. It ships no dependency, route, public
  file or production-data change.

## 4. Identity, truthfulness and isolation counts

| Claim | Verified |
|---|---|
| Families | 9 (`NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET`), all `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY` |
| Editions | 26, all `merchantable=false`, `priceApproved=false`, `merchantSkuCode=null`, `NOT_FOR_SALE` |
| SKU candidates | 26 `CANDIDATE_ONLY_NOT_MERCHANTABLE`; `merchantSkuCodesEstablished=0` |
| Bundles | 6 (`START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET`), all `NOT_FOR_SALE`, not orderable |
| Proposed routes | 23; 0 published, 0 indexable; no Product/Offer JSON-LD |
| Release gates | 13 open (`12 BLOCKED`, `1 EVIDENCE_REQUIRED`), 0 `CLOSED_VERIFIED` |
| Prices | 26 records; 0 approved, 0 effective, 0 public, 0 checkout; 13 hypothesis, 12 not established, 1 not applicable |
| Inventory | 0 items, 0 movements; `verifiedMareaStock=NONE`; quantities `null` |
| Subscriptions / grants | 13 plans all `DEFINED_NOT_ACTIVE` with `checkoutAllowed=false`/`autoRenew=false`; 0 real subscriptions, 0 entitlement grants |
| Required documents / findings | 24 unexecuted documents; 34 open website findings; 0/10 MC-16 preconditions met; 6 inherited-debt entries |
| Manifest | 21/21 files; every count reconciles with the datasets; `mc17Started=false`, `productionMigrationExecuted=false` |
| Public import | 0 hits for `marea-commerce`, `evaluatePurchasability`, `MC16_POLICY_VERSION` or the commerce scripts across the 88 `src` scripts outside `src/server/marea-commerce/`; validator `ISO-001` also passes |

## 5. Closure of the five prior findings

**(a) `evidenceById` hoisted and merchant-SKU evidence path covered — CLOSED.**
`domain.ts:683` declares the map before the block at lines 692–697. `npx tsc` and
`npm run build` exit 0. `scripts/check-marea-commerce-data.test.mjs` now contains
`merchant SKU approval evidence is resolved and missing evidence denies` (added by
`ee4f5d2`): it evaluates a non-null `ACTIVE` merchant SKU whose `approvalEvidenceIds`
resolve to usable `VERIFIED_EXTERNAL` evidence (no exception, no
`MERCHANT_SKU_APPROVAL_EVIDENCE_INVALID`) and a second context whose id is absent
(`allowed=false`, `MERCHANT_SKU_APPROVAL_EVIDENCE_INVALID`,
`missingEvidenceIds=["EV-MISSING"]`). The 74/74 unit run proves it executes and passes.

**(b) Approved-price immutability trigger — PARTIALLY CLOSED (open MINOR).**
`trg_marea_approved_price_immutable` now blocks `status`, `amount_minor`, `currency`,
`territory`, `channel`, `vat_basis`, `includes_vat`, `effective_from`, `approved_by` and
`approved_by_role`, and the companion trigger blocks deletion of the approval evidence
link. It does **not** cover `edition_id`, `effective_to` or `approval_evidence_ids_json`,
contrary to the expected closure statement. The disposable-DB probe confirms the gap:
while the row is `APPROVED / 199900`, `UPDATE edition_id='ed-2'`, `UPDATE effective_to`
and `UPDATE approval_evidence_ids_json='["ev-other"]'` all succeed; `UPDATE
status='REVOKED'`, `UPDATE amount_minor`, `UPDATE effective_from`, `UPDATE approved_by`
and the evidence `DELETE` abort. This is recorded as `MC16-FINAL-02`, MINOR and latent
because 0 prices are approved and the schema has no public or production path.

**(c) D14 normalised hashes — CLOSED.** All eight table values in
`MC16-LEGACY-COMMERCE-COMPATIBILITY.md:33-40` equal the mapping
(`data/legacy-commerce-mapping.json`) and independently recompute over LF-normalised
content (8/8); raw-byte matches are 0/8. No stale raw-byte hash remains in any D01–D20
document.

**(d) D20 rows 23/33 — CLOSED.** Row 23 (`Invalid transition skips a required gate`) is
`LIF-007`; row 33 (`Unknown bundle component edition`) is `BND-009`. `ADV-23` asserts
`LIF-007` and `ADV-33` asserts `BND-009`, and both pass in the unit run.

**(e) D19 blocker description — CLOSED.** D19:42 now reads "Gate and precondition arrays
plus inherited summary counters (documents/findings) | 13 gates / 10 preconditions;
24 docs / 34 findings counters", which matches `blocker-register.json`: `gates[]` (13,
12 `BLOCKED` + 1 `EVIDENCE_REQUIRED`), `preconditions[]` (10), `inheritedDebt[]` (6),
`summary.requiredDocumentsUnexecuted=24`, `summary.websiteFindingsOpen=34`, and no
`documents[]`/`findings[]` arrays.

## 6. Independent probe evidence

| Probe | Result |
|---|---|
| Legacy hash recomputation | 8/8 LF-normalised SHA-256 equal both the D14 table and `legacy-commerce-mapping.json`; 0/8 raw-byte hashes match; all eight files currently contain CRLF bytes |
| Approved-price status flip | BLOCKED — `MC16_APPROVED_PRICE_IMMUTABLE` |
| Approved-price amount change | BLOCKED — `MC16_APPROVED_PRICE_IMMUTABLE` |
| Approved-price `effective_from` | BLOCKED — `MC16_APPROVED_PRICE_IMMUTABLE` |
| Approved-price approver change | BLOCKED — `MC16_APPROVED_PRICE_IMMUTABLE` |
| Approval-evidence link delete | BLOCKED — `MC16_APPROVED_PRICE_EVIDENCE_IMMUTABLE` |
| Approved-price `edition_id` re-bind | **ALLOWED** (`ed-1` → `ed-2`) |
| Approved-price `effective_to` | **ALLOWED** (expiry set after approval) |
| Approved-price `approval_evidence_ids_json` | **ALLOWED** (evidence swapped) |
| Dataset counts | 9 / 26 / 6 / 23 / 13; 0 approved prices; 0 merchant SKUs; 0 inventory items; 0 grants; 0 published routes |
| Import scan | 0 hits across 88 public `src` scripts outside `src/server/marea-commerce/` |

## 7. Findings

| ID | Severity | File | Summary | Status |
|---|---|---|---|---|
| MC16-FINAL-01 | BLOCKING | `src/server/marea-commerce/domain.ts` | `evidenceById` used before declaration; build failed TS2448/TS2454 and merchant-SKU evidence threw `ReferenceError` | **CLOSED** in `981c53f`; regression test added in `ee4f5d2`; tsc/build/74 tests pass |
| MC16-FINAL-02 | MINOR | `src/server/marea-commerce/schema.ts` | Approved-price immutability omits `edition_id`, `effective_to` and `approval_evidence_ids_json`, so an approved price can be re-bound, extended or evidence-swapped | **OPEN_FOLLOW_UP** (latent: 0 approved prices) |
| MC16-FINAL-03 | MINOR | `docs/marea/commerce-data/MC16-DETERMINISTIC-VALIDATION-AND-ADVERSARIAL-TESTS.md` | Adversarial matrix rows 23/33 did not match the executed ADV-23/ADV-33 rules | **CLOSED** in `981c53f` — rows now `LIF-007` / `BND-009` |
| MC16-FINAL-04 | MINOR | `docs/marea/commerce-data/MC16-LEGACY-COMMERCE-COMPATIBILITY.md` | Documented legacy hashes were raw-byte values, not the LF-normalised mapping | **CLOSED** in `ee4f5d2` — 8/8 normalised, 0/8 raw |
| MC16-FINAL-05 | INFORMATIONAL | `docs/marea/commerce-data/MC16-MACHINE-READABLE-DATASETS.md` | Blocker-register description overstated the file structure | **CLOSED** in `981c53f` — matches gate/precondition arrays plus summary counters |
| MC16-FINAL-06 | INFORMATIONAL | `scripts/check-marea-financial-model.mjs` | V-18 inherited financial gate failure, unrelated to MC-16 | **INHERITED_OPEN** |
| MC16-FINAL-07 | INFORMATIONAL | `scripts/check-marea-commerce-data.test.mjs` | Price edition binding had no regression test | **CLOSED** in `981c53f` — `PRICE_EDITION_MISMATCH` assertion passes |
| MC16-FINAL-08 | MINOR | `scripts/check-marea-commerce-data.test.mjs` | The repaired merchant-SKU evidence path had no committed regression test | **CLOSED** in `ee4f5d2` — valid/missing evidence test added and passing |
| MC16-FINAL-09 | INFORMATIONAL | `docs/marea/commerce-data/MC16-DETERMINISTIC-VALIDATION-AND-ADVERSARIAL-TESTS.md` | §2's unit-test coverage list was not updated when `ee4f5d2` added the merchant-SKU evidence test; the suite is correct but D20 does not mention the new case | **OPEN_DOC** (non-blocking) |

Residual detail:

- **FINAL-02.** Probe result on a disposable database after approval:
  `UPDATE edition_id` → allowed (`ed-1`→`ed-2`), `UPDATE effective_to` → allowed,
  `UPDATE approval_evidence_ids_json` → allowed; the row ends as
  `APPROVED / 199900`, bound to `ed-2`, with `["ev-other"]`. The status flip, amount,
  `effective_from`, approver and evidence-delete guards all work. This becomes material
  only if an approved price is created before the trigger is extended.
- **FINAL-09.** D20:35-55 enumerates the unit suite but omits "merchant SKU approval
  evidence"; D20:103-110 correctly covers the persistence and edition-mismatch additions.
  A reader could conclude the evidence path is still untested.

No other BLOCKING or MAJOR defect was found.

## 8. Documentation D01–D20

- D14 is now correct and self-consistent: the table, prose and command describe
  LF-normalised SHA-256, and the values reproduce the frozen mapping.
- D01 (lines 72 and 230) correctly states the LF-normalised rule and defers to D14.
- D20 rows 23/33 match the executed suite; §5 correctly classifies V-18 as inherited.
- D19's blocker-register row matches the actual JSON keys and counts.
- No document claims purchasability, an approved price, verified stock, a published or
  indexable route, a closed gate or MC-17 execution.

## 9. V-18 inheritance

`npm run test:financial` exits 1 with 76/77 checks; the only failure is
`V-18 — No MC-14 execution` ("registry row 14 is not PLANNED"). It predates MC-16 (MC-13
`7dfb56d`), the MC-16 diff touches no financial script, engine or registry file, and
`blocker-register.json` records it as `INHERITED_VALIDATOR_STATE_DEBT`, OPEN. It does not
block the MC-16 internal-data scope and must not be "fixed" by rewriting frozen MC-13/MC-14
financial data from MC-16.

## 10. Verdict

**PASS_INTERNAL_COMMERCE_DATA_SCOPE.** The audited commit builds, type-checks and passes
the MC-16 data (1730/1730) and unit (74/74) gates; the previously BLOCKING ordering defect
is fixed and the merchant-SKU evidence path now has a passing regression test. The
identity and truthfulness zeros are correct, all 13 release gates remain open, the
datasets reconcile with the manifest, and the module stays isolated from the public
server. One MINOR (approved-price trigger field coverage) and two informational residuals
(D20 coverage list; inherited V-18) remain; no open BLOCKING or MAJOR defect exists, and
none of the residuals creates a commercial capability.

## 11. Next action

Before any MC-17 activation: extend `trg_marea_approved_price_immutable` (or add a
companion trigger) to block `edition_id`, `effective_to`, `approval_evidence_ids_json`
and other approval-scoped fields on an `APPROVED` price, and add the corresponding
persistence assertion. Update D20 §2 to list the merchant-SKU evidence test. V-18 stays
with the MC-13/MC-14 financial-model owner.

This review authorizes no merge, deploy, publication, indexation, sale, price, stock,
entitlement or MC-17 work; merge remains the programme Lead's decision.

## 12. Limitations

No external evidence, supplier, certifier, payment provider, production database or
public route was exercised, and none exists. Large datasets were checked through the full
1730-check validator plus independent structural extraction, not line-by-line prose. Docs
were checked for material contradictions and for the specific claims under review, not for
every line reference. The trigger probe used synthetic rows on a disposable database; it
does not create or approve any real price.
