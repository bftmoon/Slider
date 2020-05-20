import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";

class Range implements IViewElement {
    element: HTMLDivElement;

    buildHtml(isVertical: boolean, percentMin: number, percentMax: number, rootElement?: HTMLElement): HTMLElement {
        this.element = document.createElement('div');
        CssClassUtil.initClass(this, isVertical);
        this.updatePosition(isVertical, percentMin, percentMax, rootElement);
        return this.element;
    }

    updatePosition(isVertical: boolean, percent: number, percentRanged: number, rootElement?: HTMLElement) {
        if (isVertical) {
            const heightPart = (rootElement ? rootElement.clientHeight - 60 : this.element.parentElement.clientHeight) / 100;
            this.element.style.marginBottom = heightPart * percent + 'px';
            this.element.style.marginTop = heightPart * (100 - percentRanged) + 'px';
        } else {
            this.element.style.marginLeft = percent + '%';
            this.element.style.marginRight = 100 - percentRanged + '%'
        }
    }

}

export default Range;
