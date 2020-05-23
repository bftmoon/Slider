import Model from "../model/Model";
import View from "../view/View";
import SliderEvent from "../observer/SliderEvent";
import MinMaxPosition from "../model/MinMaxPosition";
import {IMinMaxPointChangeData, IPointChangeData} from "../common-interfaces/NotifyInterfaces";

class Presenter {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
  }

  init(parent: HTMLDivElement) {
    if (parent === undefined)
      throw new Error('Parent element undefined');
    this.view.render(
      parent,
      this.model.getBoolOptions(),
      this.model.getCurrentPoints(),
      this.calcScaleLinesCount()
    );
    this.view
      .subscribe(SliderEvent.sliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
  }

  private handleSliderClick = (data: IPointChangeData) => {
    const modelValue = this.calcModelValueWithOrientation(data);
    if (this.model.isSameCurrent(modelValue)) return;
    this.updatePosition(modelValue, this.model.selectPosition(modelValue))
  }

  updatePosition(modelValue: number, position: MinMaxPosition) {
    if (!this.model.willCurrentCollapse(position, modelValue)) {
      this.model.setCurrent({[position]: modelValue});
      this.view.updatePosition(this.model.isVertical, {[position]: this.model.getPoint(position)});
    }
  }

  toggleRange() {
    this.model.toggleRange();
    // this.view.toggleRange();
    if (this.model.isNormalizeRequired()) {
      this.model.normalizeCurrent();
      this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
    }
  }

  calcModelValue(viewValue: number, sliderSize: number): number {
    if (viewValue <= 0) return this.model.border.min;
    if (viewValue >= sliderSize) return this.model.border.max;

    const modelSize = this.model.getBorderSize();
    let modelPosition = modelSize * viewValue / sliderSize;
    const diff = modelPosition % this.model.step;

    if (diff !== 0) {
      if (this.model.step / 2 > diff) {
        modelPosition -= diff;
      } else {
        modelPosition += this.model.step - diff;
      }
    }

    return modelPosition + this.model.border.min;
  }

  calcModelValueWithOrientation(data: IPointChangeData) {
    return this.model.isVertical ?
      this.calcModelValue(data.sizes.height - data.point.y, data.sizes.height)
      : this.calcModelValue(data.point.x, data.sizes.width);
  }

  calcScaleLinesCount(): number {
    const count = this.model.getBorderSize() / this.model.step;
    if (count < this.model.linesCount.min) return this.model.linesCount.min;
    if (count > this.model.linesCount.max) return this.model.linesCount.max;
    return count;
  }

  private handlePointMove = (data: IMinMaxPointChangeData) => {
    this.updatePosition(
      this.calcModelValueWithOrientation(data),
      data.position
    );
  }
}

export default Presenter;
