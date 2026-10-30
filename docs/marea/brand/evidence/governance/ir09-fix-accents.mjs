// =============================================================================
// MC-04 IR-09 fix — restore correct Spanish accents (and « ») in
// docs/marea/assets/manifest/MC-04-BRIEFS.yaml
// Owner: Governance. Write scope: docs/marea/assets/manifest/MC-04-BRIEFS.yaml
//                            and docs/marea/brand/evidence/governance/**
//
// Why: independent review IR-09 found the ES captions/alt strings were
// accent-stripped ("fotografia", "instalacion", "Rias Baixas") although the
// D-12 document had correct accents. Alt/caption quality is a QA-11 gate.
//
// Method: exact-value replacement of the 68 known ES strings. Every mapping
// MUST be found; a missing target aborts the run (exit 1) so a silent partial
// fix is impossible. The script prints a real before/after audit:
//  - occurrences replaced per string
//  - non-ASCII byte count inside ES string values before and after
//  - a machine check that no accent-stripped form remains in the ES values
//
// Run: node docs/marea/brand/evidence/governance/ir09-fix-accents.mjs [--check-only]
// =============================================================================

import { readFileSync, writeFileSync } from 'node:fs';

const MANIFEST = 'docs/marea/assets/manifest/MC-04-BRIEFS.yaml';
const checkOnly = process.argv.includes('--check-only');

// [accent-stripped ES text] -> [correct ES text]
const MAP = new Map([
  // MR-COR-001
  ['Navegacion de crucero en las Rias Baixas - imagen conceptual.',
   '«Navegación de crucero en las Rías Baixas — imagen conceptual.»'],
  ['Velero de crucero navegando con mar rizada bajo cielo cubierto, costa gallega al fondo.',
   '«Velero de crucero navegando con mar rizada bajo cielo cubierto, costa gallega al fondo.»'],
  ['Render conceptual - no representa un producto certificado / no es una fotografia de un producto real instalado.',
   '«Render conceptual — no representa un producto certificado / no es una fotografía de un producto real instalado.»'],
  // MR-COR-002
  ['Conjunto de sistemas a bordo - imagen conceptual.',
   '«Conjunto de sistemas a bordo — imagen conceptual.»'],
  ['Primer plano de una consola de timon con una pantalla, una caja de conexiones y cableado ordenado.',
   '«Primer plano de una consola de timón con una pantalla, una caja de conexiones y cableado ordenado.»'],
  ['Render conceptual - no representa un producto certificado.',
   '«Render conceptual — no representa un producto certificado.»'],
  // MR-COR-003
  ['Tripulacion anonima en navegacion costera - imagen conceptual.',
   '«Tripulación anónima en navegación costera — imagen conceptual.»'],
  ['Manos con guantes de navegacion ajustando una escota en cubierta mojada.',
   '«Manos con guantes de navegación ajustando una escota en cubierta mojada.»'],
  ['Render conceptual - no representa una tripulacion ni una instalacion reales.',
   '«Render conceptual — no representa una tripulación ni una instalación reales.»'],
  // MR-COR-004
  ['Velero y lancha de crucero en la misma condicion de mar - imagenes conceptuales.',
   '«Velero y lancha de crucero en la misma condición de mar — imágenes conceptuales.»'],
  ['Velero de crucero navegando de cebida con mar rizada; lancha de crucero navegando con estela suave.',
   '«Velero de crucero navegando de ceñida con mar rizada; lancha de crucero navegando con estela suave.»'],
  // MR-PRD-001
  ['Unidad de pasarela de datos instalada - render conceptual, producto no disponible.',
   '«Unidad de pasarela de datos instalada — render conceptual, producto no disponible.»'],
  ['Caja de conexiones mate atornillada a un mamparo interior, con cables recogidos hacia un pasaocables.',
   '«Caja de conexiones mate atornillada a un mamparo interior, con cables recogidos hacia un pasaocables.»'],
  ['Render conceptual - no representa un producto certificado ni disponible.',
   '«Render conceptual — no representa un producto certificado ni disponible.»'],
  // MR-PRD-002
  ['Pantalla dedicada en el puesto de timon - render conceptual; la interfaz es una composicion web, no una captura real.',
   '«Pantalla dedicada en el puesto de timón — render conceptual; la interfaz es una composición web, no una captura real.»'],
  ['Soporte de pantalla mate montado en una consola de timon, con la pantalla en blanco y el mar al fondo.',
   '«Soporte de pantalla mate montado en una consola de timón, con la pantalla en blanco y el mar al fondo.»'],
  ['Render conceptual - la interfaz mostrada es una composicion web, no una captura del producto.',
   '«Render conceptual — la interfaz mostrada es una composición web, no una captura del producto.»'],
  ['Render conceptual - la interfaz mostrada es una composicion HTML, no una captura del producto.',
   '«Render conceptual — la interfaz mostrada es una composición HTML, no una captura del producto.»'],
  // MR-PRD-006
  ['Puesto de control de gobierno asistido, con paro de emergencia y toma manual - render conceptual.',
   '«Puesto de control de gobierno asistido, con paro de emergencia y toma manual — render conceptual.»'],
  ['Cabezal de control junto a un paro de emergencia y una palanca de toma manual en una consola de timon.',
   '«Cabezal de control junto a un paro de emergencia y una palanca de toma manual en una consola de timón.»'],
  ['Render conceptual - el gobierno es asistido y supervisado, nunca autonomo.',
   '«Render conceptual — el gobierno es asistido y supervisado, nunca autónomo.»'],
  // MR-PRD-011
  ['Detalle de entrada de cables con prensaestopas y alivio de traccion - render conceptual de una instalacion bien ejecutada.',
   '«Detalle de entrada de cables con prensaestopas y alivio de tracción — render conceptual de una instalación bien ejecutada.»'],
  ['Primer plano de un prensaestopas con cables ordenados y un bucle de servicio en un mamparo mate.',
   '«Primer plano de un prensaestopas con cables ordenados y un bucle de servicio en un mamparo mate.»'],
  ['Render conceptual - no representa una instalacion real certificada.',
   '«Render conceptual — no representa una instalación real certificada.»'],
  // MR-PRD-012
  ['Trabajo de instalacion en un puesto de navegacion - render conceptual; no representa una instalacion real certificada.',
   '«Trabajo de instalación en un puesto de navegación — render conceptual; no representa una instalación real certificada.»'],
  ['Manos de instalador con un destornillador junto a un panel abierto y cables en un puesto de navegacion.',
   '«Manos de instalador con un destornillador junto a un panel abierto y cables en un puesto de navegación.»'],
  // MR-PRD-004
  ['MAREA NAV en uso a bordo - render conceptual; la interfaz mostrada es una composicion HTML, no una captura del producto.',
   '«MAREA NAV en uso a bordo — render conceptual; la interfaz mostrada es una composición HTML, no una captura del producto.»'],
  ['Tableta montada en el puesto de timon de un velero, con la pantalla en blanco y el mar al fondo.',
   '«Tableta montada en el puesto de timón de un velero, con la pantalla en blanco y el mar al fondo.»'],
  // MR-PRD-005
  ['Antena y receptor AIS de solo escucha - render conceptual.',
   '«Antena y receptor AIS de solo escucha — render conceptual.»'],
  ['Antena de mastil y receptor AIS con cables coaxiales recogidos hacia un pasaocables.',
   '«Antena de mástil y receptor AIS con cables coaxiales recogidos hacia un pasaocables.»'],
  ['Render conceptual - la recepcion AIS es de solo escucha y no es un transpondedor.',
   '«Render conceptual — la recepción AIS es de solo escucha y no es un transpondedor.»'],
  // MR-PRD-007
  ['Sensores de sentina y de nivel de tanque instalados - render conceptual.',
   '«Sensores de sentina y de nivel de tanque instalados — render conceptual.»'],
  ['Sensor de sentina atornillado a un soporte y emisor de nivel en un deposito de plastico, con cables recogidos.',
   '«Sensor de sentina atornillado a un soporte y emisor de nivel en un depósito de plástico, con cables recogidos.»'],
  // MR-PRD-008
  ['Aviso en tierra con la embarcacion fondeada - render conceptual; la pantalla mostrada es una composicion.',
   '«Aviso en tierra con la embarcación fondeada — render conceptual; la pantalla mostrada es una composición.»'],
  ['Mano sosteniendo un telefono con la pantalla en blanco, con un velero fondeado desenfocado al fondo.',
   '«Mano sosteniendo un teléfono con la pantalla en blanco, con un velero fondeado desenfocado al fondo.»'],
  ['Render conceptual - la pantalla mostrada es una composicion, no una notificacion real.',
   '«Render conceptual — la pantalla mostrada es una composición, no una notificación real.»'],
  // MR-PRD-009
  ['Planificacion de travesia en la mesa de cartas - render conceptual; la prevision mostrada es una composicion web.',
   '«Planificación de travesía en la mesa de cartas — render conceptual; la previsión mostrada es una composición web.»'],
  ['Manos sobre una mesa de cartas con una tableta de pantalla en blanco y material de navegacion.',
   '«Manos sobre una mesa de cartas con una tableta de pantalla en blanco y material de navegación.»'],
  ['Render conceptual - las previsiones son probabilisticas; la mostrada es una composicion web.',
   '«Render conceptual — las previsiones son probabilísticas; la mostrada es una composición web.»'],
  // MR-PRD-010
  ['Operacion de flota desde tierra - render conceptual; las pantallas mostradas son composiciones web.',
   '«Operación de flota desde tierra — render conceptual; las pantallas mostradas son composiciones web.»'],
  ['Oficina con vistas al puerto, dos personas trabajando y pantallas en blanco.',
   '«Oficina con vistas al puerto, dos personas trabajando y pantallas en blanco.»'],
  ['Render conceptual - las pantallas mostradas son composiciones web, no datos reales.',
   '«Render conceptual — las pantallas mostradas son composiciones web, no datos reales.»'],
  // MR-MKT-001
  ['Trabajo profesional en el puerto - imagen conceptual; no representa un cliente real.',
   '«Trabajo profesional en el puerto — imagen conceptual; no representa un cliente real.»'],
  ['Muelle de trabajo con varias embarcaciones, un ponton y una persona con bolsa de herramientas.',
   '«Muelle de trabajo con varias embarcaciones, un pontón y una persona con bolsa de herramientas.»'],
  ['Render conceptual - no representa un cliente, socio ni instalacion reales.',
   '«Render conceptual — no representa un cliente, socio ni instalación reales.»'],
  // MR-PRD-003 (vector)
  ['Ilustracion tecnica ilustrativa - no a escala salvo indicacion; sujeta a revision de ingenieria.',
   '«Ilustración técnica ilustrativa — no a escala salvo indicación; sujeta a revisión de ingeniería.»'],
  ['Vistas ortograficas e isometrica de un producto, con llamadas numeradas y leyenda bilingue.',
   '«Vistas ortográficas e isométrica de un producto, con llamadas numeradas y leyenda bilingüe.»'],
  ['Ilustracion tecnica ilustrativa - no a escala salvo indicacion.',
   '«Ilustración técnica ilustrativa — no a escala salvo indicación.»'],
]);

// The accent-stripped tokens that must not survive inside ES strings.
// Word-bounded so correct plural forms are not flagged (composición -> composiciones,
// previsión -> previsiones, embarcación -> embarcaciones are all correct Spanish).
const STRIPPED_RE = new RegExp(
  '\\b(' +
    [
      'fotografia', 'instalacion', 'Rias Baixas', 'navegacion', 'timon',
      'Tripulacion', 'anonima', 'condicion', 'imagenes', 'cebida', 'composicion',
      'autonomo', 'traccion', 'mastil', 'recepcion', 'deposito', 'plastico',
      'embarcacion', 'telefono', 'notificacion', 'Planificacion', 'travesia',
      'prevision', 'probabilisticas', 'Operacion', 'ponton', 'Ilustracion',
      'tecnica', 'ortograficas', 'isometrica', 'bilingue', 'indicacion',
    ].join('|') +
    ')\\b'
);

const esValueRegex = /(?:caption_es|alt_es|^\s+es)\s*:\s*'([^']*)'/gm;

function esStrings(text) {
  return [...text.matchAll(esValueRegex)].map((m) => m[1]);
}
function nonAsciiCount(values) {
  let n = 0;
  for (const v of values) for (const ch of v) if (ch.codePointAt(0) > 127) n++;
  return n;
}

let text = readFileSync(MANIFEST, 'utf8');
const before = esStrings(text);
const beforeNonAscii = nonAsciiCount(before);

let total = 0;
const applied = [];
const missing = [];
let already = 0;
for (const [from, to] of MAP) {
  // Idempotency guard: the corrected value may CONTAIN the old value (the four
  // strings that only gained « »), so checking `to` first prevents a second run
  // from double-wrapping them.
  if (text.includes(to)) {
    already++;
    continue;
  }
  const count = text.split(from).length - 1;
  if (count === 0) {
    missing.push(from);
    continue;
  }
  text = text.split(from).join(to);
  applied.push({ count, from, to });
  total += count;
}

console.log('IR-09 accent restoration — docs/marea/assets/manifest/MC-04-BRIEFS.yaml');
console.log('mapping entries            : ' + MAP.size);
console.log('already-correct entries    : ' + already);
console.log('replacements applied       : ' + total + ' (across ' + applied.length + ' distinct ES strings)');
if (missing.length) {
  console.log('MISSING TARGETS (abort)    : ' + missing.length);
  for (const m of missing) console.log('   - ' + m);
  process.exit(1);
}

const after = esStrings(text);
const afterNonAscii = nonAsciiCount(after);
const strippedLeft = [];
for (const v of after) {
  const hit = v.match(STRIPPED_RE);
  if (hit) strippedLeft.push(hit[1] + ' in: ' + v);
}
const guillemetValues = after.filter((v) => v.includes('«') || v.includes('»')).length;

console.log('ES string values           : ' + after.length + ' total, ' + guillemetValues + ' with « »');
console.log('non-ASCII chars in ES vals : before ' + beforeNonAscii + ' -> after ' + afterNonAscii);
console.log('accent-stripped forms left : ' + strippedLeft.length);
for (const s of strippedLeft) console.log('   STILL STRIPPED: ' + s);
console.log('');
for (const a of applied) {
  console.log('  [' + a.count + 'x] ' + a.to);
}

if (strippedLeft.length) {
  console.log('RESULT: FAIL (stripped forms remain)');
  process.exit(1);
}

if (checkOnly) {
  console.log('RESULT: CHECK-ONLY — ' + (total === 0 ? 'already fixed, nothing to write.' : total + ' replacement(s) pending.'));
  process.exit(0);
}
writeFileSync(MANIFEST, text);
console.log('RESULT: WRITTEN. Run prettier --write/--check and the 20-field structural check next.');
