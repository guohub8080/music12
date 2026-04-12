/**
 * 音程类型（所有可能的值）
 */
export type T_IntervalType = "p" | "maj" | "min" | "aug" | "dim" | "aug+" | "dim-"

/**
 * 音程中文前缀
 */
export type T_IntervalCnPrefix = "纯" | "大" | "小" | "增" | "减" | "倍增" | "倍减"

/**
 * 1、4、5 度音程类型列表（纯音程）
 * 纯音程可以变为增、减
 */
export const INTERVAL_TYPE_LIST_145 = ["dim-", "dim", "p", "aug", "aug+"] as const

/**
 * 1、4、5 度音程类型（从常量自动推导）
 */
export type T_IntervalType145 = typeof INTERVAL_TYPE_LIST_145[number]

/**
 * 2、3、6、7 度音程类型列表（大小音程）
 * 大小音程可以变为大、小、增、减
 */
export const INTERVAL_TYPE_LIST_2367 = ["dim-", "dim", "min", "maj", "aug", "aug+"] as const

/**
 * 2、3、6、7 度音程类型（从常量自动推导）
 */
export type T_IntervalType2367 = typeof INTERVAL_TYPE_LIST_2367[number]

/**
 * 音程序组类型 [音程类型, 度数]
 */
export type T_IntervalList = [T_IntervalType, number]
