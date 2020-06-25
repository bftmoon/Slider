import ValidModel from 'model/ValidModel';
import Observer from 'observer/index';
import { SliderEvent } from 'support/enums';
import SliderOptions from 'support/types';
import MockView from 'view/MockView';

import PresenterProxy from './PresenterProxy';

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
  let model: ValidModel;

  beforeEach(() => {
    model = new ValidModel(options);
    presenter = new PresenterProxy(model, view);
    jest.resetAllMocks();
  });

  describe('addSlideListener', () => {
    test('subscribe to current changes', () => {
      const spy = jest.spyOn(PresenterProxy.prototype, 'subscribe');
      const callback = () => {
      };
      presenter.addSlideListener(callback);
      expect(spy).toBeCalledWith(SliderEvent.ValueChanged, callback);
    });
  });

  describe('current setters', () => {
    test('setCurrentRange', () => {
      const spyModel = jest.spyOn(ValidModel.prototype, 'setValidCurrents');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyNotify = jest.spyOn(Observer.prototype, 'notify');
      presenter.setCurrentRange(6, 16);
      expect(spyModel).toBeCalled();
      expect(spyView).toBeCalled();
      expect(spyNotify).toBeCalled();
    });

    test('setCurrentRangeMin', () => {
      const spyModel = jest.spyOn(ValidModel.prototype, 'setValidCurrent');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyNotify = jest.spyOn(Observer.prototype, 'notify');
      presenter.setCurrentRangeMin(2);
      expect(spyModel).toBeCalled();
      expect(spyView).toBeCalled();
      expect(spyNotify).toBeCalled();
    });

    test('setCurrentRangeMax', () => {
      const spyModel = jest.spyOn(ValidModel.prototype, 'setValidCurrent');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyNotify = jest.spyOn(Observer.prototype, 'notify');
      presenter.setCurrentRangeMax(12);
      expect(spyModel).toBeCalled();
      expect(spyView).toBeCalled();
      expect(spyNotify).toBeCalled();
    });

    test('setCurrent', () => {
      model.toggleRange();
      const spyModel = jest.spyOn(
        PresenterProxy.prototype,
        'setCurrentRangeMax',
      );
      presenter.setCurrent(4);
      expect(spyModel).toBeCalled();
    });
  });

  describe('setStep', () => {
    test('set without scale', () => {
      model.toggleScale();
      const spyValid = jest.spyOn(ValidModel.prototype, 'setValidStep');
      const spyView = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyNotify = jest.spyOn(Observer.prototype, 'notify');
      const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
      presenter.setStep(8);
      expect(spyValid).toBeCalled();
      expect(spyView).toBeCalled();
      expect(spyNotify).toBeCalled();
      expect(spyScale).not.toBeCalled();
    });
    test('set with scale', () => {
      const spyView = jest.spyOn(MockView.prototype, 'updateScaleLines');
      presenter.setStep(8);
      expect(spyView).toBeCalled();
    });
  });

  describe('border setters', () => {
    const spyValid = jest.spyOn(ValidModel.prototype, 'setValidBorders');
    const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
    const spyPoints = jest.spyOn(MockView.prototype, 'updatePosition');

    test('setBorderMin', () => {
      presenter.setBorderMin(6);
      expect(spyValid).toBeCalled();
      expect(spyScale).toBeCalled();
      expect(spyPoints).toBeCalled();
    });

    test('setBorderMax', () => {
      presenter.setBorderMax(26);
      expect(spyValid).toBeCalled();
      expect(spyScale).toBeCalled();
      expect(spyPoints).toBeCalled();
    });

    test('setBorders', () => {
      presenter.setBorders(2, 50);
      expect(spyValid).toBeCalled();
      expect(spyScale).toBeCalled();
      expect(spyPoints).toBeCalled();
    });
  });

  describe('toggles', () => {
    test('toggleRange', () => {
      const spyToggleModel = jest.spyOn(ValidModel.prototype, 'toggleRange');
      const spyToggleView = jest.spyOn(MockView.prototype, 'toggleRange');
      const spyUpdate = jest.spyOn(MockView.prototype, 'updatePosition');
      const spyNotify = jest.spyOn(Observer.prototype, 'notify');
      presenter.toggleRange();
      expect(spyToggleModel).toBeCalled();
      expect(spyToggleView).toBeCalled();
      expect(spyUpdate).toBeCalled();
      expect(spyNotify).toBeCalled();
    });
  });

  test('toggleScale', () => {
    const spyModel = jest.spyOn(ValidModel.prototype, 'toggleScale');
    const spyView = jest.spyOn(MockView.prototype, 'toggleScale');
    const spyLines = jest.spyOn(MockView.prototype, 'updateScaleLines');
    presenter.toggleScale();
    expect(spyModel).toBeCalled();
    expect(spyView).toBeCalled();
    expect(spyLines).not.toBeCalled();
    presenter.toggleScale();
    expect(spyLines).toBeCalled();
  });

  test('toggleTooltip', () => {
    const spyModel = jest.spyOn(ValidModel.prototype, 'toggleTooltip');
    const spyView = jest.spyOn(MockView.prototype, 'toggleTooltip');
    presenter.toggleTooltip();
    expect(spyView).toBeCalled();
    expect(spyModel).toBeCalled();
  });

  test('toggleOrientation', () => {
    const spyModel = jest.spyOn(ValidModel.prototype, 'toggleOrientation');
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
