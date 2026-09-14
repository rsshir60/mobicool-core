import numpy as np
from src.models.metrics import evaluate_classification

def test_evaluate_classification():
    y_true = np.array([1, 0, 1, 1, 0])
    y_pred = np.array([1, 0, 1, 0, 0])
    y_prob = np.array([0.9, 0.1, 0.8, 0.4, 0.2])
    
    metrics = evaluate_classification(y_true, y_pred, y_prob)
    assert "accuracy" in metrics
    assert "f1_score" in metrics
    assert "roc_auc" in metrics
    assert metrics["accuracy"] == 0.8

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests

# Evaluator unit tests
