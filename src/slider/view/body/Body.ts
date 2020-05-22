import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Point from "../point/Point";
import Range from "../range/Range";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import {IAbsolutePoint, IParentData, IParentSizes, IPointMoveFullData, IRelativePoint} from "../SugarAttrInterfaces";

class Body extends Observer implements IViewElement {
  element: HTMLElement;
  range: Range = new Range();
  points: Point[] = [new Point(), new Point()];

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement("div");
    CssClassUtil.initClass(this, isVertical);

    this.element.addEventListener('click', this.handleSliderBodyClick);
    this.element.append(
      this.points[0].buildHtml(isVertical),
      this.points[1].buildHtml(isVertical),
      this.range.buildHtml(isVertical)
    );

    this.points[0].subscribe(SliderEvent.pointMove, this.handleMinPointMove);
    this.points[1].subscribe(SliderEvent.pointMove, this.handleMaxPointMove);
    return this.element;
  }

  private handleMinPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data);
  }
  private handleMaxPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data, false);
  }

  private handlePointMove = (data: IAbsolutePoint, isMin = true) => {
    const {left, top, height, width} = this.element.getBoundingClientRect();
    this.notify(
      SliderEvent.pointMove, {
        parent: {
          width,
          height,
          point: {
            x: left,
            y: top
          }
        } as IParentData,
        point: data,
        isMin
      } as IPointMoveFullData
    );
  }

  toggleRange() {
    this.points[1].toggle();
    this.range.toggle();
  }

  toggleTooltip() {
    this.points[0].toggleTooltip();
    this.points[1].toggleTooltip();
  }

  updatePosition(isVertical: boolean, percent: { min?: number; max?: number }, tooltips?: { min?: string, max?: string }) {
    if (percent.min !== undefined) this.points[0].updatePosition(isVertical, percent.min, tooltips.min);
    if (percent.max !== undefined) this.points[1].updatePosition(isVertical, percent.max, tooltips.max);
    this.range.updatePosition(isVertical, percent);
  }

  private handleSliderBodyClick = (event: MouseEvent) => {
    if (event.target === this.element) {
      this.notify(
        SliderEvent.sliderClick,
        {x: event.offsetX, y: event.offsetY} as IRelativePoint
      );
    } else {
      const {left, top} = this.element.getBoundingClientRect();
      this.notify(
        SliderEvent.sliderClick,
        {x: event.clientX - left, y: event.clientY - top} as IRelativePoint
      );
    }
  }

  getSize(): IParentSizes {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
  }
}

export default Body;
