import IViewElement from "../IViewElement";
import CssClassUtil from "../CssClassUtil";
import Point from "../point/Point";
import IPoint from "../point/IPoint";
import Range from "../range/Range";

class Body implements IViewElement {
    element: HTMLElement;
    range: Range;
    points: Point[] = [];

    buildHtml(isVertical: boolean, isRange: boolean, points:IPoint[], rootElement?:HTMLElement): HTMLElement {
        this.element = document.createElement("div");
        CssClassUtil.initClass(this, isVertical);

        this.points.push(new Point())
        this.element.append(this.points[0].buildHtml(isVertical, points[0]));

        if (isRange){
            this.points.push(new Point())
            this.element.append(this.points[1].buildHtml(isVertical, points[1]));
            this.range = new Range();
            this.element.append(this.range.buildHtml(isVertical, points[0].position, points[1].position, rootElement));
        }
        return this.element;
    }

}

export default Body;
