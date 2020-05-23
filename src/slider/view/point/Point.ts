import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Tooltip from "../tooltip/Tooltip";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import IPoint from "../../common-interfaces/IPoint";
import {IAbsolutePoint} from "../../common-interfaces/NotifyInterfaces";

class Point extends Observer implements IViewElement {
  static readonly radius = 7; //todo: css search
  element: HTMLDivElement;
  tooltip = new Tooltip();

  buildHtml(isVertical: boolean) {
    this.element = document.createElement("div");
    CssClassUtil.initClass(this, isVertical);
    this.element.addEventListener('mousedown', this.handlePointMouseDown);
    this.element.append(this.tooltip.buildHtml(isVertical));
    return this.element;
  }

  private handlePointMouseDown = () => {
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mousemove', this.handleMouseMove);
    // todo: grabbing
  }

  private handleMouseUp = () => {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.notify(SliderEvent.pointMove, {x: event.clientX, y: event.clientY} as IAbsolutePoint);
  }

  updatePosition(isVertical: boolean, point: IPoint) {
    if (isVertical) {
      this.element.style.bottom = 100 - point.percent - 100 / this.element.parentElement.offsetHeight * Point.radius + '%';
    } else {
      this.element.style.left = point.percent - 100 / this.element.parentElement.offsetWidth * Point.radius + '%';
    }
    if (point.tooltip !== undefined) this.tooltip.updateText(point.tooltip)
  }

  toggle() {
    CssClassUtil.toggleHidden(this);
  }

  toggleTooltip() {
    this.tooltip.toggle();
  }
}

export default Point;
