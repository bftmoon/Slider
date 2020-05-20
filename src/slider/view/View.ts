import Scale from "./scale/Scale";
import IOptions from "../model/IOptions";
import Body from "./body/Body";
import CssClassUtil from "./CssClassUtil";

class View {
    body: Body;
    scale: Scale;

    render(element: HTMLElement,
           {
               current,
               max,
               min,
               step,
               isVertical,
               isRange,
               withTooltip,
               withScale,
               scaleLinesCount
           }: IOptions) {

        const sliderHtml = document.createElement('div');
        CssClassUtil.initHtmlClass(sliderHtml, isVertical);

        this.body = new Body();
        sliderHtml.append(
            this.body.buildHtml(isVertical, isRange, [{
                withTooltip,
                value: current[0].toString(),
                position: this.transformToPercentage(current[0], min, max)
            }, {
                withTooltip,
                value: current[1].toString(),
                position: this.transformToPercentage(current[1], min, max)
            },], element));

        if (withScale) {
            this.scale = new Scale();
            sliderHtml.append(this.scale.buildHtml(isVertical, scaleLinesCount));
        }

        element.append(sliderHtml);
    }

    transformToPercentage(current: number, min: number, max: number): number {
        return current / (max - min) * 100;
    }
}

export default View;
