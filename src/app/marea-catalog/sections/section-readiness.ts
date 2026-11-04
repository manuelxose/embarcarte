import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaCommercialCta } from '../../marea-design-system/components/commerce/marea-commercial-cta';
import { MareaReadinessPanel } from '../../marea-design-system/components/commerce/marea-readiness-panel';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import {
  MareaDefinitionList,
  type MareaDefinitionItem,
} from '../../marea-design-system/components/structured/marea-definition-list';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import {
  CATALOG_COMMERCIAL_PRESENTATION,
  CATALOG_STATUS_FACTS,
  catalogFamilyRecord,
  catalogReadinessSummary,
} from '../data/catalog-domain';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/** Section 08 — derived readiness, recorded facts and the fail-closed CTA. */
@Component({
  selector: 'marea-catalog-readiness',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaCommercialCta,
    MareaDefinitionList,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaReadinessPanel,
    MareaSurface,
  ],
  host: { 'data-marea-catalog-section': 'readiness' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="08" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.readiness.kicker[locale()]"
        [heading]="copy().sections.readiness.heading[locale()]"
        [lead]="copy().sections.readiness.lead[locale()]"
      />
      <div class="panels">
        <marea-surface variant="outline">
          <marea-readiness-panel [summary]="readiness()" />
        </marea-surface>
        <div class="side">
          <marea-definition-list [label]="label('releaseGates')" [items]="factItems()" />
          <marea-surface variant="raised">
            <marea-commercial-cta [presentation]="presentation" />
          </marea-surface>
        </div>
      </div>
      <div class="gate-note">
        <marea-notice
          variant="critical"
          [heading]="copy().sections.closing.heading[locale()]"
          [body]="copy().closing.body[locale()]"
        />
      </div>
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
    .side {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      align-content: start;
      min-inline-size: 0;
    }
    .gate-note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 1024px) {
      .panels {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaCatalogReadiness {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.readiness;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'readiness'));
  readonly presentation = CATALOG_COMMERCIAL_PRESENTATION;
  readonly readiness = computed(() => catalogReadinessSummary(this.family(), this.locale()));

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  readonly factItems = computed<readonly MareaDefinitionItem[]>(() => {
    const locale = this.locale();
    const record = catalogFamilyRecord(this.family());
    const facts = CATALOG_STATUS_FACTS;
    return [
      { term: String(facts.families), definition: this.label('factsFamilies') },
      { term: String(facts.editions), definition: this.label('factsEditions') },
      { term: String(facts.bundles), definition: this.label('factsBundles') },
      {
        term: `${facts.releaseGatesClosed} / ${facts.releaseGates}`,
        definition: this.label('factsGates'),
      },
      {
        term: String(record?.releaseGateIds.length ?? 0),
        definition: this.label('releaseGates'),
        note: `MC-14 · ${this.family()}`,
      },
      {
        term: `${facts.publicAuthorizedClaims} / ${facts.cataloguedClaims}`,
        definition: this.label('factsClaims'),
      },
      { term: String(facts.approvedPrices), definition: this.label('factsPrices') },
      {
        term: String(facts.testedCompatibilityRows),
        definition: this.label('factsCompatibility'),
      },
      {
        term: `${facts.documentsExecuted} / ${facts.requiredDocuments}`,
        definition:
          locale === 'es' ? 'documentos de publicación ejecutados' : 'release documents executed',
      },
    ];
  });
}
