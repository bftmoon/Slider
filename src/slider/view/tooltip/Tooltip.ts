import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";

class Tooltip implements IViewElement {
  element: HTMLElement;

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this, isVertical);
    return this.element;
  }

  toggle() {
    CssClassUtil.toggleHidden(this);
  }

  updateText(text: any) {
    this.element.innerText = text.toString();
  }
}

export default Tooltip;
