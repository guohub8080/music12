import { describe, it, expect } from "vitest"
import {
  Note, getCasualRandomNote, getWhiteRandomNote, getBlackRandomNote,
  getNormalRandomNote, getNoteByPianoKeyId, normalizeOctave,
} from "@note/index"
import { Interval, getIntervalByComparingNotes, getIntervalBySemitoneGap } from "@interval/index"
import { PianoKey } from "@pianokey/index"
import { CircleOfFifths, getFifthCircleByAlter } from "@circle-of-fifths/index"
import { randomOf } from "@common/utils/randomOf"

/**
 * collect.js 退役回归测试(2026-09-12,d54d1b3)
 *
 * 目的:17 文件 28 处 collect 管线迁到 es-toolkit/原生后,逐函数验证行为
 * 与迁移前语义等价——这是迁移的验收测试,不是新功能测试。
 * 覆盖清单:随机系×4、normalizeOctave、getNoteByPianoKeyId、Note 类三法
 * (getNoteByInterval/getSamePitchNotes/semitoneMove)、Interval 系×4、
 * PianoKey 系×3、五度圈系×5、randomOf 助手。
 *
 * 随机系断言策略:100 次抽样验证值域成员性(随机性本身不断言具体值)。
 */

describe("collect 退役 · 随机音符系(.random() → randomOf)", () => {
  it("getNormalRandomNote:恒为常用音(isNormal=true)", () => {
    const normalAlterSteps = ["C", "D", "E", "F", "G", "A", "B"]
    for (let i = 0; i < 100; i++) {
      const n = getNormalRandomNote()
      expect(normalAlterSteps).toContain(n.step)
      expect(n.alter === 0 || Math.abs(n.alter) === 1).toBe(true)
    }
  })

  it("getWhiteRandomNote:isNormal 时恒为七个自然音(alter=0)", () => {
    const whites = ["C", "D", "E", "F", "G", "A", "B"]
    for (let i = 0; i < 100; i++) {
      const n = getWhiteRandomNote()
      expect(whites).toContain(n.step)
      expect(n.alter).toBe(0)
    }
  })

  it("getWhiteRandomNote({isNormal:false}):恒为白键(含 B# 等非常用拼写)", () => {
    for (let i = 0; i < 100; i++) {
      const n = getWhiteRandomNote({ isNormal: false })
      expect(n.pianoKeyId % 12).not.toBe(-1)
      expect([0, 2, 4, 5, 7, 9, 11]).toContain(n.pianoKeyId)
    }
  })

  it("getBlackRandomNote:恒为黑键(isNormal 时限于 5 个常用黑键拼写)", () => {
    for (let i = 0; i < 100; i++) {
      const n = getBlackRandomNote()
      expect([1, 3, 6, 8, 10]).toContain(n.pianoKeyId)
    }
    for (let i = 0; i < 100; i++) {
      const n = getBlackRandomNote({ isNormal: false })
      expect([1, 3, 6, 8, 10]).toContain(n.pianoKeyId)
    }
  })

  it("getCasualRandomNote:全域随机(35 条 notes 元数据内)", () => {
    for (let i = 0; i < 100; i++) {
      const n = getCasualRandomNote()
      expect(n.pianoKeyId).toBeGreaterThanOrEqual(0)
      expect(n.pianoKeyId).toBeLessThanOrEqual(11)
    }
  })

  it("随机系 octave 参数透传(数字与数组)", () => {
    expect(getNormalRandomNote({ octave: 5 }).octave).toBe(5)
    const n = getCasualRandomNote({ octave: [2, 3] })
    expect([2, 3]).toContain(n.octave)
  })
})

describe("collect 退役 · normalizeOctave", () => {
  it("数字直通,数组随机取一,空数组抛错", () => {
    expect(normalizeOctave(4)).toBe(4)
    expect(normalizeOctave([6])).toBe(6)
    expect(() => normalizeOctave([])).toThrow()
    expect(() => normalizeOctave("x" as never)).toThrow()
  })
})

describe("collect 退役 · randomOf 助手", () => {
  it("空数组返 undefined,单元素数组恒返该元素", () => {
    expect(randomOf([])).toBeUndefined()
    expect(randomOf([42])).toBe(42)
  })
})

describe("collect 退役 · getNoteByPianoKeyId(.where+.all 链)", () => {
  it("默认只取常用拼写:C# → [C♯, D♭] 两音", () => {
    const notes = getNoteByPianoKeyId(1)
    expect(notes).toHaveLength(2)
    expect(notes.map(n => `${n.step}${n.alter}`).sort()).toEqual(["C1", "D-1"])
  })

  it("isComplexIncluded 取全部拼写(黑键含 B## 类极端)", () => {
    const notes = getNoteByPianoKeyId(1, { isComplexIncluded: true })
    expect(notes.length).toBeGreaterThan(2)
  })
})

describe("collect 退役 · Note 类三法", () => {
  it("getNoteByInterval:C4 + 大三度 = E4(查表 .first 语义)", () => {
    const c4 = new Note("C", 0, 4)
    const e4 = c4.getNoteByInterval(new Interval("maj", 3))
    expect(`${e4.step}${e4.alter}${e4.octave}`).toBe("E04")
  })

  it("getNoteByInterval:B3 + 小二度 = C4(跨八度查表)", () => {
    const b3 = new Note("B", 0, 3)
    const c4 = b3.getNoteByInterval(new Interval("min", 2))
    expect(`${c4.step}${c4.octave}`).toBe("C4")
  })

  it("getSamePitchNotes:C#4 的等音(alterAbsLte 与排除自身)", () => {
    const cs = new Note("C", 1, 4)
    const all = cs.getSamePitchNotes({ isSelfIncluded: true, alterAbsLte: 1 })
    expect(all.map(n => `${n.step}${n.alter}`).sort()).toEqual(["C1", "D-1"])
    const others = cs.getSamePitchNotes({ isSelfIncluded: false, alterAbsLte: 1 })
    expect(others.map(n => `${n.step}${n.alter}`)).toEqual(["D-1"])
  })

  it("semitoneMove:优先自然音,无自然音按方向选升降", () => {
    // C4 + 1 半音 → C#4(该位无自然音,向上选升)
    expect(new Note("C", 0, 4).semitoneMove(1).artName).toBe("C♯")
    // D4 + 1 半音 → D#4? 不——D♯ 位无自然音,向上选升 ✓;E4 - 1 → E♭? Eb 位无自然音,向下选降
    expect(new Note("E", 0, 4).semitoneMove(-1).artName).toBe("E♭")
    // C4 + 2 半音 → D4(自然音优先)
    expect(new Note("C", 0, 4).semitoneMove(2).artName).toBe("D")
  })
})

describe("collect 退役 · Interval 系", () => {
  it("getIntervalBySemitoneGap:返回数组,4 半音 = [maj3];19 半音(八度+7)= [p12]", () => {
    expect(getIntervalBySemitoneGap(4).map(i => `${i.type}${i.num}`)).toEqual(["maj3"])
    // 复合:19 = 1×12+7,八度内 7 = 纯五度 → 纯十二度
    expect(getIntervalBySemitoneGap(19).map(i => `${i.type}${i.num}`)).toEqual(["p12"])
  })

  it("getIntervalByComparingNotes:C4→E4 = 大三度;C4→C5 = 纯八度", () => {
    const maj3 = getIntervalByComparingNotes(new Note("C", 0, 4), new Note("E", 0, 4))
    expect(`${maj3.type}${maj3.num}`).toBe("maj3")
    const p8 = getIntervalByComparingNotes(new Note("C", 0, 4), new Note("C", 0, 5))
    expect(`${p8.type}${p8.num}`).toBe("p8")
  })

  it("Interval 构造查表(.where 链):min3 = 3 半音", () => {
    const i = new Interval("min", 3)
    expect(i.semitoneGap).toBe(3)
  })

  it("getEqualInterval:纯五度的八度内等位集合 = [p5, dim6, aug+4](默认排除复音程)", () => {
    const p5 = new Interval("p", 5)
    const equals = p5.getEqualInterval()
    expect(equals.map(i => `${i.type}${i.num}`).sort()).toEqual(["aug+4", "dim6", "p5"])
    // 全部同半音钟位(7),互为等位音程
    expect(equals.every(i => i.semitoneGap % 12 === p5.semitoneGap % 12)).toBe(true)
  })
})

describe("collect 退役 · PianoKey 系", () => {
  it("isBlack getter(查表 .first→find)", () => {
    expect(PianoKey.fromPitchInt(1).isBlack).toBe(true)
    expect(PianoKey.fromPitchInt(0).isBlack).toBe(false)
    expect(PianoKey.fromPitchInt(6).isBlack).toBe(true)
  })

  it("getNotes:键 1 的等音,alterAbsLte 过滤(handle 链→数组链)", () => {
    const all = PianoKey.fromPitchInt(1).getNotes({ alterAbsLte: 1 })
    expect(all.map(n => n.artName).sort()).toEqual(["C♯", "D♭"])
    const complex = PianoKey.fromPitchInt(1).getNotes({ alterAbsLte: 2 })
    expect(complex.length).toBe(3) // C♯ D♭ B𝄪(alter 2)
    const normals = PianoKey.fromPitchInt(1).getNotes({ isNormal: true, alterAbsLte: 1 })
    expect(normals.map(n => n.artName).sort()).toEqual(["C♯", "D♭"])
  })
})

describe("collect 退役 · 五度圈系", () => {
  it("CircleOfFifths(0).current = C 大调 + a 小调", () => {
    const c = new CircleOfFifths(0)
    const cur = c.current
    expect(cur).toHaveLength(2)
    expect(cur.map(x => `${x.rawNoteStep}${x.mode}`).sort()).toEqual(["Aminor", "Cmajor"])
  })

  it("majCircle/minCircle 按位取值(0 位 = C 大调/a 小调)", () => {
    const c = new CircleOfFifths(0)
    expect(c.majCircle.map(x => x.rawNoteStep)).toEqual(["C"])
    expect(c.minCircle.map(x => x.rawNoteStep)).toEqual(["A"])
  })

  it("getNormalMajorStep:位 1 = G,位 11 = F", () => {
    expect(CircleOfFifths.getNormalMajorStep(1)).toBe("G")
    expect(CircleOfFifths.getNormalMajorStep(11)).toBe("F")
  })

  it("getFifthCircleByAlter:±7 实用区正常返回,≥8 理论调抛错附等音建议", () => {
    // 返回 CircleOfFifths 实例:+7 = C♯大调位(7),-7 = C♭大调位(5,与 B 等音同席)
    expect(getFifthCircleByAlter(7).location).toBe(7)
    expect(getFifthCircleByAlter(-7).location).toBe(5)
    expect(getFifthCircleByAlter(7).majCircle[0].rawNoteStep).toBe("C")
    expect(() => getFifthCircleByAlter(9)).toThrow(/enharmonic/i)
  })
})
