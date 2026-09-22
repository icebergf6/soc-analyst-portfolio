"use client";

import React, { useState, useEffect } from "react";
import { IncidentCase } from "@/types/portfolio";
import { 
  X, 
  ShieldAlert, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink, 
  Server, 
  AlertTriangle,
  FileCode,
  Crosshair,
  Printer,
  Download
} from "lucide-react";

interface IncidentModalProps {
  incident: IncidentCase | null;
  onClose: () => void;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({ incident, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "timeline" | "queries" | "containment" | "iocs">("overview");
  const [copiedQueryIdx, setCopiedQueryIdx] = useState<number | null>(null);
  const [copiedIocValue, setCopiedIocValue] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (incident) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [incident]);

  if (!incident) return null;

  const handleCopyQuery = (syntax: string, idx: number) => {
    navigator.clipboard.writeText(syntax);
    setCopiedQueryIdx(idx);
    setTimeout(() => setCopiedQueryIdx(null), 2000);
  };

  const handleCopyIoc = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedIocValue(val);
    setTimeout(() => setCopiedIocValue(null), 2000);
  };

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                incident.severity === "Critical"
                  ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              }`}>
                SEVERITY: {incident.severity.toUpperCase()}
              </span>

              <span className="text-xs font-mono text-slate-400">
                MTTD: <strong className="text-emerald-400 font-semibold">{incident.mttdTriage}</strong>
              </span>

              <span className="text-slate-700">|</span>

              <span className="text-xs font-mono text-slate-400">
                Detected: {incident.detectedBy}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {incident.title}
            </h2>

            {/* MITRE Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {incident.mitreTechniques.map((tech) => (
                <a
                  key={tech.id}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-800/90 text-cyan-300 border border-cyan-500/30 hover:bg-slate-800 transition-colors"
                >
                  <span>MITRE {tech.id}: {tech.name}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-colors text-xs font-mono font-semibold"
              title="Print or Export Formal Incident Report as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export PDF</span>
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

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/90 px-6 gap-2 sm:gap-6 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab("timeline")}
            className={`py-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === "timeline"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Timeline & Telemetry ({incident.timeline.length})
          </button>
          <button
            onClick={() => setActiveTab("queries")}
            className={`py-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === "queries"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Detection Queries ({incident.queries.length})
          </button>
          <button
            onClick={() => setActiveTab("containment")}
            className={`py-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === "containment"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Containment & Hardening
          </button>
          <button
            onClick={() => setActiveTab("iocs")}
            className={`py-3 px-1 border-b-2 font-medium transition-colors whitespace-nowrap ${
              activeTab === "iocs"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Defanged IoCs ({incident.iocs.length})
          </button>
        </div>

        {/* Modal Tab Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6 text-sm">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                  Executive Briefing
                </h4>
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 leading-relaxed">
                  {incident.executiveSummary}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Target Environment
                  </div>
                  <p className="text-xs font-mono text-white">{incident.environment}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Detection Mechanism
                  </div>
                  <p className="text-xs font-mono text-emerald-300">{incident.detectedBy}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                  Post-Mortem Lessons Learned
                </h4>
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 leading-relaxed text-xs">
                  {incident.lessonsLearned}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATTACK TIMELINE */}
          {activeTab === "timeline" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-400">
                Chronological reconstruction of adversary actions, telemetry sources, and security responses.
              </p>

              <div className="relative border-l border-slate-800 ml-4 space-y-6 pl-6 pt-2">
                {incident.timeline.map((step, idx) => (
                  <div key={idx} className="relative group">
                    {/* Pulsing indicator node */}
                    <span className="absolute -left-[31px] top-1 flex h-3 w-3">
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900" />
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 font-semibold">
                          {step.timestamp}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                          {step.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Host: <span className="text-slate-200">{step.host}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="text-[11px] font-mono text-slate-500">
                        Telemetry Source: {step.telemetrySource}
                      </div>

                      {step.eventSnippet && (
                        <pre className="mt-2 p-2.5 rounded bg-black/80 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap break-all">
                          <code>{step.eventSnippet}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DETECTION QUERIES */}
          {activeTab === "queries" && (
            <div className="space-y-6">
              <p className="text-xs text-slate-400">
                Production detection logic, correlation rules, and hunting syntax tested against this threat scenario.
              </p>

              {incident.queries.map((q, idx) => (
                <div key={idx} className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold">
                      <FileCode className="w-4 h-4" />
                      {q.platform}
                    </span>

                    <button
                      onClick={() => handleCopyQuery(q.syntax, idx)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors"
                    >
                      {copiedQueryIdx === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Syntax</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">{q.explanation}</p>

                  <pre className="p-3 rounded-lg bg-black/90 border border-slate-800/90 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    <code>{q.syntax}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: CONTAINMENT & HARDENING */}
          {activeTab === "containment" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Containment & Eradication Playbook
                </h4>
                <div className="space-y-2.5">
                  {incident.containmentActions.map((action, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-mono text-[10px] flex items-center justify-center border border-rose-500/40">
                        {idx + 1}
                      </div>
                      <div className="leading-relaxed">{action}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Preventative Hardening & Mitigation
                </h4>
                <div className="space-y-2.5">
                  {incident.mitigationAdvice.map((advice, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div className="leading-relaxed">{advice}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DEFANGED IOCS */}
          {activeTab === "iocs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Standard defanged indicators of compromise extracted during analysis. Safe for copy and sharing.
                </p>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Defanged: [.] and hxxp
                </span>
              </div>

              <div className="rounded-xl border border-slate-800 overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Indicator Value</th>
                      <th className="p-3">Context / Role</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                    {incident.iocs.map((ioc, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-semibold text-cyan-400">{ioc.type}</td>
                        <td className="p-3 text-slate-200 break-all select-all font-mono">
                          {ioc.value}
                        </td>
                        <td className="p-3 text-slate-400 text-[11px] font-sans">
                          {ioc.context}
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleCopyIoc(ioc.value)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                            title="Copy indicator"
                          >
                            {copiedIocValue === ioc.value ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>CLASSIFICATION: SANITIZED_PUBLIC_CASE_REPORT</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
