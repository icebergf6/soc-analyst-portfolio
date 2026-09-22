"use client";

import React, { useState, useEffect } from "react";
import { 
  Shield, 
  FileText, 
  Menu, 
  X, 
  Terminal, 
  Radio, 
  Search, 
  ChevronRight,
  Crosshair,
  Wrench,
  FileSearch,
  Network,
  BookOpen,
  Mail,
  KeyRound
} from "lucide-react";
import { ThemeAudioControls } from "./ThemeAudioControls";
import { playCyberSound } from "@/utils/audio";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenCmd: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onOpenCmd }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        playCyberSound("close");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Overview", href: "#overview", icon: <Crosshair className="w-4 h-4 text-emerald-400" /> },
    { label: "Arsenal", href: "#arsenal", icon: <Wrench className="w-4 h-4 text-cyan-400" /> },
    { label: "Case Studies", href: "#investigations", icon: <FileSearch className="w-4 h-4 text-amber-400" /> },
    { label: "Homelab", href: "#homelab", icon: <Network className="w-4 h-4 text-teal-400" /> },
    { label: "Writeups", href: "#writeups", icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4 text-rose-400" /> },
  ];

  const handleOpenMobileSidebar = () => {
    setMobileMenuOpen(true);
    playCyberSound("open");
  };

  const handleCloseMobileSidebar = () => {
    setMobileMenuOpen(false);
    playCyberSound("close");
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
    playCyberSound("click");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/50 py-3"
            : "bg-transparent py-4 sm:py-5 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Monogram & Status */}
          <a 
            href="#overview" 
            onClick={() => playCyberSound("click")}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-emerald-500/60 transition-colors shadow-inner">
              <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wide text-white group-hover:text-emerald-300 transition-colors">
                  SOC_DEFENSE
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  v2.6
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400/90 font-mono">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                <span>Available for SOC L1/L2 Roles</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => playCyberSound("click")}
                className="text-xs font-medium text-slate-300 hover:text-emerald-400 px-3 py-1.5 rounded-full hover:bg-slate-800/80 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop OLED Theme & Audio Controls */}
            <div className="hidden sm:block">
              <ThemeAudioControls />
            </div>

            {/* Quick Search Shortcut */}
            <button
              onClick={() => {
                playCyberSound("click");
                onOpenCmd();
              }}
              aria-label="Search command palette (Ctrl+K)"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
              title="Search command palette (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px]">Search</span>
              <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[9px] text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button Desktop */}
            <button
              onClick={() => {
                playCyberSound("click");
                onOpenResume();
              }}
              aria-label="View and download sanitized resume"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all shadow-sm active:scale-95"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sanitized Resume</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={handleOpenMobileSidebar}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 transition-all focus:outline-none shadow-sm active:scale-95"
              aria-label="Open mobile navigation sidebar"
            >
              <Menu className="w-5 h-5 text-emerald-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Smooth Mobile Slide-over Off-Canvas Sidebar */}
      {/* 1. Backdrop Overlay */}
      <div
        onClick={handleCloseMobileSidebar}
        className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* 2. Sliding Drawer Panel (from Right) */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 right-0 w-[300px] max-w-[85vw] bg-[#070b14] border-l border-slate-800/90 shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile Navigation Sidebar"
      >
        {/* Top Header of Sidebar */}
        <div className="p-4 border-b border-slate-800/90 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white tracking-wide">SOC_DEFENSE</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                <span>24/7 ACTIVE WATCH</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCloseMobileSidebar}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            aria-label="Close navigation sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Middle Scrollable Section: Controls & Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Quick OLED & Audio Switchers on Mobile */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1">
              Display & Cyber Sound FX:
            </div>
            <ThemeAudioControls className="w-full justify-between p-1.5" showLabels={true} />
          </div>

          {/* Navigation Links Grid */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1 mb-2">
              Workbench Sections:
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavLinkClick}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-slate-200 hover:text-emerald-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                handleNavLinkClick();
                onOpenCmd();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-all"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Search Matrix</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 border border-slate-700">
                Ctrl+K
              </kbd>
            </button>

            <button
              onClick={() => {
                handleNavLinkClick();
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-semibold text-xs transition-all active:scale-95"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Sanitized Resume</span>
            </button>
          </div>
        </div>

        {/* Bottom Footer of Sidebar */}
        <div className="p-3.5 border-t border-slate-800/90 bg-slate-950/90 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>GRID: SOC_TIER_2</span>
          </div>
          <span className="text-slate-500">DEFCON 3</span>
        </div>
      </aside>
    </>
  );
};
