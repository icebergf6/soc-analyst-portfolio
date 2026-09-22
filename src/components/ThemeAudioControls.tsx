"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Moon, Sun, Sparkles, Activity } from "lucide-react";
import { 
  isAudioMuted, 
  setAudioMuted, 
  isOledMode, 
  setOledMode, 
  playCyberSound 
} from "@/utils/audio";

interface ThemeAudioControlsProps {
  className?: string;
  showLabels?: boolean;
}

export const ThemeAudioControls: React.FC<ThemeAudioControlsProps> = ({ 
  className = "",
  showLabels = false
}) => {
  const [isOled, setIsOledState] = useState(false);
  const [isMuted, setIsMutedState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialOled = isOledMode();
    const initialMuted = isAudioMuted();
    setIsOledState(initialOled);
    setIsMutedState(initialMuted);

    // Apply stored theme on mount
    if (initialOled) {
      document.documentElement.classList.add("oled-mode");
      document.body.style.backgroundColor = "#000000";
    }

    const handleAudioChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ muted: boolean }>;
      if (customEvent.detail) {
        setIsMutedState(customEvent.detail.muted);
      }
    };

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ oled: boolean }>;
      if (customEvent.detail) {
        setIsOledState(customEvent.detail.oled);
      }
    };

    window.addEventListener("cyber-audio-state-changed", handleAudioChange);
    window.addEventListener("cyber-theme-state-changed", handleThemeChange);

    return () => {
      window.removeEventListener("cyber-audio-state-changed", handleAudioChange);
      window.removeEventListener("cyber-theme-state-changed", handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextOled = !isOled;
    setIsOledState(nextOled);
    setOledMode(nextOled);
    playCyberSound("toggle");
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMutedState(nextMuted);
    setAudioMuted(nextMuted);

    if (!nextMuted) {
      // Play celebratory success chord when user turns on audio
      playCyberSound("success");
    }
  };

  if (!mounted) {
    return (
      <div className={`flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono opacity-0 ${className}`}>
        <span className="w-16 h-6" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono shadow-sm backdrop-blur-sm ${className}`}>
      {/* OLED Black Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label={isOled ? "Switch to Tactical Slate background" : "Switch to Pure OLED Black background"}
        className={`px-2.5 py-1.5 rounded-md flex items-center gap-1.5 transition-all active:scale-95 ${
          isOled
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm shadow-emerald-500/10 font-semibold"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
        }`}
        title={isOled ? "Switch to Tactical Slate (#090d16)" : "Switch to Pure OLED Black (#000000)"}
      >
        <Moon className={`w-3.5 h-3.5 ${isOled ? "text-emerald-400 fill-emerald-400/20" : "text-slate-400"}`} />
        <span className="text-[11px] tracking-wide">{isOled ? "OLED" : "SLATE"}</span>
      </button>

      {/* Cyber Sound FX Toggle with Live Indicator */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute Cyber UI Sound Effects" : "Mute Sound Effects"}
        className={`px-2 py-1.5 rounded-md flex items-center gap-1.5 transition-all active:scale-95 ${
          !isMuted
            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/10 font-semibold"
            : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/60"
        }`}
        title={isMuted ? "Unmute Cyber UI Sound Effects" : "Mute Sound Effects"}
      >
        {!isMuted ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
            </span>
            {showLabels && <span className="text-[11px]">AUDIO ON</span>}
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            {showLabels && <span className="text-[11px] text-slate-500">MUTED</span>}
          </>
        )}
      </button>
    </div>
  );
};
