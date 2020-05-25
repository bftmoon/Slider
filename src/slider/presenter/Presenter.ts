import Model from "../model/Model";
import View from "../view/View";
import SliderEvent from "../observer/SliderEvent";
import MinMaxPosition from "../model/MinMaxPosition";
import {IMinMaxPointChangeData, IPointChangeData} from "../common-interfaces/NotifyInterfaces";
import Observer from "../observer/Observer";

class Presenter extends Observer {
  protected model: Model;
  protected view: View;

  constructor(model: Model, view: View) {
    super();
    this.model = model;
    this.view = view;
  }

  init(parent: HTMLElement) {
    if (parent === undefined)
      throw new Error('Parent element undefined');
    this.view.render(
      parent,
      this.model.getBoolOptions(),
      this.model.getCurrentPoints(),
      this.model.step,
      this.model.getBorderSize()
    );
    this.view
      .subscribe(SliderEvent.sliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
    window.addEventListener('resize', this.handleWindowResize);
  }

  protected handleWindowResize = () => {
    this.updateScaleLines(this.model.step);
  }

  protected updateScaleLines(step: number) {
    this.view.updateScaleLines(step, this.model.getBorderSize(), this.model.isVertical);
  }

  private handleSliderClick = (data: IPointChangeData) => {
    const modelValue = this.calcModelValueWithOrientation(data);
    if (this.model.isSameCurrent(modelValue)) return;
    this.updatePosition(modelValue, this.model.selectPosition(modelValue));
  }

  protected updatePosition(modelValue: number, position: MinMaxPosition) {
    if (!this.model.willCurrentCollapse(position, modelValue)) {
      this.model.setCurrent({[position]: modelValue});
      this.view.updatePosition(this.model.isVertical, {[position]: this.model.getPoint(position)});
      this.notify(SliderEvent.valueChanged, {value: modelValue, position});
    }
  }

  // todo: common percentage
  // fix: on negative min anf positive max
  private calcModelValue(viewValue: number, sliderSize: number): number {
    if (viewValue <= 0) return this.model.border.min;
    if (viewValue >= sliderSize) return this.model.border.max;

    const modelSize = this.model.getBorderSize();
    let modelPosition = modelSize * viewValue / sliderSize + this.model.border.min;
    return this.model.normalizeByStep(modelPosition);
  }

  private calcModelValueWithOrientation(data: IPointChangeData) {
    return this.model.isVertical ?
      this.calcModelValue(data.sizes.height - data.point.y, data.sizes.height)
      : this.calcModelValue(data.point.x, data.sizes.width);
  }

  private handlePointMove = (data: IMinMaxPointChangeData) => {
    this.updatePosition(
      this.calcModelValueWithOrientation(data),
      data.position
    );
  }
}

export default Presenter;
