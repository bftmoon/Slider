import {IRelativePoint} from "../../common-interfaces/NotifyInterfaces";

class PositionUtil {
  static calculatePoint(element: HTMLElement, event: MouseEvent): IRelativePoint {
    if (element === event.target) return {x: event.offsetX, y: event.offsetY};
    const {left, top} = element.getBoundingClientRect();
    return {x: event.clientX - left, y: event.clientY - top};
  }
}

export default PositionUtil;
