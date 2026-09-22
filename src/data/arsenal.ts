import { ToolItem } from "@/types/portfolio";

export const SOC_ARSENAL: ToolItem[] = [
  // SIEM & Log Management
  {
    id: "splunk",
    name: "Splunk Enterprise / Cloud",
    category: "SIEM & Log Management",
    proficiency: "Advanced",
    levelPercent: 92,
    description: "Enterprise log aggregation, correlation searches, ES dashboarding, and complex SPL threat hunting pipelines.",
    useCase: "Hunting anomalous Kerberoasting tickets (Event 4769), lateral movement pivots, and creating scheduled alert triggers.",
    tags: ["SPL", "Data Models", "Enterprise Security", "CIM Compliance"],
    iconName: "Flame",
    highlightSyntax: `index=windows EventCode=4625 | stats count by src_ip, user | where count > 10`
  },
  {
    id: "elastic",
    name: "Elasticsearch / Kibana (ELK)",
    category: "SIEM & Log Management",
    proficiency: "Advanced",
    levelPercent: 88,
    description: "Real-time log ingestion pipeline via Fleet & Logstash, Fleet Agent telemetry, and EQL correlation rules.",
    useCase: "Building Lucene queries and timeline visualization for authentication spikes and proxy web logs.",
    tags: ["EQL", "KQL", "Fleet Agent", "Logstash", "Index Lifecycle"],
    iconName: "Search",
    highlightSyntax: `process where process.name == "cmd.exe" and process.parent.name == "excel.exe"`
  },
  {
    id: "wazuh",
    name: "Wazuh XDR / SIEM",
    category: "SIEM & Log Management",
    proficiency: "Advanced",
    levelPercent: 90,
    description: "Open-source host security platform with File Integrity Monitoring (FIM), rootkit detection, and active response.",
    useCase: "Writing custom decoders and XML rule hierarchies to identify brute force and unauthorized privilege changes.",
    tags: ["FIM", "XML Rules", "Decoders", "Active Response", "SCA"],
    iconName: "ShieldAlert",
    highlightSyntax: `<rule id="100055" level="10">\n  <if_matched_sid>5710</if_matched_sid>\n  <same_source_ip />\n  <description>Possible SSH Brute Force</description>\n</rule>`
  },
  {
    id: "sentinel",
    name: "Microsoft Sentinel",
    category: "SIEM & Log Management",
    proficiency: "Proficient",
    levelPercent: 82,
    description: "Cloud-native SIEM/SOAR leveraging Kusto Query Language (KQL), Azure Activity, and Microsoft Defender XDR connectors.",
    useCase: "Investigating Entra ID Risky Sign-ins and Office 365 mailbox forwarding rule creations.",
    tags: ["KQL", "Azure AD / Entra", "Analytics Rules", "Playbooks"],
    iconName: "CloudLightning",
    highlightSyntax: `SigninLogs | where ResultType == "50126" | summarize count() by IPAddress, UserPrincipalName`
  },

  // Network Forensics
  {
    id: "wireshark",
    name: "Wireshark",
    category: "Network Forensics",
    proficiency: "Advanced",
    levelPercent: 94,
    description: "Deep packet inspection, protocol dissection (TCP/UDP, DNS, HTTP, SMB), stream reconstruction, and export of objects.",
    useCase: "Extracting suspicious payloads from SMB/HTTP streams and identifying rogue DNS exfiltration tunnels.",
    tags: ["Packet Analysis", "TLS Handshakes", "TCP Stream Follow", "Carving"],
    iconName: "Activity",
    highlightSyntax: `http.request.method == "POST" || (dns.flags.response == 1 && dns.count.answers > 5)`
  },
  {
    id: "zeek",
    name: "Zeek (formerly Bro)",
    category: "Network Forensics",
    proficiency: "Proficient",
    levelPercent: 85,
    description: "Behavior-based network security monitoring producing transaction logs for DNS, HTTP, SSL, and connection states.",
    useCase: "Parsing conn.log and ssl.log for anomalous JA3 fingerprints, self-signed certificates, and high connection frequency.",
    tags: ["conn.log", "JA3/JA3S", "dns.log", "Behavioral Anomaly"],
    iconName: "Cpu",
    highlightSyntax: `zeek-cut id.orig_h id.resp_h duration orig_bytes < conn.log | sort -rn`
  },
  {
    id: "tcpdump",
    name: "tcpdump",
    category: "Network Forensics",
    proficiency: "Advanced",
    levelPercent: 89,
    description: "Command-line packet analyzer for targeted capture on Linux gateways, servers, and tap interfaces with BPF filters.",
    useCase: "Capturing targeted egress telemetry on perimeter firewalls during active suspicious connection investigations.",
    tags: ["BPF Filters", "CLI Capture", "PCAP Export", "Network TAP"],
    iconName: "Terminal",
    highlightSyntax: `tcpdump -nn -i eth0 'tcp[tcpflags] & (tcp-syn) != 0 and dst port 443' -w out.pcap`
  },

  // Endpoint & Threat Intel
  {
    id: "sysmon",
    name: "Microsoft Sysmon",
    category: "Endpoint & Intel",
    proficiency: "Advanced",
    levelPercent: 93,
    description: "Windows system service logging high-fidelity events (Process Creation EID 1, Network Connect EID 3, Image Load EID 7).",
    useCase: "Tuning XML configurations (SwiftOnSecurity baseline) to track living-off-the-land binaries (LOLBins).",
    tags: ["Event ID 1/3/7/11", "LOLBins", "SwiftOnSecurity", "Parent-Child Process"],
    iconName: "Monitor",
    highlightSyntax: `<ProcessCreate onmatch="include">\n  <ParentImage condition="image">cmd.exe</ParentImage>\n  <Image condition="image">powershell.exe</Image>\n</ProcessCreate>`
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    category: "Endpoint & Intel",
    proficiency: "Proficient",
    levelPercent: 82,
    description: "Advanced digital forensics and incident response (DFIR) endpoint query framework using VQL (Velociraptor Query Language).",
    useCase: "Triaging 200+ endpoints simultaneously for suspicious MFT timestamps, scheduled tasks, and memory artifacts.",
    tags: ["VQL", "Live Forensics", "MFT Triage", "YARA Memory Hunting"],
    iconName: "Zap",
    highlightSyntax: `SELECT * FROM Artifact.Windows.System.TaskScheduler() WHERE Details =~ "powershell"`
  },
  {
    id: "virustotal",
    name: "VirusTotal / Any.Run",
    category: "Endpoint & Intel",
    proficiency: "Advanced",
    levelPercent: 91,
    description: "Multi-engine static analysis, sandbox execution telemetry, dynamic behavioral graphs, and threat intelligence pivoting.",
    useCase: "Validating triage hashes, extracting C2 staging URLs from dropped payloads, and analyzing macro execution chains.",
    tags: ["Hash Triage", "Dynamic Sandbox", "Process Trees", "IOC Extraction"],
    iconName: "Crosshair",
    highlightSyntax: `VT API: /api/v3/files/{hash}/behaviour_summary`
  },
  {
    id: "mitre",
    name: "MITRE ATT&CK Framework",
    category: "Endpoint & Intel",
    proficiency: "Advanced",
    levelPercent: 95,
    description: "Tactics, Techniques, and Procedures (TTPs) mapping to identify adversary behavior and validate detection coverage.",
    useCase: "Mapping alert triggers across the kill chain and prioritizing detection rules for unmonitored ATT&CK techniques.",
    tags: ["TTPs", "ATT&CK Navigator", "Defensive Gap Analysis", "Kill Chain"],
    iconName: "Layers",
    highlightSyntax: `T1059.001 (PowerShell) -> T1021.004 (SSH Lateral) -> T1071.001 (Web C2)`
  },

  // OS & Scripting
  {
    id: "kali-linux",
    name: "Linux / Kali Environment",
    category: "OS & Scripting",
    proficiency: "Advanced",
    levelPercent: 92,
    description: "Deep knowledge of Linux security architecture, PAM, auth.log, auditd, permissions auditing, and bash pipelines.",
    useCase: "Investigating persistence via crontab, systemd units, unauthorized SSH keys, and bash command history manipulation.",
    tags: ["auditd", "auth.log", "systemd", "Bash Triage", "PAM"],
    iconName: "HardDrive",
    highlightSyntax: `grep -i "Accepted" /var/log/auth.log | awk '{print $1, $2, $3, $9, $11}'`
  },
  {
    id: "windows-internals",
    name: "Windows Event Logs & AD",
    category: "OS & Scripting",
    proficiency: "Advanced",
    levelPercent: 93,
    description: "Deep understanding of Windows Security event codes (4624, 4625, 4720, 4672, 4688), Kerberos tickets, and NTDS.",
    useCase: "Auditing domain controller logs for golden/silver tickets, DCSync attempts (4662), and local admin escalations.",
    tags: ["Security.evtx", "Kerberos", "Event ID 4625", "Event ID 4688", "NTLM"],
    iconName: "FolderLock",
    highlightSyntax: `Get-WinEvent -FilterHashtable @{LogName='Security'; Id=4625} -MaxEvents 50`
  },
  {
    id: "python-automation",
    name: "Python for Security",
    category: "OS & Scripting",
    proficiency: "Proficient",
    levelPercent: 86,
    description: "Automating repetitive SOC triage tasks: defanging IOCs, API querying (AbuseIPDB, VirusTotal), parsing PCAPs and EVTX.",
    useCase: "Building CLI scripts for bulk IP reputation checks and automated parsing of firewall syslog exports.",
    tags: ["Requests", "Scapy", "python-evtx", "Regex Parsing", "Automation"],
    iconName: "Code",
    highlightSyntax: `def defang_ioc(indicator): return indicator.replace(".", "[.]").replace("http", "hxxp")`
  },
  {
    id: "powershell",
    name: "PowerShell & Scriptblock Triage",
    category: "OS & Scripting",
    proficiency: "Advanced",
    levelPercent: 90,
    description: "Deobfuscating malicious PowerShell, base64 payload decoding, analyzing Event ID 4104 (ScriptBlock Logging).",
    useCase: "Detecting encoded commands (-e, -enc), download cradles (Invoke-WebRequest, DownloadString), and AMSI bypasses.",
    tags: ["Event ID 4104", "Deobfuscation", "AMSI", "Base64 Decoding"],
    iconName: "FileCode",
    highlightSyntax: `[System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String($encoded))`
  }
];
