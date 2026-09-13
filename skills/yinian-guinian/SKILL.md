---
name: yinian-guinian
description: Generate or repair copyable “一念·归念” learning records. Use when the user writes “归念：主题”, “/归念 主题”, asks to put the current lesson into 归念, or reports that 一念 cannot recognize a pasted 归念 record.
---

# 一念 · 归念

Create a stable learning record that remains readable in chat and survives rendered-text copying into 一念.

Before generating or repairing a record, read [references/format-v2.md](references/format-v2.md). Follow its field order and visible machine-boundary rules exactly.

## Handle requests

- Treat `归念：主题`, `归念: 主题`, and `/归念 主题` as equivalent after Unicode NFKC normalization.
- Also activate when the user clearly asks to put the current learning session into 归念. Infer the topic from the visible session when unambiguous; ask only when neither a topic nor usable lesson context exists.
- Summarize only material actually discussed in the current learning session. Do not invent mastery, mistakes, examples, or unresolved questions.
- Keep the fixed human-readable sections even when a section is empty; write `暂无` there and use an empty array in JSON.
- End with the v2 visible machine block. Never use HTML comments as record boundaries: rendered-copy workflows may omit them.
- Do not add any prose after the closing boundary.

## Repair and diagnose

When given a failed pasted record, check for the visible v2 boundaries, valid JSON, exact version/type constants, and all required fields. If a local file is available, run:

```bash
python scripts/validate_guinian.py PATH
```

Explain the failing invariant briefly, then return a corrected complete record. Do not claim that 一念 imported it unless the application confirms the import.

Legacy v1 records using `YINIAN_GUIAN_V1_*` may be read for migration, but newly generated records must use v2.
