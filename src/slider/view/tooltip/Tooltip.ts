import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";

class Tooltip implements IViewElement {
    element: HTMLElement;

    buildHtml(isVertical: boolean, text: string): HTMLElement {
        this.element = document.createElement('div');
        CssClassUtil.initClass(this, isVertical);
        this.updateText(text);
        return this.element;
    }

    updateText(text: string) {
        this.element.innerText = text;
    }
}

export default Tooltip;
