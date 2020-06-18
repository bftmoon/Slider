import View from './View';
import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import Observer from '../observer/Observer';

class MockView extends Observer implements View {
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
