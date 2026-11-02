# MC-14 — Website and Commerce Compliance Inventory (D15)

| Field | Value |
| --- | --- |
| Deliverable | D15 — Website and commerce compliance inventory |
| Milestone | MC-14 / 36 |
| Date | 2026-11-02 |
| Owner | web-compliance-auditor (Agent F) |
| Baseline commit | `f80c0f02ac14803e9e1539393abbb225d7f49e16` |
| Branch | `feature/marea-mc14-legal-commercial-risk-claims-policy` |
| Status | **READ_ONLY_INVENTORY_COMPLETE** |
| websiteModified | **false** |
| publicationAuthorized | **false** |
| Read-only | **true** |
| Machine-readable companion | `docs/marea/legal-commercial/data/website-findings.json` |

> This document is a read-only inventory, not legal advice, not a fix, and not a publication
> authorisation. Every remediation below is **future work** subject to MC-14 release gates and
> MC-15 migration governance. No website file was modified to produce it.

## 1. Method and scope

The existing bilingual Angular SSR site and its commercial presentation were inspected directly in
the working tree at the baseline commit:

- Core and layout: `src/app/core/site.config.ts`, `sample-products.ts`, `models.ts`, `seo.service.ts`,
  `cart.service.ts`, `i18n/locale-routes.ts`, `i18n/es.ts`, `i18n/en.ts`,
  `src/app/layout/{brand,header/footer,language-switcher}`.
- Pages: `features/home`, `features/technology` (content ES/EN, models, page and detail components),
  `features/shop` (list, detail, sample detail, cart, product-text), `features/services`,
  `features/experiences`, `features/about`, `features/delivery`, `features/contact`,
  `features/legal` (content ES/EN and component), `features/account/login`, `features/admin/admin-layout`.
- Server/runtime: `src/server.ts`, `src/server/api.ts`, `db.ts`, `auth.ts`, `stripe.ts`, `mail.ts`,
  `src/app/core/google-identity.ts`, `src/index.html`, `public/robots.txt`, `public/site.webmanifest`.
- Programme documents: `docs/marea/COMMERCIAL-PORTFOLIO.md`,
  `docs/marea/WEBSITE-AND-ROADMAP.md`,
  `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`,
  `docs/marea/products/copy/{pilot,hub}.es.md`,
  `docs/marea/bundles/copy/{start,complete}.es.md`, and the MC-14 risk register.

Checks performed: verbatim file reads, targeted searches (MAREA/OPEN-MARINE/NMEA/autopilot/
guarantee/environmental terms), route-registry and SEO-service inspection, and a local read-only
Node validation of every JSON path, line range and quoted string. No build, server, browser, network
request, price/route/checkout change, deployment or Git write command was executed. Every
`observedText` in the JSON is a verbatim substring of the cited line range.

## 2. Severity taxonomy

| Severity | Meaning in this inventory |
| --- | --- |
| **BLOCKING** | Unsupported public certification/availability/safety claim, or missing legal identity that blocks a lawful sale. Must close before any commerce/release gate. |
| **MAJOR** | Misleading commercial claim, consumer-rights gap, privacy-information gap, or unlicensed brand/data/software use. |
| **MINOR** | Incomplete disclosure or ambiguous wording that should be corrected but does not alone block a sale. |
| **INFORMATIONAL** | Observation or verified control; no remediation required for the observed surface. |

Empty `riskIds` on an INFORMATIONAL finding denotes a verified control or verified absence of risk,
not an unassessed area.

## 3. Summary counts

**Total 34 findings — 6 BLOCKING, 20 MAJOR, 4 MINOR, 4 INFORMATIONAL.**

| Category | Findings | Blocking | Major | Minor | Informational |
| --- | ---: | ---: | ---: | ---: | ---: |
| LEGAL_IDENTITY | 2 | 2 | 0 | 0 | 0 |
| OWNERSHIP | 2 | 2 | 0 | 0 | 0 |
| AVAILABILITY | 1 | 1 | 0 | 0 | 0 |
| SAFETY | 3 | 1 | 2 | 0 | 0 |
| PRIVACY | 3 | 0 | 3 | 0 | 0 |
| COOKIES | 1 | 0 | 0 | 1 | 0 |
| CHECKOUT | 2 | 0 | 2 | 0 | 0 |
| PRICE | 2 | 0 | 2 | 0 | 0 |
| STRUCTURED_DATA | 1 | 0 | 1 | 0 | 0 |
| SEO | 1 | 0 | 1 | 0 | 0 |
| BRAND | 1 | 0 | 1 | 0 | 0 |
| COMPATIBILITY | 2 | 0 | 2 | 0 | 0 |
| COMMERCIAL_CLAIM | 6 | 0 | 5 | 1 | 0 |
| WARRANTY | 1 | 0 | 0 | 1 | 0 |
| SUBSCRIPTION | 1 | 0 | 0 | 1 | 0 |
| OTHER | 5 | 0 | 0 | 0 | 5 |

## 4. Findings by category

### 4.1 Legal identity (2 — both BLOCKING)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-001 | `/aviso-legal` | `src/app/core/site.config.ts:21-26` | BLOCKING | `SITE.legal` has empty `taxId`, `address`, `registry`; seller identity cannot be published. | LEG-09, LEG-01 |
| WEB-002 | `/aviso-legal` | `src/app/i18n/es.ts:259-264` | BLOCKING | Public legal notice renders "Datos fiscales y domicilio: pendientes de confirmación." | LEG-09 |

### 4.2 Ownership, brand and licence claims (3)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-003 | `/tecnologia` | `src/app/features/technology/content/technology-page.content.ts:27-30` | BLOCKING | "Open Marine es nuestra plataforma abierta": ownership of a codebase whose licence/ownership chain is not cleared. | IPR-15, IPR-14, CLM-05 |
| WEB-005 | `/aviso-legal` | `src/app/features/legal/content/legal.es.ts:26-32` | BLOCKING | Legal notice states Open Marine software is "distribuido como código abierto" under its own licence; no outbound licence exists. | IPR-15, IPR-14, CLM-05 |
| WEB-016 | `/es` (site-wide footer) | `src/app/i18n/es.ts:35` | MAJOR | Footer presents "Tecnología Open Marine" as the commercial brand; no MAREA usage anywhere in `src/`; brand architecture not cleared. | IPR-13, IPR-14, CLM-05 |

### 4.3 Availability, checkout and price (5)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-004 | `/tienda` | `src/app/i18n/es.ts:87-90` | BLOCKING | Shop meta description says "Compra … Open Marine Hub … controlador de piloto automático" while the portfolio is not available and PILOT is not sellable. | CLM-02, CLM-06, LEG-09 |
| WEB-011 | `/carrito` | `src/app/features/shop/cart.ts:83-86` | MAJOR | Single checkbox bundles terms + privacy; no withdrawal-right summary or model form before the order. | CONS-01, CONS-03, CONS-10 |
| WEB-012 | `/api/orders` | `src/server/api.ts:402-408` | MAJOR | Automatic "Gracias por tu pedido" email conflates receipt with the acceptance defined in the terms of sale. | CONS-01, PAY-05 |
| WEB-013 | `/tienda/:slug` | `src/app/features/shop/shop-detail.ts:47` | MAJOR | "IVA incluido" label on a `price_cents` value with no VAT rate/base/territory field. | CLM-04, PAY-04, LEG-09 |
| WEB-023 | `/carrito` | `src/app/i18n/es.ts:119-121` | MAJOR | Shipping/installation costs are "confirmed separately"; final amount unknown before ordering. | CLM-04, CONS-01, PAY-04 |

### 4.4 Structured data and SEO (2)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-014 | `/tienda/:slug` | `src/app/features/shop/shop-detail.ts:148-164` | MAJOR | schema.org Product/Offer emits admin price, InStock/OutOfStock and brand "Open Marine" without approved SKU/brand evidence. | CLM-04, CLM-02, IPR-13 |
| WEB-015 | `/tecnologia` | `src/app/features/technology/content/technology-page.content.ts:52-56` | MAJOR | SEO description says the platform already integrates autopilot and sensors; capability/availability claim. | CLM-06, CLM-03, IPR-14 |

### 4.5 Privacy and cookies (4)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-007 | `/privacidad` | `src/app/features/legal/content/legal.es.ts:44-46` | MAJOR | Controller identified only by trade name and email; no legal name, address or tax ID. | PRIV-07, CONS-01 |
| WEB-008 | `/privacidad` | `src/app/features/legal/content/legal.es.ts:63-66` | MAJOR | Recipients limited to hosting/email; Google Identity Services and Stripe omitted, no transfers/safeguards. | PRIV-07, CONS-01 |
| WEB-009 | `/acceso` | `src/server/api.ts:150-169` | MAJOR | Registration consent checkbox is never sent or stored; no proof of consent/lawful basis. | PRIV-07, CONS-01 |
| WEB-010 | `/acceso` | `src/app/core/google-identity.ts:34-46` | MINOR | Third-party Google Identity Services script not disclosed in the cookie policy. | PRIV-07 |

### 4.6 Safety and compatibility claims (5)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-006 | `/tecnologia/piloto-automatico` | `src/app/features/technology/content/technology.es.ts:74-95` | BLOCKING | Autopilot marketed "con seguridad por diseño"; no certification, no supervised-steering/navigation-aid disclaimers; PILOT safety gate blocked. | CLM-06, LIA-06, LEG-01 |
| WEB-017 | `/tecnologia/navegador` | `src/app/features/technology/content/technology.es.ts:15-22` | MAJOR | AIS "alarmas de colisión" with no receive-only/incomplete-AIS disclaimer. | CLM-06, LIA-06 |
| WEB-018 | `/tecnologia/hub` | `src/app/features/technology/content/technology.es.ts:58-70` | MAJOR | Published NMEA 0183/NMEA 2000 compatibility; NMEA 2000 is stubs only, no licence/certification/tested matrix. | CLM-07, LIA-05 |
| WEB-019 | `/tecnologia/piloto-automatico` | `src/app/features/technology/content/technology.es.ts:80-87` | MAJOR | Named third-party actuator compatibility (ST3000 type) without tested qualification. | CLM-07, CLM-06 |
| WEB-027 | `/tienda/:slug` | `src/app/features/shop/shop-detail.ts:42-66` | MAJOR | Hardware product page lacks GPSR manufacturer/importer, traceability, warnings and recall information. | LEG-04, LEG-09, LIA-06 |

### 4.7 Commercial descriptions and offers (7)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-020 | `/tecnologia/hub` | `src/app/features/technology/content/technology.es.ts:62-65` | MAJOR | Hub page states installation, commissioning, updates and support are "incluidas" for a DEFINED product. | CLM-02, OPS-02, CLM-04 |
| WEB-021 | `/es` | `src/app/features/home/content/home.content.ts:55-85` | MAJOR | Home advertises autopilots in the plural and "Control inteligente"; autonomy-adjacent wording. | CLM-06, CLM-03 |
| WEB-022 | `/sobre-nosotros` | `src/app/features/about/content/about.content.ts:35-44` | MAJOR | Claims every system is bench-tested before the boat and that the autopilot has "vigilancia permanente". | CLM-03, CLM-06, LIA-06 |
| WEB-025 | `/aviso-legal` | `src/app/features/legal/content/legal.es.ts:19-24` | MAJOR | Legal notice says content is not a binding offer; contradicts the live shop/checkout. | CONS-01, CLM-04 |
| WEB-026 | `/experiencias` | `src/app/features/experiences/content/experiences.content.ts:48-54` | MAJOR | Boat-trip service promises a closed price/availability with no booking or cancellation terms. | CONS-01, CONS-03 |
| WEB-028 | `/condiciones-de-venta` | `src/app/features/legal/content/legal.es.ts:136-138` | MINOR | Three-year legal guarantee stated without claim channel, proof rules or contact identity. | CONS-02, OPS-03, LEG-01 |
| WEB-029 | `/tecnologia` | `src/app/features/technology/content/technology-page.content.ts:42-48` | MINOR | "Software auditable, probado … antes de cada versión" — testing claim without reproducible evidence. | CLM-03 |

### 4.8 Consumer rights: withdrawal and subscriptions (2)

| ID | Route | File:line | Severity | Issue | Linked risk |
| --- | --- | --- | --- | --- | --- |
| WEB-024 | `/condiciones-de-venta` | `src/app/features/legal/content/legal.es.ts:127-133` | MAJOR | Withdrawal exclusion extends to "productos configurados"; no Annex I(B) model withdrawal form. | CONS-03, CONS-10 |
| WEB-030 | `/condiciones-de-venta` (future) | `docs/marea/bundles/copy/start.es.md:87-88` | MINOR | Subscription terms exist only in an unpublished internal draft; published legal pack has no recurring-payment terms. | CONS-07, CONS-09 |

### 4.9 Verified controls / observations (4 — INFORMATIONAL)

| ID | Route | File:line | Observation |
| --- | --- | --- | --- |
| WEB-031 | `/tienda/muestra/:slug` | `src/app/features/shop/sample-detail.ts:44-54` | Sample pages are non-sale, noindex and emit no hreflang pair; sample note says "no se puede comprar". |
| WEB-032 | `/api/orders` | `src/server/api.ts:355-365` | Server re-reads active product, price and stock; rejects client price changes and out-of-stock quantities. |
| WEB-033 | `/es` | `src/app/layout/footer/footer.ts:37-45` | Footer links to legal notice, privacy, cookies and terms of sale; checkout/contact/registration link to them too. |
| WEB-034 | Future PILOT page | `docs/marea/products/copy/pilot.es.md:29-31` | Internal PILOT draft is marked DEFINED/not for sale, unpriced, with approved disclaimers; not itself a live claim. |

Additional verified observations (not findings):

- The shop's default seeded catalogue is **inactive draft** (`price_cents = 0`, `stock = 0`,
  `active = 0` in `src/server/db.ts`), so no real SKU is purchasable out of the box; the exposure is
  the public buy/availability copy and any later activation without approved evidence.
- The header has no illegal or misleading commercial claim of its own; the brand claim sits in the
  footer/technology copy.
- No MAREA trademark usage exists in `src/` (so no premature MAREA clearance claim), and no
  environmental/sustainability claim was found in `src/`, so none is inventoried as a finding.
- English legal pages are published and prerendered; canonical/hreflang derivation is centralised in
  `pageSeo`; untranslated English product pages are noindex. No reciprocity defect was found.

## 5. Legal-identity and commerce readiness blockers

The commerce surface cannot be lawful while these BLOCKING findings remain open:

1. **WEB-001 / WEB-002 — seller identity missing and publicly admitted as pending.** LSSI and the
   consumer pre-contract rules require the seller's legal name, NIF/CIF, registered address and
   contact details; the site currently renders "pendientes de confirmación" on its legal notice.
2. **WEB-004 — buy claims for products that are not available.** The shop meta description tells
   users to buy the Open Marine Hub and autopilot controller while the portfolio is not commercially
   available and PILOT is blocked from sale.
3. **WEB-003 / WEB-005 — ownership and licence claims over uncleared software.** The public copy
   asserts that OPEN-MARINE is "nuestra plataforma abierta" and that its software is distributed as
   open source under a licence; the programme's own evidence records no licence/assignment and the
   distribution policy forbids representing the code as open source.
4. **WEB-006 — safety assurance for a safety-critical autopilot.** "Seguridad por diseño" and the
   emergency-stop/watchdog listing are published without certification, safety-case evidence or the
   mandatory supervised-steering and navigation-aid disclaimers.

Until these close, the programme should keep commerce CTAs gated and treat the current public
surface as informational only. That gating is a programme/Lead decision; this inventory only records
the state.

## 6. Page-level remediation backlog (future work — MC-15)

All items are **FUTURE WORK — NOT PERFORMED**. They are grouped for a future MC-15 migration and must
respect the existing URL registry, canonical/hreflang rules and the MC-14 gates.

| Priority | Page/surface | Future action | Owner gate |
| --- | --- | --- | --- |
| P0 | Legal notice + privacy + terms | Fill `SITE.legal` from verified registration data; remove "pending" fallback; add GDPR art. 13 information (Google/Stripe, transfers, retention, DPO). | GATE-LEGAL-ENTITY |
| P0 | Technology product pages | Remove "safe by design"/testing assurances and buy/availability implications; restore only honest DEFINED/not-available status and approved disclaimers. | GATE-SAFETY-PILOT |
| P0 | Shop copy + SEO + JSON-LD | Replace buy/price/InStock claims until approved SKUs exist; gate Product/Offer JSON-LD on approved price/stock/brand/certification evidence. | GATE-COMMERCIAL-CLAIMS |
| P0 | Brand copy (header/footer/legal) | After IPR clearance, either substantiate owned-brand wording or rewrite as technical-origin attribution; keep MAREA out until trademark clearance. | GATE-IP-CLEARANCE |
| P1 | Checkout | Show final amount including delivery/installation, withdrawal summary and model withdrawal form before ordering; separate privacy acknowledgement from contractual acceptance; distinguish receipt vs acceptance. | GATE-CONSUMER |
| P1 | Registration/login | Send and store consent/terms version and timestamp; disclose Google Identity Services in cookies/privacy. | GATE-PRIVACY-DPA-DPIA |
| P1 | Compatibilities (NMEA, ST3000) | Publish only per-device, per-firmware tested matrix rows; remove unverified NMEA 2000 and named-actuator compatibility. | GATE-COMMERCIAL-CLAIMS |
| P1 | Experiences/delivery/services | Add service-specific pre-contract and cancellation terms or reduce to enquiry-only copy. | GATE-CONSUMER |
| P2 | Homepage/About | Remove "control inteligente", autopilot product features and general test/safety assurances; use approved lifecycle language. | GATE-COMMERCIAL-CLAIMS |
| P2 | Subscriptions (future SKUs) | Before NAV/WATCH sale, publish renewal, cancellation, refund and entitlement-loss terms. | GATE-SUBSCRIPTION |
| P2 | Warranty copy | Add claim channel, contact identity and new/second-hand distinction. | GATE-LEGAL-ENTITY |

## 7. What was NOT changed

Explicitly unchanged by this audit:

- **Routes and public URLs**: `LOCALIZED_ROUTES`, `app.routes.ts`, `app.routes.server.ts` and the
  redirects were not touched.
- **Canonical / hreflang / robots / sitemap**: no SEO emission logic was modified; no sitemap or
  robots file was changed.
- **Prices, tax labels, stock, product data, JSON-LD**: no catalogue, price or structured data was
  changed.
- **Checkout, payments, orders, accounts**: no commerce code, Stripe integration, order flow or
  authentication was changed.
- **Legal copy, translations, brand strings, header/footer**: no text was rewritten.
- **Deployment, dependencies, configuration, environment**: no `package.json`, build, deployment or
  server configuration was changed.
- **`src/` and `public/`**: nothing in either tree was modified. The only files written by this
  audit are this Markdown inventory and `docs/marea/legal-commercial/data/website-findings.json`.

No Git write command was run. `website-findings.json` records `websiteModified: false` and
`publicationAuthorized: false`.

## 8. Honesty statement

This is a read-only compliance inventory prepared by an independent auditor. It is **not legal
advice** and does not replace qualified counsel. A finding marked INFORMATIONAL is an observation,
not an approval. The absence of a finding for a surface does not mean that surface is compliant:
some obligations depend on facts outside the repository (company registration data, signed licences,
conformity assessment, insurance, live stock and real hardware evidence) and remain BLOCKED for the
programme. Passing automated checks (i18n, SEO, commerce) would not make any claim in this document
compliant; those checks verify implementation behaviour, not legal or commercial truthfulness.

The accurate status of this deliverable is: **READ_ONLY_INVENTORY_COMPLETE — no website change, no
remediation claimed, no publication authorised.**
