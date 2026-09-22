"use client";

import React, { useState } from "react";
import { PGP_DATA } from "@/data/pgp";
import { 
  Shield, 
  KeyRound, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Terminal, 
  ExternalLink,
  Lock,
  AlertCircle
} from "lucide-react";

export const Footer: React.FC = () => {
  const [pgpOpen, setPgpOpen] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [copiedFingerprint, setCopiedFingerprint] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(PGP_DATA.publicKeyArmored);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const handleCopyFingerprint = () => {
    navigator.clipboard.writeText(PGP_DATA.fingerprint);
    setCopiedFingerprint(true);
    setTimeout(() => setCopiedFingerprint(false), 2000);
  };

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(PGP_DATA.terminalImportCmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <footer id="contact" className="bg-[#060910] border-t border-slate-800 text-slate-400 relative">
      {/* Sanitized Data Disclosure Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
          <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 flex-shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <p className="text-slate-400 leading-relaxed font-sans text-xs">
            <strong className="text-slate-300 font-semibold">Sanitized Data Disclosure: </strong>
            {PGP_DATA.sanitizedDisclaimer}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Contact & Verification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Bio & Direct Connect */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 shadow-inner">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-white tracking-wide">
                  SOC Defensive Specialist
                </span>
                <p className="text-xs font-mono text-emerald-400">Incident Triage & Threat Hunting</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Available for Tier 1 / Tier 2 Security Operations Center (SOC) Analyst positions, Defensive Security Engineering, and Threat Hunting operations. Open to technical interviews and hands-on detection challenges.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs font-mono">
              <a
                href={`mailto:${PGP_DATA.email}`}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800 w-fit"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{PGP_DATA.email}</span>
              </a>
            </div>

            {/* Social / Platform Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PGP_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="GitHub Repositories"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={PGP_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={PGP_DATA.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-xs font-mono text-emerald-400 transition-colors"
              >
                TryHackMe Profile
              </a>
              <a
                href={PGP_DATA.hackthebox}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-xs font-mono text-cyan-400 transition-colors"
              >
                HTB Profile
              </a>
            </div>
          </div>

          {/* Right: Collapsible PGP Public Key Block */}
          <div className="lg:col-span-7">
            <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-white">
                    PGP Public Key Verification
                  </span>
                </div>

                <button
                  onClick={() => setPgpOpen(!pgpOpen)}
                  className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <span>{pgpOpen ? "Collapse Key" : "View Key Block"}</span>
                  {pgpOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Key ID & Fingerprint */}
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-2 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-slate-500">Key ID:</span>
                  <span className="text-emerald-400 font-semibold">{PGP_DATA.keyId}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/60 pt-2">
                  <span className="text-slate-500">Fingerprint:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-300 text-[11px] truncate max-w-[280px] sm:max-w-none">
                      {PGP_DATA.fingerprint}
                    </span>
                    <button
                      onClick={handleCopyFingerprint}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Copy fingerprint"
                    >
                      {copiedFingerprint ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terminal Quick Import Snippet */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Quick GPG Import Command</span>
                  </span>
                  <button
                    onClick={handleCopyCmd}
                    className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    {copiedCmd ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-2.5 rounded bg-black/80 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap break-all">
                  <code>{PGP_DATA.terminalImportCmd}</code>
                </pre>
              </div>

              {/* Collapsible Key Block */}
              {pgpOpen && (
                <div className="space-y-2 pt-2 border-t border-slate-800 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Armored ASCII Key</span>
                    <button
                      onClick={handleCopyPgp}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-700 transition-colors text-[11px]"
                    >
                      {copiedPgp ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Key Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Key Block</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-black/90 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto leading-tight">
                    <code>{PGP_DATA.publicKeyArmored}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Cybersecurity & SOC Analyst Portfolio. Built for Defensive Operations.
          </div>
          <div className="flex items-center gap-4">
            <span>Next.js App Router</span>
            <span>Tailwind CSS</span>
            <span className="text-emerald-400">SHA-256 Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
