"use client";

import React, { useState, useMemo } from "react";
import { SOC_ARSENAL } from "@/data/arsenal";
import { ToolCategory, ToolItem } from "@/types/portfolio";
import { 
  Wrench, 
  Search, 
  Code2, 
  Flame, 
  ShieldAlert, 
  CloudLightning, 
  Activity, 
  Cpu, 
  Terminal, 
  Monitor, 
  Zap, 
  Crosshair, 
  Layers, 
  HardDrive, 
  FolderLock, 
  Code, 
  FileCode,
  Check,
  Copy
} from "lucide-react";

const CATEGORIES: (ToolCategory | "All Categories")[] = [
  "All Categories",
  "SIEM & Log Management",
  "Network Forensics",
  "Endpoint & Intel",
  "OS & Scripting"
];

const renderToolIcon = (iconName: string) => {
  const props = { className: "w-5 h-5 text-emerald-400" };
  switch (iconName) {
    case "Flame": return <Flame {...props} />;
    case "Search": return <Search {...props} />;
    case "ShieldAlert": return <ShieldAlert {...props} />;
    case "CloudLightning": return <CloudLightning {...props} />;
    case "Activity": return <Activity {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Terminal": return <Terminal {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Zap": return <Zap {...props} />;
    case "Crosshair": return <Crosshair {...props} />;
    case "Layers": return <Layers {...props} />;
    case "HardDrive": return <HardDrive {...props} />;
    case "FolderLock": return <FolderLock {...props} />;
    case "Code": return <Code {...props} />;
    case "FileCode": return <FileCode {...props} />;
    default: return <Wrench {...props} />;
  }
};

interface ArsenalMatrixProps {
  onShowToast?: (msg: string) => void;
}

export const ArsenalMatrix: React.FC<ArsenalMatrixProps> = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "All Categories">("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return SOC_ARSENAL.filter((tool) => {
      const matchesCat = selectedCategory === "All Categories" || tool.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchesQuery = 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopySyntax = (toolId: string, syntax: string, toolName?: string) => {
    navigator.clipboard.writeText(syntax);
    setCopiedId(toolId);
    onShowToast?.(`Query snippet for ${toolName || "tool"} copied to clipboard!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="arsenal" className="py-20 bg-[#090d16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <Wrench className="w-4 h-4" />
              <span>DEFENSIVE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              SOC Tool Arsenal & Skills Matrix
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              Categorized defensive tooling, log management pipelines, forensics analyzers, and automation scripts utilized in daily Tier 1/2 operations.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tool, tag, or syntax..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/80"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-5 transition-all shadow-md hover:shadow-emerald-500/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700/80 group-hover:border-emerald-500/40 transition-colors">
                      {renderToolIcon(tool.iconName)}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {tool.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20">
                    {tool.proficiency}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {tool.description}
                </p>

                {/* Operational Use Case */}
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 mb-4">
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">
                    Operational Application
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    {tool.useCase}
                  </p>
                </div>

                {/* Sample Syntax if present */}
                {tool.highlightSyntax && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3 h-3 text-emerald-400" />
                        <span>Telemetry / Query Snippet</span>
                      </span>
                      <button
                        onClick={() => handleCopySyntax(tool.id, tool.highlightSyntax!, tool.name)}
                        className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                        title="Copy query syntax"
                      >
                        {copiedId === tool.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-2.5 rounded bg-black/70 border border-slate-800/90 text-[11px] font-mono text-emerald-300/90 overflow-x-auto whitespace-pre-wrap break-all leading-tight">
                      <code>{tool.highlightSyntax}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* Tags Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400">No tools or telemetry match &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Categories");
              }}
              className="mt-3 text-xs font-mono text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
