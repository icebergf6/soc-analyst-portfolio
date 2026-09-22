"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/data/caseStudies";
import { IncidentCase } from "@/types/portfolio";
import { IncidentReportModal } from "./IncidentReportModal";
import { 
  ShieldAlert, 
  Clock, 
  ArrowUpRight, 
  Layers, 
  Fingerprint, 
  CheckCircle,
  FileSearch,
  ExternalLink
} from "lucide-react";

interface CaseStudiesProps {
  onShowToast?: (msg: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onShowToast }) => {
  const [selectedIncident, setSelectedIncident] = useState<IncidentCase | null>(null);

  return (
    <section id="investigations" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <FileSearch className="w-4 h-4" />
              <span>DETECTION & RESPONSE ARTIFACTS</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Featured SOC Incident Case Studies
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              End-to-end incident reconstructions mapping adversary initial access, forensic telemetry analysis, real detection queries, and containment execution.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
            <span>Simulated & Sanitized Range Artifacts</span>
          </div>
        </div>

        {/* 3 Featured Incident Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((incident) => {
            const isCritical = incident.severity === "Critical";

            return (
              <div
                key={incident.id}
                className="group flex flex-col justify-between rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-6 transition-all shadow-lg hover:shadow-emerald-500/5"
              >
                <div>
                  {/* Card Badge Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isCritical
                          ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {incident.severity.toUpperCase()} SEVERITY
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <Clock className="w-3 h-3" />
                      <span>MTTD: {incident.mttdTriage}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-3">
                    {incident.title}
                  </h3>

                  {/* Summary preview */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {incident.summaryPreview}
                  </p>

                  {/* MITRE ATT&CK Mapping Pills */}
                  <div className="mb-4 space-y-1.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>Mapped MITRE Techniques</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {incident.mitreTechniques.map((tech) => (
                        <span
                          key={tech.id}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-cyan-500/30"
                        >
                          {tech.id}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Meta */}
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-5 space-y-1.5 text-[11px] font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Detected Via:</span>
                      <span className="text-slate-300 truncate max-w-[180px]">{incident.detectedBy.split("&")[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Telemetry Events:</span>
                      <span className="text-emerald-400 font-semibold">{incident.timeline.length} Steps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Defanged IoCs:</span>
                      <span className="text-amber-400 font-semibold">{incident.iocs.length} Indicators</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Trigger */}
                <button
                  onClick={() => setSelectedIncident(incident)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 group/btn"
                >
                  <span>View Investigation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Modal Component */}
      <IncidentReportModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onShowToast={onShowToast}
      />
    </section>
  );
};
