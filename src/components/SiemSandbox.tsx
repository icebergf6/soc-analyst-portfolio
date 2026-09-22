"use client";

import React, { useState, useMemo } from "react";
import { SAMPLE_SIEM_LOGS, SiemLogEntry } from "@/data/siemLogs";
import { 
  Search, 
  Terminal, 
  Flame, 
  ShieldAlert, 
  Code, 
  Check, 
  Copy, 
  RotateCcw,
  Sparkles
} from "lucide-react";

interface SiemSandboxProps {
  onShowToast?: (msg: string) => void;
}

export const SiemSandbox: React.FC<SiemSandboxProps> = ({ onShowToast }) => {
  const [query, setQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState<SiemLogEntry | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyJson = () => {
    if (!selectedLog) return;
    navigator.clipboard.writeText(JSON.stringify(selectedLog.parsedFields, null, 2));
    setCopiedJson(true);
    onShowToast?.(`Parsed JSON for log #${selectedLog.id} copied to clipboard!`);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const presetQueries = [
    { label: "Failed SSH (4625/5710)", value: "Failed password" },
    { label: "Macro Spawn (Sysmon 1)", value: "WINWORD.EXE" },
    { label: "Account Failed (Event 4625)", value: "4625" },
    { label: "C2 Beacon SSL (Zeek)", value: "proto:tcp" }
  ];

  const filteredLogs = useMemo(() => {
    if (!query.trim()) return SAMPLE_SIEM_LOGS;
    const lower = query.toLowerCase();

    return SAMPLE_SIEM_LOGS.filter((log) => {
      return (
        log.rawMessage.toLowerCase().includes(lower) ||
        log.host.toLowerCase().includes(lower) ||
        log.source.toLowerCase().includes(lower) ||
        (log.user && log.user.toLowerCase().includes(lower)) ||
        (log.srcIp && log.srcIp.includes(lower)) ||
        (log.eventId && log.eventId.toString().includes(lower))
      );
    });
  }, [query]);

  return (
    <section id="siem-sandbox" className="py-16 bg-[#080c14] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <Terminal className="w-4 h-4" />
              <span>LIVE SIEM DETECTION PLAYGROUND</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive SIEM Query Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Test detection search syntax against real security event logs in memory. Filter across Windows EVTX, Sysmon, Zeek, and Linux auth.log in real time.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Matched: {filteredLogs.length} of {SAMPLE_SIEM_LOGS.length} Events</span>
          </div>
        </div>

        {/* Sandbox Console Container */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          {/* Query Bar */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800 space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <input
                type="text"
                placeholder='Enter SPL / KQL keyword (e.g. "Failed password", "WINWORD.EXE", "4625", "10.20.2.104")...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/70"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 text-[11px] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Presets:</span>
              </span>
              {presetQueries.map((pq) => (
                <button
                  key={pq.label}
                  onClick={() => setQuery(pq.value)}
                  className={`px-2.5 py-1 rounded-lg border transition-colors ${
                    query === pq.value
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
                  }`}
                >
                  {pq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Table */}
          <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="p-3 w-36">Timestamp</th>
                  <th className="p-3 w-32">Source</th>
                  <th className="p-3 w-32">Host</th>
                  <th className="p-3 w-28">Severity</th>
                  <th className="p-3">Raw Log Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                    className="hover:bg-slate-800/60 cursor-pointer transition-colors"
                  >
                    <td className="p-3 text-slate-400">{log.timestamp}</td>
                    <td className="p-3 text-cyan-300 font-semibold">{log.source}</td>
                    <td className="p-3 text-slate-200">{log.host}</td>
                    <td className="p-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        log.severity === "High"
                          ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                          : log.severity === "Medium"
                          ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300 truncate max-w-md sm:max-w-xl">
                      {log.rawMessage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredLogs.length === 0 && (
              <div className="p-12 text-center text-slate-400 font-mono text-xs">
                No logs matching &quot;{query}&quot;. Try selecting one of the presets above.
              </div>
            )}
          </div>

          {/* Expanded Selected Log Detail Footer */}
          {selectedLog && (
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2 animate-fade-in-up">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold truncate max-w-xs sm:max-w-md">
                  Parsed JSON Fields (ID: {selectedLog.id} | Host: {selectedLog.host})
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyJson}
                    className="inline-flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors text-xs"
                    title="Copy parsed JSON"
                  >
                    {copiedJson ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => setSelectedLog(null)}
                    className="text-slate-400 hover:text-white"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
              <pre className="p-3 rounded-lg bg-black/80 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                <code>{JSON.stringify(selectedLog.parsedFields, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
