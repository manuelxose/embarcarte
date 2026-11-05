import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';

/**
 * Section 07 — informational professional and installation context.
 *
 * No MC-19 enquiry flow is implemented here: no form, no contact endpoint, no
 * quote request, no registration and no personal data collection.
 *
 * Composition: three editorial columns separated by vertical hairlines on wide
 * screens, deliberately lighter than the bundle plates.
 */
@Component({
  selector: 'marea-landing-professionals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'professionals' },
  template: `
    <marea-landing-section anchor="profesionales" labelledBy="professionals-heading" tone="raised">
      <marea-landing-sheet-index index="07" />
      <marea-section-heading
        id="professionals-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="segments">
        @for (segment of copy().segments; track segment.itemId; let index = $index) {
          <article class="segment">
            <p class="index" aria-hidden="true">{{ '0' + (index + 1) }}</p>
            <h3 marea-text variant="title2" class="title">
              {{ segment.title.text[locale()] }}
            </h3>
            <p marea-text variant="body" tone="secondary" class="body">
              {{ segment.body.text[locale()] }}
            </p>
          </article>
        }
      </div>
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
    .segments {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
    }
    .segment {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-strong) solid var(--marea-line);
    }
    .index,
    .title,
    .body {
      margin: 0;
    }
    .index {
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
    }
    .body {
      max-inline-size: var(--marea-measure);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 768px) {
      .segments {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--marea-space-6);
      }
    }
  `,
})
export class MareaLandingProfessionals {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.professionals);
  readonly locale = computed(() => this.i18n.locale());

  readonly noteHeading = computed(() =>
    this.locale() === 'es'
      ? 'Sin formularios ni captación de datos'
      : 'No forms and no data collection',
  );
}
