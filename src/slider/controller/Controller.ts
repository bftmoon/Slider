import Model from "../model/Model";
import View from "../view/View";

class Controller {
    model: Model;
    view: View;

    constructor(model: Model, view: View) {
        this.model = model;
        this.view = view;
    }

    init(parent:HTMLElement){
        this.view.render(parent, this.model.options);
    }
}

export default Controller;
