# MAREA PILOT · MAREA SENSE · MAREA WATCH — Product visual-asset requirements (MC-06 / D9)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D9 / PRODUCT-ASSET-REQUIREMENTS-BATCH-02 |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Date | 2026-10-30 |
| Owner function | Commercial, UX and Localization Specialist (asset-requirements owner for batch 02) |
| Status | INTERNAL PLANNING DOCUMENT. No asset is produced, generated, authorised, downloaded or published by this milestone |
| Lifecycle context | Products `DEFINED` and `NOT_FOR_SALE`; brand `PROPOSED` / `NOT_GRANTED`; imagery `BLOCKED_ON_IMAGE_GENERATION` |
| Governing contract | `docs/marea/assets/ASSET-PIPELINE.md` (§4.2 registry ids, §4.3 manifest fields, §5 workflow, §7.1 classification, §8 budgets, §9 approvals), `docs/marea/products/README.md` §7 rule 9 and §22 |
| Binding inputs | `docs/marea/assets/manifest/MC-04-ASSETS.yaml`, `MC-04-BRIEFS.yaml` (reuse verified on 2026-10-30); batch-01 counterpart `PRODUCT-ASSET-REQUIREMENTS.md`; `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`; D4/D5/D7 |
| Is not | An asset manifest, a generation authorisation, a licence, a page implementation, a price or an availability statement |

## 0. The generation gate — binding statement

- **No image-generation provider, credential or budget is authorised in this programme** (`X-03`; MC-01 B1–B3;
  MC-04 B16). No prompt has been sent and **no file exists for any requirement below**.
- **No PILOT, SENSE or WATCH device exists.** There is no physical unit, no enclosure, no BOM (`H-05`, `H-07`,
  `H-11`), no certification (`H-06`) and no tested installation. **No photograph, CGI render or mock-up may be
  generated, downloaded or substituted** — no fake photography, no unlicensed stock, no third-party artwork and no
  placeholder file. A blocked brief with no file is the honest state; a fake file is a claims-policy failure.
- **Every photographic or CGI requirement is `BLOCKED_ON_IMAGE_GENERATION`** while `X-03` is open. No asset
  may be classified as a verified real-photograph or real-render asset until a tested unit, date, place and
  provenance exist (`ASSET-PIPELINE.md` §7.1).
- **All thirty requirements are `CONCEPT`.** Not one describes a manufactured device, and none may be labelled,
  captioned or alt-texted as a real product, a real installation or a certification.
- MC-04 vectors and lockups may be referenced **only as internal design inputs**, provisional and
  `PREFERRED_PROVISIONAL` at best; they are not adopted public identity (`MC-04-DELIVERY.md` §1, D-005).
- **Identifiers.** `PILOT-HERO-01`-style ids are MC-06 planning ids, not manifest registrations. A produced file
  must receive an immutable `MR-<CATEGORY>-<NNN>` registry id under `ASSET-PIPELINE.md` §4.2; the planning id then
  maps to it.
- **What would authorise generation** (all four, in writing, from the company owner): a budget authorisation with a
  cost ceiling; a provisioned provider account and credential in the approved secret store; verified
  commercial-use entitlement for CONCEPT imagery; and a Lead-approved write scope plus a recorded
  synthetic-content disclosure decision (B22/B23).

## 1. Principles

1. **Product clarity before beauty.** A PILOT visual shows a supervised control head with an E-stop and a manual
   takeover affordance — never a hands-off-wheel scene. A SENSE visual shows a measured compartment, never a
   dashboard wall. A WATCH visual shows the distance between a person ashore and an unattended boat, never "the app
   saved the boat".
2. **One asset, one idea.** Hero = context and confidence; overview = definition; editions = the honest
   difference; installation = the real work; technical = the boundary.
3. **Edition difference is shown only where it exists**, and `CONDITIONAL` verdicts are visible on the editions
   asset (PILOT Sail, SENSE Sail/Systems, WATCH Plus).
4. **The ecosystem is shown as intended, not verified.** Every integration visual carries "illustrative — not a
   compatibility claim".
5. **Installation reality is part of the product.** The E-stop, motor isolation, drive selection, calibration,
   glands, antenna routes and coverage checks are the customer's real work and cost.
6. **Limitations are visible.** Supervised steering, unmeasured accuracy, conditional awareness, stale/unknown
   states and "not available" belong in the visual language, not only in a footer.
7. **The information layer is authored.** All headings, labels, numbers, disclaimers and UI content are
   HTML/CSS/SVG (`ASSET-PIPELINE.md` §6.3). Generated pixels never contain readable product information.
8. **No visual implies certification, availability, autonomy, remote control or a product that does not exist.**
9. **Reuse before generate.** Fifteen requirements reuse an existing MC-04 vector or blocked brief as their
   structural input; three are new authored specifications needing no generation.
10. **Concept labelling is mandatory.** Any generated scene carries the verbatim CONCEPT disclosure in the page DOM
    (`PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md` §2.2), plus the PILOT, SENSE or WATCH limitation wording and the
    navigation disclaimer where position, depth or traffic appears.

## 2. The asset register (30 requirements)

**Every asset records, in this order:** ID · product · purpose · consumer page section · subject · composition ·
aspect ratio · dimensions · desktop crop · mobile crop · internal MC-04 design references · vector-authored vs
photo/CGI · rights · provenance · classification (`CONCEPT` only, never a verified real-product class) · ES alt · EN alt · required safety labels
· generation status · visual acceptance criteria.

### 2.1 MAREA PILOT — ten requirements

#### PILOT-HERO-01 — MAREA PILOT product hero
- **Product / purpose.** `PILOT`; make the supervised-steering category recognisable in one frame.
- **Page section.** Future `/marea/pilot` and `/en/marea/pilot`, hero.
- **Subject / composition.** A matte control head at a used sailing-yacht helm, with a physically distinct E-stop
  and a manual-takeover lever in the same frame; the relationship between the three controls is the subject. Control
  head right, E-stop and lever left, sea/horizon soft behind; blank DOM label areas.
- **Format.** 16:9; master 1920×1080; desktop keeps all three controls and the horizon; mobile 4:5 keeps E-stop and
  control head together (the lever may crop only if the E-stop remains unmistakable).
- **Authoring / MC-04 input.** `COMPOSITE` (photo scene + authored DOM). MC-04 inputs: blocked brief `MR-PRD-006`
  (`pilot-supervised-control-head-concept`), diagram `MR-DIA-002`
  (`docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg`) as structural reference, lockup
  `MR-BRD-005` PILOT (`docs/marea/brand/assets/logo/family/marea-family-pilot-lockup.svg`), icons from `MR-ICO-001`
  (`device-control-head`, `alert-alarm`, `acknowledge`).
- **Rights / provenance.** No rights acquired; no provider; provenance to be recorded per manifest field. No
  third-party control head, no invented certification, no remote handset.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (X-03).
- **Safety labels (DOM).** PILOT supervised-steering disclaimer (verbatim); navigation disclaimer (control head
  shows heading/route data); "no autonomous steering, no remote helm" callout; CONCEPT label.
- **Alt.** ES: «Cabezal de control de gobierno asistido con paro de emergencia y palanca de toma manual en una
  consola de timón.» EN: "Supervised steering control head with an emergency stop and a manual takeover lever on a
  helm console."
- **Visual acceptance.** Three controls readable as distinct shapes at 390 px; E-stop distinguished by shape and
  position, not colour alone; no readable digits or letters in pixels; no second helm; horizon level; disclaimer
  present in DOM; ES/EN alt reviewed by a second person.

#### PILOT-USE-02 — MAREA PILOT in use
- **Product / purpose.** `PILOT`; show the supervised relationship between person and helm, not automation.
- **Page section.** Future `/marea/pilot`, "on passage" section.
- **Subject / composition.** Anonymous skipper seen from behind at the helm under sail, one hand on the wheel and
  the other near the control head; cockpit, sprayhood edge, light chop; no faces, no testimonial framing.
- **Format.** 3:2; master 1600×1067; desktop 3:2 with copy-safe area right; mobile 1:1 keeping both hands and the
  control head, never cropping the E-stop out.
- **Authoring / MC-04 input.** `PHOTO`/`COMPOSITE`; MC-04 blocked briefs `MR-PRD-006` and `MR-COR-003` (lifestyle
  direction); icons `acknowledge`, `device-control-head`.
- **Rights / provenance.** Model release required for any visible person, who stays anonymous; no client,
  testimonial or identifiable vessel.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** Supervised-steering disclaimer; "person at the helm at all times" caption; CONCEPT label.
- **Alt.** ES: «Patrón de espaldas al timón con una mano en la rueda y la otra junto al cabezal de control.»
  EN: "Skipper seen from behind at the helm, one hand on the wheel and the other near the control head."
- **Visual acceptance.** No hands-off-wheel or celebration framing; control head plausible and unlabelled; no
  readable instrument values; crop test at 390/768/1440 px; model release on file before use.

#### PILOT-OVR-03 — PILOT explanatory overview
- **Product / purpose.** `PILOT`; explain what the customer actually buys and what is a physical boundary.
- **Page section.** Future `/marea/pilot`, "what is included / what it is not" section.
- **Subject / composition.** Authored four-band SVG: (1) survey and vessel decision; (2) installed system (control
  head, control computer, motor control, drive, feedback, E-stop, isolation); (3) commissioned and trained operation
  in verified modes; (4) boundaries panel: no autonomy, no remote helm, no collision avoidance, no certification.
- **Format.** 16:9; master vector 1920×1080; desktop full width, no crop; mobile vertical reflow to stacked bands
  with no text loss.
- **Authoring / MC-04 input.** Authored SVG (no generation). Structural reference `MR-DIA-002`; icons `MR-ICO-001`
  (`device-control-head`, `installation`, `fuse-breaker`, `service`, `settings`, `power`); lockup `MR-BRD-005`
  PILOT.
- **Rights / provenance.** Original authored vector; no third-party marks; no certification badges.
- **Classification / status.** `CONCEPT`; authored vector (no `BLOCKED` status — no generation needed).
- **Safety labels.** Supervised-steering disclaimer beneath the diagram; boundary band labelled "never offered".
- **Alt.** ES: «Diagrama en cuatro bandas: estudio del barco, sistema instalado, uso supervisado y límites.»
  EN: "Four-band diagram: vessel survey, installed system, supervised operation and boundaries."
- **Visual acceptance.** Every band has authored text, no icon-only meaning; boundaries are as prominent as
  benefits; engineering review of the subsystem list `PENDING`; contrast measured per tokens.

#### PILOT-EDN-04 — PILOT editions comparison
- **Product / purpose.** `PILOT`; show the surveyed-scope difference between Coastal, Sail and Pro with verdicts.
- **Page section.** Future `/marea/pilot`, editions section.
- **Subject / composition.** Three-column comparison: Coastal (`DEFINED`), Sail (`CONDITIONAL`, condition stated),
  Pro (`INSTALLATION_PACKAGE`, "quoted per vessel, not a retail SKU"); a shared header states the safety path is
  identical in every edition; no price, no availability.
- **Format.** 16:9; master 1920×1080 authored; desktop three columns; mobile three stacked cards in edition order,
  verdict first.
- **Authoring / MC-04 input.** Authored SVG/HTML; lockup `MR-BRD-005` PILOT; icons `service`, `settings`,
  `acknowledge`.
- **Rights / provenance.** Original authored; no price data; no availability cue.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Safety path identical in every edition"; supervised-steering disclaimer.
- **Alt.** ES: «Comparación de las ediciones Coastal, Sail y Pro con sus veredictos y la condición de Sail.»
  EN: "Comparison of Coastal, Sail and Pro with their verdicts and the Sail condition."
- **Visual acceptance.** Verdict labels match D4 exactly; no performance or "safety level" implication; no figure;
  conditional condition legible at 390 px.

#### PILOT-ECO-05 — PILOT ecosystem integration visual
- **Product / purpose.** `PILOT`; show route context in, status out, and the actuation barrier.
- **Page section.** Future `/marea/pilot`, ecosystem/integration section.
- **Subject / composition.** Control head at centre; NAV route context arrow **into** the helm display only; HUB and
  WATCH arrows **out** (read-only); SENSE arrow in only with a "qualified input" gate; a hard barrier symbol on the
  actuation side labelled "no remote or cloud command path"; "illustrative — not a compatibility claim" note.
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical list with the same labels and the
  barrier preserved.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-003`
  (`docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg`) and `MR-DIA-002`; icons `MR-ICO-001`
  (`ais-receive-only` only if AIS traffic is drawn, `device-hub`, `watch-monitoring`, `wind-true`, `connection`).
- **Rights / provenance.** Original authored; no third-party logos; no compatibility claim.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Read-only ashore"; "no steering command leaves the vessel"; AIS receive-only disclaimer if
  targets appear; navigation disclaimer.
- **Alt.** ES: «Diagrama del ecosistema con el cabezal de control en el centro, contexto de NAV de entrada y
  estado de solo lectura hacia HUB y WATCH.»
  EN: "Ecosystem diagram with the control head at the centre, NAV context inbound and read-only status to HUB and
  WATCH."
- **Visual acceptance.** Arrow directions match D5 `I-01`–`I-03`; the barrier is unmistakable; no implied remote
  control; re-verified against D5 before any publication.

#### PILOT-INS-06 — PILOT installation and commissioning sequence
- **Product / purpose.** `PILOT`; show the real installed work, including the safety path.
- **Page section.** Future `/marea/pilot`, professional installation section.
- **Subject / composition.** Four panels: (1) survey at the helm and electrical panel with a clipboard; (2) drive
  and feedback mounting below deck; (3) cabling, power protection, E-stop and motor isolation with tidy glands;
  (4) handover of a commissioning record and a supervised trial briefing. Labels authored in DOM.
- **Format.** 3:2 per panel; master 1600×1067 each; desktop four-up; mobile one panel per viewport.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked briefs `MR-PRD-012` (refit installation) and `MR-PRD-006`
  (control head), `MR-PRD-011` (connector/gland macro); record reference `MR-BRD-012`
  (`docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html` / `-en`).
- **Rights / provenance.** Model release for any person; no certification marks; the commissioning record is never
  depicted as filled, signed or certified.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** "Installation quoted separately, never included"; "E-stop and motor isolation are design
  boundaries"; supervised-steering disclaimer; CONCEPT label.
- **Alt.** ES: «Cuatro escenas de instalación: estudio del barco, montaje del accionamiento, cableado con paro de
  emergencia y entrega de documentación.»
  EN: "Four installation scenes: vessel survey, drive mounting, cabling with emergency stop, and documentation
  handover."
- **Visual acceptance.** E-stop and isolation visible in panel 3; no "plug and play" styling; no readable record
  data; mobile crop keeps the safety items; disclaimer in DOM.

#### PILOT-MOB-07 — PILOT mobile adaptation and crop guidance
- **Product / purpose.** `PILOT`; design hand-off specification, not a customer-facing image.
- **Page section.** Design hand-off only.
- **Subject / composition.** Authored specification sheet of PILOT-HERO-01/USE-02/INS-06 at 390, 768 and 1440 px,
  marking focal point, copy-safe areas, the E-stop/manual-takeover pair and the forbidden crop zones.
- **Format.** 16:9 sheet; master 1920×1080 authored; desktop n/a (specification); mobile stacked viewport columns.
- **Authoring / MC-04 input.** Authored specification; `NONE` (no MC-04 input needed).
- **Rights / provenance.** Internal specification, no claims.
- **Classification / status.** `CONCEPT` (specification); authored.
- **Safety labels.** None customer-facing; internal note that the E-stop pair is uncroppable.
- **Alt.** ES: «Contrato de recorte móvil para las imágenes de MAREA PILOT.» EN: "Mobile crop contract for MAREA
  PILOT imagery."
- **Visual acceptance.** Three viewport widths present; the E-stop pair, disclaimer band and label slots are marked
  uncroppable; reviewed by the page owner before any page is built.

#### PILOT-TMB-08 — PILOT catalogue card
- **Product / purpose.** `PILOT`; a card for a future product catalogue grid.
- **Page section.** Future `/marea/productos` card grid; family card link.
- **Subject / composition.** 4:3 crop derived from `PILOT-HERO-01` (or `PILOT-USE-02`), with the PILOT lockup as a
  DOM overlay and a "supervised" label; no price, no availability badge.
- **Format.** 4:3; master 1024×768 (960/640/400 derivatives); desktop fixed 4:3; mobile full-width 4:3 card.
- **Authoring / MC-04 input.** Crop derivative (no new generation); lockup `MR-BRD-005` PILOT.
- **Rights / provenance.** Inherits the master's rights; cannot exist before the master does.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (derivative of a blocked master).
- **Safety labels.** "Supervised steering" label; no availability/price cue; CONCEPT label in the page DOM.
- **Alt.** ES: «Tarjeta de catálogo de MAREA PILOT con el cabezal de control y el paro de emergencia.»
  EN: "MAREA PILOT catalogue card showing the control head and emergency stop."
- **Visual acceptance.** E-stop survives the card crop; no "buy", "available" or price cue; lockup clear space per
  identity system; card ≤45 kB at 960 w target.

#### PILOT-OG-09 — PILOT social / Open Graph card
- **Product / purpose.** `PILOT`; a future launch/OG card after publication approval.
- **Page section.** Future OG metadata for `/marea/pilot`.
- **Subject / composition.** Authored 1200×630 card: reversed PILOT lockup, status line "product definition
  published; not available", and the supervised-steering line; vector sea-toned background, no photograph.
- **Format.** exactly 1200×630; desktop n/a (fixed OG); mobile platform crops keep lockup and status line inside
  the central safe area.
- **Authoring / MC-04 input.** Authored HTML/vector rendered deterministically (`MR-BRD-008` method); inputs
  `MR-BRD-003` reversed lockup, `MR-BRD-005` PILOT lockup, brand OG sources
  (`docs/marea/brand/assets/social/og-marea-en-1200x630.html`, `-es`).
- **Rights / provenance.** Original authored; proposed identity only; no trademark symbols.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Supervised steering — never autonomous"; no availability or performance claim.
- **Alt.** ES: «Tarjeta social de MAREA PILOT (1200×630) con el logotipo y una línea de estado del producto.»
  EN: "MAREA PILOT social card (1200×630) with the lockup and a product-status line."
- **Visual acceptance.** Exactly 1200×630 or the metadata lies; no `®`/`™`; status line legible at small preview
  sizes; no performance claim.

#### PILOT-TEC-10 — PILOT technical information visual
- **Product / purpose.** `PILOT`; document the modes, the evidence conditions and the safety path.
- **Page section.** Future `/marea/pilot`, technical/professional section and installer documentation.
- **Subject / composition.** Authored diagram: mode table (heading hold, wind-angle `CONDITIONAL`, route/track
  `TARGET_ONLY`) with evidence conditions; safety path block diagram (physical E-stop → independent motor-power
  isolation → watchdog/heartbeat → manual takeover); a boundary panel "no remote/cloud command path".
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile single column with the safety path preserved.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-002`; icons `MR-ICO-001`
  (`device-control-head`, `alert-alarm`, `fuse-breaker`, `power`, `service`, `update`, `stale`, `unknown`).
- **Rights / provenance.** Original authored; no certification or protocol-conformance claim.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Illustrative — not a certification"; supervised-steering disclaimer; "no remote command path".
- **Alt.** ES: «Diagrama técnico de modos y ruta de seguridad del gobierno asistido, con paro de emergencia,
  aislamiento y toma manual.»
  EN: "Technical diagram of supervised-steering modes and safety path with emergency stop, isolation and manual
  takeover."
- **Visual acceptance.** Mode evidence conditions match D1/D4; safety path is not simplified in a way that implies
  redundancy that is unproven; engineering review `PENDING` recorded; no readable invented specification.

### 2.2 MAREA SENSE — ten requirements

#### SENSE-HERO-01 — MAREA SENSE product hero
- **Product / purpose.** `SENSE`; show a measured compartment, not a gadget wall.
- **Page section.** Future `/marea/sense` and `/en/marea/sense`, hero.
- **Subject / composition.** Below-decks context: a bilge sensor on a bracket and a tank-level sender on a plastic
  tank, cables tidily routed into glands; honest dim bilge light and overcast compartment light; blank DOM label
  areas.
- **Format.** 16:9; master 1920×1080; desktop keeps both installations; mobile 4:5 keeps one sensor and its
  mounting point together.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked brief `MR-PRD-007` (`sense-sensor-systems-concept`), lockup
  `MR-BRD-005` SENSE (`docs/marea/brand/assets/logo/family/marea-family-sense-lockup.svg`), icons `MR-ICO-001`
  (`sensor`, `bilge`, `tank-level`, `calibration`).
- **Rights / provenance.** No rights acquired; no fake brand markings; no invented IP rating.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** SENSE measurement wording (readings valid only within verified range and calibration);
  navigation disclaimer if depth/position appears; CONCEPT label.
- **Alt.** ES: «Sensor de sentina atornillado a un soporte y emisor de nivel en un depósito de plástico, con cables
  recogidos.»
  EN: "Bilge sensor bolted to a bracket and a level sender on a plastic tank, with cables tidily routed."
- **Visual acceptance.** No dirty-horror bilge or flood drama; no fake alarm light; no certification sticker;
  mounting plausible; alt reviewed in both languages.

#### SENSE-USE-02 — MAREA SENSE in use
- **Product / purpose.** `SENSE`; show a customer reading a measurement locally.
- **Page section.** Future `/marea/sense`, "reading your boat" section.
- **Subject / composition.** Owner at a companionway or chart table looking at a tablet/phone with a blank screen
  (DOM slot for a measurement composite); a module visible in soft focus behind; no readable values.
- **Format.** 3:2; master 1600×1067; desktop 3:2 copy right; mobile 1:1 keeping the blank screen and both hands.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked briefs `MR-PRD-007` and `MR-PRD-004` (device context);
  icons `sensor`, `stale`, `no-data`.
- **Rights / provenance.** Model release for any person; no client or vessel identity.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** Measurement-limitation wording; "interface is a web composite, not a product screenshot";
  CONCEPT label.
- **Alt.** ES: «Persona en la bajada de la escalera mirando una tableta de pantalla en blanco, con un módulo de
  sensor desenfocado al fondo.»
  EN: "Person at a companionway looking at a blank-screen tablet, with a sensor module softly out of focus behind."
- **Visual acceptance.** No fabricated reading; no chart; crop keeps the blank screen; model release on file.

#### SENSE-OVR-03 — SENSE explanatory overview
- **Product / purpose.** `SENSE`; explain module → local indication → optional HUB → WATCH, and the no-connectivity
  boundary.
- **Page section.** Future `/marea/sense`, "what each module measures" section.
- **Subject / composition.** Authored five-module strip (wind, power, bilge, tanks, environment) → local indication
  → optional HUB → WATCH for alerts; a labelled barrier: "a SENSE module has no connectivity of its own and never
  sends alerts"; a calibration gate on the reading path.
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile stacked modules with the same labels.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-003`; icons `MR-ICO-001` (`wind-sensor`,
  `battery`, `bilge`, `tank-level`, `temperature`, `calibration`, `device-hub`, `watch-monitoring`, `no-data`).
- **Rights / provenance.** Original authored; no accuracy figure, no IP rating, no protocol claim.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Measurement-limitation wording; "remote alerting requires WATCH + connectivity + subscription".
- **Alt.** ES: «Cinco módulos de medición conectados a una indicación local, con HUB opcional y WATCH para avisos
  remotos.»
  EN: "Five measurement modules feeding a local indication, with optional HUB and WATCH for remote alerts."
- **Visual acceptance.** The no-connectivity barrier is unmistakable; no NMEA 2000 mention; calibration gate
  visible; labels authored not generated.

#### SENSE-EDN-04 — SENSE modules and kits comparison
- **Product / purpose.** `SENSE`; show five modules and three kits with conditional verdicts.
- **Page section.** Future `/marea/sense`, editions section.
- **Subject / composition.** Module matrix (five modules × measured quantity) plus three kit cards: Essentials
  (`DEFINED`), Sail (`CONDITIONAL`), Systems (`CONDITIONAL`) — each kit card lists exactly its modules; a note
  states "a kit never adds a capability its modules lack"; no price.
- **Format.** 16:9; master 1920×1080 authored; desktop matrix + cards; mobile stacked cards with verdict first.
- **Authoring / MC-04 input.** Authored; lockup `MR-BRD-005` SENSE; icons as above.
- **Rights / provenance.** Original authored; no price; no availability cue.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Readings valid only within verified range and calibration"; conditional verdicts visible.
- **Alt.** ES: «Matriz de los cinco módulos SENSE y de los tres kits con sus veredictos y composición.»
  EN: "Matrix of the five SENSE modules and three kits with their verdicts and composition."
- **Visual acceptance.** Kit composition equals the modules published in D4; conditional labels legible at 390 px;
  no accuracy figure; no price.

#### SENSE-ECO-05 — SENSE ecosystem integration visual
- **Product / purpose.** `SENSE`; show where readings go and where they cannot go.
- **Page section.** Future `/marea/sense`, ecosystem section.
- **Subject / composition.** Modules → HUB → NAV/live overlays; modules → WATCH → alerts ashore; no direct module
  → cloud arrow (explicitly struck through); "illustrative — not a compatibility claim".
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical flow preserving the struck-through
  path.
- **Authoring / MC-04 input.** Authored SVG; `MR-DIA-003`; icons `device-hub`, `watch-monitoring`, `cellular`,
  `offline`.
- **Rights / provenance.** Original authored; no NMEA 2000, no blanket compatibility.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "No direct cloud path from a module"; measurement wording; navigation disclaimer.
- **Alt.** ES: «Diagrama del ecosistema SENSE con los módulos hacia HUB, NAV y WATCH y sin ruta directa a la nube.»
  EN: "SENSE ecosystem diagram: modules to HUB, NAV and WATCH, with no direct cloud path."
- **Visual acceptance.** The struck-through path is visually obvious and not misleading; arrows match D5 `I-06`,
  `I-08`, `I-09`; no protocol name.

#### SENSE-INS-06 — SENSE installation and calibration sequence
- **Product / purpose.** `SENSE`; show mounting, sealing, calibration and verification as real work.
- **Page section.** Future `/marea/sense`, installation section.
- **Subject / composition.** Four panels: (1) mounting the module on a bracket in a compartment; (2) gland and
  cable route with service loop; (3) calibration at installation (a hand holding a reference, no readable values);
  (4) verification: a local reading being confirmed. Authored labels in DOM.
- **Format.** 3:2 per panel; master 1600×1067 each; desktop four-up; mobile one panel per viewport.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked briefs `MR-PRD-007`, `MR-PRD-012`, `MR-PRD-011`; record
  reference `MR-BRD-012`.
- **Rights / provenance.** Model release for hands/person; no certification sticker; no IP rating printed.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** "Calibration required"; measurement-limitation wording; "installation quoted separately".
- **Alt.** ES: «Cuatro escenas: montaje del módulo, prensaestopas y cableado, calibración y verificación de una
  lectura local.»
  EN: "Four scenes: module mounting, cable gland and routing, calibration and verification of a local reading."
- **Visual acceptance.** Calibration panel cannot be read as a certified calibration; no readable numbers; sealing
  geometry plausible; disclaimer in DOM.

#### SENSE-MOB-07 — SENSE mobile adaptation and crop guidance
- **Product / purpose.** `SENSE`; design hand-off specification.
- **Page section.** Design hand-off only.
- **Subject / composition.** Authored crop specification for SENSE-HERO-01/USE-02/INS-06 at 390/768/1440 px,
  marking sensor + mounting point, gland, calibration panel and forbidden crop zones.
- **Format.** 16:9 sheet; 1920×1080 authored; mobile stacked viewport columns.
- **Authoring / MC-04 input.** Authored specification; `NONE`.
- **Rights / provenance.** Internal only.
- **Classification / status.** `CONCEPT` (specification); authored.
- **Safety labels.** Internal: sensor + mounting point and calibration panel uncroppable.
- **Alt.** ES: «Contrato de recorte móvil para las imágenes de MAREA SENSE.» EN: "Mobile crop contract for MAREA
  SENSE imagery."
- **Visual acceptance.** Three widths; uncroppable zones marked; reviewed by page owner.

#### SENSE-TMB-08 — SENSE catalogue card
- **Product / purpose.** `SENSE`; future catalogue grid card.
- **Page section.** Future `/marea/productos` card grid.
- **Subject / composition.** 4:3 crop from `SENSE-HERO-01` with the SENSE lockup as DOM overlay and a "measures
  locally" label; no price, no availability.
- **Format.** 4:3; master 1024×768 (960/640/400); desktop fixed; mobile full-width 4:3.
- **Authoring / MC-04 input.** Crop derivative; lockup `MR-BRD-005` SENSE.
- **Rights / provenance.** Inherits master rights; blocked until the master exists.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (derivative).
- **Safety labels.** "Measurements, not alarms" label; CONCEPT label in DOM.
- **Alt.** ES: «Tarjeta de catálogo de MAREA SENSE con un sensor de sentina y un emisor de nivel.»
  EN: "MAREA SENSE catalogue card with a bilge sensor and a level sender."
- **Visual acceptance.** Sensor and mounting survive the crop; no availability or price cue; ≤45 kB at 960 w.

#### SENSE-OG-09 — SENSE social / Open Graph card
- **Product / purpose.** `SENSE`; future launch/OG card after publication approval.
- **Page section.** Future OG metadata for `/marea/sense`.
- **Subject / composition.** Authored 1200×630: reversed SENSE lockup, "measures locally; readings are valid only
  within verified range and calibration", status line "product definition published; not available".
- **Format.** exactly 1200×630; mobile platform crops keep lockup + status line centred.
- **Authoring / MC-04 input.** Authored (`MR-BRD-008` method); `MR-BRD-003`, `MR-BRD-005` SENSE, brand OG sources.
- **Rights / provenance.** Original authored; proposed identity only.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Measurement-limitation line mandatory; no accuracy or IP claim.
- **Alt.** ES: «Tarjeta social de MAREA SENSE (1200×630) con el logotipo y una línea sobre la validez de las
  lecturas.»
  EN: "MAREA SENSE social card (1200×630) with the lockup and a line about reading validity."
- **Visual acceptance.** Exactly 1200×630; no `®`/`™`; limitation line not truncated.

#### SENSE-TEC-10 — SENSE technical information visual
- **Product / purpose.** `SENSE`; document measurement, calibration and state validity.
- **Page section.** Future `/marea/sense`, technical section and support documentation.
- **Subject / composition.** Authored diagram: measurement → calibration state → validity rules → display states
  (`FRESH`, `STALE`, `UNKNOWN`, `NOT_AVAILABLE`, invalid); a panel listing what no module claims (no accuracy
  figure, no IP rating, no NMEA 2000, no certified alarm); connection path to HUB/WATCH marked illustrative.
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical layout keeping the state strip.
- **Authoring / MC-04 input.** Authored SVG; `MR-DIA-003`; icons `calibration`, `stale`, `no-data`, `unknown`,
  `offline`, `installation`, `update`.
- **Rights / provenance.** Original authored; no measurement figure; engineering review `PENDING`.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Measurement wording verbatim in DOM; "illustrative, not a compatibility or accuracy claim".
- **Alt.** ES: «Diagrama técnico de medición, calibración y estados de validez de una lectura SENSE.»
  EN: "Technical diagram of measurement, calibration and reading-validity states for SENSE."
- **Visual acceptance.** Invalid/stale/unknown states visually distinct without colour alone; no number presented
  as an accuracy; engineering review recorded.

### 2.3 MAREA WATCH — ten requirements

#### WATCH-HERO-01 — MAREA WATCH product hero
- **Product / purpose.** `WATCH`; show the distance between a person ashore and an unattended boat.
- **Page section.** Future `/marea/watch` and `/en/marea/watch`, hero.
- **Subject / composition.** Shore-side moment: an anonymous person out of focus holding a phone with a **blank**
  screen; a moored or anchored yacht soft in the background; overcast/early-evening marina; the gap between phone
  and boat is the story; the WATCH device is not shown as a hero.
- **Format.** 16:9; master 1920×1080; desktop keeps phone and yacht relationship; mobile 4:5 keeps phone and yacht
  mast (never a broken-mast read), no face enters the crop.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked brief `MR-PRD-008` (`watch-remote-monitoring-concept`), lockup
  `MR-BRD-005` WATCH (`docs/marea/brand/assets/logo/family/marea-family-watch-lockup.svg`), icons `MR-ICO-001`
  (`watch-monitoring`, `cellular`, `signal-strength`).
- **Rights / provenance.** Model release for any visible person, who stays anonymous; no third-party boat names or
  logos; no notification glow colour that reads as an alert state.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** WATCH conditional-awareness wording (power, coverage, provider delivery; not a certified
  distress service); "the screen shown is a web composite"; CONCEPT label.
- **Alt.** ES: «Mano sosteniendo un teléfono con la pantalla en blanco y un velero fondeado desenfocado al fondo.»
  EN: "Hand holding a phone with a blank screen, a sailboat at anchor softly out of focus behind."
- **Visual acceptance.** No readable notification text; no "stolen boat" drama; no 24/7 or certified-monitoring
  cue; blank screen reserved for the DOM composite; model release on file.

#### WATCH-USE-02 — MAREA WATCH in use
- **Product / purpose.** `WATCH`; show a routine check, not an emergency fantasy.
- **Page section.** Future `/marea/watch`, "away from the boat" section.
- **Subject / composition.** Owner at a marina pontoon checking a phone with a blank screen (DOM slot for the alert
  composite); the boat visible along the pontoon; ordinary clothing, honest weather.
- **Format.** 3:2; master 1600×1067; desktop 3:2 copy right; mobile 1:1 keeping phone and boat.
- **Authoring / MC-04 input.** `COMPOSITE`; `MR-PRD-008`, `MR-COR-003`; icons `watch-monitoring`, `stale`,
  `offline`.
- **Rights / provenance.** Model release; no customer identity; no readable screen.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** Conditional-awareness wording; "composite, not a real notification".
- **Alt.** ES: «Persona en el pantalán consultando un teléfono de pantalla en blanco, con la embarcación al fondo.»
  EN: "Person on a pontoon checking a blank-screen phone, with the vessel in the background."
- **Visual acceptance.** No fake alarm UI; no distress imagery; crop keeps phone and boat; wording in DOM.

#### WATCH-OVR-03 — WATCH explanatory overview
- **Product / purpose.** `WATCH`; explain the chain and its uncertainty honestly.
- **Page section.** Future `/marea/watch`, "how an alert reaches you" section.
- **Subject / composition.** Authored chain: monitored input → device → mobile network → cloud ingestion →
  notification provider → app, with per-stage states (`QUEUED`, `PROVIDER_ACCEPTED`, `DELIVERED_WHEN_CONFIRMED`,
  `ACKNOWLEDGED`, `DELIVERY_UNKNOWN`) and two explicit warning callouts: "depends on power",
  "depends on coverage and provider delivery".
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical chain preserving the state labels.
- **Authoring / MC-04 input.** Authored SVG; `MR-DIA-003`; icons `cellular`, `wifi`, `signal-strength`, `offline`,
  `stale`, `alert-caution`, `acknowledge`, `watch-monitoring`.
- **Rights / provenance.** Original authored; no delivery guarantee; no provider branding.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Conditional-awareness wording verbatim; "provider acceptance is not delivery"; "not a
  certified distress service".
- **Alt.** ES: «Cadena de un aviso: sensor, dispositivo, red móvil, nube, proveedor de notificaciones y aplicación,
  con sus estados.»
  EN: "Alert chain: input, device, mobile network, cloud, notification provider and app, with their states."
- **Visual acceptance.** States match README §20 exactly; the two failure callouts are as prominent as the happy
  path; no delivery guarantee implied.

#### WATCH-EDN-04 — WATCH editions comparison
- **Product / purpose.** `WATCH`; show Core vs Plus with the Plus condition visible.
- **Page section.** Future `/marea/watch`, editions section.
- **Subject / composition.** Two-column comparison: Core (`DEFINED`; monitored inputs, alerts, users, history
  window `OPEN`) vs Plus (`CONDITIONAL`; additional inputs, configurable rules, extended history, sharing — "only
  if validated and costed"); a note that Plus does not improve delivery speed, reliability or coverage; no price.
- **Format.** 16:9; master 1920×1080 authored; desktop two columns; mobile stacked cards with the conditional
  verdict first.
- **Authoring / MC-04 input.** Authored; lockup `MR-BRD-005` WATCH; icons `settings`, `service`, `watch-monitoring`.
- **Rights / provenance.** Original authored; no price; no availability.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Plus does not improve delivery"; conditional label.
- **Alt.** ES: «Comparación de WATCH Core y WATCH Plus con la condición de Plus señalada.»
  EN: "Comparison of WATCH Core and WATCH Plus with the Plus condition marked."
- **Visual acceptance.** Verdicts match D4; no reliability/speed implication; no figure.

#### WATCH-ECO-05 — WATCH ecosystem integration visual
- **Product / purpose.** `WATCH`; show inputs, read-only relationships and the no-control boundary.
- **Page section.** Future `/marea/watch`, ecosystem section.
- **Subject / composition.** Device at centre: inputs from SENSE modules, HUB, receive-only AIS (labelled
  receive-only); cloud to app; FLEET as a separate read-only consumer; a prominent barrier: "no helm, no steering,
  no switching" and "PILOT status is read-only".
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical with the barrier preserved.
- **Authoring / MC-04 input.** Authored SVG; `MR-DIA-003` and `MR-DIA-001` (receive-only AIS structure); icons
  `ais-receive-only`, `device-hub`, `fleet`, `watch-monitoring`, `sensor`, `offline`.
- **Rights / provenance.** Original authored; no compatibility claim; no AIS redistribution implied.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** "Receive-only AIS"; "no helm or steering function"; "FLEET under separate contract";
  navigation disclaimer.
- **Alt.** ES: «Diagrama del ecosistema WATCH con entradas de SENSE, HUB y AIS de solo escucha y ninguna función de
  gobierno.»
  EN: "WATCH ecosystem diagram with SENSE, HUB and receive-only AIS inputs and no steering function."
- **Visual acceptance.** Barrier unmistakable; AIS labelled receive-only; FLEET shown as separate product; arrows
  match D5 `I-11`–`I-15`.

#### WATCH-INS-06 — WATCH installation and activation sequence
- **Product / purpose.** `WATCH`; show that installation and activation include a coverage and identity step.
- **Page section.** Future `/marea/watch`, installation section.
- **Subject / composition.** Four panels: (1) mounting the device and fused power with a tidy route; (2) antenna /
  placement and a coverage check at the berth (a person holding a phone, no readable values); (3) device
  registration and ownership proof on a blank-screen phone; (4) a test alert acknowledged on a blank-screen phone.
  Authored labels in DOM.
- **Format.** 3:2 per panel; master 1600×1067 each; desktop four-up; mobile one panel per viewport.
- **Authoring / MC-04 input.** `COMPOSITE`; blocked briefs `MR-PRD-008`, `MR-PRD-012`, `MR-PRD-011`; record
  reference `MR-BRD-012`.
- **Rights / provenance.** Model release; no real coverage app or carrier logo; no fabricated signal values.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Safety labels.** "Coverage and power determine whether alerts arrive"; "installation quoted separately";
  conditional-awareness wording; CONCEPT label.
- **Alt.** ES: «Cuatro escenas: montaje y alimentación, comprobación de cobertura, registro del dispositivo y aviso
  de prueba.»
  EN: "Four scenes: mounting and power, coverage check, device registration and a test alert."
- **Visual acceptance.** No readable signal strength or coverage figures; no "guaranteed alert" styling; panels
  survive mobile crop; disclaimer in DOM.

#### WATCH-MOB-07 — WATCH mobile adaptation and crop guidance
- **Product / purpose.** `WATCH`; design hand-off, with mobile-first attention because most customers will arrive
  on a phone.
- **Page section.** Design hand-off only.
- **Subject / composition.** Authored crop specification for WATCH-HERO-01/USE-02/INS-06 at 390/768/1440 px plus a
  9:16 derivative guide for the shore-side scene; marks phone, yacht mast, safety-wording band and forbidden crops.
- **Format.** 16:9 sheet; 1920×1080 authored; mobile stacked viewport columns including 9:16.
- **Authoring / MC-04 input.** Authored specification; `NONE`.
- **Rights / provenance.** Internal only.
- **Classification / status.** `CONCEPT` (specification); authored.
- **Safety labels.** Internal: the conditional-awareness band is uncroppable at every breakpoint.
- **Alt.** ES: «Contrato de recorte móvil para las imágenes de MAREA WATCH, incluida la variante 9:16.»
  EN: "Mobile crop contract for MAREA WATCH imagery, including the 9:16 variant."
- **Visual acceptance.** 9:16 keeps phone + yacht relationship; safety band preserved; reviewed by page owner.

#### WATCH-TMB-08 — WATCH catalogue card
- **Product / purpose.** `WATCH`; future catalogue grid card.
- **Page section.** Future `/marea/productos` card grid.
- **Subject / composition.** 4:3 crop from `WATCH-HERO-01` with the WATCH lockup as DOM overlay and a
  "conditional awareness" label; no price, no availability.
- **Format.** 4:3; master 1024×768 (960/640/400); desktop fixed; mobile full-width.
- **Authoring / MC-04 input.** Crop derivative; lockup `MR-BRD-005` WATCH.
- **Rights / provenance.** Inherits master rights; blocked until master exists.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (derivative).
- **Safety labels.** "Alerts depend on power and coverage" label; CONCEPT label in DOM.
- **Alt.** ES: «Tarjeta de catálogo de MAREA WATCH con un teléfono en el pantalán y una embarcación fondeada.»
  EN: "MAREA WATCH catalogue card with a phone on a pontoon and a vessel at anchor."
- **Visual acceptance.** No notification text in pixels; no availability cue; ≤45 kB at 960 w.

#### WATCH-OG-09 — WATCH social / Open Graph card
- **Product / purpose.** `WATCH`; future launch/OG card after publication approval.
- **Page section.** Future OG metadata for `/marea/watch`.
- **Subject / composition.** Authored 1200×630: reversed WATCH lockup, the conditional-awareness line, and the
  status line "product definition published; not available".
- **Format.** exactly 1200×630; mobile crops keep both lines inside the safe area.
- **Authoring / MC-04 input.** Authored (`MR-BRD-008` method); `MR-BRD-003`, `MR-BRD-005` WATCH, brand OG sources.
- **Rights / provenance.** Original authored; proposed identity only.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Conditional-awareness wording mandatory; no guarantee, no distress-service claim.
- **Alt.** ES: «Tarjeta social de MAREA WATCH (1200×630) con el logotipo y una línea de aviso condicional.»
  EN: "MAREA WATCH social card (1200×630) with the lockup and a conditional-alert line."
- **Visual acceptance.** Exactly 1200×630; limitation line legible at preview size; no `®`/`™`.

#### WATCH-TEC-10 — WATCH technical information visual
- **Product / purpose.** `WATCH`; document the notification state model, timestamps and delivery uncertainty.
- **Page section.** Future `/marea/watch`, technical section and support documentation.
- **Subject / composition.** Authored state machine: `EVENT_OBSERVED` → `RULE_MATCHED` → `ALERT_CREATED` →
  `QUEUED` → `PROVIDER_ACCEPTED` → `DELIVERED_WHEN_CONFIRMED` → `ACKNOWLEDGED`, with terminal/exceptional states
  `EXPIRED`, `FAILED`, `DELIVERY_UNKNOWN` drawn as explicit branches; a timestamp legend showing that `eventTime`,
  `serverReceiptTime`, `alertCreationTime`, `providerAcceptanceTime`, `deliveryConfirmationTime` and
  `userAcknowledgementTime` are distinct.
- **Format.** 16:9; master vector 1920×1080; desktop no crop; mobile vertical with the exception branches retained.
- **Authoring / MC-04 input.** Authored SVG; `MR-DIA-003`; icons `alert-warning`, `alert-caution`, `acknowledge`,
  `stale`, `offline`, `no-data`, `update`, `cellular`.
- **Rights / provenance.** Original authored; no delivery guarantee; engineering review `PENDING`.
- **Classification / status.** `CONCEPT`; authored.
- **Safety labels.** Conditional-awareness wording; "provider acceptance is not delivery"; "not a certified
  distress service".
- **Alt.** ES: «Diagrama técnico del modelo de estados de un aviso WATCH, con las marcas de tiempo y los estados de
  entrega desconocida.»
  EN: "Technical diagram of the WATCH alert state model, with timestamps and delivery-unknown states."
- **Visual acceptance.** State names identical to README §20 (no synonyms); `DELIVERY_UNKNOWN` and `FAILED` shown
  as reachable; timestamps distinguished; no colour-only distinctions.

## 3. Real MC-04 reuse map (verified against the manifests)

Every id below was checked against `docs/marea/assets/manifest/MC-04-ASSETS.yaml` or `MC-04-BRIEFS.yaml` and the
underlying file confirmed present on disk on 2026-10-30. Reuse is **internal and provisional**: a design input, not
publication-ready identity and not evidence that a product exists.

| MC-04 id | Verified path | What it is | Permitted use in D9 | Restriction |
| --- | --- | --- | --- | --- |
| `MR-DIA-002` | `docs/marea/brand/assets/diagrams/marea-pilot-supervised-boundary.svg` | Illustrative PILOT supervised-steering boundary | Structural input for PILOT-HERO-01, OVR-03, ECO-05, INS-06, TEC-10 | Illustrative; engineering review `PENDING`; no autonomy implication |
| `MR-DIA-003` | `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg` | Illustrative ecosystem overview with honest boundaries | Structural input for SENSE-OVR-03/ECO-05/TEC-10, WATCH-OVR-03/ECO-05/TEC-10, PILOT-ECO-05 | Illustrative; no compatibility claim |
| `MR-DIA-001` | `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg` | Illustrative receive-only AIS chain | Structural input for WATCH-ECO-05 (AIS input) and any PILOT traffic context | Receive-only semantics mandatory |
| `MR-ICO-001` | `docs/marea/brand/assets/icons/ui/` — 57 authored 24×24 SVGs (e.g. `device-control-head.svg`, `sensor.svg`, `bilge.svg`, `tank-level.svg`, `battery.svg`, `temperature.svg`, `wind-sensor.svg`, `wind-true.svg`, `cellular.svg`, `wifi.svg`, `signal-strength.svg`, `watch-monitoring.svg`, `stale.svg`, `no-data.svg`, `offline.svg`, `unknown.svg`, `alert-warning.svg`, `alert-caution.svg`, `acknowledge.svg`, `calibration.svg`, `installation.svg`, `service.svg`, `support.svg`, `fleet.svg`, `settings.svg`, `update.svg`, `fuse-breaker.svg`, `power.svg`) | Authored marine-instrumentation icon set | Icons inside authored diagrams and mock-ups, always paired with visible text | Decorative in UI; never icon-only for critical meaning; never colour-only state distinction |
| `MR-BRD-005` | `docs/marea/brand/assets/logo/family/marea-family-pilot-lockup.svg`, `...-sense-lockup.svg`, `...-watch-lockup.svg` | Nine product-family lockups from one rule | Internal placeholder lockups in cards, OG drafts and diagrams | Proposed identity; no trademark symbols; not adopted; not published |
| `MR-BRD-001` / `MR-BRD-002` / `MR-BRD-003` | `docs/marea/brand/assets/logo/marea-lockup-primary.svg`, `-mono.svg`, `-reversed.svg` | Primary, mono and reversed brand lockups | Internal placeholder in documents and the three OG cards (reversed) | Proposed identity; print/packaging behaviour `NOT_TESTED` |
| `MR-BRD-008` | `docs/marea/brand/assets/social/og-marea-es-1200x630.jpg`, `og-marea-en-1200x630.jpg` (+ `.html` sources) | Per-locale brand OG cards, exactly 1200×630 | Method reference for the three product OG cards (authored HTML → deterministic render) | Brand-level card, not a product card |
| `MR-BRD-011` | `docs/marea/brand/assets/packaging/marea-packaging-dieline-pilot.svg`, `-sense.svg`, `-watch.svg` | Provisional packaging dielines with `PROPOSED` dimensions | Context reference only for "what ships"; never product imagery | Dimensions are placeholders with no BOM |
| `MR-BRD-012` | `docs/marea/brand/assets/print/marea-installer-commissioning-record-es.html`, `-en.html` (+ PDF evidence) | Blank installer commissioning/handover record | Reference for the PILOT-INS-06 and SENSE-INS-06 handover panels; never depicted as filled or certified | Not a certificate; no signatory, customer or vessel data exists |

**Blocked-brief reuse (all `BLOCKED_ON_IMAGE_GENERATION`, `files: []`, `generated_at: null` — no file exists).**
`MR-PRD-006` (PILOT supervised control head), `MR-PRD-007` (SENSE sensor systems), `MR-PRD-008` (WATCH shore-side
monitoring), `MR-PRD-011` (connector/gland macro), `MR-PRD-012` (refit installation), and — as device/lifestyle
context only — `MR-PRD-004` (NAV on device) and `MR-COR-003` (lifestyle direction). A future production milestone
must **extend** these briefs rather than create conflicting ones.

## 4. Mobile and layout contract

| Rule | Requirement |
| --- | --- |
| Text over imagery | Only authored DOM text over an approved `overlayScrim`; never text burned into a generated image (`ASSET-PIPELINE.md` §6.3) |
| Contrast | WCAG AA for DOM text on imagery (≥4.5:1 normal, ≥3:1 large); internal targets ≥5:1 metadata, ≥7:1 primary data; measured before publication |
| LCP hero | One hero per page, eager + `fetchpriority="high"`, AVIF/WebP ≤120 kB @1920 w target (hard limit 200 kB); card ≤45 kB @960 w; total images per page ≤400 kB target |
| CLS | Intrinsic `width`/`height` or CSS `aspect-ratio` on every image |
| OG | Exactly 1200×630 for any OG override |
| Breakpoints | ≤480 px, 768–1024 px, ≥1280 px, with art direction defined for each |

**PILOT page.** ≤480 px: 4:5 hero keeps E-stop + control head + manual-takeover lever; headline below the image.
768–1024 px: 3:2/16:9 with copy in negative space. ≥1280 px: 16:9 full-bleed. **Never crop:** the E-stop, the
manual-takeover lever, the supervised-steering disclaimer band, the CONCEPT label.

**SENSE page.** ≤480 px: 4:5 keeps sensor + mounting point together; installation panels stack one per viewport.
768–1024 px: 3:2 keeping the gland and calibration panel. ≥1280 px: 16:9. **Never crop:** the gland/cable route, the
calibration panel, the measurement-limitation band.

**WATCH page.** ≤480 px: 4:5 (and 9:16 where used) keeps phone + yacht relationship and the conditional-awareness
band; installation panels stack. 768–1024 px: 3:2/16:9 keeping device and antenna. ≥1280 px: 16:9. **Never crop:**
the conditional-awareness wording, the "not a certified distress service" line, the CONCEPT label.

**Forbidden at every breakpoint.** Stretching, letterboxing or condensing; text baked into an image; a generated
screen that looks like a real screenshot or a real alert; cropping that removes a safety label; any crop that
removes the CONCEPT label or a mandated disclaimer from the page.

## 5. Accessibility and content rules

1. **Alt text is descriptive and claim-free**, localised ES/EN, ≤125 characters where possible; no "image of", no
   keyword stuffing, no performance, compatibility, certification, accuracy or availability claim.
2. **Alt text for a blocked asset describes the intended scene**, never a file that exists.
3. **Captions are bilingual and visible**, carry the CONCEPT label where generated imagery is involved.
4. **Decorative images** use `alt=""` plus `decorative: true` only where the same information is in visible text;
   decorative icons are `aria-hidden="true"`.
5. **No text inside generated pixels.** Interface mocks are authored composites; a blank screen is a DOM slot.
6. **Contrast is measured, not assumed**; instrument-style values are never placed over photography.
7. **Disclaimers survive every crop** and live in the page DOM adjacent to the image.
8. **Icons are paired with visible text** where meaning is critical; state pairs are never distinguished by colour
   alone (`ICONOGRAPHY-SYSTEM.md`).
9. **ES/EN parity** of alt text and captions is a `FAIL` if missing, not a partial delivery.
10. **No third-party product imagery**, logo, certification mark, chart or provider mark in any rendered scene.

## 6. Coverage matrix

| Product | Requirements | `BLOCKED_ON_IMAGE_GENERATION` | MC-04 vector/brief reused as input | Authored new, no generation | Verified real-product assets |
| --- | ---: | ---: | ---: | ---: | ---: |
| MAREA PILOT | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA SENSE | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA WATCH | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| **Total** | **30** | **12** | **15** | **3** | **0** |

## 7. Generation briefs for a future authorised milestone (common rules)

- **Subject.** One clear subject per frame; the category is recognisable without text; a used recreational vessel in
  the Rías Baixas context, not a showroom.
- **Composition.** Crop-first for 16:9 hero, 3:2/4:3 section, 4:3 card; generous negative space for DOM copy; the
  subject never cut by the mobile crop.
- **Lighting / environment.** Soft overcast Atlantic daylight or low golden light; level horizon; no sun flare, no
  storm drama, no HDR or teal-orange grading.
- **Realism.** Plausible materials (matte anodised aluminium, white GRP, teak, stainless, matte plastics); plausible
  cable routing and glands; no glossy fantasy hardware, no RGB glow, no fake bevels.
- **Hard marine constraints.** No invented ports, model numbers, certification badges, IP ratings or standard-body
  marks; **no autonomous or remote-helm imagery in any PILOT scene (no hands-free wheel, no phone-steering)**; no
  transponder or transmission imagery in any AIS context; no fake alert UI on any screen.
- **Negatives.** No text in the image; no fake UI; no chart/ENC imagery; no third-party logos; no people without a
  signed model release; no identifiable customer or testimonial; no burned-in watermark; no substitute stock.
- **Information layer.** Headings, labels, numbers, UI and disclaimers are authored HTML/CSS/SVG composited in the
  page; the generated image supplies the scene and a blank slot only.
- **Provider.** `NONE_YET` until authorised; no model id may be written into a brief until verified on the official
  provider page and recorded (`ASSET-PIPELINE.md` §2.4).
- **Retry limit.** Three generations per brief, then stop and revise the brief or the provider choice; never loop
  against a charged endpoint.

## 8. Blocker register and exact unblock conditions

| Blocker | What it prevents | Exact external condition to unblock |
| --- | --- | --- |
| `X-03` / MC-01 B1–B3 | Any image generation at all | Written budget authorisation with a cost ceiling; provisioned account and credential in the approved secret store; verified commercial-use entitlement |
| `H-05` | Product photography of any PILOT/SENSE/WATCH unit and any real installation | A built and tested physical unit with recorded serial/provenance and a photographed installation — impossible at MC-06 |
| `H-07` / `H-11` | Accurate CGI of hardware (ports, enclosure, markings, sensor housings) | Frozen BOM, enclosure design and marking specification from engineering |
| `H-01` / `P-04` | Any PILOT artwork implying a performed sea trial or a certified steering behaviour | Bench, E-stop, isolation and sea-trial evidence at MC-13; until then the supervised labels stay |
| D-005 (identity adoption `BLOCKED`) | Publishing any visual carrying the MAREA identity | Professional originality/prior-art review, trademark clearance and Lead adoption decision |
| `X-01` | Public brand use in any asset | EUIPO/OEPM clearance and a written publication decision |
| B22 | Publishing generated imagery at all (synthetic-content disclosure form undecided) | A recorded legal decision on disclosure under the EU AI Act transparency provisions |
| B23 | Creating the first real file in `public/` | A Lead-approved write scope for `public/assets/marea/**` plus the page's own scope |
| B15 | Presenting technical visuals as verified | Engineering sign-off of diagram modes, states and labels; otherwise every technical visual stays labelled illustrative |

## 9. Controls and honest evidence statement

| Control | Requirement |
| --- | --- |
| Manifest first | No file ships without an `MR-<CATEGORY>-<NNN>` manifest entry with real bytes, dimensions, SHA-256, rights and alt/caption |
| No duplicates | One file per width × format; no parallel asset trees |
| Review separation | Author ≠ reviewer for visual and alt-text review; a second person checks ES/EN copy |
| Claims gate | Any image used next to a claim must satisfy `COMMERCIAL-BRAND-CLAIMS-POLICY.md`; images are never evidence of certification, testing or availability |
| Disclosure | The CONCEPT label and the mandated disclaimers are mandatory wherever a generated scene appears |
| Boundary evidence | Any PILOT asset must be reviewed against the no-autonomy/no-remote-control rule before production |

**Honest evidence statement.** This document was produced by reading the MC-04 asset and brief manifests, the
`ASSET-PIPELINE.md` contract, the photography/CGI art direction, D4/D5/D7 and the batch-01 asset requirements. Every
MC-04 id and path cited was verified against `MC-04-ASSETS.yaml` / `MC-04-BRIEFS.yaml` and the underlying files
confirmed present on disk on 2026-10-30. **No asset was produced, generated, downloaded or substituted. No PILOT,
SENSE or WATCH device exists; no photograph or CGI of one may be generated; no page exists.** All thirty
requirements are `CONCEPT`, and twelve of them are `BLOCKED_ON_IMAGE_GENERATION` while `X-03` remains open.

Related documents: `docs/marea/assets/ASSET-PIPELINE.md`; `docs/marea/assets/manifest/MC-04-ASSETS.yaml`,
`MC-04-BRIEFS.yaml`; `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`, `ILLUSTRATION-STANDARDS.md`,
`HARDWARE-CMF-DIRECTION.md`; `PRODUCT-ASSET-REQUIREMENTS.md` (batch-01 D9);
`docs/marea/products/README.md` §7, §22.
