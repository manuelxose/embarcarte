# MC-04 — Execution plan, write scopes and coordination protocol

| Field | Value |
| --- | --- |
| Document ID | `MC-04 / EXECUTION-PLAN` |
| Milestone | MC-04 — MAREA visual identity system (internal, provisional) |
| Branch | `feature/marea-mc04-visual-identity` |
| Base | `b0b010dd0b45eec455951393e0dabf1f3df53eca` (MC-03 HEAD) |
| Stacked PR target | `feature/marea-mc03-brand-governance` |
| Authority | `docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md` (2012 lines) is authoritative; this file only assigns ownership and conventions |
| Nature | INTERNAL / PROVISIONAL. No publication, no adoption, no certification |

## 0. Hard constraints (every agent, no exceptions)

1. **No writes outside your assigned write scope.** Never write to `src/`, `public/`, `package.json`,
   `package-lock.json`, `angular.json`, `docs/marea/compliance/`, or another agent's paths.
2. **No Git write commands.** Only the Lead runs `git add`, `git commit`, `git push`, `gh pr`.
   Read-only Git (`git status`, `git log`, `git diff`) is fine.
3. **MAREA is a proposed brand.** No `®`, no `™`, no "registered"/"registrada"/"marca registrada".
   No certification/CE/NMEA/IP-rating marks. No availability, price, performance or safety claim.
   No adoption/clearance language: statuses are `INTERNAL_PROPOSED`, `PRODUCED`,
   `INTERNALLY_REVIEWED`, `PREFERRED_PROVISIONAL`, `LEGAL_REVIEW_PENDING`, `PUBLICATION_BLOCKED`.
4. **No AI image generation** and no downloaded/traced third-party artwork. All art is authored as
   SVG/HTML/CSS by us and rendered deterministically with the installed Playwright Chromium.
   Never fake a photograph, render, screenshot or installation.
5. **No new npm dependencies.** Use native SVG, Node scripts, installed Playwright Chromium and
   installed ffmpeg (`C:\ffmpeg\bin\ffmpeg.exe`). If a capability is genuinely missing, record it as
   missing rather than producing a wrong file extension.
6. **Illustrative data must be labelled.** Any invented instrument value is marked
   `ILLUSTRATIVE / NOT LIVE DATA` (or Spanish equivalent). No fictional data presented as real.
7. **AI-agent review ≠ human validation.** Record internal expert review honestly. Never claim
   user research, cockpit tests, salt-spray tests or professional legal review.
8. Every file you create must later be registered in the manifest by its owner with real
   SHA-256, bytes, dimensions — no invented hashes, no placeholders.
9. Spanish and English are first class. Alt text where relevant in both.
10. Do not touch `docs/marea/brand/MC-04-EXECUTION-PLAN.md`, `MC-04-DELIVERY.md`,
    `MC-04-REVIEW.md` (Lead/reviewer owned).

## 1. Team, owned deliverables and exclusive write scopes

| Member | Role | Exclusive write scope | Mandatory deliverables |
| --- | --- | --- | --- |
| **Lead** | Creative/technical program director, integration, Git, PR | `docs/marea/brand/MC-04-EXECUTION-PLAN.md`, `MC-04-DELIVERY.md`, `docs/marea/execution/*`, `docs/marea/assets/manifest/README*` | Delivery report, registry, decision log, commits, draft PR |
| **IdentityVector** | Identity + vector design | `docs/marea/brand/assets/logo/**`, `docs/marea/brand/territories/**`, `docs/marea/brand/IDENTITY-SYSTEM.md`, `docs/marea/brand/TERRITORY-COMPARISON.md` | D-01, D-02, D-03 (9 lockups), territory prototypes A/B/C + proof sheets, evaluation |
| **TypeColour** | Typography, colour, tokens, accessibility evidence | `docs/marea/brand/TYPOGRAPHY-SYSTEM.md`, `COLOUR-SYSTEM.md`, `MC-04-ACCESSIBILITY-EVIDENCE.md`, `docs/marea/brand/tokens/**`, `docs/marea/brand/evidence/contrast/**`, `scripts/check-contrast.mjs`, `scripts/check-typography.mjs` (scope extension authorized by the Lead 2026-10-30 after the empirical tnum/glyph verification was found to need its own reproducible script; recorded here per independent-review finding IR-10) | D-06, D-07, D-08, D-17, T-1…T-10, contrast matrix, CVC/greyscale evidence |
| **InstrumentIcons** | Instrumentation, iconography, diagrams | `docs/marea/brand/ICONOGRAPHY-SYSTEM.md`, `ILLUSTRATION-STANDARDS.md`, `docs/marea/brand/assets/icons/ui/**`, `docs/marea/brand/assets/diagrams/**`, `docs/marea/brand/specimens/**` | D-09, D-10, D-11, instrument specimens (nonfunctional, labelled), icon set |
| **AssetProduction** | Asset engineering, rendering, packaging, print | `docs/marea/brand/assets/icons/app/**`, `assets/social/**`, `assets/packaging/**`, `assets/print/**`, `docs/marea/brand/HARDWARE-CMF-DIRECTION.md`, `PACKAGING-DIRECTION.md`, `docs/marea/assets/manifest/MC-04-ASSETS.yaml`, `scripts/render-assets.mjs`, `scripts/check-assets.mjs` | D-04, D-05, D-12 (renders), D-13, D-14, D-15, deterministic pipeline + validator |
| **Governance** | Trademark restriction, originality research, photography briefs | `docs/marea/brand/ORIGINALITY-AND-PRIOR-ART-CHECK.md`, `PHOTOGRAPHY-AND-CGI-ART-DIRECTION.md`, `docs/marea/assets/manifest/MC-04-BRIEFS.yaml`, `docs/marea/brand/evidence/governance/**` | D-12 (briefs), D-16, prohibited-pattern/compliance evidence, photograph/CGI briefs |
| **IndependentReviewer** | Independent review, G1–G7 evidence, verdict input | `docs/marea/brand/MC-04-REVIEW.md`, `docs/marea/brand/evidence/review/**` | D-19, QA-28 independence log, defect list |

Overlap rule: `docs/marea/brand/assets/icons/` is split by subdirectory (`ui/` vs `app/`); no agent
edits a file owned by another. The Lead resolves any conflict and is the only merger.

## 2. Shared conventions

### 2.1 Paths and filenames

- Internal assets only, under `docs/marea/brand/assets/` — never `public/`.
- Lowercase ASCII kebab-case: `marea-lockup-primary.svg`, `marea-family-nav-lockup.svg`,
  `og-marea-es-1200x630.jpg`, `marea-app-icon-1024.png`, `marea-mark-compact.svg`.
- Every SVG: `viewBox` present, no `<script>`, no external refs/embedded raster/`@import`, integer or
  short-decimal coordinates, `role="img"` + `<title>` where used as content; IDs unique per file.
- Byte budgets (brief §10.5): lockup SVG ≤ 20 kB, mark/icon SVG ≤ 8 kB, app icon PNG ≤ 45 kB each,
  favicon ≤ 20 kB, OG ≤ 120 kB, social card ≤ 120 kB.

### 2.2 Status vocabulary (use exactly)

`PRODUCED` (real file exists) · `INTERNALLY_REVIEWED` (checks run, evidence recorded) ·
`PREFERRED_PROVISIONAL` (internal recommendation only) · `LEGAL_REVIEW_PENDING` ·
`PUBLICATION_BLOCKED` · `BLOCKED_ON_IMAGE_GENERATION` · `BRIEF_APPROVED` (brief only, no file) ·
`NOT_APPLICABLE`. Never `APPROVED_FOR_USE`, `CLEARED`, `CERTIFIED`.

### 2.3 Required evidential discipline

- Record the actual command you ran and its real output; never paste expected output.
- Every raster: real width×height, bytes and SHA-256 (compute with `.NET`/Node, not by guess).
- Any claim you cannot measure → write `NOT_TESTED` / `BLOCKED` plus the exact future test.
- Keep every artifact self-describing: an HTML proof sheet states it is PROPOSED/INTERNAL.

### 2.4 Skills to load before substantive work

`IdentityVector`: `frontend-design`, `marea-premium-design`.
`TypeColour`: `marea-premium-design`, `frontend-design` (+ `web-design-guidelines` for contrast/UI).
`InstrumentIcons`: `marea-premium-design`, `frontend-design`.
`AssetProduction`: `marea-asset-production`.
`Governance`: `marea-asset-production`, `marea-product-strategy`.
`IndependentReviewer`: `marea-quality-gate` (full instructions; it defines the verdict method).

Load via the `skill` tool using the exact catalog name.

### 2.5 Reporting protocol

- Start: read the authoritative brief sections assigned in your task prompt **in full**.
- Notify the Lead (`send_message` target `lead`) when a dependency artifact is ready, e.g.
  `IdentityVector` → Lead + `AssetProduction` when `marea-mark-compact.svg` and the master wordmark
  exist; `TypeColour` → Lead when contrast matrix JSON + tokens exist; `InstrumentIcons` → Lead when
  the three diagrams exist.
- Final message must be a compact evidence summary: files created (count + paths), commands run with
  real results, limitations/BLOCKED items, and anything the reviewer should challenge.
- Report problems early; do not silently reduce scope.

## 3. Dependency order (integration)

1. `IdentityVector` v1 marks (territory prototypes + compact mark + master wordmark).
2. `AssetProduction` can then render app icons, favicons, OG cards; it can start earlier on pipeline,
   validator, packaging dielines and installer templates.
3. `TypeColour` tokens/contrast feed `InstrumentIcons` specimens and `MC-04-ACCESSIBILITY-EVIDENCE`.
4. `Governance` briefs independent; final prohibited-pattern scan after all files exist.
5. `IndependentReviewer` starts after first wave lands; final review after all corrections.
6. Lead: integrate → `npm run test:brand`, build/format checks, symbol checks → commit → draft PR.

## 4. Milestone truth to preserve

- `TRADEMARK_LEGAL_CLEARANCE = NOT_GRANTED`
- `MC-03_TRADEMARK_RESEARCH = OPTION_B`
- `PUBLIC_MAREA_BRAND_USE = NO_GO`
- `ORIGINALITY_PROFESSIONAL_CHECK = PENDING` (external, cannot be closed by any agent)
- `FINAL_IDENTITY_ADOPTION = BLOCKED`
- `PUBLICATION = BLOCKED`
- `IMAGE_GENERATION = BLOCKED` (no provider, no credential, no budget)
- Hardware certifications `NOT_EVIDENCED`; products `NOT_FOR_SALE`
