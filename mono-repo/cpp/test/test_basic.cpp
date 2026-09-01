/**
 * music12-cpp · 基础测试
 *
 * 验证 C++ 版能正确加载 JSON + 构造 Note/Interval/Scale/Chord
 */
#include <gtest/gtest.h>
#include "Note.hpp"
#include "Interval.hpp"
#include "Scale.hpp"
#include "Chord.hpp"
#include "PianoKey.hpp"
#include "Radix.hpp"
#include "StepRadix.hpp"
#include "IntervalRadix.hpp"
#include "Stave.hpp"
#include "CircleOfFifths.hpp"
#include "Factory.hpp"
#include "Find.hpp"
#include <filesystem>

// 测试固件:加载 JSON 数据
class Music12Test : public ::testing::Test {
protected:
    static void SetUpTestSuite() {
        // 找 shared/data 目录(相对于测试可执行文件的位置)
        namespace fs = std::filesystem;
        auto& dl = music12::DataLoader::instance();

        // 尝试几个可能的路径
        std::vector<std::string> candidates = {
            "../../../shared/data",      // 从 build 目录(mono-repo/cpp/build)
            "../../../../shared/data",   // 从更深的构建目录
            "../../shared/data",         // 从 mono-repo/cpp/
            "shared/data",               // 从项目根
        };
        // 加上绝对路径
        const char* projRoot = std::getenv("MUSIC12_ROOT");
        if (projRoot) {
            candidates.insert(candidates.begin(), std::string(projRoot) + "/shared/data");
        }

        for (const auto& path : candidates) {
            try {
                dl.loadFromDirectory(path);
                if (dl.isLoaded()) {
                    std::cout << "Loaded JSON from: " << path << std::endl;
                    return;
                }
            } catch (...) {
                // 继续尝试下一个路径
            }
        }
        FAIL() << "Cannot find shared/data/ directory. Set MUSIC12_ROOT env var.";
    }
};

// ==================== Radix 测试 ====================

TEST(RadixTest, DigitPairBase7) {
    music12::Base7Radix r(13);  // 13 = 1*7 + 6
    auto dp = r.digitPair();
    EXPECT_EQ(dp[0], 1);
    EXPECT_EQ(dp[1], 6);
}

TEST(RadixTest, DigitPairNegativeBase7) {
    music12::Base7Radix r(-13);  // -13 → [-2, 1]
    auto dp = r.digitPair();
    EXPECT_EQ(dp[0], -2);
    EXPECT_EQ(dp[1], 1);
}

TEST(RadixTest, StepRadix) {
    music12::StepRadix c("C");
    EXPECT_EQ(c.stepId(), 0);
    music12::StepRadix g("G");
    EXPECT_EQ(g.stepId(), 4);
}

TEST(RadixTest, IntervalRadix) {
    music12::IntervalRadix octave(8);  // 八度
    EXPECT_EQ(octave.intervalNum(), 8);
    EXPECT_EQ(octave.intervalNumWithinOctave(), 1);
    EXPECT_EQ(octave.octave(), 1);
}

// ==================== Note 测试 ====================

TEST_F(Music12Test, NoteConstructor) {
    music12::Note c4("C", 0, 4);
    EXPECT_EQ(c4.pianoKeyId, 0);
    EXPECT_EQ(c4.semitone, 0);
    EXPECT_EQ(c4.pitchValue(), 48);  // 4*12+0
    EXPECT_FALSE(c4.isBlack);
    EXPECT_TRUE(c4.isNormal);
}

TEST_F(Music12Test, NoteSharp) {
    music12::Note cSharp("C", 1, 4);
    EXPECT_EQ(cSharp.pianoKeyId, 1);
    EXPECT_TRUE(cSharp.isBlack);
    EXPECT_EQ(cSharp.artName, "C\u266F");  // C♯ (Unicode 音符升号)
}

TEST_F(Music12Test, NoteFlat) {
    music12::Note eFlat("E", -1, 4);
    EXPECT_EQ(eFlat.pianoKeyId, 3);  // Eb = pianoKeyId 3
    EXPECT_TRUE(eFlat.isBlack);
}

TEST_F(Music12Test, NoteSemitoneMove) {
    music12::Note c4("C", 0, 4);
    auto g = c4.semitoneMove(7);  // 上行纯五度
    EXPECT_EQ(g.step, "G");
    EXPECT_EQ(g.alter, 0);

    auto b = c4.semitoneMove(-1);  // 下行小二度
    EXPECT_EQ(b.step, "B");
    EXPECT_EQ(b.octave, 3);
}

TEST_F(Music12Test, NoteGetNoteByInterval) {
    music12::Note c4("C", 0, 4);
    music12::Interval maj3("maj", 3);
    auto e = c4.getNoteByInterval(maj3);
    EXPECT_EQ(e.step, "E");
    EXPECT_EQ(e.alter, 0);

    music12::Interval p5("p", 5);
    auto g = c4.getNoteByInterval(p5);
    EXPECT_EQ(g.step, "G");
}

// ==================== Interval 测试 ====================

TEST_F(Music12Test, IntervalConstructor) {
    music12::Interval p5("p", 5);
    EXPECT_EQ(p5.semitoneGap, 7);
    EXPECT_TRUE(p5.isNatural);

    music12::Interval maj3("maj", 3);
    EXPECT_EQ(maj3.semitoneGap, 4);
}

// ==================== Scale 测试 ====================

TEST_F(Music12Test, ScaleCMajor) {
    music12::Scale cMajor(0, "NATURAL_MAJOR");
    EXPECT_EQ(cMajor.pianoKeyIds, std::vector<int>({0, 2, 4, 5, 7, 9, 11}));
}

TEST_F(Music12Test, ScaleAllRoots) {
    // 12 个根音 × 几个调式
    for (int root = 0; root < 12; root++) {
        music12::Scale s(root, "NATURAL_MAJOR");
        EXPECT_EQ(s.pianoKeyIds.size(), 7u);
    }
}

// ==================== Chord 测试 ====================

TEST_F(Music12Test, ChordCMajor) {
    music12::Chord cMaj(0, "maj3");
    EXPECT_EQ(cMaj.pianoKeyIds(), std::vector<int>({0, 4, 7}));
    EXPECT_EQ(cMaj.notesNum(), 3);
}

TEST_F(Music12Test, ChordCMinor) {
    music12::Chord cMin(0, "min3");
    EXPECT_EQ(cMin.pianoKeyIds(), std::vector<int>({0, 3, 7}));
}

TEST_F(Music12Test, ChordC7) {
    music12::Chord c7(0, "dom7");
    EXPECT_EQ(c7.pianoKeyIds(), std::vector<int>({0, 4, 7, 10}));
}

// ==================== Chord 变换面板测试 ====================

TEST_F(Music12Test, ChordSet7) {
    // C 大三 + set(7) = Cmaj7(大七度 = 11 半音,不是属七的 10)
    music12::Chord c(0, "maj3");
    c.set(7);
    EXPECT_TRUE(c.isTransformed());
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 4, 7, 11}));
}

TEST_F(Music12Test, ChordSetSus4) {
    // C 大三 + sus4 = Csus4 (omit 3, add 4 → [0, 5, 7])
    music12::Chord c(0, "maj3");
    c.setSus(4);
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 5, 7}));
}

TEST_F(Music12Test, ChordSetString) {
    // set("b3") = 小三度 → Cm
    music12::Chord c(0, "maj3");
    c.set("b3");
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 3, 7}));
}

TEST_F(Music12Test, ChordOmit) {
    // C7 omit 7 = C 大三
    music12::Chord c(0, "dom7");
    c.setOmit(7);
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 4, 7}));
}

TEST_F(Music12Test, ChordClearTransform) {
    music12::Chord c(0, "maj3");
    c.set(7);
    EXPECT_TRUE(c.isTransformed());
    c.clearTransform();
    EXPECT_FALSE(c.isTransformed());
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 4, 7}));
}

// ==================== PianoKey 测试 ====================

TEST_F(Music12Test, PianoKeyFromPitch) {
    auto pk = music12::PianoKey::fromPitchInt(60);  // C4 = MIDI 60... 但 TS 用 octave*12+semitone
    EXPECT_EQ(pk.octave, 5);  // 60/12 = 5
}

// ==================== Stave 测试 ====================

TEST_F(Music12Test, StaveSharps) {
    EXPECT_EQ(music12::getAlterStepListByNum(1), std::vector<std::string>({"F"}));
    EXPECT_EQ(music12::getAlterStepListByNum(2), std::vector<std::string>({"F", "C"}));
    EXPECT_EQ(music12::getAlterStepListByNum(7), std::vector<std::string>({"F","C","G","D","A","E","B"}));
}

TEST_F(Music12Test, StaveFlats) {
    EXPECT_EQ(music12::getAlterStepListByNum(-1), std::vector<std::string>({"B"}));
    EXPECT_EQ(music12::getAlterStepListByNum(-3), std::vector<std::string>({"B", "E", "A"}));
}

TEST_F(Music12Test, StaveZero) {
    EXPECT_TRUE(music12::getAlterStepListByNum(0).empty());
}

// ==================== CircleOfFifths 测试 ====================

TEST_F(Music12Test, CircleAlter) {
    auto c = music12::getFifthCircleByAlter(1);  // 1 升号 = G 大调
    EXPECT_EQ(c.alterValue(), 1);
}

TEST_F(Music12Test, CircleCMajor) {
    auto c = music12::getFifthCircleByAlter(0);  // 0 升降 = C 大调
    EXPECT_EQ(c.circleID, 0);  // circleID = alters mod 12
}

// ==================== Factory 测试 ====================

TEST_F(Music12Test, FactoryGetNote) {
    auto n = music12::getNote("c", 0, 4);  // 小写
    EXPECT_EQ(n.step, "C");
    EXPECT_EQ(n.octave, 4);
}

TEST_F(Music12Test, FactoryGetScale) {
    auto s = music12::getScale("C", 0, "NATURAL_MAJOR");
    EXPECT_EQ(s.pianoKeyIds, std::vector<int>({0, 2, 4, 5, 7, 9, 11}));
}

TEST_F(Music12Test, FactoryGetChord) {
    auto c = music12::getChord("C", 0, "maj3");
    EXPECT_EQ(c.pianoKeyIds(), std::vector<int>({0, 4, 7}));
}

// ==================== Find 测试 ====================

TEST_F(Music12Test, FindChordCMajor) {
    // C-E-G = MIDI 60-64-67 = pianoKeyId {0,4,7} = C 大三
    auto results = music12::findChord({60, 64, 67});
    EXPECT_FALSE(results.empty());
    bool foundMaj3 = false;
    for (const auto& r : results) {
        if (r.chordFormulaId == "maj3" && r.rootPianoKeyId == 0) {
            foundMaj3 = true;
            EXPECT_DOUBLE_EQ(r.similarity, 1.0);
        }
    }
    EXPECT_TRUE(foundMaj3);
}

TEST_F(Music12Test, FindChordCMinor) {
    // C-Eb-G = MIDI 60-63-67 = pianoKeyId {0,3,7} = C 小三
    auto results = music12::findChord({60, 63, 67});
    EXPECT_FALSE(results.empty());
    bool foundMin3 = false;
    for (const auto& r : results) {
        if (r.chordFormulaId == "min3") foundMin3 = true;
    }
    EXPECT_TRUE(foundMin3);
}

TEST_F(Music12Test, FindChordTooFew) {
    auto results = music12::findChord({60, 64});
    EXPECT_TRUE(results.empty());  // 少于 3 个音不查
}
