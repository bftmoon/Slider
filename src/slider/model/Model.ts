import IModel from "./IModel";
import MinMaxPosition from "./MinMaxPosition";
import MinMax from "../common-interfaces/MinMax";
import IPoint from "../common-interfaces/IPoint";
import IViewOptions from "../common-interfaces/IViewOptions";

class Model {
  private current = {min: 0, max: 80};

  border = {min: 0, max: 100};
  step = 1;
  linesCount = {min: 0, max: 10}

  isRange = true;
  isVertical = false;
  withTooltip = true;
  withScale = true;

  // [index: string]: any;

  // todo: other copy
  constructor(options?: IModel) {
    if (options) {
      for (let key in options) {
        // @ts-ignore
        if (this[key].hasOwnProperty('min')) {
          //@ts-ignore
          Model.copyMinMax(this[key], options[key]);
        } else {
          //@ts-ignore
          this[key] = options[key];
        }
      }
    }
  }

  private static copyMinMax(thisOption: MinMax<any>, option: MinMax<any>) {
    if (option.max !== undefined) thisOption.max = option.max;
    if (option.min !== undefined) thisOption.min = option.min;
  }

  setCurrent(current: MinMax<number>) {
    if (current.min !== undefined) this.current.min = current.min;
    if (current.max !== undefined) this.current.max = current.max;
  }

  getCurrentPoints(): MinMax<IPoint> {
    return {
      min: this.getPoint(MinMaxPosition.min),
      max: this.getPoint(MinMaxPosition.max)
    }
  }

  getPoint(position: MinMaxPosition): IPoint {
    return {
      percent: this.calcPercent(this.getCurrent()[position]),
      tooltip: this.getCurrent()[position]
    };
  }

  getBoolOptions(): IViewOptions {
    return {
      isVertical: this.isVertical,
      isRange: this.isRange,
      withScale: this.withScale,
      withTooltip: this.withTooltip
    }
  }

  getBorderSize(): number {
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
    if (diff !== 0) {
      // if (this.step / 2 > diff) {
      //   value -= diff;
      // } else {
      //   value += this.step - diff;
      // }
      value += this.step / 2 > diff ? -diff : this.step - diff; // todo: check this
    }
    return this.border.min + value;
  }

  isOrderNormalizeRequired(): boolean {
    return this.getCurrent().max < this.getCurrent().min;
  }

  isNormalizeByStepRequired(normalizedCurrent: number, position: MinMaxPosition): boolean {
    return normalizedCurrent !== this.current[position] && this.current[position] !== this.border[position];
  }

  isSameCurrent(value: number): boolean {
    return value === this.getCurrent().min || value === this.getCurrent().max;
  }

  willCurrentCollapse(position: MinMaxPosition, value: number): boolean {
    const current = this.getCurrent();
    return position === MinMaxPosition.min && value > current.max
      || position === MinMaxPosition.max && value < current.min;
  }

  toggleRange() {
    this.isRange = !this.isRange;
  }

  private calcPercent(current: number): number {
    return 100 / (this.border.max - this.border.min) * (current - this.border.min);
  }

  getRealCurrent(): MinMax<number> {
    return this.current;
  }

  getCurrent(): MinMax<number> {
    if (this.isRange) return this.current;
    return {
      max: this.current.max,
      min: this.border.min
    };
  }

  getOptions(): IModel {
    return {
      current: this.getCurrent(),
      border: this.border,
      linesCount: this.linesCount,
      step: this.step,
      isVertical: this.isVertical,
      isRange: this.isRange,
      withScale: this.withScale,
      withTooltip: this.withTooltip
    }
  }

  toggleTooltip() {
    this.withTooltip = !this.withTooltip;
  }

  toggleOrientation() {
    this.isVertical = !this.isVertical;
  }
}

export default Model;
