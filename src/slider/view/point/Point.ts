import ViewElement from '../ViewElement';
import Tooltip from '../tooltip/Tooltip';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import PointData from '../../types/PointData';
import {AbsolutePoint, RelativePoint} from '../../types/PointPosition';
import CssClassUtil from '../../utils/CssClassUtil';
import ClassNames from '../../utils/ClassNames';

class Point extends Observer implements ViewElement {
  private element: HTMLDivElement;
  private moveDiff: RelativePoint = null;

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

  private handlePointMouseDown = (event: MouseEvent) => {
    CssClassUtil.addGrabbing();
    this.updateMoveDiff(event.clientX, event.clientY);
    CssClassUtil.toggleGrab(this.element, ClassNames.Point);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private updateMoveDiff(clientX: number, clientY: number) {
    const {x, y, width, height} = this.element.getBoundingClientRect();
    this.moveDiff = {x: x + width / 2 - clientX, y: y + height / 2 - clientY};
  }

  private handleMouseUp = () => {
    CssClassUtil.removeGrabbing();
    CssClassUtil.toggleGrab(this.element, ClassNames.Point);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.notify(SliderEvent.PointMove, {
      x: event.clientX + this.moveDiff.x,
      y: event.clientY + this.moveDiff.y
    } as AbsolutePoint);
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

  calcClientCenterCoordinate(isVertical: boolean) {
    if (isVertical) {
      const {top, height} = this.element.getBoundingClientRect();
      return top + height / 2;
    }
    const {left, width} = this.element.getBoundingClientRect();
    return left + width / 2;
  }
}

export default Point;
