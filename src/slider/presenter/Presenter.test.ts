import Presenter from './Presenter';
import SliderError from '../SliderError';
import MockView from '../view/MockView';
import SliderEvent from '../observer/SliderEvent';
import MinMaxPosition from '../types/MinMaxPosition';
import Model from '../model/Model';

describe('Presenter class', () => {
  describe('init', () => {
    test('Throw error when element undefined', () => {
      let div: HTMLElement;
      expect(() => {
        new Presenter(new Model(), new MockView()).init(div);
      }).toThrow(SliderError);
    });
    test('call all required methods', () => {
      const spyRender = jest.spyOn(MockView.prototype, 'render');
      const spySubscribe = jest.spyOn(MockView.prototype, 'subscribe');
      const spyOptions = jest.spyOn(Model.prototype, 'getBoolOptions');
      const spyPoint = jest.spyOn(Model.prototype, 'getCurrentPoints');
      const spyRange = jest.spyOn(Model.prototype, 'getRangeSize');
      new Presenter(new Model(), new MockView()).init(document.createElement('div'));
      expect(spyPoint).toBeCalled();
      expect(spyRange).toBeCalled();
      expect(spyOptions).toBeCalled();
      expect(spySubscribe).toBeCalled();
      expect(spyRender).toBeCalled();
    });
  });

  describe('handlers', () => {
    let presenter: Presenter;
    let mockView: MockView;
    const model = new Model({
      border: { min: 0, max: 100 },
      current: { min: 10, max: 20 },
      isVertical: false,
    });
    beforeEach(() => {
      mockView = new MockView();
      presenter = new Presenter(model, mockView);
      presenter.init(document.createElement('div'));
      jest.fn().mockReset();
    });
    describe('handleSliderClick', () => {
      test('not update if equal', () => {
        const spyCalc = jest.spyOn(Model.prototype, 'calcValue');
        const spyCompare = jest.spyOn(Model.prototype, 'isSameCurrent');
        const spyUpdate = jest.spyOn(Model.prototype, 'selectPosition');
        mockView.notify(SliderEvent.SliderClick, () => 0.10);
        expect(spyCalc).toBeCalled();
        expect(spyCompare).toBeCalled();
        expect(spyUpdate).not.toBeCalled();
      });
      test('update if not equal', () => {
        const spyCalc = jest.spyOn(Model.prototype, 'calcValue');
        const spyCompare = jest.spyOn(Model.prototype, 'isSameCurrent');
        const spyUpdate = jest.spyOn(Model.prototype, 'selectPosition');
        mockView.notify(SliderEvent.SliderClick, () => 1);
        expect(spyCalc).toBeCalled();
        expect(spyCompare).toBeCalled();
        expect(spyUpdate).toBeCalled();
      });
    });
    describe('handlePointMove', () => {
      test('start update', () => {
        model.withScale = false;
        const spyCalc = jest.spyOn(Model.prototype, 'calcValue');
        const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
        mockView.notify(SliderEvent.PointMove, () => (
          { ratio: 0.2, position: MinMaxPosition.Min }
        ));
        expect(spyCalc).toBeCalled();
        expect(spyScale).not.toBeCalled();
      });
    });
  });
});
