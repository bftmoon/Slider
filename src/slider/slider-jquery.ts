import Slider from "./Slider";
import IModel from "./model/IModel";
import {ISliderGroup} from "./ISlider";
import MinMaxPosition from "./common/MinMaxPosition";

$.fn.slider = function (options?: IModel): ISliderGroup {

  const sliders: Slider[] = [];
  const query = this;

  this.each((index: number, element: HTMLElement) => {
    const slider = new Slider(options);
    sliders.push(slider);
    slider.init(element);
  });

  return {
    addSlideListener(callback: (
      data: { value: number; position: MinMaxPosition }) => void
    ): void {
      sliders.forEach(slider => slider.addSlideListener(callback));
    },
    setCurrentRange(valueMin: any, valueMax: any): void {
      sliders.forEach(slider => slider.setCurrentRange(valueMin, valueMax));
    },
    setBorderMax(value: any): void {
      sliders.forEach(slider => slider.setBorderMax(value));
    },
    setBorderMin(value: any): void {
      sliders.forEach(slider => slider.setBorderMin(value));
    },
    setBorders(borderMin: any, borderMax: any): void {
      sliders.forEach(slider => slider.setBorders(borderMin, borderMax));
    },
    setCurrent(value: any): void {
      sliders.forEach(slider => slider.setCurrent(value));
    },
    setCurrentRangeMax(value: any): void {
      sliders.forEach(slider => slider.setCurrentRangeMax(value));
    },
    setCurrentRangeMin(value: any): void {
      sliders.forEach(slider => slider.setCurrentRangeMin(value));
    },
    setStep(step: any): void {
      sliders.forEach(slider => slider.setStep(step));
    },
    toggleOrientation(): void {
      sliders.forEach(slider => slider.toggleOrientation());
    },
    toggleRange(): void {
      sliders.forEach(slider => slider.toggleRange());
    },
    toggleScale(): void {
      sliders.forEach(slider => slider.toggleScale());
    },
    toggleTooltip(): void {
      sliders.forEach(slider => slider.toggleTooltip());
    },
    getOptions(): IModel[] {
      return sliders.map((slider) => slider.getOptions());
    },
    getSlider(index: number): Slider {
      return sliders[index];
    },
    getElementsQuery(): JQuery {
      return query;
    },
    size(): number {
      return sliders.length;
    }
  };
}

