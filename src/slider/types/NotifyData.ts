import MinMaxPosition from './MinMaxPosition';

type ScalePointMoveData = { diff: number, coordinate: number }
type ViewPointMoveData = { diff: number, position: MinMaxPosition }
type ViewPointData = { position: MinMaxPosition, ratio: number };

type CalcMoveDiff = (isVertical: boolean) => ScalePointMoveData
type CalcPositionWithDiff = (isVertical: boolean, isRange: boolean) => ViewPointMoveData
type CalcAbsolute = (isVertical: boolean) => number;
type CalcPoint = (isVertical: boolean) => ViewPointData;
type CalcRatio = (isVertical:boolean)=>number;

export {
  CalcMoveDiff,
  CalcPositionWithDiff,
  ScalePointMoveData,
  ViewPointMoveData,
  CalcAbsolute,
  CalcPoint,
  ViewPointData,
  CalcRatio,
};
