import Scale from "./scale/Scale";
import Body from "./body/Body";
import Observer from "../observer/Observer";
import SliderEvent from "../observer/SliderEvent";
import IViewOptions from "../common-interfaces/IViewOptions";
import MinMax from "../common-interfaces/MinMax";
import IPoint from "../common-interfaces/IPoint";
import {IMinMaxPointChangeData, IPointChangeData, IRelativePoint} from "../common-interfaces/NotifyInterfaces";
import CssClassUtil from "./utils/CssClassUtil";

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
         points: MinMax<IPoint>,
         step: number,
         size: number
  ) {
    this.element = element;
    const fragment = document.createDocumentFragment();
    CssClassUtil.initHtmlClass(this.element, isVertical);

    fragment.append(
      this.body.buildHtml(isVertical),
      this.scale.buildHtml(isVertical)
    );

    this.body
      .subscribe(SliderEvent.sliderClick, this.handleBodyClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove)
    ;
    this.scale.subscribe(SliderEvent.sliderClick, this.handleScaleClick);

    if (!withTooltip) this.body.toggleTooltip();
    element.append(fragment);

    this.updatePosition(isVertical, points);
    if (!isRange) this.body.toggleRange();
    withScale ? this.scale.updateLines(step, size, isVertical) : this.scale.toggleHidden();
  }

  updatePosition(isVertical: boolean, points: MinMax<IPoint>) {
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
