/**
 * music12-cpp · DataLoader
 *
 * 移植自 music12 TS 版 src/data-loader.ts
 * 从 shared/data/*.json 加载数据,提供查询接口。
 *
 * C++ 版用 nlohmann/json 解析,启动时加载一次,之后常驻内存。
 */
#pragma once
#include <nlohmann/json.hpp>
#include <string>
#include <vector>
#include <unordered_map>
#include <optional>
#include <fstream>
#include <stdexcept>

namespace music12 {

using json = nlohmann::json;

class DataLoaderError : public std::runtime_error {
public:
    explicit DataLoaderError(const std::string& msg) : std::runtime_error(msg) {}
};

/**
 * 数据加载器:单例,启动时加载所有 JSON
 *
 * 用法:
 *   auto& dl = DataLoader::instance();
 *   dl.loadFromDirectory("/path/to/shared/data");
 *   auto note = dl.findNote("C", 0);  // 查 C 自然音
 */
class DataLoader {
public:
    static DataLoader& instance() {
        static DataLoader inst;
        return inst;
    }

    /** 从目录加载所有 JSON */
    void loadFromDirectory(const std::string& dirPath) {
        m_notes = loadJson(dirPath + "/notes.json");
        m_intervals = loadJson(dirPath + "/intervals.json");
        m_fifth = loadJson(dirPath + "/fifth.json");
        m_chordFormulas = loadJson(dirPath + "/chord-formulas.json");
        m_scaleModes = loadJson(dirPath + "/scale-modes.json");
        m_chordInstances = loadJson(dirPath + "/chord-instances.json");
        m_scaleInstances = loadJson(dirPath + "/scale-instances.json");
        m_loaded = true;
    }

    bool isLoaded() const { return m_loaded; }

    // ==================== 基础元数据 ====================

    /** 查找音符元数据(step + alter) */
    const json* findNote(const std::string& step, int alter) const {
        for (const auto& item : m_notes) {
            if (item["step"] == step && item["alter"] == alter) return &item;
        }
        return nullptr;
    }

    /** 按 pianoKeyId 查找所有等音异名(isNormal 优先) */
    std::vector<json> findNotesByPianoKeyId(int pianoKeyId) const {
        std::vector<json> result;
        for (const auto& item : m_notes) {
            if (item["pianoKeyId"] == pianoKeyId) result.push_back(item);
        }
        return result;
    }

    /** 查找音程元数据(type + num) */
    const json* findInterval(const std::string& type, int num) const {
        for (const auto& item : m_intervals) {
            if (item["type"] == type && item["num"] == num) return &item;
        }
        return nullptr;
    }

    // ==================== 定义表 ====================

    const json& chordFormulas() const { return m_chordFormulas; }
    const json& scaleModes() const { return m_scaleModes; }

    const json* findChordFormula(const std::string& id) const {
        if (m_chordFormulas.contains(id)) return &m_chordFormulas[id];
        return nullptr;
    }

    const json* findScaleMode(const std::string& id) const {
        if (m_scaleModes.contains(id)) return &m_scaleModes[id];
        return nullptr;
    }

    // ==================== 派生实例表 ====================

    /** 查找音阶实例(rootPianoKeyId + scaleModeId) */
    const json* findScaleInstance(int rootPianoKeyId, const std::string& scaleModeId) const {
        for (const auto& item : m_scaleInstances) {
            if (item["pianoKeyIdRoot"] == rootPianoKeyId && item["scaleModeId"] == scaleModeId) {
                return &item;
            }
        }
        return nullptr;
    }

    /** 查找和弦实例(全部根音) */
    std::vector<const json*> findChordInstances(const std::string& chordFormulaId) const {
        std::vector<const json*> result;
        for (const auto& item : m_chordInstances) {
            if (item["chordFormulaId"] == chordFormulaId) {
                result.push_back(&item);
            }
        }
        return result;
    }

    /** 查找和弦实例(特定根音) */
    const json* findChordInstance(int rootPianoKeyId, const std::string& chordFormulaId) const {
        for (const auto& item : m_chordInstances) {
            if (item["pianoKeyIdRoot"] == rootPianoKeyId && item["chordFormulaId"] == chordFormulaId) {
                return &item;
            }
        }
        return nullptr;
    }

    /** 全部和弦实例(供 findChord 反查用) */
    const json& allChordInstances() const { return m_chordInstances; }

    // ==================== 五度圈 ====================

    const json& fifthData() const { return m_fifth; }

private:
    DataLoader() = default;

    static json loadJson(const std::string& path) {
        std::ifstream file(path);
        if (!file.is_open()) {
            throw DataLoaderError("Cannot open: " + path);
        }
        json data;
        file >> data;
        return data;
    }

    json m_notes;
    json m_intervals;
    json m_fifth;
    json m_chordFormulas;
    json m_scaleModes;
    json m_chordInstances;
    json m_scaleInstances;
    bool m_loaded = false;
};

} // namespace music12
