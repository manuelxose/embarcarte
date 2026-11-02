# MC-12 D10 — Bundle economics

| Field | Value |
|---|---|
| Deliverable | D10 `MC12-BUNDLE-ECONOMICS.md` |
| Owner / date | `commercial-finance-pricing-strategist`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` — all bundle prices `HYPOTHESIS_UNAPPROVED` / `NOT_ESTABLISHED` |
| Machine companion | [bundle-economics.json](data/bundle-economics.json) |
| Composition authority | `docs/marea/bundles/bundle-definitions.json` (read, never invented) |

## 1. Method

The six MC-08 bundles are analysed exactly as defined. No included product is added
or removed. Each component is mapped to a 100-unit BASE unit-economics record; a
component that has no cost model (PILOT, AIS-CONNECTED) stays unknown and is never
assigned a zero. Bundle net revenue = gross hypothesis / 1.21 (VAT-inclusive) or the
VAT-excluded figure where stated. Bundle contribution = net revenue − sum of known
component variable costs, before fixed costs and before the unknown data rights.

A bundle price hypothesis is a *reference*, not an installed-system price: PH-01,
PH-02, PH-03 and PH-05 explicitly exclude installation, antenna/splitter, cabling,
channel margin and data rights.

## 2. Results

| Bundle | Price hypothesis | Gross EUR | Net EUR | Known variable cost EUR | Conditional contribution EUR | Unknown variable categories | Classification |
|---|---|---|---|---|---|---|---|
| START | PH-01 | 499 | 412.40 | 293.55 | +118.85 | chart licence, certification | `LICENSING_BLOCKED` |
| CRUISE | PH-02 | 1 399 | 1 156.20 | 876.23 | +279.97 | chart licence, AIS antenna/splitter/cabling, installation | `LICENSING_BLOCKED` |
| PROTECT | PH-04 | 399 | 329.75 | 380.49 | **−50.74** | cellular connectivity, certification | `DEFER_RECOMMENDED` |
| SAIL | PH-03 | n/a (quotation) | n/a | n/a | n/a | PILOT scope | `SAFETY_BLOCKED` |
| COMPLETE | PH-05 | n/a (quotation) | n/a | n/a | n/a | PILOT scope | `SAFETY_BLOCKED` |
| FLEET | PH-06 | `NOT_ESTABLISHED` | n/a | n/a | n/a | FLEET package | `COST_MODEL_INCOMPLETE` |

Percentages are suppressed because every bundle with a numeric price has at least
one material unknown variable cost. The euro figure is the conditional result
*before* that unknown.

## 3. Bundle-by-bundle

### START (HUB Standard + NAV Pro, first year)
Reference sum EUR 498 against PH-01 EUR 499. Known variable cost EUR 293.55 gives a
conditional contribution of EUR 118.85, but START requires a licensed chart
entitlement that is `NOT_GRANTED`, and its HUB certification is unknown. The
price is not an installed-system price. `LICENSING_BLOCKED`.

### CRUISE (NAV Essential + HUB Standard + AIS Receiver + DISPLAY 7)
Reference sum EUR 1 396 against PH-02 EUR 1 399. The largest hardware bundle, with a
conditional contribution of EUR 279.97 before the chart licence, the excluded
antenna/splitter/cabling and installation. It inherits the AIS receiver's negative
standalone economics but the DISPLAY margin absorbs it at the bundle level — which
does **not** make AIS viable; it makes CRUISE dependent on DISPLAY.

### PROTECT (WATCH Core + SENSE-POWER + SENSE-BILGE)
The historical EUR 399 is below the conditional variable cost of its own
composition: EUR 380.49 of known cost against EUR 329.75 net revenue, a **negative
EUR 50.74** before connectivity and certification. The MC-08 note already recorded
that the symbolic component floor exceeded EUR 399. `DEFER_RECOMMENDED`: the bundle
cannot be sold at PH-04 with this composition and cost structure.

### SAIL (NAV Pro + HUB + PILOT + SENSE)
Includes PILOT. The safety gate is `BLOCKED`, no PILOT cost or fixed price exists,
and the entire steering installation scope is unpriced. PH-03 EUR 1 990 is a
historical turnkey reference only. `SAFETY_BLOCKED`; no contribution is computed.

### COMPLETE (NAV Pro + HUB Pro + DISPLAY + WATCH + four SENSE + PILOT)
Same PILOT boundary plus an unpriced HUB-PRO increment. PH-05 EUR 3 490 is a
historical reference only. `SAFETY_BLOCKED`.

### FLEET (per-vessel SaaS + separately quoted onboarding)
No package price exists and PH-06 is `NOT_ESTABLISHED`. FLEET is hardware-free by
default and **no hardware cost line is included**. The bundle economics are
incomplete rather than negative: per-vessel SaaS headroom is large, but cloud, DPA,
support, onboarding and demand are all unresolved (`COST_MODEL_INCOMPLETE`).

## 4. Structural findings

1. **Bundle pricing cannot hide a negative SKU.** PROTECT is negative because its
   composition exceeds its price. CRUISE is positive only because DISPLAY carries
   it; the AIS receiver remains loss-making at EUR 249.
2. **Chart licensing blocks the two consumer software bundles** (START, CRUISE)
   despite attractive software margins.
3. **Safety blocks the two installed bundles** (SAIL, COMPLETE). No price can be
   established before PILOT is safe and surveyed.
4. **FLEET is a contract, not a package.** It has no default hardware and no
   package price; onboarding is a separate quotation.
5. **No bundle is purchasable.** All six are `DEFINED` / `NOT_FOR_SALE`, and the
   model does not change that status.

## 5. What would change the conclusion

| Bundle | Required evidence |
|---|---|
| START | Chart redistribution licence with price; HUB certification quote; one customer price test |
| CRUISE | Chart licence; AIS antenna/splitter/cabling BOM; DISPLAY supplier quote; installation rate |
| PROTECT | Re-priced composition or lower-cost WATCH/SENSE; connectivity contract; certification quote |
| SAIL / COMPLETE | PILOT safety case and independent sign-off; full steering installation survey and supplier quotes |
| FLEET | Written contract, cloud/DPA, onboarding cost, fleet customer evidence |

None of this evidence exists in the repository, and obtaining it requires the
external authorisations listed in [D13](MC12-BLOCKER-REGISTER.md).
