import Scale from './scale/Scale';
import Body from './body/Body';
import Observer from '../observer/Observer';
import SliderEvent from '../observer/SliderEvent';
import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import CssClassUtil from '../utils/CssClassUtil';
import View from './View';
import {CalcPoint, CalcRatio,} from '../types/NotifyData';

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
         }: ViewBoolOptions,
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
      .subscribe(SliderEvent.SliderClick, this.handleBodyClick)
      .subscribe(SliderEvent.PointMove, this.handlePointMove);
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
  }

  private handleScaleClick = (calcRatio: CalcRatio) => {
    this.body.startPointMove();
    this.notify(SliderEvent.SliderClick, calcRatio);
  }

  private handleBodyClick = (calcRatio: CalcRatio) => {
    this.notify(SliderEvent.SliderClick, calcRatio);
  }
}

export default DefaultView;
