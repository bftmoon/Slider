import IViewElement from '../IViewElement';
import CssClassUtil from '../../utils/CssClassUtil';
import ClassNames from '../../utils/ClassNames';

class Tooltip implements IViewElement {
  private element: HTMLElement;

  getElement(): HTMLElement {
    return this.element;
  }

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.tooltip);
    return this.element;
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this.element, ClassNames.tooltip);
  }

  update(text: any, isVertical: boolean) {
    this.element.innerText = text.toString();
    if (!isVertical) {
      this.element.style.left = '';
      this.element.style.right = '';
      const rect = this.element.getBoundingClientRect();
      if (rect.left < 0) {
        this.element.style.left = '0';
      }
      if (rect.right > document.documentElement.offsetWidth) {
        this.element.style.right = '0';
      }
    }
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this.element, ClassNames.tooltip);
  }
}

export default Tooltip;
