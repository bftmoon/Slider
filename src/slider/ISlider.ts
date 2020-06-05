import IOptions from './model/IOptions';
import Slider from './Slider';
import MinMaxPosition from './common/MinMaxPosition';

interface ISliderCommon{
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

interface ISlider extends ISliderCommon{
  getOptions():IOptions;
}

interface ISliderGroup extends ISliderCommon{
  getSlider(index: number): Slider;
  getElementsQuery(): JQuery;
  getOptions():IOptions[];
  size(): number;
}

export { ISlider, ISliderGroup };