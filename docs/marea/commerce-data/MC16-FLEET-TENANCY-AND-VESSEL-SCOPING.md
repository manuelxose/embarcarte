# MC-16 D11 — FLEET tenancy and vessel scoping

| Field | Value |
|---|---|
| Document ID | MC-16 / D11 / MC16-FLEET-TENANCY-AND-VESSEL-SCOPING |
| Milestone | MC-16/36 — commerce and product data model |
| Owner | commerce-docs (pricing, inventory, subscription and integration architect) |
| Date | 2026-11-03 |
| Base commit | `99212a41f5942a6fef4ede75815132c11fa4de50` |
| Branch | `feature/marea-mc16-commerce-product-data-model` |
| Status | `INTERNAL_ONLY` — 0 organisations, 0 tenants, 0 vessels, 0 FLEET grants, no multi-tenant service |
| Evidence class | `ENGINEERING_DESIGN` + `REPOSITORY_VERIFIED` |
| Authority | `data/entitlement-definitions.json`; `data/entitlement-mappings.json`; `schema.ts`; `domain.ts`; FLEET tenancy contract |
| Downstream owner | Future FLEET service milestone — `NOT_AUTHORIZED` |

## 1. Purpose and boundary

This document fixes the tenancy and vessel-scoping contract that MC-16 hands to a
future FLEET service. It covers the organisation/tenant/vessel boundary, the
eight roles, the no-cross-tenant-leak rules, the no-default-hardware and
no-SLA rules, and the read-only telemetry boundary.

MC-16 does **not** implement the FLEET service. It does not create
organisations, memberships, vessels, devices, telemetry records, reports or
support grants. The SQLite schema has no organisation/vessel/telemetry tables; it
has only the entitlement-grant scope columns that will carry a future FLEET
right. Current state:

- FLEET family: 3 editions, all `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY`,
  `merchantable = false`, `priceApproved = false`.
- `FLEET-START` and `FLEET-BUSINESS`: `HYPOTHESIS_UNAPPROVED` price; per vessel
  per month, VAT excluded.
- `FLEET-ENTERPRISE`: `CONDITIONAL`, `NOT_ESTABLISHED` price,
  `CONTRACTED_TIER_NOT_A_CHECKOUT_SKU`, `requiresQuotation = true`,
  `NO_SLA_ESTABLISHED`.
- `ENT-FLEET`: `HYPOTHESIS_UNAPPROVED`, ledger key
  `ORGANIZATION:FLEET_VESSEL`; **0 grants**.
- `FLEET` bundle: `contractedSolution = true`, `hardwareIncludedByDefault =
  false`, `slaEstablished = false`, `fixedPackagePriceEstablished = false`,
  `NOT_FOR_SALE`.
- No FLEET service, platform, tenancy engine, permission engine, device registry
  or telemetry pipeline exists (`FLEET_ENTITLEMENT_SERVICE = NOT_FOUND`).

## 2. Tenancy entities

The target model is defined by
`docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md:154-201`.
MC-16 consumes the identifiers and scope tokens; it does not create the tables.

| Entity | Definition | Identifier | Owning scope |
|---|---|---|---|
| Organization (tenant) | Customer legal/operational entity that owns vessels, memberships and the subscription | `organizationId`, server-generated, opaque | itself |
| Account | A person's login identity, independent of any organisation | `accountId` | person |
| Membership | Binding of one account to one organisation with one role and optional vessel scope | `membershipId` | organisation |
| Role | One of the eight frozen role tokens | role enum | organisation/platform |
| Vessel | Physical vessel registered to exactly one owning organisation | `vesselId`, opaque | organisation |
| Vessel assignment | Grant letting a membership act on a vessel within its role | `assignmentId` | organisation |
| Sharing grant | Explicit, scoped, revocable grant to an external party for named vessels | `grantId` | organisation |
| Device | Telemetry-capable device bound to one organisation and at most one vessel | `deviceId`, serial | organisation |
| Telemetry record | Time-stamped position/status sample or event | `recordId`, `eventId` | organisation |
| Alert / maintenance / document / report | Tenant-owned operational records | stable IDs | organisation |
| Subscription / entitlement | Commercial state authorising FLEET features | `subscriptionId`, `entitlementId` | organisation |
| Support grant | Time-bound, scoped, audited EMBARCARTE staff access to one tenant | `supportGrantId` | platform, targeted at one organisation |

### 2.1 Binding tenant invariants

1. **One owning organisation per resource.** A vessel, device, telemetry record,
   alert, document, report or audit event belongs to exactly one organisation at
   any instant.
2. **The organisation id is server-generated and opaque.** It is never derived
   from a customer name, VAT number, email domain or sequential integer and is
   never accepted from a client as authority.
3. **The tenant is derived, not supplied.** The server resolves authenticated
   account → membership → organisation; `organizationId` in a URL, body or
   header is a claim to check, not a fact to trust.
4. **Ownership never changes implicitly.** Vessel transfer, device transfer and
   membership transfer are explicit, authorised and audited operations.
5. **Cross-tenant references are invalid by construction.** A foreign key that
   would link tenant A data to tenant B data is rejected at write time and must be
   impossible through any import, API or job.
6. **One billing relationship per organisation.** The subscription belongs to the
   organisation, not to a user; changing owner/admin does not change the
   subscriber identity.
7. **Deleting an organisation does not delete another organisation's records.**
   Transferred devices keep a historical owner trail with effective dates.

MC-16 cannot prove invariants 1-7 against a live service because no service
exists. It fixes them as acceptance obligations for the future implementation.

## 3. Organisation / tenant / vessel scope in MC-16

MC-16 represents an entitlement's scope with:

```text
grep_type: ACCOUNT | ORGANIZATION | TENANT | VESSEL | DEVICE
scope_id:  opaque, non-empty, server-resolved identifier
```

`marea_entitlement_grants` is the only MC-16 table with a tenant-like scope
(`schema.ts:300-318`). It contains no organisation name, vessel name, address,
telemetry or personal data. The FLEET plan itself is represented by
`marea_subscription_plans` and `marea_entitlement_definitions`, not by a tenant
record.

### 3.1 Scope mapping

| FLEET object | MC-16 scope token | Rule |
|---|---|---|
| Account-level entitlement (e.g. NAV, WATCH consumer) | `ACCOUNT` | One account ledger |
| FLEET organisation subscription | `ORGANIZATION` or `TENANT` | Must reference the owning organisation; never a client-supplied id |
| FLEET per-vessel activation | `VESSEL` | Vessel must belong to the same organisation; no cross-tenant vessel |
| Device-bound capability | `DEVICE` | Device must be bound to the same organisation and at most one vessel |
| External installer / support grant | no MC-16 entitlement grant | Time-bound, scoped access grant; never an organisation membership |

`ENT-FLEET`'s ledger key `ORGANIZATION:FLEET_VESSEL` encodes the intended
organisation/vessel pairing. **Gap D11-GAP-01:** the MC-16 grant table stores a
single `scope_type`/`scope_id` pair and cannot represent the composite
`(organisation, vessel)` scope in one row. MC-16 creates no grants, so nothing is
ambiguous today; before any FLEET activation the schema must add an explicit
organisation column or a checked composite scope, and the dedupe key must not
treat an organisation grant and a vessel grant as two independent billable units.

### 3.2 Cross-tenant access evaluator

`evaluateCrossTenantAccess()` (`domain.ts:788-797`) compares the grant's scope
type and scope id with the requested scope. Any difference returns
`allowed = false`, `reasonCode = 'CROSS_TENANT_ENTITLEMENT_LEAK_BLOCKED'`; an
exact match returns `SCOPE_MATCH`. There is no wildcard, no "all vessels"
fallback and no union of roles across organisations.

For a future request, all eight authorization factors must pass before this
evaluator is even reached:

1. authenticated, unrevoked session;
2. active membership for (account, organisation);
3. role capability set;
4. resource ownership read from the resource row;
5. vessel assignment, where vessel-scoped;
6. permission present in the role matrix and not removed by edition limits;
7. device ownership for device/telemetry operations;
8. active, accepted, unexpired sharing/support grant for external roles.

If any factor is missing the request is denied and audited, and the response must
not reveal whether the resource exists in another tenant. A foreign id returns a
not-found-equivalent response, records a `CROSS_TENANT_PROBE` security event and
never exposes the target tenant's identity to the requester. UI filtering is
never authorisation; the server check is mandatory.

### 3.3 Current leak surface

- MC-16 has **no** FLEET tenant tables and **no** tenant data, so there is no
  live cross-tenant data path in this milestone.
- MC-16 has **0 grants**, so there is no live entitlement scope to leak.
- The evaluator and the scope columns exist; they are design/test scaffolding,
  not a deployed authorization service.
- A specification test, code review or schema check is **not** runtime isolation
  evidence. The future service must pass a two-tenant negative test suite on
  every entry point (API, list, count, export, report, search, job, webhook).

## 4. The eight roles

Exactly these tokens, no synonyms and no ninth built-in role:

`ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`,
`MAINTENANCE_MANAGER`, `CREW_MEMBER`, `READ_ONLY_VIEWER`,
`EXTERNAL_INSTALLER`, `EMBARCARTE_SUPPORT`.

| Role | Purpose | Default scope |
|---|---|---|
| `ORGANIZATION_OWNER` | Accountable owner; commercial and legal control | Organisation-wide |
| `ORGANIZATION_ADMIN` | Day-to-day administration of members, vessels and settings | Organisation-wide |
| `FLEET_MANAGER` | Operational management of assigned vessels, alerts, tasks, reports | Assigned vessels (normally all) |
| `MAINTENANCE_MANAGER` | Maintenance planning, records, documents, service history | Assigned vessels |
| `CREW_MEMBER` | Operational use of assigned vessels; acknowledges alerts; reads tasks | Assigned vessels |
| `READ_ONLY_VIEWER` | Read-only oversight (owner, insurer, auditor, observer) | Assigned vessels |
| `EXTERNAL_INSTALLER` | Commissioning and fault diagnosis for named devices/vessels, time-bound | Named vessels/devices, expiry |
| `EMBARCARTE_SUPPORT` | Scoped support access on a recorded ticket, audited and time-bound | Named tenant/resource classes |

Rules:

- Deny by default; server-side only; scope first; least privilege; separation of
  duties; no escalation path; external access always time-bound; every role
  change audited.
- A configured permission set may only **narrow** the role. It can never add a
  permission, widen scope, change the role token or exist without an underlying
  membership.
- `EXTERNAL_INSTALLER` never becomes a member, never manages members, billing,
  export or roles, and expires immediately.
- `EMBARCARTE_SUPPORT` is never an organisation member and never a standing
  superuser; every grant needs a ticket, approver, tenant, resource class and
  expiry.
- **No role can hold any `CONTROL_*` capability** (steering, throttle, motor,
  actuator, remote command). Those capabilities are absolutely prohibited for
  every role, including support.

## 5. No default hardware

FLEET is a per-vessel SaaS subscription. Hardware is never included by default:

| Rule | Enforcement |
|---|---|
| `hardwareIncludedByDefault = false` in the FLEET bundle | Dataset value; `marea_bundles` DB check `hardware_included_by_default = 0` |
| WATCH, HUB, SENSE, DISPLAY and AIS are optional, separately purchased lines with their own entitlements/connectivity | Bundle composition: `WATCH-CORE` and `HUB-STANDARD` are `OPTIONAL`; FLEET edition itself has no hardware |
| A hardware purchase is a separate order line with its own entitlements | `evaluateBundleEligibility` rejects `hardwareIncludedByDefault` (`FLEET_HARDWARE_MUST_NOT_BE_DEFAULT`) |
| Onboarding, installation, connectivity and training are separately quoted | FLEET contract; not inside the per-vessel fee |
| No "unlimited" component | Per-vessel/seat/device/API/storage limits must be explicit; values `OPEN` |

`FLEET-ENTERPRISE` is a `CONTRACTED_TIER`, not a checkout SKU. It has no standard
price, no self-service checkout and no invented SLA.

## 6. No default SLA

`FLEET_SLA = NO_SLA_ESTABLISHED`. There is no uptime commitment, measurement,
error budget, credit regime or historical reliability data.

- No percentage, hour count, RTO, RPO, response time or availability figure may
  be stated as a FLEET commitment or achievement.
- Enterprise does not create an SLA by itself; an SLA exists only as a real
  contract with a defined service boundary, measurement method, baseline,
  commitment, evidence and remedy process.
- Permitted wording before an SLA exists: "No service-level commitment is
  established; service levels are not promised."
- Prohibited: "99.9%", "24/7", "response within X", "guaranteed", "always on".
- Bundle and edition data both carry `slaEstablished = false`; schema checks
  `sla_established = 0`.

## 7. Telemetry is read-only

Telemetry flows **device → cloud only**. There is no cloud → device command
channel and no vessel-control path.

| Rule | Contract |
|---|---|
| Direction | Ingestion only; device credentials authorise writing that device's records |
| Commands | No remote engage/disengage, throttle, motor, actuator, heading or configuration command of any kind |
| Tenant resolution | Resolved from the device credential, never from a payload field |
| Credentials | Unique per device, tenant-scoped, rotatable and revocable; never shared across devices or tenants |
| Cross-tenant ingestion | A payload claiming another organisation/device/vessel is rejected |
| Device transfer | Explicit, audited, old credentials revoked, new credentials issued |
| Loss/theft | Credential revocation and rebinding block |
| Presentation | Telemetry gaps display last-known time and never render as a safe state; alerts promise neither instant nor guaranteed delivery |
| Local functions | FLEET subscription state may never alter vessel behaviour or disable local functions |
| Control capabilities | `CONTROL_*` is prohibited for every role and every grant |

The FLEET bundle's optional WATCH/HUB lines do not create a control channel. A
lapsed FLEET subscription stops read-only telemetry and SaaS access only; local
hardware functions and separately held NAV/WEATHER/WATCH entitlements continue
per their own terms.

## 8. Commercial rules for FLEET

| Rule | Value / status |
|---|---|
| Billing unit | Per vessel per month |
| VAT | Excluded (B2B); no approved price/VAT representation |
| Editions | `FLEET-START`, `FLEET-BUSINESS` (hypothesis); `FLEET-ENTERPRISE` (contracted, `NOT_ESTABLISHED`) |
| Organisation fee | Hypothesis: none in Start/Business; Enterprise negotiated; `OPEN` |
| Seats | Included, not charged per seat (hypothesis); numerical cap `OPEN` |
| Vessels | Suggested 1-10 Start / 11-50 Business are commercial aids, not hard technical promises |
| Devices / telemetry / API / storage | Explicit limits, never unlimited; values `OPEN` |
| Onboarding | Separately quoted service, not an entitlement |
| Termination | Read-only telemetry and SaaS access stop; export/deletion offered; local functions and other entitlements continue |
| Contract | No FLEET contract exists; `realContractExists = false`; no billing service |
| Publication | FLEET route `PROPOSED_INTERNAL_NOT_DEPLOYABLE`; no price or SLA markup |

## 9. Current proof and verification

| Check | Method | Result |
|---|---|---|
| 0 organisations / tenants / vessels / grants | No FLEET tables; `grants: []` | 0 |
| 3 FLEET editions, all `NOT_FOR_SALE` | `product-editions.json` | Verified |
| FLEET bundle hardware default false | `bundle-compositions.json` | `false` |
| FLEET bundle SLA false | `bundle-compositions.json`; schema check | `false` |
| FLEET-ENTERPRISE contract-only | edition `skuIdentity`; bundle `contractOnlyEditions` | Verified |
| `ENT-FLEET` hypothesis, 0 grants | `entitlement-definitions.json` | Verified |
| Cross-tenant evaluator exists | `domain.ts:788-797` | Present |
| Telemetry read-only contract | FLEET tenancy contract §8, §24.3; product limitation statement | Defined |
| Data validator | `node scripts/check-marea-commerce-data.mjs` | 1,727/1,727 checks passed |

## 10. Acceptance criteria

| ID | Criterion | Current status |
|---|---|---|
| D11-AC-01 | Organisation/tenant/vessel scope is explicit and server-derived; client-supplied scope is ignored | **PASS (contract + evaluator)**; service not implemented |
| D11-AC-02 | Exactly eight roles with no `CONTROL_*` capability | **PASS (contract)** |
| D11-AC-03 | No cross-tenant entitlement leakage; mismatch denied with a non-enumerating response | **PASS (evaluator)**; runtime suite `NOT_EXECUTED` |
| D11-AC-04 | Hardware is never included by default in FLEET | **PASS (data + schema check + evaluator)** |
| D11-AC-05 | No default SLA; `NO_SLA_ESTABLISHED` and no numeric promise | **PASS (contract + data)** |
| D11-AC-06 | Telemetry is read-only, device→cloud only, with no command channel | **PASS (contract)**; implementation `NOT_AUTHORIZED` |
| D11-AC-07 | 0 real FLEET subscriptions and 0 grants | **PASS (current state)** |
| D11-AC-08 | Composite organisation+vessel scope is representable before activation | **FAIL (design gap D11-GAP-01)** — no grants exist, so no current impact |

## 11. Open items and blockers

- No FLEET service, tenancy engine, permission engine, device registry, telemetry
  pipeline, DPA, DPIA, subprocessor agreement or SLA measurement exists.
- Composite organisation/vessel scope is not representable in the current
  single-scope grant table (D11-GAP-01).
- Retention windows, seat/vessel/device limits, onboarding scope, support grant
  process and organisation fee are `OPEN`.
- `GATE-PRIVACY-DPA-DPIA`, `GATE-DATA-LICENSING`, `GATE-CRA-CYBERSECURITY`,
  `GATE-CONSUMER-TERMS`, `GATE-PRICING`, `GATE-PAYMENTS`, `GATE-LEGAL-ENTITY`
  and the remaining release gates are open; FLEET cannot be offered.
- FLEET must not be described as certified, available, unlimited, SLA-backed or
  remotely controllable.

## 12. References

- `docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md:154-201,
  213-234, 303-328, 457-579, 633-736, 738-820, 1549-1643, 1797-1832` — entities,
  roles, tenant invariants, authorization, devices, SLA, subscription,
  non-assertions.
- `data/entitlement-definitions.json` — `ENT-FLEET` and `ENT-WATCH`.
- `data/entitlement-mappings.json` — `ORGANIZATION:FLEET_VESSEL`, isolation rule
  "tenant scope is validated server-side; client-supplied tenant ids are
  ignored".
- `data/bundle-compositions.json` — FLEET bundle, optional hardware, contract-only
  Enterprise.
- `data/product-editions.json` — FLEET-START/BUSINESS/ENTERPRISE.
- `src/server/marea-commerce/schema.ts:300-318` — grant scope columns and
  synthetic-only constraint.
- `src/server/marea-commerce/domain.ts:788-797` — cross-tenant evaluator.
- `MC16-SUBSCRIPTION-AND-ENTITLEMENT-MODEL.md` (D10) — grant layer.
- `MC16-SQLITE-SCHEMA-AND-MIGRATION-PLAN.md` (D13) — grant table detail.

**Status statement.** This document is an internal target contract for a future
FLEET service. It creates no tenant, vessel, grant or service, and it asserts no
security, privacy, SLA or isolation evidence.
