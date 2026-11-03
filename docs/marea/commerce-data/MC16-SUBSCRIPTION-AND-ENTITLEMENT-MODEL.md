# MC-16 D10 — Subscription and entitlement model

| Field | Value |
|---|---|
| Document ID | MC-16 / D10 / MC16-SUBSCRIPTION-AND-ENTITLEMENT-MODEL |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Status | `INTERNAL_ONLY` — 0 real subscriptions, 0 real grants, `billingImplemented = false`, no ledger service |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` |
| Authority | `data/subscription-plans.json`; `data/entitlement-definitions.json`; `data/entitlement-mappings.json`; `schema.ts`; `domain.ts` |
| Downstream owner | Future account/entitlement/billing service — `NOT_AUTHORIZED` |

## 1. Purpose and boundary

This document defines the separation between a **plan**, a **billing contract**,
an **entitlement definition** and an **entitlement grant**, and fixes the rules
that prevent double billing and prevent any commercial state from disabling a
local safety function. It is a contract for a future service, not that service.

Current state:

- **13** subscription plan definitions; **12** entitlement definitions; **4**
  shared ledger keys.
- **0 real subscriptions**, **0 real entitlement grants**, **0 billing
  contracts**, **0 invoices**, **0 payment records**.
- `billingImplemented = false`; `entitlementLedgerActive = false`;
  `checkoutAllowed = false`; every plan has `realContractExists = false`.
- `evaluatePurchasability()` returns `allowed = false`; no subscription can be
  bought, renewed, charged or activated in MC-16.

## 2. The four layers (and the two that do not exist)

| Layer | What it is | MC-16 representation | Count | May charge money? |
|---|---|---|---|---:|---|
| **Plan** | Catalogue shape of a recurring offer: plan key, family, period, entitlement reference | `marea_subscription_plans` / `subscription-plans.json` | 13 | **No** |
| **Billing contract** | The customer-specific legal/commercial agreement: parties, price, term, renewal, cancellation, tax, payment method | **No table and no record**; `realContractExists = false` | **0** | No — billing is not implemented |
| **Entitlement definition** | A capability specification: what right exists, its ledger key, term, data dependency and safety flag | `marea_entitlement_definitions` / `entitlement-definitions.json` | 12 | **No** |
| **Entitlement grant** | An actual right held by a scope (account, organisation, tenant, vessel, device), with start/end, basis and audit | `marea_entitlement_grants` / `entitlement-definitions.json#grants` | **0** | No |
| **Order / invoice / payment** | A transaction and its money movement | **Does not exist in MC-16** | 0 | No |

The separation is binding: a plan is not a contract; a contract is not a grant;
a definition is not a grant; none of them is an invoice. A future service must
never infer a grant from a plan row, a contract from a plan price, or a charge
from a grant.

## 3. Subscription plans (13)

All plans share `billingMode = DEFINED_NOT_ACTIVE`, `checkoutAllowed = false`,
`autoRenew = false` and `realContractExists = false`.

| Plan ID | Plan key | Bundle reference | Family | Period | Entitlement | Commercial status (dataset) |
|---|---|---|---|---|---|---|
| `RS-ST-01` | `NAV_PRO_SUBSCRIPTION` | START | NAV | YEAR | `ENT-NAV-PRO` | `HYPOTHESIS_UNAPPROVED` |
| `RS-ST-02` | `WEATHER_SUBSCRIPTION` | START | WEATHER | YEAR | `ENT-WEATHER` | `HYPOTHESIS_UNAPPROVED` |
| `RS-CR-01` | `NAV_ESSENTIAL_SUBSCRIPTION` | CRUISE | NAV | YEAR | `ENT-NAV-ESSENTIAL` | `HYPOTHESIS_UNAPPROVED` |
| `RS-CR-02` | `WEATHER_SUBSCRIPTION` | CRUISE | WEATHER | YEAR | `ENT-WEATHER` | `HYPOTHESIS_UNAPPROVED` |
| `RS-SL-01` | `NAV_PRO_SUBSCRIPTION` | SAIL | NAV | YEAR | `ENT-NAV-PRO` | `HYPOTHESIS_UNAPPROVED` |
| `RS-SL-02` | `PILOT_LOCAL_SAFETY` | SAIL | PILOT | NONE | `ENT-PILOT-LOCAL` | `NOT_APPLICABLE` |
| `RS-PR-01` | `WATCH_MONITORING_SUBSCRIPTION` | PROTECT | WATCH | MONTH | `ENT-WATCH` | `HYPOTHESIS_UNAPPROVED` |
| `RS-PR-02` | `SIM_DATA_PLAN` | PROTECT | — (external) | MONTH | `ENT-SIM` | `NOT_ESTABLISHED` |
| `RS-CP-01` | `NAV_PRO_SUBSCRIPTION` | COMPLETE | NAV | YEAR | `ENT-NAV-PRO` | `HYPOTHESIS_UNAPPROVED` |
| `RS-CP-02` | `WATCH_MONITORING_SUBSCRIPTION` | COMPLETE | WATCH | MONTH | `ENT-WATCH` | `HYPOTHESIS_UNAPPROVED` |
| `RS-CP-03` | `WEATHER_SUBSCRIPTION` | COMPLETE | WEATHER | YEAR | `ENT-WEATHER` | `HYPOTHESIS_UNAPPROVED` |
| `RS-FP-01` | `FLEET_SAAS_SUBSCRIPTION` | FLEET | FLEET | MONTH | `ENT-FLEET` | `HYPOTHESIS_UNAPPROVED` |
| `RS-FP-02` | `WATCH_MONITORING_SUBSCRIPTION` | FLEET | WATCH | MONTH | `ENT-WATCH` | `HYPOTHESIS_UNAPPROVED` |

**Field mapping.** The dataset's `status` field records the commercial
definition status (hypothesis / not applicable / not established). The SQLite
plan `status` column is lifecycle (`DEFINED_NOT_ACTIVE`, `SUSPENDED`,
`RETIRED`) and must be `DEFINED_NOT_ACTIVE` for every current plan. The plan's
`price_status` column carries the same hypothesis/not-established distinction as
the price model. No row may be inserted as `ACTIVE`, `SUSPENDED` or `RETIRED`
during MC-16.

`RS-PR-02` (`SIM_DATA_PLAN`) is an external connectivity plan, not a MAREA
right; `RS-SL-02` (`PILOT_LOCAL_SAFETY`) is a non-billable local capability and
is `NOT_APPLICABLE` as a subscription. Neither may be presented as a MAREA
subscription product.

## 4. Entitlement definitions (12)

| Entitlement | Capability key | Family | Term | Shared ledger key | Status | Licensed data |
|---|---|---|---|---|---|---|
| `ENT-NAV-PRO` | `NAV_PRO_SUBSCRIPTION` | NAV | YEAR | `ACCOUNT:NAV_PRO` | `HYPOTHESIS_UNAPPROVED` | No |
| `ENT-NAV-ESSENTIAL` | `NAV_ESSENTIAL_SUBSCRIPTION` | NAV | YEAR | `ACCOUNT:NAV_ESSENTIAL` | `HYPOTHESIS_UNAPPROVED` | No |
| `ENT-WEATHER` | `WEATHER_SUBSCRIPTION` | WEATHER | YEAR | `ACCOUNT:WEATHER` | `HYPOTHESIS_UNAPPROVED` | **Yes** |
| `ENT-WATCH` | `WATCH_MONITORING_SUBSCRIPTION` | WATCH | MONTH | `ACCOUNT:WATCH_MONITORING` | `HYPOTHESIS_UNAPPROVED` | No |
| `ENT-FLEET` | `FLEET_SAAS_SUBSCRIPTION` | FLEET | MONTH | `ORGANIZATION:FLEET_VESSEL` | `HYPOTHESIS_UNAPPROVED` | No |
| `ENT-DISPLAY` | `DISPLAY_BASE_SOFTWARE` | DISPLAY | NONE | `DEVICE:DISPLAY` | `NOT_APPLICABLE` | No |
| `ENT-PILOT-LOCAL` | `PILOT_LOCAL_SAFETY` | PILOT | NONE | `LOCAL:SAFETY_NOT_BILLABLE` | `NOT_APPLICABLE` | No |
| `ENT-SENSE-LOCAL` | `SENSE_LOCAL_SENSING` | SENSE | NONE | `LOCAL:SAFETY_NOT_BILLABLE` | `NOT_APPLICABLE` | No |
| `ENT-AIS` | `AIS_RECEIVE_ONLY` | AIS | NONE | `DEVICE:AIS_RECEIVE_ONLY` | `NOT_APPLICABLE` | No |
| `ENT-CHART` | `CHART_DATA_LICENCE` | — (external) | YEAR | `DATA_PROVIDER:CHARTS` | **`BLOCKED`** | **Yes** |
| `ENT-SIM` | `SIM_DATA_PLAN` | — (external) | MONTH | `CONNECTIVITY_PROVIDER:SIM` | `NOT_ESTABLISHED` | No |
| `ENT-CLOUD-MONITORING` | `CLOUD_MONITORING` | WATCH | MONTH | `ACCOUNT:WATCH_MONITORING` | `HYPOTHESIS_UNAPPROVED` | No |

`ENT-CHART` and `ENT-SIM` are external rights. The ledger may record their state
for display, but MAREA cannot grant, transfer, resell or guarantee a third-party
right it does not hold. `ENT-CLOUD-MONITORING` shares the WATCH account ledger
key and is never sold separately from a WATCH monitoring subscription.

Every definition has `doubleBillingAllowed = false` and
`gatesLocalSafety = false`. The latter flag means "this definition would gate a
local safety function"; it must remain `0` because gating local safety is
prohibited. The evaluator rejects any definition that sets it to `1`
(`LOCAL_SAFETY_MUST_NOT_BE_GATED`, `domain.ts:783`).

## 5. One ledger and no double billing

### 5.1 Ledger rule

One customer account has one logical entitlement ledger. A bundle or upgrade
writes or recognises lines in that ledger; it does not create a second book of
rights. Each line records its source (standalone, bundle, upgrade, migration)
and its canonical ledger key.

The four shared ledger keys are:

| Ledger key | Canonical entitlement | Rule |
|---|---|---|
| `ACCOUNT:NAV_PRO` | `ENT-NAV-PRO` | One NAV Pro entitlement per account; repeated bundle references resolve to one active right |
| `ACCOUNT:WEATHER` | `ENT-WEATHER` | One WEATHER entitlement ledger; overlapping NAV/WEATHER surfaces never create a second charge |
| `ACCOUNT:WATCH_MONITORING` | `ENT-WATCH` | One WATCH monitoring entitlement per account/device/vessel, whether from PROTECT, COMPLETE or FLEET |
| `ORGANIZATION:FLEET_VESSEL` | `ENT-FLEET` | FLEET subscription is organisation/vessel-scoped; no cross-tenant grant |

### 5.2 Deduplication algorithm

`resolveEntitlementDependencies()` (`domain.ts:717-764`) sorts grants by
`grantId`, resolves each definition, ignores non-active/expired grants for
billing, and computes a dedupe key:

```text
sharedLedgerKey | scopeType | scopeId
```

The first active grant for a key is canonical (`CANONICAL_LEDGER`). Any later
grant for the same key/scope is non-billable, resolved as
`DEDUPED_SHARED_LEDGER` and recorded in `duplicates` with reason
`DUPLICATE_BILLING_PREVENTED`. Unknown definitions resolve to `UNKNOWN_DEFINITION`
and are never billable. The returned `billableLedgerKeys` are the canonical keys
only.

This is a deterministic rule; the credit/proration arithmetic for upgrades is
`OPEN`, not implemented, and not approximated in MC-16.

### 5.3 NAV / WEATHER shared-ledger rule

- WEATHER can be bought standalone (`WEATHER-STANDARD` / `WEATHER-PRO`); the same
  `ACCOUNT:WEATHER` ledger is used.
- NAV Pro may include WEATHER Standard-equivalent **read access only where
  provider rights allow**. Until a provider agreement exists, NAV Pro includes
  **no** WEATHER entitlement.
- Where read access is included, it is a WEATHER grant in the same
  `ACCOUNT:WEATHER` ledger; a second WEATHER purchase resolves to the same ledger
  key and is not billed again.
- WEATHER Standard → Pro applies a prorated credit (D-013 hypothesis); the
  arithmetic is `OPEN`. A bundle upgrade charges only for the entitlement that is
  not already held.
- Cancelling NAV never deletes user-owned WEATHER records. Cancelling WEATHER
  never deletes NAV records.
- No double billing does **not** mean free data: licensed chart/weather data
  rights remain external, provider-scoped and `BLOCKED` until `GATE-DATA-LICENSING`
  closes.

## 6. WATCH local safety independence

The WATCH monitoring subscription (`ENT-WATCH`) buys remote service — cloud
ingestion, notification and shore storage. It does **not** buy the device's local
measurement, local alarms, local buffering or stale/unknown display.

| State / event | Remote WATCH service | Local measurement | Local alarms | Local buffering | Local export |
|---|---|---|---|---|---|
| Subscription active | Available | Continues | Continues | Continues | Available |
| Subscription expires | Stops after the documented effective date | Continues | Continues | Continues | Offered |
| Payment failure / grace exhausted | Stops per documented grace rules | Continues | Continues | Continues | Offered |
| Cancellation | Stops on the stated effective date | Continues | Continues | Continues | Offered |
| Connectivity lost | Unavailable, honest state | Continues | Continues | Continues | — |
| Account locked | Unavailable | Continues | Continues | Continues | Via support/export process |
| Entitlement server unreachable | Unavailable, failure visible | Continues | Continues | Continues | — |

`ENT-PILOT-LOCAL` and `ENT-SENSE-LOCAL` use the non-billable
`LOCAL:SAFETY_NOT_BILLABLE` ledger key and are `NOT_APPLICABLE` as commercial
subscriptions. No WATCH, NAV, WEATHER, FLEET or bundle state may disable PILOT
manual steering, independent local steering control, valid SENSE measurement,
required local alarms or an approved safety fallback (`SEC-MC16-14`).

This independence is a **design requirement**, not a tested behaviour: there is
no WATCH subscription service, notification pipeline, billing service or
entitlement server to test against (`WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`).
It does not claim the device is safe, that alerts were delivered or that the
PILOT safety gate is closed.

## 7. Entitlement grants

A grant is the only object that says a right is actually held. Current state:
**0 grants**.

| Field | Contract |
|---|---|
| `grant_id` | Stable identity |
| `entitlement_id` | FK to a definition |
| `scope_type` | `ACCOUNT`, `ORGANIZATION`, `TENANT`, `VESSEL`, `DEVICE` |
| `scope_id` | Non-empty opaque scope identity, resolved server-side |
| `state` | `DRAFT`, `ACTIVE`, `EXPIRED`, `REVOKED` |
| `basis` | `SYNTHETIC_TEST`, `CONTRACT`, `PURCHASE`, `MIGRATION` |
| `synthetic` | Must be `1` in MC-16 |
| `starts_at`, `ends_at` | Valid dates; an active grant with `ends_at` must end after it starts |
| `actor_id`, `audit_event_id` | Required; the grant is auditable |

Rules:

1. Every MC-16 grant must be synthetic (`SYNTHETIC_TEST`). The table has
   `CHECK (synthetic = 1)` and a trigger rejecting `synthetic = 0` or a
   `CONTRACT` / `PURCHASE` / `MIGRATION` basis
   (`MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED`). No real right can be created.
2. `validateEntitlementGrant()` requires an `ENTITLEMENT_ADMIN` actor, a
   definition, a basis, an audit event, a valid start, a non-expired end, no
   active billing implementation, no checkout authorisation and no local-safety
   gating (`domain.ts:766-786`).
3. An `ACTIVE` grant requires its definition to be `ACTIVE`; current definitions
   are hypothesis/blocked/not-established/not-applicable, so no current
   definition can back a real active grant.
4. Grant scope is checked exactly; a grant for one scope never authorises
   another (D11).
5. Grant state changes are audited; the audit event is not optional.

## 8. Subscription activation guards

| Guard | Database enforcement | Result |
|---|---|---|
| Checkout disabled | `checkout_allowed INTEGER CHECK (checkout_allowed = 0)` | No plan can enable checkout |
| Auto-renew disabled | `auto_renew INTEGER CHECK (auto_renew = 0)` | No silent renewal |
| Plan lifecycle | `status` limited to `DEFINED_NOT_ACTIVE`, `SUSPENDED`, `RETIRED`; current rows must be `DEFINED_NOT_ACTIVE` | No active plan |
| Billing mode | `billing_mode IN ('DEFINED_NOT_ACTIVE','CONTRACT_ONLY')` | No billing engine state |
| Activation trigger | `trg_marea_subscription_activation_guard` rejects `checkout_allowed = 1` or a non-definition state | Fail closed |
| Real grant trigger | `trg_marea_entitlement_real_grant_guard` rejects any non-synthetic grant | Fail closed |

No trigger, test, admin action or configuration flag may enable a subscription
during MC-16. A future activation requires a deliberate migration and the
release-gate set.

## 9. Billing is false — what that means

- No payment provider, merchant agreement, tokenisation flow, dunning process,
  invoice, credit note, proration engine or refund path exists.
- `billingImplemented = false` and `entitlementLedgerActive = false`; a grant
  evaluator returns `BILLING_NOT_IMPLEMENTED` if a subscription claims billing is
  implemented (`domain.ts:781`).
- A price hypothesis is not a subscription charge. `priceStatus` on a plan is
  `HYPOTHESIS_UNAPPROVED`, `NOT_ESTABLISHED` or `NOT_APPLICABLE`.
- Renewal terms, grace period, cancellation mechanics, data-export window,
  proration arithmetic, taxes and invoice content are `OPEN`/`BLOCKED`.
- "Cancel anytime", "no commitment", "lifetime", "free trial" and any implied
  charge are prohibited wording until the mechanics exist and are approved.

## 10. Current proof and verification

| Check | Method | Result |
|---|---|---|
| 13 plan definitions | `subscription-plans.json` | 13 |
| 12 entitlement definitions | `entitlement-definitions.json` | 12 |
| 4 shared ledger keys | `entitlement-mappings.json#sharedLedgers` | 4 |
| 0 real subscriptions | `currentState.realSubscriptionsCreated`; `realContractExists=false` | 0 |
| 0 real grants | `currentState.realEntitlementsGranted`; `grants: []` | 0 |
| Billing false | `currentState.billingImplemented`; manifest flags | `false` |
| Checkout false | every plan `checkoutAllowed=false`; schema CHECK | `false` |
| No double billing rule | `resolveEntitlementDependencies` | Dedupe deterministic |
| Local safety independence | definitions + evaluator + isolation table | Design requirement |
| Data validator | `node scripts/check-marea-commerce-data.mjs` | 1,730/1,730 checks passed |

## 11. Acceptance criteria

| ID | Criterion | Current status |
|---|---|---|
| D10-AC-01 | Plan, billing contract, entitlement definition and grant are separate objects; no object is inferred from another | **PASS (contract)** |
| D10-AC-02 | 0 real subscriptions and 0 real grants; all MC-16 grants synthetic | **PASS (data + schema trigger)** |
| D10-AC-03 | `billingImplemented = false`; no charge, invoice or renewal can occur | **PASS (current state)** |
| D10-AC-04 | NAV/WEATHER share the canonical ledger model and cannot be billed twice | **PASS (rule + evaluator)**; no live ledger |
| D10-AC-05 | WATCH subscription state never gates local measurement, alarms, buffering or PILOT steering | **PASS (design)**; **NOT TESTED** — no service exists |
| D10-AC-06 | No plan can enable checkout or auto-renew | **PASS (schema CHECK + trigger)** |
| D10-AC-07 | Every grant is scoped and cross-tenant use is denied | **PASS (evaluator)**; see D11 |
| D10-AC-08 | A plan's hypothesis price is never treated as an approved charge | **PASS (status separation)** |

## 12. Open items and blockers

- No billing contract, price approval, renewal terms, grace period, proration,
  invoice, tax or refund process exists.
- WATCH monitoring service, notification pipeline, device identity and
  connectivity contract are `NOT_FOUND`; the local-safety isolation is untested.
- WEATHER/NAV provider rights are `BLOCKED`; chart/weather entitlements are
  external and cannot be granted by MAREA.
- FLEET grant scope is organisation/vessel-bound but the current schema stores a
  single scope per grant; the composite-scope gap is recorded in D11.
- `GATE-CONSUMER-TERMS`, `GATE-PAYMENTS`, `GATE-PRICING`, `GATE-DATA-LICENSING`,
  `GATE-PRIVACY-DPA-DPIA` and `GATE-CRA-CYBERSECURITY` remain open.

## 13. References

- `data/subscription-plans.json` — 13 plans and current state.
- `data/entitlement-definitions.json` — 12 definitions and empty grants.
- `data/entitlement-mappings.json` — ledger keys, bundle references, isolation
  rules.
- `src/server/marea-commerce/schema.ts:262-318, 459-471` — plans, definitions,
  dependencies, grants and guards.
- `src/server/marea-commerce/domain.ts:717-786` — ledger resolution and grant
  validation.
- `docs/marea/bundles/BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md:46-108, 144-247`
  — one-ledger rule, NAV/WEATHER, WATCH isolation and FLEET scope.
- `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` — alert,
  delivery and privacy boundaries.
- `MC16-FLEET-TENANCY-AND-VESSEL-SCOPING.md` (D11) — tenant and vessel scope.
- `MC16-PRICE-APPROVAL-VAT-AND-TERRITORY-MODEL.md` (D08) — price is not a charge.

**Status statement.** This document is an internal design contract. It creates no
subscription, contract, grant, invoice, charge or billing service, and it does
not authorise any sale or renewal.
