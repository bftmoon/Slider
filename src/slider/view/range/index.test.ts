import CssClassUtil from 'utils/CssClassUtil';

import { ClassNames } from '../../support/enums';

import Range from './index';

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
        range.updatePosition(false, { min: 10, max: 90 });
        expect(range.getElement().style.marginLeft).toBe('10%');
        expect(range.getElement().style.marginRight).toBe('10%');
        range.updatePosition(false, { min: 20 });
        expect(range.getElement().style.marginLeft).toBe('20%');
        expect(range.getElement().style.marginRight).toBe('10%');
        range.updatePosition(false, { max: 70 });
        expect(range.getElement().style.marginLeft).toBe('20%');
        expect(range.getElement().style.marginRight).toBe('30%');
      });

      test('use pixels for positioning on vertical', () => {
        range.updatePosition(true, { min: 10, max: 90 }, 100);
        expect(range.getElement().style.marginBottom).toBe('10px');
        expect(range.getElement().style.marginTop).toBe('10px');
        range.updatePosition(true, { min: 20 }, 100);
        expect(range.getElement().style.marginBottom).toBe('20px');
        expect(range.getElement().style.marginTop).toBe('10px');
        range.updatePosition(true, { max: 70 }, 100);
        expect(range.getElement().style.marginBottom).toBe('20px');
        expect(range.getElement().style.marginTop).toBe('30px');
      });
    });
  });
});
