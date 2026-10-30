// Translations are keyed by the Spanish slug so language links stay stable.
export const ENGLISH_GUIDES: Record<string, { title: string; description: string; sections: string[][] }> = {
  'que-es-signal-k': { title: 'What is Signal K and how does it connect your boat data?', description: 'An introduction to Signal K, instruments and onboard data exchange.', sections: [
    ['A common language for instruments', 'Signal K is an open format for sharing marine data on a network. A gateway can receive data from compatible instruments and make it available to different applications, avoiding a separate connection for every display.'],
    ['What to check before installation', 'Identify your equipment interfaces, power requirements and necessary adapters. Compatibility depends on each instrument and its configuration; consult the manuals and test the data before relying on it underway.'],
    ['Signal K with Open Marine', 'Open Marine uses Signal K as a data bus to show information on devices connected to the boat network. Installation and integration can be adapted to existing equipment.'],
  ] },
  'cartas-nauticas-sin-internet': { title: 'Offline nautical charts: preparing for navigation without internet', description: 'How to manage local charts and make sure they are available on board.', sections: [
    ['Prepare your charts before departure', 'Mobile coverage is not guaranteed at sea. Keeping authorised charts in local storage makes them available without a connection, provided your equipment and onboard network are working.'],
    ['Formats and licences', 'Check the coverage, currency and licence of each source. Open Marine Charts supports MBTiles and import workflows for raster files and unencrypted S-57; it does not decrypt protected commercial charts.'],
    ['Have a backup plan', 'Check your charts and power supply before departure and carry appropriate alternative navigation resources. An application does not replace a proper lookout or navigation procedures.'],
  ] },
  'ais-barcos-receptor': { title: 'Boat AIS: what a receiver shows and its limitations', description: 'Understand AIS data, reception and its limitations when navigating.', sections: [
    ['What AIS provides', 'AIS can receive information transmitted by equipped vessels and stations, including identity, position, course and speed. A display can plot these targets alongside your own position.'],
    ['Receiving is not transmitting', 'An AIS receiver only displays messages it receives; it does not make your boat visible to others. The antenna, installation, range and interference all affect reception.'],
    ['Not every boat appears', 'Not every vessel transmits AIS, and data can be incorrect or outdated. Maintain a visual lookout and use all other available means.'],
  ] },
  'nmea-0183-nmea-2000': { title: 'NMEA 0183 vs NMEA 2000: connecting marine instruments', description: 'What to check when integrating instruments of different generations.', sections: [
    ['Two ways to communicate', 'NMEA 0183 and NMEA 2000 are different interfaces used in marine electronics. Their physical connections and requirements are not directly interchangeable, although both can carry navigation data.'],
    ['Plan the integration', 'Record each device model, its available ports and the data it transmits. Choose a compatible gateway or adapter and check power, wiring and configuration against the manufacturer documentation.'],
    ['Share the data', 'Once integrated into a compatible data server, several devices on the network can access the information. Available data depends on the equipment and adapters installed.'],
  ] },
  'anemometro-veleta-barco': { title: 'Boat anemometer and wind vane: what does each sensor measure?', description: 'Understand wind speed and direction and plan a compatible installation.', sections: [
    ['Speed and direction', 'An anemometer measures wind speed and a wind vane indicates its direction. Depending on the system, one combined unit may provide both measurements to the instruments.'],
    ['Apparent and true wind', 'Apparent wind is the wind experienced by a moving boat. Estimating true wind requires additional consistent speed and heading data; the result depends on their quality and calibration.'],
    ['Before choosing a sensor', 'Check mounting, wiring, power, protocol and compatibility with your existing display or gateway. Masthead installation requires safe access and correct calibration.'],
  ] },
  'piloto-automatico-vela': { title: 'Sailboat autopilot: components and checks', description: 'Understand the controller, sensors and actuator in an autopilot system.', sections: [
    ['System components', 'An autopilot combines heading sensors, a controller and an actuator that moves the steering. Selection depends on the vessel, its steering system and intended conditions.'],
    ['Installation and safety', 'Power, electrical protection, mounting and emergency stopping must be considered for each boat. Loss of data or power must not prevent the crew from regaining manual control.'],
    ['Testing and supervision', 'Configure and test the system in controlled conditions with qualified personnel. An autopilot does not replace a watch, lookout or the skipper’s responsibilities.'],
  ] },
  'raspberry-pi-navegacion': { title: 'Raspberry Pi on a boat: a compact navigation computer', description: 'Considerations for installing a small computer on an onboard network.', sections: [
    ['An onboard data hub', 'A compact computer can run services that collect instrument data and show it on screens connected to the boat network. Open Marine is designed to run on a Raspberry Pi or development computer.'],
    ['Power and storage', 'Plan electrical protection, ventilation, moisture protection and suitable storage. Chart data can take considerable space, so plan backups and updates.'],
    ['Availability and backup', 'Check startup and local access before departure. Keep appropriate independent navigation resources: any computer, network or power supply can fail.'],
  ] },
  'red-wifi-barco': { title: 'How to share boat instrument data over local Wi-Fi', description: 'The basics of viewing onboard instruments from tablets and laptops.', sections: [
    ['A local network for screens', 'Onboard Wi-Fi allows tablets and laptops to access local services without necessarily depending on internet access. The server and devices must be connected to the configured network.'],
    ['Security and coverage', 'Protect access with suitable credentials, keep equipment updated and limit exposed services. Check coverage where devices will be used and ensure the power supply is reliable.'],
    ['Screens and availability', 'The Open Marine interface is accessed through a browser. Data availability depends on connected sensors and on the server and network remaining operational.'],
  ] },
  'gps-ais-instrumentos-barco': { title: 'Combine GPS, AIS and boat sensors on one screen', description: 'Plan navigation data integration without replacing every instrument.', sections: [
    ['Inventory your equipment', 'Identify GPS, AIS, depth and wind sensors, along with their outputs and versions. Devices do not all provide the same data or use the same interface.'],
    ['Gateway and data network', 'A compatible gateway can convert or distribute data for an application to display together. In Open Marine, Signal K provides the data bus between sources and the interface.'],
    ['Verify on board', 'Compare readings with the original instruments, check units and duplicate sources, and document the installation. Unreliable data must not be the sole basis for a decision.'],
  ] },
  'electronica-nautica-abierta': { title: 'Open marine electronics: benefits and decisions before you start', description: 'What open technology means and how to plan an expandable installation.', sections: [
    ['What open means', 'Open formats and tools make parts of a system easier to inspect, integrate and adapt. They do not make every device automatically compatible or remove third-party licences.'],
    ['Plan in modules', 'Prioritise your needs: displays, sensor integration, charts or control. A modular architecture lets you tackle each part separately and assess which existing equipment can be retained.'],
    ['Support and responsibility', 'Documentation, maintenance, testing and backups remain necessary. Request an assessment of the installation and each component’s limitations before relying on it at sea.'],
  ] },
  'elegir-plotter-nautico-tablet': { title: 'Chartplotter or tablet: choosing a navigation display', description: 'Compare visibility, power and chart support before choosing an onboard screen.', sections: [
    ['Visibility and protection', 'A navigation screen must be readable in sunlight and usable in wet, moving conditions. Check brightness, mounting and weather protection; a regular tablet may need a case and sheltered location.'],
    ['Charts and connectivity', 'Check chart formats, licences and offline operation. A tablet can access a local server, but also depends on power and the network providing its data.'],
    ['Choosing with a backup', 'Consider size, battery life, updates and installation cost. Test visibility from the helm and carry appropriate alternative navigation resources.'],
  ] },
  'conectar-gps-signalk': { title: 'How to connect a GPS to Signal K and verify its position', description: 'Identify a GPS source and check its data on your boat network.', sections: [
    ['Identify the output', 'Find out whether the GPS uses USB, NMEA 0183, NMEA 2000 or another interface. The adapter must be compatible with both the GPS and the computer running Signal K.'],
    ['Check position and time', 'After configuring the source, verify that position and time update. Compare coordinates with the original device and check that stale data is recognised when the source is disconnected.'],
    ['Avoid ambiguous sources', 'If several GPS devices are present, document which source each screen uses. A visible value is not necessarily current; check updates and keep an alternative positioning method.'],
  ] },
  'alimentacion-raspberry-pi-barco': { title: 'Powering a Raspberry Pi from a boat’s 12 V system', description: 'Electrical protection and stable power for an onboard navigation computer.', sections: [
    ['More than a USB socket', 'A 12 V boat supply can experience fluctuations and transients. Choose a suitable converter and protection according to the equipment manufacturers’ instructions.'],
    ['Protection and location', 'Review fuses, cable sizing, connections, ventilation and moisture exposure. The computer supply must not compromise safety circuits or manual steering.'],
    ['Test before departure', 'Check startup, stability with peripherals connected and recovery after power loss. A qualified installer should assess the specific system and its protections.'],
  ] },
  'instalar-antena-ais-velero': { title: 'Where to install an AIS antenna on a sailboat', description: 'Consider location, cable and compatibility for AIS reception.', sections: [
    ['Location and obstacles', 'Height and obstacles affect VHF reception. The best location depends on the mast, other antennas, interference and maintenance access; there is no universal position.'],
    ['Cable and connections', 'Cable length, connectors and cable type introduce loss. Choose compatible components, protect connections from water and avoid damaging bends or runs.'],
    ['Sharing an antenna', 'A receiver does not transmit. If sharing an antenna with a radio or transponder, use only a splitter appropriate for the equipment and follow its instructions. Not every target will be visible.'],
  ] },
  'sensor-viento-nmea-2000': { title: 'NMEA 2000 wind sensor: what to check before buying', description: 'Check protocol, installation and calibration of a wind vane or anemometer.', sections: [
    ['Actual compatibility', 'Confirm that the sensor, display and gateway support the required messages. Sharing a network name does not guarantee every function; check power, connectors and configuration.'],
    ['Mast and wiring', 'Plan safe mast access, mounting and cable protection. Sensor placement and obstacles can affect wind readings.'],
    ['Calibration and other data', 'Set the orientation according to the manual and check readings in different conditions. True-wind calculations need other consistent and reliable measurements.'],
  ] },
  'diagnosticar-sensor-viento': { title: 'Boat wind sensor reading incorrectly: troubleshooting', description: 'Separate mounting, power and data problems before replacing a sensor.', sections: [
    ['Describe the symptoms', 'Record whether direction, speed or both fail, and whether the problem is continuous. Compare screens to see if the issue affects the network or only one application.'],
    ['Check connections and settings', 'With equipment disconnected where appropriate, inspect wiring and corrosion. Check power, source selection, units and orientation against the manufacturer manual.'],
    ['Verify before replacing', 'Check whether fresh data reaches the gateway and whether maintenance or calibration is needed. Mast work has risks; use qualified personnel where appropriate.'],
  ] },
  'calibrar-veleta-velero': { title: 'Planning sailboat wind vane calibration', description: 'Checks needed before adjusting wind direction readings.', sections: [
    ['Identify the error', 'An apparent offset may come from alignment, configuration, wiring or source selection. Compare the display with the sensor and record the conditions before changing settings.'],
    ['Follow the equipment procedure', 'Calibration methods vary by model. Record the original settings and follow the manufacturer manual rather than masking another fault with an arbitrary correction.'],
    ['Check several conditions', 'Verify coherent readings on both sides and confirm that data reaches the intended screens. True-wind calibration also depends on other sensors and their quality.'],
  ] },
  'cartas-mbtiles-navegacion': { title: 'What is MBTiles and how can it be used for nautical charts?', description: 'Understand tiled chart files and their limitations offline.', sections: [
    ['A tiled database', 'MBTiles stores map tiles in a SQLite database. It may contain raster or vector data; the format alone does not guarantee authorised, current nautical information.'],
    ['Import and check coverage', 'Open Marine Charts can import MBTiles and serve tiles on the local network. Before departure, check the area, detail levels, symbology and data age on the device you will use.'],
    ['Licences and backup', 'Use sources licensed for your intended use. Carry the navigation resources and charts required or appropriate for your vessel and area.'],
  ] },
  'cartas-s57-s63-diferencias': { title: 'S-57 vs S-63 charts: differences and Open Marine support', description: 'Understand unencrypted ENC data and protected commercial charts.', sections: [
    ['Format and protection', 'S-57 is a hydrographic data exchange standard; S-63 provides a protection scheme for ENC data. Having a file does not mean every application can use it or that its licence permits use.'],
    ['Open Marine support', 'Open Marine Charts supports importing and converting unencrypted S-57. It does not decrypt S-63 or protected commercial charts.'],
    ['Before departure', 'Check the source, coverage, updates and licence. Software does not turn an unauthorised or outdated source into a suitable navigation chart.'],
  ] },
  'actualizar-cartas-nauticas-offline': { title: 'How to organise offline nautical chart updates', description: 'Review chart sources, coverage and local copies before a voyage.', sections: [
    ['Plan coverage', 'Identify the intended route and possible alternative ports. Check the origin, licence and currency of the charts you need with the relevant provider.'],
    ['Import and review ashore', 'Download and import updates when you have connectivity and time to check them. Open the relevant areas and scales on the onboard device and keep a licensed backup.'],
    ['Record your review', 'Document the sources and dates used and establish a pre-departure routine. Keep alternative navigation resources and consult applicable notices to mariners.'],
  ] },
  'alarma-ais-cpa-tcpa': { title: 'AIS CPA and TCPA: interpreting a closest-approach alarm', description: 'Understand approach estimates and why they require supervision.', sections: [
    ['Two estimates', 'CPA is the estimated distance at closest approach and TCPA is the estimated time until that point. Both use available data and an extrapolation of motion.'],
    ['Why estimates change', 'A manoeuvre, delayed data, position errors or a target that stops transmitting can change the estimate. An alarm attracts attention; it is not guaranteed detection or an instruction to manoeuvre.'],
    ['Configure and cross-check', 'Set thresholds for the situation and consult the system manual. Maintain an appropriate lookout, use other means and follow applicable collision regulations.'],
  ] },
  'ais-sdr-receptor-barco': { title: 'AIS receiver with SDR: what you need to see nearby vessels', description: 'Components and limitations of software-defined radio AIS reception.', sections: [
    ['Basic components', 'A receiving setup may combine an appropriate antenna, an SDR receiver, decoding software and an application to display the data. Compatibility depends on the components and configuration.'],
    ['Reception quality', 'Antenna location, cable, interference and range affect received messages. Test the installation in different situations and do not infer coverage from a single test.'],
    ['Receive only', 'An SDR configured as a receiver does not transmit your boat’s AIS position. Not all boats carry AIS and data may be incomplete; maintain a proper lookout.'],
  ] },
  'integrar-sonda-signalk': { title: 'How to integrate a depth sounder with Signal K', description: 'Check interfaces, units and depth references when sharing sounder data.', sections: [
    ['Identify your sounder', 'Identify the model and the data it sends to the network. The transducer, display and gateway must be compatible; the adapter depends on the output and protocol.'],
    ['Reference and units', 'Check whether depth is measured from the transducer, surface or another configured reference. Review units and offsets in the manuals and compare displays.'],
    ['Reading quality', 'Check updates and consistency in known conditions. A sounder measures below the transducer and does not guarantee depth ahead; charts, lookout and safety margins remain necessary.'],
  ] },
  'velocidad-sobre-agua-sobre-fondo': { title: 'Speed through water vs speed over ground on a boat', description: 'Interpret log and GPS speed when there is current or sensor error.', sections: [
    ['What each source measures', 'Speed through water normally comes from a log or equivalent sensor. Speed over ground usually comes from GPS and describes movement relative to land.'],
    ['Current and calibration', 'The values can differ because of current, direction of movement and instrument errors. A fouled or poorly calibrated log can give unreliable readings.'],
    ['Use the right input', 'Identify the source used by each calculation and check units. True wind, performance and track calculations depend on which speed an application uses.'],
  ] },
  'red-nmea-2000-componentes': { title: 'Components of an NMEA 2000 boat network', description: 'Understand the backbone, drop cables, power and termination.', sections: [
    ['Network structure', 'An NMEA 2000 network connects devices using a backbone and drop cables. Follow the limits and requirements of the equipment and network components used.'],
    ['Power and termination', 'Power, protection and terminators are part of the network design. Do not modify wiring by assumption: consult the manuals and relevant specifications.'],
    ['Plan an expansion', 'Before adding a gateway or sensor, identify connectors, power consumption, space and supported messages. A professional can check the whole installation.'],
  ] },
  'nmea-0183-a-signalk': { title: 'How to bring NMEA 0183 data into Signal K', description: 'Integrate older marine instruments with a modern data network.', sections: [
    ['Identify transmitter and receiver', 'Consult each instrument manual for output, speed and connections. NMEA 0183 must not be connected to an arbitrary port: it may require an appropriate interface and configuration.'],
    ['Choose a compatible gateway', 'The adapter must support the signal and receiving equipment. Configure the Signal K source according to its documentation and check which sentences or data arrive.'],
    ['Validate the data', 'Compare readings, units and update frequency with the original equipment. Document the source and resolve duplicates before using the data elsewhere.'],
  ] },
  'piloto-automatico-perdida-senal': { title: 'What to consider if an autopilot loses its signal', description: 'Questions about monitoring, stopping and returning to manual steering.', sections: [
    ['Identify dependencies', 'An autopilot can depend on power, sensors, communications and an actuator. Document the connections and consult how equipment responds when any of them fails.'],
    ['Stopping and recovery', 'The installation must allow manual steering to be regained and provide suitable protections and stopping means. Details depend on the vessel and need qualified assessment.'],
    ['Controlled testing', 'Plan failure tests in safe conditions with supervision. An autopilot does not replace a watch; do not induce failures when control cannot be safely recovered.'],
  ] },
  'planificar-traslado-velero': { title: 'How to plan a sailboat delivery by sea', description: 'Information to gather when requesting a boat delivery quote.', sections: [
    ['Describe the vessel and route', 'Provide departure and destination ports, length, draft, vessel type and approximate dates. Share the boat’s condition, available documents and access restrictions.'],
    ['Prepare before departure', 'Planning should cover crew, safety equipment, communications, fuel and mechanical condition. Agree responsibilities, insurance and service terms before departure.'],
    ['Weather window', 'Actual dates depend on weather and crew safety. Allow alternatives and ask how delays and intermediate stops are handled before accepting a quote.'],
  ] },
  'preparar-barco-traslado-maritimo': { title: 'Preparing a boat for delivery by sea', description: 'An initial checklist for documents, equipment and technical condition.', sections: [
    ['Documents and agreements', 'Gather vessel documents, insurance and contact information. Agree the scope of service, people on board and delivery arrangements with the provider.'],
    ['Technical condition and safety', 'Disclose the condition of engine, batteries, steering, pumps, navigation and safety equipment. An inspection must be tailored to the boat and voyage.'],
    ['Handover and incidents', 'Document equipment and existing damage, keys, access and operating peculiarities. Agree how incidents and route changes will be communicated.'],
  ] },
  'mantenimiento-electronica-nautica': { title: 'Marine electronics maintenance: a pre-season check', description: 'Check connections, software, power and onboard data before the season.', sections: [
    ['Inspect physical condition', 'Check mounts, cables and connectors for damage, moisture or corrosion, following manufacturer precautions. Electrical work should be performed by competent people.'],
    ['Check data sources', 'Power the system and verify position, heading, depth, wind and AIS where installed. Confirm that readings update and screens use the intended sources.'],
    ['Updates and backups', 'Review software and charts before the season, keep configuration backups and test startup after changes. Document faults and do not leave the first check until departure.'],
  ] },
};
