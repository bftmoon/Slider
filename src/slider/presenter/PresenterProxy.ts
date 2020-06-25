import { ValidModel } from 'model/index';
import { Position, SliderEvent } from 'support/enums';
import SliderOptions, { MinMax } from 'support/types';

import Presenter from './Presenter';

class PresenterProxy extends Presenter {
  protected model: ValidModel;

  getOptions(): SliderOptions {
    return this.model.getOptions();
  }

  addSlideListener(callback: (data: MinMax<number>) => void) {
    this.subscribe(SliderEvent.ValueChanged, callback);
  }

  setCurrentRange(valueMin: number, valueMax: number) {
    this.model.setValidCurrents(valueMin, valueMax);
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.notifyValueChanged();
  }

  setCurrentRangeMin(value: number) {
    this.model.setValidCurrent(value, Position.Min);
    this.view.updateCurrent(this.model.isVertical(), {
      min: this.model.getPoint(Position.Min),
    });
    this.notifyValueChanged();
  }

  setCurrentRangeMax(value: number) {
    this.model.setValidCurrent(value, Position.Max);
    this.view.updateCurrent(this.model.isVertical(), {
      max: this.model.getPoint(Position.Max),
    });
    this.notifyValueChanged();
  }

  setCurrent(value: number) {
    this.setCurrentRangeMax(value);
  }

  setStep(step: number) {
    this.model.setValidStep(step);
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.updateScaleLines();
    this.notifyValueChanged();
  }

  setBorderMin(value: number) {
    this.model.setValidBorders(value, this.model.getBorder(Position.Max));
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.updateScaleLines();
    this.notifyValueChanged();
  }

  setBorderMax(value: number) {
    this.model.setValidBorders(this.model.getBorder(Position.Min), value);
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.updateScaleLines();
    this.notifyValueChanged();
  }

  setBorders(borderMin: number, borderMax: number) {
    this.model.setValidBorders(borderMin, borderMax);
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.updateScaleLines();
    this.notifyValueChanged();
  }

  toggleRange() {
    this.model.toggleRange();
    this.view.toggleRange();
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.notifyValueChanged();
  }

  toggleScale() {
    this.model.toggleScale();
    this.view.toggleScale();
    this.updateScaleLines();
  }

  toggleTooltip() {
    this.model.toggleTooltip();
    this.view.toggleTooltip();
  }

  toggleOrientation() {
    this.model.toggleOrientation();
    this.view.toggleOrientation();
    this.view.updateCurrent(this.model.isVertical(), this.model.getPoints());
    this.updateScaleLines();
  }

  private updateScaleLines() {
    if (this.model.withScale()) {
      this.view.updateScaleLines(
        this.model.getStep(),
        this.model.getSize(),
        this.model.isVertical(),
      );
    }
  }
}

export default PresenterProxy;
