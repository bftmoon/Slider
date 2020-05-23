import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Point from "../point/Point";
import Range from "../range/Range";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import MinMaxPosition from "../../model/MinMaxPosition";
import MinMax from "../../common-interfaces/MinMax";
import IPoint from "../../common-interfaces/IPoint";
import {IAbsolutePoint, IMinMaxPointChangeData, IParentSizes,} from "../../common-interfaces/NotifyInterfaces";
import PositionUtil from "../PositionUtil";

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
        sizes: {width, height},
        point: {x: data.x - left, y: data.y - top},
        position
      } as IMinMaxPointChangeData
    );
  }

  toggleRange(isVertical: boolean, minPoint?: IPoint) {
    const sizes = this.getSize();
    this.points.min.updatePosition(isVertical, minPoint || {percent: 0}, sizes);
    this.points.min.toggle();
    if (minPoint) {
      this.range.updatePosition(isVertical, {min: minPoint.percent}, sizes);
    } else {
      this.range.updatePosition(isVertical, {min: isVertical ? 100 : 0}, sizes);
    }
  }

  toggleTooltip() {
    this.points.min.toggleTooltip();
    this.points.max.toggleTooltip();
  }

  updatePosition(isVertical: boolean, points: MinMax<IPoint>) {
    const sizes = this.getSize();
    const percents: MinMax<number> = {};
    if (points.min !== undefined) {
      this.points.min.updatePosition(isVertical, points.min, sizes);
      percents.min = points.min.percent;
    }
    if (points.max !== undefined) {
      this.points.max.updatePosition(isVertical, points.max, sizes);
      percents.max = points.max.percent;
    }
    this.range.updatePosition(isVertical, percents, sizes);
  }

  private handleSliderBodyClick = (event: MouseEvent) => {
    this.notify(SliderEvent.sliderClick, PositionUtil.calculatePoint(this.element, event));
  }

  getSize(): IParentSizes {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
  }

}

export default Body;
