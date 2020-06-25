import Model from 'model/Model';
import { Position, SliderEvent } from 'support/enums';
import SliderError from 'support/errors';
import MockView from 'view/MockView';

import Presenter from './Presenter';

describe('Presenter class', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('init', () => {
    test('call render and subscribe', () => {
      const spyRender = jest.spyOn(MockView.prototype, 'render');
      const spySubscribe = jest.spyOn(MockView.prototype, 'subscribe');
      new Presenter(new Model(), new MockView()).init(
        document.createElement('div'),
      );
      expect(spySubscribe).toBeCalledTimes(2);
      expect(spyRender).toBeCalledTimes(1);
    });
    test('throw error if element undefined', () => {
      const presenter = new Presenter(new Model(), new MockView());
      expect(() => presenter.init(undefined)).toThrow(SliderError);
    });
  });

  describe('handlers', () => {
    const mockView = new MockView();
    const model = new Model();
    const presenter = new Presenter(model, mockView);
    presenter.init(document.createElement('div'));

    describe('handleSliderClick', () => {
      test('not update if equal', () => {
        model.isSameCurrent = jest.fn(() => true);
        const calcMock = jest.fn(() => 0);
        const spyUpdate = jest.spyOn(Model.prototype, 'selectPosition');
        mockView.notify(SliderEvent.SliderClick, calcMock);
        expect(model.isSameCurrent).toBeCalled();
        expect(calcMock).toBeCalled();
        expect(spyUpdate).not.toBeCalled();
      });

      test('update if not equal', () => {
        model.isSameCurrent = jest.fn(() => false);
        const calcMock = jest.fn(() => 0);
        const spyUpdate = jest.spyOn(Model.prototype, 'selectPosition');
        mockView.notify(SliderEvent.SliderClick, calcMock);
        expect(model.isSameCurrent).toBeCalled();
        expect(calcMock).toBeCalled();
        expect(spyUpdate).toBeCalled();
      });
    });

    describe('handlePointMove', () => {
      test('simple update if min <= max', () => {
        const spyEqual = jest.spyOn(Model.prototype, 'areCurrentEqual');
        model.willCurrentCollapse = () => false;
        mockView.notify(SliderEvent.PointMove, () => ({ ratio: 0, position: Position.Min }));
        expect(spyEqual).not.toBeCalled();
      });

      test('not update if current already equal', () => {
        const spyModelUpdate = jest.spyOn(Model.prototype, 'setCurrent');
        const spyViewUpdate = jest.spyOn(MockView.prototype, 'updateCurrent');
        model.willCurrentCollapse = () => true;
        model.areCurrentEqual = () => true;
        mockView.notify(SliderEvent.PointMove, () => ({ ratio: 0, position: Position.Min }));
        expect(spyModelUpdate).not.toBeCalled();
        expect(spyViewUpdate).not.toBeCalled();
      });

      test('set moved point to value, equal to other point, if they collapse and not equal', () => {
        model.willCurrentCollapse = () => true;
        model.areCurrentEqual = () => false;
        model.getCurrent = (position) => {
          expect(position).toBe(Position.Max);
          return 0;
        };
        mockView.notify(SliderEvent.PointMove, () => ({ ratio: 0, position: Position.Min }));
      });
    });
  });
});
