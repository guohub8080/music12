/**
 * music12-cpp · Find 反查引擎(第一版:完全匹配)
 *
 * 移植自 music12 TS 版 src/Find/findChord/
 *
 * 第一版只支持完全匹配(音集相等),省略音模糊匹配后续补。
 *
 * 用法:
 *   auto results = findChord({60, 64, 67});  // C-E-G → Cmaj
 *   // results[0].chordFormulaId = "maj3"
 */
#pragma once
#include "DataLoader.hpp"
#include <vector>
#include <set>
#include <algorithm>
#include <cmath>

namespace music12 {

struct ChordMatch {
    std::string chordFormulaId;
    int rootPianoKeyId;
    double similarity;   // 1.0 = 完全匹配
    std::vector<int> pianoKeyIds;
};

/**
 * MIDI 音符列表 → pianoKeyId 集合(去重,mod 12)
 */
inline std::set<int> midiToPianoKeySet(const std::vector<int>& midiPitchList) {
    std::set<int> result;
    for (int midi : midiPitchList) {
        int pk = ((midi % 12) + 12) % 12;
        result.insert(pk);
    }
    return result;
}

/**
 * 根据音符列表查找和弦(完全匹配版)
 *
 * @param midiPitchList MIDI 音符值列表(如 [60, 64, 67])
 * @param rootNoteLocation 可选:指定根音(0-11)
 * @return 匹配的和弦列表(similarity=1.0 表示完全匹配)
 */
inline std::vector<ChordMatch> findChord(
    const std::vector<int>& midiPitchList,
    int rootNoteLocation = -1
) {
    std::vector<ChordMatch> results;
    if (midiPitchList.size() < 3) return results;

    auto inputSet = midiToPianoKeySet(midiPitchList);
    auto& dl = DataLoader::instance();

    // 遍历所有和弦实例,找完全匹配
    for (const auto& inst : dl.allChordInstances()) {
        // 如果指定了根音,过滤
        if (rootNoteLocation >= 0 && inst["pianoKeyIdRoot"] != rootNoteLocation) continue;

        // 构建和弦的 pianoKeyId 集合
        std::set<int> chordSet;
        for (const auto& pk : inst["pianoKeyIdsSorted"]) {
            chordSet.insert(static_cast<int>(pk));
        }

        // 完全匹配判断
        if (chordSet == inputSet) {
            ChordMatch match;
            match.chordFormulaId = inst["chordFormulaId"];
            match.rootPianoKeyId = inst["pianoKeyIdRoot"];
            match.similarity = 1.0;
            for (const auto& pk : inst["pianoKeyIdsSorted"]) {
                match.pianoKeyIds.push_back(pk);
            }
            results.push_back(match);
        }
    }

    return results;
}

} // namespace music12
