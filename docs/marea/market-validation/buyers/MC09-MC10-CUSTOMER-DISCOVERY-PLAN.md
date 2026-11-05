# MC-09 — Customer discovery plan for MC-10

| Field | Value |
| --- | --- |
| Document ID | MC-09 / Workstream J / MC09-MC10-CUSTOMER-DISCOVERY-PLAN |
| Milestone | MC-09 (market and competitive intelligence) |
| Status | `PREPARATION_ONLY` — nothing executed. Fieldwork: **none** (0 interviews, 0 participants screened, 0 surveys, 0 outreach, 0 advertising, 0 purchases) |
| Lifecycle | All MAREA products and bundles are `CONCEPT` / `DEFINED`, `NOT_FOR_SALE`, uncertified, not trademark-cleared |
| WTP status | `NOT_MEASURED` for every product, bundle and subscription |
| Base commit | `65417bfa681d31cc655e2bc91cfcedcccc368675` |
| Date | 2026-10-31 |
| Owner | agent-g-mc10 (Customer Discovery Methodologist) |
| Write scope | This file; `../MC09-VALIDATION-EXPERIMENTS.md`; `../data/validation-experiments.json`; `../data/evidence-mc10.json` |
| Companion | `../MC09-VALIDATION-EXPERIMENTS.md` defines the ten experiments, thresholds and confounders |
| Is not | A funnel, a survey instrument already fielded, a price list, an order form, a recruitment list, a legal opinion or evidence that customers exist |

This is the working package MC-10 will use **if and when** outreach is authorised. It is deliberately
usable as-is: screening, consent, bilingual instruments, capture schema and analysis plan. It contains no
participant, no count, no response and no price.

## 0. Scope and honesty rules

MC-09 prepares MC-10; it does not execute it. The plan therefore carries three load-bearing statements:

1. MAREA is a **proposed brand**, not a cleared trademark, and no MAREA product is certified, available,
   orderable or priced. Instruments repeat this to every participant in both languages.
2. Willingness to pay is `NOT_MEASURED`. Conditional price questions generate *hypotheses* for a later
   quantitative study; they never produce an approved price, discount or bundle figure.
3. Instruments must not lead respondents toward MAREA. The brand is not named until the closing section
   of the interview, after the participant has described their own workflow, purchases and problems in
   their own words. Concept descriptions are neutral, include exclusions before benefits, and are
   labelled as concepts still under consideration.

Prohibited at every step: presenting an unavailable product as orderable; quoting an unapproved price as
an offer; promising availability, certification, warranty, compatibility, support, stock or lead time;
recording a purchase intent as a pre-order; reusing a quote publicly without separate revocable consent.

## 1. Segments under study

Eight segments. Each is narrow on purpose: broader labels produce uncodeable interviews. `Provisional`
means the definition may change after MC-10 while staying versioned here.

| ID | Segment (EN / ES) | Operational definition |
| --- | --- | --- |
| SEG-01 | Recreational motorboat owner / Propietario de embarcación a motor de recreo | Owns a 6–15 m motorboat, day or coastal use, decision-maker on equipment purchases |
| SEG-02 | Sailing yacht owner / Propietario de velero | Owns a 7–16 m sailing yacht, cruises or races, decision-maker on equipment purchases |
| SEG-03 | Marina-based owner / Propietario con base en puerto deportivo | Owner-occupier whose vessel stays afloat unattended for weeks; cares about monitoring |
| SEG-04 | Marine electronics installer / Instalador de electrónica marina | Independent or yard installer, ≥5 years, ≥2 first-party brands fitted in 24 months |
| SEG-05 | Marine retailer / chandler | Minorista náutico with ranging authority for instruments or safety equipment |
| SEG-06 | Marina or shipyard operator | Operador de puerto deportivo o varadero managing berths, third-party vessels or refit work |
| SEG-07 | Charter organisation or sailing school | Organización de chárter o escuela de vela with 5–30 vessels under management |
| SEG-08 | Fleet manager | Gestor de flota responsible for multi-vessel operations, maintenance and budgets |

Installers (SEG-04) and retailers (SEG-05) are interviewed about **their own** workflow, liability and
channel economics — not asked to speculate about what boat owners want. Owners are never asked to
estimate installer or retailer behaviour. This separation is a validity requirement, not a nicety.

## 2. Recruitment strategy per segment

Cross-cutting rules: purposive quota sampling; written outreach authorisation before the first contact;
no purchased or scraped contact lists; no paid advertising; no engagement of own staff or agents as
participants; no participation by employees of competing marine-electronics vendors; incentive (if any)
approved before fielding and never presented as payment for an opinion about a purchase.

| Segment | Where | Gatekeeper | Approach | Quota (completed) | Exclude |
| --- | --- | --- | --- | --- | --- |
| SEG-01 | Marinas, clubs, owner forums | Berth manager / club secretary | Direct call or introduction, no mass mailing | 5–8 | No vessel, no purchase role |
| SEG-02 | Yacht clubs, regattas, sailing associations | Club secretary, fleet captain | Club noticeboard and introduction | 5–8 | Racer-only with no cruising equipment spend |
| SEG-03 | Marinas, liveaboard communities | Marina office | Marina-mediated invitation only | 5–8 | Vessel ashore or unused |
| SEG-04 | Yards, trade associations | Business owner / technical lead | Verified directory listing, phone | 5–7 | No independent install history |
| SEG-05 | Chandlers, retail chains | Store owner / buyer | Visit or call to decision-maker | 5–7 | Staff without ranging authority |
| SEG-06 | Marinas, shipyard associations | Operations director | Association introduction | 3–5 | Small operator with no third-party vessels |
| SEG-07 | Charter firms, sailing schools | Owner / operations manager | Direct approach, association | 5–8 | <5 vessels under management |
| SEG-08 | Fleet operators, managers | Fleet director | Referral or direct approach | 4–6 | No maintenance or procurement responsibility |

Validity tactics: vary acquisition source within each segment (avoid an all-marina sample); log source per
participant; include referred and non-referred participants; separate owner and installer sessions.

## 3. Sample targets and statistical limitations

| Target | Value | Status |
| --- | --- | --- |
| Qualitative interviews per segment | minimum 5, target 8 (operators/retailers minimum 3) | `PLANNED` |
| Total completed qualitative interviews | 40–80 | `PLANNED` |
| Pricing module completions | every qualitative participant, n ≥ 8 per segment for a usable curve | `PLANNED` |
| Quantitative follow-up (not in MC-10) | n ≥ 100 per tested segment, after a funded design | `NOT_AUTHORISED` |

**Statistical limitations, stated explicitly so no later reader can mistake this for measurement:**

- Purposive quota sampling is not probability sampling. There is no margin of error, no confidence
  interval and no basis for market-size, share or revenue extrapolation.
- Within-sample coding proportions (for example "6 of 8 participants") describe these participants only.
- 5–10 interviews per segment detect strong, repeated signals and catastrophic misunderstandings; they
  cannot detect a 10-point difference between segments or estimate a conversion rate.
- Saturation in a narrow segment is a stopping rule for theme discovery, not a prevalence measure.
- Willingness to pay from a stated-preference exercise is systematically optimistic relative to real
  purchase; the direction of a price curve is more trustworthy than its level.
- Geography is initially Galicia/Rías Baixas and northern Portugal. Results do not transfer to the
  Mediterranean, northern Europe or inland markets without re-testing.
- Instruments are parallel ES/EN by design; translation equivalence is reviewed, not statistically
  established, and language is recorded per participant to allow later checking.
- Self-selection is unavoidable: people who accept an interview differ from those who refuse.

## 4. Instrument suite

All components exist in Spanish and English. Numbering, sub-question order and answer categories are
identical across languages so that coded output is directly comparable.

| ID | Component | ES | EN |
| --- | --- | --- | --- |
| SCREEN-01 | Recruitment screener (administered by recruiter) | §5.1 | §6.1 |
| CONSENT-01 | Consent script, four recorded permissions | §5.2 | §6.2 |
| GUIDE-01 | Moderator guide, 15 numbered sections | §5.3 | §6.3 |
| PRICE-01 | Conditional pricing module (Gabor–Granger + Van Westendorp) | §7.1 | §7.2 |
| NOTE-01 | Note-taking template | §8.1 | §8.1 |
| SCHEMA-01 | Data-capture schema | §9 | §9 |
| ANA-01 | Analysis plan | §10 | §10 |

Moderator discipline (both languages): ask, then stop talking; probe with "why", "what happened next",
"how did you decide", never with a feature; state no price before PRICE-01; never describe MAREA as
available; record verbatim wording; if asked whether they can buy anything, answer "no".

## 5. Spanish instruments (texto operativo)

### 5.1 SCREEN-01 — Filtro de reclutamiento (ES)

Lea el filtro tal cual. No explique el estudio más allá de "estudio de descubrimiento de clientes sobre
equipamiento y servicios para embarcaciones".

- **S1.** ¿Es usted propietario, socio o la persona que decide las compras de equipamiento de la
  embarcación o de la empresa? *(Debe ser sí para SEG-01, 02, 03, 07, 08.)*
- **S2.** ¿Qué tipo y eslora aproximada tiene la embarcación o la flota? *(Bandas: 6–8 m, 8–10 m, 10–12 m,
  12–15 m, >15 m / número de embarcaciones.)*
- **S3.** ¿Dónde está la base habitual? *(Provincia / país.)*
- **S4.** En los últimos 24 meses, ¿ha comprado o instalado algún equipo o servicio para la embarcación?
  *(Sí / No / No lo sé.)*
- **S5.** Solo instaladores y minoristas: ¿cuántos años lleva en activo y qué marcas ha instalado o
  distribuido en los últimos 24 meses? *(≥5 años y ≥2 marcas para SEG-04/05.)*
- **S6.** ¿Trabaja o ha trabajado en los últimos 24 meses para un fabricante, distribuidor o
  comercializador de electrónica marina, o para EMBARCARTE / MAREA? *(Sí = excluir.)*
- **S7.** ¿Ha participado en otro estudio de mercado sobre náutica en los últimos 6 meses? *(Sí = registrar,
  no excluir automáticamente.)*
- **S8.** ¿Prefiere continuar en español o en inglés? *(Registrar idioma; no traducir sobre la marcha.)*

Reglas de exclusión: menor de 18 años; empleados o colaboradores de EMBARCARTE/MAREA; empleados de
competidores directos; personas sin relación con la decisión de compra; quien no pueda dedicar 45–60
minutos. Registre resultado del filtro (APTA / NO APTA + motivo) sin almacenar el nombre completo.

### 5.2 CONSENT-01 — Guion de consentimiento (ES)

> Gracias por su tiempo. Me llamo [nombre] y trabajo con EMBARCARTE, que está estudiando cómo se usan y
> se compran equipos y servicios para embarcaciones. Esta conversación forma parte de un estudio de
> descubrimiento de clientes, no es una venta y no hay nada que comprar. Ningún producto del que hablemos
> está disponible, certificado ni a la venta, y los precios que veamos son hipótesis de investigación,
> no ofertas.
>
> Duración: unos 45–60 minutos. Puede interrumpir, saltarse cualquier pregunta o retirarse sin dar
> explicaciones y sin consecuencias. No hay respuestas correctas o incorrectas; nos interesa su
> experiencia real, incluso si es crítica.
>
> Datos: tomaré notas con un identificador, no con su nombre. Si me lo permite, grabaré el audio para no
> perder detalle; la grabación es opcional y puede negarse y seguir participando. Guardaremos los datos
> de forma seudonimizada, con acceso limitado al equipo del estudio, y los conservaremos solo el tiempo
> necesario para el análisis y la decisión del proyecto. Puede ejercer sus derechos de acceso,
> rectificación, supresión y oposición escribiendo a [contacto de privacidad].
>
> Permisos, cada uno por separado (registre sí/no y la fecha):
> 1. ¿Acepta participar en esta conversación?
> 2. ¿Acepta que se grabe el audio? *(opcional)*
> 3. ¿Acepta que usemos frases suyas de forma anónima en documentos internos? *(opcional)*
> 4. ¿Acepta que le contactemos más adelante para una fase posterior? *(opcional; indique canal y hasta
>    qué fecha)*
>
> Si no acepta participar, la conversación termina aquí. Gracias.

### 5.3 GUIDE-01 — Guía de moderación (ES)

No mencione MAREA, marcas propias ni precios en Q1–Q11. Anote respuestas literales.

**Q1. Contexto.** «Cuénteme qué embarcación tiene o gestiona y cómo la usa durante el año.» Sondeos:
temporada, días medios a bordo, tipo de salidas, quién más la usa o decide.

**Q2. Equipo y configuración actual.** «¿Qué electrónica lleva a bordo — navegación, piloto, AIS, sondas,
baterías, sensores? ¿Qué antigüedad tiene? ¿Cómo está conectado entre sí?» Sondeos: qué funciona, qué no,
qué nunca se ha actualizado, qué marcas y modelos recuerda.

**Q3. Flujo de trabajo habitual.** «Descríbame la última salida o el último mantenimiento, desde que lo
planificó hasta que volvió.» Sondeos: qué información consultó, dónde la apuntó, qué comprobó a mano, qué
tuvo que preguntar a alguien, qué pasó que no esperaba.

**Q4. Decisiones reales de compra recientes.** «Piense en la última compra de equipo o servicio para la
embarcación en los últimos 24 meses. ¿Qué compró, cuándo, por qué, cuánto y cómo lo decidió?» Sondeos:
quién influyó, qué alternativas comparó, qué le hizo decidirse, cómo pagó (pago único, cuota, cuota de
mantenimiento), qué salió mal después.

**Q5. Gasto actual.** «Sin cifras exactas: ¿en qué categorías gasta al año en la embarcación y en qué
bandas?» Sondeos: mantenimiento, seguridad, comunicaciones, suscripciones de software o cartas,
vigilancia, seguro. Registre banda y moneda, no una cifra inventada.

**Q6. Alternativas actuales.** «¿Qué productos, aplicaciones o servicios usa hoy para estas cosas? ¿Qué
le gusta y qué le molesta de cada uno?» Sondeos: sustituto manual (libreta, teléfono, radio), marca
líder, por qué continúa con ella, qué le haría cambiar.

**Q7. Puntos de dolor (no dirigido).** «¿Qué es lo más frustrante de tener o gestionar esta embarcación?
¿Qué le ha costado tiempo o dinero? ¿Qué ha intentado resolver y no ha podido?» No proponga soluciones;
no nombre categorías de producto. Anote el problema con las palabras del participante y su consecuencia
económica u operativa.

**Q8. Instalación.** «Si tuviera que instalar un equipo nuevo hoy, ¿qué le preocuparía?» Sondeos: quién
lo instalaría, qué documentación o garantía pediría, qué pasaría si el equipo no es compatible, qué
pasaría si hubiera que rehacer el trabajo, cuánto tiempo aguantaría el barco parado, qué le preocupa del
seguro o de la responsabilidad.

**Q9. Suscripción.** «¿Qué opina de pagar una cuota periódica por software o servicios del barco?»
Sondeos: qué funciones deberían seguir funcionando sin pagar, qué cadencia preferiría, qué incluiría o
excluiría, qué le haría cancelar, qué ha pagado antes y si lo renovó, qué opina de pagar por barco frente
a por persona.

**Q10. Confianza y garantía.** «¿Qué le haría desconfiar de una empresa nueva en este sector?» Sondeos:
qué garantía escrita necesitaría, durante cuánto tiempo, quién responde de una instalación defectuosa, de
quién son los datos del barco, qué debería pasar con sus datos si deja de pagar o si la empresa
desaparece, qué referencia de confianza busca (instalador, marca conocida, distribuidor).

**Q11. Comprensión de conceptos.** Lea cada descripción tal cual, sin marca y sin beneficios. Luego pida
reformulación sin ayuda: «Con sus palabras, ¿qué hace este concepto y qué no hace?». Anote inclusiones
correctas, omisiones y errores críticos.

> **Concepto A — navegación y datos a bordo.** Software de planificación y navegación que puede mostrar datos
> de equipos compatibles. No incluye cartas náuticas (se licencian aparte) ni instalación, no garantiza compatibilidad y no sustituye instrumentos certificados.
>
> **Concepto B — conocimiento de tráfico.** Equipo receptor que muestra la posición que otras embarcaciones
> transmiten por radio. Solo recibe: no transmite su posición, no evita colisiones y no ve embarcaciones que no emiten.
>
> **Concepto C — vigilancia de embarcación desatendida.** Sensores y avisos al teléfono sobre posición, batería,
> sentinas y eventos. No previene robos, depende de cobertura y energía y no es un servicio certificado de socorro.
>
> **Concepto D — ayuda al gobierno del barco.** Piloto automático supervisado para embarcaciones verificadas como
> compatibles. No permite gobierno remoto sin supervisión, exige instalación y pruebas y no es un sistema listo para instalar.
>
> **Concepto E — operación de flotas.** Software para que un operador vea varias embarcaciones, tareas y
> mantenimiento. No es una app de consumo, exige condiciones de tratamiento de datos y no incluye hardware ni conectividad.

**Q12. Precios condicionales.** No lo haga aquí: pase a PRICE-01 (§7.1). Antes de empezar, lea en voz
alta: «Los precios que verá son hipótesis de investigación, no ofertas, y hoy no se puede comprar nada de
lo que hemos descrito.»

**Q13. Intención de compra (evidencia, no pedido).** «Si un concepto como el que hemos descrito existiera
en el futuro, con esas exclusiones y esas condiciones: ¿qué probabilidad habría de que lo comprara?»
Escala: lo compraría con seguridad / probablemente sí / podría ser / probablemente no / con seguridad no.
Sondeos: ¿qué tendría que ser verdad para que lo comprara?, ¿qué le faltaría?, ¿cuándo sería el momento?,
¿a quién consultaría?, ¿qué le haría esperar? Repita que hoy no puede pedirlo ni reservarlo.

**Q14. Cierre.** «¿Hay algo que no le haya preguntado y que debería saber? ¿Cuál es la cosa más
importante que deberíamos entender? ¿Qué le haría recomendar esto o rechazarlo?»

**Q15. Permisos de seguimiento.** «¿Aceptaría que le contactemos para una fase posterior o para una
prueba? ¿Por qué canal, con qué alcance y hasta qué fecha? Puede retirar este permiso cuando quiera.»
Registre sí/no, canal, alcance y fecha; no solicite datos que no necesite para ese contacto.

## 6. English instruments (operational text)

### 6.1 SCREEN-01 — Recruitment screener (EN)

Read the screener verbatim. Do not describe the study beyond "customer discovery about boat equipment and
services".

- **S1.** Are you the owner, partner or person who decides equipment purchases for the vessel or the
  business? *(Must be yes for SEG-01, 02, 03, 07, 08.)*
- **S2.** What type and approximate length is the vessel or fleet? *(Bands: 6–8 m, 8–10 m, 10–12 m,
  12–15 m, >15 m / number of vessels.)*
- **S3.** Where is the vessel normally based? *(Region / country.)*
- **S4.** In the last 24 months, have you bought or installed any equipment or service for the vessel?
  *(Yes / No / Don't know.)*
- **S5.** Installers and retailers only: how many years have you been trading and which brands have you
  fitted or distributed in the last 24 months? *(≥5 years and ≥2 brands for SEG-04/05.)*
- **S6.** Do you work, or have you worked in the last 24 months, for a marine-electronics manufacturer,
  distributor or reseller, or for EMBARCARTE / MAREA? *(Yes = exclude.)*
- **S7.** Have you taken part in another boating market-research study in the last 6 months? *(Yes =
  record, do not automatically exclude.)*
- **S8.** Would you prefer to continue in Spanish or English? *(Record the language; do not translate
  live.)*

Exclusion rules: under 18; EMBARCARTE/MAREA employees or contractors; employees of direct competitors;
anyone without a role in the purchase decision; anyone unable to give 45–60 minutes. Record the screener
outcome (ELIGIBLE / NOT ELIGIBLE + reason) without storing the full name.

### 6.2 CONSENT-01 — Consent script (EN)

> Thank you for your time. My name is [name] and I work with EMBARCARTE, which is studying how boat
> equipment and services are used and bought. This conversation is part of customer discovery — it is not
> a sale, and there is nothing to buy. No product we discuss is available, certified or for sale, and any
> prices we look at are research hypotheses, not offers.
>
> It takes about 45–60 minutes. You can stop, skip any question, or withdraw without giving a reason and
> without any consequence. There are no right or wrong answers; we want your real experience, including
> the critical parts.
>
> Data: I will take notes under an identifier, not your name. If you agree, I will record audio so I do
> not lose detail; recording is optional and you can decline and still take part. We store data
> pseudonymised, with access limited to the study team, and keep it only as long as needed for the
> analysis and the project decision. You can exercise your access, rectification, erasure and objection
> rights by writing to [privacy contact].
>
> Permissions, each recorded separately (record yes/no and date):
> 1. Do you agree to take part in this conversation?
> 2. Do you agree to audio recording? *(optional)*
> 3. Do you agree that we may use your anonymised wording in internal documents? *(optional)*
> 4. Do you agree to be contacted later about a follow-up stage? *(optional; record channel and end date)*
>
> If you do not agree to take part, the conversation ends here. Thank you.

### 6.3 GUIDE-01 — Moderator guide (EN)

Do not mention MAREA, own brands or prices in Q1–Q11. Record verbatim answers.

**Q1. Context.** "Tell me what vessel you own or manage and how you use it through the year." Probes:
season, average days aboard, type of trips, who else uses or decides.

**Q2. Current equipment and setup.** "What electronics are aboard — navigation, autopilot, AIS, depth,
batteries, sensors? How old is it? How is it connected?" Probes: what works, what does not, what has
never been updated, which brands and models they remember.

**Q3. Current workflow.** "Describe your last trip or last maintenance job, from planning to returning."
Probes: what information they checked, where they wrote it down, what they checked by hand, whom they had
to ask, what happened that they did not expect.

**Q4. Recent real purchase decisions.** "Think about the last equipment or service purchase for the
vessel in the last 24 months. What did you buy, when, why, how much, and how did you decide?" Probes: who
influenced it, what alternatives were compared, what triggered the decision, how it was paid (one-off,
instalments, maintenance fee), what went wrong afterwards.

**Q5. Current spend.** "Without exact figures: which categories do you spend on each year, and in what
bands?" Probes: maintenance, safety, communications, chart or software subscriptions, security, insurance.
Record band and currency, never an invented figure.

**Q6. Current alternatives.** "What products, apps or services do you use for these things today? What do
you like and what annoys you about each?" Probes: manual substitute (notebook, phone, radio), market
leader, why they stay with it, what would make them switch.

**Q7. Pain-point discovery (undirected).** "What is most frustrating about owning or managing this
vessel? What has cost you time or money? What have you tried to fix and could not?" Do not propose
solutions; do not name product categories. Capture the problem in the participant's words and its
economic or operational consequence.

**Q8. Installation.** "If you had to install new equipment today, what would worry you?" Probes: who would
install it, what documentation or warranty they would ask for, what happens if the equipment is not
compatible, what happens if the work has to be redone, how long the boat can be out of use, concerns
about insurance or liability.

**Q9. Subscription.** "What do you think about paying a recurring fee for boat software or services?"
Probes: which functions must keep working without paying, preferred cadence, what would be included or
excluded, what would make them cancel, what they have paid for before and whether they renewed, per-vessel
versus per-person charging.

**Q10. Trust and warranty.** "What would make you distrust a new company in this sector?" Probes: what
written warranty they would need and for how long, who is responsible if an installation is faulty, who
owns the boat's data, what should happen to their data if they stop paying or the company disappears,
which trust reference they look for (installer, known brand, distributor).

**Q11. Concept comprehension.** Read each description verbatim, with no brand and no benefits. Then ask
for unprompted restatement: "In your own words, what does this concept do and what does it not do?"
Record correct inclusions, omissions and critical misconceptions.

> **Concept A — navigation and onboard data.** Planning and navigation software that can display data from
> compatible equipment aboard. It does not include nautical charts (licensed separately) or installation, does not guarantee device compatibility, and does not replace certified navigation instruments.
>
> **Concept B — traffic awareness.** A receiving device that shows the position other vessels transmit by
> radio. Receive-only: it does not transmit your position, does not prevent collisions, and cannot see vessels that do not transmit.
>
> **Concept C — unattended vessel monitoring.** Sensors and phone alerts for position, battery, bilge and
> events. It does not prevent theft, depends on network coverage and power, and is not a certified distress or safety service.
>
> **Concept D — steering assistance.** A supervised autopilot system for vessels verified as compatible.
> It does not allow unsupervised remote steering, requires installation and vessel trials, and is not available as a ready-to-install system.
>
> **Concept E — fleet operations.** Software for an operator to see several vessels, tasks and
> maintenance. It is not a consumer app, requires data-processing terms, and does not include hardware or connectivity.

**Q12. Conditional pricing.** Not here: move to PRICE-01 (§7.2). Before starting, read aloud: "The prices
you will see are research hypotheses, not offers, and nothing we described can be bought today."

**Q13. Purchase-intent evidence (not an order).** "If a concept like the one we described existed in the
future, with those exclusions and conditions: how likely would you be to buy it?" Scale: definitely would
buy / probably would / might / probably would not / definitely would not. Probes: what would have to be
true for you to buy?, what is missing?, when would the timing be right?, whom would you consult?, what
would make you wait? Repeat that nothing can be ordered or reserved today.

**Q14. Closing.** "Is there anything I have not asked that I should know? What is the single most
important thing we should understand? What would make you recommend this, or reject it?"

**Q15. Follow-up permissions.** "Would you accept being contacted about a later stage or a trial? Which
channel, what scope, and until what date? You can withdraw this permission at any time." Record yes/no,
channel, scope and date; do not request data you do not need for that contact.

## 7. Conditional pricing module (PRICE-01)

Administered only after GUIDE-01. Both versions read the same introduction: prices are exploratory
research figures, nothing is for sale, no price is an offer, and answers are opinions. Price points come
from a pre-registered ladder derived from MC-09 observations; the moderator may not adjust a ladder
mid-interview. Currency and VAT treatment are recorded exactly as spoken.

### 7.1 PRICE-01 (ES)

**Introducción.** «Ahora le mostraré algunos precios hipotéticos para dos configuraciones descritas como
conceptos. Insisto: no son ofertas, no hay nada a la venta y no puede reservar ni comprar. Me interesa su
reacción sincera, incluida la de "no lo compraría a ningún precio".»

**A. Escalera Gabor–Granger.** Para cada precio, responda: lo compraría con seguridad / probablemente sí /
podría ser / probablemente no / con seguridad no.
- Configuración 1 (concepto de navegación y datos a bordo, pago único o suscripción anual según
  configuración): 5 puntos de precio preinscritos, de menor a mayor.
- Configuración 2 (concepto de vigilancia: equipo + cuota): 5 puntos de precio preinscritos.
- Sondeos tras cada punto: ¿por qué esa respuesta?, ¿qué incluiría ese precio para que le pareciera
  justo?, ¿qué excluye que le haría cambiar de respuesta?

**B. Meter de sensibilidad al precio (Van Westendorp).** Para cada configuración, cuatro preguntas
independientes, sin mostrar las respuestas anteriores:
1. ¿A qué precio le parecería **tan barato** que dudaría de su calidad?
2. ¿A qué precio le parecería una **ganga**, una buena compra?
3. ¿A qué precio empezaría a parecerle **caro**, aunque podría planteárselo?
4. ¿A qué precio le parecería **tan caro** que no lo compraría?
Tras cada respuesta: «¿En qué está pensando: pago único, cuota anual, instalación incluida o aparte?»
Registre la moneda y el tratamiento de IVA tal como los exprese.

**C. Cierre del módulo.** «¿Hay algún precio o forma de pago que no le haya mostrado y que cambiaría su
respuesta? ¿Qué parte del precio le resulta más difícil de justificar?»

### 7.2 PRICE-01 (EN)

**Introduction.** "I will now show you some hypothetical prices for two configurations described as
concepts. Again: they are not offers, nothing is for sale, and you cannot reserve or buy. I want your
honest reaction, including 'I would not buy it at any price'."

**A. Gabor–Granger ladder.** For each price, answer: definitely would buy / probably would / might /
probably would not / definitely would not.
- Configuration 1 (navigation and onboard-data concept, one-off or annual subscription depending on
  configuration): 5 pre-registered price points, ascending.
- Configuration 2 (monitoring concept: device plus fee): 5 pre-registered price points.
- Probes after each point: why that answer?, what would that price need to include to feel fair?, what
  exclusion would change your answer?

**B. Price Sensitivity Meter (Van Westendorp).** For each configuration, four independent questions
without showing previous answers:
1. At what price would it seem **so cheap** that you would doubt its quality?
2. At what price would it seem a **bargain**, a good buy?
3. At what price would it start to seem **expensive**, though you might still consider it?
4. At what price would it seem **so expensive** that you would not buy it?
After each answer: "What are you thinking of: one-off payment, annual fee, installation included or
separate?" Record currency and VAT treatment exactly as stated.

**C. Module close.** "Is there any price or payment structure I have not shown that would change your
answer? Which part of the price is hardest to justify?"

## 8. Capture templates

### 8.1 NOTE-01 — Note-taking template (identical in both languages)

Fields: participant ID; date and start time; duration; language (ES/EN); segment; role; acquisition
source; consent flags C1–C4 with timestamps; recording flag; Q1–Q11 verbatim highlights with timestamps;
concept-comprehension grid (per concept: correct inclusions / correct exclusions / misconceptions);
PRICE-01 raw answers including currency and VAT treatment; purchase-history records; current-spend bands;
alternatives named; barrier ranking; follow-up permission (yes/no, channel, scope, expiry); interviewer
quality flags (rushed, leading answers, translation issue, participant confusion); free notes.

Rules: verbatim wording only for quotes; paraphrases marked as such; never invent an amount the
participant did not state; leave unknown fields empty rather than "0"; no full names, addresses, berth
numbers or registration numbers in the notes.

## 9. SCHEMA-01 — Data capture schema

| Entity | Field | Type / allowed values | Required |
| --- | --- | --- | --- |
| participant | participantId / segmentId / role / country / language / acquisitionSource / consent{participate,record,quote,followUp} / withdrawalDate | string / SEG-01…08 / enum / ISO country / ES-EN / enum / booleans + dates | yes |
| purchaseRecord | purchaseId / participantId / category / year / amountBand / currency / vatTreatment / decisionMaker / alternativesConsidered[] / trigger / outcome | string / string / enum / YYYY / band enum / ISO 4217 / enum / enum / strings / enum / enum | yes when described |
| spendProfile | participantId / category / annualBand / currency / recurring (bool) | string / enum / band / ISO 4217 / boolean | yes |
| priceResponse | participantId / construct / method (GABOR_GRANGER \| VAN_WESTENDORP) / pricePoint / currency / vatTreatment / intentScale or vwQuestion / responseTimeSeconds / reasonsVerbatum | string / enum / enum / number / ISO 4217 / enum / enum / number / string | every administered point |
| barrier | participantId / barrierCode / rank / verbatim | string / codebook / 1–3 / string | yes |
| comprehension | participantId / conceptId / correctInclusions / correctExclusions / misconceptions[] / verbatimRestatement | string / A–E / integer / integer / codes / string | yes |
| coding | unitId / participantId / code / coder / confidence | string / string / codebook / coderId / enum | yes |
| followUp | participantId / permitted (bool) / channel / scope / expiry / withdrawnAt | string / boolean / enum / string / date / date | yes |

All WTP fields are typed as research opinions and are never written into any commercial price field.
There is deliberately no "agreed price", "offer" or "reservation" entity: those do not exist.

## 10. ANA-01 — Analysis plan

1. **Coding.** Fixed a-priori codebook (problem, spend, alternative, trigger, installation barrier,
   subscription objection, trust barrier, misconception) plus emergent codes created only after the first
   four interviews, so the codebook cannot be fitted to results. Two coders independently code at least
   25% of transcripts; disagreements resolved by discussion; inter-coder agreement reported (target
   Cohen's κ ≥ 0.60 for theme codes). Low agreement is reported, not hidden.
2. **Within-case then cross-case.** A one-page within-case summary per participant (problem, spend,
   alternatives, barriers, concept comprehension, price responses), then segment matrices
   (segment × theme) and a barrier ranking per segment.
3. **Saturation.** Recorded per segment as "no new code in the last two interviews"; if not reached,
   report it and do not claim saturation.
4. **Negative-case analysis.** Explicitly list participants who contradicted the dominant theme; the
   decision threshold can fail because of them, and that must be shown.
5. **Pricing analysis (indicative only).** Gabor–Granger: per segment and construct, intent proportion per
   price point, monotonicity check, interpolated 50%-intent band labelled `HYPOTHESIS`. Van Westendorp:
   cumulative curves, point of marginal cheapness and point of marginal expensiveness, acceptable range
   labelled `HYPOTHESIS`, consistency violations reported raw. No statistical test, no confidence
   interval and no conversion estimate is produced from 5–10 cases per segment; the analysis output is a
   testable range for a later quantitative study.
6. **Comprehension scoring.** Per concept: proportion restating ≥2 exclusions correctly and proportion
   holding any critical misconception, against the pre-registered thresholds in `MC09-VALIDATION-EXPERIMENTS.md`.
7. **Decision record.** Every experiment gets `PASS` / `FAIL` / `INCONCLUSIVE` / `BLOCKED` with threshold,
   observed counts, confounders and permitted next step; ambiguous cases default to `INCONCLUSIVE`.
8. **Reporting.** Aggregate only; no participant identifiable; percentages always labelled "within this
   sample (n=…)". A negative or thin result is published in the MC-10 delivery note, not dropped.

## 11. GDPR and privacy safeguards

- **Controller and lawful basis.** Controller identity and privacy contact must be confirmed before
  fielding; the legal seller identity is `OPEN` in the programme (X-02), so MC-10 cannot start until a
  named controller exists. Basis: explicit consent, GDPR Art. 6(1)(a), with Art. 13 information in the
  script. National implementations (LOPDGDD in Spain, Lei 58/2019 in Portugal) may add requirements and
  must be checked before fielding.
- **Minimisation.** Segment, role, vessel/business profile in bands, opinions, verbatim statements and
  purchase bands. No ID numbers, berth numbers, registration numbers, billing data, customer lists,
  manifests, health or other special-category data. No minors, no vulnerable participants.
- **Consent quality.** Four separate recorded permissions (participation, recording, quote use, follow-up);
  consent is not bundled, not pre-ticked and withdrawable at any time without justification; withdrawal
  recorded with date and respected in every downstream artefact.
- **Pseudonymisation and access.** Participant IDs only in analysis files; the contact key (needed only
  for permitted follow-up) stored separately, access-restricted, with a deletion date. Study team access
  only; no sharing with commercial teams for targeting.
- **Retention and deletion.** Audio destroyed once the verbatim excerpt is verified; identifiable contact
  data deleted at the end of MC-10 unless a dated follow-up permission exists; coded data kept only for
  the milestone decision and then deleted or anonymised.
- **Processors.** Transcription or survey tools are processors needing a data-processing agreement and an
  EU data-residency review; no participant data in free consumer AI tools.
- **Rights and security.** Access, rectification, erasure, objection and withdrawal honoured within the
  legal deadline; encryption at rest for stored notes; breach notification path defined before fielding.
- **Professional standards.** ICC/ESOMAR principles: voluntary participation, adequate information, no
  misrepresentation of research as selling, respondent protection. No research result may be published as
  a customer testimonial without separate consent.

## 12. Decision thresholds and hand-off to MC-10

Thresholds, experiments (`EXP-MC10-01` … `EXP-MC10-10`), confounders and interpretation rules are
pre-registered in `../MC09-VALIDATION-EXPERIMENTS.md`, mirrored in `../data/validation-experiments.json`;
this plan supplies the recruitment, instruments, schema and analysis method they depend on.

**Preconditions before the first MC-10 conversation** (all unmet): written outreach authorisation; named
data controller, lawful basis and privacy contact; frozen thresholds and price ladders; reviewed ES/EN
translation equivalence; recruiter training; a recorded field start date. Until all six exist, status
stays `NOT_EXECUTED` and every WTP value `NOT_MEASURED`; missing preconditions are `BLOCKED`, never worked around.
