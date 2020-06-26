import 'slider.scss';
import { ValidModel } from 'model';
import { PresenterProxy } from 'presenter';
import { Slider } from 'Slider';
import SliderOptions from 'support/types';
import View from 'view';

class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new ValidModel(options), new View());
  }
}

export default SliderPlugin;
