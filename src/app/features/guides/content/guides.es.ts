import type { GuideEntry } from '../models/guides';

export const GUIDES_ES: readonly GuideEntry[] = [
  { slug: 'que-es-signal-k', title: 'Qué es Signal K y cómo conecta los datos de tu barco', description: 'Una introducción a Signal K, los instrumentos y el intercambio de datos a bordo.', sections: [
    ['Un lenguaje común para los instrumentos', 'Signal K es un formato abierto para compartir datos náuticos en una red. Una pasarela puede recibir información de instrumentos compatibles y ofrecerla a distintas aplicaciones, evitando que cada pantalla necesite una conexión independiente.'],
    ['Qué comprobar antes de instalarlo', 'Identifica las interfaces de tus equipos, su alimentación y los adaptadores necesarios. La compatibilidad depende de cada instrumento y de su configuración; consulta los manuales y prueba los datos antes de confiar en ellos durante una travesía.'],
    ['Signal K con Open Marine', 'Open Marine utiliza Signal K como bus de datos para mostrar información en dispositivos conectados a la red del barco. La instalación y la integración pueden adaptarse a los equipos existentes.']
  ] },
  { slug: 'cartas-nauticas-sin-internet', title: 'Cartas náuticas sin Internet: cómo preparar la navegación', description: 'Claves para gestionar cartas locales y preparar su disponibilidad a bordo.', sections: [
    ['Preparar las cartas antes de salir', 'Una conexión móvil no está garantizada en el mar. Disponer de cartas autorizadas en almacenamiento local permite consultarlas sin depender de la cobertura, siempre que el equipo y la red de a bordo funcionen.'],
    ['Formatos y licencias', 'Comprueba la cobertura, actualización y licencia de cada fuente. Open Marine Charts admite MBTiles y flujos de importación de archivos ráster y S-57 sin cifrar; no descifra cartas comerciales protegidas.'],
    ['Plan de respaldo', 'Verifica las cartas y la alimentación antes de zarpar y conserva medios de navegación alternativos apropiados. Una aplicación no sustituye la vigilancia ni los procedimientos de navegación.']
  ] },
  { slug: 'ais-barcos-receptor', title: 'AIS para barcos: qué muestra un receptor y cuáles son sus límites', description: 'Entiende los datos AIS, la recepción y sus limitaciones en navegación.', sections: [
    ['Qué aporta AIS', 'El sistema AIS permite recibir información transmitida por embarcaciones y estaciones equipadas, como identidad, posición, rumbo y velocidad. Una pantalla puede representar estos blancos junto a la posición propia.'],
    ['Recepción no es transmisión', 'Un receptor AIS solo muestra los mensajes que consigue recibir; no hace visible tu embarcación a otros barcos. La antena, su instalación, el alcance y las interferencias afectan a la recepción.'],
    ['No todos los barcos aparecen', 'No todas las embarcaciones transmiten AIS y los datos pueden ser incorrectos o estar desactualizados. Mantén la vigilancia visual y por los demás medios disponibles.']
  ] },
  { slug: 'nmea-0183-nmea-2000', title: 'NMEA 0183 y NMEA 2000: diferencias al conectar instrumentos', description: 'Qué revisar al integrar equipos de navegación de distintas generaciones.', sections: [
    ['Dos formas de comunicar datos', 'NMEA 0183 y NMEA 2000 son interfaces diferentes utilizadas en electrónica náutica. Sus conexiones y requisitos físicos no son intercambiables directamente, aunque ambos pueden transportar datos de navegación.'],
    ['Integración paso a paso', 'Anota el modelo, los puertos disponibles y los datos que emite cada equipo. Elige una pasarela o adaptador compatible y comprueba alimentación, cableado y configuración siguiendo la documentación del fabricante.'],
    ['Una pantalla compartida', 'Una vez integrados en un servidor de datos compatible, varios dispositivos de la red pueden consultar la información. La disponibilidad de cada dato depende del equipo y del adaptador instalado.']
  ] },
  { slug: 'anemometro-veleta-barco', title: 'Anemómetro y veleta para barco: qué mide cada sensor', description: 'Diferencia velocidad y dirección del viento y prepara una instalación compatible.', sections: [
    ['Velocidad y dirección', 'El anemómetro mide la velocidad del viento y la veleta indica su dirección. Según el sistema, un mismo conjunto puede proporcionar ambas medidas a la instrumentación.'],
    ['Viento aparente y real', 'El viento aparente es el que recibe el barco en movimiento. Para estimar el viento real, el sistema necesita datos adicionales y coherentes de velocidad y rumbo; los resultados dependen de su calidad y calibración.'],
    ['Antes de elegir un sensor', 'Revisa montaje, cableado, alimentación, protocolo y compatibilidad con la pantalla o pasarela existente. La instalación en el mástil requiere acceso seguro y una calibración adecuada.']
  ] },
  { slug: 'piloto-automatico-vela', title: 'Piloto automático para velero: componentes y comprobaciones', description: 'Una guía para entender controlador, sensores y actuador de un piloto automático.', sections: [
    ['Las piezas del sistema', 'Un piloto automático combina sensores de rumbo, un controlador y un actuador que mueve el gobierno. La elección depende de la embarcación, su sistema de dirección y las condiciones de uso previstas.'],
    ['Seguridad e instalación', 'La alimentación, protección eléctrica, montaje y parada de emergencia deben estudiarse para cada barco. Una pérdida de datos o energía debe gestionarse sin impedir que la tripulación recupere el control manual.'],
    ['Pruebas y supervisión', 'Configura y verifica el sistema en condiciones controladas con personal competente. El piloto no reemplaza la guardia, la vigilancia del entorno ni la responsabilidad del patrón.']
  ] },
  { slug: 'raspberry-pi-navegacion', title: 'Raspberry Pi a bordo: un ordenador para datos de navegación', description: 'Qué considerar al instalar un ordenador compacto para navegación en red local.', sections: [
    ['Un centro de datos a bordo', 'Un ordenador compacto puede ejecutar servicios que recopilan datos de instrumentos y los muestran en pantallas conectadas a la red del barco. Open Marine está diseñado para funcionar en una Raspberry Pi o un equipo de desarrollo.'],
    ['Alimentación y almacenamiento', 'La instalación debe contemplar protección eléctrica, ventilación, humedad y almacenamiento adecuado. Los datos de cartas pueden ocupar mucho espacio y conviene planificar copias de seguridad y actualizaciones.'],
    ['Disponibilidad y respaldo', 'Comprueba el arranque y el acceso local antes de salir. Conserva medios independientes apropiados para la navegación: cualquier ordenador, red o fuente de alimentación puede fallar.']
  ] },
  { slug: 'red-wifi-barco', title: 'Cómo compartir los datos del barco por una red Wi-Fi local', description: 'Conceptos básicos para consultar instrumentos desde tablets y portátiles a bordo.', sections: [
    ['Una red local para las pantallas', 'Una red Wi-Fi a bordo permite que tablets y portátiles accedan a servicios locales sin depender necesariamente de Internet. El servidor y los dispositivos deben estar conectados a la misma red configurada.'],
    ['Seguridad y cobertura', 'Protege el acceso con credenciales adecuadas, actualiza los equipos y limita los servicios expuestos. Comprueba la cobertura en los lugares de uso y la estabilidad de la alimentación.'],
    ['Pantallas y disponibilidad', 'Con Open Marine, la interfaz se consulta desde un navegador. La disponibilidad de los datos depende de los sensores conectados y de que el servidor y la red estén operativos.']
  ] },
  { slug: 'gps-ais-instrumentos-barco', title: 'Integrar GPS, AIS y sensores en una sola pantalla', description: 'Cómo planificar la integración de datos de navegación sin sustituir todos los instrumentos.', sections: [
    ['Inventario de equipos', 'Empieza identificando GPS, AIS, sonda y sensores de viento, junto con sus salidas y versiones. No todos los dispositivos facilitan los mismos datos ni utilizan la misma interfaz.'],
    ['Pasarela y red de datos', 'Una pasarela compatible puede convertir o distribuir los datos para que una aplicación los presente conjuntamente. En Open Marine, Signal K actúa como bus de datos entre las fuentes y la interfaz.'],
    ['Verificación a bordo', 'Compara las lecturas con los instrumentos originales, revisa unidades y fuentes duplicadas y documenta la instalación. Si un dato no es fiable, no debe usarse como base única para una decisión.']
  ] },
  { slug: 'electronica-nautica-abierta', title: 'Electrónica náutica abierta: ventajas y decisiones antes de empezar', description: 'Qué significa usar tecnologías abiertas y cómo planificar una instalación ampliable.', sections: [
    ['Qué significa abierta', 'Los formatos y herramientas abiertos facilitan inspeccionar, integrar y adaptar partes del sistema. Eso no significa que todos los equipos sean automáticamente compatibles ni que desaparezcan las licencias de terceros.'],
    ['Planificar por módulos', 'Prioriza las necesidades: visualización, integración de sensores, cartas o control. Una arquitectura modular permite abordar cada parte por separado y valorar qué equipos existentes pueden conservarse.'],
    ['Soporte y responsabilidades', 'Documentación, mantenimiento, pruebas y respaldo siguen siendo necesarios. Solicita una evaluación de la instalación y de las limitaciones de cada componente antes de navegar con ella.']
  ] },
  { slug: 'elegir-plotter-nautico-tablet', title: 'Plotter náutico o tablet a bordo: cómo elegir la pantalla de navegación', description: 'Compara pantallas, alimentación y visibilidad antes de elegir un equipo para navegar.', sections: [
    ['Visibilidad y protección', 'Una pantalla de navegación debe poder leerse con sol y utilizarse con agua, guantes y movimiento. Comprueba el brillo, el montaje y la protección del dispositivo; una tablet convencional puede necesitar una funda y una ubicación protegida.'],
    ['Cartas y conectividad', 'Revisa qué cartas admite cada solución, sus licencias y su funcionamiento sin Internet. Una tablet puede acceder a un servidor local, pero también depende de la alimentación y de la red que proporciona los datos.'],
    ['Decidir con un plan de respaldo', 'Valora tamaño, autonomía, actualizaciones y coste de instalación. Prueba la pantalla desde el puesto de gobierno y mantén medios alternativos de navegación adecuados a la travesía.']
  ] },
  { slug: 'conectar-gps-signalk', title: 'Cómo conectar un GPS a Signal K y comprobar su posición', description: 'Pasos para identificar una fuente GPS y validar sus datos en la red del barco.', sections: [
    ['Identifica la salida', 'Localiza el modelo del GPS y si entrega datos por USB, NMEA 0183, NMEA 2000 u otra interfaz. El adaptador debe ser compatible con la salida real del equipo y con el ordenador que ejecuta Signal K.'],
    ['Comprueba posición y hora', 'Después de configurar la fuente, verifica que posición, hora y estado de recepción se actualizan. Compara las coordenadas con el instrumento original y observa si los datos dejan de actualizarse al desconectar la fuente.'],
    ['Evita fuentes ambiguas', 'Si hay varios GPS, documenta qué fuente usa cada pantalla y cómo se selecciona. No supongas que un valor visible es reciente: revisa su actualización y mantén una alternativa de posicionamiento.']
  ] },
  { slug: 'alimentacion-raspberry-pi-barco', title: 'Alimentación de una Raspberry Pi en un barco de 12 V', description: 'Aspectos de protección eléctrica y estabilidad para un ordenador de navegación.', sections: [
    ['La instalación no es una toma USB cualquiera', 'Una red de 12 V puede experimentar variaciones y transitorios. Selecciona una fuente convertidora adecuada para el equipo y el entorno, con protección y dimensionamiento realizados conforme a las instrucciones de los fabricantes.'],
    ['Protección y ubicación', 'Revisa fusibles, sección de cable, conexiones, ventilación y exposición a humedad. La alimentación del ordenador no debe comprometer los circuitos de seguridad ni impedir el gobierno manual.'],
    ['Pruebas antes de navegar', 'Comprueba el arranque, la estabilidad con los periféricos conectados y la recuperación tras un corte. Un instalador cualificado debe evaluar el sistema concreto y sus protecciones.']
  ] },
  { slug: 'instalar-antena-ais-velero', title: 'Dónde instalar una antena AIS en un velero', description: 'Ubicación, cable y compatibilidad para mejorar una instalación de recepción AIS.', sections: [
    ['Ubicación y obstáculos', 'La altura y los obstáculos influyen en la recepción VHF. El lugar adecuado depende del mástil, otras antenas, interferencias y acceso para mantenimiento; no existe una posición universal para todos los barcos.'],
    ['Cable y conexiones', 'El cable, conectores y su longitud introducen pérdidas. Elige componentes compatibles con la antena y el receptor, protege las uniones frente al agua y evita curvaturas o recorridos que puedan dañarlos.'],
    ['Receptor, transmisor y separadores', 'Un receptor no transmite. Si se comparte una antena con una radio o un transpondedor, utiliza únicamente un separador apropiado para los equipos y verifica las instrucciones del fabricante. Comprueba el resultado sin asumir que todos los blancos serán visibles.']
  ] },
  { slug: 'sensor-viento-nmea-2000', title: 'Sensor de viento NMEA 2000: qué revisar antes de comprar', description: 'Comprueba protocolo, instalación y calibración de una veleta o anemómetro.', sections: [
    ['Compatibilidad real', 'Comprueba que sensor, pantalla y pasarela admiten los mensajes necesarios; compartir el nombre de una red no garantiza todas las funciones. Consulta datos de alimentación, conectores y configuración del fabricante.'],
    ['Mástil y cableado', 'Planifica el acceso seguro al mástil, la fijación, el paso del cable y su protección. La posición del sensor y los obstáculos pueden afectar a las lecturas de viento.'],
    ['Calibración y datos adicionales', 'Ajusta la orientación conforme al manual y verifica la lectura en distintas condiciones. Para calcular viento real, el sistema necesita otras mediciones coherentes y fiables.']
  ] },
  { slug: 'diagnosticar-sensor-viento', title: 'El sensor de viento del barco marca mal: guía de diagnóstico', description: 'Una secuencia para distinguir problemas de montaje, alimentación y datos.', sections: [
    ['Empieza por los síntomas', 'Anota si falla la dirección, la velocidad o ambas, y si el fallo ocurre siempre o solo con determinadas condiciones. Compara la lectura entre pantallas para determinar si afecta a toda la red o a una sola aplicación.'],
    ['Revisa conexiones y configuración', 'Con el equipo desconectado cuando corresponda, inspecciona cableado, conectores y signos de corrosión. Verifica alimentación, selección de fuente, unidades y orientación siguiendo el manual del fabricante.'],
    ['Valida antes de sustituir', 'Comprueba si llegan datos actualizados a la pasarela y si el sensor requiere mantenimiento o calibración. Trabajar en el mástil implica riesgos; acude a personal cualificado para las comprobaciones que lo requieran.']
  ] },
  { slug: 'calibrar-veleta-velero', title: 'Cómo plantear la calibración de una veleta de velero', description: 'Qué datos y comprobaciones necesitas para revisar la dirección del viento.', sections: [
    ['Identifica el error', 'Una dirección aparentemente desplazada puede deberse a orientación, configuración, cableado o fuente seleccionada. Compara la pantalla con el sensor y anota las condiciones antes de modificar ajustes.'],
    ['Sigue el procedimiento del equipo', 'Los métodos de calibración varían según fabricante y modelo. Registra el ajuste inicial y sigue el manual para comprobar la alineación, sin improvisar correcciones que oculten otro fallo.'],
    ['Comprueba varias situaciones', 'Verifica que la lectura cambia de forma coherente en ambos lados y que los datos llegan a las pantallas correctas. Una calibración de viento real también depende de otros sensores y su calidad.']
  ] },
  { slug: 'cartas-mbtiles-navegacion', title: 'Qué es MBTiles y cómo usarlo en un sistema de cartas náuticas', description: 'Entiende el formato de teselas y sus límites para navegación sin conexión.', sections: [
    ['Un archivo de teselas', 'MBTiles almacena teselas de mapas en una base de datos SQLite. Puede contener datos ráster o vectoriales según cómo se haya creado; el formato por sí solo no garantiza contenido náutico actualizado ni autorizado.'],
    ['Importar y comprobar cobertura', 'Open Marine Charts puede importar MBTiles y servir teselas en la red local. Antes de una salida, comprueba la zona, niveles de detalle, simbología y fecha de los datos en el dispositivo que utilizarás.'],
    ['Licencias y respaldo', 'Utiliza fuentes y licencias que permitan el uso previsto. Conserva los medios de navegación y cartas exigidos o apropiados para tu embarcación y zona; un archivo descargado no sustituye estas comprobaciones.']
  ] },
  { slug: 'cartas-s57-s63-diferencias', title: 'Cartas S-57 y S-63: diferencias y compatibilidad con Open Marine', description: 'Diferencia datos ENC sin cifrar y cartas comerciales protegidas antes de importar.', sections: [
    ['Formato y protección', 'S-57 es un estándar de intercambio de datos hidrográficos; S-63 establece un esquema de protección para datos ENC. La disponibilidad de un archivo no implica que cualquier aplicación pueda utilizarlo ni que su licencia lo permita.'],
    ['Qué admite Open Marine', 'El motor de cartas de Open Marine contempla la importación y conversión de S-57 sin cifrar. No implementa descifrado de S-63 ni de cartas comerciales protegidas.'],
    ['Antes de salir', 'Comprueba origen, cobertura, actualizaciones y condiciones de uso. El software disponible no convierte una fuente no autorizada o desactualizada en una carta apta para navegación.']
  ] },
  { slug: 'actualizar-cartas-nauticas-offline', title: 'Cómo organizar actualizaciones de cartas náuticas sin conexión', description: 'Un proceso para revisar fuentes, cobertura y copias locales antes de una travesía.', sections: [
    ['Prepara una lista de cobertura', 'Define la derrota prevista y los posibles puertos alternativos. Identifica las cartas necesarias y comprueba su procedencia, licencia y fecha con el proveedor correspondiente.'],
    ['Importa y revisa en tierra', 'Descarga e importa las actualizaciones mientras dispongas de conexión y tiempo para verificarlas. Abre las zonas y escalas relevantes en el equipo de a bordo y conserva una copia de los datos conforme a su licencia.'],
    ['Anota la revisión', 'Registra qué fuentes y fechas utilizas y establece una rutina de comprobación antes de cada salida. Mantén medios alternativos y consulta los avisos náuticos aplicables.']
  ] },
  { slug: 'alarma-ais-cpa-tcpa', title: 'CPA y TCPA en AIS: cómo interpretar una alarma de proximidad', description: 'Qué significan las estimaciones de aproximación y por qué necesitan supervisión.', sections: [
    ['Dos estimaciones', 'CPA es la distancia estimada en el punto de máxima aproximación y TCPA el tiempo estimado hasta ese punto. Se calculan a partir de los datos disponibles y de una extrapolación del movimiento.'],
    ['Por qué pueden cambiar', 'Una maniobra, datos retrasados, errores de posición o un blanco que deja de emitir pueden alterar la estimación. Una alarma es una ayuda para llamar la atención, no una garantía de detección ni una orden de maniobra.'],
    ['Configura y contrasta', 'Ajusta los umbrales según la situación y consulta el manual del sistema. Mantén una vigilancia apropiada, contrasta con otros medios y aplica las reglas de prevención de abordajes pertinentes.']
  ] },
  { slug: 'ais-sdr-receptor-barco', title: 'Receptor AIS con SDR: qué necesitas para ver barcos cercanos', description: 'Componentes y limitaciones de una solución de recepción AIS mediante radio definida por software.', sections: [
    ['Componentes básicos', 'Una solución de recepción puede combinar una antena apropiada, un receptor SDR, software de decodificación y una aplicación para mostrar datos. La compatibilidad y configuración dependen de los componentes elegidos.'],
    ['Recepción y calidad de señal', 'La ubicación de la antena, el cable, las interferencias y el alcance afectan a los mensajes recibidos. Comprueba la instalación en distintos escenarios y no extrapoles cobertura a partir de una sola prueba.'],
    ['Solo recepción', 'Un SDR configurado como receptor no hace que tu barco transmita AIS. No todos los barcos llevan AIS y los datos pueden estar incompletos; utiliza siempre los demás medios de vigilancia disponibles.']
  ] },
  { slug: 'integrar-sonda-signalk', title: 'Cómo integrar una sonda de profundidad con Signal K', description: 'Revisa conexiones, unidades y referencias al compartir la profundidad del barco.', sections: [
    ['Inventario de la sonda', 'Identifica el modelo y el dato que entrega a la red. El transductor, la pantalla y la pasarela deben ser compatibles; un adaptador adecuado depende del protocolo y del tipo de salida disponibles.'],
    ['Referencia y unidades', 'Comprueba si la profundidad mostrada se refiere al transductor, a la superficie o a otra referencia configurada. Revisa unidades y desplazamientos en los manuales y compáralos entre pantallas.'],
    ['Calidad de la lectura', 'Verifica actualización y coherencia en condiciones conocidas. La sonda mide bajo el transductor y no garantiza la profundidad por delante del barco; cartas, vigilancia y margen de seguridad siguen siendo necesarios.']
  ] },
  { slug: 'velocidad-sobre-agua-sobre-fondo', title: 'Velocidad sobre el agua y sobre el fondo: diferencias en un barco', description: 'Aprende a interpretar corredera y GPS cuando hay corriente o errores de sensor.', sections: [
    ['Qué mide cada fuente', 'La velocidad sobre el agua procede normalmente de una corredera o sensor equivalente. La velocidad sobre el fondo procede habitualmente del GPS y describe el desplazamiento respecto a tierra.'],
    ['Corriente y calibración', 'Ambos valores pueden diferir por corriente, por la dirección de desplazamiento y por errores de los instrumentos. Una corredera sucia o mal calibrada puede dar lecturas poco fiables.'],
    ['Utiliza el dato correcto', 'Identifica qué fuente usa cada cálculo y comprueba unidades. Para interpretar viento real, rendimiento o derrota, es importante entender qué velocidad utiliza la aplicación.']
  ] },
  { slug: 'red-nmea-2000-componentes', title: 'Componentes de una red NMEA 2000 para barco', description: 'Conceptos básicos de backbone, derivaciones, alimentación y terminación.', sections: [
    ['La estructura de la red', 'Una red NMEA 2000 conecta dispositivos mediante un cable principal o backbone y derivaciones. Cada instalación debe seguir los límites y requisitos de los equipos y de los componentes de red utilizados.'],
    ['Alimentación y terminación', 'La alimentación, protección y terminadores son elementos de diseño de la red. No conectes ni modifiques el cableado por suposiciones: comprueba los manuales y las especificaciones pertinentes.'],
    ['Planifica la ampliación', 'Antes de añadir una pasarela o sensor, identifica conectores, consumo, espacio y mensajes compatibles. Un profesional puede comprobar el conjunto y evitar incompatibilidades o una alimentación incorrecta.']
  ] },
  { slug: 'nmea-0183-a-signalk', title: 'Cómo llevar datos NMEA 0183 a Signal K', description: 'Qué revisar al integrar instrumentos antiguos con una red de datos moderna.', sections: [
    ['Identifica emisor y receptor', 'Consulta el manual de cada instrumento para determinar su salida, velocidad y conexiones. NMEA 0183 no debe conectarse directamente a un puerto cualquiera: puede requerir una interfaz apropiada y configuración específica.'],
    ['Selecciona una pasarela compatible', 'El adaptador debe admitir la señal y el equipo receptor. Configura la fuente en Signal K según la documentación de la interfaz y comprueba qué frases o datos se están recibiendo.'],
    ['Valida los datos', 'Compara lecturas, unidades y frecuencia de actualización con el equipo original. Documenta la fuente y resuelve duplicados antes de usar los datos en otras aplicaciones.']
  ] },
  { slug: 'piloto-automatico-perdida-senal', title: 'Qué considerar si un piloto automático pierde la señal', description: 'Preguntas sobre supervisión, parada y recuperación del gobierno manual.', sections: [
    ['Identifica las dependencias', 'Un piloto puede depender de alimentación, sensores, comunicaciones y actuador. Documenta cada conexión y consulta cómo responde el equipo cuando falla una de ellas.'],
    ['Parada y recuperación', 'La instalación debe permitir recuperar el gobierno manual y disponer de las protecciones y medios de parada adecuados. Los detalles dependen de la embarcación y deben revisarse con personal cualificado.'],
    ['Ensayo controlado', 'Planifica las pruebas de fallo en condiciones seguras y con supervisión. El piloto no sustituye la guardia; no provoques fallos durante una navegación en la que no puedas recuperar el control.']
  ] },
  { slug: 'planificar-traslado-velero', title: 'Cómo planificar el traslado de un velero por mar', description: 'Información que conviene reunir al solicitar un presupuesto de traslado.', sections: [
    ['Describe el barco y la ruta', 'Indica puertos de origen y destino, eslora, calado, tipo de embarcación y fechas orientativas. Comparte también el estado del barco, la documentación disponible y cualquier restricción de acceso.'],
    ['Revisión previa', 'La planificación debe contemplar tripulación, equipo de seguridad, comunicaciones, combustible y estado mecánico. Las responsabilidades, seguros y condiciones del servicio deben acordarse antes de la salida.'],
    ['Ventana meteorológica', 'Las fechas reales dependen de la meteorología y de la seguridad de la tripulación. Prevé alternativas y consulta cómo se gestionan retrasos y escalas antes de aceptar un presupuesto.']
  ] },
  { slug: 'preparar-barco-traslado-maritimo', title: 'Qué revisar antes de un traslado marítimo de embarcación', description: 'Lista inicial de documentación, equipo y estado técnico para preparar un traslado.', sections: [
    ['Documentación y acuerdos', 'Reúne la documentación del barco, seguros y datos de contacto. Aclara con el responsable del traslado el alcance del servicio, las personas a bordo y la entrega en destino.'],
    ['Estado técnico y seguridad', 'Comunica el estado del motor, baterías, gobierno, bombas, navegación y equipo de seguridad. Una revisión técnica debe adaptarse al barco y a la travesía; esta lista no sustituye una inspección.'],
    ['Entrega e incidencias', 'Documenta equipamiento y daños existentes, llaves, accesos y particularidades de operación. Acuerda cómo se comunicarán las incidencias y posibles cambios de ruta.']
  ] },
  { slug: 'mantenimiento-electronica-nautica', title: 'Mantenimiento de electrónica náutica: revisión antes de temporada', description: 'Una rutina para comprobar conexiones, software, alimentación y datos a bordo.', sections: [
    ['Revisa el estado físico', 'Inspecciona soportes, cables y conectores en busca de daños, humedad o corrosión, siguiendo las precauciones de cada fabricante. Las intervenciones eléctricas deben hacerlas personas competentes.'],
    ['Comprueba las fuentes de datos', 'Enciende el sistema y verifica posición, rumbo, profundidad, viento y AIS según los equipos instalados. Comprueba que se actualizan y que las pantallas utilizan la fuente prevista.'],
    ['Actualizaciones y respaldo', 'Revisa software y cartas antes de la temporada, conserva copias de configuración y prueba el arranque después de cualquier cambio. Documenta las incidencias y no dejes la primera comprobación para la salida.']
  ] },
];
