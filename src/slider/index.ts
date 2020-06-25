import { SliderGroup } from 'Slider';
import SliderPlugin from 'SliderPlugin';
import MinMax from 'types/MinMax';
import SliderOptions from 'types/SliderOptions';

declare global {
  interface JQuery {
    slider: (options?: SliderOptions) => SliderGroup;
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
    addSlideListener(
      callback: (currents: MinMax<number>) => void,
    ) {
      sliders.forEach((slider) => slider.addSlideListener(callback));
    },
    setCurrentRange(valueMin: number, valueMax: number) {
      sliders.forEach((slider) => slider.setCurrentRange(valueMin, valueMax));
    },
    setBorderMax(value: number) {
      sliders.forEach((slider) => slider.setBorderMax(value));
    },
    setBorderMin(value: number) {
      sliders.forEach((slider) => slider.setBorderMin(value));
    },
    setBorders(borderMin: number, borderMax: number) {
      sliders.forEach((slider) => slider.setBorders(borderMin, borderMax));
    },
    setCurrent(value: number) {
      sliders.forEach((slider) => slider.setCurrent(value));
    },
    setCurrentRangeMax(value: number) {
      sliders.forEach((slider) => slider.setCurrentRangeMax(value));
    },
    setCurrentRangeMin(value: number) {
      sliders.forEach((slider) => slider.setCurrentRangeMin(value));
    },
    setStep(step: number) {
      sliders.forEach((slider) => slider.setStep(step));
    },
    toggleOrientation() {
      sliders.forEach((slider) => slider.toggleOrientation());
    },
    toggleRange() {
      sliders.forEach((slider) => slider.toggleRange());
    },
    toggleScale() {
      sliders.forEach((slider) => slider.toggleScale());
    },
    toggleTooltip() {
      sliders.forEach((slider) => slider.toggleTooltip());
    },
    getOptions() {
      return sliders.map((slider) => slider.getOptions());
    },
    getSlider(index: number) {
      return sliders[index];
    },
    getElementsQuery() {
      return query;
    },
    size() {
      return sliders.length;
    },
  };
};
