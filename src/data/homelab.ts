import { HomelabNode } from "@/types/portfolio";

export const HOMELAB_NODES: HomelabNode[] = [
  {
    id: "node-firewall",
    name: "pfSense CE Edge Gateway",
    role: "Perimeter Firewall & Traffic Inspector",
    segment: "VLAN 10 - Perimeter & DMZ",
    ip: "192.168.10.1 (Gateway)",
    os: "FreeBSD 14-RELEASE / pfSense 2.7.2",
    specs: "2 vCPU, 4GB RAM, Dual Virtual NICs (WAN/LAN/DMZ Trunk)",
    installedAgents: ["Suricata IDS/IPS Package", "pfBlockerNG-devel", "Syslog Forwarder"],
    telemetryLogs: ["/var/log/filter.log (Suricata EVE JSON)", "dhcpd.log", "OpenVPN Auth Log"],
    status: "Active Monitoring",
    sampleLog: `filterlog: 4,,,1000000103,vtnet0,match,block,in,4,0x0,,64,0,0,DF,6,tcp,60,203.0.113.88,198.51.100.45,48192,22,0,S,1460,0`
  },
  {
    id: "node-kali",
    name: "Kali Linux Simulation Node",
    role: "Attacker & Adversary Emulation Machine",
    segment: "VLAN 10 - Perimeter & DMZ",
    ip: "192.168.10.99",
    os: "Kali Rolling 2024.2 Linux",
    specs: "4 vCPU, 8GB RAM, 60GB NVMe Storage",
    installedAgents: ["Atomic Red Team Runner", "Hydra / Medusa", "Cobalt / Sliver Framework", "Metasploit"],
    telemetryLogs: ["auth.log", "bash_history", "attack_sim.log"],
    status: "Isolated",
    sampleLog: `invoke-atomic -technique T1110.001 -inputarg:username=svc_backup -target 192.168.20.10`
  },
  {
    id: "node-dc",
    name: "DC01 - Windows Server 2022",
    role: "Active Directory Domain Services (AD DS) & Kerberos KDC",
    segment: "VLAN 20 - Corporate LAN",
    ip: "192.168.20.10",
    os: "Windows Server 2022 Datacenter",
    specs: "4 vCPU, 16GB RAM, 100GB SSD",
    installedAgents: ["Sysmon 15.14 (SwiftOnSecurity)", "Wazuh Agent 4.8", "Winlogbeat 8.12"],
    telemetryLogs: ["Security.evtx (Event ID 4624/4625/4768/4769)", "System.evtx", "DNS Server Audit Log"],
    status: "Active Monitoring",
    sampleLog: `<Event xmlns='http://schemas.microsoft.com/win/2004/08/events/event'><System><EventID>4769</EventID><TimeCreated SystemTime='2026-08-14T03:20:11.000Z'/><Provider Name='Microsoft-Windows-Security-Auditing'/></System><EventData><Data Name='TargetUserName'>krbtgt</Data><Data Name='ServiceName'>MSSQLSvc/db01.corp.local:1433</Data><Data Name='TicketEncryptionType'>0x17</Data></EventData></Event>`
  },
  {
    id: "node-workstation",
    name: "WS01 - Windows 11 Enterprise",
    role: "Corporate Client Endpoint (Victim Workstation)",
    segment: "VLAN 20 - Corporate LAN",
    ip: "192.168.20.45",
    os: "Windows 11 Pro / Enterprise 23H2",
    specs: "4 vCPU, 8GB RAM, 80GB SSD",
    installedAgents: ["Sysmon 15.14", "Wazuh Agent 4.8", "Velociraptor Client", "AuditD Windows"],
    telemetryLogs: ["Microsoft-Windows-Sysmon/Operational", "Microsoft-Windows-PowerShell/Operational (Event 4104)", "Security.evtx (Event 4688)"],
    status: "Active Monitoring",
    sampleLog: `<Event xmlns='http://schemas.microsoft.com/win/2004/08/events/event'><System><EventID>1</EventID></System><EventData><Data Name='ParentImage'>C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE</Data><Data Name='Image'>C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe</Data><Data Name='CommandLine'>powershell.exe -NoP -w hidden -enc JABzAD0ATgBl...</Data></EventData></Event>`
  },
  {
    id: "node-siem",
    name: "SIEM-Wazuh-ELK Central Node",
    role: "Central Log Ingestion, Correlation & Dashboarding",
    segment: "VLAN 30 - SOC Monitoring & SIEM",
    ip: "192.168.30.50",
    os: "Ubuntu 22.04 LTS Server",
    specs: "8 vCPU, 32GB RAM, 250GB High-IOPS SSD",
    installedAgents: ["Wazuh Manager 4.8", "Elasticsearch 8.12", "Kibana & Wazuh Dashboard", "Logstash Pipeline"],
    telemetryLogs: ["/var/ossec/logs/alerts/alerts.json", "elasticsearch.log", "logstash-plain.log"],
    status: "Online",
    sampleLog: `{"timestamp":"2026-08-14T03:26:19.451+0000","rule":{"id":"100055","level":12,"description":"SOC-ALERT: SSH brute force attempt followed by successful logon"},"agent":{"id":"002","name":"dmz-jumphost-01"},"data":{"srcip":"203.0.113.88","dstuser":"svc_backup"}}`
  }
];
