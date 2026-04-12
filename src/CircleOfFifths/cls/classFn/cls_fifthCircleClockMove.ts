import coreAlgorithm from "../../../common/radix/Radix.ts";

/**
 * 五度圈时钟移动
 * @param baseCircleId 基础圈 ID
 * @param moveStep 移动步数
 * @param isClockwise 是否顺时针，默认 true
 * @returns 目标圈 ID
 */
export const cls_fifthCircleClockMove = (baseCircleId: number, moveStep: number, isClockwise = true): number => {
    const targetBase10Num = isClockwise ? baseCircleId + moveStep : baseCircleId - moveStep
    return coreAlgorithm.get2DigitNumList_GivenNumAndBase(targetBase10Num, 12)[1]
}

export default cls_fifthCircleClockMove;
