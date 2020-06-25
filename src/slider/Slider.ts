import SliderOptions, { MinMax } from 'support/types';

interface SliderCommon {
  toggleRange(): void;
  toggleScale(): void;
  toggleTooltip(): void;
  toggleOrientation(): void;
  addSlideListener(
    callback: (currents: MinMax<number>) => void
  ): void;
  setCurrentRangeMin(value: number): void;
  setCurrentRangeMax(value: number): void;
  setCurrent(value: number): void;
  setCurrentRange(valueMin: number, valueMax: number): void;
  setStep(step: number): void;
  setBorderMin(value: number): void;
  setBorderMax(value: number): void;
  setBorders(borderMin: number, borderMax: number): void;
}

interface Slider extends SliderCommon {
  getOptions(): SliderOptions;
}

interface SliderGroup extends SliderCommon {
  getSlider(index: number): Slider;
  getElementsQuery(): JQuery;
  getOptions(): SliderOptions[];
  size(): number;
}

export { Slider, SliderGroup };
