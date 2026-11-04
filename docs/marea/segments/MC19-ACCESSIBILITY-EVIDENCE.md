# MC-19/36 — Accessibility evidence (automated) and limits

| Field       | Value                                                       |
| ----------- | ----------------------------------------------------------- |
| Deliverable | MC-19 accessibility evidence narrative                      |
| Status      | `PARTIAL` — automated Chromium evidence only                |
| Dataset     | `docs/marea/segments/evidence/accessibility-evidence.json`  |

## 1. What was measured

| Area | Method | Result |
| --- | --- | --- |
| WCAG A/AA rules | axe-core via `@axe-core/playwright`, tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, 6 pages | 0 critical and 0 serious violations |
| Keyboard start | `Tab` from document start | Skip link is the first focusable element |
| Skip link | `Enter` on the skip link | `#segment-main` receives focus; URL keeps the page path and hash |
| Focus visibility | component CSS + axe | `:focus-visible` ring on links, buttons, nav toggle and the disabled CTA |
| Disabled action | keyboard + DOM | `aria-disabled="true"`, `aria-describedby` resolves to a visible reason, `Enter` does not navigate |
| Navigation state | DOM | current audience link carries `aria-current="page"` |
| Reduced motion | `emulateMedia({ reducedMotion: 'reduce' })` | media query matches; no running finite animations |
| Responsive | 320, 390, 768, 1440 on 6 pages | no horizontal overflow; all eight sections present |
| Mobile nav | 320px | toggle exposes `aria-expanded`, `Escape` closes it and returns focus |

## 2. What is NOT claimed

- This is **not** a WCAG 2.2 AA conformance certificate. axe only detects a subset of failures.
- No real assistive technology (NVDA, JAWS, VoiceOver, TalkBack) was used.
- Browser zoom to 200%/400% and OS text-scaling were not exercised.
- Colour contrast was checked by axe on rendered text only; non-text contrast and focus-obscured
  behaviour at unusual zoom levels are unmeasured.
- Only Chromium (Playwright bundled) was tested; Firefox and WebKit were not.

## 3. Residual risks

| Risk | Note |
| --- | --- |
| R11 | Automated axe results could be overstated; the verdict explicitly stays `PARTIAL`. |
| R20 | English copy quality is not translation-reviewed; this does not affect accessibility semantics but does affect comprehension. |

## 4. Next action for a public milestone

Before any public activation, run a manual WCAG 2.2 AA audit with a real screen reader, zoom to 400%,
test at least one additional browser engine, and record findings in a new evidence file. That work is
outside MC-19's internal scope and is not authorized by this milestone.
