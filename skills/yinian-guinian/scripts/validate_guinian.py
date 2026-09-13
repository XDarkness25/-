#!/usr/bin/env python3
"""Validate a copied 一念·归念 v2 record without third-party packages."""

from __future__ import annotations

import json
import sys
from pathlib import Path

START = "YINIAN_GUINIAN_V2_START"
END = "YINIAN_GUINIAN_V2_END"
REQUIRED = {
    "schema_version",
    "type",
    "title",
    "subject",
    "one_sentence",
    "core_points",
    "misconceptions",
    "examples",
    "open_questions",
}


def extract(source: str) -> dict:
    text = source.replace("\r\n", "\n").replace("\r", "\n")
    end_at = text.rfind(END)
    start_at = text.rfind(START, 0, end_at) if end_at >= 0 else -1
    if start_at < 0 or end_at < 0:
        raise ValueError("未找到完整的归念 v2 数据边界")
    body = text[start_at + len(START) : end_at].strip()
    lines = body.splitlines()
    if lines and lines[0].strip().lower() in {"```", "```json"}:
        lines.pop(0)
    if lines and lines[-1].strip() == "```":
        lines.pop()
    record = json.loads("\n".join(lines).strip())
    missing = sorted(REQUIRED - record.keys())
    if missing:
        raise ValueError("缺少必填字段: " + ", ".join(missing))
    if record["schema_version"] != "yinian.guinian/v2":
        raise ValueError("schema_version 必须为 yinian.guinian/v2")
    if record["type"] != "guinian":
        raise ValueError("type 必须为 guinian")
    if not isinstance(record["subject"], dict):
        raise ValueError("subject 必须是对象")
    for key in ("core_points", "misconceptions", "examples", "open_questions"):
        if not isinstance(record[key], list):
            raise ValueError(f"{key} 必须是数组")
    return record


def main() -> int:
    if len(sys.argv) != 2:
        print("用法: validate_guinian.py PATH", file=sys.stderr)
        return 2
    try:
        record = extract(Path(sys.argv[1]).read_text(encoding="utf-8"))
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        print(f"FAIL: {exc}", file=sys.stderr)
        return 1
    print(f"PASS: {record['title']} ({record['schema_version']})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
