import { describe, it, expect } from "vitest"
import { getFifthCircleByAlter, CircleOfFifths } from "@circle-of-fifths"
import { CircleOfFifthsError } from "@common/processError/errorTypes"

describe("getFifthCircleByAlter", () => {
  it("常规调号返回正确圈位", () => {
    expect((getFifthCircleByAlter(0) as any).location).toBe(0)    // C
    expect((getFifthCircleByAlter(1) as any).location).toBe(1)    // G
    expect((getFifthCircleByAlter(-1) as any).location).toBe(11)  // F
    expect((getFifthCircleByAlter(-3) as any).location).toBe(9)   // E♭
  })

  it("|alter|=7 的边界调(C♯/C♭)不抛错,与等音伙伴共享圈位", () => {
    expect((getFifthCircleByAlter(7) as any).location).toBe(7)    // C♯ 与 D♭ 同位
    expect((getFifthCircleByAlter(-7) as any).location).toBe(5)   // C♭ 与 B 同位
  })

  it("理论调(|alter|≥8)明确抛错,错误信息附等音实用调号", () => {
    const cases: Array<[number, number]> = [
      [9, -3],   // D♯大 → E♭
      [8, -4],   // G♯大 → A♭
      [11, -1],  // E♯大 → F
      [12, 0],   // B♯大 → C
      [-10, 2],  // C♭小 → B小
      [-8, 4],   // F♭小 → E小
    ]
    for (const [alter, enharmonic] of cases) {
      expect(() => getFifthCircleByAlter(alter)).toThrow(CircleOfFifthsError)
      expect(() => getFifthCircleByAlter(alter)).toThrow(
        `enharmonic practical signature ${enharmonic}`
      )
    }
  })

  it("表中不存在的调号数抛 No circle found", () => {
    expect(() => getFifthCircleByAlter(20)).toThrow("No circle found")
    expect(() => getFifthCircleByAlter(-20)).toThrow("No circle found")
  })
})

describe("CircleOfFifths", () => {
  it("move 跨界后 location 取模正确(圈数语义)", () => {
    const f = new CircleOfFifths(11)
    expect((f.move(1) as any).location).toBe(0)   // F + 1 = C(绕回)
    expect((f.move(2) as any).location).toBe(1)   // 绕一圈到 G
  })

  it("majCircle/minCircle 返回对应调记录", () => {
    const c = new CircleOfFifths(0)
    expect((c as any).majCircle.length).toBeGreaterThan(0)
    expect((c as any).minCircle[0].rawNoteStep).toBe("A")  // 平行小调 a 小调
  })
})
