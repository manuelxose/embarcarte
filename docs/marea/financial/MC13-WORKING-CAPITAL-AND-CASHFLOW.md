# MC-13 D10 — Working capital and cash flow

| Field | Value |
|---|---|
| Deliverable | D10 `MC13-WORKING-CAPITAL-AND-CASHFLOW.md` — status `INTERNAL_FINANCIAL_ANALYSIS`, conditional, hypothetical, pre-revenue |
| Milestone / date / owner | MC-13/36, 2026-11-02, `hardware-manufacturing-economics`; 60-month model `M01`–`M60`; EUR, 2 decimals half-up, tolerance ±0.005 EUR |
| Data snapshot | `data/monthly-financial-model.json`, `scenario-results.json`, `working-capital.json`, `assumptions.json`, `scenario-definitions.json`, `capital-investments.json`, `blocker-register.json` as of `2026-11-02`; reporting views M12 / M36 / M60 |
| Governed by / inherited from | D02 `MC13-FINANCIAL-DATA-CONTRACT.md`, `MC13-GENERATED-FIGURES.md`; MC-12 `MC12-MC13-HANDOFF.md` §7, `hardware-cost-reconciliation.json`; decision D-050 |
| Boundary | Analysis only. No credit facility, supplier term, customer term, FX hedge, financing approval or break-even claim exists. `COMMERCIAL_AVAILABILITY = NOT_FOR_SALE`; `PRICE_APPROVED = NONE`; `EMBARCARTE` current cash and funding are `UNKNOWN`. |

## 1. Purpose and boundary

This deliverable documents the working-capital mechanics of the 60-month model and the cash-flow
identity connecting the conditional EBITDA-like result to cumulative cash: customer collections and
trade receivables, supplier payments and inventory, VAT timing, the working-capital movement, the
financing requirement and the named unknown exposures. Every figure is read from the governed JSON
files or recomputed from them. No term is a contract, no figure is a financing offer, and no
cash-flow result is a viability or break-even claim.

## 2. Terms of trade are scenario assumptions — no agreement exists

| Term | Modelled value | Source / assumption | Evidence class |
|---|---|---|---|
| Supplier minimum order quantity / lead time | 25 units / 2 months | `ASM-MC13-015` / `ASM-MC13-013` | `SCENARIO_ASSUMPTION`; no MOQ or order exists |
| Supplier deposit / balance | 30 % at order / 70 % one month after receipt (`balanceDueAfterDays: 30`) | `ASM-MC13-011` / `ASM-MC13-012` | `SCENARIO_ASSUMPTION`; no payment term exists |
| Distributor customer term | 60 days = 2 model periods (`ceil(60/30)`) | `ASM-MC13-018` | `SCENARIO_ASSUMPTION` |
| Direct consumer settlement | 2 days = same model month | `ASM-MC13-019` | `SCENARIO_ASSUMPTION` |
| Inventory carrying / obsolescence | 2 % per year of asset / 5 % per year of available units | `ASM-MC13-016` / `ASM-MC13-017` | `SCENARIO_ASSUMPTION` |
| FX hedge / credit facility | none / none | `working-capital.json` (`fxHedgeExists: false`, `creditFacilityExists: false`) | no hedge and no facility exist |
| Returns / obsolescence agreement | none | BLK-FIN-12 | no agreement exists |

`working-capital.json` status is `SCENARIO_ASSUMPTIONS_ONLY` and its note reads: *"No MOQ, payment
term, price-hold, credit line or FX hedge exists."* Both `supplierPaymentTerms.contracted` and
`customerCollection.contracted` are `false`. The manifest records 0 formal quotations and 0 executed
contracts. **No payable, receivable, VAT, supplier or customer contract exists; every term above is a
planning assumption invented only for conditional analysis.**

## 3. Customer collections and trade receivables

### 3.1 Channel mix (all hypothetical scenarios)

Hardware: 70 % `DIRECT_TO_CONSUMER` (0 % revenue deduction), 25 % `DISTRIBUTOR_RETAIL` (35 %
deduction), 5 % `PROFESSIONAL_INSTALLER` (15 % deduction) — `scenario-definitions.json#channelMix`,
assumptions `ASM-MC13-114`–`116` (BASE), all `SCENARIO_ASSUMPTION`. Subscription: 80 % direct, 20 %
`APP_STORE` (30 % commission), assumptions `ASM-MC13-117`–`118`. Direct, installer and subscription
receipts settle in the invoice month; distributor receipts settle two months later.

### 3.2 Trade receivables identity

With opening balance **0** and no discounting or credit loss, the model maintains:

```
tradeReceivablesEnd[m] = tradeReceivablesEnd[m-1] + distributorInvoicedGross[m] - distributorCollectionsGross[m]
distributorCollectionsGross[m] = distributorInvoicedGross[m - 2]   (2-month lag)
```

Both statements are enforced by `scripts/check-marea-financial-model.mjs` **A-06**, together with
non-negativity of trade receivables and `cashReceiptsGross = directReceiptsGross +
distributorCollectionsGross + subscriptionCashGross − refundsCash`. Distributor invoicing uses the
channel-adjusted VAT-inclusive trade price and is checked by **A-28** (VAT is not added twice and the
35 % distributor deduction is applied). No doubtful-debt provision, early-settlement discount or
credit insurance is modelled.

BASE_HYPOTHETICAL receivables series (EUR):

| Month | Distributor invoiced | Distributor collected | Trade receivables end |
|---|---:|---:|---:|
| M08 | 340.76 | 0.00 | 340.76 |
| M09 | 1 516.13 | 0.00 | 1 856.89 |
| M12 | 5 129.49 | 2 666.63 | 8 922.24 |
| M24 | 7 534.32 | 7 534.32 | 15 068.64 |
| M60 | 7 534.32 | 7 534.32 | 15 068.64 |

M60 totals: distributor invoiced EUR 373 369.81, distributor collected EUR 358 301.17, trade
receivables **EUR 15 068.64** (the last two months of distributor invoicing). Direct receipts
EUR 1 706 010.92 + distributor collections EUR 358 301.17 + subscription cash gross
EUR 2 318 162.35 − refunds paid EUR 62 381.43 = gross cash receipts **EUR 4 320 093.01**. End
receivables are positive in every scenario: DOWNSIDE EUR 2 300.70, BASE EUR 15 068.64, UPSIDE
EUR 38 530.40.

### 3.3 Cash receipts versus recognised revenue

Cash collected exceeds net recognised revenue by EUR 893 445.89 in BASE, decomposed exactly as:

| Bridge item | Amount |
|---|---:|
| Gross cash receipts − net recognised revenue | 893 445.89 |
| VAT collected in cash (output VAT) | 658 285.24 |
| Deferred subscription revenue (cash received ahead of recognition) | 250 229.29 |
| Less increase in distributor trade receivables | −15 068.64 |
| **Reconciled difference** | **893 445.89** |

The refund/withdrawal allowance is now paid in cash (`refundsCash`, **A-27**), so it reduces revenue
and cash receipts by the same EUR 62 381.43 and cancels out of this bridge. Deferred revenue at M60
is EUR 250 229.29 (DOWNSIDE EUR 22 045.70; UPSIDE EUR 850 064.04) and reconciles monthly by
**A-08**. This timing is a source of working capital, not revenue.

## 4. Supplier payments and inventory working capital

An order placed in month *m* is received in *m + 2*; 30 % of its cost is paid at order and 70 % one
month after receipt. Prepayments are 30 % of units in transit; payables are 70 % of received-not-yet-
paid cost. At M60 both are **EUR 0.00 in all three scenarios** because the last receipt falls in M59
and its balance is paid in M60, and no order remains in transit at the horizon end. Inventory
purchases cash over the horizon is EUR 1 541 872.72 BASE,
EUR 209 338.10 DOWNSIDE and EUR 4 016 463.75 UPSIDE; COGS is EUR 1 521 869.39, EUR 195 285.88 and
EUR 3 974 165.07 — see D06 §4–§5 for the inventory model and the full purchases-cash bridge. The
inventory working-capital outflow is the change in inventory asset less the change in payables:
BASE EUR 20 003.33 = asset increase 20 002.61 (+EUR 0.72 rounding); DOWNSIDE EUR 14 052.22 =
14 052.12 (+0.10); UPSIDE EUR 42 298.68 = 14 978.20 + write-off 27 320.28 (+0.20). Obsolescence is a
non-cash write-off cost (EUR 0.00 DOWNSIDE and BASE; EUR 27 320.28 UPSIDE) recognised in contribution
and added back in the working-capital movement, so it does not become a second cash outflow.

## 5. VAT treatment

VAT is a pass-through, never revenue (**A-04**). The model uses the Spain 21 % illustration rate
(ASM-MC13-001/002, inherited and disclosed, not tax advice), 100 % recoverable input VAT
(ASM-MC13-010) and a **one-month payment lag** (ASM-MC13-009):

```
inputVat[m] = 21% x inventoryReceiptsCost[m] x recoverable share
vatPaid[m]  = max(0, vatOutput[m-1] - inputVat[m-1] + creditCarryForward)
```

Input VAT is computed on inventory **receipts cost**, not on units sold, and credit is carried
forward. The VAT position now clears: an early input-VAT credit (peaking at EUR 6 192.78 BASE,
5 040.49 DOWNSIDE, 10 040.63 UPSIDE) is fully absorbed, **no credit remains at M60** and VAT is paid
in cash from the first payment month onward — 20 952.17 DOWNSIDE, 317 758.93 BASE and 1 076 693.05
UPSIDE over the horizon. The M60 output-minus-input balance is due in `M61` (outside the horizon):
EUR 1 928.49 DOWNSIDE, EUR 16 733.11 BASE, EUR 49 216.72 UPSIDE. `cashCollectionsNetOfVat` equals
`cashReceiptsGross − vatPaid` (BASE EUR 4 002 334.08; DOWNSIDE 432 684.74; UPSIDE 11 852 509.62). No
VAT refund is modelled and no credit is written off. VAT figures (EUR, M01–M60 cumulative):

| Metric | DOWNSIDE | BASE_HYPOTHETICAL | UPSIDE_HYPOTHETICAL |
|---|---:|---:|---:|
| Output VAT (`vatOutput`) | 66 841.65 | 658 285.24 | 1 969 367.21 |
| Recoverable input VAT on receipts | 43 960.99 | 323 793.20 | 843 457.44 |
| VAT paid in cash | 20 952.17 | 317 758.93 | 1 076 693.05 |
| Net VAT cash (`vatCollected - vatPaid`) | 45 889.48 | 340 526.31 | 892 674.16 |
| Credit carried forward at M60 | 0.00 | 0.00 | 0.00 |
| M60 balance paid in M61 | 1 928.49 | 16 733.11 | 49 216.72 |

BASE output VAT splits into hardware EUR 350 057.73 and subscription EUR 308 227.51. The lag identity
is recomputed by **A-12**; `grossInvoicedRevenue − refundsAllowance − vatOutput − deferredRevenueEnd
= netRecognizedRevenue` holds in all three scenarios and all reporting views.

## 6. Cash-flow identity and BASE_HYPOTHETICAL bridge

Identities enforced by the contract and the validator:

```
operatingCashFlow[m] = ebitdaLikeConditional[m] - workingCapitalMovement[m] - 0
workingCapitalMovement[m] = netRecognizedRevenue[m] - cashReceiptsGross[m] + vatPaid[m]
                            + (inventoryPurchasesCash[m] - cogsHardware[m])
                            - inventoryWriteOffCost[m]
netCashFlow[m] = operatingCashFlow[m] + investingCashFlow[m]
cumulativeCashBalance[m] = cumulativeCashBalance[m-1] + netCashFlow[m]     (opening cash 0)
financingRequirement[m] = max(financingRequirement[m-1], max(0, -cumulativeCashBalance[m]))
```

The `- 0` term is deliberate: payment-processing fees are already inside `ebitdaLikeConditional`
(through `knownVariableContribution`), so subtracting them again would double count them. Contract
check IDs **A-13**–**A-16** (opening cash, operating cash and working-capital definition, net cash,
financing requirement) are recomputed by `scripts/check-marea-financial-model.mjs`. Opening cash is
zero by declared convention (ASM-MC13-044); EMBARCARTE's true cash is `UNKNOWN` (ASM-MC13-045,
BLK-FIN-07).

BASE_HYPOTHETICAL bridge, EUR, M01–M60 (from `monthly-financial-model.json`; views in
`scenario-results.json` match):

| Line | Amount |
|---|---:|
| Net recognised revenue | 3 426 647.12 |
| Less COGS | −1 521 869.39 |
| Less software direct costs | −147 268.21 |
| Less payment fees | −65 353.40 |
| Less inventory carrying cost | −3 929.26 |
| Less inventory write-off cost (non-cash) | 0.00 |
| **Known variable contribution** | **1 688 226.86** |
| Less fixed operating-cost envelope | −2 306 288.64 |
| **EBITDA-like conditional** | **−618 061.78** |
| Less working-capital movement | +555 683.63 |
| **Operating cash flow** | **−62 378.15** |
| Less capex cash (investing) | −402 500.00 |
| **Net cash flow** | **−464 878.15** |
| Opening cash convention | 0.00 |
| **Cumulative cash balance at M60** | **−464 878.15** |
| Financing requirement (trough at M27) | 995 185.23 |

Working-capital movement decomposition (BASE): net revenue − cash receipts = −893 445.89; VAT paid
+317 758.93; inventory purchases minus COGS = +20 003.33; less non-cash write-off = 0.00; total
**−555 683.63** (a cash release). Operating cash flow can also be written directly as
`cashReceiptsGross − vatPaid − software − paymentFees − carrying − fixedOpex − purchasesCash`
= 4 320 093.01 − 317 758.93 − 147 268.21 − 65 353.40 − 3 929.26 − 2 306 288.64 − 1 541 872.72 =
**−62 378.15**, identical to the EBITDA-minus-working-capital route.

## 7. Inventory purchases are not counted twice

Goods purchased become an asset and are expensed only when sold, so a unit must never be both a
working-capital cash outflow and an operating expense. The model proves this algebraically:

```
operatingCashFlow = ebitdaLikeConditional - workingCapitalMovement
                  = [Rev - COGS - software - fees - carrying - writeOff - fixedOpex]
                    - [Rev - cashReceipts + vatPaid + purchasesCash - COGS - writeOff]
                  = cashReceipts - vatPaid - software - fees - carrying - fixedOpex - purchasesCash
```

The COGS term appears **+1 and −1** and the write-off term **+1 and −1**, so both cancel exactly.
What remains contains COGS only inside EBITDA (goods sold) and inventory cash only as
`−purchasesCash` (goods bought), never the same unit in both places. The numerical proof is the
identity of the two routes above (EUR −62 378.15 each). The difference between purchases cash and
COGS (**EUR 20 003.33**) is not an expense: it is the inventory asset increase plus payables timing
(EUR 0.72 monthly-rounding residual), as quantified in D06 §5. Identities **A-09/A-10/A-11** enforce
COGS on sold units, the unit inventory identity and the purchases-cash/COGS/payables reconciliation.

## 8. Financing requirement and cumulative cash by scenario

From `scenario-results.json` (the same figures appear in `MC13-GENERATED-FIGURES.md`); views are
cumulative through the month shown:

| Scenario | View | Net cash flow | Cumulative cash | Financing requirement |
|---|---|---:|---:|---:|
| `RESTRICTED_CURRENT` | M12 / M36 / M60 | UNKNOWN (`null`) | UNKNOWN | UNKNOWN |
| `DOWNSIDE` | M12 | −1 029 199.90 | −1 029 199.90 | 1 029 199.90 |
| `DOWNSIDE` | M36 | −2 076 734.66 | −2 076 734.66 | 2 076 734.66 |
| `DOWNSIDE` | M60 | −3 081 802.04 | −3 081 802.04 | 3 081 802.04 |
| `BASE_HYPOTHETICAL` | M12 | −853 063.06 | −853 063.06 | 853 063.06 |
| `BASE_HYPOTHETICAL` | M36 | −943 893.07 | −943 893.07 | 995 185.23 |
| `BASE_HYPOTHETICAL` | M60 | −464 878.15 | −464 878.15 | 995 185.23 |
| `UPSIDE_HYPOTHETICAL` | M12 | −596 117.18 | −596 117.18 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M36 | 1 361 732.20 | 1 361 732.20 | 621 240.91 |
| `UPSIDE_HYPOTHETICAL` | M60 | 5 311 017.86 | 5 311 017.86 | 621 240.91 |

Drivers per scenario, EUR M01–M60: capex cash 402 500.00 / 503 125.00 / 342 125.00 (capex
multipliers 1.00 / 1.25 / 0.85, ASM-MC13-040/039/041); inventory purchases cash 1 541 872.72 /
209 338.10 / 4 016 463.75; fixed operating-cost envelope 2 306 288.64 / 2 780 925.36 / 1 511 192.40;
software direct costs 147 268.21 / 12 502.05 / 470 673.74; payment fees 65 353.40 / 6 922.08 /
194 072.07; VAT paid 317 758.93 / 20 952.17 / 1 076 693.05; refunds paid in cash 62 381.43 /
8 018.35 / 162 941.70 (BASE / DOWNSIDE / UPSIDE). The BASE trough is at M27 (drawdown EUR 995 185.23
while cumulative cash at M60 is EUR −464 878.15); the UPSIDE trough is at M10 (EUR 621 240.91) and
DOWNSIDE remains negative to M60. Conditional break-even months from `break-even-thresholds.json`:
BASE operating **M39**, cash-flow **M23**, cumulative recovery **not within M60**; DOWNSIDE none (all
`UNKNOWN`); UPSIDE operating **M15**, cash-flow **M11**, cumulative recovery **M23**. These are
conditional thresholds under labelled assumptions, not verified company break-evens; unknown cost
inputs are excluded and would make the true requirement higher.

`RESTRICTED_CURRENT` has zero authorized sales and `null` monetary cash columns, with the suppression
reason recorded in `monthly-financial-model.json`: company cash, current expenses, financing and
unknown cost inputs are `UNKNOWN` and stored as `null`, never as zero.

## 9. Unknown working-capital exposures

| Exposure | Status | Effect / direction |
|---|---|---|
| Supplier MOQ, lead time, deposit and balance terms (BLK-FIN-03, UNK-HW-09) | `UNKNOWN`; modelled as 25 units / 2 months / 30–70 | Different real terms change every purchase-cash month and the financing requirement |
| FX exposure (BLK-FIN-08, UNK-HW-06) | `UNKNOWN`; `fxHedgeExists: false`; inherited EUR/USD conversion is an engineering assumption | Unit costs are fixed inside the horizon; a re-valued BOM would move both COGS and cash |
| Returns, withdrawals and obsolescence (BLK-FIN-12, UNK-HW-05) | `UNKNOWN`; refunds modelled and paid in cash at 3 % of hardware gross; write-downs at 5 %/yr | No measured return rate; higher returns reduce net revenue and cash (stress ST-07) |
| Credit facility / company cash / financing (BLK-FIN-13, BLK-FIN-07) | `UNKNOWN`; no facility; opening cash convention 0 | No borrowing is modelled; the requirement must be funded externally and the true cash position is unknown |
| VAT/OSS and input-VAT recovery (BLK-FIN-09) | `UNKNOWN`; 21 % illustration, 100 % recoverable | VAT paid EUR 20 952.17–1 076 693.05 and M60 balances of 1 928.49–49 216.72 depend on the unconfirmed treatment |
| Product liability insurance, CRA lifecycle cost, data licences | `UNKNOWN`; excluded from EBITDA-like | The conditional cash requirement is understated by these fixed costs |

No supplier term, customer term, credit agreement or return agreement may be cited from this
document; none exists. The named stress case **ST-07** (warranty/returns doubled to 6 %) is correctly
adverse in the final snapshot: financing requirement EUR 1 012 627.43 and cumulative cash
EUR −516 651.57 (`data/stress-tests.json`).

## 10. Checks performed and boundary

Read-only verification (only D06 and D10 were written): receivables identity and 2-month lag
recomputed month by month for all three hypothetical scenarios, non-negative receivables and
channel-adjusted distributor invoicing (**A-28**); refunds paid in cash equal to the allowance
(**A-27**); VAT lag identity recomputed (0 mismatches); deferred-revenue identity; operating, net and
cumulative cash identities and the financing requirement recomputed for every month; purchases-vs-
COGS bridge recomputed (D06 §5); per-scenario view totals matched to `scenario-results.json` and
`MC13-GENERATED-FIGURES.md`. The MC-13 validator was run on this snapshot: **77 checks, 74 PASS**; its
model arithmetic checks (`A-06`, `A-08`, `A-11`–`A-16`, `A-27`, `A-28`, `V-15`, `V-16`, `R-06`) PASS,
and the only failures are the open independent-review findings (V-19, D-07) and the still-missing
`MC-13-DELIVERY.md` (D-02).

**Correction note (audit lineage).** Successive working snapshots required correction: aliased
per-SKU distributor collections (which produced negative trade receivables), input VAT computed on
units sold, a declared safety-stock month not consumed, an unexpensed write-off value, then an
inventory-planning (MRP) revision to a 1-month-buffer plan and, after independent audit, two further
fixes — refunds are now paid in cash and distributor invoicing uses the channel-adjusted VAT-inclusive
trade price instead of list price ×1.21. The figures here are the final audited `2026-11-02` snapshot;
corrections are recorded for lineage only and are not presented as the current state.

All figures are conditional, hypothetical and pre-revenue. No term, credit line, hedge, receivable or
payable exists; no financing is approved; cumulative cash and financing requirement are model outputs
under labelled assumptions, not forecasts. MC-13 does not approve a price, does not authorize
procurement or financing, does not start MC-14 and asserts no break-even.
