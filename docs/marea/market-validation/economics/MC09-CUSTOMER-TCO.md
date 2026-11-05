# MAREA — Conditional customer total cost of ownership (MC-09 / Workstream D)

| Field | Value |
| --- | --- |
| Document ID | MC-09 / D — MC09-CUSTOMER-TCO |
| Milestone | MC-09 (market and competitive intelligence) |
| Date | 2026-10-31 |
| Owner | Pricing and Commercial Economist (agent-d-economics) |
| Status | `INTERNAL_RESEARCH_DATA_ONLY` · CONFIGURATION-COST `UNKNOWN` · NO TOTAL PUBLISHED AS A PRICE |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` (MC-08 HEAD) |
| Branch | `feature/marea-mc09-market-competitive-intelligence` |
| Write scope | `docs/marea/market-validation/economics/` and `docs/marea/market-validation/data/{tco-models,wtp-hypotheses,evidence-economics}.json` only |
| Machine-readable companion | `docs/marea/market-validation/data/tco-models.json` |
| Is not | Not a price list · not a quotation · not a supplier cost · not a margin · not a budget · not an offer |

## 1. What a customer TCO is, and what this document refuses to do

A customer total cost of ownership answers one question: **what would a buyer have to spend, over a stated
period, to own and use a configuration?** It is a demand-side cash-cost model. It is not a supplier cost
model, not a margin calculation and not a price.

Two formulas are used for every bundle, unchanged:

```text
YEAR_1_TCO = initial hardware
           + accessories required for a usable configuration
           + installation and commissioning (labour, travel, materials)
           + year-1 licences and data entitlements
           + year-1 connectivity
           + other required first-year costs (shipping, tax not recoverable, warranty extension, training)

YEAR_N_TCO = renewals (licences/subscriptions)
           + connectivity
           + maintenance and service
           + other recurring costs (support, data plans, calibration, warranty extension)
```

Rules that this document enforces in every table:

1. **A price hypothesis is a scenario input, not an established price.** The MAREA lines are
   `HYPOTHESIS_UNAPPROVED` figures recorded with basis `ASSUMED`. They are the only numeric form in which a
   product line may appear today; they are never described as approved, final or purchasable.
2. **An UNKNOWN is never zero.** A cost component that could not be evidenced is recorded with amount
   `null`, named in `unknowns[]` and excluded from every partial sum. It is never silently dropped and
   never assumed away to make a total look complete.
3. **No definitive total is published while any component is UNKNOWN.** A partial sum is labelled as a
   partial sum, with its formula, and cannot be quoted to a customer or used as a price.
4. **Original currency and tax treatment are preserved.** Every figure is EUR in the records below; the
   hypothetical consumer lines are VAT-inclusive hypotheses and the FLEET line is VAT-excluded (D-014).
   Cross-currency or net-of-tax normalisation would be a separate `MODEL_DERIVED` record and is not
   performed here.

### 1.1 Completeness classification

| Classification | Meaning | Consequence |
| --- | --- | --- |
| `COMPLETE` | Every component is evidenced and numeric; the total equals the component sum | A total may be published as a TCO **model output**, still not as a price |
| `INCOMPLETE` | At least one component is `UNKNOWN` | `year1Total` must be `null`; the partial sum is labelled and never presented as a total |
| `SCENARIO_DERIVED` | Every component is numeric but at least one rests on an explicit assumption | A total may be published only as a scenario, labelled with its assumptions, never as a price or forecast |

**Result for MC-09: all six bundle models are `INCOMPLETE`.** No bundle has an evidenced installation cost,
and four bundles additionally lack module or kit prices. The installation scenario bands in §3 are
`SCENARIO_DERIVED` **for that component only**; they are not bundle totals and do not change the model
classification.

### 1.2 The one observation that must not be misread

Every numeric MAREA line below is a retail hypothesis. Adding retail hypotheses does not produce a cost, a
margin or a viable price. Conversely, subtracting a partial sum from the historical headline does not
produce a discount: it produces the difference between two sets of unapproved figures, plus a list of
omitted costs. The recorded verdict of MC-08 — no bundle has an established price and no fixed turnkey
price is permitted — is not weakened anywhere in this document.

## 2. Assumptions register

Every assumption used in a scenario band is listed here. An assumption is a planning premise, never
evidence.

| ID | Assumption | Value used | Why it is an assumption | What would replace it |
| --- | --- | --- | --- | --- |
| A-01 | Published service rate reference | EUR 105/hour VAT-inclusive (systems and electronics integration) | One Croatian contractor's 2026 rate card (`SRC-ECO-001`); not a Spanish rate and not an EMBARCARTE rate | A written Spanish installer rate card or real quotations |
| A-02 | Transferability of A-01 to a MAREA installation | Accepted for scenario arithmetic only | No Spanish or Portuguese rate card was retrieved | Measured installation invoices / installer agreements |
| A-03 | Installation hours, single-device bundle (START) | 2–4 hours | No measured hours exist; 2 hours is the source's minimum attendance | Time-and-motion measurement on representative vessels |
| A-04 | Installation hours, four-device bundle (CRUISE) | 6–12 hours | No measured hours exist | Measured installation records |
| A-05 | Installation hours, monitoring bundle (PROTECT) | 3–6 hours | No measured hours exist | Measured installation records |
| A-06 | Installation hours, integrated bundle (COMPLETE) | 12–24 hours | No measured hours exist; the largest configuration is also the least defined | Measured installation programme |
| A-07 | Travel | 0.63 EUR/km, 50–150 km round trip = 31.50–94.50 EUR | Published rate and distance band are not from a MAREA job | Actual travel distances and rate card |
| A-08 | WATCH subscription year-1 | 9.90 EUR/month × 12 = 118.80 EUR | "From" hypothesis with `OPEN` included contents | Established subscription price and terms |
| A-09 | FLEET scenario size | 5 vessels, 12 months, 49 EUR/vessel/month = 2,940 EUR VAT-excluded | The package has no amount and no customer; a vessel count must be assumed to show any arithmetic | A signed contract or a defined pilot cohort |
| A-10 | VAT | Hypotheses are treated as VAT-inclusive consumer retail, VAT-excluded for FLEET | Planning convention, rate `OPEN` per line | Written tax advice |

## 3. Bundle models

Notation: `S_partial` is the sum of numeric components actually recorded. `UNKNOWN` components are listed
separately and are excluded from `S_partial` — never entered as zero.

### 3.1 MAREA START — HUB-STANDARD + NAV-PRO one year

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| HUB-STANDARD hardware | `ASSUMED` | 349 | Retail hypothesis `HYPOTHESIS_UNAPPROVED`; BOM `BLOCKED` |
| NAV-PRO one-year entitlement | `ASSUMED` | 149 | Retail hypothesis; chart rights not granted |
| NMEA 2000 cabling/mounting kit (reference) | `OBSERVED` | 144 | Observed accessory (`SRC-ECO-002`); inclusion not established |
| Professional installation (survey, mounting, wiring, test) | `UNKNOWN` | null | No measured hours; no Spanish rate |
| Configuration, commissioning, handover | `UNKNOWN` | null | No measured hours |
| Extended warranty / support plan | `UNKNOWN` | null | No warranty term exists |

```text
S_partial(START) = 349 + 149 + 144 = 642 EUR
YEAR_1_TCO(START) = 642 + INSTALL(UNKNOWN) + CONFIG(UNKNOWN) + WARRANTY(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
```

**Scenario band (SCENARIO_DERIVED, installation component only).** Using A-01 to A-03:
`2 h × 105 = 210 EUR` to `4 h × 105 = 420 EUR`. Adding travel A-07 gives 241.50–514.50 EUR for the
installation line. With the partial sum, a scenario *subtotal* of 642 + 210 to 642 + 420 = 852 to
1,062 EUR can be shown, explicitly excluding cabling-required accessories, warranty and any support plan.
It is a scenario, not a TCO and not a price.

**Critical unknowns.** Whether the EUR 642 partial and the historical PH-01 figure of EUR 499 describe the
same configuration; whether a NMEA 2000 kit is required; what installation and commissioning actually cost.

### 3.2 MAREA CRUISE — NAV-ESSENTIAL + HUB-STANDARD + AIS-RECEIVER + DISPLAY-7

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| NAV-ESSENTIAL one-year entitlement | `ASSUMED` | 99 | Retail hypothesis; chart rights not granted |
| HUB-STANDARD hardware | `ASSUMED` | 349 | Retail hypothesis; BOM `BLOCKED` |
| AIS-RECEIVER hardware (receive-only) | `ASSUMED` | 249 | Retail hypothesis; no RF conformity |
| DISPLAY-7 hardware | `ASSUMED` | 699 | "From" hypothesis; size `NOT_FROZEN` |
| NMEA 2000 cabling/mounting kit (reference) | `OBSERVED` | 144 | Observed accessory; inclusion not established |
| AIS antenna or VHF splitter | `UNKNOWN` | null | Required per `SRC-ECO-006`; no price displayed |
| DISPLAY mount and mounting hardware | `UNKNOWN` | null | No defined mount for an unfrozen display |
| Installation, configuration, commissioning | `UNKNOWN` | null | Multi-device hours unmeasured |

```text
S_partial(CRUISE) = 99 + 349 + 249 + 699 + 144 = 1,540 EUR
YEAR_1_TCO(CRUISE) = 1,540 + ANTENNA(UNKNOWN) + MOUNT(UNKNOWN) + INSTALL(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
Arithmetic note: 1,540 - 1,399 (historical PH-02) = +141 EUR, before antenna, mount and labour.
                This is a comparison of mixed unapproved/observed inputs, not a cost overrun finding.
```

**Scenario band (installation component only).** Using A-01/A-02/A-04: `6 h × 105 = 630 EUR` to
`12 h × 105 = 1,260 EUR`; with travel A-07, 661.50–1,354.50 EUR. A scenario *subtotal* excluding antenna
and mount: 2,170–2,800 EUR. Not a TCO, not a price.

### 3.3 MAREA SAIL — NAV-PRO + HUB-STANDARD + PILOT-COASTAL (quotation) + SENSE-WIND

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| NAV-PRO one-year entitlement | `ASSUMED` | 149 | Retail hypothesis |
| HUB-STANDARD hardware | `ASSUMED` | 349 | Retail hypothesis; BOM `BLOCKED` |
| PILOT-COASTAL installed-scope starting reference | `ASSUMED` | 1,290 | **Starting reference only** (D-009); not inclusive |
| SENSE-WIND module | `UNKNOWN` | null | No named module price; EUR 99 entry floor not attributable |
| Vessel survey / steering assessment | `UNKNOWN` | null | Hours and rate unmeasured |
| Installation, commissioning, sea trial, training | `UNKNOWN` | null | Installed scope does not exist as a measured cost |
| Extended warranty / installed-system support | `UNKNOWN` | null | No terms exist |

```text
S_partial(SAIL) = 149 + 349 + 1,290 = 1,788 EUR
YEAR_1_TCO(SAIL) = 1,788 + SENSE_WIND(UNKNOWN) + SURVEY(UNKNOWN) + INSTALL_SEATRIAL(UNKNOWN) + WARRANTY(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
```

**Why no scenario total is shown.** The EUR 1,290 PILOT reference excludes the drive/actuator selected per
vessel, rudder/steering feedback, cabling, power protection, physical E-stop, installation labour,
commissioning, supervised sea trial, conformity, warranty reserve and installer margin (MC-08 §6.3,
D-009). Any scenario total would have to invent the largest cost components, so the honest output is the
partial sum plus the named unknowns. The MC-08 indicative floor of EUR 1,887 (which adds the
non-attributable EUR 99 placeholder) is **not** used here: the placeholder is not a SENSE-WIND price.
PILOT safety gate `BLOCKED` also forbids any quotation or price.

### 3.4 MAREA PROTECT — WATCH-CORE + SENSE-ESSENTIALS kit (SENSE-POWER + SENSE-BILGE)

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| WATCH-CORE hardware | `ASSUMED` | 299 | Retail hypothesis; connectivity excluded |
| WATCH-CORE subscription, year 1 | `ASSUMED` | 118.80 | 9.90 × 12 = 118.80; "from" hypothesis, contents `OPEN` |
| SENSE-ESSENTIALS kit (two modules) | `UNKNOWN` | null | Neither kit nor module price exists |
| Installation of WATCH + two modules | `UNKNOWN` | null | Unmeasured |
| Connectivity / data plan | `UNKNOWN` | null | Excluded from the subscription hypothesis; no SIM terms |
| First-year warranty and support | `UNKNOWN` | null | No terms exist |

```text
S_partial(PROTECT) = 299 + 118.80 = 417.80 EUR
YEAR_1_TCO(PROTECT) = 417.80 + KIT(UNKNOWN) + INSTALL(UNKNOWN) + CONNECTIVITY(UNKNOWN) + WARRANTY(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
Arithmetic note: 299 + 2 x 99 (non-attributable placeholders) = 497 vs historical 399 -> +98 EUR.
                The 99s are NOT module prices; the shortfall is an MC-08 composition finding, not a cost.
```

**Scenario band (installation component only).** Using A-01/A-05: `3 h × 105 = 315 EUR` to
`6 h × 105 = 630 EUR`; with travel, 346.50–724.50 EUR. The kit, connectivity and warranty remain unknown,
so no scenario subtotal is meaningful even as a scenario.

### 3.5 MAREA COMPLETE — NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + four SENSE modules + PILOT-COASTAL

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| NAV-PRO one-year entitlement | `ASSUMED` | 149 | Retail hypothesis |
| HUB-PRO hardware | `ASSUMED` | 499 | Retail hypothesis; BOM `BLOCKED` |
| DISPLAY-7 hardware | `ASSUMED` | 699 | "From" hypothesis; size `NOT_FROZEN` |
| WATCH-CORE hardware | `ASSUMED` | 299 | Retail hypothesis |
| WATCH-CORE subscription, year 1 | `ASSUMED` | 118.80 | 9.90 × 12; contents `OPEN`, connectivity excluded |
| PILOT-COASTAL installed-scope starting reference | `ASSUMED` | 1,290 | Starting reference only (D-009); not inclusive |
| SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV | `UNKNOWN` | null | No named module price exists |
| Installation, configuration, commissioning, training | `UNKNOWN` | null | Unmeasured |
| Extended warranty, support, multi-year subscriptions | `UNKNOWN` | null | No terms; hypothesis has no stated term |

```text
S_partial(COMPLETE) = 149 + 499 + 699 + 299 + 118.80 + 1,290 = 3,054.80 EUR
YEAR_1_TCO(COMPLETE) = 3,054.80 + SENSE(4 x UNKNOWN) + INSTALL(UNKNOWN) + WARRANTY(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
```

**Scenario band (installation component only).** Using A-01/A-02/A-06: `12 h × 105 = 1,260 EUR` to
`24 h × 105 = 2,520 EUR`; with travel, 1,291.50–2,614.50 EUR. The four SENSE modules, warranty and
subscription years beyond year one remain unknown, so no scenario total is stated.

### 3.6 MAREA FLEET package — bespoke contracted package

| Component | Basis | Amount (EUR) | Status note |
| --- | --- | ---: | --- |
| FLEET-START subscription, 5-vessel scenario | `ASSUMED` | 2,940 | 5 × 12 × 49 = 2,940, VAT excluded; rate is a "from" hypothesis |
| Onboarding (verification, inventory, roles, configuration) | `UNKNOWN` | null | No price; hours and rate `OPEN`/`BLOCKED` |
| Registration and migration | `UNKNOWN` | null | No scope or price |
| Training | `UNKNOWN` | null | No scope or price |
| Support beyond the subscription entitlement / SLA | `UNKNOWN` | null | No support model; no SLA |
| Optional hardware, connectivity, installation | `UNKNOWN` | null | Quoted separately; must not be embedded in the per-vessel fee (D-014) |

```text
S_partial(FLEET, 5-vessel scenario) = 5 x 12 x 49 = 2,940 EUR, VAT excluded
YEAR_1_TCO(FLEET) = 2,940 + ONBOARDING(UNKNOWN) + MIGRATION(UNKNOWN) + TRAINING(UNKNOWN)
                    + SUPPORT(UNKNOWN) + OPTIONAL HARDWARE/CONNECTIVITY/INSTALLATION(UNKNOWN)
Completeness: INCOMPLETE  ->  year1Total = null, recurringAnnual = null
```

The FLEET package has no established amount (`PH-06`). The 2,940 EUR is a five-vessel scenario
assumption, not a package price, not a contract value and not a forecast. Any vessel count, term or
service scope is `OPEN`.

### 3.7 Year-N recurrence

```text
YEAR_N_TCO = RENEWALS + CONNECTIVITY + MAINTENANCE + OTHER_RECURRING

START:     NAV renewal price NOT_ESTABLISHED
CRUISE:    NAV renewal price NOT_ESTABLISHED
SAIL:      NAV renewal NOT_ESTABLISHED; PILOT service/maintenance NOT_ESTABLISHED
PROTECT:   WATCH renewal NOT_ESTABLISHED; connectivity NOT_ESTABLISHED; maintenance NOT_ESTABLISHED
COMPLETE:  NAV + WATCH renewals NOT_ESTABLISHED; connectivity, maintenance, support NOT_ESTABLISHED
FLEET:     per-vessel subscription renewal NOT_ESTABLISHED; support/SLA NOT_ESTABLISHED
```

No `YEAR_N_TCO` numeric value may be published for any bundle. The renewal price is not the year-1
hypothesis: a renewal is a separate commercial object whose price, notice and indexation do not exist.
Maintenance, calibration, service visits and connectivity are additional unknowns; no annual
maintenance figure was retrieved for any comparable product.

## 4. Completeness summary

| Bundle | `S_partial` (EUR) | Numeric components | Unknown components | Completeness | `year1Total` |
| --- | ---: | ---: | ---: | --- | --- |
| START | 642.00 | 3 | 3 | `INCOMPLETE` | `null` |
| CRUISE | 1,540.00 | 5 | 3 | `INCOMPLETE` | `null` |
| SAIL | 1,788.00 | 3 | 4 | `INCOMPLETE` | `null` |
| PROTECT | 417.80 | 2 | 4 | `INCOMPLETE` | `null` |
| COMPLETE | 3,054.80 | 6 | 3 (each covering multiple items) | `INCOMPLETE` | `null` |
| FLEET (5-vessel scenario) | 2,940.00 | 1 | 5 | `INCOMPLETE` | `null` |

No bundle is `COMPLETE` or even `SCENARIO_DERIVED` as a total. The installation bands in §3 are
`SCENARIO_DERIVED` component illustrations only.

## 5. Cross-bundle findings

1. **Installation is the universal unknown.** Every bundle requires professional installation or
   configuration that has never been measured, and no Spanish installer rate card was retrieved. The only
   published rate card found (EUR 90–105/hour, VAT-inclusive, 2-hour minimum, EUR 0.63/km) is Croatian and
   is used only as a scenario anchor.
2. **Accessories are mandatory but unpriced.** The AIS receiver page states that a dedicated antenna or a
   splitter is required and sold separately; no price was displayed. Display mounts and cabling kits are
   similarly open. Treating them as zero is the single most likely way to understate CRUISE.
3. **The largest configurations are the least defined.** COMPLETE depends on four unpriced SENSE modules and
   a quotation-only PILOT scope; SAIL depends on an unpriced SENSE-WIND and a safety-gated PILOT.
4. **The partial sums are not comparable across bundles.** They contain different numbers of hypothesis
   lines and different omitted scopes. Ranking bundles by `S_partial` would be a category error.
5. **Partial sums already approach or exceed some historical headlines.** CRUISE's partial sum is EUR 141
   above its historical hypothesis before antenna, mount and labour; this is an observation about the
   hypothesis set and observed accessory price, not evidence that the headline is below cost.
6. **No TCO can be presented to a customer.** Without installation, accessories, warranty and renewal
   terms, any customer-facing total would be fabricated. The correct commercial object remains a
   quotation-valued configuration, not a TCO figure.

### 5.7 Observed composed-equivalent customer configurations (workstream B, context only)

Workstream B's `data/competitor-observations.json` records composed retail configurations that a buyer
could assemble from several vendors, cross-referenced here by `obsId`:

- Orca complete hardware package (Display 2 + Core 2 + charging mount), EUR 1,997 VAT-inclusive in DE
  (`OBS-CMP-041`);
- Yacht Sentinel PROTECT-equivalent (monitoring hardware + annual service), EUR 1,590 VAT-excluded
  (`OBS-CMP-044`);
- Siren 3 plus annual service plan, USD 299.99 hardware plus the separately priced plan (`OBS-CMP-045`);
- CRUISE-, SAIL- and COMPLETE-equivalent compositions (`OBS-CMP-042`, `OBS-CMP-043`, `OBS-CMP-046`) where
  the components were recorded individually and deliberately not totalled.

These rows are **demand-side context only**. They are sums of retail prices from different vendors, with
different tax treatment, territory and included scope; they are not MAREA bundle TCOs, do not include the
same installation or warranty scope, and are not normalised. They show that assembled competitor
configurations exist at price points in the same broad order of magnitude as the historical hypotheses.
That observation does not validate, rank or approve any MAREA hypothesis and is not a price comparison.

## 6. Limitations

- All MAREA numeric lines are unapproved retail hypotheses, recorded only as scenario inputs.
- No BOM, supplier quotation, installer quotation, measured labour time, warranty term, connectivity
  contract or renewal price exists; these are the missing evidence that keeps every model `INCOMPLETE`.
- The observed accessory and service rates come from one Croatian contractor and one Spanish distributor /
  retailer; they are not MAREA costs, not available to EMBARCARTE and not a benchmark of MAREA economics.
- No currency conversion, no net-of-tax normalisation and no discount is computed. A change in a hypothesis
  is not a change in cost.
- The models are architecture-neutral: they do not validate compatibility, installation feasibility,
  certification or any product claim.

## 7. Sources

External observations (retrieved 2026-10-31; full records in `data/evidence-economics.json`):
`SRC-ECO-001` (Elektrohertz rate card), `SRC-ECO-002` (Digital Yacht ES interfaces), `SRC-ECO-003`
(Comptoir Nautique Vulcan 7R and accessories), `SRC-ECO-006` (Digital Yacht AIS100 scope).

Repository context: `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` §3, §4, §5, §6;
`docs/marea/bundles/bundle-definitions.json` `priceHypothesisRegister`; `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §11;
`docs/marea/market-validation/data/governance-status.json`; `docs/marea/market-validation/data/tco-models.json`.
