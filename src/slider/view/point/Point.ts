import IViewElement from "../IViewElement";
import CssClassUtil from "../utils/CssClassUtil";
import Tooltip from "../tooltip/Tooltip";
import Observer from "../../observer/Observer";
import SliderEvent from "../../observer/SliderEvent";
import IPoint from "../../common-interfaces/IPoint";
import {IAbsolutePoint, IParentSizes} from "../../common-interfaces/NotifyInterfaces";

class Point extends Observer implements IViewElement {
  private element: HTMLDivElement;
  private tooltip = new Tooltip();

  getElement(): HTMLElement {
    return this.element;
  }

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

  updatePosition(isVertical: boolean, point: IPoint, parent: IParentSizes) {
    if (isVertical) {
      this.element.style.bottom = point.percent - this.calculatePercentRadius(parent.height) + '%';
    } else {
      this.element.style.left = point.percent - this.calculatePercentRadius(parent.width) + '%';
    }
    if (point.tooltip !== undefined) this.tooltip.update(point.tooltip, isVertical)
  }

  toggleHidden() {
    CssClassUtil.toggleHidden(this);
  }

  toggleTooltip() {
    this.tooltip.toggleHidden();
  }

  private calculatePercentRadius(parentSize: number) {
    return 100 / parentSize * this.element.offsetWidth / 2;
  }

  toggleOrientation() {
    this.element.removeAttribute('style');
    CssClassUtil.toggleOrientation(this);
    this.tooltip.toggleOrientation();
  }
}

export default Point;
