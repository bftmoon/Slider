import MinMaxPosition from './MinMaxPosition';

type RelativePointPercents = {
  x: number;
  y: number;
}

type AbsolutePoint = {
  x: number;
  y: number;
}

type PointMoveData = RelativePointPercents & { position: MinMaxPosition; }

export {AbsolutePoint, RelativePointPercents, PointMoveData};
