"use client";

import React, { useState, useEffect } from "react";
import { WriteupItem } from "@/types/portfolio";
import { 
  X, 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag, 
  CheckCircle2, 
  Code, 
  Copy, 
  Check, 
  ExternalLink 
} from "lucide-react";

interface WriteupModalProps {
  writeup: WriteupItem | null;
  onClose: () => void;
}

export const WriteupModal: React.FC<WriteupModalProps> = ({ writeup, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (writeup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [writeup]);

  if (!writeup) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950/90 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                {writeup.category}
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Platform: {writeup.platform}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {writeup.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {writeup.title}
            </h2>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {writeup.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close writeup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-sm leading-relaxed">
          {/* Overview */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Investigation Overview
            </h4>
            <p className="text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {writeup.fullContent.overview}
            </p>
          </div>

          {/* Scenario */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Threat Scenario & Context
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {writeup.fullContent.scenario}
            </p>
          </div>

          {/* Step-by-Step Methodology */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Analysis Methodology & Evidence Recovery
            </h4>
            <div className="space-y-2">
              {writeup.fullContent.methodology.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-mono text-[10px] flex items-center justify-center border border-slate-700">
                    {idx + 1}
                  </span>
                  <div>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Analysis */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Forensic Analysis Findings
            </h4>
            <p className="text-slate-300 leading-relaxed text-xs">
              {writeup.fullContent.evidenceAnalysis}
            </p>
          </div>

          {/* Code Snippet if present */}
          {writeup.fullContent.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {writeup.fullContent.codeSnippet.caption}
                </span>
                <button
                  onClick={() => handleCopy(writeup.fullContent.codeSnippet!.code)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-emerald-400 transition-colors"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-black/90 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                <code>{writeup.fullContent.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Key Defensive Takeaways */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
              Key Defensive Takeaways
            </h4>
            <div className="space-y-2">
              {writeup.fullContent.takeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>DOCUMENTATION TYPE: BLUE_TEAM_WRITEUP</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
