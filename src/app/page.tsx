"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ToolsMarquee } from "@/components/ToolsMarquee";
import { ProfileSection } from "@/components/ProfileSection";
import { CertBadges } from "@/components/CertBadges";
import { CaseStudies } from "@/components/CaseStudies";
import { MitreMatrix } from "@/components/MitreMatrix";
import { PcapDissector } from "@/components/PcapDissector";
import { ArsenalMatrix } from "@/components/ArsenalMatrix";
import { SiemSandbox } from "@/components/SiemSandbox";
import { HomelabTopology } from "@/components/HomelabTopology";
import { TechnicalWriteups } from "@/components/TechnicalWriteups";
import { Footer } from "@/components/Footer";
import { SanitizedResumeModal } from "@/components/SanitizedResumeModal";
import { CommandPalette } from "@/components/CommandPalette";
import { Toast } from "@/components/Toast";
import { MobileBottomBar } from "@/components/MobileBottomBar";

export default function Home() {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300 pb-16 md:pb-0 transition-colors duration-300">
      {/* 1. Sticky Glassmorphic Navbar */}
      <Navbar 
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCmd={() => setCmdPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Live Stream Telemetry, DEFCON, & Radar */}
        <Hero onOpenCmd={() => setCmdPaletteOpen(true)} />

        {/* 3. Infinite Tools Marquee Banner (Continuous Horizontal Scroll) */}
        <ToolsMarquee />

        {/* 4. Comprehensive Operational Profile & Core Defensive Pillars */}
        <ProfileSection />

        {/* 5. Proof of Competence & Platform Badges (TryHackMe, HTB, Certs) */}
        <CertBadges />

        {/* 6. Featured SOC Incident Case Studies (with IncidentReportModal) */}
        <CaseStudies />

        {/* Interactive Defensive Workbench Subsections */}
        <MitreMatrix />
        <PcapDissector />
        <ArsenalMatrix />
        <SiemSandbox />

        {/* 7. Homelab Architecture & Infrastructure Topology */}
        <HomelabTopology />

        {/* 8. Technical Writeups & Blue Team Research */}
        <TechnicalWriteups />
      </main>

      {/* 9. Contact & Verification Footer */}
      <Footer />

      {/* Interactive Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
        onShowToast={showToast}
      />

      {/* Interactive Sanitized Resume Modal */}
      <SanitizedResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Responsive Mobile Bottom Action Bar */}
      <MobileBottomBar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCmd={() => setCmdPaletteOpen(true)}
      />

      {/* Floating Interactive Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
