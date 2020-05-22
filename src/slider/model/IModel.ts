interface IModel {
  current?: { min: number, max: number };
  max?: number;
  min?: number;
  step?: number;
  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;
  linesCount?: { min: number, max: number };
}

interface IOptions extends IModel {
  current?: { min: number, max: number };
  max?: number;
  min?: number;
  step?: number;
  isVertical?: boolean;
  isRange?: boolean;
  withTooltip?: boolean;
  withScale?: boolean;
  linesCount?: { min: number, max: number };
  percents?: { min: number, max: number };
}

export default IModel;
export {IOptions};
