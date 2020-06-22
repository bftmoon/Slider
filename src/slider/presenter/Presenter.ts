import Observer from '../observer/Observer';
import MinMaxPosition from '../types/MinMaxPosition';
import SliderError from '../SliderError';
import { CalcPoint, CalcPositionWithDiff, CalcRatio } from '../types/NotifyData';
import Model from '../model/Model';
import View from '../view/View';
import SliderEvent from '../observer/SliderEvent';

class Presenter extends Observer {
  constructor(protected model: Model, protected view: View) {
    super();
  }

  init(parent: HTMLElement) {
    if (parent === undefined) throw new SliderError('Parent element undefined');
    this.view.render(
      parent,
      this.model.getBoolOptions(),
      this.model.getCurrentPoints(),
      this.model.step,
      this.model.getRangeSize(),
    );
    this.view
      .subscribe(SliderEvent.SliderClick, this.handleSliderClick)
      .subscribe(SliderEvent.PointMove, this.handlePointMove)
      .subscribe(SliderEvent.PointMoveByScale, this.handlePointMoveByScale);
  }

  protected updatePosition(modelValue: number, position: MinMaxPosition) {
    if (!this.model.willCurrentCollapse(position, modelValue)) {
      this.updateModelAndViewCurrent(modelValue, position);
    } else if (!this.model.areCurrentEqual()) {
      const current = this.model.getCurrent()[
        position === MinMaxPosition.Max ? MinMaxPosition.Min : MinMaxPosition.Max
      ];
      this.updateModelAndViewCurrent(current, position);
    }
  }

  private updateModelAndViewCurrent(modelValue: number, position: MinMaxPosition) {
    this.model.setCurrent({ [position]: modelValue });
    this.view.updatePosition(
      this.model.isVertical,
      { [position]: this.model.getPoint(position) },
    );
    this.notify(SliderEvent.ValueChanged, { value: modelValue, position });
  }

  private handleSliderClick = (calcRatio: CalcRatio) => {
    const modelValue = this.model.calcValue(calcRatio(this.model.isVertical));
    if (this.model.isSameCurrent(modelValue)) return;
    this.updatePosition(modelValue, this.model.selectPosition(modelValue));
  }

  private handlePointMove = (calcPoint: CalcPoint) => {
    const { ratio, position } = calcPoint(this.model.isVertical);
    this.updatePosition(this.model.calcValue(ratio), position);
  }

  private handlePointMoveByScale = (calcPositionWithDiff: CalcPositionWithDiff) => {
    const { diff, position } = calcPositionWithDiff(this.model.isVertical, this.model.isRange);
    const modelValue = this.model.calcValue(
      this.model.getCurrent()[position] / this.model.getRangeSize() + diff,
    );
    if (this.model.isSameCurrent(modelValue)) return;
    this.updatePosition(modelValue, position);
  }
}

export default Presenter;
