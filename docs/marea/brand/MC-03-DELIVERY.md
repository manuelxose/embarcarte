# MC-03 — Delivery report: corporate brand architecture, trademark clearance research, commercial positioning and brand governance

| Field | Value |
| --- | --- |
| Document ID | MC-03 / DELIVERY |
| Milestone | MC-03 (prompt 03 of 36) |
| Programme | EMBARCARTE / MAREA |
| Date | 2026-10-30 |
| Repository | `manuelxose/embarcarte` |
| Branch | `feature/marea-mc03-brand-governance` |
| Base commit (verified) | `9631c6f52b20b20e85506b097615ca5eb1107a94` = MC-02 branch HEAD (`feature/marea-mc02-technology-audit`), which is also the reported MC-02 HEAD |
| `main` at execution start | `092ae74c904cc9aa04766ff565bacd422394fa45` (MC-02 **not** merged; MC-01/MC-02 stacked draft PRs remain open) |
| Owner | Lead (Brand and Commercial Program Director) |
| Status | **PASS** for the MC-03 scope (see §1) |

## 1. Status and what PASS means here

MC-03 is **PASS for its own scope**: brand architecture, naming system, bilingual messaging, claims
policy, trademark availability *research*, website brand audit, machine-readable governance layer with
tests, decision package, and independent review — all committed on a reviewable branch.

MC-03 is **not** a legal clearance, not a commercial availability statement and not a visual identity.
The trademark outcome is a recorded **OPTION B** (material conflict indicated, specialist review
required) with `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`. Per the mandate, an honest conflict finding
does not fail the milestone; a fabricated or missing one would. MC-03 therefore passes with:

- public brand use: **NO-GO**;
- internal, non-public brand work (strategy, naming, governance, MC-04 concept/brief): **allowed**;
- trademark filing, packaging, domains, advertising, spend: **not authorised**.

## 2. Verified Git baseline

| Check | Result |
| --- | --- |
| Working directory | `C:\Users\Admin\Documents\workspace\embarcarte` |
| Pre-work HEAD | `9631c6f52b20b20e85506b097615ca5eb1107a94` on `feature/marea-mc02-technology-audit`, clean tree |
| Reported MC-02 HEAD | `9631c6f…` — **verified**: the commit exists and equals the checked-out HEAD |
| `main` | `092ae74…` — MC-02 **not** merged, so the mandate's "if MC-02 is still unmerged" branch rule applies |
| PR #7 | OPEN, **draft**, `feature/marea-mc01-agent-foundation` → `main` |
| PR #8 | OPEN, **draft**, `feature/marea-mc02-technology-audit` → `feature/marea-mc01-agent-foundation` |
| Deployment trigger | `deploy.yml` runs on any push to `main` → **no push to main, no merge, no deploy in MC-03** |
| CI | `.github/workflows/ci.yml` runs on `pull_request` (+ push to main). MC-03 adds two `run:` steps only; no deploy trigger is reachable from a pull request |

Dependency chain recorded: **MC-01 → MC-02 → MC-03**. MC-03's draft PR targets
`feature/marea-mc02-technology-audit` (stacked), not `main`.

## 3. Corporate brand architecture (recorded decision BD-01)

`docs/marea/brand/BRAND-ARCHITECTURE.md` establishes an **endorsed-brand architecture**:

- **EMBARCARTE** — commercial company, legal seller, installer/service provider, support owner and
  customer relationship. Corporate registration data still missing (X-02) and never invented.
- **MAREA** — *proposed* product brand for nine families: NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY,
  WEATHER, FLEET. Internal/proposed only; no registered symbols; no availability claims.
- **OPEN-MARINE** — existing open engineering foundation and an **internal engineering identifier**
  only. Explicitly excluded from the public hierarchy; its ownership/licensing remain uncleared
  (MC-02 DEC-01). No public identity is built on it.
- Six bundle identities preserved: MAREA START, CRUISE, SAIL, PROTECT, COMPLETE and the
  **MAREA FLEET package** (customer-facing form; the FLEET product family is `MAREA FLEET`).
- Attribution rules: allowed / conditional / forbidden statement tables in ES and EN, including the
  conditional status of "developed by EMBARCARTE" while the code ownership chain is open.
- Enforcement: allowed statements, forbidden statements and clearance state are machine-readable in
  `brand-identity.contract.json` and checked by `npm run test:brand`.

## 4. Trademark research verdict

| Field | Value |
| --- | --- |
| Documents | `TRADEMARK-CLEARANCE-RESEARCH.md` (18 sections), `TRADEMARK-SEARCH-RESULTS.csv` (header + 29 rows, 18 columns, RFC-4180 clean) |
| Formal research status | **MATERIAL CONFLICT INDICATED — SPECIALIST REVIEW REQUIRED** |
| Decision gate | **OPTION B** — material conflict requires specialist assessment |
| Legal clearance field | `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED` (unchanged, and explicitly "not legal clearance") |
| Evidence classes used | OFFICIAL_REGISTRY 6 · SECONDARY_AGGREGATOR 11 · SEARCH_ENGINE_SNIPPET 9 · UNAVAILABLE 3 |

**Verified material conflicts (read directly at the registry, independently re-verified by the Lead):**

1. **EUTM 018135609 `M MAREA`** — Nice class **9**, figurative, status Registered/Valid, filing
   2019-10-10, registration 2020-02-27, proprietor **BRANDS 2020, S.L.** (Barcelona). Goods include
   *"Mobile apps; Application software for mobile phones; Software and applications for mobile devices;
   Downloadable application software for smartphones and tablets; Smartwatches; Wearable communications
   devices in the form of wristwatches"*. **This is precisely MAREA NAV's category.** The Lead
   re-fetched the official EUIPO record and confirmed number, name, proprietor, class, dates and the
   goods list.
2. **EUTM 015190655 `M MAREA`** — classes **35 and 37** (retail and repair/installation), same
   proprietor, live and renewed (recordal 2026).
3. **EUTM 018395967 `M MAREA`** — classes 3 / 14 / 18 / 25 (not core, recorded for completeness).
4. **WIPO international registrations** IR 1632684 and IR 1847368 read by IRN via the WIPO system;
   designations exclude EU/ES/PT.
5. **Commercial signals (not registered rights):** Marea Marine (US, trades MAREA in marine
   electronics/parts), `marea.es` (consumer watches/smartwatch app, MAREA since 1995), a Mangusta yacht
   named *Marea*, a Marea Venezia tide app, and the Spanish corporate name MAREA NAUTIC SL (activity
   disputed between directories; **not** described as a nautical company).

**Searches that could not be executed (recorded, not hidden):** OEPM Localizador returned proxy
HTTP 404 on five routes → **the Spanish national register was never searched**; Portugal and France were
never searched; TMview served only an SPA shell plus a bot challenge; WIPO Brand DB returned
"Verifying…" (WIPO terms also prohibit automated querying of Madrid Monitor); EUIPO eSearch rendered no
server-side results. Only two by-number interfaces worked: the EUIPO `copla` record JSON and WIPO
`showData.jsp`. **No availability conclusion is drawn anywhere; absence of results is explicitly not
availability.**

**Classes investigated:** 9 (hardware, software, apps, sensors), 35 (retail/commercial services),
37 (installation/maintenance/repair), 42 (SaaS/engineering) with per-class justification and an explicit
statement of which classes are **not** claimed and why. Classes 12 and 38 were considered and **not**
claimed: 12 only if vessel products become the genuine offer; 38 only if the commercial offer actually
includes communications services — neither is the case today. Class 42 has no verified EU conflict in
reviewed records; class 9 has a verified one.

**Distinctiveness:** MAREA is an ordinary Spanish/Portuguese/Italian word ("tide"). In marine goods it is
suggestive-to-descriptive, which weakens scope of protection in the one direction while making the mark
memorable in the primary market; the research records both effects and the linguistic search ambiguity
rather than assuming "generic word = safe" or "generic word = unregistrable".

**Mitigation options for counsel (none decided by an agent):** distinctive composite mark with a narrowed
class-9 list; territory/class-partial progression; different product brand; or restricting MAREA to
hardware-only families. **No rename was executed or is proposed as a decision.**

## 5. Nice classes investigated (summary)

| Class | Applies? | Rationale recorded in the research |
| --- | --- | --- |
| 9 | **Yes — priority** | Navigation electronics, displays, AIS receivers, sensors, gateways, downloadable software, apps. Verified conflicting EUTM here. |
| 35 | Yes | Retail/e-commerce of own and compatible third-party equipment; commercial services. Live EUTM by the same proprietor. |
| 37 | Yes | Installation, commissioning, maintenance and repair services. Live EUTM by the same proprietor. |
| 42 | Yes | SaaS (FLEET/WEATHER), software development, engineering. No verified EU conflict in reviewed records. |
| 12 | Not now | Only if vessel/structural products become the genuine offer. |
| 38 | Not now | Only if the offer includes communications services. |

## 6. Recommended commercial positioning

`MAREA-BRAND-STRATEGY.md` (466 lines) + `COMPETITIVE-POSITIONING-EVIDENCE.md` (302 lines, 9 companies,
dated citations, evidence classes):

- **Positioning wedge:** refit-and-connect — "marine instrumentation for the boat you already own",
  unifying navigation, onboard data and monitoring in one ecosystem, adopted module by module, installed
  and supported by EMBARCARTE.
- **Differentiation that is defensible today:** module-by-module adoption, published compatibility matrix,
  published readiness/limits, installer relationship, one account/entitlement model. **Readiness
  disclosure is the honest differentiator no reviewed incumbent uses.**
- **Explicitly not claimed:** superiority over Garmin/Raymarine/B&G/Simrad on accuracy, safety or
  reliability; awards; market share; certifications; availability.
- **Segments:** 11 segments with distinct buying decisions, objections and trust requirements.
- **Ecosystem logic:** the nine families are one data model + one account + one support relationship,
  staged by readiness; PILOT is gated, WATCH/FLEET are build-stage.

## 7. Product naming system

`PRODUCT-NAMING-SYSTEM.md` (365 lines) defines 12 layers (master brand, family, edition, generation,
hardware size, accessories, bundles, subscription plans, versions, commercial vs engineering identifiers)
with canonical syntax `MAREA <FAMILY> [<Edition>] [<Size|Generation>]`, 10+ allowed patterns, 14
forbidden-pattern rows, a nine-family table with approved editions drawn from `COMMERCIAL-PORTFOLIO.md`,
the six bundles, and the **FLEET disambiguation rule**: `MAREA FLEET` = product family, `MAREA FLEET
package` = integrated B2B offering (mirrored in the contract as `customerFacingName`).
Rules prevent mixing edition names with hardware revisions, forbid certification words inside names,
and require new families to be registered in the contract and pass `npm run test:brand`.

## 8. Bilingual messaging decisions

`BRAND-VOICE-ES-EN.md` (245 lines) + canonical strings in the contract (`messages.es` / `messages.en`,
10 required keys): mission/positioning statements in both languages, company/short/extended brand
descriptions, primary and secondary headlines, trust line, B2B line, attribution line, 11 segment
messages, B2B voice, CTA ladder by readiness state, comparison/subscription terminology, slogan
candidates with a recommendation (internal `«Una sola marea» / "One tide."`, unsearched, not adopted),
and copywriting restrictions.
Register decisions: **tú** for consumer copy, **usted** for B2B/legal; names are never translated;
numbers/units/dates per locale; diacritics mandatory.

## 9. Brand claims governance

`COMMERCIAL-BRAND-CLAIMS-POLICY.md` (237 lines): A/C/P/X claim classes, a mandated scrutiny table with
rulings for every example in the mandate ("compatible with all marine electronics" → P; "certified
NMEA 2000" → P; "guaranteed collision avoidance" → P/X; "fully autonomous steering" → P/X; "most
accurate forecast" → P/X; "100% reliable monitoring" → P/X; "available for immediate delivery" → C), the
lifecycle-state → allowed-CTA matrix, pricing/subscription language rules, an empty claims register (by
design), approved ES/EN disclaimer wording, and enforcement.

## 10. Files created / changed

Created (new brand layer, 11 documents + 3 code files):

| File | Lines | Author role |
| --- | --- | --- |
| `docs/marea/brand/BRAND-ARCHITECTURE.md` | 232 | Lead |
| `docs/marea/brand/TRADEMARK-CLEARANCE-RESEARCH.md` | 640 | Agent A (IP researcher) |
| `docs/marea/brand/TRADEMARK-SEARCH-RESULTS.csv` | 30 rows | Agent A |
| `docs/marea/brand/MAREA-BRAND-STRATEGY.md` | 466 | Agent B (strategist) |
| `docs/marea/brand/PRODUCT-NAMING-SYSTEM.md` | 365 | Agent B |
| `docs/marea/brand/COMPETITIVE-POSITIONING-EVIDENCE.md` | 302 | Agent C (market researcher) |
| `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` | 2 013 | Agent D (creative director) |
| `docs/marea/brand/BRAND-VOICE-ES-EN.md` | 245 | Lead |
| `docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md` | 237 | Lead |
| `docs/marea/brand/WEBSITE-BRAND-MIGRATION.md` | 717 | Agent F (web brand auditor) |
| `docs/marea/brand/BRAND-AND-IP-DECISION-PACKAGE.md` | 279 | Lead |
| `docs/marea/brand/BRAND-GOVERNANCE-IMPLEMENTATION.md` | — | Agent E (governance engineer) |
| `docs/marea/brand/brand-identity.contract.json` | 288 | Agent E (Lead reconciled values) |
| `scripts/check-brand.mjs` | — | Agent E |
| `scripts/check-brand.test.mjs` | — | Agent E |
| `docs/marea/brand/MC-03-DELIVERY.md` | this file | Lead |
| `docs/marea/brand/MC-03-REVIEW.md` | see §12 | independent reviewer |

Modified (minimal, additive):

| File | Change |
| --- | --- |
| `package.json` | added `test:brand` and `test:brand:unit` scripts (no dependency change) |
| `.github/workflows/ci.yml` | added two `run:` steps after `test:backup` (no deploy trigger reachable) |
| `docs/marea/execution/MASTER-PROMPT-REGISTRY.md` | MC-03 status + evidence (§13) |
| `docs/marea/execution/DECISION-LOG.md` | appended D-003, D-004 (append-only, §13) |

**Not changed:** `src/`, `public/`, routes, dictionaries, `SITE`, commerce behaviour, OPEN-MARINE
repository, legal pages. Verified with `git status --short -- src public` (empty).

## 11. Brand governance implementation (functional evidence)

| Component | Path |
| --- | --- |
| Machine-readable identity contract | `docs/marea/brand/brand-identity.contract.json` |
| Deterministic validator (offline, dependency-free) | `scripts/check-brand.mjs` |
| Unit tests for the validator | `scripts/check-brand.test.mjs` |
| Implementation record (checks, scope, boundary) | `docs/marea/brand/BRAND-GOVERNANCE-IMPLEMENTATION.md` |

What the contract now encodes: company identity and permitted attribution; MAREA as proposed brand with
`trademarkLegalClearance: "NOT_GRANTED"`, `registeredSymbolsAllowed: false`; OPEN-MARINE as
`INTERNAL_ONLY`/`NOT_CLEARED` with forbidden public contexts; the nine families; six bundles including
the FLEET disambiguation and `customerFacingName`; naming layers and forbidden patterns; attribution
allowed/forbidden lists; prohibited claim patterns; 10 bilingual message keys; `governedPaths` (11 brand
docs) and `checkProfiles`; a `publicationCopies` extension point (empty — no published MAREA copy exists).

**Real command output (this branch):**

```
$ npm run test:brand
Summary: 21 checks run, 21 passed, 0 failed; 11 files scanned, 0 skipped.
RESULT: PASS

$ npm run test:brand:unit
tests 11 | pass 11 | fail 0
```

The unit tests prove genuine negative cases: 8 product families, clearance ≠ NOT_GRANTED, `MAREA®`,
`Marea Nav` casing, malformed attribution, clearance contradiction, a missing claims-policy pattern, and
a prohibited claim inside a listed publication copy — each rejected with a non-zero exit; and tolerance
cases (negations, marked examples, tables, code fences, out-of-scope files) pass. Scope proof: files
outside `governedPaths` are never scanned, so legacy EMBARCARTE pages and legitimate OPEN-MARINE technical
references do not fail the gate.

**Deliberately deferred integration:** no `src/` change. `SITE` still carries a single seller identity;
separating seller / product-brand / internal-technology fields would alter rendered output, so the
boundary and the future design are documented in `BRAND-GOVERNANCE-IMPLEMENTATION.md` and
`WEBSITE-BRAND-MIGRATION.md` instead of being implemented in this milestone.

## 12. Independent review

`docs/marea/brand/MC-03-REVIEW.md` — produced by a separate reviewer agent (never the author), against
the real diff, the registry evidence and re-run gates. Verdict and findings: see that document. Summary
of the verdict is repeated in §14 after review.

## 13. Registry, decision log and programme state

- `MASTER-PROMPT-REGISTRY.md`: prompt 03 status and evidence updated; prompts 04–36 untouched.
- `DECISION-LOG.md`: **D-003** (brand architecture and trademark gate: OPTION B, public brand NO-GO) and
  **D-004** (no public brand migration in MC-03; governance layer is documentation-scoped, no `src/`
  integration). MC-01 remains PARTIAL; MC-02 remains PASS for audit scope.
- Prior milestone history was not rewritten.

## 14. Existing application tests (this branch, real output)

| Gate | Command | Result |
| --- | --- | --- |
| Prettier | `npm run format:check` | PASS — "All matched files use Prettier code style!" |
| Build | `npm run build` | PASS — SSR/prerender build completed, output `dist/embarcarte` |
| i18n | `npm run test:i18n` | PASS — locale detection, route mapping, translations, SSR lang/alternates/isolation |
| Commerce | `npm run test:commerce` | PASS — bilingual catalogue, stock, cart integrity, accounts, authz, sitemap alternates, webhook verification |
| SEO | `npm run test:seo` | PASS — 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD, private noindex |
| Backup | `npm run test:backup` | PASS — consistent snapshot, checksums, integrity, FK, counts, corrupt-copy rejection |
| Brand | `npm run test:brand` | PASS — 21/21 checks, 11 files scanned |
| Brand unit | `npm run test:brand:unit` | PASS — 11/11 tests |
| Dependency audit | `npm audit --omit=dev --audit-level=high` | PASS — 0 vulnerabilities |
| Whitespace | `git diff --check` | PASS — no whitespace errors |
| E2E | `npm run test:e2e` | see note below |

E2E and `format:check` scope notes:
- `npm run test:e2e` result is recorded in §14.1 (environmental outcome preserved verbatim; the E2E suite
  is pre-existing and unchanged by MC-03 — no `src/` change exists to regress it).
- `format:check` uses an explicit file list that does **not** include `scripts/check-brand.mjs` (same
  convention as `check-i18n.mjs`/`check-commerce.mjs`); the new scripts were verified with
  `npx prettier --check` and pass. This is a documented scope gap, not a regression.

### 14.1 E2E outcome

`npm run test:e2e` was executed on this branch and **passed**: `15 passed (47.8s)` on Chromium. Because
MC-03 changes no application code, this run is a regression guard on the pre-existing suite rather than a
test of new brand behaviour.

## 15. Website brand audit (inventory, no change)

`WEBSITE-BRAND-MIGRATION.md` (717 lines): **209 verified references** with `file:line` and quote —
KEEP 68 · EVENTUALLY_MIGRATE_TO_MAREA 50 · TECHNICAL_INTERNAL_ONLY 8 · REQUIRES_LEGAL_APPROVAL 13 ·
REQUIRES_PRODUCT_VALIDATION 25 · REQUIRES_COPY_CORRECTION 28 · REQUIRES_SEO_MIGRATION 17 (sum 209).

Highest-risk public surfaces found (pre-existing, **not fixed in MC-03**, tracked for the catalog/copy
milestones):

1. **NMEA 2000 support asserted** on the technology pages (`src/app/features/technology/content/technology.es.ts:59,69`; EN `:60,70`) while MC-02 H-04 records NMEA 2000 as not implemented and NMEA
   licensing/certification not held → requires copy correction before any NMEA claim.
2. **"Alarmas de colisión"** (`technology.es.ts:17`, EN `:18`) — prohibited by the claims policy and
   contradicted by receive-only AIS (MC-02 D-09).
3. **PILOT safety/E-stop/heartbeat** claims (`technology.es.ts:76,79,84,92`, `about.content.ts:42`)
   while PILOT's safety gate is BLOCKED (H-01/H-10).
4. **`SITE.legal` is empty** (`src/app/core/site.config.ts:20-25`) with a public "pending" notice — X-02
   cannot be solved by an agent; must not be invented.
5. Additional observations from the visual brief: focus-ring colour `#8fd2f5` is 1.65:1 on white / 1.55:1
   on mist (below the 3:1 non-text minimum); `og-image.png` is 280,750 B against a ≤120 kB target.

SEO preservation requirements recorded (canonical/hreflang reciprocity, 98 static indexed URLs + dynamic
product URLs, legacy `/open-marine` 301, robots host, JSON-LD Organization/Brand). **No indexed URL was
changed or removed.**

## 16. Remaining brand / IP blockers (unchanged or newly evidenced)

| ID | Blocker | Status |
| --- | --- | --- |
| TM-01/TM-03 | MAREA trademark strategy and conflict handling (verified class-9 EUTM `M MAREA`) | **OPEN — counsel required** (OPTION B) |
| X-01 | Trademark clearance not granted | `NOT_GRANTED` |
| X-02 | Corporate legal data (`SITE.legal`) | BLOCKED — client input |
| DEC-01 / L-01..L-04 | OPEN-MARINE ownership and outbound licence; evidence request package E-01..E-12 prepared | BLOCKED — human/legal |
| X-03 | Image generation unavailable (no provider/credential/budget) | BLOCKED — unchanged; MC-04 assets affected, not the brief |
| H-04 | NMEA 2000 not implemented/licensed; live site overstates it | OPEN — copy correction required |
| H-01/H-10 | PILOT safety gate | BLOCKED |
| D-01/D-04 | Chart/weather data rights (MC-02) | BLOCKED — unchanged |

## 17. Appendix — verbatim command evidence

```
npm run format:check  → Checking formatting... All matched files use Prettier code style!
npm run build         → Output location: C:\Users\Admin\Documents\workspace\embarcarte\dist\embarcarte
npm run test:i18n     → i18n foundation checks passed: locale detection, route mapping and translations.
                        Server-rendering checks passed: lang attributes, private shells, alternates and per-request locale isolation.
npm run test:commerce → Commerce integration checks passed: bilingual catalogue, localized SEO, stock, cart payload integrity, accounts, authorization, sitemap alternates, webhook verification and security regressions.
npm run test:seo      → SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD and private noindex.
npm run test:backup   → Backup/restore checks passed: consistent snapshot, checksums, integrity, foreign keys, counts and corrupt-copy rejection.
npm run test:brand    → Summary: 21 checks run, 21 passed, 0 failed; 11 files scanned, 0 skipped. RESULT: PASS
npm run test:brand:unit → tests 11, pass 11, fail 0
npm audit --omit=dev --audit-level=high → found 0 vulnerabilities
git diff --check      → (no output; no whitespace errors)
```

E2E:

```
$ npm run test:e2e
  15 passed (47.8s)   [chromium]
```

## 18. Reconciliation of inconsistencies found by the team

| # | Inconsistency | Disposition |
| --- | --- | --- |
| R-01 | `COMMERCIAL-PORTFOLIO.md:120` says bundles include a "certified supervised pilot" (PILOT is blocked) | **Not rewritten** (prior-milestone document, out of scope). Recorded as `DEFECT-01` for the product-definitions batch (prompts 05–07); the brand layer never repeats the wording, and the contract now says "supervised pilot (only once its safety gate is complete)". |
| R-02 | Contract `headlineSecondaryTwo` ("Instala hoy" / "Install today") implied availability | **Fixed in MC-03** — replaced with "Empieza por lo que ya llevas a bordo" / "Start with what is already aboard". |
| R-03 | Contract `companyDescription` asserted design/authorship-adjacent language; voice doc asserted activity in ES/PT/EU | **Fixed** — role-based wording only; priority markets are a strategy statement, not a claim of current commercial presence. |
| R-04 | FLEET bundle displayName collided with the FLEET product family in customer copy | **Fixed** — contract keeps machine `displayName` "MAREA FLEET" (validator invariant) and adds `customerFacingName` "MAREA FLEET package"; naming, architecture and disambiguation text aligned. |
| R-05 | START bundle hypothesis (EUR 499) exceeds the sum of its stated lowest editions (EUR 448) | **Economics issue, out of MC-03 scope** — recorded for prompt 12 (unit economics); no price was published or changed. |
| R-06 | MAREA NAUTIC SL was initially described as a "nautical company" | **Corrected** — sources disagree (CNAE 6810 real estate vs a nautical-rental entry); recorded as a disputed corporate name with no verified registered right. |

## 19. Authorisation compliance

| Prohibition | Compliance |
| --- | --- |
| No trademark filing | None performed; filing explicitly requires counsel + signatory (§3 of the decision package) |
| No domain registration/purchase | None; domain availability not claimed; strategy recorded only |
| No spend | None; no paid API, no paid image generation, no purchases |
| No image generation / no fabricated images | None; MC-01 blocker preserved and stated in the visual brief |
| No merge to main / no deploy | None; branch + stacked draft PR only |
| No OPEN-MARINE change | None; repository untouched |
| No contact with third parties | None |
| No invented legal/registration/certification facts | None; every registry record is cited and classed; unverified items are labelled |

## 20. Readiness for MC-04 (visual identity)

MC-04 can start immediately **in non-public mode** with: the brand architecture and naming system (what
the identity must express and what it must never encode), the 10 canonical ES/EN strings, the claims
policy (what visuals may and may not imply), the 2 013-line visual identity brief (2–3 territories,
typography/colour/instrument/hardware/packaging/iconography/illustration/photography direction, asset
specification table with PRODUCIBLE vs BLOCKED classification, MC-04 acceptance criteria D-01..D-19 and
gates G1–G7), the existing site's current identity constraints, and the blocked image-generation status.
MC-04 must first: verify font licence/feature coverage; prototype the three territories and shortlist two;
commission a professional originality/prior-art check before adoption; keep image-dependent assets as
briefs until X-03 is authorised. MC-04 is **not** started automatically by this milestone.
