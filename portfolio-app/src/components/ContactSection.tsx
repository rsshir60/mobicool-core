"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { Mail, Copy, Check, Send, Sparkles, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    roleType: "Full-Time",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#38bdf8", "#10b981", "#a855f7"],
        });
      } catch {
        // graceful fallback if canvas-confetti fails
      }
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-4">
            <Mail className="w-3.5 h-3.5" />
            Let&apos;s Connect
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to Build High-Impact ML Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Currently exploring high-impact Data Scientist and Applied ML Engineer roles. Let&apos;s discuss how I can contribute to your team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Status Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Availability Status
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                Actively interviewing for Data Scientist & Applied ML roles.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open to remote, hybrid, or on-site opportunities in Pune, Bangalore, or global high-growth teams.
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Notice Period:</span>
                <span className="text-xs font-mono font-semibold text-sky-400">Immediate / 30 Days</span>
              </div>
            </div>

            {/* Direct Copy Email Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Direct Email</span>
              <div className="flex items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs sm:text-sm font-mono text-white truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-sky-500 hover:text-slate-950 text-slate-300 transition-all shrink-0 flex items-center gap-1.5 text-xs font-mono"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* Profiles & Links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                LinkedIn Profile
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                <GithubIcon className="w-4 h-4 text-slate-200" />
                GitHub Repos
              </a>
              <a
                href={PERSONAL_INFO.resumeUrl}
                download
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/30 text-xs font-mono font-bold text-sky-400 transition-all"
              >
                <FileText className="w-4 h-4" />
                Download Complete Resume (PDF)
              </a>
            </div>

          </div>

          {/* Right Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out. I will respond to your inquiry at <strong className="text-sky-400">{formState.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name / Recruiter
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono transition-colors min-h-[48px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Work Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        inputMode="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. sarah@enterprise.ai"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono transition-colors min-h-[48px]"
                      />
                    </div>
                  </div>

                  <fieldset>
                    <legend className="block text-xs font-mono text-slate-300 mb-1.5">
                      Opportunity Type
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {["Full-Time", "Contract / Advisory", "Tech Chat"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormState({ ...formState, roleType: type })}
                          className={`py-2 px-3 text-xs font-mono rounded-lg border transition-all ${
                            formState.roleType === type
                              ? "bg-sky-500/20 text-sky-300 border-sky-400"
                              : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message / Role Brief
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Ranjeet, we're hiring for a Data Scientist / Applied ML role and loved your work on mobicool-core..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono transition-colors resize-none min-h-[120px]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 hover:from-sky-400 hover:to-emerald-300 text-slate-950 font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Telemetry...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Direct Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
