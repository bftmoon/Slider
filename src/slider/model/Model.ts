import MinMax from 'types/MinMax';
import MinMaxPosition from 'types/MinMaxPosition';
import PointData from 'types/PointData';
import SliderOptions from 'types/SliderOptions';

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
    if (options !== undefined) this.options = this.mergeOptions(options);
    this.rangeSavedMin = this.options.border.min;
  }

  selectPosition(value: number) {
    if (!this.options.isRange) return MinMaxPosition.Max;
    if (value <= this.options.current.min) return MinMaxPosition.Min;
    if (value >= this.options.current.max) return MinMaxPosition.Max;

    const middle = this.options.current.min + (this.options.current.max - this.options.current.min) / 2;
    return value < middle ? MinMaxPosition.Min : MinMaxPosition.Max;
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

  willCurrentCollapse(position: MinMaxPosition, value: number) {
    return (position === MinMaxPosition.Min && value > this.options.current.max)
      || (position === MinMaxPosition.Max && value < this.options.current.min);
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

  setCurrent(position: MinMaxPosition, current: number) {
    this.options.current[position] = current;
  }

  getPoint(position: MinMaxPosition): PointData {
    return {
      percent: ((this.options.current[position] - this.options.border.min) / this.getSize()) * 100,
      tooltip: this.options.current[position],
    };
  }

  getPoints(): MinMax<PointData> {
    return {
      min: this.getPoint(MinMaxPosition.Min),
      max: this.getPoint(MinMaxPosition.Max),
    };
  }

  getOptions() {
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

  getCurrent(position: MinMaxPosition) {
    return this.options.current[position];
  }

  getCurrents() {
    return { ...this.options.current };
  }

  getStep() {
    return this.options.step;
  }

  getBorder(position: MinMaxPosition) {
    return this.options.border[position];
  }

  protected normalizeByStep(value: number) {
    let newValue = value;
    const diff = (value - this.options.border.min) % this.options.step;
    if (diff === 0) return value;
    newValue += this.options.step / 2 > diff ? -diff : this.options.step - diff;
    return newValue > this.options.border.max ? this.options.border.max : newValue;
  }

  private mergeOptions(options: SliderOptions) {
    const temp = { ...this.options, ...options };
    if (temp.border.min === undefined) temp.border.min = this.options.border.min;
    if (temp.border.max === undefined) temp.border.max = this.options.border.max;
    if (temp.current.max === undefined) temp.current.max = this.options.border.max;
    if (temp.current.min === undefined) temp.current.min = this.options.border.min;
    return temp;
  }

  private normalizeOrder() {
    if (this.options.current.min > this.options.current.max) [this.options.current.min, this.options.current.max] = [this.options.current.max, this.options.current.min];
  }

  private normalizeSavedMin() {
    if (this.rangeSavedMin < this.options.border.min) this.rangeSavedMin = this.options.border.min;
    if (this.rangeSavedMin > this.options.border.max) this.rangeSavedMin = this.options.border.max;
    if (this.rangeSavedMin % this.options.step !== 0) this.rangeSavedMin = this.normalizeByStep(this.rangeSavedMin);
  }
}

export default Model;
