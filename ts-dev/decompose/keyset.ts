// @ts-nocheck
/**
 * 键集工具 — bake 规则引擎与报告共用的键集规范化
 *
 * primeForm: 移调规范形(不做倒影等价)
 *   对键集内每个音轮流当「起点 0」,其余音化为顺时针半音距,取数值字典序最小者。
 *   12 个移调必然得到同一个 prime form → 可作为人工裁决(verdicts)的键:
 *   人工审核一次,自动对称作用于全部移调(与 special-sets 用 offsets 的精神一致)。
 *   不做倒影等价:大三 [0,4,7] 与小三 [0,3,7] 互为倒影,但和弦识别必须区分。
 *
 *   例: {0,2,11}(C-D-B)
 *     起点 C: [0, 2, 11]   起点 D: [0, 9, 10]   起点 B: [0, 1, 3]
 *     → prime form "0,1,3"(= Forte 3-2,Phrygian 三音)
 */
import { isNil } from "es-toolkit/predicate"
import { readFileSync } from "fs"
import { resolve } from "path"

/** 键集 → 移调规范形 + 起点音(规范形的 0 对应键集中的哪个音) */
export const primeFormInfo = (ids: number[]): { form: string; root: number } => {
  let best: { form: number[]; root: number } | undefined
  for (const start of ids) {
    const form = ids.map(i => (i - start + 12) % 12).sort((a, b) => a - b)
    if (isNil(best)) {
      best = { form, root: start }
      continue
    }
    for (let i = 0; i < form.length; i++) {
      if (form[i] !== best.form[i]) {
        if (form[i] < best.form[i]) best = { form, root: start }
        break
      }
    }
  }
  return { form: best!.form.join(","), root: best!.root }
}

/** 键集 → 移调规范形字符串(逗号分隔),如 [0,2,11] → "0,1,3" */
export const primeForm = (ids: number[]): string => primeFormInfo(ids).form

/** 键集 → 规范形起点音(无锚 verdict 的根音基准),如 [0,3,6] → 0 */
export const primeFormRoot = (ids: number[]): number => primeFormInfo(ids).root

/** 组合枚举 C(n,k),升序字典序 */
export const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))

/** bake-rules.json 的形状(字段直读,不做通用 DSL 解释) */
export interface KeepRule {
  type: string            // "anchor" | "chord"
  formula?: string        // type=chord:公式 id
  rootShift?: number      // 根音锚二选一:有 anchor 时,根音 = 锚点根音 + rootShift
  rootRel?: number        // 无 anchor 时:根音 = prime form 起点音 + rootRel
}
export interface Verdict {
  date: string
  comment: string
  anchor?: string         // 锚点 set id(spset-xxx):该键集有 set 命中时用
  keep: KeepRule[]        // 人工钦定保留列表,顺序即最终顺序
  filterRest: boolean     // true=未列入 keep 的全部过滤;false=keep 提前,其余殿后
}
export interface BakeRules {
  policy: { maxEntries: number; tierCeiling: number }
  rules: Array<{
    id: string
    enabled: boolean
    comment: string
    when?: { hasSetHit?: boolean }
    then?: { filterChords?: { costMax?: number } }
  }>
  verdicts: Record<string, Verdict>
}

/** 加载 bake-rules.json(gen:static-data 从 raw-static/bake-rules.json5 编译) */
export const loadBakeRules = (staticDir: string): BakeRules => {
  const raw = JSON.parse(readFileSync(resolve(staticDir, "bake-rules.json"), "utf-8"))
  if (isNil(raw.policy) || isNil(raw.rules) || isNil(raw.verdicts)) {
    throw new Error("bake-rules.json 缺少 policy/rules/verdicts 之一")
  }
  return raw
}
