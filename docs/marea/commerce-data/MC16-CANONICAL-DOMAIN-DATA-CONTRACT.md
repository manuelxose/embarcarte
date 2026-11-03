# MC-16 — Canonical domain data contract (D03)

| Field | Value |
|---|---|
| Contract | `MC16-COMMERCE-DATA-CONTRACT` v1.0.0 |
| Milestone | MC-16/36 |
| Status | `INTERNAL_ONLY` |
| Canonical data | `docs/marea/commerce-data/data/` |
| Domain code | `src/server/marea-commerce/domain.ts` |
| Persistence | `src/server/marea-commerce/schema.ts` |
| Public activation | `NONE` |
| Commercial availability | `NOT_FOR_SALE` |

## 1. Purpose

This contract fixes the meaning, identity, relationships and evidence rules of the
internal commercial domain. It exists so that later catalogue, checkout, billing and
customer-portal milestones cannot invent a product, price, stock quantity, licence or
entitlement by accident.

The contract distinguishes seven logical entities:

| Entity | Identity | What it is | What it is not |
|---|---|---|---|
| `ProductFamily` | `familyId` | One of nine MAREA product families | Not an edition, SKU, page or stock item |
| `ProductEdition` | `editionId` | One of the 26 inherited edition definitions | Not automatically a merchantable SKU |
| `MerchantSKU` | `skuCode` | A future commercially managed stock or billable unit | Not the edition id; no code exists at MC-16 |
| `BundleDefinition` | `bundleId` | A composition of editions, entitlements and services | Not a SKU and not a fixed-price package |
| `EntitlementDefinition` | `entitlementId` | A capability or licensed service under conditions | Not a page, SKU, plan or grant |
| `SubscriptionPlan` | `planId` | A recurring commercial configuration | Not a billing contract or customer subscription |
| `EntitlementGrant` | `grantId` | A scoped grant to an account, tenant, vessel or device | Not a definition and not a plan |

Page identity, route identity and content identity are separate foreign concepts. A page
never creates a product, edition, SKU or entitlement. ES and EN pages reference the same
entity; an English page is not another SKU.

## 2. Canonical cardinalities

| Concept | Count | Current state |
|---|---:|---|
| Product families | 9 | `DEFINED`, `INTERNAL_ONLY`, `NOT_FOR_SALE` |
| Product editions | 26 | `DEFINED`/`CONDITIONAL`; no merchant SKU |
| Merchant SKU candidates | 26 | `merchantable=false`, `priceApproved=false` |
| Actual merchant SKUs | 0 | none created |
| Bundles | 6 | `INTERNAL_ONLY`, no fixed price |
| Release gates | 13 | 0 closed |
| Required legal/commercial documents | 24 | 0 executed |
| Proposed MAREA routes | 23 | all non-deployable, 0 indexable |
| Approved prices | 0 | `PRICE_APPROVED = NONE` |
| Verified MAREA inventory items | 0 | `VERIFIED_MAREA_STOCK = NONE` |
| Real subscriptions | 0 | `BILLING_IMPLEMENTED = false` |
| Real entitlement grants | 0 | `ENTITLEMENT_LEDGER_ACTIVE = false` |

## 3. Evidence classes

Every record declares an evidence class. A class describes provenance, not approval.

| Class | Meaning | May satisfy a gate or price approval? |
|---|---|---|
| `REPOSITORY_VERIFIED` | Read directly from this repository at a recorded commit | Only for internal identity facts |
| `ENGINEERING_DESIGN` | Internal design or schema decision | No |
| `HYPOTHESIS_UNAPPROVED` | Planning hypothesis, including price hypotheses | No |
| `EXTERNAL_EVIDENCE_REQUIRED` | A real third-party document is needed | Not until the document exists and is verified |
| `UNKNOWN` | Not established | No |
| `NOT_GRANTED` | Explicitly not granted | No |
| `NOT_APPLICABLE` | Legitimately inapplicable | No |

An internal decision, test pass, build, document draft or deployment is never evidence
that a regulator, rights holder, supplier, insurer or payment provider approved anything.

## 4. Null, zero and unknown

- Unknown monetary amount, currency, territory, channel, VAT basis, effective date,
  stock quantity, merchant SKU code or external evidence is `null`.
- `null` is never converted to `0`, `0.00`, an empty string or a placeholder product.
- A real zero is allowed only where it is a known fact (for example a verified item with
  `quantity_on_hand = 0`), and it blocks sale rather than authorizing it.
- Monetary values, when they exist, are integer minor units with an explicit currency.
  Binary floating-point is not used for persistence.
- A price hypothesis is not a price. A scenario output is not a price.

## 5. Relationships and referential rules

- Every edition references exactly one existing family.
- Every family lists its editions; the union of family edition lists is exactly the 26
  inherited editions, with no duplicate or orphan.
- Every bundle component references an existing edition.
- A bundle does not duplicate an edition across its composition.
- A kit expands exactly to its declared modules; the modules are not counted again.
- Every subscription plan references an entitlement definition.
- Every entitlement mapping resolves to a definition.
- Every price record references an edition.
- Every inventory item references an edition and, when verified, an evidence record.
- Every audit event references an entity type and id; evidence references are explicit.
- Foreign keys are enforced in SQLite and the validator checks the same relationships in
  the JSON contract.

## 6. Server authority

The only authoritative commercial decision is a server-side evaluation. It must not trust:

- client-supplied price, currency, stock, readiness, availability or role;
- URL parameters;
- `products.active` or any legacy admin flag;
- an empty or missing evidence list;
- a historical scenario or hypothesis;
- a page, route or sitemap state.

`evaluatePurchasability()` is defined in `domain.ts` and returns a structured denial. Its
current result for every MAREA entity is `allowed=false`, `effectivePrice=null`,
`effectiveStock=null`. The module is not imported by any public route, checkout, Stripe
handler or shop component; the validator fails if such an import appears.

## 7. Evidence references and source lineage

`source-lineage.json` records the repository sources and SHA-256 hashes used to build this
contract. The validator re-computes them; a changed source without a new contract version
fails validation. `legacy-commerce-mapping.json` records the hashes of the existing shop
files and requires them to remain unchanged.

External evidence is represented only by an evidence record with issuer, issue date,
scope, type, verification and optional expiry/revocation. No external evidence record
exists at MC-16 for any MAREA product, price, licence, certificate, insurance or order.

## 8. Auditability

Domain decisions are append-only audit events with event id, entity, type, previous/new
version, actor, role, timestamp, reason, evidence references, correlation id and result.
The persistence schema rejects updates and deletes. Audit history describes internal
decisions and attempts; it does not itself prove a third-party approval.

## 9. Change control

The datasets are canonical inputs to code and tests. They must not be edited to make a
test pass. A future change requires a new contract version, updated source lineage,
validator regression, independent review and the relevant external evidence. Historical
verdicts, approvals and audit records remain immutable.
