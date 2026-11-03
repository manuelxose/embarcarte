# MC-16 — Security and audit trail (D12)

| Field | Value |
|---|---|
| Deliverable | D12 `MC16-SECURITY-AND-AUDIT-TRAIL.md` |
| Milestone | MC-16/36 — MAREA commerce and product data model |
| Date | 2026-11-03 |
| Owner | governance-docs |
| Status | INTERNAL_ONLY — design and schema-level enforcement |
| Runtime activation | NONE — no MC-16 code path is reachable from the web server |
| External assurance | NONE (no penetration test, no certification, no external audit) |

## 1. Security objectives

MC-16 protects five classes of data and the decisions made from them:

1. **Commercial truth** — a product may never appear purchasable, priced, stocked,
   publishable or available unless verified server-side.
2. **Authorization integrity** — the actor and role are derived from the server
   session, never from the client; admin action alone never authorizes sale.
3. **Evidence integrity** — an approval is valid only with usable external evidence;
   internal records never impersonate external approvals.
4. **Auditability** — every consequential decision or attempt is recorded in an
   append-only, hash-chained event trail with actor, role, reason and evidence.
5. **Tenant isolation** — entitlement scope is organization/tenant/vessel-bound and
   client-supplied scope is ignored.

Non-objectives in MC-16: production hardening, penetration testing, key management,
secret rotation, DDoS protection, SOC 2 / ISO 27001 evidence, and any payment
processing. Those remain external or later-milestone work (see D16).

## 2. Threat model (summary)

| Element | Description |
|---|---|
| Assets | Price status, stock/inventory, readiness, publication eligibility, entitlement grants, audit trail, customer data (legacy only) |
| Trust boundaries | Browser ↔ Express API; API ↔ SQLite; API ↔ Stripe; operator ↔ admin UI; internal tooling ↔ disposable database |
| Actors | Anonymous visitor, authenticated customer, admin, finance/commercial approver, entitlement administrator, service account, external provider |
| Adversaries | Price/stock tampering client, forged admin claim, replayed webhook, cross-tenant reader, insider abusing admin UI, fabricated evidence submitter |
| High-value abuse cases | Activating a blocked product; approving a price without evidence; closing a gate with an internal note; granting a real entitlement; reading another tenant's grant; forging an audit event; publishing a route or JSON-LD offer |
| Residual threats | Privileged direct SQLite writer; compromised host; stolen admin session; supply-chain compromise. These are out of MC-16's enforcement boundary and are recorded as open risks in §13. |

## 3. Trust model and authorization

`data/security-invariants.json` fixes the model:

- trusted authorization source = **server session + role**;
- client-supplied roles are never trusted;
- admin activation never bypasses readiness;
- price approval requires `FINANCE_LEAD` or `COMMERCIAL_DIRECTOR`;
- publication approval requires `PROGRAMME_LEAD` or `COMMERCIAL_DIRECTOR`.

Authorization is evaluated by `evaluatePurchasability`, `evaluateReadinessTransition`,
`validatePriceApproval`, `validateEntitlementGrant`, `evaluatePublicationEligibility`
and `evaluateBundleEligibility` in `src/server/marea-commerce/domain.ts`. A missing or
empty actor yields `ACTOR_UNAUTHORIZED`; a client role map yields
`CLIENT_CLAIMS_IGNORED`; an admin activation flag yields
`ADMIN_ACTIVATION_IGNORED`.

### 3.1 Authorization matrix

| Operation | Required authority | Required evidence | Failure result |
|---|---|---|---|
| Create/modify a family or edition | Internal authoring role; no public effect | Source reference, definition status | Record only; still `NOT_FOR_SALE` |
| Change a price version | `FINANCE_LEAD` / `COMMERCIAL_DIRECTOR` for `APPROVED` | Verified external `PRICE_APPROVAL`/`EXTERNAL_PRICE_LIST`, amount, currency, territory, channel, VAT basis, effective date | `PRICE_*` denial codes; `effectivePrice = null` |
| Close a release gate | Named `closureOwner` role | Usable `VERIFIED_EXTERNAL` evidence with issuer, date, scope, hash | Gate stays open |
| Transition readiness | Role listed on the transition | Closed gates + usable evidence + audit event | `TRANSITION_NOT_AUTHORIZED`, `EVIDENCE_MISSING:*`, `GATE_OPEN:*` |
| Publish a route / emit Offer | `PROGRAMME_LEAD` / `COMMERCIAL_DIRECTOR` + gate set | Closed gates, claims approval, indexation authorization | `PUBLICATION_NOT_AUTHORIZED`, `PUBLIC_PRODUCT_OFFER_MARKUP_PROHIBITED` |
| Reserve or dispatch inventory | Authorized operator/service | Verified inventory item + movement evidence + reason | `VERIFIED_INVENTORY_MISSING`, `INVENTORY_EVIDENCE_*` |
| Grant an entitlement | `ENTITLEMENT_ADMIN` | Synthetic basis only during MC-16; audit event | `REAL_ENTITLEMENT_GRANT_PROHIBITED_MC16`, `AUDIT_EVENT_MISSING` |
| Read another tenant's grant | Tenant scope match enforced server-side | — | `CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED` |
| Activate commercial availability | **No MC-16 role has this authority** | A future authorized migration | `MC16_COMMERCIAL_ACTIVATION_PROHIBITED` |

The schema reinforces the last row with triggers: any insert/update that would set
`FOR_SALE`, `PUBLISHED`, `merchantable = 1`, `price_approved = 1`, an approved SKU, a
fixed bundle price, `checkout_allowed = 1` or a real grant aborts with a
`MC16_*_PROHIBITED` error.

## 4. Invariant catalogue

The 25 invariants in `data/security-invariants.json` are grouped here. Each is
referenced by identifier; the full statement is normative in the dataset.

| Group | Invariants |
|---|---|
| Server authority | SEC-MC16-01 (no client price/stock/readiness trusted), SEC-MC16-02 (admin activation insufficient), SEC-MC16-03 (every sale-capable operation calls `evaluatePurchasability`), SEC-MC16-04 (evaluator not imported by public route, checkout or Stripe) |
| Merchantability | SEC-MC16-05 (merchant SKU requires edition, approved price, verified inventory, contracted fulfilment, gates), SEC-MC16-06 (approved price requires verified external evidence and authorized approver), SEC-MC16-07 (unknown price is null, never zero) |
| Inventory | SEC-MC16-08 (atomic, no oversell), SEC-MC16-09 (quantity alone does not authorize fulfilment) |
| Gates and evidence | SEC-MC16-10 (blocked gate cannot be bypassed by app state), SEC-MC16-11 (evidence fresh, verified, not expired/revoked), SEC-MC16-25 (empty/null evidence reference never counts) |
| Audit | SEC-MC16-12 (append-only, hash-chained, actor/role/reason/evidence) |
| Entitlements and tenancy | SEC-MC16-13 (no real grant/subscription in MC-16), SEC-MC16-14 (local safety independent of subscription), SEC-MC16-15 (NAV/WEATHER shared ledger, no double billing), SEC-MC16-16 (FLEET scope bound to organization/tenant/vessel; client scope ignored), SEC-MC16-17 (no cross-tenant leakage) |
| Publication | SEC-MC16-18 (no MAREA Product/Offer JSON-LD while blocked), SEC-MC16-19 (no proposed route published/indexed by MC-16) |
| Production and legacy | SEC-MC16-20 (no production schema migration on startup), SEC-MC16-21 (no legacy order/product/customer data modified), SEC-MC16-24 (public legacy shop remains on its existing path) |
| Data hygiene | SEC-MC16-22 (no secret/payment credential/card data in audit), SEC-MC16-23 (synthetic fixtures only) |

## 5. Audit event contract

Source: `data/audit-event-contract.json`. Repository table:
`marea_audit_events` (`src/server/marea-commerce/schema.ts:320-340`).

### 5.1 Fields

`eventId`, `entityType`, `entityId`, `eventType`, `previousVersion`, `newVersion`,
`actorId`, `actorRole`, `timestamp`, `reason`, `evidenceRefs`, `correlationId`,
`result`, `prevEventHash`, `eventHash`.

### 5.2 Event types

`PRODUCT_DEFINITION_CHANGED`, `EDITION_CHANGED`, `PRICE_REVISED`,
`READINESS_TRANSITION_PROPOSED`, `READINESS_TRANSITION_DENIED`,
`READINESS_TRANSITION_ACCEPTED`, `GATE_EVIDENCE_CHANGED`,
`MERCHANT_SKU_CREATION_ATTEMPTED`, `INVENTORY_MOVEMENT_RECORDED`,
`ENTITLEMENT_CHANGED`, `PUBLICATION_AUTHORIZATION_CHANGED`,
`ADMIN_OVERRIDE_ATTEMPTED`.

### 5.3 Rules

| Rule | Implementation |
|---|---|
| No update | Trigger `trg_marea_audit_no_update` aborts `MC16_AUDIT_APPEND_ONLY` |
| No delete | Trigger `trg_marea_audit_no_delete` aborts `MC16_AUDIT_APPEND_ONLY` |
| No duplicate id/hash | Trigger `trg_marea_audit_no_replace` aborts `MC16_AUDIT_DUPLICATE` |
| Actor and role required | NOT NULL columns + `validateAuditEvent` |
| Reason required (non-empty) | NOT NULL/`length(trim()) > 0` + validator |
| Evidence required for state changes | `validateAuditEvent` rejects non-`DENIED` events with empty `evidenceRefs` |
| Correlation id required | NOT NULL + validator |
| No payment secrets | `validateAuditEvent` rejects card/PAN/CVV/secret/password/token wording in `reason`; contract forbids secrets in any field |
| No unnecessary personal data | Contract rule; enforced by review, not by schema |

`validateAuditEvent` also rejects missing fields, invalid timestamps, invalid result
values and truncated hashes. `AUD-003` in the package validator asserts update/delete
forbidden; `AUD-001`/`AUD-002` assert append-only and required fields.

## 6. Hash-chain design

The intended construction is a SHA-256 chain over the event sequence:

```text
eventHash_n = SHA-256(canonical_json({
  eventId, entityType, entityId, eventType, previousVersion, newVersion,
  actorId, actorRole, timestamp, reason, evidenceRefs, correlationId, result,
  prevEventHash
}))
prevEventHash_n = eventHash_(n-1)     (genesis event: null)
```

Verification algorithm (required before any MC-16 audit read is trusted):

1. order events by `sequence` (the autoincrement primary key);
2. recompute each `eventHash` from its canonical payload and `prevEventHash`;
3. assert `prevEventHash_n === eventHash_(n-1)` and that genesis has `null`;
4. assert uniqueness of `event_id` and `event_hash` (also enforced by trigger);
5. anchor the final head hash outside the database (release record or signed log) —
   without an anchor, an attacker who can rewrite the whole file can rewrite the
   chain consistently.

**Current implementation status:** the columns, uniqueness constraints and
append-only triggers exist; `validateAuditEvent` validates field shape, not chain
continuity; no chain-verification function and no external anchor exist yet. This is
recorded as `SEC-GAP-01` in §13. Until it is implemented and tested, the trail is
**tamper-evident only against accidental edits and non-privileged application bugs**,
not against a privileged direct-database writer.

## 7. Internal decision vs external evidence

The audit trail records internal decisions and attempts. It does **not** prove an
external fact. `data/audit-event-contract.json` separates:

| Record | Proves | Does not prove |
|---|---|---|
| Internal audit event (`ACCEPTED`/`DENIED`/`RECORDED`) | EMBARCARTE evaluated, decided or attempted something, with actor/reason/evidence refs | That a regulator, supplier, lawyer or customer approved anything |
| External evidence record (`marea_release_gate_evidence`) | A third-party document with issuer, date, scope, type, class, content hash and verification flag existed and was usable at evaluation time | That it is still valid after expiry/revocation; that it closes an unrelated gate |

Gate closure requires a `CLOSED_VERIFIED` gate whose `closureEvidenceIds` resolve to
usable evidence: `verified = 1`, status not `EXPIRED`/`REVOKED`/`SUPERSEDED`,
`issuedBy` present, and (for approvals) `evidenceClass = VERIFIED_EXTERNAL`. Empty
evidence arrays fail. No MC-16 document may create or imply such evidence; there is
none (D16).

## 8. Tenant isolation

MC-16 defines tenant-bound entitlements at the contract and domain level:

- `marea_entitlement_grants.scope_type` is limited to
  `ACCOUNT`, `ORGANIZATION`, `TENANT`, `VESSEL`, `DEVICE` with a non-empty
  `scope_id`; `scope_type`/`scope_id` are never taken from client input;
- `evaluateCrossTenantAccess` returns `CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED` unless
  the grant scope exactly matches the server-resolved request scope;
- `validateEntitlementGrant` rejects a real (`synthetic = 0`) grant and any
  `CONTRACT`/`PURCHASE`/`MIGRATION` basis during MC-16;
- shared ledgers (`ACCOUNT:NAV_PRO`, `ACCOUNT:WEATHER`,
  `ACCOUNT:WATCH_MONITORING`, `ORGANIZATION:FLEET_VESSEL`) deduplicate billing;
- local safety functions (`gates_local_safety = 0` required) are independent of any
  subscription.

There is no multi-tenant runtime, no tenant table and no row-level security in the
legacy system. Isolation is therefore a **contract plus evaluator obligation on a
future repository layer**, not a deployed control. `SEC-GAP-02` records the need for
integration tests that exercise scope spoofing end-to-end before any tenant data
exists.

## 9. Secrets, payment data and personal data

- No secret is required by MC-16. Stripe and mail credentials remain environment
  variables consumed by the legacy server; the MC-16 package contains none.
- No card data is ever accepted, logged or stored; card payment stays in hosted
  Stripe Checkout (D02 §7).
- The audit contract forbids payment secrets in events; the validator applies a
  heuristic on `reason`. It does not scan arbitrary free-text fields, and evidence
  payloads are not stored — only references and hashes (`SEC-GAP-03`).
- No customer, vessel or telemetry data may appear in datasets or fixtures; tests
  use synthetic identifiers only (`SEC-MC16-23`).
- The schema stores no customer PII. `marea_entitlement_grants.actor_id` and audit
  actor ids are internal identifiers, not email addresses.

## 10. Isolation from the production system

| Control | Evidence |
|---|---|
| Schema not imported by the running server | `grep` for `marea-commerce` under `src/` finds only files inside `src/server/marea-commerce/`; the server imports none |
| No startup migration | `installMareaCommerceSchema` is an explicit export; `src/server.ts` and `src/server/db.ts` never call it |
| Disposable database only | Internal tooling must require an explicit temporary path and refuse `data/embarcarte.sqlite` and any repository data path (D13/D17; tooling authored under the persistence workstream) |
| No legacy FKs | No `REFERENCES` from any `marea_*` table to `products`, `orders`, `users` or other legacy tables |
| Activation blocked | 19 triggers abort commercial activation, approval without evidence, real grants, subscription checkout, publication flags and audit mutation |
| Publication blocked | `marea_publication_eligibility` CHECKs require all four authorization flags to be `0`; no route or markup is emitted anywhere |

## 11. Verification evidence

| Check | Result | Class |
|---|---|---|
| Schema triggers present | 19 triggers created on install | LOCAL_SCRATCH_VERIFIED |
| Double install | idempotent, one schema version row | LOCAL_SCRATCH_VERIFIED |
| `FOR_SALE` family insert/update | aborted `MC16_COMMERCIAL_ACTIVATION_PROHIBITED` | LOCAL_SCRATCH_VERIFIED |
| Merchantable edition insert | aborted `MC16_MERCHANTABLE_EDITION_PROHIBITED` | LOCAL_SCRATCH_VERIFIED |
| Audit update / delete | aborted `MC16_AUDIT_APPEND_ONLY` | LOCAL_SCRATCH_VERIFIED |
| Real entitlement grant | aborted `MC16_REAL_ENTITLEMENT_GRANT_PROHIBITED` | LOCAL_SCRATCH_VERIFIED |
| Publication authorization | failed CHECK (`publication_authorized = 0`) | LOCAL_SCRATCH_VERIFIED |
| Drop | 0 remaining `marea_%` tables | LOCAL_SCRATCH_VERIFIED |
| Package validator | `AUD-001..003`, `SEC-001..002` pass in the 1730/1730 snapshot (parallel workstream) | LOCAL_SCRATCH_VERIFIED (snapshot) |
| Domain unit tests | audit rejects missing evidence and secret wording; real grant rejected; `check-marea-commerce-data.test.mjs` | LOCAL_SCRATCH_VERIFIED (snapshot) |
| Persistence suite | not executed by this workstream — authored in parallel; must be run at the final candidate | NOT EXECUTED |

## 12. Security acceptance rule for the milestone

MC-16 is security-acceptable only if an independent reviewer confirms, at the final
candidate commit:

1. no MC-16 import reaches the public server, checkout or Stripe path;
2. the disposable-database suite proves install/verify/drop and every guard;
3. all 25 invariants are represented in code, schema or an explicit open finding;
4. no secret, token, card data or personal data is present in the package;
5. the audit contract is append-only at the database level and its chain-verification
   gap is either closed or explicitly carried as an open finding;
6. tenant-scope rules are tested at the evaluator boundary;
7. no gate, price, stock, SKU or publication flag is marked approved.

A design document cannot grant this acceptance, and the author cannot issue it.

## 13. Residual risks and open security work

| ID | Severity | Gap | Required fix before any activation |
|---|---|---|---|
| SEC-GAP-01 | HIGH | Hash chain continuity is not verified and has no external anchor; only shape validation exists. | Implement `verifyAuditChain` over `sequence` and anchor the head hash in a signed release record; add adversarial tests. |
| SEC-GAP-02 | HIGH | Tenant isolation is evaluator-level only; no end-to-end integration test with spoofed scope. | Repository-layer enforcement + integration tests before any tenant data is stored. |
| SEC-GAP-03 | MEDIUM | Secret scanning is a heuristic on one field; audit evidence payloads are not stored. | Define allowed evidence-reference format; reject secret-bearing patterns across all fields; consider encrypted evidence store outside MC-16 scope. |
| SEC-GAP-04 | MEDIUM | A privileged direct SQLite writer can insert internally consistent forged events. | Signed/HMAC events with a server-held key; off-host append-only log; least-privilege DB access. |
| SEC-GAP-05 | MEDIUM | No audit retention, export or deletion policy. | Define retention and legal-hold rules with the DPO; export format for auditors. |
| SEC-GAP-06 | LOW | No rate limiting, session hardening or MFA in the future MC-16 service (none exists yet). | Reuse legacy session controls and add authorization tests when a service is built. |
| SEC-GAP-07 | LOW | Trigger coverage is by column list; future schema changes could add a mutable path. | Schema review gate on every migration; tests assert trigger presence. |

These gaps do **not** authorize any runtime activation, and none is closed by this
document. They are carried into D16 and must be visible to the independent reviewer.

## 14. Conclusion

At MC-16 the security posture is: **strong fail-closed design, database-enforced
non-activation, append-only audit storage, and honest open gaps**. There is no
production surface, no secret, no customer data and no external assurance. The
security claim is limited to what has been executed on a disposable database and to
what the domain evaluator rejects in tests; everything else is design.
