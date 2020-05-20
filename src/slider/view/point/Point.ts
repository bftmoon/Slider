import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Tooltip from "../tooltip/Tooltip";
import IPoint from "./IPoint";

class Point implements IViewElement {
    element: HTMLDivElement;
    tooltip: Tooltip;

    buildHtml(isVertical: boolean, {withTooltip, position, value}: IPoint) {
        this.element = document.createElement("div");
        CssClassUtil.initClass(this, isVertical);
        this.updatePosition(position, isVertical);

        if (withTooltip) {
            this.tooltip = new Tooltip();
            this.element.append(this.tooltip.buildHtml(isVertical, value));
        }
        return this.element;
    }

    updatePosition = (positionPercent: number, isVertical: boolean) => {
        this.element.style[isVertical ? 'bottom' : 'left'] = `calc(${positionPercent}% - 7px)`;
    }

    removeHtml = () => {
        this.element.remove();
    }
}

export default Point;
