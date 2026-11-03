import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaFamilyCard } from '../../marea-design-system/components/commerce/marea-family-card';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';
import { LANDING_COMMERCIAL_PRESENTATION, familySummaryFor } from '../data/landing-domain';
import type { MareaFamilySummary } from '../../marea-design-system/core/types';
import type { LandingFamilyCopy } from '../content/content.types';

interface FamilyItem {
  readonly copy: LandingFamilyCopy;
  readonly summary: MareaFamilySummary;
  readonly kitNote: string | null;
}

/**
 * Section 03 — the nine canonical product families.
 *
 * One card per MC-16 family, all nine always rendered. Material limitations are
 * visible in both locales, supplied by the verified MC-17 family card plus the
 * landing's own constraint copy. No price, stock, availability or purchase
 * action is representable.
 *
 * Composition: catalogue entries on hairlines. The grid is 1/2/3 columns
 * (never 4) so the nine entries resolve into a complete 3×3 register on wide
 * screens; every entry stretches to its row height, keeping the limitation
 * ledgers on a shared baseline.
 */
@Component({
  selector: 'marea-landing-families',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaFamilyCard,
    MareaNotice,
    MareaSectionHeading,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'families' },
  template: `
    <marea-landing-section anchor="familias" labelledBy="families-heading">
      <marea-landing-sheet-index index="03" />
      <marea-section-heading
        id="families-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="families">
        @for (item of items(); track item.copy.familyId; let index = $index) {
          <div class="family" [attr.data-landing-family]="item.copy.familyId">
            <div class="family-head" aria-hidden="true">
              <span class="family-index">{{ '0' + (index + 1) }}</span>
              <span class="family-rule"></span>
            </div>
            <marea-family-card
              [family]="item.summary"
              [presentation]="commercial"
              [kitNote]="item.kitNote"
            />
            <div class="limits">
              <h3 marea-text variant="label" class="limits-heading">{{ limitationsLabel() }}</h3>
              <ul class="limits-list">
                @for (limitation of item.copy.limitations; track limitation.contentId) {
                  <li>
                    <span marea-text variant="bodySmall" tone="secondary">{{
                      limitation.text[locale()]
                    }}</span>
                  </li>
                }
              </ul>
            </div>
          </div>
        }
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
    .families {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
      align-items: stretch;
    }
    .family {
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: var(--marea-space-3);
      min-inline-size: 0;
      block-size: 100%;
      padding-block: var(--marea-space-3) var(--marea-space-4);
      border-block: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .family-head {
      display: flex;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .family-index {
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
    }
    .family-rule {
      flex: 1 1 auto;
      block-size: var(--marea-border-width-hairline);
      background: var(--marea-line);
    }
    .limits {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .limits-heading {
      margin: 0;
      color: var(--marea-text-secondary);
    }
    .limits-list {
      display: grid;
      gap: var(--marea-space-1);
      margin: 0;
      padding-inline-start: var(--marea-space-4);
    }
    .limits-list li {
      overflow-wrap: break-word;
    }
    .limits-list li::marker {
      color: var(--marea-action);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 820px) {
      .families {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: var(--marea-space-6);
      }
    }
    @media (min-width: 1200px) {
      .families {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `,
})
export class MareaLandingFamilies {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.families);
  readonly locale = computed(() => this.i18n.locale());
  readonly commercial = LANDING_COMMERCIAL_PRESENTATION;

  readonly limitationsLabel = computed(() =>
    this.locale() === 'es' ? 'Limitaciones materiales' : 'Material limitations',
  );

  readonly noteHeading = computed(() =>
    this.locale() === 'es' ? 'Sin disponibilidad comercial' : 'No commercial availability',
  );

  readonly items = computed<readonly FamilyItem[]>(() =>
    this.copy().families.map((copy) => {
      const summary = familySummaryFor(copy.familyId, copy.summary.text);
      if (!summary) throw new Error(`Missing verified family presentation for ${copy.familyId}`);
      return {
        copy,
        summary,
        kitNote: copy.familyId === 'SENSE' ? this.i18n.text('senseEssentialsKit') : null,
      };
    }),
  );
}
