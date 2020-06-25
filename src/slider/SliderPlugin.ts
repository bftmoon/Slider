import 'slider.scss';
import { ValidModel } from 'model/index';
import { PresenterProxy } from 'presenter/index';
import { Slider } from 'Slider';
import SliderOptions from 'support/types';
import View from 'view/index';

class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new ValidModel(options), new View());
  }
}

export default SliderPlugin;
