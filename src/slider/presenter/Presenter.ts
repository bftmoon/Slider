import Model from 'model/Model';
import Observer from 'observer/index';
import {Position, SliderEvent} from 'support/enums';
import SliderError from 'support/errors';
import {CalcPoint, CalcRatio} from 'support/types';
import View from 'view/index';

class Presenter extends Observer {
  constructor(protected model: Model, protected view: View) {
    super();
  }

  init(parent: HTMLElement) {
    if (parent === undefined) throw new SliderError('Parent element undefined');
    this.view.render({
      element: parent,
      points: this.model.getPoints(),
      size: this.model.getSize(),
      step: this.model.getStep(),
      isRange: this.model.isRange(),
      isVertical: this.model.isVertical(),
      withScale: this.model.withScale(),
      withTooltip: this.model.withTooltip(),
    });
    this.view
      .subscribe(SliderEvent.SliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.PointMove, this.handlePointMove);
  }

  protected notifyValueChanged() {
    this.notify(SliderEvent.ValueChanged, this.model.getCurrents());
  }

  private updateCurrent(modelValue: number, position: Position) {
    console.log('hi')
    this.model.setCurrent(position, modelValue);
    this.view.updateCurrent(this.model.isVertical(), {
      [position]: this.model.getPoint(position),
    });
    this.notifyValueChanged();
  }

  private handleSliderClick = (calcRatio: CalcRatio) => {
    const modelValue = this.model.calcValue(calcRatio(this.model.isVertical()));
    if (this.model.isSameCurrent(modelValue)) return;
    this.updateCurrent(modelValue, this.model.selectPosition(modelValue));
  };

  private handlePointMove = (calcPoint: CalcPoint) => {
    const { ratio, position } = calcPoint(this.model.isVertical());
    const modelValue = this.model.calcValue(ratio);
    if (!this.model.willCurrentCollapse(position, modelValue)) {
      this.updateCurrent(modelValue, position);
    } else if (!this.model.areCurrentEqual()) {
      const current = this.model.getCurrent(
        position === Position.Max
          ? Position.Min
          : Position.Max,
      );
      this.updateCurrent(current, position);
    }
  };
}

export default Presenter;
