import MinMaxPosition from "../model/MinMaxPosition";

interface IRelativePoint {
  x: number;
  y: number;
}

interface IAbsolutePoint {
  x: number;
  y: number;
}

interface IParentData {
  point: IAbsolutePoint;
  width: number;
  height: number;
}

interface IParentSizes {
  width: number;
  height: number;
}

interface ISliderClickFullData {
  sizes: IParentSizes;
  point: IRelativePoint;
}

interface IPointMoveFullData {
  parent: IParentData;
  point: IAbsolutePoint;
  position: MinMaxPosition;
}

export {IAbsolutePoint, IParentData, IRelativePoint, IPointMoveFullData, IParentSizes, ISliderClickFullData};
