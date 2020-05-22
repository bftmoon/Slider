import Presenter from "./presenter/Presenter";
import Model from "./model/Model";
import View from "./view/View";
import IModel from "./model/IModel";


class Slider extends Presenter {

  constructor(options?: IModel) {
    super(new Model(options), new View());
  }
}

export default Slider;
