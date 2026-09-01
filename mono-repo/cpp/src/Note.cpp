/**
 * music12-cpp · Note 方法实现
 *
 * 移植自 music12 TS 版:
 * - src/Note/cls/classFn/cls_semitoneMove.ts
 * - src/Note/cls/classFn/cls_getNoteByInterval.ts
 * - src/Note/cls/classFn/cls_getSamePitchNotes.ts
 */
#include "Note.hpp"
#include "Interval.hpp"
#include "PianoKey.hpp"
#include "StepRadix.hpp"
#include <algorithm>

namespace music12 {

Note Note::semitoneMove(int moveStep) const {
    if (moveStep == 0) return *this;

    PianoKey endKey = PianoKey::fromPitchInt(pitchValue() + moveStep);
    auto notes = endKey.getNotes(true, 1); // isNormal, alterAbsLte=1

    if (notes.empty()) {
        throw NoteError("No note found at semitone move " + std::to_string(moveStep));
    }

    // 优先找 alter === 0 的自然音
    for (const auto& n : notes) {
        if (n.alter == 0) return n;
    }

    // 没有自然音:向上选升号,向下选降号
    if (moveStep > 0) {
        for (const auto& n : notes) {
            if (n.alter > 0) return n;
        }
    } else {
        for (const auto& n : notes) {
            if (n.alter < 0) return n;
        }
    }

    // fallback:返回第一个
    return notes[0];
}

Note Note::getNoteByInterval(const Interval& interval, bool isAscending) const {
    // 计算目标音级(基于七进制)
    StepRadix baseStep(std::string(step));
    // baseStep 用的是 [octave, step] 组合,需要重建
    StepRadix fullBase(octave * 7 + getIndexByStep(step));

    StepRadix targetStep = isAscending
        ? fullBase.add(interval.num - 1)
        : fullBase.add((interval.num - 1) * -1);

    // 计算目标半音位置(基于十二进制)
    int targetPitch = isAscending
        ? pitchValue() + interval.semitoneGap
        : pitchValue() - interval.semitoneGap;

    PianoKey targetPianoKey = PianoKey::fromPitchInt(targetPitch);

    // 在 NOTE_META 中查找同时满足音级和半音位置的音符
    auto& dl = DataLoader::instance();
    for (const auto& meta : dl.findNotesByPianoKeyId(targetPianoKey.pianoKeyId)) {
        if (meta["step"] == targetStep.step()) {
            return Note(
                meta["step"].get<std::string>(),
                meta["alter"],
                targetStep.octave()
            );
        }
    }

    throw NoteError("No matching note found for the given interval.");
}

std::vector<Note> Note::getSamePitchNotes(bool isSelfIncluded, int alterAbsLte) const {
    std::vector<Note> result;
    auto& dl = DataLoader::instance();
    auto candidates = dl.findNotesByPianoKeyId(pianoKeyId);
    for (const auto& meta : candidates) {
        int metaAlter = meta["alter"];
        if (std::abs(metaAlter) > alterAbsLte) continue;
        if (!isSelfIncluded && meta["step"] == step && meta["alter"] == alter) continue;
        result.emplace_back(
            meta["step"].get<std::string>(),
            metaAlter,
            octave
        );
    }
    return result;
}

} // namespace music12
