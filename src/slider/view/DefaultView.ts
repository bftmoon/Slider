import Scale from './scale/Scale';
import Body from './body/Body';
import Observer from '../observer/Observer';
import SliderEvent from '../observer/SliderEvent';
import ViewOptions from '../common/ViewOptions';
import MinMax from '../common/MinMax';
import PointData from '../common/PointData';
import { PointMoveData, RelativePointPercents } from '../common/NotifyInterfaces';
import CssClassUtil from '../utils/CssClassUtil';
import View from './View';

class DefaultView extends Observer implements View {
  element: HTMLElement;

  body: Body = new Body();

  scale: Scale = new Scale();

  render(element: HTMLElement,
    {
      isVertical,
      isRange,
      withTooltip,
      withScale,
    }: ViewOptions,
    points: MinMax<PointData>,
    step: number,
    size: number): void {
    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initClass(this.element, isVertical);

    fragment.append(
      this.body.buildHtml(isVertical),
      this.scale.buildHtml(isVertical),
    );

    this.body
      .subscribe(SliderEvent.sliderClick, this.handleBodyClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
    this.scale.subscribe(SliderEvent.sliderClick, this.handleScaleClick);

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

  private handlePointMove = (data: PointMoveData) => {
    this.notify(SliderEvent.pointMove, data);
  }

  private handleScaleClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.sliderClick, data);
  }

  private handleBodyClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.sliderClick, data);
  }
}

export default DefaultView;
