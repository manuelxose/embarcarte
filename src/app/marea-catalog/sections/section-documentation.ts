import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaDocumentationPanel } from '../../marea-design-system/components/commerce/marea-documentation-panel';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import type { MareaDocumentationItem } from '../../marea-design-system/core/types';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/**
 * Section 09 — documentation status and canonical provenance.
 *
 * Documents are rendered as status-labelled items without links: no unapproved
 * internal or public page is exposed. The canonical file references are shown as
 * text so a reviewer can trace every claim.
 */
@Component({
  selector: 'marea-catalog-documentation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaDocumentationPanel,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'documentation' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="09" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.documentation.kicker[locale()]"
        [heading]="copy().sections.documentation.heading[locale()]"
        [lead]="copy().sections.documentation.lead[locale()]"
      />
      <div class="panels">
        <marea-surface variant="outline">
          <marea-documentation-panel
            [familyId]="family()"
            [items]="items()"
            [heading]="copy().sections.documentation.heading[locale()]"
          />
        </marea-surface>
        <marea-surface variant="outline">
          <h3 marea-text variant="heading" class="subheading">{{ label('sourceRefs') }}</h3>
          <ul class="refs">
            @for (document of copy().documentation; track document.documentId) {
              <li class="ref">
                <p marea-text variant="meta" class="ref-text">{{ document.sourceRef }}</p>
              </li>
            }
          </ul>
        </marea-surface>
      </div>
      <p marea-text variant="meta" class="draft-note">{{ label('pendingReview') }}</p>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .panels {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
    }
    .subheading {
      margin: 0 0 var(--marea-space-3);
    }
    .refs {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .ref {
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .ref-text,
    .draft-note {
      margin: 0;
      overflow-wrap: anywhere;
    }
    .draft-note {
      margin-block-start: var(--marea-space-4);
    }
    @media (min-width: 1024px) {
      .panels {
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaCatalogDocumentation {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.documentation;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'documentation'));

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  readonly items = computed<readonly MareaDocumentationItem[]>(() =>
    this.copy().documentation.map((document) => ({
      title: document.title[this.locale()],
      kind: document.kind,
      status: document.status,
      limitation: document.limitation ? document.limitation[this.locale()] : null,
    })),
  );
}
