import DefaultModel from './DefaultModel';
import MinMaxPosition from '../types/MinMaxPosition';

describe('DefaultModel class', () => {
  describe('constructor, getOptions', () => {
    test('Use default options when options undefined', () => {
      const model = new DefaultModel();
      expect(model.getOptions()).toEqual({
        current: { min: 0, max: 80 },
        border: { min: 0, max: 100 },
        step: 1,
        isRange: true,
        isVertical: false,
        withTooltip: true,
        withScale: true,
      });
    });

    test('Use defined options instead default', () => {
      const model = new DefaultModel({
        current: { min: 30 },
        withScale: false,
      });
      expect(model.getOptions()).toEqual({
        current: { min: 30, max: 80 },
        border: { min: 0, max: 100 },
        step: 1,
        isRange: true,
        isVertical: false,
        withTooltip: true,
        withScale: false,
      });
    });
  });

  describe('setCurrent', () => {
    test('Set min and max', () => {
      const model = new DefaultModel();
      model.setCurrent({ min: 50, max: 60 });
      expect(model.getRealCurrent()).toEqual({ min: 50, max: 60 });
    });
    test('Set one value', () => {
      const model = new DefaultModel();
      model.setCurrent({ max: 60 });
      expect(model.getRealCurrent()).toEqual({ min: 0, max: 60 });
    });
  });


  describe('getCurrent', () => {
    test('Current min equals border min when range on', () => {
      const model = new DefaultModel({
        border: { min: 20 },
        current: { min: 40 },
        isRange: false,
      });
      expect(model.getCurrent().min).toBe(20);
    });

    test('Real current min when range off', () => {
      const model = new DefaultModel({
        border: { min: 20 },
        current: { min: 40 },
        isRange: true,
      });
      expect(model.getCurrent().min).toBe(40);
    });
  });

  describe('getRealCurrent', () => {
    test('Real current independent or range', () => {
      const model = new DefaultModel({
        current: { min: 20 },
        isRange: true,
      });
      expect(model.getRealCurrent().min).toBe(20);
    });
  });


  describe('getPoint', () => {
    test('Calculate percents', () => {
      const model = new DefaultModel({
        current: { min: 10, max: 15 },
        border: { min: 0, max: 100 },
      });
      expect(model.getPoint(MinMaxPosition.Min).percent).toBe(10);
      expect(model.getPoint(MinMaxPosition.Max).percent).toBe(15);

      model.setCurrent({ min: 10, max: 15 });
      model.border = { min: 10, max: 30 };
      expect(model.getPoint(MinMaxPosition.Max).percent).toBe(25);
      expect(model.getPoint(MinMaxPosition.Min).percent).toBe(0);
    });

    test('Used fake min when range off', () => {
      const model = new DefaultModel({
        current: { min: 10, max: 15 },
        border: { min: 0, max: 100 },
        isRange: false,
      });
      expect(model.getPoint(MinMaxPosition.Min).percent).toBe(0);
    });
  });

  describe('getCurrentPoints', () => {
    test('Equals to min and max for getPoint', () => {
      const model = new DefaultModel();
      expect(model.getCurrentPoints()).toEqual({
        min: model.getPoint(MinMaxPosition.Min),
        max: model.getPoint(MinMaxPosition.Max),
      });
    });
  });

  describe('getBoolOptions', () => {
    test('Return bool options', () => {
      const options = {
        isVertical: true, isRange: false, withScale: true, withTooltip: false,
      };
      const model = new DefaultModel(options);
      expect(model.getBoolOptions()).toEqual(options);
    });
  });

  describe('getRangeSize', () => {
    test('Return diff between min and max border', () => {
      const model = new DefaultModel();
      expect(model.getRangeSize()).toBe(model.border.max - model.border.min);
    });
  });

  describe('selectPosition', () => {
    test('Always max when range off', () => {
      const model = new DefaultModel({ isRange: false, current: { min: 33, max: 66 } });
      expect(model.selectPosition(32)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(33)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(50)).toBe(MinMaxPosition.Max);
    });

    test('Position with less diff when range off', () => {
      const model = new DefaultModel({ current: { min: 5, max: 10 } });
      expect(model.selectPosition(1)).toBe(MinMaxPosition.Min);
      expect(model.selectPosition(7)).toBe(MinMaxPosition.Min);
      expect(model.selectPosition(8)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(70)).toBe(MinMaxPosition.Max);
    });
  });

  describe('normalizeCurrentOrder', () => {
    test('Swap current min and max', () => {
      const model = new DefaultModel({ current: { min: 20, max: 10 } });
      model.normalizeCurrentOrder();
      expect(model.getCurrent()).toEqual({ min: 10, max: 20 });
      model.normalizeCurrentOrder();
      expect(model.getCurrent()).toEqual({ min: 20, max: 10 });
    });
  });

  describe('normalizeByStep', () => {
    test('Round current by step to close-in', () => {
      const model = new DefaultModel({ step: 7 });
      expect(model.normalizeByStep(8)).toBe(7);
      expect(model.normalizeByStep(6)).toBe(7);
    });
    test('Can choose borders', () => {
      const model = new DefaultModel({ step: 4, border: { min: 0, max: 7 } });
      expect(model.normalizeByStep(1)).toBe(0);
      expect(model.normalizeByStep(6)).toBe(7);
    });
  });

  describe('calcModelValue', () => {
    test('Return border when percent not in range 0-100', () => {
      const model = new DefaultModel({ border: { min: 0, max: 9 } });
      expect(model.calcModelValue(-4)).toBe(0);
      expect(model.calcModelValue(0)).toBe(0);
      expect(model.calcModelValue(120)).toBe(9);
      expect(model.calcModelValue(100)).toBe(9);
    });

    test('Calc value from percent', () => {
      const model = new DefaultModel({ border: { min: 0, max: 200 } });
      expect(model.calcModelValue(50)).toBe(100);
    });
  });

  describe('isOrderNormalizeRequired', () => {
    test('Return true when real current max < min', () => {
      const model = new DefaultModel({ current: { min: 66, max: 33 } });
      expect(model.isOrderNormalizeRequired()).toBeTruthy();
      model.setCurrent({ min: 33 });
      expect(model.isOrderNormalizeRequired()).toBeFalsy();
      model.setCurrent({ min: 3 });
      expect(model.isOrderNormalizeRequired()).toBeFalsy();
    });
  });

  describe('isSameCurrent', () => {
    test('Return true when new current equal old', () => {
      const model = new DefaultModel({ current: { min: 66, max: 76 } });
      expect(model.isSameCurrent(66)).toBeTruthy();
      expect(model.isSameCurrent(76)).toBeTruthy();
      expect(model.isSameCurrent(56)).toBeFalsy();
    });
  });

  describe('willCurrentCollapse', () => {
    test('Return true when min > max', () => {
      const model = new DefaultModel({ current: { min: 33, max: 66 } });

      expect(model.willCurrentCollapse(MinMaxPosition.Min, 77)).toBeTruthy();
      expect(model.willCurrentCollapse(MinMaxPosition.Min, 66)).toBeFalsy();
      expect(model.willCurrentCollapse(MinMaxPosition.Min, 33)).toBeFalsy();

      expect(model.willCurrentCollapse(MinMaxPosition.Max, 22)).toBeTruthy();
      expect(model.willCurrentCollapse(MinMaxPosition.Max, 33)).toBeFalsy();
      expect(model.willCurrentCollapse(MinMaxPosition.Max, 66)).toBeFalsy();
    });
  });

  describe('toggles', () => {
    const model = new DefaultModel({
      isRange: true, isVertical: true, withTooltip: true, withScale: true,
    });

    test('toggleRange', () => {
      expect(model.toggleRange()).toBeFalsy();
    });

    test('toggleScale', () => {
      expect(model.toggleScale()).toBeFalsy();
    });

    test('toggleOrientation', () => {
      expect(model.toggleOrientation()).toBeFalsy();
    });

    test('toggleTooltip', () => {
      expect(model.toggleTooltip()).toBeFalsy();
    });
  });
});
