# MC-20 — Bilingual parity evidence (ES / EN)

## 1. Contract

- One Angular component tree for three families and two locales. There is no per-locale page,
  route table, catalogue data file or section list.
- Every rendered string is a `Localized` object `{ es, en }`; the type makes a missing locale a
  compile error.
- Stable canonical identities (family ids, edition ids, bundle ids) are locale-independent.
- Features, exclusions, limitations, prohibitions and governance gates are identical in both
  locales; only language changes.
- Automated parity validation: content inventory, unique ids, source existence, prohibited-claim
  scan, Spanish-cluster scan and E2E section parity.

## 2. Inventory (identical in ES and EN)

| Family | Sections | Capabilities | Limitations | Composition items | Interfaces | Editions | Documents | Bundles |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| NAV | 10 | 6 | 6 | 11 | 6 | 2 | 5 | 4 |
| HUB | 10 | 6 | 6 | 11 | 6 | 2 | 5 | 6 |
| AIS | 10 | 6 | 7 | 9 | 5 | 2 | 5 | 2 |

Totals: 30 section copies, 18 capabilities, 19 limitations, 31 composition items, 17 interfaces,
6 edition presentations, 15 documents, 12 bundle notes and 121 unique content blocks.

## 3. Automated checks

| Check | Result |
| --- | --- |
| MC20-10 frozen ten sections per family | PASS |
| MC20-11 121 unique content ids | PASS |
| MC20-12 evidence class + existing sources | PASS |
| MC20-16 non-empty, locale-specific values | PASS |
| MC20-17 per-pair bilingual check (non-empty, translated, limitation negation) | PASS |
| MC20-18 no untranslated Spanish clustering in EN | PASS |
| E2E "ES and EN render the same section structure" (3 families) | 3/3 PASS: 11 section hosts, same ids, same H1, paragraph delta ≤ 2 |
| E2E locale switch preserves the family | PASS |

## 4. Quality statement and outstanding work

The English copy is a faithful translation of the Spanish source and is structurally validated.
It has **not** received a professional English translation review. This is an explicit
outstanding requirement inherited from MC-19 (`MC19 English professional review outstanding`) and
recorded here as `PROFESSIONAL_EN_REVIEW = OUTSTANDING`.

No commercial translation is published, because no page is published.

