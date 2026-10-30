# WATCH alert-delivery and privacy contract (MC-06 / D10-WATCH)

| Field | Value |
| --- | --- |
| Document ID | MC-06 / D10-WATCH |
| Milestone | MC-06 (Master Prompt 06/36) — product definitions batch 2 |
| Product | MAREA WATCH (`WATCH`); editions MAREA WATCH Core (`WATCH-CORE`) and MAREA WATCH Plus (`WATCH-PLUS`) |
| Owner function | Product Management — WATCH Product Director (author function for this contract) |
| Status | `INTERNAL` / `TARGET_CONTRACT` / `NOT_IMPLEMENTED` / `NOT_FOR_SALE` / `NOT_PUBLISHED` |
| Lifecycle state | `DEFINED` as a specification; the service it describes does not exist |
| Date | 2026-10-30 |
| Authority | `docs/marea/products/README.md` §15, §16, §19, §20 are binding. This contract may not introduce a state name, timestamp name or authority path that they do not define |
| Companion dossier | `docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md` (D3) |
| Customer copy | `docs/marea/products/copy/watch.es.md`, `docs/marea/products/copy/watch.en.md` (D8) |
| Evidence state | `WATCH_INGESTION = NOT_VERIFIED`; `WATCH_NOTIFICATION_PIPELINE = NOT_FOUND`; `WATCH_DEVICE_IDENTITY = NOT_FOUND`; `WATCH_SUBSCRIPTION_SERVICE = NOT_FOUND`; `WATCH_CONNECTIVITY_CONTRACT = NOT_FOUND` |

This contract fixes the alert lifecycle, the delivery semantics, the failure policies and the privacy and data
protection model of MAREA WATCH. It is a **target contract**: a design requirement for a service that does
not exist. Nothing here is implemented, tested, certified, measured or approved by a DPO. Where a value is
not established it is `OPEN`; where an external condition prevents closure it is `BLOCKED`. The words
"guarantee", "SLA", "achieved" and "certified" do not appear as claims anywhere in this contract, and no
delivery-time figure is a promise.

---

## 1. Scope, non-goals and standing rules

### 1.1 Scope

In scope: the notification state machine and its transition rules; the distinct timestamps; provider handoff,
acceptance, delivery evidence, acknowledgement and escalation; deduplication, retry, backoff, ordering,
offline buffering and replay; stale-state handling; alert-fatigue controls; recovery; notification-channel
failure policy; the delivery measurement plan; the privacy, consent, access-control, retention, export,
deletion, revocation, audit, breach and DPIA model of the service and of the vessel-position data it processes.

Out of scope: hardware design, firmware implementation, the device BOM, connectivity procurement, pricing,
conformity assessment, commercial terms of service, and any remote control of the vessel. None of those may be
decided here.

### 1.2 Non-goals — binding boundaries

1. WATCH is **conditional awareness**, not a distress, rescue, safety-of-life, SOLAS or GMDSS service. No
   notification is ever routed to emergency services as part of this product.
2. WATCH is **not a theft-prevention guarantee**. It reports conditions; it does not prevent, deter or recover.
3. WATCH has **no remote helm or steering command of any kind**, and no cloud-to-actuator path exists or is
   planned. The service may never accept, queue, forward or display a command that would change the vessel's
   heading, throttle or steering.
4. WATCH is **not a navigation or chart product**; it does not provide ECDIS-like status, AIS traffic or
   navigation-grade position.
5. **Provider acceptance is not delivery.** **Delivery confirmation is not human acknowledgement.** No
   interface, report, KPI or copy may conflate them.
6. **No public exposure of vessel position by default**, and no shareable public link in the default product.
7. A subscription or payment failure may never disable safety-relevant or local functions of the device; the
   remote service degrades in the documented order instead.

### 1.3 Authority model — single writer per state

The notification service is the single authoritative writer of the remote alert lifecycle. The device writes
observations and local events; it does not write remote alert states. Users write acknowledgements through an
authenticated API, and the service records them. A provider never writes a canonical state directly: the
service maps provider evidence into the state. This follows the single-writer rule of
`docs/marea/compliance/MAREA-COMMERCIAL-ARCHITECTURE.md` §3 R-A7 and §6 C-16.

---

## 2. Entities, identifiers and vocabulary

| Entity | Definition | Identifier |
| --- | --- | --- |
| Observation / event | A device-recorded change or sample on a supported input, with its own event time | `eventId` (device-generated, globally unique per device), `sequence` (monotonic per device) |
| Rule | An owner-defined condition on one or more supported inputs, with thresholds, debounce, hysteresis and notification targets | `ruleId` |
| Rule evaluation | The recorded outcome of evaluating one rule against one event or state | `evaluationId` |
| Alert | The actionable object created when a rule matches; it owns the canonical lifecycle state | `alertId` |
| Notification attempt | One handoff of one alert to one channel/recipient combination | `attemptId` |
| Delivery evidence | Verifiable provider or client evidence that the notification reached a destination | `evidenceId` |
| Acknowledgement | An authenticated human act confirming that a person saw and took responsibility for the alert | `ackId` |
| Escalation | A policy-driven additional notification attempt after a defined unacknowledged window | `escalationStepId` (also an `attemptId`) |
| Incident | A grouping of related alerts for the same condition epoch on the same vessel | `incidentId` |
| Connectivity gap | A detected interval in which the device had no uplink | `gapId` |
| Access event | An auditable act on data or access rights (view, share, revoke, export, delete, support access) | `auditId` |

The canonical notification **states** are exactly those of `docs/marea/products/README.md` §20. This contract
does not create a second enum. Recovery of a physical condition is **not** a canonical state: it is a new
observation that resolves the condition, recorded against the incident, while the alert's lifecycle state
stays unchanged.

---

## 3. Canonical state machine

### 3.1 States, meaning and emitter

| State | Meaning | Authoritative emitter | Terminal |
| --- | --- | --- | --- |
| `EVENT_OBSERVED` | A device observation exists with an `eventTime`; it has not yet been evaluated remotely | Device (observation) / ingestion service (record) | No |
| `RULE_MATCHED` | The rule evaluation concluded that the condition is met and the alert criteria (debounce, hysteresis, suppression) are satisfied | Notification service rule evaluator | No |
| `ALERT_CREATED` | The actionable alert object exists with severity, rule reference, vessel, triggering value and evidence | Notification service | No |
| `QUEUED` | The alert is queued for a notification attempt; one entry per attempt | Notification service queue manager | No |
| `PROVIDER_ACCEPTED` | An external provider has accepted the handoff for that attempt | Notification service, on mapping the provider response | No |
| `DELIVERED_WHEN_CONFIRMED` | Verifiable delivery evidence exists for at least one attempt | Notification service, on recording delivery evidence | No |
| `ACKNOWLEDGED` | An authenticated authorised user has acknowledged the alert | Authenticated user, recorded by the service | Yes |
| `EXPIRED` | The alert's actionable or acknowledgement window elapsed, or the observation was too old to act on, before a terminal human outcome | Notification service expiry worker | Yes |
| `FAILED` | Every permitted attempt failed before any provider acceptance; no route remains under policy | Notification service | Yes |
| `DELIVERY_UNKNOWN` | A provider accepted the handoff but no verifiable delivery evidence arrived within the evidence window | Notification service | Conditional — may resolve to `DELIVERED_WHEN_CONFIRMED` or `ACKNOWLEDGED`, otherwise stays unknown/expires |

### 3.2 Allowed transitions

Every transition below records its timestamp, the acting component, the attempt it belongs to (where
applicable) and an audit entry. Transitions not listed are forbidden.

| # | From | To | Trigger | Emitter | Timestamp recorded |
| --- | --- | --- | --- | --- | --- |
| T-01 | — | `EVENT_OBSERVED` | Device records a supported observation or local event | Device; ingestion service on receipt | `eventTime`, `deviceClockTime`, `serverReceiptTime` |
| T-02 | `EVENT_OBSERVED` | `RULE_MATCHED` | Rule evaluation satisfies the condition and suppression gates | Notification service | evaluation time; `alertCreationTime` follows |
| T-03 | `EVENT_OBSERVED` | `EXPIRED` | Observation is older than the actionable window at evaluation time (for example buffered replay after a long gap) and can no longer be acted on | Notification service expiry worker | `eventTime`, `serverReceiptTime`, expiry time |
| T-04 | `RULE_MATCHED` | `ALERT_CREATED` | Alert object built and validated | Notification service | `alertCreationTime` |
| T-05 | `RULE_MATCHED` | `EXPIRED` | Condition resolved or superseded before alert creation under the rule's coalescing window | Notification service | evaluation and expiry times |
| T-06 | `ALERT_CREATED` | `QUEUED` | First notification attempt scheduled | Notification service | queue time; `notificationHandoffTime` when handed off |
| T-07 | `ALERT_CREATED` | `FAILED` | Alert cannot be routed at all (no recipient, no permitted channel, invalid target) | Notification service | `alertCreationTime`, failure reason |
| T-08 | `QUEUED` | `PROVIDER_ACCEPTED` | Provider accepts the handoff for an attempt | Notification service, on provider response | `notificationHandoffTime`, `providerAcceptanceTime` |
| T-09 | `QUEUED` | `FAILED` | All attempts for all permitted channels failed before acceptance, or the alert TTL elapsed with no attempt possible | Notification service | last attempt time, failure reason |
| T-10 | `QUEUED` | `EXPIRED` | Alert is superseded or its window closes while still queued and no attempt may lawfully be sent | Notification service | expiry time |
| T-11 | `PROVIDER_ACCEPTED` | `DELIVERED_WHEN_CONFIRMED` | Verifiable delivery evidence is received for that attempt | Notification service | `deliveryConfirmationTime` |
| T-12 | `PROVIDER_ACCEPTED` | `DELIVERY_UNKNOWN` | Evidence window elapses with no verifiable delivery evidence | Notification service | evidence-window expiry time |
| T-13 | `PROVIDER_ACCEPTED` | `EXPIRED` | Alert expires before any evidence arrives and policy does not permit further attempts | Notification service | expiry time |
| T-14 | `DELIVERED_WHEN_CONFIRMED` | `ACKNOWLEDGED` | An authenticated authorised user acknowledges | Authenticated user; service records | `userAcknowledgementTime` |
| T-15 | `DELIVERED_WHEN_CONFIRMED` | `QUEUED` | Escalation is due: a new attempt for the same unacknowledged alert is queued to the next contact/channel in the policy | Notification service escalation engine | escalation time; new attempt timestamps |
| T-16 | `DELIVERED_WHEN_CONFIRMED` | `EXPIRED` | Acknowledgement window elapses and the escalation policy is exhausted or the condition is no longer actionable | Notification service expiry worker | expiry time |
| T-17 | `DELIVERY_UNKNOWN` | `DELIVERED_WHEN_CONFIRMED` | Late verifiable delivery evidence arrives inside the evidence window | Notification service | `deliveryConfirmationTime` |
| T-18 | `DELIVERY_UNKNOWN` | `ACKNOWLEDGED` | The user acknowledges directly (for example in the app) even though no provider delivery evidence exists | Authenticated user; service records | `userAcknowledgementTime` |
| T-19 | `DELIVERY_UNKNOWN` | `QUEUED` | Escalation is due because the alert is unacknowledged and evidence remains unknown | Notification service escalation engine | escalation time; new attempt timestamps |
| T-20 | `DELIVERY_UNKNOWN` | `EXPIRED` | Evidence and acknowledgement windows both elapse; the alert ends with unknown delivery recorded, never as delivered | Notification service expiry worker | expiry time |
| T-21 | `FAILED` | `QUEUED` | An operator or an authorised user explicitly requests a resend; the failure is retained in history and the resend is audited | Notification service on audited request | resend time |
| T-22 | `FAILED` | `EXPIRED` | Retention window for an unactionable failed alert elapses | Notification service expiry worker | expiry time |

### 3.3 Forbidden transitions (explicit)

1. Any provider response that is not verifiable delivery evidence may **never** set
   `DELIVERED_WHEN_CONFIRMED`. `PROVIDER_ACCEPTED` alone is acceptance, not delivery (README §20).
2. `PROVIDER_ACCEPTED` may never transition directly to `ACKNOWLEDGED`.
3. `QUEUED` may never transition to `DELIVERED_WHEN_CONFIRMED` or `ACKNOWLEDGED`.
4. No state may transition back to an earlier lifecycle state (`ACKNOWLEDGED` is terminal; `EXPIRED` is
   terminal; a delivered alert may not become queued except through the documented escalation transition
   T-15/T-19, which does not erase the earlier delivery record).
5. No component other than the notification service may write a canonical state.
6. The device may never mark a remote alert acknowledged, delivered or accepted.
7. An acknowledgement may never be inferred from an app open, a push tap, a read receipt or silence.
8. `DELIVERED_WHEN_CONFIRMED` may never degrade to `DELIVERY_UNKNOWN`.
9. `EVENT_OBSERVED` may never jump to `ALERT_CREATED` or later states without `RULE_MATCHED`.
10. A state transition may never overwrite an existing timestamp; timestamps are appended, never rewritten.

---

## 4. Distinct timestamps

The eight canonical timestamps are distinct, are never conflated and are stored in UTC with their source
clock. No single "sent time" field exists.

| Timestamp | Set by | Meaning | Ordering and constraints |
| --- | --- | --- | --- |
| `eventTime` | Device | When the condition was physically observed, according to the device's understanding of time | May precede every other timestamp; after a buffered replay it may be hours or days older than `serverReceiptTime`. Never replaced by receipt time. Always displayed with the value it belongs to |
| `deviceClockTime` | Device | The device's own clock reading when the observation or buffered record was written | Used to detect clock drift and to order the local buffer. If drift exceeds the configured threshold, the service flags the value and does not silently trust it; the event is retained with the flag |
| `serverReceiptTime` | Ingestion service | When the observation reached the service | Server clock; may be much later than `eventTime` after a connectivity gap. Recorded per observation and per replay batch |
| `alertCreationTime` | Notification service | When the alert object was created (`ALERT_CREATED`) | Must be at or after the `serverReceiptTime` of the triggering event; for a buffered event, `alertCreationTime` is current while `eventTime` is old, and that age is shown to the user |
| `notificationHandoffTime` | Notification service | When the alert was handed to a provider for a specific attempt | Per attempt; repeated for escalation and resend |
| `providerAcceptanceTime` | Notification service, mapped from provider response | When the provider returned an acceptance response for that attempt | Must be at or after the attempt's `notificationHandoffTime`; acceptance is not delivery |
| `deliveryConfirmationTime` | Notification service | When verifiable delivery evidence was recorded | Must be at or after `providerAcceptanceTime` for the same attempt; never set from silence or from a "sent" status |
| `userAcknowledgementTime` | Notification service, on authenticated user action | When an authorised person acknowledged | Must be at or after `alertCreationTime`; independent of delivery evidence; may exist when delivery is unknown |

### 4.1 Ordering rules and clock handling

- Within one alert and attempt, the canonical order is `eventTime`/`deviceClockTime` → `serverReceiptTime` →
  `alertCreationTime` → `notificationHandoffTime` → `providerAcceptanceTime` → `deliveryConfirmationTime`, with
  `userAcknowledgementTime` ordered only after `alertCreationTime`.
- Provider evidence may arrive out of order or late. The service records both the provider-reported time and
  the service receipt time; it does not rewrite the canonical timestamp to a later receipt time.
- A clock skew beyond the configured threshold is a first-class quality flag on the value, never a silent
  correction presented as truth.
- For a buffered replay, `eventTime` is preserved and the alert is labelled "recorded while offline"; the
  product must never present a replayed alert as instantaneous.
- If two timestamps would be equal at the resolution used, the service records a monotonic sequence to keep a
  deterministic order; equality is not compressed into one field.

---

## 5. Delivery semantics and evidence

### 5.1 Three different facts

| Fact | What it proves | What it does not prove | How it is recorded |
| --- | --- | --- | --- |
| Provider acceptance | The provider took the handoff for an attempt | That any device, inbox or handset received it; that any human saw it | `PROVIDER_ACCEPTED` + `providerAcceptanceTime` |
| Delivery confirmation | Verifiable evidence that the notification reached a destination (for example a provider delivery receipt tied to the attempt, or a client-confirmed receipt where the design supports it) | That a human read or understood it | `DELIVERED_WHEN_CONFIRMED` + `deliveryConfirmationTime` + `evidenceId` |
| Human acknowledgement | An authenticated authorised person explicitly acknowledged the alert and took responsibility | That the condition is resolved | `ACKNOWLEDGED` + `userAcknowledgementTime` + `ackId` |

### 5.2 Evidence classes and rules

| Evidence class | Example | Can it set delivered? | Rule |
| --- | --- | --- | --- |
| Acceptance | Provider API returns accepted | No | Sets `PROVIDER_ACCEPTED` only |
| Destination receipt | Provider reports delivery to the destination | Yes, if the provider's confirmation is verifiable for that attempt | Sets `DELIVERED_WHEN_CONFIRMED` with the evidence reference |
| Client confirmation | The authenticated client reports that it displayed the alert | Yes, if tied to the attempt and the authenticated user session | Sets delivery; remains distinct from acknowledgement |
| Read/open signal | A push tap or an opened notification | No, not by itself | May support an acknowledgement flow; never sets acknowledgement automatically |
| No evidence | Nothing arrives within the evidence window | No | Sets `DELIVERY_UNKNOWN`; never `DELIVERED_WHEN_CONFIRMED` |

### 5.3 Hard rules

1. The UI, reports and KPIs distinguish **accepted**, **delivered**, **unknown** and **acknowledged** states
   for every alert attempt. There is no aggregate "alerts sent" figure that hides this distinction.
2. `DELIVERY_UNKNOWN` is a truthful, visible outcome. It may not be collapsed into "delivered" for reporting
   convenience.
3. No delivery-time guarantee exists. Any latency figure published before measurement is a plan, not a fact.
4. A provider that cannot supply delivery evidence is disclosed as such in the channel capability table and to
   the user in plain language, so the owner knows what the product can and cannot prove.
5. An alert that is delivered but never acknowledged ends in `EXPIRED` and is visibly recorded as "delivered,
   not acknowledged".

---

## 6. Deduplication

| Level | Key | Behaviour | Open value |
| --- | --- | --- | --- |
| Replay dedupe | `eventId` + device `sequence` | A replayed buffered event is stored once; duplicate replays are discarded | Duplicate window |
| Observation coalescing | Device + input + normalised value bucket + time window | Repeated identical samples do not create repeated events | Sampling and coalescing windows per input |
| Alert coalescing | `incidentId` = vessel + rule + condition epoch | Repeated matches for the same condition epoch produce one alert, not a storm | Condition-epoch definition and cool-down |
| Attempt dedupe | `attemptId` | A retry of the same attempt never creates a second canonical attempt record | Retry identity |
| Provider retry dedupe | Provider-side idempotency key derived from `attemptId` | Duplicate provider calls cannot produce duplicate notifications where the provider supports idempotency | Provider capability |
| Acknowledgement idempotency | `alertId` + user | Repeated acknowledgements are idempotent; the first `userAcknowledgementTime` is retained | — |

Deduplication never suppresses a persistent condition indefinitely: a condition that remains true must remain
visible as an open incident even when new alerts are rate-limited. Deduplication is disclosed to the user as
"grouped" rather than "lost".

---

## 7. Retry and backoff

### 7.1 Rules

1. Retries are per attempt and per channel; each retry has its own `attemptId` and its own handoff,
   acceptance and delivery timestamps.
2. Backoff is exponential with jitter, bounded by the alert's overall time-to-live and by the channel policy.
3. A retry is never performed after the alert has been acknowledged or expired.
4. A retry never changes the canonical alert state backwards; it re-enters `QUEUED` only under the documented
   transitions (T-15, T-19) or under an audited resend (T-21).
5. Retry never fabricates evidence: a retry that is accepted but not delivered remains `DELIVERY_UNKNOWN`.
6. All retry parameters below are **PROPOSED**, not approved, not measured, not promised.

### 7.2 Proposed attempt policy (values `OPEN`)

| Parameter | Proposed shape | Status |
| --- | --- | --- |
| Channel order | Push → email → SMS where available, configurable per rule and per user | `PROPOSED`; availability `OPEN` |
| Backoff | Exponential, jittered, with a per-channel cap | `PROPOSED`; numeric schedule `OPEN` |
| Maximum attempts per channel per alert | Small bounded number | `PROPOSED`; value `OPEN` |
| Alert time-to-live | Bounded by severity class and condition type | `PROPOSED`; value `OPEN` |
| Evidence window | Short bounded window after acceptance | `PROPOSED`; value `OPEN` |
| Escalation window | Defined unacknowledged window per severity | `PROPOSED`; value `OPEN` |
| Resend | Only audited and explicit | `PROPOSED` |

### 7.3 Retry outcome mapping

| Outcome | State result |
| --- | --- |
| Provider accepts and evidence arrives | `DELIVERED_WHEN_CONFIRMED` |
| Provider accepts, no evidence within window | `DELIVERY_UNKNOWN` |
| Every channel rejects or is unavailable before acceptance | `FAILED` |
| Retries exhausted after a delivery, unacknowledged | Escalate or `EXPIRED` per policy |
| Alert superseded/too old | `EXPIRED` with the reason recorded |

---

## 8. Ordering and sequencing

1. Each device stamps a monotonic `sequence`; the service preserves per-device order for replayed batches and
   rejects a replayed sequence that was already applied.
2. Per vessel and per rule, alerts are ordered by `alertCreationTime`, then by the service's monotonic
   sequence.
3. Out-of-order arrival is recorded and ordered by event time where the semantics require it (for example
   geofence enter/exit), without rewriting timestamps. A late "exit" arriving after a later "enter" is handled
   by the incident state machine and not by silently reordering the historical record.
4. Superseding works per condition epoch: a new condition epoch for the same rule starts a new incident; the
   previous alert remains in its terminal or acknowledged state and is linked from the new incident.
5. Multi-channel bursts are ordered at the service queue: one canonical attempt at a time per recipient until
   acceptance, delivery or failure is known, unless the policy explicitly parallelises channels, in which case
   each attempt keeps its own ordering and evidence.

---

## 9. Offline buffering and store-and-forward

### 9.1 Device side

| Property | Intended behaviour | Status |
| --- | --- | --- |
| Write-ahead buffer | Observations and local events are written locally before transmission, with `eventTime`, `deviceClockTime` and `sequence` | `OPEN` — design requirement |
| Durability | Buffer survives a power cycle where the final design includes non-volatile storage; the tested durability scope must be published | `OPEN` |
| Capacity | Bounded; the published capacity and the drop policy are defined before sale | `OPEN` |
| Priority | Alert-relevant events and state transitions are retained in preference to routine samples | `OPEN` |
| Overflow | For routine samples, oldest-first drop with a recorded gap; for alert-relevant events, the product must state what is dropped rather than pretend nothing happened | `OPEN` |
| Local alarms | Local alarm behaviour runs on the device independently of the uplink; it is never disabled by an empty buffer or a failed upload | `OPEN` — design requirement |
| Replay | On reconnection, buffered records are forwarded in order with original timestamps and a batch identifier | `OPEN` |

### 9.2 Service side

1. Replay is deduplicated by `eventId` + `sequence` (§6).
2. Each connectivity gap is recorded as a `gapId` with detection time, restoration time and the count of
   buffered records replayed.
3. Replayed alerts carry the age of their `eventTime`; if the age exceeds the actionable window the event ends
   in `EXPIRED` (T-03) and the user is told that a condition was recorded but can no longer be acted on in
   real time.
4. The user is always told what was missed, when, and for how long — never given an "everything is fine" view
   during or after a gap.
5. The service never fills a gap by interpolation; it shows a gap.

---

## 10. Stale sensor state and last-known-good

### 10.1 Value state model (software layer; not a notification state)

| Value state | Meaning | Rule evaluation | Display |
| --- | --- | --- | --- |
| `LIVE` | Within the published freshness window | Allowed | Value with source and age |
| `DELAYED` | Older than expected but within tolerance | Allowed but flagged in the evaluation record | Value with age and delayed marker |
| `STALE` | Beyond the freshness window | The rule is **not evaluated on it as if current**; the evaluation records "stale input" and the rule outcome states it | Last value with explicit stale marker and age |
| `UNKNOWN` | No usable value ever received or the sensor is absent | Not evaluated; no alert may be created from it | "Unknown", never a number |
| `INVALID` | Present but implausible, out of range or failed validation | Not evaluated; no alert may be created from it | Invalid state with reason category |

This vocabulary is internal to the value model; it is not the canonical alert state enum and does not replace
it. Freshness thresholds per input are `OPEN` and must be published before sale.

### 10.2 Last-known-good

Every monitored value retains its last-known-good reading with its own `eventTime`, `serverReceiptTime` and
value-state. On any surface, a value beyond freshness is labelled last-known-good with its age. A last-known
value is never shown in a position where the user could read it as current, and no aggregate "all normal"
summary is produced from stale values.

### 10.3 Rules involving staleness

A sensor becoming stale may itself be a monitored condition where the owner enables a "sensor not reporting"
rule. Such a rule is evaluated on the absence of data, not on a fabricated value, and its alerts follow the same
canonical lifecycle. No alert may claim that the vessel condition is safe because a sensor is silent.

---

## 11. Alert-fatigue and rate-control policy

| Control | Intended behaviour | Status |
| --- | --- | --- |
| Severity classes | A small defined set (for example informational, advisory, urgent) with distinct routing and escalation policy | `PROPOSED`; names and values `OPEN` |
| Debounce | A condition must persist for a configured window before an alert is created | `PROPOSED`; values `OPEN` |
| Hysteresis | Separate trigger and clear thresholds prevent oscillation | `PROPOSED`; values `OPEN` |
| Cooldown | A per-rule minimum interval between alerts for the same condition epoch | `PROPOSED`; values `OPEN` |
| Quiet hours | Owner-configured non-urgent suppression windows; urgent severity may bypass only if the owner explicitly configures it | `PROPOSED`; defaults `OPEN` |
| Digests | Informational conditions may be summarised instead of individually delivered | `PROPOSED` |
| Grouping | Alerts for the same incident are grouped in the UI and in the notification copy | `PROPOSED` |
| Persistent condition | Rate limiting never hides a still-true condition; the open incident remains visible and the user is told it is rate-limited | Required rule |
| Duplicate channel suppression | Once an alert is acknowledged, remaining attempts for lower-severity channels are cancelled unless policy requires confirmation | Required rule |
| Noise reporting | A periodic report shows alert counts, duplicate rate and top rules by volume | `PROPOSED` |

Alert fatigue controls never suppress an alert in a way that spec, copy or contract claims is impossible; the
product must state that some conditions are grouped or rate-limited.

---

## 12. Escalation

1. Escalation applies to an unacknowledged alert. It is a series of notification attempts under the owner's
   escalation policy, each with its own attempt, handoff, acceptance, delivery and (where it arrives) evidence
   timestamps.
2. The escalation policy names an ordered contact list, per-contact channels, the unacknowledged window per
   step, the maximum number of steps and the final behaviour when the policy is exhausted.
3. Escalation stops immediately on acknowledgement, on expiry, or when the policy is exhausted. The outcome is
   recorded as "escalated, unacknowledged" and remains visible.
4. Escalation never contacts emergency services, never makes a distress call in the product's name and never
   claims that a person has been reached without evidence.
5. Users can see the escalation policy, who is in it, and whether they are themselves in it; a user may opt out
   of being a contact.
6. Time-limited technician/installer access exists in both editions for commissioning and support and is
   audited. Professional/organisation sharing (Plus) may add a marina service or professional-fleet contact as
   an escalation contact only with the owner's explicit configuration and the role's permission; a professional
   role must not turn WATCH into a fleet platform.
7. Proposed windows, step counts and channel order are `PROPOSED`; every numeric value is `OPEN` and must be
   published before sale.

---

## 13. Recovery after outage

| Recovery stage | Intended behaviour |
| --- | --- |
| Detection | The service detects no contact after the published threshold and marks the device unreachable; it never guesses the cause |
| Notification of the gap | Authorised users see the gap start, the last contact, the age of the last-known-good values and the missing data class |
| Replay | Buffered records are forwarded in order, deduplicated and stored; the gap record is closed with the replay counts |
| Missed alerts | Conditions recorded during the gap are evaluated; if actionable, alerts are created with their original event age and a "recorded while offline" marker; if no longer actionable, they expire with a visible record |
| Resynchronisation | Device configuration, rules, recipients and entitlement state are reconciled; conflicting changes are resolved by the documented last-writer policy, never silently |
| User notice | The user is told what was missed, how long the gap was, and what is still unknown |
| Measurement | The recovery event is measured as part of §16 (buffered replay success, gap duration, time to resync) |

No recovery step may fabricate the state of a value or of a notification. The absence of data is never
represented as normal operation.

---

## 14. Notification-channel failure policy

| Channel condition | Service behaviour | User-visible result | State outcome |
| --- | --- | --- | --- |
| Push token invalid/unregistered | Mark the channel failed for that recipient; fall through to the next channel in policy | Channel health warning; "could not reach this device" | `FAILED` for that attempt; next attempt as policy |
| Push provider unavailable | Retry with backoff within the alert TTL; escalate to the next channel after the threshold | Provider-degraded state; delay visible in the alert timeline | Acceptance not set until a provider accepts; then evidence rules apply |
| Email bounce | Disable the address after the documented bounce threshold; notify the account owner through another channel | Email channel marked failed | `FAILED` for that attempt |
| SMS not delivered / no receipt | Retry within policy; if accepted but no receipt, delivery unknown | SMS attempt shown as unknown, not delivered | `DELIVERY_UNKNOWN` |
| Provider accepts but never confirms | Wait the evidence window, then mark unknown; escalate if policy requires | "Accepted by provider, delivery not confirmed" | `DELIVERY_UNKNOWN` |
| All channels fail | Stop after policy exhaustion; record the failure and the contacts attempted | "We could not deliver this alert to the configured contacts" | `FAILED`, then `EXPIRED` per retention |
| Channel silently disabled by an administrator | Prohibited as a hidden action; any channel disablement is audited and notified to affected owners | Visible service status | Audit entry |
| User disables all channels | Allowed only with an explicit warning that remote alerts will not reach them; the product records the choice | Warning at configuration and in the alert view | No delivery claim |

The product never claims a notification reached a person when the channel evidence is absent. Channel status is
part of the owner's dashboard and of the diagnostic export.

---

## 15. Alert taxonomy and severity (proposed)

The final taxonomy is `PROPOSED` and must be frozen before sale. It may include: battery low / battery
critical; bilge water detected / bilge level high; geofence exit / geofence enter; position lost; sensor not
reporting; device power lost; device unreachable; connectivity degraded; subscription/entitlement events; and
account/security events (new sign-in, role change, revocation). Each rule declares its severity class, routing,
debounce, hysteresis, quiet-hours eligibility, escalation policy and whether it is enabled by default. No
taxonomy item may be named or described as a distress, rescue, theft-prevention or security alarm.

---

## 16. Delivery measurement plan (PROPOSED — no achieved figures, no guarantee)

This plan defines how delivery would be measured. It contains **no measured value, no target presented as
achieved, and no delivery-time guarantee**. All thresholds are to be agreed at MC-13-WATCH after real
measurement. The plan exists because the product may not describe delivery as working before it is measured.

| Metric | Definition | Method | Status |
| --- | --- | --- | --- |
| Event-to-receipt latency | `serverReceiptTime` − `eventTime` for live events (live online only) | Per-event distribution from recorded timestamps, separated by connectivity class | `PROPOSED`; no data |
| Alert-creation latency | `alertCreationTime` − `serverReceiptTime` | Service metrics per rule and per device model | `PROPOSED` |
| Handoff-to-acceptance latency | `providerAcceptanceTime` − `notificationHandoffTime` | Per attempt and per provider | `PROPOSED` |
| Acceptance-to-delivery latency | `deliveryConfirmationTime` − `providerAcceptanceTime` | Per provider/channel where evidence exists | `PROPOSED` |
| Delivery-confirmation coverage | Share of attempts with verifiable delivery evidence vs acceptance-only vs unknown | Attempt ledger | `PROPOSED` |
| Acknowledgement rate | Share of delivered alerts acknowledged within the window | Alert ledger | `PROPOSED` |
| Time to acknowledgement | `userAcknowledgementTime` − `alertCreationTime` | Alert ledger | `PROPOSED` |
| Escalation rate | Share of alerts escalated / exhausted | Escalation ledger | `PROPOSED` |
| Duplicate-alert rate | Alerts suppressed by dedupe vs alerts created | Dedupe ledger | `PROPOSED` |
| Buffered-replay success | Share of buffered records replayed and stored after an outage | Controlled outage tests | `PROPOSED` |
| Gap duration | Distribution of connectivity-gap durations detected | Gap records | `PROPOSED` |
| Channel-failure rate | Failures per channel per 100 attempts, split by failure class | Attempt ledger | `PROPOSED` |
| False-alert rate | Alerts acknowledged as "no action needed" divided by alerts delivered | User feedback + audit | `PROPOSED` |
| Recovery resync time | Time from connectivity restoration to state resynchronisation | Recovery tests | `PROPOSED` |

**Comparison and reporting rules.** Every metric is reported per provider, channel, device model, firmware
version and connectivity class, with the sample size and the observation window stated. A result from one
provider, region or device model may not be extrapolated to another. The company must never publish a
delivery percentage, latency figure or reliability percentage before a real measurement exists, and never as a
guarantee afterwards. The measurement plan itself is not evidence; executing it is.

---

## 17. Privacy and data protection contract

This section is the intended privacy model. Legal conclusions are **not** asserted: the lawful-basis
assessment must be reviewed and confirmed by a qualified DPO/counsel before any processing begins in a
production service, and this contract does not replace the DPIA.

### 17.1 Data minimisation and the uplink allow-list

Only the following data classes may leave the vessel. Everything else stays local. The allow-list is binding
on the service contract; widening it requires a privacy review and a DPIA update.

| Data class | Content | Purpose | Minimisation rule |
| --- | --- | --- | --- |
| Vessel position | GNSS position and fix quality, at the minimum rate needed for geofence and last-known-good | Remote monitoring and geofence | No continuous high-frequency track unless the customer configures a justified mode; sampling rate published |
| Monitored input values and states | Battery, bilge and other supported inputs, with unit, value state and timestamp | Remote monitoring and rules | Only inputs the owner configures; no unrelated telemetry |
| Device health | Firmware version, battery/backup state, connectivity quality, last contact, error categories | Service operation and diagnostics | No file contents, no browsing data, no audio/video |
| Alert lifecycle data | Rule, severity, condition, delivery evidence references, acknowledgements, escalation steps | Alerting and accountability | Only the minimum content needed for the notification |
| Account and access data | Account identity, role, invitation/revocation, audit entries | Access control and accountability | No marketing profile derived from vessel data |
| Support data | Diagnostic export prepared by the owner | Support | Explicit consent per case; not collected silently |

Prohibited uplink: AIS-derived traffic, crew or guest personal data beyond account identity, audio, video,
images, browsing or device analytics unrelated to monitoring, and any data used to build a commercial profile
of the vessel's movements. No commercial analytics may read identifiable vessel operational data
(`MAREA-COMMERCIAL-ARCHITECTURE.md` §5.2 X-7).

### 17.2 Roles and lawful-basis assessment (to be confirmed by the DPO)

| Role | Intended holder | Note |
| --- | --- | --- |
| Controller | EMBARCARTE (legal identity absent, X-02) | Cannot be finalised until the seller's legal identity exists |
| Processor(s) | Hosting provider, connectivity provider, push/email/SMS providers, support tooling | Each requires a data-processing agreement before use; none exists |
| Joint controllership | None intended | Any sharing with a marina or professional fleet is configured by the owner as a user role, not a joint-controller arrangement by default |
| Data subjects | Account owner, invited users, and any identifiable person whose data appears in support records | Crew and guests are not profiled |

**Lawful-basis assessment — draft, pending DPO confirmation, not asserted as concluded:**

| Processing purpose | Candidate basis | Status |
| --- | --- | --- |
| Delivering the monitoring service the customer bought | Performance of a contract | Candidate; DPO to confirm |
| Security, abuse prevention, device revocation, audit | Legitimate interests, with a documented balancing test | Candidate; DPO to confirm |
| Optional non-essential communications (for example product news) | Consent, separate from the service | `OPEN`; no marketing is designed |
| Legal, tax and accounting records | Legal obligation | Candidate; DPO to confirm |
| Optional professional sharing by owner invitation | Contract with the owner plus role-based access; recipient consent where required | Candidate; DPO to confirm |

The draft must not be read as a legal conclusion. Where special-category data could be inferred (for example
health or religious information from a person's presence on a vessel), the design avoids collecting it and the
DPIA must assess the residual risk. No automated decision-making with legal or significant effect is intended;
rule evaluation is deterministic and owner-configured.

### 17.3 Consent and permissions

- Consent is required for any optional processing that is not necessary to deliver the service, and for any
  optional public sharing feature if one is ever approved. Service delivery is not presented as consent.
- Consent records store the text version, purpose, timestamp, channel and withdrawal; withdrawal is as easy as
  granting.
- Operating-system notification permission is requested with a plain-language explanation of what the user
  will and will not receive; denial does not disable local functions.
- Invited users confirm their own participation; an owner cannot silently grant access to a person who has not
  accepted the invitation where the law requires their consent.
- The privacy notice must be written in Spanish and English, plain language, before any processing starts.

### 17.4 Roles and permission matrix (intended; least privilege)

`✓` = permitted by default; `—` = not permitted; `△` = owner-configurable, narrower by default; `C` = Core
edition; `P` = Plus edition only.

| Capability | Owner | Family/crew (C) | Technician (C and P, time-limited) | Marina service (P) | Professional fleet (P) |
| --- | --- | --- | --- | --- | --- |
| View live position and monitored values | ✓ | ✓ | ✓ | ✓ | ✓ |
| View history | ✓ | △ | △ | △ | ✓ |
| View open alerts | ✓ | ✓ | ✓ | ✓ | ✓ |
| Acknowledge alerts | ✓ | ✓ | ✓ | ✓ | ✓ |
| Create/edit rules and geofence | ✓ | — | △ | — | — |
| Manage notification channels and escalation | ✓ | — | — | — | — |
| Invite and revoke users | ✓ | — | — | — | — |
| Manage billing and subscription | ✓ | — | — | — | — |
| Manage device identity, replacement, revocation | ✓ | — | — | — | — |
| Export owner data | ✓ | — | — | — | — |
| View audit records | ✓ | — | — | — | — |
| Support access (time-boxed, consented, audited) | ✓ | — | — | — | — |
| Any steering, helm or command capability | — | — | — | — | — |

The matrix is the intended default. It must be implemented as server-side authorisation, not as UI hiding;
role changes are audited; an invited user never gains more than the role grants; the owner cannot grant a
capability that does not exist. Professional roles must have an expiry or a review date.

### 17.5 Sharing, invitation and revocation

1. Sharing is per vessel and per role, created by the owner, never by default.
2. Invitations are time-limited, single-use, addressed to a named person, and audited. An unaccepted invitation
   grants nothing.
3. Revocation is immediate: sessions and tokens for that user on that vessel are invalidated, the change is
   audited, and the revoked user can no longer read position, history or alerts.
4. Removing a user does not delete the alerts they acknowledged; the acknowledgement record remains as part of
   the vessel's safety history.
5. The owner can see at any time who can see the vessel, with role, invitation date and last access.
6. Public sharing links are not part of the default product. If a future approved feature allows a link, it
   must be explicit, time-boxed, revocable, scoped to limited data, and must never expose full history or
   real-time position by default; the privacy notice and DPIA must be updated first.
7. Position data is never published, indexed, listed or shared with a marina, harbour authority, insurer or
   third party without a specific contractual purpose and a lawful basis; no "community" or "social" position
   sharing exists in this product.

### 17.6 Ownership verification

Ownership of a device is verified through the purchase record and the provisioning binding: the order or the
installer record identifies the device serial, and the account that first completes provisioning must present
the verification method defined by the service (for example an order reference plus a device challenge). An
unrelated account cannot claim an already-bound device. Ownership transfer requires both sides: the current
owner initiates the release and the new owner completes the binding; the service records both acts and revokes
the previous owner's access. Ownership proof for support actions (unbinding, replacement, revocation) follows
the same evidence standard and is audited.

### 17.7 Encryption, secure update and credential rotation

| Control | Intended approach | Status |
| --- | --- | --- |
| Transport | Outbound-only TLS from device to service; no inbound connection to the device; certificate validation | `OPEN` — design requirement |
| At rest | Encryption per data class in the service database and object storage; encrypted backups; keys in a managed key service | `OPEN` |
| Device credentials | Unique per device, stored in secure storage on the device, never shared, never printed in a manual; scoped to the device's own data | `OPEN` |
| Credential rotation | Device credentials rotate on a schedule and on any suspected compromise; user sessions rotate on password/role change; provider API keys rotate on schedule and on staff change | `OPEN` — schedule values `OPEN` |
| Secure update | Signed firmware/software artefacts, verified signature, staged rollout, rollback to a known-good version, anti-rollback protection, SBOM, vulnerability disclosure and incident reporting (CRA) | `BLOCKED` — H-13 |
| Device revocation | Lost/stolen flow revokes the device's credentials and upload capability, blocks rebinding, records the incident and informs the owner; the device cannot be silently re-registered | `OPEN` — design requirement |
| Provider credentials | Per-provider least-privilege credentials; no shared master key in client code; rotation and revocation on compromise | `OPEN` |

### 17.8 Access logs and audit records

| Audit event | Minimum fields | Who can read it |
| --- | --- | --- |
| View of position/history/monitored values | Actor, role, vessel, data class, time, purpose context | Owner and support with consent; retained per schedule |
| Role change, invitation, revocation | Actor, target, role, time, result | Owner; internal audit |
| Rule and geofence change | Actor, before/after summary, time | Owner |
| Notification lifecycle transitions | Alert, attempt, state, timestamp, emitter | Owner; service operations |
| Subscription and entitlement change | Actor/system, change, time | Owner; finance |
| Ownership transfer, device replacement, revocation | Actor, device, time, evidence reference | Owner; support |
| Support access | Support agent, consent reference, scope, duration | Owner can see support access to their data |
| Export and deletion request | Actor, scope, time, completion | Owner; DPO |

Audit records are append-only in intent and protected against modification by the actor they describe. Audit
retention is `OPEN` and must be set with the DPO, balancing accountability against minimisation.

### 17.9 Retention schedule (values OPEN)

| Data class | Intended retention shape | Status |
| --- | --- | --- |
| Live position and monitored samples | Short rolling window for live display, then downsampled or deleted | `OPEN` — values to be set with the DPO |
| History per edition | The published Core/Plus history window | `OPEN`; windows not decided |
| Alert lifecycle and delivery evidence | Long enough to demonstrate accountability to the owner and to handle a dispute | `OPEN` |
| Acknowledgement and escalation records | Long enough for accountability | `OPEN` |
| Access and audit logs | Bounded, security-relevant | `OPEN` |
| Support diagnostics | Per support case with a defined expiry | `OPEN` |
| Billing and tax records | Statutory period once a sale exists | `OPEN`; depends on X-02 |
| Backups | Bounded, encrypted, restored on a tested schedule | `OPEN` |
| Account data | Until deletion, with a defined post-cancellation period | `OPEN` |

No value may be invented here. Retention must be published before sale and must be consistent with the DPIA,
the privacy notice and the edition entitlements.

### 17.10 Export, deletion, cancellation and account deletion

| Right / action | Intended behaviour |
| --- | --- |
| Export | The owner can export their own monitored values, history, alert lifecycle records, acknowledgements and audit records in a documented, machine-readable format; export is offered before cancellation and before deletion; licensed third-party data, if any, is excluded |
| Deletion of data | A verified request deletes the specified data classes within the published period, propagates to processors and backups per the documented backup-expiry cycle, and returns a confirmation |
| Cancellation | Cancellation stops renewal, states the effective date, what stops remotely and what continues locally, and offers export before remote data limits apply |
| Account deletion | A distinct verified flow deletes the account and its data, first offering export; it requires the owner's verification and handles shared vessels and invited users explicitly; the device is deprovisioned or transferred |
| Exceptions | Legal hold, fraud/abuse investigation and security incident records are the only intended exceptions, each recorded and bounded |
| Subscription vs deletion | Cancelling a subscription is not a data-deletion request; deleting an account is not the same as cancelling; each requires its own explicit action and is separately documented |

### 17.11 Breach and incident handling outline (not a full procedure)

1. **Detect and classify.** Security monitoring covers device credential misuse, account takeover, unauthorised
   access to position data, provider compromise, service intrusion and data loss. Incidents are classified by
   risk to data subjects, with a documented severity scale.
2. **Contain.** Revoke the affected device credentials, sessions and provider keys; isolate the affected
   service; preserve evidence; do not destroy logs needed for investigation.
3. **Assess.** The DPO/counsel determine whether the incident is a personal-data breach, its likely risk and
   the notification duty. Nothing in this contract asserts a notification conclusion in the abstract.
4. **Notify.** Where required, notify the supervisory authority within the legally applicable deadline and
   affected data subjects without undue delay, in the language they understand; publish a clear incident note.
   Any contractual notice duties with providers or customers are handled in parallel.
5. **Remediate and learn.** Fix, rotate, retest, update the DPIA and the risk register, and record a
   post-incident review; the product's own incident response for CRA obligations is part of the same process
   (H-13).
6. **Contact.** A dedicated security contact and disclosure policy must be published before sale; none exists.

### 17.12 DPIA outline (to be completed before any pilot processing)

| DPIA element | Content required | Status |
| --- | --- | --- |
| Necessity and proportionality | Why position and vessel condition data are needed, why less data would not deliver the service, and why each data class is proportionate | `OPEN` — to be written with the DPO |
| Systematic description | Data classes, purposes, recipients, transfers, retention, access model, device and service architecture | `OPEN` |
| Roles | Controller/processors/DPAs, including connectivity and notification providers once contracted | `OPEN` |
| Risk to data subjects | Unauthorised exposure of vessel position; coercive or stalking access; account takeover; device theft; provider breach; over-retention; function creep; inference of presence patterns; professional-sharing misuse | `OPEN` — must be assessed per risk with likelihood and severity |
| Mitigations | Minimisation, default non-public position, role least privilege, immediate revocation, encryption, audit, time-boxed support access, retention limits, device revocation | `OPEN` — design intent, not evidenced |
| Residual risk and sign-off | DPO opinion and go/no-go, including whether consultation with a supervisory authority is required | `OPEN` — not performed |

The DPIA is triggered by the systematic monitoring of a vessel's position and by the professional-sharing
roles; it must be completed and signed off before any pilot processes real customer data. This outline is not
a DPIA.

### 17.13 Standing privacy rules

1. **No public exposure of vessel position by default.** Position is visible only to authorised users of that
   vessel; there is no public map, no directory and no indexable page.
2. **No remote helm or steering command of any kind** exists in the service, and none may be added without a
   new safety case, a new authority decision and a policy revision. The commerce and account layers have no
   path to control.
3. **No sale or commercial exploitation of identifiable vessel operational data.** Analytics use aggregate,
   non-identifying data only, or do not happen.
4. **No silent collection.** Support and diagnostics are exported by the owner or consented to per case.
5. **No dark patterns** in consent, renewal, cancellation or deletion.
6. **Data subject rights** — access, rectification, erasure, restriction, portability and objection — are
   handled through the account and support, with identity verification and a published response process.

---

## 18. Open items register

| Item | Owner function | Gate |
| --- | --- | --- |
| Numeric retry/backoff, evidence window, escalation windows, alert TTL | Engineering with product | MC-13-WATCH measurement |
| Freshness thresholds per supported input | Engineering with product | Input compatibility record |
| Buffer capacity, durability scope and overflow policy | Hardware and firmware engineering | H-11 prototype |
| Recovery and resync policy details | Engineering | MC-13-WATCH |
| Final alert taxonomy, severity names and defaults | Product with UX | Before sale |
| Provider set (push/email/SMS), delivery-evidence capability and contracts | Procurement with legal | H-12; provider agreement |
| Connectivity contract, data allowance, roaming, exhaustion order | Procurement with product | H-12 |
| Retention values per data class; audit retention | DPO with product | DPIA sign-off |
| Lawful-basis assessment and privacy notice | DPO/counsel | Before pilot processing |
| DPIA completion and residual-risk sign-off | DPO | Before pilot processing |
| Roles: technician, marina-service and professional-fleet permissions finalisation | Product with security | Role-permission tests; marina-service/fleet in Plus only, technician in both editions |
| Public sharing feature (if ever) | Product with DPO and safety | Not in current scope; requires policy revision |
| Breach/incident procedure and security contact | Security with counsel | Before sale |
| Subscription terms, grace period, cancellation and refund mechanics | Commercial with legal | X-02, X-05 |
| Customer export format | Engineering with product | Before sale |
| Seller legal identity and terms of service | Company owner/counsel | X-02 |

---

## 19. Non-assertions and document status

This contract does **not** assert and must not be read as asserting: that any state, transition, retry,
dedupe, buffer, escalation, channel or recovery behaviour exists or works; any delivery or latency measurement,
percentage or guarantee; any provider agreement, connectivity agreement, telecom agreement, SIM/roaming terms
or coverage; any device identity, provisioning, transfer or revocation system; any subscription, billing or
entitlement service; any security certification, penetration test, audit opinion or CRA conformity; any DPO
approval, lawful-basis conclusion, DPIA completion or breach-notification conclusion; any certification,
distress capability or theft-prevention guarantee; any remote helm or steering capability; any trademark
clearance; any approved price.

Status: `INTERNAL`, `TARGET_CONTRACT`, `NOT_IMPLEMENTED`, `NOT_FOR_SALE`, `NOT_PUBLISHED`. It binds the later
WATCH engineering, security, privacy and verification milestones. It does not create a service, a contract
with any provider, a legal opinion or evidence that MAREA WATCH works.
