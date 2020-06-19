import MinMaxPosition from "./MinMaxPosition";

type CalcMoveDiffPercentsFunc = (isVertical: boolean) => ScaleMoveData
type CalcPositionWithDiffFunc = (isVertical: boolean, isRange: boolean) => PosWithDiff
type ScaleMoveData = { diff: number, clientCoord: number }
type PosWithDiff = { diff: number, position: MinMaxPosition }

export {CalcMoveDiffPercentsFunc, CalcPositionWithDiffFunc, ScaleMoveData, PosWithDiff}
