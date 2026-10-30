---
name: marea-asset-production
description: "Produce and integrate MAREA visual assets honestly: briefs, AI image pipeline, CONCEPT vs REAL_PRODUCT labels, optimization, bilingual alt text and manifest provenance. Trigger when creating, generating, selecting, optimizing or reviewing any image, diagram or campaign asset for the site."
whenToUse: "Use when a task needs a visual asset, an image brief, image generation/selection, asset manifest entries, alt text ES/EN, or an audit of asset rights and visual consistency."
metadata:
  version: "1.0.0"
  source: "docs/marea/assets/ASSET-PIPELINE.md"
---

# MAREA Asset Production

Produce and integrate MAREA visual assets honestly. AI images are **not** evidence of real
hardware, certifications, installations, stock or partner approvals.

## Source of truth

- `docs/marea/assets/ASSET-PIPELINE.md` — pipeline, taxonomy, manifest schema, provider policy (MC-01 deliverable).
- `docs/marea/assets/ASSET-MANIFEST.template.yaml` — manifest fields and worked example.
- `docs/marea/WEBSITE-AND-ROADMAP.md` — proposed pages and visual direction.
- Current conventions: files under `public/` (`public/images/*.webp`), image helper
  `src/app/core/images.ts`, component `src/app/shared/ui/product-image.ts`.
- Runtime reality: Harness `0.2.1-rc.5` has **no** image-generation plugin and no image API
  credentials configured (see `docs/marea/execution/HARNESS-SETUP.md`). If the doc is absent or
  differs, trust the verified runtime audit over this skill.

## Procedure

1. Write the brief first: id, purpose, target page/section, subject, composition, palette/type tokens,
   aspect ratio, dimensions, classification (CONCEPT vs REAL_PRODUCT), rights/provenance.
2. Confirm authorization BEFORE any chargeable API call: explicit human budget approval is required;
   otherwise mark the task BLOCKED and state the exact next action to enable generation.
3. Generate or source only through the approved provider path; never download unlicensed stock as a substitute.
4. Inspect the result against the brief and the quality standard: reject watermarks, wrong vessel type,
   implausible rigging/electronics, fake labels, unreadable embedded text, inconsistent light/palette.
5. Save under `public/assets/marea/<category>/` (decision locked in MC-01;
   `public/images/` keeps legacy assets untouched) with the documented naming scheme; never leave
   broken paths or coloured placeholder rectangles in production UI.
6. Optimize to AVIF/WebP with JPEG fallbacks and responsive sizes; respect Angular performance budgets.
7. Add a manifest entry: id, purpose, target page, brief, provider, model, created_at, rights/provenance,
   dimensions, aspect_ratio, optimization, alt_es, alt_en, classification, status.
8. Integrate through existing components (`ProductImage`, `IMAGES`); run `npm run build` and verify the
   affected page renders (SSR/prerender included).
9. Record provenance and any licence/attribution text in the manifest.

## Hard rules

- Never invent certifications, real-product claims, stock photos presented as MAREA hardware, or testimonials.
- Label AI renders and mockups CONCEPT wherever they could be mistaken for a real product or installation.
- Bilingual alt text (ES + EN) is mandatory for content images; decorative images get empty alt.
- No watermarks, no unrelated stock substitution, no broken asset references, no secrets in manifests.
- Use HTML/CSS/SVG for typographic or technical UI instead of faking screenshots with images.
- Never call paid image services without explicit budget authorization and never expose API keys in files.

## Input/output contract

- Input: asset need (page/section/purpose/format/audience).
- Output: files added under `public/`, manifest entry, alt ES/EN, provenance/rights, optimization evidence,
  and PASS/PARTIAL/BLOCKED (BLOCKED when provider or credentials are unavailable).
