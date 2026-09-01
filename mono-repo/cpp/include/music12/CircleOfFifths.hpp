/**
 * music12-cpp · CircleOfFifths 五度圈
 *
 * 移植自 music12 TS 版 src/CircleOfFifths/
 */
#pragma once
#include "DataLoader.hpp"
#include <string>
#include <stdexcept>

namespace music12 {

/**
 * 五度圈:用 circleID(0-12)表示位置
 * circleID 6 = C 大调(0 升降),0 = 7 降,12 = 7 升
 */
class CircleOfFifths {
public:
    int circleID;
    // 对齐 TS 版 Base12Radix 的自有属性(实例序列化结果为 {"radixBase": 12})
    static constexpr int radixBase = 12;

    explicit CircleOfFifths(int id) : circleID(id) {
        if (id < 0 || id > 12) {
            throw std::runtime_error("circleID must be 0-12");
        }
    }

    /** 大调圈位置(0-12) */
    int majCircle() const { return circleID; }

    /** 小调圈位置(大调 -3,绕回) */
    int minCircle() const {
        int c = circleID - 3;
        if (c < 0) c += 12;
        return c;
    }

    /** 调号数量(负=降号,正=升号) */
    int alterValue() const {
        // circleID = alters mod 12, 但多圈映射
        // 从 FIFTH_META 反查最准确
        auto& dl = DataLoader::instance();
        for (const auto& item : dl.fifthData()) {
            if (item["circleID"] == circleID && item["mode"] == "major") {
                int alters = item["rawStaveAlters"];
                if (alters >= -7 && alters <= 7) return alters;
            }
        }
        return circleID;  // fallback
    }
};

/**
 * 根据调号数量(升降号数)获取五度圈
 * @param alter 调号数量(-7 到 7)
 */
inline CircleOfFifths getFifthCircleByAlter(int alter) {
    auto& dl = DataLoader::instance();
    for (const auto& item : dl.fifthData()) {
        if (item["rawStaveAlters"] == alter) {
            return CircleOfFifths(item["circleID"]);
        }
    }
    throw std::runtime_error("No circle found for alter value " + std::to_string(alter));
}

} // namespace music12
