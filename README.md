# 一念 · 归念协议

这是“一念”学习系统的归念格式与导入解析器仓库。当前协议版本为 `yinian.guinian/v2`。

## v2 修复了什么

v1 使用不可见的 HTML 注释标记机器数据。聊天页面在渲染或复制时可能省略这些注释，造成“一念”看得到正文却找不到数据块。v2 改为可见边界：

```text
YINIAN_GUINIAN_V2_START
{ ...合法 JSON... }
YINIAN_GUINIAN_V2_END
```

解析器仍可读取旧的 `YINIAN_GUIAN_V1_*` 格式，但所有新归念都应生成 v2。

## 仓库内容

- `docs/guinian-spec.md`：当前完整格式与迁移说明
- `schemas/guinian.v2.schema.json`：v2 JSON Schema
- `prompts/guinian-system.md`：可复制到 ChatGPT 项目指令的提示词
- `parsers/guinian.mjs`：可直接接入网页端的 v2/v1 兼容解析器
- `tests/guinian-parser.test.mjs`：解析器测试
- `skills/yinian-guinian/`：可安装的 Codex Skill
- `examples/guinian-rank-nullspace.md`：标准归念样例

## 触发方式

```text
归念：主题
归念: 主题
/归念 主题
```

当用户明确说“把今天的内容归到归念里”时，也应依据当前学习内容生成归念。

## 测试

```bash
node --test tests/guinian-parser.test.mjs
python skills/yinian-guinian/scripts/validate_guinian.py examples/guinian-rank-nullspace.md
```

## 接入说明

把 `parseGuinian` 引入“一念”的粘贴导入入口，并把原来只识别 Markdown 标题或 v1 HTML 注释的逻辑替换掉。导入失败时应保留用户原文并显示解析错误。

本仓库目前只包含协议、Skill 和解析器，不包含“一念”网页、小程序或服务器的完整源码，因此仓库本身不能证明线上应用正在运行。
