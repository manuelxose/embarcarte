# EMBARCARTE / MAREA — Commercial brand claims policy

| Field | Value |
| --- | --- |
| Document ID | MC-03 / COMMERCIAL-BRAND-CLAIMS-POLICY |
| Milestone | MC-03 |
| Date | 2026-10-30 |
| Owner | Lead (Brand and Commercial Program Director) |
| Applies to | Every customer-facing or commercially binding statement about EMBARCARTE, MAREA and the nine families: website, product pages, packaging, manuals, installers' material, proposals, quotations, presentations, email, advertising, social media, app-store listings, partner decks |
| Status | BINDING POLICY. Not a legal opinion. Supersedes ad-hoc copywriting practice |
| Machine-readable form | prohibited patterns and clearance state in `brand-identity.contract.json`; enforced by `npm run test:brand` on brand documents |

## 1. Why this document exists

MC-02 established that the programme currently has **no** certified hardware, **no** cleared
navigation data rights, **no** sea-trial evidence, **no** commercial availability, **no** trademark
clearance and **no** resolved software ownership (see
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`). Marketing language written before those
gates close is the fastest way to create consumer-protection, unfair-competition and contractual
exposure in Spain and the EU (Ley 3/1991 de Competencia Desleal, RDL 1/2007 consumer protection,
Directive 2005/29/EC on unfair commercial practices).

This policy defines what may be said now, what may be said once evidence exists, and what may never be
said. It is a gate on words, not on ambition.

## 2. Claim classes

| Class | Meaning | Publication requirement |
| --- | --- | --- |
| **A — ALLOWED** | True by role or by recorded programme fact; no product-performance implication | None beyond correct attribution |
| **C — CONDITIONAL** | May become true; requires a named evidence artefact on file before publication | Evidence reference logged in the claims register (§8) and approved by the owner function |
| **P — PROHIBITED** | Not supported, not certified, or legally risky in any current state | Never published until the underlying gate is closed **and** this policy is amended |
| **X — PROHIBITED ABSOLUTELY** | False by construction (invented facts, unverified registrations, guarantees, safety assurances) | Never. No evidence route exists inside this programme |

### Class A — examples allowed today

- "MAREA is a product brand of EMBARCARTE." / «MAREA es una marca de producto de EMBARCARTE.»
- "Sold, installed and supported by EMBARCARTE." (only once the service capability is actually
  deliverable in the named territory)
- "Designed for recreational and professional vessels." (category intent, not performance)
- "Modules designed to be combined; availability and compatibility are published per product."
- "Documentation and update policy are published with each product." (once true)
- "Read the compatibility matrix before purchase." (a directive, not a claim)
- Naming and edition statements: "MAREA NAV Essential includes route planning and a digital logbook."
  **Only** where `COMMERCIAL-PORTFOLIO.md` already defines it **and** the product page marks readiness
  honestly (see §5).

### Class C — conditional, with the evidence each one needs

| Claim | Evidence required before publication | Blocked by |
| --- | --- | --- |
| "Compatible with <named device/protocol>" | Tested compatibility result per device and firmware version, recorded in a published matrix | P-01, P-02, P-03, H-04 |
| "Charts included" / "includes official charts" | Signed chart/data distribution rights for the named region and product | D-01, D-02, D-03 (DEC-02) |
| "NMEA 0183 / Signal K compatible" | Tested interface evidence for the named messages and direction (read/write) | H-04, P-02 |
| "Weather forecasts for <region>" | Licensed provider terms for the product, and a validated forecast evaluation in that region | D-04, D-05, D-07 (DEC-03) |
| "AIS reception range up to X nm" | Measured reception evidence in a stated installation and sea state | P-03, H-08 |
| "Available to order" / "in stock" / "ships in X days" | OPERATIONS READY lifecycle state, real stock record and fulfilment capacity | X-05, registry prompt 25–26 |
| "Price from €X" | Approved price list and bottom-up costing for the exact included configuration | X-05, prompt 12–13 |
| "CE marked" / "CE compliant" | EU declaration of conformity and test reports for that product family | H-06, H-08 |
| "NMEA 2000 certified" | NMEA membership/licence, manufacturer and product codes, and the certificate itself | H-04 (DEC-05) |
| "Installed by certified technicians" | A documented technician certification scheme that actually exists | — (does not exist) |
| "24/7 support" / "response within X hours" | Real service contract and staffing evidence | — (does not exist) |
| "Warranty X years" | Written warranty terms and the seller's legal identity | X-02, prompt 28 |
| "Reduces fuel consumption / saves energy" | Measurement evidence on representative vessels | — (none) |
| "Works offline in <region>" | Verified offline behaviour and the rights to store the data offline in that region | D-01, D-03 |

### Class P — prohibited until the named gate closes

- Any performance comparison implying superiority over a named competitor (e.g. "more accurate than
  Garmin/Raymarine/Simrad/B&G") — no comparative test evidence exists.
- "The most accurate / the best / the safest / the most reliable marine forecast, navigation or
  autopilot."
- "Guaranteed detection", "guaranteed coverage", "guaranteed reception".
- "Certified", "approved", "homologated", "type-approved" in any form without the certificate.
- "Professional navigation-grade charts" while D-01/D-02/D-03 remain open.
- "ECDIS-class", "ECDIS-equivalent", "official ENC included" — charter/licence status does not exist
  and this would also misstate regulatory status.
- "Plug and play with any boat / any electronics".
- "Fully autonomous", "self-steering without supervision", "remote helm control".
- "Distress", "safety-of-life", "SOLAS", "GMDSS" or any implication of being a safety instrument.
- "Government-approved", "official", "authorised by <port authority / harbour master>".

### Class X — prohibited absolutely

- Invented certifications, test reports, sea trials, patents, awards, prizes or registrations.
- Invented customer counts, fleet sizes, vessels served, reviews, testimonials, logos of customers.
- Invented stock, delivery times, supplier quotes, prices, market share or revenue.
- Any `®` or `™` next to MAREA or a family/bundle name while `TRADEMARK_LEGAL_CLEARANCE =
  NOT_GRANTED`.
- Any claim that a product prevents collisions, prevents accidents, prevents loss or guarantees safety
  of life, vessel or cargo.
- Any claim that MAREA or EMBARCARTE owns software, data, charts or trademarks that the programme has
  not cleared.
- Any use of a third-party logo, certification mark, chart-provider mark or standard-body mark without
  a written licence.

## 3. Mandated scrutiny list (from the MC-03 mandate) — rulings

The machine-readable `claimsPolicy.prohibitedClaimPatterns` in `brand-identity.contract.json` are
scanning patterns for **published copy**: none of them may appear in published copy without the evidence
named in this table. The class shown here states whether an evidence route exists at all (C =
conditional route exists; P/X = no route until the policy itself is amended).

| Statement to scrutinise | Ruling | Reason |
| --- | --- | --- |
| "Compatible with all marine electronics" | **P** (forbidden) — Class P | False as a universal; compatibility is per-device and per-firmware and must be published as a matrix |
| "Certified NMEA 2000" | **P** — forbidden | NMEA 2000 is not implemented (stubs only); NMEA licensing/certification not held (H-04, DEC-05) |
| "Professional navigation-grade charts" | **P** until D-01/D-02/D-03 close | No ENC distributor or OEM agreement; one repo source is mislabelled CC-BY-NC and not for navigation |
| "Guaranteed collision avoidance" | **P** — Class X | Technically impossible and legally reckless; AIS is receive-only and incomplete by nature |
| "Fully autonomous steering" | **P** — Class X | PILOT is supervised-only by design; safety gate BLOCKED (H-01, P-04) |
| "The most accurate marine forecast" | **P** — Class P/X | No comparative validation exists; providers' terms also restrict redistribution |
| "100% reliable monitoring" | **P** — Class X | No product exists; no reliability evidence; connectivity cannot be guaranteed |
| "Immediately available" / "Available for immediate delivery" | **C** | Requires OPERATIONS READY, real stock and fulfilment; currently nothing is orderable. Also forbidden in the softer forms "available now", "in stock today", "same-day dispatch" |

## 4. Safety-critical language rules

1. **Navigation is an aid, not a guarantee.** Any surface that displays position, charts, traffic or
   forecasts must carry, in the product's language, a statement that the product does not replace
   official charts, the vessel's required equipment, watchkeeping, good seamanship or the operator's
   responsibility.
2. **AIS is receive-only and incomplete.** Never imply that receiving AIS means seeing all traffic; never
   imply transmission, DSC or transponder capability.
3. **PILOT is supervised.** No copy may describe unattended or remote helm control. Manual takeover
   and physical E-stop must be described as design boundaries wherever PILOT is mentioned.
4. **Weather is uncertain.** Forecast copy must state that forecasts are probabilistic, that source and
   freshness are displayed, and that local conditions prevail.
5. **Data provenance is part of the claim.** Where data is displayed, its source, timestamp and stale
   state must be shown; a claim about data without provenance is prohibited.
6. **No implied certification through visual design.** Do not style UI, packaging or docs to resemble a
   certified marine instrument or an official chart system.

## 5. Availability and readiness controls

The lifecycle vocabulary from `docs/marea/COMMERCIAL-PORTFOLIO.md` is binding. Every commercial surface
must declare its state and only the CTA allowed for that state.

| Lifecycle state | What may be said | Allowed CTA | Forbidden CTA |
| --- | --- | --- | --- |
| CONCEPT | "In development / under definition" | "Read the concept" / none | Buy, add to cart, price, availability |
| DEFINED | "Product definition published; not yet available" | "See the specification" / "Register interest where authorised" | Buy, price, delivery date |
| ENGINEERING VERIFIED | "Validated in limited engineering scope" (with scope stated) | "See validation scope" / quotation request | Buy, certification claim |
| REGULATORY READY | May state the specific conformity achieved, by family and version | Quotation request / pre-order **only if** operations ready | "Certified" beyond the document's scope |
| OPERATIONS READY | May state availability and lead time for approved SKUs | Buy / add to cart | Price without approved list |
| COMMERCIALLY AVAILABLE | Full commercial claims within this policy | Buy | — |

**Rules:** (a) no product is presented as purchasable without OPERATIONS READY plus an approved SKU
record; (b) a bundle may not be presented as purchasable unless every included product is at least
available, or the bundle is explicitly marked "includes products not yet available"; (c) PILOT and
every steering-related claim remain **not purchasable** regardless of other readiness (H-01, P-04).

## 6. Pricing and subscription language

- Prices are hypotheses until approved in writing; the published number must match the approved price
  list, state VAT treatment ("IVA incluido" / "excl. VAT") and the territory.
- "From €X" is only allowed when the advertised configuration is genuinely obtainable at that number
  under the stated conditions (installed/commissioned inclusions and exclusions named).
- Never describe a hypothesis price as a launch offer, discount, or limited promotion.
- Subscriptions: state what the customer receives, what renews, what happens on cancellation, what
  data becomes inaccessible and what remains exportable. No "free forever" or "lifetime" language.
- No double billing: NAV/WEATHER entitlement sharing must be described exactly as implemented, not as
  intended.

## 7. Required evidence per claim and approval workflow

1. Author drafts the claim with a **source**: a file in this repository, a measurement report, a signed
   contract, a certificate, or a test result. "GitHub code" is not evidence of product behaviour.
2. Claim is classified A / C / P / X by the author and checked against §2–§5.
3. Class A: publish. Class C: attach the evidence reference to the claims register and obtain the
   owner-function approval (§8). Class P/X: rewrite.
4. Independent review (brand or quality gate) verifies the claim against the evidence artefact, not the
   summary.
5. Any claim used in a signed commercial document (quotation, contract, tender response) additionally
   requires the human signatory named in `BRAND-AND-IP-DECISION-PACKAGE.md`.
6. Claims are re-reviewed whenever a product changes lifecycle state or a data/licence agreement
   changes.

## 8. Claims register (to be maintained by the company)

| # | Claim text | Class | Evidence artefact | Owner function | Date | Status |
| --- | --- | --- | --- | --- | --- | --- |
| — | No claims have been approved under this policy yet. The register starts empty at MC-03 and is populated from prompt 05 onward, per product. | — | — | Product + Legal | 2026-10-30 | EMPTY (by design) |

An empty register is a truthful state. It must not be filled with intentions.

## 9. Required disclaimers (approved wording, ES/EN)

Use verbatim on the surfaces indicated; localise, do not paraphrase.

**Navigation / instruments (any surface showing position, charts, traffic, depth or weather):**

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo
  reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La
  responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's
  required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always
  rests with the skipper."

**AIS (receive-only):**

- ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un
  sistema de evitación de colisiones ni un transpondedor.»
- EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance
  system and not a transponder."

**PILOT (supervised steering):**

- ES: «El sistema de gobierno es asistido y supervisado: exige vigilancia y capacidad de toma de control
  manual en todo momento. No permite gobierno autónomo ni control remoto sin supervisión.»
- EN: "The steering system is assisted and supervised: it requires continuous watchkeeping and the
  ability to take manual control at all times. It does not provide autonomous steering or unattended
  remote control."

**Weather:**

- ES: «Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se
  muestra la fuente y la hora de cada dato.»
- EN: "Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp
  are displayed for every data point."

**Brand attribution (footer of commercial material):**

- ES: «MAREA es una marca de producto de EMBARCARTE.»
- EN: "MAREA is a product brand of EMBARCARTE."

## 10. Enforcement

| Control | What it does | Where |
| --- | --- | --- |
| Brand contract | Encodes clearance state and prohibited claim patterns | `brand-identity.contract.json` |
| Automated validator | Fails brand documents that assert clearance/registration or use `®`/`™` with MAREA | `scripts/check-brand.mjs` (`npm run test:brand`) |
| Independent review | Checks real copy against this policy before merge/milestone acceptance | MC-03 review report; every later milestone |
| Human sign-off | Required for signed commercial documents and any Class C claim in a sale context | `BRAND-AND-IP-DECISION-PACKAGE.md` |
| Incident handling | A published claim found unsupported is retracted within 24 h, recorded, and the product's commercial state is reviewed | Company owner |

This policy does not convert a marketing document into evidence, and passing `npm run test:brand` is
not evidence that any product is certified, available, safe or legally cleared.
