# MC-16 — Release gates and purchasability policy (D07)

| Field | Value |
|---|---|
| Release gates | 13 |
| Gates closed | 0 |
| Current purchasability | `allowed=false` for every MAREA entity |
| Effective price | `null` |
| Effective stock | `null` |
| Authoritative function | `evaluatePurchasability()` |
| Canonical data | `data/release-gate-mapping.json`, `data/security-invariants.json` |

## 1. Inherited release gates

All thirteen MC-14 gates remain open. None may be closed by MC-16.

| Gate | Status | MC-16 dependency |
|---|---|---|
| GATE-MARKET-PLACEMENT | BLOCKED | No EU market placement, conformity, DoC, CE or traceability |
| GATE-SAFETY-PILOT | BLOCKED | PILOT unorderable; no safety or autonomy attribute |
| GATE-IP-CLEARANCE | BLOCKED | No brand, ownership or licence attribute |
| GATE-DATA-LICENSING | BLOCKED | No chart or weather licensed-data entitlement |
| GATE-PRIVACY-DPA-DPIA | BLOCKED | No customer, vessel or telemetry data activation |
| GATE-CRA-CYBERSECURITY | BLOCKED | No support-period or security attribute |
| GATE-CONSUMER-TERMS | BLOCKED | No order, renewal or withdrawal state machine |
| GATE-COMMERCIAL-CLAIMS | BLOCKED | No claim, compatibility or availability attribute |
| GATE-PRICING | BLOCKED | No customer-visible price or VAT representation |
| GATE-PAYMENTS | BLOCKED | No payment, refund or chargeback state |
| GATE-INSURANCE | BLOCKED | No insurance or liability statement |
| GATE-LEGAL-ENTITY | BLOCKED | No seller, merchant-of-record or invoice identity |
| GATE-WEBSITE-REMEDIATION | EVIDENCE_REQUIRED | Existing shop/legal/SEO surfaces stay blocked |

Each gate has a closure owner, required evidence list, affected family/bundle ids and a
risk reference. A gate is `CLOSED_VERIFIED` only with a valid, verified external evidence
record. The schema rejects a closed gate with an empty evidence list, and the validator
rejects any status change from the inherited MC-14 value.

## 2. Authoritative decision

The single authoritative commercial decision is:

```ts
evaluatePurchasability(context: PurchasabilityContext): PurchasabilityDecision
```

It evaluates, independently:

1. entity identity (family and edition exist);
2. merchant SKU existence, state and edition match;
3. product lifecycle;
4. edition eligibility and publication state;
5. legal clearance (licensing, data rights, compliance);
6. brand clearance;
7. safety approval (including PILOT blocked and AIS receive-only);
8. regulatory evidence and gate closure;
9. pricing approval, currency, territory, channel, VAT basis and effective dates;
10. inventory/fulfilment evidence;
11. consumer/B2B terms and payment readiness through gates;
12. publication authorization;
13. actor authorization;
14. client/admin override attempts (recorded and ignored).

## 3. Return contract

```ts
{
  allowed: boolean;
  reasonCodes: string[];
  blockingGateIds: string[];
  missingEvidenceIds: string[];
  effectivePrice: {
    amountMinor: number;
    currency: string;
    territory: string;
    channel: string;
    vatBasis: string;
    includesVat: boolean;
  } | null;
  effectiveStock: number | null;
  evaluatedAt: string;
  policyVersion: string;
}
```

`effectivePrice` is populated only when the whole decision is allowed and the price
approval is valid. `effectiveStock` is populated only when the whole decision is allowed
and verified inventory is available. Otherwise both are `null`.

Current MAREA result for all 26 editions:

```
allowed        = false
effectivePrice = null
effectiveStock = null
policyVersion  = MC16-COMMERCE-POLICY-1.0.0
```

## 4. Fail-closed rules

A denial is mandatory when any of the following is true:

- family or edition missing;
- no merchant SKU, SKU not active/merchantable, or no SKU approval evidence;
- edition not merchantable, not for sale, not published or price not approved;
- family not for sale or lifecycle not commercial;
- licensing not cleared, data rights not granted, compliance not ready;
- brand publication not approved;
- PILOT safety blocked or AIS transmission requested;
- any applicable gate open or lacking valid evidence;
- price hypothesis, unestablished, expired, revoked or missing amount/currency/territory/
  channel/VAT basis;
- price approval evidence missing, wrong type, expired, revoked or not verified external;
- inventory missing, unverified, quarantined, negative, unknown or zero available;
- publication not authorized;
- actor unauthorized, territory or channel missing;
- admin activation or client claims presented as authority.

The evaluator is not a mutable `isAvailable` flag. No single field can override the union
of checks.

## 5. Server-authority boundary

- The evaluator lives in `src/server/marea-commerce/domain.ts`.
- It is not imported by `src/server/api.ts`, `db.ts`, `stripe.ts` or any Angular shop,
  cart, account or checkout component.
- No public route, public price, checkout, Stripe session, billing operation or
  entitlement grant calls it in MC-16.
- The deterministic validator fails if the module is referenced outside its isolated
  folder.
- A future integration must call the evaluator before quoting, reserving, charging or
  granting; that integration is not authorized here.

## 6. Proof of the negative path

The unit and adversarial suites prove:

- `active=1` or admin activation does not make a blocked edition purchasable;
- a hypothesis cannot become a checkout price;
- a null price is never coerced to zero;
- stock quantity alone cannot authorize fulfilment;
- approval without evidence is rejected;
- a blocked gate cannot be bypassed;
- expired/revoked evidence is unusable;
- PILOT-PRO, FLEET-ENTERPRISE, DISPLAY-LARGE and AIS transmission restrictions hold;
- all 26 editions return `allowed=false`, `effectivePrice=null`, `effectiveStock=null`.

A test pass is not an external approval and does not close a gate.

## 7. Current result

```
release gates                 = 13 open / 0 closed
required documents            = 24 / 0 executed
purchasable MAREA editions    = 0
purchasable MAREA bundles     = 0
effective prices              = 0
effective stock               = 0
public commerce activated     = false
```
