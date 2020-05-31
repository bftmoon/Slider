import IViewElement from '../IViewElement';
import Tooltip from '../tooltip/Tooltip';
import Observer from '../../observer/Observer';
import SliderEvent from '../../observer/SliderEvent';
import IPoint from '../../common/IPoint';
import {IAbsolutePoint} from '../../common/NotifyInterfaces';
import CssClassUtil from "../../utils/CssClassUtil";
import ClassNames from "../../utils/ClassNames";

class Point extends Observer implements IViewElement {
  private element: HTMLDivElement;

  private tooltip = new Tooltip();

  getElement(): HTMLElement {
    return this.element;
  }

  buildHtml(isVertical: boolean) {
    this.element = document.createElement('div');
    CssClassUtil.initClass(this.element, isVertical, ClassNames.point);
    this.element.addEventListener('mousedown', this.handlePointMouseDown);
    this.element.append(this.tooltip.buildHtml(isVertical));
    return this.element;
  }

  private handlePointMouseDown = () => {
    document.documentElement.classList.add('slider-plugin');
    CssClassUtil.toggleGrab(this.element, ClassNames.point);
    this.notify(SliderEvent.pointGrab, { isGrabbed: true });
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseUp = () => {
    document.documentElement.classList.remove('slider-plugin');
    CssClassUtil.toggleGrab(this.element, ClassNames.point);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.notify(SliderEvent.pointMove, { x: event.clientX, y: event.clientY } as IAbsolutePoint);
  }

  updatePosition(isVertical: boolean, point: IPoint) {
    const radius = this.element.offsetHeight / 2;
    this.element.style[isVertical ? 'bottom' : 'left'] = `calc(${point.percent}% - ${radius}px)`;
    if (point.tooltip !== undefined) this.tooltip.update(point.tooltip, isVertical);
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this.element, ClassNames.point);
  }

  toggleTooltip() {
    this.tooltip.toggleHidden();
  }

  toggleOrientation() {
    this.element.removeAttribute('style');
    CssClassUtil.toggleOrientation(this.element, ClassNames.point);
    this.tooltip.toggleOrientation();
  }
}

export default Point;
