---
name: marea-premium-design
description: "Design and review MAREA/EMBARCARTE interfaces as credible marine instrumentation, not generic SaaS. Trigger when designing or auditing pages, components, design tokens, navigation, typography, colour, responsive layout, imagery or accessibility for the marine brand."
whenToUse: "Use for any UI/UX work on this repository: new pages or components, visual direction, design-system changes, responsive/accessibility review, or critique of a design that must match the MAREA brand promise."
metadata:
  version: "1.0.0"
  source: "docs/marea/WEBSITE-AND-ROADMAP.md"
---

# MAREA Premium Design

MAREA must read as **naval instrument credibility**, not a generic SaaS template.
MAREA is a **proposed** brand (trademark NOT CLEARED): never invent identity approval,
logos, certifications or claims of an official brand system.

## Required context to read

- `docs/marea/WEBSITE-AND-ROADMAP.md` — §2 visual direction (deep navy, restrained turquoise,
  warm off-white, generous hierarchy, precise data visualisation, verified photography or clearly
  labelled concept renders) and the proposed information architecture.
- `src/styles.scss` — the existing design tokens: `--navy #17365d`, `--sea #1776ad`,
  `--mist #f2f9fd`, `--sky #eaf7ff`, `--paper #fff`, `--ink`, `--muted`, `--line`;
  display `Manrope`, body `DM Sans`; `.wrap` = 1160px; `.display`, `.eyebrow`, `.h-xl/.h-lg/.h-md`.
- `src/app/layout/` (header, footer, language switcher) and `src/app/shared/ui/` (product image,
  status badge) for the current visual language.
- `ui-ux-pro-max` skill (mandatory per `AGENTS.md` for interface work): load it for style, palette,
  type-pairing and UX guidance. Brand fidelity and repository tokens win over generic presets.

## Procedure

1. Load `ui-ux-pro-max`; inspect the target page and the current tokens/components before proposing changes.
2. Write a compact design plan: 4-6 named colours, type roles, one layout concept with an ASCII
   wireframe, 2-3 principles that make this page specific to MAREA.
3. Critique the plan against generic tells: identical rounded card kits, one soft grey shadow everywhere,
   gradient-wash decoration, tracked all-caps eyebrows above every heading, middle-dot meta strings,
   a "->" appended to every link. Remove one accessory that carries no information.
4. Build mobile-first using existing tokens and components; extend tokens once in `src/styles.scss`
   instead of restyling per page.
5. Verify: keyboard focus, WCAG 2.2 AA contrast, reduced-motion respect, 320-1440px layouts,
   ES/EN copy parity (no hard-coded user-facing strings).
6. Capture screenshots (Playwright 1.64 is installed) for visual evidence; critique your own result before hand-off.

## Hard rules

- One design system only; no second brand voice, parallel token set or per-page overrides.
- No invented brand approval, trademark claims, testimonials, certifications or stock photos passed
  off as real MAREA hardware or installations.
- Concept renders, day/night marine mockups and AI images must be visibly labelled CONCEPT where they
  could be mistaken for real products; use HTML/CSS/SVG for typographic or technical UI.
- Typography: one family or two clearly distinct; line length under 80 characters; no accenting a single
  word per headline; no numbered markers unless the content is a real sequence.
- Accessibility and performance are design constraints, not later fixes: respects the Angular budgets
  in `angular.json` (500kB initial warning / 1MB error, 6kB per component style).
- Do not change deployment configuration, themes outside scope, or other agents' files.

## Input/output contract

- Input: page/component, audience, target conversion or task, language(s).
- Output: design plan (tokens, type, layout, principles) + files changed + responsive and accessibility
  evidence + screenshots + an explicit list of what was removed and why.
