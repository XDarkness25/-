import assert from "node:assert/strict";
import test from "node:test";
import { parseGuinian, parseGuinianTrigger } from "../parsers/guinian.mjs";

const record = {
  schema_version: "yinian.guinian/v2",
  type: "guinian",
  title: "循环与异常处理",
  subject: { discipline: "Python", topic: "循环与异常处理", tags: ["while"] },
  one_sentence: "失败路径应回到输入点。",
  core_points: [],
  misconceptions: [],
  examples: [],
  open_questions: [],
};

test("recognizes all supported trigger variants", () => {
  assert.equal(parseGuinianTrigger("归念：循环与异常处理"), "循环与异常处理");
  assert.equal(parseGuinianTrigger("归念: 循环与异常处理"), "循环与异常处理");
  assert.equal(parseGuinianTrigger("/归念 循环与异常处理"), "循环与异常处理");
});

test("imports a rendered-copy-safe v2 record", () => {
  const source = `说明文字\nYINIAN_GUINIAN_V2_START\n\`\`\`json\n${JSON.stringify(record)}\n\`\`\`\nYINIAN_GUINIAN_V2_END`;
  assert.deepEqual(parseGuinian(source).record, record);
});

test("uses the last complete block", () => {
  const old = { ...record, title: "旧记录" };
  const source = `YINIAN_GUINIAN_V2_START\n${JSON.stringify(old)}\nYINIAN_GUINIAN_V2_END\nYINIAN_GUINIAN_V2_START\n${JSON.stringify(record)}\nYINIAN_GUINIAN_V2_END`;
  assert.equal(parseGuinian(source).record.title, "循环与异常处理");
});

test("reports incomplete copied content", () => {
  assert.throws(() => parseGuinian("# 归念｜只有可读部分"), /未找到完整/);
});
