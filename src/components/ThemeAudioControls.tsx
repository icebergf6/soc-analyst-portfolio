"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Moon, Sun } from "lucide-react";

export const playCyberClick = (isMuted: boolean) => {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(950, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore audio context errors if blocked by browser policy
  }
};

export const ThemeAudioControls: React.FC = () => {
  const [isOled, setIsOled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const toggleTheme = () => {
    const nextOled = !isOled;
    setIsOled(nextOled);
    playCyberClick(isMuted);

    if (nextOled) {
      document.documentElement.classList.add("oled-mode");
      document.body.style.backgroundColor = "#000000";
    } else {
      document.documentElement.classList.remove("oled-mode");
      document.body.style.backgroundColor = "#090d16";
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false) {
      // Play brief chime when unmuted
      playCyberClick(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono">
      {/* OLED Black Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label={isOled ? "Switch to Tactical Slate background" : "Switch to Pure OLED Black background"}
        className={`px-2 py-1 rounded flex items-center gap-1 transition-all ${
          isOled
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
            : "text-slate-400 hover:text-slate-200"
        }`}
        title={isOled ? "Switch to Tactical Slate (#090d16)" : "Switch to Pure OLED Black (#000000)"}
      >
        <Moon className="w-3 h-3 text-emerald-400" />
        <span className="text-[10px]">{isOled ? "OLED" : "SLATE"}</span>
      </button>

      {/* Cyber Sound FX Toggle */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute Cyber UI Sound Effects" : "Mute Sound Effects"}
        className={`p-1.5 rounded transition-all ${
          !isMuted
            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
            : "text-slate-500 hover:text-slate-300"
        }`}
        title={isMuted ? "Unmute Cyber UI Sound Effects" : "Mute Sound Effects"}
      >
        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-cyan-400" />}
      </button>
    </div>
  );
};
