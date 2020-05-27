import View from './view/View';
import IModel from './model/IModel';
import './slider.scss';
import PresenterProxy from './presenter/PresenterProxy';
import ValidModel from './model/ValidModel';
import {ISlider} from "./ISlider";


class Slider extends PresenterProxy implements ISlider{
  constructor(options?: IModel) {
    super(new ValidModel(options), new View());
  }
}

export default Slider;
