import './slider.scss';
import PresenterProxy from './presenter/PresenterProxy';
import { Slider } from './Slider';
import SliderOptions from './types/SliderOptions';
import ValidModel from './model/ValidModel';
import View from './view/View';


class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new ValidModel(options), new View());
  }
}

export default SliderPlugin;
