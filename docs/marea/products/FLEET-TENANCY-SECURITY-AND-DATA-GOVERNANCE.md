# MAREA FLEET — Multi-tenant tenancy, authorization and data-governance contract (MC-07 / D10c)

| Field | Value |
| --- | --- |
| Document ID | MC-07 / D10c-FLEET-TENANCY |
| Milestone | MC-07 (Master Prompt 07/36) — product definitions batch 3 |
| Product | MAREA FLEET (`FLEET`); editions MAREA FLEET Start (`FLEET-START`), MAREA FLEET Business (`FLEET-BUSINESS`), MAREA FLEET Enterprise (`FLEET-ENTERPRISE`) |
| Owner function | Security architecture and data governance, with the FLEET product owner, DPO/counsel and platform engineering |
| Status | `INTERNAL_ONLY` / `TARGET_CONTRACT` / `NOT_IMPLEMENTED` / `NOT_FOR_SALE` / `NOT_PUBLISHED` |
| Lifecycle state | `DEFINED` as a specification; the multi-tenant service it describes does not exist |
| Date | 2026-10-30 |
| Authority | Programme brief (external to this repository, binding input; not a repository artefact) §11 — frozen FLEET tenancy and role model — and `docs/marea/products/README.md` §3–§6, §16, §19; this contract may not introduce a role, state, tenant model or authority path that they do not define |
| Companion dossier | `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` (D3, FLEET product director) — authoritative on capability, editions, segments and commercial detail; this contract is authoritative on tenancy, authorization, audit and data governance |
| Governing architecture | `docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §3 R-A1/R-A3/R-A7, §5.2 X-1/X-3/X-4/X-7, §6 C-1..C-17, §11 W-1..W-8, §13 MC-11A/MC-13-FLEET |
| Governing claims policy | `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §2, §4, §5 |
| Blocker register | `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`: `D-09`, `D-10`, `H-12`, `H-13`, `P-09`, `P-10`, `X-01`, `X-03`, `X-05`, `X-06`, `X-07` |
| Evidence state | `FLEET_MULTI_TENANT_SERVICE = NOT_FOUND`; `FLEET_TENANT_ISOLATION = NOT_IMPLEMENTED`; `FLEET_AUTHORIZATION_ENGINE = NOT_FOUND`; `FLEET_DEVICE_IDENTITY = NOT_FOUND`; `FLEET_AUDIT_LOG = NOT_FOUND`; `FLEET_ENTITLEMENT_SERVICE = NOT_FOUND`; `FLEET_ISOLATION_TESTS = NOT_EXECUTED`; `FLEET_PENETRATION_TEST = NOT_PERFORMED`; `FLEET_DPIA = NOT_COMPLETED`; `FLEET_DPA = NOT_CONTRACTED`; `FLEET_SLA = NO_SLA_ESTABLISHED` |

This contract fixes the intended end-state tenancy, authorization, audit, privacy and data-governance model of
MAREA FLEET. It is a **target contract**: a design requirement for a service that does not exist. Nothing in it is
implemented, deployed, tested, measured, certified or reviewed by a DPO. Where a value is not established it is
`OPEN`; where an external condition prevents closure it is `BLOCKED`.

**One-message summary.** FLEET is an organization-scoped SaaS: one account may belong to several organizations;
every vessel, device, telemetry record, maintenance record, document, report, audit entry and subscription belongs
to exactly one owning organization; the server derives the tenant from the authenticated session and re-derives
the permission on **every** request — a client-supplied tenant id is never trusted (nor a client-supplied organization id, role or permission flag) and UI hiding is never
authorization; membership, role, vessel assignment, sharing grant and device ownership are all checked before any
resource is read or written; removal and revocation take effect immediately across API, cache, search, export and
background jobs; support and installer access is scoped, time-bound and audited; telemetry is read-only with no
steering, motor or remote-control path anywhere; no tenant can read, infer, export, rank or benchmark another
tenant's data; and data-protection roles are assessed **per data flow**, not assumed — EMBARCARTE may be controller
for some flows and processor for others. **A validator that checks this document proves that the specification is
present. It proves nothing about runtime isolation.**

---

## 0. Contents

1. Scope, non-goals and standing rules
2. Vocabulary, entities and identifiers
3. Organization (tenant) model
4. Vessel ownership and assignment
5. Membership, identity, invitation and access
6. The eight-role permission model
7. Tenant scoping and server-side authorization
8. Device-to-organization linking
9. Lifecycle flows: invitation, role change, scope change, transfer, deletion
10. Permission changes and revocation timing
11. Audit logging
12. Background-job isolation
13. Cache, search, export and analytics isolation
14. Data classification, retention and minimisation
15. Customer data export
16. Deletion
17. Controller / processor assessment per data flow (EDPB guidance)
18. Data-processing agreement responsibilities for business customers
19. Subprocessors and international transfers
20. Incident management
21. Personal location privacy
22. Security testing plan (future, executable, not executed)
23. SLA evidence requirements (`NO_SLA_ESTABLISHED`)
24. Subscription authorization tied to tenant entitlements
25. Organization termination
26. Acceptance scenarios — positive and negative, per resource type
27. Threat model summary
28. Evidence register and open items
29. Non-assertions and document status
30. Cross-references and change rule

---

## 1. Scope, non-goals and standing rules

### 1.1 Scope

In scope: the organization/tenant model and its invariants; vessel ownership and vessel assignment; user
membership, invitation, acceptance, suspension, removal and transfer; the eight consolidated roles and their
per-resource permissions; tenant-scoping rules and the server-side authorization decision; device-to-organization
linking and telemetry-credential scoping; the permission-change and revocation timing contract; audit logging;
background-job, cache, search, export and analytics isolation; data classification, retention, export and deletion;
the controller/processor assessment per data flow; DPA obligations toward business customers; subprocessors and
international transfers; incident management; personal location privacy; the future security-testing plan; SLA
evidence requirements; subscription authorization; organization termination; and the positive and negative
acceptance scenarios that a future engineering milestone must execute.

Out of scope and not decided here: the FLEET capability list, edition value differences, segments, pricing,
commercial terms of service, customer journey design, hardware, connectivity procurement, conformity assessment,
and any change to another agent's document. This contract does not create a service, a contract with any
provider, a legal opinion, a DPIA or evidence that MAREA FLEET works.

### 1.2 Non-goals — binding boundaries

1. FLEET is a **business system of record and operations console**, not a control system. It has **no steering,
   throttle, motor, pump or actuator command path**, no remote helm, and no cloud-to-vessel write path
   (architecture §5.2 X-1/X-3; brief §11). Telemetry is read-only.
2. FLEET is **not a consumer monitoring clone** of MAREA WATCH. WATCH owns the consumer alert lifecycle; FLEET
   may consume authorised read-only telemetry under a separate written agreement (README §19, brief §9).
3. FLEET is **not a surveillance product**. It monitors vessels and operational state; it does not track crew or
   guests as persons, and no individual-movement profile is a FLEET feature.
4. **Provider acceptance is not evidence.** No statement in this contract is a measurement, a test result, an
   audit opinion or a certification.
5. **No fabricated service level.** FLEET has `NO_SLA_ESTABLISHED` until a contracted, measured commitment exists.
6. **No customer production data is used** anywhere in this programme, and none may be claimed as a reference.
7. **No public exposure of a tenant's vessels or positions by default**; there is no public fleet map, directory
   or indexable page.
8. **No cross-tenant read, write, inference or benchmark** is a feature. Isolation is a precondition, not a
   differentiator to be marketed.

### 1.3 Standing rules (apply to every later section)

1. **Design intent is labelled as design intent.** Every control below is `OPEN` unless a sentence cites
   `VERIFIED_REPO` evidence (a file that exists in this repository) or `VERIFIED_EXTERNAL` evidence (a public
   source with a check date). No control is described as working.
2. **Deny by default.** A request that cannot be positively authorised through §7.1 is rejected, logged and
   answered without disclosing tenant existence.
3. **The server is the only authority.** Client-supplied organization ids, role names, vessel ids, device ids,
   permission flags and "is admin" booleans are untrusted input at all times.
4. **Authorization is re-derived per request.** Token claims may carry identity and session metadata; they never
   carry the final permission decision for a resource operation (see §10.1).
5. **Isolation is layered.** Application authorization, tenant-scoped queries, database-level isolation, storage
   key isolation, cache/search key isolation and job-context propagation are independent layers; the failure of
   one must be detectable by another (§7.7).
6. **Every sensitive act is audited** with actor, tenant, resource, action, result and time, and the audit record
   is itself tenant-scoped when a customer reads it (§11).
7. **A specification check is not a security test.** The MC-07 validator checks that this contract contains the
   required sections, tokens and scenarios. It cannot execute isolation, cannot observe a runtime, and cannot
   promote any `OPEN` control in this document (§22, §29).

### 1.4 Document evidence states (canonical strings used throughout)

| State | Value | Meaning |
| --- | --- | --- |
| `FLEET_MULTI_TENANT_SERVICE` | `NOT_FOUND` | no multi-tenant service exists (P-09) |
| `FLEET_TENANT_ISOLATION` | `NOT_IMPLEMENTED` | no tenant boundary is coded or tested |
| `FLEET_AUTHORIZATION_ENGINE` | `NOT_FOUND` | no policy engine, no denial tests |
| `FLEET_DEVICE_IDENTITY` | `NOT_FOUND` | no provisioning, binding, revocation or credential lifecycle (X-07) |
| `FLEET_AUDIT_LOG` | `NOT_FOUND` | no append-only audit store |
| `FLEET_ENTITLEMENT_SERVICE` | `NOT_FOUND` | no subscription or entitlement service |
| `FLEET_ISOLATION_TESTS` | `NOT_EXECUTED` | no cross-tenant test has run |
| `FLEET_PENETRATION_TEST` | `NOT_PERFORMED` | no independent penetration test exists |
| `FLEET_DPIA` | `NOT_COMPLETED` | no DPIA exists or is signed off |
| `FLEET_DPA` | `NOT_CONTRACTED` | no data-processing agreement exists with any customer or processor |
| `FLEET_SLA` | `NO_SLA_ESTABLISHED` | no uptime commitment, measurement or credit regime exists |
| `FLEET_SECURITY_CERTIFICATION` | `NONE` | no ISO 27001, SOC 2 or equivalent exists; none may be claimed |

Evidence class for §1.4: `VERIFIED_REPO` (the frozen values restate brief §11 and the MC-02 blocker register);
the absence findings are the MC-02 audit's, not a new measurement.

---

## 2. Vocabulary, entities and identifiers

### 2.1 Entities

| Entity | Definition | Identifier | Owning scope |
| --- | --- | --- | --- |
| Organization (tenant) | The customer legal or operational entity that owns vessels, memberships and the subscription | `organizationId` (server-generated, opaque) | itself |
| Account | A person's login identity, independent of any organization | `accountId` | person |
| Membership | The binding of one account to one organization with one role and an optional vessel scope | `membershipId` | organization |
| Role | One of the eight consolidated roles of §6 | role enum token | organization (or platform for support) |
| Vessel | A physical vessel registered to exactly one owning organization | `vesselId` | organization |
| Vessel assignment | The grant that lets a membership act on a specific vessel within its role | `assignmentId` | organization |
| Sharing grant | An explicit, scoped, revocable grant to an external party (installer, surveyor, manager) for named vessels | `grantId` | organization |
| Device | A telemetry-capable MAREA or compatible device bound to one organization and at most one vessel | `deviceId`, serial | organization |
| Telemetry record | A time-stamped position/status sample or event received from a device | `recordId`, `eventId` | organization |
| Alert (FLEET operational) | A FLEET operational condition or exception, not the consumer WATCH alert lifecycle | `alertId` | organization |
| Maintenance task / record | Planned or completed maintenance work on a vessel | `taskId` | organization |
| Document | An uploaded file attached to a vessel, task, device or organization | `documentId` | organization |
| Report / export job | A generated report or data export, produced by a background job | `jobId`, `exportId` | organization |
| Audit event | An append-only record of a sensitive act | `auditId` | organization (visible scope) / platform (security scope) |
| Subscription / entitlement | The commercial state that authorises FLEET features for an organization | `subscriptionId`, `entitlementId` | organization |
| Support grant | A time-bound, scoped, audited EMBARCARTE staff access grant to a tenant | `supportGrantId` | platform, targeted at one organization |

### 2.2 The eight roles (exactly these tokens; no synonyms)

`ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`, `CREW_MEMBER`,
`READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER` (scoped, time-bound, vessel-level), `EMBARCARTE_SUPPORT` (scoped,
audited, time-bound, never an organization membership).

A **configured permission set** (the Business capability FL11 of the edition authority document
`PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`) may be saved for a membership: it is a named, narrower subset of the
permissions that the membership's role already holds, at the membership's own vessel scope. It is configuration,
not a ninth role: it can never add a permission, never widen scope, never change the role token the platform
recognises and never be assigned to a person without an underlying membership. A configured set that would exceed
the role is rejected, not clamped silently.

Evidence class: `VERIFIED_REPO` (brief §11 freezes the eight-role consolidation; D4 FL11 defines the Business
configured-permission-set capability). No ninth built-in role and no per-customer role-token builder exists in this
definition; adding one would require a brief revision.

### 2.3 Scope tokens used in this document

| Token | Meaning |
| --- | --- |
| `ORG` | organization-level (tenant-wide) |
| `VSL` | one named vessel within the organization |
| `SELF` | the acting account's own membership and personal data only |
| `SUPPORT_SCOPE` | a named tenant, a named resource class, a named time window and a recorded ticket |
| `INSTALLER_SCOPE` | named vessels, named device/resource classes, a start and an expiry |
| `NONE` | no access under any condition |

### 2.4 Evidence classes (README §5, reused unchanged)

`VERIFIED_REPO`, `VERIFIED_EXTERNAL`, `ASSUMPTION`, `HYPOTHESIS`, `OPEN`, `BLOCKED`. No other evidence token is
used. A control that is designed but not built is `OPEN`; a control that needs a missing external artefact is
`BLOCKED`; a commercial assumption is `HYPOTHESIS` and never a fact.

---

## 3. Organization (tenant) model

### 3.1 Definition and invariants

An organization is the sole tenant boundary of FLEET. The following invariants are binding on the future service:

1. **Exactly one owning organization per tenant resource.** A vessel, device, telemetry record, maintenance
   record, document, report, alert and audit event belongs to exactly one organization at any instant.
2. **The organization id is server-generated and opaque.** It is never derived from a customer name, VAT number,
   email domain or sequential integer; it is not guessable and it is never accepted from a client as authority.
3. **The tenant is derived, not supplied.** For every request the server resolves the authenticated account,
   then the membership record, then the organization; the `organizationId` in the URL, body or header is treated
   as a *claim to check*, not a fact to trust (§7.1).
4. **A resource never changes owner implicitly.** Vessel transfer, device transfer and membership transfer are
   explicit, authorised, auditable operations (§9.5, §9.6, §4.6). No update path may silently re-point a resource.
5. **Cross-tenant references are invalid by construction.** A foreign key that would link tenant A data to tenant
   B data is rejected at write time and must also be impossible to create through any import, API or job.
6. **One billing relationship per organization.** The subscription belongs to the organization, not to a user;
   changing owner or admin does not change the subscriber identity.
7. **Deleting an organization does not delete another organization's records.** Shared infrastructure records
   (e.g. a device that was transferred) keep a correct historical owner trail with effective dates.

Evidence class: `OPEN` — target design; no multi-tenant service exists (P-09). Invariants 1, 4 and 5 restate
architecture §6 single-writer rules (R-A7) and §5.2 X-7.

### 3.2 Organization lifecycle states (tenant governance, not product status)

| State | Meaning | Allowed effects |
| --- | --- | --- |
| `PROVISIONING` | organization created, no billable entitlement active yet | owner can configure; no telemetry ingestion |
| `ACTIVE` | subscription or contracted entitlement in force | full authorised use |
| `RESTRICTED` | payment/entitlement problem or customer request | read-only over existing data; no new devices, invitations or integrations; no deletion of history |
| `SUSPENDED` | security, abuse or contractual hold | access limited to owner/security contact; evidence preserved; no data deletion |
| `TERMINATION_PENDING` | termination initiated, export window running | read-only access for authorised owner/admin; export available |
| `TERMINATED` | service ended, data deleted per §16/§25 | only the minimum legal record remains |
| `ARCHIVED` | historical shell retained after legal retention only | no access; not usable, not re-activatable without a new contract |

Transition rules: only `ORGANIZATION_OWNER` (and platform security for `SUSPENDED`) may initiate a state change;
every transition is audited; `SUSPENDED` and `RESTRICTED` never delete data; a `TERMINATED` organization can never
be silently restored with its old data; a new contract creates a new organization id. These state names are
*tenant* states and must never be confused with product lifecycle states (README §3) or edition verdicts
(README §14).

Evidence class: `OPEN` — target design.

### 3.3 Organization creation and identity

- Creation requires an authenticated account, a verified billing or contractual relationship and a named owner.
- The creator becomes `ORGANIZATION_OWNER`; the organization cannot exist without at least one owner.
- Organization profile fields (legal name, operational name, country, contact, fleet descriptors) are tenant
  data; changes are audited with before/after summary.
- Duplicate legal entities are not merged automatically; a merge is a support-assisted, audited operation with
  explicit confirmation from both organizations' owners.
- The organization cannot be created from, or bound to, a tenant id supplied by the browser.
- VAT/tax identifiers are billing data, not authorisation data.

Evidence class: `OPEN`; the seller's own legal identity required to contract is `BLOCKED` (X-02, outside this
document's ownership but a precondition for any real DPA).

### 3.4 Personal account versus organization

A personal account may exist without any organization (for example an owner with a single vessel and no fleet).
FLEET features are organisation-scoped; the personal context is only a navigation convenience. A person may:

- own one or more organizations in which they hold `ORGANIZATION_OWNER`;
- be a member of other organizations with lower roles;
- hold *different roles in different organizations simultaneously*;
- never let the role in one organization influence another (the role is read from the membership of the target
  organization only).

Evidence class: `OPEN` — target design; no account system with organizations exists (architecture §4.1 gaps).

### 3.5 Seat model and edition limits (commercial constraints that the service must enforce)

| Constraint | Intended rule | Status |
| --- | --- | --- |
| Users/seats | Included, not charged per seat in `FLEET-START` and `FLEET-BUSINESS`; Enterprise negotiated (brief §4) | `HYPOTHESIS`; numerical seat cap `OPEN` |
| Vessels | Suggested 1–10 for Start, 11–50 for Business; not a hard commercial promise until commercially authorised | `HYPOTHESIS` |
| Devices per vessel | Bounded by the contracted telemetry package; value `OPEN` | `OPEN` |
| Telemetry/storage/API limits | Explicit, never "unlimited"; values `OPEN` and must be published before sale | `OPEN` |
| Organisation fee | Hypothesis: none in Start/Business; Enterprise negotiated | `HYPOTHESIS` |

The service must enforce the contracted limit server-side (§24.5) and must never let an over-limit state silently
delete or hide safety-relevant data; the documented degradation order applies.

Evidence class: `HYPOTHESIS` (commercial) + `OPEN` (technical enforcement). Prices themselves are frozen in
brief §4 and are not restated as offers here.

---

## 4. Vessel ownership and assignment

### 4.1 Vessel entity

A vessel is an organization-owned record with: opaque `vesselId`; display name; registration/flag data as
provided by the customer (never verified by EMBARCARTE unless a separate contracted service does so); type and
descriptors; owning `organizationId`; current operational status; optional device bindings; assignment list.
Vessel records are tenant data. A vessel may have a historic owner trail so that transfers remain auditable.

### 4.2 Single owning organization invariant

- A vessel belongs to **exactly one** owning organization at a time. There is no shared ownership, no
  "co-owned vessel" record and no cross-tenant vessel view.
- A second organization may obtain access only through an explicit, scoped, revocable sharing grant created by
  the owning organization (§4.4) or through a transfer (§4.6). Neither creates a second owner.
- Deleting a vessel with telemetry history requires an explicit decision: history is either exported first or
  deleted per retention policy, and the action is audited (§16).

### 4.3 Vessel assignment to members

- A membership may hold an organization-wide scope (all vessels) or a named subset. `CREW_MEMBER`,
  `MAINTENANCE_MANAGER`, `EXTERNAL_INSTALLER` and `READ_ONLY_VIEWER` are normally vessel-scoped; roles granted
  "all vessels" must be an explicit act by an owner/admin, not a default.
- Assignment is a grant of *reach*, not a grant of *permission*: the role's permission matrix (§6.4) still
  applies. A crew member assigned to vessel V cannot edit maintenance just because V is assigned.
- An assignment without a matching role permission is inert; a role permission without an assignment to the
  target vessel grants nothing for that vessel.
- Assignment changes are audited and, for removal, take effect immediately (§10).

### 4.4 Delegated access to a vessel (sharing grant)

Used when an owner wants a third party (installer, surveyor, management company) to access named vessel data
without adding that party as an organization member.

1. The grant names the recipient (an account), the specific vessels, the resource classes, the permission set
   (a strict subset of the granting role's permissions), the start time and a mandatory expiry.
2. The grant is created only by `ORGANIZATION_OWNER` or `ORGANIZATION_ADMIN` (or by a member explicitly delegated
   that right, if such a delegation is ever authorised).
3. The recipient accepts the grant; before acceptance it grants nothing.
4. The grant can be revoked at any time and expires automatically; expiry and revocation are immediate across all
   surfaces (§10).
5. A grant confers no membership, no role, no billing visibility and no ability to invite, export or transfer.
6. Every use of a grant is audited against the grant id and the owning organization.
7. Historical records created by the recipient remain tenant data after revocation; the recipient's access ends.

Evidence class: `OPEN` — target design; the installer/manager sharing model is required by the FLEET definition
and by README §19; no sharing implementation exists (P-09, X-07).

### 4.5 Vessel identity and registration integrity

- Vessel identity is customer-provided and must be labelled as such in the UI; FLEET must never imply it has
  verified flag, registration, ownership or seaworthiness.
- Duplicate vessels within an organization are flagged for the customer to resolve; they are never merged
  silently.
- A vessel may exist before any device is bound; binding a device to a vessel is a separate authorised act (§8).

### 4.6 Vessel transfer between organizations

Preconditions: current owning organization `ACTIVE` or `TERMINATION_PENDING`; both organizations' owners (or
authorised admins) consent; the vessel is not under legal hold; any bound devices are either transferred with it
or unbound explicitly.

Flow: (1) initiating owner requests transfer naming the recipient organization and the recipient owner account;
(2) the recipient owner accepts inside their own organization; (3) the server verifies the acting membership,
the permission `VESSEL_TRANSFER`, the absence of a conflicting device binding and the recipient organization's
active state; (4) the owning `organizationId` changes atomically; (5) all previous assignments, sharing grants
and installer grants on that vessel are revoked; (6) telemetry history follows the vessel only under an explicit
choice — move, export-then-delete, or leave with the previous owner as an archived copy; (7) both organizations
receive an audit record, each visible only within its own tenant; (8) the previously owning organization loses
access immediately.

Prohibited: a transfer that leaves a stale grant, that copies another tenant's telemetry into the recipient
without an explicit choice, that is triggered by a background job without an authenticated human action, or that
is initiated by `EXTERNAL_INSTALLER` or `EMBARCARTE_SUPPORT`. A support-assisted transfer requires a recorded
support grant and the customer's explicit confirmation.

Evidence class: `OPEN`; the "vessel transfer auditable" assertion is frozen in brief §11 and must be evidenced by
an executed positive and negative test (§26).

### 4.7 Vessel retirement

Archiving a vessel hides it from operational views, stops new telemetry ingestion for bound devices, retains
history per retention, and is reversible by an owner within a defined window (`OPEN`). Hard deletion follows §16
and requires export first where history exists.

---

## 5. Membership, identity, invitation and access

### 5.1 Account and authentication (boundaries)

- Authentication establishes `accountId`. It does not establish any organization permission.
- Supported factor policy is `OPEN`; the design requirement is that a privileged role (owner, admin) can be
  required to use a second factor, and that sessions are revocable server-side.
- Passwords, tokens and recovery secrets are never logged, never placed in URLs readable by third parties and
  never returned by an API in clear.
- Social/enterprise identity federation is `OPEN`/Enterprise-conditional; if added, identity linking must not
  merge accounts across organizations implicitly.
- A session may be bound to one organization for UI convenience, but every request still re-derives membership;
  switching organization in the UI never reuses another organization's authorisation.

### 5.2 Membership record

Fields: `membershipId`, `organizationId`, `accountId`, role, scope (all vessels or a vessel list), state, invited-by,
invited-at, accepted-at, last-access-at, created/updated audit references. State machine:
`INVITED` → `ACTIVE` → (`SUSPENDED` | `REMOVED`) and `INVITED` → `EXPIRED`. A `REMOVED` or `SUSPENDED`
membership grants nothing. `SUSPENDED` preserves the record for accountability and can be restored by an
authorised role; `REMOVED` requires a new invitation to return.

### 5.3 Invitation

1. Only `ORGANIZATION_OWNER` and `ORGANIZATION_ADMIN` may invite, subject to the edition's role rules (§6.7).
2. An invitation is addressed to a named email/identity, is single-use, time-limited (value `OPEN`), and is
   recorded with inviter, proposed role and proposed scope.
3. An invitation grants nothing until accepted. It cannot be forwarded to a different identity and used: the
   accepting account must match the invited identity.
4. The inviter cannot grant a role or permission they do not themselves hold; an admin cannot invite an owner.
5. Invitation delivery goes through a notification channel; delivery is not acceptance and acceptance is not a
   permission grant until the membership record is `ACTIVE`.
6. Revoking an invitation is immediate and audited; an already-accepted membership is removed through §9.4.

### 5.4 Acceptance

The accepting account must be authenticated, must confirm the organization and role it is joining, and must
explicitly accept the terms applicable to members (at minimum internal acceptable-use and privacy notice
reference). On acceptance the server: verifies the invitation state and identity match; creates or activates the
membership with the invited role and scope; records acceptance time; notifies the inviters; writes audit events
visible to the organization. An accepted membership whose role the inviter could no longer grant is rejected and
flagged, not silently applied.

### 5.5 Identity verification for sensitive acts

Sensitive acts (ownership transfer, organization termination, email/identity change, data deletion, support-grant
approval, device unbinding) require a stronger check than an ordinary session: re-authentication or a fresh
second factor (value `OPEN`). Verification attempts and outcomes are audited. A support agent may never approve a
customer's identity verification on the customer's behalf.

### 5.6 Membership states and precedence

Exactly one membership per (account, organization) pair. If two records would exist (for example after a
transfer), the server must resolve deterministically and audit the resolution; it must never merge permissions
from two records into a union. Role precedence is not a hierarchy shortcut: higher roles include the lower role
capabilities only where §6.4 explicitly shows them; a permission absent from the matrix is absent.

### 5.7 Platform support identity (`EMBARCARTE_SUPPORT`)

Support staff never hold an organization membership. They hold a platform identity and an explicit support grant
naming: the customer organization, the resource classes, the reason/ticket reference, the approver, the start
and a mandatory expiry. Support access is display/read by default; any write action requires a separate,
explicitly granted scope (for example correcting a vessel name on the customer's written request) and is
audited and notified to the customer's owner. The customer can see current and past support access to their data
(§11.7). Support access never includes: billing changes, membership changes, data export beyond the scoped
resource class, organization termination, or any control function (none exists).

---

## 6. The eight-role permission model

### 6.1 Design rules

1. **Deny by default**: a capability not shown as permitted is denied.
2. **Server-side only**: the matrix is enforced in the authorisation service, never merely by hiding UI.
3. **Scope first**: a permission applies only within the organization and, where vessel-scoped, only to assigned
   vessels.
4. **Least privilege**: roles are additive only through explicit cells; no implicit inheritance from "admin".
5. **Separation of duties**: the person who manages maintenance does not also manage billing; the external
   installer never manages members; support never becomes an org admin.
6. **No escalation path**: no role may grant itself or another role a permission the granting role lacks;
   ownership transfer is the only route to owner, and it requires the current owner's verification.
7. **Time-bound external access**: `EXTERNAL_INSTALLER` and `EMBARCARTE_SUPPORT` always carry an expiry.
8. **Every role change is audited** with actor, target, before, after, tenant and time (§11).

### 6.2 Permission taxonomy (capability classes)

The matrix uses capability ids grouped by resource. Capability ids are internal design tokens, not customer
labels.

| Group | Capability ids |
| --- | --- |
| Organization | `ORG_VIEW`, `ORG_EDIT`, `ORG_BILLING`, `ORG_EXPORT`, `ORG_TERMINATE`, `ORG_TRANSFER_OWNER` |
| Members | `MEMBER_VIEW`, `MEMBER_INVITE`, `MEMBER_ROLE`, `MEMBER_REMOVE`, `MEMBER_SCOPE` |
| Vessels | `VESSEL_VIEW`, `VESSEL_CREATE`, `VESSEL_EDIT`, `VESSEL_DELETE`, `VESSEL_TRANSFER`, `VESSEL_ASSIGN` |
| Telemetry | `TELEMETRY_LIVE`, `TELEMETRY_HISTORY`, `TELEMETRY_EXPORT` |
| Alerts | `ALERT_VIEW`, `ALERT_ACK`, `ALERT_CONFIGURE` |
| Maintenance | `MAINT_VIEW`, `MAINT_CREATE`, `MAINT_EDIT`, `MAINT_CLOSE` |
| Documents | `DOC_VIEW`, `DOC_UPLOAD`, `DOC_DELETE` |
| Crew records | `CREW_VIEW`, `CREW_EDIT` |
| Reporting | `REPORT_VIEW`, `REPORT_CREATE`, `REPORT_SCHEDULE` |
| Devices | `DEVICE_VIEW`, `DEVICE_BIND`, `DEVICE_REVOKE`, `DEVICE_COMMISSION` |
| Integrations | `INTEGRATION_VIEW`, `INTEGRATION_MANAGE`, `APIKEY_MANAGE` |
| Audit | `AUDIT_VIEW` |
| Support | `SUPPORT_GRANT_VIEW`, `SUPPORT_GRANT_APPROVE` |
| External access | `INSTALLER_GRANT_MANAGE` |
| Absolute prohibition | `CONTROL_*` (steering, throttle, motor, actuator, remote command) — no role, ever |

### 6.3 Role definitions (one line each; detail in the matrix)

| Role | Purpose | Default scope |
| --- | --- | --- |
| `ORGANIZATION_OWNER` | accountable owner of the tenant; commercial and legal control | organization-wide |
| `ORGANIZATION_ADMIN` | day-to-day administration of members, vessels and settings | organization-wide |
| `FLEET_MANAGER` | operational management of assigned vessels, alerts, tasks and reports | assigned vessels (normally all) |
| `MAINTENANCE_MANAGER` | maintenance planning, records, documents and service history | assigned vessels |
| `CREW_MEMBER` | operational use of assigned vessels; acknowledges alerts; reads tasks | assigned vessels |
| `READ_ONLY_VIEWER` | read-only oversight (owner, insurer, auditor, observer) | assigned vessels |
| `EXTERNAL_INSTALLER` | commissioning and fault diagnosis for named devices/vessels, time-bound | named vessels/devices, expiry |
| `EMBARCARTE_SUPPORT` | scoped support access on a recorded ticket, audited and time-bound | named tenant and resource classes |

### 6.4 Permission matrix

Legend: **✓** permitted by default · **△** permitted only when explicitly configured for that membership/vessel,
narrower by default · **—** denied · **S** only through an active `EMBARCARTE_SUPPORT` grant with that resource
class and a recorded ticket · **I** only through an active, accepted, unexpired `EXTERNAL_INSTALLER` grant limited
to the named vessels/devices · **✕** absolutely prohibited for every role.

| Capability | OWNER | ADMIN | FLEET_MGR | MAINT_MGR | CREW | VIEWER | INSTALLER | SUPPORT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ORG_VIEW` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | I | S |
| `ORG_EDIT` | ✓ | ✓ | — | — | — | — | — | — |
| `ORG_BILLING` | ✓ | △ | — | — | — | — | — | — |
| `ORG_EXPORT` | ✓ | △ | — | — | — | — | — | — |
| `ORG_TERMINATE` | ✓ | — | — | — | — | — | — | — |
| `ORG_TRANSFER_OWNER` | ✓ | — | — | — | — | — | — | — |
| `MEMBER_VIEW` | ✓ | ✓ | ✓ | △ | — | — | — | S |
| `MEMBER_INVITE` | ✓ | ✓ | — | — | — | — | — | — |
| `MEMBER_ROLE` | ✓ | △ | — | — | — | — | — | — |
| `MEMBER_REMOVE` | ✓ | ✓ | — | — | — | — | — | — |
| `MEMBER_SCOPE` | ✓ | ✓ | — | — | — | — | — | — |
| `VESSEL_VIEW` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | I | S |
| `VESSEL_CREATE` | ✓ | ✓ | △ | — | — | — | — | — |
| `VESSEL_EDIT` | ✓ | ✓ | ✓ | △ | — | — | I | — |
| `VESSEL_DELETE` | ✓ | △ | — | — | — | — | — | — |
| `VESSEL_TRANSFER` | ✓ | — | — | — | — | — | — | — |
| `VESSEL_ASSIGN` | ✓ | ✓ | — | — | — | — | — | — |
| `TELEMETRY_LIVE` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | I | S |
| `TELEMETRY_HISTORY` | ✓ | ✓ | ✓ | ✓ | △ | △ | I | S |
| `TELEMETRY_EXPORT` | ✓ | △ | △ | — | — | — | — | — |
| `ALERT_VIEW` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | I | S |
| `ALERT_ACK` | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — |
| `ALERT_CONFIGURE` | ✓ | ✓ | ✓ | △ | — | — | — | — |
| `MAINT_VIEW` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | I | S |
| `MAINT_CREATE` | ✓ | ✓ | ✓ | ✓ | — | — | — | — |
| `MAINT_EDIT` | ✓ | ✓ | △ | ✓ | — | — | — | — |
| `MAINT_CLOSE` | ✓ | ✓ | △ | ✓ | — | — | — | — |
| `DOC_VIEW` | ✓ | ✓ | ✓ | ✓ | △ | ✓ | I | S |
| `DOC_UPLOAD` | ✓ | ✓ | ✓ | ✓ | — | — | I | — |
| `DOC_DELETE` | ✓ | ✓ | △ | ✓ | — | — | — | — |
| `CREW_VIEW` | ✓ | ✓ | ✓ | ✓ | — | — | — | S |
| `CREW_EDIT` | ✓ | ✓ | ✓ | — | — | — | — | — |
| `REPORT_VIEW` | ✓ | ✓ | ✓ | ✓ | — | △ | — | S |
| `REPORT_CREATE` | ✓ | ✓ | ✓ | — | — | — | — | — |
| `REPORT_SCHEDULE` | ✓ | △ | △ | — | — | — | — | — |
| `DEVICE_VIEW` | ✓ | ✓ | ✓ | ✓ | △ | ✓ | I | S |
| `DEVICE_BIND` | ✓ | ✓ | △ | — | — | — | I | — |
| `DEVICE_REVOKE` | ✓ | ✓ | △ | — | — | — | — | — |
| `DEVICE_COMMISSION` | ✓ | ✓ | △ | — | — | — | I | — |
| `INTEGRATION_VIEW` | ✓ | ✓ | ✓ | — | — | — | — | S |
| `INTEGRATION_MANAGE` | ✓ | △ | — | — | — | — | — | — |
| `APIKEY_MANAGE` | ✓ | △ | — | — | — | — | — | — |
| `AUDIT_VIEW` | ✓ | ✓ | — | — | — | — | — | — |
| `SUPPORT_GRANT_VIEW` | ✓ | ✓ | — | — | — | — | — | — |
| `SUPPORT_GRANT_APPROVE` | ✓ | — | — | — | — | — | — | — |
| `INSTALLER_GRANT_MANAGE` | ✓ | ✓ | — | — | — | — | — | — |
| `CONTROL_STEER` / `CONTROL_THROTTLE` / `CONTROL_MOTOR` / `CONTROL_ACTUATOR` / `CONTROL_REMOTE_COMMAND` | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |

Reading rules for the matrix:

- A **△** cell is denied until an explicit configuration exists; the default is the narrower value. For example,
  `MEMBER_VIEW` for `MAINTENANCE_MANAGER` is permitted only if the owner/admin enables member visibility for
  maintenance roles (needed on some sites for coordination); it is never enabled by the mere presence of the role.
- **S** and **I** cells are never reachable by a normal session. They require an active grant (support) or an
  accepted installer grant (installer), and they are limited to the granted resource classes and vessels.
- The matrix is per organization. A user holding `FLEET_MANAGER` in organization A and `READ_ONLY_VIEWER` in B
  receives exactly the intersection of role × scope in each organization, never the union.
- **No role can grant a capability it does not hold.** `ORGANIZATION_ADMIN` cannot grant `ORG_TERMINATE`,
  `VESSEL_TRANSFER` or ownership; only the owner can, and only with verification.
- **Edition limits** (§6.7) may further restrict cells, never expand them.

Evidence class: `OPEN` — target design; no permission engine exists.

### 6.5 `EXTERNAL_INSTALLER` scope contract

The external installer role is the only role designed for a person outside the organization. Its contract:

1. Created by `ORGANIZATION_OWNER`/`ORGANIZATION_ADMIN` as a sharing grant; it names the installer's account, the
   vessels, the device/resource classes and a mandatory expiry.
2. Permitted by the matrix: view organization context needed for the job, view vessels, live telemetry and
   history for named vessels, view alerts, maintenance and documents for the job, bind/commission named devices,
   upload commissioning documents.
3. Denied: member management, billing, export, reporting beyond the job, audit log, integration/API keys,
   vessel transfer, role or grant management, any control capability (none exists).
4. It can never be converted into a member role. If the customer wants the installer as a member, that is a new
   invitation with a normal role; the installer grant is revoked.
5. It expires; expiry is immediate and revokes access on every surface (§10).
6. Every action is audited and visible to the owning organization; the installer sees only its own grant context.

### 6.6 `EMBARCARTE_SUPPORT` scope contract

1. Platform identity, never an organization member; access only through a support grant with ticket reference,
   approver, tenant, resource classes, start and expiry.
2. Default read-only; display of tenant data only for the named resource class and purpose.
3. Any write scope is a separate explicit grant and is notified to the customer's owner.
4. Never permitted: membership changes, billing changes, ownership transfer, organization termination, data
   export outside the scoped class, creating API keys or integrations, or disabling audit.
5. Support actions are audited with the agent identity, grant id and ticket; the customer can see current and
   past support access to their organization.
6. Support access must not become a standing "superuser" session. A grant without expiry is invalid and must be
   rejected by the service.
7. Support staff are subject to the same tenant-isolation checks; a support grant for tenant A never authorises
   tenant B, even for the same customer group.

### 6.7 Edition constraints on roles and capabilities

| Capability | START | BUSINESS | ENTERPRISE |
| --- | --- | --- | --- |
| Six organization roles (owner/admin/fleet/maintenance/crew/viewer) | ✓ | ✓ | ✓ |
| `EXTERNAL_INSTALLER` sharing grants | ✓ | ✓ | ✓ |
| Reporting and service planning (D4 FL13) | — (operational list views only) | ✓ (`INCLUDED_CONDITIONAL`) | ✓ contracted scope |
| Integrations / API keys (D4 FL14) | — | ✓ (published allowance) | ✓ contracted scope |
| Tenant-scoped audit log (D4 FL15) | ✓ | ✓ | ✓ |
| Account and access-review reporting (D4 FL16) | — | — | ✓ contracted scope |
| Support-grant visibility to customer | ✓ | ✓ | ✓ |
| Configurable permission sets (D4 FL11; narrowing only) | — | ✓ (narrower than the role; never a new permission) | ✓ contracted scope |

Edition limits are enforced server-side (§24.5) and never by hiding a UI element alone. A capability not
entitled must fail closed with a clear, honest message, not a generic error that implies a bug.

Evidence class: `HYPOTHESIS`/`OPEN` — edition differentiation is defined commercially in brief §4 and in the
companion dossier; entitlement enforcement is not implemented.

---

## 7. Tenant scoping and server-side authorization

### 7.1 The authorization decision (all eight factors, every sensitive request)

Every sensitive operation — read, list, aggregate, search, export, mutate, delete, transfer, invite, revoke,
configure, commission, generate report — is authorised by a single server-side pipeline that evaluates, in order:

1. **Authenticated user**: a valid, unrevoked session for `accountId`. No anonymous access to tenant data.
2. **Membership**: an `ACTIVE` membership for (`accountId`, target `organizationId`) — or an active support /
   installer grant where the role is external.
3. **Role**: the membership role (or grant type) supplies the candidate capability set.
4. **Resource ownership**: the target resource's owning `organizationId` equals the tenant being acted in. This
   is checked from the resource row, not from the request.
5. **Vessel assignment**: if the capability is vessel-scoped, the acting membership is assigned to the target
   vessel (or holds an organization-wide scope explicitly granted).
6. **Permission**: the capability id is present for that role in §6.4, and edition limits (§6.7) do not remove it.
7. **Device ownership**: for device, telemetry and commissioning operations, the device is bound to the same
   organization and, where relevant, to the target vessel.
8. **Sharing / support grant**: for external roles, an active, accepted, unexpired grant covers exactly this
   resource class, vessel/device and action.

If any factor is missing, the request is denied. The denial is recorded (§11) and returned without revealing
whether the resource exists (§7.5). The pipeline is applied to **object-level** operations, not only to route
prefixes: knowing the URL of another tenant's vessel, report, document or export is never sufficient.

### 7.2 The server-derived tenant rule

- The tenant context is resolved from the session, then the membership, then the resource. A request that
  supplies `organizationId` is validated against all three; a mismatch is a denial and a security event, not a
  silent switch.
- Client-supplied values that are **never** trusted as authority: `organizationId`, role name, permission flag,
  `vesselId` in a create payload, `deviceId` in a bind payload, `accountId` in a membership change, `tenant` header,
  JWT role claims used as the final decision, hidden form fields, local storage, URL path segments that encode a
  tenant, "admin mode" query parameters.
- Server-side derivation must use the same code path for every entry point: web API, mobile API, public API,
  internal admin API, export generator, report generator, webhook handler and background job.

### 7.3 Endpoint classes and their scoping rules

| Class | Rule |
| --- | --- |
| List / index | The query is scoped by tenant **in the data access layer** (not by post-filtering a full result). Pagination, counts and sort must not reveal another tenant's totals |
| Read one | Object-level check; a non-owned id returns a not-found-equivalent response |
| Create | The owning tenant is taken from the authorised context; a client-supplied owner is rejected |
| Update / delete | Object-level check plus capability check plus state check |
| Aggregate / dashboard | Aggregates computed only over the authorised tenant scope; no cross-tenant comparison, ranking or benchmark |
| Search | Index query carries the tenant filter as a mandatory, non-optional parameter (§13.2) |
| Export / report | Capability check plus tenant scope plus field-level permission; generated in a scoped job (§12) |
| Bulk operations | Scope is validated per item; a bulk endpoint may not widen reach; partial failure reports per item without leaking foreign ids |
| Webhook / integration callback | Authenticated by a tenant-scoped credential; the payload cannot select another tenant |

### 7.4 Object-level authorization and reference integrity

Every stored relationship is validated at write time: a maintenance task cannot reference a vessel in another
organization; a document cannot attach to a foreign device; a report cannot include a foreign vessel id; an alert
acknowledgement cannot target a foreign alert. The database schema must make cross-tenant foreign keys
unrepresentable (tenant column in every tenant-owned table, composite constraints where the engine supports
them), and the application must still check at runtime. Sequential or guessable ids are replaced by opaque ids;
enumeration is rate-limited and audited.

### 7.5 Cross-tenant probe behaviour (no existence oracle)

When an authenticated user requests a resource that exists in another tenant, the response must not confirm
existence. The intended rule: return the same response shape and status as for a non-existent resource within
the user's own tenant (typically not-found-equivalent), record a `CROSS_TENANT_PROBE` security event, and apply
step-up verification or rate limiting on repeat. The security event is visible to platform security, not to the
requesting tenant, and must never expose the target tenant's identity to the requester. The policy must be
tested for both directions and for list endpoints, counts, exports and error messages.

### 7.6 Service-to-service, internal tools and support

- Internal services authenticate with service identities and are authorised for the specific tenant scope they
  are acting for; a service token is not a tenant bypass.
- Admin/support tooling uses the same authorization service as the product, with support grants (§6.6); it does
  not have a "break-glass" path that bypasses audit and tenant scope. Any emergency path is itself an audited,
  time-bound grant with two-person approval (design requirement, `OPEN`).
- Data-warehouse/analytics pipelines receive only de-identified or tenant-scoped data; a join across tenants
  requires a documented, authorised purpose and must not be readable by customer-facing surfaces (§13.4).

### 7.7 Defence in depth (independent layers)

| Layer | Requirement | State |
| --- | --- | --- |
| Application authorization | The §7.1 pipeline on every sensitive operation | `OPEN` |
| Query scoping | Tenant predicate forced in the data access layer, not optional | `OPEN` |
| Database isolation | Row-level security or equivalent per-tenant predicate; per-tenant encryption keys for sensitive stores | `OPEN`; engine choice not made |
| Object storage | Per-tenant prefix/bucket policy; signed URLs scoped to one object and short-lived | `OPEN` |
| Cache | Tenant in every key (§13.1) | `OPEN` |
| Search | Tenant filter mandatory and non-bypassable (§13.2) | `OPEN` |
| Jobs | Tenant context mandatory in every job envelope (§12) | `OPEN` |
| Audit | Independent append-only store, not writable by application roles | `OPEN` |
| Testing | Two-tenant isolation suite, negative tests, penetration test (§22) | `NOT_EXECUTED` |

A failure in the application layer must not be sufficient to leak data: the database layer must independently
reject a query that lacks the tenant predicate. The validator cannot check any of this.

### 7.8 UI filtering is never authorization

Hiding a menu item, disabling a button, hiding a column or filtering a list in the browser are **presentation**
decisions. Every one of them must be backed by a server-side check. A customer-visible UI that merely hides an
action while the API allows it is a defect, not a mitigation. The acceptance scenarios in §26 include negative
cases that call the API directly, bypassing the UI.

---

## 8. Device-to-organization linking

### 8.1 Device identity

Each device has: opaque `deviceId`, manufacturer serial (where applicable), model/firmware metadata, a
cryptographic credential or credential reference, owning `organizationId`, optional `vesselId`, lifecycle state
and a binding history. A device credential is unique per device, stored in secure storage on the device, never
printed in a manual, never shared between devices and never reusable across tenants.

### 8.2 Provisioning and binding

Intended flow: device is manufactured/registered with an unbound identity; an authorised member (or an accepted
installer grant) initiates binding; the server verifies the acting membership, the device's unbound state and
the organization's entitlement/limits; the binding is written atomically with an audit record; the device
receives tenant-scoped telemetry credentials; the customer's organization becomes the owner. A device can be
bound to at most one organization and at most one vessel at a time.

Prohibited: a device choosing its tenant; a device presenting a tenant id; a shared fleet-wide credential; a
binding created by a background job without an authenticated human action; a binding that overwrites an existing
owner without the transfer flow. An already-bound device cannot be claimed by an unrelated account without
ownership proof (§8.3).

### 8.3 Ownership verification

Ownership is intended to be proven through the purchase record and the provisioning binding, or through an installer
commissioning record with the customer's confirmation. An unrelated account cannot claim a bound device. Support
unbinding/replacement requires the support grant plus the customer's explicit request and is audited. Ownership
transfer of a device follows §9.6.

### 8.4 Telemetry credentials per tenant

- Each device receives credentials scoped to its own device identity and its owning organization; the credential
  authorises ingestion of that device's records only.
- Ingestion resolves the tenant from the device credential, never from a field in the payload. A payload claiming
  another `organizationId`, `deviceId` or `vesselId` is rejected.
- Credential rotation on schedule and on suspected compromise; revocation on transfer, unbinding, loss or
  termination; revoked credentials fail closed.
- One organization's telemetry credentials can never authorise ingestion for, or read of, another organization's
  devices; this is explicitly tested in §26 (negative scenario).
- Telemetry is write-only from the device's perspective (device → cloud). There is no cloud → device command
  credential and no control channel (§1.2).

### 8.5 Device states

`MANUFACTURED_UNBOUND` → `BOUND` → (`SUSPENDED` | `REVOKED` | `TRANSFERRED`), plus `RETIRED`. Suspension stops
ingestion and access but preserves history; revocation blocks rebinding until support verification; retirement is
terminal for that identity. State changes are audited.

### 8.6 Device transfer

A device may transfer with its vessel (vessel transfer, §4.6) or independently. Independent transfer requires:
owning-organization owner approval; recipient organization owner acceptance; unbinding from any vessel unless
explicitly transferred with it; revocation of old credentials and issuance of new ones; explicit choice about
existing telemetry history; audit records in both tenants. The previous organization loses access immediately.

### 8.7 Loss, theft and compromise

A reported lost/stolen device is revoked, its credentials invalidated, rebinding blocked and the incident
recorded; the owner is informed; the device cannot be silently re-registered. Compromise of a device credential
triggers rotation and an incident review. These are design requirements, `OPEN` until implemented and tested.

### 8.8 Installer commissioning scope

An `EXTERNAL_INSTALLER` may bind/commission a named device only within an active grant and only for named
vessels; the commission action is audited; the installer cannot revoke, transfer or export device data; the
grant expires. The installer never receives the device's long-term credential; commissioning uses a
short-lived, scoped credential.

### 8.9 Device limits by edition

The contracted device/telemetry package limits the number of devices and storage; over-limit states are
communicated and enforced server-side (§24.5). Limits never suppress local vessel functions (architecture R-A3;
telemetry is not a local safety function, but the principle applies to any presentation dependency).

### 8.10 Explicit prohibitions

| Prohibited | Reason |
| --- | --- |
| Device-supplied tenant id accepted as authority | Cross-tenant ingestion/read risk |
| Shared credential across devices or tenants | One compromise becomes a tenant breach |
| Telemetry ingest path that accepts a payload-selected organization | Trivial spoofing |
| Cloud → device command channel of any kind | No remote control exists (brief §11, architecture X-1) |
| Device credential usable to read another device's history | Tenant/device isolation |

---

## 9. Lifecycle flows

Every flow below specifies: actor, preconditions, server checks, effects, audit, and timing. All flows are
`OPEN` target designs; none is implemented or tested.

### 9.1 Invitation and acceptance

Described in §5.3–§5.4. Additional rules: invitations are rate-limited per organization; an invitation to an
identity already a member is rejected (use role change); an invitation for a role the inviter cannot grant is
rejected; an invitation cannot carry a permission beyond the role; an expired invitation grants nothing; an
accepted invitation can be revoked through membership removal with immediate effect.

### 9.2 Role change

Actor: `ORGANIZATION_OWNER`, or `ORGANIZATION_ADMIN` for roles it may grant. Preconditions: target membership
`ACTIVE`; actor holds the target role's grant authority; the change does not leave the organization without an
owner; the change does not escalate the actor. Effects: new role applies to the next request; the target's
sessions are not silently upgraded — the authorisation service re-derives the role per request, so the change is
effective immediately for both grant and revocation (§10). Audit: before/after role, actor, target, tenant,
time. Notifications: target and owners are notified. Prohibited: self-escalation; granting owner without
ownership transfer; changing a support identity's role (support is never a member).

### 9.3 Vessel scope change

Actor: owner/admin (or the role that holds `MEMBER_SCOPE`). Effects: assignment list changes; access to removed
vessels ends immediately; historical audit remains. Preconditions: referenced vessels are in the same
organization; the target membership remains consistent. Audit: added/removed vessel ids, actor, time. Prohibited:
using scope change to move a member into another organization.

### 9.4 Suspension and removal (revocation)

Actor: owner/admin (owner only for owner removal, with owner-count invariant). Effects: membership state changes;
all sessions for that membership in that organization are invalidated; cached permissions are dropped (§10.5);
background jobs acting for that membership lose authorisation; sharing/installer grants created by that member
remain valid only if the organization still wants them (they are independent grants and must be reviewed;
removal of a member does not silently revoke grants created by them unless the owner chooses to). Audit: actor,
target, reason (required), time, affected session count. Timing: immediate — the next request fails.

### 9.5 Organization transfer (membership from organization A to B)

Applies when a person moves from one customer organization to another. There is no "move" that preserves a
membership across tenants: the person is removed from A and invited to B, with separate roles and scopes. Any
attempt to reuse A's data or grants in B is rejected. If A and B are related but distinct legal entities, they
remain distinct tenants; data sharing requires a grant or an explicit transfer of the resource, never a
membership whose tenant is ambiguous. Audit records stay with each organization.

### 9.6 Device transfer

Described in §8.6. Additional: transfer cannot occur while the device has an active installer grant without
revoking it; the recipient must be `ACTIVE` and within limits; both tenants see their own audit record only.

### 9.7 Account deletion

A person's account deletion is distinct from membership removal and from organization termination.

1. The person requests deletion after re-authentication.
2. If the account is the sole owner of an organization with active data, deletion is blocked until ownership is
   transferred or the organization is terminated; the UI must explain both options rather than deleting
   silently.
3. Membership records in other organizations are removed; audit records that identify the person are retained
   only as required for accountability and legal obligation, minimised and access-restricted (§14).
4. Personal data outside organizations (profile, preferences, contact history) is deleted per §16.
5. Confirmation is provided; the customer's organizations are notified where the person was an owner/admin.
6. Records of actions the person took in an organization remain as part of that organization's audit history,
   attributed to a pseudonymous or retained identifier as required by law and policy; they are not used to keep
   the person's account alive.

### 9.8 Organization termination

Described in §25. A termination is not an account deletion and not a subscription cancellation; each is a
separate explicit act.

---

## 10. Permission changes and revocation timing

### 10.1 Authoritative source per request

The current membership/role/grant state in the primary store (or a cache validated against it) is authoritative.
Token claims may accelerate authentication, but the final authorization decision is re-derived server-side on
each request. A token that embeds a role must be treated as a hint only; a stale token may never grant access
after a role change, suspension or removal. If a cache is used, it must have a bounded lifetime and a
mechanism to invalidate on change; the maximum staleness bound is a design parameter (`OPEN`) that must be
smaller than the time to detect misuse, and it must be documented and tested.

### 10.2 Session and token invalidation

On removal, suspension, password/identity change, role downgrade, grant revocation and organization
suspension, the affected sessions and refresh tokens are invalidated server-side. Mobile/desktop client tokens
are invalidated on the same trigger; a client that cannot refresh must re-authenticate. Invalidation is not a
client instruction; the server refuses the old credential even if a client still holds it.

### 10.3 Required effect timing (design requirements, not measured)

| Change | Required effect |
| --- | --- |
| Membership removal / suspension | next request denied; sessions invalidated; caches invalidated; jobs re-authorised |
| Role downgrade | next request evaluated with the new role; no permission above the new role |
| Role upgrade | next request evaluated with the new role; no automatic session privilege reuse across organizations |
| Vessel scope removal | next request for that vessel denied |
| Sharing / installer grant revocation or expiry | next request denied; tokens issued for the grant rejected |
| Support grant revocation or expiry | next request denied; grant token rejected |
| Device revocation | ingestion rejected; read of new data stopped; history per retention |
| Organization suspension | all tenant requests denied except the documented security/owner path |
| Entitlement downgrade | only the entitled capability set; no data deletion; honest degraded state |

No numeric timing promise is made in this document. The future service must publish and test its own observed
timings before any customer commitment; until then the only claim is the design requirement "next request
denied".

### 10.4 Surfaces that must honour revocation

API; web app; mobile app; public API; webhooks; scheduled reports; exports; notifications; search index; cache;
background jobs; admin/support tooling; installer tools; data-warehouse extracts; any partner integration. A
revocation that is honoured in one surface and not another is a defect. Acceptance scenarios in §26 test the
API directly and the asynchronous surfaces.

### 10.5 Cache invalidation

Permission, membership, scope and entitlement caches are keyed by tenant + subject + resource class and are
invalidated on change. A negative permission is never cached in a way that survives a positive grant beyond the
documented max staleness. Revocation must be a cache-invalidation event, not a wait-for-TTL event where the
security impact requires immediacy; the design must state which changes use immediate invalidation.

### 10.6 Emergency revocation

A single audited operation must be able to: revoke all sessions for an account; revoke all sessions for a
membership; revoke all installer/support grants for a tenant; revoke a device; suspend an organization. These are
design requirements and must be available to platform security with two-person approval; they are not customer
self-service unless explicitly designed.

### 10.7 Staff changes

When an EMBARCARTE employee leaves or changes role, all support grants and platform credentials they hold are
revoked; the review is recorded. Support access history remains readable to the customers affected.

---

## 11. Audit logging

### 11.1 What is audited (minimum set)

| Event class | Examples |
| --- | --- |
| Authentication | sign-in success/failure, second-factor outcome, session revocation, password/identity change |
| Authorization | denials of sensitive operations, cross-tenant probes, privilege-escalation attempts |
| Membership | invitation, acceptance, expiry, role change, scope change, suspension, removal |
| Organization | creation, profile change, state change, termination initiation/completion, ownership transfer |
| Vessel | create, edit, archive, delete, transfer, assignment change |
| Device | bind, unbind, commission, transfer, revoke, credential rotation, suspension |
| Sharing / installer | grant creation, acceptance, modification, revocation, expiry |
| Support | grant creation/approval, every support session, write actions, revocation, customer notification |
| Data | export request/creation/download, deletion request/completion, retention action |
| Security | incident, credential compromise, rate-limit lockout, admin emergency action |
| Subscription | entitlement change, plan change, suspension, reactivation |

### 11.2 Required fields

`auditId` (unique, time-ordered), timestamp (UTC, trusted source), actor type and id (account, service, support
agent, device), acting organization (and target organization where a transfer is involved), action, target
resource type and id, result (allowed/denied/error), reason code, request correlation id, source IP/user agent
where lawful and minimised, support/installer grant id where applicable, and a before/after summary for changes
(never full sensitive payloads). Audit records must not contain secrets, tokens, full document contents or
unnecessary personal data.

### 11.3 Append-only and integrity

Audit records are append-only in intent: application roles cannot update or delete them; an independent store or
WORM/immutable retention is the target; any administrative correction is a new record referencing the original,
never a rewrite. Integrity protection (hash chaining or equivalent) is a design requirement, `OPEN`; the specific
mechanism and threat model are future work.

### 11.4 Tenant-scoped audit visibility

A customer reads only audit events for their own organization and only the event classes their role permits
(owner/admin; `AUDIT_VIEW`). Support reads only through a support grant and only the scoped classes. Platform
security reads the security-scope events. **No tenant may see another tenant's audit records, identities, resource
ids, counts or event timing.** Aggregated platform reporting must be de-identified and must not allow
reconstruction of one tenant's activity from another tenant's view.

### 11.5 Audit versus application logs

Audit is a product/security record, not a debug log. Application logs must not be the audit system; they must
not contain tenant personal data by default and must be retention-bounded. Correlation ids link them without
copying sensitive content.

### 11.6 Retention

Audit retention is `OPEN` and must balance accountability, security investigation and minimisation; it may differ
by event class (security events longer than ordinary activity). Values are set with the DPO and published in the
DPA/privacy notice before processing. Legal hold can extend retention; it can never be used to retain
indefinitely without a recorded basis.

### 11.7 Customer visibility of support access

The owning organization can see, at any time: which support grants are active, who authorised them, the reason
ticket, the resource classes, start and expiry; and a history of support access to their data. This is a design
requirement and must be tested (positive and negative: no other tenant's support history is visible).

### 11.8 Audit of the audit log

Reads of audit data, export of audit data and changes to retention policy are themselves audited. Platform
security access to tenant audit data is audited and subject to the same support-grant discipline.

---

## 12. Background-job isolation

### 12.1 Job context requirement

Every job carries an immutable envelope: `jobId`, job type, acting `organizationId`, acting subject (account or
service), the originating request/authorisation reference, the resource scope and the requested capability. A job
without a resolvable tenant context must fail closed, not run globally. The worker re-checks authorisation at
execution time against the current state; the fact that a job was queued does not preserve authority.

### 12.2 Job classes

| Class | Examples | Isolation requirement |
| --- | --- | --- |
| Scoped read/report | generate a vessel report, build a dashboard snapshot | tenant scope fixed in the job; result readable only by authorised roles |
| Scoped mutation | apply a scheduled maintenance template, archive a vessel at expiry | re-check capability and scope at execution |
| Export | build and deliver a customer export | tenant scope; signed URL scoped to one object; expiry; audit download |
| Notification fan-out | alert emails/push to members | recipients resolved from the tenant membership at send time; no cross-tenant recipient list |
| Ingestion | telemetry ingest from devices | tenant resolved from device credential (§8.4) |
| Platform maintenance | index rebuild, cache warm, retention sweep | must be explicitly global-safe by design, carry no tenant payload, and never expose tenant data to the worker operator |

### 12.3 Queue and worker rules

- Jobs are partitioned or tagged by tenant; a per-tenant queue starvation or backpressure must not starve
  another tenant (target behaviour, `OPEN`).
- Worker credentials are scoped to the job types and, where the engine supports it, to the tenant; a worker
  cannot list or dequeue another worker's tenant payload.
- Retries are idempotent; a retry re-validates authorisation and does not widen scope.
- Dead-letter queues retain minimal references (no unnecessary personal data) and are tenant-tagged.
- Job payloads are encrypted at rest and must not contain more personal data than the job needs.

### 12.4 Failure and poisoning

A job that fails must not fall back to an unscoped query. Queue poisoning (a job whose payload requests a foreign
tenant) must be rejected by the envelope validation, not by the business logic. A job that discovers a scope
mismatch must abort, emit a security event and not partially apply.

### 12.5 Prohibited jobs

Any job that: enumerates all tenants; scans resources without a tenant predicate; sends a notification to a
recipient list assembled across tenants; generates a comparative metric ranking tenants; or mutates data
without an authenticated human or a documented scheduled policy with an audit trail.

### 12.6 Test requirements

The future security test plan (§22) must include: a job queued for tenant A cannot read B; a job whose payload is
tampered to B fails; a retry after revocation fails; an export job's output is inaccessible to B; a notification
fan-out never includes B's members; a dead-letter entry does not leak B's data.

---

## 13. Cache, search, export and analytics isolation

### 13.1 Cache isolation

- Every cache key includes the tenant (and subject/scope where relevant): `t:{organizationId}:{resourceClass}:
  {id}` style. A key without a tenant is a defect unless the value is genuinely tenant-independent.
- Shared caches must not allow one tenant's response to be served to another (cache poisoning, key confusion,
  header-based key variance, CDN caching of authenticated responses). Authenticated responses are private by
  default; no shared edge cache for tenant data.
- Cache invalidation follows §10.5; revocation and role changes are invalidation events.
- Negative caching (not-found responses) must also be tenant-keyed; otherwise a probe could be answered from
  another tenant's traffic.

### 13.2 Search isolation

- The search index is tenant-partitioned, or every query carries a mandatory tenant filter that cannot be
  overridden by client input. The tenant filter is applied server-side after authentication, before the query is
  built.
- Index rebuilds are tenant-scoped and cannot mix documents. A document from tenant A must never be returned in
  tenant B's results, suggestions, counts, facets or "similar items".
- Search queries, result counts and facets are audited where sensitive; repeated cross-tenant probing is rate
  limited.
- Global platform search (if ever authorised) must operate on de-identified or explicitly authorised data and must
  never be exposed to a tenant UI.

### 13.3 Export isolation

- An export is generated only for the caller's tenant and only for the resource classes and fields the caller's
  role permits (§15).
- Export jobs are scoped (§12.2); the output file is stored under a per-tenant key, served by a short-lived
  signed URL or equivalent, and downloaded with an audit record.
- An export never includes another tenant's data, platform security data, support-grant internals, licensed
  third-party data the tenant may not redistribute, or data the role cannot see.
- Export formats and manifests must state scope, generation time, filters and field exclusions so the customer
  can understand what they received.

### 13.4 Analytics and benchmarking

- Customer-facing analytics are computed only over the caller's tenant scope.
- Platform analytics for the operator use aggregate, de-identified data; no individual tenant's vessel
  movements, positions or commercial data may be exposed to another tenant, to a partner, or used to build a
  competitive profile (architecture §5.2 X-7; WATCH privacy rules reused).
- Benchmarking ("your fleet vs others") is **not a FLEET feature** in this definition. If ever proposed, it
  requires a separate privacy review, opt-in consent, aggregation thresholds and a DPIA update; it may never
  expose a named other tenant.
- Training or fine-tuning any model on tenant data is prohibited without explicit written basis, a DPIA update
  and a separate product decision; no such processing is planned.

### 13.5 Notifications

Notification recipients are resolved from the tenant membership at send time, scoped to the resource and role.
A notification must not reveal another tenant's vessel name, position, crew or event. Delivery evidence is
retained as an operational record, not as proof that a person acted.

### 13.6 Static assets and CDN

Tenant-specific documents and exports are never served from a shared public path or a cacheable public URL.
Object storage policies and signed URLs are scoped to the tenant object; URL guessing must be infeasible and
logged.

---

## 14. Data classification, retention and minimisation

### 14.1 Data classes

| Class | Content | Sensitivity | Notes |
| --- | --- | --- | --- |
| Account identity | name, contact, credentials, session metadata | personal data | never shared across tenants |
| Organization identity | legal/operational name, contacts, billing identifiers | commercial + personal data | tenant data |
| Membership and roles | who belongs, role, scope, invitation | personal data | tenant data |
| Vessel identity | name, registration/flag, descriptors | commercial, potentially personal for owners | tenant data |
| Telemetry | position, heading, speed, status, device events | potentially personal (location, presence) | tenant data; read-only |
| Maintenance | tasks, service records, costs, technicians | commercial + personal | tenant data |
| Documents | manuals, certificates, invoices, photos | mixed; may contain special-category data if uploaded | tenant data; uploader responsible, platform limits |
| Crew records | names, roles, contact, certification references | personal data | not a personnel file; minimisation rules |
| Alerts and acknowledgements | operational events and who acknowledged | personal data (actor) | tenant data |
| Audit | act records | personal data | accountability retention |
| Billing | subscription, invoices, tax data | personal + commercial | legal retention |
| Support | ticket content, diagnostics, support grant records | personal data | bounded retention |
| Security | authentication events, threat signals | personal data | security retention |
| Aggregates | de-identified operational metrics | non-personal if truly de-identified | no re-identification |

### 14.2 Retention (design shape; numeric values `OPEN`)

| Class | Intended retention shape | Status |
| --- | --- | --- |
| Live telemetry | short rolling window for live display, then downsample or delete | `OPEN` — values with DPO |
| Telemetry history | edition/contract window, published before sale | `OPEN` |
| Maintenance and documents | until vessel/tenant deletion or the documented period | `OPEN` |
| Alerts and acknowledgements | long enough for accountability, bounded | `OPEN` |
| Audit | bounded per class; security events longer | `OPEN` |
| Billing/tax | statutory period once a real sale exists | `OPEN`; depends on X-02 |
| Support | case closure + bounded period | `OPEN` |
| Backups | bounded, encrypted, restored on a tested cycle | `OPEN` |
| Account data | until deletion + a defined post-cancellation window | `OPEN` |
| De-identified aggregates | per documented purpose, no re-identification | `OPEN` |

No numeric retention value is invented here. Values must be published in the privacy notice/DPA and consistent
with the DPIA before any processing begins.

### 14.3 Legal hold

A documented legal hold can suspend deletion for named data and a named matter; it is recorded, time-bounded,
access-restricted and audited. It cannot be used to retain data indefinitely without a recorded legal basis.

### 14.4 Backups

Backups are encrypted, access-restricted and restore-tested; a backup's tenant data is never restored into
another tenant's environment; deletion from primary storage propagates to backups within the documented cycle;
a restore test must not mix tenants.

### 14.5 Minimisation

The service collects only what the contracted capability needs; optional fields are optional; telemetry is
limited to the allow-list defined by the product and privacy notice; no browsing, behavioural or marketing
profile is built from vessel operations; support diagnostics are customer-initiated or consented, not silently
collected.

### 14.6 No customer production data

No customer production data is used in this programme, in demos, in marketing, in training or as a reference.
Any future pilot with real data requires a signed DPA, a DPIA and an explicit customer authorisation. This is an
absolute restriction (brief §0, claims policy §2 Class X).

---

## 15. Customer data export

### 15.1 Rights and capability

The organization owner (and, where granted, an admin with `ORG_EXPORT`) can export the organization's data within
the role's permission set. Members can export their own personal data and the data the role may read, through a
documented self-service or support-assisted route. Export is offered before cancellation, before termination and
before deletion.

### 15.2 Scope and format

The export is delivered as a documented, machine-readable package with a manifest: organization profile,
memberships and roles (where permitted), vessels, assignments, selected telemetry (bounded by the contracted
history window), maintenance records, documents the role may read, alerts/acknowledgements, and audit records the
role may see. The manifest states generation time, scope, filters, field exclusions and format version. A
human-readable summary accompanies the machine-readable files.

### 15.3 Exclusions (explicit)

The export must not include: another tenant's data or identifiers; platform security records; support-grant
internals; credentials, secrets or tokens; licensed third-party data the customer may not redistribute (for
example chart or weather rights not granted to the customer); deleted data beyond retention; or data the role is
not permitted to see (field-level exclusions are applied before generation and stated in the manifest).

### 15.4 Delivery, security and audit

Export generation is a scoped background job (§12.2) with rate limits; the package is encrypted at rest under a
per-tenant key; delivery uses a short-lived signed URL or an equivalent authenticated channel; every download is
audited; the package expires after a documented window (`OPEN`). Exports are not emailed as unencrypted
attachments. A failed export reports why without leaking foreign data.

### 15.5 Entitlement and termination interaction

An export remains available during `RESTRICTED` and `TERMINATION_PENDING`. If the subscription has lapsed, the
customer must still be able to export their own data within the documented window; a lapsed entitlement cannot
be used to hold data hostage. Historical contractual export windows are recorded in the DPA.

---

## 16. Deletion

### 16.1 Deletion types (distinct and explicit)

| Action | What it removes | What it does not remove |
| --- | --- | --- |
| Remove member | membership and access to the organization | the person's account; their audit history; other organizations |
| Delete vessel | vessel record and, per explicit choice, its history/documents | other vessels; device identity unless unbound/retired |
| Delete document / record | the named resource | audit entries that record the deletion |
| Delete account | personal account data and memberships where permitted | organization data they do not own; audit records required for accountability |
| Cancel subscription | future billing and entitlement | data during the documented post-cancellation window; it is not a deletion |
| Terminate organization | the service and, after the window, the tenant data | statutory records (§25) |

Conflating cancellation with deletion, or membership removal with account deletion, is a defect.

### 16.2 Deletion flow

Request → identity verification (sensitive) → scope confirmation showing exactly what will be deleted and what
will remain → explicit confirmation → deletion job(s) scoped to the tenant → propagation to caches, search index,
derived stores and processors → backup expiry per cycle → confirmation with a deletion reference and date.
Legal-hold exceptions are named at request time, not discovered later.

### 16.3 Timing and evidence

Deletion timing is a design requirement with values `OPEN`; the customer-facing commitment must be published
before sale. A deletion confirmation record is produced, recorded and auditable. A deletion that cannot be
completed (for example a legal hold) must be explained, not silently ignored. The future test plan must verify
that deleted data cannot be retrieved from the API, search, cache, exports or backups after the documented
cycle.

### 16.4 Processor deletion

Deletion propagates to subprocessors under the DPA (§19); the processor list and deletion responsibilities are
part of the DPA. A processor that cannot delete within the cycle is a contractual defect.

### 16.5 Records that survive

Statutory records (tax, invoices), security incident records, legal-hold material and minimal audit entries
required to demonstrate accountability may survive termination within their retention; they are access-restricted,
minimised and never used for marketing or product development.

---

## 17. Controller and processor assessment per data flow (EDPB guidance)

### 17.1 The method (not a conclusion)

EDPB guidance ("Data controller or data processor", https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en,
checked 2026-10-30, `VERIFIED_EXTERNAL`) defines a controller as the entity that determines the purposes and
means of processing, a processor as one that acts under the controller's instructions, and joint controllers as
entities that jointly determine purposes and means. It also states that a processor may engage a subprocessor
only with the controller's written authorisation, that the controller-processor relationship must be governed by
a contract documenting the processing, and that the processor assists the controller with rights, security,
breach notification and DPIAs. The exact allocation for a specific flow depends on the facts of that flow; it
cannot be inferred from the label "SaaS".

**Consequence for FLEET: EMBARCARTE is not always one or the other.** The table below assesses each data flow
separately, with a *provisional* role, a reason, the contract instrument required, and a status. Every role
assessment is `OPEN` pending DPO/counsel confirmation; none is a legal conclusion in this document.

### 17.2 Per-flow assessment

| # | Flow | Personal data | Who decides purpose and means (provisional) | Provisional role for EMBARCARTE | Required instrument | Status |
| --- | --- | --- | --- | --- | --- | --- |
| F-01 | Customer account, login, profile of the individual user | yes | EMBARCARTE decides for the FLEET service account; the customer organization decides who is invited | Controller for the account layer; the customer organization is controller for its membership decisions | Privacy notice; account terms; DPA not needed for the account layer alone | `OPEN` |
| F-02 | Organization and billing data (legal entity, tax, invoices, payment metadata) | yes (representatives) | EMBARCARTE as seller decides billing purpose; the customer provides data | Controller for billing/tax; processor for the customer's own commercial records only if it processes them on instruction | Privacy notice; terms; statutory retention | `OPEN` |
| F-03 | Membership, roles, scopes and access logs of the customer's users | yes (staff) | The customer organization decides who gets access and why; EMBARCARTE decides how the service implements it | Processor for the tenant's membership/access data | DPA (Art. 28) with the customer; security annex | `OPEN` |
| F-04 | Vessel operational telemetry (position, status, events) | potentially (location, presence, owner) | The customer organization decides what to monitor and for which operational purpose; EMBARCARTE decides the service mechanics and security | Processor for tenant telemetry; possibly controller for platform-level security/abuse processing | DPA; data-processing annex; DPIA support; no reuse for EMBARCARTE purposes | `OPEN` |
| F-05 | Maintenance records, documents and crew records the customer uploads | yes, possibly special category if voluntarily uploaded | The customer organization determines content and purpose | Processor | DPA; uploader responsibilities; prohibited-content policy | `OPEN` |
| F-06 | FLEET operational alerts and acknowledgements | yes (actor identity) | Customer organization determines alerting policy; EMBARCARTE operates delivery | Processor for tenant alert data | DPA; delivery evidence rules | `OPEN` |
| F-07 | Support diagnostics and support-grant sessions | yes | EMBARCARTE decides how support is provided, under the customer's request and the DPA | Processor when acting on the customer's instructions; controller for its own support records/security | DPA; support-access policy; audit | `OPEN` |
| F-08 | Platform security logs, authentication threat signals, abuse detection | yes | EMBARCARTE determines the purpose and means (protect the service) | Controller (legitimate interest assessment required) | Privacy notice; balancing test; retention | `OPEN` |
| F-09 | Product usage analytics, aggregate operational metrics | aggregated/de-identified | EMBARCARTE determines the purpose if de-identified; if not truly anonymous, still personal data | Controller only if truly anonymous; otherwise processor under the DPA and no independent use | Anonymisation assessment; DPIA; strict no-reidentification | `OPEN` |
| F-10 | Licensed third-party data (charts, weather, AIS-derived) displayed through FLEET | not personal in itself; context may be | The provider and the customer determine permitted use; EMBARCARTE must respect provider terms | Controller for its own licensing compliance; the customer is responsible for its permitted use | Provider terms; no redistribution; D-09/D-10 | `BLOCKED` (D-09, D-10) |
| F-11 | Installation/commissioning data provided by an external installer | yes (installer identity, vessel data) | The customer organization engages the installer; EMBARCARTE operates the grant mechanism | Processor for the customer's grant data; controller for platform security | DPA; installer terms; grant policy | `OPEN` |
| F-12 | Incident records, breach investigation material | yes | EMBARCARTE as controller for its own incident handling; processor duties toward customers for tenant data | Mixed: controller for its own records; processor for the customer's data in the incident | DPA breach clauses; incident policy | `OPEN` |
| F-13 | Cross-tenant aggregate benchmarking (not a feature) | — | — | Not permitted | — | `BLOCKED` by design |

### 17.3 Rules derived from the assessment

1. **No blanket role statement.** Any sentence that says "EMBARCARTE is the processor" or "EMBARCARTE is the
   controller" for all FLEET data is wrong by construction and must be rejected in review.
2. **Per-customer, per-flow.** The DPA must identify the flows where the customer is controller and EMBARCARTE is
   processor; the privacy notice must cover the flows where EMBARCARTE is controller.
3. **Joint controllership is not intended.** If a future feature would create joint determination (for example
   a shared fleet benchmarking product), it requires a separate assessment and a joint-controller arrangement;
   none exists.
4. **The assessment is revisited** when a provider, feature or data flow changes, and the DPA/privacy notice are
   updated.
5. **The customer is the controller for its own tenant operations**; EMBARCARTE must not use tenant data for its
   own purposes beyond security/abuse and statutory obligations.

Evidence class: `OPEN` — provisional assessment only; DPO/counsel confirmation required; EDPB source is
`VERIFIED_EXTERNAL`.

---

## 18. DPA responsibilities for business customers

A data-processing agreement with each business customer is a precondition for processing that customer's
personal data in a production service. No DPA exists (`FLEET_DPA = NOT_CONTRACTED`). The intended content,
aligned with EDPB's checklist (`VERIFIED_EXTERNAL`), is:

1. **Subject matter, duration, nature and purpose** of the processing, the types of personal data and the
   categories of data subjects (customer staff, vessel owners, crew where recorded, installers, support contacts).
2. **Instructions only**: EMBARCARTE processes tenant personal data only on the customer's documented
   instructions, including for international transfers.
3. **Confidentiality**: personnel authorised to process the data are bound by confidentiality.
4. **Security**: appropriate technical and organisational measures, referenced to a security annex (encryption,
   access control, tenant isolation, audit, testing, incident response).
5. **Subprocessors**: prior written authorisation (specific or general with a meaningful right to object); a list
   maintained and notified; flow-down of equivalent obligations (§19).
6. **Data-subject rights assistance**: the customer's ability to access, rectify, erase, restrict, port and object;
   FLEET provides self-service where possible and support assistance otherwise.
7. **Breach assistance**: notification to the customer without undue delay after becoming aware, with the
   information the customer needs for its own notification duty (§20); no notification conclusions are asserted
   in the abstract.
8. **DPIA assistance**: information needed for the customer's DPIA, including the FLEET DPIA outline and the
   security measures.
9. **Deletion or return**: at the customer's choice, delete or return tenant personal data at the end of the
   service, subject to statutory retention (§16, §25); deletion evidence.
10. **Audit and information**: information necessary to demonstrate compliance and allow audits/inspections,
    with confidentiality and reasonable notice; no unlimited audit right that conflicts with other tenants'
    isolation.
11. **International transfers**: mechanism and safeguards identified (§19); the customer is informed of the
    locations.
12. **Liability and indemnity**: commercial/legal terms decided by counsel; not invented here.
13. **Term and termination**: aligned with §25; DPA survives for the retention period.
14. **Roles**: the DPA must state the customer is controller and EMBARCARTE processor for the flows in §17.2 F-03
    to F-07 and F-11; it must not misstate the controller flows.

Evidence class: `OPEN`/`BLOCKED` — no DPA template, no legal review, seller legal identity absent (X-02). This
section is a requirement list, not a contract.

---

## 19. Subprocessors and international transfers

### 19.1 Subprocessor categories (none contracted)

Hosting and database; object storage and backups; content delivery (no tenant data); email delivery; push
notification; SMS; payment processing (hosted/tokenised only); error monitoring and observability; support
ticketing; identity/SSO provider (Enterprise-conditional); connectivity provider (only if FLEET resells
connectivity — not in this definition). Every category that could access tenant personal data requires a DPA
with flow-down terms and a place on the published list before use.

Status: `FLEET_DPA = NOT_CONTRACTED` for all; no subprocessor agreement exists (X-05 costs, X-02 identity).

### 19.2 Approval and transparency

EMBARCARTE must not appoint a subprocessor that processes tenant personal data without the customer's prior
written authorisation (specific or general with a meaningful objection right). The customer-facing list states
the entity, purpose, data categories and location. Changes are notified in advance; a customer may object, and
the objection path is documented. A subprocessor that cannot meet the terms is removed or the service is not
offered.

### 19.3 International transfers

Transfer mechanisms (adequacy decision, standard contractual clauses with a transfer impact assessment, or
another lawful mechanism) are `OPEN`; no transfer conclusion is asserted. Data residency options (EU-only
hosting) are a commercial/technical decision, not a claim. A transfer impact assessment is required before any
transfer that relies on SCCs. The customer must be able to see where its data is processed.

### 19.4 Provider and connectivity dependencies

Connectivity (H-12), telemetry ingestion and notification providers are external dependencies; their terms,
coverage and cost are `BLOCKED` and must not be described as available. Provider acceptance is not delivery
(README §20 principle, reused).

---

## 20. Incident management

### 20.1 Scope and classification

Incidents include: unauthorised access to tenant data; cross-tenant exposure; credential compromise; account
takeover; device compromise; provider breach; data loss; service intrusion; abuse. Classification considers
confidentiality, integrity, availability and the risk to data subjects, and whether the incident is
cross-tenant (the most severe class). Severity scale and timelines are `OPEN` until defined with counsel.

### 20.2 Response stages (design intent)

1. **Detect** — monitoring, audit anomalies, customer report, provider notice.
2. **Contain** — revoke sessions/grants/device credentials; isolate the affected component; preserve evidence;
   do not destroy logs.
3. **Assess** — determine affected tenants, data classes, individuals and whether it is a personal-data breach;
   DPO/counsel decide notification duties.
4. **Notify** — processors notify the controller (the customer) without undue delay; controllers notify the
   supervisory authority and data subjects where required; cross-tenant incidents notify every affected tenant
   separately and do not disclose the other tenant's identity. No notification deadline is stated as achieved.
5. **Remediate and learn** — fix, rotate, retest, update the DPIA, the risk register and this contract; record a
   post-incident review; CRA obligations (H-13) are handled in the same process.
6. **Publish** — a clear incident note where appropriate; no downplaying or speculative attribution.

### 20.3 Cross-tenant incident special rule

If isolation fails, the affected tenants are notified individually and promptly; the notification states what
happened, what data was involved and what the tenant should do, without naming other tenants. Regulators and
law enforcement are engaged as counsel advises. The incident is treated as a critical defect; the release gate
for any later version includes the fix and an isolation regression test (§22).

### 20.4 Security contact and disclosure

A security contact and coordinated vulnerability disclosure policy must be published before any production
service; none exists (H-13). Reports are acknowledged, triaged and handled; the process is recorded.

---

## 21. Personal location privacy

### 21.1 Why location is special

Vessel position can reveal the location and habits of identified or identifiable owners, crew or family on
board; combined with timestamps it can reconstruct presence patterns. FLEET therefore treats telemetry location
as personal data where a person is identifiable, and applies the following design rules even where the
controller/processor analysis is still `OPEN`.

### 21.2 Rules

1. **No public exposure by default.** No public map, directory, shareable link or indexable page shows a
   tenant's vessels or positions.
2. **Purpose limitation.** Position is processed for the contracted operational purposes (monitoring, alerts,
   maintenance, reporting) and for security; not for marketing, profiling or resale.
3. **Minimisation.** Sampling rate, history window and precision are bounded by the contracted purpose; high-rate
   tracking requires a justified, documented configuration; coarse display can be used where precision is not
   needed.
4. **Access minimisation.** Only authorised roles see position and history (§6.4); `READ_ONLY_VIEWER` and
   `CREW_MEMBER` see only assigned vessels; external installer only its granted vessels and window.
5. **Crew and guests.** FLEET monitors vessels, not people. It does not provide individual-crew tracking,
   geofencing of persons, or presence analytics. Crew records are administrative, not a personnel-monitoring
   system. Any feature that could monitor a person requires separate explicit consent, a DPIA and a product
   decision; none is planned.
6. **No covert access.** A member cannot see a vessel they are not assigned to; a former member loses access
   immediately (§10); no "hidden" owner view of another organization's vessel exists.
7. **Transparency.** The privacy notice explains what is collected, why, who can see it, retention and rights.
8. **Retention and deletion.** Location history is bounded (§14) and deletable per §16; export is available
   (§15).
9. **Third-party sharing.** No sharing with marina, harbour authority, insurer or broker without a specific
   contractual purpose and a lawful basis; the default is no sharing.
10. **AIS-derived data.** FLEET must not redistribute AIS-derived traffic beyond the receiving vessel's own
    operational context; retention/redistribution is not granted (D-09). AIS receive-only rules and disclaimers
    apply wherever AIS targets are displayed.
11. **No re-identification of aggregates.** De-identified analytics must be assessed against re-identification
    risk; a vessel is hard to anonymise, so aggregates must be coarse and thresholded.
12. **Children and special categories.** FLEET is not directed at children; if special-category data is
    uploaded by a customer, the customer is responsible and the platform applies restrictive access and
    deletion; the DPIA must assess residual risk.

### 21.3 DPIA requirement

The systematic monitoring of vessel position and the professional sharing/installer roles trigger a DPIA before
any real processing. The DPIA outline must cover necessity/proportionality, systematic description, roles,
risks (exposure of position, stalking/coercive access, account takeover, device theft, provider breach,
over-retention, function creep, cross-tenant leakage), mitigations, residual risk and DPO sign-off. The DPIA is
`NOT_COMPLETED`; this section is not a DPIA.

---

## 22. Security testing plan (future, executable, not executed)

### 22.1 Status statement

No security test has been executed in this milestone. `FLEET_ISOLATION_TESTS = NOT_EXECUTED`;
`FLEET_PENETRATION_TEST = NOT_PERFORMED`; no independent audit exists. The plan below defines what a later
engineering milestone must execute and what evidence it must produce. Passing this document through a validator
proves only that the plan and the requirements are present.

### 22.2 Test layers

| Layer | Test type | Minimum acceptance evidence | Status |
| --- | --- | --- | --- |
| Unit | Authorisation policy: every capability × role × scope cell of §6.4, including denials | Table-driven tests with named cases and coverage of every cell | `NOT_EXECUTED` |
| Unit | Tenant predicate on every data-access function | Static check plus tests that fail when the predicate is removed | `NOT_EXECUTED` |
| Integration | Two-tenant fixture: tenant A and B with users, vessels, devices, records, documents, reports | Every read/list/search/export/job operation from A against B's ids returns denial and creates a security event | `NOT_EXECUTED` |
| Integration | Revocation timing: remove/downgrade/expire, then call API and async surfaces | Old session/credential rejected on every surface | `NOT_EXECUTED` |
| Integration | Device credential scoping: A's telemetry credential cannot ingest or read B | Rejection plus security event | `NOT_EXECUTED` |
| Integration | Background-job envelope: tampered tenant, replayed job, retry after revocation | Fail closed; no partial apply | `NOT_EXECUTED` |
| Integration | Cache/search isolation: key collision, index cross-query, negative caching | No cross-tenant result; invalidation works | `NOT_EXECUTED` |
| Integration | Export isolation: A's export contains no B data, no forbidden fields, no secrets; download scoped | Manifest + diff against allow-list | `NOT_EXECUTED` |
| Integration | Audit isolation: A cannot read B's audit; support scope enforced | Denial + security event | `NOT_EXECUTED` |
| System | Abuse cases: enumeration, IDOR, rate limits, step-up, session fixation, CSRF, SSRF, injection | Documented results, no unresolved high finding | `NOT_EXECUTED` |
| Independent | Penetration test against staging with synthetic tenants | Signed report, findings triaged, no unmitigated critical/high | `NOT_EXECUTED` |
| Independent | Threat-model review (STRIDE or equivalent) against §27 | Reviewed model with mitigations mapped | `NOT_EXECUTED` |
| Ongoing | SAST, dependency and secret scanning; infrastructure/config review; restore test | CI evidence, no unexplained high findings | `NOT_EXECUTED` |

### 22.3 Rules for evidence

1. Tests use synthetic tenants and data only; no customer production data (§14.6).
2. A test that passes once is not evidence of ongoing isolation; regression tests run in CI after every change.
3. No certification, ISO 27001, SOC 2 or equivalent is claimed; a passing test suite is not a certification.
4. A security finding that is not fixed blocks the release gate; it is not waived by documentation.
5. The independent reviewer verifies the test artifacts, not the summary.
6. Results are reported per environment and date; no extrapolation to an unmeasured environment.

### 22.4 Minimum release gate (future)

FLEET cannot be offered to any customer until: the two-tenant isolation suite passes in CI; revocation tests
pass; device credential scoping passes; job/cache/search/export isolation tests pass; an independent penetration
test reports no unmitigated critical/high finding; the DPA and DPIA are in place; and the SLA/measurement
decision is documented (§23). Those gates are not met or evaluated in MC-07.

---

## 23. SLA evidence requirements (`NO_SLA_ESTABLISHED`)

### 23.1 Current status

`FLEET_SLA = NO_SLA_ESTABLISHED`. There is no uptime commitment, no measurement, no error budget, no credit
regime and no historical reliability data. No percentage, hour count, RTO, RPO, response time or availability
figure may be stated anywhere as a FLEET commitment or achievement. Enterprise is a contracted tier; even there,
no SLA figure exists until a real contract and measurement exist (brief §4).

### 23.2 What an SLA would require before it could exist

1. **A defined service and boundary**: which components, which region, which dependencies are in scope and which
   are excluded (connectivity, third-party providers, customer equipment).
2. **A measurement method**: what is measured, where, by whom, with what sampling and exclusion rules;
   independent or mutually agreed instrumentation.
3. **Baseline data**: a measured history over a stated period and sample, not a target.
4. **A commitment**: availability/performance target, measurement window, exclusions, credits or remedies,
   reporting cadence, escalation and claim process.
5. **Evidence**: monitoring records, incident records, monthly reports, and an audit trail that the customer can
   verify.
6. **Contract**: legal terms, liability, termination for persistent failure. None exists.

### 23.3 Permitted language before an SLA exists

Only: "No service-level commitment is established; service levels are not promised." A maintenance window,
support process or best-effort statement may exist only if described as such and not as a guarantee. A
"99.9% uptime" claim, a "24/7" claim or a "response within X" claim is prohibited (claims policy §2 Class C/P).

### 23.4 Measurement plan shape (target; no values)

Future measurement should cover: ingestion availability and latency; API availability and latency; report/export
job completion; notification handoff (with the distinction between acceptance and delivery); support response
(only if a support commitment is contracted); incident detection and recovery. Every metric states the sample,
window, environment, dependency exclusions and whether it is measured by the operator or independently. A single
measured result from one region or environment may not be extrapolated.

---

## 24. Subscription authorization tied to tenant entitlements

### 24.1 Entitlement model

The subscription belongs to the organization and produces an entitlement ledger: plan (`FLEET-START`,
`FLEET-BUSINESS`, `FLEET-ENTERPRISE`), state, effective dates, feature entitlements, vessel/device/user/API/storage
limits, and a history of changes. Feature gating is evaluated server-side against the entitlement, never against
a client flag. Billing and entitlement are related but distinct: a billing event changes entitlement, and an
entitlement check never charges money.

### 24.2 States and degradation

| State | Effect on tenant |
| --- | --- |
| `ACTIVE` | entitled capabilities available |
| `GRACE` | entitled capabilities continue for a bounded period; the customer is told the deadline; no data loss |
| `RESTRICTED` | read-only over existing data; no new devices, invitations, integrations or reports; export still available; no deletion |
| `SUSPENDED` | security/abuse hold; limited owner/security access; evidence preserved |
| `TERMINATED` | service ended per §25 |

Honest degradation is mandatory: the UI must state what stopped and what still works. A payment failure never
causes silent data deletion, never disables export and never fabricates a "paid" state.

### 24.3 Separation from safety and local function

FLEET has no vessel-control function; nevertheless the architecture rule R-A3 applies: an entitlement state may
never alter vessel behaviour, disable local functions or gate safety-relevant presentation. A lapsed FLEET
subscription affects the SaaS only.

### 24.4 No double billing

The same capability is never billed twice across MAREA products. FLEET is a standalone B2B subscription; if a
future bundle includes FLEET, the entitlement ledger must record the inclusion and the customer must not be
charged twice for the same feature. FLEET must not silently consume a consumer WATCH/NAV entitlement; any
sharing is explicit and audited (brief §10).

### 24.5 Enforcement points

Server-side checks on: feature use (reporting, integrations, API), creation of vessels/devices/users beyond the
contracted limit, storage and telemetry volume, API call rate, and export scope. Enforcement must be tested for
positive and negative cases (within limit, at limit, over limit, after downgrade, after expiry). A downgrade
never deletes over-limit data silently; the customer is told how to reduce and given an export path.

### 24.6 Authorization relationship

Entitlement is an additional gate, not a substitute for authorization. A user must pass §7.1 **and** have the
entitlement. An entitled feature is still denied to a role that lacks the capability; a role-permitted feature is
still denied without entitlement. The denial reason shown to the user distinguishes "not your permission" from
"not in your plan" without leaking commercial or tenant information.

### 24.7 Audit and disputes

Entitlement changes, plan changes, grace/restricted transitions and enforcement actions are audited. Billing
disputes are resolved from records, not from memory. No fabricated billing history exists.

Evidence class: `OPEN`; `FLEET_ENTITLEMENT_SERVICE = NOT_FOUND`; prices are `HYPOTHESIS_UNAPPROVED` per brief §4
and are not restated as offers.

---

## 25. Organization termination

### 25.1 Triggers

Customer-initiated termination; contract expiry; persistent non-payment after the documented grace; material
breach; security or legal necessity; end of a pilot. Each trigger has a documented process and an authorised
human decision; no automated termination may delete data without a recorded decision.

### 25.2 Termination sequence

1. **Notice** to the owner(s) with the effective date, what stops, what remains available (export/read-only) and
   the data-return window.
2. **Export window** (value `OPEN`): the customer can export the full entitled dataset (§15).
3. **Transfer option**: vessels and devices may be transferred to another organization before termination
   (§4.6, §8.6), subject to the recipient's consent and the customer's authority.
4. **Read-only period** (`RESTRICTED`/`TERMINATION_PENDING`): existing data visible to owner/admin; no new
   devices, invitations or integrations.
5. **Service end**: access ends; telemetry ingestion from bound devices stops; devices are unbound or
   transferred; credentials revoked.
6. **Deletion**: tenant data deleted per the DPA/retention schedule after the window; processors notified;
   backups expire on their cycle; deletion evidence produced.
7. **Statutory survivors**: invoices/tax records and minimal audit/accountability records retained and
   access-restricted (§16.5).
8. **Confirmation** to the owner and a record of completion.

### 25.3 What termination does not do

It does not delete the owner's personal account automatically; it does not delete records required by law; it
does not permit EMBARCARTE to reuse tenant data for any other purpose; it does not erase another organization's
data; it does not silently keep a "disabled" copy usable by support beyond the documented retention.

### 25.4 Re-registration

A terminated organization's id is retired; a returning customer gets a new organization (or a documented
restore from an exported package, with a new id). Reactivation of the same tenant with the old data is not
permitted by default; a documented restore path may exist only with explicit customer request, verification and
audit, and never guarantees the removed data still exists.

### 25.5 Termination by the customer versus by EMBARCARTE

Both are audited with the actor, reason and effective date. Termination by EMBARCARTE requires the contractual
basis and a notice period defined in the DPA/terms; it is not a unilateral deletion right outside the contract.
A security suspension is not a termination and preserves data for investigation.

Evidence class: `OPEN` — target design; no service, no DPA, no termination process exists.

---

## 26. Acceptance scenarios — positive and negative, per resource type

All scenarios below are **future test requirements**. State: `NOT_EXECUTED` for every row. Each scenario must be
implemented with synthetic two-tenant fixtures (tenant A and tenant B), and every negative scenario must also
assert that a security event was recorded without leaking tenant existence. A scenario passes only with a
recorded test artifact reviewed by someone other than the author.

| ID | Resource | Positive scenario (must succeed) | Negative scenario (must be denied) |
| --- | --- | --- | --- |
| T-01 | Organization | A's owner reads A's organization profile | A's member sends B's `organizationId` in path/body/header; server denies, no B data, security event |
| T-02 | Organization settings | A's admin edits A's settings; audit records before/after | A's admin attempts to edit B's settings via guessed id/URL; denied |
| T-03 | Membership list | A's owner views A's members with roles/scopes | A's owner lists members of B; denied; counts do not reveal B |
| T-04 | Invitation | A's admin invites a new member to A; invitation accepted; access matches role | Invited account cannot accept for another identity; an invitation for B cannot be used against A; expired invitation grants nothing |
| T-05 | Role change | A's owner promotes/demotes an A member; next request reflects the new role | A's admin grants `ORGANIZATION_OWNER`; denied (ownership transfer only); installer cannot become admin |
| T-06 | Member removal | A's owner removes a member; next request denied on API and async surfaces | Removed member's existing token still accepted; cookie/app token still works; export job still runs — all must fail |
| T-07 | Vessel register | A's fleet manager views A's vessels; assignment controls what is visible | A's user opens B's `vesselId`; denied; B's vessel name/position never appears in errors or counts |
| T-08 | Vessel assignment | A's owner assigns vessel V to a crew member; crew sees V | Crew member assigned to V1 cannot read V2 in the same organization; another organization's user cannot read V1 |
| T-09 | Live telemetry | A's member with `TELEMETRY_LIVE` sees A vessel's live position | A's viewer on B's device/stream; denied; WebSocket/SSE subscription rejected if unauthorized |
| T-10 | Telemetry history | A's manager reads A vessel history within entitlement | A's viewer reads B history; A's role without `TELEMETRY_HISTORY` is denied within A; export of B history impossible |
| T-11 | Telemetry credential | A's device credential ingests A's device records | B's device presents A's credential or A's credential presents B's device/tenant; rejected; security event; no cross-write |
| T-12 | Alert acknowledgement | A's crew acknowledges A alert; actor recorded | A's user acknowledges B alert; denied; no notification is sent to B |
| T-13 | Alert configuration | A's fleet manager configures an A rule/geofence | A's crew configures alerts; denied; cross-tenant rule/geofence reference rejected at write |
| T-14 | Maintenance task | A's maintenance manager creates/closes a task on an assigned vessel | A's crew creates a task; denied; a task referencing B's vessel is rejected |
| T-15 | Documents | A's maintenance manager uploads/reads an A document within permission | A's viewer downloads B document or guesses a signed URL; denied/expired; URL scoped to one object |
| T-16 | Reports and exports | A's owner exports A data; manifest lists scope; download audited | A's export contains any B record, B id, secret, support-internal or licensed data the tenant may not redistribute; A cannot download B export |
| T-17 | Search | A's user searches A's vessels/documents; only A results | A search query that would match B returns nothing of B; index cannot be queried without tenant filter; counts/facets do not leak B |
| T-18 | Audit log | A's owner reads A audit events within role permission | A's owner reads B audit; denied; support sees only granted class; audit export excludes B |
| T-19 | Support access | Support opens a scoped grant for A to diagnose a named class; access works and is visible to A | Support attempts to read B, or A outside the granted class, or write without write scope, or access after expiry; denied and audited |
| T-20 | External installer | Installer with accepted, unexpired grant for A vessel V1 views V1 and commissions named device | Installer accesses V2 or B; installer attempts member management, billing, export, transfer or control; expired/revoked grant fails; installer cannot become admin |
| T-21 | Device binding | A's admin binds an unbound device to A and V1; binding audited | A binds a device already owned by B without transfer; A binds a device with a B-supplied tenant field; denied; ownership proof required |
| T-22 | Device revocation | A revokes a lost device; ingestion stops; rebinding blocked | Revoked device keeps ingesting; another organization can rebind the revoked device silently; denied |
| T-23 | Device transfer | A transfers a device to B with both owners' consent; new credentials; audit both sides | Transfer without consent; transfer leaves old credential valid; transfer visible to the wrong tenant; denied |
| T-24 | Vessel transfer | A transfers vessel V to B after both owners accept; A loses access; B gains it; audit both sides | Transfer initiated by installer/support alone; transfer leaves an A grant or assignment active; history copied without explicit choice; denied |
| T-25 | Background job | A scheduled report/export for A runs with A context; result only A can read | A job whose payload/tenant is tampered to B fails closed; a retry after revocation fails; dead-letter entry leaks no B data |
| T-26 | Cache | A's cached dashboard is served to A only | Shared cache returns A's response to B; tenant header/key confusion; negative cache leaks existence; denied |
| T-27 | Subscription/entitlement | A's entitled feature works within plan; at-limit behaviour is honest | A user uses an unentitled feature because a client flag said so; downgrade deletes data; denied; honest message shown |
| T-28 | Organization transfer (membership) | A person joins B through a new invitation; roles are B's | A's membership is reused in B; a role/scope from A applies in B; denied |
| T-29 | Account deletion | User deletes their account; memberships removed; confirmation | Account deletion as sole owner deletes the organization silently; audit records erased; denied/blocked with explanation |
| T-30 | Organization termination | Owner terminates A; export window; deletion; confirmation; statutory records kept | Termination leaves A data accessible to support/another tenant; deletion not propagated to backups/processors; denied/flagged |

Scenario families that must also exist as variants: list endpoints, counts, facets, error messages, timing side
channels, WebSocket/SSE subscriptions, mobile token refresh, public API, webhooks, integration callbacks,
scheduled reports, notification fan-out, search suggestions, and admin/support tooling. A test suite that covers
only CRUD is insufficient.

---

## 27. Threat model summary (design-level)

| Threat | Example | Required mitigation (design) | State |
| --- | --- | --- | --- |
| IDOR / broken object-level authorization | A reads B vessel by id | §7.1 pipeline on every object; opaque ids; not-found-equivalent responses | `OPEN` |
| Missing tenant predicate | A list query returns B rows | Tenant predicate in the data layer; database-level isolation | `OPEN` |
| Privilege escalation | Installer promotes self to admin | Role/grant authority checks; no self-grant; owner-only escalation | `OPEN` |
| Stale authorization | Removed user keeps token | Server-side session revocation; per-request re-derivation | `OPEN` |
| Credential theft (user) | Stolen session | Revocation, step-up for sensitive acts, anomaly detection, bounded sessions | `OPEN` |
| Credential theft (device) | Cloned device credential | Per-device credentials, rotation, revocation, anomaly detection, tenant-scoped ingest | `OPEN` |
| Cross-tenant ingestion | Device posts with another tenant id | Tenant from credential, never payload; foreign device/vessel rejection | `OPEN` |
| Cache poisoning/confusion | Shared key serves A to B | Tenant-keyed keys; no shared authenticated cache | `OPEN` |
| Search index leakage | Global index returns B | Mandatory tenant filter; partitioned index | `OPEN` |
| Export/URL leakage | Guessable export URL | Per-tenant storage, signed short-lived URL, audit download | `OPEN` |
| Job tampering / queue poisoning | Payload changed to B | Signed/immutable envelope; fail closed; re-auth at execution | `OPEN` |
| Insider / support misuse | Support reads without need | Scoped support grants, expiry, customer visibility, audit, two-person approval for emergency | `OPEN` |
| Audit tampering | Delete the evidence | Append-only store, separate role, integrity protection | `OPEN` |
| Notification leak | Alert email reveals B | Recipients from tenant membership at send time | `OPEN` |
| Enumeration / probing | Guessing ids | Rate limits, opaque ids, uniform responses, security events | `OPEN` |
| Supply chain | Malicious dependency | SBOM, pinned digests, dependency scanning, review | `OPEN`; H-13 |
| Injection | Query/command injection | Parameterised queries, validation, least-privilege DB roles | `OPEN` |
| Insecure defaults | Public bucket, debug endpoint | Configuration review, infrastructure as code, pre-production checks | `OPEN` |
| Loss of connectivity / provider failure | Telemetry gaps | Honest last-known state, gap records, no fabricated data | `OPEN`; H-12 |
| Legal/role misassessment | Processing without DPA | §17–§19 gates before processing | `BLOCKED` until DPA/DPIA |

---

## 28. Evidence register and open items

| Item | Owner function | Status | Gate / evidence needed |
| --- | --- | --- | --- |
| Multi-tenant service, organization model, tenancy | Engineering + product | `NOT_FOUND` (P-09) | MC-13-FLEET design and build |
| Authorization engine and policy tests | Engineering + security | `NOT_FOUND` | Policy unit tests + two-tenant integration suite |
| Device identity, provisioning, binding, revocation | Engineering + security | `NOT_FOUND` (X-07) | Threat model, device identity design, tests |
| Audit store and integrity | Engineering + security | `NOT_FOUND` | Append-only store, integrity mechanism, tests |
| Entitlement and subscription service | Engineering + commercial | `NOT_FOUND` | Billing/entitlement design, audit, tests |
| Isolation test suite (API, jobs, cache, search, export, audit) | Engineering + QA | `NOT_EXECUTED` | CI evidence + independent review |
| Penetration test and threat-model review | Independent security | `NOT_PERFORMED` | Signed report, findings triaged |
| DPIA (position/telemetry, sharing, installer) | DPO/counsel | `NOT_COMPLETED` | Full DPIA with residual-risk sign-off |
| DPA template and per-customer DPAs | Legal + commercial | `NOT_CONTRACTED` | Reviewed DPA, seller identity (X-02) |
| Subprocessor list and agreements | Legal + procurement | `NOT_CONTRACTED` | Signed agreements, published list, transfer assessment |
| International transfer mechanism | Legal | `OPEN` | TIA/mechanism decision |
| Retention values per data class | DPO + product | `OPEN` | Published schedule before processing |
| Controller/processor per-flow confirmation | DPO/counsel | `OPEN` | Confirmed assessment (§17) |
| SLA definition, measurement and contract | Commercial + engineering | `NO_SLA_ESTABLISHED` | Baseline measurement + contract; never a pre-set number |
| Connectivity/telemetry cost and coverage | Procurement | `BLOCKED` (H-12) | MVNO/roaming terms, coverage data |
| Security contact and disclosure policy | Security + counsel | `OPEN` | Published policy (H-13) |
| Legal identity of the seller | Company owner/counsel | `BLOCKED` (X-02) | Verified registry/tax data |
| Brand clearance | Company owner/counsel | `BLOCKED` (X-01) | Trademark clearance |
| Customer discovery evidence | Product + sales | `BLOCKED` (X-06) | Real interviews, not invented |
| Data-rights position for AIS/third-party data | Product + counsel | `BLOCKED` (D-09, D-10) | Written rights/retention decision |
| CRA secure-update and incident process | Engineering + compliance | `BLOCKED` (H-13) | Vulnerability handling, SBOM, update policy |

---

## 29. Non-assertions and document status

This contract does **not** assert and must not be read as asserting: that any organization, membership, role,
permission, tenant boundary, authorization check, invitation, revocation, transfer, audit log, background job,
cache partition, search index, export, deletion, DPA, subprocessor agreement, transfer mechanism, DPIA, incident
procedure, retention schedule, security test or SLA exists or works; that any isolation has been tested; that any
controller/processor allocation is legally confirmed; that any certification (ISO 27001, SOC 2 or equivalent)
exists — none does; that any customer production data exists or has been used; that any price, availability,
service level or enterprise commitment is established; that MAREA FLEET is available, certified or cleared.

### 29.1 Required disclaimers (verbatim, not paraphrased)

Because FLEET surfaces vessel position and instrument data, the approved navigation/instruments disclaimer of
`docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 applies in full and is reproduced here verbatim for the
future customer-facing surfaces this contract governs:

- ES: «Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.»
- EN: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper."

The batch-03 FLEET limitation statement (INTERNAL DRAFT wording, pending claims-register review; brief §17) is
reproduced verbatim in both languages:

- ES: «MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca permite gobernar la embarcación.»
- EN: "MAREA FLEET is an internal design: no deployed multi-tenant service and no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows steering the vessel."

This contract adds no customer-facing claim of its own; it is an internal specification. Any future surface that
uses these sentences must reproduce them exactly, in the product's language, and must not weaken them.

**What a validator can and cannot prove.** The MC-07 validator can confirm that this document contains the
required sections, role tokens, permission cells, scenarios and evidence labels. It cannot run the service,
cannot observe a database, cannot attempt a cross-tenant request, cannot measure revocation timing and cannot
produce isolation evidence. **Specification presence is not runtime isolation.**

Status: `INTERNAL_ONLY`, `TARGET_CONTRACT`, `NOT_IMPLEMENTED`, `NOT_FOR_SALE`, `NOT_PUBLISHED`. This contract binds the
future FLEET engineering, security, privacy, legal and verification milestones. It does not create a service, a
contract, a legal opinion or evidence that MAREA FLEET works.

---

## 30. Cross-references and change rule

Related documents:

- `docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md` — FLEET capability, editions, segments and commercial definition (authoritative on product scope; this contract is authoritative on tenancy, authorization and data governance).
- `docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md` — ecosystem compatibility rows involving FLEET.
- `docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md` — edition authority.
- `docs/marea/products/PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md` — pricing and channel model (planned).
- `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md` — precedent privacy/alert contract; FLEET reuses its principles without duplicating the consumer alert lifecycle.
- `docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` — layers, single-writer rules, prohibited connections, data boundaries.
- `docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md` — blocker register.
- `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` — claim classes and prohibited statements.
- `docs/marea/products/README.md` — lifecycle, readiness, evidence classes and claim rules.
- EDPB, "Data controller or data processor": https://www.edpb.europa.eu/sme/learn-the-basics/data-controller-or-data-processor_en (checked 2026-10-30; `VERIFIED_EXTERNAL`).

**Change rule.** Any change to a role, permission, tenant invariant, retention value, controller/processor
allocation or acceptance scenario requires a new revision of this document, a re-check against brief §11 and the
companion dossier, and an independent review of the evidence. A downstream engineering milestone may not narrow
or waive an isolation requirement without a recorded decision; it may add implementation detail that is
consistent with this contract.
