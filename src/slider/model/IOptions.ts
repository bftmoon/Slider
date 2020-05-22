interface IOptions {
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

export default IOptions;
