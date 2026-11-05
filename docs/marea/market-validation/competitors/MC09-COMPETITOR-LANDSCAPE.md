# MC-09 Workstream B — Competitor landscape

| Field | Value |
| --- | --- |
| Document | MC-09 / B — competitor and substitute landscape |
| Milestone | MC-09 (market, competitive and customer validation) |
| Date | 2026-10-31 |
| Author | agent-b-competitors (Competitive Intelligence Specialist) |
| Status | `INTERNAL_RESEARCH_ONLY` — no claim here authorises a price, a compatibility statement or a sale |
| Evidence data | `data/evidence-competitors.json`, `data/competitor-observations.json`, `data/price-observations.json` |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` |

## 1. What this document does

It identifies the real, currently observable products and services that a MAREA buyer
could choose instead, tests whether each one is genuinely in the same category as a
MAREA family, and records where the comparison is weak. It does **not** size a market,
predict competitor behaviour, or establish willingness to pay. All nine MAREA families
are `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY` and every MAREA price remains a
`HYPOTHESIS_UNAPPROVED`.

## 2. Evidence discipline

- Every observation was captured on `2026-10-31` from a page that was actually
  retrieved in this session (`capturedAt = lastVerifiedAt = 2026-10-31`).
- Prices keep their original currency and the tax treatment printed on the page.
  No currency conversion is performed anywhere; derived figures are separated into
  `MODEL_DERIVED` price records.
- Manufacturer list price, manufacturer-store offer, retailer offer, promotional
  price, from-price and secondary-reported price are different evidence types and are
  labelled as such in `price-observations.json`.
- Where the page did not state VAT, the record says `NOT_STATED`/`UNKNOWN` instead of
  assuming the Spanish consumer-inclusive convention.
- Where a page was inaccessible, the source is recorded with status `INACCESSIBLE` and
  no price is guessed.
- Short extracts and factual statements only; no page content is copied.

## 3. Category-match test (why a vendor counts, or does not)

A company is not a competitor because it operates in the same industry. The test used
here is: *does the observed product deliver the customer outcome that the MAREA family
defines, at a comparable scope and buyer?*

| Vendor / product | MAREA family | Match | Justification |
| --- | --- | --- | --- |
| Orca app + Core + Display | NAV, DISPLAY, HUB | **Strong** | Software plus onboard data integration and a marine display: the closest single-vendor analogue to the NAV+HUB+DISPLAY combination. |
| Garmin Navionics app | NAV | **Strong (software only)** | Chart/routing software subscription; no onboard gateway, no hardware. |
| PredictWind | WEATHER, HUB, FLEET context | **Strong for WEATHER, partial for HUB** | Weather subscription and routing; DataHub adds NMEA 2000 streaming and remote access but is a connectivity device, not a navigation platform. |
| Windy Premium | WEATHER | **Partial** | Weather routing only, over a plain map; no nautical charts. |
| Digital Yacht | HUB, AIS | **Strong for gateways and receive-only AIS** | NavLink2/iKonvert are genuine gateway comparables; AIS100 is a genuine receive-only AIS receiver. The AIS packs are transmit-capable transponders and are a different regulatory product. |
| Yacht Devices, Actisense, Maretron | HUB, SENSE | **Strong in principle, unverified this session** | Established NMEA 2000 gateway/sensor vendors; no current price was retrievable in this capture, so no observation is recorded (see §7). |
| Victron Energy | HUB, SENSE, WATCH | **Partial, and under-rated as a threat** | Cerbo GX plus SmartShunt plus the VRM portal delivers onboard data consolidation, monitoring inputs and remote visibility at component prices. It is not a navigation product and not a marine-chart system, but it competes directly for the integration and monitoring budget. |
| Raymarine | DISPLAY, PILOT | **Strong** | Chartplotters and autopilot systems are the incumbent hardware alternatives to DISPLAY and PILOT. |
| Simrad | PILOT | **Strong** | Autopilot processors and packs at comparable scope. |
| B&G | SENSE, DISPLAY | **Strong** | Wind/instrument packs are the direct measurement alternative to SENSE-WIND. |
| Siren Marine, ArmIt, Yacht Sentinel | WATCH | **Strong for WATCH** | Cellular hardware plus monitoring subscription is exactly the WATCH outcome; Siren is US-centric, Yacht Sentinel is the closest European example but its current availability could not be verified. |
| Orca guard mode | WATCH | **Partial** | Anchor alarm and basic battery monitoring inside a navigation subscription; no bilge/entry sensors and no cellular service. |
| Full Ahead Maritime, UOC, Seafarers.pro | FLEET | **Weak-to-partial** | These are commercial-shipping technical-management or crew platforms. They compete for the same "fleet oversight" budget only in the narrow sense of multi-vessel records; they do not provide recreational telemetry, and MAREA FLEET is not a shipping ERP. |
| Local installers (e.g. VigoSonar) | PILOT, COMPLETE | **Channel, not product** | A credible installer/distributor is a route to market and an installation benchmark, not a product comparator; no partnership is claimed. |

## 4. Observed landscape by family

Counts are family tags across 48 observations (a product can serve more than one
family): NAV 8, HUB 10, AIS 7, PILOT 7, SENSE 8, WATCH 11, DISPLAY 9, WEATHER 6,
FLEET 9. Bundle-specific observations: 9.

| Family | What is actually on the market (2026-10-31) | Price signal (as observed) |
| --- | --- | --- |
| NAV | Orca Plus/Smart Navigation; Garmin Navionics app; no Savvy Navvy verification | Orca EUR 49 and EUR 149 per year; Navionics reported EUR 49.99-149.99 in-app range |
| HUB | Digital Yacht NavLink2 and iKonvert; Victron Cerbo GX; PredictWind DataHub | EUR 240-300 for gateways (tax treatment partly unstated); EUR 240.09 incl. VAT Cerbo; USD 299-599 DataHub |
| AIS | Digital Yacht AIS100 (receive-only); three transmit-capable transponder packs | EUR 360 receive-only; EUR 1,620-2,100 transponder packs |
| PILOT | Raymarine EV-100 Wheel; Simrad NAC-2/NAC-3 processors and packs | EUR 2,050 retail incl. VAT; EUR 1,217-3,083 manufacturer incl. VAT, several out of stock |
| SENSE | Victron SmartShunt; B&G WS310 wind vane; B&G Triton2 pack | EUR 90.21 incl. VAT (power); EUR 489.95 wind vane; EUR 1,149.40 incl. tax instrument pack |
| WATCH | Siren 3/3 Pro; ArmIt; Yacht Sentinel YS Pro (unconfirmed); Orca guard mode | USD 229.99-799.99 hardware + USD 100-225/yr; EUR 1,590 ex-VAT + EUR 240/yr |
| DISPLAY | Raymarine Element 7/9/12 HV; Orca Display 2 | EUR 659.45 / 901.45 / 1,506.45 incl. VAT; EUR 999 incl. VAT |
| WEATHER | PredictWind Basic/Standard/Professional; Windy Premium; Orca weather tiers | USD 29/249/499 per year (tax-exclusive list); EUR 19 per year; Orca weather inside EUR 49/149 |
| FLEET | Full Ahead (EUR 1,490/yr up to 5 ships); UOC (EUR 259/vessel/month); Seafarers.pro (EUR 150-360/vessel/month) | A 10x spread per vessel-month, driven by segment, not by feature parity |

## 5. Competitive structure findings

1. **Navigation software is cheap and bundled.** EUR 49-149 per year buys charts,
   routing and weather in one app, and hardware purchases often include a year of the
   top tier. MAREA NAV cannot win on "having a chart" or "having weather".
2. **Gateways are commodity hardware.** A working gateway costs EUR 240-300, tax
   treatment aside. A HUB priced at EUR 349-499 has to prove orchestration,
   diagnostics, supported-device breadth and support — not connectivity.
3. **The AIS name is overloaded.** Receive-only and transmit-capable products are
   advertised under the same word. A EUR 249-399 receive-only AIS is defensible only
   against receive-only comparables (EUR 360 observed), never against transponder
   prices (EUR 1,620+).
4. **Autopilot is the highest-ticket, highest-risk category observed.** Complete
   branded packs are EUR 2,050-3,083 incl. VAT before installation, and several
   manufacturer listings are out of stock or discontinued. Any MAREA PILOT price below
   that band is a hypothesis with a serious cost-evidence gap, and PILOT remains
   safety-gated regardless of price.
5. **Victron is the quiet integrator.** Cerbo GX (EUR 240.09 incl. VAT) plus SmartShunt
   (EUR 90.21 incl. VAT) gives consolidation, monitoring inputs and a remote portal at
   a component price that undercuts any dedicated "monitoring hub" positioning.
6. **Monitoring subscriptions are the real WATCH market.** Hardware of
   EUR 230-1,590 plus EUR 100-240 per year is the observed pattern. A MAREA WATCH
   subscription "from EUR 9.90/month" (EUR 118.80/year) is at the low end of the
   observed service range and has no cost evidence yet.
7. **"Fleet" is at least two markets.** Commercial technical-management SaaS
   (EUR 150-360 per vessel-month, or EUR 1,490/year for five ships) is not the same
   buyer as a marina/charter operator wanting telemetry. MAREA FLEET must pick one and
   say which.
8. **No competitor bundles the way MAREA intends.** Every complete-solution total in
   this workstream is a composition of separately sold parts (see
   `MC09-BUNDLE-BENCHMARKS.md`); installation and commissioning are almost always
   unpriced. That is a possible differentiation, not yet a proven advantage.

## 6. What this evidence cannot establish

- It cannot establish willingness to pay. No customer was interviewed or observed
  purchasing (outreach is not authorised in MC-09).
- It cannot establish installed cost. Installation, commissioning, antennas, cabling,
  surveys and sea trials are excluded from almost every observed price.
- It cannot establish competitor margin, cost structure, discount practice or
  negotiation room.
- It cannot establish market share or market size. Observed prices are not volumes.
- It cannot establish that any competitor product is certified, approved or
  compliant with a given standard; certification claims are out of scope here.
- It cannot establish EUR equivalents for USD listings. No conversion is applied.

## 7. Source reliability and inaccessible sources

| Status | Sources |
| --- | --- |
| `OK`, primary official | Orca help, PredictWind pricing, PredictWind DataHub, Digital Yacht product pages, Full Ahead, UOC, Seafarers.pro, Raymarine ES, Simrad ES |
| `OK`, primary retailer | Digital Yacht Spanish shop, La Tienda del Navegante, CuencaSolar, Comptoir Nautique |
| `OK`, secondary independent (lower weight) | YACHT Orca test, YACHT Windy test, SmartBoats.org, TuAppPara |
| `INACCESSIBLE` (no price recorded) | Garmin Navionics support FAQ (rendered empty), em-trak B100 retailer page (404), Garmin gWind Regata retailer page (404), Siren Marine storefront (JavaScript only), yachtsentinel.com/pricing (parked domain), savvynavvy.com/pricing (parked domain), windy.com/premium (no retrievable price text) |

Consequences: Savvy Navvy is not assessed; Garmin Navionics has no verified official
EUR price; em-trak and gWind are absent from the price register; Siren and Yacht
Sentinel prices rest on one secondary editorial source; Yacht Sentinel's current
availability is explicitly `UNCONFIRMED`.

## 8. Traceability

- Sources: `SRC-CMP-001` … `SRC-CMP-027`.
- Claims: `CLM-CMP-001` … `CLM-CMP-032`.
- Observations: `OBS-CMP-001` … `OBS-CMP-048`.
- Prices: `PRC-CMP-001` … `PRC-CMP-056` (48 observed records, 8 `MODEL_DERIVED`).
- Per-family benchmark detail: `MC09-PRODUCT-BENCHMARKS.md`.
- Bundle comparisons: `MC09-BUNDLE-BENCHMARKS.md`.
- Price register: `MC09-COMPETITOR-PRICING.md`.
