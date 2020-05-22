import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";

class Range implements IViewElement {
  element: HTMLDivElement;

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this, isVertical);
    return this.element;
  }

  toggle() {
    CssClassUtil.toggleHidden(this);
  }

  updatePosition(isVertical: boolean, percent: { min?: number; max?: number }) {
    if (isVertical) {
      const heightPart = this.element.parentElement.clientHeight / 100;
      if (percent.min !== undefined) this.element.style.marginTop = heightPart * percent.min + 'px';
      if (percent.max !== undefined) this.element.style.marginBottom = heightPart * (100 - percent.max) + 'px';
    } else {
      if (percent.min !== undefined) this.element.style.marginLeft = percent.min + '%';
      if (percent.max !== undefined) this.element.style.marginRight = 100 - percent.max + '%'
    }
  }
}

export default Range;
