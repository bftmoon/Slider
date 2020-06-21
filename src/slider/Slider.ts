import SliderPlugin from './SliderPlugin';
import MinMaxPosition from './types/MinMaxPosition';
import SliderOptions from './types/SliderOptions';

interface SliderCommon {
  toggleRange():void;
  toggleScale():void;
  toggleTooltip():void;
  toggleOrientation():void;
  addSlideListener(callback: (data: { value: number, position: MinMaxPosition }) => void):void;
  setCurrentRangeMin(value: any): void;
  setCurrentRangeMax(value: any): void;
  setCurrent(value: any): void;
  setCurrentRange(valueMin: any, valueMax: any): void;
  setStep(step: any):void;
  setBorderMin(value: any): void;
  setBorderMax(value: any): void;
  setBorders(borderMin: any, borderMax: any): void;
}

interface Slider extends SliderCommon {
  getOptions():SliderOptions;
}

interface SliderGroup extends SliderCommon {
  getSlider(index: number): SliderPlugin;
  getElementsQuery(): JQuery;
  getOptions():SliderOptions[];
  size(): number;
}

export { Slider, SliderGroup };
