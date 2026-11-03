import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MareaI18n } from '../../../../src/app/marea-design-system/core/i18n';
import { MareaText } from '../../../../src/app/marea-design-system/components/foundation/marea-text';
import { MareaStack } from '../../../../src/app/marea-design-system/components/foundation/marea-stack';
import { MareaGrid } from '../../../../src/app/marea-design-system/components/foundation/marea-grid';
import { MareaDivider } from '../../../../src/app/marea-design-system/components/foundation/marea-divider';
import { MareaNotice } from '../../../../src/app/marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../../../src/app/marea-design-system/components/foundation/marea-section-heading';
import { MareaInstrumentTile } from '../../../../src/app/marea-design-system/components/instrument/marea-instrument-tile';
import { MareaNumericReadout } from '../../../../src/app/marea-design-system/components/instrument/marea-numeric-readout';
import { MareaMeasurement } from '../../../../src/app/marea-design-system/components/instrument/marea-measurement';
import { MareaFreshness } from '../../../../src/app/marea-design-system/components/instrument/marea-freshness';
import { MareaSensorUnavailable } from '../../../../src/app/marea-design-system/components/instrument/marea-sensor-unavailable';
import { MareaInstrumentStatus } from '../../../../src/app/marea-design-system/components/instrument/marea-instrument-status';
import { MareaConnectivity } from '../../../../src/app/marea-design-system/components/instrument/marea-connectivity';
import { MareaTelemetryList } from '../../../../src/app/marea-design-system/components/instrument/marea-telemetry-list';
import { MareaComponentDoc } from '../component-doc';
import { FIXTURE_CLASSIFICATION } from '../../../../src/app/marea-design-system/data/fixtures/marea-fixtures.generated';
import type { MareaTelemetryItem } from '../../../../src/app/marea-design-system/core/types';

interface InstrumentTileSpec {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly unit: string;
}

/**
 * Instrument presentation specimens.
 *
 * Every value on this page is synthetic demonstration data. Nothing is fetched,
 * computed, certified or read from marine hardware; the visible fixture
 * classification repeats that on every group.
 */
@Component({
  selector: 'marea-instrument-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaText,
    MareaStack,
    MareaGrid,
    MareaDivider,
    MareaNotice,
    MareaSectionHeading,
    MareaInstrumentTile,
    MareaNumericReadout,
    MareaMeasurement,
    MareaFreshness,
    MareaSensorUnavailable,
    MareaInstrumentStatus,
    MareaConnectivity,
    MareaTelemetryList,
    MareaComponentDoc,
  ],
  template: `
    <marea-stack [gap]="6">
      <marea-notice
        variant="internal"
        [heading]="i18n.text('demoData')"
        [body]="fixtureClass + ' · ' + i18n.text('internalOnlyBanner')"
      />

      <section aria-labelledby="instrument-tiles-title">
        <marea-section-heading
          [level]="3"
          id="instrument-tiles-title"
          kicker="Instrumentación"
          heading="Azulejos de instrumento"
          lead="Cuatro lecturas de demostración en modo día: profundidad, velocidad, viento y batería. Cada azulejo agrupa sus datos en una superficie etiquetada y muestra la etiqueta DEMO."
        />
        <marea-grid minItem="200px" gap="compact">
          @for (tile of tiles; track tile.id) {
            <marea-instrument-tile [title]="tile.label">
              <marea-numeric-readout
                [label]="tile.label"
                [value]="tile.value"
                [unit]="tile.unit"
                size="primary"
                freshness="FRESH"
              />
              <marea-measurement [label]="tile.label" [unit]="tile.unit" [detail]="fixtureClass" />
            </marea-instrument-tile>
          }
        </marea-grid>
        <marea-component-doc componentId="marea-instrument-tile" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-readout-title">
        <marea-section-heading
          [level]="3"
          id="instrument-readout-title"
          kicker="Instrumentación"
          heading="Lecturas numéricas"
          lead="Tres escalas tipográficas. El valor llega preformateado por el dominio; el componente nunca calcula ni formatea cifras y el texto alternativo repite etiqueta, valor y unidad."
        />
        <marea-stack [gap]="4">
          <h4 marea-text variant="heading">Primaria</h4>
          <marea-numeric-readout label="Profundidad" value="12.4" unit="m" size="primary" freshness="FRESH" />
          <h4 marea-text variant="heading">Secundaria</h4>
          <marea-numeric-readout label="Velocidad" value="6.3" unit="kn" size="secondary" freshness="FRESH" />
          <h4 marea-text variant="heading">Terciaria</h4>
          <marea-numeric-readout label="Rumbo" value="214" unit="°" size="tertiary" freshness="FRESH" />
          <h4 marea-text variant="heading">Sin dato</h4>
          <marea-numeric-readout [value]="null" label="Sensor de viento" unit="kn" size="tertiary" freshness="NO_DATA" />
        </marea-stack>
        <marea-component-doc componentId="marea-numeric-readout" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-measurement-title">
        <marea-section-heading
          [level]="3"
          id="instrument-measurement-title"
          kicker="Instrumentación"
          heading="Etiquetas de medida"
          lead="Anotaciones de etiqueta, unidad y detalle. No contienen ninguna cifra, por lo que no pueden presentar una lectura por sí solas."
        />
        <marea-stack [gap]="3">
          <marea-measurement label="Profundidad" unit="m" [detail]="fixtureClass" />
          <marea-measurement label="Velocidad" unit="kn" [detail]="fixtureClass" />
          <marea-measurement label="Viento" unit="kn" detail="Sin dato en esta demostración" />
        </marea-stack>
        <marea-component-doc componentId="marea-measurement" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-freshness-title">
        <marea-section-heading
          [level]="3"
          id="instrument-freshness-title"
          kicker="Instrumentación"
          heading="Frescura del dato"
          lead="Los cuatro estados. El estado obsoleto añade siempre la edad renderizada en mm:ss; ningún temporizador corre en la vista."
        />
        <marea-stack [gap]="3">
          <h4 marea-text variant="heading">FRESH</h4>
          <marea-freshness state="FRESH" />
          <h4 marea-text variant="heading">STALE · ageSeconds=95</h4>
          <marea-freshness state="STALE" [ageSeconds]="95" />
          <h4 marea-text variant="heading">OFFLINE</h4>
          <marea-freshness state="OFFLINE" />
          <h4 marea-text variant="heading">NO_DATA</h4>
          <marea-freshness state="NO_DATA" />
        </marea-stack>
        <marea-component-doc componentId="marea-freshness" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-sensor-title">
        <marea-section-heading
          [level]="3"
          id="instrument-sensor-title"
          kicker="Instrumentación"
          heading="Sensor no disponible"
          lead="Tres estados sin dato. El componente no admite una cifra: no hay cero, ni última lectura congelada, ni medición de relleno."
        />
        <marea-stack [gap]="3">
          <h4 marea-text variant="heading">NOT_INSTALLED</h4>
          <marea-sensor-unavailable state="NOT_INSTALLED" unit="m" />
          <h4 marea-text variant="heading">NO_SIGNAL</h4>
          <marea-sensor-unavailable state="NO_SIGNAL" unit="kn" />
          <h4 marea-text variant="heading">ERROR</h4>
          <marea-sensor-unavailable state="ERROR" unit="%" />
        </marea-stack>
        <marea-component-doc componentId="marea-sensor-unavailable" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-status-title">
        <marea-section-heading
          [level]="3"
          id="instrument-status-title"
          kicker="Instrumentación"
          heading="Estado del instrumento"
          lead="Icono con forma, etiqueta en negrita y causa. El color solo refuerza y no se abre ninguna región viva para un espécimen estático."
        />
        <marea-stack [gap]="4">
          <marea-instrument-status
            tone="critical"
            [label]="i18n.text('blocked')"
            [cause]="i18n.text('demoData')"
          />
          <marea-instrument-status
            tone="warning"
            [label]="i18n.text('unverified')"
            [cause]="i18n.text('demoData')"
          />
          <marea-instrument-status
            tone="safe"
            [label]="i18n.text('verified')"
            [cause]="i18n.text('demoData')"
          />
        </marea-stack>
        <marea-component-doc componentId="marea-instrument-status" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-connectivity-title">
        <marea-section-heading
          [level]="3"
          id="instrument-connectivity-title"
          kicker="Instrumentación"
          heading="Conectividad"
          lead="Los cuatro estados de enlace sintético. La etiqueta de estado la aporta el diccionario y el último avistamiento es una cadena ya formateada por el consumidor."
        />
        <marea-stack [gap]="3">
          <marea-connectivity state="ONLINE" device="MAREA HUB" lastSeen="00:04" />
          <marea-connectivity state="DEGRADED" device="MAREA HUB" lastSeen="01:12" />
          <marea-connectivity state="OFFLINE" device="MAREA HUB" lastSeen="--:--" />
          <marea-connectivity state="UNKNOWN" device="MAREA HUB" />
        </marea-stack>
        <marea-component-doc componentId="marea-connectivity" />
      </section>

      <hr marea-divider spacing="loose" />

      <section aria-labelledby="instrument-telemetry-title">
        <marea-section-heading
          [level]="3"
          id="instrument-telemetry-title"
          kicker="Instrumentación"
          heading="Telemetría"
          lead="Seis filas que mezclan dato actual, obsoleto, sin dato y sin conexión. Cada fila es un par dt/dd y las filas no actuales añaden su marcador de frescura."
        />
        <marea-telemetry-list [items]="telemetry" caption="Telemetría sintética interna · 6 filas" />
        <marea-component-doc componentId="marea-telemetry-list" />
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
export class InstrumentGallery {
  readonly i18n = inject(MareaI18n);
  readonly fixtureClass = FIXTURE_CLASSIFICATION;

  readonly tiles: readonly InstrumentTileSpec[] = [
    { id: 'instrument-depth', label: 'Profundidad', value: '12.4', unit: 'm' },
    { id: 'instrument-speed', label: 'Velocidad', value: '6.3', unit: 'kn' },
    { id: 'instrument-wind', label: 'Viento', value: '14', unit: 'kn' },
    { id: 'instrument-battery', label: 'Batería', value: '82', unit: '%' },
  ];

  readonly telemetry: readonly MareaTelemetryItem[] = [
    { id: 'telemetry-depth', label: 'Profundidad', value: '12.4', unit: 'm', freshness: 'FRESH', ageSeconds: null },
    { id: 'telemetry-speed', label: 'Velocidad', value: '6.3', unit: 'kn', freshness: 'STALE', ageSeconds: 95 },
    { id: 'telemetry-wind', label: 'Viento', value: null, unit: 'kn', freshness: 'NO_DATA', ageSeconds: null },
    { id: 'telemetry-battery', label: 'Batería', value: '82', unit: '%', freshness: 'FRESH', ageSeconds: null },
    { id: 'telemetry-heading', label: 'Rumbo', value: '214', unit: '°', freshness: 'OFFLINE', ageSeconds: null },
    { id: 'telemetry-temperature', label: 'Temperatura', value: '18.2', unit: '°C', freshness: 'FRESH', ageSeconds: null },
  ];
}
