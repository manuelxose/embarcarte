# MC-17 D10 — Product, edition and bundle presentation

| Field | Value |
|---|---|
| Deliverable | D10 `MC17-PRODUCT-EDITION-BUNDLE-PRESENTATION.md` |
| Milestone | MC-17/36 — MAREA internal design system |
| Date | 2026-11-03 |
| Owner | programme-docs |
| Status | `INTERNAL_PROPOSED` — presentation only, not published |
| Evidence class | Implementation and MC-16 dataset inspection |
| `MC16_VERDICT` | `PARTIAL` (unchanged) |

## 1. Boundary

This document explains how the isolated design system represents the MC-16 portfolio:
**9 families, 26 editions and 6 bundles**, with no 27th edition, no merchant SKU and no
publication claim. It describes the actual implementation under
`src/app/marea-design-system/`, not a target design.

The data source of truth remains MC-16:

- `docs/marea/commerce-data/data/product-families.json` — 9 families and their edition ids.
- `docs/marea/commerce-data/data/product-editions.json` — 26 editions.
- `docs/marea/commerce-data/data/bundle-compositions.json` — 6 bundles.
- `docs/marea/commerce-data/data/readiness-dimensions.json` — 11 dimensions.
- `docs/marea/commerce-data/data/entitlement-definitions.json` — 12 entitlement definitions.

The generated presentation fixture is
`src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts`. It is marked
`SYNTHETIC_INTERNAL_FIXTURE` and is produced from the datasets above; it contains no price
amount, stock quantity, merchant SKU, customer or vessel field.

## 2. Portfolio truth table

Counts are read from the MC-16 data and reproduced in the fixture. The validator check
`MC17-21` asserts 9 / 26 / 6 and that every id is representable.

| Family | Product type | Edition count | Edition ids | Family restriction kinds | Presentable limit |
|---|---|---:|---|---|---|
| NAV | SOFTWARE | 2 | NAV-ESSENTIAL, NAV-PRO | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, LICENSING_NOT_CLEARED | Unlicensed chart/weather data not represented as included |
| HUB | HARDWARE | 2 | HUB-STANDARD, HUB-PRO | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED | Definition only; hardware not selected |
| AIS | HARDWARE | 2 | AIS-RECEIVER, AIS-CONNECTED | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, LICENSING_NOT_CLEARED | Receive-only; no transmission, no collision-avoidance promise |
| PILOT | HARDWARE | 3 | PILOT-COASTAL, PILOT-SAIL, PILOT-PRO | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, SAFETY_GATE_BLOCKED | Supervised concept, safety gate blocked, no autonomy |
| SENSE | HARDWARE | 8 | SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, COMPATIBILITY_UNTESTED | Local alarms independent; kit counted once |
| WATCH | HARDWARE_SERVICE | 2 | WATCH-CORE, WATCH-PLUS | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, COMPATIBILITY_UNTESTED | No guaranteed alerts; local safety not subscription-gated |
| DISPLAY | HARDWARE | 2 | DISPLAY-7, DISPLAY-LARGE-CONDITIONAL | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED | No invented dimensions, final size or price |
| WEATHER | SOFTWARE | 2 | WEATHER-STANDARD, WEATHER-PRO | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, LICENSING_NOT_CLEARED | Unlicensed weather data not represented as included |
| FLEET | SAAS | 3 | FLEET-START, FLEET-BUSINESS, FLEET-ENTERPRISE | PUBLICATION_NOT_AUTHORIZED, TRADEMARK_NOT_CLEARED, PRICE_NOT_APPROVED, STOCK_NOT_VERIFIED, LICENSING_NOT_CLEARED | No default hardware, no SLA, no customer examples |

All 26 editions are `DEFINED`, `CONDITIONAL` or `INSTALLATION_PACKAGE`; none is a
merchantable SKU. The fixture has `merchantSkuCode` absent by construction, and
`MC17-22` fails if a merchant-SKU or price/stock field appears.

## 3. Identity rules enforced by the presentation layer

| Rule | Implementation evidence |
|---|---|
| 9 families, 26 editions, 6 bundles only | Fixture arrays; validator `MC17-21` reads the MC-16 counts and checks every id |
| No 27th edition | Validator `MC17-26` requires exactly 26 `"editionId":` occurrences |
| No merchant SKU | `MareaEditionSummary` has no SKU field; `MC17-22` forbids `merchantSkuCode` in fixtures |
| An edition is never a page | The catalogue has no router; components receive summaries as inputs |
| A bundle is an entity, not a SKU | `MareaBundleSummary` carries components/exclusions, no SKU and no amount |
| `PILOT-PRO` is an installation package | `definitionStatus: "INSTALLATION_PACKAGE"` and `editionType: "INSTALLATION_PACKAGE"` |
| `displayName` is language-neutral | Edition/bundle/family display names are single strings; only `summary` is `{es,en}` |
| Localized content is one entity | `MareaFamilySummary.summary: MareaLocalizedText`; no ES/EN SKU duplication |

## 4. Distribution of the 26 editions

| Family | Count | Share of portfolio |
|---|---:|---:|
| SENSE | 8 | 30.8% |
| PILOT | 3 | 11.5% |
| FLEET | 3 | 11.5% |
| NAV | 2 | 7.7% |
| HUB | 2 | 7.7% |
| AIS | 2 | 7.7% |
| WATCH | 2 | 7.7% |
| DISPLAY | 2 | 7.7% |
| WEATHER | 2 | 7.7% |
| **Total** | **26** | **100%** |

Counts are arithmetic from the MC-16 ids, not a measurement or an estimate.

## 5. Special presentation rules and their enforcing component

Every rule below is implemented in the names shown; the component is the evidence, not a
policy statement alone.

| Rule | What is enforced | Enforcing component / fixture |
|---|---|---|
| PILOT is supervised-only, safety gate blocked, no autonomy | A visible limitation line states supervised pilot concept, no autonomous navigation, no live steering control and a blocked safety gate; the family and all three editions carry `SAFETY_GATE_BLOCKED` | `MareaFamilyCard` renders `restrictionCopyKey('SAFETY_GATE_BLOCKED')` → `pilotSupervised`; `MareaEditionCard` renders `presentation`; fixture `safetyStatus: "BLOCKED"`; copy `pilotSupervised`; validator `MC17-23` |
| PILOT-PRO is never a priced SKU | The edition card shows the installation-package badge and a limitation line; the bundle lists PILOT-PRO as ineligible with reason `INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE` | `MareaEditionCard` (`definitionStatus === 'INSTALLATION_PACKAGE'` branch); `MareaBundleExclusions`; fixture ineligible rows in SAIL and COMPLETE; `deriveCtaState` returns `QUOTE_ONLY`; copy `installationPackage`, `ctaQuoteOnly` |
| AIS is receive-only | Safety status `RECEIVE_ONLY_NO_TRANSMISSION`; limitation copy denies transmission and collision avoidance | `MareaFamilyCard` restriction mapping → `aisReceiveOnly`; fixture `safetyStatus`; copy `aisReceiveOnly`; `FAMILY_LIMIT_KEYS.AIS` |
| SENSE-ESSENTIALS is one kit of POWER + BILGE | The bundle line is one line with `expandsTo: [SENSE-POWER, SENSE-BILGE]`; the kit is rendered as one line with a nested "Includes" note, never two counted lines | `MareaBundleComponents` (renders `expandsTo` as nested text, not extra `<li>`); fixture `expandsTo` and `dependencyIds`; copy `senseEssentialsKit`; `MC17-23` |
| DISPLAY-LARGE-CONDITIONAL invents no dimensions, size or price | Conditional definition status; limitation copy; excluded from bundle selection with reason `CONDITIONAL_SIZE_NOT_SELECTABLE` | `MareaEditionCard` (`CONDITIONAL` badge); `MareaBundleExclusions`; fixture ineligible row in CRUISE and COMPLETE; copy `displayConditional`; `FAMILY_LIMIT_KEYS.DISPLAY` |
| WATCH guarantees no alerts; local functions are not subscription-dependent | Limitation copy states alerts are not guaranteed and continuous remote monitoring is not provided; entitlement rows state local safety functions do not depend on a subscription payment | `MareaFamilyCard` restriction mapping → `watchNoGuarantee`; `MareaEntitlementSummary` → `localSafetyIndependent`; fixture `LOCAL:SAFETY_NOT_BILLABLE` shared ledger |
| FLEET has no default hardware, no SLA, no customer examples | Bundle summary flags `hardwareIncludedByDefault: false` and `slaEstablished: false`; limitation copy states both; no customer example fixture exists | `MareaFamilyCard` restriction mapping → `fleetNoHardware`; `MareaBundleSummary`; FLEET bundle flags; copy `fleetNoHardware`; `MC17-20` asserts no `"hardwareIncludedByDefault": true` |
| NAV/WEATHER unlicensed data is not included | Both families carry `LICENSING_NOT_CLEARED`; the notice says unlicensed chart and weather data are not represented as included | `restrictionCopyKey('LICENSING_NOT_CLEARED')` → `navWeatherLicensing`; `FAMILY_LIMIT_KEYS.NAV` / `.WEATHER`; fixture family restrictions; `MC17-23` |
| Shared entitlements are one ledger | Entitlements that share a `sharedLedgerKey` collapse into one row with the shared-ledger note | `MareaEntitlementSummary.rows` groups by `sharedLedgerKey`; fixture WATCH + CLOUD share `ACCOUNT:WATCH_MONITORING`; `MC17-24` |

## 6. Bundle presentation

All six bundles are `INTERNAL_ONLY`, `NOT_FOR_SALE`, `checkoutAllowed: false`,
`orderable: false`, `priceApproved: false` and `fixedPackagePriceEstablished: false`.
No bundle displays a package price, a package discount or a buy action.

| Bundle | Required lines | Optional / conditional lines | Exclusions and contract-only | Presentation |
|---|---:|---|---|---|
| START | 2 (HUB-STANDARD, NAV-PRO) | 2 (HUB-PRO, WEATHER-STANDARD) | none | `MareaBundleComponents` |
| CRUISE | 4 (NAV-ESSENTIAL, HUB-STANDARD, AIS-RECEIVER, DISPLAY-7) | 3 (AIS-CONNECTED, NAV-PRO, WEATHER-STANDARD) | DISPLAY-LARGE-CONDITIONAL: `CONDITIONAL_SIZE_NOT_SELECTABLE` | `MareaBundleComponents`, `MareaBundleExclusions` |
| SAIL | 3 (NAV-PRO, HUB-STANDARD, PILOT-COASTAL quotation-required) | 2 (SENSE-WIND, PILOT-SAIL) | PILOT-PRO: `INSTALLATION_PACKAGE_NEVER_A_PRICED_SKU_OR_BUNDLE_LINE` | `MareaBundleComponents`, `MareaBundleExclusions` |
| PROTECT | 2 (WATCH-CORE, SENSE-ESSENTIALS kit) | 2 (WATCH-PLUS, HUB-STANDARD) | none | `MareaBundleComponents` |
| COMPLETE | 9 (NAV-PRO, HUB-PRO, DISPLAY-7, WATCH-CORE, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV, PILOT-COASTAL quotation-required) | 3 (PILOT-SAIL, AIS-RECEIVER, WEATHER-PRO) | PILOT-PRO and DISPLAY-LARGE-CONDITIONAL ineligible | `MareaBundleComponents`, `MareaBundleExclusions` |
| FLEET | 1 (FLEET-START) | 3 (WATCH-CORE, HUB-STANDARD, FLEET-BUSINESS) | FLEET-ENTERPRISE contract-only: `CONTRACTED_B2B_TIER_NOT_SELF_SERVICE` | `MareaBundleComponents`, `MareaBundleExclusions` |

`MareaBundleExclusions` renders an explicit empty state (`noneRecorded`) instead of
silently omitting an empty exclusion set. Every bundle in the fixture also carries the
external requirements `installation`, `cabling`, `commissioning`, licensed chart/weather
data where applicable and SIM/connectivity where applicable.

## 7. Entitlements: one ledger

`MareaEntitlementSummary` groups definitions by `sharedLedgerKey`. The fixture exercises
two actual shared ledgers:

- `ACCOUNT:WATCH_MONITORING` shared by `ENT-WATCH` and `ENT-CLOUD-MONITORING`.
- `LOCAL:SAFETY_NOT_BILLABLE` shared by `ENT-PILOT-LOCAL` and `ENT-SENSE-LOCAL`.

The row shows the joined names, the term(s), and the shared-ledger note
(`sharedEntitlement`). It also shows `localSafetyIndependent` where the fixture says
`true`. Terms are language-neutral domain codes (`YEAR`, `MONTH`, `NONE`), never an offer
or a billing amount. `billingImplemented` and `entitlementLedgerActive` are `false` in
`entitlement-definitions.json`.

## 8. What the system cannot represent

These absences are structural, not editorial:

- No price amount: `MareaPriceUnavailable` accepts only an opaque status string; no
  amount, currency or numeric API exists (`MC17-19`).
- No stock quantity: `MareaStockUnavailable` accepts only an opaque state string.
- No delivery, lead time, guarantee, SLA, certification or performance claim.
- No merchant SKU code and no 27th edition.
- No customer, vessel, telemetry or testimonial fixture.
- No Product/Offer structured data (`MC17-31`), route, sitemap entry or public asset.

## 9. Verification map

| Check | Assertion |
|---|---|
| `MC17-20` | PILOT blocked, AIS receive-only, FLEET without default hardware |
| `MC17-21` | 9 families, 26 editions, 6 bundles represented from MC-16 data |
| `MC17-22` | Fixtures synthetic; no commercial or personal fields |
| `MC17-23` | PILOT/AIS/WATCH/FLEET/SENSE/DISPLAY/NAV limits stated in copy; no autonomy claim |
| `MC17-24` | Shared entitlement ledgers grouped and exercised by fixtures |
| `MC17-26` | One component set and exactly 26 edition ids |

The run command is `npm run test:design-system`. The recorded run in
`docs/marea/design-system/evidence/validator-run.json` is overall **FAIL (38/38 (current; earlier snapshots superseded))**, but the
five portfolio checks above are recorded **PASS**: `MC17-20`, `MC17-21`, `MC17-22`,
`MC17-23` and `MC17-24`. The failures are missing-file/document-set items unrelated to the
portfolio counts (`MC17-32`/`33`/`34`/`35`/`36`); three of those files were added after the
run, so the evidence is stale. Overall status is not a pass.

## 10. Known gaps

- **Not independently reviewed.** No `MC17-INDEPENDENT-REVIEW.md` exists yet.
- **No measured validator output committed.** The evidence file is absent.
- **Edition-level presentation is sampled, not exhaustive.** The commerce gallery renders
  NAV-ESSENTIAL, PILOT-PRO and DISPLAY-LARGE-CONDITIONAL; all 26 are representable by the
  fixture and data contract, but only those three are visually exercised in the gallery.
- **Bundle gallery is sampled.** START, FLEET and COMPLETE are rendered; CRUISE, SAIL and
  PROTECT are represented in data but not individually exhibited.
- **No real price, stock or API integration exists**, by design.

## 11. Source map

- `docs/marea/commerce-data/MC16-MC17-HANDOFF.md`
- `docs/marea/commerce-data/data/{product-families,product-editions,bundle-compositions,readiness-dimensions,entitlement-definitions}.json`
- `src/app/marea-design-system/core/types.ts`
- `src/app/marea-design-system/data/commerce-presentation.adapter.ts`
- `src/app/marea-design-system/data/fixtures/marea-fixtures.generated.ts`
- `src/app/marea-design-system/components/commerce/*`
- `preview/catalogue/app/galleries/commerce.gallery.ts`
- `scripts/check-marea-design-system.mjs`

Historical and governance values are unchanged: `MC16_VERDICT = PARTIAL`,
`MC17_STARTED` is not asserted as true by this document, `MC18_STARTED = false`, and no
publication, deployment, market or brand adoption is claimed.
