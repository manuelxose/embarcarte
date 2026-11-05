import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaContainer } from '../../marea-design-system/components/foundation/marea-container';
import { MareaStack } from '../../marea-design-system/components/foundation/marea-stack';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';
import { LANDING_STATUS_FACTS } from '../data/landing-domain';
import { LANDING_PAGE_IDENTITY } from '../models/page-identity';
import { MC18_PUBLICATION_EVALUATION } from '../models/publication-gates';

/**
 * Landing footer. Carries the classification, the recorded status facts and the
 * explicit no-publication statement. It contains no contact form, no lead
 * capture and no commercial action.
 */
@Component({
  selector: 'marea-landing-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaContainer, MareaStack, MareaText],
  host: { 'data-marea-landing-footer': '' },
  template: `
    <footer class="footer">
      <marea-container size="wide">
        <marea-stack [gap]="5">
          <div class="grid">
            <div class="col ident">
              <p class="wordmark">MAREA</p>
              <p marea-text variant="bodySmall" tone="secondary" class="line">
                {{ classification() }}
              </p>
              <p marea-text variant="bodySmall" tone="secondary" class="line">
                {{ provisional() }}
              </p>
            </div>
            <div class="col">
              <p marea-text variant="label" class="heading">{{ statusHeading() }}</p>
              <ul class="facts">
                @for (fact of facts(); track fact.label) {
                  <li>
                    <span marea-text variant="meta" class="fact-label">{{ fact.label }}</span>
                    <span marea-text variant="meta" class="fact-value">{{ fact.value }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="col">
              <p marea-text variant="label" class="heading">{{ scopeHeading() }}</p>
              <p marea-text variant="bodySmall" tone="secondary" class="line">
                {{ scope() }}
              </p>
              <p marea-text variant="meta" class="line">
                {{ gateLine() }}
              </p>
            </div>
          </div>
          <p marea-text variant="meta" class="meta">{{ routeLine() }} · {{ commitPolicy() }}</p>
        </marea-stack>
      </marea-container>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      background: var(--marea-surface);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      color: var(--marea-text-primary);
    }
    .footer {
      position: relative;
      padding-block: var(--marea-space-7) var(--marea-space-6);
    }
    marea-container {
      position: relative;
      z-index: 1;
    }
    .grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
    }
    .col {
      display: grid;
      align-content: start;
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .wordmark {
      margin: 0;
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-display2-size);
      line-height: 1;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--marea-text-primary);
    }
    .line,
    .heading,
    .meta {
      margin: 0;
    }
    .heading {
      color: var(--marea-text-secondary);
      letter-spacing: 0.06em;
    }
    .facts {
      display: grid;
      gap: var(--marea-space-1);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .facts li {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      padding-block-end: var(--marea-space-1);
    }
    .fact-label {
      color: var(--marea-text-secondary);
    }
    .fact-value {
      font-variant-numeric: tabular-nums;
      color: var(--marea-text-primary);
    }
    .meta {
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
      padding-block-start: var(--marea-space-3);
      color: var(--marea-text-meta);
    }
    @media (min-width: 768px) {
      .footer {
        padding-block: var(--marea-space-9) var(--marea-space-7);
      }
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
      }
    }
  `,
})
export class MareaLandingFooter {
  private readonly i18n = inject(MareaI18n);
  private readonly content = LANDING_CONTENT;

  readonly classification = computed(
    () => this.content.brand.footerClassification.text[this.i18n.locale()],
  );
  readonly provisional = computed(
    () => this.content.brand.provisionalBrand.text[this.i18n.locale()],
  );

  readonly statusHeading = computed(() =>
    this.i18n.locale() === 'es' ? 'Estado registrado' : 'Recorded status',
  );
  readonly scopeHeading = computed(() =>
    this.i18n.locale() === 'es' ? 'Ámbito de esta vista' : 'Scope of this view',
  );

  readonly scope = computed(() =>
    this.i18n.locale() === 'es'
      ? 'Previsualización interna servida solo en bucle local. No publicada, no indexable, sin venta y sin captación de datos.'
      : 'Internal preview served on loopback only. Not published, not indexable, no sales and no data collection.',
  );

  readonly gateLine = computed(() =>
    this.i18n.locale() === 'es'
      ? `Publicación autorizada: no · Indexación autorizada: no · Despliegue autorizado: no (${MC18_PUBLICATION_EVALUATION.blockingGateIds.length} puertas abiertas)`
      : `Publication authorised: no · Indexation authorised: no · Deployment authorised: no (${MC18_PUBLICATION_EVALUATION.blockingGateIds.length} open gates)`,
  );

  readonly routeLine = computed(() =>
    this.i18n.locale() === 'es'
      ? `Identidad planificada ${LANDING_PAGE_IDENTITY.routeId} (${LANDING_PAGE_IDENTITY.entityId}) · vista previa no publicada`
      : `Planned identity ${LANDING_PAGE_IDENTITY.routeId} (${LANDING_PAGE_IDENTITY.entityId}) · unpublished preview`,
  );

  readonly commitPolicy = computed(() =>
    this.i18n.locale() === 'es'
      ? 'Commit de evidencia: registro de entrega MC-18 (D23)'
      : 'Evidence commit: MC-18 delivery record (D23)',
  );

  readonly facts = computed(() => {
    const es = this.i18n.locale() === 'es';
    return [
      { label: es ? 'Familias' : 'Families', value: String(LANDING_STATUS_FACTS.families) },
      { label: es ? 'Ediciones' : 'Editions', value: String(LANDING_STATUS_FACTS.editions) },
      { label: es ? 'Paquetes' : 'Bundles', value: String(LANDING_STATUS_FACTS.bundles) },
      {
        label: es ? 'Puertas cerradas' : 'Closed gates',
        value: `${LANDING_STATUS_FACTS.releaseGatesClosed} / ${LANDING_STATUS_FACTS.releaseGates}`,
      },
      {
        label: es ? 'Precios aprobados' : 'Approved prices',
        value: String(LANDING_STATUS_FACTS.approvedPrices),
      },
      {
        label: es ? 'Filas de compatibilidad probadas' : 'Tested compatibility rows',
        value: String(LANDING_STATUS_FACTS.testedCompatibilityRows),
      },
    ];
  });
}
