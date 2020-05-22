import Model from "../model/Model";
import View from "../view/View";
import SliderEvent from "../observer/SliderEvent";
import {IPointMoveFullData, ISliderClickFullData} from "../view/SugarAttrInterfaces";

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
    this.view.render(parent, {...this.model, percents: this.model.current});
    const percent = {
      min: this.calcPercent(this.model.max, this.model.min, this.model.current.min),
      max: this.calcPercent(this.model.max, this.model.min, this.model.current.max)
    };
    const tooltips = {
      min: this.model.current.min.toString(),
      max: this.model.current.max.toString()
    };
    this.view.updatePosition(this.model.isVertical, percent, tooltips);
    this.view
      .subscribe(SliderEvent.sliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.pointMove, this.handlePointMove);
  }

  calcPercent(max: number, min: number, current: number) {
    return 100 / (max - min) * current;
  }

// todo:percentage on update
  private handleSliderClick = (data: ISliderClickFullData) => {
    const modelValue = this.model.isVertical ?
      this.calcValue(data.sizes.height - data.point.y, data.sizes.height)
      : this.calcValue(data.point.x, data.sizes.width);

    if (this.isSameCurrent(modelValue)) {
      return;
    }

    if (modelValue <= this.model.current.min) {
      this.updatePosition(modelValue);
    } else if (modelValue >= this.model.current.max) {
      this.updatePosition(modelValue, false);
    } else {
      const middle = this.model.current.min + (this.model.current.max - this.model.current.min) / 2;
      this.updatePosition(modelValue, modelValue < middle);
    }
  }

  private isSameCurrent(modelValue: number) {
    return modelValue === this.model.current.min || modelValue === this.model.current.max;
  }

  updatePosition(modelValue: number, isMin = true) {
    if (isMin) {
      if (modelValue <= this.model.current.max) {
        this.model.current.min = modelValue;
        this.view.updatePosition(
          this.model.isVertical,
          {min: modelValue},
          {min: modelValue.toString()}
        );
      }
    } else {
      if (modelValue >= this.model.current.min) {
        this.model.current.max = modelValue;
        this.view.updatePosition(
          this.model.isVertical,
          {max: modelValue},
          {max: modelValue.toString()}
        );
      }
    }
  }

  // todo: swap on collapse (better) or non blocking with one point
  calcValue(viewValue: number, sliderSize: number): number {
    if (viewValue <= 0) return this.model.min;
    if (viewValue >= sliderSize) return this.model.max;

    const modelSize = this.model.max - this.model.min;
    let modelPosition = modelSize * viewValue / sliderSize;
    const diff = modelPosition % this.model.step;

    if (diff !== 0) {
      if (this.model.step / 2 > diff) {
        modelPosition -= diff;
      } else {
        modelPosition += this.model.step - diff;
      }
    }

    return modelPosition + this.model.min;
  }

  private handlePointMove = (data: IPointMoveFullData) => {
    if (this.model.isVertical) {
      this.updatePosition(
        this.calcValue(
          data.parent.height - data.point.y + data.parent.point.y,
          data.parent.height
        ),
        data.isMin
      );
    } else {
      this.updatePosition(
        this.calcValue(
          data.point.x - data.parent.point.x,
          data.parent.width
        ),
        data.isMin
      );
    }
  }
}

export default Presenter;
