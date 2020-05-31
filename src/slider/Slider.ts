import View from './view/View';
import IOptions from './model/IOptions';
import './slider.scss';
import PresenterProxy from './presenter/PresenterProxy';
import ValidModel from './model/ValidModel';
import { ISlider } from './ISlider';


class Slider extends PresenterProxy implements ISlider {
  constructor(options?: IOptions) {
    super(new ValidModel(options), new View());
  }
}

export default Slider;
