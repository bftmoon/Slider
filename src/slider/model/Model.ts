import { Position } from 'support/enums';
import SliderOptions, { MinMax, PointData } from 'support/types';
import ObjectsUtil from 'utils/ObjectsUtil';

class Model {
  protected options: SliderOptions = {
    current: { min: 0, max: 100 },
    border: { min: 0, max: 100 },
    step: 1,
    isRange: true,
    isVertical: false,
    withTooltip: true,
    withScale: true,
  }
  private rangeSavedMin: number;

  constructor(options?: SliderOptions) {
    if (options !== undefined) {
      this.options = ObjectsUtil.update<SliderOptions>(this.options, options);
    }
    this.rangeSavedMin = this.options.border.min;
  }

  selectPosition(value: number) {
    if (!this.options.isRange) return Position.Max;
    if (value <= this.options.current.min) return Position.Min;
    if (value >= this.options.current.max) return Position.Max;

    const getMiddle = (values: MinMax<number>) => values.min + (values.max - values.min) / 2;
    return value < getMiddle(this.options.current) ? Position.Min : Position.Max;
  }

  calcValue(ratio: number) {
    if (ratio <= 0) return this.options.border.min;
    if (ratio >= 1) return this.options.border.max;

    const modelValue = this.options.border.min + this.getSize() * ratio;
    return this.normalizeByStep(modelValue);
  }

  isSameCurrent(value: number) {
    return value === this.options.current.min || value === this.options.current.max;
  }

  willCurrentCollapse(position: Position, value: number) {
    return (position === Position.Min && value > this.options.current.max)
      || (position === Position.Max && value < this.options.current.min);
  }

  areCurrentEqual() {
    return this.options.current.min === this.options.current.max;
  }

  toggleRange() {
    if (this.options.isRange) {
      this.rangeSavedMin = this.options.current.min;
      this.options.current.min = this.options.border.min;
    } else {
      this.normalizeSavedMin();
      this.options.current.min = this.rangeSavedMin;
    }
    this.normalizeOrder();
    this.options.isRange = !this.options.isRange;
  }

  toggleTooltip() {
    this.options.withTooltip = !this.options.withTooltip;
  }

  toggleOrientation() {
    this.options.isVertical = !this.options.isVertical;
  }

  toggleScale() {
    this.options.withScale = !this.options.withScale;
  }

  setCurrent(position: Position, current: number) {
    this.options.current[position] = current;
  }

  getPoint(position: Position): PointData {
    return {
      percent: ((this.options.current[position] - this.options.border.min) / this.getSize()) * 100,
      tooltip: this.options.current[position],
    };
  }

  getPoints(): MinMax<PointData> {
    return {
      min: this.getPoint(Position.Min),
      max: this.getPoint(Position.Max),
    };
  }

  getOptions(): SliderOptions {
    return { ...this.options };
  }

  getSize() {
    return this.options.border.max - this.options.border.min;
  }

  isVertical() {
    return this.options.isVertical;
  }

  isRange() {
    return this.options.isRange;
  }

  withTooltip() {
    return this.options.withTooltip;
  }

  withScale() {
    return this.options.withScale;
  }

  getCurrent(position: Position) {
    return this.options.current[position];
  }

  getCurrents() {
    return { ...this.options.current };
  }

  getStep() {
    return this.options.step;
  }

  getBorder(position: Position) {
    return this.options.border[position];
  }

  protected normalizeByStep(value: number) {
    let newValue = value;
    const diff = (value - this.options.border.min) % this.options.step;
    if (diff === 0) return value;
    newValue += this.options.step / 2 > diff ? -diff : this.options.step - diff;
    return newValue > this.options.border.max ? this.options.border.max : newValue;
  }

  private normalizeOrder() {
    if (this.options.current.min > this.options.current.max) {
      const temp = this.options.current.max;
      this.options.current.max = this.options.current.min;
      this.options.current.min = temp;
    }
  }

  private normalizeSavedMin() {
    if (this.rangeSavedMin < this.options.border.min) this.rangeSavedMin = this.options.border.min;
    if (this.rangeSavedMin > this.options.border.max) this.rangeSavedMin = this.options.border.max;
    if (this.rangeSavedMin % this.options.step !== 0) {
      this.rangeSavedMin = this.normalizeByStep(this.rangeSavedMin);
    }
  }
}

export default Model;
