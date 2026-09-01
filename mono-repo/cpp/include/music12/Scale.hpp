/**
 * music12-cpp · Scale 音阶类
 *
 * 移植自 music12 TS 版 src/Scale/cls/ScaleClass.ts
 * 构造时从 DataLoader 查 scale-instances.json。
 */
#pragma once
#include "DataLoader.hpp"
#include <string>
#include <vector>
#include <stdexcept>

namespace music12 {

class ScaleError : public std::runtime_error {
public:
    explicit ScaleError(const std::string& msg) : std::runtime_error(msg) {}
};

class Scale {
public:
    const int rootPianoKeyId;
    const std::string scaleModeId;

    /** 音阶所有音符的钢琴键 ID 列表 */
    std::vector<int> pianoKeyIds;
    /** 排序后的音符列表 */
    std::vector<int> pianoKeyIdsSorted;
    /** 调式名称 */
    std::string modeName;
    /** 调式类型(major/minor 等) */
    std::string type;

    Scale(int rootId, const std::string& modeId)
        : rootPianoKeyId(rootId), scaleModeId(modeId) {
        if (rootId < 0 || rootId > 11) {
            throw ScaleError("rootPianoKeyId must be 0-11");
        }
        auto& dl = DataLoader::instance();
        if (!dl.isLoaded()) throw ScaleError("DataLoader not loaded.");

        const json* inst = dl.findScaleInstance(rootId, modeId);
        if (!inst) {
            throw ScaleError("Scale not found: root=" + std::to_string(rootId) +
                             " mode=" + modeId);
        }

        // pianoKeyIds
        for (const auto& pk : (*inst)["pianoKeyIds"]) {
            pianoKeyIds.push_back(pk);
        }
        // pianoKeyIdsSorted
        for (const auto& pk : (*inst)["pianoKeyIdsSorted"]) {
            pianoKeyIdsSorted.push_back(pk);
        }

        // 从 scaleMode 取名称
        const json* modeMeta = dl.findScaleMode(modeId);
        if (modeMeta) {
            modeName = (*modeMeta)["name"];
            type = (*modeMeta)["type"];
        }
    }

    /** 检查某音是否在音阶中 */
    bool hasPianoKeyId(int id) const {
        return std::find(pianoKeyIds.begin(), pianoKeyIds.end(), id) != pianoKeyIds.end();
    }
};

} // namespace music12
