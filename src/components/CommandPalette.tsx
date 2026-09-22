"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  Terminal, 
  ShieldAlert, 
  Wrench, 
  Network, 
  BookOpen, 
  FileText, 
  KeyRound, 
  X, 
  ArrowRight,
  ExternalLink,
  Activity,
  Layers
} from "lucide-react";
import { FEATURED_INCIDENTS } from "@/data/incidents";
import { SOC_ARSENAL } from "@/data/arsenal";
import { PGP_DATA } from "@/data/pgp";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onShowToast: (msg: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onShowToast
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
          const btn = document.getElementById("cmd-palette-trigger");
          if (btn) btn.click();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      id: "action-resume",
      title: "Download / Preview Sanitized Resume",
      category: "Document",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        onOpenResume();
      }
    },
    {
      id: "action-pgp",
      title: "Copy PGP Public Key Armored Block",
      category: "Security",
      icon: <KeyRound className="w-4 h-4 text-amber-400" />,
      action: () => {
        navigator.clipboard.writeText(PGP_DATA.publicKeyArmored);
        onClose();
        onShowToast("PGP Public Key copied to clipboard!");
      }
    },
    {
      id: "action-fingerprint",
      title: "Copy PGP Key Fingerprint",
      category: "Security",
      icon: <Terminal className="w-4 h-4 text-cyan-400" />,
      action: () => {
        navigator.clipboard.writeText(PGP_DATA.fingerprint);
        onClose();
        onShowToast("PGP Fingerprint copied!");
      }
    },
    {
      id: "action-siem-sandbox",
      title: "Open Live SIEM Query Sandbox",
      category: "Interactive Tool",
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        const el = document.getElementById("siem-sandbox");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "action-mitre-matrix",
      title: "Navigate to MITRE ATT&CK Matrix Heatmap",
      category: "Defensive Matrix",
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        const el = document.getElementById("mitre-matrix");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    },
    {
      id: "action-pcap",
      title: "Open Web PCAP Packet Dissector",
      category: "Forensics Lab",
      icon: <Activity className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onClose();
        const el = document.getElementById("pcap-workbench");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  ];

  const filteredIncidents = FEATURED_INCIDENTS.filter(i => 
    i.title.toLowerCase().includes(query.toLowerCase()) ||
    i.badgeTags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredTools = SOC_ARSENAL.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Type a command, tool, or investigation... (ESC to exit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-white sm:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4 text-xs font-mono">
          {/* Quick Actions */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider px-2">
              Quick Operations
            </div>
            {quickActions.map(qa => (
              <button
                key={qa.id}
                onClick={qa.action}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  {qa.icon}
                  <span className="text-slate-200 group-hover:text-emerald-300 transition-colors">
                    {qa.title}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {qa.category}
                </span>
              </button>
            ))}
          </div>

          {/* Incident Investigations */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider px-2">
              Featured Case Studies
            </div>
            {filteredIncidents.map(inc => (
              <a
                key={inc.id}
                href="#investigations"
                onClick={onClose}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-200 group-hover:text-cyan-300 transition-colors truncate max-w-[320px] sm:max-w-md">
                    {inc.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-cyan-400">{inc.mttdTriage}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
                </div>
              </a>
            ))}
          </div>

          {/* Tools */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider px-2">
              Matching Tools & Telemetry
            </div>
            {filteredTools.map(tool => (
              <a
                key={tool.id}
                href="#arsenal"
                onClick={onClose}
                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-800/80 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                  <span className="text-slate-300 group-hover:text-white">
                    {tool.name}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400/80">
                  {tool.category}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 px-4">
          <span>Navigate with mouse or keyboard</span>
          <span className="text-emerald-400">SOC_NAVIGATOR v2.6</span>
        </div>
      </div>
    </div>
  );
};
