# MC-09 Workstream E — Distribution strategy, installer/dealer economics and routes to market

| Field | Value |
| --- | --- |
| Document ID | MC-09 / Workstream E — MC09-DISTRIBUTION-STRATEGY |
| Milestone | MC-09 — market and competitive intelligence |
| Date | 2026-10-31 |
| Owner | agent-e-channels (Channel and Digital Demand Analyst) |
| Status | INTERNAL RESEARCH ONLY · NOT A COMMERCIAL OFFER · NOT A PARTNER LIST |
| Branch / base | `feature/marea-mc09-market-competitive-intelligence`, base `65417bfa681d31cc655e2bc91cfcedcccc368675` |
| Write scope | this file; `docs/marea/market-validation/data/{channel-assessments,search-signals,evidence-channels}.json` |
| Evidence layer | `evidence-channels.json` (SRC-CHN-001…038, CLM-CHN-001…036), `channel-assessments.json` (CHN-A…F) |

**Two statements govern this document.** (1) **No distribution partner, dealer, distributor, marina, charter
operator or retailer has been contacted, and no relationship of any kind exists.** Every route below is a
hypothesis to be tested, not a plan with named partners. (2) **No margin, commission, dealer discount, rebate or
trade price is asserted anywhere in this document.** Where those figures are not public — and for Spain and
Portugal they are not — the entry is `UNKNOWN` with the exact question MC-10 must ask.

## 0. Why this workstream exists

MC-05 modelled direct-to-consumer and installer-led motions symbolically and left `CHAN` (channel discount) and
`X-06` (customer evidence) `BLOCKED`. MC-08 defined five sales-fulfilment routes and stated that no installer
network, rate card or agreement exists. This document does not remove those blockers. It narrows them: it records
what is genuinely observable in public in Spain, Portugal and the wider EU about installation labour, distribution
layers, retail structure and vendor dealer programmes, and it marks precisely where the record stops.

## 1. Method, access and what cannot be concluded

- Research used `web_search` and `web_fetch` on **2026-10-31**. Plain HTML pages were fetchable. **Google Trends
  returned no series** (explore URL HTTP 404; root page a JavaScript shell) and the **Google autocomplete endpoint
  returned HTTP 404** — both recorded `INACCESSIBLE` (`SRC-CHN-036`, `SRC-CHN-037`). Query-language evidence
  therefore comes from the accessible Bing Autosuggest API (`SRC-CHN-038`).
- Most of the strongest evidence is in PDFs. Those PDFs were **observed through search-result extracts**, not
  re-opened in full. Every claim is therefore bounded by the extract that was visible; scope notes, VAT wording
  and exclusions inside the documents were not verified line by line.
- What this cannot establish: any MAREA cost, any installation duration, any partner's willingness, any trade
  price, and any demand volume. All four are `OPEN`/`UNKNOWN`. No page content was treated as instruction.

## 2. What the public record actually shows

### 2.1 Installation labour is publicly priced — by marinas, not by independent installers

| Source | What is published | Figure (as displayed) | Caveat |
| --- | --- | --- | --- |
| Marina Coruña 2026 tariff (`SRC-CHN-001`) | Labour by task, VAT excluded | Workshop 59 €/h; express workshop 76 €/h; fairing 47 €/h; express fairing 65 €/h; **electronics 61 €/h** | Single Galician marina; task definitions and minimum billing not visible |
| Marina Coruña 2026, EN and FR editions (`SRC-CHN-002`, `-003`) | Same table in three languages | 59/76/47/65 €/h | Corroborates the table; electronics line not visible in the EN extract |
| Getxo yard tariff (`SRC-CHN-004`) | Labour line, first-hour charge | 32.02 €/h; first hour 27 | Year, VAT position and table header not visible |
| Marina Palamós 2025 (`SRC-CHN-005`) | Yard-occupancy surcharge for repair work | 2.50 € (+VAT) per metre of length; charging period not visible | Labour table not visible in the extract |
| Molla-Hondarribia 2026 (`SRC-CHN-006`) | Per-hour general labour line exists | Value truncated → `UNKNOWN` | Not inferred from other marinas |
| Ports de la Generalitat (`SRC-CHN-007`) | Infrastructure charges | Crane 60.400 €/h; ramp 7.090 €/m/day | Infrastructure, not electronics work |
| M.P. Marine Electrical, US (`SRC-CHN-008`) | Customer labour terms | 180 USD/h standard; 120 USD/h apprentice; 120 USD/h travel; **2-hour minimum** | US market, USD, different liability regime |

Claims `CLM-CHN-001`…`-003` record the Spanish figures; `CLM-CHN-004` records the US structure. Three conclusions
are defensible and nothing more:

1. **Spanish marinas publish labour by task at 32.02–76 €/h, with a published electronics-specific rate of 61 €/h.** The
   spread across regions is larger than a factor of two, so a single national "installation price" would be false.
2. **Billing structure matters as much as the rate.** The US example shows travel time and a minimum call-out; the
   Spanish tariffs show task-specific lines and separate infrastructure charges. A quote built as `hours × rate`
   alone would misprice the job.
3. **No public source states what an independent marine-electronics installer bills in Spain or Portugal.** The
   published rates are a marina's own workshop. Independent-installer billing is `UNKNOWN`.

### 2.2 The cost side of installer economics is observable at order-of-magnitude level

Marine installation staff are salaried, not billed, and aggregated estimates put that pay at **9.49 €/h**
(Portugal, marine repair technician, 2024), **13.35 €/h** (Cartagena, marine radio installer) and **14 €/h** (Elche)
— `CLM-CHN-005`. Non-marine Spanish benchmarks put a fully loaded operator hour at **16.70–17.90 €** and port-tender
electrician unit prices at **18.11 €/h** (Oficial 1ª) and **15.69 €/h** (helper) — `CLM-CHN-006`.

Read together: a customer-facing yard rate of 59–76 €/h sits well above a 10–18 €/h labour-cost benchmark. That gap
is **not** a margin figure. It must fund premises, tools, travel, insurance, administration, warranty labour, idle
time and profit — none of which was observed. Deriving a margin from the gap would be exactly the fabrication this
programme forbids. **What MC-10 must ask:** measured hours for a gateway, an AIS receiver and a display install on
two representative vessels; the installers' hourly billing and call-out policy; what they charge for first-line
support and warranty re-visits.

### 2.3 A distribution layer exists, and it is B2B-only

- An Iberian wholesale distributor of marine electronics and communications is described in trade press: **Navegar y
  Pescar CMC S.L.**, wholesale distributor for Spain and Portugal (`SRC-CHN-014`, `CLM-CHN-007`).
- Pan-European groups run national distribution companies that operate **exclusively B2B to shipchandlers**, with
  subsidiaries named in France, Germany, Italy, Spain and Sweden; Alliance Marine acquired the UK distributor
  Marathon Leisure (`SRC-CHN-015`, `CLM-CHN-008`).
- Spanish specialist e-commerce at catalogue scale: **GPS Náutico** resells Garmin, Lowrance, Simrad, Raymarine and
  Humminbird; **MercaNautic** self-describes more than 30,000 second-hand/outlet nautical products
  (`SRC-CHN-016`, `-017`, `CLM-CHN-009`).
- Third-party modelled estimates put **svb.de** at ~USD 13.3M and **compass24.de** at ~USD 4.9M annual online sales
  in 2025, the latter reported down 20–50% (`SRC-CHN-018`, `-019`, `CLM-CHN-010`). These are estimates, not accounts.

**Nothing public states what a distributor or dealer earns in this market.** `CLM-CHN-036` records exactly that: no
published margin, discount or commission percentage for Spain or Portugal was reached in this session. The only
numeric indication anywhere is an **unverified US forum anecdote** that direct-buying dealers pay about 50% of list
(`SRC-CHN-026`, `CLM-CHN-017`) — explicitly recorded as an anecdote and **not usable** as a channel-discount input.

### 2.4 Vendor dealer programmes are published as processes, not as terms

- **Garmin** runs a *Marine Installation Rebate Program* under which certified service and installation dealers can
  receive rebates for installing Garmin/Fusion products (`SRC-CHN-020`, `CLM-CHN-011`) and expects the installing
  dealer to carry out on-board warranty service (`SRC-CHN-021`, `CLM-CHN-012`).
- **Raymarine** operates a dealer-application route for dealer media access and publishes asset-usage terms, not
  commercial terms (`SRC-CHN-022`, `CLM-CHN-013`).
- **Victron Energy** publishes distributor terms covering credit approval, retention of title until payment and
  dealer training — and **no** margin percentage (`SRC-CHN-023`, `CLM-CHN-014`).
- **Orizon**, a marina-management SaaS vendor, publishes a dealer programme with "competitive dealer margins,
  discounts and performance-based incentives" plus lead sharing — still no number (`SRC-CHN-024`, `CLM-CHN-015`).
- US trade coverage describes manufacturer-set MRP and weekly-updated authorised-dealer lists used to identify
  discounters (`SRC-CHN-025`, `CLM-CHN-016`). That is US market structure from 2017 and **must not** be imported as
  EU pricing policy without competition-law review.

The pattern is consistent: vendors publish the *existence and shape* of dealer programmes freely and the *numbers*
only privately. MAREA's own terms therefore cannot be benchmarked publicly; they must be negotiated or stated as
`UNKNOWN`.

### 2.5 Installed-base context (registrations and infrastructure, not demand)

Spain: **4,992** recreational-boat registrations in 2025, −0.9% on 2024 (`CLM-CHN-019`); **289** recreational ports
and **134,200** berths in March 2026, 67% Mediterranean (`CLM-CHN-020`); **1,418** rental-boat registrations in 2025,
321 in the Balearics (`CLM-CHN-021`); the Balearic rental fleet reported at about **3,500** licensed boats with day
rates 250–15,000 € and rentals down ~25% in the 2025 season (`CLM-CHN-022`). Portugal: **37** marinas and recreational
ports, **42** certified nautical stations, **>6,000** companies linked to recreational boating (`CLM-CHN-023`), with
historical naval-publication data of ~12,840 berths for 78,145 registered vessels (`CLM-CHN-024`, treated as
historical). These are infrastructure and registration counts. **None of them measures MAREA's addressable demand.**

## 3. Route-by-route assessment

Each route states its genuine commercial dependency, its complexity, the evidence that exists, what is unproven,
the economic structure that is and is not public, support obligations, barriers and a validation experiment. Machine
form: `channel-assessments.json` (CHN-A…CHN-F).

### Route A — Direct online sales (NAV, WEATHER, FLEET SaaS)

- **Fit.** Software families only. `NAV`/`WEATHER` are SFR-1 software fulfilment; a `FLEET` tenancy is also SFR-1. No
  hardware bundle can be sold this way without a compatibility/installation step, because MC-08 excludes SFR-1 for
  any bundle containing hardware work.
- **Buyer.** Software-first coastal cruiser, or a small fleet administrator buying seats with no hardware.
- **Process.** Self-service discovery → edition comparison → annual entitlement → digital onboarding → support.
- **Dependency.** Own checkout, entitlement and billing, payment provider, **chart and weather data licences**
  (`BLOCKED`), support staffing, legal consumer terms (`OPEN`).
- **Complexity.** MEDIUM for software only.
- **Evidence.** Online nautical retail exists at scale and is volatile (`CLM-CHN-009`, `CLM-CHN-010`); fleet-SaaS list
  prices sit at USD 5.18/vessel/month with a USD 259 minimum or 99–399 € plans (`CLM-CHN-018`).
- **Unproven.** Willingness to pay at the portfolio hypotheses; that chart licensing permits an inclusive offer; that a
  self-service funnel can absorb device-connection support; that organic discovery exists at all — no traffic or
  search-interest measurement was obtainable.
- **Economics.** No third-party margin is paid, but acquisition, support, refund, hosting and data-licence cost are
  all unsourced. **Margin `UNKNOWN`.**
- **Support.** Tier-0/1 documentation, entitlement and chart-region help, cancellation/export, data-protection
  handling.
- **Barriers.** No approved price; no data licences; brand not cleared for publication; consumer-law terms `OPEN`.
- **Experiment EX-CHN-01.** Interest/waitlist test with **no price and no sellable state**, measuring which editions
  attract qualified interest and which compatibility questions arrive first.

### Route B — Marine electronics installers (HUB, AIS, DISPLAY, SENSE, PILOT, WATCH; START/CRUISE/SAIL/PROTECT/COMPLETE)

- **Fit.** The only credible route for mixed-vessel integration, and mandatory where steering work is involved.
- **Buyer.** Refit/upgrade owner of a 6–15 m vessel with mixed-age instruments.
- **Process.** Vessel assessment → configuration → itemised quotation (hardware + labour separately) → install →
  commissioning → training → handover → first-line support and warranty intake.
- **Dependency.** A partner network that **does not exist**: no agreement, register, competence criteria or rate card
  (MC-08 §1, §16). The installer's economics rest on **labour**, not on product margin alone — which is why the
  61 €/h electronics line and call-out structures matter more than any hypothetical product discount.
- **Complexity.** HIGH: compatibility questionnaire, refusal criteria, installation/commissioning records, warranty
  allocation, safety escalation.
- **Evidence.** Published Spanish yard labour 32.02–76 €/h with electronics at 61 €/h (`CLM-CHN-001`…`-003`); US
  installer terms with travel and a two-hour minimum (`CLM-CHN-004`); installer pay benchmarks (`CLM-CHN-005`);
  vendor rebate/warranty obligations falling on the installing dealer (`CLM-CHN-011`, `CLM-CHN-012`).
- **Unproven.** Adoption by installers who already carry established ecosystems; measured install hours; the level of
  any installer margin required to cover their support and warranty exposure; whether marina tariffs proxy
  independent billing (they do not, strictly).
- **Economics.** Public: labour rates and cost benchmarks only. **Installer margin on hardware, trade discount, payment
  terms and warranty labour reimbursement: `UNKNOWN`.** MC-10 must ask each of those, per family, in writing.
- **Support.** Technical bulletins, compatibility matrix, escalation to engineering, RMA route, training material.
- **Barriers.** No network and no measured hours; PILOT gated by safety case and sea trials; unproven brand.
- **Experiment EX-CHN-02.** 5–8 structured installer interviews (no demo, no price list) capturing current brands,
  billing, travel policy, typical hours for gateway and AIS receiver, support charging, and what they would require in
  writing. Output recorded as `DISCOVERY_NOT_PRICE`.

### Route C — Marine equipment distributors (national wholesalers, pan-European B2B groups)

- **Fit.** HUB, AIS, DISPLAY, SENSE, PILOT, WATCH, NAV through two layers of resale.
- **Buyer.** Indirect: the distributor's shipchandler and installer account base.
- **Process.** Account opening → brand listing → opening order → stocking terms → resale → logistics/returns.
- **Dependency.** A listing decision by a logistics business, not by a marketing partner; and MAREA's ability to meet
  certification, multilingual product data, stock, credit, warranty and RMA prerequisites.
- **Complexity.** HIGH.
- **Evidence.** An Iberian wholesale layer exists (`CLM-CHN-007`); pan-European groups operate B2B-only distribution
  companies in five named countries (`CLM-CHN-008`); vendors publish dealer processes without terms
  (`CLM-CHN-011`…`-015`); no margin percentage is public for ES/PT (`CLM-CHN-036`).
- **Unproven.** That a distributor would list an uncertified new brand; that required trade discount is absorbable;
  that listing prerequisites can be met inside a year; that range rather than a single SKU would be stocked.
- **Economics.** **Trade discount, volume tiers, payment days, stock rotation, co-op and rebates: `UNKNOWN`.** MC-10 must ask
  for the distributor's standard account-opening terms, required product data, minimum opening order and RMA policy —
  without representing it as an offer to EMBARCARTE.
- **Support.** Trade product data and training, spares, warranty administration, price-position governance, manuals.
- **Barriers.** No conformity declaration; no approved or trade price; two-layer support ambiguity; zero sell-through.
- **Experiment EX-CHN-03.** MC-10-only desk mapping of distributors and their **published** listing prerequisites. No
  contact, no terms requested.

### Route D — Marinas and shipyards

- **Fit.** HUB, AIS, SENSE, WATCH, DISPLAY (PILOT only after safety and conformity gates close) — START/CRUISE/
  PROTECT and, later, SAIL/COMPLETE.
- **Buyer.** Berth holder in seasonal maintenance or refit; and possibly the marina itself as installer.
- **Process.** Yard booking → workshop/subcontractor work → published tariff billing for infrastructure and labour →
  commissioning → handover.
- **Dependency.** Yard willingness to install a third-party brand; marina may be a **competitor** selling stocked brands;
  access, scheduling and seasonal peaks.
- **Complexity.** MEDIUM-HIGH.
- **Evidence.** Full published tariffs (`CLM-CHN-001`…`-003`); 289 ports and 134,200 berths (`CLM-CHN-020`).
- **Unproven.** That marinas install third-party electronics; that Galician/Basque/Catalan rates generalise to Portugal
  or Mediterranean refit yards; that berth capacity implies electronics install volume; that a yard accepts MAREA's
  limitation and disclaimer set within its own liability.
- **Economics.** Customer-facing labour and infrastructure rates are public. **Whether marinas buy electronics at
  trade, their markup, and workshop-versus-subcontractor allocation: `UNKNOWN`.**
- **Support.** Workmanship versus product liability split, workshop-grade instructions, safety escalation, commissioning
  records.
- **Barriers.** No agreement, competence assessment or insurance; existing brand economics; labour spread >2×;
  steering work unreachable.
- **Experiment EX-CHN-04.** Desk review of 10–15 ES/PT marina/yacht-yard tariffs and service catalogues: recorded rates,
  whether electronics installation is offered, stated certification/insurance. No contact.

### Route E — Charter and fleet operators (FLEET; WATCH, NAV, AIS, WEATHER, SENSE as attached content)

- **Fit.** `FLEET` package only, on SFR-5 written contracts; telemetry content depends on HUB/WATCH/SENSE, all blocked.
- **Buyer.** Charter company, sailing school, boat club or manager. Contract buyer, director decision, maintenance
  manager influence.
- **Process.** Discovery → sub-fleet pilot → written contract → per-vessel onboarding, telemetry install, roles,
  support, reporting.
- **Dependency.** A contracted B2B motion, hardware telemetry that does not exist, connectivity contracts, and a
  data-protection basis for crew/vessel data (`OPEN`, X-07).
- **Complexity.** HIGH: tenant isolation, SLA, onboarding scope, audit/export, connectivity.
- **Evidence.** Fleet-SaaS comparator prices (`CLM-CHN-018`); Balearic fleet and rental decline (`CLM-CHN-021`,
  `CLM-CHN-022`); Portuguese market structure (`CLM-CHN-023`).
- **Unproven.** Willingness to pay per vessel **plus** hardware **plus** connectivity; that FLEET can sell before
  telemetry exists; that a declining rental market leaves budget; preference for a new brand over established
  yacht-management suites.
- **Economics.** Two published comparator price points; **Iberian budgets, procurement cycles, per-vessel connectivity
  and hardware retrofit costs: `UNKNOWN`. No SLA, contract or onboarding scope exists.**
- **Support.** In-season account support, per-vessel onboarding and consent, data-processing terms, written SLA — none
  exists and none may be promised.
- **Barriers.** `FLEET-ENTERPRISE NOT_ESTABLISHED`; no telemetry; no data basis; no references or pilot fleet.
- **Experiment EX-CHN-05.** 3–5 discovery interviews in the Balearics and Galicia on current vessel-status tracking,
  spend on tools/connectivity, and evidence required of a supplier. No demo, no price, no reference.

### Route F — Nautical e-commerce and specialist retail

- **Fit.** AIS, HUB, DISPLAY, SENSE, WATCH, NAV hardware listings (START/CRUISE/PROTECT).
- **Buyer.** Price-comparing self-selector who self-installs simple items or buys before hiring an installer.
- **Process.** Catalogue listing → comparison content → cart → shipping; retailer owns transaction and return.
- **Dependency.** Listing with retailers already carrying five or more established electronics brands; margin structure;
  retailer willingness to explain an unproven brand.
- **Complexity.** MEDIUM.
- **Evidence.** Catalogue-scale Spanish and European online nautical retail (`CLM-CHN-009`); modelled online-sales
  estimates (`CLM-CHN-010`); MRP/authorised-dealer structure described for the US (`CLM-CHN-016`); comparison-intent
  query language for receivers (`CLM-CHN-030`).
- **Unproven.** That an unproven brand wins shelf space; that online buyers accept a disclosed installation requirement;
  that MAREA margins survive retail discounting; that traffic exists.
- **Economics.** **Retailer margin, listing fees, returns rate, payment terms, co-op: `UNKNOWN`.** The 50%-of-list
  anecdote is unverified, US-specific and excluded from any calculation.
- **Support.** Accurate catalogue data, EAN, compatibility statement, return/warranty intake, reusable content.
- **Barriers.** No certification, BOM, approved price or packaging; comparison positioning weak; EU resale-price
  practice must not follow the US MRP description; installed-goods returns differ from consumer-goods returns.
- **Experiment EX-CHN-06.** Desk catalogue audit of 8–12 ES/PT/EU retailers: which AIS/gateway/monitoring products are
  listed, how installation is described, what compatibility information is published. No contact, no listing request.

## 4. Cross-route comparison

| Route | Families | Fit today | Dependency | Complexity | Public labour/margin evidence | Margin status |
| --- | --- | --- | --- | --- | --- | --- |
| A Direct online | NAV, WEATHER, FLEET | Software only; blocked by pricing, licences, brand | Own platform + data licences | MEDIUM | Comparator SaaS and e-commerce estimates | `UNKNOWN` |
| B Installers | HUB, AIS, DISPLAY, SENSE, PILOT, WATCH, NAV | Highest technical fit; no network exists | Partner network (absent) | HIGH | **Spanish yard labour 32.02–76 €/h; electronics 61 €/h** | `UNKNOWN` |
| C Distributors | HUB, AIS, DISPLAY, SENSE, PILOT, WATCH, NAV | Layer exists; listing preconditions unmet | Distributor listing decision | HIGH | Programme shapes only; no ES/PT percentages | `UNKNOWN` |
| D Marinas/yards | HUB, AIS, SENSE, WATCH, DISPLAY | Captive audience; may be competitor | Yard willingness + liability split | MEDIUM-HIGH | **Published tariffs incl. infrastructure** | `UNKNOWN` |
| E Charter/fleet | FLEET (+ hardware) | Contract route; telemetry missing | Contract + hardware + connectivity | HIGH | Two SaaS comparator price points | `UNKNOWN` |
| F E-commerce/retail | AIS, HUB, DISPLAY, SENSE, WATCH, NAV | Catalogue-scale market exists | Listing + margin + certification | MEDIUM | Modelled sales estimates; US MRP context | `UNKNOWN` |

**No route has positive verified unit economics, because no cost input is sourced.** The table ranks *technical fit
and evidence availability*, not profitability.

## 5. Evidence-bounded sequencing hypothesis

Stated as a hypothesis, not a decision (the Lead and MC-10 own decisions):

1. **B and D are the evidence-richest hardware routes** — the only routes where customer-facing labour is publicly
   priced in Spain. They should be validated first because their economics are at least partially observable.
2. **A is the only route where MAREA controls the full margin**, and the only one testable without hardware — but it is
   blocked by data licensing and pricing, so it can be *tested for interest*, not transacted.
3. **F is a listing problem before it is a demand problem**: without certification, BOM, packaging and an approved
   price, no catalogue can carry the product regardless of demand.
4. **C is premature**: distributors list certified, stockable products; MAREA has none, so any approach would be a
   relationship risk with no listing outcome.
5. **E should not be sold as a package until telemetry exists**; selling a fleet SaaS whose core promise cannot be
   delivered would repeat the failure mode MC-08 prohibits.

## 6. Economic structure that public evidence cannot fill (UNKNOWN register)

| Item | Status | What MC-10 must ask |
| --- | --- | --- |
| Installer margin on hardware | `UNKNOWN` | Standard trade discount by family and order size, stated in writing. |
| Distributor margin / volume tiers | `UNKNOWN` | Account-opening terms, tier thresholds, opening order, payment days. |
| Retailer margin / listing fees | `UNKNOWN` | Listing requirements, returns policy, co-op contribution, price-maintenance expectations. |
| Measured installation hours per family | `UNKNOWN` | Measured hours for gateway, AIS, display, sensors on ≥2 representative vessels. |
| Installer call-out, travel and minimum billing | `UNKNOWN` (ES/PT) | Written rate card; observed structure exists only in a US example. |
| Warranty labour reimbursement | `UNKNOWN` | Who pays for a warranty re-visit; dealer expectations in writing. |
| Marina/referral commission | `UNKNOWN` | Whether yards expect referral or resale margin, and at what level. |
| Partner expectations to carry an unproven brand | `UNKNOWN` | Demo unit, training, stock support, marketing support, exclusivity. |

No row may be filled with a comparator or an analyst estimate. Each is a written-input requirement.

## 7. Validation experiments (summary; detail in `channel-assessments.json`)

| ID | Route | Nature | Output | Ethics/limits |
| --- | --- | --- | --- | --- |
| EX-CHN-01 | A | Content/interest test, no price, no sellable state | Qualified interest by edition; first compatibility questions | Privacy-reviewed instrumentation; no price stated |
| EX-CHN-02 | B | 5–8 installer interviews | Quoted hours, billing practices, prerequisites | No demo, no price list, no partnership implied |
| EX-CHN-03 | C | Desk mapping of published prerequisites | Prerequisite checklist; named gaps | Identifiable firms are not contacted in MC-09 |
| EX-CHN-04 | D | Desk tariff/service-catalogue review | Regional labour-rate table; yard segmentation | Public documents only |
| EX-CHN-05 | E | 3–5 operator interviews | Problem/priority map; evidence requirements | No demo, no price, no reference |
| EX-CHN-06 | F | Desk catalogue audit | Listing-prerequisite checklist; shelf map | No listing request, no contact |

Every experiment yields **discovery**, not prices or commitments. None may be converted into a quotation, a partner
claim or a published comparison.

## 8. Traceability

- Structured evidence: `docs/marea/market-validation/data/evidence-channels.json` (38 sources, 36 claims),
  `channel-assessments.json` (6 channels, CHN-A…CHN-F).
- Governing documents: `docs/marea/COMMERCIAL-PORTFOLIO.md` (channel decision rule, price rules),
  `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL.md` §10 (D2C and installer-led models, `CHAN` `BLOCKED`),
  `docs/marea/bundles/BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (SFR-1…SFR-5, no network, no rate card).
- Blockers referenced: `X-05` (costs), `X-06` (customer/partner evidence), `X-07` (data protection), `H-01`/`P-04`
  (PILOT safety and sea trials), `H-06`/`H-13` (conformity), `D-01`…`D-05` (chart/weather licensing).

## 9. Status statement

Six routes have been assessed against public evidence. **Installation labour is publicly priced in Spain (32.02–76 €/h
published; 61 €/h electronics-specific at one marina); dealer, distributor and retailer margins are NOT public for Spain
or Portugal and are recorded `UNKNOWN`; no partner, agreement, rate card, commission or discount exists or is implied.**
No volume, forecast, market size or margin is asserted. This document cannot PASS a commercial gate: it narrows
`X-05`/`X-06` and supplies the MC-10 question set, nothing more.
