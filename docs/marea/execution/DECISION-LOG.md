# MAREA — Program decision log

Status: ACTIVE. Owner: Lead (Technical Program Director).
Program: EMBARCARTE / MAREA, 36 Master Prompts.
Purpose: record irreversible or schedule-changing decisions with their evidence, so
later milestones can audit why the plan changed. Entries are append-only: a
reversed decision is recorded as a new entry, never edited away.

Rules:

- A decision that changes the 36-prompt order must also be reflected in
  `MASTER-PROMPT-REGISTRY.md` and in the delivery report of the milestone that
  caused it.
- A decision never upgrades a commercial status by itself: legal clearances,
  certifications, physical tests, supplier quotes and sea trials still require
  their own evidence class.
- Only the Lead records program-level decisions here; specialist findings live in
  their own audit documents.

## D-001 — 2026-10-30 — MC-02 is executed as technology/IP/licensing/commercial-reuse audit

**Context.** The registry created at MC-01 placed brand architecture and legal
clearance at prompt 02 and the OPEN-MARINE licence/data-rights inventory at prompt
10. The client issued Master Prompt 02/36 as the complete technology,
intellectual-property, software-licensing and commercial-reuse audit, expressly
because that audit is a critical dependency for the nine MAREA product
definitions and for every later commercial decision.

**Decision.** Execute prompt 02 as the technology/IP/licensing audit defined by
Master Prompt 02/36, and reconcile the registry without changing the 36-prompt
total:

| Position | Before MC-02 | After MC-02 |
|---|---|---|
| 02 | Brand architecture and legal clearance policy | MC-02 technology, IP, licensing and commercial-reuse audit (scope formerly at 10) |
| 03 | MAREA identity system | Brand architecture and legal clearance policy (displaced from 02) |
| 04 | Product definitions batch 1 (NAV, HUB, AIS) | MAREA identity system (displaced from 03) |
| 05 | Product definitions batch 2 (PILOT, SENSE, WATCH) | Product definitions batch 1 (NAV, HUB, AIS) |
| 06 | Product definitions batch 3 (DISPLAY, WEATHER, FLEET) | Product definitions batch 2 (PILOT, SENSE, WATCH) |
| 07 | Bundles, compatibility and lifecycle contract | Product definitions batch 3 (DISPLAY, WEATHER, FLEET) |
| 08 | Competitor and market evidence refresh | Bundles, compatibility and lifecycle contract |
| 09 | Customer discovery and positioning validation | Competitor and market evidence refresh |
| 10 | OPEN-MARINE licence/data-rights inventory | Customer discovery and positioning validation |
| 11–36 | unchanged | unchanged |

**Rationale.** (1) The licence/data-rights inventory formerly at prompt 10 is now
fully absorbed by prompt 02, so keeping a second licensing audit would duplicate
work and risk contradictory conclusions. (2) Brand architecture still requires the
identity system as its successor, so the displaced brand work moves to position 03
and the identity system to 04, preserving the original dependency chain. (3)
Product definitions keep their batch order and move down by one position each.
(4) Prompts 11–36 keep their objectives and numbers, so the 36-prompt total and
every later commercial deliverable (BOM, economics, financial model, compliance,
catalogue, commerce, assets, verification, launch) are preserved.

**Status effect.** Prompt 02 status is set in `MASTER-PROMPT-REGISTRY.md` from the
MC-02 audit evidence. MC-01 stays `PARTIAL` (image generation externally
BLOCKED). No later prompt is marked complete. The pending milestone is recorded
in `MC-02-DELIVERY.md`; the image-generation blocker stays open.

**Evidence.** `docs/marea/compliance/MC-02-DELIVERY.md`,
`docs/marea/execution/MASTER-PROMPT-REGISTRY.md`,
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`.

## D-002 — 2026-10-30 — No licence added to OPEN-MARINE; no OPEN-MARINE code copied into EMBARCARTE

**Context.** OPEN-MARINE is a public GitHub repository with no licence file and a
mixed authorship history (`manuelxose`, `mgonzalezv <mgonzalezv@eservicios.indra.es>`,
`Claude <noreply@anthropic.com>`). The MC-02 mandate explicitly forbids changing a
repository licence or copying implementation code as part of the audit.

**Decision.** In MC-02: (1) no LICENSE/COPYING/NOTICE file is added to
OPEN-MARINE or EMBARCARTE; (2) no OPEN-MARINE implementation code is copied,
vendored or imported into EMBARCARTE; (3) repository visibility is not changed;
(4) the ownership and licence decision is recorded as an open blocker requiring
human/legal action, with the required documentation listed in
`INTELLECTUAL-PROPERTY-CHAIN.md`.

**Rationale.** A public repository without a licence is not a grant of rights;
copyright remains with the authors and any employer/contract counterparty.
Granting a licence is an intellectual-property decision that needs adequate
ownership evidence and explicit authorization.

**Status effect.** OPEN-MARINE reuse remains conditional on a documented
ownership/licence decision. Engineering reuse candidates may be identified, but
not exercised.

**Evidence.** `docs/marea/compliance/INTELLECTUAL-PROPERTY-CHAIN.md`,
`docs/marea/compliance/LICENSE-NOTICE-AND-DISTRIBUTION-POLICY.md`,
`docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md`.
