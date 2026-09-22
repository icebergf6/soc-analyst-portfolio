"use client";

import React from "react";
import { CERTIFICATIONS_DATA } from "@/data/certs";
import { Award, CheckCircle2, Trophy, ExternalLink } from "lucide-react";

export const CertBadges: React.FC = () => {
  return (
    <section className="py-10 border-y border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>Verified Competence & Certifications</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Platform Ranks & Industry Credentials</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            Continuously evaluated against blue team challenges, live range investigations, and industry-standard defensive certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATIONS_DATA.map((cert) => {
            const isEmerald = cert.accentColor === "emerald";
            const isCyan = cert.accentColor === "cyan";

            return (
              <div
                key={cert.id}
                className="group relative p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all hover:bg-slate-900 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
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
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-400 group-hover:text-emerald-400 transition-colors">
                    {cert.status === "Ranking" ? (
                      <Trophy className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 leading-snug">
                  {cert.badgeDetail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
