/**
 * music12-cpp · StepRadix 音级进制类
 *
 * 移植自 music12 TS 版 src/common/radix/music/StepRadix.ts
 * 用于表示音符的音级位置(基于七进制)
 */
#pragma once
#include "Base7Radix.hpp"
#include "NoteTypes.hpp"
#include <string>
#include <variant>

namespace music12 {

class IntervalRadix;

class StepRadix : public Base7Radix {
public:
    /** 从数字索引创建 */
    explicit StepRadix(int index) : Base7Radix(index) {}

    /** 从音名(C/D/E/F/G/A/B)创建 */
    explicit StepRadix(std::string_view step) : Base7Radix(getIndexByStep(step)) {}

    /** 音名(C, D, E...) */
    std::string_view step() const { return getStepByIndex(digitPair()[1]); }

    /** 八度数 */
    int octave() const { return digitPair()[0]; }

    /** 音级索引(0-6) */
    int stepId() const { return digitPair()[1]; }

    StepRadix add(int num) const { return StepRadix(base10() + num); }

    int getGap(const StepRadix& other) const {
        return other.base10() - base10();
    }

    /** 计算到另一个音级的音程 */
    IntervalRadix getIntervalGap(const StepRadix& other) const;
};

} // namespace music12
