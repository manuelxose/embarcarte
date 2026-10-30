# MAREA — Brand strategy (MC-03 / B1)

| Field | Value |
| --- | --- |
| Document ID | MC-03 / B1 |
| Milestone | MC-03 — brand architecture and legal clearance policy (programme prompt 03) |
| Date | 2026-10-30 |
| Status | `PROPOSED` — internal strategy for decision. **Not approved for public publication.** |
| Owner | brand-strategist (specialist author). The Lead owns integration and any public use of this material. |
| Companion deliverables | `PRODUCT-NAMING-SYSTEM.md` (B2, this agent); `BRAND-VOICE-ES-EN.md` (Lead); `COMPETITIVE-POSITIONING-EVIDENCE.md` (evidence appendix, parallel agent); `MC-04-VISUAL-IDENTITY-BRIEF.md` (parallel agent); `brand-identity.contract.json` + `BRAND-GOVERNANCE-IMPLEMENTATION.md` (parallel agent); `TRADEMARK-CLEARANCE-RESEARCH.md` (parallel agent) |
| Evidence base | `docs/marea/COMMERCIAL-PORTFOLIO.md`, `WEBSITE-AND-ROADMAP.md`, `MARKET-BENCHMARKS.md`, `M00-DISCOVERY-BASELINE.md`, `compliance/MAREA-COMMERCIAL-ARCHITECTURE.md`, `compliance/MC-02-BLOCKERS-AND-DECISIONS.md` — all dated 2026-10-30 |
| Brand clearance | MAREA trademark legal clearance = **`NOT_GRANTED`** (`MC-02-BLOCKERS-AND-DECISIONS.md:113`, blocker X-01) |
| Commercial status | All nine families are `CONCEPT`/`DEFINED`; **none is commercially available**. Prices in the portfolio are hypotheses, not approved for publication (`COMMERCIAL-PORTFOLIO.md:5,123`) |

## 1. Executive summary

MAREA is the **proposed** product brand through which EMBARCARTE intends to sell a connected, installer-supported modernisation system for existing leisure and small professional vessels. It is not a registered mark, not a product line in market, and not a claim of superior navigation safety, accuracy or reliability.

The strategy is deliberately built on three things that can be defended today and one that cannot yet:

1. **Integration as the value proposition, not performance.** The portfolio is designed as a system — nine families, one vessel data model, one account/entitlement, one support relationship, a modular upgrade path (`COMMERCIAL-PORTFOLIO.md:9-16`; `WEBSITE-AND-ROADMAP.md:8`). Integrated ownership experience is a credible differentiator *proposal*; it is not yet evidence of working integration.
2. **EMBARCARTE as the visible, accountable seller.** EMBARCARTE is the legal seller, contractual party and support organisation that owns the customer relationship (`M00-DISCOVERY-BASELINE.md:7`; `MAREA-COMMERCIAL-ARCHITECTURE.md:7`). Trust is transferred from company conduct — existing real business lines and route identities (`WEBSITE-AND-ROADMAP.md:12-13`), local first market in Galicia and northern Portugal (`WEBSITE-AND-ROADMAP.md:10`), installer-led service, and honest readiness communication — **not** from unproven MAREA performance.
3. **Claim discipline as a brand behaviour.** Every family carries a lifecycle state and explicit exclusions. That posture is already demonstrable in this documentation set and is machine-enforced by the brand validator. It is the one differentiator that can be observed before any product ships.
4. **Readiness-staged delivery.** PILOT has a `BLOCKED` safety gate (H-01, `MC-02-BLOCKERS-AND-DECISIONS.md:80`); WATCH and FLEET are `BUILD` items with no product (`:103,:106`); NAV/HUB/AIS/SENSE/DISPLAY/WEATHER are `REUSE-CONDITIONAL` or `BLOCKED` pending rights, data licensing and hardware evidence. The brand must therefore speak in capability and readiness terms, never in availability terms.

The brand architecture is an **endorsed brand**: EMBARCARTE is the company and seller; MAREA is the endorsed product family; OPEN-MARINE remains an internal engineering identifier and must never appear as the public product brand (its ownership/licensing is `NOT_CLEARED`, blockers L-01…L-03, `MC-02-BLOCKERS-AND-DECISIONS.md:37-39`). Trademark symbols, whether registered or unregistered, and any "registered" language are prohibited everywhere until a clearance decision exists.

**What this document does not do:** it does not publish anything, does not price anything, does not certify anything, does not claim a competitor weakness, and does not authorise the MAREA name in any channel. Section 17 answers the thirteen mandated quality-standard questions explicitly.

## 2. Truth status, evidence discipline and document set

### 2.1 Standing constraints (non-negotiable for every later use)

- **MAREA is proposed.** Trademark legal clearance is `NOT_GRANTED`; an existing external business "Marea Marine" is a risk signal, not an infringement finding (`MARKET-BENCHMARKS.md:27`; `MC-02-BLOCKERS-AND-DECISIONS.md:113`). No registered or unregistered mark symbol may be attached to MAREA, and no text may present it as registered, cleared or approved.
- **OPEN-MARINE is not a brand.** It is the existing technology foundation and an internal/open engineering identifier; rights are not cleared (`MC-02-BLOCKERS-AND-DECISIONS.md:37-39`; `DECISION-LOG.md` D-002). It must never be used as the public product brand or in attribution.
- **Nothing is purchasable.** No price, stock, availability, delivery date, certification, sea trial, award, testimonial, customer count, market share, revenue or supplier quote may be asserted. Portfolio prices are cited only as hypotheses with the "not approved for publication" caveat (`COMMERCIAL-PORTFOLIO.md:5,123`).
- **No comparative superiority.** No statement that MAREA is safer, more accurate, more reliable or better value than any named manufacturer. Competitor observations belong in `COMPETITIVE-POSITIONING-EVIDENCE.md` with dates and evidence classes, or are labelled `HYPOTHESIS` here.
- **Segment motivations are hypotheses.** No primary customer interviews exist (X-06, `MC-02-BLOCKERS-AND-DECISIONS.md:118`); segment content in §10 is therefore reasoned `HYPOTHESIS` pending discovery, except where the roadmap already records a target.
- **Existing public identities are preserved.** This strategy changes no live page, route or brand string; the current site still says "Open Marine" in its default description (`src/app/core/site.config.ts:10-12`) and the legal identity fields are blank (`:21-25`; X-02 `MC-02-BLOCKERS-AND-DECISIONS.md:114`). Migration is a separate, explicitly authorised milestone (`WEBSITE-AND-ROADMAP.md:12-13`).

### 2.2 The MC-03 brand document set (ownership boundary)

| Document | Role | Owner |
| --- | --- | --- |
| `MAREA-BRAND-STRATEGY.md` | Strategy, positioning, segments, commercial and messaging boundaries (this file) | brand-strategist |
| `PRODUCT-NAMING-SYSTEM.md` | Naming layers, syntax, nine-family table, bundles, forbidden patterns | brand-strategist |
| `BRAND-VOICE-ES-EN.md` | The full bilingual voice, tone and messaging system | Lead |
| `brand-identity.contract.json` | Machine-readable identity contract (clearance state, names, bundles, permitted attribution, message keys) | governance-engineer |
| `COMPETITIVE-POSITIONING-EVIDENCE.md` | Dated competitor evidence appendix consumed by §11 | market-researcher |
| `TRADEMARK-CLEARANCE-RESEARCH.md` / CSV | Formal trademark research; must not be replaced by this strategy | brand-ip-researcher |
| `MC-04-VISUAL-IDENTITY-BRIEF.md` | Visual identity execution brief; §14 defers to it | creative-director |
| `WEBSITE-BRAND-MIGRATION.md` | Read-only audit of current site references and future migration | web-brand-auditor |

Where documents disagree, the machine-readable contract and the MC-02 blocker register win for status; this strategy never upgrades a status.

## 3. Purpose, mission, vision

### 3.1 Purpose (why the brand should exist)

Boats already in the water carry decades of mixed electronics, partial upgrades and equipment from several manufacturers. Owners are asked to either replace a working helm ecosystem or accept a fragmented one. The proposed purpose of MAREA is to make **coherent, supported modernisation of an existing vessel** possible — without pretending that the vessel is new, that the old equipment is worthless, or that any single purchase solves everything.

### 3.2 Mission (what the brand commits to doing)

1. **Unify what the vessel already reports** into one data vocabulary and one working experience across families, within a published compatibility envelope (`COMMERCIAL-PORTFOLIO.md:10,33`; `MAREA-COMMERCIAL-ARCHITECTURE.md:351-359`).
2. **Sell capability in modules** — software first where possible, hardware when validated, safety-critical control last — so an owner can start with one useful step and extend later (`COMMERCIAL-PORTFOLIO.md:133-136`).
3. **Deliver through accountable local installation and one support relationship**, with EMBARCARTE as the contractual party (`M00-DISCOVERY-BASELINE.md:7`).
4. **State limits before selling**: readiness state, exclusions, data provenance, compatibility and the difference between a proposed capability and a verified one (`COMMERCIAL-PORTFOLIO.md:138-139`; `MC-02-BLOCKERS-AND-DECISIONS.md`).

### 3.3 Vision (the long-term picture, no market claims)

A vessel whose electronics can be modernised once and then extended for years without replacing the boat, abandoning working equipment, or depending on an unaccountable supplier: a **supported, upgradeable, locally answerable vessel technology system**. Regional first (Galicia, northern Portugal), then Spain/Portugal, then the EU, translating regulated materials and support terms — never product names — by market (`WEBSITE-AND-ROADMAP.md:73-74`).

### 3.4 What MAREA is not

- Not a generic AI/SaaS platform; no AI claims are made anywhere in this strategy.
- Not a certified navigation system, ECDIS equivalent, collision-avoidance system or autopilot that can be sold today.
- Not a marketplace, a dealer network, a charter operator or a marine-safety service.
- Not a lower-price clone of established marine electronics; price is not a positioning plank until the economics exist (X-05, `MC-02-BLOCKERS-AND-DECISIONS.md:117`).

## 4. Brand promise

> **Proposed promise:** one coherent, locally supported way to modernise the electronics on the boat you already own — with every product's real capability, compatibility and readiness stated before you commit.

The promise has three commitments and one honesty clause:

1. **Coherence** — families are designed to compose: one data model, one account/entitlement, one support relationship, a modular upgrade path (§9).
2. **Accountability** — EMBARCARTE is the seller and stays the support relationship; installation is a first-class part of the product, not an afterthought (`COMMERCIAL-PORTFOLIO.md:133-136`).
3. **Continuity** — the old vessel and its usable equipment are the starting point; the offer is an upgrade path, not a forced replacement.
4. **Honesty clause** — the promise is a standard of conduct first. It may not be made as a product claim until the words "capability", "compatibility", "supported" and "available" are each backed by their gate (compatibility matrix, conformity evidence, lifecycle state). A promise that requires unverified performance is out of bounds.

**Promise boundary:** the promise is explicitly *not* "safer navigation", "more accurate forecasting", "certified marine electronics" or "cheaper than the market". Those would require evidence classes that do not exist (see §13).

## 5. Brand personality

Personality is defined as observable behaviour, not adjectives. Each trait lists what the brand does, what it never does, and where the behaviour is already visible.

| Trait | Observable behaviour (what it does) | Never does | Visible today in |
| --- | --- | --- | --- |
| **Instrument-precise** | States units, source, timestamp, validity window and uncertainty whenever it shows data; publishes edition, inclusion and exclusion in the same view | Rounds away uncertainty; shows a number without provenance; hides the exclusions below the fold | Portfolio per-product exclusions (`COMMERCIAL-PORTFOLIO.md:26,38,48-49,79-80,99-100`); architecture provenance rules (`MAREA-COMMERCIAL-ARCHITECTURE.md:382-403`) |
| **Calm under uncertainty** | Treats stale, offline, limited, degraded and unavailable as first-class states that are displayed | Sells calm by pretending nothing is wrong; uses fear or urgency | Architecture freshness/absence rules (`MAREA-COMMERCIAL-ARCHITECTURE.md:392,400-402`); AIS stale-target gates (`COMMERCIAL-PORTFOLIO.md:51,476`) |
| **Locally accountable** | Names who installs, who supports and how to reach support; distinguishes the seller from the technology origin | Says "partner network" or "certified installers" when no agreements exist (X-06); hides behind a non-existent "international team" | `M00-DISCOVERY-BASELINE.md:7`; `WEBSITE-AND-ROADMAP.md:10,12-13` |
| **Engineer-honest** | Publishes compatibility envelopes, lifecycle states, known gaps and blocked gates; labels concepts as concepts | Uses "coming soon" as a substitute for a gate; converts a target into a present-tense feature | MC-02 blocker register; lifecycle vocabulary (`COMMERCIAL-PORTFOLIO.md:142-147`); this document's status table |
| **Respectful of existing equipment** | Compares on scope and fit; says what a device must support; never disparages another brand | Claims another brand is unsafe, inaccurate or obsolete; claims superiority over named manufacturers | §13 claim rules; `MARKET-BENCHMARKS.md:2` |
| **Quietly premium** | Shows quality through documentation, fit/finish specification, installation care, support and restrained design | Fakes heritage, luxury-lifestyle cues, nautical mythology, awards or exclusivity; uses premium as a price claim | Visual direction (`WEBSITE-AND-ROADMAP.md:51-52`); MC-04 brief territory |

**Tone guardrails (operational, not exhaustive):** no exclamation marks in customer copy; no hype vocabulary as decoration ("revolutionary", "game-changing", "ultimate", "cutting-edge", "AI-powered", "safest"); no fear-selling around safety, weather or theft; no scarcity or countdown urgency; no jargon where a plain word works; no sentence that implies certification, approval or market leadership. The full bilingual tone system lives in `BRAND-VOICE-ES-EN.md`; the canonical message keys live in `brand-identity.contract.json`.

## 6. Positioning

### 6.1 Functional positioning

**For owners of existing leisure and small professional vessels who have a working but fragmented helm, MAREA is a connected, installer-supported modernisation system that brings compatible onboard data, navigation, monitoring and display into one coherent experience with a documented compatibility and upgrade path.**

Functional pillars (each is a design intent with a required proof gate, not a present claim):

| Pillar | Functional meaning | Proof required before saying it in market |
| --- | --- | --- |
| One vessel data model | Mixed supported equipment becomes one coherent view; applications read a single vocabulary (`MAREA-COMMERCIAL-ARCHITECTURE.md:351-359`) | Compatibility test matrix (HUB/AIS/SENSE); architecture MC-12A |
| Offline-first local function | Navigation, instruments and local monitoring do not depend on the internet or on billing state (`MAREA-COMMERCIAL-ARCHITECTURE.md:100,291`) | Per-product offline tests (MC-13) |
| Documented compatibility envelope | What is supported, what is not, and what needs a specialist assessment (`WEBSITE-AND-ROADMAP.md:47`) | Published matrix + tester evidence |
| Modular upgrade path | Start with a software subscription or one hardware step; extend families and editions later | Bundle/edition upgrade rules and deterministic compatibility rules (MC-09B/24) |
| One account, one entitlement | One account covers software, hardware registration and support; repeated entitlements are not charged twice (`COMMERCIAL-PORTFOLIO.md:9,127`) | Commerce/entitlement model (MC-11A) |
| Accountable installation and support | EMBARCARTE sells, supports and stands behind the installation path | Real installer terms and support process (X-06; MC-14A/28) |

### 6.2 Emotional positioning

The emotional job is **confidence through clarity, not excitement**. The owner should feel that the boat has been taken seriously, that the limits of a technology were disclosed before money changed hands, and that a named local company will answer after the sale. The intended emotional register is *calm, competent, unshowy ownership* — closer to a well-documented instrument than to a consumer gadget launch.

Emotional promises allowed: "you will not be surprised by hidden exclusions"; "the same company stays accountable"; "your boat can be improved without being replaced". Emotional promises prohibited: fear ("don't go to sea without X"), status ("join the elite"), urgency, and safety reassurance not backed by a safety case.

### 6.3 Category positioning

**Proposed category: connected refit systems for existing vessels** — an integrated, installer-delivered modernisation path that spans onboard data, navigation software, monitoring, display and (only when validated) supervised control.

Buyers do not currently shop for this category; their mental categories are "chartplotter", "AIS receiver", "NMEA gateway", "navigation app" and "boat alarm" (`MARKET-BENCHMARKS.md:6-18`). Consequences:

- The brand must **bridge** from those categories with explicit scope comparisons, not with a new-category speech. The comparison framing rules are in §11.
- Price expectations will be anchored to single-purpose devices. Premium positioning therefore cannot rest on "more technology"; it must rest on installation, support, integration and upgradeability — all of which are currently proposed, not evidenced.
- The category label is internal strategy; public copy should use plain descriptions ("navigation, onboard data and monitoring for your boat"), not invented market language.

**Positioning statements (segment variants, all `HYPOTHESIS` pending discovery):**

- *Owner modernising an older vessel:* "For owners of a boat with working but disconnected electronics who do not want a full helm replacement, MAREA is a supported upgrade path that connects what can be connected, tells you honestly what cannot, and lets you add capability in steps."
- *Coastal/offshore cruiser:* "For skippers planning and sailing with real weather and traffic context, MAREA is a navigation and monitoring ecosystem that shows data provenance and limits, with an installer-assessed compatibility envelope."
- *Small professional operator:* "For small fleets, schools and charter operators, MAREA FLEET is an operational records and oversight platform for multiple vessels — not a shipping ERP, not an emergency service, and not a consumer monitoring clone."

## 7. Differentiation thesis

### 7.1 The proposed difference

The differentiated position is **system-level coherence delivered through accountable local installation, with readiness honesty as a brand rule**. It is a bundle of five claims, of which only the fifth is directly evidenced today:

| # | Differentiator | Status today | What must happen before it is a public claim |
| --- | --- | --- | --- |
| D1 | One coherent data model across nine families | `HYPOTHESIS` — architecture design exists, integration is not tested (`P-02`,`P-05`,`P-07` blocked) | Compatibility matrix + MC-13 hardware/software evidence |
| D2 | Modular upgrade path that protects earlier purchases | `HYPOTHESIS` — designed into editions/bundles, no tested upgrade flow | Entitlement/bundle rules (MC-11A, MC-09B); real upgrade acceptance test |
| D3 | Installer-led delivery with EMBARCARTE as one accountable seller | `HYPOTHESIS` — proposed channel, no installer agreements (X-06) | Signed installer terms, training, warranty/RMA process (MC-14A/28) |
| D4 | Unified ownership experience (one account, one support relationship, no double billing) | `HYPOTHESIS` — principle recorded, commerce model missing (`P-09`,`P-10`) | Commerce/entitlement model + tested subscription presentation |
| D5 | Claim discipline: every family shows readiness, exclusions and evidence status | **Already visible** in this documentation set and enforceable by the brand validator | Keep it enforced; never let marketing copy outrun the contract |

### 7.2 What is explicitly not a differentiator

Not differentiators, and not to be used as positioning: being "more accurate" than a named chart/weather provider; being "safer" than established autopilots; being "cheaper"; having AI; having an open-source origin; having a larger product family (nine names are not nine products); having a "premium" price point; having a local brand. Each of these is either unproven, prohibited, or irrelevant to the buyer's decision.

### 7.3 Falsification tests (how the thesis could fail)

If a capability cannot be made to work across mixed equipment without materially worse installation burden than single-purpose devices, D1/D2 fail. If installers cannot earn a sustainable margin under the channel rule (`COMMERCIAL-PORTFOLIO.md:130`), D3 fails. If owners do not value honest readiness over availability, the brand posture must be re-tested, not defended. These tests belong to MC-04A economics, MC-09B compatibility and prompt-10 discovery.

## 8. Why trust EMBARCARTE (the evidenceable answer)

Trust must be founded on what exists today. MAREA has no customers, no certified product and no market record; EMBARCARTE has a company role, existing business lines and a live route identity. The trust argument is therefore **institutional and local, not technical**:

1. **One accountable seller.** EMBARCARTE is the seller, contractual party and support organisation; MAREA is not a separate legal entity and does not hide the seller behind a technology project (`M00-DISCOVERY-BASELINE.md:7`; `MAREA-COMMERCIAL-ARCHITECTURE.md:7`).
2. **Existing, preserved business lines.** The current site's real business offerings (experiences, boat delivery, services) are to be preserved, not replaced (`WEBSITE-AND-ROADMAP.md:12-13`; `M00-DISCOVERY-BASELINE.md:21`). Trust is transferred from the company's existing conduct.
3. **Local first market.** The stated first buyers are owners of older leisure boats in Galicia and northern Portugal, and the first go-to-market hypothesis is a Galicia/Rías Baixas HUB+NAV installation (`WEBSITE-AND-ROADMAP.md:10`; `COMMERCIAL-PORTFOLIO.md:133`). Local presence is a claim of proximity and service intent — not of expertise years, customer volume or installer coverage, which are not evidenced.
4. **Installer relationship as the trust intermediary.** For hardware and integration, the propose-and-quote path means a competent person assesses the vessel before a claim is made (`COMMERCIAL-PORTFOLIO.md:39,50,60`). This converts unknown compatibility into an assessed scope instead of an optimistic promise.
5. **Support as a designed relationship, not a hope.** One support relationship, one RMA/warranty path and honest lifecycle communication are the intended operating model (`COMMERCIAL-PORTFOLIO.md:19`; `MC-16A`/`MC-28` in the programme registry).
6. **Honest readiness communication.** The company can demonstrate today that it labels concepts as concepts, records blockers, and refuses to sell blocked products. That is a verifiable conduct claim, and it is the strongest trust asset before any product ships.

**Trust debts that must be closed before stronger trust language is allowed:** verified legal identity data (X-02, `src/app/core/site.config.ts:21-25`), real installer/distributor terms (X-06), a measured support process (MC-28), and customer evidence via discovery. Until then the brand may not say "trusted by", "years of experience", "certified installers", "proven at sea" or equivalent.

## 9. Product ecosystem logic — what unifies the nine families

### 9.1 The five binders

The nine families are one brand only if these five binders are real and visible. They are the internal logic of the ecosystem and must be designed as product requirements, not slogans.

| Binder | Meaning | Where it comes from | Current maturity |
| --- | --- | --- | --- |
| **One vessel data model** | A single vocabulary for position, instruments, sensors, AIS, environment and status; applications read it instead of integrating each device | `MAREA-COMMERCIAL-ARCHITECTURE.md:351-359` (Signal K contract as the proposed interoperability boundary) | Design decision `REUSE-CANDIDATE`; no compatibility matrix (MC-12A) |
| **One account and entitlement set** | One EMBARCARTE account for software, hardware registration, subscriptions and support; shared entitlements avoid double billing | `COMMERCIAL-PORTFOLIO.md:9,127`; `MAREA-COMMERCIAL-ARCHITECTURE.md:294` (C-4) | `BUILD` — commerce model has no subscriptions/entitlements (`MC-02-BLOCKERS-AND-DECISIONS.md:106`) |
| **One support relationship** | Same seller, same support channel, one warranty/RMA path regardless of family | `M00-DISCOVERY-BASELINE.md:7`; `COMMERCIAL-PORTFOLIO.md:19` | Process not built (MC-28) |
| **Modular upgrade path** | Edition upgrades and family additions extend a vessel's system; earlier purchases remain useful | `COMMERCIAL-PORTFOLIO.md:28,39,58`; bundle logic `:114-121` | Designed only; no tested upgrade flow |
| **One lifecycle grammar** | Every family is presented with the same readiness vocabulary and the same evidence requirements | `COMMERCIAL-PORTFOLIO.md:142-147`; this document §13 | Already documented; not yet enforced in public copy |

A sixth binder — **one design and instrument language** — belongs to MC-04 (`MC-04-VISUAL-IDENTITY-BRIEF.md`). This strategy sets the strategic requirement: the interface and hardware must read as one marine instrument family, not as nine unrelated gadgets.

### 9.2 Roles in the ecosystem (design intent, readiness-corrected)

| Family | Ecosystem role | Depends on | Cannot be justified by | Readiness today |
| --- | --- | --- | --- | --- |
| NAV | Daily planning/execution workspace and the software anchor of the system | Licensed-chart-capable sources, optional HUB/AIS data | Being bundled with hardware | `REUSE-CONDITIONAL`; chart rights `BLOCKED` (D-01) |
| HUB | Local onboard data gateway and connectivity coordinator — the integration entry point | Validated protocol/device compatibility | NAV (HUB must be useful on its own) | `BLOCKED` — no hardware (`P-02`) |
| AIS | Receive-only traffic awareness equipment | Receiver hardware, antenna, NAV/HUB integration | NAV (NAV works without it and buying NAV never implies radio hardware) | `BLOCKED` — `P-03` |
| PILOT | Supervised steering control within a documented compatibility envelope | Vessel-specific survey, installer commissioning, independent safety evidence | The rest of the ecosystem (safety case is standalone) | `BLOCKED` safety gate (`H-01`,`P-04`) |
| SENSE | Measured vessel/environment inputs (wind, battery, tank, bilge, temperature…) | A compatible HUB/WATCH architecture for integration | "Full vessel monitoring" without measured-signal list | `BLOCKED` — no sensor product (`P-05`) |
| WATCH | Remote position/event monitoring while ashore | Connectivity, device identity, cloud telemetry service | Being a distress service, theft guarantee or helm control | `BUILD` — foundation not found (`P-06`) |
| DISPLAY | Fixed marine display for approved MAREA interfaces | Verified enclosure/legibility; NAV/interface software | A consumer tablet or unverified "marine-grade" | `BLOCKED` — no hardware (`P-07`) |
| WEATHER | Forecast/planning service with provenance and uncertainty | Licensed data providers, entitlement model | NAV (WEATHER is separately useful) | `BLOCKED` — data rights (`D-04`…`D-07`,`P-08`) |
| FLEET | Multi-vessel operational SaaS for organisations | Telemetry from compatible WATCH/HUB, tenant isolation | Consumer monitoring clone or shipping ERP | `BUILD` (`P-09`) |

### 9.3 Ecosystem rules

1. Every family must stand alone on its own customer problem; no family may exist only as a cross-sell of another. The portfolio already models this: WEATHER is separately useful, AIS is hardware-independent of NAV visualisation, FLEET is not a consumer monitoring clone (`COMMERCIAL-PORTFOLIO.md:9,11,16`).
2. Integration claims must be directional and specific: "reads supported data from a compatible HUB", never "integrates with everything".
3. The upgrade ladder must be explainable in one sentence per step (edition upgrade, family addition, bundle) and must not require the customer to buy a blocked product.
4. A family whose safety gate is `BLOCKED` remains visible as a *proposed* capability only; it may not be included in a purchasable bundle (§12.3).

## 10. Customer segments

### 10.1 Reading note

No customer research exists. Every segment motivation, objection and willingness statement below is a `HYPOTHESIS` to be tested in prompt-10 discovery (X-06, `MC-02-BLOCKERS-AND-DECISIONS.md:118`); only the target priority is already recorded in `WEBSITE-AND-ROADMAP.md:10` and `COMMERCIAL-PORTFOLIO.md:133-136`. The table is deliberately specific so that discovery can falsify it.

| Segment | Buying decision difference | Main objection to answer | Trust requirement | Families in play | Honest first offer today |
| --- | --- | --- | --- | --- | --- |
| **Recreational sailors** (day/coastal) | Low-consideration, app-first, price-sensitive; compares with a phone app or a chartplotter subscription | "Another subscription — and do I get charts?" | Clear exclusions, chart-eligibility language, easy cancellation and data export | NAV, WEATHER | Pre-registration only when authorised; no price |
| **Coastal/offshore cruisers** | High-consideration, reliability/offline-driven; buys before a season, not on impulse | "What happens when the network or GNSS fails? Is the data fresh?" | Documented offline regions/licensing, provenance and stale-state behaviour, support route | NAV Pro, WEATHER Pro, HUB, AIS, DISPLAY | Scope discussion / quote request |
| **Motorboat owners** | Wants a fixed display and monitoring; less interested in sailing-specific modes | "Why not just buy a plotter? How hard is installation?" | Installer assessment, clear included/excluded list, serviceability | DISPLAY, HUB, WATCH, NAV | Configuration request |
| **Owners modernising older vessels** | Phased purchase, compatibility-driven; fears sunk cost and obsolescence | "Will it work with what I already have? Will I end up replacing everything?" | Compatibility matrix, phased upgrade path, honest "cannot do" list | HUB, NAV, SENSE, AIS, DISPLAY | Compatibility assessment / quote |
| **Sailing schools** | Organisation purchase; needs multiple boats, instructor/student access and duty-of-care clarity | "Can we manage several boats and prove we took reasonable care?" | Clear non-safety claim boundaries, organisation accounts, consent model | FLEET, WATCH, NAV | Discovery conversation only |
| **Charter operators** | Revenue/utilisation focus; needs remote status and guest-handled devices | "Will it be reliable, and what happens to our guest data?" | Tenant isolation, retention/consent statement, honest service limits (no inventable SLA) | FLEET, WATCH, HUB | Discovery conversation only |
| **Marinas** | B2B service bundling for berth holders; cares about liability and local support | "Who supports it on our pontoons?" | Local service partnership, clear scope, warranty path | WATCH, SENSE, HUB | Partnership conversation only |
| **Marine technicians** | Technical buyer; needs diagnostics, protocol support and spares | "Is this repairable? Are protocols documented? Vendor lock-in?" | Service documentation, documented protocol matrix, parts/warranty route | HUB, SENSE, AIS, DISPLAY | Technician/partner application when authorised |
| **Installers** | Channel and de-facto technical authority; decides viability by margin, support burden and repeatability | "Can I install it predictably, at a margin, without being blamed for the software?" | Real channel economics, training/checklists, compatibility triage, warranty process | HUB, AIS, SENSE, DISPLAY, PILOT (future) | Partner application + quote workflow when authorised; no claimed network |
| **Shipyards** | Project-timed, documentation-heavy; needs supply certainty and conformity paperwork | "Can you supply on our schedule and give the certificates the yard needs?" | Honest conformity/conformity-plan status, technical file plan, project support | DISPLAY, HUB, PILOT (future) | No yard offer today; design-partner conversations only |
| **Small professional fleets** | Operational necessity; compares per-vessel cost with paperwork/oversight value | "Is it cheaper than our current process, and who owns the data?" | Data ownership/export, onboarding, measured service evidence | FLEET Start/Business, WATCH | Discovery conversation only |

### 10.2 Segment priority

1. **Owners modernising older vessels, in Galicia and northern Portugal** — the first installation-led target (`WEBSITE-AND-ROADMAP.md:10`; `COMMERCIAL-PORTFOLIO.md:133`).
2. **Installers** — the channel without which the first target cannot be served honestly.
3. **Software-first buyers (NAV/WEATHER)** — the lower-inventory path while hardware gates are open (`COMMERCIAL-PORTFOLIO.md:134`).
4. **Sailing schools / charter / small fleets (FLEET)** — only after real B2B discovery (`COMMERCIAL-PORTFOLIO.md:136`).
5. **Marinas, technicians, shipyards** — partner/ecosystem roles, not launch segments.

Segment-specific value propositions must differ in scope and CTA; one generic "modernise your boat" pitch across all eleven would contradict the portfolio's segment logic and waste the discovery budget.

## 11. Competitive positioning framework

### 11.1 The framework (three axes)

MAPEA is positioned on three axes; the position is a *strategic intention*, not a measured fact:

1. **Scope axis** — single-purpose device ↔ multi-family ecosystem. MAREA intends to sit on the ecosystem side, but the ecosystem is only as real as its compatibility matrix.
2. **Delivery axis** — self-install retail ↔ installer-delivered, supported. MAREA intends installer-led for hardware and complex integration; direct for software subscriptions.
3. **Evidence axis** — claim-led ↔ readiness-led. MAREA intends to be readiness-led: lifecycle states, exclusions and data provenance visible.

The gap in the market that the strategy hypothesises (to be tested against `COMPETITIVE-POSITIONING-EVIDENCE.md`) is at the intersection: *integrated refit scope + installer accountability + honest readiness*. The evidence appendix may not be complete at the time of writing; any competitor statement in internal material must then be marked `HYPOTHESIS` until the appendix supports it with a dated source.

### 11.2 Comparison-framing rules

- Compare **scope of what is included**, never headline price; dated public prices are contextual references only (`MARKET-BENCHMARKS.md:2`).
- Never compare on accuracy, safety, reliability or "detection performance"; no such evidence exists for MAREA.
- Never name a competitor in a way that implies their product is deficient; describe MAREA's own scope and let the buyer compare.
- Every public comparison must cite the evidence appendix with a retrieval date and must be refreshed before publication; stale comparisons are prohibited.
- If the evidence pack is silent, label the statement `HYPOTHESIS` in the internal document and do not publish it.

## 12. Commercial strategy

### 12.1 Channel: installer-led hardware + direct software subscriptions

- **Hardware and complex integration:** assisted compatibility assessment, then installer-led quotation, survey and commissioning (`COMMERCIAL-PORTFOLIO.md:39,60`). Self-install only for permitted, low-risk, pre-validated configurations (`:39`).
- **Software:** NAV and WEATHER sold directly as subscriptions, standalone and useful without hardware (`COMMERCIAL-PORTFOLIO.md:9,98`).
- **Professional/B2B:** FLEET and yard/project work by quotation only after discovery; no volume, SLA or enterprise assumptions (`COMMERCIAL-PORTFOLIO.md:136`).
- **Channel rule:** a channel offer is acceptable only if contribution clears the target after manufacturing, support, warranty, installation and commission (`COMMERCIAL-PORTFOLIO.md:130`). The brand may not promise installer margins or distributor terms that do not exist.
- **Trust role of the installer:** the installer is the compatibility authority for the individual vessel. The brand secures the installer's ability to say "yes", "yes with these exclusions", or "no, needs specialist assessment" (`WEBSITE-AND-ROADMAP.md:47`).

### 12.2 Readiness-staged launch

The launch is a sequence of gates, not a date. Stage names and gates:

| Stage | What may be shown/sold | Entry gate | Prohibited until gate |
| --- | --- | --- | --- |
| S0 Internal (current) | Internal documents only; no public MAREA publication | This document set + contract + clearance research | Any public use of the MAREA name in a commercial context |
| S1 Pre-registration / information | Factual product-family information, readiness labels, quote/assessment requests | Trademark risk decision + copy approval + legal identity data (X-01, X-02) | Any purchase, price, availability or certification claim |
| S2 Software subscriptions | NAV/WEATHER subscriptions, entitlement model, cancellation and export | Chart/data licensing for the claimed scope (D-01…D-07), commerce/entitlement (MC-11A), approved prices | Bundles containing blocked products; offline claims beyond licensed regions |
| S3 Hardware batches | HUB, AIS, SENSE, WATCH, DISPLAY after conformity and support readiness | BOM/quotes (H-05…H-08, X-05), conformity (H-06), support/RMA (MC-28), approved prices | PILOT; "certified/CE" claims without DoC |
| S4 Supervised control | PILOT only after the safety programme | H-01/H-10 gates, bench/HIL/sea trials, independent verification, conformity, installer training | Any autonomous, remote or unattended control claim |
| S5 Professional operations | FLEET after discovery and B2B validation | Real B2B requirements + tenant isolation/billing (P-09), discovery evidence | Enterprise volume or SLA claims |

A stage gate is a **prerequisite for the claim**, not for engineering progress. Products may be engineered ahead of their gate; the brand may not speak ahead of it.

### 12.3 Bundle logic

- Bundles are **solution framings**, not discounts. Their minimum content promise comes from `COMMERCIAL-PORTFOLIO.md:114-121`.
- **No bundle may be presented as purchasable while any included product is blocked for sale.** Today that means all six bundles are `CONCEPT`: START includes HUB (`P-02`), CRUISE includes AIS + DISPLAY (`P-03`,`P-07`), SAIL and COMPLETE include PILOT (safety gate `BLOCKED`), PROTECT includes WATCH (`P-06`), and the FLEET package depends on FLEET (`P-09`). Bundles may be described as proposed solutions with per-item readiness, never as orderable.
- A bundle discount is the standalone contribution less shared cost saving and channel margin, never a marketing subtraction (`COMMERCIAL-PORTFOLIO.md:126`).
- Upgrades are priced as entitlement differences; the brand may not advertise "save X%" before approved prices exist.
- The FLEET name is dual-purpose: `MAREA FLEET` is the SaaS product; `MAREA FLEET package` is the integrated B2B offering. The disambiguation rule is defined in `PRODUCT-NAMING-SYSTEM.md` and must be used in every bundle surface.

### 12.4 Subscription presentation principles

1. **No double billing.** A premium forecast entitlement shared with NAV is not charged twice; the entitlement, not the product, is what the customer owns (`COMMERCIAL-PORTFOLIO.md:9,98,127`).
2. **Entitlement clarity.** The customer sees exactly which capabilities an edition grants, what is included, what requires a separate licence (e.g. chart data), and what happens at expiry.
3. **Expiry never removes local safety-relevant function.** Billing state may gate presentation and premium data views, never local navigation information, instrument data or manual control (`MAREA-COMMERCIAL-ARCHITECTURE.md:101,291`).
4. **Separate things that are separate.** A MAREA subscription is not a chart licence, not a data-provider contract, not a connectivity/SIM plan and not installation labour; each is disclosed in its own line (`COMMERCIAL-PORTFOLIO.md:124`).
5. **VAT/channel honesty.** Consumer retail prices are VAT-inclusive hypotheses; B2B presentation is ex-VAT with volume terms only when they exist (`COMMERCIAL-PORTFOLIO.md:5,108`; `WEBSITE-AND-ROADMAP.md:10`).
6. **Cancellation and portability.** A cancelled NAV subscription preserves export of the customer's own route data (`COMMERCIAL-PORTFOLIO.md:28`).
7. **No price until approved.** No hypothesis price may appear in a purchasable interface (`COMMERCIAL-PORTFOLIO.md:5,123`; `MAREA-COMMERCIAL-ARCHITECTURE.md:291`).
8. **Naming of plans is the naming system's job**, not free-form marketing: plans reuse family + edition tokens and add term words outside the name (`PRODUCT-NAMING-SYSTEM.md` §3 layer 8; §12.1).

## 13. Navigation-safety messaging boundaries

MAREA sits near safety-critical decisions without being a safety system. The boundary is a hard rule set, not a tone preference.

### 13.1 Claim classes

| Class | Allowed now (internal/proposed framing) | Allowed only with a named gate cleared | Prohibited (never in public or internal drafts presented as fact) |
| --- | --- | --- | --- |
| Navigation | "Planning and navigation views", "licensed-chart-capable", "AIS overlay where supported" | "Offline supported regions" only after chart/data licensing and tests (D-01…D-03, MC-13-NAV) | "Official charts included", "ECDIS compliant/equivalent", "primary navigation system", "certified navigation" |
| Traffic (AIS) | "Receive-only traffic awareness", "CPA/TCPA decision support with declared limits" | Receiver and RF conformity, antenna specification, stale-target behaviour (H-08, MC-13-AIS) | "Collision avoidance", "detects all vessels", "guaranteed detection", "AIS certified", any transmit/transponder implication |
| Forecast (WEATHER) | "Forecast with source provenance, validity window and uncertainty" | Local forecast evaluation in the pilot geography (MC-13-WEATHER) | "Guaranteed weather", "meteorological precision", "safety-grade forecast" |
| Control (PILOT) | "Proposed supervised steering within a documented compatibility envelope — not available" | Bench/HIL/sea trials, independent verification, conformity (H-01/H-10) | "Autopilot available", "autonomous", "remote helm", "self-steering without supervision" |
| Monitoring (WATCH) | "Remote position, status and event alerts while ashore" | Alert-delivery, privacy and coverage evidence (MC-13-WATCH) | "Distress alert", "theft prevention guaranteed", "always connected", "remote control" |
| Hardware claims | "Designed for the marine environment, subject to verification" | CE/EMC/RED/LVD/GPSR/RoHS/WEEE evidence per SKU (H-06) | "CE certified", "NMEA 2000 Certified", "marine-grade" before testing, "waterproof" before ingress data |
| Safety messaging | "Readiness and limitations stated", "operator responsibility" | — | "Safer", "safest", "uncompromised safety", "replaces your navigation stack" |
| Emergency | — | — | Any implication of emergency/distress response or life-safety function |

### 13.2 Rules for all navigation-adjacent copy

1. **Provenance is visible.** Any displayed data must be able to show source, time and validity; stale/degraded states are shown, not hidden (`MAREA-COMMERCIAL-ARCHITECTURE.md:390-402`).
2. **Chart classes are never merged.** User-supplied licensed charts, open contextual layers and official ENC products remain distinct promises (`MAREA-COMMERCIAL-ARCHITECTURE.md:416-444`). No "charts included" claim without a resolved licence.
3. **No implied certification by imagery.** Test rigs, sea-trial photos, lab images or prototypes must never be presented so as to imply conformity (X-03, image generation `BLOCKED`).
4. **Operator responsibility stays explicit.** Supervised control, manual takeover and human responsibility are part of the product story, not small print.
5. **Safety information is not an entitlement feature.** No update, alert or local function may be hidden behind a paywall (`MAREA-COMMERCIAL-ARCHITECTURE.md:291`).
6. **When in doubt, downgrade the claim, not the evidence.** The brand's default posture is "capability, compatibility, readiness" — never "safety guarantee".

## 14. Brand architecture and long-term expansion rules

### 14.1 Model: endorsed brand

| Name | Role | Who may use it publicly | Status |
| --- | --- | --- | --- |
| **EMBARCARTE** | Company, legal seller, contractual party, installer/services, support, customer relationship | Yes — existing public identity (`src/app/core/site.config.ts:7`); legal identity data still missing (X-02) | Existing company |
| **MAREA** | Proposed product brand for the marine technology family, endorsed by EMBARCARTE | **No commercial public use until the trademark gate allows it** | `NOT_GRANTED` clearance; proposed |
| **OPEN-MARINE** | Existing technology foundation; internal/open engineering identifier | **Never** as a public product brand or in attribution | Rights `NOT_CLEARED` (L-01…L-03); internal only |

**Attribution rules:** MAREA is always presented as a product brand of EMBARCARTE, the seller; the canonical attribution strings are owned by `brand-identity.contract.json` and must not be improvised. Constructions such as "MAREA by [a technology project]", "EMBARCARTE by MAREA", or an ownerless "a brand of" are prohibited. The engineering origin may appear only in engineering/licensing documentation where legally appropriate, never in marketing.

**Brand architecture consequences:** the endorsed model limits exposure because EMBARCARTE remains the visible legal seller, but it does **not** substitute for trademark clearance. The strategy does not rely on the endorsement to make the mark safer; it relies on the endorsement to make accountability clearer.

### 14.2 Relationship to existing EMBARCARTE identity

- Existing EMBARCARTE pages, routes, indexed URLs and existing services are preserved (`WEBSITE-AND-ROADMAP.md:12-13`). MC-03 changes none of them.
- The current default site description still credits "Open Marine" (`src/app/core/site.config.ts:10-12`); this is a known live-site inconsistency to be resolved by the authorised migration milestone (`WEBSITE-BRAND-MIGRATION.md`), not by this strategy.
- MAREA is an addition to the EMBARCARTE portfolio, not a renaming of the company. In public architecture terms: EMBARCARTE (company) → MAREA (product brand) → nine families (products) → editions/bundles (offers).

### 14.3 Expansion rules (new families, geography, partners)

1. **A new family is a contract change, not a marketing decision.** Adding a tenth family requires: naming review per `PRODUCT-NAMING-SYSTEM.md` §15, registration in `brand-identity.contract.json`, validator update (`npm run test:brand`), bundle mapping, a defined domain and lifecycle, and Lead approval. The nine-family set is a governance constant for MC-03.
2. **Editions and bundles never become families.** A name that is not in the family set cannot be promoted to a family-level brand without the full registration path.
3. **No sub-brand proliferation.** New capabilities are expressed as editions, sizes, accessories or bundles of existing families until evidence justifies a family.
4. **Geography does not create brand variants.** Product names are invariant across markets; regulated/legal/support material is localised instead (`WEBSITE-AND-ROADMAP.md:73-74`). No country or region token becomes part of a product name.
5. **Acquisitions, co-branding and white-labelling are out of scope** for MC-03 and require legal/brand review; no "by [partner]" co-branding, and no licensing of the MAREA mark to third parties before the ownership/clearance decision.
6. **Attribution grows only after clearance.** Naming a sub-brand, strapline or "family of systems" label in public requires the same gate as the MAREA name itself.

## 15. Bilingual elements — strategic message hierarchy

The full bilingual voice, tone and copy system is owned by the Lead in `docs/marea/brand/BRAND-VOICE-ES-EN.md`; the canonical short reference strings are machine-readable message keys in `brand-identity.contract.json`. **This document does not duplicate either**, and no copy below may be published without those sources.

Strategic message hierarchy (what a page says, in order):

1. **Company frame (EMBARCARTE):** who the seller is and that the seller remains accountable.
2. **Category frame:** a supported modernisation system for the boat you already own — not "AI navigation", not a plotter, not a marketplace.
3. **Master brand promise:** coherence + accountability + continuity + honest readiness (§4).
4. **Family statement:** one sentence per family — what it is, what it does, and its readiness state (readiness first, promise second).
5. **Edition/value statement:** what the chosen edition includes and excludes; what requires a separate licence.
6. **Proof statement:** only evidenceable proof — installer assessment, compatibility method, support relationship, published limitations.
7. **Claims/readiness line:** lifecycle state, blocked gates, concept labels, safety boundaries (§13).
8. **CTA by readiness:** pre-registration, compatibility assessment, quote request, or "not yet available"; never a purchase button for an unapproved SKU.

Bilingual rules: brand tokens (`MAREA`, family, edition, size) are invariant; only descriptors and sentences are localised; no translated family names; no invented Spanish/English slogans in this document; both locales carry the same readiness state and the same exclusions.

## 16. Risks to the positioning and controls

| # | Risk | Severity | Control | Owner function / gate |
| --- | --- | --- | --- | --- |
| R-01 | Trademark clearance `NOT_GRANTED`; "Marea Marine" conflict signal | CRITICAL | No public commercial use; symbols prohibited; clearance research + counsel decision; contract enforces status | Company owner + counsel (X-01; prompt 03) |
| R-02 | Readiness gap (PILOT blocked; WATCH/FLEET not built) invites over-claiming | CRITICAL | Readiness-staged stages (§12.2); lifecycle state on every surface; no blocked product in purchasable bundle | Lead + product (MC-20…MC-26) |
| R-03 | Installer channel does not exist (no agreements) | HIGH | No network/coverage/certified-installer claims; partner programme only after real terms (MC-14A) | Product + channel |
| R-04 | Chart/weather/AIS data rights unresolved | HIGH | "Licensed-chart-capable" only; no bundled charts; provider disclosure; data classes kept distinct | Product + counsel (D-01…D-10) |
| R-05 | Price hypotheses leak into public surfaces | HIGH | No prices until approved; economics gate before publication (X-05, MC-04A) | Finance + Lead |
| R-06 | OPEN-MARINE rights not cleared | HIGH | Internal identifier only; no code reuse/public attribution before DEC-01/D-002 | Company owner + counsel (L-01…L-03) |
| R-07 | Category confusion (buyers compare with plotters/gateways) | MEDIUM | Explicit scope comparisons; dated evidence appendix; no price-anchored comparison | Brand + market evidence (task-03) |
| R-08 | Superiority or certification language creeping into copy | HIGH | Claims policy (§13); forbidden-pattern checks; independent review; validator | Lead + reviewer (prompt 14) |
| R-09 | Brand dilution through too many names/editions | MEDIUM | Naming system + contract + `npm run test:brand`; new tokens need registration | Lead + governance |
| R-10 | Legal identity data missing (X-02) undermines "accountable seller" | HIGH | No trust/contract language beyond what exists; complete legal data before any commercial offer | Company owner (X-02) |
| R-11 | Image generation `BLOCKED` leads to improvised or unproven visuals | MEDIUM | No generated imagery claim; CONCEPT labels; MC-04 brief governs | Design (X-03, MC-04) |
| R-12 | Local-first focus misread as a national or international brand claim | LOW | Region stated as first market, not as coverage; expansion is gated by market-specific legal/support work | Lead + commercial |

## 17. The thirteen mandated quality-standard questions — explicit answers

Each answer is written so that a reviewer can verify it against a cited source and check that it does not overclaim.

**Q1. Why should a customer trust EMBARCARTE?**
Because EMBARCARTE is the named seller, contractual party and support organisation (`M00-DISCOVERY-BASELINE.md:7`), it runs existing real business lines that are preserved rather than replaced (`WEBSITE-AND-ROADMAP.md:12-13`), its first market is local and specific — Galicia and northern Portugal (`WEBSITE-AND-ROADMAP.md:10`; `COMMERCIAL-PORTFOLIO.md:133`) — and it can demonstrably communicate readiness and limits honestly. Trust is company-level and local, **not** a claim that MAREA products perform better. Legal identity data is still missing and blocks stronger trust language (X-02).

**Q2. What does MAREA represent?**
A proposed product brand for a connected, installer-supported modernisation system for existing vessels: nine capability families unified by one vessel data model, one account/entitlement, one support relationship and a modular upgrade path (`COMMERCIAL-PORTFOLIO.md:7-16`). It represents coherence and accountable ownership — not a registered mark, not a certification, not a promise of superior safety or accuracy.

**Q3. What unifies the nine products?**
Five designed binders: one vessel data model (Signal K contract as the interoperability boundary, architecture decision MC-12A), one account/entitlement with no double billing, one support relationship under EMBARCARTE, a modular upgrade path, and one lifecycle/readiness grammar — plus one design language in MC-04 (`MAREA-COMMERCIAL-ARCHITECTURE.md:351-359`; `COMMERCIAL-PORTFOLIO.md:9,114-127`). These are design commitments; only the lifecycle grammar is evidenced today.

**Q4. What is genuinely different about MAREA?**
The proposed difference is system-level coherence delivered through accountable local installation, with readiness honesty as a brand rule. It is a `HYPOTHESIS` until a compatibility matrix, installer terms and a commerce/entitlement model exist; the only differentiator observable today is the readiness/claim-discipline posture itself (this documentation set + validator). Price, accuracy, safety, AI and open-source origin are explicitly not differentiators (§7).

**Q5. How are NAV, WEATHER and AIS commercially differentiated?**
They are different commercial units, not one software product: NAV is the planning/navigation application subscription with licensed-chart-capable sources and optional instrument/AIS data (`COMMERCIAL-PORTFOLIO.md:22-29`); WEATHER is a standalone planning/forecast service with provenance and premium entitlements shareable with NAV without double billing (`:95-102`); AIS is receive-only equipment — hardware purchase plus integration, not an app feature — that NAV can visualise when present but never implies (`:44-52`). Differentiation is by scope, unit and evidence burden: chart/data rights for NAV, licensed providers and forecast evaluation for WEATHER, RF/hardware conformity for AIS.

**Q6. Why HUB rather than a conventional gateway?**
`HYPOTHESIS`: conventional gateways are single-purpose conversion boxes whose dated price references are EUR 240–249 (`MARKET-BENCHMARKS.md:9-10`). The proposed HUB is an onboard coordination appliance — multi-protocol/device orchestration, a documented local data interface, diagnostics, setup guidance and the installer's compatibility checklist — sold with support and an upgrade path rather than as a bare converter. This remains a hypothesis until protocol/device tests and BOM economics exist (`P-02`; `H-05`); it is a reason to *investigate*, not a reason to claim superiority.

**Q7. What is the installer's role?**
The installer is the technical author of the individual vessel's compatibility promise: assessment, installation, commissioning, owner training and the "yes / yes-with-exclusions / no-specialist-assessment" judgement (`COMMERCIAL-PORTFOLIO.md:39,60`; `WEBSITE-AND-ROADMAP.md:47`). EMBARCARTE remains the seller and product support owner; the installer is the local accountable intermediary. The channel exists only after real terms, training and economics (`COMMERCIAL-PORTFOLIO.md:130`); the brand may not claim a network today.

**Q8. How do the hardware and software ecosystems coexist?**
Software is independently useful (NAV, WEATHER, FLEET); hardware adds onboard data, traffic, monitoring or display capability where validated. One account covers software and hardware registration; hardware functions locally and offline; subscriptions gate premium presentation, not safety-relevant local information (`MAREA-COMMERCIAL-ARCHITECTURE.md:100-101,291`). A hardware purchase does not force a subscription except a disclosed recurring service (WATCH monitoring), and a subscription does not imply hardware ownership.

**Q9. How are subscriptions presented?**
As entitlements: what capability the edition grants, what is excluded, what requires a separate licence, what happens on expiry, how cancellation and data export work. No double billing for shared forecast entitlements; term/VAT presentation differs consumer vs B2B; chart data, connectivity and installation labour are separate lines; no price appears before approval (`COMMERCIAL-PORTFOLIO.md:5,9,28,98,123-127`).

**Q10. How does the brand avoid implying unverified navigation safety?**
By a claims policy with allowed/evidence-gated/prohibited language (§13), lifecycle labels on every family, mandatory provenance and stale-state display, explicit "receive-only"/"decision support"/"supervised" vocabulary, no ECDIS/ENC-equivalence or collision-avoidance language, no certification claims before a declaration of conformity exists, and operator responsibility kept visible. Safety information is never behind a paywall.

**Q11. How is the brand presented professionally before release?**
As `PROPOSED`: no purchase, no price, no availability, no certification, no testimonials, no awards, no "coming soon" dates, no implied launch. Factual family and readiness information, quote/assessment routes, concept labels and dated evidence only; the MAREA name stays internal until clearance and copy gates allow external use. Existing EMBARCARTE identities remain unchanged until an authorised migration (`WEBSITE-AND-ROADMAP.md:12-13`; `MC-02-BLOCKERS-AND-DECISIONS.md:113`).

**Q12. How does international expansion stay naming-coherent?**
Brand tokens are invariant across markets; only descriptors, legal/support material and regulated copy are localised. No translated family names, no country tokens inside product names, no "MARINE"/geography suffix attempts to escape trademark conflicts (adding generic suffixes does not avoid conflicts), and one machine-checked naming contract shared by all locales. Spanish/English URLs are locale variants of the same identity (`WEBSITE-AND-ROADMAP.md:16-37,73-74`).

**Q13. Why is the identity premium-appropriate?**
Because the premium is earned by installation quality, documented compatibility, support, longevity and instrument-grade design — not by unproven performance, luxury cues or price theatre. The identity must read as credible marine instrumentation (naval instrument credibility, restrained palette, precise data visualisation — `WEBSITE-AND-ROADMAP.md:51-52`), and MC-04 must convert that into an identity system without copying competitors or inventing heritage (`MC-04-VISUAL-IDENTITY-BRIEF.md`).

## 18. Open points, non-assertions and change control

### 18.1 Open points for the Lead to reconcile

1. **COMPLETE bundle wording — resolved in the contract, portfolio revision pending.** `COMMERCIAL-PORTFOLIO.md:120` includes a "certified supervised pilot" in the COMPLETE minimum content, which contradicts the PILOT conformity/safety status (`MC-02-BLOCKERS-AND-DECISIONS.md:80,101`) and the portfolio's own "no certification" rule. **Resolved in `brand-identity.contract.json`:** the COMPLETE bundle `minimumContent` now reads "supervised pilot (only once its safety gate is complete)". The phrase in `COMMERCIAL-PORTFOLIO.md` is still pending correction in the product-definitions batch (prompts 05–07) and must not be reused from there.
2. **START price-hypothesis consistency.** `COMMERCIAL-PORTFOLIO.md:116` hypothesises START at EUR 499, while its stated minimum content (NAV Essential EUR 99 + HUB Standard EUR 349) sums to EUR 448 (`:24-25,:35-36`). Either the bundle implies a higher edition or the hypothesis needs reconciliation in MC-04A economics. This is a pricing-hypothesis issue, not a naming issue.
3. **Trademark research reconciliation.** The clearance status and any name-risk findings must be taken from `TRADEMARK-CLEARANCE-RESEARCH.md`; if it recommends additional screening (e.g. for MAREA with generic suffixes), this strategy's naming rules already forbid suffix-based "solutions", but the Lead must reconcile the final go/no-go.
4. **Claims policy ownership.** The programme assigns the claims policy to prompt 14 (legal/commercial risk register). §13 is a brand-side boundary; prompt 14 remains the authoritative claims policy once produced.
5. **Live-site inconsistency.** `src/app/core/site.config.ts:10-12` still presents "Open Marine" as the public brand and `:21-25` has empty legal identity fields; both are known gaps recorded in M00/X-02 and must be fixed in the authorised migration, not by MC-03.
6. **Contract bundle and message reconciliation — resolved.** `brand-identity.contract.json` (v1.0.0) now keeps the machine `displayName` "MAREA FLEET" for the bundle id `FLEET` (a validator invariant) and adds `customerFacingName: "MAREA FLEET package"`, with `fleetDisambiguation` stating that the customer-facing bundle form is always "MAREA FLEET package" (this document §12.3; `PRODUCT-NAMING-SYSTEM.md` §11.2; `BRAND-ARCHITECTURE.md:67,101-102`). No divergence remains between the contract and this document.
7. **Availability-implying message keys — resolved.** The contract's `headlineSecondaryTwo` is now "Empieza por lo que ya llevas a bordo" / "Start with what is already aboard" (it previously read "Instala hoy" / "Install today"). The `companyDescription` no longer asserts active selling in Spain, Portugal or the EU; priority markets are stated as strategy in §5 (segments) and §7 (local first market) of this document, not as present commercial presence. `BRAND-VOICE-ES-EN.md` §2 carries the aligned strings.

### 18.2 Non-assertions

This document does not assert and must not be read as asserting: trademark clearance, registration or availability of the MAREA name; commercial availability, stock, price, delivery, certification, conformity or sea-trial evidence for any family; any superiority over any named manufacturer; any customer, revenue, market-share, award or testimonial; any installer network, service-level or coverage; any implemented integration or compatibility; any approval of the visual identity; or any authorisation to publish.

### 18.3 Change control

Changes to positioning, promises or safety messaging require Lead review and re-validation of the brand contract. Changes to product identities or editions require the registration path in `PRODUCT-NAMING-SYSTEM.md` §15 plus the machine check (`npm run test:brand`, wired by the Lead from `scripts/check-brand.mjs`). Historical versions are superseded by date, never silently rewritten.

End of document.
