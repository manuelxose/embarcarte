import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MareaI18n } from '../../../../src/app/marea-design-system/core/i18n';
import { MareaText } from '../../../../src/app/marea-design-system/components/foundation/marea-text';
import { MareaStack } from '../../../../src/app/marea-design-system/components/foundation/marea-stack';
import { MareaDivider } from '../../../../src/app/marea-design-system/components/foundation/marea-divider';
import { MareaSectionHeading } from '../../../../src/app/marea-design-system/components/foundation/marea-section-heading';
import {
  MareaTabs,
  type MareaTabItem,
} from '../../../../src/app/marea-design-system/components/structured/marea-tabs';
import { MareaTabPanel } from '../../../../src/app/marea-design-system/components/structured/marea-tab-panel';
import {
  MareaAccordion,
  type MareaAccordionItem,
} from '../../../../src/app/marea-design-system/components/structured/marea-accordion';
import { MareaDisclosure } from '../../../../src/app/marea-design-system/components/structured/marea-disclosure';
import {
  MareaSpecTable,
  type MareaSpecRow,
} from '../../../../src/app/marea-design-system/components/structured/marea-spec-table';
import {
  MareaDefinitionList,
  type MareaDefinitionItem,
} from '../../../../src/app/marea-design-system/components/structured/marea-definition-list';
import {
  MareaResponsiveNav,
  type MareaNavItem,
} from '../../../../src/app/marea-design-system/components/structured/marea-responsive-nav';
import {
  MareaBreadcrumb,
  type MareaBreadcrumbItem,
} from '../../../../src/app/marea-design-system/components/structured/marea-breadcrumb';
import { MareaStatusDisplay } from '../../../../src/app/marea-design-system/components/structured/marea-status-display';
import {
  MareaFeatureComparison,
  type MareaComparisonOption,
  type MareaComparisonRow,
} from '../../../../src/app/marea-design-system/components/structured/marea-feature-comparison';
import { MareaDataQuality } from '../../../../src/app/marea-design-system/components/structured/marea-data-quality';
import { MareaPermissionNotice } from '../../../../src/app/marea-design-system/components/structured/marea-permission-notice';
import { MareaComponentDoc } from '../component-doc';
import {
  MAREA_FIXTURE_FAMILIES,
  type MareaFixtureFamily,
} from '../../../../src/app/marea-design-system/data/fixtures/marea-fixtures.generated';

function familyFixture(familyId: string): MareaFixtureFamily {
  const family = MAREA_FIXTURE_FAMILIES.find((candidate) => candidate.familyId === familyId);
  if (!family) throw new Error(`Missing synthetic fixture family: ${familyId}`);
  return family;
}

/**
 * Structural and interaction specimens.
 *
 * Every example renders the real Angular component with synthetic internal
 * fixture data. Tabs, accordions, disclosures and the responsive navigation are
 * genuinely operable: no specimen button is inert.
 */
@Component({
  selector: 'marea-structured-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaText,
    MareaStack,
    MareaDivider,
    MareaSectionHeading,
    MareaTabs,
    MareaTabPanel,
    MareaAccordion,
    MareaDisclosure,
    MareaSpecTable,
    MareaDefinitionList,
    MareaResponsiveNav,
    MareaBreadcrumb,
    MareaStatusDisplay,
    MareaFeatureComparison,
    MareaDataQuality,
    MareaPermissionNotice,
    MareaComponentDoc,
  ],
  template: `
    <marea-stack [gap]="6">
      <section aria-labelledby="structured-tabs-title">
        <marea-section-heading
          [level]="3"
          id="structured-tabs-title"
          kicker="Estructura"
          heading="Pestañas"
          lead="Tres paneles reales. Las flechas izquierda/derecha, Inicio y Fin mueven el foco y activan la pestaña; el panel inactivo queda oculto y fuera del orden de tabulación."
        />
        <marea-tabs
          label="Pestañas del catálogo interno"
          [items]="tabItems"
          [activeId]="activeTab()"
          (activeIdChange)="activeTab.set($event)"
        />
        <marea-tab-panel
          itemId="structured-tab-nav"
          [active]="activeTab() === 'structured-tab-nav'"
        >
          <marea-stack [gap]="1">
            <p marea-text variant="bodySmall">
              {{ navFamily.displayName }} · {{ i18n.text('editions') }}:
              {{ navFamily.editionCount }}
            </p>
            <p marea-text variant="meta">
              {{ navFamily.definitionStatus }} · {{ navFamily.readiness }} ·
              SYNTHETIC_INTERNAL_FIXTURE
            </p>
          </marea-stack>
        </marea-tab-panel>
        <marea-tab-panel
          itemId="structured-tab-pilot"
          [active]="activeTab() === 'structured-tab-pilot'"
        >
          <marea-stack [gap]="1">
            <p marea-text variant="bodySmall">
              {{ pilotFamily.displayName }} · {{ i18n.text('editions') }}:
              {{ pilotFamily.editionCount }}
            </p>
            <p marea-text variant="meta">
              {{ pilotFamily.definitionStatus }} · {{ pilotFamily.readiness }} ·
              SYNTHETIC_INTERNAL_FIXTURE
            </p>
          </marea-stack>
        </marea-tab-panel>
        <marea-tab-panel
          itemId="structured-tab-fleet"
          [active]="activeTab() === 'structured-tab-fleet'"
        >
          <marea-stack [gap]="1">
            <p marea-text variant="bodySmall">
              {{ fleetFamily.displayName }} · {{ i18n.text('editions') }}:
              {{ fleetFamily.editionCount }}
            </p>
            <p marea-text variant="meta">
              {{ fleetFamily.definitionStatus }} · {{ fleetFamily.readiness }} ·
              SYNTHETIC_INTERNAL_FIXTURE
            </p>
          </marea-stack>
        </marea-tab-panel>
        <marea-component-doc componentId="marea-tabs" />
        <marea-component-doc componentId="marea-tab-panel" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-accordion-title">
        <marea-section-heading
          [level]="3"
          id="structured-accordion-title"
          kicker="Estructura"
          heading="Acordeón"
          lead="Detalles nativos en dos modos. En modo único un mismo nombre de grupo da exclusividad nativa; el teclado y el anuncio expandido/contraído los aporta el navegador."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">Modo múltiple</h4>
          <marea-accordion [items]="accordionItems" mode="multiple" />
          <h4 marea-text variant="heading">Modo único</h4>
          <marea-accordion [items]="accordionItems" mode="single" />
        </marea-stack>
        <marea-component-doc componentId="marea-accordion" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-disclosure-title">
        <marea-section-heading
          [level]="3"
          id="structured-disclosure-title"
          kicker="Estructura"
          heading="Divulgación simple"
          lead="El estado abierto es propiedad del consumidor y se reporta al plegar; el detalle nativo conserva el foco y el anuncio."
        />
        <marea-disclosure
          summary="Alcance interno del espécimen"
          meta="SYNTHETIC_INTERNAL_FIXTURE"
          [open]="disclosureOpen()"
          (openedChange)="disclosureOpen.set($event)"
        >
          <marea-stack [gap]="2">
            <p marea-text variant="bodySmall">
              Este contenido no es documentación aprobada ni una afirmación comercial. El estado
              abierto vive en el consumidor y no en el componente.
            </p>
            <p marea-text variant="meta">
              Sin enlaces públicos y sin datos de cliente, embarcación o certificación.
            </p>
          </marea-stack>
        </marea-disclosure>
        <marea-component-doc componentId="marea-disclosure" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-spec-title">
        <marea-section-heading
          [level]="3"
          id="structured-spec-title"
          kicker="Datos"
          heading="Tabla de especificaciones"
          lead="Seis filas densas con una columna de valor larga. La tabla conserva caption y encabezados de fila, y se desplaza dentro de una región enfocable sin desbordar la página."
        />
        <marea-spec-table
          caption="Ficha técnica de fixtures internos (seis filas)"
          [rows]="specRows"
        />
        <marea-component-doc componentId="marea-spec-table" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-definition-title">
        <marea-section-heading
          [level]="3"
          id="structured-definition-title"
          kicker="Datos"
          heading="Lista de definiciones"
          lead="Lista nativa dl/dt/dd con etiqueta opcional asociada; en móvil pasa a una columna sin perder la relación término/definición."
        />
        <marea-definition-list [label]="i18n.text('definitionList')" [items]="definitionItems" />
        <marea-component-doc componentId="marea-definition-list" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-nav-title">
        <marea-section-heading
          [level]="3"
          id="structured-nav-title"
          kicker="Navegación"
          heading="Navegación adaptable"
          lead="Cuatro elementos internos con la página actual marcada por aria-current, peso y subrayado. Por debajo de 1024px el botón nativo abre y cierra la lista; Escape la cierra y devuelve el foco."
        />
        <marea-responsive-nav [label]="i18n.text('mainNavigation')" [items]="navItems" />
        <marea-component-doc componentId="marea-responsive-nav" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-breadcrumb-title">
        <marea-section-heading
          [level]="3"
          id="structured-breadcrumb-title"
          kicker="Navegación"
          heading="Migas de pan"
          lead="Tres niveles con el último elemento como página actual y sin enlace. Los separadores son decorativos y no se anuncian."
        />
        <marea-breadcrumb [items]="breadcrumbItems" />
        <marea-component-doc componentId="marea-breadcrumb" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-status-title">
        <marea-section-heading
          [level]="3"
          id="structured-status-title"
          kicker="Estados"
          heading="Línea de estado"
          lead="Icono semántico, etiqueta visible y explicación. El color solo refuerza; el estado siempre se lee en texto."
        />
        <marea-stack [gap]="4">
          <marea-status-display
            tone="critical"
            [label]="i18n.text('blocked')"
            description="Puerta de seguridad bloqueada en el fixture de PILOT."
            meta="SYNTHETIC_INTERNAL_FIXTURE"
          />
          <marea-status-display
            tone="warning"
            [label]="i18n.text('unverified')"
            description="Evidencia de presentación sin verificación registrada."
            meta="SYNTHETIC_INTERNAL_FIXTURE"
          />
          <marea-status-display
            tone="safe"
            [label]="i18n.text('verified')"
            description="Dato sintético consistente dentro del fixture; no certifica el producto."
            meta="SYNTHETIC_INTERNAL_FIXTURE"
          />
        </marea-stack>
        <marea-component-doc componentId="marea-status-display" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-comparison-title">
        <marea-section-heading
          [level]="3"
          id="structured-comparison-title"
          kicker="Datos"
          heading="Comparación de funciones"
          lead="Tres opciones por cuatro filas. Las celdas booleanas se traducen a sí/no y una celda sin dato se declara no verificada en lugar de quedar en blanco."
        />
        <marea-feature-comparison
          caption="Comparación de fixtures de familia (3 opciones x 4 filas)"
          [options]="comparisonOptions"
          [rows]="comparisonRows"
        />
        <marea-component-doc componentId="marea-feature-comparison" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-data-quality-title">
        <marea-section-heading
          [level]="3"
          id="structured-data-quality-title"
          kicker="Datos"
          heading="Calidad del dato"
          lead="Los cinco estados se aplican a dimensiones de evidencia del fixture. Ninguno se infiere: el estado se declara y la evidencia se muestra como etiqueta/valor."
        />
        <marea-stack [gap]="4">
          <marea-data-quality
            dimension="FIXTURE DE FAMILIAS"
            status="VERIFIED"
            evidence="MAREA_FIXTURE_FAMILIES"
            note="Registro interno consistente; no evalúa la preparación del producto."
          />
          <marea-data-quality
            dimension="FIXTURE DE EDICIONES"
            status="PARTIAL"
            evidence="MAREA_FIXTURE_EDITIONS"
            note="Cobertura parcial: los campos de seguridad y licencia figuran sin evaluar."
          />
          <marea-data-quality
            dimension="LICENCIA DE DATOS"
            status="UNVERIFIED"
            evidence="LICENSING_NOT_CLEARED"
            note="Sin licencia acreditada; no se representa como incluida."
          />
          <marea-data-quality
            dimension="INSTANTÁNEA GENERADA"
            status="STALE"
            evidence="GENERATED_SNAPSHOT"
            note="Instantánea estática del generador; no es un dato en vivo."
          />
          <marea-data-quality
            dimension="EVIDENCIA DE PRECIO"
            status="MISSING"
            evidence="PRICE_NOT_APPROVED"
            note="No existe importe aprobado que representar."
          />
        </marea-stack>
        <marea-component-doc componentId="marea-data-quality" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="structured-permission-title">
        <marea-section-heading
          [level]="3"
          id="structured-permission-title"
          kicker="Permisos"
          heading="Aviso de autorización"
          lead="Tres categorías de restricción. El encabezado se deriva del diccionario existente y el cuerpo declara el ámbito interno sin afirmar aprobación alguna."
        />
        <marea-stack [gap]="4">
          <marea-permission-notice
            kind="PUBLICATION_NOT_AUTHORIZED"
            scope="MAREA NAV · fixture interno no publicado"
          />
          <marea-permission-notice
            kind="TRADEMARK_NOT_CLEARED"
            scope="MAREA NAV · identidad propuesta, no adoptada"
          />
          <marea-permission-notice
            kind="SAFETY_GATE_BLOCKED"
            detail="MAREA PILOT · concepto supervisado sin control de gobierno en vivo"
          />
        </marea-stack>
        <marea-component-doc componentId="marea-permission-notice" />
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
export class StructuredGallery {
  readonly i18n = inject(MareaI18n);

  readonly navFamily = familyFixture('NAV');
  readonly pilotFamily = familyFixture('PILOT');
  readonly fleetFamily = familyFixture('FLEET');

  readonly tabItems: readonly MareaTabItem[] = [
    { id: 'structured-tab-nav', label: 'MAREA NAV' },
    { id: 'structured-tab-pilot', label: 'MAREA PILOT' },
    { id: 'structured-tab-fleet', label: 'MAREA FLEET' },
  ];
  readonly activeTab = signal<string | null>('structured-tab-nav');
  readonly disclosureOpen = signal(false);

  get accordionItems(): readonly MareaAccordionItem[] {
    return [
      {
        id: 'structured-accordion-nav',
        title: 'NAV',
        body: this.navFamily.summary[this.i18n.locale()],
        note: 'SYNTHETIC_INTERNAL_FIXTURE',
      },
      {
        id: 'structured-accordion-pilot',
        title: 'PILOT',
        body: this.pilotFamily.summary[this.i18n.locale()],
        note: 'SYNTHETIC_INTERNAL_FIXTURE',
      },
      {
        id: 'structured-accordion-fleet',
        title: 'FLEET',
        body: this.fleetFamily.summary[this.i18n.locale()],
        note: 'SYNTHETIC_INTERNAL_FIXTURE',
      },
    ];
  }

  get specRows(): readonly MareaSpecRow[] {
    return [
      { label: 'NAV · definitionStatus', value: this.navFamily.definitionStatus },
      {
        label: 'NAV · readiness',
        value: this.navFamily.readiness,
        note: 'SYNTHETIC_INTERNAL_FIXTURE',
      },
      { label: 'NAV · editionCount', value: String(this.navFamily.editionCount) },
      { label: 'PILOT · readiness', value: this.pilotFamily.readiness },
      { label: 'FLEET · readiness', value: this.fleetFamily.readiness },
      {
        label: 'FLEET · restrictions',
        value: this.fleetFamily.restrictions.join(', '),
        note: 'Valor largo de ejemplo para comprobar el ajuste de línea dentro de la tabla.',
      },
    ];
  }

  get definitionItems(): readonly MareaDefinitionItem[] {
    return [
      {
        term: 'NAV',
        definition: `${this.navFamily.definitionStatus} · ${this.navFamily.readiness}`,
      },
      {
        term: 'PILOT',
        definition: `${this.pilotFamily.definitionStatus} · ${this.pilotFamily.readiness}`,
        note: 'SYNTHETIC_INTERNAL_FIXTURE',
      },
      {
        term: 'FLEET · restrictions',
        definition: this.fleetFamily.restrictions.join(', '),
        note: 'Códigos internos, no condiciones comerciales publicadas.',
      },
      {
        term: 'NAV · summary',
        definition: this.navFamily.summary[this.i18n.locale()],
        note: 'Texto de fixture, no copy de producto.',
      },
    ];
  }

  readonly navItems: readonly MareaNavItem[] = [
    {
      id: 'structured-nav-current',
      label: 'Estructura e interacción',
      href: '#estructura',
      current: true,
    },
    { id: 'structured-nav-commerce', label: 'Presentación comercial', href: '#comercio' },
    { id: 'structured-nav-instrument', label: 'Instrumentación interna', href: '#instrumentos' },
    { id: 'structured-nav-foundation', label: 'Fundamentos', href: '#fundamentos' },
  ];

  readonly breadcrumbItems: readonly MareaBreadcrumbItem[] = [
    { label: 'MC-17' },
    { label: 'Catálogo interno', href: '#fundamentos' },
    { label: 'Estructura e interacción' },
  ];

  readonly comparisonOptions: readonly MareaComparisonOption[] = [
    { id: 'NAV', label: 'MAREA NAV' },
    { id: 'PILOT', label: 'MAREA PILOT' },
    { id: 'FLEET', label: 'MAREA FLEET' },
  ];

  get comparisonRows(): readonly MareaComparisonRow[] {
    const has = (
      family: MareaFixtureFamily,
      restriction: (typeof family.restrictions)[number],
    ): boolean => family.restrictions.includes(restriction);
    return [
      {
        feature: 'editionCount',
        values: {
          NAV: String(this.navFamily.editionCount),
          PILOT: String(this.pilotFamily.editionCount),
          FLEET: String(this.fleetFamily.editionCount),
        },
      },
      {
        feature: 'PUBLICATION_NOT_AUTHORIZED',
        values: {
          NAV: has(this.navFamily, 'PUBLICATION_NOT_AUTHORIZED'),
          PILOT: has(this.pilotFamily, 'PUBLICATION_NOT_AUTHORIZED'),
          FLEET: has(this.fleetFamily, 'PUBLICATION_NOT_AUTHORIZED'),
        },
      },
      {
        feature: 'SAFETY_GATE_BLOCKED',
        values: {
          NAV: has(this.navFamily, 'SAFETY_GATE_BLOCKED'),
          PILOT: has(this.pilotFamily, 'SAFETY_GATE_BLOCKED'),
          FLEET: has(this.fleetFamily, 'SAFETY_GATE_BLOCKED'),
        },
      },
      {
        feature: 'COMPATIBILITY_VERIFIED',
        values: {
          NAV: null,
          PILOT: false,
          FLEET: false,
        },
      },
    ];
  }
}
