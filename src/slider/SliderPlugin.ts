import 'slider.scss';
import { Slider } from 'Slider';
import ValidModel from 'model/ValidModel';
import PresenterProxy from 'presenter/PresenterProxy';
import SliderOptions from 'types/SliderOptions';
import View from 'view/View';

class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new ValidModel(options), new View());
  }
}

export default SliderPlugin;
