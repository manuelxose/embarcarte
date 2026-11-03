import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaCommercialCta } from '../../marea-design-system/components/commerce/marea-commercial-cta';
import { MareaReadinessPanel } from '../../marea-design-system/components/commerce/marea-readiness-panel';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';
import {
  LANDING_COMMERCIAL_PRESENTATION,
  LANDING_STATUS_FACTS,
  buildReadinessSummary,
} from '../data/landing-domain';
import { MC18_PUBLICATION_EVALUATION } from '../models/publication-gates';

interface StatusFact {
  readonly label: string;
  readonly value: string;
}

/**
 * Section 09 — availability and recorded status.
 *
 * Renders derived readiness, the fail-closed commercial explanation and the
 * recorded gate/claim/price counts. There is no "available soon" date, no
 * waitlist, no stock and no orderable state.
 *
 * Composition: one status console (readiness plus recorded register) followed
 * by the availability lines, the no-action explanation and the two notices, in
 * that order of hierarchy.
 */
@Component({
  selector: 'marea-landing-availability',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaCommercialCta,
    MareaReadinessPanel,
    MareaNotice,
    MareaSectionHeading,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'availability' },
  template: `
    <marea-landing-section
      anchor="disponibilidad"
      labelledBy="availability-heading"
      tone="contrast"
    >
      <marea-landing-sheet-index index="09" />
      <marea-section-heading
        id="availability-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <marea-surface variant="raised" padding="roomy" class="console">
        <div class="console-grid">
          <div class="readiness">
            <marea-readiness-panel [summary]="readiness()" [heading]="readinessHeading()" />
          </div>
          <div class="record">
            <h3 marea-text variant="heading" class="panel-heading">{{ factsHeading() }}</h3>
            <dl class="facts">
              @for (fact of facts(); track fact.label) {
                <div class="fact">
                  <dt marea-text variant="meta" class="fact-label">{{ fact.label }}</dt>
                  <dd class="fact-value">{{ fact.value }}</dd>
                </div>
              }
            </dl>
            <div class="publication">
              <span marea-status-badge tone="critical" [label]="publicationLabel()"></span>
              <span marea-status-badge tone="critical" [label]="indexationLabel()"></span>
            </div>
          </div>
        </div>
      </marea-surface>

      <div class="status-lines">
        <h3 marea-text variant="heading" class="status-heading">{{ statusHeading() }}</h3>
        <ul class="status-list">
          @for (line of copy().statusLines; track line.contentId) {
            <li>
              <span marea-text variant="bodySmall" tone="secondary">{{ line.text[locale()] }}</span>
            </li>
          }
        </ul>
      </div>

      <marea-surface variant="outline" class="cta-panel">
        <marea-commercial-cta [presentation]="commercial" />
      </marea-surface>

      <div class="notes">
        <marea-notice
          variant="critical"
          [heading]="gateHeading()"
          [body]="copy().gateNote.text[locale()]"
        />
        <marea-notice
          variant="internal"
          [heading]="classificationHeading()"
          [body]="copy().classificationNote.text[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .console {
      min-inline-size: 0;
    }
    .console-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
      align-items: start;
    }
    .readiness,
    .record {
      min-inline-size: 0;
    }
    .record {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
    }
    .panel-heading,
    .status-heading,
    .fact-label {
      margin: 0;
    }
    .facts {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      margin: 0;
      padding: 0;
    }
    .fact {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-1) var(--marea-space-3);
      padding-block: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .fact-label {
      color: var(--marea-text-secondary);
    }
    .fact-value {
      margin: 0;
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-numeric-tertiary-size);
      line-height: var(--marea-type-numeric-tertiary-line-height);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--marea-text-primary);
    }
    .publication {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2);
    }
    .status-lines {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin-block: var(--marea-space-5);
    }
    .status-heading {
      margin: 0;
    }
    .status-list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .status-list li {
      padding-block: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .cta-panel {
      margin-block-end: var(--marea-space-5);
    }
    .notes {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
    }
    @media (min-width: 900px) {
      .console-grid {
        grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
        gap: var(--marea-space-6);
      }
      .record {
        padding-inline-start: var(--marea-space-6);
        border-inline-start: var(--marea-border-width-hairline) solid var(--marea-line);
      }
    }
    @media (min-width: 1200px) {
      .notes {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        align-items: start;
      }
    }
  `,
})
export class MareaLandingAvailability {
  private readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.availability);
  readonly locale = computed(() => this.i18n.locale());
  readonly commercial = LANDING_COMMERCIAL_PRESENTATION;

  readonly readiness = computed(() =>
    buildReadinessSummary(
      this.copy().dimensions.map((dimension) => ({
        dimensionId: dimension.dimensionId,
        label: dimension.label.text[this.locale()],
        note: dimension.note ? dimension.note.text[this.locale()] : null,
      })),
    ),
  );

  readonly readinessHeading = computed(() =>
    this.locale() === 'es'
      ? 'Preparación derivada del registro canónico'
      : 'Readiness derived from the canonical record',
  );

  readonly factsHeading = computed(() =>
    this.locale() === 'es' ? 'Hechos registrados' : 'Recorded facts',
  );

  readonly publicationLabel = computed(() =>
    this.locale() === 'es' ? 'Publicación no autorizada' : 'Publication not authorised',
  );

  readonly indexationLabel = computed(() =>
    this.locale() === 'es' ? 'Indexación no autorizada' : 'Indexation not authorised',
  );

  readonly statusHeading = computed(() =>
    this.locale() === 'es' ? 'Estado de disponibilidad' : 'Availability status',
  );

  readonly gateHeading = computed(() =>
    this.locale() === 'es' ? 'Puertas de publicación' : 'Publication gates',
  );

  readonly classificationHeading = computed(() =>
    this.locale() === 'es' ? 'Clasificación interna' : 'Internal classification',
  );

  readonly facts = computed<readonly StatusFact[]>(() => {
    const es = this.locale() === 'es';
    const facts = LANDING_STATUS_FACTS;
    return [
      {
        label: es ? 'Familias / ediciones / paquetes' : 'Families / editions / bundles',
        value: `${facts.families} / ${facts.editions} / ${facts.bundles}`,
      },
      {
        label: es ? 'Puertas de lanzamiento cerradas' : 'Closed release gates',
        value: `${facts.releaseGatesClosed} / ${facts.releaseGates}`,
      },
      {
        label: es ? 'Documentos requeridos ejecutados' : 'Required documents executed',
        value: `${facts.documentsExecuted} / ${facts.requiredDocuments}`,
      },
      {
        label: es ? 'Afirmaciones públicas autorizadas' : 'Public-authorized claims',
        value: String(facts.publicAuthorizedClaims),
      },
      {
        label: es ? 'Precios aprobados / SKUs comerciales' : 'Approved prices / merchant SKUs',
        value: `${facts.approvedPrices} / ${facts.merchantSkuCodes}`,
      },
      {
        label: es
          ? 'Filas de stock verificadas / compatibilidad probada'
          : 'Verified stock rows / tested compatibility',
        value: `${facts.verifiedStockRows} / ${facts.testedCompatibilityRows}`,
      },
      {
        label: es ? 'Puertas de página abiertas' : 'Open page gates',
        value: String(MC18_PUBLICATION_EVALUATION.blockingGateIds.length),
      },
    ];
  });
}
