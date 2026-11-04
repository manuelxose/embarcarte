import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/** Section 10 — governance state and the explicit next-milestone boundary. */
@Component({
  selector: 'marea-catalog-closing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'closing' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="contrast">
      <marea-landing-sheet-index index="10" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.closing.kicker[locale()]"
        [heading]="copy().sections.closing.heading[locale()]"
        [lead]="copy().sections.closing.lead[locale()]"
      />
      <div class="content">
        <marea-surface variant="raised">
          <h3 marea-text variant="heading" class="subheading">
            {{ copy().closing.heading[locale()] }}
          </h3>
          <p marea-text variant="body" class="body">{{ copy().closing.body[locale()] }}</p>
        </marea-surface>
        <ul class="governance">
          @for (item of copy().closing.governance; track item.contentId) {
            <li class="item">
              <div class="item-head">
                <span
                  marea-status-badge
                  tone="warning"
                  [label]="evidence(item.evidenceClass)"
                ></span>
              </div>
              <p marea-text variant="bodySmall" class="item-text">{{ item.text[locale()] }}</p>
              <p marea-text variant="meta" class="item-refs">{{ item.sourceRefs.join(' · ') }}</p>
            </li>
          }
        </ul>
      </div>
      <div class="next">
        <marea-notice
          variant="internal"
          [heading]="copy().sections.closing.heading[locale()]"
          [body]="copy().closing.nextMilestone.text[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .content {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
    }
    .subheading,
    .body,
    .item-text,
    .item-refs {
      margin: 0;
    }
    .body {
      margin-block-start: var(--marea-space-2);
    }
    .governance {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .item {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .item-head {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2);
    }
    .item-refs {
      overflow-wrap: anywhere;
    }
    .next {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .content {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaCatalogClosing {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.closing;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'closing'));

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
