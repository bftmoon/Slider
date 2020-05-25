import Presenter from "./Presenter";
import IModel from "../model/IModel";
import SliderEvent from "../observer/SliderEvent";
import MinMaxPosition from "../model/MinMaxPosition";
import MinMax from "../common-interfaces/MinMax";

class PresenterProxy extends Presenter {

  getOptions(): IModel {
    return this.model.getOptions();
  }

  addSlideListener(callback: (data: { value: number, position: MinMaxPosition }) => void) {
    this.subscribe(SliderEvent.valueChanged, callback);
  }

  toggleRange() {
    this.model.toggleRange();
    this.view.toggleRange();
    if (this.model.isOrderNormalizeRequired()) {
      this.model.normalizeCurrentOrder();
      this.view.updatePosition(this.model.isVertical, {max: this.model.getPoint(MinMaxPosition.max)});
      this.notify(SliderEvent.valueChanged, {value: this.model.getCurrent().max, position: MinMaxPosition.max})
    }
    this.view.updatePosition(this.model.isVertical, {min: this.model.getPoint(MinMaxPosition.min)});
    this.notify(SliderEvent.valueChanged, {value: this.model.getCurrent().min, position: MinMaxPosition.min})

  }

  setCurrentRange(value: MinMax<number>) {
    this.model.setCurrent(value);
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
  }

  toggleScale() {
    this.view.toggleScale();
  }

  toggleTooltip() {
    this.model.toggleTooltip();
    this.view.toggleTooltip();
  }

  toggleOrientation() {
    this.model.toggleOrientation();
    this.view.toggleOrientation();
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
  }

  setStep(step: number) {
    this.model.step = step;
    this.view.updateScaleLines(this.calcScaleLinesCount(), this.model.isVertical);
    this.updatePointByStep(MinMaxPosition.max);
    if (this.model.isRange) {
      this.updatePointByStep(MinMaxPosition.min);
    }
  }

  updatePointByStep(position: MinMaxPosition) {
    const current = this.model.getCurrent()[position];
    const normalizedCurrent = this.model.normalizeByStep(current);
    if (this.model.isNormalizeByStepRequired(normalizedCurrent, position)) {
      this.updatePosition(normalizedCurrent, position);
    }
  }

  setBorders(border: MinMax<number>) {
    if (border.min !== undefined) {
      this.model.border.min = border.min;
      this.normalizePoints(border.min, current => current < border.min);
    }
    if (border.max !== undefined) {
      this.model.border.max = border.max;
      this.normalizePoints(border.max, current => current > border.max)
    }
  }

  private normalizePoints(border: number, checkIsOverflow: (current: number) => boolean) {
    const realCurrent = this.model.getRealCurrent();
    if (checkIsOverflow(realCurrent.min)) {
      this.model.setCurrent({min: border});
      this.notify(SliderEvent.valueChanged, {value: border, position: MinMaxPosition.min});
    }
    if (checkIsOverflow(realCurrent.max)) {
      this.model.setCurrent({max: border});
      this.notify(SliderEvent.valueChanged, {value: border, position: MinMaxPosition.max});
    }
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
  }

  // setValue(value: number) {
  //     Validator.isInRange(this.model.min, this.model.max, value);
  //     this.model.current.min = value;
  //     // this.notify(SliderEvent.valueChanged, {value});
  // }
  //
  // setRangeValues(values = {min: this.model.current.min, max: this.model.current.max}) {
  //     Validator.isRangeActive(this.model.isRange)
  //     Validator.isPositiveRange(values.min, values.max);
  //     Validator.isInRange(this.model.min, this.model.max, values.max);
  //     Validator.isInRange(this.model.min, this.model.max, values.min);
  //     this.model.current = {min: values.min, values.max};
  //     // this.view.updatePosition()
  //     // this.notify(SliderEvent.rangeValuesChanged, values);
  // }
  //
  // setRangeAmbits(ambit = {min: this.model.min, max: this.model.max}) {
  //     Validator.isPositiveRange(ambit.min, ambit.max);
  //     this.model.max = ambit.max;
  //     this.model.min = ambit.min;
  // }

}

export default PresenterProxy;
