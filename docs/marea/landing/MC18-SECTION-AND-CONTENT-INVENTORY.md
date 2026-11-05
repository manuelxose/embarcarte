# MC-18 — Section and content inventory (D04)

| Field       | Value                                                                           |
| ----------- | ------------------------------------------------------------------------------- |
| Deliverable | D04 `MC18-SECTION-AND-CONTENT-INVENTORY.md`                                     |
| Milestone   | MC-18/36 — internal MAREA corporate landing (EMBARCARTE)                        |
| Owner       | docs-a (documentation owner, documents group A)                                 |
| Date        | 2026-11-03                                                                      |
| Status      | `INTERNAL_VERIFIED` for the inventory counts below; **not a milestone verdict** |
| Publication | `NOT_AUTHORIZED`                                                                |

This document inventories the ten landing sections in order: purpose, in-page anchor, design
system components used, content block counts, family/bundle coverage, navigation entries and
the informational rules that apply to each section. Counts are **derived**, not guessed: the
authoritative per-section counts are in `docs/marea/landing/data/section-registry.json`, and
they were cross-checked against `docs/marea/landing/data/bilingual-content.json` on
2026-11-03 (174 unique `contentId`s; 348 locale records; ES and EN are one-to-one).

## 1. Sources of truth

| Source                                                    | What it establishes                                                                                       |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `docs/marea/landing/data/section-registry.json`           | Frozen section order and per-section block counts; totals 174 blocks / 2 locales / 348 resolved records   |
| `docs/marea/landing/data/bilingual-content.json`          | 348 resolved records; 174 unique content ids; every record `INTERNAL_DRAFT_NOT_APPROVED` / `NOT_APPROVED` |
| `src/app/marea-landing/content/content.ts`                | Frozen `SECTION_ORDER` and `SECTION_ANCHORS`                                                              |
| `src/app/marea-landing/content/landing-content.ts`        | Navigation entries and section copy                                                                       |
| `src/app/marea-landing/landing.ts`                        | Actual composition order of the ten components                                                            |
| `docs/marea/landing/data/design-system-dependencies.json` | Direct MC-17 imports per section (14 registered components/theme + 4 data/type modules)                   |

Cross-check performed: summing `section-registry.data.sections[].blocks` gives
12+14+31+30+22+12+10+13+22+8 = **174**; grouping `bilingual-content.data.records` by
`sectionId` gives the same per-section counts, each exactly doubled by locale (348 records).

## 2. The ten sections

All headings below are the authored internal-draft headings (ES / EN). Every section is
informational: none renders a price, stock, availability promise, order/purchase control,
form, lead capture or telemetry. "Disabled CTA" means the MC-17 `marea-commercial-cta`
component renders explanatory copy only — it contains no `<button>`, no anchor and no
disabled-looking control (verified in the component source).

| #   | `sectionId`        | Anchor               | Heading (ES / EN)                                                                                                                                                                                | Purpose                                                                                                                                                                                                               | MC-17 / internal components                                                                                                                               | Blocks (records) | Informational rule                                                                           |
| --- | ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------- |
| 1   | `hero`             | `#hero`              | "Nueve familias, una arquitectura marina compartida: definida por partes, pendiente de verificación." / "Nine families, one shared marine architecture: defined in parts, still to be verified." | Frame the proposal, classification, proposed-brand restriction and preview label; highlight 9 families / 6 bundles / integration caveat                                                                               | `MareaContainer`, `MareaLandingSheetIndex`, `MareaStatusBadge`, `MareaSurface`, `MareaText` (plus banner and header outside `<main>`)                     | 12 (24)          | Internal preview classification visible; no product claim, no CTA, no price                  |
| 2   | `ecosystem`        | `#ecosistema`        | "Cinco capas para leer, supervisar y conectar el barco" / "Five layers to read, supervise and connect the vessel"                                                                                | Explain the five conceptual layers: hardware, onboard software, monitoring, integration, digital services                                                                                                             | `MareaSectionHeading`, `MareaSurface`, `MareaNotice`, `MareaText`                                                                                         | 14 (28)          | Conceptual layers only; no verified interoperability; no service offer                       |
| 3   | `families`         | `#familias`          | "Nueve familias, cada una con su alcance declarado" / "Nine families, each with a declared scope"                                                                                                | Present the nine canonical families with a summary and at least one material limitation each                                                                                                                          | `MareaFamilyCard`, `MareaSectionHeading`, `MareaNotice`, `MareaText`                                                                                      | 31 (62)          | 9 families exactly; per-family limitation copy mandatory; no price/stock/purchase            |
| 4   | `architecture`     | `#arquitectura`      | "Dependencias conceptuales, no interoperabilidad verificada" / "Conceptual dependencies, not verified interoperability"                                                                          | Concept diagram of 11 nodes and 10 links, legend and alt text; every link typed `CONCEPTUAL_DEPENDENCY`                                                                                                               | `MareaSectionHeading`, `MareaSurface`, `MareaNotice`, `MareaText` (inline SVG)                                                                            | 30 (60)          | Diagram never asserts compatibility, certification or data rights                            |
| 5   | `bundles`          | `#paquetes`          | "Seis conceptos de solución definidos internamente" / "Six internally defined solution concepts"                                                                                                 | Present the six canonical solution concepts with composition, optional lines, contract-only/ineligible lines, external requirements and constraints                                                                   | `MareaBundleComponents`, `MareaBundleExclusions`, `MareaSectionHeading`, `MareaStatusBadge`, `MareaSurface`, `MareaNotice`, `MareaText`                   | 22 (44)          | "Compatibility unverified" badge; no package price, stock, delivery or orderable state       |
| 6   | `softwareHardware` | `#software-hardware` | "Arquitectura definida, componentes condicionales" / "Defined architecture, conditional components"                                                                                              | State software/hardware principles: defined architecture, conditional components, unverified integration, external licensing                                                                                          | `MareaSectionHeading`, `MareaSurface`, `MareaNotice`, `MareaText`                                                                                         | 12 (24)          | Conditional/undefined hardware is not claimed as available; no CE/NMEA claim                 |
| 7   | `professionals`    | `#profesionales`     | "Lectura profesional del ecosistema" / "A professional reading of the ecosystem"                                                                                                                 | Address owners, installers and fleets with limitation-aware framing                                                                                                                                                   | `MareaSectionHeading`, `MareaSurface`, `MareaNotice`, `MareaText`                                                                                         | 10 (20)          | No lead form, no "request a quote", no contact capture, no professional offer                |
| 8   | `documentation`    | `#documentacion`     | "Documentación de definición, sin aprobación de publicación" / "Definition documentation, with no publication approval"                                                                          | Describe definition contracts, readiness record, evidence provenance and the publication gate                                                                                                                         | `MareaSectionHeading`, `MareaSurface`, `MareaNotice`, `MareaText`                                                                                         | 13 (26)          | Documentation is not a licence, certificate or contract; 0 external documents executed       |
| 9   | `availability`     | `#disponibilidad`    | "Once dimensiones de disponibilidad declaradas" / "Eleven declared availability dimensions"                                                                                                      | Render the derived readiness panel (11 canonical dimensions, all NOT_READY) plus recorded facts (9 families / 26 editions / 6 bundles, 0/13 gates, 0/24 documents, 0 claims, 0 prices, 0 stock, 0 compatibility rows) | `MareaReadinessPanel`, `MareaCommercialCta` (disabled, no control), `MareaSectionHeading`, `MareaStatusBadge`, `MareaSurface`, `MareaNotice`, `MareaText` | 22 (44)          | No "available soon" date, no waitlist, no stock, no orderable state; CTA is explanatory only |
| 10  | `closing`          | `#cierre`            | "Una propuesta honesta de un sistema todavía en definición" / "An honest proposal for a system still being defined"                                                                              | Close with foundation / verification / gates statements and the explicit restriction                                                                                                                                  | `MareaSectionHeading`, `MareaNotice`, `MareaText`                                                                                                         | 8 (16)           | No road map commitment, no launch date, no closing sales message                             |

Total: **174 blocks / 348 locale records** across 10 sections, matching the registry.

### 2.1 Block-count notes

- The four shared brand blocks (`brand.internal-banner`, `brand.provisional-brand`,
  `brand.skip-link`, `brand.preview-label`) are assigned to `hero`; the
  `brand.footer-classification` block is assigned to `closing`. That is why hero has 12
  blocks and closing 8 while their section-specific copy is smaller.
- Section 4 has 11 architecture nodes and 10 conceptual links, each a content block, plus
  kicker/heading/lead, diagram alt, 4 legend blocks and the note (30).
- Section 9 has 11 readiness dimensions (definition, engineering, licensing, hardware,
  data rights, compliance, pricing, brand/publication, availability, safety, operations) and
  4 status lines plus gate/classification notes (22).

## 3. Family and bundle coverage

| Coverage             | Count                                                                     | Where                                                                                 |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Product families     | 9 — NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET           | Section 3 (`families`), cards from `product-family-presentation.json` + MC-17 fixture |
| Product editions     | 26 canonical editions (17 DEFINED, 8 CONDITIONAL, 1 INSTALLATION_PACKAGE) | Referenced through family edition ids; never presented as merchant SKUs (D06)         |
| Solution bundles     | 6 — START, CRUISE, SAIL, PROTECT, COMPLETE, FLEET                         | Section 5 (`bundles`), from `bundle-presentation.json` + MC-17 bundle fixture         |
| Readiness dimensions | 11, all `NOT_READY` today                                                 | Section 9, derived from canonical data                                                |
| Release gates        | 13, 0 closed                                                              | Section 9 recorded facts and footer gate line                                         |

## 4. Navigation

The header renders exactly ten in-page anchors (one per section). All are internal
`#fragment` links; none is a public route. The ES/EN control points to the other preview path
served by the same loopback server.

| Id                 | ES label            | EN label              | Href                 |
| ------------------ | ------------------- | --------------------- | -------------------- |
| `hero`             | Inicio              | Home                  | `#hero`              |
| `ecosystem`        | Ecosistema          | Ecosystem             | `#ecosistema`        |
| `families`         | Familias            | Families              | `#familias`          |
| `architecture`     | Arquitectura        | Architecture          | `#arquitectura`      |
| `bundles`          | Paquetes            | Bundles               | `#paquetes`          |
| `softwareHardware` | Software y hardware | Software and hardware | `#software-hardware` |
| `professionals`    | Profesionales       | Professionals         | `#profesionales`     |
| `documentation`    | Documentación       | Documentation         | `#documentacion`     |
| `availability`     | Disponibilidad      | Availability          | `#disponibilidad`    |
| `closing`          | Cierre              | Closing               | `#cierre`            |

## 5. No-purchase / no-lead / informational rules

Enforced across the whole page and verified by the validator where it can be checked
mechanically:

1. **No purchase path.** No add-to-cart, buy, checkout, reserve, pre-order or waitlist control
   (`MC18-11`, `MC18-12`). The only commerce component in the tree,
   `marea-commercial-cta`, is rendered in `DISABLED` state and contains no button or anchor.
2. **No lead capture.** No form, input, contact form, quote request, registration or
   subscription (`MC18-34`, purchase-control scan). There is no HTTP client, cookie or
   analytics import.
3. **No price or availability claim.** No amount, currency, stock, delivery date or "available
   soon" (`MC18-09`, `MC18-10`). Status copy says "not authorised / not verified".
4. **Per-section notices.** Nine of the ten sections render a `marea-notice` with the relevant
   constraint; the banner is always present and the footer repeats the classification.
5. **No public identity assertion.** "Proposed brand, not adopted" appears in the header,
   banner and footer; no registered-trademark symbol exists (`MC18-23`, `MC18-29`).
6. **No user data.** The preview requires no customer, vessel, location or contact data
   (`MC18-34`).

## 6. Known limitations / non-claims

- This inventory is derived from generated datasets and source files, not from a rendered
  visual audit. It does not assert visual polish, responsiveness, contrast or accessibility;
  QA evidence datasets were arriving during authoring, while the evidence documents (D10–D12)
  were still missing at the time of writing.
- The per-section block counts are the registry's generated counts. The generator currently
  reports drift for `design-system-dependencies.json` while another author edits the component
  tree; the section/block counts themselves were cross-checked against
  `bilingual-content.json` and matched.
- The heading strings quoted here are internal draft copy, not approved public copy.
- Section 9's facts are values read from the generated projection at authoring time; they are
  not a commercial availability statement.
- Nothing in this document authorises publication, indexation, price, stock or sale.
