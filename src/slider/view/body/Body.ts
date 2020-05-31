import IViewElement from '../IViewElement';
import Point from '../point/Point';
import Range from '../range/Range';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import IMinMax from '../../common/IMinMax';
import IPoint from '../../common/IPoint';
import {IAbsolutePoint, IPointMoveData} from '../../common/NotifyInterfaces';
import CssClassUtil from "../../utils/CssClassUtil";
import MinMaxPosition from "../../common/MinMaxPosition";
import PositionUtil from "../../utils/PositionUtil";
import ClassNames from "../../utils/ClassNames";

class Body extends Observer implements IViewElement {
  private element: HTMLElement;

  private range: Range = new Range();

  private points: IMinMax<Point> = { min: new Point(), max: new Point() };

  getElement(): HTMLElement {
    return this.element;
  }

  buildHtml(isVertical: boolean): HTMLElement {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.body);

    this.element.addEventListener('click', this.handleSliderBodyClick);
    this.element.append(
      this.points.min.buildHtml(isVertical),
      this.points.max.buildHtml(isVertical),
      this.range.buildHtml(isVertical),
    );

    this.points.min.subscribe(SliderEvent.pointMove, this.handleMinPointMove);
    this.points.max.subscribe(SliderEvent.pointMove, this.handleMaxPointMove);
    return this.element;
  }

  toggleRange() {
    this.points.min.toggleHidden();
  }

  toggleTooltip() {
    this.points.min.toggleTooltip();
    this.points.max.toggleTooltip();
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this.element, ClassNames.body);
    this.points.min.toggleOrientation();
    this.points.max.toggleOrientation();
    this.range.toggleOrientation();
  }

  updatePosition(isVertical: boolean, { min, max }: IMinMax<IPoint>) {
    const percents: IMinMax<number> = {};
    if (min !== undefined) {
      this.points.min.updatePosition(isVertical, min);
      percents.min = min.percent;
    }
    if (max !== undefined) {
      this.points.max.updatePosition(isVertical, max);
      percents.max = max.percent;
    }

    this.range.updatePosition(
      isVertical,
      percents,
      isVertical ? this.element.offsetHeight : undefined,
    );
  }

  private handleMinPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data);
  }

  private handleMaxPointMove = (data: IAbsolutePoint) => {
    this.handlePointMove(data, MinMaxPosition.max);
  }

  private handleSliderBodyClick = (event: MouseEvent) => {
    this.notify(SliderEvent.sliderClick, PositionUtil.calcEventPoint(this.element, event));
  }

  private handlePointMove = (data: IAbsolutePoint, position = MinMaxPosition.min) => {
    this.notify(
      SliderEvent.pointMove, {
        ...PositionUtil.calcPointByParent(this.element, data),
        position,
      } as IPointMoveData,
    );
  }
}

export default Body;
