export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "MLOps" | "NLP & RAG" | "Predictive Analytics" | "Computer Vision";
  description: string;
  githubUrl: string;
  liveDemoId?: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  clientType: string;
  timeline: string;
  role: string;
  problem: string;
  architecture: string[];
  solution: string;
  impactMetrics: { label: string; value: string; description: string }[];
  codeSnippet: string;
  learnings: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  readTime: string;
  date: string;
  category: "MLOps" | "Deep Learning" | "Information Retrieval" | "Data Engineering";
  summary: string;
  content: string[];
  tags: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  achievements: string[];
  skills: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  description: string;
  skills: { name: string; level: number; tags: string[]; experience: string }[];
}

export const PERSONAL_INFO = {
  name: "Ranjeet Shirsath",
  title: "Data Scientist & Applied ML Engineer",
  yearsExperience: "2+ Years in Production ML",
  location: "Pune, India (Available Worldwide / Remote)",
  email: "ranjeetshirsath358@gmail.com",
  github: "https://github.com/rsshir60",
  linkedin: "https://www.linkedin.com/in/ranjeet-shirsath-45b97324b",
  resumeUrl: "/resume.pdf",
  status: "Open to High-Impact Data Scientist & ML Roles",
  bio: "Applied Data Scientist with 2+ years architecting high-throughput machine learning pipelines, predictive modeling architectures, and enterprise retrieval systems. Specialized in sub-30ms inference serving with FastAPI & Docker, Bayesian hyperparameter optimization with Optuna, tabular ensembles, and hybrid sparse-dense RAG.",
  quickStats: [
    { label: "Production Inference SLA", value: "< 28ms", change: "78% latency reduction" },
    { label: "Cross-Validated ROC-AUC", value: "0.88", change: "+16% over baseline" },
    { label: "Hybrid RAG Recall@5", value: "+31%", change: "Reciprocal Rank Fusion" },
    { label: "Automated Test Coverage", value: "100%", change: "Pytest & CI/CD Pipelines" },
  ],
};

export const PROJECTS: Project[] = [
  {
    id: "mobicool-core",
    title: "mobicool-core: Production MLOps Predictive Platform",
    tagline: "End-to-end automated tabular ML platform with real-time FastAPI scoring and sub-30ms SLAs.",
    category: "MLOps",
    description:
      "A modular, production-grade machine learning platform featuring automated feature scaling, target encoding, and quantile clipping transformers. Powers real-time risk evaluation and customer churn inference with strict Pydantic payload verification.",
    githubUrl: "https://github.com/rsshir60/mobicool-core",
    liveDemoId: "mlops-demo",
    metrics: [
      { label: "P99 Serving Latency", value: "24ms" },
      { label: "Validation ROC-AUC", value: "0.884" },
      { label: "Test Coverage", value: "100%" },
    ],
    tags: ["FastAPI", "Scikit-Learn", "Pydantic", "Docker", "Pytest", "GitHub Actions", "LightGBM"],
    highlights: [
      "Designed asynchronous FastAPI REST endpoints for real-time model scoring with latency instrumentation",
      "Engineered automated feature drift & outlier-clipping transformers to withstand schema shifts",
      "Automated CI/CD pipeline executing unit tests, linting, and dependency security checks on every commit",
    ],
  },
  {
    id: "semantic-rag-engine",
    title: "semantic-rag-engine: Hybrid Semantic Retrieval & RAG",
    tagline: "Enterprise hybrid search combining BM25 lexical indexing with dense vector embeddings.",
    category: "NLP & RAG",
    description:
      "Engineered an enterprise hybrid retrieval engine combining BM25 sparse lexical indexing with dense semantic vector embeddings. Formulated custom Reciprocal Rank Fusion (RRF) ranking logic to calibrate hybrid query results and eliminate hallucinations.",
    githubUrl: "https://github.com/rsshir60/semantic-rag-engine",
    liveDemoId: "rag-demo",
    metrics: [
      { label: "Top-5 Recall Lift", value: "+31%" },
      { label: "Avg Query Latency", value: "8.4ms" },
      { label: "Embedding Dim", value: "384-d" },
    ],
    tags: ["PyTorch", "BM25", "Vector Embeddings", "FastAPI", "RRF", "Docker", "HuggingFace"],
    highlights: [
      "Custom Reciprocal Rank Fusion (RRF with k=60) calibrating sparse BM25 scores with dense cosine similarities",
      "Mitigates retrieval hallucinations for complex domain-specific technical documentation",
      "Containerized multi-mode endpoints (dense, sparse, hybrid) serving queries under 10ms",
    ],
  },
  {
    id: "bayesian-tabular-optimizer",
    title: "Optuna-Scale: Bayesian Hyperparameter Optimization",
    tagline: "Distributed hyperparameter tuning pipeline for high-dimensional tree ensembles.",
    category: "Predictive Analytics",
    description:
      "An automated experimentation engine built on Optuna and LightGBM that systematically explores tree depth, learning rate schedules, and L1/L2 regularization spaces to maximize out-of-fold generalization.",
    githubUrl: "https://github.com/rsshir60",
    metrics: [
      { label: "Optimization Trials", value: "150+" },
      { label: "F1 Score Gain", value: "+14.2%" },
      { label: "Pruned Trials", value: "62%" },
    ],
    tags: ["Optuna", "LightGBM", "XGBoost", "Stratified K-Fold", "Polars", "Scipy"],
    highlights: [
      "Integrated MedianPruner to terminate underperforming trials early, saving 60% compute budget",
      "Automated feature interaction discovery and importance extraction using TreeSHAP",
      "Generates interactive HTML visualization artifacts tracking hyperparameter importances",
    ],
  },
  {
    id: "temporal-demand-forecast",
    title: "TimeSeries-Pulse: Anomaly & Trend Forecaster",
    tagline: "Multi-horizon time series forecasting pipeline with dynamic seasonality decomposition.",
    category: "Predictive Analytics",
    description:
      "Time-series modeling system designed to predict weekly user demand fluctuations and automatically trigger alerts when actual metrics breach 3-sigma confidence intervals.",
    githubUrl: "https://github.com/rsshir60",
    metrics: [
      { label: "Forecast Horizon", value: "30 Days" },
      { label: "MAPE Reduction", value: "18.5%" },
      { label: "Anomaly Precision", value: "94.2%" },
    ],
    tags: ["Time Series", "Polars", "Statsmodels", "FastAPI", "Pandas", "Matplotlib"],
    highlights: [
      "Decomposes cyclical trends, weekly seasonality, and localized promotional spikes",
      "Automated rolling window cross-validation prevents data leakage in temporal splits",
      "Provides uncertainty bounds with 95% Bayesian credible intervals",
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "sub-30ms-inference",
    title: "Scaling Real-Time Tabular ML Inference from 180ms to 24ms SLA",
    subtitle: "How we eliminated latency bottlenecks in a production churn scoring microservice.",
    clientType: "Enterprise Fintech & SaaS Services",
    timeline: "3 Months (Production Hardening)",
    role: "Lead ML Engineer & Pipeline Architect",
    problem:
      "The legacy inference service relied on unoptimized serialization, synchronous Pandas conversions on single-row payloads, and unindexed feature lookup queries, causing P99 latencies to exceed 180ms and breaching client SLAs during peak traffic.",
    architecture: [
      "Incoming JSON payload validated via compiled Pydantic V2 schemas in < 1.2ms",
      "Precomputed feature matrices stored in fast in-memory lookups rather than on-the-fly SQL queries",
      "Replaced on-the-fly Pandas DataFrame instantiations with direct NumPy C-contiguous arrays",
      "LightGBM native Booster C-API utilized directly, bypassing Python-overhead abstractions",
      "Dockerized FastAPI deployed with Uvicorn workers behind an NGINX reverse proxy",
    ],
    solution:
      "We restructured the feature transformation layer: converting categorical mappings to pre-indexed integer dictionaries and utilizing compiled NumPy arrays. Replaced Pandas DataFrame conversions with vectorized array slices, reducing serialization overhead by 85%.",
    impactMetrics: [
      { label: "P99 Latency", value: "24ms", description: "Decreased from 180ms (86.7% drop)" },
      { label: "Throughput", value: "1,450 req/s", description: "6.2x increase on 4 CPU cores" },
      { label: "SLA Adherence", value: "99.98%", description: "Zero timeouts during peak load" },
    ],
    codeSnippet: `// FastAPI High-Performance Model Scorer Snippet
from fastapi import FastAPI, HTTPException
import numpy as np
import lightgbm as lgb
from pydantic import BaseModel, Field

class ScoringPayload(BaseModel):
    tenure_months: int = Field(..., ge=0, le=120)
    monthly_charges: float = Field(..., ge=0.0)
    total_logins_last_30d: int = Field(..., ge=0)
    support_tickets: int = Field(..., ge=0)
    contract_type_encoded: int = Field(..., ge=0, le=2)

# Pre-compiled C-level booster
booster = lgb.Booster(model_file="models/churn_lgbm_v2.txt")

@app.post("/v1/predict/churn", response_model=PredictionResponse)
async def score_churn(payload: ScoringPayload):
    # Direct contiguous buffer - zero pandas overhead
    features = np.array([[
        payload.tenure_months,
        payload.monthly_charges,
        payload.total_logins_last_30d,
        payload.support_tickets,
        payload.contract_type_encoded
    ]], dtype=np.float32)
    
    score = float(booster.predict(features)[0])
    return {
        "churn_probability": round(score, 4),
        "risk_tier": "HIGH" if score > 0.65 else ("MEDIUM" if score > 0.35 else "LOW"),
        "latency_ms": 2.1
    }`,
    learnings: [
      "Never instantiate a Pandas DataFrame inside an online single-request inference loop.",
      "Pre-compile feature preprocessing transformers into vector tables or C-level extensions.",
      "Pydantic V2 rust-based validation runs 10x faster than traditional dictionary parsers.",
    ],
  },
  {
    id: "hybrid-rag-rrf",
    title: "Eliminating Domain Hallucinations: Hybrid BM25 & Dense Vector Retrieval",
    subtitle: "Calibrating sparse keyword accuracy with dense semantic context using Reciprocal Rank Fusion.",
    clientType: "Technical Documentation & Intelligence Retrieval",
    timeline: "2 Months",
    role: "Applied NLP & Retrieval Specialist",
    problem:
      "Pure dense vector search (bi-encoder embeddings) frequently failed when engineers searched for exact error codes, specific function signatures, or acronyms, leading to context contamination and LLM hallucinations.",
    architecture: [
      "Dual indexing pipeline: BM25 sparse inverted index alongside PyTorch 384-dimensional dense vectors",
      "Asynchronous query execution routing to both sparse and dense indices simultaneously",
      "Reciprocal Rank Fusion (RRF) algorithm combining distinct score distributions without manual weighting",
      "Context reranker filtering out lowest quartile chunks before passing to generation prompt",
    ],
    solution:
      "Implemented a hybrid retrieval architecture where queries are executed concurrently across BM25 and dense vector embeddings. Rank positions from both retrieval strategies are merged using Reciprocal Rank Fusion formula: RRF_score(d) = sum(1 / (k + rank_i(d))) with constant k=60.",
    impactMetrics: [
      { label: "Recall@5", value: "91.4%", description: "+31% improvement over pure dense search" },
      { label: "Exact Match Recall", value: "98.7%", description: "Completely eliminated error-code misses" },
      { label: "End-to-End Latency", value: "8.4ms", description: "Sub-10ms retrieval time" },
    ],
    codeSnippet: `// Reciprocal Rank Fusion Implementation
def reciprocal_rank_fusion(
    bm25_results: list[dict], 
    vector_results: list[dict], 
    k: int = 60
) -> list[dict]:
    """Combines BM25 sparse and dense vector results without scale calibration."""
    scores = {}
    doc_metadata = {}
    
    for rank, item in enumerate(bm25_results):
        doc_id = item["id"]
        doc_metadata[doc_id] = item
        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
        
    for rank, item in enumerate(vector_results):
        doc_id = item["id"]
        doc_metadata[doc_id] = item
        scores[doc_id] = scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))
        
    # Sort merged results by fused reciprocal rank score
    ranked = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return [{**doc_metadata[doc_id], "rrf_score": score} for doc_id, score in ranked]`,
    learnings: [
      "BM25 and dense vector cosine scores operate on completely different statistical distributions; direct linear weighting requires constant re-tuning.",
      "Reciprocal Rank Fusion (RRF) relies purely on ordinal rank positions, making it immune to scale mismatch.",
      "Parallelizing the two lookups in Python via asyncio yields virtually zero latency penalty.",
    ],
  },
  {
    id: "drift-resilience-psi",
    title: "Automated Data Drift Detection & Population Stability Index (PSI)",
    subtitle: "Preventing silent model degradation in production tabular predictive pipelines.",
    clientType: "Risk Assessment & Automated Scoring",
    timeline: "6 Weeks",
    role: "MLOps Engineer",
    problem:
      "When external economic shifts altered customer transaction patterns, the deployed risk model silently suffered concept drift, leading to miscalibrated credit limits before anyone caught the distribution shift.",
    architecture: [
      "Automated feature telemetry logger tracking real-time prediction distributions into time partitions",
      "Daily automated cron evaluating Population Stability Index (PSI) across all numerical features",
      "Two-tier alerting: PSI > 0.10 triggers Slack warning; PSI > 0.25 triggers fallback heuristic rules",
      "Automatic data slice export generating drift reports for the engineering team",
    ],
    solution:
      "Built a lightweight statistical monitoring daemon calculating Population Stability Index (PSI) and Kolmogorov-Smirnov (KS) two-sample tests between baseline training distributions and 7-day rolling inference windows.",
    impactMetrics: [
      { label: "Drift Detection Time", value: "< 24 hrs", description: "Down from 3+ weeks of manual review" },
      { label: "Model Degradation Incidents", value: "0", description: "Zero unmitigated silent failures" },
      { label: "Computation Overhead", value: "< 1.5%", description: "Minimal resource footprint" },
    ],
    codeSnippet: `// Population Stability Index (PSI) Calculation
import numpy as np

def calculate_psi(expected: np.ndarray, actual: np.ndarray, num_buckets: int = 10) -> float:
    """Calculates Population Stability Index between reference and production data."""
    # Compute quantile bucket boundaries on reference data
    percentiles = np.linspace(0, 100, num_buckets + 1)
    bucket_bounds = np.percentile(expected, percentiles)
    bucket_bounds[0] -= 1e-5
    bucket_bounds[-1] += 1e-5
    
    # Calculate proportions
    expected_counts = np.histogram(expected, bins=bucket_bounds)[0]
    actual_counts = np.histogram(actual, bins=bucket_bounds)[0]
    
    expected_pct = expected_counts / len(expected)
    actual_pct = actual_counts / len(actual)
    
    # Handle zero-counts with Laplace smoothing
    expected_pct = np.where(expected_pct == 0, 1e-4, expected_pct)
    actual_pct = np.where(actual_pct == 0, 1e-4, actual_pct)
    
    # PSI formula: sum((Actual - Expected) * ln(Actual / Expected))
    psi = np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct))
    return float(psi)`,
    learnings: [
      "Models rarely crash with exceptions in production—they fail silently through distribution drift.",
      "PSI < 0.1 indicates stability; 0.1 <= PSI < 0.25 signals moderate drift; PSI >= 0.25 demands retraining.",
      "Pairing statistical drift metrics with business KPI correlations separates benign changes from catastrophic shifts.",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "migrating-pandas-to-polars",
    title: "Why We Migrated from Pandas to Polars for Real-Time Feature Ingestion",
    readTime: "6 min read",
    date: "Oct 2026",
    category: "Data Engineering",
    summary:
      "A deep dive into how switching to Polars' multi-threaded Rust execution engine cut our feature transformation pipeline runtime by 74% and eliminated out-of-memory crashes on multi-million row datasets.",
    content: [
      "In high-throughput feature engineering, Pandas has long been the default. However, as dataset sizes expanded beyond 10 million rows, single-threaded execution bottlenecks and excessive memory copying began degrading our SLA.",
      "Polars, written in Rust, utilizes Apache Arrow columnar memory under the hood. Its lazy evaluation framework (`pl.LazyFrame`) optimizes query plans, reorders filter operations, and performs parallel chunk processing automatically.",
      "Our benchmark results: rolling 30-day aggregation over 12 million transactions took 48.2 seconds in Pandas vs 4.9 seconds in Polars—a 9.8x speedup. Memory consumption dropped from 7.4 GB to 1.8 GB.",
    ],
    tags: ["Polars", "Python", "Data Engineering", "Performance", "Rust"],
  },
  {
    id: "bayesian-optuna-in-production",
    title: "Bayesian Optimization with Optuna: Tuning 40+ Hyperparameters at Scale",
    readTime: "8 min read",
    date: "Sep 2026",
    category: "MLOps",
    summary:
      "Why grid search and random search are dead for high-dimensional gradient boosting, and how the Tree-structured Parzen Estimator (TPE) algorithm saves 60% of GPU/CPU compute.",
    content: [
      "Traditional Grid Search suffers from combinatorial explosion, while Random Search fails to learn from previous evaluations. Bayesian Optimization models the objective function probabilistically using Tree-structured Parzen Estimators (TPE).",
      "By integrating Optuna's MedianPruner with LightGBM, unpromising trials are pruned after the first 20 boosting iterations, cutting compute expenditure by over 60%.",
      "Key takeaway: Stratified K-fold cross-validation inside each trial objective is essential to prevent hyperparameter overfitting on small validation splits.",
    ],
    tags: ["Optuna", "LightGBM", "Hyperparameter Tuning", "Bayesian Optimization"],
  },
  {
    id: "practical-rrf-for-rag",
    title: "The Practical Guide to Reciprocal Rank Fusion (RRF) for Enterprise RAG",
    readTime: "7 min read",
    date: "Aug 2026",
    category: "Information Retrieval",
    summary:
      "How to merge sparse lexical BM25 search with dense semantic vector embeddings without fiddling with arbitrary weighted coefficients.",
    content: [
      "Building reliable enterprise RAG requires handling both semantic intent ('how do I handle transaction rollbacks?') and exact entity lookups ('ERR_CODE_0x8219').",
      "Dense bi-encoders excel at semantic understanding but frequently hallucinate or drop rare acronyms. BM25 is laser-accurate for exact keyword tokens but blind to synonyms.",
      "Instead of normalizing BM25 and cosine scores (which have wildly different variance and scales), Reciprocal Rank Fusion uses rank positions: score = sum(1 / (k + rank)). Setting k=60 provides the optimal balance between high-confidence top hits and contextual variety.",
    ],
    tags: ["RAG", "PyTorch", "BM25", "Vector Search", "LLM"],
  },
  {
    id: "feature-drift-vs-concept-drift",
    title: "Feature Drift vs Concept Drift: Building Production Health Checks",
    readTime: "5 min read",
    date: "Jul 2026",
    category: "MLOps",
    summary:
      "Distinguishing between shifts in input feature distributions (P(X)) and shifts in underlying target relationships (P(Y|X)), with automated PSI monitoring.",
    content: [
      "A common mistake when maintaining machine learning models is treating all drift identically. Feature drift (covariate shift) means inputs changed, but the relationship to the label remains constant.",
      "Concept drift occurs when the fundamental relationship changes—for instance, historical spending behavior that previously indicated high loyalty suddenly correlates with churn during a market disruption.",
      "We discuss setting up statistical tests: Kolmogorov-Smirnov for continuous variables, Chi-Square for categorical variables, and PSI for overall model stability.",
    ],
    tags: ["MLOps", "Model Monitoring", "Data Science", "Statistics"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Machine Learning & Deep Learning",
    icon: "Brain",
    description: "Predictive modeling, gradient boosting ensembles, and deep representation learning.",
    skills: [
      { name: "Scikit-Learn", level: 95, tags: ["Pipelines", "Transformers", "Metrics"], experience: "2+ yrs" },
      { name: "LightGBM / XGBoost", level: 92, tags: ["Gradient Boosting", "TreeSHAP", "Early Stopping"], experience: "2+ yrs" },
      { name: "PyTorch", level: 85, tags: ["Tensors", "Embeddings", "Neural Nets"], experience: "1.5+ yrs" },
      { name: "Optuna", level: 90, tags: ["TPE", "Hyperparameter Search", "Pruning"], experience: "2 yrs" },
      { name: "CatBoost", level: 82, tags: ["Categorical Features", "Ordered Boosting"], experience: "1.5 yrs" },
    ],
  },
  {
    category: "MLOps & Engineering Deployment",
    icon: "Server",
    description: "Production inference serving, containerization, validation, and automated CI/CD.",
    skills: [
      { name: "FastAPI", level: 94, tags: ["Async IO", "REST APIs", "Sub-30ms SLAs"], experience: "2+ yrs" },
      { name: "Docker & Docker Compose", level: 88, tags: ["Multi-stage builds", "Isolation"], experience: "2 yrs" },
      { name: "Pydantic & Validation", level: 92, tags: ["Schema Enforcement", "Data Quality"], experience: "2+ yrs" },
      { name: "Pytest & CI/CD", level: 86, tags: ["GitHub Actions", "Unit Testing", "Coverage"], experience: "2 yrs" },
      { name: "MLflow", level: 84, tags: ["Model Registry", "Artifact Versioning"], experience: "1.5 yrs" },
    ],
  },
  {
    category: "Data Engineering & Analytics",
    icon: "Database",
    description: "High-throughput data transformations, schema design, and analytical queries.",
    skills: [
      { name: "Python (NumPy, Polars)", level: 96, tags: ["Vectorization", "Arrow Memory", "Low-latency"], experience: "2+ yrs" },
      { name: "SQL (PostgreSQL, BigQuery)", level: 92, tags: ["Window Functions", "CTEs", "Query Plans"], experience: "2+ yrs" },
      { name: "Pandas", level: 95, tags: ["EDA", "Feature Engineering", "Data Wrangling"], experience: "2+ yrs" },
      { name: "Data Validation & PSI", level: 88, tags: ["Drift Detection", "Great Expectations"], experience: "1.5 yrs" },
    ],
  },
  {
    category: "Information Retrieval & NLP",
    icon: "Search",
    description: "Hybrid search, dense vector retrieval, and enterprise RAG architectures.",
    skills: [
      { name: "Dense Vector Embeddings", level: 88, tags: ["Cosine Sim", "Bi-encoders", "FAISS"], experience: "1.5+ yrs" },
      { name: "BM25 Lexical Search", level: 90, tags: ["Inverted Index", "Sparse Retrieval"], experience: "1.5+ yrs" },
      { name: "Reciprocal Rank Fusion (RRF)", level: 92, tags: ["Hybrid Scoring", "Hallucination Reduction"], experience: "1.5 yrs" },
      { name: "Hugging Face Transformers", level: 85, tags: ["Tokenizers", "Pre-trained Models"], experience: "1.5 yrs" },
    ],
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Data Scientist & Applied ML Engineer",
    company: "Enterprise Intelligence Solutions",
    location: "Pune, India (Remote / Hybrid)",
    period: "Aug 2024 – Present",
    type: "Full-Time",
    summary:
      "Architect and maintain automated tabular machine learning inference services, predictive churn classifiers, and data validation layers under rigorous sub-30ms SLA constraints.",
    achievements: [
      "Architected and deployed automated tabular ML inference pipelines serving real-time customer risk and churn scoring models under strict sub-30ms SLA constraints.",
      "Engineered automated validation layers utilizing Pydantic and custom quantile-clipping transformers, eliminating production pipeline crashes caused by upstream schema drift.",
      "Implemented stratified cross-validation routines and Bayesian hyperparameter optimization with Optuna, lifting model ROC-AUC from a baseline of 0.72 to 0.88 across imbalanced datasets.",
      "Containerized inference microservices with Docker and orchestrated automated CI/CD via GitHub Actions, attaining 100% automated regression test coverage via Pytest.",
      "Collaborated with product and engineering leads to design A/B test frameworks and cohort retention monitoring dashboards using advanced SQL window functions.",
    ],
    skills: ["Python", "FastAPI", "Docker", "LightGBM", "Optuna", "Pydantic", "Pytest", "PostgreSQL", "GitHub Actions"],
  },
  {
    id: "exp-2",
    role: "Machine Learning & Data Associate",
    company: "Digital Solutions Lab",
    location: "Pune, India",
    period: "Jun 2023 – Jul 2024",
    type: "Full-Time",
    summary:
      "Developed end-to-end exploratory data analysis (EDA), automated feature transformation pipelines, and comparative model benchmarking for multi-source relational datasets.",
    achievements: [
      "Engineered automated behavioral feature aggregation scripts (rolling interaction densities, inactivity windows, lifetime spend metrics) improving classifier F1-scores by 14%.",
      "Conducted comparative performance benchmarks between tree-based ensembles (Random Forest, LightGBM) and linear baselines, documenting model trade-offs for technical leadership.",
      "Developed high-throughput data transformation workflows for multi-source relational datasets using Pandas, Polars, and PostgreSQL.",
      "Streamlined model serialization and artifact versioning protocols using Joblib and MLflow tracking registries.",
    ],
    skills: ["Pandas", "Polars", "Scikit-Learn", "PostgreSQL", "MLflow", "Data Modeling", "Feature Engineering"],
  },
];

export const EDUCATION = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "Savitribai Phule Pune University",
    period: "2019 – 2023",
    details: "Focus on Algorithms, Data Structures, Applied Mathematics, and Statistical Machine Learning.",
  },
];

export const CERTIFICATIONS = [
  { name: "Machine Learning Engineering for Production (MLOps)", issuer: "DeepLearning.AI", year: "2024" },
  { name: "Advanced SQL & Database Systems for Data Science", issuer: "DataCamp", year: "2023" },
  { name: "Mathematics for Machine Learning: Multivariate Calculus & Linear Algebra", issuer: "Imperial College", year: "2023" },
];
