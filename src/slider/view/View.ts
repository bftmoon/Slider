import Scale from './scale/Scale';
import Body from './body/Body';
import Observer from '../observer/Observer';
import SliderEvent from '../observer/SliderEvent';
import IViewOptions from '../common/IViewOptions';
import IMinMax from '../common/IMinMax';
import IPoint from '../common/IPoint';
import {IPointMoveData, IRelativePointPercents} from '../common/NotifyInterfaces';
import CssClassUtil from "../utils/CssClassUtil";

class View extends Observer {
  element: HTMLElement;

  body: Body = new Body();

  scale: Scale = new Scale();

  render(element: HTMLElement,
         {
           isVertical,
           isRange,
           withTooltip,
           withScale,
         }: IViewOptions,
         points: IMinMax<IPoint>,
         step: number,
         size: number) {
    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initHtmlClass(this.element, isVertical);

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

  updatePosition(isVertical: boolean, points: IMinMax<IPoint>) {
    this.body.updatePosition(isVertical, points);
  }

  private handleScaleClick = (data: IRelativePointPercents) => {
    this.notify(SliderEvent.sliderClick, data);
  }

  private handleBodyClick = (data: IRelativePointPercents) => {
    this.notify(SliderEvent.sliderClick, data);
  }

  private handlePointMove = (data: IPointMoveData) => {
    this.notify(SliderEvent.pointMove, data);
  }

  toggleRange() {
    this.body.toggleRange();
  }

  toggleTooltip() {
    this.body.toggleTooltip();
  }

  toggleOrientation() {
    CssClassUtil.toggleHtmlOrientation(this.element);
    this.body.toggleOrientation();
    this.scale.toggleOrientation();
  }

  updateScaleLines(step: number, size: number, isVertical: boolean) {
    this.scale.updateLines(step, size, isVertical);
  }

  toggleScale() {
    this.scale.toggleHidden();
  }
}

export default View;
