"use client";

import React, { useState } from "react";
import { SANITIZED_PCAP_STREAM, PcapPacket } from "@/data/pcapData";
import { 
  Activity, 
  ChevronRight, 
  ChevronDown, 
  Binary, 
  Filter, 
  ShieldCheck, 
  FileSearch,
  CheckCircle,
  Clock,
  Copy,
  Check
} from "lucide-react";

interface PcapDissectorProps {
  onShowToast?: (msg: string) => void;
}

export const PcapDissector: React.FC<PcapDissectorProps> = ({ onShowToast }) => {
  const [selectedPacket, setSelectedPacket] = useState<PcapPacket>(SANITIZED_PCAP_STREAM[2]); // Default Client Hello
  const [activeProtoFilter, setActiveProtoFilter] = useState<string>("ALL");
  const [expandedLayers, setExpandedLayers] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [copiedHex, setCopiedHex] = useState(false);

  const filteredPackets = SANITIZED_PCAP_STREAM.filter((p) => {
    if (activeProtoFilter === "ALL") return true;
    return p.protocol === activeProtoFilter;
  });

  const handleFilterChange = (proto: string) => {
    setActiveProtoFilter(proto);
    if (proto !== "ALL") {
      const match = SANITIZED_PCAP_STREAM.find((p) => p.protocol === proto);
      if (match) setSelectedPacket(match);
    }
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(selectedPacket.hexDump);
    setCopiedHex(true);
    onShowToast?.(`Frame #${selectedPacket.frameNo} hex dump copied to clipboard!`);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const toggleLayer = (index: number) => {
    setExpandedLayers((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section id="pcap-workbench" className="py-16 bg-[#080c15] border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <Activity className="w-4 h-4" />
              <span>NETWORK FORENSICS WORKBENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Interactive Web PCAP Packet Dissector
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Inspect sanitized network stream telemetry in a Wireshark-like environment. Select packets to analyze decoded OSI layers and hexadecimal payload dumps.
            </p>
          </div>

          {/* Protocol Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-lg text-xs font-mono">
            {["ALL", "TCP", "TLSv1.3"].map((proto) => (
              <button
                key={proto}
                onClick={() => handleFilterChange(proto)}
                className={`px-3 py-1 rounded transition-colors ${
                  activeProtoFilter === proto
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {proto}
              </button>
            ))}
          </div>
        </div>

        {/* Wireshark-like 3-Pane Interface */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          {/* PANE 1: PACKET LIST */}
          <div className="border-b border-slate-800 overflow-x-auto max-h-[220px] overflow-y-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950/90 text-slate-400 border-b border-slate-800 sticky top-0 z-10">
                <tr>
                  <th className="p-2.5 w-14">No.</th>
                  <th className="p-2.5 w-24">Time (s)</th>
                  <th className="p-2.5 w-36">Source</th>
                  <th className="p-2.5 w-36">Destination</th>
                  <th className="p-2.5 w-24">Protocol</th>
                  <th className="p-2.5 w-20">Length</th>
                  <th className="p-2.5">Packet Info Header</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                {filteredPackets.map((pkt) => {
                  const isSelected = selectedPacket.frameNo === pkt.frameNo;
                  return (
                    <tr
                      key={pkt.frameNo}
                      onClick={() => setSelectedPacket(pkt)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-200 font-semibold"
                          : "hover:bg-slate-800/50 text-slate-300"
                      }`}
                    >
                      <td className="p-2.5">{pkt.frameNo}</td>
                      <td className="p-2.5 text-slate-400">{pkt.timeDelta}</td>
                      <td className="p-2.5 text-slate-200">{pkt.source}</td>
                      <td className="p-2.5 text-slate-200">{pkt.dest}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          pkt.protocol === "TLSv1.3"
                            ? "bg-cyan-500/20 text-cyan-300"
                            : "bg-slate-800 text-slate-300"
                        }`}>
                          {pkt.protocol}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-400">{pkt.length}</td>
                      <td className="p-2.5 truncate max-w-xs sm:max-w-md">{pkt.info}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PANES 2 & 3: PROTOCOL DISSECTION TREE & HEX DUMP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-slate-950/80">
            {/* PANE 2: DISSECTION TREE (LEFT) */}
            <div className="lg:col-span-7 p-4 space-y-3 max-h-[300px] overflow-y-auto font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">
                Decoded Protocol Tree (Frame #{selectedPacket.frameNo})
              </div>

              {selectedPacket.layers.map((layer, idx) => {
                const isExpanded = !!expandedLayers[idx];
                return (
                  <div key={idx} className="rounded-lg bg-slate-900/80 border border-slate-800/80 overflow-hidden">
                    <button
                      onClick={() => toggleLayer(idx)}
                      className="w-full p-2.5 text-left flex items-center justify-between hover:bg-slate-800/50 transition-colors text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        )}
                        <span className="font-semibold text-[11px] truncate">{layer.layerName}</span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-3 border-t border-slate-800/60 space-y-1.5 bg-black/40 text-[11px]">
                        {layer.fields.map((f, fi) => (
                          <div key={fi} className="flex flex-wrap items-baseline gap-2">
                            <span className="text-slate-400">{f.key}:</span>
                            <span className="text-emerald-300 font-medium break-all">{f.value}</span>
                            {f.note && (
                              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/30">
                                {f.note}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* PANE 3: HEX / ASCII DUMP (RIGHT) */}
            <div className="lg:col-span-5 p-4 space-y-2 max-h-[300px] overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider">
                <span>Hexadecimal / ASCII Dump</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyHex}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors text-[10px] font-mono"
                    title="Copy hex dump to clipboard"
                  >
                    {copiedHex ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Hex</span>
                      </>
                    )}
                  </button>
                  <span className="text-slate-600">|</span>
                  <span className="text-cyan-400">Offset: 0x0000</span>
                </div>
              </div>
              <pre className="p-3 rounded-xl bg-black/90 border border-slate-800/80 text-[11px] text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                <code>{selectedPacket.hexDump}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
