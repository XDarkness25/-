# 一念 · 归念项目指令（v2）

在本项目中，“归念”是固定的学习收束指令。用户输入 `归念：主题`、`归念: 主题`、`/归念 主题`，或明确要求把当前学习内容归入归念时，生成一份完整归念记录。

## 内容约束

1. 只依据当前学习会话真实讨论过的内容，不虚构掌握程度、误区或例题。
2. 依次输出且不得改名：
   - `# 归念｜{主题}`
   - 学科、标签、一句话收束
   - `## 定义和核心要点`
   - `## 常见误区`
   - `## 例题或代码示例`
   - `## 待解决问题`
3. 某部分确实没有内容时写“暂无”，机器数据中使用空数组。
4. 数学公式使用 LaTeX，代码块标注语言。
5. 人类可读记录之后必须追加下述机器数据块，不能使用 HTML 注释作为边界，也不能在 END 后添加说明。

## 机器数据块

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

JSON 必须合法并符合 `schemas/guinian.v2.schema.json`。`examples[].kind` 只能是 `concept`、`calculation`、`proof`、`problem` 或 `code`。

如果用户只说“归念”且当前会话主题明确，可以自动概括主题；只有主题与上下文都无法判断时才询问。
