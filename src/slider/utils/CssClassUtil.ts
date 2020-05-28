import IViewElement from "../view/IViewElement";

class CssClassUtil {
  static readonly MAIN_PREFIX = 'slider'

  static initClass(viewElement: IViewElement, isVertical: boolean) {
    const cssClass = CssClassUtil.getFullName(viewElement);
    viewElement.getElement().classList.add(cssClass, cssClass + (isVertical ? '_vertical' : '_horizontal'));
  }

  static initHtmlClass(element: HTMLElement, isVertical: boolean, name?: string) {
    const cssClass = CssClassUtil.MAIN_PREFIX + (name ? `__${name}` : '');
    element.classList.add(cssClass, cssClass + (isVertical ? '_vertical' : '_horizontal'));
  }

  static toggleOrientation(viewElement: IViewElement) {
    const cssClass = CssClassUtil.getFullName(viewElement);
    viewElement.getElement().classList.toggle(`${cssClass}_vertical`);
    viewElement.getElement().classList.toggle(`${cssClass}_horizontal`);
  }

  static toggleHtmlOrientation(element: HTMLElement, name?: string) {
    const cssClass = CssClassUtil.MAIN_PREFIX + (name ? `__${name}` : '');
    element.classList.toggle(`${cssClass}_vertical`);
    element.classList.toggle(`${cssClass}_horizontal`);
  }

  static toggleHidden(viewElement: IViewElement) {
    viewElement.getElement().classList.toggle(`${CssClassUtil.getFullName(viewElement)}_hidden`);
  }

  static toggleGrab(viewElement:IViewElement) {
    viewElement.getElement().classList.toggle(`${CssClassUtil.getFullName(viewElement)}_grabbed`);
  }

  private static getFullName(viewElement: IViewElement) {
    return `${CssClassUtil.MAIN_PREFIX}__${viewElement.constructor.name.toLowerCase()}`;
  }
}

export default CssClassUtil;
