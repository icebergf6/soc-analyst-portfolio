"use client";

import React, { useState, useEffect } from "react";
import { Shield, FileText, Menu, X, Terminal, Radio, Search } from "lucide-react";
import { ThemeAudioControls } from "./ThemeAudioControls";

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

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Arsenal", href: "#arsenal" },
    { label: "Case Studies", href: "#investigations" },
    { label: "Homelab", href: "#homelab" },
    { label: "Writeups", href: "#writeups" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Status */}
        <a href="#overview" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:border-emerald-500/60 transition-colors shadow-inner">
            <Shield className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-emerald-300 transition-colors">
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
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-4 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-emerald-400 px-3 py-1.5 rounded-full hover:bg-slate-800/70 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          {/* OLED Theme & Audio Controls */}
          <div className="hidden sm:block">
            <ThemeAudioControls />
          </div>

          {/* Quick Search Shortcut */}
          <button
            onClick={onOpenCmd}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all"
            title="Search command palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">Search</span>
            <kbd className="px-1 py-0.5 rounded bg-slate-800 text-[9px] text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/60 transition-all shadow-sm active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sanitized Resume</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 mt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCmd();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Search Tools & Investigations</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/40"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Download / Preview Sanitized Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
