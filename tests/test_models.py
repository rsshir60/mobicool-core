import numpy as np
import pytest
from src.models.metrics import evaluate_classification


def test_perfect_classification():
    y_true = np.array([1, 0, 1, 1, 0])
    metrics = evaluate_classification(y_true, y_true, y_true.astype(float))
    assert metrics["accuracy"] == 1.0
    assert metrics["f1_score"] == 1.0
    assert metrics["roc_auc"] == 1.0


def test_metric_keys_present():
    y_true = np.array([1, 0, 1, 1, 0])
    y_pred = np.array([1, 0, 1, 0, 0])
    y_prob = np.array([0.9, 0.1, 0.8, 0.4, 0.2])
    metrics = evaluate_classification(y_true, y_pred, y_prob)
    for key in ["accuracy", "precision", "recall", "f1_score", "roc_auc", "pr_auc", "log_loss"]:
        assert key in metrics, f"Missing metric: {key}"


def test_accuracy_value():
    y_true = np.array([1, 0, 1, 1, 0])
    y_pred = np.array([1, 0, 1, 0, 0])
    y_prob = np.array([0.9, 0.1, 0.8, 0.4, 0.2])
    metrics = evaluate_classification(y_true, y_pred, y_prob)
    assert metrics["accuracy"] == pytest.approx(0.8)


def test_extended_metrics_present():
    import numpy as np
    from src.models.metrics import evaluate_classification
    y_true = np.array([1,0,1,0,1])
    y_pred = np.array([1,0,1,0,1])
    y_prob = np.array([0.9,0.05,0.87,0.1,0.93])
    m = evaluate_classification(y_true, y_pred, y_prob)
    assert 'pr_auc' in m
    assert 'log_loss' in m
