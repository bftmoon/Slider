import Presenter from './Presenter';
import SliderEvent from 'observer/SliderEvent';
import MinMaxPosition from 'types/MinMaxPosition';
import SliderOptions from 'types/SliderOptions';
import ValidModel from 'model/ValidModel';
import MinMax from "types/MinMax";

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
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints());
    this.notifyValueChanged();
  }

  setCurrentRangeMin(value: number) {
    this.model.setValidCurrent(value, MinMaxPosition.Min);
    this.view.updatePosition(this.model.isVertical(), {
      min: this.model.getPoint(MinMaxPosition.Min),
    });
    this.notifyValueChanged();
  }

  setCurrentRangeMax(value: number) {
    this.model.setValidCurrent(value, MinMaxPosition.Max);
    this.view.updatePosition(this.model.isVertical(), {
      max: this.model.getPoint(MinMaxPosition.Max),
    });
    this.notifyValueChanged();
  }

  setCurrent(value: number) {
    this.setCurrentRangeMax(value);
  }

  setStep(step: number) {
    this.model.setValidStep(step);
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints())
    this.updateScaleLines();
    this.notifyValueChanged()
  }

  setBorderMin(value: number) {
    this.model.setValidBorders(value, this.model.getBorder(MinMaxPosition.Max));
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints())
    this.updateScaleLines();
    this.notifyValueChanged()
  }

  setBorderMax(value: number) {
    this.model.setValidBorders(this.model.getBorder(MinMaxPosition.Min), value);
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints())
    this.updateScaleLines();
    this.notifyValueChanged()
  }

  setBorders(borderMin: number, borderMax: number) {
    this.model.setValidBorders(borderMin, borderMax);
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints())
    this.updateScaleLines();
    this.notifyValueChanged()
  }

  toggleRange() {
    this.model.toggleRange();
    this.view.toggleRange();
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints());
    this.notifyValueChanged()
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
    this.view.updatePosition(this.model.isVertical(), this.model.getPoints());
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
