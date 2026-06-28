import { describe, it, expect } from 'vitest';
import { IntervalRadix, ScaleRadix, Base7Radix } from '@common/radix';

describe('Base7Radix', () => {
  it('0-6 应该是第 0 八度', () => {
    expect(new Base7Radix(0).digitPair).toEqual([0, 0]);
    expect(new Base7Radix(1).digitPair).toEqual([0, 1]);
    expect(new Base7Radix(6).digitPair).toEqual([0, 6]);
  });

  it('7-13 应该是第 1 八度', () => {
    expect(new Base7Radix(7).digitPair).toEqual([1, 0]);
    expect(new Base7Radix(8).digitPair).toEqual([1, 1]);
    expect(new Base7Radix(13).digitPair).toEqual([1, 6]);
  });

  it('14-20 应该是第 2 八度', () => {
    expect(new Base7Radix(14).digitPair).toEqual([2, 0]);
    expect(new Base7Radix(20).digitPair).toEqual([2, 6]);
  });

  it('add 方法', () => {
    const r = new Base7Radix(0);
    expect(r.add(1).digitPair).toEqual([0, 1]);
    expect(r.add(7).digitPair).toEqual([1, 0]);
    expect(r.add(8).digitPair).toEqual([1, 1]);
  });
});

describe('IntervalRadix', () => {
  describe('音程数 1-7（第 0 八度）', () => {
    it('一度 (1) = [0, 1]', () => {
      const ir = new IntervalRadix(1);
      expect(ir.digitPair).toEqual([0, 1]);
      expect(ir.octave).toBe(0);
      expect(ir.intervalNum).toBe(1);
      expect(ir.intervalNumWithinOctave).toBe(1);
    });

    it('七度 (7) = [0, 7]', () => {
      const ir = new IntervalRadix(7);
      expect(ir.digitPair).toEqual([0, 7]);
      expect(ir.octave).toBe(0);
      expect(ir.intervalNum).toBe(7);
      expect(ir.intervalNumWithinOctave).toBe(7);
    });
  });

  describe('音程数 8-14（第 1 八度）', () => {
    it('八度 (8) = [1, 1]', () => {
      const ir = new IntervalRadix(8);
      expect(ir.digitPair).toEqual([1, 1]);
      expect(ir.octave).toBe(1);
      expect(ir.intervalNum).toBe(8);
      expect(ir.intervalNumWithinOctave).toBe(1);
    });

    it('十五度 (15) = [2, 1]', () => {
      const ir = new IntervalRadix(15);
      expect(ir.digitPair).toEqual([2, 1]);
      expect(ir.octave).toBe(2);
      expect(ir.intervalNum).toBe(15);
      expect(ir.intervalNumWithinOctave).toBe(1);
    });
  });

  it('不允许小于 1 的音程数', () => {
    expect(() => new IntervalRadix(0)).toThrow();
    expect(() => new IntervalRadix(-1)).toThrow();
  });
});

describe('ScaleRadix', () => {
  describe('音阶级数 1-7（第 0 八度）', () => {
    it('I 级 (1) = [0, 1]', () => {
      const sr = new ScaleRadix(1);
      expect(sr.digitPair).toEqual([0, 1]);
      expect(sr.octave).toBe(0);
      expect(sr.scaleDegree).toBe(1);
    });

    it('VII 级 (7) = [0, 7]', () => {
      const sr = new ScaleRadix(7);
      expect(sr.digitPair).toEqual([0, 7]);
      expect(sr.octave).toBe(0);
      expect(sr.scaleDegree).toBe(7);
    });
  });

  describe('音阶级数 8-14（第 1 八度）', () => {
    it('VIII 级 (8) = [1, 1]', () => {
      const sr = new ScaleRadix(8);
      expect(sr.digitPair).toEqual([1, 1]);
      expect(sr.octave).toBe(1);
      expect(sr.scaleDegree).toBe(1);
    });

    it('XV 级 (15) = [2, 1]', () => {
      const sr = new ScaleRadix(15);
      expect(sr.digitPair).toEqual([2, 1]);
      expect(sr.octave).toBe(2);
      expect(sr.scaleDegree).toBe(1);
    });
  });

  describe('add 方法', () => {
    it('I 级 + 1 = II 级', () => {
      const sr = new ScaleRadix(1);
      const next = sr.add(1);
      expect(next.scaleDegree).toBe(2);
      expect(next.octave).toBe(0);
    });

    it('VII 级 + 1 = VIII 级（跨八度）', () => {
      const sr = new ScaleRadix(7);
      const next = sr.add(1);
      expect(next.scaleDegree).toBe(1);
      expect(next.octave).toBe(1);
      expect(next.totalScaleDegrees).toBe(8);
    });

    it('I 级 + 7 = VIII 级', () => {
      const sr = new ScaleRadix(1);
      const next = sr.add(7);
      expect(next.scaleDegree).toBe(1);
      expect(next.octave).toBe(1);
    });
  });

  it('不允许小于 1 的音阶级数', () => {
    expect(() => new ScaleRadix(0)).toThrow();
    expect(() => new ScaleRadix(-1)).toThrow();
  });
});

describe('IntervalRadix 与 ScaleRadix 对比', () => {
  it('两者应该有相同的行为（音程和音阶级数概念相同）', () => {
    for (let i = 1; i <= 15; i++) {
      const ir = new IntervalRadix(i);
      const sr = new ScaleRadix(i);

      expect(ir.digitPair).toEqual(sr.digitPair);
      expect(ir.octave).toBe(sr.octave);
      expect(ir.intervalNumWithinOctave).toBe(sr.scaleDegree);
    }
  });
});

describe('边界情况验证', () => {
  it('IntervalRadix 大音程验证', () => {
    // 22 度 = 3 个八度 + 1 度
    const ir22 = new IntervalRadix(22);
    expect(ir22.octave).toBe(3);
    expect(ir22.intervalNumWithinOctave).toBe(1);
    expect(ir22.intervalNum).toBe(22);
  });

  it('ScaleRadix 大音阶验证', () => {
    // 22 级 = 3 个八度 + 1 级
    const sr22 = new ScaleRadix(22);
    expect(sr22.octave).toBe(3);
    expect(sr22.scaleDegree).toBe(1);
    expect(sr22.totalScaleDegrees).toBe(22);
  });

  it('base10 返回原始值', () => {
    for (let i = 1; i <= 20; i++) {
      expect(new IntervalRadix(i).base10).toBe(i);
      expect(new ScaleRadix(i).base10).toBe(i);
    }
  });
});
