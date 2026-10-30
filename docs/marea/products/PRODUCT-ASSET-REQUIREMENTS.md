# MAREA — Product visual-asset requirements and generation briefs (MC-05 / D9)

| Field | Value |
| --- | --- |
| Document ID | MC-05 / D9 / PRODUCT-ASSET-REQUIREMENTS |
| Milestone | MC-05 (Master Prompt 05/36) — NAV, HUB and AIS complete product definitions |
| Deliverable | D9 — product visual-asset requirements for the three product pages |
| Owner | Asset-requirements owner for MC-05 (AIS Product Director role) |
| Status | INTERNAL PLANNING DOCUMENT. No asset is produced, generated, authorised or published by this milestone |
| Lifecycle context | Products are `DEFINED` and `NOT_FOR_SALE`; brand is `PROPOSED`/`NOT_GRANTED`; imagery is `BLOCKED_ON_IMAGE_GENERATION` |
| Base commit | `8ac6d69` (MC-04 HEAD) |
| Branch | `feature/marea-mc05-nav-hub-ais-products` |
| Date | 2026-10-30 |
| Write scope | This file only |
| Is not | An asset manifest, a generation authorisation, a licence, a page implementation, a price or availability statement |

## 0. Purpose, status and the generation gate

This document specifies the visual requirements of the future MAREA NAV, MAREA HUB and MAREA AIS product
pages so that a future, separately authorised visual-production milestone can execute them without
inventing a product, a certification or a photograph. It does not produce, request, authorise or imply a
single image.

**Generation gate — binding statement.**

- No image-generation provider, credential or budget is authorised in this programme (`X-03`; MC-01 B1–B3;
  MC-04 B16). No prompt has been sent and no image file exists for any requirement below.
- No fake photography, no unlicensed stock, no downloaded third-party artwork and no placeholder file are
  permitted as substitutes. A brief with no file is the honest state; a fake file is a claims-policy
  failure (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2).
- No claim is made that product CGI, product photography or a real installation exists. No physical
  MAREA hardware has been built (`H-05`) and no BOM is frozen (`H-07`), so hardware imagery cannot be
  accurate today.
- **Every photographic or CGI requirement in this register is `BLOCKED_ON_IMAGE_GENERATION`.** No
  `REAL_PRODUCT` asset exists or may be created until a tested unit, date, place and provenance exist
  (`ASSET-PIPELINE.md` §7.1).
- MC-04 vector assets may be referenced only as **internal design inputs**, provisional and
  `PREFERRED_PROVISIONAL` at best. They are not an adopted public identity and must not be published as
  MAREA brand identity (`MC-04-DELIVERY.md` §1, D-005 in `DECISION-LOG.md`).

**What would authorise generation** (all four, in writing, from the company owner; source
`PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` §0): a written budget authorisation with a cost ceiling; a
provisioned provider account and credential in the approved secret store; verified account/terms
entitlement for commercial CONCEPT imagery; and a Lead-approved write scope for the first real files plus
a recorded synthetic-content disclosure decision (B22/B23).

**Asset identifiers.** Ids such as `NAV-HERO-01` are MC-05 planning identifiers for this requirement set.
They are not manifest registrations. When a file is actually produced, it must receive an immutable
`MR-<CATEGORY>-<NNN>` registry id under `ASSET-PIPELINE.md` §4.2 and be registered in an asset manifest;
the planning id then maps to it. Nothing here is a produced-asset row.

**Page destinations.** Referenced routes (`/marea/nav`, `/en/marea/nav`, `/marea/hub`, `/marea/ais`) are
intended future routes from the product dossiers; none is implemented at MC-05. Section names describe the
intended page anatomy, not an existing page.

## 1. Principles — what each visual must make the customer understand

1. **Product clarity before beauty.** A customer must recognise what the product is and what it is not.
   A NAV visual shows a navigation aid on a device the customer owns; a HUB visual shows a local gateway;
   an AIS visual shows a receive-only listening chain — never a transponder, never a wall of gadgets.
2. **One asset, one idea.** A hero sells confidence and context; an explanatory visual carries the
   definition; an edition visual compares editions; an installation sequence shows the real work. An asset
   that tries to prove two conflicting things is split.
3. **Edition difference is shown only where it exists.** NAV and HUB editions may be compared by
   capability group without prices. AIS Receiver vs Connected is shown with its `CONDITIONAL` verdict
   visible: the Connected edition is not depicted as a shipping product.
4. **The ecosystem is shown as intended, not as verified.** Compatibility, integration and data flow are
   illustrative until the D5 matrix records tested results; every ecosystem visual is labelled as such.
5. **Installation reality is part of the product.** Antenna, splitter, cabling, power and commissioning
   are the customer's real work and real cost; no visual implies a turnkey installation or a free/complete
   box.
6. **Limitations are visible, not buried.** Receive-only AIS, stale-data states, navigation-aid status and
   "not available" states belong in the visual language, not only in a footer.
7. **The information layer is authored, never generated.** All headings, labels, numbers, disclaimers, UI
   content and diagram text are HTML/CSS/SVG authored by us (`ASSET-PIPELINE.md` §6.3, G-5). Generated
   pixels never contain readable information presented as product truth.
8. **No visual implies certification, availability or a product that does not exist.** No certification
   badge, no availability cue, no "shipping" imagery, no competitor device, no third-party logo.
9. **Reuse before generate.** Fifteen of the thirty requirements reuse an existing MC-04 vector as their
   structural input; nine reuse an existing MC-04 blocked brief as their art direction; the rest are
   authored vectors or responsive specifications that need no generation at all.
10. **Concept labelling is mandatory.** Any generated scene carries the verbatim CONCEPT disclosure in the
    page DOM (`PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` §2.2), and AIS or navigation surfaces carry their
    mandated disclaimers in addition.

## 2. The asset register (30 requirements)

**Field legend — every asset block carries all fifteen required fields in this order:** (1) asset ID in
the heading; (2) page/section; (3) what it shows; (4) layout/composition; (5) aspect ratio; (6) proposed
pixel dimensions; (7) desktop crop; (8) mobile crop; (9) concept-or-real status; (10) MC-04 vector id/path
reused as internal input, or `NONE`; (11) generation need and one-line brief; (12) caption ES/EN;
(13) alt ES/EN; (14) legal restrictions; (15) production state.

Status vocabulary follows the mandate: `CONCEPT` (authored/planned vector or specification, no generation
needed), `REAL_PRODUCT` (never used at MC-05 — no real product exists) and
`BLOCKED_ON_IMAGE_GENERATION` (photographic/CGI requirement with no file). Production state uses
`DRAFT` (brief only; no file exists).

### 2.1 MAREA NAV — ten requirements

#### NAV-HERO-01 — MAREA NAV product hero
- **Page / section.** Future `/marea/nav` and `/en/marea/nav`, hero.
- **Shows.** A used cruising yacht's helm under sail in the Rías Baixas, with a tablet in a plausible mount whose screen is a blank slot for the authored NAV interface; no chart or UI content in pixels.
- **Layout.** Cockpit context left, device plane right, sky negative space top-left for DOM headline; **aspect** 16:9; **master** 1920×1080 (derivatives 1600/1280/960/640); **desktop crop** full-width 16:9 keeping device and horizon; **mobile crop** 4:5 portrait keeping the blank screen and helm, headline area excluded.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-004` (blocked brief `nav-software-on-device-concept`, adapted 4:3 → 16:9) and `MR-BRD-005` NAV family lockup as internal placeholder; generation `COMPOSITE` — "Cockpit of a used 10–14 m cruising yacht under sail, overcast Atlantic light, tablet in a helm mount with a blank screen for an authored web-UI composite; no generated letters, numbers or charts."
- **Caption / alt.** ES caption «MAREA NAV en el puesto de timón — render conceptual; la interfaz es una composición web, no una captura del producto.» · EN "MAREA NAV at the helm — concept render; the interface is a web composite, not a product screenshot." · ES alt «Tableta en un soporte de timón de velero con la pantalla en blanco, cubierta y mar al fondo.» · EN "Tablet in a sailboat helm mount with a blank screen, cockpit and sea behind."
- **Legal / production.** No trademark symbols; no certification, standard-body or IP-rating marks; no third-party device logos; no chart or ENC imagery; no readable text; any person requires a signed model release and stays anonymous, never a testimonial. Production `DRAFT` (brief only, no file).

#### NAV-USE-02 — MAREA NAV in use
- **Page / section.** Future `/marea/nav`, "in use"/day-in-the-life section.
- **Shows.** An anonymous skipper seen from behind at a chart table, planning on a tablet with a blank screen; dividers and a paper notebook as plausible props; no readable values.
- **Layout.** Over-shoulder 3:2, subject in the left third, copy-safe area right; **aspect** 3:2; **master** 1600×1067 (1280/960/640); **desktop crop** 3:2; **mobile crop** 1:1 keeping tablet and both hands, never cutting the screen edge.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-004` plus the `MR-COR-003` lifestyle direction (blocked briefs); generation `PHOTO` — "Over-shoulder scene of an anonymous skipper planning at a chart table with a blank-screen tablet, used boat interior, Atlantic overcast light, no readable text, no chart."
- **Caption / alt.** ES caption «Planificación a bordo con MAREA NAV — render conceptual.» · EN "Planning aboard with MAREA NAV — concept render." · ES alt «Patrón de espaldas planificando en una mesa de cartas con una tableta de pantalla en blanco.» · EN "Skipper seen from behind planning at a chart table with a blank-screen tablet."
- **Legal / production.** Model release required for any person, who stays anonymous; no chart or provider data; no readable text; no trademark or certification marks. Production `DRAFT`.

#### NAV-OVR-03 — MAREA NAV explanatory overview
- **Page / section.** Future `/marea/nav`, "what it includes / what is separate" section.
- **Shows.** An authored three-band SVG: software functions; licensed data entitlements (charts, weather, tides); optional connected inputs (instruments, HUB, receive-only AIS). Each band carries its "separate licence or device" status in DOM text.
- **Layout.** Horizontal three-band diagram, sources left to outputs right; **aspect** 16:9; **master** vector 1920×1080 export; **desktop crop** full width, no crop; **mobile crop** vertical reflow to three stacked bands (SVG/media query), no text loss.
- **Status / input / generation.** `CONCEPT` (authored vector); MC-04 input `MR-DIA-003` (`docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg`) as structural reference and `MR-ICO-001` icons (`nav-waypoint`, `gps-fix`, `wind-true`, `ais-receive-only`, `weather-forecast`); generation `NONE` — authored SVG, no generated imagery.
- **Caption / alt.** ES caption «Qué incluye MAREA NAV y qué es una licencia o un dispositivo aparte — diagrama de definición.» · EN "What MAREA NAV includes and what is a separate licence or device — definition diagram." · ES alt «Diagrama de tres bandas que separa funciones de software, datos con licencia y dispositivos opcionales.» · EN "Three-band diagram separating software functions, licensed data and optional devices."
- **Legal / production.** No trademark symbols; no certification marks; no compatibility claim; icons are decorative and always paired with visible text. Production `DRAFT` (to be authored by design/front-end, not generated).

#### NAV-EDN-04 — NAV editions comparison
- **Page / section.** Future `/marea/nav`, editions section.
- **Shows.** MAREA NAV Essential versus MAREA NAV Pro by capability group (planning and logbook; live instruments and CPA/TCPA; weather overlays; offline regions; multi-device). Essential exclusions are shown explicitly; **no price and no availability signifier**.
- **Layout.** Two-column comparison with a shared capability row list; **aspect** 16:9; **master** 1920×1080 authored; **desktop crop** side-by-side columns; **mobile crop** two stacked cards in edition order.
- **Status / input / generation.** `CONCEPT` (authored); MC-04 input `MR-BRD-005` NAV family lockup plus `MR-ICO-001` icons; generation `NONE`.
- **Caption / alt.** ES caption «NAV Essential y NAV Pro: qué añade Pro, sin precio ni disponibilidad.» · EN "NAV Essential and NAV Pro: what Pro adds, without price or availability." · ES alt «Comparación en dos columnas de las funciones de las ediciones Essential y Pro.» · EN "Two-column comparison of Essential and Pro edition capabilities."
- **Legal / production.** Prices are hypotheses and must not appear; no "available" cue; no certification marks. Production `DRAFT`.

#### NAV-ECO-05 — NAV ecosystem integration visual
- **Page / section.** Future `/marea/nav`, ecosystem/integration section.
- **Shows.** MAREA NAV at the centre with optional inputs (GNSS on device, HUB, receive-only AIS, licensed weather/charts) and the customer's own records leaving the system; unverified connections labelled "illustrative — not a compatibility claim".
- **Layout.** Radial arrangement with NAV centre and labelled sources around it; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop, full diagram; **mobile crop** reflow to a vertical list with the same labels.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-003` (`marea-ecosystem-overview.svg`) as internal structure; generation `NONE`.
- **Caption / alt.** ES caption «MAREA NAV dentro del ecosistema MAREA — ilustrativo, sin implicar compatibilidad verificada.» · EN "MAREA NAV within the MAREA ecosystem — illustrative, without implying verified compatibility." · ES alt «Diagrama del ecosistema con NAV en el centro y fuentes de datos opcionales alrededor.» · EN "Ecosystem diagram with NAV at the centre and optional data sources around it."
- **Legal / production.** No compatibility claim; no third-party logos; no trademark symbols. Production `DRAFT`; must be re-verified against D5 before publication.

#### NAV-INS-06 — NAV onboarding sequence
- **Page / section.** Future `/marea/nav`, getting-started section.
- **Shows.** Three panels: account and edition setup; mounting and securing the device; confirming position, freshness and offline state. Labels are authored DOM text over the images.
- **Layout.** Three 4:3 panels in a row with a numbered sequence; **aspect** 4:3 per panel; **master** 1600×1200 each; **desktop crop** three-up; **mobile crop** single column, one panel per viewport, 4:3 preserved.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-004` and `MR-COR-003` (blocked briefs); generation `COMPOSITE` — "Three-panel onboarding sequence: hands mounting a tablet in a cockpit mount, a tablet at a chart table, a coastal cockpit; blank screens and surfaces for authored labels, no readable text."
- **Caption / alt.** ES caption «Puesta en marcha de MAREA NAV en tres pasos — render conceptual; los rótulos son texto web.» · EN "MAREA NAV onboarding in three steps — concept render; labels are web text." · ES alt «Tres escenas consecutivas de montaje y configuración de una tableta a bordo.» · EN "Three sequential scenes of mounting and configuring a tablet aboard."
- **Legal / production.** Hands/person require model release; no readable UI or numbers in pixels; no "works anywhere" styling; navigation disclaimer in DOM. Production `DRAFT`.

#### NAV-MOB-07 — NAV mobile adaptation and crop guidance
- **Page / section.** Future `/marea/nav`, design hand-off only; not a customer-facing image.
- **Shows.** An authored specification sheet of the hero and in-use assets at 390 px, 768 px and 1440 px, marking focal point, copy-safe areas, the blank-screen slot and the forbidden crop zones.
- **Layout.** Three viewport columns with wireframe overlays; **aspect** 16:9 sheet; **master** 1920×1080 authored; **desktop crop** n/a (specification); **mobile crop** stacked viewport columns.
- **Status / input / generation.** `CONCEPT` (specification, not an image asset); MC-04 input `NONE`; generation `NONE`.
- **Caption / alt.** ES caption «Contrato de recorte móvil para las imágenes de MAREA NAV.» · EN "Mobile crop contract for MAREA NAV imagery." · ES alt «Hoja de especificación con tres anchos de pantalla y las zonas de recorte permitidas.» · EN "Specification sheet with three viewport widths and permitted crop zones."
- **Legal / production.** No claims; used only for production QA. Production `DRAFT`.

#### NAV-TMB-08 — NAV catalogue card / sales thumbnail
- **Page / section.** Future product catalogue and `/marea/productos` card grid; family card link to NAV.
- **Shows.** A 4:3 card crop derived from NAV-HERO-01 or NAV-USE-02, with the `MAREA NAV` family lockup applied as DOM overlay.
- **Layout.** Centred subject with lockup in the lower band; **aspect** 4:3; **master** 1024×768 (960/640/400 derivatives); **desktop crop** 4:3 fixed; **mobile crop** full-width 4:3 card.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION` (derivative of a blocked master); MC-04 input `MR-BRD-005` NAV lockup; generation `NONE` — crop derivative; it cannot exist before its source master does.
- **Caption / alt.** ES caption «Tarjeta de catálogo de MAREA NAV.» · EN "MAREA NAV catalogue card." · ES alt «Tarjeta con una escena de timón y el nombre MAREA NAV.» · EN "Card with a helm scene and the MAREA NAV name."
- **Legal / production.** No availability or "buy" cue on the card; no price; no certification mark. Production `DRAFT` (blocked until master exists).

#### NAV-OG-09 — NAV social / Open Graph future launch creative
- **Page / section.** Future OG metadata for `/marea/nav`; social launch only after publication approval.
- **Shows.** An authored 1200×630 card: reversed MAREA NAV lockup, a short status line ("product definition published; not available") and no performance claim.
- **Layout.** Lockup left, status line right, sea-toned authored background (vector, no photograph); **aspect** 1200:630 exactly; **master** 1200×630; **desktop crop** not applicable (fixed OG); **mobile crop** platform crops must keep the lockup and status line inside the central safe area.
- **Status / input / generation.** `CONCEPT` (authored HTML/vector rendered deterministically, following the `MR-BRD-008` method); MC-04 input `MR-BRD-003` reversed lockup + `MR-BRD-008` OG card pattern + `MR-BRD-005` NAV lockup; generation `NONE`.
- **Caption / alt.** ES caption «Tarjeta social de MAREA NAV (1200×630).» · EN "MAREA NAV social card (1200×630)." · ES alt «Tarjeta con el logotipo MAREA NAV sobre un fondo marino y una línea de estado del producto.» · EN "Card with the MAREA NAV lockup on a marine background and a product-status line."
- **Legal / production.** No availability, price or performance claim; no trademark symbols; OG must be exactly 1200×630 or the metadata lies. Production `DRAFT`.

#### NAV-TEC-10 — NAV technical information visual
- **Page / section.** Future `/marea/nav`, technical/professional section and support documentation.
- **Shows.** Authored data-source and state diagram: what NAV consumes, which layer each source belongs to (core, licensed entitlement, optional device), and the state vocabulary live/cached/stale/unavailable; explicitly no steering-control path.
- **Layout.** Two-column source/consumer diagram with a state strip beneath; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** reflow to a single column with the state strip preserved.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-003` + `MR-ICO-001` (`gps-fix`, `no-data`, `stale`, `wifi`, `connection`); generation `NONE`.
- **Caption / alt.** ES caption «Fuentes de datos y estados de MAREA NAV — ilustrativo, sin implicar compatibilidad verificada.» · EN "MAREA NAV data sources and states — illustrative, without implying verified compatibility." · ES alt «Diagrama de fuentes de datos, licencias y estados de frescura.» · EN "Diagram of data sources, licences and freshness states."
- **Legal / production.** No NMEA 2000 or protocol compatibility claim; no chart provider mark; engineering review of diagram labels is `PENDING`. Production `DRAFT`.

### 2.2 MAREA HUB — ten requirements

#### HUB-HERO-01 — MAREA HUB product hero
- **Page / section.** Future `/marea/hub` and `/en/marea/hub`, hero.
- **Shows.** A compact matte, dark-graphite gateway mounted inside a serviceable locker or console, cables tidily routed; the rear connector field is generic and carries blank DOM labels. No invented port count, no model badge.
- **Layout.** Three-quarter macro of the unit left, installation context right, copy space top-right; **aspect** 16:9; **master** 1920×1080 (1600/1280/960/640); **desktop crop** 16:9 keeping unit and connector field; **mobile crop** 4:5 keeping unit plus mounting point.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-001` (blocked brief `hub-appliance-installed-concept`) and `MR-BRD-005` HUB family lockup as internal placeholder; generation `CGI` — "Concept render of a compact matte dark-graphite gateway mounted in a serviceable locker, generic connector field with blank labels, no badges, no port count, overcast marine light, used boat interior."
- **Caption / alt.** ES caption «MAREA HUB instalado en un armario de servicio — render conceptual; el producto no existe ni está certificado.» · EN "MAREA HUB installed in a service locker — concept render; the product does not exist and is not certified." · ES alt «Caja de conexión mate atornillada dentro de un armario, con cables recogidos y etiquetas en blanco.» · EN "Matte connection unit screwed inside a locker, with tidily routed cables and blank labels."
- **Legal / production.** No certification or IP-rating mark; no invented ports or radio badges; no material performance claim; no third-party device logos. Production `DRAFT`.

#### HUB-USE-02 — MAREA HUB in use (commissioning context)
- **Page / section.** Future `/marea/hub`, "installed and commissioned" section.
- **Shows.** An installer at a navigation station with a laptop/tablet showing a blank screen, HUB context in soft focus; documents and tools plausible; no readable configuration values.
- **Layout.** Installer right, equipment left, screen plane parallel for composite; **aspect** 3:2; **master** 1600×1067; **desktop crop** 3:2; **mobile crop** 1:1 keeping the blank screen and hands.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-012` (refit installation) and `MR-PRD-001` (blocked briefs); generation `COMPOSITE` — "Installer at a navigation desk with a blank-screen laptop, gateway context in soft focus, tidy cabling, used boat interior, overcast light, no readable text."
- **Caption / alt.** ES caption «Puesta en servicio de MAREA HUB a bordo — render conceptual.» · EN "Commissioning MAREA HUB aboard — concept render." · ES alt «Instalador frente a un escritorio de navegación con un portátil de pantalla en blanco y cables ordenados.» · EN "Installer at a navigation desk with a blank-screen laptop and orderly cabling."
- **Legal / production.** Model release required; no certification marks; no "plug and play" styling; installation is not implied included. Production `DRAFT`.

#### HUB-OVR-03 — MAREA HUB explanatory overview
- **Page / section.** Future `/marea/hub`, "what it does" section.
- **Shows.** Authored data-flow: supported sources (GNSS, instruments, Signal K where tested, receive-only AIS) → HUB normalisation → one documented local interface → consumers (NAV, DISPLAY, own devices). A side note states that the published matrix, not the diagram, defines compatibility.
- **Layout.** Left-to-right flow with three groups; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** vertical reflow with the same labels.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-003` + `MR-ICO-001` (`network-bus`, `connection`, `gps-fix`, `wind-true`, `ais-receive-only`); generation `NONE`.
- **Caption / alt.** ES caption «Qué hace MAREA HUB: de fuentes diversas a una interfaz local documentada — ilustrativo.» · EN "What MAREA HUB does: from mixed sources to one documented local interface — illustrative." · ES alt «Diagrama de flujo desde varias fuentes de datos hasta un consumidor a través del HUB.» · EN "Flow diagram from several data sources through the HUB to a consumer."
- **Legal / production.** No NMEA 2000 claim; no blanket Signal K claim; engineering review `PENDING`. Production `DRAFT`.

#### HUB-EDN-04 — HUB editions comparison
- **Page / section.** Future `/marea/hub`, editions section.
- **Shows.** MAREA HUB Standard versus MAREA HUB Pro by integration envelope, configuration depth and diagnostics depth; the envelope boundary is marked "to be frozen after hardware design and physical tests"; no port counts, no processor or radio specification, no price.
- **Layout.** Two-column comparison plus a boundary note; **aspect** 16:9; **master** 1920×1080 authored; **desktop crop** columns; **mobile crop** stacked cards.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-BRD-005` HUB lockup + `MR-ICO-001` (`settings`, `service`, `signal-strength`); generation `NONE`.
- **Caption / alt.** ES caption «HUB Standard y HUB Pro: diferencia de valor pendiente del diseño de hardware.» · EN "HUB Standard and HUB Pro: value difference pending hardware design." · ES alt «Comparación de dos ediciones con la frontera de capacidades marcada como pendiente.» · EN "Two-edition comparison with the capability boundary marked as pending."
- **Legal / production.** No invented specifications or port counts; no price; no availability cue. Production `DRAFT`.

#### HUB-ECO-05 — HUB ecosystem integration visual
- **Page / section.** Future `/marea/hub`, ecosystem section.
- **Shows.** HUB as the local data layer between mixed equipment and consumers, with NAV, AIS, DISPLAY and customer devices shown as separate products; unverified links labelled illustrative.
- **Layout.** Hub-and-spoke with the appliance at the centre; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** vertical list.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-003` (`marea-ecosystem-overview.svg`); generation `NONE`.
- **Caption / alt.** ES caption «MAREA HUB como capa de datos local dentro del ecosistema — ilustrativo, sin implicar compatibilidad verificada.» · EN "MAREA HUB as the local data layer within the ecosystem — illustrative, without implying verified compatibility." · ES alt «Diagrama en estrella con el HUB en el centro y equipos y consumidores alrededor.» · EN "Hub-and-spoke diagram with the HUB at the centre and equipment and consumers around it."
- **Legal / production.** No compatibility claim; no third-party logos; disclaimers in DOM. Production `DRAFT`.

#### HUB-INS-06 — HUB installation and commissioning sequence
- **Page / section.** Future `/marea/hub`, professional installation section.
- **Shows.** Four panels: vessel survey and equipment inventory; mounting and fused power; configuration and source labelling; handover with a commissioning record (the record itself is referenced, not fabricated).
- **Layout.** Four 3:2 panels in a numbered sequence; **aspect** 3:2 per panel; **master** 1600×1067 each; **desktop crop** four-up; **mobile crop** one panel per viewport.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-012` and `MR-PRD-011` (blocked briefs) plus `MR-BRD-012` installer commissioning record as internal reference; generation `COMPOSITE` — "Four-panel installation sequence: survey at a boat's electrical panel, gateway mounting, tidy cable routing, installer handing over a paper record; no readable text, overcast light."
- **Caption / alt.** ES caption «Instalación y puesta en servicio de MAREA HUB en cuatro pasos — render conceptual.» · EN "MAREA HUB installation and commissioning in four steps — concept render." · ES alt «Cuatro escenas de instalación: revisión del cuadro eléctrico, montaje, cableado y entrega de documentación.» · EN "Four installation scenes: electrical panel survey, mounting, cabling and handover of documentation."
- **Legal / production.** Person requires model release; no certification marks; installation is quoted separately and not free; commissioning record is not a certificate. Production `DRAFT`.

#### HUB-MOB-07 — HUB mobile adaptation and crop guidance
- **Page / section.** Future `/marea/hub`, design hand-off only.
- **Shows.** Authored crop specification for HUB-HERO-01 and HUB-INS-06 at 390/768/1440 px, marking the connector field, mounting point and copy-safe zones that must never be cropped.
- **Layout.** Three viewport columns with overlays; **aspect** 16:9 sheet; **master** 1920×1080 authored; **desktop crop** n/a; **mobile crop** stacked columns.
- **Status / input / generation.** `CONCEPT` (specification); MC-04 input `NONE`; generation `NONE`.
- **Caption / alt.** ES caption «Contrato de recorte móvil para las imágenes de MAREA HUB.» · EN "Mobile crop contract for MAREA HUB imagery." · ES alt «Hoja de especificación con tres anchos de pantalla y las zonas que no deben recortarse.» · EN "Specification sheet with three viewport widths and the zones that must not be cropped."
- **Legal / production.** Internal production only; no claims. Production `DRAFT`.

#### HUB-TMB-08 — HUB catalogue card
- **Page / section.** Future product catalogue card grid.
- **Shows.** 4:3 card crop derived from HUB-HERO-01, with the `MAREA HUB` family lockup applied as DOM overlay.
- **Layout.** Unit centred, lockup lower band; **aspect** 4:3; **master** 1024×768 (960/640/400); **desktop crop** 4:3 fixed; **mobile crop** full-width 4:3.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION` (derivative); MC-04 input `MR-BRD-005` HUB lockup; generation `NONE` — crop derivative, cannot precede its master.
- **Caption / alt.** ES caption «Tarjeta de catálogo de MAREA HUB.» · EN "MAREA HUB catalogue card." · ES alt «Tarjeta con un equipo de conexión instalado y el nombre MAREA HUB.» · EN "Card with an installed connection unit and the MAREA HUB name."
- **Legal / production.** No availability/price cue; no certification marks. Production `DRAFT` (blocked until master exists).

#### HUB-OG-09 — HUB social / Open Graph future launch creative
- **Page / section.** Future OG metadata for `/marea/hub`.
- **Shows.** Authored 1200×630 card: reversed MAREA HUB lockup and the status line "product definition published; not available"; no specification or performance claim.
- **Layout.** Lockup left, status line right, vector marine background; **aspect** 1200:630; **master** 1200×630; **desktop crop** n/a; **mobile crop** platform crops keep lockup and line centred.
- **Status / input / generation.** `CONCEPT` (authored, `MR-BRD-008` method); MC-04 input `MR-BRD-003`, `MR-BRD-008` pattern, `MR-BRD-005` HUB lockup; generation `NONE`.
- **Caption / alt.** ES caption «Tarjeta social de MAREA HUB (1200×630).» · EN "MAREA HUB social card (1200×630)." · ES alt «Tarjeta con el logotipo MAREA HUB sobre un fondo marino y una línea de estado del producto.» · EN "Card with the MAREA HUB lockup on a marine background and a product-status line."
- **Legal / production.** No availability or specification claim; exactly 1200×630. Production `DRAFT`.

#### HUB-TEC-10 — HUB technical information visual
- **Page / section.** Future `/marea/hub`, technical/professional section.
- **Shows.** Authored compatibility illustration: device → protocol → read/write direction → matrix row reference, with "per device, per firmware, per direction; tested results only" labels; NMEA 2000 explicitly marked not offered/not certified.
- **Layout.** Matrix-style grid with legend; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** horizontal scroll alternative with a pinned legend.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-003` + `MR-ICO-001` (`network-bus`, `connection`, `unknown`, `no-data`, `update`); generation `NONE`.
- **Caption / alt.** ES caption «Compatibilidad de MAREA HUB: por dispositivo, firmware y dirección — solo resultados probados.» · EN "MAREA HUB compatibility: per device, firmware and direction — tested results only." · ES alt «Cuadrícula que relaciona equipos, protocolos y direcciones de lectura o escritura.» · EN "Grid relating devices, protocols and read or write directions."
- **Legal / production.** No certification or protocol-conformance claim; no NMEA 2000 claim; labels must match the tested matrix. Production `DRAFT`.

### 2.3 MAREA AIS — ten requirements

#### AIS-HERO-01 — MAREA AIS product hero
- **Page / section.** Future `/marea/ais` and `/en/marea/ais`, hero.
- **Shows.** The receive-only chain read as one picture: masthead VHF/AIS antenna in soft focus, splitter and receiver in focus at deck level, a coax route into a gland; an authored DOM callout states "receive-only — no transmit path".
- **Layout.** Antenna top-left soft, antenna/splitter/receiver diagonal to bottom-right, copy space top-right; **aspect** 16:9; **master** 1920×1080; **desktop crop** keeps antenna base, splitter and receiver; **mobile crop** 4:5 keeps receiver plus antenna base (the mast may crop but never read as broken).
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-005` (blocked brief `ais-receive-only-scenario-concept`), `MR-DIA-001` (`marea-ais-receive-only.svg`) as chain reference and `MR-BRD-005` AIS family lockup as internal placeholder; generation `COMPOSITE` — "Masthead VHF/AIS antenna in soft focus and a receive-only receiver with splitter in focus, coax into a gland, overcast Atlantic light, no transponder, no transmission visual, blank label areas for DOM text."
- **Caption / alt.** ES caption «Cadena AIS de solo escucha: antena, splitter y receptor — render conceptual; sin ruta de transmisión.» · EN "AIS receive-only chain: antenna, splitter and receiver — concept render; no transmit path." · ES alt «Antena de mástil, splitter y receptor AIS con cables coaxiales hacia un pasaocables.» · EN "Masthead antenna, splitter and AIS receiver with coaxial cables routed into a gland."
- **Legal / production.** No transponder, transmission or DSC imagery; no range circles over real geography; no certification marks; receive-only disclaimer in DOM. Production `DRAFT`.

#### AIS-USE-02 — MAREA AIS in use
- **Page / section.** Future `/marea/ais`, "on your existing equipment" section.
- **Shows.** A helm with a compatible third-party plotter or tablet whose screen is a blank slot for the authored traffic view; the antenna and receiver context is visible; no fake traffic, no chart.
- **Layout.** Equipment right, helm context left, screen plane parallel for composite; **aspect** 3:2; **master** 1600×1067; **desktop crop** 3:2; **mobile crop** 1:1 keeping the blank screen and one hand.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-005` and `MR-PRD-004` (blocked briefs); generation `COMPOSITE` — "Compatible navigation display at a sailboat helm with a blank screen for an authored traffic-view composite, receiver context nearby, no readable text, no chart, overcast light."
- **Caption / alt.** ES caption «Recepción AIS mostrada en un equipo compatible — render conceptual; la pantalla es una composición web.» · EN "AIS reception shown on compatible equipment — concept render; the screen is a web composite." · ES alt «Equipo de navegación en el timón con la pantalla en blanco y la antena al fondo.» · EN "Navigation equipment at the helm with a blank screen and the antenna behind."
- **Legal / production.** No transponder or "sees all traffic" implication; no competitor device brand visible; no chart data; receive-only and navigation disclaimers in DOM. Production `DRAFT`.

#### AIS-OVR-03 — AIS explanatory overview
- **Page / section.** Future `/marea/ais`, "what it does / what it does not do" section.
- **Shows.** Authored receive-only overview: listen-only reception → decoding → target state with age and source → presentation; an explicit no-transmit barrier and the exclusions (not a transponder, not DSC, not collision avoidance).
- **Layout.** Left-to-right chain with a barrier symbol and an exclusions panel; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** reflow to vertical chain with exclusions preserved.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-001` (`docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg`) + `MR-ICO-001` (`ais-receive-only`, `ais-target`, `stale`, `no-data`); generation `NONE`.
- **Caption / alt.** ES caption «Qué hace y qué no hace MAREA AIS — recepción de solo escucha.» · EN "What MAREA AIS does and does not do — receive-only." · ES alt «Diagrama de recepción AIS con barrera explícita de no transmisión.» · EN "AIS reception diagram with an explicit no-transmit barrier."
- **Legal / production.** Receive-only disclaimer verbatim in DOM; no certification marks; engineering review of the diagram `PENDING`. Production `DRAFT`.

#### AIS-EDN-04 — AIS editions comparison
- **Page / section.** Future `/marea/ais`, editions section.
- **Shows.** Receiver vs Connected with the `CONDITIONAL` verdict visible: Connected adds documented local networking and richer diagnostics only if the hardware design evidences it; otherwise it is one SKU plus an option. No price, no claim that Connected ships.
- **Layout.** Two-column comparison plus a verdict callout; **aspect** 16:9; **master** 1920×1080 authored; **desktop crop** columns; **mobile crop** stacked cards with the verdict first.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-BRD-005` AIS lockup + `MR-ICO-001` (`connection`, `service`, `stale`); generation `NONE`.
- **Caption / alt.** ES caption «AIS Receiver y AIS Connected: diferencia de valor condicionada a la evidencia de hardware.» · EN "AIS Receiver and AIS Connected: value difference conditional on hardware evidence." · ES alt «Comparación de dos ediciones con la condición de evidencia de hardware señalada.» · EN "Two-edition comparison with the hardware-evidence condition marked."
- **Legal / production.** No price; no availability; no claim that Connected is validated; dual-channel not asserted. Production `DRAFT`.

#### AIS-ECO-05 — AIS ecosystem integration visual
- **Page / section.** Future `/marea/ais`, ecosystem section.
- **Shows.** Authored integration visual: receiver as a receive-only data source feeding MAREA NAV, MAREA HUB or a compatible third-party system; NAV and HUB marked separate products; no transmission link.
- **Layout.** Receiver left, consumers right, data-only arrows, "receive-only" label on the source; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** vertical flow.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-001` and `MR-DIA-003` + `MR-ICO-001` (`ais-receive-only`, `device-hub`); generation `NONE`.
- **Caption / alt.** ES caption «MAREA AIS en el ecosistema: una fuente de solo escucha para NAV y HUB.» · EN "MAREA AIS in the ecosystem: a receive-only source for NAV and HUB." · ES alt «Diagrama con el receptor AIS enviando datos a NAV y HUB, sin enlace de transmisión.» · EN "Diagram with the AIS receiver feeding NAV and HUB, with no transmit link."
- **Legal / production.** No compatibility claim (D5); no NMEA 2000; NAV/HUB not included; disclaimers in DOM. Production `DRAFT`.

#### AIS-INS-06 — AIS installation sequence
- **Page / section.** Future `/marea/ais`, installation section.
- **Shows.** Four panels: antenna or splitter installation; coax route and gland; receiver mounting and fused power; selecting the AIS input and confirming receiver status. Antenna and splitter are visualised as separate purchases.
- **Layout.** Four 3:2 panels, numbered, with exclusion labels; **aspect** 3:2 per panel; **master** 1600×1067 each; **desktop crop** four-up; **mobile crop** one panel per viewport.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION`; MC-04 input `MR-PRD-005` and `MR-PRD-012` (blocked briefs); generation `COMPOSITE` — "Four-panel receive-only installation: antenna or splitter on deck, coax through a gland, receiver mounting with fused power, hand selecting an input on a blank-screen display; no readable text, overcast light."
- **Caption / alt.** ES caption «Instalación de MAREA AIS en cuatro pasos — render conceptual; antena y splitter no están incluidos.» · EN "MAREA AIS installation in four steps — concept render; antenna and splitter are not included." · ES alt «Secuencia de instalación de antena, cable coaxial y receptor AIS en cubierta.» · EN "Installation sequence of antenna, coaxial cable and AIS receiver on deck."
- **Legal / production.** No transponder imagery; antenna and splitter shown as separate purchases; installation quoted separately; receive-only disclaimer in DOM. Production `DRAFT`.

#### AIS-MOB-07 — AIS mobile adaptation and crop guidance
- **Page / section.** Future `/marea/ais`, design hand-off only.
- **Shows.** Authored crop specification for AIS-HERO-01 and AIS-INS-06 at 390/768/1440 px, marking antenna base, receiver, splitter and the "no transmit path" callout as uncroppable.
- **Layout.** Three viewport columns with overlays; **aspect** 16:9 sheet; **master** 1920×1080 authored; **desktop crop** n/a; **mobile crop** stacked columns.
- **Status / input / generation.** `CONCEPT` (specification); MC-04 input `NONE`; generation `NONE`.
- **Caption / alt.** ES caption «Contrato de recorte móvil para las imágenes de MAREA AIS.» · EN "Mobile crop contract for MAREA AIS imagery." · ES alt «Hoja de especificación con tres anchos de pantalla y las zonas que no deben recortarse.» · EN "Specification sheet with three viewport widths and the zones that must not be cropped."
- **Legal / production.** Internal production only; no claims. Production `DRAFT`.

#### AIS-TMB-08 — AIS catalogue card
- **Page / section.** Future product catalogue card grid.
- **Shows.** 4:3 card crop derived from AIS-HERO-01, with the `MAREA AIS` family lockup as DOM overlay and the receive-only label.
- **Layout.** Receiver and antenna base centred, lockup lower band; **aspect** 4:3; **master** 1024×768 (960/640/400); **desktop crop** 4:3; **mobile crop** full-width 4:3.
- **Status / input / generation.** `BLOCKED_ON_IMAGE_GENERATION` (derivative); MC-04 input `MR-BRD-005` AIS lockup; generation `NONE` — crop derivative.
- **Caption / alt.** ES caption «Tarjeta de catálogo de MAREA AIS.» · EN "MAREA AIS catalogue card." · ES alt «Tarjeta con una antena y un receptor AIS y el nombre MAREA AIS.» · EN "Card with an AIS antenna and receiver and the MAREA AIS name."
- **Legal / production.** No availability/price cue; receive-only label retained; no transponder implication. Production `DRAFT` (blocked until master exists).

#### AIS-OG-09 — AIS social / Open Graph future launch creative
- **Page / section.** Future OG metadata for `/marea/ais`.
- **Shows.** Authored 1200×630 card: reversed MAREA AIS lockup, "receive-only" status line and "product definition published; not available"; no performance or coverage claim.
- **Layout.** Lockup left, receive-only line right, vector marine background; **aspect** 1200:630; **master** 1200×630; **desktop crop** n/a; **mobile crop** platform crops keep lockup and line centred.
- **Status / input / generation.** `CONCEPT` (authored, `MR-BRD-008` method); MC-04 input `MR-BRD-003`, `MR-BRD-008` pattern, `MR-BRD-005` AIS lockup; generation `NONE`.
- **Caption / alt.** ES caption «Tarjeta social de MAREA AIS (1200×630).» · EN "MAREA AIS social card (1200×630)." · ES alt «Tarjeta con el logotipo MAREA AIS sobre un fondo marino y una línea de solo escucha.» · EN "Card with the MAREA AIS lockup on a marine background and a receive-only line."
- **Legal / production.** Receive-only statement mandatory; no availability, range or certification claim; exactly 1200×630. Production `DRAFT`.

#### AIS-TEC-10 — AIS technical information visual
- **Page / section.** Future `/marea/ais`, technical/professional section.
- **Shows.** Authored technical visual: receive-only chain, supported local output methods (transport details to be frozen in D5), target states (live/stale/lost/no-data), receiver health states and explicit exclusions; no protocol-conformance claim.
- **Layout.** Chain across the top, state strip beneath, exclusions panel right; **aspect** 16:9; **master** 1920×1080 vector; **desktop crop** no crop; **mobile crop** vertical chain with state strip and exclusions preserved.
- **Status / input / generation.** `CONCEPT`; MC-04 input `MR-DIA-001` + `MR-ICO-001` (`ais-receive-only`, `ais-target`, `ais-target-lost`, `stale`, `no-data`, `offline`, `update`); generation `NONE`.
- **Caption / alt.** ES caption «Cadena y estados de MAREA AIS — ilustrativo; la matriz de compatibilidad define lo soportado.» · EN "MAREA AIS chain and states — illustrative; the compatibility matrix defines support." · ES alt «Diagrama de la cadena de recepción AIS con estados de objetivo perdido y sin datos.» · EN "AIS receive chain diagram with lost-target and no-data states."
- **Legal / production.** No NMEA 2000 claim; no range figure; no certification mark; receive-only disclaimer verbatim in DOM. Production `DRAFT`.

## 3. Real MC-04 reuse map (verified against MC-04-ASSETS.yaml)

Every id and path below was checked against `docs/marea/assets/manifest/MC-04-ASSETS.yaml` and confirmed
present on disk on 2026-10-30. Reuse is **internal and provisional**: these are design inputs for future
assets, not publication-ready MAREA identity and not evidence that a product exists.

| MC-04 id | Verified path(s) | What it is | Permitted use in D9 | Restriction |
| --- | --- | --- | --- | --- |
| `MR-DIA-003` | `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg` (1200×1000) | Illustrative MAREA ecosystem overview with honest boundaries | Structural input for NAV-ECO-05, HUB-ECO-05, NAV-OVR-03, HUB-OVR-03, NAV-TEC-10, HUB-TEC-10 | Illustrative; engineering review `PENDING`; no compatibility claim; internal only |
| `MR-DIA-001` | `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg` (1200×880) | Illustrative receive-only AIS chain with no-transmit callout | Structural input for AIS-HERO-01, AIS-OVR-03, AIS-ECO-05, AIS-TEC-10 | Illustrative; receive-only semantics mandatory; engineering review `PENDING` |
| `MR-DIA-002` | `docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg` (1200×1020) | Illustrative PILOT supervised-steering boundary | Context only; PILOT is outside these three pages; not used as a product asset here | Not repurposed for NAV/HUB/AIS; no autonomous-steering implication |
| `MR-ICO-001` | `docs/marea/brand/assets/icons/ui/` — 57 authored 24×24 SVGs, e.g. `ais-receive-only.svg`, `ais-target.svg`, `stale.svg`, `no-data.svg`, `gps-fix.svg`, `connection.svg`, `settings.svg` | Authored marine-instrumentation icon set | Icons inside authored diagrams, labels and mock illustrations, always paired with visible text | Decorative in UI; proposed; never icon-only for critical meaning |
| `MR-BRD-005` | `docs/marea/brand/assets/logo/family/marea-family-nav-lockup.svg`, `.../marea-family-hub-lockup.svg`, `.../marea-family-ais-lockup.svg` | Nine product-family lockups from one rule | Internal placeholder lockups in cards, OG drafts and diagrams | Proposed identity; no trademark symbols; not adopted; not published |
| `MR-BRD-001` | `docs/marea/brand/assets/logo/marea-lockup-primary.svg` | Primary horizontal lockup | Internal placeholder in documents and mock-ups | Proposed identity; clear space and minimum sizes per `IDENTITY-SYSTEM.md` §6 |
| `MR-BRD-002` | `docs/marea/brand/assets/logo/marea-lockup-mono.svg` | Single-ink lockup | Internal placeholder for one-colour mock-ups | Proposed identity; engraving behaviour `NOT_TESTED` |
| `MR-BRD-003` | `docs/marea/brand/assets/logo/marea-lockup-reversed.svg` | Reversed lockup for dark surfaces | Input for the three authored OG cards | Proposed identity; printed dark-surface behaviour `NOT_TESTED` |
| `MR-BRD-008` | `docs/marea/brand/assets/social/og-marea-es-1200x630.jpg`, `docs/marea/brand/assets/social/og-marea-en-1200x630.jpg` (+ matching `.html` sources) | Per-locale brand OG cards, exactly 1200×630 | Method reference for the three product OG cards (authored HTML → deterministic render) | Brand-level card, not a product card; no social-platform unfurl test exists |
| `MR-BRD-011` | `docs/marea/brand/assets/packaging/marea-packaging-dieline-hub.svg`, `docs/marea/brand/assets/packaging/marea-packaging-dieline-ais.svg` | Provisional packaging dielines with `PROPOSED` dimensions | Context reference only for "what ships" explanation; not product imagery | Dimensions are placeholders with no BOM; print and procurement `BLOCKED` |
| `MR-BRD-012` | `docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html`, `docs/marea/brand/assets/print/marea-installer-commissioning-record-en.html` (+ PDF evidence) | Blank installer commissioning/handover record | Reference for HUB-INS-06 handover panel; never depicted as filled or certified | Not a certificate; no signatory, customer or vessel data exists |
| `MR-BRD-006` / `MR-BRD-007` | `docs/marea/brand/assets/icons/marea-app-icon-1024.png`, `docs/marea/brand/assets/icons/marea-icon-512.png`, `docs/marea/brand/assets/icons/marea-icon-192.png`, `docs/marea/brand/assets/icons/favicon.svg`, `docs/marea/brand/assets/icons/favicon.ico` | App-icon and browser identity sets | Optional UI-chrome reference inside mock-ups; never product photography | Proposed identity; no store submission or OS-mask test performed |
| `MR-EVD-001` | `docs/marea/brand/assets/evidence/renders/` (13 registered PNG evidence captures, e.g. `specimens-alerts.png`, `territories-territory-comparison.png`) | Deterministic captures of other owners' proof sheets | Review convenience only | Not source assets; captures are not independent evidence |

**Blocked-brief reuse.** The MC-04 briefs manifest
(`docs/marea/assets/manifest/MC-04-BRIEFS.yaml`) already records art direction for the overlapping scenes.
Where a D9 requirement maps to one of these ids, the future production milestone must extend that brief
rather than create a conflicting one: `MR-PRD-004` (NAV on device), `MR-PRD-001` (HUB appliance),
`MR-PRD-005` (AIS receive-only scenario), `MR-PRD-002` (DISPLAY at helm, context), `MR-PRD-011` (connector
macro), `MR-PRD-012` (refit installation), `MR-COR-002` (ecosystem hero), `MR-COR-003` (lifestyle
direction), `MR-COR-004` (sailing/motor environments), `MR-MKT-001` (trade key visual). All ten are
`BLOCKED_ON_IMAGE_GENERATION`, `provider: NONE_YET`, `files: []`, `generated_at: null` — no file exists.
One further id, `MR-PRD-003` (vector product illustration set), is recorded in the **briefs** manifest only
as `PRODUCIBLE_WITHOUT_GENERATION`; it is not an entry in the produced-assets manifest and is not reused
here.

## 4. Mobile and layout contract

General rules for all three product pages.

| Rule | Requirement |
| --- | --- |
| Text over imagery | Only authored DOM text over an approved `overlayScrim` (colour-system token, e.g. `rgba(8,26,40,0.76)`), never text burned into a generated image (`ASSET-PIPELINE.md` §6.3, G-5) |
| Contrast | DOM text on imagery must meet WCAG AA for its size (≥4.5:1 normal, ≥3:1 large); metadata targets the internal ≥5:1 and primary data ≥7:1 recorded in `COLOUR-SYSTEM.md`; measured before publication |
| LCP hero | One hero per page, eager + `fetchpriority="high"`, AVIF/WebP ≤120 kB @1920w target (hard limit 200 kB); card ≤45 kB @960w; total images per page ≤400 kB target |
| CLS | Intrinsic `width`/`height` or CSS `aspect-ratio` on every image; no layout shift when art direction swaps |
| OG | Exactly 1200×630 for any OG override; the metadata dimensions are hard-coded by `SeoService` |
| Breakpoints | Art direction defined for ≤480 px (mobile), 768–1024 px (tablet), ≥1280 px (desktop) |

**MAREA NAV page.** ≤480 px: hero 4:5 crop keeps the blank-screen slot and helm, headline moves below the
image; the crop-guidance spec (NAV-MOB-07) governs. 768–1024 px: 3:2 or 16:9 crop with copy in the upper
negative space. ≥1280 px: 16:9 full-bleed hero with copy left. Must never crop: the blank device screen (it
is the DOM UI slot), any composed entitlement/state label, the disclaimer band and the device mount.

**MAREA HUB page.** ≤480 px: 4:5 hero keeps the unit and its mounting point; connector field may narrow but
must not disappear; installation panels stack one per viewport. 768–1024 px: 3:2 crops with the unit
complete. ≥1280 px: 16:9 hero with the unit in the left third. Must never crop: the connector field, any
marking plate, the mounting/fixing detail and the handover record in the installation sequence.

**MAREA AIS page.** ≤480 px: 4:5 hero keeps the receiver and the antenna base (a cropped mast must never
read as a broken mast); the "no transmit path" callout and receive-only label always stay in view and in
the DOM, not in pixels. 768–1024 px: 16:9 or 3:2 crops keeping the splitter and receiver together.
≥1280 px: 16:9 full-bleed hero. Must never crop: the receive-only callout, the receiver/splitter pair, the
coax gland and the disclaimer band.

**Forbidden at every breakpoint.** Stretching, letterboxing or condensing an image to fit; text baked into
the image; a generated screen that looks like a real screenshot; cropping that removes a product connector
or a safety label; and any crop that removes the CONCEPT label or a mandated disclaimer from the page.

## 5. Accessibility and content rules

1. **Alt text is descriptive and claim-free.** Localised ES and EN, ≤125 characters, describes what is
   visible; no "image of", no keyword stuffing, and no performance, compatibility, certification or
   availability claim (`ASSET-PIPELINE.md` §8.5; claims policy §9).
2. **Alt text for a blocked asset describes the intended scene**, not a file that exists. It must not imply
   the photograph or render has been produced.
3. **Captions are bilingual and visible**, carry the CONCEPT label where generated imagery is involved, and
   may repeat the alt text only as a `<figcaption>` for a non-decorative image.
4. **Decorative images use `alt=""` plus `decorative: true`** in the future manifest; that is allowed only
   when the same information is already in visible text. Decorative icons in UI are `aria-hidden="true"`.
5. **No text inside generated pixels.** Interface mocks and any on-screen content are authored HTML/CSS/SVG
   composites and are labelled `CONCEPT`; a blank screen in a render is the DOM slot, never a fake UI.
6. **Contrast expectation.** Text over imagery uses the scrim rule in §4; the text/background pair is
   measured, not assumed. Primary instrument-style values are not placed over photography at all.
7. **Disclaimers survive every crop.** The AIS receive-only disclaimer and the navigation/instruments
   disclaimer (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9) are part of the page DOM adjacent to the image and
   are never part of the image.
8. **Icons follow the set rules.** `MR-ICO-001` icons are paired with visible text where meaning is
   critical; `ais-target` vs `ais-target-lost` and similar pairs are never distinguished by colour alone
   (`ICONOGRAPHY-SYSTEM.md` §9.2, §10).
9. **ES/EN parity.** A missing translation of alt text or caption is a `FAIL`, not a partial delivery;
   `test:i18n` covers dictionaries, but alt text and captions must be reviewed manually.
10. **No third-party product imagery.** A rendered scene may not include a recognisable competitor device,
   a third-party logo, a certification body mark or a chart-provider mark.

## 6. Generation briefs (for a future authorised visual-production milestone)

### 6.1 Common brief for all nine generated requirements (12 blocked requirements include derivatives)

Every generated asset inherits `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` §2 (G-1 to G-16) and §6. At minimum:

- **Subject.** One clear subject per frame; the product category is recognisable without text; the scene
  is a used recreational vessel in the Rías Baixas context, not a showroom.
- **Composition.** Crop-first for 16:9 hero, 3:2/4:3 section, 4:3 card; generous negative space reserved
  for DOM copy; subject never cut by the mobile crop.
- **Lighting / environment.** Soft overcast Atlantic daylight or low golden light; 8–18 kn wind and
  0.3–1.2 m chop for hero scenes; level horizon; no sun flare, no storm drama, no HDR or teal-orange
  grading.
- **Realism.** Plausible materials (matte anodised aluminium, white GRP, teak, stainless, matte plastics);
  plausible cable routing and glands; no glossy fantasy hardware, no RGB glow, no fake bevels.
- **Marine realism constraints.** No invented ports, model numbers, certification badges, IP ratings,
  standard-body marks or range graphics; no transponder or transmission imagery in any AIS scene; no
  autonomous or remote-helm implication in any HUB/NAV scene.
- **Negatives.** No text rendered in the image; no fake UI; no chart/ENC imagery; no third-party logos; no
  people without a signed model release; no identifiable customer or testimonial; no burned-in watermark or
  provider signature; no substitute stock.
- **Information layer.** Headings, labels, numbers, UI and disclaimers are authored HTML/CSS/SVG and
  composited in the page; the generated image supplies the scene and a blank slot only.
- **Disclosure.** The CONCEPT label (`PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` §2.2) lives in the page DOM;
  the future manifest carries provenance, prompt, params, seed, rights terms and disclosure status.
- **Provider.** `NONE_YET` until authorisation; no model name may be written into a brief until it is
  verified on the official provider page and recorded (`ASSET-PIPELINE.md` §2.4).

### 6.2 Types of brief and what each must deliver

| Type | Generation | Product-specific emphasis | Reused MC-04 brief |
| --- | --- | --- | --- |
| Product hero | `COMPOSITE` (NAV/AIS), `CGI` (HUB) | NAV: device at the helm with blank screen; HUB: matte gateway in a serviceable locker, no invented ports; AIS: antenna/splitter/receiver chain with no transmit path | `MR-PRD-004`, `MR-PRD-001`, `MR-PRD-005` |
| In use | `PHOTO` (NAV), `COMPOSITE` (HUB/AIS) | Anonymous use aboard; blank screens for authored UI; no chart data | `MR-PRD-004`, `MR-PRD-012`, `MR-PRD-005` |
| Installation sequence | `COMPOSITE` | The real work: antenna/splitter and coax for AIS; mounting, power and labelling for HUB; device mounting for NAV; handover record reference for HUB | `MR-PRD-012`, `MR-PRD-011` |
| Catalogue card | `NONE` (crop derivative) | Derived from an approved hero/use master; no new generation | — |
| Explanatory, editions, ecosystem, OG, technical | `NONE` (authored SVG/HTML) | Accuracy and honesty, not atmosphere; labels authored; engineering review before publication | — |

### 6.3 Visual QA acceptance criteria for any future generated file

1. The image does not exist as a claim until a real file with a real SHA-256 is registered in a manifest.
2. No readable text in pixels that a visitor would read as product information.
3. No certification mark, standard-body mark, IP rating, CE-style badge or award.
4. No transponder, transmission or DSC implication in any AIS asset.
5. No invented ports, model numbers, dimensions or material performance cues in hardware imagery.
6. No third-party product, logo, chart or provider data.
7. Any person is anonymous, has a signed model release and is not presented as a customer or testimonial.
8. The scene is visually plausible for a used recreational vessel in the stated environment.
9. The composition survives the defined desktop and mobile crops with the required elements intact.
10. The CONCEPT label and the mandated disclaimers are present in the page DOM, not in pixels.
11. Alt text and captions in ES and EN pass the §5 rules and are reviewed by a second person.
12. The manifest records provider, model, prompt, params, seed (if supported), rights terms and disclosure
    status; nothing is claimed that the provider terms do not allow.

## 7. Blocker register and exact unblock conditions

| Blocker | What it prevents | Exact external condition to unblock |
| --- | --- | --- |
| `X-03` / MC-01 B1–B3 | Any image generation: no provider capability, credential or budget | Written budget authorisation with a USD ceiling; provisioned account and credential in the approved secret store; verified commercial-use entitlement |
| `H-05` | Product photography of NAV/HUB/AIS hardware and any real installation | A built and tested physical unit with recorded serial/provenance and a photographed installation; not obtainable at MC-05 |
| `H-07` | Accurate CGI hardware depiction (ports, enclosure, markings) | A frozen BOM, enclosure design and marking specification from engineering; until then hardware imagery remains conceptual and must not invent details |
| D-005 (identity adoption `BLOCKED`) | Publishing any visual carrying the MAREA identity | Professional originality/prior-art review, trademark clearance and Lead adoption decision; identity stays `PROPOSED`/`PREFERRED_PROVISIONAL` |
| `X-01` | Public brand use in any asset | EUIPO/OEPM clearance and a written publication decision |
| B22 | Publishing generated imagery at all (transparency form undecided) | A recorded legal decision on synthetic-content disclosure under the EU AI Act transparency provisions |
| B23 | Creating the first real file in `public/` | A Lead-approved write scope for `public/assets/marea/**` plus the page's own scope |
| B15 | Technical visuals being presented as verified | Engineering sign-off of diagram ports, protocols and labels; otherwise every technical visual stays labelled illustrative |

## 8. Coverage matrix (for MC-29+ production planning)

| Product | Requirements | `BLOCKED_ON_IMAGE_GENERATION` | MC-04 vector/brief input reused | Authored new, no MC-04 input | `REAL_PRODUCT` |
| --- | ---: | ---: | ---: | ---: | ---: |
| MAREA NAV | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA HUB | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA AIS | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| **Total** | **30** | **12** | **15** | **3** | **0** |

Asset-type coverage (each type appears once per product): product hero; product in use; product
overview/explanatory; editions comparison; ecosystem integration; installation/onboarding sequence; mobile
adaptation/crop guidance; sales thumbnail; social/Open Graph future launch creative; technical information
visual.

Production sequencing for MC-29+: (1) authored vectors and specifications first, because they need no
generation authorisation (15 reused inputs + 3 new specifications); (2) the nine photographic/CGI scenes
only after `X-03`, `H-05`, `H-07`, D-005 and B22/B23 are resolved; (3) cards and OG cards last, derived
from approved masters. No page may ship with a broken image path: until a file exists, the page uses the
existing `app-product-image` placeholder pattern, never an unrelated stock image.

## 9. Controls, evidence status and next actions

| Control | Requirement |
| --- | --- |
| Manifest first | No file ships without an `MR-<CATEGORY>-<NNN>` manifest entry with real bytes, dimensions, SHA-256, rights and alt/caption |
| No duplicates | One file per width × format; no parallel asset trees; no duplicated category across folders |
| Review separation | Author ≠ reviewer for visual and alt-text review; a second person checks ES/EN copy |
| Claims gate | Any image used next to a claim must satisfy `COMMERCIAL-BRAND-CLAIMS-POLICY.md`; images are not evidence of certification, testing or availability |
| Disclosure | The CONCEPT label and the mandated disclaimers are mandatory wherever a generated scene appears |
| Evidence status | This document is a planning record only; no file, hash, manifest entry or generation exists |

**Honest evidence statement.** This document was produced by reading the MC-04 asset manifest and briefs,
the ASSET-PIPELINE contract, the photography/CGI art direction, the identity, iconography, colour,
typography, hardware-CMF and packaging directions, and the three MC-05 product dossiers. Every MC-04 id and
path cited above was verified against `MC-04-ASSETS.yaml` (and the diagram/icon/logo/social/packaging files
confirmed present on disk) on 2026-10-30. No asset was produced, generated, downloaded or substituted, and
no product page exists.
