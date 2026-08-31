# 一念 · 归念协议

这是“一念”学习系统的归念格式权威仓库。

当用户在受支持的会话中输入：

```text
归念：主题
归念: 主题
/归念 主题
```

助手应按照 `docs/guinian-spec.md` 输出稳定的学习收束记录，并在末尾附带符合 `schemas/guinian.v1.schema.json` 的机器数据块。

## 仓库内容

- `docs/guinian-spec.md`：完整格式、触发规则与解析约定
- `schemas/guinian.v1.schema.json`：机器可校验的 v1 数据结构
- `prompts/guinian-system.md`：应复制到 ChatGPT 项目指令中的完整提示词
- `examples/guinian-rank-nullspace.md`：标准输出样例

## 重要说明

GitHub 文件不会被普通 ChatGPT 会话自动读取。若希望“自学规划”项目内的新会话都能识别归念指令，需要把 `prompts/guinian-system.md` 的内容加入该项目的自定义指令；若希望“一念”应用自动导入，则还需由应用解析输出末尾的 JSON 数据块。

当前协议版本：`yinian.guinian/v1`
