import MinMaxPosition from './MinMaxPosition';

type ViewPointMoveData = { diff: number, position: MinMaxPosition }
type ViewPointData = { position: MinMaxPosition, ratio: number };

type CalcPositionWithDiff = (isVertical: boolean, isRange: boolean) => ViewPointMoveData
type CalcAbsolute = (isVertical: boolean) => number;
type CalcPoint = (isVertical: boolean) => ViewPointData;
type CalcRatio = (isVertical: boolean) => number;

export {
  CalcPositionWithDiff,
  ViewPointMoveData,
  CalcAbsolute,
  CalcPoint,
  ViewPointData,
  CalcRatio,
};
