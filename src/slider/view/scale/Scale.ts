import IViewElement from '../IViewElement';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import CssClassUtil from '../../utils/CssClassUtil';
import ConvertUtil from '../../utils/ConvertUtil';
import PositionUtil from '../../utils/PositionUtil';
import ClassNames from '../../utils/ClassNames';

class Scale extends Observer implements IViewElement {
  private element: HTMLElement;

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.scale);
    this.element.addEventListener('click', this.handleScaleClick);
    return this.element;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this.element, ClassNames.scale);
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this.element, ClassNames.scale);
    this.element.childNodes.forEach((child: ChildNode) => {
      CssClassUtil.toggleOrientation(child as HTMLElement, ClassNames.line);
    });
  }

  updateLines(step: number, size: number, isVertical: boolean) {
    this.element.innerHTML = '';
    const count = Math.floor(size / step) - Number(size % step === 0);
    if (count > 0) {
      const { percentGap, visibleCount } = Scale.calcGapAndCount(count, this.element[isVertical ? 'offsetHeight' : 'offsetWidth'], step, size);

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < visibleCount; i += 1) {
        fragment.append(Scale.buildLineHtml(isVertical, i + 1, percentGap));
      }
      this.element.append(fragment);
    }
  }

  private static buildLineHtml(isVertical: boolean, index: number, gap: number): HTMLDivElement {
    const line = document.createElement('div');
    line.style[isVertical ? 'bottom' : 'left'] = `${gap * index}%`;
    CssClassUtil.initClass(line, isVertical, ClassNames.line);
    return line;
  }

  private static calcGapAndCount(
    childCount: number,
    elementSize: number,
    modelStep: number,
    modelSize: number,
  ) {
    let pxGap = elementSize * (modelStep / modelSize);
    while (pxGap <= 4) {
      pxGap *= 2;
      childCount /= 2;
    }
    return {
      percentGap: ConvertUtil.toPercent(pxGap, elementSize),
      visibleCount: Math.floor(childCount),
    };
  }

  private handleScaleClick = (event: MouseEvent) => {
    this.notify(SliderEvent.sliderClick, PositionUtil.calcEventPoint(this.element, event));
  }
}

export default Scale;
