import Range from './Range';
import CssClassUtil from '../../utils/CssClassUtil';

describe('Range class', () => {
  let range: Range;
  beforeEach(() => {
    range = new Range();
  });
  describe('buildHtml', () => {
    test('return prepared element', () => {
      const mockUtil = jest.spyOn(CssClassUtil, 'initClass');
      range.buildHtml(true);
      expect(range.getElement()).toBeDefined();
      expect(mockUtil).toBeCalled();
    });
  });

  describe('functions for built html', () => {
    beforeEach(() => {
      range.buildHtml(false);
    });

    test('getElement', () => {
      expect(range.getElement()).toBeDefined();
    });
    describe('toggleOrientation', () => {
      test('remove old style attributes', () => {
        range.getElement().style.left = '10px';
        range.toggleOrientation();
        expect(range.getElement().style.length).toBe(0);
      });
    });

    describe('updatePosition', () => {
      test('use percent for positioning on horizontal', () => {
        range.updatePosition(false, {min: 10, max: 90});
        expect(range.getElement().style.marginLeft).toBe('10%');
        expect(range.getElement().style.marginRight).toBe('10%');
      });

      test('use pixels for positioning on vertical', () => {
        range.updatePosition(true, {min: 10, max: 90}, 100);
        expect(range.getElement().style.marginBottom).toBe('10px');
        expect(range.getElement().style.marginTop).toBe('10px');
      });
    });
  });
});
