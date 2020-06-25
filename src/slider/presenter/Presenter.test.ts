import Model from 'model/Model';
import { Position, SliderEvent } from 'support/enums';
import MockView from 'view/MockView';

import Presenter from './Presenter';

describe('Presenter class', () => {
  describe('init', () => {
    test('call render and subscribe', () => {
      const spyRender = jest.spyOn(MockView.prototype, 'render');
      const spySubscribe = jest.spyOn(MockView.prototype, 'subscribe');
      new Presenter(new Model(), new MockView()).init(
        document.createElement('div'),
      );
      expect(spySubscribe).toBeCalledTimes(3);
      expect(spyRender).toBeCalledTimes(1);
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
        mockView.notify(SliderEvent.SliderClick, () => 0.1);
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
        model.toggleScale();
        const spyCalc = jest.spyOn(Model.prototype, 'calcValue');
        const spyScale = jest.spyOn(MockView.prototype, 'updateScaleLines');
        mockView.notify(SliderEvent.PointMove, () => ({
          ratio: 0.2,
          position: Position.Min,
        }));
        expect(spyCalc).toBeCalled();
        expect(spyScale).not.toBeCalled();
      });
    });
  });
});
