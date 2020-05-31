import IMinMax from '../common/IMinMax';

interface IOptions {
  border?: IMinMax<number>;
  current?: IMinMax<number>;
  step?: number;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;

  [index: string]: any;
}

export default IOptions;
