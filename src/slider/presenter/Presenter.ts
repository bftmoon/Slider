import Model from "../model/Model";
import View from "../view/View";
import SliderEvent from "../observer/SliderEvent";
import MinMaxPosition from "../model/MinMaxPosition";
import {IPointMoveFullData, ISliderClickFullData} from "../common-interfaces/NotifyInterfaces";

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
    this.view.render(parent, this.model.getBoolOptions(), this.model.getCurrentPoints());
    this.view
      .subscribe(SliderEvent.sliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
  }

  private handleSliderClick = (data: ISliderClickFullData) => {
    const modelValue = this.model.isVertical ?
      this.calcValue(data.sizes.height - data.point.y, data.sizes.height)
      : this.calcValue(data.point.x, data.sizes.width);

    if (this.model.isSameCurrent(modelValue)) {
      return;
    }

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

  calcValue(viewValue: number, sliderSize: number): number {
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

  private handlePointMove = (data: IPointMoveFullData) => {
    this.updatePosition(
      this.model.isVertical ?
        this.calcValue(data.parent.height - data.point.y + data.parent.point.y, data.parent.height)
        : this.calcValue(data.point.x - data.parent.point.x, data.parent.width),
      data.position
    );
  }
}

export default Presenter;
