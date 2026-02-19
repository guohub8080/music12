import coreAlgorithm from "../../../common/radix/Radix.ts";

export default (baseCircleId: number, moveStep: number, isClockwise = true): number => {
    const targetBase10Num = isClockwise ? baseCircleId + moveStep : baseCircleId - moveStep
    return coreAlgorithm.get2DigitNumList_GivenNumAndBase(targetBase10Num, 12)[1]
}
