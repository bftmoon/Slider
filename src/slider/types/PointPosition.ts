import MinMaxPosition from './MinMaxPosition';

type RelativePointPercents = {
  x: number;
  y: number;
}

type AbsolutePoint = {
  x: number;
  y: number;
}

type RelativePoint = {
  x: number;
  y: number;
}

type PointMoveData = RelativePointPercents & { position: MinMaxPosition }
type PointMoveByScaleData = AbsolutePoint & { diffX: number, diffY: number };

export {AbsolutePoint, RelativePoint, RelativePointPercents, PointMoveData, PointMoveByScaleData};
