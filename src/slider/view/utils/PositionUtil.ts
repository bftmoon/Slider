import {IAbsolutePoint, IRelativePointPercents} from "../../common-interfaces/NotifyInterfaces";
import ConvertUtil from "./ConvertUtil";

class PositionUtil {
  static calcEventPoint(element: HTMLElement, event: MouseEvent): IRelativePointPercents {
    if (element === event.target) return {
      x: ConvertUtil.toPercent(event.offsetX, (event.target as HTMLElement).offsetWidth),
      y: ConvertUtil.toPercent(event.offsetY, (event.target as HTMLElement).offsetHeight)
    };
    return PositionUtil.calcPointByParent(element as HTMLElement, {x: event.clientX, y: event.clientY});
  }

  static calcPointByParent(parent: HTMLElement, point: IAbsolutePoint):IRelativePointPercents{
    const {left, top, width, height} = parent.getBoundingClientRect();
    return {
      x: ConvertUtil.toPercent(point.x - left, width),
      y: ConvertUtil.toPercent(point.y - top, height),
    };
  }
}

export default PositionUtil;
