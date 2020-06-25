/* eslint-disable class-methods-use-this */

import { MinMax, PointData, ViewOptions } from '../support/types';

import View from './index';

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
