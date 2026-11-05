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
 * Section 08 — documentation and technical principles.
 *
 * States the current scope: no authorized documentation, no source-IP
 * clearance, no cybersecurity certification and no hardware conformity
 * evidence exist. It advertises none of them.
 *
 * Composition: a numbered technical register against a scope plate, so the
 * section reads as a document index rather than another card row.
 */
@Component({
  selector: 'marea-landing-documentation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'documentation' },
  template: `
    <marea-landing-section anchor="documentacion" labelledBy="documentation-heading">
      <marea-landing-sheet-index index="08" />
      <marea-section-heading
        id="documentation-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="layout">
        <ol class="principles">
          @for (principle of copy().principles; track principle.itemId; let index = $index) {
            <li class="principle">
              <p class="index" aria-hidden="true">{{ '0' + (index + 1) }}</p>
              <h3 marea-text variant="heading" class="title">
                {{ principle.title.text[locale()] }}
              </h3>
              <p marea-text variant="bodySmall" tone="secondary" class="body">
                {{ principle.body.text[locale()] }}
              </p>
            </li>
          }
        </ol>
        <marea-surface variant="outline" class="scope">
          <h3 marea-text variant="heading" class="scope-heading">{{ scopeHeading() }}</h3>
          <p marea-text variant="body" tone="secondary" class="body">
            {{ copy().scope.text[locale()] }}
          </p>
        </marea-surface>
      </div>
      <div class="note">
        <marea-notice
          variant="warning"
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
    .layout {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
      align-items: start;
    }
    .principles {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .principle {
      display: grid;
      grid-template-columns: 2.5rem minmax(0, 1fr);
      grid-template-rows: auto auto;
      column-gap: var(--marea-space-3);
      row-gap: var(--marea-space-1);
      min-inline-size: 0;
      padding-block: var(--marea-space-4);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .index,
    .title,
    .body,
    .scope-heading {
      margin: 0;
    }
    .index {
      grid-column: 1;
      grid-row: 1;
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1em;
    }
    .title {
      grid-column: 2;
      grid-row: 1;
    }
    .body {
      grid-column: 2;
      grid-row: 2;
      max-inline-size: var(--marea-measure);
    }
    .scope {
      min-inline-size: 0;
      border-block-start-width: var(--marea-border-width-strong);
      border-block-start-color: var(--marea-action);
    }
    .scope-heading {
      margin-block-end: var(--marea-space-3);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 1024px) {
      .layout {
        grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
      }
    }
  `,
})
export class MareaLandingDocumentation {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.documentation);
  readonly locale = computed(() => this.i18n.locale());

  readonly scopeHeading = computed(() =>
    this.locale() === 'es' ? 'Alcance actual' : 'Current scope',
  );

  readonly noteHeading = computed(() =>
    this.locale() === 'es'
      ? 'Sin documentación autorizada ni certificaciones'
      : 'No authorized documentation or certifications',
  );
}
