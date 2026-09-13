const V2 = {
  start: "YINIAN_GUINIAN_V2_START",
  end: "YINIAN_GUINIAN_V2_END",
  schema: "yinian.guinian/v2",
};

const V1 = {
  start: "<!-- YINIAN_GUIAN_V1_START -->",
  end: "<!-- YINIAN_GUIAN_V1_END -->",
  schema: "yinian.guinian/v1",
};

const REQUIRED = [
  "schema_version",
  "type",
  "title",
  "subject",
  "one_sentence",
  "core_points",
  "misconceptions",
  "examples",
  "open_questions",
];

function extractLastCompleteBlock(text, format) {
  const endAt = text.lastIndexOf(format.end);
  if (endAt < 0) return null;
  const startAt = text.lastIndexOf(format.start, endAt);
  if (startAt < 0) return null;
  let body = text.slice(startAt + format.start.length, endAt).trim();
  body = body.replace(/^```(?:json)?\s*\n/i, "").replace(/\n```\s*$/, "");
  return body;
}

function validateRecord(record, format) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error("归念数据必须是 JSON 对象");
  }
  const missing = REQUIRED.filter((key) => !(key in record));
  if (missing.length) throw new Error(`归念缺少字段：${missing.join("、")}`);
  if (record.schema_version !== format.schema) throw new Error("归念版本不匹配");
  if (record.type !== "guinian") throw new Error("记录类型必须为 guinian");
  if (!record.title?.trim()) throw new Error("归念标题不能为空");
  if (!record.subject || typeof record.subject !== "object") throw new Error("subject 必须是对象");
  for (const key of ["core_points", "misconceptions", "examples", "open_questions"]) {
    if (!Array.isArray(record[key])) throw new Error(`${key} 必须是数组`);
  }
  return record;
}

export function parseGuinian(source) {
  const text = String(source ?? "").replace(/\r\n?/g, "\n");
  for (const format of [V2, V1]) {
    const body = extractLastCompleteBlock(text, format);
    if (body === null) continue;
    try {
      return { version: format.schema, record: validateRecord(JSON.parse(body), format) };
    } catch (error) {
      throw new Error(`归念数据块存在但无法导入：${error.message}`);
    }
  }
  throw new Error("未找到完整的归念数据边界；请复制从 START 到 END 的全部内容");
}

export function parseGuinianTrigger(input) {
  const normalized = String(input ?? "").trim().normalize("NFKC");
  const match = normalized.match(/^\/?归念(?:\s*:\s*|\s+)(.+?)\s*$/u);
  return match?.[1]?.trim() || null;
}
