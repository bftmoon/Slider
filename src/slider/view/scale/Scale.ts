import ViewElement from '../ViewElement';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import CssClassUtil from '../../utils/CssClassUtil';
import PositionUtil from '../../utils/PositionUtil';
import ClassNames from '../../utils/ClassNames';
import {ScalePointMoveData} from "../../types/NotifyData";

class Scale extends Observer implements ViewElement {
  private element: HTMLElement;
  private withClickHandle: boolean;

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.Scale);
    this.element.addEventListener('mousedown', this.handleScaleMouseDown)
    return this.element;
  }

  getElement(): HTMLElement {
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
      const {percentGap, visibleCount} = Scale.calcGapAndCount(count, this.element[isVertical ? 'offsetHeight' : 'offsetWidth'], step, size);

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

  private handleMouseMove = (event: MouseEvent) => {
    CssClassUtil.addGrabbing();
    this.withClickHandle = false;
    this.notify(SliderEvent.PointMoveByScale,
      (isVertical: boolean) => this.calcScaleMoveData(isVertical, event)
    )
  }

  private calcScaleMoveData(isVertical: boolean, event: MouseEvent): ScalePointMoveData {
    if (isVertical) return {
      diff: -event.movementY / this.element.offsetHeight,
      coordinate: event.clientY
    }
    return {
      diff: event.movementX / this.element.offsetWidth,
      coordinate: event.clientX
    }
  }

  private handleScaleMouseDown = () => {
    this.withClickHandle = true;
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseUp = (event: MouseEvent) => {
    CssClassUtil.removeGrabbing();
    if (this.withClickHandle) {
      this.notify(SliderEvent.SliderClick, (isVertical: boolean) => PositionUtil.calc(isVertical, this.element, event));
    } else {
      this.notify(SliderEvent.StopPointMoveByScale);
    }
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
}

export default Scale;
