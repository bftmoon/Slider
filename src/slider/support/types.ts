import { Position } from './enums';

type MinMax<T> = {
  min?: T;
  max?: T;

  [index: string]: T;
};

type PointData = {
  percent: number;
  tooltip?: number;
};

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

type ViewPointMoveData = { diff: number; position: Position };
type ViewPointData = { position: Position; ratio: number };

type CalcPositionWithDiff = (
  isVertical: boolean,
  isRange: boolean
) => ViewPointMoveData;
type CalcAbsolute = (isVertical: boolean) => number;
type CalcPoint = (isVertical: boolean) => ViewPointData;
type CalcRatio = (isVertical: boolean) => number;

type NotifyCallback = (data?: any) => void;

type SliderOptions = {
  border?: MinMax<number>;
  current?: MinMax<number>;
  step?: number;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;
};

export {
  MinMax,
  PointData,
  ViewOptions,
  ViewPointMoveData,
  ViewPointData,
  CalcRatio,
  CalcPoint,
  CalcAbsolute,
  CalcPositionWithDiff,
  NotifyCallback,
};
export default SliderOptions;
