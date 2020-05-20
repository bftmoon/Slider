import IViewElement from "./IViewElement";

class CssClassUtil {
    static readonly MAIN_PREFIX = 'slider'

    static initClass(viewElement: IViewElement, isVertical: boolean) {
        const cssClass = CssClassUtil.MAIN_PREFIX + '__' + viewElement.constructor.name.toLowerCase();
        viewElement.element.classList.add(cssClass, cssClass + (isVertical ? '_vertical' : '_horizontal'));
    }

    static initHtmlClass(element: HTMLElement, isVertical: boolean, name?: string) {
        const cssClass = CssClassUtil.MAIN_PREFIX + (name ? '__' + name : '');
        element.classList.add(cssClass, cssClass + (isVertical ? '_vertical' : '_horizontal'));
    }

    static toggleOrientation(viewElement: IViewElement) {
        const cssClass = CssClassUtil.MAIN_PREFIX + '__' + viewElement.constructor.name.toLowerCase();
        viewElement.element.classList.toggle(cssClass + '_vertical ')
        viewElement.element.classList.toggle(cssClass + '_horizontal');
    }

    static toggleHtmlOrientation(element: HTMLElement, name: string) {
        const cssClass = CssClassUtil.MAIN_PREFIX + '__' + name;
        element.classList.toggle(cssClass + '_vertical ')
        element.classList.toggle(cssClass + '_horizontal');
    }
}

export default CssClassUtil;
