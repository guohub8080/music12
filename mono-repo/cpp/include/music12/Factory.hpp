/**
 * music12-cpp · Factory 工厂函数
 *
 * 移植自 music12 TS 版 src/factory/
 * 工厂函数:参数校验后创建对应类的实例
 */
#pragma once
#include "Note.hpp"
#include "Interval.hpp"
#include "Scale.hpp"
#include "Chord.hpp"
#include <string>
#include <algorithm>

namespace music12 {

/**
 * 创建音符
 * @param step 音名(大小写不敏感)
 * @param alter 变化音
 * @param octave 八度
 */
inline Note getNote(std::string step, int alter = 0, int octave = 4) {
    // 大写化
    for (auto& c : step) c = static_cast<char>(std::toupper(c));
    return Note(step, alter, octave);
}

/**
 * 创建音程
 * @param type 类型(p/maj/min/aug/dim)
 * @param num 度数
 */
inline Interval getInterval(const std::string& type, int num) {
    return Interval(type, num);
}

/**
 * 创建音阶
 * @param step 主音名(大小写不敏感)
 * @param alter 主音变化音
 * @param mode 调式 ID(如 "NATURAL_MAJOR")
 */
inline Scale getScale(std::string step, int alter, const std::string& mode) {
    for (auto& c : step) c = static_cast<char>(std::toupper(c));
    // 从 step+alter 查 pianoKeyId
    auto& dl = DataLoader::instance();
    const json* meta = dl.findNote(step, alter);
    if (!meta) throw ScaleError("Invalid root note: " + step);
    return Scale((*meta)["pianoKeyId"], mode);
}

/**
 * 创建和弦
 * @param step 根音名(大小写不敏感)
 * @param alter 根音变化音
 * @param formulaId 和弦公式 ID(如 "maj3")
 */
inline Chord getChord(std::string step, int alter, const std::string& formulaId) {
    for (auto& c : step) c = static_cast<char>(std::toupper(c));
    auto& dl = DataLoader::instance();
    const json* meta = dl.findNote(step, alter);
    if (!meta) throw ChordError("Invalid root note: " + step);
    return Chord((*meta)["pianoKeyId"], formulaId);
}

} // namespace music12
