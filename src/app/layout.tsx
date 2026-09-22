import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOC Analyst & Defensive Security Specialist | Incident Response & Threat Hunting Portfolio",
  description: "Production portfolio of a Cybersecurity & SOC Analyst specializing in SIEM correlation, network forensics, threat hunting, and incident triage.",
  keywords: ["SOC Analyst", "Cybersecurity", "Incident Response", "Threat Hunting", "Splunk", "Wazuh", "Sysmon", "Blue Team", "MITRE ATT&CK"],
  authors: [{ name: "Defensive Security Specialist" }],
  openGraph: {
    title: "SOC Analyst & Defensive Security Specialist Portfolio",
    description: "Real-world incident investigations, SIEM queries, homelab topology, and technical threat writeups.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-300 antialiased">
        {children}
      </body>
    </html>
  );
}
