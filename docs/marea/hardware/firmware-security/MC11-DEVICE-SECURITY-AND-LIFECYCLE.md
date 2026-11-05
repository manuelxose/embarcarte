# MC-11 — Device security and lifecycle (D27)

| Field | Value |
|---|---|
| Document | D27 `MC11-DEVICE-SECURITY-AND-LIFECYCLE.md` |
| Status | `PROPOSED_NOT_APPROVED` — `INTERNAL_ENGINEERING_RESEARCH` |
| Milestone | MC-11 (deliverable 27) |
| Branch / base | `feature/marea-mc11-hardware-sourcing-conformity` / MC-10R HEAD `6713178` |
| Date | 2026-11-02 (Europe/Madrid) |
| Owner | `security-engineer` (Agent F) |
| Companion | D28 `MC11-FIRMWARE-IP-AND-SUPPLY-CHAIN.md` |
| Machine records | `data/evidence/firmware-security.json` (EVD-MC11-501…515); cross-references `data/hardware-families.json`, `data/component-register.json`, `data/conformity-applicability.json` (owned by the conformity workstream — referenced, not edited) |

## 0. Status block (read before any other sentence)

**No device exists. No firmware has been written for MAREA. No certification, type approval, CE marking,
security evaluation or penetration test exists. No supplier, laboratory, notified body or authority was
contacted. No purchase was made. No bench, vessel or attack test was executed. `SOURCE_IP_CLEARANCE =
NOT_CLEARED`, `OPEN_MARINE_WRITE = PROHIBITED`, `PILOT_SAFETY_GATE = BLOCKED`, `REMOTE_HELM_CONTROL =
false`, `AIS_TRANSMISSION_OFFERED = false`, `NMEA2000_CERTIFIED = false`, `CE_MARKING_CLAIM = PROHIBITED`,
`ENVIRONMENTAL_RATING_CLAIM = PROHIBITED`, `CONFORMITY_CERTIFICATION = NOT_ESTABLISHED`.**

This document is a **candidate device-security architecture** and a **candidate requirement set** for a
future, authorised programme. It freezes nothing. A requirement marked `MUST` below means *"at MUST
priority for the future design if the programme proceeds"* — it is **not** a compliance statement, not a
product claim, and not evidence that anything is implemented. Every requirement carries an explicit
evidence state. There is no implementation of any requirement in this milestone.

**The Cyber Resilience Act (EU) 2024/2847 is treated strictly as a conformity input.** It is mapped in §12
so a future programme can see the obligation surface, the classification uncertainty and the deadline
pressure. **`CRA_COMPLIANCE = NOT_ESTABLISHED`** — no CRA assessment, technical file, declaration of
conformity, CE marking, vulnerability-handling organisation or reporting capability exists. Nothing in this
document may be quoted as a CRA, RED cybersecurity, NIS2, ISO/SAE 21434, IEC 62443 or any other safety or
security compliance claim. Frameworks named anywhere below are **engineering references that were not
applied or verified** unless a fetched source is explicitly cited.

**Two design constraints that bound every security decision.** First, **no control path exists or is
proposed**: no actuator, helm, steering, motor, autopilot or remote-command function is added by any
security requirement in this document, and no requirement may create one. Second, **no failure alerting
may be described as guaranteed**: WATCH and any future notification path report states honestly
(accepted / delivered / unknown / acknowledged) and never promise delivery, human acknowledgement or
emergency response.

---

## 1. Scope, method and vocabulary

### 1.1 Families in scope

| Family | MC-11 provisional architecture | In scope of this document | Control path |
|---|---|---|---|
| HUB | `ARCH-HUB-D` hybrid (application processor + supervisory MCU) | Yes — full lifecycle | **None** (read-only toward vessel networks) |
| WATCH | `ARCH-WATCH-D` hybrid MCU + app processor with cellular | Yes — full lifecycle | **None** (uplink is outbound-only telemetry) |
| SENSE | `ARCH-SENSE-C` custom MCU platform | Yes — identity, boot, update, diagnostics | **None** (measurement only) |
| DISPLAY | `ARCH-DISPLAY-B` provisional; D9 engineering preference `ARCH-DISPLAY-D` | Yes — boot, update, service access, read-only data | **None** (display holds no authority) |
| AIS integration | `ARCH-AIS-E` recommended by D9 (third-party receiver integration); `ARCH-AIS-B` provisional in `hardware-families.json`; P1 receive-only receiver only if a funded RF programme exists | Yes — device trust boundary, receiver identity, update, data handling | **Receive-only; transmission prohibited** |
| PILOT | `ARCH-PILOT-E` (documentary/integration posture only) | **Out of scope as hardware.** No security requirement here may be used to reopen the safety gate | **Prohibited** |
| NAV / WEATHER / FLEET | software / data service (`ARCH-NAV-E`, `ARCH-WEATHER-E`, `ARCH-FLEET-E`) | Cross-referenced only (client credentials, session security, service-side tenancy owned elsewhere) | **None** |

### 1.2 Requirement priority and evidence states

| Term | Meaning in this document |
|---|---|
| `MUST` | Candidate requirement at MUST priority for the future design. Not implemented, not tested, not compliance |
| `SHOULD` | Candidate requirement at SHOULD priority; may be deferred only by a recorded, risk-accepted decision |
| `NO_IMPLEMENTATION` | Nothing exists — no device, firmware, identity system, service or test |
| `EXTERNAL_REFERENCE_ONLY` | A candidate mechanism is documented by a public source I fetched; no MAREA work exists |
| `COMPONENT_REGISTERED_ONLY` | A candidate part is in the sourcing register, not selected and not designed in |
| `NOT_EXECUTED` | A verification is planned but no bench, lab or attack test was authorised or run |

Every requirement row in §4–§11 uses these states. The uniform state of the programme is
`NO_IMPLEMENTATION`: an absence, not a pass.

### 1.3 Sources fetched for this document (retrieval date 2026-11-02)

Only these were actually retrieved; everything else is engineering analysis:

- CRA text, EUR-Lex `CELEX:32024R2847` (`EVD-MC11-501/502/503`), with the honest limitation that the
  retrieval truncated before Article 71 and the Annexes.
- ENISA vulnerability-services page (`EVD-MC11-504`) for the single reporting platform and the Article 14
  reporting date.
- NXP EdgeLock SE050 page (`EVD-MC11-506`), ST STSAFE-A120 page (`EVD-MC11-507`), Microchip ATECC608B page
  (`EVD-MC11-508`) for candidate secure-element families.
- Toradex secure-boot fuse-programming documentation (`EVD-MC11-509`), MCUboot documentation
  (`EVD-MC11-510`), RAUC documentation (`EVD-MC11-511`), U-Boot Verdin i.MX8M Plus board documentation
  (`EVD-MC11-512`).
- Three attempted pages were `INACCESSIBLE` (HTTP 404) and assert nothing: Infineon OPTIGA Trust M
  (`EVD-MC11-513`), Raspberry Pi security documentation (`EVD-MC11-514`), ENISA CRA topic page
  (`EVD-MC11-515`).

Manufacturer security facts already established by the architecture workstream are cross-referenced by
their evidence IDs (`EVD-MC11-007` RP2350 signed boot/OTP/SHA-256/TRNG; `EVD-MC11-010/011` Toradex
Verdin i.MX8M Plus; `EVD-MC11-012` STM32H743; `EVD-MC11-014` ATECC608B NRND) — they are not re-asserted as
new retrievals here.

### 1.4 What this document explicitly does not do

- It does not select a processor, secure element, RTOS, Linux distribution, bootloader or update server.
- It does not produce a design, schematic, key ceremony, manufacturing flow, code or test.
- It does not classify any MAREA product under the CRA (default / important class I or II / critical): the
  Annex III/IV lists and the implementing act were **not retrieved**, so classification is `UNKNOWN`.
- It does not assert any cryptographic strength figure for a MAREA design. Algorithm choices below are
  **candidate families**, subject to a future cryptographic review and, where relevant, to the secure
  element's own certified capabilities.
- It does not weaken any invariant in `MC11-BASELINE-AND-GOVERNANCE.md` §4.

---

## 2. Programme constraints that shape the security design

| # | Constraint | Security consequence |
|---|---|---|
| C-01 | **Local-first, offline-capable** product definition (HUB/WATCH/SENSE/DISPLAY) | Security controls must not depend on the cloud being reachable; boot, local data and local indication must survive WAN loss. Cloud compromise must not confer local authority |
| C-02 | **No control path** in any family | The highest-impact threat (uncommanded vessel motion) has no attack surface by design; the security case must *preserve* that absence, not rely on it being unexploitable |
| C-03 | **Alerting is conditional awareness** (WATCH contract §1.2) | Alert-delivery honesty is a security property: state manipulation that turns "unknown" into "delivered" is a defect |
| C-04 | **ATECC608B is NRND** (`CMP-SEC-01/02`, `EVD-MC11-014`) | A security-critical part with an unknown replacement is a supply-chain security risk; the replacement must be lifecycle-verified before design freeze |
| C-05 | **Legacy stack has no trust anchor** — unauthenticated local API, no hardware watchdog, no secure boot, no firmware signing | Nothing from the legacy stack may be presumed security-ready; its security findings are inputs to *avoid*, not a baseline to inherit |
| C-06 | **SOURCE_IP_CLEARANCE = NOT_CLEARED** | No code, firmware, key-handling routine or update script may be copied from OPEN-MARINE; mechanisms must be independently designed or built from permissively licensed third-party components with notices (see D28) |
| C-07 | **WATCH hardware is not included by default in FLEET** (`FLEET_DEFAULT_HARDWARE = false`) | Device identity is a product-owned concern; a FLEET tenant cannot assume device-level controls exist |
| C-08 | **Conformity is not started** (`CONFORMITY_CERTIFICATION = NOT_ESTABLISHED`, `G6 = NOT_STARTED`) | Security requirements are candidate inputs to a future conformity programme, not substitutes for it |
| C-09 | **No supplier contact, no purchase, no device test** | All security evidence is documentary; attack-surface claims are unmeasured |

---

## 3. Threat model summary

A qualitative, documentation-only threat model. It is **not** a certified risk assessment, not a
penetration-test result and not a claim that any threat is mitigated. Method: asset-driven, actor-driven
and entry-point-driven; impact is stated in operational terms (what the owner would experience), never as a
numeric risk score that could be mistaken for a measured probability.

### 3.1 Assets

| ID | Asset | Why it matters | Families |
|---|---|---|---|
| A-01 | **Local vessel data integrity and availability** | The HUB/DISPLAY product value is honest data; fabricated or suppressed values are the core harm | HUB, SENSE, DISPLAY, AIS |
| A-02 | **Device cryptographic identity and private keys** | Identity theft enables impersonation, unauthorised telemetry, counterfeit support claims | All |
| A-03 | **Firmware signing chain and update path** | Attacker-controlled firmware is persistent, remote and invisible | All |
| A-04 | **Owner/crew personal data and vessel position** | Privacy harm; position is safety- and theft-sensitive (FLEET §21, WATCH §17) | WATCH, HUB, FLEET service |
| A-05 | **Local availability of monitoring and indication** | A device that silently stops sensing or alerting is worse than no device because the owner relies on it | WATCH, SENSE, HUB |
| A-06 | **Installation and commissioning integrity** | Wrong binding, stolen device, rogue installer access | All |
| A-07 | **Manufacturing and supply-chain integrity** | Cloned identity, substituted component, tampered board, unattributed binary blob | All |
| A-08 | **Alert-lifecycle state integrity** | Manipulating accepted/delivered/acknowledged states misrepresents what the owner was told | WATCH |
| A-09 | **Service/cloud and tenant boundary** | Cross-tenant exposure, credential theft, provider compromise | WATCH, FLEET, HUB |
| A-10 | **Diagnostic and service-access surface** | A maintenance backdoor is a permanent liability | All |

### 3.2 Actors

| ID | Actor | Capability assumed | Motivation |
|---|---|---|---|
| T-01 | Opportunistic network attacker on marina Wi-Fi / shared LAN | Port scanning, default-credential attempts, known-CVE exploitation, ARP/DNS tricks | Botnet, vandalism, data theft |
| T-02 | Malicious or careless crew member / guest with owner-network access | Valid LAN access, unauthorised configuration change, credential sharing | Curiosity, sabotage, privacy |
| T-03 | Thief / reseller of a stolen device | Physical possession, attempt to re-bind or read data | Resale, data theft |
| T-04 | Cloud/service or notification-provider compromise | Attacker gains service-side data or credentials | Data theft, manipulation |
| T-05 | Malicious or compromised supplier / contract manufacturer / distributor | Can alter hardware, firmware image, provisioning records, or substitute parts | Counterfeit, espionage, fraud |
| T-06 | Insider or over-broad support access | Legitimate credentials with excessive scope | Misuse, data exfiltration |
| T-07 | Security researcher | Reports vulnerability (benign) or publishes exploit | Disclosure |
| T-08 | Automated internet-wide scanner | Continuous background scanning of any internet-reachable service | Opportunistic compromise |

**Not modelled as attackers here:** a state-level adversary with physical laboratory access to a specific
vessel; a compromised SoC vendor's mask ROM; a subverted cryptographic algorithm. These are acknowledged as
residual limitations, not addressed by any candidate control in this document.

### 3.3 Entry points

| EP | Entry point | Exposure | Families | First control direction |
|---|---|---|---|---|
| EP-01 | Vessel LAN / owner Wi-Fi (Ethernet, Wi-Fi) | LAN-reachable | HUB, DISPLAY | Default-deny inbound, authenticated local API, segmentation (§4) |
| EP-02 | Internet / WAN uplink | Internet-reachable if inbound is opened | HUB, WATCH, DISPLAY | **No inbound internet service**; outbound-only for WATCH |
| EP-03 | Cloud/service API | Credential-bearing | WATCH, HUB, FLEET | Per-device scoped credentials, server-side tenant derivation |
| EP-04 | BLE (if implemented) | Radio proximity | HUB, WATCH | Physical-proximity pairing, no default code |
| EP-05 | USB host / removable media | Physical | HUB, DISPLAY | Service-only mode, no auto-execution, signed artefacts only |
| EP-06 | Update channel (OTA, USB, local) | Remote/local | All | Signed images, anti-rollback, authorisation, A/B (§6) |
| EP-07 | Manufacturing/provisioning station | Controlled but high-value | All | HSM-backed issuance, per-device records, tamper-evident logistics |
| EP-08 | Debug port / console / test pads | Physical | All | Locked in production, documented unlock (§7) |
| EP-09 | NMEA 0183 / serial / CAN physical interface | Vessel wiring | HUB, SENSE, AIS | Read-only parsing, isolation, input validation (§4.4) |
| EP-10 | AIS receiver data feed (`!AIVDM` or third-party integration) | Untrusted content | AIS, HUB, DISPLAY | Treat as untrusted input, length/schema validation, target-age semantics |
| EP-11 | Cloud→device path | **None exists** | All | Preserve the absence; no command channel may be added |

### 3.4 Abuse cases

| ID | Abuse case | Actor | Assets | Required candidate control | Evidence state |
|---|---|---|---|---|---|
| AC-01 | Default or shared credential grants LAN control of a HUB/DISPLAY | T-01, T-02 | A-01, A-10 | Unique per-device credentials, forced setup, no factory default password (`SEC-G-05`, `SEC-G-14`, `SEC-G-43`) | `NO_IMPLEMENTATION` |
| AC-02 | Malicious firmware pushed over the update channel or swapped on storage | T-01, T-05 | A-03 | Signed images, hardware-rooted verification, anti-rollback, authorisation (`SEC-G-06`…`SEC-G-13`) | `NO_IMPLEMENTATION` |
| AC-03 | Device identity cloned from a stolen unit, then re-bound to a new owner | T-03 | A-02, A-06 | Non-exportable keys in SE/SoC, binding records, revocation, ownership proof (`SEC-G-01`…`SEC-G-04`) | `NO_IMPLEMENTATION` |
| AC-04 | Attacker on the LAN injects or replays fake sensor/marine data into DISPLAY/NAV | T-01, T-02 | A-01 | Authenticated local API, per-source provenance, freshness and range validation, signed/authenticated bus where feasible (`SEC-G-18`, `SEC-G-20`) | `NO_IMPLEMENTATION` |
| AC-05 | Attacker deletes or falsifies local security logs to hide intrusion | T-02, T-03 | A-01, A-10 | Append-only bounded log, monotonic counters, diagnostic export (`SEC-G-16`, `SEC-G-17`) | `NO_IMPLEMENTATION` |
| AC-06 | Stolen WATCH device used to read prior owner's vessel data or to spoof telemetry | T-03 | A-02, A-04, A-09 | De-provision/erase on transfer, server-side revocation, tenant derived from credential (`SEC-G-04`, `SEC-G-37`, FLEET §8.7) | `NO_IMPLEMENTATION` |
| AC-07 | Cloud compromise used to command a device | T-04 | A-01, A-05 | **No cloud→device command channel**; device never grants local authority to cloud (`SEC-G-15`, `SEC-G-38`) | `NO_IMPLEMENTATION` |
| AC-08 | Subscription lapse or service outage silently disables local monitoring | Commercial trigger, not attacker | A-05 | Local functions independent of subscription and internet; explicit degraded state (`SEC-G-19`) | `NO_IMPLEMENTATION` |
| AC-09 | Alert marked "delivered" when nothing reached the owner, creating false reassurance | T-04, defect | A-08 | Separate accepted/delivered/unknown/acknowledged states; no aggregate that hides them (`SEC-G-21`) | `NO_IMPLEMENTATION` |
| AC-10 | Device simply goes offline and the app shows "all normal" | Any | A-05, A-08 | Heartbeat/absence detection, visible offline state (`SEC-G-22`) | `NO_IMPLEMENTATION` |
| AC-11 | Physical attacker connects to debug port or reads keys from flash | T-03, T-05 | A-02, A-03 | Locked debug, non-exportable keys in SE/OTP, tamper evidence (`SEC-G-02`, `SEC-G-25`, `SEC-G-39`) | `NO_IMPLEMENTATION` |
| AC-12 | Counterfeit/substituted secure element or board in the supply chain | T-05 | A-02, A-07 | Attestation/identity verification of the SE, manufacturing records, tamper-evident packaging (`SEC-G-03`, `SEC-G-41`) | `NO_IMPLEMENTATION` |
| AC-13 | Removable media used to execute arbitrary code | T-02 | A-03 | No auto-execution; signed artefacts only; service mode (`SEC-G-24`) | `NO_IMPLEMENTATION` |
| AC-14 | AIS feed spoofed or malformed to crash or mislead the consuming application | T-01, environmental | A-01 | Untrusted-input handling, bounds checking, stale/age semantics, never a collision-avoidance claim (`SEC-G-20`, D9 rules) | `NO_IMPLEMENTATION` |
| AC-15 | Attacker exploits a known-vulnerable third-party component years after release | T-01, T-08 | A-03, A-05 | SBOM, vulnerability monitoring, update capability, support period (`SEC-G-26`…`SEC-G-33`) | `NO_IMPLEMENTATION` |

### 3.5 What the absence of a control path changes — and what it does not

The absence of steering/actuator functions removes the catastrophic-impact branch of the threat model
(uncommanded course or throttle change). It does **not** make the device harmless: false data, silent
failure, privacy loss, a bricked unattended monitoring device, or a compromised update chain that persists
on the vessel are all real harms. The security case must therefore be about **integrity, availability and
honesty of the data and of the device's own state**, not merely about "no danger".

### 3.6 Threat-model limitations

1. No device exists, so no attack surface can be measured; entries above are design expectations.
2. No vulnerability scan, fuzzing, pen test or red-team exercise was authorised or performed.
3. Physical security assumptions (locker placement, owner access) are not verified on any installation.
4. Supply-chain threats are modelled at the level of "trust the provenance chain or not"; no supplier audit exists.
5. The model is family-generic; each future product must instantiate its own model per installation class.

---

## 4. Trust boundaries and network segmentation

Transport-by-transport exposure (NMEA 0183/2000, generic CAN, Ethernet, Wi-Fi, BLE, GNSS, AIS, cellular,
satellite) is assessed in D6 §3; this section defines the segmentation and authentication policy that the
firmware must enforce across those transports.

### 4.1 Candidate zones

| Zone | Contents | Trust level | Candidate rule |
|---|---|---|---|
| Z-0 **Device root of trust** | SoC BootROM, fuses/OTP, secure element, immutable boot stages | Trusted (if verified) | Only signed code executes; keys are non-exportable; identity anchored here |
| Z-1 **Vessel instrument network** | NMEA 0183 / class-CAN wiring, third-party instruments | Untrusted for content, trusted for physical presence | Read-only parsing, isolation barrier, input validation, no writes |
| Z-2 **Owner local LAN** | Router, phones, tablets, HUB/DISPLAY clients | Semi-trusted | Authenticated local API, default-deny inbound, per-client sessions |
| Z-3 **WAN / internet** | Marina Wi-Fi, cellular, uplink | Untrusted | **No inbound service**; outbound-only where a service exists; TLS with certificate validation |
| Z-4 **Cloud/service** | WATCH service, FLEET tenant, update server | Untrusted for authority, authenticated for data | Per-device scoped credentials; no command channel; tenant from credential |
| Z-5 **Service/installer zone** | USB service port, installer laptop, commissioning tool | High-risk physical | Service mode off by default; ownership/authorisation proof; short-lived scoped credential; audit |
| Z-6 **Manufacturing zone** | Provisioning station, HSM, test fixture, logistics | High-value | Controlled key ceremony, per-device records, tamper-evident logistics, no plaintext key persistence |

### 4.2 Candidate flow rules

| Flow | Direction | Candidate requirement | Priority |
|---|---|---|---|
| F-01 Owner client → local device API | Z-2 → device | Authenticated (per-user/owner session or per-client token), least privilege, TLS on LAN where feasible, no unauthenticated write path | MUST |
| F-02 Device → owner client | device → Z-2 | Read-only by default; any write is enumerated, bounded and separately approved (never a control path) | MUST |
| F-03 Device → vessel instruments | device → Z-1 | **No write path** in any candidate design; read-only receive | MUST |
| F-04 Vessel instruments → device | Z-1 → device | Parsed defensively; invalid/stale/out-of-range mapped to explicit states; never fabricated | MUST |
| F-05 Device → cloud (WATCH/HUB optional) | device → Z-3/Z-4 | Outbound-only TLS, certificate validation, per-device credential, bounded retry, no payload-selected tenant | MUST |
| F-06 Cloud → device | Z-4 → device | **No flow.** No command, config-push or remote-shell channel exists or is proposed | MUST |
| F-07 Installer/service → device | Z-5 → device | Physical presence or ownership proof; short-lived scoped credential; audited; disabled after the grant | MUST |
| F-08 Manufacturing → device | Z-6 → device | Per-device identity issuance under HSM; records retained; no shared secrets | MUST |
| F-09 Internet client → device | Z-3 → device | **No inbound flow.** Port-forwarding/UPnP to a device is prohibited | MUST |
| F-10 Update server → device | Z-4 → device, device-initiated pull/push | Signed manifest + image verified on device; device authorises the package for its model/version | MUST |

### 4.3 HUB-specific candidate segmentation

- Two Ethernet ports or an equivalent documented segmentation policy is a candidate for separating
  **owner clients**, **installer service access** and **instrument traffic** (D7 §4.5); the edition
  boundary is currently `EDITION_INTERFACE_UNSPECIFIED`, so this remains a candidate requirement, not an
  edition feature.
- Local discovery (mDNS/DHCP) only on the local segment; a documented fallback address so the device is
  reachable without internet or name resolution.
- A firewall with default-deny inbound, per-interface policy, and an explicit allow-list per service.
- Management surfaces (diagnostics, configuration) bound to the local segment; never exposed to WAN.

### 4.4 SENSE-specific candidate rules

- Measurement inputs are hostile: open circuit, short, out-of-range, implausible rate-of-change, induced
  noise and static discharge must map to explicit invalid/fault states, never to a plausible number.
- Any local bus/radio link between SENSE heads and an aggregator is a candidate for authenticated and
  integrity-protected framing; if a wireless head is used, pairing and key establishment are mandatory
  candidate requirements. The current architecture has SENSE without its own connectivity.

### 4.5 DISPLAY-specific candidate rules

- The DISPLAY is a **client**: it holds no authority, no persistent safety-relevant state and no write path
  to the vessel bus. Its security requirements are boot integrity, update integrity, service-access
  control, and honest presentation of stale/unknown data.
- Kiosk boot must not expose a general-purpose desktop or browser to the owner network as an uncontrolled
  attack surface; any browser engine that is exposed is treated as an untrusted-input processor.

### 4.6 AIS integration-specific candidate rules

- Third-party receiver data (physical serial/USB/Ethernet or `!AIVDM` stream) is **untrusted input**: bounded
  parsing, no dynamic code, explicit target age, no fabricated targets, no claim of completeness.
- If MAREA builds a receive-only receiver (P1) it inherits the device-security requirements of §4–§11; if
  it integrates a third-party receiver, MAREA must document which security properties it relies on and
  which it does not own.
- No AIS transmission, no DSC, no remote command to a receiver configuration that could transmit.

### 4.7 Trust-boundary requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-18 | A documented default-deny segmentation policy separates vessel instrument traffic, owner LAN, WAN and service access; every permitted flow is enumerated on the device and enforced by a firewall/interface policy, and no inbound internet-reachable service exists | MUST | HUB, WATCH (SHOULD), DISPLAY, AIS | `NO_IMPLEMENTATION` |

---

## 5. Device identity, attestation and secure provisioning

### 5.1 Candidate key hierarchy

```
Manufacturing root (offline CA / HSM, ceremony-controlled)         <-- not created
   ├── Device-identity issuing CA (intermediate, HSM)              <-- not created
   │      └── per-device identity certificate (device private key in SE/OTP)
   └── Firmware-signing root (offline)                             <-- not created
          ├── Release-signing key(s) (HSM, per product line)       <-- not created
          └── Recovery/golden-image signing key (HSM)              <-- not created
Device operational credentials (derived/issued at commissioning)
   ├── local client/session credentials
   ├── telemetry credential (per device, tenant-scoped, cloud side)
   └── installer/service credential (short-lived, scoped)
```

Candidate properties: device identity key generated **inside** the secure element or SoC and never
exportable in plaintext; certificates issued by a MAREA-operated CA; private keys never printed, logged or
shipped in a firmware image; per-device JSON/PKI records retained for the support period plus the
documented retention window.

### 5.2 Secure element versus SoC key storage (candidate comparison)

| Option | What it provides | Evidence available | Risks / limitations | Candidate verdict |
|---|---|---|---|---|
| **Discrete secure element** (e.g. NXP SE050 family, ST STSAFE-A120 family) | Dedicated tamper-resistant key store; CC-certified implementations named by the vendors (SE050: EAL6+ up to OS level; STSAFE-A120: EAL5+ AVA_VAN.5); signature-verification service usable for boot/update; provisioning/personalisation services | `EVD-MC11-506`, `EVD-MC11-507` — manufacturer pages only | Cost, BOM, I²C/SPI bus exposure, vendor provisioning-service dependency, licence terms and per-unit cost not retrieved; neither part is registered or selected | **Candidate.** Must be lifecycle-verified and costed; neither part is selected |
| **Registered legacy candidate** ATECC608B / Trust&GO (`CMP-SEC-01/02`) | ECDSA/ECDH/AES, 16 key slots, monotonic counters, unique serial, secure-boot assistance | `EVD-MC11-508`, `EVD-MC11-014` — manufacturer page; register says `NRND` | **NRND** for a security-critical, long-life part; Trust&GO ties identity to vendor cloud/CA configuration; no replacement selected | **Not selectable without a documented lifecycle waiver and a replacement plan** |
| **SoC-internal security** (i.MX8M Plus HAB/AHAB fuses + secure boot; MCU OTP/secure-boot such as RP2350 signed boot) | Root of trust in SoC fuses/OTP; signed boot chain; device key in OTP/derived key storage | `EVD-MC11-509`, `EVD-MC11-512`, `EVD-MC11-007` (architecture record) | Fuses are one-time; no re-key after compromise; SoC vendor dependency; key provisioning quality determines everything | **Candidate baseline for HUB/DISPLAY/AIS (Linux-class)**, with a secure element for device identity if SoC OTP alone is insufficient |
| **MCU with no hardware key store** (bare MCU + external flash) | Software-only identity | None for MAREA | Key extractable from flash; cloning trivial; unacceptable for a network-connected device | **Rejected for any connected product** |

**Candidate requirement:** the secure-element-versus-SoC decision is a **design-gate deliverable**
(`SEC-G-40`), recorded with the part's lifecycle status, temperature grade, interface, provisioning
service, second source and cost. ATECC608B cannot be carried into a design without a written lifecycle
decision.

### 5.3 Secure provisioning and manufacturing key injection

Candidate process (none of it exists):

1. **Key ceremony.** Offline root creation and custody under a documented M-of-N ceremony; HSMs for online
   intermediates; no signing key on a developer laptop or CI runner without an HSM-backed authorisation.
2. **Per-device issuance.** The provisioning station requests identity for the device's secure element;
   the CA issues a certificate bound to the device's public key; the private key never leaves the SE.
3. **Identity record.** Serial number, model, hardware revision, SE part/lot, public key/certificate
   fingerprint, firmware hash, provisioning station, date, operator and test result are written to a
   manufacturing record (A-02, A-07).
4. **Supply-chain integrity.** Tamper-evident packaging, logistics reconciliation, counterfeit-component
   controls, and a process to detect and quarantine unauthorised provisioning stations.
5. **No shared secrets.** No global master key in firmware, no shared Wi-Fi/BLE default, no "one key for the
   fleet". A device that cannot be individually identified cannot be revoked and is not acceptable.
6. **Ownership binding at commissioning.** An authorised human binds the device to an owner/vessel; the
   server derives the tenant from the credential, never from a payload field (FLEET §8.2/§8.4).
7. **Transfer, rebind and revocation.** Documented flows: transfer with the vessel or independently,
   revocation on loss/theft, blocked silent re-registration (FLEET §8.6/§8.7; WATCH §17.7).
8. **Installer access.** Short-lived, scoped credential; the installer never receives the device's
   long-term credential (FLEET §8.8).

External provisioning services exist commercially (NXP EdgeLock 2GO named on `EVD-MC11-506`; ST
personalisation loading customer secrets at ST manufacturing, `EVD-MC11-507`), but **no contract, key
custody agreement, cost or data-processing term was obtained or assessed**. Relying on a vendor
provisioning service is a recorded dependency, not a control.

### 5.4 Attestation (candidate)

A device proving its identity and firmware state to the service (`SEC-G-41`, SHOULD) would let the service
detect cloned identities and unexpected firmware versions. Candidate forms: signed boot measurement
quotient, SE-based device certificate presented on the outbound TLS connection, signed health record. None
exists; the service does not exist; the trust decision (what the service does when attestation fails) is
undecided.

### 5.5 Identity requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-01 | Every connected device has a device-unique cryptographic identity established before shipment | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-02 | The device private key is generated in and never leaves a secure element/SoC protected store; it is never present in firmware images, logs or manufacturing tooling output | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `COMPONENT_REGISTERED_ONLY` (ATECC608B NRND) |
| SEC-G-03 | A manufacturing record binds serial ↔ public key/certificate ↔ hardware revision ↔ firmware hash, retained for the support period | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-04 | Ownership binding, transfer, rebind and revocation are documented flows with ownership proof; a bound device cannot be silently re-registered | MUST | HUB, WATCH, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-05 | No shared, global or default credential exists in any shipped device; every credential is per-device | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-40 | The secure-element-versus-SoC key-storage decision is a recorded design-gate deliverable with lifecycle status, cost, provisioning service and second source | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `COMPONENT_REGISTERED_ONLY` |
| SEC-G-41 | The device can attest its identity and firmware state to the service, and the service has a defined fail-closed action on attestation failure | SHOULD | HUB, WATCH, AIS (integration) | `NO_IMPLEMENTATION` |
| SEC-G-42 | BLE/radio provisioning (if implemented) requires physical proximity and explicit local confirmation, with no default PIN | SHOULD | HUB, WATCH | `NO_IMPLEMENTATION` |

---

## 6. Boot integrity, signed firmware and update safety

### 6.1 Candidate secure-boot chain

| Platform class | Candidate chain | Root of trust | Evidence |
|---|---|---|---|
| Linux-class application processor (HUB, DISPLAY, AIS-CONNECTED) | SoC BootROM → signed SPL/bootloader → ATF (TF-A) → signed kernel/OS image → signed application containers/services | SoC one-time fuses holding the public key hash (HAB/AHAB); device "closed" so unsigned images are refused | `EVD-MC11-509`, `EVD-MC11-512` |
| Supervisory MCU (HUB MCU, WATCH, SENSE) | BootROM → signed bootloader (candidate MCUboot) → signed application image; dual-bank or A/B slot strategy | MCU OTP/secure-boot key (RP2350-class signed boot, `EVD-MC11-007`) or secure element | `EVD-MC11-510` |
| MicroPython-based firmware (if any legacy-inspired path were ever reused — it is **not** cleared) | Signed runtime image verified by bootloader; runtime not modified in the field | Same as MCU class | `EVD-MC11-505` (notice obligations only) |

Fuse closure is **irreversible** and is a manufacturing decision (`EVD-MC11-509` explicitly documents that
closing the device prevents any unsigned image from loading and cannot be undone). A manufacturing line
that closes devices without a verified signed image produces non-booting hardware; the process must
therefore include a boot-verification step before closure, and a documented material disposition for
failure.

### 6.2 Signed firmware and update authorisation

Candidate requirements:

1. **Every** updatable component (OS image, MCU firmware, container bundle, service firmware, secure-element
   configuration) is signed and verified before execution/activation.
2. Signing keys live in an HSM or offline; release signing requires a multi-party authorisation and a
   recorded build hash. No release key in the repository, in CI variables or on a workstation.
3. The **manifest** carries: product/model identity, hardware revision compatibility, firmware version,
   monotonic anti-rollback counter, component list with hashes, minimum bootloader version, signature, and
   the signing key identity. The device rejects a manifest for a different model/revision or a counter at or
   below the stored one.
4. **Authorisation is a server/service decision plus an on-device check**: only an authorised rollout may be
   offered to a device, and the device independently verifies signature and compatibility. A compromised
   update server cannot install unsigned or wrong-device firmware.
5. Staged rollout with an abort/stop capability, and a per-device update state visible in diagnostics
   (`SEC-G-46`, SHOULD).
6. Key rotation and revocation: an update-signing key can be retired and a replacement authorised without
   bricking the fleet; the mechanism (key list in signed metadata, fuse-permitted key slots) must be designed
   before the first fuse is closed.
7. Downgrade is refused unless the signed manifest explicitly authorises it and the anti-rollback counter
   allows it (a rollback that re-opens a fixed vulnerability is an attack).

### 6.3 A/B update safety and power-loss tolerance

| Concern | Candidate mechanism | Evidence |
|---|---|---|
| Atomic switch | Two root-filesystem slots (or dual-bank MCU flash) with an atomic boot selector; update writes only to the inactive slot | `EVD-MC11-511` (RAUC), `EVD-MC11-510` (MCUboot) |
| Power loss during write | The active slot is never modified; a partial write to the inactive slot is discarded and re-attempted | `EVD-MC11-511` (documented fail-safe/atomic property), engineering analysis |
| Power loss during switch | Bootloader counts boot attempts; unconfirmed new slot is reverted after N failures | Candidate design; not tested |
| Successful-boot marking | The application marks the new slot "confirmed" only after health checks (watchdog, data path, services); otherwise the bootloader reverts | `EVD-MC11-511` |
| Golden/recovery image | A minimal, separately signed recovery slot capable of receiving a signed update over USB/local media or a service network | Candidate design |
| Storage corruption | Boot from the other slot; diagnostic record preserved; storage-health reporting | D7 §4.9/§4.18 |
| Data migration | Versioned configuration/schema migration with backward compatibility or an explicit, reversible step | Candidate design |

**Requirement, not fact:** "power loss during update must not brick the device" (D7 §4.18) is a candidate
requirement. No power-loss, brownout, wear or corruption test was executed; `WS-V02` and `H-V8` in the
architecture workstream remain `NOT_EXECUTED`.

### 6.4 Recovery after a failed update

Candidate recovery layers, in order:

1. **Automatic:** boot counter + rollback to the last confirmed slot (no user action).
2. **Local recoverable:** a documented local recovery mode (USB or service header) that accepts **only**
   signed recovery images and requires physical presence; no "any file" recovery, no unsigned console.
3. **Owner-assisted:** a documented procedure using the owner app to re-flash a signed image if the device
   can still boot its recovery slot.
4. **RMA:** if the device cannot reach the recovery slot, the documented route is return/replacement; the
   manufacturer debugs the unit and records the failure. An unattended WATCH/SENSE unit must not require a
   field visit for a routine failed update, so layers 1–3 are the design target.
5. **Post-recovery evidence:** the diagnostic record of the failed attempt (version, signature result,
   boot count, reason) survives rollback for support and for vulnerability analysis.

### 6.5 Boot and update requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-06 | Boot chain is hardware-rooted (SoC fuses/OTP or secure element) and verifies each signed stage before execution | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `EXTERNAL_REFERENCE_ONLY` |
| SEC-G-07 | Every firmware/software artefact is signed with keys held in an HSM/offline ceremony; the device verifies before activation | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-08 | A monotonic anti-rollback counter is enforced; downgrade is refused unless explicitly authorised | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-09 | A/B (or dual-bank) update is atomic and the active slot is never modified in place | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `EXTERNAL_REFERENCE_ONLY` |
| SEC-G-10 | Automatic rollback to the last confirmed image after repeated failed boots, with a boot-attempt counter | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-11 | A documented recovery path exists for an unbootable device (signed local recovery + RMA), preserving the failure record | MUST | HUB, WATCH, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-12 | Update authorisation: manifest carries model/revision/version/counter/component hashes; device rejects incompatible packages | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-13 | Update signing keys can be rotated/revoked without bricking the fleet, and the mechanism is designed before fuse closure | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-46 | Staged rollout with abort, and per-device update state visible in diagnostics | SHOULD | HUB, WATCH, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-50 | Each security requirement above has a recorded verification test (bench, fault injection, power-loss) before sale | MUST | All | `NOT_EXECUTED` |

---

## 7. Key storage, service access and local diagnostics

### 7.1 Key storage and physical-attack assumptions

| Threat | Candidate control | Status |
|---|---|---|
| Bus sniffing between SoC and secure element | Prefer SoC-internal key storage or SE with encrypted/short bus where feasible; assume the bus is observable | Candidate design rule; not measured |
| Flash dump of the application processor | Keys never stored in filesystem; encrypted filesystem for any personal/history data; unique per-device wrapping key | Candidate |
| Debug port / boot-mode access | JTAG/SWD and console locked in production (fuse or SE-enforced), unlock requires a documented, audited service procedure | Candidate (`SEC-G-25`) |
| Physical tamper | Tamper-evident enclosure/labels; documented physical-access assumption for each installation class (locker, helm) | SHOULD (`SEC-G-39`); no test |
| Side-channel / fault injection | Out of scope for the threat model except as a secure-element selection criterion (certified parts name their resistance) | Residual limitation |

### 7.2 Local diagnostics and service access

| Requirement direction | Candidate requirement | Priority |
|---|---|---|
| Owner diagnostics | Owner-exportable diagnostic bundle (source health, boot/reset cause, storage health, supply-voltage history, temperature, network status, update history) produced locally without any remote access | MUST (`SEC-G-17`) |
| Bundle safety | The bundle contains no private keys, no credentials, no raw personal data beyond what support needs; if position is included it is opt-in and visible to the owner | MUST (`SEC-G-17`) |
| Service access | Disabled by default; enabling requires physical presence or an owner-authorised, short-lived, scoped installer grant; every session audited | MUST (`SEC-G-14`) |
| No backdoor | No undocumented maintenance password, no vendor master key accepted by the device, no "support mode" that bypasses authentication | MUST (`SEC-G-05`, `SEC-G-14`) |
| Remote access | **No remote shell, no remote desktop, no inbound connection to the device** | MUST (`SEC-G-15`) |

### 7.3 Event logging and retention

Candidate local security log (append-only in intent, bounded in size, tamper-evident):

| Event class | Minimum fields | Why |
|---|---|---|
| Boot / reset | boot count, reset cause, firmware version, secure-boot result | Detect tampering, rollback loops |
| Update | from/to version, signature result, slot, result, failure reason | Update forensics |
| Authentication | local client identity, result, source interface (no secret material) | Brute-force and misuse detection |
| Configuration | actor, before/after summary, time, interface | Integrity of installation |
| Fault / degraded state | source, state, since when | Honest diagnosis |
| Security events | debug unlock, service session, identity change, log clear attempt | Accountability |

Retention is **`OPEN`** and must be set with the data-protection workstream/DPO: security logs are not an
excuse for indefinite personal-data retention. Candidate shape: bounded rolling window plus an
owner-triggered snapshot; deletion on owner request (subject to the documented legal-hold exceptions)
(A-10, FLEET §11, WATCH §17.8–§17.10).

### 7.4 Service-access and logging requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-14 | Service/diagnostic access is disabled by default; enabling requires physical presence or owner-authorised scoped grant; sessions are time-bounded and audited | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-15 | No remote shell, remote control, inbound internet-reachable service or cloud→device command channel exists in any device | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-16 | Local security event log is append-only in intent, bounded, tamper-evident and exportable with the diagnostic bundle | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-17 | Owner can export a redacted diagnostic bundle locally, without remote access and without exposing credentials or unnecessary personal data | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-43 | Local authentication attempts are rate-limited and locked out; no unlimited credential guessing against local services | MUST | HUB, WATCH, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-24 | USB/removable media never auto-executes; only signed artefacts are accepted; ports are current-limited and service-mode is documented | MUST | HUB, DISPLAY | `NO_IMPLEMENTATION` |
| SEC-G-25 | JTAG/SWD/console/debug interfaces are locked in production; unlock follows a documented, audited procedure | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-39 | Tamper evidence and physical-access assumptions are documented per installation class and included in the user information | SHOULD | All | `NO_IMPLEMENTATION` |
| SEC-G-48 | Log and personal-data retention windows are defined with the DPO before sale and are enforceable (not indefinite) | MUST | All (where local retention exists) | `NO_IMPLEMENTATION` |
| SEC-G-49 | Every local alarm, indication and fault path has a recorded functional test (including its own failure mode) before sale | SHOULD | HUB, WATCH, SENSE, DISPLAY | `NOT_EXECUTED` |
| SEC-G-51 | Diagnostic bundles are signed/encrypted so support cannot be spoofed and owner data is not exposed in transit | SHOULD | All | `NO_IMPLEMENTATION` |

---

## 8. Vulnerability management, disclosure, SBOM and support period

### 8.1 Candidate vulnerability-management process

| Stage | Candidate requirement | Status |
|---|---|---|
| Intake | Published security contact (`security.txt`, product page, single point of contact), monitored intake inbox, acknowledgement within a stated window (`OPEN` value) | `NO_IMPLEMENTATION` |
| Triage | Severity method and decision record; reproducer handling; coordinated disclosure timeline; embargo rules | `NO_IMPLEMENTATION` |
| CVE | Route to obtain CVE identifiers (own CNA or requesting through a CNA/root; ENISA is a CNA and CVE Root per `EVD-MC11-504`) | `NO_IMPLEMENTATION` |
| Remediation | Fix, regression test, signed update, coordinated release, user advisory | `NO_IMPLEMENTATION` |
| Reporting | CRA Article 14 reporting readiness: early warning 24 h, notification 72 h, final report; severe-incident path; single reporting platform account/process | `NO_IMPLEMENTATION` (deadline input in §12) |
| Component vulnerabilities | Report a vulnerable integrated component upstream and share fixes as required by Article 13(6) | `NO_IMPLEMENTATION` |
| Measurement | Track mean time to acknowledge/triage/remediate honestly; no SLA or guaranteed-response claim exists (`NO_SLA_ESTABLISHED`) | `NO_IMPLEMENTATION` |

### 8.2 SBOM and third-party components

- Candidate format: SPDX or CycloneDX generated deterministically from the pinned build; one SBOM per
  firmware release and per device image, with component names/versions/suppliers/hashes and the relationship
  to the device model. The CRA allows the Commission to specify SBOM format/elements by implementing act
  (Article 13(24), `EVD-MC11-502`), so the format decision must be revisited against that act.
- The SBOM must cover firmware-runtime components (e.g. a MicroPython-based build would carry MicroPython MIT
  plus rp2 port BSD-3 components, `EVD-MC11-505`), OS/BSP components, third-party libraries, container base
  images and any vendor binary blob.
- Third-party **licence notice obligations** are a release gate, not a documentation afterthought: a
  programmed board distributed by MAREA needs a `FIRMWARE-NOTICES.txt` bundle (D28 §6).
- Known gaps inherited from the legacy stack: no SBOM in the build, unpinned downloads without checksums,
  container images by mutable tag, Python dependencies without hashes (LICENSE-NOTICE policy G-07/G-08/G-16).
  These are **legacy findings**, not a MAREA implementation.

### 8.3 Support period (candidate, case-by-case)

The CRA requires a support period reflecting expected use, at least five years, and security updates
available for at least 10 years or the support period, whichever is longer (Article 13(8)–(9),
`EVD-MC11-502`). Candidate programme shape — **a commercial decision that does not exist yet**:

| Family | Candidate support period | Rationale (engineering judgement) | Open dependency |
|---|---|---|---|
| HUB | 7 years (candidate) | Installed appliance, marine lifecycle, industrial SOM commitment 2036+ (`EVD-MC11-010/011`) | Vendor BSP support window, cost of a 7-year update service |
| DISPLAY | 7 years (candidate) | Same installed-lifecycle argument; panel lifecycle | Panel supplier lifecycle |
| SENSE | 7 years (candidate) | Simple MCU, long expected life; calibration/replacement model | MCU lifecycle, enclosure |
| WATCH | 5 years (candidate) | Consumer-style cellular hardware with modem lifecycle pressure; often replaced | Modem vendor lifecycle, operator certification, battery |
| AIS (integrated) | 5 years for the MAREA firmware/integration layer (candidate) | MAREA owns integration, not the radio; receiver lifecycle is third-party | Third-party receiver vendor lifecycle |

End-of-support disclosure (month and year at purchase) is a MUST candidate (`SEC-G-30`). The internal
decision on update-service ownership (D7 §4.16: `OPEN`) is a prerequisite: a support period that is
published but not resourced would be a false statement.

### 8.4 Vulnerability, SBOM and lifecycle requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-26 | A vulnerability intake and coordinated disclosure process exists (single point of contact, triage, embargo, coordinated release, advisory) | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-27 | A CVE assignment/advisory route is established and advisories are published for fixed vulnerabilities | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-28 | Security updates are available for at least 10 years or the support period, whichever is longer; the commitment is resourced, not merely published | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-29 | A support period per family is defined before sale, reflecting expected use, at least 5 years | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-30 | The end date of the support period (month and year) is disclosed at purchase and on the product/website | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-31 | A deterministic SBOM is produced per firmware release and per device image | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-32 | Third-party licence notices are bundled with every programmed board and every firmware download | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-33 | Build inputs are pinned (toolchain, BSP/SDK, base images, dependencies) and the build is reproducible enough to re-create a released artefact | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-34 | Vendor BSP/SDK and component lifecycles are monitored (PCN/EOL alerts); NRND parts trigger a recorded replacement plan | MUST | All | `COMPONENT_REGISTERED_ONLY` (`CMP-SEC-01/02` NRND) |
| SEC-G-35 | Every third-party binary blob is registered with source, version, hash, licence terms and notice obligation; no unattributed blob ships | MUST | HUB, WATCH (SHOULD), DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-45 | An incident-response plan and CRA reporting readiness exist (roles, timelines, platform access, user communication) before market placement | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-52 | Personal or vessel-identifying local data is encrypted at rest with per-device keys where the storage model retains it | SHOULD | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |

---

## 9. Local/offline behaviour and subscription independence

| Scenario | Required candidate behaviour | Why it is a security property |
|---|---|---|
| Internet unavailable | Boot, local data acquisition, normalisation, dashboard, diagnostics, configuration, history and recovery continue; WAN-only features degrade visibly | A cloud outage must not degrade the vessel's local situational awareness |
| Cloud/API key revoked or service suspended | Device continues local functions; telemetry buffers/drops visibly; no local function is disabled by a server-side decision | Server-side compromise or billing failure must not become a local availability attack |
| Subscription expired/unpaid | Remote notifications may stop; **local sensing, local alarm/indication** continue and the state is stated honestly | Commercial state may never disable safety-relevant local function (WATCH contract §1.2 rule 7, FLEET §24.3) |
| Boot with no network | Boots to a known state; no network dependency in the boot chain or in identity verification for local use | Prevents a permanent brick on WAN loss |
| Time source lost | RTC + monotonic counters continue; "time uncertain" is explicit; GNSS time is not the sole trust anchor for security decisions (key validity, certificate checks) | Prevents clock-manipulation from breaking revocation or forging freshness |
| Cloud compromise | No local authority is granted; no command channel exists; data written by the cloud is untrusted input | Preserves the "no control path" invariant |

Candidate requirements: `SEC-G-19` (local independence incl. subscription), `SEC-G-23` (time policy),
`SEC-G-38` (cloud containment), plus the honest-state requirements `SEC-G-20`–`SEC-G-22` for data and
alerting. None is implemented; `WS-V04` (subscription-expiry isolation test) is `NOT_EXECUTED`.

### 9.1 Local-behaviour and honesty requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-19 | Boot, local acquisition, local data presentation, local alarm/indication, configuration, diagnostics, history and recovery work without internet and without an active subscription; suspension or expiry of a service never disables a local function | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-20 | Every value carries source time and receive time; stale, unknown, invalid, out-of-range and uncalibrated states are visible with their age; no value is interpolated into a plausible-looking number | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-21 | Alert lifecycle distinguishes provider acceptance, delivery confirmation, unknown and human acknowledgement in the UI, reports and KPIs; `DELIVERY_UNKNOWN` is a visible outcome and no aggregate hides the distinction | MUST | HUB, WATCH, DISPLAY | `NO_IMPLEMENTATION` |
| SEC-G-22 | Device heartbeat/absence detection means a silent or offline device is shown as offline, never as normal; a missing alert is not evidence of a normal condition | MUST | HUB, WATCH, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-23 | Time policy: GNSS time is not the sole trust anchor for security decisions; RTC and monotonic counters continue across loss of fix, and "time uncertain" is explicit after a long power loss | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |
| SEC-G-38 | The device grants no local authority to the cloud; no cloud-to-device command, configuration-push or remote-shell channel exists, and cloud-supplied data is treated as untrusted input | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |

---

## 10. End-of-life, data deletion and ownership transfer

### 10.1 End-of-life (candidate)

| Step | Candidate requirement | Status |
|---|---|---|
| Final security update | A final supported firmware with all known fixes is published; users are told the support end date in advance | `NO_IMPLEMENTATION` |
| Remote service shutdown | Remote services are wound down with notice; the device continues local functions or states plainly what stops | `NO_IMPLEMENTATION` |
| Credentials | Server-side device credentials are revoked; outstanding update-signing keys for the model are retired | `NO_IMPLEMENTATION` |
| Data | Owner can export before shutdown; deletion paths remain available for the documented period | `NO_IMPLEMENTATION` |
| Spares/warranty | Spare-part and repair position is stated (owned by the service/manufacturing workstreams) | Not in this document |
| Environmental | WEEE producer responsibility and take-back belong to conformity/manufacturing workstreams (HCM §5.5) | Not asserted here |
| Cessation of operations | If the manufacturer ceases operations, it must inform authorities and users before the cessation takes effect (CRA Article 13(23), `EVD-MC11-502`) | `NO_IMPLEMENTATION` |

### 10.2 Data deletion and cryptographic erasure

Candidate requirements: a verified owner request deletes local event/history data and cloud data within a
published period, propagates to processors and backups per the backup-expiry cycle, and returns a
confirmation (WATCH §17.10; FLEET §16). A returned or resold device is factory-erased with secure deletion
of keys and personal/history data (cryptographic erasure where the storage controller permits it), and the
device is unbound/revoked before resale. Account deletion is distinct from subscription cancellation and
from device transfer; each requires its own explicit action (WATCH §17.10, FLEET §16).

### 10.3 Lifecycle requirements

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-36 | An end-of-life plan exists: final update, service shutdown notice, credential revocation, owner export, data deletion | MUST | All | `NO_IMPLEMENTATION` |
| SEC-G-37 | Device and cloud data deletion, device unbinding/revocation and secure erase before resale/return are documented and verifiable | MUST | HUB, WATCH, DISPLAY, AIS, FLEET service | `NO_IMPLEMENTATION` |
| SEC-G-47 | A returned or resold device is factory-erased (keys and personal/history data deleted with cryptographic erasure where the storage permits) and unbound/revoked before it leaves MAREA's or a reseller's control | MUST | HUB, WATCH, SENSE, DISPLAY, AIS | `NO_IMPLEMENTATION` |

---

## 11. Failure alerting that must never be described as guaranteed

WATCH is conditional awareness, not a distress, rescue or safety-of-life service (WATCH contract §1.2).
The security requirements that protect that honesty are:

1. **Distinct states** for provider acceptance, delivery confirmation, unknown and human acknowledgement;
   no aggregate "alerts sent" figure that hides the distinction (WATCH §5).
2. **`DELIVERY_UNKNOWN` is a truthful, visible outcome**, never collapsed into "delivered".
3. **Absence of an alert is never evidence of normality**: device heartbeat/absence detection must surface
   an offline device, and a stale source must show its age (WATCH §1.2, §10; D7 §9).
4. **No latency, delivery or acknowledgement promise** may be published before measurement; any figure
   before measurement is a plan, not a fact.
5. **The alerting system's own failures are reported** (silent failure of the notifier is itself an alarm
   condition), and local alarm/indication is independent of the cloud path.

Requirements: `SEC-G-19`–`SEC-G-22`. Evidence state: `NO_IMPLEMENTATION`; the alert-delivery measurement
plan exists in the WATCH contract as a plan, and `WS-V03`/`WS-V04` are `NOT_EXECUTED`.

Requirements `SEC-G-49` (local alarm/fault indication test) and `SEC-G-51` (signed/encrypted diagnostic
bundles) apply where local indication and diagnostic export exist — HUB, WATCH, SENSE and DISPLAY.

---

## 12. CRA (EU) 2024/2847 — obligation mapping as a conformity input only

**`CRA_COMPLIANCE = NOT_ESTABLISHED`.** This section maps candidate requirements to CRA obligations so a
future programme can plan. It is not a conformity assessment, not a technical file, not a gap analysis
signed by a conformity body, and not a claim that any obligation is met. The obligation wording is taken
from the EUR-Lex full text actually fetched (`EVD-MC11-501/502/503`); **Annex I and Article 71 were not
rendered by the retrieval**, so Annex I point numbers are quoted only as Article 13 references them.

### 12.1 Obligation map

| CRA ref | Obligation (as retrieved) | Candidate requirements | Applicability uncertainty |
|---|---|---|---|
| Art 13(1) + Annex I Part I(1) | Design/develop/produce with an appropriate level of cybersecurity based on risk | SEC-G-01…G-52 (whole set) | Whether the product is in scope at all depends on the "product with digital elements" test and the marine-equipment exclusion (MED); conformity workstream owns scope |
| Art 13(3) + Annex I Part I(2) | Documented cybersecurity risk assessment during the support period, indicating which Annex I Part I(2) requirements apply and how | §3 threat model (candidate input), SEC-G-40, SEC-G-44 | Annex I Part I(2) list not retrieved; classification of the product affects the assessment route, not the need for one |
| Art 13(5) | Due diligence over integrated third-party components | SEC-G-31, SEC-G-33, SEC-G-34, SEC-G-35 | Applies to any manufacturer; severity depends on how much third-party firmware/BSP is integrated |
| Art 13(6) | Report component vulnerabilities upstream and share fixes | SEC-G-26, SEC-G-27 | Applies; no process exists |
| Art 13(8) + Annex I Part II | Effective vulnerability handling for the support period; support period ≥5 years; CVD policies | SEC-G-26…SEC-G-30, SEC-G-45 | Support-period length depends on product category guidance (ADCO/Commission delegated acts) not retrieved |
| Art 13(9) + Annex I Part II(8) | Security updates available ≥10 years or support period, whichever longer | SEC-G-28 | Applies to updates made available; resourcing is a commercial decision not taken |
| Art 13(12) | Technical documentation, conformity assessment, EU declaration of conformity, CE marking | Not in this document — conformity workstream (`conformity-applicability.json` LEG-CRA-2024-2847) | The conformity-assessment route depends on default/important/critical classification: **UNKNOWN** |
| Art 13(15) | Type/batch/serial identification | SEC-G-03 (manufacturing record) | Applies; no serial scheme exists |
| Art 13(17) | Single point of contact for users and vulnerability reporting | SEC-G-26 | Applies; no contact exists |
| Art 13(18) + Annex II (not retrieved) | User information and instructions, secure installation/operation | Not specified in this document; product documentation owner | Annex II text not retrieved |
| Art 13(19) | End date of support period (month/year) stated at purchase | SEC-G-30 | Applies |
| Art 13(21) | Corrective measures, withdrawal or recall for non-conformity | SEC-G-36, SEC-G-45 | Applies; no recall capability exists |
| Art 13(23) | Inform authorities and users before ceasing operations | SEC-G-36 | Applies if the manufacturer ceases operations |
| Art 13(24) + Annex I Part II(1) | SBOM; format may be set by implementing act | SEC-G-31 | Format obligation may change; the implementing act was not retrieved |
| Art 14(1)–(2) | Report actively exploited vulnerabilities: early warning 24 h, notification 72 h, final report 14 days after a fix | SEC-G-45 | **Reporting obligations apply from 2026-09-11** (`EVD-MC11-501/504`) — earlier than the main obligations; depends on being a manufacturer in scope |
| Art 14(3)–(4) | Report severe incidents: 24 h / 72 h / final report within one month | SEC-G-45 | Same; severe-incident definition in Art 14(5) |
| Art 14(8) | Inform impacted users and provide mitigation | SEC-G-45 | Applies |
| Art 6 / 7 / 8 | Classification: default vs important (Annex III classes I/II) vs critical (Annex IV) | Determines conformity-assessment route; no requirement here can decide it | **UNKNOWN** — Annex III/IV and the implementing act(s) were not retrieved. A HUB/WATCH/DISPLAY could plausibly fall in the default category, but this is **not established**; if any product's core functionality matches an Annex III class, third-party assessment implications change |
| Recital 11 | Remote data processing necessary for a product function may be in scope | Service element of WATCH (telemetry ingestion, notification) | Whether a MAREA cloud service is a "remote data processing solution" for the product depends on the final architecture; not assessed |
| Recital 18–19 | Free and open-source software rules; open-source software stewards | Relevant only to components MAREA integrates or publishes, not to MAREA product code | Not assessed; D28 covers component licensing |
| Economic-operator role | Manufacturer, importer, distributor, authorised representative, fulfilment-service provider | Not addressed in this document | **Unknown**: if MAREA sources a third-party appliance and sells it under its own name, it may be a manufacturer; if it resells, other obligations apply. A commercial/legal decision, not an engineering one |
| MED exclusion | Marine equipment within Directive 2014/90/EU scope is outside the CRA | Conformity workstream owns | The exclusion does not cover recreational-craft electronics outside MED scope — applicability of MED itself is `NOT_APPLICABLE_WITH_EXPLANATION` for the recorded recreational target in HCM §5, so the CRA exclusion cannot be assumed |
| Transition | Main obligations from **2027-12-11**; reporting from **2026-09-11** (`EVD-MC11-501`, corroborated by `EVD-MC11-504`) | Programme timing input | Dates are inputs to planning, not a compliance state |

### 12.2 The five applicability uncertainties that most change the answer

1. **Product classification (default / important / critical).** Annex III/IV not retrieved; the
   implementing act's technical descriptions not retrieved. This changes the conformity-assessment route
   (internal control vs third-party involvement vs mandatory certification) but not the need for
   vulnerability handling and updates.
2. **Scope and the MED exclusion.** Recreational-craft electronics are not automatically marine equipment
   under MED, so the CRA exclusion cannot be assumed; the conformity workstream must state the position per
   SKU.
3. **Economic-operator role.** MAREA as manufacturer of its own appliance differs from MAREA as importer or
   distributor of a third-party gateway/receiver. The AIS integration option (E) turns on this question.
4. **Remote data processing.** A WATCH cloud service that is necessary for the product's function may be in
   scope as a remote data processing solution; a general SaaS (FLEET) is a different analysis.
5. **Component versus product.** Integrating open-source components (e.g. a bootloader, an update client)
   does not make MAREA the manufacturer of the component, but due-diligence and upstream-reporting duties
   attach to the integration.

### 12.3 What would be required to move from `NOT_ESTABLISHED` to an assessed position

A future, authorised conformity programme would need: the actual product configuration, the classification
decision against the Annexes and implementing acts, an economic-operator role determination, a documented
cybersecurity risk assessment per product, a technical file, evidence of the essential requirements,
a vulnerability-handling organisation, SBOMs, a support-period commitment, and the chosen conformity-
assessment route — with qualified legal/compliance review. **None of this exists in MC-11.**

---

## 13. Per-family requirement matrix

Priority: `M` = MUST, `S` = SHOULD, `–` = not applicable to that candidate family. A family cell may be
`S` where the concern applies to that family at lower priority than the programme-wide priority, and `–`
where the concern genuinely does not apply (for example a network segmentation rule for a sensor module
with no network interface of its own). Evidence state for every row is `NO_IMPLEMENTATION` unless stated
in §5.5, §6.5, §7.4, §8.4 or §10.3; the matrix does not repeat it.

| Req | Priority | HUB | WATCH | SENSE | DISPLAY | AIS (integration / receiver) |
|---|---|:--:|:--:|:--:|:--:|:--:|
| G-01 device-unique identity | M | M | M | M | M | M |
| G-02 key never leaves SE/SoC | M | M | M | M | M | M |
| G-03 manufacturing record | M | M | M | M | M | M |
| G-04 binding/transfer/revoke | M | M | M | – | M | M |
| G-05 no shared/default credential | M | M | M | M | M | M |
| G-06 hardware-rooted boot | M | M | M | M | M | M |
| G-07 signed firmware | M | M | M | M | M | M |
| G-08 anti-rollback | M | M | M | M | M | M |
| G-09 A/B atomic update | M | M | M | M | M | M |
| G-10 automatic rollback | M | M | M | M | M | M |
| G-11 recovery path + RMA | M | M | M | – | M | M |
| G-12 update authorisation/manifest | M | M | M | M | M | M |
| G-13 signing-key rotation/revocation | M | M | M | M | M | M |
| G-14 service access locked by default | M | M | M | M | M | M |
| G-15 no remote shell/inbound/command channel | M | M | M | M | M | M |
| G-16 local security event log | M | M | M | M | M | M |
| G-17 owner diagnostic export | M | M | M | M | M | M |
| G-18 segmentation/default-deny | M | M | S | – | M | M |
| G-19 local/offline + subscription independence | M | M | M | M | M | M |
| G-20 honest stale/unknown state | M | M | M | M | M | M |
| G-21 alert-delivery honesty | M | M | M | – | M | – |
| G-22 heartbeat/offline detection | M | M | M | – | M | M |
| G-23 time policy | M | M | M | M | M | M |
| G-24 removable-media policy | M | M | – | – | M | – |
| G-25 debug interface lockdown | M | M | M | M | M | M |
| G-26 vulnerability intake/CVD/PSIRT | M | M | M | M | M | M |
| G-27 CVE/advisories | M | M | M | M | M | M |
| G-28 update availability ≥10 y or support | M | M | M | M | M | M |
| G-29 support period ≥5 y | M | M | M | M | M | M |
| G-30 end-of-support disclosure | M | M | M | M | M | M |
| G-31 SBOM | M | M | M | M | M | M |
| G-32 firmware notice bundle | M | M | M | M | M | M |
| G-33 build provenance/reproducibility | M | M | M | M | M | M |
| G-34 vendor/component lifecycle monitoring | M | M | M | M | M | M |
| G-35 third-party blob register | M | M | S | – | M | M |
| G-36 end-of-life plan | M | M | M | M | M | M |
| G-37 deletion/secure erase | M | M | M | – | M | M |
| G-38 cloud containment | M | M | M | M | M | M |
| G-39 tamper evidence/physical assumptions | S | S | S | S | S | S |
| G-40 SE vs SoC decision with lifecycle evidence | M | M | M | M | M | M |
| G-41 attestation (SHOULD) | S | S | S | – | – | S |
| G-42 BLE pairing proximity (SHOULD) | S | S | S | – | – | – |
| G-43 auth rate limiting/lockout | M | M | M | – | M | M |
| G-44 independent review + pen test before sale | M | M | M | M | M | M |
| G-45 incident response + CRA reporting readiness | M | M | M | M | M | M |
| G-46 staged rollout/abort (SHOULD) | S | S | S | – | S | S |
| G-47 secure erase before resale/return | M | M | M | M | M | M |
| G-48 retention windows defined | M | M | M | M | M | M |
| G-49 local alarm/fault indication test (SHOULD) | S | S | S | S | S | – |
| G-50 security verification tests before sale | M | M | M | M | M | M |
| G-51 signed/encrypted diagnostic bundles (SHOULD) | S | S | S | S | S | S |
| G-52 local data encryption at rest (SHOULD) | S | S | S | S | S | S |

**Counts: 52 requirement IDs — 45 MUST, 7 SHOULD.** The seven SHOULD rows are `G-39`, `G-41`, `G-42`,
`G-46`, `G-49`, `G-51` and `G-52`; every other row is MUST. Two further candidate controls (§4.3
segmentation, §4.5 kiosk hardening) are stated as design conditions inside their sections and are not
given separate global IDs, so the count is not inflated.

---

## 14. Verification plan required before any security claim

All rows are `NOT_EXECUTED`. No laboratory, bench, vessel, attack or test authorisation exists
(`G3`–`G5 = NOT_AUTHORIZED`; `G6 = NOT_STARTED`). Requirement `SEC-G-44` (independent security review and
penetration test before any security claim) can only be evidenced by `SEC-V-01` and `SEC-V-10`; both are
`NOT_EXECUTED`.

| ID | Requirement (candidate) | Priority | Families | Evidence state |
|---|---|---|---|---|
| SEC-G-44 | An independent security review and a penetration test of a representative article are completed before any security claim or sale | MUST | All | `NOT_EXECUTED` |

| ID | Verification | Applies to | Status |
|---|---|---|---|
| SEC-V-01 | Threat-model review by an independent security reviewer against the real design | All | `NOT_EXECUTED` |
| SEC-V-02 | Boot-chain verification: fuse/OTP programming, signed image, tampered-image rejection, closed-device behaviour | HUB, WATCH, DISPLAY, AIS | `NOT_EXECUTED` |
| SEC-V-03 | Update fault injection: power loss at every stage, corrupt image, wrong model, rolled-back version, failed signature | All | `NOT_EXECUTED` |
| SEC-V-04 | Identity provisioning and revocation: per-device uniqueness, clone rejection, transfer/rebind, lost-device revocation | All | `NOT_EXECUTED` |
| SEC-V-05 | Service-access control: default-disabled, owner/installer grants, audit trail, brute-force lockout | All | `NOT_EXECUTED` |
| SEC-V-06 | Network segmentation and default-deny verification (port scans, inbound attempts, LAN/WAN boundary) | HUB, DISPLAY, WATCH | `NOT_EXECUTED` |
| SEC-V-07 | Local/offline and subscription-expiry isolation test (local data and local alarm survive) | HUB, WATCH, SENSE, DISPLAY | `NOT_EXECUTED` |
| SEC-V-08 | Alert-state honesty test: accepted vs delivered vs unknown vs acknowledged; offline device never "normal" | WATCH, HUB | `NOT_EXECUTED` |
| SEC-V-09 | SBOM generation and notice-bundle verification for a released firmware image and a programmed board | All | `NOT_EXECUTED` |
| SEC-V-10 | Penetration test on a representative article (LAN, radio, USB, update, service port) | All | `NOT_EXECUTED` |
| SEC-V-11 | Vulnerability-management dry run: intake, triage, CVE request, advisory, CRA-style reporting timelines | Programme | `NOT_EXECUTED` |
| SEC-V-12 | Data deletion and secure-erase verification on returned/resold hardware | HUB, WATCH, DISPLAY | `NOT_EXECUTED` |

A future `PASS` on these would support a security claim for a specific configuration. **No such claim can
be made in MC-11.**

---

## 15. Open security decisions that the programme must take (for D30)

| ID | Decision | Why it cannot be taken here | Owner |
|---|---|---|---|
| D27-D1 | HUB: build the appliance (D) or integrate a certified third-party gateway (E)? | Commercial-strategy decision above engineering; it changes the whole device-security burden (a certified gateway shifts firmware/update responsibility to the vendor, but then MAREA must document the trust boundary) | Lead |
| D27-D2 | Which secure element, given ATECC608B is NRND? | Requires lifecycle review, cost and second-source evidence; no alternative was retrieved | Hardware + sourcing |
| D27-D3 | Which update framework and signing infrastructure (RAUC/MCUboot/other; HSM ceremony)? | Requires funded NRE, key custody and manufacturing design | Engineering + security |
| D27-D4 | Support-period commitments per family and who funds the update service | Commercial decision; the CRA minimum is 5 years and update availability is 10 years or support period | Lead + commercial |
| D27-D5 | Does WATCH include a MAREA modem/SIM and therefore RED/operator certification? | Modem and SIM/eSIM strategy `UNKNOWN`; affects attack surface, update path and support period | Hardware + commercial |
| D27-D6 | AIS: build a receive-only receiver (P1) or integrate third-party receivers (P3/P4)? | Changes whether MAREA owns RF/firmware security or documents a third-party trust boundary | Lead |
| D27-D7 | Is a MAREA cloud service a remote-data-processing element of the product? | CRA scope question requiring legal analysis; not answerable from the fetched text alone | Compliance + counsel |
| D27-D8 | Economic-operator role per SKU (manufacturer/importer/distributor) | Legal/commercial, not engineering | Lead + counsel |

---

## 16. Non-assertions (verbatim, to be preserved in any reuse of this document)

1. No MAREA device, firmware, secure element integration, boot chain, signed update, provisioning system,
   SBOM, vulnerability process, support commitment or security test exists.
2. No CRA, RED cybersecurity, NIS2, ISO/SAE 21434, IEC 62443 or other compliance, certification or
   security-evaluation claim is made or implied.
3. No requirement in this document is implemented, verified, measured or independently reviewed.
4. No source IP is cleared; no OPEN-MARINE code, firmware or key-handling routine may be reused (D28).
5. No remote control, remote helm, actuator or command path is added by any requirement; `REMOTE_HELM_CONTROL
   = false` and `PILOT_SAFETY_GATE = BLOCKED` are preserved.
6. No failure alerting is described as guaranteed; alerting is conditional awareness with honest states.
7. No secure-element, MCU, SoC, bootloader, update framework or cloud provider is selected.
8. No cryptographic strength, attack resistance, availability, latency, support or delivery figure is
   asserted.

**Cross-references:** D28 (firmware IP and supply chain), `MC11-HUB-ARCHITECTURE.md` (D7 §4.11, §4.16,
§4.18, §9), `MC11-WATCH-SENSE-ARCHITECTURE.md` (D8 §2.6, §2.8), `MC11-AIS-DISPLAY-PILOT-BOUNDARIES.md`
(D9), `MC11-EMBEDDED-ARCHITECTURE-OPTIONS.md` (D4), `MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md` (D6 §3,
§5), `data/conformity-applicability.json`
(`LEG-CRA-2024-2847`, owned by the conformity workstream — referenced, not modified), `HARDWARE-COMPLIANCE-MATRIX.md`
§3.5–§3.6 (firmware/safety gaps of the legacy stack), `docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`,
`docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md` §8 and §27.
