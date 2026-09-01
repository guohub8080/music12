/**
 * music12-cpp · Stave 调号工具
 *
 * 移植自 music12 TS 版 src/Stave/
 */
#pragma once
#include "DataLoader.hpp"
#include <vector>
#include <string>
#include <stdexcept>

namespace music12 {

// 五度圈的升号/降号顺序(固定规律)
constexpr std::array<const char*, 7> SHARP_ORDER = {"F", "C", "G", "D", "A", "E", "B"};
constexpr std::array<const char*, 7> FLAT_ORDER  = {"B", "E", "A", "D", "G", "C", "F"};

/**
 * 根据调号数量获取需要升降的音名列表
 * @param num 调号数量(正=升号,负=降号,范围 -7 到 7)
 */
inline std::vector<std::string> getAlterStepListByNum(int num) {
    if (num == 0) return {};
    if (num > 7 || num < -7) {
        throw std::runtime_error("Invalid num: must be between -7 and 7.");
    }
    std::vector<std::string> result;
    if (num > 0) {
        for (int i = 0; i < num; i++) result.push_back(SHARP_ORDER[i]);
    } else {
        int abs = -num;
        for (int i = 0; i < abs; i++) result.push_back(FLAT_ORDER[i]);
    }
    return result;
}

/**
 * 根据音符获取其可能所属的调性信息
 * 查 FIFTH_META:circleID 0-12,rawNoteStep + rawNoteAlter 匹配
 * 返回与 TS 版一致:完整元数据行数组(含 mode/circleID/rawStaveAlters 等全部字段)
 */
inline json getStaveAlterByNote(const std::string& step, int alter) {
    auto& dl = DataLoader::instance();
    json result = json::array();
    for (const auto& item : dl.fifthData()) {
        int circleID = item["circleID"];
        if (circleID < 0 || circleID > 12) continue;
        if (item["rawNoteStep"] == step && item["rawNoteAlter"] == alter) {
            result.push_back(item);
        }
    }
    if (result.empty()) {
        throw std::runtime_error("No matching scale found for note: " + step);
    }
    return result;
}

} // namespace music12
