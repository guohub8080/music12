import { isBoolean, isNil, isNumber, isString } from 'es-toolkit'
import { isArray, isObject, keys, toPairs, values } from 'es-toolkit/compat'
import { isDefined } from "@common/utils/isDefined"
import { writeFileSync, existsSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP";
import CHORD_FORMULA_ID from "@chord-formula/static/CHORD_FORMULA_ID";
import type { I_ChordFormulaMeta } from "@chord-formula/static/types";
import { Note } from "@note";
import { Interval } from "@interval";
import { getNoteByPianoKeyId } from "@note";
import type {
  T_NoteStep,
  T_AlterValue,
} from "@common/static/NOTE_TYPES";

/**
 * 和弦实例元数据生成器
 *
 * 从 CHORD_FORMULA_META_MAP 读取和弦公式数据，生成所有根音上的和弦实例元数据。
 *
 * 运行方式：
 * - 生成所有：npx tsx src/Chord/__helper__/generateChordInstanceMeta.ts
 * - 清空并重新生成：npx tsx src/Chord/__helper__/generateChordInstanceMeta.ts --clean
 */

// ==================== 类型定义 ====================

/** 音程序列（音程类型 + 度数） */
type I_Interval = [string, number];

/** 音符信息 */
type I_NoteMeta = {
  step: string;
  alter: number;
  octaveGapToRoot: number;
};

/** 根音变体信息 */
type I_RootVariantMeta = {
  rootNoteStep: string;
  rootNoteAlter: number;
  isRootNoteNormal: boolean;
  isValid: boolean;
  notesMap: Record<number, I_NoteMeta>;
};

/** 和弦实例元数据 */
type I_ChordInstanceMeta = {
  pianoKeyIdRoot: number;
  chordFormulaId: string;
  pianoKeyIds: number[];
  pianoKeyIdsSorted: number[];
  notesNum: number;
  pianoKeyIdToInterval: Record<
    number,
    { intervalType: string; intervalNum: number }
  >;
  intervalToPianoKeyId: Record<
    number,
    { intervalType: string; pianoKeyId: number }
  >;
  notes: I_RootVariantMeta[];
};

// ==================== 核心生成逻辑 ====================

/**
 * 为单个和弦公式生成所有根音上的实例数据
 *
 * 使用 Note.getNoteByInterval() 方法正确计算各音程对应的音符
 */
function generateChordInstances(
  formulaMeta: I_ChordFormulaMeta
): I_ChordInstanceMeta[] {
  const instances: I_ChordInstanceMeta[] = [];

  // 为每个钢琴键位置 (0-11) 生成和弦实例
  for (let rootPianoKeyId = 0; rootPianoKeyId < 12; rootPianoKeyId++) {
    // 1. 获取该钢琴键位置对应的 isNormal 根音
    // 例如：pianoKeyId 1 对应 C# (isNormal: true) 和 Db (isNormal: false)
    const rootNotes = getNoteByPianoKeyId(rootPianoKeyId, { octave: 4 }).filter(
      (n) => n.isNormal
    );

    if (rootNotes.length === 0) continue;

    // 使用第一个 isNormal 根音
    const rootNote = rootNotes[0];

    // 2. 根据音程列表计算各音符
    const pianoKeyIds: number[] = [rootPianoKeyId];
    const pianoKeyIdToInterval: Record<
      number,
      { intervalType: string; intervalNum: number }
    > = {};
    const intervalToPianoKeyId: Record<
      number,
      { intervalType: string; pianoKeyId: number }
    > = {};

    // 根音映射
    pianoKeyIdToInterval[rootPianoKeyId] = {
      intervalType: "p",
      intervalNum: 1,
    };
    intervalToPianoKeyId[1] = { intervalType: "p", pianoKeyId: rootPianoKeyId };

    // 计算各音程对应的音符
    for (const [intervalType, degree] of formulaMeta.intervalList) {
      const interval = new Interval(intervalType as any, degree);
      const targetNote = rootNote.getNoteByInterval(interval);

      const targetKeyId = targetNote.pianoKeyId;
      pianoKeyIds.push(targetKeyId);
      pianoKeyIdToInterval[targetKeyId] = { intervalType, intervalNum: degree };
      intervalToPianoKeyId[degree] = { intervalType, pianoKeyId: targetKeyId };
    }

    // 3. 生成音符详情
    const notes: I_RootVariantMeta[] = generateNotesMeta(
      rootNote,
      pianoKeyIdToInterval,
      formulaMeta.intervalList
    );

    instances.push({
      pianoKeyIdRoot: rootPianoKeyId,
      chordFormulaId: formulaMeta.chordFormulaId,
      pianoKeyIds,
      pianoKeyIdsSorted: [...pianoKeyIds].sort((a, b) => a - b),
      notesNum: formulaMeta.notesNum,
      pianoKeyIdToInterval,
      intervalToPianoKeyId,
      notes,
    });
  }

  return instances;
}

/**
 * 生成音符详情
 *
 * @param rootNote - 根音 Note 对象
 * @param pianoKeyIdToInterval - pianoKeyId 到音程的映射
 * @param intervalList - 音程序列
 */
function generateNotesMeta(
  rootNote: Note,
  pianoKeyIdToInterval: Record<
    number,
    { intervalType: string; intervalNum: number }
  >,
  intervalList: I_Interval[]
): I_RootVariantMeta[] {
  const notes: I_RootVariantMeta[] = [];
  const rootPianoKeyId = rootNote.pianoKeyId;

  // 只获取 isNormal 为 true 的根音变体，避免计算非常用的等音异名导致错误
  const rootVariants = [rootNote];

  // 对于黑键，添加降号变体（如果 isNormal）
  if (rootNote.isBlack) {
    const samePitchNotes = rootNote.getSamePitchNotes({ isSelfIncluded: true, alterAbsLte: 1 });
    for (const altRoot of samePitchNotes) {
      if (altRoot.isNormal && altRoot.step !== rootNote.step) {
        rootVariants.push(altRoot);
        break; // 只添加一个降号变体
      }
    }
  }

  for (const rootVariant of rootVariants) {
    const notesMap: Record<number, I_NoteMeta> = {};

    for (const [intervalType, degree] of intervalList) {
      // 使用根音变体计算该音程的目标音符
      const interval = new Interval(intervalType as any, degree);
      const targetNote = rootVariant.getNoteByInterval(interval);

      // 计算八度差（目标音符相对于根音）
      const octaveGapToRoot = targetNote.octave - rootVariant.octave;

      notesMap[targetNote.pianoKeyId] = {
        step: targetNote.step,
        alter: targetNote.alter,
        octaveGapToRoot,
      };
    }

    notes.push({
      rootNoteStep: rootVariant.step,
      rootNoteAlter: rootVariant.alter,
      isRootNoteNormal: rootVariant.isNormal,
      isValid: true,
      notesMap,
    });
  }

  return notes;
}

// ==================== 文件生成 ====================

/**
 * 将对象转换为字符串
 */
function objectToString(obj: any, indent = 2): string {
  const spaces = " ".repeat(indent);
  const nextIndent = indent + 2;
  const nextSpaces = " ".repeat(nextIndent);

  if (isArray(obj)) {
    if (obj.length === 0) return "[]";
    if (obj.every((item) => isNumber(item))) {
      return `[${obj.join(", ")}]`;
    }
    if (obj.every((item) => isObject(item) && isSimpleObject(item))) {
      const items = obj.map((item: any) => simpleObjectToString(item));
      return `[${items.join(", ")}]`;
    }
    const items = obj.map((item: any) => objectToString(item, nextIndent));
    return `[\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}]`;
  }

  if (isObject(obj) && isDefined(obj)) {
    if (isNumericKeyIntervalMap(obj)) {
      return numericKeyIntervalMapToString(obj);
    }
    if (isNumericKeyPianoKeyMap(obj)) {
      return numericKeyPianoKeyMapToString(obj);
    }
    if (isNotesMap(obj)) {
      return notesMapToString(obj);
    }
    if (isSimpleObject(obj)) {
      return simpleObjectToString(obj);
    }
    const entries = toPairs(obj);
    if (entries.length === 0) return "{}";
    const items = entries.map(([key, value]) => {
      // 处理 chordFormulaId
      if (key === "chordFormulaId") {
        return `${key}: CHORD_FORMULA_ID[${JSON.stringify((obj as { chordFormulaId?: unknown }).chordFormulaId)}]`;
      }
      return `${key}: ${objectToString(value, nextIndent)}`;
    });
    return `{\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}}`;
  }

  if (isString(obj)) return `'${obj}'`;
  if (isNumber(obj)) return String(obj);
  if (isBoolean(obj)) return String(obj);
  return String(obj);
}

function isSimpleObject(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const objValues = values(obj);
  return objValues.every(
    (v) => isString(v) || isNumber(v) || isBoolean(v) || isNil(v)
  );
}

function simpleObjectToString(obj: any): string {
  const entries = toPairs(obj);
  if (entries.length === 0) return "{}";
  const items = entries.map(([key, value]) => {
    if (isString(value)) return `${key}: '${value}'`;
    if (isNumber(value)) return `${key}: ${value}`;
    if (isBoolean(value)) return `${key}: ${value}`;
    return `${key}: ${value}`;
  });
  return `{ ${items.join(", ")} }`;
}

function isNumericKeyIntervalMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const objKeys = keys(obj);
  if (keys.length === 0) return false;
  // 检查键是否是数字字符串
  const hasNumericKeys = objKeys.every((k) => /^\d+$/.test(k));
  if (!hasNumericKeys) return false;
  // 检查值是否有 intervalType 和 intervalNum
  const objValues = values(obj);
  return objValues.every(
    (v: any) => v && isObject(v) && "intervalType" in v && "intervalNum" in v
  );
}

function numericKeyIntervalMapToString(obj: any): string {
  const entries = toPairs(obj).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  if (entries.length === 0) return "{}";
  const items = entries.map(([key, value]) => {
    return `${key}: ${simpleObjectToString(value)}`;
  });
  return `{ ${items.join(", ")} }`;
}

function isNumericKeyPianoKeyMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const objKeys = keys(obj);
  if (keys.length === 0) return false;
  const hasNumericKeys = objKeys.every((k) => /^\d+$/.test(k));
  if (!hasNumericKeys) return false;
  const objValues = values(obj);
  return objValues.every(
    (v: any) => v && isObject(v) && "intervalType" in v && "pianoKeyId" in v
  );
}

function numericKeyPianoKeyMapToString(obj: any): string {
  const entries = toPairs(obj).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  if (entries.length === 0) return "{}";
  const items = entries.map(([key, value]) => {
    return `${key}: ${simpleObjectToString(value)}`;
  });
  return `{ ${items.join(", ")} }`;
}

function isNotesMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false;
  const objValues = values(obj);
  return objValues.every(
    (v: any) =>
      v && isObject(v) && "step" in v && "alter" in v && "octaveGapToRoot" in v
  );
}

function notesMapToString(obj: any): string {
  const entries = toPairs(obj).sort(
    (a, b) => Number(a[0]) - Number(b[0])
  );
  if (entries.length === 0) return "{}";
  const items = entries.map(([key, value]) => {
    return `${key}: ${simpleObjectToString(value)}`;
  });
  return `{ ${items.join(", ")} }`;
}

/**
 * 家族名到文件夹的映射
 */
function getOutputFolder(family: string): string {
  const folderMap: Record<string, string> = {
    chord3: "CHORD3_META",
    chord3_ex: "CHORD3_EX_META",
    chord7: "CHORD7_META",
    chord7add: "CHORD7_EX_META",
    chord7Add: "CHORD7_EX_META",
    chord9: "CHORD9_META",
    chord11: "CHORD11_META",
    chord13: "CHORD13_META",
    chordSus: "CHORD_SUS_META",
    dom7alter: "DOM7_ALTER_META",
    maj7alter: "MAJ7_ALTER_META",
    min7alter: "MIN7_ALTER_META",
    dom9alter: "DOM9_ALTER_META",
    maj9alter: "MAJ9_ALTER_META",
    min9alter: "MIN9_ALTER_META",
    dom11alter: "DOM11_ALTER_META",
    min11alter: "MIN11_ALTER_META",
    dom13alter: "DOM13_ALTER_META",
    maj13alter: "MAJ13_ALTER_META",
  };
  return folderMap[family] || family.toUpperCase() + "_META";
}

/**
 * 文件名转换
 */
function getFileName(chordFormulaId: string): string {
  // 将 chordFormulaId 转换为大写文件名
  // 例如：maj3 → MAJ3_CHORD_META.ts, dom7#5 → DOM7_SHARP5_CHORD_META.ts
  let name = chordFormulaId.toUpperCase();
  // 替换特殊字符
  name = name.replace(/#/g, "_SHARP");
  name = name.replace(/B/g, "_FLAT"); // 小写 b 表示降号
  return name + "_CHORD_META.ts";
}

/**
 * 生成单个和弦的元数据文件
 */
function generateSingleChordFile(
  formulaMeta: I_ChordFormulaMeta,
  outputDir: string
): void {
  const instances = generateChordInstances(formulaMeta);
  const fileName = getFileName(formulaMeta.chordFormulaId);
  const outputPath = join(outputDir, fileName);

  const content = `import CHORD_FORMULA_ID from "@chord-formula/static/CHORD_FORMULA_ID"
import type { I_ChordInstanceMeta } from "@chord/static/types";

// 由 generateChordInstanceMeta.ts 自动生成
// 显式类型注解避免 TS 对字面量数组做联合推断（触发 TS2590）
const CHORD_META: I_ChordInstanceMeta[] = ${objectToString(instances, 0)}

export default CHORD_META;
`;

  writeFileSync(outputPath, content, "utf-8");
}

/**
 * 主函数
 */
function main() {
  const OUTPUT_BASE_DIR = join(
    process.cwd(),
    "src/Chord/static/CHORD_INSTANCE_META"
  );
  const args = process.argv.slice(2);
  const shouldClean = args.includes("--clean");

  // 清空并重新创建输出目录
  if (shouldClean && existsSync(OUTPUT_BASE_DIR)) {
    rmSync(OUTPUT_BASE_DIR, { recursive: true, force: true });
  }

  if (!existsSync(OUTPUT_BASE_DIR)) {
    mkdirSync(OUTPUT_BASE_DIR, { recursive: true });
  }

  // 按家族分组
  const families: Record<string, I_ChordFormulaMeta[]> = {};

  for (const meta of values(CHORD_FORMULA_META_MAP)) {
    const folder = getOutputFolder(meta.family);
    if (isNil(families[folder])) {
      families[folder] = [];
    }
    families[folder].push(meta);
  }

  // 为每个家族创建文件夹并生成文件
  let totalGenerated = 0;
  for (const [folder, metas] of toPairs(families)) {
    const familyDir = join(OUTPUT_BASE_DIR, folder);
    if (!existsSync(familyDir)) {
      mkdirSync(familyDir, { recursive: true });
    }

    for (const meta of metas) {
      generateSingleChordFile(meta, familyDir);
      totalGenerated++;
      console.log(`✓ 已生成: ${folder}/${getFileName(meta.chordFormulaId)}`);
    }
  }

  console.log(`\n完成！共生成 ${totalGenerated} 个文件`);
  console.log(`输出目录: ${OUTPUT_BASE_DIR}`);
}

main();
