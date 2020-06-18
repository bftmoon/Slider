/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import View from './View';
import ViewOptions from '../common/ViewOptions';
import MinMax from '../common/MinMax';
import PointData from '../common/PointData';
import Observer from '../observer/Observer';

class MockView extends Observer implements View {
  render(
    element: HTMLElement,
    options: ViewOptions,
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
