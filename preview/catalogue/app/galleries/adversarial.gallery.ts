import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MareaCommerceCta } from '../../../../src/app/marea-design-system/components/commerce/marea-commerce-cta';
import { MareaFamilyCard } from '../../../../src/app/marea-design-system/components/commerce/marea-family-card';
import { MareaPriceUnavailable } from '../../../../src/app/marea-design-system/components/commerce/marea-price-unavailable';
import { MareaStockUnavailable } from '../../../../src/app/marea-design-system/components/commerce/marea-stock-unavailable';
import { MareaReadinessPanel } from '../../../../src/app/marea-design-system/components/commerce/marea-readiness-panel';
import { MareaSpecTable } from '../../../../src/app/marea-design-system/components/structured/marea-spec-table';
import { MareaText } from '../../../../src/app/marea-design-system/components/foundation/marea-text';
import { MareaSurface } from '../../../../src/app/marea-design-system/components/foundation/marea-surface';
import { MareaStack } from '../../../../src/app/marea-design-system/components/foundation/marea-stack';
import { MareaNotice } from '../../../../src/app/marea-design-system/components/foundation/marea-notice';
import { MareaComponentDoc } from '../component-doc';
import { deriveCommercialPresentation, deriveCtaState, sanitizeCtaState } from '../../../../src/app/marea-design-system/data/commerce-presentation.adapter';
import { MAREA_FIXTURE_FAMILIES, MAREA_FIXTURE_READINESS } from '../../../../src/app/marea-design-system/data/fixtures/marea-fixtures.generated';
import type { MareaCommercialInput } from '../../../../src/app/marea-design-system/core/types';

/**
 * Adversarial fail-closed specimens. Every fixture on this page is deliberately
 * hostile or contradictory; the rendered result must still refuse purchase,
 * price and stock and explain the refusal in text.
 */
@Component({
  selector: 'marea-adversarial-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaCommerceCta, MareaFamilyCard, MareaPriceUnavailable, MareaStockUnavailable, MareaReadinessPanel, MareaSpecTable, MareaText, MareaSurface, MareaStack, MareaNotice, MareaComponentDoc],
  template: `
    <marea-stack [gap]="5">
      <marea-notice variant="critical" heading="Fixture hostil: compra autorizada por error" body="El view model declara buyCtaAllowed=true, cartAllowed=true, priceVisible=true, availabilityVisible=true y un estado inexistente. La presentación debe bloquearlo todo." live="off" />

      <marea-surface>
        <marea-stack [gap]="3">
          <h3 marea-text variant="heading">Invariantes calculados por el adaptador</h3>
          <dl class="invariants" data-testid="adversarial-invariants">
            <dt>purchaseActionAllowed</dt><dd>{{ hostile().purchaseActionAllowed }}</dd>
            <dt>cartAllowed</dt><dd>{{ hostile().cartAllowed }}</dd>
            <dt>priceVisible</dt><dd>{{ hostile().priceVisible }}</dd>
            <dt>availabilityVisible</dt><dd>{{ hostile().availabilityVisible }}</dd>
            <dt>ctaState</dt><dd>{{ hostile().ctaState }}</dd>
            <dt>blockedSignals</dt><dd>{{ hostile().blockedSignals.join(', ') || 'none' }}</dd>
          </dl>
          <p marea-text variant="bodySmall" tone="secondary">
            El estado de entrada era «PURCHASE» (no autorizado). Se resuelve como {{ sanitizeState }} y no existe ningún control de compra en el DOM.
          </p>
        </marea-stack>
      </marea-surface>

      <marea-surface>
        <h3 marea-text variant="heading">CTA con fixture hostil</h3>
        <marea-commerce-cta [presentation]="hostile()" />
      </marea-surface>

      <marea-surface>
        <h3 marea-text variant="heading">Precio y stock retenidos (sin importes ni cantidades)</h3>
        <marea-stack [gap]="3">
          <marea-price-unavailable priceStatus="HYPOTHESIS_UNAPPROVED" />
          <marea-stock-unavailable stockState="NO_VERIFIED_INVENTORY" />
        </marea-stack>
      </marea-surface>

      <marea-surface>
        <h3 marea-text variant="heading">Familia PILOT con presentación hostil</h3>
        <marea-family-card [family]="pilotFamily" [presentation]="hostile()" />
      </marea-surface>

      <marea-surface>
        <h3 marea-text variant="heading">Preparación derivada (11 dimensiones, todas no listas)</h3>
        <marea-readiness-panel [summary]="readiness" />
      </marea-surface>

      <marea-surface>
        <h3 marea-text variant="heading">Derivación de los cinco estados CTA</h3>
        <marea-spec-table caption="Derivación de estado CTA desde identidad MC-16 (solo códigos internos)" [rows]="ctaRows()" />
      </marea-surface>

      <marea-component-doc componentId="marea-commerce-cta" />
      <marea-component-doc componentId="marea-price-unavailable" />
      <marea-component-doc componentId="marea-stock-unavailable" />
      <marea-component-doc componentId="marea-readiness-panel" />
      <marea-component-doc componentId="marea-family-card" />
    </marea-stack>
  `,
  styles: `
    :host { display: block; }
    h3 { margin: 0 0 8px; }
    .invariants { display: grid; grid-template-columns: minmax(180px, 260px) 1fr; gap: 4px 16px; margin: 0; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 12px; }
    .invariants dt { font-weight: 700; }
    .invariants dd { margin: 0; }
  `,
})
export class AdversarialGallery {
  readonly pilotFamily = MAREA_FIXTURE_FAMILIES.find((family) => family.familyId === 'PILOT') ?? MAREA_FIXTURE_FAMILIES[0];
  readonly readiness = MAREA_FIXTURE_READINESS;

  private readonly hostileInput = {
    releaseGateOpen: false,
    buyCtaAllowed: true,
    cartAllowed: true,
    priceVisible: true,
    availabilityVisible: true,
    ctaState: 'PURCHASE',
    restrictions: ['PUBLICATION_NOT_AUTHORIZED', 'TRADEMARK_NOT_CLEARED', 'PRICE_NOT_APPROVED', 'STOCK_NOT_VERIFIED', 'SAFETY_GATE_BLOCKED'],
  } as unknown as MareaCommercialInput;

  readonly hostile = computed(() => deriveCommercialPresentation(this.hostileInput));
  readonly sanitizeState = sanitizeCtaState('PURCHASE');

  readonly ctaRows = computed(() => [
    { label: 'NAV-ESSENTIAL (DEFINED)', value: deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'SOFTWARE_SUBSCRIPTION', requiresQuotation: false }) },
    { label: 'PILOT-COASTAL (requiere presupuesto)', value: deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'HARDWARE_SYSTEM', requiresQuotation: true, familyId: 'PILOT' }) },
    { label: 'PILOT-PRO (paquete de instalación)', value: deriveCtaState({ definitionStatus: 'INSTALLATION_PACKAGE', editionType: 'INSTALLATION_PACKAGE', requiresQuotation: true, familyId: 'PILOT' }) },
    { label: 'AIS-CONNECTED (CONDITIONAL)', value: deriveCtaState({ definitionStatus: 'CONDITIONAL', editionType: 'HARDWARE_DEVICE', requiresQuotation: false }) },
    { label: 'FLEET-ENTERPRISE (contratado)', value: deriveCtaState({ definitionStatus: 'CONDITIONAL', editionType: 'CONTRACTED_SAAS', requiresQuotation: true, contractedSolution: true, familyId: 'FLEET' }) },
    { label: 'Documentación (informativo)', value: deriveCtaState({ definitionStatus: 'DEFINED', editionType: 'SOFTWARE_SUBSCRIPTION', requiresQuotation: false, informational: true }) },
    { label: 'Estado desconocido', value: sanitizeCtaState('BUY_NOW') },
  ]);
}
