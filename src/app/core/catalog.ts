export interface Product {
  slug: string;
  name: string;
  kind: 'Software' | 'Hardware';
  tagline: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  audience: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'navegador',
    name: 'Open Marine Navigator',
    kind: 'Software',
    tagline: 'Plotter, instrumentos y alarmas en cualquier tablet o portátil de a bordo.',
    description:
      'Aplicación web de navegación que funciona sin conexión a Internet dentro de la red local del barco. ' +
      'Muestra cartas náuticas, posición propia, blancos AIS, rumbo, viento y datos de motor, ' +
      'con alarmas configurables y registro de travesías.',
    features: [
      'Carta náutica con capas OpenSeaMap, rutas, tracks y anillos de distancia',
      'Blancos AIS con cálculo de CPA/TCPA y alarmas de colisión',
      'Paneles de instrumentos: profundidad, viento real y aparente, velocidad, rumbo',
      'Reproducción de travesías y diagnóstico del sistema',
      'Funciona en navegador: iPad, Android, Windows, macOS o Linux, sin instalar nada',
      'Basado en Signal K, el estándar abierto de datos marinos',
    ],
    specs: [
      { label: 'Plataforma', value: 'Aplicación web (PWA) servida desde el propio barco' },
      { label: 'Bus de datos', value: 'Signal K (WebSocket y REST)' },
      { label: 'Conectividad', value: 'Red Wi-Fi o Ethernet local, sin depender de Internet' },
      { label: 'Licencia base', value: 'Código abierto, con soporte y personalización comercial' },
    ],
    audience: 'Armadores de vela y motor, escuelas náuticas y empresas de chárter.',
  },
  {
    slug: 'cartografia',
    name: 'Open Marine Charts',
    kind: 'Software',
    tagline: 'Tu cartografía legal, en local y siempre disponible a bordo.',
    description:
      'Motor de cartas náuticas que importa, convierte y sirve tus cartas desde el ordenador de a bordo. ' +
      'Gestiona catálogos, trabajos de importación y caché de teselas para que la carta cargue al instante.',
    features: [
      'Importación directa de MBTiles ráster y vectorial',
      'Conversión de GeoTIFF y KAP a MBTiles',
      'Conversión de cartas S-57 abiertas a teselas vectoriales',
      'Catálogo de fuentes y diagnóstico de errores de carga',
      'Almacenamiento en SSD/USB separado del sistema',
      'Solo flujos legales: no descifra cartas comerciales protegidas',
    ],
    specs: [
      { label: 'Formatos', value: 'MBTiles, GeoTIFF, KAP, S-57 (sin cifrar)' },
      { label: 'Servicio', value: 'Teselas ráster y vectoriales en la red local' },
      { label: 'Integración', value: 'Open Marine Navigator y clientes MapLibre' },
    ],
    audience: 'Navegantes de altura, costeros y profesionales que necesitan cartas offline.',
  },
  {
    slug: 'hub',
    name: 'Open Marine Hub',
    kind: 'Hardware',
    tagline: 'El ordenador de navegación que une todos los sensores del barco.',
    description:
      'Equipo compacto basado en Raspberry Pi que ejecuta Signal K, el motor de cartas y el navegador. ' +
      'Recoge los datos de tus instrumentos existentes y los comparte con todos los dispositivos de a bordo.',
    features: [
      'Entradas NMEA 0183 y NMEA 2000 (mediante adaptador)',
      'Receptor AIS con RTL-SDR opcional',
      'GPS y sensor de actitud (IMU) integrables',
      'Punto de acceso Wi-Fi para tablets y móviles',
      'Instalación, configuración y puesta en marcha incluidas',
      'Actualizaciones de software y soporte técnico',
    ],
    specs: [
      { label: 'Base', value: 'Raspberry Pi con almacenamiento SSD' },
      { label: 'Alimentación', value: '12 V del barco con protección' },
      { label: 'Protocolos', value: 'NMEA 0183, NMEA 2000, Signal K, AIS' },
      { label: 'Configuración', value: 'A medida de cada embarcación' },
    ],
    audience: 'Embarcaciones que quieren integrar su electrónica sin cambiar de marca.',
  },
  {
    slug: 'piloto-automatico',
    name: 'Open Marine Autopilot',
    kind: 'Hardware',
    tagline: 'Controlador de piloto automático abierto, con seguridad por diseño.',
    description:
      'Motor de piloto automático con controlador dedicado basado en Raspberry Pi Pico 2 y driver de potencia ' +
      'para actuadores de 12 V. Modos de rumbo y viento, supervisión de corriente y parada de emergencia física.',
    features: [
      'Máquina de estados de piloto con API de mando',
      'Controlador dedicado con PWM a 20 kHz y control de dirección',
      'Supervisión de corriente del motor',
      'Corte automático si se pierde la comunicación (heartbeat de 500 ms)',
      'Parada de emergencia física que corta la alimentación del actuador',
      'Compatible con actuadores DC de dos hilos, como los de tipo ST3000',
    ],
    specs: [
      { label: 'Controlador', value: 'Raspberry Pi Pico 2' },
      { label: 'Driver de potencia', value: 'Cytron MD30C R2' },
      { label: 'Tensión', value: '12 V DC, con fusible y seccionador' },
      { label: 'Seguridad', value: 'E-stop físico, watchdog y límite de corriente' },
    ],
    audience: 'Armadores que quieren renovar o crear un piloto automático mantenible.',
  },
  {
    slug: 'simulacion', name: 'Open Marine Simulation', kind: 'Software',
    tagline: 'Simulación de datos y escenarios para desarrollo y pruebas.',
    description: 'Plataforma de simulación para generar señales, ejecutar escenarios y probar integraciones con Signal K en un entorno controlado.',
    features: ['Generación determinista de señales', 'Registro compartido de escenarios y canales', 'Publicación de datos en Signal K', 'Banco de pruebas con ejecución y registro de muestras'],
    specs: [{ label: 'Uso', value: 'Desarrollo, diagnóstico y pruebas' }, { label: 'Integración', value: 'Signal K mediante WebSocket o HTTP' }],
    audience: 'Desarrolladores, integradores y equipos de formación o I+D.',
  },
  {
    slug: 'pasarela-sensores', name: 'Pasarela de sensores Open Marine', kind: 'Hardware',
    tagline: 'Integración de sensores y datos de navegación para tu embarcación.',
    description: 'Solución de integración a medida para recoger datos de los sensores y equipos disponibles a bordo y compartirlos con Open Marine.',
    features: ['Conexión de fuentes de datos según compatibilidad', 'Integración con Signal K', 'Configuración adaptada a los instrumentos existentes'],
    specs: [{ label: 'Configuración', value: 'A medida de cada instalación' }, { label: 'Conectividad', value: 'Según equipos y adaptadores' }],
    audience: 'Armadores y profesionales que necesitan integrar instrumentación existente.',
  },
];

export const SERVICES = [
  {
    title: 'Integración de electrónica',
    text: 'Unificamos instrumentos, GPS, AIS y sensores de distintas marcas en un único sistema abierto.',
  },
  {
    title: 'Instalación a bordo',
    text: 'Montaje, cableado, alimentación protegida y puesta en marcha del equipo en tu embarcación.',
  },
  {
    title: 'Desarrollo a medida',
    text: 'Paneles, integraciones y hardware específico para flotas, chárter, escuelas o proyectos de I+D.',
  },
  {
    title: 'Soporte y mantenimiento',
    text: 'Actualizaciones, diagnóstico remoto cuando hay conexión y asistencia antes de cada temporada.',
  },
];

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
