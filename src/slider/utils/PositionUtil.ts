import ConvertUtil from './ConvertUtil';
import {IAbsolutePoint, IRelativePointPercents} from "../common/NotifyInterfaces";

class PositionUtil {
  static calcEventPoint(element: HTMLElement, event: MouseEvent): IRelativePointPercents {
    if (element === event.target) {
      return {
        x: ConvertUtil.toPercent(
          event.offsetX,
          (event.target as HTMLElement).offsetWidth,
        ),
        y: ConvertUtil.toPercent(
          event.offsetY,
          (event.target as HTMLElement).offsetHeight,
        ),
      };
    }
    return PositionUtil.calcPointByParent(
      element as HTMLElement,
      { x: event.clientX, y: event.clientY },
    );
  }

  static calcPointByParent(parent: HTMLElement, { x, y }: IAbsolutePoint): IRelativePointPercents {
    const {
      left, top, width, height,
    } = parent.getBoundingClientRect();
    return {
      x: ConvertUtil.toPercent(x - left, width),
      y: ConvertUtil.toPercent(y - top, height),
    };
  }
}

export default PositionUtil;
