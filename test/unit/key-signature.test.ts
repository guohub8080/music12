import { describe, it, expect } from 'vitest';
import { getAlterStepListByNum, getScaleByStaveAlters, getStaveAlterByNote,
  getRelativeMinor, getRelativeMajor, getEnharmonicKey, getNeighborKeys, getKeySignatureDistance } from '@key-signature/index';

describe('Stave - getAlterStepListByNum', () => {
	describe('升号调性', () => {
		it('1 个升号应返回 F', () => {
			expect(getAlterStepListByNum(1)).toEqual(['F']);
		});

		it('2 个升号应返回 F, C', () => {
			expect(getAlterStepListByNum(2)).toEqual(['F', 'C']);
		});

		it('3 个升号应返回 F, C, G', () => {
			expect(getAlterStepListByNum(3)).toEqual(['F', 'C', 'G']);
		});

		it('7 个升号应返回全部音名', () => {
			expect(getAlterStepListByNum(7)).toEqual(['F', 'C', 'G', 'D', 'A', 'E', 'B']);
		});
	});

	describe('降号调性', () => {
		it('1 个降号应返回 B', () => {
			expect(getAlterStepListByNum(-1)).toEqual(['B']);
		});

		it('2 个降号应返回 B, E', () => {
			expect(getAlterStepListByNum(-2)).toEqual(['B', 'E']);
		});

		it('3 个降号应返回 B, E, A', () => {
			expect(getAlterStepListByNum(-3)).toEqual(['B', 'E', 'A']);
		});

		it('7 个降号应返回全部音名', () => {
			expect(getAlterStepListByNum(-7)).toEqual(['B', 'E', 'A', 'D', 'G', 'C', 'F']);
		});
	});

	describe('无调号', () => {
		it('0 应返回空数组', () => {
			expect(getAlterStepListByNum(0)).toEqual([]);
		});
	});

	describe('错误处理', () => {
		it('超过 7 应抛出错误', () => {
			expect(() => getAlterStepListByNum(8)).toThrow('Invalid num: must be between -7 and 7.');
		});

		it('少于 -7 应抛出错误', () => {
			expect(() => getAlterStepListByNum(-8)).toThrow('Invalid num: must be between -7 and 7.');
		});
	});
});

describe('Stave - getScaleByStaveAlters', () => {
	describe('无调号', () => {
		it('0 应返回 C 大调和 a 小调', () => {
			const result = getScaleByStaveAlters(0);
			expect(result).toHaveLength(2);
			expect(result[0].rawNoteStep).toBe('C');
			expect(result[0].rawNoteAlter).toBe(0);
			expect(result[0].mode).toBe('major');
			expect(result[1].rawNoteStep).toBe('A');
			expect(result[1].rawNoteAlter).toBe(0);
			expect(result[1].mode).toBe('minor');
		});
	});

	describe('升号调性', () => {
		it('1# 应返回 G 大调和 e 小调', () => {
			const result = getScaleByStaveAlters(1);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			expect(major?.rawNoteStep).toBe('G');
			expect(major?.rawNoteAlter).toBe(0);
			expect(minor?.rawNoteStep).toBe('E');
			expect(minor?.rawNoteAlter).toBe(0);
		});

		it('2# 应返回 D 大调和 b 小调', () => {
			const result = getScaleByStaveAlters(2);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			expect(major?.rawNoteStep).toBe('D');
			expect(minor?.rawNoteStep).toBe('B');
		});

		it('6# 应返回 F# 大调和 d# 小调', () => {
			const result = getScaleByStaveAlters(6);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			expect(major?.rawNoteStep).toBe('F');
			expect(major?.rawNoteAlter).toBe(1);
			expect(minor?.rawNoteStep).toBe('D');
			expect(minor?.rawNoteAlter).toBe(1);
		});
	});

	describe('降号调性', () => {
		it('1b 应返回 F 大调和 d 小调', () => {
			const result = getScaleByStaveAlters(-1);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			expect(major?.rawNoteStep).toBe('F');
			expect(major?.rawNoteAlter).toBe(0);
			expect(minor?.rawNoteStep).toBe('D');
			expect(minor?.rawNoteAlter).toBe(0);
		});

		it('2b 应返回 Bb 大调和 g 小调', () => {
			const result = getScaleByStaveAlters(-2);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			// Bb 大调
			expect(major?.rawNoteStep).toBe('B');
			expect(major?.rawNoteAlter).toBe(-1);
			// g 小调（根音是 G 自然音，降号是 B 和 E）
			expect(minor?.rawNoteStep).toBe('G');
			expect(minor?.rawNoteAlter).toBe(0);
		});

		it('6b 应返回 Gb 大调和 eb 小调', () => {
			const result = getScaleByStaveAlters(-6);
			expect(result).toHaveLength(2);
			const major = result.find(s => s.mode === 'major');
			const minor = result.find(s => s.mode === 'minor');
			expect(major?.rawNoteStep).toBe('G');
			expect(major?.rawNoteAlter).toBe(-1);
			expect(minor?.rawNoteStep).toBe('E');
			expect(minor?.rawNoteAlter).toBe(-1);
		});
	});

	describe('极端调号（等音异名）', () => {
		it('7# 应返回 C# 大调（含等音异名 Db）', () => {
			const result = getScaleByStaveAlters(7);
			const cSharpMajor = result.find(s => s.rawNoteStep === 'C' && s.rawNoteAlter === 1);
			expect(cSharpMajor).toBeDefined();
			expect(cSharpMajor?.mode).toBe('major');
		});

		it('7b 应返回 Cb 大调（含等音异名 B）', () => {
			const result = getScaleByStaveAlters(-7);
			const cFlatMajor = result.find(s => s.rawNoteStep === 'C' && s.rawNoteAlter === -1);
			expect(cFlatMajor).toBeDefined();
			expect(cFlatMajor?.mode).toBe('major');
		});
	});

	describe('错误处理', () => {
		it('超过 7 应抛出错误', () => {
			expect(() => getScaleByStaveAlters(8)).toThrow('Invalid staveAlter: must be between -7 and 7.');
		});

		it('少于 -7 应抛出错误', () => {
			expect(() => getScaleByStaveAlters(-8)).toThrow('Invalid staveAlter: must be between -7 and 7.');
		});
	});
});

describe('Stave - getStaveAlterByNote', () => {
	describe('自然音', () => {
		it('C 应返回 C 大调（0）和 c 小调（-3b）', () => {
			const result = getStaveAlterByNote('C', 0);
			expect(result.length).toBeGreaterThan(0);
			const cMajor = result.find(s => s.rawNoteStep === 'C' && s.rawNoteAlter === 0 && s.mode === 'major');
			expect(cMajor?.rawStaveAlters).toBe(0);
		});

		it('G 应返回 G 大调（1#）', () => {
			const result = getStaveAlterByNote('G', 0);
			const gMajor = result.find(s => s.rawNoteStep === 'G' && s.rawNoteAlter === 0 && s.mode === 'major');
			expect(gMajor?.rawStaveAlters).toBe(1);
		});

		it('F 应返回 F 大调（1b）', () => {
			const result = getStaveAlterByNote('F', 0);
			const fMajor = result.find(s => s.rawNoteStep === 'F' && s.rawNoteAlter === 0 && s.mode === 'major');
			expect(fMajor?.rawStaveAlters).toBe(-1);
		});
	});

	describe('升号音', () => {
		it('F# 应返回 F# 大调（6#）', () => {
			const result = getStaveAlterByNote('F', 1);
			const fSharpMajor = result.find(s => s.rawNoteStep === 'F' && s.rawNoteAlter === 1 && s.mode === 'major');
			expect(fSharpMajor?.rawStaveAlters).toBe(6);
		});

		it('G# 应包含 G# 小调（5#）', () => {
			const result = getStaveAlterByNote('G', 1);
			const gSharpMinor = result.find(s => s.rawNoteStep === 'G' && s.rawNoteAlter === 1 && s.mode === 'minor');
			expect(gSharpMinor?.rawStaveAlters).toBe(5);
		});

		it('C# 应返回 C# 大调（7#）', () => {
			const result = getStaveAlterByNote('C', 1);
			const cSharpMajor = result.find(s => s.rawNoteStep === 'C' && s.rawNoteAlter === 1 && s.mode === 'major');
			expect(cSharpMajor?.rawStaveAlters).toBe(7);
		});
	});

	describe('降号音', () => {
		it('Bb 应返回 Bb 大调（2b）', () => {
			const result = getStaveAlterByNote('B', -1);
			const bFlatMajor = result.find(s => s.rawNoteStep === 'B' && s.rawNoteAlter === -1 && s.mode === 'major');
			expect(bFlatMajor?.rawStaveAlters).toBe(-2);
		});

		it('Eb 应返回 Eb 大调（3b）', () => {
			const result = getStaveAlterByNote('E', -1);
			const eFlatMajor = result.find(s => s.rawNoteStep === 'E' && s.rawNoteAlter === -1 && s.mode === 'major');
			expect(eFlatMajor?.rawStaveAlters).toBe(-3);
		});

		it('Ab 应返回 Ab 大调（4b）', () => {
			const result = getStaveAlterByNote('A', -1);
			const aFlatMajor = result.find(s => s.rawNoteStep === 'A' && s.rawNoteAlter === -1 && s.mode === 'major');
			expect(aFlatMajor?.rawStaveAlters).toBe(-4);
		});

		it('Cb 应返回 Cb 大调（7b）', () => {
			const result = getStaveAlterByNote('C', -1);
			const cFlatMajor = result.find(s => s.rawNoteStep === 'C' && s.rawNoteAlter === -1 && s.mode === 'major');
			expect(cFlatMajor?.rawStaveAlters).toBe(-7);
		});
	});

	describe('错误处理', () => {
		it('无效音名应抛出错误', () => {
			// @ts-expect-error - 测试无效输入
			expect(() => getStaveAlterByNote('H', 0)).toThrow();
		});
	});
});

describe('五度圈导航(2026-09-12 第一批四函数)', () => {
	it('关系大小调互查,共享调号', () => {
		const am = getRelativeMinor('C', 0)
		expect(`${am.step}${am.alter}`).toBe('A0')
		expect(am.staveAlters).toBe(0) // a 小调与 C 大调共享 0 调号
		const C = getRelativeMajor('A', 0)
		expect(`${C.step}${C.alter}`).toBe('C0')
		expect(C.staveAlters).toBe(0)
		const E = getRelativeMajor('C', 1) // c♯ 小调 → E 大调
		expect(`${E.step}${E.alter}`).toBe('E0')
		expect(E.staveAlters).toBe(4)
	})

	it('关系小调理论调优雅:D♯ 大调 → b♯ 小调共享 9♯', () => {
		const bs = getRelativeMinor('D', 1)
		expect(`${bs.step}${bs.alter}`).toBe('B1')
		expect(bs.staveAlters).toBe(9)
	})

	it('等音调对:每个主音拼写恒有兄弟', () => {
		const db = getEnharmonicKey('C', 1)
		expect(`${db.step}${db.alter}`).toBe('D-1')
		const cb = getEnharmonicKey('B', 0)
		expect(`${cb.step}${cb.alter}`).toBe('C-1') // B ↔ C♭
		const e = getEnharmonicKey('E', 0)
		expect(`${e.step}${e.alter}`).toBe('F-1') // E ↔ F♭
	})

	it('相邻调:C 的属调 G(+1♯)/下属调 F(+1♭)', () => {
		const n = getNeighborKeys('C', 0)
		expect(`${n.dominant.step}${n.dominant.staveAlters}`).toBe('G1')
		expect(`${n.subdominant.step}${n.subdominant.staveAlters}`).toBe('F-1')
	})

	it('调号距离:转调升降号增减量', () => {
		expect(getKeySignatureDistance('C', 0, 'E', -1)).toBe(-3) // C→E♭ 加 3 降
		expect(getKeySignatureDistance('C', 0, 'A', 0)).toBe(3)
		expect(getKeySignatureDistance('C', 0, 'C', -1)).toBe(-7) // C→C♭
		expect(getKeySignatureDistance('C', 0, 'C', 0)).toBe(0)
	})

	it('非法输入抛错', () => {
		expect(() => getRelativeMinor('H' as never, 0)).toThrow()
		expect(() => getKeySignatureDistance('C', 3, 'D', 0)).toThrow()
	})
})
