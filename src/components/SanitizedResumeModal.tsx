"use client";

import React, { useEffect, useState } from "react";
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Code,
  Terminal,
  FileCheck
} from "lucide-react";

interface SanitizedResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SanitizedResumeModal: React.FC<SanitizedResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate text/markdown sanitized resume download
    const resumeText = `=======================================================================
SANITIZED CYBERSECURITY & SOC ANALYST RESUME (TIER 1/2)
Verified Defensive Security Specialist | Threat Hunting & Incident Triage
Contact: analyst.leosyafiq.soc@proton.me | PGP: 4A8F C029 E17D 94BC
=======================================================================

EXECUTIVE SUMMARY
Proactive Defensive Security Specialist and Tier 2 SOC Analyst with demonstrated
experience triaging complex security incidents, authoring high-fidelity SIEM correlation
queries (Splunk SPL, Sentinel KQL, Wazuh), and conducting network/host forensics.
Top 5% Global Rank on TryHackMe. Certified Blue Team Level 1 (BTL1) & CompTIA Security+.

CORE DEFENSIVE COMPETENCIES
- SIEM & SOAR: Splunk Enterprise, Microsoft Sentinel, Wazuh XDR, Elastic/ELK
- Endpoint & Intel: Sysmon, Velociraptor, VirusTotal, Any.Run, MITRE ATT&CK
- Network Forensics: Wireshark, Zeek, tcpdump, Suricata IDS/IPS
- Operating Systems & Scripting: Linux (Kali/Ubuntu), Windows Server (AD DS), Python, Bash, PowerShell

VERIFIED CERTIFICATIONS & PLATFORM CREDENTIALS
- Blue Team Level 1 (BTL1) - Security Blue Team (24h Live Incident Practical)
- CompTIA Security+ (SY0-701)
- Microsoft Certified: Security Operations Analyst (SC-200)
- Splunk Core Certified Power User
- TryHackMe: Top 5% Global Rank (75+ Completed Blue Team Rooms)
- Hack The Box: Sherlocks DFIR Participant

INCIDENT RESPONSE & HOMELAB EXPERIENCE
SOC Analyst / Defensive Specialist | Virtual Enterprise Cyber Range
- Investigated external brute force & lateral SSH pivoting; formulated Wazuh correlation Rule 100055.
- Analyzed low-and-slow C2 beaconing using Zeek conn.log and JA3 TLS fingerprinting, calculating jitter.
- Identified and isolated malicious Office macro process injection (WINWORD -> powershell.exe) via Sysmon EID 1.
- Built multi-VLAN virtual homelab (pfSense, Windows Server 2022 AD DS, Windows 11 with Sysmon, Wazuh/ELK).

DISCLOSURE: All employer identifiers, IP addresses, and private tokens sanitized for public security compliance.
=======================================================================`;

    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Sanitized_SOC_Analyst_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
    >
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Sanitized Resume Preview</h3>
              <p className="text-xs font-mono text-emerald-400">Public Sanitized Edition - PII & Sensitive Infrastructure Redacted</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloaded ? "Downloaded!" : "Download Resume"}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Document */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto space-y-6 text-sm bg-slate-900/50">
          {/* Header Summary */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                SOC Analyst & Defensive Specialist
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/30">
                CLEARANCE: ELIGIBLE / SANITIZED
              </span>
            </div>
            <div className="text-xs font-mono text-slate-400 flex flex-wrap gap-4 pt-1">
              <span>Location: Remote / Hybrid</span>
              <span>Contact: analyst.leosyafiq.soc@proton.me</span>
              <span>Focus: Tier 1/2 SOC, Threat Hunting & SIEM Engineering</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              Analytical and proactive Cybersecurity Specialist specializing in Security Operations Center (SOC) triage, host and network forensic investigation, and detection engineering. Experienced in managing alerts across Wazuh, Splunk, and Microsoft Sentinel with proven capability to reconstruct attack paths and execute effective containment.
            </p>
          </div>

          {/* Technical Arsenal & Core Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Technical Arsenal & Tooling</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-cyan-300 font-mono">SIEM & Log Management:</span>
                <p className="text-slate-300 mt-1">Splunk (SPL), Wazuh XDR/SIEM, Microsoft Sentinel (KQL), Elastic/ELK, Logstash, Syslog</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-cyan-300 font-mono">Network Forensics:</span>
                <p className="text-slate-300 mt-1">Wireshark, Zeek (conn/ssl/dns), tcpdump, Suricata IDS/IPS, BPF syntax, JA3 fingerprinting</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-cyan-300 font-mono">Endpoint & Intel:</span>
                <p className="text-slate-300 mt-1">Microsoft Sysmon, Velociraptor, VirusTotal, Any.Run, MITRE ATT&CK, Sigma Rules</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="font-semibold text-cyan-300 font-mono">OS & Automation:</span>
                <p className="text-slate-300 mt-1">Linux (Ubuntu/Kali), Windows Server 2022 (AD DS), Python, PowerShell Scriptblock, Bash</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certifications & Verified Badges</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-start p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Blue Team Level 1 (BTL1)</span>
                  <p className="text-slate-400">Security Blue Team — 24-Hour Practical SOC Incident Simulation</p>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-start p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">CompTIA Security+ (SY0-701)</span>
                  <p className="text-slate-400">CompTIA ID: COMP001021482</p>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-start p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Microsoft Certified: Security Operations Analyst (SC-200)</span>
                  <p className="text-slate-400">Microsoft Sentinel & Defender for Endpoint Triage</p>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">Active</span>
              </div>
              <div className="flex justify-between items-start p-2.5 rounded bg-slate-950/50 border border-slate-800/80">
                <div>
                  <span className="font-semibold text-white">Splunk Core Certified Power User</span>
                  <p className="text-slate-400">Advanced SPL, CIM Compliance & Correlation Searches</p>
                </div>
                <span className="font-mono text-[11px] text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* Practical Projects & Homelab Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Simulated Incident Triage & Defense Projects</span>
            </h2>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-white font-semibold">
                  <span>Brute Force & Lateral Movement Triage (Incident 01)</span>
                  <span className="font-mono text-emerald-400 text-[11px]">Wazuh XDR / Linux</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Correlated 4,200+ failed SSH authentications from external IP, mapped lateral private key abuse into internal DB server, and authored custom Wazuh frequency detection Rule 100055.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-white font-semibold">
                  <span>C2 Beaconing Traffic & JA3 Fingerprinting (Incident 02)</span>
                  <span className="font-mono text-cyan-400 text-[11px]">Wireshark / Zeek / KQL</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Discovered Cobalt Strike malleable HTTPS beaconing at 60s intervals with low jitter. Drafted Microsoft Sentinel KQL query to automate beacon detection.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-white font-semibold">
                  <span>Malicious Macro & LOLBins Execution (Incident 03)</span>
                  <span className="font-mono text-amber-400 text-[11px]">Sysmon / VirusTotal</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Triaged weaponized Office document spawning encoded PowerShell (Sysmon Event 1), decoded base64 payload, and coordinated tenant-wide Exchange mailbox purge.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>RFC 5737 / RFC 1918 COMPLIANT SANITIZED RESUME</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
