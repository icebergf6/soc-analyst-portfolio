"use client";

import React, { useState } from "react";
import { CERTIFICATIONS_DATA } from "@/data/certs";
import { Award, CheckCircle2, Trophy, ExternalLink, Shield } from "lucide-react";

export const CertBadges: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  const getProfileLink = (id: string) => {
    if (id.includes("thm")) return "https://tryhackme.com/p/soc-analyst";
    if (id.includes("htb")) return "https://app.hackthebox.com/profile/soc-analyst";
    return "https://www.credly.com";
  };

  return (
    <section id="competence-badges" className="py-12 border-y border-slate-800/80 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>Verified Competence & Platform Badges</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Proof of Competence & Industry Credentials
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Live public credentials and rankings evaluated against realistic cyber defense challenges, forensic CTFs, and hands-on exams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS_DATA.map((cert) => {
            const isEmerald = cert.accentColor === "emerald";
            const isCyan = cert.accentColor === "cyan";
            const profileUrl = cert.link || getProfileLink(cert.id);

            return (
              <div
                key={cert.id}
                className="group relative p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            isEmerald
                              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                              : isCyan
                              ? "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"
                              : "bg-amber-500/10 text-amber-300 border-amber-500/30"
                          }`}
                        >
                          {cert.status}
                        </span>
                        {cert.code && (
                          <span className="text-[10px] font-mono text-slate-500 truncate">{cert.code}</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors pt-1">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{cert.issuer}</p>
                    </div>

                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 group-hover:text-emerald-400 hover:bg-slate-700 transition-colors flex-shrink-0"
                      title="Verify Live Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-[11px] text-slate-400 leading-snug my-2">
                    {cert.badgeDetail}
                  </div>
                </div>

                {/* Dynamic Fallback / Verification Link */}
                <div className="mt-2 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-400/90">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Credential</span>
                  </span>
                  <a
                    href={profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Inspect Profile</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
