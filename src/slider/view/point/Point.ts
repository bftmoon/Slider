import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Tooltip from "../tooltip/Tooltip";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import {IAbsolutePoint} from "../SugarAttrInterfaces";

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
  }
  private handleMouseUp = () => {
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mousemove', this.handleMouseMove);
  }
  private handleMouseMove = (event: MouseEvent) => {
    this.notify(SliderEvent.pointMove, {x: event.clientX, y: event.clientY} as IAbsolutePoint);
  }

  updatePosition(isVertical: boolean, percent: number, tooltip?: string) {
    if (isVertical) {
      this.element.style.bottom = 100 - percent - 100 / this.element.parentElement.offsetHeight * Point.radius + '%';
    } else {
      this.element.style.left = percent - 100 / this.element.parentElement.offsetWidth * Point.radius + '%';
    }
    if (tooltip) this.tooltip.updateText(tooltip)
  }

  toggle() {
    CssClassUtil.toggleHidden(this);
  }

  toggleTooltip() {
    this.tooltip.toggle();
  }
}

export default Point;
