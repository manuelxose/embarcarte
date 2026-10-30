# MAREA DISPLAY · MAREA WEATHER · MAREA FLEET — Product visual-asset requirements (MC-07 / D9)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D9 / PRODUCT-ASSET-REQUIREMENTS-BATCH-03 |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Date | 2026-10-30 |
| Owner function | Chief Product Officer (asset-requirements owner for batch 03) |
| Status | INTERNAL PLANNING DOCUMENT. No asset is produced, generated, authorised, downloaded or published by this milestone |
| Lifecycle context | Products `DEFINED` and `NOT_FOR_SALE`; brand `PROPOSED` / `NOT_GRANTED`; imagery `BLOCKED_ON_IMAGE_GENERATION` |
| Governing contract | `docs/marea/assets/ASSET-PIPELINE.md` (§4.2 registry ids, §4.3 manifest fields, §5 workflow, §7.1 classification, §8 budgets, §9 approvals), `docs/marea/products/README.md` §7 rule 9 and §22 |
| Binding inputs | `docs/marea/assets/manifest/MC-04-ASSETS.yaml`, `MC-04-BRIEFS.yaml` (reuse verified on 2026-10-30); batch-01/02 counterparts `PRODUCT-ASSET-REQUIREMENTS.md`, `PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md`; `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`; D4/D5/D7/D11 |
| Is not | An asset manifest, a generation authorisation, a licence, a page implementation, a price or an availability statement |

## 0. The generation gate — binding statement

- **No image-generation provider, credential or budget is authorised in this programme** (`X-03`; MC-01 B1–B3; MC-04 B16). No prompt has been sent and **no file exists for any requirement below**.
- **No DISPLAY unit exists.** There is no panel, enclosure, BOM, mounting design or tested unit (`H-04`, `H-05`, `H-06`, `H-11`); no display size is frozen (`SIZE_NOT_FROZEN`) and no hardware is selected (`HARDWARE_NOT_SELECTED`). **No photograph, CGI render or mock-up may be generated, downloaded or substituted** — no fake photography, no unlicensed stock, no third-party artwork, no placeholder file. A blocked brief with no file is the honest state; a fake file is a claims-policy failure.
- **No WEATHER forecast visual may imply a real observation, a real product screenshot or a validated forecast.** No provider tile, chart or model output is licensed for reproduction here (`D-04`, `D-07`).
- **No FLEET screen may imply a deployed multi-tenant service, a real customer, a real vessel or a measured SLA.** The SaaS has not been implemented (`P-09`), no organisation exists and no customer data was used.
- **Every photographic or CGI requirement is `BLOCKED_ON_IMAGE_GENERATION`** while `X-03` is open. No asset may be classified as a verified real-photograph or real-render asset until a tested unit, date, place and provenance exist (`ASSET-PIPELINE.md` §7.1).
- **All thirty requirements are `CONCEPT`.** None describes a manufactured device, a live service or a real installation, and none may be labelled, captioned or alt-texted as one.
- MC-04 vectors and lockups may be referenced **only as internal design inputs**, provisional and `PREFERRED_PROVISIONAL` at best; they are not adopted public identity (MC-04 delivery record; `X-01`, `X-02`).
- **Identifiers.** `DISPLAY-HERO-01`-style ids are MC-07 planning ids, not manifest registrations. A produced file must receive an immutable `MR-<CATEGORY>-<NNN>` registry id under `ASSET-PIPELINE.md` §4.2; the planning id then maps to it.
- **What would authorise generation** (all four, in writing, from the company owner): a budget authorisation with a cost ceiling; a provisioned provider account and credential in the approved secret store; verified commercial-use entitlement for CONCEPT imagery; and a Lead-approved write scope plus a recorded synthetic-content disclosure decision.

## 1. Principles

1. **Product clarity before beauty.** A DISPLAY visual shows a fixed, installed helm interface with an authored blank screen slot; it never depicts a fictional chart. A WEATHER visual shows provenance and time before showing a pretty seascape. A FLEET visual shows organisations, vessels and permission boundaries, not a generic dashboard wall.
2. **One asset, one idea.** Hero = context and confidence; overview = definition; editions = the honest difference; installation/onboarding = the real work; technical = the boundary.
3. **Edition difference is shown only where it exists**, and `CONDITIONAL` verdicts are visible on the edition asset (DISPLAY Large, WEATHER Pro, FLEET Enterprise as contracted tier).
4. **The ecosystem is shown as intended, not verified.** Every integration visual carries "illustrative — not a compatibility claim".
5. **Hardware reality is part of the product.** Mounting, power, cable entry, ingress and service access are the customer's real work and cost; no invented ports, ratings or certifications appear.
6. **Data reality is part of the product.** Forecast is never drawn as observation; a stale forecast, a missing variable and an unavailable source are first-class visual states. Tenant boundaries and permission-denied states are drawn, not hidden.
7. **Limitations are visible.** Unverified sunlight readability, conditional size, provider-dependent coverage, contracted-only SLA and read-only telemetry belong in the visual language, not only in a footer.
8. **The information layer is authored.** All headings, labels, numbers, timestamps, disclaimers and UI content are HTML/CSS/SVG (`ASSET-PIPELINE.md` §6.3). Generated pixels never contain readable product information.
9. **No visual implies certification, availability, autonomy, remote control or a product that does not exist.**
10. **Reuse before generate.** Fifteen requirements reuse an existing MC-04 vector or blocked brief as their structural input; three are new authored specifications needing no generation; twelve require generation and stay blocked.
11. **Concept labelling is mandatory.** Any generated scene carries the verbatim CONCEPT disclosure in the page DOM, plus the product limitation wording and the navigation disclaimer where position, depth, traffic, weather or vessel identity appears.

## 2. The asset register (30 requirements)

**Every asset records, in this order:** ID · product · purpose · consumer page section · subject · composition · aspect ratio · dimensions · desktop crop · mobile crop · internal MC-04 design references · vector-authored vs photo/CGI · rights · provenance · classification (`CONCEPT` only, never a verified real-product class) · ES alt · EN alt · required legal labels · generation requirement · visual acceptance criteria.

### 2.1 MAREA DISPLAY — ten requirements

#### DISPLAY-HERO-01 — MAREA DISPLAY product hero
- **Product / purpose.** `DISPLAY`; make "a dedicated installed helm display" recognisable in one frame. **Page section.** Future `/marea/display` and `/en/marea/display`, hero.
- **Subject / composition.** A matte marine display housing fixed on a used sailing-yacht helm pod, screen BLANK as a DOM slot; bezel, mounting bracket, cable entry and a plinth of the helm are in the same frame and their relationship is the subject. No chart, no digits, no invented brand marks on the bezel.
- **Format.** 16:9; master 2560×1440; desktop keeps the full pod, bracket and cable entry; mobile 4:5 keeps the screen and its mounting bracket together and may crop the pod edge only.
- **Authoring / MC-04 input.** `COMPOSITE` (photo scene + authored DOM). MC-04 inputs: blocked brief `MR-PRD-002` (dedicated marine display housing on a helm pod, screen blank for DOM composite), ecosystem diagram `MR-DIA-003` as structural reference, family lockup `MR-BRD-005` (display lockup), icons `device-display`, `brightness`, `power` from `MR-ICO-001`.
- **Rights / provenance.** No rights acquired; no provider; provenance to be recorded per manifest field. No third-party device, no certification badge, no readable specification.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (X-03).
- **Legal labels (DOM).** "Internal concept — no product exists; screen size, brightness and ingress protection are not established"; display-limitations line; navigation disclaimer if any instrument value appears; CONCEPT label.
- **Alt.** ES: «Pantalla marina dedicada instalada en un soporte de consola de timón, con la pantalla en blanco para la interfaz.» EN: "Dedicated marine display installed on a helm-pod mount, screen blank for the authored interface."
- **Generation requirement.** Photographic/CGI composite — `BLOCKED` while X-03 is open; no file exists.
- **Visual acceptance.** Bracket and cable entry readable at 390 px; no readable pixels; no certification or IP marking; horizon level; disclaimer present in DOM; ES/EN alt reviewed by a second person.

#### DISPLAY-USE-02 — MAREA DISPLAY in real use
- **Product / purpose.** `DISPLAY`; show a person reading a fixed helm display under way, not a tablet propped on a coaming. **Page section.** Future `/marea/display`, "at the helm" section.
- **Subject / composition.** Anonymous skipper from behind, one hand on the wheel, eyes toward the installed display at the helm; used coastal yacht in the Rías Baixas; daylight with honest reflections readable as glass glare only, never as a legibility claim. No faces, no testimonial framing.
- **Format.** 3:2; master 2400×1600; desktop 3:2 with copy-safe area right; mobile 1:1 keeping person, wheel and display in frame.
- **Authoring / MC-04 input.** `PHOTO`/`COMPOSITE`. MC-04 blocked briefs `MR-COR-001` (cruising yacht underway), `MR-PRD-002`, and lifestyle direction `MR-COR-003`; icons `device-display`.
- **Rights / provenance.** No rights acquired; no model release exists; no identifiable customer.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels (DOM).** "Illustrative scene — not a real installation"; "no readability, brightness or sunlight performance has been measured"; CONCEPT label.
- **Alt.** ES: «Patrón anónimo al timón leyendo una pantalla marina fija instalada en la consola, navegando de día.» EN: "Anonymous skipper at the helm reading a fixed marine display installed on the console, sailing in daylight."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** Screen remains blank for DOM; no implied glare-proof or sunlight-readable claim in caption; no faces; level horizon; disclaimer in DOM.

#### DISPLAY-OVR-03 — what MAREA DISPLAY is
- **Product / purpose.** `DISPLAY`; define the product in one glance: a device with base software, not a chart subscription. **Page section.** `/marea/display`, product overview.
- **Subject / composition.** Authored four-band SVG: (1) the installed device; (2) what it presents locally — instruments, AIS traffic, position, alarms, approved weather overlay; (3) what is NOT included — charts, HUB, AIS receiver, WEATHER entitlement, PILOT authority; (4) installation and service lifecycle. Each band has authored text; no icon-only meaning.
- **Format.** 16:9; master 1920×1080; desktop two columns; mobile four stacked bands in reading order.
- **Authoring / MC-04 input.** Authored SVG (no generation). Structural reference `MR-DIA-003`; icons `device-display`, `alert-warning`, `stale`, `no-data`, `installation`, `service` from `MR-ICO-001`; family lockup `MR-BRD-005`.
- **Rights / provenance.** Original authored vector; no third-party marks; no certification badges; no price.
- **Classification / status.** `CONCEPT`; authored vector (no blocked status — no generation needed).
- **Legal labels.** "Base software included; charts and data services licensed separately"; "no PILOT steering authority".
- **Alt.** ES: «Diagrama de cuatro bandas que define MAREA DISPLAY: dispositivo instalado, lo que muestra, lo que no incluye e instalación.» EN: "Four-band diagram defining MAREA DISPLAY: installed device, what it presents, what it excludes, installation."
- **Generation requirement.** None — authored vector.
- **Visual acceptance.** Every band has authored text; exclusions as prominent as inclusions; no icon-only meaning; no numeric specification.

#### DISPLAY-EDN-04 — DISPLAY-7 and DISPLAY Large (conditional)
- **Product / purpose.** `DISPLAY`; show the edition difference honestly, including that the large size is conditional. **Page section.** `/marea/display`, edition comparison.
- **Subject / composition.** Authored comparison card: DISPLAY 7 as the named working edition; DISPLAY Large marked `CONDITIONAL` / `SIZE_NOT_FROZEN`; rows for layout capability, installation space, concurrent data presentation, controls, support and installation option — never a screen-size-only comparison; explicit "no published size" row.
- **Format.** 16:9; master 1920×1080; desktop three columns in edition order; mobile stacked cards, conditional tag first.
- **Authoring / MC-04 input.** Authored SVG/HTML; family lockup `MR-BRD-005` (display); icons `settings`, `service`, `support`, `device-display`.
- **Rights / provenance.** Original authored; no price data; no availability cue; no measured dimension.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Screen sizes are not frozen; hardware is not selected"; "no price is approved".
- **Alt.** ES: «Comparativa de ediciones de MAREA DISPLAY con la edición grande marcada como condicional y sin tamaño publicado.» EN: "MAREA DISPLAY edition comparison with the large edition marked conditional and no published size."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Conditional status at least as prominent as the edition name; no number presented as a size; no price; readable at 390 px.

#### DISPLAY-ECO-05 — the display inside the MAREA ecosystem
- **Product / purpose.** `DISPLAY`; show where the device sits relative to HUB, NAV, AIS, SENSE, WEATHER, WATCH and PILOT status. **Page section.** `/marea/display`, ecosystem integrations.
- **Subject / composition.** Authored ecosystem map with status chips: HUB `CONDITIONAL`, NAV `PLANNED`, AIS `CONDITIONAL`, SENSE `CONDITIONAL`, WEATHER `CONDITIONAL`, PILOT `read-only status, never steering authority`, WATCH `UNKNOWN`; a visible legend explaining the status vocabulary.
- **Format.** 16:9; master 1920×1080; desktop full map; mobile hybrid: a vertical chain with status chips, PILOT boundary always visible.
- **Authoring / MC-04 input.** Authored SVG. Structural reference `MR-DIA-003` (ecosystem overview with honest boundaries); icons `device-hub`, `ais-receive-only`, `sensor`, `weather-forecast`, `watch-monitoring`, `device-control-head`; family lockups `MR-BRD-005`.
- **Rights / provenance.** Original authored; illustrative only; no compatibility claim.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Illustrative — not a compatibility claim"; "PILOT status only; the display never commands steering".
- **Alt.** ES: «Mapa ilustrativo del ecosistema MAREA con los estados de integración de MAREA DISPLAY y el límite de solo lectura de PILOT.» EN: "Illustrative MAREA ecosystem map with MAREA DISPLAY integration statuses and the PILOT read-only boundary."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Status chips match D5/D11 exactly; PILOT boundary band as prominent as the node; no `SUPPORTED` chip; legend present.

#### DISPLAY-INS-06 — installation on a refit vessel
- **Product / purpose.** `DISPLAY`; show the physical work and the decisions the installer makes. **Page section.** `/marea/display`, installation.
- **Subject / composition.** Refit reality: anonymous installer hands at a helm pod mid-installation — panel open, cable run exposed, gland and service loop visible; a second authored panel lists the six installation steps (siting and mounting, power and protection, data connection, configuration, sea-check of readouts, handover record). Photo supplies the scene; steps are DOM.
- **Format.** 3:2; master 2400×1600; desktop scene plus step column; mobile scene 4:5 with steps stacked below.
- **Authoring / MC-04 input.** `COMPOSITE`. MC-04 blocked briefs `MR-PRD-012` (refit installation) and `MR-PRD-011` (cable entry detail); print reference `MR-BRD-012` (blank commissioning record — never filled); packaging context `MR-BRD-011` (display dieline, `PROPOSED` dimensions only).
- **Rights / provenance.** No rights acquired; no installer brand; no certification; no real signatory or vessel data.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "Installation is carried out by an installer and is quoted separately"; "no installation has been validated"; CONCEPT label.
- **Alt.** ES: «Manos de instalador trabajando en la consola de timón, con el cableado y el prensaestopas visibles durante una reforma.» EN: "Installer hands working at a helm pod, cabling and cable gland visible during a refit."
- **Generation requirement.** Photographic/CGI scene — `BLOCKED`; no file exists.
- **Visual acceptance.** Cable entry plausible; no invented connector standard; step labels authored; no filled form; no certification mark.

#### DISPLAY-MOB-07 — compact and mobile presentation specification
- **Product / purpose.** `DISPLAY`; specify how the page and the authored interface mocks behave at 390, 768 and 1440 px. **Page section.** `/marea/display`, responsive/mobile section.
- **Subject / composition.** Authored specification sheet: three viewport columns of the same hero and overview at 390, 768 and 1440 px, with annotation rows for reading order, alert visibility, touch-target size and the never-crop list (mounting bracket, legal label, CONCEPT label). No generated pixels.
- **Format.** 16:9 sheet; master 1920×1080 authored; desktop n/a (specification); mobile stacked viewport columns.
- **Authoring / MC-04 input.** Authored specification; `NONE` required (no MC-04 input needed); measurement method from `ASSET-PIPELINE.md` §8 budgets.
- **Rights / provenance.** Original authored; no product claim.
- **Classification / status.** `CONCEPT` (specification); authored new in MC-07 — no rendered file.
- **Legal labels.** "Specification only; not a product screenshot"; "no measured display performance".
- **Alt.** ES: «Hoja de especificación de la presentación de MAREA DISPLAY en 390, 768 y 1440 píxeles.» EN: "Presentation specification sheet for MAREA DISPLAY at 390, 768 and 1440 pixels."
- **Generation requirement.** None — authored specification; no rendered file.
- **Visual acceptance.** Three viewports present; reading order annotated; never-crop list explicit; no invented device image.

#### DISPLAY-TMB-08 — catalogue thumbnail
- **Product / purpose.** `DISPLAY`; a square card for the future product index. **Page section.** Future product catalogue and related-products strip.
- **Subject / composition.** Square crop derivative of DISPLAY-HERO-01: display housing on the helm pod, screen blank, crown of the bezel readable. No text in the image; the name is DOM.
- **Format.** 1:1; master 1200×1200; desktop and mobile identical crop.
- **Authoring / MC-04 input.** `COMPOSITE` derivative of a blocked master (`MR-PRD-002`); icons `device-display`.
- **Rights / provenance.** None; derivative of an unrealisable master.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION` (derivative of a blocked master).
- **Legal labels.** CONCEPT label in the card DOM; "product does not exist".
- **Alt.** ES: «Miniatura de catálogo de MAREA DISPLAY con la pantalla en blanco sobre soporte de timón.» EN: "MAREA DISPLAY catalogue thumbnail with a blank screen on a helm mount."
- **Generation requirement.** Photographic derivative — `BLOCKED`; no file exists.
- **Visual acceptance.** Square crop keeps the full screen and bracket; no text burned in; no certification mark.

#### DISPLAY-OG-09 — social / Open Graph card
- **Product / purpose.** `DISPLAY`; a shareable internal card that cannot be mistaken for a launched product. **Page section.** Social/OG override for the future route.
- **Subject / composition.** Authored 1200×630 card: reversed MAREA DISPLAY lockup, status line "product definition complete — not for sale — internal only", a three-word boundary line ("device, not a chart subscription"), no price, no date, no availability, no certification.
- **Format.** Exactly 1200×630; desktop OG; mobile social crop keeps lockup and status line centred.
- **Authoring / MC-04 input.** Authored HTML/vector rendered deterministically (`MR-BRD-008` method); lockup `MR-BRD-005` (display) reversed over `MR-BRD-003` treatment; no product image.
- **Rights / provenance.** Original authored; proposed identity only; no trademark symbols.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Not for sale"; "internal"; "MAREA is a proposed brand".
- **Alt.** ES: «Tarjeta social de MAREA DISPLAY con la identidad propuesta y el aviso de producto interno no disponible.» EN: "MAREA DISPLAY social card with the proposed identity and the internal, not-for-sale notice."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Exactly 1200×630; status line legible at 50% scale; no product photograph; no price.

#### DISPLAY-TEC-10 — electrical and physical boundary diagram
- **Product / purpose.** `DISPLAY`; explain power, data, mounting and thermal boundaries without inventing specifications. **Page section.** `/marea/display`, technical/limits section.
- **Subject / composition.** Authored diagram: helm display node with four labelled interfaces — vessel DC power through protection, data connection to the onboard gateway, mounting/thermal envelope, and service/update path — each annotated "REQUIRED TARGET / NOT ESTABLISHED" where no measured value exists; alarm-visibility hierarchy shown as a second small panel.
- **Format.** 16:9; master 1920×1080; desktop full diagram; mobile stacked interface panels in the same order.
- **Authoring / MC-04 input.** Authored SVG; icons `power`, `fuse-breaker`, `ground`, `network-bus`, `connection`, `temperature`, `update`, `service` from `MR-ICO-001`; structural reference `MR-DIA-003`.
- **Rights / provenance.** Original authored; no protocol-conformance or certification claim.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Engineering targets, not measured specifications"; "no conformity assessment exists".
- **Alt.** ES: «Diagrama técnico de alimentación, datos, montaje y actualización de MAREA DISPLAY con objetivos pendientes de verificar.» EN: "Technical diagram of MAREA DISPLAY power, data, mounting and update paths with targets pending verification."
- **Generation requirement.** None — authored.
- **Visual acceptance.** No invented voltage, current, ingress or temperature number presented as fact; target labels visible; alarm hierarchy uses shape + text, not colour alone.

### 2.2 MAREA WEATHER — ten requirements

#### WEATHER-HERO-01 — MAREA WEATHER product hero
- **Product / purpose.** `WEATHER`; place the service in the pilot geography and in the decision, not in a fake forecast screen. **Page section.** Future `/marea/weather` and `/en/marea/weather`, hero.
- **Subject / composition.** Atlantic coastal seascape at the entrance to a Rías Baixas estuary, a single small cruising yacht under way, honest overcast light and visible swell; no chart imagery, no screen, no data overlay burned in.
- **Format.** 16:9; master 2560×1440; desktop full seascape with copy in negative sky; mobile 4:5 keeps yacht and horizon line.
- **Authoring / MC-04 input.** `PHOTO`. MC-04 blocked briefs `MR-COR-001` (cruising yacht, Rías Baixas) and `MR-COR-004` frame (a); icons `weather-forecast`.
- **Rights / provenance.** No rights acquired; no provider; no licensed dataset used.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "Forecasts are not guarantees"; "not an official warning service"; "data coverage depends on licensed providers"; CONCEPT label.
- **Alt.** ES: «Velero navegando en la entrada de una ría gallega con mar de fondo y luz atlántica cubierta.» EN: "Cruising yacht under way at the mouth of a Galician estuary with swell and soft Atlantic light."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** No overlay or fake chart; level horizon; no provider mark; disclaimer in DOM.

#### WEATHER-USE-02 — planning a passage with forecast context
- **Product / purpose.** `WEATHER`; show the real planning moment: sources, times and uncertainty being read before departure. **Page section.** `/marea/weather`, "planning" section.
- **Subject / composition.** Coastal chart table with paper notes, a hand tracing a route on a PLAIN unprinted planning surface, a tablet with a BLANK screen for the authored interface, tide table edge visible; anonymous; no readable place names or coordinates.
- **Format.** 3:2; master 2400×1600; desktop 3:2 with interface slot right; mobile 1:1 keeping hands, route trace and tablet slot.
- **Authoring / MC-04 input.** `PHOTO`/`COMPOSITE`. MC-04 blocked brief `MR-PRD-009` (chart table planning, plain unprinted surface); icons `weather-forecast`, `wind-true`.
- **Rights / provenance.** No rights acquired; no chart reproduction; no real route.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "Forecast context, not a routing guarantee"; "illustrative — not a real passage"; CONCEPT label.
- **Alt.** ES: «Mano trazando una ruta sobre una superficie de planificación sin imprimir, junto a una tableta con pantalla en blanco.» EN: "A hand tracing a route on a plain unprinted planning surface beside a tablet with a blank screen."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** No chart/ENC imagery; no readable coordinates; tablet blank; disclaimer adjacent to image.

#### WEATHER-OVR-03 — what a forecast card contains
- **Product / purpose.** `WEATHER`; define provenance-first forecast presentation. **Page section.** `/marea/weather`, product overview.
- **Subject / composition.** Authored card anatomy diagram: source and model name, variable and unit, model run time, valid time, receipt time, age/freshness badge, horizon, coverage note, attribution and licence line; a second small panel contrasts forecast vs observation vs historical vs derived vs user-entered vs unknown.
- **Format.** 16:9; master 1920×1080; desktop diagram plus data-type legend; mobile legend stacked and never truncated.
- **Authoring / MC-04 input.** Authored SVG; icons `weather-forecast`, `wind-true`, `stale`, `no-data`, `unknown`, `status-info`; structural reference `MR-DIA-003`.
- **Rights / provenance.** Original authored; no provider tile; no real model output.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Illustrative data model — no real forecast shown"; "forecast is not observation".
- **Alt.** ES: «Anatomía de una tarjeta de previsión con hora de ejecución del modelo, hora válida, antigüedad y atribución.» EN: "Anatomy of a forecast card with model run time, valid time, age and attribution."
- **Generation requirement.** None — authored.
- **Visual acceptance.** All seven time/provenance fields labelled; data-type distinction explicit; no invented provider numbers.

#### WEATHER-EDN-04 — Standard and Pro
- **Product / purpose.** `WEATHER`; show the outcome difference between editions without implying unlicensed data. **Page section.** `/marea/weather`, edition comparison.
- **Subject / composition.** Authored comparison card: WEATHER Standard (baseline forecast access, declared coverage and horizon) and WEATHER Pro (multi-model comparison, advanced layers, route-weather context, user-defined notifications), each row marked "requires provider entitlement" where applicable; a row "no double billing with NAV".
- **Format.** 16:9; master 1920×1080; desktop two columns plus boundary panel; mobile stacked cards.
- **Authoring / MC-04 input.** Authored SVG/HTML; family lockup `MR-BRD-005` (weather); icons `weather-forecast`, `settings`, `support`.
- **Rights / provenance.** Original authored; no price approved; no dataset guarantee.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Premium features depend on licensed provider rights"; "no price is approved".
- **Alt.** ES: «Comparativa de las ediciones Standard y Pro de MAREA WEATHER con la dependencia de licencias de proveedor.» EN: "MAREA WEATHER Standard and Pro comparison showing provider-licence dependency."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Entitlement dependency per row; no numeric price; no unlicensed-dataset promise.

#### WEATHER-ECO-05 — WEATHER inside the MAREA ecosystem and NAV entitlements
- **Product / purpose.** `WEATHER`; show standalone value and the NAV entitlement relationship. **Page section.** `/marea/weather`, ecosystem integrations.
- **Subject / composition.** Authored map: WEATHER standalone subscription as the centre; edges to NAV `PLANNED` with "shared entitlement, no double billing", DISPLAY `CONDITIONAL`, FLEET `CONDITIONAL` (B2B use only per provider agreement), HUB `CONDITIONAL`; a visible "provider rights gate" node between data and product.
- **Format.** 16:9; master 1920×1080; desktop full map; mobile vertical chain with the provider-rights gate always visible.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-003`; icons `cellular`, `wifi`, `weather-forecast`, `fleet`, `device-display`.
- **Rights / provenance.** Original authored; illustrative; no compatibility claim.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Illustrative — not a compatibility or data-rights claim"; "no redistribution without permission".
- **Alt.** ES: «Mapa ilustrativo de MAREA WEATHER con el intercambio de derechos con NAV y la puerta de derechos de proveedor.» EN: "Illustrative MAREA WEATHER map with NAV entitlement sharing and the provider-rights gate."
- **Generation requirement.** None — authored.
- **Visual acceptance.** No double-billing statement visible; provider gate not bypassable in the diagram; status chips match D5/D11.

#### WEATHER-INS-06 — subscription onboarding without fake screenshots
- **Product / purpose.** `WEATHER`; show what onboarding actually involves. **Page section.** `/marea/weather`, onboarding.
- **Subject / composition.** Authored step panel (account and area selection, saved locations, coverage confirmation, provider attribution, notification preferences, entitlement activation) over a photographic context of a quiet nav station at the end of a passage; no fake UI in the photograph.
- **Format.** 3:2; master 2400×1600; desktop scene plus step column; mobile scene 4:5 with steps stacked.
- **Authoring / MC-04 input.** `COMPOSITE`; MC-04 blocked brief `MR-PRD-009` / `MR-PRD-004` context; icons `weather-forecast`, `settings`, `cellular`.
- **Rights / provenance.** No rights acquired; no real account; no customer.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "No account service is operating"; "no subscription can be purchased"; CONCEPT label.
- **Alt.** ES: «Puesto de navegación al final de una travesía con un panel de pasos de alta de la suscripción de previsión.» EN: "Nav station at the end of a passage with an authored forecast-subscription onboarding step panel."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** Steps authored; no fake login; attribution step present; no price.

#### WEATHER-MOB-07 — compact forecast and staleness presentation
- **Product / purpose.** `WEATHER`; specify mobile presentation including stale, missing and outdated states. **Page section.** `/marea/weather`, mobile section.
- **Subject / composition.** Authored specification sheet at 390/768/1440 px: forecast card, model-comparison stub, a `STALE` state, a `MISSING_LICENSED_VARIABLE` state and an `ENTITLEMENT_EXPIRED` state; annotation rows for units, time zone display and tap targets.
- **Format.** 16:9 sheet; master 1920×1080 authored; desktop n/a (specification); mobile stacked viewport columns.
- **Authoring / MC-04 input.** Authored specification; `NONE`; state semantics from the WATCH alert-state precedent and `MR-ICO-001` icons `stale`, `no-data`, `unknown`, `offline`.
- **Rights / provenance.** Original authored; no real data.
- **Classification / status.** `CONCEPT` (specification); authored new in MC-07 — no rendered file.
- **Legal labels.** "Specification only; states are illustrative"; "expired entitlement never shows a current forecast".
- **Alt.** ES: «Hoja de especificación móvil de MAREA WEATHER con estados de previsión caducada, dato ausente y suscripción vencida.» EN: "MAREA WEATHER mobile specification sheet with stale forecast, missing data and expired entitlement states."
- **Generation requirement.** None — authored specification.
- **Visual acceptance.** Stale and missing states visually distinct from valid state by more than colour; time zone labelled; no fabricated values.

#### WEATHER-TMB-08 — catalogue thumbnail
- **Product / purpose.** `WEATHER`; square card for the future product index. **Page section.** Future catalogue and related-products strip.
- **Subject / composition.** Square derivative of WEATHER-HERO-01: yacht and horizon centred, no overlay, no text.
- **Format.** 1:1; master 1200×1200; desktop and mobile identical crop.
- **Authoring / MC-04 input.** `PHOTO` derivative of blocked master (`MR-COR-001`); icons `weather-forecast`.
- **Rights / provenance.** None; derivative of an unrealisable master.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** CONCEPT in card DOM; "no forecast shown".
- **Alt.** ES: «Miniatura de catálogo de MAREA WEATHER con el horizonte atlántico y un velero.» EN: "MAREA WEATHER catalogue thumbnail with the Atlantic horizon and a sailing yacht."
- **Generation requirement.** Photographic derivative — `BLOCKED`; no file exists.
- **Visual acceptance.** No overlay or fake data; no provider mark; square crop keeps yacht and horizon.

#### WEATHER-OG-09 — social / Open Graph card
- **Product / purpose.** `WEATHER`; shareable internal card with the provenance promise and the no-guarantee boundary. **Page section.** Social/OG override.
- **Subject / composition.** Authored 1200×630 card: reversed MAREA WEATHER lockup, three-word proposition ("sources, times, limits"), status line "internal definition — not for sale", no price, no forecast graphic, no certificate.
- **Format.** Exactly 1200×630; mobile social crop keeps lockup and status line.
- **Authoring / MC-04 input.** Authored HTML/vector (`MR-BRD-008` method); lockup `MR-BRD-005` (weather); no imagery.
- **Rights / provenance.** Original authored; proposed identity only.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Forecasts are not guarantees"; "internal, not for sale".
- **Alt.** ES: «Tarjeta social de MAREA WEATHER con la identidad propuesta y el aviso de definición interna.» EN: "MAREA WEATHER social card with the proposed identity and internal-definition notice."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Exactly 1200×630; no forecast imagery; no price; status line legible.

#### WEATHER-TEC-10 — provenance and freshness pipeline
- **Product / purpose.** `WEATHER`; explain how a value becomes a display. **Page section.** `/marea/weather`, technical section.
- **Subject / composition.** Authored left-to-right pipeline: provider dataset → licence/entitlement check → ingestion → timestamp normalisation (model run, valid, receipt, age) → cache/offline policy → presentation with attribution; each stage annotated with "rights required" and failure behaviour; a model-comparison inset shows disagreement without a fabricated consensus.
- **Format.** 16:9; master 1920×1080; desktop pipeline plus inset; mobile vertical stages.
- **Authoring / MC-04 input.** Authored SVG; icons `weather-forecast`, `cellular`, `stale`, `no-data`, `status-info`.
- **Rights / provenance.** Original authored; no provider logo, tile or model output.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Rights gate mandatory at every stage"; "no accuracy claim"; "no provider endorsement".
- **Alt.** ES: «Diagrama del proceso de procedencia y frescura de un dato meteorológico hasta su presentación con atribución.» EN: "Diagram of the weather data provenance and freshness pipeline through to attributed presentation."
- **Generation requirement.** None — authored.
- **Visual acceptance.** All four timestamps labelled; failure and licence-loss paths shown; no implied consensus forecast.

### 2.3 MAREA FLEET — ten requirements

#### FLEET-HERO-01 — MAREA FLEET product hero
- **Product / purpose.** `FLEET`; make the professional organisation context recognisable. **Page section.** Future `/marea/fleet` and `/en/marea/fleet`, hero.
- **Subject / composition.** Quiet operations office: two anonymous people at a desk, a monitor with a BLANK screen for the authored interface, a blank wall display, a window onto a working harbour; no vessel control equipment, no helm, no joystick, no remote-control implication.
- **Format.** 16:9; master 2560×1440; desktop keeps people, monitor and harbour window; mobile 4:5 keeps monitor and one person.
- **Authoring / MC-04 input.** `PHOTO`/`COMPOSITE`. MC-04 blocked brief `MR-PRD-010` (quiet operations office, blank screens); `MR-MKT-001` (working marina) as context; icons `fleet`, `support`.
- **Rights / provenance.** No rights acquired; no real organisation; no customer data; no faces.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "Illustrative — the FLEET service is not implemented"; "no vessel control"; CONCEPT label.
- **Alt.** ES: «Oficina de operaciones tranquila con dos personas ante un monitor de pantalla en blanco y un puerto al fondo.» EN: "Quiet operations office with two people at a monitor with a blank screen and a harbour beyond the window."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** No helm, no control device; screens blank; no readable data; disclaimer in DOM.

#### FLEET-USE-02 — fleet manager and maintenance manager working together
- **Product / purpose.** `FLEET`; show the multi-role organisational workflow, not one person watching a boat. **Page section.** `/marea/fleet`, "day to day" section.
- **Subject / composition.** Two anonymous staff — one at a screen, one with a printed blank job sheet — in a small charter office with keys, lifejacket and a marina view; screens BLANK; the relationship between roles is the subject.
- **Format.** 3:2; master 2400×1600; desktop 3:2 with interface slot right; mobile 1:1 keeping both people.
- **Authoring / MC-04 input.** `PHOTO`/`COMPOSITE`; MC-04 blocked briefs `MR-PRD-010`, `MR-MKT-001`; icons `fleet`, `service`, `installation`.
- **Rights / provenance.** No rights acquired; no model releases; no real business.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "Illustrative — no organisation, vessel or crew data shown"; CONCEPT label.
- **Alt.** ES: «Dos personas de una pequeña oficina náutica coordinando tareas: una ante la pantalla y otra con una hoja de trabajo en blanco.» EN: "Two people in a small marine office coordinating work, one at a blank screen and one with a blank job sheet."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** No readable vessel or person data; no control device; roles legible through composition, not text in image.

#### FLEET-OVR-03 — what the platform organises
- **Product / purpose.** `FLEET`; define the SaaS scope: organisation, vessels, people, maintenance, documents, telemetry, reporting. **Page section.** `/marea/fleet`, product overview.
- **Subject / composition.** Authored six-band SVG: (1) organisation and membership; (2) vessel registry and profiles; (3) maintenance tasks, work orders and history; (4) documents and expiry reminders; (5) read-only telemetry and operational alerts; (6) reporting, export and audit. Each band has authored text; the tenancy boundary is drawn as an outer frame.
- **Format.** 16:9; master 1920×1080; desktop two columns; mobile six stacked bands in order.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-003`; icons `fleet`, `service`, `support`, `watch-monitoring`, `settings`, `update`.
- **Rights / provenance.** Original authored; no customer data; no SLA claim.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Specification, not a deployed service"; "read-only telemetry; no vessel control".
- **Alt.** ES: «Diagrama de seis bandas con el alcance de MAREA FLEET: organización, flota, mantenimiento, documentos, telemetría de solo lectura e informes.» EN: "Six-band diagram of MAREA FLEET scope: organisation, fleet, maintenance, documents, read-only telemetry and reporting."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Tenant boundary frame present; no `SUPPORTED` telemetry claim; no SLA figure; readable at 390 px.

#### FLEET-EDN-04 — Start, Business and Enterprise
- **Product / purpose.** `FLEET`; show the organisational outcome difference and the honest boundary of each tier. **Page section.** `/marea/fleet`, edition comparison.
- **Subject / composition.** Authored three-column comparison: Start (vessel register, maintenance tasks, documents, basic reporting, small operators), Business (richer permissions, workflows, operational reporting, integrations, collaboration), Enterprise (contracted onboarding, contractual terms, auditing, service integration, negotiated SLA conditions that remain unagreed); each column ends with an explicit "not included: unlimited vessels/users/storage/API/uptime" line; Enterprise marked `CONTRACTED_TIER`.
- **Format.** 16:9; master 1920×1080; desktop three columns; mobile stacked cards with the exclusion line identical in all three.
- **Authoring / MC-04 input.** Authored SVG/HTML; family lockup `MR-BRD-005` (fleet); icons `fleet`, `settings`, `support`.
- **Rights / provenance.** Original authored; no price; no SLA; no customer logo.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "No SLA is established"; "no unlimited entitlement"; "Enterprise terms are not agreed".
- **Alt.** ES: «Comparativa de las ediciones Start, Business y Enterprise de MAREA FLEET con sus límites explícitos.» EN: "MAREA FLEET Start, Business and Enterprise comparison with explicit boundaries."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Exclusion line identical and visible; no price; Enterprise tagged contracted tier; no uptime number.

#### FLEET-ECO-05 — read-only telemetry inside the ecosystem
- **Product / purpose.** `FLEET`; show exactly which ecosystem data may enter and which authority never does. **Page section.** `/marea/fleet`, ecosystem integrations.
- **Subject / composition.** Authored map: WATCH `CONDITIONAL read-only`, HUB `CONDITIONAL read-only installation/health`, SENSE `UNKNOWN`, NAV `PLANNED with explicit permission`, WEATHER `CONDITIONAL per provider terms`, DISPLAY `UNKNOWN`, AIS `CONDITIONAL read-only`; PILOT node marked `BLOCKED for control — status only after review`; a strong horizontal band "no steering, no motor command, no remote control".
- **Format.** 16:9; master 1920×1080; desktop map; mobile vertical chain with the no-control band repeated at top and bottom.
- **Authoring / MC-04 input.** Authored SVG; structural reference `MR-DIA-003`; icons `watch-monitoring`, `device-hub`, `sensor`, `ais-receive-only`, `device-display`, `device-control-head`.
- **Rights / provenance.** Original authored; illustrative; no compatibility or rights claim.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Illustrative — not a compatibility claim"; "telemetry is read-only"; "PILOT is never controllable from FLEET".
- **Alt.** ES: «Mapa ilustrativo de la telemetría de solo lectura de MAREA FLEET y del límite absoluto de no control.» EN: "Illustrative map of MAREA FLEET read-only telemetry and the absolute no-control boundary."
- **Generation requirement.** None — authored.
- **Visual acceptance.** No-control band cannot be missed at 390 px; PILOT block explicit; statuses match D5/D11; cipher-like connector icons paired with text.

#### FLEET-INS-06 — organisation onboarding
- **Product / purpose.** `FLEET`; show the real onboarding work: organisation verification, vessel registry, invitations, role assignment. **Page section.** `/marea/fleet`, onboarding.
- **Subject / composition.** Authored six-step panel over a photographic context of a small harbour office desk with a blank monitor; steps: organisation created, ownership verified, first vessels added, users invited by role, vessel scopes assigned, audit log confirmed. Screens blank; no real form.
- **Format.** 3:2; master 2400×1600; desktop scene plus step column; mobile scene 4:5 with steps stacked.
- **Authoring / MC-04 input.** `COMPOSITE`; MC-04 blocked briefs `MR-PRD-010`, `MR-MKT-001`; icons `fleet`, `settings`, `support`, `installation`.
- **Rights / provenance.** No rights acquired; no real organisation; no real vessel register.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** "No onboarding service is operating"; "no customer or vessel data shown"; CONCEPT label.
- **Alt.** ES: «Escritorio de oficina portuaria con un monitor en blanco y un panel de pasos de alta de una organización en MAREA FLEET.» EN: "Harbour-office desk with a blank monitor and an authored MAREA FLEET organisation-onboarding step panel."
- **Generation requirement.** Photographic scene — `BLOCKED`; no file exists.
- **Visual acceptance.** Ownership verification step present; role assignment step present; no fake form values; no price.

#### FLEET-MOB-07 — compact fleet view and permission states
- **Product / purpose.** `FLEET`; specify compact presentation including permission-denied and stale-vessel states. **Page section.** `/marea/fleet`, mobile section.
- **Subject / composition.** Authored specification sheet at 390/768/1440 px: fleet overview, a vessel card with `LAST_SEEN_STALE` (never "online"), a `PERMISSION_DENIED` state, a pending-invitation state and a work-order card; annotation rows for tap targets, role visibility and the audit indicator.
- **Format.** 16:9 sheet; master 1920×1080 authored; desktop n/a (specification); mobile stacked viewport columns.
- **Authoring / MC-04 input.** Authored specification; `NONE`; icons `fleet`, `stale`, `offline`, `unknown`, `service`.
- **Rights / provenance.** Original authored; no real data.
- **Classification / status.** `CONCEPT` (specification); authored new in MC-07 — no rendered file.
- **Legal labels.** "Specification only"; "stale vessel is never shown as online"; "permission denial is not an error state".
- **Alt.** ES: «Hoja de especificación móvil de MAREA FLEET con vista de flota, embarcación sin datos recientes y permiso denegado.» EN: "MAREA FLEET mobile specification sheet with fleet view, stale vessel and permission-denied states."
- **Generation requirement.** None — authored specification.
- **Visual acceptance.** `LAST_SEEN_STALE` wording differs from online; denial state explains reason; no fabricated vessel names; role visibility annotated.

#### FLEET-TMB-08 — catalogue thumbnail
- **Product / purpose.** `FLEET`; square card for the future product index. **Page section.** Future catalogue and related-products strip.
- **Subject / composition.** Square derivative of FLEET-HERO-01: monitor and harbour window centred, screens blank, no text in image.
- **Format.** 1:1; master 1200×1200; desktop and mobile identical crop.
- **Authoring / MC-04 input.** `PHOTO` derivative of blocked master (`MR-PRD-010`); icons `fleet`.
- **Rights / provenance.** None; derivative of an unrealisable master.
- **Classification / status.** `CONCEPT`; `BLOCKED_ON_IMAGE_GENERATION`.
- **Legal labels.** CONCEPT in card DOM; "service not implemented".
- **Alt.** ES: «Miniatura de catálogo de MAREA FLEET con un monitor en blanco y un puerto al fondo.» EN: "MAREA FLEET catalogue thumbnail with a blank monitor and a harbour beyond."
- **Generation requirement.** Photographic derivative — `BLOCKED`; no file exists.
- **Visual acceptance.** No readable data; no customer logo; square crop keeps window and monitor.

#### FLEET-OG-09 — social / Open Graph card
- **Product / purpose.** `FLEET`; internal shareable card that cannot be read as a live B2B service. **Page section.** Social/OG override.
- **Subject / composition.** Authored 1200×630: reversed MAREA FLEET lockup, line "organisation, vessels, maintenance, audit", status line "internal definition — service not implemented — not for sale", no SLA, no customer logo, no price.
- **Format.** Exactly 1200×630; mobile social crop keeps lockup and status.
- **Authoring / MC-04 input.** Authored HTML/vector (`MR-BRD-008` method); lockup `MR-BRD-005` (fleet).
- **Rights / provenance.** Original authored; proposed identity only.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Not for sale"; "no SLA"; "no security certification".
- **Alt.** ES: «Tarjeta social de MAREA FLEET con la identidad propuesta y el aviso de servicio no implementado.» EN: "MAREA FLEET social card with the proposed identity and the not-implemented notice."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Exactly 1200×630; no SLA or certification mark; status line legible.

#### FLEET-TEC-10 — tenancy and authorization boundary
- **Product / purpose.** `FLEET`; explain server-side authorization and tenant isolation as a design, not a certification. **Page section.** `/marea/fleet`, security/technical section.
- **Subject / composition.** Authored diagram: browser client → API request with claimed tenant → server-side authentication → membership + role + resource ownership + vessel assignment checks → tenant-scoped query → audit record; a negative branch shows "client-supplied tenant id is not authorization" and "cross-tenant request rejected"; a second panel lists cache/search/export/background-job scoping; a footnote "no security certification exists".
- **Format.** 16:9; master 1920×1080; desktop full pipeline plus negative branch; mobile vertical chain with the negative branch still visible.
- **Authoring / MC-04 input.** Authored SVG; icons `connection`, `settings`, `status-info`, `offline`, `fleet`.
- **Rights / provenance.** Original authored; no certification badge, no third-party mark.
- **Classification / status.** `CONCEPT`; authored.
- **Legal labels.** "Design requirement, not a verified implementation"; "no security certification"; "no SLA".
- **Alt.** ES: «Diagrama del control de acceso por organización en MAREA FLEET con la comprobación en servidor y el rechazo entre organizaciones.» EN: "MAREA FLEET organisation access-control diagram with server-side checks and cross-organisation rejection."
- **Generation requirement.** None — authored.
- **Visual acceptance.** Negative branch visible; no certification badge; all six checks labelled; no false "certified" wording.

## 3. Real MC-04 reuse map (verified against the manifests and the working tree)

Every id below was checked against `docs/marea/assets/manifest/MC-04-ASSETS.yaml` / `MC-04-BRIEFS.yaml` and the underlying file confirmed present on disk on 2026-10-30. Reuse is **internal and provisional**: a design input, not publication-ready identity and not evidence that a product exists.

| MC-04 id | Verified path / status | What it is | Permitted use in D9 | Restriction |
| --- | --- | --- | --- | --- |
| `MR-PRD-002` | Brief in `MC-04-BRIEFS.yaml`, blocked, no file | Dedicated marine display housing on a helm pod, blank screen for DOM composite | Structural input for DISPLAY-HERO-01, USE-02, TMB-08 | Blocked brief; no device exists |
| `MR-PRD-009` | Blocked brief, no file | Chart-table planning with a plain unprinted surface and a blank tablet | Structural input for WEATHER-USE-02, INS-06 | Blocked brief; no chart may be shown |
| `MR-PRD-010` | Blocked brief, no file | Quiet operations office with blank monitor and blank wall display | Structural input for FLEET-HERO-01, USE-02, INS-06, TMB-08 | Blocked brief; no customer data |
| `MR-PRD-012` | Blocked brief, no file | Refit installation: installer hands, cable runs, panel off | Structural input for DISPLAY-INS-06 | Blocked brief; no validated installation |
| `MR-PRD-011` | Blocked brief, no file | Close detail of a tidy cable entry: gland, strain relief, service loop | Structural input for DISPLAY-INS-06 | Blocked brief; no invented connector standard |
| `MR-COR-001` | Blocked brief, no file | 10-14 m cruising sailing yacht underway in the Rías Baixas | Structural input for DISPLAY-USE-02, WEATHER-HERO-01, WEATHER-TMB-08 | Blocked brief; no real customer |
| `MR-COR-003` | Blocked brief, no file | Documentary lifestyle series of anonymous crew working the boat | Context direction for DISPLAY-USE-02 | Blocked brief; no model release |
| `MR-COR-004` | Blocked brief, frames (a)/(b) | Sailing and motorboat variants under way | Context direction for WEATHER-HERO-01 | Blocked brief |
| `MR-MKT-001` | Blocked brief, no file | Working marina/boatyard at scale, unbranded service van | Context direction for FLEET-HERO-01, USE-02, INS-06 | Blocked brief; no third-party marks |
| `MR-DIA-003` | `docs/marea/brand/assets/diagrams/marea-ecosystem-overview.svg` | Illustrative ecosystem overview with honest boundaries | Structural input for DISPLAY-OVR-03/ECO-05/TEC-10, WEATHER-OVR-03/ECO-05, FLEET-OVR-03/ECO-05 | Illustrative; no compatibility claim |
| `MR-BRD-005` | `docs/marea/brand/assets/logo/family/marea-family-{display,weather,fleet}-lockup.svg` | Nine product-family lockups from one rule | Internal placeholder lockups in cards, OG drafts and diagrams | Proposed identity; no trademark symbols; not adopted; not published |
| `MR-BRD-001` / `002` / `003` | `docs/marea/brand/assets/logo/marea-lockup-{primary,mono,reversed}.svg` | Primary, mono and reversed brand lockups | Internal placeholder in OG cards (reversed) | Proposed identity; print/packaging behaviour `NOT_TESTED` |
| `MR-BRD-008` | `docs/marea/brand/assets/social/og-marea-{es,en}-1200x630.jpg` (+ `.html` sources) | Per-locale brand OG cards, exactly 1200×630 | Method reference for the three product OG cards (authored HTML → deterministic render) | Brand-level card, not a product card |
| `MR-BRD-011` | `docs/marea/brand/assets/packaging/marea-packaging-dieline-display.svg` (and siblings) | Provisional packaging dielines with `PROPOSED` dimensions | Context reference only for "what ships"; never product imagery | Dimensions are placeholders with no BOM |
| `MR-BRD-012` | `docs/marea/brand/assets/print/marea-installer-commissioning-record-{es,en}.html` (+ PDF evidence) | Blank installer commissioning/handover record | Reference for the DISPLAY-INS-06 handover panel; never depicted as filled or certified | Not a certificate; no signatory, customer or vessel data exists |
| `MR-ICO-001` | `docs/marea/brand/assets/icons/ui/` — 57 authored 24×24 SVGs (includes `device-display`, `device-hub`, `weather-forecast`, `fleet`, `stale`, `no-data`, `offline`, `unknown`, `alert-warning`, `alert-caution`, `acknowledge`, `service`, `settings`, `update`, `power`, `fuse-breaker`, `network-bus`, `temperature`, `cellular`, `wifi`) | Authored marine-instrumentation icon set | Icons inside authored diagrams and mock-ups, always paired with visible text | Decorative in UI; never icon-only for critical meaning; never colour-only state distinction |

**Blocked-brief reuse (all `BLOCKED_ON_IMAGE_GENERATION`, `files: []`, `generated_at: null` — no file exists):**
`MR-PRD-002` (display housing), `MR-PRD-009` (planning table), `MR-PRD-010` (operations office), `MR-PRD-011`
(cable entry), `MR-PRD-012` (refit installation), `MR-COR-001`, `MR-COR-003`, `MR-COR-004`, `MR-MKT-001`.
A future production milestone must **extend** these briefs rather than create conflicting ones.

## 4. Mobile and layout contract

| Rule | Requirement |
| --- | --- |
| Text over imagery | Only authored DOM text over an approved `overlayScrim`; never text burned into a generated image (`ASSET-PIPELINE.md` §6.3) |
| Contrast | WCAG AA for DOM text on imagery (≥4.5:1 normal, ≥3:1 large); internal targets ≥5:1 metadata, ≥7:1 primary data; measured before publication |
| LCP hero | One hero per page, eager + `fetchpriority="high"`, AVIF/WebP ≤120 kB @1920 w target (hard limit 200 kB); card ≤45 kB @960 w; total images per page ≤400 kB target |
| CLS | Intrinsic `width`/`height` or CSS `aspect-ratio` on every image |
| OG | Exactly 1200×630 for any OG override |
| Breakpoints | ≤480 px, 768–1024 px, ≥1280 px, with art direction defined for each |

**DISPLAY page.** ≤480 px: 4:5 hero keeps screen and mounting bracket; headline below the image; the "size not frozen" note always visible. 768–1024 px: 3:2/16:9 with copy in negative space. ≥1280 px: 16:9 full-bleed. **Never crop:** the mounting bracket, the legal note band, the CONCEPT label.

**WEATHER page.** ≤480 px: 4:5 hero keeps yacht and horizon; provenance legend stacks but is never truncated. 768–1024 px: 3:2/16:9. ≥1280 px: 16:9. **Never crop:** the "forecasts are not guarantees" line, the provider-attribution line, the CONCEPT label.

**FLEET page.** ≤480 px: 4:5 hero keeps monitor and harbour window; permission and no-control bands stack visible. 768–1024 px: 3:2/16:9. ≥1280 px: 16:9. **Never crop:** the "no vessel control" band, the "not implemented / no SLA" line, the CONCEPT label.

**Forbidden at every breakpoint.** Stretching, letterboxing or condensing; text baked into an image; a generated screen that looks like a real screenshot, a real forecast or a real customer record; cropping that removes a legal label; any crop that removes the CONCEPT label or a mandated disclaimer from the page.

## 5. Accessibility and content rules

1. **Alt text is descriptive and claim-free**, localised ES/EN, ≤125 characters where possible; no "image of", no keyword stuffing, no performance, compatibility, certification, accuracy, availability or SLA claim.
2. **Alt text for a blocked asset describes the intended scene**, never a file that exists.
3. **Captions are bilingual and visible**, carry the CONCEPT label where generated imagery is involved.
4. **Decorative images** use `alt=""` plus `decorative: true` only where the same information is in visible text; decorative icons are `aria-hidden="true"`.
5. **No text inside generated pixels.** Interface mocks are authored composites; a blank screen is a DOM slot.
6. **Contrast is measured, not assumed**; instrument-style values are never placed over photography.
7. **Disclaimers survive every crop** and live in the page DOM adjacent to the image.
8. **Icons are paired with visible text** where meaning is critical; state pairs are never distinguished by colour alone (`ICONOGRAPHY-SYSTEM.md`).
9. **ES/EN parity** of alt text and captions is a `FAIL` if missing, not a partial delivery.
10. **No third-party product imagery**, logo, certification mark, chart, provider tile, vessel name or customer record in any rendered scene.

## 6. Coverage matrix and exact reconciliation

| Product | Requirements | `BLOCKED_ON_IMAGE_GENERATION` | MC-04 vector/brief reused as input | Authored new, no generation | Verified real-product assets |
| --- | ---: | ---: | ---: | ---: | ---: |
| MAREA DISPLAY | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA WEATHER | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| MAREA FLEET | 10 | 4 (HERO, USE, INS, TMB) | 5 (OVR, EDN, ECO, OG, TEC) | 1 (MOB) | 0 |
| **Total** | **30** | **12** | **15** | **3** | **0** |

### 6.1 Reconciled inventory statement (the batch-03 reporting pattern)

| Measure | Count | Note |
| --- | ---: | --- |
| Total planned assets | 30 | Ten per product, fixed planning ids |
| Existing or reused assets (internal MC-04 inputs) | 15 | OVR, EDN, ECO, OG, TEC per product; reused as structural input only, not as delivered product imagery |
| Newly produced assets | 3 | MOB per product: authored specification content in this document, **no rendered file** |
| Vector concepts (authored, non-photographic) | 18 | 15 reused + 3 authored; all `CONCEPT` |
| Blocked photographic/CGI assets | 12 | HERO, USE, INS, TMB per product; `X-03` open and no product/service exists |
| Missing assets | 0 | Every planned requirement is recorded here |
| Publicly approved assets | 0 | Publication is `BLOCKED`; trademark `NOT_GRANTED` |
| Verified real-product assets | 0 | No DISPLAY unit, no live WEATHER service, no FLEET deployment |

**Partition check:** 12 blocked + 15 reused + 3 authored = 30. The three counts partition the register exactly once; the vector-concept count (18) is a superset view of the 15 reused + 3 authored items and is not additive with the partition. No requirement is counted twice inside the partition and no category is omitted.

## 7. Generation briefs for a future authorised milestone (common rules)

- **Subject.** One clear subject per frame; the category is recognisable without text; a used recreational vessel or a real small operator in the Rías Baixas context, not a showroom.
- **Composition.** Crop-first for 16:9 hero, 3:2/4:3 section, 4:3 card; generous negative space for DOM copy; the subject never cut by the mobile crop.
- **Lighting / environment.** Soft overcast Atlantic daylight or low golden light; level horizon; no sun flare, no storm drama, no HDR or teal-orange grading.
- **Realism.** Plausible materials (matte anodised aluminium, white GRP, teak, stainless, matte plastics); plausible cable routing and glands; no glossy fantasy hardware, no RGB glow, no fake bevels.
- **Hard marine constraints.** No invented ports, model numbers, certification badges, IP ratings or standard-body marks; **no PILOT control imagery and no remote-helm imagery in any scene**; no chart/ENC imagery; no fake forecast screen; no fake customer record; no vessel name or owner name.
- **Negatives.** No text in the image; no fake UI; no third-party logos; no people without a signed model release; no identifiable customer, vessel or testimonial; no burned-in watermark; no substitute stock.
- **Information layer.** Headings, labels, timestamps, units, UI and disclaimers are authored HTML/CSS/SVG composited in the page; the generated image supplies the scene and a blank slot only.
- **Provider.** `NONE_YET` until authorised; no model id may be written into a brief until verified on the official provider page and recorded (`ASSET-PIPELINE.md` §2.4).
- **Retry limit.** Three generations per brief, then stop and revise the brief or the provider choice; never loop against a charged endpoint.

## 8. Blocker register and exact unblock conditions

| Blocker | What it prevents | Exact external condition to unblock |
| --- | --- | --- |
| `X-03` / MC-01 B1–B3 | Any image generation at all | Written budget authorisation with a cost ceiling; provisioned account and credential in the approved secret store; verified commercial-use entitlement |
| `H-05` / `H-04` | Product photography of any DISPLAY unit and any real helm installation | A built and tested physical unit with recorded serial/provenance and a photographed installation |
| `H-11` / `H-06` | Accurate CGI of the display housing, ports and environmental marking | Frozen BOM, enclosure design and marking specification from engineering |
| `D-04` / `D-07` | Any real forecast, observation or model visual | Executed provider licences permitting commercial display and reproduction |
| `D-05` | Weather overlay imagery on the DISPLAY visuals | Licensed overlay rights and a validated overlay implementation |
| `P-07` / `P-08` / `P-09` | Visuals implying a shipped display, a live weather service or a deployed fleet SaaS | Product engineering, provider agreements and a deployed, audited multi-tenant service |
| `X-01` / `X-02` | Publishing any visual carrying the MAREA identity | Trademark clearance and brand adoption decision |
| `X-07` | Any FLEET security visual presented as certification | Independent security assessment and certification decision |
| `X-05` | Any price shown inside an asset | Approved pricing with cost evidence |

## 9. Status statement

This document defines **30 visual-asset requirements for three products that do not exist commercially**. Fifteen reuse internal MC-04 design
inputs; three are authored specifications with no rendered file; twelve are blocked photographic/CGI requirements; no asset is
publicly approved. No image was generated, downloaded or published. No DISPLAY unit, WEATHER service or FLEET deployment was depicted as
real. MAREA remains a **proposed** brand (`NOT_GRANTED`), source rights remain `NOT_CLEARED`, the products remain `DEFINED` and
`NOT_FOR_SALE`, and the imagery gate remains `BLOCKED`.
