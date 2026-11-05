import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';

/**
 * Section 06 — how defined architecture, conditional parts and unverified links differ.
 *
 * Composition: four instrument tiles on a single ruled row on wide screens; the
 * numbered order is decorative and the heading hierarchy stays h3 inside the
 * section's single h2.
 */
@Component({
  selector: 'marea-landing-software-hardware',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'software-hardware' },
  template: `
    <marea-landing-section
      anchor="software-hardware"
      labelledBy="software-hardware-heading"
      tone="contrast"
    >
      <marea-landing-sheet-index index="06" />
      <marea-section-heading
        id="software-hardware-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="principles">
        @for (principle of copy().principles; track principle.itemId; let index = $index) {
          <marea-surface variant="outline" class="principle-plate">
            <article class="principle">
              <p class="index" aria-hidden="true">{{ '0' + (index + 1) }}</p>
              <h3 marea-text variant="heading" class="title">
                {{ principle.title.text[locale()] }}
              </h3>
              <p marea-text variant="bodySmall" tone="secondary" class="body">
                {{ principle.body.text[locale()] }}
              </p>
            </article>
          </marea-surface>
        }
      </div>
      <div class="note">
        <marea-notice
          variant="permission"
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
    .principles {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-auto-rows: 1fr;
      gap: var(--marea-space-4);
    }
    .principle-plate {
      block-size: 100%;
    }
    .principle {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .index,
    .title,
    .body {
      margin: 0;
    }
    .index {
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1em;
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 600px) {
      .principles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 900px) {
      .principles {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--marea-space-3);
      }
    }
  `,
})
export class MareaLandingSoftwareHardware {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.softwareHardware);
  readonly locale = computed(() => this.i18n.locale());

  readonly noteHeading = computed(() =>
    this.locale() === 'es'
      ? 'Licencias y conformidad no acreditadas'
      : 'Licensing and conformity not established',
  );
}
