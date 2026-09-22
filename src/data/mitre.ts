export interface MitreTechniqueItem {
  id: string;
  name: string;
  tactic: string;
  description: string;
  coveredInCaseId?: string;
  detectionRule: string;
  mitigation: string;
}

export interface MitreTacticGroup {
  tacticName: string;
  code: string;
  techniques: MitreTechniqueItem[];
}

export const MITRE_TACTICS_DATA: MitreTacticGroup[] = [
  {
    tacticName: "Initial Access",
    code: "TA0001",
    techniques: [
      {
        id: "T1566.001",
        name: "Spearphishing Attachment",
        tactic: "Initial Access",
        description: "Adversaries send malicious Office attachments with VBA macros to execute loaders.",
        coveredInCaseId: "incident-03",
        detectionRule: "Sysmon EID 1: ParentImage in ('*\\winword.exe', '*\\excel.exe') AND Image in ('*\\powershell.exe', '*\\cmd.exe')",
        mitigation: "Block internet macros via GPO; enable Attack Surface Reduction (ASR) rules."
      },
      {
        id: "T1190",
        name: "Exploit Public-Facing App",
        tactic: "Initial Access",
        description: "Exploiting exposed services (e.g. edge VPNs, web servers) to gain footholds.",
        detectionRule: "Wazuh Rule 100055 & Suricata signature matching unusual HTTP POST URI traversal",
        mitigation: "Strict DMZ isolation, perimeter WAF, and rapid CVE patching."
      }
    ]
  },
  {
    tacticName: "Execution",
    code: "TA0002",
    techniques: [
      {
        id: "T1059.001",
        name: "PowerShell Interpreter",
        tactic: "Execution",
        description: "Executing base64 encoded download cradles with windowstyle hidden.",
        coveredInCaseId: "incident-03",
        detectionRule: "Event ID 4104: ScriptBlockText contains 'Net.WebClient' or 'DownloadString'",
        mitigation: "Enforce PowerShell Constrained Language Mode and AppLocker script enforcement."
      },
      {
        id: "T1204.002",
        name: "Malicious File Execution",
        tactic: "Execution",
        description: "Victims opening dropped weaponized payloads from temp staging folders.",
        coveredInCaseId: "incident-03",
        detectionRule: "Sysmon EID 1: TargetFilename located in AppData\\Local\\Temp or C:\\Windows\\Temp",
        mitigation: "Disable execution binaries from writable temporary directories."
      }
    ]
  },
  {
    tacticName: "Persistence",
    code: "TA0003",
    techniques: [
      {
        id: "T1053.005",
        name: "Scheduled Task / Job",
        tactic: "Persistence",
        description: "Creating background scheduled tasks running under NT AUTHORITY\\SYSTEM.",
        coveredInCaseId: "incident-03",
        detectionRule: "Security.evtx Event 4698: A scheduled task was created outside maintenance hours",
        mitigation: "Audit task scheduler write permissions and monitor TaskScheduler operational logs."
      },
      {
        id: "T1547.001",
        name: "Registry Run Keys",
        tactic: "Persistence",
        description: "Adding entries under HKCU/HKLM Run to restart payloads upon user login.",
        coveredInCaseId: "incident-03",
        detectionRule: "Sysmon EID 13: Registry value set under CurrentVersion\\Run",
        mitigation: "Restrict standard users from writing to startup registry locations."
      }
    ]
  },
  {
    tacticName: "Credential Access",
    code: "TA0006",
    techniques: [
      {
        id: "T1110.001",
        name: "Password Guessing",
        tactic: "Credential Access",
        description: "High-frequency dictionary brute force attacks against exposed SSH/RDP interfaces.",
        coveredInCaseId: "incident-01",
        detectionRule: "Linux auth.log: 'Failed password' count > 50 from same src_ip within 5m",
        mitigation: "Enforce Fail2ban, key-only SSH auth, and cloud IAM MFA."
      },
      {
        id: "T1552.001",
        name: "Credentials in Files",
        tactic: "Credential Access",
        description: "Searching local file systems for unencrypted private SSH keys or API tokens.",
        coveredInCaseId: "incident-01",
        detectionRule: "auditd SYSCALL: Access to /home/*/.ssh/id_rsa by unexpected processes",
        mitigation: "Password-protect SSH keys and store sensitive credentials in hardware keys or vaults."
      }
    ]
  },
  {
    tacticName: "Lateral Movement",
    code: "TA0008",
    techniques: [
      {
        id: "T1021.004",
        name: "Remote Services: SSH",
        tactic: "Lateral Movement",
        description: "Abusing compromised credentials to jump from perimeter DMZ into internal production databases.",
        coveredInCaseId: "incident-01",
        detectionRule: "Zeek conn.log: Inbound SSH connection from DMZ subnet (10.10.1.x) to Prod DB (10.20.4.x)",
        mitigation: "Strict VLAN micro-segmentation and jump box multi-factor verification."
      },
      {
        id: "T1021.002",
        name: "SMB / Windows Admin Shares",
        tactic: "Lateral Movement",
        description: "Pivoting via ADMIN$ or C$ shares using compromised domain admin credentials.",
        detectionRule: "Security.evtx Event 5140: A network share object was accessed (ShareName: ADMIN$)",
        mitigation: "Block workstation-to-workstation SMB traffic via host firewall."
      }
    ]
  },
  {
    tacticName: "Command and Control",
    code: "TA0011",
    techniques: [
      {
        id: "T1071.001",
        name: "Web Protocols (HTTPS)",
        tactic: "Command and Control",
        description: "Disguising C2 beaconing within regular TLS 1.3 traffic using malleable profiles.",
        coveredInCaseId: "incident-02",
        detectionRule: "Zeek conn.log: Regular intervals (60s +/- 10% jitter) and low payload byte count",
        mitigation: "TLS inspection proxies, JA3/JA3S fingerprint matching, and NRD domain blocking."
      },
      {
        id: "T1573.002",
        name: "Asymmetric Cryptography",
        tactic: "Command and Control",
        description: "Encrypting heartbeat messages with custom private keys to thwart DPI signatures.",
        coveredInCaseId: "incident-02",
        detectionRule: "Suricata ET MALWARE: JA3 fingerprint matching known Cobalt Strike malleable profile",
        mitigation: "Deploy boundary SSL/TLS decryption for high-risk outbound sessions."
      }
    ]
  }
];
