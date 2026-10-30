# EMBARCARTE / MAREA — Brand governance implementation (MC-03/E)

| Field | Value |
| --- | --- |
| Document ID | MC-03 / BRAND-GOVERNANCE-IMPLEMENTATION |
| Milestone | MC-03 — brand strategy, trademark research, positioning and governance |
| Date | 2026-10-30 |
| Owner | governance-engineer (task-5) |
| Status | IMPLEMENTED — validator and unit tests pass on `feature/marea-mc03-brand-governance` |
| Nature | Engineering note. Not a legal opinion, not a trademark clearance, not a commercial availability statement |

## 1. Exact paths

| Path | Role |
| --- | --- |
| `docs/marea/brand/brand-identity.contract.json` | Single machine-readable brand identity contract: company, brand, technology foundation, nine families, six bundles, FLEET disambiguation, naming, attribution, claims, bilingual messages, `governedPaths`, `checkProfiles`, `publicationCopies` |
| `scripts/check-brand.mjs` | Deterministic validator. Exit 0 = all checks passed; exit 1 = any check failed. Reads the contract, then only the files listed in `governedPaths` |
| `scripts/check-brand.test.mjs` | `node:test` proof that the validator fails on mutated contracts and on documents that break the rules, and tolerates the negative examples the documents must quote |
| `docs/marea/brand/BRAND-GOVERNANCE-IMPLEMENTATION.md` | This note. Deliberately **not** a governed path (see §4) |

The contract is the source of truth for scope. Today `governedPaths` lists the contract and the eleven brand narrative documents (four Lead-owned, six specialist deliverables, one joined later); the validator prints which of those exist and which are skipped, and it never reads anything else.

## 2. How to run

```powershell
node scripts/check-brand.mjs
node --test scripts/check-brand.test.mjs
```

`package.json` is Lead-owned. The entries the Lead added (present on this branch) are:

```json
"test:brand": "node scripts/check-brand.mjs",
"test:brand:unit": "node --test scripts/check-brand.test.mjs"
```

CI runs both commands (`npm run test:brand`, `npm run test:brand:unit`) after `test:backup` in `.github/workflows/ci.yml`.

**Prettier coverage.** `format`/`format:check` in `package.json` use an explicit file list and do **not** include `scripts/check-brand.mjs` (nor the existing `scripts/check-i18n.mjs` and `scripts/check-commerce.mjs`). The new files are nevertheless Prettier-formatted with the repository configuration (2 spaces, single quotes, semicolons, width 100, trailing newline) and pass a local `prettier --check`. Recommendation: add `scripts/check-brand.mjs scripts/check-brand.test.mjs` to both `format` and `format:check` so the governance scripts cannot drift; do not expand to a glob in this milestone (the legacy exclusions are intentional and out of scope).

## 3. What the validator checks

The run reports 21 checks: 14 contract checks, 5 document checks, 1 claims-policy coverage check and 1 publication-copy check. Each line below states what it enforces and, where it matters, what it deliberately does not.

### Contract checks

| Check | Enforces |
| --- | --- |
| `contract.identity` | `contractVersion` present; `status` is exactly `PROPOSED` |
| `contract.company` | Company is EMBARCARTE; role names the seller/legal commercial identity; description present; at least two permitted attribution statements |
| `contract.productBrand` | Brand is MAREA and `PROPOSED`; `trademarkLegalClearance` is exactly `NOT_GRANTED`; `publicationState` is `INTERNAL_ONLY`; registered symbols disallowed; registration policy present |
| `contract.technologyFoundation` | Foundation is OPEN-MARINE; internal engineering role; `publicUse` `INTERNAL_ONLY`; `rightsClearance` `NOT_CLEARED`; `neverPresentedAsPublicProductBrand` true; rule states it must never be the public brand |
| `contract.productFamilies` | Exactly nine families, ids exactly NAV/HUB/AIS/PILOT/SENSE/WATCH/DISPLAY/WEATHER/FLEET, unique, `displayName` exactly `MAREA <ID>`, domain present |
| `contract.bundles` | Exactly six bundles START/CRUISE/SAIL/PROTECT/COMPLETE/FLEET, `displayName` exactly `MAREA <ID>`, minimum content present |
| `contract.fleetDisambiguation` | Rule distinguishes the MAREA FLEET product family from the MAREA FLEET bundle and describes both |
| `contract.namingRules` | Master brand, canonical syntax and the edition / generation / hardware-size / version / commercial-vs-engineering sections; allowed and forbidden patterns; forbidden invented family names |
| `contract.attributionRules` | Owner is EMBARCARTE; both allowed and forbidden statement lists exist |
| `contract.claimsPolicy` | Summary present; prohibited claim patterns include the six mandated patterns |
| `contract.messages` | Ten message keys present and non-empty in **both** `es` and `en`: company description, brand short description, brand extended description, primary headline, two secondary headlines, trust line, CTA, B2B line, attribution line |
| `contract.governedPaths` | Non-empty, unique, includes the contract itself, every entry an explicit relative file under `docs/marea/brand/`; no absolute path, `..` or glob; never `src/` |
| `contract.checkProfiles` | Optional path → scan-rule map; only known rules; `default` profile present |
| `contract.publicationCopies` | Optional explicit list (empty today); valid explicit relative paths, never under `src/` |

### Document checks (only `governedPaths`)

| Check | Enforces | Deliberately does not |
| --- | --- | --- |
| `brand.docs.readable` | A governed file that exists must be readable | Does not fail for an absent file: absence is reported as **skipped**, never as a pass of its content |
| `brand.docs.trademarkSymbols` | A registered/unregistered trademark glyph is a failure **only when attached to the brand, a family name or a bundle name** | Does not flag governance prose that discusses the symbols (e.g. a policy sentence listing them) |
| `brand.docs.productNames` | Flags wrong casing, hyphenation or concatenation of the nine family names and the denylisted invented names, in prose | Tolerates correct forms (`MAREA NAV`, `MAREA HUB Pro`, `MAREA DISPLAY 7`), inline code spans, fenced code blocks and table cells; does not flag the Spanish common noun "marea" unless it is used as the brand immediately before a family name |
| `brand.docs.attribution` | Flags the brand attributed to the internal technology foundation, the company attributed to the brand, "a brand of" naming an owner other than EMBARCARTE, and the company presented as a sub-brand | Tolerates allowed statements (brand as a product brand of EMBARCARTE) and negative/forbidden contexts |
| `brand.docs.clearanceClaims` | Flags positive assertions that the brand is registered, legally cleared or commercially available | Skips negation and policy context: lines with `forbidden`, `prohibited`, `never`, `must not`, `not registered`, `NOT_GRANTED`, `not cleared`, `pending`, Spanish negations, `prohibitedClaimPatterns` / `forbiddenStatements`; skips table rows and bullet lists under a Forbidden/Prohibited heading; the contract itself is exempt and only structurally validated |

### Claims-policy and publication-copy checks

| Check | Enforces |
| --- | --- |
| `brand.policyCoverage` | `COMMERCIAL-BRAND-CLAIMS-POLICY.md` must restate **every** `claimsPolicy.prohibitedClaimPatterns` entry verbatim (case-insensitive). This is why the policy documents may quote the prohibited strings themselves |
| `brand.publicationCopies` | Lists how many publication copies are in scope. Empty today and therefore a pass; when a file is listed, prohibited claim patterns and clearance assertions in it are failures with no negative-context tolerance |

## 4. Scope boundaries and deliberate non-checks

- The validator reads **only** `governedPaths`. It never walks the repository, never reads `src/`, and never touches the network. Legacy pages and technical documents that legitimately mention the technology foundation are therefore out of scope by construction.
- The contract is structurally validated but exempt from the text rules because it must quote prohibited statements. This note is exempt for the same reason (it quotes validator diagnostics and command output) and is therefore not listed in `governedPaths`.
- `TRADEMARK-SEARCH-RESULTS.csv` is not a governed path: a structured registry dataset legitimately records third-party marks and their statuses, and scanning it for clearance assertions would create false positives. It is covered by human/legal review, not by this text gate.
- The prohibited claim patterns are not flagged inside the claims policy; the policy must name them. The coverage check proves the list is complete, and `publicationCopies` is the enforcement point for real published copy.
- Negative-context detection is a documented heuristic (inline markers, table headers, code fences, inline code, section headings). Consequence: a third-party product name that happens to collide with a family name can be flagged. The resolution is to rephrase the sentence or widen a rule together with a regression test — never to bypass the validator.
- The run is deterministic and offline: same tree gives the same output, with no timestamps, build step, dependency install or rendering.

## 5. Evidence — real command output

### 5.1 Validator on the real tree

Captured on 2026-10-30 from the MC-03 working tree. The per-file line counts are the validator's own `text.split(/\r?\n/)` length, so a document with a trailing newline counts one element more than an editor such as `Get-Content` reports (example: `TRADEMARK-CLEARANCE-RESEARCH.md` is 640 editor lines and 641 validator elements). The counts are a snapshot; a later run reproduces the same 21 checks, the same PASS verdict and the same scope (11 files scanned, 0 skipped), even if a document's line count has moved.

```text
Brand governance validator — EMBARCARTE / MAREA (contract 1.0.0, PROPOSED)
Contract: docs/marea/brand/brand-identity.contract.json
Root: C:\Users\Admin\Documents\workspace\embarcarte

PASS  contract.identity
PASS  contract.company
PASS  contract.productBrand
PASS  contract.technologyFoundation
PASS  contract.productFamilies
PASS  contract.bundles
PASS  contract.fleetDisambiguation
PASS  contract.namingRules
PASS  contract.attributionRules
PASS  contract.claimsPolicy
PASS  contract.messages
PASS  contract.governedPaths — 11 governed paths
PASS  contract.checkProfiles
PASS  contract.publicationCopies — 0 publication copies in scope (extension point)
PASS  brand.docs.readable
PASS  brand.docs.trademarkSymbols
PASS  brand.docs.productNames
PASS  brand.docs.attribution
PASS  brand.docs.clearanceClaims
PASS  brand.policyCoverage — 6 prohibited claim patterns checked
PASS  brand.publicationCopies — 0 publication copies in scope (extension point; empty list passes)

Governed files (only these are read; everything else is out of scope):
  scanned   docs/marea/brand/brand-identity.contract.json — contract validated structurally; text rules exempt (the contract must quote prohibited statements)
  scanned   docs/marea/brand/BRAND-ARCHITECTURE.md — 232 lines
  scanned   docs/marea/brand/BRAND-VOICE-ES-EN.md — 245 lines
  scanned   docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md — 237 lines
  scanned   docs/marea/brand/BRAND-AND-IP-DECISION-PACKAGE.md — 262 lines
  scanned   docs/marea/brand/TRADEMARK-CLEARANCE-RESEARCH.md — 641 lines
  scanned   docs/marea/brand/MAREA-BRAND-STRATEGY.md — 466 lines
  scanned   docs/marea/brand/PRODUCT-NAMING-SYSTEM.md — 365 lines
  scanned   docs/marea/brand/COMPETITIVE-POSITIONING-EVIDENCE.md — 302 lines
  scanned   docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md — 1980 lines
  scanned   docs/marea/brand/WEBSITE-BRAND-MIGRATION.md — 717 lines

Summary: 21 checks run, 21 passed, 0 failed; 11 files scanned, 0 skipped.
RESULT: PASS
```

### 5.2 Test suite

```text
✔ the real contract passes and absent governed files are reported as skipped (62.6705ms)
✔ a contract with eight product families is rejected (62.9763ms)
✔ a contract whose trademarkLegalClearance is not NOT_GRANTED is rejected (60.464ms)
✔ a governed document using a registered-trademark glyph with MAREA is rejected (62.3106ms)
✔ a governed document with a wrong product-name casing is rejected (61.9181ms)
✔ malformed attribution in a governed document is rejected (59.4248ms)
✔ a clearance contradiction in a governed document is rejected (62.7129ms)
✔ negated clearance, symbol discussions and marked negative examples pass (61.9955ms)
✔ the claims policy must restate every prohibited claim pattern (62.0463ms)
✔ prohibited claims and clearance assertions in a listed publication copy are rejected (66.6993ms)
✔ files outside governedPaths are never scanned (62.5632ms)
ℹ tests 11
ℹ suites 0
ℹ pass 11
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 759.8648
```

The 11 tests prove, through the real CLI and `--root` fixture trees, that the validator fails on: eight product families; a clearance value other than `NOT_GRANTED`; a registered-trademark glyph attached to the brand; wrong product-name casing; malformed attribution; a clearance contradiction; a claims policy that drops a prohibited pattern; a prohibited claim in a listed publication copy. They also prove that absent governed files are reported as skipped, that files outside `governedPaths` are never scanned, and that negated clearance, symbol discussions, marked negative examples, tables and code fences are tolerated.

## 6. Deferred `src/` integration boundary — why no production rendering risk

MC-03 delivers brand strategy, trademark research, positioning and governance. The live site keeps its current branding; the brand is proposed and not trademark-cleared, and the legal seller identity is still missing (MC-02 X-01, X-02). Integrating the contract into the Angular application would change visible rendering, indexable copy and metadata before either gate closes, so it is explicitly deferred.

The validator has no production-rendering risk: it is a plain Node ESM script with no runtime dependency, it is never imported by the application, it never builds the app, and it reads only markdown/JSON brand documents under `docs/marea/brand/`. The application source, the SSR build, the prerender output and the public URLs are untouched.

## 7. Future integration design — SITE identity separation (not implemented)

When an authorised migration milestone exists (after trademark clearance and verified legal identity), the contract maps onto three distinct SITE concerns that must never be conflated:

| Concern | Future SITE field (illustrative) | Value | Rendering rule |
| --- | --- | --- | --- |
| Seller / legal commercial identity | `SITE.legal` (owner, tax id, address, registry) | EMBARCARTE (verified data only) | Always the legal seller; never invented (MC-02 X-02 remains open) |
| Commercial product brand | `SITE.brand` / `productBrand` | MAREA, proposed until clearance | Only rendered behind the authorised migration flag; strings taken from the contract's bilingual message keys |
| Internal technology foundation | `SITE.technology.identifier` | OPEN-MARINE, `INTERNAL_ONLY` | Never rendered as a public brand, logo, attribution line or product name |

Integration would consume `messages.es` / `messages.en` (ten keys), the naming syntax, the attribution rules and the claims policy. `publicationCopies` becomes the enforcement point: the generated copy files are listed in the contract, and the validator scans them for prohibited claims and clearance assertions.

**Hard condition:** the integration must not change current production rendering. It must be introduced only by an explicitly authorised milestone, behind an explicit switch, preserving existing URLs, canonical/hreflang reciprocity, sitemap entries, JSON-LD and prerendered output. Until then, no MAREA or OPEN-MARINE output may reach the live site, and this implementation changes no `src/` file.

## 8. Change control

- Changing the nine families, the six bundles or the clearance state requires updating the contract, the validator and the tests together; the mutation tests are the guard.
- Adding a governed document means adding its explicit path to `governedPaths` and re-running both commands. Missing files are skipped and reported, so a delivery can be verified while specialist documents are still being written.
- Never weaken a rule to make a document pass. Fix the document, or add a narrowly scoped exemption, and add a regression test for it.
