import CssClassUtil from '../../utils/CssClassUtil';
import Scale from './Scale';

describe('Scale class', () => {
  let scale: Scale;
  beforeEach(() => {
    scale = new Scale();
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
    test('toggleOrientation', () => {
      const spy = jest.spyOn(CssClassUtil, 'toggleOrientation');
      scale.toggleOrientation();
      expect(spy).toBeCalledTimes(1);
    });
    describe('updateLines', () => {
      test('count of lines when it can be fit', () => {
        Object.defineProperty(scale.getElement(), 'offsetHeight', {value: 500});
        scale.updateLines(2, 100, true);
        expect(scale.getElement().childElementCount).toBe(49);
      });
      test('count of lines when it can not be fit', () => {
        Object.defineProperty(scale.getElement(), 'offsetWidth', {value: 50});
        scale.updateLines(2, 100, false);
        expect(scale.getElement().childElementCount).toBe(6);
      });
    });
  });
});
