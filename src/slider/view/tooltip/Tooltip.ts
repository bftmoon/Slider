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

  update(text: any, isVertical: boolean) {
    this.element.innerText = text.toString();

    if (!isVertical) {
      this.element.style.left = '';
      this.element.style.right = '';
      const rect = this.element.getBoundingClientRect();
      if (rect.x < 0) {
        this.element.style.left = '0';
      }
      if(rect.right > document.documentElement.offsetWidth){
        this.element.style.right = '0'
      }
    }
  }
}

export default Tooltip;
