# MC-20 — Technical facts, limitations and evidence classes

## 1. Policy

Every rendered statement carries an evidence class and one or more canonical source references.
Unknown values are rendered as unknown or unavailable; nothing is inferred, averaged or filled in.
The validator rejects a block without an evidence class or with a non-existent source file.

| Evidence class | Meaning | Used for |
| --- | --- | --- |
| `VERIFIED_REPO` | Recorded in a repository dataset or document | identity, lifecycle, gates, bundle composition |
| `VERIFIED_EXTERNAL` | External source recorded in MC-02/MC-09 | market and standards context |
| `ASSUMPTION` | Documented assumption | intended customer/segment |
| `HYPOTHESIS` | Unapproved commercial hypothesis | edition packaging, pricing hypotheses |
| `OPEN` | Insufficient evidence today | compatibility, integration, measurement |
| `BLOCKED` | External dependency prevents the claim | AIS decoder licence, conformity |

## 2. Per-family facts

### NAV (software)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | Software | MC-16 `product-families.json` |
| Lifecycle | `DEFINED` | MC-16 |
| Commercial availability | `NOT_FOR_SALE` | MC-16 |
| Editions | 2 (`NAV-ESSENTIAL`, `NAV-PRO`) | MC-16 |
| Hardware | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | MC-16 |
| Licensing | `NOT_CLEARED`; chart/weather/tide rights `NOT_GRANTED` | MC-16 / MC-02 |
| Engineering | `PARTIALLY_VERIFIED` | MC-16 |
| Tested compatibility rows | 0 | MC-16 / MC-11 |
| AIS | receive-only display only; NAV does not transmit | MC-05 / MC-02 |

Limitations rendered: not a certified navigation system; no ECDIS equivalence; no NMEA 2000
certification or interoperability guarantee; charts/data not included; hardware not included; no
price/stock/SKU/order; no safety-critical function.

### HUB (hardware gateway)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | Hardware | MC-16 |
| Hardware selection | `NOT_SELECTED`; BOM not frozen | MC-16 / MC-11 |
| Editions | 2 (`HUB-STANDARD`, `HUB-PRO`) | MC-16 |
| Mandatory capability domains | 28 (target specification) | MC-05 |
| Interfaces | NMEA 0183 (parsing only), Signal K, GNSS, wind/depth/battery, receive-only AIS | MC-05 / MC-11 |
| Offline | local functions do not require a cloud subscription | MC-05 |
| Conformity | no CE/EMC/RED conformity demonstrated | MC-11 |
| Tested compatibility rows | 0 | MC-11 |

Limitations rendered: hardware not selected; no NMEA 2000 certification or universal
compatibility; sentence parsing is not conformance; compatibility with no measured rows; no
demonstrated CE/EMC/RED conformity; no vessel control; no price/stock/SKU/order.

### AIS (receive-only receiver)

| Fact | Value | Source |
| --- | --- | --- |
| Product type | Hardware | MC-16 |
| Transmission | `AIS_TRANSMISSION_OFFERED = false` | MC-05 `globalRestrictions` |
| Editions | 2 (`AIS-RECEIVER`; `AIS-CONNECTED` conditional, not selected by default) | MC-16 |
| Use boundaries | not a transponder, not DSC, not collision avoidance, not navigation | MC-05 / MC-11 |
| Decoder licence | external AIS-catcher GPL-3.0 unresolved (DEC-04); distribution blocked | MC-05 / MC-02 |
| Included hardware | receiver unit, power lead, quick-start guide, mounting, support path | MC-05 |
| Excluded | AIS VHF antenna, splitter, mast coax/connectors, installation, NAV, HUB | MC-05 |
| CPA/TCPA | only with own-vessel inputs and a validated path; otherwise unavailable | MC-05 |
| Price hypotheses (EUR 249/399) | **not published** | MC-05 (withheld) |

Limitations rendered: receive-only and no transmission; not DSC; not collision avoidance or
navigation; CPA/TCPA not guaranteed; antenna and installation not included; decoder licence
unresolved; no price/stock/SKU/order.

## 3. Readiness mapping

The canonical taxonomy has more values than the four presentation tones. The mapping is explicit and deliberately lossy: COMPLETE_TARGET_SPECIFICATION → READY (definition is complete); NOT_APPLICABLE_SOFTWARE_PRODUCT, NOT_STARTED, NOT_EVALUATED → NOT_ASSESSED; BLOCKED → BLOCKED; every commercial or verification state (NOT_CLEARED, NOT_GRANTED, NOT_SELECTED, NOT_FOR_SALE, PARTIALLY_VERIFIED, HYPOTHESIS_UNAPPROVED) → NOT_READY. The raw canonical code is always rendered next to the label, so the lossy tone never hides the exact state. For NAV the hardware dimension is NOT_ASSESSED because hardware does not apply; it is not presented as a failure.

## 4. Bundle relationships (canonical, not commercial)

| Bundle | NAV | HUB | AIS |
| --- | --- | --- | --- |
| START | NAV-PRO included | HUB-STANDARD included | — |
| CRUISE | NAV-ESSENTIAL included | HUB-STANDARD included | AIS-RECEIVER included |
| SAIL | NAV-PRO included | HUB-STANDARD included | — |
| PROTECT | — | HUB-STANDARD optional | — |
| COMPLETE | NAV-PRO included | HUB-PRO included | AIS-RECEIVER optional |
| FLEET | — | HUB-STANDARD optional | — |

Every bundle is `NOT_FOR_SALE`, not orderable and not checkout-enabled; no bundle price is
approved or fixed.

## 5. Withheld claims (never rendered)

Prices, price hypotheses, merchant SKU codes, stock, inventory, delivery dates, certifications,
regulatory approvals, NMEA interoperability guarantees, tested compatibility, AIS transmission,
collision-avoidance or navigation performance, safety-critical performance, warranty duration,
sea trials, testimonials and supplier quotations.

## 6. Validation

- MC20-02/03/04/09 compare the projection with the canonical datasets field by field.
- MC20-05 asserts the receive-only framing in both locales.
- MC20-08 asserts software vs hardware and unselected hardware.
- MC20-12 asserts every block has an evidence class and existing source files.
- MC20-15 rejects prohibited commercial claim patterns in 200+ bilingual strings.
- E2E asserts the AIS hero statements and the absence of purchase controls.
