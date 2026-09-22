import { IncidentCase } from "@/types/portfolio";

export const CASE_STUDIES: IncidentCase[] = [
  {
    id: "case-01",
    title: "SSH Brute-Force & Lateral Movement Attempt",
    severity: "High",
    mitreTechniques: [
      { id: "T1110.001", name: "Password Guessing", url: "https://attack.mitre.org/techniques/T1110/001/" },
      { id: "T1021.004", name: "Remote Services: SSH", url: "https://attack.mitre.org/techniques/T1021/004/" },
      { id: "T1078.003", name: "Valid Accounts: Local Accounts", url: "https://attack.mitre.org/techniques/T1078/003/" }
    ],
    summaryPreview: "Wazuh Rule 5710 fired after 4,200+ failed authentications against DMZ Jump Host, followed by Event ID 4625/auth.log success and unauthorized lateral SSH pivot.",
    executiveSummary: "At 03:14 UTC, Wazuh SIEM triggered high-priority alert (Rule 5710/100055) identifying an external IP conducting automated dictionary attacks against DMZ Jump Host (198.51.100.45). Within 18 minutes, the attacker compromised service account 'svc_backup', immediately originating an outbound SSH session into the internal production database (10.20.4.15). Prompt host isolation stopped privilege escalation and database dumps.",
    environment: "Enterprise Hybrid Cloud (Linux Ubuntu 22.04 LTS Jump Host & Debian Database)",
    detectedBy: "Wazuh SIEM Rule 5710 / 100055 & Splunk CIM Model",
    mttdTriage: "14 minutes",
    badgeTags: ["Wazuh Rule 5710", "Event ID 4625", "MITRE T1110.001", "Lateral Movement"],
    timeline: [
      {
        timestamp: "2026-08-14 03:12:04 UTC",
        phase: "Initial Access",
        host: "dmz-jumphost-01 (198.51.100.45)",
        description: "Inbound SSH connection burst from external IP 203.0.113.88. Multiple rapid failed login attempts for usernames root, admin, and svc_backup.",
        telemetrySource: "/var/log/auth.log / Wazuh Alert ID 1692015124.891",
        eventSnippet: "Aug 14 03:12:04 dmz-jumphost-01 sshd[18421]: Failed password for invalid user admin from 203.0.113.88 port 48192 ssh2"
      },
      {
        timestamp: "2026-08-14 03:26:19 UTC",
        phase: "Initial Access",
        host: "dmz-jumphost-01 (198.51.100.45)",
        description: "Authentication succeeded for user 'svc_backup' using password auth after 4,210 failed attempts. Interactive pseudo-terminal allocated.",
        telemetrySource: "/var/log/auth.log (pam_unix session opened)",
        eventSnippet: "Aug 14 03:26:19 dmz-jumphost-01 sshd[18944]: Accepted password for svc_backup from 203.0.113.88 port 51204 ssh2"
      },
      {
        timestamp: "2026-08-14 03:28:40 UTC",
        phase: "Discovery",
        host: "dmz-jumphost-01 (198.51.100.45)",
        description: "Attacker executed local enumeration: 'whoami', 'id', 'cat /etc/passwd', and discovered unencrypted SSH private key in /home/svc_backup/.ssh/id_rsa.",
        telemetrySource: "auditd (execve SYSCALL) & Bash History",
        eventSnippet: "type=EXECVE msg=audit(1692015320.102:451): argc=3 a0=\"cat\" a1=\"/home/svc_backup/.ssh/id_rsa\""
      },
      {
        timestamp: "2026-08-14 03:31:05 UTC",
        phase: "Lateral Movement",
        host: "dmz-jumphost-01 -> prod-db-01 (10.20.4.15)",
        description: "Attacker initiated lateral SSH connection using stolen key into internal database server 10.20.4.15 without 2FA challenge.",
        telemetrySource: "Zeek conn.log & iptables connection tracking",
        eventSnippet: "conn.log: orig_h: 10.10.1.45 orig_p: 44190 resp_h: 10.20.4.15 resp_p: 22 proto: tcp service: ssh"
      },
      {
        timestamp: "2026-08-14 03:35:10 UTC",
        phase: "Containment",
        host: "SOC Management Console",
        description: "Analyst severed DMZ SSH sessions, blocked source IP at perimeter edge firewall, and revoked compromised SSH keypair.",
        telemetrySource: "Palo Alto Firewall API & Wazuh Active Response",
        eventSnippet: "Active Response: host-deny triggered for 203.0.113.88. Key revoked in authorized_keys."
      }
    ],
    queries: [
      {
        platform: "Splunk (SPL)",
        syntax: `index=linux_auth (sourcetype="linux_secure" OR sourcetype="syslog") "Failed password"
| stats count as failed_count, dc(user) as distinct_users by src_ip, dest
| where failed_count > 50
| join type=left src_ip [
    search index=linux_auth "Accepted password"
    | stats count as success_count, latest(_time) as success_time by src_ip, user, dest
]
| where isnotnull(success_count)
| table src_ip, failed_count, success_count, dest`,
        explanation: "Correlates high-frequency authentication failures with subsequent success from identical source IP within tight timeframe."
      },
      {
        platform: "Wazuh Rule / XML",
        syntax: `<group name="syslog,sshd,">
  <rule id="100055" level="12" frequency="15" timeframe="120">
    <if_matched_sid>5710</if_matched_sid>
    <same_source_ip />
    <description>SOC-ALERT: SSH brute force attempt followed by successful logon</description>
    <mitre>
      <id>T1110.001</id>
    </mitre>
  </rule>
</group>`,
        explanation: "Custom Wazuh rule with threshold frequency matching multiple failed SSH events prior to logon."
      }
    ],
    iocs: [
      { type: "IP", value: "203.0.113[.]88", context: "Attacker external brute force source IP (Origin: Bulletproof VPS)", confidence: "Confirmed" },
      { type: "IP", value: "198.51.100[.]45", context: "Compromised DMZ bastion host external interface", confidence: "Confirmed" },
      { type: "IP", value: "10.20.4[.]15", context: "Target internal database server (lateral target)", confidence: "High" },
      { type: "File Path", value: "/home/svc_backup/.ssh/id_rsa", context: "Exfiltrated private key file", confidence: "Confirmed" }
    ],
    containmentActions: [
      "Severed all active SSH pseudo-terminals under PID 18944.",
      "Added external IP 203.0.113[.]88 to global edge firewall drop list.",
      "Rotated SSH keypair for 'svc_backup' and disabled interactive password auth in sshd_config.",
      "Isolated DMZ Jump Host into quarantine VLAN for memory dump and rootkit audit."
    ],
    mitigationAdvice: [
      "Enforce public-key only authentication (PasswordAuthentication no).",
      "Implement Multi-Factor Authentication (MFA) via Duo / Google PAM.",
      "Deploy Fail2ban / Wazuh Active Response with aggressive ban duration (24h) after 5 failed attempts.",
      "Restrict service accounts from interactive shell logins (/usr/sbin/nologin)."
    ],
    lessonsLearned: "Service account 'svc_backup' had predictable credentials that bypassed the key-only policy due to an onboarding oversight."
  },
  {
    id: "case-02",
    title: "Cobalt Strike C2 Beaconing Detection",
    severity: "Critical",
    mitreTechniques: [
      { id: "T1071.001", name: "Application Layer Protocol: Web Protocols", url: "https://attack.mitre.org/techniques/T1071/001/" },
      { id: "T1573.002", name: "Encrypted Channel: Asymmetric Cryptography", url: "https://attack.mitre.org/techniques/T1573/002/" },
      { id: "T1008", name: "Fallback Channels", url: "https://attack.mitre.org/techniques/T1008/" }
    ],
    summaryPreview: "Discovered low-and-slow command-and-control beaconing disguised as legitimate HTTPS with strict 60s (+/- 10% jitter) intervals using Wireshark PCAP analysis and Zeek conn.log.",
    executiveSummary: "Periodic outbound HTTPS requests were observed originating from an accounting workstation (10.20.2.104) towards an unclassified foreign domain 'cdn-update-sync[.]com' (198.51.100.180). Traffic inspection revealed strict timing regularity (60s interval with ~10% jitter), fixed payload size variance, and a rogue JA3 fingerprint associated with Cobalt Strike Malleable C2 HTTPS profiles.",
    environment: "Corporate Windows 11 Enterprise Endpoint & Perimeter Zeek / Suricata Sensor",
    detectedBy: "Zeek conn.log frequency analysis & Suricata JA3 rule",
    mttdTriage: "22 minutes",
    badgeTags: ["Wireshark PCAP", "TLS Jitter", "MITRE T1071.001", "JA3/JA3S"],
    timeline: [
      {
        timestamp: "2026-08-20 14:15:30 UTC",
        phase: "C2 Communication",
        host: "PC-FINANCE-04 (10.20.2.104)",
        description: "Initial TLS handshake established to 198.51.100.180:443 (cdn-update-sync[.]com). SNI matched high-entropy domain registered 3 days prior.",
        telemetrySource: "Zeek ssl.log / dns.log",
        eventSnippet: "ssl.log: server_name: cdn-update-sync[.]com ja3: a0e9f5d64349fb13191bc781f81f42e1"
      },
      {
        timestamp: "2026-08-20 14:16:32 UTC",
        phase: "C2 Communication",
        host: "PC-FINANCE-04 (10.20.2.104)",
        description: "Second connection with identical TCP window size (64240), TLS cipher list, and 62-second delta (60s sleep with ~3% jitter).",
        telemetrySource: "Wireshark PCAP Stream 14",
        eventSnippet: "Delta time from previous frame in conversation: 62.140881 seconds"
      },
      {
        timestamp: "2026-08-20 14:45:00 UTC",
        phase: "Detection",
        host: "Perimeter Security Gateway",
        description: "Automated jitter detection script flagged 30 sequential connections with standard deviation < 4.2 seconds and fixed byte response ratio.",
        telemetrySource: "SOC Behavioral Anomaly Engine",
        eventSnippet: "Anomaly Score: 98/100 | Jitter: 8.7% | Mean Interval: 59.8s | Destination: 198.51.100.180"
      },
      {
        timestamp: "2026-08-20 15:02:11 UTC",
        phase: "Containment",
        host: "SOC Firewall / EDR Agent",
        description: "Network quarantine command dispatched to endpoint EDR agent. Blackholed C2 domain on internal DNS resolvers and boundary proxies.",
        telemetrySource: "EDR Console & Pi-hole DNS sinkhole",
        eventSnippet: "Endpoint network containment status: SUCCESSFUL. Host quarantined."
      }
    ],
    queries: [
      {
        platform: "Wireshark Display Filter",
        syntax: `ip.addr == 10.20.2.104 && tls.handshake.type == 1 && (tls.handshake.extensions_server_name contains "sync" || tcp.port == 443)`,
        explanation: "Filters Client Hello packets from target workstation to isolate outgoing TLS negotiations and extract SNI and Cipher Suites."
      },
      {
        platform: "Microsoft Sentinel (KQL)",
        syntax: `CommonSecurityLog
| where DeviceVendor =~ "Zeek" or DeviceVendor =~ "Palo Alto Networks"
| where DestinationPort == 443 and isnotempty(DestinationIP)
| summarize ConnectionCount = count(), 
    AvgBytesSent = avg(SentBytes), 
    TimeDiff = make_list(TimeGenerated) 
    by SourceIP, DestinationIP, bin(TimeGenerated, 1h)
| extend JitterDelta = series_fir(TimeDiff)
| where ConnectionCount > 40 and AvgBytesSent < 2048
| project TimeGenerated, SourceIP, DestinationIP, ConnectionCount, AvgBytesSent`,
        explanation: "Detects uniform beaconing signatures by grouping persistent, low-byte outbound sessions occurring over an extended continuous window."
      }
    ],
    iocs: [
      { type: "IP", value: "198.51.100[.]180", context: "Cobalt Strike C2 server IP address", confidence: "Confirmed" },
      { type: "Domain", value: "cdn-update-sync[.]com", context: "Malicious masquerading C2 domain", confidence: "Confirmed" },
      { type: "SHA256", value: "7f8b9e11c2a05d4ef289901ad39401bf5e921d4c8038167f25971a82da1b4a92", context: "Injected memory beacon payload extracted from spoolsv.exe process memory", confidence: "High" },
      { type: "Registry", value: "JA3: a0e9f5d64349fb13191bc781f81f42e1", context: "Custom TLS client fingerprint corresponding to Cobalt Strike malleable profile", confidence: "Confirmed" }
    ],
    containmentActions: [
      "Triggered host-level network containment on PC-FINANCE-04 via EDR console.",
      "Added C2 IP 198.51.100[.]180 and wildcard domain *.cdn-update-sync[.]com to border proxy and DNS sinkhole.",
      "Captured volatile memory dump (dump.raw) of PC-FINANCE-04 for volatility3 analysis prior to re-imaging.",
      "Audited all enterprise workstations for historical queries to malicious domain."
    ],
    mitigationAdvice: [
      "Implement TLS/SSL inspection with proxy decryption for enterprise traffic to newly registered domains (NRDs).",
      "Block outbound web connections to domains registered less than 30 days old automatically.",
      "Deploy JA3/JA3S fingerprint matching signatures within perimeter IDS/IPS sensors."
    ],
    lessonsLearned: "Adversaries bypassed signature-based AV by loading the beacon directly into memory. Network behavioral jitter analysis was the critical factor in detection."
  },
  {
    id: "case-03",
    title: "Malicious Macro Execution & Persistence via Task Scheduler",
    severity: "Critical",
    mitreTechniques: [
      { id: "T1566.001", name: "Spearphishing Attachment", url: "https://attack.mitre.org/techniques/T1566/001/" },
      { id: "T1059.005", name: "Command and Scripting Interpreter: Visual Basic", url: "https://attack.mitre.org/techniques/T1059/005/" },
      { id: "T1053.005", name: "Scheduled Task/Job: Scheduled Task", url: "https://attack.mitre.org/techniques/T1053/005/" }
    ],
    summaryPreview: "Weaponized invoice triggered WINWORD.EXE -> powershell.exe anomaly (Sysmon Event 1), encoded download cradle, and persistence creation via Task Scheduler (Event ID 106).",
    executiveSummary: "A targeted phishing email containing 'INVOICE_Q3_SUMMARY.docm' bypassed initial spam filtering. An unsuspecting user enabled VBA macros, spawning cmd.exe and hidden PowerShell processes to retrieve a secondary payload and create persistence via Windows Task Scheduler (Event ID 106 / TaskName: WindowsUpdateCheck). Sysmon Event ID 1 caught the anomalous parent-child relationship within 90 seconds.",
    environment: "Windows 10 Enterprise (Build 19045) & Microsoft 365 Exchange Online",
    detectedBy: "Sysmon Event ID 1 & TaskScheduler Event ID 106",
    mttdTriage: "11 minutes",
    badgeTags: ["Sysmon EID 1", "Event ID 106", "MITRE T1059.005", "Task Scheduler"],
    timeline: [
      {
        timestamp: "2026-09-02 09:18:22 UTC",
        phase: "Initial Access",
        host: "PC-HR-02 (10.20.1.55)",
        description: "User opened email attachment 'INVOICE_Q3_SUMMARY.docm' received from spoofed vendor address 'billing@vendor-invoices[.]net'.",
        telemetrySource: "Exchange MailTrace & Outlook Telemetry",
        eventSnippet: "MessageID: <91823.1102@vendor-invoices[.]net> | Subject: Overdue Invoice Payment Urgent"
      },
      {
        timestamp: "2026-09-02 09:20:05 UTC",
        phase: "Execution",
        host: "PC-HR-02 (10.20.1.55)",
        description: "WINWORD.EXE spawned cmd.exe which launched an obfuscated base64 encoded PowerShell instance with windowstyle hidden.",
        telemetrySource: "Sysmon Event ID 1 (Process Create)",
        eventSnippet: "ParentImage: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\nImage: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\nCommandLine: powershell.exe -w hidden -enc JABzAD0ATgBlAHcALQBPAGIAag..."
      },
      {
        timestamp: "2026-09-02 09:20:18 UTC",
        phase: "Persistence",
        host: "PC-HR-02 (10.20.1.55)",
        description: "Task Scheduler Event ID 106 logged task registration: 'WindowsUpdateCheck' scheduled to execute payload.exe at system logon as SYSTEM.",
        telemetrySource: "Microsoft-Windows-TaskScheduler/Operational Event ID 106",
        eventSnippet: "User 'CORP\\hr_user' registered Task '\\WindowsUpdateCheck' with Action 'C:\\Users\\Public\\payload.exe'"
      },
      {
        timestamp: "2026-09-02 09:24:45 UTC",
        phase: "Detection",
        host: "SOC SIEM Dashboard",
        description: "Alert fired: 'Anomalous Child Process from Office Application'. Analyst verified malicious SHA256 on VirusTotal (54/72 detections).",
        telemetrySource: "VirusTotal API & Splunk Alert Queue",
        eventSnippet: "VT Score: 54/72 | Threat Category: Trojan.Dropper | Family: Qakbot.Loader"
      },
      {
        timestamp: "2026-09-02 09:31:00 UTC",
        phase: "Containment",
        host: "PC-HR-02 & Exchange",
        description: "Killed running PowerShell processes, deleted scheduled task 'WindowsUpdateCheck', and purged phishing email from all recipient mailboxes via Microsoft Graph API.",
        telemetrySource: "EDR Live Response & M365 Compliance Admin",
        eventSnippet: "schtasks /delete /tn 'WindowsUpdateCheck' /f\nNew-ComplianceSearchAction -SearchName 'Purge_Phish_Invoice' -Purge -PurgeType HardDelete"
      }
    ],
    queries: [
      {
        platform: "Microsoft Sentinel (KQL)",
        syntax: `DeviceProcessEvents
| where InitiatingProcessFileName in~ ("winword.exe", "excel.exe", "powerpnt.exe")
| where FileName in~ ("cmd.exe", "powershell.exe", "wscript.exe", "cscript.exe", "mshta.exe")
| project TimeGenerated, DeviceName, InitiatingProcessFileName, FileName, ProcessCommandLine, AccountName
| order by TimeGenerated desc`,
        explanation: "Detects any Office application spawning command-line interpreters or script host LOLBins."
      },
      {
        platform: "Splunk (SPL)",
        syntax: `index=sysmon EventCode=1 (ParentImage="*\\\\winword.exe" OR ParentImage="*\\\\excel.exe")
(Image="*\\\\powershell.exe" OR Image="*\\\\cmd.exe")
| eval CommandLine=lower(CommandLine)
| rex field=CommandLine "-enc\\s+(?<encoded_string>[A-Za-z0-9+/=]+)"
| table _time, host, ParentImage, Image, CommandLine, encoded_string`,
        explanation: "Splunk search pulling Sysmon Process Creation events for Microsoft Office parents with extracted base64 command lines for decoding."
      }
    ],
    iocs: [
      { type: "SHA256", value: "c3ab8e9591e847c1a84c98f828a19213bc540f81d1197e4e1a0b329c298bdf91", context: "Malicious weaponized document: INVOICE_Q3_SUMMARY.docm", confidence: "Confirmed" },
      { type: "SHA256", value: "5e4b2d109f874523cba19082314561023912daef8402123901bcefa123984120", context: "Dropped secondary stage payload (payload.exe)", confidence: "Confirmed" },
      { type: "Domain", value: "vendor-invoices[.]net", context: "Spoofed phishing domain (Punycode / Typo variant)", confidence: "Confirmed" },
      { type: "IP", value: "198.51.100[.]72", context: "Payload staging C2 web server", confidence: "Confirmed" },
      { type: "Registry", value: "Task: \\WindowsUpdateCheck", context: "Persistence scheduled task created by macro", confidence: "Confirmed" }
    ],
    containmentActions: [
      "Killed all active processes under WINWORD.EXE and powershell.exe on PC-HR-02.",
      "Purged the email from 14 other recipient mailboxes via Microsoft 365 Exchange Online compliance search.",
      "Deleted malicious scheduled task '\\WindowsUpdateCheck' using schtasks /delete /f.",
      "Submitted malicious attachment SHA256 to enterprise EDR blacklists and perimeter secure email gateways."
    ],
    mitigationAdvice: [
      "Enforce Group Policy Object (GPO) to block macros from running in Office files downloaded from the Internet.",
      "Enable Attack Surface Reduction (ASR) rule: 'Block all Office applications from creating child processes' (GUID: d4f940ab-401b-4efc-aadc-ad5f3c50688a).",
      "Deploy Constrained Language Mode for PowerShell via AppLocker / WDAC.",
      "Monitor TaskScheduler Operational Event ID 106 for unauthorized task creation."
    ],
    lessonsLearned: "ASR rules were in 'Audit' mode rather than 'Block' mode in the HR organizational unit. Elevating ASR rules to strict block mode would have intercepted the process spawn instantly at the kernel level."
  }
];

export const FEATURED_INCIDENTS = CASE_STUDIES;
