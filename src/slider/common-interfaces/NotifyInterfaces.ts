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

interface IPointChangeData {
  sizes: IParentSizes;
  point: IRelativePoint;
}

interface IMinMaxPointChangeData extends IPointChangeData {
  position: MinMaxPosition;
}

export {IAbsolutePoint, IParentData, IRelativePoint, IMinMaxPointChangeData, IParentSizes, IPointChangeData};
