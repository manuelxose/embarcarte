# MAREA — Conditional commercial economics (MC-09 / Workstream D)

| Field | Value |
| --- | --- |
| Document ID | MC-09 / D — MC09-COMMERCIAL-ECONOMICS |
| Milestone | MC-09 (market and competitive intelligence) |
| Date | 2026-10-31 |
| Owner | Pricing and Commercial Economist (agent-d-economics) |
| Status | `INTERNAL_RESEARCH_DATA_ONLY` · `PROFITABILITY_NOT_ESTABLISHED` · NO MARGIN, COST OR FORECAST PUBLISHED |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` (MC-08 HEAD) |
| Branch | `feature/marea-mc09-market-competitive-intelligence` |
| Write scope | `docs/marea/market-validation/economics/` and `docs/marea/market-validation/data/{tco-models,wtp-hypotheses,evidence-economics}.json` only |
| Is not | Not a business case · not a P&L · not a margin statement · not a supplier cost · not a revenue forecast · not an investment recommendation |

## 1. Question, verdict and status statement

**Question.** Can any MAREA product or bundle be shown to be commercially viable — that is, can a credible
contribution per unit, per subscription and per acquisition be demonstrated from evidence available in
MC-09?

**Verdict.** **`PROFITABILITY_NOT_ESTABLISHED`** for all nine product families and all six bundles. The
revenue side is only a set of unapproved retail hypotheses; the cost side is missing supplier quotations,
bills of materials, measured installation labour, warranty data, connectivity terms, provider licences and
acquisition measurement. No margin, contribution, break-even volume, payback period, LTV or CAC value is
stated anywhere in this document as a finding. Where a formula is shown, its inputs are `OPEN`/`BLOCKED`.

Status constraints carried from `governance-status.json` and not weakened here:

| Constraint | Value | Consequence |
| --- | --- | --- |
| `productProfitabilityEstablished` | `NO` | No margin or viability claim is admissible |
| `approvedBundlePrices` | `0` | No revenue may be computed from an "approved" price |
| `approvedProductionBom` | `0` | No hardware cost may be computed |
| `verifiedCommercialMargins` | `0` | No channel margin may be computed |
| `chartRightsGranted` / `dataProviderRightsGranted` | `false` | Provider cost of NAV/WEATHER is unknown |
| `slaEstablished` | `false` | No service-level cost or commitment exists |
| `productsForSale` | `0` | Revenue is hypothetical in every line |

## 2. Recurring revenue potential

### 2.1 What can be said

The only recurring revenue figures that exist are **unapproved retail hypotheses** for NAV, WATCH, WEATHER
and FLEET. Multiplying a hypothesis by a subscriber count produces a *scenario receipt*, not a forecast and
not revenue. No customer, contract, cohort, conversion rate or retention observation exists
(`customerDemandEmpiricallyValidated = NO`).

| Line | Hypothesis (unapproved) | Scenario receipt arithmetic | What it is not |
| --- | --- | ---: | --- |
| NAV-ESSENTIAL | EUR 99/year | 100 subscribers × 99 = 9,900 EUR/year | Not revenue; no subscriber exists |
| NAV-PRO | EUR 149/year | 100 subscribers × 149 = 14,900 EUR/year | As above |
| WATCH-CORE subscription | from EUR 9.90/month | 100 devices × 9.90 × 12 = 11,880 EUR/year | As above; included contents `OPEN` |
| WEATHER-STANDARD / PRO | EUR 49 / 89 per year | 100 × 49 = 4,900; 100 × 89 = 8,900 EUR/year | As above; provider rights not granted |
| FLEET-START / BUSINESS | from EUR 49 / 79 per vessel/month, VAT excluded | 5 vessels: 5 × 49 × 12 = 2,940; 5 × 79 × 12 = 4,740 EUR/year | Not a package price; no contract |
| FLEET package | no amount | not computable | The package has no established amount |

The subscriber/vessel counts above are **round illustrative volumes chosen only to show the shape of the
arithmetic**; they are not market estimates, pilot sizes, conversion assumptions or forecasts. No market
size, share or growth rate is derived from any observed price.

### 2.2 What a recurring line must fund

```text
Contribution per subscriber per period:
  C_sub = NR_sub - (C_DATA_LIC + C_API + C_CONN + C_ROAM + C_HOST + C_STORE_SVC
                    + C_NOTIF + C_SUP_SVC + C_BILLING + PAY + C_MON + C_PROVISION)

  NR_sub = listed hypothesis / (1 + v)   for consumer lines (v OPEN)
  NR_sub = listed hypothesis             for VAT-excluded FLEET lines (v_b2b treatment OPEN)
```

Every cost term in `C_sub` is `OPEN` or `BLOCKED` in MC-08's parameter registry. In particular: chart and
weather data licences (`C_DATA_LIC`, `C_API`) are `BLOCKED`; connectivity (`C_CONN`, `C_ROAM`) is
`BLOCKED`; hosting, storage, support and billing are `OPEN`. `C_sub` therefore has no value, and neither
does any renewal, churn, payback or lifetime figure derived from it.

### 2.3 Observed context, not a cost

- A competitor publishes a monitoring service plan at USD 225/year or USD 22/month including LTE-M
  connectivity (`SRC-ECO-005`). This establishes that such a service is sold as a paid plan in the US at
  that gross price; it says nothing about EMBARCARTE's connectivity, hosting or support cost.
- Consumer forecast subscriptions are listed from USD 29 to USD 499/year with local tax added at checkout
  (`SRC-CMP-003`; repository batch-03). This establishes a crowded consumer band, not a MAREA price point.
- Workstream B's observation file records the same forecast tiers and fleet price bands with explicit tax
  basis (`OBS-CMP-030` to `OBS-CMP-032`, `OBS-CMP-034` to `OBS-CMP-039`). It confirms the market shape and
  changes no verdict; those are competitor asks, not MAREA revenue, cost or willingness to pay.
- No observed price discloses the provider's cost or margin. Extracting a cost from a retail price is a
  prohibited inference.

## 3. Distribution margin requirements

### 3.1 The missing instrument

No installer, distributor or partner terms exist (`M_INSTALLER`, `M_DISTRIBUTOR`, `M_PARTNER` all
`BLOCKED`; `m_chan` `BLOCKED`). No margin percentage is known, proposed or approved. The required trade
price cannot be derived without the cost base, and the cost base does not exist:

```text
Minimum trade price for a channel route (symbolic):
  T_min = (VC_HW + VC_SVC + M_CHAN + C_TARGET) x (1 + v_b2b)      v_b2b, M_CHAN, C_TARGET OPEN/BLOCKED
Consumer-route sanity condition:
  G >= (VC_HW + VC_SVC + M_CHAN + L_LIAB + CAC) x (1 + v)         all inputs OPEN/BLOCKED
```

### 3.2 What the observed service market implies

The retrieved rate card shows a marine contractor selling labour at EUR 90–105/hour VAT-inclusive, with
surcharges for out-of-hours (+50 %) and Sunday/holiday (+100 %), a two-hour minimum, EUR 0.63/km travel,
and major hardware billed separately at cost plus margin or owner-supplied (`SRC-ECO-001`). Two structural
conclusions follow, both about the *shape* of channel economics rather than any amount:

1. **Field labour is the channel's own priced service**, not a discount on hardware. A MAREA route that
   asks an installer to absorb installation into a hardware margin would be asking the partner to fund a
   service it currently bills by the hour.
2. **Warranty scope splits by supply route.** The same rate card warrants its installation but not
   owner-supplied equipment (`SRC-ECO-001`). Any MAREA warranty must therefore state who supplies and who
   warrants each line; that policy does not exist.

`M_CHAN` remains `BLOCKED`; no distribution margin requirement can be stated.

## 4. Installation labour exposure

Installation is the largest recurring unknown in the customer TCO (`MC09-CUSTOMER-TCO.md`). From the
business side, two exposures exist:

- **If a bundle headline is presented as installed**, the headline must fund labour that has never been
  measured. MC-08 prohibits "installation included" language precisely because no installation price exists.
- **If installation is quoted separately**, the customer bears a line whose price is unknown and whose
  scope (survey, cabling, adapters, commissioning, sea trial) may be larger than expected.

| Exposure | Observed reference | Status |
| --- | --- | --- |
| Standard-hour labour rate | EUR 90–105/hour, VAT-inclusive (Croatia, 2026) | Observed for one contractor; Spanish rate `UNKNOWN` |
| Minimum attendance | 2 hours billed | Observed |
| Out-of-hours / weekend premium | +50 % / +100 % | Observed |
| Travel | EUR 0.63/km, example round trips EUR 50–164 | Observed; distance-dependent |
| Measured hours per installation | none | `BLOCKED` |
| Rework, defect correction, second visit | none | `UNKNOWN`; not in any price hypothesis |

Scenario arithmetic (rate reference only, `SCENARIO_DERIVED`, not a cost):

```text
2-hour minimum x 105 EUR/hour  = 210 EUR
4 hours x 105 EUR/hour         = 420 EUR
8 hours x 105 EUR/hour         = 840 EUR
12 hours x 105 EUR/hour        = 1,260 EUR
Out-of-hours 4 hours x 157.50  = 630 EUR
Travel 100 km round trip x 0.63 = 63 EUR
```

These are the shapes a real quotation must cover. They are not measurements of a MAREA job and are not
entered into any margin calculation.

## 5. Hardware procurement dependence

No hardware has a bill of materials, supplier quotation, assembly or enclosure quote, certification
quotation or lifecycle statement (`BOM_*`, `ASSY_*`, `ENCL_*`, `MTEST_*`, `CERT_NRE_*`, `EOL_ALLOC_*` all
`BLOCKED`/`OPEN`). Consequences that can be stated without inventing a cost:

1. **The hardware hypothesis is not a cost.** EUR 349 for a HUB, EUR 249 for an AIS receiver or EUR 299 for
   a WATCH device says nothing about what EMBARCARTE would pay to procure, certify, test, package, ship,
   warrant and support those devices.
2. **Certification is an amortised NRE over a volume plan that does not exist.** CE/EMC/RED/LVD/GPSR/CRA/
   RoHS/WEEE conformity and translated documentation are `BLOCKED`; per-unit certification share is not
   computable.
3. **Single-source dependence is unverified.** No supplier has been selected, no MOQ or lead time is known,
   and no second source exists. The commercial risk of a supplier failure cannot be quantified.
4. **Observed retail prices of comparable hardware establish a category, not a procurement cost.** A
   Spanish retailer lists a 7-inch MFD at EUR 685.57 VAT-inclusive (`SRC-ECO-003`), but that price includes
   the retailer's margin and tax, and it is not a MAREA procurement quotation.

## 6. Warranty risk

Warranty reserve `r_warr` is `BLOCKED` because no reliability data, pilot installation or failure history
exists:

```text
L_WARR = r_warr x (BOM + ASSY + LOGI + SUP_HW)      r_warr BLOCKED
L_RET  = r_ret  x (order value + LOGI + refurb)     r_ret OPEN
L_LIAB = L_WARR + L_RET
```

Nothing in the retrieved evidence supplies a failure rate. The only warranty-related fact retrieved is a
scope boundary — a contractor warrants its installation but not owner-supplied hardware (`SRC-ECO-001`) —
which shows that the warranty question is a **policy split** before it is a cost. Consumer withdrawal and
refund rights are `OPEN` (consumer-law review), and a hardware-plus-subscription sale adds a recurring
service to a goods warranty; neither has a decided term, exclusion list or reserve.

## 7. Support burden

- `C_SUP_SVC` (tickets per unit, escalation, out-of-hours) is `OPEN`; no ticket data exists.
- `SUP_HW_*` (warranty-period support and RMA labour) is `OPEN`; no RMA process or rate exists.
- The WATCH subscription's included support, retention and device counts are `OPEN`, so a subscriber's
  support cost cannot be separated from the subscription hypothesis.
- The observed monitoring plan (USD 225/year, `SRC-ECO-005`) bundles connectivity, hosting and support into
  one customer price. It is evidence that the market sells a bundle; it is not evidence of the cost of any
  support element.

## 8. Software licensing and data cost

- **Charts and official data**: `chartRightsGranted = false`; `C_DATA_LIC` is `BLOCKED`. A chart card sold
  at EUR 145.10–214.67 (`SRC-ECO-003`) is a retail data carrier, not a licence to redistribute ENC data in a
  product. No licence price for EMBARCARTE exists.
- **Weather and marine data providers**: the repository records heterogeneous terms, including a free tier
  that is explicitly non-commercial and a free-of-charge EU marine data licence planned to run to 2028
  (`PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §5.2). None of that establishes a MAREA licence cost; the
  paid plan amounts were not retrievable.
- **Software maintenance and security**: `C_SW_MAINT`, `C_SEC` and `C_PROVISION` are `OPEN`; CRA-related
  maintenance obligations exist (`H-13`) and no estimate exists.
- Therefore no gross-margin statement for any software family is possible.

## 9. Connectivity and cloud cost

`C_CONN` and `C_ROAM` are `BLOCKED`; the WATCH hardware hypothesis explicitly excludes connectivity. Cloud
costs (`C_HOST`, `C_STORE_SVC`, `C_TELEM_F`, `C_NOTIF`) are `OPEN`/`BLOCKED`. The only observed connectivity
figure is a **customer price** for a competitor's bundled plan (USD 225/year, `SRC-ECO-005`); using it as a
cost would be a prohibited inference, and using it as a MAREA price would be a competitor-price anchor.
Per-vessel telemetry ingestion cost for FLEET is entirely unknown, so FLEET gross margin is unknown even
though a per-vessel retail rate exists.

## 10. Customer acquisition cost uncertainty

`CAC` is `OPEN`: no acquisition measurement, no channel referral agreement and no marketing experiment is
authorised (`advertisingExperiments = NOT_AUTHORIZED`). Without CAC:

```text
Payback (periods) = CAC / C_sub          both inputs unknown
LTV               = sum(C_sub, k = 1..n) - CAC      n OPEN, CHURN OPEN, CAC OPEN
```

No payback period, LTV, CAC or LTV/CAC ratio is stated in this milestone. Any such figure would be
fabricated.

## 11. Churn sensitivity (symbolic)

Retention is unobserved (`CHURN` `OPEN`). The formula shows why no lifetime value can be computed:

```text
Expected paying lifetime (geometric, constant churn):
  n = 1 / CHURN
Illustrative churn arithmetic (CHURN itself ASSUMED here only to show sensitivity):
  CHURN = 20 %/year -> n = 5.0 years
  CHURN = 30 %/year -> n = 3.3 years
  CHURN = 40 %/year -> n = 2.5 years

LTV per subscriber = C_sub x n - CAC
```

Because `C_sub` has no value (all its cost inputs are `OPEN`/`BLOCKED`) and `CAC` has no value, the
illustrative lifetimes do not produce an LTV. The sensitivity that matters is not the arithmetic — it is
that **a subscription whose cost to serve is unknown cannot be shown to be profitable at any churn rate.**

## 12. Conditional economics by subject

| Subject | Revenue-side status | Cost-side status | Verdict |
| --- | --- | --- | --- |
| NAV | EUR 99/149 per year, unapproved hypotheses | Chart licence, hosting, support, CAC all `BLOCKED`/`OPEN` | `PROFITABILITY_NOT_ESTABLISHED` |
| HUB | EUR 349/499, unapproved hypotheses | BOM, assembly, enclosure, certification, logistics `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| AIS | EUR 249/399, unapproved hypotheses | Receiver BOM, RF conformity, antenna inclusion, installation `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| PILOT | from EUR 1,290 quotation, not inclusive | Drive/actuator, labour, commissioning, sea trial, liability `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| SENSE | from EUR 99 entry, not attributable | Module BOM, calibration, installation `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| WATCH | EUR 299 + from EUR 9.90/month | Device BOM, modem, connectivity, cloud, support `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| DISPLAY | from EUR 699 | Frozen size, BOM, panel, certification, installation `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| WEATHER | EUR 49/89 per year | Provider rights, API cost, accuracy evidence `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| FLEET | from EUR 49/79 per vessel/month, VAT excluded | Onboarding, telemetry, support, security, DPA, CAC `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| START | EUR 499 historical hypothesis | Entire HUB and NAV cost base, installation, channel `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| CRUISE | EUR 1,399 historical hypothesis | Three hardware families, display, installation `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| SAIL | EUR 1,990 traceability only | PILOT installed scope, safety gate, SENSE-WIND `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| PROTECT | EUR 399 + subscription, not cost-justified | Kit price, installation, connectivity, support `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| COMPLETE | EUR 3,490 traceability only | Six device families, four modules, PILOT, installation `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |
| FLEET package | bespoke, no amount | Onboarding, migration, training, support, hardware `BLOCKED` | `PROFITABILITY_NOT_ESTABLISHED` |

## 13. What would change the verdict

The verdict can only change through evidence, not through analysis or negotiation. In order of blocking
severity:

1. written supplier RFQs and a frozen BOM per hardware family, with MOQ, lead time and lifecycle;
2. a written installer rate card and measured installation/commissioning hours on representative vessels;
3. written channel terms (installer and/or distributor margin, warranty handling, first-line support);
4. written connectivity/MVNO terms and a cloud/hosting quotation at named volumes;
5. written data-provider and chart licences with redistribution rights and prices;
6. a warranty policy with a measured failure rate or an explicit reserve decision;
7. acquisition measurement and a defined target contribution per unit/term;
8. a pricing decision by the named human authority that turns a hypothesis into an approved price.

Until items 1–8 exist, every unit-economics statement is conditional and
`PROFITABILITY_NOT_ESTABLISHED` applies. A later MC-10 customer-evidence programme may inform items 6–8,
but it cannot replace items 1–5, which are procurement and legal facts.

## 14. Integrity rules observed in this document

- No fabricated BOM, supplier quote, margin, CAC, labour rate, churn rate, subscriber count or WTP value.
- Every observed amount keeps its original currency and tax treatment; no conversion or net-price ranking.
- Observed competitor prices are used only as category context and are never treated as costs, margins,
  available prices or willingness to pay.
- Historical MAREA bundle and family figures are `HYPOTHESIS_UNAPPROVED`, never approved prices and never
  production costs.
- Unknown components are `UNKNOWN`, never zero; totals are `INCOMPLETE` and are not published.
- A hypothesis revision is not a cost movement; a difference between hypotheses is not a discount.
- `PROFITABILITY_NOT_ESTABLISHED` is the recorded verdict, not a failure of analysis: the missing inputs
  are external quotes, measurements and decisions that do not exist yet.

## 15. Sources

External observations (retrieved 2026-10-31; full records in `data/evidence-economics.json`):
`SRC-ECO-001` (Elektrohertz rate card), `SRC-ECO-002` (Digital Yacht ES interfaces), `SRC-ECO-003`
(Comptoir Nautique Vulcan 7R and accessories), `SRC-ECO-005` (Siren Marine service plan), `SRC-ECO-006`
(Digital Yacht AIS100 scope). Forecast subscription context is `SRC-CMP-003` in
`data/evidence-competitors.json`.

Repository context: `docs/marea/bundles/BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` §4.2–§5, §7, §9–§11;
`docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` §5, §11, §12;
`docs/marea/bundles/bundle-definitions.json`; `docs/marea/market-validation/data/governance-status.json`.
