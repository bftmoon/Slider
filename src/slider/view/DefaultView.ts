import Scale from './scale/Scale';
import Body from './body/Body';
import Observer from '../observer/Observer';
import SliderEvent from '../observer/SliderEvent';
import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import {PointMoveByScaleData, PointMoveData, RelativePointPercents} from '../types/PointPosition';
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
    this.scale.subscribe(SliderEvent.SliderClick, this.handleScaleClick).subscribe(SliderEvent.PointMoveByScale, this.handleMouseMoveOnScale)

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

  movePointByScale(data: {isRange: boolean, isVertical: boolean, viewData: PointMoveByScaleData}){
// if ()
    // todo
  }

  private handlePointMove = (data: PointMoveData) => {
    this.notify(SliderEvent.PointMove, data);
  }

  private handleScaleClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.SliderClick, data);
  }

  private handleBodyClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.SliderClick, data);
  }

  private handleMouseMoveOnScale = (data: PointMoveByScaleData) => {
    this.notify(SliderEvent.PointMoveByScale, data);
  }
}

export default DefaultView;
