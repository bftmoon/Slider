import PositionUtil from './PositionUtil';

describe('calc relative click position', () => {
  test('Calc by offset if main element click', () => {
    const sliderBody = document.createElement('div');
    const bodyClick = { offsetX: 10, offsetY: 20, target: sliderBody };
    // @ts-ignore
    expect(PositionUtil.calcEventPoint(sliderBody, bodyClick))
      .toEqual({ x: 10, y: 20 });
  });

  test('Calc by client position if child element click', () => {
    const sliderBody = document.createElement('div');
    const sliderRangeOrScale = document.createElement('div');
    // @ts-ignore
    sliderBody.getBoundingClientRect = () => ({ left: 20, top: 30 });
    const rangeClick = { clientX: 100, clientY: 50, target: sliderRangeOrScale };
    // @ts-ignore
    expect(PositionUtil.calcEventPoint(sliderBody, rangeClick))
      .toEqual({ x: 80, y: 20 });
  });
});
