# MC-09 Workstream B — Bundle benchmarks (six bundles)

| Field | Value |
| --- | --- |
| Document | MC-09 / B — complete-solution bundle comparisons |
| Date | 2026-10-31 |
| Author | agent-b-competitors |
| Status | `INTERNAL_RESEARCH_ONLY`; every MAREA bundle price is an unapproved hypothesis and SAIL/COMPLETE remain `BLOCKED` |
| Evidence | `data/competitor-observations.json` (`OBS-CMP-040` … `OBS-CMP-048`), `data/price-observations.json` (`PRC-CMP-049` … `PRC-CMP-056`) |

## Method and the central caveat

No observed competitor sells a single installed, commissioned package that matches a
MAREA bundle. The comparisons below are therefore **compositions of separately sold
components** at observed prices, labelled `MODEL_DERIVED`. They are not competitor
quotes, they exclude installation and commissioning unless stated, and they mix tax
bases where the component pages state different bases. They exist to show the price
floor and the scope a MAREA bundle would be judged against — nothing more.

MAREA bundle compositions are taken from `docs/marea/bundles/BUNDLE-ARCHITECTURE.md`
(line 128 onwards) and are frozen; this document does not redefine them.

| Bundle | MAREA composition (frozen) | MAREA hypothesis (traceability) | Status |
| --- | --- | --- | --- |
| START | HUB-STANDARD + NAV-PRO | EUR 499 | DEFINED, NOT_FOR_SALE |
| CRUISE | NAV-ESSENTIAL + HUB-STANDARD + AIS-RECEIVER + DISPLAY-7 | EUR 1,399 | DEFINED, NOT_FOR_SALE |
| SAIL | NAV-PRO + HUB-STANDARD + PILOT-COASTAL + SENSE-WIND | EUR 1,990 recorded, not a valid installed price | BLOCKED (PILOT safety gate) |
| PROTECT | WATCH-CORE + SENSE-ESSENTIALS | EUR 399 + subscription, not cost-justified | DEFINED, NOT_FOR_SALE |
| COMPLETE | NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + four SENSE modules + PILOT-COASTAL | EUR 3,490 recorded, not a turnkey price | BLOCKED (multiple subsystem gates) |
| FLEET | FLEET SaaS + onboarding + registration/migration + training + support, hardware optional | bespoke | DEFINED, NOT_FOR_SALE |

## START — modern navigation on existing instruments

| Alternative solution | Components and observed prices | Year-one total | Basis |
| --- | --- | --- | --- |
| Orca Core 2 + Orca Plus | Core 2 EUR 649 (secondary, VAT incl.; includes one year of Smart Navigation, SRC-CMP-001) + Plus EUR 49/yr from year two (tax unstated) | **EUR 649 year one; EUR 698 from year two** | `MODEL_DERIVED` (PRC-CMP-049) |
| Orca app only (no onboard data) | Plus EUR 49/yr | EUR 49 | observed, OBS-CMP-001 |
| Garmin Navionics app | reported EUR 49.99-149.99 per item | range, not a single price | secondary, OBS-CMP-003 |

**Reading.** The closest complete START-equivalent (existing instruments made visible in
modern navigation, locally) is roughly EUR 649 in year one at observed prices (a year of
Smart Navigation is included with the Core 2; EUR 698 from year two) — about EUR 150 above
the MAREA START hypothesis of EUR 499. The margin is plausible only if the
HUB hardware and installer-assisted configuration are genuinely included and supported;
if START is software-only with a cheap gateway, EUR 499 is credible.

**Gaps.** The Core 2 price is secondary and test-time; the Orca subscription tax basis is
unstated; no installation or commissioning is included; no local support contract exists
in the composition. Demand for "modern navigation without replacing instruments" is not
measured.

## CRUISE — integrated helm display, AIS and connectivity

| Alternative solution | Components and observed prices | Total | Basis |
| --- | --- | --- | --- |
| Orca complete package | Display 2 EUR 999 + Core 2 EUR 649 + mount EUR 349 = EUR 1,997 (VAT incl. DE) + one year Smart Navigation included | **EUR 1,997** | secondary observed (OBS-CMP-041 / PRC-CMP-026) |
| Raymarine + Digital Yacht composition | Element 7 HV EUR 659.45 (VAT incl.) + AIS100 EUR 360 (tax unstated) + NavLink2 EUR 300 (tax unstated) | **EUR 1,319.45** | `MODEL_DERIVED` (PRC-CMP-050) |

**Reading.** The two alternatives bracket the MAREA CRUISE hypothesis of EUR 1,399 from
opposite directions. The Raymarine/Digital Yacht composition is cheaper on parts but
lacks a navigation app subscription, charts beyond base and installation; the Orca
package is a genuine single-vendor integrated solution including one year of the top
subscription. MAREA CRUISE at EUR 1,399 sits between them and is only defensible if the
installed solution includes configuration, integration and support.

**Gaps.** AIS in the Orca package is over-the-internet (MarineTraffic) or requires an
onboard receiver — a receive-only AIS receiver is not part of the EUR 1,997. Neither
composition includes antenna work, installation or commissioning. No observation prices
a Raymarine 7-inch display with a chart entitlement and a NAV app subscription together.

## SAIL — integrated sailing helm with supervised steering

| Alternative solution | Components and observed prices | Total | Basis |
| --- | --- | --- | --- |
| Raymarine/B&G composition | EV-100 Wheel EUR 2,050 incl. VAT + Element 7 HV EUR 659.45 incl. VAT + B&G WS310 EUR 489.95 + NavLink2 EUR 300 | **EUR 3,499.40** | `MODEL_DERIVED` (PRC-CMP-051) |
| Simrad pack reference (parts only) | NAC-3 basic pack EUR 3,083.08 incl. VAT | EUR 3,083.08 | observed, out-of-stock flag (OBS-CMP-017) |

**Reading.** A sailing solution with steering, display and wind measurement starts at
roughly EUR 3,100-3,500 in parts at observed prices, before a wind display, installation,
survey, commissioning or sea trial. The MAREA SAIL hypothesis of EUR 1,990 is recorded
in the bundle architecture as "not a valid full installed price", and this evidence
supports that: the figure is far below the observed parts floor for an equivalent scope.

**Gaps.** The wind vane has no display surface in the composition (an additional
instrument display is missing), the brands are mixed, and the autopilot is on backorder.
No observation establishes installer labour, vessel survey or sea-trial cost. SAIL is
`BLOCKED` by the PILOT safety gate; no bundle price can be validated while that gate is
open, and no comparison here substitutes for safety evidence.

## PROTECT — shore-side awareness of an unattended boat

| Alternative solution | Components and observed prices | Year-one total | Basis |
| --- | --- | --- | --- |
| Yacht Sentinel YS Pro | EUR 1,590 ex-VAT hardware + EUR 240/yr service | **EUR 1,830 ex-VAT** | `MODEL_DERIVED` (PRC-CMP-054); availability unconfirmed |
| Siren 3 + one high-water sensor | USD 299.99 + USD 225/yr + USD 139.09 sensor | **USD 664.08** | `MODEL_DERIVED` (PRC-CMP-053) |
| ArmIt BilgeMAX One | USD 229.99 kit + USD 100/yr | USD 329.99 year one (arithmetic) | secondary reported components |
| Orca guard mode | EUR 649 Core 2 (one year of Smart Navigation included) + EUR 149/yr Smart Navigation from year two | EUR 649 year one; EUR 798 from year two (arithmetic) | secondary reported hardware; partial capability |

**Reading.** A genuine bilge-and-power monitoring solution costs USD 330-664 in year one
(US) or EUR 1,830 excluding VAT (European, availability unconfirmed). The MAREA PROTECT
hypothesis (EUR 399 plus subscription, itself recorded as not cost-justified) is below
the European observed hardware alone. If PROTECT is meant to include WATCH hardware, a
SIM/service cost and SENSE-POWER plus SENSE-BILGE modules, the EUR 399 figure has no
visible cost basis in this evidence.

**Gaps.** The European alternative's vendor domain was parked on capture date, so its
availability is unconfirmed and its price is secondary. Sensors, installation and VAT
are excluded from several totals. Alert-delivery reliability is not established for any
alternative, and no MAREA claim may imply that delivery is assured.

## COMPLETE — coordinated professional integration

| Alternative solution | Components and observed prices | Total | Basis |
| --- | --- | --- | --- |
| Multi-brand composition | Element 7 HV EUR 659.45 + EV-100 EUR 2,050 + WS310 EUR 489.95 + AIS100 EUR 360 + Cerbo GX EUR 240.09 | **EUR 3,799.49** | `MODEL_DERIVED` (PRC-CMP-052) |
| Orca integrated core | Display 2 + Core 2 + mount EUR 1,997 incl. VAT, plus autopilot/AIS/monitoring extras | EUR 1,997 + extras | secondary observed partial |

**Reading.** The parts floor for a coordinated navigation, steering, AIS, wind and
monitoring composition is about EUR 3,800 at observed prices, excluding bilge, tank and
environment sensors, monitoring subscription, professional installation, commissioning
and any integration warranty. The MAREA COMPLETE hypothesis of EUR 3,490 is recorded as
"not a valid turnkey price"; this evidence shows why. A turnkey price cannot be
established from parts prices, and COMPLETE remains `BLOCKED` by multiple subsystem gates.

**Gaps.** No single vendor offers this whole scope; the composition mixes five brands and
tax bases; installation, engineering time, sensors and support are missing. There is no
observed turnkey quote from any integrator, so the actual market price of a comparable
project is UNKNOWN.

## FLEET — multi-vessel operations package

| Alternative solution | Components and observed prices | Total | Basis |
| --- | --- | --- | --- |
| Full Ahead Vessel (SaaS only) | EUR 1,490/year up to 5 ships; onboarding, hardware and installation unpriced/absent | **EUR 1,490/yr** | observed (OBS-CMP-047 / PRC-CMP-047) |
| UOC two-vessel annual (SaaS only) | EUR 4,900/year for two vessels; onboarding included as service | **EUR 4,900/yr** | observed (OBS-CMP-048 / PRC-CMP-048) |
| Seafarers.pro Professional (SaaS only) | EUR 240 per vessel-month (EUR 2,880/vessel/year) | arithmetic | observed component (OBS-CMP-038) |

**Reading.** A fleet package in this market is priced as SaaS by fleet size or per vessel,
with onboarding and support inside the service, and with no hardware, installation or
telemetry. Full Ahead's EUR 24.83 per vessel-month (derived from EUR 1,490/year for five
ships) and UOC's EUR 204.17 per vessel-month (derived from EUR 4,900/year for two vessels)
show how much the segment assumption moves the number. The MAREA FLEET package is
bespoke, and no comparable bespoke quote was observed.

**Gaps.** The observed vendors are commercial-shipping oriented; they do not include the
recreational telemetry, WATCH devices, connectivity or installation that MAREA FLEET may
bundle. Onboarding cost, minimum term, VAT and SLA terms are partially unpublished.
What a marina or charter operator actually pays for multi-vessel oversight is UNKNOWN
from desk research.

## Bundle-level conclusions

1. Complete-solution parts floors at observed prices are roughly: START EUR 649 year one
   (EUR 698 from year two),
   CRUISE EUR 1,319-1,997, SAIL EUR 3,499, PROTECT EUR 1,830 ex-VAT (EU) or
   USD 330-664 (US), COMPLETE EUR 3,799, FLEET EUR 1,490-4,900 per year.
2. Installation, commissioning, survey, antenna work and support are absent from almost
   every observed price; a "complete solution" comparison is therefore a floor, not a
   market price.
3. The MAREA hypotheses for SAIL (EUR 1,990) and COMPLETE (EUR 3,490) are already
   recorded as non-valid installed prices; the evidence here supports that status and
   provides no basis to raise them to a valid turnkey figure.
4. PROTECT's EUR 399 hardware hypothesis is below the observed European hardware alone;
   it needs either a scope reduction or a cost case.
5. START and CRUISE hypotheses sit within the observed range and can be tested with
   real quotes; FLEET cannot be compared to commercial ERP pricing at all without a
   segment decision.
