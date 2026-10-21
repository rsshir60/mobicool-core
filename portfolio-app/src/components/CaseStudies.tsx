"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/data/portfolioData";
import { BookOpen, CheckCircle, ChevronRight, Code2, Layers, TrendingUp } from "lucide-react";

export default function CaseStudies() {
  const [selectedCase, setSelectedCase] = useState(CASE_STUDIES[0]);

  return (
    <section id="case-studies" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Engineering Deep Dives
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Production Case Studies & Systems Design
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Real production challenges solved: from low-latency serving bottlenecks to retrieval calibration and statistical drift resilience.
          </p>
        </div>

        {/* Case Study Selector Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {CASE_STUDIES.map((study) => (
            <button
              key={study.id}
              onClick={() => setSelectedCase(study)}
              className={`p-4 rounded-xl text-left border transition-all ${
                selectedCase.id === study.id
                  ? "bg-slate-900 border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>{study.clientType}</span>
                <span className="text-sky-400 font-semibold">{study.timeline}</span>
              </div>
              <h3 className="text-sm font-bold text-white line-clamp-2">
                {study.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Active Case Study Detail Box */}
        <div className="glass-panel rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          <div className="space-y-8">
            
            {/* Title & Impact Badges */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
                  Role: {selectedCase.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {selectedCase.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-2">
                  {selectedCase.subtitle}
                </p>
              </div>

              {/* Quantified Impact Cards */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3">
                {selectedCase.impactMetrics.map((metric, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 min-w-[130px] text-center">
                    <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">
                      {metric.value}
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 font-medium mt-0.5">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Problem Statement */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono text-rose-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  The Production Bottleneck
                </div>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  {selectedCase.problem}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Architecture Strategy
                  </div>
                  <ul className="space-y-2">
                    {selectedCase.architecture.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solution & Implementation Code */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-mono text-sky-400 font-semibold">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Production Implementation
                  </div>
                  <span className="text-[11px] text-slate-500 font-normal">Python / C-API</span>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[320px] scrollbar-thin">
                    <code>{selectedCase.codeSnippet}</code>
                  </pre>
                </div>
              </div>

            </div>

            {/* Key Learnings / Retrospective */}
            <div className="pt-6 border-t border-slate-800">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Key Engineering Takeaways & Retrospective
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedCase.learnings.map((learning, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300">
                    <span className="text-sky-400 font-mono font-bold mr-1.5">0{idx + 1}.</span>
                    {learning}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
