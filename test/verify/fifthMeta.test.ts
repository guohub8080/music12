import { describe, it, expect } from 'vitest';
import { Note } from '@music12/Note/index';
import { Interval } from '@music12/Interval/index';
import FIFTH_META from '@music12/CircleOfFifths/static/FIFTH_META';

/**
 * 用 Interval 手动计算调号
 *
 * 大调音阶的音程：P1, M2, M3, P4, P5, M6, M7
 * 小调音阶的音程：P1, M2, m3, P4, P5, m6, m7
 *
 * 调号 = 所有音阶音符的 alter 之和
 */
function calcKeySignature(rootNote: InstanceType<typeof Note>, intervals: [string, number][]): number {
  let alterSum = rootNote.alter;

  for (const [type, num] of intervals) {
    const interval = new Interval(type as any, num);
    const note = rootNote.getNoteByInterval(interval);
    alterSum += note.alter;
  }

  return alterSum;
}

// 大调音程：P1, M2, M3, P4, P5, M6, M7
const MAJOR_INTERVALS: [string, number][] = [
  ['maj', 2], ['maj', 3], ['p', 4], ['p', 5], ['maj', 6], ['maj', 7]
];

// 小调音程：P1, M2, m3, P4, P5, m6, m7
const MINOR_INTERVALS: [string, number][] = [
  ['maj', 2], ['min', 3], ['p', 4], ['p', 5], ['min', 6], ['min', 7]
];

describe('验证五度圈 fifthMeta 调号准确性', () => {
  it('大调调号应与 Interval 计算一致', () => {
    const majorKeys = FIFTH_META.filter(x => x.mode === 'major' && x.circleID >= 0).all();

    console.log('\n验证大调调号（使用 Interval 手动计算）：\n');
    console.log('音符'.padEnd(8) + 'meta调号'.padEnd(10) + '计算调号'.padEnd(10) + '结果');
    console.log('-'.repeat(45));

    let passed = 0;
    let failed = 0;
    const failures: string[] = [];

    for (const key of majorKeys) {
      const step = key.rawNoteStep;
      const alter = key.rawNoteAlter;
      const metaAlters = key.rawStaveAlters;
      const noteName = step + (alter === 1 ? '#' : alter === -1 ? 'b' : '');

      try {
        const rootNote = new Note(step as any, alter as any, 4);
        const calcAlters = calcKeySignature(rootNote, MAJOR_INTERVALS);

        const match = metaAlters === calcAlters;
        if (match) {
          passed++;
          console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + String(calcAlters).padEnd(10) + '✓');
        } else {
          failed++;
          failures.push(noteName);
          console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + String(calcAlters).padEnd(10) + '✗ 不匹配！');
        }
      } catch (e: any) {
        failed++;
        failures.push(noteName);
        console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + 'ERROR'.padEnd(10) + '✗ ' + e.message);
      }
    }

    console.log('-'.repeat(45));
    console.log(`通过: ${passed}, 失败: ${failed}`);

    if (failures.length > 0) {
      console.log('\n失败的调性:', failures.join(', '));
    }

    expect(failed).toBe(0);
  });

  it('小调调号应与 Interval 计算一致', () => {
    const minorKeys = FIFTH_META.filter(x => x.mode === 'minor' && x.circleID >= 0).all();

    console.log('\n验证小调调号（使用 Interval 手动计算）：\n');
    console.log('音符'.padEnd(8) + 'meta调号'.padEnd(10) + '计算调号'.padEnd(10) + '结果');
    console.log('-'.repeat(45));

    let passed = 0;
    let failed = 0;
    const failures: string[] = [];

    for (const key of minorKeys) {
      const step = key.rawNoteStep;
      const alter = key.rawNoteAlter;
      const metaAlters = key.rawStaveAlters;
      const noteName = step.toLowerCase() + (alter === 1 ? '#' : alter === -1 ? 'b' : '');

      try {
        const rootNote = new Note(step as any, alter as any, 4);
        const calcAlters = calcKeySignature(rootNote, MINOR_INTERVALS);

        const match = metaAlters === calcAlters;
        if (match) {
          passed++;
          console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + String(calcAlters).padEnd(10) + '✓');
        } else {
          failed++;
          failures.push(noteName);
          console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + String(calcAlters).padEnd(10) + '✗ 不匹配！');
        }
      } catch (e: any) {
        failed++;
        failures.push(noteName);
        console.log(noteName.padEnd(8) + String(metaAlters).padEnd(10) + 'ERROR'.padEnd(10) + '✗ ' + e.message);
      }
    }

    console.log('-'.repeat(45));
    console.log(`通过: ${passed}, 失败: ${failed}`);

    if (failures.length > 0) {
      console.log('\n失败的调性:', failures.join(', '));
    }

    expect(failed).toBe(0);
  });
});
