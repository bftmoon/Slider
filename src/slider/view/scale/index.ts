import Observer from 'observer/index';
import { ClassNames, SliderEvent } from 'support/enums';
import CssClassUtil from 'utils/CssClassUtil';
import PositionUtil from 'utils/PositionUtil';

class Scale extends Observer {
  private element: HTMLElement;

  buildHtml(isVertical: boolean) {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.Scale);
    this.element.addEventListener('mousedown', this.handleScaleMouseDown);
    return this.element;
  }

  getElement() {
    return this.element;
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this.element, ClassNames.Scale);
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this.element, ClassNames.Scale);
    this.element.childNodes.forEach((child: ChildNode) => {
      CssClassUtil.toggleOrientation(child as HTMLElement, ClassNames.Line);
      return null;
    });
  }

  updateLines(step: number, size: number, isVertical: boolean) {
    this.element.innerHTML = '';
    const count = Math.floor(size / step) - Number(size % step === 0);
    if (count > 0) {
      const { percentGap, visibleCount } = Scale.calcGapAndCount(
        count,
        this.element[isVertical ? 'offsetHeight' : 'offsetWidth'],
        step,
        size,
      );

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < visibleCount; i += 1) {
        fragment.append(Scale.buildLineHtml(isVertical, i + 1, percentGap));
      }
      this.element.append(fragment);
    }
  }

  private static buildLineHtml(
    isVertical: boolean,
    index: number,
    gap: number,
  ) {
    const line = document.createElement('div');
    line.style[isVertical ? 'bottom' : 'left'] = `${gap * index}%`;
    CssClassUtil.initClass(line, isVertical, ClassNames.Line);
    return line;
  }

  private static calcGapAndCount(
    childCount: number,
    elementSize: number,
    modelStep: number,
    modelSize: number,
  ) {
    let count = childCount;
    let pxGap = elementSize * (modelStep / modelSize);
    while (pxGap <= 4) {
      pxGap *= 2;
      count /= 2;
    }
    return {
      percentGap: 100 * (pxGap / elementSize),
      visibleCount: Math.floor(count),
    };
  }

  private handleScaleMouseDown = (event: MouseEvent) => {
    this.notify(
      SliderEvent.SliderClick,
      (isVertical: boolean) => PositionUtil.calc(isVertical, this.element, event),
    );
  };
}

export default Scale;
