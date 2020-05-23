import IModel from "./IModel";
import MinMaxPosition from "./MinMaxPosition";
import MinMax from "../common-interfaces/MinMax";
import IPoint from "../common-interfaces/IPoint";
import IViewOptions from "../common-interfaces/IViewOptions";

class Model implements IModel {
  private _current = {min: 30, max: 80};

  border = {min: 0, max: 100};
  step = 1;
  linesCount = {min: 2, max: 30}

  isRange = true;
  isVertical = false;
  withTooltip = true;
  withScale = true;

  [index: string]: any;

  constructor(options?: IModel) {
    if (options) {
      for (let key in options) {
        if (this[key].hasOwnProperty('min')) {
          if (options[key].max !== undefined) this[key].max = options[key].max;
          if (options[key].min !== undefined) this[key].min = options[key].min;
        } else {
          this[key] = options[key];
        }
      }
    }
  }

  setCurrent(current: MinMax<number>) {
    if (current.min !== undefined) this._current.min = current.min;
    if (current.max !== undefined) this._current.max = current.max;
  }

  getCurrentPoints(): MinMax<IPoint> {
    return {
      min: this.getPoint(MinMaxPosition.min),
      max: this.getPoint(MinMaxPosition.max)
    }
  }

  getPoint(position: MinMaxPosition): IPoint {
    return {
      percent: this.calcPercent(this.current[position]),
      tooltip: this.current[position]
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

  normalizeCurrent() {
    const temp = this._current.min;
    this._current.min = this._current.max;
    this._current.max = temp;
  }

  isNormalizeRequired(): boolean {
    return this.current.max < this.current.min;
  }

  isSameCurrent(value: number): boolean {
    return value === this.current.min || value === this.current.max;
  }

  willCurrentCollapse(position: MinMaxPosition, value: number): boolean {
    if (position === MinMaxPosition.min) {
      if (value > this.current.max) return true;
    } else {
      if (value < this.current.min) return true;
    }
    return false;
  }

  toggleRange() {
    this.isRange = !this.isRange;
  }

  private calcPercent(current: number): number {
    return 100 / (this.border.max - this.border.min) * current;
  }

  private get current(): MinMax<number> {
    if (this.isRange) return this._current;
    return {
      max: this._current.max,
      min: 0
    };
  }
}

export default Model;
