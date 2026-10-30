import type { TechnologyContent, TechnologySlug } from '../models/technology';

/**
 * Published English copy. Every field the Spanish page publishes is translated
 * here — nothing is invented and no capability is claimed beyond the Spanish
 * source. The keys are the stable slugs; the type below enforces parity.
 */
export const TECHNOLOGY_EN: Record<TechnologySlug, TechnologyContent> = {
  navegador: {
    name: 'Open Marine Navigator',
    tagline: 'Plotter, instruments and alarms on any tablet or laptop on board.',
    description:
      'A web navigation application that runs without an Internet connection on the boat’s local network. ' +
      'It displays nautical charts, own position, AIS targets, heading, wind and engine data, ' +
      'with configurable alarms and passage logging.',
    features: [
      'Nautical chart with OpenSeaMap layers, routes, tracks and range rings',
      'AIS targets with CPA/TCPA calculation and collision alarms',
      'Instrument panels: depth, true and apparent wind, speed, heading',
      'Passage playback and system diagnostics',
      'Runs in the browser: iPad, Android, Windows, macOS or Linux, with nothing to install',
      'Built on Signal K, the open marine data standard',
    ],
    specs: [
      { label: 'Platform', value: 'Web application (PWA) served from the boat itself' },
      { label: 'Data bus', value: 'Signal K (WebSocket and REST)' },
      { label: 'Connectivity', value: 'Local Wi-Fi or Ethernet network, with no Internet dependency' },
      { label: 'Base licence', value: 'Open source, with commercial support and customisation' },
    ],
    audience: 'Sail and power boat owners, sailing schools and charter companies.',
  },
  cartografia: {
    name: 'Open Marine Charts',
    tagline: 'Your lawfully obtained charts, stored locally and always available on board.',
    description:
      'A chart engine that imports, converts and serves your charts from the onboard computer. ' +
      'It manages sources, import jobs and a tile cache so the chart loads instantly.',
    features: [
      'Direct import of raster and vector MBTiles',
      'Conversion of GeoTIFF and KAP to MBTiles',
      'Conversion of open S-57 charts to vector tiles',
      'Source catalogue and load-error diagnostics',
      'Storage on SSD/USB, separate from the system',
      'Legal workflows only: protected commercial charts are never decrypted',
    ],
    specs: [
      { label: 'Formats', value: 'MBTiles, GeoTIFF, KAP, S-57 (unencrypted)' },
      { label: 'Service', value: 'Raster and vector tiles on the local network' },
      { label: 'Integration', value: 'Open Marine Navigator and MapLibre clients' },
    ],
    audience: 'Offshore, coastal and professional sailors who need offline charts.',
  },
  hub: {
    name: 'Open Marine Hub',
    tagline: 'The navigation computer that brings every sensor on the boat together.',
    description:
      'A compact Raspberry Pi based unit that runs Signal K, the chart engine and the navigator. ' +
      'It collects data from your existing instruments and shares it with every device on board.',
    features: [
      'NMEA 0183 and NMEA 2000 inputs (via adapter)',
      'AIS reception with an optional RTL-SDR',
      'GPS and attitude sensor (IMU) can be integrated',
      'Wi-Fi access point for tablets and phones',
      'Installation, configuration and commissioning included',
      'Software updates and technical support',
    ],
    specs: [
      { label: 'Base', value: 'Raspberry Pi with SSD storage' },
      { label: 'Power', value: '12 V boat supply, protected' },
      { label: 'Protocols', value: 'NMEA 0183, NMEA 2000, Signal K, AIS' },
      { label: 'Configuration', value: 'Tailored to each vessel' },
    ],
    audience: 'Boats that want to integrate their electronics without changing brand.',
  },
  'piloto-automatico': {
    name: 'Open Marine Autopilot',
    tagline: 'An open autopilot controller, safe by design.',
    description:
      'An autopilot engine with a dedicated controller based on the Raspberry Pi Pico 2 and a power driver ' +
      'for 12 V actuators. Heading and wind modes, current supervision and a physical emergency stop.',
    features: [
      'Autopilot state machine with a command API',
      'Dedicated controller with 20 kHz PWM and rudder control',
      'Motor current supervision',
      'Automatic cut-off if communication is lost (500 ms heartbeat)',
      'Physical emergency stop that cuts power to the actuator',
      'Compatible with two-wire DC actuators, such as the ST3000 type',
    ],
    specs: [
      { label: 'Controller', value: 'Raspberry Pi Pico 2' },
      { label: 'Power driver', value: 'Cytron MD30C R2' },
      { label: 'Voltage', value: '12 V DC, with fuse and isolator' },
      { label: 'Safety', value: 'Physical e-stop, watchdog and current limit' },
    ],
    audience: 'Owners who want to renew or build a maintainable autopilot.',
  },
  simulacion: {
    name: 'Open Marine Simulation',
    tagline: 'Data and scenario simulation for development and testing.',
    description:
      'A simulation platform for generating signals, running scenarios and testing Signal K integrations in a controlled environment.',
    features: [
      'Deterministic signal generation',
      'Shared scenario and channel registry',
      'Publishing to Signal K',
      'Test bench with runs and sample storage',
    ],
    specs: [
      { label: 'Use', value: 'Development, diagnostics and testing' },
      { label: 'Integration', value: 'Signal K over WebSocket or HTTP' },
    ],
    audience: 'Developers, integrators and training or R&D teams.',
  },
  'pasarela-sensores': {
    name: 'Open Marine sensor gateway',
    tagline: 'Sensor and navigation data integration for your vessel.',
    description:
      'A tailored integration that collects data from the sensors and equipment available on board and shares it with Open Marine.',
    features: [
      'Connection of data sources according to compatibility',
      'Signal K integration',
      'Configuration adapted to the existing instruments',
    ],
    specs: [
      { label: 'Configuration', value: 'Tailored to each installation' },
      { label: 'Connectivity', value: 'Depending on devices and adapters' },
    ],
    audience: 'Owners and professionals who need to integrate existing instrumentation.',
  },
};
