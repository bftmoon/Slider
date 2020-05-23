import Scale from "./scale/Scale";
import Body from "./body/Body";
import CssClassUtil from "./CssClassUtil";
import Observer from "../observer/Observer";
import SliderEvent from "../observer/SliderEvent";
import IViewOptions from "../common-interfaces/IViewOptions";
import MinMax from "../common-interfaces/MinMax";
import IPoint from "../common-interfaces/IPoint";
import {IPointMoveFullData, IRelativePoint, ISliderClickFullData} from "../common-interfaces/NotifyInterfaces";

class View extends Observer {
  element: HTMLDivElement;
  body: Body = new Body();
  scale: Scale = new Scale();

  render(element: HTMLDivElement,
         {
           isVertical,
           isRange,
           withTooltip,
           withScale,
         }: IViewOptions,
         points: MinMax<IPoint>
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
    // todo: lines count in presenter
    withScale ? this.scale.updateLines(10, isVertical) : this.scale.toggle();

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

  private handlePointMove = (data: IPointMoveFullData) => {
    this.notify(SliderEvent.pointMove, data);
  }

  private notifyWithSize(data: IRelativePoint) {
    this.notify(SliderEvent.sliderClick, {point: data, sizes: this.body.getSize()} as ISliderClickFullData);
  }
}

export default View;
