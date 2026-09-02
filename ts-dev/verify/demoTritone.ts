// @ts-nocheck
// 三全音 × 减和弦的数学关系演示(用本库的 KeyMask/transposeFamily 实证)
import { transposeFamily, keyMaskFromIds, rotate, canonicalForm, idsFromKeyMask } from "../../src/common/keyMask"

const NAMES = ["C","C♯","D","D♯/E♭","E","F","F♯/G♭","G","G♯/A♭","A","A♯/B♭","B"]

console.log("=== 1. 减七和弦的自对称:一组键,四个名字 ===")
const dim7 = [0, 3, 6, 9]  // C-E♭-G♭-B♭♭
console.log(`dim7 pattern {0,3,6,9} rotate(+3) 后仍是自己?`,
  idsFromKeyMask(rotate(keyMaskFromIds(dim7), 3)).join(",") === "0,3,6,9" ? "✓(3+3+3+3=12,八度四等分)" : "✗")
const fam = transposeFamily(dim7)
console.log(`transposeFamily([C,E♭,G♭,B♭♭]) →`, fam.map(x => `${x.chordFormulaId}@${NAMES[x.root]}`).join(", "))

console.log("\n=== 2. 增三和弦:八度三等分(4+4+4),一组键三个名字 ===")
const aug3 = [0, 4, 8]
console.log(`rotate(+4) 自对称?`, idsFromKeyMask(rotate(keyMaskFromIds(aug3), 4)).join(",") === "0,4,8" ? "✓" : "✗")
console.log(`transposeFamily([C,E,G♯]) →`, transposeFamily(aug3).map(x => `${x.chordFormulaId}@${NAMES[x.root]}`).join(", "))

console.log("\n=== 3. 独立减七/增三到底有几个(移调等价类计数) ===")
const dimClasses = new Set(), augClasses = new Set()
for (let r = 0; r < 12; r++) {
  dimClasses.add(canonicalForm(keyMaskFromIds([(r)%12,(r+3)%12,(r+6)%12,(r+9)%12])))
  augClasses.add(canonicalForm(keyMaskFromIds([(r)%12,(r+4)%12,(r+8)%12])))
}
console.log(`12 个根的减七 → ${dimClasses.size} 个真正不同的减七(12÷4)`)
console.log(`12 个根的增三 → ${augClasses.size} 个真正不同的增三(12÷3)`)

console.log("\n=== 4. 三全音代理:G7 与 D♭7 的共享音 ===")
const g7 = [7, 11, 2, 5]     // G-B-D-F
const db7 = [1, 5, 8, 11]    // D♭-F-A♭-B(C♭)
const shared = g7.filter(x => db7.includes(x))
console.log(`G7  {7,11,2,5} ∩ D♭7 {1,5,8,11} = {${shared.map(x => NAMES[x]).join(", ")}}`)
console.log(`→ 正是 G7 的 7 音(F)与 3 音(B)——那对三全音,两个属七共享,3/7 互换`)

console.log("\n=== 5. 音程表里的三全音双重身份 ===")
console.log(`aug4(增四) = 6 半音,dim5(减五) = 6 半音——同一距离、不同拼法`)
console.log(`dim3(减三) = min3 + dim5:根到五度就是三全音;dim7 = 两个三全音叠加(C-G♭ + E♭-B♭♭)`)
