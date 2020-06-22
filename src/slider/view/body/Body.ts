import Point from '../point/Point';
import Range from '../range/Range';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import MinMax from '../../types/MinMax';
import PointData from '../../types/PointData';
import CssClassUtil from '../../utils/CssClassUtil';
import MinMaxPosition from '../../types/MinMaxPosition';
import PositionUtil from '../../utils/PositionUtil';
import ClassNames from '../../utils/ClassNames';
import {CalcAbsolute, ViewPointData} from '../../types/NotifyData';

class Body extends Observer {
  private element: HTMLElement;

  private range: Range = new Range();

  private points: MinMax<Point> = { min: new Point(), max: new Point() };

  private isMoveStarted = false;

  buildHtml(isVertical: boolean) {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.Body);

    this.element.addEventListener('mousedown', this.handleSliderBodyMouseDown);
    this.element.append(
      this.points.min.buildHtml(isVertical),
      this.points.max.buildHtml(isVertical),
      this.range.buildHtml(isVertical),
    );

    this.points.min
      .subscribe(SliderEvent.PointMove, this.handleMinPointMove)
      .subscribe(SliderEvent.StopPointMove, this.handleStopPointMove);
    this.points.max
      .subscribe(SliderEvent.PointMove, this.handleMaxPointMove)
      .subscribe(SliderEvent.StopPointMove, this.handleStopPointMove);
    return this.element;
  }

  getElement() {
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
    CssClassUtil.toggleOrientation(this.element, ClassNames.Body);
    this.points.min.toggleOrientation();
    this.points.max.toggleOrientation();
    this.range.toggleOrientation();
  }

  updatePosition(isVertical: boolean, { min, max }: MinMax<PointData>) {
    const percents: MinMax<number> = {};
    if (min !== undefined) {
      this.points.min.updatePosition(isVertical, min);
      percents.min = min.percent;
      if (this.isMoveStarted) this.points.min.startGrabbing();
    }
    if (max !== undefined) {
      this.points.max.updatePosition(isVertical, max);
      percents.max = max.percent;
      if (this.isMoveStarted) this.points.max.startGrabbing();
    }

    this.range.updatePosition(
      isVertical,
      percents,
      isVertical ? this.element.offsetHeight : undefined,
    );
  }

  startPointMove() {
    this.isMoveStarted = true;
  }

  private handleStopPointMove = () => {
    this.isMoveStarted = false;
  }

  private handleMinPointMove = (calcAbsolute: CalcAbsolute) => {
    this.handlePointMove(calcAbsolute);
  }

  private handleMaxPointMove = (calcAbsolute: CalcAbsolute) => {
    this.handlePointMove(calcAbsolute, MinMaxPosition.Max);
  }

  private handleSliderBodyMouseDown = (event: MouseEvent) => {
    if (this.isRangeOrBodyElement(event)) {
      this.startPointMove();
      this.notify(
        SliderEvent.SliderClick,
        (isVertical: boolean) => PositionUtil.calc(isVertical, this.element, event),
      );
    }
  }

  private isRangeOrBodyElement(event: Event) {
    return event.target === this.element || event.target === this.range.getElement();
  }

  private handlePointMove = (calcAbsolute: CalcAbsolute, position = MinMaxPosition.Min) => {
    this.notify(
      SliderEvent.PointMove, (isVertical: boolean): ViewPointData => ({
        position,
        ratio: this.calcValue(isVertical, calcAbsolute(isVertical)),
      }),
    );
  }

  private calcValue(isVertical: boolean, coordinate: number) {
    const {
      top, height, left, width,
    } = this.element.getBoundingClientRect();
    return isVertical ? 1 - (coordinate - top) / height : (coordinate - left) / width;
  }
}

export default Body;
