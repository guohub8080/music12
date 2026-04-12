import { describe, it, expect } from 'vitest';
import { Interval } from '@music12/Interval/index';
import { Note } from '@music12/Note/index';

/**
 * Interval 测试
 *
 * 音程的核心概念：
 * 1. 音程由"类型"和"度数"组成，如"大三度"(M3)、"纯五度"(P5)
 * 2. 音程的半音数是客观的，但表示方式（类型+度数）有多种
 * 3. 等音程：半音数相同但名称不同的音程
 */

describe('Interval 基础验证', () => {
  describe('自然音程（大、小、纯）的半音数', () => {
    it('纯音程（1, 4, 5度）的半音数', () => {
      // 纯一度 = 0 半音
      expect(new Interval('p', 1).semitoneGap).toBe(0);

      // 纯四度 = 5 半音
      expect(new Interval('p', 4).semitoneGap).toBe(5);

      // 纯五度 = 7 半音
      expect(new Interval('p', 5).semitoneGap).toBe(7);

      // 纯八度 = 12 半音
      expect(new Interval('p', 8).semitoneGap).toBe(12);
    });

    it('大音程（2, 3, 6, 7度）的半音数', () => {
      // 大二度 = 2 半音
      expect(new Interval('maj', 2).semitoneGap).toBe(2);

      // 大三度 = 4 半音
      expect(new Interval('maj', 3).semitoneGap).toBe(4);

      // 大六度 = 9 半音
      expect(new Interval('maj', 6).semitoneGap).toBe(9);

      // 大七度 = 11 半音
      expect(new Interval('maj', 7).semitoneGap).toBe(11);
    });

    it('小音程（2, 3, 6, 7度）的半音数', () => {
      // 小二度 = 1 半音
      expect(new Interval('min', 2).semitoneGap).toBe(1);

      // 小三度 = 3 半音
      expect(new Interval('min', 3).semitoneGap).toBe(3);

      // 小六度 = 8 半音
      expect(new Interval('min', 6).semitoneGap).toBe(8);

      // 小七度 = 10 半音
      expect(new Interval('min', 7).semitoneGap).toBe(10);
    });
  });

  describe('变化音程（增、减）的半音数', () => {
    it('增音程比纯/大音程多 1 半音', () => {
      // 增四度 = 6 半音（三全音）
      expect(new Interval('aug', 4).semitoneGap).toBe(6);

      // 增五度 = 8 半音
      expect(new Interval('aug', 5).semitoneGap).toBe(8);

      // 增一度 = 1 半音
      expect(new Interval('aug', 1).semitoneGap).toBe(1);
    });

    it('减音程比纯/小音程少 1 半音', () => {
      // 减五度 = 6 半音（三全音）
      expect(new Interval('dim', 5).semitoneGap).toBe(6);

      // 减四度 = 4 半音
      expect(new Interval('dim', 4).semitoneGap).toBe(4);

      // 减三度 = 2 半音
      expect(new Interval('dim', 3).semitoneGap).toBe(2);
    });

    it('倍增/倍减音程', () => {
      // 倍增四度 = 7 半音
      expect(new Interval('aug+', 4).semitoneGap).toBe(7);

      // 倍减五度 = 5 半音
      expect(new Interval('dim-', 5).semitoneGap).toBe(5);
    });
  });

  describe('等音程验证', () => {
    it('增四度 = 减五度 = 6 半音（三全音）', () => {
      const aug4 = new Interval('aug', 4);
      const dim5 = new Interval('dim', 5);

      expect(aug4.semitoneGap).toBe(6);
      expect(dim5.semitoneGap).toBe(6);
      expect(aug4.semitoneGap).toBe(dim5.semitoneGap);
    });

    it('增五度 = 小六度 = 8 半音', () => {
      const aug5 = new Interval('aug', 5);
      const min6 = new Interval('min', 6);

      expect(aug5.semitoneGap).toBe(8);
      expect(min6.semitoneGap).toBe(8);
    });

    it('减四度 = 大三度 = 4 半音', () => {
      const dim4 = new Interval('dim', 4);
      const maj3 = new Interval('maj', 3);

      expect(dim4.semitoneGap).toBe(4);
      expect(maj3.semitoneGap).toBe(4);
    });
  });
});

describe('Interval 与 Note 配合验证', () => {
  it('C4 + 大三度 = E4', () => {
    const c4 = new Note('C', 0, 4);
    const maj3 = new Interval('maj', 3);
    const e4 = c4.getNoteByInterval(maj3);

    expect(e4.step).toBe('E');
    expect(e4.alter).toBe(0);
    expect(e4.octave).toBe(4);
  });

  it('C4 + 纯五度 = G4', () => {
    const c4 = new Note('C', 0, 4);
    const p5 = new Interval('p', 5);
    const g4 = c4.getNoteByInterval(p5);

    expect(g4.step).toBe('G');
    expect(g4.alter).toBe(0);
    expect(g4.octave).toBe(4);
  });

  it('C4 + 小三度 = Eb4', () => {
    const c4 = new Note('C', 0, 4);
    const min3 = new Interval('min', 3);
    const eb4 = c4.getNoteByInterval(min3);

    expect(eb4.step).toBe('E');
    expect(eb4.alter).toBe(-1);
    expect(eb4.octave).toBe(4);
  });

  it('C4 + 增四度 = F#4', () => {
    const c4 = new Note('C', 0, 4);
    const aug4 = new Interval('aug', 4);
    const fSharp4 = c4.getNoteByInterval(aug4);

    expect(fSharp4.step).toBe('F');
    expect(fSharp4.alter).toBe(1);
    expect(fSharp4.octave).toBe(4);
  });

  it('C4 + 大七度 = B4', () => {
    const c4 = new Note('C', 0, 4);
    const maj7 = new Interval('maj', 7);
    const b4 = c4.getNoteByInterval(maj7);

    expect(b4.step).toBe('B');
    expect(b4.alter).toBe(0);
    expect(b4.octave).toBe(4);
  });

  it('C4 + 大二度 = D4', () => {
    const c4 = new Note('C', 0, 4);
    const maj2 = new Interval('maj', 2);
    const d4 = c4.getNoteByInterval(maj2);

    expect(d4.step).toBe('D');
    expect(d4.alter).toBe(0);
    expect(d4.octave).toBe(4);
  });

  it('C4 + 大六度 = A4', () => {
    const c4 = new Note('C', 0, 4);
    const maj6 = new Interval('maj', 6);
    const a4 = c4.getNoteByInterval(maj6);

    expect(a4.step).toBe('A');
    expect(a4.alter).toBe(0);
    expect(a4.octave).toBe(4);
  });

  it('C4 + 纯四度 = F4', () => {
    const c4 = new Note('C', 0, 4);
    const p4 = new Interval('p', 4);
    const f4 = c4.getNoteByInterval(p4);

    expect(f4.step).toBe('F');
    expect(f4.alter).toBe(0);
    expect(f4.octave).toBe(4);
  });
});

describe('C 大调音阶验证', () => {
  it('C 大调所有音级从 C4 开始都应该在 octave 4', () => {
    const c4 = new Note('C', 0, 4);

    const intervals: [string, number][] = [
      ['p', 1],   // C
      ['maj', 2], // D
      ['maj', 3], // E
      ['p', 4],   // F
      ['p', 5],   // G
      ['maj', 6], // A
      ['maj', 7], // B
    ];

    const expectedNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = c4.getNoteByInterval(interval);

      expect(note.step).toBe(expectedNotes[index]);
      expect(note.alter).toBe(0);
      expect(note.octave).toBe(4);
    });
  });
});

describe('跨八度音程验证', () => {
  it('C4 + 纯八度 = C5', () => {
    const c4 = new Note('C', 0, 4);
    const p8 = new Interval('p', 8);
    const c5 = c4.getNoteByInterval(p8);

    expect(c5.step).toBe('C');
    expect(c5.alter).toBe(0);
    expect(c5.octave).toBe(5);
  });

  it('C4 + 大九度 = D5', () => {
    const c4 = new Note('C', 0, 4);
    const maj9 = new Interval('maj', 9);
    const d5 = c4.getNoteByInterval(maj9);

    expect(d5.step).toBe('D');
    expect(d5.alter).toBe(0);
    expect(d5.octave).toBe(5);
  });

  it('C4 + 纯十二度 = G5（八度+五度）', () => {
    const c4 = new Note('C', 0, 4);
    const p12 = new Interval('p', 12);
    const g5 = c4.getNoteByInterval(p12);

    expect(g5.step).toBe('G');
    expect(g5.alter).toBe(0);
    expect(g5.octave).toBe(5);
  });
});

describe('从不同根音开始验证', () => {
  it('G 大调：G4 开始的大调音阶', () => {
    const g4 = new Note('G', 0, 4);

    // G 大调有一个升号：F#
    const expected = [
      { step: 'G', alter: 0 },  // 1
      { step: 'A', alter: 0 },  // 2
      { step: 'B', alter: 0 },  // 3
      { step: 'C', alter: 0 },  // 4
      { step: 'D', alter: 0 },  // 5
      { step: 'E', alter: 0 },  // 6
      { step: 'F', alter: 1 },  // 7 = F#
    ];

    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['maj', 3], ['p', 4], ['p', 5], ['maj', 6], ['maj', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = g4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });

  it('F 大调：F4 开始的大调音阶', () => {
    const f4 = new Note('F', 0, 4);

    // F 大调有一个降号：Bb
    const expected = [
      { step: 'F', alter: 0 },  // 1
      { step: 'G', alter: 0 },  // 2
      { step: 'A', alter: 0 },  // 3
      { step: 'B', alter: -1 }, // 4 = Bb
      { step: 'C', alter: 0 },  // 5
      { step: 'D', alter: 0 },  // 6
      { step: 'E', alter: 0 },  // 7
    ];

    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['maj', 3], ['p', 4], ['p', 5], ['maj', 6], ['maj', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = f4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });

  it('D 大调：D4 开始的大调音阶', () => {
    const d4 = new Note('D', 0, 4);

    // D 大调有两个升号：F#, C#
    const expected = [
      { step: 'D', alter: 0 },  // 1
      { step: 'E', alter: 0 },  // 2
      { step: 'F', alter: 1 },  // 3 = F#
      { step: 'G', alter: 0 },  // 4
      { step: 'A', alter: 0 },  // 5
      { step: 'B', alter: 0 },  // 6
      { step: 'C', alter: 1 },  // 7 = C#
    ];

    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['maj', 3], ['p', 4], ['p', 5], ['maj', 6], ['maj', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = d4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });
});

describe('小调音阶验证', () => {
  it('A 小调：A4 开始的自然小调音阶', () => {
    const a4 = new Note('A', 0, 4);

    // A 小调无升降号
    const expected = [
      { step: 'A', alter: 0 },  // 1
      { step: 'B', alter: 0 },  // 2
      { step: 'C', alter: 0 },  // b3
      { step: 'D', alter: 0 },  // 4
      { step: 'E', alter: 0 },  // 5
      { step: 'F', alter: 0 },  // b6
      { step: 'G', alter: 0 },  // b7
    ];

    // 小调音程：P1, M2, m3, P4, P5, m6, m7
    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['min', 3], ['p', 4], ['p', 5], ['min', 6], ['min', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = a4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });

  it('E 小调：E4 开始的自然小调音阶', () => {
    const e4 = new Note('E', 0, 4);

    // E 小调有一个升号：F#
    const expected = [
      { step: 'E', alter: 0 },  // 1
      { step: 'F', alter: 1 },  // 2 = F#
      { step: 'G', alter: 0 },  // b3
      { step: 'A', alter: 0 },  // 4
      { step: 'B', alter: 0 },  // 5
      { step: 'C', alter: 0 },  // b6
      { step: 'D', alter: 0 },  // b7
    ];

    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['min', 3], ['p', 4], ['p', 5], ['min', 6], ['min', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = e4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });

  it('D 小调：D4 开始的自然小调音阶', () => {
    const d4 = new Note('D', 0, 4);

    // D 小调有一个降号：Bb
    const expected = [
      { step: 'D', alter: 0 },  // 1
      { step: 'E', alter: 0 },  // 2
      { step: 'F', alter: 0 },  // b3
      { step: 'G', alter: 0 },  // 4
      { step: 'A', alter: 0 },  // 5
      { step: 'B', alter: -1 }, // b6 = Bb
      { step: 'C', alter: 0 },  // b7
    ];

    const intervals: [string, number][] = [
      ['p', 1], ['maj', 2], ['min', 3], ['p', 4], ['p', 5], ['min', 6], ['min', 7]
    ];

    intervals.forEach(([type, num], index) => {
      const interval = new Interval(type as any, num);
      const note = d4.getNoteByInterval(interval);

      expect(note.step).toBe(expected[index].step);
      expect(note.alter).toBe(expected[index].alter);
    });
  });
});
