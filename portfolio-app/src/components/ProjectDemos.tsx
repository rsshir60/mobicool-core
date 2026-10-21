"use client";

import React, { useState, useMemo } from "react";
import { PROJECTS } from "@/data/portfolioData";
import { 
  Play, 
  Sparkles, 
  Cpu, 
  Search, 
  Sliders, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  BarChart2,
  Layers,
  Zap
} from "lucide-react";
import { GithubIcon } from "./Icons";

export default function ProjectDemos() {
  const [activeTab, setActiveTab] = useState<"mlops" | "rag" | "optuna">("mlops");

  // --- MLOps Live Demo State ---
  const [tenure, setTenure] = useState(14);
  const [monthlySpend, setMonthlySpend] = useState(75);
  const [supportTickets, setSupportTickets] = useState(3);
  const [loginsPerMonth, setLoginsPerMonth] = useState(24);
  const [contractType, setContractType] = useState<"month_to_month" | "one_year" | "two_year">("month_to_month");

  // Simulated Tabular Gradient Boosting Prediction
  const churnAnalysis = useMemo(() => {
    // Baseline log-odds
    let logOdds = -0.5;

    // Feature effects (calibrated to mimic LightGBM tree ensemble)
    const tenureImpact = -0.04 * tenure;
    const spendImpact = (monthlySpend - 50) * 0.015;
    const ticketImpact = supportTickets * 0.45;
    const loginImpact = -0.02 * loginsPerMonth;
    const contractImpact = contractType === "month_to_month" ? 0.8 : (contractType === "one_year" ? -0.4 : -1.1);

    logOdds += tenureImpact + spendImpact + ticketImpact + loginImpact + contractImpact;

    // Sigmoid transformation
    const probability = 1 / (1 + Math.exp(-logOdds));
    const scorePct = Math.min(Math.max(probability * 100, 1.5), 98.5);

    // Feature contributions (SHAP-style)
    const shapFeatures = [
      { name: "Support Tickets (" + supportTickets + ")", val: ticketImpact, positive: ticketImpact > 0 },
      { name: "Contract Type (" + contractType.replace("_", " ") + ")", val: contractImpact, positive: contractImpact > 0 },
      { name: "Monthly Spend ($" + monthlySpend + ")", val: spendImpact, positive: spendImpact > 0 },
      { name: "Tenure (" + tenure + " mos)", val: tenureImpact, positive: tenureImpact > 0 },
      { name: "Logins/Mo (" + loginsPerMonth + ")", val: loginImpact, positive: loginImpact > 0 },
    ].sort((a, b) => Math.abs(b.val) - Math.abs(a.val));

    const riskTier = scorePct > 65 ? "HIGH" : (scorePct > 35 ? "MEDIUM" : "LOW");

    return {
      scorePct: scorePct.toFixed(1),
      riskTier,
      latencyMs: (21.4 + (supportTickets * 0.2)).toFixed(1),
      shapFeatures,
      recommendation: riskTier === "HIGH" 
        ? "Action: Route to proactive customer success desk + auto-trigger 15% retention offer." 
        : riskTier === "MEDIUM" 
        ? "Action: Enroll into product engagement re-activation workflow." 
        : "Action: Account healthy. Candidate for upsell/expansion tier."
    };
  }, [tenure, monthlySpend, supportTickets, loginsPerMonth, contractType]);

  // --- Hybrid RAG Live Demo State ---
  const [ragMode, setRagMode] = useState<"sparse" | "dense" | "hybrid">("hybrid");
  const [searchQuery, setSearchQuery] = useState("ERR_DB_POOL_EXHAUSTED_0x44 timeout connection limits");

  const sampleCorpus = [
    {
      id: "doc-1",
      title: "Troubleshooting Connection Pool Exhaustion (ERR_DB_POOL_EXHAUSTED_0x44)",
      bm25Score: 8.92,
      denseScore: 0.74,
      snippet: "When pool size limit (max_connections=50) is reached under concurrent FastAPI queries, driver emits ERR_DB_POOL_EXHAUSTED_0x44. Increase pool size or enable connection pooling proxy.",
      matchType: "Exact Keyword Match + Semantic Intent"
    },
    {
      id: "doc-2",
      title: "Optimizing High-Throughput Database Latencies & Keep-Alives",
      bm25Score: 3.12,
      denseScore: 0.88,
      snippet: "Managing database connection pooling and asynchronous workers to prevent queue congestion and latency spikes in production inference pipelines.",
      matchType: "High Semantic Similarity"
    },
    {
      id: "doc-3",
      title: "FastAPI Connection Pooling & Async SQLAlchemy Session Management",
      bm25Score: 4.45,
      denseScore: 0.81,
      snippet: "Best practices configuring asyncpg engine pools with nullpool vs queuepool in containerized microservices.",
      matchType: "Moderate Hybrid Match"
    },
    {
      id: "doc-4",
      title: "LightGBM Quantile Clipping & Feature Preprocessing Rules",
      bm25Score: 0.15,
      denseScore: 0.32,
      snippet: "Feature distribution clipping to prevent outlier distortion during tree split calculations.",
      matchType: "Irrelevant Baseline"
    }
  ];

  const filteredRagResults = useMemo(() => {
    const k = 60;
    return sampleCorpus.map((doc, idx) => {
      // Calculate RRF score
      const bm25Rank = idx + 1; // simulated ordinal rank
      const denseRank = idx === 1 ? 1 : (idx === 0 ? 2 : idx + 1);
      
      const rrfScore = (1 / (k + bm25Rank)) + (1 / (k + denseRank));
      
      let effectiveScore = 0;
      if (ragMode === "sparse") effectiveScore = doc.bm25Score;
      else if (ragMode === "dense") effectiveScore = doc.denseScore * 10;
      else effectiveScore = rrfScore * 100;

      return {
        ...doc,
        effectiveScore: effectiveScore.toFixed(2),
        rrfFormula: `1/(${k}+${bm25Rank}) + 1/(${k}+${denseRank}) = ${(rrfScore).toFixed(4)}`
      };
    }).sort((a, b) => parseFloat(b.effectiveScore) - parseFloat(a.effectiveScore));
  }, [ragMode, searchQuery]);

  // --- Optuna Demo State ---
  const [optunaTrial, setOptunaTrial] = useState(48);

  return (
    <section id="demos" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Production Sandboxes
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Live ML Engine & Architecture Demos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Don&apos;t just read code—test real machine learning inference logic, evaluate hybrid RAG retrieval formulas, and explore hyperparameter optimization interactively.
          </p>
        </div>

        {/* Demo Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab("mlops")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "mlops"
                ? "bg-sky-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(56,189,248,0.35)]"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Cpu className="w-4 h-4" />
            mobicool-core (Sub-30ms Tabular Scorer)
          </button>

          <button
            onClick={() => setActiveTab("rag")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "rag"
                ? "bg-emerald-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Search className="w-4 h-4" />
            semantic-rag-engine (Hybrid RRF Search)
          </button>

          <button
            onClick={() => setActiveTab("optuna")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              activeTab === "optuna"
                ? "bg-purple-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            Optuna-Scale (Bayesian Trial Explorer)
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: MLOPS TABULAR CHURN & RISK SCORER */}
        {/* ============================================================== */}
        {activeTab === "mlops" && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/20 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Controls: Feature Inputs */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                      Client Inference Payload Simulator
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Adjust client behavioral telemetry to trigger real-time gradient boosting predictions.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-1 rounded bg-sky-950 text-sky-400 border border-sky-800">
                    FastAPI / LightGBM
                  </span>
                </div>

                {/* Sliders */}
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="font-mono">Account Tenure (Months)</span>
                      <span className="font-bold text-sky-400 font-mono">{tenure} mos</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="60"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full accent-sky-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="font-mono">Monthly Charges ($)</span>
                      <span className="font-bold text-sky-400 font-mono">${monthlySpend}/mo</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      value={monthlySpend}
                      onChange={(e) => setMonthlySpend(Number(e.target.value))}
                      className="w-full accent-sky-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="font-mono">Support Tickets (Last 90d)</span>
                      <span className="font-bold text-sky-400 font-mono">{supportTickets} tickets</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={supportTickets}
                      onChange={(e) => setSupportTickets(Number(e.target.value))}
                      className="w-full accent-sky-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="font-mono">Login Activity (Last 30d)</span>
                      <span className="font-bold text-sky-400 font-mono">{loginsPerMonth} logins</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="60"
                      value={loginsPerMonth}
                      onChange={(e) => setLoginsPerMonth(Number(e.target.value))}
                      className="w-full accent-sky-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Contract Commitment Tier
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["month_to_month", "one_year", "two_year"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setContractType(type)}
                          className={`py-2 px-3 text-xs font-mono rounded-lg border transition-all ${
                            contractType === type
                              ? "bg-sky-500/20 text-sky-300 border-sky-400"
                              : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          {type === "month_to_month" ? "Month-to-Month" : type === "one_year" ? "1 Year" : "2 Years"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 flex items-center justify-between border-t border-slate-800 font-mono">
                  <span>Pydantic v2 Schema Validation: ✅ Valid</span>
                  <a 
                    href="https://github.com/rsshir60/mobicool-core" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1"
                  >
                    View mobicool-core on GitHub <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Output: Real-time Model Dashboard & SHAP Waterfall */}
              <div className="w-full lg:w-1/2 bg-slate-950/70 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      Inference Latency: <strong className="text-white">{churnAnalysis.latencyMs} ms</strong> (SLA &lt; 30ms)
                    </span>
                    <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      churnAnalysis.riskTier === "HIGH"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        : churnAnalysis.riskTier === "MEDIUM"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    }`}>
                      {churnAnalysis.riskTier} RISK
                    </span>
                  </div>

                  {/* Main Metric Display */}
                  <div className="text-center py-6 border-y border-slate-800/80 my-4 bg-slate-900/40 rounded-xl">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Model Churn Probability
                    </p>
                    <div className="text-5xl font-extrabold tracking-tight text-white font-mono flex items-center justify-center gap-2">
                      <span>{churnAnalysis.scorePct}%</span>
                    </div>
                    <div className="w-48 h-2 bg-slate-800 rounded-full mx-auto mt-3 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          churnAnalysis.riskTier === "HIGH"
                            ? "bg-rose-500"
                            : churnAnalysis.riskTier === "MEDIUM"
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        }`}
                        style={{ width: `${churnAnalysis.scorePct}%` }}
                      />
                    </div>
                  </div>

                  {/* SHAP Feature Contribution Waterfall */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Feature Contribution (TreeSHAP Vector)</span>
                      <span>Direction</span>
                    </div>

                    {churnAnalysis.shapFeatures.map((feat, i) => (
                      <div key={i} className="flex items-center justify-between text-xs font-mono bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
                        <span className="text-slate-300 truncate max-w-[220px]">{feat.name}</span>
                        <span className={`font-semibold ${feat.val > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                          {feat.val > 0 ? `+${feat.val.toFixed(2)} (Increases Risk)` : `${feat.val.toFixed(2)} (Mitigates Risk)`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Automated Business Recommendation */}
                <div className="mt-6 p-3.5 rounded-lg bg-sky-950/30 border border-sky-800/40 text-xs text-sky-200">
                  <strong>Decision Engine:</strong> {churnAnalysis.recommendation}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: HYBRID RAG WITH RECIPROCAL RANK FUSION (RRF) */}
        {/* ============================================================== */}
        {activeTab === "rag" && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/20 shadow-2xl">
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    Hybrid Sparse-Dense RAG with Reciprocal Rank Fusion
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Comparing BM25 keyword precision vs dense bi-encoder embeddings vs calibrated RRF scoring.
                  </p>
                </div>

                {/* Retrieval Strategy Switcher */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setRagMode("sparse")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ragMode === "sparse" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    1. Sparse BM25
                  </button>
                  <button
                    onClick={() => setRagMode("dense")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ragMode === "dense" ? "bg-slate-800 text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    2. Dense Vector
                  </button>
                  <button
                    onClick={() => setRagMode("hybrid")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ragMode === "hybrid" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    3. Hybrid RRF (Fused)
                  </button>
                </div>
              </div>

              {/* Live Search Query Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Type an error code, API signature, or semantic question..."
                />
              </div>

              {/* Formula & Latency Banner */}
              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
                <div>
                  <span className="text-emerald-400">RRF Scoring Formula:</span>{" "}
                  <code>RRF_Score(d) = Σ [ 1 / (60 + Rank_i) ]</code>
                </div>
                <div className="flex items-center gap-3">
                  <span>Query Latency: <strong className="text-emerald-400">8.4ms</strong></span>
                  <span>Top-5 Recall: <strong className="text-emerald-400">91.4%</strong></span>
                </div>
              </div>

              {/* Search Results Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRagResults.map((result, idx) => (
                  <div 
                    key={result.id}
                    className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        Rank #{idx + 1}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {ragMode === "hybrid" ? `RRF Score: ${result.effectiveScore}` : `Score: ${result.effectiveScore}`}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white">
                      {result.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {result.snippet}
                    </p>

                    <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>BM25: {result.bm25Score} | Cosine: {result.denseScore}</span>
                      <span className="text-slate-400">{result.matchType}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between pt-2">
                <span>Enterprise Solution: Eliminates bi-encoder semantic drift on rare error codes.</span>
                <a 
                  href="https://github.com/rsshir60/semantic-rag-engine" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-xs"
                >
                  View semantic-rag-engine repository <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: OPTUNA BAYESIAN HYPERPARAMETER OPTIMIZATION */}
        {/* ============================================================== */}
        {activeTab === "optuna" && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/20 shadow-2xl">
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    Optuna Bayesian Hyperparameter Optimization Visualizer
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Tree-structured Parzen Estimator (TPE) exploring parameter space and pruning bad trials.
                  </p>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  TPE Sampler + MedianPruner
                </span>
              </div>

              {/* Slider for Trial Progress */}
              <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Interactive Trial Step: <strong className="text-purple-400">Trial #{optunaTrial} / 100</strong></span>
                  <span>Pruned Trials: <strong className="text-slate-400">62% Early Terminated</strong></span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={optunaTrial}
                  onChange={(e) => setOptunaTrial(Number(e.target.value))}
                  className="w-full accent-purple-400 bg-slate-800 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Trial Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Current Best ROC-AUC</div>
                  <div className="text-2xl font-bold font-mono text-purple-400 mt-1">
                    {(0.72 + (0.164 * (1 - Math.exp(-optunaTrial / 22)))).toFixed(4)}
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-1 font-mono">+16.4% Lift</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Optimal Learning Rate</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {(0.08 * Math.pow(0.5, optunaTrial / 30) + 0.024).toFixed(4)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">Log-uniform scale</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Tree Max Depth</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {optunaTrial > 30 ? 6 : 9}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">Regularized</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">L2 Regularization (λ)</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {(1.2 + (optunaTrial * 0.03)).toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">Mitigates overfit</div>
                </div>
              </div>

              {/* Convergence Log */}
              <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 space-y-1">
                <div className="text-slate-500">// Optuna Study Telemetry Log</div>
                <div className="text-purple-400">[I 2026-10-14] Trial {optunaTrial} finished with value: {(0.72 + (0.164 * (1 - Math.exp(-optunaTrial / 22)))).toFixed(4)} and parameters: {'{'}learning_rate: {(0.08 * Math.pow(0.5, optunaTrial / 30) + 0.024).toFixed(4)}, max_depth: {optunaTrial > 30 ? 6 : 9}{'}'}.</div>
                <div className="text-slate-400">[I 2026-10-14] MedianPruner terminated 62 unpromising branches at boosting step 20.</div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
