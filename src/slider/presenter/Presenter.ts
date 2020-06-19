import DefaultModel from '../model/DefaultModel';
import SliderEvent from '../observer/SliderEvent';
import {PointMoveByScaleData, PointMoveData, RelativePointPercents} from '../types/PointPosition';
import Observer from '../observer/Observer';
import MinMaxPosition from '../types/MinMaxPosition';
import SliderError from '../SliderError';
import View from '../view/View';

class Presenter extends Observer {
  protected model: DefaultModel;

  protected view: View;

  constructor(model: DefaultModel, view: View) {
    super();
    this.model = model;
    this.view = view;
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
      .subscribe(SliderEvent.PointMoveByScale, this.handlePointMoveByScale)
  }

  protected updatePosition(modelValue: number, position: MinMaxPosition) {
    if (!this.model.willCurrentCollapse(position, modelValue)) {
      this.updateModelAndViewCurrent(modelValue, position);
    } else {
      if (!this.model.areCurrentEqual()) {
        const current = this.model.getCurrent()[position === MinMaxPosition.Max ? MinMaxPosition.Min : MinMaxPosition.Max];
        this.updateModelAndViewCurrent(current, position)
      }
    }
  }

  private updateModelAndViewCurrent(modelValue: number, position: MinMaxPosition) {
    this.model.setCurrent({[position]: modelValue});
    this.view.updatePosition(
      this.model.isVertical,
      {[position]: this.model.getPoint(position)},
    );
    this.notify(SliderEvent.ValueChanged, {value: modelValue, position});
  }

  private handleSliderClick = ({x, y}: RelativePointPercents) => {
    const modelValue = this.model.calcModelValue(this.model.isVertical ? 100 - y : x);
    if (this.model.isSameCurrent(modelValue)) return;
    this.updatePosition(modelValue, this.model.selectPosition(modelValue));
  }

  private handlePointMove = ({x, y, position}: PointMoveData) => {
    this.updatePosition(
      this.model.calcModelValue(this.model.isVertical ? 100 - y : x),
      position,
    );
  }

  private handlePointMoveByScale = (viewData: PointMoveByScaleData) => {

  }
}

export default Presenter;
