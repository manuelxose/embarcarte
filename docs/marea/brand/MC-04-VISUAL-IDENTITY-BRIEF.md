# MC-04 — MAREA visual identity and asset-production brief

| Field | Value |
| --- | --- |
| Document ID | `MC-03 / MC-04-VISUAL-IDENTITY-BRIEF` |
| Milestone | MC-03 — brand strategy, trademark-clearance research, commercial positioning, brand governance |
| Prepares | **MC-04** — MAREA identity system execution (internal, provisional) |
| Programme | EMBARCARTE / MAREA (36 Master Prompts) |
| Date | 2026-10-30 |
| Repository | Checkout at commit `9631c6f`, branch `feature/marea-mc03-brand-governance` (read-only for this document) |
| Owner | Agent D — UX & Creative Brand Director (MC-03 specialist) |
| Write scope | **This file only.** No `src/` change, no asset file, no image, no design token committed |
| Nature | **Decision framework, brief and specification set.** NOT a finished identity, NOT legal advice, NOT a trademark clearance |
| Companions (read first in MC-04) | `docs/marea/brand/BRAND-ARCHITECTURE.md`, `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md`, `docs/marea/brand/BRAND-AND-IP-DECISION-PACKAGE.md`, `docs/marea/assets/ASSET-PIPELINE.md`, `docs/marea/assets/ASSET-MANIFEST.template.yaml`, `docs/marea/assets/README.md`, `docs/marea/WEBSITE-AND-ROADMAP.md`, `docs/marea/COMMERCIAL-PORTFOLIO.md`, `docs/marea/MARKET-BENCHMARKS.md` |
| Traceability | Cited as the visual-execution evidence in `BRAND-ARCHITECTURE.md` §10, `BRAND-AND-IP-DECISION-PACKAGE.md` §3.3 and §11 |

## Status statement — read before using anything in this document

> **NO IMAGE WAS GENERATED AND NO IMAGE FILE EXISTS.** Image generation is **BLOCKED** (MC-01
> blockers B1–B3; MC-03 blocker X-03): there is no image-generation provider in the runtime, no
> approved credential and no budget authorization. This brief defines what MC-04 must produce and
> how it will be tested. It produces briefs, specifications and acceptance criteria — no pixels.
>
> **MAREA trademark legal clearance is NOT GRANTED** (`TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`).
> No logo construction, symbol, colour or typographic direction in this document is declared
> original, distinctive in law, registrable or free of third-party rights. A professional
> originality/prior-art check (and the TM-01/TM-02 counsel work) is required **before any symbol
> is adopted or published**. The design work it enables is **internal and provisional only** —
> decision gate BD-03 is a *conditional* GO for internal MC-04 design (`BRAND-AND-IP-DECISION-PACKAGE.md` §8).
>
> **No registered-trademark symbol may be used** with MAREA, any family name or any bundle name
> (`®`/`™` are prohibited by `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class X and §10). Nothing here
> authorises publication, packaging procurement, printing, domain purchase, advertising or a
> public brand launch.

### Evidence labels used in this document

| Label | Meaning |
| --- | --- |
| **VERIFIED** | Checked in this repository or by a command run on this machine on 2026-10-30. |
| **PROPOSED** | A design decision or specification in this brief. Not implemented, not approved, not published. |
| **HYPOTHESIS** | Market/competitive observation not yet backed by this programme's own evidence. Must not be presented as fact. |
| **BLOCKED** | Requires an external authorization, credential, legal act or human decision this milestone does not have. |
| **VERIFY IN MC-04** | A factual question this brief deliberately leaves open because it needs a measurement, a licence check or a professional review. |
| **NOT VERIFIED** | Not confirmed on 2026-10-30. Do not treat as true. |

Two documentary facts shape the evidence status of this brief (final reconciliation 2026-10-30):

1. `docs/marea/brand/COMPETITIVE-POSITIONING-EVIDENCE.md` was published by a parallel MC-03 agent
   **after the first draft of this brief** and is now the market-context source. §2.3 distinguishes
   what it actually records (`[OBS]` observations in its §4.3/§4.4/§5) from inferences that remain
   **HYPOTHESIS**. It is positioning/claims evidence, **not a visual audit**: statements in this brief
   about competitor visual style are still general observations, not evidence of our differentiation.
   MC-04 may not cite or reproduce any competitor's protected mark, slogan, product design or layout.
2. The machine-readable brand governance (`docs/marea/brand/brand-identity.contract.json`,
   `scripts/check-brand.mjs`, `scripts/check-brand.test.mjs`, `npm run test:brand`) also landed during
   MC-03. Final verification on 2026-10-30: **`npm run test:brand` → PASS**, 21 checks, 0 failed,
   11 governed files scanned (this brief included). The contract and claims policy are authoritative
   for naming, attribution and prohibited claims; MC-04 must keep passing them, not re-derive their
   rules. The accompanying [BRAND-GOVERNANCE-IMPLEMENTATION.md](./BRAND-GOVERNANCE-IMPLEMENTATION.md)
   and [BRAND-VOICE-ES-EN.md](./BRAND-VOICE-ES-EN.md) are the copy/governance inputs this visual
   brief assumes.

---

## 1. Purpose, scope and what MC-03 deliberately does not decide

### 1.1 Purpose

MC-04 must turn the adopted brand architecture into a **coherent, testable visual identity system**
that can be executed under current constraints (no imagery, no trademark clearance, no certification,
no hardware). This brief exists so that MC-04 can start from an agreed strategic frame instead of
re-deriving strategy, and so that "looks good" is never the acceptance argument for a marine
instrument brand.

The single target that organises every decision below:

> **A MAREA surface should look like it was specified by a naval architect and installed by a
> marine technician: quiet, exact, legible, and honest about what it does not know.**

That sentence is not decoration. It converts into measurable tests in §2.2 and gates in §12. It also
operationalises the six personality traits already adopted in `MAREA-BRAND-STRATEGY.md` §5 —
**instrument-precise, calm under uncertainty, locally accountable, engineer-honest, respectful of
existing equipment, quietly premium** — and must not contradict the copy/tone system in
`BRAND-VOICE-ES-EN.md` and the canonical messages in `brand-identity.contract.json`. Where a trait
cannot be measured visually here, it is enforced by the claims policy, not by taste.

### 1.2 In scope of this brief

- Brand impression targets and anti-patterns with measurable intent (§2).
- Exactly three strategic identity territories, including the tide/wave/navigation metaphor
  evaluation and a non-literal engineering/system motif, with selection criteria (§3).
- Typography principles, current-stack orientation, numeric/diacritic requirements (§4).
- Colour roles, modes, contrast targets and colour-blind rules (§5).
- The three visual jobs — marine software, corporate website, installer-facing material (§6).
- Instrument/dashboard visual expectations and prohibitions (§7).
- Hardware product styling **direction only** (§8).
- Packaging direction, iconography rules, product-illustration standards, photography/CGI art
  direction (§9).
- Asset production specification table for MC-04+ (§10).
- Accessibility expectations and QA checklist (§11).
- MC-04 acceptance criteria, tests, review gates and failure conditions (§12).
- Explicit MC-03 out-of-scope list and blocking register additions MC-04 inherits (§13).

### 1.3 What MC-03 deliberately does not decide

| Decision | Why it is not decided here | Decision owner / milestone |
| --- | --- | --- |
| Final logo / symbol / lockup adoption | Requires a professional originality and prior-art check; TM clearance still pending | MC-04 output + company/legal gate (BD-03, TM-01/TM-02) |
| Final colour values committed to `src/styles.scss` | MC-03 is read-only outside this file; design tokens are implementation | MC-04 proposes → MC-06 design system implements |
| Adoption of a new typeface (or keeping the current one) | Licence metadata and OpenType numeric support must be verified first | MC-04 (licence verification) → Lead (dependency policy) |
| Rebranding or migrating the live EMBARCARTE pages | Existing indexed URLs and services must not be disrupted; migration is a separate authorised milestone | Lead + later milestone (`WEBSITE-BRAND-MIGRATION.md`) |
| Packaging artwork production, print, procurement | Clearance + real BOM + conformity plan + signatory authorization are all absent | Post-clearance, human signatories (`BRAND-AND-IP-DECISION-PACKAGE.md` §8) |
| Hardware industrial design, CAD, tooling, material specification | No manufacturing partner, no BOM, no conformity evidence | Product engineering, later milestone |
| Certifications, IP marks, standards-body marks | Not a design decision; the marks do not exist and cannot be implied | Compliance/regulatory gates (MC-16A) |
| Any photograph, CGI render, illustration or screenshot | Image generation is BLOCKED (B1–B3/X-03) | Separate authorized asset task (ASSET-PIPELINE §9) |
| Trademark strategy, filing, classes, territories | Legal-commercial decision reserved for humans and counsel | TM-01/TM-02, never an agent |
| Product performance claims, prices, availability, safety statements | Governed by claims policy and lifecycle state, not by design | `COMMERCIAL-BRAND-CLAIMS-POLICY.md`; product owner |
| New build scripts or asset-generation tooling | New-dependency/supply-chain policy | Lead, separate task |

### 1.4 Non-negotiables inherited from the programme

1. **One design system only.** No second brand voice, parallel token set or per-page overrides
   (`.agents/skills/marea-premium-design/SKILL.md`).
2. **Naval-instrument credibility over generic SaaS** (`WEBSITE-AND-ROADMAP.md` §2).
3. **No invented certification, availability, performance or partnership statement**, and no visual
   styling that implies one (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2, §4).
4. **CONCEPT vs REAL_PRODUCT distinction is preserved** in every asset brief and manifest entry
   (`ASSET-PIPELINE.md` §7.1).
5. **AI images are never evidence** and never fake screenshots, badges or installations
   (`ASSET-PIPELINE.md` §7.2, §6.2).
6. **Typography and technical UI are HTML/CSS/SVG authored by us**, never generated lettering
   (`ASSET-PIPELINE.md` §6.3, §6.4).
7. **ES and EN are first-class**; every asset carries both alt texts, and no user-facing string is
   hard-coded in a template (i18n policy, `AGENTS.md`).
8. **WCAG 2.2 AA minimum**, keyboard operation, reduced-motion respect, no colour-only semantics
   (MC-06 and every later UI milestone).
9. **Asset provenance is part of the asset**: no file ships without a manifest entry
   (`ASSET-PIPELINE.md` §4.3, §5).
10. **MAREA is proposed and endorsed by EMBARCARTE.** No corporate/legal surface may be designed as
    MAREA; legal documents and invoices remain EMBARCARTE (`BRAND-ARCHITECTURE.md` §1, §4, §5).

### 1.5 How the identity system relates to the existing site

The live site currently carries the **EMBARCARTE** identity and a light navy/turquoise visual system,
not a MAREA identity. This brief is deliberately written so that MC-04 can produce a MAREA identity
**alongside** the existing site without touching it:

- MC-04 output is internal documentation and (if separately authorized) identity artwork; it is not a
  live-site change.
- Any future site adoption is a migration with redirect/hreflang/canonical discipline; it is not part
  of MC-04 by default (§6.4, §13).
- The same underlying design language (type roles, contrast discipline, icon logic) is what makes a
  future migration cheap. That is why §5 and §11 anchor to the **existing tokens** rather than
  inventing a parallel palette.

---

## 2. Brand impression targets and anti-patterns

### 2.1 Impression targets — measurable intent

An impression target is only useful if it can fail. Each row below defines what the impression means
operationally, how it is tested, and the MC-04 threshold. These are **PROPOSED** internal design
criteria, not customer-research findings. Primary customer research is MC-03B, not this brief.

| # | Impression target | What it means operationally | Test / evidence | MC-04 threshold |
| --- | --- | --- | --- | --- |
| I-1 | **Reads as installed marine equipment, not a web app** | The mark and chrome look like something specified, moulded or engraved onto a unit; no decorative software effects carry identity | Internal 5-second sort: reviewers see 10 identity tiles (MAREA candidates + 3 generic SaaS + 3 marine electronics) and classify "marine instrument / software startup"; plus 16 px and 8 mm engraving test on the candidate mark | ≥ 4/5 reviewers classify the adopted direction as marine instrument; mark survives 16 px and 8 mm silkscreen without losing its structure |
| I-2 | **Calm density** | Information is bounded, aligned and quiet; whitespace is used as structure, not as decoration; no competing accents | Count of hierarchy levels and accent colours per view; spacing/alignment audit on 3 representative screens | ≤ 3 hierarchy levels; ≤ 2 chroma accents per view; no more than one primary action visible at a time |
| I-3 | **Legibility in sunlight** | Primary readouts and labels remain distinguishable under high ambient luminance and glare | Computed contrast for every text/background pair; large-type minimum contrast; simulated high-luminance review; real cockpit test is **BLOCKED** until hardware exists | Primary data ≥ 7:1 (internal, stricter than AA); UI text ≥ 4.5:1; non-text UI boundaries ≥ 3:1; no text weight below 400 for data |
| I-4 | **Legibility at night without glare** | Night surfaces are dark but not pure black; foreground light but not pure white; no halation-prone pairing | Luminance/contrast check of night palette; pairing review; dark-adaptation test **BLOCKED** without hardware | Night background luminance clamped (proposed `#0d1b26`); no `#fff` on `#000`; all night text pairs ≥ 4.5:1, critical ≥ 7:1 |
| I-5 | **Numeric honesty** | Every number has a unit, a source/timestamp and a legible convention; values never jitter | Layout audit with worst-case strings (3-digit bearing, negative temperature, long unit); stale-data states reviewed | Reserved widths for worst-case values; unit and age present on every live-data view; no number without unit or provenance |
| I-6 | **One ecosystem, nine families** | The system makes family relationships obvious without a logo per product | Lockup test for all nine families (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET) using the adopted mark | One master lockup + one family rule set; no per-family symbol proliferation |
| I-7 | **Bilingual by construction** | ES and EN are equally native; accented glyphs, decimal separators and line lengths are designed, not patched | Glyph coverage test; worst-case ES/EN/PT/FR strings in every component; ES/EN copy length tolerance | No clipped accents at any size; both locales fit without layout breakage; numeric separators localised |
| I-8 | **Provisionally honest** | Nothing looks certified, registered, launched or tested that is not | Forbidden-pattern review of every proposed surface against the claims policy; manifest classification present | Zero implied certification/registration/availability; every CONCEPT asset labelled as such |

**A note on the sunlight and night targets.** WCAG does not model sunlight, glare or dark adaptation.
They are engineering/industrial-design requirements, and the only honest current position is:
*computed and simulated evidence in MC-04, real-environment test BLOCKED until a physical display
exists*. No document in this programme may claim a sunlight-legibility result for hardware that has
not been built and measured.

### 2.2 Explicit anti-patterns to avoid

Each anti-pattern is banned because it either contradicts the brand architecture, implies a claim the
programme cannot make, or converts an instrument into a template.

| Anti-pattern | Why it is wrong here | Detection in review |
| --- | --- | --- |
| Startup gradients (purple/cyan multi-stop washes, gradient text, mesh backgrounds) | Reads as SaaS marketing, not instrumentation; reduces contrast predictably under sunlight | Any gradient used as identity or behind data; gradient text anywhere |
| Glassmorphism / backdrop blur / translucent panels over content | Reduces contrast exactly where marine legibility is critical; implies an operating-system look | `backdrop-filter`, translucent surfaces carrying data, blur over charts |
| Generic dashboard chrome (sidebar + KPI cards + donut chart kits, identical card grids) | Makes MAREA indistinguishable from any analytics product; clashes with calm density | Any layout that could be relabelled as a generic SaaS admin in one substitution |
| Luxury clichés (gold foil, Didone serifs, sailboat-silhouette logos, "est. mmxx" crests) | Says "marina lifestyle", not "engineered instrument"; often collides with existing marks | Serif or script wordmark; metallic/foil simulation on web; nautical clip-art |
| Neon / cyber / "dark mode gamer" aesthetics (cyan glow, glow text, low-contrast dark UI) | Undermines instrument credibility and night legibility; sunset and salt-spray readability collapse | Outer glows, saturated cyan on black, thin bright strokes on dark |
| Unverified performance graphics (faux speedometers, "±0.1 kn", "0.2 m accuracy", ECDIS-style chart chrome) | Implies measurement evidence the programme does not have | Any magnitude/tolerance/% improvement graphic without an evidence reference |
| Official-navigation styling (S-52-like chart palettes, ENC legends, "official chart" look, nautical-miles-only scale bars presented as authoritative) | Risks implying ECDIS-equivalence or regulatory status; explicitly forbidden (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P) | Chart screens styled to look like certified ECDIS output; official-sounding chart legends |
| Certification-like badges, shields, seals, ribbons, awards, standards-body marks | Invented certification is a Class X prohibition | Any seal/shield/ribbon element; any standard number presented as achieved |
| All-caps tracked micro-labels on every heading and button | A common template tell; hurts Spanish/Portuguese accented legibility at small sizes | Uppercase + tracking used as default hierarchy instead of as data/label roles |
| Pills, soft shadows and 12–22 px radii applied to every element | Homogenises surfaces and hides hierarchy; not how equipment panels are made | Radius/shadow used as the only differentiator between components |
| Emoji, flags, stock handshakes, generic marina stock photography | Not credible; often unlicensed; can imply endorsements or locations | Any third-party image without manifest provenance; emoji in professional surfaces |
| Fake screenshots / invented UI text in imagery | Text artifacts become factual claims; untranslatable and inaccessible | Any generated image containing legible interface text (see §9.4) |
| Sloganised safety language ("navigate safely", "never miss a hazard") | Implies safety guarantees that are prohibited | Any safety-adjacent promise in identity, packaging or dashboard chrome |
| "Since 2026", founding-myth or heritage claims | Not established corporate history; corporate data pending (X-02) | Any heritage/year claim in identity material |

### 2.3 Where the line sits versus marine electronics incumbents (observed context + HYPOTHESIS)

`docs/marea/brand/COMPETITIVE-POSITIONING-EVIDENCE.md` §4.3/§4.4/§5 records how the reviewed category
signals trust: warranty length as a floor, **certified dealer/OEM service networks**, proprietary
networks with explicit compatibility lists, data/chart provenance, awards and self-claims, and
standards-body membership. It also records credible gaps: refit-as-brand-promise, readiness/lifecycle
disclosure, offline/data-rights clarity, a single accountable regional seller, and one upgrade path.
Those are **positioning** findings. They are not a visual audit, and they do not prove MAREA can
deliver any of the gaps.

The visual consequence is a discipline, not a look: the identity must **not imitate incumbent trust
devices it cannot own** — no dealer-network badge, no certification/seal cluster, no warranty or
standards-body mark, no award laurel, no "luxury" register (the reviewed B&G messaging includes
"redefines marine luxury" `[OBS]`; that register is both unearnable here and contrary to the adopted
personality). What remains available is the calm, documented confidence described in §2.1.

> **HYPOTHESIS — not evidence of our differentiation.** From `MARKET-BENCHMARKS.md` and general
> market observation (no competitor visual system was audited), established marine-electronics brands
> (chart plotters, autopilots, AIS, instrument systems) tend to use saturated marine blues, glossy or
> brushed bezels, dense icon menus, faux-3D gauge motifs, high-chroma alert palettes, and badge
> clusters. These are tendencies to avoid, not facts about any named brand, and no claim of
> superiority follows from them. We must not imitate their marks, product designs, layouts or icons.

The intended space is deliberately **quieter and more exact**, not "more premium" in a luxury sense:

| Dimension | Incumbent-typical (HYPOTHESIS) | MAREA intent (PROPOSED) |
| --- | --- | --- |
| Colour energy | Saturated, many hues in one view | Low-chroma, ink-led; chroma reserved for state and data |
| Depth | Gloss, bevel, faux-3D, shadows | Flat, precise, material honesty in hardware, no faux depth in UI |
| Type | Condensed display faces and icon-heavy menus | Tabular numerals, calm hierarchy, typographic clarity |
| Badging | Certification/ecosystem clusters | No badge clusters; status and provenance stated in text |
| Density | Maximal feature surfacing | Calm density; one idea per view |

This is a **positioning intent for design review**, not a claim of superiority or a comparative
advertising statement. No comparison with a named competitor may be published without evidence
(`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class P).

### 2.4 The two tests every identity element must survive

1. **The installed-equipment test.** Would this element look credible if it were silkscreened on a
   matte anodised bezel, laser-etched on stainless, or moulded into an enclosure 8 mm tall? If it only
   works on a glowing screen, it is a web decoration, not an identity.
2. **The field test.** Would an installer or skipper understand it at a glance, in sunlight, with wet
   hands, without reading a sentence? If it needs a paragraph to explain, the hierarchy has failed.

Both tests are used in §3 selection and §12 acceptance.

---

## 3. Strategic territories

### 3.0 How to read this section

Three **coherent strategic directions** — not three finished logos and not a menu of twenty sketches.
Each territory states a strategic idea, a construction hypothesis, what it implies for the rest of the
system, its risks and its kill criteria. All three are **PROPOSED**. None is selected here, none is
declared original, distinctive in law or free of third-party rights, and no artwork file exists.

MC-04 must prototype **all three at construction level** (vector geometry, at 16/24/48/512 px and
monochrome), test them against §2.2 and §3.8, commission a professional originality/prior-art check on
the shortlisted construction, and then adopt exactly one. A fourth territory may only be added through
a `DECISION-LOG.md` entry, not by a designer's preference.

Each territory must also be able to carry the strategy's differentiation — refit scope, installer
accountability and readiness honesty (`MAREA-BRAND-STRATEGY.md` §6–§7) — into the system that follows
it (diagrams, packaging, installer material). A direction that only works as a software mark, or that
needs a claim the programme cannot support, fails the brief regardless of how it scores below.

### 3.1 Construction rules common to all three territories

| Rule | Requirement |
| --- | --- |
| Grid | Integer construction grid (24×24 for A and C, 32×32 for B); every curve mathematically defined; optical corrections documented, not eyeballed |
| Master form | Single ink; no gradient, shadow, bevel, texture or transparency in the master artwork |
| Wordmark | The word `MAREA` is the primary identifier; family names follow it (`MAREA NAV`, `MAREA HUB`, … per `BRAND-ARCHITECTURE.md` §3). Family names are English nautical terms and are **never translated** |
| Wordmark case | PROPOSED uppercase master wordmark so it aligns with the uppercase family names. A title-case alternative must be evaluated in MC-04 and rejected or adopted explicitly — not left to per-page choice |
| Language | The symbol must contain **no letters** and no text that would need translation; the wordmark is the only lettering |
| Colour independence | The complete lockup must work in one ink on light and dark, on anodised metal, on white carton and embroidered/printed textiles |
| Small-size behaviour | A documented 16 px / 8 mm reduced variant is required; it may simplify (fewer details, thicker strokes) but must remain recognisably the same mark |
| Clear space | ≥ 0.5× mark height on all sides; documented in the identity system |
| Motion | No animation of the master mark. A state/progress motion may be designed later for software, but it is not part of the identity |
| Family lockup | One master lockup + one family-name rule. **No per-family symbol** (the ecosystem must read as one brand, per `BRAND-ARCHITECTURE.md` §2) |
| Endorsement | No EMBARCARTE logo stacked above/below MAREA. Endorsement is text attribution per `BRAND-ARCHITECTURE.md` §2 and §4; the endorsed line "MAREA by EMBARCARTE" is only permitted after the clearance gate opens |
| Prohibited content | No boat silhouette, anchor, helm wheel, compass rose lettering, flag, map pin, certification seal, `®`/`™`, year of foundation, tagline ribbon |

### 3.2 Evaluation criteria (before selection)

Scores below are **PROPOSED design hypotheses**, not measurements and not any statement about legal
distinctiveness. MC-04 must re-score after prototyping with recorded evidence.

| Criterion | Weight | A — Isobath | B — Bearing index | C — Signal trunk |
| --- | ---: | ---: | ---: | ---: |
| C1 Marine-instrument credibility | 20% | 4 | 5 | 3 |
| C2 Distinctiveness potential (subject to professional check) | 20% | 2 | 3 | 4 |
| C3 Small-size legibility (16 px / 8 mm) | 15% | 2 | 3 | 4 |
| C4 System extensibility (icons, diagrams, packaging, bezel, UI) | 15% | 4 | 3 | 5 |
| C5 Colour/monochrome independence | 10% | 5 | 5 | 5 |
| C6 Cultural and language fit (ES/PT primary market) | 10% | 5 | 4 | 3 |
| C7 Manufacturing feasibility (engraving, silkscreen, mould, sticker) | 10% | 4 | 4 | 5 |
| **Weighted hypothesis score (of 5)** | 100% | **3.35** | **3.95** | **3.95** |

The tie is deliberate and must not be broken by taste. It is broken by **test evidence** (small-size
rendering, 5-second sort, engraving sample simulation) and by the **professional originality check**.
C8 "legal/search effort" is not scored: it cannot be estimated by a designer and is not a clearance
result. It is a gate (§3.8).

### 3.3 Territory A — "Isobath" (literal-marine: the tide line)

**Strategic idea.** The mark is drawn from the cartographer's isobath / the tide line: a small stack of
open contour lines whose last line doubles as a measured baseline. It says "this is charted water",
"depth is information", "the tide is a measured phenomenon, not a mood". It is the most directly
Spanish reading of *marea*, and the most serious.

**Construction hypothesis (PROPOSED, not artwork).**

| Element | Hypothesis |
| --- | --- |
| Grid | 24×24 units, 2-unit stroke |
| Primary structure | 4 nested open contours, 4-unit intervals, opening toward the right at a consistent angle; intervals deliberately unequal (3/4/5 units) so it cannot reduce to "three generic waves" |
| Anchor | The innermost contour ends in a short horizontal datum that optically aligns with the wordmark baseline |
| 16 px variant | 3 contours, 2 px strokes at the 16 grid, datum retained |
| Wordmark relation | Symbol sits left of `MAREA`; symbol cap-height = wordmark cap-height; 0.75× cap-height gap |
| Optical corrections | Contour ends are cut perpendicular to the local tangent; no accidental tangencies; open ends must not look like an unfinished sketch |

**Rationale.** Tide/isobath is the most credible marine-instrument metaphor available without showing a
device. It is calm, exact, measurable and language-neutral as a form. It gives the art direction an
obvious secondary system (bathymetric bands, contour intervals) that is useful in packaging and
corporate imagery without being decorative neon.

**Risks (must be tested, not assumed away).**

- **Cliché and collision risk.** Wave/contour marks are among the most crowded devices in marine,
  environmental and outdoor branding. Without a genuinely specific construction, this territory is a
  generic "three waves" mark and should be killed.
- **Descriptiveness reinforcement.** A literal tide drawing next to an ordinary Spanish word
  ("tide") pushes the composite toward the descriptive end — the opposite of what an unclear mark
  needs. It must not look like an illustration of the noun.
- **Small-size collapse.** Contour intervals disappear at 16 px and in 8 mm silkscreen/engraving;
  the reduced variant may lose the very idea that makes it distinctive.
- **Decorative drift.** The system is easy to over-apply (wave patterns on every surface), which
  contradicts calm density.
- **No originality conclusion.** The construction has not been searched; similarity to existing
  marine/environmental marks is NOT VERIFIED and must be checked professionally.

**What it implies for the rest of the system.**

- Strong fit for corporate website and packaging; weaker fit for instrument UI (a contour pattern
  behind data is always wrong).
- Icon system would inherit line-band logic; risk of icons becoming decorative rather than
  functional.
- Hardware: engraving is feasible but a 4-contour mark at small bezel height may not reproduce;
  the reduced variant must be specified before tooling.
- Diagrams: bathymetric/contour conventions would need to be our own, never official chart
  symbology (see §7.7).

**Kill criteria.** Fails 16 px/8 mm test; reads as a generic wave at any size; 5-second sort reads
"outdoor brand" or "environmental NGO"; the professional check flags a likely confusion; the only way
to make it distinct is to make it arbitrary.

### 3.4 Territory B — "Bearing index" (literal-marine: the navigation instrument)

**Strategic idea.** The mark is an instrument fragment, not a compass rose: a heading index — one
bearing line crossing a calibrated arc with a single position datum. It says "heading", "bearing",
"measured direction", "the instrument you steer by". It is the territory that most directly carries
navigation credibility for NAV, DISPLAY and PILOT.

**Construction hypothesis (PROPOSED, not artwork).**

| Element | Hypothesis |
| --- | --- |
| Grid | 32×32 units, 2.5-unit stroke for the arc, 2-unit for the index |
| Primary structure | A 270° calibrated arc (open at the bottom-right), one bold radial bearing index at 0°, one small square datum at the centre, two asymmetric tick marks (not a full rose) |
| 16 px variant | Arc reduced to 1.5 px, only the index + datum + one tick retained |
| Wordmark relation | Mark left of `MAREA`; mark cap-height = wordmark cap-height; the arc's optical centre aligns to the wordmark's mid-cap height |
| Optical corrections | Arc ends cut at a consistent angle; bearing index must be visually heavier than ticks; no accidental "G" or "C" reading |

**Rationale.** Navigation is the category's core competence and the strongest instant read for the
primary buyer. A single bearing index is a deliberate reduction of the compass-rose cliché: it claims
"instrument", not "nautical gift shop". The tick vocabulary transfers naturally into gauge scales,
chart margins and product bezel markings.

**Risks.**

- **Crowded category.** Compass/rose/bearing devices are the most saturated marine motif; collision
  risk is high and NOT VERIFIED.
- **Certification-seal confusion.** A circular emblem with an index can read as a seal, badge or
  approval mark — exactly the implied-certification problem the claims policy forbids.
- **Navigation-authority implication.** A compass mark on a product that is a *navigation aid* can
  imply authority or certification MAREA does not have; copy and disclaimers would have to fight the
  symbol.
- **App-icon cliché.** At small size it may read as a generic compass app, not a marine instrument.
- **Rigidity.** Circular geometry tends to colonise the whole system (gauges everywhere), which
  contradicts calm density and can push the UI toward fake-instrument graphics.

**What it implies for the rest of the system.**

- Strong for software, DISPLAY and PILOT; weak for HUB/AIS/SENSE (no bearing semantics).
- Gauge/scale conventions become a core system element; must be constrained (§7.6).
- Packaging label plates echo the arc; risk of every surface becoming a dial.
- Hardware: bezel index marks are a natural family cue for DISPLAY and PILOT control heads.

**Kill criteria.** Reads as a certification seal or a compass app; fails 16 px; the professional check
flags likely confusion with instrument brands; the design cannot avoid implying navigation authority.

### 3.5 Territory C — "Signal trunk" (non-literal engineering/system motif)

**Strategic idea.** The mark is drawn from the data backbone and the terminal block: a bus rail with
three unequal terminal keys, the middle key raised — the physical grammar of marine installation
(connectors, glands, labelled cores) abstracted to three strokes. It says "integrated systems",
"installed properly", "one vessel, many systems". It contains no wave, no compass and no boat.

**Construction hypothesis (PROPOSED, not artwork).**

| Element | Hypothesis |
| --- | --- |
| Grid | 24×24 units, 2-unit stroke |
| Primary structure | One horizontal trunk line; three vertical terminal keys at unequal spacing (left, centre raised, right); terminal caps squared, not round; centre key extended to form the spine of an implied `M` beside the wordmark |
| 16 px variant | Two keys + rail at 2 px stroke; centre key remains the raised one |
| Wordmark relation | Symbol left of `MAREA`; rail sits on the wordmark baseline; raised key aligns to cap-height |
| Optical corrections | Unequal spacing is intentional (physical terminals are not evenly spaced on a block); caps must not merge at small size; must not accidentally read as `≡`, `#` or a menu icon |

**Rationale.** `MARKET-BENCHMARKS.md` finding 1 identifies *verified local/offline integration and
unified onboard data* as the real differentiation, not "better navigation". A mark built from the
integration story is strategically aligned with the actual product system (HUB as consolidation entry
point, nine families on one data model). It also escapes the two most crowded marine motifs, which is
the best available **potential** distinctiveness position — subject to a professional check, not
assumed.

**Risks.**

- **Generic tech look.** Nodes, blocks, links and rails are the default visual language of SaaS,
  telecom and software infrastructure; executed weakly, this reads *less* marine than a wave mark and
  becomes a generic "network" logo.
- **Accidental UI symbols.** At 16 px, three horizontal bars read as a hamburger menu; a rail with
  keys can read as a list or a settings icon. This is a real failure mode, not a theoretical one.
- **Weak marine semantics.** The mark only becomes marine in context (wordmark, family names, product
  photography, diagrams). It cannot carry the category alone; the wordmark and the rest of the system
  must.
- **Collision with connector/electronics and industrial brands** is plausible and NOT VERIFIED.
- **Cultural distance.** It does not use the Spanish meaning of *marea*; in the primary market it
  needs the wordmark to do that work.

**What it implies for the rest of the system.**

- Strongest extensibility: icon vocabulary (connectors, protocols, ports, sensors), diagram
  conventions, cable/label marking, packaging technical plates and hardware bezel detailing all
  derive from one grammar.
- The system becomes "technical documentation as brand", which suits installer-facing material
  especially well.
- Requires a compensating marine cue in art direction (materials, environments, maritime vocabulary)
  and a strict ban on generic "network/cyber" styling.
- Hardware: the raised-key motif is easy to emboss, engrave and silkscreen at small sizes; family
  recognition can come from control-layout proportions rather than a new logo per product.

**Kill criteria.** At 16 px it reads as a menu/list/settings icon; the 5-second sort reads "software
company"; the professional check flags network/telecom/electronics marks; the wordmark cannot carry
marine meaning without a literal marine device being reintroduced.

### 3.6 The word "marea": strategic asset and distinctiveness risk

`BRAND-ARCHITECTURE.md` §7 records the linguistic position; this section states its consequences for
visual design.

**Strategic asset.**

- In Spanish, Portuguese, Galician and Italian it is an ordinary word for **tide** — instant marine
  meaning in the primary market, no explanation required, no translation ever needed.
- Five letters, no diacritics, easy to pronounce and spell in ES/EN/PT/FR; suitable for a wordmark,
  filenames (ASCII kebab-case per `ASSET-PIPELINE.md` §4.1) and product naming.
- "Tide" is a **time-varying measurement**, which fits a data/forecast/instrumentation brand better
  than a static nautical object would.
- It is already the master brand in the adopted architecture and appears in nine family names and six
  bundle names.

**Distinctiveness risk (must be stated plainly).**

- It is an **ordinary descriptive/suggestive word in the marine field**, so inherent distinctiveness is
  weak; protection, if any, is more likely to rest on the composite/figurative mark and the family
  system than on the word alone (`BRAND-ARCHITECTURE.md` §7; `BRAND-AND-IP-DECISION-PACKAGE.md` §3.3).
- The mark space around "Marea" is not empty: an existing US marine-electronics business ("Marea
  Marine") is recorded as a **risk signal, not an infringement finding**
  (`ASSET-PIPELINE.md` §B5); other unrelated uses exist in food and fashion sectors. None of this is a
  clearance result.
- In English, *marea* is not a word; recall may benefit but homophone/near-mark confusion (Maria,
  Marina, Mare) is possible.
- Search dilution: an ordinary word is harder to own in search results and harder to defend.

**Consequences for the identity (binding for MC-04).**

1. The figurative construction must carry the distinctiveness; the wordmark alone cannot.
2. Do **not** illustrate a literal tide (wave, waterline, moon) as the primary symbol. A literal
   illustration of the noun strengthens the descriptiveness problem and is the most generic option.
3. Do not translate `MAREA` in any locale; it is a name, not a noun.
4. Do not use the word as a slogan or a pun ("la marea de…"). Claims policy governs copy.
5. Any final mark must pass a **professional originality/prior-art check** (visual similarity search
   across trademark registries and the market, including adjacent sectors) before adoption. This brief
   asserts **no** originality, no registrability and no freedom to use.

### 3.7 Metaphor evaluation (required)

| Metaphor family | What it communicates | Failure mode | Distinctiveness tradeoff | Verdict for MC-04 |
| --- | --- | --- | --- | --- |
| Tide / wave (literal) | Sea, marine category, movement, time | Three-wave clip-art; "beach brand"; decorative | Lowest: the most used marine device; cannot be owned on its own | Evaluate as **secondary pattern only** (art direction, packaging bands), not as the primary mark unless construction is exceptional |
| Navigation / orientation (literal) | Direction, competence, instrument, steering | Compass-rose cliché; certification seal; implied authority | Medium: saturated but can be reduced to an instrument grammar | Prototype (Territory B), with strict anti-cliché and anti-seal tests |
| Non-literal engineering / system | Integration, installation, data, reliability | Generic tech/network logo; hamburger icon; SaaS feel | Highest **potential**, but only with a specific physical construction; unproven | Prototype (Territory C) as the deliberate non-marine-literal option |
| Purely typographic wordmark | Calm authority; name-led | Invisible without a device; weak as app icon | Medium-low alone; strong as the wordmark layer of any territory | Required layer in all three (wordmark quality decides at small sizes) |

The brief intentionally does **not** pick the metaphor. The decision must rest on prototype evidence
plus the professional check; choosing by taste is not an acceptance argument.

### 3.8 Selection criteria and decision process

**Process (MC-04, in order).**

1. Read the MC-03 sibling documents that land before MC-04 starts (competitive evidence, naming
   system, brand voice, trademark research, contract/validator).
2. Build all three territories as construction-level SVG explorations: 16, 24, 48 and 512 px,
   monochrome, reversed, greyscale and colour-blind simulated.
3. Run the §2.2 tests: 5-second sort, installed-equipment rendering (simulated matte/engrave), 8 mm
   silkscreen reduction, worst-case family lockups for all nine families, worst-case ES/EN/PT/FR
   accented text.
4. Score against §3.2 with recorded evidence and reviewer identities.
5. Shortlist **two** constructions (not one, not three) and commission a professional
   originality/prior-art check on them (agent cannot perform or claim clearance).
6. Adopt **one** direction, record the decision and the rejected alternatives in MC-04 delivery +
   `DECISION-LOG.md`, and mark the identity **provisional** until TM-01/TM-02 progress.
7. If the professional check raises objections: return to prototype with a new construction, or
   recommend a typographic-only system plus a future figurative mark. Never adopt a direction "because
   it is already drawn".

**Selection criteria (all must pass; not tradeable against each other).**

| Criterion | Pass condition |
| --- | --- |
| Small-size integrity | Recognisable at 16 px and 8 mm; reduced variant exists and is documented |
| Monochrome integrity | Complete lockup works in a single ink; no reliance on colour or gradients |
| Family system | Nine family lockups from one rule; no additional symbols needed |
| Marine-instrument credibility | Passes the 5-second sort and the installed-equipment simulation |
| No claim implication | Cannot be read as certification, seal, approval, ECDIS or navigation authority |
| Language | Symbol contains no letters; wordmark works in all target locales; no translation |
| Professional check | Originality/prior-art check completed and its findings recorded; objections resolved |
| Governance | Aligns with `BRAND-ARCHITECTURE.md` naming/attribution; passes `npm run test:brand` once available |

**Explicit non-criteria.** "Looks modern", "looks premium", "matches a trend", "a competitor looks
like this", "the team likes it", "we already paid for the sketch". None of these is evidence.

### 3.9 What "adoption" means under the current gates

Adoption at MC-04 is **internal and provisional** (BD-03 conditional GO; `BRAND-AND-IP-DECISION-PACKAGE.md` §8):

- the identity may be documented, prototyped and reviewed internally;
- it may **not** be published, printed, procured, applied to packaging, used as a live-site brand or
  filed as a trademark;
- no `®`/`™` and no "registered/registrada" wording may appear;
- the mark must be labelled PROPOSED in every internal artefact that could be mistaken for a final
  brand, in the same spirit as CONCEPT labelling for imagery;
- any public use requires TM-01/TM-02 progress and signatory authorization.

---

## 4. Typography

### 4.1 Principles

1. **Type is infrastructure, not decoration.** The typographic system must survive dilution: a
   datasheet printed in mono, an app at 320 px, a bezel label at 8 mm, a scope screen in sunlight.
2. **One display family and one text family.** Two clearly distinct roles, not a collection. No
   decorative serif, script, condensed poster face or "nautical" display type.
3. **Numerics are a first-class type role.** Instrument values are not body text: they need tabular
   figures, reserved widths and explicit units. A beautiful wordmark with jittering digits is a failed
   system.
4. **Hierarchy from size, weight, spacing and alignment** — not from colour, gradients, shadows or
   uppercase-everywhere.
5. **No text baked into images.** Every word a visitor reads as information is DOM text or authored
   SVG text (`ASSET-PIPELINE.md` §6.3). This includes product names on packaging mock-ups, screen UIs
   in renders and diagram labels.
6. **Self-hosted only.** No third-party font CDN, no runtime font fetch from another origin, no
   hotlinked webfonts. Fonts are build assets with a performance cost recorded by the existing
   performance check.
7. **Locale-native.** ES/EN are first-class on the website and in product UI; PT/FR are required for
   packaging, installer material and future markets. Diacritics are designed, not patched.

### 4.2 Current stack — VERIFIED state (2026-10-30)

| Fact | Evidence | Consequence |
| --- | --- | --- |
| Body type = **DM Sans** (variable), display type = **Manrope** (variable) | `package.json` dependencies `@fontsource-variable/dm-sans@^5.3.0`, `@fontsource-variable/manrope@^5.3.0` | The current identity already uses a humanist geometric sans + a rounded technical display sans; both are bundled, not fetched |
| Fonts are imported in SCSS, not `index.html` | `src/styles.scss` lines 1–2: `@use '@fontsource-variable/manrope'; @use '@fontsource-variable/dm-sans';`; `src/index.html` contains no `<link>` to any font | Self-hosting is already the established pattern; it must stay that way |
| CSS variables define the roles | `src/styles.scss` lines 19–20: `--display: 'Manrope Variable', 'Manrope', system-ui, sans-serif;` `--body: 'DM Sans Variable', 'DM Sans', system-ui, sans-serif;` | A new typeface means changing a role variable, not restyling components — good architecture to preserve |
| No numeric/OpenType feature declarations exist | `grep` for `font-variant-numeric`, `tabular`, `font-feature-settings`, `font-variation` in `src/`: **0 matches** | Tabular figures are **not currently specified anywhere**. This is the single most important typographic gap for instruments |
| Negative tracking is used for display type | `src/styles.scss`: `.brand-name` letter-spacing `-0.9px`, `.display` `-2.4px`, headings around `-1px` | Display tracking is appropriate for large Manrope headings; it must **not** be carried into numerals or labels |
| `index.html` declares `color-scheme: light` and `theme-color: #0b2540` | `src/index.html` lines 9–10; `#0b2540` is **not** one of the `src/styles.scss` colour tokens | A pre-existing small inconsistency; the night/identity palette must not inherit it silently |
| No `font: display=swap`-style network loading exists | No font `<link>` in `index.html`; fonts are emitted by the build | `font-display` behaviour is whatever `@fontsource` sets; MC-04 must record the effective `font-display` and verify FOIT/CLS is acceptable |

### 4.3 Recommendation: keep, extend or replace?

**PROPOSED recommendation: KEEP DM Sans + Manrope and EXTEND them with an instrument numeric
treatment. Do not adopt a new typeface in MC-04 unless a verification test fails.**

| Option | What it means | Licence/cost implication | Recommendation |
| --- | --- | --- | --- |
| **A. Keep + extend** | Keep both families; define numeric/tabular role, label role, unit role and instrument sizes; document fallbacks | No new font, no purchase; must still record the licence that ships with the installed `@fontsource` packages | **Recommended for MC-04**, conditional on §4.8 checks passing |
| **B. Audited open alternative** | If `tnum`/glyph coverage fails, evaluate one open-licensed instrument-grade sans | Licence verification + supply-chain review + font payload budget; no purchase without authorization | Only as a fallback, with recorded evidence |
| **C. Commercial typeface** | Commission or license a bespoke/commercial family | Requires human budget authorization, procurement and legal review — outside MC-04 authority | **Rejected for MC-04.** Not proposed here and no purchase may be initiated by an agent |
| **D. Custom wordmark lettering** | Draw `MAREA` letterforms as artwork independent of the UI font | Adds originality risk and maintenance cost; still requires an originality check | Only after the professional check advises it; not a default |

**Why keeping is the professional choice, not the lazy one.** This is a provenance-scarce programme
(OPEN-MARINE ownership unresolved; no clearance; no budget for identity spend). Replacing a
self-hosted, already-licensed, site-consistent stack would add legal, supply-chain and performance
risk with no evidence that the current families are the problem. The observed problem is **numeric
discipline**, not the typeface.

### 4.4 Hierarchy and roles

| Role | Family / weight | Size (web) | Size (instrument, PROPOSED) | Tracking | Constraints |
| --- | --- | --- | --- | --- | --- |
| Display / hero | Manrope 500–700 | `clamp()` 42–58 px (existing) | n/a | −0.02 em, only ≥ 28 px | Never in instrument chrome |
| Section heading | Manrope 600 | 24–30 px | n/a | −0.01 to −0.02 em | Title case; sentence case preferred for ES |
| Product/family lockup | Manrope 800 | 20–22 px (existing brand line) | n/a | existing −0.9 px may be revisited in MC-04 | The wordmark is the only lettering in the identity |
| Body / long copy | DM Sans 400 | 15–16 px, line-height 1.6 | 16–18 px equivalent | 0 | Measure ≤ 75 characters |
| UI label / control | DM Sans 500–600 | 12–14 px | 12–14 px equivalent | 0 | Sentence case preferred; no all-caps sentences |
| Micro-label / eyebrow | DM Sans 700 | 10–12 px | 11–13 px equivalent | +0.08 em, uppercase | Use sparingly; Spanish accents must remain legible at 10 px |
| **Instrument numeric** | DM Sans 700, tabular | 48–72 px primary; 28–40 px secondary | ≈ 18–24 mm primary, 8–14 mm secondary at 0.6–0.9 m | **0** | Tabular figures mandatory; units separate |
| Unit / suffix | DM Sans 500 | 0.6× value size, tracked +0.08 em, uppercase | 0.6× value size | +0.08 em | Never inherits numeral tracking |
| Metadata / provenance | DM Sans 400–500 | 11–12 px | 10–12 px equivalent | 0 | Must meet 4.5:1; timestamps tabular |
| Alert text | DM Sans 600 | 14–16 px | 14–18 px equivalent | 0 | Sentence case, never colour-only, never all-caps |

**Decision required in MC-04:** the wordmark case (uppercase vs title case) and whether Manrope is
used for the wordmark or a dedicated drawn wordmark is used. Either is acceptable; leaving it
undecided is not.

### 4.5 Numeric and tabular requirements (non-negotiable)

| # | Requirement | Why | Verification |
| --- | --- | --- | --- |
| N-1 | Tabular figures for every value that can change in place: speed, depth, heading, bearing, distance, coordinates, voltage, current, battery %, temperature, timers, percentages, prices in tables | Proportional digits make values jitter and shift alignment at every update | Measure digit advance widths in the rendered browser; equality within 1 sub-pixel tolerance; screenshot of a live-updating prototype |
| N-2 | `font-variant-numeric: tabular-nums` declared in the numeric role; `font-feature-settings: 'tnum' 1` only if the exact build supports it and it is verified | The CSS property is the portable declaration; raw feature settings can silently do nothing | OpenType feature inspection + rendered width test in MC-04 (current `src/` has **no** numeric declaration — VERIFIED 0 matches) |
| N-3 | Proportional figures allowed only in prose, marketing headlines and non-numeric UI text | Keeps data strict and prose natural | Style-role audit |
| N-4 | No `letter-spacing` on digits or units; reserve the worst-case string width instead | Tracking destroys tabular alignment; layout shift is a safety/legibility issue | Worst-case layout test (3-digit bearing + sign + decimal) |
| N-5 | Locale number formatting via `Intl.NumberFormat`: `1.234,5` in ES/PT/FR; `1,234.5` in EN. Decimal separator is a locale fact, not a design choice | Mixing separators is a factual error in a readout | Locale test matrix |
| N-6 | Bearings: three digits, zero-padded, integer, degree sign attached (`045°`), `T`/`M` suffix explicit (`045° T`, `045° M`); never rely on position or colour to distinguish true/magnetic | Ambiguity in bearing reference is a navigation error | Readout spec + review |
| N-7 | Units: separate span, non-breaking space before the unit, 0.6× size, uppercase, never merged into the numeral (`6,4 kn`, `18,5 °C`, `12,6 V`) | Prevents reflow and misreading | Component spec + screenshot |
| N-8 | Negative values use U+2212 minus (`−`), not hyphen; minus sign width reserved | Typographic correctness and alignment | Font glyph check |
| N-9 | Decimal precision defined **per data class**, not per screen: PROPOSED — speed 1 decimal; depth 1 decimal (0.1 m); wind speed 1 decimal; wind angle integer; heading integer; temperature 1 decimal; battery integer %; voltage 2 decimals; current 1 decimal; lat/lon degrees + minutes with fixed decimals; time 24 h `HH:MM` | Derived from marine conventions, **not** from a measurement; MC-04 must have engineering confirm the precision each source can actually support | Data-class table approved by product/engineering |
| N-10 | Time: 24-hour, `HH:MM` (no AM/PM); UTC and local time explicitly labelled where both could appear | Marine/fleet users work across zones | Readout spec |
| N-11 | No scientific notation, no thousands separators and no symbol-only units inside readouts; no stacked fractions | Illegible at a glance and in sunlight | Readout spec |
| N-12 | Values never freeze silently: every live value carries an age/state signal (§7.4) in tabular digits | A stale number that looks live is the most dangerous visual failure in the system | State matrix + review |

### 4.6 Multilingual diacritics (ES / PT / EN / FR, plus GL review)

| Locale | Required glyphs | Representative strings | Pitfalls to test |
| --- | --- | --- | --- |
| ES | á é í ó ú ü ñ ¿ ¡ | `Marea alta`, `Profundidad`, `Babor`, `Estribor`, `Rumbo 045°`, `6,4 kn`, `18,5 °C`, `¿Actualizar?` | `ñ` spacing and cap-height; `¿`/`¡` at small sizes; uppercase `Á É Í Ó Ú Ñ` clipping; accent on `ü` in `pingüino` |
| PT | á â ã à é ê í ó ô õ ú ç | `Maré`, `Profundidade`, `Estibordo`, `Rumo`, `6,4 nós`, `18,5 °C` | `ã`/`õ` tilde collision; `ç` cedilla at 10 px; `â/ê/ô` carets |
| EN | ASCII | `Depth`, `Heading`, `6.4 kn` | Decimal point vs comma; unit abbreviations (`ft`, `NM`, `kn`) |
| FR | é è ê ë à â î ï ô û ù ç œ æ | `Marée`, `Profondeur`, `Bâbord`, `Cap`, `6,4 nd` | `œ`/`æ` ligature width; stacked accents (`ê`, `ë`); French spacing before `:` and `;`; avoid clipping at 11 px |
| GL (Galicia — review requested) | á é í ó ú ü ñ | `Marea`, `Profundidade`, `Babor` | Same families as ES/PT; **all GL strings must be reviewed by a Galician speaker in MC-06+; this brief does not assert GL copy** |

Rules:

1. Test every role at 10, 12, 14, 16, 28, 48 and 72 px with the worst-case strings above; **no
   clipped accents**, no collisions with the line above, no faux accents.
2. Uppercase micro-labels keep their accents (`MÁREA` is wrong as a name — `MAREA` is the name and has
   no accent; but Spanish UI labels such as `PROFUNDIDAD` must render accents correctly if sentence
   case is used).
3. Do not synthesise italics or weights: use real variable axes from the installed families; no
   `font-synthesis`.
4. Set `lang` correctly on every document and on mixed-language strings; assistive technology and
   hyphenation depend on it.
5. Units and numbers are never broken across lines; use non-breaking spaces.
6. If a glyph is missing, the fallback must be an explicit, documented stack (`system-ui` first, then
   platform sans) — never a silent tofu box, never a network fetch.

### 4.7 Typeface licence verification rule (hard gate for MC-04)

No typeface is adopted, kept as an official brand font, embedded in a print template or redistributed
until **all** of the following are recorded in the MC-04 delivery:

| # | Evidence | Where it lives |
| --- | --- | --- |
| T-1 | Licence name and version (e.g. SIL OFL 1.1, Apache 2.0, commercial) and the exact licence file shipped with the installed package | `node_modules/@fontsource-variable/*/LICENSE*` read in MC-04; recorded verbatim in the delivery |
| T-2 | Copyright holder and source URL; no claim that a font is "free" without reading its licence | Delivery evidence table |
| T-3 | Installed package version and lockfile integrity (no unrecorded upgrade) | `package-lock.json` reference + version |
| T-4 | Self-hosting verified: no external font origin in the built output | Build output inspection; `grep` for font origins |
| T-5 | Glyph coverage verified for ES/PT/FR/EN (+GL review) at all required sizes | Coverage test (§4.6) |
| T-6 | Numeric features verified (`tnum`, optional `zero`) in the exact build | Rendered measurement |
| T-7 | Font transfer bytes and `font-display` behaviour measured against the existing performance budget | `npm run test:performance` records font transfer bytes; comparison reviewed by the Lead |
| T-8 | Embedding permission for PDF/print (installer certificates, datasheets, packaging) reviewed before generating PDFs | Licence terms + delivery note |
| T-9 | If a new typeface is proposed: written licence record, no purchase without human authorization, Lead supply-chain review | Separate task, not MC-04 |
| T-10 | Reserved font names / modification clause respected: if the wordmark uses modified lettering, the modified font is not redistributed as the original name | Licence terms + artwork note |

**No purchase of a typeface, font licence or stock is authorized by this brief.** Any new font is a
separate decision with a named human approver and a recorded licence.

### 4.8 Concrete numeric-style proposal (PROPOSED, not implemented)

```css
/* PROPOSED for MC-04 documentation only — not added to src/ by MC-03 */
.instrument-value {
  font-family: var(--body);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1; /* only after verification in the exact build */
  letter-spacing: 0;
  line-height: 1;
}
.instrument-unit {
  font-size: 0.6em;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
}
```

MC-04 must verify this renders as intended in the installed DM Sans build **before** writing it into
any specification that another milestone will implement.

---

## 5. Colour

### 5.1 Principles

1. **Colour is a role system, not a decoration.** Every colour exists because a role needs it:
   canvas, surface, primary data, secondary data, action, critical, warning, safe, stale/offline,
   focus, disabled.
2. **Data is ink, not accent.** Critical numeric readouts use the darkest ink, not the brand accent;
   accent chroma is scarce and reserved for action and state.
3. **Colour never carries meaning alone** (`WCAG 2.2` 1.4.1). Every state also has a shape/icon, a
   text label and (where relevant) a pattern or position.
4. **One palette family.** Night mode is a *mode of the same roles*, not a second brand palette. No
   parallel token set with different semantics.
5. **Modes are separate token sets, not a CSS filter.** Do not derive night mode by inverting or
   hue-rotating the light palette; contrast and alert semantics fail that way.
6. **Measure, don't claim.** Every ratio in this section is a computed sRGB ratio; MC-04 must
   re-measure rendered output and record the method.

### 5.2 Current tokens and measured contrast (VERIFIED values, computed ratios)

Computed on 2026-10-30 with the WCAG 2.2 relative-luminance formula on the solid hex pairs below
(sRGB, no alpha). These are **design-review measurements**, not a conformance claim for the live site.

| Token | Value | Role today | Measured on `#ffffff` | Measured on `#f2f9fd` |
| --- | --- | --- | ---: | ---: |
| `--navy` / `--ink` | `#17365d` | Headings, ink, nav | **12.19:1** | **11.46:1** |
| `--navy-2` | `#24517c` | Secondary dark | 8.26:1 (white on it) | — |
| `--sea` | `#1776ad` | Accent links, eyebrows | 4.96:1 | 4.67:1 |
| `--sea-strong` | `#176ca6` | Strong link/action | 5.63:1 | — |
| `--sea-button` | `#1b6f9f` | Button fill (white text) | 5.50:1 (white on fill) | — |
| `--mist` | `#f2f9fd` | Section/surface background | 1.06:1 | — |
| `--sky` | `#eaf7ff` | Tint background | 1.09:1 | 1.03:1 |
| `--muted` | `#57708a` | Secondary text | 5.13:1 | 4.83:1 |
| `--line` | `#e1edf5` | Borders (decorative) | 1.19:1 | 1.12:1 |
| `--danger` | `#b4423a` | Error/alert | 5.55:1 | 5.55:1 (white on it) |
| `--ok` | `#27775c` | Success | 5.41:1 | — |
| focus outline | `#8fd2f5` (from `:focus-visible`) | Focus ring | **1.65:1** | **1.55:1** |
| `index.html` theme | `#0b2540` | Browser chrome | 15.52:1 | — |

**Findings that MC-04 must carry forward (not fix silently in a brief):**

- **F-1 — Focus ring contrast.** The current 3 px focus outline `#8fd2f5` on `#ffffff` measures
  **1.65:1** and on `#f2f9fd` **1.55:1**, below the 3:1 non-text contrast expectation for UI
  state indicators (WCAG 2.2 SC 1.4.11; see also 2.4.11). Axe does not automatically flag focus-ring
  contrast, so this is a **manual finding**. MC-04 must propose a compliant focus colour (candidate
  `#0f5f8c` = 6.92:1 on white, 6.50:1 on mist) and MC-06 must implement it after review. This is a
  pre-existing site-identity issue, not a MAREA-only one.
- **F-2 — `--line` is decorative.** At 1.19:1 it can never be the only cue for an interactive
  boundary, an input edge or a card that must be distinguishable. Inputs and controls need a
  ≥ 3:1 boundary or a filled surface difference.
- **F-3 — theme-colour drift.** `#0b2540` (browser chrome, icon/OG artwork) is not a token in
  `src/styles.scss`; the identity system must define the browser-chrome colour explicitly rather
  than inheriting an art file.
- **F-4 — semantic colours stop short of the internal cockpit target.** `--danger` (5.55:1) and
  `--ok` (5.41:1) pass AA for text but are below the ≥ 7:1 internal target for cockpit-critical
  values; the proposed instrument variants in §5.3 are deeper and measured ≥ 7:1.

The `#2bb3c0` teal used in `scripts/icon.html` and `scripts/og.html` is **not** a `src/styles.scss`
token either; it is a second, informal palette. The identity system must not perpetuate it as a brand
accent without a decision (§12, open question OQ-3).

### 5.3 Role model and PROPOSED instrument palette

Day/light values extend existing tokens where possible. Night values are **new** (the website remains
light; night is a product-software mode, per `WEBSITE-AND-ROADMAP.md` §2). All new values are
**PROPOSED candidates**, measured on the stated pairs, to be validated in MC-04 and implemented only
in MC-06+.

| Role | Day / light value | Measured | Night value | Measured on `#0d1b26` | Rule |
| --- | --- | --- | --- | ---: | --- |
| Canvas — web | `#ffffff` (`--paper`) | — | Website has no night mode | — | Website stays light; night is software only |
| Canvas — instrument day | `#f2f9fd` (`--mist`) | — | `#0d1b26` (PROPOSED) | — | Instrument day canvas is a surface, not a page |
| Surface / panel | `#ffffff` / `#eaf7ff` | — | `#132733` (PROPOSED) | — | Surface steps are subtle (measured 1.03–1.14:1); a boundary that must be *seen* needs an explicit border, label or offset, not a luminance step |
| **Primary data** | `#17365d` (`--navy`) | 12.19:1 / 11.46:1 | `#8fd3f5` (PROPOSED) | 10.65:1 | Numerals and primary labels only |
| Secondary data | `#57708a` (`--muted`) | 5.13:1 / 4.83:1 | `#93a6b5` (PROPOSED) | 6.96:1 | Context labels, provenance |
| Action / interactive | `#176ca6` (`--sea-strong`) | 5.63:1 | `#8fd3f5` | 10.65:1 | Links, buttons; never identical to alert |
| **Critical / alarm** | `#a32b22` (PROPOSED, deeper than `--danger`) | 7.18:1 on white; 6.75:1 on mist; 7.18:1 white-on-fill | `#ff9b8f` | 8.60:1 | Requires icon + label + shape; never colour alone |
| **Warning / caution** | `#8a5a00` (PROPOSED) | 5.93:1 / 5.57:1 | `#ffc46b` | 11.12:1 | Amber-brown, not bright yellow; icon + label |
| **Safe / normal** | `#1f5f49` (PROPOSED, deeper than `--ok`) | 7.52:1 / 7.07:1 | `#7bd8b0` | 10.23:1 | "Normal" is a *state*, not a badge |
| **Stale / offline / no-data** | `#5f6f7d` (PROPOSED) | 5.18:1 / 4.87:1; 4.74:1 on `--sky` | `#a9b7c4` | 8.53:1 | Plus age counter, dashed/hatched treatment, text label |
| Focus indicator | `#0f5f8c` (PROPOSED) | 6.92:1 / 6.50:1 | `#8fd3f5` on `#132733` | 9.38:1 | ≥ 3:1 against adjacent colours; never remove outline |
| Border / divider | `#e1edf5` (decorative only) | 1.19:1 | `#22384a` (decorative) | 1.44:1 | Never the sole cue (§5.6, F-2) |
| Disabled | `--muted` at reduced opacity but ≥ 3:1 against its surface, plus a non-colour cue (label, icon) | VERIFY | same rule | VERIFY | Disabled controls must still be perceivable; do not rely on opacity alone |

**Do not read the table as approval.** It is a measurement-backed starting point. MC-04 must re-measure
rendered output (including anti-aliasing and translucency) and record evidence; no value above is
implemented or committed.

### 5.4 Modes: day, sunlight, night

| Mode | Where it applies | Design intent | Constraints |
| --- | --- | --- | --- |
| **Web light** (default) | Corporate site, product pages, docs | Current navy/sea/mist identity; calm, generous | Stays light; not a dashboard; no dark theme implied |
| **Software day** | App/NAV/DISPLAY daytime, bridge daylight | High luminance surfaces, dark ink, maximum contrast; matte rendering | Primary data ≥ 7:1; no gradient behind data; no translucent panels |
| **Sunlight** | Same surfaces under high ambient light + glare | Same role mapping, stronger contrast and heavier strokes; reduce chroma reliance | No WCAG equivalent; engineering target; **hardware validation BLOCKED** (no display exists). State this limitation in every claim |
| **Night** | App/NAV/DISPLAY at night, watchkeeping | Low-luminance canvas (`#0d1b26`), subdued foreground, no pure black/white | Preserve role semantics; no hue shift that changes a warning into a "calm" colour; dimming must have a floor where alerts stay perceivable |
| **Night-red (research only)** | Possible helm option | Long-duration dark adaptation | **Not required, not promised.** If ever evaluated, it must be validated with users and hardware, and alerts must remain distinguishable without hue (§5.7) |

Mode rules:

1. Mode is an **operational control** in software (day/night/sunlight presets), not only an OS
   preference; `prefers-color-scheme` may set the initial default but must not be the only switch.
2. Never mix tokens from two modes on one surface (e.g. day surface + night text).
3. Brand colour (navy/sea) is not a data colour in night mode; night data colours are the role values
   above.
4. The browser `theme-color` meta and the `<meta name="color-scheme">` declaration must match the
   rendered mode of the page; do not leave a mismatch (F-3).
5. Every mode must be screenshot-tested at 390/768/1440 widths for web, and at the target display
   resolutions for software once hardware exists (BLOCKED).

### 5.5 Contrast targets

| Element | WCAG 2.2 AA minimum | Internal MAREA target (stricter) | Notes |
| --- | --- | --- | --- |
| Normal text (< 24 px / < 18.66 px bold) | **4.5:1** | ≥ 5:1 | ES/PT/FR accents make thin text harder; do not go below 4.5:1 |
| Large text (≥ 24 px or ≥ 18.66 px bold) | **3:1** | ≥ 4.5:1 | Headings still read in sunlight |
| UI components, states, focus, graphical objects required to understand content | **3:1** (1.4.11) | ≥ 3:1, focus ≥ 4.5:1 | Focus ring currently fails (F-1) |
| **Cockpit-critical numeric readouts** | 4.5:1 (text) | **≥ 7:1** | Internal safety-of-reading target; not a WCAG claim |
| Instrument graphics (scales, trend lines, targets) | 3:1 (1.4.11) | ≥ 4.5:1 | Plus shape/label redundancy |
| Disabled / inactive | Exempt, but must remain perceivable | ≥ 3:1 against surface | Do not use "invisible" disabled states |
| Print (datasheets, packaging labels, certificates) | No WCAG applicability | Ink on substrate designed for ≥ 70% reflectance contrast, min 7 pt body / 9 pt critical labels | Validate with print proofs; no claim before printing |

**Ceiling note.** The 7:1/internal figures are our own engineering targets, not a claim that a surface
"meets AAA" or is certified. Record measured evidence, not adjectives.

### 5.6 Colour never carries meaning alone — required state encoding

Every instrument state must remain identifiable **in greyscale** and without hue. Required
redundancy per state:

| State | Colour role | Shape / icon | Text label | Additional cue |
| --- | --- | --- | --- | --- |
| Normal / safe | safe green | filled circle or check-less dot | `OK` / `Normal` (localised) | steady; no animation |
| Advisory / info | neutral ink | `i` in circle or outlined square | short sentence | steady |
| Caution | warning amber | triangle with `!` | `Caution` + cause | steady; optional 1 Hz max pulse if reduced-motion allows |
| Warning | warning amber/deep amber | triangle with `!` + border weight | `Warning` + cause | persistent banner; audible optional (never sole) |
| Alarm / critical | critical red | octagon or triangle with solid fill | `Alarm` + cause + required action | persistent until acknowledged; no auto-dismiss |
| Stale / offline | stale grey | dashed outline / clock-and-slash | `STALE 00:12` / `OFFLINE` | age counter in tabular digits; value visually attenuated **but still readable** |
| No data / unavailable | stale grey | hollow square / em dash | `—` + `NO DATA` | never a zero, never a frozen last value |
| Disabled | muted | reduced but visible | label remains | never colour-only |

Rule: **remove colour and the state must still be unambiguous.** A screenshot converted to greyscale
must pass this test before any instrument screen is accepted.

### 5.7 Colour-blind safety

| Requirement | Detail |
| --- | --- |
| Simulation set | Deuteranopia, protanopia, tritanopia and achromatopsia (greyscale). Simulation method and images recorded in MC-04 evidence |
| No red–green-only pairs | Critical vs safe must differ in luminance, shape, icon and text — not only hue |
| Alert ladder in greyscale | Alarm, warning, caution, normal, stale must remain distinguishable by shape/label/pattern in greyscale |
| Charts and tracks | Do not encode categories by hue alone; use line style (solid/dashed/dotted), marker shape and direct labels. No rainbow colour maps; use a single-hue luminance ramp with labelled values |
| AIS/targets | Own vessel, other vessels, lost targets and selected targets each need a non-colour cue (marker shape/direction/outline/label). Receive-only AIS disclaimers are part of the same screen (§7.7) |
| Data provenance | Fresh vs stale is not a green/red decision; age text and dashed treatment carry it |
| Test evidence | Simulated screenshots at day and night, plus greyscale conversion, recorded under the asset/evidence log; acceptance reviewer ≠ author |
| Limit | No claim of "colour-blind safe" as a certification; state the tested simulations and their results |

### 5.8 Sunlight and night implementation notes

- **Sunlight:** matte, high-luminance backgrounds; dark ink; avoid pure chroma accents on small
  elements; increase stroke weights and reduce hairline separators; avoid thin light-on-dark text for
  critical data. Glare tests require hardware — **BLOCKED**; use simulated high-luminance review and
  state the limitation.
- **Night:** no `#000` background and no `#fff` foreground (halation); night surface luminance is
  clamped (`#0d1b26` proposed); alerts keep a perceivable floor while dimming; no bright white
  full-screen flashes; motion and animation reduced or disabled at night.
- **Neither mode may use transparency over data.** No glassmorphism, no blurred chart overlays, no
  gradient behind numbers.
- **No themed website night mode** as part of this identity: the site stays light. Do not add
  `prefers-color-scheme` dark variants to the corporate site as a side effect of the instrument work.

### 5.9 Data-colour conventions (and what not to imitate)

| Data class | Colour intent (PROPOSED) | Never |
| --- | --- | --- |
| Own vessel / position | primary data ink + solid marker | Official chart symbology or ECDIS S-52 palette (see §7.7) |
| AIS targets | secondary ink; selected target = accent outline + label, not a new hue | Red/green target colouring as the only distinction; implied collision-avoidance meaning |
| Tracks / routes | primary ink; active route = accent + label; planned vs actual differ by line style | Rainbow tracks; glowing lines |
| Depth | primary ink for values; trend bars single-hue; shallow threshold = warning role, not a red fill | Truncated axes; gradient "danger zones" without labels |
| Wind | primary ink + directional arrow + numeric; true/apparent distinguished by label (T/A) and arrow weight, not colour alone | Wind rose decoration; colour-only direction |
| Electrical / battery | secondary ink + level shape + % label; state (charging/discharging) by icon+label | Green/red-only battery states; neon "energy" effects |
| Forecast / weather | single-hue luminance ramp with labelled legend; uncertainty band as pattern/texture, not colour-only | Rainbow heatmaps; dramatic storm imagery to sell safety (§9.4) |

### 5.10 Colour QA (evidence needed in MC-04)

1. Measured contrast table for every foreground/background pair actually used (method + tool).
2. Greyscale and CVD simulation screenshots of a representative instrument screen and a website
   section.
3. Focus-state screenshots showing the indicator against every adjacent surface.
4. Night-mode luminance check (no pure black/white; alert floor).
5. Printed-label proof at 1:1 (ink contrast, minimum type sizes) — **BLOCKED** until print authorization.
6. Reviewer sign-off that no meaning is colour-only.

---

## 6. Marine software vs corporate website vs installer-facing material

### 6.1 Three distinct visual jobs

The identity is one system, but it is used under three different physical and cognitive conditions.
Treating them as one "brand look" is the most common way marine brands become generic.

| Dimension | **1. Marine software** (NAV, FLEET, DISPLAY UI, helm views) | **2. Corporate website** (embarcarte.com, future `/marea`) | **3. Installer-facing material** (datasheets, commissioning sheets, certificates, labels, packaging inserts) |
| --- | --- | --- | --- |
| Viewer and state | Skipper/operator, often standing, one free hand, glare or night, interrupted attention | Boat owner/installer evaluating credibility, at a desk or phone, unhurried | Technician on site, tools in hand, may print in mono, may laminate |
| Primary task | Read a value and decide in seconds | Understand what MAREA is, whether it is credible, what to do next | Fit it, wire it, commission it, record it |
| Visual density | **High but ordered** — a few large values, strict hierarchy | **Low** — generous spacing, one idea per section | **High and technical** — tables, diagrams, checklists |
| Hierarchy | Value → unit → age/source → label; alerts override | Section → heading → proof → CTA; brand attribution | Diagram → callout → step → tick box |
| Typography | Numeric/tabular first; labels second | Display + body, generous measure | Small caps/labels, tabular data, mono-ish for references |
| Colour | Day/night/sunlight modes; semantic states | Light only; navy/sea/mist; restrained chroma | Mostly ink + one spot colour; mono-safe; no gradients |
| Motion | Only meaningful state transitions (≤ 200 ms), reduced-motion respected | Minimal; no decorative animation | None (static print/PDF) |
| Imagery | Charts, diagrams, live data — not stock photography | Concept renders, product illustrations, diagrams, honest photography | Technical illustrations and diagrams only (no lifestyle imagery) |
| Claims risk | Highest: values imply measurement, screens imply function | High: copy implies availability/certification | High: installation implies certification/safety |
| Accessibility | Keyboard/touch, screen reader tables, colour-blind, sunlight | WCAG 2.2 AA web, zoom 200–400%, axe gate | Print legibility, clear language, QR fallback to accessible web docs |
| Success test | Skipper reads the right value at a glance and knows whether it is current | Visitor believes the brand and acts on the correct CTA | Technician completes the step without calling support |
| Failure signs | Dense dashboard, decorative gauges, unlabelled units, stale values frozen | SaaS landing page, gradient hero, badge wall | Tiny grey appendix text, uncaptioned diagrams, fake certification badges |

### 6.2 The shared spine vs the mode tokens

**Shared across all three jobs (must be identical):**

- The identity lockup, clear space and family rules.
- Type families and the numeric treatment (tabular figures, unit style).
- Icon grammar (grid, stroke, metaphor vocabulary).
- Semantic colour roles (alert/warning/safe/stale) — values may differ by mode, meaning cannot.
- Diagram conventions (line weights, dimension annotation, provenance labels).
- Provenance/disclaimer conventions and CONCEPT labelling.
- Accessibility baseline and the "no colour-only meaning" rule.

**Different per mode (must be separately specified):**

| Mode token | Software | Website | Installer material |
| --- | --- | --- | --- |
| Density scale | compact | comfortable | compact/technical |
| Base text size | larger minimums | 15–16 px body | 9–11 pt body |
| Surface/background | day/night/sunlight sets | light token set | paper/substrate |
| Motion | state transitions only | minimal | none |
| Image role | charts/diagrams | concept/product art | diagrams only |
| Alert prominence | persistent banner ladder | inline notices only | checklist emphasis |

**Hard rule:** there is **one** design system. "Website tokens" and "app tokens" are modes of the same
role set, not two identities. Any divergence must be a documented mode token, not an ad-hoc page
override (`.agents/skills/marea-premium-design/SKILL.md` hard rule).

### 6.3 What each job is *not*

- The website is **not** a dashboard: it may show a product UI in a diagram or concept render, but it
  must not present a fake interactive-looking instrument that a visitor could mistake for working
  software. Any UI shown is HTML/CSS/SVG authored by us or explicitly labelled CONCEPT.
- The software is **not** a marketing surface: no gradients, no hero imagery, no sales badges, no
  "subscribe" chrome inside instrument views.
- Installer material is **not** marketing: no lifestyle photography, no slogan, no unverified
  specification. It is a working document with the seller attribution required by
  `BRAND-ARCHITECTURE.md` §4.
- None of the three may present MAREA as a certified, registered or available product.

### 6.4 Relationship to the current live site (migration constraint)

The live site carries the EMBARCARTE identity and is not changed by MC-04. The following constraints
apply to any future adoption and are recorded here so MC-04 designs something that *can* migrate:

1. Existing public URLs, canonical/hreflang pairs and indexed pages must not be broken
   (`WEBSITE-AND-ROADMAP.md` §2; `AGENTS.md` MAREA rules).
2. A new MAREA visual layer would be additive (`/marea`, `/en/marea`), not a replacement of the
   EMBARCARTE corporate surface (`BRAND-AND-IP-DECISION-PACKAGE.md` §5.3).
3. The existing `src/styles.scss` token vocabulary is the migration target; MC-04 must be expressible
   in it (or propose an additive extension with a documented mapping), not introduce a second system.
4. No source change is made in MC-03, and no source change is implied by this document. The audit of
   the current public surface and the migration plan are recorded in
   [`WEBSITE-BRAND-MIGRATION.md`](./WEBSITE-BRAND-MIGRATION.md); that document is the authority on
   what may change in which milestone.

---

## 7. Instrument and dashboard visual expectations

### 7.1 The instrument surface is the brand's proof

A guest at a boat show can be convinced by a logo; an owner at the helm is convinced by a readout. The
instrument surfaces must therefore be treated as the primary brand artefact — stricter than the
website, not looser. They are also the surfaces with the highest claim risk, because a screen that
*looks* like it measures something is read as a factual statement.

### 7.2 Hierarchy and density budgets

| Rule | Budget | Rationale |
| --- | --- | --- |
| Primary readouts per helm "glance" view | **1–2** (max 3 in an emergency state) | A skipper has seconds, not menus |
| Primary + secondary values per "instrument panel" view | ≤ 8 total | Beyond that, hierarchy collapses and the view becomes a dashboard |
| Hierarchy levels | ≤ 3 text levels + 1 alert level | Calm density; more levels mean the design is arguing with itself |
| Chroma accents per view | ≤ 2 semantic accents (plus state colours only when a state is active) | Chroma is a scarce signal |
| Type sizes in one view | ≤ 4 distinct sizes | More sizes = no hierarchy, only noise |
| Touch targets | ≥ 24×24 CSS px (WCAG 2.5.8); internal target ≥ 44×44 for wet/glove use | Gloves and motion; the 24 px figure is a legal floor, not a design target |
| Spacing grid | 4 px base, 8 px rhythm; minimum 8 px between distinct tap targets | Consistency and mis-tap reduction |
| Viewing distance assumptions | Helm display 0.6–0.9 m; phone/tablet 0.3–0.5 m; 7″–12″ display sizes | PROPOSED assumptions; must be validated with hardware — **BLOCKED** |
| One screen, one question | Each view answers exactly one primary question: *Where am I? How deep? What is the wind? Where is that traffic?* | Prevents feature-dumping into "dashboards" |

### 7.3 Layout architecture (zone model)

The same zones apply to a DISPLAY, a tablet/NAV view and a website product visual of the software. The
wireframe is illustrative, not a screen design:

```
┌─────────────────────────────────────────────────────────────┐
│ ALERT BANNER — persistent while a state is active           │
│ [shape icon] CAUSE · REQUIRED ACTION · SOURCE/AGE           │
├─────────────────────────────────────────────────────────────┤
│ PRIMARY READOUT (1–2 values, largest type)                  │
│   6,4 kn                  age 02 s        source: HUB       │
├──────────────────────┬──────────────────────┬───────────────┤
│ SECONDARY A          │ SECONDARY B          │ SECONDARY C   │
│ value unit · label   │ value unit · label   │ value · label │
├──────────────────────┴──────────────────────┴───────────────┤
│ CONTEXT: labels, trend bars, small chart, target list       │
├─────────────────────────────────────────────────────────────┤
│ PROVENANCE STRIP: source · timestamp · mode · data rights    │
└─────────────────────────────────────────────────────────────┘
```

Rules: alerts occupy the top zone and never overlay the primary readout; the provenance strip is
always visible when live data is shown; context never competes with the primary readout for weight;
no nested cards inside cards.

### 7.4 Data freshness and safe stale-data signalling

A stale value that looks live is the most dangerous visual failure this system can produce. Every live
value must carry an age/state signal, and the design must never freeze silently.

| State | Meaning (PROPOSED thresholds — engineering must confirm per data source) | Required visual encoding | Behaviour |
| --- | --- | --- | --- |
| **LIVE** | Update within the source's declared interval (placeholder: ≤ 2 s for 1 Hz sensors) | Value + unit + age in tabular digits; steady state | Normal display |
| **DELAYED** | Late but recent (placeholder: 2–10 s) | Value + age; subtle "delayed" label | Show, do not hide; no alarm unless a product threshold says so |
| **STALE** | Beyond the source's freshness window (placeholder: > 10 s) | Value attenuated but legible; dashed outline; `STALE 00:12` in tabular digits; stale icon | Keep the last value visible **with its age**, never as if current; derived alerts must be marked degraded |
| **OFFLINE** | No link to the source/hub | Persistent offline banner; last-known values labelled "last known"; age always shown | Keep last values with explicit age; no silently zeroed values |
| **NO DATA** | Source absent or never received | Em dash `—` + `NO DATA` label; no fabricated zero | Never substitute 0, `--` ambiguity or a frozen previous value |
| **ERROR** | Source reports a fault | Error icon + cause + source + age | Fault must be distinguishable from stale/offline |

Non-negotiable rules:

1. **Age is always visible** on any view with live data, in tabular digits (seconds, or `mm:ss` for
   longer ages). Age must not require a tap or hover.
2. **A stale value is never styled as live**: no full-strength colour, no animation, no "fresh" dot.
3. **A stale or offline source cannot silently produce derived "safe" conclusions** (for example,
   showing a clear traffic picture when AIS has stopped). The design must surface the degradation;
   the actual safety logic belongs to engineering and product, not to this brief.
4. **Reconnection is visible**: show the recovery and the new timestamp; never jump a value without
   state change.
5. **No silent thresholds**: the numbers above are placeholders, not safety limits, and must be
   confirmed by engineering before any screen is implemented.
6. **No green dot as "everything is fine"**: "normal" is a role, not a claim about the vessel.
7. **Staleness is not an alert:** it is a data-quality state (grey/pattern/age), separate from the
   alert ladder, so a data problem does not masquerade as a navigation hazard.

### 7.5 Units, precision and scale conventions

| Data class | Canonical unit (PROPOSED) | Precision | Scale convention |
| --- | --- | --- | --- |
| Speed (boat, wind, target) | `kn` (knots) | 1 decimal | Linear; trend arrow with window + delta, e.g. `↑ 0.4 kn / 5 min` |
| Depth | `m` (metres); `ft` only if a verified product requirement exists | 1 decimal (0.1 m) | Linear trend, zero baseline; shallow threshold labelled with its numeric value and source |
| Heading / bearing | `°` with `T`/`M` suffix | integer, 3 digits zero-padded | Circular 000–359; no 360/0 ambiguity; no truncated-scale gauges |
| Wind angle | `°` relative/true/apparent explicitly labelled | integer | Circular; T/A distinguished by label and arrow style, not colour alone |
| Position | lat/lon degrees + decimal minutes | fixed decimals (engineering to confirm) | Fixed-width tabular; hemisphere letters explicit |
| Distance / range | `NM` (nautical miles) | 1–2 decimals by magnitude | Linear; no implied measurement accuracy |
| Temperature | `°C` | 1 decimal | Linear; no colour-only hot/cold |
| Electrical | `V`, `A`, `Ah`, `W` | voltage 2 decimals; current 1; energy as defined | Linear; state (charging/discharging) by icon + label |
| Battery / tank | `%` | integer | Linear fill with % label; no colour-only state |
| Time / age | `HH:MM` 24 h; age in `s` / `mm:ss` | seconds | Tabular; UTC/local explicitly labelled |
| Forecast horizon | `h` / date-time | as source | Validity window displayed; not a "guarantee" |
| Scale bar (any chart-like view) | `NM` / `m` | as appropriate | Explicit unit and "illustrative — not for navigation" label |

Rules: no dual axes; no truncated axes (start at zero) except a documented instrument convention with
an explicit range label; no logarithmic axes in instrument readouts; no colour thresholds without
numeric thresholds and a source; no gauge that implies a certified measuring instrument.

### 7.6 Alert severity ladder

Four levels, fixed across software, packaging and documentation. Severity is never communicated by
colour alone.

| Level | Priority | Visual encoding | Persistence | Acknowledgement | Sound |
| --- | --- | --- | --- | --- | --- |
| **1 — Advisory / info** | Lowest | Outlined info icon + neutral ink + short sentence | Dismissible; auto-expires if the condition clears | Not required | Optional, off by default |
| **2 — Caution** | Rising | Amber triangle `!` + label + cause; ≤ 1 Hz pulse **only** if reduced-motion allows | Persists while active; dismissible only to a summary | Recommended | Optional, quiet |
| **3 — Warning** | High | Amber/deep-amber triangle with heavier border + cause + required action | Persistent banner until condition clears or is acknowledged; acknowledgement does not hide the condition | Required | Yes, distinct pattern |
| **4 — Alarm / critical** | Highest | Red octagon (or solid red triangle) + cause + required action + source/age | **Never auto-dismissed.** Acknowledge to silence audio only; banner and state remain until the condition clears | Required, logged | Yes, escalating pattern; never the only indicator |

Rules:

1. Every alert has **cause + required action + source/age**. "Error" with no cause is prohibited.
2. **No modal that blocks the helm**; no full-screen takeover except an explicit, documented critical
   condition that engineering defines.
3. **No flashing above 3 Hz** (WCAG 2.3.1); respect `prefers-reduced-motion`; at night, reduce or
   disable pulsing.
4. **Acknowledgement ≠ resolution.** The design must show both "acknowledged" and "still active".
5. **Audible alerts are never the only channel** (hearing/environment); visual and haptic alternatives
   must be specified where hardware supports them.
6. **No safety-sounding labels**: no "safe", "protected", "clear", "collision-free" as states of the
   vessel. "Normal" describes a signal, not the sea.
7. **Alert copy is localised** (ES/EN at minimum) and must not be generated as image text (§4.1).

### 7.7 Prohibited styling: no implied navigation-safety guarantee, no ECDIS-equivalence

This is a hard design rule, not a stylistic preference:

| Prohibited | Why | Allowed alternative |
| --- | --- | --- |
| Official chart look (IHO S-52-style colour tables, ENC legend, official symbol library) | Implies ECDIS/official chart status; explicitly forbidden by claims policy §2 Class P | Own illustration language, clearly labelled illustrative, with provenance and disclaimers |
| "ECDIS-class", "ECDIS-equivalent", "navigation-grade", "approved for navigation" wording or visual cues | Misstates regulatory status | "Navigation aid" language only, with the mandated disclaimer |
| Certification/approval badges, seals, shields, checkmark-on-chart | Implies certification that does not exist | Plain status text and evidence links where true |
| Safety guarantees ("safe route", "avoid collisions", "guaranteed detection") | Legally and technically false | Factual state + limitations + required disclaimers |
| Simulated measurements that look real (accuracy figures, tolerance bands, "±0.1 kn") | Becomes a performance claim without evidence | No numbers without an evidence reference |
| Fake or official-looking chart data in mock-ups | Confuses prototype with product | Clearly fictional, labelled illustrative data; no copyrighted chart reproduction |
| AIS presented as complete traffic awareness | AIS is receive-only and incomplete | "Receive-only · not all vessels transmit AIS" statement on every AIS surface |
| PILOT presented as autonomous or remote | PILOT is supervised-only by design | Manual takeover and physical E-stop shown as design boundaries; supervised wording |
| Weather presented as certain | Forecasts are probabilistic | Source, timestamp, validity window, uncertainty language |

**Mandatory disclaimer text (verbatim from `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9; localise, do not
paraphrase).** These are not "legal boilerplate to hide" — the instrument design must allocate visible
space for them and make them reachable in one interaction:

- Navigation / instruments — ES: «Este producto es una ayuda a la navegación y no sustituye a la carta
  náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen
  hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
  EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's
  required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always
  rests with the skipper."
- AIS (receive-only) — ES: «La recepción AIS es únicamente de escucha: no todos los buques emiten AIS.
  No constituye un sistema de evitación de colisiones ni un transpondedor.»
  EN: "AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance
  system and not a transponder."
- PILOT (supervised steering) — ES: «El sistema de gobierno es asistido y supervisado: exige vigilancia
  y capacidad de toma de control manual en todo momento. No permite gobierno autónomo ni control
  remoto sin supervisión.»
  EN: "The steering system is assisted and supervised: it requires continuous watchkeeping and the
  ability to take manual control at all times. It does not provide autonomous steering or unattended
  remote control."
- Weather — ES: «Las previsiones son probabilísticas y pueden desviarse de las condiciones locales
  reales. Se muestra la fuente y la hora de cada dato.»
  EN: "Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp
  are displayed for every data point."

**No design may add a safety claim that the disclaimer then has to negate.** If a surface needs a
disclaimer to be safe, the surface is wrong.

### 7.8 Instrument skin token specification (MC-04 deliverable, not implemented here)

MC-04 must deliver a **role-named token specification** (documented table + optional JSON file under
`docs/marea/brand/`), consumable by MC-06. It must not be colour-named (no `--blue-500`), and it must
map onto the existing web token vocabulary where roles coincide. Required groups:

| Group | Example roles (names only; values decided in MC-04) |
| --- | --- |
| Surfaces | `--inst-canvas`, `--inst-surface`, `--inst-surface-raised`, `--inst-overlay-scrim` |
| Text | `--inst-text-primary`, `--inst-text-secondary`, `--inst-text-meta`, `--inst-text-on-accent` |
| Data | `--inst-data-primary`, `--inst-data-secondary`, `--inst-data-chart-line`, `--inst-data-chart-grid` |
| Semantic state | `--inst-state-critical`, `--inst-state-warning`, `--inst-state-safe`, `--inst-state-stale`, `--inst-state-info` |
| Interaction | `--inst-action`, `--inst-action-hover`, `--inst-focus-ring`, `--inst-disabled` |
| Typography | `--inst-font-numeric`, `--inst-size-readout-primary/secondary`, `--inst-label-size`, `--inst-unit-size`, `--inst-feature-numeric` |
| Density/spacing | `--inst-space-1..6`, `--inst-gap-alert`, `--inst-gap-provenance` |
| Shape/stroke | `--inst-radius-control`, `--inst-radius-surface`, `--inst-stroke-icon`, `--inst-stroke-chart` |
| Motion | `--inst-motion-state`, `--inst-motion-alert-max-hz` |
| Modes | Day, sunlight, night value sets for every role above (same names, different values) |

Constraints: instrument control radii are small (target 2–4 px); surfaces target 4–8 px; pill shapes
only for status chips with text, never for primary actions; one elevation level for overlays only
(no decorative shadows); no gradients in any token.

### 7.9 Accessibility in instrument views

- **Continuous values are not live-announced.** Bind continuous readouts with `aria-live="off"` and
  provide an on-demand accessible summary; announce alarms with an appropriate live region
  (`role="alert"` only for level 3–4, polite for lower levels).
- **Accessible name includes unit and age**: e.g. "Speed 6.4 knots, 2 seconds old" — a bare number is
  meaningless to a screen-reader user.
- **Charts and graphs have a data-table equivalent** and a text summary; colour/shape cues are
  described in the alternative text.
- **Keyboard and focus**: focus order follows visual order; focus is visible with ≥ 3:1 indicator
  (F-1); no focus traps; overlays restore focus on close.
- **No motion-only information**: reduced motion respected (`prefers-reduced-motion`), no flashing
  above 3 Hz, no auto-updating chart animations required to understand a value.
- **Text scaling**: 200% without loss of content; instrument labels wrap rather than clip.
- **Touch and physical controls**: 24×24 minimum (WCAG), 44×44 internal target for wet/glove; physical
  controls have tactile differentiation (see §8.6).
- **Mode is explicit**: day/night/sunlight is an accessible control with a non-colour indicator, not a
  hidden gesture.
- **No hearing-only alerts**: visual equivalent for every sound; no visual-only critical path either.

### 7.10 Acceptance tests for an instrument view

A view is not accepted in MC-04/MC-06 unless all of the following are evidenced:

1. Worst-case data layout: 3-digit bearing, negative temperature, long unit string, stale state,
   offline state — no overlap, no clipping, no font-size jump.
2. Greyscale screenshot: every state is still distinguishable; no meaning is colour-only.
3. CVD simulation screenshots (protan/deutan/tritan) for alert, AIS and depth states.
4. Contrast measurement table for every foreground/background pair used, with measured values.
5. Stale/offline/no-data demonstration: age visible, values attenuated, no silent zeros.
6. Alert ladder demonstration: four levels, acknowledgement vs resolution, persistence, no
   auto-dismissed alarm.
7. Required disclaimers present and reachable (ES/EN) on every surface they apply to.
8. Keyboard/screen-reader walkthrough notes (values with units/age; table alternative for charts).
9. Night simulation review: no `#000`/`#fff`, alert floor, no glare, no bright flashes.
10. Reviewer independent of the author signs the evidence log.

---

## 8. Hardware product styling direction

### 8.1 Status of this section

This is **CMF/industrial-design direction only** (`CMF` = colour, material, finish). It is not a
mechanical design, not a material specification, not a manufacturing instruction, not a certification
and not a promise of a physical product. MAREA hardware does not exist as a certified product
(`COMMERCIAL-PORTFOLIO.md` lifecycle CONCEPT/DEFINED). Every target below requires engineering,
test evidence and (where applicable) conformity assessment before it may be stated anywhere publicly.

### 8.2 Family design language

One **bezel family** across DISPLAY, HUB, AIS, SENSE, WATCH and PILOT control heads — recognition by
proportion, front-face geometry, control layout and typographic plate, not by a different logo per
product:

- shared front-face geometry: uniform bezel width, consistent corner treatment, one glass/polycarbonate
  inset plane, one gasket line;
- shared control logic: same minimum key set and same rotary affordance where a rotary exists;
- shared typographic plate: `MAREA` wordmark, family name, edition/model, serial, safety symbols;
- consistent rear connector field: same labelling grammar and same cable-gland family;
- PILOT is the exception in one respect only: its E-stop and takeover controls must be unmistakably
  different from every other control (see §8.6).

### 8.3 Materials and finishes — direction, not specification

| Element | Direction (PROPOSED target) | Must be verified before any public statement |
| --- | --- | --- |
| Bezel | Bead-blasted, anodised aluminium in a dark graphite/charcoal tone; matte (low gloss) | Actual alloy/temper/process, corrosion and wear tests |
| Rear enclosure | Glass-filled polymer, UV-stabilised, matte, tooled for service access | UV/colour stability, impact, thermal cycling |
| Glass / screen cover | Chemically strengthened glass with anti-reflective treatment; flush with bezel | Optical/glare performance, impact and scratch tests |
| Gaskets / seals | EPDM or TPU, compressed in a continuous channel | Ingress testing (IP) by a competent test house |
| Fasteners | A4/316 stainless, recessed or captive, no exposed sharp edges | Salt-spray/corrosion behaviour |
| Markings | Laser-etched or printed durable marking; backlit labels for night use | Abrasion, UV, salt and cleaning-agent resistance |
| Adhesives / labels | Marine-rated, no paper labels on exterior | Peel/aging tests |
| Surface touch | Matte, dry-grip texture; no gloss, no chrome, no faux carbon | Wet-hand grip and cleaning tests |

Prohibited: glossy black plastic as the default, chrome/polished metal, wood-effect, carbon-fibre
decals, metallic gold/bronze, RGB LEDs, exposed screws with decorative covers that hide serviceability.

### 8.4 Bezel, glass and enclosure geometry

- Thin, uniform front bezel; the screen is the dominant plane; no decorative ridges, no gamer fins.
- Flush glass with a continuous gasket channel; no water-trapping grooves on the top face.
- Drainage/weep paths where geometry creates a ledge; no horizontal pockets that hold salt water.
- Recessed or captive fasteners; no fastener whose head is a styling feature.
- Anti-glare hood compatible (mounting points designed in, not taped on).
- Thermal design: no vent path that admits water; heat managed by conduction/plate, not by open vents.
- Rear service access for connectors, fuse, battery (where applicable) without removing the unit from
  its panel in an emergency.
- Mounting: flush, bracket and gimbal variants defined at the family level; panel-cutout tolerance
  and service clearance documented by engineering. Do **not** assume a third-party mount standard or
  cite one as supported without verification.

### 8.5 Connector field and cable management

- Labelled ports with meaningful, stable names (not "IN1/OUT2" alone); the label grammar is shared
  with the diagrams (§9.3).
- Keyed connectors; no force-to-connect; strain relief and cable-gland support.
- Cable bend radius and gland orientation documented; no cable exit into the screen face.
- Service loops designed, not improvised; installation instructions reference the same labels.
- No port implied to work ("compatible with X") until compatibility evidence exists
  (`COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2 Class C).

### 8.6 Control affordances

| Control | Direction | Accessibility/ergonomics requirement |
| --- | --- | --- |
| Rotary encoder (where used) | 28–32 mm knurled knob, detented, low-profile | Operable with wet/gloved hands; ≥ 24 detents/revolution; tactile and audible feedback configurable |
| Sealed keys | 12–14 mm minimum, ≥ 8 mm gap, concave or raised | Tactile differentiation; backlit labels; no capacitive-only critical actions |
| Screen controls | Minimum 44×44 CSS px internal target in software | Wet/glove use; large hit areas; no gesture-only critical action |
| Power | Physical, clearly marked, no long-press-only | State perceivable without display |
| **PILOT E-stop** | Mushroom head, red, guarded, latching, distinct shape/position | Reachable without looking; not shareable with any other function; documented in manual and on the unit |
| **PILOT takeover** | Dedicated, distinct from E-stop, physical | Immediate manual authority; state displayed |
| Backlight | Day/night dimming, no RGB | Night mode preserves alert perceivability; no distraction glare |
| Labels | Etched/printed, high contrast, language-neutral symbols where standard | Localised text in the manual, not only on the device |

No control may be designed to *look* like a certification or safety guarantee. The E-stop is a safety
boundary, not a brand item.

### 8.7 Environmental and ingress target register (claims discipline)

The table records **engineering targets to be proven**, not achievements. Nothing here may appear in
marketing, packaging or product pages until test evidence exists and the claims policy classifies it.

| Property | Target (PROPOSED) | Evidence that would be required | Public claim allowed? |
| --- | --- | --- | --- |
| Front-face ingress | IPX6 / IPX7 class target | Accredited IP test report for the exact enclosure | No, until report |
| Body ingress | IPX5 class target | Same | No, until report |
| Salt-spray corrosion | ISO 9227-class target for the enclosure | Test report + duration stated | No, until report |
| UV / colour stability | ISO 4892-2-class target | Test report | No, until report |
| Vibration / shock | Marine recreational target defined by engineering | Test report | No, until report |
| Thermal | Operating/storage envelope defined by engineering | Test report | No, until report |
| EMC / radio | Applicable conformity route defined by compliance; no marks before it | Declaration of conformity | No, until conformity |
| NMEA 2000 / NMEA 0183 / Signal K | Only tested message sets may be cited | Compatibility matrix + test evidence | No, until matrix published |

Reference standards such as IEC 60945 are **design references** for a marine environment. Passing a
reference test is not the same as a conformity assessment, and no standard-body mark may be reproduced.

### 8.8 Marking and labels on hardware

- `MAREA` wordmark + family name + edition/model; serial and manufacturing date as required by
  applicable rules (only when true).
- Input voltage/current and polarity; fuse rating; safety symbols.
- WEEE/battery/disposal symbols **only where the product and jurisdiction require them and evidence
  exists**; never decorative.
- No certification marks, no standard-body logos, no `®`/`™`, no "CE" until the declaration of
  conformity exists.
- Language: language-neutral symbols + localised safety text in the manual; any on-device text must
  survive ES/PT/EN/FR diacritics and small-size reproduction.
- Labels must remain legible after salt, sun and cleaning; paper labels are prohibited on exterior
  surfaces.

### 8.9 Industrial-design constraints (engineering-owned, design-aware)

Serviceability with standard tools; access to fuse/battery/connectors without removing the unit in an
emergency; no sharp edges; no pinch points; screen anti-reflection; UV-stable colours; thermal paths
that do not admit water; EMC/radio design; mounting load and vibration; salt creep paths; cable keying;
label durability; recyclability considered but **no environmental claim without evidence**. MC-04 may
not produce CAD, tooling files or a promise that a material is used.

### 8.10 What MC-04 must not do in hardware styling

- Do not design or claim a manufactured enclosure, IP rating, certification or tested performance.
- Do not copy a competitor's industrial design, bezel shape, control layout or trade dress.
- Do not source or depict real hardware components as MAREA parts.
- Do not claim "marine-grade" as a standard or certification.
- Do not reproduce third-party standard marks or certification symbols.
- Do not publish packaging or hardware imagery as if products exist (§9.4, §10).

---

## 9. Packaging, iconography, product illustration and photography/CGI

### 9.1 Packaging direction

Status: **direction only.** No packaging is produced, printed or procured; procurement requires
clearance, a real BOM, a conformity plan and signatory authorization
(`BRAND-AND-IP-DECISION-PACKAGE.md` §8). Internal concepts must be labelled "PROVISIONAL PACKAGING
CONCEPT".

| Dimension | Direction |
| --- | --- |
| Structure | Rigid board carton with moulded paper/pulp insert; no plastic windows, no blister packs where avoidable; tear strip; reusable inner tray where sensible |
| Substrate | Uncoated or lightly coated board with recycled content **only after supplier verification**; no claim of FSC/recycled before certification |
| Finish | Matte; no high-gloss lamination (humidity and scuffing), no foil, no metallic inks, no embossed decorative patterns |
| Print | One dark (navy/charcoal) + paper white + at most one spot colour; instrument-panel restraint; no gradients |
| Front panel | `MAREA` + family name; honest product line illustration or clearly labelled CONCEPT render; 2–3 key facts with provenance; edition clearly stated |
| Side panels | Included items (and explicit exclusions), language panels ES/PT/EN/FR, QR to digital documentation |
| Back panel | Seller attribution once corporate legal data exists (`BRAND-ARCHITECTURE.md` §4; X-02 pending); warnings; disposal symbols only when applicable; provenance/lot |
| Claims | No certification marks, no IP rating, no "waterproof", no "made in", no performance badges, no competitor comparisons |
| Accessibility | Minimum 7 pt body / 9 pt critical labels; high ink contrast; QR with human-readable URL fallback; language coverage stated |
| Honesty | No fake unboxing claims; no "what's in the box" beyond what is actually included; no images implying a certified installation |

**Dieline spec (MC-04 deliverable).** 1:1 vector (SVG/PDF), 3 mm bleed, 5 mm safe area, fold/glue
lines, print profile and spot inks named, substrate recommendation, and a data panel for language
coverage. Dimensions must come from real BOM/mount dimensions once they exist; until then they are
PROPOSED placeholders and must be labelled as such.

### 9.2 Iconography system rules

| Rule | Specification (PROPOSED) |
| --- | --- |
| Grid | 24×24 base; 16/20/24/32/48 variants; 2 px optical padding |
| Stroke | 1.5 px at 24 px; 2 px at 16 px; 2.5 px at 32/48 px; minimum 1 px |
| Corners | 1.5 px radius; round caps and joins in UI; butt caps in technical diagrams |
| Fill | Outline by default; filled only for selected/active state or solid alert shape; never decorative fill |
| Alignment | Optical centring, not mathematical; consistent counter shapes |
| Direction | Arrows point with the meaning (bearing, trend, wind); never mirrored arbitrarily |
| Labels | Critical controls always icon + text; no icon-only alarm, no icon-only safety action |
| Colour | Icons inherit current role colour; never multicolour; state icons may use the state fill |
| Licensing | Icons are authored by us or used under a recorded licence; no unlicensed icon library; no AI-generated production icons; no official chart symbols |
| Originality | The icon *system* (not each generic symbol) must be checked for resemblance to known icon sets before adoption; generic symbols (gear, home) are unprotectable in themselves |

**Metaphor vocabulary (must be one meaning per icon):**

| Domain | Required concepts | Notes |
| --- | --- | --- |
| Navigation | bearing/heading index, waypoint, route leg, cross-track, north, scale | No compass rose; no official chart symbols |
| AIS | target (moving/selected/lost), CPA/TCPA ring and vector, receive-only antenna | Receive-only semantics must be expressible; no transponder icon |
| Wind | true wind, apparent wind, masthead sensor, wind speed/angle | T/A by arrow style + label, not colour |
| Electrical | battery, charger/alternator, shore power, solar, fuse/breaker, DC bus, ground | No lightning-bolt decoration; safety-relevant; labels required |
| Monitoring | bilge, tank level, temperature, pressure, humidity, event log | Tank level by fill shape + % label |
| Connectivity | HUB, network bus, Wi-Fi, cellular, signal strength | Generic connectivity symbols; no carrier logos |
| System/state | settings, power, home/back, brightness, update, lock, stale/offline, info, caution, alarm | Stale and offline are separate meanings; do not merge |
| Maintenance | service, calibration, filter, replace | Manual/installer material only |

Do: test at 16 px and in greyscale; keep one metaphor per meaning; pair critical icons with text.
Don't: mix filled and outlined in one row; use emoji; rotate a symbol to invent a new meaning; use
flags, skull-and-crossbones, life-rings or marine clip-art; use certification-like shields.

### 9.3 Product illustration standards (vector, authored by us)

Product illustration is the category that can progress **without image generation** and is therefore
the honest visual backbone of MC-04 until photography exists.

| Convention | Specification |
| --- | --- |
| Projection | Orthographic views + one isometric (30°) per product; consistent within a figure set |
| Line weights (screen) | Outline 1.5 px; internal detail 1 px; hidden lines dashed 1 px; dimension lines 0.75 px |
| Line weights (print) | Outline 0.35 mm; internal 0.25 mm; dimension 0.18 mm; minimum printable gap 0.3 mm |
| Shading | Flat, one tone per material, single light source upper-left; no photographic gradients, no drop shadows |
| Dimensions | Extension lines + arrowheads; units always shown; tolerances only when engineering-supplied; "NOT TO SCALE" when true |
| Callouts | Numbered with a bilingual legend (ES/EN); consistent numbering across the product family |
| Connectors/protocols | Labels only when engineering-verified; otherwise generic and marked "illustrative" |
| Safety | PILOT diagrams must show E-stop, manual takeover and supervised boundary; never imply autonomous operation |
| Classification | `DIAGRAM` (illustrative) until engineering-verified; manifest entry required; "illustrative" label on page |
| Scale | One scale per figure; no misleading enlarged details without a note |

Do: usable at 320 px card, 1200 px hero and A4 print; label ports and units; show service clearances;
keep one idea per figure; test in greyscale.
Don't: fake UI text in the figure; invent dimensions; imply certification or a real installation;
depict competitor devices; reproduce licensed charts; use AI-generated diagrams (rejected by default,
`ASSET-PIPELINE.md` §6.4); draw impossible vessel geometry.

### 9.4 Photography and CGI art direction

Status: **BLOCKED ON IMAGE GENERATION.** No photograph, render or CGI exists; no provider, credential
or budget exists (MC-01 B1–B3; MC-03 X-03). The section defines the standard a future, separately
authorized generation brief must meet. It is not a generation prompt and no prompt has been sent.

| Subject class | Direction | Must never show |
| --- | --- | --- |
| Corporate/hero (CONCEPT) | Atlantic Galicia/Rías Baixas context; overcast or low golden light; 8–18 kn, 0.3–1.2 m chop; level horizon; matte materials; calm competence | Storm drama, lens flares, neon grading, fake HUD, fake certifications, visible competitor devices, readable invented UI |
| Product isolation (CONCEPT) | Studio-neutral or marina context; honest materials; single light source; no fake bevels; crop-safe for 16:9 / 4:3 / 1:1 | Glossy "hero" effects, invented accessories, implied IP rating, fake packaging claims |
| Installed scene (CONCEPT) | Helm/nav station realism; plausible cable runs, glands, service loops; instrument placement where a sailor would put it | Fake certified installation, real customer vessel/name, identifiable people without release, implied sea-trial evidence |
| Installer/technical (CONCEPT) | Hands and tools, anonymous; real connectors where verified; tidy workmanship | Faces/identity without release, fake test equipment readings, implied certification |
| Real product photography | Only after `REAL_PRODUCT` evidence exists (unit ID, date, place, provenance) and Lead approval | Anything presented as real before evidence |

Art-direction rules:

1. **Lighting:** soft overcast Atlantic daylight or low sun; no visible sun flare; consistent shadows;
   no coloured gels; day and night variants only if the scene is plausible.
2. **Sea state and weather:** honest to the primary market; no disaster imagery to sell safety-adjacent
   products; no implied sea-trial or certification.
3. **Composition:** crop-first for 16:9 hero, 4:3 card and 1:1 thumbnail; subject never cut by the
   mobile crop; one idea per image; horizon level unless intentionally composed.
4. **Information layer:** any UI, label, price, product name or spec in the image must be authored
   HTML/CSS/SVG composited or overlaid — never generated lettering
   (`ASSET-PIPELINE.md` §6.3). The image may be generated **without** legible UI and the real UI
   composited in the page.
5. **People:** anonymous illustrative crew/installer only; no identifiable customer testimonials; no
   likeness without a release; never attach a quote to an anonymous figure.
6. **Rights:** no third-party logos, certification marks, charts, music cues, stock-photo identifiers
   or provider watermarks; input images only if owned/licensed; all rights recorded in the manifest.
7. **Labelling:** every asset classified CONCEPT must carry a visible on-page label (small, consistent,
   ES/EN) such as "Render conceptual — no representa un producto certificado / Concept render — not a
   photograph of a certified product." The label is placed in the page, not burned into pixels, unless
   a legal decision later requires visible disclosure (EU AI Act transparency question remains open —
   do not assert an answer; `ASSET-PIPELINE.md` §7.3).
8. **Synthetic-content provenance:** record provider, model, prompt, params, dates and disclosure
   status in the manifest; never claim embedded C2PA/watermark provenance unless verified.
9. **Post-processing:** no added text, fake HUD, augmented-reality overlays, artificial vignettes,
   simulated instrumentation, or compositing that invents an installation.
10. **No stock substitution:** never download unlicensed stock as a stand-in for MAREA hardware or
    installations.

### 9.5 Honesty labels and provenance on visual material

Every visual surface must be able to answer three questions in one glance: **what is this** (product,
concept, diagram, brand asset), **what is it based on** (source/classification), and **what is it not**
(certified, available, measured). The manifest (`ASSET-PIPELINE.md` §4.3) is the machine record; the
page or document carries the human-readable label. A file without a manifest entry must not ship.

---

## 10. Asset production specification table for MC-04+

### 10.1 Production status legend and rules

| Status | Meaning | Who can execute |
| --- | --- | --- |
| **PRODUCIBLE WITHOUT GENERATION** | Authored as vector/HTML/CSS/SVG/text and, where a raster is needed, rendered deterministically by a browser engine (Playwright 1.64.1 is already a devDependency). No generative model, no stock, no third-party imagery. | MC-04 (with an authorized write scope and a Lead-reviewed rasterization step) |
| **BLOCKED ON IMAGE GENERATION** | Requires a photoreal/CGI render or photograph. Blocked by MC-01 B1–B3 and MC-03 X-03 (no provider, no credential, no budget). A brief and manifest draft can be produced; the file cannot. | Nobody in this programme until authorization; MC-04 records `BLOCKED` |

Universal rules for every asset below:

1. **No file is created by MC-03.** All paths and variants are PROPOSED. Nothing is written to
   `public/`, `src/` or any image file by this brief.
2. **A manifest entry is mandatory** (`ASSET-PIPELINE.md` §4.3; `ASSET-MANIFEST.template.yaml`). A
   file without an entry must not ship.
3. **ES and EN alt text are both required** for content images; logo/brand art follows the alt rules in
   §10.6.
4. **Every raster has a stated byte budget** and is optimized before commit (AVIF/WebP; SVG for
   vector); see `ASSET-PIPELINE.md` §8.
5. **No asset may imply certification, registration, availability, performance or a real installation.**
6. **Author ≠ reviewer** for visual review and acceptance (program rule).

### 10.2 Identity and brand assets

| Asset ID | Asset / purpose | Consumer location (PROPOSED) | Format and size variants | Locale variants | Provenance fields required (manifest keys) | Acceptance check | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **MR-BRD-001** | Primary horizontal lockup: symbol + `MAREA` wordmark; the master brand identifier | `src/app/layout/brand.ts` (`app-brand`) when a MAREA surface exists; future `/marea` and `/en/marea`; documents; interiors of packaging | Master SVG (outlined wordmark, viewBox); PNG 2048 w, 1024 w, 512 w; SVG ≤ 20 kB; PNG ≤ 60 kB | None for the name (never translated); alt/caption ES/EN | `id`, `slug`, `category: brand`, `classification: BRAND`, `status`, `purpose`, `target`, `dimensions`, `files[].{path,format,width,height,bytes,sha256}`, `rights.{license,provenance,ai_generated:false,attested_by}`, `alt.es/en`, `checks.*`, `history` | 16 px and 8 mm legibility; monochrome; clear space 0.5×; no `®`/`™`; originality/prior-art check recorded; passes §2.2 installed-equipment test | **PRODUCIBLE WITHOUT GENERATION** (artwork); **adoption BLOCKED** on professional check and TM gate |
| **MR-BRD-002** | Monochrome (single-ink) lockup for engraving, silkscreen, one-colour print, fax-grade reproduction | Hardware marking spec; packaging; diagrams; installer documents | SVG master (single ink, no opacity); EPS/PDF for print if required; PNG 1024 w | None; alt ES/EN | Same as BRD-001 + `rights.license` = EMBARCARTE-authored internal artwork; `checks.visual_review` | Works on light and dark substrates; no hairlines; 8 mm minimum; no anti-alias dependency | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-003** | Reversed lockup (light on dark): night UI, dark packaging panels, dark photography safe-area overlays | Night-mode surfaces; dark packaging panels; deck/boom covers (future) | SVG + PNG 2048/1024/512 | None; alt ES/EN | Same as BRD-001 | Contrast of ink on dark ≥ 7:1 at wordmark scale; no glow, no gradient; survives print on dark board | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-004** | Compact symbol / app mark: the mark alone, no wordmark; the reduced 16 px variant | App icon construction; favicon; small hardware marking; map markers? (no — not charting); social avatar | SVG (24 grid + 16 px reduced variant); PNG 512/1024 | None | Same as BRD-001 | Recognisable at 16 px; distinguishable from hamburger/menu, compass-app and certification-seal readings; one ink | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-005** | Product-family lockup system: rule set + all nine family lockups (`MAREA NAV`, `HUB`, `AIS`, `PILOT`, `SENSE`, `WATCH`, `DISPLAY`, `WEATHER`, `FLEET`) in the adopted wordmark case | Product pages (`/marea/<family>`), packaging front panels, documents, diagrams | 9 SVGs + system rules doc; PNG previews 1024 w each | None: family names are English nautical terms and are never translated (`BRAND-ARCHITECTURE.md` §3, §6.5) | Same as BRD-001 per lockup; one `slug` per family | One spacing/case rule applied to all nine; edition suffixes (`Essential`, `Pro`) are title case; no per-family symbol; new families only via contract (`npm run test:brand`) | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-006** | App icon set: MAREA app/software identity for store, home screen, OS integration | Software distribution (future); `public/site.webmanifest` icons when a MAREA surface exists | 1024×1024 master PNG + SVG; 512, 192, 180 (apple-touch), 144, 96, 72, 48; maskable/adaptive foreground + background layers | None | Same as BRD-001 + `files[]` for every size | Silhouette survives circle/squircle/rounded-mask crops; no text; 16 px favicon reduction specified; maskable safe zone respected | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-007** | Favicon and browser identity set | `src/index.html` links; served from `public/` root (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`) | `favicon.svg`; `favicon.ico` (16/32/48); `apple-touch-icon.png` 180×180; PNG 16/32 | None | Same as BRD-001 | Legible at 16 px in a browser tab; no thin details; ICO contains required sizes; rendered deterministically | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-008** | Open Graph / social card | `SeoService` `og:image` default and per-page overrides; social sharing | **Exactly 1200×630** (hard-coded by `SeoService`), JPEG/WebP/PNG; per-locale variants ES/EN; byte budget ≤ 120 kB (target; current `public/og-image.png` is 280,750 B — over budget, pre-existing) | ES and EN card variants | Same as BRD-001 + `seo.og_image: true`, `seo.og_width/height` | Dimensions exact; byte budget met; one-line message; no fake product imagery; text authored as DOM/vector, not generated; legible at 600 px wide | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-009** | Brand usage and misuse sheet (internal): clear space, minimum sizes, colour/substrate rules, prohibited uses, PROPOSED labelling rule | `docs/marea/brand/`; internal review; partner/installer briefing | HTML/PDF, A4 portrait; SVG diagrams | ES (internal working language); EN optional | `classification: BRAND`; `rights` internal; `files` with sha256 | Contains all §3.1 rules; includes explicit "PROPOSED brand — not cleared" statement; reviewer sign-off | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-010** | Hardware marking artwork direction: placement, sizes, ink/laser contrast, label fields, E-stop marking, serial plate grammar | Hardware marking spec (future engineering hand-off); packaging; manuals | Vector spec (SVG/PDF), 1:1 and scaled views; per-family variants | Symbol language-neutral; safety text localised in manual, not on device | `classification: BRAND`; `rights` internal; `checks.rights_check` | 8 mm minimum marking; no certification marks; no `®`/`™`; E-stop distinct; verified legibility on proposed substrates (simulated, not tested) | **PRODUCIBLE WITHOUT GENERATION** (artwork spec only; no manufacturing claim) |
| **MR-BRD-011** | Packaging concept and dieline specification | Packaging direction for DISPLAY / HUB / AIS / SENSE / WATCH / PILOT control head | 1:1 vector dieline (SVG/PDF) with bleed 3 mm, safe 5 mm, fold/glue lines; flat artwork; language panels ES/PT/EN/FR; QR | ES/PT/EN/FR panels; ES/EN primary on web | `classification: BRAND`; `rights` internal; `dimensions`; `checks.visual_review` | Honest content (no certification/IP/made-in); dimensions flagged PROPOSED until BOM exists; print-spec sheet; accessibility of labels; no product photography required | **PRODUCIBLE WITHOUT GENERATION** (vector concept); **print/procurement BLOCKED** (clearance, BOM, conformity, signatory) |
| **MR-BRD-012** | Installer commissioning / handover record print template | Installer program (`/instaladores`, `/en/installers` proposed) and support documentation | HTML→PDF A4 (and A5 field variant); print CSS; fillable field definitions | ES/EN | `classification: BRAND`; `rights` internal; `files` sha256 | Records installation/commissioning facts only; **does not certify competence or product conformity**; no standards/certification marks; language ES/EN; print-legible; no personally identifiable data required | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-013** | Dashboard skin token specification (day/sunlight/night) | MC-06 design system and software implementation | JSON token file + documented table; role names from §7.8; no values committed to `src/` | None (role names are language-neutral) | `classification: BRAND`; `files` sha256; `checks` review | All §5 roles present in all modes; measured contrast table attached; no colour-only meaning; tokens map to existing web tokens where roles coincide | **PRODUCIBLE WITHOUT GENERATION** |
| **MR-BRD-014** | Typography specification: roles, numeric rules, locale coverage, licence verification record | MC-06 implementation; all design documents | Markdown/spec + (optional) JSON type tokens; licence evidence appendix | ES/EN first-class; PT/FR packaging; GL review pending | `classification: BRAND`; `rights.license` per family that ships | §4 checklist complete: licence metadata, tnum verification, glyph coverage, byte/performance evidence, PDF embedding permission | **PRODUCIBLE WITHOUT GENERATION** |

### 10.3 Content, illustration and art-direction assets

| Asset ID | Asset / purpose | Consumer location (PROPOSED) | Format and size variants | Locale variants | Provenance fields required | Acceptance check | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **MR-COR-001** | Corporate web hero art direction and master image: "one vessel, integrated systems" (CONCEPT) | Future corporate home `/` / `/en` and `/marea` brand hub hero | Master 1536×1024 or 2048 w class → AVIF/WebP 1920/1600/1280/960; 16:9 crop-safe; LCP budget ≤ 120 kB AVIF/WebP @1920 | Alt/caption ES/EN; no on-image text | Full manifest: brief, prompt, provider (`NONE_YET` until authorized), `rights.ai_generated: true`, `classification: CONCEPT`, disclaimer/caption, checks, integration | Marine realism per §9.4; no fake UI text/certification; visible CONCEPT label in page; axe `image-alt` pass; budget met; **generation not performed** | **BLOCKED ON IMAGE GENERATION** |
| **MR-COR-002** | Product-family page hero art direction: family group/ecosystem scene (CONCEPT) | `/marea/productos`, `/en/marea/products` hero | Master 1600 w → 1280/960 AVIF/WebP; 16:9 + 4:3 crop | ES/EN alt/caption | As MR-COR-001 | Same realism/honesty gate; no implied certification or stock imagery | **BLOCKED ON IMAGE GENERATION** |
| **MR-PRD-001** | **HUB** appliance product illustration spec (installed/isolation, CONCEPT render) | `/marea/hub` hero and detail; bundle pages | Master 1536×1024 → AVIF/WebP 1280/960/640; 4:3 and 1:1 crops | ES/EN alt/caption | Full manifest; classification CONCEPT; `provider.model` = documented id or `NONE_YET`; `files: []` until real generation | Shows plausible enclosure, labelled connectors, tidy cabling, service loop; no fake UI/certification; CONCEPT label; budget met | **BLOCKED ON IMAGE GENERATION** |
| **MR-PRD-002** | **DISPLAY** at-helm installed illustration spec (CONCEPT render) | `/marea/display` hero and detail; helm integration narrative | Master 1536×1024 → 1600/1280/960/640 AVIF/WebP; 16:9 + 4:3 + 1:1 | ES/EN alt/caption | As MR-PRD-001 | Plausible helm placement and sightlines; screen UI composited as HTML/SVG, not generated; no implied certification; CONCEPT label | **BLOCKED ON IMAGE GENERATION** |
| **MR-DIA-001** | **AIS receive-only** system technical illustration (vector): receiver, antenna/splitter, HUB/NAV, labels, receive-only statement | `/marea/ais`; `/soporte` documentation; installer material | SVG (illustrative), print PDF A4; no raster fallback needed | ES/EN labels; language-neutral symbols | `classification: DIAGRAM`; `rights.provenance` authored vector; `checks.rights_check`; `files` sha256 | Technically reviewed by engineering; labels match tested/declared interfaces or are marked illustrative; "receive-only" explicit; no implied collision avoidance; no chart symbology | **PRODUCIBLE WITHOUT GENERATION** (content review required) |
| **MR-DIA-002** | **PILOT supervised steering** boundary diagram (vector): control head, E-stop, takeover, actuator/drive boundary, watchdog, manual authority | `/marea/pilot`; installer documentation; safety briefing | SVG + print PDF A4/A3 | ES/EN labels | `classification: DIAGRAM`; `checks` include safety review | Engineering/safety review recorded; supervised-only wording; E-stop + manual takeover visible; no autonomous/remote implication | **PRODUCIBLE WITHOUT GENERATION** (safety review required) |
| **MR-DIA-003** | Ecosystem diagram: "one vessel, several systems" — NAV/HUB/AIS/SENSE/WATCH/DISPLAY/WEATHER/PILOT/FLEET relationships with honest boundaries | `/marea` hub; product family page; installer material | SVG (illustrative) + print PDF A4 | ES/EN labels | `classification: DIAGRAM`; `checks` engineering review | No implied compatibility; untested connections marked illustrative/planned; no certification; consistent with compatibility matrix when published | **PRODUCIBLE WITHOUT GENERATION** (content review required) |
| **MR-COR-003** | Corporate/lifestyle photography art direction (inshore Atlantic, anonymous crew, installed equipment) | Future `/marea` story sections, `/profesionales` | Master 2048 w → AVIF/WebP responsive; 16:9 + 4:3 | ES/EN alt/caption | Full manifest with synthetic-content disclosure; classification CONCEPT (until REAL_PRODUCT evidence) | Honest staging; no identifiable testimonials; no fake installation/certification; hero/alt/budget gates | **BLOCKED ON IMAGE GENERATION** |
| **MR-PRD-003** | Product family technical illustration set (orthographic + isometric line drawings) for HUB/AIS/SENSE/WATCH/DISPLAY/PILOT | Product pages, datasheets, manuals | SVG per product; print PDF A4 | ES/EN labels | `classification: DIAGRAM`; `checks` engineering review for dimensions | Line-weight standard §9.3; dimensions only when supplied; no invented specs; usable at 320 px card and A4 | **PRODUCIBLE WITHOUT GENERATION** |

### 10.4 Required provenance fields per asset class

The manifest is the source of truth (`ASSET-PIPELINE.md` §4.3). The table below states the **minimum
fields that must be complete before an asset can be accepted**, by class. `files` may be empty only
while an asset is a brief (no file exists).

| Manifest field group | BRAND (vector/authored) | CONCEPT (generated imagery) | DIAGRAM (authored vector) |
| --- | --- | --- | --- |
| Identity | `id`, `slug`, `category`, `purpose`, `classification`, `status` | Same + `brief` (summary/subject/composition/lighting/palette/must_include/must_avoid/negative_prompt) | Same + `brief` + engineering reference |
| Target | `target.pages` (routeIds or roadmap identity), `target.section`, `target.audience` | Same | Same + `target.audience: installer/technical` |
| Authorship | `author`, `reviewer` (≠ author), `created_at` | Same + `prompt.text`, `provider.*`, `generated_at` | `author`, `reviewer`, engineering reviewer |
| Files | `files[].{path,format,width,height,bytes,sha256}` for every delivered file | Same (empty until generation) | Same |
| Rights | `rights.{license,provenance,ai_generated:false,attested_by,attested_at}` | `rights.{ai_generated:true,model_provider,terms_version,account_entitlement,synthetic_content_disclosure}` | `rights.{license:"EMBARCARTE-authored",provenance,ai_generated:false}` |
| Localisation | `alt.es`, `alt.en`; caption ES/EN | Same + on-page CONCEPT label | `alt.es`, `alt.en`; labels ES/EN in figure |
| Optimization | `optimization.{formats,responsive_widths,target_bytes,lcp}` | Same | `formats: svg`; print variant noted |
| Checks | `checks.{visual_review,alt_review,rights_check,ssr_safe,axe_alt}`; `perf_budget` when raster | Same + `visual_review` against realism standard | `checks.{visual_review,alt_review,rights_check}` + engineering sign-off |
| Integration | `integration.{angular_path,component,last_build_verified_at}` | Same | Same |
| History | Append-only status transitions with reasons | Same | Same |

Additional rules:

- **BRAND assets** are `ai_generated: false`; the artwork is EMBARCARTE-authored. This does **not**
  claim trademark clearance or originality — those are separate gates, recorded outside the manifest.
- **CONCEPT assets** may not be accepted while `provider` is `NONE_YET` and `files` is empty; their
  status stops at `BRIEF_APPROVED`.
- **DIAGRAM assets** must cite an engineering review reference; without it, they stay illustrative and
  must be labelled "illustrative" on the page.
- **No `checks.*: PASS` without evidence** (command, artefact path, reviewer id).
- **Alt text is not a description of the format** ("image of…", "logo of…" when the wordmark is
  adjacent); it is the information a screen-reader user needs.

### 10.5 Paths, naming and formats

| Item | Rule |
| --- | --- |
| Published path (future) | `public/assets/marea/<category>/…` referenced as `/assets/marea/…` (`ASSET-PIPELINE.md` §3.1); identity files may live at `public/` root only where they must replace `favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-image.png` |
| Internal working path | `docs/marea/brand/assets/…` for masters and source artwork (PROPOSED; not created in MC-03) |
| Filenames | Lowercase ASCII kebab-case: `marea-lockup-primary`, `marea-lockup-mono`, `marea-lockup-reversed`, `marea-mark-compact`, `marea-family-<family>-lockup`, `og-marea-<locale>-1200x630`, `marea-icon-<size>`, `packaging-<family>-dieline`, `installer-commissioning-record-<locale>` |
| Formats | SVG for identity/diagrams (authored); PNG/WebP/AVIF for raster derivatives; JPEG only where a consumer cannot take WebP/AVIF; PDF only for print deliverables |
| SVG hygiene | No `<script>`, no external references, no embedded raster, no CSS `@import`, no filters/effects, integer/short-decimal coordinates, `viewBox` present, wordmark outlined to paths, title/aria semantics documented |
| Rasterization | Deterministic browser rendering of our own HTML/SVG (Playwright is installed) — this is **authoring output**, not generative imagery; the technique and script are recorded in the delivery (a new script needs a Lead-approved write scope and supply-chain review) |
| Byte budgets | SVG master ≤ 20 kB (lockup), ≤ 8 kB (mark/icon); OG ≤ 120 kB; favicons ≤ 20 kB each; hero LCP ≤ 120 kB AVIF/WebP @1920; card ≤ 45 kB @960; see `ASSET-PIPELINE.md` §8.3 |
| No-created files | MC-03 writes none of these. The first file creation is an MC-04 (or separately authorized) task with its own write scope |

### 10.6 Alt text, language and label rules

| Asset type | Accessible text rule |
| --- | --- |
| Logo inside a link that also shows the wordmark | Link has a localised accessible name; the decorative mark is `aria-hidden="true"`; no redundant "logo of MAREA" alt |
| Logo used as standalone content | `alt` = the brand/family name (ES/EN as appropriate); never "logo" |
| Wordmark-only image | `alt` = `MAREA` / `MAREA <FAMILY>`; no tagline baked in |
| CONCEPT imagery | Alt describes what the image shows (not "concept render", which belongs in the visible caption); caption carries the CONCEPT disclaimer; both ES/EN |
| Diagram | Alt summarises the relationship shown; the full explanation is real text next to it; labels are in the figure as SVG text |
| OG card | No alt in metadata; the visible card text is authored; page copy carries the meaning |
| Packaging | Language panels ES/PT/EN/FR; QR must have a human-readable URL fallback; no essential information only in a QR |

### 10.7 Minimum set that can pass MC-04 while imagery is blocked

MC-04 can legitimately pass its gate with the **PRODUCIBLE** subset complete and the image-dependent
subset recorded as `BLOCKED` (see §12.7). The minimum honest set is:

- identity construction + monochrome/reversed/compact variants + family lockup rules;
- app icon, favicon set and per-locale OG cards;
- three authored vector diagrams (AIS receive-only, PILOT supervised boundary, ecosystem);
- dashboard skin token specification and typography/licence verification record;
- packaging concept dieline (vector, not printed) and installer commissioning record template;
- the corporate hero, product renders and photography **as approved briefs + manifest drafts**
  (`status: DRAFT` / `BRIEF_APPROVED`, `provider: NONE_YET`, `files: []`) — never as files.

---

## 11. Accessibility expectations and QA checklist

### 11.1 Targets

| Surface | Target |
| --- | --- |
| Corporate website and all web surfaces | **WCAG 2.2 AA** as a minimum, with the stricter internal contrast targets of §5.5 where marine legibility demands it; keyboard-operable; screen-reader usable; zoom to 200% and 400% |
| Marine software (NAV, FLEET, DISPLAY UI) | WCAG 2.2 AA as the baseline for the web/software layer, plus the instrument-specific requirements of §7.9 (values with units/age, chart alternatives, alarm semantics, wet/glove targets) |
| Installer print material, packaging, certificates/records | Print-legibility standard: minimum 7 pt body / 9 pt critical labels, high ink contrast, language coverage, QR with printed URL fallback, no essential information in colour or in an image only |
| Documentation (Markdown/HTML/PDF) | Semantic headings, descriptive link text, alt text for diagrams, not colour-only, readable at 200% zoom |

This brief makes **no conformance claim**: conformance is established by evidence (tests, manual audit)
for a specific surface, not by a design document. Automated tests (axe) do not prove conformance.

### 11.2 WCAG 2.2 criteria that MC-04 must design for explicitly

| Criterion | Requirement | Where it bites in this system |
| --- | --- | --- |
| 1.4.1 Use of Colour | Colour is never the only visual means of conveying information | Alert ladder, AIS/depth/wind states, links in text, focus |
| 1.4.3 / 1.4.11 Contrast | 4.5:1 text, 3:1 large text, 3:1 UI/graphical objects | All palettes, all modes; focus ring (F-1) |
| 1.4.4 Resize Text / 1.4.10 Reflow | 200% text without loss; reflow at 320 CSS px | Dense instrument views, tables, diagrams |
| 1.4.12 Text Spacing | No loss of content when spacing is increased | Labels, provenance strips, tables |
| 2.1.1 / 2.4.3 / 2.4.7 | Keyboard, logical focus order, visible focus | Controls, overlays, mode switches |
| **2.4.11 Focus Not Obscured (Minimum)** | Focused component not entirely hidden by author-created content | Sticky headers, alert banners, overlays |
| **2.5.7 Dragging Movements** | Any drag has a single-pointer alternative | Sliders, chart panning, range selection |
| **2.5.8 Target Size (Minimum)** | ≥ 24×24 CSS px (or exceptions) | Icon buttons, chart controls, switch rows; internal 44×44 target for wet/glove use |
| **3.2.6 Consistent Help** | Help mechanisms in a consistent place | Software help, support links, disclaimer access |
| **3.3.7 Redundant Entry** | Do not force re-entry of previously supplied information | Installer/quote flows (future), not identity art |
| 2.2.2 Pause, Stop, Hide | Auto-updating content has a pause unless essential | Continuous instrument data is essential; non-essential auto-updates must be pausable |
| 2.3.1 Three Flashes | Nothing flashes more than 3 times per second | Alerts, animations, night pulsing |
| 1.4.5 / 1.4.9 Images of Text | Text is real text, not an image | Diagrams, OG cards, packaging mock-ups, screen mock-ups |
| 1.3.1 / 4.1.2 / 4.1.3 | Structure, name/role/value, status messages | Instrument readouts, alert announcements, chart alternatives |
| 3.1.1 / 3.1.2 | Page language and language of parts | ES/EN pages, mixed-language labels |
| 1.2.x Captions/audio | Any audio with information has captions/transcript | Future instructional video; not identity art |

**New in WCAG 2.2** (the five items marked in bold above) must be visible in the MC-04 design review
record; axe covers some of them only partially.

### 11.3 QA checklist (manual + automated)

| ID | Check | Method | Evidence | Pass criterion |
| --- | --- | --- | --- | --- |
| QA-01 | Text contrast, all surfaces/modes | Measured contrast table for every pair used; rendered sampling | Table + screenshots | ≥ 4.5:1 text, ≥ 3:1 large, `--cockpit` values ≥ 7:1 |
| QA-02 | Non-text contrast (controls, focus, graphics) | Measured pairs incl. focus on each adjacent surface | Table + focus-state screenshots | ≥ 3:1 (focus ≥ 4.5:1 internal target) |
| QA-03 | Colour-only meaning | Greyscale conversion of every state-bearing screen/icon set | Greyscale screenshots | Every state still identifiable |
| QA-04 | Colour-blind safety | CVD simulation (deuteranopia, protanopia, tritanopia, achromatopsia) | Simulation screenshots | Alert/AIS/depth/wind states remain distinguishable |
| QA-05 | Keyboard operation | Tab/Shift-Tab, Enter/Space/Esc, arrows in composite widgets | Test notes + focus screenshots | All actions operable; focus visible; no traps |
| QA-06 | Focus not obscured | Tab through pages with sticky header/banner/overlays | Screenshots | Focused element visible |
| QA-07 | Target size | Audit interactive elements at 390 px width and instrument density | Measurement table | ≥ 24×24; internal 44×44 for wet/glove |
| QA-08 | Reflow / zoom | 320 px width, 200% and 400% zoom (web) | Screenshots | No horizontal scroll (except allowed data table), no loss |
| QA-09 | Text spacing | Apply WCAG text-spacing overrides | Screenshots | No clipping/overlap |
| QA-10 | Images of text | Inventory every visible text in imagery/OG/packaging | Inventory list | All information text is real text; no generated lettering |
| QA-11 | Alt text ES/EN | Review every content image and diagram | Manifest + page | Descriptive, localised, ≤ 125 chars, no keyword stuffing |
| QA-12 | Chart alternatives | Data-table equivalent + text summary for every chart | Screenshots + DOM | Chart information available without the graphic |
| QA-13 | Instrument accessible values | Screen-reader walkthrough: value + unit + age + state | SR notes | "Speed 6.4 knots, 2 seconds old" pattern; alarms announced; continuous values not spam-announced |
| QA-14 | Alert semantics | Status message/role usage for advisory→alarm; ack vs resolved | DOM + SR notes | Alarm announced; ack does not remove condition |
| QA-15 | Motion / reduced motion | Toggle `prefers-reduced-motion`; audit all animation | Screenshots/notes | No required motion; no > 3 Hz flashing; night pulsing off |
| QA-16 | Language attributes | Verify `lang` on pages and mixed-language spans | DOM inspection | Correct and complete |
| QA-17 | Link/heading structure | Semantic heading order, descriptive links | DOM + axe | No skipped levels; no "click here"; one H1 |
| QA-18 | Forms (future quote/installer flows) | Labels, errors, redundant entry, consistent help | Manual | WCAG 2.2 AA per §11.2 |
| QA-19 | Print legibility | 1:1 print/PDF proof review (when print authorized) | Proof photos/PDF | ≥ 7 pt body, ≥ 9 pt critical labels, contrast, no colour-only |
| QA-20 | Packaging accessibility | Label sizes, language panels, QR fallback | Proof + review | Legible ES/PT/EN/FR; QR has printed URL |
| QA-21 | Honesty labels | Every CONCEPT visual carries visible label + manifest classification | Page + manifest | No unlabelled CONCEPT; no certification imagery |
| QA-22 | Brand document validation | `npm run test:brand` when the validator lands; manual review until then | Command output | No prohibited patterns (`®`/`™`, registration/availability claims) |
| QA-23 | Manifest completeness | Compare assets against `ASSET-MANIFEST.template.yaml` | Manifest review | Every file has an entry; `checks` evidence-backed |
| QA-24 | SVG hygiene | Parse every SVG; check no scripts/external refs/embedded raster | Inspection | Clean, self-contained, accessible semantics documented |
| QA-25 | Raster budgets | Measure bytes/dimensions of every raster | `Get-Item`/manifest | Within `ASSET-PIPELINE.md` §8.3 budgets |
| QA-26 | Day/night/sunlight simulation | Review each mode for glare/halation/alert floor | Screenshots + notes | §5.4/§5.8 criteria met; hardware test still BLOCKED |
| QA-27 | Broken references | All proposed paths exist or are explicitly PROPOSED | Repo check | No broken links in delivered docs/assets |
| QA-28 | Independence | Reviewer ≠ author for visual, accessibility and honesty reviews | Review log | Independent sign-offs recorded |

### 11.4 Existing automated gates and their limits (VERIFIED 2026-10-30)

| Gate | Where | What it proves | Limitation for identity work |
| --- | --- | --- | --- |
| `npm run build` | Angular SSR/prerender | The app compiles; `public/**` is copied | Does not validate asset paths, contrast, honesty or identity rules |
| `npm run test:i18n` | `scripts/check-i18n.mjs` | Dictionary parity and localized routes | Not a design check |
| `npm run test:commerce` | `scripts/check-commerce.mjs` | Server-authoritative pricing/stock/checkout integrity | Unaffected by docs |
| `npm run test:seo` | `scripts/check-seo.mjs` | Metadata, canonical/hreflang, sitemap | Does not verify OG image dimensions/bytes |
| `npm run test:performance` | `scripts/check-performance.mjs` | Measures LCP/CLS/font/image bytes on selected pages; **measures only — no thresholds, not a CI gate** | Does not count AVIF bytes (regex gap); no mobile/identity budget enforcement |
| `npm run test:e2e` | Playwright + axe (`e2e/accessibility.spec.ts`) | axe WCAG 2 A/AA/2.1/2.2 on `/`, `/en`, `/en/shop`, `/en/shop/e2e-hub`, `/en/cart`, `/en/contact`, `/en/login` + account | Axe cannot detect focus-ring contrast, colour-only meaning, CVD usability, sunlight legibility or authenticity of imagery; pages must exist |
| `format:check` / `format` | Prettier on `e2e/` and `scripts/` files listed in `package.json` | Code formatting of those paths only | **Markdown brand documents are not covered** by the current format scripts; MC-04 must state its own Markdown convention |
| `npm run test:brand` | `scripts/check-brand.mjs` (landed during MC-03; **present and passing at final reconciliation**) | Brand document rules: contract structure, canonical family/bundle naming, attribution, prohibited clearance/availability claims; scans only `governedPaths` in `docs/marea/brand/` | It is a deterministic text/contract gate, not a design or accessibility audit; it cannot judge originality or imagery honesty |

**Consequence:** passing the existing suite cannot be presented as evidence of identity, contrast,
accessibility or claim correctness. MC-04 must add manual evidence under QA-01…QA-28 and record that
the automated gates are only a baseline.

---

## 12. MC-04 acceptance criteria

### 12.1 Expected deliverables and exact file paths

All paths are PROPOSED and none exists at MC-03. MC-04 owns its own write scope; creating files under
`public/` or `src/` requires a separate authorized scope and is **not** implied here.

| # | Deliverable | Path (PROPOSED, exact) | Required? |
| --- | --- | --- | --- |
| D-01 | Identity system: construction, lockups, clear space, minimum sizes, family rules, misuse, PROPOSED labelling | `docs/marea/brand/IDENTITY-SYSTEM.md` | Mandatory |
| D-02 | Primary, monochrome and reversed lockups; compact mark | `docs/marea/brand/assets/logo/marea-lockup-primary.svg`, `marea-lockup-mono.svg`, `marea-lockup-reversed.svg`, `marea-mark-compact.svg` | Mandatory |
| D-03 | Nine family lockups | `docs/marea/brand/assets/logo/family/marea-family-{nav,hub,ais,pilot,sense,watch,display,weather,fleet}-lockup.svg` | Mandatory |
| D-04 | App icon and browser identity | `docs/marea/brand/assets/icons/marea-app-icon-1024.png`, `marea-icon-512.png`, `marea-icon-192.png`, `marea-apple-touch-180.png`, `favicon.svg`, `favicon.ico` | Mandatory |
| D-05 | Per-locale Open Graph cards | `docs/marea/brand/assets/social/og-marea-es-1200x630.png` (or `.jpg`/`.webp`), `og-marea-en-1200x630.png` | Mandatory (1200×630 exact, ≤ 120 kB) |
| D-06 | Typography system + licence verification record | `docs/marea/brand/TYPOGRAPHY-SYSTEM.md` | Mandatory |
| D-07 | Colour system + measured contrast matrix | `docs/marea/brand/COLOUR-SYSTEM.md` | Mandatory |
| D-08 | Instrument/dashboard token specification | `docs/marea/brand/tokens/marea-instrument-tokens.proposed.json` + section in D-07 | Mandatory |
| D-09 | Iconography system (rules, vocabulary, icon set) | `docs/marea/brand/ICONOGRAPHY-SYSTEM.md` + `docs/marea/brand/assets/icons/*.svg` | Mandatory |
| D-10 | Illustration and diagram standards | `docs/marea/brand/ILLUSTRATION-STANDARDS.md` | Mandatory |
| D-11 | Three authored vector diagrams (AIS, PILOT boundary, ecosystem) | `docs/marea/brand/assets/diagrams/marea-ais-receive-only.svg`, `marea-pilot-supervised-boundary.svg`, `marea-ecosystem-overview.svg` | Mandatory (PRODUCIBLE) |
| D-12 | Corporate hero + product render **briefs** (no files) and manifest drafts | `docs/marea/brand/PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`; `docs/marea/assets/manifest/MC-04-BRIEFS.yaml` | Mandatory as briefs; files BLOCKED |
| D-13 | Hardware CMF direction | `docs/marea/brand/HARDWARE-CMF-DIRECTION.md` | Mandatory |
| D-14 | Packaging direction + dieline concept | `docs/marea/brand/PACKAGING-DIRECTION.md`; `docs/marea/brand/assets/packaging/marea-packaging-dieline-{family}.svg` | Mandatory as vector concept; print BLOCKED |
| D-15 | Installer commissioning record template | `docs/marea/brand/assets/print/marea-installer-commissioning-record-{es,en}.html` (+ rendered PDF evidence) | Mandatory |
| D-16 | Originality / prior-art check record | `docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md` | Mandatory before adoption; status may be `COMMISSIONED`/`PENDING`, never falsely `CLEARED` |
| D-17 | Accessibility evidence file | `docs/marea/brand/MC-04-ACCESSIBILITY-EVIDENCE.md` | Mandatory |
| D-18 | Delivery record with PASS/PARTIAL/BLOCKED/FAIL and blockers | `docs/marea/brand/MC-04-DELIVERY.md` | Mandatory |
| D-19 | Independent review record | `docs/marea/brand/MC-04-REVIEW.md` | Mandatory (reviewer ≠ author) |

### 12.2 Tests and gates

| Gate | Command / method | Required result |
| --- | --- | --- |
| Brand document validator | `npm run test:brand` (present at final reconciliation; required for every brand document) | PASS; the run on 2026-10-30 passed 21 checks and scanned this file as governed |
| Formatting | `npx prettier --check` on the files MC-04 creates, if Markdown/JSON listed or by explicit invocation | PASS on created text files (document the scope gap in `format:check`) |
| SVG validity | Parse every delivered SVG with the browser/XML parser; check hygiene rules §10.5 | PASS; evidence recorded |
| Contrast | Computed matrix (WCAG formula) for every pair; rendered sampling | PASS per §5.5; evidence recorded |
| Colour-blind / greyscale | Simulation screenshots for the required states | PASS per §5.6/§5.7 |
| Raster dimensions and bytes | Measure every PNG/WebP/AVIF; manifest `files[]` | PASS per §10.5 budgets |
| Manifest completeness | Compare each delivered asset against the template | PASS (no file without entry) |
| Links/paths | Verify every referenced path exists or is explicitly PROPOSED/non-existent | PASS (no false references) |
| Honesty review | Forbidden-pattern scan against `COMMERCIAL-BRAND-CLAIMS-POLICY.md` + visual review | PASS |
| `npm run build` | Only if any `src/` change is authorized | Build must pass; no change is expected in MC-04 |
| `npm run test:i18n` / `test:seo` / `test:e2e` | If a page is implemented (not part of MC-04 default) | PASS where applicable |
| `npm run test:performance` | If raster assets are integrated | Measured and compared; AVIF-regex gap recorded |

### 12.3 Review gates (all required before MC-04 is accepted)

| Gate | Reviewer | What is checked |
| --- | --- | --- |
| G1 Identity/design review | Independent design reviewer (≠ author) | Territories, construction evidence, lockups, small-size/engraving tests, family system |
| G2 Accessibility review | Independent accessibility reviewer (≠ author) | QA-01…QA-28 evidence, instruments, print, modes |
| G3 Legal/originality gate | Company + professional counsel/trademark agent | Prior-art/freedom-to-use check commissioned and its findings recorded; **no agent may close this gate** |
| G4 Claims/honesty review | Independent reviewer against claims policy | No certification/registration/availability/performance implication; disclaimers present |
| G5 Data/technical review | Engineering (product owner) | Diagrams, units, protocols, labels, staging; illustrative labels correct |
| G6 Integration review | Lead | Write scopes respected, no `src/`/`public/` side effects, manifest, reproducibility, no fabricated files |
| G7 Independent milestone verdict | Reviewer ≠ author | PASS/PARTIAL/BLOCKED/FAIL based on the real diff and evidence, not the summary |

### 12.4 Definition of done

MC-04 is done only when all of the following are true:

- [ ] All mandatory D-01…D-19 deliverables exist (except files explicitly classified BLOCKED).
- [ ] The adopted territory is documented with its prototype evidence, rejected alternatives and
      rationale; **no originality/clearance claim** is made anywhere.
- [ ] Each PRODUCIBLE asset satisfies its §10 acceptance check and has a manifest entry with sha256.
- [ ] Every image-dependent asset exists only as an approved brief + manifest draft (`provider:
      NONE_YET`, `files: []`), clearly marked **BLOCKED ON IMAGE GENERATION** — no file, no placeholder
      pretending to be an asset.
- [ ] Typography licence/feature verification recorded (T-1…T-10) and numeric treatment proven.
- [ ] Contrast matrix measured; focus-ring finding (F-1) resolved by a proposed compliant value.
- [ ] Colour-blind/greyscale evidence exists for instrument states.
- [ ] The three vector diagrams are engineering-reviewed and correctly labelled illustrative where
      applicable.
- [ ] Claims review passed: no `®`/`™`, no certification/availability/performance implication.
- [ ] Accessibility evidence file complete; no conformance claim beyond tested scope.
- [ ] Independent review (G1–G7) recorded; author ≠ reviewer.
- [ ] `git status --short` shows only files inside MC-04's authorized write scope; no `src/`, no
      `public/`, no image file created without a scope.
- [ ] Blockers register updated (§13.2); no blocker silently omitted.
- [ ] Delivery record states PASS/PARTIAL/BLOCKED/FAIL truthfully, including what remains blocked.

### 12.5 What would make MC-04 FAIL

Any one of these is a failure, regardless of visual quality:

1. An image, render or screenshot is fabricated, downloaded as unlicensed stock, or claimed as
   generated when no authorized generation happened.
2. A placeholder image file is created to "fill" a BLOCKED asset.
3. `®`/`™`, "registered", "registrada", "marca registrada" or any registration claim appears with
   MAREA or a family/bundle name.
4. A competitor's mark, slogan, product design, layout or icon set is copied or closely imitated.
5. A typeface, icon set or illustration is used without a recorded licence/ownership check.
6. A logo is adopted without the professional originality/prior-art check record (or a direction is
   claimed "original"/"clear" by an agent).
7. Any text/contrast below WCAG 2.2 AA where the standard applies, or the internal cockpit target
   ignored without a written justification.
8. Colour is the only carrier of a state or meaning.
9. Any implied certification, approval, ECDIS-equivalence, availability, price, performance or
   safety guarantee appears in identity, packaging, diagrams or screens.
10. Required disclaimers (§7.7) are absent, hidden, or contradicted by the design.
11. A CONCEPT visual is published without its label and manifest classification.
12. An asset ships without a manifest entry, sha256 or alt ES/EN (where applicable).
13. A file or token is written outside MC-04's authorized write scope (including `src/`, `public/`,
    tokens, images) without a separate task.
14. A gate is marked PASS without recorded evidence, or an author reviews their own work.
15. The delivery claims more than the evidence supports (e.g. "identity complete and cleared",
    "accessibility certified", "imagery produced").
16. Image generation is attempted without written budget authorization and credentials, or a paid
    image/font service is called.

### 12.6 Status rules for MC-04

| Status | When |
| --- | --- |
| **PASS** | All mandatory producible deliverables accepted, image-dependent ones truthfully recorded as BLOCKED with approved briefs, all review gates recorded, no failure condition |
| **PARTIAL** | Some producible deliverables incomplete or some non-critical acceptance check unmet; blocked items recorded |
| **BLOCKED** | Work cannot progress because of an external gate (image generation, trademark/originality check, licence, hardware, print authorization). The report must state what *did* pass and the exact unblock action |
| **FAIL** | Any §12.5 condition |

**Important:** a design/strategy milestone can legitimately be **PASS** for the identity system while
imagery remains **BLOCKED**. It is never legitimate to make the milestone look complete by inventing
imagery. Conversely, an incomplete identity cannot be declared PARTIAL merely because imagery is
blocked.

### 12.7 What MC-04 must decide first (in order)

1. **Confirm design authority and status** (BD-03 conditional GO; internal/provisional only) and read
   the MC-03 brand set now present in `docs/marea/brand/` — strategy, voice, naming, competitive
   evidence, trademark research, governance implementation, brand contract and validator — before any
   artwork is drawn.
2. **Resolve the typographic gate**: licence metadata for the installed `@fontsource` packages,
   `tnum` support, glyph coverage and PDF embedding permission. If these pass, keep DM Sans + Manrope;
   if not, evaluate one audited open alternative (no purchase).
3. **Build and test all three territories** (§3) before selecting; shortlist two and commission the
   professional originality/prior-art check.
4. **Confirm the image-generation blocker explicitly** and plan the milestone around the PRODUCIBLE
   subset — never around a promise that generation will be authorized.
5. Only then: adopt a direction, document it, and open the accessibility/claims review gates.

---

## 13. Out of scope for MC-03 and blocker register additions

### 13.1 Explicitly out of scope for MC-03

MC-03 is a strategy/governance milestone. The following are **not** deliverables of MC-03 and are not
implied by this brief:

1. Final logo selection, final artwork adoption or any claim that an adopted mark is clear/original.
2. Any image, render, photograph, screenshot, icon file, SVG asset, favicon, OG card, packaging proof
   or print file.
3. Creating `public/assets/`, `public/` identity files, `docs/marea/brand/assets/`, token files in
   `src/`, or any change to `src/`, `public/`, `angular.json`, `package.json` or the build.
4. Design tokens committed to the live site; website rebrand; migration of existing indexed pages;
   new routes; i18n dictionary changes.
5. Packaging procurement, printing, tooling, materials purchasing, hardware CAD, industrial design
   files, manufacturing quotes or BOM.
6. Trademark filing, clearance, domain purchase, social-account creation, advertising or any spend.
7. Any certification, conformity assessment, test report, sea trial, compatibility claim or vendor
   agreement.
8. Any new dependency, build script, rasterization tool or asset-generation pipeline.
9. Any photograph of people, vessels, customers or installations; any testimonial or case study.
10. Any legal advice, legal opinion, licence grant or ownership assignment.

### 13.2 Blocker register additions that MC-04 inherits

Inherited from `docs/marea/assets/ASSET-PIPELINE.md` §10: **B1** (no image-generation capability),
**B2** (no provider credentials), **B3** (no budget authorization), **B4** (provider model/account
entitlement unverified), **B5** (trademark clearance pending), **B6** (`public/assets/` write scope),
**B7** (performance check does not count AVIF; OG over budget), **B8** (no manifest validator).

New or refined blockers for the identity work:

| ID | Blocker | Status | Owner of the unblock | Exact next action |
| --- | --- | --- | --- | --- |
| **B9** | No professional originality / prior-art / freedom-to-use check on any identity construction | BLOCKED (professional act) | Company + trademark agent/counsel | Commission a written search/opinion covering the shortlisted construction(s) and adjacent sectors; record findings; do not adopt before it |
| **B10** | Typeface licence metadata and numeric features unverified for the installed `@fontsource` builds | OPEN (verification) | MC-04 author + Lead | Read the shipped licence files, verify `tnum`/glyph coverage/PDF embedding, record T-1…T-10 (no purchase) |
| **B11** | No hardware/display exists, so sunlight and night legibility cannot be tested for real | BLOCKED (hardware) | Product/engineering + budget | Design simulation only; no sunlight/night claim for hardware until a device is built and measured |
| **B12** | No industrial-design/CAD/manufacturing partner for CMF and enclosure validation | BLOCKED (partner/BOM) | Company + engineering | Treat CMF as direction; validate with a design-for-manufacture partner when the hardware programme exists |
| **B13** | No print vendor or proofing for packaging, labels and certificates | BLOCKED (procurement) | Company + finance | Vector concepts only until clearance, BOM, conformity and signatory authorization |
| **B14** | No licensed nautical chart / weather data rights for any chart-like display | BLOCKED (D-01/D-02/D-04 etc.) | Product + counsel | No real chart reproduction; illustrative, labelled, fictional data only until rights exist |
| **B15** | Engineering verification absent for diagram ports/protocols/dimensions | BLOCKED (engineering) | Engineering/product | Mark diagrams illustrative; obtain engineering sign-off before any technical claim |
| **B16** | No image generation available (inherits B1–B3, X-03) | BLOCKED (external) | Company owner | Written authorization + credential + budget; then one pilot asset per `ASSET-PIPELINE.md` §10 |
| **B17** | No real MAREA hardware exists to photograph (CONCEPT/DEFINED only) | BLOCKED (product) | Product/engineering | Nothing may be labelled REAL_PRODUCT without evidence (MC-13 gates) |
| **B18** | Icon-set originality/licensing not yet recorded | OPEN | MC-04 author + Lead | Author icons or record a licence; originality review of the system; no unlicensed library |
| **B19** | No external/manual accessibility audit; automated axe is insufficient for this design | OPEN | Accessibility reviewer | Manual QA-01…QA-28 evidence; external audit if a conformance statement is ever needed |
| **B20** | Corporate legal data (X-02) missing → seller attribution on packaging/legal surfaces incomplete | BLOCKED (client input) | Company owner | Provide verified tax id/address/registry; do not invent |
| **B21** | Brand contract/validator (`brand-identity.contract.json`, `scripts/check-brand.mjs`, `npm run test:brand`) landed late in MC-03; compliance is not yet a habit external to this file | OPEN (adoption) | Lead/governance engineer | Keep the contract + validator authoritative and passing; MC-04 must run `npm run test:brand` on every brand document and treat failures as blocking |
| **B22** | EU AI Act synthetic-content disclosure form for public CONCEPT imagery undecided | BLOCKED (legal) | Company + counsel | Decide on-page disclosure form before publishing any generated image; do not assert an answer |
| **B23** | No `public/assets/marea/**` write scope authorized for identity files | NOT STARTED (scope) | Lead | Open a separate task with explicit write scope when a page needs its first real file |
| **B24** | No customer/segment evidence for identity testing beyond internal review | OPEN (research) | MC-03B/UX research | Internal design review only until primary research exists; no claim that the identity "tested well with users" |

### 13.3 Exact next actions (ordered)

1. **Lead/MC-04 author**: consume the now-present MC-03 brand set and keep `npm run test:brand`
   passing on every brand document; open MC-04 with an explicit write scope that includes
   `docs/marea/brand/**` (and, if authorized, `public/assets/marea/**`).
2. **MC-04 author**: read this brief and the sibling MC-03 documents; record the identity gate as
   *internal/provisional* in `MC-04-DELIVERY.md`.
3. **MC-04 author**: run T-1…T-10 typography verification and record the result before designing the
   numeric system.
4. **MC-04 author**: prototype all three territories, run §2.2/§3.8 tests, shortlist two.
5. **Company/counsel**: commission the originality/prior-art check (B9) on the shortlist; no adoption
   until the record exists (status may be `COMMISSIONED`/`PENDING`, never falsely `CLEARED`).
6. **MC-04 author**: produce the PRODUCIBLE asset set (identity artwork, icons, OG, diagrams, tokens,
   packaging dieline concept, installer record template) with manifest drafts and evidence.
7. **MC-04 author**: write image-dependent briefs and manifest drafts only (`provider: NONE_YET`,
   `files: []`), and record them as BLOCKED ON IMAGE GENERATION.
8. **Independent reviewers**: run G1–G7; record PASS/PARTIAL/BLOCKED/FAIL.
9. **Lead**: verify `git status --short`, the diff, the manifest and the blockers; no merge until the
   independent verdict exists.

---

## Appendix A — Evidence log (2026-10-30)

| Claim | Status | Evidence |
| --- | --- | --- |
| Branch and commit | VERIFIED | `git log -1 --oneline` → `9631c6f docs(mc02): record independent-review commit in delivery and registry`; branch `feature/marea-mc03-brand-governance` |
| Working tree at write time | VERIFIED | This MC-03 task writes **only** `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md`. `git status --short` during the milestone showed `?? docs/marea/brand/` plus parallel MC-03 changes by other agents (`.github/workflows/ci.yml`, `package.json`, `scripts/check-brand*.mjs`); none of those are this task's writes. No `src/`, `public/`, token or image change was made |
| No image was generated by MC-03 | VERIFIED | No image API/tool invoked; no image or asset file created; runtime has no image-generation tool (inherited MC-01 evidence) |
| `COMPETITIVE-POSITIONING-EVIDENCE.md` timing and use | VERIFIED | Absent when this brief's first draft began (`Test-Path` → `False`); published by a parallel MC-03 agent during the milestone; present and read at final reconciliation (51,863 B). §2.3 cites its §4.3/§4.4/§5 observations and keeps non-audited visual statements labelled HYPOTHESIS |
| Brand-governance documents present at write time | VERIFIED | `docs/marea/brand/BRAND-ARCHITECTURE.md`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md`, `BRAND-AND-IP-DECISION-PACKAGE.md`, plus `MAREA-BRAND-STRATEGY.md`, `BRAND-VOICE-ES-EN.md`, `PRODUCT-NAMING-SYSTEM.md`, `TRADEMARK-CLEARANCE-RESEARCH.md`, `COMPETITIVE-POSITIONING-EVIDENCE.md`, `WEBSITE-BRAND-MIGRATION.md`, `BRAND-GOVERNANCE-IMPLEMENTATION.md` |
| Brand contract/validator and result | VERIFIED | `docs/marea/brand/brand-identity.contract.json`, `scripts/check-brand.mjs`, `scripts/check-brand.test.mjs` and `test:brand` script present at final reconciliation; `npm run test:brand` → **RESULT: PASS**, 21 checks run, 0 failed, 11 governed files scanned including this brief |
| Fonts and self-hosting | VERIFIED | `package.json`: `@fontsource-variable/dm-sans@^5.3.0`, `@fontsource-variable/manrope@^5.3.0`; `src/styles.scss` `@use` both; `src/index.html` has no font `<link>` |
| Type roles | VERIFIED | `src/styles.scss` lines 19–20 `--display`/`--body`; body font-family `var(--body)` |
| No numeric OpenType declarations | VERIFIED | `grep` for `font-variant-numeric|tabular|font-feature-settings|font-variation` in `src/` → 0 matches |
| Existing colour tokens | VERIFIED | `src/styles.scss` lines 5–21 (`--navy`, `--navy-2`, `--sea`, `--sea-strong`, `--sea-button`, `--mist`, `--sky`, `--paper`, `--ink`, `--muted`, `--line`, `--danger`, `--ok`); focus `:focus-visible` line 29 |
| Contrast measurements in §5 | VERIFIED (computed) | WCAG 2.2 relative-luminance formula computed on the stated sRGB hex pairs on 2026-10-30; values reported to 2 decimals; rendered re-measurement still required |
| Browser identity files and sizes | VERIFIED | `public/`: `favicon.ico` 15,086 B; `favicon.svg` 338 B; `apple-touch-icon.png` 3,304 B; `icon-192.png` 3,512 B; `icon-512.png` 9,588 B; `og-image.png` 280,750 B; `site.webmanifest` |
| `SeoService` OG dimensions | VERIFIED (inherited) | `ASSET-PIPELINE.md` §1.2 records hard-coded 1200×630; re-check in MC-04 if it changes |
| Source files for current identity art exist | VERIFIED | `scripts/og.html`, `scripts/icon.html` (HTML/SVG source used for raster identity art); no generation script in `package.json` |
| Existing accessibility gate | VERIFIED | `e2e/accessibility.spec.ts` runs axe tags `wcag2a/aa`, `wcag21a/aa`, `wcag22aa` on `/`, `/en`, `/en/shop`, `/en/shop/e2e-hub`, `/en/cart`, `/en/contact`, `/en/login` + authenticated account; serious/critical only |
| Existing formatting gate does not cover docs | VERIFIED | `package.json` `format`/`format:check` target `e2e/` and `scripts/*.mjs` files only |
| Graphify update | NOT RUN | Global policy requires `graphify update .` after documentation changes; this task's write scope is the single brand file, so the graph refresh is a **Lead integration action** (running it would write `graphify-out/` outside scope) |

## Appendix B — Open questions MC-04 must resolve

| ID | Question | Owner | Needed by |
| --- | --- | --- | --- |
| OQ-1 | Wordmark case: uppercase master vs title case (and whether Manrope is used or the wordmark is drawn) | MC-04 design review | Before lockup artwork is finalised |
| OQ-2 | Territory adoption (A, B or C) with test evidence and professional-check findings | MC-04 + legal gate | Before any adoption record |
| OQ-3 | Disposition of the informal teal `#2bb3c0` in `scripts/icon.html`/`og.html` — retire, or keep as a UI-only accent? | MC-04 + MC-06 | Before the identity is applied anywhere |
| OQ-4 | Normalise browser `theme-color` `#0b2540` to a token or retire it | MC-04 + MC-06 | Before favicon/OG finalisation |
| OQ-5 | Focus-ring replacement value and implementation ownership (F-1) | MC-04 propose; MC-06 implement | Before any UI ships |
| OQ-6 | Typography: keep (A) or audited alternative (B) after T-1…T-10 | MC-04 author | Before numeric/token spec |
| OQ-7 | Engineering confirmation of per-data-class precision and freshness thresholds (§4.5, §7.4) | Engineering/product | Before instrument spec is quoted as implementable |
| OQ-8 | Mode control design (day/sunlight/night switching, persistence, defaults) | MC-04 + MC-06 | Before dashboard spec |
| OQ-9 | Icons: author all, or start from a licensed open set with recorded licence? | MC-04 + Lead | Before icon system finalisation |
| OQ-10 | Packaging dimensions and dielines: PROPOSED until BOM/mount dimensions exist | Engineering/product | Before any print authorization |
| OQ-11 | EU AI Act synthetic-content disclosure form for public CONCEPT imagery | Company + counsel | Before publishing generated imagery (B22) |
| OQ-12 | Any chart-like display requires licensed data; which (if any) is used in demos? | Product + counsel | Before any chart UI prototype is shown publicly |
| OQ-13 | Hardware CMF validation partner and manufacturability review | Company + engineering | Before hardware styling claims |
| OQ-14 | Whether and when the MAREA identity is applied to the live site (migration is not MC-04) | Lead/company | Separate authorized milestone |
| OQ-15 | Installer record naming: a record of works, not a competence certification (avoid "certified installer") | MC-04 + claims review | Before template finalisation |
| OQ-16 | Print proofing and substrate verification | Company/finance + vendor | Before packaging procurement |
| OQ-17 | External/manual accessibility audit scope and who performs it | Lead + accessibility reviewer | Before any conformance statement |
| OQ-18 | Family lockups: confirm one spacing/case rule and no per-family symbol (per architecture) | MC-04 + brand governance | Before nine lockups are produced |

## Appendix C — Terms used

| Term | Meaning in this brief |
| --- | --- |
| **PROPOSED** | A decision or specification in this brief; not implemented, approved, published or cleared |
| **CONCEPT** | Illustrative depiction of an intended product/experience with no verified physical counterpart (`ASSET-PIPELINE.md` §7.1) |
| **REAL_PRODUCT** | Depiction of an existing, tested unit/installation with recorded evidence; cannot be used until MC-13 evidence and Lead approval exist |
| **DIAGRAM** | Authored vector explanation of the real architecture; illustrative until engineering-verified |
| **BRAND** | Logo/wordmark/identity asset; usable only as a proposed MAREA identity, no registration symbols |
| **Tabular figures** | Numerals with equal advance widths (OpenType `tnum`) so values do not jitter |
| **CVD** | Colour-vision deficiency (protanopia, deuteranopia, tritanopia, achromatopsia) |
| **IPX** | Ingress-protection rating class; a target here, never a claim until tested |
| **ECDIS** | Electronic Chart Display and Information System (a regulated navigation system); MAREA must not imitate or claim equivalence |
| **WCAG 2.2 AA** | Web Content Accessibility Guidelines 2.2, Level AA; the minimum target, not a claim of conformance |
| **CMF** | Colour, material, finish (industrial-design direction) |
| **Manifest** | The per-asset provenance record defined by `ASSET-MANIFEST.template.yaml` |
| **PRODUCIBLE WITHOUT GENERATION** | Authored vector/HTML/CSS/SVG/text, deterministically rasterized if needed; no generative AI, no stock |
| **BLOCKED ON IMAGE GENERATION** | Requires photoreal/CGI/photographic output; impossible under the current B1–B3/X-03 blockers |

## Appendix D — Document control and authority

- **This document authorizes nothing.** It does not authorize publication, printing, procurement,
  domain purchase, advertising, trademark filing, image generation, font purchase or any spend. It is
  a decision framework for a later, authorized milestone.
- **It is not legal advice and not a clearance result.** MAREA remains a proposed brand with
  `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. No symbol direction here is declared original, clear,
  registrable or free of third-party rights.
- **It creates no file outside itself.** The only file written by this MC-03 task is
  `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md`. Paths in §10/§12 are proposals for MC-04.
- **Change control:** any change to the adopted principles (territories, one-design-system rule,
  prohibited claims, image-generation blocking, accessibility targets) requires a `DECISION-LOG.md`
  entry and independent review, not a silent edit.
- **Traceability:** referenced as the visual gate in `BRAND-ARCHITECTURE.md` §10,
  `BRAND-AND-IP-DECISION-PACKAGE.md` §3.3/§11 and the MC-03 delivery record; it inherits
  `ASSET-PIPELINE.md` (assets), `COMMERCIAL-BRAND-CLAIMS-POLICY.md` (claims) and
  `BRAND-ARCHITECTURE.md` (naming/attribution/endorsement).
- **Closing statement:** a design milestone that cannot show imagery is not a failed milestone; a
  design milestone that fakes imagery is. The identity system can be built, tested and reviewed
  honestly today. The photographs cannot.
