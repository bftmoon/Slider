import Scale from "./scale/Scale";
import IOptions from "../model/IOptions";
import Body from "./body/Body";
import CssClassUtil from "./CssClassUtil";
import Observer from "../observer/Observer";
import SliderEvent from "../observer/SliderEvent";
import {IPointMoveFullData, IRelativePoint, ISliderClickFullData} from "./SugarAttrInterfaces";

class View extends Observer {
  element: HTMLDivElement;
  body: Body = new Body();
  scale: Scale = new Scale();

  render(element: HTMLDivElement,
         {
           current,
           max,
           min,
           step,
           isVertical,
           isRange,
           withTooltip,
           withScale,
           linesCount
         }: IOptions) {

    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initHtmlClass(this.element, isVertical);

    fragment.append(
      this.body.buildHtml(isVertical),
      this.scale.buildHtml(isVertical)
    )

    this.body
      .subscribe(SliderEvent.sliderClick, this.handleBodyClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
    this.scale.subscribe(SliderEvent.sliderClick, this.handleScaleClick);

    if (!isRange) this.body.toggleRange();
    if (!withTooltip) this.body.toggleTooltip();
    // todo: lines count in presenter
    withScale ? this.scale.updateLines(10, isVertical) : this.scale.toggle();

    element.append(fragment);
    this.updatePosition(isVertical, {min: current.min, max: current.max}, {
      min: current.min.toString(),
      max: current.max.toString()
    });
  }

  // todo: real number and percents
  updatePosition(
    isVertical: boolean,
    percent: { min?: number, max?: number },
    tooltips?: { min?: string, max?: string }
  ) {
    this.body.updatePosition(isVertical, percent, tooltips);
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
