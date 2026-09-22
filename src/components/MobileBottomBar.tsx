"use client";

import React from "react";
import { 
  Shield, 
  Wrench, 
  FileSearch, 
  Network, 
  FileText,
  Search
} from "lucide-react";

interface MobileBottomBarProps {
  onOpenResume: () => void;
  onOpenCmd: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenResume,
  onOpenCmd
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-800/90 py-2 px-3 shadow-2xl">
      <div className="flex items-center justify-around text-[10px] font-mono">
        <a
          href="#overview"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 active:text-emerald-400 transition-colors"
        >
          <Shield className="w-4 h-4" />
          <span>Overview</span>
        </a>

        <a
          href="#arsenal"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 active:text-emerald-400 transition-colors"
        >
          <Wrench className="w-4 h-4" />
          <span>Arsenal</span>
        </a>

        <a
          href="#investigations"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 active:text-emerald-400 transition-colors"
        >
          <FileSearch className="w-4 h-4" />
          <span>Cases</span>
        </a>

        <a
          href="#homelab"
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 active:text-emerald-400 transition-colors"
        >
          <Network className="w-4 h-4" />
          <span>Lab</span>
        </a>

        <button
          onClick={onOpenCmd}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 active:text-cyan-400 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>

        <button
          onClick={onOpenResume}
          className="flex flex-col items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Resume</span>
        </button>
      </div>
    </div>
  );
};
