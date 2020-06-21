import MockView from '../view/MockView';
import DefaultValidModel from '../model/DefaultValidModel';
import PresenterProxy from './PresenterProxy';
import SliderEvent from '../observer/SliderEvent';
import MinMaxPosition from '../types/MinMaxPosition';
import SliderOptions from '../types/SliderOptions';

describe('PresenterProxy class', () => {
  let presenter: PresenterProxy;
  const options: SliderOptions = {
    border: { min: 0, max: 100 },
    current: { min: 10, max: 80 },
    step: 2,
    isRange: true,
    isVertical: true,
    withTooltip: true,
    withScale: true,
  };
  const view = new MockView();
  let model: DefaultValidModel;
  beforeEach(() => {
    model = new DefaultValidModel(options);
    presenter = new PresenterProxy(model, view);
    jest.resetAllMocks();
  });
  describe('getOptions', () => {
    test('equals options on init', () => {
      expect(presenter.getOptions()).toEqual(options);
    });
  });
  describe('addSlideListener', () => {
    test('subscribe to current changes', () => {
      const spy = jest.spyOn(PresenterProxy.prototype, 'subscribe');
      const callback = () => {};
      presenter.addSlideListener(callback);
      expect(spy).toBeCalledWith(SliderEvent.ValueChanged, callback);
    });
  });
  describe('current setters', () => {
    test('setCurrentRange', () => {
      const spyModel = jest.spyOn(DefaultValidModel.prototype, 'setValidCurrents');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setCurrentRange(2, 16);
      expect(spyModel).toBeCalled();
      expect(spyView).toBeCalled();
    });
    test('setCurrentRangeMin', () => {
      const spyModel = jest.spyOn(DefaultValidModel.prototype, 'setValidCurrent');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setCurrentRangeMin(2);
      expect(spyModel).toBeCalledWith(2, MinMaxPosition.Min);
      expect(spyView).toBeCalled();
    });
    test('setCurrentRangeMax', () => {
      const spyModel = jest.spyOn(DefaultValidModel.prototype, 'setValidCurrent');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setCurrentRangeMax(12);
      expect(spyModel).toBeCalledWith(12, MinMaxPosition.Max);
      expect(spyView).toBeCalled();
    });
    test('setCurrent', () => {
      model.isRange = false;
      const spyModel = jest.spyOn(PresenterProxy.prototype, 'setCurrentRangeMax');
      presenter.setCurrent(4);
      expect(spyModel).toBeCalled();
    });
  });

  describe('setStep', () => {
    test('set without scale and range', () => {
      model.isRange = false;
      model.withScale = false;
      const spyValid = jest.spyOn(DefaultValidModel.prototype, 'setValidStep');
      const spyNormalize = jest.spyOn(DefaultValidModel.prototype, 'normalizeByStep');
      presenter.setStep(8);
      expect(spyValid).toBeCalled();
      expect(spyNormalize).toBeCalled();
    });
    test('set with range', () => {
      model.withScale = false;
      const spyNormalize = jest.spyOn(DefaultValidModel.prototype, 'normalizeByStep');
      presenter.setStep(8);
      expect(spyNormalize).toBeCalledTimes(2);
    });
    test('set with scale', () => {
      const spyView = jest.spyOn(MockView.prototype, 'updateScaleLines');
      presenter.setStep(8);
      expect(spyView).toBeCalled();
    });
  });

  describe('border setters', () => {
    test('setBorderMin', () => {
      const spyValid = jest.spyOn(DefaultValidModel.prototype, 'setValidBorder');
      const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
      const spyPoints = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setBorderMin(6);
      expect(spyValid).toBeCalledWith(6, MinMaxPosition.Min);
      expect(spyScale).toBeCalled();
      expect(spyPoints).toBeCalled();
    });
    test('setBorderMax', () => {
      const spyValid = jest.spyOn(DefaultValidModel.prototype, 'setValidBorder');
      const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
      const spyPoints = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setBorderMax(26);
      expect(spyValid).toBeCalledWith(26, MinMaxPosition.Max);
      expect(spyScale).toBeCalled();
      expect(spyPoints).toBeCalled();
    });
    test('setBorders', () => {
      const spyValid = jest.spyOn(DefaultValidModel.prototype, 'setValidBorders');
      const spyPoints = jest.spyOn(MockView.prototype, 'updatePosition');
      presenter.setBorders(2, 50);
      expect(spyValid).toBeCalled();
      expect(spyPoints).toBeCalled();
    });
  });
  describe('toggles', () => {
    describe('toggleRange', () => {
      test('with normalization', () => {
        model.setCurrent({ min: 60, max: 40 });
        model.isRange = false;
        model.setCurrent({ max: 40 });
        const spyNormalize = jest.spyOn(DefaultValidModel.prototype, 'normalizeCurrentOrder');
        const spyUpdate = jest.spyOn(MockView.prototype, 'updatePosition');
        const spyNotify = jest.spyOn(PresenterProxy.prototype, 'notify');
        presenter.toggleRange();
        expect(spyNormalize).toBeCalled();
        expect(spyNotify).toBeCalled();
        expect(spyUpdate).toBeCalledTimes(2);
      });
      test('normalization not required', () => {
        const spyToggleModel = jest.spyOn(DefaultValidModel.prototype, 'toggleRange');
        const spyToggleView = jest.spyOn(MockView.prototype, 'toggleRange');
        const spyUpdate = jest.spyOn(MockView.prototype, 'updatePosition');
        const spyCheck = jest.spyOn(DefaultValidModel.prototype, 'isOrderNormalizeRequired');
        presenter.toggleRange();
        expect(spyToggleModel).toBeCalled();
        expect(spyToggleView).toBeCalled();
        expect(spyCheck).toBeCalled();
        expect(spyUpdate).toBeCalled();
      });
    });
    describe('toggleScale', () => {
      test('update scale when on', () => {
        const spy = jest.spyOn(MockView.prototype, 'updateScaleLines');
        model.withScale = false;
        presenter.toggleScale();
        expect(spy).toBeCalled();
      });
      test('toggle model anv view', () => {
        const spyModel = jest.spyOn(DefaultValidModel.prototype, 'toggleScale');
        const spyView = jest.spyOn(MockView.prototype, 'toggleScale');
        presenter.toggleScale();
        expect(spyModel).toBeCalled();
        expect(spyView).toBeCalled();
      });
    });
    test('toggleTooltip', () => {
      const spyModel = jest.spyOn(DefaultValidModel.prototype, 'toggleTooltip');
      const spyView = jest.spyOn(MockView.prototype, 'toggleTooltip');
      presenter.toggleTooltip();
      expect(spyView).toBeCalled();
      expect(spyModel).toBeCalled();
    });
    test('toggleOrientation', () => {
      const spyModel = jest.spyOn(DefaultValidModel.prototype, 'toggleOrientation');
      const spyView = jest.spyOn(MockView.prototype, 'toggleOrientation');
      const spyPoints = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');

      presenter.toggleOrientation();
      expect(spyView).toBeCalled();
      expect(spyModel).toBeCalled();
      expect(spyPoints).toBeCalled();
      expect(spyScale).toBeCalled();
    });
  });
});
