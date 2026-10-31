# MC-09 — Competitive positioning dossier

Status: `INTERNAL_DESK_RESEARCH`. Research date **2026-10-31**. All prices below
are observations from `competitors/MC09-COMPETITOR-PRICING.md` and
`data/competitor-observations.json`; original currency and tax treatment are
preserved. MAREA figures are `HYPOTHESIS_UNAPPROVED` from the canonical product
and bundle contracts, not offers, not costs and not approved prices.

Two different things are kept apart throughout:

- `PROPOSED_DIFFERENTIATION` — what MAREA is designed to do better, asserted by
  the internal product definitions, not yet proven in the market.
- `EVIDENCE_SUPPORTED_DIFFERENTIATION` — a difference that the MC-09 evidence
  actually supports today.

A differentiator that depends on untested compatibility, unimplemented behaviour,
source-IP clearance, data rights or safety verification can never become an
approved product claim.

## 0. Cross-cutting findings

1. **No competitor sells an installed, commissioned complete solution equivalent
   to a MAREA bundle.** Every complete-solution total in the research is a
   composition of separately priced parts, and the composition excludes
   installation unless the installer's own tariff is added (`CLM-CMP-025`).
2. **The installed base is the real market.** Spain registers roughly 5,000 new
   recreational craft a year but the addressable equipment base is the existing
   fleet; ownership of older, mixed-brand boats is where the fragmentation
   problem lives (`CLM-BUY-001`, `CLM-BUY-002`).
3. **Subscription categories are crowded and cheap at the entry.** Navigation
   and weather subscriptions are observable from EUR 19 to EUR 149 per year
   (`OBS-CMP-001`, `OBS-CMP-002`, `OBS-CMP-023`, `CLM-CMP-022`).
4. **Hardware categories are commodity-anchored.** Gateways, AIS receivers,
   sensors, displays and autopilots all have established, price-transparent
   products (`OBS-CMP-004` to `OBS-CMP-022`).
5. **Marine data is licensed, not owned.** Charts, weather and AIS-derived
   services carry provider rights that are not granted; this caps every
   data-dependent differentiation (`data/governance-status.json`).
6. **Channel economics are observable only as process.** Vendor dealer
   programmes publish process but no public ES/PT margin or discount
   (`CLM-CHN-036`). Spanish yard labour is public at EUR 59-76/hour, with an
   electronics line at EUR 61/hour (`CLM-CHN-001`).

## 1. NAV — navigation software and charting

| Field | Assessment |
|---|---|
| Target buyer | S1 coastal owner, S2 sailing owner, S4 cruiser |
| Primary problem | Fragmented navigation and recurring chart/weather cost across brands and devices |
| Existing alternatives | Orca Plus EUR 49/year, Orca Smart Navigation EUR 149/year, Navionics app EUR 49.99-149.99 per year, bundled chartplotters (`OBS-CMP-001`, `OBS-CMP-002`, `OBS-CMP-003`, `CLM-CMP-022`) |
| Core customer outcome | One navigation surface that uses the vessel's own data and one predictable subscription |
| PROPOSED_DIFFERENTIATION | Unified access to local vessel data (HUB), offline-first operation, one entitlement across devices |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | Only software distribution and direct validation are evidenced. No evidence yet shows MAREA NAV is better than Orca or Navionics on charts, routing or usability |
| Evidence still missing | Licensed chart access, measured usability, offline behaviour, price acceptance |
| Competitor strengths | Mature charts, installed user base, lower entry price (Orca EUR 49/year) |
| Differentiation risks | Chart licensing dependency, price ceiling set at EUR 49-149/year, switching cost of installed chartplotters |
| Buyer objections | "I already have Navionics"; "why pay another subscription?" |
| Potential channel | Direct online (trial/activation), installer recommendation |
| Pricing sensitivity | High; the category ceiling is observed at EUR 149/year |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; chart and data rights `NOT_GRANTED` |
| Dependencies | Chart rights, source-IP clearance, brand clearance |
| Validation experiment | MC-10 concept comprehension plus current-chart-spend discovery (EXP-MC10-03) |
| Provisional recommendation | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` — as a software/service validation, not a launch |

## 2. HUB — vessel data gateway

| Field | Assessment |
|---|---|
| Target buyer | S1/S4 owners modernising a mixed-brand helm; installer as influencer |
| Primary problem | Existing electronics do not share data cleanly; each brand wants its own ecosystem |
| Existing alternatives | Digital Yacht NavLink2 EUR 300, iKonvert EUR 240, Victron Cerbo GX EUR 240.09, PredictWind DataHub USD 299 (`OBS-CMP-004`, `OBS-CMP-005`, `OBS-CMP-019`, `OBS-CMP-007`) |
| Core customer outcome | One local gateway that publishes the vessel's data to the products the owner actually uses |
| PROPOSED_DIFFERENTIATION | Multi-device orchestration beyond a single protocol bridge, local-first, installer-grade integration |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | None beyond category existence. Gateways are a real, price-anchored category; orchestration behaviour is unverified |
| Evidence still missing | Protocol conformance evidence, installer compatibility tests, measured installation burden |
| Competitor strengths | Established interoperability, wide retail availability, EUR 240-300 price anchor |
| Differentiation risks | NMEA 2000 certification not held; competing with mature gateways at a EUR 349-499 hypothesis |
| Buyer objections | "A gateway is a gateway"; installers distrust unproven integration |
| Potential channel | Installers first; direct second |
| Pricing sensitivity | High; hypothesis sits above the observed EUR 240-300 band |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; hardware not selected |
| Dependencies | NMEA 2000 conformance, CE/EMC, source-IP clearance |
| Validation experiment | Installer interviews on orchestration value and liability (EXP-MC10-02) |
| Provisional recommendation | `FURTHER_RESEARCH_REQUIRED` |

## 3. AIS — AIS reception

| Field | Assessment |
|---|---|
| Target buyer | S1/S4 owner, coastal and near-shore |
| Primary problem | Seeing nearby traffic without paying for a transmit-capable transponder |
| Existing alternatives | Digital Yacht AIS100 EUR 360 receive-only (`OBS-CMP-009`); transmit-capable transponder packs EUR 1,620-2,100 are a different product (`OBS-CMP-010` to `OBS-CMP-012`, `CLM-CMP-031`) |
| Core customer outcome | Receive-only traffic awareness integrated into navigation |
| PROPOSED_DIFFERENTIATION | Integration with NAV/HUB and a lower price point |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | None. A EUR 360 receive-only receiver already exists and the MAREA hypothesis is EUR 249-399 |
| Evidence still missing | Receiver sensitivity, antenna requirements, decoder licence |
| Competitor strengths | Established receiver, documented antenna requirement (`CLM-ECO-009`) |
| Differentiation risks | Commodity category; GPL decoder decision unresolved (DEC-04) |
| Buyer objections | "The brand-name receiver is proven and only EUR 111 more" |
| Potential channel | Retail/installer |
| Pricing sensitivity | High; a marginal saving does not justify a new brand |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; engineering `NOT_VERIFIED` |
| Dependencies | GPL decoder decision, hardware selection, conformity |
| Validation experiment | None justified in MC-10 beyond comprehension; do not spend validation budget here |
| Provisional recommendation | `RECONSIDER_PRODUCT_STRATEGY` — integrate reception, do not manufacture a receiver |

## 4. PILOT — supervised steering

| Field | Assessment |
|---|---|
| Target buyer | S2 sailing owner, S4 cruiser |
| Primary problem | Holding a course and reducing helm workload |
| Existing alternatives | Raymarine EV-100 Wheel pack EUR 2,050 incl. VAT, Simrad NAC packs EUR 2,100.56-3,083.08 incl. VAT (`OBS-CMP-013`, `OBS-CMP-016`, `OBS-CMP-017`) |
| Core customer outcome | Supervised heading hold integrated with navigation, never unattended remote control |
| PROPOSED_DIFFERENTIATION | Navigation-aware steering with a supervised safety model |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | None. The category is mature, certified and priced at EUR 2,050-3,083 |
| Evidence still missing | Sea trials, E-stop and motor isolation, hazard analysis, independent safety verification |
| Competitor strengths | Certified, serviced, widely installed |
| Differentiation risks | Safety-critical; an official accident report shows loss of rudder feedback disabling autopilot and follow-up steering (`CLM-BUY-011`) |
| Buyer objections | Trust; warranty; liability |
| Potential channel | Specialist installer only |
| Pricing sensitivity | Low on price, extreme on trust |
| Readiness | `BLOCKED`; PILOT safety gate `BLOCKED`; sea trials `NOT_PERFORMED` |
| Dependencies | Safety case, sea trials, conformity, installer liability terms |
| Validation experiment | Concept comprehension only in MC-10; no commercial experiment |
| Provisional recommendation | `DEFER` |

## 5. SENSE — onboard sensors

| Field | Assessment |
|---|---|
| Target buyer | S1/S3/S6 owners and operators with monitoring needs |
| Primary problem | Battery, bilge, temperature and wind data are scattered or unmonitored |
| Existing alternatives | Victron SmartShunt EUR 90.21 incl. VAT, B&G WS310 EUR 489.95, B&G Triton2 instrument pack EUR 1,149.40 incl. (`OBS-CMP-018`, `OBS-CMP-019`, `OBS-CMP-020`) |
| Core customer outcome | Measured vessel state feeding alerts and decisions |
| PROPOSED_DIFFERENTIATION | Modular, integrated with WATCH and NAV |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | None standalone; value only as WATCH input |
| Evidence still missing | Measurement accuracy, calibration, ingress protection, module price |
| Competitor strengths | Cheap, established, trusted sensors |
| Differentiation risks | A EUR 99 hypothesis for a wind module is far below a EUR 489.95 vane; the hypothesis is improbable as a product price |
| Buyer objections | "I can buy a Victron shunt for EUR 90" |
| Potential channel | Installer/retail as an accessory |
| Pricing sensitivity | High |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; sensor accuracy `NOT_MEASURED` |
| Dependencies | Hardware selection, calibration, conformity, source-IP |
| Validation experiment | Only inside a PROTECT/WATCH concept |
| Provisional recommendation | `DEFER` standalone; retain as a component if monitoring is validated |

## 6. WATCH — remote vessel monitoring

| Field | Assessment |
|---|---|
| Target buyer | S3 owner leaving a vessel unattended; S6 marina operator |
| Primary problem | Not knowing whether the boat is safe, powered and afloat while away |
| Existing alternatives | Siren 3 USD 299.99 plus USD 225/year; Siren 3 Pro USD 799.99; Yacht Sentinel YS Pro EUR 1,590 excl. VAT; Orca guard mode EUR 149 (`OBS-CMP-021`, `OBS-CMP-025`, `OBS-CMP-028`, `OBS-CMP-029`, `CLM-ECO-007`) |
| Core customer outcome | Timely, trustworthy alerts and a clear vessel state on a phone |
| PROPOSED_DIFFERENTIATION | Local-first monitoring integrated with vessel data, subscription priced for small boats |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | Recurring monitoring demand exists and is paid in the market (USD 100-225/year; EUR 240/year class). MAREA's from EUR 9.90/month hypothesis is low-end and not proven |
| Evidence still missing | Alert delivery pipeline, connectivity requirements, false-alarm rate, retention/privacy terms |
| Competitor strengths | Working cellular product, insurance-discount claims, established service plans |
| Differentiation risks | Connectivity cost, alert reliability expectations, privacy |
| Buyer objections | "Will it actually tell me before the boat sinks?"; subscription fatigue |
| Potential channel | Direct online plus marina/installer |
| Pricing sensitivity | Medium; recurring tolerance exists but is unmeasured |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; ingestion `NOT_VERIFIED`, no guaranteed delivery |
| Dependencies | Connectivity, alert pipeline, privacy contract, hardware |
| Validation experiment | Unattended-vessel monitoring experiment (EXP-MC10-09) plus subscription acceptance (EXP-MC10-03) |
| Provisional recommendation | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` |

## 7. DISPLAY — helm display

| Field | Assessment |
|---|---|
| Target buyer | S4 cruiser upgrading the helm |
| Primary problem | A readable navigation surface at the helm |
| Existing alternatives | Raymarine Element 7 HV EUR 659.45, 9 HV EUR 901.45, 12 HV EUR 1,506.45 incl. VAT; Orca Display 2 EUR 999; Orca system EUR 1,997 (`OBS-CMP-015`, `OBS-CMP-016`, `OBS-CMP-024`, `OBS-CMP-041`) |
| Core customer outcome | A durable, readable display that survives the marine environment |
| PROPOSED_DIFFERENTIATION | Integrated MAREA experience on dedicated hardware |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | None. Established displays are cheaper or comparable and already certified |
| Evidence still missing | Hardware selection, size, sunlight readability, ingress, conformity |
| Competitor strengths | Certified marine displays, mature ecosystems, retail presence |
| Differentiation risks | Capital-intensive hardware; no evidenced advantage over a customer tablet |
| Buyer objections | "Raymarine is proven and cheaper" |
| Potential channel | Installer only |
| Pricing sensitivity | High |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; hardware not selected, size not frozen |
| Dependencies | Hardware, CE/EMC, BOM |
| Validation experiment | None justified before a hardware decision |
| Provisional recommendation | `RECONSIDER_PRODUCT_STRATEGY` — use the customer's device or a partner display |

## 8. WEATHER — marine forecasts and routing

| Field | Assessment |
|---|---|
| Target buyer | S1/S2/S4 owners, S8 fleet operators |
| Primary problem | Dependable forecast and routing information for a passage |
| Existing alternatives | PredictWind USD 29/249/499 per year, Windy Premium EUR 19, Orca tiers (`OBS-CMP-030`, `OBS-CMP-031`, `OBS-CMP-032`, `OBS-CMP-033`, `CLM-CMP-023`) |
| Core customer outcome | Forecast and routing inside the navigation workflow |
| PROPOSED_DIFFERENTIATION | Unified with NAV and local vessel data; local/offline use |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | Only integration intent. No provider agreement, no offline right, no forecast-accuracy evidence |
| Evidence still missing | Redistribution rights, offline rights, model quality comparison |
| Competitor strengths | Global forecast brands with mature routing, low entry price |
| Differentiation risks | Re-selling the same underlying models; legal exposure without rights |
| Buyer objections | "PredictWind already does this" |
| Potential channel | Direct (only after rights) |
| Pricing sensitivity | High at entry (EUR 19), medium at professional tiers (USD 499) |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; provider rights `NOT_GRANTED` |
| Dependencies | Provider agreement, redistribution/offline rights |
| Validation experiment | Pricing/feature trade-off inside MC-10 only if rights progress |
| Provisional recommendation | `FURTHER_RESEARCH_REQUIRED` |

## 9. FLEET — multi-vessel operations

| Field | Assessment |
|---|---|
| Target buyer | S6 marina operator, S7 charter/school, S8 professional fleet |
| Primary problem | Managing several boats, maintenance and visibility across a fleet |
| Existing alternatives | Full Ahead Vessel up to 5 ships EUR 1,490/year (~EUR 24.83/vessel/month); UOC EUR 259/vessel/month and EUR 4,900 two-vessel annual; Seafarers.pro EUR 150-360/vessel/month (`OBS-CMP-034`, `OBS-CMP-035`, `OBS-CMP-036`, `OBS-CMP-037`, `CLM-CMP-026`) |
| Core customer outcome | Operational visibility and administration without spreadsheets |
| PROPOSED_DIFFERENTIATION | Small-fleet focus, lower entry price, local support |
| EVIDENCE_SUPPORTED_DIFFERENTIATION | Only the price-band gap. No operator-level evidence of the small-fleet job |
| Evidence still missing | Operator workflows, SLA expectations, onboarding effort, willingness to trial |
| Competitor strengths | Broader operational scope, established B2B sales |
| Differentiation risks | Under-scoping relative to EUR 150-259/vessel/month products; no SLA |
| Buyer objections | "We need crew, maintenance and compliance, not another dashboard" |
| Potential channel | Direct B2B, marina partnerships |
| Pricing sensitivity | Low per vessel, high on total contract and onboarding |
| Readiness | `DEFINED` / `NOT_FOR_SALE`; platform `NOT_IMPLEMENTED`, no SLA |
| Dependencies | Implementation, tenancy/security, SLA, source-IP |
| Validation experiment | B2B fleet trial-willingness experiment (EXP-MC10-08) |
| Provisional recommendation | `LONG_TERM_OPPORTUNITY` |

## 10. Bundles

### START
- Customer solution: local gateway plus a NAV subscription for a modernised small boat.
- Observed benchmark: Orca Core 2 EUR 649 plus Orca Plus EUR 49/year = EUR 698 composition (`CLM-CMP-027`).
- MAREA hypothesis: EUR 499 product-only first-year reference (`HYPOTHESIS_UNAPPROVED`).
- Assessment: the hypothesis sits *below* the observed composition and excludes installation; plausible as a discount thesis, unproven as margin. `PROPOSED_DIFFERENTIATION`: consolidation. `EVIDENCE_SUPPORTED_DIFFERENTIATION`: none yet. Decision: validate concept (`DEC-MC09-04`).

### CRUISE
- Customer solution: navigation, AIS reception, gateway and display for coastal cruising.
- Observed benchmark composition: EUR 1,319.45-1,997 (`CLM-CMP-028`, `OBS-CMP-041`).
- MAREA hypothesis: EUR 1,399 product-only (`HYPOTHESIS_UNAPPROVED`), installation excluded.
- Assessment: inside the observed composition band, but the band is a sum of mature parts; MAREA must prove an integration outcome, not a discount. Decision: further research (`DEC-MC09-12`).

### SAIL
- Customer solution: navigation, instruments, display, gateway and supervised steering.
- Observed benchmark composition: EUR 3,499.40 (`CLM-CMP-029`).
- MAREA historical figure: EUR 1,990, recorded for traceability only, not a full installed price and not a fixed turnkey offer (`DEC-MC09-13`).
- Assessment: the historical figure sits far below the observed parts floor and the bundle depends on the blocked PILOT safety gate. Decision: defer.

### PROTECT
- Customer solution: monitoring, sensors and a recurring service for unattended boats.
- Observed benchmark: EU monitoring hardware EUR 1,830 excl. VAT or USD 664.08 composition; Siren plus plan USD 299.99 plus USD 225/year (`CLM-CMP-021`, `OBS-CMP-044`, `OBS-CMP-045`).
- MAREA hypothesis: EUR 399 plus subscription (`HYPOTHESIS_UNAPPROVED`), contradicted by its own composition (WATCH EUR 299 plus two SENSE modules at EUR 99 = EUR 497 before installation).
- Assessment: strongest recurring-revenue concept, incoherent historical price. Decision: validate the problem, rebuild the price from evidence (`DEC-MC09-03`).

### COMPLETE
- Customer solution: the whole integrated electronics stack.
- Observed benchmark composition: EUR 3,799.49 (`CLM-CMP-030`).
- MAREA historical figure: EUR 3,490, recorded for traceability only; no fixed turnkey price is permitted (`DEC-MC09-14`).
- Assessment: requires every unready family at once, 22 MC-08 blockers, and no evidence that buyers want a single supplier. Decision: reconsider product strategy.

### FLEET package
- Customer solution: multi-vessel operations contract.
- Observed benchmark: EUR 1,490-4,900 per year at the platform level (`OBS-CMP-034`, `OBS-CMP-036`).
- MAREA: bespoke contract, price `NOT_ESTABLISHED`.
- Assessment: real recurring model, but not implemented, no SLA, and no operator-level evidence. Decision: long-term opportunity (`DEC-MC09-07`).

## 11. Mandatory strategic challenge

**NAV + WEATHER versus integrated hardware.** Software has direct distribution,
no BOM and no certification; it is therefore the faster validation route. The
weakness is price: the market anchors navigation at EUR 49-149/year and weather
at EUR 19-29/year. Hardware has higher ticket value but requires BOM, CE/EMC,
installation, warranty and channel support, none of which exists. **Software and
services should be validated first; hardware only after demand is proven.**

**WATCH + PROTECT versus a monitoring device.** PROTECT/WATCH has the clearest
recurring logic and real paid comparables. It still needs hardware and a
connectivity/alert pipeline, but the customer problem (an unattended boat) is
specific and expensive. This is the strongest candidate for a paid validation.

**HUB + START versus a gateway-plus-subscription.** HUB is a real category but
anchored at EUR 240-300, below the MAREA hypothesis. START adds recurring
revenue, but its differentiation depends on HUB orchestration that is unverified.
**Validate the subscription thesis, not the gateway price.**

**AIS + CRUISE versus an established helm package.** The AIS receiver is a
commodity; CRUISE competes with compositions that are already purchasable. The
only defensible difference is integration quality, which is unproven.
**Do not fund a receiver or a display; integrate instead.**

**FLEET versus its professional package.** FLEET's recurring model scales, but
the market expects operational breadth (crew, maintenance, compliance) that a
small-fleet product does not have. **FLEET is a later beachhead, not the first.**

**DISPLAY versus the customer's device.** The customer already owns a screen.
A proprietary display adds capital and certification without a demonstrated
advantage. **Rent the display surface.**

**PILOT versus supervised integrated solutions.** PILOT is safety-critical and
BLOCKED. No amount of commercial attractiveness can override the safety gate.
**Defer; do not position it as autonomous.**

## 12. Positioning hierarchy (provisional)

1. **Software/services validation first:** NAV (navigation) and WATCH/PROTECT
   (monitoring) — real problems, recurring potential, no manufacturing needed to
   start learning.
2. **Concept validation with hardware dependence:** START, HUB — do not commit
   BOM before demand and integration value are proven.
3. **Strategic but later:** FLEET, WEATHER — recurring and scalable, but blocked
   by implementation and data rights respectively.
4. **Reconsidered:** AIS, DISPLAY, COMPLETE — substitute with integration of
   established equipment.
5. **Deferred:** PILOT, SAIL, SENSE standalone — safety or commoditisation.

These are commercial-validation priorities. None of them changes the
`NOT_FOR_SALE` status of any product or bundle, and none authorises a claim,
price or launch.
