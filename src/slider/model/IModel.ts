import MinMax from "../common-interfaces/MinMax";

interface IModel {
  border?: MinMax<number>;
  step?: number;
  linesCount?: MinMax<number>;

  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;

  [index: string]: any;
}

export default IModel;
