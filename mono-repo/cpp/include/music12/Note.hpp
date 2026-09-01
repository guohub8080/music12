/**
 * music12-cpp · Note 音符类
 *
 * 移植自 music12 TS 版 src/Note/cls/NoteClass.ts
 * 表示一个具有绝对音高的音符。
 *
 * 构造时从 DataLoader 查 NOTE_META 填充属性。
 */
#pragma once
#include "DataLoader.hpp"
#include "NoteTypes.hpp"
#include <string>
#include <stdexcept>

namespace music12 {

class Interval; // 前向声明

class NoteError : public std::runtime_error {
public:
    explicit NoteError(const std::string& msg) : std::runtime_error(msg) {}
};

class Note {
public:
    int octave;
    std::string step;
    int alter;
    std::string artName;
    std::string mathName;
    int fifthValue;
    bool isNormal;
    bool isBlack;
    int pianoKeyId;
    int semitone;     // semitoneWithinOctave,相对 C 的半音偏移
    int stepId;

    /**
     * 构造音符
     * @param step 音名(C/D/E/F/G/A/B)
     * @param alter 变化音(-2 到 2)
     * @param octave 八度数
     */
    Note(std::string_view step = "C", int alter = 0, int octave = 4)
        : octave(octave), step(step), alter(alter) {
        auto& dl = DataLoader::instance();
        if (!dl.isLoaded()) {
            throw NoteError("DataLoader not loaded. Call DataLoader::loadFromDirectory() first.");
        }
        // 查 NOTE_META
        std::string upperStep(step);
        // 大写化
        for (auto& c : upperStep) c = std::toupper(c);

        const json* meta = dl.findNote(upperStep, alter);
        if (!meta) {
            throw NoteError("Note \"" + std::string(step) + std::to_string(alter) + "\" not found in metadata.");
        }
        fillFromMeta(*meta);
    }

    /** MIDI 音高值(绝对音高,C4=60) */
    int pitchValue() const {
        return octave * 12 + semitone;
    }

    /** 简洁描述(如 "C#4") */
    std::string simpleDescription() const {
        return artName + std::to_string(octave);
    }

    /**
     * 半音移动,返回新 Note
     * 移植自 cls_semitoneMove
     */
    Note semitoneMove(int moveStep) const;

    /**
     * 根据音程计算目标音符
     * 移植自 cls_getNoteByInterval
     */
    Note getNoteByInterval(const Interval& interval, bool isAscending = true) const;

    /**
     * 获取同音高(等音异名)的音符列表
     * 移植自 cls_getSamePitchNotes
     */
    std::vector<Note> getSamePitchNotes(bool isSelfIncluded = false, int alterAbsLte = 2) const;

private:
    void fillFromMeta(const json& meta) {
        artName = meta["artName"];
        mathName = meta["mathName"];
        fifthValue = meta["fifthValue"];
        isNormal = meta["isNormal"];
        isBlack = meta["isBlack"];
        pianoKeyId = meta["pianoKeyId"];
        semitone = meta["semitone"];
        stepId = meta["stepId"];
        step = meta["step"];
        // alter 和 octave 从构造参数来,不从 meta 取
    }
};

} // namespace music12
