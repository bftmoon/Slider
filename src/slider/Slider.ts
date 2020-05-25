import Model from "./model/Model";
import View from "./view/View";
import IModel from "./model/IModel";
import './slider.scss'
import PresenterProxy from "./presenter/PresenterProxy";
import MinMax from "./common-interfaces/MinMax";
import ValidModel from "./model/ValidModel";


class Slider extends PresenterProxy {

  constructor(options?: IModel) {
    super(new ValidModel(options), new View());
  }

}

export default Slider;
