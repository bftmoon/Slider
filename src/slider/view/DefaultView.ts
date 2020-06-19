import Scale from './scale/Scale';
import Body from './body/Body';
import Observer from '../observer/Observer';
import SliderEvent from '../observer/SliderEvent';
import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import {PointMoveData, RelativePointPercents} from '../types/PointPosition';
import CssClassUtil from '../utils/CssClassUtil';
import View from './View';
import MinMaxPosition from "../types/MinMaxPosition";
import {CalcMoveDiffPercentsFunc, PosWithDiff} from "../types/NotifyData";

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
    this.scale
      .subscribe(SliderEvent.SliderClick, this.handleScaleClick)
      .subscribe(SliderEvent.PointMoveByScale, this.handleScaleMouseMove).subscribe(SliderEvent.StopPointMoveByScale, this.handleStopMoveByScale)

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
    this.notify(SliderEvent.PointMove, data);
  }

  private handleScaleClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.SliderClick, data);
  }

  private handleBodyClick = (data: RelativePointPercents) => {
    this.notify(SliderEvent.SliderClick, data);
  }

  private handleScaleMouseMove = (calcScaleMoveData: CalcMoveDiffPercentsFunc) => {
    this.notify(
      SliderEvent.PointMoveByScale,
      (isVertical: boolean, isRange: boolean) => this.calcPositionWithDiff(isVertical, isRange, calcScaleMoveData)
    );
  }

  private calcPositionWithDiff(isVertical: boolean, isRange: boolean, calcScaleMoveData: CalcMoveDiffPercentsFunc): PosWithDiff {
    const {diff, clientCoord} = calcScaleMoveData(isVertical);
    if (!isRange) return {diff, position: MinMaxPosition.Max}
    return {diff, position: this.body.selectNeighbourPoint({isVertical, coordinate: clientCoord})};
  }

  private handleStopMoveByScale = () => {
    this.body.cleanCachedPoint();
  }
}

export default DefaultView;
