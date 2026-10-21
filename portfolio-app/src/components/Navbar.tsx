"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Terminal, FileDown, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onOpenTerminal: () => void;
}

export default function Navbar({ onOpenTerminal }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Demos", href: "#demos" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Writing", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  // Modern scrollspy intersection observer fallback
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center text-xs font-mono font-bold text-sky-400 group-hover:text-emerald-300 transition-colors">
                RS
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                {PERSONAL_INFO.name}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 -mt-0.5">
                Data Scientist (2+ YOE)
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav 
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1 p-1 bg-slate-900/60 rounded-full border border-slate-800/80 backdrop-blur-md"
            style={{ scrollTargetGroup: "auto" } as React.CSSProperties}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : "false"}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-sky-500 text-slate-950 font-semibold shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Terminal Trigger */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-800 transition-all"
              title="Open Developer Terminal CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Terminal</span>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Resume Download */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 text-xs font-bold font-mono shadow-[0_0_15px_rgba(56,189,248,0.25)] transition-all"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
              >
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                Terminal
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs font-mono font-bold"
              >
                <FileDown className="w-3.5 h-3.5" />
                Resume PDF
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
