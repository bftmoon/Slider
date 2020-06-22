import ViewElement from '../ViewElement';
import Tooltip from '../tooltip/Tooltip';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import PointData from '../../types/PointData';
import CssClassUtil from '../../utils/CssClassUtil';
import ClassNames from '../../utils/ClassNames';
import RelativePoint from '../../types/RelativePoint';

class Point extends Observer implements ViewElement {
  private element: HTMLDivElement;

  private moveDiff: RelativePoint = { x: 0, y: 0 };

  private tooltip = new Tooltip();

  getElement(): HTMLElement {
    return this.element;
  }

  buildHtml(isVertical: boolean) {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.Point);
    this.element.addEventListener('mousedown', this.handlePointMouseDown);
    this.element.append(this.tooltip.buildHtml(isVertical));
    return this.element;
  }

  startGrabbing() {
    CssClassUtil.addGrabbing();
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  updatePosition(isVertical: boolean, point: PointData) {
    const radius = this.element.offsetWidth / 2;
    this.element.style[isVertical ? 'bottom' : 'left'] = `calc(${point.percent}% - ${radius}px)`;
    if (point.tooltip !== undefined) this.tooltip.update(point.tooltip, isVertical);
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this.element, ClassNames.Point);
  }

  toggleTooltip() {
    this.tooltip.toggleHidden();
  }

  toggleOrientation() {
    this.element.removeAttribute('style');
    CssClassUtil.toggleOrientation(this.element, ClassNames.Point);
    this.tooltip.toggleOrientation();
  }

  private handlePointMouseDown = (event: MouseEvent) => {
    this.updateMoveDiff(event.clientX, event.clientY);
    this.startGrabbing();
  }

  private updateMoveDiff(clientX: number, clientY: number) {
    const {
      x, y, width, height,
    } = this.element.getBoundingClientRect();
    this.moveDiff = { x: x + width / 2 - clientX, y: y + height / 2 - clientY };
  }

  private handleMouseUp = () => {
    CssClassUtil.removeGrabbing();
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.moveDiff = { x: 0, y: 0 };
    this.notify(SliderEvent.StopPointMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.notify(
      SliderEvent.PointMove,
      (isVertical: boolean) => this.calcAbsolute(isVertical, event),
    );
  }

  private calcAbsolute(isVertical: boolean, event: MouseEvent): number {
    return isVertical ? event.clientY + this.moveDiff.y : event.clientX + this.moveDiff.x;
  }
}

export default Point;
