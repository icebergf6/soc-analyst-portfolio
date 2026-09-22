// Cybernetic Web Audio Synthesizer & Theme Management Engine
// Zero external audio assets; 100% native procedural Web Audio API synthesis

export type CyberSoundType = "click" | "toggle" | "alert" | "success" | "open" | "close";

// Singleton AudioContext accessor
let audioCtxInstance: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtxInstance) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtxInstance = new AudioCtx();
    }
  }
  if (audioCtxInstance && audioCtxInstance.state === "suspended") {
    audioCtxInstance.resume().catch(() => {});
  }
  return audioCtxInstance;
}

// Check if audio is muted (default is muted until user unmutes)
export function isAudioMuted(): boolean {
  if (typeof window === "undefined") return true;
  const saved = localStorage.getItem("soc_audio_muted");
  return saved === null ? true : saved === "true";
}

// Toggle mute state and dispatch custom event
export function setAudioMuted(muted: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("soc_audio_muted", muted ? "true" : "false");
  window.dispatchEvent(new CustomEvent("cyber-audio-state-changed", { detail: { muted } }));
}

// Check if OLED mode is active
export function isOledMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("soc_theme_oled") === "true";
}

// Toggle OLED mode and dispatch custom event
export function setOledMode(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("soc_theme_oled", enabled ? "true" : "false");
  if (enabled) {
    document.documentElement.classList.add("oled-mode");
    document.body.style.backgroundColor = "#000000";
  } else {
    document.documentElement.classList.remove("oled-mode");
    document.body.style.backgroundColor = "#090d16";
  }
  window.dispatchEvent(new CustomEvent("cyber-theme-state-changed", { detail: { oled: enabled } }));
}

// Master synthesizer function
export function playCyberSound(type: CyberSoundType = "click"): void {
  if (isAudioMuted()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (type) {
      case "click": {
        // High-tech tactile terminal chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1600, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.035);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      case "toggle": {
        // Dual-tone mechanical cyber switch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.setValueAtTime(1180, now + 0.025);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.065);
        break;
      }

      case "alert": {
        // Tactical emergency alert siren
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(920, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.18);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case "success": {
        // Ascending harmonic sci-fi triad (C5 -> E5 -> G5)
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const startTime = now + idx * 0.04;

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, startTime);

          gain.gain.setValueAtTime(0.045, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.1);
        });
        break;
      }

      case "open": {
        // Smooth slide-in whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case "close": {
        // Smooth slide-out whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(280, now + 0.07);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }
    }
  } catch {
    // Gracefully handle browser audio restrictions
  }
}
