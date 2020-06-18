import DefaultValidModel from './DefaultValidModel';
import SliderError from '../SliderError';
import Options from './Options';
import MinMaxPosition from '../common/MinMaxPosition';

describe('DefaultValidModel class', () => {
  describe('constructor', () => {
    test('Not throw error', () => {
      const options: Options = {
        border: { min: -10, max: 20 },
        current: { min: 0, max: 2 },
        step: 3,
        isRange: true,
        isVertical: true,
        withScale: true,
        withTooltip: true,
      };
      expect(() => {
        const model = new DefaultValidModel(options);
        expect(model.getOptions()).toEqual(options);
      }).not.toThrow(SliderError);
    });
  });
  describe('setValidCurrents', () => {
    test('Throw error when set min and range off', () => {
      const model = new DefaultValidModel({ isRange: false });
      expect(() => model.setValidCurrents(3, 4)).toThrow(SliderError);
    });
    test('Throw error when set not number', () => {
      const model = new DefaultValidModel({ isRange: true });
      expect(() => model.setValidCurrents('', 4)).toThrow(SliderError);
      expect(() => model.setValidCurrents(4, '')).toThrow(SliderError);
      expect(() => model.setValidCurrents('', '')).toThrow(SliderError);
      expect(() => model.setValidCurrents(4, 5)).not.toThrow(SliderError);
    });
    test('Throw error when set current not in borders', () => {
      const model = new DefaultValidModel({ isRange: true, border: { min: 0, max: 200 } });
      expect(() => model.setValidCurrents(-100, 12)).toThrow(SliderError);
      expect(() => model.setValidCurrents(20, 300)).toThrow(SliderError);
      expect(() => model.setValidCurrents(10, 20)).not.toThrow(SliderError);
    });
    test('Throw error when set current min >= max', () => {
      const model = new DefaultValidModel({ isRange: true, current: { min: 10, max: 20 } });
      expect(() => model.setValidCurrents(30, 10)).toThrow(SliderError);
      expect(() => model.setValidCurrents(30, 50)).not.toThrow(SliderError);
    });
    test('Throw error when set number not according step or border', () => {
      const model = new DefaultValidModel({
        isRange: true,
        current: { min: 0, max: 30 },
        step: 3,
        border: { min: 0, max: 200 },
      });
      expect(() => model.setValidCurrents(32, 60)).toThrow(SliderError);
      expect(() => model.setValidCurrents(30, 62)).toThrow(SliderError);
      expect(() => model.setValidCurrents(30, 60)).not.toThrow(SliderError);
    });
  });
  describe('setValidCurrent', () => {
    test('Throw error when set min and range off', () => {
      const model = new DefaultValidModel({ isRange: false });
      expect(() => model.setValidCurrent(3, MinMaxPosition.min)).toThrow(SliderError);
    });
    test('Throw error when set not number', () => {
      const model = new DefaultValidModel({ isRange: false });
      expect(() => model.setValidCurrent('', MinMaxPosition.min)).toThrow(SliderError);
    });
    test('Throw error when set current not in borders', () => {
      const model = new DefaultValidModel({ isRange: true, border: { min: 0, max: 200 } });
      expect(() => model.setValidCurrent(-100, MinMaxPosition.min)).toThrow(SliderError);
    });
    test('Throw error when set current min >= max', () => {
      const model = new DefaultValidModel({ isRange: true, current: { min: 10, max: 20 } });
      expect(() => model.setValidCurrent(30, MinMaxPosition.min)).toThrow(SliderError);
    });
    test('Throw error when set number not according step orr border', () => {
      const model = new DefaultValidModel({
        isRange: true,
        current: { min: 0, max: 30 },
        step: 3,
        border: { min: 0, max: 200 },
      });
      expect(() => model.setValidCurrent(32, MinMaxPosition.max)).toThrow(SliderError);
      expect(() => model.setValidCurrent(60, MinMaxPosition.max)).not.toThrow(SliderError);
      expect(() => model.setValidCurrent(200, MinMaxPosition.max)).not.toThrow(SliderError);
    });
  });
  describe('setValidStep', () => {
    test('throw error in not number', () => {
      const model = new DefaultValidModel({ border: { min: 0, max: 100 } });
      expect(() => model.setValidStep('')).toThrow(SliderError);
      expect(() => model.setValidStep(4)).not.toThrow(SliderError);
    });
    test('throw error when not in borders', () => {
      const model = new DefaultValidModel({ border: { min: 0, max: 100 } });
      expect(() => model.setValidStep(120)).toThrow(SliderError);
      expect(() => model.setValidStep(4)).not.toThrow(SliderError);
    });
    test('throw error when step <= 0', () => {
      const model = new DefaultValidModel({ border: { min: 0, max: 100 } });
      expect(() => model.setValidStep(0)).toThrow(SliderError);
      expect(() => model.setValidStep(-3)).toThrow(SliderError);
    });
  });
  describe('setValidBorder', () => {
    test('throw error when borders range <= 0', () => {
      const model = new DefaultValidModel({ border: { min: 0, max: 200 } });
      expect(() => model.setValidBorder(300, MinMaxPosition.min)).toThrow(SliderError);
      expect(() => model.setValidBorder(200, MinMaxPosition.min)).toThrow(SliderError);
      expect(() => model.setValidBorder(0, MinMaxPosition.max)).toThrow(SliderError);
      expect(() => model.setValidBorder(-300, MinMaxPosition.max)).toThrow(SliderError);
      expect(() => model.setValidBorder(300, MinMaxPosition.max)).not.toThrow(SliderError);
      expect(() => model.setValidBorder(-100, MinMaxPosition.min)).not.toThrow(SliderError);
    });

    test('Throw error when set not number', () => {
      const model = new DefaultValidModel({ isRange: true });
      expect(() => model.setValidBorder(4, MinMaxPosition.min)).not.toThrow(SliderError);
      expect(() => model.setValidBorder('', MinMaxPosition.min)).toThrow(SliderError);
    });
  });
  describe('setValidBorders', () => {
    test('throw error when borders range <= 0', () => {
      const model = new DefaultValidModel({ border: { min: 0, max: 200 } });
      expect(() => model.setValidBorders(100, 0)).toThrow(SliderError);
      expect(() => model.setValidBorders(0, 100)).not.toThrow(SliderError);
    });

    test('Throw error when set not number', () => {
      const model = new DefaultValidModel({ isRange: true });
      expect(() => model.setValidBorders('', 0)).toThrow(SliderError);
      expect(() => model.setValidBorders(0, '')).toThrow(SliderError);
      expect(() => model.setValidBorders('', '')).toThrow(SliderError);
      expect(() => model.setValidBorders(0, 100)).not.toThrow(SliderError);
    });
  });
});
