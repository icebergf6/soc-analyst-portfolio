export interface SiemLogEntry {
  id: string;
  timestamp: string;
  source: "Security.evtx" | "Sysmon" | "Linux auth.log" | "Zeek conn.log";
  host: string;
  eventId?: number;
  user?: string;
  srcIp?: string;
  destIp?: string;
  severity: "High" | "Medium" | "Low" | "Info";
  rawMessage: string;
  parsedFields: Record<string, string | number>;
}

export const SAMPLE_SIEM_LOGS: SiemLogEntry[] = [
  {
    id: "log-1",
    timestamp: "2026-08-14 03:12:04",
    source: "Linux auth.log",
    host: "dmz-jumphost-01",
    user: "admin",
    srcIp: "203.0.113.88",
    severity: "High",
    rawMessage: "sshd[18421]: Failed password for invalid user admin from 203.0.113.88 port 48192 ssh2",
    parsedFields: {
      action: "failed_login",
      user: "admin",
      src_ip: "203.0.113.88",
      port: 48192,
      service: "sshd"
    }
  },
  {
    id: "log-2",
    timestamp: "2026-08-14 03:12:15",
    source: "Linux auth.log",
    host: "dmz-jumphost-01",
    user: "root",
    srcIp: "203.0.113.88",
    severity: "High",
    rawMessage: "sshd[18425]: Failed password for root from 203.0.113.88 port 48201 ssh2",
    parsedFields: {
      action: "failed_login",
      user: "root",
      src_ip: "203.0.113.88",
      port: 48201,
      service: "sshd"
    }
  },
  {
    id: "log-3",
    timestamp: "2026-08-14 03:26:19",
    source: "Linux auth.log",
    host: "dmz-jumphost-01",
    user: "svc_backup",
    srcIp: "203.0.113.88",
    severity: "High",
    rawMessage: "sshd[18944]: Accepted password for svc_backup from 203.0.113.88 port 51204 ssh2",
    parsedFields: {
      action: "successful_login",
      user: "svc_backup",
      src_ip: "203.0.113.88",
      port: 51204,
      service: "sshd"
    }
  },
  {
    id: "log-4",
    timestamp: "2026-08-20 14:15:30",
    source: "Zeek conn.log",
    host: "sensor-perimeter-01",
    srcIp: "10.20.2.104",
    destIp: "198.51.100.180",
    severity: "High",
    rawMessage: "conn.log: orig_h:10.20.2.104 orig_p:49192 resp_h:198.51.100.180 resp_p:443 proto:tcp service:ssl duration:62.14 orig_bytes:192",
    parsedFields: {
      src_ip: "10.20.2.104",
      dest_ip: "198.51.100.180",
      dest_port: 443,
      duration: 62.14,
      orig_bytes: 192,
      ja3: "a0e9f5d64349fb13191bc781f81f42e1"
    }
  },
  {
    id: "log-5",
    timestamp: "2026-09-02 09:20:05",
    source: "Sysmon",
    host: "WS-FINANCE-02",
    eventId: 1,
    user: "CORP\\jsmith",
    severity: "High",
    rawMessage: "Sysmon EID 1: ParentImage: C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE, Image: C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe, CommandLine: powershell.exe -w hidden -enc JABzAD0ATgBl...",
    parsedFields: {
      EventCode: 1,
      ParentImage: "WINWORD.EXE",
      Image: "powershell.exe",
      CommandLine: "powershell.exe -w hidden -enc JABzAD0ATgBl...",
      User: "CORP\\jsmith"
    }
  },
  {
    id: "log-6",
    timestamp: "2026-09-02 09:21:40",
    source: "Security.evtx",
    host: "DC01-PROD",
    eventId: 4625,
    user: "svc_sql",
    srcIp: "10.20.1.55",
    severity: "Medium",
    rawMessage: "An account failed to log on. Account Name: svc_sql, Failure Reason: Unknown user name or bad password, Logon Type: 3",
    parsedFields: {
      EventCode: 4625,
      AccountName: "svc_sql",
      LogonType: 3,
      IpAddress: "10.20.1.55",
      Status: "0xC000006A"
    }
  },
  {
    id: "log-7",
    timestamp: "2026-09-02 09:22:00",
    source: "Security.evtx",
    host: "DC01-PROD",
    eventId: 4624,
    user: "Administrator",
    srcIp: "10.20.1.10",
    severity: "Info",
    rawMessage: "An account was successfully logged on. Account Name: Administrator, Logon Type: 10 (RemoteInteractive)",
    parsedFields: {
      EventCode: 4624,
      AccountName: "Administrator",
      LogonType: 10,
      IpAddress: "10.20.1.10"
    }
  }
];
