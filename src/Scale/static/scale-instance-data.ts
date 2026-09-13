/**
 * Scale 实例数据加载器
 *
 * 只读 scale-instances.json(1.9MB)。
 * 用户 import Scale 时才打包这个文件。
 */
import scaleInstancesJson from "@static-data/scale-instances.json";

export type I_ScaleInstance = {
    pianoKeyIdRoot: number
    scaleModeId: string
    pianoKeyIds: number[]
    pianoKeyIdsSorted: number[]
    degreeToPianoKeyId: Record<number, number>
    pianoKeyIdToDegree: Record<number, number | null>
    degreeAlterationsMap: Record<number, number>
    scaleMode: any
    /** 烘焙拼写行(每根音拼写一条:tonicStep/alterSum/notesMap/isTonicEnharmonic;≥3 重已在生成期排除) */
    scales: unknown[]
}

const ALL_SCALE_META = scaleInstancesJson as any[]

export const getScaleInstance = (
    rootPianoKeyId: number,
    scaleModeId: string
): I_ScaleInstance | undefined => {
    return ALL_SCALE_META.find(
        (s) => s.pianoKeyIdRoot === rootPianoKeyId && s.scaleModeId === scaleModeId
    )
}

export default ALL_SCALE_META as I_ScaleInstance[]
