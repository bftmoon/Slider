import MinMax from '../common-interfaces/MinMax';

interface IModel {
  border?: MinMax<number>;
  current?: MinMax<number>;
  step?: number;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;

  [index: string]: any;
}

export default IModel;
