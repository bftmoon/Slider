import SliderError from 'SliderError';
import MinMaxPosition from 'types/MinMaxPosition';
import SliderOptions from 'types/SliderOptions';

import Model from './Model';

class ValidModel extends Model {
  constructor(options?: SliderOptions) {
    super(options);
    this.validateOptions();
  }

  setValidCurrent(current: number, position: MinMaxPosition) {
    this.validateInBorderRange(current);
    if (position === MinMaxPosition.Min) {
      this.validateRangeActive();
      ValidModel.validatePositiveRange(current, this.options.current.max);
    } else {
      ValidModel.validatePositiveRange(this.options.current.min, current);
    }
    this.validateDivision(current);
    this.options.current[position] = current;
  }

  setValidCurrents(currentMin: number, currentMax: number) {
    this.validateRangeActive();
    this.validateInBorderRange(currentMin);
    this.validateInBorderRange(currentMax);
    ValidModel.validatePositiveRange(currentMin, currentMax);
    this.validateDivision(currentMin);
    this.validateDivision(currentMax);
    this.options.current = { min: currentMin, max: currentMax };
  }

  setValidStep(step: number) {
    this.validateStep(step);
    this.options.step = step;
    this.options.current.max = this.normalizeByStep(this.options.current.max);
    this.options.current.min = this.normalizeByStep(this.options.current.min);
  }

  setValidBorders(borderMin: number, borderMax: number) {
    ValidModel.validateBorders(borderMin, borderMax);
    this.options.border = { min: borderMin, max: borderMax };
    if (this.options.isRange) {
      if (this.options.current.min < borderMin) this.options.current.min = borderMin;
      if (this.options.current.min > borderMax) this.options.current.min = borderMax;
    } else {
      this.options.current.min = borderMin;
    }
    if (this.options.current.max < borderMin) this.options.current.max = borderMin;
    if (this.options.current.max > borderMax) this.options.current.max = borderMax;
  }

  private validateOptions() {
    ValidModel.validateBorders(this.options.border.min, this.options.border.max);
    this.validateStep(this.options.step);
    this.validateInBorderRange(this.options.current.min);
    this.validateInBorderRange(this.options.current.max);
    if (this.options.current.min !== this.options.border.min) this.validateRangeActive();
    ValidModel.validatePositiveRange(this.options.current.min, this.options.current.max);
    this.validateDivision(this.options.current.min);
    this.validateDivision(this.options.current.max);
  }

  private validateInBorderRange(current: number) {
    if (this.isNotInBorderRange(current)) {
      throw new SliderError('Not in range');
    }
  }

  private isNotInBorderRange(value: number) {
    return value < this.options.border.min || value > this.options.border.max;
  }

  private validateRangeActive() {
    if (!this.options.isRange) {
      throw new SliderError('Setting ranged value for not ranged slider');
    }
  }

  private validateStep(step: number) {
    if (step <= 0) {
      throw new SliderError('Too small step size');
    }
    if (step > this.getSize()) {
      throw new SliderError('Too big step size');
    }
  }

  private validateDivision(current: number) {
    if (this.isNotDivideToStepOrBorder(current)) {
      throw new SliderError('Not divide on step');
    }
  }

  private isNotDivideToStepOrBorder(current: number) {
    return (current - this.options.border.min) % this.options.step !== 0
      && current !== this.options.border.min
      && current !== this.options.border.max;
  }

  private static validatePositiveRange(min: number, max: number) {
    if (max < min) {
      throw new SliderError('Negative range');
    }
  }

  private static validateBorders(borderMin: number, borderMax: number) {
    if (borderMin > borderMax) {
      throw new SliderError('Negative slider body size');
    }
    if (borderMin === borderMax) {
      throw new SliderError('Slider with only one value');
    }
  }
}

export default ValidModel;
