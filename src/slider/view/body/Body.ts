import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Point from "../point/Point";
import Range from "../range/Range";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import MinMaxPosition from "../../model/MinMaxPosition";
import MinMax from "../../common-interfaces/MinMax";
import IPoint from "../../common-interfaces/IPoint";
import {
  IAbsolutePoint,
  IParentData, IParentSizes,
  IPointMoveFullData,
  IRelativePoint
} from "../../common-interfaces/NotifyInterfaces";

class Body extends Observer implements IViewElement {
  element: HTMLElement;
  range: Range = new Range();
  points: MinMax<Point> = {min: new Point(), max: new Point()};

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement("div");
    CssClassUtil.initClass(this, isVertical);

    this.element.addEventListener('click', this.handleSliderBodyClick);
    this.element.append(
      this.points.min.buildHtml(isVertical),
      this.points.max.buildHtml(isVertical),
      this.range.buildHtml(isVertical)
    );

    this.points.min.subscribe(SliderEvent.pointMove, this.handleMinPointMove);
    this.points.max.subscribe(SliderEvent.pointMove, this.handleMaxPointMove);
    return this.element;
  }

  private handleMinPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data);
  }
  private handleMaxPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data, MinMaxPosition.max);
  }

  private handlePointMove = (data: IAbsolutePoint, position = MinMaxPosition.min) => {
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
        position
      } as IPointMoveFullData
    );
  }

  toggleRange(isVertical: boolean, minPoint?: IPoint) {
    this.points.min.updatePosition(isVertical, minPoint || {percent: 0});
    this.points.min.toggle();
    this.range.updatePosition(isVertical, {min: minPoint ? minPoint.percent : 0});
  }

  toggleTooltip() {
    this.points.min.toggleTooltip();
    this.points.max.toggleTooltip();
  }

  updatePosition(isVertical: boolean, points: MinMax<IPoint>) {
    const percents: MinMax<number> = {};
    if (points.min !== undefined) {
      this.points.min.updatePosition(isVertical, points.min);
      percents.min = points.min.percent;
    }
    if (points.max !== undefined) {
      this.points.max.updatePosition(isVertical, points.max);
      percents.max = points.max.percent;
    }
    this.range.updatePosition(isVertical, percents);
  }

  private handleSliderBodyClick = (event: MouseEvent) => {
    this.notify(
      SliderEvent.sliderClick,
      this.calculatePoint(event.target === this.element, event)
    );
  }

  private calculatePoint(canUseRelative: boolean, event: MouseEvent): IRelativePoint {
    if (canUseRelative) return {x: event.offsetX, y: event.offsetY};
    const {left, top} = this.element.getBoundingClientRect();
    return {x: event.clientX - left, y: event.clientY - top};
  }

  getSize(): IParentSizes {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
  }
}

export default Body;
