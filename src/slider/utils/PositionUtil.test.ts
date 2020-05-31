import PositionUtil from './PositionUtil';

describe('PositionUtil class', () => {
  test('Calc by offset if main element click', () => {
    const sliderBody = document.createElement('div');
    Object.defineProperty(sliderBody, 'offsetWidth', { value: 100 });
    Object.defineProperty(sliderBody, 'offsetHeight', { value: 200 });
    const bodyClick = { offsetX: 10, offsetY: 20, target: sliderBody };
    // @ts-ignore
    expect(PositionUtil.calcEventPoint(sliderBody, bodyClick))
      .toEqual({ x: 10, y: 10 });
  });

  test('Calc by client position if child element click', () => {
    const sliderBody = document.createElement('div');
    const sliderRangeOrScale = document.createElement('div');
    // @ts-ignore
    sliderBody.getBoundingClientRect = () => ({
      left: 20, top: 30, height: 100, width: 200,
    });
    const rangeClick = { clientX: 100, clientY: 50, target: sliderRangeOrScale };
    // @ts-ignore
    expect(PositionUtil.calcEventPoint(sliderBody, rangeClick))
      .toEqual({ x: 40, y: 20 });
  });
});
