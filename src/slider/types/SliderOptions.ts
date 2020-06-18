import MinMax from './/MinMax';

type SliderOptions = {
  border?: MinMax<number>;
  current?: MinMax<number>;
  step?: number;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;

  [index: string]: any;
}

export default SliderOptions;
