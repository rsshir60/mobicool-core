"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, X } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: "welcome",
      output: (
        <div className="text-slate-300 space-y-1">
          <div>🚀 Interactive ML Dev Terminal v2.6.4 [Production Mode]</div>
          <div>Type <span className="text-sky-400 font-bold">help</span> to list commands or test inference pipelines.</div>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Native HTML5 <dialog> management — modern-web-guidance/accessibility
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    let res: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        res = (
          <div className="space-y-1 text-slate-300">
            <div>Available Commands:</div>
            <div>  <span className="text-sky-400 font-bold">bio</span>         : Print candidate summary & production experience</div>
            <div>  <span className="text-sky-400 font-bold">skills</span>      : List top production machine learning & MLOps stack</div>
            <div>  <span className="text-sky-400 font-bold">projects</span>    : Show flagship GitHub open-source repositories</div>
            <div>  <span className="text-sky-400 font-bold">eval</span>        : Run production model evaluation suite (LightGBM)</div>
            <div>  <span className="text-sky-400 font-bold">resume</span>      : Download current Data Scientist resume PDF</div>
            <div>  <span className="text-sky-400 font-bold">contact</span>     : Output direct email and LinkedIn profile</div>
            <div>  <span className="text-sky-400 font-bold">clear</span>       : Clear terminal window</div>
          </div>
        );
        break;

      case "bio":
        res = (
          <div className="text-slate-300 space-y-1">
            <div className="text-emerald-400 font-bold">{PERSONAL_INFO.name} — {PERSONAL_INFO.title}</div>
            <div>{PERSONAL_INFO.bio}</div>
            <div className="text-slate-400">Location: {PERSONAL_INFO.location}</div>
          </div>
        );
        break;

      case "skills":
        res = (
          <div className="text-slate-300 space-y-1">
            <div>[ML/DL]     : Scikit-Learn, LightGBM, XGBoost, PyTorch, Optuna, CatBoost</div>
            <div>[MLOps]     : FastAPI, Docker, Pydantic, GitHub Actions CI/CD, Pytest, MLflow</div>
            <div>[Data/SQL]  : Python, Polars, Pandas, PostgreSQL, BigQuery</div>
            <div>[NLP/RAG]   : BM25, Dense Vector Embeddings, Reciprocal Rank Fusion (RRF)</div>
          </div>
        );
        break;

      case "projects":
        res = (
          <div className="text-slate-300 space-y-1">
            <div>1. <span className="text-sky-400 font-bold">mobicool-core</span>: Production MLOps Predictive Platform (FastAPI, Scikit-learn, Docker)</div>
            <div>2. <span className="text-emerald-400 font-bold">semantic-rag-engine</span>: Hybrid Semantic Retrieval & RAG System (PyTorch, BM25, RRF)</div>
            <div>3. <span className="text-purple-400 font-bold">Optuna-Scale</span>: Distributed Bayesian Hyperparameter Search Engine</div>
          </div>
        );
        break;

      case "eval":
        res = (
          <div className="text-slate-300 font-mono space-y-1">
            <div className="text-sky-400">[INFO] Executing Stratified 5-Fold Evaluation on test_partition_2026.parquet...</div>
            <div>============================================================</div>
            <div>Metric              Score          Baseline (v1)   Delta</div>
            <div>ROC-AUC             <span className="text-emerald-400 font-bold">0.8841</span>         0.7203          +16.38%</div>
            <div>Precision (Tier 1)  <span className="text-emerald-400 font-bold">0.8612</span>         0.7104          +15.08%</div>
            <div>Recall (Tier 1)     <span className="text-emerald-400 font-bold">0.8249</span>         0.6811          +14.38%</div>
            <div>P99 Inference SLA   <span className="text-emerald-400 font-bold">24.2 ms</span>        180.0 ms        -86.55%</div>
            <div>============================================================</div>
            <div className="text-emerald-400">[PASS] 100% CI Regression assertions passed. Ready for deployment.</div>
          </div>
        );
        break;

      case "resume":
        window.open(PERSONAL_INFO.resumeUrl, "_blank");
        res = <div className="text-emerald-400">Opening {PERSONAL_INFO.resumeUrl} in a new tab...</div>;
        break;

      case "contact":
        res = (
          <div className="text-slate-300 space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sky-400 underline">{PERSONAL_INFO.email}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.linkedin}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PERSONAL_INFO.github}</a></div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        res = (
          <div className="text-rose-400">
            command not found: {trimmed}. Type <span className="text-white font-bold">&apos;help&apos;</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output: res }]);
    setInputVal("");
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      aria-label="Interactive Developer Terminal"
      className="m-auto p-0 bg-transparent rounded-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md border-0 max-w-3xl w-[calc(100%-2rem)] shadow-2xl focus:outline-none"
    >
      <div className="relative w-full h-[520px] rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl flex flex-col overflow-hidden font-mono text-xs">
        
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Close terminal window"
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors"
              />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-400 font-semibold ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              ranjeet@production-node-pune: ~/ml-sandbox
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.cmd !== "welcome" && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white">{item.cmd}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input */}
        <form onSubmit={handleCommand} className="p-3 bg-slate-900/80 border-t border-slate-800 flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-emerald-400 font-bold">$</label>
          <input
            id="terminal-input"
            name="terminal_command"
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent text-white focus:outline-none placeholder-slate-600"
            placeholder="Type 'help', 'eval', 'skills', 'resume'..."
          />
        </form>

      </div>
    </dialog>
  );
}
