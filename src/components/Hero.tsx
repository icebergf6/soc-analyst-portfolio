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
  Search,
  AlertTriangle,
  Zap,
  Radio,
  Sliders,
  CheckCircle2,
  Lock,
  Cpu,
  ChevronDown,
  ChevronUp,
  Flame,
  ShieldAlert,
  Sparkles,
  Info
} from "lucide-react";

interface HeroProps {
  onOpenCmd?: () => void;
}

interface TelemetryDetail {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "INFO";
  host: string;
  mitreTactic: string;
  iocOrRule: string;
  recommendedAction: string;
}

interface LiveTelemetryEvent {
  id: string;
  source: string;
  category: "NETWORK" | "ENDPOINT" | "SIEM";
  badgeBg: string;
  badgeBorder: string;
  color: string;
  text: string;
  timestamp?: string;
  isSimulated?: boolean;
  details?: TelemetryDetail;
}

const LIVE_EVENTS: LiveTelemetryEvent[] = [
  {
    id: "ev-1",
    source: "ZEEK_CONN",
    category: "NETWORK",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-500/30",
    color: "text-cyan-400",
    text: "192.168.20.45:49192 -> 198.51.100.180:443 [TLSv1.3 JA3:a0e9f5... Jitter: 4.2%]",
    details: {
      severity: "HIGH",
      host: "WS01 (192.168.20.45)",
      mitreTactic: "T1071.001 - Web Protocols (C2 Beaconing)",
      iocOrRule: "JA3: a0e9f5d64349fb13191bc781f81f42e1",
      recommendedAction: "Isolate client endpoint WS01 and block outbound IP at perimeter pfSense."
    }
  },
  {
    id: "ev-2",
    source: "WAZUH_ALERT_100055",
    category: "SIEM",
    badgeBg: "bg-amber-500/10",
    badgeBorder: "border-amber-500/30",
    color: "text-amber-400",
    text: "Rule 100055 fired: SSH Multiple Auth Failures count=42 src=203.0.113.88",
    details: {
      severity: "HIGH",
      host: "dmz-jumphost-01 (192.168.10.15)",
      mitreTactic: "T1110.001 - Password Guessing",
      iocOrRule: "Wazuh Rule 100055 (Threshold > 20 fails in 60s)",
      recommendedAction: "Apply automated fail2ban firewall drop rule for 203.0.113.88."
    }
  },
  {
    id: "ev-3",
    source: "SYSMON_EID_1",
    category: "ENDPOINT",
    badgeBg: "bg-emerald-500/10",
    badgeBorder: "border-emerald-500/30",
    color: "text-emerald-400",
    text: "Parent: WINWORD.EXE -> Child: powershell.exe -w hidden -enc JABzAD0...",
    details: {
      severity: "CRITICAL",
      host: "WS01-FINANCE (192.168.20.45)",
      mitreTactic: "T1204.002 - Malicious File & T1059.001 - PowerShell",
      iocOrRule: "Sysmon EID 1 (ParentImage: *\\winword.exe)",
      recommendedAction: "Kill child process tree PID 4812 and purge malicious email attachment."
    }
  },
  {
    id: "ev-4",
    source: "SURICATA_ALERT",
    category: "NETWORK",
    badgeBg: "bg-rose-500/10",
    badgeBorder: "border-rose-500/30",
    color: "text-rose-400",
    text: "ET MALWARE Cobalt Strike Malleable HTTPS Jitter Profile Detected",
    details: {
      severity: "CRITICAL",
      host: "Perimeter Gateway (pfSense)",
      mitreTactic: "T1573.002 - Asymmetric Cryptography",
      iocOrRule: "Suricata SID 2028391 (Cobalt Strike SSL)",
      recommendedAction: "Revoke internal session tokens and conduct immediate memory acquisition."
    }
  },
  {
    id: "ev-5",
    source: "SPLUNK_ES_CORRELATION",
    category: "SIEM",
    badgeBg: "bg-purple-500/10",
    badgeBorder: "border-purple-500/30",
    color: "text-purple-400",
    text: "Notable Event: Anomalous Kerberos Ticket Request (Event 4769 MSSQLSvc)",
    details: {
      severity: "HIGH",
      host: "DC01.corp.local (192.168.20.10)",
      mitreTactic: "T1558.003 - Kerberoasting",
      iocOrRule: "Splunk ES: EventCode=4769 TicketEncryptionType=0x17",
      recommendedAction: "Rotate Kerberos SPN service account password to 25+ character random passphrase."
    }
  },
  {
    id: "ev-6",
    source: "DEFENDER_XDR",
    category: "ENDPOINT",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-500/30",
    color: "text-cyan-300",
    text: "ASR Rule Blocked: Child process creation from Microsoft Office binary",
    details: {
      severity: "MEDIUM",
      host: "WS02-LEGAL (192.168.20.48)",
      mitreTactic: "T1204 - User Execution",
      iocOrRule: "ASR GUID: d4f940ab-401b-4efc-aadc-ad5f3c50688a",
      recommendedAction: "Event successfully blocked. Validate endpoint integrity."
    }
  }
];

export const Hero: React.FC<HeroProps> = ({ onOpenCmd }) => {
  const [events, setEvents] = useState<LiveTelemetryEvent[]>(LIVE_EVENTS.slice(0, 3));
  const [isStreaming, setIsStreaming] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(3);
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "NETWORK" | "ENDPOINT" | "SIEM">("ALL");
  const [ingestedCount, setIngestedCount] = useState(1542);
  const [defconLevel, setDefconLevel] = useState<"DEFCON 3 (WATCH)" | "DEFCON 2 (ELEVATED)" | "DEFCON 1 (ACTIVE INCIDENT)">("DEFCON 3 (WATCH)");
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [epsRate, setEpsRate] = useState(48.2);

  // Live Telemetry Event Simulator Loop
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const nextEvent = LIVE_EVENTS[currentIdx % LIVE_EVENTS.length];
      const now = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
      setEvents(prev => [
        { ...nextEvent, timestamp: now, id: `ev-${Date.now()}` },
        prev[0],
        prev[1]
      ]);
      setCurrentIdx(prev => prev + 1);
      setIngestedCount(prev => prev + 1);
      // Small jitter to simulated EPS
      setEpsRate(+(47.5 + Math.random() * 2.5).toFixed(1));
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming, currentIdx]);

  // Inject Simulated Live Threat Alert
  const handleInjectThreat = () => {
    // Play cyber alert blip via Web Audio
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      }
    } catch {
      // AudioContext policy fallback
    }

    const now = new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC";
    const emergencyEvent: LiveTelemetryEvent = {
      id: `ev-critical-${Date.now()}`,
      source: "CRITICAL_EDR_ISOLATION",
      category: "ENDPOINT",
      badgeBg: "bg-rose-500/20",
      badgeBorder: "border-rose-500/50",
      color: "text-rose-400",
      text: "[SIMULATED INJECTION] Host 192.168.20.45 quarantined: Ransomware canary trip & VSS deletion detected!",
      timestamp: now,
      isSimulated: true,
      details: {
        severity: "CRITICAL",
        host: "WS01 (192.168.20.45)",
        mitreTactic: "T1490 - Inhibit System Recovery & T1486 - Data Encrypted",
        iocOrRule: "Sysmon EID 1: vssadmin.exe delete shadows /all /quiet",
        recommendedAction: "Host automatically isolated via CrowdStrike/Wazuh Active Response playbook."
      }
    };

    setEvents(prev => [emergencyEvent, prev[0], prev[1]]);
    setIngestedCount(prev => prev + 1);
    setDefconLevel("DEFCON 1 (ACTIVE INCIDENT)");
    setIsAlertActive(true);
    setExpandedEventId(emergencyEvent.id);

    setTimeout(() => {
      setDefconLevel("DEFCON 3 (WATCH)");
      setIsAlertActive(false);
    }, 8500);
  };

  const toggleEventExpand = (id: string) => {
    setExpandedEventId(prev => prev === id ? null : id);
  };

  const filteredDisplayEvents = events.filter(e => {
    if (selectedFilter === "ALL") return true;
    return e.category === selectedFilter;
  });

  return (
    <section id="overview" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-grid-pattern">
      {/* Background Multi-Layer Cyber Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[320px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-5 left-10 w-[420px] h-[220px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Hero Copy (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Operational Status Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* DEFCON Status Pill */}
              <button 
                onClick={() => setDefconLevel(prev => {
                  if (prev === "DEFCON 3 (WATCH)") return "DEFCON 2 (ELEVATED)";
                  if (prev === "DEFCON 2 (ELEVATED)") return "DEFCON 1 (ACTIVE INCIDENT)";
                  return "DEFCON 3 (WATCH)";
                })}
                className={`cursor-pointer inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono backdrop-blur-md transition-all shadow-sm ${
                  defconLevel.includes("ACTIVE") 
                    ? "bg-rose-950/60 border-rose-500/80 text-rose-300 shadow-rose-500/20 shadow-lg"
                    : defconLevel.includes("ELEVATED")
                    ? "bg-amber-950/60 border-amber-500/80 text-amber-300 shadow-amber-500/20 shadow-lg"
                    : "bg-slate-900/90 border-slate-700/80 text-emerald-400 hover:border-emerald-500/60"
                }`}
                title="Click to toggle Defense Readiness Condition"
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                    defconLevel.includes("ACTIVE") ? "bg-rose-400" : defconLevel.includes("ELEVATED") ? "bg-amber-400" : "bg-emerald-400"
                  } opacity-75`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    defconLevel.includes("ACTIVE") ? "bg-rose-500" : defconLevel.includes("ELEVATED") ? "bg-amber-500" : "bg-emerald-500"
                  }`} />
                </span>
                <span className="font-semibold tracking-wide">
                  {defconLevel}
                </span>
              </button>

              {/* Coordinates Pill */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300 backdrop-blur-sm">
                <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-400">GRID:</span>
                <span className="text-emerald-400 font-semibold">SOC_TIER_2</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">24/7 DEFENSE</span>
              </div>

              {/* Live EPS Ingestion Rate Pill */}
              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300">
                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="text-slate-400">THROUGHPUT:</span>
                <span className="text-cyan-300 font-semibold">{epsRate} EPS</span>
              </div>

              {/* Quick Search Shortcut Pill */}
              {onOpenCmd && (
                <button
                  id="cmd-palette-trigger"
                  onClick={onOpenCmd}
                  className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 text-xs font-mono text-slate-400 hover:text-white transition-all shadow-sm"
                  title="Search command palette (Ctrl+K)"
                >
                  <Search className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Search Matrix</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-sans">
                    Ctrl+K
                  </kbd>
                </button>
              )}
            </div>

            {/* Headline with Cyber Gradient & Glow */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wider">
                <span className="w-2 h-2 rounded-sm bg-emerald-400 inline-block" />
                <span>OPERATIONAL PROFILE // DETECTION ENGINEERING & THREAT HUNTING</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                SOC Analyst & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.25)]">
                  Defensive Security
                </span>{" "}
                Specialist
              </h1>
            </div>

            {/* Subheadline with Key Highlight Terms */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Specialized in high-fidelity SIEM correlation (<span className="text-emerald-300 font-mono">Splunk SPL</span>, <span className="text-cyan-300 font-mono">Wazuh XML</span>, <span className="text-teal-300 font-mono">Sentinel KQL</span>), packet forensics (<span className="text-slate-100 font-medium">Wireshark/Zeek</span>), and endpoint artifact triage (<span className="text-emerald-300 font-mono">Sysmon</span>, <span className="text-slate-100 font-medium">EVTX</span>). Engineered to drive down MTTD and automate adversary containment.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#investigations"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-sm hover:from-emerald-400 hover:to-teal-300 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95 overflow-hidden"
              >
                {/* Subtle sheen highlight sweep on hover */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700" />
                <Crosshair className="w-4 h-4 text-slate-950" />
                <span>Explore Investigations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#siem-sandbox"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900/90 border border-slate-700/90 hover:border-emerald-500/60 hover:bg-slate-800/90 text-slate-200 font-semibold text-sm transition-all shadow-sm active:scale-95 backdrop-blur-sm"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Try Live SIEM Sandbox</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors"
                title="View RFC 9116 security policy & PGP armored key"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>PGP Contact</span>
              </a>
            </div>

            {/* Comprehensive Tactical HUD Metrics Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              
              {/* Card 1: TryHackMe */}
              <div className="group relative bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all shadow-sm hover:shadow-emerald-500/10">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-t-xl opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 font-extrabold tracking-wide">TOP 5%</div>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs text-slate-200 font-semibold mt-1">TryHackMe Global</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">75+ Blue Rooms Completed</div>
              </div>

              {/* Card 2: Cyber Ranges */}
              <div className="group relative bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all shadow-sm hover:shadow-cyan-500/10">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent rounded-t-xl opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-cyan-400 font-extrabold tracking-wide">50+ LABS</div>
                  <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs text-slate-200 font-semibold mt-1">Active Cyber Ranges</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">HTB Sherlocks & BTL1</div>
              </div>

              {/* Card 3: MITRE */}
              <div className="group relative bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl hover:border-amber-500/50 hover:bg-slate-800/70 transition-all shadow-sm hover:shadow-amber-500/10">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-transparent rounded-t-xl opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-400 font-extrabold tracking-wide">120+ TTPs</div>
                  <Sliders className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs text-slate-200 font-semibold mt-1">MITRE ATT&CK Mapped</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Enterprise Matrix</div>
              </div>

              {/* Card 4: MTTR */}
              <div className="group relative bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl hover:border-emerald-500/50 hover:bg-slate-800/70 transition-all shadow-sm hover:shadow-emerald-500/10">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-transparent rounded-t-xl opacity-80" />
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-400 font-extrabold tracking-wide">&lt; 18m MTTR</div>
                  <CheckCircle2 className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-xs text-slate-200 font-semibold mt-1">Mean Time To Triage</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">Automated Playbooks</div>
              </div>
            </div>

          </div>

          {/* Right Interactive SOC Command Center Monitor Card */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-2xl bg-slate-900/95 border shadow-2xl p-5 overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              isAlertActive
                ? "border-rose-500 animate-alert-pulse"
                : "border-slate-800/90 shadow-black/60"
            }`}>

              {/* Monitor Card Header with Integrated Radar */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  {/* macOS / Linux style dots */}
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-300 font-medium">soc-daemon://stream-live</span>
                    <div className="text-[10px] font-mono text-slate-500">TLS 1.3 // PORT 514 SYSLOG</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mini Cyber Radar Scanner */}
                  <div className="relative w-10 h-10 rounded-full border border-emerald-500/40 bg-black/60 flex items-center justify-center overflow-hidden shadow-inner">
                    {/* Range Rings */}
                    <div className="absolute inset-1 rounded-full border border-emerald-500/20" />
                    <div className="absolute inset-2.5 rounded-full border border-emerald-500/30" />
                    {/* Crosshairs */}
                    <div className="absolute w-full h-[1px] bg-emerald-500/20" />
                    <div className="absolute h-full w-[1px] bg-emerald-500/20" />
                    {/* Sweep Line */}
                    <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-emerald-200 animate-radar" />
                    {/* Center Point */}
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>

                  {/* Play/Pause Stream Toggle */}
                  <button
                    onClick={() => setIsStreaming(!isStreaming)}
                    aria-label={isStreaming ? "Pause live telemetry stream" : "Resume live telemetry stream"}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title={isStreaming ? "Pause Telemetry Feed" : "Resume Telemetry Feed"}
                  >
                    {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Stream Filter Pills & Simulation Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-[11px] font-mono">
                <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {(["ALL", "NETWORK", "ENDPOINT", "SIEM"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        selectedFilter === filter
                          ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-sm"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleInjectThreat}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 border border-rose-500/50 text-rose-300 font-semibold transition-all active:scale-95 shadow-sm"
                  title="Simulate and inject a critical threat alert into the live stream"
                >
                  <Zap className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                  <span>Simulate Threat Alert</span>
                </button>
              </div>

              {/* Telemetry Stream Feed with Smooth Animated Entrance & Click-to-Expand */}
              <div className="space-y-2.5 font-mono text-[11px] leading-relaxed min-h-[220px]">
                {filteredDisplayEvents.map((ev) => {
                  const isExpanded = expandedEventId === ev.id;

                  return (
                    <div 
                      key={ev.id} 
                      onClick={() => toggleEventExpand(ev.id)}
                      className={`cursor-pointer rounded-xl border p-2.5 transition-all duration-200 animate-stream-item ${
                        ev.isSimulated
                          ? "bg-rose-950/40 border-rose-500/70 shadow-md shadow-rose-500/15"
                          : isExpanded
                          ? "bg-slate-800/90 border-emerald-500/50 shadow-md"
                          : "bg-slate-950/85 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      {/* Event Row Header */}
                      <div className="flex items-center justify-between text-slate-500 text-[10px]">
                        <span>[{ev.timestamp || "2026-09-22 17:04:10 UTC"}]</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`px-1.5 py-0.2 rounded border text-[9px] font-bold ${ev.badgeBg} ${ev.badgeBorder} ${ev.color}`}>
                            {ev.category}
                          </span>
                          <span className={`${ev.color} font-semibold flex items-center gap-1`}>
                            {ev.isSimulated && <AlertTriangle className="w-3 h-3 text-rose-400 animate-bounce" />}
                            {ev.source}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-3 h-3 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Event Headline */}
                      <div className="text-slate-200 mt-1 break-words font-sans text-xs">
                        {ev.text}
                      </div>

                      {/* Expanded Forensic Detail Drawer */}
                      {isExpanded && ev.details && (
                        <div className="mt-2.5 pt-2.5 border-t border-slate-800 text-[10px] space-y-1.5 bg-black/40 p-2.5 rounded-lg border border-slate-800/80 animate-fade-in-up">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Target Host:</span>
                            <span className="text-slate-200 font-semibold">{ev.details.host}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">MITRE Technique:</span>
                            <span className="text-cyan-400">{ev.details.mitreTactic}</span>
                          </div>
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-500 flex-shrink-0">Rule / IoC:</span>
                            <span className="text-emerald-400 font-mono text-[9px] text-right break-all">
                              {ev.details.iocOrRule}
                            </span>
                          </div>
                          <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-800/60">
                            <span className="text-slate-500 flex-shrink-0">Action:</span>
                            <span className="text-amber-300 font-sans text-[10px] text-right">
                              {ev.details.recommendedAction}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Telemetry Footer Status */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>Ingested: <strong className="text-emerald-400">{ingestedCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-slate-500" />
                  <span>Dropped: <strong className="text-slate-300">0</strong></span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
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
