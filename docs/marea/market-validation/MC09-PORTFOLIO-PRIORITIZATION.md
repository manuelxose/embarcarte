# MC-09 — Product and bundle prioritization

Status: `INTERNAL_DESK_RESEARCH`. This ranking decides **where EMBARCARTE should
spend its next development, validation and commercial resources**. It does not
change any canonical lifecycle state, does not approve a price and does not make
any product orderable.

The machine-readable authority is `data/product-assessments.json`,
`data/bundle-assessments.json` and `data/decision-links.json`; this document
explains and qualifies them.

## 1. Framework (frozen before scoring)

Twelve dimensions, weighted once and applied identically to the nine canonical
families and six canonical bundles. Weights were frozen on **2026-10-31** before
any score was produced and were not changed after seeing results.

| Dimension | Weight | Why it is weighted |
|---|---:|---|
| problemSeverity | 0.12 | Solves a real, frequent or expensive problem |
| demandEvidence | 0.12 | Observable demand, not internal enthusiasm |
| differentiationPotential | 0.10 | Ability to be distinguished from a benchmark |
| revenueAndContribution | 0.10 | Ticket size and contribution potential |
| recurringRevenuePotential | 0.09 | Durability of the business model |
| distributionFeasibility | 0.09 | Can EMBARCARTE actually reach the buyer |
| installationSimplicity | 0.07 | Installation risk and cost transfer |
| developmentAndIntegrationReadiness | 0.08 | Distance from a verifiable product |
| ipLicensingExposure | 0.06 | Higher is lower exposure (rights, licences) |
| conformityAndSafetyExposure | 0.06 | Higher is lower exposure (CE/EMC/safety) |
| supportAndWarrantyBurden | 0.06 | Higher is a lower expected burden |
| timeToValidatedReadiness | 0.05 | Speed to real learning |

Scores are 1-5 (5 most favourable), multiplied by the frozen weights and summed
(`commercialScore`). The arithmetic is validated by `npm run test:market`; any
score that does not recompute from the frozen weights fails the gate.

**Two independent conclusions are maintained.** *Commercial attractiveness* asks
whether the problem, market, price and channel look promising. *Release
readiness* asks whether the product may legally and technically be sold. A
commercial score can never override a legal, safety, licensing or conformity
blocker: every family and bundle below is `NOT_FOR_SALE` regardless of rank.

## 2. Ranked product families (commercial attractiveness)

| Rank | Family | Score | Attractiveness | Decision | Release readiness |
|---:|---|---:|---|---|---|
| 1 | NAV | 4.23 | HIGH | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` | BLOCKED — chart/data rights, source IP |
| 2 | WEATHER | 3.77 | MEDIUM | `FURTHER_RESEARCH_REQUIRED` | BLOCKED — provider rights |
| 3 | WATCH | 3.38 | HIGH | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` | BLOCKED — hardware, ingestion |
| 4 | HUB | 3.37 | MEDIUM | `FURTHER_RESEARCH_REQUIRED` | BLOCKED — hardware, NMEA conformance |
| 5 | FLEET | 3.22 | MEDIUM | `LONG_TERM_OPPORTUNITY` | BLOCKED — not implemented, no SLA |
| 6 | AIS | 2.90 | LOW | `RECONSIDER_PRODUCT_STRATEGY` | BLOCKED — GPL decoder, hardware |
| 7 | SENSE | 2.84 | LOW | `DEFER` | BLOCKED — hardware, accuracy |
| 8 | PILOT | 2.64 | LOW | `DEFER` | BLOCKED — PILOT safety gate |
| 9 | DISPLAY | 2.47 | LOW | `RECONSIDER_PRODUCT_STRATEGY` | BLOCKED — hardware, capital |

Reading the ranking correctly:

- NAV ranks first because it attacks the best-evidenced problem with direct
  distribution and no manufacturing dependency. It is **not** closer to sale:
  chart and data rights are not granted.
- WEATHER scores high on demand and recurring potential but its score is capped
  by IP exposure: without provider rights it cannot be sold, so the decision is
  further research, not validation spend.
- WATCH is third on score but is the strongest *recurring-revenue* candidate; it
  is ranked below NAV only because it needs hardware and an unverified alert
  pipeline.
- FLEET has the highest recurring potential of all families but weak evidence for
  the small-fleet job and no implemented platform; it is a later expansion path.
- The bottom four are ranked low for structural reasons, not for lack of
  engineering effort: commodity categories (AIS, SENSE), safety-criticality
  (PILOT) and capital intensity (DISPLAY).

## 3. Ranked bundles (commercial attractiveness)

| Rank | Bundle | Score | Attractiveness | Decision | Release readiness |
|---:|---|---:|---|---|---|
| 1 | PROTECT | 3.37 | HIGH | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` | INTERNAL_ONLY_DEFINED — cost not justified |
| 2 | START | 3.27 | MEDIUM | `PRIORITIZE_FOR_CUSTOMER_VALIDATION` | INTERNAL_ONLY_DEFINED |
| 3 | FLEET package | 3.22 | MEDIUM | `LONG_TERM_OPPORTUNITY` | INTERNAL_ONLY_DEFINED — no SLA |
| 4 | CRUISE | 2.99 | MEDIUM | `FURTHER_RESEARCH_REQUIRED` | INTERNAL_ONLY_DEFINED |
| 5 | SAIL | 2.65 | LOW | `DEFER` | BLOCKED — PILOT safety gate |
| 6 | COMPLETE | 2.31 | LOW | `RECONSIDER_PRODUCT_STRATEGY` | BLOCKED — 22 MC-08 blockers |

- PROTECT leads because the unattended-vessel problem is specific, expensive and
  already monetised by competitors through service plans.
- START is second because it is the simplest complete solution; it still needs a
  hardware BOM and an installed price.
- FLEET package is third commercially but is not a near-term action: it requires
  an implemented platform and an SLA.
- COMPLETE is last: it is the integration thesis with the maximum dependency
  count and the minimum evidence.

## 4. Geographic opportunity

| Rank | Region | Weighted score | Recommendation |
|---:|---|---:|---|
| 1 | Rías Baixas (Pontevedra) | 80.0 | Primary MC-10 recruitment area |
| 2 | Baleares | 71.0 | Deferred — distance, channel, research feasibility |
| 3 | Cataluña | 66.0 | Deferred — distance and channel |
| 4 | A Coruña / Northern Portugal | — | Phase 2 |

Reasoning (evidence: `market/MC09-GEOGRAPHIC-PRIORITIZATION.md`):
Rías Baixas combines more than 4,600 berths across about twenty clubs with the
only strongly positive provincial registration momentum (Pontevedra +41.4% in
2025 while A Coruña fell 9.5%). Galicia as a whole has 73 ports and 10,500
berths. Northern Portugal has the largest registered population but the weakest
verifiable evidence, so it is a phase-2 market, not a first one. Baleares and
Cataluña are larger markets but distance and channel constraints make them
poorer research territory at this stage.

Honest sizing context: the Rías Baixas annual addressable pool is estimated at
**EUR 0.12-0.62 million per year** across scenario bands, with a
capacity-bounded SOM of **24-144 installations** (`market/MC09-MARKET-SIZING.md`).
That is too small to fund the programme alone; it is large enough to validate a
narrow offer. This is a reason to validate cheaply, not a reason for optimism.

## 5. Software-first versus hardware-first

| Criterion | Software/services (NAV, WEATHER, WATCH subscription) | Hardware-first (HUB, AIS, SENSE, DISPLAY) |
|---|---|---|
| Capital intensity | Low | High — BOM, tooling, inventory |
| Time to first learning | Weeks | Quarters |
| Distribution | Direct online | Installer/dealer required |
| Conformity exposure | Minimal | CE/EMC/RED, safety case |
| Margin certainty | Unknown but unbounded by BOM | Unknown and BOM-bounded |
| Competitive barrier | Low — easy to copy | Medium — certification and support |
| Rights dependency | Charts/weather providers | Protocols, components, GPL decoder |
| Evidence in MC-09 | Paid substitutes exist (Orca, PredictWind) | Established incumbents at every price point |

**Conclusion: validate the software/services thesis first.** The market already
pays for navigation and monitoring software, the distribution is direct, and the
failure cost of being wrong is a validated learning cycle rather than unsold
inventory. Hardware should be funded only after demand and integration value are
proven — with HUB as the candidate component, not as the first product.

## 6. B2C versus B2B

| Criterion | B2C (S1-S4) | B2B (S5-S8) |
|---|---|---|
| Evidence strength | Medium — public signals, paid consumer apps | Low — vendor pages and association aggregates; almost no operator-level evidence |
| Deal size | Low per unit | Higher contract value |
| Recurring model | Subscription accepted in category, unproven for MAREA | Per-vessel SaaS is the market norm (EUR 150-259/vessel/month) |
| Sales cost | Direct, low | Relationship-led, higher; no channel terms public |
| Trust barrier | Brand and warranty | SLA, tenancy, liability, references |
| Readiness | Software could be validated now | Platform not implemented; no SLA |

**Conclusion: start B2C for learning, keep B2B as the scale path.** B2B is where
the durable revenue is, but it cannot be entered credibly without an implemented
platform, an SLA and referenceable operators.

## 7. Proposed first customer-discovery cohorts (MC-10)

Ordered by information value per euro of effort, not by market size:

1. **S3 owners leaving vessels unattended** — test monitoring urgency and
   recurring acceptance (WATCH/PROTECT).
2. **S1 coastal owners modernising a mixed-brand boat** — test fragmentation and
   navigation willingness to pay (NAV/START).
3. **S5 marine-electronics installers** — test compatibility, liability and
   channel terms; they control refit adoption.
4. **S6 marina/maintenance operators** — test multi-vessel visibility and
   willingness to trial.
5. **S2 sailing owners** — navigation, instruments, supervised steering
   (concept comprehension only for PILOT).
6. **S4 cruisers upgrading the helm** — installation dependence and complete
   system price tolerance.
7. **S7 charter/schools and S8 fleet operators** — only after a platform story
   and SLA exist; otherwise low-yield.

Qualitative targets of 5-10 interviews per narrowly defined cohort are useful for
learning and are **not** statistically representative (`CLM-MC10-006`).

## 8. Most important unresolved business assumptions

1. Owners will pay a recurring fee for software/monitoring rather than
   preferring a one-off device (all WTP is `NOT_MEASURED`).
2. Installers will accept a new brand's integration, liability and support
   burden without a proven compatibility record.
3. A small beachhead (Galicia/Northern Portugal) can sustain a commercial
   organisation while FLEET scales.
4. MAREA can obtain chart, weather and data rights at a cost that fits the
   EUR 49-149/year price band.
5. Hardware can be manufactured and supported at a cost compatible with the
   observed EUR 240-360 gateway/receiver price anchors.
6. The integrated outcome is worth more to a customer than the sum of
   established parts.

Each is either false or unmeasured today; none is safe to build a plan on.

## 9. Why a product may be commercially unattractive (even if technically good)

- **Commodity price anchor** — the market already sells an equivalent for less
  (AIS receiver EUR 360; battery monitor EUR 90.21; gateway EUR 240).
- **No rights** — a capability that requires chart, weather or data rights that
  are not granted cannot be sold (WEATHER, NAV).
- **Safety criticality** — PILOT's liability, certification and sea-trial burden
  exceeds the commercial value of a beachhead.
- **Capital intensity without evidence** — a proprietary display needs tooling,
  certification and support before any demand is proven.
- **Dependency on the weakest link** — COMPLETE and SAIL require several unready
  families simultaneously.
- **Integration value unproven** — a bundle only beats the sum of parts if it
  genuinely reduces installation and operating friction; no test demonstrates
  that yet.

## 10. Evidence thresholds that would change these recommendations

| Current recommendation | Reversal condition |
|---|---|
| NAV prioritized | MC-10 shows ≥7 of 10 owners already consolidate navigation at acceptable cost, or refuse any recurring navigation fee |
| WATCH/PROTECT prioritized | Current monitoring spend is consistently below EUR 5/month with acceptable reliability, or ≥7 of 10 reject a recurring fee |
| AIS/ DISPLAY reconsidered | A certified hardware partner and a demonstrated price/quality gap appear |
| COMPLETE reconsidered | Evidence that buyers want single-supplier procurement and a verified complete-system integration |
| FLEET long-term | A signed multi-vessel pipeline and a working platform with SLA |
| Software-first | A sourced BOM and a written installer channel make hardware-first cheaper to validate |
| No price approval | MC-10 WTP results plus real supplier quotes and a Spanish installation rate |

Any reversal requires new evidence recorded in the research contract and
re-verified by an independent reviewer. A preference or a hunch is not evidence.

## 11. Decision output summary

1. **Ranked product-family assessment:** section 2.
2. **Ranked bundle assessment:** section 3.
3. **Geographic opportunity assessment:** section 4.
4. **Software-first versus hardware-first comparison:** section 5.
5. **B2C versus B2B strategic comparison:** section 6.
6. **Proposed first customer-discovery cohorts:** section 7.
7. **Most important unresolved business assumptions:** section 8.
8. **Reasons a product may be commercially unattractive:** section 9.
9. **Evidence thresholds required to change the recommendations:** section 10.

Nothing in this document authorises a sale, a price, a claim or a publication.
