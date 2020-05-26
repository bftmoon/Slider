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

  buildLineHtml(isVertical: boolean, index: number, gap: number): HTMLDivElement {
    const line = document.createElement('div');
    line.style[isVertical ? 'bottom' : 'left'] = gap * index + '%';
    CssClassUtil.initHtmlClass(line, isVertical, 'scale-line');
    return line;
  }

  updateLines(step: number, size: number, isVertical: boolean) {
    this.element.innerHTML = '';

    const count = ~~(size / step) - Number(size % step === 0);
    if (count > 0) {
      const {percentStep, visibleCount} = this.calcGapAndCount(count, this.element[isVertical ? 'offsetHeight' : 'offsetWidth'], step, size);

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < visibleCount; i++) {
        fragment.append(this.buildLineHtml(isVertical, i + 1, percentStep));
      }
      this.element.append(fragment);
    }
  }

  calcGapAndCount(childCount: number, elementSize: number, modelStep: number, modelSize: number) {
    let pxStep = elementSize * modelStep / modelSize;
    while (pxStep <= 4) {
      pxStep *= 2;
      childCount /= 2;
    }
    return {percentStep: 100 * pxStep / elementSize, visibleCount: ~~childCount};
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this);
  }

  private handleScaleClick = (event: MouseEvent) => {
    this.notify(SliderEvent.sliderClick, PositionUtil.calcEventPoint(this.element, event));
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this);
    this.element.childNodes.forEach((child: ChildNode) => {
      CssClassUtil.toggleHtmlOrientation(child as HTMLElement, 'scale-line');
    })
  }
}

export default Scale;
