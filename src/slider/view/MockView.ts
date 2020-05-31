import IView from "./IView";
import IViewOptions from "../common/IViewOptions";
import IMinMax from "../common/IMinMax";
import IPoint from "../common/IPoint";
import Observer from "../observer/Observer";

class MockView extends Observer implements IView {

  render(element: HTMLElement, options: IViewOptions, points: IMinMax<IPoint>, step: number, size: number): void {
  }

  toggleOrientation(): void {
  }

  toggleRange(): void {
  }

  toggleScale(): void {
  }

  toggleTooltip(): void {
  }

  updatePosition(isVertical: boolean, points: IMinMax<IPoint>): void {
  }

  updateScaleLines(step: number, size: number, isVertical: boolean): void {
  }

}
export default MockView;
