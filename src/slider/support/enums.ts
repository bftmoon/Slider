enum Position {
  Min = 'min',
  Max = 'max',
}

enum SliderEvent {
  SliderClick,
  PointMove,
  PointMoveByScale,
  ValueChanged,
  StopPointMove,
}

enum ClassNames {
  Point,
  Scale,
  Tooltip,
  Range,
  Body,
  Line,
}

export { Position, SliderEvent, ClassNames };
