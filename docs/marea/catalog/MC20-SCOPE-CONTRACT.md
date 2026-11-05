# MC-20 — Scope contract (NAV / HUB / AIS internal catalogue)

| Field             | Value                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| Milestone         | MC-20/36 — Product catalog batch 1: NAV, HUB, AIS pages ES/EN          |
| Status            | `IMPLEMENTED_INTERNAL` — `MC20_VERDICT = PARTIAL` (external gates)     |
| Branch            | `feature/marea-mc20-nav-hub-ais-catalog`                               |
| Base              | `3490c0f` — verified MC-18 delivery HEAD (MC-18 is a declared dependency) |
| Excluded base work| MC-19 implementation (`37921a9`, draft PR #27) is **not** a dependency and is not incorporated |
| Preview namespace | `internal/catalog/{nav,hub,ais}` and `en/internal/catalog/*`           |
| Owner             | MC-20 implementation team                                              |

## 1. Authorized scope

MC-20 delivers a complete internal, bilingual, premium Angular catalogue for the three
canonical MC-16 families NAV, HUB and AIS:

- one locale-aware component tree (not six pages);
- canonical identity, readiness, editions and bundle relationships read from MC-16;
- fully bilingual ES/EN content with structural parity;
- preview-only, loopback-only, non-indexable rendering;
- no commerce: no price, stock, SKU, order, cart, checkout, quote or lead capture.

## 2. Contract traceability

| Source                                   | Contract applied                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------- |
| `MASTER-PROMPT-REGISTRY.md` row 20       | "Product catalog batch 1: NAV, HUB, AIS pages ES/EN"; dependencies 02, 16, 18     |
| MC-20 verification criteria (row 20)     | No purchasable SKU until approved; compatibility matrix linked; a11y/SEO gates; no chart/NMEA claim without rights |
| MC-19 → MC-20 handoff (`MC19-MC20-HANDOFF-INPUTS.md`) | Inputs-only; MC-20 must not depend on MC-19; no public route, no price, no lead flow |
| MC-16 canonical commerce contract         | Single source of truth for identity, editions, readiness, bundles, gates          |
| MC-17 design-system contract              | Components and fail-closed commercial adapter reused, never forked                |
| MC-18 landing isolation pattern           | Loopback SSR preview, Host allowlist, noindex, no public metadata                 |
| MC-14 claims and release gates            | 42 claims, 0 public-authorised; 13 gates, 0 closed                                |

No conflict was found between the master prompt and the roadmap row. One clarification was
recorded: the master prompt calls the output "catalogue experience"; the roadmap row (written
before MC-15) still says "pages". MC-20 satisfies both by implementing three family
presentations inside one reusable catalogue architecture.

## 3. Canonical identity resolution

| Family | Entity type  | Product type | Editions                              | Hardware status                     | MC-15 route       |
| ------ | ------------ | ------------ | ------------------------------------- | ----------------------------------- | ----------------- |
| NAV    | Product family | SOFTWARE   | NAV-ESSENTIAL, NAV-PRO                | `NOT_APPLICABLE_SOFTWARE_PRODUCT`   | `mareaFamilyNav`  |
| HUB    | Product family | HARDWARE   | HUB-STANDARD, HUB-PRO                 | `NOT_SELECTED`                      | `mareaFamilyHub`  |
| AIS    | Product family | HARDWARE   | AIS-RECEIVER, AIS-CONNECTED           | `NOT_SELECTED`                      | `mareaFamilyAis`  |

None of the three is a bundle, SKU or merchantable entity. `AIS-CONNECTED` is the only
`CONDITIONAL` edition and is presented as conditional and not selected by default.

## 4. Non-goals (explicit)

- No public route, canonical, hreflang, sitemap entry, JSON-LD or social card.
- No price, price hypothesis, stock, SKU, quote, pre-registration, form or lead capture.
- No certification, conformity, NMEA 2000 compatibility, sea-trial or safety claim.
- No product photography, fabricated screenshot or hardware rendering.
- No MC-21, MC-22, MC-23, MC-24 or later milestone work.
- No merge, deployment, publication, indexation or commercial activation.
- No change to the public application, the MC-17 design system or the MC-18 landing.

## 5. Preserved gates

```text
TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED
MAREA_PUBLIC_USE = NO_GO
SOURCE_IP_CLEARANCE = NOT_CLEARED
LICENSING_RIGHTS_GRANTED = false
PRICE_APPROVED = NONE
COMMERCIAL_AVAILABILITY = NOT_FOR_SALE
PUBLICATION_AUTHORIZED = false
INDEXATION_AUTHORIZED = false
PRODUCTION_DEPLOYMENT = NOT_AUTHORIZED
GATE-PRIVACY-DPA-DPIA = BLOCKED
```

`MC20_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` does not change any of them.
