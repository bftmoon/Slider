import ClassNames from './ClassNames';
import CssClassUtil from './CssClassUtil';

describe('CssClassUtil class', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('initClass', () => {
    test('vertical', () => {
      CssClassUtil.initClass(element, true, ClassNames.Point);
      expect(element.classList.toString()).toBe(
        `${CssClassUtil.MAIN_PREFIX}__point ${CssClassUtil.MAIN_PREFIX}__point_vertical`,
      );
    });

    test('horizontal', () => {
      CssClassUtil.initClass(element, false, ClassNames.Point);
      expect(element.classList.toString()).toBe(
        `${CssClassUtil.MAIN_PREFIX}__point ${CssClassUtil.MAIN_PREFIX}__point_horizontal`,
      );
    });

    test('without name', () => {
      CssClassUtil.initClass(element, false);
      expect(element.classList.toString()).toBe(
        `${CssClassUtil.MAIN_PREFIX} ${CssClassUtil.MAIN_PREFIX}_horizontal`,
      );
    });
  });

  describe('modifications', () => {
    beforeEach(() => {
      CssClassUtil.initClass(element, true, ClassNames.Point);
    });

    test('toggleHidden', () => {
      CssClassUtil.toggleHidden(element, ClassNames.Point);
      expect(element.classList).toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_hidden`,
      );
      CssClassUtil.toggleHidden(element, ClassNames.Point);
      expect(element.classList).not.toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_hidden`,
      );
    });

    test('toggleOrientation', () => {
      CssClassUtil.toggleOrientation(element, ClassNames.Point);
      expect(element.classList).toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_horizontal`,
      );
      expect(element.classList).not.toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_vertical`,
      );
      CssClassUtil.toggleOrientation(element, ClassNames.Point);
      expect(element.classList).not.toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_horizontal`,
      );
      expect(element.classList).toContain(
        `${CssClassUtil.MAIN_PREFIX}__point_vertical`,
      );
    });
  });
});
