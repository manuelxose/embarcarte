# MC-15 — MC-16 handoff (D17)

| Field | Value |
|---|---|
| Deliverable | D17 `MC15-MC16-HANDOFF.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Date | 2026-11-02 |
| Owner | legal-governance |
| Machine data | `data/mc16-handoff-inputs.json` (`MAREA-MC15-MC16-HANDOFF-INPUTS`) |
| Next milestone | MC-16 — commerce and product data model |
| Handoff status | `READY_FOR_MC16_WITH_NAMED_GAPS` |
| `MC16_STARTED` | `false` |
| `mc16ExecutionAuthorized` | `false` |
| Publication / indexation / commerce | NOT_AUTHORIZED |
| Route identities | 21 current + 23 proposed |
| Family ids | 9 (`NAV` … `FLEET`) |
| Edition ids | 26 (MC-05 … MC-08) |
| Bundle ids | 6 (`START` … `FLEET`) |
| Commercial gates carried | 13 (0 closed) |
| Website findings carried | 34 (0 remediated) |

## 1. Boundary and status

This is a handoff contract only. MC-16 has **not started** and is not authorised by this
file. MC-15 does not design the MC-16 commerce model, schema, API, checkout, billing,
entitlement service or deployment; it records the inputs and constraints MC-16 must
consume.

The correct reading of this handoff is: the IA/SEO side of MC-15 is planned and mapped,
but every commercial input remains blocked. `READY_FOR_MC16_WITH_NAMED_GAPS` means the
inputs are documented, not that MC-16 may begin or that any product may be sold.

## 2. Stable route identities

### 2.1 Proposed routes (23, all `PROPOSED_INTERNAL_NOT_DEPLOYABLE`)

Every proposed route has `routeDefined=true`, `implementationReady=false`,
`publicationAuthorized=false`, `indexationAuthorized=false` and
`commercialTransactionAuthorized=false`.

| Route | Entity | Page type |
|---|---|---|
| `mareaOverview` | ENT-HUB-MAREA | PAGE_MAREA_OVERVIEW |
| `mareaProducts` | ENT-HUB-PRODUCTS | PAGE_PRODUCT_INDEX |
| `mareaSolutions` | ENT-HUB-SOLUTIONS | PAGE_SOLUTION_INDEX |
| `mareaFamilyNav` | ENT-FAMILY-NAV | PAGE_PRODUCT_FAMILY |
| `mareaFamilyHub` | ENT-FAMILY-HUB | PAGE_PRODUCT_FAMILY |
| `mareaFamilyAis` | ENT-FAMILY-AIS | PAGE_PRODUCT_FAMILY |
| `mareaFamilyPilot` | ENT-FAMILY-PILOT | PAGE_PRODUCT_FAMILY |
| `mareaFamilySense` | ENT-FAMILY-SENSE | PAGE_PRODUCT_FAMILY |
| `mareaFamilyWatch` | ENT-FAMILY-WATCH | PAGE_PRODUCT_FAMILY |
| `mareaFamilyDisplay` | ENT-FAMILY-DISPLAY | PAGE_PRODUCT_FAMILY |
| `mareaFamilyWeather` | ENT-FAMILY-WEATHER | PAGE_PRODUCT_FAMILY |
| `mareaFamilyFleet` | ENT-FAMILY-FLEET | PAGE_PRODUCT_FAMILY |
| `mareaSolutionStart` | ENT-BUNDLE-START | PAGE_BUNDLE_SOLUTION |
| `mareaSolutionCruise` | ENT-BUNDLE-CRUISE | PAGE_BUNDLE_SOLUTION |
| `mareaSolutionSail` | ENT-BUNDLE-SAIL | PAGE_BUNDLE_SOLUTION |
| `mareaSolutionProtect` | ENT-BUNDLE-PROTECT | PAGE_BUNDLE_SOLUTION |
| `mareaSolutionComplete` | ENT-BUNDLE-COMPLETE | PAGE_BUNDLE_SOLUTION |
| `mareaSolutionFleet` | ENT-BUNDLE-FLEET | PAGE_BUNDLE_SOLUTION |
| `mareaConfigurator` | ENT-TOOL-CONFIGURATOR | PAGE_CONFIGURATOR |
| `professionals` | ENT-PAGE-PROFESSIONALS | PAGE_PROFESSIONAL |
| `installers` | ENT-PAGE-INSTALLERS | PAGE_INSTALLER_PROGRAM |
| `support` | ENT-PAGE-SUPPORT | PAGE_SUPPORT |
| `productDocumentation` | ENT-DOC-PRODUCT | PAGE_PRODUCT_DOCUMENTATION |

### 2.2 Current routes (21, retained)

MC-16 must not move, rename or redirect these identities. Commerce-relevant surfaces are
marked.

| Route | ES path | EN path | Indexability |
|---|---|---|---|
| `home` | `/` | `/en` | indexable |
| `technology` | `/tecnologia` | `/en/technology` | indexable |
| `technologyDetail` | `/tecnologia/:slug` | `/en/technology/:slug` | indexable |
| `experiences` | `/experiencias` | `/en/experiences` | indexable |
| `delivery` | `/traslados` | `/en/delivery` | indexable |
| `services` | `/servicios` | `/en/services` | indexable |
| `about` | `/sobre-nosotros` | `/en/about` | indexable |
| `contact` | `/contacto` | `/en/contact` | indexable |
| `guides` | `/guias` | `/en/guides` | indexable |
| `guideDetail` | `/guias/:slug` | `/en/guides/:slug` | indexable |
| `shop` | `/tienda` | `/en/shop` | indexable (commerce) |
| `shopDetail` | `/tienda/:slug` | `/en/shop/:slug` | conditional: active translated product only (commerce) |
| `shopSample` | `/tienda/muestra/:slug` | `/en/shop/sample/:slug` | noindex, non-sale (commerce control) |
| `cart` | `/carrito` | `/en/cart` | noindex, private (commerce) |
| `login` | `/acceso` | `/en/login` | noindex, private (auth) |
| `account` | `/cuenta` | `/en/account` | noindex, private (commerce) |
| `orderDetail` | `/cuenta/pedidos/:id` | `/en/account/orders/:id` | noindex, private (commerce) |
| `legalNotice` | `/aviso-legal` | `/en/legal-notice` | indexable |
| `privacy` | `/privacidad` | `/en/privacy` | indexable |
| `cookies` | `/cookies` | `/en/cookies` | indexable |
| `termsOfSale` | `/condiciones-de-venta` | `/en/terms-of-sale` | indexable |

## 3. Family ids (9)

All families are `DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE`. Readiness is dimensioned;
the table abbreviates engineering (ENG), licensing (LIC), hardware (HW), data rights
(DATA), pricing (PRC) and availability (AVL).

| Family | Type | ENG | LIC | HW | DATA | PRC | AVL | Editions |
|---|---|---|---|---|---|---|---|---|
| NAV | SOFTWARE | PARTIALLY_VERIFIED | NOT_CLEARED | N/A software | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| HUB | HARDWARE | PARTIALLY_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| AIS | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| PILOT | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 3 |
| SENSE | HARDWARE | PARTIALLY_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 8 |
| WATCH | HARDWARE_SERVICE | NOT_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| DISPLAY | HARDWARE | NOT_VERIFIED | NOT_CLEARED | NOT_SELECTED | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| WEATHER | SOFTWARE | NOT_VERIFIED | NOT_CLEARED | N/A software | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 2 |
| FLEET | SAAS | NOT_VERIFIED | NOT_CLEARED | N/A software | NOT_GRANTED | HYPOTHESIS_UNAPPROVED | NOT_FOR_SALE | 3 |

All nine have `definition = COMPLETE_TARGET_SPECIFICATION`, `compliance = NOT_STARTED`
and `brandPublication = NOT_GRANTED`. No family has `OPERATIONS_READY` or
`COMMERCIALLY_AVAILABLE`.

## 4. Edition ids (26)

The edition id is the stable identity candidate for a future SKU. No merchant SKU code
exists and MC-16 must not invent one. All editions are `merchantable=false` and
`priceApproved=false`.

| Edition | Family | Verdict | Price status | Notes |
|---|---|---|---|---|
| NAV-ESSENTIAL | NAV | DEFINED | HYPOTHESIS_UNAPPROVED | Annual software entitlement |
| NAV-PRO | NAV | DEFINED | HYPOTHESIS_UNAPPROVED | Annual software entitlement; live overlays |
| HUB-STANDARD | HUB | DEFINED | HYPOTHESIS_UNAPPROVED | Hardware, not selected |
| HUB-PRO | HUB | DEFINED | HYPOTHESIS_UNAPPROVED | Wider envelope, not validated |
| AIS-RECEIVER | AIS | DEFINED | HYPOTHESIS_UNAPPROVED | Receive-only; no transmission |
| AIS-CONNECTED | AIS | CONDITIONAL | HYPOTHESIS_UNAPPROVED | Conditional networking/diagnostics |
| PILOT-COASTAL | PILOT | DEFINED | HYPOTHESIS_UNAPPROVED | Quotation after survey; safety gate BLOCKED |
| PILOT-SAIL | PILOT | CONDITIONAL | NOT_ESTABLISHED | Wind-angle steering conditional |
| PILOT-PRO | PILOT | INSTALLATION_PACKAGE | NOT_APPLICABLE | Never a priced SKU, bundle line or checkout item |
| SENSE-WIND | SENSE | DEFINED | NOT_ESTABLISHED | Module SKU |
| SENSE-POWER | SENSE | DEFINED | NOT_ESTABLISHED | Module SKU |
| SENSE-BILGE | SENSE | DEFINED | NOT_ESTABLISHED | Module SKU |
| SENSE-TANKS | SENSE | DEFINED | NOT_ESTABLISHED | Module SKU |
| SENSE-ENV | SENSE | DEFINED | NOT_ESTABLISHED | Module SKU |
| SENSE-ESSENTIALS | SENSE | DEFINED | NOT_ESTABLISHED | Kit = SENSE-POWER + SENSE-BILGE |
| SENSE-SAIL | SENSE | CONDITIONAL | NOT_ESTABLISHED | Conditional on measurement validation |
| SENSE-SYSTEMS | SENSE | CONDITIONAL | NOT_ESTABLISHED | Conditional on measurement validation |
| WATCH-CORE | WATCH | DEFINED | HYPOTHESIS_UNAPPROVED | Monitoring subscription required |
| WATCH-PLUS | WATCH | CONDITIONAL | NOT_ESTABLISHED | Not costed or validated |
| DISPLAY-7 | DISPLAY | DEFINED | HYPOTHESIS_UNAPPROVED | 7-inch working class; size NOT frozen |
| DISPLAY-LARGE-CONDITIONAL | DISPLAY | CONDITIONAL | NOT_ESTABLISHED | No price, no size; never selectable |
| WEATHER-STANDARD | WEATHER | DEFINED | HYPOTHESIS_UNAPPROVED | One entitlement ledger |
| WEATHER-PRO | WEATHER | CONDITIONAL | HYPOTHESIS_UNAPPROVED | Same ledger; no double billing |
| FLEET-START | FLEET | DEFINED | HYPOTHESIS_UNAPPROVED | Per vessel/month, VAT excluded |
| FLEET-BUSINESS | FLEET | DEFINED | HYPOTHESIS_UNAPPROVED | Per vessel/month, VAT excluded |
| FLEET-ENTERPRISE | FLEET | CONDITIONAL | NOT_ESTABLISHED | Contracted tier, no checkout SKU, no SLA |

## 5. Bundle ids (6)

All bundles are `DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE`,
`fixedPackagePriceEstablished=false`. A bundle is an entity, not a SKU.

| Bundle | Reference configuration | Readiness | Notes |
|---|---|---|---|
| START | HUB-STANDARD + NAV-PRO | INTERNAL_ONLY_DEFINED | No fixed package price |
| CRUISE | NAV-ESSENTIAL + HUB-STANDARD + AIS-RECEIVER + DISPLAY-7 | INTERNAL_ONLY_DEFINED | AIS-CONNECTED and DISPLAY-LARGE are conditional |
| SAIL | NAV-PRO + HUB-STANDARD + PILOT-COASTAL + SENSE-WIND | BLOCKED | PILOT quotation required; safety gate BLOCKED |
| PROTECT | WATCH-CORE + SENSE-ESSENTIALS | INTERNAL_ONLY_DEFINED | Kit expands to POWER + BILGE; no duplicate module |
| COMPLETE | NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + SENSE-POWER/BILGE/TANKS/ENV + PILOT-COASTAL | BLOCKED | PILOT quotation; PILOT-PRO ineligible |
| FLEET | FLEET-START or FLEET-BUSINESS + separately quoted onboarding/connectivity | INTERNAL_ONLY_DEFINED | `hardwareIncludedByDefault=false`; `slaEstablished=false`; customer-facing name "MAREA FLEET package" |

`PILOT-PRO` is never a priced bundle line, and no bundle provides a fixed-price checkout
path for a PILOT installation.

## 6. Locale and slug mappings

Rules:

1. Spanish public paths stay unprefixed and must not move; English paths are under `/en`.
2. The 23 proposed route ids and slugs are frozen by the MC-15 data contract.
3. Dynamic slugs use the same string in both locales so entity identity is stable.
4. `productDocumentation` slugs are the lowercase family id; an edition id may never appear
   in a URL.
5. No proposed slug may collide with a current route, a legacy redirect or an admin surface.

| Route | ES path | EN path | Dynamic |
|---|---|---|---|
| `mareaOverview` | `/marea` | `/en/marea` | no |
| `mareaProducts` | `/marea/productos` | `/en/marea/products` | no |
| `mareaSolutions` | `/marea/soluciones` | `/en/marea/solutions` | no |
| `mareaFamilyNav` | `/marea/nav` | `/en/marea/nav` | no |
| `mareaFamilyHub` | `/marea/hub` | `/en/marea/hub` | no |
| `mareaFamilyAis` | `/marea/ais` | `/en/marea/ais` | no |
| `mareaFamilyPilot` | `/marea/pilot` | `/en/marea/pilot` | no |
| `mareaFamilySense` | `/marea/sense` | `/en/marea/sense` | no |
| `mareaFamilyWatch` | `/marea/watch` | `/en/marea/watch` | no |
| `mareaFamilyDisplay` | `/marea/display` | `/en/marea/display` | no |
| `mareaFamilyWeather` | `/marea/weather` | `/en/marea/weather` | no |
| `mareaFamilyFleet` | `/marea/fleet` | `/en/marea/fleet` | no |
| `mareaSolutionStart` | `/marea/soluciones/start` | `/en/marea/solutions/start` | no |
| `mareaSolutionCruise` | `/marea/soluciones/cruise` | `/en/marea/solutions/cruise` | no |
| `mareaSolutionSail` | `/marea/soluciones/sail` | `/en/marea/solutions/sail` | no |
| `mareaSolutionProtect` | `/marea/soluciones/protect` | `/en/marea/solutions/protect` | no |
| `mareaSolutionComplete` | `/marea/soluciones/complete` | `/en/marea/solutions/complete` | no |
| `mareaSolutionFleet` | `/marea/soluciones/fleet` | `/en/marea/solutions/fleet` | no |
| `mareaConfigurator` | `/marea/configurador` | `/en/marea/configurator` | no |
| `professionals` | `/profesionales` | `/en/professionals` | no |
| `installers` | `/instaladores` | `/en/installers` | no |
| `support` | `/soporte` | `/en/support` | no |
| `productDocumentation` | `/soporte/marea/:slug` | `/en/support/marea/:slug` | yes, family id |

## 7. Page identity versus SKU identity

| Identity | Granularity | Identifier | Rule |
|---|---|---|---|
| Page | PAGE | `routeId` / `pageId` | Represents a family, bundle, tool, index or documentation entity; never a single edition. |
| Entity | ENTITY | `entityId` | Stable binding across locales and future models. |
| SKU candidate | SKU | `editionId` | Stable identity; no separate merchant SKU code exists yet. |
| Entitlement | ENTITLEMENT | `SE-*` / `RS-*` | Licensed capability reference; neither page nor SKU. |

Consequences for MC-16:

- No page may be created per edition, per price, per stock state or per additional locale.
- One family page exposes zero or more editions; indexability is independent of edition
  merchantability, but still gate-controlled.
- A bundle page represents a bundle entity, not a SKU.
- `PILOT-PRO` is an `INSTALLATION_PACKAGE`; it is neither a SKU nor a page.
- The documentation entity is keyed by family id, never by edition id.
- Page, SKU and entitlement identities must stay separate foreign keys.

## 8. Lifecycle and readiness fields

| Field set | Values |
|---|---|
| Lifecycle | `CONCEPT`, `DEFINED`, `ENGINEERING_VERIFIED`, `REGULATORY_READY`, `OPERATIONS_READY`, `COMMERCIALLY_AVAILABLE`, `RETIRED` |
| Current lifecycle | All families `DEFINED`; editions `DEFINED` or `CONDITIONAL`; 0 `COMMERCIALLY_AVAILABLE` |
| Readiness dimensions | definition, engineering, licensing, hardware, dataRights, compliance, pricing, brandPublication, availability |
| Edition verdicts | `DEFINED`, `CONDITIONAL`, `INSTALLATION_PACKAGE` |
| Price statuses | `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED`, `NOT_APPLICABLE` |
| Page states | `routeDefined`, `implementationReady`, `publicationAuthorized`, `indexationAuthorized`, `commercialTransactionAuthorized` |

Page states are independent of product lifecycle and readiness. A page state never
promotes a product lifecycle, and a product lifecycle never authorises a page.

## 9. Commercial availability gates

13 gates, 0 closed, 12 `BLOCKED`, 1 `EVIDENCE_REQUIRED`, 24 documents (0 executed). MC-16
must treat every gate as open. A test pass, a build, a document draft, an internal decision
or the existence of this handoff closes nothing.

| Gate | Status | MC-16 dependency |
|---|---|---|
| GATE-MARKET-PLACEMENT | BLOCKED | No product placed on the market; no CE/traceability attributes |
| GATE-SAFETY-PILOT | BLOCKED | PILOT unorderable; no safety or autonomy attribute |
| GATE-IP-CLEARANCE | BLOCKED | No brand, ownership or licence attribute |
| GATE-DATA-LICENSING | BLOCKED | No chart/weather licensed-data entitlement |
| GATE-PRIVACY-DPA-DPIA | BLOCKED | No customer/vessel/telemetry data activation |
| GATE-CRA-CYBERSECURITY | BLOCKED | No support-period or security attribute |
| GATE-CONSUMER-TERMS | BLOCKED | No order, renewal or withdrawal state machine |
| GATE-COMMERCIAL-CLAIMS | BLOCKED | No claim, compatibility or availability attribute |
| GATE-PRICING | BLOCKED | No customer-visible price or VAT representation |
| GATE-PAYMENTS | BLOCKED | No payment, refund or chargeback state |
| GATE-INSURANCE | BLOCKED | No insurance or liability statement |
| GATE-LEGAL-ENTITY | BLOCKED | No seller, merchant-of-record or invoice identity |
| GATE-WEBSITE-REMEDIATION | EVIDENCE_REQUIRED | Existing shop/legal/SEO surfaces stay blocked |

## 10. SEO publication eligibility

| Surface | Publication | Indexation | Sitemap |
|---|---|---|---|
| 23 proposed routes | false | false | false |
| Current routes | retained as-is | unchanged | unchanged |
| `shop` | existing | indexable | existing behaviour |
| `shopDetail` | existing | conditional: active translated product | conditional |
| `shopSample` | existing | noindex | excluded |
| `cart`, `login`, `account`, `orderDetail` | existing | noindex | excluded |

Metadata rules: no MAREA in any title/description/OG/Twitter card until clearance; no
availability, stock, price, delivery, certification or performance wording; canonical
self-referencing; reciprocal hreflang; `x-default` home-only; no alternate for an
untranslated page; a blocked page never enters the sitemap even if it resolves locally.
Indexation state is `SEARCH_CONSOLE_VERIFIED_PARTIAL`: a read-only 24-URL sample from
`sc-domain:embarcarte.com` (2026-11-02/03) records 16 indexed, 2 noindex, 5 not
recognized and 1 public/indexable URL not indexed (`/traslados`); everything outside
the sample is `INDEXATION_UNVERIFIED`. This does not authorize MC-16 or any
publication.

## 11. Structured-data restrictions

| Node / field | Restriction |
|---|---|
| `Product` for MAREA | PROHIBITED |
| `Offer` | PROHIBITED |
| `price`, `priceCurrency` | PROHIBITED |
| `availability` | PROHIBITED |
| `aggregateRating`, `review` | PROHIBITED |
| Certification/conformity markup | PROHIBITED |
| `brand` | Must not assert registered status; "Open Marine" must not be a Product brand until IPR-13/IPR-15 close |
| `Organization` legal fields | BLOCKED until verified legal identity |
| `BreadcrumbList` | Only for an authorised, published tree; no proposed route qualifies |
| Admin-derived price/stock | Never emitted as an offer while GATE-PRICING is open |

The final schema policy belongs to MC-15 D10; MC-16 must consume D10 plus this list and
must not expand eligibility. Model structured-data eligibility as a derived state that is
false for every MAREA entity while any blocking gate is open.

## 12. Price and stock provenance

| Aspect | Current state |
|---|---|
| Source files | `src/server/db.ts`, `src/server/api.ts`, `src/app/features/shop/shop-detail.ts` |
| Price field | `price_cents`, single integer, no VAT rate/base/territory |
| Stock field | `stock`, admin-entered integer, no fulfilment or reservation record |
| Active flag | `active`, admin-controlled |
| Server authority | Price and stock re-read server-side; client changes rejected |
| Structured data | Derived directly from admin price and stock — a defect (WEB-014) |
| Approved price | `NONE` (`PRICE_APPROVED = NONE`) |
| Approved stock | `NONE`; no stock record exists |
| VAT configuration | absent |
| Public price/availability | NOT_AUTHORIZED |

MC-16 requirements: store provenance separately from hypothesis values; never derive an
offer, JSON-LD node or checkout amount from `HYPOTHESIS_UNAPPROVED` data; keep
server-authoritative validation; keep the sample catalogue non-sale and noindex-separated.

## 13. Entitlement and subscription references

| Entitlement | Bundle | Term | Status |
|---|---|---|---|
| SE-ST-01 NAV-PRO annual software | START | YEAR | HYPOTHESIS_UNAPPROVED |
| SE-ST-02 HUB local software | START | NONE | NOT_APPLICABLE |
| SE-CR-01 NAV-ESSENTIAL annual software | CRUISE | YEAR | HYPOTHESIS_UNAPPROVED |
| SE-CR-02 DISPLAY base software | CRUISE | NONE | NOT_APPLICABLE |
| SE-CR-03 HUB and AIS local software | CRUISE | NONE | NOT_APPLICABLE |
| SE-SL-01 NAV-PRO annual software | SAIL | YEAR | HYPOTHESIS_UNAPPROVED |
| SE-SL-02 PILOT local steering and safety | SAIL | NONE | NOT_APPLICABLE |
| SE-PR-01 WATCH monitoring | PROTECT | MONTH | HYPOTHESIS_UNAPPROVED |
| SE-PR-02 SENSE local measurement and alarms | PROTECT | NONE | NOT_APPLICABLE |
| SE-CP-01 NAV-PRO annual software | COMPLETE | YEAR | HYPOTHESIS_UNAPPROVED |
| SE-CP-02 WATCH monitoring | COMPLETE | MONTH | HYPOTHESIS_UNAPPROVED |
| SE-CP-03 DISPLAY base software | COMPLETE | NONE | NOT_APPLICABLE |
| SE-CP-04 PILOT local steering and safety | COMPLETE | NONE | NOT_APPLICABLE |
| SE-FP-01 FLEET per-vessel SaaS | FLEET | MONTH | HYPOTHESIS_UNAPPROVED |
| SE-FP-02 Roles, tenant isolation, audit, export/deletion | FLEET | NONE | NOT_APPLICABLE |
| SE-FP-03 WATCH monitoring (optional) | FLEET | MONTH | HYPOTHESIS_UNAPPROVED |

| Recurring subscription | Bundle | Family | Period | Status |
|---|---|---|---|---|
| RS-ST-01 NAV_PRO_SUBSCRIPTION | START | NAV | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-ST-02 WEATHER_SUBSCRIPTION | START | WEATHER | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-CR-01 NAV_ESSENTIAL_SUBSCRIPTION | CRUISE | NAV | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-CR-02 WEATHER_SUBSCRIPTION | CRUISE | WEATHER | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-SL-01 NAV_PRO_SUBSCRIPTION | SAIL | NAV | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-SL-02 PILOT_LOCAL_SAFETY | SAIL | PILOT | NONE | NOT_APPLICABLE |
| RS-PR-01 WATCH_MONITORING_SUBSCRIPTION | PROTECT | WATCH | MONTH | HYPOTHESIS_UNAPPROVED |
| RS-PR-02 SIM_DATA_PLAN | PROTECT | — | MONTH | NOT_ESTABLISHED |
| RS-CP-01 NAV_PRO_SUBSCRIPTION | COMPLETE | NAV | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-CP-02 WATCH_MONITORING_SUBSCRIPTION | COMPLETE | WATCH | MONTH | HYPOTHESIS_UNAPPROVED |
| RS-CP-03 WEATHER_SUBSCRIPTION | COMPLETE | WEATHER | YEAR | HYPOTHESIS_UNAPPROVED |
| RS-FP-01 FLEET_SAAS_SUBSCRIPTION | FLEET | FLEET | MONTH | HYPOTHESIS_UNAPPROVED |
| RS-FP-02 WATCH_MONITORING_SUBSCRIPTION | FLEET | WATCH | MONTH | HYPOTHESIS_UNAPPROVED |

`billingImplemented=false` and `entitlementLedgerImplemented=false`. WEATHER uses one
entitlement ledger; the same entitlement is never billed twice; cancelling NAV never
deletes user-owned WEATHER records. Local safety-relevant function never depends on
subscription state.

## 14. Current commerce integration risks

| Risk | Severity | Description | Gate(s) |
|---|---|---|---|
| CIT-01 | BLOCKING | Admin product row is the only offer source; activation would publish unapproved price/stock. | PRC, CLM, MKT |
| CIT-02 | MAJOR | Product/Offer JSON-LD derives from admin price/stock and "Open Marine" brand. | CLM, IPC |
| CIT-03 | MAJOR | Order email says "Gracias por tu pedido" before seller acceptance. | CON |
| CIT-04 | MAJOR | Registration consent is displayed but never stored. | PRI |
| CIT-05 | MAJOR | Shipping/installation excluded from cart total. | CON, PRC |
| CIT-06 | MAJOR | One checkbox bundles privacy acknowledgement with contractual acceptance; no model form. | CON, PRI |
| CIT-07 | MAJOR | Subscription/entitlement references are hypotheses; no ledger or billing exists. | CON, PRC, PAY |
| CIT-08 | MINOR | Sample catalogue must stay non-sale/noindex through any refactor. | — |
| CIT-09 | MINOR | Google Identity Services not disclosed in cookie information. | LGE, PRI |
| CIT-10 | BLOCKING | Seller legal identity empty and publicly admitted as pending. | LGE |

## 15. MC-14 dependencies

MC-16 inherits the MC-14 gate set, the claims policy and the brand state. It must not
modify them.

| Dependency | Status | Consequence |
|---|---|---|
| 13 release gates | 0 closed | No availability, price, certification, licence or transaction |
| 24 required documents | 0 executed | No evidence artefact exists |
| 42 bilingual claims | 0 public | No public claim is authorised |
| Brand state | `NOT_GRANTED` / `NO_GO` | No MAREA public use, no registered symbol |
| 34 website findings | 0 remediated | Existing shop/legal/SEO surfaces stay blocked |
| MC-13 residual debt | OPEN | F-05, F-11, F-14 remain open and untouched |

## 16. Unresolved website remediation

34 findings carried: 6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL. All remain
`NOT_REMEDIATED` at source and `PLANNED_NOT_REMEDIATED` in MC-15. The blocking items are
WEB-001, WEB-002, WEB-003, WEB-004, WEB-005 and WEB-006. MC-16 must treat every finding as
open; a planned remediation is not a remediation. Full mapping: D14 and
`data/website-remediation.json`.

## 17. Open dependencies and MC-16 preconditions

| Dependency | Owner role | Gate | Status |
|---|---|---|---|
| Separate MC-16 authorisation | PROGRAMME_LEAD | — | NOT_GRANTED |
| Legal identity and legal pack | COMMERCIAL_DIRECTOR | LGE | BLOCKED |
| MAREA trademark and public use | LEGAL_COUNSEL | IPC | NOT_GRANTED |
| OPEN-MARINE ownership/licence | LEGAL_COUNSEL | IPC | NOT_CLEARED |
| Chart and weather licences | DATA_RIGHTS_OWNER | DAT | NOT_GRANTED |
| DPIA, DPA and privacy notices | DPO | PRI | BLOCKED |
| CRA classification and support period | SECURITY_LEAD | CRA | BLOCKED |
| Consumer, B2B and subscription terms | LEGAL_COUNSEL | CON | BLOCKED |
| Approved claims and bilingual parity | COMMERCIAL_DIRECTOR | CLM | NOT_AUTHORIZED |
| Approved price list and VAT basis | FINANCE_LEAD | PRC | NONE |
| Merchant agreement and checkout evidence | FINANCE_LEAD | PAY | BLOCKED |
| Product liability insurance | FINANCE_LEAD | INS | BLOCKED |
| EU market placement and traceability | PRODUCT_COMPLIANCE_ENGINEER | MKT | BLOCKED |
| PILOT safety case | HARDWARE_LEAD | PIL | BLOCKED |
| Website findings closure | COMMERCIAL_DIRECTOR | WEB | EVIDENCE_REQUIRED |
| Sample-commerce decision | COMMERCIAL_DIRECTOR | CON | UNDECIDED |

The ten MC-16 preconditions are all unmet: authorisation, 13 gates, 24 documents, 34
findings, legal identity/terms, price/VAT/stock provenance, trademark, licensing, privacy
and the PILOT safety case.

## 18. Handoff readiness

| Check | Result |
|---|---|
| 13 gates carried | yes (0 closed) |
| 24 documents carried | yes (0 executed) |
| 9 family ids | yes |
| 26 edition ids | yes |
| 6 bundle ids | yes |
| 23 proposed route identities | yes |
| 21 current route identities | yes |
| 34 findings mapped | yes (0 closed) |
| Prices approved | 0 |
| Stock records present | 0 |
| Certifications granted | 0 |
| Routes published | 0 |
| `MC16_STARTED` | `false` |

Handoff readiness: `READY_FOR_MC16_WITH_NAMED_GAPS`. The IA/SEO inputs are complete for
planning; every commercial input remains blocked, and MC-16 may not start from this
handoff without a separate written authorisation and the named evidence. This document
does not design or execute the MC-16 model.
