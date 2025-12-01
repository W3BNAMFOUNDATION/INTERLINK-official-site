#!/usr/bin/env python3
"""
Static site packager for INTERLINK™.

Creates a clean `dist/` directory containing all HTML entry points, pages,
localized assets, brand resources, and downloadable investor material ready
for GitHub Pages deployment.
"""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"

INCLUDE_DIRS = [
    "assets",
    "public",
    "pages",
    "components",
    "translations",
]

INCLUDE_FILES = {
    "service_profiles.yaml",
}

HTML_SUFFIXES = {".html"}
SKIP_NAMES = {"dist", ".git", ".github", "__pycache__"}


def reset_dist() -> None:
    """Remove any existing dist directory and recreate it fresh."""
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)


def copy_directories() -> None:
    for dirname in INCLUDE_DIRS:
        src = ROOT / dirname
        if src.exists():
            shutil.copytree(src, DIST / dirname)


def copy_root_files() -> None:
    for item in ROOT.iterdir():
        if item.name in SKIP_NAMES:
            continue
        if item.is_file() and (item.suffix in HTML_SUFFIXES or item.name in INCLUDE_FILES):
            shutil.copy2(item, DIST / item.name)


def main() -> None:
    reset_dist()
    copy_directories()
    copy_root_files()
    print(f"Packaged static site into {DIST.resolve()}")


if __name__ == "__main__":
    main()
