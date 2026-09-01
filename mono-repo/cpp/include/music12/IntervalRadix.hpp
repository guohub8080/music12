/**
 * music12-cpp · IntervalRadix 音程进制类
 *
 * 移植自 music12 TS 版 src/common/radix/music/IntervalRadix.ts
 * 音程数从 1 开始(一度、二度...),内部存储时减 1 转换为从 0 开始
 */
#pragma once
#include "Base7Radix.hpp"
#include "StepRadix.hpp"
#include <array>

namespace music12 {

class IntervalRadix {
public:
    /** 音程数从 1 开始 */
    explicit IntervalRadix(int intervalNum)
        : m_base10(intervalNum - 1), m_radix(intervalNum - 1) {
        if (intervalNum < 1) throw RadixError("Interval number must be >= 1");
    }

    /** 音程数(从 1 开始) */
    int base10() const { return m_base10 + 1; }

    /** 数位对 [八度数, 八度内音程数] */
    std::array<int, 2> digitPair() const {
        auto dp = m_radix.digitPair();
        return {dp[0], dp[1] + 1};
    }

    /** 八度数 */
    int octave() const { return digitPair()[0]; }

    /** 音程数 */
    int intervalNum() const { return base10(); }

    /** 八度内的音程数(1-7) */
    int intervalNumWithinOctave() const { return digitPair()[1]; }

private:
    int m_base10;
    Base7Radix m_radix;
};

// StepRadix::getIntervalGap 的实现(需要 IntervalRadix 完整定义)
inline IntervalRadix StepRadix::getIntervalGap(const StepRadix& other) const {
    return IntervalRadix(1 + other.base10() - base10());
}

} // namespace music12
