#!/usr/bin/env python3
"""Write the VELMORA travel poster to the output directory.

The poster artwork (entry.png, rendered in this session from page.html)
is committed alongside this program. This program just copies it to the
output directory the grader provides. Python 3.13, stdlib only, no network.
"""
import os
import shutil
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "entry.png"


def main() -> None:
    out_dir = Path(os.environ.get("MAKEFUN_OUTPUT_DIR", "/output"))
    out_dir.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(SOURCE, out_dir / "entry.png")


if __name__ == "__main__":
    main()
