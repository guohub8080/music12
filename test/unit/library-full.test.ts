import { describe, it, expect } from "vitest"
import {
  getChordFormulaByTags, getChordFormulaMetaById, getAllChordFormulaMetaList, CHORD_FORMULA_ID,
} from "@chord-formula/index"
import {
  getScaleModeByTags, getScaleModeMetaById, getAllScaleModeMetaList, SCALE_MODE_META_MAP,
} from "@scale-mode/index"
import {
  getIntervalDegreeByStep, isPureInterval, intervalSlide_145, intervalSlide_2367,
} from "@interval/index"
import { getUpwardPianoKeyGap, Note } from "@note/index"
import { areNotesInScale, findScaleByDegreePositions } from "@find/index"
import {
  getModeNameByModeKey, getModeTypeByModeKey, getIntervalListByModeKey, majorMinorScaleInstances,
} from "@scale/index"
import { getChordTransformByPianoKeyIds } from "@chord/index"
import { SemitoneRadix } from "@common/radix"
import { getNote, getChord, getScale, getInterval } from "@factory/index"

/**
 * 全库覆盖测试(2026-09-12,用户指令「全部函数、全部乐理测一遍」)
 *
 * 补齐出口扫描发现的 20 个盲区(ChordFormula×4 / ScaleMode×4 / Interval×4 /
 * Scale×4 / Find×2 / Note×1 / Chord×1),外加 factory 四件套的行为断言。
 * 乐理断言取公认事实(三全音=6 半音、纯音程 145 度、五度圈位等)。
 */

describe("ChordFormula 模块(公式元数据与标签查询)", () => {
  it("getChordFormulaByTags:交集语义,dom+altered 跨家族命中变音属和弦", () => {
    const altered = getChordFormulaByTags(["dom", "altered"])
    expect(altered.length).toBeGreaterThan(0)
    expect(altered.every(m => m.tags.includes("dom") && m.tags.includes("altered"))).toBe(true)
    expect(altered.map(m => m.chordFormulaId)).toContain("dom7b9")
  })

  it("getChordFormulaByTags:dim 查出 dim3 与 dim7", () => {
    const dims = getChordFormulaByTags(["dim"])
    expect(dims.map(m => m.chordFormulaId)).toEqual(expect.arrayContaining(["dim3", "dim7"]))
  })

  it("getChordFormulaByTags:空标签数组 = 全量 88 个公式", () => {
    expect(getChordFormulaByTags([])).toHaveLength(88)
  })

  it("getChordFormulaMetaById:maj3 的半音列表 [4,7]", () => {
    const maj3 = getChordFormulaMetaById("maj3")
    expect(maj3.semitonesList).toEqual([4, 7])
    expect(maj3.notesNum).toBe(3)
  })

  it("getAllChordFormulaMetaList:88 条,每条带 tags 与度数映射", () => {
    const all = getAllChordFormulaMetaList()
    expect(all).toHaveLength(88)
    expect(all.every(m => Array.isArray(m.tags) && m.tags.length > 0)).toBe(true)
  })

  it("CHORD_FORMULA_ID:常量键位与元数据一致", () => {
    // 计算键字典:键即公式 id([MAJ3]: MAJ3)——按 id 断言
    const ids = CHORD_FORMULA_ID as Record<string, string>
    expect(ids["maj3"]).toBe("maj3")
    expect(ids["maj3b5"]).toBe("maj3b5")
    expect(Object.keys(ids)).toHaveLength(88)
  })
})

describe("ScaleMode 模块(调式元数据与标签查询)", () => {
  it("getScaleModeByTags:melodic-minor 家族补全后恰 7 个(含 ALTERED)", () => {
    const mm = getScaleModeByTags(["melodic-minor"])
    expect(mm).toHaveLength(7)
    expect(mm.map(m => m.scaleModeId)).toContain("ALTERED")
    expect(mm.map(m => m.scaleModeId)).toContain("MIXOLYDIAN_FLAT6")
  })

  it("getScaleModeByTags:特征标签交集(#4+heptatonic 命中 Lydian 系)", () => {
    const sharp4 = getScaleModeByTags(["#4", "heptatonic"])
    expect(sharp4.map(m => m.scaleModeId)).toContain("LYDIAN")
    expect(sharp4.every(m => m.tags.includes("#4"))).toBe(true)
  })

  it("getScaleModeByTags:五声缺度标签——五形旋转缺度各异(宫缺4/7,商缺3/6,角缺2/5…)", () => {
    expect(getScaleModeByTags(["pentatonic", "no4", "no7"]).map(m => m.scaleModeId)).toEqual(["GONG"])
    expect(getScaleModeByTags(["pentatonic", "no3", "no6"]).map(m => m.scaleModeId)).toEqual(["SHANG"])
    expect(getScaleModeByTags(["pentatonic", "no2", "no5"]).map(m => m.scaleModeId)).toEqual(["JUE"])
    expect(getScaleModeByTags(["pentatonic", "no3", "no7"]).map(m => m.scaleModeId)).toEqual(["ZHI"])
    expect(getScaleModeByTags(["pentatonic", "no2", "no6"]).map(m => m.scaleModeId)).toEqual(["YU"])
    expect(getScaleModeByTags(["pentatonic"])).toHaveLength(5)
  })

  it("getScaleModeMetaById:ALTERED 元数据齐备(dim4 槽=4 半音)", () => {
    const altered = getScaleModeMetaById("ALTERED")
    expect(altered.type).toBe("halfdim7")
    expect(altered.semitonesList).toEqual([1, 3, 4, 6, 8, 10])
    expect(altered.forte).toBe("7-34")
  })

  it("getAllScaleModeMetaList:60 条,forte/sameShapeAs 全带", () => {
    const all = getAllScaleModeMetaList()
    expect(all).toHaveLength(60)
    expect(all.every(m => typeof m.forte === "string")).toBe(true)
    expect(all.every(m => "sameShapeAs" in m)).toBe(true)
  })

  it("SCALE_MODE_META_MAP:键即 id;别名键指向同形 canonical", () => {
    expect(SCALE_MODE_META_MAP["IONIAN"].sameShapeAs).toBe("NATURAL_MAJOR")
    expect(SCALE_MODE_META_MAP["NATURAL_MAJOR"].sameShapeAs).toBeNull()
  })
})

describe("Interval 模块补全(度数/纯音程/滑动)", () => {
  it("getIntervalDegreeByStep:字母位差→度数(A→C=3 度,C→G=5 度)", () => {
    expect(getIntervalDegreeByStep("C", "G")).toBe(5)
    expect(getIntervalDegreeByStep("A", "C")).toBe(3)
    expect(getIntervalDegreeByStep("C", "C")).toBe(1)
  })

  it("isPureInterval:145 度纯,2367 度不纯(含复音程 11=纯)", () => {
    for (const d of [1, 4, 5, 8, 11, 15]) expect(isPureInterval(d), `度${d}`).toBe(true)
    for (const d of [2, 3, 6, 7, 9, 13]) expect(isPureInterval(d), `度${d}`).toBe(false)
    expect(() => isPureInterval(0)).toThrow()
  })

  it("intervalSlide_145:p→aug(+1),越界抛错", () => {
    expect(intervalSlide_145("p", 1)).toBe("aug")
    expect(intervalSlide_145("p", -1)).toBe("dim")
    expect(() => intervalSlide_145("aug+", 1)).toThrow()
    expect(() => intervalSlide_145("dim-", -1)).toThrow()
  })

  it("intervalSlide_2367:maj→aug(+1)→min(降档),min→dim", () => {
    expect(intervalSlide_2367("maj", 1)).toBe("aug")
    expect(intervalSlide_2367("maj", -1)).toBe("min")
    expect(intervalSlide_2367("min", -1)).toBe("dim")
    expect(() => intervalSlide_2367("aug+", 1)).toThrow()
  })
})

describe("Note 模块补全(上行键距)", () => {
  it("getUpwardPianoKeyGap:同八度直取,负则跨八度(C→B=11 而非 -1)", () => {
    expect(getUpwardPianoKeyGap(0, 4)).toBe(4)
    expect(getUpwardPianoKeyGap(0, 11)).toBe(11)
    expect(getUpwardPianoKeyGap(5, 0)).toBe(7) // F→C 上行跨八度
    expect(getUpwardPianoKeyGap(3, 3)).toBe(0)
  })
})

describe("Find 模块补全(子集与度位约束)", () => {
  it("areNotesInScale:C-E-G 全在 C 大调;C♯ 不在", () => {
    expect(areNotesInScale([0, 4, 7], 0, "NATURAL_MAJOR")).toBe(true)
    expect(areNotesInScale([0, 1, 4, 7], 0, "NATURAL_MAJOR")).toBe(false)
    expect(areNotesInScale([0, 3, 7], 0, "NATURAL_MINOR")).toBe(true)
  })

  it("findScaleByDegreePositions:根音 C+三度 E 命中 C 大调/Lydian 等(度位约束)", () => {
    const r = findScaleByDegreePositions([
      { pianoKeyId: 0, as: 1 },
      { pianoKeyId: 4, as: 3 },
    ])
    expect(r.length).toBeGreaterThan(0)
    expect(r.some(x => x.scaleModeId === "NATURAL_MAJOR" && x.rootNotePianoKey === 0)).toBe(true)
    expect(r.some(x => x.scaleModeId === "LYDIAN" && x.rootNotePianoKey === 0)).toBe(true)
  })

  it("findScaleByDegreePositions:小三度约束走小调系(排除大调)", () => {
    const r = findScaleByDegreePositions([
      { pianoKeyId: 0, as: 1 },
      { pianoKeyId: 3, as: 3 },
    ])
    expect(r.some(x => x.scaleModeId === "NATURAL_MINOR")).toBe(true)
    expect(r.some(x => x.scaleModeId === "NATURAL_MAJOR")).toBe(false)
  })

  it("findScaleByDegreePositions:复音程归一(as:10 → 3 度)", () => {
    const r = findScaleByDegreePositions([
      { pianoKeyId: 0, as: 1 },
      { pianoKeyId: 4, as: 10 },
    ])
    expect(r.some(x => x.scaleModeId === "NATURAL_MAJOR")).toBe(true)
  })
})

describe("Scale 模块补全(modeKey 查询系与切片)", () => {
  it("getModeNameByModeKey:标准名与别名键同值", () => {
    expect(getModeNameByModeKey("NATURAL_MAJOR")).toBe("自然大调")
    expect(getModeNameByModeKey("IONIAN")).toBe("自然大调")
  })

  it("getModeTypeByModeKey:主和弦性质(Locrian 系=halfdim7,新 dim7 形)", () => {
    expect(getModeTypeByModeKey("NATURAL_MAJOR")).toBe("major")
    expect(getModeTypeByModeKey("LOCRIAN")).toBe("halfdim7")
    expect(getModeTypeByModeKey("ULTRA_LOCRIAN")).toBe("dim7")
  })

  it("getIntervalListByModeKey:6 槽 intervalList(五声含 null)", () => {
    const major = getIntervalListByModeKey("NATURAL_MAJOR")
    expect(major).toEqual([["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]])
    const gong = getIntervalListByModeKey("GONG")
    expect(gong).toEqual([["maj", 2], ["maj", 3], null, ["p", 5], ["maj", 6], null])
  })

  it("majorMinorScaleInstances:24 条切片默认导出", () => {
    expect(majorMinorScaleInstances).toHaveLength(24)
  })
})

describe("Chord 模块补全(变换分析)", () => {
  it("getChordTransformByPianoKeyIds:C7 弹了 [0,4,10] → 省略五度", () => {
    // 用 Chord 实例组装 originChordInfo(notesPanel 度数→Note)
    const origin = {
      rootNotePianoKeyId: 0,
      notesPanel: {
        1: new Note("C", 0, 4),
        3: new Note("E", 0, 4),
        5: new Note("G", 0, 4),
        7: new Note("B", -1, 4),
      },
    }
    const r = getChordTransformByPianoKeyIds(origin as never, [60, 64, 70])
    expect(r.omit).toContain(5)
  })
})

describe("factory 四件套(入口一致性)", () => {
  it("getNote/getInterval/getChord/getScale 与类构造等价", () => {
    const n = getNote("C", 0, 4)
    expect(`${n.step}${n.octave}`).toBe("C4")
    const i = getInterval("maj", 3)
    expect(i.semitoneGap).toBe(4)
    const c = getChord("C", 0, "maj7")
    expect(c.pianoKeyIds).toEqual([0, 4, 7, 11])
    const s = getScale("C", 0, "NATURAL_MAJOR")
    expect(s.pianoKeyIds).toEqual([0, 2, 4, 5, 7, 9, 11])
  })
})

describe("mtkit 对照补齐(SemitoneRadix + Scale 便利 getter)", () => {
  it("SemitoneRadix:半音位置 [八度,键位] 分解", () => {
    const sr = new SemitoneRadix(26)
    expect(sr.octave).toBe(2)
    expect(sr.location).toBe(2)  // D
    expect(new SemitoneRadix(11).octave).toBe(0)
    expect(new SemitoneRadix(11).location).toBe(11) // B
  })

  it("getAlterSum/getAlterTimesSum:直查烘焙拼写行,指定 step(可省 alter)", () => {
    expect(getScale("C", 0, "NATURAL_MAJOR").getAlterSum("C")).toBe(0)
    expect(getScale("C", 0, "NATURAL_MINOR").getAlterSum("C")).toBe(-3)
    expect(getScale("C", 0, "NATURAL_MINOR").getAlterTimesSum("C")).toBe(-3)
    expect(getScale("D", -1, "NATURAL_MAJOR").getAlterSum("D")).toBe(-5) // D♭ 拼写 = 5♭
    expect(getScale("E", -1, "NATURAL_MAJOR").getAlterSum("E")).toBe(-3) // E♭ = 3♭
    expect(getScale("F", 1, "NATURAL_MAJOR").getAlterSum("F")).toBe(6)   // F♯ = 6♯
    // 同键集不同 step 不同调号:键 1 大调 C 拼写(C♯)=7,D 拼写(D♭)=-5
    const k1 = getScale("D", -1, "NATURAL_MAJOR")
    expect(k1.getAlterSum("C")).toBe(7)
    expect(k1.getAlterSum("D")).toBe(-5)
    expect(k1.getAlterSum("C", 1)).toBe(7) // 显式 alter 同值
  })

  it("getEqualRootNote:isTonicEnharmonic 行给同键另一拼写根音,实用区返回自身", () => {
    expect(getScale("C", 0, "NATURAL_MAJOR").getEqualRootNote("C").artName).toBe("C")
    // 键 1 大调 C♯ 拼写全升(等音区)→ 建议 D♭
    expect(getScale("D", -1, "NATURAL_MAJOR").getEqualRootNote("C").artName).toBe("D♭")
  })

  it("被生成期排除的拼写(≥3 重)查表报错", () => {
    const bsharp = getScale("C", 0, "LYDIAN_SHARP2_SHARP6") // 键 0,B♯ 拼写已被排除
    expect(() => bsharp.getAlterSum("B", 1)).toThrow(/excluded at generation/)
  })

  it("chord3/7OfDegreesList:顺阶和弦全列表,五声缺度跳过", () => {
    const c = getScale("C", 0, "NATURAL_MAJOR")
    expect(c.chord3OfDegreesList).toEqual(["Cmaj3", "Dmin3", "Emin3", "Fmaj3", "Gmaj3", "Amin3", "Bdim3"])
    expect(c.chord7OfDegreesList).toEqual(["Cmaj7", "Dmin7", "Emin7", "Fmaj7", "Gdom7", "Amin7", "Bhalfdim7"])
    const gong = getScale("G", 0, "GONG")
    expect(gong.chord3OfDegreesList.length).toBeLessThan(7) // 缺度跳过
    expect(gong.chord3OfDegreesList.length).toBeGreaterThan(0)
  })
})
