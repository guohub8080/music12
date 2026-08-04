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
            "../../../shared/data",      // 从 build 目录
            "../../../../shared/data",   // 从 build/packages/ 目录
            "../../shared/data",         // 从 build/packages/music12-cpp/
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
    EXPECT_EQ(cMaj.pianoKeyIds, std::vector<int>({0, 4, 7}));
    EXPECT_EQ(cMaj.notesNum, 3);
}

TEST_F(Music12Test, ChordCMinor) {
    music12::Chord cMin(0, "min3");
    EXPECT_EQ(cMin.pianoKeyIds, std::vector<int>({0, 3, 7}));
}

TEST_F(Music12Test, ChordC7) {
    music12::Chord c7(0, "dom7");
    EXPECT_EQ(c7.pianoKeyIds, std::vector<int>({0, 4, 7, 10}));
}

// ==================== PianoKey 测试 ====================

TEST_F(Music12Test, PianoKeyFromPitch) {
    auto pk = music12::PianoKey::fromPitchInt(60);  // C4 = MIDI 60... 但 TS 用 octave*12+semitone
    EXPECT_EQ(pk.octave, 5);  // 60/12 = 5
}
