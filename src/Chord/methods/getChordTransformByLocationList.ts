import { intersection, isNil } from 'es-toolkit'
import { toPairs, values } from 'es-toolkit/compat'
import { isDefined } from "@common/utils/isDefined"
import { getUpwardPianoKeyGap } from "@note";
import { I_ChordNotesPanel } from "../static/types";
import { Note } from "@note";

// ==================== 类型定义 ====================

/** 原始和弦信息 */
type I_OriginChordInfo = {
  /** 根音钢琴键 ID */
  rootNotePianoKeyId: number;
  /** 音符面板（度数 → 钢琴键 ID） */
  notesPanel: I_ChordNotesPanel;
};

/** 变换结果 */
type I_TransformResult = {
  omit: number[];
  min: number[];
  maj: number[];
  p: number[];
  dim: number[];
  aug: number[];
};

// ==================== 半音数到音程映射 ====================

/** 半音数 → 音程类型映射（用于新增音） */
const SEMITONE_TO_INTERVAL: Record<number, keyof I_TransformResult> = {
  1: "min", // 小二度 → b2
  2: "maj", // 大二度 → 2
  3: "min", // 小三度 → b3
  4: "maj", // 大三度 → 3
  5: "p", // 纯四度 → 4
  6: "aug", // 增四度 → #4
  7: "p", // 纯五度 → 5
  8: "min", // 小六度 → b6
  9: "maj", // 大六度 → 6
  10: "min", // 小七度 → b7
  11: "maj", // 大七度 → 7
};

/** 半音数 → 度数映射 */
const SEMITONE_TO_DEGREE: Record<number, number> = {
  1: 2,
  2: 2, // 小二度/大二度 → 2度
  3: 3,
  4: 3, // 小三度/大三度 → 3度
  5: 4,
  6: 4, // 纯四度/增四度 → 4度
  7: 5, // 纯五度 → 5度
  8: 6,
  9: 6, // 小六度/大六度 → 6度
  10: 7,
  11: 7, // 小七度/大七度 → 7度
};

// ==================== 主函数 ====================

/**
 * 根据钢琴键 ID 列表推导和弦变换
 *
 * 比较原始和弦的音符与给定键位列表，推导出需要的变换（omit、add、alter）。
 *
 * @param originChordInfo - 原始和弦信息
 * @param givenPianoKeyIds - 给定的钢琴键 ID 列表
 * @returns 变换结果
 *
 * @example
 * ```ts
 * // C7 和弦: C(60), E(64), G(67), Bb(70)
 * // 给定: [60, 64, 70] (缺 G)
 * // 结果: { omit: [5], ... }  // 省略五音
 * ```
 */
export const getChordTransformByPianoKeyIds = (
  originChordInfo: I_OriginChordInfo,
  givenPianoKeyIds: number[]
): I_TransformResult => {
  const result: I_TransformResult = {
    omit: [],
    min: [],
    maj: [],
    p: [],
    dim: [],
    aug: [],
  };

  // 获取原始和弦的有效键位列表（排除 undefined）
  const originKeyIds = values(originChordInfo.notesPanel)
    .filter((note): note is InstanceType<typeof Note> => isDefined(note))
    .map((note) => note.pianoKeyId);

  // 找出共同音符
  const commonKeyIds = intersection(originKeyIds, givenPianoKeyIds);

  // 原始有但给定没有 → omit
  const omittedKeyIds = originKeyIds.filter((id) => !commonKeyIds.includes(id));
  for (const [degree, note] of toPairs(originChordInfo.notesPanel)) {
    if (
      note &&
      omittedKeyIds.includes((note as InstanceType<typeof Note>).pianoKeyId)
    ) {
      result.omit.push(Number(degree));
    }
  }

  // 给定有但原始没有 → 根据半音数推导音程类型
  const addedKeyIds = givenPianoKeyIds.filter(
    (id) => !commonKeyIds.includes(id)
  );
  for (const keyId of addedKeyIds) {
    const semitoneGap = getUpwardPianoKeyGap(
      originChordInfo.rootNotePianoKeyId,
      keyId
    );
    const intervalType = SEMITONE_TO_INTERVAL[semitoneGap];
    const degree = SEMITONE_TO_DEGREE[semitoneGap];

    if (intervalType && degree) {
      result[intervalType].push(degree);
    }
  }

  return result;
};

export default getChordTransformByPianoKeyIds;
