// @ts-nocheck
// 「找不出来的音是什么」——用音级集合论(prime form)给 220 种三音集分类
// prime form = min(canonical(mask), canonical(inversion(mask)))
// 反转:bit i → bit (12-i) mod 12
import { keyMaskFromIds, idsFromKeyMask, rotate, canonicalForm } from "../../../src/common/keyMask"
import { transposeFamily } from "../../../src/common/keyMask"
import { findChord } from "../../../src/Find"

const invertMask = (m: number): number => {
  let r = 0
  for (let i = 0; i < 12; i++) if (m & (1 << i)) r |= 1 << ((12 - i) % 12)
  return r
}
const primeForm = (ids: number[]): number => {
  const m = keyMaskFromIds(ids)
  return Math.min(canonicalForm(m), canonicalForm(invertMask(m)))
}

const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
import { PianoKey } from "../../../src/PianoKey"
const NAMES = PianoKey.SYMBOLS

// 全部 220 种三音 → prime form 分类
const classes = new Map<number, { members: number[][]; chordExamples: string[] }>()
for (const ids of combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)) {
  const pf = primeForm(ids)
  if (!classes.has(pf)) classes.set(pf, { members: [], chordExamples: [] })
  const c = classes.get(pf)!
  c.members.push(ids)
  const chord = transposeFamily(ids)
  if (chord.length > 0 && c.chordExamples.length === 0) {
    c.chordExamples = chord.filter(x => x.root === 0 || true).slice(0, 3).map(x => `${x.chordFormulaId}@${NAMES[x.root]}`)
  }
}

console.log(`220 种三音 → ${classes.size} 个 prime form 类(移调+反转等价,即 Forte 分类)\n`)
console.log(`类(prime form)      移调数  和弦代表           身份`)
const sorted = [...classes.entries()].sort((a, b) => a[0] - b[0])
for (const [pf, c] of sorted) {
  const ids = idsFromKeyMask(pf)
  const gaps = ids.map((x, i) => (i < ids.length - 1 ? ids[i + 1] - x : 12 - x + ids[0]))
  const covered = c.chordExamples.length > 0
  // 类内任取一个成员查 findChord 两层,看是否有省略音解释
  const anyMember = c.members[0]
  const fuzzy = findChord(anyMember.map(x => x + 60))
  console.log(`[${gaps.join(",")}]`.padEnd(14), String(c.members.length).padStart(4),
    covered ? c.chordExamples.join(" / ").padEnd(18) : "(无标准和弦)".padEnd(18),
    covered ? "功能和声居民" : fuzzy.length > 0 ? "仅省略音形态" : "★ 完全无和弦 = 非三度堆叠宇宙")
}
