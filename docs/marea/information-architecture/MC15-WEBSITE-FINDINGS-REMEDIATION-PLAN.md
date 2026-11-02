# MC-15 — Website findings remediation plan (D14)

| Field | Value |
|---|---|
| Deliverable | D14 `MC15-WEBSITE-FINDINGS-REMEDIATION-PLAN.md` |
| Milestone | MC-15/36 — Bilingual information architecture and SEO migration |
| Date | 2026-11-02 |
| Owner | legal-governance |
| Machine data | `data/website-remediation.json` (`MAREA-MC15-WEBSITE-REMEDIATION`) |
| Authoritative findings source | `docs/marea/legal-commercial/data/website-findings.json` (`MAREA-MC14-WEBSITE-FINDINGS`, baseline `f80c0f02ac14803e9e1539393abbb225d7f49e16`) |
| Findings mapped | 34/34 (`WEB-001` … `WEB-034`) |
| Remediated | 0 |
| Closed | 0 |
| Original status | `NOT_REMEDIATED` for all 34 (unchanged) |
| MC-15 status | `PLANNED_NOT_REMEDIATED` for all 34 |
| `MC16_STARTED` | `false` |

## 1. Purpose and boundary

This deliverable converts the 34 MC-14 website findings into a planning backlog for a
future authorised remediation milestone. It does not remediate, close, verify, waive or
downgrade any finding, and it does not modify any cited source file.

The mapping is deliberately traceable: `findingId`, `currentFile`, `currentLineRange`,
`currentRoute`, `severity`, `riskIds`, `category` and `observedText` are copied from
`website-findings.json`, and `recommendedAction` is that file's `suggestedRemediation`.
MC-15 adds only planning fields: impact, owner role, required evidence, publication gate
and milestone.

## 2. Authoritative routes and the MC-14 handoff discrepancy

The MC-14 handoff (`mc15-handoff-inputs.json#pageByPageIssues`) groups findings by page,
but its grouping is neither exhaustive nor route-accurate. `website-findings.json` is
authoritative. The handoff lists 21 unique findings (13 are missing) and 16 of its
finding-to-route assignments disagree with the authoritative route (three of those use a
non-route group label). The discrepancies are recorded in the dataset and reproduced
below.

### 2.1 Route mismatches and non-route labels

| Finding | Handoff group | Authoritative route | Type |
|---|---|---|---|
| WEB-019 | `/tienda` | `/tecnologia/piloto-automatico` | ROUTE_MISMATCH |
| WEB-020 | `/tienda` | `/tecnologia/hub` | ROUTE_MISMATCH |
| WEB-006 | `/tecnologia` | `/tecnologia/piloto-automatico` | ROUTE_MISMATCH |
| WEB-010 | `/tecnologia` | `/acceso` | ROUTE_MISMATCH |
| WEB-011 | `/tecnologia` | `/carrito` | ROUTE_MISMATCH |
| WEB-007 | `/aviso-legal` | `/privacidad` | ROUTE_MISMATCH |
| WEB-021 | `/aviso-legal` | `/` | ROUTE_MISMATCH |
| WEB-009 | `/privacidad` | `/acceso` | ROUTE_MISMATCH |
| WEB-022 | `/cookies` | `/sobre-nosotros` | ROUTE_MISMATCH |
| WEB-012 | `/carrito` | `/api/orders` | ROUTE_MISMATCH |
| WEB-013 | `/carrito` | `/tienda/:slug` | ROUTE_MISMATCH |
| WEB-014 | `/sobre-nosotros` | `/tienda/:slug` | ROUTE_MISMATCH |
| WEB-015 | `/sobre-nosotros` | `/tecnologia` | ROUTE_MISMATCH |
| WEB-016 | structured data / product detail | `/` | NON_ROUTE_GROUP_LABEL |
| WEB-017 | structured data / product detail | `/tecnologia/navegador` | NON_ROUTE_GROUP_LABEL |
| WEB-018 | structured data / product detail | `/tecnologia/hub` | NON_ROUTE_GROUP_LABEL |

### 2.2 Findings absent from the handoff page mapping

`WEB-002`, `WEB-005`, `WEB-024`, `WEB-025`, `WEB-026`, `WEB-027`, `WEB-028`, `WEB-029`,
`WEB-030`, `WEB-031`, `WEB-032`, `WEB-033`, `WEB-034`.

The handoff's page summary therefore cannot be used as a remediation checklist; the full
34-finding inventory and this plan govern.

## 3. Status policy

| Field | Value | Rule |
|---|---|---|
| `originalStatus` | `NOT_REMEDIATED` | Never changed; MC-15 is not a remediation milestone. |
| `status` | `PLANNED_NOT_REMEDIATED` | Planning classification only; both allowed values keep the finding open. |
| `remediationRequired` | `true` for 30 findings | These require a future source change. |
| `remediationRequired` | `false` for 4 findings (`WEB-031`…`WEB-034`) | Verified controls: preserve, do not "fix". |
| `plannedMilestone` | `POST_MC15` | Remediation happens in a separately authorised milestone after the relevant gate closes. |

A finding may be closed only by a future authorised milestone with verified evidence. No
file listed in `currentFile` is created, edited, moved or deleted by MC-15.

## 4. Coverage summary

| Category | Findings | IDs | Severity | Primary gates |
|---|---:|---|---|---|
| LEGAL_IDENTITY | 2 | WEB-001, WEB-002 | 2 BLOCKING | LGE |
| OWNERSHIP | 2 | WEB-003, WEB-005 | 2 BLOCKING | IPC |
| AVAILABILITY | 1 | WEB-004 | 1 BLOCKING | CLM |
| SAFETY | 3 | WEB-006, WEB-017, WEB-027 | 1 BLOCKING, 2 MAJOR | PIL, CLM, MKT |
| PRIVACY | 3 | WEB-007, WEB-008, WEB-009 | 3 MAJOR | PRI |
| COOKIES | 1 | WEB-010 | 1 MINOR | LGE |
| CHECKOUT | 2 | WEB-011, WEB-012 | 2 MAJOR | CON |
| PRICE | 2 | WEB-013, WEB-023 | 2 MAJOR | PRC, CON |
| STRUCTURED_DATA | 1 | WEB-014 | 1 MAJOR | CLM |
| SEO | 1 | WEB-015 | 1 MAJOR | CLM |
| BRAND | 1 | WEB-016 | 1 MAJOR | IPC |
| COMPATIBILITY | 2 | WEB-018, WEB-019 | 2 MAJOR | IPC, CLM |
| COMMERCIAL_CLAIM | 6 | WEB-020, WEB-021, WEB-022, WEB-025, WEB-026, WEB-029 | 6 MAJOR | CLM, CON |
| WARRANTY | 1 | WEB-028 | 1 MINOR | CON |
| SUBSCRIPTION | 1 | WEB-030 | 1 MINOR | CON |
| OTHER | 5 | WEB-024, WEB-031, WEB-032, WEB-033, WEB-034 | 1 MAJOR, 4 INFORMATIONAL | CON, WEB, PRC, PIL |

Totals: 6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL. Primary-gate distribution:
CLM 9, CON 8, IPC 4, LGE 3, PRI 3, PIL 2, PRC 2, WEB 2, MKT 1.

## 5. Full finding map (34/34)

All rows remain `PLANNED_NOT_REMEDIATED`; `originalStatus` is `NOT_REMEDIATED`.

| Finding | Route | File:lines | Severity | Category | Gate | Owner | Change required |
|---|---|---|---|---|---|---|---|
| WEB-001 | `/aviso-legal` | `site.config.ts:21-26` | BLOCKING | LEGAL_IDENTITY | LGE | COMMERCIAL_DIRECTOR | yes |
| WEB-002 | `/aviso-legal` | `src/app/i18n/es.ts:259-264` | BLOCKING | LEGAL_IDENTITY | LGE | COMMERCIAL_DIRECTOR | yes |
| WEB-003 | `/tecnologia` | `technology-page.content.ts:27-30` | BLOCKING | OWNERSHIP | IPC | LEGAL_COUNSEL | yes |
| WEB-004 | `/tienda` | `src/app/i18n/es.ts:87-90` | BLOCKING | AVAILABILITY | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-005 | `/aviso-legal` | `legal.es.ts:26-32` | BLOCKING | OWNERSHIP | IPC | LEGAL_COUNSEL | yes |
| WEB-006 | `/tecnologia/piloto-automatico` | `technology.es.ts:74-95` | BLOCKING | SAFETY | PIL | HARDWARE_LEAD | yes |
| WEB-007 | `/privacidad` | `legal.es.ts:44-46` | MAJOR | PRIVACY | PRI | DPO | yes |
| WEB-008 | `/privacidad` | `legal.es.ts:63-66` | MAJOR | PRIVACY | PRI | DPO | yes |
| WEB-009 | `/acceso` | `server/api.ts:150-169` | MAJOR | PRIVACY | PRI | DPO | yes |
| WEB-010 | `/acceso` | `core/google-identity.ts:34-46` | MINOR | COOKIES | LGE | DPO | yes |
| WEB-011 | `/carrito` | `shop/cart.ts:83-86` | MAJOR | CHECKOUT | CON | LEGAL_COUNSEL | yes |
| WEB-012 | `/api/orders` | `server/api.ts:402-408` | MAJOR | CHECKOUT | CON | LEGAL_COUNSEL | yes |
| WEB-013 | `/tienda/:slug` | `shop/shop-detail.ts:47` | MAJOR | PRICE | PRC | FINANCE_LEAD | yes |
| WEB-014 | `/tienda/:slug` | `shop/shop-detail.ts:148-164` | MAJOR | STRUCTURED_DATA | CLM | ENGINEERING_LEAD | yes |
| WEB-015 | `/tecnologia` | `technology-page.content.ts:52-56` | MAJOR | SEO | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-016 | `/` | `src/app/i18n/es.ts:35` | MAJOR | BRAND | IPC | COMMERCIAL_DIRECTOR | yes |
| WEB-017 | `/tecnologia/navegador` | `technology.es.ts:15-22` | MAJOR | SAFETY | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-018 | `/tecnologia/hub` | `technology.es.ts:58-70` | MAJOR | COMPATIBILITY | IPC | ENGINEERING_LEAD | yes |
| WEB-019 | `/tecnologia/piloto-automatico` | `technology.es.ts:80-87` | MAJOR | COMPATIBILITY | CLM | ENGINEERING_LEAD | yes |
| WEB-020 | `/tecnologia/hub` | `technology.es.ts:62-65` | MAJOR | COMMERCIAL_CLAIM | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-021 | `/` | `home/home.content.ts:55-85` | MAJOR | COMMERCIAL_CLAIM | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-022 | `/sobre-nosotros` | `about/about.content.ts:35-44` | MAJOR | COMMERCIAL_CLAIM | CLM | COMMERCIAL_DIRECTOR | yes |
| WEB-023 | `/carrito` | `src/app/i18n/es.ts:119-121` | MAJOR | PRICE | CON | LEGAL_COUNSEL | yes |
| WEB-024 | `/condiciones-de-venta` | `legal.es.ts:127-133` | MAJOR | OTHER (withdrawal) | CON | LEGAL_COUNSEL | yes |
| WEB-025 | `/aviso-legal` | `legal.es.ts:19-24` | MAJOR | COMMERCIAL_CLAIM | CON | LEGAL_COUNSEL | yes |
| WEB-026 | `/experiencias` | `experiences/experiences.content.ts:48-54` | MAJOR | COMMERCIAL_CLAIM | CON | COMMERCIAL_DIRECTOR | yes |
| WEB-027 | `/tienda/:slug` | `shop/shop-detail.ts:42-66` | MAJOR | SAFETY | MKT | PRODUCT_COMPLIANCE_ENGINEER | yes |
| WEB-028 | `/condiciones-de-venta` | `legal.es.ts:136-138` | MINOR | WARRANTY | CON | LEGAL_COUNSEL | yes |
| WEB-029 | `/tecnologia` | `technology-page.content.ts:42-48` | MINOR | COMMERCIAL_CLAIM | CLM | ENGINEERING_LEAD | yes |
| WEB-030 | `/condiciones-de-venta` (future) | `bundles/copy/start.es.md:87-88` | MINOR | SUBSCRIPTION | CON | LEGAL_COUNSEL | yes |
| WEB-031 | `/tienda/muestra/:slug` | `shop/sample-detail.ts:44-54` | INFORMATIONAL | OTHER | WEB | ENGINEERING_LEAD | no (control) |
| WEB-032 | `/api/orders` | `server/api.ts:355-365` | INFORMATIONAL | OTHER | PRC | ENGINEERING_LEAD | no (control) |
| WEB-033 | `/` | `layout/footer/footer.ts:37-45` | INFORMATIONAL | OTHER | WEB | ENGINEERING_LEAD | no (control) |
| WEB-034 | `/tecnologia/piloto-automatico` | `products/copy/pilot.es.md:29-31` | INFORMATIONAL | OTHER | PIL | HARDWARE_LEAD | no (control) |

Relative paths are shortened in this table only; the JSON records the exact repository
path, line range, locale, risk IDs and `observedText` for every finding.

## 6. Area-by-area remediation plan

### 6.1 Legal identity (WEB-001, WEB-002)

`SITE.legal` has an owner trade name only; tax ID, address and registry are empty, and
the public legal notice renders "Datos fiscales y domicilio: pendientes de confirmación".
The seller identity required before distance selling is therefore missing and publicly
admitted. Future work: populate the identity from verified registration evidence, remove
the pending fallback, then verify both locales. Gate LGE.

### 6.2 Ownership and open-source claims (WEB-003, WEB-005, WEB-016)

The technology page asserts _"Open Marine es nuestra plataforma abierta"_; the legal
notice states the software is distributed as open source; the site-wide footer presents
"Tecnología Open Marine" as a commercial brand. The programme records no outbound licence,
no assignment and no cleared trademark, and `MAREA_PUBLIC_USE = NO_GO`. Future work:
close the OPEN-MARINE assignment/licence decision, rewrite ownership wording as technical
origin, or substantiate it with signed evidence; keep MAREA and OPEN-MARINE out of public
brand positions until clearance. Gate IPC.

### 6.3 Shop availability language (WEB-004)

The shop meta description instructs users to buy an Open Marine Hub and an autopilot
controller while the portfolio is `NOT_FOR_SALE` and PILOT is blocked. Future work:
replace the shop title/description with a truthful catalogue statement and prohibit
buy/price/availability language until approved SKUs, real stock and fulfilment exist.
Gate CLM.

### 6.4 PILOT safety (WEB-006, WEB-017, WEB-021, WEB-022)

The autopilot page markets "seguridad por diseño" and lists an emergency stop and
watchdog as assurances; the NAV page advertises collision alarms; the home page markets
"Piloto automático — Control inteligente"; the About page claims every system is
bench-tested and permanently supervised. `PILOT_SAFETY_GATE = BLOCKED` and no safety case,
sea trial or independent review exists. Future work: remove safety assurances, publish
only the approved supervised-steering and navigation-aid disclaimers verbatim, mark PILOT
DEFINED/not available and keep every PILOT commerce path closed. Gate PIL with CLM for
the claim wording.

### 6.5 NMEA and compatibility (WEB-018, WEB-019)

The Hub page publishes NMEA 0183/NMEA 2000 inputs and the PILOT page asserts compatibility
with an ST3000-type actuator family. NMEA 2000 is stubs only, no licence or conformance
certificate exists, and `TESTED_COMPATIBILITY_ROWS = 0`. Future work: remove NMEA 2000 and
named-device compatibility until a per-device, per-firmware tested matrix and (if claimed)
a NMEA licence exist. Gates IPC and CLM.

### 6.6 Consent and privacy (WEB-007, WEB-008, WEB-009)

The privacy policy names the controller only by trade name and email, omits Google
Identity Services and Stripe as recipients, and registration consent is dropped because
the endpoint never reads a consent flag. Future work: publish the verified controller
identity, add processors, transfer mechanism and retention, and store policy version,
timestamp and source server-side before account creation. Gate PRI with LGE for identity.

### 6.7 Cookies (WEB-010)

The login page injects the Google Identity Services script at runtime while the cookie
policy says only `emb_session` and `emb_cart` are used. Future work: disclose the
integration, its purpose and storage, and confirm the consent basis before enabling the
button. Gate LGE with PRI.

### 6.8 Cart and checkout (WEB-011, WEB-012, WEB-023, WEB-025)

A single checkbox bundles privacy acknowledgement with contractual acceptance, the
withdrawal summary and model form are absent, the automatic "Gracias por tu pedido" email
conflates acknowledgement with acceptance, shipping/installation costs are confirmed
later, and the legal notice says the content is not a binding offer while the shop accepts
orders. Future work: separate consent from contract acceptance, present the withdrawal
right and model form before the order button, separate acknowledgement from seller
acceptance, show the final payable amount including delivery/installation, and reconcile
binding versus informational surfaces. Gate CON.

### 6.9 Withdrawal and warranty (WEB-024, WEB-028)

The withdrawal exclusion extends to "productos configurados" (broader than the CRD
custom-made exception), the model withdrawal form is missing, and the three-year
conformity guarantee has no claim channel, proof rule, contact identity or new/second-hand
distinction. Future work: narrow the exclusion, add the Annex I(B) form, state return-cost
allocation, and add the guarantee procedure linked to verified identity. Gate CON with LGE.

### 6.10 Subscriptions (WEB-030)

Recurring-payment terms exist only in an internal, unpublished bundle draft. Future work:
before any NAV/WATCH/WEATHER subscription SKU is published, add price, renewal,
cancellation, refund, entitlement-loss and data-export terms in both locales, and enforce
the single WEATHER entitlement ledger (MC-14 D-013). Gate CON with PRC.

### 6.11 Product and Offer structured data (WEB-014)

The product page emits `schema.org` Product/Offer with a euro price, InStock/OutOfStock
and the brand "Open Marine", all derived from admin `price_cents` and `stock`. Future
work: gate JSON-LD generation on an approved SKU record (approved price list, real stock,
verified seller, brand clearance), remove `Open Marine` as Product brand, and never emit
price, availability, rating or review while the gates are open. Gate CLM with PRC and IPC.

### 6.12 Shipping and VAT (WEB-013, WEB-023)

Every catalogue price is labelled "IVA incluido" although the data model has no VAT rate,
tax base or territory, and shipping/installation costs are not part of the total. Future
work: add explicit VAT treatment and territory to the price model, publish the final price
only from an approved price list, and show the final payable amount before the order
button. Gate PRC with CON.

### 6.13 Footer legal information (WEB-001, WEB-016, WEB-033)

The footer links to legal notice, privacy, cookies and terms of sale in both locales
(verified control WEB-033), but the linked pages lack verified identity and the footer
brand string is uncleared. Future work: keep the link structure, populate the legal pages
after LGE closes, and replace the brand string after IPC clearance. Gates LGE, IPC, WEB.

### 6.14 Service offer wording (WEB-026)

The experiences page promises a closed price and availability without booking,
cancellation, weather-cancellation, passenger or liability-insurance information. Future
work: add service pre-contract terms or reduce the page to enquiry-only. Gate CON with
INS.

## 7. Sequencing

| Priority | Findings | Rationale |
|---|---|---|
| P0 | WEB-001, WEB-002, WEB-003, WEB-004, WEB-005, WEB-006 | Six BLOCKING items; commerce and publication stay closed until they are remediated. |
| P1 | WEB-007, WEB-008, WEB-009, WEB-011, WEB-012, WEB-013, WEB-014, WEB-015, WEB-016, WEB-017, WEB-018, WEB-019, WEB-020, WEB-021, WEB-022, WEB-023, WEB-024, WEB-025, WEB-026, WEB-027 | Twenty MAJOR items; needed before any public commerce or MAREA publication. |
| P2 | WEB-010, WEB-028, WEB-029, WEB-030 | Four MINOR items; correct before launch but not standalone blockers. |
| Preserve | WEB-031, WEB-032, WEB-033, WEB-034 | Verified controls; add regression tests, do not remediate. |

Dependency order: identity and IP first (they gate every page), then claims and safety,
then privacy/checkout, then price/structured data, then the minor disclosures. No finding
closes by documentation alone; each needs the evidence named in the dataset.

## 8. What was not done

- No website source, translation, route, metadata, canonical, hreflang, sitemap, price,
  stock, checkout or deployment file was changed.
- No finding was closed, waived, downgraded or marked verified.
- No evidence artefact was created or asserted; every `requiredEvidence` entry is future
  work.
- No clearance, price, stock record, certification, insurance or legal identity was
  invented.

## 9. Honest limitations

- This is a planning inventory, not legal advice and not a remediation record.
- The cited line ranges are those of the MC-14 baseline commit; later changes may shift
  them, and a future remediation milestone must re-verify before editing.
- Official classification, signing and closure remain external: counsel, the company
  registry, processors, insurers, the trademark office and product compliance.
- `GATE-WEBSITE-REMEDIATION` stays `EVIDENCE_REQUIRED`; planning 34 findings does not
  satisfy it.
