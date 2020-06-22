import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import View from "./View";

class MockView extends View {
  render(
    element: HTMLElement,
    options: ViewBoolOptions,
    points: MinMax<PointData>,
    step: number,
    size: number,
  ): void {
  }

  toggleOrientation(): void {
  }

  toggleRange(): void {
  }

  toggleScale(): void {
  }

  toggleTooltip(): void {
  }

  updatePosition(isVertical: boolean, points: MinMax<PointData>): void {
  }

  updateScaleLines(step: number, size: number, isVertical: boolean): void {
  }
}

export default MockView;
