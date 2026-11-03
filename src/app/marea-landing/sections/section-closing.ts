import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';

/**
 * Section 10 — informational close.
 *
 * Deliberately not a sales funnel: no purchase call to action, no lead form, no
 * checkout and no reservation flow. The restriction statement is rendered as a
 * notice, never as a control.
 *
 * The route/compass geometry is an original decorative SVG, hidden from
 * assistive technology and kept clear of the reading column.
 */
@Component({
  selector: 'marea-landing-closing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'closing' },
  template: `
    <marea-landing-section anchor="cierre" labelledBy="closing-heading" tone="raised">
      <div class="sheet">
        <div class="closing">
          <marea-landing-sheet-index index="10" />
          <marea-section-heading
            id="closing-heading"
            [heading]="copy().heading.text[locale()]"
            [kicker]="copy().kicker.text[locale()]"
            [lead]="copy().lead.text[locale()]"
          />
          <ul class="statements">
            @for (statement of copy().statements; track statement.contentId) {
              <li class="statement">
                <span class="marker" aria-hidden="true"></span>
                <span marea-text variant="body" class="text">{{ statement.text[locale()] }}</span>
              </li>
            }
          </ul>
          <marea-notice
            variant="internal"
            [heading]="restrictionHeading()"
            [body]="copy().restriction.text[locale()]"
            data-landing-closing-restriction
          />
        </div>
        <svg
          class="route"
          viewBox="0 0 520 520"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="330" cy="250" r="150" stroke-width="1" />
          <circle cx="330" cy="250" r="104" stroke-width="1" stroke-dasharray="2 6" />
          <path d="M330 70v34M330 396v34M150 250h34M476 250h34" stroke-width="1" />
          <path d="M330 128 372 250 330 372 288 250Z" stroke-width="1.2" />
          <path
            d="M40 460C120 420 160 350 210 320S290 300 310 250"
            stroke-width="1.4"
            stroke-dasharray="3 5"
          />
          <circle cx="40" cy="460" r="4" stroke-width="1.4" />
          <circle cx="310" cy="250" r="3" stroke-width="1.4" />
        </svg>
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .sheet {
      position: relative;
      min-inline-size: 0;
    }
    .closing {
      position: relative;
      z-index: 1;
      max-inline-size: var(--marea-measure);
    }
    .statements {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
      margin: 0 0 var(--marea-space-5);
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .statement {
      display: grid;
      grid-template-columns: 10px minmax(0, 1fr);
      align-items: start;
      gap: var(--marea-space-3);
      padding-block: var(--marea-space-3);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .marker {
      inline-size: 5px;
      block-size: 5px;
      margin-block-start: 0.6em;
      background: var(--marea-action);
      transform: rotate(45deg);
    }
    .text {
      color: var(--marea-text-primary);
    }
    .route {
      position: absolute;
      z-index: 0;
      inset-block-end: var(--marea-space-5);
      inset-inline-end: 0;
      inline-size: min(38%, 420px);
      block-size: auto;
      color: var(--marea-border-strong);
      opacity: 0.32;
      pointer-events: none;
    }
    @media (max-width: 767px) {
      .route {
        display: none;
      }
    }
  `,
})
export class MareaLandingClosing {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.closing);
  readonly locale = computed(() => this.i18n.locale());

  readonly restrictionHeading = computed(() =>
    this.locale() === 'es' ? 'Esta vista no es una oferta' : 'This view is not an offer',
  );
}
