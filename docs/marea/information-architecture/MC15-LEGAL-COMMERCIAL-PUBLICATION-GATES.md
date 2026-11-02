# MC-15 — Legal and commercial publication gates (D13)

| Field | Value |
| --- | --- |
| Deliverable | D13 `MC15-LEGAL-COMMERCIAL-PUBLICATION-GATES.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Date | 2026-11-02 |
| Owner | legal-governance |
| Machine data | `data/publication-gates.json` (`MAREA-MC15-PUBLICATION-GATES`) |
| Source commit | `e0be1e457456a401a529e1912770e07ed9a863e4` |
| Status | INTERNAL_PLANNING_ONLY |
| Publication | NOT_AUTHORIZED |
| Live redirect / SEO change | NOT_AUTHORIZED |
| Gates | 13 (0 closed) |
| Required documents | 24 (0 executed, 0 approved) |
| Required evidence items | 72 (0 satisfied) |
| Proposed routes in the gate matrix | 23 (23 `routeDefined`, 0 publication-ready) |
| `MC16_STARTED` | `false` |

## 1. Purpose and boundary

This deliverable turns the 13 MC-14 release-evidence gates into a route-level
publication block for the 23 proposed MC-15 routes. It does not close a gate, does not
execute a document, does not authorise publication, indexation, a redirect, a price, a
stock state, a checkout or a deployment, and does not start MC-16.

A route in this matrix is a planning record. Recording it is not implementing it, and
implementing it is not publishing it.

## 2. Inherited hard restrictions (unchanged)

| Restriction | Value | Effect on MC-15 |
| --- | --- | --- |
| `TRADEMARK_LEGAL_CLEARANCE` | `NOT_GRANTED` | No MAREA public brand use, no `®`/`™`, no registration claim. |
| `MAREA_PUBLIC_USE` | `NO_GO` | No MAREA page title, description, breadcrumb or JSON-LD brand. |
| `SOURCE_IP_CLEARANCE` | `NOT_CLEARED` | No ownership or open-source statement. |
| `COMMERCIAL_AVAILABILITY` | `NOT_FOR_SALE` | No buy, cart, checkout, pre-order or availability wording. |
| `PRICE_APPROVED` | `NONE` | No price, no "from", no VAT-included representation. |
| `LICENSING_RIGHTS_GRANTED` | `false` | No official chart, weather or licensed-data wording. |
| `CUSTOMER_WTP_VALIDATED` | `false` | No willingness-to-pay or demand claim. |
| `PILOT_SAFETY_GATE` | `BLOCKED` | PILOT never purchasable; supervised-steering boundary only. |
| `AIS_TRANSMISSION_OFFERED` | `false` | Receive-only AIS; no transponder or collision-avoidance implication. |
| `FLEET_DEFAULT_HARDWARE` | `false` | FLEET is B2B with no default hardware. |
| `CE_MARKING_CLAIM` | `PROHIBITED` | No CE, RED, EMC, conformity or notified-body claim. |
| `NMEA2000_CERTIFIED` | `false` | No NMEA certification or universal compatibility. |
| `TESTED_COMPATIBILITY_ROWS` | `0` | No compatibility statement without a tested row per device and firmware. |
| `MC14_COMMERCIAL_CLAIMS_PUBLICATION` | `NOT_AUTHORIZED` | 0 of 42 catalogued claims are public; the claims gate stays closed. |
| `PRODUCTION_DEPLOYMENT` | `NOT_AUTHORIZED` | No deployment, merge, sitemap submission or live change. |

## 3. Independent route states

| State | Meaning | Value for the 23 proposed routes |
| --- | --- | --- |
| `routeDefined` | Route identity, ES/EN mapping and entity binding recorded in MC-15 planning data. | `true` |
| `implementationReady` | Component, guard, translation and content source exist and pass implementation tests. | `false` |
| `publicationAuthorized` | Written authorisation after every blocking gate closed with verified evidence. | `false` |
| `indexationAuthorized` | Separate written decision allowing search-engine indexation. | `false` |
| `commercialTransactionAuthorized` | Separate written decision allowing an offer, cart or checkout for the entity. | `false` |

The five states are independent and are never inferred from one another. A successful
build, an SEO test, a sitemap generation, a validator run or a CI pass cannot promote a
route. Promotion requires evidence, a gate closure and a separate written authorisation.

## 4. Gate inventory

Gate codes used in later tables: MKT, PIL, IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, INS,
LGE, WEB.

| Gate | Code | Name | Source status | Closure owner | Families / bundles affected |
| --- | --- | --- | --- | --- | --- |
| `GATE-MARKET-PLACEMENT` | MKT | EU market placement (conformity, DoC, CE, traceability) | BLOCKED | PRODUCT_COMPLIANCE_ENGINEER | NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY; START–COMPLETE |
| `GATE-SAFETY-PILOT` | PIL | PILOT safety gate | BLOCKED | HARDWARE_LEAD | PILOT; SAIL, PROTECT, COMPLETE, FLEET |
| `GATE-IP-CLEARANCE` | IPC | Intellectual-property clearance | BLOCKED | LEGAL_COUNSEL | all nine families; all six bundles |
| `GATE-DATA-LICENSING` | DAT | Marine data licensing | BLOCKED | DATA_RIGHTS_OWNER | NAV, DISPLAY, WEATHER, FLEET, AIS; START, CRUISE, SAIL, COMPLETE, FLEET |
| `GATE-PRIVACY-DPA-DPIA` | PRI | Privacy, DPIA and processor agreements | BLOCKED | DPO | NAV, WATCH, FLEET; PROTECT, COMPLETE, FLEET |
| `GATE-CRA-CYBERSECURITY` | CRA | CRA cybersecurity lifecycle | BLOCKED | SECURITY_LEAD | all nine families; all six bundles |
| `GATE-CONSUMER-TERMS` | CON | Consumer, B2B and installer contracts | BLOCKED | LEGAL_COUNSEL | all nine families; all six bundles |
| `GATE-COMMERCIAL-CLAIMS` | CLM | Commercial claims approval | BLOCKED | COMMERCIAL_DIRECTOR | all nine families; all six bundles |
| `GATE-PRICING` | PRC | Price approval | BLOCKED | FINANCE_LEAD | all nine families; all six bundles |
| `GATE-PAYMENTS` | PAY | Payments and merchant agreement | BLOCKED | FINANCE_LEAD | all nine families; all six bundles |
| `GATE-INSURANCE` | INS | Liability insurance | BLOCKED | FINANCE_LEAD | NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY; START–COMPLETE |
| `GATE-LEGAL-ENTITY` | LGE | Legal identity and website legal pack | BLOCKED | COMMERCIAL_DIRECTOR | all nine families; all six bundles |
| `GATE-WEBSITE-REMEDIATION` | WEB | Website and SEO remediation (MC-15) | EVIDENCE_REQUIRED | COMMERCIAL_DIRECTOR | all nine families; all six bundles |

No gate is `CLOSED_VERIFIED`. `GATE-WEBSITE-REMEDIATION` carries `EVIDENCE_REQUIRED`
because 0 of 34 findings are remediated; the other twelve remain `BLOCKED`.

## 5. Gates mapped to future page types

| Gate | Page types affected | Gate-specific note |
| --- | --- | --- |
| MKT | Product family, bundle, product index, solution index, product documentation | No page may present a product as placed on the market. |
| PIL | Product family, bundle, product/solution index, product documentation | PILOT and PILOT-containing bundles stay non-transactional. |
| IPC | All ten page types | Brand, ownership and licence content block every page type. |
| DAT | Product family, bundle, product/solution index, product documentation | Chart, weather and AIS-derived data wording is blocked. |
| PRI | Product family, bundle, product/solution index, configurator, professionals, installers | Data-collecting pages may not operate before DPIA/DPA. |
| CRA | Product family, bundle, product/solution index, support, product documentation | Support-period and update statements are blocked. |
| CON | Product family, bundle, product/solution index, professionals, installers, support, product documentation | No contractual or pre-contract wording is approved. |
| CLM | All ten page types | Every claim, across every page type, is unauthorised. |
| PRC | Product family, bundle, product index, solution index | No price or price-derived comparison. |
| PAY | Product family, bundle, product index, solution index | No checkout path or payment-related CTA. |
| INS | Product family, bundle, product index, solution index | No insurance or liability statement. |
| LGE | All ten page types | The footer legal block cannot be completed. |
| WEB | All ten page types | No MAREA page may publish before the D14 findings close. |

Post-audit correction (finding IA-01): the route-level blocking set is the sorted union of the
registry, IA and gate-scope derivations, so a page that presents a family or bundle inherits every
gate attached to it. `PAGE_MAREA_OVERVIEW`, `PAGE_PRODUCT_INDEX` and `PAGE_SOLUTION_INDEX` therefore
carry all 13 gates. The union is deliberately conservative and closes or relaxes nothing.

## 6. Route gate matrix (23/23)

Every row has `routeDefined=true`, `implementationReady=false`,
`publicationAuthorized=false`, `indexationAuthorized=false` and
`commercialTransactionAuthorized=false`.

| Route | Entity | Page type | Gates | Docs |
| --- | --- | --- | ---: | ---: |
| `mareaOverview` | ENT-HUB-MAREA | PAGE_MAREA_OVERVIEW | 13 — all | 22 |
| `mareaProducts` | ENT-HUB-PRODUCTS | PAGE_PRODUCT_INDEX | 13 — all | 22 |
| `mareaSolutions` | ENT-HUB-SOLUTIONS | PAGE_SOLUTION_INDEX | 13 — all | 22 |
| `mareaFamilyNav` | ENT-FAMILY-NAV | PAGE_PRODUCT_FAMILY | 12 — MKT, IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 22 |
| `mareaFamilyHub` | ENT-FAMILY-HUB | PAGE_PRODUCT_FAMILY | 10 — MKT, IPC, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 18 |
| `mareaFamilyAis` | ENT-FAMILY-AIS | PAGE_PRODUCT_FAMILY | 11 — MKT, IPC, DAT, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 20 |
| `mareaFamilyPilot` | ENT-FAMILY-PILOT | PAGE_PRODUCT_FAMILY | 11 — MKT, PIL, IPC, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 18 |
| `mareaFamilySense` | ENT-FAMILY-SENSE | PAGE_PRODUCT_FAMILY | 10 — MKT, IPC, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 18 |
| `mareaFamilyWatch` | ENT-FAMILY-WATCH | PAGE_PRODUCT_FAMILY | 11 — MKT, IPC, PRI, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 20 |
| `mareaFamilyDisplay` | ENT-FAMILY-DISPLAY | PAGE_PRODUCT_FAMILY | 11 — MKT, IPC, DAT, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 20 |
| `mareaFamilyWeather` | ENT-FAMILY-WEATHER | PAGE_PRODUCT_FAMILY | 10 — MKT, IPC, DAT, CRA, CON, CLM, PRC, PAY, LGE, WEB | 19 |
| `mareaFamilyFleet` | ENT-FAMILY-FLEET | PAGE_PRODUCT_FAMILY | 10 — IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, LGE, WEB | 15 |
| `mareaSolutionStart` | ENT-BUNDLE-START | PAGE_BUNDLE_SOLUTION | 12 — MKT, IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 22 |
| `mareaSolutionCruise` | ENT-BUNDLE-CRUISE | PAGE_BUNDLE_SOLUTION | 12 — MKT, IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 22 |
| `mareaSolutionSail` | ENT-BUNDLE-SAIL | PAGE_BUNDLE_SOLUTION | 13 — all | 22 |
| `mareaSolutionProtect` | ENT-BUNDLE-PROTECT | PAGE_BUNDLE_SOLUTION | 12 — MKT, PIL, IPC, PRI, CRA, CON, CLM, PRC, PAY, INS, LGE, WEB | 20 |
| `mareaSolutionComplete` | ENT-BUNDLE-COMPLETE | PAGE_BUNDLE_SOLUTION | 13 — all | 22 |
| `mareaSolutionFleet` | ENT-BUNDLE-FLEET | PAGE_BUNDLE_SOLUTION | 11 — PIL, IPC, DAT, PRI, CRA, CON, CLM, PRC, PAY, LGE, WEB | 16 |
| `mareaConfigurator` | ENT-TOOL-CONFIGURATOR | PAGE_CONFIGURATOR | 12 — MKT, PIL, IPC, DAT, PRI, CRA, CON, CLM, PRC, INS, LGE, WEB | 21 |
| `professionals` | ENT-PAGE-PROFESSIONALS | PAGE_PROFESSIONAL | 6 — IPC, PRI, CON, CLM, LGE, WEB | 9 |
| `installers` | ENT-PAGE-INSTALLERS | PAGE_INSTALLER_PROGRAM | 6 — IPC, PRI, CON, CLM, LGE, WEB | 9 |
| `support` | ENT-PAGE-SUPPORT | PAGE_SUPPORT | 6 — IPC, CRA, CON, CLM, LGE, WEB | 10 |
| `productDocumentation` | ENT-DOC-PRODUCT | PAGE_PRODUCT_DOCUMENTATION | 9 — MKT, PIL, IPC, DAT, CRA, CON, CLM, LGE, WEB | 19 |

The machine-readable matrix also carries the exact `blockingGateIds`,
`requiredEvidenceIds` and `requiredDocumentIds` per route.

Scope note (post-audit): the union follows MC-14's recorded gate scope and the actual bundle
composition. PROTECT inherits `GATE-SAFETY-PILOT` through the union even though its reference
configuration contains no PILOT component; FLEET keeps it from the recorded bundle scope. This note
does not clear, relax or reinterpret any gate; it explains why the route-level sets are conservative.

## 7. Required documents (24)

| Document | Name | Status | Gate | Owner |
| --- | --- | --- | --- | --- |
| DOC-01 | EU declaration of conformity | NOT_EXECUTED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-02 | Technical documentation file | NOT_EXECUTED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-03 | Product risk assessment | NOT_EXECUTED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-04 | Accredited test reports | NOT_EXECUTED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-05 | Label, serial and traceability information | NOT_EXECUTED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-06 | Instructions and safety warnings | DRAFT_REQUIRED | MKT | PRODUCT_COMPLIANCE_ENGINEER |
| DOC-07 | Product liability insurance policy | NOT_EXECUTED | INS | FINANCE_LEAD |
| DOC-08 | Third-party notices bundle and SBOM | NOT_EXECUTED | IPC | ENGINEERING_LEAD |
| DOC-09 | IP assignment/licence agreements (OPEN-MARINE) | NOT_EXECUTED | IPC | LEGAL_COUNSEL |
| DOC-10 | Chart and ENC licence | NOT_EXECUTED | DAT | DATA_RIGHTS_OWNER |
| DOC-11 | Weather and marine-data licences | NOT_EXECUTED | DAT | DATA_RIGHTS_OWNER |
| DOC-12 | Privacy notices (ES/EN) | DRAFT_REQUIRED | PRI | DPO |
| DOC-13 | Processor agreements (DPA) and subprocessor register | NOT_EXECUTED | PRI | DPO |
| DOC-14 | Warranty and returns policy | DRAFT_REQUIRED | CON | LEGAL_COUNSEL |
| DOC-15 | Consumer terms of sale | DRAFT_REQUIRED | CON | LEGAL_COUNSEL |
| DOC-16 | B2B supply terms | DRAFT_REQUIRED | CON | LEGAL_COUNSEL |
| DOC-17 | Installer and distributor agreements | NOT_EXECUTED | CON | COMMERCIAL_DIRECTOR |
| DOC-18 | Supplier and manufacturing contracts | NOT_EXECUTED | MKT | PROGRAMME_LEAD |
| DOC-19 | Support, update and end-of-support policy | DRAFT_REQUIRED | CRA | SECURITY_LEAD |
| DOC-20 | Vulnerability reporting and incident-response process | NOT_EXECUTED | CRA | SECURITY_LEAD |
| DOC-21 | Merchant/payment provider agreement | NOT_EXECUTED | PAY | FINANCE_LEAD |
| DOC-22 | Product identity and serial/lot traceability system | NOT_EXECUTED | MKT | HARDWARE_LEAD |
| DOC-23 | DPIA screening and report | NOT_EXECUTED | PRI | DPO |
| DOC-24 | EU declaration of conformity for cybersecurity (CRA) | NOT_EXECUTED | CRA | SECURITY_LEAD |

No document is `EXECUTED`, `SIGNED`, `CERTIFIED` or `APPROVED`. A draft is not evidence.

## 8. Required-evidence catalogue

The dataset records 72 evidence items derived from the MC-14 gate definitions, grouped by
gate: MKT 6, PIL 6, IPC 6, DAT 5, PRI 7, CRA 7, CON 7, CLM 5, PRC 4, PAY 5, INS 5,
LGE 5, WEB 4. Each item names its gate and, where one exists, the document that carries
it. Evidence items without a document require an external artefact that no agent can
produce (safety case, licences, merchant agreement, insurance wording, registration data).

## 9. What promotion would require

To move any proposed route beyond `routeDefined`, all of the following must be true and
recorded outside this dataset:

1. Every blocking gate for that route is `CLOSED_VERIFIED` with an independently verified
   external artefact — not a plan, budget, mock-up or agent opinion.
2. Every linked required document exists and is executed, signed or approved as
   applicable.
3. The relevant D14 website findings are remediated, reviewed and closed with evidence.
4. Claims are approved with bilingual parity, and the brand public-use decision records
   clearance.
5. Verified seller identity exists and the legal pack is complete.
6. A separate written `publicationAuthorized`, `indexationAuthorized` and (where
   applicable) `commercialTransactionAuthorized` decision exists.
7. The three states remain independent: an indexation decision does not authorise a
   commercial transaction, and a publication decision does not index a page.

A passing `npm run build`, `npm run test:seo`, `npm run test:ia-seo` or any local
validator run satisfies none of the above.

## 10. Relationship to the other deliverables

- **D14** (`MC15-WEBSITE-FINDINGS-REMEDIATION-PLAN.md`) maps all 34 findings and keeps
  them `PLANNED_NOT_REMEDIATED`; it is the input to `GATE-WEBSITE-REMEDIATION`.
- **D17** (`MC15-MC16-HANDOFF.md`) carries these gates into the MC-16 handoff without
  closing any of them.
- The MC-15 indexation and structured-data contracts (D09/D10) must consume this matrix;
  a sitemap entry or JSON-LD node for a blocked route is a defect.

## 11. Honest limitations

- This is an internal planning matrix, not legal advice, not a clearance and not a
  publication approval.
- Actual gate closure depends on external parties: accredited laboratories, notified
  bodies, counsel, the trademark office, data providers, insurers, a payment provider and
  company registration evidence.
- The route matrix is conservative by design: an index route inherits every gate of the
  entities it exposes, so over-blocking is preferred to a premature publication.
- No website source file, route, redirect, metadata, price, stock, checkout or deployment
  setting was modified to produce this deliverable.
