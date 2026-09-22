export type ToolCategory = 
  | "SIEM & Log Management" 
  | "Network Forensics" 
  | "Endpoint & Intel" 
  | "OS & Scripting";

export interface ToolItem {
  id: string;
  name: string;
  category: ToolCategory;
  proficiency: "Advanced" | "Proficient" | "Operational";
  levelPercent: number;
  description: string;
  useCase: string;
  tags: string[];
  iconName: string;
  highlightSyntax?: string;
}

export interface IoCItem {
  type: "IP" | "Domain" | "SHA256" | "File Path" | "Registry";
  value: string;
  context: string;
  confidence: "High" | "Medium" | "Confirmed";
}

export interface IncidentTimelineEvent {
  timestamp: string;
  phase: "Initial Access" | "Execution" | "Persistence" | "Discovery" | "Lateral Movement" | "C2 Communication" | "Exfiltration" | "Detection" | "Containment";
  host: string;
  description: string;
  telemetrySource: string;
  eventSnippet?: string;
}

export interface DetectionQuery {
  platform: "Splunk (SPL)" | "Microsoft Sentinel (KQL)" | "Wireshark Display Filter" | "Wazuh Rule / XML" | "Elastic / EQL";
  syntax: string;
  explanation: string;
}

export interface IncidentCase {
  id: string;
  title: string;
  severity: "Critical" | "High" | "Medium";
  mitreTechniques: { id: string; name: string; url?: string }[];
  summaryPreview: string;
  executiveSummary: string;
  environment: string;
  detectedBy: string;
  mttdTriage: string;
  timeline: IncidentTimelineEvent[];
  queries: DetectionQuery[];
  iocs: IoCItem[];
  containmentActions: string[];
  mitigationAdvice: string[];
  lessonsLearned: string;
  badgeTags: string[];
}

export interface HomelabNode {
  id: string;
  name: string;
  role: string;
  segment: "VLAN 10 - Perimeter & DMZ" | "VLAN 20 - Corporate LAN" | "VLAN 30 - SOC Monitoring & SIEM";
  ip: string;
  os: string;
  specs: string;
  installedAgents: string[];
  telemetryLogs: string[];
  status: "Online" | "Active Monitoring" | "Isolated";
  sampleLog: string;
}

export interface WriteupItem {
  id: string;
  title: string;
  category: "Blue Team CTF" | "Detection Engineering" | "Defensive Scripting" | "Vulnerability Breakdown";
  platform: "TryHackMe" | "Hack The Box" | "Custom Lab" | "Threat Research";
  readTime: string;
  date: string;
  tags: string[];
  summary: string;
  fullContent: {
    overview: string;
    scenario: string;
    methodology: string[];
    evidenceAnalysis: string;
    codeSnippet?: {
      language: string;
      code: string;
      caption: string;
    };
    takeaways: string[];
  };
}

export interface CertificationBadge {
  id: string;
  title: string;
  issuer: string;
  code?: string;
  status: "Active" | "Certified" | "Ranking";
  badgeDetail: string;
  link?: string;
  accentColor: string;
}
