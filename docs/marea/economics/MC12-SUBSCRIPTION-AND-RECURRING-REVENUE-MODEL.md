# MC-12 D08 — Subscription and recurring revenue model

| Field | Value |
|---|---|
| Deliverable | D08 `MC12-SUBSCRIPTION-AND-RECURRING-REVENUE-MODEL.md` |
| Owner / date | `commercial-finance-pricing-strategist`, 2026-11-02 |
| Status | `INTERNAL_ECONOMICS_ANALYSIS` — every subscription price is `HYPOTHESIS_UNAPPROVED` |
| Machine companions | [unit-economics.json](data/unit-economics.json), [recurring-cost-inputs.json](data/recurring-cost-inputs.json), [bundle-economics.json](data/bundle-economics.json) |

## 1. Entitlement architecture inherited from MC-08

The subscription is a right recorded on a ledger, not a product feature toggle.
The inherited rules that MC-12 must respect are:

| Rule | Consequence for the model |
|---|---|
| `doubleBillingAllowed: false` for NAV and WEATHER | one data entitlement per account, never charged twice; the bundle cannot sum two identical licences |
| `gatesLocalSafety: false` on every entitlement | local alarms, measurement, device control and data export must survive subscription expiry; a subscription cannot be a safety gate |
| WATCH monitoring is required for *remote* monitoring only | local measurement and local alarms remain functional without it; the subscription pays for connectivity, cloud, notification and retention, not for the device |
| FLEET is per-vessel SaaS with an organisation ledger and **no default hardware** | the model must not add hardware to FLEET; onboarding is a separately quoted service |
| NAV renewal affects only the application entitlement | routes, waypoints and logbook remain exportable |
| Every subscription status is `HYPOTHESIS_UNAPPROVED` | no price, term or renewal behaviour is approved |

## 2. Conditional subscription economics (annualised, direct channel)

| SKU | Gross hypothesis | Net revenue/year | Known variable cost/year | Conditional contribution/year | Remaining headroom for unknown licence/usage | Recurring contribution |
|---|---|---|---|---|---|---|
| NAV Essential | EUR 99 incl. VAT | 81.82 | 10.43 | +71.39 | 71.39 | positive conditional |
| NAV Pro | EUR 149 incl. VAT | 123.14 | 12.42 | +110.72 | 110.72 (two data rights) | positive conditional |
| WEATHER Standard | EUR 49 incl. VAT | 40.50 | 5.45 | +35.05 | 35.05 | positive conditional |
| WEATHER Pro | EUR 89 incl. VAT | 73.55 | 7.04 | +66.51 | 66.51 | positive conditional |
| WATCH monitoring | EUR 9.90/month incl. VAT | 98.18 | 13.05 | +85.13 | connectivity/cloud contract gap | positive conditional |
| FLEET START | EUR 49/vessel/month excl. VAT | 588.00 | 37.08 | +550.92 | cloud/DPA/onboarding | positive conditional |
| FLEET BUSINESS | EUR 79/vessel/month excl. VAT | 948.00 | 42.48 | +905.52 | cloud/DPA/onboarding | positive conditional |

Known recurring cost components: card processing (1.5 % + EUR 0.25), cloud and
telemetry, cellular data, alert delivery, support allowance, and the 3 % returns
allowance. The data licence is **not** in the known cost because no right and no
price exist; that is precisely why NAV and WEATHER are `LICENSING_BLOCKED` and
their percentages are suppressed.

WATCH combined first-year conditional contribution at 100 units: EUR 56.21 hardware
+ EUR 85.13 service = **EUR 141.34 per device**, before the connectivity contract,
certification and any channel margin. This is the best consumer hardware-plus-service
structure the model can support, and it is still conditional.

## 3. Structures assessed

### A. Device ownership with optional cloud services (HUB, SENSE, DISPLAY)
Plausible and consistent with the portfolio: local functions work without a
subscription; the customer optionally buys cloud storage, remote access or
notifications. Economically, the hardware must stand on its own. HUB at EUR 349 does
not (EUR 7.30 conditional, negative under +20 % cost); DISPLAY does
(EUR 274.37). **Requires:** cloud/connectivity contract, support model, CRA
maintenance budget.

### B. Subscription-inclusive WATCH service
The strongest consumer structure: hardware plus a monitoring subscription that
pays for connectivity, cloud, notifications and retention. Conditional first-year
contribution is positive. **Requires:** a connectivity contract with a fair-use
limit, a cloud agreement and DPA, a notification provider, and an answer to what
happens offshore. **Risk:** the fixed EUR 0.25 payment fee plus 1.5 % on a EUR 9.90
monthly charge makes the monthly model fee-sensitive; annual prepayment would reduce
that, but changes the customer proposition and is not decided.

### C. NAV and WEATHER licensed-data packages
Structurally the highest contribution (NAV Essential 71.39 on 81.82 net; WEATHER
Standard 35.05 on 40.50 net) and the only products where the marginal cost is mostly
cloud and payment. **Blocked by rights:** the chart/weather licences do not exist,
so the subscription cannot be sold as defined. This is not a cost problem; it is a
licensing problem.

### D. FLEET per-vessel SaaS
The largest conditional headroom per unit (EUR 546-906 per vessel-year) because it is
hardware-free software. **Requires:** cloud contract, DPA, tenant-isolation design,
support model, onboarding service, telemetry-volume evidence and customer
willingness to pay. **Not** a margin claim: no fleet customer has been interviewed.

### E. Hardware-plus-service bundles
START and CRUISE are licensing-blocked through their chart entitlement; PROTECT is
negative at its historical price (see [D10](MC12-BUNDLE-ECONOMICS.md)); SAIL and
COMPLETE are quotation-only and safety-blocked through PILOT. No bundle subscription
is economically established.

## 4. Plausibility verdict per structure

| Structure | Economic plausibility | Blocking dependency | Decision |
|---|---|---|---|
| A. Device + optional cloud | conditional | cloud/connectivity contract; certification | keep as a design option; no price |
| B. WATCH subscription-inclusive | conditional-positive | connectivity + cloud + DPA | the most credible consumer service, still unvalidated |
| C. NAV/WEATHER data packages | high software margin, rights blocked | chart and weather licences | cannot be offered; priority evidence action |
| D. FLEET per-vessel SaaS | high conditional headroom | cloud contract, DPA, support, demand | priority software direction; no package price |
| E. Bundle + subscription | mixed to negative | licensing, safety, connectivity | defer except DISPLAY-led configurations |

**Rejected as currently specified:** a subscription that gates local safety
functions; a FLEET package with default hardware; a WATCH offering that promises
guaranteed alert delivery; any "lifetime" data entitlement; any price published as
approved.

## 5. Inactive state, retention and lifecycle costs

- An inactive subscription keeps account, identity and storage cost. The model
  assigns zero telemetry but retained storage and account cost, and it does not
  assume a suspended SIM is free.
- Telemetry retention is modelled at 12 months; alerts are retained for the same
  period. These are policy assumptions, not provider terms.
- The CRA support period (≥ 5 years, updates for 10 years or the support period)
  makes firmware/security maintenance a recurring engineering cost. It is **not**
  quantified: no engineering rate or scope exists, so it is carried as a fixed
  `UNKNOWN` and appears in every hardware record's `fixedCostsExcluded`.
- Data protection operations (DPIA, processor agreements, breach handling) are
  recurring operational costs and are `UNKNOWN`, not zero.

## 6. Pricing architecture constraints (not prices)

1. Annual prepayment reduces payment-fee regressivity and renewal exposure; it is
   not approved and no churn/renewal rate exists to support it.
2. A single data licence per account (NAV/WEATHER shared) is required by the
   portfolio rule and prevents double billing.
3. Upgrade mechanics (Essential → Pro) are `OPEN`; the model assumes no upgrade
   revenue.
4. No subscription may be presented as an approved offer, and no renewal reminder
   or checkout flow may carry these figures.
