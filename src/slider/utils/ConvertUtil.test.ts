import ConvertUtil from './ConvertUtil';

describe('ConvertUtil class', () => {
  test('toPercent', () => {
    expect(ConvertUtil.toPercent(100, 200)).toBe(50);
  });
  test('toPercentWithDiff', () => {
    expect(ConvertUtil.toPercentWithDiff(100, 50, 150)).toBe(50);
  });
  test('toPercentWithDiffA', () => {
    expect(ConvertUtil.toPercentWithDiff(-100, -200, 0)).toBe(50);
  });
  test('toPercentWithDiffB', () => {
    expect(ConvertUtil.toPercentWithDiff(-100, -200, -100)).toBe(100);
  });
  test('fromPercent', () => {
    expect(ConvertUtil.fromPercent(50, 200)).toBe(100);
  });
});
