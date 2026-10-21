"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import NeuralCanvas from "./NeuralCanvas";
import { 
  ArrowRight, 
  Terminal, 
  FileText, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ExternalLink 
} from "lucide-react";

interface HeroProps {
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Status Beacon */}
        <div className="flex items-center justify-center sm:justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-slate-900/80 border border-slate-700/80 text-slate-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-semibold">2+ YOE Applied Data Scientist</span>
            <span className="text-slate-500">•</span>
            <span>Pune, India / Available Worldwide</span>
          </div>
        </div>

        {/* Main Grid: Left copy, Right 3D Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting <br />
              <span className="bg-gradient-to-r from-sky-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                High-Throughput ML
              </span>{" "}
              &amp; Retrieval Engines
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Hey, I&apos;m <strong className="text-white font-semibold">{PERSONAL_INFO.name}</strong>. I translate ambiguous business problems into low-latency inference services. Specialized in <span className="text-sky-300">FastAPI microservices</span> (&lt; 30ms SLA), <span className="text-emerald-300">Optuna Bayesian optimization</span>, tabular gradient boosting, and <span className="text-purple-300">hybrid RAG (BM25 + Dense RRF)</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
              <a
                href="#demos"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-bold font-mono text-xs sm:text-sm shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all"
              >
                <span>Launch Live Sandboxes</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-mono text-xs sm:text-sm transition-all"
              >
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>Run Dev Terminal</span>
              </button>

              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-800 font-mono text-xs transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Quick Tech Stack Icons Strip */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-2.5">
                Core Production Pipeline Stack
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
                {["Python", "FastAPI", "LightGBM", "PyTorch", "Docker", "Optuna", "PostgreSQL", "Pydantic", "Pytest"].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800 text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Latent Space Canvas */}
          <div className="lg:col-span-6 w-full">
            <NeuralCanvas />
          </div>

        </div>

        {/* Quantified Production Stats Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {PERSONAL_INFO.quickStats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800/90 text-center sm:text-left space-y-1 hover:border-slate-700 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-300">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-emerald-400">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
