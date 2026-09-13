# 一念 · 归念 v2 格式

## Why v2

v1 used HTML comments as machine boundaries. Some chat renderers omit those comments when users copy rendered text, leaving 一念 without reliable boundaries. v2 uses visible plain-text sentinels and keeps v1 readable only for migration.

## Human-readable record

Use this exact order:

```markdown
# 归念｜{主题}

- 学科：{学科分类}
- 标签：{标签1}、{标签2}
- 一句话收束：{本次最重要的认识}

## 定义和核心要点

1. **{概念名}**：{定义或结论}
   - 直观理解：{解释}
   - 关键关系：{公式、条件或推理链}

## 常见误区

1. **误区**：{错误理解}
   - **澄清**：{正确理解}

## 例题或代码示例

### 示例 1｜{类型}

{题目、推导或代码}

## 待解决问题

1. {下一步问题}
```

Use `暂无` rather than deleting an empty section.

## Copy block

Append this immediately after the human-readable record. Boundary lines must be visible, uppercase, and alone on their lines. The JSON fence is optional for an importer but required in generated chat output.

````text
YINIAN_GUINIAN_V2_START
```json
{
  "schema_version": "yinian.guinian/v2",
  "type": "guinian",
  "title": "主题",
  "subject": {
    "discipline": "学科",
    "topic": "主题",
    "tags": ["标签"]
  },
  "one_sentence": "一句话收束",
  "core_points": [
    {
      "name": "概念名",
      "statement": "定义或结论",
      "intuition": "直观解释",
      "key_relation": "公式、条件或推理链"
    }
  ],
  "misconceptions": [
    {
      "mistake": "错误理解",
      "correction": "正确理解"
    }
  ],
  "examples": [
    {
      "kind": "problem",
      "title": "示例标题",
      "prompt": "题目或任务",
      "solution": "解答、推导或代码",
      "language": null
    }
  ],
  "open_questions": ["待解决问题"]
}
```
YINIAN_GUINIAN_V2_END
````

Required top-level keys are `schema_version`, `type`, `title`, `subject`, `one_sentence`, `core_points`, `misconceptions`, `examples`, and `open_questions`. Arrays may be empty. `examples[].kind` is one of `concept`, `calculation`, `proof`, `problem`, or `code`.

## Importer behavior

1. Normalize line endings to `\n`.
2. Locate the last complete v2 boundary pair. This avoids accidentally reading a format example quoted earlier in a conversation.
3. Extract the text between the boundaries.
4. Remove one optional opening `` ```json `` line and one optional closing `` ``` `` line.
5. Parse JSON and validate the required fields and constants.
6. If v2 is absent, optionally try the legacy `YINIAN_GUIAN_V1_START` / `YINIAN_GUIAN_V1_END` pair.
7. On failure, retain the pasted source and show the validation error; never silently discard it.

Reference TypeScript extraction logic:

```ts
export function extractGuinianV2(source: string) {
  const text = source.replace(/\r\n?/g, "\n");
  const start = "YINIAN_GUINIAN_V2_START";
  const end = "YINIAN_GUINIAN_V2_END";
  const endAt = text.lastIndexOf(end);
  const startAt = endAt < 0 ? -1 : text.lastIndexOf(start, endAt);
  if (startAt < 0 || endAt < 0) throw new Error("未找到完整的归念 v2 数据边界");
  let body = text.slice(startAt + start.length, endAt).trim();
  body = body.replace(/^```(?:json)?\s*\n/i, "").replace(/\n```\s*$/, "");
  const record = JSON.parse(body);
  if (record.schema_version !== "yinian.guinian/v2" || record.type !== "guinian") {
    throw new Error("归念版本或记录类型不匹配");
  }
  return record;
}
```
