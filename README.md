# mobicool-core

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Type Checked: mypy](https://img.shields.io/badge/type%20checked-mypy-blue)](http://mypy-lang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688.svg)](https://fastapi.tiangolo.com)

**mobicool-core** is a production-grade predictive intelligence and machine learning operations (MLOps) platform. Originally initiated as a core service engine, it has transitioned into an enterprise data science architecture supporting automated feature engineering pipelines, experiment tracking, cross-validated model selection, and sub-millisecond REST API model inference.

---

## 🏛️ System Architecture

```mermaid
flowchart LR
    A[Raw Ingestion / Telemetry] --> B[Data Validation & Cleaning]
    B --> C[Automated Feature Store]
    C --> D[Model Training & Hyperparameter Tuning]
    D --> E[Artifact Serialization & Registry]
    E --> F[FastAPI Microservice Inference]
    F --> G[Real-Time Analytics & Monitoring]
```

---

## 🚀 Key Capabilities

- **Robust Feature Engineering**: Standardized scaling, categorical target encoding, quantile outlier clipping, and missing value imputation.
- **Pluggable Model Zoo**: Unified pipeline interfaces for XGBoost, LightGBM, Random Forests, and Scikit-Learn ensembles.
- **Rigorous Evaluation**: Generates ROC-AUC, PR-AUC, F1, log-loss metrics alongside SHAP value interpretability charts.
- **High-Performance Serving**: Asynchronous FastAPI endpoints with strict Pydantic V2 data validation and batch prediction throughput.
- **Production CI/CD**: Automated unit test coverage, flake8 linting, and mypy type checks.

---

## 📁 Repository Layout

```text
mobicool-core/
├── configs/                  # Hyperparameter and environment configurations
│   ├── config.yaml
│   └── logging.conf
├── data/
│   ├── raw/                  # Ingestion inputs (gitignored)
│   └── processed/            # Serialized feature matrices
├── notebooks/                # Exploratory Data Analysis (EDA) & research
│   └── 01_exploratory_data_analysis.ipynb
├── src/
│   ├── api/                  # FastAPI inference routes & Pydantic schemas
│   │   ├── routes.py
│   │   └── schemas.py
│   ├── features/             # Feature transformers & pipelines
│   │   └── build_features.py
│   ├── models/               # Model training, evaluation & prediction
│   │   ├── train.py
│   │   ├── predict.py
│   │   └── metrics.py
│   ├── utils/                # Logging and configuration loaders
│   │   └── logger.py
│   └── __init__.py
├── tests/                    # Comprehensive unit and integration tests
│   ├── test_features.py
│   ├── test_models.py
│   └── test_api.py
├── .github/workflows/        # Automated GitHub Actions CI pipeline
│   └── ci.yml
├── Dockerfile                # Containerized deployment manifest
├── docker-compose.yml        # Multi-container orchestration
├── pyproject.toml            # Python package specifications
├── requirements.txt          # Python dependencies
└── README.md
```

---

## ⚡ Quickstart

### 1. Environment Setup
```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Unix:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Train Pipeline
```bash
python -m src.models.train --config configs/config.yaml
```

### 3. Launch Inference API
```bash
uvicorn src.api.routes:app --host 0.0.0.0 --port 8000 --reload
```
Interactive OpenAPI documentation will be accessible at: `http://localhost:8000/docs`.

### 4. Run Test Suite
```bash
pytest tests/ -v --cov=src
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!-- Architecture spec update -->
