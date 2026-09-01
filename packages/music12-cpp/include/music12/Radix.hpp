/**
 * music12-cpp · Radix 进制基类
 *
 * 移植自 music12 TS 版 src/common/radix/base/Radix.ts
 * 用于表示任意进制数值,支持转换为数位对形式。
 *
 * 核心算法:digitPair = [floor(n/base), ((n%base)+base)%base]
 */
#pragma once
#include <stdexcept>
#include <array>

namespace music12 {

class RadixError : public std::runtime_error {
public:
    explicit RadixError(const std::string& msg) : std::runtime_error(msg) {}
};

/**
 * 进制基类
 * 用于表示任意进制数值,支持转换为数位对形式
 */
class Radix {
public:
    const int radixBase;

    Radix(int base10Value, int base) : radixBase(base), m_base10(base10Value) {}

    virtual ~Radix() = default;

    int base10() const { return m_base10; }

    /**
     * 从数位对创建 Radix 实例
     * @param digits [高位, 低位]
     * @param radixBase 进制基数
     */
    static Radix fromArray(const std::array<int, 2>& digits, int radixBase) {
        return Radix(digits[0] * radixBase + digits[1], radixBase);
    }

    /**
     * 转换为数位对 [圈数, 位置]
     * 位置永远为正数(模运算)
     *
     * 注意:C++ 整除向零取整(-13/7=-1),而 TS 的 Math.floor 向负无穷(-13/7=-2)。
     * 为与 TS 版等价,负数时需要用 floor 语义。
     */
    static int floorDiv(int a, int b) {
        int q = a / b;
        int r = a % b;
        if (r != 0 && ((r < 0) != (b < 0))) q--;
        return q;
    }

    std::array<int, 2> digitPair() const {
        int circle = floorDiv(m_base10, radixBase);
        int position = ((m_base10 % radixBase) + radixBase) % radixBase;
        return {circle, position};
    }

    /**
     * 计算与另一个 Radix 的差值
     */
    int getGap(const Radix& other) const {
        return other.m_base10 - m_base10;
    }

protected:
    int m_base10;
};

} // namespace music12
