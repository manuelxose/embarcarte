/**
 * MC-20 catalogue guards — pure helpers shared by the validator and its tests.
 *
 * These are evidence helpers, not application runtime code: they are used by
 * `scripts/check-mc20-catalog.mjs` and the node:test suite. They never write to
 * the repository and never contact the network.
 *
 * HEURISTIC BACKSTOP — NOT A PROOF OF ABSENCE. The prohibited-claim regexes and
 * the clause-negation heuristic reject an enumerated family of phrasings plus
 * the tested variants; they cannot enumerate the unbounded space of natural
 * language. A clean `catalogClaimProblems` result is a supporting check, not a
 * guarantee that no invented claim exists. The primary controls are the typed
 * content contract (src/app/marea-catalog/content/*), the canonical-data
 * cross-checks in the validator, and human content review.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/** Claims that may never appear in an internal catalogue page, in either locale. */
export const PROHIBITED_CLAIMS = [
  {
    id: 'currency',
    pattern:
      /€|\$\s?\d|£\s?\d|\b\d+\s?(?:€|\$|£|EUR|USD|GBP|euros?|dólares?|dollars?|libras?|pounds?)\b|\b(?:EUR|USD|GBP)\s?\d|\b(?:desde|from)\s+\d+(?:[.,]\d+)?\s+(?:al|por)\s+(?:mes|año|month|year)\b|\b\d+(?:[.,]\d+)?\s+(?:per\s+(?:vessel\s+)?(?:per\s+)?month|per\s+year|al\s+mes|por\s+mes|al\s+año)\b|\b(?:price|precio):?\s*\d|\b\d+\s*\+\s*(?:IVA|VAT)\b/i,
  },
  {
    id: 'positive-guarantee',
    // MC-24 F-02: the first-person "garantizamos" was the only Spanish verb
    // form matched, so the passive/participle claim ("garantizado", "soporte
    // garantizado", "entrega garantizada") bypassed the guard. The participle
    // is matched as a whole word so the honest negation ("no garantizado",
    // "sin garantizar") still passes through the negatable-clause rules.
    pattern:
      /\bgarantizamos\b|\bwe guarantee\b|\bcompatibilidad garantizada\b|\bguaranteed compatib|\bgarantizad[oa]s?\b|\bgarantiza\s+(?:la|el|un|una|los|las)\b|\bgarantizan\b|\bguaranteed\b/i,
  },
  {
    id: 'positive-warranty',
    pattern: /\bgarantía de compatibilidad\b|\bgarantía de funcionamiento\b/i,
  },
  { id: 'approved-by', pattern: /\baprobado por\b|\bapproved by\b/i },
  { id: 'homologated', pattern: /\bhomologad[oa]s?\b/i },
  {
    id: 'sea-trial',
    pattern:
      /\b(?:pruebas? de mar|sea[- ]trials?)\b[^.;!?]{0,32}\b(?:completad[oa]s?|realizad[oa]s?|superad[oa]s?|complet(?:aron|ó)|realiz(?:aron|ó)|super(?:aron|ó)|completed|performed|passed|done|carried\s+out)\b|\b(?:completad[oa]s?|realizad[oa]s?|superad[oa]s?|complet(?:aron|ó)|realiz(?:aron|ó)|super(?:aron|ó)|se\s+(?:complet(?:aron|ó)|realiz(?:aron|ó)|super(?:aron|ó)|han\s+(?:completado|realizado))|ha\s+superado|completed|performed|passed|done|carried\s+out|has\s+completed|have\s+completed)\b[^.;!?]{0,32}\b(?:pruebas? de mar|sea[- ]trials?)\b/i,
  },
  { id: 'testimonial', pattern: /\btestimonios?\b|\btestimonials?\b/i },
  { id: 'in-stock', pattern: /\ben stock\b|\bin stock\b/i },
  { id: 'add-to-cart', pattern: /\bañadir al carrito\b|\badd to cart\b/i },
  { id: 'buy-now', pattern: /\bcomprar ahora\b|\bbuy now\b/i },
  // "checkout item" is the honest disclaimed noun ("never a checkout item");
  // "checkout" as a commerce-flow word remains prohibited in both locales.
  { id: 'checkout', pattern: /\bcheckout\b(?!\s+item\b)|\bcarrito de compra\b/i },
  { id: 'delivery-date', pattern: /\bplazos? de entrega\b|\bdelivery date\b|\bentrega en \d+\b/i },
  { id: 'price-amount', pattern: /\bprecio(?:s)? (?:de|desde)\s?\d/i },
  { id: 'stock-quantity', pattern: /\b\d+\s+(?:unidades|units)\s+(?:en stock|available)\b/i },
  {
    id: 'positive-certification',
    pattern:
      /\b(?:está|están|es|son|is|are) certificad[oa]s?\b|\b(?:es|son|is|are) certified\b|\bproducto certificad[oa]\b|\bcertificad[oa] por\b|\bcertified (?:by|to|under)\b/i,
  },
  {
    id: 'positive-nmea-compatibility',
    pattern:
      /\bcompatible con NMEA\b|\bcompatible with NMEA\b|\bNMEA[- ]compatible\b|\binteroperable con NMEA\b|(?<!not )(?<!no )\bNMEA (?:2000 )?certified\b/i,
  },
  {
    id: 'warranty-term',
    pattern: /\bgarantía de \d+ (?:años?|meses)\b|\b\d+[- ]year warranty\b/i,
  },
  {
    id: 'shipping-promise',
    pattern: /\benvío (?:gratis|gratuito|en \d)|\bfree shipping\b|\bships? (?:in|within)\b/i,
  },
  {
    id: 'positive-collision-avoidance',
    pattern:
      /\bpreviene colisiones\b|\bevita colisiones\b|\bprevents collisions\b|\bavoids? collisions\b/i,
  },
  {
    id: 'universal-compatibility',
    pattern:
      /\bcompatible con cualquier\b|\buniversalmente compatible\b|\bcompatible with any\b|\buniversally compatible\b|\bplug[- ]and[- ]play universal\b|\buniversal plug[- ]and[- ]play\b/i,
  },
  {
    id: 'positive-transmission',
    pattern:
      /(?<!no )(?<!not )\btransmite (?:AIS|tu posición|la posición)\b|(?<!not )\btransmits (?:AIS|your position)\b/i,
  },
  {
    id: 'forecast-accuracy',
    pattern:
      /\b(?:% de acierto|\d+\s?% de acierto|tasa de acierto|hit rate|accuracy rate|exactitud garantizada|precisión garantizada|guaranteed accuracy|accuracy guaranteed|verified accuracy)\b/i,
  },
  {
    id: 'sla-claim',
    pattern:
      /\b(?:SLA garantizado|SLA de |guaranteed SLA|SLA guaranteed|nivel de servicio garantizado|guaranteed service level|service[- ]level agreement)\b/i,
  },
  {
    id: 'guaranteed-delivery',
    pattern:
      /\b(?:entrega|aviso|alerta)\b[^.;!?]{0,24}\bgarantizad[ao]s?\b|\bgarantizad[ao]s?\b[^.;!?]{0,24}\b(?:entrega|aviso|alerta)\b|\bguaranteed (?:delivery|alert)\b|\b(?:delivery|alert) guaranteed\b/i,
  },
  {
    // MC-24 F-01: the bare availability predicate is asserted in Spanish with
    // "ya" before or after "disponible" ("disponible ya", "ya disponible"), and
    // in English as "now available" / "available now". The earlier pattern only
    // listed explicit sale idioms, so both word orders bypassed the guard. A
    // bare "disponible" / "available" is deliberately NOT matched alone: the
    // honest negated form must keep working through the negatable-clause rules.
    id: 'positive-availability',
    pattern:
      /\b(?:disponible para la venta|a la venta|en venta|on sale|available for (?:sale|purchase)|listo para (?:comprar|enviar)|ready to (?:buy|ship)|aprobado para (?:la )?venta|approved for sale|disponible\s+ya|ya\s+(?:est[áa]\s+)?disponible|now\s+available|available\s+now)\b/i,
  },
  {
    id: 'numeric-accuracy',
    pattern: /±\s?\d|\b\d+\s?%|\b(?:accuracy|hit[- ]rate|acierto)\b[^.;,!?]{0,12}\b\d+\s?%/i,
  },
  { id: 'ip-rating', pattern: /\bIP\s?\d{1,2}[A-Z]?\b|\bIPX\s?\d\b/i },
  {
    id: 'ordering',
    pattern: /\b(?:pre[- ]?order|preventa|pre[- ]?venta|pre[- ]?reserva|pre[- ]?reservation)\b/i,
  },
  // ---- MC-22 batch-3 DISPLAY — no physical or measured figure may be claimed ----
  {
    id: 'display-dimension',
    pattern:
      /\b\d{1,3}(?:[.,]\d+)?\s*(?:mm|cm|pulgadas?|pulg\.|inches?|in\.?)\b|\b\d{1,3}(?:[.,]\d+)?[-–](?:inch(?:es)?|pulgadas?|in\.?)\b|(?<![="'\w-])\d{1,3}(?:[.,]\d+)?\s*["″](?!\s*[>\s]*<)|\b(?:uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|trece|catorce|quince|veinte|treinta|cuarenta|cincuenta|sesenta|setenta|ochenta|noventa|cien|ciento|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)[\s-]*(?:pulgadas?|inch(?:es)?|pulg\.?|["″])\b/i,
  },
  {
    id: 'display-resolution',
    pattern:
      /\b\d{3,4}\s*[x×]\s*\d{3,4}\b|\b(?:resolución|resolution)\b[^.;!?]{0,20}\b\d{3,4}\s*[x×]|\b(?:Full\s*HD|4K|1080p|UHD|Ultra\s*HD|Quad\s*HD)\b/i,
  },
  {
    id: 'display-brightness',
    pattern:
      /\b\d{2,4}\s*(?:nits?|cd\/m2|cd\/m²)(?:\b|(?=[\s.;,!?]|$))|\b(?:luminosidad|brightness|brillo|luminance)\b[^.;!?]{0,20}\b\d{2,4}\b/i,
  },
  {
    id: 'display-ingress',
    pattern:
      /\b(?:estanc[oa]|impermeable|waterproof|water[- ]resistant|sumergible|submersible|resistente al agua)\b/i,
  },
  {
    id: 'display-power',
    pattern:
      /\b(?:consumo|potencia|power (?:consumption|draw))\b[^.;!?]{0,20}\b\d+(?:[.,]\d+)?\s*(?:W|vatios?|watts?)\b/i,
  },
  // ---- MC-22 batch-3 PILOT — supervised-only, never autonomous or certified ----
  {
    id: 'pilot-certified-autopilot',
    pattern:
      /\b(?:es un|es una|como|as|ofrece|offers?|incluye|includes?)\b[^.;!?]{0,30}\b(?:piloto automático|autopiloto|autopilot)\b[^.;!?]{0,20}\b(?:certificad[oa]s?|homologad[oa]s?|approved|certified)\b|\b(?:certificad[oa]s?|certified|homologad[oa]s?)\b\s+(?:autopiloto|autopilot|piloto automático)\b/i,
  },
  {
    id: 'pilot-autonomous-navigation',
    pattern:
      /\b(?:navegación autónoma|navegación automática|navegación autopilotada|autonomous navigation|autonomous steering|autonomous operation|autonomous|autonomously|automatically|automáticamente|self[- ]steering|de forma autónoma|autónom[oa]s?)\b/i,
  },
  {
    id: 'pilot-unsupervised',
    pattern:
      /\b(?:sin supervisión|sin intervención(?:\s+humana)?|sin vigilancia|sin supervisor|funcionamiento desatendido|funcionamiento sin supervisión|unsupervised|unattended\s+operation|hands[- ]free|without supervision)\b/i,
  },
  {
    id: 'pilot-safety-critical-reliability',
    pattern:
      /\b(?:fiabilidad (?:garantizada|verificada|certificada)|guaranteed reliability|verified reliability|certified reliability|safety[- ]critical reliability)\b/i,
  },
  {
    id: 'pilot-regulatory-approval',
    pattern:
      /\b(?:aprobación regulatoria|regulatory approval|type[- ]approval|type approval|homologación|homologation)\b[^.;!?]{0,24}\b(?:obtenid[oa]|concedid[oa]|otorgad[oa]|recibid[oa]|granted|obtained|received|secured)\b|\b(?:ha obtenido|obtuvo|ha recibido|recibió|has received|received|has obtained|obtained)\b[^.;!?]{0,24}\b(?:aprobación regulatoria|regulatory approval|type[- ]approval|type approval|homologación)\b/i,
  },
  {
    id: 'pilot-helm-verified',
    pattern:
      /\b(?:integración verificada con (?:el )?(?:timón|gobierno)|verified (?:steering|helm|rudder) integration|integración de gobierno verificada)\b/i,
  },
  // ---- MC-22 batch-3 FLEET — no SLA / availability / hardware / deployment ----
  {
    id: 'fleet-availability-percentage',
    pattern: /\b(?:disponibilidad|availability|uptime)\b[^.;!?]{0,24}\b\d{1,3}(?:[.,]\d+)?\s*%/i,
  },
  {
    id: 'fleet-guaranteed-availability',
    pattern:
      /\b(?:disponibilidad garantizada|uptime garantizado|guaranteed availability|availability guaranteed|disponibilidad asegurada)\b/i,
  },
  {
    id: 'fleet-hardware-included',
    pattern:
      /\b(?:hardware incluido|hardware included|incluye hardware|includes hardware|hardware incorporado|hardware (?:está|viene|es|se) incluido|hardware se incluye|hardware (?:is|comes(?: as)?) included|hardware (?:is supplied|is provided|se suministra)|hardware included (?:by default|as standard)|incluido de serie)\b/i,
  },
  {
    id: 'fleet-deployed-customer',
    pattern:
      /\b(?:cliente desplegado|desplegado en (?:producción|cliente)|deployed (?:customer|client|fleet)|en producción con|live with)\b/i,
  },
  {
    id: 'fleet-service-contract',
    pattern:
      /\b(?:contrato de servicio (?:firmado|en vigor|activo)|service contract (?:signed|in place)|nivel de servicio contratado)\b/i,
  },
  {
    id: 'fleet-commercial-package',
    pattern: /\b(?:paquete comercial|commercial package|paquete empresarial|commercial bundle)\b/i,
  },
  {
    id: 'fleet-security-certification',
    pattern:
      /\b(?:certificación de seguridad (?:obtenida|concedida|lograda)|security certification (?:obtained|achieved|granted)|certified (?:secure|for security)|ISO\s?27001|SOC\s?2|SOC2)\b/i,
  },
];

/** Assertion rules whose match may legitimately appear inside a negated clause. */
const NEGATABLE = new Set([
  'positive-guarantee',
  'positive-warranty',
  'sea-trial',
  'approved-by',
  'homologated',
  'positive-certification',
  'positive-nmea-compatibility',
  'warranty-term',
  'shipping-promise',
  'positive-collision-avoidance',
  'universal-compatibility',
  'positive-transmission',
  'forecast-accuracy',
  'sla-claim',
  'guaranteed-delivery',
  'positive-availability',
  'numeric-accuracy',
  'ip-rating',
  'ordering',
  'display-dimension',
  'display-resolution',
  'display-brightness',
  'display-ingress',
  'display-power',
  'pilot-certified-autopilot',
  'pilot-autonomous-navigation',
  'pilot-unsupervised',
  'pilot-safety-critical-reliability',
  'pilot-regulatory-approval',
  'pilot-helm-verified',
  'fleet-availability-percentage',
  'fleet-guaranteed-availability',
  'fleet-hardware-included',
  'fleet-deployed-customer',
  'fleet-service-contract',
  'fleet-commercial-package',
  'fleet-security-certification',
]);

// A strong negator negates the claim it directly precedes. Idiomatic "no" /
// "not" / "nunca" uses ("no issues", "no failures", "no solo", "no
// intervention", "no hay duda", "not only", "nunca fue tan fácil") are NOT
// negators. Contractions (cannot/can't/isn't/doesn't/don't/won't) negate, as
// does Spanish "carece(n)" (lacks).
const STRONG_NEGATION =
  /\b(?:no(?!\s+(?:issues?|problems?|failures?|faults?|worries|solo|intervention|hay\s+duda)\b)|not(?!\s+only\b)|cannot|can't|isn't|doesn't|don't|won't|never|ni|neither|nor|nunca(?!\s+fue\s+tan\s+f[aá]cil)|jam[aá]s|ning[uú]n[oa]?|nadie|tampoco|none|nothing|carece|carecen)\b/i;
// "sin"/"without" negate only the noun directly after them; an idiomatic
// "sin …" quality noun is not a negator.
const WEAK_NEGATION =
  /\b(?:sin(?!\s+(?:embargo|duda|fallos?|problemas?|marco|pérdida|cables|esfuerzo)\b)|without(?!\s+issues?\b))\b/i;
// A negated predicate after the claim, in English and Spanish. Applied only
// inside the same sentence/clause by isNegatedClause.
const POST_NEGATION =
  /\b(?:is|are|was|were)\s+(?:not|never)?\s*(?:prohibited|excluded|out\s+of\s+scope)\b|\b(?:is|are|was|were)\s+(?:not|never)\s+(?:offered|available|implemented|certified|verified|tested|established|sold|claimed|announced|supported|included)\b|\b(?:not|never)\s+(?:offered|available|implemented|certified|verified|tested|established|sold|claimed|announced|supported|included|prohibited|excluded)\b|\b(?:no|no\s+está|no\s+están|no\s+se)\s+(?:ofrece|incluye|promete|disponible|incluida|incluido|implementado|certificado|homologado|congelado|establecido|ofrecido)\b/i;
// Sentence punctuation, dashes, newlines, contrastive conjunctions and
// subordinators end the strong-negation scope. A comma continues a strong
// negated list ("No A, B or C"); it ends only the weak scope.
const HARD_BOUNDARY =
  /[.;:?!\n\u2014\u2013]|\b(?:pero|but|sino|aunque|mientras|whereas|while|although|porque|because|since)\b/g;
const WEAK_BOUNDARY =
  /[.;:?!,\n\u2014\u2013]|\b(?:pero|but|sino|aunque|mientras|whereas|while|although|porque|because|since)\b/g;
const COORDINATION = /\b(?:y|e|o|u|and|or)\b/i;
// A coordination (or "yet") followed within a few words by a finite verb
// starts a new predicate and ends the strong-negation scope.
const NEW_PREDICATE =
  /\b(?:and|or|y|e|o|u|yet)\b[^.;:?!,\n]{0,20}\b(?:is|are|es|está|están|son|hay|has|have|does|did|can|will|navega|navigates|steers|steer|opera|operates|funciona|works|ofrece|offers|incluye|includes|provides|proporciona|va|viene|comes)\b/i;

/**
 * True when the claim is genuinely negated. A negator counts only when it
 * directly negates the matched claim:
 *  - a strong negator before the claim whose scope is not cut by a new
 *    predicate (coordination + finite verb);
 *  - a strong negator inside the claim span (a spread claim);
 *  - a weak "sin"/"without" immediately before the claim, never across a
 *    coordination;
 *  - a negated predicate after the claim, within the same sentence/clause;
 *  - a "Not included:" / "Excluded:" colon-list prefix.
 * Ambiguous cases fail closed (rejected rather than passed).
 */
function isNegatedClause(text, start, end) {
  let strongStart = 0;
  for (const match of text.matchAll(HARD_BOUNDARY)) {
    if (match.index !== undefined && match.index < start)
      strongStart = match.index + match[0].length;
  }
  const strongBefore = text.slice(strongStart, start);
  const strongMatches = [...strongBefore.matchAll(new RegExp(STRONG_NEGATION.source, 'gi'))];
  if (strongMatches.length > 0) {
    const last = strongMatches[strongMatches.length - 1];
    const afterNeg = strongBefore.slice(last.index + last[0].length);
    if (!NEW_PREDICATE.test(afterNeg)) return true;
  }

  let weakStart = 0;
  for (const match of text.matchAll(WEAK_BOUNDARY)) {
    if (match.index !== undefined && match.index < start) weakStart = match.index + match[0].length;
  }
  const weakBefore = text.slice(weakStart, start).slice(-18);
  const weakMatches = [...weakBefore.matchAll(new RegExp(WEAK_NEGATION.source, 'gi'))];
  if (weakMatches.length > 0) {
    const last = weakMatches[weakMatches.length - 1];
    const afterWeak = weakBefore.slice(last.index + last[0].length);
    if (!COORDINATION.test(afterWeak)) return true;
  }

  if (STRONG_NEGATION.test(text.slice(start, end))) return true;

  if (
    /(?:not\s+included|excluded|out\s+of\s+scope|no\s+incluido|excluido)\s*:\s*$/i.test(
      text.slice(0, start),
    )
  )
    return true;

  const afterFull = text.slice(end);
  const sentenceEnd = afterFull.search(/[.;?!]/);
  const afterSentence = sentenceEnd === -1 ? afterFull : afterFull.slice(0, sentenceEnd);
  return POST_NEGATION.test(afterSentence);
}

/**
 * Returns the ids of prohibited claim rules matched by a text.
 *
 * Assertion rules are clause-negation aware: "no plug-and-play universal
 * gateway is offered" must pass while "universal plug-and-play" must fail.
 * Every match is scanned (not only the first), so a later non-negated claim
 * cannot escape behind an earlier negated one.
 */
export function catalogClaimProblems(text) {
  if (typeof text !== 'string') return ['not-a-string'];
  const problems = [];
  for (const rule of PROHIBITED_CLAIMS) {
    const global = new RegExp(
      rule.pattern.source,
      rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`,
    );
    let hit = false;
    for (const match of text.matchAll(global)) {
      if (match.index === undefined) continue;
      const end = match.index + match[0].length;
      if (!(NEGATABLE.has(rule.id) && isNegatedClause(text, match.index, end))) {
        hit = true;
        break;
      }
    }
    if (hit) problems.push(rule.id);
  }
  return problems;
}

/**
 * Data-provider names that may never appear in the internal catalogue: no
 * provider is contracted (provider rights NOT_GRANTED). Returns the names found,
 * case-insensitively, or an empty array. Matching is word-boundary aware so a
 * short marker (IHM, AEMET) is never matched as a substring of an unrelated
 * word; multi-word and hyphenated names are matched as whole forms.
 */
export const NAMED_PROVIDER_MARKERS = [
  'meteoblue',
  'meteogroup',
  'predictwind',
  'windy.com',
  'ecmwf',
  'navionics',
  'tidetech',
  'stormglass',
  'openweather',
  'windfinder',
  'windguru',
  'buoyweather',
  'meteofrance',
  'noaa',
  'aemet',
  'ipma',
  // MC-21 mandated providers (finding F-1): none is contracted, so none may be
  // named. AEMET and OpenWeather were already covered above.
  'copernicus',
  'emodnet',
  'open-meteo',
  'meteogalicia',
  'puertos del estado',
  'ihm',
];

export function providerNameProblems(text) {
  if (typeof text !== 'string') return [];
  const lower = text.toLowerCase();
  return NAMED_PROVIDER_MARKERS.filter((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`).test(lower);
  });
}

/**
 * Spanish function-word clustering in an English sentence. Two or more hits
 * indicate an untranslated block; a single hit is tolerated because several of
 * these tokens are legitimate English words.
 */
const SPANISH_ONLY = /\b(?:el|la|los|las|una|para|con|que|desde|sin|según|también)\b/gi;

export function englishClusterProblem(text) {
  if (typeof text !== 'string') return false;
  const hits = (text.match(SPANISH_ONLY) ?? []).length;
  return hits >= 2;
}

/** A source reference is `<relative path>[#fragment]`; the path must exist. */
export function sourceRefPath(ref) {
  if (typeof ref !== 'string' || ref.length === 0) return null;
  const [path] = ref.split('#');
  return path;
}

/** Proper-noun-like tokens may legitimately be identical in both locales. */
const LOCALE_INVARIANT =
  /^(?:MAREA(?:\s+(?:NAV|HUB|AIS|SENSE|WATCH|WEATHER|DISPLAY|PILOT|FLEET|START|CRUISE|SAIL|PROTECT|COMPLETE))?|NAV|HUB|AIS|SENSE|WATCH|WEATHER|Software|Hardware|Signal K|NMEA 0183|Wi-Fi|[A-Z0-9][A-Z0-9 ·_-]*|NAV (?:Essential|Pro)|HUB (?:Standard|Pro)|AIS (?:Receiver|Connected)|SENSE (?:Wind|Power|Bilge|Tanks|Environment|Essentials|Sail|Systems)|WATCH (?:Core|Plus)|WEATHER (?:Standard|Pro)|DISPLAY 7|DISPLAY Large|PILOT (?:Coastal|Sail|Pro)|FLEET (?:Start|Business|Enterprise)|Roles)$/;

const NEGATION_ES = /\b(?:no|sin|sólo|solo|ni|nunca|jam[aá]s|ning[uú]n[oa]?|nadie|tampoco)\b/i;
const NEGATION_EN = /\b(?:no|not|never|without|only|neither|nor|receive-only)\b/i;

/**
 * Genuine bilingual checks over every localized pair: no empty locale, no
 * untranslated pair unless it is a proper noun, and every limitation or
 * prohibition carries a negation marker in both languages.
 */
export function bilingualTextProblems(content) {
  const problems = [];
  const pairs = [];
  const collect = (id, value) => {
    if (value && typeof value === 'object') {
      const hasEs = 'es' in value;
      const hasEn = 'en' in value;
      if (hasEs || hasEn) {
        if (!hasEs || !hasEn) {
          problems.push(`${id}: missing locale`);
        } else {
          pairs.push({ id, es: value.es, en: value.en });
        }
      }
    }
  };

  collect('hero.kicker', content.hero.kicker);
  collect('hero.heading', content.hero.heading);
  collect('hero.lead', content.hero.lead);
  collect('hero.category', content.hero.category);
  collect('hero.notice', content.hero.mandatoryNotice.text);
  content.hero.highlights.forEach((entry, index) => collect(`hero.highlight.${index}`, entry.text));
  for (const [sectionId, section] of Object.entries(content.sections)) {
    collect(`sections.${sectionId}.kicker`, section.kicker);
    collect(`sections.${sectionId}.heading`, section.heading);
    collect(`sections.${sectionId}.lead`, section.lead);
  }
  content.overviewNotes.forEach((entry, index) => collect(`overview.${index}`, entry.text));
  for (const capability of content.capabilities) {
    collect(`${capability.contentId}.label`, capability.label);
    collect(`${capability.contentId}.description`, capability.description);
  }
  for (const group of content.composition) {
    collect(`${group.groupId}.label`, group.label);
    collect(`${group.groupId}.heading`, group.heading);
    for (const item of group.items) collect(`${item.contentId}.text`, item.text);
  }
  for (const row of content.interfaces) {
    collect(`${row.contentId}.direction`, row.direction);
    collect(`${row.contentId}.transport`, row.transport);
    collect(`${row.contentId}.status`, row.status);
    if (row.note) collect(`${row.contentId}.note`, row.note);
  }
  for (const edition of content.editions) {
    collect(`${edition.editionId}.name`, edition.name);
    collect(`${edition.editionId}.summary`, edition.summary);
    if (edition.note) collect(`${edition.editionId}.note`, edition.note);
    for (const feature of edition.featureLabels) {
      collect(`${edition.editionId}.${feature.featureKey}`, feature.label);
    }
  }
  collect('editionNote', content.editionNote);
  for (const limitation of content.limitations) {
    collect(`${limitation.contentId}.label`, limitation.label);
    collect(`${limitation.contentId}.description`, limitation.description);
  }
  for (const bundle of content.bundleNotes) collect(`${bundle.bundleId}.note`, bundle.note);
  for (const document of content.documentation) {
    collect(`${document.documentId}.title`, document.title);
    if (document.limitation) collect(`${document.documentId}.limitation`, document.limitation);
  }
  collect('closing.heading', content.closing.heading);
  collect('closing.body', content.closing.body);
  content.closing.governance.forEach((entry, index) => collect(`closing.gov.${index}`, entry.text));
  collect('closing.next', content.closing.nextMilestone.text);

  for (const field of ['kicker', 'heading', 'lead', 'category']) {
    const value = content.hero?.[field];
    if (
      !value ||
      typeof value !== 'object' ||
      typeof value.es !== 'string' ||
      typeof value.en !== 'string'
    ) {
      problems.push(`hero.${field}: missing localized field`);
    }
  }

  for (const pair of pairs) {
    if (!pair.es.trim() || !pair.en.trim()) problems.push(`${pair.id}: empty locale`);
    if (pair.es.trim() === pair.en.trim() && !LOCALE_INVARIANT.test(pair.es.trim())) {
      problems.push(`${pair.id}: identical ES/EN text`);
    }
  }
  for (const limitation of content.limitations) {
    const es = `${limitation.label.es} ${limitation.description.es}`;
    const en = `${limitation.label.en} ${limitation.description.en}`;
    if (!NEGATION_ES.test(es))
      problems.push(`${limitation.contentId}: ES limitation lacks a negation`);
    if (!NEGATION_EN.test(en))
      problems.push(`${limitation.contentId}: EN limitation lacks a negation`);
  }
  return problems;
}

export function normaliseRoutePath(path) {
  return String(path).replace(/^\/+/, '').replace(/\/+$/, '');
}

/** Sorted inventory of a family content contract, used for ES/EN parity checks. */
export function contentInventory(content) {
  return {
    sections: Object.keys(content.sections).sort(),
    capabilityIds: content.capabilities.map((entry) => entry.contentId).sort(),
    limitationIds: content.limitations.map((entry) => entry.contentId).sort(),
    compositionIds: content.composition
      .flatMap((group) => group.items.map((item) => item.contentId))
      .sort(),
    interfaceIds: content.interfaces.map((entry) => entry.contentId).sort(),
    editionIds: content.editions.map((entry) => entry.editionId).sort(),
    documentIds: content.documentation.map((entry) => entry.documentId).sort(),
    bundleIds: content.bundleNotes.map((entry) => entry.bundleId).sort(),
  };
}

export function inventoryParityProblems(es, en) {
  const problems = [];
  for (const key of Object.keys(es)) {
    if (JSON.stringify(es[key]) !== JSON.stringify(en[key])) {
      problems.push(`${key} inventory differs between locales`);
    }
  }
  return problems;
}

/** Collects every rendered string from a family content contract. */
export function contentStrings(content) {
  const strings = [];
  const push = (value) => {
    if (value && typeof value === 'object' && 'es' in value && 'en' in value) {
      strings.push(value.es, value.en);
    }
  };
  push(content.hero.kicker);
  push(content.hero.heading);
  push(content.hero.lead);
  push(content.hero.category);
  push(content.hero.mandatoryNotice.text);
  for (const highlight of content.hero.highlights) push(highlight.text);
  for (const section of Object.values(content.sections)) {
    push(section.kicker);
    push(section.heading);
    push(section.lead);
  }
  for (const note of content.overviewNotes) push(note.text);
  for (const capability of content.capabilities) {
    push(capability.label);
    push(capability.description);
  }
  for (const group of content.composition) {
    push(group.label);
    push(group.heading);
    for (const item of group.items) push(item.text);
  }
  for (const row of content.interfaces) {
    push(row.direction);
    push(row.transport);
    push(row.status);
    if (row.note) push(row.note);
  }
  for (const edition of content.editions) {
    push(edition.name);
    push(edition.summary);
    if (edition.note) push(edition.note);
    for (const feature of edition.featureLabels) push(feature.label);
  }
  push(content.editionNote);
  for (const limitation of content.limitations) {
    push(limitation.label);
    push(limitation.description);
  }
  for (const bundle of content.bundleNotes) push(bundle.note);
  for (const document of content.documentation) {
    push(document.title);
    if (document.limitation) push(document.limitation);
  }
  push(content.closing.heading);
  push(content.closing.body);
  for (const item of content.closing.governance) push(item.text);
  push(content.closing.nextMilestone.text);
  return strings;
}

/** Collects every rendered English string from a family content contract. */
export function contentEnglishStrings(content) {
  const strings = [];
  for (const [index, text] of contentStrings(content).entries()) {
    if (index % 2 === 1) strings.push(text);
  }
  return strings;
}

/**
 * Recursively collects every localized (es/en) string from a nested object or
 * array, used to scan shared copy (CATALOG_SHARED) that is not a family content
 * contract. Non-localized leaves (numbers, booleans, plain strings) are ignored.
 */
export function localizedStrings(value) {
  const out = [];
  const walk = (node) => {
    if (node && typeof node === 'object') {
      if (typeof node.es === 'string' && typeof node.en === 'string') {
        out.push(node.es, node.en);
        return;
      }
      if (Array.isArray(node)) {
        for (const item of node) walk(item);
      } else {
        for (const child of Object.values(node)) walk(child);
      }
    }
  };
  walk(value);
  return out;
}

/** All content blocks with the metadata the validator enforces. */
export function contentBlocks(content) {
  const blocks = [];
  const add = (block) => {
    blocks.push({
      contentId: block.contentId,
      evidenceClass: block.evidenceClass,
      sourceRefs: block.sourceRefs,
    });
  };
  add(content.hero.mandatoryNotice);
  for (const highlight of content.hero.highlights) add(highlight);
  for (const note of content.overviewNotes) add(note);
  for (const capability of content.capabilities) {
    blocks.push({
      contentId: capability.contentId,
      evidenceClass: capability.evidenceClass,
      sourceRefs: capability.sourceRefs,
    });
  }
  for (const group of content.composition) for (const item of group.items) add(item);
  for (const row of content.interfaces) {
    blocks.push({
      contentId: row.contentId,
      evidenceClass: row.evidenceClass,
      sourceRefs: row.sourceRefs,
    });
  }
  for (const limitation of content.limitations) add(limitation);
  for (const item of content.closing.governance) add(item);
  add(content.closing.nextMilestone);
  return blocks;
}

const IMPORT_PATTERN = /(?:from\s+|import\s*\()\s*['"](\.[^'"]+)['"]/g;

/**
 * Walks the production import graph from the public entry points and reports
 * every reachable module under a forbidden root. A reachable catalogue module
 * would mean the internal pages contaminate the public bundle.
 */
export function findForbiddenReach({ root, entryFiles, forbiddenRoots }) {
  const visited = new Set();
  const offenders = [];
  const stack = entryFiles.map((file) => resolve(root, file));
  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    let source;
    try {
      source = readFileSync(current, 'utf8');
    } catch {
      continue;
    }
    const relative = current.slice(root.length + 1).replaceAll('\\', '/');
    for (const forbidden of forbiddenRoots) {
      if (relative.startsWith(`${forbidden.replaceAll('\\', '/')}/`)) {
        offenders.push(relative);
        break;
      }
    }
    for (const match of source.matchAll(IMPORT_PATTERN)) {
      const specifier = match[1];
      const base = resolve(dirname(current), specifier);
      for (const suffix of ['', '.ts', '/index.ts']) {
        const candidate = `${base}${suffix}`;
        try {
          if (statSync(candidate).isFile()) {
            stack.push(candidate);
            break;
          }
        } catch {
          // not this suffix
        }
      }
    }
  }
  return { scanned: visited.size, offenders };
}

/** Recursively lists files under a directory, relative to `root`. */
export function walk(root, relativeDirectory) {
  const out = [];
  const walkDir = (relative) => {
    const absolute = resolve(root, relative);
    let entries;
    try {
      entries = readdirSync(absolute, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const child = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walkDir(child);
      else out.push(child);
    }
  };
  walkDir(relativeDirectory);
  return out;
}

/**
 * Working-tree scope guard: every changed path must match an allowed prefix or
 * exact path. Renames are checked by their destination.
 */
export function scopeProblems(lines, allowedPrefixes, allowedExact) {
  const exact = new Set(allowedExact);
  return lines
    .map((line) => line.replace(/^\s*\S+\s+/, '').trim())
    .filter(Boolean)
    .map((path) => path.split(' -> ').pop())
    .filter(
      (path) => !exact.has(path) && !allowedPrefixes.some((prefix) => path.startsWith(prefix)),
    );
}
