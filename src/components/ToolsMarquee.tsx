"use client";

import React from "react";
import { 
  Flame, 
  ShieldAlert, 
  Activity, 
  Monitor, 
  Cpu, 
  Zap, 
  Globe, 
  Layers, 
  Code2, 
  HardDrive 
} from "lucide-react";

interface MarqueeTool {
  name: string;
  category: string;
  icon: React.ReactNode;
}

const TOOLS_LIST: MarqueeTool[] = [
  {
    name: "Splunk SIEM",
    category: "SIEM / Search",
    icon: <Flame className="w-4 h-4 text-amber-400" />
  },
  {
    name: "Wazuh XDR",
    category: "XDR / SIEM",
    icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />
  },
  {
    name: "Wireshark",
    category: "Packet Forensics",
    icon: <Activity className="w-4 h-4 text-cyan-400" />
  },
  {
    name: "Microsoft Sysmon",
    category: "Host Telemetry",
    icon: <Monitor className="w-4 h-4 text-emerald-400" />
  },
  {
    name: "Zeek NIDS",
    category: "Network Forensics",
    icon: <Cpu className="w-4 h-4 text-cyan-400" />
  },
  {
    name: "Velociraptor",
    category: "Endpoint DFIR",
    icon: <Zap className="w-4 h-4 text-amber-400" />
  },
  {
    name: "Burp Suite",
    category: "AppSec Assessment",
    icon: <Globe className="w-4 h-4 text-orange-400" />
  },
  {
    name: "YARA & MITRE ATT&CK",
    category: "Threat Intel",
    icon: <Layers className="w-4 h-4 text-purple-400" />
  },
  {
    name: "Python & Bash",
    category: "SOC Automation",
    icon: <Code2 className="w-4 h-4 text-teal-400" />
  },
  {
    name: "FTK Imager / Autopsy",
    category: "Disk Forensics",
    icon: <HardDrive className="w-4 h-4 text-blue-400" />
  }
];

export const ToolsMarquee: React.FC = () => {
  // Duplicate array items to create a seamless infinite CSS loop
  const marqueeItems = [...TOOLS_LIST, ...TOOLS_LIST];

  return (
    <div className="relative w-full py-4 bg-slate-950/90 border-y border-slate-800/80 overflow-hidden select-none">
      {/* Subtle Gradient Mask Overlays (Left & Right) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#090d16] via-[#090d16]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#090d16] via-[#090d16]/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Scrolling Track */}
      <div className="animate-marquee flex items-center gap-4 hover:[animation-play-state:paused]">
        {marqueeItems.map((tool, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors shadow-sm flex-shrink-0"
          >
            <div className="p-1 rounded bg-slate-950 border border-slate-800">
              {tool.icon}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-200 whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 whitespace-nowrap">
                {tool.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
