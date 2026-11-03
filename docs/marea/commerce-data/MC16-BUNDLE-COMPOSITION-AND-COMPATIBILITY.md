# MC-16 — Bundle composition and compatibility (D05)

| Field | Value |
|---|---|
| Bundles | 6 (`START`, `CRUISE`, `SAIL`, `PROTECT`, `COMPLETE`, `FLEET`) |
| Current state | `DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE` |
| Fixed package price | none (`fixedPackagePriceEstablished=false`) |
| Bundle checkout | `false` |
| Canonical data | `data/bundle-compositions.json` |
| Source | `docs/marea/bundles/bundle-definitions.json` |

## 1. What a bundle is

A `BundleDefinition` is a named composition of editions, entitlements and services. It
has a stable identity, reference configuration, required/optional/conditional components,
external requirements, exclusions, compatibility criteria, installation requirements,
subscription requirements, evidence references and gate dependencies.

A bundle is not a product family, not an edition, not a merchant SKU and not a price. It
does not by itself create stock, a sellable unit or a checkout line.

## 2. Canonical bundles

| Bundle | Reference configuration | Readiness | Restrictions |
|---|---|---|---|
| START | HUB-STANDARD + NAV-PRO | INTERNAL_ONLY_DEFINED | No fixed price |
| CRUISE | NAV-ESSENTIAL + HUB-STANDARD + AIS-RECEIVER + DISPLAY-7 | INTERNAL_ONLY_DEFINED | AIS-CONNECTED conditional; DISPLAY-LARGE ineligible |
| SAIL | NAV-PRO + HUB-STANDARD + PILOT-COASTAL + SENSE-WIND | BLOCKED | PILOT safety gate; quotation; PILOT-PRO ineligible |
| PROTECT | WATCH-CORE + SENSE-ESSENTIALS | INTERNAL_ONLY_DEFINED | Kit expands to POWER + BILGE, no duplicate |
| COMPLETE | NAV-PRO + HUB-PRO + DISPLAY-7 + WATCH-CORE + SENSE modules + PILOT-COASTAL | BLOCKED | PILOT quotation; PILOT-PRO and DISPLAY-LARGE ineligible |
| FLEET | FLEET-START/FLEET-BUSINESS + contracted services | INTERNAL_ONLY_DEFINED | Contracted B2B, no default hardware, no SLA, no self-service |

All six are `NOT_FOR_SALE`. All have `priceApproved=false`, `checkoutAllowed=false`,
`orderable=false`, `publicationAuthorized=false` and `indexationAuthorized=false`.

## 3. Component semantics

| Inclusion | Meaning | May become a priced line? |
|---|---|---|
| `INCLUDED` | Part of the reference configuration | No, not without a SKU and approved price |
| `OPTIONAL` | Customer may add it | No |
| `CONDITIONAL` | Only under an explicit condition | No |
| `QUOTATION_REQUIRED` | Vessel-specific survey/quotation | No |

Only existing editions may be components. Every component resolves to an edition in the
26-id set. Quantity is currently `1`; a duplicate edition in the same bundle is rejected.
External requirements (installation, cabling, licensed data, connectivity) are recorded
separately and are not silently converted into product lines.

## 4. Special composition rules

### 4.1 PILOT-PRO

`PILOT-PRO` is never a bundle component. It is recorded only as an ineligible
installation package. `SAIL` and `COMPLETE` remain `BLOCKED` because `PILOT-COASTAL`
requires a survey and quotation and the PILOT safety gate is open. No bundle provides a
fixed-price checkout path for a PILOT installation.

### 4.2 SENSE-ESSENTIALS

`PROTECT` contains one `SENSE-ESSENTIALS` line that expands exactly to `SENSE-POWER` and
`SENSE-BILGE`. It does not also contain those modules, and it does not duplicate
`WATCH-CORE`. Effective module quantities are POWER=1 and BILGE=1. The validator computes
the expansion and fails on a duplicate or inflated quantity.

### 4.3 FLEET

`FLEET` is a contracted B2B package, not a self-service checkout product. It is
`contractedSolution=true`, `hardwareIncludedByDefault=false`, `slaEstablished=false` and
`fixedPackagePriceEstablished=false`. `FLEET-ENTERPRISE` is contract-only and appears
only in `contractOnlyEditions`; no standard price or SLA is inferred. Onboarding,
connectivity, hardware and installation are separately quoted.

### 4.4 DISPLAY and AIS

`DISPLAY-LARGE-CONDITIONAL` is not selectable and is never a bundle component. The 7-inch
class is a working label, not a frozen size. AIS is receive-only; no transmission,
transponder or collision-avoidance capability is composed.

## 5. Eligibility

`evaluateBundleEligibility()` fails closed on:

- any open release gate;
- a bundle that is not `FOR_SALE`;
- a fixed package price without approval;
- an ineligible or contract-only component;
- a contracted B2B bundle presented as self-service;
- FLEET default hardware;
- an unresolved component edition;
- a component with a blocked safety state;
- a `PILOT-PRO` line;
- a component that is not for sale;
- a duplicated effective module.

Because all six bundles carry open gates and all editions are `NOT_FOR_SALE`, the current
result is `eligible=false` for every bundle. The absence of a fixed package price is
deliberate: no approved bundle price exists.

## 6. Compatibility truth

Compatibility status is `UNTESTED`. No row in the compatibility matrix has been verified
in this milestone. A bundle definition does not assert that its components physically
fit, communicate, or can be installed on a particular vessel. Those determinations remain
external evidence requirements for a later milestone.

## 7. Current result

```
bundles defined                 = 6
bundles commercially available  = 0
bundles with fixed price        = 0
bundles orderable               = 0
PILOT-PRO bundle lines          = 0
SENSE kit duplicate modules     = 0
FLEET default hardware          = false
FLEET SLA established           = false
```
