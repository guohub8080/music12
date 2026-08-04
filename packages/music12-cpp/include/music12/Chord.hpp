/**
 * music12-cpp · Chord 和弦类(完整版:含变换面板 set/sus/omit)
 *
 * 移植自 music12 TS 版 src/Chord/cls/ChordClass.ts
 *
 * 变换机制:
 *   baseIntervalList(和弦公式) + transformPanel(用户变换) = intervalPanel
 *   pianoKeyIds = 从 intervalPanel 用 Interval 算
 */
#pragma once
#include "DataLoader.hpp"
#include "Interval.hpp"
#include <string>
#include <vector>
#include <map>
#include <optional>
#include <stdexcept>
#include <algorithm>
#include <sstream>
#include <cctype>

namespace music12 {

class ChordError : public std::runtime_error {
public:
    explicit ChordError(const std::string& msg) : std::runtime_error(msg) {}
};

/**
 * 变换值:可以是音程类型、omit、或空(未设置)
 * - 值 "maj"/"min"/"p"/"aug"/"dim" → 设置该度数的音程类型
 * - 值 "omit" → 省略该度数
 * - 空 → 未变换
 */
using TransformValue = std::optional<std::string>;

/** 变换面板:度数 → 变换值 */
using TransformPanel = std::map<int, TransformValue>;

/**
 * 度数 → 音程类型(应用变换后,不含 omit)
 * 值为空表示该度数无音
 */
using IntervalPanel = std::map<int, std::optional<std::string>>;

class Chord {
public:
    const int rootPianoKeyId;
    const std::string chordFormulaId;

private:
    // 基础音程列表(从和弦公式读): [(type, degree), ...]
    std::vector<std::pair<std::string, int>> m_baseIntervalList;
    // 基础度数→类型映射(从和弦公式读)
    std::map<int, std::string> m_baseDegreeMap;
    // 变换面板
    TransformPanel m_transform;

    // 缓存
    mutable bool m_cacheValid = false;
    mutable IntervalPanel m_cachedPanel;
    mutable std::vector<int> m_cachedPianoKeyIds;
    mutable int m_cachedNotesNum;

public:
    std::string cnName;
    std::string baseSymbol;
    std::string family;

    Chord(int rootId, const std::string& formulaId)
        : rootPianoKeyId(rootId), chordFormulaId(formulaId) {
        if (rootId < 0 || rootId > 11) {
            throw ChordError("rootPianoKeyId must be 0-11");
        }
        auto& dl = DataLoader::instance();
        if (!dl.isLoaded()) throw ChordError("DataLoader not loaded.");

        const json* formula = dl.findChordFormula(formulaId);
        if (!formula) {
            throw ChordError("Chord formula not found: " + formulaId);
        }

        cnName = (*formula)["cnName"];
        baseSymbol = (*formula).value("scoreDisplay", "");
        family = (*formula)["family"];

        // 读 baseIntervalList: [[type, degree], ...]
        for (const auto& item : (*formula)["intervalList"]) {
            // intervalList 可能是 [[type, num]] 嵌套
            if (item.is_array() && item.size() == 2) {
                std::string type = item[0];
                int degree = item[1];
                m_baseIntervalList.push_back({type, degree});
                m_baseDegreeMap[degree] = type;
            }
        }
    }

    // ==================== 变换操作 ====================

    /**
     * 设置和弦度数
     * @param input 度数(2/3/4/5/6/7/9/11/13)
     * @param alter 0=自然, 1=升号(#), -1=降号(b)
     * @return *this(链式)
     */
    Chord& set(int degree, int alter = 0) {
        static const std::map<int, std::string> DEFAULT_INTERVAL = {
            {2, "maj"}, {3, "maj"}, {4, "p"}, {5, "p"},
            {6, "maj"}, {7, "maj"}, {9, "maj"}, {11, "p"}, {13, "maj"}
        };
        auto it = DEFAULT_INTERVAL.find(degree);
        if (it == DEFAULT_INTERVAL.end()) {
            throw ChordError("Invalid degree: " + std::to_string(degree));
        }
        const std::string& defaultType = it->second;
        std::string intervalType;
        if (alter > 0) {
            // 升号:大/纯 → aug
            intervalType = "aug";
        } else if (alter < 0) {
            // 降号:大→min, 纯→dim
            intervalType = (defaultType == "maj") ? "min" : "dim";
        } else {
            intervalType = defaultType;
        }
        m_transform[degree] = intervalType;
        invalidateCache();
        return *this;
    }

    /** set 字符串输入(如 "#2", "b3", "7") */
    Chord& set(const std::string& input) {
        // 解析 [b#]?数字[b#]?
        std::string normalized;
        for (char c : input) {
            normalized += static_cast<char>(std::toupper(c) == 'B' ? 'b' : std::toupper(c));
        }
        // 找数字
        size_t i = 0;
        int alterSign = 0;
        while (i < normalized.size() && (normalized[i] == '#' || normalized[i] == 'b')) {
            if (normalized[i] == '#') alterSign++;
            else alterSign--;
            i++;
        }
        std::string numStr;
        while (i < normalized.size() && std::isdigit(static_cast<unsigned char>(normalized[i]))) {
            numStr += normalized[i];
            i++;
        }
        while (i < normalized.size() && (normalized[i] == '#' || normalized[i] == 'b')) {
            if (normalized[i] == '#') alterSign++;
            else alterSign--;
            i++;
        }
        if (numStr.empty()) throw ChordError("Invalid degree input: " + input);
        int degree = std::stoi(numStr);
        return set(degree, alterSign);
    }

    /**
     * sus(挂留):把某度数替换为 2 或 4
     * @param susNum 2 或 4,默认 4
     * @return *this(链式)
     */
    Chord& setSus(int susNum = 4) {
        if (susNum != 2 && susNum != 4) {
            throw ChordError("susNum must be 2 or 4");
        }
        // 先 omit 3 度,再设置 susNum 为纯音程(p)
        // sus2 = 纯二度(但 INTERVAL_META 里 2 度的 p 不存在,用 maj2)
        // sus4 = 纯四度(p4)
        m_transform[3] = "omit";
        m_transform[susNum] = (susNum == 4) ? "p" : "maj";
        invalidateCache();
        return *this;
    }

    /**
     * 省略某度数
     * @return *this(链式)
     */
    Chord& setOmit(int degree) {
        m_transform[degree] = "omit";
        invalidateCache();
        return *this;
    }

    /** 清除所有变换 */
    void clearTransform() {
        m_transform.clear();
        invalidateCache();
    }

    // ==================== 计算属性(每次重算,有缓存)====================

    /** 应用变换后的音程面板 */
    const IntervalPanel& intervalPanel() const {
        ensureCache();
        return m_cachedPanel;
    }

    /** 应用变换后的音程列表 */
    std::vector<std::pair<std::string, int>> intervalList() const {
        std::vector<std::pair<std::string, int>> result;
        for (const auto& [degree, typeOpt] : intervalPanel()) {
            if (typeOpt.has_value()) {
                result.push_back({typeOpt.value(), degree});
            }
        }
        std::sort(result.begin(), result.end(),
                  [](const auto& a, const auto& b) { return a.second < b.second; });
        return result;
    }

    /** 钢琴键 ID 列表(按度数顺序) */
    const std::vector<int>& pianoKeyIds() const {
        ensureCache();
        return m_cachedPianoKeyIds;
    }

    /** 排序后的钢琴键 ID */
    std::vector<int> pianoKeyIdsSorted() const {
        auto result = pianoKeyIds();
        std::sort(result.begin(), result.end());
        return result;
    }

    /** 音符数量 */
    int notesNum() const {
        ensureCache();
        return m_cachedNotesNum;
    }

    /** 是否有变换 */
    bool isTransformed() const {
        return !m_transform.empty();
    }

    /** 变换面板(只读) */
    const TransformPanel& transformPanel() const {
        return m_transform;
    }

private:
    void invalidateCache() { m_cacheValid = false; }

    void ensureCache() const {
        if (m_cacheValid) return;

        // 1. 构建 intervalPanel(空模板)
        m_cachedPanel.clear();
        for (int d : {2, 3, 4, 5, 6, 7, 9, 11, 13}) {
            m_cachedPanel[d] = std::nullopt;
        }

        // 2. 填充基础音程
        for (const auto& [degree, type] : m_baseDegreeMap) {
            m_cachedPanel[degree] = type;
        }

        // 3. 应用变换
        for (const auto& [degree, value] : m_transform) {
            if (value.has_value()) {
                if (value.value() == "omit") {
                    m_cachedPanel[degree] = std::nullopt;
                } else {
                    m_cachedPanel[degree] = value.value();
                }
            }
        }

        // 4. 从 intervalPanel 计算 pianoKeyIds
        m_cachedPianoKeyIds.clear();
        m_cachedPianoKeyIds.push_back(rootPianoKeyId); // 根音

        for (const auto& [degree, typeOpt] : m_cachedPanel) {
            if (typeOpt.has_value()) {
                Interval interval(typeOpt.value(), degree);
                int targetKeyId = (rootPianoKeyId + interval.semitoneGap) % 12;
                if (targetKeyId < 0) targetKeyId += 12;
                m_cachedPianoKeyIds.push_back(targetKeyId);
            }
        }

        // 去重(根音可能在 intervalPanel 里也出现)
        std::sort(m_cachedPianoKeyIds.begin(), m_cachedPianoKeyIds.end());
        m_cachedPianoKeyIds.erase(
            std::unique(m_cachedPianoKeyIds.begin(), m_cachedPianoKeyIds.end()),
            m_cachedPianoKeyIds.end()
        );

        m_cachedNotesNum = static_cast<int>(m_cachedPianoKeyIds.size());
        m_cacheValid = true;
    }
};

} // namespace music12
