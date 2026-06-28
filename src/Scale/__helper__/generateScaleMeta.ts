import { isDefined } from "@common/utils/isDefined"
import range from "lodash/range"
import isNil from "lodash/isNil"
import isArray from "lodash/isArray"
import isObject from "lodash/isObject"
import isString from "lodash/isString"
import isNumber from "lodash/isNumber"
import isBoolean from "lodash/isBoolean"
import toPairs from "lodash/toPairs"
import keys from "lodash/keys"
import values from "lodash/values"
import { Scale } from "../cls/ScaleClass"
import { PianoKey } from "@pianokey"
import { Note } from "@note"
import { Interval } from "@interval"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"
import SCALE_MODE_ID from "@scale-mode/static/SCALE_MODE_ID"
import {
  // DIATONIC
  NATURAL_MAJOR_MODE_META,
  DORIAN_MODE_META,
  PHRYGIAN_MODE_META,
  LYDIAN_MODE_META,
  MIXOLYDIAN_MODE_META,
  NATURAL_MINOR_MODE_META,
  LOCRIAN_MODE_META,
} from "@scale-mode/static/FAMILIES/DIATONIC_MODE_META"
import { HARMONIC_MAJOR_MODE_META } from "@scale-mode/static/FAMILIES/HARMONIC_MAJOR_MODE_META"
import { MELODIC_MAJOR_DESCENDING_MODE_META } from "@scale-mode/static/FAMILIES/MELODIC_MAJOR_MODE_META"
import {
  HARMONIC_MINOR_MODE_META,
  LOCRIAN_SHARP6_MODE_META,
  IONIAN_SHARP5_MODE_META,
  DORIAN_SHARP4_MODE_META,
  PHRYGIAN_DOMINANT_MODE_META,
  LYDIAN_SHARP2_MODE_META,
} from "@scale-mode/static/FAMILIES/HARMONIC_MINOR_MODE_META"
import {
  MELODIC_MINOR_ASCENDING_MODE_META,
  DORIAN_FLAT2_MODE_META,
  LYDIAN_AUGMENTED_MODE_META,
  LYDIAN_DOMINANT_MODE_META,
  LOCRIAN_SHARP2_MODE_META,
} from "@scale-mode/static/FAMILIES/MELODIC_MINOR_MODE_META"
import {
  DOUBLE_HARMONIC_MAJOR_MODE_META,
  HUNGARIAN_MINOR_MODE_META,
  ORIENTAL_MODE_META,
  IONIAN_SHARP2_SHARP5_MODE_META,
} from "@scale-mode/static/FAMILIES/DOUBLE_HARMONIC_MODE_META"
import {
  GONG_MODE_META,
  SHANG_MODE_META,
  JUE_MODE_META,
  ZHI_MODE_META,
  YU_MODE_META,
} from "@scale-mode/static/FAMILIES/CHINESE_PENTATONIC_MODE_META"
import {
  YA_YUE_GONG_MODE_META,
  YA_YUE_SHANG_MODE_META,
  YA_YUE_JUE_MODE_META,
  YA_YUE_ZHI_MODE_META,
  YA_YUE_YU_MODE_META,
} from "@scale-mode/static/FAMILIES/CHINESE_YAYUE_MODE_META"
import {
  QING_YUE_GONG_MODE_META,
  QING_YUE_SHANG_MODE_META,
  QING_YUE_JUE_MODE_META,
  QING_YUE_ZHI_MODE_META,
  QING_YUE_YU_MODE_META,
} from "@scale-mode/static/FAMILIES/CHINESE_QINGYUE_MODE_META"
import {
  YAN_YUE_GONG_MODE_META,
  YAN_YUE_SHANG_MODE_META,
  YAN_YUE_JUE_MODE_META,
  YAN_YUE_ZHI_MODE_META,
  YAN_YUE_YU_MODE_META,
} from "@scale-mode/static/FAMILIES/CHINESE_YANYUE_MODE_META"
import { T_IntervalType } from "@common/static/INTERVAL_TYPES"
import { t_scaleMode } from "../static/types"
import type { I_ScaleModeMeta } from "../static/SCALE_MODE_META/types"

/**
 * 音阶元数据生成器
 *
 * 运行方式：
 * - 生成单个调式：npx tsx src/Scale/__helper__/generateScaleMeta.ts <调式ID>
 * - 生成整个家族：npx tsx src/Scale/__helper__/generateScaleMeta.ts --family <家族名>
 * - 生成所有：npx tsx src/Scale/__helper__/generateScaleMeta.ts --all
 *
 * 输出目录结构：
 * SCALE_META/
 * ├── DIATONIC_MODE_META/
 * │   ├── NATURAL_MAJOR_SCALE_META.ts
 * │   ├── DORIAN_SCALE_META.ts
 * │   └── ...
 * └── CHINESE_PENTATONIC_MODE_META/
 *     ├── GONG_SCALE_META.ts
 *     └── ...
 */

// 定义家族与调式的映射关系
interface ModeConfig {
  modeMeta: I_ScaleModeMeta
  outputFileName: string  // 如 NATURAL_MAJOR_SCALE_META.ts
  modeIdKey: string       // 如 NaturalMajor
}

interface FamilyConfig {
  familyName: string      // 如 DIATONIC_MODE_META
  modes: ModeConfig[]
}

const FAMILIES: FamilyConfig[] = [
  {
    familyName: "DIATONIC_MODE_META",
    modes: [
      { modeMeta: NATURAL_MAJOR_MODE_META, outputFileName: "NATURAL_MAJOR_SCALE_META.ts", modeIdKey: "NaturalMajor" },
      { modeMeta: DORIAN_MODE_META, outputFileName: "DORIAN_SCALE_META.ts", modeIdKey: "Dorian" },
      { modeMeta: PHRYGIAN_MODE_META, outputFileName: "PHRYGIAN_SCALE_META.ts", modeIdKey: "Phrygian" },
      { modeMeta: LYDIAN_MODE_META, outputFileName: "LYDIAN_SCALE_META.ts", modeIdKey: "Lydian" },
      { modeMeta: MIXOLYDIAN_MODE_META, outputFileName: "MIXOLYDIAN_SCALE_META.ts", modeIdKey: "Mixolydian" },
      { modeMeta: NATURAL_MINOR_MODE_META, outputFileName: "NATURAL_MINOR_SCALE_META.ts", modeIdKey: "NaturalMinor" },
      { modeMeta: LOCRIAN_MODE_META, outputFileName: "LOCRIAN_SCALE_META.ts", modeIdKey: "Locrian" },
    ]
  },
  {
    familyName: "HARMONIC_MAJOR_MODE_META",
    modes: [
      { modeMeta: HARMONIC_MAJOR_MODE_META, outputFileName: "HARMONIC_MAJOR_SCALE_META.ts", modeIdKey: "HarmonicMajor" },
    ]
  },
  {
    familyName: "MELODIC_MAJOR_MODE_META",
    modes: [
      { modeMeta: MELODIC_MAJOR_DESCENDING_MODE_META, outputFileName: "MELODIC_MAJOR_DESCENDING_SCALE_META.ts", modeIdKey: "MelodicMajorDescending" },
    ]
  },
  {
    familyName: "HARMONIC_MINOR_MODE_META",
    modes: [
      { modeMeta: HARMONIC_MINOR_MODE_META, outputFileName: "HARMONIC_MINOR_SCALE_META.ts", modeIdKey: "HarmonicMinor" },
      { modeMeta: LOCRIAN_SHARP6_MODE_META, outputFileName: "LOCRIAN_SHARP6_SCALE_META.ts", modeIdKey: "LocrianSharp6" },
      { modeMeta: IONIAN_SHARP5_MODE_META, outputFileName: "IONIAN_SHARP5_SCALE_META.ts", modeIdKey: "IonianSharp5" },
      { modeMeta: DORIAN_SHARP4_MODE_META, outputFileName: "DORIAN_SHARP4_SCALE_META.ts", modeIdKey: "DorianSharp4" },
      { modeMeta: PHRYGIAN_DOMINANT_MODE_META, outputFileName: "PHRYGIAN_DOMINANT_SCALE_META.ts", modeIdKey: "PhrygianDominant" },
      { modeMeta: LYDIAN_SHARP2_MODE_META, outputFileName: "LYDIAN_SHARP2_SCALE_META.ts", modeIdKey: "LydianSharp2" },
    ]
  },
  {
    familyName: "MELODIC_MINOR_MODE_META",
    modes: [
      { modeMeta: MELODIC_MINOR_ASCENDING_MODE_META, outputFileName: "MELODIC_MINOR_ASCENDING_SCALE_META.ts", modeIdKey: "MelodicMinorAscending" },
      { modeMeta: DORIAN_FLAT2_MODE_META, outputFileName: "DORIAN_FLAT2_SCALE_META.ts", modeIdKey: "DorianFlat2" },
      { modeMeta: LYDIAN_AUGMENTED_MODE_META, outputFileName: "LYDIAN_AUGMENTED_SCALE_META.ts", modeIdKey: "LydianAugmented" },
      { modeMeta: LYDIAN_DOMINANT_MODE_META, outputFileName: "LYDIAN_DOMINANT_SCALE_META.ts", modeIdKey: "LydianDominant" },
      { modeMeta: LOCRIAN_SHARP2_MODE_META, outputFileName: "LOCRIAN_SHARP2_SCALE_META.ts", modeIdKey: "LocrianSharp2" },
    ]
  },
  {
    familyName: "DOUBLE_HARMONIC_MODE_META",
    modes: [
      { modeMeta: DOUBLE_HARMONIC_MAJOR_MODE_META, outputFileName: "DOUBLE_HARMONIC_MAJOR_SCALE_META.ts", modeIdKey: "DoubleHarmonicMajor" },
      { modeMeta: HUNGARIAN_MINOR_MODE_META, outputFileName: "HUNGARIAN_MINOR_SCALE_META.ts", modeIdKey: "HungarianMinor" },
      { modeMeta: ORIENTAL_MODE_META, outputFileName: "ORIENTAL_SCALE_META.ts", modeIdKey: "Oriental" },
      { modeMeta: IONIAN_SHARP2_SHARP5_MODE_META, outputFileName: "IONIAN_SHARP2_SHARP5_SCALE_META.ts", modeIdKey: "IonianSharp2Sharp5" },
    ]
  },
  {
    familyName: "CHINESE_PENTATONIC_MODE_META",
    modes: [
      { modeMeta: GONG_MODE_META, outputFileName: "GONG_SCALE_META.ts", modeIdKey: "Gong" },
      { modeMeta: SHANG_MODE_META, outputFileName: "SHANG_SCALE_META.ts", modeIdKey: "Shang" },
      { modeMeta: JUE_MODE_META, outputFileName: "JUE_SCALE_META.ts", modeIdKey: "Jue" },
      { modeMeta: ZHI_MODE_META, outputFileName: "ZHI_SCALE_META.ts", modeIdKey: "Zhi" },
      { modeMeta: YU_MODE_META, outputFileName: "YU_SCALE_META.ts", modeIdKey: "Yu" },
    ]
  },
  {
    familyName: "CHINESE_YAYUE_MODE_META",
    modes: [
      { modeMeta: YA_YUE_GONG_MODE_META, outputFileName: "YA_YUE_GONG_SCALE_META.ts", modeIdKey: "YaYueGong" },
      { modeMeta: YA_YUE_SHANG_MODE_META, outputFileName: "YA_YUE_SHANG_SCALE_META.ts", modeIdKey: "YaYueShang" },
      { modeMeta: YA_YUE_JUE_MODE_META, outputFileName: "YA_YUE_JUE_SCALE_META.ts", modeIdKey: "YaYueJue" },
      { modeMeta: YA_YUE_ZHI_MODE_META, outputFileName: "YA_YUE_ZHI_SCALE_META.ts", modeIdKey: "YaYueZhi" },
      { modeMeta: YA_YUE_YU_MODE_META, outputFileName: "YA_YUE_YU_SCALE_META.ts", modeIdKey: "YaYueYu" },
    ]
  },
  {
    familyName: "CHINESE_QINGYUE_MODE_META",
    modes: [
      { modeMeta: QING_YUE_GONG_MODE_META, outputFileName: "QING_YUE_GONG_SCALE_META.ts", modeIdKey: "QingYueGong" },
      { modeMeta: QING_YUE_SHANG_MODE_META, outputFileName: "QING_YUE_SHANG_SCALE_META.ts", modeIdKey: "QingYueShang" },
      { modeMeta: QING_YUE_JUE_MODE_META, outputFileName: "QING_YUE_JUE_SCALE_META.ts", modeIdKey: "QingYueJue" },
      { modeMeta: QING_YUE_ZHI_MODE_META, outputFileName: "QING_YUE_ZHI_SCALE_META.ts", modeIdKey: "QingYueZhi" },
      { modeMeta: QING_YUE_YU_MODE_META, outputFileName: "QING_YUE_YU_SCALE_META.ts", modeIdKey: "QingYueYu" },
    ]
  },
  {
    familyName: "CHINESE_YANYUE_MODE_META",
    modes: [
      { modeMeta: YAN_YUE_GONG_MODE_META, outputFileName: "YAN_YUE_GONG_SCALE_META.ts", modeIdKey: "YanYueGong" },
      { modeMeta: YAN_YUE_SHANG_MODE_META, outputFileName: "YAN_YUE_SHANG_SCALE_META.ts", modeIdKey: "YanYueShang" },
      { modeMeta: YAN_YUE_JUE_MODE_META, outputFileName: "YAN_YUE_JUE_SCALE_META.ts", modeIdKey: "YanYueJue" },
      { modeMeta: YAN_YUE_ZHI_MODE_META, outputFileName: "YAN_YUE_ZHI_SCALE_META.ts", modeIdKey: "YanYueZhi" },
      { modeMeta: YAN_YUE_YU_MODE_META, outputFileName: "YAN_YUE_YU_SCALE_META.ts", modeIdKey: "YanYueYu" },
    ]
  },
]

// 生成单个调式的元数据
function generateModeData(modeMeta: I_ScaleModeMeta, modeIdKey: string) {
  const intervalList = modeMeta.intervalList

  return range(12).map(rootPianoKey => {
    const pianoKey = PianoKey.fromPitchInt(rootPianoKey + 48)
    const notes = pianoKey.getNotes({ isNormal: true, alterAbsLte: 1 })
    const rootNote = notes[0]
    const scale = new Scale(rootNote.pianoKeyId, modeMeta.scaleModeId as t_scaleMode)

    const notesPianoKeyList = scale.pianoKeyIds
    const orderedNotesPianoKeyList = [...notesPianoKeyList].sort((a, b) => a - b)

    // 构建 degreeToPianoKeyId: { 1: rootPianoKeyId, 2: deg2, ..., 7: deg7 }
    // 缺失的级数为 null（如五声调式）
    const degreeToPianoKeyId: Record<number, number | null> = { 1: rootPianoKey }

    // intervalList 索引 0-5 对应 degree 2-7
    // 注意：intervalList 可含 null（五声缺音），notesPianoKeyList 只含实际音，
    // 因此用独立计数器 noteIndex 跟踪，仅在 intervalItem 非 null 时递增。
    let noteIndex = 0 // notesPianoKeyList 的游标（0 = 根音，已填入 degree 1）
    for (let i = 0; i < 6; i++) {
      const degree = i + 2
      const intervalItem = intervalList[i]
      if (isNil(intervalItem)) {
        degreeToPianoKeyId[degree] = null
      } else {
        noteIndex++ // 移到下一个实际音（跳过 null 度数不递增）
        degreeToPianoKeyId[degree] = notesPianoKeyList[noteIndex] ?? null
      }
    }

    // 构建 pianoKeyIdToDegree: { 0: 1, 1: null, 2: 2, ..., 11: 7 }
    // 固定 12 个键，不在音阶中的为 null
    const pianoKeyIdToDegree: Record<number, number | null> = {}
    for (let key = 0; key < 12; key++) {
      pianoKeyIdToDegree[key] = null
    }
    // 填充音阶中的键
    for (const [deg, keyId] of toPairs(degreeToPianoKeyId)) {
      if (isDefined(keyId)) {
        pianoKeyIdToDegree[keyId] = Number(deg)
      }
    }

    const scales = pianoKey.getNotes({ alterAbsLte: 1 }).map(n => {
      const rootNoteSpelling = new Note(n.step, n.alter, 4)
      // notesList 改为 Map 结构，缺失的级数为 null
      const notesMap: Record<number, { step: string, alter: number, octaveOffset: number } | null> = { 1: { step: n.step, alter: n.alter, octaveOffset: 0 } }
      let isValid = true
      let errorMessage: string | undefined

      // intervalList 索引 0-5 对应 degree 2-7
      for (let i = 0; i < intervalList.length; i++) {
        const degree = i + 2
        const intervalItem = intervalList[i]

        if (isNil(intervalItem)) {
          notesMap[degree] = null
        } else {
          const [quality, num] = intervalItem
          try {
            const interval = new Interval(quality as T_IntervalType, num as number)
            const targetNote = rootNoteSpelling.getNoteByInterval(interval)
            notesMap[degree] = {
              step: targetNote.step,
              alter: targetNote.alter,
              octaveOffset: targetNote.octave - 4
            }
          } catch (e) {
            isValid = false
            errorMessage = e instanceof Error ? e.message : String(e)
            break
          }
        }
      }

      // 计算升降号数量（非 null 且 alter 不为 0）
      let alterNoteCount = n.alter !== 0 ? 1 : 0
      let alterSum = n.alter
      for (const key of keys(notesMap)) {
        const note = notesMap[Number(key)]
        if (isDefined(note) && note.alter !== 0) {
          alterNoteCount++
          alterSum += note.alter
        }
      }

      // isValid 为 false 时只返回基本字段
      if (!isValid) {
        return {
          tonicStep: n.step,
          tonicAlter: n.alter,
          isTonicNormal: rootNoteSpelling.isNormal,
          isValid: false,
        }
      }

      const isTonicEnharmonic = alterNoteCount === 7

      return {
        tonicStep: n.step,
        tonicAlter: n.alter,
        isTonicNormal: rootNoteSpelling.isNormal,
        isTonicEnharmonic,
        isValid: true,
        alterNoteCount,
        alterSum,
        notesMap,
      }
    })

    return {
      pianoKeyIdRoot: rootPianoKey,
      scaleModeId: modeMeta.scaleModeId,
      pianoKeyIds: notesPianoKeyList,
      pianoKeyIdsSorted: orderedNotesPianoKeyList,
      degreeToPianoKeyId,
      pianoKeyIdToDegree,
      degreeAlterationsMap: scale.scaleMode.degreeAlterationsMap,
      scaleMode: scale.scaleMode,
      scales,
    }
  })
}

// 将对象转换为普通 JS object 字符串
function objectToString(obj: any, indent = 2, modeIdKey: string): string {
  const spaces = ' '.repeat(indent)
  const nextIndent = indent + 2
  const nextSpaces = ' '.repeat(nextIndent)

  if (isArray(obj)) {
    if (obj.length === 0) return '[]'
    if (obj.every(item => isNumber(item))) {
      return `[${obj.join(', ')}]`
    }
    if (obj.every(item => isObject(item) && isSimpleObject(item))) {
      const items = obj.map(item => simpleObjectToString(item))
      return `[${items.join(', ')}]`
    }
    const items = obj.map(item => objectToString(item, nextIndent, modeIdKey))
    return `[\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}]`
  }

  if (isObject(obj) && isDefined(obj)) {
    // 数字键到原始值的映射（如 pianoKeyIdToDegree），单行输出
    if (isNumericKeyPrimitiveMap(obj)) {
      return numericKeyMapToString(obj)
    }
    if (isSimpleObject(obj)) {
      return simpleObjectToString(obj)
    }
    const entries = toPairs(obj)
    if (entries.length === 0) return '{}'
    const items = entries.map(([key, value]) => {
      if (key === 'scaleModeId') {
        return `${key}: SCALE_MODE_ID.${modeIdKey}`
      }
      return `${key}: ${objectToString(value, nextIndent, modeIdKey)}`
    })
    return `{\n${nextSpaces}${items.join(`,\n${nextSpaces}`)}\n${spaces}}`
  }

  if (isString(obj)) return `'${obj}'`
  if (isNumber(obj)) return String(obj)
  return String(obj)
}

function isSimpleObject(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false
  const objValues = values(obj)
  return objValues.every(v => isString(v) || isNumber(v) || isBoolean(v))
}

// 检测是否为数字键到原始值的映射（如 pianoKeyIdToDegree: { 0: 1, 1: null, ... }）
function isNumericKeyPrimitiveMap(obj: any): boolean {
  if (!isObject(obj) || isNil(obj) || isArray(obj)) return false
  const entries = toPairs(obj)
  if (entries.length === 0) return false
  return entries.every(([key, value]) =>
    /^\d+$/.test(key) && (isNumber(value) || isNil(value))
  )
}

// 将数字键到原始值的映射转为单行字符串
function numericKeyMapToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => `${k}: ${v}`)
  return `{ ${entries.join(', ')} }`
}

function simpleObjectToString(obj: any): string {
  const entries = toPairs(obj).map(([k, v]) => {
    if (isString(v)) return `${k}: '${v}'`
    return `${k}: ${v}`
  })
  return `{ ${entries.join(', ')} }`
}

// 生成单个文件
function generateFile(familyName: string, modeConfig: ModeConfig, outputBaseDir: string) {
  const familyDir = join(outputBaseDir, familyName)
  if (!existsSync(familyDir)) {
    mkdirSync(familyDir, { recursive: true })
  }

  const outputPath = join(familyDir, modeConfig.outputFileName)

  if (existsSync(outputPath)) {
    console.log(`  跳过 (已存在): ${modeConfig.outputFileName}`)
    return false
  }

  const data = generateModeData(modeConfig.modeMeta, modeConfig.modeIdKey)
  const content = `import SCALE_MODE_ID from "../../../../ScaleMode/static/SCALE_MODE_ID"

// 由 generateScaleMeta.ts 自动生成
export default ${objectToString(data, 0, modeConfig.modeIdKey)}
`

  writeFileSync(outputPath, content)
  console.log(`  已生成: ${modeConfig.outputFileName}`)
  return true
}

// 主逻辑
const OUTPUT_BASE_DIR = join(process.cwd(), 'src/Scale/static/SCALE_INSTANCE_META')
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('用法:')
  console.log('  npx tsx src/Scale/__helper__/generateScaleMeta.ts <调式ID>     # 生成单个调式')
  console.log('  npx tsx src/Scale/__helper__/generateScaleMeta.ts --family <家族名>  # 生成整个家族')
  console.log('  npx tsx src/Scale/__helper__/generateScaleMeta.ts --all       # 生成所有')
  console.log('')
  console.log('可用家族:')
  FAMILIES.forEach(f => console.log(`  - ${f.familyName}`))
  process.exit(0)
}

if (args[0] === '--all') {
  console.log('生成所有音阶元数据...\n')
  let total = 0
  let generated = 0

  for (const family of FAMILIES) {
    console.log(`\n[${family.familyName}]`)
    for (const mode of family.modes) {
      total++
      if (generateFile(family.familyName, mode, OUTPUT_BASE_DIR)) {
        generated++
      }
    }
  }

  console.log(`\n完成！生成 ${generated}/${total} 个文件`)

} else if (args[0] === '--family' && args[1]) {
  const familyName = args[1]
  const family = FAMILIES.find(f => f.familyName === familyName)

  if (isNil(family)) {
    console.error(`找不到家族: ${familyName}`)
    console.log('可用家族:', FAMILIES.map(f => f.familyName).join(', '))
    process.exit(1)
  }

  console.log(`生成家族 [${familyName}] 的所有调式...`)
  for (const mode of family.modes) {
    generateFile(family.familyName, mode, OUTPUT_BASE_DIR)
  }

} else {
  const modeId = args[0]

  // 查找对应的调式
  let found = false
  for (const family of FAMILIES) {
    const mode = family.modes.find(m =>
      m.outputFileName.replace('_SCALE_META.ts', '') === modeId ||
      m.modeIdKey.toUpperCase() === modeId.toUpperCase()
    )
    if (mode) {
      console.log(`生成调式: ${mode.outputFileName}`)
      generateFile(family.familyName, mode, OUTPUT_BASE_DIR)
      found = true
      break
    }
  }

  if (!found) {
    console.error(`找不到调式: ${modeId}`)
    console.log('使用 --help 查看可用选项')
    process.exit(1)
  }
}
