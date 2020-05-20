import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";

class Scale implements IViewElement{
    element: HTMLElement;

    buildHtml(isVertical: boolean, linesCount:number): HTMLElement {
        console.log(linesCount)
        this.element = document.createElement('div');
        CssClassUtil.initClass(this, isVertical);
        let line;

        for (let i = 0; i < linesCount - 2; i++){
            line = document.createElement('div');
            CssClassUtil.initHtmlClass(line, isVertical, 'scale-line');
            this.element.append(line);
        }
        return this.element;
    }
}

export default Scale;
