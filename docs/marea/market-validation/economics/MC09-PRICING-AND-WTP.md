# MAREA — Pricing normalisation and willingness-to-pay instrument design (MC-09 / Workstream D)

| Field | Value |
| --- | --- |
| Document ID | MC-09 / D — MC09-PRICING-AND-WTP |
| Milestone | MC-09 (market and competitive intelligence) |
| Date | 2026-10-31 |
| Owner | Pricing and Commercial Economist (agent-d-economics) |
| Status | `INTERNAL_RESEARCH_DATA_ONLY` · PRICE HYPOTHESES UNAPPROVED · WTP `NOT_MEASURED` |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` (MC-08 HEAD) |
| Branch | `feature/marea-mc09-market-competitive-intelligence` |
| Write scope | `docs/marea/market-validation/economics/` and `docs/marea/market-validation/data/{tco-models,wtp-hypotheses,evidence-economics}.json` only |
| Is not | Not a price list · not a supplier cost · not a quotation · not a margin · not a WTP measurement · not an offer · not a market forecast |

## 1. Purpose, status and the four definitions that must never be confused

This document does two things and only two:

1. it **normalises observed competitor prices and published service rates** into comparison categories that
   are meaningful for the MAREA hypothesis set, without converting any observation into a MAREA price, cost
   or willingness-to-pay value; and
2. it **designs the MC-10 willingness-to-pay instruments** that could, if executed under authorisation and
   consent, replace statements about willingness to pay with measurements.

Four definitions govern every sentence below:

| Term | Meaning here | Never means |
| --- | --- | --- |
| **Price hypothesis** | An unapproved programme statement about what a customer might one day pay (`HYPOTHESIS_UNAPPROVED`) | An approved price, an offer, a cost, a quotation, or a WTP measurement |
| **Observed price** | A price displayed on a cited page on the cited retrieval date, in its original currency and tax treatment | A price available to EMBARCARTE, a benchmark of MAREA economics, or WTP |
| **Cost** | What EMBARCARTE would pay to make, certify, ship, install, support and warrant a product | Any retail price or any sum of retail hypotheses |
| **Willingness to pay** | What a representative sample would actually pay, measured with a documented instrument | A competitor price, an expert judgement, a stated intention, a hypothesis |

The MC-09 governance invariant is explicit: `willingnessToPayEmpiricallyValidated = NO`. Every value in
`wtp-hypotheses.json` carries `status = NOT_MEASURED`. No simulated or illustrative survey is described in
this document as empirical evidence, and no competitor price is treated as a WTP observation.

## 2. Evidence base

### 2.1 Repository-inherited comparator context (checked 2026-10-30)

These observations were retrieved by earlier milestones and are reused as **context only**. They are cited
in `docs/marea/MARKET-BENCHMARKS.md` and `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md`;
they are not re-retrieved here and are not repeated as new observations.

| Category | Observed reference (as recorded in the repository) | Currency / tax basis | Repository source |
| --- | --- | --- | --- |
| 7-inch MFD | Raymarine Element 7 HV EUR 659.45 | EUR, VAT-inclusive on page | `MARKET-BENCHMARKS.md` |
| NMEA 2000 gateway | Digital Yacht iKonvert EUR 240 | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| NMEA 2000 gateway | Yacht Devices WiFi gateway EUR 249.07 (retailer) | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| AIS receiver | Digital Yacht AIS100 EUR 360 (AIS100 PRO EUR 420) | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Navigation software | Orca Plus EUR 49/yr; Smart Navigation EUR 149/yr | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Chart subscription | Garmin Navionics Boating Central & West Europe EUR 34.99/yr (regional) | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Fleet SaaS | Full Ahead Maritime from EUR 149/month up to five vessels | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Fleet SaaS | UOC Core EUR 259/vessel/month | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Fleet SaaS | Seafarers.pro EUR 150–360/vessel/month | EUR, basis not stated | `MARKET-BENCHMARKS.md` |
| Weather software | PredictWind Basic USD 29/yr, Standard USD 249/yr, Professional USD 499/yr | USD, taxes added at checkout | `PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` |

### 2.2 New observations retrieved in this workstream on 2026-10-31

Every row was read on the stated page on 2026-10-31. The full records are `SRC-ECO-001` to `SRC-ECO-006`
in `docs/marea/market-validation/data/evidence-economics.json`.

| # | Observation | Displayed value | Currency / tax treatment | Source |
| --- | --- | ---: | --- | --- |
| 1 | Marine electrical service rate (diagnostics, wiring, repairs), standard hours | 90 | EUR/hour, VAT-inclusive | `SRC-ECO-001` Elektrohertz price list |
| 2 | Systems and electronics integration / instrument networks / commissioning, standard hours | 105 | EUR/hour, VAT-inclusive | `SRC-ECO-001` |
| 3 | Out-of-hours and Saturday surcharge; Sunday/holiday surcharge | +50 %; +100 % | Percent of the VAT-inclusive rate | `SRC-ECO-001` |
| 4 | Minimum dockside attendance | 2 hours billed | Hours | `SRC-ECO-001` |
| 5 | Travel | 0.63 | EUR/km round trip | `SRC-ECO-001` |
| 6 | NMEA 2000→NMEA 0183 converter (iKonvert) | 240 | EUR, basis not stated | `SRC-ECO-002` |
| 7 | NMEA 2000 WiFi server (NavLink2) | 300 | EUR, basis not stated | `SRC-ECO-002` |
| 8 | NMEA 2000 engine-data server (ENGINELink) | 318 | EUR, basis not stated | `SRC-ECO-002` |
| 9 | Basic NMEA 2000 three-device cabling kit | 144 | EUR, basis not stated | `SRC-ECO-002` |
| 10 | NavLink2 + NMEA 2000 cabling pack | 438 | EUR, basis not stated | `SRC-ECO-002` |
| 11 | B&G Vulcan 7R 7-inch MFD | 685.57 incl. VAT / 566.58 excl. VAT | EUR, stated both ways | `SRC-ECO-003` |
| 12 | Navionics+ Western Europe chart card | 145.10 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 13 | C-MAP REVEAL EW-227 chart card | 214.67 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 14 | NMEA 2000 starter kits | 94.68 and 98.72 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 15 | B&G WS310 wind sensor | 489.95 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 16 | Simrad NAIS-500 AIS transponder | 812.62 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 17 | Icom MA510TR AIS transponder | 988.07 | EUR, VAT-inclusive | `SRC-ECO-003` |
| 18 | PredictWind annual plans | 0 / 29 / 249 / 499 | USD/year, local taxes added at checkout | `SRC-CMP-003` (Workstream B record) |
| 19 | Siren Marine monitoring service plan (LTE-M) | 225/yr or 22/month; seasonal 150 | USD | `SRC-ECO-005` |
| 20 | AIS100 scope requirement: dedicated VHF/AIS antenna or antenna splitter sold as optional accessory | no price displayed | Scope only | `SRC-ECO-006` |

Three cautions apply to this table and are not waived anywhere in this milestone:

- **No currency conversion and no net-price ranking.** EUR and USD rows stay in their own currency. Any
  conversion or net-of-tax normalisation is a separate `MODEL_DERIVED` record and is not used here.
- **Tax treatment is preserved, never inferred.** Where the page does not state the VAT basis, the record
  says `NOT_STATED_ON_SOURCE`. The Croatian rate card is VAT-inclusive; the Vulcan listing is stated both
  VAT-inclusive and ex-VAT; PredictWind adds local tax at checkout.
- **Inclusion statements are part of the observation.** A price without its included hardware, data rights
  and labour is not a comparable price. The Vulcan page is internally inconsistent about its included
  transducer and chart card (`SRC-ECO-003`), so its price is recorded at `MEDIUM` confidence and its included
  scope at `LOW` confidence.

### 2.3 Additional repository context carried from MC-08

The bundle-level challenge in `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` §6 is used as the
canonical restatement source for the six historical bundle hypotheses and their status. This document does
not re-derive or revise that arithmetic; where a number is quoted below, it is recomputed from the named
hypotheses so the arithmetic is reproducible.

### 2.4 Workstream B reconciliation (competitor observations present at 2026-10-31)

Workstream B's `data/competitor-observations.json` landed during this workstream (48 observations). The
observations in §2.2 are consistent with B's records and are cross-referenced by `obsId`; B's file remains
the canonical machine-readable observation layer and this document does not duplicate or re-price it.

| This document | Workstream B record | Note |
| --- | --- | --- |
| iKonvert EUR 240, NavLink2 EUR 300, cabling kit EUR 144 (`SRC-ECO-002`) | `OBS-CMP-004`, `OBS-CMP-005` | Same category and vendor; B records the tax basis as not stated |
| B&G Vulcan 7R EUR 685.57 incl. VAT (`SRC-ECO-003`) | nearest B row `OBS-CMP-021` (Raymarine Element 7 HV EUR 659.45 incl. VAT) | Different brand and listing; no parity claim |
| B&G WS310 EUR 489.95 (`SRC-ECO-003`) | `OBS-CMP-019` | Same wind-sensor row |
| AIS100 scope requirement (`SRC-ECO-006`) | `OBS-CMP-009` (AIS100 EUR 360) | B records the price; this document records the antenna/splitter scope |
| Siren service plan USD 225/year (`SRC-ECO-005`) | `OBS-CMP-025`, `OBS-CMP-026`, `OBS-CMP-045` | B records Siren hardware and the PROTECT-equivalent composition; the service-plan price remains this workstream's record |

B also records **composed-equivalent configurations** (`OBS-CMP-040` to `OBS-CMP-048`): for example an Orca
hardware package at EUR 1,997 VAT-inclusive in DE (`OBS-CMP-041`), a Raymarine/Digital Yacht CRUISE-equivalent
composition (`OBS-CMP-042`), and a Yacht Sentinel PROTECT-equivalent at EUR 1,590 VAT-excluded
(`OBS-CMP-044`). These are **sums of observed retail items across vendors**, not bundle prices, not
available MAREA configurations and not a normalised comparison. They are recorded as demand-side context for
`MC09-CUSTOMER-TCO.md`; no net-price ranking or parity claim is drawn from them.

## 3. Normalisation framework

### 3.1 The ten comparison categories

A comparison is only meaningful when the same category, period and scope are compared. Every observed price
is stored in exactly one category; a row that mixes categories is rejected rather than reconciled.

| Category | What must be recorded | Observed reference available | MAREA status |
| --- | --- | --- | --- |
| **Device price** | Unit, size class, included transducer/chart, warranty | 7-inch MFDs EUR 659.45–685.57; gateways EUR 240–318; AIS receiver EUR 360 (repo) | All hardware hypotheses `HYPOTHESIS_UNAPPROVED`; no BOM |
| **Accessories** | Antenna/splitter, mount, cabling kit, transducer, SIM | NMEA 2000 kits EUR 94.68–144; antenna/splitter requirement stated without price (`SRC-ECO-006`) | `ACC_*` `OPEN`/`BLOCKED`; inclusion decisions undecided |
| **Charts / data licences** | Dataset, coverage, period, redistribution rights | Chart cards EUR 145.10–214.67 (card, not subscription or licence) | `C_DATA_LIC` `BLOCKED`; `chartRightsGranted = false` |
| **Software subscriptions** | Entitlement scope, period, devices, tax | Navigation EUR 49–149/yr; weather USD 29–499/yr; chart app EUR 34.99/yr | NAV/WEATHER hypotheses unapproved; no provider rights |
| **Connectivity** | SIM/eSIM, data cap, roaming, who bills it | Siren plan USD 225/yr including connectivity, bundled not itemised | `C_CONN`, `C_ROAM` `BLOCKED` |
| **Installation** | Hours, rate, minimum charge, travel, materials, who supplies hardware | Published rate EUR 90–105/hour VAT-inclusive, 2-hour minimum, EUR 0.63/km (`SRC-ECO-001`) | `H_INST`, `R_INST` `BLOCKED`; no Spanish rate |
| **Commissioning** | Dockside validation, calibration, recorded checks, sign-off | Quoted per vessel after paid assessment; 50 % on approval, 50 % on commissioning (`SRC-ECO-001`) | `H_COMM`, `R_COMM` `BLOCKED` |
| **Maintenance** | Firmware, cleaning, re-validation, replacement parts, service visits | No published annual maintenance figure retrieved | `C_SUP_SVC`, `EOL_ALLOC` `OPEN` |
| **Warranty / support** | Term, who warrants what, owner-supplied equipment, RMA | Installation warranted, owner-supplied hardware not warranted (`SRC-ECO-001`); no term or price retrieved | `WARR_RES_*` `BLOCKED`; `warrantyPolicy` does not exist |
| **Renewal** | Renewal price, notice, indexation, cancellation | App subscriptions auto-renew annually; seasonal plans exist (`SRC-CMP-003`, `SRC-ECO-005`) | Renewal price `NOT_ESTABLISHED`; `C_BILLING` `OPEN` |

### 3.2 Comparison rules

1. **Same category, same period, same tax basis** — otherwise the row is recorded as non-comparable rather
   than adjusted silently.
2. **A price is not a cost and a sum of hypotheses is not a cost basis.** Adding MAREA retail hypotheses is
   an arithmetic anchor only.
3. **A "from" price is a floor, not a price.** `PILOT-COASTAL from EUR 1,290`, `DISPLAY-7 from EUR 699`,
   `SENSE from EUR 99` and `WATCH subscription from EUR 9.90/month` are floors with unstated scopes.
4. **Installation is never "included".** No installation price exists, so no comparison may assume it is
   bundled; the customer-side installation line is treated as an unknown in `MC09-CUSTOMER-TCO.md`.
5. **Currency and tax are preserved.** A comparison table may show EUR and USD side by side only with the
   currency and tax columns visible.

## 4. Competitor-normalised analysis of the hypothesis set

### 4.1 Family-level position (descriptive only, no parity claim)

| Family | MAREA hypothesis (unapproved) | Observed category reference | What the comparison can and cannot say |
| --- | --- | --- | --- |
| NAV | EUR 99 / 149 per year | Navigation apps EUR 49–149/yr; chart app EUR 34.99/yr | MAREA's hypothesis sits inside an existing consumer band; scope, chart rights and offline coverage differ. Nothing here validates either figure. |
| HUB | EUR 349 / 499 one-off | Single-purpose gateways EUR 240–318 | MAREA claims multi-device orchestration and would add software/support scope; the gap to a gateway is not evidenced value. |
| AIS | EUR 249 / 399 one-off | Receive-only receiver EUR 360 (repo, 2026-10-30) | The entry hypothesis is below an observed receiver price; that is a commercial risk flag, not a cost finding. |
| PILOT | from EUR 1,290 quotation | Autopilot/drive installations are quote-only in the retrieved evidence | No comparable price exists; MAREA's figure is a starting reference excluding drive, labour and commissioning. |
| SENSE | from EUR 99 per module | Wind sensor EUR 489.95; battery monitoring system EUR 444 (`SRC-ECO-002`) | Observed sensors are complete instruments at higher prices; the EUR 99 floor is not attributable to a named module. |
| WATCH | EUR 299 + from EUR 9.90/month | Monitoring service USD 225/yr (bundled connectivity) | A subscription band exists; the hardware hypothesis has no observed comparable and no BOM. |
| DISPLAY | from EUR 699 | 7-inch MFDs EUR 659.45–685.57 VAT-inclusive | Category price is close to the hypothesis; included charts and hardware differ and the MAREA size is not frozen. |
| WEATHER | EUR 49 / 89 per year | Weather subscriptions USD 29–499/yr, tax added at checkout | MAREA's hypotheses are inside an observed band; provider rights and accuracy are not established. |
| FLEET | from EUR 49 / 79 per vessel/month, VAT excluded | Fleet SaaS EUR 149/vessel/month up to 5 vessels, EUR 259/vessel/month, EUR 150–360/vessel/month (repo) | MAREA's hypothesis is below observed professional-segment bands; the intended segment is narrower and unproven. |

### 4.2 Worked arithmetic (reproducible, no net ranking)

```text
CRUISE product-only reference (unapproved hypotheses):
  99 (NAV-ESSENTIAL) + 349 (HUB-STANDARD) + 249 (AIS-RECEIVER) + 699 (DISPLAY-7) = 1,396 EUR
Adding one observed reference accessory (NMEA 2000 cabling kit, SRC-ECO-002):
  1,396 + 144 = 1,540 EUR
Difference to the historical CRUISE hypothesis:
  1,540 - 1,399 = +141 EUR before antenna/splitter, mount, installation and commissioning
Interpretation: an arithmetic observation about mixed inputs; it is NOT a discount, margin or cost conclusion.
```

```text
PROTECT composition at named hypotheses (two-module floor):
  299 (WATCH-CORE hardware) + 2 x 99 (non-attributable entry floor) = 497 EUR
Historical hardware hypothesis: 399 EUR
Difference: 497 - 399 = +98 EUR before any module price, installation, connectivity or cost
Interpretation: MC-08 records HISTORIC_PRICE_NOT_COST_JUSTIFIED; the two 99s are placeholders, not prices.
```

```text
Observed service-cost arithmetic (rate reference, not a quote):
  4 hours x 105 EUR/hour = 420 EUR      8 hours x 105 EUR/hour = 840 EUR
  2-hour minimum x 105 EUR/hour = 210 EUR
  Out-of-hours at +50 %: 105 x 1.5 = 157.50 EUR/hour
Interpretation: this shows how a published rate card scales; it is NOT a MAREA installation price or cost,
and the rate is Croatian, VAT-inclusive, and not a Spanish installer rate.
```

### 4.3 What the price evidence does not establish

- No observed price is available to EMBARCARTE: none of the cited companies is a supplier, distributor or
  partner, and none has quoted MAREA.
- No observed price establishes a MAREA cost, margin, contribution, break-even volume or viable price.
- No observed price is a WTP measurement. A published price is the seller's ask, not a buyer's stated or
  revealed willingness to pay.
- No market size, growth rate, share or revenue forecast is inferred from any price.
- Composed competitor configurations (`OBS-CMP-040` to `OBS-CMP-048`) show that buyers can assemble
  comparable functions from several vendors; the summed retail amounts are not bundle prices and are not
  normalised for scope, tax, territory or installation.

## 5. MC-10 willingness-to-pay instrument designs

No instrument in this section has been fielded. MC-09 authorises no customer outreach
(`customerOutreach = NOT_AUTHORIZED`), so every design below is a *protocol* for MC-10, not a result. All six
instruments are stated-preference or recall instruments: none observes a real purchase.

### 5.0 Common protocol rules

- **Disclosure before any price question**: MAREA is a proposed brand, no product is certified or for sale,
  and tested figures are exploratory hypotheses for research, not offers.
- **No anchoring on the hypotheses.** Instrument price points are derived from the observed evidence in §2,
  never read out as "the MAREA price"; the historical figures are not shown as a benchmark.
- **Separate constructs**: hardware, installation, annual subscription, connectivity and data licences are
  asked separately before any combined configuration is tested.
- **Currency and VAT recorded per response**; no conversion inside the raw record.
- **Consent, anonymisation, withdrawal, and no personal financial data** beyond an expressed price opinion.
- **Every output is `NOT_MEASURED` until the data are collected and analysed**; a collected stated preference
  produces a *stated-preference estimate*, never an approved price.

### 5.1 `WTP-INS-01` — Gabor-Granger price ladder

**Question it answers:** at which tested price points does stated purchase intent fall, for one defined
configuration and one defined segment?

**Design.** Five to seven price points per configuration, spanning roughly 0.6× to 1.5× the reference
hypothesis, with the exact points derived from observed category prices in §2 and fixed before fieldwork. A
fixed buy-response scale (definitely would buy / probably / might / probably not / definitely not) is read at
every point from every participant. The configuration is described with its exclusions (installation, chart
rights, connectivity) in the same words to every participant.

**Sample.** MC-10 exploratory stage: at least 8 participants per segment per configuration, sufficient to
produce an indicative demand curve. Any quantitative stage needs about 100 completed responses per segment
per configuration before reporting intervals; below that, report only the raw counts.

**Analysis.** Acceptance curve per price point, 50 %-intent price interval, and comparison between segments.
The revenue-maximising point is descriptive only: it is computed from stated intent, not from sales.

**Limitations.** Hypothetical bias (stated intent exceeds purchase), anchoring on the first price shown,
strategic answering, and a configuration that does not physically exist. A non-monotone ladder invalidates
the run rather than being smoothed. The instrument cannot approve a price.

### 5.2 `WTP-INS-02` — Van Westendorp price-sensitivity meter

**Question it answers:** what is the acceptable price range for one clearly defined construct, and where do
"too cheap", "bargain", "expensive" and "too expensive" points cluster?

**Design.** Four open questions per construct (too cheap / bargain / expensive / too expensive), asked
separately for: (a) monitoring hardware, (b) monitoring subscription per month, (c) navigation subscription
per year, (d) professional installation as a stated number of hours and rate. Each answer records currency,
VAT treatment, period and reasoning in the participant's own words.

**Sample.** About 100 completed responses per construct for an aggregate acceptable range; segment-level
ranges need materially more and are out of scope for MC-10 unless the sample is expanded.

**Analysis.** Point-price distributions, acceptable-range band per construct, and a flag for any band that
falls below a defensible cost floor (a negative-margin warning, not a price decision).

**Limitations.** Responses mix hardware and installation in one mental price; "don't know" behaviour varies
by segment; the method is stated preference and cannot measure demand. It narrows the design space for a
later quantitative study; it does not establish a price.

### 5.3 `WTP-INS-03` — structured alternative comparison (choice-based)

**Question it answers:** how do buyers trade off price against scope when several realistic alternatives are
shown together?

**Design.** A choice-based exercise with 8–12 randomised tasks per participant. Each task shows 2–3
alternatives described on the same attributes and levels:

| Attribute | Levels (examples only; fixed in the MC-10 design) |
| --- | --- |
| Hardware scope | gateway only / gateway + display / receiver-only AIS / monitoring device |
| Installation | excluded (customer arranges) / quoted separately / included at a stated price |
| Chart & data | no charts / chart card included / annual subscription included |
| Subscription | none / monthly / annual |
| Warranty | statutory only / stated term |
| One-off price | four tested levels, currency and VAT treatment shown |

**Sample.** At least 300 completed tasks in total (for example 30 participants × 10 tasks) for aggregate
attribute weights; no segment-level estimates from this sample.

**Analysis.** Aggregate attribute importance and price sensitivity; simulated shares are *stated-preference
shares* and must never be reported as forecast market share.

**Limitations.** Attribute levels are necessarily hypothetical and may be implausible; scope differences
must be exactly the same in every language and channel; the result is relative preference, not WTP for a
non-existent product.

### 5.4 `WTP-INS-04` — feature and subscription trade-off

**Question it answers:** which included features change stated value, and which subscription structure is
acceptable (monthly vs annual, local function vs cloud function, retention window, number of devices)?

**Design.** Menu-based or feature-bundle exercise: participants build a configuration from priced feature
options, then answer whether they would subscribe. Options include alert channels, history retention,
number of vessels/seats, who pays for connectivity, and whether local functions survive a lapse.

**Sample.** At least 30 participants per segment for exploratory ranking; about 100 for a quantitative
feature-importance estimate.

**Analysis.** Feature inclusion frequency, stated-price sensitivity, and the acceptance rate of each billing
cadence. Results are design inputs, not price evidence.

**Limitations.** Participants systematically over-value included features they will not use; a feature that
is prohibited (remote helm control, guaranteed alerts) must never be shown as an option.

### 5.5 `WTP-INS-05` — current-spend discovery

**Question it answers:** what do buyers already pay today for comparable functions (charts, weather apps,
marina checks, security hardware, service visits), with documentary evidence where possible?

**Design.** Structured recall plus a request for a receipt, app-store subscription record or invoice band.
Asked before any price opinion so current spend does not become an anchor. Records: product, amount,
currency, period, whether installation was included, and satisfaction.

**Sample.** Every interview participant; at least 30 documented spends for any distributional statement.

**Analysis.** Descriptive spend bands by segment, not a WTP estimate. Current spend is a *substitution
indicator*, not evidence that the same amount is available for MAREA.

**Limitations.** Recall bias, forgotten subscriptions, seasonal spend, and the fact that a current spend may
buy a different scope. This instrument produces the strongest MC-10 evidence about the existing alternative,
but it still does not measure WTP for MAREA.

### 5.6 `WTP-INS-06` — conditional purchase intent

**Question it answers:** under which conditions would a buyer proceed, and what would have to be true for a
stated interest to become a real order?

**Design.** A five-point intent scale plus an open condition: "what would have to be true for you to buy
this?" Conditions are coded (written warranty, DPA, installed reference, certification, service network,
price, availability of a working demo). Intent is recorded as categorical, never as a probability.

**Sample.** All interviewed participants; conditions coded by two independent coders; at least one verbatim
per condition per segment.

**Analysis.** Frequency of conditions and the share of participants whose intent is conditional on a
specific unresolved programme item (warranty, DPA, certification, channel).

**Limitations.** Stated intent is not demand; intent measured on a product that cannot be bought has a
well-documented optimistic bias. No pre-order, deposit or card data may be collected. A positive result
licenses a later trial design, not a price.

### 5.7 Instrument mapping and MC-10 dependency

| Instrument | Existing MC-10 module (Lead-owned `validation-experiments.json`) | Status |
| --- | --- | --- |
| `WTP-INS-01` Gabor-Granger | `EXP-MC10-04` | Registered protocol; not executed |
| `WTP-INS-02` Van Westendorp | `EXP-MC10-05` | Registered protocol; not executed |
| `WTP-INS-03` Structured alternative comparison | Candidate module, not yet registered | To be registered by the MC-10 owner before use |
| `WTP-INS-04` Feature/subscription trade-offs | Candidate module (partly overlaps `EXP-MC10-03`, `EXP-MC10-09`) | To be registered before use |
| `WTP-INS-05` Current-spend discovery | Candidate module (overlaps `EXP-MC10-01` data capture) | To be registered before use |
| `WTP-INS-06` Conditional purchase intent | Candidate module (overlaps `EXP-MC10-07` trial criterion) | To be registered before use |

## 6. Sample requirements and decision rules

| Stage | Purpose | Minimum sample | Output allowed |
| --- | --- | --- | --- |
| Exploratory (MC-10) | Detecting strong signals and designing a quantitative study | 8 per segment per configuration for ladders; 30 participants for trade-offs | Indicative curves, coded conditions, instrument feedback |
| Quantitative (later) | Reporting stable intervals | About 100 completed responses per segment per construct; 300+ choice tasks | Stated-preference estimates with declared intervals |
| Never in MC-09 | — | 0 | No WTP value, no stated intent, no survey result |

Decision rule for every instrument: a result may **narrow the design space** for a later quantitative
study. It may **not** approve a price, establish a margin, approve a bundle, convert a hypothesis into an
offer, or change `willingnessToPayEmpiricallyValidated` from `NO`. Any range whose upper bound sits below a
defensible cost floor is flagged for a negative-margin review; the floor itself is not established.

## 7. Methodological limitations and integrity rules

1. **Competitor prices are not WTP.** A published ask is a supply-side statement; WTP is a demand-side
   measurement. No mapping between them is computed in this milestone.
2. **Hypotheses are not anchors.** The historical figures (EUR 499, 1,399, 1,990, 399, 3,490, bespoke) are
   unapproved hypotheses. They are not read out as MAREA prices and are not treated as prior WTP.
3. **Stated preference is not observed purchase.** Every instrument above is hypothetical; intent-behaviour
   gaps are expected and are not corrected by a coefficient invented for this programme.
4. **Scope confusion is the main validity threat.** AIS receivers versus transponders, chart cards versus
   licences, installation included versus excluded, and hardware versus subscription are repeatedly confused
   in observed listings (for example the internally inconsistent Vulcan page, `SRC-ECO-003`). Instruments
   must control these distinctions explicitly.
5. **No simulated or illustrative survey may be presented as empirical.** This document contains no
   participant data, no response counts and no computed WTP values.
6. **No approval path.** MC-09 cannot approve a price; the statuses in `governance-status.json` are the
   invariant and remain unchanged by any finding here.

## 8. Dependencies and next steps

- **Workstream B (competitors)** produced `docs/marea/market-validation/data/competitor-observations.json`
  (48 observations, present at completion of this workstream) and `data/evidence-competitors.json`. Its
  narrative documents under `competitors/` and `data/price-observations.json` were still absent when this
  workstream closed; the Lead must reconcile the `SRC-ECO-###` rows in this document with B's `obsId`
  records (see §2.4) and must not count the same URL twice in the source register.
- **MC-10 owner** must register the candidate instruments (`WTP-INS-03` to `WTP-INS-06`) before fieldwork
  and must not describe any of them as executed in MC-09.
- **Provider-rights and chart-rights evidence** (`chartRightsGranted = false`) must be resolved before any
  price comparison of data-inclusive entitlements is meaningful.

## 9. Sources

External (retrieved 2026-10-31; full records in `data/evidence-economics.json`):

- [SRC-ECO-001] Elektrohertz, *Price list*, https://elektrohertz.eu/en/pricing/
- [SRC-ECO-002] Digital Yacht (ES), *Interfaz*, https://digitalyacht.es/categoria-producto/interfaz/?min_price=120&orderby=popularity
- [SRC-ECO-003] Comptoir Nautique, *B&G Vulcan 7R listing*, https://es.comptoirnautique.com/sonda-gps-bg/7446-bg-vulcan-7r-9420024167373.html
- [SRC-ECO-005] Siren Marine, *Does a unit require a service plan?*, https://sirenhelp.zendesk.com/hc/en-us/articles/115002782173-Q-Does-a-Siren-Marine-Unit-require-a-Service-Plan
- [SRC-ECO-006] Digital Yacht (ES), *AIS100*, https://digitalyacht.es/producto/ais100/
- [SRC-CMP-003] PredictWind, *Pricing and subscriptions*, https://www.predictwind.com/pricing — retrieved in this milestone by Workstream B and recorded in `data/evidence-competitors.json`; cited here as context, not as an economics observation.

Repository context: `docs/marea/MARKET-BENCHMARKS.md`; `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md`;
`docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`; `docs/marea/bundles/bundle-definitions.json`;
`docs/marea/market-validation/data/governance-status.json`; `docs/marea/market-validation/data/validation-experiments.json`.
