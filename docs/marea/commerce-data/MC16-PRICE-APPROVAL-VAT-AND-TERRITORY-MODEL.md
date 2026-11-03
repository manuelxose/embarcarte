# MC-16 D08 — Price approval, VAT and territory model

| Field | Value |
|---|---|
| Document ID | MC-16 / D08 / MC16-PRICE-APPROVAL-VAT-AND-TERRITORY-MODEL |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Status | `INTERNAL_ONLY` — no approved price, no public price, no checkout, no sale |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` (dataset and code references below) |
| Authority | `data/price-governance.json`; `src/server/marea-commerce/schema.ts`; `src/server/marea-commerce/domain.ts` |
| Downstream owner | MC-17 presentation, MC-19+ catalogue/checkout, MF-30 finance approval — all `NOT_AUTHORIZED` |

## 1. Purpose and boundary

This document defines how MAREA money is represented, evidenced, scoped and
approved in the MC-16 commerce data model. It exists so that a future checkout,
invoice or product page cannot turn a planning number into an offer by accident.

It does **not** approve a price, create a price list, determine a tax position,
enable a checkout, emit a price to a browser, write a JSON-LD `Offer`, or
authorise a sale. The current state is:

- **0 approved prices**; **0 effective prices**; **0 public prices**;
  **0 checkout prices**; **0 invoice prices**.
- 26 price records exist as internal governance records only: 13
  `HYPOTHESIS_UNAPPROVED`, 12 `NOT_ESTABLISHED`, 1 `NOT_APPLICABLE`, 0
  `APPROVED`, 0 `EXPIRED`, 0 `REVOKED`.
- Every record has `amountMinor = null`, `currency = null`, `territory = null`,
  `channel = null`, `vatBasis = null`, `includesVat = null`, `effectiveFrom =
  null`, `approvedBy = null`, `approvalEvidenceIds = []`.
- `evaluatePurchasability()` returns `allowed = false` and
  `effectivePrice = null` for every MAREA entity
  (`src/server/marea-commerce/domain.ts:558-646`).

The all-null price table is not a data-entry gap to be filled by inference. It is
the truthful representation of "no price exists". Unknown is `null`, never `0`,
never an empty string, never a placeholder integer and never a scenario output.

## 2. Canonical current state

### 2.1 Price status distribution (26 records)

| Status | Count | Editions |
|---|---:|---|
| `HYPOTHESIS_UNAPPROVED` | 13 | NAV-ESSENTIAL, NAV-PRO, HUB-STANDARD, HUB-PRO, AIS-RECEIVER, AIS-CONNECTED, PILOT-COASTAL, WATCH-CORE, DISPLAY-7, WEATHER-STANDARD, WEATHER-PRO, FLEET-START, FLEET-BUSINESS |
| `NOT_ESTABLISHED` | 12 | PILOT-SAIL, SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS, WATCH-PLUS, DISPLAY-LARGE-CONDITIONAL, FLEET-ENTERPRISE |
| `NOT_APPLICABLE` | 1 | PILOT-PRO (installation package, never a priced SKU) |
| `APPROVED` | **0** | — |
| `EXPIRED` | 0 | — |
| `REVOKED` | 0 | — |

`HYPOTHESIS_UNAPPROVED` is a status, not a price. No amount, currency or VAT
basis is attached to any of the 13 hypothesis records. The 12
`NOT_ESTABLISHED` records are not "free" or "zero"; they are unestablished.
`PILOT-PRO` is `NOT_APPLICABLE` because it is an installation package, not a
merchant SKU.

**Counter reconciliation.** `price-governance.json#currentState` now carries the
corrected counters `priceRecords = 26`, `hypothesisPrices = 13`,
`notEstablishedPrices = 12` and `notApplicablePrices = 1`. They reconcile
exactly with the per-record status field above (13 + 12 + 1 = 26) and with the
zero approved/effective/public/checkout/invoice counters. No counter may be read
as "26 priced hypotheses": there are 26 price governance records, only 13 of
which carry the `HYPOTHESIS_UNAPPROVED` status.

### 2.2 What the 26 records are not

- They are not a price list, quotation, offer, tender or budget.
- They are not derived from a supplier quotation, an external price list, a
  signed contract or a finance approval.
- They are not inputs to `effectivePrice`; that field is `null` unless every
  approval condition passes.
- They are not published in HTML, metadata, JSON-LD, sitemap or any API response.

## 3. Money representation

| Rule | Contract | Enforcement |
|---|---|---|
| Storage type | Integer minor units (`amount_minor INTEGER`) | SQLite `STRICT` table, `typeof(amount_minor) = 'integer'` check when non-null (`schema.ts:187-213`) |
| Floating point | Prohibited for persistence and calculation of payable amounts | Policy; no float column exists |
| Currency | Explicit ISO 4217 alpha-3 code (`EUR`, `USD`, …), never implied by locale | `currency TEXT` plus required-for-approval check; ISO validation is a service-layer rule (`domain.ts:427-429`) |
| Amount sign | `amount_minor >= 0`; negative amounts are not discounts and are rejected | `CHECK (amount_minor IS NULL OR (typeof(amount_minor) = 'integer' AND amount_minor >= 0))` |
| Unknown | `NULL` for amount and for every dependent field | No `DEFAULT 0`; no `COALESCE(..., 0)` |
| Zero | A real zero is representable and distinct from `NULL`, but a zero-price approval is not authorised in MC-16 and no zero record exists | `CHECK` permits `0`; policy forbids approval; 0 approved prices |
| Precision | No rounding in the data model; any presentment rounding is a downstream, display-only operation and may never alter the stored amount | Policy |
| Client authority | A browser, cart or client payload never supplies the payable amount | `evaluatePurchasability()` ignores `clientClaims` (`domain.ts:569`) |

Example of the only truthful current shape:

```json
{
  "priceVersionId": "PV-001-NAV-ESSENTIAL",
  "status": "HYPOTHESIS_UNAPPROVED",
  "amountMinor": null,
  "currency": null,
  "territory": null,
  "channel": null,
  "vatBasis": null,
  "includesVat": null,
  "effectiveFrom": null,
  "approvedBy": null,
  "approvedByRole": null,
  "approvalEvidenceIds": []
}
```

Replacing any `null` above with `0` would fabricate a free product. This is
prohibited by invariant `SEC-MC16-07` and by the dataset rule "unknowns are null,
never zero".

## 4. Price status vocabulary and transitions

| Status | Meaning | May be shown publicly? | May enter checkout? | Transition authority |
|---|---|---|---|---|
| `HYPOTHESIS_UNAPPROVED` | Internal planning number or planning placeholder; not a price | No | No | Commercial/finance; remains internal |
| `NOT_ESTABLISHED` | No amount has been established | No | No | Finance |
| `NOT_APPLICABLE` | The entity is not a priced object (e.g. PILOT-PRO installation package) | No | No | Product governance |
| `APPROVED` | An authorised approver accepted a complete price record backed by verified external evidence | Only for its exact territory/channel and effective window after publication authorisation | Only if all purchasability conditions pass | `FINANCE_LEAD` or `COMMERCIAL_DIRECTOR` |
| `EXPIRED` | The effective window ended | No | No | Time-based or explicit expiry |
| `REVOKED` | The approval was withdrawn | No | No | Authorised approver; audit event required |

Allowed future transition path (not executed in MC-16):

`HYPOTHESIS_UNAPPROVED | NOT_ESTABLISHED` → `APPROVED` → (`EXPIRED` | `REVOKED`).
`NOT_APPLICABLE` does not transition to `APPROVED`; a different edition object
would be required. An `APPROVED` record may be superseded by a new version
through `superseded_by_price_version_id`, with history retained.

## 5. VAT basis

VAT is a property of the supply, the parties and the territory — not a property
of "the MAREA price". The model therefore stores **both** a basis token and a
boolean:

- `vat_basis TEXT` — legal basis/treatment token.
- `includes_vat INTEGER` — `1` when the stored amount already includes VAT, `0`
  when it is net of VAT, `NULL` when not established.
- An approved price must have both non-null (`schema.ts:206-211`); a mixed or
  unspecified basis fails approval.

### 5.1 Source facts (MC-14, repository-verified)

- Spanish general VAT is 21%; the 21% assumption holds **for Spanish consumers
  only** (`docs/marea/legal-commercial/MC14-PAYMENTS-TAX-AND-COMMERCIAL-CONTRACTS.md:43-44`).
- Cross-border B2C supplies are taxed at the consumer's Member State rate; OSS
  registration/evaluation is required for eligible supplies (same source,
  lines 45-46).
- Intra-EU B2B services generally use reverse charge; the invoice must reflect it
  (same source, lines 47-48).
- Import VAT and customs depend on a supply model and Incoterms that do not
  exist; the tax treatment for each supply model is `UNKNOWN` (same source,
  lines 49-55, 84-88).
- MC-13's consumer hypotheses are gross figures and its B2B figures are net;
  the conversion is disclosed on every revenue line, not silently applied
  (`docs/marea/economics/MC12-PER-SKU-CONTRIBUTION-MODEL.md:25-27`).

### 5.2 Proposed basis tokens (internal, not approved)

| Token | Applies to | VAT included flag | Status |
|---|---|---|---|
| `DOMESTIC_STANDARD_RATE` | Spanish consumer supply, standard rate | `1` for a gross retail price | `PROPOSED_UNVALIDATED`; the 21% assumption is not a tax determination |
| `DESTINATION_CONSUMER_RATE_OSS` | Cross-border B2C eligible supply | `1` for a gross consumer price | `PROPOSED_UNVALIDATED`; OSS decision `UNKNOWN` |
| `INTRA_EU_B2B_REVERSE_CHARGE` | Intra-EU B2B service | `0` (net) | `PROPOSED_UNVALIDATED`; invoice wording and customer VAT status required |
| `EXPORT_OR_NON_EU_SUPPLY` | Supply outside the VAT territory | `0` or as legally determined | `PROPOSED_UNVALIDATED`; customs/Incoterms unknown |
| `NOT_APPLICABLE` | Non-supply or non-priced entity | `NULL` or `0` as documented | `PROPOSED_UNVALIDATED` |

These tokens are a closed proposed vocabulary for the future implementation; no
record currently carries any of them. The exact rate is **not stored** in
MC-16 because no tax engine, invoice template, seller identity or OSS decision
exists. An approved record must be able to derive the rate from its basis,
territory and invoice context; if it cannot, it is not approvable.

### 5.3 Display and contract rules

1. A VAT-inclusive consumer display must never be mixed with a VAT-exclusive
   B2B display in the same surface without an explicit label.
2. "From €X" is prohibited in MC-16 (no approved X, no range authority).
3. A price is never shown without its currency and VAT basis once approved.
4. The same entitlement can have different approved records for different
   territories/channels; the checkout must select exactly one matching record.
5. No price may be inferred from a scenario, contribution model, competitor
   observation, supplier quote or historical hypothesis.
6. Invoice content, seller legal identity and OSS treatment remain `BLOCKED` by
   `GATE-LEGAL-ENTITY`, `GATE-PRICING` and `GATE-PAYMENTS`.

## 6. Territory and channel

`territory` and `channel` are mandatory on an approved price and are part of its
identity. They are not decorative metadata.

| Field | Contract | Current value |
|---|---|---|
| `territory` | ISO 3166-1 alpha-2 country code (e.g. `ES`, `FR`, `DE`). An aggregate such as "EU", "worldwide" or "rest of world" is not a territory for approval; it must be expanded into country records. | `null` for all 26 |
| `channel` | One of the proposed channel tokens below. A price record serves exactly one channel. | `null` for all 26 |
| Effective window | `effective_from` required for `APPROVED`; `effective_to` optional and strictly later than `effective_from` | `null` for all 26 |

### 6.1 Proposed channel tokens

| Token | Meaning | Note |
|---|---|---|
| `DIRECT_WEB` | EMBARCARTE-owned storefront | No storefront is authorised |
| `PROFESSIONAL` | Professional/dealer channel | Agreement `DRAFT_REQUIRED` |
| `INSTALLER` | Installer-assisted sale | Installer agreement `DRAFT_REQUIRED` |
| `DISTRIBUTOR` | Distributor agreement | Agreement `DRAFT_REQUIRED` |
| `CONTRACTED_B2B` | Negotiated contract, e.g. FLEET | Contract set `NOT_EXECUTED` |
| `APP_STORE` | Platform marketplace | Commission/tariff is a planning input, not an agreement |

A price approved for `DIRECT_WEB` is not usable in `PROFESSIONAL`, and vice
versa. The domain evaluator returns `PRICE_TERRITORY_MISMATCH` and
`PRICE_CHANNEL_MISMATCH` when a requested scope differs
(`domain.ts:442-447`). A missing requested territory or channel returns
`TERRITORY_MISSING` / `CHANNEL_MISSING` and blocks purchasability
(`domain.ts:632-633`).

### 6.2 No global price

There is no "default world price". A future implementation that cannot resolve a
territory/channel pair must fail closed, not fall back to `EUR`/`ES`/`DIRECT_WEB`.
FLEET is explicitly per-vessel, VAT-excluded and contracted; a web retail record
must never be reused for it.

## 7. Approval evidence and separation of duties

An `APPROVED` record requires all of the following:

| Requirement | Value / rule | Enforcement |
|---|---|---|
| Amount | Non-null integer minor units | Column `CHECK` |
| Currency | Non-null ISO 4217 code | Column `CHECK` (presence) + domain rule |
| Territory | Non-null ISO 3166-1 alpha-2 | Column `CHECK` (presence) + domain rule |
| Channel | Non-null proposed token | Column `CHECK` (presence) + domain rule |
| VAT basis | Non-null token | Column `CHECK` (presence) + domain rule |
| `includes_vat` | `0` or `1` | Column `CHECK` |
| `effective_from` | Valid date, not in the future relative to approval use | Column `CHECK` + evaluator |
| Approver | `approved_by` non-null and `approved_by_role IN ('FINANCE_LEAD','COMMERCIAL_DIRECTOR')` | Column `CHECK` + evaluator |
| Evidence | At least one usable `PRICE_APPROVAL` or `EXTERNAL_PRICE_LIST` record with `evidence_class = VERIFIED_EXTERNAL`, `verified = 1`, `status = VALID`, issuer and content hash | `marea_price_approval_evidence` link table + evaluator; database triggers on `INSERT` and status `UPDATE` |
| Audit | Append-only audit event with actor, role, reason and correlation id | Audit contract; not automatically generated by the schema |

A test pass, an internal decision record, a repository document, a competitor
listing or an MC-13 scenario is **not** price approval evidence. Only a verified
external record can close `GATE-PRICING`; the finance approval itself must also
come from the authorised role.

**Direct-insert guard.** The approval evidence guard exists in both directions:
`trg_marea_price_approval_guard` covers `UPDATE OF status` and
`trg_marea_price_approval_guard_insert` covers `INSERT`. A price cannot be born
`APPROVED` and cannot transition to `APPROVED` without a linked, valid, verified
`VERIFIED_EXTERNAL` `PRICE_APPROVAL` or `EXTERNAL_PRICE_LIST` evidence record.
The insert guard is verified in the current schema (`schema.ts:425-457`).

## 8. Evaluator contract (`validatePriceApproval`)

For a candidate price, the evaluator returns `approved`, `reasonCodes`,
`missingEvidenceIds` and `effectivePrice`. Current relevant reason codes include:

`PRICE_NOT_ESTABLISHED`, `PRICE_HYPOTHESIS_UNAPPROVED`, `PRICE_NOT_APPLICABLE`,
`PRICE_EXPIRED`, `PRICE_REVOKED`, `PRICE_UNKNOWN`,
`PRICE_INVALID_MINOR_UNITS`, `PRICE_CURRENCY_MISSING`,
`PRICE_TERRITORY_MISSING`, `PRICE_CHANNEL_MISSING`, `PRICE_VAT_BASIS_MISSING`,
`PRICE_APPROVER_MISSING`, `PRICE_APPROVER_ROLE_UNAUTHORIZED`,
`PRICE_EFFECTIVE_FROM_MISSING`, `PRICE_NOT_YET_EFFECTIVE`,
`PRICE_TERRITORY_MISMATCH`, `PRICE_CHANNEL_MISMATCH`,
`PRICE_APPROVAL_EVIDENCE_MISSING`, `PRICE_APPROVAL_EVIDENCE_WRONG_TYPE` and
`PRICE_APPROVAL_EVIDENCE_INVALID`.

`effectivePrice` is populated only when `approved` is true and every scope field
is non-null; otherwise it is `null`. `evaluatePurchasability()` then re-nulls
`effectivePrice` whenever the overall decision is denied
(`domain.ts:636-645`). There is no code path that publishes a partial price.

## 9. Current proof and verification

| Check | Method | Result |
|---|---|---|
| 0 approved prices | `price-governance.json#currentState`; per-record status count | `0` |
| 0 effective/public/checkout/invoice prices | same counters | `0` each |
| 26 records, 13/12/1 status split | dataset inspection | Verified |
| All amount/scope/VAT fields null | dataset inspection | 26/26 null |
| Schema rejects invalid integer and missing scope on approval | `schema.ts:187-213` | Present |
| Domain evaluator denies all current records | `domain.ts:401-488`, `558-646` | `allowed=false`, `effectivePrice=null` |
| No price in structured data for MAREA | `publication-eligibility.json`; D15 | `mareaPriceInStructuredData=false` |
| Data validator | `node scripts/check-marea-commerce-data.mjs` | 1,727/1,727 checks passed on the base datasets |

## 10. Acceptance criteria

| ID | Criterion | Current status |
|---|---|---|
| D08-AC-01 | Exactly 0 `APPROVED` prices and 0 effective, public, checkout or invoice prices | **PASS (current state)** |
| D08-AC-02 | Every unknown amount/currency/territory/channel/VAT basis is `null`, never `0` or a placeholder | **PASS (current state)** |
| D08-AC-03 | All 26 price records are non-approved (`HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED` or `NOT_APPLICABLE`) | **PASS (current state)** |
| D08-AC-04 | `evaluatePurchasability()` returns `allowed=false` and `effectivePrice=null` for every MAREA entity | **PASS (code + tests)** |
| D08-AC-05 | `APPROVED` requires verified external evidence, authorised approver, explicit currency/territory/channel/VAT basis and an effective date; both `INSERT` and `UPDATE` paths are guarded | **PASS (schema guard + evaluator)** — no approved row exists |
| D08-AC-06 | No price is published, offered, pre-checked out or emitted as JSON-LD | **PASS (current state)**; future activation **BLOCKED** |

## 11. Open items and blockers

- `GATE-PRICING` `BLOCKED`; `GATE-PAYMENTS` `BLOCKED`; `GATE-LEGAL-ENTITY`
  `BLOCKED`; `GATE-CONSUMER-TERMS` `BLOCKED` (13 gates, 0 closed).
- No approved price list, no VAT determination, no seller legal identity, no
  merchant agreement, no invoice template and no OSS decision.
- The price counters were corrected by the data owner on 2026-11-03 and now
  reconcile: 26 records = 13 hypothesis + 12 not established + 1 not applicable.
- Territory/channel token vocabularies are proposed internal design; they are
  not approved commercial taxonomy.

## 12. References

- `data/price-governance.json` — 26 records, current counters, approval policy.
- `src/server/marea-commerce/schema.ts:187-221` — `marea_price_versions`,
  `marea_price_approval_evidence`, approval trigger.
- `src/server/marea-commerce/domain.ts:168-183, 401-488, 558-646` — price model,
  approval evaluator, purchasability.
- `docs/marea/legal-commercial/MC14-PAYMENTS-TAX-AND-COMMERCIAL-CONTRACTS.md:27-55, 73-88`
  — subscription renewal, VAT/OSS, operational restrictions, unknowns.
- `docs/marea/economics/MC12-PER-SKU-CONTRIBUTION-MODEL.md:9-27` — hypothesis vs
  approval and ex-VAT basis.
- `docs/marea/information-architecture/MC15-MC16-HANDOFF.md:302-319` — inherited
  price/stock defects and MC-16 requirements.
- `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` (D13) — table and trigger detail.
- `MC16-SEO-AND-PUBLICATION-DATA-CONTRACT.md` (D15) — no price/Offer markup.

**Status statement.** This document is an internal governance contract. It
approves no price, establishes no VAT position and authorises no publication,
checkout or sale.
