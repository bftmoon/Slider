import IViewOptions from "../common/IViewOptions";
import IMinMax from "../common/IMinMax";
import IPoint from "../common/IPoint";
import IObserver from "../observer/IObserver";

interface IView extends IObserver{
  render(element: HTMLElement, options: IViewOptions, points:IMinMax<IPoint>, step: number, size: number):void;
  toggleRange():void;
  toggleTooltip():void;
  toggleScale():void;
  toggleOrientation():void;
  updateScaleLines(step: number, size: number, isVertical: boolean):void;
  updatePosition(isVertical: boolean, points: IMinMax<IPoint>):void;
}

export default IView;
