import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';

/**
 * Section 02 — conceptual ecosystem layers.
 *
 * The five layers describe the proposed architecture, not a shipped
 * integration. Every statement is an internal intention or a recorded
 * constraint; no layer asserts that an interface works today.
 *
 * Composition: a hairline ledger (index / title / body) instead of a card row,
 * so the five layers read as consecutive strata of one document.
 */
@Component({
  selector: 'marea-landing-ecosystem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'ecosystem' },
  template: `
    <marea-landing-section anchor="ecosistema" labelledBy="ecosystem-heading" tone="raised">
      <marea-landing-sheet-index index="02" />
      <marea-section-heading
        id="ecosystem-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <ol class="layers">
        @for (layer of copy().layers; track layer.layerId; let index = $index) {
          <li class="layer">
            <p class="index" aria-hidden="true">{{ '0' + (index + 1) }}</p>
            <h3 marea-text variant="title2" class="title">{{ layer.title.text[locale()] }}</h3>
            <p marea-text variant="bodySmall" tone="secondary" class="body">
              {{ layer.body.text[locale()] }}
            </p>
          </li>
        }
      </ol>
      <div class="note">
        <marea-notice
          variant="info"
          [heading]="noteHeading()"
          [body]="copy().note.text[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .layers {
      margin: 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .layer {
      display: grid;
      grid-template-columns: 2.25rem minmax(0, 1fr);
      column-gap: var(--marea-space-3);
      row-gap: var(--marea-space-2);
      align-items: start;
      padding-block: var(--marea-space-4);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      min-inline-size: 0;
    }
    .index {
      grid-row: 1 / span 2;
      margin: 0;
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1em;
    }
    .title,
    .body {
      grid-column: 2;
      margin: 0;
    }
    .body {
      max-inline-size: var(--marea-measure);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 768px) {
      .layer {
        grid-template-columns: 4rem minmax(0, 0.85fr) minmax(0, 1.4fr);
        column-gap: var(--marea-space-5);
        row-gap: var(--marea-space-2);
        padding-block: var(--marea-space-5);
      }
      .index {
        grid-row: 1;
      }
      .title {
        grid-column: 2;
        grid-row: 1;
      }
      .body {
        grid-column: 3;
        grid-row: 1;
      }
    }
  `,
})
export class MareaLandingEcosystem {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.ecosystem);
  readonly locale = computed(() => this.i18n.locale());

  readonly noteHeading = computed(() =>
    this.locale() === 'es' ? 'Alcance de este diagrama' : 'Scope of this diagram',
  );
}
