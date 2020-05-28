import IMinMax from '../common/IMinMax';

interface IModel {
  border?: IMinMax<number>;
  current?: IMinMax<number>;
  step?: number;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;

  [index: string]: any;
}

export default IModel;
