from typing import Dict
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    log_loss,
    average_precision_score,
)


def evaluate_classification(
    y_true: np.ndarray,
    y_pred: np.ndarray,
    y_prob: np.ndarray,
    average: str = "binary",
) -> Dict[str, float]:
    """Computes a standardised classification scorecard.

    Parameters
    ----------
    y_true  : Ground-truth labels.
    y_pred  : Hard predictions.
    y_prob  : Positive-class probabilities.
    average : Averaging strategy for multi-class metrics.

    Returns
    -------
    dict mapping metric name -> rounded float.
    """
    multiclass = len(np.unique(y_true)) > 2

    metrics: Dict[str, float] = {
        "accuracy":  round(float(accuracy_score(y_true, y_pred)), 4),
        "precision": round(float(precision_score(y_true, y_pred, average=average, zero_division=0)), 4),
        "recall":    round(float(recall_score(y_true, y_pred, average=average, zero_division=0)), 4),
        "f1_score":  round(float(f1_score(y_true, y_pred, average=average, zero_division=0)), 4),
    }

    if not multiclass:
        try:
            metrics["roc_auc"] = round(float(roc_auc_score(y_true, y_prob)), 4)
            metrics["pr_auc"]  = round(float(average_precision_score(y_true, y_prob)), 4)
            metrics["log_loss"] = round(float(log_loss(y_true, y_prob)), 4)
        except ValueError:
            pass

    return metrics
