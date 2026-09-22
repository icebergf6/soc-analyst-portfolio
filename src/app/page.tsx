"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CertBadges } from "@/components/CertBadges";
import { ArsenalMatrix } from "@/components/ArsenalMatrix";
import { SiemSandbox } from "@/components/SiemSandbox";
import { CaseStudies } from "@/components/CaseStudies";
import { MitreMatrix } from "@/components/MitreMatrix";
import { PcapDissector } from "@/components/PcapDissector";
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
      {/* Sticky Glassmorphic Header */}
      <Navbar 
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCmd={() => setCmdPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section with Live Stream Telemetry & Radar */}
        <Hero onOpenCmd={() => setCmdPaletteOpen(true)} />

        {/* 2. Competence & Platform Badges (TryHackMe, HTB, Certs) */}
        <CertBadges />

        {/* 3. SOC Tool Arsenal & Skills Matrix */}
        <ArsenalMatrix />

        {/* 4. Interactive Live SIEM Query Sandbox */}
        <SiemSandbox />

        {/* 5. Featured SOC Incident Case Studies */}
        <CaseStudies />

        {/* 6. Interactive MITRE ATT&CK Matrix Navigator */}
        <MitreMatrix />

        {/* 7. Interactive Web PCAP Packet Dissector */}
        <PcapDissector />

        {/* 8. Homelab Architecture & Topology with Live Packet Tracer */}
        <HomelabTopology />

        {/* 9. Technical Writeups & Blue Team Research */}
        <TechnicalWriteups />
      </main>

      {/* Verification Footer & Collapsible PGP */}
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
