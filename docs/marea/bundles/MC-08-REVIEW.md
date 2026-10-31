# MC-08 — Independent review of the six commercial solution bundles (D19)

| Field | Value |
| --- | --- |
| Document ID | MC-08 / D19 — INDEPENDENT-REVIEW |
| Reviewer | `bundle-reviewer` (independent reviewer; author of **no** MC-08 deliverable) |
| Review state | Complete — five rounds: round 1 initial audit of `930fc9c` (interim verdict PARTIAL, §14.1); round 2 re-verification of `a977b39` (§15–§16, verdict PARTIAL); round 3 verification of `c3c1a44` (§17–§18, verdict PARTIAL); round 4 verification of `9a9bc97` (§19–§20, verdict PARTIAL); round 5 verification of `d496d68` (§21–§22, **final verdict PASS for the definition scope**) |
| Reviewed commit | `d496d683adf44b099192b9425a76de69ccbe81bc` ("fix(mc08): close round-4 residuals N-04/N-05 in the bundle gate") |
| Initial audited commit | `930fc9c5a8f46ae41c80334ecfde1a4e377ffdc2` ("docs(mc08): six commercial solution bundles, machine contract, validator and negative tests") — the commit on which §1–§14 of this document were written |
| Round-2 verified commit | `a977b39be611046d9b7fb1b0c98d8bf88f0159cd` ("fix(mc08): close independent-review gate findings (B-01, B-02, M-01..M-03, m-01..m-03)") |
| Round-3 verified commit | `c3c1a44a4aeea058f4bc2fc0a64524210123eae9` ("fix(mc08): close round-2 re-review residues (R-01..R-04)") |
| Round-4 verified commit | `9a9bc9768c69bab186571742621e1b2012c9f3c1` ("fix(mc08): close round-3 residuals N-01..N-03 in the bundle gate") |
| Base | `80c66c70a1bab6f11c5ba5709baa4c1671f1d6da` (MC-07 HEAD) |
| Branch | `feature/marea-mc08-bundles-commercial-architecture` |
| Review date | 2026-10-31 (Europe/Madrid) — rounds 1–5 on `930fc9c`, `a977b39`, `c3c1a44`, `9a9bc97`, `d496d68` |
| Diff under review | Delivery diff `git diff 80c66c7..930fc9c` — 33 files, 23,177 insertions(+), 4 deletions(-); round-2 delta `930fc9c..a977b39` — 6 files, 604 insertions(+), 76 deletions(-); round-3 delta `a977b39..c3c1a44` — 4 files, 210 insertions(+), 11 deletions(-); round-4 delta `c3c1a44..9a9bc97` — 2 files, 115 insertions(+), 27 deletions(-); round-5 delta `9a9bc97..d496d68` — 2 files, 87 insertions(+), 7 deletions(-) |
| Audit target | The committed trees at `930fc9c`, `a977b39`, `c3c1a44`, `9a9bc97` and `d496d68` and those five diffs only. No delivery summary was used as evidence. |
| Scope | D1–D17 bundle deliverables (architecture, six 24-field bundle specifications, composition, configuration rules, subscriptions/entitlements, pricing/unit economics, installation/quotation, journeys, comparison, 12 ES/EN copy drafts, asset requirements, `bundle-definitions.json`), the `check-marea-bundles` validator and its tests (31 → 42 → 50 → 55 → 60; checks 32 → 34 → 35 → 35 → 35), the D-018–D-025 decision records, registry row 08 and the `package.json` script additions; compared against the nine-product authority (`docs/marea/products/README.md` §1–§32, editions/compatibility/pricing contracts, `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9, `brand-identity.contract.json` `fleetDisambiguation`) and D-007/D-008/D-009/D-011/D-012/D-013/D-014/D-015 |
| Verdict | **PASS (definition scope only)** — final after round 5 on `d496d683adf44b099192b9425a76de69ccbe81bc`. All review findings from rounds 1–4 are closed and independently verified: validator 35/35, bundle tests 60/60, product checks 52/52, format clean; N-04 (Unicode-safe Spanish sale detection) and N-05 (governance-quote suppression in BUNDLE-35) are closed on the real artefacts; 6/6 regression probes still rejected; 4/4 definitional-prose sanity sentences accepted. This PASS covers the internal bundle-definition scope only — it is **not** price approval, compatibility, certification, publication or sale: all six bundles remain `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`, no price is approved, 0 compatibility rows are `SUPPORTED`/`TESTED`, no certification exists, brand `NOT_GRANTED`, source IP `NOT_CLEARED`, and there is no public page, route, checkout or sale. See §21–§22 and the honest limits in §22.3. |
| Commercial release status | **BLOCKED / NOT_FOR_SALE** — six bundles `DEFINED`, `NOT_FOR_SALE`, `INTERNAL_ONLY`; no price approved; no compatibility row `SUPPORTED`/`TESTED`; certification none; brand `NOT_GRANTED`; source IP `NOT_CLEARED`; no publication, page, route, checkout or sale |
| Files written by this reviewer | `docs/marea/bundles/MC-08-REVIEW.md` (this file) — **only** |

---

## 1. Audit target, independence and method

### 1.1 Independence statement

I am AGENT G, the independent commercial and technical reviewer for MC-08. I authored no MC-08
deliverable: D1–D17 were authored by the Lead, the Recreational Navigation Solution Architect, the Sail and
Helm Integration Specialist, the Vessel Monitoring and Sensor Specialist, the Commerce Contracts and
Configuration Engineer, the Pricing and Channel Economics Specialist and the B2B Fleet Solutions Director (as
declared in each document's owner field). I did not edit any file other than this review, did not run a Git
write command, did not commit, did not use the network, made no purchase and generated no image.

### 1.2 What was inspected (actual artefacts, never summaries)

| Artefact | Evidence inspected |
| --- | --- |
| Frozen tree | `git status --porcelain` (empty), `git rev-parse HEAD` = `930fc9c…`, branch name, `git diff --stat 80c66c7..930fc9c`, `git diff --name-only` |
| Machine contract | `docs/marea/bundles/bundle-definitions.json` (9,605 lines) read structurally: 6 bundles, 24-field model, 60 assets, 12 entitlements, 20 conflict rules, 12 configuration rules, 8 cross-sell rules, 7 decisions, publication controls, global restrictions, tenancy boundaries |
| Six specifications | Full read of `MAREA-START-COMMERCIAL-SPEC.md` plus targeted extraction of composition tables, B06/B07/B09/B19/B23 of all six and full-text token scans |
| Supported docs | `BUNDLE-ARCHITECTURE.md`, `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`, `BUNDLE-CONFIGURATION-RULES.md`, `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`, `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`, `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md`, `BUNDLE-CUSTOMER-JOURNEYS.md`, `BUNDLE-CUSTOMER-COMPARISON.md`, `BUNDLE-ASSET-REQUIREMENTS.md` (headings, key sections, tables and token scans) |
| Copy | All 12 `copy/*.{es,en}.md` parsed programmatically and scanned line by line for currency, price, stock, reviews, certifications, availability, purchase CTAs, autonomous/remote claims and disclaimers |
| Validator | `scripts/check-marea-bundles.mjs` read in full (2,611 lines): loading, registry, all 32 check bodies, claim scanner, report/exit behaviour |
| Tests | `scripts/check-marea-bundles.test.mjs` read in full (514 lines): 31 cases, fixture construction, CLI invocation, assertions |
| Governance | `docs/marea/execution/DECISION-LOG.md` D-018–D-025, `MASTER-PROMPT-REGISTRY.md` row 08, `package.json` diff |
| Authority | `docs/marea/products/README.md`, `PRODUCT-EDITIONS-*`, `PRODUCT-COMPATIBILITY-*`, `PRODUCT-PRICING-AND-CHANNEL-MODEL*`, the three `product-definitions.batch-0*.json`, `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9, `brand-identity.contract.json` (verified through the validator and targeted greps; not re-read in full — see §13) |

### 1.3 Method

1. Freeze the tree (clean working tree, exact commit) and prove the diff's authorised scope.
2. Re-run every declared gate from the real tree and record exact commands, counts and exit codes.
3. Inspect the validator for realness: does it consume the three product contracts, are the 32 checks
   non-trivial, do the 31 tests invoke the real CLI on mutated fixture trees and assert the specific failing
   check, are there checks that can never fail or mutations that pass untested?
4. Run an independent mutation campaign in throwaway temp copies of `docs/marea` (never the repository),
   including every mandated probe of the review brief plus additional adversarial probes.
5. Read the commercial content and test each authoritative fact against the committed text and machine
   contract; verify the price challenge arithmetic independently; verify the PILOT, subscription-isolation,
   FLEET-tenancy, copy, asset and governance boundaries.
6. Classify every finding by severity, with file:line or command evidence, and issue the verdict. I fix
   nothing; disposition is routed to the Lead.

---

## 2. Frozen state and authorised diff scope

### 2.1 Frozen state (recorded 2026-10-31 before any write)

```text
$ git -C <repo> status --porcelain
(empty — clean working tree)
$ git -C <repo> branch --show-current
feature/marea-mc08-bundles-commercial-architecture
$ git -C <repo> rev-parse HEAD
930fc9c5a8f46ae41c80334ecfde1a4e377ffdc2
$ git diff --stat 80c66c7..930fc9c
 33 files changed, 23177 insertions(+), 4 deletions(-)
$ git diff --check 80c66c7..930fc9c
(no output; exit 0)
```

After this review file is written the only change to the tree is
`?? docs/marea/bundles/MC-08-REVIEW.md`; no other file was touched and nothing was committed.

### 2.2 Diff scope — what the 33 files are

| Group | Files | Verdict |
| --- | --- | --- |
| `docs/marea/bundles/` (new) | `BUNDLE-ARCHITECTURE.md`, `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`, `BUNDLE-CONFIGURATION-RULES.md`, `BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`, `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`, `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md`, `BUNDLE-CUSTOMER-JOURNEYS.md`, `BUNDLE-CUSTOMER-COMPARISON.md`, `BUNDLE-ASSET-REQUIREMENTS.md`, six `MAREA-*-COMMERCIAL-SPEC.md`, `bundle-definitions.json`, 12 `copy/*.{es,en}.md` | In scope |
| `docs/marea/execution/` | `DECISION-LOG.md` (+D-018…D-025, 260 lines), `MASTER-PROMPT-REGISTRY.md` (row 08 only, 2 lines) | In scope |
| `package.json` | lines 18–19 extend the Prettier `format`/`format:check` lists with the two new scripts; lines 23–24 add `test:bundles` and `test:bundles:unit`. **No other package.json change** | In scope, exactly as declared |
| `scripts/` | `check-marea-bundles.mjs` (new, 2,611 lines), `check-marea-bundles.test.mjs` (new, 514 lines) | In scope |
| **Not touched** | `src/`, `public/`, `e2e/`, `docs/marea/products/`, `docs/marea/brand/`, checkout/commerce code, deployment config, CI workflows, media assets | **Confirmed absent from the diff** (`git diff --name-only` shows none) |

No image, font or binary file was added (media-file scan of the diff returned none). No product, brand or
commerce document was modified. No public page, route, catalogue entry or checkout code exists for any bundle
(`BUNDLE-ARCHITECTURE.md` §9 lines 367–377).

**Scope verdict: VERIFIED — the diff touches only the declared MC-08 documentation, contract, validator,
tests, decision log, registry row and format scripts.**

---

## 3. Gate results (re-run from the real tree at `930fc9c`)

All commands run on Windows 11 / Node 24 in the repository root. No gate was run from a modified tree.

| # | Command | Exit | Exact result | Status |
| --- | --- | --- | --- | --- |
| 1 | `node scripts/check-marea-bundles.mjs` | 0 | `Summary: 32 checks run, 32 passed, 0 failed; 43 of 43 scoped files read; 60 assets; 6 bundles.` Registry `9 products, 9 families, 26 editions, 3 kits (from the nine-product contracts)`. Canonical compatibility rows `21 batch-01, 31 batch-02, 21 batch-03 — 0 SUPPORTED/TESTED` | PASS |
| 2 | `npm run test:bundles` | 0 | identical to #1 (wrapper) | PASS |
| 3 | `node --test scripts/check-marea-bundles.test.mjs` | 0 | `pass 31`, `fail 0`, cancelled 0, skipped 0 | PASS |
| 4 | `npm run test:bundles:unit` | 0 | identical to #3 (wrapper) | PASS |
| 5 | `npm run test:products` (non-regression) | 0 | `Summary: 52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read.` | PASS |
| 6 | `npm run test:products:unit` (non-regression) | 0 | `pass 106`, `fail 0` | PASS |
| 7 | `npm run format:check` | 0 | `All matched files use Prettier code style!` (includes both new scripts) | PASS |
| 8 | `npm run test:i18n` | 0 | `Server-rendering checks passed…` + `i18n foundation checks passed…` | PASS |
| 9 | `npm run test:commerce` | 0 | `Commerce integration checks passed…` | PASS |
| 10 | `npm run test:seo` | 0 | `SEO checks passed: 101 sitemap URLs, canonical, reciprocal hreflang, JSON-LD and private noindex.` | PASS |
| 11 | `npm run test:brand` | 0 | `Summary: 21 checks run, 21 passed, 0 failed; 24 files scanned` (includes `contract.bundles`, `contract.fleetDisambiguation`, `brand.docs.clearanceClaims`) | PASS |
| 12 | `npm run test:brand:unit` | 0 | `pass 13`, `fail 0` | PASS |
| 13 | `git diff --check 80c66c7..930fc9c` | 0 | no whitespace errors | PASS |

Not re-run, and declared so rather than claimed: `npm run build`, `npm run test:e2e`, `npm run test:backup`,
`npm run test:performance`. The diff touches no `src/`, `public/`, `e2e/` or configuration, so these gates
cannot regress from this commit; their MC-07 recorded evidence is unchanged but was **not** re-verified here
(§13).

**Gate verdict: all re-run gates PASS; the gate counts match the claims in the reviewed diff (32/32, 31/31,
52/52, 106/106).**

---

## 4. Validator and test quality assessment

### 4.1 Does the validator consume the three product contracts (or a parallel registry)?

**It consumes the contracts.** `REGISTRY_CONTRACTS` (lines 29–33) lists the three
`product-definitions.batch-0*.json` files and `registry` (lines 532–573) is built exclusively from them:
product count, family set, edition ownership and kit→module mappings. BUNDLE-05 (lines 1080–1103) requires
exactly 9 products and the nine canonical families; BUNDLE-06 (lines 1107–1155) resolves every component's
`familyId`/`editionId` against that registry and rejects an edition that does not exist or that is owned by
another family; BUNDLE-07 (lines 1159–1188) cross-checks kit expansion against the contract, the product
contracts and `PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md` §3.3. Mutating the product contracts is detected
(my probe R03: removing the FLEET product fails BUNDLE-05; P26: removing `NAV-PRO` fails BUNDLE-06), which
is the decisive test that the registry is not a copy.

There **is** a hardcoded `FIXED_REFERENCE` table (lines 295–328) and hardcoded `HISTORICAL_AMOUNTS` (lines
372–379). These are not a parallel product registry: they encode the frozen commercial decision D-019
(reference configurations and the six historical figures) and their *resolution* is still validated against
the contracts. This is a legitimate design for a frozen commercial decision, but it has one consequence
reported as finding M-01 (§12): the hardcoded table pins only the lines it lists, so it cannot detect an
**extra** `INCLUDED` line or the promotion of a `CONDITIONAL` line.

### 4.2 Are the 32 checks real (not trivially true)?

I read all 32 check bodies. Every one has a reachable failure path, and I demonstrated each family of them
failing on a real mutation (BUNDLE-01–32 are all exercised between the committed suite and my probes — see
§5; checks 01, 04, 05, 07, 20, 21, 25, 27, 30 and 32, which the committed suite does not cover, all failed
correctly under my probes R01–R10). They are not decorative: they verify contract identity and vocabularies,
the product-contract registry, edition resolution, kit expansion, duplicate/double-count rules, mandatory
composition and external scope, PILOT quotation semantics, WATCH/SENSE/DISPLAY/AIS/FLEET restrictions,
tenancy, publication controls, price classification, the 24×6 field model, the 12 copy files, the 60-asset
reconciliation, the entitlement matrix and the canonical compatibility registers.

The checks are lexically strict where that is defensible (exact vocabularies, exact display names, exact
publication-control object with key-count equality at `sameFlatObject`, lines 433–438) and semantic where it
matters (registry resolution, kit expansion, compatibility status versus the canonical register). The
validator reads only its 43 scoped files, makes no network call, adds no dependency, supports `--root` and
`--json`, and exits non-zero on any failure (line 2611).

### 4.3 Are the 31 tests real mutation tests?

**Yes.** Every case builds a throwaway fixture (`mkdtempSync` + `cpSync` of the real `docs/marea` tree and the
product/brand authority files), applies one mutation, spawns the **real CLI** with `--root` and the real
repository as `cwd` (`spawn(process.execPath, [SCRIPT, '--root', root, ...])`), and asserts `exit === 1`, a
`FAIL <check-id>` line and a specific message (`assertFails`, lines 92–100). Fixtures are removed in a
`finally`. There are 31 tests: 2 positive controls (real tree PASS, `--json` PASS with 9 products/3 kits/6
bundles/60 assets) and 29 negative cases (21 mandated mutations + 8 additional adversarial mutations), all
asserting the specific failing check rather than a generic failure.

**Gaps in the committed suite** (this is the root of the blocking findings, not a claim that the suite is
fake):

- No test mutates the **product contracts** (only the bundle contract and two documentation files are
  edited). The validator's product-contract consumption is therefore not regression-tested by the suite,
  although my probes prove it works.
- No test injects **prose claims** into the six specifications or the copy (`BUNDLE-15`, `BUNDLE-26`,
  `BUNDLE-32` are only exercised through JSON field mutations). This is exactly where the claim-scanner
  defects in §12 live.
- Checks 04, 05, 07, 20, 21, 25, 27, 30 and 32 have **no** negative case in the committed suite.
- No test asserts that a `CONDITIONAL`/`INELIGIBLE` line cannot become `INCLUDED`, or that
  `component.inclusion` is a member of the declared inclusion vocabulary.

**Validator/test verdict: technically substantive and honestly built; test coverage is real but has the
specific blind spots that findings B-01, B-02, M-01 and M-02 exploit.**

---

## 5. Independent mutation probes (throwaway temp copies only)

I copied `docs/marea` into fresh temp roots per probe (never the repository), applied one mutation, ran the
real CLI with `--root`, and recorded the exit code and the failing check ids. 53 mutation runs total:
**40 rejected, 13 accepted** in six distinct gap behaviours. The required probes from the review brief are
all present.

### 5.1 The mandated probes

| Probe (my id) | Mutation | Result | Failing check |
| --- | --- | --- | --- |
| P01 | Remove mandatory component (START `NAV-PRO`) | REJECTED | BUNDLE-09 |
| P02 | Unknown edition (`FLEET-ULTRA` in FLEET line) | REJECTED | BUNDLE-06, BUNDLE-09 |
| P03 | Duplicate SENSE module: `SENSE-ESSENTIALS` kit + loose `SENSE-BILGE` (PROTECT) | REJECTED | BUNDLE-08 |
| P04 | `publicationControls.published = true` | REJECTED | BUNDLE-26 |
| P05 | `publicationControls.forSale = true` | REJECTED | BUNDLE-26 |
| P06 | `publicationControls.purchaseCtaAllowed = true` | REJECTED | BUNDLE-26 |
| P07 | Bundle price verdict `APPROVED` (START) | REJECTED | BUNDLE-19 |
| P08 | SAIL `fixedTurnkeyPriceApproved = true` | REJECTED | BUNDLE-10, BUNDLE-19 |
| P09 | COMPLETE `quoteRequired = false` | REJECTED | BUNDLE-10 |
| P10 | FLEET `hardwareIncludedByDefault = true` | REJECTED | BUNDLE-16 |
| P11 | FLEET `crossTenantAccessAllowed = true` | REJECTED | BUNDLE-17 |
| P12 | AIS transmission enabled (`aisTransmissionOffered = true`) | REJECTED | BUNDLE-14, BUNDLE-26 |
| P13 | `DISPLAY-LARGE-CONDITIONAL` made `OPTIONAL` | REJECTED | BUNDLE-13, BUNDLE-31 |
| P14 | `PILOT-PRO` given a price hypothesis reference | REJECTED | BUNDLE-10 |
| P15 | NAV/WEATHER `doubleBillingAllowed = true` | REJECTED | BUNDLE-12, BUNDLE-28 |
| P16 | Subscription-isolation rule `STEERING_NOT_GATED` removed | REJECTED | BUNDLE-11 |
| P17 | Trademark clearance `GRANTED` | REJECTED | BUNDLE-26 |
| P18 | Source-IP clearance `CLEARED` | REJECTED | BUNDLE-26 |
| P19/Q02 | Affirmative “**guaranteed immediate** alerts” appended to `copy/start.en.md` / `copy/start.es.md` | **ACCEPTED** | **none — BLOCKING B-02** |
| Q01 | Same affirmative guarantee appended to the START **specification** | REJECTED | BUNDLE-15 |
| P20 | Safety-critical local function gated by an entitlement (`NAV_PRO_SUBSCRIPTION.gatesLocalSafety = true`) | REJECTED | BUNDLE-12, BUNDLE-28 |
| P31 | `PILOT-PRO` added as `OPTIONAL` to PROTECT | REJECTED | BUNDLE-10 |
| P23 | FLEET `customerFacingName` changed (tenth-family naming) | REJECTED | BUNDLE-02 |
| P24 | A seventh bundle added | REJECTED | BUNDLE-02, BUNDLE-03, BUNDLE-29 |
| P25 | Bundle lifecycle `COMMERCIALLY_AVAILABLE` | REJECTED | BUNDLE-02 |
| P28 | COMPLETE `totalPriceEstablished = true` | REJECTED | BUNDLE-10, BUNDLE-19 |
| P29 | Contract `publicationState = PUBLIC` | REJECTED | BUNDLE-01, BUNDLE-26 |
| P26 | **Product contract** edition `NAV-PRO` removed | REJECTED | BUNDLE-06 |
| P27/Q03/Q04 + 4 case variants | Prose “this bundle is now for sale.” (lowercase, capitalised, paragraph start, file start) in the START specification | **ACCEPTED** in all 7 runs | **none — BLOCKING B-01** |
| P30 | Unknown extra bundle field `forSale: true` | ACCEPTED (observation O-01) | none |
| P22 | `DISPLAY-LARGE-CONDITIONAL` line deleted entirely | ACCEPTED (minor m-01) | none |
| Q05 | `PILOT-PRO` inclusion changed to `ORDERABLE` | REJECTED | BUNDLE-10 |
| Q06 | `HUB-PRO` (OPTIONAL line) inclusion changed to `APPROVED` | **ACCEPTED** | none — MAJOR M-02 |
| Q07 | `AIS-CONNECTED` (CONDITIONAL) promoted to `INCLUDED` in CRUISE | **ACCEPTED** | none — MAJOR M-01 |
| Q08 | PROTECT `SENSE-ESSENTIALS` kit flipped to `OPTIONAL` | REJECTED | BUNDLE-08, BUNDLE-09 |

Additional negative probes that demonstrate otherwise-untested checks do fail correctly: R01 short
`honestLimit` → BUNDLE-01; R02 vocabulary altered → BUNDLE-04; R03 product removed → BUNDLE-05/16; R04 kit
expansion altered → BUNDLE-07; R05 invalid `evidenceClass` → BUNDLE-20; R06 invalid readiness state →
BUNDLE-21; R07 conflict rule deleted → BUNDLE-25; R08 decision removed → BUNDLE-27; R09 cross-sell
double-charge → BUNDLE-12/30; R10 lowercase approved-price prose → BUNDLE-26/32.

### 5.2 The six accepted behaviours (what the gate does not catch)

| # | Accepted mutation | Why it matters | Finding |
| --- | --- | --- | --- |
| 1 | Prose “This bundle is now for sale.” in a specification, in any casing/position | The claimed no-sale-claim gate does not detect the most natural sale sentence | B-01 |
| 2 | “Guaranteed immediate” alert claim in customer-facing ES/EN copy | Copy is the surface a customer would read; the mandated probe passes | B-02 |
| 3 | `AIS-CONNECTED` promoted from `CONDITIONAL` to `INCLUDED` | A conditional, not-selected product can silently become a mandatory bundled purchase | M-01 |
| 4 | `component.inclusion = "APPROVED"` on a non-reference line | Sale/approval tokens can inhabit the line-level inclusion field | M-02 |
| 5 | `DISPLAY-LARGE-CONDITIONAL` line deleted | The explicit ineligibility record can disappear without failing | m-01 |
| 6 | Unknown extra bundle field `forSale: true` | Schema is permissive for unknown keys | O-01 |

**The remaining 40 mutation runs were rejected and reported at least the expected failing check id.** The
negative-test posture is substantially real; the six accepted behaviours are reported in §12 with
corrections.

### 5.3 Why the prose claims pass (root cause, verified directly)

`claimPatterns[1]` is
`(?:^|[.;|]\s*)(?:this|the|it|bundle|package|solution|product)\s+(?:is|are)\s+(?:now\s+)?(?:for sale|orderable|purchasable|available to buy)\b`
(`check-marea-bundles.mjs` lines 691–695). The subject alternation is a single token immediately followed by
“is/are”, so natural noun phrases do not match. Evaluated directly against the real regex:

```text
"This bundle is now for sale."      => false
"The bundle is for sale."           => false
"It is for sale."                   => false
"This product is orderable."        => false
"The package is now purchasable."   => false
"This is for sale."                 => false
"bundle is for sale."               => true   (only this de-capitalised form)
```

`findAffirmative` (lines 760–770) also compiles the pattern without the `i` flag and `^` without `m`, so
sentence-initial capitals and newline boundaries are missed for every pattern in the set.

---

## 6. Per-bundle findings (evidence, not summary)

Common verified facts: all six bundles are `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY`
(`bundle-definitions.json`; BUNDLE-02 lines 873–915; BUNDLE-26 lines 2162–2201); display names are exactly
`MAREA START/CRUISE/SAIL/PROTECT/COMPLETE/FLEET` and FLEET carries machine `displayName` `MAREA FLEET` plus
`customerFacingName` `MAREA FLEET package` (BUNDLE-02); there are exactly 6 bundles and no tenth family
(BUNDLE-02, BUNDLE-16 lines 1631–1634); each spec has exactly 24 `B##` blocks (144 total) with the five
labelled lines (Definition/Evidence/Owner/References/Release readiness) in order, a valid evidence class on
every Evidence line and a `dimension = value` on every Release-readiness line (BUNDLE-22 lines 1868–1930);
`TBD` is absent; 0 compatibility rows are `SUPPORTED`/`TESTED` (canonical rows 73: 21 + 31 + 21, all
`UNKNOWN`/`PLANNED`/`CONDITIONAL`/`BLOCKED`/`PROHIBITED`).

### 6.1 MAREA START (D2)

- **Configuration.** `HUB-STANDARD` + `NAV-PRO` (spec:47 table header; §B06 line 323; D-019; contract `ST-01`,
  `ST-02`). `NAV-ESSENTIAL` is a documented variant (`S-03`), never additive; `HUB-PRO` is an upgrade
  substitution; chart licence, device/cabling and installation are external or optional (`S-06`–`S-10`).
  AIS, DISPLAY, PILOT, SENSE, WATCH, FLEET, NMEA 2000 and ECDIS are explicit exclusions (`S-11`–`S-18`,
  §B09 line 344).
- **Mandatory/optional correctness.** Exactly two mandatory components, both separately licensed (B06);
  no hidden mandatory purchase; installation is quoted, never assumed included (B07 line 330; §2 rules 9/13).
- **Compatibility/safety.** 0 tested rows; NAV is a navigational aid, never ECDIS; no steering or remote-helm
  path (spec:35, §B11 line 358, §B23 line 442).
- **Price.** EUR 499 historical, `HYPOTHESIS_UNAPPROVED`, product-only uninstalled first-year reference
  against 149 + 349 = 498 (B19 line 414). No installed price.
- **Assessment.** Substantive, internally consistent, evidence-classed. No defect in committed content.

### 6.2 MAREA CRUISE (D3)

- **Configuration.** `NAV-ESSENTIAL` + `HUB-STANDARD` + `AIS-RECEIVER` + `DISPLAY-7` (spec:49; §B06 line 344;
  D-019; contract `CR-01`–`CR-04`). `AIS-CONNECTED` is `CONDITIONAL` and not selected (`CR-06`);
  `DISPLAY-LARGE-CONDITIONAL` is `INELIGIBLE` and never selectable (`CR-07`; BUNDLE-13). AIS VHF antenna and
  splitter are `REQUIRED_EXTERNAL` (`CR-09`); mounts/installation/commissioning external (`CR-10`).
- **Safety/claims.** AIS receive-only, not a transponder, not collision avoidance (B09 line 351; disclaimer in
  both copy files); NMEA 2000 not implemented/licensed/certified; DISPLAY size `SIZE_NOT_FROZEN`
  (`CR-04` role; BUNDLE-13 lines 1503–1513).
- **Price.** EUR 1,399 historical against 99 + 349 + 249 + 699 = 1,396; the `NAV-PRO` variant sums 1,446
  (headline 47 below) — both readings stated, neither supports a fixed price (B19 line 435; pricing doc
  §6.2). Classification `CONFIGURATION_COST_NOT_ESTABLISHED`.
- **Assessment.** No defect in committed content.

### 6.3 MAREA SAIL (D4)

- **Configuration.** `NAV-PRO` + `HUB-STANDARD` + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) + `SENSE-WIND`
  (`CONDITIONAL`) (§B06 line 363; composition table line 69; contract `SL-01`–`SL-05`). `PILOT-PRO` is
  `INELIGIBLE` with no price reference (`SL-06`); `PILOT-SAIL` `CONDITIONAL`, not default (`SL-05`);
  `SENSE-SAIL` kit and `SENSE-SYSTEMS` kit are not included (D8 `SL-07`, `CP-12`).
- **PILOT boundary.** Safety gate `BLOCKED` with `PILOT_PHYSICAL_ESTOP_EVIDENCE = NOT_FOUND`,
  `PILOT_MOTOR_ISOLATION_EVIDENCE = NOT_FOUND`, `PILOT_RUDDER_FEEDBACK_EVIDENCE = NOT_FOUND`,
  `PILOT_SEA_TRIALS = NOT_PERFORMED` (spec:25; also spec:108, 253). Every PILOT line is quotation-only;
  reserve, drive/actuator, labour, commissioning, sea trial, conformity and warranty reserve are external
  quotation scope (contract `SL-08`–`SL-10`). No fixed-price checkout path (§B19 line 454; journeys; install
  model).
- **Price.** `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION`; indicative floor
  149 + 349 + 1,290 + 99 = 1,887 with the 99 explicitly non-attributable, so the -103 difference is not a
  margin (B19 line 454; pricing §6.3).
- **Assessment.** No defect in committed content.

### 6.4 MAREA PROTECT (D5)

- **Configuration.** `WATCH-CORE` + single `SENSE-ESSENTIALS` kit line expanding exactly to
  `SENSE-POWER` + `SENSE-BILGE` (contract `PR-02`; BUNDLE-07/08; D-020; spec table:101). A loose
  `SENSE-POWER`/`SENSE-BILGE` line exists only as `INELIGIBLE` (`PR-03`) — **no duplicate counting**. HUB is
  explicitly **not required** and only `OPTIONAL` (`PR-04`; D-020); WATCH requires an active monitoring
  entitlement (`PR-01`, `PR-07`; `WATCH_MONITORING_SUBSCRIPTION` `requiredBy` PROTECT, COMPLETE); SIM/data is
  `REQUIRED_EXTERNAL` and never inside the hardware/subscription hypothesis (`PR-06`); installation external
  (`PR-08`).
- **Service/claims.** WATCH service/identity/pipeline/subscription/connectivity `NOT_FOUND`; SENSE accuracy
  `NOT_MEASURED`; no guaranteed/immediate alert delivery; no theft-prevention or certified-distress claim;
  no fleet tenancy (B09; B23 line 553; token counts: `NOT_FOUND` ×25, `NOT_MEASURED` ×9).
- **Price.** EUR 399 plus subscription, `HISTORIC_PRICE_NOT_COST_JUSTIFIED`: two-module floor
  299 + 99 + 99 = 497 > 399; only 299 + 99 = 398 fits and contradicts the fixed composition; final price
  `OPEN` (B19 line 525; pricing §6.4).
- **Assessment.** No defect in committed content; composition and double-count rules are the strongest part
  of the milestone.

### 6.5 MAREA COMPLETE (D6)

- **Configuration.** `NAV-PRO` + `HUB-PRO` + `DISPLAY-7` + `WATCH-CORE` + `SENSE-POWER` + `SENSE-BILGE` +
  `SENSE-TANKS` + `SENSE-ENV` + `PILOT-COASTAL` (`QUOTATION_REQUIRED`) (§B06 line 347; spec table:73;
  contract `CP-01`–`CP-09`). AIS and WEATHER are `OPTIONAL` and never automatic (`CP-10`, `CP-11`);
  `PILOT-PRO` `INELIGIBLE`; `PILOT-SAIL` `CONDITIONAL`; `DISPLAY-LARGE-CONDITIONAL` `INELIGIBLE`
  (`CP-15`); full survey and quotation scope external (`CP-16`, `CP-17`).
- **PILOT/DISPLAY.** Safety gate `BLOCKED`, E-stop/motor-isolation/rudder `NOT_FOUND`, sea trials
  `NOT_PERFORMED` (spec:25, 241); `SIZE_NOT_FROZEN` (3 occurrences; BUNDLE-13).
- **Price.** `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED`, `VESSEL_SPECIFIC_QUOTATION`; indicative floor
  149 + 499 + 699 + 299 + 396 + 1,290 = 3,332 vs 3,490 — approximately 158 for an unbounded installed scope
  (B19 line 438; pricing §6.5).
- **Assessment.** No defect in committed content.

### 6.6 MAREA FLEET package (D7)

- **Boundary.** Bundle id `FLEET`, machine `displayName` `MAREA FLEET`, customer-facing `MAREA FLEET package`
  (contract; BUNDLE-02); it is a package composing the FLEET SaaS family (`FLEET-START`/`FLEET-BUSINESS`,
  `FLEET-ENTERPRISE` contracted) with onboarding/registration/migration/training/support and optional or
  quoted hardware/connectivity/installation (`FP-01`–`FP-12`; §B06 line 730; §B09 line 738; D-022). Not a
  tenth family (BUNDLE-16).
- **Frozen flags.** `contractedSolution = true`, `hardwareIncludedByDefault = false`,
  `onboardingPricingEstablished = false`, `fixedPackagePriceEstablished = false` (BUNDLE-16 lines 1597–1644;
  spec §1.1).
- **Price.** No package price; three SIP hypotheses 49/79/none at `HYPOTHESIS_UNAPPROVED`; hardware and
  connectivity never inside the per-vessel fee (B19 line 834; pricing §6.6).
- **Assessment.** No defect in committed content; package/product-family disambiguation is explicit in the
  specification and in both copy files (`copy/fleet-package.en.md:7,13`; `.es.md:7,13`).

---

## 7. Price and PILOT/quotation review

### 7.1 Independent arithmetic check

I recomputed every figure from the named hypotheses in `BUNDLE-PRICING-AND-UNIT-ECONOMICS.md` §6 and the six
specifications:

| Bundle | Historical | Components used (permitted hypotheses) | Recomputed sum | Difference | Correct classification | Committed verdict | Verified |
| --- | ---: | --- | ---: | ---: | --- | --- | --- |
| START | 499 | 149 + 349 | **498** | headline is 1 above | `CONFIGURATION_COST_NOT_ESTABLISHED`; `HYPOTHESIS_UNAPPROVED`; product-only, uninstalled, first year | Same | YES |
| CRUISE | 1,399 | 99 + 349 + 249 + 699 = 1,396; NAV-PRO variant 149 + 349 + 249 + 699 = 1,446 | **1,396 / 1,446** | 3 above / 47 below | `CONFIGURATION_COST_NOT_ESTABLISHED`; `HYPOTHESIS_UNAPPROVED` | Same, both readings stated | YES |
| SAIL | 1,990 | 149 + 349 + 1,290 + 99 (99 explicitly non-attributable) | **1,887** | 103 above, not a margin | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION` | Same | YES |
| PROTECT | 399 | 299 + 2×99 = 497; one-module 299 + 99 = 398 | **497 > 399** | shortfall 98 | `HISTORIC_PRICE_NOT_COST_JUSTIFIED`; final price `OPEN` | Same, 1-module alternative stated | YES |
| COMPLETE | 3,490 | 149 + 499 + 699 + 299 + 396 + 1,290 | **3,332** | 158 above, untenable | `FULL_BUNDLE_PRICE_NOT_ESTABLISHED` / `VESSEL_SPECIFIC_QUOTATION`; `FIXED_TURNKEY_PRICE = NOT_ESTABLISHED` | Same | YES |
| FLEET package | bespoke | `FLEET-START` from 49 / `FLEET-BUSINESS` 79 per vessel-month; no sum permitted | **no sum** | not computable | `BESPOKE_PACKAGE_NOT_ESTABLISHED` | Same | YES |

The arithmetic is correct in all six cases, and the document says exactly what the numbers support and no
more (e.g. START/CRUISE are “product-only, uninstalled, first-year” references; PROTECT's shortfall is
stated as arithmetic on hypotheses, not as a cost assertion; SAIL/COMPLETE are explicitly quotations).

### 7.2 Are unsupported inputs used as if verified?

No. §4.1 lists the only permitted named hypotheses; §4.2 lists objects with no established price where no
amount may be attached or derived; the `SENSE` entry hypothesis (from EUR 99) is used only as an explicitly
labelled **non-attributable placeholder** (pricing §6.3/§6.4/§6.5; spec B19 SAIL/COMPLETE); the kit has no
price and is excluded; the WATCH subscription is excluded from all hardware sums; no BOM, supplier quote,
labour rate, connectivity cost, VAT rate (except a 21 % scenario explicitly labelled `ASSUMPTION`), margin,
mark-up, LTV or payback is substituted as evidence (grep: no margin percentage exists; the only “%” figures
are the labelled VAT scenario, pricing doc lines 292, 1116, 1392). “Approved/final/purchasable/orderable”
tokens: `FINAL` 0, `PURCHASABLE` 0, `FOR SALE` 0, `ORDERABLE` 0 in the pricing document; the 41 `APPROVED`
occurrences are `HYPOTHESIS_UNAPPROVED` or explicit negations.

### 7.3 D-023 / D-025 alignment

- **D-023** (`DECISION-LOG.md:841`) records every historical figure as `HYPOTHESIS_UNAPPROVED` and fixes the
  six verdicts exactly as the documents and the machine contract state; the contract's
  `priceHypothesisRegister` (`PH-01`–`PH-06`) carries the same amounts/statuses (`499/1399/1990/399/3490`,
  FLEET `NOT_ESTABLISHED`) and BUNDLE-19 pins bundle verdicts, reference basis, `fixedTurnkeyPriceApproved =
  false`, `totalPriceEstablished = false` and PROTECT's `finalPriceEstablished = false`. **Consistent.**
- **D-025** (`DECISION-LOG.md:906`) records that “certified supervised pilot” is unsupported historical
  wording, that it is not carried into any bundle, and that any certification ambition is a separate
  milestone. The six specs, the 12 copy files and the contract carry no certification claim (claim scan and
  my line-by-line copy scan; BUNDLE-26/32; `certified` occurrences are all negations or exclusions).
  **Consistent.**

### 7.4 PILOT quotation boundary

- SAIL and COMPLETE are quotation-only: `fixedTurnkeyPriceApproved=false`, `pilotSurveyRequired=true`,
  `quoteRequired=true`, `totalPriceEstablished=false`, verdict `FULL_BUNDLE_PRICE_NOT_ESTABLISHED`
  (contract; BUNDLE-10 lines 1280–1340).
- `PILOT-COASTAL` is `QUOTATION_REQUIRED` in both bundles; `PILOT-PRO` is `INELIGIBLE` in both, carries no
  price reference and is never a priced retail line (BUNDLE-10; my P14/P31 rejected).
- No fixed-price checkout path exists: `BUNDLE-ARCHITECTURE.md` §9 (lines 363–381), the journeys' “Purchase
  or quote” stage (“nothing is ordered via checkout”, journeys:82–190), and
  `BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md` (§1/§3/§5) all state that no checkout, price or orderable
  path exists for any bundle.
- No remote/autonomous/steering-authority claim anywhere: the PILOT disclaimers are verbatim in SAIL and
  COMPLETE copy; the claim scanner plus my copy scan found only negations (“does not provide autonomous
  steering or unattended remote control”); the contract sets `remoteHelmControl = PROHIBITED` and
  `remoteSteeringAllowed = false`; my P20 (safety function gated by entitlement) and `steeringAuthority`
  probes were rejected (BUNDLE-18/28).
- No certification claim (D-025; see §7.3).

**Price/PILOT verdict: VERIFIED — arithmetic correct, classifications correct, no approved/final price or
margin, quotation boundary intact.**

---

## 8. Entitlements/isolation and FLEET tenancy review

### 8.1 Subscription isolation and entitlements

- **WATCH requires a monitoring entitlement.** `WATCH_MONITORING_SUBSCRIPTION` is required by PROTECT and
  COMPLETE; every WATCH component line carries a `subscriptionEntitlement` and the bundle must declare the
  recurring entitlement (BUNDLE-11 lines 1344–1429; my P16 removal rejected).
- **No subscription-free cloud monitoring.** `NO_SUBSCRIPTION_FREE_CLOUD_MONITORING` is a frozen isolation
  rule, and `CLOUD_MONITORING` is “only offered with an active WATCH monitoring subscription; no
  subscription-free cloud monitoring, no guaranteed immediate delivery, notification pipeline `NOT_FOUND`”
  (contract `entitlementsMatrix`; BUNDLE-11).
- **NAV/WEATHER one ledger.** D-013 is honoured: one account, one entitlement ledger, the same forecast
  entitlement is never billed twice across NAV and WEATHER; `WEATHER_SUBSCRIPTION` has
  `doubleBillingAllowed=false` (BUNDLE-12 lines 1433–1468; my P15 rejected).
- **FLEET hardware not in the per-vessel fee.** Frozen flags and `BUNDLE-16`; `FP-08` connectivity is
  `REQUIRED_EXTERNAL`; `FP-05`/`FP-06` hardware optional with their own subscriptions; `includesHardware =
  false` for every recurring subscription (BUNDLE-28 lines 2255–2265).
- **Local safety survives expiry.** `subscriptionIsolationRules` contain `STEERING_NOT_GATED`,
  `LOCAL_SENSING_NOT_GATED`, `LOCAL_ALARMS_NOT_GATED`, `PAYMENT_FAILURE_NEVER_DISABLES_LOCAL_FUNCTIONS`; the
  §10 isolation table (`BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md:223–247`) states for eleven commercial
  events that manual/local steering, local measurement, local alarms and the approved fallback are not
  affected; every row is `OPEN`/design-only and the document explicitly says this is not tested behaviour and
  does not override `PILOT_SAFETY_GATE = BLOCKED`, `SENSE` `NOT_MEASURED` or `WATCH` `NOT_FOUND`.
- **No double billing.** No bundle lists a duplicate recurring entitlement (BUNDLE-12), no non-subscription
  family carries a subscription (entitlements doc §9), and every entitlement record sets
  `doubleBillingAllowed=false`, `gatesLocalSafety=false` (BUNDLE-12/28; my P15/P20 rejected).

### 8.2 FLEET tenancy and package boundary

`MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` and the machine contract verify the boundary:

- **Eight roles** (`ORGANIZATION_OWNER`, `ORGANIZATION_ADMIN`, `FLEET_MANAGER`, `MAINTENANCE_MANAGER`,
  `CREW_MEMBER`, `READ_ONLY_VIEWER`, `EXTERNAL_INSTALLER`, `EMBARCARTE_SUPPORT`) — all eight present
  (spec:452; 8/8 matched).
- **Server-side authorisation** and organisation-scoped tenancy mandatory
  (`tenancyBoundaries.organizationScopedTenancy=true`, `serverSideAuthorizationRequired=true`,
  `defaultRole=NO_ACCESS`; BUNDLE-17).
- **No cross-tenant access**: `crossTenantAccessAllowed=false` and BUNDLE-17 rejects a true value (my P11
  rejected; spec has 4 explicit cross-tenant statements).
- **External installer is not an administrator**: “An installer never becomes an unrestricted organization
  administrator. The `EXTERNAL_INSTALLER` … time-bound and vessel-level” (spec:465; acceptance test
  FLEET-PKG-AC-04 at spec:592); support access “never becomes an organization administrator” (spec:459).
- **A device confers no tenant access** by itself (spec:594, FLEET-PKG-AC-06).
- **Read-only telemetry**, no vessel-control path (`telemetryReadOnly=true`, `remoteSteeringAllowed=false`;
  spec 15 “read-only” statements; copy echoes the exclusion).
- **No invented SLA or customer reference**: `slaState=NO_SLA_ESTABLISHED` (13 occurrences in the spec;
  BUNDLE-17), no customer name/logo/testimonial anywhere, and the copy excludes references/logos/testimonials
  explicitly. My P10/P11/P23 probes were rejected.

**Entitlement/tenancy verdict: VERIFIED in the committed content.**

---

## 9. ES/EN copy and content review

All 12 files were parsed and read line by line.

| Criterion | Result |
| --- | --- |
| Exactly 24 numbered sections per file | 12/12 files: sections 1–24 in order (BUNDLE-23 lines 1934–2000; independent parse) |
| ES/EN structure match | Every pair has identical section numbers and a parallel 24-section structure; titles are translated (bundle/product names untranslated: `MAREA START/CRUISE/SAIL/PROTECT/COMPLETE/FLEET`, `MAREA NAV/HUB/AIS/PILOT/SENSE/WATCH/DISPLAY/WEATHER/FLEET` preserved in both languages) |
| Required verbatim disclaimers | Navigation disclaimer in all 12 (validator normalised comparison); AIS disclaimer verbatim in CRUISE and COMPLETE; PILOT disclaimer verbatim in SAIL and COMPLETE; weather disclaimer present in START and CRUISE (the two copies that present the WEATHER forecast service; see minor m-03); brand attribution “MAREA is a product brand of EMBARCARTE” / “MAREA es una marca de producto de EMBARCARTE” present in all 12 |
| Zero currency / prices | No `€`/`EUR`/`euros`/price pattern in any file (validator `copyForbidden`; independent scan `currency=false`, `enabledBuyCta=false` for all 12) |
| Zero stock / reviews / certifications / availability claims | Every occurrence is a negation or exclusion (“no stock”, “no certification”, “not for sale”, “no reviews”, “no availability”); no affirmative claim found |
| No enabled purchase CTA | No “buy now/add to cart/order now/purchase now/comprar ahora/añadir al carrito/haz tu pedido”; only future-intention CTAs (request survey/quotation/assessment, explore configuration, ask about installation) — BUNDLE-23 and independent scan |
| No turnkey/autonomous/guaranteed-delivery claims | Only negations (“does not provide autonomous steering or unattended remote control”, “immediate receipt is not guaranteed”, “no fixed turnkey price”, “not a guaranteed … service”) |
| Not published | All 12 carry “DRAFT — INTERNAL ONLY — NOT PUBLISHED — NOT FOR SALE”; no route/page/publication metadata anywhere |

Copy is commercially honest and clear: it separates what is defined from what is available, explains licence
and connectivity dependencies, disambiguates FLEET family versus package, and repeats the safety limits. The
only content-level copy gap is the partial disclaimer-enforcement observation (m-03, §12), which is a gate
issue, not a false statement in the committed copy.

---

## 10. Assets review

- **Counts and reconciliation.** 60 planned assets = **24** `BLOCKED_ON_IMAGE_GENERATION` + **30**
  `CONCEPT_REUSED_MC04_VECTOR` + **6** `AUTHORED_SPECIFICATION_PLANNED` (`bundle-definitions.json`
  `assets`; BUNDLE-24 lines 2004–2102; asset doc §10 lines 297–313 states the same reconciliation).
- **Per-bundle identity.** 10 assets per bundle with prefixes `START-`, `CRUISE-`, `SAIL-`, `PROTECT-`,
  `COMPLETE-`, `FLEETPKG-` (the `FLEETPKG` prefix is deliberate and avoids collision with the existing FLEET
  product asset set — asset doc line 34; D-024). Every bundle's `content.assetRefs` lists exactly its ten
  assets.
- **ES/EN alt text.** All 60 records carry non-empty `altText.es` and `altText.en`; no record claims to be a
  real product (`realProduct !== true` for all 60); every record is `INTERNAL_ONLY`.
- **No generated file.** No image/font/binary was added in the diff; the milestone generated, downloaded and
  published nothing (also `BUNDLE-ARCHITECTURE.md` §9: image generation `BLOCKED` X-03; asset doc §11 blocker
  register).
- **Truthfulness.** Every asset is a planning requirement with status, dimensions, source/reuse reference,
  rights constraints and `PUBLICATION_BLOCKED`/`INTERNAL_ONLY`; no photograph, CGI or render is claimed to
  exist.

**Assets verdict: VERIFIED (60 = 24 + 30 + 6; FLEETPKG; bilingual alt text; no real-product or generated
file claim).**

---

## 11. Governance review

| Item | Verified state |
| --- | --- |
| D-018 – D-025 present and consistent | `DECISION-LOG.md` lines 676, 711, 748, 778, 810, 841, 873, 906. D-018 (bundle contract type, no inherited approval), D-019 (fixed reference configurations), D-020 (PROTECT kit/no duplicate/no HUB), D-021 (SAIL/COMPLETE quotation, PILOT never priced), D-022 (FLEET package vs SaaS, frozen flags), D-023 (prices unapproved, verdicts), D-024 (17-stage reconciliation, 60-asset identity), D-025 (no “certified pilot”). All match the committed documents and the machine contract |
| Registry row 08 | `MASTER-PROMPT-REGISTRY.md:54` — row 08 still **`IN PROGRESS`**, with the branch/base and “D1–D21 in progress”. It does **not** claim PASS or a delivered review. The delivery/review commit will close it |
| Premature PASS | No MC-08 delivery record exists (`MC-08-DELIVERY.md` absent); the documents use hypothetical wording only (“MC-08 may PASS its internal bundle-definition scope…”, `BUNDLE-ARCHITECTURE.md:379`; “If MC-08 passes…”, pricing doc §15). No committed claim of a PASS or a review verdict precedes this review |
| Contract/decision traceability | The contract lists D-018–D-024 in `decisions` (BUNDLE-27 requires D-018…D-024 present and Lead-recorded; my R08 rejected a missing D-018); source documents are checked to exist (BUNDLE-27) |
| Publication/sale state | `publicationState=INTERNAL_ONLY`, all six bundles `NOT_FOR_SALE`; no public page/route/catalogue/checkout; no stock/lead time; no certification; `MERGE/DEPLOY` not performed (architecture §9; BUNDLE-26; BUNDLE-02) |
| Script changes | Only the declared `format`/`format:check` list extension and the two new `test:bundles*` scripts; no dependency, no toolchain or permission change |

**Governance verdict: VERIFIED.**

---

## 12. Findings

Severity: BLOCKING / MAJOR / MINOR / OBSERVATION. The reviewer fixes nothing; every disposition is routed to
the Lead. File paths are relative to the repository root; `:line` refers to the frozen commit.

**Round-2 disposition summary (correction commit `a977b39`, full evidence in §15.3).** B-01, B-02, M-01,
M-02, M-03, m-01, m-02 and m-03 were corrected and independently re-verified: every one of the 17 mandated
re-review probes and all 10 regression probes are now rejected with the expected check ids, with no weakened
check and no regression. Residuals: **R-01** (the B-01 class remains open for natural name-subject/modal
phrasings, MAJOR), **R-02** (a quoted governance example is falsely rejected, MINOR), **R-03** (the
configuration-rules disclaimer table omits FLEET for the AIS surface, MINOR) and **R-04** (the FLEET
specification still cites the pre-rename rule id `CR-07`, MINOR) — all in §15.6. O-01 remains open and outside
the correction scope; O-02 remains harmless. The findings below are preserved as the round-1 record; each
carries its round-2 disposition.

### BLOCKING

**B-01 — The claim scanner cannot detect a normal “for sale” assertion (BUNDLE-26 / BUNDLE-32 advertised as
“no sale/approval/clearance claim found”).**
*Round-2 disposition: CORRECTED for the reported and natural determiner/pronoun sentences (`a977b39`; new
tests at `scripts/check-marea-bundles.test.mjs:518,530`); the class is not fully closed — residue R-01
(name-subject/modal phrasings) remains open in §15.6.*
Evidence: `scripts/check-marea-bundles.mjs:691–695` (pattern 2) and `:760–770` (`findAffirmative` compiles
without `i`/`m`); direct evaluation of the regex: `"This bundle is now for sale."` → false,
`"The bundle is for sale."` → false, `"It is for sale."` → false, `"This product is orderable."` → false,
`"The package is now purchasable."` → false; only the de-capitalised `"bundle is for sale."` matches. My
probes P27, Q03, Q04 and 4 case variants appended such sentences to
`docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md` and the validator exited 0 with no failing check.
Why it matters: D-018 and the MC-08 mandate require the validator to reject any sale/approval state; the
canonical English phrasing of a sale claim sails through the only prose gate. A future author could convert
an internal definition into an apparent sale statement and the gate would not object.
Required correction (Lead): make the subject phrase compositional (optional determiner + noun) or replace
pattern 2 with a simpler `\b(?:this|the|it)\b[^.\n]{0,20}\b(?:bundle|package|solution|product)\b[^.\n]{0,20}\b(?:is|are)\b[^.\n]{0,10}\b(?:for sale|orderable|purchasable|available to buy)\b`
style; add the `i` flag and `\n` boundary handling; add a negative unit test that injects the sentence into a
specification and into a copy file and asserts BUNDLE-32/BUNDLE-26 fails. Do not weaken the existing JSON
checks.

**B-02 — A guaranteed-immediate-alert claim in the customer-facing copy is not detected.**
*Round-2 disposition: CORRECTED — BUNDLE-15 now scans the twelve copy files with the shared guaranteed-delivery
pattern (`scripts/check-marea-bundles.mjs:770,1730`); my EN and ES copy probes are rejected.*
Evidence: `scripts/check-marea-bundles.mjs:1586–1592` — the guaranteed-alert scan targets only
`CONTRACT_PATH` and the six specification files; the 12 copy files are **not** in that scan set, and
`claimPatterns` (`:685–728`) contains no guaranteed-delivery pattern. My probes P19 (EN) and Q02 (ES)
appended an affirmative “guaranteed immediate” alert sentence to `copy/start.en.md` / `copy/start.es.md`;
the validator exited 0 with no failing check. The same claim in a specification **is** rejected (my Q01 →
BUNDLE-15). The committed copy itself is clean (verified line by line; “immediate receipt is not
guaranteed”).
Why it matters: this is exactly the mandated blocking-if-accepted probe (“guarantee immediate alerts”), on
the one surface a customer would actually read. A guarantee of alert delivery is a safety-adjacent commercial
claim that MC-08 forbids.
Required correction (Lead): add the 12 copy files (or all scanned prose) to the guaranteed-alert scan in
BUNDLE-15, or add a guaranteed/immediate-delivery pattern to `claimPatterns` — BUNDLE-26 already scans the
copy files (`:2183–2198`), so the missing piece is the pattern, not the file list — and add a negative test
for the copy surface.

### MAJOR

**M-01 — A `CONDITIONAL` (not-selected) component can be promoted to `INCLUDED` without failing.**
*Round-2 disposition: CORRECTED — BUNDLE-34 (`scripts/check-marea-bundles.mjs:2621`) pins all 63 reference
lines; conditional→included and unpinned extra INCLUDED probes are rejected.*
Evidence: `FIXED_REFERENCE` (`scripts/check-marea-bundles.mjs:295–328`) and BUNDLE-09 (`:1247–1276`) only pin
the lines they list and the presence of required external scope; BUNDLE-08 (`:1192–1243`) only detects
duplicates. My probe Q07 changed CRUISE line `CR-06` (`AIS-CONNECTED`, `CONDITIONAL`, not selected per D-019)
to `INCLUDED`: the validator exited 0. A promotion of `WATCH-PLUS` (`PR-05`) or `PILOT-SAIL` (`SL-05`) to
`INCLUDED` is equally undetected (subject to the PILOT-specific rule for `PILOT-PRO`).
Why it matters: a conditional or not-selected product could silently become a mandatory bundled purchase,
which contradicts D-019 (“`AIS-CONNECTED` is `CONDITIONAL` and not selected”), the “no hidden mandatory
purchase” criterion and the frozen reference configurations.
Required correction (Lead): pin the expected inclusion class for **every** reference line (including
`CONDITIONAL`/`INELIGIBLE`), and reject any `INCLUDED` component that is not in the fixed reference
composition for that bundle; add a negative test.

**M-02 — `component.inclusion` is never validated against the declared `inclusionVocabulary`.**
*Round-2 disposition: CORRECTED — BUNDLE-33 (`scripts/check-marea-bundles.mjs:2588`) validates every line
inclusion against the vocabulary, forbids sale/approval tokens and rejects component-level sale fields; my
`ST-03 = APPROVED` probe is rejected.*
Evidence: the vocabulary is declared at `scripts/check-marea-bundles.mjs:101–109` and compared **only** as a
contract-level field at `:1012` (`compare('inclusionVocabulary', …)`); no check validates individual
component lines. My probe Q06 changed START line `ST-03` (an `OPTIONAL` line outside `FIXED_REFERENCE`) to
`inclusion = "APPROVED"`: the validator exited 0 with no failing check. (`PILOT-PRO`-specific and
reference-line checks happen to catch some variants, but there is no general rule.)
Why it matters: D-018 states that no bundle may inherit a sale/approval state; an approval token can live in
the line-level inclusion field of the machine contract — the field future configurators and portals will
consume.
Required correction (Lead): validate every `component.inclusion ∈ INCLUSION_VOCABULARY` and explicitly reject
`ORDERABLE`/`FOR_SALE`/`PURCHASABLE`/`APPROVED`/`PUBLISHABLE` at line level; add a negative test.

**M-03 — Claim scanning is case-sensitive and boundary-limited (capitalised/paragraph claims escape every
pattern).**
*Round-2 disposition: CORRECTED — the claim patterns are case-insensitive and line-start/newline safe
(`scripts/check-marea-bundles.mjs:790`); paragraph-start, capitalised and file-start probes are rejected.*
Evidence: `scripts/check-marea-bundles.mjs:685–728` defines patterns without the `i` flag, and
`findAffirmative` (`:760–770`) preserves flags, with `^` un-multilined and a boundary class that excludes
newlines. My case probes show the same sentence accepted whether lower-case or capitalised, at paragraph
start or file start. R10 shows the lowercase approved-price phrasing **is** caught (BUNDLE-26/32), proving
the mechanism works but only for the exact casing/boundary shape.
Why it matters: prose claims normally start sentences with a capital and paragraphs with a newline; the gate
therefore under-detects sale, approval, clearance and certification claims across all scanned documents.
Required correction (Lead): add the `i` flag and `m`/newline boundary handling to the claim patterns (or
normalise case before scanning), then re-run the suite and add the negative tests from B-01.

### MINOR

**m-01 — The `DISPLAY-LARGE-CONDITIONAL` ineligibility line can be deleted without failing.**
*Round-2 disposition: CORRECTED — BUNDLE-13 now requires the INELIGIBLE guard line in CRUISE and COMPLETE
(`scripts/check-marea-bundles.mjs:1611`); the deletion probe is rejected.*
Evidence: BUNDLE-13 (`scripts/check-marea-bundles.mjs:1482–1514`) rejects the line only when it is present
with `inclusion !== 'INELIGIBLE'`; if the line is removed entirely from CRUISE and COMPLETE, the validator
passes. My probe P22 deleted it and the run exited 0.
Why it matters: the committed contract records the conditional large display as `INELIGIBLE`; deleting the
line removes the explicit evidence that it was assessed and precluded, while the copy/specs still refer to it.
The authority requirement is “never selectable”, which absence satisfies literally but not auditably.
Required correction (Lead): either require the `DISPLAY-LARGE-CONDITIONAL` line in CRUISE and COMPLETE with
`INELIGIBLE`, or record explicitly that omission is an acceptable representation; add a small test.

**m-02 — Line-id namespaces diverge between the human composition register (D8) and the machine contract
(D17), and configuration-rule ids collide with the CRUISE line prefix.**
*Round-2 disposition: CORRECTED for the namespace — configuration rules are `CFG-01`–`CFG-12` in the contract
and documentation, BUNDLE-25 validates the CFG namespace and rejects a collision
(`scripts/check-marea-bundles.mjs:2315`), and the rename leaves no dangling rule reference inside the changed
files; residue R-04 (FLEET specification still cites `CR-07`) remains in §15.6.*
Evidence: `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md:104` (`ST-08` as `NOT_INCLUDED`), `:140` (`SL-07`
`NOT_INCLUDED`), `:181` (`CP-12` `NOT_INCLUDED`) have no counterpart in `bundle-definitions.json`;
`BUNDLE-COMPOSITION-AND-EXCLUSIONS.md:141` defines `SL-08` as the whole installed scope (survey, drive,
labour, …) whereas the machine contract `SL-08` is only the vessel/steering survey (drive/actuator/labour are
`SL-09`/`SL-10`); and `bundle-definitions.json` `configurationRules` ids `CR-01`–`CR-12` (lines 9069–9168)
reuse the same `CR-NN` tokens as the CRUISE component line ids `CR-01`–`CR-11`. BUNDLE-03 registers line
ids, configuration-rule ids and conflict-rule ids in separate sets, so it cannot detect the cross-namespace
collision.
Why it matters: D-018/D-024 make identifier traceability part of the governance model; the same id currently
means different objects in two authorities, which will confuse the MC-16/MC-23/MC-24 configurators the
decision says must reuse this contract.
Required correction (Lead): align the contract and D8 line ids or declare and enforce that the contract
models only includable lines with a documented mapping; rename configuration rules to a distinct prefix
(e.g. `CFG-01`) so `CR-NN` is unambiguously a CRUISE line id.

**m-03 — Approved-disclaimer enforcement is partial (weather disclaimer and brand attribution).**
*Round-2 disposition: CORRECTED for the deterministic items — the weather disclaimer is enforced on the
START/CRUISE forecast surfaces and the AIS disclaimer is extended to the FLEET package copy
(`scripts/check-marea-bundles.mjs:2113,2132`), with the surface interpretation recorded in
`BUNDLE-ARCHITECTURE.md:383`; my removal probes (EN/ES weather, FLEET AIS) are rejected. Residue R-03 (the
configuration-rules table omits FLEET for AIS) remains in §15.6.*
Evidence: `COMMERCIAL-BRAND-CLAIMS-POLICY.md` §9 (lines 185–223) defines navigation, AIS, PILOT, weather and
brand-attribution disclaimers. BUNDLE-23 (`scripts/check-marea-bundles.mjs:1934–2000`) enforces the
navigation disclaimer in all 12 files, AIS in CRUISE/COMPLETE and PILOT in SAIL/COMPLETE; it does not check
the weather disclaimer or the brand-attribution footer. In practice the committed copy carries brand
attribution in all 12 files, and the weather disclaimer appears only in `copy/start.*.md` and
`copy/cruise.*.md` — the two files that present the WEATHER forecast service; SAIL/COMPLETE/FLEET mention
MAREA WEATHER only as a separate excluded/optional product without presenting forecast data.
Why it matters: the interpretation is defensible, but a documented policy rule is only partially gated; an
author could add a weather/forecast surface without the approved wording and the gate would pass.
Required correction (Lead): record the surface-based interpretation in the copy/asset documentation and add
the weather disclaimer check where a copy presents forecast services, or state in the copy documentation and
the D18 validator notes why the two remaining §9 items are out of gate scope; add a test either way.

### OBSERVATION

**O-01 — Unknown extra JSON fields are tolerated.** My probe P30 added a top-level bundle field
`forSale: true` to START; the validator passed because checks require specific keys but do not reject unknown
ones. No consumer exists yet, and the documents/contract controls still say `NOT_FOR_SALE`, so risk is low
today; when MC-16/MC-23/MC-24 consume the contract, an unknown-key rejection (or JSON-schema validation)
would make the contract closed rather than open.

**O-02 — Redundant and indirect check logic (no behavioural risk).**
`scripts/check-marea-bundles.mjs:1149–1153` repeats the `EXPECTED_KITS` presence loop inside the per-bundle
loop (12 redundant evaluations); `:1804–1808` (`bundleIdStatusInvalid`) duplicates conditions already
checked at `:1761–1776`. Both are harmless but slightly reduce the auditability of the check list.

---

## 13. Residual risks and honest limits of this review

1. **Definition scope only.** This review verifies documents, contracts, copy plans and a validator. It does
   not verify hardware, a bill of materials, supplier quotations, labour, certification, sea trials,
   compatibility, a deployed service or a price. No physical, financial or legal milestone is PASSed by this
   review; the commercial release status remains BLOCKED / NOT_FOR_SALE.
2. **Gates not re-run.** `build`, `test:e2e`, `test:backup` and `test:performance` were not re-run: the diff
   changes no `src/`, `public/`, `e2e/` or configuration file, so they cannot regress from this commit, but
   their MC-07 results are recorded evidence and were not independently re-verified here. Chromium-based e2e
   was deliberately not started.
3. **Authority documents sampled, not fully re-read.** I verified the nine-product authority through the
   validator, targeted greps (`N10`, `N11`, `N04`, `AIS-CONNECTED`, `DISPLAY-LARGE-CONDITIONAL`,
   `PILOT-PRO`, `SENSE-ESSENTIALS`), the editions/compatibility/pricing contracts and the brand policy §9
   text. I did not re-read `docs/marea/products/README.md` §1–§32 line by line; where a bundle spec cites a
   product-dossier section number I verified the key referenced facts (e.g. `N10` is `NOT_INCLUDED` in
   NAV Essential and `INCLUDED` in NAV Pro, `PRODUCT-EDITIONS-NAV-HUB-AIS.md:93`), not every citation.
4. **Copy review is automated plus spot-read.** All 12 files were parsed for structure, disclaimers,
   currency, CTAs and claim tokens, and the hits were read in context; a native-speaker stylistic review was
   not performed. No untranslated-string or broken-link scan beyond the repository's i18n gate was run
   (the copy drafts are not routed pages, so `test:i18n` does not cover them).
5. **The validator gaps are real but only exploitable by future edits.** The committed tree contains no false
   claim; the accepted mutations are synthetic. The residual risk is that a later author edits the bundle
   docs/contract and the gate fails to notice the specific states in §12.
6. **Commercial and legal facts remain external and unresolved.** Brand `NOT_GRANTED`, source IP
   `NOT_CLEARED`, provider data rights `NOT_GRANTED`, chart licences, VAT treatment, seller identity,
   warranty, installer network, WATCH service existence, FLEET platform and SLA are all OPEN/BLOCKED and
   cannot be closed by documentation. The six price figures are unapproved hypotheses; no cost, margin, BOM
   or supplier quote exists.
7. **No cross-check of the delivery narrative.** I reviewed the commit, not the author's delivery report
   (which does not exist in the tree at `930fc9c`). The registry row remains `IN PROGRESS`; this review does
   not close it.

---

## 14. Interim verdict at 930fc9c (round 1)

### 14.1 Interim verdict (superseded by §16 after re-verification): **PARTIAL**

Reasoning, stated precisely:

- **Verified (evidence-backed):** the frozen tree and authorised diff scope; all declared and re-run gates
  (32/32, 31/31, 52/52, 106/106, 13/13, 21/21, format and diff checks); six bundle definitions and
  reference configurations against the nine-product authority; 144 B-blocks with five labelled lines;
  composition correctness (including PROTECT's single-kit no-duplicate rule and no mandatory HUB); the
  price challenge arithmetic in all six cases and the correct classification of every figure; the PILOT
  quotation boundary and safety evidence (`BLOCKED`, `NOT_FOUND`, `NOT_PERFORMED`); subscription isolation
  and no-double-billing rules; the FLEET eight-role/tenancy/package boundary; ES/EN copy parity,
  disclaimers, zero prices/CTAs/claims; the 60-asset plan (24 + 30 + 6, FLEETPKG, bilingual alt text, no
  generated file); D-018–D-025 and the `IN PROGRESS` registry row; and the absence of any sale, publication,
  price approval, compatibility or certification claim.
- **Not verified / defective:** the D18 validator's negative-test guarantee is incomplete. Two BLOCKING
  defects (B-01: normal “for sale” prose is not detected; B-02: a guaranteed-immediate-alert claim in the
  customer-facing copy is not detected), three MAJOR coverage gaps (M-01 conditional→included promotion,
  M-02 line-level inclusion vocabulary, M-03 claim-scan case/boundary handling) and three MINOR gaps
  (m-01 deleted display guard line, m-02 line-id namespace divergence, m-03 partial disclaimer enforcement).
- **Why PARTIAL and not PASS:** a PASS would certify that the milestone's own gate enforces the frozen
  prohibitions; it does not. The mandated probe “guarantee immediate alerts” is accepted on the copy
  surface, so the milestone cannot cite its validator as the negative-test evidence until corrected.
- **Why PARTIAL and not FAIL:** no committed deliverable makes a prohibited claim. The content itself is
  commercially honest, internally consistent and evidence-classed; the corrections are confined to
  `scripts/check-marea-bundles.mjs`, `scripts/check-marea-bundles.test.mjs` (plus the documentation
  consistency fixes of m-02/m-03). Nothing in the frozen tree needs rewriting to remove a false or
  purchasable statement, and all real gates pass.

### 14.2 Exact correction required for a re-review (routed to the Lead; I fix nothing)

1. Fix `claimPatterns[1]` and generalise the claim scan (B-01, M-03): compositional subject, `i` flag,
   newline/`m` boundary; keep the JSON-level checks.
2. Add the 12 copy files to the guaranteed-alert scan or add a guaranteed-delivery pattern that covers
   prose copy (B-02).
3. Pin the inclusion class of every reference line and reject extra/cross-class `INCLUDED` lines (M-01).
4. Validate every `component.inclusion` against `INCLUSION_VOCABULARY` (M-02).
5. Add negative unit tests for each of the above on the real surfaces (spec prose, copy prose, line-level
   inclusion), plus the m-01 display-guard presence test if the presence requirement is retained.
6. Align or explicitly map the D8/D17 line ids and rename the `CR-NN` configuration rules (m-02); record the
   disclaimer surface interpretation and gate the weather disclaimer where forecast services are presented
   (m-03).
7. Re-run `npm run test:bundles`, `npm run test:bundles:unit`, `test:products`, `test:products:unit` and
   `format:check`, then request a re-review of the new commit. A re-review that confirms items 1–6 should
   yield PASS for the definition scope, with the commercial status still BLOCKED / NOT_FOR_SALE.

### 14.3 What a PASS would and would not mean

A PASS on MC-08 (definition scope) would mean: the six bundle definitions, contract, copy plan, asset plan,
pricing classification, entitlement/tenancy boundaries and negative-test gate are internally consistent and
honest at commit `930fc9c`. It would **not** mean: any price is approved (all are `HYPOTHESIS_UNAPPROVED` or
`NOT_ESTABLISHED`); any compatibility is established (0 rows `SUPPORTED`/`TESTED`); any certification,
CE/EMC/RED/NMEA 2000 status or sea trial exists (none); the brand or source IP is cleared (neither); any
hardware, BOM or supplier quote exists (none); any bundle is available, orderable, purchasable, published or
quotable as a turnkey price (none — `NOT_FOR_SALE`, `INTERNAL_ONLY`, quotation-only where PILOT is present);
or that a later milestone may publish or sell anything. A long or well-formatted dossier is not proof of a
good offer; the definition is honest precisely because it repeatedly refuses to become an offer.

---

## 15. Re-verification of correction commit `a977b39` (round 2)

### 15.1 Freeze state and authorised delta scope

Recorded 2026-10-31 before this round's write:

```text
$ git -C <repo> rev-parse HEAD
a977b39be611046d9b7fb1b0c98d8bf88f0159cd
$ git -C <repo> branch --show-current
feature/marea-mc08-bundles-commercial-architecture
$ git -C <repo> log --oneline -3
a977b39 fix(mc08): close independent-review gate findings (B-01, B-02, M-01..M-03, m-01..m-03)
930fc9c docs(mc08): six commercial solution bundles, machine contract, validator and negative tests
80c66c7 docs(mc07): correct reviewed-commit and finding-count references (MIN-11)
$ git -C <repo> status --porcelain
?? docs/marea/bundles/MC-08-REVIEW.md        # this reviewer's untracked review only
$ git diff --stat 930fc9c..a977b39
 6 files changed, 604 insertions(+), 76 deletions(-)
$ git diff --check 930fc9c..a977b39
(clean, exit 0)
```

The delta is exactly the six declared files:

| File | Change | In scope |
| --- | --- | --- |
| `scripts/check-marea-bundles.mjs` | +2 checks (BUNDLE-33/34), pinned-line model, rewritten claim patterns, guaranteed-delivery pattern, copy-surface scans, CFG namespace, DISPLAY-LARGE retention | Yes |
| `scripts/check-marea-bundles.test.mjs` | +11 tests (42 total), positive control updated to 34 checks | Yes |
| `docs/marea/bundles/bundle-definitions.json` | 12 configuration rule ids `CR-NN`→`CFG-NN`; 6 eligibility rule references updated; no line-id, state, price or tenancy change (63 component lines unchanged) | Yes |
| `docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md` | identifier namespaces, D8/D17 mapping, disclaimer surface table, §11.1 validator mapping, CFG ids | Yes |
| `docs/marea/bundles/BUNDLE-ARCHITECTURE.md` | new §9.1 disclaimer surface interpretation | Yes |
| `docs/marea/bundles/BUNDLE-COMPOSITION-AND-EXCLUSIONS.md` | explicit D8→contract line mapping note | Yes |

Not touched: `src/`, `public/`, `e2e/`, `docs/marea/products/`, `docs/marea/brand/`, deployment/CI,
`package.json`, `DECISION-LOG.md`, the registry, the six specifications and the 12 copy files. No media or
dependency added.

Governance state re-checked: D-018–D-025 unchanged and intact; registry row 08 (`MASTER-PROMPT-REGISTRY.md:54`)
still **`IN PROGRESS`**; all six bundles remain
`DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY` / `COMPLETE_TARGET_SPECIFICATION`; contract
`publicationState = INTERNAL_ONLY`; configuration rules are `CFG-01`–`CFG-12`; all 63 component inclusions are
members of the declared vocabulary.

### 15.2 Gates re-run on `a977b39`

| # | Command | Exit | Exact result |
| --- | --- | --- | --- |
| 1 | `node scripts/check-marea-bundles.mjs` | 0 | `Summary: 34 checks run, 34 passed, 0 failed; 43 of 43 scoped files read; 60 assets; 6 bundles.` `BUNDLE-33 — every component inclusion validated against the vocabulary`; `BUNDLE-34 — 63 pinned reference lines`; compatibility `39 canonical row citations / 0 supported` |
| 2 | `npm run test:bundles` | 0 | identical to #1 (wrapper) |
| 3 | `node --test scripts/check-marea-bundles.test.mjs` | 0 | `pass 42`, `fail 0` |
| 4 | `npm run test:bundles:unit` | 0 | identical to #3 (wrapper) |
| 5 | `npm run test:products` (non-regression) | 0 | `Summary: 52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read.` |
| 6 | `npm run test:products:unit` (non-regression) | 0 | `pass 106`, `fail 0` |
| 7 | `npm run format:check` | 0 | `All matched files use Prettier code style!` (both scripts included) |

### 15.3 Corrected-finding dispositions (round 1 → round 2)

| Finding (round 1) | Round-1 severity | What `a977b39` changed | Round-2 independent verification | Disposition |
| --- | --- | --- | --- | --- |
| **B-01** sale prose | BLOCKING | `claimPatterns[1]` replaced with a compositional determiner/pronoun subject, case-insensitive, newline-safe, exclusion-aware pattern (`check-marea-bundles.mjs:790`); approved-price pattern broadened (`:812`) | All 6 previously accepted sentence variants (paragraph start, file start, capitalised, "The bundle…", "This product…", "The package…", copy variant) now REJECTED (BUNDLE-26/32) | **CORRECTED for the reported sentences; residue R-01** |
| **B-02** guaranteed alerts in copy | BLOCKING | shared `GUARANTEED_DELIVERY_CLAIM` (`:770`) added to `claimPatterns` (`:830`) and BUNDLE-15 now scans the 12 copy files as well as the contract and six specs | EN "Guaranteed immediate alerts…" and ES "Se garantiza la entrega inmediata de avisos." appended to `copy/start.*` REJECTED (BUNDLE-15 + BUNDLE-26) | **CORRECTED** |
| **M-01** conditional→included / unpinned lines | MAJOR | `PINNED_LINES` (`:333`) plus **BUNDLE-34** (`:2621`) pins line id + family + edition + inclusion for all 63 reference lines and rejects unpinned lines and extra `INCLUDED` lines | `CR-06` `CONDITIONAL`→`INCLUDED` REJECTED (BUNDLE-34); unpinned extra `INCLUDED` line REJECTED (BUNDLE-14/34) | **CORRECTED** |
| **M-02** line-level inclusion vocabulary | MAJOR | **BUNDLE-33** (`:2588`) validates every `component.inclusion` against `INCLUSION_VOCABULARY`, rejects forbidden sale/approval tokens and component-level sale-like fields | `ST-03` `inclusion = "APPROVED"` REJECTED (BUNDLE-33/34) | **CORRECTED** |
| **M-03** case/newline claim scanning | MAJOR | all claim patterns are case-insensitive and line-start/newline aware; match offsets and exclusion windows handled | Capitalised, paragraph-start, file-start and after-full-stop claims REJECTED (BUNDLE-26/32) | **CORRECTED** |
| **m-01** deletable DISPLAY-LARGE guard | MINOR | BUNDLE-13 (`:1611`) requires the `DISPLAY-LARGE-CONDITIONAL` `INELIGIBLE` line in CRUISE and COMPLETE | Deletion REJECTED (BUNDLE-13/34) | **CORRECTED** |
| **m-02** `CR-NN` namespace collision | MINOR | contract + eligibility references + configuration-rules document renamed to `CFG-01`–`CFG-12`; BUNDLE-25 (`:2304–2320`) enforces the CFG namespace and rejects a collision with a component line id | `CFG-01` renamed to `CR-01` REJECTED (BUNDLE-25); no dangling rule reference inside the changed files | **CORRECTED for the namespace; residue R-04** |
| **m-03** partial disclaimer enforcement | MINOR | weather disclaimer enforced on START/CRUISE copy, AIS disclaimer extended to CRUISE/COMPLETE/FLEET (`:2113,2132`); surface interpretation documented in `BUNDLE-ARCHITECTURE.md:383` and the configuration-rules document | Weather-disclaimer removal (EN and ES) REJECTED (BUNDLE-23); FLEET AIS-disclaimer removal REJECTED (BUNDLE-23) | **CORRECTED for enforcement; residue R-03** |
| **O-01** unknown JSON fields | OBSERVATION | not in correction scope | bundle-level unknown field still tolerated (unchanged) | **OPEN (unchanged)** |
| **O-02** redundant check logic | OBSERVATION | not in correction scope | unchanged, harmless | **OPEN (harmless)** |

### 15.4 Independent probe campaign on `a977b39` (throwaway copies, real CLI, `--root`)

33 runs — **29 rejected, 4 accepted**; the 4 accepted are the legitimate-negation sanity cases.

**Required repeats (17) — all rejected with the expected check id:**

| Probe | Result | Check |
| --- | --- | --- |
| "This bundle is now for sale." (paragraph start) | REJECTED | BUNDLE-26, BUNDLE-32 |
| "The bundle is for sale." | REJECTED | BUNDLE-26, BUNDLE-32 |
| "This product is orderable." | REJECTED | BUNDLE-26, BUNDLE-32 |
| "The package is now purchasable." | REJECTED | BUNDLE-26, BUNDLE-32 |
| Same sentence as the file's first line | REJECTED | BUNDLE-26, BUNDLE-32 |
| "The package is now purchasable." in customer copy | REJECTED | BUNDLE-26 |
| "Guaranteed immediate alerts on every passage." in `copy/start.en.md` | REJECTED | BUNDLE-15, BUNDLE-26 |
| "Se garantiza la entrega inmediata de avisos." in `copy/start.es.md` | REJECTED | BUNDLE-15, BUNDLE-26 |
| CRUISE `CR-06` `CONDITIONAL`→`INCLUDED` | REJECTED | BUNDLE-34 |
| Unpinned extra `INCLUDED` component in START | REJECTED | BUNDLE-14, BUNDLE-34 |
| `ST-03` `inclusion = "APPROVED"` | REJECTED | BUNDLE-33, BUNDLE-34 |
| "Status update." + paragraph-start sale sentence | REJECTED | BUNDLE-26, BUNDLE-32 |
| Delete `DISPLAY-LARGE-CONDITIONAL` line from CRUISE | REJECTED | BUNDLE-13, BUNDLE-34 |
| Rename configuration rule `CFG-01`→`CR-01` | REJECTED | BUNDLE-25 |
| Remove weather disclaimer from `copy/start.en.md` | REJECTED | BUNDLE-23 |
| Remove weather disclaimer from `copy/start.es.md` | REJECTED | BUNDLE-23 |
| Remove AIS disclaimer from `copy/fleet-package.en.md` | REJECTED | BUNDLE-23 |

**Regression probes (10) — all still rejected:** `publicationControls.forSale=true` (BUNDLE-26);
`purchaseCtaAllowed=true` (BUNDLE-26); `publicationState=PUBLIC` (BUNDLE-01/26); START price verdict
`APPROVED` (BUNDLE-19); duplicate SENSE kit + loose module (BUNDLE-08/BUNDLE-34); `PILOT-PRO` with a priced
retail hypothesis (BUNDLE-10); FLEET `hardwareIncludedByDefault=true` (BUNDLE-16); FLEET tenure
`crossTenantAccessAllowed=true` (BUNDLE-17); subscription isolation rule removed (BUNDLE-11); trademark
clearance `GRANTED` (BUNDLE-26). No existing check was weakened: every round-1 rejection class still fails,
with the same check ids.

**Sanity (5):** "This bundle is not for sale.", "The bundle price is not approved.", "This package is not
orderable and no purchase path exists." and a benign internal-only sentence PASS (no false positive). One
false positive found: `The phrase "this bundle is for sale" is prohibited and must never be written.` is
REJECTED (BUNDLE-26/32) — R-02.

**Residual inspection:** a quoted affirmative claim inserted into copy (`The page must state: "This bundle is
now for sale."`) is REJECTED (BUNDLE-26); the quote-context handling therefore works when the match starts
inside the quote, but not when a preceding subject frames it (R-02).

### 15.5 Changed-file quality assessment

- **Validator (`check-marea-bundles.mjs`).** Two new checks and no removed check: 34 total. `PINNED_LINES`
  covers all 63 contract lines exactly (matching family, edition and inclusion; the 63 count is reported by
  BUNDLE-34), and BUNDLE-34 rejects both an unpinned extra line and a pinned-line class change. BUNDLE-33
  validates the line-level vocabulary and the sale-like component fields. The CFG namespace check and the
  DISPLAY-LARGE retention are narrow and testable. The claim patterns are materially better but remain
  template-based (R-01). No network, no new dependency, `--root` still honours the fixture root (all probes ran
  through it) and the report/exit contract is unchanged.
- **Tests.** 42 = the 31 round-1 tests + 11 new; the positive control asserts 34 checks. 10 of the 11 new tests
  invoke the real CLI on a temp fixture and assert the specific failing check id; the 11th
  (`test.mjs:640`) is a direct contract assertion for the CFG namespace, which is acceptable as supplementary
  coverage because the adjacent mutation test (`:629`) exercises the CLI path.
- **Contract (`bundle-definitions.json`).** Only identifier renames: 12 rule ids and 6 eligibility rule
  references; no line, state, price, entitlement or tenancy change. The 63 component lines are byte-identical
  in semantics.
- **Documentation.** `BUNDLE-ARCHITECTURE.md` §9.1 (line 383) matches the implemented surfaces except that it
  correctly includes FLEET for AIS while the configuration-rules table does not (R-03).
  `BUNDLE-COMPOSITION-AND-EXCLUSIONS.md:44` accurately maps D8 rows to the contract (NOT_INCLUDED variants →
  exclusions; the grouped SAIL scope → three contract lines). The configuration-rules document gives the
  correct namespaces and §11.1 validator mapping. The untouched FLEET specification still cites the old rule id
  (R-04).
- **Claim scanner behaviour.** On the committed tree there are no false positives (34/34 PASS) and four of the
  five legitimate-negative sanity cases pass; the scanner is therefore not broadly over-broad, but it is
  over-broad in the quoted-governance construction (R-02) and still under-broad for natural sale phrasings
  (R-01).

### 15.6 Residual findings after re-verification

**R-01 — MAJOR (residue of B-01): natural sale sentences with a product-name subject or a modal predicate are
still accepted.**
Evidence: on fresh temp copies of `a977b39`, these sentences appended to
`docs/marea/bundles/MAREA-START-COMMERCIAL-SPEC.md` all left the validator at exit 0 with no failing check:
`MAREA START is now for sale.` / `The bundle can be purchased today.` / `The bundle is available for
purchase.` / `The bundle is offered for sale.` (pattern at `scripts/check-marea-bundles.mjs:790` requires
a determiner/pronoun subject and a closed copula+predicate set). For contrast, `The MAREA START bundle is now
for sale.` and `Our product family is now for sale.` are correctly rejected.
Why it matters: the gate's advertised guarantee (“no sale/approval/clearance claim found”) is still incomplete
for natural English, and a name-subject sentence is a plausible edit in these documents, which refer to
bundles as “MAREA START is…” throughout.
Required correction (Lead): add a subject-agnostic, token-level affirmative detector for the closed token set
(`for sale`, `on sale`, `orderable`, `purchasable`, `available for purchase`, `can be purchased`, `offered for
sale`, `goes on sale`) evaluated outside negation, exclusion-list and quoted-example contexts; add
name-subject and modal unit tests. Do not remove the existing compositional pattern.

**R-02 — MINOR: a legitimate quoted governance example is falsely rejected.**
Evidence: appending `The phrase "this bundle is for sale" is prohibited and must never be written.` to a
specification makes BUNDLE-26/32 fail (reported at spec line 474). The quote-suppression at
`scripts/check-marea-bundles.mjs:856` only fires when the match starts inside the quote; here the match starts
at “The phrase”, and the subject gap `[^.\n]{0,30}` spans the quoted phrase.
Why it matters: an author documenting the prohibition in a scanned document (exactly what a governance
document should do) is blocked; the check is fail-closed but over-broad for that construction.
Required correction (Lead): strip/replace quoted spans (or exclude the quote characters and guillemets from
the subject gap) before claim matching, and add a regression test for the quoted-example sentence.

**R-03 — MINOR: configuration-rules disclaimer table omits the FLEET AIS surface.**
Evidence: `BUNDLE-CONFIGURATION-RULES.md:73` (“AIS receive-only | CRUISE and COMPLETE copy”) and `:389`
(“AIS on CRUISE/COMPLETE”) contradict the implemented check
(`scripts/check-marea-bundles.mjs:2132`, CRUISE/COMPLETE/FLEET), `BUNDLE-ARCHITECTURE.md:391` (which includes
FLEET package) and the new test at `test.mjs:676` (removes the AIS disclaimer from FLEET copy and expects
failure).
Why it matters: the human documentation of the gate is inconsistent with the gate it documents.
Required correction (Lead): add “FLEET package” to both rows (and any equivalent wording), then re-run the
suite.

**R-04 — MINOR: stale rule reference after the CFG rename.**
Evidence: `MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md:386` still says “fixed by `BUNDLE-CONFIGURATION-RULES.md`
§12.6 (rule `CR-07`)”. After `a977b39`, configuration rules are `CFG-07`; `CR-07` is now the CRUISE
`DISPLAY-LARGE-CONDITIONAL` line id. The FLEET specification was outside the six-file delta. A full grep of
the bundle documents and contract found no other stale rule references outside legitimate CRUISE line ids.
Why it matters: a reader following the reference now lands on an unrelated line id, and the D8/D17 identifier
clarity that m-02 was fixing is only partially achieved.
Required correction (Lead): change the reference to `CFG-07` (or to the rule's new id) and add a consistency
grep/test for `CR-NN` in rule-reference positions.

**O-03 — OBSERVATION:** one of the 11 new tests (`test.mjs:640`) is a static contract assertion rather than a
CLI fixture mutation; it is acceptable as supplementary coverage because the CLI mutation test at `:629`
covers the same rule, but future corrections should keep the CLI-fixture pattern as the primary evidence.

### 15.7 Limits specific to this round

- The delta changes no runtime application code (`src/`, `public/`, `e2e/`), so `build`, `test:e2e`,
  `test:backup` and `test:performance` were not re-run; their MC-07 recorded evidence is unchanged and not
  re-verified here.
- The six specifications and the 12 copy files are unchanged in the delta; their content compliance was
  re-checked only through the gate (BUNDLE-22/23/26/32 PASS) and the round-1 line-by-line review.
- Lexical claim detection can never prove the absence of a claim; R-01 is the concrete residual of that
  limitation, and it is bounded by the JSON publication controls, the bundle-state checks and human review.
- I made no Git write, generated no image, used no network and edited only this review file.

---

## 16. Final verdict after re-verification

### 16.1 Verdict: **PARTIAL** (final for `a977b39`)

Reasoning, stated precisely:

- **Correction verified.** All 17 mandated re-review probes pass (previously accepted sentences and mutations
  are now rejected with the expected BUNDLE-13/14/15/23/25/26/32/33/34 ids), all 10 regression probes still
  fail with the same ids, no existing check was weakened, the gates report 34/34 checks, 42/42 tests, 52/52
  product checks, 106/106 product unit tests and clean formatting, and the two new checks are real (63 pinned
  lines; line-level vocabulary enforcement). The CFG namespace collision is resolved in the contract, the
  configuration-rules document and the validator, and the surface-disclaimer interpretation is documented.
- **Why not PASS.** R-01 is the same class as the round-1 blocking finding: natural sale sentences with a
  product-name subject or a modal predicate (`MAREA START is now for sale.`, `The bundle is available for
  purchase.`, …) are still accepted, so the gate's advertised no-sale-claim guarantee is not yet complete.
  R-02 (false positive on a quoted governance example), R-03 (documented AIS surface omits FLEET) and R-04
  (stale `CR-07` rule reference) are additional defects in the correction delta or in files the delta leaves
  inconsistent; none is a committed false claim, but each is a bounded correction.
- **Why not FAIL.** No committed deliverable makes a prohibited claim; all six bundles remain
  `DEFINED`/`NOT_FOR_SALE`/`INTERNAL_ONLY`; no price, compatibility, certification, publication or sale is
  asserted; the mandated correction probes are now enforced; and the remaining defects are detection coverage
  and documentation consistency rather than false statements in the offer.

### 16.2 Exact correction required for a third verification (routed to the Lead; I fix nothing)

1. Add the subject-agnostic, token-level affirmative sale detector and the name-subject/modal unit tests
   (R-01), keeping the current compositional pattern.
2. Fix the quoted-governance-example false positive (R-02) and add its regression test.
3. Add the FLEET package to both AIS-disclaimer rows in `BUNDLE-CONFIGURATION-RULES.md` (R-03).
4. Change the FLEET specification rule reference from `CR-07` to its `CFG-NN` id and add a stale-rule-id check
   (R-04).
5. Re-run `node scripts/check-marea-bundles.mjs`, `npm run test:bundles:unit`, `test:products`,
   `test:products:unit` and `format:check`, then request a third verification. A third round confirming items
   1–4 should yield PASS for the definition scope, with the commercial status still BLOCKED / NOT_FOR_SALE.

### 16.3 What a PASS would and would not mean

A PASS after re-verification would mean: the correction commit closes the independent-review findings on the
real artefacts, the negative-test gate enforces the frozen prohibitions for the tested surfaces and phrasings,
and the six bundle definitions, contract, copy plan, asset plan, pricing classification, entitlement/tenancy
boundaries and governance are internally consistent and honest. It would **not** mean: any price is approved
(all are `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`); any compatibility is established (0 rows
`SUPPORTED`/`TESTED`); any certification, CE/EMC/RED/NMEA 2000 status or sea trial exists (none); the brand or
source IP is cleared (neither); any hardware, BOM or supplier quote exists (none); any bundle is available,
orderable, purchasable, published or quotable as a turnkey price (none — `NOT_FOR_SALE`, `INTERNAL_ONLY`,
quotation-only where PILOT is present); or that a later milestone may publish or sell anything. A long or
well-formatted dossier is not proof of a good offer; the definition is honest precisely because it repeatedly
refuses to become an offer.

---

## 17. Round-3 re-verification of correction commit `c3c1a44`

### 17.1 Freeze state and authorised delta scope

Recorded 2026-10-31 before this round's write:

```text
$ git -C <repo> rev-parse HEAD
c3c1a44a4aeea058f4bc2fc0a64524210123eae9
$ git -C <repo> branch --show-current
feature/marea-mc08-bundles-commercial-architecture
$ git -C <repo> log --oneline -4
c3c1a44 fix(mc08): close round-2 re-review residues (R-01..R-04)
a977b39 fix(mc08): close independent-review gate findings (B-01, B-02, M-01..M-03, m-01..m-03)
930fc9c docs(mc08): six commercial solution bundles, machine contract, validator and negative tests
80c66c7 docs(mc07): correct reviewed-commit and finding-count references (MIN-11)
$ git -C <repo> status --porcelain
?? docs/marea/bundles/MC-08-DELIVERY.md    # Lead's untracked delivery record — not authored by this reviewer, not part of the audited commit
?? docs/marea/bundles/MC-08-REVIEW.md      # this reviewer's untracked review only
$ git diff --stat a977b39..c3c1a44
 4 files changed, 210 insertions(+), 11 deletions(-)
$ git diff --check a977b39..c3c1a44
(clean, exit 0)
```

The delta is exactly the four declared files: `scripts/check-marea-bundles.mjs` (+1 check: BUNDLE-35;
subject-agnostic sale pattern; quoted-span handling; negation/enumeration hardening), 
`scripts/check-marea-bundles.test.mjs` (8 new tests → 50), `docs/marea/bundles/BUNDLE-CONFIGURATION-RULES.md`
(R-03 AIS surface rows now name the FLEET package), and
`docs/marea/bundles/MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md` (R-04 `CR-07`→`CFG-07`). Not touched: `src/`,
`public/`, `e2e/`, `docs/marea/products/`, `docs/marea/brand/`, deployment/CI, `package.json`,
`bundle-definitions.json`, `DECISION-LOG.md`, the registry, the six specifications, the 12 copy files, the
assets and the pricing/entitlement documents. No media, dependency or configuration change.

Governance state re-checked: D-018–D-025 unchanged and intact; registry row 08
(`MASTER-PROMPT-REGISTRY.md:54`) still **`IN PROGRESS`**; all six bundles remain
`DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY` / `COMPLETE_TARGET_SPECIFICATION`; contract `publicationState =
INTERNAL_ONLY`; 63 component lines pinned; configuration rules `CFG-01`–`CFG-12`. The untracked
`MC-08-DELIVERY.md` is the Lead's file: it is not part of the audited commit, was not authored or edited by
this reviewer, and any delivery claim in it must post-date this verdict (§17.7).

### 17.2 Gates re-run on `c3c1a44`

| # | Command | Exit | Exact result |
| --- | --- | --- | --- |
| 1 | `node scripts/check-marea-bundles.mjs` | 0 | `Summary: 35 checks run, 35 passed, 0 failed; 43 of 43 scoped files read; 60 assets; 6 bundles.` `BUNDLE-35 — 0 CR-NN rule reference(s) found`; `BUNDLE-33 — every component inclusion validated against the vocabulary`; `BUNDLE-34 — 63 pinned reference lines`; compatibility `39 canonical row citations / 0 supported` |
| 2 | `npm run test:bundles` | 0 | identical to #1 (wrapper) |
| 3 | `node --test scripts/check-marea-bundles.test.mjs` | 0 | `tests 50`, `pass 50`, `fail 0` |
| 4 | `npm run test:bundles:unit` | 0 | wrapper of #3 (same 50/50) |
| 5 | `npm run test:products` (non-regression) | 0 | `Summary: 52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read.` |
| 6 | `npm run test:products:unit` | — | **NOT re-run this round by the Lead's time-box.** Recorded 106/106 at `a977b39` in round 2 (§15.2); the round-3 delta changes only two bundle documents and the two bundle scripts — no product file, product contract, product dossier or product copy — so this suite cannot be affected. Recorded as inherited evidence, not claimed as a fresh run. |
| 7 | `npm run format:check` | 0 | `All matched files use Prettier code style!` (both scripts included) |

### 17.3 Round-2 residue closure

| Residue (round 2) | Correction in `c3c1a44` | Independent round-3 verification | Status |
| --- | --- | --- | --- |
| **R-01** name-subject / modal sale sentences | subject-agnostic affirmative pattern added (`check-marea-bundles.mjs:798`), sharing the negation, exclusion-window and claim-enumeration guards | `MAREA START is now for sale.` / `The bundle can be purchased today.` / `The bundle is available for purchase.` / `The bundle is offered for sale.` and variants `MAREA CRUISE will be available for purchase next season.`, `The package goes on sale today.`, plus the copy variant → all REJECTED (BUNDLE-26/32) | **CLOSED** |
| **R-02** quoted governance example false positive | `stripQuotedSpans` (`:857`) blanks quoted spans in non-JSON scans before claim matching, preserving line numbers; quote patterns at `:847` | `The phrase "this bundle is for sale" is prohibited and must never be written.` → ACCEPTED (exit 0); the same sentence without quotes → REJECTED (BUNDLE-26/32) | **CLOSED** (new side effect N-02) |
| **R-03** configuration-rules AIS surface omitted FLEET | `BUNDLE-CONFIGURATION-RULES.md:73` and `:390` now read “CRUISE, COMPLETE and FLEET package copy” / “AIS on CRUISE/COMPLETE/FLEET package” | Rows verified on disk; removing the AIS disclaimer from `copy/fleet-package.en.md` still REJECTED (BUNDLE-23) | **CLOSED** |
| **R-04** stale `CR-07` rule reference | FLEET spec `:386` now cites `CFG-07`; new **BUNDLE-35** (`:2722`) rejects rule-position `CR-NN` references | `See rule \`CR-07\` for the FLEET reporting boundary.` → REJECTED (BUNDLE-35); legitimate `The CRUISE line \`CR-01\` remains a NAV-ESSENTIAL component line id.` → ACCEPTED; bundle-document scan and BUNDLE-35 report 0 CR-NN rule references | **CLOSED** (new side effect N-01) |

### 17.4 Independent probe campaign

A focused re-run (17 cases) plus the earlier full round-3 campaign (33 cases) and 6 edge cases were executed on
fresh temp copies with the real CLI and `--root`. Every mandated case behaved as required; the three
non-mandated behaviours are N-01–N-03 in §17.5.

| Case group | Result |
| --- | --- |
| R-01 mandated sale probes (4) + 3 variants | 7/7 REJECTED (BUNDLE-26/32) |
| R-02 quoted governance example | ACCEPTED (exit 0) |
| R-02 unquoted equivalent | REJECTED (BUNDLE-26/32) |
| R-04 stale `rule CR-07` | REJECTED (BUNDLE-35) |
| R-04 legitimate CRUISE line `CR-01` | ACCEPTED (exit 0) |
| Regression probes (10): `forSale`, `purchaseCtaAllowed`, `publicationState=PUBLIC`, price `APPROVED`, duplicate SENSE kit+loose, `PILOT-PRO` priced, FLEET hardware-in-default, FLEET cross-tenant, isolation removal, trademark `GRANTED` | 10/10 REJECTED with the expected BUNDLE-08/10/11/16/17/19/26/34 ids |
| Definitional-prose sanity (8): “…is not for sale”, “no price is approved”, “nothing is orderable”, “not ORDERABLE/FOR_SALE/APPROVED”, “excludes orderable, purchasable or publishable”, “AIS is receive-only…”, “size is not frozen…price remains a hypothesis”, “No bundle is available for purchase…” | 8/8 ACCEPTED (no false positive in definitional prose) |

No existing check was weakened: the ten round-1/round-2 regression classes still fail with the same ids, and
the committed tree passes 35/35.

### 17.5 New residual defects found in round 3

These are new in this round's assessment (N-01 and N-02 are introduced by the round-3 change; N-03 is a
newly identified residue of R-01 that also existed at `a977b39`); none is a false claim in the committed tree,
but each is a bounded defect of the gate/documentation change, so the definition scope cannot receive an
unqualified PASS while they stand.

**N-01 — MINOR: BUNDLE-35 falsely rejects legitimate rule↔line cross-reference prose.**
Evidence: on a temp copy of `c3c1a44`, appending
`The CFG-01 rule requires the CRUISE line CR-01 to be present.` or `This rule applies to CR-01 in every bundle.`
to `BUNDLE-ARCHITECTURE.md` makes the validator fail BUNDLE-35. The legitimate sentence
`The CRUISE line \`CR-01\` remains a NAV-ESSENTIAL component line id.` passes.
Cause: the stale-reference patterns accept any `rule`/`regla` within 30 characters of a `CR-NN` token
(`check-marea-bundles.mjs:2722` check, rule-proximity patterns), so a sentence that correctly cites a `CFG-NN`
rule and a `CR-NN` line id is misread as a stale rule reference.
Why it matters: the new check is fail-closed, but it blocks a natural documentation style (cross-referencing a
configuration rule to the component line it governs) and would force authors to word around the gate.
Required correction (Lead): restrict stale-reference detection to positions where `CR-NN` is presented **as a
rule id** — `rule`/`regla` immediately followed by an optional quote/parenthesis and the `CR-NN` token, or a
`§…(CR-NN)` citation — and skip when a `CFG-NN` id or a line/línea word intervenes; add positive tests for the
two legitimate sentences above.

**N-02 — MINOR: quote-stripping hides quoted claims in the customer copy.**
Evidence: `stripQuotedSpans` is applied to every non-JSON scanned file (`check-marea-bundles.mjs:869`), which
includes the 12 customer copy files. Appending `The page must state: "This bundle is now for sale."` to
`copy/start.en.md` leaves the validator at exit 0 (round 2 rejected the same case). Unquoted copy claims are
still rejected, and BUNDLE-15's guaranteed-delivery scan is unaffected (it does not use `stripQuotedSpans`).
Why it matters: the fix for R-02 also creates a narrow blind spot on the surface a customer actually reads.
A quoted assertion is still communicated to a customer.
Required correction (Lead): apply quote-stripping only to internal documents (contract, specifications,
architecture, configuration rules, composition, pricing, entitlements, installation, journeys, comparison,
asset document), or only to quoted spans introduced by governance words (`phrase`, `wording`, `example`,
`prohibited`, `say`), leaving the 12 copy files scanned raw; add a copy-surface test.

**N-03 — MINOR: name-subject “available to buy / available for sale” is still undetected.**
Evidence: on a temp copy, `MAREA START is available to buy.` and `MAREA START is available for sale.` are
ACCEPTED (exit 0), while `MAREA START is on sale.`, `MAREA START is now for sale.` and `The bundle is available
to buy.` are rejected. The subject-agnostic token branch (`:798`) omits the `available to buy` / `available for
sale` predicates that the determiner branch already lists.
Why it matters: “available to buy” is a direct synonym of “for sale”; a name-subject sentence of this shape is
the same class R-01 was opened for.
Required correction (Lead): add `available to buy` and `available for sale` (and the Spanish equivalents) to
the subject-agnostic predicate list, or unify the two token lists, and add a name-subject test for both.

### 17.6 Changed-file quality assessment

- **Validator.** One new check (BUNDLE-35, 35 total) and no removed check. The subject-agnostic claim pattern is
  a material improvement: the four mandated name/modal sale sentences and their variants are rejected, the
  quotes exception works for governance examples, the negation list is broader and claim enumerations
  (“orderable, purchasable or publishable”) are not misread. The quote-stripping and the BUNDLE-35 proximity
  patterns are the two over-general parts (N-02, N-01). The new pattern’s token list is inconsistent with the
  determiner branch (N-03). No network, no dependency, `--root` still honoured, report/exit contract unchanged.
- **Tests.** 50 = the 42 round-2 tests + 8 new. Six of the new tests invoke the real CLI on a temp fixture and
  assert the specific failing check id (R-01 ×2 at `test.mjs:693,705`, R-02 ×2 at `:717,732`, R-04 ×2 at
  `:744,756`); two are direct document assertions (R-03 at `:771`, R-04 directory scan at `:780`), which is
  acceptable as supplementary coverage — the CLI-fixture pattern remains the primary evidence, and it is
  worth keeping that ratio in future rounds.
- **Documentation.** The R-03 rows are corrected consistently in both the surface table and the validator-mapping
  table; the FLEET specification now cites `CFG-07`; no stale `CR-NN` rule reference remains in any bundle
  document (grep and BUNDLE-35 both report zero). The new BUNDLE-35 over-broadness (N-01) is a code-prose
  interaction, not a document error.
- **Commit content.** No prohibited claim is introduced by the delta; no price, compatibility, certification,
  tenancy, entitlement or sale state changed; the regulator/authority documents are untouched.

### 17.7 Limits specific to this round

- `test:products:unit` was **not** re-run per the Lead’s time-box; the round-2 106/106 result is inherited, and
  the round-3 delta touches no product file (see §17.2 #6).
- `build`, `test:e2e`, `test:backup` and `test:performance` were not re-run: the delta changes no runtime
  application code, so they cannot regress from this commit.
- The untracked `MC-08-DELIVERY.md` is the Lead’s file, is outside the audited commit and was not authored,
  edited or reviewed by me. No delivery claim can be inferred from this review: this verdict is the only
  independent assessment of `c3c1a44`.
- Lexical claim detection remains heuristic (N-03 is its concrete residue); it cannot prove the absence of a
  claim and is bounded by the JSON publication controls, the bundle-state checks and human review.
- I made no Git write, generated no image, used no network and edited only this review file.

---

## 18. Final verdict after round 3

### 18.1 Verdict: **PARTIAL** (final for `c3c1a44`)

Reasoning, stated precisely:

- **All prior findings are closed.** The round-1 BLOCKING/MAJOR findings (B-01, B-02, M-01, M-02, M-03), the
  round-1 MINOR findings (m-01, m-02, m-03) and the round-2 residues (R-01, R-02, R-03, R-04) are independently
  verified closed on `c3c1a44`: the mandated probes are rejected, the quoted/unquoted pair behaves correctly,
  the FLEET AIS surface is documented and enforced, the stale rule reference is rejected while legitimate
  CRUISE line ids pass, and 10 regression probes plus 8 definitional-prose sanity cases show no weakening and
  no false positives in definitional prose. Gates: 35/35 checks, 50/50 tests, 52/52 product checks, format
  clean; the committed tree is unchanged in meaning from `a977b39` except the two documentation corrections.
- **Why not PASS.** The round-3 change, while closing R-01–R-04, introduces three bounded MINOR defects
  (§17.5): N-01 (BUNDLE-35 falsely rejects legitimate rule↔line cross-reference prose), N-02 (quote-stripping
  hides quoted claims in the customer copy) and N-03 (name-subject “available to buy / available for sale”
  still undetected). None puts a prohibited claim into the committed tree, and none affects a committed
  deliverable’s truthfulness — but the Lead’s round-3 rule was “if any residue remains, list exact
  corrections”, and a gate that misreports legitimate documentation (N-01) or misses the customer copy in a
  quoted form (N-02) or a natural synonym (N-03) is not yet defect-free.
- **Why not FAIL.** No committed deliverable makes a prohibited claim; all six bundles remain
  `DEFINED`/`NOT_FOR_SALE`/`INTERNAL_ONLY`; no price, compatibility, certification, publication or sale is
  asserted; no check was weakened; no regression was found; and the three residuals are bounded validator
  heuristics plus one documentation-ergonomics issue, not false statements in the offer.

### 18.2 Exact correction required for a fourth (final) verification (routed to the Lead; I fix nothing)

1. Narrow BUNDLE-35 to rule-id positions and add the two legitimate cross-reference sentences as positive tests
   (N-01).
2. Scope `stripQuotedSpans` to internal documents (or to governance-introduced quotations) so the 12 customer
   copy files remain scanned raw; add a copy-surface quoted-claim test (N-02).
3. Add `available to buy` / `available for sale` (and ES equivalents) to the subject-agnostic predicate list or
   unify the two token lists; add name-subject tests (N-03).
4. Re-run `node scripts/check-marea-bundles.mjs`, `npm run test:bundles:unit`, `test:products` and
   `format:check`, then request the final verification. A fourth round confirming items 1–3 should yield PASS
   for the definition scope, with the commercial status still BLOCKED / NOT_FOR_SALE.

### 18.3 What a PASS would and would not mean

A PASS after round 4 would mean: the six bundle definitions, contract, copy plan, asset plan, pricing
classification, entitlement/tenancy boundaries, governance records and the negative-test gate are internally
consistent, honest and free of the known review defects at the audited commit. It would **not** mean: any price
is approved (all are `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`); any compatibility is established (0 rows
`SUPPORTED`/`TESTED`); any certification, CE/EMC/RED/NMEA 2000 status or sea trial exists (none); the brand or
source IP is cleared (neither); any hardware, BOM or supplier quote exists (none); any bundle is available,
orderable, purchasable, published or quotable as a turnkey price (none — `NOT_FOR_SALE`, `INTERNAL_ONLY`,
quotation-only where PILOT is present); or that a later milestone may publish or sell anything. A long or
well-formatted dossier is not proof of a good offer; the definition is honest precisely because it repeatedly
refuses to become an offer.

---

## 19. Round-4 verification of correction commit `9a9bc97`

### 19.1 Freeze state and authorised delta scope

Recorded 2026-10-31 before this round's write:

```text
$ git -C <repo> rev-parse HEAD
9a9bc9768c69bab186571742621e1b2012c9f3c1
$ git -C <repo> branch --show-current
feature/marea-mc08-bundles-commercial-architecture
$ git -C <repo> log --oneline -3
9a9bc97 fix(mc08): close round-3 residuals N-01..N-03 in the bundle gate
c3c1a44 fix(mc08): close round-2 re-review residues (R-01..R-04)
a977b39 fix(mc08): close independent-review gate findings (B-01, B-02, M-01..M-03, m-01..m-03)
$ git -C <repo> status --porcelain
?? docs/marea/bundles/MC-08-DELIVERY.md    # Lead's untracked delivery record — not authored by this reviewer
?? docs/marea/bundles/MC-08-REVIEW.md      # this reviewer's untracked review only
$ git diff --stat c3c1a44..9a9bc97
 2 files changed, 115 insertions(+), 27 deletions(-)
$ git diff --check c3c1a44..9a9bc97
(clean, exit 0)
```

The delta is exactly the two declared script files: `scripts/check-marea-bundles.mjs` (N-01 BUNDLE-35
narrowed to rule-id positions with line/CFG qualifier suppression; N-02 quote handling replaced by
`stripGovernanceQuotes` and copy paths scanned raw; N-03 `available to buy`/`available for sale` added to both
sale patterns plus a Spanish branch) and `scripts/check-marea-bundles.test.mjs` (+5 tests → 55). Not touched:
`src/`, `public/`, `e2e/`, `docs/marea/products/`, `docs/marea/brand/`, deployment/CI, `package.json`,
`bundle-definitions.json`, `DECISION-LOG.md`, the registry, the bundle documents, the six specifications, the
copy files and the assets. D-018–D-025 remain intact; registry row 08 remains `IN PROGRESS`; all six bundles
remain `DEFINED` / `NOT_FOR_SALE` / `INTERNAL_ONLY` / `COMPLETE_TARGET_SPECIFICATION`; contract
`publicationState = INTERNAL_ONLY`.

### 19.2 Gates re-run on `9a9bc97`

| # | Command | Exit | Exact result |
| --- | --- | --- | --- |
| 1 | `node scripts/check-marea-bundles.mjs` | 0 | `Summary: 35 checks run, 35 passed, 0 failed; 43 of 43 scoped files read; 60 assets; 6 bundles.` |
| 2 | `node --test scripts/check-marea-bundles.test.mjs` (= `npm run test:bundles:unit`) | 0 | `tests 55`, `pass 55`, `fail 0` |
| 3 | `npm run test:products` (non-regression) | 0 | `Summary: 52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read.` |
| 4 | `npm run format:check` | 0 | `All matched files use Prettier code style!` |

`test:products:unit` was not re-run: the round-4 delta changes only the two bundle scripts, no product file,
contract, dossier or product copy, so that suite cannot be affected (round-3 inherited result 106/106).

### 19.3 Round-3 residual closure

| Residue (round 3) | Correction in `9a9bc97` | Independent round-4 verification | Status |
| --- | --- | --- | --- |
| **N-01** BUNDLE-35 over-broad on rule↔line cross-references | stale-reference patterns narrowed to true rule-id positions (`check-marea-bundles.mjs:2730`); suppression when a line/línea/component qualifier or a `CFG-NN` id intervenes (`:2758`, `:2771–2773`) | `The CFG-01 rule requires the CRUISE line CR-01 to be present.` and `This rule applies to CR-01 in every bundle.` → ACCEPTED (exit 0); `See rule \`CR-07\` for the FLEET reporting boundary.` and `The FLEET boundary follows (rule CR-07)…` → REJECTED (BUNDLE-35) | **CLOSED** |
| **N-02** quote-stripping hid claims in the customer copy | `stripGovernanceQuotes` (`:859`) suppresses only governance-introduced quoted spans and only in internal documents; `/copy/` paths are scanned raw (`:875`) | Governance example in a specification → ACCEPTED; quoted `The page must state: "This bundle is now for sale."` in `copy/start.en.md` → REJECTED (BUNDLE-26) | **CLOSED** |
| **N-03** name-subject “available to buy / available for sale” | predicates added to both sale patterns; Spanish branch added (`:805`) | `MAREA START is available to buy.` and `MAREA START is available for sale.` → REJECTED (BUNDLE-26/32); new tests at `test.mjs:845,857` | **CLOSED for English; Spanish residue N-04** |

### 19.4 Independent probe campaign (round 4)

31 probe cases on fresh temp copies with the real CLI and `--root` (25 focused + 6 Spanish cases), plus direct
regex evaluation. All mandated English/R-04/R-02 cases behave as required; the three acceptance cases and two
new defects are listed below.

| Case group | Result |
| --- | --- |
| N-01 legitimate rule↔line cross-references (2) | ACCEPTED (exit 0) |
| N-01 stale rule references (2, incl. parenthesised variant) | REJECTED (BUNDLE-35) |
| N-02 governance example in spec | ACCEPTED |
| N-02 quoted sale claim in copy | REJECTED (BUNDLE-26) |
| N-03 name-subject `available to buy` / `available for sale` (EN) | REJECTED (BUNDLE-26/32) |
| N-03 Spanish `MAREA START esta a la venta.` (unaccented) | REJECTED (BUNDLE-26/32) |
| N-03 Spanish `MAREA START está a la venta.` / `… está disponible para la compra.` (correct accents) | **ACCEPTED — N-04** |
| Regression probes (9): `forSale`, `publicationState=PUBLIC`, price `APPROVED`, duplicate kit, `PILOT-PRO` priced, FLEET hardware, FLEET cross-tenant, isolation removal, trademark `GRANTED` | 9/9 REJECTED with expected ids |
| Definitional-prose sanity (5) | 5/5 ACCEPTED (no false positive) |
| Governance-quoted stale-rule example in an internal doc | **REJECTED — N-05** |

### 19.5 Residual defects after round 4

**N-04 — MINOR: the Spanish sale-claim branch fails on the correctly accented copula.**
Evidence: the subject-agnostic pattern’s Spanish alternative at `check-marea-bundles.mjs:805` is
`\b(?:est[áa]|est[áa]n|es|son)\b(?:\s+(?:ahora|ya|actualmente))?\s+(?:a la venta|disponible para (?:la |su )?compra)`.
The trailing `\b` is an ASCII word boundary; after the non-ASCII `á` it does not match, so direct regex
evaluation returns false for `MAREA START está a la venta.` (true for the unaccented `esta`). On temp copies,
`MAREA START está a la venta.` and `MAREA START está disponible para la compra.` are ACCEPTED in both a
specification and `copy/start.es.md`, while the unaccented `MAREA START esta a la venta.` is rejected.
Why it matters: the documents are bilingual; the round-4 change intended to add the Spanish equivalents, and
the correct Spanish form is exactly the one that escapes on the customer-facing ES copy surface.
Required correction (Lead): replace the trailing `\b` with a Unicode-safe lookahead
(`(?![a-záéíóúüñ])` or `(?=\s|$|[.,;:])`), or add the `u` flag and Unicode-aware boundaries; add ES tests for
`MAREA START está a la venta.`, `MAREA START está disponible para la compra.`, `El paquete está a la venta.`,
and the negation `MAREA START no está a la venta.`

**N-05 — MINOR: BUNDLE-35 rejects a governance sentence that quotes the stale form.**
Evidence: appending `Never write the phrase "rule \`CR-07\`"; configuration rules use CFG-NN.` to
`BUNDLE-ARCHITECTURE.md` makes the validator fail BUNDLE-35. BUNDLE-35 scans raw text and has no
governance-quote handling, so a document explaining the prohibition trips the check.
Why it matters: the check is fail-closed, but a governance document should be able to cite the prohibited form;
the same class of false positive was fixed for the claim scanner in R-02.
Required correction (Lead): apply the governance-quote suppression (or a shared helper) to BUNDLE-35’s scan
text, or skip matches whose token lies inside a governance-introduced quoted span; add a positive test for the
quoted-example sentence and keep the stale-reference negative test.

### 19.6 Changed-file quality assessment

- **Validator.** The three round-3 defects are addressed directly: BUNDLE-35 is narrowed and qualifier-aware, the
  quote handling is conditional rather than blanket and excludes the customer copy from suppression, and the
  sale vocabulary is expanded in both patterns. No check was removed or weakened (35 checks; 9/9 regression
  probes still rejected). The remaining issues are one regex boundary bug (N-04) and the absence of governance
  quote handling in BUNDLE-35 (N-05) — both bounded.
- **Tests.** 55 = 50 + 5 new, all five fixture-based with `withFixture` and specific check-id assertions
  (`test.mjs:803,818,833,845,857`); no Spanish test exists, which is why N-04 was not caught by the suite.
- **Documents.** No document changed in round 4, so the R-03/R-04 documentation corrections from round 3 remain
  as verified; no prohibited claim can be introduced by a script-only delta.
- **Commit content.** The committed documented tree is identical in meaning to `c3c1a44`; no price,
  compatibility, certification, entitlement, tenancy or sale state changed.

### 19.7 Limits specific to this round

- `test:products:unit` was not re-run (script-only delta; round-3 106/106 inherited, not claimed as fresh).
- `build`, `test:e2e`, `test:backup` and `test:performance` were not re-run: no runtime application code changed.
- The Lead’s untracked `MC-08-DELIVERY.md` is outside the audited commit and was not authored, edited or
  reviewed here.
- Lexical claim detection remains heuristic; N-04 is its concrete residue for Spanish, and Spanish accents are
  a class of bug that must be tested explicitly rather than assumed.
- No Git write, no image generation, no network; only this review file was edited.

---

## 20. Final verdict after round 4

### 20.1 Verdict: **PARTIAL** (final for `9a9bc97`)

Reasoning, stated precisely:

- **Closed.** N-01 (rule↔line cross-references accepted; stale rule references rejected), N-02 (governance
  quote accepted in specs; quoted sale claim rejected in customer copy) and N-03 for English (`available to
  buy` / `available for sale` name-subject sentences rejected). Gates are 35/35 checks, 55/55 tests, 52/52
  product checks and clean formatting; 9/9 regression probes still fail with the expected ids and 5/5
  definitional-prose sanity cases pass, so no check was weakened and no false positive was introduced in
  definitional prose.
- **Why not PASS.** Two bounded MINOR defects remain (N-04, N-05). N-04 is substantive for this bilingual
  programme: the correctly accented Spanish sale claims `MAREA START está a la venta.` / `MAREA START está
  disponible para la compra.` are accepted in a specification **and** in `copy/start.es.md`, because the
  Spanish branch ends in an ASCII `\b` after `á`; the unaccented form is caught, the correct one is not.
  N-05 is a false positive: a document that quotes the stale form to prohibit it fails BUNDLE-35.
- **Why not FAIL.** No committed deliverable makes a prohibited claim; the documented tree is unchanged in
  meaning from `c3c1a44`; all six bundles remain `DEFINED`/`NOT_FOR_SALE`/`INTERNAL_ONLY`; no price,
  compatibility, certification, publication or sale is asserted; the defects are a one-line regex boundary
  and a governance-quote handling gap, not false statements in the offer.

### 20.2 Exact correction required for the final (round-5) verification (routed to the Lead; I fix nothing)

1. Fix the Spanish boundary (N-04): Unicode-safe end-of-token assertion (lookahead or `u`/Unicode-aware
   boundary) and add ES tests for `está a la venta`, `está disponible para la compra` and their negations.
2. Apply governance-quote handling to BUNDLE-35 (N-05) and add the quoted-example positive test alongside the
   stale-reference negative test.
3. Re-run `node scripts/check-marea-bundles.mjs`, `npm run test:bundles:unit`, `test:products` and
   `format:check`; a round-5 verification confirming items 1–2 should yield PASS for the definition scope,
   with the commercial status still BLOCKED / NOT_FOR_SALE.

### 20.3 What a PASS would and would not mean

A PASS after round 5 would mean: the six bundle definitions, contract, copy plan, asset plan, pricing
classification, entitlement/tenancy boundaries, governance records and the negative-test gate are internally
consistent, honest and free of the known review defects at the audited commit. It would **not** mean: any price
is approved (all are `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`); any compatibility is established (0 rows
`SUPPORTED`/`TESTED`); any certification, CE/EMC/RED/NMEA 2000 status or sea trial exists (none); the brand or
source IP is cleared (neither); any hardware, BOM or supplier quote exists (none); any bundle is available,
orderable, purchasable, published or quotable as a turnkey price (none — `NOT_FOR_SALE`, `INTERNAL_ONLY`,
quotation-only where PILOT is present); or that a later milestone may publish or sell anything. A long or
well-formatted dossier is not proof of a good offer; the definition is honest precisely because it repeatedly
refuses to become an offer.

---

## 21. Round-5 verification of correction commit `d496d68`

### 21.1 Freeze state and authorised delta scope

Recorded 2026-10-31 before this round's write:

```text
$ git -C <repo> rev-parse HEAD
d496d683adf44b099192b9425a76de69ccbe81bc
$ git -C <repo> log --oneline -3
d496d68 fix(mc08): close round-4 residuals N-04/N-05 in the bundle gate
9a9bc97 fix(mc08): close round-3 residuals N-01..N-03 in the bundle gate
c3c1a44 fix(mc08): close round-2 re-review residues (R-01..R-04)
$ git -C <repo> status --porcelain
?? docs/marea/bundles/MC-08-DELIVERY.md    # Lead's untracked delivery record — not authored by this reviewer
?? docs/marea/bundles/MC-08-REVIEW.md      # this reviewer's untracked review only
$ git diff --stat 9a9bc97..d496d68
 2 files changed, 87 insertions(+), 7 deletions(-)
$ git diff --check 9a9bc97..d496d68
(clean, exit 0)
```

The delta is exactly the two declared script files: `scripts/check-marea-bundles.mjs` (N-04 Unicode-safe
Spanish branch using `u` flag + Unicode property lookarounds; N-05 `stripGovernanceQuotes` applied to the
BUNDLE-35 stale-rule scan with `stripCode: false` so unquoted code-span references are still caught) and
`scripts/check-marea-bundles.test.mjs` (+5 tests → 60). Not touched: `src/`, `public/`, `e2e/`,
`docs/marea/products/`, `docs/marea/brand/`, deployment/CI, `package.json`, `bundle-definitions.json`,
`DECISION-LOG.md`, the registry, the bundle documents, the six specifications, the copy files and the assets.
D-018–D-025 remain intact; registry row 08 remains `IN PROGRESS`; all six bundles remain `DEFINED` /
`NOT_FOR_SALE` / `INTERNAL_ONLY` / `COMPLETE_TARGET_SPECIFICATION`; contract `publicationState = INTERNAL_ONLY`.

### 21.2 Gates re-run on `d496d68`

| # | Command | Exit | Exact result |
| --- | --- | --- | --- |
| 1 | `node scripts/check-marea-bundles.mjs` | 0 | `Summary: 35 checks run, 35 passed, 0 failed; 43 of 43 scoped files read; 60 assets; 6 bundles.` |
| 2 | `node --test scripts/check-marea-bundles.test.mjs` (= `npm run test:bundles:unit`) | 0 | `tests 60`, `pass 60`, `fail 0` |
| 3 | `npm run test:products` (non-regression) | 0 | `Summary: 52 checks run, 52 passed, 0 failed; 51 of 51 scoped files read.` |
| 4 | `npm run format:check` | 0 | `All matched files use Prettier code style!` |

`test:products:unit` was not re-run: the round-5 delta changes only the two bundle scripts, no product file,
contract, dossier or product copy, so that suite cannot be affected (round-4 inherited result 106/106).

### 21.3 Round-4 residual closure

| Residue (round 4) | Correction in `d496d68` | Independent round-5 verification | Status |
| --- | --- | --- | --- |
| **N-04** Spanish accented sale claims escaped (`\b` after `á`) | Spanish branch rewritten with Unicode property lookarounds under the `u` flag (`check-marea-bundles.mjs:805`): `(?<![\p{L}\p{N}])(?:est[áa]|est[áa]n|es|son)(?![\p{L}\p{N}])…` | `MAREA START está a la venta.` and `MAREA START está disponible para la compra.` → REJECTED in a specification (BUNDLE-26/32) **and** in `copy/start.es.md` (BUNDLE-26); unaccented form → REJECTED; `MAREA START no está a la venta.` → ACCEPTED; 4 new ES tests at `test.mjs:871,885,899,911` | **CLOSED** |
| **N-05** BUNDLE-35 falsely rejected governance-quoted stale examples | BUNDLE-35 now scans `stripGovernanceQuotes(text, { stripCode: false })` (`:2768–2770`), suppressing governance-introduced quoted spans while keeping code spans detectable | `Never write the phrase "rule \`CR-07\`"; configuration rules use CFG-NN.` → ACCEPTED (exit 0); `See rule \`CR-07\` for the FLEET reporting boundary.` → REJECTED (BUNDLE-35); new test at `test.mjs:926` | **CLOSED** |

### 21.4 Independent probe campaign (round 5)

17 focused cases on fresh temp copies with the real CLI and `--root`, plus one non-gating edge observation.

| Case group | Result |
| --- | --- |
| N-04 accented `está a la venta` — specification / ES copy | REJECTED (BUNDLE-26/32; BUNDLE-26) |
| N-04 accented `está disponible para la compra` — specification | REJECTED (BUNDLE-26/32) |
| N-04 unaccented `esta a la venta` | REJECTED (BUNDLE-26/32) |
| N-04 negated `no está a la venta` | ACCEPTED (exit 0) |
| N-05 governance quoted example | ACCEPTED (exit 0) |
| N-05 unquoted stale reference | REJECTED (BUNDLE-35) |
| Regression probes (6): `forSale`, `publicationState=PUBLIC`, price `APPROVED`, duplicate kit, `PILOT-PRO` priced, FLEET hardware | 6/6 REJECTED with expected ids |
| Definitional-prose sanity (4) | 4/4 ACCEPTED (no false positive) |

### 21.5 Observation after round 5 (non-gating)

**O-04 — a governance example that cites the stale form in a code span instead of quotes still trips
BUNDLE-35.** Appending `Never write the phrase \`rule CR-07\`; configuration rules use CFG-NN.` to
`BUNDLE-ARCHITECTURE.md` is REJECTED (BUNDLE-35). This is the deliberate, documented trade-off of the N-05 fix:
code spans are kept intact (`stripCode: false`) precisely because ``rule `CR-NN` `` in a code span is the
canonical stale-reference form the check must catch; suppressing code spans generally would open a bypass.
The check is fail-closed, no committed document instantiates the bad form (BUNDLE-35 reports 0), and an author
can cite the prohibition in quotation marks (accepted, as verified) or without instantiating the token. This is
recorded as a residual observation, not a blocking defect; a future refinement could suppress code spans only
when the surrounding clause is clearly a governance prohibition, but that is not required for this milestone.

### 21.6 Changed-file quality assessment

- **Validator.** Two targeted changes, no check removed (35 checks): the Spanish branch is now Unicode-safe
  (property-based lookarounds under `u`), and BUNDLE-35 reuses the governance-quote helper with code spans
  retained. The trade-off in O-04 is explicit in the code comment. No network, no dependency, `--root` and the
  report/exit contract unchanged.
- **Tests.** 60 = 55 + 5 new, all fixture-based with `withFixture` and specific check-id assertions
  (`test.mjs:871,885,899,911,926`). The suite now covers the accented and unaccented Spanish forms, the
  negation, and both sides of the BUNDLE-35 governance-quote behaviour.
- **Documents.** No document changed in round 5; the R-03/R-04 documentation corrections from round 3 remain
  as verified, and a script-only delta cannot introduce a prohibited claim into the documented tree.
- **Commit content.** The documented tree is identical in meaning to `9a9bc97`; no price, compatibility,
  certification, entitlement, tenancy or sale state changed.

### 21.7 Limits specific to this round

- `test:products:unit` was not re-run (script-only delta; round-4 106/106 inherited, not claimed as fresh).
- `build`, `test:e2e`, `test:backup` and `test:performance` were not re-run: no runtime application code
  changed.
- The Lead’s untracked `MC-08-DELIVERY.md` is outside the audited commit and was not authored, edited or
  reviewed here.
- Lexical claim/rule detection remains heuristic (O-04 is one documented trade-off); it cannot prove the
  absence of a claim and is bounded by the JSON publication controls, the bundle-state checks and human review.
- No Git write, no image generation, no network; only this review file was edited.

---

## 22. Final verdict after round 5

### 22.1 Verdict: **PASS — definition scope only** (final for `d496d68`)

Reasoning, stated precisely:

- **Every review finding is closed and independently verified on the real artefacts.** The round-1 findings
  (B-01, B-02, M-01, M-02, M-03, m-01, m-02, m-03), the round-2 residues (R-01, R-02, R-03, R-04), the round-3
  defects (N-01, N-02, N-03) and the round-4 defects (N-04, N-05) are all closed with reproducible evidence;
  no item was reopened and no earlier fix was regressed.
- **The gates are green and real.** 35/35 checks over 43/43 scoped files, 60/60 bundle tests (all fixture-based
  CLI mutations with specific check-id assertions), 52/52 product non-regression checks (51/51 files), clean
  formatting. Six regression probes still fail with the expected ids and four definitional-prose sanity
  sentences pass, so the gate is neither weakened nor over-broad in ordinary definitional writing.
- **The committed artefacts are honest and unchanged in meaning.** D-018–D-025 are intact, registry row 08 is
  still `IN PROGRESS` (to be closed by the delivery/review commit), all six bundles are `DEFINED` /
  `NOT_FOR_SALE` / `INTERNAL_ONLY`, no price is approved, 0 compatibility rows are `SUPPORTED`/`TESTED`, no
  certification exists, brand `NOT_GRANTED`, source IP `NOT_CLEARED`, and there is no public page, route,
  checkout or sale.
- **Scope of this PASS.** It certifies the MC-08 internal bundle-definition scope: the six bundle definitions,
  machine contract, composition/configuration rules, entitlement and tenancy boundaries, pricing
  classification, journeys, ES/EN copy plan, 60-asset plan and governance records, together with the
  validator and its negative-test suite at `d496d683adf44b099192b9425a76de69ccbe81bc`. It is not a release,
  a price approval, a compatibility certification or a sale authorisation.

### 22.2 Residual risks and observations (non-gating)

1. **O-04:** governance examples that cite the stale rule form inside a *code span* instead of quotation marks
   still trip BUNDLE-35 (deliberate fail-closed trade-off; see §21.5). Use quotation marks for such examples.
2. Lexical claim and rule detection remains heuristic: it cannot prove the absence of a claim, and future
   rewordings could require pattern updates. The JSON publication controls, bundle-state checks, copy checks and
   independent review remain the primary controls.
3. The validator is a documentation gate, not a code gate: it does not test a built product, a service, a
   billing system, hardware, compatibility or safety behaviour. Those remain `NOT_VERIFIED`/`BLOCKED` at
   programme level.
4. Any future change to the bundle documents, contract, copy or validator must re-run the gates
   (`test:bundles`, `test:bundles:unit`, `test:products`, `test:products:unit`, `format:check`) and receive a
   fresh review; this PASS does not travel with future commits.
5. The Lead’s untracked `MC-08-DELIVERY.md` is outside this review and cannot be inferred from it.

### 22.3 What this PASS means and does not mean

**Means:** at commit `d496d683adf44b099192b9425a76de69ccbe81bc` the MC-08 definition deliverables are
internally consistent, traceable to the nine-product authority, commercially honest about what is and is not
defined, and enforced by a validator whose negative-test suite covers the prohibitions this review tested. The
independent review requirement is satisfied for the definition scope, with the finding history preserved in
§12–§21.

**Does not mean:** any price is approved (all figures are `HYPOTHESIS_UNAPPROVED` or `NOT_ESTABLISHED`);
any hardware compatibility is established (0 rows `SUPPORTED`/`TESTED`); any certification, CE/EMC/RED/NMEA
2000 status, sea trial or regulatory approval exists (none); the MAREA brand or the OPEN-MARINE source IP is
cleared (neither); any BOM, supplier quote, labour rate, margin or customer reference exists (none); any bundle
is available, orderable, purchasable, published or quotable as a turnkey price (none — `NOT_FOR_SALE`,
`INTERNAL_ONLY`, quotation-only where PILOT is present); any blocked product (PILOT safety gate, SENSE
accuracy, WATCH service, DISPLAY size, WEATHER rights, FLEET platform) is unblocked; or that a later milestone
may publish, deploy or sell anything. External blockers `X-01`, `X-02`, `X-03`, `X-05`, `X-06`, `X-07`,
`H-01`–`H-13`, `P-01`–`P-10` and `D-01`–`D-10` remain open and cannot be closed by a documentation PASS. The
definition is honest precisely because it repeatedly refuses to become an offer.

### 22.4 Final state record

- Reviewed commit: `d496d683adf44b099192b9425a76de69ccbe81bc` (parent `9a9bc97`, base `80c66c7`).
- Final verdict: **PASS**, definition scope only; commercial release status **BLOCKED / NOT_FOR_SALE**.
- Gate totals: validator 35/35; bundle tests 60/60; product checks 52/52; format clean; 17/17 round-5 probes
  behaved as required; 6/6 regression probes rejected; 4/4 definitional sanity sentences accepted.
- Review history: rounds 1–5 (§1–§22); all findings closed; O-04 recorded as a non-gating observation.
- Files written by this reviewer: this review file only.

---

*End of MC-08 independent review. Reviewer: `bundle-reviewer`; round 1 audited
`930fc9c5a8f46ae41c80334ecfde1a4e377ffdc2`, round 2 re-verified
`a977b39be611046d9b7fb1b0c98d8bf88f0159cd`, round 3 verified
`c3c1a44a4aeea058f4bc2fc0a64524210123eae9`, round 4 verified
`9a9bc9768c69bab186571742621e1b2012c9f3c1`, round 5 verified
`d496d683adf44b099192b9425a76de69ccbe81bc` — final verdict **PASS (definition scope only)**. No MC-08
deliverable was authored, edited or committed by this reviewer, and none of the correction commits was modified
by this review. The Lead’s untracked `MC-08-DELIVERY.md` is outside this review.*
