import IModel from './IModel';
import IMinMax from '../common/IMinMax';
import IPoint from '../common/IPoint';
import IViewOptions from '../common/IViewOptions';
import MinMaxPosition from "../common/MinMaxPosition";
import ConvertUtil from "../utils/ConvertUtil";

class Model {
  protected current = {min: 0, max: 80};

  border = {min: 0, max: 100};

  step = 1;

  isRange = true;

  isVertical = false;

  withTooltip = true;

  withScale = true;

  constructor(options?: IModel) {
    if (options !== undefined) {
      if (options.border !== undefined) Model.copyMinMax(this.border, options.border);
      if (options.current !== undefined) Model.copyMinMax(this.current, options.current);
      if (options.step !== undefined) this.step = options.step;
      this.copyBool(options);
    }
  }

  protected copyBool(options: IModel) {
    if (options.isRange !== undefined) this.isRange = options.isRange;
    if (options.isVertical !== undefined) this.isVertical = options.isVertical;
    if (options.withTooltip !== undefined) this.withTooltip = options.withTooltip;
    if (options.withScale !== undefined) this.withScale = options.withScale;
  }

  private static copyMinMax(thisOption: IMinMax<any>, option: IMinMax<any>) {
    if (option.max !== undefined) thisOption.max = option.max;
    if (option.min !== undefined) thisOption.min = option.min;
  }

  setCurrent(current: IMinMax<number>) {
    Model.copyMinMax(this.current, current);
  }

  getCurrent(): IMinMax<number> {
    if (this.isRange) return this.current;
    return {
      max: this.current.max,
      min: this.border.min,
    };
  }

  getRealCurrent(): IMinMax<number> {
    return this.current;
  }

  getPoint(position: MinMaxPosition): IPoint {
    return {
      percent: ConvertUtil.toPercentWithDiff(
        this.getCurrent()[position],
        this.border.min,
        this.border.max,
      ),
      tooltip: this.getCurrent()[position],
    };
  }

  getCurrentPoints(): IMinMax<IPoint> {
    return {
      min: this.getPoint(MinMaxPosition.min),
      max: this.getPoint(MinMaxPosition.max),
    };
  }

  getOptions(): IModel {
    return {
      current: this.getCurrent(),
      border: this.border,
      step: this.step,
      isVertical: this.isVertical,
      isRange: this.isRange,
      withScale: this.withScale,
      withTooltip: this.withTooltip,
    };
  }

  getBoolOptions(): IViewOptions {
    return {
      isVertical: this.isVertical,
      isRange: this.isRange,
      withScale: this.withScale,
      withTooltip: this.withTooltip,
    };
  }

  getRangeSize(): number {
    return this.border.max - this.border.min;
  }

  selectPosition(value: number): MinMaxPosition {
    if (!this.isRange) return MinMaxPosition.max;
    if (value <= this.current.min) return MinMaxPosition.min;
    if (value >= this.current.max) return MinMaxPosition.max;

    const middle = this.current.min + (this.current.max - this.current.min) / 2;
    return value < middle ? MinMaxPosition.min : MinMaxPosition.max;
  }

  normalizeCurrentOrder() {
    const temp = this.current.min;
    this.current.min = this.current.max;
    this.current.max = temp;
  }

  normalizeByStep(value: number) {
    const diff = (value - this.border.min) % this.step;
    if (diff === 0) return value;
    value += this.step / 2 > diff ? -diff : this.step - diff;
    return value > this.border.max ? this.border.max : value;
  }

  calcModelValue(percent: number): number {
    if (percent <= 0) return this.border.min;
    if (percent >= 100) return this.border.max;

    const modelValue = ConvertUtil.fromPercentWithDiff(percent, this.border.min, this.border.max);
    return this.normalizeByStep(modelValue);
  }

  isOrderNormalizeRequired(): boolean {
    return this.getCurrent().max < this.getCurrent().min;
  }

  isSameCurrent(value: number): boolean {
    return value === this.getCurrent().min || value === this.getCurrent().max;
  }

  willCurrentCollapse(position: MinMaxPosition, value: number): boolean {
    const current = this.getCurrent();
    return (position === MinMaxPosition.min && value > current.max)
      || (position === MinMaxPosition.max && value < current.min);
  }

  toggleRange() {
    this.isRange = !this.isRange;
  }

  toggleTooltip() {
    this.withTooltip = !this.withTooltip;
  }

  toggleOrientation() {
    this.isVertical = !this.isVertical;
  }

  toggleScale() {
    this.withScale = !this.withScale;
  }
}

export default Model;
