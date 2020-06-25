import { ClassNames } from 'support/enums';

class CssClassUtil {
  static readonly MAIN_PREFIX = 'slider';

  static initClass(
    element: HTMLElement,
    isVertical: boolean,
    name?: ClassNames,
  ) {
    const cssClass = CssClassUtil.getFullName(name);
    element.classList.add(
      cssClass,
      cssClass + (isVertical ? '_vertical' : '_horizontal'),
    );
  }

  static toggleOrientation(element: HTMLElement, name?: ClassNames) {
    const cssClass = CssClassUtil.getFullName(name);
    element.classList.toggle(`${cssClass}_vertical`);
    element.classList.toggle(`${cssClass}_horizontal`);
  }

  static toggleHidden(element: HTMLElement, name?: ClassNames) {
    element.classList.toggle(`${CssClassUtil.getFullName(name)}_hidden`);
  }

  static addGrabbing() {
    document.documentElement.classList.add('slider-plugin');
  }

  static removeGrabbing() {
    document.documentElement.classList.remove('slider-plugin');
  }

  private static getFullName(name?: ClassNames) {
    return name !== undefined
      ? `${CssClassUtil.MAIN_PREFIX}__${ClassNames[name].toLowerCase()}`
      : CssClassUtil.MAIN_PREFIX;
  }
}

export default CssClassUtil;
