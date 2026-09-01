/**
 * music12-cpp · ScaleRadix 音阶进制类
 *
 * 移植自 music12 TS 版 src/common/radix/music/ScaleRadix.ts
 * 音阶级数从 1 开始(I 级、II 级...),内部存储时减 1 转换为从 0 开始
 */
#pragma once
#include "Base7Radix.hpp"
#include <array>

namespace music12 {

class ScaleRadix {
public:
    explicit ScaleRadix(int scaleDegreeNum)
        : m_degreeNum(scaleDegreeNum - 1), m_radix(scaleDegreeNum - 1) {
        if (scaleDegreeNum < 1) throw RadixError("Scale degree number must be >= 1");
    }

    /** 总音阶级数(从 1 开始) */
    int base10() const { return m_degreeNum + 1; }

    /** 数位对 [八度数, 八度内音阶级数] */
    std::array<int, 2> digitPair() const {
        auto dp = m_radix.digitPair();
        return {dp[0], dp[1] + 1};
    }

    int octave() const { return digitPair()[0]; }
    int totalScaleDegrees() const { return base10(); }

    /** 八度内的音阶级数(1-7) */
    int scaleDegree() const { return digitPair()[1]; }

    ScaleRadix add(int num) const { return ScaleRadix(totalScaleDegrees() + num); }

private:
    int m_degreeNum;
    Base7Radix m_radix;
};

} // namespace music12
