import Controller from "./controller/Controller";
import Model from "./model/Model";
import View from "./view/View";
import IOptions from "./model/IOptions";


class Slider extends Controller {

    constructor(options?: IOptions) {
        super(new Model(options), new View());
    }
}

export default Slider;
