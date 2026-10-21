"use client";

import React from "react";
import { WORK_EXPERIENCE, EDUCATION, CERTIFICATIONS } from "@/data/portfolioData";
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional Experience & Milestones
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            2+ years engineering high-performance machine learning systems, automated data validation layers, and CI/CD pipelines in production.
          </p>
        </div>

        {/* Work Timeline */}
        <div className="space-y-8 mb-16">
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold mb-1">
                    <span>{exp.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300">
                    {exp.company}
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 w-fit">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  {exp.period}
                </div>
              </div>

              {/* Achievements */}
              <div className="pt-6 space-y-3">
                <p className="text-xs sm:text-sm text-slate-400 italic mb-4">
                  {exp.summary}
                </p>

                <div className="space-y-2.5">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-800/80 mt-6">
                  {exp.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Certifications Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Education */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-sky-400 text-sm font-mono font-bold mb-4">
              <GraduationCap className="w-4 h-4" />
              Academic Credentials
            </div>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                <div className="text-xs font-mono text-slate-400">{edu.institution} ({edu.period})</div>
                <p className="text-xs text-slate-300 pt-2">{edu.details}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-mono font-bold mb-4">
              <Award className="w-4 h-4" />
              Professional Certifications
            </div>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{cert.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{cert.issuer}</div>
                  </div>
                  <span className="font-mono text-emerald-400 text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
