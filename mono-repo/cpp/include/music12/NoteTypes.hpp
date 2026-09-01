/**
 * music12-cpp · 音名工具(NoteTypes)
 *
 * 移植自 music12 TS 版 src/common/static/NOTE_TYPES.ts
 * 音名列表:C D E F G A B
 */
#pragma once
#include <string>
#include <string_view>
#include <array>
#include "Radix.hpp"

namespace music12 {

// 7 个自然音名
constexpr std::array<std::string_view, 7> STEP_LIST = {"C", "D", "E", "F", "G", "A", "B"};

/** 根据索引获取音名(0-6) */
inline std::string_view getStepByIndex(int index) {
    if (index < 0 || index >= 7) throw RadixError("Invalid step index: " + std::to_string(index));
    return STEP_LIST[index];
}

/** 根据音名获取索引(C=0, D=1, ... B=6) */
inline int getIndexByStep(std::string_view step) {
    for (int i = 0; i < 7; i++) {
        if (STEP_LIST[i] == step) return i;
    }
    throw RadixError("Invalid step: " + std::string(step));
}

} // namespace music12
