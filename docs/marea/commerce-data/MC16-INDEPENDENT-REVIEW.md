# MC16 — Independent review (D21)

| Field | Value |
|---|---|
| Milestone | MC-16 / 36 |
| Scope | Isolated internal commerce data contract; no public activation |
| Review type | Independent, evidence-based, distinct from the author |
| Reviewed commit | `4e67ae2f0a4f4d8d2de3d46ddf2a2543796be366` |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Auditor | `independent-auditor` |
| Verdict | **PASS_INTERNAL_COMMERCE_DATA_SCOPE** |

## 1. Scope and method

The audit examined the real diff from the MC-15 base to the frozen MC-16 commit, not the
author's summary. It read `domain.ts` (1051 lines), `schema.ts` (548 lines), the three
test scripts (487/423/768 lines), `manifest.json`, `inventory-governance.json` and
`review-findings.json`, and verified the large datasets (`product-editions.json`,
`bundle-compositions.json`, `price-governance.json`) through structural extraction plus
the 1727-check validator. No implementation file, dataset or schema was modified by the
auditor.

## 2. Frozen commit and diff

| Item | Result |
|---|---|
| `HEAD` | `4e67ae2f0a4f4d8d2de3d46ddf2a2543796be366` (matches frozen commit) |
| `git diff --stat 99212a4..HEAD` | 50 files changed, 17,575 insertions(+), 3 deletions(-) |
| `git diff --check 99212a4..HEAD` | exit 0, no whitespace or conflict errors |
| Diff content | 20 D01–D20 docs, 21 datasets, domain/schema, validator, 3 test scripts, `package.json`; no financial, public shop, checkout or production-DB edits |

## 3. Commands and results

| Command | Exit | Captured result |
|---|---|---|
| `npm run test:commerce-data` | 0 | `1727/1727 checks passed`; 21 files, 9 families, 26 editions, 6 bundles, 23 routes, 13 gates, 0 approved prices, 0 merchant SKUs, 0 verified inventory |
| `npm run test:commerce-data:unit` | 0 | 70 tests, 70 pass, 0 fail, 0 skipped (18 contract/domain + 36 adversarial + 16 persistence/schema/CLI) |
| `npm run test:financial` | 1 | 77 checks, 76 PASS / 1 FAIL — `V-18` only (see §7) |

## 4. Identity and truthfulness counts

| Claim | Verified value |
|---|---|
| Families | 9 (`NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET`), all `DEFINED` / `NOT_FOR_SALE` |
| Editions | 26 canonical ids, all `merchantable=false`, `priceApproved=false`, `merchantSkuCode=null` |
| Bundles | 6 (`START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET`), all `NOT_FOR_SALE` / `HYPOTHESIS_UNAPPROVED` |
| Merchant SKU codes | 0 established; 26 candidates are `CANDIDATE_ONLY_NOT_MERCHANTABLE` |
| Approved / effective prices | 0 of 26 (13 hypothesis, 12 not established, 1 not applicable) |
| Verified inventory | 0 items; `verifiedMareaStock=NONE`, quantities `null` |
| Real entitlement grants | 0; only synthetic grants are permitted |
| Published MAREA routes | 0 of 23 proposed; publication/indexation flags false |
| Release gates | 13/13 open (`BLOCKED` or `EVIDENCE_REQUIRED`); 0 closed |
| Manifest consistency | counts and flags agree with datasets; `mc17Started=false` |
| Public import | none; isolation rule `ISO-001` finds no reference under `src/server` or `src/app` outside `src/server/marea-commerce/` |

## 5. Schema and guard review

The isolated schema defines 19 `STRICT` tables, 15 `trg_marea_*` triggers, enforced foreign
keys and unique identities. Guard coverage is strict and layered:

- Editions, families, SKUs and bundles cannot be inserted or updated as merchantable,
  priced, published, for-sale or commercially available (`MC16_*_ACTIVATION_PROHIBITED`).
- Price approval requires verified external `PRICE_APPROVAL`/`EXTERNAL_PRICE_LIST`
  evidence, authorized role and all price fields; a price cannot be born `APPROVED`.
- Real entitlement grants are impossible in the DB (`synthetic=1`) and rejected by the
  domain; subscription checkout/auto-renew are forced off; audit events are append-only.
- Publication-eligibility columns are forced to `0`; inventory enforces non-negative
  quantities, `reserved <= on-hand`, generated availability and atomic conditional
  reservation; schema install/drop is idempotent and reversible.
- The schema CLI refuses the production database, repository data paths and relative or
  non-temporary paths (tested); the public server never opens this schema.

The domain layer is fail-closed: all 26 editions return `allowed=false`,
`effectivePrice=null`, `effectiveStock=null`; `adminActivated` and `clientClaims` are
recorded but ignored; promotion to `COMMERCIALLY_AVAILABLE` is prohibited; entitlements
dedupe a shared ledger and WATCH local safety cannot be gated.

## 6. Adversarial sample results

All 36 adversarial tests pass, including: fabricated stock (`ADV-04`), approval without
evidence (`ADV-05`), gate bypass (`ADV-06`), FLEET self-service (`ADV-09`), blocked
bundle sale (`ADV-12`), duplicate SENSE module (`ADV-13`), cross-tenant grant (`ADV-16`),
fabricated payment event (`ADV-18`), client price/readiness claims (`ADV-19`), unauthorized
transition (`ADV-20`), indexable proposed page (`ADV-24`), Product/Offer markup (`ADV-25`),
unknown stock (`ADV-29`), negative quantity (`ADV-32`), synthetic-evidence escape (`ADV-34`)
and published proposed page (`ADV-37`). Observed numbering gap: `ADV-33` is absent from
both the script and the run (INFO-04).

## 7. V-18 classification

`npm run test:financial` fails only on `V-18 — No MC-14 execution` ("registry row 14 is
not PLANNED"). This is **inherited validator-state debt**, not an MC-16 regression:
`git log -S "V-18"` traces it to MC-13 commit `7dfb56d`, and the MC-16 diff touches no
financial script, engine or registry file. `blocker-register.json` already records it as
`INHERITED_VALIDATOR_STATE_DEBT`, `OPEN`, in `scripts/check-marea-financial-model.mjs`.
It does not block the MC-16 internal-data scope, whose own gates pass.

## 8. Findings

| ID | Severity | File | Summary | Status |
|---|---|---|---|---|
| MC16-IND-01 | MINOR | `src/server/marea-commerce/domain.ts` | `isEvidenceUsable` accepts future-issued evidence and malformed `expiresAt` because only parseable dates are expiry-checked and `issuedAt` is never compared to `now` | OPEN (follow-up) |
| MC16-IND-02 | INFORMATIONAL | `src/server/marea-commerce/schema.ts` | The audit CHECK `event_type NOT IN (...) OR json_array_length(evidence_refs_json) >= 0` is tautological; DB-level evidence enforcement is a no-op (domain validator still enforces it) | ACCEPTED (domain covers) |
| MC16-IND-03 | INFORMATIONAL | `scripts/check-marea-financial-model.mjs` | Inherited V-18 financial gate failure (76/77); unrelated files untouched by MC-16 | INHERITED (open debt) |
| MC16-IND-04 | INFORMATIONAL | `scripts/check-marea-commerce-adversarial.test.mjs` | Adversarial suite numbers skip ADV-33 (36 tests: ADV-01–32, ADV-34–37) | ACCEPTED (document) |

None of these is BLOCKING or MAJOR. There is no open blocking defect in the audited scope.

## 9. Verdict

**PASS_INTERNAL_COMMERCE_DATA_SCOPE.** The frozen commit implements an isolated, fail-closed,
non-merchantable internal commerce data contract with truthful zero counts, open gates, no
public import and passing MC-16 gates. The four findings are non-blocking follow-ups (one
MINOR, three informational); no open BLOCKING or MAJOR defect remains.

## 10. Limitations

Timeboxed audit; large datasets were validated by the full 1727-check validator and
structural sampling rather than line-by-line manual reading. No external evidence,
production database, payment provider or public route was exercised, and none is claimed.
