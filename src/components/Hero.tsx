"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ArrowRight, 
  KeyRound, 
  Terminal, 
  Activity, 
  Crosshair, 
  Server, 
  Database,
  Play,
  Pause,
  Command,
  Search,
  AlertTriangle,
  Zap,
  Radio,
  Sliders,
  CheckCircle2,
  Lock,
  Cpu,
  Radar
} from "lucide-react";

interface HeroProps {
  onOpenCmd?: () => void;
}

interface LiveTelemetryEvent {
  source: string;
  category: "NETWORK" | "ENDPOINT" | "SIEM";
  color: string;
  text: string;
  timestamp?: string;
  isSimulated?: boolean;
}

const LIVE_EVENTS: LiveTelemetryEvent[] = [
  {
    source: "ZEEK_CONN",
    category: "NETWORK",
    color: "text-cyan-400",
    text: "192.168.20.45:49192 -> 198.51.100.180:443 [TLSv1.3 JA3:a0e9f5... Jitter: 4.2%]"
  },
  {
    source: "WAZUH_ALERT_100055",
    category: "SIEM",
    color: "text-amber-400",
    text: "Rule 100055 fired: SSH Multiple Auth Failures count=42 src=203.0.113.88"
  },
  {
    source: "SYSMON_EID_1",
    category: "ENDPOINT",
    color: "text-emerald-400",
    text: "Parent: WINWORD.EXE -> Child: powershell.exe -w hidden -enc JABzAD0..."
  },
  {
    source: "SURICATA_ALERT",
    category: "NETWORK",
    color: "text-rose-400",
    text: "ET MALWARE Cobalt Strike Malleable HTTPS Jitter Profile Detected"
  },
  {
    source: "SPLUNK_ES_CORRELATION",
    category: "SIEM",
    color: "text-purple-400",
    text: "Notable Event: Anomalous Kerberos Ticket Request (Event 4769 MSSQLSvc)"
  },
  {
    source: "AUDITD_LINUX",
    category: "ENDPOINT",
    color: "text-teal-400",
    text: "SYSCALL execve: /usr/bin/cat /home/svc_backup/.ssh/id_rsa [INTEGRITY_TAMPER]"
  },
  {
    source: "DEFENDER_XDR",
    category: "ENDPOINT",
    color: "text-cyan-300",
    text: "ASR Rule Blocked: Child process creation from Microsoft Office binary"
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenCmd }) => {
  const [events, setEvents] = useState<LiveTelemetryEvent[]>(LIVE_EVENTS.slice(0, 3));
  const [isStreaming, setIsStreaming] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "NETWORK" | "ENDPOINT" | "SIEM">("ALL");
  const [ingestedCount, setIngestedCount] = useState(1482);
  const [defconLevel, setDefconLevel] = useState<"DEFCON 3 (WATCH)" | "DEFCON 2 (ELEVATED)" | "DEFCON 1 (ACTIVE INCIDENT)">("DEFCON 3 (WATCH)");

  // Live Telemetry Event Simulator Loop
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const nextEvent = LIVE_EVENTS[currentIdx % LIVE_EVENTS.length];
      const now = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
      setEvents(prev => [
        { ...nextEvent, timestamp: now },
        prev[0],
        prev[1]
      ]);
      setCurrentIdx(prev => prev + 1);
      setIngestedCount(prev => prev + 1);
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming, currentIdx]);

  // Inject Simulated Live Threat Alert
  const handleInjectThreat = () => {
    const now = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
    const emergencyEvent: LiveTelemetryEvent = {
      source: "CRITICAL_EDR_ISOLATION",
      category: "ENDPOINT",
      color: "text-rose-400",
      text: "[SIMULATED INJECTION] Host 10.20.2.104 quarantined: Ransomware pre-encryption canary triggered!",
      timestamp: now,
      isSimulated: true
    };
    setEvents(prev => [emergencyEvent, prev[0], prev[1]]);
    setIngestedCount(prev => prev + 1);
    setDefconLevel("DEFCON 1 (ACTIVE INCIDENT)");
    setTimeout(() => {
      setDefconLevel("DEFCON 3 (WATCH)");
    }, 8000);
  };

  const filteredDisplayEvents = events.filter(e => {
    if (selectedFilter === "ALL") return true;
    return e.category === selectedFilter;
  });

  return (
    <section id="overview" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Subtle Cyber Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[280px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[200px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy (Left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Operational Status Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* DEFCON Status Pill */}
              <div 
                onClick={() => setDefconLevel(prev => prev === "DEFCON 3 (WATCH)" ? "DEFCON 2 (ELEVATED)" : "DEFCON 3 (WATCH)")}
                className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono shadow-sm backdrop-blur-sm hover:border-emerald-500/60 transition-colors"
                title="Click to toggle Defense Readiness Condition"
              >
                <span className="flex h-2 w-2 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    defconLevel.includes("ACTIVE") ? "bg-rose-400" : defconLevel.includes("ELEVATED") ? "bg-amber-400" : "bg-emerald-400"
                  } opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    defconLevel.includes("ACTIVE") ? "bg-rose-500" : defconLevel.includes("ELEVATED") ? "bg-amber-500" : "bg-emerald-500"
                  }`} />
                </span>
                <span className={`font-semibold ${
                  defconLevel.includes("ACTIVE") ? "text-rose-400" : defconLevel.includes("ELEVATED") ? "text-amber-400" : "text-emerald-400"
                }`}>
                  {defconLevel}
                </span>
              </div>

              {/* Coordinates Pill */}
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-800 text-[11px] font-mono text-slate-400">
                <Crosshair className="w-3 h-3 text-cyan-400" />
                <span>GRID: SOC_TIER_2</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">24/7 DEFENSE</span>
              </div>

              {/* Quick Search Shortcut Pill */}
              {onOpenCmd && (
                <button
                  id="cmd-palette-trigger"
                  onClick={onOpenCmd}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
                  title="Search command palette (Ctrl+K)"
                >
                  <Search className="w-3 h-3 text-emerald-400" />
                  <span>Search Matrix</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                    Ctrl+K
                  </kbd>
                </button>
              )}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              SOC Analyst & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Defensive Security
              </span>{" "}
              Specialist
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Specialized in proactive threat hunting, multi-SIEM log correlation (Splunk, Wazuh, Sentinel), and rapid incident triage across enterprise hybrid endpoints and network perimeters. Dedicated to reducing MTTD and hardening attack surfaces against adversary TTPs.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#investigations"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 hover:shadow-emerald-500/30"
              >
                <Crosshair className="w-4 h-4 text-slate-950" />
                <span>Explore Investigations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#siem-sandbox"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-slate-900 border border-slate-700/90 hover:border-emerald-500/50 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-all shadow-sm active:scale-95"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Try Live SIEM Sandbox</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>PGP Contact</span>
              </a>
            </div>

            {/* Comprehensive Defensive Metrics Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 font-bold">TOP 5%</div>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">TryHackMe Global</div>
                <div className="text-[10px] font-mono text-slate-500">75+ Blue Rooms</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-cyan-400 font-bold">50+ LABS</div>
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Active Cyber Ranges</div>
                <div className="text-[10px] font-mono text-slate-500">HTB Sherlocks & BTL1</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl hover:border-amber-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-400 font-bold">120+ TTPs</div>
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">MITRE ATT&CK Mapped</div>
                <div className="text-[10px] font-mono text-slate-500">Enterprise Matrix</div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl hover:border-emerald-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 font-bold">&lt; 18m MTTR</div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xs text-slate-300 font-medium mt-0.5">Mean Time To Triage</div>
                <div className="text-[10px] font-mono text-slate-500">Playbook Driven</div>
              </div>
            </div>
          </div>

          {/* Right Interactive SOC Command Center Monitor Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl p-5 overflow-hidden backdrop-blur-md">
              {/* Radar Sweep Widget in Top Right */}
              <div className="absolute top-3 right-3 w-16 h-16 rounded-full border border-emerald-500/30 pointer-events-none opacity-50 overflow-hidden flex items-center justify-center bg-black/40 shadow-inner">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-emerald-200 origin-center animate-radar" />
                <div className="absolute w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>

              {/* Monitor Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">soc-daemon://stream-live</span>
                </div>

                <div className="flex items-center gap-2 pr-16 sm:pr-20">
                  <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    aria-label={isStreaming ? "Pause live telemetry stream" : "Resume live telemetry stream"}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title={isStreaming ? "Pause Telemetry Stream" : "Resume Telemetry Stream"}
                  >
                    {isStreaming ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  </button>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <Activity className={`w-3.5 h-3.5 ${isStreaming ? "animate-pulse" : ""}`} />
                    <span>{isStreaming ? "INGESTING" : "PAUSED"}</span>
                  </div>
                </div>
              </div>

              {/* Stream Filter Pills & Simulation Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[10px] font-mono">
                <div className="flex gap-1">
                  {(["ALL", "NETWORK", "ENDPOINT", "SIEM"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 py-0.5 rounded transition-colors ${
                        selectedFilter === filter
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                          : "bg-slate-950 text-slate-500 hover:text-slate-300 border border-slate-800"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleInjectThreat}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 transition-colors"
                  title="Simulate and inject a critical threat alert"
                >
                  <Zap className="w-3 h-3 text-rose-400" />
                  <span>Simulate Threat Alert</span>
                </button>
              </div>

              {/* Telemetry Stream Feed with Smooth Animated Entrance */}
              <div className="space-y-2.5 font-mono text-[11px] leading-relaxed min-h-[185px]">
                {filteredDisplayEvents.map((ev, i) => (
                  <div 
                    key={i} 
                    className={`p-2.5 rounded border transition-all animate-fade-in-up ${
                      ev.isSimulated
                        ? "bg-rose-950/40 border-rose-500/70 shadow-md shadow-rose-500/10"
                        : "bg-slate-950/85 border-slate-800/80"
                    }`}
                  >
                    <div className="text-slate-500 flex justify-between">
                      <span>[{ev.timestamp || "2026-09-22 16:44:10 UTC"}]</span>
                      <span className={`${ev.color} font-semibold flex items-center gap-1`}>
                        {ev.isSimulated && <AlertTriangle className="w-3 h-3 text-rose-400 animate-bounce" />}
                        {ev.source}
                      </span>
                    </div>
                    <div className="text-slate-300 mt-1 truncate">
                      {ev.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Telemetry Footer Status */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ingested: <strong className="text-emerald-400">{ingestedCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dropped: 0</span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  SIEM_ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
