"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectDemos from "@/components/ProjectDemos";
import CaseStudies from "@/components/CaseStudies";
import SkillsMatrix from "@/components/SkillsMatrix";
import Experience from "@/components/Experience";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TerminalModal from "@/components/TerminalModal";
import ScrollRevealProvider from "@/components/ScrollRevealProvider";

export default function Home() {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-grid-pattern selection:bg-sky-500/30 selection:text-sky-300">
      {/* Sticky Header */}
      <Navbar onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Main Content Flow */}
      <main id="main-content" className="flex-1">
        <Hero onOpenTerminal={() => setTerminalOpen(true)} />

        <ScrollRevealProvider>
          <ProjectDemos />
        </ScrollRevealProvider>

        <ScrollRevealProvider>
          <CaseStudies />
        </ScrollRevealProvider>

        <ScrollRevealProvider>
          <SkillsMatrix />
        </ScrollRevealProvider>

        <ScrollRevealProvider>
          <Experience />
        </ScrollRevealProvider>

        <ScrollRevealProvider>
          <BlogSection />
        </ScrollRevealProvider>

        <ScrollRevealProvider>
          <ContactSection />
        </ScrollRevealProvider>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Terminal CLI Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}
