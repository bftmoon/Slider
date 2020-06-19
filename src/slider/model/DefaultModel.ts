import MinMax from '../types/MinMax';
import PointData from '../types/PointData';
import ViewBoolOptions from '../types/ViewBoolOptions';
import MinMaxPosition from '../types/MinMaxPosition';
import SliderOptions from "../types/SliderOptions";

class DefaultModel {
  protected current: MinMax<number> = {min: 0, max: 80};

  border: MinMax<number> = {min: 0, max: 100};

  step = 1;

  isRange = true;

  isVertical = false;

  withTooltip = true;

  withScale = true;

  constructor(options?: SliderOptions) {
    if (options !== undefined) {
      if (options.border !== undefined) DefaultModel.copyMinMax(this.border, options.border);
      if (options.current !== undefined) DefaultModel.copyMinMax(this.current, options.current);
      if (options.step !== undefined) this.step = options.step;
      this.copyBool(options);
    }
  }

  protected copyBool({
                       isVertical, isRange, withScale, withTooltip,
                     }: SliderOptions) {
    if (isRange !== undefined) this.isRange = isRange;
    if (isVertical !== undefined) this.isVertical = isVertical;
    if (withTooltip !== undefined) this.withTooltip = withTooltip;
    if (withScale !== undefined) this.withScale = withScale;
  }

  private static copyMinMax(thisOption: MinMax<any>, {min, max}: MinMax<any>) {
    // eslint-disable-next-line no-param-reassign
    if (max !== undefined) thisOption.max = max;
    // eslint-disable-next-line no-param-reassign
    if (min !== undefined) thisOption.min = min;
  }

  setCurrent(current: MinMax<number>) {
    DefaultModel.copyMinMax(this.current, current);
  }

  getCurrent(): MinMax<number> {
    if (this.isRange) return this.current;
    return {
      max: this.current.max,
      min: this.border.min,
    };
  }

  getRealCurrent(): MinMax<number> {
    return this.current;
  }

  getPoint(position: MinMaxPosition): PointData {
    return {
      percent: (this.getCurrent()[position] - this.border.min) / this.getRangeSize() * 100,
      tooltip: this.getCurrent()[position],
    };
  }

  getCurrentPoints(): MinMax<PointData> {
    return {
      min: this.getPoint(MinMaxPosition.Min),
      max: this.getPoint(MinMaxPosition.Max),
    };
  }

  getOptions(): SliderOptions {
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

  getBoolOptions(): ViewBoolOptions {
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
    if (!this.isRange) return MinMaxPosition.Max;
    if (value <= this.current.min) return MinMaxPosition.Min;
    if (value >= this.current.max) return MinMaxPosition.Max;

    const middle = this.current.min + (this.current.max - this.current.min) / 2;
    return value < middle ? MinMaxPosition.Min : MinMaxPosition.Max;
  }

  normalizeCurrentOrder() {
    const temp = this.current.min;
    this.current.min = this.current.max;
    this.current.max = temp;
  }

  normalizeByStep(value: number) {
    let newValue = value;
    const diff = (value - this.border.min) % this.step;
    if (diff === 0) return value;
    newValue += this.step / 2 > diff ? -diff : this.step - diff;
    return newValue > this.border.max ? this.border.max : newValue;
  }

  calcValue(ratio: number): number {
    if (ratio <= 0) return this.border.min;
    if (ratio >= 1) return this.border.max;

    const modelValue = this.border.min + (this.border.max - this.border.min) * ratio;
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
    return (position === MinMaxPosition.Min && value > current.max)
      || (position === MinMaxPosition.Max && value < current.min);
  }

  areCurrentEqual(): boolean {
    const current = this.getCurrent();
    return current.min === current.max;
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

export default DefaultModel;
