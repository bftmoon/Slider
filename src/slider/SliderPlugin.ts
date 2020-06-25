import 'slider.scss';
import ValidModel from 'model/ValidModel';
import PresenterProxy from 'presenter/PresenterProxy';
import { Slider } from 'Slider';
import SliderOptions from 'types/SliderOptions';
import View from 'view/index';

class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new ValidModel(options), new View());
  }
}

export default SliderPlugin;
