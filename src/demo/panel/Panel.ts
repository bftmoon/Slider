import {ISliderGroup} from "../../slider/ISlider";
import MinMax from "../../slider/common-interfaces/MinMax";
import MinMaxPosition from "../../slider/model/MinMaxPosition";
import IModel from "../../slider/model/IModel";
import '../../slider/slider-jquery'


class Panel {
  private sliderGroup: ISliderGroup;
  private changeableInputs: MinMax<HTMLInputElement> = {};

  constructor(slider: ISliderGroup) {
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
    if (this.sliderGroup.size() > 1){
      if (data.position === MinMaxPosition.max){
        this.sliderGroup.setCurrentRangeMax(data.value);
      } else {
        this.sliderGroup.setCurrentRangeMin(data.value);
      }
    }
  }

  private prepareElement(modelData: IModel, element: HTMLInputElement) {
    const mappedData = this.mapData(modelData, element.name);
    if (element.type === 'checkbox') {
      element.checked = mappedData.value as boolean;
    } else {
      element.value = mappedData.value.toString();
    }
    if (element.name === 'currentMin') this.changeableInputs.min = element;
    if (element.name === 'currentMax') this.changeableInputs.max = element;
    element.addEventListener('input', this.wrapListener(mappedData.listener));
  }

  private wrapListener(listener: (event: InputEvent) => void): ((event: InputEvent) => void) {
    return (event: InputEvent) => {
      try {
        listener(event);
        (event.target as HTMLInputElement).setCustomValidity("");
      } catch (e) {
        (event.target as HTMLInputElement).setCustomValidity(e);
        (event.target as HTMLInputElement).reportValidity();
      }
    }
  }

  private mapData(data: IModel, inputName: string): {
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
