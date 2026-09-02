import logging
import sys

def setup_logger(name: str = "mobicool-core", level: int = logging.INFO) -> logging.Logger:
    """Configures and returns a standardized console and file logger."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(level)
        formatter = logging.Formatter(
            fmt="[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    return logger

# Logger formatter

# Logger formatter

# Logger formatter

# Logger formatter

# Logger formatter

# Logger formatter
