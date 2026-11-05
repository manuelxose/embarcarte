import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaFamilyCard } from '../../marea-design-system/components/commerce/marea-family-card';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import {
  CATALOG_COMMERCIAL_PRESENTATION,
  catalogFamilyIds,
  catalogFamilyRecord,
  familyCardSummary,
  statusLabel,
} from '../data/catalog-domain';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogPreviewHref } from '../models/catalog-identity';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/** Section 07 — canonical bundle relationships and cross-family navigation. */
@Component({
  selector: 'marea-catalog-ecosystem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaFamilyCard,
    MareaGrid,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'ecosystem' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="07" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.ecosystem.kicker[locale()]"
        [heading]="copy().sections.ecosystem.heading[locale()]"
        [lead]="copy().sections.ecosystem.lead[locale()]"
      />
      <marea-surface variant="outline">
        <h3 marea-text variant="heading" class="subheading">{{ label('includedInBundles') }}</h3>
        <ul class="bundles">
          @for (bundle of bundles(); track bundle.bundleId + bundle.editionId) {
            <li class="bundle" [attr.data-marea-bundle]="bundle.bundleId">
              <div class="bundle-head">
                <span marea-text variant="label" class="bundle-name">{{ bundle.displayName }}</span>
                <span
                  marea-status-badge
                  [tone]="bundle.inclusion === 'INCLUDED' ? 'info' : 'neutral'"
                  [label]="statusLabel(bundle.inclusion, locale())"
                ></span>
              </div>
              <p marea-text variant="meta" class="bundle-meta">
                {{ bundle.editionId }} · {{ bundle.routeId }}
              </p>
              <p marea-text variant="bodySmall" class="bundle-note">{{ bundle.note }}</p>
            </li>
          }
        </ul>
      </marea-surface>

      <h3 marea-text variant="heading" class="subheading families-heading">
        {{ label('otherFamilies') }}
      </h3>
      <marea-grid minItem="300px" gap="roomy">
        @for (entry of otherFamilies(); track entry.familyId) {
          <a
            class="family-link"
            [href]="entry.href"
            [attr.data-marea-cross-family]="entry.familyId"
          >
            <marea-family-card [family]="entry.summary" [presentation]="presentation" />
          </a>
        }
      </marea-grid>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .subheading {
      margin: 0 0 var(--marea-space-3);
    }
    .families-heading {
      margin-block-start: var(--marea-space-6);
    }
    .bundles {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .bundle {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .bundle-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .bundle-name,
    .bundle-meta,
    .bundle-note {
      margin: 0;
    }
    .family-link {
      display: block;
      color: inherit;
      text-decoration: none;
      border-radius: var(--marea-radius-surface);
    }
    .family-link:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    .family-link:hover {
      color: inherit;
    }
    @media (min-width: 900px) {
      .bundles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `,
})
export class MareaCatalogEcosystem {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.ecosystem;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'ecosystem'));
  readonly presentation = CATALOG_COMMERCIAL_PRESENTATION;

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  statusLabel(code: string, locale: 'es' | 'en'): string {
    return statusLabel(code, locale);
  }

  readonly bundles = computed(() => {
    const record = catalogFamilyRecord(this.family());
    if (!record) return [];
    return record.bundleInclusions.map((bundle) => {
      const note = this.copy().bundleNotes.find((entry) => entry.bundleId === bundle.bundleId);
      return {
        ...bundle,
        note: note ? note.note[this.locale()] : '',
      };
    });
  });

  readonly otherFamilies = computed(() =>
    catalogFamilyIds()
      .filter((familyId) => familyId !== this.family())
      .flatMap((familyId) => {
        const summary = familyCardSummary(familyId);
        return summary
          ? [{ familyId, summary, href: catalogPreviewHref(familyId, this.locale()) }]
          : [];
      }),
  );
}
