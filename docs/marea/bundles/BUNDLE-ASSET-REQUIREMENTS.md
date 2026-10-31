# MAREA — Bundle visual-asset requirements (MC-08 / D16)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D16 / BUNDLE-ASSET-REQUIREMENTS |
| Milestone | MC-08 (Master Prompt 08/36) — complete commercial solution bundles, configuration rules, compatibility, subscriptions and unit economics |
| Deliverable | D16 — 60 planned bundle assets (10 per bundle), truthful statuses and bilingual alt text |
| Owner function | Vessel Monitoring and Sensor Specialist (Agent C) |
| Status | `INTERNAL PLANNING DOCUMENT`. No asset is produced, generated, downloaded, authorised or published by this milestone |
| Lifecycle context | Six bundles `DEFINED` and `NOT_FOR_SALE`; brand `PROPOSED` / `NOT_GRANTED`; imagery `BLOCKED_ON_IMAGE_GENERATION` (`X-03`) |
| Contract authority | `docs/marea/assets/ASSET-PIPELINE.md` (§4.2 registry ids, §4.3 manifest fields, §5 workflow, §7.1 classification, §8 budgets, §9 approvals); `docs/marea/products/README.md` §7 rule 9, §22, §29; `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` §9 |
| Binding inputs | `docs/marea/assets/manifest/MC-04-ASSETS.yaml`, `MC-04-BRIEFS.yaml` (paths verified on disk 2026-10-30); batch-01/batch-02/batch-03 asset requirements (D9 patterns); `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`; `BUNDLE-ARCHITECTURE.md` |
| Decisions consumed | `DECISION-LOG.md` D-018 (bundle contract type), D-020 (PROTECT composition), D-024 (bundle asset identity: prefixes, ten-suffix model, 60 = 24 + 30 + 6 reconciliation) |
| Base commit | MC-07 HEAD `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | An asset manifest; a generation authorisation; a licence; a page implementation; a price or availability statement; evidence that any bundle, product, device or installation exists |

## 0. The generation gate — binding statement

- **No image-generation provider, credential or budget is authorised in this programme** (`X-03`; MC-01 B1–B3; MC-04 B16). No prompt has been sent and **no file exists for any requirement below**. No bundle visual has been produced, generated, downloaded, substituted or approved.
- **No bundle has a product photograph**, because the underlying products do not physically exist: no HUB, AIS, DISPLAY, WATCH, SENSE or PILOT unit, no enclosure, no BOM (`H-05`, `H-07`, `H-11`), no certification (`H-06`) and no tested installation (0 compatibility rows `SUPPORTED`).
- **No photograph, CGI render, mock-up, stock image or placeholder file may be generated, downloaded or substituted** for any requirement. A blocked brief with no file is the honest state; a fake file is a claims-policy failure.
- **All 60 requirements are `CONCEPT`/planned.** None describes a manufactured device, a real installation, a certification, a price or an availability. A generated asset may never be captioned or alt-texted as a real product, a real demonstration or evidence of compatibility.
- **MC-04 vectors, diagrams, lockups and templates may be referenced only as internal design inputs**, provisional and never as adopted public identity (D-005: adoption `BLOCKED`).
- **Identifiers.** `START-HERO-01`-style ids are MC-08 planning ids, not manifest registrations. A produced file must receive an immutable `MR-<CATEGORY>-<NNN>` registry id under `ASSET-PIPELINE.md` §4.2; the planning id then maps to it.
- **What would authorise generation** (all four, in writing, from the company owner): a budget authorisation with a cost ceiling; a provisioned provider account and credential in the approved secret store; verified commercial-use entitlement for CONCEPT imagery; and a Lead-approved write scope plus a recorded synthetic-content disclosure decision (B22/B23).

## 1. Identity and status model

**Stable id scheme.** Ten roles per bundle, fixed: `<BUNDLE>-HERO-01`, `-USE-02`, `-OVR-03`, `-EDN-04`, `-ECO-05`,
`-INS-06`, `-MOB-07`, `-TMB-08`, `-OG-09`, `-TEC-10`. Bundle prefixes: `START`, `CRUISE`, `SAIL`, `PROTECT`,
`COMPLETE`, `FLEETPKG`. The prefix `FLEETPKG` is deliberate and avoids collision with the `FLEET` product-family
asset ids.

**Three planned statuses, exactly as reconciled:**

| Status | Meaning | Which roles |
| --- | --- | --- |
| `BLOCKED_ON_IMAGE_GENERATION` | A scene/photographic or crop-derivative requirement that cannot exist while `X-03` is open and no real unit exists; brief recorded, `files: []` | `HERO-01`, `USE-02`, `INS-06`, `TMB-08` (4 per bundle → 24 total) |
| `CONCEPT` / `REUSED` | A requirement whose structural input is an existing, verified MC-04 internal vector/brief or lockup; no bundle file exists; the MC-04 input is reusable design material, not a public asset | `OVR-03`, `EDN-04`, `ECO-05`, `OG-09`, `TEC-10` (5 per bundle → 30 total) |
| `AUTHORED_NEW` | An authored specification with no rendered file: the mobile/crop contract for the bundle's compositions | `MOB-07` (1 per bundle → 6 total) |

**Every asset records:** stable id; bundle; intended use/page section; exact content; existing internal MC-04 vector
reference (only paths verified present under `docs/marea/brand/assets/**`; `NONE` where no file exists); image type;
format; target dimensions; ES alt text; EN alt text; provenance; real-versus-planned state; required rights;
publication gate; production priority.

**Priority scale (for a future authorised production milestone).** `P1` = needed first for a future bundle page
(hero, overview, editions/composition); `P2` = next (use scene, ecosystem, installation, catalogue card); `P3` =
supporting (mobile contract, social/OG, technical visual). Because every bundle is `NOT_FOR_SALE`, no priority is an
authorisation to produce anything.

## 2. Verified internal MC-04 references (present on disk 2026-10-30)

Reuse is internal and provisional. Paths below were checked against `MC-04-ASSETS.yaml` and the file listing; no
invented path appears anywhere in this document.

| MC-04 id | Verified path(s) | What it is | Permitted use here |
| --- | --- | --- | --- |
| `MR-DIA-003` | `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg` | Illustrative ecosystem overview with honest boundaries, no implied compatibility | Structural input for every `-OVR-03`, `-ECO-05` and `-TEC-10` diagram |
| `MR-DIA-002` | `docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg` | Illustrative PILOT supervised-steering boundary (control head, E-stop, takeover) | Structural input for `SAIL`/`COMPLETE` OVR/ECO/TEC and their hero safety concept |
| `MR-DIA-001` | `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg` | Illustrative receive-only AIS chain | Structural input for `CRUISE`/`COMPLETE` AIS content; receive-only semantics mandatory |
| `MR-BRD-005` | `docs/marea/brand/assets/logo/family/marea-family-{nav,hub,ais,pilot,sense,watch,display,weather,fleet}-lockup.svg` | Nine product-family lockups from one rule | Internal placeholder lockups in `-EDN-04`, `-TMB-08`, `-OG-09` |
| `MR-BRD-001/002/003` | `docs/marea/brand/assets/logo/marea-lockup-primary.svg`, `marea-lockup-mono.svg`, `marea-lockup-reversed.svg` | Primary, mono and reversed brand lockups | Internal placeholder in cards, OG drafts and diagrams; proposed identity only |
| `MR-BRD-008` | `docs/marea/brand/assets/social/og-marea-es-1200x630.jpg`, `og-marea-en-1200x630.jpg` (+ `.html` sources) | Brand OG cards, exactly 1200×630 | Method/format reference for every `-OG-09` (authored HTML/vector → deterministic render) |
| `MR-ICO-001` | `docs/marea/brand/assets/icons/ui/` — 57 authored 24×24 SVGs (e.g. `sensor.svg`, `bilge.svg`, `battery.svg`, `wind-sensor.svg`, `watch-monitoring.svg`, `cellular.svg`, `offline.svg`, `stale.svg`, `no-data.svg`, `alert-warning.svg`, `acknowledge.svg`, `calibration.svg`, `installation.svg`, `device-hub.svg`, `device-display.svg`, `device-control-head.svg`, `fleet.svg`, `settings.svg`, `update.svg`) | Authored marine-instrumentation icon set | Icons inside authored diagrams and mock-ups, always paired with visible text; never icon-only for critical meaning |
| `MR-BRD-012` | `docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html`, `-en.html` (+ PDF) | Blank installer commissioning/handover record | Reference for installation/handover panels; never depicted as filled or certified |
| `MR-BRD-011` | `docs/marea/brand/assets/packaging/marea-packaging-dieline-{hub,ais,display,watch,sense,pilot}.svg` | Provisional packaging dielines with `PROPOSED` dimensions | Context reference for "what ships"; never product imagery |

**No MC-04 file exists for:** bundle hero scenes, customer use scenes, installation photography, catalogue
thumbnails or any logo combining two or more families into a bundle mark. Those requirements are `BLOCKED` or
`NONE` and a future milestone must **extend** the existing briefs rather than create conflicting ones. No bundle
brand mark, bundle logo or bundle lockup may be invented: the six bundle names are solution names, not product
families.

## 3. Visual plan per bundle — the ten concepts

Every bundle plan covers the same ten intended visual concepts, mapped onto its ten fixed asset ids:

1. **Hero composition** → `-HERO-01` (blocked).
2. **Product arrangement** (what is physically in the solution) → `-OVR-03` (reused structural input).
3. **Customer use scenario** → `-USE-02` (blocked).
4. **Included-components graphic** (composition and counting rules) → `-EDN-04` (reused).
5. **Compatibility diagram** (honest arrows and barriers) → `-ECO-05` (reused).
6. **Installation sequence** → `-INS-06` (blocked).
7. **Subscription/entitlement visualisation** (what recurs, what does not, isolation) → `-TEC-10` (reused/authored).
8. **Cross-sell journey** (to the other five bundles, no price, no implied inclusion) → `-EDN-04` and `-TMB-08`.
9. **Catalogue/comparison thumbnail** → `-TMB-08` (blocked derivative).
10. **Social/Open Graph concept** → `-OG-09` (reused method).

`-MOB-07` is the responsive/crop contract that governs the whole set: it is an **authored specification**, not a
rendered image, and every bundle's mobile behaviour is defined there instead of in a second image per breakpoint.

Common rules for every row: no text inside generated pixels (all text is authored DOM/SVG); no fake UI or fake
screenshot; no price, availability, certification, review or guarantee cue; every diagram carries "illustrative — not
a compatibility claim"; every position/depth/instrument surface carries the navigation disclaimer; every WATCH alert
surface carries the WATCH limitation statement; every SENSE measurement surface carries the measurement-validity
statement; every AIS surface carries the receive-only disclaimer. Model releases are required for any visible person,
who stays anonymous. No third-party logo, product name or certification mark may appear.

---

## 4. START — `MAREA START` (`HUB-STANDARD` + `NAV-PRO`)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `START-HERO-01` | Future `/marea/start` hero | Owner at a used coastal helm/companionway using a tablet with a **blank** screen (DOM slot for authored data), existing instruments visible, no fake app UI; the "existing boat data, modern navigation" relationship is the subject | `NONE` — no MC-04 file; photo scene; brief extension required | `PHOTO_COMPOSITE` | 16:9; master 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` — no file exists; no real unit | No rights acquired; model release; no third-party mark | `PUBLICATION_BLOCKED`: `X-03`, `X-01`, D-005 | P1 |
| `START-USE-02` | Future `/marea/start`, "on board" section | Owner planning at a chart table with a blank-screen tablet; HUB appliance in soft focus behind; ordinary boat interior; no chart imagery | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 3:2; master 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no client/vessel identity | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `START-OVR-03` | "What START is" section | Authored four-band diagram: existing instruments → HUB Standard → local data on board → NAV Pro on the customer device; two boundary callouts: "no charts included" and "no steering control path" | `MR-DIA-003` `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg`; icons `MR-ICO-001` (`device-hub`, `connection`, `nav-bearing`, `no-data`) | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused MC-04 structural input); no bundle file | EMBARCARTE-authored; proposed identity only | `PUBLICATION_BLOCKED`: `X-01`, D-005; illustrative label required | P1 |
| `START-EDN-04` | "What is included" / composition graphic | Authored composition: `HUB-STANDARD` + `NAV-PRO` included; chart licence, customer device, cabling/adapters and installation assessment marked external; `NAV-ESSENTIAL` marked "documented variant, not the reference"; no price | `MR-BRD-005` NAV and HUB lockups; `MR-ICO-001` (`device-hub`, `nav-waypoint`, `installation`, `offline`) | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockups; no trademark symbols | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `START-ECO-05` | Ecosystem/compatibility section | Authored diagram: HUB ↔ NAV (read-mostly), HUB ↔ supported instruments per published matrix (dashed, "intended, pending validation"), no cloud dependency for local data, "illustrative — not a compatibility claim" | `MR-DIA-003`; icons `device-hub`, `connection`, `settings`, `offline` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no compatibility claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; illustrative label | P2 |
| `START-INS-06` | Professional installation section | Four panels: HUB mounting and fused power; connection of a documented supported data source; local dashboard/status check; NAV onboarding and customer handover | `MR-BRD-012` blank commissioning record as handover reference (`marea-installer-commissioning-record-es.html` / `-en.html`) | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; record never filled/signed | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `START-MOB-07` | Design hand-off only | Authored crop contract for START-HERO-01/USE-02/INS-06 at 390, 768 and 1440 px, marking the HUB and the blank screen as uncroppable; forbidden crop zones | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — specification only; no rendered file | Internal only | `INTERNAL_ONLY`; no publication | P3 |
| `START-TMB-08` | Future catalogue/comparison card grid | 4:3 crop derived from START-HERO-01 with the START solution label and NAV+HUB family lockups as DOM overlay; no price, no availability badge | `MR-BRD-005` NAV and HUB lockups | `CROP_DERIVATIVE` | 4:3; 1024×768 (960/640/400) | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative of a blocked master) | Inherits master rights; cannot exist first | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `START-OG-09` | Future OG metadata (post-approval) | Authored 1200×630 card: reversed MAREA lockup, solution name, one-line status ("internal definition; not available") and the no-compatibility-claim line; no photograph | `MR-BRD-008` method (`og-marea-es-1200x630.html` / `og-marea-en-1200x630.html`); `MR-BRD-003` reversed lockup | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method); no bundle file | Original authored; proposed identity only | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `START-TEC-10` | Technical/support section | Authored diagram: local/cloud boundary; licensed chart requirement; NAV Essential vs Pro entitlement difference; no ECDIS, no steering; compatibility rows `A-02`/`B-08` shown as planned | `MR-DIA-003`; icons `offline`, `stale`, `unknown`, `settings`, `update` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no certification/compatibility claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P3 |

**START alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `START-HERO-01` | «Persona en el puesto de gobierno de un velero costero usando una tableta con la pantalla en blanco, con los instrumentos existentes al fondo.» | "Person at a coastal sailboat helm using a tablet with a blank screen, existing instruments in the background." |
| `START-USE-02` | «Persona planificando en una mesa de cartas con una tableta de pantalla en blanco y una pasarela HUB desenfocada detrás.» | "Person planning at a chart table with a blank-screen tablet and a HUB gateway softly out of focus behind." |
| `START-OVR-03` | «Diagrama en cuatro bandas: instrumentos existentes, HUB Standard, datos locales a bordo y NAV Pro, con los límites señalados.» | "Four-band diagram: existing instruments, HUB Standard, local onboard data and NAV Pro, with boundaries marked." |
| `START-EDN-04` | «Gráfico de composición de MAREA START con HUB Standard y NAV Pro incluidos y los elementos externos señalados.» | "MAREA START composition graphic with HUB Standard and NAV Pro included and external items marked." |
| `START-ECO-05` | «Diagrama del ecosistema START: HUB y NAV con datos locales y ninguna dependencia de la nube para navegar.» | "START ecosystem diagram: HUB and NAV with local data and no cloud dependency for navigation." |
| `START-INS-06` | «Cuatro escenas de instalación: montaje del HUB, conexión de una fuente de datos, comprobación local y entrega al cliente.» | "Four installation scenes: HUB mounting, data-source connection, local check and customer handover." |
| `START-MOB-07` | «Contrato de recorte móvil para las imágenes de MAREA START.» | "Mobile crop contract for MAREA START imagery." |
| `START-TMB-08` | «Tarjeta de catálogo de MAREA START con una tableta en el puesto de gobierno y los logotipos de NAV y HUB.» | "MAREA START catalogue card with a tablet at the helm and the NAV and HUB lockups." |
| `START-OG-09` | «Tarjeta social de MAREA START (1200×630) con el logotipo y una línea de estado interna.» | "MAREA START social card (1200×630) with the lockup and an internal-status line." |
| `START-TEC-10` | «Diagrama técnico de START con el límite local/nube, las cartas licenciadas y la diferencia entre NAV Essential y Pro.» | "START technical diagram with the local/cloud boundary, licensed charts and the NAV Essential versus Pro difference." |

---

## 5. CRUISE — `MAREA CRUISE` (`NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `CRUISE-HERO-01` | Future `/marea/cruise` hero | Cockpit of a coastal cruiser with a fixed helm display (blank/DOM slot, no fake chart), a phone and an overcast Atlantic sea state; the integrated helm relationship is the subject | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 16:9; 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; proposed identity only | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P1 |
| `CRUISE-USE-02` | "Coastal cruising" section | Two anonymous crew on a coastal passage; helm display and phone present with blank screens; no readable chart, no fake alert | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 3:2; 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no client/vessel identity | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `CRUISE-OVR-03` | "What CRUISE is" section | Authored diagram: DISPLAY-7 at the helm, HUB Standard local data, AIS receiver receive-only, NAV Essential on the display; boundaries: charts licensed separately, no transponder, no collision-avoidance claim | `MR-DIA-003`; `MR-DIA-001` `marea-ais-receive-only.svg`; icons `device-display`, `device-hub`, `ais-receive-only`, `nav-bearing` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; receive-only semantics mandatory | `PUBLICATION_BLOCKED`: `X-01`, D-005; illustrative label | P1 |
| `CRUISE-EDN-04` | "What is included" graphic | Authored composition: `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7`; marked external: AIS VHF antenna + optional splitter, mounts, power/cabling, professional installation, licensed chart region; `DISPLAY-7` labelled `SIZE_NOT_FROZEN`; no price | `MR-BRD-005` NAV, HUB, AIS, DISPLAY lockups; `MR-BRD-011` display/hub/ais dielines as "what ships" context | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockups; proposed identity | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `CRUISE-ECO-05` | Ecosystem/compatibility section | Authored diagram: AIS antenna → receive-only receiver → HUB/NAV display; receive-only label; no transmission, no transponder, no collision avoidance; "illustrative — not a compatibility claim" | `MR-DIA-001`; `MR-DIA-003`; icons `ais-receive-only`, `ais-target`, `device-hub`, `device-display` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no AIS redistribution implied | `PUBLICATION_BLOCKED`: `X-01`, D-005; AIS disclaimer mandatory | P2 |
| `CRUISE-INS-06` | Installation section | Four panels: display mount and cable route; HUB mounting and power; AIS antenna/splitter and receiver; commissioning, update check and handover | `MR-BRD-012` commissioning record reference | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no filled/signed record | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `CRUISE-MOB-07` | Design hand-off only | Authored crop contract for CRUISE hero/use/installation at 390/768/1440 px; display and antenna kept; chart slot and safety labels uncroppable | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — no rendered file | Internal only | `INTERNAL_ONLY` | P3 |
| `CRUISE-TMB-08` | Future catalogue/comparison card | 4:3 crop from CRUISE-HERO-01 with display + lockups overlay and "integrated coastal cruising" label; no price/availability | `MR-BRD-005` NAV, HUB, AIS, DISPLAY lockups | `CROP_DERIVATIVE` | 4:3; 1024×768 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative) | Inherits master rights | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `CRUISE-OG-09` | Future OG metadata | Authored 1200×630 card with reversed MAREA lockup, solution name, internal-status line and receive-only AIS note; no photograph | `MR-BRD-008` method; `MR-BRD-003`; `MR-BRD-005` | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method) | Original authored; proposed identity | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `CRUISE-TEC-10` | Technical section | Authored diagram: chart licensing, receive-only AIS, DISPLAY base software vs NAV entitlement, `SIZE_NOT_FROZEN`, no ECDIS and no collision-avoidance claim | `MR-DIA-001`; `MR-DIA-003`; icons `ais-receive-only`, `stale`, `offline`, `unknown`, `update` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused) | Original authored; no certification claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P3 |

**CRUISE alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `CRUISE-HERO-01` | «Bañera de un crucero costero con una pantalla fija de puesto de gobierno, un teléfono y mar de fondo, con las pantallas en blanco.» | "Cockpit of a coastal cruiser with a fixed helm display, a phone and an overcast sea, screens blank." |
| `CRUISE-USE-02` | «Dos tripulantes anónimos en una travesía costera con una pantalla de puesto de gobierno y un teléfono de pantalla en blanco.» | "Two anonymous crew on a coastal passage with a helm display and a blank-screen phone." |
| `CRUISE-OVR-03` | «Diagrama de CRUISE con pantalla DISPLAY-7, pasarela HUB, receptor AIS de solo escucha y NAV Essential.» | "CRUISE diagram with a DISPLAY-7 screen, HUB gateway, receive-only AIS receiver and NAV Essential." |
| `CRUISE-EDN-04` | «Gráfico de composición de MAREA CRUISE con las cuatro piezas incluidas y los elementos externos señalados.» | "MAREA CRUISE composition graphic with the four included items and external items marked." |
| `CRUISE-ECO-05` | «Diagrama de la cadena AIS de solo recepción desde la antena hasta la pantalla, sin transpondedor.» | "Receive-only AIS chain diagram from antenna to display, without a transponder." |
| `CRUISE-INS-06` | «Cuatro escenas de instalación: pantalla, pasarela HUB, antena y receptor AIS, y puesta en servicio.» | "Four installation scenes: display, HUB gateway, AIS antenna and receiver, and commissioning." |
| `CRUISE-MOB-07` | «Contrato de recorte móvil para las imágenes de MAREA CRUISE.» | "Mobile crop contract for MAREA CRUISE imagery." |
| `CRUISE-TMB-08` | «Tarjeta de catálogo de MAREA CRUISE con la pantalla de puesto de gobierno y los logotipos de la solución.» | "MAREA CRUISE catalogue card with the helm display and the solution lockups." |
| `CRUISE-OG-09` | «Tarjeta social de MAREA CRUISE (1200×630) con el logotipo y una línea de estado interna.» | "MAREA CRUISE social card (1200×630) with the lockup and an internal-status line." |
| `CRUISE-TEC-10` | «Diagrama técnico de CRUISE con cartas licenciadas, AIS de solo escucha y el límite de la pantalla.» | "CRUISE technical diagram with licensed charts, receive-only AIS and the display boundary." |

---

## 6. SAIL — `MAREA SAIL` (`NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` quotation + `SENSE-WIND` conditional)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SAIL-HERO-01` | Future `/marea/sail` hero (blocked bundle) | Supervised steering control head with a physically distinct E-stop and a manual-takeover lever at a used sailing-yacht helm; no hands-off-wheel scene; sea/horizon soft behind | `MR-DIA-002` `marea-pilot-supervised-boundary.svg` as structural reference | `PHOTO_COMPOSITE` | 16:9; 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION`; bundle `BLOCKED` (`PILOT_SAFETY_GATE`) | Model release; no invented certification | `PUBLICATION_BLOCKED`: `X-03`, `X-01`, H-01/P-04 | P1 |
| `SAIL-USE-02` | "On passage" section | Anonymous skipper from behind at the helm under sail, one hand on the wheel, the other near the control head; no face, no celebration framing | `NONE` — photo scene; use `MR-DIA-002` as structural safety reference | `PHOTO_COMPOSITE` | 3:2; 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `SAIL-OVR-03` | "What SAIL is" section | Authored four-band diagram: survey and vessel decision; installed system (control head, computer, motor control, drive, feedback, E-stop, isolation); supervised operation; boundaries (no autonomy, no remote helm, no collision avoidance, no certification) | `MR-DIA-002`; `MR-DIA-003`; icons `device-control-head`, `installation`, `fuse-breaker`, `power`, `service` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no certification badges | `PUBLICATION_BLOCKED`: `X-01`, D-005; PILOT disclaimer | P1 |
| `SAIL-EDN-04` | "What is included" graphic | Authored composition: `NAV-PRO` + `HUB-STANDARD` included; `PILOT-COASTAL` marked `QUOTATION_REQUIRED` after survey; `SENSE-WIND` marked `CONDITIONAL` on measurement/wind-mode evidence; external line: drive, cabling, E-stop assembly, commissioning, sea trial, training, conformity | `MR-BRD-005` NAV, HUB, PILOT, SENSE lockups; `MR-BRD-012` commissioning record reference | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockups; no price | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `SAIL-ECO-05` | Ecosystem/compatibility section | Authored diagram: NAV route context **in** (read-only), HUB bounded data/status, SENSE wind input gated "qualified as steering input", all read-only out to WATCH, and a hard barrier "no remote or cloud command path"; "illustrative — not a compatibility claim" | `MR-DIA-002`; `MR-DIA-003`; icons `nav-waypoint`, `device-hub`, `wind-true`, `watch-monitoring`, `connection` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no compatibility claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; arrows must match `I-01`–`I-03` | P2 |
| `SAIL-INS-06` | Installation/commissioning section | Four panels: vessel and steering survey; drive and feedback mounting; cabling, power protection, E-stop and motor isolation with tidy glands; handover of commissioning record and supervised trial briefing | `MR-BRD-012` blank commissioning record | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no filled/signed record | `PUBLICATION_BLOCKED`: `X-03`, `X-01`, H-01 | P2 |
| `SAIL-MOB-07` | Design hand-off only | Authored crop contract for SAIL hero/use/installation at 390/768/1440 px; E-stop + manual-takeover pair and supervised-steering disclaimer uncroppable | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — no rendered file | Internal only | `INTERNAL_ONLY` | P3 |
| `SAIL-TMB-08` | Future catalogue/comparison card | 4:3 crop from SAIL-HERO-01 with "supervised steering" label and lockups; no price/availability; bundle `BLOCKED` label | `MR-BRD-005` NAV, HUB, PILOT, SENSE lockups | `CROP_DERIVATIVE` | 4:3; 1024×768 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative) | Inherits master rights | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `SAIL-OG-09` | Future OG metadata | Authored 1200×630 card with reversed MAREA lockup, solution name, "quotation required / not available" status and the supervised-steering line; no photograph | `MR-BRD-008` method; `MR-BRD-003`; `MR-BRD-005` | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method) | Original authored | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `SAIL-TEC-10` | Technical section | Authored diagram: mode/evidence table (heading hold; wind-angle `CONDITIONAL`; route/track `TARGET_ONLY`); safety path (E-stop → independent motor isolation → watchdog → manual takeover); "no remote command path"; quotation model | `MR-DIA-002`; icons `device-control-head`, `alert-alarm`, `fuse-breaker`, `acknowledge`, `settings` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused) | Original authored; no certification claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P3 |

**SAIL alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `SAIL-HERO-01` | «Cabezal de control de gobierno asistido con paro de emergencia y palanca de toma manual en una consola de timón.» | "Supervised steering control head with an emergency stop and a manual takeover lever on a helm console." |
| `SAIL-USE-02` | «Patrón de espaldas al timón con una mano en la rueda y la otra junto al cabezal de control.» | "Skipper seen from behind at the helm, one hand on the wheel and the other near the control head." |
| `SAIL-OVR-03` | «Diagrama en cuatro bandas: estudio del barco, sistema instalado, uso supervisado y límites del gobierno asistido.» | "Four-band diagram: vessel survey, installed system, supervised operation and supervised-steering boundaries." |
| `SAIL-EDN-04` | «Gráfico de composición de MAREA SAIL con NAV Pro y HUB incluidos, PILOT sujeto a presupuesto y SENSE Wind condicional.» | "MAREA SAIL composition graphic with NAV Pro and HUB included, PILOT subject to quotation and SENSE Wind conditional." |
| `SAIL-ECO-05` | «Diagrama del ecosistema SAIL con contexto de NAV de entrada, datos del HUB, viento condicionado y ninguna orden remota.» | "SAIL ecosystem diagram with NAV context inbound, HUB data, conditional wind and no remote command." |
| `SAIL-INS-06` | «Cuatro escenas de instalación: estudio del barco, montaje del accionamiento, cableado con paro de emergencia y entrega de documentación.» | "Four installation scenes: vessel survey, drive mounting, cabling with emergency stop, and documentation handover." |
| `SAIL-MOB-07` | «Contrato de recorte móvil para las imágenes de MAREA SAIL.» | "Mobile crop contract for MAREA SAIL imagery." |
| `SAIL-TMB-08` | «Tarjeta de catálogo de MAREA SAIL con el cabezal de control, el paro de emergencia y una etiqueta de gobierno supervisado.» | "MAREA SAIL catalogue card with the control head, emergency stop and a supervised-steering label." |
| `SAIL-OG-09` | «Tarjeta social de MAREA SAIL (1200×630) con el logotipo y una línea de estado que indica presupuesto previo.» | "MAREA SAIL social card (1200×630) with the lockup and a status line indicating prior quotation." |
| `SAIL-TEC-10` | «Diagrama técnico de modos y ruta de seguridad del gobierno asistido, con paro de emergencia, aislamiento y toma manual.» | "Technical diagram of supervised-steering modes and safety path with emergency stop, isolation and manual takeover." |

---

## 7. PROTECT — `MAREA PROTECT` (`WATCH-CORE` + `SENSE-ESSENTIALS` kit)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `PROTECT-HERO-01` | Future `/marea/protect` hero | Shore-side moment: anonymous person out of focus holding a phone with a **blank** screen; a moored yacht soft in the background; overcast marina; the distance between phone and boat is the story; WATCH device not shown as hero | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 16:9; 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION`; no real unit | Model release; no third-party boat marks | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P1 |
| `PROTECT-USE-02` | "Away from the boat" section | Owner at a marina pontoon checking a blank-screen phone (DOM slot for the alert composite); the boat visible along the pontoon; ordinary clothing, honest weather | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 3:2; 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; blank screen mandatory | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `PROTECT-OVR-03` | "What PROTECT is" section | Authored diagram: WATCH Core device + SENSE Essentials kit expanding exactly to SENSE Power + SENSE Bilge → monitoring subscription → ashore; boundaries: HUB not required, no SENSE connectivity, no control; duplicate-module rule shown | `MR-DIA-003`; icons `watch-monitoring`, `battery`, `bilge`, `sensor`, `calibration`, `device-hub` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; measurement wording mandatory | `PUBLICATION_BLOCKED`: `X-01`, D-005; illustrative label | P1 |
| `PROTECT-EDN-04` | "What is included" graphic | Authored composition: `WATCH-CORE` + `SENSE-ESSENTIALS` (explicit expansion to Power + Bilge) + required monitoring subscription; marked external: cellular/SIM/data, installation materials, installation labour, commissioning/registration, consent/privacy notice; HUB marked optional; duplicate loose module marked "not selectable"; no price | `MR-BRD-005` WATCH and SENSE lockups; `MR-BRD-012` commissioning record reference | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockups; no price | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `PROTECT-ECO-05` | Ecosystem/compatibility section | Authored diagram: SENSE modules → WATCH (`I-08`, dashed "planned, pending validation"); optional HUB local dashboard (`I-11`, conditional); no direct module-to-cloud arrow (struck through); "no helm, no steering, no switching"; "illustrative — not a compatibility claim" | `MR-DIA-003`; icons `watch-monitoring`, `device-hub`, `cellular`, `offline`, `no-data`, `sensor` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no compatibility claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; arrows must match `I-08`/`I-11` | P2 |
| `PROTECT-INS-06` | Installation/commissioning section | Four panels: WATCH mounting and fused power; SENSE Power wiring and SENSE Bilge mounting; calibration and verification of both modules; device registration, ownership proof and a test alert acknowledged on a blank-screen phone | `MR-BRD-012` commissioning record reference | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no fake coverage/signal values | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `PROTECT-MOB-07` | Design hand-off only | Authored crop contract for PROTECT hero/use/installation at 390/768/1440 px plus a 9:16 variant; phone, boat mast, measurement-validity band and WATCH limitation band uncroppable | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — no rendered file | Internal only | `INTERNAL_ONLY` | P3 |
| `PROTECT-TMB-08` | Future catalogue/comparison card | 4:3 crop from PROTECT-HERO-01 with the PROTECT label and WATCH+SENSE lockups; "conditional awareness" label; no price/availability | `MR-BRD-005` WATCH and SENSE lockups | `CROP_DERIVATIVE` | 4:3; 1024×768 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative) | Inherits master rights | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `PROTECT-OG-09` | Future OG metadata | Authored 1200×630 card with reversed MAREA lockup, solution name, internal-status line and the WATCH conditional-awareness line verbatim; no photograph | `MR-BRD-008` method; `MR-BRD-003`; `MR-BRD-005` | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method) | Original authored | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `PROTECT-TEC-10` | Technical/support section | Authored state-machine visual: `EVENT_OBSERVED` → `RULE_MATCHED` → `ALERT_CREATED` → `QUEUED` → `PROVIDER_ACCEPTED` → `DELIVERED_WHEN_CONFIRMED` → `ACKNOWLEDGED`, with `EXPIRED`/`FAILED`/`DELIVERY_UNKNOWN` branches; distinct timestamp legend; isolation panel: local measurement/alarms continue on subscription expiry | `MR-DIA-003`; icons `alert-warning`, `alert-caution`, `acknowledge`, `stale`, `offline`, `no-data`, `update`, `cellular` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no delivery guarantee | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P3 |

**PROTECT alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `PROTECT-HERO-01` | «Mano sosteniendo un teléfono con la pantalla en blanco y un velero fondeado desenfocado al fondo.» | "Hand holding a phone with a blank screen and a sailboat at anchor softly out of focus behind." |
| `PROTECT-USE-02` | «Persona en el pantalán consultando un teléfono de pantalla en blanco, con la embarcación al fondo.» | "Person on a pontoon checking a blank-screen phone, with the vessel in the background." |
| `PROTECT-OVR-03` | «Diagrama de PROTECT: equipo WATCH Core y conjunto SENSE Essentials con los módulos Power y Bilge, y la suscripción de monitorización.» | "PROTECT diagram: WATCH Core device and SENSE Essentials kit with the Power and Bilge modules, plus the monitoring subscription." |
| `PROTECT-EDN-04` | «Gráfico de composición de MAREA PROTECT con WATCH Core, el conjunto Essentials y la suscripción, y los elementos externos señalados.» | "MAREA PROTECT composition graphic with WATCH Core, the Essentials kit and the subscription, and external items marked." |
| `PROTECT-ECO-05` | «Diagrama del ecosistema PROTECT con los módulos hacia WATCH, HUB opcional y ninguna ruta directa a la nube ni función de gobierno.» | "PROTECT ecosystem diagram with modules to WATCH, optional HUB and no direct cloud path or steering function." |
| `PROTECT-INS-06` | «Cuatro escenas: montaje del equipo WATCH, instalación de los módulos de energía y sentina, calibración y prueba de un aviso.» | "Four scenes: WATCH device mounting, power and bilge module installation, calibration and a test alert." |
| `PROTECT-MOB-07` | «Contrato de recorte móvil para las imágenes de MAREA PROTECT, incluida la variante 9:16.» | "Mobile crop contract for MAREA PROTECT imagery, including the 9:16 variant." |
| `PROTECT-TMB-08` | «Tarjeta de catálogo de MAREA PROTECT con un teléfono en el pantalán y una embarcación fondeada.» | "MAREA PROTECT catalogue card with a phone on a pontoon and a vessel at anchor." |
| `PROTECT-OG-09` | «Tarjeta social de MAREA PROTECT (1200×630) con el logotipo y la línea de conocimiento condicional.» | "MAREA PROTECT social card (1200×630) with the lockup and the conditional-awareness line." |
| `PROTECT-TEC-10` | «Diagrama del modelo de estados de un aviso WATCH con las marcas de tiempo y los estados de entrega desconocida.» | "WATCH alert state-model diagram with timestamps and delivery-unknown states." |

---

## 8. COMPLETE — `MAREA COMPLETE` (nine-line integrated solution, quoted)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `COMPLETE-HERO-01` | Future `/marea/complete` hero (blocked bundle) | A used helm with a fixed display (blank), a supervised-steering control head concept and an onboard locker with modules visible; one coordinated refit, not a showroom | `MR-DIA-002` as structural reference; `NONE` photo file | `PHOTO_COMPOSITE` | 16:9; 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION`; bundle `BLOCKED` | Model release; no invented certification | `PUBLICATION_BLOCKED`: `X-03`, `X-01`, PILOT gate | P1 |
| `COMPLETE-USE-02` | "One coordinated project" section | Owner and installer (anonymous) at an electrical panel and a helm display with blank screens; documentation visible; no readable values | `MR-BRD-012` commissioning record reference | `PHOTO_COMPOSITE` | 3:2; 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no filled/signed record | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `COMPLETE-OVR-03` | "What COMPLETE is" section | Authored product-arrangement diagram: NAV-PRO, HUB-PRO, DISPLAY-7, WATCH-CORE, four SENSE modules (Power, Bilge, Tanks, ENV), PILOT-COASTAL quotation; boundaries: AIS/WEATHER optional, no control, quotation model | `MR-DIA-003`; `MR-DIA-002`; icons `nav-bearing`, `device-hub`, `device-display`, `watch-monitoring`, `sensor`, `device-control-head` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no price | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `COMPLETE-EDN-04` | "What is included" graphic | Authored composition of the nine reference lines plus explicit quotation scope (survey, vessel-specific components, labour, commissioning, training, conformity); `AIS-RECEIVER`/`WEATHER-PRO` marked optional; `PILOT-PRO`/`PILOT-SAIL` marked not selectable as priced lines; no price | `MR-BRD-005` all six relevant lockups; `MR-BRD-012`; `MR-BRD-011` packaging dielines as "what ships" context | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockups; no price | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `COMPLETE-ECO-05` | Ecosystem/compatibility section | Authored subsystem map: NAV/HUB/DISPLAY/WATCH/SENSE/PILOT read-only boundaries; hard barriers "no remote or cloud command path" and "no steering authority outside PILOT"; AIS receive-only where drawn; "illustrative — not a compatibility claim" | `MR-DIA-003`; `MR-DIA-002`; `MR-DIA-001`; icons `device-hub`, `device-display`, `watch-monitoring`, `device-control-head`, `fleet` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no compatibility claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P2 |
| `COMPLETE-INS-06` | Installation/commissioning section | Multi-panel sequence: compatibility and vessel survey; HUB/DISPLAY mounting and power; SENSE modules and calibration; WATCH provisioning; PILOT installation and E-stop/motor isolation; commissioning record, supervised trials and training handover | `MR-BRD-012` commissioning record reference | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no certificate depicted | `PUBLICATION_BLOCKED`: `X-03`, `X-01`, PILOT gate | P2 |
| `COMPLETE-MOB-07` | Design hand-off only | Authored crop contract for COMPLETE hero/use/installation at 390/768/1440 px; E-stop/manual-takeover, display safety labels and measurement wording uncroppable | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — no rendered file | Internal only | `INTERNAL_ONLY` | P3 |
| `COMPLETE-TMB-08` | Future catalogue/comparison card | 4:3 crop from COMPLETE-HERO-01 with "quotation required" label and solution lockups; no price/availability; bundle blocked label | `MR-BRD-005` relevant lockups | `CROP_DERIVATIVE` | 4:3; 1024×768 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative) | Inherits master rights | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `COMPLETE-OG-09` | Future OG metadata | Authored 1200×630 card with reversed MAREA lockup, solution name, "quotation required / not available" status and the no-control line; no photograph | `MR-BRD-008` method; `MR-BRD-003`; `MR-BRD-005` | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method) | Original authored | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `COMPLETE-TEC-10` | Technical section | Authored diagram: subsystem readiness gates (each blocked), quotation model, no-certification and no-control boundaries, subscription isolation, and the separation between installed hardware and recurring entitlements | `MR-DIA-002`; `MR-DIA-003`; icons `settings`, `service`, `update`, `stale`, `unknown`, `support` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused) | Original authored; no certification claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; engineering review pending | P3 |

**COMPLETE alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `COMPLETE-HERO-01` | «Puesto de gobierno usado con pantalla fija, cabezal de gobierno asistido y módulos visibles en un armario; una reforma coordinada.» | "Used helm with a fixed display, supervised-steering control head and modules visible in a locker; a coordinated refit." |
| `COMPLETE-USE-02` | «Propietario e instalador anónimos junto a un cuadro eléctrico y una pantalla de puesto de gobierno en blanco.» | "Anonymous owner and installer at an electrical panel and a blank helm display." |
| `COMPLETE-OVR-03` | «Diagrama de disposición de los sistemas de MAREA COMPLETE: navegación, pasarela, pantalla, vigilancia, módulos y gobierno asistido.» | "MAREA COMPLETE system-arrangement diagram: navigation, gateway, display, monitoring, modules and supervised steering." |
| `COMPLETE-EDN-04` | «Gráfico de composición de MAREA COMPLETE con las nueve líneas de referencia y el alcance de presupuesto señalado.» | "MAREA COMPLETE composition graphic with the nine reference lines and the quotation scope marked." |
| `COMPLETE-ECO-05` | «Mapa de subsistemas de COMPLETE con relaciones de solo lectura y barreras claras frente a cualquier mando.» | "COMPLETE subsystem map with read-only relationships and clear barriers against any command." |
| `COMPLETE-INS-06` | «Secuencia de instalación de varios subsistemas: estudio, montaje, calibración, puesta en servicio y entrega con formación.» | "Multi-subsystem installation sequence: survey, mounting, calibration, commissioning and handover with training." |
| `COMPLETE-MOB-07` | «Contrato de recorte móvil para las imágenes de MAREA COMPLETE.» | "Mobile crop contract for MAREA COMPLETE imagery." |
| `COMPLETE-TMB-08` | «Tarjeta de catálogo de MAREA COMPLETE con un puesto de gobierno integrado y la etiqueta de presupuesto previo.» | "MAREA COMPLETE catalogue card with an integrated helm and a prior-quotation label." |
| `COMPLETE-OG-09` | «Tarjeta social de MAREA COMPLETE (1200×630) con el logotipo y una línea de estado que indica presupuesto previo.» | "MAREA COMPLETE social card (1200×630) with the lockup and a status line indicating prior quotation." |
| `COMPLETE-TEC-10` | «Diagrama técnico de COMPLETE con las puertas de preparación de cada subsistema y los límites de control y certificación.» | "COMPLETE technical diagram with each subsystem's readiness gates and the control and certification boundaries." |

---

## 9. FLEETPKG — `MAREA FLEET package` (B2B contracted solution)

| ID | Intended use / page section | Exact content | MC-04 reference (verified) | Type | Format / dims | Provenance & state | Rights | Gate | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `FLEETPKG-HERO-01` | Future `/marea/fleet-package` hero | Professional operator context: marina office or charter base with a monitoring screen showing no readable data (blank/DOM slot), vessels visible outside; the operations desk, not a consumer app | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 16:9; 1920×1080 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION`; no deployed service | Model release; no client identity; no fake dashboard | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P1 |
| `FLEETPKG-USE-02` | "Fleet operations" section | Harbour master/operator at a desk with documents and a blank screen; several vessels visible through a window; ordinary working environment; no customer data | `NONE` — photo scene; brief extension required | `PHOTO_COMPOSITE` | 3:2; 1600×1067 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no identifiable client | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `FLEETPKG-OVR-03` | "What the package is" section | Authored diagram: organisation SaaS (FLEET-START/BUSINESS, ENTERPRISE contracted) + onboarding/registration/migration/training services + optional hardware/connectivity per vessel; explicit "hardware not included by default" | `MR-DIA-003`; icons `fleet`, `device-hub`, `watch-monitoring`, `settings`, `service`, `installation` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no SLA claim | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `FLEETPKG-EDN-04` | "What is included" graphic | Authored composition: subscription per vessel/month (VAT excluded, hypothesis), onboarding as a separately quoted service, explicit limits, eight roles, audit/export/deletion, hardware/connectivity/installation optional; no "unlimited"; no price | `MR-BRD-005` FLEET lockup; `MR-BRD-012` onboarding record context | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Internal lockup; no price | `PUBLICATION_BLOCKED`: `X-01`, D-005 | P1 |
| `FLEETPKG-ECO-05` | Ecosystem/compatibility section | Authored diagram: read-only telemetry from customer-owned WATCH/HUB under a written contract; tenant isolation boundary; no write path to any vessel; optional WEATHER/AIS per provider rights; "illustrative — not a compatibility claim" | `MR-DIA-003`; `MR-DIA-001`; icons `fleet`, `watch-monitoring`, `device-hub`, `ais-receive-only`, `offline` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no AIS redistribution implied | `PUBLICATION_BLOCKED`: `X-01`, D-005; tenant-isolation review pending | P2 |
| `FLEETPKG-INS-06` | Onboarding section | Four panels: organisation setup and role design; vessel import and device enrollment; permission and audit configuration with the customer; training and contracted handover | `MR-BRD-012` commissioning record reference | `PHOTO_COMPOSITE` | 3:2 per panel; 1600×1067 each | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` | Model release; no customer data; no fake contract | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `FLEETPKG-MOB-07` | Design hand-off only | Authored crop contract for FLEETPKG hero/use/installation at 390/768/1440 px; blank screen, vessel context and "no control" band uncroppable | `NONE` — authored specification | `SPECIFICATION` | 16:9; 1920×1080 authored sheet | `PLANNED` / `AUTHORED_NEW` — no rendered file | Internal only | `INTERNAL_ONLY` | P3 |
| `FLEETPKG-TMB-08` | Future catalogue/comparison card | 4:3 crop from FLEETPKG-HERO-01 with FLEET lockup, "contracted B2B solution" label; no price, no SLA | `MR-BRD-005` FLEET lockup | `CROP_DERIVATIVE` | 4:3; 1024×768 | `PLANNED` / `BLOCKED_ON_IMAGE_GENERATION` (derivative) | Inherits master rights | `PUBLICATION_BLOCKED`: `X-03`, `X-01` | P2 |
| `FLEETPKG-OG-09` | Future OG metadata | Authored 1200×630 card with reversed MAREA lockup, solution name, "contracted B2B definition; not available" status and no-SLA line; no photograph | `MR-BRD-008` method; `MR-BRD-003`; `MR-BRD-005` | `AUTHORED_HTML_VECTOR` | exactly 1200×630 | `PLANNED` / `CONCEPT` (reused method) | Original authored | `PUBLICATION_BLOCKED`: `X-01`, D-005, B22 | P3 |
| `FLEETPKG-TEC-10` | Technical section | Authored diagram: tenancy model (organisation → memberships → roles → vessels), server-side authorisation, audit/export/deletion, read-only telemetry, explicit limits, `NO_SLA_ESTABLISHED`, hardware excluded; no remote control | `MR-DIA-003`; icons `fleet`, `settings`, `update`, `service`, `support`, `offline` | `AUTHORED_SVG` | 16:9; 1920×1080 | `PLANNED` / `CONCEPT` (reused); no bundle file | Original authored; no security certification claim | `PUBLICATION_BLOCKED`: `X-01`, D-005; security review pending | P3 |

**FLEETPKG alt-text table**

| ID | ES alt | EN alt |
| --- | --- | --- |
| `FLEETPKG-HERO-01` | «Oficina de una base náutica con una pantalla de operaciones sin datos legibles y varias embarcaciones visibles fuera.» | "Marina base office with an operations screen showing no readable data and several vessels visible outside." |
| `FLEETPKG-USE-02` | «Operador en un escritorio con documentación y una pantalla en blanco, con embarcaciones al fondo.» | "Operator at a desk with documents and a blank screen, vessels in the background." |
| `FLEETPKG-OVR-03` | «Diagrama de MAREA FLEET package: suscripción por barco, servicios de alta y hardware opcional no incluido por defecto.» | "MAREA FLEET package diagram: per-vessel subscription, onboarding services and optional hardware not included by default." |
| `FLEETPKG-EDN-04` | «Gráfico de composición del paquete FLEET con la suscripción, el alta como servicio y los límites explícitos.» | "FLEET package composition graphic with the subscription, onboarding as a service and explicit limits." |
| `FLEETPKG-ECO-05` | «Diagrama del ecosistema FLEET con telemetría de solo lectura, aislamiento entre organizaciones y ninguna ruta de mando.» | "FLEET ecosystem diagram with read-only telemetry, tenant isolation and no command path." |
| `FLEETPKG-INS-06` | «Cuatro escenas de alta: configuración de la organización, importación de barcos, permisos y formación.» | "Four onboarding scenes: organisation setup, vessel import, permissions and training." |
| `FLEETPKG-MOB-07` | «Contrato de recorte móvil para las imágenes del paquete MAREA FLEET.» | "Mobile crop contract for MAREA FLEET package imagery." |
| `FLEETPKG-TMB-08` | «Tarjeta de catálogo del paquete MAREA FLEET con una oficina de operaciones y el logotipo de FLEET.» | "MAREA FLEET package catalogue card with an operations office and the FLEET lockup." |
| `FLEETPKG-OG-09` | «Tarjeta social del paquete MAREA FLEET (1200×630) con el logotipo y una línea de estado contractual.» | "MAREA FLEET package social card (1200×630) with the lockup and a contracted-status line." |
| `FLEETPKG-TEC-10` | «Diagrama técnico de FLEET con el modelo de organización y roles, autorización en servidor y telemetría de solo lectura.» | "FLEET technical diagram with the organisation and role model, server-side authorisation and read-only telemetry." |

---

## 10. Reconciliation (exact)

| Bundle | Planned | `BLOCKED_ON_IMAGE_GENERATION` | `CONCEPT` / `REUSED` | `AUTHORED_NEW` | Publicly approved | Real-product photographs | Generated files |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `START` | 10 | 4 (HERO-01, USE-02, INS-06, TMB-08) | 5 (OVR-03, EDN-04, ECO-05, OG-09, TEC-10) | 1 (MOB-07) | 0 | 0 | 0 |
| `CRUISE` | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| `SAIL` | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| `PROTECT` | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| `COMPLETE` | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| `FLEETPKG` | 10 | 4 | 5 | 1 | 0 | 0 | 0 |
| **Total** | **60** | **24** | **30** | **6** | **0** | **0** | **0** |

**Reconciliation statement.** 60 planned assets = **24 `BLOCKED_ON_IMAGE_GENERATION`** (4 per bundle: HERO-01, USE-02,
INS-06, TMB-08) + **30 `CONCEPT`/`REUSED`** (5 per bundle: OVR-03, EDN-04, ECO-05, OG-09, TEC-10) + **6
`AUTHORED_NEW`** (MOB-07 per bundle). 0 publicly approved. 0 real-product photographs. 0 generated, downloaded or
substituted files. No asset is counted twice: each stable id appears exactly once, in one bundle, in one status class.

## 11. Blocker register and exact unblock conditions

| Blocker | What it prevents | Exact external condition to unblock |
| --- | --- | --- |
| `X-03` / MC-01 B1–B3 | Any image generation at all | Written budget authorisation with cost ceiling; provisioned account/credential in the approved secret store; verified commercial-use entitlement |
| `H-05`, `H-07`, `H-11`, `H-08` | Product photography or accurate CGI of any device/installation | Built and tested physical units (HUB, AIS, DISPLAY, WATCH, SENSE, PILOT) with serial/provenance and photographed installations |
| `X-01` / D-005 | Publishing any asset carrying the MAREA identity | EUIPO/OEPM clearance, professional originality/prior-art review and a Lead adoption decision |
| `B22` | Publishing generated imagery at all | A recorded legal decision on synthetic-content disclosure (EU AI Act transparency) |
| `B23` | Creating the first real file in `public/` | A Lead-approved write scope for `public/assets/marea/**` plus the page's own scope |
| `PILOT_SAFETY_GATE = BLOCKED` (`H-01`, `P-04`) | SAIL/COMPLETE steering artwork implying performed validation | Bench, E-stop, motor-isolation and supervised sea-trial evidence at MC-13; until then the supervised labels stay and the bundle stays blocked |
| `WATCH_*` service `NOT_FOUND`, `SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED` | Any PROTECT/COMPLETE visual implying a working service or measured sensor | MC-13-WATCH delivery/identity/entitlement evidence and SENSE measurement/calibration evidence |
| 0 compatibility rows `SUPPORTED` | Any compatibility diagram implying a tested path | Recorded device/firmware/direction test records and an independent reviewer, per D5 |

## 12. Controls and honest evidence statement

| Control | Requirement |
| --- | --- |
| Manifest first | No file ships without an `MR-<CATEGORY>-<NNN>` manifest entry with real bytes, dimensions, SHA-256, rights and alt/caption |
| No duplicates | One file per width × format; no parallel bundle asset trees; bundle ids map to manifest ids, never the reverse |
| Review separation | Author ≠ reviewer for visual and alt-text review; ES/EN alt reviewed by a second person |
| Claims gate | Any image used next to a claim must satisfy `COMMERCIAL-BRAND-CLAIMS-POLICY.md`; images are never evidence of certification, testing, compatibility or availability |
| Disclosure | The CONCEPT label and the mandated disclaimers are mandatory wherever a generated scene appears |
| Boundary evidence | PILOT artwork reviewed against the no-autonomy/no-remote-control rule; WATCH artwork reviewed against "provider acceptance is not delivery"; SENSE artwork against "no accuracy claim" |
| Mobile contract | `-MOB-07` is the single responsive specification for each bundle; no second crop image per breakpoint is invented |

**Honest evidence statement.** This document was produced by reading the MC-04 asset and brief manifests, the
`ASSET-PIPELINE.md` contract, the photography/CGI art direction, `BUNDLE-ARCHITECTURE.md` and the batch-01/02/03 asset
requirements. Every MC-04 id and path cited was verified against `MC-04-ASSETS.yaml` and the underlying files were
confirmed present on disk on 2026-10-30. **No asset was produced, generated, downloaded or substituted. No bundle,
product, device or installation exists.** All sixty requirements are `CONCEPT`/planned; twenty-four are
`BLOCKED_ON_IMAGE_GENERATION` while `X-03` remains open; thirty reuse MC-04 internal vectors as design inputs; six are
authored specifications with no rendered file; zero are publicly approved.

Related documents: `docs/marea/assets/ASSET-PIPELINE.md`; `docs/marea/assets/manifest/MC-04-ASSETS.yaml`,
`MC-04-BRIEFS.yaml`; `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`, `ILLUSTRATION-STANDARDS.md`,
`HARDWARE-CMF-DIRECTION.md`; `docs/marea/products/PRODUCT-ASSET-REQUIREMENTS.md` (batch-01 D9),
`PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md`, `PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md`;
`docs/marea/bundles/BUNDLE-ARCHITECTURE.md`; this milestone's copy files `docs/marea/bundles/copy/`.
