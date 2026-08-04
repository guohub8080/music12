/**
 * music12-cpp · Chord 和弦类(第一版:不含变换面板)
 *
 * 移植自 music12 TS 版 src/Chord/cls/ChordClass.ts
 * 第一版只支持构造(从 JSON 读 pianoKeyIds),不含 set/sus/omit 变换。
 * 变换面板将在后续版本补充。
 */
#pragma once
#include "DataLoader.hpp"
#include <string>
#include <vector>
#include <stdexcept>
#include <algorithm>

namespace music12 {

class ChordError : public std::runtime_error {
public:
    explicit ChordError(const std::string& msg) : std::runtime_error(msg) {}
};

class Chord {
public:
    const int rootPianoKeyId;
    const std::string chordFormulaId;

    /** 钢琴键 ID 列表(从 JSON 实例读,按度数顺序) */
    std::vector<int> pianoKeyIds;
    /** 排序后的钢琴键 ID */
    std::vector<int> pianoKeyIdsSorted;
    /** 音符数量 */
    int notesNum;
    /** 和弦符号(如 "" 大三和弦没有前缀) */
    std::string baseSymbol;
    /** 中文名(如 "大三") */
    std::string cnName;

    Chord(int rootId, const std::string& formulaId)
        : rootPianoKeyId(rootId), chordFormulaId(formulaId) {
        if (rootId < 0 || rootId > 11) {
            throw ChordError("rootPianoKeyId must be 0-11");
        }
        auto& dl = DataLoader::instance();
        if (!dl.isLoaded()) throw ChordError("DataLoader not loaded.");

        // 查和弦实例
        const json* inst = dl.findChordInstance(rootId, formulaId);
        if (!inst) {
            throw ChordError("Chord not found: root=" + std::to_string(rootId) +
                             " formula=" + formulaId);
        }

        // 读 pianoKeyIds
        for (const auto& pk : (*inst)["pianoKeyIds"]) {
            pianoKeyIds.push_back(pk);
        }
        for (const auto& pk : (*inst)["pianoKeyIdsSorted"]) {
            pianoKeyIdsSorted.push_back(pk);
        }

        // 从公式表读名称
        const json* formula = dl.findChordFormula(formulaId);
        if (formula) {
            notesNum = (*formula)["notesNum"];
            baseSymbol = (*formula).value("scoreDisplay", "");
            cnName = (*formula)["cnName"];
        }
    }
};

} // namespace music12
