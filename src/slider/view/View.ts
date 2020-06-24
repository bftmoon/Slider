import Observer from 'observer/Observer';
import SliderEvent from 'observer/SliderEvent';
import MinMax from 'types/MinMax';
import { CalcPoint, CalcRatio } from 'types/NotifyData';
import PointData from 'types/PointData';
import ViewOptions from 'types/ViewOptions';
import CssClassUtil from 'utils/CssClassUtil';

import Body from './body/Body';
import Scale from './scale/Scale';

class View extends Observer {
  private element: HTMLElement;
  private body: Body = new Body();
  private scale: Scale = new Scale();

  render({
    element, isVertical, isRange, withTooltip, withScale, points, step, size,
  }: ViewOptions) {
    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initClass(this.element, isVertical);

    fragment.append(
      this.body.buildHtml(isVertical),
      this.scale.buildHtml(isVertical),
    );

    this.body.subscribe(SliderEvent.SliderClick, this.handleBodyClick);
    this.body.subscribe(SliderEvent.PointMove, this.handlePointMove);
    this.scale.subscribe(SliderEvent.SliderClick, this.handleScaleClick);

    if (!withTooltip) this.body.toggleTooltip();
    element.append(fragment);

    this.updatePosition(isVertical, points);
    if (!isRange) this.body.toggleRange();
    if (withScale) this.scale.updateLines(step, size, isVertical);
    else this.scale.toggleHidden();
  }

  toggleRange() {
    this.body.toggleRange();
  }

  toggleTooltip() {
    this.body.toggleTooltip();
  }

  toggleScale() {
    this.scale.toggleHidden();
  }

  toggleOrientation() {
    CssClassUtil.toggleOrientation(this.element);
    this.body.toggleOrientation();
    this.scale.toggleOrientation();
  }

  updateScaleLines(step: number, size: number, isVertical: boolean) {
    this.scale.updateLines(step, size, isVertical);
  }

  updatePosition(isVertical: boolean, points: MinMax<PointData>) {
    this.body.updatePosition(isVertical, points);
  }

  private handlePointMove = (calcPoint: CalcPoint) => {
    this.notify(SliderEvent.PointMove, calcPoint);
  };

  private handleScaleClick = (calcRatio: CalcRatio) => {
    this.body.startPointMove();
    this.notify(SliderEvent.SliderClick, calcRatio);
  };

  private handleBodyClick = (calcRatio: CalcRatio) => {
    this.notify(SliderEvent.SliderClick, calcRatio);
  };
}

export default View;
