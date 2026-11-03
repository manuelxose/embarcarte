import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../../../src/app/marea-design-system/core/i18n';
import { MareaText } from '../../../../src/app/marea-design-system/components/foundation/marea-text';
import { MareaStack } from '../../../../src/app/marea-design-system/components/foundation/marea-stack';
import { MareaDivider } from '../../../../src/app/marea-design-system/components/foundation/marea-divider';
import { MareaSectionHeading } from '../../../../src/app/marea-design-system/components/foundation/marea-section-heading';
import { MareaReadinessPanel } from '../../../../src/app/marea-design-system/components/commerce/marea-readiness-panel';
import { MareaFamilyCard } from '../../../../src/app/marea-design-system/components/commerce/marea-family-card';
import { MareaEditionCard } from '../../../../src/app/marea-design-system/components/commerce/marea-edition-card';
import { MareaBundleComponents } from '../../../../src/app/marea-design-system/components/commerce/marea-bundle-components';
import { MareaBundleExclusions } from '../../../../src/app/marea-design-system/components/commerce/marea-bundle-exclusions';
import { MareaEntitlementSummary } from '../../../../src/app/marea-design-system/components/commerce/marea-entitlement-summary';
import { MareaCompatibilityNotice } from '../../../../src/app/marea-design-system/components/commerce/marea-compatibility-notice';
import { MareaPriceUnavailable } from '../../../../src/app/marea-design-system/components/commerce/marea-price-unavailable';
import { MareaStockUnavailable } from '../../../../src/app/marea-design-system/components/commerce/marea-stock-unavailable';
import { MareaCommercialCta } from '../../../../src/app/marea-design-system/components/commerce/marea-commercial-cta';
import { MareaQuoteStatus } from '../../../../src/app/marea-design-system/components/commerce/marea-quote-status';
import { MareaDocumentationPanel } from '../../../../src/app/marea-design-system/components/commerce/marea-documentation-panel';
import { MareaComponentDoc } from '../component-doc';
import {
  deriveCommercialPresentation,
  deriveCtaState,
} from '../../../../src/app/marea-design-system/data/commerce-presentation.adapter';
import {
  FIXTURE_CLASSIFICATION,
  MAREA_FIXTURE_BUNDLES,
  MAREA_FIXTURE_EDITIONS,
  MAREA_FIXTURE_ENTITLEMENTS,
  MAREA_FIXTURE_FAMILIES,
  MAREA_FIXTURE_READINESS,
  type MareaFixtureBundle,
  type MareaFixtureEdition,
  type MareaFixtureFamily,
} from '../../../../src/app/marea-design-system/data/fixtures/marea-fixtures.generated';
import type {
  MareaCommercialPresentation,
  MareaCtaState,
  MareaDocumentationItem,
  MareaFamilySummary,
  MareaRestrictionKind,
} from '../../../../src/app/marea-design-system/core/types';

function familyFixture(familyId: string): MareaFixtureFamily {
  const family = MAREA_FIXTURE_FAMILIES.find((candidate) => candidate.familyId === familyId);
  if (!family) throw new Error(`Missing synthetic fixture family: ${familyId}`);
  return family;
}

function editionFixture(editionId: string): MareaFixtureEdition {
  const edition = MAREA_FIXTURE_EDITIONS.find((candidate) => candidate.editionId === editionId);
  if (!edition) throw new Error(`Missing synthetic fixture edition: ${editionId}`);
  return edition;
}

function bundleFixture(bundleId: string): MareaFixtureBundle {
  const bundle = MAREA_FIXTURE_BUNDLES.find((candidate) => candidate.bundleId === bundleId);
  if (!bundle) throw new Error(`Missing synthetic fixture bundle: ${bundleId}`);
  return bundle;
}

/** One fail-closed presentation per specimen, derived only through the real adapter. */
function presentationFor(
  ctaState: MareaCtaState,
  restrictions: readonly MareaRestrictionKind[],
): MareaCommercialPresentation {
  return deriveCommercialPresentation({
    releaseGateOpen: false,
    buyCtaAllowed: false,
    cartAllowed: false,
    priceVisible: false,
    availabilityVisible: false,
    ctaState,
    restrictions,
  });
}

/** One hostile family-card specimen. Synthetic internal demo data only. */
interface AdversarialFamilyCase {
  readonly testId: string;
  readonly heading: string;
  readonly family: MareaFamilySummary;
  readonly presentation: MareaCommercialPresentation;
}

const SYNTHETIC_SUMMARY = {
  es: 'Especimen sintético interno para probar límites adversariales. Sin precio, stock ni oferta.',
  en: 'Synthetic internal specimen for adversarial limitation testing. No price, stock or offer.',
} as const;

function syntheticFamily(
  familyId: string,
  displayName: string,
  restrictions: readonly MareaRestrictionKind[] | undefined,
): MareaFamilySummary {
  return {
    familyId,
    displayName,
    definitionStatus: 'DEFINED',
    editionCount: 0,
    readiness: 'BLOCKED',
    summary: SYNTHETIC_SUMMARY,
    // The missing-restrictions specimen deliberately violates the static type.
    restrictions: restrictions as readonly MareaRestrictionKind[],
  };
}

function adversarialCase(
  testId: string,
  heading: string,
  restrictions: readonly MareaRestrictionKind[] | undefined,
): AdversarialFamilyCase {
  return {
    testId,
    heading: `Synthetic · ${heading}`,
    family: syntheticFamily(testId, `SYNTHETIC · ${heading}`, restrictions),
    presentation: presentationFor('NOT_AVAILABLE', restrictions ?? []),
  };
}

/**
 * Commercial presentation specimens.
 *
 * Every card receives its own `deriveCommercialPresentation(...)` result and the
 * exact restrictions of its synthetic fixture. The gallery renders no purchase
 * action, no amount and no quantity: the only commercial output is explanation.
 */
@Component({
  selector: 'marea-commerce-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaText,
    MareaStack,
    MareaDivider,
    MareaSectionHeading,
    MareaReadinessPanel,
    MareaFamilyCard,
    MareaEditionCard,
    MareaBundleComponents,
    MareaBundleExclusions,
    MareaEntitlementSummary,
    MareaCompatibilityNotice,
    MareaPriceUnavailable,
    MareaStockUnavailable,
    MareaCommercialCta,
    MareaQuoteStatus,
    MareaDocumentationPanel,
    MareaComponentDoc,
  ],
  template: `
    <marea-stack [gap]="6">
      <section aria-labelledby="commerce-readiness-title">
        <marea-section-heading
          [level]="3"
          id="commerce-readiness-title"
          kicker="Preparación"
          heading="Panel de preparación"
          lead="Once dimensiones derivadas en servidor. El panel muestra etiquetas, notas y un recuento opaco de puertas bloqueadas; nunca promueve el ciclo de vida del producto."
        />
        <marea-readiness-panel [summary]="readiness" />
        <marea-component-doc componentId="marea-readiness-panel" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-families-title">
        <marea-section-heading
          [level]="3"
          id="commerce-families-title"
          kicker="Comercio"
          heading="Fichas de familia"
          lead="Cada ficha recibe su propia presentación derivada y las restricciones exactas del fixture de familia. Ninguna incluye una acción de compra."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">NAV</h4>
          <marea-family-card
            data-testid="family-card-NAV"
            [family]="navFamily"
            [presentation]="navPresentation"
          />
          <h4 marea-text variant="heading">PILOT</h4>
          <marea-family-card
            data-testid="family-card-PILOT"
            [family]="pilotFamily"
            [presentation]="pilotPresentation"
          />
          <h4 marea-text variant="heading">FLEET</h4>
          <marea-family-card
            data-testid="family-card-FLEET"
            [family]="fleetFamily"
            [presentation]="fleetPresentation"
          />
          <h4 marea-text variant="heading">AIS</h4>
          <marea-family-card
            data-testid="family-card-AIS"
            [family]="aisFamily"
            [presentation]="aisPresentation"
          />
          <h4 marea-text variant="heading">WATCH</h4>
          <marea-family-card
            data-testid="family-card-WATCH"
            [family]="watchFamily"
            [presentation]="watchPresentation"
          />
          <h4 marea-text variant="heading">SENSE</h4>
          <marea-family-card
            data-testid="family-card-SENSE"
            [family]="senseFamily"
            [presentation]="sensePresentation"
            [kitNote]="senseKitNote()"
          />
          <h4 marea-text variant="heading">DISPLAY</h4>
          <marea-family-card
            data-testid="family-card-DISPLAY"
            [family]="displayFamily"
            [presentation]="displayPresentation"
          />
          <h4 marea-text variant="heading">WEATHER</h4>
          <marea-family-card
            data-testid="family-card-WEATHER"
            [family]="weatherFamily"
            [presentation]="weatherPresentation"
          />
          <h4 marea-text variant="heading">HUB</h4>
          <marea-family-card
            data-testid="family-card-HUB"
            [family]="hubFamily"
            [presentation]="hubPresentation"
          />
        </marea-stack>
        <marea-component-doc componentId="marea-family-card" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-adversarial-families-title">
        <marea-section-heading
          [level]="3"
          id="commerce-adversarial-families-title"
          kicker="Adversarial"
          heading="Fichas adversariales de familia"
          lead="Seis casos sintéticos internos con orden hostil, duplicados y datos malformados. Ninguna ficha incluye precio, stock ni acción de compra: las puertas materiales deben sobrevivir siempre al recorte de cuatro etiquetas."
        />
        <marea-stack [gap]="4">
          @for (specimen of adversarialFamilyCases; track specimen.testId) {
            <h4 marea-text variant="heading">{{ specimen.heading }}</h4>
            <marea-family-card
              [attr.data-testid]="specimen.testId"
              [family]="specimen.family"
              [presentation]="specimen.presentation"
            />
          }
        </marea-stack>
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-editions-title">
        <marea-section-heading
          [level]="3"
          id="commerce-editions-title"
          kicker="Comercio"
          heading="Fichas de edición"
          lead="Una edición es una definición, nunca un SKU comerciable. Las tres fichas incluyen siempre el bloque de precio retenido y el de disponibilidad no verificada."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">NAV-ESSENTIAL</h4>
          <marea-edition-card [edition]="navEssential" [presentation]="navEssentialPresentation" />
          <h4 marea-text variant="heading">PILOT-PRO</h4>
          <marea-edition-card [edition]="pilotPro" [presentation]="pilotProPresentation" />
          <h4 marea-text variant="heading">DISPLAY-LARGE-CONDITIONAL</h4>
          <marea-edition-card [edition]="displayLarge" [presentation]="displayLargePresentation" />
        </marea-stack>
        <marea-component-doc componentId="marea-edition-card" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-bundle-title">
        <marea-section-heading
          [level]="3"
          id="commerce-bundle-title"
          kicker="Comercio"
          heading="Componentes de paquete"
          lead="Listas de componentes obligatorios y opcionales de START, FLEET y PROTECT. Un kit se expande en su propia línea y no se cuenta como líneas adicionales."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">MAREA START · obligatorios</h4>
          <marea-bundle-components [components]="startBundle.components" />
          <h4 marea-text variant="heading">MAREA START · opcionales</h4>
          <marea-bundle-components [components]="startBundle.optionalComponents" />
          <h4 marea-text variant="heading">MAREA FLEET · obligatorios</h4>
          <marea-bundle-components [components]="fleetBundle.components" />
          <h4 marea-text variant="heading">MAREA FLEET · opcionales</h4>
          <marea-bundle-components [components]="fleetBundle.optionalComponents" />
          <h4 marea-text variant="heading">MAREA PROTECT · obligatorios</h4>
          <marea-bundle-components [components]="protectBundle.components" />
        </marea-stack>
        <marea-component-doc componentId="marea-bundle-components" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-exclusions-title">
        <marea-section-heading
          [level]="3"
          id="commerce-exclusions-title"
          kicker="Comercio"
          heading="Exclusiones de paquete"
          lead="Exclusiones, elementos solo por contrato y requisitos externos del paquete COMPLETE. Un conjunto vacío se declara en lugar de omitirse."
        />
        <h4 marea-text variant="heading">MAREA COMPLETE</h4>
        <marea-bundle-exclusions
          [contractOnly]="completeBundle.contractOnly"
          [ineligible]="completeBundle.ineligible"
          [externalRequirements]="completeBundle.externalRequirements"
        />
        <marea-component-doc componentId="marea-bundle-exclusions" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-entitlements-title">
        <marea-section-heading
          [level]="3"
          id="commerce-entitlements-title"
          kicker="Derechos"
          heading="Resumen de derechos de uso"
          lead="Todos los derechos del fixture. Los que comparten una misma clave de registro se agrupan en una sola fila y declaran el derecho compartido, para no presentar un derecho como dos."
        />
        <marea-entitlement-summary [entitlements]="entitlements" />
        <marea-component-doc componentId="marea-entitlement-summary" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-compatibility-title">
        <marea-section-heading
          [level]="3"
          id="commerce-compatibility-title"
          kicker="Límites"
          heading="Aviso de compatibilidad"
          lead="Estado UNTESTED con cero filas probadas. El componente trata cualquier recuento cero como no verificado aunque el código de estado dijera otra cosa."
        />
        <marea-compatibility-notice status="UNTESTED" [testedRows]="0" />
        <marea-component-doc componentId="marea-compatibility-notice" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-price-title">
        <marea-section-heading
          [level]="3"
          id="commerce-price-title"
          kicker="Límites"
          heading="Precio y disponibilidad retenidos"
          lead="Códigos de estado opacos de MC-16. Ningún importe, moneda ni cantidad entra en estos componentes."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">Precio</h4>
          <marea-price-unavailable priceStatus="PRICE_NOT_APPROVED" />
          <h4 marea-text variant="heading">Disponibilidad</h4>
          <marea-stock-unavailable stockState="STOCK_NOT_VERIFIED" />
        </marea-stack>
        <marea-component-doc componentId="marea-price-unavailable" />
        <marea-component-doc componentId="marea-stock-unavailable" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-cta-title">
        <marea-section-heading
          [level]="3"
          id="commerce-cta-title"
          kicker="Comercio"
          heading="Los cinco estados de llamada a la acción"
          lead="Cada estado se construye con deriveCommercialPresentation y se representa como explicación, nunca como botón. Todas las señales de compra, carrito, precio y disponibilidad se neutralizan."
        />
        <marea-stack [gap]="4">
          @for (example of ctaExamples; track example.state) {
            <h4 marea-text variant="heading">{{ example.state }}</h4>
            <marea-commercial-cta [presentation]="example.presentation" />
          }
        </marea-stack>
        <marea-component-doc componentId="marea-commercial-cta" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-quote-title">
        <marea-section-heading
          [level]="3"
          id="commerce-quote-title"
          kicker="Comercio"
          heading="Estado de presupuesto"
          lead="Categoría de interacción contractual futura. No es una oferta, no muestra importe y no garantiza un presupuesto."
        />
        <marea-quote-status scope="PILOT-PRO · paquete de instalación" />
        <marea-component-doc componentId="marea-quote-status" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="commerce-documentation-title">
        <marea-section-heading
          [level]="3"
          id="commerce-documentation-title"
          kicker="Documentación"
          heading="Panel de documentación"
          lead="Tres elementos de demostración y un ejemplo vacío. No se enlaza ninguna página pública y la familia se identifica con un código interno."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">Con tres elementos</h4>
          <marea-documentation-panel familyId="NAV" [items]="documentationItems" />
          <h4 marea-text variant="heading">Sin elementos</h4>
          <marea-documentation-panel familyId="WATCH" [items]="noDocumentation" />
        </marea-stack>
        <marea-component-doc componentId="marea-documentation-panel" />
      </section>
    </marea-stack>
  `,
  styles: `
    :host {
      display: block;
    }
    section {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
      min-inline-size: 0;
    }
    h4 {
      margin: 4px 0 0;
    }
  `,
})
export class CommerceGallery {
  private readonly i18n = inject(MareaI18n);

  readonly readiness = MAREA_FIXTURE_READINESS;

  readonly navFamily = familyFixture('NAV');
  readonly pilotFamily = familyFixture('PILOT');
  readonly fleetFamily = familyFixture('FLEET');
  readonly aisFamily = familyFixture('AIS');
  readonly watchFamily = familyFixture('WATCH');
  readonly senseFamily = familyFixture('SENSE');
  readonly displayFamily = familyFixture('DISPLAY');
  readonly weatherFamily = familyFixture('WEATHER');
  readonly hubFamily = familyFixture('HUB');

  readonly navPresentation = this.familyPresentation(this.navFamily);
  readonly pilotPresentation = this.familyPresentation(this.pilotFamily);
  readonly fleetPresentation = this.familyPresentation(this.fleetFamily);
  readonly aisPresentation = this.familyPresentation(this.aisFamily);
  readonly watchPresentation = this.familyPresentation(this.watchFamily);
  readonly sensePresentation = this.familyPresentation(this.senseFamily);
  readonly displayPresentation = this.familyPresentation(this.displayFamily);
  readonly weatherPresentation = this.familyPresentation(this.weatherFamily);
  readonly hubPresentation = this.familyPresentation(this.hubFamily);

  /** SENSE kit composition copy, rendered next to the family limit. */
  readonly senseKitNote = computed(() => this.i18n.text('senseEssentialsKit'));

  readonly adversarialFamilyCases: readonly AdversarialFamilyCase[] = [
    adversarialCase('family-card-adversarial-safety-first', 'safety restriction first', [
      'SAFETY_GATE_BLOCKED',
      'TRADEMARK_NOT_CLEARED',
      'PRICE_NOT_APPROVED',
      'STOCK_NOT_VERIFIED',
      'PUBLICATION_NOT_AUTHORIZED',
    ]),
    adversarialCase('family-card-adversarial-safety-fifth', 'safety restriction fifth', [
      'PUBLICATION_NOT_AUTHORIZED',
      'TRADEMARK_NOT_CLEARED',
      'PRICE_NOT_APPROVED',
      'STOCK_NOT_VERIFIED',
      'SAFETY_GATE_BLOCKED',
    ]),
    adversarialCase('family-card-adversarial-duplicates', 'duplicate restrictions', [
      'SAFETY_GATE_BLOCKED',
      'SAFETY_GATE_BLOCKED',
      'TRADEMARK_NOT_CLEARED',
      'BRAND_PROVISIONAL',
      'PRICE_NOT_APPROVED',
      'PRICE_NOT_APPROVED',
    ]),
    adversarialCase(
      'family-card-adversarial-missing-restrictions',
      'missing restrictions array',
      undefined,
    ),
    adversarialCase('family-card-adversarial-unknown-kind', 'unknown restriction kind', [
      'FUTURE_UNKNOWN_GATE' as MareaRestrictionKind,
    ]),
    adversarialCase(
      'family-card-adversarial-dual-blocking',
      'two simultaneous blocking restrictions',
      ['LICENSING_NOT_CLEARED', 'SAFETY_GATE_BLOCKED'],
    ),
  ];

  readonly navEssential = editionFixture('NAV-ESSENTIAL');
  readonly pilotPro = editionFixture('PILOT-PRO');
  readonly displayLarge = editionFixture('DISPLAY-LARGE-CONDITIONAL');

  readonly navEssentialPresentation = this.editionPresentation(this.navEssential);
  readonly pilotProPresentation = this.editionPresentation(this.pilotPro);
  readonly displayLargePresentation = this.editionPresentation(this.displayLarge);

  readonly startBundle = bundleFixture('START');
  readonly fleetBundle = bundleFixture('FLEET');
  readonly protectBundle = bundleFixture('PROTECT');
  readonly completeBundle = bundleFixture('COMPLETE');

  readonly entitlements = MAREA_FIXTURE_ENTITLEMENTS;

  readonly ctaStates: readonly MareaCtaState[] = [
    'DISABLED',
    'COMING_SOON',
    'REQUEST_INFORMATION',
    'QUOTE_ONLY',
    'NOT_AVAILABLE',
  ];

  readonly ctaExamples = this.ctaStates.map((state) => ({
    state,
    presentation: presentationFor(state, ['PUBLICATION_NOT_AUTHORIZED']),
  }));

  readonly documentationItems: readonly MareaDocumentationItem[] = [
    {
      title: 'Specimen interno de documentación A',
      kind: FIXTURE_CLASSIFICATION,
      status: 'AVAILABLE',
      limitation: 'Documento de demostración; no es documentación técnica aprobada.',
    },
    {
      title: 'Specimen interno de documentación B',
      kind: FIXTURE_CLASSIFICATION,
      status: 'PENDING',
      limitation: null,
    },
    {
      title: 'Specimen interno de documentación C',
      kind: FIXTURE_CLASSIFICATION,
      status: 'PENDING',
      limitation: 'Sin documento autorizado: no existe página pública enlazada.',
    },
  ];

  readonly noDocumentation: readonly MareaDocumentationItem[] = [];

  private familyPresentation(family: MareaFixtureFamily): MareaCommercialPresentation {
    const editions = MAREA_FIXTURE_EDITIONS.filter(
      (edition) => edition.familyId === family.familyId,
    );
    const primary = editions[0];
    return presentationFor(
      deriveCtaState({
        definitionStatus: primary?.definitionStatus ?? family.definitionStatus,
        editionType: primary?.editionType ?? 'FAMILY',
        requiresQuotation: editions.some((edition) => edition.requiresQuotation),
        contractedSolution: family.familyId === 'FLEET',
        familyId: family.familyId,
      }),
      family.restrictions,
    );
  }

  private editionPresentation(edition: MareaFixtureEdition): MareaCommercialPresentation {
    return presentationFor(
      deriveCtaState({
        definitionStatus: edition.definitionStatus,
        editionType: edition.editionType,
        requiresQuotation: edition.requiresQuotation,
        familyId: edition.familyId,
      }),
      edition.restrictions,
    );
  }
}
