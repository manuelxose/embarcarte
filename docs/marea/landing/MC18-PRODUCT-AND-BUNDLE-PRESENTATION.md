# MC-18 — Product and bundle presentation (D06)

| Field       | Value                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------- |
| Deliverable | D06 `MC18-PRODUCT-AND-BUNDLE-PRESENTATION.md`                                               |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                                    |
| Owner       | docs-a (documentation owner, documents group A)                                             |
| Date        | 2026-11-03                                                                                  |
| Status      | `INTERNAL_VERIFIED` for the presentation projections described; **not a milestone verdict** |
| Publication | `NOT_AUTHORIZED`                                                                            |

This document explains how the landing presents the nine canonical product families and the
six canonical solution bundles, how readiness and restrictions are derived, how each family
limitation is handled, how the 26 editions and the FLEET contracted solution are constrained,
and which commercial states are explicitly not representable.

## 1. Canonical data references

| Dataset                                                                 | Role                                                                                    | Scale                                                                                                                                               |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/marea/commerce-data/data/product-families.json`                   | Canonical MC-16 families, lifecycle, readiness dimensions, commercial availability      | 9 families, all `NOT_FOR_SALE`                                                                                                                      |
| `docs/marea/commerce-data/data/product-editions.json`                   | Canonical MC-16 editions                                                                | 26 editions: 17 `DEFINED`, 8 `CONDITIONAL`, 1 `INSTALLATION_PACKAGE`; 0 merchantable; 0 price-approved; no merchant SKU code; 4 `requiresQuotation` |
| `docs/marea/commerce-data/data/bundle-compositions.json`                | Canonical MC-16 bundle composition                                                      | 6 bundles                                                                                                                                           |
| `docs/marea/landing/data/product-family-presentation.json`              | Read-only landing projection of the families                                            | 9 entries with edition ids, readiness, restrictions, commercial flags                                                                               |
| `docs/marea/landing/data/bundle-presentation.json`                      | Read-only landing projection of the bundles                                             | 6 entries with components, optional lines, contract-only/ineligible lines, external requirements                                                    |
| `src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts` | Verified MC-17 presentation fixture (`MAREA_FIXTURE_FAMILIES`, `MAREA_FIXTURE_BUNDLES`) | Identity, readiness, restrictions and composition rendering                                                                                         |
| `src/app/marea-design-system/data/commerce-presentation.adapter.ts`     | MC-17 fail-closed commercial presentation                                               | Forces purchase/cart/price/availability false                                                                                                       |

These are projections and fixtures; the landing **does not duplicate** the product database
and cannot add a family, edition or bundle that is not canonical.

## 2. The nine families

Source: `product-family-presentation.json` (data as projected on 2026-11-03). Every family is
`commercialAvailability = NOT_FOR_SALE`, `priceVisible = false`, `availabilityVisible = false`,
`purchaseActionAllowed = false`, `readiness = NOT_READY`. Edition counts sum to 26.

| Family  | Editions                                                                                                                      | Readiness   | Family-specific restriction(s) beyond the four universal ones                         |
| ------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| NAV     | 2 (`NAV-ESSENTIAL`, `NAV-PRO`)                                                                                                | `NOT_READY` | `LICENSING_NOT_CLEARED` — charts not licensed or represented as included              |
| HUB     | 2 (`HUB-STANDARD`, `HUB-PRO`)                                                                                                 | `NOT_READY` | none beyond universal (but no hardware selected/conformity evidence)                  |
| AIS     | 2 (`AIS-RECEIVER`, `AIS-CONNECTED`)                                                                                           | `NOT_READY` | `LICENSING_NOT_CLEARED`; receive-only scope (no transmission)                         |
| PILOT   | 3 (`PILOT-COASTAL`, `PILOT-SAIL`, `PILOT-PRO`)                                                                                | `NOT_READY` | `SAFETY_GATE_BLOCKED` — supervised assistance only; no autonomous steering            |
| SENSE   | 8 (`SENSE-WIND`, `SENSE-POWER`, `SENSE-BILGE`, `SENSE-TANKS`, `SENSE-ENV`, `SENSE-ESSENTIALS`, `SENSE-SAIL`, `SENSE-SYSTEMS`) | `NOT_READY` | `COMPATIBILITY_UNTESTED`                                                              |
| WATCH   | 2 (`WATCH-CORE`, `WATCH-PLUS`)                                                                                                | `NOT_READY` | `COMPATIBILITY_UNTESTED`; no guaranteed alert delivery or continuous monitoring       |
| DISPLAY | 2 (`DISPLAY-7`, `DISPLAY-LARGE-CONDITIONAL`)                                                                                  | `NOT_READY` | no fabricated dimensions; conditional large edition not selectable                    |
| WEATHER | 2 (`WEATHER-STANDARD`, `WEATHER-PRO`)                                                                                         | `NOT_READY` | `LICENSING_NOT_CLEARED` — weather data not licensed/included; probabilistic forecast  |
| FLEET   | 3 (`FLEET-START`, `FLEET-BUSINESS`, `FLEET-ENTERPRISE`)                                                                       | `NOT_READY` | `LICENSING_NOT_CLEARED`; contracted solution, no default hardware, no established SLA |

Universal restriction array on every family: `PUBLICATION_NOT_AUTHORIZED`,
`TRADEMARK_NOT_CLEARED`, `PRICE_NOT_APPROVED`, `STOCK_NOT_VERIFIED`.

### 2.1 Limitation handling per family (copy contract)

Each family card carries a summary plus a mandatory material limitation; the validator
rejects an empty limitation. The rendered ES limitations are:

| Family  | Limitation rendered (ES)                                                                                                  | Validator check      |
| ------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| NAV     | Charts are not licensed and are not represented as included                                                               | `MC18-19`            |
| HUB     | No hardware selected, no conformity evidence                                                                              | `MC18-06` (presence) |
| AIS     | AIS reception does not transmit, does not prevent collisions, does not replace watchkeeping; not all vessels transmit AIS | `MC18-14`            |
| PILOT   | Safety gate blocked: no autonomous steering, no unsupervised remote control, no recorded sea trial                        | `MC18-13`            |
| SENSE   | SENSE-ESSENTIALS represents POWER and BILGE; modules are not counted twice in bundle composition                          | `MC18-17`            |
| WATCH   | Alerts may be delayed or lost; no guaranteed continuous remote monitoring or emergency service                            | `MC18-15`            |
| DISPLAY | No manufactured unit, no frozen screen size; final dimensions are not published                                           | `MC18-18`            |
| WEATHER | Weather data not licensed/included; forecasts are probabilistic                                                           | `MC18-19`            |
| FLEET   | No default hardware, no established SLA, no measured availability                                                         | `MC18-16`            |

Commercial copy on every family also states that the family is not for sale, with no approved
price, stock, subscription or delivery date.

## 3. The six bundles

Source: `bundle-presentation.json`. All six are internally defined solution concepts:
`publicationAuthorized = false`, `indexationAuthorized = false`, `checkoutAllowed = false`,
`orderable = false`, `priceVisible = false`, `availabilityVisible = false`,
`packagePriceEstablished = false`, `hardwareIncludedByDefault = false`,
`slaEstablished = false`, `compatibilityStatus = UNTESTED`. Each carries the note
"Derived read-only presentation contract. Internally defined solution concept; no price,
stock, delivery or orderable state."

| Bundle   | Required components                                                                                                               | Optional / conditional                                 | Contract-only                                                     | Ineligible                                                                  | External requirements                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| START    | HUB-STANDARD, NAV-PRO (2)                                                                                                         | HUB-PRO, WEATHER-STANDARD                              | —                                                                 | —                                                                           | installation, cabling, commissioning, licensed chart/weather data where applicable, SIM/connectivity where applicable |
| CRUISE   | NAV-ESSENTIAL, HUB-STANDARD, AIS-RECEIVER, DISPLAY-7 (4)                                                                          | AIS-CONNECTED (conditional), NAV-PRO, WEATHER-STANDARD | —                                                                 | DISPLAY-LARGE-CONDITIONAL (`CR-07`, conditional size not selectable)        | same five                                                                                                             |
| SAIL     | NAV-PRO, HUB-STANDARD, PILOT-COASTAL (quotation required) (3)                                                                     | SENSE-WIND (conditional), PILOT-SAIL (conditional)     | —                                                                 | PILOT-PRO (`SL-06`, installation package is never a priced SKU/bundle line) | same five                                                                                                             |
| PROTECT  | WATCH-CORE, SENSE-ESSENTIALS (2; expands to SENSE-POWER + SENSE-BILGE)                                                            | WATCH-PLUS (conditional), HUB-STANDARD                 | —                                                                 | —                                                                           | same five                                                                                                             |
| COMPLETE | NAV-PRO, HUB-PRO, DISPLAY-7, WATCH-CORE, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, PILOT-COASTAL (quotation required) (9) | PILOT-SAIL (conditional), AIS-RECEIVER, WEATHER-PRO    | —                                                                 | PILOT-PRO (`CP-13`), DISPLAY-LARGE-CONDITIONAL (`CP-15`)                    | same five                                                                                                             |
| FLEET    | FLEET-START (1)                                                                                                                   | WATCH-CORE, HUB-STANDARD, FLEET-BUSINESS               | FLEET-ENTERPRISE (`FP-02`, contracted B2B tier, not self-service) | —                                                                           | same five                                                                                                             |

### 3.1 FLEET contracted-solution constraints

- `contractedSolution = true`; `FLEET-ENTERPRISE` is `contractOnly` with reason
  `CONTRACTED_B2B_TIER_NOT_SELF_SERVICE`.
- `hardwareIncludedByDefault = false`, `slaEstablished = false`; the rendered copy states both
  constraints and says FLEET is not offered as self-service and has no public price.
- The validator check `MC18-16` requires the FLEET copy to exclude default hardware and an
  established SLA.

### 3.2 Kit non-double-counting

- `SENSE-ESSENTIALS` expands to `SENSE-POWER` and `SENSE-BILGE` (`expandsTo`).
- It is rendered as one kit line with its expansion nested; `MareaBundleComponents` renders
  each kit line once. `bundleComponentCount()` counts the canonical composition lines (kit
  line once, not its expansion) and never double-counts.
- PROTECT and COMPLETE copy states this explicitly, and validator `MC18-17` checks it.

## 4. Readiness and restriction derivation

1. `familySummaryFor(familyId, summary)` merges the canonical identity/readiness/restrictions
   from `product-family-presentation.json` and the MC-17 fixture with the authored localized
   summary. A missing record or fixture returns `null`; the section must not invent a card.
2. `buildReadinessSummary()` maps the 11 canonical readiness dimensions to the MC-17
   `MareaReadinessStatus` vocabulary; unknown values degrade to `NOT_READY`, never to
   `READY`. The overall status is derived: `BLOCKED` if any dimension is blocked, `READY` only
   if all are ready, otherwise `NOT_READY`.
3. `blockedGateIds` is an opaque internal label (`MC14_RELEASE_GATES`) plus the gate count; no
   external approval is implied.
4. The commercial presentation is derived once through the MC-17 fail-closed adapter with
   `releaseGateOpen: false`, `buyCtaAllowed: false`, `cartAllowed: false`,
   `priceVisible: false`, `availabilityVisible: false`, `ctaState: 'DISABLED'`. The adapter
   returns all commercial booleans `false` even if an upstream source sets them true.
5. `normalizedInclusion()` maps the canonical inclusion vocabulary and degrades unknown
   values to the most restrictive inclusion (`CONDITIONAL`).

## 5. 26 editions are not merchant SKUs

- `product-editions.json`: 26 editions, `merchantable = false` for all, `priceApproved = false`
  for all, `merchantSkuCode = null` for all, and `0` verified stock rows.
- `skuIdentity` values are identity/contract markers, not sellable SKUs:
  `EDITION_ID_IS_STABLE_IDENTITY`, `INSTALLATION_PACKAGE_NOT_A_SKU`,
  `CONTRACTED_TIER_NOT_A_CHECKOUT_SKU`.
- 4 editions carry `requiresQuotation = true`; a quotation requirement is not a price, an
  order or an availability promise.
- The landing therefore presents editions as **definitions with readiness**, never as
  merchant SKUs, and never renders an edition-level price, stock, delivery or order control.

## 6. Explicit non-goals

The landing does **not** represent, and the validation suite rejects:

- any price, amount, currency, package price or approved-price state (`MC18-09`);
- any stock, inventory, "in stock", "available soon", delivery date or lead time
  (`MC18-10`, `MC18-12`);
- any orderable state: add-to-cart, buy, checkout, pre-order, reservation or waitlist
  (`MC18-11`, `MC18-12`);
- any purchase control, even disabled (`marea-commercial-cta` contains no button or anchor);
- any certified/compliant/interoperable claim (CE, NMEA 2000, marine safety, tested
  compatibility) (`MC18-22`);
- any merchant SKU code, subscription entitlement or financing/insurance claim;
- any customer evidence, testimonial, market-share or profitability claim.

## 7. Known limitations / non-claims

- This document describes the **internal draft presentation**, not a commercial offer. All
  products remain `NOT_FOR_SALE` and no price, stock or delivery exists.
- Family and bundle data shown here are projections captured on 2026-11-03; canonical MC-16
  datasets remain the authority and may evolve in a later milestone.
- The MC-17 fixture supplies identity/readiness/restriction rendering; no product claim is
  made beyond what those fixtures and the MC-16 datasets contain.
- No compatibility is tested (`TESTED_COMPATIBILITY_ROWS = 0`), no hardware is selected, no
  CE marking claim is allowed and no NMEA 2000 certification is asserted.
- The landing does not calculate readiness or pricing itself; it renders derived values. A
  change to the canonical data would require regeneration/verification, not trust in this
  document.
- Nothing here authorises publication, indexation, sale or a future commercial offer.
