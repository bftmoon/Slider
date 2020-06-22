import MinMaxPosition from '../types/MinMaxPosition';
import SliderError from '../SliderError';
import SliderOptions from '../types/SliderOptions';
import Model from "./Model";

class ValidModel extends Model {
  constructor(options?: SliderOptions) {
    super();
    if (options) {
      this.copyBool(options);
      if (options.border !== undefined) {
        this.setValidBorders(
          options.border.min || this.border.min,
          options.border.max || this.border.max,
        );
      }
      if (options.current !== undefined) {
        if (options.current.min !== undefined) {
          this.setValidCurrent(options.current.min, MinMaxPosition.Min);
        }
        if (options.current.max !== undefined) {
          this.setValidCurrent(options.current.max || this.current.max, MinMaxPosition.Max);
        }
      }
      if (options.step !== undefined) {
        this.setValidStep(options.step);
      }
    }
  }

  setValidCurrent(current: number, position: MinMaxPosition) {
    this.isInBorderRange(current);
    if (position === MinMaxPosition.Min) {
      this.isRangeActive();
      ValidModel.isPositiveRange(current, this.getCurrent().max);
    } else {
      ValidModel.isPositiveRange(this.getCurrent().min, current);
    }
    this.isDivideToStepOrBorder(current);
    this.current[position] = current;
  }

  setValidCurrents(currentMin: number, currentMax: number) {
    this.isRangeActive();
    this.isInBorderRange(currentMin);
    this.isInBorderRange(currentMax);
    ValidModel.isPositiveRange(currentMin, currentMax);
    this.isDivideToStepOrBorder(currentMin);
    this.isDivideToStepOrBorder(currentMax);
    this.current = {min: currentMin, max: currentMax};
  }

  setValidStep(step: number) {
    this.isValidStep(step);
    this.step = step;
  }

  setValidBorder(value: number, position: MinMaxPosition) {
    this.isValidBorder(value, position);
    this.border[position] = value;
  }

  setValidBorders(borderMin: number, borderMax: number) {
    ValidModel.isValidBorders(borderMin, borderMax);
    this.border = {min: borderMin, max: borderMax};
  }

  private static isPositiveRange(min: number, max: number) {
    if (max < min) {
      throw new SliderError('Negative range');
    }
  }

  private isInBorderRange(current: number) {
    if (current < this.border.min || current > this.border.max) {
      throw new SliderError('Not in range');
    }
  }

  private isRangeActive() {
    if (!this.isRange) {
      throw new SliderError('Setting ranged value for not ranged slider');
    }
  }

  private isValidStep(step: number) {
    if (step <= 0) {
      throw new SliderError('Too small step size');
    }
    if (step > (this.border.max - this.border.min)) {
      throw new SliderError('Too big step size');
    }
  }

  private isDivideToStepOrBorder(current: number) {
    if (this.isNotValidByStepOrBorder(current)) {
      throw new SliderError('Not divide on step');
    }
  }

  private isNotValidByStepOrBorder(current: number){
    return (current - this.border.min) % this.step !== 0
      && current !== this.border.min
      && current !== this.border.max
  }

  private isValidBorder(value: number, position: MinMaxPosition) {
    if (position === MinMaxPosition.Min) {
      if (value > this.border.max) {
        throw new SliderError('Negative slider body size');
      }
      if (value === this.border.max) {
        throw new SliderError('Slider with only one value');
      }
    } else {
      if (value < this.border.min) {
        throw new SliderError('Negative slider body size');
      }
      if (value === this.border.min) {
        throw new SliderError('Slider with only one value');
      }
    }
  }

  private static isValidBorders(borderMin: number, borderMax: number) {
    if (borderMin > borderMax) {
      throw new SliderError('Negative slider body size');
    }
    if (borderMin === borderMax) {
      throw new SliderError('Slider with only one value');
    }
  }
}

export default ValidModel;
