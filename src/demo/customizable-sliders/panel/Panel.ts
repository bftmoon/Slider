import Slider from "../../../slider/Slider";
import IModel from "../../../slider/model/IModel";
import MinMax from "../../../slider/common-interfaces/MinMax";
import MinMaxPosition from "../../../slider/model/MinMaxPosition";

class Panel {
  private slider: Slider;
  private changeableInputs: MinMax<HTMLInputElement> = {};

  constructor(options?: IModel) {
    this.slider = new Slider(options);
    this.slider.addSlideListener(this.handleSliderSlide);
  }

  private handleSliderSlide = (data: { value: number, position: MinMaxPosition }) => {
    this.changeableInputs[data.position].value = data.value.toString();
  }

  init(options: { panelElement: HTMLElement, sliderElement: HTMLElement }) {
    this.slider.init(options.sliderElement);
    const data = this.slider.getOptions();
    options.panelElement.querySelectorAll('input').forEach((element) => {
      this.prepareElement(data, element);
    });
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
    element.addEventListener('input', mappedData.listener);
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
    this.slider.toggleScale();
  }

  private handleTooltipListener = () => {
    this.slider.toggleTooltip();
  }

  private handleVerticalListener = () => {
    this.slider.toggleOrientation();
  }

  private handleRangeListener = () => {
    this.slider.toggleRange();
  }

  private handleCurrentMinInput = (event: InputEvent) => {
    this.slider.setCurrentRange({min: Number((event.target as HTMLInputElement).value)});
  }

  private handleCurrentMaxInput = (event: InputEvent) => {
    this.slider.setCurrentRange({max: Number((event.target as HTMLInputElement).value)});
  }

  private handleStepInput = (event: InputEvent) => {
    this.slider.setStep(Number((event.target as HTMLInputElement).value))
  }

  private handleMaxInput = (event: InputEvent) => {
    this.slider.setBorders({max: Number((event.target as HTMLInputElement).value)})
  }

  private handleMinInput = (event: InputEvent) => {
    this.slider.setBorders({min: Number((event.target as HTMLInputElement).value)})
  }
}

export default Panel;
