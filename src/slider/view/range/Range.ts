import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import MinMax from "../../common-interfaces/MinMax";

class Range implements IViewElement {
  element: HTMLDivElement;

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this, isVertical);
    return this.element;
  }

  updatePosition(isVertical: boolean, percent: MinMax<number>) {
    if (isVertical) {
      const heightPart = this.element.parentElement.clientHeight / 100;
      if (percent.min !== undefined) this.element.style.marginBottom = heightPart * (100 - percent.min) + 'px';
      if (percent.max !== undefined) this.element.style.marginTop = heightPart * percent.max + 'px';
    } else {
      if (percent.min !== undefined) this.element.style.marginLeft = percent.min + '%';
      if (percent.max !== undefined) this.element.style.marginRight = 100 - percent.max + '%'
    }
  }
}

export default Range;
