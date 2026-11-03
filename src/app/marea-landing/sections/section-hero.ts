import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaContainer } from '../../marea-design-system/components/foundation/marea-container';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { LANDING_CONTENT } from '../content/landing-content';
import { LANDING_DOMAIN_FACTS } from '../data/landing-domain';

interface HeroFact {
  readonly label: string;
  readonly value: string;
}

/**
 * Section 01 — editorial hero.
 *
 * The headline is internal draft copy. The specimen plate renders only recorded
 * facts (canonical counts and closed gates); it is not telemetry, availability
 * or a product photograph. The contour lines and plate corner ticks are
 * decorative, hidden from assistive technology, and drawn with original SVG/CSS.
 *
 * The host carries `id="hero"` so the masthead in-page anchor resolves.
 */
@Component({
  selector: 'marea-landing-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaContainer, MareaLandingSheetIndex, MareaStatusBadge, MareaSurface, MareaText],
  host: { 'data-marea-landing-section': 'hero', id: 'hero' },
  template: `
    <section class="hero" aria-labelledby="hero-heading">
      <marea-container size="wide">
        <div class="composition">
          <div class="copy">
            <div class="topline">
              <marea-landing-sheet-index index="01" />
              <span
                marea-status-badge
                tone="warning"
                [label]="copy().classification.text[locale()]"
                data-landing-classification
              ></span>
            </div>
            <div class="heading-id">
              <p marea-text variant="label" tone="action" class="kicker">
                {{ copy().kicker.text[locale()] }}
              </p>
              <h1 marea-text variant="display1" class="headline" [id]="headingId">
                {{ copy().heading.text[locale()] }}
              </h1>
              <p marea-text variant="body" tone="secondary" class="lead">
                {{ copy().lead.text[locale()] }}
              </p>
            </div>
            <p marea-text variant="body" class="supporting">
              {{ copy().supporting.text[locale()] }}
            </p>
            <ul class="highlights">
              @for (highlight of copy().highlights; track highlight.contentId) {
                <li class="highlight">
                  <span class="highlight-mark" aria-hidden="true"></span>
                  <span marea-text variant="bodySmall" tone="secondary">{{
                    highlight.text[locale()]
                  }}</span>
                </li>
              }
            </ul>
          </div>
          <aside class="plate" aria-labelledby="plate-heading">
            <marea-surface variant="raised" padding="roomy" class="plate-surface">
              <p marea-text variant="label" class="plate-kicker" id="plate-heading">
                {{ plateHeading() }}
              </p>
              <dl class="facts">
                @for (fact of facts(); track fact.label) {
                  <div class="fact">
                    <dt marea-text variant="meta" class="fact-label">{{ fact.label }}</dt>
                    <dd class="fact-value">{{ fact.value }}</dd>
                  </div>
                }
              </dl>
              <p marea-text variant="meta" class="plate-note">{{ plateNote() }}</p>
            </marea-surface>
          </aside>
        </div>
      </marea-container>
      <svg
        class="contour"
        viewBox="0 0 1200 560"
        preserveAspectRatio="xMaxYMin slice"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="currentColor" stroke-width="1">
          <path d="M1200 40C960 30 800 110 700 210S520 400 220 440" />
          <path d="M1200 100C1000 90 860 160 770 250S580 430 300 470" />
          <path d="M1200 160C1040 150 920 210 840 290S640 460 380 500" />
          <path d="M1200 220C1080 215 980 260 910 330S720 490 460 530" />
          <path d="M1200 280C1120 280 1040 310 980 370S800 520 540 560" />
          <path d="M1200 340C1160 340 1100 360 1060 400S900 550 620 590" />
        </g>
        <g class="contour-marks" stroke="currentColor" stroke-width="1">
          <path d="M948 138v8M944 142h8M700 356v8M696 360h8M1054 322v8M1050 326h8" />
        </g>
      </svg>
    </section>
  `,
  styles: `
    :host {
      display: block;
      background: var(--marea-canvas);
    }
    .hero {
      position: relative;
      overflow: hidden;
      padding-block: var(--marea-space-7) var(--marea-space-8);
      background:
        radial-gradient(110% 80% at 100% 0%, var(--marea-state-info-surface) 0%, transparent 58%),
        var(--marea-canvas);
      scroll-margin-block-start: var(--marea-space-3);
    }
    .composition {
      position: relative;
      z-index: 1;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
      gap: var(--marea-space-6);
    }
    .copy {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .topline {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .topline marea-landing-sheet-index {
      flex: 1 1 7rem;
      margin-block-end: 0;
    }
    .heading-id {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .kicker,
    .headline,
    .lead,
    .supporting {
      margin: 0;
    }
    .headline {
      margin-block: var(--marea-space-2);
      color: var(--marea-text-primary);
      max-inline-size: 22ch;
    }
    .lead {
      margin-block-start: var(--marea-space-1);
      max-inline-size: 56ch;
    }
    .supporting {
      max-inline-size: 58ch;
      padding-inline-start: var(--marea-space-4);
      border-inline-start: var(--marea-border-width-strong) solid var(--marea-line);
    }
    .highlights {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: var(--marea-space-2) 0 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .highlight {
      display: grid;
      grid-template-columns: 10px minmax(0, 1fr);
      align-items: start;
      gap: var(--marea-space-3);
      padding-block: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .highlight-mark {
      inline-size: 5px;
      block-size: 5px;
      margin-block-start: 0.55em;
      border: var(--marea-border-width-hairline) solid var(--marea-action);
      transform: rotate(45deg);
    }
    .plate {
      position: relative;
      min-inline-size: 0;
      padding: var(--marea-space-2);
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: calc(var(--marea-radius-surface) + 2px);
      background: var(--marea-canvas);
    }
    .plate::before,
    .plate::after {
      content: '';
      position: absolute;
      inline-size: 12px;
      block-size: 12px;
      pointer-events: none;
    }
    .plate::before {
      inset-block-start: 4px;
      inset-inline-start: 4px;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-inline-start: var(--marea-border-width-hairline) solid var(--marea-border-strong);
    }
    .plate::after {
      inset-block-end: 4px;
      inset-inline-end: 4px;
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-inline-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
    }
    .plate-kicker,
    .plate-note {
      margin: 0;
    }
    .plate-kicker {
      color: var(--marea-text-secondary);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .facts {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: var(--marea-space-4) 0;
      padding: 0;
    }
    .fact {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-1) var(--marea-space-3);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      padding-block: var(--marea-space-2);
    }
    .fact-label {
      color: var(--marea-text-secondary);
    }
    .fact-value {
      margin: 0;
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-secondary-size);
      line-height: 1;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: var(--marea-type-numeric-secondary-tracking);
      color: var(--marea-text-primary);
    }
    .plate-note {
      color: var(--marea-text-meta);
      max-inline-size: 34ch;
    }
    .contour {
      position: absolute;
      z-index: 0;
      inset-block-start: 0;
      inset-inline-end: 0;
      inline-size: min(40%, 620px);
      block-size: auto;
      color: var(--marea-border-strong);
      opacity: 0.42;
      pointer-events: none;
      display: none;
    }
    .contour-marks {
      opacity: 0.8;
    }
    @media (min-width: 768px) {
      .hero {
        padding-block: var(--marea-space-9) var(--marea-space-10);
      }
      .composition {
        gap: var(--marea-space-7);
      }
    }
    @media (min-width: 1024px) {
      .contour {
        display: block;
        inline-size: min(35%, 520px);
      }
    }
    @media (min-width: 1200px) {
      .hero {
        padding-block: var(--marea-space-10) var(--marea-space-11);
      }
      .composition {
        grid-template-columns: minmax(0, 1.5fr) minmax(20rem, 0.9fr);
        gap: var(--marea-space-8);
      }
      .plate {
        margin-block-start: var(--marea-space-8);
      }
      .contour {
        display: block;
        inline-size: min(40%, 620px);
      }
    }
    @media (prefers-reduced-motion: no-preference) {
      .copy > * {
        animation: hero-rise var(--marea-motion-enter) var(--marea-ease-standard) both;
      }
      .copy > *:nth-child(2) {
        animation-delay: 60ms;
      }
      .copy > *:nth-child(3) {
        animation-delay: 120ms;
      }
      .copy > *:nth-child(4) {
        animation-delay: 180ms;
      }
      .plate {
        animation: hero-settle 480ms var(--marea-ease-standard) 120ms both;
      }
    }
    @keyframes hero-rise {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
    @keyframes hero-settle {
      from {
        opacity: 0;
        transform: translateY(14px);
      }
      to {
        opacity: 1;
        transform: none;
      }
    }
  `,
})
export class MareaLandingHero {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.hero);
  readonly locale = computed(() => this.i18n.locale());

  readonly headingId = 'hero-heading';

  readonly plateHeading = computed(() =>
    this.locale() === 'es' ? 'Estado interno registrado' : 'Recorded internal status',
  );

  readonly plateNote = computed(() =>
    this.locale() === 'es'
      ? 'Datos derivados del registro canónico MC-16 y de las puertas MC-14. No son telemetría ni disponibilidad comercial.'
      : 'Derived from the canonical MC-16 record and the MC-14 gates. This is not telemetry or commercial availability.',
  );

  readonly facts = computed<readonly HeroFact[]>(() => {
    const es = this.locale() === 'es';
    return [
      {
        label: es ? 'Familias definidas' : 'Defined families',
        value: pad(LANDING_DOMAIN_FACTS.families),
      },
      { label: es ? 'Ediciones' : 'Editions', value: pad(LANDING_DOMAIN_FACTS.editions) },
      {
        label: es ? 'Conceptos de solución' : 'Solution concepts',
        value: pad(LANDING_DOMAIN_FACTS.bundles),
      },
      {
        label: es ? 'Puertas cerradas' : 'Closed gates',
        value: `${pad(LANDING_DOMAIN_FACTS.releaseGatesClosed)} / ${pad(LANDING_DOMAIN_FACTS.releaseGates)}`,
      },
      {
        label: es ? 'Precios aprobados' : 'Approved prices',
        value: pad(LANDING_DOMAIN_FACTS.approvedPrices),
      },
    ];
  });
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}
