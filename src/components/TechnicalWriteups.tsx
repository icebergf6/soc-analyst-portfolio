"use client";

import React, { useState, useMemo } from "react";
import { TECHNICAL_WRITEUPS } from "@/data/writeups";
import { WriteupItem } from "@/types/portfolio";
import { WriteupModal } from "./WriteupModal";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowUpRight, 
  Terminal, 
  FileText,
  Filter
} from "lucide-react";

type FilterCat = "All" | "Blue Team CTF" | "Detection Engineering" | "Defensive Scripting";

export const TechnicalWriteups: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCat>("All");
  const [selectedWriteup, setSelectedWriteup] = useState<WriteupItem | null>(null);

  const filteredWriteups = useMemo(() => {
    if (activeCategory === "All") return TECHNICAL_WRITEUPS;
    return TECHNICAL_WRITEUPS.filter((w) => w.category === activeCategory);
  }, [activeCategory]);

  const categories: FilterCat[] = [
    "All",
    "Blue Team CTF",
    "Detection Engineering",
    "Defensive Scripting"
  ];

  return (
    <section id="writeups" className="py-20 bg-slate-950/60 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-2">
              <BookOpen className="w-4 h-4" />
              <span>KNOWLEDGE BASE & RESEARCH</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Technical Writeups & Blue Team Research
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl">
              In-depth defensive post-mortems, CTF challenge breakdowns, detection rule development, and custom security automation guides.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-2 rounded-lg">
            <span>{TECHNICAL_WRITEUPS.length} Published Analyses</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWriteups.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 p-6 transition-all shadow-md hover:shadow-emerald-500/5"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {item.platform}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2.5">
                  {item.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedWriteup(item)}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-slate-800/90 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 text-xs font-semibold transition-all group/btn"
              >
                <span>Read Full Writeup</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Full Writeup Reading Modal */}
      <WriteupModal
        writeup={selectedWriteup}
        onClose={() => setSelectedWriteup(null)}
      />
    </section>
  );
};
