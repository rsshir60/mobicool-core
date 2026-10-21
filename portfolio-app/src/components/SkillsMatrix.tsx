"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";
import { Cpu, Database, Server, Search, Check, Sparkles } from "lucide-react";

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Brain": return <Cpu className="w-5 h-5 text-sky-400" />;
      case "Server": return <Server className="w-5 h-5 text-emerald-400" />;
      case "Database": return <Database className="w-5 h-5 text-amber-400" />;
      case "Search": return <Search className="w-5 h-5 text-purple-400" />;
      default: return <Cpu className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Technical Proficiency & Engineering Stack
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Engineered for high reliability: from statistical validation and Bayesian modeling to containerized REST microservices.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                activeCategory === idx
                  ? "bg-slate-900 border-sky-500 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                  {getIcon(cat.icon)}
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {cat.skills.length} competencies
                </span>
              </div>
              <h3 className="text-xs font-bold text-white leading-tight">
                {cat.category}
              </h3>
            </button>
          ))}
        </div>

        {/* Selected Category Skill Cards */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
          <div className="mb-6 pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">
                {SKILL_CATEGORIES[activeCategory].category}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                {SKILL_CATEGORIES[activeCategory].description}
              </p>
            </div>
            <span className="text-xs font-mono text-sky-400">
              Evaluated on Production Deliverables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SKILL_CATEGORIES[activeCategory].skills.map((skill, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono text-sky-400 font-semibold">
                    {skill.experience}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
