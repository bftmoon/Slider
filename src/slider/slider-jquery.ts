import SliderPlugin from './SliderPlugin';
import { SliderGroup } from './Slider';
import MinMaxPosition from './types/MinMaxPosition';
import SliderOptions from './types/SliderOptions';

declare global {
  interface JQuery {
    slider: (options?: SliderOptions) => SliderGroup
  }
}

$.fn.slider = function querySlider(options?: SliderOptions): SliderGroup {
  const sliders: SliderPlugin[] = [];
  const query = this;

  this.each((index: number, element: HTMLElement) => {
    const slider = new SliderPlugin(options);
    sliders.push(slider);
    slider.init(element);
  });

  return {
    addSlideListener(callback: (
      data: { value: number; position: MinMaxPosition }) => void): void {
      sliders.forEach((slider) => slider.addSlideListener(callback));
    },
    setCurrentRange(valueMin: number, valueMax: number): void {
      sliders.forEach((slider) => slider.setCurrentRange(valueMin, valueMax));
    },
    setBorderMax(value: number): void {
      sliders.forEach((slider) => slider.setBorderMax(value));
    },
    setBorderMin(value: number): void {
      sliders.forEach((slider) => slider.setBorderMin(value));
    },
    setBorders(borderMin: number, borderMax: number): void {
      sliders.forEach((slider) => slider.setBorders(borderMin, borderMax));
    },
    setCurrent(value: number): void {
      sliders.forEach((slider) => slider.setCurrent(value));
    },
    setCurrentRangeMax(value: number): void {
      sliders.forEach((slider) => slider.setCurrentRangeMax(value));
    },
    setCurrentRangeMin(value: number): void {
      sliders.forEach((slider) => slider.setCurrentRangeMin(value));
    },
    setStep(step: number): void {
      sliders.forEach((slider) => slider.setStep(step));
    },
    toggleOrientation(): void {
      sliders.forEach((slider) => slider.toggleOrientation());
    },
    toggleRange(): void {
      sliders.forEach((slider) => slider.toggleRange());
    },
    toggleScale(): void {
      sliders.forEach((slider) => slider.toggleScale());
    },
    toggleTooltip(): void {
      sliders.forEach((slider) => slider.toggleTooltip());
    },
    getOptions(): SliderOptions[] {
      return sliders.map((slider) => slider.getOptions());
    },
    getSlider(index: number): SliderPlugin {
      return sliders[index];
    },
    getElementsQuery(): JQuery {
      return query;
    },
    size(): number {
      return sliders.length;
    },
  };
};
