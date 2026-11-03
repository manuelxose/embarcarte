# MC-17 D18 — Risks and unresolved gaps

| Field | Value |
|---|---|
| Deliverable | D18 `MC17-RISKS-AND-UNRESOLVED-GAPS.md` |
| Milestone | MC-17/36 — MAREA internal design system |
| Date | 2026-11-03 |
| Owner | programme-docs |
| Status | `INTERNAL_PROPOSED` — risk disclosure, not a sign-off |
| `MC16_VERDICT` | `PARTIAL` (unchanged) |
| `MC18_STARTED` | `false` |
| Publication / deployment | NOT AUTHORIZED / NOT PERFORMED |

## 1. How to read this document

Every entry below is either inherited from an earlier milestone or specific to MC-17. No
entry is repaired here. Responsibilities are recorded as governance roles already named in
the programme (MC-15 handoff §17 and MC-16 registers); where no role is assigned, that is
stated rather than invented.

No risk is closed by a document, a test pass, a build or this milestone. A closure condition
is stated for each item so a future independent reviewer can check it.

## 2. Inherited risks

### 2.1 MC16-FINAL-02 — approved-price trigger field coverage

| Field | Value |
|---|---|
| Source | MC-16 independent review, `docs/marea/commerce-data/MC16-INDEPENDENT-REVIEW.md` |
| Severity | MINOR |
| Location | `src/server/marea-commerce/schema.ts` (`trg_marea_approved_price_immutable`) |
| Status | `OPEN_UNTIL_REVERIFIED` (MC-16 review records it as `OPEN_FOLLOW_UP`; latent: 0 approved prices) |

**What happened.** The trigger blocks `status`, `amount_minor`, `currency`, `territory`,
`channel`, `vat_basis`, `includes_vat`, `effective_from`, `approved_by` and
`approved_by_role`, and a companion trigger blocks deletion of the approval-evidence link.
It does **not** cover `edition_id`, `effective_to` or `approval_evidence_ids_json`.

The MC-16 auditor reproduced the gap on a disposable database: after approval, an
`UPDATE edition_id='ed-2'`, an `UPDATE effective_to` and an
`UPDATE approval_evidence_ids_json='["ev-other"]'` all succeeded; the status flip, amount,
`effective_from`, approver and evidence-delete guards all aborted.

**Impact.** An approved price could be re-bound to another edition, extended in time or
have its evidence swapped without crossing the immutability guard. Material only if an
approved price is ever created before the trigger is extended. MC-17 displays no price, so
the presentation layer cannot trigger it.

**Mitigation.** Do not create, approve or migrate any real price before this is fixed.
MC-17 keeps `priceVisible = false` and accepts only an opaque price-status string.

**Owner.** MC-16 commerce-data/schema owner (programme lead to assign).

**Closure condition.** The trigger (or a companion trigger) blocks `edition_id`,
`effective_to`, `approval_evidence_ids_json` and any other approval-scoped field on an
`APPROVED` price; a persistence assertion reproduces the auditor's three probes and they
abort; an independent reviewer re-runs it on a disposable database.

**Rule.** Price approval must not happen before this hardening. **0 approved prices** is the
only safe state today.

### 2.2 MC16-FINAL-09 — outdated unit-test coverage list

| Field | Value |
|---|---|
| Source | MC-16 independent review |
| Severity | INFORMATIONAL |
| Location | `docs/marea/commerce-data/MC16-DETERMINISTIC-VALIDATION-AND-ADVERSARIAL-TESTS.md` §2 |
| Status | `OPEN_DOC` (non-blocking) |

**What happened.** The `ee4f5d2` commit added the merchant-SKU evidence regression test, but
the document's §2 coverage list was not updated. The suite is correct; the document omits
the new case.

**Impact.** A reader could conclude the merchant-SKU evidence path is still untested. No
runtime or commercial effect.

**Mitigation.** MC-17 does not rely on that document's list. The actual test is
`merchant SKU approval evidence is resolved and missing evidence denies` in
`scripts/check-marea-commerce-data.test.mjs`.

**Owner.** MC-16 documentation owner.

**Closure condition.** D20 §2 lists the merchant-SKU evidence test; the doc and the suite
agree.

### 2.3 Financial V-18 — inherited validator state debt

| Field | Value |
|---|---|
| Source | MC-13, recorded in MC-16 |
| Severity | INFORMATIONAL (blocking only for the financial gate) |
| Location | `scripts/check-marea-financial-model.mjs` |
| Status | `INHERITED_OPEN` |

**What happened.** `npm run test:financial` exits 1 with 76/77 checks. The only failure is
`V-18 — No MC-14 execution - registry row 14 is not PLANNED`. The validator still expects
MC-14 to be `PLANNED`, while programme history records MC-14 as executed (`PARTIAL`). The
MC-16 diff touched no financial script, engine or registry file.

**Impact.** The financial gate is red for a stale expectation, not for a financial
regression. It can mask a real failure in future runs if the red state is normalised.

**Mitigation.** Keep the failure visible and attributed. Do not "fix" it by rewriting frozen
MC-13/MC-14 history or by changing the registry row to satisfy a stale assertion.

**Owner.** MC-13/MC-14 financial-model owner.

**Closure condition.** The validator and the historical registry are reconciled with an
explicit, reviewed decision that preserves the MC-14 `PARTIAL` record; `test:financial`
returns 77/77.

### 2.4 MC-13 residual debt F-05, F-11, F-14

| ID | Severity | What remains open | Impact | Mitigation | Owner | Closure condition |
|---|---|---|---|---|---|---|
| F-05 | MINOR | Financial data contract A-15 still says `- paymentFees`; A-13…A-23 ids misaligned | Contract labels can mislead a reader about fee treatment and id mapping | Do not cite A-15/A-13…A-23 as current fee or id evidence; flag on reuse | MC-13 financial-model owner | A-15 and the id range corrected and re-verified against the JSON |
| F-11 | MINOR | Average-value field is a static base-case figure across 24 cases; D13 ST-17 wording conflicts with the JSON | The average looks case-sensitive when it is not; a reader may over-trust it | Treat the average as base-case only; do not present it as a sensitivity result | MC-13 financial-model owner | Field computed or explicitly labelled static; D13 ST-17 and JSON agree |
| F-14 | INFORMATIONAL | CI does not run the financial gate; accepted risk disclosed in D21 §8 | V-18-style failures can go unnoticed between manual runs | Keep manual financial-gate runs recorded; do not assume CI covers it | Programme lead / CI owner | Financial gate wired into CI or a documented manual cadence is enforced |

MC-17 does not edit any MC-13 file. These items are carried, not repaired.

### 2.5 MC-15 GSC-01 and GSC-02

| ID | Severity | What remains open | Impact | Mitigation | Owner | Closure condition |
|---|---|---|---|---|---|---|
| GSC-01 | MAJOR (pre-existing) | `/traslados` is public, indexable, self-canonical and in the sitemap but Search Console reports "not recognized / discovered, not indexed" | A real public URL may not be indexed as intended; the search contract is not fully verified | Treat indexation as `SEARCH_CONSOLE_VERIFIED_PARTIAL`; do not claim the URL is indexed | COMMERCIAL_DIRECTOR (website owner) with Search Console operator | Screenshot/export evidence that `/traslados` is indexed or an approved, evidenced disposition |
| GSC-02 | MINOR | Home URL submitted as a sitemap reports 1 error; `sitemap.xml` itself is valid and error-free | A misleading Search Console sitemap entry can obscure real sitemap signals | Rely on `sitemap.xml` validity evidence, not the URL-as-sitemap submission | COMMERCIAL_DIRECTOR (website owner) | Sitemap submission corrected/withdrawn and verified error-free |

The MC-15 indexation state remains `SEARCH_CONSOLE_VERIFIED_PARTIAL`: 16 indexed, 2 noindex,
5 not recognized and 1 public/indexable URL not indexed in a 24-URL sample. MC-17 changes
none of this and publishes no route.

## 3. MC-17-specific gaps

| # | Gap | Impact | Mitigation in MC-17 | Owner | Closure condition |
|---:|---|---|---|---|---|
| G1 | No authorized public copy in ES or EN | No surface can be published; placeholder copy is prohibited | All copy is internal/provisional; dictionary marked internal; `provisionalBrand` visible | COMMERCIAL_DIRECTOR with LEGAL_COUNSEL | Approved claim records, bilingual parity sign-off and a copy approval per surface |
| G2 | Trademark legal clearance `NOT_GRANTED` | No public MAREA brand use, no ® and no trademark suffix | Internal naming only; public use `NO_GO`; no MAREA asset in `public/` | LEGAL_COUNSEL | Written clearance or an approved public-use policy superseding the restriction |
| G3 | MAREA public use `NO_GO` | Any public brand attribution would be a governance breach | Catalogue is noindex, loopback-only and carries the internal banner | LEGAL_COUNSEL | Clearance plus brand-owner sign-off |
| G4 | No hardware validation for instrument modes | Day/sunlight/night readability, glare and night-vision performance are unmeasured | Modes are labelled software-only specimens; no hardware claim in copy | HARDWARE_LEAD | Physical display and daylight/night test evidence on named hardware |
| G5 | No full WCAG 2.2 AA conformance claim | Accessibility evidence is partial; a public claim would be false | `conformanceClaim: "NOT_CLAIMED"`; axe + keyboard + reflow tests only | Programme lead (no audit owner assigned) | Independent audit with assistive technology and manual checks; findings closed |
| G6 | Catalogue screenshots are Chromium/Windows-specific | Visual evidence does not cover Firefox, WebKit, macOS, Linux, mobile hardware or real DPI | Evidence is labelled as such; one worker, Chromium only | Design-system maintainer | Cross-engine/platform evidence or a documented, approved scope decision |
| G7 | Independent review not final | Self-assessment cannot become a PASS; two rounds are recorded but neither is a PASS | `MC17-INDEPENDENT-REVIEW.md` exists with two PARTIAL rounds; the author does not sign off their own work | Programme lead | A reviewer distinct from the author audits the real diff at `4a9043b` and issues the final PASS/PARTIAL/BLOCKED/FAIL |
| G8 | Font metrics were not re-measured | Typography roles rely on MC-04 evidence; pixel equivalents are not asserted | `typography-roles.json` records the limitation; sizes are CSS expressions | Design-system maintainer | Re-measured metrics with method and environment recorded |
| G9 | No real price, stock or API integration | The system cannot represent live commerce; sample data is synthetic | Structural absence of amount/quantity APIs; synthetic fixtures only | Programme lead with FINANCE_LEAD / data owner | An authorized, server-authoritative read API with approved price and verified stock; not before G1-G3 and gate closure |
| G10 | ~~Recorded validator run is FAIL and stale~~ **CLOSED at `4a9043b`** | The recorded evidence now demonstrates a passing contract: `PASS`, 38/38 | The earlier FAIL snapshots (31/38, 36/38, 37/38) are retained as history with date/SHA; the current evidence file is authoritative | Design-system maintainer | Closed: `npm run test:design-system` was re-run at `4a9043b` and recorded PASS 38/38 |
| G11 | ~~Component documentation block carries an axe finding~~ **CLOSED at `4a9043b`** | The recorded pre-correction run had 1 `color-contrast` violation in `instrument-night` in the preview-only `marea-component-doc` block; the current summary and all four raw runs record 0 violations | The historical failure artifact is retained; real components always rendered | Design-system maintainer | Closed: contrast corrected and axe re-run with 0 violations, 36 passes and 0 incomplete in all four modes; `conformanceClaim` stays NONE |
| G12 | ~~Several required MC-17 datasets are absent at authoring time~~ **CLOSED at `4a9043b`** | `MC17-36` now passes: all 20 datasets exist with governance metadata, and all 24 documents exist | Earlier missing-file snapshots are retained as history | Programme lead | Closed: all 20 datasets listed in `MC17-36` exist and the validator records PASS 38/38 |

## 4. Evidence status at `4a9043b`

The authoring-time rows below were superseded by the third-round correction; the historical
FAIL snapshots (31/38 at 02:47, 36/38 at 02:56, 37/38 at `7cbc99e`) remain in D01 §7 and in
`data/review-findings.json` as part of the record.

| Evidence | Status at `4a9043b` |
|---|---|
| `docs/marea/design-system/evidence/validator-run.json` | PRESENT — `status: PASS`, 38/38 checks |
| `docs/marea/design-system/data/contrast-evidence.json` | PRESENT — `status: PASS`, 296 pair/mode measurements, 0 failures |
| `docs/marea/design-system/evidence/axe-summary.json` | PRESENT — 0 violations, 36 passes, 0 incomplete in each of all four modes (`web-light`, `instrument-day`, `instrument-sunlight`, `instrument-night`) |
| `test-results/design-system/**` | PRESENT — four axe JSON files, six responsive screenshots, `results.json` reporter artifact and `artifacts/.last-run.json`; four historical Playwright failure directories retained |
| `MC17-INDEPENDENT-REVIEW.md` | PRESENT — two rounds recorded, both PARTIAL; third-round verdict pending |
| `docs/marea/design-system/data/component-registry.json` | PRESENT — 49 components; `MC17-12`/`MC17-14` PASS in the recorded run |
| `docs/marea/design-system/data/mc18-handoff-inputs.json` | PRESENT — `mc18Started: false`; reconciled to `mc18ValidatorStatus: PASS_38_OF_38` |
| `docs/marea/design-system/data/asset-provenance.json` | PRESENT — `adoption: NOT_ADOPTED`, `publicUse: NO_GO` |
| `docs/marea/design-system/data/blocker-register.json` | PRESENT |
| Required MC-17 document set | COMPLETE — 24/24 documents (`MC17-35` PASS) |

This specialist authored D10, D11, D15, D16, D17, D18 and D19 and did not execute the gate
commands; the delivery record and the recorded evidence files are the authority. The current
validator run is **PASS**, but MC-17 as a milestone remains `PARTIAL` because the final
independent verdict is still pending.

## 5. What is explicitly not claimed

- No WCAG conformance, certification, approval or audit result.
- No trademark clearance or registered-mark status.
- No price, stock, availability, delivery, guarantee or SLA.
- No hardware performance, daylight readability or night-vision performance.
- No publication, deployment, indexation or route activation.
- No market, commercial, accessibility or brand adoption.
- No final independent verdict for MC-17; two PARTIAL rounds are recorded and the
  third-round verdict is pending.

## 6. Governance invariants preserved

| Flag / verdict | Value | Change |
|---|---|---|
| `MC16_VERDICT` | `PARTIAL` | none |
| MC-16 internal scope | `PASS_INTERNAL_COMMERCE_DATA_SCOPE` | none |
| MC-16 commercial effect | None | none |
| Brand state | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` / `MAREA_PUBLIC_USE = NO_GO` | none |
| Publication | all 23 proposed routes non-deployable | none |
| Prices approved | 0 | none |
| Verified MAREA stock | 0 | none |
| Merchant SKU codes | 0 | none |
| `MC18_STARTED` | `false` | none |
| Design-system status | `INTERNAL_PROPOSED` / `NOT_ADOPTED` | none |

## 7. Recommended escalation order

1. Fix MC16-FINAL-02 before any price approval path is created.
2. G10–G12 are closed at `4a9043b` (validator PASS 38/38, axe 0 in four modes, 20/20
   datasets and 24/24 documents); keep the evidence current at any new SHA.
3. Obtain the final independent review verdict (G7) — no PASS before it.
4. Only then pursue copy authorization (G1), trademark/public use (G2-G3) and the hardware
   and accessibility evidence (G4-G5).
5. Keep V-18, F-05/F-11/F-14 and GSC-01/GSC-02 with their owners; do not rewrite history.

## 8. Source map

- `docs/marea/commerce-data/MC16-INDEPENDENT-REVIEW.md`
- `docs/marea/commerce-data/MC16-EXTERNAL-EVIDENCE-AND-BLOCKERS.md`
- `docs/marea/commerce-data/data/{blocker-register,review-findings}.json`
- `docs/marea/information-architecture/MC15-MC16-HANDOFF.md`
- `docs/marea/legal-commercial/data/claims-policy.json`
- `docs/marea/design-system/data/{mode-contracts,typography-roles,legacy-ui-baseline}.json`
- `docs/marea/execution/{MASTER-PROMPT-REGISTRY,DECISION-LOG}.md`
- `README` governance rules (`AGENTS.md`)

Historical verdicts and governance flags are unchanged. No publication, deployment, market
or brand-adoption claim is made.
