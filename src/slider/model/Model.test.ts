import MinMaxPosition from '../types/MinMaxPosition';
import Model from './Model';

describe('Model class', () => {
  describe('constructor, getOptions', () => {
    test('Use defined options instead default', () => {
      const defaultOptions = new Model().getOptions();
      defaultOptions.current.min = 30;
      defaultOptions.withScale = false;
      const model = new Model({
        current: {min: 30},
        withScale: false,
      });
      expect(model.getOptions()).toEqual(defaultOptions);
    });
  });

  describe('setCurrent', () => {
    test('Set min and max', () => {
      const model = new Model();
      model.setCurrent(MinMaxPosition.Min, 50);
      model.setCurrent(MinMaxPosition.Max, 60);
      expect(model.getCurrents()).toEqual({min: 50, max: 60});
    });
  });

  describe('getCurrent', () => {
    test('getter works', () => {
      const model = new Model({
        current: {min: 40, max: 60},
        isRange: true,
      });
      expect(model.getCurrent(MinMaxPosition.Min)).toBe(40);
    });
    test('currents is new object', () => {
      const model = new Model({
        current: {min: 40, max: 60},
        isRange: true,
      });
      model.getCurrents().min = 20;
      expect(model.getCurrent(MinMaxPosition.Min)).toBe(40);
    });
  });

  describe('getPoint', () => {
    test('calculate percents', () => {
      let model = new Model({
        current: {min: 10, max: 15},
        border: {min: 0, max: 100},
      });
      expect(model.getPoint(MinMaxPosition.Min).percent).toBe(10);
      expect(model.getPoint(MinMaxPosition.Max).percent).toBe(15);
      model = new Model({current: {min: 10, max: 15}, border: {min: 10, max: 30}});
      expect(model.getPoint(MinMaxPosition.Max).percent).toBe(25);
      expect(model.getPoint(MinMaxPosition.Min).percent).toBe(0);
    });
  });

  describe('getCurrentPoints', () => {
    test('Equals to min and max for getPoint', () => {
      const model = new Model();
      expect(model.getPoints()).toEqual({
        min: model.getPoint(MinMaxPosition.Min),
        max: model.getPoint(MinMaxPosition.Max),
      });
    });
  });

  describe('getRangeSize', () => {
    test('Return diff between min and max border', () => {
      const model = new Model({border: {min: -10, max: 40}});
      expect(model.getSize()).toBe(50);
    });
  });

  describe('selectPosition', () => {
    test('Always max when range off', () => {
      const model = new Model({
        isRange: false,
        current: {min: 33, max: 66},
      });
      expect(model.selectPosition(32)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(33)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(50)).toBe(MinMaxPosition.Max);
    });

    test('Position with less diff when range off', () => {
      const model = new Model({current: {min: 5, max: 10}});
      expect(model.selectPosition(1)).toBe(MinMaxPosition.Min);
      expect(model.selectPosition(7)).toBe(MinMaxPosition.Min);
      expect(model.selectPosition(8)).toBe(MinMaxPosition.Max);
      expect(model.selectPosition(70)).toBe(MinMaxPosition.Max);
    });
  });

  describe('calcValue', () => {
    test('Return border when ratio not in range 0-100', () => {
      const model = new Model({border: {min: 0, max: 9}});
      expect(model.calcValue(-4)).toBe(0);
      expect(model.calcValue(0)).toBe(0);
      expect(model.calcValue(120)).toBe(9);
      expect(model.calcValue(1)).toBe(9);
    });

    test('Calc value from ratio', () => {
      const model = new Model({border: {min: 0, max: 200}});
      expect(model.calcValue(0.5)).toBe(100);
    });
    test('normalize value by step', () => {
      expect(new Model({step: 5, border: {min: 0, max: 100}}).calcValue(0.123456)).toBe(10)
    })
  });

  describe('isSameCurrent', () => {
    test('Return true when new current equal old', () => {
      const model = new Model({current: {min: 66, max: 76}});
      expect(model.isSameCurrent(66)).toBeTruthy();
      expect(model.isSameCurrent(76)).toBeTruthy();
      expect(model.isSameCurrent(56)).toBeFalsy();
    });
  });

  describe('willCurrentCollapse', () => {
    test('Return true when min > max', () => {
      const model = new Model({current: {min: 33, max: 66}});

      expect(model.willCurrentCollapse(MinMaxPosition.Min, 77)).toBeTruthy();
      expect(model.willCurrentCollapse(MinMaxPosition.Min, 66)).toBeFalsy();
      expect(model.willCurrentCollapse(MinMaxPosition.Min, 33)).toBeFalsy();

      expect(model.willCurrentCollapse(MinMaxPosition.Max, 22)).toBeTruthy();
      expect(model.willCurrentCollapse(MinMaxPosition.Max, 33)).toBeFalsy();
      expect(model.willCurrentCollapse(MinMaxPosition.Max, 66)).toBeFalsy();
    });
  });

  describe('toggleRange', () => {
    test('use min border as min current when not range', () => {
      const model = new Model({
        current: {min: 1, max: 2},
        border: {min: -1},
        isRange: true
      });
      model.toggleRange();
      expect(model.getCurrents().min).toBe(-1);
      expect(model.isRange()).toBeFalsy();
    })
    test('swap saved min value on toggle', () => {
      const model = new Model({
        current: {min: 1, max: 2},
        border: {min: -1},
        isRange: true
      });
      model.toggleRange();
      model.toggleRange();
      expect(model.getCurrents().min).toBe(1);
      expect(model.isRange()).toBeTruthy();
    })
    test('swap current if max < min', () => {
      const model = new Model({current: {min: 2, max: 1}, isRange: true})
      model.toggleRange();
      model.toggleRange();
      expect(model.getCurrents()).toEqual({min: 1, max: 2})
      expect(model.isRange()).toBeTruthy();
    })
  })
  describe('simple toggles', () => {
    const model = new Model({
      isVertical: true,
      withTooltip: true,
      withScale: true,
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
