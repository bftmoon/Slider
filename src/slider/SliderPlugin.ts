import DefaultView from './view/DefaultView';
import Options from './model/Options';
import './slider.scss';
import PresenterProxy from './presenter/PresenterProxy';
import DefaultValidModel from './model/DefaultValidModel';
import { Slider } from './Slider';


class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: Options) {
    super(new DefaultValidModel(options), new DefaultView());
  }
}

export default SliderPlugin;
