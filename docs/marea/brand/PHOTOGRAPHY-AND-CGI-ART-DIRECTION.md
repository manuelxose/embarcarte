# MAREA — Photography and CGI art direction + production briefs (D-12)

| Field | Value |
| --- | --- |
| Document ID | MC-04 / D-12 / PHOTOGRAPHY-AND-CGI-ART-DIRECTION |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Programme | EMBARCARTE / MAREA |
| Author role | IP/brand governance reviewer and brief owner (AI agent) |
| Date | 2026-10-30 |
| Revision | Rev. 1 |
| Authority for art direction | `MC-04-VISUAL-IDENTITY-BRIEF.md` §9.4 (this document implements it, it does not replace it) |
| Machine-readable companion | `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` |
| Machine-readable status | `IMAGE_GENERATION = BLOCKED` — provider `NONE_YET`, `files: []`, status `BLOCKED_ON_IMAGE_GENERATION` for every asset below |

## 0. External blocker statement (read first)

> **`IMAGE_GENERATION = BLOCKED`.**
>
> - **No image-generation provider is configured** in this programme (inherits MC-01 B1, MC-03 X-03).
> - **No credential exists** for any image service (inherits B2).
> - **No budget authorization exists** for any chargeable generation (inherits B3).
> - **No prompt has been sent and no image file has been produced** by MC-04. The assets below exist
>   **only as approved briefs plus manifest draft entries** (`provider: NONE_YET`, `files: []`,
>   `status: BLOCKED_ON_IMAGE_GENERATION`, `generated_at: null`).
> - **No placeholder, mock-up, stock substitute or stolen image has been created to "fill"** any of
>   these assets. A brief with no file is the honest state; a fake file would be a §12.5 failure.
> - Nothing below is a generation prompt that was executed. This is **art direction** and a
>   **production brief** for a future, separately authorised generation task.

**The exact authorization needed to unblock** (all four, in writing, from the company owner — not from
any agent):

1. **Written budget authorization** for a defined number of generations/assets and a stated cost ceiling
   (there is no approved budget today).
2. **A provisioned provider account and credential**, stored in the approved secret store (never in a
   repository file), with the provider's terms version recorded.
3. **Account entitlement verification** — the model/plan must actually permit the intended
   commercial-rights terms for CONCEPT marketing imagery (MC-01 B4 remains unverified).
4. **A Lead-approved write scope** for the first real files (`public/assets/marea/**`, B23) and a
   recorded synthetic-content disclosure decision (EU AI Act form is **undecided**, B22 — no answer is
   asserted here).

Until 1–4 exist, this document stays a brief. The programme can pass MC-04 with these assets truthfully
recorded as **BLOCKED** (`MC-04-VISUAL-IDENTITY-BRIEF.md` §10.7, §12.6).

## 1. Purpose, scope and what this document is not

**Purpose.** Give a future authorised production task, an art director, a photographer or a CGI artist
an unambiguous specification per asset, so that (a) no generated image can quietly invent a product,
installation, certification or sea trial, and (b) if the blocker is ever cleared, the first attempt is
already compliant with the claims policy and the honesty-labelling rules.

**Scope.** Every photoreal / CGI / photography asset MC-04 would need: corporate environment imagery,
product hardware conceptual renders, on-device software presentation, operational scenarios for all nine
product families, installation/technical service imagery, and trade/professional marketing. It also
records the vector asset that is *not* blocked (MR-PRD-003) so the registry is complete.

**What this document is not.** It is not evidence that any imagery exists; not a licence; not a
provider contract; not a representation that MAREA products exist, are certified, are available or have
been installed on any real vessel; and not a substitute for the professional originality/prior-art
check (`ORIGINALITY-AND-PRIOR-ART-CHECK.md`) or for trademark clearance.

## 2. Global art direction (applies to every brief)

Derived one-to-one from `MC-04-VISUAL-IDENTITY-BRIEF.md` §9.4. Where a per-brief field is silent, this
section governs.

| # | Directive | Binding rule |
| --- | --- | --- |
| G-1 | Market and light | Atlantic Galicia / Rías Baixas context; soft overcast daylight or low golden light; honest shadows; **no visible sun flare**; no coloured gels; no HDR look; no teal-orange grading |
| G-2 | Sea state | 8–18 kn wind, 0.3–1.2 m chop for hero imagery; level horizon unless deliberately composed; **no storm drama** to sell safety-adjacent products; no implied sea trial |
| G-3 | Materials | Matte, used, plausible: unpainted or anodised aluminium, white GRP, teak, marine ply, stainless, matte plastics. No glossy "hero" bevels, no chrome fantasy, no RGB gamer glow |
| G-4 | Composition | Crop-first for 16:9 hero, 4:3 card, 1:1 thumbnail; one idea per image; subject never cut by the mobile crop; generous negative space reserved for DOM copy |
| G-5 | Information layer | **No generated lettering.** Any UI, label, product name, price, spec or number is authored HTML/CSS/SVG and composited in the page. A render may contain a **blank** screen area for that composite. Any on-device text is out of the generated image |
| G-6 | People | Anonymous illustrative crew/installer only; no identifiable customer, no likeness without a release; never attach a quote to an anonymous figure; no testimonials |
| G-7 | Prohibited marks | No `®`/`™`, no CE/UKCA mark, no NMEA or other standard-body mark, no IP-rating badge, no certification shield, no third-party logo, no chart-provider mark, no provider watermark, no stock-photo identifier, no QR code |
| G-8 | Prohibited claims in pixels | No "certified", "waterproof", "marine-grade", "made in", "award-winning", no performance badge, no comparison with a named competitor, no "available now" |
| G-9 | Chart/navigation data | **No real chart reproduction.** Any map/chart-like surface is either blank for composite or a labelled illustrative fiction; no official ENC symbology, no real place-name data passed off as product output |
| G-10 | AIS semantics | Receive-only. Never depict a transponder, transmission, DSC or "see all traffic" implication |
| G-11 | PILOT semantics | Supervised steering only: E-stop and manual takeover must be visible or clearly implied; never autonomous, never remote helm control |
| G-12 | Post-processing | No added text, no fake HUD, no augmented-reality overlay, no artificial vignette, no compositing that invents an installation; colour grade limited to neutral correction |
| G-13 | No stock substitution | Never download unlicensed stock as a stand-in for MAREA hardware, an installation or a customer |
| G-14 | Classification | Every asset is `CONCEPT` until a real unit, date, place and provenance exist (`REAL_PRODUCT` evidence), which does not exist today. No exceptions |
| G-15 | Disclosure | The visible CONCEPT label lives **in the page**, not burned into pixels (unless a later legal decision requires on-image disclosure); the manifest carries the provenance record |
| G-16 | File/provenance | If generation is ever authorised: record provider, model, prompt, params, dates, seed, rights terms and disclosure status in the manifest; never claim C2PA/watermark provenance unless verified |

### 2.1 Brand colour constraints (honest state)

The MAREA colour system and tokens are owned by TypeColour (`docs/marea/brand/COLOUR-SYSTEM.md`); this
brief **does not invent hex values** and the token file does not exist at Rev. 1. Until it exists, every
brief constrains imagery to a **natural marine palette** — unpainted aluminium/stainless, white GRP,
teak/oiled wood, navy/charcoal, overcast grey-green water, paper white — with **no saturated brand
colour, no neon accent, no colour used to carry a state or meaning**. Text/UI colour is the DOM's
problem, not the image's.

### 2.2 On-page disclosure texts (verbatim, do not paraphrase)

| Locale | Text |
| --- | --- |
| ES | «Render conceptual — no representa un producto certificado / no es una fotografía de un producto real instalado.» |
| EN | "Concept render — not a photograph of a certified product and not a real installation." |

Additionally, for any image used on a surface that displays position, charts, traffic or weather, the
navigation disclaimer from `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 applies and is **not** replaced by the
CONCEPT label.

## 3. Required category coverage

| # | Required category | Brief ID(s) | Status |
| --- | --- | --- | --- |
| 1 | Corporate marine hero | **MR-COR-001** | BLOCKED_ON_IMAGE_GENERATION |
| 2 | Sailing / motorboat environments | **MR-COR-004** (two-frame set) | BLOCKED_ON_IMAGE_GENERATION |
| 3 | Refit / installation | **MR-PRD-012** (+ **MR-PRD-011** detail) | BLOCKED_ON_IMAGE_GENERATION |
| 4 | Connected instrumentation | **MR-COR-002**, **MR-PRD-002** | BLOCKED_ON_IMAGE_GENERATION |
| 5 | Product hardware conceptual renders | **MR-PRD-001**, **MR-PRD-006**, **MR-PRD-011** | BLOCKED_ON_IMAGE_GENERATION |
| 6 | Software on-device presentation | **MR-PRD-004** | BLOCKED_ON_IMAGE_GENERATION |
| 7 | AIS / navigation scenarios | **MR-PRD-005**, **MR-PRD-004** | BLOCKED_ON_IMAGE_GENERATION |
| 8 | Sensor systems | **MR-PRD-007** | BLOCKED_ON_IMAGE_GENERATION |
| 9 | Remote monitoring | **MR-PRD-008** | BLOCKED_ON_IMAGE_GENERATION |
| 10 | Fleet operations | **MR-PRD-010** | BLOCKED_ON_IMAGE_GENERATION |
| 11 | Installation / technical service | **MR-PRD-012**, **MR-PRD-011** | BLOCKED_ON_IMAGE_GENERATION |
| 12 | Trade / professional marketing | **MR-MKT-001** | BLOCKED_ON_IMAGE_GENERATION |
| — | Corporate/lifestyle photography direction | **MR-COR-003** | BLOCKED_ON_IMAGE_GENERATION |
| — | Vector product illustration set (not a generation asset) | **MR-PRD-003** | PRODUCIBLE_WITHOUT_GENERATION (different owner; recorded for completeness — see §9) |

## 4. Per-family coverage (all nine families)

| Family | Family-specific brief | Also appears in | Notes carried into the brief |
| --- | --- | --- | --- |
| **NAV** | **MR-PRD-004** | MR-COR-002, MR-MKT-001 | Software, on-device; screen content is DOM composite; navigation-aid disclaimer required; no chart reproduction |
| **HUB** | **MR-PRD-001** | MR-PRD-011, MR-COR-002 | Appliance; connectors/glands/cable runs plausible; no certification; no cable-brand logos |
| **AIS** | **MR-PRD-005** | MR-COR-002 | Receive-only; antenna/splitter plausible; never a transponder; no "see all traffic" |
| **PILOT** | **MR-PRD-006** | MR-COR-002 | Supervised control head; E-stop + manual takeover visible; never autonomous, never remote helm |
| **SENSE** | **MR-PRD-007** | MR-PRD-011, MR-PRD-008 | Bilge/tank/temperature sensor placement plausible; cables tidy; no invented IP rating |
| **WATCH** | **MR-PRD-008** | MR-MKT-001 | Shore-side alerts + onboard hardware; no "24/7 certified monitoring"; connectivity not guaranteed |
| **DISPLAY** | **MR-PRD-002** | MR-COR-002, MR-COR-004 | Dedicated hull; at-helm placement and sightlines plausible; blank screen for DOM composite; sunlight/night legibility **not claimed** |
| **WEATHER** | **MR-PRD-009** | MR-MKT-001 | Forecast is probabilistic; no "most accurate"; no real provider data shown; source/freshness stated in DOM |
| **FLEET** | **MR-PRD-010** | MR-MKT-001 | B2B office/operations desk; multi-vessel; no customer logos; no fleet-size claim; no invented dashboard numbers |

## 5. Asset briefs (20 mandatory fields each)

Field legend (mandatory, in this order):

`1` asset ID · `2` destination · `3` subject · `4` composition · `5` camera position · `6` lens
perspective · `7` lighting · `8` marine environment · `9` background · `10` brand colour constraints ·
`11` hardware realism requirements · `12` classification (CONCEPT vs REAL_PRODUCT) · `13` aspect ratio ·
`14` target pixel dimensions · `15` mobile crop · `16` negative constraints · `17` HTML copy safe areas ·
`18` caption + alt ES/EN · `19` usage-rights requirements · `20` actual provider status.

---

### 5.1 MR-COR-001 — Corporate marine hero ("one vessel, integrated systems")

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-COR-001` |
| 2 | Destination | Future corporate home `/` and `/en`; MAREA brand hub hero `/marea` / `/en/marea` |
| 3 | Subject | One cruising sailing yacht (10–14 m) underway in the Rías Baixas, anonymous helm; the vessel reads as *used and maintained*, systems integrated but not visible as a wall of gadgets |
| 4 | Composition | Wide establishing frame; vessel on the middle third; horizon in the upper third; calm, level; negative sky/water space for DOM headline |
| 5 | Camera position | 1.5–2.5 m above waterline, from a chase boat, slightly abeam of the stern quarter; handheld-restrained, no drone-top-down |
| 6 | Lens perspective | 35–50 mm equivalent; natural perspective, no fisheye, no compressed telephoto |
| 7 | Lighting | Soft overcast Atlantic daylight or low golden light behind cloud; flat, honest shadows |
| 8 | Marine environment | 8–18 kn, 0.3–1.2 m chop, overcast grey-green water, distant Galician coast soft in haze |
| 9 | Background | Real coastline suggestion only (granite, pine, low haze); no landmark building, no marina crowd, no identifiable third-party vessel |
| 10 | Brand colour constraints | Natural marine palette only (see §2.1); no saturated brand colour, no neon, no branded sail graphics |
| 11 | Hardware realism | Only plausible marine fittings; no invented MAREA hardware visible as a hero object; no fake certification plate, no readable instrument values |
| 12 | Classification | **CONCEPT** (not a real MAREA installation; no REAL_PRODUCT evidence exists) |
| 13 | Aspect ratio | 16:9 master; 4:3 and 1:1 derivatives |
| 14 | Target pixel dimensions | Master 1536×1024 or 2048 w class → AVIF/WebP 1920/1600/1280/960; LCP budget ≤ 120 kB @1920 |
| 15 | Mobile crop | Centre-left 4:5 safe crop must keep the vessel and horizon; no part of the subject inside the outer 12% |
| 16 | Negative constraints | Storm drama, lens flare, neon grading, fake HUD, fake certifications, visible competitor devices, readable invented UI, people's faces, third-party logos, watermarks, AI artefacts (warped rigging, extra hands, impossible geometry) |
| 17 | HTML copy safe areas | Top-left 45% width / top 30% height free of subject; bottom 18% free for caption/disclaimer band |
| 18 | Caption + alt | ES caption: «Navegación de crucero en las Rías Baixas — imagen conceptual.» · EN caption: "Cruising in the Rías Baixas — concept image." · ES alt: «Velero de crucero navegando con mar rizada bajo cielo cubierto, costa gallega al fondo.» · EN alt: "Cruising sailboat underway in light chop under an overcast sky, Galician coast in the distance." |
| 19 | Usage rights | None acquired. On production: written provider terms covering commercial use; no third-party vessel/person without a release; rights + disclosure recorded in manifest; EU AI Act disclosure decision pending (B22) |
| 20 | Provider status | **NONE_YET** — no provider, no credential, no budget; `files: []`; status `BLOCKED_ON_IMAGE_GENERATION` |

---

### 5.2 MR-COR-002 — Product-family / ecosystem hero

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-COR-002` |
| 2 | Destination | `/marea/productos`, `/en/marea/products` hero |
| 3 | Subject | Close, quiet arrangement at a helm station suggesting several systems working as one: a display housing, a gateway enclosure edge, a small sensor module, tidy cable loom — **no invented product geometry presented as final**, no logos |
| 4 | Composition | Tight three-quarter arrangement, shallow depth; strong negative upper area for DOM heading; family story told by proximity, not by labelled parts |
| 5 | Camera position | Approximately helmsman's eye height, slightly above the units, 40 cm–1 m working distance |
| 6 | Lens perspective | 50–85 mm equivalent; controlled background falloff, no macro distortion |
| 7 | Lighting | Overcast daylight through a sprayhood; one soft key, honest fill; no specular "product hero" hotspots |
| 8 | Marine environment | Below-decks/helm station of a cruising yacht; teak, matte panels, faint salt film |
| 9 | Background | Out-of-focus cockpit/companionway; no readable brand, no chart imagery, no person's face |
| 10 | Brand colour constraints | Neutral matte palette; no painted brand colour on hardware; no luminous accent |
| 11 | Hardware realism | Plausible enclosures, screws, gaskets, glands; no invented certification label; blank screen areas; no ports labelled with unverified protocols |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 16:9 master; 4:3 derivative |
| 14 | Target pixel dimensions | Master 1600 w → AVIF/WebP 1280/960; card ≤ 45 kB @960 |
| 15 | Mobile crop | Square (1:1) centre crop must retain the display housing edge and one cable run; nothing critical in outer 12% |
| 16 | Negative constraints | As §5.1 plus: no fake packaging, no product-name decals, no readable screen text, no implied certification |
| 17 | HTML copy safe areas | Upper 35% clear; right 30% clear for vertical DOM label on wide layouts |
| 18 | Caption + alt | ES caption: «Conjunto de sistemas a bordo — imagen conceptual.» · EN caption: "Systems together at the helm — concept image." · ES alt: «Primer plano de una consola de timón con una pantalla, una caja de conexiones y cableado ordenado.» · EN alt: "Close view of a helm console with a display, a gateway enclosure and tidy cabling." |
| 19 | Usage rights | As §5.1 |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.3 MR-COR-003 — Corporate / lifestyle photography direction (inshore Atlantic, anonymous crew, installed equipment)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-COR-003` |
| 2 | Destination | `/marea` story sections, `/profesionales` / `/en/professionals` |
| 3 | Subject | Documentary-style series: anonymous crew working the boat (hands, oilskins, boots), equipment in use, a skipper's glance — **story of competence, not of product glory** |
| 4 | Composition | Editorial reportage framing; imperfect but calm; one clear focal gesture per frame; no staged smiles |
| 5 | Camera position | Shoulder height, close to the action; occasional low angle at deck level; never a staged studio eye-line |
| 6 | Lens perspective | 28–50 mm equivalent; documentary naturalism, slight grain acceptable |
| 7 | Lighting | Available overcast light; no fill that flattens; no golden-hour advertising glow |
| 8 | Marine environment | Inshore Atlantic; 8–18 kn; spray and wet decks; honest weather |
| 9 | Background | Sea, rigging, marina edges; no identifiable third-party yacht name, no customer logo, no charter branding |
| 10 | Brand colour constraints | Neutral documentary palette; no coloured gels; no brand colour injected |
| 11 | Hardware realism | Real fittings and real wear; if MAREA hardware appears it must be plausible and **unlabelled** (no invented model numbers) |
| 12 | Classification | **CONCEPT** (illustrative staging, not a real customer or installation) |
| 13 | Aspect ratio | 4:3 and 3:2 series; 16:9 crop for story headers |
| 14 | Target pixel dimensions | Master 2048 w → AVIF/WebP 1600/1280/960 |
| 15 | Mobile crop | Each chosen frame must survive a 4:5 crop with the gesture intact |
| 16 | Negative constraints | Identifiable people without release, customer testimonials, fake sea-trial evidence, staged laughter, stock-photo look, brand logos on clothing, tattoo/text legibility |
| 17 | HTML copy safe areas | Frames selected with a calm quadrant for a pull-quote/DOM caption; never over a face |
| 18 | Caption + alt | ES caption: «Tripulación anónima en navegación costera — imagen conceptual.» · EN caption: "Anonymous crew on a coastal passage — concept image." · ES alt: «Manos con guantes de navegación ajustando una escota en cubierta mojada.» · EN alt: "Gloved hands adjusting a sheet on a wet deck." |
| 19 | Usage rights | No release for any person exists; production requires model releases for every identifiable person and property releases for vessels; rights recorded in manifest |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.4 MR-COR-004 — Sailing and motorboat environments (two-frame set)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-COR-004` (frames `-a` sailing, `-b` motorboat) |
| 2 | Destination | `/marea/embarcaciones` (proposed) and segment sections on product pages; `/en` equivalents |
| 3 | Subject | (a) a 10–12 m cruising sailboat under sail, reefed main, honest heel; (b) a 9–12 m motorboat at displacement/cruising speed with a dry, plausible cockpit |
| 4 | Composition | Matching pair: same horizon height, same scale of vessel, same light, so the two can sit side by side without one looking like an advert for the other |
| 5 | Camera position | Chase boat, 15–25 m abeam, 1.5–2.5 m above waterline |
| 6 | Lens perspective | 50–70 mm equivalent; no wide-angle drama |
| 7 | Lighting | Same overcast/late-afternoon light for both frames |
| 8 | Marine environment | 8–18 kn, 0.3–1.2 m chop, Atlantic inshore |
| 9 | Background | Soft coastline/haze; no harbour cranes, no landmark, no identifiable third-party vessel |
| 10 | Brand colour constraints | Natural palette; no coloured hull advertising graphics |
| 11 | Hardware realism | Correct rig geometry for frame (a); plausible radar/antenna/vents for (b); no invented product fitted as hero |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 3:2 each; 16:9 and 1:1 derivatives |
| 14 | Target pixel dimensions | 2048 w each → AVIF/WebP 1600/1280/960 |
| 15 | Mobile crop | 1:1 must keep the whole vessel silhouette; no crop through the mast |
| 16 | Negative constraints | Racing drama, broach/heel beyond plausible, spray explosion, drone top-down, identical weather mismatch between the pair, third-party logos, flags |
| 17 | HTML copy safe areas | Sky band top 25% clear; water band bottom 20% clear |
| 18 | Caption + alt | ES caption: «Velero y lancha de crucero en la misma condición de mar — imágenes conceptuales.» · EN caption: "Sailing yacht and motorboat in the same sea state — concept images." · ES alt (a): «Velero de crucero navegando de ceñida con mar rizada.» (b): «Lancha de crucero navegando con mar rizada y estela suave.» · EN alt (a): "Cruising sailboat sailing close-hauled in light chop." (b): "Cruising motorboat underway in light chop with a soft wake." |
| 19 | Usage rights | As §5.1; two frames, one provider job only if authorised |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.5 MR-PRD-001 — HUB appliance (installed / isolation, conceptual render)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-001` |
| 2 | Destination | `/marea/hub`, `/en/marea/hub` hero and detail; bundle pages |
| 3 | Subject | A small onboard data-gateway appliance: matte enclosure, mounting ears, labelled-by-DOM connector face, tidy cable loom into a gland — **generic plausible geometry only**, not a defined industrial design |
| 4 | Composition | Three-quarter view, appliance occupying the middle third; a service loop of cable visible; nothing floating, nothing levitating |
| 5 | Camera position | Standing/eye height above the mounting surface, 30–60 cm from the unit, 20–35° above horizontal |
| 6 | Lens perspective | 50–85 mm equivalent; product-render naturalism, mild perspective |
| 7 | Lighting | Overcast daylight through a locker hatch; soft key, honest shadow, matte highlights |
| 8 | Marine environment | Inside a dry equipment locker/bulkhead of a cruising yacht; paint, ply, faint salt; **not a lagoon showroom** |
| 9 | Background | Locker interior falloff; no other branded device, no chart imagery, no text |
| 10 | Brand colour constraints | Matte neutral enclosure (anodised/charcoal); no painted brand colour; no glowing LED |
| 11 | Hardware realism | Real fastener types, gaskets, strain relief, cable keying; connectors plausible but **unlabelled** (no unverified protocol names); no certification sticker; no fake IP rating |
| 12 | Classification | **CONCEPT** (no MAREA HUB hardware exists — `REAL_PRODUCT` is impossible today) |
| 13 | Aspect ratio | 4:3 primary; 16:9 and 1:1 derivatives |
| 14 | Target pixel dimensions | Master 1536×1024 → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 centre crop keeps enclosure + one cable run; no connector cut off mid-way in the shipped crop |
| 16 | Negative constraints | Fake bevels/gloss, invented accessory, IP-rating badge, certification mark, brand logo on the unit, readable invented specs, levitating unit, impossible cable routing, AI artefacts on screws/glands |
| 17 | HTML copy safe areas | Right 35% clear for spec list; bottom 15% clear for caption |
| 18 | Caption + alt | ES caption: «Unidad de pasarela de datos instalada — render conceptual, producto no disponible.» · EN caption: "Installed gateway unit — concept render, product not available." · ES alt: «Caja de conexiones mate atornillada a un mamparo interior, con cables recogidos hacia un pasaocables.» · EN alt: "Matte gateway enclosure bolted to an interior bulkhead, with cables tidily routed into a gland." |
| 19 | Usage rights | As §5.1; additionally no third-party enclosure design may be referenced or copied (no competitor trade dress) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.6 MR-PRD-002 — DISPLAY at helm (installed, conceptual render)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-002` |
| 2 | Destination | `/marea/display`, `/en/marea/display` hero and detail; helm-integration narrative |
| 3 | Subject | A dedicated marine display housing mounted at a helm pod, screen area **blank** for DOM composite; bezel matte, sun-cover clip plausible; no branding |
| 4 | Composition | 16:9 horizontal frame, display on the right third, helm wheel/console leading lines on the left; screen surface angled to avoid a mirror of the sky |
| 5 | Camera position | Seated/standing helm eye height, slightly right of centre, 60–90 cm from the unit |
| 6 | Lens perspective | 35–50 mm equivalent; sightlines plausible, no wide-angle distortion of the bezel |
| 7 | Lighting | Overcast daylight, no direct sun on the screen; night variant only if plausible (soft red/amber instrument light, no neon) |
| 8 | Marine environment | Cockpit helm station underway in light chop; sprayhood edge, teak, wet non-slip |
| 9 | Background | Out-of-focus sea/horizon; **no chart imagery**, no other brand's device, no readable instrument values |
| 10 | Brand colour constraints | Neutral bezel; no brand colour; no RGB glow; screen is blank |
| 11 | Hardware realism | Plausible bezel thickness, mounting bracket, cable entry with drip loop; no certification mark; no invented model badge; **no sun/water resistance claim implied by styling** |
| 12 | Classification | **CONCEPT** (no display hardware exists; sunlight and night legibility are **NOT_TESTED**, B11) |
| 13 | Aspect ratio | 16:9 primary; 4:3 and 1:1 derivatives |
| 14 | Target pixel dimensions | Master 1536×1024 → AVIF/WebP 1600/1280/960/640 |
| 15 | Mobile crop | 4:5 portrait crop keeps bezel + blank screen; the blank screen must remain a usable rectangular area for the DOM composite after crop |
| 16 | Negative constraints | Fake HUD/chart on screen, glossy glass with sky mirror, certification badge, "waterproof" styling cue, competitor device, readable numbers, dashboard chrome |
| 17 | HTML copy safe areas | Blank screen is the DOM slot (kept out of the 20% outer margin); left 30% clear for headline; bottom 15% caption band |
| 18 | Caption + alt | ES caption: «Pantalla dedicada en el puesto de timón — render conceptual; la interfaz es una composición web, no una captura real.» · EN caption: "Dedicated display at the helm — concept render; the interface is a web composite, not a screenshot." · ES alt: «Soporte de pantalla mate montado en una consola de timón, con la pantalla en blanco y el mar al fondo.» · EN alt: "Matte display housing mounted on a helm console with a blank screen and the sea behind." |
| 19 | Usage rights | As §5.1; no chart/licensed data in the image under any circumstance (D-01/D-02/D-04) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.7 MR-PRD-004 — NAV: software on-device presentation (NAV family)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-004` |
| 2 | Destination | `/marea/nav`, `/en/marea/nav`; software section; app-store-adjacent marketing (future) |
| 3 | Subject | A tablet/phone in a plausible cockpit mount, screen **blank** for the authored UI composite; the context communicates "used at the helm", not "device advert" |
| 4 | Composition | Device on the right, helm context on the left; screen plane parallel enough to composite convincingly; no hand covering the screen |
| 5 | Camera position | Helm eye height, 40–70 cm, slightly off-axis so the screen has a real viewing angle |
| 6 | Lens perspective | 35–50 mm equivalent; screen bezel straight, no barrel distortion |
| 7 | Lighting | Overcast daylight; screen face evenly lit, no sun glare, no window reflection of the horizon |
| 8 | Marine environment | Cockpit at anchor or underway in light chop; sprayhood, winches, teak |
| 9 | Background | Soft sea/coast; no chart, no other device screen, no readable text |
| 10 | Brand colour constraints | Neutral context; no brand colour; no saturated UI colour in image (UI comes from tokens) |
| 11 | Hardware realism | Plausible mount, cable, case; no invented branding on the device; **no implied water resistance** |
| 12 | Classification | **CONCEPT**; on-screen UI is `DIAGRAM`/DOM, not generated |
| 13 | Aspect ratio | 4:3 primary; 16:9 and 9:16 derivatives for social |
| 14 | Target pixel dimensions | Master 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 9:16 crop must keep the full blank screen rectangle; no screen edge cut |
| 16 | Negative constraints | Generated UI, fake chart, fake waypoint names, readable numbers, GPS/app-store badges, "works anywhere" styling, third-party device logos, AI-warped fingers |
| 17 | HTML copy safe areas | Blank screen = DOM slot; bottom 20% free for disclaimer; left 25% free for headline |
| 18 | Caption + alt | ES caption: «MAREA NAV en uso a bordo — render conceptual; la interfaz mostrada es una composición HTML, no una captura del producto.» · EN caption: "MAREA NAV in use aboard — concept render; the interface shown is an HTML composite, not a product screenshot." · ES alt: «Tableta montada en el puesto de timón de un velero, con la pantalla en blanco y el mar al fondo.» · EN alt: "Tablet mounted at a sailboat helm with a blank screen and the sea behind." |
| 19 | Usage rights | As §5.1; **no licensed chart data** may appear; the on-device UI copy must carry the navigation-aid disclaimer (claims policy §9) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.8 MR-PRD-005 — AIS receive-only traffic-awareness scenario

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-005` |
| 2 | Destination | `/marea/ais`, `/en/marea/ais`; support documentation illustrations |
| 3 | Subject | A masthead VHF/AIS antenna and a receive-only receiver box with a splitter, installed plausibly; optionally a hand on a chart table — **never a transponder**, never a transmission visual |
| 4 | Composition | Two-part frame: antenna top-left in soft focus, receiver/splitter in focus bottom-right; readable installation logic (cable down the mast, gland entry) |
| 5 | Camera position | Deck level looking up at the masthead (low angle, 20–30 m) for the antenna; close 30–50 cm for the receiver |
| 6 | Lens perspective | 24–35 mm for the mast context, 50–85 mm for the receiver; no exaggerated wide angle |
| 7 | Lighting | Overcast daylight; antenna against grey sky; no sun burst behind the mast |
| 8 | Marine environment | Sailing yacht mast/deck; light chop; salt film on stainless |
| 9 | Background | Sky and rigging; no other vessel close enough to imply "traffic shown", no land clutter |
| 10 | Brand colour constraints | Neutral marine palette; no brand colour on hardware |
| 11 | Hardware realism | Plausible antenna base, coax, splitter, labelled-by-DOM ports; no certification sticker; **no transmit indicator**; no fake range graphic |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 4:3 primary; 16:9 derivative |
| 14 | Target pixel dimensions | Master 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 crop keeps receiver + one connector; antenna may crop to a partial mast but must not look like a broken mast |
| 16 | Negative constraints | Transponder imagery, transmission waves/icons, radar-style HUD, "sees all traffic" implication, range circles over real geography, certification marks, competitor hardware |
| 17 | HTML copy safe areas | Top 25% sky clear for headline; right 35% clear for the receive-only statement |
| 18 | Caption + alt | ES caption: «Antena y receptor AIS de solo escucha — render conceptual.» · EN caption: "AIS receive-only antenna and receiver — concept render." · ES alt: «Antena de mástil y receptor AIS con cables coaxiales recogidos hacia un pasaocables.» · EN alt: "Masthead antenna and AIS receiver with coaxial cables routed into a gland." |
| 19 | Usage rights | As §5.1; the AIS receive-only disclaimer (claims policy §9) must accompany any page use |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.9 MR-PRD-006 — PILOT supervised steering control head

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-006` |
| 2 | Destination | `/marea/pilot`, `/en/marea/pilot`; installer and safety briefing material |
| 3 | Subject | A compact control head at a helm with a **physically distinct E-stop** and a clear manual-takeover affordance (clutch/lever); supervisory intent visible without labels |
| 4 | Composition | Control head on the right, E-stop and manual lever on the left in the same frame — the **relationship** is the subject, not the device beauty |
| 5 | Camera position | Helm eye height / slightly above, 50–80 cm, angled to show both controls |
| 6 | Lens perspective | 35–50 mm equivalent; both controls legible as shapes, no macro |
| 7 | Lighting | Overcast daylight; E-stop stands out by **shape and position**, not by colour alone |
| 8 | Marine environment | Cockpit underway, light chop; wet non-slip, teak |
| 9 | Background | Soft sea/horizon; no chart, no other brand's autopilot head, no readable labels |
| 10 | Brand colour constraints | Matte neutral; E-stop may be the single saturated element permitted by shape convention, but **colour must not be the only carrier of meaning** (the shape is distinct) |
| 11 | Hardware realism | Plausible knob/button count, no invented certification; no fake model number; **no remote/wireless handset** implying remote helm |
| 12 | Classification | **CONCEPT** (PILOT is supervised-only; safety gate BLOCKED, H-01/P-04) |
| 13 | Aspect ratio | 4:3 primary; 16:9 derivative |
| 14 | Target pixel dimensions | Master 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 crop must retain both the E-stop and the control head |
| 16 | Negative constraints | Autonomous/self-steering implication, remote-control imagery, hands-off-wheel celebration, certification badge, unverified protocol labels, "autopilot" claims in pixels, competitor control heads |
| 17 | HTML copy safe areas | Bottom 25% clear for the supervised-steering disclaimer; top 20% clear for headline |
| 18 | Caption + alt | ES caption: «Puesto de control de gobierno asistido, con paro de emergencia y toma manual — render conceptual.» · EN caption: "Supervised steering control head with emergency stop and manual takeover — concept render." · ES alt: «Cabezal de control junto a un paro de emergencia rojo y una palanca de toma manual en una consola de timón.» · EN alt: "Control head beside a red emergency stop and a manual takeover lever on a helm console." |
| 19 | Usage rights | As §5.1; the PILOT supervised-steering disclaimer (claims policy §9) must appear on any page using the image; safety review of the brief required before production |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.10 MR-PRD-007 — SENSE sensor systems

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-007` |
| 2 | Destination | `/marea/sense`, `/en/marea/sense`; monitoring sections of product pages |
| 3 | Subject | Two plausible sensor installations in one frame set: a bilge float/sensor on a mounting bracket and a tank-level sender on a plastic tank; cable runs tidy and labelled-by-DOM |
| 4 | Composition | Frame A: bilge, low angle, water film visible; Frame B: tank sender, three-quarter; both share light and palette |
| 5 | Camera position | Frame A: 20–30 cm above the bilge floor; Frame B: 40–60 cm from the tank |
| 6 | Lens perspective | 35–50 mm equivalent; close but not macro; no fisheye in a confined space |
| 7 | Lighting | Available light in the bilge (dim, honest) and overcast daylight for the tank compartment; no studio fill |
| 8 | Marine environment | Below-decks compartments of a used cruising yacht: paint, GRP, faint grime, plausible |
| 9 | Background | Compartment walls/pipe runs; no other branded device; no readable text |
| 10 | Brand colour constraints | Neutral matte; no brand colour; no glowing indicator |
| 11 | Hardware realism | Correct sensor housing types; cable glands; no invented IP rating; no certification sticker; probes plausible, not sci-fi |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 4:3 each; 1:1 derivative |
| 14 | Target pixel dimensions | 1600 w each → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 must show the sensor **and** its mounting point together |
| 16 | Negative constraints | Dirty-horror bilge, flooding drama, fake alarm light, certification marks, invented labels, wires disappearing into nowhere, AI artefacts on clamps |
| 17 | HTML copy safe areas | Right 35% clear for the sensor list; bottom 15% caption band |
| 18 | Caption + alt | ES caption: «Sensores de sentina y de nivel de tanque instalados — render conceptual.» · EN caption: "Installed bilge and tank-level sensors — concept render." · ES alt: «Sensor de sentina atornillado a un soporte y emisor de nivel en un depósito de plástico, con cables recogidos.» · EN alt: "Bilge sensor bolted to a bracket and a level sender on a plastic tank, with cables tidily routed." |
| 19 | Usage rights | As §5.1 |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.11 MR-PRD-008 — WATCH remote monitoring

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-008` |
| 2 | Destination | `/marea/watch`, `/en/marea/watch`; PROTECT bundle page |
| 3 | Subject | The **shore-side moment**: a person (anonymous, out of focus) on a quay or terrace checking a phone whose screen is blank for the DOM composite, with a moored/anchored yacht soft in the background — the alert arrives, the boat is unattended |
| 4 | Composition | Phone in the near third (hand only), yacht in the far third, weather honest; the gap between them is the story |
| 5 | Camera position | Chest height behind/beside the person, 40–60 cm from the phone; over-the-shoulder, no face |
| 6 | Lens perspective | 35–50 mm equivalent; background softly defocused but recognisable as a marina/anchorage |
| 7 | Lighting | Overcast/early evening; screen face lit neutrally for a later composite; no sun flare |
| 8 | Marine environment | Sheltered marina/anchorage, 8–15 kn, choppy grey water |
| 9 | Background | Other moored boats (no logos, no names), quay, grey sky; no identifiable person |
| 10 | Brand colour constraints | Neutral; no brand colour; no notification glow colour that would read as an alert state |
| 11 | Hardware realism | Ordinary consumer phone in a plain case, no brand logo visible; the **WATCH hardware** is not shown as a hero (it is a service + optional kit) |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 4:3 primary; 16:9 and 9:16 derivatives |
| 14 | Target pixel dimensions | 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 9:16 keeps phone + yacht relationship; no face enters the crop |
| 16 | Negative constraints | Readable notification text, fake alarm UI, phone brand logo, "24/7 certified monitoring" implication, calm-bitcoin-bro imagery, identifiable people, third-party boat names |
| 17 | HTML copy safe areas | Blank phone screen = DOM slot; top-left 40% clear for headline |
| 18 | Caption + alt | ES caption: «Aviso en tierra con la embarcación fondeada — render conceptual; la pantalla mostrada es una composición.» · EN caption: "Shore-side alert with the vessel at anchor — concept render; the screen shown is a composite." · ES alt: «Mano sosteniendo un teléfono con la pantalla en blanco, con un velero fondeado desenfocado al fondo.» · EN alt: "Hand holding a phone with a blank screen, a sailboat at anchor softly out of focus behind." |
| 19 | Usage rights | As §5.1; model release required for any visible person; connectivity claims prohibited — WATCH availability is a service dependency (H-12) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.12 MR-PRD-009 — WEATHER forecast planning

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-009` |
| 2 | Destination | `/marea/weather`, `/en/marea/weather`; route-planning narrative |
| 3 | Subject | A chart table with paper notes, a tablet face-down/blank, a hand tracing a route line on a **plain** (unprinted) planning surface — planning, not a forecast screenshot |
| 4 | Composition | Table from above at 30–40°, hands and objects; a blank screen area for the DOM forecast panel; no readable numbers |
| 5 | Camera position | 60–80 cm above the table, angled; overhead-ish but not top-down flat |
| 6 | Lens perspective | 35–50 mm equivalent; natural table perspective |
| 7 | Lighting | Warm cabin lamp + overcast daylight from a companionway; honest mixed light, no colour cast |
| 8 | Marine environment | Cabin of a cruising yacht at anchor; teak table, charts rolled but **unreadable/blank** |
| 9 | Background | Cabin joinery, soft; no chart publisher mark, no third-party brand |
| 10 | Brand colour constraints | Neutral; the only saturated element may be natural (wood/paper); no brand colour |
| 11 | Hardware realism | Plausible instruments, pencils, dividers; blank screens; **no licensed chart imagery** (D-01/D-04) |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 4:3 primary; 16:9 derivative |
| 14 | Target pixel dimensions | 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 keeps hands + blank device area; route line may run out of frame naturally |
| 16 | Negative constraints | Weather-map screenshots, hurricane drama, "most accurate" badges, real chart reproduction, readable dates/wind numbers, provider logos, AI-mangled hands |
| 17 | HTML copy safe areas | Blank device/paper area = DOM slot; bottom 20% clear for the forecast-uncertainty disclaimer |
| 18 | Caption + alt | ES caption: «Planificación de travesía en la mesa de cartas — render conceptual; la previsión mostrada es una composición web.» · EN caption: "Passage planning at the chart table — concept render; the forecast shown is a web composite." · ES alt: «Manos sobre una mesa de cartas con una tableta de pantalla en blanco y material de navegación.» · EN alt: "Hands on a chart table with a blank tablet and navigation tools." |
| 19 | Usage rights | As §5.1; **no licensed chart or forecast data** may be reproduced; weather disclaimer required |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.13 MR-PRD-010 — FLEET fleet operations

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-010` |
| 2 | Destination | `/marea/fleet`, `/en/marea/fleet`; B2B pages; the customer-facing form is "MAREA FLEET package" for the bundle |
| 3 | Subject | A quiet operations office: two anonymous people at a desk with a monitor showing a **blank** screen area, a wall display (blank), a view of a harbour through a window — operations reality, not a startup stock photo |
| 4 | Composition | Wide desk frame, people small in the frame (no faces), screens blank for DOM composites, window view balances the frame |
| 5 | Camera position | 1.6 m height, 3–4 m back, slightly off-axis; documentary distance |
| 6 | Lens perspective | 35–50 mm equivalent; realistic office proportions |
| 7 | Lighting | Mixed: window daylight + overhead office light; honest, slightly flat |
| 8 | Marine environment | Coastal operations office overlooking a working harbour/quay; 10–18 kn outside |
| 9 | Background | Harbour, cranes (unbranded), grey water; **no customer logos, no fleet names, no vessel identities** |
| 10 | Brand colour constraints | Neutral office palette; screens blank; no brand colour injected |
| 11 | Hardware realism | Ordinary monitors/laptops without brand logos; no fake dashboard chrome; blank screens |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 16:9 primary; 4:3 derivative |
| 14 | Target pixel dimensions | 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 4:5 keeps one screen area + window; no cropped faces entering frame |
| 16 | Negative constraints | Readable dashboards/numbers, customer logos, fleet-size claims, "24/7" wall text, stock-office cliché (high fives), identifiable people, fake certificates on the wall |
| 17 | HTML copy safe areas | Blank wall display = optional DOM slot; left 35% clear for B2B headline |
| 18 | Caption + alt | ES caption: «Operación de flota desde tierra — render conceptual; las pantallas mostradas son composiciones web.» · EN caption: "Shore-side fleet operations — concept render; the screens shown are web composites." · ES alt: «Oficina con vistas al puerto, dos personas trabajando y pantallas en blanco.» · EN alt: "Office overlooking a harbour with two people working and blank screens." |
| 19 | Usage rights | As §5.1; model releases for any visible person; no customer logos or data; FLEET disambiguation applies to any caption/copy (product family vs package) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.14 MR-PRD-011 — HUB connector / gland macro detail (installation technical)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-011` |
| 2 | Destination | `/marea/hub` detail, installer documentation, "installation quality" narrative |
| 3 | Subject | Very close detail of a tidy cable entry: gland, strain relief, labelled cores, service loop, cable tie spacing — the geometry of good workmanship |
| 4 | Composition | Filling the frame with **one** cable entry; strong diagonal of the loom; shallow depth of field |
| 5 | Camera position | 10–25 cm from the entry, slightly above, parallel to the bulkhead |
| 6 | Lens perspective | 85–100 mm equivalent macro; flat-field correction, no focus breathing drama |
| 7 | Lighting | Soft raking light to show texture (matte paint, cable sheath); no blown highlights |
| 8 | Marine environment | Interior bulkhead/locker of a used yacht; faint salt, real dust |
| 9 | Background | Bulkhead falling out of focus; no other branded part, no text |
| 10 | Brand colour constraints | Neutral matte; no brand colour; no glowing indicator |
| 11 | Hardware realism | Correct gland type, correct cable sheath, plausible core colours; **no invented IP rating printed anywhere**; unlabelled-by-image (DOM labels only) |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 3:2 primary; 4:3 and 1:1 derivatives |
| 14 | Target pixel dimensions | 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 keeps the gland + service loop; do not crop the entry in half |
| 16 | Negative constraints | Messy wiring presented as good, certification sticker, fake torque marks, readable invented specs, AI-melted cable strands, "waterproof" implication |
| 17 | HTML copy safe areas | Right 30% clear for a short technical caption; bottom 15% free |
| 18 | Caption + alt | ES caption: «Detalle de entrada de cables con prensaestopas y alivio de tracción — render conceptual de una instalación bien ejecutada.» · EN caption: "Cable-entry detail with gland and strain relief — concept render of good workmanship." · ES alt: «Primer plano de un prensaestopas con cables ordenados y un bucle de servicio en un mamparo mate.» · EN alt: "Close-up of a cable gland with neatly routed cables and a service loop on a matte bulkhead." |
| 19 | Usage rights | As §5.1; must never be cropped/used to imply a certified installation |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.15 MR-PRD-012 — Refit / installation work in progress (installer technical service)

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-PRD-012` |
| 2 | Destination | `/instaladores` / `/en/installers` (proposed), `/marea` service narrative, `/profesionales` |
| 3 | Subject | Refit reality: an anonymous installer's hands and tools at a nav station mid-installation — panel off, cable run exposed, drill/driver in use, tidy drop sheet; the boat is **in pieces, honestly** |
| 4 | Composition | Over-shoulder into the work; hands and work area in focus; the "before/after" is implied, not staged |
| 5 | Camera position | 30–60 cm from the work, at installer's shoulder height, slight tilt |
| 6 | Lens perspective | 35–50 mm equivalent; documentary close, not macro |
| 7 | Lighting | Work-light + daylight; honest shadows, slightly uneven |
| 8 | Marine environment | Interior of a yacht in refit, marina/boatyard context; dust, tools, cables |
| 9 | Background | Boatyard/marina soft; no yard branding, no other customer boat identifiable, no vessel name |
| 10 | Brand colour constraints | Neutral work palette; hi-vis only if genuinely plausible, no brand colour |
| 11 | Hardware realism | Real tool types, real fasteners, correct cable practices; blank/unbranded wall plates; **no certification badges, no fake test-meter readings** |
| 12 | Classification | **CONCEPT** (no real MAREA installation exists; no sea-trial or certification evidence) |
| 13 | Aspect ratio | 4:3 primary; 16:9 and 1:1 derivatives |
| 14 | Target pixel dimensions | 1600 w → AVIF/WebP 1280/960/640 |
| 15 | Mobile crop | 1:1 keeps hands + tool + one cable run; face never enters |
| 16 | Negative constraints | Faces/identity without release, fake test-equipment readings, implied certification, "certified technician" implication, staged thumbs-up, brand logos on tools, unsafe practice (mains, no PPE where required) |
| 17 | HTML copy safe areas | Right 35% clear for the service-model copy; bottom 18% clear for caption |
| 18 | Caption + alt | ES caption: «Trabajo de instalación en un puesto de navegación — render conceptual; no representa una instalación real certificada.» · EN caption: "Installation work at a nav station — concept render; not a real certified installation." · ES alt: «Manos de instalador con un destornillador junto a un panel abierto y cables en un puesto de navegación.» · EN alt: "Installer's hands with a screwdriver beside an open panel and cables at a nav station." |
| 19 | Usage rights | As §5.1; model release for any visible person; **no claim of a technician certification scheme** (it does not exist) |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

### 5.16 MR-MKT-001 — Trade / professional marketing key visual

| # | Field | Specification |
| --- | --- | --- |
| 1 | Asset ID | `MR-MKT-001` |
| 2 | Destination | Trade/professional surfaces: `/profesionales`, installer-programme pages, partner/dealer briefing material (internal until clearance) |
| 3 | Subject | A marina/boatyard scene at working scale — several vessels, a pontoon, a service van (unbranded), an installer walking with a tool bag; the message is "we work on real boats", not "buy now" |
| 4 | Composition | Wide, calm, documentary; pontoon as leading line; vessels middle distance; negative sky for DOM headline; no hero product |
| 5 | Camera position | 1.6–2 m above deck/quay, 8–15 m back; natural reportage |
| 6 | Lens perspective | 35–50 mm equivalent; no architectural wide-angle drama |
| 7 | Lighting | Overcast Atlantic morning; flat honest light, wet surfaces |
| 8 | Marine environment | Working marina/boatyard in Galicia; 8–18 kn; grey-green water |
| 9 | Background | Pontoon, yard sheds (unbranded), other boats without names/logos; no customer identification |
| 10 | Brand colour constraints | Neutral, slightly desaturated; no brand colour; no hi-vis brand blocking |
| 11 | Hardware realism | Real yard equipment, real fenders/lines; no invented MAREA product as hero; no certification signage |
| 12 | Classification | **CONCEPT** |
| 13 | Aspect ratio | 16:9 primary; 4:3 and 1:1 derivatives |
| 14 | Target pixel dimensions | 2048 w master → AVIF/WebP 1600/1280/960 |
| 15 | Mobile crop | 4:5 keeps one vessel + installer figure; figure must remain anonymous at crop |
| 16 | Negative constraints | Customer logos/boat names, "available now" signage, price tags, awards, fleet-size claims, stock-business imagery, identifiable people, competitor vans/logos |
| 17 | HTML copy safe areas | Top 30% sky clear; left 40% clear for B2B headline; bottom 15% caption band |
| 18 | Caption + alt | ES caption: «Trabajo profesional en el puerto — imagen conceptual; no representa un cliente real.» · EN caption: "Professional work in the harbour — concept image; not a real customer." · ES alt: «Muelle de trabajo con varias embarcaciones, un pontón y una persona con bolsa de herramientas.» · EN alt: "Working pontoon with several vessels and a person carrying a tool bag." |
| 19 | Usage rights | As §5.1; model releases for every person; no customer or partner logos; B2B claims limited to claims policy Class A/C |
| 20 | Provider status | **NONE_YET** — BLOCKED_ON_IMAGE_GENERATION |

---

## 6. Cross-cutting production standards (apply if generation is ever authorised)

| Standard | Rule |
| --- | --- |
| Responsive set per raster | AVIF + WebP + JPEG fallback; widths per brief; `srcset`/`sizes` |
| Byte budgets | Hero LCP ≤ 120 kB @1920 (AVIF/WebP); card ≤ 45 kB @960; OG ≤ 120 kB; see `MC-04-VISUAL-IDENTITY-BRIEF.md` §10.5 |
| Dimensions in manifest | Real width×height, bytes, SHA-256 computed (never guessed) |
| Alt text | ES + EN required for content images; describes what the image **shows**, not the format; the CONCEPT disclaimer lives in the caption |
| Decorative images | Empty alt, `aria-hidden` where appropriate |
| Integration | Through existing components; no new dependency; SSR/prerender verified after integration |
| QA before acceptance | Realism check against §2 and the per-brief negatives; no watermark; no invented text; palette/light consistency; AI-artefact inspection (hands, rigging, screws, lettering); screenshot at 320/768/1440 px |
| Rejection triggers | Any certification/registration/availability implication; any generated lettering; any real chart reproduction; any identifiable person without release; any third-party logo; any "REAL_PRODUCT"-like claim without evidence |

## 7. Provider and authorization status (single source of truth)

| Field | Value |
| --- | --- |
| `IMAGE_GENERATION` | **BLOCKED** |
| Provider | **NONE_YET** |
| Credential | **NONE** |
| Budget authorization | **NONE** |
| Generated files | **NONE** (`files: []` for every asset) |
| `generated_at` | `null` |
| `synthetic_content_disclosure` | **PENDING** (B22 — legal decision not taken) |
| Classification | `CONCEPT` for all photographic/CGI assets |
| `rights.ai_generated` (on future generation) | `true` — the manifest value describes the **future** generated file, not something that exists |
| Blocked-by references | MC-01 B1, B2, B3, B4; MC-03 X-03; MC-04 B16, B22, B23 |

## 8. What a reviewer must be able to verify in this document (acceptance checks)

- [ ] Every required category in §3 maps to at least one brief.
- [ ] All nine families appear in §4 with a family-specific brief.
- [ ] Every brief in §5 carries all 20 mandated fields, in order, with no field left blank or "TBD".
- [ ] No brief contains invented pixel values that contradict the authoritative brief's budgets.
- [ ] §0 states the blocker and the exact four-part authorization without hedging.
- [ ] No brief asserts a real product, installation, certification, availability or price.
- [ ] The companion manifest lists exactly these IDs with `provider: NONE_YET`, `files: []`,
      `status: BLOCKED_ON_IMAGE_GENERATION`, `generated_at: null`.
- [ ] No image file exists anywhere in the repository for any of these IDs.

## 9. Note on the vector asset MR-PRD-003 (not a generation asset)

`MC-04-VISUAL-IDENTITY-BRIEF.md` §10.3 defines **MR-PRD-003** as a *product family technical
illustration set* (orthographic + isometric line drawings) that is **PRODUCIBLE WITHOUT GENERATION** and
is owned by a different MC-04 write scope (InstrumentIcons/AssetProduction). It is therefore **not** a
photography/CGI brief and is **not** listed as blocked here; it is recorded in
`docs/marea/assets/manifest/MC-04-BRIEFS.yaml` only so that no ID is missing from the registry, with its
true status. If a photoreal **CGI variant** of the family set is ever requested, it must be a new ID
(not `MR-PRD-003`) and will start `BLOCKED_ON_IMAGE_GENERATION` like the rest.

## 10. Change log

| Date | Change |
| --- | --- |
| 2026-10-30 | Created (Rev. 1). Global art direction mapped to brief §9.4; 12 required categories covered; all nine families covered; 16 asset briefs with the 20 mandatory fields each; blocker statement and four-part unblock authorization; machine-readable companion `MC-04-BRIEFS.yaml`. No image generated, no prompt sent, no file produced. |
