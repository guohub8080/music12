/**
 * music12-cpp · Base7Radix 七进制数类
 *
 * 移植自 music12 TS 版 src/common/radix/base/Base7Radix.ts
 * 用于音阶级数计算(7 个自然音级)
 */
#pragma once
#include "Radix.hpp"
#include <array>

namespace music12 {

class Base7Radix : public Radix {
public:
    explicit Base7Radix(int num) : Radix(num, 7) {}

    static Base7Radix fromArray(const std::array<int, 2>& digits) {
        return Base7Radix(digits[0] * 7 + digits[1]);
    }

    /** 高位(八度数) */
    int firstDigit() const { return digitPair()[0]; }

    /** 低位(音级索引) */
    int lastDigit() const { return digitPair()[1]; }

    Base7Radix add(int num) const { return Base7Radix(base10() + num); }
};

} // namespace music12
