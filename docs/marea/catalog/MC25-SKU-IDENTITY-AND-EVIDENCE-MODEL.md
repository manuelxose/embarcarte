# MC-25 canonical SKU identity and evidence model

**Modules:** `src/app/marea-catalog/governance/sku-identity.ts`,
`governance-facts.ts`, `data/governance.generated.ts`.

## 1. Six identity kinds

The milestone's first control is a distinction. Conflating any two rows below is
a commercial defect.

| Kind | Example | Commercial meaning | `candidateOnly` | `approvedMerchantSku` | `orderable` |
| --- | --- | --- | --- | --- | --- |
| `PRODUCT_FAMILY` | `NAV` | Product family identity | false | false | false |
| `EDITION` | `NAV-ESSENTIAL` | Canonical edition (stable identity) | false | false | false |
| `BUNDLE` | `START` | Commercial bundle definition | false | false | false |
| `INTERNAL_CATALOGUE_IDENTITY` | `ENT-FAMILY-NAV` | Internal catalogue entity | false | false | false |
| `CANDIDATE_COMMERCIAL_SKU` | `SKU-CAND-NAV-ESSENTIAL` | Governance candidate, never an offer | true | false | false |
| `APPROVED_MERCHANT_SKU` | *(none exists)* | Merchant SKU approved for sale | false | true | **unreachable** |

Resolution is allow-list based: `resolveFamilyIdentity`,
`resolveEditionIdentity`, `resolveBundleIdentity`,
`resolveInternalCatalogueIdentity`, `resolveCandidateIdentity`,
`resolveMerchantSku`. Anything unknown or malformed returns
`UNKNOWN_IDENTITY` with a named reason, never a canonical object.

## 2. Why an edition is not a SKU

The MC-16 contract states `skuIdentity: "EDITION_ID_IS_STABLE_IDENTITY"` and
`merchantSkuCodesEstablished = 0`; every candidate record has
`merchantSkuCode: null` and `merchantable: false`. The model encodes that:

- `resolveEditionIdentity('NAV-ESSENTIAL')` → `kind: 'EDITION'`,
  `merchantSkuCode: null`, `orderable: false`.
- `resolveCandidateIdentity('SKU-CAND-NAV-ESSENTIAL')` → candidate-only, no code.
- `resolveMerchantSku(code)` → `UNKNOWN_IDENTITY` reason
  `NO_APPROVED_MERCHANT_SKU_REGISTRY`, because
  `MERCHANT_SKU_APPROVALS` is `Object.freeze([])`.

No merchant SKU identifier is fabricated anywhere in the milestone. The
validator asserts the registry length is 0, is frozen, rejects a push, and that
all 26 editions and 26 candidates carry no code.

## 3. Fact snapshot and tamper resistance

`governance.generated.ts` is produced by
`scripts/build-mc25-governance-data.mjs` from eleven contracts. The generator
**refuses** to emit when the contracts contradict each other:

| Refusal | Condition |
| --- | --- |
| `references unknown edition` | a bundle line names an edition absent from MC-16 |
| family mismatch | a bundle line pairs an edition with the wrong family |
| `references unknown release gate` | an edition references a gate absent from the register |
| `carries a merchant SKU code` | a candidate has a non-null `merchantSkuCode` |
| `priceApproved must be NONE` / `testedCompatibilityRows must be 0` / `publicationAuthorized must be false` | the external-evidence block has been silently relaxed |

The snapshot is frozen **recursively** (`deepFreeze` with a `WeakSet` to handle
cycles). Note: the generator already freezes top-level arrays, so a naive
"skip if frozen" recursion would leave records mutable — that bug was found and
fixed during implementation and is covered by test `t1`. Attempting to push an
edition or assign `merchantable = true` throws.

Lookup `Map`s are module-private. Only functions are exported, so a consumer
cannot replace an entry behind the engine's back.

## 4. Evidence provenance

Every contract the projection reads is recorded with:

- `key`, `path`, `contractId`, `contractVersion`, `milestone`, `evidenceClass`;
- `sha256` of the exact contract bytes at generation time.

Eleven contracts are covered:

```text
blocker-register.json          lifecycle-policy.json
readiness-dimensions.json      product-families.json
product-editions.json          sku-candidates.json
price-governance.json          inventory-governance.json
publication-eligibility.json   release-gate-mapping.json
bundle-definitions.json (MC-08)
```

The validator recomputes every digest from disk and fails on drift, so a
readiness decision is bound to the current contract bytes rather than to a
narrative. Regeneration is gated twice: `check:mc25:data` (`--check`) and the
MC-25 validator, which re-derives the projection in-process and compares it with
the committed file.

## 5. Evidence identifiers per edition

Every edition decision cites the contract's own evidence ids (for example
`EV-PRICE-APPROVAL`, `EV-INVENTORY-PROVENANCE`, `EV-LEGAL-CLEARANCE`,
`EV-PUBLICATION-AUTHORIZATION`) plus the edition's `evidenceIds`. Those are
**references**, not evidence: the milestone does not claim any of them exists.
