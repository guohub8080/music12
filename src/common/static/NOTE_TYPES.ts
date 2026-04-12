/**
 * 音名列表（C D E F G A B）
 * 用于音符的 step 表示
 */
export const STEP_LIST = ["C", "D", "E", "F", "G", "A", "B"] as const

/**
 * 音名类型
 */
export type T_NoteStep = typeof STEP_LIST[number]

/**
 * 变化音数值类型（-2 到 2）
 */
export type T_AlterValue = -2 | -1 | 0 | 1 | 2

/**
 * 根据索引获取音名
 */
export const getStepByIndex = (index: number): T_NoteStep => {
  return STEP_LIST[index] as T_NoteStep
}

/**
 * 根据音名获取索引
 */
export const getIndexByStep = (step: string): number => {
  const index = STEP_LIST.indexOf(step as T_NoteStep)
  if (index === -1) {
    throw new Error(`Invalid step: ${step}`)
  }
  return index
}
