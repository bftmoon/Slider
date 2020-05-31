import Model from './Model';
import IOptions from './IOptions';
import MinMaxPosition from '../common/MinMaxPosition';
import SliderError from '../SliderError';

class ValidModel extends Model {
  constructor(options?: IOptions) {
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
          this.setValidCurrent(options.current.min, MinMaxPosition.min);
        }
        if (options.current.max !== undefined) {
          this.setValidCurrent(options.current.max || this.current.max, MinMaxPosition.max);
        }
      }
      if (options.step !== undefined) {
        this.setValidStep(options.step);
      }
    }
  }

  setValidCurrent(current: any, position: MinMaxPosition) {
    ValidModel.isValidType(current);
    const number = Number(current);
    this.isInBorderRange(number);
    if (position === MinMaxPosition.min) {
      this.isRangeActive();
      ValidModel.isPositiveRange(number, this.getCurrent().max);
    } else {
      ValidModel.isPositiveRange(this.getCurrent().min, number);
    }
    this.isDivideToStepOrBorder(number);
    this.current[position] = number;
  }

  setValidCurrents(currentMin: any, currentMax: any) {
    this.isRangeActive();
    ValidModel.isValidType(currentMin);
    ValidModel.isValidType(currentMax);
    const numberMin = Number(currentMin);
    const numberMax = Number(currentMax);
    this.isInBorderRange(numberMin);
    this.isInBorderRange(numberMax);
    ValidModel.isPositiveRange(numberMin, numberMax);
    this.isDivideToStepOrBorder(numberMin);
    this.isDivideToStepOrBorder(numberMax);
    this.current = { min: numberMin, max: numberMax };
  }

  setValidStep(step: any) {
    ValidModel.isValidType(step);
    const number = Number(step);
    this.isValidStep(number);
    this.step = number;
  }

  setValidBorder(value: any, position: MinMaxPosition) {
    ValidModel.isValidType(value);
    const number = Number(value);
    this.isValidBorder(number, position);
    this.border[position] = number;
  }

  setValidBorders(borderMin: any, borderMax: any) {
    ValidModel.isValidType(borderMin);
    ValidModel.isValidType(borderMax);
    const min = Number(borderMin);
    const max = Number(borderMax);
    ValidModel.isValidBorders(min, max);
    this.border = { min, max };
  }

  private static isValidType(value: any) {
    // eslint-disable-next-line fsd/split-conditionals
    if (value === undefined || value === null || value === '' || isNaN(Number(value))) {
      throw new SliderError('Number required');
    }
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
    // eslint-disable-next-line fsd/split-conditionals
    if ((current - this.border.min) % this.step !== 0
      && current !== this.border.min
      && current !== this.border.max
    ) {
      throw new SliderError('Not divide on step');
    }
  }

  private isValidBorder(value: number, position: MinMaxPosition) {
    if (position === MinMaxPosition.min) {
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
