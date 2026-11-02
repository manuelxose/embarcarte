# MC-11 D13 — Public price evidence (catalogue observations, not quotations)

Status: `INTERNAL_ENGINEERING_RESEARCH` — **NO QUOTATION EXISTS. NO SUPPLIER WAS CONTACTED. NO PURCHASE
WAS MADE.** Every figure in this document is a public catalogue observation made on **2026-11-02**, not
a negotiated price, not a wholesale price, and not an offer. `MC11_FORMAL_PROCUREMENT_EVIDENCE =
BLOCKED_OR_NOT_OBTAINED`. No MAREA price is approved (`PRICE_APPROVED = NONE`).

Machine-readable companion: `docs/marea/hardware/data/price-observations.json` (42 observations,
`PO-<BLOCK>-###`) and `docs/marea/hardware/data/evidence/sourcing.json`.

---

## 1. The evidence hierarchy actually used

`FORMAL_SUPPLIER_QUOTATION` and `SUPPLIER_QUOTED` are **forbidden** in MC-11 and appear nowhere. The
maximum class observed is:

| Rank | Evidence class | What it means | What it does NOT mean |
|---|---|---|---|
| 1 | `MANUFACTURER_PUBLIC_LIST_PRICE` | The manufacturer publishes this price on its own web page for a stated quantity band | Not wholesale, not tier-negotiated, not a commitment to supply, VAT usually unstated |
| 2 | `AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE` | A distributor storefront publishes this price (single-unit retail, quantity bands) | Not wholesale, not the manufacturer's price, not a stock guarantee |
| 3 | `THIRD_PARTY_RESELLER_PUBLIC_PRICE` | A non-franchised reseller page | Not used in this session — no such page was fetched |
| — | `HISTORICAL_OBSERVATION`, `CALCULATED_ESTIMATE`, `ENGINEERING_ASSUMPTION`, `BUDGETARY_INDICATION`, `UNKNOWN` | Reserved for other deliverables / gaps | An estimate is never a price observation |

**Observed in this session:** 37 `MANUFACTURER_PUBLIC_LIST_PRICE` observations (Texas Instruments 28,
u-blox 3, JLCPCB 3, PCBWay 2, AISLER 1 — the latter three counting service pages) and 5
`AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE` observations (RS Components). **Zero** third-party reseller and
**zero** quotation observations. Total: 42 observations.

No figure was derived from a search-engine snippet: an unfetched page was not used for any amount.

---

## 2. Register of observations

All rows: `observedAt = 2026-11-02`. "Tier" = `priceQuantityTier` (minimum quantity of the band).
"Unit qty" = what one price applies to. Availability is only claimed where a page said it.

### 2.1 CAN — NMEA 2000 physical layer

| ID | Subject | Supplier | Price | Cur. | VAT | Tier | Unit qty | Class | Availability |
|---|---|---|---|---|---|---|---|---|---|
| PO-CAN-001 | TCAN1042HGVDR | Texas Instruments | 2.196 | USD | UNKNOWN | 1 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-002 | TCAN1042HGVDR | Texas Instruments | 1.689 | USD | UNKNOWN | 100 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-003 | TCAN1042HGVDR | Texas Instruments | 1.244 | USD | UNKNOWN | 250 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-004 | TCAN1042HGVDR | Texas Instruments | 0.889 | USD | UNKNOWN | 1000 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-005 | ISO1042DWV | Texas Instruments | 5.589 | USD | UNKNOWN | 1 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-006 | ISO1042DWV | Texas Instruments | 4.898 | USD | UNKNOWN | 100 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-007 | ISO1042DWV | Texas Instruments | 3.434 | USD | UNKNOWN | 250 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-008 | ISO1042DWV | Texas Instruments | 2.767 | USD | UNKNOWN | 1000 | 1 | MANUFACTURER_PUBLIC_LIST_PRICE | UNKNOWN |
| PO-CAN-009 | TCAN1042HGVDR | RS Components | 2.198 | EUR | EXCLUDED | 5 | 1 (pack of 5) | AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE | IN_STOCK_OBSERVED (4 435 units) |
| PO-CAN-010 | TCAN1042HGVDR | RS Components | 2.09 | EUR | EXCLUDED | 25 | 1 (pack of 5) | AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE | IN_STOCK_OBSERVED |
| PO-CAN-011 | TCAN1042HGVDR | RS Components | 1.876 | EUR | EXCLUDED | 50 | 1 (pack of 5) | AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE | IN_STOCK_OBSERVED |
| PO-CAN-012 | TCAN1042HGVDR | RS Components | 1.69 | EUR | EXCLUDED | 125 | 1 (pack of 5) | AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE | IN_STOCK_OBSERVED |
| PO-CAN-013 | TCAN1042HGVDR | RS Components | 1.606 | EUR | EXCLUDED | 250 | 1 (pack of 5) | AUTHORIZED_DISTRIBUTOR_PUBLIC_PRICE | IN_STOCK_OBSERVED |

Source URLs: TI `https://www.ti.com/product/TCAN1042HGV/part-details/TCAN1042HGVDR`,
`https://www.ti.com/product/ISO1042/part-details/ISO1042DWV`; RS
`https://es.rs-online.com/web/p/can-interface-ics/2528889` (EVD-MC11-102, 103, 109).

### 2.2 N183 — NMEA 0183 electrical layer / isolation

| ID | Subject | Supplier | Price | Cur. | VAT | Tier | Class |
|---|---|---|---|---|---|---|---|
| PO-N183-001 | SN65HVD78D | Texas Instruments | 3.529 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-002 | SN65HVD78D | Texas Instruments | 3.092 | USD | UNKNOWN | 100 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-003 | SN65HVD78D | Texas Instruments | 2.168 | USD | UNKNOWN | 250 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-004 | SN65HVD78D | Texas Instruments | 1.747 | USD | UNKNOWN | 1000 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-005 | ISO7721DR | Texas Instruments | 1.689 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-006 | ISO7721DR | Texas Instruments | 1.395 | USD | UNKNOWN | 100 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-007 | ISO7721DR | Texas Instruments | 1.002 | USD | UNKNOWN | 250 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-N183-008 | ISO7721DR | Texas Instruments | 0.754 | USD | UNKNOWN | 1000 | MANUFACTURER_PUBLIC_LIST_PRICE |

Availability: `UNKNOWN` for all, with the limitation recorded that the TI page displayed **"Out of
stock"** for ISO7721DR on the observation date. A price is not availability.

### 2.3 PWR — power conversion and reverse-polarity protection

| ID | Subject | Supplier | Price | Cur. | VAT | Tier | Class |
|---|---|---|---|---|---|---|---|
| PO-PWR-001 | LM74700QDBVRQ1 | Texas Instruments | 1.951 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-002 | LM74700QDBVRQ1 | Texas Instruments | 1.611 | USD | UNKNOWN | 100 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-003 | LM74700QDBVRQ1 | Texas Instruments | 1.158 | USD | UNKNOWN | 250 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-004 | LM74700QDBVRQ1 | Texas Instruments | 0.871 | USD | UNKNOWN | 1000 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-005 | LMR33630ADDA | Texas Instruments | 2.594 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-006 | LMR33630ADDA | Texas Instruments | 2.273 | USD | UNKNOWN | 100 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-007 | LMR33630ADDA | Texas Instruments | 1.593 | USD | UNKNOWN | 250 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PWR-008 | LMR33630ADDA | Texas Instruments | 1.284 | USD | UNKNOWN | 1000 | MANUFACTURER_PUBLIC_LIST_PRICE |

Additional BOM cost excluded by these observations: external MOSFET (LM74700), inductor/capacitors
(LMR33630), shunt, TVS, fuse/PTC, connectors.

### 2.4 SENSE — power monitor

| ID | Subject | Supplier | Price | Cur. | VAT | Tier | Class |
|---|---|---|---|---|---|---|---|
| PO-SENSE-001 | INA228AIDGSR | Texas Instruments | 3.893 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-SENSE-002 | INA228AIDGSR | Texas Instruments | 3.174 | USD | UNKNOWN | 100 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-SENSE-003 | INA228AIDGSR | Texas Instruments | 2.495 | USD | UNKNOWN | 250 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-SENSE-004 | INA228AIDGSR | Texas Instruments | 2.116 | USD | UNKNOWN | 1000 | MANUFACTURER_PUBLIC_LIST_PRICE |

### 2.5 GNSS — manufacturer-published module prices

| ID | Subject | Supplier | Price | Cur. | VAT | Tier | Notes |
|---|---|---|---|---|---|---|---|
| PO-GNSS-001 | ZED-F9P-04B | u-blox | 127.42 | USD | UNKNOWN | 1 | Quantity basis not stated on page; 250 pcs/reel mentioned |
| PO-GNSS-002 | ZED-F9P-05B | u-blox | 127.42 | USD | UNKNOWN | 1 | as above |
| PO-GNSS-003 | ZED-F9P-15B | u-blox | 124.62 | USD | UNKNOWN | 1 | as above |

`MANUFACTURER_PUBLIC_LIST_PRICE`, source `https://www.u-blox.com/en/product/zed-f9p-module`
(EVD-MC11-117). **No MAX-M10 price exists to observe**: the entire family is marked not available.

### 2.6 PCB — service price observations

| ID | Service | Supplier | Price | Cur. | VAT | Tier | MOQ | Lead time | Class |
|---|---|---|---|---|---|---|---|---|---|
| PO-PCB-001 | FR-4 PCB, 1–2 layer, 5 pcs, "from" | JLCPCB | 2.00 | USD | UNKNOWN | 5 | 5 (advertised) | 24 h build (advertised) | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PCB-002 | SMT stencil, "from" | JLCPCB | 3.00 | USD | UNKNOWN | 1 | — | UNKNOWN | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PCB-003 | 1–2 layer PCB, 10 pcs, "from" | PCBWay | 5.00 | USD | UNKNOWN | 10 | 10 (advertised) | 24 h build (advertised) | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PCB-004 | PCB "starting at" | AISLER | 14.20 | EUR | UNKNOWN | 1 | — | 1 business day (advertised) | MANUFACTURER_PUBLIC_LIST_PRICE |

Sources: `https://jlcpcb.com/` (EVD-124), `https://www.pcbway.com/` (EVD-125), `https://aisler.net/`
(EVD-126). These are **advertised minimum-configuration prices**, not board prices for a MAREA 4–6
layer, ENIG, controlled-impedance design, and they exclude shipping, stencil/tooling for the order,
test, VAT and any EU handling.

### 2.7 PCBA — service price observations

| ID | Service | Supplier | Price | Cur. | VAT | Tier | Class |
|---|---|---|---|---|---|---|---|
| PO-PCBA-001 | PCB assembly, "from" | JLCPCB | 8.00 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |
| PO-PCBA-002 | Assembly headline incl. free shipping 1–20 pcs | PCBWay | 29.00 | USD | UNKNOWN | 1 | MANUFACTURER_PUBLIC_LIST_PRICE |

Both exclude **all component cost**, stencil, programming, functional test, tooling, shipping beyond
the promotional claim, and VAT. They are not usable as an assembly cost line without a quotation.

---

## 3. Where no public price exists (`UNKNOWN`, and it must stay UNKNOWN)

| Category | Status | Why |
|---|---|---|
| STM32H7 MCUs (STM32H743VIT6, STM32H757XIH6) | `UNKNOWN` | ST publishes no price on the retrieved page |
| Microchip MCP2518FD, ATECC608B, AT24CS32, KSZ8081RNB | `UNKNOWN` | No price on retrieved product pages; Mouser/Digi-Key inaccessible |
| Toradex and Variscite SoMs | `UNKNOWN` | Only evaluation-kit prices are published; module price requires quote |
| Quectel EG915U-EU / BG95-M3 | `UNKNOWN` | No price on retrieved page; distributors inaccessible |
| Sensirion SHT40, Bosch BMI088 | `UNKNOWN` | No price on retrieved page |
| Riverdi RVT70HSSNWN00 display | `UNKNOWN` | No price on retrieved page |
| Fibox enclosure, Amphenol M12 connector, Taoglas antenna | `UNKNOWN` | Product pages inaccessible |
| TVS, fuse/PTC, cable glands, vent, stainless hardware | `UNKNOWN` | No page retrieved |
| ISO7721 availability | `UNKNOWN` (noted "out of stock") | Price published, stock not |
| Component MOQ and lead time | `UNKNOWN` | Not published on any retrieved component page |
| Enclosure tooling, stencils, test fixtures, optical bonding NRE | `UNKNOWN` | Not published |
| EMC/RED laboratory services | `UNKNOWN` | No public price published (and no lab contacted) |
| Packaging and logistics | `UNKNOWN` | No public price observed |
| Warranty/RMA, payment terms, Incoterms | `UNKNOWN` | Commercial terms only from a real quotation |

A BOM whose lines include any of the above is `INCOMPLETE`; it must not be presented with a numeric
total as if it were a manufacturing cost.

---

## 4. The specific traps in this price set

1. **Currency.** Manufacturer prices are **USD**; RS and AISLER are **EUR**. No FX conversion is
   performed here. Any conversion requires a recorded `fxRates` entry with source URL and date
   (DATA-CONTRACT §1.6), otherwise the line is `COST_UNVERIFIED`.
2. **VAT.** Texas Instruments and u-blox pages do **not** state VAT treatment → `VAT_UNKNOWN`. RS
   explicitly shows VAT-excluded prices (with a VAT-inclusive pack price alongside) →
   `VAT_EXCLUDED`. Every mixed-VAT total must be normalised or refused.
3. **Quantity tiers.** TI bands are 1–99 / 100–249 / 250–999 / 1 000+. RS bands are 5–20 / 25–45 /
   50–120 / 125–245 / 250+, sold in **packs of 5**, labelled "*precio indicativo*". JLCPCB "from
   $2.00" applies to **5 boards** of the cheapest possible board. A BOM line must reuse the exact tier
   of the observation; no volume discount may be invented.
4. **Stock.** The only stock statement observed is RS's "4 435 units available to despatch from another
   distribution centre" (TCAN1042) — a point-in-time retail statement, not a production commitment.
5. **Time.** Catalogue prices and stock change continuously. All observations are valid only as of
   **2026-11-02**; none is a forward price or a price-hold.
6. **Not wholesale.** Single-unit retail (RS) and manufacturer web list (TI/u-blox) are not what a
   contract manufacturer pays at 1 000 units; inventing a wholesale discount would be fabrication.

---

## 5. What a genuine quotation would have to establish

No document in MC-11 is a quotation. A real quotation (a future, separately authorised action under
gate G2/G3) would have to state, per line item, at minimum:

| # | Term | Why it matters to MAREA |
|---|---|---|
| 1 | Supplier legal entity, address, VAT ID | Contracting identity and jurisdiction |
| 2 | Quotation reference, issue date, validity period | It must be attributable and time-bounded |
| 3 | Exact MPN, manufacturer, revision/date code and datasheet revision | Freezes what is being bought |
| 4 | Quantity per line and **price breaks** (MOQ, 10, 100, 500, 1 000) | Volume economics; no invented discount |
| 5 | Currency and **VAT treatment** (or reverse-charge statement) | Avoids mixed-basis totals |
| 6 | **Incoterms** (e.g. EXW/FCA/DAP) and named place | Landed cost and risk transfer |
| 7 | Setup/tooling/NRE, stencil, programming, test fixture charges | These are excluded from "from" prices |
| 8 | Component cost basis (own stock, consigned, turnkey) | PCBA prices exclude components today |
| 9 | **Lead time** and capacity/allocation, per tier | Production planning; currently UNKNOWN |
| 10 | Payment terms, currency, price-hold/validity | Cash-flow and FX exposure |
| 11 | Test and inspection: AOI, ICT/FCT, IPC class, sampling, first-article | Quality obligation, not marketing |
| 12 | Warranty period, RMA process, failure-analysis policy | Marine field-service cost |
| 13 | Regulatory documentation: RoHS/REACH declarations, CE/RED module approvals, UL material data, conflict-minerals statement | Needed for the technical file |
| 14 | Traceability: lot/date code, CoC, serialisation, tamper evidence | CRA and warranty traceability |
| 15 | Alternate/substitute policy and change-notification (PCN) commitment | Obsolescence control |
| 16 | Packaging specification and logistics terms | Shipping damage and cost |
| 17 | Explicit assumptions and exclusions | A quote without exclusions is not comparable |

Until such a document exists for a named supplier, every cost figure remains catalogue observation or
`UNKNOWN`, and `MC11_FORMAL_PROCUREMENT_EVIDENCE = BLOCKED_OR_NOT_OBTAINED` remains true.
