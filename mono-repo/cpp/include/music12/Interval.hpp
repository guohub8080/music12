/**
 * music12-cpp · Interval 音程类
 *
 * 移植自 music12 TS 版 src/Interval/cls/IntervalClass.ts
 * 构造时从 DataLoader 查 INTERVAL_META。
 */
#pragma once
#include "DataLoader.hpp"
#include "IntervalRadix.hpp"
#include <string>
#include <stdexcept>

namespace music12 {

class IntervalError : public std::runtime_error {
public:
    explicit IntervalError(const std::string& msg) : std::runtime_error(msg) {}
};

class Interval {
public:
    std::string type;        // p / maj / min / aug / dim / aug+ / dim-
    std::string cnPrefix;    // 纯 / 大 / 小 / 增 / 减
    int num;                 // 音程数(原始,可能 > 7)
    int numWithinOctave;     // 八度内音程数(1-7)
    int semitoneGap;         // 总半音数
    int semitoneGapWithinOctave; // 八度内半音数
    int semitoneClockPosition;   // 半音时钟位置(0-11)
    int logicOctaveGap;      // 逻辑八度跨度(基于度数)
    int factOctaveGap;       // 实际八度跨度(基于半音)
    bool isNatural;

    /**
     * 构造音程
     * @param intervalType 类型(p/maj/min/aug/dim)
     * @param intervalNum 度数(1=一度,2=二度...)
     */
    Interval(const std::string& intervalType = "p", int intervalNum = 1)
        : type(intervalType), num(intervalNum) {
        if (intervalNum <= 0) throw IntervalError("Interval number cannot be zero or negative.");
        auto& dl = DataLoader::instance();
        if (!dl.isLoaded()) throw IntervalError("DataLoader not loaded.");

        // 用 IntervalRadix 算八度内度数 + 八度跨度
        IntervalRadix radix(intervalNum);
        numWithinOctave = radix.intervalNumWithinOctave();
        logicOctaveGap = radix.octave();

        // 查 INTERVAL_META
        const json* meta = dl.findInterval(intervalType, numWithinOctave);
        if (!meta) {
            throw IntervalError("Interval type does not match interval number: " +
                                intervalType + std::to_string(intervalNum));
        }

        cnPrefix = (*meta)["cnPrefix"];
        semitoneGapWithinOctave = (*meta)["semitoneGap"];
        semitoneClockPosition = (*meta)["semitoneClockPosition"];
        isNatural = (*meta)["isNatural"];
        int octaveGapFromMeta = (*meta)["octaveGap"];
        factOctaveGap = octaveGapFromMeta + logicOctaveGap;
        semitoneGap = semitoneGapWithinOctave + logicOctaveGap * 12;
    }

    /** 简洁描述(如 "纯五度") */
    std::string simpleDescription() const {
        // C++ 版不做中文数字转换,直接用数字
        return cnPrefix + std::to_string(num) + "度";
    }
};

} // namespace music12
