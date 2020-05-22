import Presenter from "./presenter/Presenter";
import Model from "./model/Model";
import View from "./view/View";
import IOptions from "./model/IOptions";


class Slider extends Presenter {

  constructor(options?: IOptions) {
    super(new Model(options), new View());
  }
}

export default Slider;
