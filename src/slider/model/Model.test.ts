import Model from "./Model";
import MinMaxPosition from "./MinMaxPosition";

// test('Default init options', () => {
//   const model = new Model();
//   const options: IModel = {
//     border: {min: 0, max: 100},
//     current: {min: 30, max: 80},
//     isRange: true,
//     isVertical: false,
//     // linesCount: undefined,
//     step: 1,
//     withScale: true,
//     withTooltip: true
//
//   }
//   expect(model.getOptions()).toEqual(
//     {
//
//     }
//   )
// })

// describe('Custom options on init', ()=>{
//   test()
// })

describe('Data getters according isRange', () => {
  test('Current min equals border min when range on', () => {
    const model = new Model({
      border: {min: 20},
      current: {min: 40},
      isRange: false
    });
    expect(model.getCurrent().min).toBe(20);
  });

  test('Normal current min when range off', () => {
    const model = new Model({
      border: {min: 20},
      current: {min: 40},
      isRange: true
    });
    expect(model.getCurrent().min).toBe(40);
  });

  test('Normal current can be called when range on', () => {
    const model = new Model({
      border: {min: 20},
      current: {min: 40},
      isRange: false
    });
    expect(model.getRealCurrent().min).toBe(20);
  });
})

describe('Current moving controls', () => {
  test('Normalize required when real current max < min (need on range toggle)', () => {
    const model = new Model({current: {min: 66, max: 33}});
    expect(model.isOrderNormalizeRequired()).toBeTruthy();
    model.setCurrent({min: 33});
    expect(model.isOrderNormalizeRequired()).toBeFalsy();
    model.setCurrent({min: 3});
    expect(model.isOrderNormalizeRequired()).toBeFalsy();

  });

  test('Check was current already added', () => {
    const model = new Model({current: {min: 66, max: 76}});
    expect(model.isSameCurrent(66)).toBeTruthy();
    expect(model.isSameCurrent(76)).toBeTruthy();
    expect(model.isSameCurrent(56)).toBeFalsy();
  });

  test('Check is current can move more', () => {
    const model = new Model({current: {min: 33, max: 66}});

    expect(model.willCurrentCollapse(MinMaxPosition.min, 77)).toBeTruthy();
    expect(model.willCurrentCollapse(MinMaxPosition.min, 66)).toBeFalsy();
    expect(model.willCurrentCollapse(MinMaxPosition.min, 33)).toBeFalsy();

    expect(model.willCurrentCollapse(MinMaxPosition.max, 22)).toBeTruthy();
    expect(model.willCurrentCollapse(MinMaxPosition.max, 33)).toBeFalsy();
    expect(model.willCurrentCollapse(MinMaxPosition.max, 66)).toBeFalsy();
  });
});

describe('Moving point selection', () => {
  test('Always max when range off', () => {
    const model = new Model({isRange: false, current: {min: 33, max: 66}});
    expect(model.selectPosition(32)).toBe(MinMaxPosition.max);
    expect(model.selectPosition(33)).toBe(MinMaxPosition.max);
    expect(model.selectPosition(50)).toBe(MinMaxPosition.max);
  });

  test('Position with less diff when range off', () => {
    const model = new Model({current: {min: 5, max: 10}});
    expect(model.selectPosition(1)).toBe(MinMaxPosition.min);
    expect(model.selectPosition(7)).toBe(MinMaxPosition.min);
    expect(model.selectPosition(8)).toBe(MinMaxPosition.max);
    expect(model.selectPosition(70)).toBe(MinMaxPosition.max);
  });
});

describe('Convert current value to %', () => {
  test('Borders range is not ignored', () => {
    const model = new Model({
      current: {min: 10, max: 15},
      border: {min: 0, max: 100}
    });
    expect(model.getPoint(MinMaxPosition.min).percent).toBe(10);
    expect(model.getPoint(MinMaxPosition.max).percent).toBe(15);

    model.setCurrent({min: 10, max: 15});
    model.border = {min: 10, max: 30};
    expect(model.getPoint(MinMaxPosition.max).percent).toBe(25);
    expect(model.getPoint(MinMaxPosition.min).percent).toBe(0);
  });

  test('Used fake min when range off', ()=>{
    const model = new Model({
      current: {min: 10, max: 15},
      border: {min: 0, max: 100},
      isRange: false
    });
    expect(model.getPoint(MinMaxPosition.min).percent).toBe(0);
  })
});
