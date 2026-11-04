# MC-21 — Scope contract (WEATHER / SENSE / WATCH internal catalogue)

| Field | Value |
| --- | --- |
| Milestone | MC-21/36 — Product catalog batch 2: WEATHER, SENSE, WATCH pages ES/EN |
| Registry row | `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` row 21 (dependencies `20, 02`) |
| Status | `IN_PROGRESS_INTERNAL` — `MC21_INTERNAL_SCOPE = PASS_INTERNAL_SCOPE`; `MC21_VERDICT = PARTIAL` (external gates) |
| Branch | `feature/marea-mc21-weather-sense-watch-catalog` |
| Base | `115a1ac` — verified MC-20 delivery HEAD |
| Implementation | `f2609a8` (`feat(mc21): extend internal catalogue to WEATHER, SENSE and WATCH`) |
| Preview namespace | `internal/catalog/{weather,sense,watch}` and `en/internal/catalog/*` |
| Owner | MC-21 implementation team (architect / product / implementer / verifier) |

## 1. Authorized scope

MC-21 extends the existing MC-20 one-tree catalogue (decision D-083: extend in place, no fork)
to **six canonical families** in canonical MC-16 order — NAV, HUB, AIS, SENSE, WATCH, WEATHER
(decision D-084) — adding three bilingual ES/EN internal presentations for WEATHER, SENSE and
WATCH:

- one locale-aware component tree (not twelve pages);
- canonical identity, readiness (11 dimensions), editions and bundle relationships copied
  byte-for-byte from MC-16 (`docs/marea/commerce-data/data/*.json`) and MC-15
  (`docs/marea/information-architecture/data/proposed-routes.json`);
- a deterministic extended projection emitted by `scripts/build-mc20-catalog-data.mjs`
  (`--check` byte-stable): 6 family records, 18 edition records, 10 governance gates;
- 12 loopback-only, Server-rendered preview routes (6 families × 2 locales);
- fully bilingual ES/EN content with structural parity and evidence-class provenance;
- no commerce: no price, stock, SKU, order, cart, checkout, quote or lead capture.

## 2. Contract traceability

| Source | Contract applied |
| --- | --- |
| `MASTER-PROMPT-REGISTRY.md` row 21 | "Product catalog batch 2: WEATHER, SENSE, WATCH pages ES/EN"; dependencies 20, 02 |
| MC-21 verification criteria (row 21) | Data-source provenance shown; honest availability; licensed provider named only when contracted |
| `MC20-MC21-HANDOFF.md` | Inputs-only; MC-21 must not assume publication, price, lead or any certified claim |
| MC-16 canonical commerce contract | Single source of truth for identity, editions, readiness, bundles, gates |
| MC-17 design-system contract | Components + fail-closed commercial adapter reused, never forked |
| MC-18 landing isolation pattern | Loopback SSR preview, Host allowlist, noindex, no public metadata |
| MC-14 claims and release gates | 10 governance gates, 0 closed |

## 3. Canonical identity resolution

| Family | Entity type | Product type | Editions | Hardware status | MC-15 route |
| --- | --- | --- | --- | --- | --- |
| WEATHER | Product family | SOFTWARE | WEATHER-STANDARD (`DEFINED`), WEATHER-PRO (`CONDITIONAL`) | `NOT_APPLICABLE_SOFTWARE_PRODUCT` | `mareaFamilyWeather` |
| SENSE | Product family | HARDWARE | SENSE-WIND, SENSE-POWER, SENSE-BILGE, SENSE-TANKS, SENSE-ENV (modules) + SENSE-ESSENTIALS, SENSE-SAIL, SENSE-SYSTEMS (kits) | `NOT_SELECTED` | `mareaFamilySense` |
| WATCH | Product family | HARDWARE_SERVICE | WATCH-CORE (`DEFINED`), WATCH-PLUS (`CONDITIONAL`) | `NOT_SELECTED` | `mareaFamilyWatch` |

None is a bundle, SKU or merchantable entity. Full identity, readiness and bundle detail in
`MC21-CANONICAL-PRODUCT-MAPPING.md` and `MC21-TECHNICAL-FACTS-AND-LIMITATIONS.md`.

## 4. Non-goals (explicit)

- No public route, canonical, hreflang, sitemap entry, JSON-LD or social card.
- No price, price hypothesis rendered as an offer, stock, SKU, quote, order, cart, checkout,
  payment or lead capture.
- No certification, conformity, NMEA-2000 interoperability, sea-trial, safety or
  measurement-accuracy claim.
- No product photography, fabricated screenshot or hardware rendering.
- No change to the public application, the MC-17 design system or the MC-18 landing.
- No merge, deployment, publication, indexation or commercial activation.
- No MC-22, MC-23, MC-24 or later milestone work.

## 5. Preserved gates (verbatim)

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

`MC21_INTERNAL_SCOPE = PASS_INTERNAL_SCOPE` does not change any of them.

## 6. Naming debt (disclosed)

The shared six-family generator/validator keep the `mc20-*` filenames
(`scripts/build-mc20-catalog-data.mjs`, `scripts/check-mc20-catalog.mjs`,
`scripts/check-mc20-catalog.test.mjs`, `scripts/mc20-catalog-guards.mjs`) because MC-21 extends
in place (D-083). MC-21 script aliases were added (`build:mc21:data`, `check:mc21:data`,
`test:mc21`, `test:mc21:unit`, `test:mc21:e2e`). There is no parallel pipeline.

## 7. Edition-count correction

The original acceptance assumption of "12 editions" was wrong: canonical MC-16 carries 8 SENSE
editions (5 modules + 3 kits), so a faithful projection has **18** editions (NAV 2, HUB 2,
AIS 2, SENSE 8, WATCH 2, WEATHER 2). Recorded as decision D-085 and applied throughout.
