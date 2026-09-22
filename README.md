<div align="center">

# 🛡️ Defensive Security Specialist & SOC Analyst Portfolio
### Enterprise-Grade Detection Engineering, Threat Hunting & Incident Response Workbench

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MITRE ATT&CK](https://img.shields.io/badge/MITRE_ATT%26CK-Enterprise_Matrix-orange?style=for-the-badge&logo=target&logoColor=white)](https://attack.mitre.org/)
[![TryHackMe](https://img.shields.io/badge/TryHackMe-Top_5%25_Global-red?style=for-the-badge&logo=tryhackme&logoColor=white)](https://tryhackme.com/)
[![RFC 9116](https://img.shields.io/badge/Security.txt-RFC_9116_Compliant-emerald?style=for-the-badge&logo=shield&logoColor=white)](/.well-known/security.txt)

<p align="center">
  <b>A production-grade, highly responsive web portfolio and interactive defensive security playground built for a Tier 1 / Tier 2 Security Operations Center (SOC) Analyst and Threat Hunter.</b>
</p>

[Live Demo](http://localhost:3000) • [Explore Investigations](#-featured-soc-incident-investigations) • [Interactive Tools](#-advanced-interactive-workbench-modules) • [Homelab Topology](#-homelab-architecture--telemetry-topology) • [Quick Start](#-quick-start--installation)

</div>

---

## 📋 Executive Overview

This portfolio is engineered specifically for defensive cybersecurity roles, showcasing verifiable expertise across the entire threat triage lifecycle: from perimeter packet inspection and SIEM log correlation down to endpoint living-off-the-land (LOLBins) detection and automated containment playbooks.

All telemetry, IP addresses (`RFC 5737` / `RFC 1918`), hostnames, and indicators of compromise (IoCs) adhere to strict sanitization and responsible disclosure standards.

---

## 🚀 Key Modules & Interactive Features

### 1. 🛰️ SOC Command Center & Live Telemetry Stream
- **DEFCON Readiness Status**: Real-time interactive defense condition indicator (`DEFCON 3 WATCH` / `DEFCON 2 ELEVATED` / `DEFCON 1 ACTIVE INCIDENT`).
- **Live Ingestion Daemon**: Continuous streaming log feed simulating real enterprise alerts from *Zeek, Wazuh (Rule 100055), Sysmon (Event ID 1), Suricata, and Splunk ES*.
- **Threat Alert Injection**: Interactive `Simulate Threat Alert` button triggering instant host quarantine telemetry.
- **Cyber Radar Scanner**: Non-blocking radial radar sweep micro-animation embedded in the monitoring terminal.

### 2. 🔍 Interactive Web PCAP Packet Dissector (Wireshark Inspector)
- **Three-Pane Inspection Layout**:
  - **Packet List**: Frame No, Delta Time, Source/Dest IP, Protocol, Length, and Info Header.
  - **Protocol Tree**: Collapsible decoding of *Frame ➔ Ethernet II ➔ IPv4 ➔ TCP ➔ TLS 1.3 Client Hello (SNI, JA3 Fingerprint Hash, Cipher Suites)*.
  - **Hexadecimal / ASCII Dump**: Real-time payload offset `0x0000` inspector with one-click copy.
- **Protocol Filters**: Instant toggle between `ALL`, `TCP`, and `TLSv1.3` streams.

### 3. 💻 Client-Side Live SIEM Query Sandbox
- **In-Memory Log Search Engine**: Test detection queries against realistic *Windows Security.evtx, Sysmon, Zeek conn.log, and Linux auth.log* entries.
- **One-Click Presets**:
  - `Failed password` — Linux SSH Brute Force
  - `WINWORD.EXE` — Malicious Macro LOLBins Spawning PowerShell
  - `4625` — Windows Failed Authentication
  - `proto:tcp` — Network Connection States
- **Live Hit Counter & JSON Inspector**: Real-time matched event count and expandable structured JSON field breakdown.

### 4. 🗺️ Interactive MITRE ATT&CK® Matrix Heatmap
- **Kill Chain Coverage**: *Initial Access, Execution, Persistence, Credential Access, Lateral Movement, Command & Control*.
- **Technique Deep-Dive**: Selecting technique cards (e.g. `T1110.001`, `T1071.001`, `T1566.001`) reveals production detection query logic, defensive hardening recommendations, and links to corresponding incident case studies.

### 5. 🔬 Featured SOC Incident Investigations
Detailed case studies with step-by-step telemetry timelines, detection queries, containment actions, and defanged IoCs (`[.]` and `hxxp`):
1. **Incident 01:** *Brute Force & SSH Lateral Movement Detection* (Wazuh / Linux auth.log / Event 4625)
2. **Incident 02:** *C2 Beaconing Traffic Analysis & TLS Fingerprinting* (Wireshark / Zeek conn.log / JA3 / Jitter Calculation)
3. **Incident 03:** *Phishing Execution via Malicious Macro & LOLBins* (Sysmon Event ID 1 / VirusTotal / M365 Exchange Purge)
- **Formal PDF Export**: One-click printable executive report view formatted for management and audit reviews.

### 6. 🌐 Virtual Homelab & Network Packet Tracer
- **Multi-VLAN Architecture**:
  - **VLAN 10 (Perimeter/DMZ)**: pfSense CE Firewall + Kali Linux Adversary Simulation.
  - **VLAN 20 (Corporate LAN)**: Windows Server 2022 (AD DS Domain Controller) + Windows 11 Enterprise with Sysmon 15.14.
  - **VLAN 30 (SOC & SIEM)**: Wazuh Manager, Elasticsearch 8.x, and Kibana Dashboard.
- **Live Packet Flow Tracer**: Dynamic simulation tracing attack traffic through the firewall into the client workstation and SIEM ingestion pipeline with dynamic ping latency.
- **Interactive Node Inspector**: Click nodes to inspect specs, monitored log paths, installed agents, and sample raw JSON logs.

### 7. ⌨️ Keyboard-Driven Command Palette (`Ctrl + K` / `⌘K`)
- Spotlight-style popup palette for instant fuzzy navigation to any tool, investigation, homelab node, or action (*"Download Resume"*, *"Copy PGP Key Block"*, *"Copy Fingerprint"*).

### 8. 🌙 OLED Pure Black Mode & Web Audio Cyber Sound FX
- **Theme Switcher**: Instant toggle between Tactical Slate (`#090d16`) and Pure OLED Black (`#000000`).
- **Native Audio Synthesis**: Synthesizes 950Hz–1400Hz frequency blips via the browser's native `AudioContext` without external sound files (default muted).

### 9. 📱 Mobile Bottom Action Bar
- Sticky thumb-friendly mobile navigation bar on small devices providing quick access to Overview, Arsenal, Cases, Lab, Search, and Resume.

### 10. 🔒 RFC 9116 Responsible Disclosure & PGP
- Compliant [`/.well-known/security.txt`](/.well-known/security.txt) and downloadable armored [`/pgp.asc`](/pgp.asc).

---

## 🛠️ Defensive Technology Arsenal

| Category | Tools & Technologies |
| :--- | :--- |
| **SIEM & Log Correlation** | Splunk Enterprise (SPL), Microsoft Sentinel (KQL), Wazuh XDR/SIEM, Elastic/ELK, Logstash |
| **Network Forensics** | Wireshark, Zeek (conn/ssl/dns), tcpdump, Suricata IDS/IPS, BPF Syntax, JA3/JA3S Fingerprinting |
| **Endpoint & Threat Intel** | Microsoft Sysmon, Velociraptor (VQL), VirusTotal API, Any.Run Sandbox, MITRE ATT&CK, Sigma Rules |
| **OS & Scripting** | Linux (Ubuntu/Kali), Windows Server (AD DS), PowerShell Scriptblock (EID 4104), Bash, Python 3 |

---

## ⚡ Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18.17+ or v20+ (Tested on v22.17.0)
- npm v9+ (Tested on v10.9.2)

### 1. Clone Repository
```bash
git clone https://github.com/icebergf6/soc-analyst-portfolio.git
cd soc-analyst-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Repository Directory Architecture

```
soc-analyst-portfolio/
├── public/
│   ├── .well-known/
│   │   └── security.txt               # RFC 9116 Security Contact Policy
│   ├── resume/
│   │   └── sanitized_soc_resume.txt   # Public Sanitized Resume
│   ├── pgp.asc                        # Armored PGP Public Key Block
│   └── security.txt                   # Standard fallback security policy
├── src/
│   ├── app/
│   │   ├── globals.css                # Cyber grid, radar animations, custom scrollbars
│   │   ├── layout.tsx                 # Root layout with Geist fonts & SEO metadata
│   │   └── page.tsx                   # Main orchestrator dashboard
│   ├── components/
│   │   ├── Navbar.tsx                 # Glassmorphic header & status indicator
│   │   ├── Hero.tsx                   # Command center, DEFCON pill & live telemetry
│   │   ├── CertBadges.tsx             # TryHackMe, HTB, and certification credentials
│   │   ├── ArsenalMatrix.tsx          # Categorized tools grid with search & copy syntax
│   │   ├── SiemSandbox.tsx            # Live SPL/KQL log filtering playground
│   │   ├── CaseStudies.tsx            # 3 detailed incident cards
│   │   ├── IncidentModal.tsx          # Deep incident investigation modal with PDF export
│   │   ├── MitreMatrix.tsx            # Interactive MITRE ATT&CK matrix heatmap
│   │   ├── PcapDissector.tsx          # Web-based Wireshark packet stream dissector
│   │   ├── HomelabTopology.tsx        # Multi-VLAN topology & packet tracer
│   │   ├── TechnicalWriteups.tsx      # Filterable blue team CTF walkthroughs
│   │   ├── WriteupModal.tsx           # Full research article reading modal
│   │   ├── SanitizedResumeModal.tsx   # In-browser sanitized resume preview
│   │   ├── CommandPalette.tsx         # Ctrl+K Spotlight keyboard navigation
│   │   ├── ThemeAudioControls.tsx     # OLED pure black toggle & Web Audio sound FX
│   │   ├── MobileBottomBar.tsx        # Responsive mobile action navigation bar
│   │   ├── Toast.tsx                  # Floating copy notification toast
│   │   └── Footer.tsx                 # Sanitized data disclaimer & collapsible PGP key
│   ├── data/
│   │   ├── arsenal.ts                 # SOC tools metadata & query syntax
│   │   ├── incidents.ts               # Realistic incident timelines, queries & IoCs
│   │   ├── homelab.ts                 # Topology nodes, specs & sample logs
│   │   ├── mitre.ts                   # MITRE ATT&CK tactics & mapped techniques
│   │   ├── pcapData.ts                # Sanitized PCAP frames & protocol trees
│   │   ├── siemLogs.ts                # Realistic logs for SIEM sandbox
│   │   ├── writeups.ts                # CTF walkthroughs & detection articles
│   │   ├── certs.ts                   # Platform badges & credentials
│   │   └── pgp.ts                     # PGP key, fingerprint & contact info
│   └── types/
│       └── portfolio.ts               # TypeScript data models
├── next.config.ts                     # Turbopack root configuration
├── tsconfig.json                      # Strict TypeScript compiler options
└── package.json                       # Scripts and project dependencies
```

---

## 🔐 Sanitized Security Disclosure & Ethics

All scenarios, network captures, log events, and hashes documented herein were gathered from legally authorized virtual ranges, CTF environments, and self-hosted homelabs. All identifiers conform strictly to:
- **RFC 5737**: IPv4 Address Blocks Reserved for Documentation (`198.51.100.0/24`, `203.0.113.0/24`)
- **RFC 1918**: Address Allocation for Private Internets (`10.0.0.0/8`, `192.168.0.0/16`)
- **Defanged Indicators**: Automated URL/Domain defanging (`hxxp://`, `[.]`) to eliminate accidental execution risks.

---

## 📄 License & Attribution

Distributed under the **MIT License**. Created with pride for the defensive security and blue team community.

<div align="center">
  <sub>Engineered by a Defensive Security Specialist & SOC Analyst. SHA-256 Verified.</sub>
</div>
