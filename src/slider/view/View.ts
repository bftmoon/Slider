import Scale from "./scale/Scale";
import Body from "./body/Body";
import CssClassUtil from "./CssClassUtil";
import Observer from "../observer/Observer";
import SliderEvent from "../observer/SliderEvent";
import IViewOptions from "../common-interfaces/IViewOptions";
import MinMax from "../common-interfaces/MinMax";
import IPoint from "../common-interfaces/IPoint";
import {IMinMaxPointChangeData, IRelativePoint, IPointChangeData} from "../common-interfaces/NotifyInterfaces";

class View extends Observer {
  element: HTMLDivElement;
  body: Body = new Body();
  scale: Scale = new Scale();
  pointRadius: number;

  render(element: HTMLDivElement,
         {
           isVertical,
           isRange,
           withTooltip,
           withScale,
         }: IViewOptions,
         points: MinMax<IPoint>,
         linesCount: number
  ) {
    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initHtmlClass(this.element, isVertical);

    if (isVertical) {
      fragment.append(
        this.scale.buildHtml(isVertical),
        this.body.buildHtml(isVertical),
      )
    } else {
      fragment.append(
        this.body.buildHtml(isVertical),
        this.scale.buildHtml(isVertical)
      )
    }

    this.body
      .subscribe(SliderEvent.sliderClick, this.handleBodyClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
    this.scale.subscribe(SliderEvent.sliderClick, this.handleScaleClick);

    if (!withTooltip) this.body.toggleTooltip();
    withScale ? this.scale.updateLines(linesCount, isVertical) : this.scale.toggle();

    element.append(fragment);
    this.updatePosition(isVertical, points);
    if (!isRange) this.body.toggleRange(isVertical);
  }

  updatePosition(isVertical: boolean, points: MinMax<IPoint>) {
    if (isVertical) {
      if (points.min !== undefined) points.min.percent = 100 - points.min.percent;
      if (points.max !== undefined) points.max.percent = 100 - points.max.percent;
    }
    this.body.updatePosition(isVertical, points);
  }

  private handleScaleClick = (data: IRelativePoint) => {
    this.notifyWithSize(data);
  }
  private handleBodyClick = (data: IRelativePoint) => {
    this.notifyWithSize(data);
  }

  private handlePointMove = (data: IMinMaxPointChangeData) => {
    this.notify(SliderEvent.pointMove, data);
  }

  private notifyWithSize(data: IRelativePoint) {
    this.notify(SliderEvent.sliderClick, {
      point: data,
      sizes: this.body.getSize()
    } as IPointChangeData);
  }

  // addPointRadius(data: IRelativePoint): IRelativePoint{
  //   return {
  //     x: data.x + this.pointRadius,
  //     y: data.u + this.pointRadius,
  //   }
  // }
}

export default View;
