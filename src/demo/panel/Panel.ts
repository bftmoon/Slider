import {SliderGroup} from '../../slider/Slider';
import '../../slider/slider-jquery';
import MinMaxPosition from '../../slider/types/MinMaxPosition';
import SliderError from '../../slider/SliderError';
import MinMax from '../../slider/types/MinMax';
import SliderOptions from '../../slider/types/SliderOptions';


class Panel {
  private sliderGroup: SliderGroup;

  private changeableInputs: MinMax<HTMLInputElement> = {};

  constructor(slider: SliderGroup) {
    this.sliderGroup = slider;
  }

  init(panelElement: HTMLElement) {
    const data = this.sliderGroup.getOptions()[0];
    panelElement.querySelectorAll('input').forEach((element) => {
      this.prepareElement(data, element);
    });
    this.sliderGroup.addSlideListener(this.handleSliderSlide);
  }

  private handleSliderSlide = (data: { value: number, position: MinMaxPosition }) => {
    this.changeableInputs[data.position].value = data.value.toString();
  }

  private prepareElement(modelData: SliderOptions, element: HTMLInputElement) {
    const inputElement = element;
    const mappedData = this.mapData(modelData, element.name);
    if (element.type === 'checkbox') {
      inputElement.checked = mappedData.value as boolean;
    } else {
      inputElement.value = mappedData.value.toString();
    }
    if (element.name === 'currentMin') this.changeableInputs.min = element;
    if (element.name === 'currentMax') this.changeableInputs.max = element;
    element.addEventListener('input', this.makeWrappedListener(mappedData.listener));
  }

  private makeWrappedListener = (listener: (event: InputEvent) => void):
    ((event: InputEvent) => void) => (event: InputEvent) => {
    try {
      listener(event);
      (event.target as HTMLInputElement).setCustomValidity('');
    } catch (error) {
      if (error! instanceof SliderError) throw error;
      (event.target as HTMLInputElement).setCustomValidity(error.message);
      (event.target as HTMLInputElement).reportValidity();
    }
  }

  private mapData(data: SliderOptions, inputName: string): {
    value: number | boolean,
    listener: (event: InputEvent) => void
  } {
    switch (inputName) {
      case 'min':
        return {value: data.border.min, listener: this.handleMinInput};
      case 'max':
        return {value: data.border.max, listener: this.handleMaxInput};
      case 'step':
        return {value: data.step, listener: this.handleStepInput};
      case 'currentMax':
        return {value: data.current.max, listener: this.handleCurrentMaxInput};
      case 'currentMin':
        return {value: data.current.min, listener: this.handleCurrentMinInput};
      case 'isRange':
        return {value: data.isRange, listener: this.handleRangeListener};
      case 'isVertical':
        return {value: data.isVertical, listener: this.handleVerticalListener};
      case 'withTooltip':
        return {value: data.withTooltip, listener: this.handleTooltipListener};
      case 'withScale':
        return {value: data.withScale, listener: this.handleScaleListener};
      default:
        throw Error('unknown input');
    }
  }

  private handleScaleListener = () => {
    this.sliderGroup.toggleScale();
  }

  private handleTooltipListener = () => {
    this.sliderGroup.toggleTooltip();
  }

  private handleVerticalListener = () => {
    this.sliderGroup.toggleOrientation();
  }

  private handleRangeListener = () => {
    this.sliderGroup.toggleRange();
  }

  private handleCurrentMinInput = (event: InputEvent) => {
    this.sliderGroup.setCurrentRangeMin((event.target as HTMLInputElement).value);
  }

  private handleCurrentMaxInput = (event: InputEvent) => {
    this.sliderGroup.setCurrentRangeMax((event.target as HTMLInputElement).value);
  }

  private handleStepInput = (event: InputEvent) => {
    this.sliderGroup.setStep((event.target as HTMLInputElement).value);
  }

  private handleMaxInput = (event: InputEvent) => {
    this.sliderGroup.setBorderMax((event.target as HTMLInputElement).value);
  }

  private handleMinInput = (event: InputEvent) => {
    this.sliderGroup.setBorderMin((event.target as HTMLInputElement).value);
  }
}

export default Panel;
