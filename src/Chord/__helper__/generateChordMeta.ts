import { range, isNil, isObject, isString, isNumber, isBoolean, toPairs, keys, values } from "lodash";
import { PianoKey } from "../../PianoKey";
import { Note } from "../../Note";
import { Interval } from "../../Interval";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import chordMeta from "../static/CHORD_META.ts";
import CHORD_FORMULA_ID from "../../ChordFormula/static/CHORD_FORMULA_ID.ts";
import { T_IntervalType } from "../../common/static/INTERVAL_TYPES.ts";

/**
 * 和弦元数据生成器
 *
 * 运行方式：
 * - 生成所有：npx tsx src/Chord/__helper__/generateChordMeta.ts --all
 * - 生成单个家族：npx tsx src/Chord/__helper__/generateChordMeta.ts --family <家族名>
 *
 * 输出目录结构：
 * CHORD_FORMULA_META/
 * ├── CHORD3_META/
 * │   ├── MAJ3_CHORD_META.ts
 * │   ├── MIN3_CHORD_META.ts
 * │   └── ...
 * └── CHORD7_META/
 *     ├── MAJ7_CHORD_META.ts
 *     └── ...
 */

interface ChordConfig {
  chordKey: string;
  chordIdKey: string; // CHORD_FORMULA_ID 中的键名
  outputFileName: string;
  cnName: string;
  intervalList: Array<[T_IntervalType, number]>;
  notesNum: number;
  semitoneClockPositionList: number[];
}

interface FamilyConfig {
  familyName: string;
  chords: ChordConfig[];
}

// 从 CHORD_META.ts 提取并分类数据
const buildFamilies = (): FamilyConfig[] => {
  const families: Map<string, ChordConfig[]> = new Map();

  // chordKey 映射：CHORD_META 中的 key -> CHORD_FORMULA_ID 中的 key
  const chordKeyMapping: Record<string, string> = {
    dom9b13: "dom9add13",
  };

  for (const chord of chordMeta) {
    const type = chord.type;
    let chordKey = chord.chordKey;
    const cnName = chord.cnName;

    // 使用映射后的 chordKey 来检查是否存在
    const mappedKey = chordKeyMapping[chordKey] || chordKey;

    // 只处理存在于 CHORD_FORMULA_ID 中的和弦
    if (!(mappedKey in CHORD_FORMULA_ID)) {
      continue;
    }

    // 使用映射后的 key
    chordKey = mappedKey;

    // 映射 type 到家族名
    const familyMapping: Record<string, string> = {
      chord3: "CHORD3_META",
      add: "CHORD3_EX_META",
      chord7: "CHORD7_META",
      chord7alt: "DOM7_ALTER_META",
      aug6: "CHORD7_ADD_META",
      sus: "CHORD_SUS_META",
      chord9: "CHORD9_META",
      chord11: "CHORD11_META",
      chord13: "CHORD13_META",
    };

    let familyName = familyMapping[type];

    // 特殊处理：type 为 "add" 但实际是七和弦扩展的
    if (type === "add") {
      if (
        chordKey.startsWith("dom7") ||
        chordKey.startsWith("maj7") ||
        chordKey.startsWith("min7") ||
        chordKey.startsWith("minmaj7")
      ) {
        familyName = "CHORD7_EX_META"; // 新家族：七和弦扩展
      }
    }

    // 特殊处理：type 为 "add" 但实际是七和弦扩展的
    if (type === "add") {
      if (
        chordKey.startsWith("dom7") ||
        chordKey.startsWith("maj7") ||
        chordKey.startsWith("min7") ||
        chordKey.startsWith("minmaj7")
      ) {
        familyName = "CHORD7_EX_META"; // 需要创建新家族
      }
    }

    // 特殊处理 chord7alt 中的非属七和弦
    if (type === "chord7alt") {
      if (chordKey.startsWith("maj7")) {
        familyName = "MAJ7_ALTER_META";
      } else if (chordKey.startsWith("min7") || chordKey.startsWith("minmaj")) {
        familyName = "MIN7_ALTER_META";
      }
    }

    // 处理九和弦变音
    if (
      type === "chord9" &&
      (chordKey.includes("#") || chordKey.includes("b"))
    ) {
      if (chordKey.startsWith("dom9")) {
        familyName = "DOM9_ALTER_META";
      } else if (chordKey.startsWith("maj9")) {
        familyName = "MAJ9_ALTER_META";
      } else if (chordKey.startsWith("min9")) {
        familyName = "MIN9_ALTER_META";
      }
    }

    // 处理十一和弦变音
    if (
      type === "chord11" &&
      (chordKey.includes("#") || chordKey.includes("b"))
    ) {
      if (chordKey.startsWith("dom11")) {
        familyName = "DOM11_ALTER_META";
      } else if (chordKey.startsWith("min11")) {
        familyName = "MIN11_ALTER_META";
      }
    }

    // 处理十三和弦变音
    if (
      type === "chord13" &&
      (chordKey.includes("#") || chordKey.includes("b"))
    ) {
      if (chordKey.startsWith("dom13")) {
        familyName = "DOM13_ALTER_META";
      } else if (chordKey.startsWith("maj13")) {
        familyName = "MAJ13_ALTER_META";
      }
    }

    // 转换 chordKey 到输出文件名
    const outputFileName = convertChordKeyToFileName(chordKey);

    if (!familyName) {
      console.warn(`Unknown family for type: ${type}, chordKey: ${chordKey}`);
      continue;
    }

    if (!families.has(familyName)) {
      families.set(familyName, []);
    }

    families.get(familyName)!.push({
      chordKey,
      chordIdKey: chordKey, // chordKey 和 chordIdKey 相同
      outputFileName,
      cnName,
      intervalList: chord.intervalList,
      notesNum: chord.notesNum,
      semitoneClockPositionList: chord.semitoneClockPositionList,
    });
  }

  return Array.from(families.entries()).map(([familyName, chords]) => ({
    familyName,
    chords,
  }));
};

// 转换 chordKey 到文件名
function convertChordKeyToFileName(chordKey: string): string {
  const mapping: Record<string, string> = {
    maj3: "MAJ3",
    min3: "MIN3",
    dim3: "DIM3",
    aug3: "AUG3",
    maj3b5: "MAJ3_FLAT5",
    maj3add6: "MAJ3_ADD6",
    min3add6: "MIN3_ADD6",
    maj3add6add9: "MAJ3_ADD6_ADD9",
    min3add6add9: "MIN3_ADD6_ADD9",
    maj3add9: "MAJ3_ADD9",
    maj3add11: "MAJ3_ADD11",
    min3add9: "MIN3_ADD9",
    min3add11: "MIN3_ADD11",
    maj7add11: "MAJ7_ADD11",
    dom7add6: "DOM7_ADD6",
    itaug6: "ITAUG6",
    fraug6: "FRAUG6",
    graug6: "GRAUG6",
    maj7: "MAJ7",
    dom7: "DOM7",
    min7: "MIN7",
    halfdim7: "HALFDIM7",
    dim7: "DIM7",
    minmaj7: "MIN_MAJ7",
    "dom7#5": "DOM7_SHARP5",
    augmaj7: "AUG7",
    dom7b5: "DOM7_FLAT5",
    dom7b9: "DOM7_FLAT9",
    "dom7#9": "DOM7_SHARP9",
    "dom7#11": "DOM7_SHARP11",
    dom7b13: "DOM7_FLAT13",
    dom7b5b9: "DOM7_FLAT5_FLAT9",
    "dom7b5#9": "DOM7_FLAT5_SHARP9",
    "dom7#5b9": "DOM7_SHARP5_FLAT9",
    "dom7#5#9": "DOM7_SHARP5_SHARP9",
    maj7b5: "MAJ7_FLAT5",
    "maj7#5": "MAJ7_SHARP5",
    maj7b9: "MAJ7_FLAT9",
    maj7b13: "MAJ7_FLAT13",
    "maj7#11": "MAJ7_SHARP11",
    "min7#5": "MIN7_SHARP5",
    minmaj7b5: "MIN_MAJ7_FLAT5",
    "minmaj7#5": "MIN_MAJ7_SHARP5",
    sus2: "SUS2",
    sus4: "SUS4",
    dom7sus2: "DOM7_SUS2",
    dom7sus4: "DOM7_SUS4",
    dom7sus4b9: "DOM7_SUS4_FLAT9",
    maj7sus2: "MAJ7_SUS2",
    maj7sus4: "MAJ7_SUS4",
    dom9sus4: "DOM9_SUS4",
    maj9sus4: "MAJ9_SUS4",
    dom13sus4: "DOM13_SUS4",
    maj13sus4: "MAJ13_SUS4",
    maj13sus2: "MAJ13_SUS2",
    maj9: "MAJ9",
    dom9: "DOM9",
    min9: "MIN9",
    minmaj9: "MIN_MAJ9",
    "dom9#5": "DOM9_SHARP5",
    dom9b9: "DOM9_FLAT9",
    dom9b11: "DOM9_FLAT11",
    "dom9#11": "DOM9_SHARP11",
    dom9add13: "DOM9_ADD13",
    dom9b13: "DOM9_ADD13",
    maj9b5: "MAJ9_FLAT5",
    "maj9#5": "MAJ9_SHARP5",
    "maj9#11": "MAJ9_SHARP11",
    maj9b13: "MAJ9_FLAT13",
    min9b5: "MIN9_FLAT5",
    min9b9: "MIN9_FLAT9",
    maj11: "MAJ11",
    dom11: "DOM11",
    min11: "MIN11",
    minmaj11: "MIN_MAJ11",
    dom11b5: "DOM11_FLAT5",
    "dom11#5": "DOM11_SHARP5",
    dom11b9: "DOM11_FLAT9",
    "dom11#9": "DOM11_SHARP9",
    dom11b13: "DOM11_FLAT13",
    min11b5: "MIN11_FLAT5",
    maj13: "MAJ13",
    dom13: "DOM13",
    min13: "MIN13",
    minmaj13: "MIN_MAJ13",
    dom13b5: "DOM13_FLAT5",
    "dom13#5": "DOM13_SHARP5",
    dom13b9: "DOM13_FLAT9",
    "dom13#9": "DOM13_SHARP9",
    "dom13#11": "DOM13_SHARP11",
    maj13b5: "MAJ13_FLAT5",
    "maj13#5": "MAJ13_SHARP5",
    maj13b9: "MAJ13_FLAT9",
    "maj13#11": "MAJ13_SHARP11",
  };

  return `${mapping[chordKey] || chordKey.toUpperCase()}_CHORD_META.ts`;
}

// 生成单个和弦的元数据
function generateChordData(chordConfig: ChordConfig) {
  const { intervalList, notesNum, semitoneClockPositionList } = chordConfig;

  return range(12).map((rootPianoKeyId) => {
    // 构建 pianoKeyIds: 从 rootPianoKeyId 开始，依次加上 semitonesList
    const pianoKeyIds = [rootPianoKeyId];
    for (const semitone of semitoneClockPositionList) {
      pianoKeyIds.push((rootPianoKeyId + semitone) % 12);
    }
    const pianoKeyIdsSorted = [...pianoKeyIds].sort((a, b) => a - b);

    // 构建 pianoKeyIdToInterval 和 intervalToPianoKeyId
    const pianoKeyIdToInterval: Record<
      number,
      { intervalType: string; intervalNum: number }
    > = {};
    const intervalToPianoKeyId: Record<
      number,
      { intervalType: string; pianoKeyId: number }
    > = {};

    let intervalIndex = 0;
    for (const [quality, num] of intervalList) {
      const targetKeyId = pianoKeyIds[intervalIndex + 1];
      pianoKeyIdToInterval[targetKeyId] = {
        intervalType: quality,
        intervalNum: num,
      };
      intervalToPianoKeyId[num] = {
        intervalType: quality,
        pianoKeyId: targetKeyId,
      };
      intervalIndex++;
    }

    // 生成 notes 数组：包含从 C 到 B 的所有根音变化
    const notes: Array<{
      rootNoteStep: string;
      rootNoteAlter: number;
      isRootNoteNormal: boolean;
      isValid: boolean;
      notesMap: Record<
        number,
        { step: string; alter: number; octaveGapToRoot: number }
      >;
    }> = [];

    // 遍历所有可能的根音变化 (alter 绝对值 ≤ 1，包含 C-B 自然音、C#-G# 升号音、Cb-Bb 降号音)
    const rootPianoKey = PianoKey.fromPitchInt(rootPianoKeyId + 48);
    const allRootNotes = rootPianoKey.getNotes({ alterAbsLte: 1 });

    for (const rootNote of allRootNotes) {
      let isValid = true;
      let notesMap: Record<
        number,
        { step: string; alter: number; octaveGapToRoot: number }
      > = {};

      try {
        // 遍历 intervalList 生成其他音（不含根音）
        let intervalIndex = 0;
        for (const [quality, num] of intervalList) {
          const targetKeyId = pianoKeyIds[intervalIndex + 1];

          // 获取目标键位对应的音符（根据当前根音的 step 来计算）
          // 使用 Interval 从根音计算目标音
          const interval = new (Interval as any)(
            quality as T_IntervalType,
            num
          );
          const targetNote = rootNote.getNoteByInterval(interval);

          // 计算 octaveGapToRoot：基于 stepId 判断是否跨逻辑八度
          // 如果目标音的 stepId 小于根音的 stepId，说明跨八度了
          let octaveGapToRoot = 0;
          const expectedStepId = (rootNote.stepId + (num - 1)) % 7;
          if (targetNote.stepId < rootNote.stepId) {
            octaveGapToRoot = 1;
          } else if (targetNote.stepId < expectedStepId && num > 1) {
            // 检查是否需要跨八度来达到正确的音级关系
            const rootStepId = rootNote.stepId;
            const targetStepId = targetNote.stepId;

            // 从根音到目标音的音级距离
            const stepDistance = num - 1;
            // 如果直接距离为负或太小，说明需要跨八度
            const directDistance = targetStepId - rootStepId;
            if (directDistance <= 0 && stepDistance > directDistance + 6) {
              octaveGapToRoot = 1;
            }
          }

          notesMap[targetKeyId] = {
            step: targetNote.step,
            alter: targetNote.alter,
            octaveGapToRoot,
          };

          intervalIndex++;
        }
      } catch (e) {
        isValid = false;
        notesMap = {};
      }

      notes.push({
        rootNoteStep: rootNote.step,
        rootNoteAlter: rootNote.alter,
        isRootNoteNormal: rootNote.isNormal,
        isValid,
        ...(isValid && { notesMap }),
      });
    }

    return {
      pianoKeyIdRoot: rootPianoKeyId,
      chordFormulaId: chordConfig.chordKey,
      pianoKeyIds,
      pianoKeyIdsSorted,
      notesNum,
      pianoKeyIdToInterval,
      intervalToPianoKeyId,
      notes,
    };
  });
}

// 将对象转换为字符串
function objectToString(obj: any, indent = 2, chordIdKey: string): string {
  const spaces = " ".repeat(indent);
  const nextIndent = indent + 2;
  const nextSpaces = " ".repeat(nextIndent);

  if (isArray(obj)) {
    if (obj.length === 0) return "[]";
    if (obj.every((item) => isNumber(item))) {
      return `[${obj.join(", ")}]`;
    }
    if (obj.every((item) => isObject(item) && isSimpleObject(item))) {
      const items = obj.map((item) => simpleObjectToString(item));
      return `[${items.join(", ")}]`;
    }
    const items = obj.map((item) =>
      objectToString(item, nextIndent, chordIdKey)
    );
    return `[\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}]`;
  }

  if (isObject(obj) && !isNil(obj)) {
    if (isNotesArray(obj)) {
      return notesArrayToString(obj);
    }
    if (isIntervalToPianoKeyIdMap(obj)) {
      return intervalToPianoKeyIdMapToString(obj);
    }
    if (isNumericKeyIntervalMap(obj)) {
      return numericKeyIntervalMapToString(obj);
    }
    if (isNumericKeyPrimitiveMap(obj)) {
      return numericKeyMapToString(obj);
    }
    if (isSimpleObject(obj)) {
      return simpleObjectToString(obj);
    }
    const entries = toPairs(obj);
    if (entries.length === 0) return "{}";
    const items = entries.map(([key, value]) => {
      if (key === "chordFormulaId") {
        // 如果键名包含特殊字符（如 #），使用方括号语法
        // 否则可以使用点语法
        const needsBracketSyntax = /[^a-zA-Z0-9_$]/.test(chordIdKey);
        const accessor = needsBracketSyntax
          ? `["${chordIdKey}"]`
          : `.${chordIdKey}`;
        return `${key}: CHORD_FORMULA_ID${accessor}`;
      }
      return `${key}: ${objectToString(value, nextIndent, chordIdKey)}`;
    });
    return `{\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}}`;
  }

  if (isString(obj)) return `'${obj}'`;
  if (isNumber(obj)) return String(obj);
  return String(obj);
}

function isSimpleObject(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const values = values(obj);
  return values.every(
    (v) => isString(v) || isNumber(v) || isBoolean(v) || isNil(v)
  );
}

function isNumericKeyPrimitiveMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const entries = toPairs(obj);
  if (entries.length === 0) return false;
  return entries.every(
    ([key, value]) => /^\d+$/.test(key) && (isNumber(value) || isNil(value))
  );
}

// 检查是否是 pianoKeyIdToInterval 对象（值为 { intervalType, intervalNum }，没有 null）
function isNumericKeyIntervalMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const entries = toPairs(obj);
  if (entries.length === 0) return true; // 空对象也有效
  return entries.every(([key, value]) => {
    if (!/^\d+$/.test(key)) return false;
    if (isObject(value) && !isNil(value)) {
      const keys = keys(value);
      return (
        keys.length === 2 && "intervalType" in value && "intervalNum" in value
      );
    }
    return false;
  });
}

// 检查是否是 intervalToPianoKeyId 对象（值为 { intervalType, pianoKeyId }）
function isIntervalToPianoKeyIdMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const entries = toPairs(obj);
  if (entries.length === 0) return true; // 空对象也有效
  return entries.every(([key, value]) => {
    if (!/^\d+$/.test(key)) return false;
    if (isObject(value) && !isNil(value)) {
      const keys = keys(value);
      return (
        keys.length === 2 && "intervalType" in value && "pianoKeyId" in value
      );
    }
    return false;
  });
}

function numericKeyMapToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => `${k}: ${v}`);
  return `{ ${entries.join(", ")} }`;
}

// 将 pianoKeyIdToInterval 转换为字符串（只包含有值的键）
function numericKeyIntervalMapToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => {
    return `${k}: { intervalType: '${v.intervalType}', intervalNum: ${v.intervalNum} }`;
  });
  return `{ ${entries.join(", ")} }`;
}

// 将 intervalToPianoKeyId 转换为字符串
function intervalToPianoKeyIdMapToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => {
    return `${k}: { intervalType: '${v.intervalType}', pianoKeyId: ${v.pianoKeyId} }`;
  });
  return `{ ${entries.join(", ")} }`;
}

// 检查是否是 notes 数组
function isNotesArray(obj: any): boolean {
  if (!isArray(obj) || obj.length !== 1) return false;
  const item = obj[0];
  if (!isObject(item) || isNil(item)) return false;
  const keys = keys(item);
  const hasBasicFields =
    "rootNoteStep" in item &&
    "rootNoteAlter" in item &&
    "isRootNoteNormal" in item &&
    "isValid" in item;
  // 3个字段时(isValid=false) 或 4个字段时(isValid=true且有notesMap)
  return hasBasicFields && (keys.length === 4 || keys.length === 3);
}

// 将 notes 数组转换为字符串
function notesArrayToString(obj: any): string {
  const item = obj[0];
  const { rootNoteStep, rootNoteAlter, isRootNoteNormal, isValid, notesMap } =
    item;

  if (!isValid) {
    return `[{ rootNoteStep: '${rootNoteStep}', rootNoteAlter: ${rootNoteAlter}, isRootNoteNormal: ${isRootNoteNormal}, isValid: ${isValid} }]`;
  }

  // 格式化 notesMap
  const notesMapEntries = toPairs(notesMap).map(
    ([degree, note]: [string, any]) => {
      return `${degree}: { step: '${note.step}', alter: ${note.alter}, octaveGapToRoot: ${note.octaveGapToRoot} }`;
    }
  );
  const notesMapStr = `{ ${notesMapEntries.join(", ")} }`;

  return `[{ rootNoteStep: '${rootNoteStep}', rootNoteAlter: ${rootNoteAlter}, isRootNoteNormal: ${isRootNoteNormal}, isValid: ${isValid}, notesMap: ${notesMapStr} }]`;
}

function simpleObjectToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => {
    if (isString(v)) return `${k}: '${v}'`;
    if (isNil(v)) return `${k}: null`;
    return `${k}: ${v}`;
  });
  return `{ ${entries.join(", ")} }`;
}

// 生成单个文件
function generateFile(
  familyName: string,
  chordConfig: ChordConfig,
  outputBaseDir: string
) {
  const familyDir = join(outputBaseDir, familyName);
  if (!existsSync(familyDir)) {
    mkdirSync(familyDir, { recursive: true });
  }

  const outputPath = join(familyDir, chordConfig.outputFileName);

  if (existsSync(outputPath)) {
    console.log(`  跳过 (已存在): ${chordConfig.outputFileName}`);
    return false;
  }

  const data = generateChordData(chordConfig);
  const content = `import CHORD_FORMULA_ID from "../../../../ChordFormula/static/CHORD_FORMULA_ID.ts"

// 由 generateChordMeta.ts 自动生成
export default ${objectToString(data, 0, chordConfig.chordIdKey)}
`;

  writeFileSync(outputPath, content);
  console.log(`  已生成: ${chordConfig.outputFileName}`);
  return true;
}

// 主逻辑
const OUTPUT_BASE_DIR = join(
  process.cwd(),
  "src/Chord/static/CHORD_FORMULA_META"
);
const args = process.argv.slice(2);

const FAMILIES = buildFamilies();

if (args.length === 0) {
  console.log("用法:");
  console.log(
    "  npx tsx src/Chord/__helper__/generateChordMeta.ts --all       # 生成所有"
  );
  console.log(
    "  npx tsx src/Chord/__helper__/generateChordMeta.ts --family <家族名>  # 生成单个家族"
  );
  console.log("");
  console.log("可用家族:");
  FAMILIES.forEach((f) => console.log(`  - ${f.familyName}`));
  process.exit(0);
}

if (args[0] === "--all") {
  console.log("生成所有和弦元数据...\n");
  let total = 0;
  let generated = 0;

  for (const family of FAMILIES) {
    console.log(`\n[${family.familyName}]`);
    for (const chord of family.chords) {
      total++;
      if (generateFile(family.familyName, chord, OUTPUT_BASE_DIR)) {
        generated++;
      }
    }
  }

  console.log(`\n完成！生成 ${generated}/${total} 个文件`);
} else if (args[0] === "--family" && args[1]) {
  const familyName = args[1];
  const family = FAMILIES.find((f) => f.familyName === familyName);

  if (!family) {
    console.error(`找不到家族: ${familyName}`);
    console.log("可用家族:", FAMILIES.map((f) => f.familyName).join(", "));
    process.exit(1);
  }

  console.log(`生成家族 [${familyName}] 的所有和弦...`);
  for (const chord of family.chords) {
    generateFile(family.familyName, chord, OUTPUT_BASE_DIR);
  }
} else {
  console.error("未知参数，使用 --help 查看可用选项");
  process.exit(1);
}
