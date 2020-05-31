import CssClassUtil from './CssClassUtil';
import ClassNames from './ClassNames';

describe('CssClassUtil class', () => {
  let element: HTMLElement;
  beforeEach(() => {
    element = document.createElement('div');
  });
  describe('initClass', () => {
    test('vertical', () => {
      CssClassUtil.initClass(element, true, ClassNames.point);
      expect(element.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__point ${CssClassUtil.MAIN_PREFIX}__point_vertical`);
    });
    test('horizontal', () => {
      CssClassUtil.initClass(element, false, ClassNames.point);
      expect(element.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX}__point ${CssClassUtil.MAIN_PREFIX}__point_horizontal`);
    });
    test('without name', () => {
      CssClassUtil.initClass(element, false);
      expect(element.classList.toString()).toBe(`${CssClassUtil.MAIN_PREFIX} ${CssClassUtil.MAIN_PREFIX}_horizontal`);
    });
  });

  describe('modifications', () => {
    beforeEach(() => {
      CssClassUtil.initClass(element, true, ClassNames.point);
    });
    test('toggleHidden', () => {
      CssClassUtil.toggleHidden(element, ClassNames.point);
      expect(element.classList).toContain(`${CssClassUtil.MAIN_PREFIX}__point_hidden`);
      CssClassUtil.toggleHidden(element, ClassNames.point);
      expect(element.classList).not.toContain(`${CssClassUtil.MAIN_PREFIX}__point_hidden`);
    });
    test('toggleOrientation', () => {
      CssClassUtil.toggleOrientation(element, ClassNames.point);
      expect(element.classList).toContain(`${CssClassUtil.MAIN_PREFIX}__point_horizontal`);
      expect(element.classList).not.toContain(`${CssClassUtil.MAIN_PREFIX}__point_vertical`);
      CssClassUtil.toggleOrientation(element, ClassNames.point);
      expect(element.classList).not.toContain(`${CssClassUtil.MAIN_PREFIX}__point_horizontal`);
      expect(element.classList).toContain(`${CssClassUtil.MAIN_PREFIX}__point_vertical`);
    });
    test('toggleGrab', () => {
      CssClassUtil.toggleGrab(element, ClassNames.point);
      expect(element.classList).toContain(`${CssClassUtil.MAIN_PREFIX}__point_grabbed`);
      CssClassUtil.toggleGrab(element, ClassNames.point);
      expect(element.classList).not.toContain(`${CssClassUtil.MAIN_PREFIX}__point_grabbed`);
    });
  });
});
