# MC-09 Workstream B — Competitor price register

| Field | Value |
| --- | --- |
| Document | MC-09 / B — observed competitor price register |
| Date | 2026-10-31 |
| Author | agent-b-competitors |
| Status | `INTERNAL_RESEARCH_ONLY`; observed prices only, no MAREA price is set or approved here |
| Machine-readable source | `data/price-observations.json` (`PRC-CMP-001` … `PRC-CMP-056`) |
| Observations | `data/competitor-observations.json` (`OBS-CMP-001` … `OBS-CMP-048`) |

## 1. Register rules

1. `capturedAt` is `2026-10-31` for every record: each price was read on that date from
   the page cited in `sourceUrl`.
2. The original currency is kept. **No currency conversion is applied**, so no EUR
   figure is ever derived from a USD listing in this workstream.
3. The tax treatment printed on the page is recorded verbatim as one of:
   `IVA_INCLUDED`, `IMPUESTOS_INCLUIDOS`, `VAT_INCLUDED_DE`, `VAT_EXCLUDED`,
   `TAX_EXCLUSIVE_LIST_PRICE`, `TAX_MAY_APPLY_BY_LOCATION`, `NOT_STATED`,
   `NOT_STATED_ON_LISTING`, `NOT_STATED_ON_PAGE`, `UNKNOWN`, or a `*_DERIVED` marker.
   Where the page was silent, the register says so; no Spanish consumer-inclusive
   convention is assumed.
4. Price types used: `MANUFACTURER_LIST_PRICE` (published list), `RETAILER_OFFER`
   (single-SKU offer), `RETAILER_PROMOTIONAL` (discounted), `RETAILER_FROM_PRICE`
   ("a partir de" / "from"), `SUBSCRIPTION_RATE`, `SECONDARY_REPORTED` (price stated by
   an independent editorial source), `MODEL_DERIVED` (arithmetic, not an observation).
5. A "from" price is never used as the actual price of a product: `PRC-CMP-004`
   (iKonvert) is explicitly marked `RETAILER_FROM_PRICE` and carries `LOW` comparison
   confidence.
6. A discontinued or out-of-stock listing is not treated as a current offer:
   Simrad's page labels two drive packs `DESCATALOGADO` and carries
   `schema.org/OutOfStock` on the recorded SKUs; those records state the availability
   limitation.
7. Secondary-reported prices (Siren, ArmIt, Yacht Sentinel, Orca hardware, Windy) are
   labelled as such and are not mixed into a total with official prices without a
   `MODEL_DERIVED` record that states the composition.

## 2. Observed prices — navigation and weather software

| ID | Vendor / product | Amount | Currency | VAT treatment | Type | Territory |
| --- | --- | --- | --- | --- | --- | --- |
| PRC-CMP-001 | Orca Plus subscription | 49.00 | EUR | NOT_STATED_ON_PAGE | SUBSCRIPTION_RATE | EU/GLOBAL |
| PRC-CMP-002 | Orca Smart Navigation subscription | 149.00 | EUR | NOT_STATED_ON_PAGE | SUBSCRIPTION_RATE | EU/GLOBAL |
| PRC-CMP-034 | Orca Smart Navigation (WATCH link) | 149.00 | EUR | NOT_STATED_ON_PAGE | SUBSCRIPTION_RATE | EU/GLOBAL |
| PRC-CMP-035 | PredictWind Basic | 29.00 | USD | TAX_EXCLUSIVE_LIST_PRICE | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-036 | PredictWind Standard | 249.00 | USD | TAX_EXCLUSIVE_LIST_PRICE | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-037 | PredictWind Professional | 499.00 | USD | TAX_EXCLUSIVE_LIST_PRICE | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-038 | Windy Premium (incl. routing plugin) | 19.00 | EUR | UNKNOWN | SECONDARY_REPORTED | EU |

## 3. Observed prices — gateways, AIS and displays

| ID | Vendor / product | Amount | Currency | VAT treatment | Type | Territory |
| --- | --- | --- | --- | --- | --- | --- |
| PRC-CMP-003 | Digital Yacht NavLink2 | 300.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_OFFER | ES |
| PRC-CMP-004 | Digital Yacht iKonvert (from-price) | 240.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_FROM_PRICE | ES |
| PRC-CMP-005 | Victron Cerbo GX MK2 | 240.09 | EUR | IVA_INCLUDED | RETAILER_OFFER | ES |
| PRC-CMP-006 | PredictWind DataHub | 299.00 | USD | TAX_EXCLUSIVE_LIST_PRICE | MANUFACTURER_LIST_PRICE | GLOBAL |
| PRC-CMP-007 | PredictWind DataHub Pro | 599.00 | USD | TAX_EXCLUSIVE_LIST_PRICE | MANUFACTURER_LIST_PRICE | GLOBAL |
| PRC-CMP-008 | Digital Yacht AIS100 (receive-only) | 360.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_OFFER | ES |
| PRC-CMP-009 | Digital Yacht AIS transponder + N2K/Wi-Fi pack | 1,620.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_OFFER | ES |
| PRC-CMP-010 | Digital Yacht AIS + NavAlert pack | 2,046.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_OFFER | ES |
| PRC-CMP-011 | Digital Yacht AIS + ICOM M510 pack | 2,100.00 | EUR | NOT_STATED_ON_LISTING | RETAILER_OFFER | ES |
| PRC-CMP-020 | Raymarine Element 7 HV | 659.45 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-021 | Raymarine Element 9 HV | 901.45 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-022 | Raymarine Element 12 HV | 1,506.45 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-023 | Orca Display 2 | 999.00 | EUR | VAT_INCLUDED_DE | SECONDARY_REPORTED | DE |
| PRC-CMP-024 | Orca Core 2 (test-time offer) | 649.00 | EUR | VAT_INCLUDED_DE | SECONDARY_REPORTED | DE |
| PRC-CMP-025 | Orca Charging Mount | 349.00 | EUR | VAT_INCLUDED_DE | SECONDARY_REPORTED | DE |
| PRC-CMP-026 | Orca complete hardware package (sum) | 1,997.00 | EUR | VAT_INCLUDED_DE | SECONDARY_REPORTED | DE |

## 4. Observed prices — pilot, sensing and wind

| ID | Vendor / product | Amount | Currency | VAT treatment | Type | Territory |
| --- | --- | --- | --- | --- | --- | --- |
| PRC-CMP-012 | Raymarine EV-100 Wheel pack | 2,050.00 | EUR | IVA_INCLUDED | RETAILER_OFFER | ES |
| PRC-CMP-013 | Simrad NAC-2 processor | 1,217.26 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-014 | Simrad NAC-3 processor | 2,136.86 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-015 | Simrad NAC-2 basic pack | 2,100.56 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-016 | Simrad NAC-3 basic pack | 3,083.08 | EUR | IVA_INCLUDED | MANUFACTURER_LIST_PRICE | ES |
| PRC-CMP-017 | Victron SmartShunt 500A IP65 | 90.21 | EUR | IVA_INCLUDED | RETAILER_OFFER | ES |
| PRC-CMP-018 | B&G WS310 wind vane | 489.95 | EUR | IMPUESTOS_INCLUIDOS | RETAILER_OFFER | ES |
| PRC-CMP-019 | B&G Triton2 instrument pack | 1,149.40 | EUR | IMPUESTOS_INCLUIDOS | RETAILER_PROMOTIONAL | ES |

## 5. Observed prices — monitoring services

| ID | Vendor / product | Amount | Currency | VAT treatment | Type | Territory |
| --- | --- | --- | --- | --- | --- | --- |
| PRC-CMP-027 | Siren 3 hardware | 299.99 | USD | UNKNOWN | SECONDARY_REPORTED | US |
| PRC-CMP-028 | Siren annual service plan | 225.00 | USD | UNKNOWN | SUBSCRIPTION_RATE | US |
| PRC-CMP-029 | Siren 3 Pro hardware | 799.99 | USD | UNKNOWN | SECONDARY_REPORTED | US |
| PRC-CMP-030 | ArmIt BilgeMAX One kit | 229.99 | USD | UNKNOWN | SECONDARY_REPORTED | US |
| PRC-CMP-031 | ArmIt Sentinel annual plan | 100.00 | USD | UNKNOWN | SUBSCRIPTION_RATE | US |
| PRC-CMP-032 | Yacht Sentinel YS Pro hardware | 1,590.00 | EUR | VAT_EXCLUDED | SECONDARY_REPORTED | EU |
| PRC-CMP-033 | Yacht Sentinel annual plan (EU/US) | 240.00 | EUR | UNKNOWN | SUBSCRIPTION_RATE | EU |
| PRC-CMP-046 | Yacht Sentinel YS Pro (PROTECT record) | 1,590.00 | EUR | VAT_EXCLUDED | SECONDARY_REPORTED | EU |

## 6. Observed prices — fleet SaaS

| ID | Vendor / product | Amount | Currency | VAT treatment | Type | Territory |
| --- | --- | --- | --- | --- | --- | --- |
| PRC-CMP-039 | Full Ahead Vessel, up to 5 ships, annual | 1,490.00 | EUR | TAX_MAY_APPLY_BY_LOCATION | MANUFACTURER_LIST_PRICE | EU |
| PRC-CMP-040 | Full Ahead Vessel, up to 5 ships, monthly | 149.00 | EUR | TAX_MAY_APPLY_BY_LOCATION | SUBSCRIPTION_RATE | EU |
| PRC-CMP-041 | UOC Core, per vessel/month | 259.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-042 | UOC two-vessel annual plan | 4,900.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-043 | Seafarers.pro Starter, per vessel/month | 150.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-044 | Seafarers.pro Professional, per vessel/month | 240.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-045 | Seafarers.pro Enterprise, per vessel/month | 360.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |
| PRC-CMP-047 | Full Ahead Vessel (FLEET record) | 1,490.00 | EUR | TAX_MAY_APPLY_BY_LOCATION | MANUFACTURER_LIST_PRICE | EU |
| PRC-CMP-048 | UOC two-vessel annual (FLEET record) | 4,900.00 | EUR | NOT_STATED | SUBSCRIPTION_RATE | GLOBAL |

## 7. Derived totals and unit arithmetic (not observations)

These records exist so that bundle comparisons are auditable. They are **not** competitor
offers and must never be quoted as one.

| ID | Subject | Amount | Currency | Composition | Basis |
| --- | --- | --- | --- | --- | --- |
| PRC-CMP-049 | START-equivalent (Orca Core 2 + Plus) | 698.00 | EUR | 649.00 + 49.00 | `MODEL_DERIVED` |
| PRC-CMP-050 | CRUISE-equivalent (Raymarine + Digital Yacht parts) | 1,319.45 | EUR | 659.45 + 360.00 + 300.00 | `MODEL_DERIVED` |
| PRC-CMP-051 | SAIL-equivalent (EV-100 + display + wind + gateway) | 3,499.40 | EUR | 2,050.00 + 659.45 + 489.95 + 300.00 | `MODEL_DERIVED` |
| PRC-CMP-052 | COMPLETE-equivalent (five components, four brands) | 3,799.49 | EUR | 659.45 + 2,050.00 + 489.95 + 360.00 + 240.09 | `MODEL_DERIVED` |
| PRC-CMP-053 | Siren 3 year one with one high-water sensor | 664.08 | USD | 299.99 + 225.00 + 139.09 | `MODEL_DERIVED` |
| PRC-CMP-054 | Yacht Sentinel YS Pro year one (ex-VAT) | 1,830.00 | EUR | 1,590.00 + 240.00 | `MODEL_DERIVED` |
| PRC-CMP-055 | Full Ahead effective per vessel-month (annual, 5 ships) | 24.83 | EUR | 1,490.00 / 5 / 12 | `MODEL_DERIVED` |
| PRC-CMP-056 | UOC effective per vessel-month (annual, 2 vessels) | 204.17 | EUR | 4,900.00 / 2 / 12 | `MODEL_DERIVED` |

## 8. Prices deliberately not recorded

| Product | Why no price |
| --- | --- |
| Garmin Navionics Boating (official EUR) | Garmin support FAQ rendered without article content; only a secondary in-app-purchase range was found, recorded as an observation without a numeric `observedPrice` |
| em-trak B100 AIS transponder | Retailer page returned HTTP 404; no price inferred |
| Garmin gWind Regata wind sensor | Retailer page returned HTTP 404; no price inferred |
| Siren Marine hardware/subscription | Vendor storefront returned no price text; only secondary values recorded |
| Yacht Sentinel current price | Vendor domain parked; the only figure is secondary and availability is `UNCONFIRMED` |
| Savvy Navvy | Domain served a resale page; product not assessed |
| Windy Premium official price | Vendor page returned no retrievable price text; only the secondary EUR 19 figure |
| Yacht Devices / Actisense / Maretron gateways | No successful retrieval in this session; not recorded rather than estimated |

## 9. Coverage and interpretation limits

- 56 price records: 48 observed, 8 `MODEL_DERIVED`. Four observed records repeat the
  same component price against a bundle observation (`PRC-CMP-034`, `-046`, `-047`,
  `-048`), so 44 distinct observed price points are behind the register.
- Currency split of observed records: EUR 37, USD 11 (mix of hardware, subscriptions and
  service plans).
- VAT split of observed records: inclusive 16, explicitly exclusive 4, conditional 4,
  unstated/unknown 24. That summarises the single largest comparability problem in this
  category.
- No observed price includes installation, commissioning, antenna work, a vessel survey
  or a sea trial. Comparisons against a MAREA installed bundle must add those unknowns,
  not ignore them.
- A lower observed price is not evidence that MAREA can match it; a higher observed price
  is not evidence that MAREA can charge it. Willingness to pay is `NOT_MEASURED`.
