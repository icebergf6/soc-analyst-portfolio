"use client";

import React, { useState } from "react";
import { 
  UserCheck, 
  ShieldCheck, 
  Terminal, 
  Activity, 
  Monitor, 
  FileText, 
  Crosshair, 
  Network, 
  CheckCircle2, 
  ChevronRight,
  Database,
  Layers,
  Flame,
  Radio,
  Copy,
  Check
} from "lucide-react";
import { playCyberSound } from "@/utils/audio";

interface PillarCard {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  summary: string;
  bullets: string[];
  sampleSyntax: string;
}

interface ProfileSectionProps {
  onShowToast?: (msg: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onShowToast }) => {
  const [activePillar, setActivePillar] = useState<string>("pillar-1");
  const [copiedPillarId, setCopiedPillarId] = useState<string | null>(null);

  const handleCopySyntax = (e: React.MouseEvent, pillar: PillarCard) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pillar.sampleSyntax);
    setCopiedPillarId(pillar.id);
    playCyberSound("success");
    onShowToast?.(`Detection query for "${pillar.title}" copied!`);
    setTimeout(() => setCopiedPillarId(null), 2000);
  };


  const pillars: PillarCard[] = [
    {
      id: "pillar-1",
      title: "Threat Detection & SIEM Correlation",
      category: "Splunk SPL / Wazuh XML / KQL",
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      summary: "Formulating high-fidelity correlation searches and alert triggers that identify adversary behavior while suppressing alert fatigue.",
      bullets: [
        "Authored custom Wazuh correlation Rule 100055 catching SSH brute force pivots.",
        "Engineered Splunk SPL queries joining failed logons (4625) with successful remote logins (4624 Type 10).",
        "Tuned threshold frequency triggers across multi-tenant syslog inputs."
      ],
      sampleSyntax: "index=windows EventCode=4625 | stats count by src_ip, user | where count > 20"
    },
    {
      id: "pillar-2",
      title: "Network & Protocol Forensics",
      category: "Wireshark / Zeek / JA3 / BPF",
      icon: <Activity className="w-5 h-5 text-cyan-400" />,
      summary: "Deep packet inspection (DPI), stream reconstruction, and behavioral connection tracking across encrypted boundary egress channels.",
      bullets: [
        "Extracted low-and-slow Cobalt Strike C2 HTTPS beacons using timing delta & jitter calculations.",
        "Correlated Zeek conn.log, dns.log, and ssl.log to identify high-entropy DGA domains.",
        "Parsed JA3/JA3S client fingerprints to identify anomalous TLS negotiation profiles."
      ],
      sampleSyntax: "tls.handshake.type == 1 && tls.handshake.extensions_server_name contains 'sync'"
    },
    {
      id: "pillar-3",
      title: "Host Telemetry & Artifact Triage",
      category: "Sysmon EID 1/3/7/11 / EVTX / DFIR",
      icon: <Monitor className="w-5 h-5 text-emerald-400" />,
      summary: "Auditing endpoint process lineages, scriptblock execution events, and memory injection indicators across Windows and Linux hosts.",
      bullets: [
        "Unmasked malicious Office parent-child process anomalies (WINWORD.EXE -> powershell.exe).",
        "Decoded obfuscated base64 PowerShell cradles from Event ID 4104 ScriptBlock logs.",
        "Audited persistence mechanisms: Scheduled Tasks, Registry Run Keys, and Linux crontabs."
      ],
      sampleSyntax: "ParentImage: *\\winword.exe AND Image: *\\powershell.exe"
    },
    {
      id: "pillar-4",
      title: "Incident Documentation & Hardening",
      category: "Executive Briefings / IoCs / NIST 800-61",
      icon: <FileText className="w-5 h-5 text-purple-400" />,
      summary: "Authoring comprehensive post-incident executive summaries, defanged IoC packages, and actionable defense-in-depth mitigations.",
      bullets: [
        "Structured step-by-step adversary timelines matching NIST SP 800-61 lifecycle stages.",
        "Formatted safe, defanged indicators of compromise conforming to RFC 5737 and RFC 1918.",
        "Recommended proactive GPO hardening: Attack Surface Reduction (ASR) rules and PAM key enforcement."
      ],
      sampleSyntax: "Mitigation: Enable ASR Rule 'Block Office from creating child processes' (GUID: d4f940ab)"
    }
  ];

  return (
    <section id="operational-profile" className="py-20 bg-[#070b13] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-400 tracking-wider">
            <span>[ 01 // OPERATIONAL PROFILE ]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Defensive Mindset & Telemetry Analysis
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed pt-1">
            Bridging raw system telemetry with threat intelligence frameworks to identify, contain, and eradicate adversary access before exfiltration occurs.
          </p>
        </div>

        {/* 2-Column Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Identity & Operational Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-5 shadow-xl">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Defensive Security Specialist
                  </h3>
                  <p className="text-xs font-mono text-emerald-400">
                    SOC Tier-1 / Tier-2 Operations Ready
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hands-on defensive security analyst with proven experience conducting high-fidelity SIEM correlation, network packet deep dissection, and endpoint artifact triage. Passionate about reverse-engineering adversary TTPs, tuning detection rules to suppress false positives, and maintaining hardened homelab cyber ranges.
              </p>

              {/* Compact Specs Table */}
              <div className="space-y-2 text-xs font-mono pt-2">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1">
                  Operational Specifications
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400">Primary Role:</span>
                  <span className="text-emerald-400 font-semibold">SOC Analyst (Tier-1 / Tier-2 Ready)</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400">Frameworks:</span>
                  <span className="text-cyan-300">MITRE ATT&CK, NIST SP 800-61, Cyber Kill Chain</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400">Virtualization:</span>
                  <span className="text-slate-200">Kali Linux, Windows AD DS, Sysmon, Wazuh</span>
                </div>

                <div className="flex justify-between items-center p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                  <span className="text-slate-400">Status:</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                    Actively hunting & triaging
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Core Pillars Grid (4 Interactive Cards) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider px-1">
              Core Defensive Pillars & Telemetry Focus:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar) => {
                const isActive = activePillar === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    onClick={() => {
                      playCyberSound("click");
                      setActivePillar(pillar.id);
                    }}
                    className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                      isActive
                        ? "bg-slate-800/90 border-emerald-500/70 shadow-lg shadow-emerald-500/5 scale-[1.01]"
                        : "bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                    }`}
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          {pillar.icon}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                          {pillar.category.split("/")[0]}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                        {pillar.title}
                      </h4>

                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        {pillar.summary}
                      </p>

                      <ul className="space-y-1.5 text-xs text-slate-400">
                        {pillar.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Telemetry Snippet Footnote with Copy */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1.5">
                        <span>Sample Syntax / Rule:</span>
                        <button
                          onClick={(e) => handleCopySyntax(e, pillar)}
                          className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-emerald-400 transition-colors px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700"
                          title="Copy rule syntax"
                        >
                          {copiedPillarId === pillar.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-2 rounded-lg bg-black/80 border border-slate-800 text-[10px] font-mono text-emerald-300 truncate">
                        <code>{pillar.sampleSyntax}</code>
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
