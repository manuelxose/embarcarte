# MC18 → MC19 — Technical Handoff (D18)

| Field                      | Value                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Deliverable                | D18 — `MC18-MC19-HANDOFF.md`                                                                                |
| Milestone                  | MC-18/36 — EMBARCARTE / MAREA internal bilingual corporate landing                                          |
| Owner                      | docs-b                                                                                                      |
| Date                       | 2026-11-03                                                                                                  |
| Status                     | INTERNAL_PROPOSED (handoff inputs; not an MC-19 plan or approval)                                           |
| Publication                | NOT_AUTHORIZED                                                                                              |
| Indexation                 | DISABLED — `noindex, nofollow, noarchive`                                                                   |
| Machine-readable companion | `docs/marea/landing/data/mc19-handoff-inputs.json` (contractId `MC18-MC19-HANDOFF-INPUTS`, version `1.0.0`) |
| Repository state           | HEAD `6002c49f898e755154c1b65c97781177719ce11c`, uncommitted MC-18 changes                                  |

## 0. Handoff status

- `MC19_STARTED = false`: no MC-19 work exists in the repository (no segment
  pages, no solution pages, no enquiry submission, no lead flow, no installer
  registration). This document is **input** for a future milestone, not a start
  signal.
- `publicationAuthorized = false`, `indexationAuthorized = false`: the landing is
  an internal preview only.
- This is a technical handoff authored by docs-b from verified MC-18
  implementation and evidence. It is not an independent audit and does not
  approve MC-19 execution.

## 1. Architecture

- Angular 21, SSR, hydration; one bilingual component tree, two locales (ES
  default at `/marea`, EN at `/en/marea`).
- The landing lives in `src/app/marea-landing/` and is rendered only by the
  isolated preview project `marea-landing-preview` in `preview/landing/`
  (loopback `127.0.0.1:4302`, noindex, no production imports). See D13.
- Typed localization architecture is preserved: no duplicated ES/EN page
  implementation; content is one `LandingContent` source with per-locale text.
- The route identity is frozen from MC-15: `mareaOverview` / `ENT-HUB-MAREA` /
  `HUB_OVERVIEW`, with `publicationAuthorized:false`,
  `indexationAuthorized:false`, `sitemapEligible:false`,
  `deploymentState: NOT_ACTIVATED_NOT_IN_SITEMAP_NOT_PUBLICLY_LINKED`,
  `collisionStatus: NO_COLLISION`.
- The production application does not import the landing and has zero landing
  bytes (MC18-33/38 PASS); the working production route files are unchanged
  (MC18-28 PASS).

Landing source map:

| Path                                | Role                                                                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `src/app/marea-landing/landing.ts`  | single bilingual landing component; theme host `web-light`; skip link; internal banner; header; ten sections; footer |
| `src/app/marea-landing/sections/`   | ten section components in document order                                                                             |
| `src/app/marea-landing/components/` | landing-local shell: internal banner, header, footer, section frame, sheet index                                     |
| `src/app/marea-landing/content/`    | `landing-content.ts` (one bilingual source), `content.types.ts` (contract), `evidence.ts` (evidence registry)        |
| `src/app/marea-landing/models/`     | page identity, publication gates, SEO planning/activation                                                            |
| `src/app/marea-landing/data/`       | generated domain projection and domain adapter                                                                       |
| `preview/landing/`                  | isolated preview host application (not production)                                                                   |

## 2. Section structure

Ten sections, frozen order and ids, 174 blocks per locale (348 resolved records):

| #   | Section id         | Blocks | ES heading                                                                                          | EN heading                                                                             | Source                                  |
| --- | ------------------ | ------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| 1   | `hero`             | 12     | Nueve familias, una arquitectura marina compartida: definida por partes, pendiente de verificación. | Nine families, one shared marine architecture: defined in parts, still to be verified. | `sections/section-hero.ts`              |
| 2   | `ecosystem`        | 14     | Cinco capas para leer, supervisar y conectar el barco                                               | Five layers to read, supervise and connect the vessel                                  | `sections/section-ecosystem.ts`         |
| 3   | `families`         | 31     | Nueve familias, cada una con su alcance declarado                                                   | Nine families, each with a declared scope                                              | `sections/section-families.ts`          |
| 4   | `architecture`     | 30     | Dependencias conceptuales, no interoperabilidad verificada                                          | Conceptual dependencies, not verified interoperability                                 | `sections/section-architecture.ts`      |
| 5   | `bundles`          | 22     | Seis conceptos de solución definidos internamente                                                   | Six internally defined solution concepts                                               | `sections/section-bundles.ts`           |
| 6   | `softwareHardware` | 12     | Arquitectura definida, componentes condicionales                                                    | Defined architecture, conditional components                                           | `sections/section-software-hardware.ts` |
| 7   | `professionals`    | 10     | Lectura profesional del ecosistema                                                                  | A professional reading of the ecosystem                                                | `sections/section-professionals.ts`     |
| 8   | `documentation`    | 13     | Documentación de definición, sin aprobación de publicación                                          | Definition documentation, with no publication approval                                 | `sections/section-documentation.ts`     |
| 9   | `availability`     | 22     | Once dimensiones de disponibilidad declaradas                                                       | Eleven declared availability dimensions                                                | `sections/section-availability.ts`      |
| 10  | `closing`          | 8      | Una propuesta honesta de un sistema todavía en definición                                           | An honest proposal for a system still being defined                                    | `sections/section-closing.ts`           |

The same component tree renders both locales; only content/route data changes.
Anchors are in-page only: `#hero`, `#ecosistema`, `#familias`, `#arquitectura`,
`#paquetes`, `#software-hardware`, `#profesionales`, `#documentacion`,
`#disponibilidad`, `#cierre`.

## 3. Component reuse (MC-17 design system)

The landing does not fork the design system. Required reuse observed by the
validator (MC18-35/49 PASS):

| Reused identifier                             | Use                                                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `theme/marea-theme`                           | corporate `web-light` theme host; instrument modes never appear                                 |
| `components/structured/marea-responsive-nav`  | landing header navigation (in-page anchors only)                                                |
| `components/commerce/marea-family-card`       | family cards; identity/readiness/restrictions from MC-17 fixtures, summary from landing content |
| `components/commerce/marea-bundle-components` | bundle composition (kit expansion counted once)                                                 |
| `components/commerce/marea-bundle-exclusions` | ineligible/conditional bundle lines                                                             |
| `components/commerce/marea-readiness-panel`   | readiness summary in availability                                                               |
| `components/commerce/marea-commercial-cta`    | fail-closed disabled presentation; no purchase action                                           |
| `components/foundation/marea-notice`          | critical/internal notices                                                                       |
| `components/foundation/marea-section-heading` | kicker/heading/lead hierarchy                                                                   |
| `components/foundation/marea-text`            | typography variants                                                                             |
| `components/foundation/marea-container`       | layout container                                                                                |
| `components/foundation/marea-status-badge`    | critical status badges                                                                          |
| `components/foundation/marea-surface`         | raised/outline surfaces (status console, CTA panel)                                             |

Landing-local components carry the section frame, the numbered sheet index and
the internal banner/header/footer; they are not copies of design-system
primitives. The generated `docs/marea/landing/data/design-system-dependencies.json`
records the dependency set; it was reported out of date by MC18-41 at authoring
(in-flight visual changes), pending regeneration — see D17 I07.

## 4. ES/EN content contracts

- One `LandingContent` object (`content/landing-content.ts`); every rendered
  sentence is a `ContentBlock` with stable `contentId`, `sectionId`,
  `sourceType`, `copyClass`, `evidenceIds`, `publicationStatus` and
  `approvalStatus`.
- Fixed literals: `PUBLICATION_STATUS = 'INTERNAL_DRAFT_NOT_APPROVED'`,
  `APPROVAL_STATUS = 'NOT_APPROVED'`. No flag, query parameter, environment
  variable, storage value or UI state can promote a block to approved.
- `CopyClass` inherits MC-14: `INTERNAL_EVIDENCED`, `PROPOSED_INTENT`,
  `CONSTRAINT_STATEMENT`, `NAVIGATIONAL`.
- Every block cites at least one evidence id resolving in `content/evidence.ts`
  to an existing repository `sourcePath`. Evidence describes what the source
  records today; it is not an approval.
- Parity: 174 blocks × 2 locales = 348 resolved records in
  `docs/marea/landing/data/bilingual-content.json`; ES/EN semantic parity is
  checked (MC18-21 PASS) and English copy is scanned for untranslated Spanish
  (MC18-58 PASS).
- Metadata copy is planning copy in `models/seo.ts`; browser title and meta
  description are applied by the preview host, but canonical/hreflang/OG/JSON-LD
  are not emitted (D09).

## 5. Product and bundle presentation

- **9 families** (canonical MC-16): NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY,
  WEATHER, FLEET. All `definitionStatus: DEFINED`, all `readiness: NOT_READY`,
  all `commercialAvailability: NOT_FOR_SALE`, `priceVisible:false`,
  `availabilityVisible:false`, `purchaseActionAllowed:false`.
- **26 editions**: identity and composition only; an edition is not a merchant
  SKU. No approved price, no stock, no purchasable state.
- **6 bundles** (solution concepts): START, CRUISE, SAIL, PROTECT, COMPLETE,
  FLEET. All `orderable:false`, `checkoutAllowed:false`,
  `publicationAuthorized:false`, `compatibilityStatus: UNTESTED`. FLEET is a
  contracted B2B solution with no default hardware and no established SLA;
  contract-only and ineligible lines are presented as such.
- Restrictions come from the verified MC-17 presentation adapter fixtures; no
  price, stock, availability, delivery, testimonial, certification or sea-trial
  claim is representable.
- Family/bundle summaries are landing-authored draft copy; the commercial fields
  are read-only projections. `LICENSING_NOT_CLEARED`, `COMPATIBILITY_UNTESTED`,
  `SAFETY_GATE_BLOCKED` restrictions are surfaced, not hidden.

## 6. Segment references reserved for MC-19

Section 07 (`professionals`) already names the three target segments as
**content only**, with no routes and no flows:

| Segment reference                                                  | Current MC-18 state             | Reserved for MC-19                                                                      |
| ------------------------------------------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------- |
| `OWNERS` (Armadores / Owners)                                      | content item in `professionals` | possible owner segment page + enquiry flow                                              |
| `INSTALLERS` (Instaladores / Installers)                           | content item in `professionals` | possible installer segment page, installation context, registration **not** implemented |
| `PROFESSIONAL_FLEETS` (Flotas profesionales / Professional fleets) | content item in `professionals` | possible fleet/professional segment page; FLEET remains a contracted solution           |

MC-19's declared scope is segment/solution pages and enquiry flows for owners,
installers and professionals. MC-18 deliberately implements **none** of it: no
segment page files, no solution detail routes, no enquiry submission, no lead
storage, no installer registration, no analytics. Any MC-19 route must be a new
typed localized route with its own collision check, canonical/hreflang decision
and privacy design.

## 7. Proposed future navigation

- MC-18 navigation is an in-page anchor list of the ten sections; the preview
  never links to a public route.
- A future public navigation can extend the header/footer to the segment and
  solution pages once those routes exist and are approved; it must preserve the
  existing indexed URLs and the 21 public route ids.
- Proposed future shape (not implemented, not authorized): corporate hub entry
  → segment pages (owners, installers, professional fleets) → solution/bundle
  context → enquiry/contact once privacy-approved. Canonical/hreflang for each
  new route must be decided before registration.
- No public navigation or corporate UI is changed in MC-18 (MC18-30 PASS).

## 8. CTA restrictions

| CTA class                  | MC-18 state  | Rule                                                                                                             |
| -------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| Purchase / cart / checkout | **false**    | no purchase, cart, checkout, reservation or order action; `marea-commercial-cta` renders a disabled presentation |
| Price / availability       | not rendered | no price, stock, delivery or "available soon" date                                                               |
| Lead capture / enquiry     | **false**    | no form, contact endpoint, quote request, registration, newsletter or installer sign-up                          |
| Contact channel            | none         | the content states there is no enquiry form or contact channel                                                   |
| Informational navigation   | allowed      | in-page anchors only                                                                                             |

`ctas: { purchase: false, leadCapture: false }` is recorded in the handoff JSON.
The availability section's commercial CTA is derived from the MC-17 fail-closed
adapter (`buyCtaAllowed:false`, `cartAllowed:false`, `ctaState:'DISABLED'`).

## 9. Contact/lead privacy and consent dependencies (for MC-19)

MC-18 collects no personal data. If MC-19 introduces enquiry/lead flows, the
following must exist **before** any submission form is implemented:

1. Privacy approval, lawful basis and a privacy notice per locale (B07;
   `GATE-PRIVACY-DPA-DPIA` open; 24 required documents, 0 executed).
2. DPA with every processor (hosting, email, CRM, anti-spam) and a DPIA if the
   processing is high-risk.
3. Explicit consent capture where required, with withdrawal and retention rules;
   no pre-ticked consent, no hidden marketing opt-in.
4. Data minimisation: no vessel, customer, payment or telemetry data collected
   unless strictly necessary and approved; never persist card data (payments, if
   ever introduced, remain hosted/tokenized).
5. Server-authoritative validation and anti-abuse (rate limiting, spam controls,
   no secrets in client code), plus a security review of the new endpoints.
6. No lead storage until the above exists; MC-18 has no storage, cookie, session
   or analytics mechanism to extend.

This handoff does not design those flows and does not imply they are authorized.

## 10. Commercial readiness

- All nine families and six bundles are `NOT_FOR_SALE`; no price is approved; no
  stock, delivery, package price or SLA is established.
- Readiness across the domain is `NOT_READY`; PILOT keeps `SAFETY_GATE_BLOCKED`;
  licensing is not cleared for NAV/AIS/WEATHER/FLEET; compatibility is `UNTESTED`
  and tested compatibility rows are 0.
- The page therefore presents a defined architecture and explicit limitations,
  not an offer. A future commercial launch requires the approvals in D17 (B03,
  B06, B08, B10, B11, B12).
- The production commerce path is unchanged by MC-18 (MC18-32 PASS); commerce
  remains server-authoritative.

## 11. SEO publication gates

- Canonical, hreflang, Open Graph, Twitter card and JSON-LD are **planning
  candidates only** and are not emitted (D09; MC18-26/27 PASS).
- `sitemapEligible: false`; no sitemap entry added (MC18-29 PASS); no indexable
  page (MC18-25 PASS).
- Activation requires all gate booleans **and** a real `ReleaseAuthorization`
  record; `LANDING_RELEASE_AUTHORIZATION` is `null` and no code path creates one
  (MC18-43 PASS).
- The activation evaluator's gate set is narrower than the full publication gate
  set (D09 §9.1); reconcile before activation (D17 R05).
- 13 MC-14 release gates: 0 closed; 24 required documents: 0 executed; 0/42
  claims public-authorized.
- A future milestone must follow D16's sequence; MC-19 must not publish the
  landing as a side effect of adding segment pages.

## 12. Legal disclaimers carried by the page

- Persistent internal banner: "Vista interna no publicada…" / "Internal
  unpublished preview…" (never conditionally removed; MC18-24/59 PASS).
- Proposed-brand restriction: MAREA is a proposed brand, public use `NO_GO`,
  trademark clearance `NOT_GRANTED`.
- Footer classification: MC-18 internal document, not a commercial offer, not
  public copy, no publication approval.
- Availability notices: fail-closed gate explanation + classification note;
  publication/indexation status badges are critical.
- Claim policy: no certification, CE marking, NMEA 2000 certification, sea
  trial, guaranteed alerts, autonomous operation, tested compatibility or
  registered-trademark claim; the 30 mandatory prohibited categories are
  respected (MC18-22/23 PASS).
- None of these disclaimers may be removed or weakened to make the page look
  more commercial.

## 13. Reusable layout patterns

- `MareaLandingSectionFrame` (`components/landing-section.ts`): anchor, labelled
  heading, tone (`default`/`raised`/`contrast`), consistent vertical rhythm.
- Numbered sheet index `01`–`10` (`components/landing-sheet-index.ts`): strong
  editorial orientation; decorative, not the only indicator of order.
- Theme host `MareaTheme` with `web-light` mode; CSS custom properties from
  generated MC-17 tokens; responsive grid at 320–1440 (QA evidence PENDING).
- Skip link to `#landing-main`, focus-visible ring, reduced-motion media query;
  single H1 and heading hierarchy (MC18-50 PASS; accessibility evidence file
  PENDING).
- Status console pattern: readiness panel + recorded facts + critical badges +
  notices; reusable for MC-19 segment pages.
- Family card / bundle composition / exclusions patterns: reuse instead of
  rebuilding; keep the MC-17 contracts.

## 14. Accessibility evidence pointer

- Present: `docs/marea/landing/data/accessibility-evidence.json` (QA deliverable,
  generated from the Playwright/axe run). Still PENDING:
  `docs/marea/landing/MC18-ACCESSIBILITY-VALIDATION.md` (D10).
- Available MC-18 repository checks: single meaningful H1 and skip link
  (MC18-50 PASS); internal banner visible in SSR (MC18-24/59 PASS); axe/ARIA
  structure from reused design-system components; focus styles and
  reduced-motion media queries in landing styles.
- The measured accessibility results live in the evidence JSON; the narrative
  D10 validation document is not present yet, so this handoff does not itself
  claim an accessibility PASS.

## 15. SSR/hydration requirements

- Both preview paths are per-request `RenderMode.Server`; the `**` route is SSR
  with status 404. SSR renders the real landing (MC18-36 PASS), including the
  internal banner.
- `provideClientHydration()` is enabled; the locale comes from route data, the
  landing sets `MareaI18n` locale in `ngOnChanges` before sections render, and
  the preview host sets `document.documentElement.lang` (`es-ES` / `en`) and
  re-applies robots/description metadata, so server HTML and hydrated client
  agree.
- No browser-only API is used during render; no storage/cookie state exists to
  diverge; navigation state is route data only.
- SSR/hydration evidence (`ssr-hydration-evidence.json`) is present and MC18-37
  PASSES in the final observed run. A future MC-19 route must keep the same
  deterministic server/client contract and add its own evidence.

## 16. Remaining blockers (summary)

| ID  | Blocker                                                   | Status |
| --- | --------------------------------------------------------- | ------ |
| B01 | Trademark legal clearance                                 | OPEN   |
| B02 | MAREA public use `NO_GO`                                  | OPEN   |
| B03 | Source IP / licensing clearance                           | OPEN   |
| B04 | Legal identity verification                               | OPEN   |
| B05 | Public copy approval                                      | OPEN   |
| B06 | Claims authorization (0/42)                               | OPEN   |
| B07 | Privacy/DPA/DPIA                                          | OPEN   |
| B08 | Commercial data/pricing                                   | OPEN   |
| B09 | Publication/indexation/deployment + release authorization | OPEN   |
| B10 | 13-gate release programme (0 closed; 24 docs 0 executed)  | OPEN   |
| B11 | PILOT safety gate                                         | OPEN   |
| B12 | Hardware conformity/compatibility evidence                | OPEN   |

Pending internal artefacts: D10 accessibility validation, D11 responsive/visual
evidence document, D12 performance/bundle evidence document,
`performance-evidence.json`, `legacy-baseline.json`, `review-findings.json`, the
independent review, Spanish executive report and final delivery record.
Accessibility, responsive, visual-regression and SSR/hydration evidence files are
now present. The validator observed 55/60 PASS, 5 FAIL, exit 1 in the final run
(MC18-44, 51, 52, 53, 54).

## 17. Explicit non-goals for MC-19 execution

MC-19 execution is **not** authorized or started by this handoff. In particular:

- MC-19 must not treat this document as an approval to publish the landing,
  activate indexation or register the `/marea` routes.
- MC-19 must not implement segment pages, solution pages, enquiry submissions,
  lead capture, installer registration or contact forms inside MC-18 artefacts;
  those are MC-19 deliverables and require the privacy/consent work in §9.
- MC-18 contains no segment/solution route, no form, no lead storage, no CRM,
  no email endpoint and no analytics; adding them requires a new milestone,
  security review and approvals.
- MC-19 must not reintroduce prices, stock, availability, purchase actions,
  certification claims, testimonials or sea-trial claims without the D17
  approvals; commercial data remains `NOT_FOR_SALE`.
- MC-19 must not fork the design system or duplicate the bilingual component
  tree; it must reuse the MC-17 components and the one-content-source pattern.
- MC-19 must not weaken the two-lock SEO activation or emit canonical/hreflang/
  JSON-LD before the gates and the release authorization record exist.
- This handoff assigns no MC-19 dates, owners or verdict; the programme lead and
  independent audit govern the next milestone.

## 18. Observed verification at authoring

| Command                                 | Observed                                                                                  |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| `git rev-parse HEAD`                    | `6002c49f898e755154c1b65c97781177719ce11c`                                                |
| `npx tsc -p tsconfig.app.json --noEmit` | exit 0                                                                                    |
| `npm run test:landing:unit`             | 45/45 PASS, exit 0                                                                        |
| `npm run test:landing`                  | 55/60 PASS, 5 FAIL, exit 1                                                                |
| `npm run build:landing:preview`         | exit 0                                                                                    |
| HTTP probe `/marea`, `/en/marea`        | 200; correct title/description, no canonical/hreflang/OG/JSON-LD, noindex; 0 forms/inputs |
| `MC19_STARTED`                          | false (no MC-19 artefacts; explicit declaration in the companion JSON)                    |

## 19. Known limitations / non-claims

- Handoff inputs, not an MC-19 plan, estimate, schedule or approval.
- Accessibility, responsive, visual-regression and SSR/hydration evidence
  datasets are present; performance evidence, legacy baseline, review findings
  and the corresponding narrative documents remain PENDING.
- The independent review, Spanish report, D10-D12 documents, performance
  evidence and delivery record are PENDING; D01 and D03 are present.
  `relevantCommit` points to D23 because the dataset envelope requires it.
- The validator is not green (55/60 in the final observed run); the failing
  checks are pending artefacts (MC18-44/51/52/53/54), not a PASS.
- The generated `design-system-dependencies.json` was regenerated after the
  visual pass; MC18-41 now PASSES.
- Counts (9 families, 26 editions, 6 bundles, 174 blocks, 348 records) come from
  generated datasets read on 2026-11-03; they can change only through a
  regeneration, which must update the datasets.
- Product/bundle presentation is defined but not ready: `NOT_FOR_SALE`,
  `NOT_READY`, no price, no stock, no SLA, 0 tested compatibility.
- No Search Console/indexation evidence; no public hosting; no publication.
- No independent audit has reviewed this handoff; the final milestone verdict
  belongs to the independent auditor. This document does not claim MC18 PASS and
  records `MC19_STARTED = false`, `MC18_PUBLICATION = NOT_AUTHORIZED`.
