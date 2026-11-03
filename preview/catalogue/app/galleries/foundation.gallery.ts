import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MareaText } from '../../../../src/app/marea-design-system/components/foundation/marea-text';
import { MareaSectionHeading } from '../../../../src/app/marea-design-system/components/foundation/marea-section-heading';
import { MareaContainer } from '../../../../src/app/marea-design-system/components/foundation/marea-container';
import { MareaGrid } from '../../../../src/app/marea-design-system/components/foundation/marea-grid';
import { MareaStack } from '../../../../src/app/marea-design-system/components/foundation/marea-stack';
import { MareaInline } from '../../../../src/app/marea-design-system/components/foundation/marea-inline';
import { MareaDivider } from '../../../../src/app/marea-design-system/components/foundation/marea-divider';
import { MareaSurface } from '../../../../src/app/marea-design-system/components/foundation/marea-surface';
import { MareaButton } from '../../../../src/app/marea-design-system/components/foundation/marea-button';
import { MareaLink } from '../../../../src/app/marea-design-system/components/foundation/marea-link';
import { MareaIcon } from '../../../../src/app/marea-design-system/components/foundation/marea-icon';
import { MareaStatusBadge } from '../../../../src/app/marea-design-system/components/foundation/marea-status-badge';
import { MareaNotice } from '../../../../src/app/marea-design-system/components/foundation/marea-notice';
import { MareaStatePanel } from '../../../../src/app/marea-design-system/components/foundation/marea-state-panel';
import { MareaFormField } from '../../../../src/app/marea-design-system/components/foundation/marea-form-field';
import { MareaInput } from '../../../../src/app/marea-design-system/components/foundation/marea-input';
import { MareaComponentDoc } from '../component-doc';
import { MAREA_ICON_NAMES } from '../../../../src/app/marea-design-system/components/foundation/marea-icon-paths';

@Component({
  selector: 'marea-foundation-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaText,
    MareaSectionHeading,
    MareaContainer,
    MareaGrid,
    MareaStack,
    MareaInline,
    MareaDivider,
    MareaSurface,
    MareaButton,
    MareaLink,
    MareaIcon,
    MareaStatusBadge,
    MareaNotice,
    MareaStatePanel,
    MareaFormField,
    MareaInput,
    MareaComponentDoc,
  ],
  template: `
    <marea-stack [gap]="6">
      <section aria-labelledby="type-title">
        <marea-section-heading
          [level]="3"
          id="type-title"
          heading="Tipografía semántica"
          kicker="Fundamento"
          lead="Roles por propósito, no por tamaño arbitrario. Manrope para títulos y cifras; DM Sans para lectura."
        />
        <marea-surface>
          <marea-stack [gap]="3">
            <p marea-text variant="display1">Precisión a bordo</p>
            <p marea-text variant="display2">Instrumentación legible</p>
            <p marea-text variant="title1">Título de sección</p>
            <p marea-text variant="title2">Subtítulo de bloque</p>
            <p marea-text variant="heading">Encabezado de panel</p>
            <p marea-text variant="body">
              Texto de lectura con longitud limitada a 68 caracteres por línea para mantener el
              ritmo tipográfico.
            </p>
            <p marea-text variant="bodySmall" tone="secondary">
              Texto auxiliar denso para descripciones secundarias.
            </p>
            <p marea-text variant="label">ETIQUETA DE CONTROL</p>
            <p marea-text variant="meta">Metadato · procedencia · referencia interna</p>
          </marea-stack>
        </marea-surface>
        <marea-component-doc componentId="marea-text" />
        <marea-component-doc componentId="marea-section-heading" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="layout-title">
        <marea-section-heading
          [level]="3"
          id="layout-title"
          heading="Lay-out fluido"
          kicker="Fundamento"
          lead="Contenedor, rejilla intrínseca, pila e inline. Sin dos layouts fijos: las columnas se adaptan por ancho mínimo."
        />
        <marea-container size="narrow">
          <marea-grid minItem="220px" gap="compact">
            <marea-surface variant="raised" padding="tight"
              ><p marea-text variant="bodySmall">Celda A</p></marea-surface
            >
            <marea-surface variant="raised" padding="tight"
              ><p marea-text variant="bodySmall">Celda B</p></marea-surface
            >
            <marea-surface variant="raised" padding="tight"
              ><p marea-text variant="bodySmall">Celda C</p></marea-surface
            >
          </marea-grid>
          <hr marea-divider />
          <marea-inline [gap]="3" align="between">
            <marea-stack [gap]="1">
              <p marea-text variant="label">Pila vertical</p>
              <p marea-text variant="meta">Elemento 1</p>
              <p marea-text variant="meta">Elemento 2</p>
            </marea-stack>
            <span marea-status-badge tone="info" label="Inline a la derecha"></span>
          </marea-inline>
        </marea-container>
        <marea-component-doc componentId="marea-container" />
        <marea-component-doc componentId="marea-grid" />
        <marea-component-doc componentId="marea-stack" />
        <marea-component-doc componentId="marea-inline" />
        <marea-component-doc componentId="marea-surface" />
        <marea-component-doc componentId="marea-divider" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="buttons-title">
        <marea-section-heading
          [level]="3"
          id="buttons-title"
          heading="Botones y enlaces"
          kicker="Interacción"
          lead="Controles nativos. Estado deshabilitado con motivo accesible; sin botones inertes."
        />
        <marea-surface>
          <marea-stack [gap]="4">
            <marea-inline [gap]="3">
              <button marea-button variant="action" (activated)="record('acción')">
                Acción principal
              </button>
              <button marea-button variant="secondary" (activated)="record('secundaria')">
                Secundaria
              </button>
              <button marea-button variant="ghost" (activated)="record('fantasma')">
                Fantasma
              </button>
              <button marea-button variant="critical" icon="close" (activated)="record('crítica')">
                Crítica
              </button>
            </marea-inline>
            <marea-inline [gap]="3">
              <button marea-button size="sm" (activated)="record('pequeña')">Pequeña</button>
              <button marea-button size="lg" icon="chevron-right" (activated)="record('grande')">
                Grande
              </button>
              <button
                marea-button
                [disabled]="true"
                disabledReason="La acción está bloqueada en esta vista interna; no hay ninguna operación comercial autorizada."
              >
                Deshabilitada con motivo
              </button>
              <button marea-button [disabled]="true">Deshabilitada nativa</button>
              <button marea-button [loading]="true">Cargando</button>
            </marea-inline>
            <p class="live" marea-text variant="bodySmall" tone="secondary" role="status">
              Última activación: {{ lastAction() }}
            </p>
            <marea-inline [gap]="4">
              <a marea-link href="#fundamentos">Enlace en línea</a>
              <a marea-link variant="quiet" href="#fundamentos">Enlace discreto</a>
              <a marea-link href="https://example.invalid/marea-internal" [external]="true"
                >Enlace externo interno</a
              >
            </marea-inline>
          </marea-stack>
        </marea-surface>
        <marea-component-doc componentId="marea-button" />
        <marea-component-doc componentId="marea-link" />
        <marea-component-doc componentId="marea-icon" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="status-title">
        <marea-section-heading
          [level]="3"
          id="status-title"
          heading="Estados y avisos"
          kicker="Semántica"
          lead="Nunca solo color: cada estado combina forma, icono y texto."
        />
        <marea-surface>
          <marea-stack [gap]="4">
            <marea-inline [gap]="2">
              <span marea-status-badge tone="safe" label="Normal"></span>
              <span marea-status-badge tone="warning" label="Precaución"></span>
              <span marea-status-badge tone="critical" label="Alarma"></span>
              <span marea-status-badge tone="stale" label="Obsoleto"></span>
              <span marea-status-badge tone="info" label="Informativo"></span>
              <span marea-status-badge tone="neutral" label="Definido"></span>
            </marea-inline>
            <marea-inline [gap]="2">
              @for (icon of icons; track icon) {
                <marea-icon [name]="icon" [label]="'Icono ' + icon" size="lg" />
              }
            </marea-inline>
            <marea-notice
              variant="info"
              heading="Aviso informativo"
              body="Texto de aviso sin región viva: no se anuncia solo."
            />
            <marea-notice
              variant="warning"
              heading="Precaución"
              body="Estado con triángulo, etiqueta y explicación."
            />
            <marea-notice
              variant="critical"
              heading="Alarma"
              body="Estado crítico con causa y acción requerida en el texto."
              live="assertive"
            />
            <marea-notice
              variant="permission"
              heading="Autorización"
              body="Publicación no autorizada. Identidad propuesta no adoptada."
            />
            <marea-state-panel
              kind="loading"
              title="Cargando datos internos"
              description="Estado anunciado con aria-busy; sin animación obligatoria."
            />
            <marea-state-panel
              kind="empty"
              title="Sin contenido"
              description="No hay elementos que mostrar en esta vista interna."
            />
            <marea-state-panel
              kind="error"
              title="Error de carga"
              description="El estado de error se anuncia como alerta y explica el fallo."
            />
            <marea-state-panel
              kind="unavailable"
              title="No disponible"
              description="Contenido retenido por una puerta interna cerrada."
            />
          </marea-stack>
        </marea-surface>
        <marea-component-doc componentId="marea-status-badge" />
        <marea-component-doc componentId="marea-notice" />
        <marea-component-doc componentId="marea-state-panel" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="form-title">
        <marea-section-heading
          [level]="3"
          id="form-title"
          heading="Campos de formulario"
          kicker="Formularios"
          lead="Etiqueta, ayuda y error asociados programáticamente mediante aria-describedby."
        />
        <marea-surface>
          <marea-stack [gap]="5">
            <marea-form-field
              #field="mareaFormField"
              label="Indicativo de la embarcación"
              controlId="ds-vessel-name"
              hint="Texto de ayuda visible, asociado al campo y no dependiente del color."
              [required]="true"
            >
              <input
                mareaInput
                id="ds-vessel-name"
                name="ds-vessel-name"
                type="text"
                autocomplete="off"
                [attr.aria-describedby]="field.describedBy()"
                [required]="true"
              />
            </marea-form-field>
            <marea-form-field
              #fieldError="mareaFormField"
              label="Correo de contacto interno"
              controlId="ds-contact-email"
              hint="Esta vista interna no envía datos ni crea un mecanismo de contacto."
              error="El campo está vacío. Los datos no se envían."
            >
              <input
                mareaInput
                id="ds-contact-email"
                name="ds-contact-email"
                type="email"
                autocomplete="off"
                [invalid]="true"
                [attr.aria-describedby]="fieldError.describedBy()"
              />
            </marea-form-field>
            <marea-form-field
              #fieldPlain="mareaFormField"
              label="Puerto base"
              controlId="ds-home-port"
              hint="Opcional. Sin datos reales de cliente."
            >
              <input
                mareaInput
                id="ds-home-port"
                name="ds-home-port"
                type="text"
                autocomplete="off"
                [attr.aria-describedby]="fieldPlain.describedBy()"
              />
            </marea-form-field>
          </marea-stack>
        </marea-surface>
        <marea-component-doc componentId="marea-form-field" />
        <marea-component-doc componentId="marea-input" />
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
      gap: 4px;
    }
    .live {
      margin: 0;
    }
  `,
})
export class FoundationGallery {
  readonly icons = MAREA_ICON_NAMES;
  readonly lastAction = signal('ninguna');

  record(action: string): void {
    this.lastAction.set(action);
  }
}
