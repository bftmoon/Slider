import { SliderEvent } from 'support/enums';
import CssClassUtil from 'utils/CssClassUtil';
import PositionUtil from 'utils/PositionUtil';

import Scale from './index';

describe('Scale class', () => {
  let scale: Scale;

  beforeEach(() => {
    scale = new Scale();
    jest.clearAllMocks();
  });

  describe('buildHtml', () => {
    test('return prepared element', () => {
      const spy = jest.spyOn(CssClassUtil, 'initClass');
      const html = scale.buildHtml(true);
      expect(spy).toBeCalledTimes(1);
      expect(html).toBeDefined();
    });
  });

  describe('with created html', () => {
    beforeEach(() => {
      scale.buildHtml(true);
    });

    test('getElement', () => {
      expect(scale.getElement()).toBeDefined();
    });

    describe('toggleHidden', () => {
      test('change class', () => {
        const spy = jest.spyOn(CssClassUtil, 'toggleHidden');
        scale.toggleHidden();
        expect(spy).toBeCalledTimes(1);
      });
    });

    describe('toggleOrientation', () => {
      test('update element class', () => {
        const spy = jest.spyOn(CssClassUtil, 'toggleOrientation');
        scale.toggleOrientation();
        expect(spy).toBeCalledTimes(1);
      });
      test('also update lines', () => {
        Object.defineProperty(scale.getElement(), 'offsetHeight', {
          value: 500,
        });
        scale.updateLines(1, 100, true);
        const spy = jest.spyOn(CssClassUtil, 'toggleOrientation');
        expect(scale.getElement().childElementCount).toBeGreaterThan(0);
        scale.toggleOrientation();
        expect(spy).toBeCalledTimes(100);
        spy.mockClear();
        scale.getElement().innerHTML = '';
        scale.toggleOrientation();
        expect(spy).toBeCalledTimes(1);
      });
    });

    describe('updateLines', () => {
      test('count of lines when it can be fit', () => {
        Object.defineProperty(scale.getElement(), 'offsetHeight', {
          value: 500,
        });
        scale.updateLines(2, 100, true);
        expect(scale.getElement().childElementCount).toBe(49);
      });

      test('count of lines when it can not be fit', () => {
        Object.defineProperty(scale.getElement(), 'offsetWidth', { value: 50 });
        scale.updateLines(2, 100, false);
        expect(scale.getElement().childElementCount).toBe(6);
      });

      test('count of lines < 0', () => {
        scale.updateLines(4, 3, true);
        expect(scale.getElement().childElementCount).toBe(0);
      });
    });

    test('handleScaleMouseDown', () => new Promise((done) => {
      const spy = jest.spyOn(PositionUtil, 'calc');
      const event = new MouseEvent('mousedown');
      scale.subscribe(SliderEvent.SliderClick, (func) => {
        try {
          func(true);
          expect(spy).toBeCalledWith(true, scale.getElement(), event);
          spy.mockClear();
          func(false);
          expect(spy).toBeCalledWith(false, scale.getElement(), event);
          done();
        } catch (error) {
          done(error);
        }
      });
      scale.getElement().dispatchEvent(event);
    }));
  });
});
