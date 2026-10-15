import os
import logging
import sys
from typing import Optional


def setup_logger(
    name: str = "mobicool-core",
    level: int = logging.INFO,
    log_file: Optional[str] = None,
) -> logging.Logger:
    """Creates a standardised logger with console (and optional file) handler.

    Parameters
    ----------
    name     : Logger namespace.
    level    : Logging verbosity level.
    log_file : If provided, also writes structured logs to this path.
    """
    logger = logging.getLogger(name)
    if logger.handlers:
        return logger

    logger.setLevel(level)
    formatter = logging.Formatter(
        fmt="[%(asctime)s] [%(levelname)-8s] [%(name)s]: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    if log_file:
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        file_handler = logging.FileHandler(log_file, encoding="utf-8")
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger


import yaml as _yaml

def load_config(path: str, required_keys=None) -> dict:
    """Loads YAML config and validates presence of required top-level keys."""
    with open(path) as f:
        cfg = _yaml.safe_load(f)
    if required_keys:
        missing = [k for k in required_keys if k not in cfg]
        if missing:
            raise KeyError(f'Missing config keys: {missing}')
    return cfg
