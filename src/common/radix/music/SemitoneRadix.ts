import { Base12Radix } from "../base/Base12Radix";

/**
 * 半音位置进制分解（mtkit 对照补齐,2026-09-12）
 *
 * 把绝对半音位置分解为 [八度, 键位] 两位十二进制：
 *   semitone 26 → octave 2, location 2（C2 + 2 = D）
 */
export class SemitoneRadix extends Base12Radix {
  constructor(semitone: number) {
    super(semitone);
  }

  /** 八度内键位（0-11,pianoKeyId 语义） */
  get location(): number {
    return this.lastDigit;
  }

  /** 八度数 */
  get octave(): number {
    return this.firstDigit;
  }
}
