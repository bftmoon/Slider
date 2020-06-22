import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import View from './View';

class MockView extends View {
  render(
    element: HTMLElement,
    options: ViewBoolOptions,
    points: MinMax<PointData>,
    step: number,
    size: number
  ) {}

  toggleOrientation(): void {}

  toggleRange() {}

  toggleScale() {}

  toggleTooltip() {}

  updatePosition(isVertical: boolean, points: MinMax<PointData>) {}

  updateScaleLines(step: number, size: number, isVertical: boolean) {}
}

export default MockView;
