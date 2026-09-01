/**
 * music12-cpp · PianoKey 钢琴键类
 *
 * 移植自 music12 TS 版 src/PianoKey/cls/PianoKeyClass.ts
 */
#pragma once
#include "DataLoader.hpp"
#include "Note.hpp"
#include <vector>
#include <stdexcept>

namespace music12 {

class PianoKey {
public:
    int pianoKeyId;
    int octave;

    PianoKey(int id, int oct = 4) : pianoKeyId(id), octave(oct) {
        if (id < 0 || id > 11) throw std::runtime_error("pianoKeyId must be 0-11");
    }

    bool isBlack() const {
        auto& dl = DataLoader::instance();
        for (const auto& item : dl.findNotesByPianoKeyId(pianoKeyId)) {
            if (item["isBlack"].get<bool>()) return true;
        }
        return false;
    }

    int pitchValue() const {
        return octave * 12 + pianoKeyId;
    }

    static PianoKey fromPitchInt(int pitchInt) {
        int oct = pitchInt / 12;
        int id = ((pitchInt % 12) + 12) % 12;
        return PianoKey(id, oct);
    }

    static PianoKey fromNote(const std::string& step, int alter, int octave = 4) {
        auto& dl = DataLoader::instance();
        const json* meta = dl.findNote(step, alter);
        if (!meta) throw std::runtime_error("Invalid note: " + step);
        return PianoKey((*meta)["pianoKeyId"], octave);
    }

    /**
     * 获取该位置的所有音符(等音异名)
     * @param isNormalOnly 是否只获取常用音符
     * @param alterAbsLte 变化音绝对值上限(0/1/2)
     */
    std::vector<Note> getNotes(bool isNormalOnly = true, int alterAbsLte = 2) const {
        std::vector<Note> result;
        auto& dl = DataLoader::instance();
        auto candidates = dl.findNotesByPianoKeyId(pianoKeyId);
        for (const auto& meta : candidates) {
            if (isNormalOnly && !meta["isNormal"].get<bool>()) continue;
            int alter = meta["alter"];
            if (std::abs(alter) > alterAbsLte) continue;
            result.emplace_back(
                meta["step"].get<std::string>(),
                alter,
                octave
            );
        }
        return result;
    }

    PianoKey add(int num) const {
        int newPitch = pitchValue() + num;
        return fromPitchInt(newPitch);
    }
};

} // namespace music12
