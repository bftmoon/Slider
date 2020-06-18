import DefaultView from './view/DefaultView';
import './slider.scss';
import PresenterProxy from './presenter/PresenterProxy';
import DefaultValidModel from './model/DefaultValidModel';
import { Slider } from './Slider';
import SliderOptions from "./types/SliderOptions";


class SliderPlugin extends PresenterProxy implements Slider {
  constructor(options?: SliderOptions) {
    super(new DefaultValidModel(options), new DefaultView());
  }
}

export default SliderPlugin;
