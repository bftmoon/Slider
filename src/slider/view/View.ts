import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import Observable from '../observer/Observable';

interface View extends Observable {
  render(
    element: HTMLElement,
    options: ViewBoolOptions,
    points: MinMax<PointData>,
    step: number,
    size: number
  ): void;
  toggleRange(): void;
  toggleTooltip(): void;
  toggleScale(): void;
  toggleOrientation(): void;
  updateScaleLines(step: number, size: number, isVertical: boolean): void;
  updatePosition(isVertical: boolean, points: MinMax<PointData>): void;
}

export default View;
