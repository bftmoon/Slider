import Presenter from './Presenter';
import SliderEvent from '../observer/SliderEvent';
import MinMaxPosition from '../types/MinMaxPosition';
import SliderOptions from "../types/SliderOptions";
import ValidModel from "../model/ValidModel";

class PresenterProxy extends Presenter {
  protected model: ValidModel;

  getOptions(): SliderOptions {
    return this.model.getOptions();
  }

  addSlideListener(callback: (data: { value: number, position: MinMaxPosition }) => void) {
    this.subscribe(SliderEvent.ValueChanged, callback);
  }

  setCurrentRange(valueMin: any, valueMax: any) {
    this.model.setValidCurrents(valueMin, valueMax);
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
  }

  setCurrentRangeMin(value: any) {
    this.model.setValidCurrent(value, MinMaxPosition.Min);
    this.view.updatePosition(
      this.model.isVertical,
      {min: this.model.getPoint(MinMaxPosition.Min)},
    );
  }

  setCurrentRangeMax(value: any) {
    this.model.setValidCurrent(value, MinMaxPosition.Max);
    this.view.updatePosition(
      this.model.isVertical,
      {max: this.model.getPoint(MinMaxPosition.Max)},
    );
  }

  setCurrent(value: any) {
    this.setCurrentRangeMax(value);
  }

  setStep(step: any) {
    this.model.setValidStep(step);
    if (this.model.withScale) {
      this.view.updateScaleLines(
        this.model.step,
        this.model.getRangeSize(),
        this.model.isVertical,
      );
    }
    this.updatePointByStep(MinMaxPosition.Max);
    if (this.model.isRange) {
      this.updatePointByStep(MinMaxPosition.Min);
    }
  }

  setBorderMin(value: any) {
    this.model.setValidBorder(value, MinMaxPosition.Min);
    this.normalizePoints(this.model.border.min, (current) => current < this.model.border.min);
    this.updateScaleLines();
  }

  setBorderMax(value: any) {
    this.model.setValidBorder(value, MinMaxPosition.Max);
    this.normalizePoints(this.model.border.max, (current) => current > this.model.border.max);
    this.updateScaleLines();
  }

  setBorders(borderMin: any, borderMax: any) {
    this.model.setValidBorders(borderMin, borderMax);
    this.normalizePoints(this.model.border.min, (current) => current < this.model.border.min);
    this.normalizePoints(this.model.border.max, (current) => current > this.model.border.max);
  }

  toggleRange() {
    this.model.toggleRange();
    this.view.toggleRange();
    if (this.model.isOrderNormalizeRequired()) {
      this.model.normalizeCurrentOrder();
      this.view.updatePosition(
        this.model.isVertical,
        {max: this.model.getPoint(MinMaxPosition.Max)},
      );
      this.notify(SliderEvent.ValueChanged, {
        value: this.model.getCurrent().max,
        position: MinMaxPosition.Max,
      });
    }
    this.view.updatePosition(
      this.model.isVertical,
      {min: this.model.getPoint(MinMaxPosition.Min)},
    );
  }

  toggleScale() {
    this.model.toggleScale();
    this.view.toggleScale();
    if (this.model.withScale) {
      this.updateScaleLines();
    }
  }

  toggleTooltip() {
    this.model.toggleTooltip();
    this.view.toggleTooltip();
  }

  toggleOrientation() {
    this.model.toggleOrientation();
    this.view.toggleOrientation();
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
    if (this.model.withScale) {
      this.view.updateScaleLines(
        this.model.step,
        this.model.getRangeSize(),
        this.model.isVertical,
      );
    }
  }

  private updatePointByStep(position: MinMaxPosition) {
    const current = this.model.getCurrent()[position];
    const normalizedCurrent = this.model.normalizeByStep(current);
    if (normalizedCurrent !== current) {
      this.updatePosition(normalizedCurrent, position);
    }
  }

  private normalizePoints(border: number, checkIsOverflow: (current: number) => boolean) {
    const realCurrent = this.model.getRealCurrent();
    if (checkIsOverflow(realCurrent.min)) {
      this.model.setCurrent({min: border});
      this.notify(SliderEvent.ValueChanged, {value: border, position: MinMaxPosition.Min});
    }
    if (checkIsOverflow(realCurrent.max)) {
      this.model.setCurrent({max: border});
      this.notify(SliderEvent.ValueChanged, {value: border, position: MinMaxPosition.Max});
    }
    this.view.updatePosition(this.model.isVertical, this.model.getCurrentPoints());
  }

  private updateScaleLines() {
    if (this.model.withScale) {
      this.view.updateScaleLines(
        this.model.step,
        this.model.getRangeSize(),
        this.model.isVertical,
      );
    }
  }
}

export default PresenterProxy;
