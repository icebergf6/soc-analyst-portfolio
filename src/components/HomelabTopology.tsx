"use client";

import React, { useState, useEffect } from "react";
import { HOMELAB_NODES } from "@/data/homelab";
import { HomelabNode } from "@/types/portfolio";
import { 
  Network, 
  Server, 
  ShieldAlert, 
  Activity, 
  Cpu, 
  HardDrive, 
  Lock, 
  Terminal, 
  ChevronRight,
  Database,
  Radio,
  FileText,
  Zap,
  PlayCircle
} from "lucide-react";

export const HomelabTopology: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<HomelabNode>(HOMELAB_NODES[0]);
  const [packetStep, setPacketStep] = useState(0);
  const [latency, setLatency] = useState(1.4);

  // Simulate packet tracer flow
  useEffect(() => {
    const timer = setInterval(() => {
      setPacketStep((prev) => (prev + 1) % 4);
      setLatency(+(1.2 + Math.random() * 0.8).toFixed(1));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const flowNodes = [
    { name: "Kali Attacker", vlan: "VLAN 10", ip: "192.168.10.99" },
    { name: "pfSense Gateway", vlan: "VLAN 10/20", ip: "192.168.10.1" },
    { name: "Victim Workstation", vlan: "VLAN 20", ip: "192.168.20.45" },
    { name: "Wazuh SIEM Ingestion", vlan: "VLAN 30", ip: "192.168.30.50" },
  ];

  return (
    <section id="homelab" className="py-20 bg-[#090d16] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <Network className="w-4 h-4" />
              <span>DEFENSIVE TESTBED & TELEMETRY LAB</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Homelab Architecture & Network Topology
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Fully virtualized environment designed to execute controlled adversary emulation (Atomic Red Team) and tune SIEM correlation rules across isolated VLANs.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Telemetry Pipeline: Wazuh Manager + Suricata EVE JSON</span>
          </div>
        </div>

        {/* Live Packet Flow Tracer Bar */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 shadow-lg mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span className="font-semibold">Simulated Attack & Telemetry Ingestion Tracer</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Ping Latency: <strong className="text-emerald-400">{latency}ms</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">Status: Active Inspection</span>
            </div>
          </div>

          {/* Tracer Nodes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {flowNodes.map((fn, idx) => {
              const isCurrent = packetStep === idx;
              return (
                <div
                  key={fn.name}
                  className={`relative p-3 rounded-lg border transition-all ${
                    isCurrent
                      ? "bg-emerald-500/15 border-emerald-500/80 shadow-md shadow-emerald-500/10 scale-[1.02]"
                      : "bg-slate-950/60 border-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{fn.vlan}</span>
                    {isCurrent && (
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{fn.name}</div>
                  <div className="text-[11px] font-mono text-emerald-400/90 mt-0.5">{fn.ip}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Network Segmentation Visual Summary Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-rose-500/20 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">VLAN 10: PERIMETER / DMZ</span>
              <Lock className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              pfSense CE Gateway + Isolated Kali Linux adversary simulation sandbox.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400">VLAN 20: CORPORATE LAN</span>
              <Server className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Windows Server 2022 (AD DS / DNS) + Windows 11 client with Sysmon 15.14.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">VLAN 30: SOC & SIEM CLUSTER</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Wazuh Manager, Elasticsearch 8.x, and Kibana dashboard for log ingestion.
            </p>
          </div>
        </div>

        {/* Interactive Topology Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node Selector List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-mono text-slate-400 px-1 uppercase tracking-wider">
              Interactive Nodes (Select to inspect telemetry):
            </div>

            {HOMELAB_NODES.map((node) => {
              const isSelected = selectedNode.id === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-slate-800 border-emerald-500/80 shadow-lg shadow-emerald-500/5"
                      : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {node.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        node.status === "Isolated"
                          ? "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                          : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                      }`}>
                        {node.status}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">{node.role}</div>
                    <div className="text-[11px] font-mono text-emerald-400/90">{node.ip}</div>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      isSelected ? "translate-x-1 text-emerald-400" : ""
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Node Inspector Details Panel (Right) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-xl">
              {/* Inspector Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">
                    {selectedNode.segment}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedNode.role}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded border border-slate-800 inline-block">
                    {selectedNode.ip}
                  </div>
                </div>
              </div>

              {/* Specs & OS Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Operating System</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200">{selectedNode.os}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Allocated Hardware Specs</span>
                  </div>
                  <p className="text-xs font-mono text-slate-200">{selectedNode.specs}</p>
                </div>
              </div>

              {/* Installed Agents & Telemetry Feeds */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Active Defensive Agents & Packages
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.installedAgents.map((agent, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800/80 text-emerald-300 border border-slate-700"
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Monitored Telemetry Log Paths
                  </div>
                  <div className="space-y-1">
                    {selectedNode.telemetryLogs.map((log, i) => (
                      <div
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 flex items-center gap-2"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Ingested Event Payload */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Real-time Ingested Telemetry Sample</span>
                  </span>
                  <span className="text-slate-500 text-[11px]">JSON / Syslog format</span>
                </div>
                <pre className="p-3 rounded-lg bg-black/90 border border-slate-800 text-[11px] font-mono text-emerald-300/90 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  <code>{selectedNode.sampleLog}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
