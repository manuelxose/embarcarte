# MC-09 / D5 — Market sizing: transparent partial TAM / SAM / SOM

| Field | Value |
|---|---|
| Document ID | MC-09 / D5 / MC09-MARKET-SIZING |
| Workstream | A — Marine market analyst (`agent-a-market`) |
| Milestone | MC-09 |
| Date | 2026-10-31 |
| Status | `PARTIAL_MODEL_LOW_CONFIDENCE` — internal only, not a forecast |
| Machine-readable layer | `data/market-inputs.json` (inputs, derivations, scenarios, unknowns) |

## 1. What this model is, and what it is not

**It is** a bottom-up, fully traceable estimate of the annual addressable spend on
navigation, connectivity and monitoring electronics for recreational craft in
Spain and Portugal, with a narrower beachhead calculation for Galicia and
Northern Portugal, expressed as ranges with an explicit confidence label.

**It is not** a market forecast, a revenue projection, a business plan, or a
claim that MAREA will capture any share of anything. **No market-share
percentage is used anywhere.** The SOM is bounded by *delivery capacity*, which is
an assumption the programme controls, not by a share of the market.

**Why it is partial.** Two critical inputs are unavailable: the size of the
registered fleet (stock) rather than annual registrations, and the annual spend
per vessel. Both are recorded as missing facts (`UNAV-MKT-001`, `UNAV-MKT-005`).
The model therefore substitutes documented proxies and labelled `ASSUMED` bands,
and reports a wide range instead of a single number. A single number here would
be fabrication.

## 2. Definitions

| Term | Definition used here | Unit |
|---|---|---|
| **TAM** | Annual addressable spend on navigation / connectivity / monitoring electronics and related software by recreational craft owners and small operators in **Spain + Portugal**, for craft whose owners plausibly buy such equipment | EUR / year |
| **SAM** | The same spend restricted to the **Galicia + Northern Portugal** beachhead, where a Galician-based team can realistically sell and support | EUR / year |
| **SOM** | The number of installations MAREA could actually deliver in the **first 12 months**, bounded by installer capacity, and its value | installations and EUR |
| **Eligible vessel** | A craft for which fixed or semi-fixed helm electronics, AIS, monitoring or navigation software is economically sensible — in practice 6 m and above, excluding personal watercraft | vessel |

**Exclusions applied throughout:** personal watercraft (27.9% of 2025 Spanish
registrations, CLM-MKT-005); craft under 6 m (70% of registrations,
CLM-MKT-004), which are frequently trailered or dry-stored and are the weakest
fit for fixed installations; superyachts, which are a different channel; the
Mediterranean and Canary markets in the SAM (they remain inside the TAM); and
commercial shipping, fishing and passenger vessels, which are outside the
recreational scope of MAREA entirely.

## 3. Inputs

Full records with source, year, derivation and confidence are in
`data/market-inputs.json`. Summary of the inputs the model actually uses:

| Input | Value | Derivation | Confidence | Record |
|---|---:|---|---|---|
| Spanish recreational berths | 133,400 | OBSERVED (sector study) | MEDIUM | MKT-IN-025 |
| Portuguese registered recreational craft | 85,000 | OBSERVED (DGRM) | HIGH | MKT-IN-033 |
| Galician recreational berths | 10,500 | OBSERVED (regional tourism) | MEDIUM | MKT-IN-029 |
| Documented Northern Portugal berths | 1,088 | DERIVED (4 marinas) | MEDIUM | MKT-IN-036 |
| Rías Baixas berths | 4,600 | OBSERVED (floor) | MEDIUM | MKT-IN-031 |
| 2025 Spanish new registrations | 4,992 | OBSERVED | HIGH | MKT-IN-001 |
| 2025 registrations 6 m and above | 1,500 | DERIVED | HIGH | MKT-IN-013 |
| 2025 coastal Galician registrations | 465 | DERIVED | HIGH | MKT-IN-015 |
| Eligible share of the base | 0.35 / 0.50 / 0.65 | **ASSUMED** | LOW | MKT-IN-039/040/041 |
| Software spend per eligible vessel | EUR 35 / 149 | **ASSUMED** | LOW | MKT-IN-042/043 |
| Annualised hardware spend per vessel | EUR 40 / 60 | **ASSUMED** | LOW | MKT-IN-044/045 |
| Annual addressable spend per vessel | EUR 75 / 142 / 209 | DERIVED | LOW | MKT-IN-046/047/048 |

### 3.1 Why the base is a proxy and must be read as one

133,400 Spanish **berths** and 85,000 Portuguese **registered craft** are not the
same thing (MKT-IN-037). The Spanish number excludes trailer-launched and
dry-stored craft and includes transient berths; the Portuguese number includes
craft that may never go to sea. Adding them is defensible only as an
order-of-magnitude base, and the result is labelled LOW confidence precisely for
this reason. A true fleet count for Spain does not exist in this evidence set
(`UNAV-MKT-001`).

### 3.2 Why the eligible share is a band

There is no published length distribution of *moored* craft — only of *new
registrations*, where 70% are under 6 m. Berths skew larger than registrations
because small craft are often kept on trailers, but nothing in the evidence set
quantifies by how much. The band 0.35–0.65 is the honest consequence
(`UNK-MKT-002`).

### 3.3 Why the spend band is anchored to published price points

The LOW and HIGH spend figures are anchored to **published consumer price
points** recorded by the programme's benchmark work on 2026-10-30 — a regional
chart subscription at the bottom of the software band, a premium subscription at
the top, a gateway-class retail price and a receiver-class retail price for the
hardware component, each annualised over an assumed six-year replacement cycle.
They are **anchors, not measured averages**: no source in this evidence set
reports what a European boat owner actually spends per year, and the six-year
cycle is an assumption (`UNAV-MKT-005`).

## 4. Model and results

### 4.1 Formulas

```
eligible_vessels(scenario)  = base_units            x eligible_share(scenario)
annual_spend(scenario)      = eligible_vessels      x per_vessel_spend(scenario)
TAM / SAM (scenario)        = annual_spend(scenario)
SOM_units(scenario)         = installers x installs_per_month x 12
SOM_value(scenario)         = SOM_units x year1_basket(scenario)
```

Every multiplication below can be reproduced from `market-inputs.json` with no
other data.

### 4.2 TAM — Spain + Portugal

Base: 218,400 units (MKT-IN-037).

| Scenario | Eligible share | Eligible vessels | Spend / vessel | TAM / year |
|---|---:|---:|---:|---:|
| LOW | 0.35 | 76,440 | EUR 75 | **≈ EUR 5.7M** |
| MID | 0.50 | 109,200 | EUR 142 | **≈ EUR 15.5M** |
| HIGH | 0.65 | 141,960 | EUR 209 | **≈ EUR 29.7M** |

Reading: the annual addressable electronics pool for the whole of Spain and
Portugal is plausibly of the order of **EUR 6–30 million a year**, with the
midpoint around EUR 15M. That is not a large market by software standards, and
the range is five times wide because spend per vessel is unknown.

### 4.3 SAM — Galicia + Northern Portugal

Base: 11,588 documented berths (10,500 + 1,088; MKT-IN-038). It excludes every
Portuguese port without a retrieved berth count, so it is a floor.

| Scenario | Eligible share | Eligible berths | Spend / vessel | SAM / year |
|---|---:|---:|---:|---:|
| LOW | 0.35 | 4,056 | EUR 75 | **≈ EUR 0.30M** |
| MID | 0.50 | 5,794 | EUR 142 | **≈ EUR 0.82M** |
| HIGH | 0.65 | 7,532 | EUR 209 | **≈ EUR 1.57M** |

### 4.4 Rías Baixas sub-SAM

Base: 4,600 berths (MKT-IN-031).

| Scenario | Eligible berths | Spend / vessel | Sub-SAM / year |
|---|---:|---:|---:|
| LOW | 1,610 | EUR 75 | ≈ EUR 121k |
| MID | 2,300 | EUR 142 | ≈ EUR 327k |
| HIGH | 2,990 | EUR 209 | ≈ EUR 625k |

**The uncomfortable conclusion, stated plainly.** The entire annual addressable
electronics spend of the winning region is plausibly under EUR 0.6M a year, and
under EUR 1.6M for all of Galicia plus documented Northern Portugal. A business
cannot be built on capturing a hypothetical share of that; it can only be built
on measured attachment, defensible pricing and either a wider geography, a
multi-vessel commercial segment, or both.

## 5. Annual flow model — new-build and first-fit demand

A second, independent view uses the **new-registration flow** rather than the
installed base. This is the cleanest OBSERVED input in the whole model
(MKT-IN-015, MKT-IN-001).

| Geography | New registrations 2025 | Of which 6 m+ (national ratio 30.0%) | One-off hardware pool at EUR 240–659 |
|---|---:|---:|---:|
| Spain | 4,992 | ≈ 1,500 observed exactly | ≈ EUR 0.36M – 0.99M |
| Galicia (3 coastal provinces) | 465 | ≈ 140 | ≈ EUR 34k – 92k |

The Galician column is a cross-application of the national length ratio to a
regional flow — a `DERIVED` figure, not an observation, and it is labelled as
such. It exists to show the order of magnitude of the annual new-fit opportunity:
**tens of thousands of euros, not millions**, in the beachhead.

A third view, in `market-inputs.json` MKT-IN-056, applies the 6 m+ assumption
differently and produces ≈ EUR 39k–199k for Galicia; the difference between the
two Galician figures is itself a useful warning about how much the answer depends
on an assumed length mix.

## 6. SOM — capacity-bounded, not share-based

MAREA has no measured installer network (`UNAV-MKT-006`). The SOM is therefore
built from a **planning assumption about delivery capacity**, declared as
`ASSUMED` and explicitly not a finding:

```
SOM_units = installers x installations_per_month x 12
          = (1 / 2 / 3) x (2 / 3 / 4) x 12
          = 24 / 72 / 144 installations
```

Year-1 value per installation combines one hardware basket and one annual
software subscription, using the same published price anchors:
LOW EUR 275, MID EUR 542, HIGH EUR 808.

| Scenario | Installations, year 1 | Value per installation | SOM value, year 1 |
|---|---:|---:|---:|
| LOW | 24 | EUR 275 | ≈ EUR 6,600 |
| MID | 72 | EUR 542 | ≈ EUR 39,000 |
| HIGH | 144 | EUR 808 | ≈ EUR 116,000 |

Interpretation: a credible first year in the winning region is **tens of
thousands of euros of revenue**, not hundreds of thousands. This is a capacity
statement, not a demand ceiling — demand could be higher and still undelivered.
It also means hardware in one Galician region cannot fund the programme: the
FLEET/commercial recurring path and a wider geography carry that burden, and both
are unvalidated.

## 7. What is deliberately excluded

| Excluded | Why |
|---|---|
| Personal watercraft | 27.9% of registrations; no helm electronics fit (CLM-MKT-005) |
| Craft under 6 m | Weak fit for fixed electronics; frequently trailered (CLM-MKT-004) |
| Mediterranean and Canary Islands (from SAM) | Distance and channel; still inside TAM |
| Superyachts and commercial shipping | Different channel, different regulation |
| Chart-data licensing revenue | Rights not cleared (governance status); excluded by contract |
| Installation labour revenue | Not observable; installer economics belong to Workstream D |
| Any penetration or share figure | Prohibited by the research scope |

## 8. What would move the numbers, and by how much

| Change | Effect | Why |
|---|---|---|
| Replace the berth proxy with a real Spanish fleet count | Could move TAM by tens of percent either way | The base is currently the least comparable input |
| Measure spend per vessel | Narrows a 5× range to something usable | Spend is the dominant uncertainty |
| Narrow eligible share with a real berth length distribution | Narrows the 3.4× eligible-vessel range | 0.35–0.65 is a guess bounded by national registration data |
| Add Portuguese marinas with published berth counts | Raises the SAM floor | The 1,088 figure is a documented minimum |
| Measure installer capacity | Replaces the SOM assumption with a fact | SOM is currently planning-only |

## 9. Confidence and permitted use

- **Overall: LOW.** Two of the four primary inputs in every projection are
  `ASSUMED`, and the base mixes two incompatible proxies.
- **Permitted uses:** internal prioritisation, sanity-checking whether a market is
  large enough to be worth a pilot, framing MC-10 questions, challenging
  unsupported revenue claims.
- **Prohibited uses:** publication, investor material, pricing decisions, any
  statement that MAREA "addresses an X million euro market", any revenue forecast.
- **A PASS of this milestone does not validate these numbers.** They are a
  structured statement of uncertainty, not a measurement.

## 10. Reproducibility

Every number in this document is generated from `data/market-inputs.json` records
MKT-IN-001 to MKT-IN-065. The formulas in §4.1 use only those records. The three
scenarios are defined once in that file's `scenarios` object and applied
identically to every vessel-based figure, so any input change can be propagated
without re-deriving the method.

## 11. Open questions for MC-10

1. What is the actual length and age distribution of craft moored in Rías Baixas?
2. What did owners of 6–16 m craft spend on electronics in the last 24 months?
3. How many qualified installers exist within 50 km of Vigo, and what is their
   monthly installation capacity?
4. How many vessels are in the Galician charter/rental fleet, and who buys their
   electronics?
5. What share of the 85,000 Portuguese registered craft are active and moored in
   the north?
