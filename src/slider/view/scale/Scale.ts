import IViewElement from "../IViewElement";
import CssClassUtil from "../utils/CssClassUtil";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import PositionUtil from "../utils/PositionUtil";

class Scale extends Observer implements IViewElement {
  private element: HTMLElement;

  getElement(): HTMLElement {
    return this.element;
  }

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this, isVertical);
    this.element.addEventListener('click', this.handleScaleClick);
    return this.element;
  }

  buildLineHtml(isVertical: boolean): HTMLDivElement {
    const line = document.createElement('div');
    CssClassUtil.initHtmlClass(line, isVertical, 'scale-line');
    return line;
  }

  updateLines(count: number, isVertical: boolean) {
    const diff = count - this.element.childElementCount;
    if (diff > 0) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < diff; i++) {
        fragment.append(this.buildLineHtml(isVertical));
      }
      this.element.append(fragment);
    } else if (diff < 0) {
      for (let i = 0; i < -diff; i++) {
        this.element.lastElementChild.remove();
      }
    }
  }

  toggle() {
    CssClassUtil.toggleHidden(this);
  }

  private handleScaleClick = (event: MouseEvent) => {
    this.notify(SliderEvent.sliderClick, PositionUtil.calculatePoint(this.element, event));
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this);
    this.element.childNodes.forEach((child: ChildNode) => {
      CssClassUtil.toggleHtmlOrientation(child as HTMLElement, 'scale-line');
    })
  }

}

export default Scale;
