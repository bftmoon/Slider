import Model from "./Model";
import SliderError from "./SliderError";
import MinMaxPosition from "./MinMaxPosition";

class ValidModel extends Model {

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
    this.current = {min: numberMin, max: numberMax};
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
    this.isValidBorders(min, max);
    this.border = {min, max}
  }

  static isValidType(value: any) {
    if (value === undefined || value === '' || isNaN(Number(value))) {
      throw new SliderError('Number required');
    }
  }

  static isPositiveRange(min: number, max: number) {
    if (max < min) {
      throw new SliderError('Negative range');
    }
  }

  isInBorderRange(current: number) {
    if (current < this.border.min || current > this.border.max) {
      throw new SliderError('Not in range');
    }
  }

  isRangeActive() {
    if (!this.isRange) {
      throw new SliderError('Setting ranged value for not ranged slider');
    }
  }

  isValidStep(step: number) {
    if (step < 0) {
      throw new SliderError('Too small step size');
    }
    if (step > (this.border.max - this.border.min)){
      throw new SliderError('Too big step size');
    }
  }

  isValidBorder(value: number, position: MinMaxPosition) {
    if (position === MinMaxPosition.min){
      if (value > this.border.max){
        throw new SliderError('Negative slider body size');
      }
    } else if (value < this.border.min){
      throw new SliderError('Negative slider body size');

    }
    // if (position === MinMaxPosition.min && value > this.border.max || position === MinMaxPosition.max && value < this.border.min) {
    //   throw new SliderError('Negative slider body size');
    // }
  }

  isValidBorders(borderMin: number, borderMax: number) {
    if (borderMin > borderMax) {
      throw new SliderError('Negative slider body size');
    }
  }
}

export default ValidModel;
