import MinMaxPosition from './MinMaxPosition';

interface IRelativePointPercents {
  x: number;
  y: number;
}

interface IAbsolutePoint {
  x: number;
  y: number;
}

interface IPointMoveData extends IRelativePointPercents{
  position: MinMaxPosition;
}

export { IAbsolutePoint, IRelativePointPercents, IPointMoveData };
