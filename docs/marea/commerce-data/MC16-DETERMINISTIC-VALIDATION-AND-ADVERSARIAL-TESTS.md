# MC16 — Deterministic validation and adversarial testing (D20)

| Field | Value |
|---|---|
| Milestone | MC-16/36 |
| Scope | Isolated internal commerce domain; no public commerce activation |
| Commands | `npm run test:commerce-data`, `npm run test:commerce-data:unit` |
| Windows isolation | `--test-isolation=none` on the unit/regression paths |
| Fixtures | Synthetic only — no customer, order, vessel, stock or payment data |
| Production database | Never opened or modified |

## 1. Deterministic validator

`scripts/check-marea-commerce-data.mjs` runs `scripts/marea-commerce-validator.mjs`, which
loads the 21 canonical datasets and performs four independent families of checks:

1. **Contract structure and invariants** — canonical identities, counts, relationships,
   readiness, gates, price, inventory, subscriptions, entitlements, publication, audit,
   security, manifest and MC-17 flags.
2. **Source reconciliation** — family / edition / bundle / gate / route identities are
   compared with MC-05–MC-08, MC-14 and MC-15 source files; source hashes and legacy
   commerce file hashes are verified.
3. **Activation isolation** — no file under `src/server` or `src/app` outside
   `src/server/marea-commerce/` may import or reference the isolated domain, the
   evaluator or the MC-16 policy version.
4. **Schema smoke** — the isolated schema is installed twice and dropped on a temporary
   SQLite database, with table, foreign-key and idempotency assertions.

Current result at the frozen implementation: **1730/1730 checks pass**. The validator
prints the exact command result and exits non-zero on any failure; it cannot be satisfied
by changing a status to `PASS`.

## 2. Unit tests

`scripts/check-marea-commerce-data.test.mjs` covers:

- canonical data and source reconciliation;
- zero imports of the domain into public routing;
- schema install/verify/drop smoke;
- all 26 current editions return `allowed=false`, `effectivePrice=null`,
  `effectiveStock=null`;
- admin activation and client claims are recorded but ignored;
- approved price requires verified external evidence and an authorised role;
- unknown price stays `null` and is never converted to zero;
- price hypotheses never become effective prices;
- inventory requires provenance and rejects admin-entered quantity alone;
- expired evidence is unusable;
- readiness requires all dimensions and evidence-backed closed gates;
- commercial transition is denied during MC-16;
- publication eligibility is false while gates or brand clearance are open;
- PILOT bundle ineligibility and SENSE kit non-duplication;
- shared entitlement ledger prevents duplicate billing;
- WATCH local safety cannot be gated;
- real grants and billing activation are rejected;
- audit events reject secrets and missing evidence.

## 3. Adversarial suite

`scripts/check-marea-commerce-adversarial.test.mjs` deliberately mutates the canonical
model or calls the domain with hostile input. Every test must fail for the intended
reason; each assertion names the expected rule id.

| # | Attack | Expected rule |
|---|---|---|
| 01 | `active=1` makes a blocked MAREA edition purchasable | `EDN-005` |
| 02 | Price hypothesis promoted to approved | `PRC-002` |
| 03 | Null price replaced with zero | `PRC-005` |
| 04 | Fabricated stock | `INV-001` |
| 05 | Price approval with no evidence | `PRC-009` |
| 06 | Blocked release gate bypassed | `GATE-003` |
| 07 | Obsolete evidence reused | `SRC-002` |
| 08 | Restricted PILOT-PRO SKU created | `EDN-005` |
| 09 | FLEET-ENTERPRISE sold self-service | `EDN-008` |
| 10 | AIS transmission enabled | `EDN-019` |
| 11 | PILOT readiness escalated without safety evidence | `FAM-007` |
| 12 | Blocked bundle made orderable | `BND-004` |
| 13 | SENSE kit duplicates a module | `BND-023` |
| 14 | Shared WEATHER entitlement billed twice | `ENT-002` |
| 15 | WATCH expiry disables local safety | `ENT-003` |
| 16 | Tenant A gains tenant B entitlement | `CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED` |
| 17 | Subscription grants an unauthorised licence | `ENT-009` |
| 18 | Fabricated payment grants an entitlement | `ENT-010` |
| 19 | Client changes price/readiness | `CLIENT_CLAIMS_IGNORED` |
| 20 | Unauthorised actor authorises a gate | `ACTOR_UNAUTHORIZED` |
| 21 | Historical audit records deleted | `AUD-001` |
| 22 | Version collision overwrites an approval | `PRC-002` |
| 23 | Invalid transition skips a required gate | `LIF-007` |
| 24 | Proposed MAREA page becomes indexable | `PUB-003` |
| 25 | MAREA Product/Offer markup enabled | `PUB-006` |
| 26 | Sample shop row mapped to live MAREA SKU | `LEG-003` |
| 27 | Empty legal identity treated as valid | `EXT-001` |
| 28 | Missing licensing right treated as approved | `FAM-012` |
| 29 | Unknown stock amount becomes available | `INV-004` |
| 30 | Duplicate bundle composition inflates quantity | `BND-025` |
| 31 | ES/EN mismatch creates a second entity | `EDN-002` |
| 32 | Unverified movement makes stock negative | `INVENTORY_QUANTITY_INVARIANT_VIOLATED` |
| 33 | Unknown bundle component edition | `BND-009` |
| 34 | Synthetic approval escapes its fixture | `PRICE_APPROVAL_EVIDENCE_INVALID` |
| 35 | Forbidden production migration executed | `MNF-009` |
| 36 | Existing customer orders altered | `LEG-004` |
| 37 | Proposed route published | `PUB-010` |

The persistence suite covers the attacks that require real SQLite transactions:
historical audit deletion, negative movement, atomic conditional reservation,
foreign-key violation, approved-price immutability and production-path refusal. SQLite
serializes writers; the reservation operation uses `BEGIN IMMEDIATE` plus a conditional
`UPDATE ... WHERE quantity_reserved + ? <= quantity_on_hand`. The unit suite separately
covers a transition that is not explicitly allowed in MC-16
(`MC16_TRANSITION_NOT_AUTHORIZED`) and a price bound to a different edition
(`PRICE_EDITION_MISMATCH`).

## 4. Property-style domain checks

The unit suite evaluates all 26 editions against the current model, not one sample, and
asserts the complete denial envelope. This prevents a single passing fixture from hiding
a domain-wide activation path. It also checks that the evaluator ignores admin activation
and client claims and that an unknown price is never materialised as zero.

## 5. Inherited regression

`npm run test:financial` is expected to remain red at the inherited V-18 check. The
failure is reproduced against the verified MC-15 predecessor and is classified as
inherited validator-state debt: MC-13's assertion still expects registry row 14 to be
`PLANNED`, but MC-14 was executed and recorded `PARTIAL`. MC-16 must not rewrite MC-13 or
the registry to make V-18 green. The exact failure is reported in D16 and in the delivery
record.

## 6. Environment and substitution disclosure

The repository's Windows harness can block default Node process isolation. Unit and
adversarial commands therefore use the documented `--test-isolation=none` form. This is a
harness substitution only; it does not change test semantics or turn an environment block
into a pass. Any command that cannot be executed is recorded as `NOT_EXECUTED`, never as a
pass.
