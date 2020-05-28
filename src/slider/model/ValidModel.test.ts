import ValidModel from "./ValidModel";
import SliderError from "../SliderError";
import MinMaxPosition from "../common/MinMaxPosition";
import IModel from "./IModel";

describe('ValidModel class', () => {
  describe('Validators', () => {
    describe('isValidType', () => {
      test('Throw error for empty string', () => {
        expect(() => ValidModel.isValidType('')).toThrow(SliderError)
      });
      test('Throw error for null', () => {
        expect(() => ValidModel.isValidType(null)).toThrow(SliderError)
      });
      test('Throw error for undefined', () => {
        expect(() => ValidModel.isValidType(undefined)).toThrow(SliderError)
      });
      test('Throw error for string', () => {
        expect(() => ValidModel.isValidType('somebody once told me')).toThrow(SliderError)
      });
      test('Throw error for number with char end', () => {
        expect(() => ValidModel.isValidType('123gg')).toThrow(SliderError)
      });
      test('Throw error for number with char begin', () => {
        expect(() => ValidModel.isValidType('f12')).toThrow(SliderError)
      });
      test('Not throw error for number string', () => {
        expect(() => ValidModel.isValidType('123')).not.toThrow(SliderError)
      });
      test('Throw error for zero', () => {
        expect(() => ValidModel.isValidType('0')).not.toThrow(SliderError)
      });
      test('Throw error for number < 0', () => {
        expect(() => ValidModel.isValidType('-1')).not.toThrow(SliderError)
      });
    });

    describe('isPositiveRange', () => {
      test('Throw error when range <= 0', () => {
        expect(() => ValidModel.isPositiveRange(2, 1)).toThrow(SliderError)
        expect(() => ValidModel.isPositiveRange(1, 1)).not.toThrow(SliderError)
        expect(() => ValidModel.isPositiveRange(0, 1)).not.toThrow(SliderError)
      })
    })

    describe('isInBorderRange', () => {
      test('Throw error when not in borders', () => {
        const model = new ValidModel({border: {min: -10, max: 120}});
        expect(() => model.isInBorderRange(-40)).toThrow(SliderError)
        expect(() => model.isInBorderRange(130)).toThrow(SliderError)
        expect(() => model.isInBorderRange(110)).not.toThrow(SliderError)
      })
    })

    describe('isRangeActive', () => {
      test('Throw error when range off', () => {
        const model = new ValidModel({isRange: true});
        expect(() => model.isRangeActive()).not.toThrow(SliderError);
        model.toggleRange();
        expect(() => model.isRangeActive()).toThrow(SliderError);
      })
    })

    describe('isValidStep', () => {
      test('Throw error when step not in border range or <= 0', () => {
        const model = new ValidModel({border: {min: 0, max: 200}});
        expect(() => model.isValidStep(1)).not.toThrow(SliderError);
        expect(() => model.isValidStep(-1)).toThrow(SliderError);
        expect(() => model.isValidStep(0)).toThrow(SliderError);
        expect(() => model.isValidStep(300)).toThrow(SliderError);
      })
    })

    describe('isDivideToStepOrBorder', () => {
      test('Throw error when not divide on step and not one of borders', () => {
        const model = new ValidModel({border: {max: 100, min: 1}, step: 3});
        expect(() => model.isDivideToStepOrBorder(4)).not.toThrow(SliderError);
        expect(() => model.isDivideToStepOrBorder(1)).not.toThrow(SliderError);
        expect(() => model.isDivideToStepOrBorder(100)).not.toThrow(SliderError);
        expect(() => model.isDivideToStepOrBorder(3)).toThrow(SliderError);
      })
    })

    describe('isValidBorder', () => {
      test('Throw error when size of slider will be <= 1', () => {
        const model = new ValidModel({border: {max: 100, min: 3}});
        expect(() => model.isValidBorder(1, MinMaxPosition.min)).not.toThrow(SliderError);
        expect(() => model.isValidBorder(100, MinMaxPosition.min)).toThrow(SliderError);
        expect(() => model.isValidBorder(101, MinMaxPosition.min)).toThrow(SliderError);
        expect(() => model.isValidBorder(101, MinMaxPosition.max)).not.toThrow(SliderError);
        expect(() => model.isValidBorder(1, MinMaxPosition.max)).toThrow(SliderError);
        expect(() => model.isValidBorder(0, MinMaxPosition.max)).toThrow(SliderError);
      })
    })

    describe('isValidBorders', () => {
      test('Throw error when borders range <= 0', () => {
        expect(() => {
          ValidModel.isValidBorders(1, 10)
        }).not.toThrow(SliderError);
        expect(() => {
          ValidModel.isValidBorders(1, 1)
        }).toThrow(SliderError);
        expect(() => {
          ValidModel.isValidBorders(10, 1)
        }).toThrow(SliderError);
      })
    })
  });

  describe('Setters with validation', () => {
    const spy = {
      type: jest.spyOn(ValidModel, 'isValidType'),
      positiveRange: jest.spyOn(ValidModel, 'isPositiveRange'),
      inBorder: jest.spyOn(ValidModel.prototype, 'isInBorderRange'),
      isRange: jest.spyOn(ValidModel.prototype, 'isRangeActive'),
      step: jest.spyOn(ValidModel.prototype, 'isValidStep'),
      divideStep: jest.spyOn(ValidModel.prototype, 'isDivideToStepOrBorder'),
      goodBorder: jest.spyOn(ValidModel.prototype, 'isValidBorder'),
      goodBorders: jest.spyOn(ValidModel, 'isValidBorders'),
    }

    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe('setValidCurrent', () => {
      test('Call required validators for max', () => {
        const model = new ValidModel();
        model.setValidCurrent(60, MinMaxPosition.max);
        expect(spy.type).toBeCalledTimes(1);
        expect(spy.inBorder).toBeCalledTimes(1);
        expect(spy.positiveRange).toBeCalledTimes(1);
        expect(spy.divideStep).toBeCalledTimes(1);
        expect(model.getCurrent().max).toBe(60);
      })

      test('Call required validators for min', () => {
        const model = new ValidModel();
        model.setValidCurrent(8, MinMaxPosition.min);
        expect(spy.type).toBeCalledTimes(1);
        expect(spy.inBorder).toBeCalledTimes(1);
        expect(spy.isRange).toBeCalledTimes(1);
        expect(spy.positiveRange).toBeCalledTimes(1);
        expect(spy.divideStep).toBeCalledTimes(1);
        expect(model.getCurrent().min).toBe(8);
      })
    })

    describe('setValidCurrents', () => {
      test('Call required validators', () => {
        const model = new ValidModel();
        model.setValidCurrents(8, 40);
        expect(spy.isRange).toBeCalledTimes(1);
        expect(spy.type).toBeCalledTimes(2);
        expect(spy.inBorder).toBeCalledTimes(2);
        expect(spy.positiveRange).toBeCalledTimes(1);
        expect(spy.divideStep).toBeCalledTimes(2);
        expect(model.getCurrent()).toEqual({min: 8, max: 40});
      })
    })

    describe('setValidStep', () => {
      test('Call required validators', () => {
        const model = new ValidModel();
        model.setValidStep(3);
        expect(spy.type).toBeCalledTimes(1);
        expect(spy.step).toBeCalledTimes(1);
        expect(model.step).toBe(3);
      })
    })

    describe('setValidBorder', () => {
      test('Call required validators', () => {
        const model = new ValidModel();
        model.setValidBorder(3, MinMaxPosition.min);
        expect(spy.type).toBeCalledTimes(1);
        expect(spy.goodBorder).toBeCalledTimes(1);
        expect(model.border.min).toBe(3);
      })
    })

    describe('setValidBorders', () => {
      test('Call required validators', () => {
        const model = new ValidModel();
        model.setValidBorders(3, 89);
        expect(spy.type).toBeCalledTimes(2);
        expect(spy.goodBorders).toBeCalledTimes(1);
        expect(model.border).toEqual({min: 3, max: 89});
      })
    })


    describe('constructor', () => {
      test('Not throw error', () => {
        const options: IModel = {
          border: {min: -10, max: 20},
          current: {min: 0, max: 2},
          step: 3,
          isRange: true,
          isVertical: true,
          withScale: true,
          withTooltip: true
        };
        expect(() => {
          const model = new ValidModel(options);
          expect(model.getOptions()).toEqual(options);
        }).not.toThrow(SliderError);
      })
    })
  })
})
