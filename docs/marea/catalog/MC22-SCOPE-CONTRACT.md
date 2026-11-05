# MC-22 — Scope contract

Milestone MC-22/36 — extend the internal MAREA catalogue to batch 3 (DISPLAY, PILOT, FLEET) in the existing one-tree Angular architecture.

## 1. Registry row (verbatim)

From `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` (row 22), quoted verbatim:

```
| 22 | Product catalog batch 3: DISPLAY, PILOT, FLEET pages ES/EN (extra safety cautions) | 21, 02 | 3 bilingual product pages | PILOT supervision limits; FLEET B2B terms; no unsupported safety claims; PILOT not sold while gate BLOCKED | PLANNED | — |
```

## 2. Objective

Add three bilingual internal preview pages for MAREA **DISPLAY**, **PILOT** and **FLEET** under
`internal/catalog/*`, in the existing single component tree, with real safety/B2B/size cautions, a
hardened validator, full test + isolation evidence and an independent audit.

## 3. In-scope families

The catalogue is extended from six to **nine** canonical families, in canonical order:

`NAV, HUB, AIS, SENSE, WATCH, WEATHER, DISPLAY, PILOT, FLEET`

Batch 3 adds the three families **DISPLAY**, **PILOT** and **FLEET** (26 canonical editions in total;
DISPLAY 2, PILOT 3, FLEET 3 are the batch-3 additions). Preview routing grows from 12 to **18**
loopback Server routes (9 families × ES/EN), all under `internal/catalog/{slug}` and
`en/internal/catalog/{slug}`.

## 4. Non-goals (full list)

MC-22 does **not**:

- register any **public route** (all identities stay `PROPOSED_INTERNAL_NOT_DEPLOYABLE`);
- publish any **price**, amount, currency, stock or SKU (0 approved prices, 0 merchant SKUs);
- add any **order, checkout, quote or lead-capture** flow;
- add any **canonical/hreflang/sitemap/JSON-LD/indexation** signal for the catalogue;
- claim any **certification** (CE/EMC/RED/NMEA 2000), **compatibility**, **SLA** or **sea-trial** result;
- claim any **autonomy** or remote helm control for PILOT (remote helm control is PROHIBITED);
- **merge** to main, **deploy**, or publish anything;
- start **MC-23**.

## 5. Write-scope strategy

One writer per checkout (ENGINE-03 one-writer rule). The milestone ran as a single working tree on
`feature/marea-mc22-display-pilot-fleet-catalog`; parallel work was limited to read-only discovery
(t1, t2, t3), and every implementation/repair/verification/review step was sequential and disjoint.
No two agents wrote the same tree concurrently; the two auto-created duplicate repairs (t14, t19) were
cancelled by the captain for exactly this reason.

## 6. Deliverable verdict vocabulary

- `MC22_INTERNAL_IMPLEMENTATION = PASS_INTERNAL_SCOPE` — the internal catalogue implementation is verified.
- `MC22_VERDICT = PARTIAL` — the milestone-level verdict is PARTIAL because every external
  legal/commercial authorisation remains `BLOCKED`/`NOT_GRANTED` (the ten governance gates are all open).
