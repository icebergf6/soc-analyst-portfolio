"use client";

import React, { useState } from "react";
import { MITRE_TACTICS_DATA, MitreTechniqueItem } from "@/data/mitre";
import { 
  Layers, 
  ShieldCheck, 
  ExternalLink, 
  AlertTriangle, 
  Code, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Copy,
  Check
} from "lucide-react";

interface MitreMatrixProps {
  onShowToast?: (msg: string) => void;
}

export const MitreMatrix: React.FC<MitreMatrixProps> = ({ onShowToast }) => {
  const [selectedTechnique, setSelectedTechnique] = useState<MitreTechniqueItem>(
    MITRE_TACTICS_DATA[0].techniques[0]
  );
  const [copiedQuery, setCopiedQuery] = useState(false);

  const handleCopyQuery = () => {
    navigator.clipboard.writeText(selectedTechnique.detectionRule);
    setCopiedQuery(true);
    onShowToast?.(`Detection rule for ${selectedTechnique.id} copied to clipboard!`);
    setTimeout(() => setCopiedQuery(false), 2000);
  };

  return (
    <section id="mitre-matrix" className="py-16 bg-[#070b13] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono tracking-wider uppercase mb-2">
              <Layers className="w-4 h-4" />
              <span>DEFENSIVE COVERAGE MAPPING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive MITRE ATT&CK&reg; Matrix Navigator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Visualizing defensive telemetry coverage across the adversary kill chain. Click any technique card to inspect corresponding detection logic and hardening controls.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>120+ ATT&CK Techniques Mapped</span>
          </div>
        </div>

        {/* Matrix Grid Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 overflow-x-auto pb-2">
          {MITRE_TACTICS_DATA.map((tactic) => (
            <div
              key={tactic.code}
              className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 flex flex-col space-y-2.5 min-w-[150px]"
            >
              <div className="border-b border-slate-800 pb-2">
                <div className="text-[10px] font-mono text-cyan-400 font-bold">
                  {tactic.code}
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {tactic.tacticName}
                </div>
              </div>

              {/* Techniques inside this tactic */}
              <div className="space-y-2">
                {tactic.techniques.map((tech) => {
                  const isSelected = selectedTechnique.id === tech.id;
                  const isCovered = !!tech.coveredInCaseId;

                  return (
                    <button
                      key={tech.id}
                      onClick={() => setSelectedTechnique(tech)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs font-mono ${
                        isSelected
                          ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-500/10 scale-[1.02]"
                          : isCovered
                          ? "bg-slate-950/80 border-slate-700/80 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-900"
                          : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-cyan-400">
                          {tech.id}
                        </span>
                        {isCovered && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Simulated Case Study Available" />
                        )}
                      </div>
                      <div className="text-[11px] font-sans font-medium text-slate-200 mt-1 line-clamp-2 leading-tight">
                        {tech.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Technique Deep-Dive Inspector Panel */}
        <div className="rounded-xl bg-slate-900/95 border border-cyan-500/40 p-5 sm:p-6 space-y-4 shadow-xl shadow-cyan-500/5">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>TACTIC: {selectedTechnique.tactic.toUpperCase()}</span>
                <span className="text-slate-600">|</span>
                <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  {selectedTechnique.id}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                {selectedTechnique.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {selectedTechnique.description}
              </p>
            </div>

            {selectedTechnique.coveredInCaseId && (
              <a
                href="#investigations"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25 transition-colors text-xs font-mono font-semibold"
              >
                <span>View Full Incident Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Detection Query Rule */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  <Code className="w-3.5 h-3.5" />
                  <span>Detection Engineering Query</span>
                </div>
                <button
                  onClick={handleCopyQuery}
                  className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                  title="Copy detection query"
                >
                  {copiedQuery ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Query</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-2.5 rounded bg-black/90 border border-slate-800/80 text-[11px] font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
                <code>{selectedTechnique.detectionRule}</code>
              </pre>
            </div>

            {/* Hardening / Mitigation */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Defensive Hardening & Mitigation Strategy</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans text-xs pt-1">
                {selectedTechnique.mitigation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
