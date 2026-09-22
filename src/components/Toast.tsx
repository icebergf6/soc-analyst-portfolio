"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-emerald-500/50 shadow-2xl shadow-emerald-500/10 backdrop-blur-md text-xs font-mono text-slate-200">
        <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
