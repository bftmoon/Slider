/* eslint-disable class-methods-use-this */
import MinMax from 'types/MinMax';
import PointData from 'types/PointData';
import ViewOptions from 'types/ViewOptions';

import View from './View';

class MockView extends View {
  render(options:ViewOptions) {}

  toggleOrientation(): void {}

  toggleRange() {}

  toggleScale() {}

  toggleTooltip() {}

  updatePosition(isVertical: boolean, points: MinMax<PointData>) {}

  updateScaleLines(step: number, size: number, isVertical: boolean) {}
}

export default MockView;
