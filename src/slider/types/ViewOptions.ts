import MinMax from "./MinMax";
import PointData from "./PointData";

type ViewOptions = {
  element: HTMLElement,
  points: MinMax<PointData>,
  step: number,
  size: number,
  isVertical: boolean,
  isRange: boolean,
  withTooltip: boolean,
  withScale: boolean,
};

export default ViewOptions;
