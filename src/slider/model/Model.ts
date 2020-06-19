import MinMax from "../types/MinMax";
import SliderOptions from "../types/SliderOptions";
import MinMaxPosition from "../types/MinMaxPosition";
import PointData from "../types/PointData";
import ViewBoolOptions from "../types/ViewBoolOptions";

interface Model {
  border: MinMax<number>;
  step: number;
  isRange: boolean;
  isVertical: boolean;
  withTooltip: boolean;
  withScale: boolean;

  setCurrent(current: MinMax<number>):void;
  getCurrent(): MinMax<number>;
  getRealCurrent(): MinMax<number>;
  getPoint(position: MinMaxPosition): PointData;
  getCurrentPoints(): MinMax<PointData>;
  getOptions(): SliderOptions;
  getBoolOptions(): ViewBoolOptions;
  getRangeSize(): number;

  selectPosition(value: number): MinMaxPosition;
  normalizeCurrentOrder():void;
  normalizeByStep(value: number):number;
  calcValue(ratio: number): number;

  isOrderNormalizeRequired(): boolean;
  isSameCurrent(value: number): boolean;
  willCurrentCollapse(position: MinMaxPosition, value: number): boolean;
  areCurrentEqual(): boolean;

  toggleRange():void;
  toggleTooltip():void;
  toggleOrientation():void;
  toggleScale():void;
}

export default Model;
